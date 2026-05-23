---
title: AI FanStick (응원봉)
type: entity
created: 2026-04-19
updated: 2026-05-23 야간 (Round 21 esp-nn CNN 2.93× 흡수 — 차세대 firmware stack 확정 / KWS wake word 547ms → 187ms / 3계열 매트릭스 CNN 행 채움)
tags: [프로젝트, 제품, 특허, 블루오션, 정지선, 창업프로젝트, onDevice-검증완료, 차세대-S3-DSP, 양산방향-재전환, 3계열매트릭스완성]
links: [ai-direction, experience, me, projects, skills, strengths, onDevice-ai, oldProject, 2026-05-08_응원봉-온디바이스AI-정지선, 2026-05-09_이진서협업-창업프로젝트도전, 2026-05-20_esp32-arm-family-스펙트럼, 2026-05-21_esp-dsp-3조건-매칭, 2026-05-22_npu-vendor-광고-실측-격차]
---

# AI FanStick (응원봉)

## 한 줄 정의
AI 음성 비서 + LED 응원봉 + BLE 통합 제품. K-POP 1.5억+ 팬덤 타겟. **특허 출원 완료.**

## 2026-05-23 야간 — 차세대 firmware stack 확정 ⭐⭐ (Round 21 esp-nn CNN 흡수)

| 응용 | 라이브러리 | 칩 | 가속배 | Round |
|---|---|---|:-:|:-:|
| 칩 교체 (baseline) | — | C3 → S3 | **+1.84×** | R15 |
| MLP Dense (Korean-Small SLM) | ESP-DSP | ESP32-S3 LX7 | **+13.4×** | R17 |
| **CNN Conv2D (KWS wake word)** ⭐ | **esp-nn** | ESP32-S3 LX7 | **+2.93×** | **R21** |
| TF Attention+MLP SRAM | ESP-DSP | ESP32-S3 LX7 | **+10.8×** | R17.5 |

**종합 가속**:
- MLP: **24.8×** (1.84 × 13.4)
- CNN: **3.19×** (1.09 × 2.93, 칩 교체 + esp-nn)
- TF: **19.1×** (1.84 × 10.8)

**UX 결정타**: KWS wake word 응답 **547ms → 187ms** (3× 단축) — 사용자 체감 직결 영업 카피.

## 왜 중요한가
- 블루오션 확인: BTS ARMY Bomb, SM Beyond Live, PixMob 모두 AI 통합 없음
- [[ai-direction|AI 방향]]에서 "AI + 하드웨어 제품화"의 첫 사례
- 2주 만에 리서치→MVP→특허까지 완료 — [[strengths|실행 속도]] 증명

## 현재 상태
- MVP 코드 완성 (ESP32-C3 + BLE + Android + FastAPI)
- 특허 출원 문서 작성 완료 (7개 다이어그램)
- 마케팅 이미지 프롬프트 21개 (Midjourney/DALL-E)
- 사용설명서 v2.1

## 기술 스택
- ESP32-C3: WS2812 RGB LED + BLE
- Android: Kotlin/Compose + Retrofit
- 서버: FastAPI + Gemini 2.0 Flash + GPT-4o-mini (듀얼 AI)
- BLE 통신: 텍스트 입력 + WebSocket 재연결

## 타임라인
| 날짜 | 마일스톤 |
|------|---------|
| 2/12 | 컨셉 + 시장 조사 시작 |
| 2/16 | 마케팅 이미지 프롬프트 21개 |
| 2/21 | 사업 계획서 |
| 2/24 | 작동 원리 상세 문서 |
| 2/25 | MVP 전체 코드 완성 |
| 2/27 | 특허 출원 문서 완성 |
| 4/17 | 앱 개선 (텍스트 입력, WebSocket) |

## 양산 방향 진화 (2-Stage)

### 1차 잠금 (2026-05-08, 폐기됨)

응원봉 양산은 **"스마트폰 Gemma 2B + Cloud Gemini 하이브리드"**로 방향 고정. 응원봉 본체는 BLE 명령 수신·LED 제어만.

근거 (당시):
- newMvp/온디바이스_AI_검토서(2026-02-27) §10 결론과 일치
- onDevice_AI(2026-05-08) microGPT 4K 파라미터 = 응원봉 사용자 기대 응답 품질에 6~7자릿수 미달
- 양산 칩 교체(ESP32-C3 → ESP32-S3-N16R8) +1,500원/대 = 5만 대 +7,500만 BOM, 사용자 가치 미입증

### 2차 재전환 ⭐⭐⭐ (2026-05-20, 현재)

