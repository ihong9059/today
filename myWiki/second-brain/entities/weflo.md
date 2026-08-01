---
title: Weflo (WEFLO Inc.) — 모빌리티 비접촉 AI 진단 클라이언트
type: entity
created: 2026-08-02
updated: 2026-08-02 (신설 — 위시캣 #157235 발주사, wishket-claude 카드 `2026-08-03-001` 흡수)
tags: [클라이언트, 위시캣, 모빌리티, 비접촉진단, PhysicalAI, 한화스핀오프, 드론, UAM, 전기차, 계측DAQ, 신규도메인]
links: [위시캣활동, 양산제품, ai-fanstick, ai-direction, 영업전략]
---

# Weflo (WEFLO Inc.)

## 한 줄 정의

위시캣 **#157235**(고정밀 24bit ADC·MCU RPM 회전체 진단 보드) 발주사. **드론·UAM·전기차 비접촉 AI 진단** 스타트업으로, UTTEC의 **STM32H7 고속 DAQ·진동/음향 계측 양산 자산**([[양산제품]] 계측/DAQ)과 직결되는 신규 클라이언트 도메인.

## 회사 개요

| 항목 | 값 |
|---|---|
| 법인 | WEFLO Inc. (weflo.ai) |
| 설립 | 2022 (**한화시스템 스핀오프**) |
| 위치 | 대전 본사 + 美 산호세 지사 |
| 규모 | ~16명 |
| 누적 투자 | $8.26M |
| 위상 | **Gartner "Physical AI" 리스트 유일 한국 스타트업** |

## 사업

- **비접촉 AI 진단** — verti-Pit(10초 점검) 등 드론·UAM·전기차 대상 비접촉 계측·진단.
- 플랫폼: **VAIS / FloOne**(국방 드론 AI).

## UTTEC 정합 (왜 강매칭인가)

- **#157235 보드** = 24bit 동시샘플 ADC + 차동 AFE(진동/음향 신호체인) + RPM 알고리즘(회전체 특징량) + 소형 배터리 보드 → Weflo **비접촉 진단장비의 계측·연산 모듈**로 해석.
- UTTEC **STM32H745 고속 DAQ / 자동차 진동·소리 계측 양산 자산**([[양산제품]])이 정확히 대응.
- **후속 물량 가능성** — 국방/UAM 고객 + 한화 출신 = 단발 외주를 넘는 반복 발주 잠재. 수주 도달 시 **Tier 승격·sub-vault** 검토 후보.

## 진행 상태 (2026-08-02)

- 견적 **부가세 포함 30,000,000원** 재작성(공급가 27M = SW·시험 17M + HW 10M + 부가세). STM32 알고리즘 성능 계층(H723/H745/N6/V863·Helium/NPU) 기술 대응 진행 중. → 상세 [[위시캣활동]] §2026-08-02 + [[2026-08-02_STM32-프로세서선정-Helium-NPU-application-class]].
- 영업 cycle 소관 = wishketProject vault(wishket-claude). myWiki는 **클라이언트 도메인 자산**으로 인지.

## 관련 페이지

- [[위시캣활동]] — #157235 진행 lifecycle
- [[양산제품]] — STM32H7 고속 DAQ 계측 자산 (매칭 근거)
- [[2026-08-02_STM32-프로세서선정-Helium-NPU-application-class]] — 프로세서 선정 영업논리
- [[ai-fanstick]] — AI 가속 application class 판단 패턴 원류
