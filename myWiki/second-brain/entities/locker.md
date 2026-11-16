---
title: locker — 위시캣 #159474 보관함 실행 vault
type: entity
created: 2026-11-17
updated: 2026-11-17 2차 (칩 D1 = ⓒ 시제품 비교 확정 — 사용자 결단, nRF52832+ESP32-C6 양쪽 PoC 병행 → 실측 데이터로 최종 선정) / 1차 (신설 — 수주 전 골격, 실측 검증 단계 본부, 결정 70)
tags: [vault, delivery, 위시캣, 159474, ToF, VL53L5CX, BLE-Mesh, onDevice재사용, NDA, 수주전골격]
links: [위시캣활동, onDevice-ai, vault-registry, ai-direction, livecow, 2026-11-17_onDevice-검증자산-첫-외주재사용]
---

# locker — 위시캣 #159474 보관함 물건 감지 LED 실행 vault

## 한 줄 정의

위시캣 #159474(헬스클럽 보관함 물건 감지 LED 표시등, 클라이언트 손공순/techno137, 판가 23,500원/대 · 시제품 10대 200만 + 2차 양산 희망)의 **실행 본부** — `C:\todo\locker`, 수주 전 골격(2026-11-17 신설, [[ai-direction]] 결정 70).

## 현황 (2026-11-17)

- **단계**: 실측 검증 합의 — 클라이언트 실물 보관함(1000×300×500mm) 송부 대기 + 센서 구매(VL53L5CX 모듈 3~5개 + ST 공식 SATEL 기준기 1개, AliExpress). 프로토콜 = 진품 검증 → 커버 장착 Xtalk 보정 → 최악 케이스 실측 → 수치 보고서.
- **기술**: [[onDevice-ai]] 검증 자산 재사용(R48 파이프라인 입력부 ToF 64-zone 교체 + R49 이상탐지 백업 + 보드한계 검증 방법론). 사양 = VL53L5CX 8×8 + BLE Mesh + AA 리튬×2 교체식 + 60×60×20mm.
- **칩 D1 = ⓒ 시제품 비교 확정**(사용자, 11/17): nRF52832(전력 최강·1.7V 직결) + ESP32-C6(단가 ~$2·지그 불요 — LP polling 필수, [[gaps]] § 2026-11-17) **양쪽 PoC 병행** → 실측 데이터로 최종 선정.
- **구조**: 수주 delivery 카테고리 **수주 전 골격**(plc-retrofit·idaenc 패턴 3번째, SELF_ID 미부여·broker 미합류·자체 git). `00_영업인계/` = 미팅준비 자료 10종 사본, `01_클라이언트자료/` = gitignore(NDA). **NDA 경계 = 클라이언트 IP는 본 vault 격리, onDevice_AI엔 일반 기술 사실만.** 수주 확정 시 full 셋업 + broker 합류 재검토(weflo 졸업 경로).
- 영업 cycle은 [[위시캣활동]](wishketProject) 소관 — 본 vault는 기술 실행만. 결과 마일스톤은 myWiki 수동 cascade.
