---
name: 할일 목록 Notion 동기화 — 단방향 정책
description: 할일 생성은 작업보고서가 source of truth, 완료는 Notion이 source of truth. 양쪽이 다른 방향으로 단방향 동기화
type: feedback
originSessionId: b3245c42-bf7b-4dd3-a682-cd49deb90641
---
작업보고서(`작업보고서/YYYY-MM-DD_작업보고서.md`)와 Notion "오늘 할 일" 페이지(`349cb620-8c2b-817d-a7fe-c887ecdee292`)는 **단방향**으로 동기화한다.

**Why:** 양방향 sync는 한쪽에서 의도치 않게 변경된 상태가 다른 쪽으로 전파되어 혼란을 일으킨다 (2026-05-07 사고 — 작업보고서 ✅이 Notion 진행 섹션 항목을 잘못 체크 처리). 사용자는 작업보고서로 할일을 생성(Claude prompt)하고, Notion에서 완료를 체크(모바일/PC 어디서나)하는 워크플로우. 정책을 단방향으로 강제하면 충돌 없음.

**How to apply:**

### 생성 (작업보고서 → Notion 단방향)
- **Source of truth: 작업보고서** — Claude prompt에서 새 할일 생성 시 작업보고서에 추가
- 작업보고서에만 있고 Notion에 없는 항목 → Notion 목표/진행 섹션에 추가
- 🔄 상태인 항목은 Notion 진행 섹션에 추가, ⬜는 목표 섹션에 추가
- Notion에만 있고 작업보고서에 없는 항목 → 작업보고서에 추가 (외부 사용자 입력 케이스)

### 완료 (Notion → 작업보고서 단방향)
- **Source of truth: Notion** — 사용자는 Notion에서 직접 체크 (모바일/PC 어디서나)
- Notion에서 checked된 항목 → 작업보고서 해당 행을 ✅로 변경 + ~~취소선~~
- Notion 체크 → notion-sync.py의 `move_checked_to_complete`가 자동으로 완료 섹션 이동
- **금지**: 작업보고서 ✅ → Notion 체크 (역방향 차단). 작업보고서에서 사용자가 명시 요청하지 않는 한 Claude가 ✅ 처리하지 않는다.

### 중복 제거
- 같은 항목이 Notion 완료 + 목표/진행 양쪽에 있으면 → 목표/진행 측 삭제 (완료가 우선)
- 작업보고서 항목이 Notion 완료에 매칭되면 → 작업보고서도 ✅ 동기화

### Claude의 주도적 행동 금지
- **Claude는 임의로 작업보고서 ⬜→✅ 또는 🔄→✅ 변경 금지** (sync 결과로만 변경)
- 사용자가 "X를 완료로 처리해줘"라고 명시 요청 시에만 작업보고서 ✅ 가능
- 그 경우에도 Notion 측을 먼저 체크하면 sync가 자연스럽게 작업보고서로 ✅ 반영
