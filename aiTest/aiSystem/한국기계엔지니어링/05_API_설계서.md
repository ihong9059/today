# API 설계서

## 1. API 개요

### 1.1 API 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                      Client Applications                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ Web App  │  │Mobile App│  │  Admin   │  │ 3rd Party│        │
│  │ (React)  │  │(Flutter) │  │  Panel   │  │  System  │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
│       │             │             │             │                │
├───────┼─────────────┼─────────────┼─────────────┼────────────────┤
│       └─────────────┴──────┬──────┴─────────────┘                │
│                            │                                      │
│  ┌─────────────────────────┴─────────────────────────┐           │
│  │              API Gateway (Kong/Nginx)              │           │
│  │  • 인증/인가 (JWT)                                 │           │
│  │  • Rate Limiting                                   │           │
│  │  • Load Balancing                                  │           │
│  │  • SSL Termination                                 │           │
│  └─────────────────────────┬─────────────────────────┘           │
│                            │                                      │
├────────────────────────────┼──────────────────────────────────────┤
│        ┌───────────────────┼───────────────────┐                 │
│        │                   │                   │                 │
│  ┌─────┴─────┐  ┌──────────┴──────┐  ┌────────┴────────┐        │
│  │ REST API  │  │  WebSocket API  │  │    MQTT API     │        │
│  │ (Node.js) │  │   (Socket.io)   │  │  (Mosquitto)    │        │
│  │  :3000    │  │     :3001       │  │     :1883       │        │
│  └─────┬─────┘  └────────┬────────┘  └────────┬────────┘        │
│        │                 │                    │                  │
│        └─────────────────┼────────────────────┘                  │
│                          │                                       │
│  ┌───────────────────────┴───────────────────────┐               │
│  │              Service Layer                     │               │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐         │               │
│  │  │Equipment│ │ Sensor  │ │  Alert  │         │               │
│  │  │ Service │ │ Service │ │ Service │         │               │
│  │  └─────────┘ └─────────┘ └─────────┘         │               │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐         │               │
│  │  │   AI    │ │  Auth   │ │Analytics│         │               │
│  │  │ Service │ │ Service │ │ Service │         │               │
│  │  └─────────┘ └─────────┘ └─────────┘         │               │
│  └───────────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 기술 스택

| 구분 | 기술 |
|------|------|
| REST API | Node.js + Express.js |
| WebSocket | Socket.io |
| MQTT Broker | Mosquitto |
| 인증 | JWT (JSON Web Token) |
| 문서화 | Swagger/OpenAPI 3.0 |
| API Gateway | Kong / Nginx |

### 1.3 API 버전 관리

```
Base URL: https://api.hankookmech.com/v1
WebSocket: wss://ws.hankookmech.com
MQTT: mqtts://mqtt.hankookmech.com:8883
```

---

## 2. 인증 및 보안

### 2.1 인증 방식

#### JWT 토큰 구조

```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_id",
    "role": "operator",
    "facility_id": "HK-FACTORY-001",
    "permissions": ["read:sensor", "write:control", "read:alert"],
    "iat": 1706054400,
    "exp": 1706140800
  }
}
```

#### 토큰 갱신 플로우

```
┌────────┐                    ┌────────┐                    ┌────────┐
│ Client │                    │  API   │                    │  Auth  │
│        │                    │Gateway │                    │ Server │
└───┬────┘                    └───┬────┘                    └───┬────┘
    │                             │                             │
    │ POST /auth/login            │                             │
    │ {username, password}        │                             │
    │────────────────────────────>│                             │
    │                             │ Validate credentials        │
    │                             │────────────────────────────>│
    │                             │                             │
    │                             │ {access_token, refresh_token}
    │                             │<────────────────────────────│
    │ 200 OK                      │                             │
    │ {access_token (15min),      │                             │
    │  refresh_token (7days)}     │                             │
    │<────────────────────────────│                             │
    │                             │                             │
    │ GET /api/sensors            │                             │
    │ Authorization: Bearer xxx   │                             │
    │────────────────────────────>│                             │
    │                             │ Verify token                │
    │                             │────────────────────────────>│
    │                             │                             │
    │ 200 OK {data}               │                             │
    │<────────────────────────────│                             │
    │                             │                             │
    │ POST /auth/refresh          │ (토큰 만료 시)              │
    │ {refresh_token}             │                             │
    │────────────────────────────>│                             │
    │                             │ Validate refresh token      │
    │                             │────────────────────────────>│
    │                             │                             │
    │ 200 OK {new_access_token}   │                             │
    │<────────────────────────────│                             │
```

