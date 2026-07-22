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

### 1-C. multi-agent _inbox 카드 확인 (2026-05-12 도입, 2026-05-20 강화)

**시스템 가이드**: `myWiki/_inbox/SYSTEM_GUIDE.md` (전체 개요·합의 이력·다음 Claude를 위한 빠른 진입점)
**lifecycle 정책**: `~/.claude/projects/C--todo-today/memory/feedback_inbox_lifecycle.md` ⭐ (필독)

myWiki는 다른 Claude(revita-claude·ondevice-claude·lemonlabs-claude 등)와 `_inbox/` 메일박스로 비동기 협업한다. **카드는 발송만으로 끝이 아니다. 받는 쪽이 5단계 lifecycle 모두 수행해야 처리 완료**.

```bash
ls "C:/todo/today/myWiki/_inbox/pending/" 2>/dev/null | wc -l
```

**외부 vault 카드 우선 정책 (2026-05-20 사용자 지시) ⭐⭐**:

| pending 수 | 행동 |
|:-:|---|
| 0 | 침묵 |
| **≥ 1** | ⭐ **다음 작업 슬롯의 디폴트 = 흡수**. work-start 통합 todo 테이블에서 "_inbox 흡수"를 다른 신규 todo보다 위에 배치 + 🟠 이상 우선순위. 사용자가 다른 작업을 명시적으로 지시하지 않는 한 megasession 진행 권고. |
| ≥ 5 | **강제 권고 + 통합 테이블 #1 자동 등록**: "흡수 megasession이 다른 작업보다 우선합니다. 진행할까요? (Y/n)" 사용자가 명시적으로 "보류"하지 않으면 즉시 진행 |
| ≥ 10 | 위급: 시스템 정합성 부채 누적, work-start 최우선 작업으로 분류 + work-end에 미흡수 카드 ≥ 5장 경고 |

**Claude가 사용자에게 "다음 뭐 할까요?" 같은 결정 prompt를 던질 때 반드시 외부 카드 흡수를 첫 옵션으로 제시**한다.

**알림 형식**:
```
📬 myWiki/_inbox/pending/ 미처리 카드 N건 — multi-agent 통신
  - [priority/type] from {발신측} | {subject}
처리: 5단계 lifecycle (entity·gaps·decision·thoughts + 발신측 entity) → processed/ + status: done
     + 발신측 inbox에 done 회신 카드 발송 (PROTOCOL: myWiki/_inbox/PROTOCOL.md)
```

**5단계 흡수 체크리스트** (`myWiki/CLAUDE.md` § "외부 위키 흡수" + `feedback_inbox_lifecycle.md`):

1. 신규 entity → `entities/` 신설 또는 기존 갱신 (skills.md / strengths.md cross-link 포함)
2. 신규 gotcha → `gaps.md` 카테고리 추가
3. 신규 decision → `ai-direction.md` 판단 로그
4. 매칭 패턴 → `thoughts/YYYY-QN/YYYY-MM-DD_{topic}.md`
5. 발신측 entity 갱신 → 카드 § "myWiki/entities/ 갱신 권장" 가이드 따름

**처리 완료 후 (전부 수행 필수)**:
1. 카드 → `_inbox/processed/` 이동
2. 카드 frontmatter `status: pending` → `status: done`
3. 발신측 inbox에 `done` 회신 카드 발송 (`from: mywiki-claude, to: {원래 발신}, type: ack`)
4. `myWiki/log.md`에 `## [날짜] absorb | {카드 id}` 1줄 박제

**🚫 strikethrough 표시 금지 규칙** (5/20 박제):
작업보고서·log·세션·메모 어디서든 `~~카드~~` 취소선 표시는 위 5단계 + 후처리 4단계가 **모두 완료된 경우에만** 허용. 단순 검토·인지·다음 megasession 후보 추가만으로 strikethrough 사용 시 lifecycle 실패로 간주.

### 1-D. raw/ junction 정합성 검증 (2026-05-20 신설)

`myWiki/second-brain/CLAUDE.md` 스키마에 등재된 `raw/{name}/` junction이 실재하는지 검증한다.

```bash
python "C:/todo/today/.claude/hooks/check-raw-junctions.py" 2>/dev/null || echo "(check-raw-junctions.py 미생성)"
```

**판단**:
- 모두 OK → 침묵
- broken/missing 발견 → 알림 + 복구 가이드 1줄 제시 (`New-Item -ItemType Junction -Path "..." -Target "..."`)

vault 위치 변경 시 junction 재생성 누락이 잦으므로 자동 검증으로 차단한다.

### 1-E. sibling vault 진행상황 staleness 감지 (2026-07-23 신설)

`C:/todo/` 하위 A군 vault(academy·lora·factory·onDevice·ponet·weldRobot 등)의 `log.md` 최종수정을 myWiki 해당 entity 최종수정과 비교하여, **vault는 진행했는데 myWiki에 cascade 안 된** 미반영을 감지한다. (읽기전용 — 자동 sync 안 함, `feedback_vault_scope_isolation` 준수)

> ⚠️ 이 hook은 SessionStart(`settings.json`)에서도 자동 실행된다. 동일 세션에서 `/work-start` 재실행 시 갭 보완용으로 재호출.

```bash
python "C:/todo/today/.claude/hooks/check-vault-status.py"
```

**판단**:
- 출력 없음 → 침묵
- `📊 vault 진행상황 미반영 감지` 출력 → 사용자에게 그대로 보고 + **결정 필요**: 해당 vault 카드 흡수 또는 entity cascade 갱신 여부. 사업 레벨 상태·이슈(예: 진행 중인 교육 차수, 횡단 하드웨어 이슈)면 오늘 할일 등록 검토 (`feedback_cross_vault_to_todo`).
- 신규 A군 vault 합류 시 `check-vault-status.py`의 `VAULT_MAP`에 `{vault_dir: entity_file}` 추가.

myWiki(main vault)는 sibling vault의 **운영 디테일은 몰라도 되지만 상태·결정·횡단 이슈는 반드시 인지**해야 한다. 본 hook이 그 인지 누락을 자동 차단한다.

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

### 4-A. Notion 동기화 (작업보고서 통합 직후 필수)

작업보고서 통합 테이블을 새로 작성·반영한 직후 즉시 Notion으로 단방향 sync한다. `SessionStart` hook(`settings.json`)은 새 세션 진입 시 1회만 실행되므로, 동일 세션에서 `/work-start`로 재통합한 경우 hook이 다시 실행되지 않아 Notion이 stale 상태가 된다. 본 단계가 그 갭을 메운다.

```bash
python "C:/todo/today/.claude/hooks/notion-sync.py"
```

**정책 (단방향 sync, memory `feedback_todo_notion_sync.md` 참조)**:
- 생성: 작업보고서 → Notion
- 완료: Notion → 작업보고서 (Notion 체크 항목 → 작업보고서 ✅ + ~~취소선~~)
- Claude는 임의로 작업보고서 ⬜→✅ 변경 금지 (본 sync 결과로만 변경)

**출력 표시**: 결과 라인(`완료 정리 N건 / 상태 동기화 N건 / 작업보고서→Notion N건 추가 / Notion→작업보고서 N건 추가 / 번호 재정렬 N건`)을 사용자에게 보고. 0건이 아닌 항목은 어떤 변화가 일어났는지 풀어서 설명한다.

**역전파로 작업보고서가 변경되면**: 4단계에서 사용자에게 보여준 통합 테이블과 실제 작업보고서가 달라지므로 **최신 잔여 할일 테이블을 재표시**한다.

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
