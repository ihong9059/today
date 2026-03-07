const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '../src/data/curriculum.ts');
let content = fs.readFileSync(curriculumPath, 'utf8');

const startMarker = 'id: "0-5",';
let endMarker = '      },\r\n      {\r\n        id: "0-6",';
if (content.indexOf(endMarker) === -1) {
  endMarker = '      },\n      {\n        id: "0-6",';
}

const startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
  console.log('❌ Could not find lesson 0-5 start');
  process.exit(1);
}

let braceIdx = content.lastIndexOf('{', startIdx);
const lessonStartIdx = braceIdx;

const endIdx = content.indexOf(endMarker);
if (endIdx === -1) {
  console.log('❌ Could not find lesson 0-5 end');
  process.exit(1);
}

const lessonEndIdx = endIdx + '      },'.length;

const newLesson = `{
        id: "0-5",
        title: "NumPy 기초",
        description: "텐서의 기초 - 신경망이 실제로 다루는 데이터 구조",
        duration: "50분",
        videoUrl: "",
        content: \`
# NumPy 기초 - 텐서의 기초

## 🎯 학습 목표
- NumPy 배열이 AI에서 왜 핵심인지 **이해**한다
- 텐서(Tensor)의 개념과 차원을 파악한다
- 신경망 데이터의 실제 구조를 이해한다
- 기본적인 배열 연산을 할 수 있다

## 💡 핵심 메시지
> **"NumPy = AI 데이터의 기본 단위"**
>
> 이미지, 텍스트, 음성 - AI가 다루는 모든 데이터는 NumPy 배열(텐서)입니다.
> PyTorch의 Tensor, TensorFlow의 Tensor 모두 NumPy에서 출발합니다.

---

## 📊 1. 텐서(Tensor)란?

### 차원에 따른 텐서 분류

| 차원 | 이름 | 예시 | AI에서의 용도 |
|-----|------|------|-------------|
| 0D | 스칼라 | 5 | 손실값, 정확도 |
| 1D | 벡터 | [1, 2, 3] | 특징 벡터, 임베딩 |
| 2D | 행렬 | [[1,2],[3,4]] | 가중치, 흑백 이미지 |
| 3D | 3차원 텐서 | 이미지 (H, W, C) | 컬러 이미지 |
| 4D | 4차원 텐서 | 배치 이미지 | (Batch, H, W, C) |

### 실제 예시

\\\`\\\`\\\`python
import numpy as np

# 스칼라 (0D) - 손실값
loss = np.array(0.0234)

# 벡터 (1D) - 단어 임베딩
word_embedding = np.array([0.1, 0.5, -0.3, 0.8])  # 단어 "고양이"

# 행렬 (2D) - 흑백 이미지 28x28
gray_image = np.zeros((28, 28))

# 3D 텐서 - 컬러 이미지 224x224x3 (RGB)
color_image = np.zeros((224, 224, 3))

# 4D 텐서 - 배치 이미지 32장
batch_images = np.zeros((32, 224, 224, 3))
print(batch_images.shape)  # (32, 224, 224, 3)
\\\`\\\`\\\`

---

## 🏗️ 2. 신경망 가중치의 구조

### 완전연결층 (Dense Layer)

\\\`\\\`\\\`python
# 입력: 784개 특징 → 출력: 128개 뉴런
# 가중치 행렬: (784, 128)
weights = np.random.randn(784, 128) * 0.01
bias = np.zeros(128)

# 순전파 계산
input_data = np.random.randn(1, 784)  # 1개 샘플, 784개 특징
output = input_data @ weights + bias   # 행렬 곱
print(output.shape)  # (1, 128)
\\\`\\\`\\\`

### 합성곱층 (Conv2D Layer)

\\\`\\\`\\\`python
# 합성곱 커널: (필터 수, 채널, 높이, 너비)
# 32개 필터, 3채널(RGB), 3x3 크기
conv_kernel = np.random.randn(32, 3, 3, 3) * 0.01
print(conv_kernel.shape)  # (32, 3, 3, 3)
\\\`\\\`\\\`

---

## 🔢 3. 필수 배열 생성 함수

### AI에서 자주 쓰는 배열 생성

\\\`\\\`\\\`python
import numpy as np

# 가중치 초기화
weights = np.random.randn(100, 50) * 0.01  # 표준정규분포
weights = np.zeros((100, 50))              # 0으로 초기화
weights = np.ones((100, 50))               # 1로 초기화

# 특수 배열
identity = np.eye(3)  # 단위행렬 (항등행렬)
# [[1, 0, 0],
#  [0, 1, 0],
#  [0, 0, 1]]

# 범위 배열
indices = np.arange(0, 100, 10)  # [0, 10, 20, ..., 90]
\\\`\\\`\\\`

---

## ➕ 4. 배열 연산: 브로드캐스팅

### AI에서 가장 중요한 연산!

\\\`\\\`\\\`python
# 배치 데이터에 평균 빼기 (정규화)
batch = np.random.randn(32, 784)  # 32개 샘플, 784개 특징
mean = batch.mean(axis=0)          # 특징별 평균 (784,)

# 브로드캐스팅: (32, 784) - (784,) → (32, 784)
normalized = batch - mean

# 결과: 모든 샘플에서 평균을 뺌!
\\\`\\\`\\\`

### 원소별 연산

\\\`\\\`\\\`python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# 원소별 연산 (벡터화)
print(a + b)     # [5, 7, 9]
print(a * b)     # [4, 10, 18]
print(a ** 2)    # [1, 4, 9]
print(np.exp(a)) # [2.72, 7.39, 20.09]
\\\`\\\`\\\`

---

## 🎯 5. 슬라이싱: 데이터 추출

### 배치에서 특정 데이터 추출

\\\`\\\`\\\`python
# 이미지 배치 (32장, 224x224, RGB)
images = np.random.randn(32, 224, 224, 3)

# 첫 번째 이미지
first_image = images[0]  # (224, 224, 3)

# 처음 8장
batch_8 = images[:8]  # (8, 224, 224, 3)

# 모든 이미지의 중앙 부분
center = images[:, 50:174, 50:174, :]  # (32, 124, 124, 3)

# Red 채널만
red_channel = images[:, :, :, 0]  # (32, 224, 224)
\\\`\\\`\\\`

---

## 🔄 6. 형상 변환 (Reshape)

### 신경망 입력 형태 맞추기

\\\`\\\`\\\`python
# 28x28 이미지를 784 벡터로 (Flatten)
image = np.random.randn(28, 28)
flattened = image.reshape(-1)  # (784,)
# 또는
flattened = image.flatten()    # (784,)

# 배치 이미지 Flatten
batch = np.random.randn(32, 28, 28)
flattened_batch = batch.reshape(32, -1)  # (32, 784)

# 채널 순서 변경 (HWC → CHW for PyTorch)
image_hwc = np.random.randn(224, 224, 3)  # Height, Width, Channel
image_chw = image_hwc.transpose(2, 0, 1)   # (3, 224, 224)
\\\`\\\`\\\`

---

## 🔗 7. NumPy ↔ PyTorch 변환

\\\`\\\`\\\`python
import numpy as np
import torch

# NumPy → PyTorch
np_array = np.array([1, 2, 3])
tensor = torch.from_numpy(np_array)

# PyTorch → NumPy
tensor = torch.tensor([1, 2, 3])
np_array = tensor.numpy()

# GPU 텐서 → NumPy (CPU로 이동 필요)
gpu_tensor = torch.tensor([1, 2, 3]).cuda()
np_array = gpu_tensor.cpu().numpy()
\\\`\\\`\\\`

---

## ✅ 정리: AI에서 NumPy의 역할

| 용도 | NumPy 코드 | 설명 |
|-----|-----------|------|
| 데이터 로딩 | \\\`np.load('data.npy')\\\` | 전처리된 데이터 |
| 가중치 초기화 | \\\`np.random.randn()\\\` | 신경망 초기 가중치 |
| 정규화 | \\\`(x - mean) / std\\\` | 데이터 스케일링 |
| 배치 처리 | \\\`data[i:i+batch_size]\\\` | 미니배치 추출 |
| 형상 변환 | \\\`x.reshape(-1)\\\` | 신경망 입력 형태 맞추기 |

---

## 💬 잊어버렸다면?

AI에게 이렇게 물어보세요:

- "NumPy 배열 생성 방법 알려줘"
- "NumPy reshape 사용법"
- "PyTorch 텐서를 NumPy로 변환하는 방법"
- "배열 브로드캐스팅 설명해줘"

**NumPy 문법은 잊어도 됩니다. "AI 데이터는 다차원 배열(텐서)"라는 것만 기억하세요!**
        \`
      }`;

content = content.substring(0, lessonStartIdx) + newLesson + content.substring(lessonEndIdx);

fs.writeFileSync(curriculumPath, content);
console.log('✅ Lesson 0-5 content successfully updated!');
