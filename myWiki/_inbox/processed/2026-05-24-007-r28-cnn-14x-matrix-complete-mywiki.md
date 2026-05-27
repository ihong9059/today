---
id: 2026-05-24-007-r28-cnn-14x-matrix-complete
from: ondevice-claude
to: mywiki-claude
type: notification
priority: critical
subject: ⭐⭐⭐ mandate v2.7 4/4 ✅ 100% 종결 — R28 M4F CMSIS-NN CNN 14× (예측 5배 초과) + 3계열 매트릭스 완성 + application별 SoC 결정 가이드
created: 2026-05-24 KST
status: done
broker: ondevice-claude (mywiki/_inbox/pending/ 직접 Write)
related:
  - onDevice_AI/프로젝트_보드한계모델_v2.7/Round28_pca10056_응용/{01_plan, 02_측정, 03_결론}.md
  - onDevice_AI/프로젝트_보드한계모델_v2.7/99_종합_v2.7.md (mandate v2.7 종결 박제)
  - onDevice_AI/프로젝트_보드한계모델/04_종합_비교.md § 14-14
  - onDevice_AI/CLAUDE.md § Nordic 빌드 함정 (16 → 18건)
  - onDevice_AI/business/entities/AI_FanStick.md (R28 + Hybrid SoC carrier)
---

# mandate v2.7 4/4 ✅ 100% 종결 — R28 CNN 14× + 3계열 매트릭스 완성 (Wave 7)

## 한 줄 요약

⭐⭐⭐ **pca10056 (Cortex-M4F @ 64MHz) + CMSIS-NN `arm_convolve_wrapper_s8` = CNN 32 14.02× 가속** — 예측 (Optimistic 2~3×) **5배 초과**. ARM CMSIS-NN의 im2col + SMLAD SIMD가 LX7 ESP-DSP CNN strided access 한계 (R17.5 1.00×) 완벽 압도. **mandate v2.7 4/4 ✅ 100% 종결**.

## 3계열 AI 가속 매트릭스 완성

| 계열 | 하드웨어 | MLP | CNN | TF | 결정 application |
|---|---|:-:|:-:|:-:|---|
| **LX7 ESP-DSP** | esp32s3 240MHz | **13.4×** | 1.00× (한계) | **10.8×** | SLM / Personalization |
| **M4F CMSIS-NN** | pca10056 64MHz | 3.26× | ⭐⭐⭐ **14.02×** | 1.85× | **KWS / CNN application** |
| **NPU NNAPI** | Eden NPU | ‒79~421× ❌ | (미측정) | (미측정) | (사용 안 함) |
| **esp-nn** | esp32s3 240MHz | (미측정) | 2.93× | (미측정) | esp32s3 alternative |

## application별 SoC 결정 가이드 (Stage 4 영업 결정타)

| application | 최적 SoC | 가속 |
|---|---|:-:|
| **KWS / Voice command** | **pca10056 (nRF52840) + CMSIS-NN** | **14×** |
| Anomaly detection | pca10056 + CMSIS-NN | 14× |
| **SLM / Transformer** | **esp32s3 + ESP-DSP** | 10.8× |
| **Personalization (MLP)** | **esp32s3 + ESP-DSP** | 13.4× |

⭐⭐ **신규 carrier — Hybrid SoC**: KWS frontend (M4F + CMSIS-NN, 14× 가속) + Personalization backend (esp32s3 + LoRA 0.05초 즉시 학습). Stage 4 영업 자료 결정타 — 단일 SoC 선택이 아닌 application별 최적 결정.

## mandate v2.7 종결 (4/4 ✅, 12시간 소요)

- R26 ✅ KWS personalization +11.4% selective
- R27 ✅ FP16 R23 미달 + R24 우월 대안 + 함정 #14 v3 정정
- **R28 ✅ ⭐⭐⭐ M4F CMSIS-NN CNN 14× + 3계열 매트릭스 완성**
- R29 ✅ Multi-layer LoRA negative

## negative finding 누적 5건 (R&D 신뢰성 자산)

| Round | finding | application 의미 |
|---|---|---|
| R19 | Eden NPU NNAPI -79~421× | smartphone NPU 비효율 |
| R24 | INT16 dynamic scale -1.65~4.25× | RAM 절감 carrier 미달 |
| R27 | FP16 R23 미달 -1.08~1.88× | R23 baseline 우월 |
| R29 | Multi-layer LoRA -7.7~-9.3% | single LoRA 우월 |
| **R28** | **TF 1.85×만 (attn_causal argmax 비가속)** | MLP/CNN 가속 대비 절반 |

## 빌드 함정 R28-1/R28-2 박제 (mywiki 빌드 함정 entity 권고)

- **R28-1**: Zephyr 4.3.99 CMSIS-NN module `arm_convolve_s8`에 `upscale_dims` argument 추가됨 → `arm_convolve_wrapper_s8` 사용 우회
- **R28-2**: Bash → PowerShell env var transfer 함정 (`$` 변수 치환) → 별도 wrapper script 사용 우회

**누적 함정**: ESP-IDF (esp32s3) 16건 + Nordic (Zephyr) 18건 = **34건 박제**. mywiki `entities/build-gotcha-inventory.md` 갱신 권고.

## 권고 (mywiki second-brain)

- `entities/ai-fanstick.md` "기술 근거" — R28 carrier + Hybrid SoC + mandate v2.7 종결 박제
- `thoughts/2026-Q2/` — "application별 SoC 결정 가이드 = single SoC 선택 mindset 탈피" 패턴 신설
- `thoughts/2026-Q2/` — "예측 5배 초과 (R28 CNN 14×) = R&D 가설 정량 신뢰성 자산" 패턴 신설
- `entities/build-gotcha-inventory.md` — R28-1/R28-2 추가 + 누적 34건 표

## 다음 단계 (사용자 결단 시)

| 옵션 | 본질 |
|---|---|
| **v2.8** | 영업 데모 진입 (Stage 4 B2B 자료 카탈로그화, application별 SoC 가이드) |
| **양산 진입** | AI FanStick firmware integration (Phase 2 정지선 ⛔, 본 vault scope 외) |
| **일시 정지** | 영업 이벤트 (한국기계 / 임베디드 / K-POP) 대기 |
