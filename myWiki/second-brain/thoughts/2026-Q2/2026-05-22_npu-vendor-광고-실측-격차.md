---
title: Vendor 광고 vs 실측 격차 — 벤치마크 우선 원칙
type: thought
created: 2026-05-22
updated: 2026-05-22 (Round 18 흡수 — LX7 5.64× M4F 단위 효율 우위 사례 추가, "instruction set design = 진짜 변수, clock speed/TOPS 광고 아님" 원칙 강화)
tags: [매칭패턴, NPU, 벤치마크, AI가속, 영업카피, 결정타, ISA, instruction-set, MCU-가속]
links: [onDevice-ai, ai-fanstick, uttec-stage-package, gaps, ai-direction, 위시캣활동, 강사양성_파일럿]
---

# Vendor 광고 vs 실측 격차 — 벤치마크 우선 원칙

> 사건: 2026-05-22 ondevice-claude Round 19 NNAPI 측정 결과 흡수.
> Samsung Galaxy A51 5G Eden NPU NNAPI 가 plain INT8 MLP 128~16384 전 범위에서 CPU Cortex-A77 + asimddp 대비 **79~421× 느림**.

## 결정타 데이터

| vendor 광고 | 실측 결과 (Round 19) |
|---|---|
| Samsung Eden NPU 2.1 TOPS | plain INT8 MLP 에서 CPU 대비 79~421× 느림 |
| "AI acceleration for mobile" | small dense layer 에는 dispatch overhead 가 compute 의 100× |
| "NNAPI standard interface" | NNAPI runtime 이 NPU 선택해도 실효 가속 없음 |
| "INT8 quantize 최적화" | NPU INT8 path 는 표준 ML model (MobileNet conv-dominant) 전용 |

## 일반화

**Vendor 광고 = best-case 기준** (표준 model + batch + fixed graph). 실제 application class 와 다르면 광고 가속이 손해로 뒤집힘.

**원칙**: 벤치마크 우선. 자체 측정 데이터 없이 vendor 광고 신뢰 X.

## 원칙 강화 — instruction set design = AI 가속의 진짜 변수 (2026-05-22 Round 18 흡수)

Round 18 (Cortex-M4F + CMSIS-NN SMLAD MLP 128 = **3.23×**) 측정으로 두 번째 데이터 포인트 확보. Round 17 (LX7 + ESP-DSP +13.4×) 와 클럭 normalize 비교:

| ISA | 클럭 | MLP 128 실측 | 클럭 normalize cycles | 단위 효율 |
|---|---|---:|---:|:-:|
| **LX7** (esp32s3) | 240MHz | 108μs (`dsps_dp_s8_aes3` 128-bit AI vector) | 25,920 | **5.64× 우위** ⭐ |
| Cortex-M4F (pca10056) | 64MHz | 2,285μs (CMSIS-NN SMLAD 32-bit DSP extension) | 146,240 | baseline |

→ **AI 가속의 진짜 변수 = instruction set design** (LX7 128-bit AI vector > M4F 32-bit SMLAD). clock speed (240 vs 64MHz, 3.75×) 만으로는 단위 효율 5.64× 우위 설명 못 함. vendor TOPS 광고는 instruction 폭 차이를 가림.

**원칙 일반화**:
1. **clock speed ≠ AI 가속 성능** — 동일 workload에서 ISA 단위 효율이 결정타
2. **TOPS 광고 ≠ application 성능** — TOPS는 best-case ALU throughput, application class와 매칭 안 되면 손해
3. **벤치마크 = ISA × workload × 메모리 계층 3조건 곱 검증** — Round 17/17.5 (ESP-DSP 3조건) + Round 18 (M4F SMLAD) + Round 19 (NPU 부적합) 종합 매칭 패턴

## 본 vault 의 다른 사례 (매칭 패턴 누적)

| 사례 | 광고 | 실측 |
|---|---|---|
| Eden NPU NNAPI (Round 19) | 2.1 TOPS / mobile AI acceleration | 79~421× 손해 (plain INT8 small dense) |
| Xtensa LX7 plain C (Round 9) | "AI 가속 chip" 마케팅 | ARM 9~38× 느림 (SIMD 미사용 시) |
| ESP32-C6 RISC-V (Round 10·11) | "동급 성능" | Xtensa LX7 과 클럭 normalize 시 동급, but PSRAM 없음 → 셀 한계 60% |
| **Cortex-M4F clock 64MHz (Round 18)** ⭐ | "DSP extension AI 가속" | CMSIS-NN +3.23× ✅ (Optimistic 적중), 그러나 클럭 normalize 시 LX7 5.64× 단위 효율 우위 — clock 단순 비교는 함정 |
| **nRF52832 64KB (Round 18 후속)** ⭐NEW | "Cortex-M4F + neural network frameworks 지원" (datasheet) | mandate MLP/CNN/TF 12/12 **전셀 RAM wall** — vendor "supports" ≠ practical fit. CMSIS-NN library 추가 시 static .bss 34KB / 64KB = 52% 차지, runtime heap < weights |
| 위시캣 #155381 본문 (5/17) | "임베디드 PLC 4축" | 실제 본문은 정밀제어 + GMC 코드 (매칭 갭) |

