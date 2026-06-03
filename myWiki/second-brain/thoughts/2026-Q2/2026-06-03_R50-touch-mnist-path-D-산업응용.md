---
title: R50 Touch MNIST PoC → AI FanStick Path D 산업 응용 신설 + 위시캣 cluster 자동 매칭
type: thought
created: 2026-06-03
updated: 2026-06-03
tags: [R50, Touch-MNIST, Path-D, 산업응용, 키오스크, HMI, 의료input-pad, 5계열매트릭스-응용진입, ondevice-cross-vault]
links: [onDevice-ai, ai-fanstick, ai-direction, gaps, 위시캣활동, 영업전략, 강사양성_파일럿, stm32h745-disco, 의료AI, uttec-vault]
---

# R50 Touch MNIST PoC → AI FanStick Path D 산업 응용 신설 + 위시캣 cluster 자동 매칭

## 흡수 출처

ondevice-claude 카드 `_inbox/processed/2026-06-03-001-ondevice-r50-step0-pass-99pct.md`.

## 본질 — 4단계 깊이 진화의 마지막 단계 도달

본 vault 임베디드 AI on-device 영업 자산의 단계적 진화:

| 단계 | 시기 | 본질 | 대표 Round |
|:-:|---|---|---|
| 1 | 5월 ~ | **측정** (single cell, plain vs SIMD) | R9, R15 |
| 2 | 5/22~24 | **매트릭스** (3계열 → 5계열 AI 가속) | R17~36, mandate v2.5~2.10 |
| 3 | 5/24~30 | **통합** (Hybrid SoC firmware 실작동, 3-board 양산 verdict) | R34, R44 |
| 4 ⭐ NEW | **6/3** | **응용** (LCD + touch + AI 통합 PoC, 실 산업 input pad narrative) | **R50** |

**의미**: 측정→매트릭스→통합 3단계까지는 "본 vault R&D 차별화"로 영업 가능했으나, **응용 단계 진입은 외부 고객이 직접 가치 체감 가능한 형태**. R50 결과 = $30 BOM 단일 chip에 LCD + touch + AI 통합 + 99.41% PC sanity → 키오스크/HMI/의료 input pad 영업 자료 정조준.

## A + B → C 패턴 (복리 인사이트)

| A (사실) | B (사실) | → C (새로운 판단) |
|---|---|---|
| R36 STM32H745 + CMSIS-NN CNN 17.58× 가속 (5/27) | LCD + touch BSP는 Wave 12/13에서 단일 chip 검증 (5/25~26) | **단일 chip에 CNN + LCD + touch 통합 PoC 가능** = R50 진입 결단 (6/3) |
| R26 KWS personalization 0.37초 (5/24) | R34 Hybrid SoC firmware 실작동 (5/24) | 임베디드 AI on-device 통합 PoC 가능 단계 도달 |
| R50 99.41% PC sanity (6/3) | 위시캣 catch-up에 키오스크/HMI 일감 정기 출현 | **위시캣 키오스크/HMI cluster 자동 매칭 SOP 가치 입증** (영업 자료 정조준) |

## 결단 영향 (cross-vault cascade)

### onDevice_AI 측 (ondevice-claude 자율)

- R50 Step 1~5 carry: calibrate_int8 → CMSIS-NN port → BSP touch + LCD → stroke normalize → 99_결론 + cascade
- 보드 INT8 ≥95% 목표 (Step 1~3 이후 확정)

### AI FanStick 측 (본 vault)

- **BOM 4-path 양산 자산** 확장: A $25 (K-POP) / B $31 (Premium) / B-2 $16 (저가) / **D $30 (산업 응용 NEW)**
- 영업 자료 cascade: Step 5 종결 시 산업 input pad narrative 패키지 작성 후보

### 위시캣 측 (wishket-claude 향)

- 매칭 키워드 자동 트리거 신설 (`feedback_ai_accel_application_class.md` 룰 5 candidate, wishket-claude 측 결단 carry)
- "키오스크 AI / HMI 손글씨 / 의료 input pad / STM32 LCD touch / Cortex-M7 LCD" 인지 시 Path D 영업 자료 자동 매칭

### 강사양성_파일럿 측

- Day 5 모듈에 R50 통합 PoC 추가 후보 (R26 KWS + R34 Hybrid SoC + R36 STM32H745 + R50 LCD touch 누적)
- 단, [[uttec-vault]] 위치 메모리 5/23 박제 후 변경 가능 (`C:\todo\today\` 아래 없음, ondevice-claude 통보) — 사용자 확인 후 Day 5 cascade 재개

### 의료AI 측 (잠재 cross-link)

- 의료 input pad 영업 진입 시 IEC 62304 인증 트랙 분리 필요 (인증 매니지먼트 §12 carry 적용 패턴)
- [[의료AI]] entity 갱신 후보 (사용자 결단 시)

## 부수 자산 — cross-shell 환경 함정 인벤토리

R50 setup 단계 발견:
- **bash backslash Windows path escape** (`mkdir C:\r50_proj` → `Cr50_proj` invisible-char dir)
- **PyTorch 환경 박제** (Python 3.13 sandboxed vs 3.14 Programs, `where pip` 사전 확인)

→ ESP32 #14 family (Windows cmd cwd reset) + NCS 빌드 함정과 결합. **cross-shell 환경 함정 인벤토리 단일 패턴 가치** = 강사양성 Day 5 + 위시캣 견적 견적 차별화 영업 자산. 자세히 [[gaps]] § 2026-06-03.

## 응답 요청 (ondevice 측 회신 카드 발송)

- mywiki entity 흡수 후 ACK 카드 회신 (본 vault `_inbox/pending/`로) → 본 흡수 완료 시점 발송
- §4 매칭 패턴 발견 시 추가 카드 발신 (위시캣 키오스크 일감 검색 / 강사양성 사례 정리 / **uttec-vault 위치 확인**)
- §5 권장 갱신 완료 시 통보 (onDevice-ai.md + ai-fanstick.md 모두 prepend 완료)

## 후속 트리거 (carry)

| 트리거 | 행동 |
|---|---|
| R50 Step 1 완료 (CMSIS-NN port) | onDevice-ai entity 갱신 + ai-fanstick Path D row "보드 INT8 X%" 정량 채움 |
| R50 Step 5 종결 (영업 cascade) | ai-fanstick Path D 영업 자료 패키지 신설 + 위시캣 매칭 키워드 안정화 |
| 위시캣 키오스크/HMI 일감 첫 매칭 | feedback_ai_accel_application_class.md 룰 5 박제 / 본 thought § 응답율 검증 추가 |
| uttec-vault 위치 사용자 확인 | 강사양성_파일럿 Day 5 R50 추가 cascade 재개 |
| 의료 input pad 영업 진입 | 의료AI entity 인증 트랙 분리 carry |
