# search vault 소개 동영상 — 시나리오 + 나레이션

- **대상**: search vault를 처음 보는 초보자
- **총 길이**: 약 5분 8초 (9,226 frames @ 30fps)
- **해상도**: 1920×1080
- **음성**: edge-tts `ko-KR-SunHiNeural` (한국어 여성)
- **렌더링 결과**: `out/Search_Intro/video.mp4` (17.8 MB)

---

## 전체 구성

| # | 장면 | 길이 | frame 범위 | 음성 파일 |
|:-:|------|------|------|------|
| 1 | 인트로 | 25.20s (756 fr) | 0 – 756 | `scene1_intro.mp3` |
| 2 | 구조 한눈에 | 61.39s (1,841 fr) | 756 – 2,597 | `scene2_structure.mp3` |
| 3 | 설치·실행 | 64.06s (1,921 fr) | 2,597 – 4,518 | `scene3_install.mp3` |
| 4 | 첫 질문 보내기 | 50.88s (1,526 fr) | 4,518 – 6,044 | `scene4_first_query.mp3` |
| 5 | 고급 사용법 | 64.08s (1,922 fr) | 6,044 – 7,966 | `scene5_advanced.mp3` |
| 6 | 마무리 | 42.02s (1,260 fr) | 7,966 – 9,226 | `scene6_outro.mp3` |
| **합계** | — | **307.53s** | **9,226 fr** | — |

---

## Scene 1 — 인트로 (25초)

### 시나리오 (시각 연출)
- 배경: 다크 그라데이션 (`#0b1220` → `#111a2b`)
- 중앙에 큰 🔎 아이콘(보라→파랑 그라데이션, 110×110px, 28px round) + "search" 타이틀 (90pt, 두꺼움)
- 부제: "myWiki를 자연어로 검색하는 web 서비스" (시안색 강조)
- 하단: "초보자도 따라 할 수 있는 설치부터 첫 질문까지 가이드" (회색 muted)
- 4개 키워드 칩이 순차 등장: `#myWiki second-brain`, `#38일치 누적 자료`, `#자연어 검색`, `#AI 정리`
- 좌상단 글로벌 오버레이: 작은 S 로고 + "search — myWiki 검색"
- 우상단: "01 · 인트로" 라벨

### 나레이션
> 안녕하세요! 오늘은 search라는 web 프로그램의 사용법을 알려드리겠습니다.
> search는, 내 second-brain, 즉 내가 38일 동안 모아온 자료를, 자연어 한 줄로 검색하고, 정리해주는, AI 기반 web 서비스입니다.
> 이제부터 설치부터 첫 질문까지, 초보자도 그대로 따라 할 수 있도록 천천히 설명드리겠습니다.

---

## Scene 2 — 구조 한눈에 (61초)

### 시나리오 (시각 연출)
- 타이틀: "search의 **3가지 구성요소**" (시안 강조)
- 3개 카드가 좌→우 순차 등장 (각각 다른 컬러 보더 + 박스 그림자):
  - **Frontend** 🖥️ — React + Vite — `port 8888` (`#61dafb` react blue)
  - **Backend** ⚙️ — FastAPI + Anthropic SDK — `port 8889` (`#009688` fastapi teal)
  - **raw/ junction** 🧠 — myWiki · uttecHome (read-only) — `second-brain` (`#f59e0b` amber)
- 하단에 "▶ 동작 흐름" 카드: 4단계 번호 매기기, 각 단계 60 frame 간격으로 등장
  1. 사용자가 자연어로 질문 입력
  2. Frontend → WebSocket → Backend
  3. sentence-transformers로 관련 자료 검색
  4. Claude API에 문맥 전달 → 답변 생성

### 나레이션
> 먼저, search의 구조를 한눈에 살펴보겠습니다.
> search는 크게 세 부분으로 이루어져 있습니다.
> 첫째, Backend는 파이썬의 FastAPI 프레임워크로 만들어졌고, 8889 포트에서 동작합니다. 클로드 API를 호출하고, 위키 자료를 검색하는 역할을 합니다.
> 둘째, Frontend는 React와 Vite로 만들어졌고, 8888 포트에서 동작합니다. 사용자가 실제로 보는 화면입니다.
> 셋째, raw 폴더 안에는, myWiki와 uttecHome 두 vault가 junction 링크로 연결되어 있어, search가 읽기 전용으로 자료를 가져옵니다.
> 동작 흐름은 간단합니다. 사용자가 질문을 입력하면, frontend가 WebSocket으로 backend에 전달하고, backend는 sentence-transformers라는 검색 모델로 관련 자료를 찾은 뒤, Claude API에 문맥과 함께 보내서 답변을 생성합니다.

---

## Scene 3 — 설치·실행 (64초)