### 2.2 권한 체계 (RBAC)

| Role | 권한 | 설명 |
|------|------|------|
| **admin** | 전체 권한 | 시스템 관리자 |
| **manager** | read:*, write:control, write:config | 공장 관리자 |
| **operator** | read:*, write:control | 운전원 |
| **viewer** | read:sensor, read:alert, read:report | 모니터링 전용 |
| **api_client** | read:sensor, read:alert | 외부 시스템 연동 |

### 2.3 API 보안 헤더

```http
# 요청 헤더
Authorization: Bearer <access_token>
X-API-Key: <api_key>
X-Request-ID: <uuid>
Content-Type: application/json

# 응답 보안 헤더
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

---

## 3. REST API 명세

### 3.1 공통 응답 형식

#### 성공 응답

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-01-24T12:00:00Z",
    "request_id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

#### 페이지네이션 응답

```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total_items": 150,
    "total_pages": 8,
    "has_next": true,
    "has_prev": false
  },
  "meta": {
    "timestamp": "2026-01-24T12:00:00Z"
  }
}
```

#### 에러 응답

```json
{
  "success": false,
  "error": {
    "code": "SENSOR_NOT_FOUND",
    "message": "센서를 찾을 수 없습니다",
    "details": {
      "sensor_id": "SENSOR-001"
    }
  },
  "meta": {
    "timestamp": "2026-01-24T12:00:00Z",
    "request_id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

### 3.2 에러 코드 정의

| HTTP Status | Error Code | 설명 |
|-------------|------------|------|
| 400 | INVALID_REQUEST | 잘못된 요청 파라미터 |
| 401 | UNAUTHORIZED | 인증 필요 |
| 403 | FORBIDDEN | 권한 없음 |
| 404 | NOT_FOUND | 리소스 없음 |
| 409 | CONFLICT | 리소스 충돌 |
| 422 | VALIDATION_ERROR | 유효성 검사 실패 |
| 429 | RATE_LIMIT_EXCEEDED | 요청 한도 초과 |
| 500 | INTERNAL_ERROR | 서버 내부 오류 |
| 503 | SERVICE_UNAVAILABLE | 서비스 일시 중단 |

---

### 3.3 인증 API

#### POST /auth/login

로그인 및 토큰 발급

**Request:**
```json
{
  "username": "operator01",
  "password": "********",
  "facility_id": "HK-FACTORY-001"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJSUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJSUzI1NiIs...",
    "token_type": "Bearer",
    "expires_in": 900,
    "user": {
      "id": "USER-001",
      "username": "operator01",
      "name": "김운전",
      "role": "operator",
      "facility_id": "HK-FACTORY-001"
    }
  }
}
```

#### POST /auth/refresh

토큰 갱신

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJSUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJSUzI1NiIs...",
    "expires_in": 900
  }
}
```

#### POST /auth/logout

로그아웃 (토큰 무효화)

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJSUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "로그아웃되었습니다"
  }
}
```

---

### 3.4 장비 API

#### GET /equipment

장비 목록 조회

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| facility_id | string | No | 공장 ID |
| type | string | No | 장비 타입 (SHREDDER, CRUSHER, PIN_MILL) |
| status | string | No | 상태 (RUNNING, STOPPED, ERROR) |
| page | int | No | 페이지 번호 (default: 1) |
| limit | int | No | 페이지 크기 (default: 20, max: 100) |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "EQ-SHR-001",
      "name": "이축 파쇄기 #1",
      "type": "SHREDDER",
      "model": "HK-TSS-800",
      "status": "RUNNING",
      "facility_id": "HK-FACTORY-001",
      "location": "A동 1층",
      "specs": {
        "motor_power": "75kW x 2",
        "capacity": "2-5 ton/hr",
        "rpm_range": "15-30"
      },
      "installed_at": "2024-03-15",
      "last_maintenance": "2025-12-20",
      "sensors": ["SENSOR-VIB-001", "SENSOR-TEMP-001", "SENSOR-CUR-001"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total_items": 3,
    "total_pages": 1
  }
}
```

#### GET /equipment/{id}

장비 상세 조회

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "EQ-SHR-001",
    "name": "이축 파쇄기 #1",
    "type": "SHREDDER",
    "model": "HK-TSS-800",
    "status": "RUNNING",
    "current_state": {
      "motor1_current": 45.2,
      "motor2_current": 43.8,
      "rpm": 22,
      "temperature": 58.3,
      "vibration": 2.1,
      "load_percentage": 68
    },
    "ai_status": {
      "health_score": 87,
      "anomaly_detected": false,
      "predicted_rul_days": 145,
      "next_maintenance": "2026-06-15",
      "recommendations": []
    },
    "statistics": {
      "today_runtime_hours": 8.5,
      "today_processed_tons": 28.3,
      "mtbf_hours": 720,
      "availability_percent": 94.2
    }
  }
}
```

