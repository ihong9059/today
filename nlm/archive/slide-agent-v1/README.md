# YouTube Slide Agent

유튜브 채널에서 최신 영상(24시간 이내)을 수집하고, NotebookLM으로 종합 분석하여 PPTX 슬라이드를 자동 생성하는 에이전트 시스템입니다.

## 주문사항 요약

### 요청된 기능
1. **유튜브 영상 수집**: 지정된 유튜버들의 24시간 이내 영상 수집
2. **NotebookLM 활용**: 수집된 내용을 NotebookLM에 넣어 종합 분석
3. **슬라이드 생성**: 분석 결과를 PPTX 슬라이드로 생성

### 지정된 유튜브 채널
- https://www.youtube.com/@nateherk (Nate Herk)
- https://www.youtube.com/@nicksaraev (Nick Saraev)
- https://www.youtube.com/@Itssssss_Jack (Jack AI)
- https://www.youtube.com/@Chase-H-AI (Chase H AI)

### 에이전트 구성
1. **Research Agent**: 유튜브 영상 수집 및 자막 추출
2. **Synthesis Agent**: NotebookLM 분석 + 콘텐츠 구조화
3. **Slide Generator**: PPTX 파일 생성

---

## 프로젝트 구조

```
nlm/slide-agent/
├── agents/
│   ├── __init__.py
│   ├── research_agent.py     # 유튜브 영상 수집 에이전트
│   ├── synthesis_agent.py    # NotebookLM 분석 에이전트
│   └── slide_generator.py    # PPTX 생성기
├── config/
│   └── channels.json         # 유튜브 채널 설정
├── scripts/
│   └── run_daily.py          # 메인 실행 스크립트
├── output/
│   ├── transcripts/          # 자막 파일
│   ├── summaries/            # 영상별 요약
│   └── slides/               # 생성된 PPTX
├── logs/                     # 실행 로그
├── requirements.txt
└── README.md
```

---

## 설치

### 1. 의존성 설치

```bash
cd nlm/slide-agent
pip install -r requirements.txt
```

### 2. yt-dlp 설치 확인

```bash
yt-dlp --version
```

### 3. NotebookLM 스킬 인증 (선택)

NotebookLM 분석 기능을 사용하려면 `.claude/skills/notebooklm` 스킬의 인증이 필요합니다:

```bash
cd .claude/skills/notebooklm
python scripts/run.py auth_manager.py setup
```

---

## 사용법

### 기본 실행

```bash
cd nlm/slide-agent
python scripts/run_daily.py
```

### 옵션

```bash
# NotebookLM 없이 직접 분석
python scripts/run_daily.py --no-notebooklm

# 특정 NotebookLM 노트북 사용
python scripts/run_daily.py --notebook-url "https://notebooklm.google.com/notebook/..."

# 이전 리서치 결과 재사용
python scripts/run_daily.py --skip-research --research-result output/research_result_xxx.json

# 상세 로그 출력
python scripts/run_daily.py -v
```

### 전체 옵션 목록

| 옵션 | 설명 | 기본값 |
|------|------|--------|
| `--config` | 채널 설정 파일 경로 | `config/channels.json` |
| `--output` | 출력 디렉토리 | `output` |
| `--notebook-url` | NotebookLM 노트북 URL | - |
| `--no-notebooklm` | NotebookLM 사용 안함 | False |
| `--skip-research` | 리서치 단계 건너뛰기 | False |
| `--research-result` | 사용할 리서치 결과 파일 | - |
| `-v, --verbose` | 상세 로그 출력 | False |

---

## 에이전트 상세 설명

### 1. Research Agent (`research_agent.py`)

**역할**: 유튜브 채널에서 최신 영상을 수집하고 자막을 추출합니다.

**기능**:
- `channels.json`에 등록된 채널 순회
- yt-dlp를 사용하여 최근 영상 목록 조회
- 24시간(설정 가능) 이내 업로드된 영상 필터링
- 영어 자막 추출 (자동 생성 자막 포함)
- 자막을 텍스트로 파싱하여 저장

**출력**:
- `output/transcripts/`: SRT 자막 파일
- `output/summaries/`: 영상별 JSON 요약
- `output/research_result_YYYYMMDD_HHMMSS.json`: 전체 결과

### 2. Synthesis Agent (`synthesis_agent.py`)

**역할**: 수집된 내용을 종합 분석하여 슬라이드용 콘텐츠를 생성합니다.

**기능**:
- 모든 영상 내용을 하나의 문서로 통합
- NotebookLM 스킬 연동 (선택적)
  - 핵심 주제 추출
  - 인사이트 분석
  - 트렌드 파악
  - 실용적 조언 추출
- NotebookLM 없이도 키워드 기반 직접 분석 가능

