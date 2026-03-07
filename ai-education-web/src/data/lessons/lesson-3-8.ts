export const lesson3_8_content = `
# Level 3 종합 실습: 신경망을 처음부터 만들자!

## 학습 목표
이 레슨을 완료하면:
- NumPy만으로 완전한 신경망을 처음부터 구현할 수 있습니다
- 순전파, 역전파, 미니배치 SGD, 모멘텀을 직접 코딩합니다
- L2 정규화와 드롭아웃을 추가하고 효과를 비교합니다
- Level 3에서 배운 모든 개념이 하나로 연결됩니다

---

## 핵심 메시지
> **"진짜 이해는 직접 만들어 볼 때 완성됩니다"**
> 지금까지 손실 함수, 경사하강법, 역전파, 활성화 함수, 정규화를 배웠습니다.
> 이제 이 모든 부품을 조립해서 하나의 작동하는 신경망을 만들어 봅시다.
> 라이브러리 없이, NumPy만으로!

---

## 1. 문제 정의: 달 모양 데이터 이진 분류

우리가 풀 문제는 "달 모양(moon-shaped) 데이터"의 이진 분류입니다.
두 개의 반달 모양 클래스가 서로 겹쳐 있어서, 단순한 직선으로는 분류할 수 없습니다.

> **비유**: 두 개의 초승달이 서로 맞물려 있는 모양입니다.
> 직선 하나로는 절대 나눌 수 없고, 곡선이 필요합니다.
> 이것이 바로 신경망이 필요한 이유입니다!

### 실행해보기: 데이터 생성 및 시각화

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

def make_moons(n_samples=500, noise=0.15):
    n = n_samples // 2
    theta1 = np.linspace(0, np.pi, n)
    x1 = np.cos(theta1)
    y1 = np.sin(theta1)
    theta2 = np.linspace(0, np.pi, n)
    x2 = 1 - np.cos(theta2)
    y2 = 0.5 - np.sin(theta2)

    X = np.vstack([
        np.column_stack([x1, y1]),
        np.column_stack([x2, y2])
    ])
    X += np.random.randn(n_samples, 2) * noise
    y = np.array([0] * n + [1] * n)
    return X, y

X, y = make_moons(500, noise=0.15)

n_train = int(len(X) * 0.8)
indices = np.random.permutation(len(X))
X_train, y_train = X[indices[:n_train]], y[indices[:n_train]]
X_val, y_val = X[indices[n_train:]], y[indices[n_train:]]

plt.figure(figsize=(10, 5))
plt.subplot(1, 2, 1)
plt.scatter(X_train[y_train == 0, 0], X_train[y_train == 0, 1], c="blue", label="Class 0", alpha=0.6, s=20)
plt.scatter(X_train[y_train == 1, 0], X_train[y_train == 1, 1], c="red", label="Class 1", alpha=0.6, s=20)
plt.title(f"Training Data ({n_train} samples)", fontsize=13)
plt.legend()
plt.grid(True, alpha=0.3)
plt.axis("equal")

plt.subplot(1, 2, 2)
plt.scatter(X_val[y_val == 0, 0], X_val[y_val == 0, 1], c="blue", label="Class 0", alpha=0.6, s=20)
plt.scatter(X_val[y_val == 1, 0], X_val[y_val == 1, 1], c="red", label="Class 1", alpha=0.6, s=20)
plt.title(f"Validation Data ({len(X_val)} samples)", fontsize=13)
plt.legend()
plt.grid(True, alpha=0.3)
plt.axis("equal")

plt.tight_layout()
plt.savefig("moon_data.png", dpi=100, bbox_inches="tight")
plt.show()
print(f"총 데이터: {len(X)}개 (학습: {n_train}, 검증: {len(X_val)})")
print(f"입력 차원: {X.shape[1]} (x, y 좌표)")
print("직선으로는 분류 불가능 -> 신경망이 필요합니다!")
\`\`\`

---

## 2. 신경망 클래스 구현

이제 핵심입니다! 완전한 신경망을 하나의 클래스로 구현합니다.
포함되는 기능은 다음과 같습니다:

- He 가중치 초기화
- ReLU 활성화 함수 (은닉층)
- Sigmoid 활성화 함수 (출력층)
- Cross-Entropy 손실 함수
- 역전파 (모든 층의 그래디언트 계산)
- 미니배치 SGD + 모멘텀

### 실행해보기: 완전한 신경망 from scratch

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

class NeuralNetwork:
    def __init__(self, layer_sizes, learning_rate=0.1, momentum=0.9):
        self.layer_sizes = layer_sizes
        self.lr = learning_rate
        self.momentum = momentum
        self.n_layers = len(layer_sizes) - 1

        self.weights = []
        self.biases = []
        self.vel_w = []
        self.vel_b = []

        for i in range(self.n_layers):
            w = np.random.randn(layer_sizes[i], layer_sizes[i+1]) * np.sqrt(2.0 / layer_sizes[i])
            b = np.zeros((1, layer_sizes[i+1]))
            self.weights.append(w)
            self.biases.append(b)
            self.vel_w.append(np.zeros_like(w))
            self.vel_b.append(np.zeros_like(b))

        print(f"Network created: {layer_sizes}")
        total_params = sum(w.size + b.size for w, b in zip(self.weights, self.biases))
        print(f"Total parameters: {total_params}")

    def relu(self, x):
        return np.maximum(0, x)

    def relu_deriv(self, x):
        return (x > 0).astype(float)

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

    def forward(self, X):
        self.pre_activations = []
        self.activations = [X]

        for i in range(self.n_layers):
            z = self.activations[-1] @ self.weights[i] + self.biases[i]
            self.pre_activations.append(z)

            if i < self.n_layers - 1:
                a = self.relu(z)
            else:
                a = self.sigmoid(z)
            self.activations.append(a)

        return self.activations[-1]

    def compute_loss(self, y_pred, y_true, l2_lambda=0):
        m = len(y_true)
        y_true = y_true.reshape(-1, 1)
        ce_loss = -np.mean(
            y_true * np.log(y_pred + 1e-8) +
            (1 - y_true) * np.log(1 - y_pred + 1e-8)
        )
        l2_loss = 0
        if l2_lambda > 0:
            for w in self.weights:
                l2_loss += np.sum(w ** 2)
            l2_loss = l2_lambda / (2 * m) * l2_loss
        return ce_loss + l2_loss

    def backward(self, y_true, l2_lambda=0):
        m = len(y_true)
        y_true = y_true.reshape(-1, 1)
        delta = self.activations[-1] - y_true

        for i in range(self.n_layers - 1, -1, -1):
            grad_w = self.activations[i].T @ delta / m
            grad_b = np.mean(delta, axis=0, keepdims=True)

            if l2_lambda > 0:
                grad_w += l2_lambda / m * self.weights[i]

            self.vel_w[i] = self.momentum * self.vel_w[i] - self.lr * grad_w
            self.vel_b[i] = self.momentum * self.vel_b[i] - self.lr * grad_b
            self.weights[i] += self.vel_w[i]
            self.biases[i] += self.vel_b[i]

            if i > 0:
                delta = (delta @ self.weights[i].T) * self.relu_deriv(self.pre_activations[i-1])

    def train(self, X_train, y_train, X_val, y_val,
              epochs=200, batch_size=32, l2_lambda=0):
        train_losses, val_losses = [], []
        train_accs, val_accs = [], []
        n = len(X_train)

        for epoch in range(epochs):
            idx = np.random.permutation(n)
            X_shuffled = X_train[idx]
            y_shuffled = y_train[idx]

            for start in range(0, n, batch_size):
                end = min(start + batch_size, n)
                X_batch = X_shuffled[start:end]
                y_batch = y_shuffled[start:end]
                self.forward(X_batch)
                self.backward(y_batch, l2_lambda)

            train_pred = self.forward(X_train)
            train_loss = self.compute_loss(train_pred, y_train, l2_lambda)
            train_acc = np.mean((train_pred.flatten() > 0.5) == y_train) * 100

            val_pred = self.forward(X_val)
            val_loss = self.compute_loss(val_pred, y_val)
            val_acc = np.mean((val_pred.flatten() > 0.5) == y_val) * 100

            train_losses.append(train_loss)
            val_losses.append(val_loss)
            train_accs.append(train_acc)
            val_accs.append(val_acc)

            if (epoch + 1) % 50 == 0:
                print(f"Epoch {epoch+1:>3}: train_loss={train_loss:.4f}, val_acc={val_acc:.1f}%")

        return train_losses, val_losses, train_accs, val_accs

def make_moons(n_samples=500, noise=0.15):
    n = n_samples // 2
    theta1 = np.linspace(0, np.pi, n)
    x1, y1 = np.cos(theta1), np.sin(theta1)
    theta2 = np.linspace(0, np.pi, n)
    x2, y2 = 1 - np.cos(theta2), 0.5 - np.sin(theta2)
    X = np.vstack([np.column_stack([x1, y1]), np.column_stack([x2, y2])])
    X += np.random.randn(n_samples, 2) * noise
    return X, np.array([0] * n + [1] * n)

X, y = make_moons(500, noise=0.15)
n_train = int(len(X) * 0.8)
idx = np.random.permutation(len(X))
X_train, y_train = X[idx[:n_train]], y[idx[:n_train]]
X_val, y_val = X[idx[n_train:]], y[idx[n_train:]]

nn_model = NeuralNetwork([2, 32, 16, 1], learning_rate=0.1, momentum=0.9)
train_losses, val_losses, train_accs, val_accs = nn_model.train(
    X_train, y_train, X_val, y_val, epochs=200, batch_size=32
)

print(f"\\nFinal: train_acc={train_accs[-1]:.1f}%, val_acc={val_accs[-1]:.1f}%")
\`\`\`

---

## 3. 결정 경계 시각화

신경망이 학습한 결과를 눈으로 확인해 봅시다.
모든 (x, y) 좌표에 대해 예측값을 계산하면 결정 경계를 그릴 수 있습니다.

### 실행해보기: 학습 곡선과 결정 경계

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

class NeuralNetwork:
    def __init__(self, layer_sizes, lr=0.1, momentum=0.9):
        self.n_layers = len(layer_sizes) - 1
        self.weights, self.biases, self.vel_w, self.vel_b = [], [], [], []
        for i in range(self.n_layers):
            w = np.random.randn(layer_sizes[i], layer_sizes[i+1]) * np.sqrt(2.0 / layer_sizes[i])
            b = np.zeros((1, layer_sizes[i+1]))
            self.weights.append(w)
            self.biases.append(b)
            self.vel_w.append(np.zeros_like(w))
            self.vel_b.append(np.zeros_like(b))
        self.lr = lr
        self.momentum = momentum

    def relu(self, x): return np.maximum(0, x)
    def relu_d(self, x): return (x > 0).astype(float)
    def sigmoid(self, x): return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

    def forward(self, X):
        self.zs, self.acts = [], [X]
        for i in range(self.n_layers):
            z = self.acts[-1] @ self.weights[i] + self.biases[i]
            self.zs.append(z)
            a = self.relu(z) if i < self.n_layers - 1 else self.sigmoid(z)
            self.acts.append(a)
        return self.acts[-1]

    def backward(self, y_true):
        m = len(y_true)
        y_true = y_true.reshape(-1, 1)
        delta = self.acts[-1] - y_true
        for i in range(self.n_layers - 1, -1, -1):
            gw = self.acts[i].T @ delta / m
            gb = np.mean(delta, axis=0, keepdims=True)
            self.vel_w[i] = self.momentum * self.vel_w[i] - self.lr * gw
            self.vel_b[i] = self.momentum * self.vel_b[i] - self.lr * gb
            self.weights[i] += self.vel_w[i]
            self.biases[i] += self.vel_b[i]
            if i > 0:
                delta = (delta @ self.weights[i].T) * self.relu_d(self.zs[i-1])

    def train_epoch(self, X, y, bs=32):
        idx = np.random.permutation(len(X))
        for s in range(0, len(X), bs):
            e = min(s + bs, len(X))
            self.forward(X[idx[s:e]])
            self.backward(y[idx[s:e]])

    def accuracy(self, X, y):
        return np.mean((self.forward(X).flatten() > 0.5) == y) * 100

def make_moons(n=500, noise=0.15):
    h = n // 2
    t1 = np.linspace(0, np.pi, h)
    t2 = np.linspace(0, np.pi, h)
    X = np.vstack([np.column_stack([np.cos(t1), np.sin(t1)]),
                   np.column_stack([1 - np.cos(t2), 0.5 - np.sin(t2)])])
    X += np.random.randn(n, 2) * noise
    return X, np.array([0]*h + [1]*h)

X, y = make_moons(500)
n_t = 400
idx = np.random.permutation(500)
Xt, yt = X[idx[:n_t]], y[idx[:n_t]]
Xv, yv = X[idx[n_t:]], y[idx[n_t:]]

model = NeuralNetwork([2, 32, 16, 1], lr=0.1, momentum=0.9)
snapshots = {}
t_losses, v_losses, t_accs, v_accs = [], [], [], []

for ep in range(201):
    tp = model.forward(Xt)
    vp = model.forward(Xv)
    tl = -np.mean(yt.reshape(-1,1)*np.log(tp+1e-8) + (1-yt.reshape(-1,1))*np.log(1-tp+1e-8))
    vl = -np.mean(yv.reshape(-1,1)*np.log(vp+1e-8) + (1-yv.reshape(-1,1))*np.log(1-vp+1e-8))
    t_losses.append(tl)
    v_losses.append(vl)
    t_accs.append(model.accuracy(Xt, yt))
    v_accs.append(model.accuracy(Xv, yv))

    if ep in [0, 10, 50, 200]:
        snapshots[ep] = ([w.copy() for w in model.weights], [b.copy() for b in model.biases])

    model.train_epoch(Xt, yt, bs=32)

fig, axes = plt.subplots(2, 3, figsize=(16, 10))

axes[0, 0].plot(t_losses, "b-", label="Train Loss", linewidth=2)
axes[0, 0].plot(v_losses, "r--", label="Val Loss", linewidth=2)
axes[0, 0].set_xlabel("Epoch")
axes[0, 0].set_ylabel("Loss")
axes[0, 0].set_title("Loss Curve")
axes[0, 0].legend()
axes[0, 0].grid(True, alpha=0.3)

axes[0, 1].plot(t_accs, "b-", label="Train Acc", linewidth=2)
axes[0, 1].plot(v_accs, "r--", label="Val Acc", linewidth=2)
axes[0, 1].set_xlabel("Epoch")
axes[0, 1].set_ylabel("Accuracy (%)")
axes[0, 1].set_title("Accuracy Curve")
axes[0, 1].legend()
axes[0, 1].grid(True, alpha=0.3)

xx, yy = np.meshgrid(np.linspace(X[:,0].min()-0.5, X[:,0].max()+0.5, 200),
                      np.linspace(X[:,1].min()-0.5, X[:,1].max()+0.5, 200))
grid = np.column_stack([xx.ravel(), yy.ravel()])

model_final = NeuralNetwork([2, 32, 16, 1])
model_final.weights = snapshots[200][0]
model_final.biases = snapshots[200][1]
Z = model_final.forward(grid).reshape(xx.shape)
axes[0, 2].contourf(xx, yy, Z, levels=50, cmap="RdBu_r", alpha=0.7)
axes[0, 2].scatter(Xv[yv==0,0], Xv[yv==0,1], c="blue", s=15, alpha=0.8, edgecolors="white", linewidth=0.5)
axes[0, 2].scatter(Xv[yv==1,0], Xv[yv==1,1], c="red", s=15, alpha=0.8, edgecolors="white", linewidth=0.5)
axes[0, 2].set_title(f"Final (Epoch 200, Val Acc={v_accs[-1]:.1f}%)")
axes[0, 2].grid(True, alpha=0.2)

for ax_idx, ep in enumerate([0, 10, 50]):
    temp = NeuralNetwork([2, 32, 16, 1])
    temp.weights = snapshots[ep][0]
    temp.biases = snapshots[ep][1]
    Z = temp.forward(grid).reshape(xx.shape)
    axes[1, ax_idx].contourf(xx, yy, Z, levels=50, cmap="RdBu_r", alpha=0.7)
    axes[1, ax_idx].scatter(Xt[yt==0,0], Xt[yt==0,1], c="blue", s=10, alpha=0.5)
    axes[1, ax_idx].scatter(Xt[yt==1,0], Xt[yt==1,1], c="red", s=10, alpha=0.5)
    axes[1, ax_idx].set_title(f"Epoch {ep} (Train Acc={t_accs[ep]:.1f}%)")
    axes[1, ax_idx].grid(True, alpha=0.2)

plt.suptitle("Decision Boundary Evolution", fontsize=16, fontweight="bold")
plt.tight_layout()
plt.savefig("decision_boundary_evolution.png", dpi=100, bbox_inches="tight")
plt.show()
print("=== 결정 경계 진화 관찰 ===")
print("Epoch 0:   무작위 - 분류를 전혀 못함")
print("Epoch 10:  대략적인 경계가 형성되기 시작")
print("Epoch 50:  꽤 좋은 경계가 만들어짐")
print("Epoch 200: 달 모양을 정확히 분리하는 곡선 경계!")
\`\`\`

---

## 4. L2 정규화와 드롭아웃 추가

이제 정규화를 추가하고 그 효과를 비교해 봅시다.
과적합을 줄이는 두 가지 핵심 기법을 직접 구현합니다.

> **비유**: 학생이 교과서를 통째로 암기하는 것(과적합)을 방지하기 위해,
> 시험 범위를 넓히고(L2 정규화 - 특정 지식에 치우치지 않게),
> 랜덤으로 노트 일부를 가리고 공부하게 합니다(드롭아웃).

### 실행해보기: 정규화 효과 비교

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

class NeuralNetReg:
    def __init__(self, sizes, lr=0.1, mom=0.9):
        self.nl = len(sizes) - 1
        self.W, self.b, self.vW, self.vb = [], [], [], []
        for i in range(self.nl):
            w = np.random.randn(sizes[i], sizes[i+1]) * np.sqrt(2.0 / sizes[i])
            bi = np.zeros((1, sizes[i+1]))
            self.W.append(w)
            self.b.append(bi)
            self.vW.append(np.zeros_like(w))
            self.vb.append(np.zeros_like(bi))
        self.lr = lr
        self.mom = mom

    def relu(self, x): return np.maximum(0, x)
    def relu_d(self, x): return (x > 0).astype(float)
    def sigm(self, x): return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

    def forward(self, X, drop=0, training=True):
        self.zs, self.acts, self.masks = [], [X], []
        for i in range(self.nl):
            z = self.acts[-1] @ self.W[i] + self.b[i]
            self.zs.append(z)
            if i < self.nl - 1:
                a = self.relu(z)
                if drop > 0 and training:
                    mask = (np.random.rand(*a.shape) > drop).astype(float)
                    a = a * mask / (1 - drop)
                    self.masks.append(mask)
                else:
                    self.masks.append(np.ones_like(a))
            else:
                a = self.sigm(z)
                self.masks.append(np.ones_like(a))
            self.acts.append(a)
        return self.acts[-1]

    def backward(self, y, l2=0, drop=0):
        m = len(y)
        y = y.reshape(-1, 1)
        d = self.acts[-1] - y
        for i in range(self.nl - 1, -1, -1):
            gw = self.acts[i].T @ d / m + (l2 / m) * self.W[i]
            gb = np.mean(d, axis=0, keepdims=True)
            self.vW[i] = self.mom * self.vW[i] - self.lr * gw
            self.vb[i] = self.mom * self.vb[i] - self.lr * gb
            self.W[i] += self.vW[i]
            self.b[i] += self.vb[i]
            if i > 0:
                d = (d @ self.W[i].T) * self.relu_d(self.zs[i-1])
                if drop > 0:
                    d = d * self.masks[i-1] / (1 - drop)

    def fit(self, Xt, yt, Xv, yv, epochs=300, bs=32, l2=0, drop=0):
        tl, vl = [], []
        for ep in range(epochs):
            idx = np.random.permutation(len(Xt))
            for s in range(0, len(Xt), bs):
                e = min(s + bs, len(Xt))
                self.forward(Xt[idx[s:e]], drop, True)
                self.backward(yt[idx[s:e]], l2, drop)
            tp = self.forward(Xt, 0, False)
            vp = self.forward(Xv, 0, False)
            tl.append(-np.mean(yt.reshape(-1,1)*np.log(tp+1e-8)+(1-yt.reshape(-1,1))*np.log(1-tp+1e-8)))
            vl.append(-np.mean(yv.reshape(-1,1)*np.log(vp+1e-8)+(1-yv.reshape(-1,1))*np.log(1-vp+1e-8)))
        ta = np.mean((self.forward(Xt, 0, False).flatten() > 0.5) == yt) * 100
        va = np.mean((self.forward(Xv, 0, False).flatten() > 0.5) == yv) * 100
        return tl, vl, ta, va

def make_moons(n=500, noise=0.15):
    h = n // 2
    t1 = np.linspace(0, np.pi, h)
    t2 = np.linspace(0, np.pi, h)
    X = np.vstack([np.column_stack([np.cos(t1), np.sin(t1)]),
                   np.column_stack([1-np.cos(t2), 0.5-np.sin(t2)])])
    X += np.random.randn(n, 2) * noise
    return X, np.array([0]*h + [1]*h)

X, y = make_moons(400, noise=0.15)
n_t = 300
idx = np.random.permutation(400)
Xt, yt = X[idx[:n_t]], y[idx[:n_t]]
Xv, yv = X[idx[n_t:]], y[idx[n_t:]]

configs = [
    ("No Regularization", 0, 0, "red"),
    ("L2 (lambda=0.01)", 0.01, 0, "blue"),
    ("L2 + Dropout(0.3)", 0.01, 0.3, "green"),
]

fig, axes = plt.subplots(1, 3, figsize=(16, 5))
ax1, ax2, ax3 = axes

all_results = []
for name, l2, drop, color in configs:
    np.random.seed(42)
    m = NeuralNetReg([2, 64, 32, 1], lr=0.1, mom=0.9)
    tl, vl, ta, va = m.fit(Xt, yt, Xv, yv, epochs=300, bs=32, l2=l2, drop=drop)
    all_results.append((name, tl, vl, ta, va, color))
    ax1.plot(tl, color=color, linewidth=2, label=name)
    ax2.plot(vl, color=color, linewidth=2, label=name)

ax1.set_xlabel("Epoch")
ax1.set_ylabel("Train Loss")
ax1.set_title("Training Loss")
ax1.legend(fontsize=9)
ax1.grid(True, alpha=0.3)

ax2.set_xlabel("Epoch")
ax2.set_ylabel("Validation Loss")
ax2.set_title("Validation Loss")
ax2.legend(fontsize=9)
ax2.grid(True, alpha=0.3)

names_short = ["No Reg", "L2", "L2+Drop"]
train_accs_list = [r[3] for r in all_results]
val_accs_list = [r[4] for r in all_results]
x_pos = np.arange(len(names_short))
width = 0.35
bars1 = ax3.bar(x_pos - width/2, train_accs_list, width, label="Train Acc", color="skyblue", edgecolor="black")
bars2 = ax3.bar(x_pos + width/2, val_accs_list, width, label="Val Acc", color="salmon", edgecolor="black")
ax3.set_ylabel("Accuracy (%)")
ax3.set_title("Train vs Val Accuracy")
ax3.set_xticks(x_pos)
ax3.set_xticklabels(names_short)
ax3.legend()
ax3.set_ylim(80, 102)
ax3.grid(True, alpha=0.3, axis="y")

for bar in bars1:
    ax3.text(bar.get_x() + bar.get_width()/2., bar.get_height() + 0.3,
             f"{bar.get_height():.1f}%", ha="center", va="bottom", fontsize=9)
for bar in bars2:
    ax3.text(bar.get_x() + bar.get_width()/2., bar.get_height() + 0.3,
             f"{bar.get_height():.1f}%", ha="center", va="bottom", fontsize=9)

plt.tight_layout()
plt.savefig("regularization_comparison.png", dpi=100, bbox_inches="tight")
plt.show()

print("=== 정규화 효과 비교 ===")
for name, tl, vl, ta, va, _ in all_results:
    gap = ta - va
    print(f"  {name:25s}: Train={ta:.1f}%, Val={va:.1f}%, Gap={gap:.1f}%")
print()
print("핵심 관찰:")
print("  - 정규화 없음: Train-Val 정확도 차이(Gap)가 가장 큼 = 과적합")
print("  - L2 정규화: 가중치가 작아져서 과적합 감소")
print("  - L2 + 드롭아웃: 가장 안정적인 일반화 성능")
\`\`\`

---

## 5. Level 3에서 배운 모든 것 정리

지금까지 Level 3 전체를 통해 배운 핵심 개념을 정리합니다.

| 레슨 | 핵심 개념 | 한줄 요약 |
|------|----------|----------|
| 3-1 손실 함수 | MSE, Cross-Entropy | "얼마나 틀렸는지"를 숫자로 |
| 3-2 경사하강법 | SGD, Adam, 모멘텀 | 손실을 줄이는 방향으로 이동 |
| 3-3 학습률과 최적화 | 학습률 스케줄링 | 보폭 조절의 기술 |
| 3-4 역전파 | 체인룰, 그래디언트 | 모든 가중치의 기울기 계산 |
| 3-5 활성화 함수 | ReLU, Sigmoid, Softmax | 비선형성으로 복잡한 패턴 학습 |
| 3-6 과적합과 정규화 | Dropout, L2, Early Stop | 암기 방지, 일반화 향상 |
| 3-7 하이퍼파라미터 | 학습률, 배치, 구조 | 최적의 설정값 찾기 |
| 3-8 종합 실습 | 전체 구현 | 모든 것을 하나로! |

이 모든 것이 합쳐져서 "학습하는 신경망"이 됩니다:

1. **순전파**: 입력 -> 가중치 연산 -> 활성화 함수 -> 예측값
2. **손실 계산**: 예측값과 정답의 차이를 수치화
3. **역전파**: 손실을 줄이기 위한 그래디언트 계산
4. **가중치 업데이트**: 경사하강법으로 가중치 조정
5. **정규화**: 과적합을 방지하며 반복

---

## Level 3 완료를 축하합니다!

여러분은 이제 딥러닝의 핵심 원리를 이해하고,
NumPy만으로 신경망을 처음부터 구현할 수 있는 실력을 갖추었습니다.

이것은 대단한 성과입니다! 많은 사람들이 딥러닝 라이브러리를 사용하지만,
내부에서 무슨 일이 일어나는지 이해하는 사람은 많지 않습니다.
여러분은 이제 그 소수에 속합니다.

**Level 3에서 달성한 것들:**
- 손실 함수를 직접 구현하고 의미를 이해했습니다
- 경사하강법의 다양한 변형을 비교했습니다
- 역전파 알고리즘을 수식과 코드로 이해했습니다
- 활성화 함수의 역할과 선택 기준을 배웠습니다
- 과적합과 정규화 기법을 실습했습니다
- 하이퍼파라미터 튜닝 전략을 익혔습니다
- NumPy로 완전한 신경망을 직접 만들었습니다!

---

## 학습 체크리스트
- [ ] make_moons 데이터를 생성하고 시각화할 수 있다
- [ ] NeuralNetwork 클래스의 forward/backward를 이해한다
- [ ] 미니배치 SGD + 모멘텀이 어떻게 동작하는지 안다
- [ ] L2 정규화와 드롭아웃을 직접 구현할 수 있다
- [ ] 결정 경계 시각화의 의미를 이해한다
- [ ] Level 3의 모든 개념이 어떻게 연결되는지 설명할 수 있다

## Level 4 미리보기
**"실전 프로젝트"** - 이제 진짜 데이터로 진짜 문제를 풀어봅니다!
MNIST 손글씨 분류, 이미지 분류 CNN, 자연어 처리까지.
Level 3에서 쌓은 기초가 빛을 발할 차례입니다!
`;
