---
title: Weflo (WEFLO Inc.) — 모빌리티 비접촉 AI 진단 클라이언트
type: entity
created: 2026-08-02
updated: 2026-08-04 (본격 진행 → **weflo 실행 vault(21st) 신설** — 영업(wishket)에서 실행 트랙 졸업, Tier 3 승격. 임호균 2인 R&R + 다중 협력사)
tags: [클라이언트, 위시캣, 모빌리티, 비접촉진단, PhysicalAI, 한화스핀오프, 드론, UAM, 전기차, 계측DAQ, 신규도메인, weflo-vault, Tier3, 실행vault]
links: [위시캣활동, 양산제품, ai-fanstick, ai-direction, 영업전략, vault-registry]
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

## ⭐ 실행 vault 승격 (2026-08-04) — weflo vault (21st)

**본격 진행 결정** → 사용자 판단으로 **별도 Tier 3 vault `weflo` 신설**(`C:/todo/weflo/`, SELF_ID=`weflo-claude`, carrier=mywiki-claude). 영업(wishket)에서 **실행 트랙 졸업**.

- **승격 근거 (Tier 3 신호)**: ① STM32H745 펌웨어 + PCB 자체 코드베이스(3축 승격 신호) ② 임호균 2인 R&R git 협업 ③ 다중 협력사(PCB제조·SMT·BOM) 조율 ④ 한화 출신·국방/UAM 후속 물량 관계 지향. onDevice_AI의 business/execution 분리와 동형.
- **책임 분리**: wishket = 영업 사례·수주·매출 기록 (졸업 후에도 유지) / weflo vault = 회로·PCB·펌웨어·검수·협력사·R&R 실행 / myWiki(본 entity) = 클라이언트·사업 자산·재거래.
- **R&R**: 홍광선(회로 25년 = 회로/PCB 주도) + 임호균(펌웨어·신호처리 / PM·고객·해외 / 회로 공동 / 검증·문서 4영역 공동리드, 세부배정 협의 후 확정).
- vault 구조: `계약_요구정의서 / 회로_PCB / 펌웨어 / 신호처리_검증 / 협력사_외주 / 역할분담_R&R / 고객_Weflo`. 상세 = [[vault-registry]] 21st.

## 관련 페이지

- [[위시캣활동]] — #157235 진행 lifecycle
- [[양산제품]] — STM32H7 고속 DAQ 계측 자산 (매칭 근거)
- [[2026-08-02_STM32-프로세서선정-Helium-NPU-application-class]] — 프로세서 선정 영업논리
- [[ai-fanstick]] — AI 가속 application class 판단 패턴 원류
