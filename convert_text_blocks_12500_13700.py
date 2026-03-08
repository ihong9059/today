#!/usr/bin/env python3
"""Convert ```text blocks to appropriate markdown formats in curriculum.ts (lines 12500-13700)"""

file_path = r"C:\todo\today\ai-education-web\src\data\curriculum.ts"

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

conversions_made = 0

# Conversion 1: GPT = Generative Pre-trained Transformer (line ~12647)
old1 = r"""`\`\`text
GPT = Generative Pre-trained Transformer

Generative:    텍스트를 "생성"할 수 있다
Pre-trained:   대규모 데이터로 "사전 학습"되었다
Transformer:   Transformer 아키텍처를 기반으로 한다
`\`\`"""

new1 = """| 구성 요소 | 의미 |
|----------|------|
| **G**enerative | 텍스트를 "생성"할 수 있다 |
| **P**re-trained | 대규모 데이터로 "사전 학습"되었다 |
| **T**ransformer | Transformer 아키텍처를 기반으로 한다 |"""

if old1 in content:
    content = content.replace(old1, new1)
    conversions_made += 1
    print("✓ Converted GPT acronym explanation")

# Conversion 2: Encoder-Decoder vs GPT comparison (line ~12671)
old2 = r"""`\`\`text
Encoder-Decoder의 사고방식:
  입력: "I love AI"  -->  Encoder가 이해  -->  Decoder가 번역
  출력: "나는 AI를 좋아한다"
  = "입력을 이해한 뒤, 다른 형태로 변환한다"

GPT(Decoder-only)의 사고방식:
  입력: "인공지능의 미래는"
  출력: "인공지능의 미래는 매우 밝습니다. 왜냐하면..."
  = "앞에 있는 텍스트를 보고, 뒤에 올 텍스트를 예측한다"
  = Cross-Attention이 필요 없다! (참조할 별도 입력이 없으니까)
`\`\`"""

new2 = """> **Encoder-Decoder의 사고방식:**
> 입력: "I love AI" → Encoder가 이해 → Decoder가 번역
> 출력: "나는 AI를 좋아한다"
> = "입력을 이해한 뒤, 다른 형태로 변환한다"

> **GPT(Decoder-only)의 사고방식:**
> 입력: "인공지능의 미래는"
> 출력: "인공지능의 미래는 매우 밝습니다. 왜냐하면..."
> = "앞에 있는 텍스트를 보고, 뒤에 올 텍스트를 예측한다"
> = Cross-Attention이 필요 없다! (참조할 별도 입력이 없으니까)"""

if old2 in content:
    content = content.replace(old2, new2)
    conversions_made += 1
    print("✓ Converted Encoder-Decoder vs GPT comparison")

# Conversion 3: GPT Decoder layer diagram (line ~12688, keep as diagram)
old3 = r"""`\`\`text
GPT 레이어 1개:

입력 토큰 벡터들
  |
  v
[Masked Self-Attention] -- 미래 토큰 차단, 과거만 참조
  |
  v
[Add & Layer Norm]
  |
  v
[Feed-Forward Network]
  |
  v
[Add & Layer Norm]
  |
  v
출력

원래 Transformer Decoder (3단계):
  Masked Self-Attention -> Cross-Attention -> FFN

GPT Decoder (2단계):
  Masked Self-Attention -> FFN
  (Cross-Attention 제거!)
`\`\`"""

new3 = r"""`\`\`
GPT 레이어 1개:

입력 토큰 벡터들
  |
  v
[Masked Self-Attention] -- 미래 토큰 차단, 과거만 참조
  |
  v
[Add & Layer Norm]
  |
  v
[Feed-Forward Network]
  |
  v
[Add & Layer Norm]
  |
  v
출력

원래 Transformer Decoder (3단계):
  Masked Self-Attention -> Cross-Attention -> FFN

GPT Decoder (2단계):
  Masked Self-Attention -> FFN
  (Cross-Attention 제거!)
`\`\`"""

if old3 in content:
    content = content.replace(old3, new3)
    conversions_made += 1
    print("✓ Converted GPT Decoder layer diagram")