→ 모두 "광고 카피와 실측·실태 격차" 매칭 패턴. 본 thought 가 그 일반화. **Round 18 본편 + 후속 사례가 특히 미묘**: CMSIS-NN 가속 자체는 검증 ✅이지만, "clock 빠르니 단순 우위" 가정은 normalize 시 무너지고, "frameworks 지원" 광고는 RAM tier 적합도 별도 검증 필수.

### 원칙 강화 (5/22 후속) — vendor 광고 검증 SOP 3축

5/22 본편 + 후속 흡수로 vendor 광고 검증 SOP 3축 확립:

1. **application class 매칭** (R19): 광고 "AI 가속" 만으로 우위 단정 X — small dense vs large conv-dominant vs batch>1 등 사전 식별
2. **클럭 normalize 단위 효율** (R18 본편): 광고 clock speed / TOPS 단순 비교 X — instruction set design (ISA 단위 효율) 별도 검증
3. **RAM tier 적합도** (R18 후속): 광고 "frameworks 지원" 만으로 mandate fit 단정 X — 실제 sweep 측정 필수

→ **3축 모두 자체 측정 필요**. UTTEC 자산 Round 17·18·18후속·19 가 첫 사례. 위시캣 영업 SOP / 강사양성 Day 5 모듈 직접 적용.

## 적용처 (UTTEC 운영 5축)

### 1. 위시캣 영업 (사업 트랙)

클라이언트 "AI 가속 NPU 칩 사용" 요청 시 → 사전에 application class 확인 (small dense vs large conv-dominant) → NPU 부적합 시 CPU SIMD 또는 MCU DSP 가속 제안. 본 vault Round 17·18·19 데이터를 영업 자산으로 활용.

### 2. AI FanStick + Stage 4 패키지 (제품 트랙)

3계열 AI 가속 매트릭스 (LX7 ESP-DSP +13.4× / Cortex-M4F CMSIS-NN [예정] / Eden NPU **‒79~421×**) = mobile NPU 대비 MCU 가속 일관 우월. Stage 4 칩 선택 가이드 결정타.

### 3. 강사양성 파일럿 (교육 트랙)

Day 5 "AI 가속 비교" 사례에 Round 19 결과 추가. 수강생에게 "벤치마크 없이 광고 신뢰 X" 원칙 전달. obsidian 강의 시리즈 모듈 자산 후보.

### 4. REVITA (제품 트랙)

모바일 응용에서 NPU 가속 검토 시 본 패턴 적용. vendor SDK 광고와 실측 격차 사전 검증 강제.

### 5. uttecHome (영업 트랙)

회사 홈페이지 `entities/tech/ai.md` 에 "벤치마크 우선 원칙" 박제 — UTTEC 차별화 (자체 측정 데이터 기반 솔루션 제안).

## Stage 4 패키지에서의 칩 선택 가이드 진화

5/22 본 결정타 흡수로 칩 선택 가이드 결정 (Round 18 측정 완료로 **두 번째 행 [측정 예정] → +3.23× 정량 채움**):

| Application class | 권장 가속 | 정량 | 비고 |
|---|---|---|---|
| 응원봉 양산 (small/medium dense + batch=1 + INT8) | ESP32-S3 + ESP-DSP | **+13.4×** | Round 17 확정 (5/21) |
| **B2B 임베디드 (M4F + Bluetooth, KWS, anomaly detection)** | nRF52840 + CMSIS-NN | **+3.23×** ⭐NEW | **Round 18 확정 (5/22)** |
| Mobile T3 응용 (Android) | **CPU plain `-O2` asimddp** — NPU 사용 X | NPU 대비 79~421× 빠름 | Round 19 확정 (5/22) |
| 표준 CV (MobileNet 등 conv-dominant + batch>1) | Mobile NPU 가능 | (드문 케이스) | 별도 검토 |

## 강사양성·obsidian 시리즈 강의 자산 가치

본 결정타는 강의 모듈 자산 1순위 후보:

- **"광고 카피 신뢰 X — 벤치마크가 답이다"** 1시간 강의 모듈
- 데이터 출처: Round 19 NNAPI 측정 (정량 79~421× 손해)
- 자료: NNAPI Native API 사용법 + Eden NPU `createForDevices` 코드 + 측정 결과 표
- 영업 메시지 학습: 클라이언트 NPU 요청 시 application class 사전 확인 SOP

## 관련 페이지

- [[onDevice-ai]] § "Mobile NPU 부적합 case" — 측정 데이터 직접 참조
- [[ai-fanstick]] § "3계열 AI 가속 매트릭스" — 영업 카피 박제
- [[uttec-stage-package]] § "Stage 4 칩 선택 가이드" — 영업 의사결정 박제
- [[gaps]] § "Mobile NPU NNAPI 부적합 함정" — gotcha 박제
- [[ai-direction]] 판단 로그 2026-05-22 — decision 박제
- [[2026-05-20_esp32-arm-family-스펙트럼]] — 이전 매칭 패턴 (Round 1~11)
- [[2026-05-21_esp-dsp-3조건-매칭]] — Round 17.5 매칭 패턴
