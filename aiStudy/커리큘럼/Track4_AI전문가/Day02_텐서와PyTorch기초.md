# Day 2: 텐서 + PyTorch 기초 — "데이터의 언어, 텐서를 배운다"

## 학습 목표
- 텐서의 개념과 차원(스칼라, 벡터, 행렬, 3D 텐서)을 이해한다
- PyTorch 텐서 생성, 연산, 변환을 능숙하게 다룬다
- NumPy와 PyTorch 텐서 간 변환을 수행한다
- GPU에 텐서를 올리고 연산 속도 차이를 체감한다

## 준비물
- Google Colab (GPU 런타임)
- Day 1 환경 설정 완료

## 실습 1: 텐서 생성과 기본 연산 (30분)

1. 다양한 방법으로 텐서를 생성한다:

```python
import torch

# 직접 생성
scalar = torch.tensor(42)
vector = torch.tensor([1, 2, 3, 4, 5])
matrix = torch.tensor([[1, 2, 3], [4, 5, 6]])
tensor_3d = torch.randn(2, 3, 4)

print(f"스칼라: shape={scalar.shape}, dim={scalar.dim()}")
print(f"벡터: shape={vector.shape}, dim={vector.dim()}")
print(f"행렬: shape={matrix.shape}, dim={matrix.dim()}")
print(f"3D텐서: shape={tensor_3d.shape}, dim={tensor_3d.dim()}")
```

2. 특수 텐서 생성:

```python
zeros = torch.zeros(3, 4)
ones = torch.ones(2, 3)
rand = torch.rand(3, 3)          # 0~1 균일분포
randn = torch.randn(3, 3)        # 표준정규분포
arange = torch.arange(0, 10, 2)  # [0, 2, 4, 6, 8]
linspace = torch.linspace(0, 1, 5)  # 균등 간격 5개

print(f"zeros:\n{zeros}")
print(f"randn:\n{randn}")
print(f"arange: {arange}")
```

3. 텐서 연산:

```python
a = torch.tensor([[1., 2.], [3., 4.]])
b = torch.tensor([[5., 6.], [7., 8.]])

print(f"덧셈: {a + b}")
print(f"곱셈(원소별): {a * b}")
print(f"행렬곱: {a @ b}")
print(f"전치: {a.T}")
print(f"합계: {a.sum()}, 평균: {a.mean()}")
print(f"최대값: {a.max()}, 최소값: {a.min()}")
```

### 관찰 포인트
- shape과 dim의 관계를 이해했는가?
- 원소별 곱셈(*)과 행렬곱(@)의 차이를 구분할 수 있는가?

## 실습 2: NumPy 변환과 데이터 타입 (20분)

1. NumPy와 PyTorch 간 변환:

```python
import numpy as np

# NumPy -> PyTorch
np_array = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.float32)
tensor_from_np = torch.from_numpy(np_array)
print(f"NumPy -> Tensor: {tensor_from_np}")

# PyTorch -> NumPy
tensor = torch.randn(3, 3)
np_from_tensor = tensor.numpy()
print(f"Tensor -> NumPy: {np_from_tensor}")

# 주의: 메모리 공유됨!
np_array[0, 0] = 999
print(f"NumPy 변경 후 Tensor: {tensor_from_np[0, 0]}")  # 999
```

2. 데이터 타입 확인 및 변환:

```python
int_tensor = torch.tensor([1, 2, 3])
print(f"기본 정수 타입: {int_tensor.dtype}")  # torch.int64

float_tensor = int_tensor.float()  # torch.float32로 변환
print(f"float 변환 후: {float_tensor.dtype}")

half_tensor = float_tensor.half()  # torch.float16 (FP16)
print(f"half 변환 후: {half_tensor.dtype}")
```

### 관찰 포인트
- `from_numpy()`는 메모리를 공유한다는 점을 인지했는가?
- float32가 딥러닝에서 기본 타입인 이유를 이해했는가?

## 실습 3: GPU 연산과 속도 비교 (30분)

1. GPU에 텐서 올리기:

```python
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"사용 디바이스: {device}")

# CPU 텐서 -> GPU 텐서
cpu_tensor = torch.randn(1000, 1000)
gpu_tensor = cpu_tensor.to(device)
print(f"CPU 텐서 위치: {cpu_tensor.device}")
print(f"GPU 텐서 위치: {gpu_tensor.device}")
```

2. CPU vs GPU 속도 비교:

```python
import time

size = 5000

# CPU 행렬곱
a_cpu = torch.randn(size, size)
b_cpu = torch.randn(size, size)

start = time.time()
c_cpu = a_cpu @ b_cpu
cpu_time = time.time() - start
print(f"CPU 행렬곱: {cpu_time:.4f}초")

# GPU 행렬곱
a_gpu = a_cpu.to(device)
b_gpu = b_cpu.to(device)

# 워밍업 (첫 실행은 느림)
_ = a_gpu @ b_gpu
torch.cuda.synchronize()

start = time.time()
c_gpu = a_gpu @ b_gpu
torch.cuda.synchronize()
gpu_time = time.time() - start
print(f"GPU 행렬곱: {gpu_time:.4f}초")
print(f"GPU 속도 향상: {cpu_time / gpu_time:.1f}배")
```

3. reshape과 view 연습:

```python
x = torch.arange(12)
print(f"원본: {x.shape}")

reshaped = x.reshape(3, 4)
print(f"reshape(3,4):\n{reshaped}")

viewed = x.view(2, 6)
print(f"view(2,6):\n{viewed}")

# -1은 자동 계산
auto = x.reshape(2, -1)  # 2 x 6
print(f"reshape(2,-1): {auto.shape}")

# flatten
flat = reshaped.flatten()
print(f"flatten: {flat.shape}")
```

### 관찰 포인트
- GPU가 CPU보다 몇 배 빠른지 직접 확인했는가?
- `torch.cuda.synchronize()`가 필요한 이유를 이해했는가?

## 과제

### 제출물: "텐서 연산 실습 노트북"

```markdown
# Day 2 과제: 텐서 마스터

## 1. 텐서 연산 결과
- 3x3 단위행렬과 랜덤 행렬의 곱 결과:
- 브로드캐스팅 예제 3개 실행 결과:

## 2. GPU 속도 비교
- 행렬 크기별 CPU/GPU 시간 비교표:
| 크기     | CPU 시간 | GPU 시간 | 속도 향상 |
|----------|----------|----------|-----------|
| 1000x1000|          |          |           |
| 3000x3000|          |          |           |
| 5000x5000|          |          |           |

## 3. 도전 과제
- 이미지(3x224x224)를 배치(batch) 텐서(Bx3x224x224)로 만드는 코드:
```

## 강사 참고 사항
- 브로드캐스팅 개념은 시각적으로 설명하면 이해가 빠르다
- GPU 워밍업 없이 측정하면 결과가 왜곡되므로 반드시 워밍업 후 측정
- view vs reshape 차이(contiguous 여부)는 간단히 언급만 하고 넘어간다
