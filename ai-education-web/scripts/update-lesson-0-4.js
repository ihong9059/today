const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '../src/data/curriculum.ts');
let content = fs.readFileSync(curriculumPath, 'utf8');

// Find the start and end of lesson 0-4
const startMarker = 'id: "0-4",';
let endMarker = '      },\r\n      {\r\n        id: "0-5",';
if (content.indexOf(endMarker) === -1) {
  endMarker = '      },\n      {\n        id: "0-5",';
}

const startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
  console.log('❌ Could not find lesson 0-4 start');
  process.exit(1);
}

let braceIdx = content.lastIndexOf('{', startIdx);
const lessonStartIdx = braceIdx;

const endIdx = content.indexOf(endMarker);
if (endIdx === -1) {
  console.log('❌ Could not find lesson 0-4 end');
  process.exit(1);
}

const lessonEndIdx = endIdx + '      },'.length;

const newLesson = `{
        id: "0-4",
        title: "함수",
        description: "AI의 핵심 빌딩 블록 - 활성화 함수, 손실 함수, 콜백의 원리",
        duration: "45분",
        videoUrl: "",
        content: \`
# 함수 - AI의 핵심 빌딩 블록

## 🎯 학습 목표
- 함수가 AI에서 어떤 역할을 하는지 **이해**한다
- 활성화 함수, 손실 함수의 개념을 파악한다
- 콜백(Callback) 함수의 원리를 이해한다
- 함수를 정의하고 사용하는 패턴을 익힌다

## 💡 핵심 메시지
> **"AI의 모든 것은 함수로 표현된다"**
>
> 신경망의 각 층? 함수입니다.
> 손실 계산? 함수입니다.
> 활성화? 함수입니다.
> AI는 함수들의 조합입니다!

---

## 📦 1. 함수의 기본: 입력 → 처리 → 출력

### AI 관점에서 함수 이해하기

\\\`\\\`\\\`python
# 함수 = 입력을 받아서 출력을 반환하는 블랙박스
def 함수이름(입력):
    처리
    return 출력
\\\`\\\`\\\`

**신경망도 똑같습니다:**

\\\`\\\`\\\`python
# 신경망 = 큰 함수
def neural_network(image):
    features = extract_features(image)    # 특징 추출 함수
    processed = activate(features)         # 활성화 함수
    prediction = classify(processed)       # 분류 함수
    return prediction

# 이미지 입력 → 예측 출력
result = neural_network(cat_image)  # "고양이"
\\\`\\\`\\\`

---

## ⚡ 2. 활성화 함수 (Activation Function)

### 신경망에 비선형성을 추가하는 함수

\\\`\\\`\\\`python
import numpy as np

# ReLU: 가장 많이 쓰이는 활성화 함수
def relu(x):
    return max(0, x)  # 음수는 0, 양수는 그대로

# Sigmoid: 0~1 사이 출력 (확률로 해석)
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

# Softmax: 여러 클래스 확률 (합이 1)
def softmax(x):
    exp_x = np.exp(x - np.max(x))
    return exp_x / exp_x.sum()
\\\`\\\`\\\`

### 왜 활성화 함수가 필요할까?

\\\`\\\`\\\`python
# 활성화 함수 없이 (선형만)
layer1 = x * w1
layer2 = layer1 * w2
# 결국 layer2 = x * (w1 * w2) = x * w_combined
# 아무리 층을 쌓아도 하나의 선형 함수!

# 활성화 함수 있으면 (비선형)
layer1 = relu(x * w1)
layer2 = relu(layer1 * w2)
# 복잡한 패턴 학습 가능!
\\\`\\\`\\\`

---

## 📉 3. 손실 함수 (Loss Function)

### 예측이 얼마나 틀렸는지 측정하는 함수

\\\`\\\`\\\`python
# MSE (Mean Squared Error) - 회귀 문제
def mse_loss(prediction, target):
    return ((prediction - target) ** 2).mean()

# Cross Entropy - 분류 문제
def cross_entropy_loss(prediction, target):
    return -np.sum(target * np.log(prediction))
\\\`\\\`\\\`

### AI 학습 = 손실 함수 최소화

\\\`\\\`\\\`python
for epoch in range(100):
    prediction = model(data)
    loss = loss_function(prediction, target)  # 얼마나 틀렸나?

    loss.backward()      # 역전파: 어떻게 고칠지 계산
    optimizer.step()     # 가중치 업데이트
    # 반복하면 loss가 줄어듦 → 학습 완료!
\\\`\\\`\\\`

---

## 🔔 4. 콜백 함수 (Callback)

### 특정 이벤트 발생 시 자동 호출되는 함수

\\\`\\\`\\\`python
# 콜백 함수 정의
def on_epoch_end(epoch, logs):
    print(f"Epoch {epoch} 완료! Loss: {logs['loss']:.4f}")

def save_best_model(epoch, logs):
    if logs['val_loss'] < best_loss:
        model.save('best_model.h5')
        print("모델 저장!")
\\\`\\\`\\\`

### Keras에서 콜백 사용

\\\`\\\`\\\`python
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

# 콜백 설정
callbacks = [
    EarlyStopping(patience=10),          # 조기 종료
    ModelCheckpoint('best.h5'),          # 모델 저장
    LearningRateScheduler(schedule_fn)   # 학습률 조절
]

# 학습 시 콜백 전달
model.fit(X, y, epochs=100, callbacks=callbacks)
\\\`\\\`\\\`

---

## 🧩 5. 람다 함수 (Lambda)

### 간단한 함수를 한 줄로

\\\`\\\`\\\`python
# 일반 함수
def square(x):
    return x ** 2

# 람다 함수 (같은 기능)
square = lambda x: x ** 2
\\\`\\\`\\\`

### AI에서 람다 활용

\\\`\\\`\\\`python
# 데이터 전처리에서
normalize = lambda x: (x - x.mean()) / x.std()

# 커스텀 손실 함수
custom_loss = lambda y_true, y_pred: K.mean(K.square(y_true - y_pred))

# 정렬 키로 사용
models.sort(key=lambda m: m['accuracy'], reverse=True)
\\\`\\\`\\\`

---

## 🏗️ 6. 실제 PyTorch 코드에서 함수

\\\`\\\`\\\`python
import torch
import torch.nn as nn

# 활성화 함수 (PyTorch 내장)
relu = nn.ReLU()
sigmoid = nn.Sigmoid()
softmax = nn.Softmax(dim=1)

# 손실 함수
criterion = nn.CrossEntropyLoss()

# 커스텀 함수 정의
def train_one_epoch(model, dataloader, optimizer, criterion):
    model.train()
    total_loss = 0

    for batch in dataloader:
        optimizer.zero_grad()
        output = model(batch['input'])
        loss = criterion(output, batch['target'])
        loss.backward()
        optimizer.step()
        total_loss += loss.item()

    return total_loss / len(dataloader)

# 함수 호출
loss = train_one_epoch(model, train_loader, optimizer, criterion)
\\\`\\\`\\\`

---

## ✅ 정리: AI에서 함수의 역할

| 함수 종류 | AI에서의 역할 | 예시 |
|----------|-------------|------|
| 활성화 함수 | 비선형성 추가 | ReLU, Sigmoid, Softmax |
| 손실 함수 | 예측 오차 측정 | MSE, Cross Entropy |
| 콜백 함수 | 학습 중 이벤트 처리 | EarlyStopping, Checkpoint |
| 전처리 함수 | 데이터 변환 | normalize, augment |
| 평가 함수 | 모델 성능 측정 | accuracy, f1_score |

---

## 💬 잊어버렸다면?

AI에게 이렇게 물어보세요:

- "ReLU 활성화 함수 설명해줘"
- "PyTorch에서 손실 함수 종류 알려줘"
- "Keras 콜백 사용법 알려줘"
- "람다 함수로 정렬하는 방법"

**함수 문법은 잊어도 됩니다. "AI는 함수들의 조합"이라는 것만 기억하세요!**
        \`
      }`;

content = content.substring(0, lessonStartIdx) + newLesson + content.substring(lessonEndIdx);

fs.writeFileSync(curriculumPath, content);
console.log('✅ Lesson 0-4 content successfully updated!');
