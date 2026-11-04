---
title: livecow (BNOW) — LoRa 가축 모니터링 캡슐·Collar delivery 실행 트랙
type: entity
created: 2026-10-27
updated: 2026-11-03 (_inbox 흡수 — ondevice-claude 카드 `2026-11-02-003`: **livecow↔onDevice_AI 첫 기술 연계** — Collar/캡슐 LoRa 칩 RAK3172(STM32WLE5)가 onDevice_AI 16번째 보드 편입·R48 제스처 CMSIS-NN 10.71ms 100% 포팅 성립, 양방향 가치(livecow="LoRa+제스처 AI 단일칩" 확장 제안 / onDevice_AI=LoRa 축 신규) + NDA 경계 운영(측정=livecow 벤치·박제=일반 기술 사실만)) / 이전 2026-10-31 (staleness cascade — vault log 10-29~31 직접 대조: **Collar 과제 진행 확정·진행계획서 총 600만 발행**(사용자 결단) + 충북대 펌웨어 소스 수령→RAK4630 포팅 FW0·FW1 완료 + ⭐ **RAK3172↔RAK4630 LoRa P2P 양방향 실링크 실증**(공중 동결표 그대로 Zephyr↔RUI3 호환 확정 = 전환 핵심 전제 실물 검증) + 발주 회로도 치명결함(WHM110A RF) 차단·V1.1 재검증 / 캡슐 = 수신율 보고 발행(전달률 ~100%)·GW proto mqtt 결함 교정·**V10 최종발주본 박제(U3=BMA400 회귀·포팅 불요)** — 발주 트리거=BMA400 입고 / 11-04 충북대 미팅 자료 발행) / 이전 2026-10-27 (entity 신설 — 활성 축 3건 delivery 정리 cascade. 캡슐 시제품 5대 제작·전수검증 완결 + BNOW 검증결과 보고 발행(10/27) → 회신 대기 / Collar 과제(충북대) P0 설계 인수검증 단계)
tags: [클라이언트, LoRa, 축산, 캡슐, 시제품, BNOW, 충북대, NDA, 실행vault, livecow-vault, 위시캣]
links: [위시캣활동, lora, 양산제품, vault-registry, 영업전략]
---

# livecow (BNOW)

## 한 줄 정의

위시캣 **#156763**(축산 소 출산 모니터링 LoRaWAN 수신율 진단, 2026-07-17 미팅)에서 출발한 **BNOW LiveCow LoRa 캡슐 delivery 실행 트랙**. 실행 vault = `C:\todo\livecow` (2026-07-17 신설, 결정 62 — 클라이언트 자료 583파일 이관). **NDA(BNOW/CBNU) — 공개 push 금지.**

## 실행 구조

- **vault**: `C:\todo\livecow` — delivery 실행 일체 소관. 경량 vault로 **_inbox 카드 채널 미설치**(multi-agent 미합류) → myWiki 인지는 staleness hook(`check-vault-status.py` VAULT_MAP, 2026-10-27 등재)으로 보완.
- **파생 자산**: livecow-cost-kit(`C:\todo\livecow-cost-kit`) — 차기모델 PCB ASS'Y 판가 산출 방법론, 홍광삼(관리팀장) 인계본(2026-08-14).
- 책임 분리: livecow vault = 시제품·펌웨어·검증 실행 / myWiki(본 entity) = 상태·결정·사업 자산 인지.

## 진행 상태 (2026-10-27 delivery 정리 cascade)

**두 축 진행 — 캡슐(마무리 단계 ≈90%) + Collar 과제(설계 초반 ≈30%)**

### ① 캡슐 프로젝트 (#156763 LiveCow LoRa)
- **시제품 5대 제작·전수검증 완결**(10/27) — 통제NS ABP 복호 + 7시간 무재부팅 운영 실증 → **BNOW 검증결과 보고서 발행**(`개선/BNOW회신/BNOW_보고_5대시제품_검증결과_2026-10-27.pdf` + 회로도 ver7 검토 보고).
- **외부 대기(BNOW 회신)**: V5.0.4 소스 요청 · DevAddr ABP 등록 · 회로도 조치 A/B/C 승인.
- 잔여 마무리(vault 소관): 배터리 멀티미터 대조(👤 실측) · DHCP 고정할당 + proxy 지속성(👤 현장) · 활동 임계 벤치튜닝(저우선).

### ② Collar 과제 (LoRa+HaLow 목걸이, 충북대)
- 설계 인수(10/21) → **RAK4630 아키텍처 전환 확정** → P0 설계 인수검증 단계(ERC·BOM 조달성·open-gate 5건: XTSD footprint·USB-C·배터리입력·WHM pin28·TPS2116 HIL).
- **외부 대기**: 충북대 설계변경 설명자료(10/24 발행) 회신 → P0 착수.
- 미결 확인 상위: LoRa 링크 방식(sniff vs P2P) · 목걸이 펌웨어 소스 유무 · 배터리 선정(GPS 상시 구동 병목·KC 경로).

## 진행 상태 (2026-10-31 staleness cascade — vault log 10-29~31 직접 대조) ⭐⭐

**두 축 모두 대폭 전진 — Collar가 "설계 초반"에서 "과제 확정·포팅 본궤도"로, 캡슐이 "회신 대기"에서 "100대 발주 트리거 대기"로.**

### ① Collar 과제 — 진행 확정(600만) + RAK4630 포팅 실링크 실증

