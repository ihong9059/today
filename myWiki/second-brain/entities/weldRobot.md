---
title: weldRobot — UTTEC 용접 로봇 신사업 (Tier 3 vault)
type: entity
created: 2026-06-06
updated: 2026-06-06 (vault 신설 동시 박제 — strengths §13 carrier 역량 2번째 적용 사례)
tags: [weldRobot, 용접로봇, 신사업, Tier3, vault분리, carrier2번째, Path4-우선, Vision-seam-tracking, AI-비드검사, add-on-box]
links: [strengths, ai-direction, 양산제품, 위시캣활동, onDevice-ai, 한국기계, 정부R&D실증사업, 영업전략]
---

# weldRobot — UTTEC 용접 로봇 신사업

## 한 줄 정의

용접공 부족 + 다품종 소량 티칭 비용 + 비드 결함 검사를 **Vision + AI** 로 해결하는 UTTEC 신사업. **2026-06-06 별도 vault 신설** (Tier 3, multi-agent 14번째 weldrobot-claude).

## 상태 매트릭스

| 축 | 상태 |
|---|---|
| **vault 위치** | `C:\todo\weldRobot\` (Windows, 본 PC) |
| **vault 신설** | ✅ 2026-06-06 |
| **multi-agent ID** | `weldrobot-claude` (14th 합류) |
| **Tier 분류** | Tier 3 (장기 자체 제품 + multi-agent 합류) |
| **첫 진입 트랙** | Path 4 (Vision seam tracking + AI 비드 결함 검사 add-on box) |
| **첫 dogfood 고객** | [[한국기계]] (보류 AI 교육 트랙과 별개 신사업 관계) |
| **PoC 0** | ⬜ 2026-06 착수 예정 (100~150만, 1~2개월) |
| **첫 매출** | (carry) Path 4 알파 1 이후 |

## 4 Path 분기

| Path | 본질 | 진입 시점 | 자산 매칭 |
|---|---|---|---|
| **Path 4** ⭐⭐⭐ | Vision seam tracking + AI 비드 검사 add-on box | **즉시 (2026-06)** | mywiki §14·15·16 거의 그대로 (90%+) |
| Path 3 | AI 자율 path planning (Path Robotics 카테고리) | Path 4 정착 후 (2027) | factory-rpi4 + onDevice AI |
| Path 2 | 두산 cobot + 용접 토치 패키지 SI | SI 협업 시 | 양산 9종 + SCADA |
| Path 1 | 대형 산업 로봇 | 미진입 | 미적용 |

## UTTEC 자산 매칭 (Path 4 직접 이식 가능)

| 자산 | 본 사업 적용 |
|---|---|
| **Vision 좌표 학습 시스템** ([[strengths]] §16) | seam 시작·끝점 자동 캘리브레이션 → 거의 그대로 |
| **sensor AI 매트릭스 491 lines** ([[strengths]] §14) | 비드 결함 분류 CNN 모델 |
| **factory-rpi4** ([[reference_factory_rpi4_uttec_factory]]) | 데이터 수집·학습 머신 |
| **R36 + R50 + R48 가속 자산** ([[onDevice-ai]]) | 결함 분류 모델 가속 |
| **SCADA 5요소 HTML 33KB** ([[위시캣활동]] § #155220) | HMI 즉시 재활용 |
| **AWS 풀스택** ([[strengths]] §15) | 결함 데이터 클라우드 + SaaS |
| **LS XGT 가격 인덱스** ([[위시캣활동]] § 6/6) | 자동화 셀 통합 견적 |
| **모바일 앱 양산** ([[양산제품]] #7) | 작업자 모니터링 앱 |
| **KC/TELEC/CE 인증 패턴** | add-on box 인증 + 차폐 설계 |
| **ReportLab PDF 양식** | 사양서·견적서 양식 즉시 재활용 |

→ **자산 이식률 90%+, 개발 비용·시간 50% 단축**.

## 차별화 가설 4축

1. ⭐⭐⭐ **한국 시장 first mover** — Path Robotics·Vectis·Hirebotics·Augmentus 한국 진출 0건
2. ⭐⭐⭐ **Add-on 모델 = SI 협업 win-win** — 두산 cobot SI 업체 (인텔리시스 / 우림기연 / 디알젬) 옵션 카드
3. ⭐⭐ **결함 데이터 SaaS 정착** — AWS 풀스택 자산 직속 정합, 월 구독 10~30만
4. ⭐⭐ **시제품 검사 도메인 cross-매칭** — mywiki §16 Vision 좌표 학습 출처 + 본 vault Path 4 결합

## 견적 가설 (Path 4 add-on box)

| 모델 | 가격 |
|---|---|
| **하드웨어 BOM** | 140만~250만 |
| **add-on box 단품 판매가** | 400만~700만 (마진 60%) |
| **두산 cobot 통합 패키지** | 4,100만~6,000만 |
| **AWS SaaS 월 구독** | 10만~30만/월 |

## 영업 채널 carry (5채널)

1. [[한국기계]] 첫 dogfood (신사업 관계, AI 교육 보류 트랙과 별개)
2. 두산 cobot SI 업체 add-on 협업
3. [[위시캣활동]] cross-매칭 (용접·seam·비드·cobot·Modbus·시제품 검사 키워드 추가)
4. 정부 R&D Tier 3 ([[정부R&D실증사업]] 자산 활용 + 본 vault Tier 3 매칭)
5. AWS 결함 데이터 SaaS

## 신설 본질 — strengths §13 carrier 역량 2번째 적용 사례

| 사례 | 일자 | vault 위치 |
|---|---|---|
| 1번째 | 2026-06-04 | `revitaProject/application/노지관리Wiki/` |
| **2번째** | **2026-06-06** | **`C:/todo/weldRobot/`** ⭐ |

→ carrier 패턴 (사업 단위 = vault 단위, application/ 평행 구조, cross-vault 참조 규약, 다중 vault 운영 표준) **2번째 정착 검증**.

## 의문점 (carry)

1. 두산 협동로봇 H-series 외부 컨트롤 API latency?
2. Path Robotics 정확한 시스템 가격 + 점군→CAD 알고리즘?
3. 한국 용접 시장 규모 (IFR 통계 + 한국로봇산업협회)?
4. 정부 R&D 매칭 후보 (스마트팩토리 / AI 트랙 / 산업혁신기반구축)?
5. SI 업체 협력 채널 (인텔리시스 / 우림기연 / 디알젬)?
6. 위시캣 채널 용접 일감 빈도?

## 본 vault 측 박제 (cross-link)

- vault 정체성: `weldRobot/second-brain/entities/weldRobot.md`
- 결단 박제: `weldRobot/progress/decision-001-vault-신설.md` + `decision-002-Path4-우선-진입.md`
- Path 4 milestone: `weldRobot/application/path-4-vision-seam-tracking/milestones.md`
- thoughts: `weldRobot/second-brain/thoughts/2026-Q2/2026-06-06_용접로봇-신사업-진입-Path4-우선.md`
- raw junction: `myWiki/second-brain/raw/weldRobot` → `C:/todo/weldRobot/`

## 관련 페이지

- [[ai-direction]] § 결정 45 — vault 분리 carrier 패턴 2번째 사례
- [[strengths]] § 13 carrier 역량 + § 14·15·16 자산 출처
- [[한국기계]] — 첫 dogfood 고객 (보류 트랙과 별개 신사업 관계)
- [[양산제품]] — #10 신설 후보 (add-on box 양산 시)
- [[위시캣활동]] — cross-매칭 룰 6 확장 후보
- [[onDevice-ai]] — factory-rpi4 + sensor AI 매트릭스
- [[정부R&D실증사업]] — Tier 3 입찰 자격 자산
- [[영업전략]] — 통합 단일 진행 narrative 적용
