---
name: reference_uttec_plc_vault
description: "⚠️ STALE 정정(2026-11-12): uttecMac `~/uttec-plc/` 폴더 소멸. mac 개발 호스트 vault는 [[project_uttec_dev_vault]](~/vault)로 승계. 동아정밀 #155220은 영업 이력(로컬 원본만 잔존)"
metadata:
  node_type: memory
  type: reference
---

**⚠️ 2026-11-12 실측 정정**: uttecMac(`ssh mac`=`ssh ubuntu`, 100.90.158.36)의 **`~/uttec-plc/` 폴더는 이제 없음**(삭제/소멸). `~/project/n8nUttec`·`~/uttec/*`도 비어있음. mac 개발 호스트의 현 vault = **[[project_uttec_dev_vault]]**(`~/vault`, uttec-dev-claude). uttec-plc working vault는 retire.

**동아정밀공업 #155220** (PET 두께 측정기 2호기, v3 EtherCAT 32,562,211원, final 5건 송부 완료→수주 회신 대기)은 **영업 이력**으로 유효. 로컬(이 PC)에 원본만 잔존: `wishketProject/위시캣/2026-05-14_프로젝트155220_미팅준비/`, `동영상제작/동아정밀/`. 원격 PLC 설계 자산은 폴더 소멸과 함께 유실 가능 — 재개 시 로컬 원본 기준.

**How to apply**: "동아정밀/PLC/#155220" 언급 시 영업 이력으로 취급. mac 현지 개발작업(펌웨어 등)은 [[project_uttec_dev_vault]]에서 `claude-vault`로 진행. 전체 vault 단일 출처 = [[project_3vault_분리]] vault-registry. 현 mac 실작업은 `~/ncs/idaenc_*`(IDA E&C 조명) 중심 → [[reference_uttec_ubuntu_mac]].