**출력**:
- `output/combined_document_YYYYMMDD.md`: 통합 문서
- `output/slides/slide_content_YYYYMMDD.json`: 슬라이드 콘텐츠

### 3. Slide Generator (`slide_generator.py`)

**역할**: 분석된 콘텐츠로 PPTX 프레젠테이션을 생성합니다.

**기능**:
- python-pptx 라이브러리 사용
- 16:9 와이드스크린 형식
- 자동 레이아웃 구성:
  1. 타이틀 슬라이드
  2. 목차
  3. 소스 개요
  4. 섹션별 콘텐츠
  5. 핵심 인사이트
  6. 액션 아이템
  7. 마무리

**출력**:
- `output/slides/ai_digest_YYYYMMDD.pptx`

---

## NotebookLM 스킬 활용

### 스킬 위치
`.claude/skills/notebooklm/`

### 사용 방식
Synthesis Agent가 NotebookLM 스킬의 `ask_question.py`를 호출하여 질문을 전송하고 답변을 받습니다.

### 주요 질문 예시
1. "What are the main topics and themes discussed across all these videos?"
2. "What are the most important insights and takeaways?"
3. "What AI trends and developments are being discussed?"
4. "What practical tips, tools, or techniques are recommended?"

### 제한사항
- NotebookLM은 수동으로 문서를 업로드해야 합니다
- API 호출 제한이 있을 수 있습니다 (50회/일)
- 인증이 필요합니다

---

## 채널 설정 (`config/channels.json`)

```json
{
  "channels": [
    {
      "id": "nateherk",
      "name": "Nate Herk",
      "url": "https://www.youtube.com/@nateherk",
      "enabled": true,
      "description": "AI automation and workflow tutorials"
    }
    // ... 추가 채널
  ],
  "settings": {
    "hours_lookback": 24,        // 몇 시간 이내 영상 수집
    "subtitle_language": "en",   // 기본 자막 언어
    "fallback_language": "ko",   // 대체 언어
    "max_videos_per_channel": 5  // 채널당 최대 영상 수
  }
}
```

---

## 파이프라인 흐름

```
┌─────────────────────────────────────────────────────────────────┐
│                        실행 시작                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. Research Agent                                               │
│     ├─ channels.json에서 채널 목록 로드                           │
│     ├─ 각 채널의 최근 영상 목록 조회 (yt-dlp)                      │
│     ├─ 24시간 이내 영상 필터링                                    │
│     ├─ 영상별 자막 다운로드 및 파싱                                │
│     └─ research_result.json 생성                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. Synthesis Agent                                              │
│     ├─ 모든 자막 내용을 통합 문서로 생성                           │
│     ├─ NotebookLM 인증 확인                                      │
│     │   ├─ 인증됨: NotebookLM에 질문하여 분석                     │
│     │   └─ 미인증: 직접 키워드 기반 분석                          │
│     └─ slide_content.json 생성                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. Slide Generator                                              │
│     ├─ slide_content.json 로드                                   │
│     ├─ PPTX 프레젠테이션 구성                                     │
│     │   ├─ 타이틀 슬라이드                                       │
│     │   ├─ 목차                                                  │
│     │   ├─ 소스 개요                                             │
│     │   ├─ 주제별 슬라이드                                       │
│     │   ├─ 인사이트 슬라이드                                     │
│     │   └─ 마무리 슬라이드                                       │
│     └─ ai_digest_YYYYMMDD.pptx 저장                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        완료                                       │
│  - output/slides/ai_digest_YYYYMMDD.pptx                         │
│  - output/combined_document_YYYYMMDD.md                          │
│  - pipeline_result_YYYYMMDD_HHMMSS.json                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 문제 해결

### yt-dlp 오류

```bash
# 업데이트
pip install -U yt-dlp

# 쿠키 필요한 경우
yt-dlp --cookies cookies.txt [URL]
```

### NotebookLM 인증 실패

```bash
cd .claude/skills/notebooklm
python scripts/run.py auth_manager.py status  # 상태 확인
python scripts/run.py auth_manager.py setup   # 재인증
```

### 자막 없음

- 영상에 자막이 없는 경우 `fallback_language` 설정 확인
- 자동 생성 자막도 없으면 해당 영상은 건너뜀

### PPTX 생성 오류

```bash
pip install -U python-pptx
```

---

## 관련 파일

- **기존 프로젝트**: `nlm/archive/pitcast-project/` (팟캐스트 생성용)
- **NotebookLM 스킬**: `.claude/skills/notebooklm/`
- **YouTube 요약 스킬**: `.claude/skills/yt-summary/`

---

## 라이선스

MIT License

---

*생성일: 2026-02-18*
*버전: 1.0.0*