Round 17 결정타 (ESP-DSP `dsps_dp_s8_aes3` 활성 시 MLP 13.4× / C3→S3+DSP 24.8×) + Round 11 (PSRAM 결정타) + Round 17.5 (TF 10.8× / CNN 별도 가속) 누적으로 **5/8 결정 뒤집힘**:

| 단계 | ESP32-C3 (양산) | ESP32-S3 + DSP (차세대) | 우위 |
|:-:|---:|---:|:-:|
| 1. 단순 칩 교체 (plain C) | 2,677us | 1,452us | 1.84× |
| 2. **+ ESP-DSP intrinsics** | 2,677us | **108us** | **24.8× ⭐⭐⭐** |
| 3. + PSRAM Korean-Small 154K | (적재 불가, 400KB SRAM) | **~150ms 추정** | 양산 가능 |

→ **차세대 양산 = ESP32-S3-N16R8 + ESP-DSP + PSRAM SLM**
→ **사용자 가치 입증됨**: "외부 인터넷 0% 음성 명령" + 응답 ~150ms 자연스러움
→ **BOM 수용**: C3 $1.5 → S3-N16R8 $5~6 (3~4×). K-POP Premium 5~10만원 가격대에서 흡수 가능

자세한 정지선 (1차): [[2026-05-08_응원봉-온디바이스AI-정지선]]
1차 자료: `응원봉/마케팅검토/2026-05-08_온디바이스AI_정렬도검토.md`
2차 재전환 근거: `onDevice_AI/프로젝트_보드한계모델_v2.5/Round17_ESP-DSP/03_결론.md` · `Round17.5_CNN_TF_ESP-DSP/03_결론.md`

## 본 제품 관련 onDevice 검증 결과 (2026-05-20 흡수)

[[onDevice-ai]] vault에서 2026-05-08~5/20 동안 진행된 검증 결과 중 본 제품에 직접 영향 주는 항목:

### 기술 근거 정량화 (Stage 4 영업 카피 보증)

| 항목 | 측정값 (esp32s3 + PSRAM 8MB) | 의미 |
|---|---|---|
| MLP 1024 (2.17MB params) | **96ms** | 1초의 ~10% — 여유 |
| CNN 32 (39KB) | **547ms** | 1초 안 ✅ |
| TF 484 (5.87MB) | **255ms** | 1초 안 ✅ |
| CNN 64 (115KB) | 2.17초 ❌ | Xtensa LX7 SIMD 미사용 시 1초 초과 |

→ **AI FanStick 차세대 SLM은 6MB 이하 + 작은 hidden 사용** 시 1초 응답 보증. Korean-Small 154K (150KB)는 **충분 ✅**.

### 3계열 AI 가속 매트릭스 (2026-05-22 Round 18 CMSIS-NN 측정 완료 — 두 번째 축 채움) ⭐⭐⭐

본 제품 application class (small/medium dense + batch=1 + plain INT8) 에서 3계열 가속의 일관 우월 입증. **5/22 Round 18 측정으로 Cortex-M4F 행이 [측정 예정] → 실측 +3.23× 채워져 매트릭스 완성**:

| 계열 | 칩 / 가속 | 결과 | Round |
|---|---|---|---|
| MCU LX7 + ESP-DSP | esp32s3 + ESP-DSP `dsps_dp_s8_aes3` | **+13.4× 가속** ⭐⭐⭐ (1,452μs → 108μs) | Round 17 (5/21) |
| **MCU Cortex-M4F + CMSIS-NN (256KB tier)** ⭐ | **pca10056 (nRF52840 256KB)** + SMLAD DSP extension | **+3.23× 가속** ⭐⭐ (7,367μs → 2,285μs) ✅ | Round 18 (5/22) |
| **MCU Cortex-M4F (64KB tier — AI 부적합)** ⚠️NEW | pca10040 (nRF52832 64KB) | **전셀 RAM wall 12/12** (weights > heap, CMSIS-NN .bss 34KB 차지) | Round 18 후속 (5/22 야간) |
| Mobile NPU NNAPI | Galaxy A51 5G Eden NPU (Samsung 2.1 TOPS 광고) | **‒79~421× 느림** ⚠️ | Round 19 (5/22) |
| CPU baseline | Cortex-A77 + asimddp (NDK clang `-O2`) | 모바일 응용 충분 (NPU 보다 빠름) | Round 19 |

**클럭 normalize 단위 효율** (5/22 Round 18 신규): LX7 25,920 cycles vs M4F 146,240 cycles = **LX7 5.64× M4F 우위**. AI 가속 = ISA-specific instruction 폭 (128-bit AI vector > 32-bit SMLAD).

