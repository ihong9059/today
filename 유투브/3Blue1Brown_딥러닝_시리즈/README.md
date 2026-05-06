# 3Blue1Brown 딥러닝 시리즈 — 통합 분석

## 시리즈 개요

**3Blue1Brown (Grant Sanderson)**의 신경망·딥러닝 시리즈 9편 통합 분석. 2017년 Chapter 1부터 2025년 Welch Labs 게스트 영상까지 약 8년간 축적된 콘텐츠.

- **채널**: 3Blue1Brown (수학·딥러닝 시각화 글로벌 베스트)
- **총 재생시간**: 약 **3시간 44분**
- **시리즈 시작**: 2017-10-05
- **분석 일자**: 2026-05-06

---

## 영상 목록 (시청 권장 순서)

### 🟢 입문 (필수)
| # | 영상 | 길이 | 분석 파일 |
|:-:|------|:----:|-----------|
| 5 | LLM brief (LLM 8분 개관) | 7:58 | [05_LLM_Brief_상세.md](./05_LLM_Brief_상세.md) |
| 1 | Chapter 1 — What is a Neural Network? | 18:40 | [01_Chapter1_What_is_a_Neural_Network_상세.md](./01_Chapter1_What_is_a_Neural_Network_상세.md) |
| 2 | Chapter 2 — Gradient Descent | 20:33 | [02_Chapter2_Gradient_Descent_상세.md](./02_Chapter2_Gradient_Descent_상세.md) |
| 3 | Chapter 3 — Backpropagation, Intuitively | 12:47 | [03_Chapter3_Backpropagation_Intuitively_상세.md](./03_Chapter3_Backpropagation_Intuitively_상세.md) |

### 🟡 LLM 핵심 (필수)
| # | 영상 | 길이 | 분석 파일 |
|:-:|------|:----:|-----------|
| 6 | Chapter 5 — Transformers | 27:14 | [06_Chapter5_Transformers_상세.md](./06_Chapter5_Transformers_상세.md) |
| 7 | Chapter 6 — Attention | 26:10 | [07_Chapter6_Attention_상세.md](./07_Chapter6_Attention_상세.md) |

### 🔴 고급 (선택)
| # | 영상 | 길이 | 분석 파일 |
|:-:|------|:----:|-----------|
| 4 | Chapter 4 — Backpropagation Calculus | 10:18 | [04_Chapter4_Backpropagation_Calculus_상세.md](./04_Chapter4_Backpropagation_Calculus_상세.md) |
| 8 | Chapter 7 — How LLMs Store Facts | 22:43 | [08_Chapter7_How_LLMs_Store_Facts_상세.md](./08_Chapter7_How_LLMs_Store_Facts_상세.md) |
| 9 | Guest — AI Images and Videos (Welch Labs) | 37:20 | [09_Guest_Welch_Labs_AI_Images_Videos_상세.md](./09_Guest_Welch_Labs_AI_Images_Videos_상세.md) |

---

## 핵심 개념 시리즈 매트릭스

| 개념 | 영상 | 한 줄 정리 |
|------|------|-----------|
| 신경망 = 수학 함수 | Ch.1 | 13,002 파라미터의 거대 함수 |
| 학습 = 비용 최소화 | Ch.2 | 경사 하강으로 손잡이 자동 조정 |
| 역전파 (직관) | Ch.3 | 출력 → 입력 방향으로 그래디언트 거슬러 |
| 역전파 (수학) | Ch.4 | 체인 룰 적용 |
| 시그모이드/ReLU | Ch.1, 4 | 미분 가능한 비선형성 |
| Token + Embedding | Ch.5 | 단어 → 12,288차원 벡터 |
| Attention | Ch.5, 6 | 단어들이 서로 정보 교환 |
| Q/K/V | Ch.6 | 질문/키/값으로 attention 분해 |
| MLP 사실 저장 | Ch.7 | Up-projection + bias + ReLU + Down-projection |
| Superposition | Ch.7 | 거의 직교한 방향에 사실 압축 |
| Transformer 전체 구조 | Ch.5 | Attention + MLP 반복 + 마지막 softmax |
| LLM 학습 규모 | LLM brief | GPT-3 = 2,600년치 텍스트 |
| RLHF | LLM brief | 인간 피드백으로 alignment |
| Diffusion | Welch | Brownian motion 역재생, 고차원 공간 |
| CLIP | Welch | 텍스트-이미지 공유 임베딩 |

