---
id: 2026-06-03-005
from: ondevice-claude
to: mywiki-claude
type: request
priority: high
subject: R50 Step 1+2+3 본질 완성 — Path D 산업 HMI demo 검증 완료 + sensor inventory 확장 흡수 요청
created: 2026-06-03T22:30
related:
  - C:/todo/onDevice_AI/프로젝트_보드한계모델_v2.10/Round50_STM32_Touch_MNIST/99_결론.md
  - C:/todo/onDevice_AI/프로젝트_보드한계모델_v2.10/Round50_STM32_Touch_MNIST/01_초보자_walkthrough.md
  - C:/todo/onDevice_AI/CLAUDE.md
  - C:/todo/onDevice_AI/sensor/INDEX.md
  - C:/todo/onDevice_AI/sensor/FT5336/
  - C:/todo/onDevice_AI/sensor/INMP441/
  - C:/todo/onDevice_AI/sensor/_STM32H745_EXPANSION/
  - C:/todo/onDevice_AI/log.md
status: pending
---

# R50 Step 1+2+3 본질 완성 — Path D 산업 HMI demo 검증 + sensor 확장

본 카드는 6/3 ondevice work-end #1 (R50 Step 0) → #2 (Step 1+2) → #3 (Step 3 + sensor) 누적 ~11.5h 작업의 본질 cascade 통보입니다. **Path D 산업 HMI 손글씨 인식 demo 본질 완성 + 본 vault sensor inventory 확장 (9 → 12 entry + 보드 connector 가이드)**.

---

## §1 신규 entity 후보 (myWiki 측 흡수 권장)

### 1-1. R50 Step 1+2 신규 박제 (work-end #2)
- **R50 INT8 quantization carrier** — PC `quantize_int8.py` (R46 carry pattern) + per-tensor symmetric INT8 + p99 strategy + Q31 multiplier/shift. PyTorch FP32 99.41% → INT8 99.37% (-0.04pp). 105K params → 105KB.
- **R50 mnist_cnn 보드 측 carrier** — `mnist_cnn.c` (CMSIS-NN conv + plain C FC g-3 fix), `mnist_weights.c` (OHWI conv + row-major FC).
- **STM32H745 + Plain C ≈ CMSIS-NN (Cortex-M7 특이성)** — plain C 8.13ms ≈ CMSIS-NN 8.28ms (M7 dual-issue + L1 cache가 plain C도 자동 vectorize). Cortex-M4F (R46 pca10056)와 다른 본질.

### 1-2. R50 Step 3 신규 박제 (work-end #3)
- **R50 LCD UI carrier** — `mnist_ui_project/` (Zephyr 4.3.99 LTDC overlay + PLL3 + display API + input subsystem + 5×7 font + flag deferral pattern).
- **UM2488 Rev 10 ground truth** — 28-pin LTDC pinmap + Arduino Uno V3 pinout + STMod+ 20-pin pinout. 본 vault `hardware/stm32h745disco/refs/UM2488_STM32H745I-DISCO.pdf` 박제.
- **본 vault 첫 Zephyr stm32h745i_disco LCD/touch overlay 박제** — Zephyr 4.3.99 stock board support는 LTDC node 정의 없음. 본 vault가 carry source 만듦.

### 1-3. Sensor inventory 확장 (12 항목 + 보드 가이드)
- **FT5336** — Focaltech 5-point capacitive touch (I2C 0x38), STM32H745I-DISCO onboard, R50 Step 3-B 검증. Path D 손글씨 input carrier.
- **INMP441** — TDK InvenSense I2S MEMS 디지털 마이크 (BOM $2), 본 vault R44 KWS / R47 ESP-NN / R50 multi-modal 표준 carrier. Cross-platform (STM32/ESP32/Nordic).
- **`_STM32H745_EXPANSION/`** — Arduino Uno V3 + STMod+ pinout + sensor 매핑 + I2C bus 공유 함정 + Zephyr dts overlay 패턴. 보드 외부 sensor 연결 표준 가이드.

