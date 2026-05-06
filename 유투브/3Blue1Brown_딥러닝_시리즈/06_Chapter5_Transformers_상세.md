# Chapter 5 — Transformers, the tech behind LLMs 상세 분석

## 영상 정보
- **제목**: Transformers, the tech behind LLMs | Deep Learning Chapter 5
- **채널**: 3Blue1Brown
- **재생시간**: 27분 14초
- **업로드**: 2024-04-01
- **링크**: https://www.youtube.com/watch?v=wjZofJX0v4M

## 한 줄 요약
2017년 Google "Attention Is All You Need" 논문의 **Transformer** 구조 시각화. 입력 → 토큰화 → 임베딩(고차원 벡터) → **Attention 블록 + MLP 블록 반복** → 다음 토큰 확률 분포 → softmax로 샘플링. **GPT-3 = 1,750억 파라미터**.

---

## 구간별 상세 내용

### 1. Transformer = 현대 LLM의 표준 (00:00-02:00)
[바로가기](https://www.youtube.com/watch?v=wjZofJX0v4M&t=0s)

#### 핵심 메시지
**GPT = Generative Pre-trained Transformer**. 2017년 구글 논문 "Attention is All You Need"가 LLM 시대의 시작점.

#### 상세 내용
- ChatGPT, Claude, Gemini, DALL-E 모두 Transformer 기반
- "T"가 가장 핵심 — Transformer 구조 자체가 본 영상의 주제

---

### 2. 입력 → 토큰화 → 임베딩 (02:00-05:00) ★ 핵심 1
[바로가기](https://www.youtube.com/watch?v=wjZofJX0v4M&t=120s)

#### 핵심 메시지
입력은 **토큰(token, 단어 또는 단어 조각) 시퀀스** → 각 토큰을 **고차원 벡터(임베딩)**로 변환.

#### 상세 내용
- 토큰 = 단어 / 단어 조각 / 이미지 패치 / 음성 청크
- 임베딩 벡터의 차원 = **GPT-3은 12,288차원**
- 학습된 임베딩의 신기한 성질:
  - 의미 비슷한 단어 = 벡터 공간에서 가까움
  - "King - Man + Woman ≈ Queen" 같은 벡터 산술 가능
  - 의미가 **방향(direction)**으로 인코딩됨

#### 주요 발언
> "Words with similar meanings tend to land on vectors that are close to each other in that space." (03:51)

---

### 3. Attention 블록 — "단어들이 서로 대화" (05:00-09:00) ★ 핵심 2
[바로가기](https://www.youtube.com/watch?v=wjZofJX0v4M&t=300s)

#### 핵심 메시지
Attention = **각 토큰이 문맥의 어떤 단어에 주목해야 하는지 학습** + 그에 따라 자신의 임베딩을 업데이트.

#### 상세 내용
- 예: "a machine learning **model**" vs "a fashion **model**"
  - 동일 단어 "model"이지만 문맥에 따라 다른 의미
  - Attention이 "machine learning"과 "fashion"을 보고 "model"의 임베딩을 다르게 업데이트
- Attention 자체는 Chapter 6에서 상세 설명
- 본 챕터에서는 "단어 벡터들이 서로 정보를 주고받는 작업" 정도로 이해

---

### 4. MLP (Multilayer Perceptron) 블록 (09:00-12:00)
[바로가기](https://www.youtube.com/watch?v=wjZofJX0v4M&t=540s)

#### 핵심 메시지
MLP = **Chapter 1~4의 신경망**과 정확히 같은 구조. 각 토큰 벡터를 독립적으로 처리.

#### 상세 내용
- Attention이 끝난 후 각 벡터에 동일한 MLP 적용
- **이 MLP에 모델의 "사실(facts)"이 저장됨** (Chapter 7에서 자세히)
- Attention과 MLP를 **반복** (GPT-3은 96 레이어)

---

### 5. 마지막 단계 — 다음 토큰 예측 (12:00-15:00)
[바로가기](https://www.youtube.com/watch?v=wjZofJX0v4M&t=720s)

#### 핵심 메시지
모든 레이어를 거친 후, **마지막 토큰의 임베딩**을 사용해 다음 토큰 확률 분포 출력.

#### 상세 내용
1. 마지막 토큰 벡터 (12,288차원) → "Unembedding 행렬"과 곱셈 → 사전 크기(50,257)의 logits
2. logits → **softmax** → 0~1 사이 확률 (합 1)
3. 가장 높은 확률 토큰 = 다음 단어 후보
4. 약간의 무작위성으로 샘플링 (Temperature 매개변수)

---

### 6. Softmax + Temperature (15:00-18:00)
[바로가기](https://www.youtube.com/watch?v=wjZofJX0v4M&t=900s)

#### 핵심 메시지
**Softmax**: 임의의 실수 벡터를 확률 분포로 변환. **Temperature**: 분포의 sharpness 조절.

#### 상세 내용
- Softmax 공식: e^xᵢ / Σ e^xⱼ
- Temperature T로 나누기: e^(xᵢ/T)
- T=0 → 가장 확률 높은 것만 (greedy)
- T=1 → 원래 분포
- T=∞ → 균등 분포 (완전 무작위)
- ChatGPT 등은 T를 조정해 **창의성·일관성 균형**

#### 주요 발언
> "Temperature... controls how much you weight the lower likelihood words." (15:30 근처)

#### 시사점 (UTTEC)
- Claude API, OpenAI API의 `temperature` 파라미터 = 본 영상이 직접 설명
- Stage 0~2 영업에서 "AI 답변이 매번 다른 이유" 설명용으로 활용

---

### 7. GPT-3 규모 분해 (18:00-23:00) ★ 1,750억 파라미터의 정체
[바로가기](https://www.youtube.com/watch?v=wjZofJX0v4M&t=1080s)

#### 핵심 메시지
GPT-3의 **1,750억 파라미터**가 어디에 있는가:

| 구성 요소 | 파라미터 수 | 비율 |
|-----------|-------------|------|
| Embedding 행렬 | 약 6.17억 | 0.4% |
| Unembedding 행렬 | 약 6.17억 | 0.4% |
| Attention (Query·Key·Value 등) | 약 5.79억 | 33% |
| MLP | 약 1.16억 (per layer × 96) | 65% |
| **합계** | **1,750억** | 100% |

#### 충격적 사실
- **MLP가 가장 많은 파라미터를 차지** (Attention보다 2배)
- Chapter 7에서 "MLP가 사실을 저장한다" 발견의 배경

---

### 8. Context Length + 학습 + 마무리 (23:00-27:14)
[바로가기](https://www.youtube.com/watch?v=wjZofJX0v4M&t=1380s)

#### 핵심 메시지
- **Context length** (한 번에 처리 가능한 토큰 수): GPT-3은 2,048 → GPT-4는 32K → Claude 4.7은 1M
- 학습 = 다음 토큰 예측 정답률 최대화 (back propagation)
- Attention은 다음 챕터에서 상세

---

## 전체 사례 모음

| 사례 | 설명 | 시사점 |
|------|------|--------|
| Token = 단어/이미지패치/소리청크 | 멀티모달 모델의 통일 단위 | 텍스트·이미지·음성 통합 처리 |
| 12,288차원 임베딩 | GPT-3 기준 | 의미 = 고차원 방향 |
| King - Man + Woman ≈ Queen | 학습된 임베딩의 산술 | 의미가 벡터 공간 구조에 인코딩 |
| machine learning model vs fashion model | Attention의 동기 | 문맥 의존적 의미 |
| GPT-3 = 1,750억 파라미터 | MLP 65% + Attention 33% | MLP가 더 큼 |
| Temperature 매개변수 | T=0 ~ ∞ 무작위 정도 조절 | API 사용 시 직접 활용 |
| Context 2K → 1M | 단기 메모리 확장 추세 | Claude 4.7 1M의 경쟁력 |

---

## 전체 인용구 모음

### Transformer 본질
> "GPT-3, ChatGPT, Claude, Gemini... they're all built on top of an architecture called Transformer."

### 임베딩 의미
> "Words with similar meanings tend to land on vectors that are close to each other in that space." (03:51)

### Attention 동기
> "The meaning of the word 'model' in the phrase 'a machine learning model' is different from its meaning in the phrase 'a fashion model'." (04:08)

---

## 용어 및 개념 설명

| 용어 | 설명 |
|------|------|
| Transformer | 2017 구글 논문, 현대 LLM 표준 구조 |
| Token | 단어/단어 조각 (BPE 토큰화 등) |
| Embedding | 토큰을 고차원 벡터로 변환 |
| Embedding Matrix | 사전 크기 × 임베딩 차원 행렬 |
| Attention Block | 토큰 간 정보 교환 |
| MLP Block | 각 토큰의 표현 변환 |
| Softmax | logits → 확률 분포 |
| Temperature | softmax sharpness 조절 |
| Context Length | 한 번에 처리 가능한 토큰 수 |
| Logits | softmax 직전의 raw 점수 |

---

## UTTEC 사업 적용 시사점

### 🔴 즉시 활용
1. **uttec-edu Track F 14가이드 핵심 보강**: 본 영상은 LLM 작동 원리의 시각적 표준 → "Transformer가 무엇인가" 핵심 콘텐츠
2. **강사양성 Day 5·6**: 27분 14초 = 1.5교시 분량, Chapter 6과 연속 시청 권장
3. **microGPT 가이드 보강**: Karpathy 200줄 GPT의 구조가 정확히 본 영상의 작은 버전

### 🟠 중기 검토
4. **Stage 2~4 영업 자료**: 
   - "GPT-3 1,750억 파라미터" 수치 활용
   - Claude 4.7의 1M context 경쟁력 메시지
   - "Temperature 조절로 AI 답변 일관성/창의성 균형" 영업 포인트
5. **AI FanStick 차별화**: "수십억 파라미터 LLM은 ESP32 불가, 1B 미만 SLM은 가능" → On-Device AI 영업 정당화

### 시리즈 통합 가치
- Chapter 5 + 6 = LLM 입문 핵심. 둘 다 봐야 완성
- Chapter 7은 MLP 깊이 분석 (선택), Welch Labs는 이미지·비디오 (선택)

---

*상세 분석 생성일: 2026-05-06*
