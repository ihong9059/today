# AI FanStick - 통합 앱 (newMvp)

> Server와 App을 하나로 통합한 All-in-One 스마트폰 앱

---

## 개요

기존 MVP는 **Python 서버 + Android 앱**으로 분리되어 있었습니다.
이 newMvp는 서버 기능을 앱에 통합하여 **앱 하나로 완전한 AI FanStick 경험**을 제공합니다.

---

## 아키텍처 비교

### 기존 (분리형)
```
[Android App] ──HTTP──► [Python Server] ──API──► [AI API]
     │
     └──BLE──► [응원봉]
```

### 통합형 (newMvp)
```
[Android App (All-in-One)]
     │
     ├──API──► [AI API] (직접 호출)
     │
     └──BLE──► [응원봉]
```

---

## 파일 구조

```
newMvp/
├── README.md                      # 이 문서
├── 통합앱_아키텍처_분석.md        # 장단점 상세 분석
├── PromptGenerator.kt             # 시스템 프롬프트 생성기 (Python→Kotlin)
├── AIService.kt                   # AI API 서비스 (Gemini/OpenAI 직접 호출)
└── assets/
    └── concert_data.json          # 콘서트 데이터 (앱 내장)
```

---

## 장점 요약

| 장점 | 설명 |
|------|------|
| 서버 불필요 | Python 서버 실행 없이 앱만으로 동작 |
| 네트워크 지연 감소 | 앱↔서버 HTTP 통신 제거 |
| 배포 단순화 | APK 파일 하나로 모든 기능 |
| 오프라인 부분 지원 | 콘서트 데이터는 로컬에서 조회 가능 |

---

## 단점 및 대응

| 단점 | 대응 방안 |
|------|----------|
| API 키 노출 위험 | BuildConfig, ProGuard, Firebase Remote Config |
| 중앙 제어 어려움 | WebSocket Control Center 유지 |
| 데이터 업데이트 | Firebase Realtime DB 또는 앱 내 JSON 다운로드 |

---

## 사용 방법

### 1. API 키 설정

`local.properties` 또는 `BuildConfig`에 API 키 추가:

```properties
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
```

### 2. concert_data.json 배치

`app/src/main/assets/concert_data.json`에 콘서트 데이터 파일 배치

### 3. 클래스 사용

```kotlin
// 초기화
val concertData = ConcertDataManager(context)
val promptGenerator = PromptGenerator(concertData)
val aiService = AIService(
    concertData = concertData,
    promptGenerator = promptGenerator,
    geminiApiKey = BuildConfig.GEMINI_API_KEY
)

// AI 질문
lifecycleScope.launch {
    val response = aiService.ask("다음 곡이 뭐야?")

    // 응답 처리
    textView.text = response.response

    // LED 제어
    val (r, g, b) = response.ledColor
    sendBleCommand("C:$r,$g,$b")
}
```

---

## 마이그레이션 가이드

### 기존 코드 변경점

| 변경 전 (분리형) | 변경 후 (통합형) |
|-----------------|-----------------|
| `httpClient.newCall(Request.Builder().url("$SERVER_URL/api/ask")...)` | `aiService.ask(question)` |
| `httpClient.newCall(Request.Builder().url("$SERVER_URL/api/concert")...)` | `concertData.getCurrentSong()` |
| `httpClient.newCall(Request.Builder().url("$SERVER_URL/api/song/next")...)` | `concertData.nextSong()` |

### 제거 가능한 코드

- 서버 URL 상수 (`AI_SERVER_URL`)
- 서버 연결 확인 로직 (`connectToServer()`)
- HTTP API 호출 코드

---

## 결론

**MVP 단계에서는 통합형을 권장합니다.**

- 개발/배포 효율성
- 데모/시연 용이성
- 1인 개발 환경에서 관리 용이

상용화 단계에서는 API 키 보안과 중앙 데이터 관리를 위해
**백엔드 프록시 + 앱** 하이브리드 구조로 전환을 권장합니다.

---

*작성일: 2026-02-27*
*작성: UTTEC / Claude Code*
