---
name: work-end
description: 작업 종료 시 사용. 세션 저장, 작업보고서 업데이트, git commit/push. 세션 종료 전 호출
---

# 작업 종료 Skill (통합)

작업 종료 시 세션 저장, 작업보고서 업데이트, git 커밋을 한 번에 수행합니다.

## 실행 절차

### 1. 이번 세션 작업 내용 정리

현재 세션에서 수행한 작업들을 정리:
- 완료된 작업
- 진행 중인 작업
- 다음에 할 일

### 1-Z. 진행 로그 임시 파일 인계

`_current_progress.md`를 정식 세션 파일로 변환:

1. `C:\todo\today\.claude\sessions\_current_progress.md` 읽기
2. 그 내용을 정식 세션 파일(아래 2번 단계)의 "상세 진행 로그" 섹션에 그대로 포함
3. 정식 세션 파일 저장 후 `_current_progress.md` 삭제 (다음 세션의 work-start에서 새로 생성됨)

### 2. 세션 파일 저장

저장 위치: `C:\todo\today\.claude\sessions\session_[날짜시간].md`

```markdown
# Session Report - [날짜 시간]

## 작업 요약
[오늘 수행한 작업들을 간략히 요약]

## 완료된 작업
- [완료된 작업 목록]

## 진행 중인 작업
- [아직 완료되지 않은 작업]

## 다음에 할 일
- [다음 세션에서 해야 할 작업]

## 중요 정보
- [기억해야 할 중요한 설정, 경로, 변수 등]

## 관련 파일
- [작업한 파일 경로들]

## 메모
[추가 메모사항]
```

### 3. 오래된 세션 파일 정리

최근 3개 세션만 유지하고 나머지 삭제:

```bash
powershell -Command "Get-ChildItem 'C:\todo\today\.claude\sessions\session_*.md' | Sort-Object LastWriteTime -Descending | Select-Object -Skip 3 | Remove-Item -Force"
```

### 4. 작업보고서 업데이트

오늘 작업보고서(YYYY-MM-DD_작업보고서.md) 업데이트:
- 오늘 할일 상태 업데이트 (⬜ → ✅ 또는 유지)
- 오늘 완료 사항 추가
- 작업 상세 내용 추가
- 수정/생성된 파일 목록
- 세션 요약 (주요 작업, 완료 사항, 미완료, 완료율)

### 5. 세컨드 브레인 위키 반영

