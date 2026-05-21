---
title: onDevice_AI vault — AI FanStick + Stage 4 + 보드한계모델
type: entity
created: 2026-05-07
updated: 2026-05-21 (mandate v2.5 진입 = Round 17·17.5 결정타 흡수 — ESP-DSP MLP 24.8× / TF 10.8×, AI FanStick 양산 방향 재전환 C3→S3+DSP)
status: ✅ 1차 mandate 전환 완료 (5/17) / **78% 진행 (29/37, 10/13 보드)** / esp32s3 메인 타겟 + esp32c6 완료 / **mandate v2.5 진입 (Round 16~17.5 ESP-DSP intrinsics 트랙 신설)** / W6 종료 6/22~28 후 Stage 4 영업 자산화 6/29
tags: [vault, On-Device AI, 보드한계모델, AI FanStick, ESP32-S3, ESP-DSP, ESP32-C6, RISC-V, Xtensa, ARM, Stage4, 정지선, multi-agent, ondevice-claude]
links: [ai-fanstick, uttec-stage-package, On-Device AI, claude-code, 2026-05-08_응원봉-온디바이스AI-정지선, revita, 2026-05-20_esp32-arm-family-스펙트럼, 2026-05-21_esp-dsp-3조건-매칭]
---

> **2026-05-17 mandate 전환**: 옛 "AI FanStick + Stage 4 영업 4 Phase 12 실험" → 새 **"보드한계모델 37셀 측정 (W0~W6)"** 단일 strand. 응용·영업은 W6 종료 후 후속(C 단계)으로 분리. 단일 출처 = `0_마스터플랜.md v2.0`.
> **2026-05-20 흡수 완료**: 5/17~20 ondevice-claude 카드 6장 + 5/20 새벽 esp32c6/Round 10·11 추가분 일괄 흡수.
> **2026-05-21 흡수 완료**: Round 17·17.5 ESP-DSP intrinsics 결정타 흡수 — MLP 13.4× / C3→S3+DSP 24.8× / TF 10.8× / CNN strided 적용 불가 / PSRAM 가속 무효. **AI FanStick 양산 방향 5/8 결정 뒤집힘** (C3 유지 → S3-N16R8 + ESP-DSP + PSRAM SLM).

# onDevice_AI vault — AI FanStick + Stage 4 + 보드한계모델

## 한 줄 정의

**AI FanStick + Stage 4 제품의 기술 검증 + 비즈니스 운영 통합 vault**. 1차 mandate = **보드한계모델 37셀 측정** (8 보드 → 13 보드 확장, 3 아키텍처 × 4 크기, 추론 전용 + synthetic random weights). 결과를 Stage 4 영업 자산으로 cascade.

## 위치

