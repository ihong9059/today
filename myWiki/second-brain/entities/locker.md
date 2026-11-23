---
title: locker — 위시캣 #159474 보관함 실행 vault
type: entity
created: 2026-11-17
updated: 2026-11-23 (staleness cascade 6일 — vault log 11-19~11-23 직접 대조: 🎉 **BLE Mesh 1단계 E2E 최초 성립(11/22)** — GW pca10059(nRF52840 동글, RPi3 USB 직결) + 4노드(pca10100·pca10040×2·diaper) → Mesh → collector → SQLite → Flask 웹 대시보드 전 구간 관통 + **전원 리셋 후 통신 유지(BT_SETTINGS 영속화)** + Tailscale 원격(uttec-locker 100.103.41.112:8080). ⭐ **개발일정서 송부 — 개발비 150만 VAT별도/30일**(기존 기록 200만/21일에서 사용자 확인 변경·개발비=회로+펌웨어+테스트 한정, 시제품 10대·PCB·샘플=별도 실비, 소유권=대금 완납 시 손공순 귀속) + **실증 보드 = diaper 재고(nRF52832-QFAA) 확정·핀 실물 확정**(UART TX=P0.06/RX=P0.08·Buzzer=P0.13) + **VL53L5CX↔J2 연결 확정**(I2C 폴링) + 📌 **칩 D1 실측 재료: nRF52832 노드 RAM 63.3%(BT_SETTINGS 포함) — INT8 추론 동거 빠듯** + ToF 클라이언트 설명자료·센서배치 설계도(확정 치수 850×500×300) + 15노드 중계 테스트 준비) / 이전 2026-11-17 2차 (칩 D1 = ⓒ 시제품 비교 확정 — 사용자 결단, nRF52832+ESP32-C6 양쪽 PoC 병행 → 실측 데이터로 최종 선정) / 1차 (신설 — 수주 전 골격, 실측 검증 단계 본부, 결정 70)
tags: [vault, delivery, 위시캣, 159474, ToF, VL53L5CX, BLE-Mesh, onDevice재사용, NDA, 수주전골격]
links: [위시캣활동, onDevice-ai, vault-registry, ai-direction, livecow, 2026-11-17_onDevice-검증자산-첫-외주재사용]
---

# locker — 위시캣 #159474 보관함 물건 감지 LED 실행 vault

## 한 줄 정의

위시캣 #159474(헬스클럽 보관함 물건 감지 LED 표시등, 클라이언트 손공순/techno137 Solution Bank, 판가 23,500원/대 · **개발비 150만 VAT별도/30일**(11/19 변경, 시제품 10대·PCB·샘플 별도 실비) + 2차 양산 희망)의 **실행 본부** — `C:\todo\locker`, 수주 전 골격(2026-11-17 신설, [[ai-direction]] 결정 70).

## 현황 (2026-11-23) — staleness cascade 6일 해소

- 🎉 **BLE Mesh 1단계 E2E 최초 성립(11/22)**: 게이트웨이 = **pca10059(nRF52840 동글) RPi3 USB 직결**(CDC JSON) + 노드 4대(pca10100·pca10040×2·diaper) — 노드→Mesh→GW→collector→SQLite→**Flask 웹 대시보드** 전 구간 관통. T1 단일·T2 다중 수신 통과, **전원 리셋 후 통신 유지**(BT_SETTINGS seq·프로비저닝 영속화, 0x0003 재부팅 검증). RPi3 = Tailscale `uttec-locker` 100.103.41.112:8080 원격 대시보드·자동시작. 잔여 = T3 거리·T4 이탈 표시 + **15노드 중계 테스트**(11/23 RELAY 활성화·diaper 핀 실물 확정).
- **개발일정서 송부(Solution Bank)**: 총 개발비 **150만 VAT별도**(계약 50%/완료 50%) · **30일** · M1~M5 마일스톤. 개발비 = 회로 설계·펌웨어·테스트 한정, **시제품 10대·PCB 설계·샘플 = 별도 실비 정산**. 소유권 = **대금 완납 시** 손공순 대표 귀속. ⚠️ 기존 기록(미팅 11-10) 200만/21일 → 사용자 확인 변경 — wishketProject 측 cascade는 wishket vault 소관(미완 carry).
- **실증 보드 = diaper 재고 보드(nRF52832-QFAA) 확정**: J2 단일 커넥터로 VL53L5CX 연결 확정(I2C P0.17/19·LPn P0.07·INT 없이 폴링), 핀 실물 확정(UART TX=P0.06/RX=P0.08·Buzzer=P0.13·LED Red=P0.22/Blue=P0.23). OLED(SH1106)로 I2C 버스 실물 검증 완료.
- 📌 **칩 D1(ⓒ 시제품 비교) 실측 재료 축적**: 노드 RAM 점유 nRF52832 **63.3%**(41.5/64KB, BT_SETTINGS 포함) vs 52833 26.9% — **52832는 INT8 추론 동거 예산 빠듯** → D1 결정에 유력 변수.
- 클라이언트 자료: ToF 물체감지 설명자료(NDA 일반기술만) + 센서배치 설계도 — **확정 치수 윗층 850(H)×500(D)×300(W)**, 센서 2개로 2층 커버, 눕힌 스마트폰(9mm) 감지 설계.

## 현황 (2026-11-17)

- **단계**: 실측 검증 합의 — 클라이언트 실물 보관함(1000×300×500mm) 송부 대기 + 센서 구매(VL53L5CX 모듈 3~5개 + ST 공식 SATEL 기준기 1개, AliExpress). 프로토콜 = 진품 검증 → 커버 장착 Xtalk 보정 → 최악 케이스 실측 → 수치 보고서.
- **기술**: [[onDevice-ai]] 검증 자산 재사용(R48 파이프라인 입력부 ToF 64-zone 교체 + R49 이상탐지 백업 + 보드한계 검증 방법론). 사양 = VL53L5CX 8×8 + BLE Mesh + AA 리튬×2 교체식 + 60×60×20mm.
- **칩 D1 = ⓒ 시제품 비교 확정**(사용자, 11/17): nRF52832(전력 최강·1.7V 직결) + ESP32-C6(단가 ~$2·지그 불요 — LP polling 필수, [[gaps]] § 2026-11-17) **양쪽 PoC 병행** → 실측 데이터로 최종 선정.
- **구조**: 수주 delivery 카테고리 **수주 전 골격**(plc-retrofit·idaenc 패턴 3번째, SELF_ID 미부여·broker 미합류·자체 git). `00_영업인계/` = 미팅준비 자료 10종 사본, `01_클라이언트자료/` = gitignore(NDA). **NDA 경계 = 클라이언트 IP는 본 vault 격리, onDevice_AI엔 일반 기술 사실만.** 수주 확정 시 full 셋업 + broker 합류 재검토(weflo 졸업 경로).
- 영업 cycle은 [[위시캣활동]](wishketProject) 소관 — 본 vault는 기술 실행만. 결과 마일스톤은 myWiki 수동 cascade.
