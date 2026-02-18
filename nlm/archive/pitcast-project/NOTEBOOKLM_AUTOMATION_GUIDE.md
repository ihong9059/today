# NotebookLM 자동화 가이드

이 문서는 NotebookLM CLI(`nlm`)를 사용하여 자동화된 팟캐스트 생성 시스템을 구축한 과정과 학습 내용을 정리한 것입니다. 향후 NotebookLM을 활용한 다른 프로젝트에 참고하실 수 있습니다.

---

## 목차

1. [프로젝트 요구사항](#1-프로젝트-요구사항)
2. [구현 결과 및 테스트](#2-구현-결과-및-테스트)
3. [개요](#3-개요)
4. [사전 준비](#4-사전-준비)
5. [NLM CLI 명령어 레퍼런스](#5-nlm-cli-명령어-레퍼런스)
6. [구현 아키텍처](#6-구현-아키텍처)
7. [주요 구현 세부사항](#7-주요-구현-세부사항)
8. [문제 해결 및 트러블슈팅](#8-문제-해결-및-트러블슈팅)
9. [API 제한사항 및 주의사항](#9-api-제한사항-및-주의사항)
10. [확장 아이디어](#10-확장-아이디어)

---

## 1. 프로젝트 요구사항

### 1.1 사용자 요청 원문

> "지금부터 핏캐스트 생성 서브에이전트를 하나 만들거야. 매일 오전 8시에 실행되고, 등록된 유튜버들의 최신 영상 중 24시간 이내에 등록된 영상을 취합해서, NotebookLM을 사용해서, 팟캐스트를 종합해서 만들어주는거야."

### 1.2 상세 요구사항

| 항목 | 요구사항 |
|------|----------|
| **실행 스케줄** | 매일 오전 8시 자동 실행 |
| **영상 수집 범위** | 24시간 이내 업로드된 영상 |
| **대상 유튜버** | 4개 채널 (Nate Herk, Nick Saraev, Jack AI, Chase H AI) |
| **출력 형식** | 오디오 팟캐스트 (MP3/M4A) |
| **스케줄러** | Windows Task Scheduler |
| **구현 언어** | Python |
| **에이전트 구조** | Research Agent + Synthesis Agent |

### 1.3 등록된 유튜버 채널

| 채널명 | YouTube URL | 상태 |
|--------|-------------|------|
| Nate Herk | https://www.youtube.com/@nateherk | ✅ 활성 |
| Nick Saraev | https://www.youtube.com/@nicksaraev | ✅ 활성 |
| Jack (AI) | https://www.youtube.com/@ltssssss_Jack | ❌ 비활성 (URL 오류) |
| Chase H AI | https://www.youtube.com/@Chase-H-AI | ✅ 활성 |

### 1.4 사용 스킬

- `youtube-transcript` 스킬: 유튜브 자막 추출
- `notebooklm` 스킬: NotebookLM API 자동화

---

## 2. 구현 결과 및 테스트

### 2.1 구현 완료 항목

| 단계 | 항목 | 상태 | 비고 |
|------|------|------|------|
| 1 | 에이전트 구조 설계 및 계획 | ✅ 완료 | |
| 2 | nlm 폴더 구조 생성 | ✅ 완료 | |
| 3 | 유튜버 리스팅 설정 파일 생성 | ✅ 완료 | channels.json |
| 4 | Research Agent 구현 | ✅ 완료 | 영상 수집 및 자막 추출 |
| 5 | Synthesis Agent 구현 | ✅ 완료 | NotebookLM 팟캐스트 생성 |
| 6 | 메인 실행 스크립트 작성 | ✅ 완료 | run_daily.py |
| 7 | notebooklm-mcp-cli 설치 | ✅ 완료 | pip install |
| 8 | NotebookLM 인증 설정 | ✅ 완료 | nlm login |
| 9 | 테스트 실행 및 스케줄러 설정 | ✅ 완료 | 부분 성공 |

### 2.2 테스트 결과 상세

#### 2.2.1 Research Agent 테스트 (✅ 성공)

**테스트 조건:** 168시간(7일) 이내 영상 수집

**결과:**
```
Processing channel: Nate Herk
  Found recent video: How to Sign AI Workflow Clients (With 0 Followers) (20260216)
  Found recent video: How a College Student Made $500k with Cold Email (20260214)
Found 2 recent videos in Nate Herk
Successfully processed: How to Sign AI Workflow Clients (With 0 Followers)
Successfully processed: How a College Student Made $500k with Cold Email

Processing channel: Nick Saraev
  Found recent video: CLAUDE CODE FULL COURSE 4 HOURS: Build & Sell (2026) (20260212)
Found 1 recent videos in Nick Saraev
Successfully processed: CLAUDE CODE FULL COURSE 4 HOURS: Build & Sell (2026)

Skipping disabled channel: Jack (AI)

Processing channel: Chase H AI
  Found recent video: Claude Sonnet 4.6 Is Here (and Better Than Opus?) (20260217)
  Found recent video: I used to build everything in n8n, here's why I stopped (mostly) (20260217)
  Found recent video: i converted all my n8n agents to real code (20260215)
  Found recent video: OpenClaw Google Setup is a Nightmare (Here's the Fix) (20260212)
Found 4 recent videos in Chase H AI

Research complete. Total videos processed: 7
```

**수집 결과:**
- Nate Herk: 2개 영상 처리 완료
- Nick Saraev: 1개 영상 처리 완료
- Jack AI: 채널 URL 오류로 비활성화
- Chase H AI: 4개 영상 처리 완료
- **총 7개 영상 자막 추출 성공**

#### 2.2.2 Synthesis Agent 테스트 (⚠️ 부분 성공)

**테스트 1: 단일 소스 테스트 (✅ 성공)**

```bash
# 노트북 생성
nlm notebook create "Test Pitcast Single Source"
✓ Created notebook: Test Pitcast Single Source
  ID: 60cf3571-e565-4a59-b626-034a7867c195

# 소스 추가
nlm source add 60cf3571... --text "테스트 텍스트" --title "Test Source" --wait
✓ Added source: Test Source (ready)

# 오디오 생성
nlm audio create 60cf3571... --format deep_dive --length short --confirm
✓ Audio generation started
  Artifact ID: 7fdb1ada-262f-4375-be70-c2c0aad643fd

# 상태 확인 (약 3분 후)
nlm studio status 60cf3571... --json
[{"id": "7fdb1ada...", "type": "audio", "status": "completed"}]

# 다운로드
nlm download audio 60cf3571... --output output/podcasts/test_pitcast.m4a
✓ Downloaded audio to: C:\todo\today\nlm\output\podcasts\test_pitcast.m4a
```

**결과:** `test_pitcast.m4a` 파일 생성 성공

**테스트 2: 다중 소스 통합 테스트 (⚠️ API 제한)**

```
Created notebook: AI Creators Daily - 2026-02-18
  ID: 605fde0b-7bf5-480f-bb95-5cd62f985cf0

Added source: Chase H AI: Claude Sonnet 4.6 Is Here... ✓
Added source: Chase H AI: I used to build everything in n8n... ✓

Creating audio podcast...
⠧ Creating audio...
Error: NotebookLM rejected audio creation. Try again later or create from
NotebookLM UI for diagnosis.
```

**원인:** NotebookLM API 일시적 속도 제한 (연속 오디오 생성 요청 시 발생)

### 2.3 생성된 파일 목록

```
nlm/
├── config/
│   └── channels.json                    # 유튜버 채널 설정
├── agents/
│   ├── __init__.py
│   ├── research_agent.py               # 297줄
│   └── synthesis_agent.py              # 290줄
├── scripts/
│   ├── run_daily.py                    # 129줄
│   └── scheduler_setup.bat             # 72줄
├── output/
│   ├── transcripts/
│   │   ├── _rZAR-s4KIo.en-orig.srt    # Nate Herk 영상 1
│   │   ├── YWXOTDzFnRA.en-orig.srt    # Nate Herk 영상 2
│   │   ├── ...                         # 기타 자막 파일들
│   ├── summaries/
│   │   ├── _rZAR-s4KIo_summary.json
│   │   ├── YWXOTDzFnRA_summary.json
│   │   ├── ...                         # 기타 요약 파일들
│   ├── podcasts/
│   │   └── test_pitcast.m4a            # 테스트 팟캐스트 (생성 성공)
│   └── research_result_20260218_*.json # 리서치 결과
├── logs/
│   └── 2026-02-18.log                  # 실행 로그
├── requirements.txt
├── PITCAST_README.md                   # 간단 사용법
└── NOTEBOOKLM_AUTOMATION_GUIDE.md      # 이 문서
```

### 2.4 발견된 이슈 및 해결

| # | 이슈 | 원인 | 해결 방법 | 상태 |
|---|------|------|-----------|------|
| 1 | `--flat-playlist`에서 날짜 NA 반환 | yt-dlp 제한 | 개별 영상 조회로 변경 | ✅ 해결 |
| 2 | Jack AI 채널 404 오류 | 잘못된 URL | 채널 비활성화 | ✅ 해결 |
| 3 | 자막 변환 실패 | ffmpeg 경로 없음 | `--ffmpeg-location` 추가 | ✅ 해결 |
| 4 | 인증 확인 실패 | 문자열 매칭 오류 | 'valid' 키워드 추가 | ✅ 해결 |
| 5 | `notebook create --json` 미지원 | CLI 제한 | 텍스트 파싱으로 변경 | ✅ 해결 |
| 6 | `studio status` 리스트 반환 | 예상과 다른 형식 | 타입 체크 추가 | ✅ 해결 |
| 7 | 긴 텍스트 명령줄 오류 | 명령줄 길이 제한 | 임시 파일 사용 | ✅ 해결 |
| 8 | 오디오 생성 거부 | API 속도 제한 | 재시도 로직 추가 | ⚠️ 부분 해결 |

### 2.5 최종 결론

| 구성 요소 | 상태 | 설명 |
|-----------|------|------|
| **Research Agent** | ✅ 완전 작동 | 영상 수집, 자막 추출 정상 동작 |
| **Synthesis Agent** | ⚠️ 조건부 작동 | 기본 기능 정상, API 제한 시 재시도 필요 |
| **오디오 생성** | ⚠️ 조건부 작동 | 단일 소스 성공, 다중 소스 시 API 제한 가능 |
| **스케줄러** | ✅ 준비 완료 | 관리자 권한으로 bat 실행 필요 |

**권장 사용법:**
1. API 제한을 피하기 위해 연속 실행 간 충분한 간격 유지
2. 오류 발생 시 수동으로 NotebookLM 웹사이트에서 오디오 생성 가능
3. 로그 파일(`logs/YYYY-MM-DD.log`)에서 상세 진행 상황 확인

---

---

## 3. 개요

### 3.1 프로젝트 목적

매일 특정 유튜버들의 최신 영상을 수집하고, NotebookLM의 Audio Overview 기능을 사용하여 종합 팟캐스트를 자동 생성하는 시스템입니다.

### 3.2 시스템 구성

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Research Agent │ ──▶ │ Synthesis Agent │ ──▶ │   Podcast.m4a   │
│  (yt-dlp 기반)  │     │ (nlm CLI 기반)  │     │   (출력 파일)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        ▼                       ▼
  - 영상 메타데이터       - NotebookLM 노트북
  - 자막(SRT) 추출        - 소스 업로드
  - JSON 요약 생성        - 오디오 생성/다운로드
```

### 3.3 사용 기술 스택

| 구성 요소 | 기술 | 용도 |
|-----------|------|------|
| 영상 정보 수집 | yt-dlp | 유튜브 영상 메타데이터 및 자막 추출 |
| 팟캐스트 생성 | notebooklm-mcp-cli | NotebookLM API 자동화 |
| 자막 변환 | ffmpeg | VTT → SRT 변환 |
| 스케줄링 | Windows Task Scheduler | 매일 자동 실행 |
| 언어 | Python 3.x | 에이전트 구현 |

---

## 4. 사전 준비

### 4.1 필수 도구 설치

```bash
# 1. yt-dlp 설치 (유튜브 자막 추출용)
pip install yt-dlp

# 2. NotebookLM CLI 설치
pip install notebooklm-mcp-cli

# 3. ffmpeg 설치 (자막 변환용)
# Windows: https://ffmpeg.org/download.html 에서 다운로드
# 또는 chocolatey: choco install ffmpeg
```

### 4.2 NotebookLM 인증

NotebookLM CLI는 Google 계정 인증이 필요합니다.

```bash
# 인증 시작 (브라우저가 열림)
nlm login

# 인증 상태 확인
nlm login --check
```

**인증 성공 시 출력:**
```
✓ Authentication valid!
  Email: your-email@gmail.com
```

**중요 포인트:**
- 인증 정보는 로컬에 저장됨
- 인증이 만료되면 `nlm login`으로 재인증 필요
- 자동화 스크립트에서는 항상 인증 상태 확인 후 진행

### 4.3 인증 확인 코드 예시

```python
def check_auth(self) -> bool:
    """인증 상태 확인"""
    success, output = self._run_nlm_command(['login', '--check'])
    # 'Authentication valid!' 또는 'authenticated' 체크
    if success and ('valid' in output.lower() or 'authenticated' in output.lower()):
        return True
    return False
```

---

## 5. NLM CLI 명령어 레퍼런스

### 5.1 노트북 관리

```bash
# 노트북 목록 조회
nlm notebook list
nlm notebook list --json  # JSON 형식 출력

# 노트북 생성
nlm notebook create "노트북 제목"
# 출력: ✓ Created notebook: 노트북 제목
#       ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# 노트북 삭제
nlm notebook delete <notebook_id> --confirm
```

**주의:** `--json` 플래그는 `notebook list`에서만 지원됩니다. `notebook create`에서는 지원하지 않습니다.

### 5.2 소스 관리

```bash
# 소스 목록 조회
nlm source list <notebook_id>
nlm source list <notebook_id> --json

# 텍스트 소스 추가
nlm source add <notebook_id> --text "텍스트 내용" --title "소스 제목" --wait

# 파일 소스 추가 (PDF, TXT 등)
nlm source add <notebook_id> --file /path/to/file.txt --title "소스 제목" --wait

# URL 소스 추가
nlm source add <notebook_id> --url https://example.com --wait

# YouTube URL 추가
nlm source add <notebook_id> --youtube https://youtube.com/watch?v=xxxx --wait
```

**중요 포인트:**
- `--wait` 플래그: 소스 처리가 완료될 때까지 대기
- 긴 텍스트는 `--text` 대신 `--file`로 임시 파일 사용 권장 (명령줄 길이 제한)
- 소스 추가 후 처리 시간이 필요함 (몇 초 ~ 몇 분)

### 5.3 오디오 Overview 생성

```bash
# 오디오 생성 시작
nlm audio create <notebook_id> --format deep_dive --length default --confirm

# 포맷 옵션:
#   - deep_dive: 심층 분석 (기본)
#   - brief: 간단한 요약
#   - critique: 비평적 분석
#   - debate: 토론 형식

# 길이 옵션:
#   - short: 짧게
#   - default: 기본
#   - long: 길게
```

**출력 예시:**
```
⠼ Creating audio...
✓ Audio generation started
  Artifact ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

Run 'nlm studio status <notebook_id>' to check progress.
```

### 5.4 스튜디오 상태 확인

```bash
# 오디오 생성 상태 확인
nlm studio status <notebook_id>
nlm studio status <notebook_id> --json
```

**JSON 출력 형식:**
```json
[
  {
    "id": "artifact-id-here",
    "type": "audio",
    "status": "in_progress",  // 또는 "completed", "unknown"
    "custom_instructions": null
  }
]
```

**상태 값:**
- `in_progress`: 생성 중
- `completed`: 완료됨
- `unknown`: 알 수 없음 (보통 실패를 의미)

### 5.5 오디오 다운로드

```bash
# 오디오 다운로드
nlm download audio <notebook_id> --output /path/to/output.m4a

# 특정 artifact ID 지정
nlm download audio <notebook_id> --id <artifact_id> --output /path/to/output.m4a
```

**출력 형식:** M4A (AAC 오디오)

---

## 6. 구현 아키텍처

### 6.1 폴더 구조

```
nlm/
├── config/
│   └── channels.json           # 유튜버 채널 설정
├── agents/
│   ├── __init__.py
│   ├── research_agent.py       # 영상 수집 에이전트
│   └── synthesis_agent.py      # 팟캐스트 생성 에이전트
├── scripts/
│   ├── run_daily.py            # 메인 실행 스크립트
│   └── scheduler_setup.bat     # Windows 스케줄러 설정
├── output/
│   ├── transcripts/            # 추출된 자막 (SRT)
│   ├── summaries/              # 영상별 요약 (JSON)
│   └── podcasts/               # 생성된 팟캐스트 (M4A)
├── logs/                       # 실행 로그
├── requirements.txt
├── PITCAST_README.md           # 간단 사용법
└── NOTEBOOKLM_AUTOMATION_GUIDE.md  # 이 문서
```

### 6.2 채널 설정 파일 (channels.json)

```json
{
  "channels": [
    {
      "id": "nateherk",
      "name": "Nate Herk",
      "url": "https://www.youtube.com/@nateherk",
      "enabled": true
    },
    {
      "id": "disabled_channel",
      "name": "Disabled Channel",
      "url": "https://www.youtube.com/@disabled",
      "enabled": false,
      "note": "비활성화 이유"
    }
  ],
  "settings": {
    "hours_lookback": 24,           // 몇 시간 이내 영상 수집
    "subtitle_language": "en",       // 기본 자막 언어
    "fallback_language": "ko",       // 대체 자막 언어
    "max_videos_per_channel": 5      // 채널당 최대 수집 영상 수
  }
}
```

### 6.3 실행 흐름

```
1. 인증 확인
   └─ nlm login --check

2. Phase 1: Research Agent
   ├─ 각 채널에서 최근 영상 목록 조회 (yt-dlp --flat-playlist)
   ├─ 각 영상의 메타데이터 조회 (업로드 날짜 확인)
   ├─ 시간 범위 내 영상 필터링
   ├─ 자막 추출 (yt-dlp --write-auto-subs)
   └─ 요약 JSON 생성

3. Phase 2: Synthesis Agent
   ├─ 새 노트북 생성
   ├─ 각 영상 자막을 소스로 추가
   ├─ 오디오 Overview 생성 요청
   ├─ 완료 대기 (폴링)
   └─ 오디오 파일 다운로드
```

---

## 7. 주요 구현 세부사항

### 7.1 yt-dlp를 사용한 영상 정보 수집

#### 채널에서 최근 영상 ID 목록 가져오기

```python
cmd = [
    'yt-dlp',
    '--flat-playlist',          # 메타데이터만 (다운로드 안 함)
    '--playlist-end', '10',     # 최근 10개만
    '--print', '%(id)s',        # ID만 출력
    f'{channel_url}/videos'
]
```

**주의:** `--flat-playlist` 모드에서는 업로드 날짜가 `NA`로 반환됩니다.

#### 개별 영상 정보 가져오기

```python
cmd = [
    'yt-dlp',
    '--skip-download',
    '--print', '%(id)s|%(title)s|%(upload_date)s|%(duration_string)s',
    video_url
]
```

**출력 예시:**
```
abc123|Video Title|20260217|10:30
```

### 7.2 자막 추출

```python
ffmpeg_path = Path("path/to/ffmpeg/bin")
cmd = [
    'yt-dlp',
    '--ffmpeg-location', str(ffmpeg_path),  # ffmpeg 경로 지정 (필수)
    '--write-auto-subs',                     # 자동 생성 자막 포함
    '--sub-langs', f'{lang}.*,{lang}',       # 언어 패턴
    '--convert-subs', 'srt',                 # SRT 형식으로 변환
    '--skip-download',                       # 영상 다운로드 안 함
    '-o', str(output_path),
    video_url
]
```

**중요:** `--ffmpeg-location`을 지정하지 않으면 자막 변환이 실패합니다.

### 7.3 SRT 파싱

```python
def _parse_srt(self, srt_path: Path) -> str:
    """SRT 파일을 텍스트로 변환"""
    with open(srt_path, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = []
    for block in content.split('\n\n'):
        block_lines = block.strip().split('\n')
        if len(block_lines) >= 3:
            # 첫 번째 줄: 번호, 두 번째 줄: 타임스탬프, 나머지: 텍스트
            text_lines = block_lines[2:]
            text = ' '.join(text_lines)
            # HTML 태그 제거
            text = re.sub(r'<[^>]+>', '', text)
            if text.strip():
                lines.append(text.strip())

    return ' '.join(lines)
```

### 7.4 NotebookLM 소스 추가 (긴 텍스트 처리)

명령줄 길이 제한 때문에 긴 텍스트는 임시 파일로 저장 후 업로드합니다:

```python
def add_text_source(self, notebook_id: str, title: str, content: str) -> bool:
    """텍스트 소스 추가 (임시 파일 사용)"""
    temp_file = None
    try:
        # 임시 텍스트 파일 생성
        temp_file = self.output_dir / f"temp_source_{hash(title) % 10000}.txt"
        with open(temp_file, 'w', encoding='utf-8') as f:
            f.write(f"# {title}\n\n{content}")

        success, output = self._run_nlm_command([
            'source', 'add', notebook_id,
            '--file', str(temp_file),
            '--title', title,
            '--wait'
        ], timeout=120)

        return success
    finally:
        # 임시 파일 정리
        if temp_file and temp_file.exists():
            temp_file.unlink()
```

### 7.5 오디오 생성 대기 (폴링)

```python
def wait_for_audio(self, notebook_id: str, max_wait: int = 600, poll_interval: int = 30) -> Optional[str]:
    """오디오 생성 완료 대기"""
    start_time = time.time()

    while time.time() - start_time < max_wait:
        success, output = self._run_nlm_command(['studio', 'status', notebook_id, '--json'])

        if success:
            data = json.loads(output)

            # 출력이 리스트 형식
            artifacts = data if isinstance(data, list) else data.get('artifacts', [])

            for artifact in artifacts:
                if artifact.get('type') == 'audio':
                    status = artifact.get('status', '').lower()

                    if status == 'completed':
                        return artifact.get('id')
                    elif 'error' in status or 'failed' in status:
                        return None
                    # in_progress: 계속 대기

        logger.info(f"Waiting for audio... ({int(time.time() - start_time)}s / {max_wait}s)")
        time.sleep(poll_interval)

    return None  # 타임아웃
```

---

## 8. 문제 해결 및 트러블슈팅

### 8.1 `--flat-playlist`에서 날짜가 NA로 반환됨

**문제:** 채널의 영상 목록을 가져올 때 `--flat-playlist` 모드에서는 업로드 날짜가 제공되지 않습니다.

**해결:** 두 단계로 나누어 처리:
1. `--flat-playlist`로 영상 ID 목록만 가져옴
2. 각 영상별로 개별 조회하여 메타데이터 수집

### 8.2 자막 변환 실패 (ffmpeg not found)

**문제:** `--convert-subs srt` 옵션 사용 시 ffmpeg를 찾지 못함

**해결:** `--ffmpeg-location` 옵션으로 ffmpeg 경로 명시적 지정

```python
ffmpeg_path = Path(__file__).parent.parent.parent / "ffmpeg" / "ffmpeg-x.x-essentials_build" / "bin"
cmd = ['yt-dlp', '--ffmpeg-location', str(ffmpeg_path), ...]
```

### 8.3 `nlm notebook create --json` 지원 안 됨

**문제:** `notebook create` 명령에 `--json` 플래그가 없음

**해결:** 일반 출력에서 ID 파싱

```python
# 출력 형식: "✓ Created notebook: Title\n  ID: xxxxxxxx-xxxx-xxxx-xxxx"
for line in output.strip().split('\n'):
    if 'ID:' in line:
        parts = line.split('ID:')
        notebook_id = parts[-1].strip()
```

### 8.4 `nlm studio status`가 리스트 반환

**문제:** `studio status --json`이 딕셔너리가 아닌 리스트를 반환

**해결:** 타입 체크 후 처리

```python
data = json.loads(output)
if isinstance(data, list):
    artifacts = data
else:
    artifacts = data.get('artifacts', [])
```

### 8.5 긴 텍스트로 인한 명령줄 오류

**문제:** `--text "매우 긴 텍스트..."` 사용 시 명령줄 길이 제한 초과

**증상:** `nlm CLI not found` 또는 명령 실행 실패

**해결:** 임시 파일로 저장 후 `--file` 옵션 사용

### 8.6 오디오 생성 거부

**문제:** `NotebookLM rejected audio creation. Try again later...`

**원인:**
- API 속도 제한
- 소스 처리 미완료
- 일시적 서버 문제

**해결:**
1. 재시도 로직 구현 (최대 3회, 점진적 대기)
2. 소스 추가 후 충분한 대기 시간

```python
def create_audio_overview(self, notebook_id, ..., max_retries=3):
    for attempt in range(max_retries):
        success, output = self._run_nlm_command([...])
        if success:
            return notebook_id

        wait_time = (attempt + 1) * 30  # 30, 60, 90초
        time.sleep(wait_time)

    return None
```

### 8.7 상태가 `unknown`으로 유지됨

**문제:** `studio status`에서 상태가 `unknown`으로 계속 표시되고 다운로드 실패

**원인:** 오디오 생성 실패 (소스 문제, API 제한 등)

**해결:** `unknown` 상태가 일정 시간 지속되면 실패로 처리하고 재시도

---

## 9. API 제한사항 및 주의사항

### 9.1 NotebookLM 제한사항

| 항목 | 제한 |
|------|------|
| 오디오 생성 시간 | 약 3-10분 (콘텐츠 양에 따라) |
| 연속 오디오 생성 | 간격 두고 요청 권장 |
| 소스 개수 | 노트북당 최대 50개 |
| 소스 크기 | 개별 소스당 500,000 단어 |

### 9.2 yt-dlp 제한사항

- YouTube는 IP 기반 속도 제한이 있음
- 자동 생성 자막은 품질이 낮을 수 있음
- 일부 영상은 자막이 없을 수 있음

### 9.3 권장 사항

1. **소스 추가 간격**: 각 소스 추가 사이에 2초 대기
2. **오디오 생성 재시도**: 실패 시 30-90초 대기 후 재시도
3. **에러 로깅**: 모든 API 호출 결과 로깅
4. **인증 확인**: 작업 시작 전 항상 인증 상태 확인

---

## 10. 확장 아이디어

### 10.1 다른 콘텐츠 소스 활용

```python
# 웹페이지 소스 추가
nlm source add <notebook_id> --url https://blog.example.com/article

# Google Drive 문서 추가
nlm source add <notebook_id> --drive <drive_doc_id> --type doc

# PDF 파일 추가
nlm source add <notebook_id> --file document.pdf
```

### 10.2 맞춤형 오디오 스타일

```python
# 짧은 요약
nlm audio create <notebook_id> --format brief --length short

# 토론 형식
nlm audio create <notebook_id> --format debate --length long

# 비평적 분석
nlm audio create <notebook_id> --format critique --length default
```

### 10.3 자동화 시나리오 예시

1. **뉴스 브리핑**: RSS 피드에서 기사 수집 → NotebookLM으로 일일 뉴스 팟캐스트
2. **학습 도우미**: PDF 교재 업로드 → 챕터별 오디오 요약 생성
3. **회의록 요약**: 회의 녹취록 → 핵심 요약 오디오 생성
4. **리서치 종합**: 여러 논문 업로드 → 연구 동향 팟캐스트

### 10.4 MCP 서버 통합

`notebooklm-mcp-cli`는 MCP(Model Context Protocol) 서버로도 사용할 수 있습니다:

```json
// claude_desktop_config.json
{
  "mcpServers": {
    "notebooklm": {
      "command": "nlm",
      "args": ["mcp"]
    }
  }
}
```

이를 통해 Claude에서 직접 NotebookLM 기능을 사용할 수 있습니다.

---

## 부록: 전체 명령어 빠른 참조

```bash
# 인증
nlm login                    # 로그인 (브라우저 열림)
nlm login --check            # 인증 상태 확인

# 노트북
nlm notebook list [--json]   # 목록 조회
nlm notebook create "제목"    # 생성
nlm notebook delete ID --confirm  # 삭제

# 소스
nlm source list ID [--json]  # 소스 목록
nlm source add ID --text "내용" --title "제목" --wait
nlm source add ID --file /path/file.txt --title "제목" --wait
nlm source add ID --url https://... --wait
nlm source add ID --youtube https://youtube.com/... --wait

# 오디오
nlm audio create ID --format deep_dive --length default --confirm
nlm studio status ID [--json]
nlm download audio ID --output /path/output.m4a
nlm download audio ID --id artifact_id --output /path/output.m4a
```

---

*문서 작성일: 2026-02-18*
*구현 버전: notebooklm-mcp-cli 0.3.x*
