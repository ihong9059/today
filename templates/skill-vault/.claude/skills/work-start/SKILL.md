---
name: work-start
description: 작업 시작 시 사용. git pull, 세션 복원, 작업보고서 확인, 오늘 할일 통합 표시. 세션 시작할 때 호출
---

# 작업 시작 Skill (범용)

작업 시작 시 저장소 동기화, 이전 세션 복원, 작업보고서 확인·할일 통합을 한 번에 수행한다.
이 vault의 **세션 연속성 운영 원리**를 담은 핵심 skill이다.

## 실행 절차

### 1. git pull로 저장소 동기화

```bash
git pull
```

> git repo가 아니거나 원격이 없으면 스킵하고 다음 단계로 진행.

### 1-A. 진행 로그 임시 파일 초기화 (매 세션 시작)

`_current_progress.md` = 이번 세션 동안 모든 prompt 응답을 누적 기록하는 임시 파일.
새 세션이므로 비우거나 새로 생성한다.

```bash
powershell -Command "Set-Content '.\.claude\sessions\_current_progress.md' -Value (\"# Progress Log - \" + (Get-Date -Format 'yyyy-MM-dd HH:mm') + \"`n`n새 세션 시작.`n\")"
```

(Mac/Linux)
```bash
printf "# Progress Log - %s\n\n새 세션 시작.\n" "$(date '+%Y-%m-%d %H:%M')" > .claude/sessions/_current_progress.md
```

이후 매 응답 직후 다음 형식으로 append 한다:
```markdown
## [HH:MM] {사용자 prompt 1줄 요약}
{이번 응답에 표시한 내용 그대로}
```

### 2. 최근 세션 파일 확인 및 복원

```bash
powershell -Command "Get-ChildItem '.\.claude\sessions\session_*.md' -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1 -ExpandProperty FullName"
```

세션 파일이 있으면:
- 파일을 읽어 이전 작업 요약·완료/미완료·중요 정보 표시
- "다음에 할 일" 항목을 오늘 할일 통합 대상에 추가

세션 파일이 없으면 "저장된 세션이 없습니다" 안내 후 진행.

### 3. 작업보고서 확인

`작업보고서/` 폴더에서:
- 어제 작업보고서 확인 (완료/미완료 파악)
- 오늘 작업보고서(`YYYY-MM-DD_작업보고서.md`) 확인 — SessionStart 훅이 자동 생성했을 수 있음. 없으면 생성.

### 4. 오늘 할일 통합 및 작업보고서 반영

다음을 통합하여 테이블로 표시:
- 세션의 "다음에 할 일"
- 어제 미완료 작업
- 오늘 작업보고서의 할일

| 순번 | 할일 | 출처 | 상태 |
|:----:|------|------|:----:|
| 1 | ... | 세션 | ⬜ |
| 2 | ... | 어제 미완료 | ⬜ |
| 3 | ... | 오늘 할일 | ⬜ |

**통합 테이블을 오늘 작업보고서의 "오늘 할일" 섹션에 Edit로 반영한다.**

### 5. wiki(세컨드 브레인) 상태 확인

`wiki/log.md`의 마지막 로그 날짜를 확인:
- 마지막 로그가 어제 이전이면 "wiki 로그가 [날짜] 이후 미반영입니다" 경고
- 이전 세션 작업이 wiki에 반영됐는지 확인, 미반영이면 할일 테이블에 "wiki 반영" 추가

### 6. 작업 시작 질문

사용자에게: "이전 작업을 이어서 진행할까요? 다른 작업을 시작할까요?"

---

## 확장점 (선택)

이 vault를 외부 시스템과 연동하려면 아래를 추가한다 (원본 `today` vault 패턴 참조):
- **Notion 동기화** — 할일 통합 직후 `python .claude/hooks/notion-sync.py` (단방향: 생성=보고서→Notion / 완료=Notion→보고서)
- **memory 동기화** — `~/.claude/projects/<proj>/memory/` ↔ `.claude/memory/` 링크
- **multi-agent _inbox** — `_inbox/pending/` 카드 흡수 (다른 vault와 비동기 협업)
- **cross-vault staleness 감지** — sibling vault log vs 본 wiki entity 최종수정 비교

## 트리거 키워드
- "작업 시작", "세션 시작", "이전 작업 이어서", "work start"
