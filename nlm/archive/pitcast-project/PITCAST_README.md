# Daily Pitcast Generator

매일 오전 8시에 등록된 AI 유튜버들의 최신 영상을 수집하여 NotebookLM으로 종합 팟캐스트를 생성하는 자동화 시스템입니다.

## 기능

- **Research Agent**: 유튜브 채널에서 24시간 이내 영상 수집 및 자막 추출
- **Synthesis Agent**: NotebookLM을 통한 종합 MP3 팟캐스트 생성
- **자동 스케줄링**: Windows Task Scheduler를 통한 매일 실행

## 등록된 유튜버

| 채널 | 설명 |
|------|------|
| @nateherk | Nate Herk - AI/Automation |
| @nicksaraev | Nick Saraev - AI Tools |
| @ltssssss_Jack | Jack - AI Development |
| @Chase-H-AI | Chase H - AI News |

## 설치

### 1. 필수 도구 설치

```bash
# yt-dlp (자막 추출용)
pip install yt-dlp

# NotebookLM CLI (팟캐스트 생성용)
pip install notebooklm-mcp-cli
```

### 2. NotebookLM 인증

```bash
nlm login
```

브라우저가 열리면 Google 계정으로 로그인합니다.

### 3. 인증 확인

```bash
nlm login --check
```

## 사용법

### 수동 실행

```bash
# 기본 실행 (24시간 이내 영상)
python scripts/run_daily.py

# 48시간 이내 영상 수집
python scripts/run_daily.py --hours 48

# 테스트 모드 (팟캐스트 생성 건너뛰기)
python scripts/run_daily.py --test
```

### 자동 실행 설정

관리자 권한으로 실행:
```cmd
scripts\scheduler_setup.bat
```

이렇게 하면 매일 오전 8시에 자동으로 실행됩니다.

### Task Scheduler 관리

```cmd
# 작업 확인
schtasks /query /tn "DailyPitcastGenerator" /v

# 즉시 실행
schtasks /run /tn "DailyPitcastGenerator"

# 작업 삭제
schtasks /delete /tn "DailyPitcastGenerator" /f
```

## 폴더 구조

```
nlm/
├── config/
│   └── channels.json        # 유튜버 채널 설정
├── agents/
│   ├── __init__.py
│   ├── research_agent.py    # 영상 수집 에이전트
│   └── synthesis_agent.py   # 팟캐스트 생성 에이전트
├── scripts/
│   ├── run_daily.py         # 메인 실행 스크립트
│   └── scheduler_setup.bat  # Task Scheduler 설정
├── output/
│   ├── transcripts/         # 추출된 자막
│   ├── summaries/           # 요약본
│   └── podcasts/            # 생성된 MP3 팟캐스트
├── logs/                    # 실행 로그
├── requirements.txt
└── PITCAST_README.md
```

## 설정 (config/channels.json)

```json
{
  "channels": [
    {
      "id": "nateherk",
      "name": "Nate Herk",
      "url": "https://www.youtube.com/@nateherk",
      "enabled": true
    }
  ],
  "settings": {
    "hours_lookback": 24,
    "subtitle_language": "en",
    "fallback_language": "ko",
    "max_videos_per_channel": 5
  }
}
```

### 설정 옵션

| 옵션 | 설명 | 기본값 |
|------|------|--------|
| `hours_lookback` | 몇 시간 이내 영상을 수집할지 | 24 |
| `subtitle_language` | 기본 자막 언어 | en |
| `fallback_language` | 대체 자막 언어 | ko |
| `max_videos_per_channel` | 채널당 최대 수집 영상 수 | 5 |

## 출력물

### 팟캐스트 (output/podcasts/)
- `pitcast_YYYY-MM-DD.m4a` - 당일 생성된 팟캐스트
- `pitcast_YYYY-MM-DD_metadata.json` - 메타데이터

### 자막 (output/transcripts/)
- 각 영상의 SRT 자막 파일

### 요약 (output/summaries/)
- 각 영상의 요약 JSON 파일

### 로그 (logs/)
- 일별 실행 로그

## 문제 해결

### NotebookLM 인증 오류

```bash
nlm login
```

### yt-dlp 업데이트

```bash
pip install -U yt-dlp
```

### 자막을 찾을 수 없음

일부 영상은 자막이 없을 수 있습니다. 자동 생성 자막(auto-generated)을 사용하도록 설정되어 있습니다.

### Task Scheduler 권한 오류

`scheduler_setup.bat`을 **관리자 권한으로 실행**하세요.

## 라이선스

MIT License
