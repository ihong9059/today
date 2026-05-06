# Chapter 7 — How might LLMs store facts 상세 분석

## 영상 정보
- **제목**: How might LLMs store facts | Deep Learning Chapter 7
- **채널**: 3Blue1Brown
- **재생시간**: 22분 43초
- **업로드**: 2024-08-31
- **링크**: https://www.youtube.com/watch?v=9-Jl0dxWQs8

## 한 줄 요약
**MLP 블록**이 어떻게 사실(facts)을 저장하는가 — Google DeepMind 연구(Neil Nanda 등) 기반. **Up-projection** + **GELU 활성화** + **Down-projection**의 단순 구조가 사실을 **key-value 쌍**으로 저장. 결정적 통찰: **superposition** + **Johnson-Lindenstrauss** = 임베딩 공간 안의 **거의 직교한 방향**에 사실이 압축 저장.

---

## 구간별 상세 내용

### 1. "Michael Jordan plays the sport of ___" → "basketball" (00:00-02:00) ★ 동기
[바로가기](https://www.youtube.com/watch?v=9-Jl0dxWQs8&t=0s)

#### 핵심 메시지
LLM이 마이클 조던과 농구를 연결하는 사실을 **수천억 파라미터 중 어디**에 저장하는가? Google DeepMind 연구는 **MLP 블록**이라고 시사.

#### 주요 발언
> "Anyone who's played around with one of these models has the clear sense that it's memorized tons and tons of facts. So a reasonable question you could ask is, **how exactly does that work?** And **where do those facts live?**" (00:18)

---

### 2. MLP 위치 + Chapter 5·6 복습 (02:00-05:00)
[바로가기](https://www.youtube.com/watch?v=9-Jl0dxWQs8&t=120s)

#### 핵심 메시지
- Attention과 MLP가 번갈아 가며 임베딩 벡터를 갱신
- **MLP가 모델 파라미터의 65% 차지**
- MLP 계산 자체는 단순 (행렬 2번 곱 + 비선형성)
- 그러나 **해석은 매우 어려움**

#### 핵심 직관 (재확인)
- 임베딩 공간의 **방향(direction)** = 의미
- "woman - man + uncle ≈ aunt" — 방향이 의미를 인코딩
- 사실도 **특정 방향**에 인코딩되어 있을 것

---

### 3. 가정 — "Michael", "Jordan", "basketball" 방향 설정 (05:00-07:00)
[바로가기](https://www.youtube.com/watch?v=9-Jl0dxWQs8&t=300s)

#### 핵심 메시지
임베딩 공간에 **3개 방향**이 있다고 가정:
- "first name Michael"
- "last name Jordan"
- "basketball"

각 방향과 벡터의 dot product가 **1이면 그 개념을 담음**, 0/음수면 무관.

#### 시사점 (UTTEC)
- "Michael Jordan" 두 토큰을 한 벡터가 통합하려면 **이전 attention 블록**이 정보를 결합해놓아야 함
- → 사실 검색 = Attention + MLP 협업

---

### 4. MLP의 4단계 구조 (07:00-13:00) ★ 핵심
[바로가기](https://www.youtube.com/watch?v=9-Jl0dxWQs8&t=420s)

#### 핵심 메시지
한 MLP 블록 = **Up-projection → bias → 비선형성 → Down-projection**.

#### 단계별 상세

**1단계: Up-projection (W_↑)**
- 임베딩 (12,288차원) → 더 큰 공간 (49,152차원, 4배)
- W_↑의 행 = "검출하려는 패턴"
- 각 행과 입력 벡터의 dot product = 그 패턴 매칭 점수

**예시 적용**:
- W_↑의 한 행: "first name Michael + last name Jordan"을 인코딩
- 입력이 두 이름 모두 포함 → dot product = 2 (둘 다 매칭)
- 입력이 하나만 → dot product = 1 (애매)
- 입력이 둘 다 없음 → dot product = 0

**2단계: Bias 추가**
- "Michael Jordan AND" 검출기는 dot product가 **2**일 때만 강하게 양수 → bias = -1 추가
- → "Michael Jordan" 정확 매칭 시 1, 한쪽만 매칭 시 0, 무관 시 -1

**3단계: 비선형성 (ReLU 또는 GELU)**
- ReLU(x) = max(0, x)
- "Michael Jordan" 정확 매칭 시 1, 그 외 0
- = **AND 게이트**

**4단계: Down-projection (W_↓)**
- 49,152 → 12,288 다시 축소
- W_↓의 한 열: "basketball" 방향
- 매칭된 뉴런(값 1) × 그 열 = "basketball 방향이 더해짐"
- → 입력 임베딩에 **"basketball" 방향이 추가** = 사실 저장!

#### 결정적 통찰
> "이 4단계가 본질적으로 'IF (Michael Jordan) THEN (basketball)' 룰을 인코딩"

---

### 5. 파라미터 수 + 규모의 의미 (13:00-16:00)
[바로가기](https://www.youtube.com/watch?v=9-Jl0dxWQs8&t=780s)

#### GPT-3 한 MLP 레이어
- W_↑ (12,288 → 49,152): ≈ 6억 파라미터
- W_↓ (49,152 → 12,288): ≈ 6억 파라미터
- bias: 약 5만
- 한 레이어 합: ≈ 1.2B
- 96 레이어 × 1.2B = **약 116B (전체 175B 중 65%)**

#### 의미
- 한 뉴런(중간 49,152차원의 한 차원) ≈ "한 사실의 검출기" 후보
- 96 × 49,152 ≈ **470만 잠재 사실 검출기**
- 그러나...

---

### 6. ★ Superposition + Johnson-Lindenstrauss 보조정리 (16:00-21:00) ★ 본 영상의 진짜 핵심
[바로가기](https://www.youtube.com/watch?v=9-Jl0dxWQs8&t=960s)

#### 핵심 메시지
470만 사실 = **부족**. 실제 LLM은 사실을 **수천억 개** 알 수도. 어떻게 가능?
→ **Superposition**: 한 차원 = 한 개념이 아니라, **거의 직교한 여러 방향**이 동시에 사용 가능.

#### Johnson-Lindenstrauss 보조정리
- N차원 공간에 **완벽 직교** 벡터: 최대 N개
- N차원 공간에 **거의 직교** (89도~91도) 벡터: **지수적으로 많이** 가능
- 12,288차원 → 거의 직교한 방향이 **수천만~수십억 개 가능**

#### 결과
- 모델은 한 차원에 한 사실이 아니라, **여러 사실을 거의 직교한 다른 방향에** 동시에 저장
- 한 사실 검출기 뉴런이 여러 패턴에 반응하지만, 패턴들이 거의 직교라 충돌 적음
- 이게 **블랙박스의 본질**: "이 뉴런이 무슨 일을 하는지" 단순 해석 어려움

#### 시사점
- 모델 압축 시 superposition이 무너지면 성능 급락
- 모델 해석(Interpretability) 연구의 중요 발견

---

### 7. Mechanistic Interpretability + 마무리 (21:00-22:43)
[바로가기](https://www.youtube.com/watch?v=9-Jl0dxWQs8&t=1260s)

#### 핵심 메시지
**Mechanistic Interpretability** = 신경망의 작동을 "기계적으로" 분해해 이해하려는 연구 분야. Anthropic의 sparse autoencoder, DeepMind 연구 등.

#### 향후 방향
- 다음 시리즈는 **확률(probability)** 시리즈로 복귀
- 본 영상은 시리즈 마무리 성격

---

## 전체 사례 모음

| 사례 | 설명 | 시사점 |
|------|------|--------|
| Michael Jordan → basketball | 본 영상 토이 예제 | 사실 저장 메커니즘 시각화 |
| woman - man + uncle ≈ aunt | 방향 = 의미 인코딩 | 임베딩의 기하학적 구조 |
| AND 게이트 (W_↑ + bias + ReLU) | "Michael AND Jordan" 검출 | 비선형성의 역할 |
| W_↓ 가 "basketball 방향 추가" | 사실 응답의 메커니즘 | MLP가 사실 저장 |
| 470만 검출기 vs 수천억 사실 | 차원 부족 | Superposition의 동기 |
| 89~91도 거의 직교 | Johnson-Lindenstrauss | 지수적 용량 증가 |

---

## 전체 인용구 모음

### 사실 저장의 미스터리
> "Anyone who's played around with one of these models has the clear sense that it's memorized tons and tons of facts. So a reasonable question you could ask is, how exactly does that work? And where do those facts live?" (00:18)

### MLP의 단순성 vs 복잡성
> "The computation here is actually relatively simple, especially when you compare it to attention. It boils down essentially to a pair of matrix multiplications with a simple something in between. **However, interpreting what these computations are doing is exceedingly challenging**." (01:25)

### Superposition 핵심
> "Many other distinct directions in this super high-dimensional space could correspond to other features that the model might want to represent." (03:51)

---

## 용어 및 개념 설명

| 용어 | 설명 |
|------|------|
| MLP (Multilayer Perceptron) | Transformer의 Attention 다음에 오는 신경망 블록 |
| Up-projection (W_↑) | 임베딩을 더 큰 공간으로 확장 |
| Down-projection (W_↓) | 다시 임베딩 차원으로 축소 |
| GELU / ReLU | 비선형 활성화 함수 |
| Bias | 뉴런 활성화 임계값 |
| Superposition | 한 차원에 여러 의미 중첩 저장 |
| Johnson-Lindenstrauss | 고차원 공간의 거의 직교 벡터 다수 존재 정리 |
| Mechanistic Interpretability | 신경망 기계적 해석 연구 분야 |
| Polysemanticity | 한 뉴런이 여러 의미에 반응하는 현상 |

---

## UTTEC 사업 적용 시사점

### 🔴 즉시 활용
1. **Track F 14가이드 고급 보강**: "LLM이 사실을 어떻게 저장하나" 핵심 질문 답변
2. **microGPT 가이드 보강**: Karpathy GPT의 MLP 부분이 정확히 본 영상의 메커니즘
3. **강사양성 Day 6 고급 슬롯**: Chapter 5·6 본 후 본 영상 22분 = 깊이 있는 마무리

### 🟠 중기 검토
4. **Superposition 영업 메시지**: "AI가 수천억 사실을 어떻게 알지?" → "고차원 공간의 마법" 흥미 유발 카피
5. **Mechanistic Interpretability**: AI 안전·검증 사업 후보 (Anthropic, DeepMind 연구 분야)
6. **모델 양자화 한계**: superposition이 무너지면 성능 급락 → AI FanStick에서 SLM 양자화 시 주의

### 시리즈 통합 가치
- Chapter 7은 시리즈 중 **가장 깊고 새로운 연구 결과** 포함
- "왜 LLM이 블랙박스인가"의 진짜 답
- **Anthropic 연구 분위기**: Anthropic은 mechanistic interpretability에 큰 투자 중 → 사용자가 Claude 사용 중이라면 이 영상이 Claude 회사의 연구 방향 이해에 도움

---

*상세 분석 생성일: 2026-05-06*
