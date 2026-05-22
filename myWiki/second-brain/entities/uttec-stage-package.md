---
title: UTTEC 영업 패키지 (4.5-Stage)
type: entity
created: 2026-05-05
updated: 2026-05-22 야간 (Round 18 후속 pca10040 64KB RAM wall 흡수 — Stage 4 칩 선택 가이드 § "저전력 BLE-only (AI 불가)" 행 신설 + RAM tier 4조건 곱 원칙)
tags: [영업, 패키지, Stage, foundry, business-model, onDevice-검증완료, ESP-DSP, CMSIS-NN, 3계열매트릭스]
links: [영업전략, Stage0_Core_Services_견적서, On-Device AI, Foundry 5층 아키텍처, onDevice-ai, ai-fanstick, 2026-05-20_esp32-arm-family-스펙트럼, 2026-05-21_esp-dsp-3조건-매칭, 2026-05-22_npu-vendor-광고-실측-격차]
---

# UTTEC 영업 패키지 (4.5-Stage)

## 한 줄 정의

UTTEC의 단계별 영업 모델. **Foundry 1/100 가격 재현** 컨셉 + 단계별 도입으로 고객 부담 최소화.

## 진화 이력

| 날짜 | 이벤트 | 패키지 명 |
|---|---|---|
| 2026-05-05 | Stage 0 견적서 1페이지 작성 (한국기계·태명과학 발송) | 3.5-Stage 패키지 |
| 2026-05-07 | **Stage 4 (On-Device AI) 신설 결정** | **4.5-Stage 패키지** |
| (검토 중) | Stage -1 (자영업 진입 단계) 추가 후보 | (미정, 5.5-Stage 또는 별도 funnel) |

## Stage 매트릭스 (4.5-Stage)

| Stage | 단가 | 기간 | 산출물 | Foundry 매핑 |
|:-:|:-:|:-:|---|---|
| **Stage 0** | 500만 | 1주 | Core Services Starter Pack (Tailscale + Git + Obsidian + n8n) | 1층 (Core Services) |
| **Stage 1** | 300만 | 1주 | 13개 AI 도구 가이드 + 5 Track 코스 (교육) | 4층 (Analysis) 일부 |
| **Stage 2** | 2,500만 | 1.5개월 | 도메인 wiki 30~50p + n8n 워크플로우 5종 | 2~3층 (Data + Ontology) |
| **Stage 3** | 2,500만 | 1.5개월 | demo_live.html 진화형 운영 앱 | 5층 (Application) |
| **Stage 4** | **1,500만** | **4주** | **On-Device AI 보드 + 모델 + C++ 추론 + 통합** | **4층 보조 + Application 확장** |
| **Total** | **7,300만** | (단계별) | 풀 패키지 | Foundry 1~5층 풀 |

## 단가 의미 ("4.5"의 정의)

```
Stage 0 (0.5) + Stage 1 (1) + Stage 2 (1) + Stage 3 (1) + Stage 4 (1) = 4.5
```

→ Stage 0이 1주 단발(시범) 성격이라 0.5로 카운트, 나머지는 본격 단계로 1씩.

## 핵심 차별화 메시지

> **"Foundry급 인프라를 1/100 가격에 구축합니다."**

Palantir Foundry 라이선스 연 수억~수십억 → UTTEC 4.5-Stage 풀 7,300만.

## Stage 4 칩 선택 가이드 (2026-05-22 Round 18·19 흡수 — 3계열 매트릭스 완성) ⭐⭐⭐

**Mobile NPU 적극 제안 X — MCU 가속 매트릭스로 전개 (5/22 두 번째 축 정량 채움)**

5/22 Round 19 (Eden NPU NNAPI 79~421× 손해) + Round 18 (Cortex-M4F CMSIS-NN +3.23×) 동시 흡수로 3계열 가속 매트릭스가 application class별 정량 근거를 갖춰 완성. "Mobile NPU 항상 빠르다" 통념 정량 반증 + MCU 가속 일관 우월 입증.

