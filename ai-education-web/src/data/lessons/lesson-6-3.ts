export const lesson6_3_content = `
# LSTM -- 장기 기억의 비밀

## 학습 목표
이 레슨을 완료하면:
- RNN의 기울기 소실(Vanishing Gradient) 문제가 왜 발생하는지 이해한다
- LSTM이 이 문제를 어떻게 해결하는지 직관적으로 설명할 수 있다
- 셀 상태(Cell State)와 세 가지 게이트(망각/입력/출력)의 역할을 안다
- numpy로 LSTM 게이트 동작을 시각화할 수 있다
- PyTorch에서 LSTM을 사용하는 방법을 참고할 수 있다

---

## 핵심 메시지
> **"LSTM은 정보를 선택적으로 기억하고, 선택적으로 잊고, 선택적으로 출력하는 구조이다."**
> 일반 RNN은 모든 정보를 하나의 은닉 상태에 뭉뚱그려 넣다 보니 오래된 정보가 사라집니다.
> LSTM은 "무엇을 기억할지, 무엇을 잊을지, 무엇을 출력할지"를 각각 별도로 결정합니다.

---

## 먼저: RNN은 왜 실패하는가?

### 기울기 소실 문제

> **비유**: 전화기 게임(일명 "중국 속삭이기")을 떠올려 보세요.
> 10명이 줄을 서서 첫 번째 사람이 한 마디를 속삭이면,
> 마지막 사람에게 도달할 때쯤 원래 내용이 완전히 바뀌어 있습니다.
>
> RNN에서도 비슷한 일이 일어납니다.
> 시퀀스가 길어지면 초기 정보가 은닉 상태를 거치면서 점점 "희석"됩니다.

수학적으로 보면, RNN의 역전파에서 기울기는 가중치를 **반복적으로 곱합니다**.

\`\`\`text
기울기 = W_hh * W_hh * W_hh * ... (T번 반복)

W_hh가 1보다 작으면:  0.8^20 = 0.012  --> 거의 0 (기울기 소실)
W_hh가 1보다 크면:    1.2^20 = 38.3   --> 폭발적 증가 (기울기 폭발)
\`\`\`

### 실행해보기: 기울기 소실/폭발 시각화

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

def gradient_flow(w_value, steps=50):
    gradients = []
    grad = 1.0
    for t in range(steps):
        grad *= w_value
        gradients.append(grad)
    return gradients

vanishing = gradient_flow(0.8, 50)
stable    = gradient_flow(1.0, 50)
exploding = gradient_flow(1.2, 50)

fig, axes = plt.subplots(1, 3, figsize=(15, 4))

axes[0].plot(vanishing, color="steelblue", linewidth=2)
axes[0].set_title("W=0.8: Vanishing Gradient")
axes[0].set_xlabel("Time steps back")
axes[0].set_ylabel("Gradient magnitude")
axes[0].set_yscale("log")

axes[1].plot(stable, color="green", linewidth=2)
axes[1].set_title("W=1.0: Stable (ideal)")
axes[1].set_xlabel("Time steps back")
axes[1].set_ylabel("Gradient magnitude")

axes[2].plot(exploding, color="coral", linewidth=2)
axes[2].set_title("W=1.2: Exploding Gradient")
axes[2].set_xlabel("Time steps back")
axes[2].set_ylabel("Gradient magnitude")
axes[2].set_yscale("log")

plt.tight_layout()
plt.savefig("gradient_problems.png", dpi=100)
plt.show()

print(f"W=0.8, 50 steps: gradient = {0.8**50:.2e}  (vanished!)")
print(f"W=1.0, 50 steps: gradient = {1.0**50:.2e}  (stable)")
print(f"W=1.2, 50 steps: gradient = {1.2**50:.2e}  (exploded!)")
\`\`\`

### 장기 의존성 문제의 실제 예

\`\`\`text
"나는 프랑스에서 태어났다. ... (중간에 50개 문장) ...
 그래서 나는 [???]를 할 수 있다."

정답: "프랑스어"
하지만 RNN은 50개 문장을 거치면서 "프랑스" 정보를 잃어버림
--> 엉뚱한 답을 내놓게 됩니다.
\`\`\`

---

## LSTM의 등장: 노트북 비유

> **비유**: LSTM은 "노트북을 사용하는 학생"과 같습니다.
>
> - **셀 상태(Cell State)** = 노트북의 메모 페이지 (장기 기억)
> - **망각 게이트(Forget Gate)** = 지우개 (불필요한 메모 삭제)
> - **입력 게이트(Input Gate)** = 펜 (새로운 내용 기록)
> - **출력 게이트(Output Gate)** = 형광펜 (시험에 필요한 부분만 체크)
>
> 일반 RNN은 모든 것을 머릿속(은닉 상태 하나)에만 담으려 하지만,
> LSTM은 **노트북(셀 상태)**을 따로 가지고 있어서
> 중요한 정보를 오래 보관할 수 있습니다.

---

## LSTM의 구조: 두 개의 상태

LSTM은 RNN과 달리 **두 가지 상태**를 유지합니다.

| 상태 | 역할 | 비유 |
|------|------|------|
| **셀 상태 C_t** | 장기 기억 저장소 | 노트북 페이지 |
| **은닉 상태 h_t** | 단기 기억 / 출력 | 머릿속 작업 기억 |

\`\`\`text
셀 상태 흐름 (장기 기억):

C_0 ----> C_1 ----> C_2 ----> C_3 ----> ...
           |          |          |
        (약간의 수정만 발생 -- 정보가 잘 유지됨!)

은닉 상태 (단기 기억/출력):
h_0, h_1, h_2, h_3, ...  (매 시점 출력에 사용)
\`\`\`

셀 상태는 **컨베이어 벨트**처럼 정보가 거의 그대로 흘러갑니다.
덧셈과 곱셈만 거치기 때문에 기울기가 쉽게 전파됩니다.

---

## 게이트 1: 망각 게이트 (Forget Gate)

**"이전 기억 중 무엇을 버릴까?"** 를 결정합니다.

\`\`\`text
f_t = sigmoid(W_f * [h_(t-1), x_t] + b_f)

f_t의 값:
  0에 가까우면 --> 해당 정보 삭제 (잊기)
  1에 가까우면 --> 해당 정보 유지 (기억)

예시:
  "나는 서울에 산다. 그녀는 부산에 산다."
  "그녀는"이 나오면 --> 주어가 바뀌었으므로
  --> "나는" 관련 정보를 잊고(f=0), "그녀는" 정보를 새로 기억
\`\`\`

---

## 게이트 2: 입력 게이트 (Input Gate)

**"새로운 정보 중 무엇을 저장할까?"** 를 결정합니다.

\`\`\`text
i_t   = sigmoid(W_i * [h_(t-1), x_t] + b_i)   # 무엇을 저장할지 (0~1)
C_t~  = tanh(W_C * [h_(t-1), x_t] + b_C)      # 저장할 후보 값 (-1~+1)

i_t는 "저장 여부를 결정하는 문지기"
C_t~는 "저장할 새 정보 후보"

실제로 저장되는 양 = i_t * C_t~
\`\`\`

---

## 셀 상태 업데이트

망각과 입력을 합쳐서 **새로운 셀 상태**를 만듭니다.

\`\`\`text
C_t = f_t * C_(t-1)  +  i_t * C_t~
      ~~~~~~~~~~~~~~~    ~~~~~~~~~~~~
      이전 기억 중         새로 추가할
      유지할 부분          정보

이것이 LSTM의 핵심입니다!
기울기가 C를 통해 거의 그대로 흘러갈 수 있어서
장기 기억이 가능합니다.
\`\`\`

---

## 게이트 3: 출력 게이트 (Output Gate)

**"셀 상태 중 무엇을 밖으로 내보낼까?"** 를 결정합니다.

\`\`\`text
o_t = sigmoid(W_o * [h_(t-1), x_t] + b_o)   # 출력 비율 (0~1)
h_t = o_t * tanh(C_t)                        # 최종 은닉 상태

셀 상태 전체를 내보내는 것이 아니라,
필요한 부분만 걸러서 은닉 상태(h_t)로 출력합니다.
\`\`\`

---

## LSTM 전체 흐름 정리

\`\`\`text
입력: x_t, h_(t-1), C_(t-1)

Step 1 (Forget):   f_t = sigmoid(W_f * [h_(t-1), x_t] + b_f)
Step 2 (Input):    i_t = sigmoid(W_i * [h_(t-1), x_t] + b_i)
                   C_t~ = tanh(W_C * [h_(t-1), x_t] + b_C)
Step 3 (Update):   C_t = f_t * C_(t-1) + i_t * C_t~
Step 4 (Output):   o_t = sigmoid(W_o * [h_(t-1), x_t] + b_o)
                   h_t = o_t * tanh(C_t)

출력: h_t, C_t
\`\`\`

---

## 실행해보기: LSTM 게이트 동작 시각화

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

np.random.seed(42)

input_size = 3
hidden_size = 4

W_f = np.random.randn(hidden_size, input_size + hidden_size) * 0.5
W_i = np.random.randn(hidden_size, input_size + hidden_size) * 0.5
W_c = np.random.randn(hidden_size, input_size + hidden_size) * 0.5
W_o = np.random.randn(hidden_size, input_size + hidden_size) * 0.5
b_f = np.zeros(hidden_size)
b_i = np.zeros(hidden_size)
b_c = np.zeros(hidden_size)
b_o = np.zeros(hidden_size)

seq_len = 20
X = np.random.randn(seq_len, input_size)

h = np.zeros(hidden_size)
C = np.zeros(hidden_size)

forget_vals = []
input_vals = []
output_vals = []
cell_vals = []

for t in range(seq_len):
    combined = np.concatenate([h, X[t]])
    f = sigmoid(W_f @ combined + b_f)
    i = sigmoid(W_i @ combined + b_i)
    C_tilde = np.tanh(W_c @ combined + b_c)
    C = f * C + i * C_tilde
    o = sigmoid(W_o @ combined + b_o)
    h = o * np.tanh(C)

    forget_vals.append(f.mean())
    input_vals.append(i.mean())
    output_vals.append(o.mean())
    cell_vals.append(C.mean())

fig, axes = plt.subplots(2, 2, figsize=(12, 8))

axes[0,0].plot(forget_vals, color="coral", linewidth=2)
axes[0,0].set_title("Forget Gate (avg)")
axes[0,0].set_ylim(0, 1)
axes[0,0].set_ylabel("Gate value")

axes[0,1].plot(input_vals, color="green", linewidth=2)
axes[0,1].set_title("Input Gate (avg)")
axes[0,1].set_ylim(0, 1)

axes[1,0].plot(output_vals, color="purple", linewidth=2)
axes[1,0].set_title("Output Gate (avg)")
axes[1,0].set_ylim(0, 1)
axes[1,0].set_xlabel("Time step")
axes[1,0].set_ylabel("Gate value")

axes[1,1].plot(cell_vals, color="steelblue", linewidth=2)
axes[1,1].set_title("Cell State (avg)")
axes[1,1].set_xlabel("Time step")

plt.tight_layout()
plt.savefig("lstm_gates.png", dpi=100)
plt.show()

print("Forget Gate: close to 1 = keep memory, close to 0 = erase")
print("Input Gate:  close to 1 = write new info, close to 0 = skip")
print("Output Gate: close to 1 = expose cell, close to 0 = hide")
\`\`\`

---

## RNN vs LSTM 비교

| 특성 | RNN | LSTM |
|------|-----|------|
| 상태 | 은닉 상태(h) 1개 | 셀 상태(C) + 은닉 상태(h) |
| 게이트 | 없음 | 3개 (망각/입력/출력) |
| 장기 기억 | 어려움 (기울기 소실) | 가능 (셀 상태 통로) |
| 파라미터 수 | 적음 | 많음 (약 4배) |
| 학습 속도 | 빠름 | 느림 |
| 사용 시기 | 짧은 시퀀스, 간단한 패턴 | 긴 시퀀스, 복잡한 의존성 |

---

## PyTorch에서 LSTM 사용 (참고)

\`\`\`python
import torch
import torch.nn as nn

lstm = nn.LSTM(
    input_size=10,
    hidden_size=20,
    num_layers=2,
    batch_first=True,
    dropout=0.3,
    bidirectional=True
)

x = torch.randn(32, 15, 10)   # (배치, 시퀀스, 입력)
h0 = torch.zeros(4, 32, 20)   # (layers*방향, 배치, 은닉)
c0 = torch.zeros(4, 32, 20)

output, (hn, cn) = lstm(x, (h0, c0))
print(f"output: {output.shape}")   # (32, 15, 40)
print(f"hn: {hn.shape}")           # (4, 32, 20)
print(f"cn: {cn.shape}")           # (4, 32, 20)
\`\`\`

---

## 핵심 요약

| 구성 요소 | 역할 | 활성화 함수 | 비유 |
|-----------|------|-------------|------|
| 망각 게이트 (f) | 이전 기억 중 버릴 것 결정 | Sigmoid (0~1) | 지우개 |
| 입력 게이트 (i) | 새 정보 중 저장할 것 결정 | Sigmoid (0~1) | 펜 |
| 후보 셀 (C~) | 저장할 새 정보 생성 | Tanh (-1~1) | 필기 내용 |
| 출력 게이트 (o) | 셀에서 내보낼 것 결정 | Sigmoid (0~1) | 형광펜 |
| 셀 상태 (C) | 장기 기억 저장소 | - | 노트북 페이지 |
| 은닉 상태 (h) | 단기 기억 / 외부 출력 | Tanh | 머릿속 작업 기억 |

---

## 학습 체크리스트

- [ ] 기울기 소실이 왜 발생하는지 "반복 곱셈"으로 설명할 수 있다
- [ ] LSTM의 셀 상태가 기울기 소실을 어떻게 완화하는지 안다
- [ ] 망각/입력/출력 게이트 각각의 역할을 비유로 설명할 수 있다
- [ ] C_t = f_t * C_(t-1) + i_t * C_t~ 공식의 의미를 안다
- [ ] RNN과 LSTM의 차이를 3가지 이상 말할 수 있다

---

## 다음 레슨 예고
다음 시간에는 LSTM을 더 단순하게 만든 **GRU(Gated Recurrent Unit)**를 배우고, LSTM과 어떤 차이가 있는지, 언제 어떤 것을 선택해야 하는지 알아봅니다.
`;
