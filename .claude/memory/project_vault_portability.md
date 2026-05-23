---
name: vault Cross-Platform Portability 트랙 (UTTEC product candidate)
description: today vault 를 Windows 종속에서 cross-platform + cloud 가능 UTTEC product 로 발전시키는 장기 트랙. 2026-05-23 사용자 결정으로 시작.
type: project
originSessionId: 0d2b3f02-7278-4255-8d0e-d58cd291260c
---
# vault Cross-Platform Portability — UTTEC product candidate

**vault 재정의 (2026-05-23 사용자 명시)**: today vault 는 개인 second-brain 이 아니라 **UTTEC 회사 product candidate + 회사 운영 hub**. "다른 시스템에서 동작 확인 → cloud 탑재" 가 product 수준의 검증 경로.

## 현재 종속성 baseline (2026-05-23 자동 audit)
- 경로 hardcoding `C:\todo\today` — 58건 / 12 SKILL
- PowerShell 종속 — 10건 / 5 SKILL + 1 `.ps1` 파일
- NTFS Junction — 7+ 위치 (raw/* + .claude/memory)
- Claude project slug `C--todo-today` — memory 경로 PC별 다름

## Phase (총 10~16일)
- **L1 Mac dry-run**: Phase 0~4 (~7일)
- **L2 CI matrix green**: Phase 5~6 (~11일 누적)
- **L3 Cloud 탑재**: Phase 7 (~16일 누적)

## 결정 대기 (D1~D6)
- D1 작업 슬롯: 권장 — #18·#21·#24 후순
- D2 Mac 실체: 권장 — ssh ubuntu (Linux) 활용
- D3 Cloud target: 권장 — DigitalOcean (기존 인프라 정합)
- D4 정책: 권장 — Windows single-source 유지
- D5 자산화: 권장 — UTTEC 사내 전용 우선
- D6 위임: 권장 — search-claude 일부 위임 (web UI)

## How to apply
- vault 관련 모든 개발 / 셋업 / 리팩토링 작업 시 portability 영향 점검 필수
- 신규 hook / skill 작성 시 hardcoded 경로 금지, `${VAULT_ROOT}` 패턴
- PowerShell `.ps1` 신규 생성 금지 — Python 으로 작성
- Junction 사용 시 OS detect 분기 또는 `bin/link_manager` 사용 (Phase 3 완료 후)

## 참조
- 계획서: `작업보고서/계획서_vault-cross-platform-이관_2026-05-23.md`
- entity: `myWiki/second-brain/entities/vault-portability.md`
- 관련 메모리: `project_dual_pc.md`, `reference_uttec_ubuntu_mac.md`, `project_3vault_분리.md`