**application class별 권장 가속 (3계열 매트릭스 + RAM tier 분리)**:

| Application | 권장 가속 | 정량 근거 | 영업 패키지 |
|---|---|---|---|
| 응원봉 / wearable / small SLM (dense + batch=1 + INT8) | **ESP32-S3 + ESP-DSP + PSRAM 8MB** | **+13.4×** (R17 5/21) / C3→S3+DSP 종합 **+24.8×** | AI FanStick 양산 |
| **B2B BLE+AI 통합 SoC** (KWS / anomaly detection / 산업 IoT) | **Nordic nRF52840 (256KB) + CMSIS-NN** ⭐ | **+3.23×** (R18 5/22, SMLAD DSP extension) | **Stage 4 B2B 임베디드** (1순위 적용 후보) |
| **저전력 BLE-only (AI 불가)** ⚠️NEW | **Nordic nRF52832 (64KB) — AI mandate 부적합** | **전셀 RAM wall 12/12** (R18 후속 5/22 야간) | BLE/sensor-only 트랙 분리 |
| Mobile T3 응용 (Android 앱) | **CPU plain (`-O2` asimddp)** — NPU 사용 X | (R19 5/22) NPU 대비 79~421× 빠름 | Stage 4 모바일 |
| 표준 CV (MobileNet 등 conv-dominant + batch>1) | Mobile NPU 적합 | (드문 케이스, 별도 검토) | — |
| 본 vault skeleton (small dense, batch=1) | CPU SIMD (asimddp / SMLAD) | baseline | — |

**클럭 normalize 단위 효율 (5/22 Round 18 신규)** — Stage 4 칩 선택 결정타:

| ISA | 클럭 | MLP 128 측정 | 클럭 normalize cycles | 단위 효율 |
|---|---|---:|---:|:-:|
| **LX7** (esp32s3) | 240MHz | 108μs (ESP-DSP) | 25,920 | **5.64× M4F 우위** ⭐ |
| Cortex-M4F (pca10056) | 64MHz | 2,285μs (CMSIS-NN) | 146,240 | baseline |

→ AI 가속 = **ISA-specific instruction 폭 + workload class 매칭**이 결정타 (128-bit AI vector vs 32-bit SMLAD). vendor TOPS 광고가 아닌 instruction set design이 진짜 변수.

**영업 카피 결정타** (5/22 완성형 + 야간 후속):
- "벤치마크 없이 vendor 광고 신뢰 X — UTTEC 자체 측정 자산 (Round 17·18·18후속·19) 기반 칩 선택"
- "**B2B 임베디드 = nRF52840 (256KB) 필수** + CMSIS-NN +3.23× (정량 검증) — nRF52832 (64KB) 는 AI 부적합"
- "응원봉/wearable = ESP32-S3 + ESP-DSP +13.4× (정량 검증)"
- "Mobile NPU 일률 적용 X — application class 사전 확인 SOP 필수"
- "**AI 가속 = ISA × workload × 메모리 계층 × RAM tier 4조건 곱**" ⭐⭐ (5/22 야간 후속 4번째 조건 추가)
- "**AI 응용 ≠ MCU 라벨** — vendor 'supports neural network frameworks' 광고는 toolchain·library 호환만 검증, 실제 RAM 적합도는 sweep 측정 필수"

## 영업 흐름 (단계별 도입)

```
[잠재 고객 발굴]
  ↓
[Stage 0 견적서 발송] (영업/Stage0_Core_Services_견적서.md)
  ↓
[Stage 0 시범 운영] (1주 500만)
  ↓ (만족 시)
[Stage 1·2·3·4 단계별 도입] (총 6,800만)
  ↓ (불만족 시)
[1주 후 모든 자료 인계 후 종료]
```

→ **Stage 0이 진입 장벽을 낮춤** (1/10 가격 + 1주 단기), 그 후 단계별 확장.

