# NLM - YouTube AI 콘텐츠 자동 수집 및 분석 시스템

AI 관련 유튜브 채널의 최신 영상을 자동 수집하고, NotebookLM을 활용하여 팟캐스트 또는 PPTX 슬라이드를 자동 생성하는 에이전트 시스템입니다.

## 폴더 구조

```
nlm/
├── channel-slides/          # [현재 버전] 채널별 슬라이드 자동 생성
│   ├── agents/              # 에이전트 모듈
│   │   ├── research_agent.py    # 영상 수집 및 자막 추출
│   │   ├── synthesis_agent.py   # NotebookLM 종합 분석
│   │   └── slide_generator.py   # PPTX 슬라이드 생성
│   ├── config/
│   │   └── channels.json        # 채널 및 설정 정보
│   ├── scripts/
│   │   └── run_daily.py         # 메인 실행 스크립트
│   ├── output/                  # 자막, 요약, 슬라이드 출력
│   └── README.md
│
├── slide-agent/             # 슬라이드 출력 저장소
│   └── output/slides/           # 생성된 PPTX 파일
│
├── archive/                 # 이전 버전 보관
│   ├── pitcast-project/         # v1: 팟캐스트(M4A) 자동 생성
│   └── slide-agent-v1/          # v2: 통합 슬라이드 생성 (채널별 분리 전)
│
└── README.md                # 이 문서
```

## 프로젝트 발전 과정

| 버전 | 폴더 | 출력 형식 | 특징 |
|------|------|-----------|------|
| v1 | `archive/pitcast-project` | M4A 팟캐스트 | NotebookLM Audio Overview 활용 |
| v2 | `archive/slide-agent-v1` | PPTX (통합) | 모든 채널을 하나의 슬라이드로 통합 |
| v3 | `channel-slides` | PPTX (채널별) | 유튜버별 개별 슬라이드 생성, 최대 10장 제한 |

## 등록된 유튜브 채널

| 채널 | URL |
|------|-----|
| Nate Herk | https://www.youtube.com/@nateherk |
| Nick Saraev | https://www.youtube.com/@nicksaraev |
| Jack Roberts | https://www.youtube.com/@Itssssss_Jack |
| Chase H AI | https://www.youtube.com/@Chase-H-AI |

## 파이프라인 흐름

```
Research Agent          Synthesis Agent         Slide Generator
(yt-dlp 기반)           (NotebookLM 기반)        (python-pptx)
     │                       │                       │
     ├─ 채널별 영상 수집      ├─ 통합 문서 생성        ├─ 3D 시네마틱 디자인
     ├─ 자막 추출(SRT/VTT)   ├─ 5가지 분석 질문      ├─ 채널별 PPTX 생성
     └─ JSON 요약 생성       └─ 슬라이드 콘텐츠 구조화 └─ 최대 10장 제한
```

## 실행 방법

```bash
cd channel-slides

# 기본 실행 (NotebookLM 사용)
python scripts/run_daily.py

# NotebookLM 없이 실행
python scripts/run_daily.py --no-notebooklm
```

## 필수 요구사항

- Python 3.10+
- yt-dlp (영상/자막 수집)
- python-pptx (슬라이드 생성)
- ffmpeg (자막 변환)
- notebooklm-mcp-cli (NotebookLM 연동, 선택)

## 주요 설정

`channel-slides/config/channels.json`에서 관리:

| 설정 | 설명 | 기본값 |
|------|------|--------|
| `hours_lookback` | 초기 검색 기간 | 72시간 (3일) |
| `expand_hours` | 영상 부족 시 확대 기간 | 168시간 (7일) |
| `max_videos_per_channel` | 채널당 최대 영상 수 | 10 |
| `subtitle_language` | 자막 언어 | en |

---

*생성일: 2026-02-18*
