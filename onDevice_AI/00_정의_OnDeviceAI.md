---
title: On-Device AI — 정의와 연구 방향
type: foundation
created: 2026-05-15
purpose: 본 vault 모든 검증·연구의 출발점이 되는 canonical 정의. 새 검증 가설은 이 정의에서 파생되어야 함.
status: living (정의 갱신 시 본 파일을 single source로 유지)
tags: [foundation, definition, on-device, edge-ai, slm, tinyml]
---

# On-Device AI — 정의와 연구 방향

> **본 문서는 onDevice_AI vault의 헌법 역할.** 모든 검증·연구·시장조사·영업 매핑은 이 정의를 출발점으로 한다. 정의가 흔들리면 방향이 흔들리므로, 갱신은 신중히 하되 누적해서 기록한다.

---

## 1. 한 줄 정의

**On-Device AI**는 AI 추론(inference)을 **클라우드 서버가 아닌, 기기 자체의 하드웨어에서 직접 수행**하는 방식.

> "Trained on Cloud, Inferred on Edge" — 학습은 클라우드 대형 GPU에서, 추론은 디바이스(MCU·NPU·모바일 SoC)에서.

---

## 2. 핵심 대비 구조

| 구분 | Cloud AI | **On-Device AI** |
|---|---|---|
| 연산 위치 | 원격 GPU 서버 (AWS·GCP) | **로컬 칩** (MCU·NPU·모바일 SoC) |
| 네트워크 | 필수 (왕복 지연) | **불필요** (오프라인 동작) |
| 데이터 흐름 | 입력→서버 전송→결과 수신 | 입력→**로컬 추론**→결과 |
| 모델 크기 | 수십 GB~수 TB 가능 | **수 KB~수백 MB** (양자화·경량화 필수) |
| 비용 구조 | API 호출당 과금 | **1회 모델 배포 후 무료** |
| 개인정보 | 외부 서버 경유 | **기기 외부로 안 나감** |

---

## 3. AI 관점에서의 기술적 본질

본 vault에서 다루는 "AI"는 **추론 단계**에 한정. 학습은 외부 GPU에서 수행하고, 검증 대상은 **"학습된 모델을 어떻게 작은 칩에 욱여넣고 실시간으로 돌릴 것인가"**.

### 3.1 이를 가능하게 하는 4대 핵심 기술

1. **양자화(Quantization)** — FP32 → INT8/INT4로 모델 메모리 1/4~1/8 축소
2. **프루닝(Pruning)** — 불필요한 가중치 제거 (희소화)
3. **지식 증류(Knowledge Distillation)** — 대형 모델(teacher) → 소형 모델(student) 능력 이전
4. **NPU/MCU 가속** — 전용 신경망 연산 하드웨어로 전력·속도 동시 최적화

### 3.2 vault 검증의 위치

본 vault는 **양자화 + 작은 모델 + MCU 가속**의 교집합을 검증.
- 양자화: microGPT FP32 16.4KB → INT8 4.1KB (5/8 실측)
- 작은 모델: Karpathy 200줄 GPT (4,192 params), Korean-Small (154K params)
- MCU 가속: ESP32-S3 SRAM 520KB 한계 내 추론

---

## 4. On-Device AI의 4대 가치 (왜 On-Device인가)

| 가치 | 본질 | 적용 영역 |
|---|---|---|
| **Privacy** | 데이터가 기기 밖으로 안 나감 | 의료·금융·개인정보·기업 비밀 |
| **Latency** | 네트워크 왕복 제거 | 실시간 음성·영상·로봇 제어 |
| **Offline** | 네트워크 없이 동작 | 드론·산업현장·산간·차량 |
| **Cost** | API 호출 비용 0 | 대량 배포 (수만~수백만 대) |

이 4가지 중 어느 하나라도 강하게 요구되면 On-Device AI가 답이 됨. 본 vault의 검증은 **Cost + Offline** 축(8달러 MCU 대량 배포)이 핵심이고, **Privacy + Latency**는 부수 가치로 따라옴.

---

## 5. On-Device AI의 스펙트럼 (어디까지가 On-Device인가)

본 vault는 **가장 극단적인 끝(MCU급)** 을 검증. 스펙트럼 전체는 다음과 같다:

| 티어 | 하드웨어 | 메모리 | 모델 크기 예시 | 본 vault 관련성 |
|---|---|---|---|:-:|
| **T1 MCU급** | ESP32-S3, Cortex-M4 | RAM 512KB | microGPT 4K params (INT8 4KB) | ✅ **메인 검증** |
| T2 SBC급 | Raspberry Pi, Jetson Nano | RAM 4~8GB | TinyLlama 1.1B (Q4 650MB) | ⚠️ 시장조사 대상 |
| T3 모바일급 | iPhone, Snapdragon X2 | RAM 8~16GB | Llama 3 8B (Q4 4GB) | ⚠️ 시장조사 대상 |
| T4 노트북급 | Apple M5, AMD Ryzen AI | RAM 16~64GB | Llama 3 70B (Q4 35GB) | ❌ 범위 외 |

