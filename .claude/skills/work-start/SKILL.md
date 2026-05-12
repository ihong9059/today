---
name: work-start
description: 작업 시작 시 사용. git pull, 세션 복원, 작업보고서 확인, 오늘 할일 표시. 세션 시작할 때 호출
---

# 작업 시작 Skill (통합)

작업 시작 시 저장소 동기화, 이전 세션 복원, 작업보고서 확인을 한 번에 수행합니다.

## 실행 절차

### 1. git pull로 저장소 동기화
```bash
git pull
```

### 1-A. 진행 로그 임시 파일 초기화 (매 세션 시작)

`_current_progress.md` = 이번 세션 동안 모든 prompt 응답을 누적 기록하는 임시 파일.
새 세션 시작이므로 **비우거나 새로 생성**한다.

```bash
powershell -Command "Set-Content 'C:\todo\today\.claude\sessions\_current_progress.md' -Value (\"# Progress Log - \" + (Get-Date -Format 'yyyy-MM-dd HH:mm') + \"`n`n새 세션 시작.`n\")"
```

이후 매 응답 직후 다음 형식으로 append:
```markdown
## [HH:MM] {사용자 prompt 1줄 요약}
{이번 응답에 표시한 내용 그대로}
```

### 1-B. memory 동기화 자동 셋업 (idempotent — 매번 실행 안전)

`~/.claude/projects/<project>/memory/` 가 today repo의 `.claude/memory/`로 link되어 있는지 자동 확인. 없으면 자동 생성하여 양 PC 동기화 활성화.

```bash
python "C:\todo\today\.claude\hooks\setup-memory-sync.py"
```

(Mac/Linux의 경우):
```bash
python3 ~/path/to/today/.claude/hooks/setup-memory-sync.py
```

**판단 후 행동:**
- `STATUS: Already configured correctly` → 침묵 (보고 생략)
- `SUCCESS: Memory sync setup complete` → "✅ 메모리 동기화 셋업 완료 (첫 실행)" 1줄 알림
- `ERROR` → 사용자에게 출력 + 수동 가이드 (`.claude/memory/README.md` 참조)

이 단계는 **신규 PC에서 첫 work-start 시 자동으로 link 생성**하여, 사용자가 별도 작업 없이 메모리 동기화가 즉시 시작되도록 한다.

### 1-C. multi-agent _inbox 카드 확인 (2026-05-12 도입)

**시스템 가이드**: `myWiki/_inbox/SYSTEM_GUIDE.md` (전체 개요·합의 이력·다음 Claude를 위한 빠른 진입점)

myWiki는 다른 Claude(revita-claude 등)와 `_inbox/` 메일박스로 비동기 협업한다. 미처리 카드 우선 처리.

```bash
ls "C:/todo/today/myWiki/_inbox/pending/" 2>/dev/null
```

**판단 후 행동:**
- **빈 폴더 또는 없음** → 침묵 (보고 생략, 다음 단계 진행)
- **미처리 카드 있음** → 사용자에게 알림:
  ```
  📬 myWiki/_inbox/pending/ 미처리 카드 N건 — multi-agent 통신
    - [priority/type] from {발신측} | {subject}
  처리: 카드 본문 읽기 → 5단계 흡수 (외부 위키 흡수 정책) → processed/로 이동 + status: done
  발신측 inbox에 done 회신 카드 발송 (PROTOCOL: myWiki/_inbox/PROTOCOL.md)
  ```
- 사용자가 처리 결정 → 카드 본문 읽고 5단계 흡수 수행. 처리 후 다음 단계 진행
- 사용자가 보류 → 다음 work-start에서 다시 알림

**5단계 흡수 체크리스트** (myWiki/CLAUDE.md § "외부 위키 흡수" 참조):
1. 신규 entity → skills.md / strengths.md
2. 신규 gotcha → gaps.md
3. 신규 decision → ai-direction.md 판단 로그
4. 매칭 패턴 → thoughts/2026-Q{N}/
5. revita entity → entities/revita.md

처리 완료 시:
1. 카드 → `_inbox/processed/` 이동 + frontmatter `status: done`
2. 발신측 inbox에 `done` 회신 카드 발송
3. `myWiki/log.md`에 `## [날짜] absorb | ...` 박제

### 2. 최근 세션 파일 확인 및 복원

```bash
powershell -Command "Get-ChildItem 'C:\todo\today\.claude\sessions\session_*.md' -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1 -ExpandProperty FullName"
```

세션 파일이 있으면:
- Read 도구로 세션 파일 읽기
- 이전 작업 요약, 완료/미완료 작업, 중요 정보 표시
- "다음에 할 일" 항목을 TodoWrite로 할 일 목록에 추가

세션 파일이 없으면:
- "저장된 세션이 없습니다" 안내 후 다음 단계 진행

### 3. 작업보고서 확인

작업보고서/ 폴더에서:
- 어제 작업보고서 확인 (완료/미완료 파악)
- 오늘 작업보고서(YYYY-MM-DD_작업보고서.md) 확인 또는 생성

### 4. 오늘 할일 통합 및 작업보고서 반영

다음 항목들을 통합하여 테이블 형식으로 표시:
- 세션의 "다음에 할 일"
- 어제 미완료 작업
- 오늘 작업보고서의 할일

| 순번 | 할일 | 출처 | 상태 |
|:----:|------|------|:----:|
| 1 | ... | 세션 | ⬜ |
| 2 | ... | 어제 미완료 | ⬜ |
| 3 | ... | 오늘 할일 | ⬜ |

**중요: 오늘 작업보고서(YYYY-MM-DD_작업보고서.md)의 "오늘 할일" 섹션에 위 통합 테이블을 Edit 도구로 반영한다.**

### 5. myWiki 세컨드 브레인 상태 확인

`C:\todo\today\myWiki\second-brain\log.md`에서 마지막 로그 날짜를 확인한다.

**확인 항목:**
1. 마지막 로그 날짜가 어제 이전이면 → "myWiki 로그가 [마지막 날짜] 이후 미반영입니다" 경고 표시
2. 이전 세션에서 작업한 내용이 위키에 반영되었는지 확인
3. 미반영 작업이 있으면 할일 테이블에 "myWiki 반영" 항목 추가

**표시 형식:**
```
myWiki 상태: 마지막 로그 YYYY-MM-DD (N일 전)
→ 미반영 작업이 있을 수 있습니다. 작업 중 또는 /work-end 시 반영합니다.
```

### 6. 작업 시작 질문

사용자에게 질문:
- "이전 작업을 이어서 진행할까요?"
- "다른 작업을 시작할까요?"

## 세션 목록 보기

사용자가 "세션 목록 보여줘"라고 요청하면:

```bash
powershell -Command "Get-ChildItem 'C:\todo\today\.claude\sessions\session_*.md' -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object Name, LastWriteTime"
```

## 특정 세션 복원

사용자가 특정 날짜 세션을 요청하면 해당 날짜의 세션 파일을 찾아서 복원

## 트리거 키워드

- "작업 시작"
- "세션 시작"
- "세션 복원해줘"
- "이전 작업 이어서"
- "work start"

## 참고

- 위시캣 프로젝트 체크는 /wishket-check 로 별도 진행
