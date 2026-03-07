export const lesson0_6_content = `
# Matplotlib 기초 - AI의 눈

## 📚 학습 목표
이 레슨을 완료하면:
- 시각화가 AI 개발에서 왜 필수적인지 설명할 수 있습니다
- plt.plot으로 기본 선 그래프를 그릴 수 있습니다
- AI 학습 곡선(Loss Curve)의 4가지 패턴을 구분할 수 있습니다
- 산점도, 막대그래프, 히스토그램의 AI 활용 사례를 이해합니다
- subplot으로 여러 그래프를 한 화면에 배치할 수 있습니다
- Level 0에서 배운 모든 도구를 결합하여 AI 학습 과정을 시뮬레이션할 수 있습니다

---

## 🎯 핵심 메시지

> **"보지 않으면 알 수 없다 - 시각화는 AI 개발자의 필수 도구"**
> 숫자만으로는 AI가 잘 배우고 있는지 알 수 없습니다. 그래프로 봐야 문제가 보입니다!

---

## 📖 1. 왜 시각화가 AI에 필수인가?

> **비유**: 의사가 환자의 혈압 수치를 그래프로 보듯, AI 개발자도 학습 상태를 그래프로 봅니다. 숫자 나열만으로는 환자가 위험한지, AI가 잘 배우고 있는지 알 수 없습니다!

\`\`\`
시각화 없이 AI 개발 = 계기판 없이 비행기 조종 ✈️

  숫자만 보면:
    loss: 0.542, 0.538, 0.535, 0.534, 0.534, 0.534...
    → "줄어들고 있나? 멈춘 건가? 문제 있나?"

  그래프로 보면:
    📉 ↘ ↘ → → →
    → "아! 학습이 정체됐구나! 학습률을 조정해야겠다!"

실제 현업에서 시각화하는 것들:
  • 학습 곡선 (Loss Curve) - 학습이 잘 되고 있는가?
  • 데이터 분포 - 데이터가 한쪽에 치우쳐 있진 않은가?
  • 모델 성능 비교 - 어떤 모델이 가장 좋은가?
  • 가중치 분포 - 신경망 내부가 건강한가?
\`\`\`

### 실행해보기: 숫자 vs 그래프
\`\`\`python
import matplotlib.pyplot as plt

# 숫자로만 보기
losses = [2.5, 2.1, 1.8, 1.5, 1.2, 0.9, 0.7, 0.5, 0.4, 0.35]

print("📊 숫자로만 보면:")
for i, loss in enumerate(losses):
    print(f"  Epoch {i+1}: loss = {loss}")

print("\\n→ 줄어들고 있긴 한데... 얼마나 빨리? 어디서 느려지는지?")
print("→ 그래프로 보면 한눈에 파악 가능합니다!")

# 그래프로 보기
plt.figure(figsize=(8, 4))
plt.plot(range(1, 11), losses, 'b-o', linewidth=2, markersize=6)
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.title('AI Training Loss Curve')
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

---

## 📖 2. 기본 그래프 그리기 (plt.plot)

> **비유**: 도화지(figure)에 선을 긋는 것과 같습니다. x축과 y축을 정하고, 점을 찍어 선으로 연결하면 그래프 완성!

### 실행해보기: 첫 번째 그래프
\`\`\`python
import matplotlib.pyplot as plt

# 기본 선 그래프
epochs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
train_acc = [0.45, 0.58, 0.67, 0.74, 0.80, 0.85, 0.88, 0.91, 0.93, 0.95]
val_acc =   [0.42, 0.55, 0.63, 0.70, 0.75, 0.78, 0.79, 0.80, 0.80, 0.80]

plt.figure(figsize=(8, 5))

# 두 개의 선 그리기
plt.plot(epochs, train_acc, 'b-o', label='Train Accuracy', linewidth=2)
plt.plot(epochs, val_acc, 'r--s', label='Validation Accuracy', linewidth=2)

# 그래프 꾸미기
plt.xlabel('Epoch', fontsize=12)
plt.ylabel('Accuracy', fontsize=12)
plt.title('Model Accuracy Over Training', fontsize=14)
plt.legend(fontsize=11)
plt.grid(True, alpha=0.3)
plt.ylim(0, 1.05)

plt.tight_layout()
plt.show()

print("📌 그래프 구성 요소:")
print("  plt.plot()   - 선 그리기")
print("  plt.xlabel()  - x축 이름")
print("  plt.ylabel()  - y축 이름")
print("  plt.title()   - 그래프 제목")
print("  plt.legend()  - 범례 (어떤 선이 어떤 데이터인지)")
print("  plt.grid()    - 격자선")
\`\`\`

---

## 📖 3. AI 학습 곡선 (Loss Curve) - 가장 중요!

> **비유**: AI의 체온표 = Loss 곡선. 열(loss)이 내려가야 건강(학습 성공)! 열이 안 내려가거나 다시 오르면 문제가 있는 것입니다.

\`\`\`
Loss 곡선을 보면 알 수 있는 것들:
  ✅ 학습이 잘 되고 있는가?
  ⚠️ 과적합(overfitting)이 발생했는가?
  🔧 학습률(learning rate)이 적절한가?
  🛑 언제 학습을 멈춰야 하는가?
\`\`\`

### 실행해보기: 4가지 학습 패턴 시각화
\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
epochs = np.arange(1, 51)

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 패턴 1: 정상 학습
train_loss_1 = 2.5 * np.exp(-0.08 * epochs) + 0.1 + np.random.normal(0, 0.02, 50)
val_loss_1 = 2.5 * np.exp(-0.07 * epochs) + 0.15 + np.random.normal(0, 0.03, 50)
axes[0, 0].plot(epochs, train_loss_1, 'b-', label='Train Loss', linewidth=2)
axes[0, 0].plot(epochs, val_loss_1, 'r-', label='Val Loss', linewidth=2)
axes[0, 0].set_title('1. Normal Training', fontsize=13, fontweight='bold', color='green')
axes[0, 0].legend()
axes[0, 0].grid(True, alpha=0.3)
axes[0, 0].set_ylim(0, 3)

# 패턴 2: 과적합 (Overfitting)
train_loss_2 = 2.5 * np.exp(-0.12 * epochs) + 0.05 + np.random.normal(0, 0.02, 50)
val_loss_2 = 2.5 * np.exp(-0.08 * epochs) + 0.15 + np.random.normal(0, 0.03, 50)
val_loss_2[20:] = val_loss_2[20:] + np.linspace(0, 1.0, 30)
axes[0, 1].plot(epochs, train_loss_2, 'b-', label='Train Loss', linewidth=2)
axes[0, 1].plot(epochs, val_loss_2, 'r-', label='Val Loss', linewidth=2)
axes[0, 1].set_title('2. Overfitting!', fontsize=13, fontweight='bold', color='red')
axes[0, 1].legend()
axes[0, 1].grid(True, alpha=0.3)
axes[0, 1].set_ylim(0, 3)

# 패턴 3: 학습률 너무 높음
train_loss_3 = 2.0 + 0.5 * np.sin(epochs * 0.5) + np.random.normal(0, 0.15, 50)
val_loss_3 = train_loss_3 + np.random.normal(0, 0.2, 50)
axes[1, 0].plot(epochs, train_loss_3, 'b-', label='Train Loss', linewidth=2)
axes[1, 0].plot(epochs, val_loss_3, 'r-', label='Val Loss', linewidth=2)
axes[1, 0].set_title('3. LR Too High', fontsize=13, fontweight='bold', color='orange')
axes[1, 0].legend()
axes[1, 0].grid(True, alpha=0.3)
axes[1, 0].set_ylim(0, 3.5)

# 패턴 4: 학습률 너무 낮음
train_loss_4 = 2.5 - 0.015 * epochs + np.random.normal(0, 0.02, 50)
val_loss_4 = train_loss_4 + 0.1 + np.random.normal(0, 0.03, 50)
axes[1, 1].plot(epochs, train_loss_4, 'b-', label='Train Loss', linewidth=2)
axes[1, 1].plot(epochs, val_loss_4, 'r-', label='Val Loss', linewidth=2)
axes[1, 1].set_title('4. LR Too Low', fontsize=13, fontweight='bold', color='purple')
axes[1, 1].legend()
axes[1, 1].grid(True, alpha=0.3)
axes[1, 1].set_ylim(0, 3)

for ax in axes.flat:
    ax.set_xlabel('Epoch')
    ax.set_ylabel('Loss')

plt.suptitle('AI Loss Curve 4 Patterns', fontsize=15, fontweight='bold', y=1.01)
plt.tight_layout()
plt.show()

print("📌 4가지 패턴 해석:")
print("  1. 정상: Train/Val 모두 감소, 간격 일정 → 이상적!")
print("  2. 과적합: Train은 감소, Val은 다시 증가 → 데이터 부족 or 모델 너무 복잡")
print("  3. LR 높음: Loss가 요동침 → 학습률을 낮춰야 함")
print("  4. LR 낮음: Loss가 아주 천천히 감소 → 학습률을 높여야 함")
\`\`\`

---

## 📖 4. 다양한 그래프와 AI 활용

> **비유**: 요리사가 재료마다 다른 칼을 쓰듯, AI 개발자도 상황에 따라 다른 그래프를 씁니다. 분포를 볼 땐 산점도, 비교할 땐 막대그래프, 분포 형태를 볼 땐 히스토그램!

### 실행해보기: 산점도 (Scatter Plot) - 데이터 분포 확인
\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)

# 2개의 클러스터 데이터 생성 (AI 분류 문제 시뮬레이션)
cluster1_x = np.random.normal(3, 0.8, 50)
cluster1_y = np.random.normal(3, 0.8, 50)
cluster2_x = np.random.normal(7, 0.8, 50)
cluster2_y = np.random.normal(7, 0.8, 50)

plt.figure(figsize=(7, 6))
plt.scatter(cluster1_x, cluster1_y, c='blue', label='Class A', alpha=0.6, s=50)
plt.scatter(cluster2_x, cluster2_y, c='red', label='Class B', alpha=0.6, s=50)
plt.xlabel('Feature 1', fontsize=12)
plt.ylabel('Feature 2', fontsize=12)
plt.title('Data Distribution - Two Classes', fontsize=14)
plt.legend(fontsize=11)
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

print("📌 산점도(Scatter)의 AI 활용:")
print("  • 데이터가 잘 분리되어 있는지 확인")
print("  • 클러스터(군집) 발견")
print("  • 이상치(outlier) 탐지")
print("  • 두 특성 간 관계 파악")
\`\`\`

### 실행해보기: 막대그래프 (Bar Chart) - 모델 성능 비교
\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

models = ['Linear', 'Decision\\nTree', 'Random\\nForest', 'Neural\\nNet', 'CNN']
accuracy = [0.72, 0.81, 0.88, 0.91, 0.95]
colors = ['#ff9999', '#ffcc99', '#99ccff', '#99ff99', '#66ff66']

plt.figure(figsize=(8, 5))
bars = plt.bar(models, accuracy, color=colors, edgecolor='gray', linewidth=1.2)

# 막대 위에 수치 표시
for bar, acc in zip(bars, accuracy):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.01,
             f'{acc:.0%}', ha='center', fontsize=12, fontweight='bold')

plt.ylabel('Accuracy', fontsize=12)
plt.title('Model Performance Comparison', fontsize=14)
plt.ylim(0, 1.1)
plt.grid(axis='y', alpha=0.3)
plt.tight_layout()
plt.show()

print("📌 막대그래프(Bar)의 AI 활용:")
print("  • 여러 모델의 성능 비교")
print("  • 클래스별 정확도 비교")
print("  • 하이퍼파라미터 실험 결과 비교")
\`\`\`

### 실행해보기: 히스토그램 (Histogram) - 분포 확인
\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)

# 신경망 가중치 분포 시뮬레이션
weights_before = np.random.randn(1000) * 2
weights_after = np.random.randn(1000) * 0.5

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

ax1.hist(weights_before, bins=30, color='salmon', edgecolor='black', alpha=0.7)
ax1.set_title('Before Training: Wide Distribution', fontsize=12, fontweight='bold')
ax1.set_xlabel('Weight Value')
ax1.set_ylabel('Count')
ax1.axvline(x=0, color='black', linestyle='--', alpha=0.5)

ax2.hist(weights_after, bins=30, color='skyblue', edgecolor='black', alpha=0.7)
ax2.set_title('After Training: Narrow Distribution', fontsize=12, fontweight='bold')
ax2.set_xlabel('Weight Value')
ax2.set_ylabel('Count')
ax2.axvline(x=0, color='black', linestyle='--', alpha=0.5)

plt.suptitle('Neural Network Weight Distribution', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

print("📌 히스토그램(Hist)의 AI 활용:")
print("  • 가중치 분포 확인 (너무 크거나 작으면 문제)")
print("  • 입력 데이터 분포 확인 (정규분포인지?)")
print("  • 예측값 분포 확인 (편향되어 있진 않은지?)")
\`\`\`

---

## 📖 5. subplot으로 여러 그래프 한번에 보기

> **비유**: 자동차 계기판처럼 속도, 연료, 엔진 온도를 한 화면에 보듯이, AI 학습도 Loss, Accuracy, Learning Rate를 한 화면에 봅니다!

### 실행해보기: AI 학습 대시보드
\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
epochs = np.arange(1, 31)

# 시뮬레이션 데이터
loss = 2.0 * np.exp(-0.1 * epochs) + 0.15 + np.random.normal(0, 0.02, 30)
accuracy = 1 - 0.8 * np.exp(-0.12 * epochs) + np.random.normal(0, 0.01, 30)
accuracy = np.clip(accuracy, 0, 1)
lr = 0.01 * (0.95 ** epochs)

fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(15, 4))

# Loss
ax1.plot(epochs, loss, 'r-', linewidth=2)
ax1.set_title('Loss', fontsize=13, fontweight='bold')
ax1.set_xlabel('Epoch')
ax1.set_ylabel('Loss')
ax1.grid(True, alpha=0.3)

# Accuracy
ax2.plot(epochs, accuracy * 100, 'g-', linewidth=2)
ax2.set_title('Accuracy', fontsize=13, fontweight='bold')
ax2.set_xlabel('Epoch')
ax2.set_ylabel('Accuracy (%)')
ax2.grid(True, alpha=0.3)

# Learning Rate
ax3.plot(epochs, lr, 'm-', linewidth=2)
ax3.set_title('Learning Rate', fontsize=13, fontweight='bold')
ax3.set_xlabel('Epoch')
ax3.set_ylabel('LR')
ax3.grid(True, alpha=0.3)

plt.suptitle('AI Training Dashboard', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()

print("📌 subplot 사용법:")
print("  fig, (ax1, ax2, ax3) = plt.subplots(1, 3)  # 1행 3열")
print("  fig, axes = plt.subplots(2, 2)              # 2행 2열")
print("  각 ax에 개별 그래프를 그립니다!")
\`\`\`

---

## 🏆 Level 0 완료! 종합 예제

> 지금까지 Level 0에서 배운 모든 것을 활용합니다: **변수, 반복문, 함수, NumPy, Matplotlib**

### 실행해보기: AI 학습 전체 과정 시뮬레이션
\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)

# === 함수 정의 (Lesson 0-4) ===
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def compute_loss(predictions, targets):
    """MSE 손실 함수"""
    return np.mean((predictions - targets) ** 2)

def compute_accuracy(predictions, targets):
    """정확도 계산"""
    pred_labels = (predictions > 0.5).astype(int)
    return np.mean(pred_labels == targets)

# === 데이터 생성 (NumPy, Lesson 0-5) ===
num_samples = 200
X = np.random.randn(num_samples)
y = (X > 0).astype(int)

# === AI 학습 시뮬레이션 (변수, 반복문, Lesson 0-2, 0-3) ===
weight = np.random.randn() * 0.5
bias = 0.0
learning_rate = 0.5
num_epochs = 40

# 기록 저장
train_losses = []
train_accuracies = []
weights_history = []

print("🚀 AI 학습 시작!")
print("=" * 50)

for epoch in range(1, num_epochs + 1):
    # 순전파
    z = X * weight + bias
    predictions = sigmoid(z)

    # 손실 계산
    loss = compute_loss(predictions, y)
    acc = compute_accuracy(predictions, y)

    # 기록 저장
    train_losses.append(loss)
    train_accuracies.append(acc * 100)
    weights_history.append(weight)

    # 경사하강법 (간소화)
    error = predictions - y
    weight -= learning_rate * np.mean(error * X)
    bias -= learning_rate * np.mean(error)

    if epoch % 10 == 0 or epoch == 1:
        print(f"  Epoch {epoch:3d} | Loss: {loss:.4f} | Accuracy: {acc*100:.1f}%")

print("=" * 50)
print(f"\\n최종 결과: Loss = {train_losses[-1]:.4f}, Accuracy = {train_accuracies[-1]:.1f}%")

# === 시각화 (Matplotlib, 이번 레슨!) ===
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
ep = np.arange(1, num_epochs + 1)

# 1. Loss Curve
axes[0, 0].plot(ep, train_losses, 'r-', linewidth=2)
axes[0, 0].set_title('Training Loss', fontsize=13, fontweight='bold')
axes[0, 0].set_xlabel('Epoch')
axes[0, 0].set_ylabel('Loss')
axes[0, 0].grid(True, alpha=0.3)

# 2. Accuracy Curve
axes[0, 1].plot(ep, train_accuracies, 'g-', linewidth=2)
axes[0, 1].set_title('Training Accuracy', fontsize=13, fontweight='bold')
axes[0, 1].set_xlabel('Epoch')
axes[0, 1].set_ylabel('Accuracy (%)')
axes[0, 1].set_ylim(0, 105)
axes[0, 1].grid(True, alpha=0.3)

# 3. Weight Change
axes[1, 0].plot(ep, weights_history, 'b-', linewidth=2)
axes[1, 0].set_title('Weight Value Over Time', fontsize=13, fontweight='bold')
axes[1, 0].set_xlabel('Epoch')
axes[1, 0].set_ylabel('Weight')
axes[1, 0].grid(True, alpha=0.3)

# 4. Data & Decision Boundary
x_range = np.linspace(-3, 3, 100)
pred_curve = sigmoid(x_range * weight + bias)
axes[1, 1].scatter(X[y==0], y[y==0], c='blue', alpha=0.3, label='Class 0', s=30)
axes[1, 1].scatter(X[y==1], y[y==1], c='red', alpha=0.3, label='Class 1', s=30)
axes[1, 1].plot(x_range, pred_curve, 'k-', linewidth=2, label='AI Prediction')
axes[1, 1].set_title('Data & Model Prediction', fontsize=13, fontweight='bold')
axes[1, 1].set_xlabel('Input (X)')
axes[1, 1].set_ylabel('Prediction')
axes[1, 1].legend()
axes[1, 1].grid(True, alpha=0.3)

plt.suptitle('Complete AI Training Summary', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.show()

print("\\n🎉 Level 0 Python 기초 과정을 모두 완료했습니다!")
print("\\n📚 Level 0에서 배운 것들:")
print("  0-1: Python 환경 설정")
print("  0-2: 변수와 자료형 → AI의 데이터 저장")
print("  0-3: 조건문과 반복문 → AI의 학습 루프")
print("  0-4: 함수 → AI의 빌딩 블록")
print("  0-5: NumPy → AI의 수학 연산 엔진")
print("  0-6: Matplotlib → AI의 시각화 도구")
print("\\n→ 다음 Level 1에서 본격적인 AI 이론을 배웁니다!")
\`\`\`

---

## 💡 핵심 요약

| 그래프 종류 | 함수 | AI 활용 | 비유 |
|-------------|------|---------|------|
| **선 그래프** | plt.plot() | 학습 곡선, 손실/정확도 추이 | 체온 기록표 |
| **산점도** | plt.scatter() | 데이터 분포, 클러스터 발견 | 지도에 점 찍기 |
| **막대그래프** | plt.bar() | 모델 비교, 클래스별 성능 | 성적표 |
| **히스토그램** | plt.hist() | 가중치 분포, 데이터 분포 | 시험 점수 분포 |
| **서브플롯** | plt.subplots() | 여러 지표 한눈에 보기 | 자동차 계기판 |

| Loss 패턴 | 의미 | 해결법 |
|-----------|------|--------|
| **Train/Val 모두 감소** | 정상 학습 | 계속 진행! |
| **Train 감소, Val 증가** | 과적합 | 데이터 추가, 규제 적용 |
| **Loss 요동침** | 학습률 너무 높음 | 학습률 낮추기 |
| **Loss 아주 천천히 감소** | 학습률 너무 낮음 | 학습률 높이기 |

---

## ✅ 학습 체크리스트
- [ ] 시각화가 AI 개발에 필수인 이유를 설명할 수 있다
- [ ] plt.plot()으로 선 그래프를 그리고 xlabel, ylabel, title, legend를 추가할 수 있다
- [ ] Loss Curve의 4가지 패턴(정상, 과적합, LR높음, LR낮음)을 구분할 수 있다
- [ ] Train Loss와 Validation Loss의 차이를 이해한다
- [ ] 산점도, 막대그래프, 히스토그램이 AI에서 각각 어떤 용도인지 안다
- [ ] subplot으로 여러 그래프를 한 화면에 배치할 수 있다
- [ ] Level 0의 모든 도구(변수, 반복문, 함수, NumPy, Matplotlib)를 결합하여 사용할 수 있다

`;