**영업 카피 갱신** (5/22):
- 본 양산 트랙: "AI FanStick C3→S3+ESP-DSP **24.8×** (Round 17/17.5, 응원봉 SLM 핵심)"
- **별도 B2B 시나리오**: "**B2B 통합 SoC = nRF52840 (256KB) 필수 (nRF52832 부적합)** + CMSIS-NN +3.23× (Round 18·후속, KWS / anomaly detection / BLE+AI)"
- "vendor 광고는 best-case 기준 — application class 사전 확인 + **RAM tier 적합도** 4번째 조건"
- Stage 4 패키지: mobile NPU 적극 제안 X, MCU 가속 매트릭스로 전개 (S3+DSP 또는 nRF52840+CMSIS-NN 분기, **nRF52832는 BLE-only 트랙 분리**)

### 응원봉 SLM 최종 권장 사양 확정

| 차원 | 권장 | 근거 |
|---|---|---|
| dtype | **INT8** | TF FP32 대비 51% 사이즈 |
| threshold | **1s 대화** | 응원봉 응용 baseline |
| thread | **single-core** | dual-core 효과 1.1× (가치 낮음) |
| SIMD | **ESP-DSP dotprod** ⭐ | AVX2 1.8~2.0× 추정, dual-core 우선 |
| 모델 사이즈 | **~100K params** | esp32s3 추정 한계, Korean-Small 154K 적합 |

### 칩 변경 결정 (2-Stage 진화)

**1차 (5/8, 폐기)**: microGPT 4K params는 SRAM 400KB의 1% 미만. 칩 변경 불필요.

**2차 (5/20, 현재)** ⭐: Round 17 ESP-DSP 24.8× + Round 11 PSRAM 결정타 + Round 17.5 TF 10.8× 종합 = **칩 변경 필수**. C3 + ESP-DSP는 ansi fallback으로 손해 (LX6/RISC-V 1.54× 느림). S3-N16R8 (LX7 + PSRAM 8MB)로 교체 시 Korean-Small 154K INT8 응답 ~150ms.
- BOM: $1.5 → $5~6 (3~4×). 5만 대 +7,500만 미흡 영향 → K-POP Premium 5~10만원에서 수용 가능.

### 핵심 발견 (Round 9·11·17·17.5)

- **Round 9**: Xtensa LX7 plain C는 ARM 대비 9~38× 느림 (SIMD intrinsics 미사용 시)
- **Round 11**: PSRAM 유무가 mandate RAM_safe 셀 결정타 (60% 격차)
- **Round 17** ⭐⭐⭐: ESP-DSP `dsps_dp_s8_aes3` 활성 시 LX7 AI Vector Instruction MLP 13.4× / C3→S3+DSP 종합 **24.8× 가속** — 영업 결정타
- **Round 17.5** ⭐: TF SRAM **10.8× 가속** (SLM 핵심 워크로드 MLP+Attention 모두 ~20× 가속). CNN strided access는 적용 불가 (esp-nn 대안). PSRAM 가득 모델은 가속 무효 또는 손해.
- **ESP-DSP 효과 = 3조건 곱** (Round 17.5 매칭): LX7 + SRAM (또는 small PSRAM) + contiguous matvec. C3·esp32wroom·RISC-V에서 적용은 손해. 자세히 [[2026-05-21_esp-dsp-3조건-매칭]]

### 응원봉 SLM 최종 권장 사양 (5/21 갱신)

| 차원 | 권장 | 근거 |
|---|---|---|
| dtype | **INT8** | TF FP32 대비 51% 사이즈 |
| threshold | **1s 대화** | 응원봉 응용 baseline |
| thread | **single-core** | dual-core 효과 1.1× (가치 낮음) |
| SIMD | **ESP-DSP dotprod** ⭐ | MLP 24.8× / TF 19.1× 정량 확정 (Round 17·17.5) |
| 모델 사이즈 | **~100K params (~600KB)** | esp32s3 SRAM + 작은 PSRAM sweet spot, Korean-Small 154K 적합 |
| KWS wake word | esp-nn 또는 TFLM esp-nn delegate | CNN strided access는 ESP-DSP 적용 불가 |

### 마케팅 정량화 카피 (B2B/PR 트랙용)