# Conversion 4: Autoregressive generation step-by-step table (line ~12727)
old4 = r"""`\`\`text
프롬프트: "AI는"

Step 1: 입력 ["AI는"] -> 모델 -> 다음 토큰 확률 분포
        P("정말"|"AI는") = 0.15
        P("매우"|"AI는") = 0.12
        P("인간"|"AI는") = 0.08
        ...
        => "정말" 선택

Step 2: 입력 ["AI는", "정말"] -> 모델 -> 다음 토큰 확률
        P("놀라운"|"AI는 정말") = 0.20
        P("대단한"|"AI는 정말") = 0.15
        ...
        => "놀라운" 선택

Step 3: 입력 ["AI는", "정말", "놀라운"] -> 모델 -> 다음 토큰
        => "기술입니다" 선택

Step 4: 입력 ["AI는", "정말", "놀라운", "기술입니다"] -> 모델
        => [EOS] (문장 끝) 선택 -> 생성 종료!

최종 결과: "AI는 정말 놀라운 기술입니다"
`\`\`"""

new4 = """| 단계 | 입력 | 예측 결과 | 선택된 토큰 |
|------|------|----------|------------|
| Step 1 | ["AI는"] | P("정말"\|"AI는") = 0.15<br/>P("매우"\|"AI는") = 0.12<br/>P("인간"\|"AI는") = 0.08 | "정말" |
| Step 2 | ["AI는", "정말"] | P("놀라운"\|"AI는 정말") = 0.20<br/>P("대단한"\|"AI는 정말") = 0.15 | "놀라운" |
| Step 3 | ["AI는", "정말", "놀라운"] | 모델 예측 | "기술입니다" |
| Step 4 | ["AI는", "정말", "놀라운", "기술입니다"] | 모델 예측 | [EOS] (생성 종료) |

**최종 결과:** "AI는 정말 놀라운 기술입니다"  """

if old4 in content:
    content = content.replace(old4, new4)
    conversions_made += 1
    print("✓ Converted autoregressive generation table")

# Conversion 5: Autoregressive math formulas (line ~12753)
old5 = r"""`\`\`text
전체 문장의 확률:
P("AI는 정말 놀라운 기술입니다")
= P("AI는")
  x P("정말" | "AI는")
  x P("놀라운" | "AI는 정말")
  x P("기술입니다" | "AI는 정말 놀라운")

이것이 "자기회귀(Autoregressive)"입니다:
- "자기(Auto)": 자신이 생성한 토큰을
- "회귀(Regressive)": 다시 입력으로 사용한다

조건부 확률의 연쇄(chain):
P(x1, x2, ..., xn) = P(x1) * P(x2|x1) * P(x3|x1,x2) * ... * P(xn|x1,...,xn-1)
`\`\`"""

new5 = r"""> **전체 문장의 확률:**
>
> $$P(\text{"AI는 정말 놀라운 기술입니다"}) = P(\text{"AI는"}) \times P(\text{"정말"} | \text{"AI는"}) \times P(\text{"놀라운"} | \text{"AI는 정말"}) \times P(\text{"기술입니다"} | \text{"AI는 정말 놀라운"})$$
>
> **이것이 "자기회귀(Autoregressive)"입니다:**
> - "자기(Auto)": 자신이 생성한 토큰을
> - "회귀(Regressive)": 다시 입력으로 사용한다
>
> **조건부 확률의 연쇄(chain):**
> $$P(x_1, x_2, ..., x_n) = P(x_1) \times P(x_2|x_1) \times P(x_3|x_1,x_2) \times ... \times P(x_n|x_1,...,x_{n-1})$$"""

if old5 in content:
    content = content.replace(old5, new5)
    conversions_made += 1
    print("✓ Converted autoregressive math formulas")

# Conversion 6: Next Token Prediction training data table (line ~12826)
old6 = r"""`\`\`text
원본 텍스트: "나는 밥을 먹었다"

GPT 학습 데이터로 변환:

  위치 1: 입력 ["나는"]           -> 정답: "밥을"
  위치 2: 입력 ["나는", "밥을"]    -> 정답: "먹었다"
  위치 3: 입력 ["나는", "밥을", "먹었다"] -> 정답: [EOS]

하나의 문장에서 여러 학습 샘플을 동시에 만듭니다!
이것이 효율적인 이유입니다.
`\`\`"""

