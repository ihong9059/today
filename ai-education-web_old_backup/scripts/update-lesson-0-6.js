const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '../src/data/curriculum.ts');
let content = fs.readFileSync(curriculumPath, 'utf8');

const startMarker = 'id: "0-6",';
// 0-6는 Level 0의 마지막 레슨, 다음은 Level 1
let endMarker = '      }\r\n    ]\r\n  },\r\n  {\r\n    id: 1,';
if (content.indexOf(endMarker) === -1) {
  endMarker = '      }\n    ]\n  },\n  {\n    id: 1,';
}

const startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
  console.log('❌ Could not find lesson 0-6 start');
  process.exit(1);
}

let braceIdx = content.lastIndexOf('{', startIdx);
const lessonStartIdx = braceIdx;

const endIdx = content.indexOf(endMarker);
if (endIdx === -1) {
  console.log('❌ Could not find lesson 0-6 end');
  process.exit(1);
}

const lessonEndIdx = endIdx + '      }'.length;

const newLesson = `{
        id: "0-6",
        title: "Matplotlib 기초",
        description: "AI 학습 과정 시각화 - 손실 곡선, 정확도, 데이터 분포 확인",
        duration: "40분",
        videoUrl: "",
        content: \`
# Matplotlib 기초 - AI 학습 시각화

## 🎯 학습 목표
- 학습 곡선(Loss, Accuracy)을 시각화할 수 있다
- 데이터 분포를 확인하는 방법을 안다
- 모델 예측 결과를 시각화할 수 있다
- 디버깅을 위한 시각화 활용법을 익힌다

## 💡 핵심 메시지
> **"시각화 = AI 디버깅의 핵심"**
>
> 모델이 학습되고 있는지, 과적합인지, 데이터가 이상한지...
> 숫자만 봐서는 알기 어렵습니다. 그래프로 보면 한눈에!

---

## 📈 1. 학습 곡선 (Training Curves)

### 가장 기본적인 AI 시각화

\\\`\\\`\\\`python
import matplotlib.pyplot as plt

# 학습 기록 (예시)
epochs = range(1, 101)
train_loss = [0.9, 0.7, 0.5, 0.3, ...]  # 100개 값
val_loss = [0.95, 0.75, 0.55, 0.4, ...]

# 손실 곡선 그리기
plt.figure(figsize=(10, 4))
plt.plot(epochs, train_loss, label='Train Loss', color='blue')
plt.plot(epochs, val_loss, label='Val Loss', color='orange')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.title('Training Progress')
plt.legend()
plt.grid(True)
plt.show()
\\\`\\\`\\\`

### 실제 PyTorch 학습 후 시각화

\\\`\\\`\\\`python
# 학습 중 기록
history = {'train_loss': [], 'val_loss': [], 'accuracy': []}

for epoch in range(100):
    t_loss = train_one_epoch()
    v_loss, acc = validate()

    history['train_loss'].append(t_loss)
    history['val_loss'].append(v_loss)
    history['accuracy'].append(acc)

# 학습 후 시각화
fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# 손실 그래프
axes[0].plot(history['train_loss'], label='Train')
axes[0].plot(history['val_loss'], label='Validation')
axes[0].set_title('Loss Curve')
axes[0].legend()

# 정확도 그래프
axes[1].plot(history['accuracy'])
axes[1].set_title('Accuracy')
axes[1].set_ylim(0, 1)

plt.tight_layout()
plt.show()
\\\`\\\`\\\`

---

## 🔍 2. 과적합 감지

### 그래프로 과적합 판단하기

\\\`\\\`\\\`python
# 정상 학습
# - Train Loss ↓, Val Loss ↓

# 과적합 신호!
# - Train Loss ↓↓, Val Loss ↑

plt.figure(figsize=(10, 4))
plt.subplot(1, 2, 1)
plt.plot(train_loss, label='Train')
plt.plot(val_loss, label='Val')
plt.title('정상 학습: 둘 다 감소')

plt.subplot(1, 2, 2)
plt.plot(train_loss_overfit, label='Train')
plt.plot(val_loss_overfit, label='Val')
plt.axvline(x=30, color='r', linestyle='--', label='과적합 시작')
plt.title('과적합: Val Loss 증가!')
plt.legend()
plt.show()
\\\`\\\`\\\`

---

## 📊 3. 데이터 분포 확인

### 히스토그램으로 데이터 분포 보기

\\\`\\\`\\\`python
import numpy as np

# 데이터 분포 확인
data = np.random.randn(10000) * 2 + 5  # 평균 5, 표준편차 2

plt.figure(figsize=(10, 4))

plt.subplot(1, 2, 1)
plt.hist(data, bins=50, edgecolor='black')
plt.title('데이터 분포')
plt.xlabel('Value')

# 정규화 후
normalized = (data - data.mean()) / data.std()
plt.subplot(1, 2, 2)
plt.hist(normalized, bins=50, edgecolor='black')
plt.title('정규화 후 (평균=0, 표준편차=1)')
plt.xlabel('Value')

plt.tight_layout()
plt.show()
\\\`\\\`\\\`

### 클래스별 분포 (불균형 데이터 확인)

\\\`\\\`\\\`python
# 클래스 분포
classes = ['고양이', '강아지', '새', '물고기']
counts = [5000, 4500, 1000, 500]  # 불균형!

plt.bar(classes, counts, color=['blue', 'orange', 'green', 'red'])
plt.title('클래스 분포 (불균형 주의!)')
plt.ylabel('샘플 수')

# 불균형 데이터 → 오버샘플링/언더샘플링 필요
plt.show()
\\\`\\\`\\\`

---

## 🖼️ 4. 이미지 데이터 시각화

### 배치 이미지 확인

\\\`\\\`\\\`python
# 이미지 배치 (32, 28, 28)
images = np.random.randn(32, 28, 28)
labels = np.random.randint(0, 10, 32)

# 처음 16장 표시
fig, axes = plt.subplots(4, 4, figsize=(8, 8))
for i, ax in enumerate(axes.flat):
    ax.imshow(images[i], cmap='gray')
    ax.set_title(f'Label: {labels[i]}')
    ax.axis('off')

plt.tight_layout()
plt.show()
\\\`\\\`\\\`

### 데이터 증강 결과 확인

\\\`\\\`\\\`python
from torchvision import transforms

transform = transforms.Compose([
    transforms.RandomRotation(30),
    transforms.RandomHorizontalFlip(),
    transforms.ColorJitter(brightness=0.2),
])

# 원본과 증강된 이미지 비교
fig, axes = plt.subplots(2, 5, figsize=(12, 5))
for i in range(5):
    axes[0, i].imshow(original_image)
    axes[0, i].set_title('Original')
    axes[1, i].imshow(transform(original_image))
    axes[1, i].set_title('Augmented')

plt.show()
\\\`\\\`\\\`

---

## 🎯 5. 예측 결과 시각화

### 혼동 행렬 (Confusion Matrix)

\\\`\\\`\\\`python
from sklearn.metrics import confusion_matrix
import seaborn as sns

# 예측 결과
y_true = [0, 1, 2, 0, 1, 2, 0, 1, 2]
y_pred = [0, 1, 1, 0, 2, 2, 0, 1, 2]

cm = confusion_matrix(y_true, y_pred)

plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=['고양이', '강아지', '새'],
            yticklabels=['고양이', '강아지', '새'])
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.show()
\\\`\\\`\\\`

---

## 📉 6. 학습률 스케줄 시각화

\\\`\\\`\\\`python
# 학습률 스케줄 시각화
epochs = range(100)
lr_constant = [0.01] * 100
lr_step = [0.01 * (0.1 ** (e // 30)) for e in epochs]
lr_cosine = [0.01 * (1 + np.cos(np.pi * e / 100)) / 2 for e in epochs]

plt.figure(figsize=(10, 4))
plt.plot(epochs, lr_constant, label='Constant')
plt.plot(epochs, lr_step, label='Step Decay')
plt.plot(epochs, lr_cosine, label='Cosine Annealing')
plt.xlabel('Epoch')
plt.ylabel('Learning Rate')
plt.title('Learning Rate Schedules')
plt.legend()
plt.yscale('log')
plt.show()
\\\`\\\`\\\`

---

## ✅ 정리: AI 시각화 체크리스트

| 언제 | 무엇을 | 왜 |
|-----|-------|-----|
| 학습 중 | Loss/Accuracy 곡선 | 학습 진행 확인 |
| 학습 중 | Val Loss 추세 | 과적합 감지 |
| 데이터 준비 | 히스토그램 | 분포 확인 |
| 데이터 준비 | 클래스 분포 | 불균형 확인 |
| 학습 후 | Confusion Matrix | 오분류 패턴 확인 |
| 디버깅 | 샘플 이미지 | 전처리 검증 |

---

## 💬 잊어버렸다면?

AI에게 이렇게 물어보세요:

- "Matplotlib으로 loss 그래프 그리는 코드"
- "confusion matrix 시각화 방법"
- "서브플롯 여러 개 그리기"
- "이미지 배열 시각화하는 방법"

**Matplotlib 문법은 잊어도 됩니다. "시각화로 학습을 모니터링한다"는 것만 기억하세요!**
        \`
      }`;

content = content.substring(0, lessonStartIdx) + newLesson + content.substring(lessonEndIdx);

fs.writeFileSync(curriculumPath, content);
console.log('✅ Lesson 0-6 content successfully updated!');
