export const lesson0_4_content = `
# 함수 - AI의 핵심 빌딩 블록

## 📚 학습 목표
이 레슨을 완료하면:
- 함수의 기본 구조(입력 → 처리 → 출력)를 이해합니다
- 활성화 함수가 AI에서 왜 필수적인지 설명할 수 있습니다
- ReLU, Sigmoid, Softmax의 역할과 차이를 이해합니다
- 손실 함수가 AI 학습을 이끄는 원리를 이해합니다
- MSE와 Cross Entropy의 차이를 알 수 있습니다
- 콜백 함수의 역할을 이해합니다

---

## 🎯 핵심 메시지

> **"AI 모델 = 하나의 거대한 함수"**
> 입력(이미지, 텍스트)을 넣으면 → 내부에서 수많은 함수가 연결되어 → 출력(예측 결과)이 나옵니다!

---

## 📖 1. 함수의 기본 개념

> **비유**: 자판기를 생각해보세요. 동전(입력)을 넣고, 버튼(처리)을 누르면, 음료(출력)가 나옵니다. 함수도 똑같습니다!

\`\`\`
자판기 = 함수
┌──────────────────────┐
│  동전 넣기 (입력)      │
│  ↓                    │
│  버튼 누르기 (처리)    │
│  ↓                    │
│  음료 나옴 (출력)      │
└──────────────────────┘
\`\`\`

### 실행해보기: 첫 번째 함수
\`\`\`python
# 함수 = 입력 → 처리 → 출력
def greet(name):
    """이름을 받아서 인사말을 만드는 함수"""
    return f"안녕하세요, {name}님! AI 공부 화이팅!"

# 함수 사용 (호출)
message = greet("학생")
print(message)

# 여러 번 재사용 가능!
print(greet("김철수"))
print(greet("이영희"))

print("\\n→ 함수는 한번 만들면 몇 번이든 재사용할 수 있습니다!")
\`\`\`

### AI에서 함수란?

\`\`\`
AI 모델도 하나의 함수입니다!

📷 이미지 분류 AI:
  입력: 고양이 사진 (숫자 배열)
  처리: 수백만 개의 계산
  출력: "고양이 95%, 개 3%, 토끼 2%"

💬 ChatGPT:
  입력: "오늘 날씨 어때?"
  처리: 수십억 개의 계산
  출력: "오늘 서울은 맑고 기온은..."
\`\`\`

### 실행해보기: AI 모델은 함수다
\`\`\`python
# AI 모델 = 입력을 받아 예측을 출력하는 함수!

def simple_ai(image_brightness):
    """밝기로 낮/밤을 판단하는 초간단 AI"""
    if image_brightness > 128:
        return "낮 ☀️"
    else:
        return "밤 🌙"

# 테스트
test_values = [200, 50, 130, 80, 255, 10]
print("🤖 초간단 밝기 판단 AI")
print("=" * 35)
for brightness in test_values:
    result = simple_ai(brightness)
    print(f"  밝기 {brightness:3d} → {result}")

print("\\n→ 진짜 AI도 이런 '함수' 구조입니다.")
print("  다만, if문 대신 수학 공식(가중치 × 입력 + 편향)을 사용합니다!")
\`\`\`

---

## ⚡ 2. 활성화 함수 - AI가 '생각'할 수 있게 해주는 핵심

> **비유**: 뇌의 뉴런은 신호를 받으면 "발사할까 말까"를 결정합니다. 약한 신호는 무시하고, 강한 신호만 다음 뉴런에 전달하죠. **활성화 함수**가 바로 이 "발사 여부를 결정하는 장치"입니다!

### 왜 활성화 함수가 필요한가?

AI 뉴런은 기본적으로 이런 계산을 합니다:
\`\`\`
출력 = 가중치₁×입력₁ + 가중치₂×입력₂ + ... + 편향
     = w₁x₁ + w₂x₂ + ... + b
\`\`\`

이것은 **직선(일차함수)**입니다. 직선만으로는 복잡한 문제를 풀 수 없습니다!

\`\`\`
❌ 활성화 함수 없이 (직선만):
   층을 아무리 쌓아도 결국 하나의 직선!
   y = 2(3x + 1) + 5 = 6x + 7  ← 여전히 직선!

✅ 활성화 함수 있으면 (곡선 추가):
   층을 쌓을수록 점점 복잡한 패턴 학습 가능!
   고양이 vs 개, 감정 분석, 번역 등 가능!
\`\`\`

### 실행해보기: 활성화 함수가 없으면 어떻게 되나?
\`\`\`python
# 활성화 함수 없이 층을 쌓으면?
# 결국 하나의 직선이 됩니다!

print("❌ 활성화 함수 없는 신경망")
print("=" * 45)

# 1층: y = 2x + 1
# 2층: y = 3(2x + 1) + 2 = 6x + 5
# 3층: y = 4(6x + 5) + 3 = 24x + 23
# → 층을 아무리 쌓아도 결국 y = ax + b (직선!)

x = 5
layer1 = 2 * x + 1       # 1층
layer2 = 3 * layer1 + 2   # 2층
layer3 = 4 * layer2 + 3   # 3층

print(f"입력: x = {x}")
print(f"1층 출력: 2×{x} + 1 = {layer1}")
print(f"2층 출력: 3×{layer1} + 2 = {layer2}")
print(f"3층 출력: 4×{layer2} + 3 = {layer3}")
print(f"\\n한번에 계산: 24×{x} + 23 = {24*x + 23}")
print(f"→ 3층을 쌓았지만, 결과는 '24x + 23' 직선 하나와 같습니다!")

print(f"\\n✅ 활성화 함수를 넣으면?")
print(f"   직선 → 꺾기 → 직선 → 꺾기 → ...")
print(f"   복잡한 곡선을 만들 수 있어 패턴 학습이 가능해집니다!")
\`\`\`

---

### 🔵 ReLU (Rectified Linear Unit) - 가장 많이 쓰이는 활성화 함수

> **비유**: 수도꼭지를 생각해보세요. 꼭지를 잠그면(음수) 물이 안 나오고, 열면(양수) 연 만큼 물이 나옵니다. ReLU도 똑같습니다: **음수는 0으로 차단, 양수는 그대로 통과!**

\`\`\`
ReLU 규칙: 정말 간단!
  음수 → 0 (차단)
  양수 → 그대로 통과

  ReLU(-3) = 0
  ReLU(0)  = 0
  ReLU(5)  = 5
  ReLU(0.7) = 0.7
\`\`\`

### 실행해보기: ReLU 이해하기
\`\`\`python
# ReLU = 음수는 0, 양수는 그대로!
def relu(x):
    return max(0, x)

# 다양한 값으로 테스트
test_values = [-5, -2, -0.5, 0, 0.5, 2, 5, 10]

print("⚡ ReLU 활성화 함수")
print("규칙: 음수 → 0, 양수 → 그대로")
print("=" * 40)

for x in test_values:
    result = relu(x)
    bar = "█" * int(result * 2) if result > 0 else "✕"
    print(f"  ReLU({x:5.1f}) = {result:5.1f}  {bar}")

print("\\n💡 왜 이렇게 간단한 것이 효과적일까?")
print("  1. 계산이 엄청 빠름 (비교 1번이면 끝)")
print("  2. 양수 영역에서 기울기가 1 → 학습이 잘 됨")
print("  3. 불필요한 정보(음수)를 깔끔하게 차단")
\`\`\`

### ReLU가 딥러닝 혁명을 일으킨 이유

| 특징 | 설명 |
|------|------|
| **계산 속도** | max(0, x) 한줄이면 끝. GPU에서 초고속 |
| **기울기 유지** | 양수 영역에서 기울기=1 → 깊은 층에서도 학습 가능 |
| **희소성** | 음수를 0으로 만들어 불필요한 뉴런 자동 비활성화 |
| **현재 위치** | CNN, Transformer 등 거의 모든 딥러닝에서 기본 사용 |

---

### 🟠 Sigmoid - 확률로 바꿔주는 함수

> **비유**: 시험 점수가 0점~100점 사이인 것처럼, Sigmoid는 아무 숫자든 **0과 1 사이**로 바꿔줍니다. 그래서 "확률"을 나타낼 때 사용합니다!

\`\`\`
Sigmoid 규칙:
  큰 음수  →  0에 가까움 (거의 0%)
  0        →  정확히 0.5 (50%)
  큰 양수  →  1에 가까움 (거의 100%)

  예: "이 사진이 고양이일 확률은?"
      Sigmoid(3.2) = 0.96 → 96% 확률로 고양이!
\`\`\`

### 실행해보기: Sigmoid 이해하기
\`\`\`python
import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

test_values = [-10, -5, -2, -1, 0, 1, 2, 5, 10]

print("🟠 Sigmoid 활성화 함수")
print("규칙: 어떤 숫자든 0~1 사이로 변환 (확률!)")
print("=" * 50)

for x in test_values:
    result = sigmoid(x)
    bar_len = int(result * 20)
    bar = "█" * bar_len + "░" * (20 - bar_len)
    print(f"  Sigmoid({x:4d}) = {result:.4f}  |{bar}|")

print("\\n📌 Sigmoid는 언제 사용할까?")
print("  • 이진 분류: 고양이(1) vs 개(0)")
print("  • 스팸 판별: 스팸(1) vs 정상(0)")
print("  • 합격 예측: 합격(1) vs 불합격(0)")
print("  → 답이 '예/아니오' 둘 중 하나일 때!")
\`\`\`

---

### 🟣 Softmax - 여러 선택지의 확률 분배

> **비유**: 반장 선거에서 3명의 후보가 있을 때, 투표 결과를 "확률"로 바꾸는 것이 Softmax입니다. 예를 들어 득표수 [50표, 30표, 20표]를 → [50%, 30%, 20%]로 바꿉니다. **모든 확률을 더하면 반드시 100%!**

\`\`\`
Softmax 규칙:
  여러 개의 숫자 → 각각의 확률로 변환
  모든 확률의 합 = 1 (100%)

  예: 이미지 분류 AI의 출력
  [고양이: 5.2, 개: 2.1, 토끼: 0.3]
    ↓ Softmax
  [고양이: 92%, 개: 7%, 토끼: 1%]
    → 합계 = 100%
\`\`\`

### 실행해보기: Softmax 이해하기
\`\`\`python
import math

def softmax(values):
    """여러 숫자를 확률로 변환 (합=100%)"""
    exp_values = [math.exp(v) for v in values]
    total = sum(exp_values)
    return [ev / total for ev in exp_values]

# 이미지 분류 AI의 출력값 (아직 확률이 아닌 원시 점수)
raw_scores = [5.2, 2.1, 0.3]
labels = ["고양이", "개    ", "토끼  "]

probabilities = softmax(raw_scores)

print("🟣 Softmax: 점수를 확률로 변환!")
print("=" * 45)
print("\\n원시 점수 (AI 내부 계산 결과):")
for label, score in zip(labels, raw_scores):
    print(f"  {label}: {score}")

print("\\n    ↓ Softmax 변환 ↓\\n")

print("확률 (사람이 이해할 수 있는 형태):")
for label, prob in zip(labels, probabilities):
    bar = "█" * int(prob * 30)
    print(f"  {label}: {prob*100:5.1f}% {bar}")

print(f"\\n  합계: {sum(probabilities)*100:.1f}% (항상 100%!)")

print("\\n📌 Softmax는 언제 사용할까?")
print("  • 답이 여러 개 중 하나일 때!")
print("  • 숫자 0~9 판별 (10개 중 1개)")
print("  • 감정 분류 (긍정/부정/중립)")
print("  • 언어 번역 (다음 단어 예측)")
\`\`\`

---

### 활성화 함수 비교 총정리

| 함수 | 역할 | 출력 범위 | 사용처 |
|------|------|-----------|--------|
| **ReLU** | 불필요한 신호 차단 | 0 ~ ∞ | 신경망 중간층 (가장 많이 사용!) |
| **Sigmoid** | 확률로 변환 | 0 ~ 1 | 이진 분류 (예/아니오) 출력층 |
| **Softmax** | 여러 확률로 분배 | 각 0~1, 합=1 | 다중 분류 출력층 |

\`\`\`
신경망에서의 위치:

입력 → [층1] → ReLU → [층2] → ReLU → [층3] → Sigmoid 또는 Softmax → 출력
        ↑ 중간층: ReLU로 패턴 추출          ↑ 출력층: 확률로 변환
\`\`\`

### 실행해보기: 세 함수 비교
\`\`\`python
import math

def relu(x):
    return max(0, x)

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def softmax(values):
    exp_values = [math.exp(v) for v in values]
    total = sum(exp_values)
    return [ev / total for ev in exp_values]

print("📊 활성화 함수 비교")
print("=" * 55)

# 같은 입력에 대한 각 함수의 반응
inputs = [-3, -1, 0, 1, 3]
print("\\n같은 입력에 대한 ReLU vs Sigmoid 비교:")
print(f"  {'입력':>5}  {'ReLU':>8}  {'Sigmoid':>8}  역할")
print("-" * 50)

for x in inputs:
    r = relu(x)
    s = sigmoid(x)
    print(f"  {x:5.1f}  {r:8.3f}  {s:8.3f}  {'← 음수 처리 방식이 다름!' if x < 0 else ''}")

print("\\n🔑 핵심 차이:")
print("  ReLU   : 중간층에서 '쓸모없는 신호 차단' (0 또는 양수)")
print("  Sigmoid: 출력층에서 '확률로 변환' (0~1 사이)")
print("  Softmax: 출력층에서 '여러 확률 분배' (합=100%)")
\`\`\`

---

## 📉 3. 손실 함수 - AI 학습의 나침반

> **비유**: 양궁 선수가 과녁에 화살을 쏩니다. **"과녁 중심에서 얼마나 벗어났는가"**를 측정하는 것이 손실 함수입니다. 벗어난 정도(손실)를 줄이는 방향으로 연습(학습)하면, 점점 과녁 중심에 가까워집니다!

\`\`\`
손실 함수의 역할:

  AI의 예측값 vs 정답
  → 얼마나 틀렸는지 숫자로 계산
  → 이 숫자(손실)를 줄이는 것이 AI 학습의 목표!

  손실이 크다 = 많이 틀림 = 더 학습 필요
  손실이 작다 = 거의 맞음 = 학습 잘 되고 있음
  손실이 0   = 완벽히 맞음 (실제로는 거의 불가능)
\`\`\`

### 왜 손실 함수가 중요한가?

AI 학습의 전체 과정을 보면:
\`\`\`
1. 입력 데이터 → AI 모델 → 예측값 출력
2. 예측값과 정답 비교 → 손실 함수 → 오차 계산 ← 여기!
3. 오차를 줄이는 방향으로 가중치 수정 (역전파)
4. 1~3 반복 → 점점 정확해짐!
\`\`\`

> **손실 함수가 없으면?** AI는 자기가 맞았는지 틀렸는지 모릅니다. 마치 눈을 가리고 양궁을 쏘는 것과 같습니다!

---

### 🔢 MSE (Mean Squared Error) - 숫자 예측용

> **비유**: "내일 기온을 예측하세요"라는 문제에서, 정답이 25도인데 AI가 28도라고 했으면 **(28-25)² = 9**만큼 틀린 겁니다. 이렇게 "차이의 제곱"의 평균을 구하는 것이 MSE입니다.

\`\`\`
MSE = (예측값 - 정답)² 의 평균

  왜 제곱을 할까?
  1. 양수/음수 상관없이 오차를 양수로 만듦
  2. 큰 오차에 더 큰 벌점 → 큰 실수를 빠르게 교정
\`\`\`

### 실행해보기: MSE 손실 함수
\`\`\`python
# MSE = 예측과 정답의 차이를 제곱한 평균

def mse_loss(predictions, targets):
    """예측값과 정답의 MSE 계산"""
    n = len(predictions)
    squared_errors = [(p - t) ** 2 for p, t in zip(predictions, targets)]
    return sum(squared_errors) / n

# 시나리오: 기온 예측 AI
actual_temps = [25, 30, 22, 28, 35]  # 실제 기온 (정답)

# AI 모델 3개의 예측 비교
model_a = [27, 31, 20, 26, 33]  # 꽤 정확한 모델
model_b = [20, 35, 15, 22, 40]  # 좀 부정확한 모델
model_c = [25, 30, 22, 28, 35]  # 완벽한 모델 (이상적)

print("🌡️ 기온 예측 AI - MSE 비교")
print("=" * 50)
print(f"실제 기온: {actual_temps}")
print()

for name, preds in [("모델 A", model_a), ("모델 B", model_b), ("모델 C", model_c)]:
    loss = mse_loss(preds, actual_temps)
    errors = [p - t for p, t in zip(preds, actual_temps)]
    print(f"{name} 예측: {preds}")
    print(f"  오차:   {errors}")
    print(f"  MSE:    {loss:.1f}  {'← 아주 정확!' if loss < 5 else '← 더 학습 필요' if loss < 30 else '← 많이 부정확'}")
    print()

print("💡 MSE가 0에 가까울수록 좋은 모델입니다!")
print("  MSE는 숫자를 예측하는 문제에 사용합니다:")
print("  • 기온 예측, 주가 예측, 점수 예측 등")
\`\`\`

---

### ❌ Cross Entropy - 분류 문제용

> **비유**: 객관식 시험을 생각해보세요. 정답이 "②번"인데 AI가 "②번에 90% 확신!"이라고 하면 벌점이 적고, "②번에 10% 확신..."이라고 하면 벌점이 큽니다. **정답에 대한 확신이 낮을수록 큰 벌점**을 주는 것이 Cross Entropy입니다.

\`\`\`
Cross Entropy 핵심 원리:
  정답을 맞췄는데 확신도 높음 → 벌점 작음 ✅
  정답을 맞췄는데 확신이 낮음 → 벌점 큼 ⚠️
  정답을 틀림                → 벌점 매우 큼 ❌

  수학적으로: -log(정답의 확률)
  확률 90% → -log(0.9) = 0.10 (벌점 작음)
  확률 50% → -log(0.5) = 0.69 (벌점 중간)
  확률 10% → -log(0.1) = 2.30 (벌점 큼!)
\`\`\`

### 실행해보기: Cross Entropy 손실 함수
\`\`\`python
import math

def cross_entropy(predicted_prob):
    """정답 확률에 대한 Cross Entropy 계산"""
    return -math.log(predicted_prob)

print("❌ Cross Entropy 손실 함수")
print("'정답에 대한 확신이 낮을수록 큰 벌점!'")
print("=" * 50)

# 정답이 '고양이'인 사진에 대해 AI가 내놓은 확률
scenarios = [
    ("AI가 고양이 95% 확신", 0.95),
    ("AI가 고양이 80% 확신", 0.80),
    ("AI가 고양이 50% 확신", 0.50),
    ("AI가 고양이 20% 확신", 0.20),
    ("AI가 고양이  5% 확신", 0.05),
]

print("\\n문제: 이 사진은 고양이입니다. AI의 손실은?\\n")
for desc, prob in scenarios:
    loss = cross_entropy(prob)
    bar = "🔴" * min(int(loss * 3), 15)
    print(f"  {desc} → 손실 = {loss:.2f} {bar}")

print("\\n💡 손실이 작을수록 좋습니다!")
print("  → AI는 이 손실을 줄이기 위해 학습합니다")
print("  → 정답에 대한 확신을 높이는 방향으로!")
\`\`\`

---

### 손실 함수 비교 총정리

| 손실 함수 | 사용처 | 예시 |
|-----------|--------|------|
| **MSE** | 숫자 예측 (회귀) | 기온 예측, 주가 예측, 나이 예측 |
| **Cross Entropy** | 분류 | 고양이/개 구별, 숫자 인식, 감정 분석 |

\`\`\`
어떤 손실 함수를 쓸지 고르는 법:

  "정답이 숫자인가?" → MSE
    예: 내일 기온은? → 25.3도

  "정답이 카테고리인가?" → Cross Entropy
    예: 이 사진은? → 고양이 (95%)
\`\`\`

### 실행해보기: AI 학습 과정에서 손실 변화
\`\`\`python
import random
random.seed(42)

print("📉 AI 학습 중 손실 변화 시뮬레이션")
print("=" * 50)

loss = 2.5  # 처음엔 손실이 큼 (많이 틀림)
losses = []

for epoch in range(1, 16):
    # 학습할수록 손실 감소 (약간의 변동 포함)
    loss = loss * (0.82 + random.uniform(-0.05, 0.05))
    losses.append(loss)

    bar_len = int(loss * 10)
    bar = "█" * bar_len
    status = ""
    if loss > 1.5:
        status = "← 많이 틀림"
    elif loss > 0.5:
        status = "← 개선 중"
    else:
        status = "← 거의 정확!"

    print(f"  Epoch {epoch:2d} | 손실: {loss:.3f} | {bar} {status}")

print(f"\\n  시작: 2.500 → 최종: {losses[-1]:.3f}")
print("  → 학습할수록 손실이 줄어듭니다!")
print("  → 이것이 AI 학습의 핵심 원리입니다!")
\`\`\`

---

## 🔧 4. 콜백 함수 - 학습 과정 자동 관리

> **비유**: 빨래를 돌릴 때 타이머를 맞춰놓으면, 끝났을 때 알림이 울리죠? 콜백 함수도 "특정 상황이 되면 자동으로 실행되는 함수"입니다.

### 실행해보기: 콜백 함수 시뮬레이션
\`\`\`python
import random
random.seed(42)

# 콜백 = 특정 상황에서 자동으로 호출되는 함수

def early_stopping_callback(current_loss, best_loss, patience_count, max_patience):
    """성능이 안 나아지면 학습 중단"""
    if current_loss < best_loss:
        return current_loss, 0, "✅ 최고 기록! 모델 저장"
    else:
        patience_count += 1
        if patience_count >= max_patience:
            return best_loss, patience_count, "🛑 STOP! 더 이상 나아지지 않음"
        return best_loss, patience_count, f"⚠️ 정체 ({patience_count}/{max_patience})"

# 학습 시뮬레이션
print("🔧 콜백 함수로 학습 자동 관리")
print("=" * 55)

best = float('inf')
patience = 0
loss = 2.0

for epoch in range(1, 20):
    loss = loss * (0.85 + random.uniform(-0.08, 0.12))
    best, patience, message = early_stopping_callback(loss, best, patience, 3)
    print(f"  Epoch {epoch:2d} | 손실: {loss:.3f} | {message}")

    if "STOP" in message:
        print(f"\\n  Early Stopping: {epoch}번째에서 자동 중단!")
        break

print("\\n💡 실제 AI에서 자주 쓰는 콜백:")
print("  • EarlyStopping: 더 안 나아지면 학습 중단")
print("  • ModelCheckpoint: 최고 성능일 때 모델 자동 저장")
print("  • LearningRateScheduler: 학습률 자동 조정")
\`\`\`

---

## 🧩 종합: AI 모델 = 함수들의 조합

\`\`\`
AI 학습 전체 과정에서 함수의 역할:

  입력 데이터
    ↓
  [뉴런: 가중치×입력 + 편향]  ← 기본 함수
    ↓
  [ReLU 활성화 함수]          ← 비선형성 추가
    ↓
  [여러 층 반복...]
    ↓
  [Sigmoid/Softmax]           ← 확률로 변환
    ↓
  예측값 출력
    ↓
  [손실 함수 (MSE/CE)]        ← 오차 계산
    ↓
  오차를 줄이는 방향으로 가중치 수정
    ↓
  [콜백 함수]                 ← 학습 과정 관리
    ↓
  반복!
\`\`\`

---

## 💡 핵심 요약

| 함수 종류 | 역할 | 한마디 비유 |
|-----------|------|------------|
| **일반 함수** | 입력→처리→출력 | 자판기 |
| **ReLU** | 음수 차단, 양수 통과 | 수도꼭지 |
| **Sigmoid** | 0~1 사이 확률로 변환 | 시험 점수를 백분율로 |
| **Softmax** | 여러 확률 분배 (합=100%) | 선거 득표율 |
| **MSE** | 숫자 예측 오차 측정 | 과녁에서 벗어난 거리 |
| **Cross Entropy** | 분류 확신도 벌점 | 객관식 시험 채점 |
| **콜백** | 학습 자동 관리 | 빨래 타이머 알림 |

---

## ✅ 학습 체크리스트
- [ ] 함수의 기본 구조 (입력→처리→출력) 이해
- [ ] 활성화 함수가 없으면 층을 쌓아도 직선인 이유 이해
- [ ] ReLU: 음수→0, 양수→그대로 (중간층에 사용)
- [ ] Sigmoid: 0~1 변환 (이진분류 출력층에 사용)
- [ ] Softmax: 여러 확률 분배, 합=100% (다중분류 출력층에 사용)
- [ ] MSE: 숫자 예측 문제의 손실 함수
- [ ] Cross Entropy: 분류 문제의 손실 함수
- [ ] 손실이 줄어드는 것이 AI 학습의 핵심 원리
- [ ] 콜백 함수로 학습 과정 자동 관리 가능

`;
