# Chapter 6 — Attention in transformers, step-by-step 상세 분석

## 영상 정보
- **제목**: Attention in transformers, step-by-step | Deep Learning Chapter 6
- **채널**: 3Blue1Brown
- **재생시간**: 26분 10초
- **업로드**: 2024-04-07
- **링크**: https://www.youtube.com/watch?v=eMlx5fFNoYc

## 한 줄 요약
**Attention** = 단어 임베딩이 **문맥에 따라** 자기 의미를 정제. **Query-Key-Value** 행렬 3종 + dot product + softmax + 가중합으로 구성. **Multi-head Attention** = 여러 attention을 병렬로 = "다양한 문맥 관계 동시 학습".

---

## 구간별 상세 내용

### 1. Attention의 동기 — 문맥 의존 의미 (00:00-04:00) ★ 핵심 동기
[바로가기](https://www.youtube.com/watch?v=eMlx5fFNoYc&t=0s)

#### 핵심 메시지
처음 임베딩은 **단어의 일반적 의미** → Attention 블록이 **문맥에 맞게 의미를 업데이트**.

#### 사례 모음
1. **"mole"**: 두더지(animal) / 점(skin) / 화학 단위(unit) — Attention이 문맥으로 결정
2. **"a tower"** vs **"Eiffel tower"** vs **"miniature Eiffel tower"** — 각각 다른 임베딩 방향으로 이동
3. **"machine learning model"** vs **"fashion model"** (Chapter 5에서 언급)

#### 주요 발언
> "A well-trained attention block calculates what you need to add to the generic embedding to move it to one of these more specific directions as a function of the context." (02:42)

---

### 2. Query, Key, Value 행렬 (04:00-09:00) ★ 핵심 메커니즘
[바로가기](https://www.youtube.com/watch?v=eMlx5fFNoYc&t=240s)

#### 핵심 메시지
각 단어 임베딩 → 3개의 작은 벡터로 변환:
- **Query (Q)**: "내가 어떤 정보를 찾고 있나?"
- **Key (K)**: "내가 어떤 정보를 제공할 수 있나?"
- **Value (V)**: "그 정보의 실제 내용"

#### 상세 내용
1. 임베딩 벡터 (12,288차원) × 행렬 W_Q (12,288×128) → Query (128차원)
2. 같은 방식으로 Key (W_K), Value (W_V)
3. **Q·K dot product** = "이 두 단어가 얼마나 관련 있나" (큰 값 = 높은 attention)
4. 모든 (i, j) 쌍에 대해 계산 → attention 패턴 행렬
5. softmax (열 단위) → 확률 합 1
6. 각 단어의 새 임베딩 = (attention 가중치) × Value 벡터들의 합

#### 비유
- 도서관: Query = 사용자 질문, Key = 책 제목, Value = 책 내용
- Q·K = 책 제목 매칭 점수, V = 매칭된 책의 정보 종합

---

### 3. Masking — 미래를 안 보기 (09:00-12:00) ★ GPT 핵심 트릭
[바로가기](https://www.youtube.com/watch?v=eMlx5fFNoYc&t=540s)

#### 핵심 메시지
다음 단어 예측 학습 시, 단어 i가 단어 j>i (미래)를 보면 cheating → **상삼각 부분을 -∞로 마스킹**.

#### 상세 내용
- 마스킹 후 softmax → 미래 단어의 가중치 = 0
- 이를 **Causal Attention** 또는 **Masked Attention**이라 함
- BERT(인코더)는 양방향 attention 사용, GPT(디코더)는 마스킹

#### 시사점
- "한 번 학습 = 모든 위치에서 다음 단어 예측" 동시 처리 → 학습 효율 극대화

---

### 4. 행렬 차원 + 파라미터 수 (12:00-16:00)
[바로가기](https://www.youtube.com/watch?v=eMlx5fFNoYc&t=720s)

#### 핵심 메시지
한 attention head: W_Q + W_K + W_V (각 12,288×128) ≈ 4.7M 파라미터.

#### GPT-3 기준
- 임베딩 차원: 12,288
- Head 차원: 128
- Head 수: 96
- 한 레이어 당 attention: 96 × 4.7M ≈ 600M
- 96 레이어: ≈ **58B** (Attention만, 전체 175B 중 33%)

---

### 5. Multi-head Attention (16:00-20:00) ★ 병렬 다중 attention
[바로가기](https://www.youtube.com/watch?v=eMlx5fFNoYc&t=960s)

#### 핵심 메시지
하나의 큰 attention이 아니라 **96개 작은 attention을 병렬**로 → 각 head가 다른 종류의 관계 학습.

#### 상세 내용
- Head 1: 형용사-명사 관계
- Head 2: 주어-동사 관계
- Head 3: 코어퍼런스(대명사 → 명사)
- ...
- 96개 head의 출력을 concatenate → Output 행렬과 곱 → 다음 레이어로

#### 학습 후 해석
- 일부 head는 인간이 해석 가능한 패턴 학습
- 다수는 해석 불가능한 패턴 (블랙박스)

---

### 6. Cross-attention vs Self-attention (20:00-23:00)
[바로가기](https://www.youtube.com/watch?v=eMlx5fFNoYc&t=1200s)

#### 핵심 메시지
- **Self-attention**: 같은 시퀀스 내 단어들끼리 (GPT/BERT)
- **Cross-attention**: 두 시퀀스 간 (번역 모델, 인코더-디코더)

---

### 7. 마무리 + Chapter 7 예고 (23:00-26:10)
[바로가기](https://www.youtube.com/watch?v=eMlx5fFNoYc&t=1380s)

#### 핵심 메시지
Attention은 LLM의 핵심이지만, **MLP가 더 큰 비중 (65%)** → 다음 챕터에서 MLP 분석.

---

## 전체 사례 모음

| 사례 | 설명 | 시사점 |
|------|------|--------|
| mole의 3가지 의미 | 동물·점·화학 단위 | 문맥에 따른 임베딩 이동 |
| Eiffel tower | "tower" 일반 → "Eiffel tower" 특정 | 단어 결합으로 의미 정제 |
| miniature Eiffel tower | "큰" 속성 제거 | 형용사가 명사 의미 변경 |
| Q·K·V 도서관 비유 | 질문·제목·내용 | Attention 직관 |
| 96 head 병렬 | 다양한 관계 동시 학습 | Multi-head 정당화 |
| 학습된 head 해석 | 일부만 인간이 이해 가능 | 블랙박스 본질 |

---

## 전체 인용구 모음

### Attention의 본질
> "A well-trained attention block calculates what you need to add to the generic embedding to move it to one of these more specific directions as a function of the context." (02:42)

### Query-Key 직관
> "Each query is asking 'is there anything in the context I should incorporate into my meaning?'"

---

## 용어 및 개념 설명

| 용어 | 설명 |
|------|------|
| Query (Q) | 단어가 찾는 정보 |
| Key (K) | 단어가 제공할 수 있는 정보 |
| Value (V) | 실제 정보 내용 |
| Attention Pattern | (Q·K 후 softmax) 행렬 |
| Masked / Causal Attention | 미래 단어 차단 |
| Multi-head Attention | 병렬 attention 여러 개 |
| Self-attention | 같은 시퀀스 내 |
| Cross-attention | 두 시퀀스 간 |
| Head | 한 attention의 단위 |

---

## UTTEC 사업 적용 시사점

### 🔴 즉시 활용
1. **Track F 14가이드 핵심 보강**: Attention은 LLM 이해의 진짜 어려운 부분 → 본 영상이 글로벌 표준 자료
2. **강사양성 Day 6 연속 시청**: Chapter 5 (27분) + Chapter 6 (26분) = 약 1시간, 한 슬롯
3. **microGPT 가이드 보강**: Karpathy 200줄 GPT의 attention 부분 = 본 영상이 정확히 설명

### 🟠 중기 검토
4. **영업 자료**: "Multi-head Attention 96 heads × 96 layers = LLM이 단어의 문맥적 의미를 어떻게 이해하나" 메시지
5. **Stage 4 On-Device AI**: 작은 모델은 head 수가 적음 → 단순 task에는 충분, 복잡 추론에는 부족 → 적정 모델 선택 가이드

### 시리즈 통합 가치
- Chapter 5 + 6 = 동전의 양면 (구조 vs 핵심 메커니즘)
- Chapter 7 = MLP에 사실이 어떻게 저장되는가 (선택)

---

*상세 분석 생성일: 2026-05-06*