---

## UTTEC 사업 통합 적용

### 🔴 강사양성 파일럿 Day 5·6 (딥러닝 입문) — 약 4~5시간 콘텐츠
**1교시 (90분) — 기초**:
- LLM brief (8분)
- Chapter 1 (19분)
- Chapter 2 (21분)
- 휴식 + 토론 (40분)

**2교시 (90분) — 학습**:
- Chapter 3 (13분)
- (선택) Chapter 4 (10분, 수학 깊이)
- microGPT 가이드 함께 학습 (사용자 작성)
- 휴식 + 실습 (50분)

**3교시 (90분) — Transformer/LLM**:
- Chapter 5 (27분)
- Chapter 6 (26분)
- Q&A (35분)

**4교시 (90분, 선택) — 고급**:
- Chapter 7 (23분)
- Welch Labs guest (38분)
- 산업 적용 토론 (30분)

### 🟠 uttec-edu Track F 14가이드 보강
- 본 시리즈 9편은 **Track F의 시각적 백본** 역할
- 14가이드 각 섹션에 해당 영상 링크 + 본 분석 파일 인용 권장

### 🟡 microGPT 가이드 보강 (사용자 작성)
- Chapter 5·6·7이 microGPT(Karpathy 200줄 GPT)의 모든 구조 설명
- 본 분석을 사용자 가이드의 보강 자료로 추가

### 영업·교육 활용
1. **GPT-3 = 2,600년치 텍스트**: 영업 자료에서 AI 규모 인식 메시지
2. **Temperature 매개변수**: API 사용법 설명
3. **Superposition**: "AI가 수천억 사실을 어떻게 저장하나" 흥미 유발
4. **Diffusion = 물리 연결**: "AI는 물리에서 영감" 강의 콘텐츠

---

## 시리즈에서 도출되는 메타 인사이트

### ⭐ 1. 신경망의 이중성
- **수학**: 깔끔한 행렬 곱 + 비선형성
- **현실**: 우리가 기대한 추상화로 학습하지 않음 (블랙박스)
- 정확도는 높지만 내부 메커니즘은 완전히 이해되지 않음

### ⭐ 2. 규모의 마법
- 13,002 파라미터 (Ch.1) → 1,750억 (GPT-3)
- "더 크면 더 좋다" = Neural Scaling Laws
- 그러나 **MLP 65% + Attention 33% + 임베딩 2%** 의 비율은 일정

### ⭐ 3. Superposition 발견 (Chapter 7)
- 한 차원 = 한 의미 ❌
- 거의 직교한 여러 방향 = 다양한 의미 동시 저장 ✅
- 이게 LLM이 수천억 사실을 알 수 있는 이유

### ⭐ 4. 물리와 AI의 깊은 연결 (Welch Labs)
- Diffusion = Brownian motion 역재생
- AI는 단순한 통계가 아니라 **물리적 직관과 수학의 결합**

### ⭐ 5. 시간의 검증
- 2017 Chapter 1의 "엣지 검출 가설"은 대형 LLM에서도 부분적으로만 옳음
- 2024 Chapter 7의 "MLP 사실 저장" 발견이 Anthropic·DeepMind 활발한 연구 분야

---

## 메모

본 시리즈는 **3Blue1Brown 채널 전체에서 가장 학술적 영향력이 큰 시리즈**로 평가됨. 한국어 자동자막은 영상 시점에 따라 차이가 있어 **영어 자막**으로 분석. 각 분석 파일은 **시각·청각 자료에 의존하지 않고 자막만으로 핵심을 보존**하도록 작성되었으나, **실제 영상의 시각화가 본 시리즈의 진짜 가치**이므로 영상 시청 권장.

### 다음 단계 후보
1. 사용자 myWiki에 본 폴더 ingest (log.md 추가)
2. uttec-edu Track F 14가이드에 영상 링크 + 본 분석 인용
3. 강사양성 파일럿 Day 5·6 콘텐츠 슬롯 확정
4. microGPT 가이드 보강

---

*README 생성일: 2026-05-06*