- "MCU급 SLM 추론 **1초 안**" → 측정으로 보증
- "응원봉 안에 GPT 200줄 — 한국 최초 시연"
- "Korean-Small 150KB 한국어 응원 도메인 — esp32s3 SRAM 30%"
- ⭐⭐⭐ "**ESP-DSP intrinsics 24.8× 가속** — C3→S3 칩 교체로 응답 150ms 달성" (5/20 신규)
- ⭐ "**외부 인터넷 0% 음성 명령**" (Round 17·17.5 종합)

본 검증 결과는 **양산 트랙 본체**로 전환됨 (5/20 결정). 1차 정지선(5/8) 폐기. PR·B2B 영업·강의 자산은 24.8× 카피 신규 활용.

→ 자세한 검증 데이터: [[onDevice-ai]] / [[2026-05-20_esp32-arm-family-스펙트럼]]

## 마케팅 카피 분리 정책

| 청자 | 카피 |
|---|---|
| C2C 응원봉 사용자 | "AI 팬덤 비서가 내 손 안에" / "오프라인에서도 작동하는 첫 응원봉" |
| B2B (Stage 4) | "응원봉 자체에 GPT 탑재한 첫 사례" (검증 트랙 산출물 활용) |
| PR/언론 | "1만원 칩에 GPT 200줄 — UTTEC 한국 최초 시연" |
| 강의 | "임베디드 엔지니어를 위한 On-Device AI" |

**중요**: B2B/PR 카피를 C2C 사용자 마케팅에 쓰지 말 것 (기대 격차 클레임 위험).

## 「모두의 창업 프로젝트」 도전 트랙 (2026-05-09 신설)

응원봉 본체 양산 트랙(정지선 = Phase 2 종료)과 **별도로**, 본 제품을 베이스로 한 **신규 법인 창업 도전 트랙**을 개시.

| 항목 | 내용 |
|---|---|
| **공모전** | 중기부 공고 제2026-208호 「모두의 창업 프로젝트」 일반/기술트랙 |
| **마감** | 2026-05-15 (목) 16:00 |
| **신청자** | 이진서 (서울대 졸업학기, 예비창업자) — UTTEC은 사업년수 10년으로 자격 미달 |
| **협업 구조** | 이진서 51% (대표) + UTTEC 49% (CTO·기술 출자) |
| **이진서 매칭 핵심** | 응원단장(7대) + 기획단장(6대) — 9년 응원단 운영 경험 = "응원단장이 만드는 응원봉" 진정성 |
| **제품 포지션** | 세계 최초 온디바이스 AI 응원봉 + 팬덤 영상 자동편집 플랫폼 (양면 수익) |
| **매출 목표** | 1년차 9.7억 / 3년차 100억 (GP 마진 81%) |
| **상금** | TOP 1 = 5억 + 사업화 1억 / TOP 100 = 사업화 1억 + AI 바우처 + 시제품 1천만 |

자세한 내용:
- 인사이트 기록: [[2026-05-09_이진서협업-창업프로젝트도전]]
- 사업계획: `이진서/창업project/items/A_AI응원봉_팬덤플랫폼.md`
- 도전신청서 초안: `이진서/창업project/A안_도전신청서_초안_v1.md`
- 종합 정리: `이진서/창업project/창업아이템_종합정리.md`

## 특허 IP 백업 (2026-05-09 추가)

응원봉 특허 출원 자료 + 검토 자료 + 분석 자료 일체를 [[oldProject]] 아카이브에 보존.

| 폴더 | 위치 | 내용 |
|---|---|---|
| 응원봉특허_now | `oldProject/rfTech/응원봉/응원봉특허_now/` (60 files / 200 MB) | 최신 특허 출원 자료 본 (확정본) |
| 루트 docx/xlsx 7건 | `oldProject/rfTech/응원봉/` | UTTEC 응원봉 System.pptx, 특허 분석.docx, 응원봉특허list.xlsx, 응원봉 사업 계획서.docx 등 |

큐레이션 정책에 따라 `final특허/`, `검토특허/`, `응원봉특허/` (구버전 3개)는 제외. `_now` 버전만 단일 source of truth로 유지.

## 관련 페이지
- [[me]]: 사업가/발명가 정체성
- [[projects]]: 완료 프로젝트
- [[skills]]: ESP32 + BLE + Android + AI API
- [[ai-direction]]: AI+HW 제품화 사례
- [[strengths]]: 폭발적 실행 속도 증거
- [[experience]]: 제품화 경험
- [[onDevice-ai]]: 별도 트랙 (PR·B2B·강의 자산용)
- [[oldProject]]: 응원봉 특허 IP 백업 (2026-05-09)
- [[2026-05-08_응원봉-온디바이스AI-정지선]]: 정지선 의사결정 기록
