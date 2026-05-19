---
name: uttecHome DigitalOcean 이관 — 당분간 보류 (2026-05-20)
description: uttecHome vault의 DO 7777 재배포는 당분간 진행하지 않음. local에서 정리 완료 후 적용. 그때까지 vault 로컬 진화만 진행
type: project
originSessionId: 6ac6c8c6-711e-42bf-80b8-0990a4c8bea3
---
# uttecHome DigitalOcean 7777 재배포 — 당분간 보류

**결정일**: 2026-05-20
**사용자 결정**: "당분간 DigitalOcean으로 이관은 하지 않습니다. 이곳에서 정리되면 적용합니다."

## 결정 내용

- uttecHome vault(C:\todo\uttecHome) → DigitalOcean droplet(178.128.90.37 / Tailscale 100.94.160.121)으로의 재배포는 당분간 진행하지 않음.
- local에서 vault 정리·갱신이 완료된 시점에 한 번에 deploy.

## Why

사용자가 vault 분리(5/19) 직후 갭 7건 web 갱신을 마쳤지만, 추가 정리·갱신이 더 필요하다고 판단. 정리 도중 deploy가 반복되면 부담이 크고, 마지막에 한 번 적용하는 게 효율적.

## How to apply

- **work-start 시 우선순위 권고에서 제외** — "DigitalOcean 이관" 자동 권고 금지
- 작업보고서 #2 같은 항목은 `⏸️` (보류) 상태로 표시. 우선순위 색 🔴 → 🟢로 강등.
- uttecHome vault 작업은 계속 진행 가능 (Phase D·E·F 등). 단 **local commit + push만**, deploy는 보류.
- 사용자가 명시적으로 "이제 배포하자", "DigitalOcean 적용", "deploy" 등을 트리거할 때만 본 항목 활성화.

## 본 결정의 해제 조건

다음 중 하나:
1. 사용자가 명시적으로 "이제 적용해" / "deploy" / "DigitalOcean 올려" 등 트리거
2. uttecHome vault에 큰 정리·갱신이 모두 완료된 후 사용자가 "정리 끝났다" 인지

## 관련 메모

- [4-vault 분리 운영](project_3vault_분리.md) — uttecHome Tier 3 vault
- [vault scope 격리](feedback_vault_scope_isolation.md) — uttecHome 작업은 uttecHome cwd에서
