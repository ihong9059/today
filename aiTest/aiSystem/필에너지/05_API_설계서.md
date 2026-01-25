# API 설계서

## 1. API 개요

### 1.1 API 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                    API Architecture                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    Clients                           │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │   │
│  │  │   Web   │ │ Mobile  │ │   HMI   │ │External │   │   │
│  │  │Dashboard│ │  App    │ │  Panel  │ │ System  │   │   │
│  │  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘   │   │
│  └───────┼───────────┼───────────┼───────────┼─────────┘   │
│          │           │           │           │              │
│          └───────────┴─────┬─────┴───────────┘              │
│                            │                                 │
│  ┌─────────────────────────┴─────────────────────────────┐ │
│  │                  API Gateway (Kong)                    │ │
│  │  • Rate Limiting  • Authentication  • Load Balancing  │ │
│  └─────────────────────────┬─────────────────────────────┘ │
│                            │                                 │
│          ┌─────────────────┼─────────────────┐              │
│          │                 │                 │              │
│          ▼                 ▼                 ▼              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │  REST API    │ │  WebSocket   │ │   AI API     │        │
│  │  (Node.js)   │ │  (Socket.io) │ │  (Python)    │        │
│  │              │ │              │ │              │        │
│  │ • CRUD       │ │ • Real-time  │ │ • Inference  │        │
│  │ • Query      │ │ • Streaming  │ │ • Training   │        │
│  │ • Report     │ │ • Alerts     │ │ • Analysis   │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 API 엔드포인트 요약

| 카테고리 | Base URL | 설명 |
|----------|----------|------|
| Equipment | `/api/v1/equipment` | 설비 관리 |
| Sensor | `/api/v1/sensors` | 센서 데이터 |
| AI | `/api/v1/ai` | AI 추론/분석 |
| Alert | `/api/v1/alerts` | 알람 관리 |
| Report | `/api/v1/reports` | 리포트 생성 |
| User | `/api/v1/users` | 사용자 관리 |
| WebSocket | `/ws` | 실시간 스트리밍 |

---

## 2. 인증 및 보안

### 2.1 JWT 인증

```
┌─────────────────────────────────────────────────────────────┐
│                    Authentication Flow                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Login Request                                           │
│     POST /api/v1/auth/login                                │
│     { "email": "user@example.com", "password": "..." }     │
│                                                             │
│  2. Server Response                                         │
│     {                                                       │
│       "accessToken": "eyJhbGciOiJIUzI1NiIs...",           │
│       "refreshToken": "dGhpcyBpcyBhIHJlZnJlc2...",        │
│       "expiresIn": 3600                                    │
│     }                                                       │
│                                                             │
│  3. API Request with Token                                  │
│     GET /api/v1/equipment                                  │
│     Authorization: Bearer eyJhbGciOiJIUzI1NiIs...          │
│                                                             │
│  4. Token Refresh                                           │
│     POST /api/v1/auth/refresh                              │
│     { "refreshToken": "dGhpcyBpcyBhIHJlZnJlc2..." }       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 인증 API

```yaml
# POST /api/v1/auth/login
Request:
  Content-Type: application/json
  Body:
    email: string (required)
    password: string (required)

Response (200):
  accessToken: string
  refreshToken: string
  expiresIn: number
  user:
    id: string
    email: string
    name: string
    role: string

Response (401):
  error: "Invalid credentials"
```

### 2.3 권한 레벨

| 역할 | 권한 |
|------|------|
| **admin** | 모든 API 접근, 사용자 관리 |
| **engineer** | 설비 제어, 설정 변경 |
| **operator** | 모니터링, 알람 확인 |
| **viewer** | 읽기 전용 |

---

## 3. Equipment API

### 3.1 설비 목록 조회

```yaml
GET /api/v1/equipment

Query Parameters:
  status: string (optional) - normal, warning, error, maintenance
  type: string (optional) - stacking, notching, winder
  page: number (default: 1)
  limit: number (default: 20)

Response (200):
  data:
    - id: "stacking-01"
      name: "Stacking #1"
      type: "stacking"
      status: "normal"
      location: "A동 1라인"
      lastUpdate: "2026-01-25T12:00:00Z"
      metrics:
        uptime: 99.5
        anomalyScore: 0.12
        todayAlerts: 2
    - id: "notching-01"
      name: "Notching #1"
      ...
  pagination:
    total: 6
    page: 1
    limit: 20