- **과제 진행 확정 (10-29, 사용자 결단)**: 하드웨어 단계만(펌웨어 본개발·제주실증 범위외 명시) **총 600만 VAT별도**(PCB설계 100 / 샘플 5대 200 / 확대 20대 300, 착수50/검수50) 진행계획서(제안서) 발행 — RAK4630 적용 설명 3장 포함. 캡슐 단발을 넘는 **후속 수주 구조가 금액으로 구체화**.
- **충북대 펌웨어 소스 수령 (10-29, 제안서 당일 송부 = 진행 신호)**: Collar_P2P_FailSafe_v2(STM32U545, 881파일). ★P2P 공중 파라미터 전부 소스 명시(922.1MHz/SF9/BW125/sync 0x1424) → **동결표 박제 = 내장 SX1262로 공중 호환 재현 가능** 확정. 포팅 범위 = collar_p2p_lab(AT 모뎀 상태머신) 단독 재설계 + port 치환, 프레임워크 = NCS(Zephyr) 확정.
- **FW0·FW1 완료 (10-30~31)**: 커스텀보드 collar_rak4630 + 브링업 하네스 D0~D6 빌드 PASS → radio 치환층 app_collar 빌드 PASS(58.5KB). 샘플 도착 즉시 SWD flash 가능.
- ★ **발주 회로도 치명결함 차단 (10-30)**: PCB PAD_NET 273개 전수 복원 검토 → WHM110A RF 경로 R20 1k+1nF 션트(**HaLow 사망급**) 발견 → 사용자 당일 수정·V1.1 재검증 완결. 10-25 신설한 "넷 연결성 전수 검증 게이트"([[gaps]])가 **발주 전 내부 검토로 치명결함을 차단한 첫 실증**.
- ⭐⭐ **milestone (10-31): RAK3172↔RAK4630 LoRa P2P 양방향 실링크 실증(FW2상당)** — 공중 동결표 그대로 **Zephyr sx126x ↔ RUI3 P2P 호환 확정** = RAK4630 전환의 핵심 전제 실물 검증(RSSI -75~-88/SNR 10~11, 연번 무손실). FW3은 이 벤치에서 실프레임 검증 가능.
- **11-04(수) 14:00 충북대 미팅** 자료 발행(진행경과·20대 로드맵·확정요청 6건) — 차기 외부 일정.

### ② 캡슐 (#156763) — 수신율 보고 + V10 최종발주본 박제

- **수신율 모니터링 BNOW 보고 발행 (10-29)**: 안정 4.4h 데이터전달률 1·2·4·5호 100% / 3호 96.3%, 운영중 재부팅 0. ★게이트웨이 Livecare 서버 복귀 = 숨은 결함 2건 동시 교정(server 127.0.0.1 + **proto udp→mqtt가 두절의 숨은 원인**) → MQTT PUBLISH 실증. ABP 세션키 규명(NwkSKey=AppSKey=DevEUI×2) — BNOW 등록 시 키 명시 전달 준비.
- **캡슐 100대 발주본 = LiveCow-V10 박제 (10-31)**: BOM 실측 **U3=BMA400 회귀 확정**(BMA456 미채택 → **펌웨어 포팅 불요**). **발주 트리거 = PCBA 제조사에 BMA400 입고 도착**.
- 외부 대기 갱신: BNOW 회신(V5.0.4 소스·DevAddr ABP 등록·BMA400 입고) + 충북대 11-04 미팅.

## 진행 상태 (2026-11-02 cascade) — onDevice_AI와 첫 기술 연계 축 (ondevice-claude 카드 `2026-11-02-003`) ⭐

- **livecow(위시캣 수주) ↔ [[onDevice-ai|onDevice_AI]](제품 R&D)의 첫 기술 연계**: Collar/캡슐의 LoRa 하드웨어(**RAK3172 = STM32WLE5**)가 onDevice_AI 보드 매트릭스에 16번째 보드로 편입 → R48 제스처 INT8 모델이 **CMSIS-NN 10.71ms·정확도 100%**로 포팅 성립(LoRaWAN 스택 RUI3와 단일 칩 공존).
- **양방향 가치**: livecow에는 **"LoRa + 제스처 AI 단일 칩" 확장 제안 거리**(캡슐·Collar에 온디바이스 거동 분류 탑재 여지) / onDevice_AI에는 **LoRa 축 신규**(축산·원격 자산 모니터링 = Stage 4 시나리오 C의 BLE 자리에 LoRa 변형).
- **NDA 경계 운영**: 측정은 livecow(NDA) 벤치에서 수행, onDevice_AI·myWiki 박제는 **일반 기술 사실만**(BNOW/CBNU 식별 정보 제외). → NDA 경계 분리 운영 사례.

## 사업적 의미

- 위시캣 → delivery 실행 전환 사례([[위시캣활동]] lifecycle). LoRa 기술 근거는 [[lora]] hub와 횡단 — 축산(캡슐·Collar)은 수조·조명 이은 LoRa 응용 축.
- Collar 과제 = 캡슐 단발을 넘는 **후속 과제 연결(충북대)** — 수주 구조 확장 신호.

## 관련 페이지

- [[위시캣활동]] — #156763 lifecycle 원류
- [[lora]] — LoRa 기술 근거 hub (E22·망 구성·표준단말)
- [[양산제품]] — nRF52/LoRa 양산 자산 매칭
- [[vault-registry]] — vault 목록 단일 출처
