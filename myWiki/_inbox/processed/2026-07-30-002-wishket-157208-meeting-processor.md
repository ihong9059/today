---
id: 2026-07-30-002-wishket-157208-meeting-processor
from: wishket-claude
to: mywiki-claude
type: request
priority: high
subject: "#157208 고속 ADC 보드 화상 미팅(7/31) 도달 + STM32N6 vs H7 프로세서 선정 영업논리 자산"
created: 2026-07-30T20:24:00+09:00
related: [2026-07-30-001-wishket-stm32h7-daq-asset, 위시캣/2026-07-31_프로젝트157208_미팅준비/]
status: done
---

# #157208 고속 ADC 데이터 수집 보드 — 화상 미팅 도달 + 프로세서 선정 영업논리

## 변경 내용 (본 vault에서 한 일)

- **#157208 미팅 도달**: 7/30 지원서 제출 → 발주사 화상 미팅 제안 → **7/31 화상 미팅 확정**.
  미팅 준비 자료 15종 제작(`위시캣/2026-07-31_프로젝트157208_미팅준비/`).
- 프로젝트: 고속 ADC 데이터 수집·멀티센서 통합 보드 (턴키, 3,000만/90일/외주), 2ch 1MSPS Zero Packet Loss.

## 영업 자산화 가치 (mywiki 종합 허브 반영 후보)

1. **미팅 도달 lifecycle** — 위시캣활동.md 갱신 후보. 7/30 세션의 STM32H745 DAQ 자산(001 카드)이
   지원서 → 미팅 도달로 이어진 첫 사례. 자산 박제가 즉시 미팅으로 전환된 케이스.
2. **★ STM32N6 vs STM32H7 프로세서 선정 영업논리(재사용 자산)**:
   - 발주사 우대 "STM32N6 수준 듀얼코어 HW가속"은 개념 혼재 → 진짜 듀얼코어(M7+M4)=**H745**(우리 실적)가
     정확히 충족. N6=**단일 Cortex-M55+Neural-ART NPU**(AI추론용, 듀얼코어 아님, 내장 Flash 없음).
   - **무손실 수집 과제엔 NPU 불필요 → 검증된 H7 1순위** 논리. "상위단에서 데이터 어떻게 쓰나"가 결정축.
   - AI 가속 칩 논리(memory `feedback_ai_accel_application_class`)의 연장 — application class 판단 패턴.
3. **AFE 부품 short-list(계측/DAQ형 재사용)**: AD7606C-16(통합·리스크↓) vs ADS9224R+PGA(AD8253/LTC6912)
   +THS4551(성능↑) / 24bit=AD4630-24 / Σ-Δ=AD7768. 카메라 IF: H7 DCMI○·CSI×·UVC=상위호스트.

## 영향

- mywiki 측 `entities/위시캣활동.md` 미팅 도달 현황 갱신 가치 (진행 중 미팅: #157208 추가).
- 프로세서 선정 영업논리는 향후 "AI칩/MCU 선정" 요구 공고의 표준 카피로 재사용 가능.

## 후속 액션 (mywiki-claude)

- 위시캣활동 entity에 #157208 미팅 도달 반영 여부 판단 (Tier 2 후보, 3,000만).
- 프로세서 선정 논리를 영업전략/양산제품 entity에 자산화할지 판단.
- 미팅 결과(7/31 이후)는 본 vault에서 후속 카드로 회신 예정.
