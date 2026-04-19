# AI FanStick 시스템 전체 Flow 설명서

## 1. 시스템 개요

K-POP 콘서트용 AI 응원봉 시스템. 스마트폰 앱 + 서버 2개로 구성.
관객의 음성 질문에 AI가 응답하고, LED 색상을 실시간으로 제어하며, 본부에서 전체 관객의 응원봉을 관제한다.

```
┌─────────────────────────────────────────────────────────────────┐
│                    Tailscale 서버 (100.79.180.64)                │
│                                                                  │
│  ┌──────────────────────┐    ┌──────────────────────────────┐   │
│  │  AI FanStick Server  │    │  Control Center (본부 관제)   │   │
│  │  (포트 8081)          │    │  (포트 8091)                  │   │
│  │                      │    │                              │   │
│  │  - AI 질의응답       │    │  - 디바이스 실시간 관리      │   │
│  │  - 콘서트 정보       │    │  - LED/멜로디 전체 제어      │   │
│  │  - 셋리스트 관리     │    │  - 추첨 시스템               │   │
│  │  - Gemini/OpenAI     │    │  - 관리자 대시보드           │   │
│  └──────────┬───────────┘    └──────────────┬───────────────┘   │
│             │ REST + WebSocket               │ WebSocket         │
└─────────────┼────────────────────────────────┼──────────────────┘
              │                                │
              └────────────┬───────────────────┘
                           │ 인터넷 (Tailscale VPN)
                           │
              ┌────────────┴────────────┐
              │   스마트폰 앱            │
              │   com.uttec.fanstick    │
              │   (v1.0.0-MVP)          │
              │                         │
              │   - 음성 입력 (STT)     │
              │   - AI 대화             │
              │   - LED 색상 표시       │
              │   - BLE 응원봉 연결     │
              └─────────────────────────┘
```

---

## 2. 서버 구성

### 2.1 AI FanStick Server (포트 8081)

**위치**: `/home/uttec/ai_fanstick_server/`
**기술**: FastAPI + Uvicorn
**역할**: 개별 사용자와의 AI 대화, 콘서트 정보 제공

#### 파일 구조
```
ai_fanstick_server/
├── main.py              # FastAPI 메인 서버
├── gemini_service.py    # AI 서비스 (OpenAI + Gemini 이중화)
├── prompt_generator.py  # 시스템 프롬프트 동적 생성
├── .env                 # API 키 (GEMINI, OPENAI)
├── data/
│   └── concert_data.json  # 콘서트 데이터 (BTS 셋리스트)
└── venv/                # Python 가상환경
```

#### REST API 엔드포인트

| 메서드 | 경로 | 기능 |
|--------|------|------|
| GET | `/` | 서버 상태 확인 |
| POST | `/api/ask` | AI에게 질문 (STT 텍스트 → AI 응답 + LED 색상) |
| GET | `/api/concert` | 콘서트 전체 정보 (아티스트, 셋리스트, 현재곡) |
| GET | `/api/setlist` | 셋리스트만 조회 |
| GET | `/api/members` | 멤버 정보 조회 |
| GET | `/api/status` | 서버 상태 + 현재 곡 정보 |
| POST | `/api/song/next` | 다음 곡으로 이동 |
| POST | `/api/song/prev` | 이전 곡으로 이동 |
| POST | `/api/song/set/{index}` | 특정 곡으로 이동 |
| POST | `/api/reload` | concert_data.json 다시 로드 |
| GET | `/api/prompt` | 현재 시스템 프롬프트 확인 (디버그) |

#### WebSocket 엔드포인트

| 경로 | 기능 |
|------|------|
| `/ws/{device_id}` | 실시간 양방향 통신 |

**WebSocket 메시지 타입:**
- `ask` → AI 질문 처리 → `answer` 응답
- `status` → 서버 상태 조회
- `next_song` / `prev_song` → 곡 이동 → `song_changed` 응답
- `ping` → `pong` 응답

#### AI 서비스 구조 (gemini_service.py)

