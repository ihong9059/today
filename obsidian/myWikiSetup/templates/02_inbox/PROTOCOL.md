# `_inbox/` — Multi-Agent Claude 통신 프로토콜

{{SELF_CLAUDE_ID}} ↔ {{PEER_CLAUDE_ID}} (향후 다른 Claude도) 간 **비동기 메시지 통로**. 사용자가 broker 역할을 하지 않아도 두 Claude가 자동 협업하기 위한 표준.

**합의 일자**: {{TODAY}}

## 구조

```
{{WIKI_PATH}}/_inbox/
├── pending/          ← 수신측이 처리해야 할 카드
├── processed/        ← 처리 완료 (보존)
└── PROTOCOL.md       ← 본 파일 (양쪽 사본 유지)
```

같은 구조가 `{{PEER_PATH}}/_inbox/` 에도 존재. **카드는 수신측 inbox에 작성**한다. 예: {{SELF_CLAUDE_ID}}가 {{PEER_CLAUDE_ID}}에게 보낼 카드 → `{{PEER_PATH}}/_inbox/pending/...` 에 작성.

## 표준 카드 형식

파일명: `{YYYY-MM-DD}-{NNN}-{slug}.md`
예: `2026-05-12-001-ingest-absorb.md`

```markdown
---
id: 2026-05-12-001
from: {{SELF_CLAUDE_ID}}           # 또는 {{PEER_CLAUDE_ID}} / 기타
to: {{PEER_CLAUDE_ID}}
type: request                     # request | acknowledge | done | escalate
priority: normal                  # low | normal | high | urgent
subject: 한 줄 제목
created: 2026-05-12T07:30
expires: 2026-05-19               # 옵션 — 미처리 시 reminder
related:                          # 옵션 — 관련 파일/카드 ID
  - 관련 파일 경로
  - 2026-05-12-000-some-card.md
status: pending                   # pending | in_progress | done | rejected
---

# {subject}

## 컨텍스트
(왜 이 요청인지)

## 요청 / 정보
(상대가 할 일 또는 알아야 할 사실)

## 처리 후 응답 형식
(있다면) ACK 카드 형식 명시
```

## type별 의미

| type | 의미 | 응답 의무 |
|---|---|---|
| `request` | 처리 요청 | ✅ `acknowledge` 또는 `done` 카드로 응답 |
| `acknowledge` | 받음 + 처리 시작 | 처리 완료 시 `done` |
| `done` | 처리 완료 통보 | 응답 불요 (또는 `done` 받음 카드) |
| `escalate` | 한쪽이 처리 못 함 — 사용자 또는 다른 Claude로 위임 | 사용자가 broker |

## priority

| priority | 시점 |
|---|---|
| `low` | 시간 날 때 |
| `normal` | 다음 SessionStart |
| `high` | 즉시 처리 권장 |
| `urgent` | 사용자에게 escalation 고려 |

## 라이프사이클

```
1. 발신측 Claude → 수신측 _inbox/pending/ 에 카드 작성
2. 수신측 SessionStart hook → pending/ 확인 → 미처리 카드 컨텍스트 주입
3. 수신측 Claude 처리:
   - request 받음 → acknowledge 카드 즉시 발신 (옵션)
   - 처리 완료 → done 카드 발신측 inbox에 발신
   - 처리 못함 → escalate 카드 (사용자 broker)
4. 처리 완료 카드 → 수신측 processed/ 로 이동
5. log 기록: 양측 log.md에 한 줄
```

## 처리 명확화

- **`pending/` 에 있으면 미처리** — 수신측 Claude의 책임
- **`processed/` 에 있으면 처리 완료** — 보존 (감사/추적용)
- **삭제 금지** — 카드는 lifecycle 박제. 1년 후 archive 정책 가능

## SessionStart hook 동작

`.claude/hooks/check-inbox.py` (각 Claude 측):
1. `_inbox/pending/*.md` 파일 확인
2. 카드 frontmatter `to:` 가 자기인 카드만 카운트 (보호 — 잘못된 카드 방지)
3. 미처리 카드 있으면 `additionalContext` 로 주입

## escalation 정책

수신측 Claude가 처리 못 하는 경우:
- 카드의 `type` 을 `escalate` 로 변경
- `escalation_reason` 필드 추가 (frontmatter)
- 발신측 inbox로 회신 카드 (또는 그대로 pending/ 유지)
- 사용자가 본문 확인 후 broker 결정

## 확장 — 새 Claude 추가

새 Claude(예: `another-claude`) 가입 시:
- 해당 프로젝트에 `_inbox/{pending,processed}/` + `PROTOCOL.md` 사본
- `.claude/hooks/check-inbox.py` 추가 (SELF_ID 변경)
- 카드 frontmatter `to:` 에 새 식별자 등재
- 본 §"합의 이력"에 추가

## 합의 이력

- **{{TODAY}}**: {{SELF_CLAUDE_ID}} + {{PEER_CLAUDE_ID}} 시스템 셋업 합의 (옵션 A 단순 메일박스, 각 프로젝트 내부 `_inbox/` 위치, 표준 카드 frontmatter)

## 참고

- 본 위키 흡수 정책: `{{WIKI_PATH}}/CLAUDE.md § "외부 위키 흡수 (Absorption)"`
- 새 Claude 빠른 진입: `_inbox/SYSTEM_GUIDE.md`