#### POST /equipment/{id}/control

장비 제어 명령

**Request:**
```json
{
  "command": "SET_SPEED",
  "parameters": {
    "target_rpm": 25,
    "ramp_time_seconds": 10
  },
  "reason": "재료 변경으로 인한 속도 조절"
}
```

**Available Commands:**

| Command | Parameters | Description |
|---------|------------|-------------|
| START | {} | 장비 시작 |
| STOP | { mode: "NORMAL" \| "EMERGENCY" } | 장비 정지 |
| SET_SPEED | { target_rpm, ramp_time_seconds } | 속도 설정 |
| REVERSE | { duration_seconds } | 역회전 (재밍 해제) |
| RESET_ALARM | {} | 알람 리셋 |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "command_id": "CMD-550e8400-e29b",
    "status": "ACCEPTED",
    "equipment_id": "EQ-SHR-001",
    "command": "SET_SPEED",
    "executed_at": "2026-01-24T12:00:00Z",
    "estimated_completion": "2026-01-24T12:00:10Z"
  }
}
```

---

### 3.5 센서 API

#### GET /sensors

센서 목록 조회

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| equipment_id | string | No | 장비 ID |
| type | string | No | 센서 타입 (VIBRATION, TEMPERATURE, CURRENT, SPEED) |
| status | string | No | 상태 (ACTIVE, INACTIVE, ERROR) |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "SENSOR-VIB-001",
      "name": "진동센서 #1 (구동축)",
      "type": "VIBRATION",
      "model": "IFM VVB001",
      "equipment_id": "EQ-SHR-001",
      "position": "DRIVE_SHAFT",
      "status": "ACTIVE",
      "unit": "mm/s",
      "range": {
        "min": 0,
        "max": 50
      },
      "thresholds": {
        "warning": 7.1,
        "critical": 11.2
      },
      "current_value": 2.1,
      "last_updated": "2026-01-24T12:00:00Z"
    }
  ]
}
```

#### GET /sensors/{id}/data

센서 데이터 조회

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| start_time | datetime | Yes | 시작 시간 (ISO 8601) |
| end_time | datetime | Yes | 종료 시간 (ISO 8601) |
| interval | string | No | 집계 간격 (1s, 10s, 1m, 5m, 1h) |
| aggregation | string | No | 집계 함수 (mean, max, min, last) |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "sensor_id": "SENSOR-VIB-001",
    "sensor_type": "VIBRATION",
    "unit": "mm/s",
    "time_range": {
      "start": "2026-01-24T11:00:00Z",
      "end": "2026-01-24T12:00:00Z"
    },
    "interval": "1m",
    "aggregation": "mean",
    "values": [
      { "timestamp": "2026-01-24T11:00:00Z", "value": 2.1 },
      { "timestamp": "2026-01-24T11:01:00Z", "value": 2.3 },
      { "timestamp": "2026-01-24T11:02:00Z", "value": 2.2 }
    ],
    "statistics": {
      "count": 60,
      "mean": 2.15,
      "min": 1.9,
      "max": 2.8,
      "std_dev": 0.21
    }
  }
}
```

#### GET /sensors/realtime

실시간 센서 데이터 (Batch)

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| equipment_id | string | No | 장비 ID |
| sensor_ids | string | No | 센서 ID 목록 (comma separated) |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "timestamp": "2026-01-24T12:00:00.123Z",
    "sensors": {
      "SENSOR-VIB-001": {
        "value": 2.1,
        "unit": "mm/s",
        "status": "NORMAL"
      },
      "SENSOR-TEMP-001": {
        "value": 58.3,
        "unit": "°C",
        "status": "NORMAL"
      },
      "SENSOR-CUR-001": {
        "value": 45.2,
        "unit": "A",
        "status": "WARNING"
      }
    }
  }
}
```

---

