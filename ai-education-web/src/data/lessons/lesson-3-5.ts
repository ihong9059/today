export const lesson3_5_content = `
# 과적합과 정규화 (Overfitting & Regularization)

## 학습 목표
이 레슨을 완료하면:
- 과적합이 무엇이고 왜 발생하는지 이해합니다
- 훈련 손실과 검증 손실의 차이를 해석할 수 있습니다
- L1/L2 정규화의 원리와 차이를 설명할 수 있습니다
- 조기 종료(Early Stopping)를 구현할 수 있습니다
- 데이터 증강의 개념을 이해합니다

---

## 핵심 메시지
> **"훈련 데이터를 잘 맞추는 것보다, 처음 보는 데이터를 잘 맞추는 것이 진짜 실력입니다."**
> 과적합은 딥러닝에서 가장 흔하고 중요한 문제입니다. 정규화는 이를 해결하는 핵심 도구입니다.

---

## 1. 과적합이란? - 벼락치기 학생의 비유

> **비유**: 시험 준비를 하는 두 학생을 상상해보세요.
>
> - **학생 A (과적합)**: 기출문제의 답을 통째로 외웁니다. "3번 문제 답은 42!" 기출문제 시험을 보면 100점이지만, 새로운 문제가 나오면 멘붕합니다.
> - **학생 B (적절한 학습)**: 문제 풀이 원리를 이해합니다. 기출에서는 95점이지만, 새로운 문제도 90점을 받습니다.
>
> 딥러닝 모델도 마찬가지입니다. **훈련 데이터를 외워버리면** 새로운 데이터에서 성능이 떨어집니다.

### 과적합의 정의

| 용어 | 의미 | 비유 |
|------|------|------|
| 과적합 (Overfitting) | 훈련 데이터에 너무 맞춰진 상태 | 기출문제만 달달 외운 학생 |
| 과소적합 (Underfitting) | 훈련 데이터도 제대로 학습 못한 상태 | 공부를 아예 안 한 학생 |
| 적절한 적합 (Good Fit) | 훈련과 새 데이터 모두 잘 맞추는 상태 | 원리를 이해한 학생 |

### 핵심 신호: 훈련 손실 vs 검증 손실

과적합을 감지하는 가장 확실한 방법은 **훈련 손실(Training Loss)**과 **검증 손실(Validation Loss)**을 비교하는 것입니다.

- **정상**: 둘 다 함께 줄어듦
- **과적합 시작**: 훈련 손실은 줄어들지만, 검증 손실은 올라가기 시작
- **심한 과적합**: 훈련 손실은 거의 0인데, 검증 손실은 계속 증가

---

## 2. 과적합을 눈으로 확인하기

다항식 회귀로 과적합이 어떻게 생기는지 직접 확인해봅시다.

### 🔬 실습: 다항식 차수에 따른 과적합

모델 복잡도(다항식 차수)가 과적합에 어떤 영향을 주는지 확인해봅시다.

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# ═══════════════════════════════════════════════════════════════
# 📊 과적합 시각화: 모델 복잡도의 영향
# 같은 데이터에 1차, 4차, 14차 다항식을 적합시켜 비교
# ═══════════════════════════════════════════════════════════════

np.random.seed(42)

# 📌 데이터 준비
x_train = np.linspace(0, 2 * np.pi, 15)  # 훈련 데이터 (15개 점)
y_train = np.sin(x_train) + np.random.normal(0, 0.2, len(x_train))  # 노이즈 포함

x_test = np.linspace(0, 2 * np.pi, 100)  # 테스트용 (촘촘한 점)
y_true = np.sin(x_test)                   # 실제 함수 (sin)

# 📐 세 가지 복잡도로 실험
degrees = [1, 4, 14]
titles = ["Underfitting (deg=1)", "Good Fit (deg=4)", "Overfitting (deg=14)"]

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

for i, deg in enumerate(degrees):
    # 다항식 피팅
    coeffs = np.polyfit(x_train, y_train, deg)
    y_pred = np.polyval(coeffs, x_test)
    y_train_pred = np.polyval(coeffs, x_train)

    # 오차 계산
    train_error = np.mean((y_train - y_train_pred) ** 2)
    test_error = np.mean((y_true - y_pred) ** 2)

    # 그래프 그리기
    axes[i].scatter(x_train, y_train, color="blue", s=80, label="Train data", zorder=5)
    axes[i].plot(x_test, y_true, "g--", linewidth=2, label="True function (sin)", alpha=0.7)
    axes[i].plot(x_test, y_pred, "r-", label=f"Polynomial (deg={deg})", linewidth=2)
    axes[i].set_title(titles[i], fontsize=14, fontweight='bold')
    axes[i].set_ylim(-2.5, 2.5)
    axes[i].legend(fontsize=9, loc='upper right')
    axes[i].grid(True, alpha=0.3)

    # 오차 표시
    axes[i].text(0.3, -1.8, f"Train error: {train_error:.3f}", fontsize=11,
                 bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
    axes[i].text(0.3, -2.2, f"Test error: {test_error:.3f}", fontsize=11,
                 bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

plt.tight_layout()
plt.show()

print("=" * 60)
print("🔍 결과 해석:")
print("-" * 60)
print("❌ 왼쪽 (1차): 너무 단순해서 패턴을 못 잡음 → 과소적합")
print("✅ 가운데 (4차): 적절하게 패턴을 포착 → Good Fit!")
print("❌ 오른쪽 (14차): 노이즈까지 외워버림 → 과적합")
print("=" * 60)
\`\`\`

> 핵심 관찰: 14차 다항식은 훈련 데이터를 거의 완벽하게 지나가지만, 데이터 사이에서 크게 흔들립니다. 이것이 **과적합**입니다.

---

## 3. 과적합이 발생하는 조건

| 원인 | 설명 | 비유 |
|------|------|------|
| 모델이 너무 복잡함 | 파라미터 수 > 데이터 수 | 3개 점에 100차 다항식 |
| 훈련 데이터가 너무 적음 | 배울 패턴이 부족 | 문제 3개로 시험 전체 준비 |
| 훈련을 너무 오래 함 | 노이즈까지 학습 | 실수까지 외움 |
| 노이즈가 많은 데이터 | 의미 없는 패턴 학습 | 찍어서 맞춘 답도 외움 |

---

## 4. L1 정규화 (Lasso) - 쓸모없는 것을 버려라

> **비유**: 여행 가방 싸기를 생각하세요. L1 정규화는 "안 쓸 물건은 아예 빼라!"라고 말하는 것과 같습니다. 가방에는 꼭 필요한 물건만 남습니다.

### L1 정규화의 원리

L1 정규화된 손실 함수:

$$L_{L1} = L_{원래} + \lambda \sum_{i=1}^{n} |w_i|$$

여기서 $\lambda$(람다)는 정규화 강도를 조절하는 하이퍼파라미터입니다:
- $\lambda$가 크면: 더 많은 가중치가 0이 됨 (더 단순한 모델)
- $\lambda$가 작으면: 원래 손실에 가까움 (덜 제약)

L1 정규화는 많은 가중치를 **정확히 0으로** 만들어 불필요한 특성을 자동 제거합니다. 이것을 **특성 선택(Feature Selection)** 효과라고 합니다.

---

## 5. L2 정규화 (Ridge / Weight Decay) - 극단을 피해라

> **비유**: L2 정규화는 "모든 물건을 가져가되, 각각 조금씩만!"이라고 말하는 것과 같습니다. 어떤 하나에 올인하지 않고 골고루 분산합니다.

L2 정규화된 손실 함수:

$$L_{L2} = L_{원래} + \lambda \sum_{i=1}^{n} w_i^2$$

효과: 가중치가 너무 크게 자라지 못하도록 억제
- 큰 가중치에 더 큰 벌칙 (제곱이니까)
- 가중치가 0에 가까워지지만, 정확히 0이 되지는 않음

### L1 vs L2 비교

| 특성 | L1 (Lasso) | L2 (Ridge) |
|------|-----------|-----------|
| 벌칙 항 | $\sum \|w_i\|$ (절대값의 합) | $\sum w_i^2$ (제곱의 합) |
| 효과 | 가중치를 0으로 만듦 | 가중치를 작게 만듦 |
| 특성 선택 | 불필요한 특성 자동 제거 | 모든 특성 유지 |
| 딥러닝에서 | 덜 사용됨 | 매우 많이 사용됨 (Weight Decay) |

### 🔬 실습: 정규화 효과 비교

L2 정규화가 과적합을 어떻게 방지하는지 직접 확인해봅시다.

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# ═══════════════════════════════════════════════════════════════
# 📊 정규화(Regularization) 효과 비교
# 같은 10차 다항식에서 정규화 유무에 따른 차이
# ═══════════════════════════════════════════════════════════════

np.random.seed(42)

# 📌 데이터 준비
n_train = 12
x_train = np.sort(np.random.uniform(0, 1, n_train))
y_train = np.sin(2 * np.pi * x_train) + np.random.normal(0, 0.3, n_train)
x_test = np.linspace(0, 1, 200)
y_true = np.sin(2 * np.pi * x_test)

degree = 10  # 10차 다항식 (과적합 유발)

# 📐 다항식 특성 생성 함수
def make_poly_features(x, deg):
    """x, x², x³, ... x^deg 특성 생성"""
    return np.column_stack([x ** i for i in range(deg + 1)])

X_train = make_poly_features(x_train, degree)
X_test = make_poly_features(x_test, degree)

# ─────────────────────────────────────────────────────────────────
# ❌ 방법 1: 정규화 없음 (과적합 발생!)
# ─────────────────────────────────────────────────────────────────
w_no_reg = np.linalg.lstsq(X_train, y_train, rcond=None)[0]

# ─────────────────────────────────────────────────────────────────
# ✅ 방법 2: L2 정규화 적용 (과적합 방지)
# 손실 = 원래손실 + λ × (가중치 제곱합)
# ─────────────────────────────────────────────────────────────────
lambda_l2 = 0.01  # 정규화 강도
XtX = X_train.T @ X_train
XtY = X_train.T @ y_train
I = np.eye(degree + 1)
I[0, 0] = 0  # 편향(b)은 정규화 안 함
w_l2 = np.linalg.solve(XtX + lambda_l2 * I, XtY)

# 예측
y_no_reg = X_test @ w_no_reg
y_l2_pred = X_test @ w_l2

# ─────────────────────────────────────────────────────────────────
# 📈 시각화
# ─────────────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 왼쪽: 정규화 없음
axes[0].scatter(x_train, y_train, color="blue", s=80, zorder=5, label="Train data")
axes[0].plot(x_test, y_true, "g--", linewidth=2, alpha=0.7, label="True function")
axes[0].plot(x_test, y_no_reg, "r-", linewidth=2, label="Polynomial (deg=10)")
axes[0].set_ylim(-2.5, 2.5)
axes[0].set_title("No Regularization -> Overfitting!", fontsize=14, fontweight='bold')
axes[0].legend(fontsize=10)
axes[0].grid(True, alpha=0.3)

# 오른쪽: L2 정규화
axes[1].scatter(x_train, y_train, color="blue", s=80, zorder=5, label="Train data")
axes[1].plot(x_test, y_true, "g--", linewidth=2, alpha=0.7, label="True function")
axes[1].plot(x_test, y_l2_pred, "purple", linewidth=2, label="L2 Regularized")
axes[1].set_ylim(-2.5, 2.5)
axes[1].set_title("L2 Regularization -> Smooth curve!", fontsize=14, fontweight='bold')
axes[1].legend(fontsize=10)
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# 결과 출력
print("=" * 55)
print("📊 가중치 크기 비교")
print("=" * 55)
print(f"❌ 정규화 없음 - 최대 가중치: {np.max(np.abs(w_no_reg)):>12.1f}")
print(f"✅ L2 정규화  - 최대 가중치: {np.max(np.abs(w_l2)):>12.1f}")
print("-" * 55)
print("💡 L2 정규화가 가중치를 작게 유지하여 부드러운 곡선을 만듭니다!")
\`\`\`

---

## 6. 조기 종료 (Early Stopping) - 멈출 때를 아는 지혜

> **비유**: 요리할 때 "조금만 더..." 하다가 태워본 적 있나요? 딥러닝도 **적절한 시점에 멈추는 것**이 중요합니다.

### 조기 종료의 원리

1. 매 에폭(epoch)마다 검증 손실을 확인
2. 검증 손실이 더 이상 줄어들지 않으면 훈련 중단
3. "인내심(patience)": 몇 에폭 동안 개선이 없으면 멈출지 설정

### 실행해보기: 조기 종료 시뮬레이션

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

epochs = 200
train_loss = []
val_loss = []

for e in range(epochs):
    t_loss = 2.0 * np.exp(-0.03 * e) + 0.05 + np.random.normal(0, 0.02)
    train_loss.append(max(t_loss, 0.05))
    v_loss = 2.0 * np.exp(-0.025 * e) + 0.15 + 0.003 * max(0, e - 60) + np.random.normal(0, 0.03)
    val_loss.append(max(v_loss, 0.15))

train_loss = np.array(train_loss)
val_loss = np.array(val_loss)

patience = 15
best_val_loss = float("inf")
best_epoch = 0
wait = 0
early_stop_epoch = epochs

for e in range(epochs):
    if val_loss[e] < best_val_loss:
        best_val_loss = val_loss[e]
        best_epoch = e
        wait = 0
    else:
        wait += 1
        if wait >= patience:
            early_stop_epoch = e
            break

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

axes[0].plot(train_loss, "b-", alpha=0.7, label="Train Loss")
axes[0].plot(val_loss, "r-", alpha=0.7, label="Val Loss")
axes[0].set_xlabel("Epoch")
axes[0].set_ylabel("Loss")
axes[0].set_title("Without Early Stopping (200 epochs)")
axes[0].legend(fontsize=11)
axes[0].set_ylim(0, 2.5)

axes[1].plot(range(early_stop_epoch + 1), train_loss[:early_stop_epoch + 1], "b-", alpha=0.7, label="Train Loss")
axes[1].plot(range(early_stop_epoch + 1), val_loss[:early_stop_epoch + 1], "r-", alpha=0.7, label="Val Loss")
axes[1].axvline(x=best_epoch, color="green", linestyle="--", linewidth=2, label=f"Best (epoch {best_epoch})")
axes[1].axvline(x=early_stop_epoch, color="orange", linestyle="--", linewidth=2, label=f"Stop (epoch {early_stop_epoch})")
axes[1].set_xlabel("Epoch")
axes[1].set_ylabel("Loss")
axes[1].set_title("With Early Stopping")
axes[1].legend(fontsize=10)
axes[1].set_ylim(0, 2.5)

plt.tight_layout()
plt.savefig("early_stopping.png", dpi=100, bbox_inches="tight")
plt.show()
print(f"최적 에폭: {best_epoch}, Early Stopping 에폭: {early_stop_epoch}")
print("Early Stopping이 과적합을 방지해줍니다!")
\`\`\`

---

## 7. 데이터 증강 (Data Augmentation)

> **비유**: 시험 문제가 5개뿐인데, 각 문제를 약간씩 변형해서 50개로 만드는 것과 같습니다.

| 변환 | 설명 | 효과 |
|------|------|------|
| 좌우 반전 | 이미지를 좌우로 뒤집기 | 방향에 무관한 인식 |
| 회전 | 약간의 각도로 회전 | 기울어진 경우도 인식 |
| 크롭 | 일부분을 잘라내기 | 위치에 무관한 인식 |
| 밝기/대비 조절 | 밝기나 대비 변경 | 조명에 무관한 인식 |
| 노이즈 추가 | 약간의 랜덤 노이즈 | 노이즈에 강건한 모델 |

데이터 증강은 **실질적으로 훈련 데이터의 양을 늘리는 효과**가 있습니다.

---

## 8. 실전 팁: 과적합 방지 체크리스트

| 순서 | 방법 | 난이도 | 효과 |
|------|------|--------|------|
| 1 | 더 많은 데이터 수집 | 높음 | 가장 효과적 |
| 2 | 데이터 증강 | 낮음 | 이미지에서 매우 효과적 |
| 3 | Early Stopping | 낮음 | 거의 항상 사용 |
| 4 | L2 정규화 (Weight Decay) | 낮음 | 기본적으로 사용 |
| 5 | Dropout (다음 레슨) | 낮음 | 매우 효과적 |
| 6 | 모델 크기 줄이기 | 중간 | 모델 설계 변경 필요 |
| 7 | 배치 정규화 (다음 레슨) | 낮음 | 간접적 정규화 효과 |

> **실전에서는** 보통 Early Stopping + L2 정규화 + Dropout + 데이터 증강을 함께 사용합니다.

---

## 핵심 요약

| 개념 | 핵심 내용 | 기억할 포인트 |
|------|-----------|--------------|
| 과적합 | 훈련 데이터를 외워버리는 현상 | 검증 손실이 올라가면 신호 |
| 과소적합 | 모델이 너무 단순 | 훈련 손실도 높으면 의심 |
| L1 정규화 | 가중치 절대값 합에 벌칙 | 불필요한 특성을 0으로 |
| L2 정규화 | 가중치 제곱 합에 벌칙 | 딥러닝 기본 |
| 조기 종료 | 검증 손실이 안 줄면 중단 | patience로 조절 |
| 데이터 증강 | 데이터를 변형하여 양 늘림 | 이미지에서 특히 효과적 |

---

## 학습 체크리스트
- [ ] 과적합과 과소적합의 차이를 설명할 수 있다
- [ ] 훈련 손실 vs 검증 손실 그래프를 해석할 수 있다
- [ ] L1과 L2 정규화의 차이를 이해한다
- [ ] 조기 종료의 원리와 patience 파라미터를 안다
- [ ] 데이터 증강의 개념을 이해한다

## 다음 강의 예고
**"배치 정규화와 드롭아웃"** - 신경망 내부에서 정규화를 수행하는 두 가지 핵심 기법을 배웁니다!
`;