오늘 작업 내용을 `C:\todo\today\myWiki\second-brain\` 위키에 반영한다.

#### 5-A. 하위 프로젝트 위키 변경 감지 (Lint)

하위 프로젝트 위키가 변경되었으면 myWiki의 해당 엔티티 페이지를 동기화한다.

**감지 대상:**

| 프로젝트 위키 | myWiki 엔티티 | 비교 기준 |
|---|---|---|
| `C:\todo\revitaProject\revitaWiki\overview.md` | `entities/revita.md` | updated 날짜 비교 |

**감지 방법:**
1. revitaWiki `overview.md`의 프론트매터 `updated` 날짜를 읽는다
2. myWiki `entities/revita.md`의 프론트매터 `updated` 날짜와 비교한다
3. revitaWiki가 더 최신이면 → **동기화 필요** 플래그

**동기화 실행 (플래그가 켜진 경우):**
1. revitaWiki `overview.md`에서 현재 상태, 핵심 지표, 완료/미완료 목록을 읽는다
2. myWiki `entities/revita.md`의 "현재 상태", "타임라인" 섹션을 갱신한다
3. `revita.md`의 `updated` 날짜를 오늘로 변경한다
4. 결과를 work-end 리포트에 표시:
   - 동기화됨: `revita.md ← revitaWiki (변경 요약)`
   - 또는: `revita.md: 최신 상태 (변경 불필요)`

**향후 프로젝트 추가 시:** 위 테이블에 행을 추가하면 같은 패턴으로 확장 가능.

#### 5-B. myWiki 자체 반영

**반영 대상 확인:**
- 새로운 프로젝트 진행/완료 → `projects.md` 업데이트
- 새 기술 사용/학습 → `skills.md` 업데이트
- AI 관련 관찰/판단 → `ai-direction.md` 판단 로그 추가, `ai-landscape.md` 업데이트
- 중요한 경험/성과 → `experience.md` 업데이트
- 목표 달성/변경 → `goals.md` 업데이트
- 새로운 강점 발견 → `strengths.md` 업데이트
- 새로운 갭 발견 → `gaps.md` 업데이트
- 관련 엔티티 변화 → `entities/` 해당 페이지 업데이트

**반영 방법:**
1. 오늘 완료된 작업과 핵심 사항을 확인
2. 위키에 의미 있는 변화가 있을 때만 업데이트 (매일 반드시 할 필요는 없음)
3. 업데이트한 경우 `log.md`에 기록 추가
4. `index.md` 업데이트 (새 페이지 추가 시)
5. 링크 형식: `[[파일명]]` (.md 확장자 제외, 경로 제외)

**반영 기준 (하나라도 해당하면 업데이트):**
- 새 프로젝트 시작 또는 중요 마일스톤 달성
- 새 기술 도입 또는 기술 수준 변화
- AI 방향에 영향을 주는 판단/관찰
- 위시캣 지원/수주 결과
- 교육 현장 경험이나 피드백

#### 5-C. Wiki 정원사 사이클 (Lint) — Karpathy LLM Wiki 패턴

위키 반영 직후 자동으로 wiki-lint를 실행하여 위키 건강 상태를 점검한다.

```bash
powershell -ExecutionPolicy Bypass -File "C:\todo\today\myWiki\second-brain\.lint-script.ps1"
```

**점검 결과 처리:**
- 이슈 0건 → 침묵 (보고 생략)
- 🔴 High 이슈(NO_FRONTMATTER, MISSING_*) → 사용자에게 즉시 알림 + 수정 권장
- 🟡 Medium 이슈(STALE, NO_internal_links) → 작업보고서 하단 "위키 점검" 섹션에 요약
- 🟢 Low 이슈(NO_links_field) → 카운트만 표시 (자동 수정 옵션 제안)

**작업보고서 첨부 형식:**
```markdown
## 위키 점검 (자동 lint)
- 총 N개 파일 스캔, M개 이슈
- 🔴 High: X건 [파일명 나열]
- 🟡 Medium: Y건 [요약]
- 🟢 Low: Z건 (frontmatter links 필드 누락)
```

**판단 원칙:**
- 매 work-end마다 자동 실행되므로 결과는 간결하게
- 이슈가 누적되어도 차단하지 않음 (정원사는 권고, 차단 아님)
- 단 High 이슈는 다음 세션의 work-start 시 우선 표시

### 5-D. log.md 분기 아카이브 트리거 체크 (자동)

`myWiki/second-brain/log.md` 사이즈와 분기 경계를 체크하여 아카이브가 필요한지 판단한다.

**트리거 조건 (둘 중 하나):**
1. log.md 사이즈 ≥ **500 KB** (= 512000 bytes)
2. 직전 분기 종료일(3/31, 6/30, 9/30, 12/31) + 7일 경과 + 활성 log.md에 직전 분기 항목 잔존

**체크 명령:**
```bash
powershell -ExecutionPolicy Bypass -File "C:\todo\today\myWiki\second-brain\log-archive\_check-size.ps1"
```

**판단 후 행동:**
- **트리거 미도달** → 침묵 (보고 생략)
- **트리거 도달** → 사용자에게 알림:
  ```
  📦 log.md 분기 아카이브 트리거 도달
  - 사이즈: NNN KB / 500 KB 임계값
  - 권장: log-archive/YYYY-QN.md 분리 작업 진행
  - 절차: CLAUDE.md "log.md 분기 아카이브 정책" 섹션 참조
  ```
- 사용자 결정에 따라 분리 작업 수행 (작업 자체는 자동화하지 않음 — 데이터 안전성 우선)

**분리 작업 가이드 (트리거 시 사용자에게 안내):**
1. log.md에서 분리 대상 분기(Q1=1~3월, Q2=4~6월, Q3=7~9월, Q4=10~12월) 항목 추출
2. `log-archive/YYYY-QN.md` 신규 생성 (프론트매터 포함)
3. log.md에서 해당 항목 제거, `updated:` 갱신, "분리: YYYY-QN → log-archive" 메모 1줄
4. work-end git commit에 함께 포함

### 5-E. 외부 위키 흡수 점검 (2026-05-12 도입 — revitaWiki ↔ myWiki 비대칭 방지)

revitaWiki의 마지막 ingest와 myWiki의 마지막 absorb를 비교해 누락 방지.

```bash
# revitaWiki 마지막 ingest 번호 확인
grep -h "^## .*ingest #" "C:/todo/revitaProject/application/revitaWiki/log.md" 2>/dev/null | head -1

# myWiki 마지막 absorb 항목 확인
grep -h "^## .*absorb" "C:/todo/today/myWiki/second-brain/log.md" 2>/dev/null | head -1
```

**판단 후 행동:**
- **같은 ingest 번호 또는 myWiki absorb가 더 최신** → 침묵 (정상 흡수 상태)
- **revitaWiki ingest #N > myWiki absorb #N** → 미흡수 발견. 두 가지 선택:
  - **즉시 흡수** (권장 — 이번 work-end 안에) → 5단계 흡수 실행, log.md absorb 박제, done 카드 회신
  - **다음 work-start에 위임** → myWiki/_inbox/pending/ 에 자동 카드 작성

자동 카드 형식 (위임 시):
```yaml
---
id: {YYYY-MM-DD}-{NNN}-ingest-{N}-pending
from: work-end-skill
to: mywiki-claude
type: request
priority: normal
subject: revitaWiki ingest #N 미흡수 — 다음 세션 처리 필요
created: {timestamp}
status: pending
---

