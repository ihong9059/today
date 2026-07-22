---
name: feedback_cross_vault_status_awareness
description: myWiki(today)는 sibling vault의 운영 디테일은 몰라도 되나 상태·결정·횡단 이슈는 인지 필수. check-vault-status.py hook이 자동 감지
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 445e4ef6-ec86-4a51-8dc8-b44050ea62c6
---

myWiki(=today, main vault)는 sibling vault(academy·lora·factory 등)의 **운영 디테일은 몰라도 되지만, 사업 레벨 상태 마일스톤·결정·횡단 이슈는 반드시 인지**해야 한다.

**경계**:
- ❌ 몰라도 됨: 회차별 강의안, 명단, kit BOM 등 운영 원본 (각 vault 단일 출처, mirror 금지)
- ✅ 알아야 함: "3차 개강(7/15)" 같은 상태, 사업방향 결정, 횡단 하드웨어 이슈(예: 강사기 Pi3 vs Pi4 세대 상충 → factory/lora 기술 진실 필요)

**Why**: vault는 별도 git repo(`C:/todo/{vault}`)라 today 스코프 검색에 안 잡힌다. 연결은 `_inbox` 카드(broker) **비동기**뿐이라, 발신측이 카드를 안 보내면 myWiki가 stale된다. 2026-07-23 uttec-academy 3차 개강(7/15)이 myWiki entity(6/27)에 cascade 안 된 채 방치된 사건이 계기.

**How to apply**: `check-vault-status.py` hook이 A군 vault `log.md` mtime vs myWiki entity mtime을 비교해 미반영을 자동 surface (SessionStart + work-start 1-E, 읽기전용 = 자동 sync 안 함, [[feedback_vault_scope_isolation]] 준수). 출력 시 카드 흡수 또는 entity cascade 갱신을 사용자 결정 하에 수행하고, 진행 중 교육 차수·횡단 이슈면 오늘 할일 등록([[feedback_cross_vault_to_todo]]). 신규 A군 vault 합류 시 hook의 `VAULT_MAP`에 `{vault_dir: entity_file}` 추가. 전체 vault 목록 단일출처 = [[project_3vault_분리]].
