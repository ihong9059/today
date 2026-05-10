---
title: AI On-Device 검토 — 현재 흐름과 향후 전망
type: analysis
created: 2026-05-05
updated: 2026-05-05 (후속 분석 3종 추가: humanoid / sdv / federated-learning)
tags: [on-device, edge-ai, slm, npu, tinyml, 2026, 산업동향]
links: [영업전략, ai-direction, 스마트팩토리, uttec-edu, 양산제품]
source: WebSearch + Anthropic Claude 분석
---

# AI On-Device — 현재 흐름과 향후 전망

> **한 줄 결론**: 2025~2026년이 **"클라우드 AI → 온디바이스 AI"** 변곡점. SLM(소형 언어모델) + NPU 보편화로 **태스크 특화 AI는 내 디바이스에서 작동**이 새로운 표준이 됐다. UTTEC의 임베디드 38년 + AI 통합 강점이 이 흐름의 정중앙.

---

## 1. 한눈 요약 — 무엇이 바뀌었나 (2025 → 2026)

| 측면 | 2024년까지 | **2026년 5월 현재** |
|------|---------|---------|
| **모델 크기** | 70B~175B (LLM) 클라우드 의존 | **1B~14B SLM이 실용 영역 점령** |
| **추론 위치** | API 클라우드 호출 | 폰·노트북·SBC에서 직접 |
| **속도** | 수 초 (왕복 시간 포함) | **20~30 토큰/초** 폰에서 |
| **양자화** | FP16 기본 | **4-bit Q4 표준**, 650MB로 1B 모델 적재 |
| **NPU TOPS** | 10~30 (스마트폰), 0~10 (PC) | **80 TOPS** (Snapdragon X2 Elite) / 40~55 (Apple M5) |
| **비용 모델** | API 호출당 과금 | **추론 비용 0** (전기료만), 초기 디바이스 비용 |
| **개인정보** | 외부 서버 경유 | **데이터 디바이스 외부로 안 나감** |

→ **3년 전 데이터센터에서만 가능했던 능력이, 2026년 노트북·폰·SBC에서 실시간 작동.**

---

## 2. 시장 규모 (수치로 본 흐름)

| 시장 | 2025 | 전망 | CAGR |
|------|-----|------|------|
| **Edge AI 전체** | — | $66.47B (2030) | 21.7% |
| **SLM (소형 LM)** | $0.93B | $5.45B (2032) | **28.7%** |
| 클라우드 AI 비용 절감 | — | **70% 감축** (SLM 도입 시) | — |
| Gartner 예측 | — | 2027년 **태스크 특화 AI 모델 = LLM의 3배 사용** | — |

> **신호**: SLM 시장 28.7% CAGR은 LLM 시장(약 35~40% 추정)보다 낮지만 **이미 클라우드 비용을 70% 잠식**. 즉 같은 일을 하는 데 LLM 사용이 줄어들고 있다는 뜻.

---

## 3. 모델 계층 — 어디에 무엇이 도는가

### 3-1. 모델 크기별 매트릭스

| 크기 | 대표 모델 (2026.05 기준) | 가용 디바이스 | 메모리(Q4) | 토큰/초 |
|:----:|------------------------|------------|---------|------|
| **<300M** | SmolLM2 135M, Gemma 3 270M | MCU+, 라즈베리파이 | ~150MB | 50+ |
| **1B~3B** | **Llama 3.2 1B/3B**, Phi-4 mini 3.8B, Qwen3 1.5B | 스마트폰 (iPhone 12+), 노트북 | 650MB~2GB | 20~30 |
| **7B~14B** | Llama 3.x 7B, Mistral 7B, **Phi-4 14B**, Gemma 3 9B | 노트북 (16GB+), Mac | 4~8GB | 8~20 |
| **70B+** | Llama 3.1 70B, Qwen 2.5 72B | 워크스테이션, 다중 GPU | 35GB+ | 1~5 |
| **Cloud only** | GPT-5, Claude Opus 4.7 | 데이터센터 | — | API |

### 3-2. 핵심 사실 — 2026 SLM의 충격

