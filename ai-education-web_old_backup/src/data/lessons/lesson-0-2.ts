export const lesson0_2_content = `
# 변수와 자료형

## 📚 학습 목표
이 레슨을 완료하면:
- AI에서 왜 모든 것이 숫자인지 이해합니다
- int, float, str, bool 자료형을 구분할 수 있습니다
- 리스트가 벡터처럼 사용되는 것을 이해합니다
- 딕셔너리로 설정값을 관리하는 방법을 압니다

---

## 🎯 핵심 메시지

> **"외우지 말고 이해하세요!"**
> 문법은 필요할 때 AI에게 물어보면 됩니다.

---

## 🔢 1. 숫자형 (int, float)

### 정수 (int)
소수점이 없는 숫자

\`\`\`python
# AI 학습 설정값 (정수)
epochs = 100       # 학습 반복 횟수
batch_size = 32    # 배치 크기
num_layers = 3     # 신경망 층 수

print("=" * 30)
print("🔢 정수형(int) 예제")
print("=" * 30)
print(f"에포크 수: {epochs}회")
print(f"배치 크기: {batch_size}")
print(f"신경망 층 수: {num_layers}층")
print(f"\\n타입 확인: {type(epochs)}")

# 간단한 계산
total_iterations = epochs * 100  # 가정: 100 배치
print(f"\\n총 학습 반복: {total_iterations:,}회")
\`\`\`

### 실수 (float)
소수점이 있는 숫자 - **AI에서 가장 많이 사용!**

\`\`\`python
# AI 핵심 수치들 (실수)
learning_rate = 0.001   # 학습률
loss = 0.342            # 손실값
accuracy = 0.97         # 정확도 (97%)
weight = -1.25          # 가중치

print("=" * 30)
print("📊 실수형(float) 예제")
print("=" * 30)
print(f"학습률: {learning_rate}")
print(f"현재 손실: {loss}")
print(f"정확도: {accuracy * 100}%")
print(f"가중치 예시: {weight}")
print(f"\\n타입 확인: {type(learning_rate)}")

# 학습 시뮬레이션
print("\\n📉 학습 진행 시뮬레이션:")
for epoch in range(1, 4):
    loss = loss * 0.8  # 손실 감소
    accuracy = min(accuracy + 0.01, 1.0)  # 정확도 증가
    print(f"  Epoch {epoch}: loss={loss:.4f}, acc={accuracy:.2%}")
\`\`\`

### AI에서의 역할
\`\`\`
┌─────────────────────────────────────────┐
│  신경망의 모든 것이 숫자!               │
│  • 가중치 (weight)                      │
│  • 바이어스 (bias)                      │
│  • 학습률 (learning_rate)               │
│  • 손실값 (loss)                        │
│  • 예측값 (prediction)                  │
└─────────────────────────────────────────┘
\`\`\`

---

## 📝 2. 문자열 (str)

텍스트 데이터를 저장

\`\`\`python
# 모델과 프롬프트 정의
model_name = "GPT-4"
prompt = "안녕하세요, AI입니다."
file_path = "model.pth"

print("=" * 30)
print("📝 문자열(str) 예제")
print("=" * 30)
print(f"모델 이름: {model_name}")
print(f"프롬프트: {prompt}")
print(f"파일 경로: {file_path}")
print(f"\\n타입 확인: {type(model_name)}")

# 문자열 조작
print(f"\\n문자열 길이: {len(prompt)}자")
print(f"대문자 변환: {model_name.lower()}")
print(f"포함 확인: '안녕' in prompt = {'안녕' in prompt}")
\`\`\`

### 자연어 처리(NLP)에서
\`\`\`
"Hello" → [0.23, -0.15, 0.42, ...]  # 임베딩 벡터로 변환
\`\`\`
→ 결국 텍스트도 숫자가 됩니다!

---

## ✓ 3. 불리언 (bool)

참(True) 또는 거짓(False)만 가능

\`\`\`python
# AI 설정 플래그
is_training = True      # 학습 모드
use_gpu = True          # GPU 사용
use_dropout = False     # 드롭아웃 미사용

print("=" * 30)
print("✓ 불리언(bool) 예제")
print("=" * 30)
print(f"학습 모드: {is_training}")
print(f"GPU 사용: {use_gpu}")
print(f"드롭아웃: {use_dropout}")
print(f"\\n타입 확인: {type(is_training)}")

# 조건문에서 활용
print("\\n🔄 모드 전환 시뮬레이션:")
if is_training:
    print("  → model.train() 실행")
    print("  → 그래디언트 계산 활성화")
else:
    print("  → model.eval() 실행")
    print("  → 추론 모드")

# 불리언 연산
print(f"\\nAND 연산: {is_training and use_gpu}")
print(f"OR 연산: {is_training or use_dropout}")
print(f"NOT 연산: {not use_dropout}")
\`\`\`

---

## 📦 4. 리스트 (list) - 가장 많이 사용!

순서가 있는 데이터 모음 → **벡터처럼 사용!**

\`\`\`python
# 3차원 좌표 (벡터)
point = [3.0, 4.5, 2.1]

# RGB 픽셀값
red = [255, 0, 0]
green = [0, 255, 0]

# 신경망 층 구성
layers = [784, 128, 64, 10]

print("=" * 30)
print("📦 리스트(list) 예제")
print("=" * 30)
print(f"3D 좌표: {point}")
print(f"빨간색 RGB: {red}")
print(f"녹색 RGB: {green}")
print(f"신경망 구조: {layers}")

# 벡터 연산 시뮬레이션
print("\\n🧮 벡터 연산:")
vector_a = [1, 2, 3]
vector_b = [4, 5, 6]
dot_product = sum(a*b for a, b in zip(vector_a, vector_b))
print(f"  벡터 A: {vector_a}")
print(f"  벡터 B: {vector_b}")
print(f"  내적(dot product): {dot_product}")

# 신경망 층 정보
print(f"\\n🧠 신경망 분석:")
print(f"  입력층: {layers[0]} 뉴런")
print(f"  은닉층: {layers[1:-1]} 뉴런")
print(f"  출력층: {layers[-1]} 뉴런")
print(f"  총 층 수: {len(layers)}개")
\`\`\`

### 2차원 리스트 = 행렬!

\`\`\`python
# 2x3 행렬
matrix = [
    [1, 2, 3],
    [4, 5, 6]
]

# 가중치 행렬
weights = [
    [0.1, 0.2],
    [0.3, 0.4],
    [0.5, 0.6]
]

print("=" * 30)
print("📊 2차원 리스트 (행렬)")
print("=" * 30)

print("행렬 (2x3):")
for row in matrix:
    print(f"  {row}")

print(f"\\n행렬 크기: {len(matrix)} x {len(matrix[0])}")

print("\\n가중치 행렬 (3x2):")
for row in weights:
    print(f"  {row}")

# 행렬 원소 접근
print(f"\\n원소 접근: matrix[0][1] = {matrix[0][1]}")
print(f"전체 합계: {sum(sum(row) for row in matrix)}")
\`\`\`

### 시각화
\`\`\`
1차원 리스트 (벡터):
[1, 2, 3, 4, 5]

2차원 리스트 (행렬):
┌─────────────┐
│  1   2   3  │
│  4   5   6  │
└─────────────┘

3차원 리스트 (텐서, 예: 컬러 이미지):
┌───┐┌───┐┌───┐
│ R ││ G ││ B │
└───┘└───┘└───┘
\`\`\`

---

## 📚 5. 딕셔너리 (dict)

키-값 쌍으로 데이터 저장 → **설정값 관리에 최적!**

\`\`\`python
# 모델 설정
config = {
    "learning_rate": 0.001,
    "epochs": 100,
    "batch_size": 32,
    "optimizer": "Adam"
}

print("=" * 30)
print("📚 딕셔너리(dict) 예제")
print("=" * 30)

print("모델 설정:")
for key, value in config.items():
    print(f"  {key}: {value}")

# 값 접근
print(f"\\n학습률 접근: config['learning_rate'] = {config['learning_rate']}")

# 학습 결과 저장
results = {
    "train_loss": [0.5, 0.3, 0.2, 0.15],
    "val_loss": [0.6, 0.4, 0.35, 0.3],
    "best_accuracy": 0.95
}

print("\\n📈 학습 결과:")
print(f"  Train Loss: {results['train_loss']}")
print(f"  Val Loss: {results['val_loss']}")
print(f"  Best Accuracy: {results['best_accuracy']:.1%}")
\`\`\`

---

## 🔄 자료형 변환

\`\`\`python
print("=" * 30)
print("🔄 자료형 변환")
print("=" * 30)

# 문자열 → 정수
text_num = "42"
num = int(text_num)
print(f"문자열 → 정수: '{text_num}' → {num} (타입: {type(num).__name__})")

# 정수 → 실수
integer = 100
price = float(integer)
print(f"정수 → 실수: {integer} → {price} (타입: {type(price).__name__})")

# 숫자 → 문자열
pi = 3.14159
text = str(pi)
print(f"숫자 → 문자열: {pi} → '{text}' (타입: {type(text).__name__})")

# 리스트 → 튜플
my_list = [1, 2, 3]
my_tuple = tuple(my_list)
print(f"리스트 → 튜플: {my_list} → {my_tuple} (타입: {type(my_tuple).__name__})")

# 실용 예제: 정확도 포맷팅
accuracy = 0.9567
print(f"\\n📊 정확도 포맷팅:")
print(f"  원본: {accuracy}")
print(f"  백분율: {accuracy * 100:.2f}%")
print(f"  문자열: '{str(int(accuracy * 100))}%'")
\`\`\`

---

## 💡 핵심 인사이트

| 자료형 | AI에서의 역할 |
|--------|---------------|
| **int** | 반복 횟수, 층 수, 인덱스 |
| **float** | 가중치, 학습률, 손실값, 정확도 |
| **str** | 텍스트 데이터, 파일 경로 |
| **bool** | 학습/평가 모드 전환, 옵션 |
| **list** | 벡터, 행렬, 배치 데이터 |
| **dict** | 설정값, 하이퍼파라미터, 결과 저장 |

---

## 🧪 실습: 종합 예제

\`\`\`python
# AI 모델 학습 시뮬레이션
print("=" * 40)
print("🤖 AI 모델 학습 시뮬레이션")
print("=" * 40)

# 1. 설정 (딕셔너리)
config = {
    "model_name": "SimpleNet",
    "learning_rate": 0.01,
    "epochs": 5,
    "layers": [784, 128, 10]
}

print(f"\\n📋 모델 설정: {config['model_name']}")
print(f"   구조: {config['layers']}")
print(f"   학습률: {config['learning_rate']}")

# 2. 학습 루프 시뮬레이션
print(f"\\n🔄 학습 시작 ({config['epochs']} epochs)")
print("-" * 40)

loss = 1.0
accuracy = 0.5
history = {"loss": [], "accuracy": []}

for epoch in range(1, config["epochs"] + 1):
    # 학습 시뮬레이션
    loss *= 0.7
    accuracy = min(accuracy + 0.1, 0.99)

    # 결과 저장
    history["loss"].append(round(loss, 4))
    history["accuracy"].append(round(accuracy, 4))

    # 진행 상황 출력
    print(f"Epoch {epoch}/{config['epochs']}: loss={loss:.4f}, accuracy={accuracy:.2%}")

print("-" * 40)
print(f"\\n✅ 학습 완료!")
print(f"   최종 손실: {history['loss'][-1]}")
print(f"   최종 정확도: {history['accuracy'][-1]:.2%}")
print(f"   손실 변화: {history['loss']}")
\`\`\`

---

## ✅ 학습 체크리스트
- [ ] int와 float의 차이 이해
- [ ] 리스트가 벡터처럼 사용됨을 이해
- [ ] 2차원 리스트가 행렬임을 이해
- [ ] 딕셔너리로 설정값 관리 가능함을 이해
`;
