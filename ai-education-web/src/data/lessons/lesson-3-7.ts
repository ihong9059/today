export const lesson3_7_content = `
# 하이퍼파라미터 튜닝 (Hyperparameter Tuning)

## 학습 목표
이 레슨을 완료하면:
- 파라미터와 하이퍼파라미터의 차이를 명확히 구분합니다
- 학습률, 배치 크기, 에포크 등 핵심 하이퍼파라미터를 이해합니다
- 다양한 하이퍼파라미터 탐색 전략을 직접 구현할 수 있습니다

---

## 핵심 메시지
> **"하이퍼파라미터 튜닝은 악기 조율과 같습니다"**
> 기타 줄을 너무 세게 조이면 끊어지고, 너무 느슨하면 소리가 안 납니다.
> 딥러닝도 마찬가지입니다. 학습률이 너무 크면 발산하고, 너무 작으면 학습이 안 됩니다.
> 최적의 "소리"를 찾는 과정이 바로 하이퍼파라미터 튜닝입니다.

---

## 1. 파라미터 vs 하이퍼파라미터

요리에 비유해 봅시다. 레시피(하이퍼파라미터)는 요리사가 미리 정하는 것이고,
실제 맛(파라미터)은 요리 과정에서 만들어지는 것입니다.

> **비유**: 파라미터는 "요리 결과물의 맛", 하이퍼파라미터는 "레시피의 설정값"입니다.
> 불 세기(학습률), 조리 시간(에포크), 한 번에 볶는 양(배치 크기)을
> 요리사(여러분)가 직접 결정해야 합니다.

| 구분 | 파라미터 (Parameter) | 하이퍼파라미터 (Hyperparameter) |
|------|---------------------|-------------------------------|
| 정의 | 모델이 학습하는 값 | 사람이 미리 설정하는 값 |
| 예시 | 가중치(W), 편향(b) | 학습률, 배치 크기, 에포크 수 |
| 결정 주체 | 학습 알고리즘 | 개발자 (여러분!) |
| 개수 | 수천~수십억 개 | 보통 5~20개 |
| 변경 시점 | 매 학습 스텝마다 | 학습 시작 전에 설정 |
| 비유 | 요리의 맛 | 레시피의 불 세기, 시간 |

---

## 2. 핵심 하이퍼파라미터 5가지

딥러닝에서 가장 중요한 하이퍼파라미터를 정리하면 다음과 같습니다.

| 하이퍼파라미터 | 역할 | 일반적 범위 | 비유 |
|---------------|------|------------|------|
| 학습률 (Learning Rate) | 한 번에 얼마나 업데이트할지 | 0.0001 ~ 0.1 | 산을 내려가는 보폭 |
| 배치 크기 (Batch Size) | 한 번에 몇 개 데이터를 볼지 | 16 ~ 512 | 한 번에 채점하는 시험지 수 |
| 에포크 (Epochs) | 전체 데이터를 몇 번 반복할지 | 10 ~ 1000 | 교과서를 몇 번 읽을지 |
| 은닉층 수 (Depth) | 네트워크의 깊이 | 1 ~ 10 | 건물의 층수 |
| 은닉 유닛 수 (Width) | 각 층의 뉴런 수 | 32 ~ 1024 | 각 층의 방 개수 |

---

## 3. 학습률: 가장 중요한 하이퍼파라미터

학습률은 경사하강법에서 한 스텝의 크기를 결정합니다.
이것 하나만 잘못 설정해도 모델이 전혀 학습하지 못할 수 있습니다.

> **비유**: 산꼭대기에서 골짜기(최솟값)를 찾아 내려간다고 상상해 보세요.
> - 학습률이 너무 크면: 성큼성큼 걷다가 골짜기를 지나쳐 반대편 산으로 올라갑니다
> - 학습률이 너무 작으면: 아기 걸음으로 가니 해가 져도 산 중턱에 있습니다
> - 적절한 학습률: 적당한 보폭으로 효율적으로 골짜기에 도달합니다

### 실행해보기: 학습률에 따른 수렴 비교

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# 간단한 2차 함수: f(x) = x^2 (최솟값은 x=0)
def f(x):
    return x ** 2

def gradient(x):
    return 2 * x

# 다양한 학습률로 경사하강법 실행
learning_rates = [0.001, 0.1, 0.5, 0.9, 1.05]
labels = ["lr=0.001 (너무 작음)", "lr=0.1 (적당)", "lr=0.5 (적당-빠름)", "lr=0.9 (위험)", "lr=1.05 (발산!)"]
colors = ["blue", "green", "orange", "red", "purple"]

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

ax1 = axes[0]
for lr, label, color in zip(learning_rates, labels, colors):
    x = 5.0
    x_history = [x]
    for step in range(30):
        x = x - lr * gradient(x)
        x_history.append(x)
        if abs(x) > 100:
            break
    ax1.plot(x_history, label=label, color=color, linewidth=2)

ax1.set_xlabel("Step", fontsize=12)
ax1.set_ylabel("x value", fontsize=12)
ax1.set_title("Learning Rate vs x Position", fontsize=14)
ax1.legend(fontsize=9)
ax1.set_ylim(-10, 10)
ax1.axhline(y=0, color="black", linestyle="--", alpha=0.3)
ax1.grid(True, alpha=0.3)

ax2 = axes[1]
for lr, label, color in zip(learning_rates, labels, colors):
    x = 5.0
    loss_history = [f(x)]
    for step in range(30):
        x = x - lr * gradient(x)
        loss_history.append(f(x))
        if abs(x) > 100:
            break
    ax2.plot(loss_history, label=label, color=color, linewidth=2)

ax2.set_xlabel("Step", fontsize=12)
ax2.set_ylabel("Loss f(x) = x^2", fontsize=12)
ax2.set_title("Learning Rate vs Loss", fontsize=14)
ax2.legend(fontsize=9)
ax2.set_ylim(-1, 30)
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("learning_rate_comparison.png", dpi=100, bbox_inches="tight")
plt.show()
print("=== 학습률 실험 결과 ===")
print("lr=0.001: 너무 느려서 30스텝 후에도 목표에 멀리 있음")
print("lr=0.1:   안정적으로 빠르게 수렴")
print("lr=0.5:   빠르게 수렴하지만 진동이 조금 있음")
print("lr=0.9:   심하게 진동하면서 겨우 수렴")
print("lr=1.05:  발산! 점점 더 멀어짐")
\`\`\`

---

## 4. 배치 크기: 속도 vs 일반화의 균형

배치 크기는 한 번의 가중치 업데이트에 사용하는 데이터 샘플의 수입니다.

> **비유**: 시험 채점에 비유할 수 있습니다.
> - 배치 크기 1 (SGD): 시험지 한 장씩 채점하고 매번 기준을 조정 - 불안정하지만 다양한 관점
> - 배치 크기 전체 (Batch GD): 모든 시험지를 다 채점한 후 한 번에 기준 조정 - 안정적이지만 느림
> - 미니배치 (32~256): 적당히 묶어서 채점 - 실전에서 가장 많이 사용

| 배치 크기 | 장점 | 단점 | 비유 |
|-----------|------|------|------|
| 작은 (16~32) | 일반화 좋음, 메모리 적게 사용 | 학습 불안정, 느림 | 소규모 설문조사 |
| 중간 (64~256) | 균형 잡힘, 실전에서 인기 | 특별한 단점 없음 | 적절한 표본 조사 |
| 큰 (512~4096) | 학습 안정적, GPU 효율적 | 일반화 나빠질 수 있음, 메모리 많이 사용 | 전수 조사 |

### 실행해보기: 배치 크기에 따른 학습 경로 시각화

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

n_data = 200
X = np.random.randn(n_data, 1)
y_true = 3 * X + 2 + np.random.randn(n_data, 1) * 0.5

def train_with_batch_size(X, y, batch_size, lr=0.05, epochs=50):
    w = np.random.randn(1, 1) * 0.5
    b = np.zeros((1, 1))
    loss_history = []
    n = len(X)

    for epoch in range(epochs):
        indices = np.random.permutation(n)
        epoch_loss = 0
        n_batches = 0

        for start in range(0, n, batch_size):
            end = min(start + batch_size, n)
            batch_idx = indices[start:end]
            X_batch = X[batch_idx]
            y_batch = y[batch_idx]

            y_pred = X_batch @ w + b
            error = y_pred - y_batch
            loss = np.mean(error ** 2)
            epoch_loss += loss
            n_batches += 1

            grad_w = 2 * X_batch.T @ error / len(X_batch)
            grad_b = 2 * np.mean(error)
            w -= lr * grad_w
            b -= lr * grad_b

        loss_history.append(epoch_loss / n_batches)

    return loss_history, w.item(), b.item()

batch_sizes = [1, 16, 64, 200]
labels = ["BS=1 (SGD)", "BS=16", "BS=64", "BS=200 (Full Batch)"]
colors = ["red", "orange", "green", "blue"]

plt.figure(figsize=(10, 5))
for bs, label, color in zip(batch_sizes, labels, colors):
    losses, final_w, final_b = train_with_batch_size(X, y_true, bs)
    plt.plot(losses, label=f"{label} (w={final_w:.2f}, b={final_b:.2f})", color=color, linewidth=2, alpha=0.8)

plt.xlabel("Epoch", fontsize=12)
plt.ylabel("Loss (MSE)", fontsize=12)
plt.title("Batch Size vs Training Loss", fontsize=14)
plt.legend(fontsize=10)
plt.grid(True, alpha=0.3)
plt.savefig("batch_size_comparison.png", dpi=100, bbox_inches="tight")
plt.show()
print("=== 배치 크기 실험 결과 ===")
print("BS=1:   매우 불안정하지만 빠르게 좋은 영역에 도달")
print("BS=16:  적당히 불안정, 좋은 일반화 성능")
print("BS=64:  안정적이고 효율적 (실전 추천)")
print("BS=200: 매우 안정적이지만 느리게 수렴")
print("(실제 정답: w=3, b=2)")
\`\`\`

---

## 5. 네트워크 구조: 넓이 vs 깊이

네트워크를 설계할 때 두 가지 선택이 있습니다.
넓게 만들 것인가(뉴런 수 증가), 깊게 만들 것인가(층 수 증가)?

> **비유**: 건물에 비유하면 이렇습니다.
> - 넓은 네트워크: 1층짜리 대형 마트 (한 층에 모든 것을 배치)
> - 깊은 네트워크: 10층짜리 오피스 빌딩 (각 층이 다른 역할)
> - 실제로는 적당히 깊고, 적당히 넓은 것이 최선입니다.

### 실행해보기: 다양한 구조로 XOR 문제 풀기

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

n_per_class = 100
X0 = np.vstack([
    np.random.randn(n_per_class // 2, 2) * 0.3 + [0, 0],
    np.random.randn(n_per_class // 2, 2) * 0.3 + [1, 1]
])
X1 = np.vstack([
    np.random.randn(n_per_class // 2, 2) * 0.3 + [0, 1],
    np.random.randn(n_per_class // 2, 2) * 0.3 + [1, 0]
])
X = np.vstack([X0, X1])
y = np.array([0] * n_per_class + [1] * n_per_class).reshape(-1, 1)

def relu(x):
    return np.maximum(0, x)

def relu_deriv(x):
    return (x > 0).astype(float)

def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

def train_network(X, y, layer_sizes, lr=0.1, epochs=500):
    n = len(X)
    weights, biases = [], []
    for i in range(len(layer_sizes) - 1):
        w = np.random.randn(layer_sizes[i], layer_sizes[i+1]) * np.sqrt(2.0 / layer_sizes[i])
        b = np.zeros((1, layer_sizes[i+1]))
        weights.append(w)
        biases.append(b)

    loss_history = []
    for epoch in range(epochs):
        activations = [X]
        pre_acts = []
        for i in range(len(weights)):
            z = activations[-1] @ weights[i] + biases[i]
            pre_acts.append(z)
            a = relu(z) if i < len(weights) - 1 else sigmoid(z)
            activations.append(a)

        output = activations[-1]
        loss = -np.mean(y * np.log(output + 1e-8) + (1 - y) * np.log(1 - output + 1e-8))
        loss_history.append(loss)

        delta = output - y
        for i in range(len(weights) - 1, -1, -1):
            grad_w = activations[i].T @ delta / n
            grad_b = np.mean(delta, axis=0, keepdims=True)
            if i > 0:
                delta = (delta @ weights[i].T) * relu_deriv(pre_acts[i-1])
            weights[i] -= lr * grad_w
            biases[i] -= lr * grad_b

    final_pred = (activations[-1] > 0.5).astype(float)
    accuracy = np.mean(final_pred == y) * 100
    return loss_history, accuracy

architectures = {
    "Shallow-Narrow [2,4,1]": [2, 4, 1],
    "Shallow-Wide [2,32,1]": [2, 32, 1],
    "Deep-Narrow [2,4,4,4,1]": [2, 4, 4, 4, 1],
    "Deep-Wide [2,16,16,1]": [2, 16, 16, 1],
}

colors_list = ["blue", "green", "red", "purple"]
plt.figure(figsize=(10, 5))

results = {}
for (name, arch), color in zip(architectures.items(), colors_list):
    losses, acc = train_network(X, y, arch, lr=0.1, epochs=500)
    total_params = sum(arch[i] * arch[i+1] + arch[i+1] for i in range(len(arch)-1))
    plt.plot(losses, label=f"{name} (acc={acc:.0f}%, params={total_params})", color=color, linewidth=2)
    results[name] = {"accuracy": acc, "params": total_params}

plt.xlabel("Epoch", fontsize=12)
plt.ylabel("Loss (Cross-Entropy)", fontsize=12)
plt.title("Network Architecture Comparison on XOR", fontsize=14)
plt.legend(fontsize=9)
plt.grid(True, alpha=0.3)
plt.savefig("architecture_comparison.png", dpi=100, bbox_inches="tight")
plt.show()

print("=== 네트워크 구조 비교 결과 ===")
for name, res in results.items():
    print(f"  {name}: 정확도={res['accuracy']:.1f}%, 파라미터수={res['params']}")
print()
print("핵심 교훈:")
print("  - 너무 작은 네트워크는 복잡한 패턴을 학습 못함")
print("  - 넓은 네트워크는 파라미터는 많지만 표현력이 좋음")
print("  - 깊은 네트워크는 계층적 특징을 학습할 수 있음")
print("  - 적절한 크기를 찾는 것이 핵심!")
\`\`\`

---

## 6. 탐색 전략: 어떻게 최적의 조합을 찾을까?

하이퍼파라미터가 여러 개이면 가능한 조합이 기하급수적으로 늘어납니다.
효율적으로 찾는 방법이 필요합니다.

### 그리드 서치 (Grid Search)

가능한 모든 조합을 시도합니다. 체계적이지만 느립니다.

> **비유**: 보물지도 없이 밭 전체를 1미터 간격으로 파보는 것입니다.
> 확실하지만, 밭이 크면 평생 걸립니다.

### 랜덤 서치 (Random Search)

무작위로 조합을 뽑아서 시도합니다. 의외로 효율적입니다!

> **비유**: 랜덤으로 여기저기 파보는 것입니다.
> 중요한 하이퍼파라미터를 더 다양하게 탐색할 수 있어서, 실전에서 그리드 서치보다 좋은 경우가 많습니다.

### 베이지안 최적화 (Bayesian Optimization)

이전 실험 결과를 학습해서 다음에 시도할 값을 똑똑하게 선택합니다.

> **비유**: 금속 탐지기를 들고 다니면서, 신호가 강한 곳 주변을 집중적으로 파는 것입니다.

| 전략 | 장점 | 단점 | 추천 상황 |
|------|------|------|----------|
| 그리드 서치 | 체계적, 이해 쉬움 | 느림, 차원의 저주 | 하이퍼파라미터 2~3개일 때 |
| 랜덤 서치 | 효율적, 구현 쉬움 | 운에 의존 | 일반적으로 추천 |
| 베이지안 최적화 | 가장 효율적 | 구현 복잡 | 평가 비용이 클 때 |

### 실행해보기: 랜덤 서치 직접 구현하기

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

n_per_class = 80
X0 = np.vstack([
    np.random.randn(n_per_class // 2, 2) * 0.3 + [0, 0],
    np.random.randn(n_per_class // 2, 2) * 0.3 + [1, 1]
])
X1 = np.vstack([
    np.random.randn(n_per_class // 2, 2) * 0.3 + [0, 1],
    np.random.randn(n_per_class // 2, 2) * 0.3 + [1, 0]
])
X = np.vstack([X0, X1])
y = np.array([0] * n_per_class + [1] * n_per_class).reshape(-1, 1)

n_train = int(len(X) * 0.7)
indices = np.random.permutation(len(X))
X_train, y_train = X[indices[:n_train]], y[indices[:n_train]]
X_val, y_val = X[indices[n_train:]], y[indices[n_train:]]

def relu(x):
    return np.maximum(0, x)

def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

def evaluate_config(X_tr, y_tr, X_v, y_v, lr, hidden_size, epochs=300):
    n_in, n_hidden, n_out = 2, hidden_size, 1
    W1 = np.random.randn(n_in, n_hidden) * np.sqrt(2.0 / n_in)
    b1 = np.zeros((1, n_hidden))
    W2 = np.random.randn(n_hidden, n_out) * np.sqrt(2.0 / n_hidden)
    b2 = np.zeros((1, n_out))
    n = len(X_tr)

    for epoch in range(epochs):
        z1 = X_tr @ W1 + b1
        a1 = relu(z1)
        z2 = a1 @ W2 + b2
        a2 = sigmoid(z2)
        dz2 = a2 - y_tr
        dW2 = a1.T @ dz2 / n
        db2 = np.mean(dz2, axis=0, keepdims=True)
        da1 = dz2 @ W2.T
        dz1 = da1 * (z1 > 0).astype(float)
        dW1 = X_tr.T @ dz1 / n
        db1 = np.mean(dz1, axis=0, keepdims=True)
        W2 -= lr * dW2
        b2 -= lr * db2
        W1 -= lr * dW1
        b1 -= lr * db1

    z1_v = X_v @ W1 + b1
    a1_v = relu(z1_v)
    z2_v = a1_v @ W2 + b2
    pred_v = (sigmoid(z2_v) > 0.5).astype(float)
    return np.mean(pred_v == y_v) * 100

n_trials = 50
results = []

print("=== 랜덤 서치 시작 (50회 시도) ===")
for trial in range(n_trials):
    lr = 10 ** np.random.uniform(-3, 0)
    hidden_size = int(2 ** np.random.uniform(2, 6))
    val_acc = evaluate_config(X_train, y_train, X_val, y_val, lr, hidden_size)
    results.append({"lr": lr, "hidden": hidden_size, "val_acc": val_acc})
    if trial < 5 or val_acc > 90:
        print(f"  시도 {trial+1}: lr={lr:.5f}, hidden={hidden_size}, 정확도={val_acc:.1f}%")

results_sorted = sorted(results, key=lambda x: x["val_acc"], reverse=True)
print("\\n=== 상위 5개 결과 ===")
for i, r in enumerate(results_sorted[:5]):
    print(f"  {i+1}. lr={r['lr']:.5f}, hidden={r['hidden']}, 정확도={r['val_acc']:.1f}%")

fig, axes = plt.subplots(1, 2, figsize=(14, 5))
lrs = [r["lr"] for r in results]
accs = [r["val_acc"] for r in results]
hiddens = [r["hidden"] for r in results]

ax1 = axes[0]
scatter = ax1.scatter(lrs, accs, c=hiddens, cmap="viridis", s=80, alpha=0.7, edgecolors="black", linewidth=0.5)
ax1.set_xscale("log")
ax1.set_xlabel("Learning Rate (log scale)", fontsize=12)
ax1.set_ylabel("Validation Accuracy (%)", fontsize=12)
ax1.set_title("Random Search Results", fontsize=14)
plt.colorbar(scatter, ax=ax1, label="Hidden Units")
ax1.grid(True, alpha=0.3)

best_so_far = []
current_best = 0
for r in results:
    current_best = max(current_best, r["val_acc"])
    best_so_far.append(current_best)

ax2 = axes[1]
ax2.plot(range(1, n_trials + 1), best_so_far, "b-", linewidth=2)
ax2.fill_between(range(1, n_trials + 1), best_so_far, alpha=0.2)
ax2.set_xlabel("Number of Trials", fontsize=12)
ax2.set_ylabel("Best Validation Accuracy (%)", fontsize=12)
ax2.set_title("Best Accuracy vs Number of Trials", fontsize=14)
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("random_search_results.png", dpi=100, bbox_inches="tight")
plt.show()
print(f"\\n최고 정확도: {results_sorted[0]['val_acc']:.1f}%")
print("랜덤 서치는 적은 시도로도 좋은 결과를 찾을 수 있습니다!")
\`\`\`

---

## 7. 실전 규칙 모음 (Rules of Thumb)

처음 시작할 때 어디서부터 해야 할지 모르겠다면, 아래 표를 참고하세요.

| 하이퍼파라미터 | 처음 시도할 값 | 탐색 범위 | 팁 |
|---------------|---------------|----------|-----|
| 학습률 | 0.001 | 0.0001 ~ 0.01 | 로그 스케일로 탐색 |
| 배치 크기 | 32 또는 64 | 16 ~ 256 | 2의 거듭제곱 사용 |
| 에포크 | 100 | Early Stopping 활용 | 검증 손실을 모니터링 |
| 은닉층 수 | 2~3층 | 1~5층 | 작은 것부터 시작 |
| 은닉 유닛 수 | 64 ~ 128 | 32 ~ 512 | 층이 깊으면 유닛은 적게 |
| 드롭아웃 비율 | 0.3 ~ 0.5 | 0.1 ~ 0.7 | 과적합 심하면 높이기 |
| L2 정규화 | 0.0001 | 0.00001 ~ 0.01 | 로그 스케일로 탐색 |

**실전 순서 (추천)**:
1. 먼저 학습률을 찾으세요 (가장 중요!)
2. 그 다음 네트워크 크기를 조정하세요
3. 마지막으로 정규화 관련 값을 튜닝하세요

---

## 핵심 요약

| 개념 | 설명 | 비유 |
|------|------|------|
| 파라미터 vs 하이퍼파라미터 | 학습되는 값 vs 사람이 설정하는 값 | 요리 맛 vs 레시피 |
| 학습률 | 가장 중요한 하이퍼파라미터 | 산을 내려가는 보폭 |
| 배치 크기 | 한 번에 보는 데이터 수 | 한 번에 채점하는 시험지 |
| 네트워크 구조 | 넓이와 깊이의 균형 | 건물 설계 |
| 랜덤 서치 | 효율적인 탐색 전략 | 전략적 보물찾기 |

---

## 학습 체크리스트
- [ ] 파라미터와 하이퍼파라미터의 차이를 설명할 수 있다
- [ ] 학습률이 너무 크거나 작을 때 어떤 일이 생기는지 안다
- [ ] 배치 크기의 장단점을 설명할 수 있다
- [ ] 그리드 서치, 랜덤 서치의 차이를 안다
- [ ] 랜덤 서치를 직접 구현할 수 있다

## 다음 강의 예고
**"Level 3 종합 실습"** - 지금까지 배운 모든 것을 합쳐서 처음부터 끝까지 신경망을 만들어 봅니다!
`;