- **Phi-4 14B가 GPT-5를 수학에서 이김** (MATH 84.8%, GPQA 82.5%) — **로컬에서 15배 빠름**
- **Llama 3.2 1B**: iPhone 12+ Android 플래그십에서 20~30 tokens/sec, **4-bit 양자화 시 650MB**
- **SLM 운용 비용**: 70B LLM 대비 **10~30배 저렴**, 전체 비용 **75% 절감**
- **사설 엔드포인트 SLM** (1만 쿼리/일): $500~$2,000/월 vs **LLM API: $5K~$50K/월**

### 3-3. 양자화·최적화 기법

| 기법 | 효과 |
|------|------|
| **4-bit 양자화 (Q4)** | 메모리 1/4, 정확도 손실 <2% |
| **Speculative decoding** | 작은 draft 모델이 다중 토큰 예측 → 큰 모델 검증 → **2~3배 속도** |
| **Flash Attention 3** | KV 캐시 효율 대폭 개선 |
| **MoE (Mixture of Experts)** | 활성 파라미터만 계산 → 효율 ↑ |
| **MLA / GQA** | 메모리 사용량 ↓ (DeepSeek-V3 패턴) |

---

## 4. 하드웨어 계층 — TOPS와 와트의 균형

### 4-1. 디바이스 등급별 NPU 성능 (2026 기준)

| 등급 | 대표 칩 | NPU TOPS | 전력 | 용도 |
|:----:|---------|:------:|:----:|------|
| **데이터센터 GPU** | NVIDIA H100/H200 | (수만) | 400W~ | 학습 + 70B+ 추론 |
| **워크스테이션** | RTX 4090/5090 | 1000+ | 350W | 70B 로컬 추론 |
| **AI 노트북 (2026 신표준)** | Snapdragon X2 Elite | **80** (Hexagon NPU 6) | 15~25W | 14B SLM 실시간 |
| | Apple M5 (MLX) | 40~55 + GPU 가속기 | 15~30W | 멀티모달 |
| | Intel Core Ultra 300 (Panther Lake) | 50 + GPU 120 = **180** | 28W | 통합 |
| | AMD Ryzen AI 400 | 60 | 28W | 표준 AI PC |
| **임베디드 SBC** | NVIDIA Jetson AGX Orin | **275** | 60W | 산업·로보틱스 |
| | NVIDIA Jetson Orin Nano | 67 | 7~25W | 스마트팩토리 |
| | **Hailo-8** | 26 | **2.5~3W** | 카메라·IoT (perf/W 1위) |
| | Hailo-15 | — | <5W | 산업 카메라 30fps |
| **마이크로컨트롤러** | ESP32-S3 (벡터명령) | 0.5~1 | <0.5W | TinyML |
| | STM32H7 (Cortex-M7) | 1~2 | <1W | 음성·비전 (간단) |
| | ARM Ethos-U55/U65 | **0.5~2 TOPS NPU** | <0.1W | 옵션 NPU 모듈 |

### 4-2. AI 노트북의 "40 TOPS 베이스라인" — 새 표준

2026년부터 Microsoft "Copilot+ PC" 인증 = **NPU 40 TOPS 이상**.
→ Snapdragon X (75 TOPS), Apple M5 (40~55), Intel Core Ultra 300 (50 NPU + iGPU 통합 180), AMD Ryzen AI 400 (60) **모두 통과**.
→ **AI PC 보급률 급증** 중. 2026년 출하 노트북의 약 30%가 NPU 탑재.

### 4-3. Edge AI 칩 perf/W 챔피언 — Hailo

- **Hailo-8**: 26 TOPS @ 2.5~3W (perf/W 9~10 TOPS/W)
- 산업용 카메라·로봇·드론에 최적
- 비교: Jetson Orin Nano 67 TOPS @ 25W = 2.7 TOPS/W

→ **상시 가동 비전 AI**(보안 카메라, 검사 라인)는 Hailo가 우세.

---

## 5. 프레임워크 / 런타임 — 실전 도구

