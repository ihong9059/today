---
name: myWiki 세컨드브레인 반영 필수
description: 작업 중/종료 시 myWiki second-brain에 반드시 반영해야 함. work-end 스킬에 절차 있음
type: feedback
originSessionId: e8c42ebb-f042-45a1-8d7d-0853a8ecdfaa
---
작업 중 또는 /work-end 시 myWiki(second-brain) 위키에 반드시 반영한다.

**Why:** 2026-05-03에 교육자료 8종을 제작했으나 myWiki 반영을 누락하여 사용자에게 지적받음. work-end 스킬에 절차가 있었으나 실행하지 않음.

**How to apply:**
- /work-end 호출 시: skill에 명시된 "5. 세컨드 브레인 위키 반영" 절차를 반드시 실행
- /work-start 호출 시: log.md 마지막 날짜를 확인하여 미반영 경고 표시
- 작업 중에도 의미 있는 산출물이 나오면 즉시 log.md + 관련 엔티티 업데이트
- 스키마: myWiki/second-brain/CLAUDE.md 참조

**Scope 예외 (2026-05-08 추가):** vault 안에서 단독 작업 중 (/vault-end만 호출되는 경우)에는 myWiki 자동 반영 금지. vault 외 자산 동기화는 /work-end 호출 시점에만. 자세히는 `feedback_vault_scope_isolation.md`.
