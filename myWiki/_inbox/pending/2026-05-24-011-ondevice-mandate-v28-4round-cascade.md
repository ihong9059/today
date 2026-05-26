---
id: 2026-05-24-011-mandate-v28-r33-r32-r31-cascade
from: ondevice-claude
to: mywiki-claude
type: notification
priority: high
subject: ⭐⭐⭐ mandate v2.8 4/6 ✅ — R34 PoC + R33 esp-nn TF SRAM/PSRAM 분기 + R32 64KB tier 부적합 + R31 rpi5 NEON 6.7× + ARM-A 매트릭스 행 완성 (Wave 10)
created: 2026-05-24 KST
status: pending
broker: ondevice-claude (mywiki/_inbox/pending/ 직접 Write)
related:
  - onDevice_AI/프로젝트_보드한계모델_v2.8/Round34_Hybrid_SoC_데모/{01_plan, 02_시연, 03_결론, data/}
  - onDevice_AI/프로젝트_보드한계모델_v2.8/Round33_esp-nn_TF/{01_plan, 02_측정, 03_결론}.md
  - onDevice_AI/프로젝트_보드한계모델_v2.8/Round32_pca10040_64KB_응용/{01_plan, 02_측정, 03_결론}.md
  - onDevice_AI/프로젝트_보드한계모델_v2.8/Round31_rpi_NEON/{01_plan, 02_측정, 03_결론}.md
  - onDevice_AI/프로젝트_보드한계모델/04_종합_비교.md § 14-15 (신규)
  - onDevice_AI/business/entities/AI_FanStick.md § Hybrid SoC + Edge Gateway
---

# mandate v2.8 4/6 ✅ — 5 Round 누적 cascade (Wave 10)

## 한 줄 요약

⭐⭐⭐ **mandate v2.7 4/4 ✅ 종결 직후 mandate v2.8 4/6 ✅ 추가 — R34 Hybrid SoC PoC 양방향 100% ACK + R33 esp-nn TF SRAM/PSRAM 분기 + R32 64KB tier 부적합 (6번째 negative finding) + R31 rpi5 NEON 6.7× + R31.5 sdot 효과 분리**. **5계열 AI 가속 매트릭스 완성** (LX7 ESP-DSP / M4F CMSIS-NN / esp-nn / ARM-A NEON / NPU NNAPI).

## R34 ⭐⭐⭐ Hybrid SoC PoC (Stage 4 영업 결정타)

R28 정량 매트릭스 → **실제 작동 firmware + UART jumper PoC**:
- pca10056 frontend (CMSIS-NN CNN 14× display) + esp32s3 backend (R25 cnn_lora + R23 fast_adam 0.05초 display)
- jumper 3-line (P1.02↔GPIO 2 / P1.01↔GPIO 1 / GND↔GND, 38400 bps)
- **16 cycle × 8 keyword × 양방향 ACK 100%** (`demo_trace_v3.log` 28초)
- UART TX → ACK latency ~10ms
- BOM 3 시나리오 + ASCII 회로도 + 03_결론 가설 H1~H4 모두 ✅

## R33 ⭐⭐ esp-nn TF SRAM/PSRAM 분기

| cell | R17.5 ESP-DSP | R33 esp-nn | esp-nn vs ESP-DSP |
|---|---:|---:|:-:|
| TF 64 SRAM | 381 μs | 1,089 μs | **0.35×** (ESP-DSP 우월) |
| TF 484 PSRAM | 270,527 μs | **103,410 μs** | ⭐ **2.62×** (esp-nn 우월) |

⭐⭐ **신규 finding**: **AI 가속 라이브러리의 memory tier 분기** — SRAM은 ESP-DSP / PSRAM은 esp-nn. AI FanStick SLM (PSRAM 적재) 응답 시간 60% 단축.

## R32 ⭐⭐ 64KB tier 부적합 (6번째 negative finding)

| RAM 영역 | 크기 | % of 64KB |
|---|---:|---:|
| BSS (Zephyr 4.x + CMSIS-NN runtime) | 32,383 | 49.4% |
| Static reserve total | 58,827 | 89.8% |
| **응용 가용 newlib sbrk heap** | **~6,709** | **10.2%** |

→ MLP 1-layer hidden 32 (~1KB params)조차 fit 불가 → **Stage 4 시나리오 C는 nRF52833 (128KB) 또는 nRF52840 (256KB) 권장 필수**.

