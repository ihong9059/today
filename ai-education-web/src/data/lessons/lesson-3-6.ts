export const lesson3_6_content = `
# 배치 정규화와 드롭아웃 (Batch Normalization & Dropout)

## 학습 목표
이 레슨을 완료하면:
- 배치 정규화가 왜 필요한지, 어떻게 동작하는지 이해합니다
- 내부 공변량 변화(Internal Covariate Shift)의 개념을 압니다
- 드롭아웃이 어떻게 과적합을 방지하는지 이해합니다
- 훈련 시와 추론 시 동작의 차이를 설명할 수 있습니다
- NumPy로 배치 정규화와 드롭아웃을 직접 구현할 수 있습니다

---

## 핵심 메시지
> **"배치 정규화는 각 층의 입력을 안정화시키고, 드롭아웃은 뉴런의 의존성을 깨뜨립니다."**
> 이 두 기법은 현대 딥러닝에서 거의 빠짐없이 사용되는 핵심 도구입니다.

---

## 1. 배치 정규화 - 매 체크포인트에서 저울을 재설정하라

> **비유**: 마라톤 대회를 상상해보세요. 각 체크포인트에서 러너의 페이스를 확인하고 조절해주는 코치가 있다고 합시다. 너무 빠르면 "천천히!", 너무 느리면 "빨리!" 이렇게 매 체크포인트마다 페이스를 일정한 범위로 맞춰줍니다.
>
> 배치 정규화도 마찬가지입니다. 신경망의 **각 층 출력값**이 너무 크거나 작아지지 않도록 매 층마다 값의 범위를 조절해줍니다.

### 내부 공변량 변화 (Internal Covariate Shift)

신경망에서 앞쪽 층의 가중치가 업데이트되면, 뒤쪽 층이 받는 입력의 분포가 매번 바뀝니다. 이것을 **내부 공변량 변화**라고 합니다.

| 상황 | 문제 | 결과 |
|------|------|------|
| 훈련 초기 | 앞쪽 층 가중치가 크게 변함 | 뒤쪽 층 입력 분포가 급격히 변동 |
| 훈련 중반 | 층마다 입력 분포가 계속 바뀜 | 학습이 느려지고 불안정해짐 |
| 배치 정규화 적용 후 | 매 층에서 분포를 안정화 | 빠르고 안정적인 학습 가능 |

### 배치 정규화의 공식

**배치 정규화 4단계:**

**Step 1.** 배치 평균 계산 ($m$ = 배치 크기)

$$\mu_B = \frac{1}{m} \sum_{i=1}^{m} x_i$$

**Step 2.** 배치 분산 계산

$$\sigma_B^2 = \frac{1}{m} \sum_{i=1}^{m} (x_i - \mu_B)^2$$

**Step 3.** 정규화 (평균=0, 분산=1로 만들기)

$$\hat{x}_i = \frac{x_i - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}}$$

($\epsilon$은 0으로 나누는 것을 방지, 보통 $10^{-5}$)

**Step 4.** 스케일 & 시프트 (학습 가능한 파라미터!)

$$y_i = \gamma \hat{x}_i + \beta$$

($\gamma$와 $\beta$는 역전파로 학습됨)

Step 4가 중요합니다. 정규화만 하면 표현력이 줄어들 수 있기 때문에, 네트워크가 필요하다면 원래 분포로 되돌릴 수 있게 $\gamma$와 $\beta$를 학습합니다.

### 🔬 실습: 배치 정규화 구현

배치 정규화가 값의 분포를 어떻게 안정화시키는지 직접 확인해봅시다.

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# ═══════════════════════════════════════════════════════════════
# 📊 배치 정규화(Batch Normalization) 직접 구현
# 목표: 각 특성의 값을 평균=0, 표준편차=1로 정규화
# ═══════════════════════════════════════════════════════════════

np.random.seed(42)

def batch_norm_forward(x, gamma, beta, epsilon=1e-5):
    """
    배치 정규화 순전파
    ─────────────────────────────────────────
    x: 입력 (batch_size × features)
    gamma: 스케일 파라미터 (학습 가능)
    beta: 시프트 파라미터 (학습 가능)
    ─────────────────────────────────────────
    """
    # Step 1️⃣: 배치 평균 계산
    mu = np.mean(x, axis=0)

    # Step 2️⃣: 배치 분산 계산
    var = np.var(x, axis=0)

    # Step 3️⃣: 정규화 (평균=0, 분산=1)
    x_hat = (x - mu) / np.sqrt(var + epsilon)

    # Step 4️⃣: 스케일 & 시프트
    out = gamma * x_hat + beta

    return out, x_hat, mu, var

# ─────────────────────────────────────────────────────────────────
# 📌 시뮬레이션: 신경망 은닉층의 출력값
# ─────────────────────────────────────────────────────────────────
batch_size = 64  # 배치 크기
features = 4      # 특성 수

# 🎯 문제 상황: 각 특성마다 완전히 다른 범위의 값!
raw_values = np.random.randn(batch_size, features)
raw_values[:, 0] = raw_values[:, 0] * 10 + 50    # 특성1: 평균~50, 범위 큼
raw_values[:, 1] = raw_values[:, 1] * 0.01 - 2   # 특성2: 평균~-2, 범위 작음
raw_values[:, 2] = raw_values[:, 2] * 100 + 0    # 특성3: 평균~0, 범위 매우 큼
raw_values[:, 3] = raw_values[:, 3] * 5 + 20     # 특성4: 평균~20, 범위 중간

# ✅ 배치 정규화 적용
gamma = np.ones(features)   # 초기 스케일 = 1
beta = np.zeros(features)   # 초기 시프트 = 0
normalized, x_hat, mu, var = batch_norm_forward(raw_values, gamma, beta)

# ─────────────────────────────────────────────────────────────────
# 📈 시각화: 정규화 전후 비교
# ─────────────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 왼쪽: 정규화 전
axes[0].boxplot([raw_values[:, i] for i in range(features)],
                labels=["Feat1\\n(mean~50)", "Feat2\\n(mean~-2)", "Feat3\\n(mean~0)", "Feat4\\n(mean~20)"])
axes[0].set_title("Before Batch Norm: Different ranges!", fontsize=13, fontweight='bold')
axes[0].set_ylabel("Value", fontsize=12)
axes[0].axhline(y=0, color="red", linestyle="--", alpha=0.5, label="Baseline (0)")
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# 오른쪽: 정규화 후
axes[1].boxplot([normalized[:, i] for i in range(features)],
                labels=["Feat1", "Feat2", "Feat3", "Feat4"])
axes[1].set_title("After Batch Norm: Uniform range!", fontsize=13, fontweight='bold')
axes[1].set_ylabel("Value", fontsize=12)
axes[1].axhline(y=0, color="green", linestyle="--", alpha=0.7, label="Mean = 0")
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# ─────────────────────────────────────────────────────────────────
# 📊 결과 출력
# ─────────────────────────────────────────────────────────────────
print("=" * 55)
print("📊 배치 정규화 효과 비교")
print("=" * 55)
print("\\n❌ 정규화 전:")
for i in range(features):
    print(f"   특성 {i+1}: 평균={np.mean(raw_values[:, i]):>8.2f}, 표준편차={np.std(raw_values[:, i]):>8.2f}")

print("\\n✅ 정규화 후:")
for i in range(features):
    print(f"   특성 {i+1}: 평균={np.mean(normalized[:, i]):>8.4f}, 표준편차={np.std(normalized[:, i]):>8.4f}")

print("\\n💡 모든 특성이 평균≈0, 표준편차≈1로 정규화되었습니다!")
print()
print("모든 특성이 평균=0, 표준편차=1 근처로 정규화되었습니다!")
\`\`\`

### 배치 정규화의 효과

| 효과 | 설명 |
|------|------|
| 학습 속도 향상 | 더 큰 학습률 사용 가능 |
| 초기화에 덜 민감 | 가중치 초기값이 나빠도 잘 학습됨 |
| 정규화 효과 | 약간의 과적합 방지 효과 |
| 기울기 흐름 개선 | 기울기 소실/폭발 문제 완화 |

---

## 2. 훈련 vs 추론에서의 배치 정규화

배치 정규화는 훈련과 추론에서 다르게 동작합니다.

| 단계 | 평균/분산 계산 방식 | 이유 |
|------|---------------------|------|
| 훈련 시 | 현재 미니배치의 평균/분산 | 배치마다 다른 통계로 노이즈 효과 |
| 추론 시 | 훈련 중 누적된 이동 평균/분산 | 단일 샘플도 일관되게 처리 |

**훈련 중 이동 평균 업데이트:**

$$\mu_{running} = \text{momentum} \cdot \mu_{running} + (1 - \text{momentum}) \cdot \mu_B$$

$$\sigma^2_{running} = \text{momentum} \cdot \sigma^2_{running} + (1 - \text{momentum}) \cdot \sigma^2_B$$

**추론 시:**

$$\hat{x} = \frac{x - \mu_{running}}{\sqrt{\sigma^2_{running} + \epsilon}}$$

$$y = \gamma \hat{x} + \beta$$

---

## 3. 드롭아웃 - 랜덤으로 결석시키기

> **비유**: 축구팀 훈련을 상상해보세요. 매 연습 경기마다 **무작위로 몇 명의 선수를 빼고** 훈련합니다.
>
> - 에이스가 없는 날: 다른 선수들이 창의성을 키움
> - 수비수가 빠진 날: 나머지 수비수들이 더 넓은 범위를 커버
>
> 결과적으로 **모든 선수가 자립적으로 플레이**할 수 있게 되고, 특정 선수에 의존하지 않는 강한 팀이 됩니다.
>
> 드롭아웃도 매 훈련 스텝마다 무작위로 뉴런을 꺼서 **특정 뉴런에 의존하지 않는** 강건한 네트워크를 만듭니다.

### 드롭아웃의 작동 원리

**훈련 시:**
1. 각 뉴런을 확률 $p$로 끔 (보통 $p=0.5$ 또는 $p=0.2$)
2. 살아남은 뉴런의 출력을 $\frac{1}{1-p}$로 스케일링 (이것을 "inverted dropout"이라 합니다)

**추론 시:**
1. 모든 뉴런을 켬 (드롭아웃 없음)
2. 스케일링 없음 (훈련 시 이미 보정했으므로)

### 왜 $\frac{1}{1-p}$로 스케일링할까?

훈련 중에 뉴런의 절반을 끄면 출력의 기대값이 절반으로 줄어듭니다. 추론 시에는 모든 뉴런이 켜져 있으므로 출력이 두 배가 됩니다. 이 불일치를 맞추기 위해 훈련 시 살아남은 뉴런의 값을 키워줍니다.

### 🔬 실습: 드롭아웃 구현과 앙상블 효과

드롭아웃이 어떻게 뉴런을 무작위로 끄고, 앙상블 효과를 만드는지 확인해봅시다.

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# ═══════════════════════════════════════════════════════════════
# 📊 드롭아웃(Dropout) 직접 구현
# 매 학습마다 무작위로 뉴런을 꺼서 과적합 방지
# ═══════════════════════════════════════════════════════════════

np.random.seed(42)

def dropout_forward(x, drop_rate=0.5, training=True):
    """
    드롭아웃 순전파 (Inverted Dropout 방식)
    ─────────────────────────────────────────
    x: 입력 (뉴런 출력값)
    drop_rate: 끌 확률 (0.5 = 50% 끔)
    training: 훈련 모드 여부
    ─────────────────────────────────────────
    """
    if not training:
        return x, None  # 추론 시에는 그냥 통과!

    # 🎲 무작위 마스크 생성 (1=켜기, 0=끄기)
    mask = np.random.binomial(1, 1 - drop_rate, size=x.shape)

    # 📐 출력 = 입력 × 마스크 × 스케일 조정
    # 스케일: 1/(1-p) 로 나눠서 기대값 유지
    out = x * mask / (1 - drop_rate)
    return out, mask

# ─────────────────────────────────────────────────────────────────
# 📌 예시: 8개 뉴런의 출력값
# ─────────────────────────────────────────────────────────────────
x = np.array([0.5, 1.2, -0.3, 0.8, -1.5, 0.7, 0.2, -0.9])

print("=" * 60)
print("📌 원본 뉴런 출력")
print("=" * 60)
print(f"   값: {x}")
print(f"   합계: {np.sum(x):.2f}")

# ─────────────────────────────────────────────────────────────────
# 🎲 드롭아웃 적용 (3회 시행)
# ─────────────────────────────────────────────────────────────────
print("\\n🎲 드롭아웃 적용 (drop_rate=0.5, 즉 50% 끔)")
print("-" * 60)
for trial in range(3):
    np.random.seed(trial)
    dropped, mask = dropout_forward(x, drop_rate=0.5, training=True)
    active = int(np.sum(mask))
    print(f"   시행 {trial+1}:")
    print(f"      마스크  = {mask.astype(int)} (1=켜짐, 0=꺼짐)")
    print(f"      활성 뉴런 = {active}개 / 8개")
    print(f"      출력 합계 = {np.sum(dropped):.2f}")
    print()

# ─────────────────────────────────────────────────────────────────
# 📈 앙상블 효과 시각화 (1000번 시행)
# ─────────────────────────────────────────────────────────────────
n_trials = 1000
sums_with_dropout = []
for _ in range(n_trials):
    dropped, _ = dropout_forward(x, drop_rate=0.5, training=True)
    sums_with_dropout.append(np.sum(dropped))

fig, ax = plt.subplots(figsize=(12, 5))
ax.hist(sums_with_dropout, bins=30, alpha=0.7, color="steelblue", edgecolor="white",
        label="Dropout output sum distribution")
ax.axvline(x=np.sum(x), color="red", linewidth=3, linestyle="--",
           label=f"Original sum: {np.sum(x):.2f}")
ax.axvline(x=np.mean(sums_with_dropout), color="green", linewidth=3, linestyle="--",
           label=f"Dropout mean: {np.mean(sums_with_dropout):.2f}")
ax.set_xlabel("Output Sum", fontsize=12)
ax.set_ylabel("Frequency", fontsize=12)
ax.set_title("Dropout Ensemble Effect: Mean matches original after 1000 trials", fontsize=14, fontweight='bold')
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

print("=" * 60)
print("📊 결과 분석")
print("=" * 60)
print(f"   🎲 드롭아웃 1000회 평균: {np.mean(sums_with_dropout):.3f}")
print(f"   🔴 원본 합계: {np.sum(x):.3f}")
print("-" * 60)
print("   💡 Inverted Dropout 덕분에 평균이 원본과 거의 같습니다!")
print("   → 추론 시 별도 스케일링 없이 바로 사용 가능!")
\`\`\`

---

## 4. 드롭아웃의 효과: 과적합 방지 실험

### 실행해보기: 드롭아웃 유무 비교

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

# 원형 패턴 분류 데이터
n_samples = 200
noise = 0.25

t0 = np.random.uniform(0, 2 * np.pi, n_samples // 2)
r0 = np.random.normal(1.0, noise, n_samples // 2)
X0 = np.column_stack([r0 * np.cos(t0), r0 * np.sin(t0)])

t1 = np.random.uniform(0, 2 * np.pi, n_samples // 2)
r1 = np.random.normal(2.5, noise, n_samples // 2)
X1 = np.column_stack([r1 * np.cos(t1), r1 * np.sin(t1)])

X = np.vstack([X0, X1])
y = np.hstack([np.zeros(n_samples // 2), np.ones(n_samples // 2)])

idx = np.random.permutation(n_samples)
n_train = 140
X_train, X_val = X[idx[:n_train]], X[idx[n_train:]]
y_train, y_val = y[idx[:n_train]], y[idx[n_train:]]

def sigmoid(z):
    return 1 / (1 + np.exp(-np.clip(z, -500, 500)))

def train_network(X_tr, y_tr, X_v, y_v, hidden=32, epochs=300, lr=0.05, drop_rate=0.0):
    n_in = X_tr.shape[1]
    W1 = np.random.randn(n_in, hidden) * np.sqrt(2.0 / n_in)
    b1 = np.zeros(hidden)
    W2 = np.random.randn(hidden, 1) * np.sqrt(2.0 / hidden)
    b2 = np.zeros(1)

    train_losses, val_losses = [], []

    for epoch in range(epochs):
        z1 = X_tr @ W1 + b1
        h1 = np.maximum(0, z1)

        if drop_rate > 0:
            mask = np.random.binomial(1, 1 - drop_rate, size=h1.shape)
            h1_dropped = h1 * mask / (1 - drop_rate)
        else:
            h1_dropped = h1

        z2 = h1_dropped @ W2 + b2
        y_pred = sigmoid(z2).flatten()

        eps = 1e-7
        loss = -np.mean(y_tr * np.log(y_pred + eps) + (1 - y_tr) * np.log(1 - y_pred + eps))
        train_losses.append(loss)

        h1_v = np.maximum(0, X_v @ W1 + b1)
        y_pred_v = sigmoid(h1_v @ W2 + b2).flatten()
        val_loss = -np.mean(y_v * np.log(y_pred_v + eps) + (1 - y_v) * np.log(1 - y_pred_v + eps))
        val_losses.append(val_loss)

        dz2 = (y_pred - y_tr).reshape(-1, 1) / len(y_tr)
        dW2 = h1_dropped.T @ dz2
        db2 = np.sum(dz2, axis=0)
        dh1 = dz2 @ W2.T
        if drop_rate > 0:
            dh1 = dh1 * mask / (1 - drop_rate)
        dz1 = dh1 * (z1 > 0)
        dW1 = X_tr.T @ dz1
        db1 = np.sum(dz1, axis=0)

        W1 -= lr * dW1
        b1 -= lr * db1
        W2 -= lr * dW2
        b2 -= lr * db2

    return train_losses, val_losses

losses_no_drop = train_network(X_train, y_train, X_val, y_val, drop_rate=0.0)
losses_with_drop = train_network(X_train, y_train, X_val, y_val, drop_rate=0.4)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

axes[0].plot(losses_no_drop[0], "b-", alpha=0.7, label="Train Loss")
axes[0].plot(losses_no_drop[1], "r-", alpha=0.7, label="Val Loss")
axes[0].set_xlabel("Epoch")
axes[0].set_ylabel("Loss")
axes[0].set_title("Without Dropout", fontsize=13)
axes[0].legend(fontsize=11)
axes[0].set_ylim(0, 1.5)

axes[1].plot(losses_with_drop[0], "b-", alpha=0.7, label="Train Loss")
axes[1].plot(losses_with_drop[1], "r-", alpha=0.7, label="Val Loss")
axes[1].set_xlabel("Epoch")
axes[1].set_ylabel("Loss")
axes[1].set_title("With Dropout (rate=0.4)", fontsize=13)
axes[1].legend(fontsize=11)
axes[1].set_ylim(0, 1.5)

plt.tight_layout()
plt.savefig("dropout_comparison.png", dpi=100, bbox_inches="tight")
plt.show()

gap_no = losses_no_drop[1][-1] - losses_no_drop[0][-1]
gap_dr = losses_with_drop[1][-1] - losses_with_drop[0][-1]
print(f"드롭아웃 없음 - 훈련-검증 갭: {gap_no:.4f}")
print(f"드롭아웃 적용 - 훈련-검증 갭: {gap_dr:.4f}")
print("드롭아웃이 훈련-검증 갭을 줄여 과적합을 방지합니다!")
\`\`\`

---

## 5. 언제 무엇을 사용할까?

### 배치 정규화 vs 드롭아웃 결정 가이드

| 기준 | 배치 정규화 | 드롭아웃 |
|------|-----------|---------|
| 주 목적 | 학습 안정화 및 가속 | 과적합 방지 |
| 적용 위치 | 선형 변환 후, 활성화 전(또는 후) | 활성화 함수 후 |
| CNN에서 | 거의 필수 | 주로 FC 층에서 사용 |
| RNN에서 | Layer Norm이 더 적합 | 층 사이에 적용 |
| 배치 크기 작을 때 | 불안정할 수 있음 | 문제없음 |
| 추론 시 | 이동 평균/분산 사용 | 비활성화 (모든 뉴런 ON) |
| 함께 사용 | 가능 (BN 먼저, Dropout 나중) | 가능 |

### 일반적인 권장 사항

| 네트워크 종류 | 권장 구성 |
|--------------|----------|
| CNN (이미지) | Conv → BatchNorm → ReLU → (Dropout은 FC층에서만) |
| MLP (일반) | Linear → BatchNorm → ReLU → Dropout |
| Transformer | LayerNorm + Dropout (BatchNorm 대신 LayerNorm) |

---

## 6. 현대적 정규화 기법들

배치 정규화 이후 다양한 변형이 등장했습니다:

| 기법 | 정규화 대상 | 장점 | 주 사용처 |
|------|-----------|------|----------|
| Batch Norm | 배치 차원 | 가장 보편적, 학습 가속 | CNN |
| Layer Norm | 특성 차원 | 배치 크기에 무관 | Transformer, RNN |
| Instance Norm | 각 샘플의 각 채널 | 스타일 정보 제거 | 스타일 변환 |
| Group Norm | 채널을 그룹으로 | 작은 배치에서도 안정적 | 객체 탐지 |

시각적으로 보면 ($N$=배치, $C$=채널, $H,W$=공간):

| 정규화 방식 | 정규화 축 | 설명 |
|------------|----------|------|
| Batch Norm | $N$ 축 | 각 채널별로 배치 전체에서 정규화 |
| Layer Norm | $C,H,W$ 축 | 각 샘플별로 모든 특성에서 정규화 |
| Instance Norm | $H,W$ 축 | 각 샘플, 각 채널별로 정규화 |
| Group Norm | 그룹 내 $C,H,W$ | 채널을 그룹으로 나누어 정규화 |

> **트렌드**: 최근 Transformer 기반 모델(GPT, BERT 등)에서는 **Layer Norm**이 표준입니다. 배치 크기에 의존하지 않아 더 유연하기 때문입니다.

---

## 핵심 요약

| 개념 | 핵심 내용 | 기억할 포인트 |
|------|-----------|--------------|
| 배치 정규화 | 각 층 출력을 평균 0, 분산 1로 정규화 | $\gamma$, $\beta$로 표현력 유지 |
| 내부 공변량 변화 | 앞 층이 바뀌면 뒤 층 입력 분포 변함 | BN이 이 문제를 완화 |
| 드롭아웃 | 훈련 시 뉴런을 무작위로 끔 | 추론 시에는 모든 뉴런 ON |
| Inverted Dropout | 훈련 시 $\frac{1}{1-p}$로 스케일링 | 추론 시 별도 처리 불필요 |
| 훈련 vs 추론 | BN과 Dropout 모두 동작이 다름 | model.train() vs model.eval() |
| Layer Norm | Transformer의 표준 정규화 | 배치 크기에 무관 |

---

## 학습 체크리스트
- [ ] 배치 정규화의 4단계 공식을 이해한다
- [ ] 내부 공변량 변화가 무엇인지 설명할 수 있다
- [ ] 드롭아웃이 과적합을 방지하는 원리를 이해한다
- [ ] 훈련 시와 추론 시의 동작 차이를 안다
- [ ] 배치 정규화와 드롭아웃을 언제 사용하는지 판단할 수 있다
- [ ] Layer Norm과 Batch Norm의 차이를 안다

## 다음 강의 예고
**"하이퍼파라미터 튜닝"** - 학습률, 배치 크기, 네트워크 구조의 최적화 전략을 배웁니다!
`;