### 3.6 알림 API

#### GET /alerts

알림 목록 조회

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| equipment_id | string | No | 장비 ID |
| severity | string | No | 심각도 (INFO, WARNING, CRITICAL, EMERGENCY) |
| status | string | No | 상태 (ACTIVE, ACKNOWLEDGED, RESOLVED) |
| start_time | datetime | No | 시작 시간 |
| end_time | datetime | No | 종료 시간 |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "ALERT-001",
      "equipment_id": "EQ-SHR-001",
      "equipment_name": "이축 파쇄기 #1",
      "type": "OVERLOAD",
      "severity": "WARNING",
      "status": "ACTIVE",
      "title": "과부하 감지",
      "message": "모터 1 전류가 정격의 115%에 도달했습니다",
      "details": {
        "sensor_id": "SENSOR-CUR-001",
        "current_value": 86.25,
        "threshold": 75.0,
        "percentage": 115
      },
      "created_at": "2026-01-24T11:45:00Z",
      "acknowledged_at": null,
      "acknowledged_by": null,
      "resolved_at": null
    }
  ]
}
```

#### POST /alerts/{id}/acknowledge

알림 확인

**Request:**
```json
{
  "note": "확인함. 재료 투입량 조절 예정"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "ALERT-001",
    "status": "ACKNOWLEDGED",
    "acknowledged_at": "2026-01-24T11:50:00Z",
    "acknowledged_by": {
      "id": "USER-001",
      "name": "김운전"
    }
  }
}
```

#### POST /alerts/{id}/resolve

알림 해결

**Request:**
```json
{
  "resolution": "재료 투입량 감소로 정상화됨",
  "root_cause": "대형 금속 조각 혼입"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "ALERT-001",
    "status": "RESOLVED",
    "resolved_at": "2026-01-24T12:00:00Z",
    "resolved_by": {
      "id": "USER-001",
      "name": "김운전"
    }
  }
}
```

---

### 3.7 AI/분석 API

#### GET /ai/health-score/{equipment_id}

장비 건강 점수 조회

**Response (200):**
```json
{
  "success": true,
  "data": {
    "equipment_id": "EQ-SHR-001",
    "overall_score": 87,
    "timestamp": "2026-01-24T12:00:00Z",
    "components": {
      "bearing_drive": {
        "score": 82,
        "status": "GOOD",
        "trend": "STABLE"
      },
      "bearing_idle": {
        "score": 91,
        "status": "GOOD",
        "trend": "IMPROVING"
      },
      "motor_1": {
        "score": 85,
        "status": "GOOD",
        "trend": "STABLE"
      },
      "motor_2": {
        "score": 88,
        "status": "GOOD",
        "trend": "STABLE"
      },
      "blade": {
        "score": 78,
        "status": "FAIR",
        "trend": "DEGRADING"
      }
    },
    "history": [
      { "date": "2026-01-17", "score": 89 },
      { "date": "2026-01-18", "score": 88 },
      { "date": "2026-01-19", "score": 88 },
      { "date": "2026-01-20", "score": 87 },
      { "date": "2026-01-21", "score": 87 },
      { "date": "2026-01-22", "score": 87 },
      { "date": "2026-01-23", "score": 87 }
    ]
  }
}
```

#### GET /ai/rul/{equipment_id}

잔여 수명 예측 (RUL)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "equipment_id": "EQ-SHR-001",
    "predicted_at": "2026-01-24T12:00:00Z",
    "model_version": "2.1.0",
    "confidence": 0.85,
    "components": [
      {
        "name": "구동축 베어링",
        "component_id": "COMP-BRG-001",
        "rul_days": 145,
        "rul_range": {
          "min": 120,
          "max": 170
        },
        "failure_probability_30d": 0.02,
        "failure_probability_90d": 0.15,
        "recommended_action": "정기 점검 유지",
        "next_inspection": "2026-03-15"
      },
      {
        "name": "블레이드",
        "component_id": "COMP-BLD-001",
        "rul_days": 45,
        "rul_range": {
          "min": 30,
          "max": 60
        },
        "failure_probability_30d": 0.35,
        "failure_probability_90d": 0.85,
        "recommended_action": "블레이드 교체 계획 수립 필요",
        "next_inspection": "2026-02-10"
      }
    ]
  }
}
```

#### GET /ai/anomaly/{equipment_id}