| 프레임워크 | 타깃 | 특징 |
|---------|------|------|
| **Apple MLX** | Apple Silicon (M1~M5) | Unified Memory 최적화, 양자화 빌트인, Swift 통합 |
| **CoreML** | iOS/macOS | Apple Neural Engine 직접 |
| **llama.cpp** | 모든 CPU/GPU | C++ 단일 바이너리, GGUF 포맷 표준 |
| **ExecuTorch** | Edge Android/iOS | PyTorch 직접 onDevice 배포 |
| **MLC LLM** | 모바일·웹 | TVM 컴파일, WebGPU 지원 |
| **TFLite Micro** | MCU (Cortex-M, ESP32) | int8 양자화, 2~4배 가속 (CMSIS-NN) |
| **ONNX Runtime** | 범용 (NPU·GPU·CPU) | 표준 포맷, 다양한 하드웨어 |
| **Edge Impulse** | TinyML 노코드 | 학습 → 변환 → 디바이스 배포 흐름 |
| **NVIDIA TensorRT-LLM** | Jetson, RTX | 양자화·속도 1.5~3배 |
| **vLLM (서버 OK)** | GPU | 처리량 최적화 (서버형) |

→ **2026 표준 스택**: 모델은 Hugging Face → llama.cpp/MLX/ExecuTorch로 변환 → 디바이스 배포.

---

## 6. 산업별 사례 — 어디에 도입되고 있나

### 6-1. 제조·산업 자동화

- **Humanoid HMND 01** (Jetson Thor 탑재): Siemens 독일 Erlangen 공장에서 **자율 물류 PoC 완료** (2026)
- **시각 검사 자동화**: reComputer J1020v2 + Jetson Nano로 라벨·인증마크·명판 OCR (Seeed Studio)
- **Hailo-15 산업 카메라**: 30fps 실시간 검사, **<5W**로 컴팩트 디바이스 가능
- **NVIDIA Hannover Messe 2026 발표**: Nemotron, Cosmos, Isaac GR00T 모델이 Jetson에서 도는 시대 진입
- **트렌드**: 하나의 인스펙션 = 하나의 SLM + Vision 모델 (제품마다 fine-tune)

### 6-2. 헬스케어·웨어러블

- **Heidi Remote (2026-03 출시)**: 의료 상담 녹음 + STT 전체 디바이스 처리, 인터넷·폰 의존 0
  - 암호화된 오디오·텍스트 로컬 저장
  - **단**: 트랜스크립트가 결국 클라우드 가면 GDPR/HIPAA 동일 적용
- **HIPAA 적용 한계**: 소비자 웨어러블은 대부분 HIPAA 적용 외 → 프라이버시 격차
- **2024~2025 단속**: 피트니스·웰빙 앱이 생체 데이터 3rd party 공유 → 다수 처벌
- **트렌드**: "데이터가 디바이스 밖으로 안 나감"이 영업 카피이자 컴플라이언스 무기

### 6-3. 모바일·소비자 AI

- **Apple Intelligence** (M5 기반): MLX로 LLM 추론, **Neural Accelerators**가 행렬연산 전담
- **Snapdragon X2 Elite**: M4 대비 95% / Lunar Lake 대비 122% 빠른 NPU
- **음성 어시스턴트**: 실시간 전사·번역·요약 모두 디바이스 내부
- **사진 향상**: 슈퍼 해상도, 노이즈 제거, 객체 제거 — GPU 대신 NPU가 처리

### 6-4. 임베디드 IoT (TinyML)

- **ESP32-S3**: 벡터 명령으로 NN 가속, Wi-Fi 직접 통신 → IoT 고전 영역
- **STM32H7**: Cortex-M7 + 옵션 암호화 엔진 → 음성·간단 비전
- **Cortex-M4 + CMSIS-NN**: int8 양자화 시 float32 대비 **2~4배 속도**
- **사례**: 진동 센서 이상 감지, 음성 키워드(Wake Word), 동작 분류, 환경 모니터링

---

## 7. 향후 전망 — 1년 / 3년 / 5년

