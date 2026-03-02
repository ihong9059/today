const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '../src/data/curriculum.ts');
let content = fs.readFileSync(curriculumPath, 'utf8');

// Find the start and end of lesson 0-2
const startMarker = 'id: "0-2",';
// Handle both LF and CRLF line endings
let endMarker = '      },\r\n      {\r\n        id: "0-3",';
if (content.indexOf(endMarker) === -1) {
  endMarker = '      },\n      {\n        id: "0-3",';
}

const startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
  console.log('❌ Could not find lesson 0-2 start');
  process.exit(1);
}

// Find the opening brace before id: "0-2"
let braceIdx = content.lastIndexOf('{', startIdx);
const lessonStartIdx = braceIdx;

// Find the end of this lesson (before id: "0-3")
const endIdx = content.indexOf(endMarker);
if (endIdx === -1) {
  console.log('❌ Could not find lesson 0-2 end');
  process.exit(1);
}

const lessonEndIdx = endIdx + '      },'.length;

// The new lesson content
const newLesson = `{
        id: "0-2",
        title: "변수와 자료형",
        description: "AI 학습을 위한 Python 자료형 - 벡터, 행렬, 모델 설정까지",
        duration: "40분",
        videoUrl: "",
        content: \`
# 변수와 자료형 - AI를 위한 기초

## 🎯 학습 목표
- Python의 기본 자료형을 **이해**한다 (외우지 말고!)
- AI에서 자료형이 어떻게 활용되는지 파악한다
- 리스트와 딕셔너리가 AI에서 왜 중요한지 이해한다
- 잊어버리면 AI에게 물어보는 습관을 들인다

## 💡 핵심 메시지
> **"외우지 마세요. 이해하세요!"**
>
> AI 내부에서는 모든 것이 숫자로 처리됩니다.
> 이미지, 텍스트, 소리 모두 숫자로 변환됩니다.
> 그래서 자료형을 알아야 합니다!

---

## 📦 기본 자료형

### 1. 숫자 자료형 (int, float)
AI에서 가장 기본이 되는 자료형입니다.

\\\`\\\`\\\`python
# 정수 (int) - 학습 횟수, 데이터 개수 등
epochs = 100          # 학습 반복 횟수
batch_size = 32       # 배치 크기

# 실수 (float) - 가중치, 학습률, 손실값 등
learning_rate = 0.001  # 학습률
loss = 0.0234         # 손실값
accuracy = 0.9567     # 정확도 (95.67%)
\\\`\\\`\\\`

**🤖 AI에서의 활용:**
- 신경망의 가중치(weight)는 모두 float
- 학습률(learning rate)도 float
- 손실값(loss), 정확도(accuracy) 모두 숫자!

---

### 2. 문자열과 불리언 (str, bool)

\\\`\\\`\\\`python
# 문자열 (str) - 텍스트 데이터
text = "안녕하세요"
prompt = "이 이미지에 무엇이 있나요?"

# 불리언 (bool) - 참/거짓 판단
is_training = True    # 학습 모드
use_gpu = False       # GPU 사용 여부
\\\`\\\`\\\`

**🤖 AI에서의 활용:**
- 자연어 처리(NLP)에서 텍스트 입력
- 모델 설정의 on/off 스위치

---

### 3. 리스트 (list) - 가장 많이 사용! ⭐

리스트는 AI에서 **벡터**처럼 사용됩니다!

\\\`\\\`\\\`python
# 🎯 벡터로 활용 - 3차원 좌표
position = [3.0, 4.5, 2.1]  # x, y, z 좌표

# 🎨 RGB 픽셀 - 색상 표현
red_pixel = [255, 0, 0]     # 빨간색
green_pixel = [0, 255, 0]   # 초록색
blue_pixel = [0, 0, 255]    # 파란색
\\\`\\\`\\\`

#### 리스트 안에 리스트 = 행렬! 📐

\\\`\\\`\\\`python
# 2차원 배열 (행렬)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# 신경망 가중치 행렬
weights_matrix = [
    [0.1, 0.2, 0.3],
    [0.4, 0.5, 0.6]
]
\\\`\\\`\\\`

**🤖 AI에서의 활용:**
- 이미지 데이터: 128×128 흑백 이미지 = 128개 리스트 안에 128개 숫자
- 컬러 이미지: 128×128×3 (RGB 3채널)
- 신경망의 가중치 행렬

---

### 4. 딕셔너리 (dict) - 설정값 저장에 최적!

키(key)와 값(value) 쌍으로 데이터를 저장합니다.

\\\`\\\`\\\`python
# 🤖 AI 모델 설정 (하이퍼파라미터)
model_config = {
    "learning_rate": 0.001,
    "epochs": 100,
    "batch_size": 32,
    "optimizer": "adam",
    "loss_function": "cross_entropy"
}

# 학습 결과 저장
training_result = {
    "accuracy": 0.95,
    "loss": 0.0234,
    "training_time": 120.5
}

# 값 접근
print(model_config["learning_rate"])  # 0.001
print(training_result["accuracy"])     # 0.95
\\\`\\\`\\\`

**🤖 AI에서의 활용:**
- 모델 하이퍼파라미터 저장
- 학습 결과 기록
- 설정 파일 (JSON 형식과 유사)

---

## 🚀 NumPy - AI의 필수 도구

실제 AI에서는 리스트 대신 NumPy 배열을 사용합니다.

\\\`\\\`\\\`python
import numpy as np

# 리스트를 NumPy 배열로 변환
list_data = [[1, 2, 3], [4, 5, 6]]
numpy_array = np.array(list_data)

# NumPy의 장점: 훨씬 빠른 연산!
# 수백만 개의 숫자도 순식간에 계산
\\\`\\\`\\\`

---

## ✅ 정리: 외우지 말고 이해하기!

| 자료형 | AI에서의 역할 | 예시 |
|--------|--------------|------|
| int | 학습 횟수, 배치 크기 | epochs = 100 |
| float | 가중치, 학습률, 손실값 | lr = 0.001 |
| str | 텍스트 데이터, 프롬프트 | "Hello AI" |
| bool | 설정 on/off | use_gpu = True |
| list | **벡터, 행렬**, 이미지 데이터 | [255, 0, 0] |
| dict | **모델 설정**, 결과 저장 | {"lr": 0.001} |

---

## 💬 잊어버렸다면?

걱정하지 마세요! AI에게 물어보면 됩니다:

- "Python에서 리스트 만드는 방법 알려줘"
- "딕셔너리에서 값 가져오는 방법?"
- "NumPy 배열로 변환하는 코드 작성해줘"

**개념만 이해하면, 문법은 언제든 확인할 수 있습니다!**
        \`
      }`;

// Replace
content = content.substring(0, lessonStartIdx) + newLesson + content.substring(lessonEndIdx);

fs.writeFileSync(curriculumPath, content);
console.log('✅ Lesson 0-2 content successfully updated!');
console.log(`   - Start index: ${lessonStartIdx}`);
console.log(`   - End index: ${lessonEndIdx}`);