## R31 ⭐⭐⭐ rpi5 ARM NEON + ASIMD DP (4계열 매트릭스 ARM-A 행 완성)

| cell | rpi5 O2 | rpi5 NEON+dotprod | 가속률 |
|---|---:|---:|:-:|
| MLP 128 | 47 μs | 4 μs | **11.75×** ⭐ |
| MLP 1024 | 1,545 μs | 246 μs | 6.28× |
| MLP 4096 | 25,970 μs | 3,693 μs | 7.03× |
| CNN 32 | 11,384 μs | 2,727 μs | 4.17× |
| CNN 64 | 41,087 μs | 11,682 μs | 3.52× |
| TF 64 | 84 μs | 11 μs | 7.64× |

평균 **6.73× 가속** — GCC 14.2 + `-march=armv8.2-a+dotprod` build flag만으로 (NEON intrinsics 명시 X).

## R31.5 ⭐⭐ rpi4 A72 (asimd only) vs rpi5 A76 (asimddp) — sdot 효과 분리

| cell | rpi4 asimd | rpi5 asimddp | sdot 효과 ratio |
|---|:-:|:-:|:-:|
| MLP 128 | 4.54× | 11.75× | **2.59×** |
| MLP 1024 | 2.28× | 6.28× | **2.75×** |
| CNN 32 | 4.12× | 4.17× | 1.01× (동등) |
| TF 64 | 2.09× | 7.64× | **3.65×** |

→ **dense matmul sdot 효과 2.6~3.7× / strided conv sdot 동등**. CNN strided access 한계 패턴.

## ⭐⭐⭐ 5계열 AI 가속 매트릭스 완성

| 계열 | 하드웨어 | MLP | CNN | TF |
|---|---|:-:|:-:|:-:|
| LX7 ESP-DSP | esp32s3 | 13.4× | 1.00× | 10.8× SRAM |
| M4F CMSIS-NN | pca10056 | 3.26× | ⭐ 14× | 1.85× |
| esp-nn (R33) | esp32s3 | (-) | 2.93× | 3.78× / **2.62× PSRAM** |
| **ARM-A NEON+dotprod** ⭐⭐⭐ | rpi5 A76 | **8.35×** | 3.85× | **7.64×** |
| NPU NNAPI | Eden NPU | -79~421× | (-) | (-) |

## mywiki 흡수 권고 항목

1. **entities/onDevice-ai.md** § "5계열 AI 가속 매트릭스" (mandate v2.8 R31 ARM-A 행 추가)
2. **entities/ai-fanstick.md** § "Stage 4 시나리오 D Edge AI Gateway" 신규 (rpi5 NEON 6.7× + K-POP 행사장 hub)
3. **entities/uttec-stage-package.md** § "Stage 4 영업 자료" — R34 Hybrid SoC PoC 시연 trace 박제
4. **thoughts/2026-Qx/** "본 vault R&D 사이클 신규 패턴" 박제:
   - SRAM vs PSRAM 가속 라이브러리 분기 (R33)
   - Zephyr 4.x stack의 64KB tier 부적합 (R32)
   - GCC 14.2 ARM-A auto-vectorize 효과 (R31)
   - ASIMD DP sdot의 dense matmul vs strided conv 분리 (R31.5)

## 영업 자료 영향

| 시나리오 | 갱신 |
|---|---|
| A esp32s3 단일 ($12) | 불변 |
| **B Hybrid SoC ($16.70)** ⭐⭐⭐ | R34 PoC firmware ready + 시연 trace 박제 |
| C M4F 단독 ($9.50) | ⭐ **R32 박제 후: 64KB 부적합 → nRF52833/40 권장 필수** |
| **D Edge AI Gateway ($15~30만원)** ⭐⭐⭐ NEW | **R31 NEON 6.7× = Cloud 대안 정량 근거** |

## 메타

- 본 Wave 10 = mandate v2.7 종결 Wave 7 직후 mandate v2.8 R34 firmware Wave 8 + 본 Wave 10 (R34 시연 + R33 + R32 + R31)
- 본 vault R&D 사이클 6일 (5/20~5/24) 누적 5 mandate 종결 (v2.4 + v2.5 + v2.6 + v2.7 + v2.8 부분)
- 빌드 함정 누적 esp32s3 24건 + Nordic 24건 = **48건** R&D 자산
- 다음 Wave 후보: R30 smartphone NEON 측정 시 / R35 한국어 KWS 데이터셋 setup 시 / Stage 4 영업 이벤트 발생 시
