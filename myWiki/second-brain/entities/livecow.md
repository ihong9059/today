---
title: livecow (BNOW) — LoRa 가축 모니터링 캡슐·Collar delivery 실행 트랙
type: entity
created: 2026-10-27
updated: 2026-10-27 (entity 신설 — 활성 축 3건 delivery 정리 cascade. 캡슐 시제품 5대 제작·전수검증 완결 + BNOW 검증결과 보고 발행(10/27) → 회신 대기 / Collar 과제(충북대) P0 설계 인수검증 단계)
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

## 사업적 의미

- 위시캣 → delivery 실행 전환 사례([[위시캣활동]] lifecycle). LoRa 기술 근거는 [[lora]] hub와 횡단 — 축산(캡슐·Collar)은 수조·조명 이은 LoRa 응용 축.
- Collar 과제 = 캡슐 단발을 넘는 **후속 과제 연결(충북대)** — 수주 구조 확장 신호.

## 관련 페이지

- [[위시캣활동]] — #156763 lifecycle 원류
- [[lora]] — LoRa 기술 근거 hub (E22·망 구성·표준단말)
- [[양산제품]] — nRF52/LoRa 양산 자산 매칭
- [[vault-registry]] — vault 목록 단일 출처