## Stage별 산출물 상세

### Stage 0 — Core Services Starter Pack (500만)
- 산출물: Tailscale ACL + Git 표준 저장소 + Obsidian Vault + n8n 자체 호스팅 + Slack 통합 + 매뉴얼·영상
- 자세히: `영업/Stage0_Core_Services_견적서.md`

### Stage 1 — 교육 (300만)
- 산출물: 13개 AI 도구 가이드 + 5 Track 코스 (Track A~E) + 영상 강의
- 컨텐츠 출처: `aiStudy/introductionAi/` 13가이드

### Stage 2 — 위키 + 워크플로우 (2,500만)
- 산출물: 도메인 wiki 30~50 페이지 + n8n 워크플로우 5종 (영업·재고·CS·생산·품질 중)

### Stage 3 — 운영 앱 (2,500만)
- 산출물: demo_live.html 진화형 운영 앱 (단일 HTML 파일 1개로 시작 → 진화)

### Stage 4 — On-Device AI (1,500만, 신규 5/7, 검증 자산 5/20 정량화)
- 산출물: 보드(Hailo-8/Jetson Orin/ESP32-S3) + 모델(SLM/microGPT 변종) + C++ 추론 엔진 + 기존 Stage 0 통합
- 자세히: `영업/Stage4_OnDeviceAI_검토.md`

**검증 자산 (2026-05-20 [[onDevice-ai]] vault 흡수, W6 종료 6/29 1차 자산화 예정)**:

| 카피 | 보증 데이터 |
|---|---|
| "MCU급 SLM 추론 **1초 안**" | esp32s3 + PSRAM 8MB: MLP 1024 = 96ms / CNN 32 = 547ms / TF 484 = 255ms |
| "1인 4주 → **1인 1일 18셀 sweep** 입증" | 5/19 하루에 5보드(rpi5·rpi4·tablet·smartphone·pc-windows) × 12셀 측정 |
| "**보드/컴파일러 선택 = 8× 차이**" | clang+신세대(smartphone) vs gcc+구세대(rpi3) CNN 128 = 20×, 컴파일러 단독 4× |
| "**8년 ARM 진화 = 46× 속도 스펙트럼**" | smartphone(0.58×) ↔ rpizero(26.65×) CNN 128 |
| "**Xtensa LX7 plain C는 ARM 9~38× 느림**" | esp32s3 → rpi3·rpi4 비교 (SIMD 미사용 시) — Round 9 발견 |
| "**PSRAM 유무가 RAM_safe 셀 60% 결정**" | esp32c6(없음) 3 ↔ esp32s3(8MB) 5 — Round 11 |
| "외부 의존성 0 ANSI C 820줄 추론 코드" | `프로젝트_보드한계모델/src/` 자체 보유 (MLP·CNN·Transformer) |
| "Korean-Small 154K (150KB) esp32s3 적합" | INT8 + ESP-DSP dotprod 활성 시 ~150ms (Round 17 확정) |
| ⭐⭐⭐ "**ESP-DSP intrinsics 24.8× 가속** — C3→S3 칩 교체로 응답 150ms" | Round 17: `dsps_dp_s8_aes3` MLP 13.4× / TF 10.8× (Round 17.5) — 영업 결정타 |
| ⭐ "**ESP-DSP 효과 = 3조건 곱** (LX7 × SRAM × contiguous matvec)" | Round 17.5 매칭 — C3·esp32wroom·RISC-V는 ESP-DSP 손해 (적용 시 1.54× 느림). KWS는 esp-nn 별도 가속 |
| ⭐ "**외부 인터넷 0% 음성 명령**" | Korean-Small 154K INT8 + S3 PSRAM = ~150ms 응답 |
| ⭐⭐ "**nRF52840 + CMSIS-NN MLP +3.23× 가속** — B2B BLE+AI 통합 SoC 결정타" (5/22 신규) | Round 18: SMLAD DSP extension MLP 128 = 7,367μs → 2,285μs (Optimistic 가설 2.5~4× 적중) |
| ⭐⭐ "**3계열 AI 가속 매트릭스 완성** — application class별 정량 칩 선택" (5/22 신규) | LX7 ESP-DSP +13.4× / M4F CMSIS-NN +3.23× / Mobile NPU NNAPI ‒79~421× |
| ⭐ "**LX7 단위 효율 5.64× Cortex-M4F 우위** — clock 아닌 instruction set design 결정타" (5/22 신규) | Round 18 클럭 normalize: 25,920 cycles (LX7) vs 146,240 cycles (M4F) |

