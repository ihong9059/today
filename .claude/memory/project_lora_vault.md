---
name: project_lora_vault
description: "lora vault (19th, C:\\todo\\lora) — UTTEC LoRa 기술 전문 hub, SELF_ID=lora-claude, 현장 hardware 작업은 scope 밖"
metadata: 
  node_type: memory
  type: project
  originSessionId: 46f84601-393b-4a2b-9e67-727e953be26e
---

**lora vault = UTTEC LoRa 기술 전문 hub** (2026-06-13 신설, 19th multi-agent, `C:\todo\lora\`, SELF_ID=`lora-claude`, 별도 private git repo).

- **목적**: 한림용인CC·shield·revita·factory에 분산된 LoRa 기술 지식(E22/E32 설정·air rate·결선·time-mux·망 구성·SOP)을 횡단 집약·심화 검토 → myWiki 사업방향 기술 근거 cascade.
- **scope 격리 🚨**: LoRa **기술 그 자체**만 책임. **현장 hardware 작업(flash·결선·hardware test)은 scope 밖** — 응용은 한림·shield·revita·factory가 유지, 본 vault는 기술 검토·SOP·근거만 박제.
- **트랙 정체**: "기술 근거 단일 출처 트랙" 첫 사례 (기존 vault는 모두 제품·사업·응용 트랙).
- vault 전용 `/work-start`·`/work-end` = `.claude/commands/`에 있음 (onDevice 패턴). 양방향 broker(`outbox-staging/`→`sent-archived/`) 등록 완료. 단일 출처는 [[multi-vault_분리]] vault-registry (19번째 행).

**Why**: 사용자 명시 결단 — 한림 LoRa 양산 중이나 기술 backup·단일 출처 부재. **How to apply**: LoRa 기술 작업은 lora vault에서. 현장 작업 요청이 오면 해당 응용 vault로 안내(scope 밖). 관련: [[feedback_e22_900t_config_baud]] [[reference_e22_power_voltage_io]] [[feedback_nrf_uarte_psel_time_mux]] [[reference_hanlim_lora_tx_flash_sop]].
