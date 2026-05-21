---
name: uttecHome cascading 차단 사건 — _inbox 필수 + 양방향 흡수 정책
description: 5/19 uttecHome 분리 후 _inbox 미도입으로 5/15 이후 5일치 신기술·영업 자료 cascading 0건 사건. 다른 vault → uttecHome 방향 능동 흡수 필요
type: feedback
originSessionId: c8e21a73-5f24-4c8e-a3f1-d8e57f9b2c44
---

# uttecHome cascading 차단 사건 (5/21 박제)

**규칙**: vault 분리 시 `_inbox/` + check-inbox.py + 양방향 흡수 정책을 동시 도입한다. 송신만 정의된 CLAUDE.md는 cascading 비대칭을 만들어 신기술·영업 자료가 회사 홈페이지에 반영되지 않는다.

**Why**: 5/19 uttecHome 분리 시 CLAUDE.md § 흡수 정책에 "mywiki-claude 로 카드 발송 트리거" 4항목만 정의 (send-only). Phase D "_inbox/ 도입 검토"가 "검토 상태"로 멈춤. 5/15~5/20 동안 onDevice (Round 11/12/17/17.5 + ESP-DSP 24.8× 양산 방향 재전환) + wishket (정부 R&D 1억 자료 + 1.7억 통합지원서) + lemonlabs (6/12 폴더 v1) 모두 uttecHome에 0% 반영. ai-fanstick.md 본문이 5/8 폐기된 양산 방향을 그대로 들고있는 정합성 모순 발생.

**How to apply**:
- 새 vault 분리 시: `_inbox/{pending,processed,outbox-staging}/` + `PROTOCOL.md` (사본) + `.claude/hooks/check-inbox.py` (SELF_ID 변경) + `.claude/settings.local.json` SessionStart hook 동시 도입 (Phase A·B와 같은 단계로 묶기)
- CLAUDE.md 흡수 정책은 **양방향 (송신 + 수신) 모두 정의**. send-only는 cascading 비대칭의 구조적 원인.
- "다른 vault는 myWiki에 영향 주는 작업 안 함"이 원칙 → **이 vault에서 능동적으로 끌어오지 않으면 개선 0**. Claude work-end 시 송신 트리거뿐 아니라 수신 카드 처리도 책임.
- 5/21 박제 시점: 8 Claude 시스템 (uttechome-claude 합류). PROTOCOL.md 8 vault 사본 정합성 유지.
- 영업 트랙 vault (uttecHome) 첫 사례 — 다른 영업 트랙 추가 시 동일 패턴 적용.