**왜 T1에 집중하는가**: UTTEC의 강점(임베디드 38년) + 시장 공백(T1에서 LLM이 도는 사례 거의 없음) + 영업 임팩트(Stage 4 1,500만 패키지의 차별점).

---

## 6. 본 vault의 연구 방향 — 정의에서 파생되는 질문들

정의가 정해지면, 검증 가설은 다음 5축에서 파생된다. 새 검증을 시작할 때 **"어느 축의 어느 질문에 답하는가"** 를 명시할 것.

### 6.1 모델 축 — "얼마나 작아질 수 있는가"
- Q1. ESP32-S3 SRAM 520KB에서 실용적 작업을 하는 최소 모델 크기는?
- Q2. 4K~154K 파라미터 사이에서 task별 최소 크기 곡선은?
- Q3. Knowledge Distillation으로 GPT-2 small(124M) → ESP32 탑재 가능 크기로 압축 가능한가?

### 6.2 하드웨어 축 — "어느 칩까지 내려갈 수 있는가"
- Q4. ESP32-S3 외에 ESP32-C3 / Cortex-M4F / RP2040 등 더 저렴한 칩은?
- Q5. NPU 내장 MCU(예: K210, Maix)와 범용 MCU의 추론 속도 비교는?
- Q6. ESP32-S3 + 외장 PSRAM(8MB) 조합의 실효 모델 크기 상한은?

### 6.3 응용 축 — "어떤 task가 T1 티어에 적합한가"
- Q7. AI FanStick: 응원 패턴 학습(SLM 4K~10K) 가능한가?
- Q8. 음성 키워드 인식(KWS)·환경음 분류 등 검증된 task의 모델 크기 분포는?
- Q9. T1에서 "언어"가 의미 있는 task는? (대화 X, 명령 분류 ○)

### 6.4 양자화 축 — "정확도 손실 어디까지 감내하는가"
- Q10. FP32 vs INT8 vs INT4의 task별 정확도 손실은?
- Q11. Mixed precision(가중치 INT8 + 활성화 INT16) 적용 시 SRAM·정확도 trade-off는?
- Q12. ESP32-S3의 SIMD 명령(DSP)을 활용한 INT8 추론 가속은?

### 6.5 영업·시장 축 — "정의를 어떻게 가치로 전환하는가"
- Q13. T1 On-Device AI의 시장 규모와 경쟁자(STMicro·Edge Impulse·TensorFlow Lite Micro)는?
- Q14. UTTEC의 차별화 포인트는 무엇인가? (기술 / 가격 / 통합 / 교육)
- Q15. Stage 4 영업 패키지 1,500만의 기술 근거 1건당 수주율 영향은?

---

## 7. 정의에서 나오는 검증의 우선순위

본 vault의 진행 우선순위는 정의의 어느 축이 가장 큰 영업 임팩트를 주는가에 따라 결정된다.

**현재 우선순위 (2026-05-15 기준):**
1. **응용 축 Q7** — AI FanStick 학습 시나리오 (✅ 4 경로 완료)
2. **모델 축 Q1** — ESP32-S3 SRAM 최대 모델 (✅ 분석 완료, ⬜ 보드 실측 대기)
3. **양자화 축 Q10** — FP32 → INT8 정확도 손실 (✅ 분석, ⬜ 실측 대기)
4. **하드웨어 축 Q4** — 더 저렴한 칩 (⬜ Phase 2 이후)
5. **영업 축 Q14** — 차별화 포인트 (⬜ 검증 결과 후 정리)

---

## 8. 갱신 이력

| 일자 | 변경 | 동기 |
|---|---|---|
| 2026-05-15 | 초안 작성 | 사용자 요청 — 정의를 바탕으로 연구 방향을 정리해야 함을 인식 |

---

## 9. 본 정의가 흔들릴 수 있는 조건

다음 중 하나라도 발생하면 본 정의를 재검토:
- **하드웨어 가격 급변**: ESP32-S3 가격이 5달러 이하로 하락하거나, NPU MCU(K210 등)가 1달러대 진입
- **알고리즘 돌파**: 1-bit Quantization·State Space Model 등이 MCU급에서 실용화
- **시장 변곡**: T1 티어 사용처가 마케팅에서 양산으로 이동 (현재 정지선 2026-05-08 해제 조건)
- **법규 변화**: EU AI Act·국내 AI 기본법 등이 On-Device 추론을 의무화하거나 금지

---

## 10. 참조

- 시장 동향 (정의의 시장적 근거): `시장조사/README.md` (11 섹션 종합)
- 검증 매트릭스 (정의의 실증): `0_검증계획.md`
- vault 검토 순서: `00_검토순서.md`
- 외부 entity: `myWiki/second-brain/entities/onDevice-ai.md`