```

### 3.2 설비 상세 조회

```yaml
GET /api/v1/equipment/:id

Path Parameters:
  id: string (required) - 설비 ID

Response (200):
  id: "stacking-01"
  name: "Stacking #1"
  type: "stacking"
  status: "normal"
  location: "A동 1라인"
  specifications:
    manufacturer: "필에너지"
    model: "ST-5000"
    installDate: "2024-06-15"
    capacity: "0.5 sec/층"
  sensors:
    - id: "VIB_1"
      type: "vibration"
      value: 2.45
      unit: "mm/s"
      status: "normal"
    - id: "TEMP_1"
      type: "temperature"
      value: 42.3
      unit: "°C"
      status: "normal"
  aiStatus:
    anomalyScore: 0.12
    rulHours: 5420
    qualityGrade: "A"
  maintenanceHistory:
    - date: "2026-01-15"
      type: "정기점검"
      description: "베어링 윤활"
```

### 3.3 설비 상태 업데이트

```yaml
PATCH /api/v1/equipment/:id/status

Path Parameters:
  id: string (required)

Request:
  Content-Type: application/json
  Body:
    status: string (required) - normal, maintenance, error
    reason: string (optional)

Response (200):
  id: "stacking-01"
  status: "maintenance"
  updatedAt: "2026-01-25T12:00:00Z"
  updatedBy: "user@example.com"
```

---

## 4. Sensor API

### 4.1 센서 데이터 조회

```yaml
GET /api/v1/sensors/:equipmentId/data

Path Parameters:
  equipmentId: string (required)

Query Parameters:
  sensorId: string (optional) - 특정 센서만 조회
  type: string (optional) - vibration, temperature, tension, etc.
  start: string (required) - ISO 8601 시작 시간
  end: string (required) - ISO 8601 종료 시간
  interval: string (default: "1m") - 집계 간격 (1s, 1m, 5m, 1h)

Response (200):
  equipmentId: "stacking-01"
  timeRange:
    start: "2026-01-25T11:00:00Z"
    end: "2026-01-25T12:00:00Z"
  data:
    - sensorId: "VIB_1"
      type: "vibration"
      unit: "mm/s"
      values:
        - timestamp: "2026-01-25T11:00:00Z"
          value: 2.45
          min: 2.10
          max: 2.80
        - timestamp: "2026-01-25T11:01:00Z"
          value: 2.52
          min: 2.15
          max: 2.85
```

### 4.2 실시간 센서 데이터

```yaml
GET /api/v1/sensors/:equipmentId/realtime

Path Parameters:
  equipmentId: string (required)

Response (200):
  equipmentId: "stacking-01"
  timestamp: "2026-01-25T12:00:00.123Z"
  sensors:
    - id: "VIB_1"
      type: "vibration"
      value: 2.45
      unit: "mm/s"
      status: "normal"
      threshold:
        warning: 5.0
        error: 10.0
    - id: "TEMP_1"
      type: "temperature"
      value: 42.3
      unit: "°C"
      status: "normal"
      threshold:
        warning: 60.0
        error: 80.0
```

### 4.3 센서 통계 조회

```yaml
GET /api/v1/sensors/:equipmentId/statistics

Query Parameters:
  period: string (required) - day, week, month

Response (200):
  equipmentId: "stacking-01"
  period: "day"
  statistics:
    - sensorId: "VIB_1"
      type: "vibration"
      mean: 2.45
      std: 0.32
      min: 1.80
      max: 3.20
      trend: "stable"
    - sensorId: "TEMP_1"
      type: "temperature"
      mean: 42.3
      std: 2.1
      min: 38.5
      max: 48.2
      trend: "increasing"
```

---

## 5. AI API

### 5.1 이상 탐지

```yaml
GET /api/v1/ai/:equipmentId/anomaly

Path Parameters:
  equipmentId: string (required)

Response (200):
  equipmentId: "stacking-01"
  timestamp: "2026-01-25T12:00:00Z"
  anomalyScore: 0.32
  status: "normal"
  confidence: 0.95
  features:
    vib_rms: 2.45
    temp_delta: 5.2
    tension_std: 1.8
  recommendation: null
