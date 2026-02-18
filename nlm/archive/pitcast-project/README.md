# NotebookLM Skill 사용 설명서

## 개요

Google NotebookLM을 Claude Code에서 직접 사용할 수 있게 해주는 스킬입니다. 업로드한 문서 기반의 RAG(Retrieval-Augmented Generation) 답변을 받을 수 있습니다.

## 설치 위치

```
skills/
├── notebooklm/          # 스킬 본체
│   ├── scripts/         # 자동화 스크립트
│   ├── references/      # 상세 문서
│   └── SKILL.md         # 스킬 정의
└── nlm/                 # 이 문서
    └── README.md
```

## 빠른 시작

### 1. 인증 상태 확인

```bash
cd skills/notebooklm
python scripts/run.py auth_manager.py status
```

### 2. 최초 인증 (한 번만)

```bash
python scripts/run.py auth_manager.py setup
```
> 브라우저가 열리면 Google 계정으로 로그인하세요.

### 3. 노트북 목록 확인

```bash
python scripts/run.py notebook_manager.py list
```

### 4. 노트북 추가

```bash
# 스마트 추가 (권장) - 먼저 내용 파악
python scripts/run.py ask_question.py \
  --question "이 노트북의 내용을 간략히 요약해줘" \
  --notebook-url "https://notebooklm.google.com/notebook/..."

# 파악한 내용으로 추가
python scripts/run.py notebook_manager.py add \
  --url "https://notebooklm.google.com/notebook/..." \
  --name "노트북 이름" \
  --description "노트북 설명" \
  --topics "주제1,주제2"
```

### 5. 질문하기

```bash
# 활성 노트북에 질문
python scripts/run.py ask_question.py --question "질문 내용"

# 특정 노트북에 질문
python scripts/run.py ask_question.py --question "질문" --notebook-id ID

# URL로 직접 질문
python scripts/run.py ask_question.py --question "질문" --notebook-url "URL"
```

## 주요 명령어

### 인증 관리 (auth_manager.py)

| 명령어 | 설명 |
|--------|------|
| `setup` | 최초 인증 설정 (브라우저 표시) |
| `status` | 인증 상태 확인 |
| `reauth` | 재인증 |
| `clear` | 인증 정보 삭제 |

### 노트북 관리 (notebook_manager.py)

| 명령어 | 설명 |
|--------|------|
| `list` | 모든 노트북 목록 |
| `add --url --name --description --topics` | 노트북 추가 |
| `search --query` | 노트북 검색 |
| `activate --id` | 활성 노트북 설정 |
| `remove --id` | 노트북 제거 |
| `stats` | 통계 보기 |

### 질문 (ask_question.py)

| 옵션 | 설명 |
|------|------|
| `--question` | 질문 내용 (필수) |
| `--notebook-id` | 특정 노트북 ID |
| `--notebook-url` | 노트북 URL 직접 지정 |
| `--show-browser` | 브라우저 표시 (디버깅용) |

### 정리 (cleanup_manager.py)

```bash
# 미리보기
python scripts/run.py cleanup_manager.py

# 실행
python scripts/run.py cleanup_manager.py --confirm

# 노트북 라이브러리 유지
python scripts/run.py cleanup_manager.py --preserve-library
```

## 데이터 저장 위치

```
~/.claude/skills/notebooklm/data/
├── library.json       # 노트북 메타데이터
├── auth_info.json     # 인증 상태
└── browser_state/     # 브라우저 세션
```

## 주의사항

1. **항상 `run.py` 래퍼 사용** - 직접 스크립트 호출 금지
2. **인증 시 브라우저 표시** - 수동 로그인 필요
3. **일일 한도** - 무료 계정 약 50회/일
4. **세션 비유지** - 매 질문마다 새 브라우저 세션

## 문제 해결

| 문제 | 해결책 |
|------|--------|
| ModuleNotFoundError | `run.py` 래퍼 사용 |
| 인증 실패 | `--show-browser`로 확인 |
| 속도 제한 | 다음 날까지 대기 |
| 노트북 없음 | `notebook_manager.py list` 확인 |

## 워크플로우

```
1. 인증 확인 → auth_manager.py status
       ↓
2. 미인증시 → auth_manager.py setup
       ↓
3. 노트북 확인/추가 → notebook_manager.py list/add
       ↓
4. 활성화 → notebook_manager.py activate --id ID
       ↓
5. 질문 → ask_question.py --question "..."
       ↓
6. 후속 질문 → 필요시 추가 질문
       ↓
7. 종합 답변 제공
```

## 참고 자료

- `skills/notebooklm/SKILL.md` - 전체 스킬 정의
- `skills/notebooklm/references/` - 상세 API 문서
- `skills/notebooklm/README.md` - 영문 원본 문서