이상 탐지 결과 조회

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| start_time | datetime | No | 시작 시간 |
| end_time | datetime | No | 종료 시간 |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "equipment_id": "EQ-SHR-001",
    "current_status": {
      "is_anomaly": false,
      "anomaly_score": 0.12,
      "threshold": 0.5
    },
    "recent_anomalies": [
      {
        "id": "ANOMALY-001",
        "detected_at": "2026-01-23T14:30:00Z",
        "type": "VIBRATION_PATTERN",
        "severity": "LOW",
        "anomaly_score": 0.62,
        "affected_sensors": ["SENSOR-VIB-001", "SENSOR-VIB-002"],
        "description": "구동축 진동 패턴 변화 감지",
        "probable_causes": [
          { "cause": "재료 불균일", "probability": 0.65 },
          { "cause": "베어링 초기 마모", "probability": 0.25 },
          { "cause": "정렬 불량", "probability": 0.10 }
        ],
        "resolved": true,
        "resolution": "재료 공급 안정화 후 정상화"
      }
    ]
  }
}
```

#### POST /ai/predict/overload

과부하 예측

**Request:**
```json
{
  "equipment_id": "EQ-SHR-001",
  "prediction_horizon_minutes": 30
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "equipment_id": "EQ-SHR-001",
    "predicted_at": "2026-01-24T12:00:00Z",
    "prediction_horizon": "30 minutes",
    "overload_probability": 0.15,
    "risk_level": "LOW",
    "current_load": 68,
    "predicted_peak_load": 82,
    "factors": [
      {
        "factor": "current_trend",
        "contribution": 0.4,
        "description": "전류 상승 추세"
      },
      {
        "factor": "material_density",
        "contribution": 0.3,
        "description": "현재 재료 밀도"
      }
    ],
    "recommendations": [
      "현재 운전 조건 유지 권장",
      "투입량 모니터링 지속"
    ]
  }
}
```

---

### 3.8 리포트 API

#### GET /reports/daily

일일 리포트 조회

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| date | date | Yes | 조회 날짜 (YYYY-MM-DD) |
| equipment_id | string | No | 장비 ID |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "report_date": "2026-01-23",
    "generated_at": "2026-01-24T00:30:00Z",
    "facility": {
      "id": "HK-FACTORY-001",
      "name": "한국기계엔지니어링 본사 공장"
    },
    "summary": {
      "total_runtime_hours": 18.5,
      "total_processed_tons": 72.3,
      "average_efficiency": 92.1,
      "total_alerts": 3,
      "critical_alerts": 0,
      "energy_consumption_kwh": 1245.6
    },
    "equipment_reports": [
      {
        "equipment_id": "EQ-SHR-001",
        "name": "이축 파쇄기 #1",
        "runtime_hours": 8.0,
        "processed_tons": 32.5,
        "efficiency_percent": 93.2,
        "availability_percent": 95.5,
        "alerts": 1,
        "peak_load_percent": 85,
        "average_vibration": 2.3,
        "average_temperature": 56.8
      }
    ],
    "ai_insights": [
      {
        "type": "OPTIMIZATION",
        "message": "이축 파쇄기 #1의 오전 운전 속도를 2RPM 낮추면 에너지 8% 절감 가능"
      },
      {
        "type": "MAINTENANCE",
        "message": "분쇄기 #1 블레이드 마모율 증가 추세, 2주 내 점검 권장"
      }
    ]
  }
}
```

#### POST /reports/generate

리포트 생성 요청

**Request:**
```json
{
  "type": "WEEKLY",
  "start_date": "2026-01-17",
  "end_date": "2026-01-23",
  "equipment_ids": ["EQ-SHR-001", "EQ-CRS-001"],
  "include_sections": ["summary", "equipment_detail", "ai_analysis", "maintenance"],
  "format": "PDF"
}
```

**Response (202):**
```json
{
  "success": true,
  "data": {
    "report_id": "REPORT-550e8400",
    "status": "GENERATING",
    "estimated_completion": "2026-01-24T12:05:00Z",
    "download_url": null
  }
}
```

#### GET /reports/{report_id}/status

리포트 생성 상태 조회

**Response (200):**
```json
{
  "success": true,
  "data": {
    "report_id": "REPORT-550e8400",
    "status": "COMPLETED",
    "completed_at": "2026-01-24T12:03:00Z",
    "download_url": "https://api.hankookmech.com/v1/reports/REPORT-550e8400/download",
    "expires_at": "2026-01-31T12:03:00Z"
  }
}
```

