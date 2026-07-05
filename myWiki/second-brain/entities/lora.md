---
title: lora — UTTEC LoRa 기술 전문 hub vault
type: entity
created: 2026-06-13
updated: 2026-07-05 (_inbox 흡수 — lora-claude 카드 2장: BLE↔LoRa 브리지 게이트웨이 경량·무선화 monitor terminal end-to-end 실증(06-19) / 2.4G ESB 로컬링크 dual-radio 겸용 역량 확보(06-20) → 결정 58 + gaps 2026-07-05 + thought 1 + done 회신 / 이전 6/19: 통합펌웨어+BLE프로비저닝+한림 최종 아키텍처 3패턴(06-18) / 2.4G ESB 하이브리드 옵션(역량경계 ~30dB)+E22 generic SX126x 디코드 불가(벤더 락인)(06-19) / 이전 6/17: 카드 4장 megasession — 4종 모듈 검증+SPI 전환 경로(06-14) / 골프장 수조 제어망 프로토콜+8B frame 송수신 실증+배터리 모니터링(06-16) / CubeCell 스니퍼 done ack(06-15) / 합류 19th myWiki측 5단계 완결(06-13))
tags: [vault, lora, 무선통신, E22, E32, 기술hub, multi-agent, 사업근거, 4종모듈검증, SPI전환, 수조제어망, 8B-frame, 배터리모니터링, SX126x, SX127x, 자율제어망]
links: [vault-registry, revita, shield, factory, 한림용인cc-고가수조, ai-direction, gaps, skills, strengths]
---

> **2026-06-19~20 _inbox 흡수 — lora-claude 카드 2장** ⭐⭐⭐ (2026-07-05 흡수: BLE↔LoRa 브리지 게이트웨이 경량화(06-19) + 2.4G ESB 로컬링크 dual-radio(06-20)):
>
> **(카드 06-19, BLE↔LoRa 브리지 monitor terminal end-to-end 실증 PASS)** ⭐⭐⭐ — monitor/master 단말을 **BLE↔LoRa 브리지 패턴**으로 구현. 게이트웨이(RPi3)와 LoRa 단말 사이를 USB-serial이 아니라 **BLE 상시연결**로 연결: master 노드(nRF52832+E22)가 BLE peripheral + LoRa(E22)를 **동시 상시 동작**하며 8B frame 투명 중계, RPi는 내장 BLE central. 데이터경로 `sensor→LoRa/E22→master(BLE peripheral)→BLE→RPi(bleak)→web`, 역방향 명령 동일 경로. 신규 entity: `master_bridge` 펌웨어(BLE Bridge Service UUID 0x0010, RX notify 9B=8B+RSSI/TX write 8B, 광고 `UTEC-Bridge`) + RPi `golf-bridge`(bleak 구독→TANK/OP/ACK 디코드→web :8090). **⭐ 사업 함의**: 게이트웨이에 LoRa 모뎀 USB 직결·전용 HAT 없이 **BLE만 있으면**(라즈베리·폰·PC 대부분 내장) 기존 LoRa 단말 재사용해 monitor/control 게이트웨이 구성 = **게이트웨이 경량·무선화 패턴**, 공장 자동화·다현장 monitor 재사용 ([[ai-direction]] § 결정 58). **gotcha**: BLE를 끄지 않고(`bt_disable` 금지) E22 루프와 동시 상시 동작 필요 / RPi BLE RF-kill 차단(unblock+up) / 브리지에 RTT 디버거 붙였다 떼면 nRF halt / **Chrome은 link-local(169.254) 접속 불가 → 직결망은 일반 사설IP 필수**([[gaps]] § 2026-07-05 lora). → lora `수조제어_펌웨어/07_monitor_BLE브리지_인터페이스규약.md` + `실증/master_bridge/`.
>
> **(카드 06-20, 2.4G ESB 로컬링크 dual-radio 역량 확보)** ⭐⭐ — 수조제어 통합펌웨어에 **2.4G ESB 로컬링크**(sensor↔onoff 근거리) 추가·end-to-end 검증. LoRa(920M 본부 장거리)와 2.4G(온칩 로컬)를 **dual-radio 겸용**: 한 노드가 LoRa(상위 모니터)+2.4G ESB(로컬 단말) 동시 운용 → 폐쇄공간(펌프실)·간섭분리·산악 골프장처럼 로컬 단말이 본부에 직접 못 닿는 환경 대응(수조 on/off·야간 lamp). 최대거리 2.4G = **250kbps**(감도 −104dBm, 1Mbps 대비 +8dB→거리 2.5배/벽투과 여유)+4dBm = nRF52832에서 BLE Coded PHY 없이 장거리 확보하는 유일 경로. group별 채널·주소 파생 → 다중 group 무간섭. **gotcha 2건**([[gaps]] § 2026-07-05 lora): ① **ESB와 BLE컨트롤러(SDC/MPSL) 한 이미지 공존 불가**(MPSL 부팅 자동 init 라디오 점유 충돌) → **2-이미지 패턴**(BLE판 provisioning + ESB판 CONFIG_BT 미설정 운영, NVS 보존 reflash 전환) — cf. 06-18 통합펌웨어 BLE 프로비저닝과 정합. ② nRF52832 250kbps는 **ESB auto-ACK 비대칭 실패**(forward만, 역방향 ack 미수신) → 양방향 독립송신(noack)+역할 시분할(PTX↔PRX) 우회. **⭐ 사업 함의**: "로컬 근거리 + 상위 장거리" 2계층 필요한 shield/revita/공장 응용에 dual-radio 재사용([[ai-direction]] § 결정 58). → lora `수조제어_펌웨어/05_setting_app_재검토 §ESB`, memory `esb-2g4-local-link`.
>
> **자세히**: [[ai-direction]] § 결정 58 + [[gaps]] § 2026-07-05 lora + [[revita]] § 타워 LoRa GW(동일 게이트웨이 도메인) + [[2026-07-05_BLE게이트웨이-LoRa경량연결]] (신규 thought).