### 1년 (2026 ~ 2027)
- **SLM 1B~14B가 절대 다수 실전 영역 점령** (LLM은 frontier 작업에 한정)
- **AI PC NPU 40 TOPS 베이스라인** 보편화 (Microsoft Copilot+ PC 인증 표준화)
- **Speculative Decoding 기본**: 모든 추론 엔진에 빌트인
- **Edge AI 카메라 가격 50% 하락** (Hailo·Jetson 보급)
- **휴머노이드 양산 시작** (Figure, 1X, Tesla Optimus, Apptronik) — Jetson Thor 등 탑재

### 3년 (2026 ~ 2029)
- **마이크로컨트롤러 NPU 표준화**: Cortex-M에 Ethos-U 통합, 1~2 TOPS @ 0.1W
- **온디바이스 멀티모달 SLM** (이미지+텍스트+오디오) 실용화
- **온디바이스 RAG**: 디바이스 내부 임베딩 + 벡터 DB 표준 워크플로우
- **NPU 200~300 TOPS 노트북**: 14B 모델 실시간 다중 추론
- **SLM API 비즈니스 정착**: $500/월 사설 엔드포인트가 SaaS 표준

### 5년 (2026 ~ 2031)
- **모든 가전·차량·로봇이 SLM 탑재**: 토스터부터 자율주행까지 LLM의 일부 능력
- **클라우드 AI ↔ 디바이스 AI 협업 모델**: 일상은 디바이스, 어려운 건 클라우드
- **온디바이스 학습** (Federated Learning + 개인화 fine-tune) 보편화
- **개인 데이터 주권 = 디바이스 처리** (규제 강화 + 사용자 인식)
- **차세대 SLM 700M 정도가 현재 GPT-4 수준** (압축 효율 5~10배 향상)
- **에너지 효율 100배** (현재 Hailo-8 9 TOPS/W → 1000 TOPS/W 가능성)

---

## 8. UTTEC 적용 방안 (영업·사업 관점)

### 8-1. 본인의 강점이 정확히 매칭되는 영역

| UTTEC 자산 | On-Device AI 매칭 |
|----------|-----------------|
| **양산 5개 임베디드 제품** (STM32, RPi CM4/3, nRF52, ESP32) | TinyML 직접 적용 — ESP32-S3 + TFLite Micro 즉시 가능 |
| **Jetson Nano CUDA 6주 교육** | Edge AI 교육 트랙 확장 (uttec-edu Track E 강화) |
| **AI FanStick 특허** (ESP32-C3) | 룰 기반 → SLM 1B 통합 (Wake Word + 응답 룰 트리) |
| **외벽청소로봇 / 충전기** | Hailo-8 또는 Jetson Orin Nano 비전 + 안전 검증 |
| **스마트팩토리 데모 25개** | Jetson Orin 검사 라인 컨설팅 (Foundry 무료 재현 모델) |
| **3.5-Stage 패키지** (Stage 0~3) | **Stage 4 신설 후보**: 온디바이스 AI 통합 (1,500만원) |
| **Foundry 5층 무료 재현 영업 카피** | "외부 서버 의존 0% — 데이터·AI 모두 사내 디바이스" 추가 |

### 8-2. 즉시 검토할 4가지 행동

1. **uttec-edu에 Track F 신설**: "On-Device AI" — 13가이드 → 14가이드, 5 Track → 6 Track 확장
   - Phi-4 mini로 노트북 + ESP32-S3로 TinyML 실습
   - Apple MLX 데모 + Snapdragon X NPU 데모
2. **AI FanStick 다음 버전에 SLM 통합**: 룰 기반 → 2026 SLM (650MB Llama 3.2 1B)
   - 차별화 카피: "외부 인터넷 0%, 응원봉 자체 AI"
3. **스마트팩토리 견적서에 Hailo-8 옵션 추가**: 24/7 비전 검사
   - perf/W 1위 → 산업 현장 안정성 + 전력 비용 강조
4. **Stage 4 패키지 신설** (온디바이스 AI 통합, 1,500만): 3.5-Stage → **4.5-Stage**
   - 총 5,800만 → **7,300만** (Foundry 5층의 5층(앱) 영역 강화)

### 8-3. 위시캣·정부지원 키워드 매칭