---

## 4. WebSocket API

### 4.1 연결

```javascript
// 연결 URL
const socket = io('wss://ws.hankookmech.com', {
  auth: {
    token: 'Bearer <access_token>'
  },
  transports: ['websocket']
});
```

### 4.2 이벤트 명세

#### 클라이언트 → 서버 이벤트

| Event | Payload | Description |
|-------|---------|-------------|
| `subscribe` | { channels: string[] } | 채널 구독 |
| `unsubscribe` | { channels: string[] } | 구독 해제 |
| `control` | { equipment_id, command, params } | 장비 제어 |

```javascript
// 채널 구독
socket.emit('subscribe', {
  channels: [
    'sensor:EQ-SHR-001',
    'alert:EQ-SHR-001',
    'status:EQ-SHR-001'
  ]
});

// 장비 제어
socket.emit('control', {
  equipment_id: 'EQ-SHR-001',
  command: 'SET_SPEED',
  params: { target_rpm: 25 }
});
```

#### 서버 → 클라이언트 이벤트

| Event | Payload | Description |
|-------|---------|-------------|
| `sensor:data` | SensorData | 센서 데이터 업데이트 |
| `equipment:status` | EquipmentStatus | 장비 상태 변경 |
| `alert:new` | Alert | 새 알림 발생 |
| `alert:update` | Alert | 알림 상태 변경 |
| `ai:anomaly` | AnomalyEvent | 이상 탐지 |
| `control:result` | ControlResult | 제어 명령 결과 |

```javascript
// 센서 데이터 수신
socket.on('sensor:data', (data) => {
  /*
  {
    timestamp: "2026-01-24T12:00:00.123Z",
    equipment_id: "EQ-SHR-001",
    sensors: {
      "SENSOR-VIB-001": { value: 2.1, status: "NORMAL" },
      "SENSOR-TEMP-001": { value: 58.3, status: "NORMAL" }
    }
  }
  */
});

// 새 알림 수신
socket.on('alert:new', (alert) => {
  /*
  {
    id: "ALERT-001",
    equipment_id: "EQ-SHR-001",
    severity: "WARNING",
    title: "과부하 감지",
    message: "모터 1 전류가 정격의 115%에 도달했습니다",
    created_at: "2026-01-24T11:45:00Z"
  }
  */
});

// 이상 탐지 수신
socket.on('ai:anomaly', (anomaly) => {
  /*
  {
    equipment_id: "EQ-SHR-001",
    anomaly_score: 0.72,
    type: "VIBRATION_PATTERN",
    severity: "MEDIUM",
    affected_sensors: ["SENSOR-VIB-001"],
    probable_causes: [...]
  }
  */
});
```

### 4.3 채널 구조

```
채널 명명 규칙: {resource}:{target_id}

sensor:EQ-SHR-001      - 특정 장비 센서 데이터
sensor:all             - 모든 장비 센서 데이터
status:EQ-SHR-001      - 특정 장비 상태
status:all             - 모든 장비 상태
alert:EQ-SHR-001       - 특정 장비 알림
alert:all              - 모든 알림
ai:EQ-SHR-001          - 특정 장비 AI 분석
ai:all                 - 모든 AI 분석
```

### 4.4 하트비트 및 재연결

```javascript
// 서버 하트비트 (30초마다)
socket.on('ping', () => {
  socket.emit('pong');
});

// 연결 해제 시 재연결
socket.on('disconnect', (reason) => {
  if (reason === 'io server disconnect') {
    // 서버에서 연결 해제 - 수동 재연결 필요
    socket.connect();
  }
  // 기타 이유 - 자동 재연결 시도
});

// 재연결 시 구독 복원
socket.on('connect', () => {
  if (previousSubscriptions.length > 0) {
    socket.emit('subscribe', { channels: previousSubscriptions });
  }
});
```

---

## 5. MQTT API

### 5.1 Topic 구조

```
{version}/{direction}/{facility_id}/{equipment_id}/{resource}

예:
v1/sensor/HK-001/EQ-SHR-001/data       # 센서 데이터
v1/control/HK-001/EQ-SHR-001/command   # 제어 명령
v1/alert/HK-001/EQ-SHR-001/new         # 새 알림
v1/status/HK-001/EQ-SHR-001/update     # 상태 업데이트
v1/ai/HK-001/EQ-SHR-001/anomaly        # 이상 탐지
```

### 5.2 메시지 형식

