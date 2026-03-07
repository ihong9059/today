export const lesson6_4_content = `
# GRU -- LSTM의 효율적인 동생

## 학습 목표
이 레슨을 완료하면:
- GRU(Gated Recurrent Unit)가 LSTM을 어떻게 단순화했는지 이해한다
- 리셋 게이트와 업데이트 게이트의 역할을 설명할 수 있다
- LSTM과 GRU의 구조적 차이를 비교할 수 있다
- 프로젝트에서 LSTM과 GRU 중 어떤 것을 선택할지 판단할 수 있다
- numpy로 GRU의 동작을 시각화할 수 있다

---

## 핵심 메시지
> **"GRU는 LSTM의 핵심 아이디어를 유지하면서 구조를 단순화한 모델이다."**
> LSTM은 3개의 게이트와 2개의 상태를 가지지만,
> GRU는 2개의 게이트와 1개의 상태만으로 비슷한 성능을 냅니다.
> 더 적은 파라미터 = 더 빠른 학습 = 더 적은 메모리.

---

## 비유: LSTM vs GRU

> **비유**: LSTM이 "노트북 + 머릿속 기억"을 동시에 사용하는 학생이라면,
> GRU는 "머릿속 기억 하나로 똑똑하게 관리하는 학생"입니다.
>
> LSTM 학생:
> - 노트북(셀 상태)에 장기 메모 기록
> - 머릿속(은닉 상태)에 단기 정보 유지
> - 지우개/펜/형광펜 3가지 도구 사용
>
> GRU 학생:
> - 머릿속(은닉 상태) 하나로 모든 것을 관리
> - "리셋 버튼"과 "블렌딩 슬라이더" 2가지 도구만 사용
> - 도구가 적지만 결과는 비슷하게 좋음!

---

## GRU의 핵심 아이디어

GRU는 2014년 Cho 등이 제안했습니다. LSTM과의 주요 차이점:

| 특성 | LSTM | GRU |
|------|------|-----|
| 게이트 수 | 3개 (망각/입력/출력) | 2개 (리셋/업데이트) |
| 상태 | 셀 상태(C) + 은닉 상태(h) | 은닉 상태(h)만 |
| 파라미터 수 | 8 * hidden^2 | 6 * hidden^2 |
| 학습 속도 | 느림 | 빠름 |
| 메모리 | 많이 사용 | 적게 사용 |

---

## 게이트 1: 리셋 게이트 (Reset Gate)

**"이전 기억을 얼마나 무시할까?"** 를 결정합니다.

\\\`\\\`\\\`text
r_t = sigmoid(W_r * [h_(t-1), x_t] + b_r)

r_t의 값:
  0에 가까우면 --> 이전 은닉 상태를 거의 무시 (과거 리셋)
  1에 가까우면 --> 이전 은닉 상태를 그대로 참고

LSTM의 "망각 게이트"와 비슷하지만,
직접 셀 상태를 지우는 것이 아니라
"후보 은닉 상태를 만들 때" 과거를 얼마나 참고할지를 결정합니다.
\\\`\\\`\\\`

---

## 게이트 2: 업데이트 게이트 (Update Gate)

**"이전 상태와 새 정보를 어떤 비율로 섞을까?"** 를 결정합니다.

\\\`\\\`\\\`text
z_t = sigmoid(W_z * [h_(t-1), x_t] + b_z)

핵심 아이디어: z_t 하나로 "잊기"와 "기억하기"를 동시에 처리!

z_t가 크면 (예: 0.9):
  --> 이전 상태의 90%를 유지, 새 정보는 10%만 반영
  --> "변화가 적은" 상태 (기존 기억 유지)

z_t가 작으면 (예: 0.1):
  --> 이전 상태의 10%만 유지, 새 정보를 90% 반영
  --> "큰 변화" (새 정보로 업데이트)

LSTM에서는 망각 게이트(f)와 입력 게이트(i)가 별도였지만,
GRU에서는 z_t와 (1-z_t)로 하나의 게이트가 두 역할을 합니다!
\\\`\\\`\\\`

---

## 후보 은닉 상태와 최종 업데이트

\\\`\\\`\\\`text
Step 1: 후보 은닉 상태 생성
  h_t~ = tanh(W_h * [r_t * h_(t-1), x_t] + b_h)

  r_t * h_(t-1): 리셋 게이트로 필터링된 과거 정보
  이 과거 정보 + 현재 입력으로 "후보" 은닉 상태를 만듦

Step 2: 최종 은닉 상태 (가중 평균)
  h_t = z_t * h_(t-1) + (1 - z_t) * h_t~

  z_t * h_(t-1):     이전 상태에서 유지할 부분
  (1-z_t) * h_t~:    새로 추가할 부분
  --> 두 값의 가중 평균!
\\\`\\\`\\\`

---

## GRU 전체 흐름 정리

\\\`\\\`\\\`text
입력: x_t, h_(t-1)

Step 1 (Reset):    r_t = sigmoid(W_r * [h_(t-1), x_t] + b_r)
Step 2 (Update):   z_t = sigmoid(W_z * [h_(t-1), x_t] + b_z)
Step 3 (Candidate): h_t~ = tanh(W_h * [r_t * h_(t-1), x_t] + b_h)
Step 4 (Output):   h_t = z_t * h_(t-1) + (1 - z_t) * h_t~

출력: h_t

주목: LSTM과 달리 셀 상태(C)가 없습니다!
은닉 상태(h) 하나로 모든 것을 처리합니다.
\\\`\\\`\\\`

---

## LSTM과 GRU 게이트 대응 관계

| LSTM | GRU | 설명 |
|------|-----|------|
| 망각 게이트 (f_t) | 업데이트 게이트 (z_t) | 이전 정보 유지 비율 |
| 입력 게이트 (i_t) | (1 - z_t) | 새 정보 반영 비율 |
| 출력 게이트 (o_t) | 없음 | GRU는 은닉 상태를 그대로 출력 |
| 셀 상태 (C_t) | 없음 | GRU는 은닉 상태만 사용 |
| - | 리셋 게이트 (r_t) | 후보 생성 시 과거 참조 정도 |

핵심 차이: LSTM은 f_t와 i_t가 **독립적**이지만, GRU는 z_t와 (1-z_t)로 **연동**됩니다.
즉, "잊는 만큼 새로 채운다"는 제약이 있습니다.

---

## 실행해보기: GRU 게이트 시각화

\\\`\\\`\\\`python
import numpy as np
import matplotlib.pyplot as plt

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

np.random.seed(42)

input_size = 3
hidden_size = 4

W_r = np.random.randn(hidden_size, input_size + hidden_size) * 0.5
W_z = np.random.randn(hidden_size, input_size + hidden_size) * 0.5
W_h = np.random.randn(hidden_size, input_size + hidden_size) * 0.5
b_r = np.zeros(hidden_size)
b_z = np.zeros(hidden_size)
b_h = np.zeros(hidden_size)

seq_len = 30
X = np.sin(np.linspace(0, 4 * np.pi, seq_len)).reshape(-1, 1)
X = np.hstack([X, np.random.randn(seq_len, input_size - 1) * 0.3])

h = np.zeros(hidden_size)

reset_vals = []
update_vals = []
hidden_vals = []

for t in range(seq_len):
    combined = np.concatenate([h, X[t]])

    r = sigmoid(W_r @ combined + b_r)       # 리셋 게이트
    z = sigmoid(W_z @ combined + b_z)       # 업데이트 게이트

    combined_r = np.concatenate([r * h, X[t]])
    h_tilde = np.tanh(W_h @ combined_r + b_h)  # 후보 은닉

    h = z * h + (1 - z) * h_tilde           # 최종 은닉

    reset_vals.append(r.mean())
    update_vals.append(z.mean())
    hidden_vals.append(h.mean())

fig, axes = plt.subplots(3, 1, figsize=(12, 8))

axes[0].plot(reset_vals, color="coral", linewidth=2)
axes[0].set_title("Reset Gate (avg)")
axes[0].set_ylim(0, 1)
axes[0].set_ylabel("Gate value")

axes[1].plot(update_vals, color="green", linewidth=2)
axes[1].set_title("Update Gate (avg)")
axes[1].set_ylim(0, 1)
axes[1].set_ylabel("Gate value")

axes[2].plot(hidden_vals, color="steelblue", linewidth=2)
axes[2].set_title("Hidden State (avg)")
axes[2].set_xlabel("Time step")
axes[2].set_ylabel("h value")

plt.tight_layout()
plt.savefig("gru_gates.png", dpi=100)
plt.show()

print("Reset Gate:  close to 0 = ignore past, close to 1 = use past")
print("Update Gate: close to 1 = keep old state, close to 0 = use new candidate")
print("GRU uses only 2 gates instead of LSTM\\'s 3!")
\\\`\\\`\\\`

---

## 실행해보기: LSTM vs GRU 파라미터 수 비교

\\\`\\\`\\\`python
import numpy as np

def count_params(input_size, hidden_size, model_type):
    if model_type == "RNN":
        # W_xh + W_hh + b
        return hidden_size * input_size + hidden_size * hidden_size + hidden_size
    elif model_type == "LSTM":
        # 4 sets of (W_xh + W_hh + b) for f, i, c, o gates
        per_gate = hidden_size * input_size + hidden_size * hidden_size + hidden_size
        return 4 * per_gate
    elif model_type == "GRU":
        # 3 sets of (W_xh + W_hh + b) for r, z, h gates
        per_gate = hidden_size * input_size + hidden_size * hidden_size + hidden_size
        return 3 * per_gate

input_sizes = [10, 50, 100]
hidden_sizes = [32, 64, 128, 256]

print(f"{'Input':>6} {'Hidden':>7} {'RNN':>10} {'GRU':>10} {'LSTM':>10} {'GRU/LSTM':>10}")
print("-" * 60)

for inp in input_sizes:
    for hid in hidden_sizes:
        rnn_p = count_params(inp, hid, "RNN")
        gru_p = count_params(inp, hid, "GRU")
        lstm_p = count_params(inp, hid, "LSTM")
        ratio = gru_p / lstm_p
        print(f"{inp:>6} {hid:>7} {rnn_p:>10,} {gru_p:>10,} {lstm_p:>10,} {ratio:>10.1%}")

print()
print("GRU always has 75% of LSTM\\'s parameters (3/4 ratio)")
print("This means faster training and less memory!")
\\\`\\\`\\\`

---

## 언제 무엇을 선택할까?

### GRU를 선택하는 경우

\\\`\\\`\\\`text
1. 데이터셋이 작을 때
   --> 파라미터가 적어서 과적합 위험이 낮음

2. 빠른 실험이 필요할 때
   --> 학습 시간이 LSTM보다 짧음

3. 메모리가 제한적일 때
   --> GPU 메모리를 적게 사용

4. 시퀀스가 비교적 짧을 때 (< 100 스텝)
   --> 짧은 시퀀스에서는 LSTM과 성능 차이가 거의 없음
\\\`\\\`\\\`

### LSTM을 선택하는 경우

\\\`\\\`\\\`text
1. 매우 긴 시퀀스를 다룰 때 (> 500 스텝)
   --> 셀 상태 덕분에 장기 의존성을 더 잘 포착

2. 데이터가 충분히 많을 때
   --> 더 많은 파라미터를 학습시킬 여유가 있음

3. 정교한 기억 제어가 필요할 때
   --> 출력 게이트가 세밀한 제어를 제공

4. 최고 정확도가 중요할 때
   --> 약간이라도 더 나은 성능이 필요한 경우
\\\`\\\`\\\`

### 실무 팁

\\\`\\\`\\\`text
실무에서의 선택 전략:

1단계: GRU로 빠르게 프로토타입 만들기
2단계: 성능이 부족하면 LSTM으로 교체
3단계: 둘 다 비슷하면 GRU 유지 (더 효율적)

요즘은 Transformer가 대부분의 시퀀스 작업을 대체하고 있지만,
작은 데이터셋이나 실시간 처리에서는 여전히 GRU/LSTM이 유용합니다.
\\\`\\\`\\\`

---

## PyTorch에서 GRU 사용 (참고)

\\\`\\\`\\\`text
import torch
import torch.nn as nn

# GRU는 LSTM과 거의 동일한 인터페이스
gru = nn.GRU(
    input_size=10,
    hidden_size=20,
    num_layers=2,
    batch_first=True,
    dropout=0.3,
    bidirectional=True
)

x = torch.randn(32, 15, 10)
h0 = torch.zeros(4, 32, 20)    # (layers*방향, 배치, 은닉)

# LSTM과 달리 셀 상태(c0)가 없음!
output, hn = gru(x, h0)
print(f"output: {output.shape}")   # (32, 15, 40)
print(f"hn: {hn.shape}")           # (4, 32, 20)
# 반환값도 (output, hn)만 -- (output, (hn, cn))이 아님!
\\\`\\\`\\\`

---

## 세 모델 최종 비교

| 특성 | RNN | LSTM | GRU |
|------|-----|------|-----|
| 게이트 수 | 0 | 3 | 2 |
| 상태 수 | 1 (h) | 2 (h, C) | 1 (h) |
| 파라미터 비율 | 1x | 4x | 3x |
| 장기 기억 | 매우 약함 | 강함 | 양호 |
| 학습 속도 | 빠름 | 느림 | 중간 |
| 구현 복잡도 | 단순 | 복잡 | 중간 |
| 짧은 시퀀스 | 보통 | 좋음 | 좋음 |
| 긴 시퀀스 | 나쁨 | 매우 좋음 | 좋음 |

---

## 핵심 요약

| 개념 | 설명 | 비유 |
|------|------|------|
| GRU | LSTM을 단순화한 게이트 순환 유닛 | 도구 2개로 효율적 학습하는 학생 |
| 리셋 게이트 (r) | 후보 생성 시 과거 참조 정도 결정 | "과거를 얼마나 참고할까?" |
| 업데이트 게이트 (z) | 이전/새 정보의 혼합 비율 결정 | "블렌딩 슬라이더" |
| 셀 상태 없음 | 은닉 상태 하나로 통합 | 노트북 없이 머릿속만 사용 |
| z와 (1-z) 연동 | 잊는 만큼 새로 채움 | 하나의 슬라이더로 두 역할 |

---

## 학습 체크리스트

- [ ] GRU가 LSTM을 어떻게 단순화했는지 설명할 수 있다
- [ ] 리셋 게이트와 업데이트 게이트의 역할을 각각 말할 수 있다
- [ ] LSTM의 게이트와 GRU의 게이트 대응 관계를 안다
- [ ] GRU가 LSTM보다 유리한 상황 3가지를 말할 수 있다
- [ ] h_t = z_t * h_(t-1) + (1-z_t) * h_t~ 공식의 의미를 이해한다

---

## 다음 레슨 예고
다음 시간에는 RNN/LSTM/GRU에 텍스트를 입력하기 위한 **텍스트 전처리** 방법을 배웁니다.
`;