- **위시캣 자동검색 키워드 추가**: "온디바이스", "edge AI", "TinyML", "NPU", "Jetson"
- **K-문샷 미션 #10 (인재양성)** 응모 시 "온디바이스 AI 트랙" 강조
- **스마트공장 AI 트랙** (정부 50% 보조, 최대 2.5억): Hailo·Jetson 검사 시스템 매칭
- **중소기업 AI 도입 보조금**: 외부 클라우드 비용 부담 없는 SLM 솔루션이 결정타

### 8-4. 영업 차별화 카피 후보

> **"클라우드 AI는 매달 비용을 청구합니다. UTTEC는 한 번 구축으로 평생 무료입니다."**
>
> Phi-4 14B 14GB 노트북 1대로 매일 1만 쿼리를 돌리면 전기료 30,000원/월. 같은 일을 GPT-5 API로 하면 월 5,000만원. 1년 5억 vs 36만 = **1,400배 절감**.

---

## 9. 참고 자료 (출처)

### 시장 동향
- [On-Device LLMs in 2026: What Changed, What Matters, What's Next — Edge AI and Vision Alliance](https://www.edge-ai-vision.com/2026/01/on-device-llms-in-2026-what-changed-what-matters-whats-next/)
- [Key edge AI trends transforming enterprise tech in 2026 — N-iX](https://www.n-ix.com/edge-ai-trends/)
- [The Power of Small: Edge AI Predictions for 2026 — Dell](https://www.dell.com/en-us/blog/the-power-of-small-edge-ai-predictions-for-2026/)
- [2026 Predictions: How Edge AI is Reshaping Industrial Operations — ZEDEDA](https://zededa.com/blog/2026-predictions-how-edge-ai-is-reshaping-industrial-operations/)
- [Small Language Models (SLMs) Complete Guide 2026 — Calmops](https://calmops.com/ai/small-language-models-slm-complete-guide-2026/)

### 모델
- [Best Small AI Models 2026: Phi-4, Gemma 3, Qwen 3, GGUF — Local AI Master](https://localaimaster.com/blog/small-language-models-guide-2026)
- [Small Language Models: Phi-4 vs Gemma 3 vs Llama 3.3 — Meta Intelligence](https://www.meta-intelligence.tech/en/insight-slm-enterprise)
- [Top 10 Small Language Models in 2026 — Intuz](https://www.intuz.com/blog/best-small-language-models)

### 하드웨어
- [NPU Comparison 2026: Intel vs Qualcomm vs AMD vs Apple — Local AI Master](https://localaimaster.com/blog/npu-comparison-2026)
- [Snapdragon X2 Elite Hexagon NPU 6 80 TOPS — Notebookcheck](https://www.notebookcheck.net/Hexagon-NPU-6-in-the-Snapdragon-X2-Elite-Extreme-80-TOPS-performance-that-is-up-to-95-faster-than-Apple-M4-and-122-faster-than-Intel-Lunar-Lake.1166576.0.html)
- [Apple MLX + M5 Neural Accelerators — Apple ML Research](https://machinelearning.apple.com/research/exploring-llms-mlx-m5)
- [AI Laptop Procurement 2026: Apple M5, Snapdragon X Elite, 40 TOPS Baseline — TopTenAIAgents](https://toptenaiagents.co.uk/blog/ai-laptop-procurement-uk-sme-2026.html)

### 산업·사례
- [Top 15 Edge AI Chip Makers — AIMultiple](https://research.aimultiple.com/edge-ai-chips/)
- [10 Real-world Industrial Applications utilizing NVIDIA Jetson — Seeed Studio](https://www.seeedstudio.com/blog/2026/02/28/real-world-industrial-applications-utilizing-nvidia-jetson-for-ai-at-the-edge/)
- [Hailo vs NVIDIA Jetson Orin: Which Edge AI Solution Fits Your Project? — Peila International](https://www.peila-international.com/blog/hailo-vs-nvidia-jetson-orin-which-edge-ai-solution-fits-your-project)
- [NVIDIA Hannover Messe 2026 — Future of AI-Driven Manufacturing](https://blogs.nvidia.com/blog/ai-manufacturing-hannover-messe/)

### 헬스케어·프라이버시
- [On-device clinical AI: Heidi Remote and offline-first scribe tools — iatroX](https://www.iatrox.com/blog/on-device-clinical-ai-heidi-remote-offline-first-scribe-data-privacy-gdpr-hipaa-2026)
- [Privacy in consumer wearable technologies — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC12167361/)

### TinyML
- [TinyML with ESP32 Tutorial — TeachMeMicro](https://www.teachmemicro.com/tinyml-with-esp32-tutorial/)
- [Embedded AI (TinyML) — STM32 + TFLite Micro](https://medium.com/@switches0011/getting-started-with-embedded-ai-tinyml-stm32-nucleo-l476rg-with-tensorflow-lite-micro-6476deb6fe5f)
- [TFLite Micro GitHub](https://github.com/tensorflow/tflite-micro)

### Apple MLX
- [MLX Framework GitHub](https://github.com/ml-explore/mlx)
- [WWDC25: Explore LLMs on Apple Silicon with MLX](https://developer.apple.com/videos/play/wwdc2025/298/)

---

## 10. 부록 — 후속 분석 (2026-05-05 작성 완료) + 추가 조사 영역

### 10-1. 후속 분석 3종 (별도 문서)

| 주제 | 문서 | 핵심 결론 |
|------|------|---------|
| **휴머노이드 로봇** | [humanoid.md](humanoid.md) | 2026 양산 원년 — Tesla Optimus(연 100만 목표), Hyundai-BD Atlas(연 3만), 1X NEO(첫 소비자). **BOM 90%가 임베디드** → UTTEC 양산 38년이 모터 컨트롤러·BMS·안전회로 8/9 영역에 즉시 매칭. **2026 하반기가 1차 공급망 진입 골든 윈도우.** |
| **차량 SDV** | [sdv.md](sdv.md) | NVIDIA Drive Thor(2070 TFLOPS) + Qualcomm Snapdragon Ride Flex 양산 → 100개 ECU가 5개 컴퓨트로 통합. 단, **그 사이를 잇는 zonal IO 보드는 차량당 수십 개로 분산** → 새 시장. UTTEC + STM32 + 외벽청소로봇 SIL2 경험이 ASIL-B 보드(조명·HMI·도어)에 매칭. **2026~2027이 ASIL-B 인증 시작 마지막 골든 윈도우.** |
| **Federated Learning** | [federated-learning.md](federated-learning.md) | 추론은 이미 디바이스, 학습도 디바이스로 가는 해. Apple Siri/Google Gboard production 검증, NVIDIA FLARE 의료 양산 진입. **한국 제조사 "노하우 외부 유출 공포" + 의료 보수적 데이터 정책에 정확히 매칭**. UTTEC = 디바이스(ESP32-S3, Jetson) + 양산 + 안전회로 + Memory MCP를 모두 보유한 드문 OEM. 영업 차별화 직결. |

### 10-2. 추가 조사 권장 영역 (다음)

| 주제 | 이유 |
|------|------|
| Edge AI 보안 (모델 보호, 펌웨어 암호화) | KC/CE 인증 + 암호화 경험 매칭 |
| 한국 K-문샷 AI Co-Scientist 6대 분야 | uttec-edu + 컨설팅 진입 경로 |
| Apple MLX 양산 활용 사례 | Mac 기반 SLM 개발자 도구 시장 |
| TinyML federated 산업 양산 케이스 | UTTEC ESP32-S3 + Jetson 통합 차별화 |

---

## 11. 핵심 인사이트 (한 줄)

**On-Device AI는 새로운 인터넷이다.** 2000년대 인터넷이 모든 사업의 인프라가 됐듯, 2026~2030년 SLM+NPU는 모든 디바이스의 인프라가 된다. UTTEC의 임베디드 38년 + AI 통합 + 양산 5개 + Edge 인프라 노하우는 **이 흐름의 중심에 정확히 위치**해 있고, 3.5-Stage 패키지에 "온디바이스 AI 통합 Stage 4"를 신설하는 것이 자연스러운 확장.