```

```yaml
POST /api/v1/ai/anomaly/detect

Request:
  Content-Type: application/json
  Body:
    features:
      - name: "vib_rms"
        value: 2.45
      - name: "temp_delta"
        value: 5.2
      - name: "tension_std"
        value: 1.8

Response (200):
  anomalyScore: 0.32
  status: "normal"
  details:
    - feature: "vib_rms"
      contribution: 0.15
      status: "normal"
    - feature: "temp_delta"
      contribution: 0.12
      status: "normal"
```

### 5.2 잔여 수명 예측 (RUL)

```yaml
GET /api/v1/ai/:equipmentId/rul

Path Parameters:
  equipmentId: string (required)

Query Parameters:
  component: string (optional) - laser, bearing, servo

Response (200):
  equipmentId: "stacking-01"
  timestamp: "2026-01-25T12:00:00Z"
  predictions:
    - component: "laser_source"
      rulHours: 2340
      confidence:
        lower: 2100
        upper: 2580
      status: "good"
      maintenanceDate: "2026-04-15"
      recommendation: "500시간 내 교체 계획 수립 권고"
    - component: "servo_bearing"
      rulHours: 5420
      confidence:
        lower: 4800
        upper: 6000
      status: "good"
      maintenanceDate: "2026-08-20"
      recommendation: null
```

### 5.3 품질 예측

```yaml
GET /api/v1/ai/:equipmentId/quality

Path Parameters:
  equipmentId: string (required)

Response (200):
  equipmentId: "stacking-01"
  timestamp: "2026-01-25T12:00:00Z"
  prediction:
    grade: "A"
    confidence: 0.95
    alignmentError: 0.042
  processConditions:
    temperature: 42.3
    humidity: 45
    tension: 150
    speed: 0.8
  recommendation: null
```

### 5.4 AI 모델 정보

```yaml
GET /api/v1/ai/models

Response (200):
  models:
    - id: "anomaly_detector_v1"
      type: "anomaly_detection"
      version: "1.2.0"
      deployedAt: "2026-01-20T10:00:00Z"
      metrics:
        f1Score: 0.94
        precision: 0.92
        recall: 0.96
    - id: "rul_predictor_v1"
      type: "rul_prediction"
      version: "1.1.0"
      deployedAt: "2026-01-18T10:00:00Z"
      metrics:
        rmse: 180
        mae: 120
```

---

## 6. Alert API

### 6.1 알람 목록 조회

```yaml
GET /api/v1/alerts

Query Parameters:
  equipmentId: string (optional)
  severity: string (optional) - info, warning, critical
  acknowledged: boolean (optional)
  start: string (optional) - ISO 8601
  end: string (optional) - ISO 8601
  page: number (default: 1)
  limit: number (default: 50)

Response (200):
  data:
    - id: "ALT_20260125_001"
      equipmentId: "stacking-01"
      severity: "warning"
      source: "ai/anomaly"
      message: "이상 점수 상승 감지 (0.75)"
      details:
        anomalyScore: 0.75
        threshold: 0.5
        affectedSensors: ["VIB_1", "TEMP_1"]
      acknowledged: false
      createdAt: "2026-01-25T11:30:00Z"
  pagination:
    total: 156
    page: 1
    limit: 50
```

### 6.2 알람 상세 조회

```yaml
GET /api/v1/alerts/:id

Response (200):
  id: "ALT_20260125_001"
  equipmentId: "stacking-01"
  severity: "warning"
  source: "ai/anomaly"
  message: "이상 점수 상승 감지 (0.75)"
  details:
    anomalyScore: 0.75
    threshold: 0.5
    affectedSensors: ["VIB_1", "TEMP_1"]
    sensorValues:
      VIB_1: 4.5
      TEMP_1: 58.2
  recommendation: "서보모터 및 베어링 상태 점검 권고"
  acknowledged: false
  acknowledgedBy: null
  acknowledgedAt: null
  createdAt: "2026-01-25T11:30:00Z"
  history:
    - action: "created"
      timestamp: "2026-01-25T11:30:00Z"
    - action: "notification_sent"
      channel: "email"
      timestamp: "2026-01-25T11:30:05Z"
```

### 6.3 알람 확인 처리

```yaml
PATCH /api/v1/alerts/:id/acknowledge

