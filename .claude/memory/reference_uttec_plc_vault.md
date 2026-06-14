---
name: reference_uttec_plc_vault
description: "동아정밀(동아정밀공업·PET 두께측정기·위시캣 #155220) 진행 본부 = uttec-plc vault (18th, uttecMac `ssh mac` ~/uttec-plc/). 로컬엔 영업 원본만, 진행 박제는 원격"
metadata:
  node_type: memory
  type: reference
---

**동아정밀 = uttec-plc vault (18th multi-agent)에서 진행.** 별도 "동아정밀" 전용 vault는 없음.

- **위치**: uttecMac (Mac→Ubuntu 22.04), Tailscale 100.90.158.36, **`ssh mac`** → `~/uttec-plc/`. SELF_ID=`uttec-plc-claude`. GitHub `ihong9059/uttec-plc` (private).
- **무엇**: UTTEC PLC/SCADA 산업 자동화 트랙 vault. 1차 프로젝트 = **동아정밀공업 #155220** (PET 두께 측정기 2호기, v3 EtherCAT 32,562,211원). 상태 = **final 5건 송부 완료 → 수주 회신 대기**. 장기 목적 = PLC 개발 전문회사 기틀.
- **로컬(이 PC)엔 영업 원본만**: `wishketProject/위시캣/2026-05-14_프로젝트155220_미팅준비/`, `동영상제작/동아정밀/`. 실제 PLC 설계·진행·시스템 자산은 **전부 원격 vault**.

**Why**: 분산 호스트(uttecMac) + "vault는 메모리에 열거 금지" 정책 → 로컬 검색에 안 잡혀 "동아정밀" 조회 시 vault 미노출 마찰 발생 (2026-06-15 사용자 지적). lora·factory처럼 **원격 vault는 메모리 포인터 1개**로 형평성 맞춤. **How to apply**: "동아정밀/PLC/#155220" 언급 시 즉시 본 vault 연상 → `ssh mac` 접근 또는 vault 자체 `/vault-start`. 전체 vault 목록 단일 출처는 [[project_3vault_분리]] vault-registry (열거 중복 금지). 관련: [[feedback_ncs_build_cmd_autorun_conflict]] 무관, PLC 함정은 myWiki gaps.md(XGT prefix).
