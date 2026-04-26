# Day 3: 첫 번째 모델 — 선형 회귀 — "y=2x+3을 AI가 스스로 찾아낸다"

## 학습 목표
- 선형 회귀의 원리를 수학적/직관적으로 이해한다
- 손실 함수(MSE)와 경사 하강법(SGD)의 동작 원리를 파악한다
- PyTorch의 nn.Module, optimizer, 학습 루프를 직접 작성한다
- 학습 과정(loss 감소)을 시각화한다

## 준비물
- Google Colab (GPU 선택 권장)
- Day 2 실습 완료

## 실습 1: 데이터 생성과 시각화 (20분)

1. y = 2x + 3 + noise 데이터를 생성한다:

```python
import torch
import matplotlib.pyplot as plt

# 재현성을 위한 시드 고정
torch.manual_seed(42)

# 데이터 생성: y = 2x + 3 + noise
x = torch.linspace(0, 10, 100).unsqueeze(1)  # (100, 1)
y_true = 2 * x + 3
noise = torch.randn_like(y_true) * 0.5
y = y_true + noise

print(f"x shape: {x.shape}, y shape: {y.shape}")

# 시각화
plt.figure(figsize=(8, 5))
plt.scatter(x.numpy(), y.numpy(), s=10, label="데이터")
plt.plot(x.numpy(), y_true.numpy(), 'r-', label="실제 y=2x+3")
plt.xlabel("x")
plt.ylabel("y")
plt.legend()
plt.title("학습 데이터")
plt.show()
```

### 관찰 포인트
- 노이즈가 추가된 데이터가 실제 직선 주위에 분포하는가?
- unsqueeze(1)이 왜 필요한지 shape을 확인했는가?

## 실습 2: 수동으로 경사 하강법 구현 (30분)

1. numpy 없이 순수 PyTorch로 경사 하강법을 구현한다:

```python
# 파라미터 초기화 (랜덤)
w = torch.randn(1, requires_grad=True)
b = torch.randn(1, requires_grad=True)
lr = 0.01  # 학습률

losses = []

for epoch in range(100):
    # 순전파: 예측
    y_pred = w * x + b

    # 손실 계산 (MSE)
    loss = ((y_pred - y) ** 2).mean()
    losses.append(loss.item())

    # 역전파: 기울기 계산
    loss.backward()

    # 파라미터 업데이트 (기울기 하강)
    with torch.no_grad():
        w -= lr * w.grad
        b -= lr * b.grad

    # 기울기 초기화 (중요!)
    w.grad.zero_()
    b.grad.zero_()

    if (epoch + 1) % 20 == 0:
        print(f"Epoch {epoch+1}: loss={loss.item():.4f}, w={w.item():.4f}, b={b.item():.4f}")

print(f"\n최종 결과: w={w.item():.4f} (목표: 2.0), b={b.item():.4f} (목표: 3.0)")
```

2. 손실 변화를 시각화한다:

```python
plt.figure(figsize=(8, 4))
plt.plot(losses)
plt.xlabel("Epoch")
plt.ylabel("Loss (MSE)")
plt.title("학습 과정 - 손실 감소")
plt.grid(True)
plt.show()
```

### 관찰 포인트
- `requires_grad=True`의 역할을 이해했는가?
- `grad.zero_()`를 빼면 어떤 일이 발생하는가?
- 학습률(lr)을 0.1, 0.001로 바꾸면 수렴 속도가 어떻게 변하는가?

## 실습 3: nn.Module로 리팩토링 (30분)

1. PyTorch의 공식 패턴으로 모델을 작성한다:

```python
import torch.nn as nn
import torch.optim as optim

# 모델 정의
class LinearModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(1, 1)  # 입력 1, 출력 1

    def forward(self, x):
        return self.linear(x)

model = LinearModel()
print(f"모델 구조: {model}")
print(f"파라미터: {list(model.parameters())}")
```

2. 학습 루프를 구성한다:

```python
criterion = nn.MSELoss()
optimizer = optim.SGD(model.parameters(), lr=0.01)

losses = []
for epoch in range(200):
    # 순전파
    y_pred = model(x)
    loss = criterion(y_pred, y)

    # 역전파 + 업데이트
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    losses.append(loss.item())

    if (epoch + 1) % 50 == 0:
        print(f"Epoch {epoch+1}: loss={loss.item():.4f}")

# 학습된 파라미터 확인
w_learned = model.linear.weight.item()
b_learned = model.linear.bias.item()
print(f"\n학습 결과: w={w_learned:.4f}, b={b_learned:.4f}")
print(f"목표값:    w=2.0000, b=3.0000")
```

3. 결과 시각화:

```python
plt.figure(figsize=(10, 4))

plt.subplot(1, 2, 1)
plt.plot(losses)
plt.title("Loss 변화")
plt.xlabel("Epoch")

plt.subplot(1, 2, 2)
with torch.no_grad():
    y_pred = model(x)
plt.scatter(x.numpy(), y.numpy(), s=10, alpha=0.5, label="데이터")
plt.plot(x.numpy(), y_pred.numpy(), 'r-', linewidth=2, label="학습 결과")
plt.legend()
plt.title(f"y = {w_learned:.2f}x + {b_learned:.2f}")

plt.tight_layout()
plt.show()
```

### 관찰 포인트
- nn.Module 패턴(init + forward)을 이해했는가?
- optimizer.zero_grad() -> loss.backward() -> optimizer.step() 순서를 기억하는가?

## 과제

### 제출물: "선형 회귀 실험 보고서"

```markdown
# Day 3 과제: 선형 회귀

## 1. 학습률 실험
| 학습률 | 100 epoch 후 loss | 수렴 여부 |
|--------|-------------------|-----------|
| 0.001  |                   |           |
| 0.01   |                   |           |
| 0.1    |                   |           |

## 2. 다항 회귀 도전
- y = 0.5x^2 + 3x + 1 데이터에 2차 모델을 학습시킨 결과:
- 코드 스니펫:
- 학습 곡선 스크린샷:

## 3. 핵심 개념 정리
- 손실 함수의 역할:
- 경사 하강법이 최솟값을 찾는 원리:
- 학습률이 너무 크면/작으면 일어나는 일:
```

## 강사 참고 사항
- 수동 구현 -> nn.Module 순서로 진행하면 "왜 이렇게 쓰는지" 납득이 빠르다
- 학습률이 너무 크면 loss가 발산하는 것을 직접 보여주면 효과적이다
- 시간 여유가 있으면 Adam optimizer와 SGD를 비교해볼 수 있다