```
사용자 질문
    ↓
AI_PROVIDER 설정 확인 (기본: openai)
    ↓
┌─ OpenAI (gpt-4o-mini) ──→ 성공 시 응답 반환
│       ↓ 실패
├─ Gemini (gemini-2.0-flash) ──→ 성공 시 응답 반환
│       ↓ 실패
└─ 규칙 기반 폴백 응답 (키워드 매칭)
```

**응답 포맷:**
```json
{
  "success": true,
  "response": "다음 곡은 '봄날'이야! 분홍색 준비!",
  "led_color": [255, 182, 193],
  "current_song": { "order": 3, "title": "봄날", ... }
}
```

**LED 색상 추출**: AI 응답 끝에 `[LED:R,G,B]` 태그 → 파싱하여 앱에 전달

---

### 2.2 Control Center - 본부 관제 (포트 8091)

**위치**: `/home/uttec/control_center/`
**기술**: FastAPI + WebSocket
**역할**: 전체 관객 응원봉을 실시간으로 관리, 추첨, 일괄 제어

#### 파일 구조
```
control_center/
├── server.py     # FastAPI 관제 서버
├── admin.html    # 관리자 대시보드 웹 UI
└── venv/         # Python 가상환경
```

#### REST API 엔드포인트

| 메서드 | 경로 | 기능 |
|--------|------|------|
| GET | `/` 또는 `/admin` | 관리자 대시보드 페이지 |
| GET | `/api/devices` | 연결된 디바이스 목록 (전체/온라인/BLE) |
| POST | `/api/lottery` | 추첨 실행 (count, ble_only 옵션) |
| POST | `/api/broadcast/led` | 전체 LED 색상 변경 (R,G,B,pattern) |
| POST | `/api/broadcast/melody` | 전체 멜로디 재생 |
| POST | `/api/broadcast/message` | 전체 메시지 전송 |
| POST | `/api/device/{id}/command` | 개별 디바이스 명령 |
| GET | `/api/winners` | 당첨자 목록 조회 |
| DELETE | `/api/winners` | 당첨자 초기화 |
| DELETE | `/api/devices` | 오프라인 디바이스 정리 |

#### WebSocket 엔드포인트

| 경로 | 기능 |
|------|------|
| `/ws/{device_id}` | 디바이스 등록 + 실시간 명령 수신 |

**WebSocket 연결 흐름:**
```
앱 연결 → accept → 초기 디바이스 정보 수신 → register
    ↓
본부 → broadcast(device_joined) → 모든 디바이스에 알림
    ↓
수신 루프: reaction(반응 이벤트), heartbeat(생존 확인)
    ↓
연결 해제 → unregister → broadcast(device_left)
```

**본부에서 앱으로 보내는 명령:**

| type | 내용 | 예시 |
|------|------|------|
| `led_command` | LED 색상 변경 | `{r:255, g:0, b:0, pattern:"rainbow"}` |
| `melody_command` | 멜로디 재생 | `{melody: "winner"}` |
| `display_message` | 화면 메시지 | `{message: "환영합니다!"}` |
| `winner` | 당첨 알림 | 특수 LED + 멜로디 |
| `lottery_result` | 추첨 결과 발표 | 당첨자 이름 목록 |

---

## 3. 스마트폰 앱 (com.uttec.fanstick)

**버전**: 1.0.0-MVP (2026-04-17 설치)
**플랫폼**: Android (Flutter)

### 주요 기능
1. **음성 입력 (STT)** → 텍스트 변환 → 서버 8081 `/api/ask`로 전송
2. **AI 대화** → 콘서트 정보, 응원법, 멤버 정보 질의
3. **LED 제어** → AI 응답의 `led_color` 값으로 화면/BLE 응원봉 색상 변경
4. **본부 연결** → 서버 8091 WebSocket으로 관제 명령 수신
5. **BLE 연결** → 실제 응원봉 하드웨어(있는 경우)와 블루투스 연결

### 앱 통신 흐름
```
사용자 음성 입력
    ↓ (STT)
텍스트 변환
    ↓
POST /api/ask (8081)  ←── AI 응답 + LED 색상
    ↓
화면에 응답 표시 + LED 색상 변경
    ↓
BLE 연결 시 → 실제 응원봉에 RGB 값 전송
```

---

## 4. 전체 시나리오 Flow

### 4.1 콘서트 시작 전

