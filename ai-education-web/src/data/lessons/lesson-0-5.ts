export const lesson0_5_content = `
# NumPy 기초 - AI의 데이터 언어

## 📚 학습 목표
이 레슨을 완료하면:
- NumPy가 AI에서 왜 필수적인지 설명할 수 있습니다
- 텐서의 차원(0D~4D)과 각 차원이 AI에서 의미하는 바를 이해합니다
- Shape과 Reshape의 개념과 AI에서의 필요성을 이해합니다
- 벡터 연산이 for루프보다 왜 빠른지 설명할 수 있습니다
- 브로드캐스팅의 원리와 AI에서의 활용을 이해합니다
- NumPy로 간단한 뉴런 계산을 구현할 수 있습니다

---

## 🎯 핵심 메시지

> **"AI에게 세상의 모든 것은 숫자 배열(텐서)이다"**
> 사진도, 글자도, 소리도 AI에게는 전부 숫자 배열입니다. NumPy는 그 숫자 배열을 다루는 도구입니다!

---

## 📖 1. 왜 NumPy가 AI에 필수인가?

> **비유**: 외국 여행을 갈 때 번역기가 필수이듯, AI에게 데이터를 전달하려면 "숫자 배열 번역기"가 필수입니다. **NumPy가 바로 그 번역기입니다!**

\`\`\`
AI의 모국어는 "숫자 배열"입니다!

📷 고양이 사진 (28×28 픽셀)
   → 784개의 숫자 배열 [0.12, 0.95, 0.33, ...]

💬 "오늘 날씨 좋다" (텍스트)
   → 토큰 ID 배열 [1045, 2389, 887, 12]

🎵 음성 파일 (1초)
   → 16,000개의 숫자 (파형 데이터)

→ 전부 숫자 배열! 이것을 다루는 도구가 NumPy!
\`\`\`

### 실행해보기: NumPy 첫 만남
\`\`\`python
import numpy as np

# Python 리스트 vs NumPy 배열
python_list = [1, 2, 3, 4, 5]
numpy_array = np.array([1, 2, 3, 4, 5])

print("🔢 Python 리스트 vs NumPy 배열")
print("=" * 45)
print(f"Python 리스트: {python_list}, 타입: {type(python_list).__name__}")
print(f"NumPy 배열:    {numpy_array}, 타입: {type(numpy_array).__name__}")

# 핵심 차이: 연산!
print("\\n✨ 핵심 차이: 배열 전체에 한번에 연산 가능!")
print(f"  리스트 × 2  = {python_list * 2}")  # 리스트 반복!
print(f"  배열 × 2    = {numpy_array * 2}")   # 각 원소 × 2!

print(f"\\n  배열 + 10   = {numpy_array + 10}")
print(f"  배열 ** 2   = {numpy_array ** 2}")

print("\\n→ NumPy는 for루프 없이 배열 전체를 한번에 계산합니다!")
print("  이것이 AI에서 수백만 개의 숫자를 빠르게 처리하는 비결!")
\`\`\`

---

## 🧱 2. 텐서(Tensor) - AI 데이터의 기본 단위

> **비유**: 레고를 생각해보세요. 블록 1개(스칼라) → 블록 1줄(벡터) → 블록 판(행렬) → 블록 상자(3D) → 블록 상자 여러 개(4D). AI의 데이터도 이렇게 차원이 쌓입니다!

\`\`\`
텐서 = 다차원 숫자 배열

0D (스칼라):  42                        ← 숫자 하나
1D (벡터):    [1, 2, 3]                 ← 숫자 한 줄
2D (행렬):    [[1,2,3], [4,5,6]]        ← 숫자 표
3D (텐서):    [[[1,2],[3,4]], [[5,6],[7,8]]]  ← 숫자 상자
4D:           배치 × 높이 × 너비 × 채널     ← 실제 AI 입력!
\`\`\`

### 각 차원이 AI에서 의미하는 것

\`\`\`
1D 벡터: 하나의 데이터 특성값
   예: 한 사람의 [나이, 키, 몸무게] = [25, 175, 70]

2D 행렬: 데이터셋 또는 흑백 이미지
   예: 3명의 특성값 = [[25,175,70], [30,180,85], [22,160,55]]
   예: 28×28 흑백 손글씨 이미지

3D 텐서: 컬러 이미지 또는 시계열 데이터
   예: 높이 × 너비 × RGB(3채널) = 컬러 사진

4D 텐서: 이미지 배치 (실제 AI 학습 입력!)
   예: 32장 × 28 × 28 × 3 = 한번에 학습할 32장의 컬러 사진
\`\`\`

### 실행해보기: 텐서 차원 체험하기
\`\`\`python
import numpy as np

print("🧱 텐서의 차원 (Dimension)")
print("=" * 50)

# 0D: 스칼라 - 숫자 하나
scalar = np.array(42)
print(f"\\n0D 스칼라: {scalar}")
print(f"   shape: {scalar.shape}, 차원: {scalar.ndim}")
print(f"   AI에서: 손실값 하나, 정확도 하나")

# 1D: 벡터 - 숫자 한 줄
vector = np.array([25, 175, 70])
print(f"\\n1D 벡터: {vector}")
print(f"   shape: {vector.shape}, 차원: {vector.ndim}")
print(f"   AI에서: 한 사람의 [나이, 키, 몸무게]")

# 2D: 행렬 - 숫자 표
matrix = np.array([[25, 175, 70],
                   [30, 180, 85],
                   [22, 160, 55]])
print(f"\\n2D 행렬:\\n{matrix}")
print(f"   shape: {matrix.shape}, 차원: {matrix.ndim}")
print(f"   AI에서: 3명의 데이터셋 (3행 × 3열)")

# 3D: 텐서 - 컬러 이미지 시뮬레이션
tensor_3d = np.random.randint(0, 256, size=(4, 4, 3))
print(f"\\n3D 텐서 (4×4 컬러 이미지 시뮬레이션):")
print(f"   shape: {tensor_3d.shape}, 차원: {tensor_3d.ndim}")
print(f"   의미: 높이={tensor_3d.shape[0]}, 너비={tensor_3d.shape[1]}, 채널(RGB)={tensor_3d.shape[2]}")

# 4D: 배치 이미지 - 실제 AI 학습 입력!
batch = np.random.randint(0, 256, size=(2, 4, 4, 3))
print(f"\\n4D 텐서 (AI 학습 입력 형태!):")
print(f"   shape: {batch.shape}, 차원: {batch.ndim}")
print(f"   의미: {batch.shape[0]}장 × {batch.shape[1]}높이 × {batch.shape[2]}너비 × {batch.shape[3]}채널")
print(f"   → 실제로는 (32, 28, 28, 3) 처럼 큰 배치를 사용!")
\`\`\`

---

## 🔄 3. Shape과 Reshape - AI에서 가장 많이 하는 작업

> **비유**: 레고 블록 12개를 1줄(12×1)로 늘어놓을 수도 있고, 직사각형(3×4)으로 배열할 수도 있고, 정사각형에 가깝게(2×6) 배열할 수도 있습니다. 블록 개수는 같지만 배치만 바뀌는 것! **Reshape이 바로 이것입니다.**

### 왜 Reshape이 필요한가?

\`\`\`
신경망의 각 층은 기대하는 데이터 모양(shape)이 다릅니다!

예: 손글씨 인식 AI
  원본 이미지: 28×28 (2D 행렬)
     ↓ reshape
  MLP 입력:    784 (1D 벡터로 펼치기!)
     ↓
  신경망 계산...
     ↓
  CNN 입력:    1×28×28 (채널×높이×너비로 변환!)

→ 같은 데이터인데 모양만 바꿔서 다른 신경망에 넣는 것!
\`\`\`

### 실행해보기: Reshape 마스터하기
\`\`\`python
import numpy as np

print("🔄 Shape과 Reshape")
print("=" * 50)

# 28×28 이미지 시뮬레이션
image = np.random.randint(0, 256, size=(28, 28))
print(f"원본 이미지 shape: {image.shape}")
print(f"  총 원소 개수: {image.size}")

# MLP에 넣기 위해 1D로 펼치기 (flatten)
flat = image.reshape(784)
print(f"\\n1D로 펼치기 (flatten): {flat.shape}")
print(f"  → MLP(Multi-Layer Perceptron)에 입력 가능!")

# -1을 사용한 자동 계산
flat_auto = image.reshape(-1)
print(f"  reshape(-1) 자동 계산: {flat_auto.shape}")
print(f"  → -1은 '알아서 계산해줘'라는 뜻!")

# 다시 2D로 복원
restored = flat.reshape(28, 28)
print(f"\\n다시 28×28로 복원: {restored.shape}")

# CNN 입력 형태로 변환
cnn_input = image.reshape(1, 28, 28)
print(f"CNN 입력 형태: {cnn_input.shape}")
print(f"  → (채널, 높이, 너비) 형태")

# 배치 + CNN 입력 형태
batch_cnn = image.reshape(1, 1, 28, 28)
print(f"배치+CNN 형태: {batch_cnn.shape}")
print(f"  → (배치, 채널, 높이, 너비) 형태")

# 다양한 reshape 예제
print("\\n📐 12개 원소의 다양한 reshape:")
arr = np.arange(12)
print(f"  원본:   {arr}  shape={arr.shape}")
print(f"  (3,4):  \\n{arr.reshape(3, 4)}")
print(f"  (4,3):  \\n{arr.reshape(4, 3)}")
print(f"  (2,6):  \\n{arr.reshape(2, 6)}")
print(f"  (2,2,3):\\n{arr.reshape(2, 2, 3)}")

print("\\n💡 reshape 규칙: 원소 개수가 같아야 함!")
print("  12개 → (3×4)=12 ✅  (3×5)=15 ❌")
\`\`\`

---

## ⚡ 4. 배열 연산 - 왜 for루프 대신 NumPy인가?

> **비유**: 택배를 1개씩 나르면 100번 왕복해야 하지만, 트럭에 실으면 1번에 끝납니다. **for루프는 1개씩 나르기, NumPy는 트럭으로 한번에 나르기!**

### 실행해보기: for루프 vs NumPy 코드 비교
\`\`\`python
import numpy as np

print("⚡ for루프 vs NumPy 코드 비교")
print("=" * 50)

# 방법 1: for루프 (하나씩 계산)
list_a = [1, 2, 3, 4, 5]
list_b = [10, 20, 30, 40, 50]

result_loop = []
for a, b in zip(list_a, list_b):
    result_loop.append(a + b)

print("\\n📌 방법 1: for루프")
print(f"  코드: for a, b in zip(list_a, list_b): ...")
print(f"  결과: {result_loop}")

# 방법 2: NumPy (한번에!)
np_a = np.array([1, 2, 3, 4, 5])
np_b = np.array([10, 20, 30, 40, 50])

result_numpy = np_a + np_b

print("\\n📌 방법 2: NumPy")
print(f"  코드: np_a + np_b  ← 이게 전부!")
print(f"  결과: {result_numpy}")

print("\\n→ 같은 결과, NumPy는 코드 한줄!")

# 실제 큰 데이터에서의 차이
size = 10000
np_big_a = np.arange(size)
np_big_b = np.arange(size)
np_result = np_big_a + np_big_b

print(f"\\n📊 큰 데이터 ({size:,}개) NumPy 연산:")
print(f"  np.arange({size}) + np.arange({size})")
print(f"  결과 shape: {np_result.shape}")
print(f"  처음 5개: {np_result[:5]}")
print(f"  마지막 5개: {np_result[-5:]}")

print("\\n💡 실제 AI에서는 수백만~수억 개의 숫자를 다룹니다.")
print("  for루프로는 며칠 걸릴 계산을 NumPy로는 몇 초에!")
print("  이것이 NumPy가 AI에 필수인 이유입니다.")
\`\`\`

### AI에서의 핵심 연산: 행렬 곱 (Dot Product)

\`\`\`
AI 뉴런의 계산 = 행렬 곱!

  입력: [x₁, x₂, x₃] = [0.5, 0.8, 0.2]
  가중치: [w₁, w₂, w₃] = [0.3, 0.7, 0.1]

  출력 = x₁×w₁ + x₂×w₂ + x₃×w₃
       = 0.5×0.3 + 0.8×0.7 + 0.2×0.1
       = 0.15 + 0.56 + 0.02
       = 0.73

  NumPy: np.dot(x, w)  ← 한줄이면 끝!
\`\`\`

### 실행해보기: 원소별 연산과 행렬 곱
\`\`\`python
import numpy as np

print("🔢 NumPy 배열 연산")
print("=" * 50)

a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])

# 원소별 연산 (element-wise)
print("\\n📌 원소별 연산 (각 원소끼리 계산):")
print(f"  a     = {a}")
print(f"  b     = {b}")
print(f"  a + b = {a + b}")
print(f"  a * b = {a * b}")
print(f"  a / b = {a / b}")

# 행렬 곱 (dot product)
print("\\n📌 행렬 곱 (dot product) - AI의 핵심!")
x = np.array([0.5, 0.8, 0.2])  # 입력
w = np.array([0.3, 0.7, 0.1])  # 가중치

dot_result = np.dot(x, w)
manual = 0.5*0.3 + 0.8*0.7 + 0.2*0.1

print(f"  입력 x = {x}")
print(f"  가중치 w = {w}")
print(f"  np.dot(x, w) = {dot_result}")
print(f"  수동 계산:   = {manual}")
print(f"  → 같은 결과! NumPy가 한줄로 계산해줍니다")

# 2D 행렬 곱 - 여러 뉴런 동시 계산
print("\\n📌 2D 행렬 곱 - 여러 뉴런을 동시에!")
X = np.array([[0.5, 0.8, 0.2],   # 데이터 1
              [0.1, 0.9, 0.4]])   # 데이터 2

W = np.array([[0.3, 0.6],  # 뉴런1, 뉴런2의 가중치
              [0.7, 0.2],
              [0.1, 0.8]])

result = np.dot(X, W)
print(f"  입력 X shape: {X.shape} (2개 데이터, 3개 특성)")
print(f"  가중치 W shape: {W.shape} (3개 입력, 2개 뉴런)")
print(f"  결과 shape: {result.shape} (2개 데이터, 2개 뉴런 출력)")
print(f"  결과:\\n{result}")
print(f"  → 2개 데이터를 2개 뉴런에 동시에 통과시킨 결과!")
\`\`\`

---

## 📡 5. 브로드캐스팅 - 다른 크기 배열의 마법 연산

> **비유**: 선생님이 전교생 100명의 시험 점수에 각각 +5점 보정을 해줍니다. 숫자 1개(+5)를 100개의 점수에 한번에 적용하는 것! **이것이 브로드캐스팅입니다.**

\`\`\`
브로드캐스팅 = 크기가 다른 배열끼리도 연산 가능!

  [1, 2, 3, 4, 5]  +  10
  =  NumPy가 10을 자동 확장 → [10, 10, 10, 10, 10]
  = [11, 12, 13, 14, 15]

  AI에서: 편향(bias) 더하기가 바로 브로드캐스팅!
  [뉴런1출력, 뉴런2출력, 뉴런3출력] + [b1, b2, b3]
\`\`\`

### 실행해보기: 브로드캐스팅 이해하기
\`\`\`python
import numpy as np

print("📡 브로드캐스팅 - 크기가 달라도 연산 가능!")
print("=" * 50)

# 1. 스칼라 + 배열
scores = np.array([85, 72, 90, 68, 95])
print(f"\\n원래 점수: {scores}")
print(f"보정 +5:   {scores + 5}")
print(f"→ 5가 자동으로 [5,5,5,5,5]로 확장!")

# 2. 2D 행렬 + 1D 벡터
print("\\n📌 AI에서의 브로드캐스팅: 편향(bias) 더하기")
neuron_outputs = np.array([[0.5, 0.8, 0.2],   # 데이터 1의 뉴런 출력
                            [0.3, 0.6, 0.9],   # 데이터 2의 뉴런 출력
                            [0.7, 0.1, 0.4]])  # 데이터 3의 뉴런 출력

bias = np.array([0.1, -0.2, 0.3])  # 각 뉴런의 편향

result = neuron_outputs + bias

print(f"뉴런 출력 (3×3):\\n{neuron_outputs}")
print(f"편향 (1×3): {bias}")
print(f"\\n결과 (3×3):\\n{result}")
print(f"\\n→ bias [0.1, -0.2, 0.3]이 각 행에 자동 적용!")
print(f"  1행: [0.5+0.1, 0.8-0.2, 0.2+0.3] = {result[0]}")

# 3. 정규화 (데이터 전처리)
print("\\n📌 데이터 정규화 (브로드캐스팅 활용)")
data = np.array([[170, 65, 25],
                 [180, 80, 30],
                 [160, 55, 22]])
print(f"원본 데이터 (키, 몸무게, 나이):\\n{data}")

mean = data.mean(axis=0)
std = data.std(axis=0)
normalized = (data - mean) / std

print(f"평균: {mean}")
print(f"표준편차: {std}")
print(f"정규화 결과:\\n{np.round(normalized, 2)}")
print(f"→ AI 학습 전에 꼭 필요한 데이터 전처리!")
\`\`\`

---

## 🧠 6. 종합 예제: 간단한 뉴런 계산을 NumPy로

> **비유**: 지금까지 배운 모든 것을 조합하면, 실제 신경망 1개 층의 계산을 직접 구현할 수 있습니다! **y = ReLU(W·x + b)** 이것이 딥러닝의 기본 공식입니다.

\`\`\`
신경망 1개 층의 계산:

  1. 입력(x)과 가중치(W)를 행렬 곱  →  np.dot(x, W)
  2. 편향(b)을 더하기              →  + b (브로드캐스팅!)
  3. 활성화 함수 적용               →  ReLU로 음수 차단

  y = ReLU(W·x + b)
\`\`\`

### 실행해보기: 신경망 한 층 구현하기
\`\`\`python
import numpy as np

def relu(x):
    """ReLU 활성화 함수: 음수는 0, 양수는 그대로"""
    return np.maximum(0, x)

def softmax(x):
    """Softmax: 확률로 변환"""
    exp_x = np.exp(x - np.max(x))  # 안정적 계산
    return exp_x / np.sum(exp_x)

print("🧠 NumPy로 신경망 한 층 구현하기")
print("=" * 55)

# 입력: 3개의 특성 (예: 키, 몸무게, 나이를 정규화한 값)
x = np.array([0.5, 0.8, 0.2])
print(f"입력 x: {x}  (3개 특성)")

# 층 1: 3개 입력 → 4개 뉴런
np.random.seed(42)
W1 = np.random.randn(3, 4) * 0.5  # 가중치
b1 = np.zeros(4)                   # 편향

print(f"\\n--- 층 1: 3 입력 → 4 뉴런 ---")
z1 = np.dot(x, W1) + b1           # 행렬곱 + 편향
a1 = relu(z1)                      # ReLU 활성화
print(f"  W·x + b = {np.round(z1, 3)}")
print(f"  ReLU    = {np.round(a1, 3)}")
print(f"  → 음수가 0으로 차단된 것을 확인!")

# 층 2: 4개 입력 → 3개 출력 (3개 클래스 분류)
W2 = np.random.randn(4, 3) * 0.5
b2 = np.zeros(3)

print(f"\\n--- 층 2: 4 뉴런 → 3 클래스 출력 ---")
z2 = np.dot(a1, W2) + b2
output = softmax(z2)               # Softmax로 확률 변환

labels = ["고양이", "강아지", "토끼"]
print(f"  원시 출력 = {np.round(z2, 3)}")
print(f"  Softmax  = {np.round(output, 3)}")
print(f"\\n  📊 분류 결과:")
for label, prob in zip(labels, output):
    bar = "█" * int(prob * 30)
    print(f"    {label}: {prob*100:5.1f}% {bar}")

print(f"\\n  확률 합계: {output.sum()*100:.1f}%")

print("\\n" + "=" * 55)
print("🎉 축하합니다! 신경망 1개 층의 계산을 직접 구현했습니다!")
print("   이것이 PyTorch, TensorFlow 내부에서 일어나는 일입니다!")
print("\\n  요약: y = Softmax(ReLU(x·W1 + b1)·W2 + b2)")
\`\`\`

---

## 💡 핵심 요약

| 개념 | 설명 | AI에서의 역할 |
|------|------|--------------|
| **NumPy 배열** | 빠른 숫자 배열 연산 | 모든 AI 데이터의 기본 형태 |
| **텐서 차원** | 0D~4D 다차원 배열 | 데이터 종류에 따라 차원 결정 |
| **Shape** | 배열의 모양 정보 | 신경망 층 간 데이터 흐름 파악 |
| **Reshape** | 모양 변환 | 신경망 입력에 맞게 변환 |
| **벡터 연산** | for루프 없이 한번에 | 수백만 연산을 빠르게 처리 |
| **행렬 곱** | np.dot() | 뉴런의 핵심 계산 (W·x) |
| **브로드캐스팅** | 크기 다른 배열 연산 | 편향 더하기, 정규화 |
| **ReLU + np.maximum** | 배열 전체에 활성화 | 신경망 중간층 활성화 |

---

## ✅ 학습 체크리스트
- [ ] NumPy가 AI에서 필수인 이유 이해 (모든 데이터 = 숫자 배열)
- [ ] 텐서의 차원(0D~4D)과 각 차원의 AI에서의 의미 파악
- [ ] shape 확인과 reshape 사용법 이해
- [ ] -1을 사용한 자동 reshape과 flatten 개념 이해
- [ ] for루프 대신 NumPy 벡터 연산을 쓰는 이유 (속도!)
- [ ] 행렬 곱(dot product)이 AI 뉴런 계산의 핵심임을 이해
- [ ] 브로드캐스팅으로 편향(bias)을 더하는 원리 이해
- [ ] y = ReLU(W·x + b) 를 NumPy로 구현 가능

`;