- **현재**: `C:\todo\onDevice_AI\` (myWiki 외부, 별도 git repo, private, `ihong9059/onDevice_AI`)
- myWiki traversal: `myWiki/raw/onDevice_AI/` junction (5/20 복구)
- 단일 출처: `0_마스터플랜.md v2.0` (5/17 신설, 8 § ~250줄)

## Multi-agent 식별자

- Claude 식별자: `ondevice-claude`
- 통신 채널: `_inbox/{pending,processed}/`
- 4-vault 운영 중 (myWiki + onDevice_AI + lemonLabs + uttecHome)
- PROTOCOL: `myWiki/_inbox/PROTOCOL.md` § 2026-05-15

## 핵심 mandate — 보드한계모델 (v2.3, 5/19 확정)

**목적**: 13 보드 × 3 아키텍처(MLP·CNN·Transformer) × 4 크기 = **37 셀**의 한계 envelope 측정. 추론 전용. 학습 0회. synthetic random weights (weight 의미 무관, 메모리·연산 envelope만).
**방법론**: Binary Search Wall Finding + 동일 ANSI C99 스켈레톤 + 자동화 Makefile + boards/ scripts/ 빌드 자동화.
**일정**: 5주 → 6주 (W0~W6, 5/17~6/22~28) — W5 → W6로 1주 연장.
**Stage 4 영업 자산화 시점**: 2026-06-29 (W6 종료 익일).

## 13 보드 진행 매트릭스 (10/13 ✅, 78%)

| # | 보드 | 정식 W | 실제 측정 | 측정 셀 | 핵심 |
|:-:|---|:-:|:-:|:-:|---|
| 1 | **pc (uttecMac)** | W1 | 5/18 | 3 + 4 sweep | x86 baseline · AVX2 · gcc 11.4 · Ubuntu 22.04 |
| 2 | **pc-windows** | W1 | 5/18 | 12 sweep ✅ | 같은 Haswell + Win11 — OS·툴체인 차이 정량화 |
| 3 | **rpi5** | W5 | 5/19 ✅ 1개월↑ | 12 sweep | ARM baseline · A76 · gcc 14.2 · asimddp |
| 4 | **tablet** | W4 | 5/19 ✅ 1개월↑ | 12 | A75 clang · Helio G80 · NPU 부재 |
| 5 | **smartphone** | W4 | 5/19 ✅ 1개월↑ | 12 | A77 clang · Exynos 980 · NPU 2.1 TOPS |
| 6 | **rpi4** | W5 | 5/19 ✅ 1개월↑ | 12 | A72 1세대 big · gcc 14.2 · asimddp 없음 |
| 7 | **rpi3** | W5 | 5/19 ✅ 1개월↑ | 12 | A53 1세대 little · in-order · LAN ethernet |
| 8 | **rpizero** | W5 | 5/19 ✅ 1개월↑ | 11 + 1 RAM wall | ARMv6 single · NEON 없음 · USB OTG 동글 |
| 9 ⭐ | **esp32s3** (메인 타겟) | W2 | 5/19 ✅ 5일↑ | 5 RAM_safe + 1 lat + 1 timeout + 5 RAM | ESP32-S3 dual + Embedded PSRAM 8MB + Flash 16MB |
| 10 ⭐ | **esp32c6** (W3 첫 진입) | W3 | 5/20 ✅ 12일↑ | 3 RAM_safe + 1 lat + 8 RAM | RISC-V single 160MHz + **PSRAM 없음** + 512KB SRAM |
| 11 | esp32wroom | W3 | — | 3 | ESP32 baseline (LX6 dual · 가속 없음 · 520KB) |
| 12 | pca10056 | W3 | — | 3 | Nordic nRF52840 (M4F · 256KB) |
| 13 | pca10040 | W4 | — | 3 | Nordic nRF52832 (M4F · 64KB) |

**진행률**: 10/13 보드 ✅ (77%) / **29/37 셀 (78%)**. **메인 타겟 esp32s3 + RISC-V esp32c6 완료**. 1일 5보드 18셀 (5/19) + 1일 4보드 (5/19 야간 esp32s3) + esp32c6 (5/20) 누적 페이스 입증.

## ⭐ 가설 진화 — Round 1~11 (v2.10)

mandate 가설 11회 반증·정제. 매 보드 추가 시 가설 1개씩 정제.

| Round | 가설 | 검증 환경 | 결과 |
|:-:|---|---|:-:|
| 1 | "5× 느림" (artifact) | 초기 | ❌ uninitialized stack |
| 2 | "i586-tune SIMD" | rpi5 | ❌ rpi5에 i586 무관 |
| 3 | "L3 cache 영향" | tablet | △ 부분 반증 (clang으로 가려짐) |
| 4 | "clang vs gcc" | rpi5 vs tablet | ✅ **2.2× 부분 확정** |
| 5 | "+ ARM 코어 세대 clang (A75→A77)" | tablet → smartphone | ✅ **1.85× 합성 4×** |
| 6 | "+ 같은 gcc 1세대 (A72→A76)" | rpi4 → rpi5 | ✅ **1.75× + CNN L3 cache +0.41× 부활** |
| 7 | "+ ARMv8 1세대 little vs big (A53→A72)" | rpi3 → rpi4 | ✅ **3.0~3.8×** |
| 8 | "+ ARMv6 vs ARMv8 + NEON 없음 + single" | rpizero → rpi3 | ✅ 2.0~2.7× (NEON 영향 한정) |
| 9 ⭐ | "+ Xtensa LX7 plain C는 ARM 9~38× 느림 + PSRAM 8MB 새 한계점" | esp32s3 → rpi3·rpi4 | ✅ MLP/CNN/TF 9~38×, PSRAM 8MB가 5/12 cells RAM wall |
| **10** | "+ RISC-V plain C는 Xtensa LX7과 클럭 normalize 시 동급" | esp32c6 → esp32s3 | ✅ 시간 0.97~1.36× / **CNN 32 RISC-V 1.5× 우위** |
| **11** ⭐ | "+ **PSRAM 유무가 mandate RAM_safe 셀 결정타**" | esp32c6(없음) ↔ esp32s3(8MB) | ✅ **3 RAM_safe ↔ 5 RAM_safe = 60% 격차** (MLP 1024+ / TF 484+ 모두 esp32c6 wall) |
| 12 | "+ LX6→LX7 코어 진화 영향" | esp32wroom → esp32s3 | ✅ 정량화 (1차 양산 방향 5/8 결정 근거 보강) |
| **15** | "+ AI FanStick C3→S3 단순 칩 교체 정량화" | esp32c3 → esp32s3 (plain C) | ✅ MLP 128 = 1.84× (2,677us → 1,452us) — 영업 카피 1단계 |
| **17** ⭐⭐⭐ | "+ ESP-DSP `dsps_dp_s8_aes3` 활성 시 LX7 AI Vector Instruction" | esp32s3 (plain C vs +DSP) | ✅ **MLP 128 13.4× (1,452us → 108us)** / MLP 1024 PSRAM 2.66× / **C3→S3+DSP 24.8× ⭐ 결정타** |
| **17.5** ⭐ | "+ TF/CNN/PSRAM ESP-DSP 적용 한계" | esp32s3 + DSP 후속 | ✅ **TF SRAM 10.8× ⭐** / CNN strided 1.00× (적용 불가) / PSRAM 가득 모델 가속 무효 또는 손해 / LX6·RISC-V에서 적용 시 1.54× 느림 |

### 핵심 발견 (Stage 4 영업 카피 원료)

1. **smartphone(0.58×) → rpizero(26.65×) = 46× 스펙트럼** (CNN 128, 8 보드 1줄 정렬)
2. **8년 ARM 진화 = 46× 속도 차이** (ARMv6 → A77, rpizero → smartphone)
3. **Xtensa LX7 plain C는 ARM 대비 9~38× 느림** (INT8 SIMD intrinsics 미사용 시) — Round 9 의외 발견
4. **RISC-V vs Xtensa는 plain C에서 동급** (클럭 normalize 시 CNN 32 1.5× 우위 — Round 10)
5. **PSRAM 유무 = mandate RAM_safe 셀 결정타** (60% 격차 — Round 11)
6. **AI FanStick mandate 영업 카피 정량화**: MLP 1024 = 96ms / CNN 32 = 547ms / TF 484 = 255ms — 모두 1초 안. 6MB 이하 모델은 esp32s3에서 1초 응답 가능.
7. **응원봉 SLM 최종 권장**: INT8 + 1s threshold + single-core + **ESP-DSP dotprod** + ~100K params → **Korean-Small 154K (150KB) 적합** (SRAM 30%)
8. ⭐⭐⭐ **Round 17 결정타**: ESP-DSP `dsps_dp_s8_aes3` 활성 시 LX7 AI Vector Instruction MLP 13.4× / C3→S3+DSP 종합 **24.8× 가속** — AI FanStick C3 → S3-N16R8 양산 방향 5/8 결정 뒤집힘
9. ⭐ **Round 17.5 후속**: TF SRAM **10.8× 가속** (SLM 핵심 워크로드 MLP+Attention 모두 ~20× 가속) / CNN conv strided access는 dsps_dp_s8 적용 불가 (im2col 필요 또는 esp-nn 대안) / PSRAM 가득 모델은 가속 무효 또는 손해 (memory bottleneck) / **C3·esp32wroom·RISC-V에서 ESP-DSP 적용은 손해** (LX6/RISC-V ansi fallback 1.54× 느림)
10. **ESP-DSP 효과 = 3조건 곱** ⭐ (Round 17.5 매칭): LX7 AI Vector Instruction × 메모리 계층 (SRAM 우위) × 접근 패턴 (contiguous matvec) — 자세한 분석 `thoughts/2026-Q2/2026-05-21_esp-dsp-3조건-매칭.md`

## vault 폴더 구조 (5/20 갱신)

```
/todo/onDevice_AI/                  ← 별도 git repo (private)
├── README.md / CLAUDE.md / 0_마스터플랜.md v2.0 (단일 출처)
├── 00_정의_OnDeviceAI.md           헌법 (5축 15질문)
├── log.md                          시간순 기록 (84.6KB)
│
├── hardware/                       ⭐ 13 보드 spec + matrix (esp32c6 5/20 신설)
│   ├── pc/ pc-windows/ rpi5/ rpi4/ rpi3/ rpizero/ tablet/ smartphone/
│   ├── esp32s3/ ⭐ esp32c6/ ⭐NEW
│   ├── esp32wroom/ pca10056/ pca10040/ (skeleton)
│   └── _README.md _matrix.md
│
├── 프로젝트_보드한계모델/          ⭐ 1차 mandate strand (5/17 신설)
│   ├── 00_계획서.md v2.3
│   ├── 0_마스터플랜.md v2.0 (단일 출처)
│   ├── _RESULTS_SCHEMA.md (측정 1회 → 7위치 cascading update)
│   ├── 아키텍처_3종_비교.md + .html (470줄 + 580줄 + SVG 3)
│   ├── src/                        ANSI C99 3 아키텍처 스켈레톤 (820줄, 외부 의존성 0)
│   ├── boards/ scripts/            ESP-IDF v5.5.1 + Zephyr v2.9.2 빌드 자동화
│   └── 03_보드별_실행/{보드명}/    각 보드 5+1 분할 (01목적·02test방법·03결과해석·04용도·05일지·06확장계획)
│
├── education/                      ⭐ 후계자 교육 13 파일 (5/17 신설, 영구)
│   └── 01~10 챕터 + HTML 시각가이드 (15 SVG, 3Blue1Brown 한국어 재구성)
│
├── microGPT/ aiFanStick_차세대/ 통합검증/ 시장조사/
│
├── business/                       제품 비즈니스 (5/15 흡수, 구 uttecBizWiki)
│   └── entities/AI_FanStick.md
│
└── _inbox/ .claude/ 작업보고서/
```

## ssh 머신 컨벤션

| alias | 실체 | OS / toolchain | 역할 |
|---|---|---|---|
| `ssh ubuntu` = `ssh mac` | MBP11,4 (uttecMac) | Ubuntu 22.04 + gcc 11.4 | x86 baseline |
| `ssh uttecRpi5` | Pi 5 (Tailscale) | Debian 13 + gcc 14.2 (asimddp) | ARM 최신 baseline |
| `ssh uttecRpi4` | Pi 4 Model B (Tailscale 100.112.133.101) | Debian 13 + gcc 14.2 (asimddp 없음) | ARM 1세대 비교 |
| `ssh uttecRpi3` | Pi 3 B+ (LAN 192.168.0.51) | Debian 13 + gcc 14.2 | ARM little 1세대 |
| (LAN) | Pi Zero W (192.168.0.53 USB OTG 동글) | Raspbian 12 + gcc 12.2 armhf | ARMv6 single |

## 진행 상태 (옛 Phase 1~4 + 새 보드한계모델)

| 트랙 | 상태 |
|---|---|
| Phase 0 vault 골격 | ✅ (5/7) |
| Phase 1A·1B microGPT PC | ✅ (5/8, Loss 3.37→2.65, 4192 params, INT8 4.1KB) |
| Phase 1B+ 모델 확장 시뮬레이션 | ✅ (5/8, Korean-Small 154K 권장) |
| **1차 mandate 전환** | ✅ (5/17, Phase 2~4 → 보드한계모델로 통합) |
| 보드한계모델 W0 (계획) | ✅ (5/17) |
| 보드한계모델 W1 (pc baseline) | ✅ (5/18, 18 PC-only baseline) |
| 보드한계모델 W2 (esp32s3) | ✅ (5/19, 5일 앞당김) |
| 보드한계모델 W3 (esp32c6 + esp32wroom + pca10056) | △ 1/3 (5/20 esp32c6 완료) |
| 보드한계모델 W4 (pca10040 + 모바일 W4 정식) | △ 모바일 5/19 앞당김, pca10040 미진행 |
| 보드한계모델 W5 (rpi family) | ✅ (5/19, 1개월 앞당김) |
| 보드한계모델 W6 종합 (04_종합_비교.md) | ⬜ (6/22~28) |
| Stage 4 영업 자산화 | ⬜ (6/29 W6 종료 익일) |

## vault 정책 (5/17~18 신설 박제)

1. **🔴 결단 마커**: Claude 응답 시 사용자 결단 필요 부분은 분리 박스 + 🔴 마커
2. **md + html 쌍**: 모든 설명문은 md + html 동시 작성 (`아키텍처_3종_비교.html` 스타일)
3. **단일 출처 원칙**: `0_마스터플랜.md` = 진행·실험·검증·읽기의 단일 출처. 충돌 시 본 문서 정답.
4. **점진적 backbone**: A(완료) → B(W1~W6 보드한계모델) → C(후속 응용) → ⛔ 정지선
5. **schema 통일**: 13 보드 모두 동일 `pc/` 양식 (01~06 분할)
6. **outbox-staging 잔존 청산**: 회신 도착 시 staging 정리

## 검증 → 영업 자산 흐름 (6/29 cascade 예정)

1. `영업/Stage4_OnDeviceAI_검토.md` § 3·4·6 — 보드한계모델 37셀 비교표 + Round 1~11 가설 변천
2. `entities/uttec-stage-package.md` — Stage 4 카피 갱신 (1인 1일 18셀 + 보드/컴파일러 8× + Xtensa 9~38× + PSRAM 결정타)
3. `entities/ai-fanstick.md` — 차세대 BOM 영향 + Korean-Small 154K 적합성 확정
4. 강사양성 Day 5 / 호오컨설팅 / 인프런 — Round 1~11 진행 과정 = 측정 과학 진행 과정 사례

## 영업 임팩트 (W6 종료 후 6/29~)

- Stage 4 첫 수주: 1,500만/4주 (한국기계 또는 임베디드 스타트업, ESP32 + AI 자산 보유)
- 위시캣 임베디드 IoT 공고: 본 vault src/ ANSI C 820줄 + 보드한계모델 비교표 인용 가능
- 강사양성 Day 5 + 호오컨설팅 + 인프런: 6개월 누계 2,000~3,500만

## 마케팅 정지선 (2026-05-08, 본 mandate 전환 후에도 유효)

본 vault는 **응원봉 양산 적용 트랙이 아니라 "회사의 기술 자산·B2B 영업 무기·PR 콘텐츠" 트랙**. 정지선 = **Phase 2 종료** = **현 보드한계모델 W6 종료 시점과 정렬**.

근거: microGPT 4K 파라미터 = 응원봉 사용자 기대 응답 품질에 6~7자릿수 미달. 응원봉 양산 방향은 newMvp 결론(Gemma 2B 하이브리드)으로 잠금.

자세한 의사결정: [[2026-05-08_응원봉-온디바이스AI-정지선]]

## 5/17~20 카드 흡수 lifecycle (5단계 모두 완료, 5/20)

myWiki `_inbox/pending/` → `_inbox/processed/` 이동 + done 회신 1장 발송:
- 2026-05-17-004: tablet 추가·smartphone·프로젝트_보드한계모델·education 13파일
- 2026-05-17-005: 마스터플랜 v2.0 + 보드한계모델 W1 wrap + 1차 mandate 전환
- 2026-05-18-002: 18 PC-only baseline + 응원봉 SLM 최종 권장
- 2026-05-19-001: v2.2 mandate 12보드 34셀 + W6 연장
- 2026-05-19-003: 1일 5보드 18셀 + Round 6 가설
- 2026-05-19-004: Round 7~9 + esp32s3 메인 타겟
- (5/20 새벽 esp32c6 + Round 10·11은 카드 없이 vault 직접 흡수, ondevice 측 외부 발송 부담 차단)

## 관련 페이지

- [[ai-fanstick]] — 5/21 갱신 (양산 방향 재전환 C3→S3+DSP+PSRAM SLM + Round 17/17.5 결정타)
- [[uttec-stage-package]] — 5/21 갱신 (Stage 4 카피 + ESP-DSP 24.8× 추가)
- [[On-Device AI]] — 핵심 기술 트렌드
- [[2026-05-08_응원봉-온디바이스AI-정지선]]
- [[2026-05-20_esp32-arm-family-스펙트럼]] — 매칭 패턴 박제 (Round 1~11 + ARM 8년 진화 + RISC-V vs Xtensa)
- [[2026-05-21_esp-dsp-3조건-매칭]] ⭐ — Round 17.5 매칭 패턴 (LX7 AI Vector × 메모리 계층 × 접근 패턴)
- [[2026-05-22_npu-vendor-광고-실측-격차]] ⭐⭐ — Round 19 결정타 패턴 (Eden NPU NNAPI 79~421× 손해 + 일반화 원칙)

## Mobile NPU 부적합 case — Round 19 결정타 (2026-05-22 흡수) ⭐⭐⭐

**Galaxy A51 5G Eden NPU NNAPI** 는 plain INT8 MLP 128~16384 전 범위에서 CPU Cortex-A77 + asimddp 대비 **79~421× 느림**.

- NNAPI device 정상 노출 (`eden-drv`, ACCELERATOR/NPU, EdenDriver_1_3, featureLevel=30)
- auto-pick = explicit `createForDevices(eden)` 동일 latency → NPU 이미 선택 중, dispatch 자체 비효율
- Samsung 2.1 TOPS 광고 vs 실측 격차

**원인**: NPU = 표준 ML model (MobileNet conv-dominant, batch>1) 전용. plain INT8 small dense = NPU dispatch overhead 큼. CPU asimddp `sdot` = 16 MACs/cycle 우월.

**영업 함의 (Stage 4 패키지)**:
- mobile NPU 적극 제안 X — MCU 가속 (ESP-DSP / CMSIS-NN) 매트릭스 우월
- 3계열 가속 매트릭스: LX7 ESP-DSP +13.4× (R17) / Cortex-M4F CMSIS-NN [예정 R18] / Eden NPU **‒79~421×** (R19 손해)

**본 vault skeleton application class 정의** (mlp/cnn/transformer + batch=1 + plain INT8):
- ✅ MCU 가속 (ESP-DSP/CMSIS-NN): 5~25× 일관
- ⚠️ Mobile NPU NNAPI: 손해 또는 효과 없음
- ✅ CPU SIMD (NDK clang `-O2` asimddp): NPU 보다 빠름

## 메타

| 항목 | 값 |
|---|---|
| vault 시작 | 2026-05-07 |
| 1차 mandate 전환 | 2026-05-17 |
| 현재 진행률 | **29/37 셀 (78%) · 10/13 보드 (77%)** |
| W6 종료 예정 | 2026-06-22~28 |
| Stage 4 영업 자산화 | 2026-06-29 (W6 종료 익일) |
| 예상 매출 임팩트 | 6개월 2,000~3,500만 |
| 본 entity 갱신 주기 | 카드 흡수 시마다 (5/22 Round 19 NNAPI 흡수 — 다음 = Round 18 CMSIS-NN 또는 v2.5 완료 카드) |