### 시나리오 (시각 연출)
- 타이틀: "**터미널 2개**로 backend와 frontend 실행"
- 좌측 터미널 카드 (FastAPI 색): "터미널 1 — Backend `:8889`"
  - 5줄 명령어가 80 frame 간격으로 등장 (`$` 프롬프트 + 명령어):
    ```
    cd backend
    python -m venv .venv
    .venv\Scripts\Activate.ps1
    pip install -r requirements.txt
    uvicorn app.main:app --reload --port 8889
    ```
- 우측 터미널 카드 (React 색): "터미널 2 — Frontend `:8888`"
  - 3줄 명령어 등장:
    ```
    cd frontend
    npm install
    npm run dev
    ```
- 하단 배너: 🌐 "브라우저에서 `http://localhost:8888` 접속 → search 화면이 열립니다"

### 나레이션
> 이제 search를 실제로 실행해 보겠습니다.
> 먼저 터미널을 두 개 여세요. 하나는 backend용, 다른 하나는 frontend용입니다.
> 첫 번째 터미널에서, backend 폴더로 이동합니다. cd backend.
> 가상환경을 만들고 활성화합니다. python -m venv .venv. 그리고 닷벤브, 스크립츠, 액티베이트.피에스원.
> 의존성을 설치합니다. pip install -r requirements.txt.
> 서버를 실행합니다. uvicorn app.main:app --reload --port 8889.
> 두 번째 터미널에서는, frontend 폴더로 이동합니다. cd frontend.
> 패키지를 설치합니다. npm install.
> 개발 서버를 띄웁니다. npm run dev.
> 브라우저에서 localhost 8888 주소를 열면, search 화면이 나타납니다.

---

## Scene 4 — 첫 질문 보내기 (51초)

### 시나리오 (시각 연출)
- 타이틀: '**"무엇이 궁금하신가요?"** 입력창'
- 브라우저 chrome mockup: 빨강/노랑/초록 신호등 + `http://localhost:8888` URL 바
- 앱 헤더: 보라색 🧠 아이콘 + "myWiki search" 타이틀 + 우측 "✓ claude-sonnet-4-6" 초록 배지
- "무엇이 궁금하신가요?" 문구
- 파란 보더 입력창에 타이핑 효과 (cps=18): `"UTTEC의 핵심 비즈니스가 뭐야?"` (커서 깜빡임)
- ~24초 후 답변 카드 등장:
  > UTTEC의 핵심은 **onDevice AI 제품군**입니다. 응원봉(AI FanStick), 스마트팩토리 보드, LoRa 기반 장거리 통신 모듈이 주요 라인업이며, ESP32와 nRF 계열 MCU 위에 자체 가속 라이브러리(esp-nn, CMSIS-NN)를 적용해 **외부 인터넷 0%**의 on-device 추론을 차별점으로 합니다.
- "▍ 출처 (3건)" 섹션 — 3개 출처 카드 (점수 배지 초록):
  - `entities/uttec-onDevice.md` — `0.87`
  - `ai-direction.md § product strategy` — `0.74`
  - `thoughts/2026-Q2/ondevice-pivot.md` — `0.68`

### 나레이션
> 화면이 열리면, 가운데에 "무엇이 궁금하신가요?"라는 안내 문구와 함께, 큰 입력 창이 보입니다.
> 여기에 자연어로 질문을 입력하면 됩니다. 예를 들어, "UTTEC의 핵심 비즈니스가 뭐야?" 라고 입력하고, 보내기 버튼을 누르거나 엔터를 칩니다.
> 그러면 search는 myWiki 안의 entities, thoughts, ai-direction 같은 폴더에서, 질문과 가장 관련 깊은 자료를 찾아냅니다.
> 잠시 후, 답변이 화면에 표시되고, 그 아래에는 답을 만들 때 참고한 출처 카드가 점수와 함께 나타납니다. 점수가 높을수록 관련도가 높다는 뜻입니다.
> 이렇게 search는, 평소에 grep이나 파일 탐색기로 찾기 어려웠던 자료를, 자연어 한 줄로 정리해서 보여줍니다.

---

## Scene 5 — 고급 사용법 (64초)

### 시나리오 (시각 연출)
- 타이틀: "search의 **4가지 고급 기능**"
- 2×2 그리드, 각 카드는 다른 컬러 보더 + spring 스케일 인:
  - **01 · 세션 기반 대화** 💬 (파랑) — "직전 맥락을 기억한 follow-up 질문 가능" / 예: *"그 중에서 onDevice가 뭐였는지 더 자세히"*
  - **02 · 토큰 게이지** 📊 (앰버) — "상단 헤더 + 입력창 아래 inline 표시" / *"70% 도달 시 경고 토스트 등장"*
  - **03 · 자동 핸드오프** 🔄 (보라) — "80% 도달 시 요약 → 새 세션 자동 연결" / *"대화 흐름이 끊기지 않음"*
  - **04 · 다크 / 라이트 모드** 🌗 (시안) — "우측 상단 🌙/☀️ 아이콘으로 토글" / *"작업 환경에 맞춰 자유 전환"*

