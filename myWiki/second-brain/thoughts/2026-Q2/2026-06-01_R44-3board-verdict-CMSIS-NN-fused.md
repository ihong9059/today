---
title: R44 3-board KWS 양산 verdict + API 단위 가속 본질 = fused operation
type: thought
created: 2026-06-01
updated: 2026-06-01
tags: [thought, onDevice-AI, R44, R45, R46, CMSIS-NN, CMSIS-DSP, fused-operation, 양산verdict, BOM, INT8, 5중일치, AI-FanStick, esp32s3, pca10056, 가속가설검증framework]
links: [onDevice-ai, ai-fanstick, ai-direction, gaps, build-gotcha-inventory]
---

# R44 3-board KWS 양산 verdict + API 단위 가속 본질 = fused operation vs separate

## 사실 A — R44 esp32s3 + pca10056 양산 verdict

- 3-board 매트릭스 (PC float32 + esp32s3 INT8 + pca10056 plain C) 75.0% 일치
- esp32s3 Path B build PASS (507KB, PSRAM 불필요, DRAM 13KB)
- INT8 quantization 손실 0.00pp (per-tensor symmetric)
- 양산 결단: **esp32s3 메인 + pca10056 BLE 결합**

## 사실 B — R46 CMSIS-NN full FC 3.14× = R18 carry 3.23× 재현 ✅

- R18 carry CMSIS-NN MLP 3.23× → 본 모델 (1024→128→8) CMSIS-NN full FC 3.14× ✅
- **본질 finding**: pca10056 + CMSIS-NN ≈ esp32s3 plain C 동급 latency ($15 M4F + 가속 = $5 LX7 plain C)

## 사실 C — R45 CMSIS-DSP dot only negative (1.077× 미미)

- `CONFIG_CMSIS_DSP=y` + `CONFIG_CMSIS_DSP_STATISTICS=y` 명시 후 build OK
- plain C가 gcc 12.2 `-Os`에 이미 SMLAD vectorize 잘 됨 추정

## 새로운 판단 C — API 단위 가속 본질 = fused operation vs separate

A + B + C 종합:
- dot product 단독 = vectorizer 이미 잘 함 (CMSIS-DSP 1.077× = 미미)
- full FC = matmul + bias + requant **fused** = 3.14× (CMSIS-NN)
- 차이 = library 차이 본질 아님 (둘 다 SMLAD), **operation fusion** 본질

→ **API 단위 가속 평가 시 "fused vs separate" 본질 평가 의무**. 향후 NEON/SVE/AVX 가속 API 선택 시 동일 원칙.

## 행동 변화 D

1. **결정 21 BOM Path B-2 신설** — pca10056 단독 ~$16 K-POP 저가형 / OEM / 매스마켓 (AI FanStick 가격대 3층)
2. **결정 22 CMSIS-NN port 표준 = `arm_nn_vec_mat_mult_t_s8`** — vault weights `[out × in]` row-major 일관성 영구 자산 (R46-nrf1 filter_dims layout mismatch 우회)
3. **결정 23 가속 가설 검증 framework** — mandate Round 박제 시 H1/H2/H3 명시 + 결과 (적중 / 부분 / 미달) 박제, negative finding도 가치 (R45 → R46 동기)

## 5중 일치 75% — 양산 신뢰성 카피 결정타

| Layer | 환경 | 정확도 |
|---|---|---:|
| 1 | R26 PyTorch 원본 | 75.0% |
| 2 | R42 STM32 carry | 75.0% |
| 3 | R44 esp32s3 (plain C INT8) | 75.0% |
| 4 | R44 pca10056 (plain C) | 75.0% |
| 5 | R46 CMSIS-NN full FC | 75.0% (3.14× 가속) |

→ 강사양성 Day 5 사례 / 정부지원 결정타 자료: **"edge AI 모델 양산 path 4 layer 무손실 검증"**.

## 신규 함정 4건 (gaps.md 박제)

- **R46-nrf1** ⭐⭐ CMSIS-NN `arm_fully_connected_s8` filter_dims layout mismatch (영구 우회 자산)
- **R45** CMSIS-DSP sub-option Kconfig 명시 필수
- **esp32 #17** bootloader build.ninja race
- **esp32 #18** CMakeTestCCompiler 우회 (함정 #14 family 새 발현)
- **esp32 #19** Initialize-Idf.ps1 PythonCommand fail → export.ps1 대체

## 의미

본 mandate 진화는 **negative → positive 검증 사이클** 가치의 입증 사례. R45 negative finding이 R46 검증 동기를 부여하고, "library 차이 본질 ≠ API operation fusion 본질" 일반화를 도출. 향후 vault carry 박제 표준 패턴.

## 관련

- [[onDevice-ai]] § 6/1 R44/R45/R46 흡수
- [[ai-fanstick]] § BOM 3-path
- [[ai-direction]] § 결정 21~23
- [[gaps]] § R46-nrf1 + R45 + esp32 #17~19
