---
title: Stage 4 (On-Device AI) 신설 검토 + 4.5-Stage 패키지 확장
type: business-decision
created: 2026-05-07
updated: 2026-05-28 (R36/R37/R38 cascade 흡수 + 시나리오 4 → 5 [stm32h745 E 신설] + 6계열 매트릭스 + 7 negative finding + STM-15/16 carrier + Phi-2 50MB QSPI 정량 실증 + 영업카피 49건 정정 — ondevice-claude #2026-05-28-001 broker 갱신)
status: 채택 (4.5-Stage 패키지) + 5/28 R38 mandate v2.10 cascade 반영 (Round 1~38 누적)
single_source_of_truth:
  - onDevice_AI/business/entities/AI_FanStick.md (단일 출처, 본 자료는 carbon copy)
  - myWiki/second-brain/entities/uttec-stage-package.md (myWiki entity)
  - myWiki/second-brain/entities/stm32h745-disco.md (14번째 보드 entity)
  - myWiki/second-brain/entities/ai-fanstick.md (응원봉 entity)
  - myWiki/second-brain/entities/onDevice-ai.md (vault entity)
  - myWiki/second-brain/entities/build-gotcha-inventory.md (cross-vendor 함정 51건)
related:
  - 영업/Stage0_Core_Services_견적서.md
  - 작업보고서_항목: #19 3.5-Stage → 4.5-Stage 확장 검토
tags: [영업, 패키지, Stage4, On-Device AI, 의사결정, mandate-v2.10, 5계열매트릭스완성, 6계열매트릭스, Hybrid-SoC, Edge-AI-Gateway, STM32H745, 산업노드, Cortex-M-tier-최강, Phi-2-적재-실증, 3tier-메모리, SDRAM-penalty-zero, vendor-광고-cross-check, LiteRT, Jetson-Super, 7-negative-finding]
---

# Stage 4 (On-Device AI) 신설 검토 + 4.5-Stage 패키지 확장

## ⭐⭐⭐ 2026-05-28 R38 cascade 흡수 — 본 자료 신뢰성 강화 (R36/R37/R38 정량 실증 통합)

본 영업 자료는 ondevice-claude `_inbox/pending/2026-05-28-001` 카드 broker 요청으로 mywiki-claude가 갱신. 본 자료 단일 출처 = **onDevice_AI vault `business/entities/AI_FanStick.md`** + mywiki entity 5건 (frontmatter 참조). 본 자료는 그 carbon copy. 상세 정량 박제는 단일 출처 entity 우선 참조.

### 1. Stage 4 시나리오 4 → 5 (시나리오 E 신설)

| 시나리오 | 보드 | BOM | 소비자가 | 타겟 |
|---|---|:-:|:-:|---|
| A | esp32s3 단일 | $12 | 3~5만원 | K-POP B2C |
| **B** ⭐⭐⭐ | Hybrid SoC (M4F + esp32s3) | $16.70 | 5~8만원 | Stage 4 B2B |
| C | nRF52840 (256KB) 단독 | $9.50 | 2~4만원 | Matter IoT |
| **D** ⭐⭐⭐ | Edge AI Gateway (rpi5 NEON 6.7×) | $120~150 | 15~30만원 | 행사장 hub |
| **E** ⭐⭐⭐⭐ **NEW** | **stm32h745 dual-core + 9.2MB RAM + 129MB QSPI XIP** | **$70~150** | **15~30만원 (산업) / $150~500 retail** | **산업 비전 검사 / 의료 / 자동차 ECU / 로봇 / SLM single-chip** |

### 2. 6계열 AI 가속 매트릭스 (5 → 6계열, M7 CMSIS-NN 추가)

| 계열 | 하드웨어 | MLP | CNN | TF | application |
|---|---|:-:|:-:|:-:|---|
| LX7 ESP-DSP | esp32s3 | 13.4× | 1.00× | 10.8× SRAM | SLM (A) |
| M4F CMSIS-NN | pca10056 | 3.26× | 14× | 1.85× | KWS / Anomaly (B/C) |
| esp-nn | esp32s3 | (-) | 2.93× | 2.62× PSRAM | SLM PSRAM (Premium) |
| ARM-A NEON+dotprod | rpi5 | 8.35× | 3.85× | 7.64× | Gateway (D) |
| **M7 CMSIS-NN** ⭐⭐⭐ **NEW** | **stm32h745** | 2.05× | **⭐⭐⭐ 17.7×** ⭐ **Cortex-M 최강** | 1.36× | **산업 노드 (E)** |
| NPU NNAPI | Eden | -79~421× | — | — | (사용 안 함) |

### 3. R36/R37/R38 핵심 영업 메시지 (시나리오 E 결정타)

#### R36 (5/27) — Cortex-M tier 최강 AI 노드
- **CMSIS-NN CNN 17.6× 가속** (M4F pca10056 R28 14× 상회 25%)
- **dual-core asymmetric multiprocessing**: R34 Hybrid SoC (2 chip) → stm32h745 1 chip 실현 (M7 AI + M4 real-time, ASIL 분리)

#### R37 (5/28 정정) — M4 단독 positive + M7 IPC gain 1.78× 박제 정확화
- M4 단독도 정상 (pca10056 대비 3.71× 빠름, clock-norm 0.99×)
- M7 same-chip 3.56× 추가 우월, IPC gain 1.78× = Cortex-M7 카탈로그 정상치 (dual-issue + L1 + ART)
- ❌ 옛 메시지 (사용 금지): "H745 M4 단독 권장 안 함"

#### R38 (5/28 mandate v2.10) — Phi-2 50MB 적재 정량 실증 + 3-tier 메모리 ⭐⭐⭐⭐
- **QSPI 64 → 128 MB 박제 정정** (SFDP 실측, Macronix MX66LM1G45G 1Gbit 추정) → 총 Flash XIP **129 MB**
- **Phi-2 mini Q4 50MB 적재 boot 3.22s / throughput 15.51 MB/s** — multi-SLM 2× 적재 capacity
- **3-tier 메모리 모델 정량 정의**: DTCM 128KB (1.0×) + SDRAM 8MB (1.28×) + QSPI 128MB (15.51 MB/s)
- **D-cache 효과**: SDRAM 4.19× / DTCM 2.82×
- ⭐⭐⭐ **Phase D 영업 결정타**: 857K params MLP SDRAM 배치 forward = 10.1ms, latency ratio 18.14× < param ratio 20.29× = **11% 더 효율적**. "SLM SDRAM 적재 = DTCM 적재와 거의 동등 효율"

#### Stage 4 시나리오 E "5 항목 우위" (4 → 5 항목)
1. CMSIS-NN CNN 17.58× (R36)
2. dual-core asymmetric multiprocessing single-chip (R37)
3. M7 baseline IPC gain 1.78× (R37 paired-check)
4. LCD + Ethernet + USB OTG FS + sensor I/O single-chip (Wave 13)
5. **3-tier 메모리 정량 실증 + Phi-2 50MB 적재 + SDRAM penalty zero** (R38) ⭐⭐ NEW

### 4. 7 negative finding 누적 (R&D 신뢰성 자산, R37 positive 정정 후)

- R19 Eden NPU NNAPI -79~421× (smartphone NPU 부적합)
- R24 INT16 Adam state -1.65~4.25× (R23 fast_adam 우월)
- R27 FP16 Adam state -1.08~1.88× (R23 baseline 확정)
- R29 Multi-layer LoRA -7.7~-9.3% (single FC 최적)
- R30 mobile NEON+dotprod 0.97× (clang toolchain 정책 차이)
- R32 pca10040 64KB tier 부적합 (nRF52833/40 권장)
- **R35** (5/28 신규) — **한국어 KWS capacity 보강 무효** (MLP 130K ↔ CNN 35K 48.3 vs 48.0% ceiling)

### 5. STM-15/16 carrier carry-over

- **STM-15** (5/28) — INFO emit (sys_clock / HAL_RCC) 측정 전 배치 시 cache 영향 24% (latency 557→692μs, p99 7400→19500μs). 모든 보드 measurement 표준
- **STM-16** (5/28 R38) — Zephyr stm32 fmc_sdram driver Kconfig 활성 필수 (`CONFIG_MEMC=y + CONFIG_MEMC_STM32_SDRAM=y`). dts node `status="okay"`만으로 부족 → Imprecise BUS FAULT. 다른 STM32 + SDRAM 보드 carry-over
- **R&D 신뢰성 영업 자산**: "벤더 광고 신뢰 X — UTTEC 자체 measurement carrier 일관성 표준" → 51 빌드 함정 cross-vendor 인벤토리

### 6. 외부 vendor 가격 갱신 (영업 카피 stale 정정)

| 영역 | 옛 박제 (사용 금지) | 정정값 (5/28) |
|---|---|---|
| **TFLM 명명** | TensorFlow Lite Micro | **LiteRT for Microcontrollers** (Google 2024-09 rebrand) |
| **Jetson Orin Nano** | $499 / 40 TOPS | **$249 / 67 TOPS Super** (NVIDIA 2024-12) |
| **Jetson AGX Orin 64GB** | $2,999 | **$2,499** |
| **Jetson AGX Thor (NEW 2025)** | (미박제) | **$3,499 / 2,070 FP4 TFLOPS** (humanoid robot 최강) |
| **rpi5+Hailo vs Orin Super 비교** | 3.3× 가격 차이 ($150 vs $499) | **1.66× 차이만** ($150 vs $249) — 영업 결정타 정정 |

### 7. vendor 광고 cross-check 5단계 정책 (영업 카피 박제 시 의무)

1. vendor 광고 신뢰 X UTTEC 자체 측정 자산
2. 본 vault Round 1~38 누적 박제 cross-reference 필수
3. 모호 카피 ("AI 가속 가능") 금지 → 정량 박제 ("Round X: 변수 Y → ratio Z×")
4. vendor 광고 / wiki / 추정 출처 박제 시 vendor 공식 datasheet + web search + master 박제 cross-check
5. 외부 추정 박제 시 † footnote 필수 ("본 vault 미측정, 외부 X 표준 자료 추정")

→ 자세한 cascade 박제는 myWiki entity 5건 (frontmatter 참조) + onDevice_AI vault 단일 출처 우선.

---

# Stage 4 (On-Device AI) 신설 검토 + 4.5-Stage 패키지 확장

## 한 줄 결론

> **Stage 4 (On-Device AI) 신설 채택. 패키지를 3.5-Stage → 4.5-Stage로 확장. 단가 1,500만/모듈, Stage 0 견적서 옵션 섹션에 한 줄 추가.**

---

## 1. 검토 배경

myWiki ontology에 명시된 신설 후보:
- `{from: "3.5-Stage 패키지", to: "On-Device AI", relationType: "Stage 4 신설 후보이다"}`

검토 트리거:
- 사용자 강점 영역(임베디드 38년 + AI 통합)이 On-Device AI 시장에 정확 매칭
- Hailo-8 / Jetson Orin / SLM(Small Language Model) 시장 형성 (2024~2025)
- microGPT(Karpathy 4,192 파라미터) 검증으로 ESP32-S3 탑재 가능성 입증
- 기존 3.5-Stage는 클라우드/네트워크 의존 — 차별화 가치 부족

---

## 2. On-Device AI 시장 분석 (요약)

### 시장 동력
| 동력 | 내용 |
|---|---|
| 보안 | 데이터 외부 유출 0% (제조·의료·국방 강한 수요) |
| 비용 | 클라우드 추론비 → 0 (1회 보드 비용만) |
| 인터넷 끊김 | 공장·차량·해외에서도 동작 |
| 지연시간 | 클라우드 RTT 200ms → 로컬 추론 10~50ms |

### 시장 보드 옵션
| 보드 | 가격대 | TFLOPS | 적용 시나리오 |
|---|:-:|:-:|---|
| **Hailo-8** | 7~15만 | 26 | 산업용 비전·예측정비 |
| **Jetson Orin Nano** | 50~70만 | 40 | 로봇·드론·자율주행 |
| **Jetson Orin NX** | 100~150만 | 100 | 휴머노이드·차량 SDV |
| **ESP32-S3** | 1~2만 | 0.001 | IoT·센서·응원봉(SLM 4K 파라미터) |
| **Raspberry Pi 5 + Coral** | 15~25만 | 4 | 교육·MVP·소형 |

### 사용자 자산 매칭
- **Hailo-8 / Jetson**: 스마트팩토리 25개 데모 + 파쇄기 AI 85억 제안서 → 즉시 영업 진입
- **ESP32-S3**: AI FanStick 특허 + microGPT 검증 → 양산 제품 라인
- **Raspberry Pi 5**: 교육 자산 (uttec-edu Track F)

---

## 3. Stage 4 정의

### 산출물 (1,500만 / 모듈 / 표준 4주)

| # | 산출물 | 내용 |
|:-:|---|---|
| 1 | **보드 시스템** | Hailo-8 또는 Jetson Orin Nano 또는 ESP32-S3 (고객 요구 맞춤 1종) |
| 2 | **모델** | SLM 1~7B 파라미터 또는 microGPT 변종 (도메인 fine-tuning 1회) |
| 3 | **C++ 추론 엔진** | 사용자 38년 임베디드 자산 활용, 실시간 처리 (10~50ms) |
| 4 | **통합** | 기존 Stage 0 인프라(n8n + Obsidian + Memory MCP)와 연결 |
| 5 | **운영 매뉴얼 + 영상** | PDF 30p + 1시간 강의 (Stage 0 패턴 준수) |
| 6 | **30일 무상 지원** | 영업일 24h 이내 응답 (Stage 0 패턴 준수) |

### 진행 일정 (4주)

| Week | 작업 |
|:-:|---|
| 1 | 사전 미팅 (요구사항 + 보드 결정 + 모델 후보 결정) + 보드 입수 |
| 2 | C++ 추론 엔진 + 모델 fine-tuning |
| 3 | Stage 0 인프라 통합 + 운영 매뉴얼 작성 |
| 4 | 검증 + 사용자 교육(1시간) + 인계 |

### 미포함 (옵션)
- 추가 보드 1종당 +500만 (다중 보드 시)
- 모델 fine-tuning 추가 1회당 +300만
- 양산 BOM 설계 (별도 협의)

---

## 4. 1,500만 적정성 검증

### 비교 견적

| 패키지 | 단가 | 시간 | 시간당 |
|---|:-:|:-:|:-:|
| Stage 0 (Core Services) | 500만 | 5일 | 100만/일 |
| Stage 1 (교육) | 300만 | 5일 | 60만/일 |
| Stage 2 (위키 + 워크플로우) | 2,500만 | 1.5개월 | 80만/일 |
| Stage 3 (운영 앱) | 2,500만 | 1.5개월 | 80만/일 |
| **Stage 4 (On-Device AI)** | **1,500만** | **4주** | **75만/일** |

→ Stage 2·3과 비슷한 시간당 단가. 보드 비용(7~150만)은 별도 청구 또는 포함 협의.

### 시장 가격 비교

| 외주 견적 (시장) | 단가 |
|---|---|
| Hailo-8 + 펌웨어 통합 (소형 SI) | 1,500~3,000만 |
| Jetson Orin + 모델 fine-tuning | 2,000~4,000만 |
| 대기업 R&D 외주 (Samsung/LG급) | 5,000만~ |

→ **1,500만은 시장 하한선 수준**. 단, 사용자 1인 + 자체 인프라(myWiki·Memory MCP)로 비용 절감 가능 → 적정.

### 결론
**1,500만 적정.** 보드 비용은 별도 옵션(별도 청구 / 포함 협의)으로 처리.

---

## 5. 기존 Stage 1·2·3과의 관계

### 종속 vs 독립

| 시나리오 | 가능 여부 | 권장 |
|---|:-:|---|
| Stage 0 + Stage 4 (Stage 1·2·3 생략) | ✅ 가능 | 임베디드 특화 고객 |
| Stage 1·2·3 완료 후 Stage 4 추가 | ✅ 가능 | 풀스택 패키지 |
| Stage 4 단독 (Stage 0 없이) | ⚠️ 비권장 | 인프라 없이 진행 시 통합 어려움 |

→ **Stage 4는 옵션, 독립 신설 가능**. 단 Stage 0(인프라)이 선결 조건 권장.

### 통합 매핑 (Foundry 5층 아키텍처와)
- Stage 0 = Foundry 1층 (Core Services)
- Stage 1 = Foundry 4층 (Analysis) 일부 + 교육
- Stage 2 = Foundry 2~3층 (Data Connection + Ontology)
- Stage 3 = Foundry 5층 (Application)
- **Stage 4 = Foundry 4층 보조 (On-Device 추론) + Application 확장**

---

## 6. 영업 시나리오 (고객 매칭)

### 시나리오 A — 한국기계 (스마트팩토리)
- Stage 0 (인프라) → Stage 1 (교육) → **Stage 4 (Hailo-8 예측정비)**
- 매출 합: 500 + 300 + 1,500 = 2,300만
- Stage 2·3까지 가면: 5,800만 ~ 7,300만

### 시나리오 B — 자영업 / 1인 사업자
- Stage 0 → Stage 1 (교육) — Stage 4 미포함
- 매출 합: 800만 ~ 1,000만

### 시나리오 C — 임베디드 신생기업 / IoT 스타트업
- Stage 0 (선택) + **Stage 4 단독** (ESP32-S3 SLM 탑재)
- 매출 합: 1,500 ~ 2,000만
- **실증 데이터** (2026-05-08 Phase 1A·1B 완료):
  - microGPT 4,192 파라미터 PC 직접 실행 성공 (Loss 3.37 → 2.65, ~3분)
  - INT8 양자화: 4.1 KB / SRAM 520KB의 0.79% (압도적 여유)
  - ESP32-S3 추정 추론 시간: token당 0.1~5 ms (인터랙티브 < 1초)
  - C++ 포팅: 약 500~700줄 (1~2주), ESP-DSP SIMD 활용
  - **차별화 카피**: "1인이 PC에서 직접 검증한 ESP32-S3 SLM 사례 보유"

#### 사례 카드: AI FanStick (응원봉 자체 GPT) — Stage 4 첫 PoC

> **본 사례는 PR·B2B 영업·강의 콘텐츠 트랙 한정**. AI FanStick 응원봉 양산은 별도 트랙(스마트폰 Gemma 2B 하이브리드, `응원봉/newMvp/온디바이스_AI_검토서.md`)으로 잠금. 본 사례는 "ESP32-S3 PoC 보유"의 영업 무기로 활용. 정지선 근거: `myWiki/.../thoughts/2026-05-08_응원봉-온디바이스AI-정지선.md`.

| 항목 | 값 |
|---|---|
| **사례명** | "1만원 칩에 GPT 200줄 — UTTEC 한국 최초 시연" |
| **하드웨어** | ESP32-S3 (1만원 단일 보드) |
| **모델** | Karpathy microGPT 4,192 파라미터 (Python 200줄) |
| **PoC 결과 (Phase 1A·1B, 5/8)** | INT8 4.1 KB / SRAM 0.79% / 추론 0.1~5 ms / token |
| **Phase 2 산출 (보드 도착 후)** | hello_world + C++ 포팅 + LED 시연 영상 1편 |
| **활용 채널** | Stage 4 영업 (한국기계·임베디드 스타트업) / 강사양성 Day 5 / 호오컨설팅 / 인프런 / 변리사 미팅 (특허 보강) |
| **첫 영업 시도 시점** | Phase 2 완료 후 (~7월) |
| **차별화 메시지** | "다른 강사·외주는 보드 검증 없이 제안만. UTTEC는 PC PoC + ESP32-S3 시연 영상 보유" |

**Stage 4 영업 시 사용 시나리오**:
1. 첫 미팅: PC PoC 결과 표 + 모델 매트릭스 시연 (3분)
2. 두 번째 미팅: ESP32-S3 보드 시연 영상 (Phase 2 산출, 5분)
3. 견적 제안: 1,500만 / 4주 (보드 + 모델 fine-tune + 통합 + 매뉴얼)
4. 후속: 강의 사례·특허 보강으로 신뢰 누적

**활용 금지 카피 (응원봉 C2C용 X)**: "응원봉 자체 AI 비서" — 사용자 기대 격차로 클레임 위험. 본 카피는 B2B/PR/강의 청자에게만.

### 시나리오 D — 풀스택 (대형 고객)
- Stage 0 + 1 + 2 + 3 + 4 = **7,300만**
- 26% 매출 상승 (vs 현재 5,800만)

---

## 7. 견적서 / 영업 자료 갱신

### Stage 0 견적서 갱신 (영업/Stage0_Core_Services_견적서.md §5)
"미포함 (옵션)" 섹션에 Stage 4 한 줄 추가:
```
- Stage 4 On-Device AI (1,500만 / 4주):
  Hailo-8 또는 Jetson Orin 또는 ESP32-S3 + 모델 fine-tuning + C++ 추론 엔진 + 통합
```

### myWiki entity 신설
- `entities/uttec-stage-package.md` — 4.5-Stage 패키지 정의 + Stage 0~4 매트릭스

### ontology 갱신 (Memory MCP)
- 기존: `from: "3.5-Stage 패키지", to: "On-Device AI", relationType: "Stage 4 신설 후보이다"`
- 갱신: `relationType: "Stage 4이다"` (신설 후보 → 신설 완료)
- 별도 작업 (Memory MCP MCP 명령 또는 ontology/memory.json 직접 편집)

---

## 8. 다음 액션

| 시점 | 액션 | 담당 |
|:-:|---|:-:|
| 즉시 | Stage 0 견적서 갱신 (Stage 4 옵션 한 줄) | Claude (이번 작업으로 처리) |
| 즉시 | myWiki entity + log + ai-direction 갱신 | Claude (이번 작업으로 처리) |
| T-1주 | 다음 영업 미팅 시 Stage 4 안내 (구두) | 사용자 |
| T-1개월 | 첫 Stage 4 수주 시도 (한국기계 또는 임베디드 스타트업) | 사용자 |
| T-2개월 | 첫 Stage 4 산출물 — 보드 + 모델 + 추론 엔진 | 사용자 + Claude |
| T-3개월 | Stage 4 사례 1건 → 마케팅 자료화 | 사용자 |

---

## 9. 한 줄 결론

> **3.5-Stage → 4.5-Stage 확장 채택. Stage 4 (On-Device AI) 1,500만/4주 신설. Stage 0 견적서 옵션 섹션에 한 줄 추가. 첫 Stage 4 수주 목표는 한국기계(스마트팩토리) 또는 임베디드 스타트업.**

---

## 10. v2.5 mandate 검증 결과 통합 (2026-05-22 갱신)

> 본 § 10은 **2026-05-20~22 v2.5 mandate 5/6 Round 완료** 시점에 추가된 정량 박제. § 1~9는 2026-05-07 1차 검토 결정 그대로 보존, § 10은 영업 자료 cascade.

### 10.1 한 줄 핵심

⭐⭐⭐ **3계열 AI 가속 매트릭스 완성** (LX7 ESP-DSP **+13.4×** / Cortex-M4F CMSIS-NN **+3.23×** / Mobile NPU NNAPI **‒79~421× 손해**) + **13/13 보드 측정 완료** (197 측정 셀 박제) + **Stage 4 칩 선택 가이드 application class별 RAM tier 정량 근거 확립**. AI FanStick 차세대 결정타 = **C3→S3+ESP-DSP 24.8× 가속** (SLM 응답 1초 → 0.07초).

### 10.2 v2.5 mandate 완료 매트릭스

| Round | 검증 결과 | 영업 가치 |
|:-:|---|---|
| 16 sanity | INT8 saturation 5보드 공통 quirk = 본 vault skeleton 자체 한계 박제 | 측정 신뢰성 보강 |
| **17 ESP-DSP** ⭐⭐⭐ | esp32s3 `dsps_dp_s8_aes3` MLP 128 **1,452μs → 108μs = 13.4×** | **AI FanStick 결정타** |
| 17.5 CNN/TF | TF 64 SRAM **10.8×** / PSRAM 효과 무효 / CNN 1.00× | TF Attention 가속 박제 |
| **18 CMSIS-NN** ⭐⭐ | pca10056 (Cortex-M4F) `arm_fully_connected_s8` MLP 128 **7,367μs → 2,285μs = 3.23×** | **B2B nRF52840 SoC 정량 근거** |
| 18 후속 | pca10040 (64KB) 12/12 RAM wall = "nRF52832 부적합, nRF52840 필수" | RAM tier 결정타 |
| **19 NNAPI** ⭐⭐⭐ | Galaxy A51 5G Eden NPU MLP 128~16384 **5/5 셀 79~421× 손해** | **Mobile NPU 부적합 박제** |
| 20 LoRA | 보류 (별도 환경 셋업 3~7일) | AI FanStick 개인화 |

→ 5/6 Round 완료, ~3일 진행, 빌드 함정 ~15건 박제 (Espressif 4 + Nordic 11).

### 10.3 3계열 AI 가속 매트릭스 (단일 클럭 normalize)

| ISA | 클럭 | MLP 128 latency | cycle-per-MAC normalize | 효율 |
|---|---|---:|---:|---|
| **Xtensa LX7** (esp32s3) | 240MHz | **108μs** (ESP-DSP) | 25,920 cycles | ⭐⭐⭐ **13.4×** |
| **Cortex-M4F** (pca10056) | 64MHz | **2,285μs** (CMSIS-NN) | 146,240 cycles | ⭐⭐ **3.23×** |
| Cortex-A77 + NPU (smartphone) | 2.2GHz | 51μs CPU baseline / NPU 79~421× 손해 | — | ⚠️ NPU 부적합 |
| Xtensa LX6 (esp32wroom) | 240MHz | 3,793μs (ansi fallback) | 910,320 cycles | ⚠️ 0.65× 손해 |

→ **AI 가속 = ISA-specific instruction 폭 결정타** (LX7 128-bit AI Vector ≫ M4F 32-bit DSP SMLAD ≫ Mobile NPU). 클럭 normalize 시 LX7 **5.64× M4F 단위 효율 우위**.

### 10.4 ⭐⭐⭐ Stage 4 칩 선택 가이드 (application class별, 5/22 완성형)

| 응용 class | RAM tier | 권장 칩 | 가속 |
|---|---|---|---|
| **응원봉 SLM** (Korean-Small 154K) | 512KB+ PSRAM | **ESP32-S3 + PSRAM 8MB** | ESP-DSP **24.8×** (C3→S3+DSP 종합) |
| **B2B BLE+AI 통합 SoC** (KWS / anomaly / vital sign) | 256KB | **nRF52840** | CMSIS-NN **3.23×** + BLE5 + USB + NFC |
| **Mobile T3 응용** (앱 통합 AI) | GB | **smartphone CPU SIMD** (asimddp) | NPU NNAPI 피하기 |
| **저전력 BLE-only** | 64KB | nRF52832 | ❌ **AI 불가** (mandate 12/12 RAM wall) |
| **표준 CV** (MobileNet 등) | NPU | Mobile NPU (별도 모델 형식 필요) | NNAPI OK (skeleton class 외) |

### 10.5 시나리오별 권장 갱신 (5/22 v2.5)

#### 시나리오 A (한국기계 스마트팩토리) — § 6.A
v2.5 보강: **이상감지 KWS / 진동 anomaly detection → nRF52840 + CMSIS-NN (3.23× 가속, BLE5 통합)**. 1,500만 단가 정당화 = "검증된 3.23× 가속 + 11건 빌드 함정 인벤토리 즉시 적용 (시행착오 비용 절감)".

#### 시나리오 C (임베디드 스타트업 / IoT) — § 6.C
v2.5 보강: **칩 선택 컨설팅 자체가 영업 차별화**. 클라이언트가 "AI 가속 칩 필요" 요청 시:
1. application class 사전 확인 (KWS / anomaly / SLM / CV?)
2. RAM 요구사항 측정 (mandate 셀 fit/wall 패턴 참조)
3. ISA 가속 매칭 (LX7 / M4F / NPU / CPU SIMD 중 선택)
4. cross-vendor 빌드 함정 인벤토리 즉시 적용

→ 클라이언트는 "AI 칩 = NPU = TOPS 광고" 함정 회피 가능 → **vendor 광고 vs 실측 격차 검증 SOP** 자체가 영업 자산.

#### 신규 시나리오 E — AI FanStick 차세대 양산 (양산 트랙)

| 항목 | 현재 (ESP32-C3 클라우드 API) | 차세대 (ESP32-S3 + ESP-DSP) |
|---|:-:|:-:|
| 칩 | ESP32-C3 (RISC-V 160MHz) | **ESP32-S3 (Xtensa LX7 240MHz) + PSRAM 8MB** |
| AI | 클라우드 API (Claude/GPT) | **microGPT/SLM on-chip (외부 인터넷 0%)** |
| MLP 128 latency | RAM wall (400KB) | **108μs (ESP-DSP)** ⭐ |
| SLM 응답 (Korean-Small 154K) | ~3~5초 (네트워크) | **~70ms (on-chip)** ⭐⭐⭐ |
| 차별화 | 음성+AI+BLE | **+ 외부 인터넷 0% + 응원봉 자체 GPT** |
| BOM 변화 | 1.84× 칩가격 (PSRAM 8MB 추가) | 종합 24.8× 가속 효과 (5/20+22 실측 박제) |

### 10.6 ⚠️ Mobile NPU 부적합 박제 (영업 결정타)

**Round 19 결과**: Galaxy A51 5G Eden NPU (NNAPI) MLP 128~16384 **5/5 셀 모두 CPU + asimddp 대비 79~421× 손해**. eden-drv (ACCELERATOR/NPU, EdenDriver_1_3) auto-pick + v2 reusable+burst 최적화 후에도 변화 미미 → NPU dispatch path 자체 비효율 (overhead가 아닌 구조적 부적합).

→ **영업 결정타**: 클라이언트가 "Mobile NPU 활용 AI 앱" 요청 시 application class 사전 확인 필수:
- ✅ NPU OK = MobileNet conv / batch>1 / fixed graph (표준 ML model)
- ❌ NPU 손해 = plain INT8 small dense / batch=1 (본 vault skeleton class) → **CPU + SIMD (asimddp) 권장**

→ vendor TOPS 광고 신뢰성 검증 SOP: "TOPS 수치 ≠ application 성능". Round 17/18/19 3 회 누적 = "AI 가속 = ISA-specific instruction 폭 × workload class 매칭 × RAM tier 적합도" 3조건 곱 원칙 박제.

### 10.7 Nordic + Espressif 빌드 함정 인벤토리 (강사양성 자산)

**11건 Nordic (5/21~22) + 4건 Espressif (5/20) = 15건 cross-vendor 인벤토리**:

| Vendor | 카테고리 | 함정 수 | 강사양성 모듈 |
|---|---|:-:|---|
| Espressif | 한글 경로 / ESP-DSP API / esp-dsp dependency / PSRAM 효과 | 4 | Day 5 — ESP-IDF 빌드 환경 |
| Nordic | Claude Code cwd / Zephyr config / newlib stdio / monitor race / USB CDC / APPROTECT / USB re-enum | 11 | Day 5 — Zephyr 빌드 환경 |

→ **자료 활용**:
- **위시캣 임베디드 견적**: "검증된 빌드 함정 인벤토리 15건 즉시 적용 — 시행착오 ~3일 절감" 제안 가능
- **강사양성 Day 5 모듈**: ESP-IDF + Zephyr 2 vendor 빌드 함정 비교 강의 (실제 6 vault Claude 인스턴스 누적 박제)
- **Stage 4 영업**: cross-vendor 인벤토리 자체가 "현장 경험" 증명 자료

### 10.8 영업 자산 우선순위 (5/22 갱신)

| 항목 | 영업 사용 시점 | 자산화 위치 |
|---|---|---|
| **3계열 매트릭스 (LX7 / M4F / NPU)** | Stage 4 칩 선택 컨설팅 첫 미팅 | 본 § 10.3 |
| **Stage 4 칩 선택 가이드 5행** | 응용 class 매칭 결정 | 본 § 10.4 |
| **AI FanStick 24.8× 결정타** | K-POP B2B 라이센스 협상 | 본 § 10.5 시나리오 E |
| **Mobile NPU 부적합 박제** | "AI 가속 = NPU" 함정 클라이언트 교정 | 본 § 10.6 |
| **빌드 함정 15건 인벤토리** | 임베디드 견적 차별화 / 강사양성 차수 신규 | 본 § 10.7 |

### 10.9 후속 (Stage 4 첫 수주 준비)

| 시점 | 액션 | 담당 |
|:-:|---|:-:|
| 즉시 | 본 § 10 외부 영업 자료 cascade ✅ (본 작업) | Claude |
| T-1주 | mywiki 흡수 카드 ack 추적 (Round 18 후속 = 13/13 보드 완성) | Claude |
| T-1주 | 한국기계 다음 미팅 시 § 10.4 칩 선택 가이드 안내 (구두) | 사용자 |
| T-2주 | 강사양성 Day 5 모듈 — 15건 빌드 함정 강의안 1차 작성 | 사용자 + Claude |
| T-1개월 | 첫 Stage 4 수주 시도 (한국기계 또는 임베디드 스타트업) | 사용자 |
| T-2개월 | Round 20 (esp32s3 on-device LoRA fine-tuning) 시작 → AI FanStick 차별화 (개인화) | 사용자 + Claude |

### 10.10 cross-link (v2.5 단일 출처)

본 § 10 cascade 본 vault의 다음 단일 출처와 일관:

- `onDevice_AI/프로젝트_보드한계모델_v2.5/99_종합_v2.5.md` — v2.5 mandate 종합 (5/6 Round, 3계열 매트릭스, 13/13 보드, 15건 함정 단일 출처)
- `onDevice_AI/프로젝트_보드한계모델_v2.5/99_종합_v2.5.html` — 다크 테마 HTML cascade (동일 내용 시각화)
- `onDevice_AI/business/entities/AI_FanStick.md` "기술 근거" + "영업 진행 상태" 표 (Round 17/18/18후속/19 행)
- `onDevice_AI/프로젝트_보드한계모델/04_종합_비교.md § 9 (R17)·§ 10 (R18)` — v2.4 종료 박제 후속
- `myWiki/second-brain/entities/onDevice-ai.md` § "MCU AI 가속 매트릭스" + `entities/ai-fanstick.md` 3계열 매트릭스 행 + `entities/uttec-stage-package.md` Stage 4 칩 선택 가이드 (mywiki 5/22 5단계 흡수 완료, 5/23-001 ACK 수신)

→ **단일 출처 원칙**: 본 § 10이 외부 영업 자료의 cascade 단일 출처. 다른 영업 자료(견적서·미팅 자료)는 본 § 10 참조 또는 cascade 진행.

---

## 메타

| 항목 | 값 |
|---|---|
| 검토 시간 | 2026-05-07 14:50 ~ 15:50 (1시간) |
| 결정 | 채택 (4.5-Stage 확장) |
| 매출 임팩트 | 5,800만 → 최대 7,300만 (+26%) |
| 종속 작업 | microGPT 직접 실행 테스트(#18 ✅ 5/8 완료), AI FanStick ESP32-S3 검증 (Phase 2 보드 도착 후) |
| Phase 1A 결과 | Loss 3.37→2.65 / 4192 params / INT8 4.1KB / SRAM 0.79% / 추론 0.5ms·PC |
| Phase 1B 결과 | ESP32-S3 추정 token당 0.1~5ms / C++ 500~700줄 / 1~2주 / 포팅 가능 |
| 권장 모델 | Korean-Small 154K params INT8 (한국어 짧은 응원 응답) |
| myWiki 갱신 | log.md decision, ai-direction.md 판단 로그, entities/uttec-stage-package.md 신설 |
| **v2.5 cascade (5/22)** | **§ 10 신설** — 3계열 매트릭스 (LX7 13.4× / M4F 3.23× / NPU 손해) + 13/13 보드 (197 셀) + Stage 4 칩 선택 가이드 5행 + 빌드 함정 15건 인벤토리 + 시나리오 E (AI FanStick 양산 트랙) |
| **v2.5 단일 출처** | `onDevice_AI/프로젝트_보드한계모델_v2.5/99_종합_v2.5.{md,html}` (5/6 Round 종결 시점 카드) |
| **mywiki 흡수 완료** | 4건 (Round 16/17/18/19 + Round 18 후속 = 13/13 보드 완성) |