new6 = """**원본 텍스트:** "나는 밥을 먹었다"

**GPT 학습 데이터로 변환:**

| 위치 | 입력 | 정답 |
|------|------|------|
| 1 | ["나는"] | "밥을" |
| 2 | ["나는", "밥을"] | "먹었다" |
| 3 | ["나는", "밥을", "먹었다"] | [EOS] |

> 하나의 문장에서 여러 학습 샘플을 동시에 만듭니다!
> 이것이 효율적인 이유입니다."""

if old6 in content:
    content = content.replace(old6, new6)
    conversions_made += 1
    print("✓ Converted Next Token Prediction training data table")

# Conversion 7: Cross-Entropy Loss explanation (line ~12841)
old7 = r"""`\`\`text
각 위치에서 모델이 예측한 확률 분포와 실제 정답을 비교합니다:

Loss = -sum(log(P(정답 토큰)))

예시:
  모델 예측: P("밥을") = 0.7, P("빵을") = 0.2, P("물을") = 0.1
  정답: "밥을"
  Loss = -log(0.7) = 0.357

  모델이 정답에 높은 확률을 부여할수록 Loss가 줄어듭니다.
  학습이 진행되면 정답 확률이 점점 높아집니다.
`\`\`"""

new7 = r"""> 각 위치에서 모델이 예측한 확률 분포와 실제 정답을 비교합니다:
>
> $$\text{Loss} = -\sum \log(P(\text{정답 토큰}))$$
>
> **예시:**
> - 모델 예측: $P(\text{"밥을"}) = 0.7$, $P(\text{"빵을"}) = 0.2$, $P(\text{"물을"}) = 0.1$
> - 정답: "밥을"
> - $\text{Loss} = -\log(0.7) = 0.357$
>
> 모델이 정답에 높은 확률을 부여할수록 Loss가 줄어듭니다.
> 학습이 진행되면 정답 확률이 점점 높아집니다."""

if old7 in content:
    content = content.replace(old7, new7)
    conversions_made += 1
    print("✓ Converted Cross-Entropy Loss explanation")

# Conversion 8: GPT architecture specs table (line ~12913)
old8 = r"""`\`\`text
GPT-1:  12 레이어, 768 차원, 12 헤드  ->  117M 파라미터
GPT-2:  48 레이어, 1600 차원, 25 헤드 ->  1.5B 파라미터 (13배)
GPT-3:  96 레이어, 12288 차원, 96 헤드 -> 175B 파라미터 (117배)

기본 구조는 동일합니다! 달라진 것은 오직 "크기"뿐입니다.
- 레이어를 더 많이 쌓고
- 차원을 더 크게 하고
- 데이터를 더 많이 학습시킨 것

이것이 "Scaling Law"의 핵심:
  모델이 크면 클수록, 데이터가 많을수록, 성능이 좋아진다!
`\`\`"""

new8 = """| 모델 | 레이어 | 차원 | 헤드 | 파라미터 | 배율 |
|------|--------|------|------|----------|------|
| GPT-1 | 12 | 768 | 12 | 117M | 1x |
| GPT-2 | 48 | 1600 | 25 | 1.5B | 13x |
| GPT-3 | 96 | 12288 | 96 | 175B | 117x |

> **기본 구조는 동일합니다!** 달라진 것은 오직 "크기"뿐입니다.
> - 레이어를 더 많이 쌓고
> - 차원을 더 크게 하고
> - 데이터를 더 많이 학습시킨 것
>
> **이것이 "Scaling Law"의 핵심:**
> 모델이 크면 클수록, 데이터가 많을수록, 성능이 좋아진다!"""

if old8 in content:
    content = content.replace(old8, new8)
    conversions_made += 1
    print("✓ Converted GPT architecture specs table")

# Conversion 9: GPT-3 In-context Learning table (line ~12928)
old9 = r"""`\`\`text
GPT-3 이전: 새로운 태스크마다 Fine-tuning 필요
GPT-3 이후: 프롬프트에 예시를 넣는 것만으로 태스크 수행!

Zero-shot (예시 0개):
  "다음 문장을 한국어로 번역하세요: Hello world"
  -> "안녕하세요 세계"

One-shot (예시 1개):
  "영어를 한국어로 번역합니다.
   Hello -> 안녕하세요
   Good morning -> ???"
  -> "좋은 아침이에요"

Few-shot (예시 여러 개):
  "감성 분석을 합니다.
   맛있다 -> 긍정
   별로다 -> 부정
   최고다 -> 긍정
   싫다 -> ???"
  -> "부정"

모델이 충분히 크면 Fine-tuning 없이도 패턴을 파악합니다!
`\`\`"""

