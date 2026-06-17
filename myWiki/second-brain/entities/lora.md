---
title: lora — UTTEC LoRa 기술 전문 hub vault
type: entity
created: 2026-06-13
updated: 2026-06-17 (_inbox 흡수 megasession — lora-claude 카드 4장: 4종 모듈 검증+SPI 전환 경로(06-14) / 골프장 수조 제어망 프로토콜+8B frame 송수신 실증+배터리 모니터링(06-16) / CubeCell 스니퍼 done ack(06-15) / 합류 19th myWiki측 5단계 완결(06-13))
tags: [vault, lora, 무선통신, E22, E32, 기술hub, multi-agent, 사업근거, 4종모듈검증, SPI전환, 수조제어망, 8B-frame, 배터리모니터링, SX126x, SX127x, 자율제어망]
links: [vault-registry, revita, shield, factory, 한림용인cc-고가수조, ai-direction, gaps, skills, strengths]
---

> **2026-06-17 _inbox 흡수 — lora-claude 카드 4장 megasession** ⭐⭐⭐ (06-13 합류 + 06-14 4종 모듈 + 06-16 수조 제어망 + 06-15 cubecell done):
>
> **(카드 06-14, 4종 모듈 통신 검증 + SPI 전환 경로)** ⭐⭐ — LoRa 모듈 **4종 TX/RX 통신 전부 확보**: E22-400T30D(433.125MHz)·E22-900T22D(922, 한림 양산)·E32-915T30D(923)·E32-433T20D(433). 2개 칩 패밀리(SX126x·SX127x) × 2개 대역 전부 구동. 칩별 config 프로토콜 단일 출처(E22 REG0~3 9바이트 / E32 SPED·CHAN·OPTION 6바이트) + nRF52832+Ebyte UART time-mux 통합 패턴(함정 5종 해결). **⭐ 전략 함의**: Ebyte E22↔E32 **교차통신 불가**(주파수 그리드 어긋남 x.125 vs x.000 + air rate 매핑 차) → 현 한림 양산(E22)은 **단일 칩 패밀리 폐쇄망**으로만 확장 가능, E32 혼용 불가. 이종 모듈 혼용·정밀 RF·게이트웨이 통합 필요 시 → **SPI 모듈(E22-M/E19) + Zephyr lora 드라이버** 전환이 정석 → **SPI 전환 PoC = 차기 기술 로드맵 후보** ([[ai-direction]] § 결정 51).
>
> **(카드 06-16, 골프장 수조 제어망 프로토콜 + 송수신 실증)** ⭐⭐⭐ — 수조 control·monitoring 제어망 **프로토콜 설계 완성 + 실보드 송수신 실증 + 배터리 모니터링** 확보. ① 단일채널·1바이트 주소(master=00·중계=01·센서/동작=10/11~50/51·broadcast=0xFF)·**고정 8바이트 frame**(STX·SRC·DST·TYPE·DATA1·DATA2·DATA3=SEQ·CRC8)·3종 category·일일 sync TDMA → `망구성/한림_수조_LoRa_프로토콜.md`. ② TX(PCA10056, 배터리 ADC→frame→E22)↔RX(PCA10100, 수신·CRC검증·display) SEQ 일치·CRC OK **무손실 확인 = 양산 제어망 PoC 검증 1호**. ③ nRF52832 SAADC 절대측정 Li-ion 4.2V. **⭐ 전략 함의**: 단일채널+1바이트 주소+일일 sync TDMA = **게이트웨이 의존 최소화한 자율 제어망**(센서가 pump를 그룹 폐루프 직접 제어, master=monitoring만). 한림 외 SI 시공·공장 자동화 재사용 토폴로지 + 무인 노드 배터리 모니터링 + 솔라 전원체인([[2026-06-15_솔라전원-LoRa노드-전원체인-Nordic-LongRange]]) = **원격 무인 노드 사업** 기술 근거 ([[ai-direction]] § 결정 52). 신규 함정 4건 → [[gaps]] § 2026-06-17.
>
> **(카드 06-15 done, CubeCell 스니퍼 흡수 완료 ack)** — myWiki가 저장한 `하드웨어/HTCC-AB01/sniffer/` 산출물(스니퍼·SOP·실수신 13패킷)을 lora hub가 `검토/10`에 정식 박제. **SX126x raw 교차통신 실보드 실증 첫 사례**(RAK4631↔CubeCell 둘 다 SX1262, 922MHz/SF7/125k/private 18초 13패킷 RSSI -17dBm/SNR 12dB). **CubeCell/스니퍼 기술 검토는 lora hub가 단일 출처로 인수** — myWiki는 후속 회신 불요(done).
>
> **(카드 06-13, 합류 19th myWiki측 완결)** — lora-claude 합류 5단계 흡수 myWiki측 완결: skills([[skills]] LoRa 풀스택 4종 모듈 행) + strengths([[strengths]] §19 검증된 LoRa 통신 스택) + gaps(기술 지식 분산→단일출처 부재 패턴) + ai-direction(결정 51·52) + 본 entity. lora-claude측은 골격·broker·registry·git 이미 완료.
>
> **자세히**: [[ai-direction]] § 결정 51~52 + [[gaps]] § 2026-06-17 + [[strengths]] §19 + [[한림용인cc-고가수조]] § LoRa 제어망 기술 근거.

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
