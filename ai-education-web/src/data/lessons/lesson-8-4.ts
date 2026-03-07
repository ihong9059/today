export const lesson8_4_content = `
# 행렬 곱셈 최적화

## 학습 목표
이 레슨을 완료하면:
- Naive(기본) 행렬 곱셈의 구조와 문제점을 이해한다
- Tiled(타일) 행렬 곱셈이 왜 더 빠른지 설명할 수 있다
- Shared Memory를 활용한 최적화 원리를 이해한다
- NumPy로 행렬 곱셈 성능을 직접 비교할 수 있다

---

## 핵심 메시지
> **"같은 데이터를 100번 읽으러 창고에 가지 말고, 한 번 가져와서 책상에 놓고 100번 쓰자."**
> 이것이 타일링(Tiling) 최적화의 핵심 아이디어입니다.

---

## 행렬 곱셈이 왜 중요한가

딥러닝에서 **거의 모든 연산은 행렬 곱셈**으로 귀결됩니다.

| 딥러닝 연산 | 실제 내용 |
|------------|----------|
| 순전파 (Forward Pass) | 가중치 행렬 x 입력 행렬 |
| 역전파 (Backward Pass) | 전치 행렬 x 그래디언트 행렬 |
| Attention (Transformer) | Q x K^T, Attention x V |
| Convolution | im2col 변환 후 행렬 곱셈 |

따라서 **행렬 곱셈을 1%만 빠르게 해도** 전체 학습 시간이 크게 줄어듭니다.
GPT-4 같은 대규모 모델은 학습에 수백만 달러가 드는데, 1% 최적화만으로도 수만 달러를 절약할 수 있습니다.

---

## 행렬 곱셈 기본 원리 복습

행렬 C = A x B 에서, C의 각 원소는 A의 한 행과 B의 한 열의 **내적(dot product)**입니다.

\`\`\`text
A (M x K)  x  B (K x N)  =  C (M x N)

C[i][j] = A[i][0]*B[0][j] + A[i][1]*B[1][j] + ... + A[i][K-1]*B[K-1][j]
         = sum(A[i][k] * B[k][j]) for k = 0 to K-1

예시: 2x3 행렬 x 3x2 행렬 = 2x2 행렬

[1 2 3]   [7  8]   [1*7+2*9+3*11  1*8+2*10+3*12]   [58  64]
[4 5 6] x [9 10] = [4*7+5*9+6*11  4*8+5*10+6*12] = [139 154]
          [11 12]
\`\`\`

---

## 실행해보기: 행렬 곱셈 직접 구현과 비교

세 가지 방법으로 행렬 곱셈을 구현하고 속도를 비교해 봅시다.

\`\`\`python
import numpy as np
import time

# 행렬 크기 설정
M, K, N = 200, 300, 200
A = np.random.rand(M, K).astype(np.float32)
B = np.random.rand(K, N).astype(np.float32)

# 방법 1: 3중 반복문 (Naive 방식 - GPU의 Naive 커널과 동일한 구조)
start = time.time()
C_naive = np.zeros((M, N), dtype=np.float32)
for i in range(M):
    for j in range(N):
        total = 0.0
        for k in range(K):
            total += A[i, k] * B[k, j]
        C_naive[i, j] = total
naive_time = time.time() - start

# 방법 2: 내적 활용 (중간 최적화)
start = time.time()
C_dot = np.zeros((M, N), dtype=np.float32)
for i in range(M):
    for j in range(N):
        C_dot[i, j] = np.dot(A[i, :], B[:, j])
dot_time = time.time() - start

# 방법 3: NumPy matmul (최적화된 BLAS 라이브러리 사용)
start = time.time()
C_numpy = A @ B
numpy_time = time.time() - start

# 결과 비교
print("행렬 곱셈 방법별 속도 비교")
print("=" * 55)
print(f"행렬 크기: A({M}x{K}) x B({K}x{N}) = C({M}x{N})")
print(f"총 연산 수: {M*N*K*2:,}회")
print("-" * 55)
print(f"방법 1 (3중 반복문): {naive_time:.4f}초")
print(f"방법 2 (np.dot):    {dot_time:.4f}초")
print(f"방법 3 (A @ B):     {numpy_time:.6f}초")
print("-" * 55)
print(f"NumPy가 반복문보다 {naive_time/max(numpy_time,0.000001):.0f}배 빠름")
print()
print("결과 일치 확인:", np.allclose(C_naive, C_numpy, atol=1e-3))
\`\`\`

---

## Naive GPU 행렬 곱셈: 무엇이 문제인가

가장 단순한 GPU 행렬 곱셈 커널을 살펴봅시다.

\`\`\`text
// Naive 행렬 곱셈 커널
__global__ void matmulNaive(float* A, float* B, float* C, int M, int K, int N) {
    int row = blockIdx.y * blockDim.y + threadIdx.y;  // C의 행
    int col = blockIdx.x * blockDim.x + threadIdx.x;  // C의 열

    if (row < M && col < N) {
        float sum = 0.0f;
        for (int k = 0; k < K; k++) {
            sum += A[row * K + k] * B[k * N + col];
            //     ^^^^^^^^^^^^^^   ^^^^^^^^^^^^^^
            //     A에서 K번 읽기    B에서 K번 읽기
        }
        C[row * N + col] = sum;
    }
}
\`\`\`

### 문제점 분석

C의 하나의 원소를 계산하기 위해, A에서 K번, B에서 K번, **총 2K번** Global Memory에 접근합니다.

\`\`\`text
C 행렬 전체를 계산할 때의 Global Memory 접근 횟수:
- C의 원소 수: M x N개
- 각 원소당 접근: 2K번
- 총 접근 횟수: M x N x 2K번

예시: 1024 x 1024 행렬 곱셈
- 총 접근: 1024 x 1024 x 2 x 1024 = 약 21억 번!
\`\`\`

그런데 자세히 보면, **같은 데이터를 여러 스레드가 반복적으로 읽고 있습니다**.

\`\`\`text
C[0][0]을 계산할 때: A의 0번 행 전체를 읽음
C[0][1]을 계산할 때: A의 0번 행 전체를 또 읽음
C[0][2]을 계산할 때: A의 0번 행 전체를 또또 읽음
...

=> A의 0번 행을 N번 반복해서 읽고 있다!
=> 창고에 같은 서류를 가져오러 N번 왕복하는 것과 같다!
\`\`\`

---

## Tiled 행렬 곱셈: 핵심 최적화 아이디어

### 비유: 서류를 미리 사무실로 가져오기

창고(Global Memory)에 매번 가는 대신, 필요한 서류 묶음을 미리 사무실 캐비닛(Shared Memory)으로
가져와 놓고, 캐비닛에서 빠르게 꺼내 쓰는 방식입니다.

### 타일링이란?

행렬을 작은 조각(타일, Tile)으로 나눠서, 한 타일 분량의 데이터를
Shared Memory에 로드한 후 계산하는 방식입니다.

\`\`\`text
[타일링의 개념]

A 행렬을 타일로 분할:          B 행렬을 타일로 분할:
+----+----+----+----+         +----+----+----+
|T0,0|T0,1|T0,2|T0,3|         |T0,0|T0,1|T0,2|
+----+----+----+----+         +----+----+----+
|T1,0|T1,1|T1,2|T1,3|         |T1,0|T1,1|T1,2|
+----+----+----+----+         +----+----+----+
                              |T2,0|T2,1|T2,2|
                              +----+----+----+
                              |T3,0|T3,1|T3,2|
                              +----+----+----+

C[i][j] 계산:
= A의 i행 타일들과 B의 j열 타일들의 부분 곱의 합
= (A_T0 x B_T0) + (A_T1 x B_T1) + (A_T2 x B_T2) + ...
\`\`\`

### Tiled 커널의 구조

\`\`\`text
// Tiled 행렬 곱셈 (TILE_SIZE = 16 가정)
__global__ void matmulTiled(float* A, float* B, float* C, int M, int K, int N) {
    // Shared Memory 선언 (타일 크기만큼)
    __shared__ float tileA[16][16];
    __shared__ float tileB[16][16];

    int row = blockIdx.y * 16 + threadIdx.y;
    int col = blockIdx.x * 16 + threadIdx.x;
    float sum = 0.0f;

    // K 방향으로 타일 단위로 순회
    for (int t = 0; t < (K + 15) / 16; t++) {
        // 1단계: Global -> Shared 로드 (각 스레드가 하나씩)
        tileA[threadIdx.y][threadIdx.x] = A[row * K + t * 16 + threadIdx.x];
        tileB[threadIdx.y][threadIdx.x] = B[(t * 16 + threadIdx.y) * N + col];

        // 2단계: 모든 스레드가 로드 완료될 때까지 대기
        __syncthreads();

        // 3단계: Shared Memory에서 빠르게 계산
        for (int k = 0; k < 16; k++) {
            sum += tileA[threadIdx.y][k] * tileB[k][threadIdx.x];
            //     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            //     Shared Memory 접근 = 빠름!
        }

        // 4단계: 다음 타일 로드 전 동기화
        __syncthreads();
    }

    C[row * N + col] = sum;
}
\`\`\`

---

## Naive vs Tiled: 왜 타일링이 빠른가

### Global Memory 접근 횟수 비교

\`\`\`text
행렬 크기: M=N=K=1024, 타일 크기: 16x16

[Naive 방식]
C의 한 원소당 Global 접근: 2 x 1024 = 2048번
총 Global 접근: 1024 x 1024 x 2048 = 약 21억 번

[Tiled 방식]
타일 로드 횟수: 1024/16 = 64 라운드
라운드당 Global 접근: 16x16 x 2 = 512번 (타일 2개 로드)
블록당 총 Global 접근: 64 x 512 = 32,768번
블록이 처리하는 C 원소: 16x16 = 256개
원소당 Global 접근: 32,768 / 256 = 128번

=> Naive: 원소당 2048번 vs Tiled: 원소당 128번
=> 약 16배(= 타일 크기) 감소!
\`\`\`

| 방식 | 원소당 Global Memory 접근 | 상대 속도 |
|------|------------------------|----------|
| Naive | 2K번 (2048) | 1x (기준) |
| Tiled (16x16) | 2K/16번 (128) | ~16x 빠름 |
| Tiled (32x32) | 2K/32번 (64) | ~32x 빠름 |

타일 크기가 클수록 더 빠르지만, Shared Memory 용량의 제한이 있습니다.

---

## 실행해보기: 타일링 효과 시뮬레이션

Python으로 Naive vs Tiled의 메모리 접근 패턴 차이를 시뮬레이션해 봅시다.

\`\`\`python
import numpy as np
import time

M, K, N = 256, 256, 256
A = np.random.rand(M, K).astype(np.float32)
B = np.random.rand(K, N).astype(np.float32)

# 방법 1: Naive (원소 단위 계산)
start = time.time()
C_naive = np.zeros((M, N), dtype=np.float32)
for i in range(M):
    for j in range(N):
        C_naive[i, j] = np.dot(A[i, :], B[:, j])
naive_time = time.time() - start

# 방법 2: Tiled 시뮬레이션 (타일 단위 계산)
TILE = 32
start = time.time()
C_tiled = np.zeros((M, N), dtype=np.float32)
for i0 in range(0, M, TILE):
    for j0 in range(0, N, TILE):
        for k0 in range(0, K, TILE):
            # 타일 추출 (Shared Memory 로드에 해당)
            a_tile = A[i0:i0+TILE, k0:k0+TILE]
            b_tile = B[k0:k0+TILE, j0:j0+TILE]
            # 타일 간 곱셈 (Shared Memory에서 계산에 해당)
            C_tiled[i0:i0+TILE, j0:j0+TILE] += a_tile @ b_tile
tiled_time = time.time() - start

# 방법 3: NumPy 최적화
start = time.time()
C_numpy = A @ B
numpy_time = time.time() - start

print("Naive vs Tiled 행렬 곱셈 시뮬레이션")
print("=" * 55)
print(f"행렬 크기: {M}x{K} * {K}x{N}, 타일 크기: {TILE}")
print("-" * 55)
print(f"Naive (원소 단위): {naive_time:.4f}초")
print(f"Tiled (타일 단위): {tiled_time:.4f}초")
print(f"NumPy (최적화):    {numpy_time:.6f}초")
print("-" * 55)
print(f"Tiled가 Naive보다 {naive_time/max(tiled_time,0.000001):.1f}배 빠름")
print()
print("결과 일치:", np.allclose(C_naive, C_tiled, atol=1e-3))
print()
print("실제 GPU에서의 Tiled 효과는 이보다 훨씬 큽니다!")
print("Shared Memory의 속도가 Global Memory보다 수십 배 빠르기 때문입니다.")
\`\`\`

---

## 실행해보기: 행렬 크기별 곱셈 성능

행렬 크기가 커질수록 최적화의 중요성이 더 커지는 것을 확인해 봅시다.

\`\`\`python
import numpy as np
import time

print("행렬 크기별 곱셈 성능 비교")
print("=" * 65)
print(f"{'크기':>8} | {'연산 수':>14} | {'NumPy 시간':>12} | {'GFLOPS':>8}")
print("-" * 65)

for size in [128, 256, 512, 1024, 2048]:
    A = np.random.rand(size, size).astype(np.float32)
    B = np.random.rand(size, size).astype(np.float32)

    # 워밍업
    _ = A @ B

    start = time.time()
    for _ in range(3):
        C = A @ B
    elapsed = (time.time() - start) / 3

    flops = 2 * size * size * size  # 곱셈 + 덧셈
    gflops = flops / elapsed / 1e9

    print(f"{size:>4}x{size:<4}| {flops:>14,} | {elapsed:>10.6f}초 | {gflops:>7.1f}")

print()
print("GFLOPS = 초당 10억 번의 부동소수점 연산")
print("GPU는 이 값이 수천~수만에 달합니다.")
print("행렬이 클수록 GPU의 병렬 처리 이점이 극대화됩니다.")
\`\`\`

---

## 현실의 행렬 곱셈 최적화

실제 GPU 라이브러리(cuBLAS, cuDNN)는 타일링 외에도 다양한 최적화를 적용합니다.

| 최적화 기법 | 설명 |
|------------|------|
| Tiling | Shared Memory 활용 (이번 레슨 내용) |
| Memory Coalescing | 연속 메모리 접근 패턴 보장 |
| Register Blocking | 레지스터 수준에서 추가 타일링 |
| Warp-level Primitives | Warp 내 스레드 간 직접 데이터 교환 |
| Tensor Cores | 행렬 곱셈 전용 하드웨어 가속기 |
| Mixed Precision | FP16/BF16으로 연산량 2배 감소 |

PyTorch나 TensorFlow를 사용하면 이런 최적화가 **자동으로 적용**됩니다.
하지만 원리를 이해하면 왜 특정 배치 크기나 행렬 크기에서 성능이 달라지는지 알 수 있습니다.

---

## 핵심 요약

| 개념 | 설명 | 비유 |
|------|------|------|
| Naive 행렬 곱셈 | 각 원소마다 Global Memory 반복 접근 | 매번 창고에 가서 서류 가져오기 |
| Tiled 행렬 곱셈 | 타일을 Shared Memory에 미리 로드 | 서류 묶음을 사무실로 가져와 두기 |
| 타일링 효과 | Global Memory 접근이 타일크기만큼 감소 | 창고 왕복 횟수 16~32배 감소 |
| __syncthreads() | 타일 로드 완료 동기화 | "모두 서류 가져왔나?" 확인 |
| cuBLAS | NVIDIA의 최적화된 행렬 연산 라이브러리 | 전문 물류 회사에 위탁 |

---

## 학습 체크리스트
- [ ] Naive 행렬 곱셈의 메모리 접근 문제를 설명할 수 있다
- [ ] Tiled 행렬 곱셈이 왜 더 빠른지 "창고 vs 사무실" 비유로 설명할 수 있다
- [ ] 타일 크기와 Global Memory 접근 감소의 관계를 이해한다
- [ ] 3중 반복문 vs NumPy의 속도 차이를 직접 확인했다
- [ ] 실제 GPU 라이브러리가 추가로 어떤 최적화를 하는지 안다
`;