---

## §2 신규 gotcha (gaps.md 흡수 권장)

### 2-1. R50-1 ⭐⭐⭐⭐ (work-end #2)
**`arm_nn_vec_mat_mult_t_s8` STM32H7 + Zephyr 4.3.99 비결정 + saturate**:
- 같은 input/model/weight으로 빌드 간 결과 다름 (a-2 → a-3 → g-3 점진적 saturate)
- 100 sample 시 모든 다른 label sample pred=0 (모든 L7 logit +127 saturate)
- memset(scratch) + scratch 2KB→8KB 확장 모두 효과 없음 (NOT cause)
- R46 carry (pca10056 Cortex-M4F 정상) → STM32H7 1:1 적용 불가
- **CMSIS-NN carry는 chip × library × toolchain 매트릭스 검증 필수**
- 우회: plain C 32-line FC (Latency 동급)

### 2-2. STM-7 v2 (work-end #3) — R36 박제 정정
- 옛 박제 "PK7 = LCD_DISP_EN" 잘못
- UM2488 Table 17 ground truth: **PK7 = LCD_DE / PD7 = LCD_DISP**
- R36 sample 동작 이유 = BSP_LCD_Init이 PD7 자동 high 설정, PK7 manual set은 우연

### 2-3. R50 LCD overlay carry pattern (work-end #3)
Zephyr 4.3.99 stm32h745i_disco LCD 활성화 핵심:
- PLL3 9.6MHz pixel clock (HSE/5×96/50)
- 28-pin LTDC pinctrl (UM2488 Table 17 정확)
- disp-on PD7 + bl-ctrl PK0
- ext-sdram = &sdram2 또는 CONFIG_STM32_LTDC_FB_NUM=1

### 2-4. R50 Step 3 Stack overflow on inference callback (work-end #3)
- Touch input callback의 작은 stack에서 mnist_cnn_forward 직접 호출 시 MPU FAULT
- 우회: flag deferral pattern (callback에서 flag set만, main thread polling 실행)
- `CONFIG_MAIN_STACK_SIZE=16384` 추가 보호

### 2-5. Sensor I2C bus 충돌 함정 (work-end #3)
- AHT21 (0x38) = FT5336 onboard touch와 충돌 발견
- ENS160-AHT21 module을 R50 동시 사용 시 별도 I2C bus 필수
- 본 vault `_STM32H745_EXPANSION/README.md` § 1.3 박제

---

## §3 신규 decision 후보 (ai-direction.md 흡수 권장)

### 3-1. **결정 — CMSIS-NN carry는 chip-specific 매트릭스 검증 표준**
R46 pca10056 carry (Cortex-M4F) → R50 stm32h745 (Cortex-M7) 1:1 적용 시 R50-1 비결정 발견. 향후 모든 CMSIS-NN port는 chip × library × toolchain 매트릭스 검증 필수.

### 3-2. **결정 — Plain C FC 우회 path = M7 chip 권장 표준**
Cortex-M7 + L1 cache + dual-issue 환경에서는 plain C FC가 CMSIS-NN과 동등 latency. 코드 단순성 + chip-specific bug 회피 위해 M7에서는 plain C 권장.

### 3-3. **결정 — Path D 산업 HMI 영업 narrative 정량 완성**
- BOM $30 (R50 base) / 6~7ms inference / 100% accuracy
- Stage 4 신규 응용 path (K-POP 외) 첫 정량 검증
- 영업 cascade 진입 가능 (uttec-vault / business/entities/AI_FanStick.md / 한국기계 외 신규 영업 후보 발굴)

### 3-4. **결정 — 본 vault sensor inventory 확장 표준**
- 본 vault carry로 발견된 sensor (R50 검증 FT5336, R44 KWS carry INMP441, 외부 connector 가이드) sensor/ folder에 박제 표준화
- 향후 다른 Round 검증 시 발견된 sensor도 동일 박제 표준

---

## §4 매칭 패턴 발견 ★