```
1. 서버 가동 확인 (8081, 8091 모두 실행 중)
2. 관리자 → http://100.79.180.64:8091/admin 접속
3. 관객들 → 스마트폰에서 FanStick 앱 실행
4. 앱 → 서버 8091 WebSocket 연결 (디바이스 등록)
5. 관리자 대시보드에서 접속 인원 확인
```

### 4.2 콘서트 진행 중

```
[곡 시작]
관리자 → POST /api/song/set/{index} (8081) → 현재 곡 설정
관리자 → POST /api/broadcast/led (8091) → 전체 관객 LED 색상 변경

[관객 상호작용]
관객 음성: "다음 곡이 뭐야?"
    → 앱 STT → POST /api/ask (8081)
    → AI: "다음 곡은 '봄날'이야! 분홍색 준비! [LED:255,182,193]"
    → 앱 화면 표시 + LED 색상 변경

관객 음성: "정국 생일 언제야?"
    → AI: "정국(전정국)의 생일은 1997-09-01이야! [LED:138,43,226]"

[추첨 이벤트]
관리자 → POST /api/lottery (8091, count=3)
    → 랜덤 3명 선택
    → 당첨자에게: winner 메시지 + 레인보우 LED + 멜로디
    → 전체에게: lottery_result (당첨자 발표)
```

### 4.3 콘서트 종료

```
관리자 → POST /api/broadcast/message (8091)
    → "감사합니다! 보라해!"
관리자 → POST /api/broadcast/led (8091)
    → 전체 보라색 (138, 43, 226) + pattern: "wave"
```

---

## 5. 데이터 구조

### concert_data.json (현재: BTS 서울 콘서트)

| 항목 | 내용 |
|------|------|
| 아티스트 | BTS (방탄소년단) |
| 팬덤 | 아미 (ARMY) |
| 공연장 | 서울 잠실 주경기장 |
| 날짜 | 2026-06-15 18:00 |
| 셋리스트 | 8곡 |
| 멤버 | 7명 (RM, 진, 슈가, 제이홉, 지민, 뷔, 정국) |

### 셋리스트

| 순서 | 곡명 | 응원 색상 | 팬챈트 |
|:----:|------|----------|--------|
| 1 | Dynamite | 골드 (255,215,0) | BTS! BTS! |
| 2 | 좋아좋아 | 파란색 (0,100,255) | 좋아! 좋아! |
| 3 | 봄날 | 분홍색 (255,182,193) | 보고 싶다~ |
| 4 | Butter | 노란색 (255,255,0) | Get it, let it roll! |
| 5 | Boy With Luv | 핑크 (255,105,180) | Oh my my my! |
| 6 | 피 땀 눈물 | 빨간색 (220,20,60) | 내 피 땀 눈물~ |
| 7 | 달려라 방탄 | 초록색 (0,255,100) | 탄탄탄 방탄! |
| 8 | 소우주 | 보라색 (138,43,226) | 넌 별처럼 빛나~ |

---

## 6. 서버 접속 정보

| 항목 | 값 |
|------|-----|
| 서버 IP | 100.79.180.64 (Tailscale) |
| SSH | `ssh uttec@100.79.180.64` (pw: uttec) |
| AI 서버 | http://100.79.180.64:8081 |
| AI 서버 API 문서 | http://100.79.180.64:8081/docs |
| 관제 서버 | http://100.79.180.64:8091 |
| 관제 대시보드 | http://100.79.180.64:8091/admin |
| AI Provider | OpenAI (gpt-4o-mini), 폴백: Gemini (2.0-flash) |

---

## 7. 서버 관리

### 프로세스 확인
```bash
ssh uttec@100.79.180.64
ps aux | grep -E '8081|8091|fanstick|control_center'
```

### 서버 로그 확인
```bash
cat ai_fanstick_server/server.log
cat control_center/server.log
```

### 서버 재시작
```bash
# AI 서버
cd ai_fanstick_server && source venv/bin/activate
nohup python main.py > server.log 2>&1 &

# 관제 서버
cd control_center && source venv/bin/activate
nohup python server.py > server.log 2>&1 &
```

---

*작성일: 2026-04-20*
