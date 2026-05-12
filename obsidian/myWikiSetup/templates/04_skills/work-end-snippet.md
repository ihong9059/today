# work-end SKILL.md § 5-E / 5-F / 5-G 통합 snippet

> 본 snippet을 기존 `work-end/SKILL.md`의 "단계 6" 또는 "git commit" 직전에 삽입.
> 셋업 시 `{{WIKI_PATH}}`, `{{PEER_PATH}}`, `{{PEER_WIKI_LOG_PATH}}`만 본인 경로로 치환.

---

### 5-E. 외부 위키 흡수 점검 (비대칭 방지)

다른 위키(예: 기술 위키)의 마지막 ingest와 본 위키의 마지막 absorb를 비교해 누락 방지.

```bash
# 다른 위키 마지막 ingest 번호
grep -h "^## .*ingest #" "{{PEER_WIKI_LOG_PATH}}" 2>/dev/null | head -1

# 본 위키 마지막 absorb 항목
grep -h "^## .*absorb" "{{WIKI_PATH}}/log.md" 2>/dev/null | head -1
```

**판단 후 행동:**
- **같은 ingest 번호 또는 absorb가 더 최신** → 침묵 (정상 흡수 상태)
- **외부 ingest #N > 본 위키 absorb #N** → 미흡수 발견. 두 가지 선택:
  - **즉시 흡수** (권장 — 이번 work-end 안에) → 5단계 흡수 실행, log.md absorb 박제, done 카드 회신
  - **다음 work-start에 위임** → `{{WIKI_PATH}}/_inbox/pending/` 에 자동 카드 작성

자동 카드 형식 (위임 시):
```yaml
---
id: {YYYY-MM-DD}-{NNN}-ingest-{N}-pending
from: work-end-skill
to: {{SELF_CLAUDE_ID}}
type: request
priority: normal
subject: 외부 위키 ingest #N 미흡수 — 다음 세션 처리 필요
created: {timestamp}
status: pending
---

외부 위키 ingest #N 흡수 누락. 다음 work-start의 1-C 단계에서 처리 권장.
참조: {{PEER_WIKI_LOG_PATH}}
```

### 5-F. multi-agent 인계 카드 작성

이번 세션에서 다른 Claude(또는 다른 위키 운영자)가 알아야 할 변경 있는지 점검 후 카드 작성.

**점검 항목:**
1. 본 위키에서 외부 위키 관련 entity·skill·thought 신규/갱신 — 외부 Claude 알림 가치 있나?
2. 다음 작업이 다른 Claude 영역으로 넘어가는 경우
3. 사용자 broker 없이 진행될 합의 사항 발생 (정책 변경·시스템 변경 등)

**판단 후 행동:**
- **알림 가치 없음** → 카드 작성 생략
- **알림 가치 있음** → `{{PEER_PATH}}/_inbox/pending/` 에 카드 작성:

```yaml
---
id: {YYYY-MM-DD}-{NNN}-{slug}
from: {{SELF_CLAUDE_ID}}
to: {{PEER_CLAUDE_ID}}
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

**참조**: `{{WIKI_PATH}}/_inbox/PROTOCOL.md` (표준 형식), `{{WIKI_PATH}}/_inbox/SYSTEM_GUIDE.md` (전체 가이드)

### 5-G. 시스템 인지 자산 보호

다음 work-start가 시스템을 잊지 않도록 보호:

```bash
# 핵심 자산 존재 확인
ls "{{WIKI_PATH}}/_inbox/PROTOCOL.md" 2>/dev/null
ls "{{WIKI_PATH}}/_inbox/SYSTEM_GUIDE.md" 2>/dev/null
ls "{{WIKI_PATH}}/.claude/hooks/check-inbox.py" 2>/dev/null
```

**판단:**
- 모두 존재 → 침묵
- 하나라도 누락 → 경고 + 복구 가이드:
  ```
  ⚠ multi-agent 통신 시스템 자산 누락
    - 누락: {파일명}
  → 복구: 다른 프로젝트의 _inbox/PROTOCOL.md 사본 + SELF_ID 변경한 hook 재작성
  → 또는: obsidian/myWikiSetup/templates/ 에서 다시 복사
  ```