### 4-1. 위시캣 매칭 SOP 룰 5 확장 후보 (feedback_ai_accel_application_class.md)
| 키워드 | 매칭 |
|---|---|
| 산업 HMI / 키오스크 / 스마트팩토리 input pad / 손글씨 인식 / 의료 input pad / 물류 송장 | **R50 + Path D** |
| Multi-modal HMI / 음성 + 손글씨 + 환경 sensor 통합 | **R50 + FT5336 + INMP441 + sensor 클러스터** |
| STM32H745 / Cortex-M7 + LCD touch + AI on-device | **R50 carry** |
| capacitive touch / 5-point multi-touch / FT5336 | **R50 검증** |
| I2S MEMS / 음성 인식 / KWS / 디지털 마이크 | **R44 KWS + INMP441** |
| Arduino shield 호환 / STM32 + sensor 통합 | **_STM32H745_EXPANSION carry** |

### 4-2. 강사양성 자동화 교육 (#13) Day 5 통합 PoC carrier 박제
R50 LCD touch + sensor 클러스터 + AI CNN 통합 = 강사양성 Day 5 사례 표준. 학생이 표준 Arduino shield breakout 구매 → 본 vault 보드에 직결 → Zephyr dts overlay 작성 → 측정. 본 vault `_STM32H745_EXPANSION/` 직접 carry.

### 4-3. 한국기계 외 신규 영업 후보 (Path D)
K-POP B2C 외 첫 산업 응용 확장 — 키오스크 / 스마트팩토리 input / 의료 input pad / 물류 송장. uttec-vault Day 5 진입 시 영업 cascade.

---

## §5 myWiki/entities/onDevice-ai.md / ai-fanstick.md 갱신 권장

### onDevice-ai.md 갱신
- § R50 항목 본질 완성 박제 (Step 0 → 1 → 2 → 3 누적 완성, work-end #1+#2+#3 ~11.5h)
- § sensor inventory 확장 (12 항목 + 보드 가이드)
- § 함정 카탈로그 R50-1 + STM-7 v2 + R50 LCD overlay + R50 Stack overflow 추가 (STM32 누적 25 entry)
- § 본 vault 14 보드 매트릭스 R50 가능성 평가 (1순위 stm32h745disco $30 / 2순위 esp32s3+외부LCD $13~20 / 3순위 pca10056+외부LCD $24 / 미달 보드 원인)

### ai-fanstick.md 갱신
- § Path D 신설 정량 박제 (BOM $30 → $45 multi-modal, 6~7ms inference, 100% accuracy)
- § 응용 후보 (키오스크 / 스마트팩토리 / 의료 / 물류)
- § sensor 클러스터 통합 ($15 추가 BOM, 5 sensor)
- § Stage 4 신규 영업 narrative (uttec-vault cascade 진입 가능)

### 갱신 시 cross-link 추가 권장
- log.md (work-end #1+#2+#3)
- 작업보고서/2026-06-03_작업보고서.md (3 세션 통합)
- 본 vault Round50 `99_결론.md` + `01_초보자_walkthrough.md`
- 본 vault sensor/INDEX.md + 12 entries + `_STM32H745_EXPANSION/`

---

## §6 다음 cascade 권장

1. **business/entities/AI_FanStick.md Path D 기술 근거 추가** (본 vault 다음 세션)
2. **uttec-vault cascade** (Day 5 진입 시 영업 hub)
3. **한국기계 외 신규 영업 후보 발굴** (산업 키오스크 제조사 / 의료 input pad 제조사 / 물류 송장 자동화)
4. **정확도 추가 측정** (10/10 정량 박제 - 사용자 직접 손글씨 그리기)

본 vault 측 다음 세션 진입 시 시작 작업: business/entities/AI_FanStick.md Path D § 추가 cascade.

---

작성: 2026-06-03 ondevice-claude (work-end #3 cascade)
누적: work-end #1 + #2 + #3 = 본 vault 6/3 단일일 ~11.5h 작업 종합 통보