### 나레이션
> 이번에는 search의 고급 기능 네 가지를 살펴보겠습니다.
> 첫째, 세션 기반 대화입니다. 첫 답변을 받은 뒤에, 이어서 "그 중에서 onDevice가 뭐였는지 더 자세히"처럼 후속 질문을 던지면, search는 직전 맥락을 기억한 채 답변합니다. 한 세션 안에서 자연스럽게 대화가 이어집니다.
> 둘째, 상단의 토큰 게이지입니다. 대화가 길어질수록 컨텍스트가 차오르는데, 게이지가 70 퍼센트에 가까워지면, 경고 토스트가 나타나서 정리할 시간이 다가왔음을 알려줍니다.
> 셋째, 80 퍼센트가 되면, search는 자동으로 핸드오프를 실행합니다. 직전 대화를 요약하고, 새로운 세션으로 자동 연결해서, 대화의 흐름을 끊지 않습니다.
> 넷째, 우측 상단의 달 모양 아이콘을 누르면, 다크모드로 전환됩니다. 한 번 더 누르면 라이트모드로 돌아옵니다. 작업 환경에 맞춰 자유롭게 바꿀 수 있습니다.

---

## Scene 6 — 마무리 (42초)

### 시나리오 (시각 연출)
- 배경: 중앙 라디얼 그라데이션
- 타이틀: "search 핵심 **4가지** 정리" (60pt)
- 4개 그라데이션 칩 (파랑→보라) 순차 등장:
  - `1. 자연어 질의`
  - `2. 세션 대화`
  - `3. 자동 핸드오프`
  - `4. 다크모드`
- 메시지 카드:
  > search는 단순 검색 도구가 아닌, **본인의 second-brain을 직접 사용하는 dogfooding 모델**입니다. 외부 회사 적용 전에 검색 정확도와 UX를 실제로 살아보며 검증합니다.
- "다음 단계 →" + 2개 카드:
  - **uttec-search** (시안) — Mac · Ubuntu 포팅 (10th vault)
  - **DigitalOcean** (앰버) — 클라우드 droplet 정식 배포
- 마지막: "감사합니다 🙏" (시안, 34pt)

### 나레이션
> 지금까지 살펴본 search의 핵심 기능을 정리하면, 자연어 질의, 세션 기반 대화, 자동 핸드오프, 그리고 다크모드, 이 네 가지입니다.
> search는 단순한 검색 도구가 아닙니다. 본인의 second-brain을 직접 사용하는 dogfooding 모델로, 외부 회사 적용 전에 검색 정확도와 UX를 실제로 살아보며 검증하는 시뮬레이션 환경입니다.
> 앞으로 search는, Mac과 Ubuntu에 포팅된 uttec-search vault로 확장되고, DigitalOcean 클라우드에 정식 배포될 예정입니다.
> 오늘 영상이 도움이 되셨다면, 직접 한번 따라해 보시길 권합니다. 감사합니다.

---

## 컬러 팔레트 (SearchIntroVideo.tsx 기준)

| 토큰 | 값 | 용도 |
|------|------|------|
| `bg` | `#0b1220` | 메인 배경 |
| `bgSoft` | `#111a2b` | 그라데이션 부드러운 끝 |
| `card` | `#172339` | 카드 배경 |
| `cardBorder` | `#1f2d4d` | 카드 보더 |
| `primary` | `#3b82f6` | 강조 파랑 |
| `accent` | `#22d3ee` | 시안 강조 |
| `purple` | `#8b5cf6` | 보라 강조 |
| `amber` | `#f59e0b` | 경고/노랑 |
| `green` | `#10b981` | 성공/점수 |
| `react` | `#61dafb` | React 브랜드 |
| `fastapi` | `#009688` | FastAPI 브랜드 |

---

## 재생산 절차

```powershell
cd C:\todo\today\remotion-project

# 1) 나레이션 수정 → scripts/search-intro/scene*.txt 편집
# 2) TTS 재생성
python scripts\search-intro\generate-tts.py
# 3) 새 duration 확인 후 SearchIntroVideo.tsx의 SCENE_TIMINGS 갱신
# 4) 렌더링
npx remotion render SearchIntro out\Search_Intro\video.mp4 --concurrency=4
# 5) 미리보기/실시간 편집
npx remotion studio
```

---

## 관련 파일

```
remotion-project/
├── scripts/search-intro/
│   ├── SCENARIO.md                  ← 본 문서 (시나리오+나레이션 통합)
│   ├── scene1_intro.txt
│   ├── scene2_structure.txt
│   ├── scene3_install.txt
│   ├── scene4_first_query.txt
│   ├── scene5_advanced.txt
│   ├── scene6_outro.txt
│   └── generate-tts.py
├── public/audio/search-intro/
│   └── scene{1-6}_*.mp3              (총 6 파일, 307초)
├── src/
│   ├── SearchIntroVideo.tsx          (Composition 컴포넌트)
│   └── Root.tsx                      (id="SearchIntro" 등록)
└── out/Search_Intro/
    └── video.mp4                     (17.8 MB, 최종 결과)
```
