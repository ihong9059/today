---
name: feedback_hwtest_flash_existing_hex
description: hardware test 시 기존 검증 hex 그대로 flash — 재빌드·소스변경 금지
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ba7dc0dd-4cba-448a-a400-efd3e4d119d7
---

🚨 **사용자가 "hardware test"라고 명시하고 검증된 펌웨어(예: D-day 통과 hex)가 있으면 → 기존 hex 그대로 flash. 재빌드·소스변경 금지.**

**Why:** 2026-06-13 한림용인CC 수조 TX hardware test 중, 둘째 보드를 "고가수조2 = 노드 ID=2"라 판단해 `TX_NODE_ID` 소스 변경 + west 재빌드(build_node2)를 시도 → 사용자 강한 지적("hardware test한다고 했는데 왜 새로 build하냐, 전에 했던 것 그냥 flash하면 되는데"). hardware test의 목적은 보드·E22·결선 동작 확인이지 펌웨어 변형이 아님. 노드 ID 구분은 실제 설치 단계 관심사 (사용자가 명시할 때만).

**How to apply:**
- hardware test 요청 = 보존된 검증 hex(`build/.../zephyr.hex`)를 `nrfjprog --program ... --verify --reset`로 flash. 그게 전부.
- 노드 ID·채널 등 빌드타임 차이가 "보일" 때도, 사용자가 "구분 필요"를 명시하기 전엔 짐작해서 재빌드하지 말 것. 같은 hex로 링크 동작 확인은 무방.
- 재빌드가 정말 필요하면 먼저 한 줄로 "재빌드 필요한데 진행할까요?" 확인. [[feedback_reuse_existing_code]] · [[feedback_dont_assume_ask_when_unclear]] 연장선.
- nrfjprog flash 절차: APPROTECT면 `--recover` 먼저 / flash 후 외부 동작 없으면 POWER reset 우선 ([[feedback_uttec_ble_module_power_reset]]).