Request:
  Content-Type: application/json
  Body:
    comment: string (optional)
    action: string (optional) - 취한 조치

Response (200):
  id: "ALT_20260125_001"
  acknowledged: true
  acknowledgedBy: "engineer@example.com"
  acknowledgedAt: "2026-01-25T12:00:00Z"
  comment: "서보모터 점검 완료, 정상 상태 확인"
```

### 6.4 알람 통계

```yaml
GET /api/v1/alerts/statistics

Query Parameters:
  period: string (required) - day, week, month
  equipmentId: string (optional)

Response (200):
  period: "week"
  statistics:
    total: 45
    bySeverity:
      critical: 3
      warning: 18
      info: 24
    byEquipment:
      stacking-01: 15
      notching-01: 12
      winder-01: 18
    bySource:
      ai/anomaly: 20
      sensor/threshold: 15
      vision/quality: 10
    trend:
      - date: "2026-01-19"
        count: 8
      - date: "2026-01-20"
        count: 5
      - date: "2026-01-21"
        count: 7
```

---

## 7. Report API

### 7.1 리포트 생성

```yaml
POST /api/v1/reports/generate

Request:
  Content-Type: application/json
  Body:
    type: string (required) - daily, weekly, monthly
    equipmentIds: array (optional) - 빈 배열이면 전체
    dateRange:
      start: string (required)
      end: string (required)
    sections: array (optional) - overview, sensors, ai, quality, alerts
    format: string (default: "json") - json, pdf, excel

Response (202):
  reportId: "RPT_20260125_001"
  status: "processing"
  estimatedTime: 30
  downloadUrl: null
```

### 7.2 리포트 조회

```yaml
GET /api/v1/reports/:id

Response (200):
  reportId: "RPT_20260125_001"
  type: "daily"
  status: "completed"
  createdAt: "2026-01-25T12:00:00Z"
  completedAt: "2026-01-25T12:00:30Z"
  downloadUrl: "/api/v1/reports/RPT_20260125_001/download"
  summary:
    overallHealth: "good"
    uptimePercent: 99.2
    alertCount: 5
    qualityRate: 98.5
  data:
    equipment:
      - id: "stacking-01"
        uptime: 99.5
        avgAnomalyScore: 0.18
        alertCount: 2
    sensorSummary:
      - type: "vibration"
        avgValue: 2.45
        maxValue: 4.2
        trend: "stable"
    aiAnalysis:
      anomalyEvents: 3
      predictedMaintenances: 1
    qualityAnalysis:
      totalInspections: 1250
      okRate: 98.5
      ngRate: 1.5
```

### 7.3 리포트 다운로드

```yaml
GET /api/v1/reports/:id/download

Query Parameters:
  format: string (optional) - pdf, excel (default: original format)

Response (200):
  Content-Type: application/pdf or application/vnd.ms-excel
  Content-Disposition: attachment; filename="report_20260125.pdf"
  [Binary data]
```

---

## 8. WebSocket API

### 8.1 연결

```javascript
// 클라이언트 연결
const socket = io('wss://api.philenergy.com/ws', {
    auth: {
        token: 'Bearer eyJhbGciOiJIUzI1NiIs...'
    }
});

socket.on('connect', () => {
    console.log('Connected to WebSocket');
});
```

### 8.2 이벤트 구독

```javascript
// 설비 구독
socket.emit('subscribe', {
    type: 'equipment',
    equipmentId: 'stacking-01'
});

// 센서 데이터 수신
socket.on('sensor-data', (data) => {
    // {
    //     equipmentId: "stacking-01",
    //     timestamp: "2026-01-25T12:00:00.123Z",
    //     sensors: [
    //         { id: "VIB_1", value: 2.45, status: "normal" },
    //         { id: "TEMP_1", value: 42.3, status: "normal" }
    //     ]
    // }
});

// AI 결과 수신
socket.on('ai-result', (data) => {
    // {
    //     equipmentId: "stacking-01",
    //     timestamp: "2026-01-25T12:00:00.123Z",
    //     anomalyScore: 0.32,
    //     status: "normal"
    // }
});