#### 센서 데이터 (v1/sensor/{facility}/{equipment}/data)

**QoS:** 1
**Retain:** false

```json
{
  "ts": 1706097600123,
  "eq": "EQ-SHR-001",
  "s": {
    "v1": 2.1,
    "v2": 1.8,
    "t1": 58.3,
    "t2": 45.2,
    "c1": 45.2,
    "c2": 43.8,
    "rpm": 22
  }
}
```

| 필드 | 설명 |
|------|------|
| ts | Unix timestamp (ms) |
| eq | Equipment ID |
| s.v1-v4 | 진동 센서 (mm/s) |
| s.t1-t3 | 온도 센서 (°C) |
| s.c1-c2 | 전류 센서 (A) |
| s.rpm | 회전 속도 (RPM) |

#### 제어 명령 (v1/control/{facility}/{equipment}/command)

**QoS:** 2
**Retain:** false

```json
{
  "cmd_id": "CMD-550e8400",
  "cmd": "SET_SPEED",
  "params": {
    "rpm": 25,
    "ramp": 10
  },
  "ts": 1706097600000,
  "user": "USER-001"
}
```

#### 제어 응답 (v1/control/{facility}/{equipment}/response)

```json
{
  "cmd_id": "CMD-550e8400",
  "status": "COMPLETED",
  "result": {
    "current_rpm": 25
  },
  "ts": 1706097610000
}
```

### 5.3 Edge Gateway MQTT 구현

```c
// Edge Gateway - MQTT 설정 (ESP-IDF)
#define MQTT_BROKER_URI "mqtts://mqtt.hankookmech.com:8883"
#define MQTT_CLIENT_ID  "EDGE-HK-001-EQ-SHR-001"

// Topic 정의
#define TOPIC_SENSOR_DATA   "v1/sensor/HK-001/EQ-SHR-001/data"
#define TOPIC_CONTROL_CMD   "v1/control/HK-001/EQ-SHR-001/command"
#define TOPIC_CONTROL_RSP   "v1/control/HK-001/EQ-SHR-001/response"
#define TOPIC_STATUS        "v1/status/HK-001/EQ-SHR-001/update"

// 센서 데이터 발행
void publish_sensor_data(sensor_data_t* data) {
    char payload[256];
    snprintf(payload, sizeof(payload),
        "{\"ts\":%llu,\"eq\":\"%s\",\"s\":{"
        "\"v1\":%.2f,\"v2\":%.2f,"
        "\"t1\":%.1f,\"t2\":%.1f,"
        "\"c1\":%.1f,\"c2\":%.1f,"
        "\"rpm\":%d}}",
        get_timestamp_ms(),
        EQUIPMENT_ID,
        data->vibration[0], data->vibration[1],
        data->temperature[0], data->temperature[1],
        data->current[0], data->current[1],
        data->rpm
    );

    esp_mqtt_client_publish(mqtt_client, TOPIC_SENSOR_DATA,
                           payload, strlen(payload), 1, 0);
}

// 제어 명령 수신 콜백
void mqtt_control_handler(char* topic, char* data, int data_len) {
    cJSON* json = cJSON_Parse(data);

    const char* cmd_id = cJSON_GetStringValue(cJSON_GetObjectItem(json, "cmd_id"));
    const char* cmd = cJSON_GetStringValue(cJSON_GetObjectItem(json, "cmd"));
    cJSON* params = cJSON_GetObjectItem(json, "params");

    // 명령 실행
    control_result_t result = execute_control_command(cmd, params);

    // 응답 발행
    char response[128];
    snprintf(response, sizeof(response),
        "{\"cmd_id\":\"%s\",\"status\":\"%s\",\"ts\":%llu}",
        cmd_id,
        result.success ? "COMPLETED" : "FAILED",
        get_timestamp_ms()
    );

    esp_mqtt_client_publish(mqtt_client, TOPIC_CONTROL_RSP,
                           response, strlen(response), 2, 0);

    cJSON_Delete(json);
}
```

---

## 6. Rate Limiting

### 6.1 제한 정책

| API 유형 | 제한 | 윈도우 |
|----------|------|--------|
| REST API (일반) | 1000 requests | 1 minute |
| REST API (인증) | 10 requests | 1 minute |
| REST API (리포트) | 10 requests | 1 hour |
| WebSocket | 100 messages | 1 second |
| MQTT | 200 messages | 1 second |