revitaWiki ingest #N 흡수 누락. 다음 work-start의 1-C 단계에서 처리 권장.
참조: revitaProject/application/revitaWiki/log.md
```

### 5-F. multi-agent 인계 카드 작성 (2026-05-12 도입)

이번 세션에서 다른 Claude(revita-claude 등)가 알아야 할 변경 있는지 점검 후 카드 작성.

**점검 항목:**
1. **myWiki에서 revita 관련 entity·skill·thought 신규/갱신** → revita-claude 알림 가치 있나?
2. **다음 작업이 다른 Claude 영역**으로 넘어가는 경우 (예: revita 측에서 처리해야 할 follow-up)
3. **사용자 broker 없이 진행될 합의 사항** 발생 (정책 변경·시스템 변경 등)

**판단 후 행동:**
- **알림 가치 없음** → 카드 작성 생략
- **알림 가치 있음** → `revitaProject/_inbox/pending/` 에 카드 작성:

```yaml
---
id: {YYYY-MM-DD}-{NNN}-{slug}
from: mywiki-claude
to: revita-claude
type: done                  # 또는 request (응답 필요 시)
priority: normal
subject: {제목}
created: {ISO 시각}
related: [관련 카드 id 또는 파일]
status: pending
---

# {subject}

## 변경 내용
{이번 세션에서 한 일 — 다른 Claude가 알아야 할 것만}

## 영향
{다른 Claude의 작업에 영향 있나? 있으면 명시}

## 후속 액션 (있다면)
{다른 Claude가 해야 할 일 — 있으면 type: request)
```

**참조**: `myWiki/_inbox/PROTOCOL.md` (표준 형식), `myWiki/_inbox/SYSTEM_GUIDE.md` (전체 가이드)

### 5-G. 시스템 인지 자산 보호 (2026-05-12 도입)

다음 work-start가 시스템을 잊지 않도록 보호:

```bash
# 핵심 자산 존재 확인
ls "C:/todo/today/myWiki/_inbox/PROTOCOL.md" 2>/dev/null
ls "C:/todo/today/myWiki/_inbox/SYSTEM_GUIDE.md" 2>/dev/null
ls "C:/todo/today/myWiki/.claude/hooks/check-inbox.py" 2>/dev/null
```

**판단:**
- 모두 존재 → 침묵
- 하나라도 누락 → 경고 + 복구 가이드:
  ```
  ⚠ multi-agent 통신 시스템 자산 누락
    - 누락: {파일명}
  → 복구: revitaProject/_inbox/PROTOCOL.md 사본 + SELF_ID="mywiki-claude" hook 재작성
  ```

### 6. Notion "오늘 할 일" 완료 항목 정리

Notion "오늘 할 일" 페이지(ID: `349cb620-8c2b-817d-a7fe-c887ecdee292`)의 완료 섹션에서 **2일 이상 경과한 항목을 자동 삭제**한다.

```bash
python "C:\todo\today\.claude\hooks\notion-cleanup.py"
```

- 완료 섹션의 `[MM/DD] 항목명` 형식에서 날짜를 확인
- 현재 날짜 기준 2일 이상 경과한 항목 삭제
- 삭제 결과를 표시

### 7. Wiki 작업일지 마무리

오늘 날짜의 wiki 작업일지가 있으면 자동으로 마무리한다.

**확인 경로**: `C:\todo\today\myWiki\작업보고서\YYYY-MM-DD\작업일지.md`

파일이 존재하면:
1. 작업일지 하단의 `(이후 작업은 아래에 추가)` 를 삭제
2. 마무리 섹션 추가:

```markdown
---

## 오늘 요약
- **총 작업 수**: N건
- **주요 성과**: {핵심 작업 요약}
- **미완료/이어할 작업**: {있으면 기록}
```

파일이 없으면:
- wiki 작업이 없었으므로 스킵

### 7. git 커밋 및 푸시

```bash
# 1) 상태 확인
git status

# 2) untracked 새 파일/폴더 감지 (push 누락 방지)
git ls-files --others --exclude-standard --directory
```

**중요: untracked 파일/폴더가 있으면 반드시 사용자에게 목록을 보여주고, git add 대상에 포함할지 확인한다.**
새로 생성된 폴더/파일은 add하지 않으면 push되지 않아 다른 PC에서 받을 수 없다.

```bash
# 3) 변경 내용 확인
git diff --stat

# 4) 사용자 확인 후 커밋 (untracked 포함)
git add <변경 파일> <새 파일/폴더>
git commit -m "작업: {주요 작업 요약}"
git push
```

**주의**: 반드시 사용자 확인 후 커밋 진행. .env, credentials 등 민감 파일은 제외.

### 7. 완료 안내

사용자에게 안내:
- 세션 저장 완료 (파일 경로)
- 작업보고서 업데이트 완료
- 세컨드 브레인 반영 여부 (반영했으면 변경 내용 요약)
- git 커밋/푸시 완료
- 오래된 세션 파일 정리 완료
- 오늘 완료율 표시
- 다음 세션에서 `/work-start`로 이어서 진행 가능

## 트리거 키워드

- "작업 종료"
- "작업 끝"
- "세션 저장해줘"
- "오늘 작업 마무리"
- "work end"

## 참고

- 커밋 메시지 형식: "작업: {주요 작업 요약}"
- git 커밋 전 반드시 사용자 확인 필요