→ **Stage 4 카피 결정 메시지**: "1인이 4주에 ESP32 + Pi family + 모바일 13보드 한계 측정 1장 표 박제" — 임베디드 스타트업 컨설팅 패키지 차별화.

→ **AI FanStick C3→S3+DSP 영업 결정타 표** (Round 15+17 종합):

| 단계 | ESP32-C3 (양산) | ESP32-S3 + DSP (차세대) | 우위 |
|:-:|---:|---:|:-:|
| 1. 단순 칩 교체 (plain C) | 2,677us | 1,452us | 1.84× |
| 2. **+ ESP-DSP intrinsics** | 2,677us | **108us** | **24.8× ⭐⭐⭐** |

## 영업 시나리오

### 시나리오 A — 한국기계 (스마트팩토리)
- Stage 0 → Stage 1 → Stage 4 (Hailo-8 예측정비)
- 매출: 2,300만 ~ 풀스택 7,300만

### 시나리오 B — 자영업·1인 사업자
- Stage 0 → Stage 1
- 매출: 800만

### 시나리오 C — 임베디드 신생기업 ⭐ (2026-05-20 카피 정량화 확보)
- Stage 0 (선택) + Stage 4 단독
- 매출: 1,500 ~ 2,000만
- 영업 핵심: 13보드 한계표 + Round 1~11 가설 변천 + ANSI C 820줄
- 첫 수주 후보: 한국기계 + 임베디드 스타트업 (Stage 4 단독 진입)

### 시나리오 E — tablet 키오스크·표시기 ⭐ NEW (5/17 흡수, T2 슬롯 확보)
- Stage 0 + Stage 4 (tablet baseline 측정 자산)
- 매출: 1,500 ~ 2,000만
- 영업 핵심: "예산형 모바일 키오스크 + NPU 없이 추론" 차별화

### 시나리오 D — 풀스택 (대형 고객)
- Stage 0 + 1 + 2 + 3 + 4 = 7,300만

## 고객 후보 (현재)

| 고객 | 단계 | 상태 |
|---|---|---|
| 한국기계 (15억 협력 진행 중) | Stage 0 PDF 발송 (5/5) | 회신 대기 |
| 태명과학 (스마트팩토리 제안 진행) | Stage 0 PDF 발송 (5/5) | 회신 대기 |

## 관련 페이지
- [[영업전략]] — 3대 사업 라인 + 정부지원 매트릭스 + 경쟁 분석
- [[Stage0_Core_Services_견적서]] — 1페이지 영업 자료
- [[On-Device AI]] — Stage 4 핵심 기술
- [[Foundry 5층 아키텍처]] — 참조 아키텍처
- [[uttec-edu]] — Stage 1 교육 콘텐츠 출처
- [[Memory MCP]] — Stage 0~2 도구
- [[Obsidian myWiki]] — Stage 0 핵심 도구

## 메타

| 항목 | 값 |
|---|---|
| 첫 견적서 발송 | 2026-05-05 (한국기계·태명과학) |
| 첫 매출 | (대기) |
| 매출 임팩트 (Stage 4 신설로) | +1,500만 (+26%, 풀스택 시) |
| 다음 갱신 | Stage -1 (자영업 진입 단계) 검토 시 또는 첫 수주 시 |