### 6.2 응답 헤더

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1706097660
```

### 6.3 제한 초과 응답

**HTTP 429 Too Many Requests:**

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "요청 한도를 초과했습니다",
    "details": {
      "limit": 1000,
      "window": "1 minute",
      "retry_after": 45
    }
  }
}
```

---

## 7. API 클라이언트 SDK

### 7.1 JavaScript/TypeScript SDK

```typescript
// 설치
// npm install @hankookmech/api-client

import { HankookMechAPI, WebSocketClient } from '@hankookmech/api-client';

// REST API 클라이언트
const api = new HankookMechAPI({
  baseUrl: 'https://api.hankookmech.com/v1',
  apiKey: 'your-api-key'
});

// 로그인
const { accessToken, refreshToken } = await api.auth.login({
  username: 'operator01',
  password: 'password',
  facilityId: 'HK-FACTORY-001'
});

// 장비 목록 조회
const equipment = await api.equipment.list({
  status: 'RUNNING'
});

// 센서 데이터 조회
const sensorData = await api.sensors.getData('SENSOR-VIB-001', {
  startTime: '2026-01-24T00:00:00Z',
  endTime: '2026-01-24T12:00:00Z',
  interval: '1m'
});

// WebSocket 연결
const ws = new WebSocketClient({
  url: 'wss://ws.hankookmech.com',
  token: accessToken
});

ws.subscribe(['sensor:EQ-SHR-001', 'alert:all']);

ws.on('sensor:data', (data) => {
  console.log('Sensor update:', data);
});

ws.on('alert:new', (alert) => {
  console.log('New alert:', alert);
});
```

### 7.2 Python SDK

```python
# 설치
# pip install hankookmech-api

from hankookmech import HankookMechAPI, MQTTClient

# API 클라이언트
api = HankookMechAPI(
    base_url='https://api.hankookmech.com/v1',
    api_key='your-api-key'
)

# 로그인
auth = api.auth.login(
    username='operator01',
    password='password',
    facility_id='HK-FACTORY-001'
)

# AI 분석 조회
health = api.ai.get_health_score('EQ-SHR-001')
print(f"Health Score: {health.overall_score}")

rul = api.ai.get_rul('EQ-SHR-001')
for component in rul.components:
    print(f"{component.name}: {component.rul_days} days remaining")

# MQTT 클라이언트
mqtt = MQTTClient(
    broker='mqtt.hankookmech.com',
    port=8883,
    client_id='python-client',
    username='api-user',
    password='api-password'
)

def on_sensor_data(topic, payload):
    print(f"Sensor: {payload['eq']}, Data: {payload['s']}")

mqtt.subscribe('v1/sensor/HK-001/+/data', on_sensor_data)
mqtt.loop_forever()
```

---

## 8. Webhook

### 8.1 Webhook 등록

#### POST /webhooks

```json
{
  "url": "https://your-server.com/webhook",
  "events": ["alert.created", "alert.resolved", "equipment.status_changed"],
  "secret": "your-webhook-secret",
  "active": true
}
```

### 8.2 Webhook 페이로드

```json
{
  "id": "WH-550e8400",
  "event": "alert.created",
  "created_at": "2026-01-24T12:00:00Z",
  "data": {
    "alert": {
      "id": "ALERT-001",
      "equipment_id": "EQ-SHR-001",
      "severity": "WARNING",
      "title": "과부하 감지"
    }
  }
}
```

### 8.3 서명 검증

```python
import hmac
import hashlib

def verify_webhook_signature(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(f"sha256={expected}", signature)

# 사용
payload = request.body
signature = request.headers.get('X-Webhook-Signature')
is_valid = verify_webhook_signature(payload, signature, webhook_secret)
```

---

## 9. API 문서 및 테스트

### 9.1 Swagger/OpenAPI

- **Swagger UI:** https://api.hankookmech.com/docs
- **OpenAPI Spec:** https://api.hankookmech.com/openapi.json

### 9.2 Postman Collection

```
https://api.hankookmech.com/postman/collection.json
```

### 9.3 테스트 환경

| 환경 | Base URL | 설명 |
|------|----------|------|
| Production | https://api.hankookmech.com/v1 | 운영 환경 |
| Staging | https://staging-api.hankookmech.com/v1 | 스테이징 |
| Development | https://dev-api.hankookmech.com/v1 | 개발 환경 |

---

**작성일:** 2026-01-24
**버전:** v1.0
**작성자:** UTTEC
