# Channel Slides - 유튜버별 슬라이드 자동 생성

유튜브 채널별로 최신 영상을 수집하고, NotebookLM을 활용하여 종합 분석한 후 PPTX 슬라이드를 생성하는 서브에이전트 시스템입니다.

## 핵심 기능

- **3일 → 7일 자동 확대**: 3일 이내 영상이 5개 미만이면 자동으로 7일로 확대
- **채널별 개별 슬라이드**: 각 유튜버별로 별도의 PPTX 파일 생성
- **최대 10장 제한**: 프레젠테이션당 최대 10장으로 제한
- **NotebookLM 연동**: 종합 분석을 위한 NotebookLM 스킬 활용
- **3D 시네마틱 디자인**: 다크 테마 기반의 모던 디자인

## 프로젝트 구조

```
channel-slides/
├── agents/
│   ├── __init__.py
│   ├── research_agent.py    # 영상 수집 및 자막 추출
│   ├── synthesis_agent.py   # NotebookLM 종합 분석
│   └── slide_generator.py   # PPTX 슬라이드 생성
├── config/
│   └── channels.json        # 채널 및 설정 정보
├── scripts/
│   └── run_daily.py         # 메인 실행 스크립트
├── output/
│   ├── transcripts/         # 추출된 자막
│   ├── summaries/           # 영상 요약
│   └── slides/              # 생성된 PPTX 파일
└── README.md
```

## 설치 및 실행

### 필수 요구사항

- Python 3.10+
- yt-dlp
- python-pptx
- NotebookLM 스킬 (`.claude/skills/notebooklm`)

### 실행 방법

```bash
# 기본 실행 (NotebookLM 사용)
python scripts/run_daily.py

# NotebookLM 없이 실행 (기본 분석 사용)
python scripts/run_daily.py --no-notebooklm
```

## 채널 설정

`config/channels.json`에서 채널을 관리합니다:

```json
{
  "channels": [
    {
      "name": "Nate Herk",
      "url": "https://www.youtube.com/@nateherk",
      "enabled": true
    }
  ],
  "settings": {
    "hours_lookback": 72,
    "expand_hours": 168,
    "min_videos_for_expand": 5,
    "max_videos_per_channel": 10,
    "subtitle_language": "en"
  }
}
```

### 설정 옵션

| 옵션 | 설명 | 기본값 |
|------|------|--------|
| `hours_lookback` | 초기 검색 기간 (시간) | 72 (3일) |
| `expand_hours` | 확대 검색 기간 (시간) | 168 (7일) |
| `min_videos_for_expand` | 확대 기준 최소 영상 수 | 5 |
| `max_videos_per_channel` | 채널당 최대 영상 수 | 10 |
| `subtitle_language` | 자막 언어 | en |

## 에이전트 설명

### 1. Research Agent

YouTube 채널에서 최신 영상을 수집하고 자막을 추출합니다.

- yt-dlp를 사용한 영상 메타데이터 수집
- VTT 형식 자막 추출 및 파싱
- 3일 → 7일 자동 확대 로직

### 2. Synthesis Agent

NotebookLM을 활용하여 채널별 콘텐츠를 종합 분석합니다.

- 채널별 통합 문서 생성
- NotebookLM 5가지 질문:
  - Main Topics (주요 주제)
  - Key Insights (핵심 인사이트)
  - Tools Mentioned (도구/기술)
  - Actionable Tips (실용적 팁)
  - Summary (전체 요약)
- 슬라이드 콘텐츠 구조화 (최대 10장)

### 3. Slide Generator

3D 시네마틱 디자인의 PPTX 파일을 생성합니다.

- **디자인 스펙**:
  - 배경: `#1A1A2E`
  - 텍스트: `#FFFFFF`
  - 액센트: `#6366F1`
  - 폰트: Sora

- **슬라이드 타입**:
  - `title`: 타이틀 슬라이드
  - `video_list`: 영상 목록
  - `content`: 분석 콘텐츠
  - `closing`: 마무리 슬라이드

## 출력 결과

### 생성되는 파일

```
output/
├── transcripts/
│   └── {video_id}.en.vtt           # 자막 파일
├── summaries/
│   └── {video_id}_summary.json     # 영상 요약
├── slides/
│   ├── Nate_Herk_20260218.pptx     # 채널별 PPTX
│   ├── Nick_Saraev_20260218.pptx
│   └── ...
├── {channel}_document_{date}.md    # 통합 문서
├── research_result_{timestamp}.json
└── pipeline_result_{timestamp}.json
```

## 등록된 채널

| 채널 | URL |
|------|-----|
| Nate Herk | @nateherk |
| Nick Saraev | @nicksaraev |
| Jack Roberts | @Itssssss_Jack |
| Chase H AI | @Chase-H-AI |

## 주의사항

1. **NotebookLM 인증**: 첫 실행 시 NotebookLM 인증이 필요합니다
2. **yt-dlp 업데이트**: YouTube API 변경 시 `pip install -U yt-dlp` 실행
3. **영상 수 제한**: 채널당 최대 10개 영상만 처리
4. **슬라이드 제한**: 프레젠테이션당 최대 10장

## 라이선스

Internal Use Only