> **2026-06-19 _inbox 흡수 — lora-claude 카드 2장** ⭐⭐⭐ (06-18 통합펌웨어+BLE프로비저닝 + 06-19 2.4G하이브리드+E22스니핑한계):
>
> **(카드 06-18, 단일 binary 통합 펌웨어 + BLE 프로비저닝 + 한림 최종 아키텍처 3패턴)** ⭐⭐⭐ — ① **통합 펌웨어**: 중계기·sensor·on/off 3역할을 1개 펌웨어에 통합, 부팅 시 NVS role 분기 → 보드별 재빌드 0. nRF52832에 **BLE+NVS+LoRa 통합 빌드 적합 실증**(FLASH 27.6%·RAM 66.1%). ② **BLE 프로비저닝**: 스마트폰 앱이 BLE GATT로 role+address 주입 → LoRa addr-set(동시충돌 함정) 폐기. Native Android(Kotlin) SM-M536S end-to-end 실증. ③ **한림 최종 아키텍처 3패턴(공장 자동화 재사용)**: 폐쇄공간→open 단말 intra-relay(2단 중계) / ACK-도청 명령전달(sensor ACK가 opcode echo) / 로컬 자율제어 우선(통신두절에도 안전). **⭐ 사업 함의**: "보드 1종 굽고 앱으로 역할 지정" = 양산·현장 배포 비용 최소화 = UTTEC LoRa 제어망 양산 표준 배포 모델 ([[ai-direction]] § 결정 54). → `검토/16_통합펌웨어_BLE설정/`.
>
> **(카드 06-19, 2.4G ESB+LoRa 하이브리드 옵션 + E22 디코드 불가)** ⭐⭐ — ① **2.4G 하이브리드 옵션**: group 내부(SENSOR↔ONOFF, 5~6m+벽) 평상시 2.4G ESB(nRF52832 내장 라디오), 끊기면 LoRa 2단중계 폴백 → LoRa air-time 확보·ACK도청 hack 제거·E22 BOM 절감 여지. **역량경계**: nRF52832 2.4G는 900M LoRa比 폐쇄공간 투과 **~30dB 불리**(Coded PHY 미지원·TX +4dBm) → **근거리·약장애물 한정**, 장거리·강투과는 sub-GHz LoRa. 채택 전 **현장 2.4G RSSI 실측 필수**. ② **신규 gotcha**: Ebyte E22는 generic SX126x로 디코드 불가 — 같은 SX1262(CubeCell)로도 E22 on-air 복조 0건(독자 프레이밍). E22망 스니핑·게이트웨이는 **E22 모듈로만** 보장 = 벤더 락인 (검토/10 확장). **사업 함의**: 멀티벤더 상호운용 설계 시 "같은 칩=호환" 거짓 ([[ai-direction]] § 결정 55 + [[gaps]] § 2026-06-19). → `검토/17_2.4G로컬링크_ESB_하이브리드/`, `하드웨어/HTCC-AB01/sniffer/E22_디코드_시도_결론_2026-06-19.md`.

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