// 알람 수신
socket.on('alert', (data) => {
    // {
    //     id: "ALT_20260125_001",
    //     equipmentId: "stacking-01",
    //     severity: "warning",
    //     message: "이상 점수 상승"
    // }
});
```

### 8.3 이벤트 목록

| 이벤트 | 방향 | 설명 |
|--------|------|------|
| `subscribe` | Client → Server | 채널 구독 |
| `unsubscribe` | Client → Server | 구독 해제 |
| `sensor-data` | Server → Client | 실시간 센서 데이터 |
| `ai-result` | Server → Client | AI 분석 결과 |
| `alert` | Server → Client | 새 알람 |
| `equipment-status` | Server → Client | 설비 상태 변경 |
| `vision-result` | Server → Client | 비전 검사 결과 |

---

## 9. 에러 코드

### 9.1 HTTP 상태 코드

| 코드 | 의미 | 설명 |
|------|------|------|
| 200 | OK | 요청 성공 |
| 201 | Created | 리소스 생성 |
| 202 | Accepted | 비동기 처리 수락 |
| 400 | Bad Request | 잘못된 요청 |
| 401 | Unauthorized | 인증 필요 |
| 403 | Forbidden | 권한 없음 |
| 404 | Not Found | 리소스 없음 |
| 429 | Too Many Requests | 요청 제한 초과 |
| 500 | Internal Server Error | 서버 오류 |

### 9.2 에러 응답 형식

```json
{
    "error": {
        "code": "EQUIPMENT_NOT_FOUND",
        "message": "Equipment with ID 'stacking-99' not found",
        "details": {
            "equipmentId": "stacking-99"
        },
        "timestamp": "2026-01-25T12:00:00Z",
        "requestId": "req_abc123"
    }
}
```

### 9.3 에러 코드 목록

| 코드 | HTTP | 설명 |
|------|------|------|
| `AUTHENTICATION_REQUIRED` | 401 | 인증 토큰 필요 |
| `INVALID_TOKEN` | 401 | 유효하지 않은 토큰 |
| `TOKEN_EXPIRED` | 401 | 만료된 토큰 |
| `PERMISSION_DENIED` | 403 | 권한 없음 |
| `EQUIPMENT_NOT_FOUND` | 404 | 설비 없음 |
| `SENSOR_NOT_FOUND` | 404 | 센서 없음 |
| `INVALID_PARAMETER` | 400 | 잘못된 파라미터 |
| `RATE_LIMIT_EXCEEDED` | 429 | 요청 제한 초과 |
| `AI_MODEL_ERROR` | 500 | AI 모델 오류 |
| `DATABASE_ERROR` | 500 | 데이터베이스 오류 |

---

## 10. API 사용 예시

### 10.1 cURL 예시

```bash
# 로그인
curl -X POST https://api.philenergy.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# 설비 목록 조회
curl -X GET https://api.philenergy.com/api/v1/equipment \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."

# 센서 데이터 조회
curl -X GET "https://api.philenergy.com/api/v1/sensors/stacking-01/data?start=2026-01-25T11:00:00Z&end=2026-01-25T12:00:00Z&interval=1m" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."

# AI 이상 탐지
curl -X GET https://api.philenergy.com/api/v1/ai/stacking-01/anomaly \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

### 10.2 JavaScript 예시

```javascript
// API 클라이언트
class PhilenergyAPI {
    constructor(baseUrl, token) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    async request(endpoint, options = {}) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error.message);
        }

        return response.json();
    }

    // 설비 목록
    async getEquipment(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/api/v1/equipment?${query}`);
    }

    // 센서 데이터
    async getSensorData(equipmentId, start, end, interval = '1m') {
        return this.request(
            `/api/v1/sensors/${equipmentId}/data?start=${start}&end=${end}&interval=${interval}`
        );
    }

    // AI 이상 탐지
    async getAnomalyScore(equipmentId) {
        return this.request(`/api/v1/ai/${equipmentId}/anomaly`);
    }

    // 알람 확인
    async acknowledgeAlert(alertId, comment) {
        return this.request(`/api/v1/alerts/${alertId}/acknowledge`, {
            method: 'PATCH',
            body: JSON.stringify({ comment })
        });
    }
}

// 사용 예시
const api = new PhilenergyAPI('https://api.philenergy.com', 'your-token');

const equipment = await api.getEquipment({ status: 'normal' });
const anomaly = await api.getAnomalyScore('stacking-01');
```

---

**작성일:** 2026-01-25
**버전:** v1.0