new9 = """| 방식 | 예시 개수 | 예시 | 결과 |
|------|----------|------|------|
| **Zero-shot** | 0개 | "다음 문장을 한국어로 번역하세요: Hello world" | "안녕하세요 세계" |
| **One-shot** | 1개 | "영어를 한국어로 번역합니다.<br/>Hello → 안녕하세요<br/>Good morning → ???" | "좋은 아침이에요" |
| **Few-shot** | 여러 개 | "감성 분석을 합니다.<br/>맛있다 → 긍정<br/>별로다 → 부정<br/>최고다 → 긍정<br/>싫다 → ???" | "부정" |

> **GPT-3의 혁명:**
> - GPT-3 이전: 새로운 태스크마다 Fine-tuning 필요
> - GPT-3 이후: 프롬프트에 예시를 넣는 것만으로 태스크 수행!
> - 모델이 충분히 크면 Fine-tuning 없이도 패턴을 파악합니다!"""

if old9 in content:
    content = content.replace(old9, new9)
    conversions_made += 1
    print("✓ Converted GPT-3 In-context Learning table")

# Conversion 10: Generation parameters table (line ~12960)
old10 = r"""`\`\`text
Temperature (온도):
  낮음 (0.1~0.3): 가장 확실한 단어만 선택 -> 일관적이지만 단조로움
  중간 (0.7~0.9): 적당한 다양성 -> 일반적인 대화에 적합
  높음 (1.2~2.0): 다양한 단어 선택 -> 창의적이지만 이상한 문장 가능

Top-p (Nucleus Sampling):
  누적 확률이 p가 될 때까지의 토큰에서만 선택
  Top-p = 0.9: 상위 90% 확률 범위 내에서 선택

Top-k:
  확률이 높은 상위 k개 토큰에서만 선택
  Top-k = 50: 가장 가능성 높은 50개 중 선택
`\`\`"""

new10 = """| 파라미터 | 범위/설정 | 효과 |
|----------|----------|------|
| **Temperature (온도)** | 낮음 (0.1~0.3) | 가장 확실한 단어만 선택 → 일관적이지만 단조로움 |
| | 중간 (0.7~0.9) | 적당한 다양성 → 일반적인 대화에 적합 |
| | 높음 (1.2~2.0) | 다양한 단어 선택 → 창의적이지만 이상한 문장 가능 |
| **Top-p (Nucleus Sampling)** | Top-p = 0.9 | 누적 확률이 p가 될 때까지의 토큰에서만 선택<br/>상위 90% 확률 범위 내에서 선택 |
| **Top-k** | Top-k = 50 | 확률이 높은 상위 k개 토큰에서만 선택<br/>가장 가능성 높은 50개 중 선택 |"""

if old10 in content:
    content = content.replace(old10, new10)
    conversions_made += 1
    print("✓ Converted generation parameters table")

# Conversion 11: BERT vs GPT comparison blockquote (line ~12982)
old11 = r"""`\`\`text
핵심 차이를 한 줄로:

BERT: "문장의 빈칸을 양쪽 문맥을 보고 채운다" -> 이해에 강하다
GPT:  "앞의 내용을 보고 다음을 예측한다"      -> 생성에 강하다
`\`\`"""

new11 = """> **핵심 차이를 한 줄로:**
>
> **BERT:** "문장의 빈칸을 양쪽 문맥을 보고 채운다" → 이해에 강하다
> **GPT:** "앞의 내용을 보고 다음을 예측한다" → 생성에 강하다"""

if old11 in content:
    content = content.replace(old11, new11)
    conversions_made += 1
    print("✓ Converted BERT vs GPT comparison blockquote")

# Write the file back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✅ Completed {conversions_made}/11 conversions in lines 12500-13700!")
print(f"Updated file: {file_path}")
