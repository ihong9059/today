---
title: lora — UTTEC LoRa 기술 전문 hub vault
type: entity
created: 2026-06-13
updated: 2026-06-13
tags: [vault, lora, 무선통신, E22, E32, 기술hub, multi-agent, 사업근거]
links: [vault-registry, revita, shield, factory, 한림용인cc-고가수조, ai-direction]
---

# lora — UTTEC LoRa 기술 전문 hub

## 한 줄 정의

**여러 vault·현장에 분산된 LoRa 기술 지식을 횡단 집약·심화 검토하고, 결론을 사업방향 기술 근거로 cascade하는 vault** (19th multi-agent, 2026-06-13 신설).

## 신설 동기

한림용인CC 고가수조에서 LoRa가 양산 적용 중이나, LoRa 기술 지식(E22/E32 설정·air rate·결선·time-mux·망 구성·SOP)이 한림·shield·revita·factory 등 여러 vault에 분산되어 **단일 출처가 없었다**. 본 vault가 그 기술 backup·심화 검토의 단일 출처. 사용자 명시 결단: "한림 LoRa 전문 검토·기술 backup + myWiki 사업방향 참고 + work-start/work-end skill 적용".

## 메타

| 항목 | 값 |
|---|---|
| 위치 | `C:\todo\lora\` (Windows 본 PC) |
| Claude 식별자 | `lora-claude` |
| 합류 | 2026-06-13 (19th) |
| repo | private (ihong remote), origin 없음 |
| broker | 양방향✅ (`_inbox/outbox-staging/` → `sent-archived/`) |
| Obsidian | A군 (사람-사유) — 6/13 보관함 등록 |
| Tier | 기술 근거 단일 출처 트랙 (첫 사례 — 기존은 모두 제품·사업·응용 트랙) |

## scope

- ✅ **책임**: LoRa 기술 그 자체 — 모듈 설정·RF 설계·결선/IO·펌웨어 패턴·망 구성·SOP·사례 기술 분석
- ❌ **비책임**: 현장 hardware 작업(flash·결선·hardware test) = 각 응용 vault(한림·shield·revita·factory) 책임. 본 vault는 기술 검토·SOP·근거만 박제

## 통신 상대

| 상대 | 방향 | 내용 |
|---|---|---|
| `mywiki-claude` | 양방향 | 기술 검토 결론 → 사업방향 cascade / myWiki 결정·gotcha 흡수 |
| `shield-claude` | 수신 위주 | E32-433 + RS485/MESH 응용 → 기술 근거 추출 |
| `revita-claude` | 수신 위주 | REVITA LoRa 양산 경험 → 기술 근거 추출 |
| `factory-claude` | 양방향 | 공장 자동화 LoRa 적용 ↔ 기술 근거 |

## 기술 근거 단일 출처 후보 (메모리 박제 → vault 심화)

- E22 두 모드별 baud (Config 9600 / Normal REG0 default 0xE0=115200)
- E22 전원전압·IO 레벨 (22D=3.3V 고정 / 30D=5V, IO=VCC 직결 위험). 전원전압 ≠ 거리 변수
- nRF52 UARTE PSEL time-mux + TASKS_STARTRX 필수
- nRF DK 14-pin SWD → 외부 nRF52832 target
- UTTEC BLE Module J28 14pin 핀맵
- 한림용인CC LoRa TX flash SOP (lora_test_tx → lora_tx_water_level)

## 사업 함의 (ai-direction 참고)

LoRa 기술 역량의 단일 출처 확보 = UTTEC가 **공장 자동화·원격 모니터링 사업**에서 "검증된 LoRa 통신 스택" 보유 회사로 포지셔닝 가능. 한림용인CC 양산 검증 + shield/revita 누적 경험을 기술 근거로 자산화하여 신규 수주 narrative에 활용.

## 관련 페이지

- [[vault-registry]] — 19번째 행
- [[한림용인cc-고가수조]] — LoRa 양산 적용 현장 (Tier 2 sub-vault)
- [[revita]] · [[shield]] · [[factory]] — LoRa 응용 책임 vault
