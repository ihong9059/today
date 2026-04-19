# MVP vs newMvp 비교 설명서

## 1. 한눈에 보기

| 항목 | mvp (분리형) | newMvp (통합형) |
|------|-------------|----------------|
| **구조** | 서버 + 앱 분리 | 앱 하나로 통합 |
| **서버** | Python FastAPI (8081, 8091) | 불필요 |
| **앱** | Kotlin (서버 API 호출) | Kotlin (AI API 직접 호출) |
| **AI 호출** | 앱 → 서버 → AI API | 앱 → AI API (직접) |
| **상태** | 현재 운영 중 | 코드 작성 완료, 미적용 |
| **작성일** | 2026-02-25 | 2026-02-27 |

---

## 2. 아키텍처 비교

### mvp (분리형) - 현재 운영 중
```
┌──────────────┐    HTTP/WS     ┌──────────────────┐    API     ┌──────────┐
│  스마트폰 앱  │ ────────────► │  Python Server   │ ────────► │ AI API   │
│  (Kotlin)    │               │  (FastAPI)       │           │ OpenAI   │
│              │               │  포트 8081       │           │ Gemini   │
│  - UI        │               │  - prompt 생성   │           └──────────┘
│  - STT/TTS   │               │  - AI 서비스     │
│  - BLE 통신  │               │  - 콘서트 데이터 │
│              │    WebSocket   ├──────────────────┤
│              │ ────────────► │  Control Center  │
│              │               │  포트 8091       │
└──────────────┘               │  - 관제/추첨     │
                               └──────────────────┘
                               Tailscale 100.79.180.64
```

### newMvp (통합형) - 제안/미적용
```
┌──────────────────────────────────┐    API     ┌──────────┐
│  스마트폰 앱 (All-in-One)         │ ────────► │ AI API   │
│  (Kotlin)                        │           │ OpenAI   │
│                                  │           │ Gemini   │
│  - UI (Jetpack Compose)          │           └──────────┘
│  - STT/TTS                       │
│  - BLE 통신                      │
│  - PromptGenerator.kt (내장)     │
│  - AIService.kt (직접 호출)      │
│  - concert_data.json (내장)      │
└──────────────────────────────────┘
   서버 불필요, 앱만으로 동작
```

---

## 3. 파일 구조 비교

### mvp/
```
mvp/
├── FanStickApp/                    # Android 앱 (Kotlin)
│   └── app/src/main/kotlin/
│       └── com/uttec/fanstick/
│           └── MainActivity.kt     # 서버 API를 HTTP로 호출
├── backup_server/
│   ├── server/                     # AI 서버 (→ 서버 8081)
│   │   ├── main.py                 #   FastAPI 엔드포인트 (~265줄)
│   │   ├── gemini_service.py       #   AI API 호출 + 폴백 (~283줄)
│   │   ├── prompt_generator.py     #   시스템 프롬프트 생성 (~215줄)
│   │   └── data/concert_data.json  #   콘서트 데이터
│   └── control_center/             # 관제 서버 (→ 서버 8091)
│       ├── server.py               #   WebSocket 디바이스 관리
│       └── admin.html              #   관리자 대시보드
├── server/.env                     # API 키 설정
└── deploy.sh                       # 서버 배포 스크립트
```

### newMvp/
```
newMvp/
├── PromptGenerator.kt              # prompt_generator.py → Kotlin 변환
├── AIService.kt                    # gemini_service.py → Kotlin 변환
├── assets/
│   └── concert_data.json           # 콘서트 데이터 (앱 내장)
├── 통합앱_아키텍처_분석.md          # 장단점 상세 분석
├── 온디바이스_AI_검토서.md/pdf      # 온디바이스 AI 기술 검토
└── README.md                       # 프로젝트 설명
```

---

## 4. 코드 변환 대응표

| Python (mvp 서버) | Kotlin (newMvp 앱) | 변환 내용 |
|-------------------|-------------------|----------|
| `gemini_service.py` → `AIService` 클래스 | `AIService.kt` | OkHttp로 Gemini/OpenAI 직접 호출, 폴백 로직 동일 |
| `prompt_generator.py` → `PromptGenerator` 클래스 | `PromptGenerator.kt` | 셋리스트·멤버 포맷팅, 시스템 프롬프트 생성 동일 |
| `concert_data.json` (서버 파일) | `assets/concert_data.json` (앱 내장) | 동일 데이터, 로딩 방식만 다름 |
| `main.py` FastAPI 엔드포인트 | **제거** | HTTP 서버 불필요, 앱에서 직접 함수 호출 |

### 핵심 코드 변경 (앱에서 AI 호출)

**mvp** - 서버 경유:
```kotlin
// 서버 API를 HTTP로 호출
httpClient.newCall(
    Request.Builder().url("$SERVER_URL/api/ask").post(body).build()
).execute()
```

**newMvp** - 직접 호출:
```kotlin
// AI API를 앱에서 직접 호출
val aiService = AIService(concertData, promptGenerator, geminiApiKey)
val response = aiService.ask("다음 곡이 뭐야?")
// response.response → "다음 곡은 '봄날'이야!"
// response.ledColor → [255, 182, 193]
```

---

## 5. 장단점 비교

### mvp (분리형) 장점
- API 키가 서버에만 있어 **보안 안전**
- 콘서트 데이터를 서버에서 **중앙 관리** (실시간 변경 가능)
- Control Center로 전체 관객 **일괄 제어** 가능
- 서버 로그로 **디버깅 용이**
- AI 사용량 서버에서 **모니터링/제한** 가능

### mvp (분리형) 단점
- 서버 구축/운영 필요 (현재 Tailscale 서버 상시 가동)
- 앱 → 서버 → AI API **이중 네트워크 홉** (응답 ~3초)
- 서버 장애 시 앱 **전체 불능**

### newMvp (통합형) 장점
- **서버 불필요** — APK 하나로 모든 기능
- 앱 → AI API 직접 호출로 **응답 ~2초** (1초 단축)
- 콘서트 데이터 로컬 조회 **오프라인 부분 지원**
- 배포·데모 시 **앱 설치만으로 완료**
- 서버 호스팅 **비용 절감**

### newMvp (통합형) 단점
- **API 키가 앱에 포함** → 디컴파일 시 노출 위험
- 콘서트 데이터 변경 시 **앱 업데이트 필요**
- 전체 관객 **중앙 제어 불가** (Control Center 없음)
- 각 사용자가 개별 API 호출 → **비용 추적 어려움**

---

## 6. 현재 상태 및 결론

| 구분 | 상태 |
|------|------|
| **mvp** | 서버 운영 중 (8081+8091), 앱 설치됨 (v1.0.0-MVP) |
| **newMvp** | Kotlin 코드 작성 완료 (AIService.kt, PromptGenerator.kt), **앱 미통합** |

### 권장 전략

| 단계 | 권장 | 이유 |
|------|------|------|
| **데모/시연** | newMvp (통합형) | 서버 없이 앱만으로 즉시 시연 가능 |
| **MVP 운영** | mvp (분리형) — 현재 사용 중 | Control Center 관제 기능 필요 |
| **상용화** | 하이브리드 | 앱 + 백엔드 프록시(API 키 보호) + Control Center |

### 마이그레이션 소요
- newMvp 코드를 기존 앱에 통합: **약 2~3일**
- Phase 1: 코드 통합 (1~2일)
- Phase 2: 테스트 (0.5일)
- Phase 3: BLE 연동 검증 (0.5일)

---

*작성일: 2026-04-20*
