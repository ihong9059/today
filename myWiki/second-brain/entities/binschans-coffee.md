---
title: binschans-coffee — 원두 커피 머신 제어보드 개발 vault (#157726)
type: entity
created: 2026-09-01
updated: 2026-09-01
tags: [vault, 위시캣, 수주실행, delivery, Tier2, 제어보드, STM32G0, 커피머신, KC인증, 트라이액, 양산파트너, 빈스찬스]
links: [vault-registry, 위시캣활동, 양산제품, ai-direction, livecow]
---

# binschans-coffee — 원두 커피 머신 제어보드 개발 vault

## 한 줄 정의

위시캣 **#157726** 수주 delivery vault. 발주사 **빈스찬스(Binschans, 정수빈 대표)**의 원두 커피 머신 제어보드 턴키 개발(회로+아트웍+STM32G0 펌웨어+PC 테스트툴+KC). **계약 완료·계약금 수령(2026-09-01)** 후 본격 개발 실행.

## 메타

| 항목 | 값 |
|---|---|
| 위치 | `C:\todo\binschans-coffee\` (Windows 본 PC) |
| SELF_ID | 없음 (multi-agent 합류 보류·경량, livecow 패턴) |
| Tier | **Tier 2** (제품 개발 delivery — 750만/10주 + 자체 코드베이스) |
| repo | private 로컬 (git init 완료, origin 없음) |
| 계약 | 개발비 750만(부가세 별도), 대금 30/30/25/15 |
| 성격 | 수주 후 **개발 실행만**. 영업 cycle = [[위시캣활동]]/wishketProject |

## 왜 별도 vault인가 (성격 결정, 2026-09-01)

- **계약 완료·계약금 수령** = 수주 확정 → "수주 확정 시 full 셋업" 정책 적용.
- **자체 코드베이스**(Altium 회로·PCB + STM32G0B1RE 펌웨어 + PC GUI 테스트툴) → Tier 2 승격 요인. wishketProject(영업 트랙)와 분리해 delivery 격리([[livecow]] 동일 사유).
- **[[livecow]]와 차이**: livecow = 진단·개선(경량). 본 vault = **자체 개발**(생성 위주).
- **[[uttec-plc]]/#157744 carrier와 차이**: 단일 제품 Tier 2(750만)라 신사업 carrier 아님. multi-agent 합류는 보류(경량), **양산(4단계) 반복·후속 제품 확정 시 승격**.

## 제품·기술 (견적 v2 확정)

- 부하: 그라인더 DC24V 150W + **온수 히터 220V 1000W**(ZC 버스트파이어 50~110°C) + 급수펌프 DC12V + 미스트.
- MCU **STM32G0B1RE**(발주사 지정) / 저압·고압 2보드 + 그라인더 드라이버 PCB(제조사 공급) / 히터 트라이액 BTA16-600BWRG + MOC3063(ZC 광절연) → **DC성분 원리적 미발생**.
- KC **3중 안전차단** + 반도체 단락 시 제어불능 방지 + 유량 적산 실시간.
- 인도물: **Altium 원본** + 펌웨어 + 동작검증 테스트툴(1단계 무료) + KC. 양산 목표단가 PCB Ass'y **13,500원 이하**.

## 자산

- `클라이언트자료/기존펌웨어_회로도데이터/` — 발주사 기존 HW 펌웨어·회로도 **694파일/99MB**(immutable·gitignore·NDA). 신설계 delta 분석 base.
- 계약·요구·KC 설계·STM32 기종선정 이관 완료.

## 관련 페이지

- [[위시캣활동]] § 2026-09-01 #157726 — 영업 lifecycle(계약 도달)
- [[양산제품]] — STM32 제어보드·KC 인증 자산(수주 마일스톤 cascade 대상)
- [[vault-registry]] — 수주 delivery 실행 vault 카테고리
- [[livecow]] — 경량 delivery 선례
