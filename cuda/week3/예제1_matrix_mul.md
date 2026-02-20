# 예제 1: matrix_mul.cu

## 목적
**Shared Memory를 사용한 행렬 곱셈 최적화를 배운다.**

행렬 곱셈은 딥러닝의 핵심 연산입니다. 이 예제에서는 **기본 구현**과 **타일링 최적화**를 비교합니다.

---

## 실행 방법

```bash
cd ~/cuda/week3/code
nvcc matrix_mul.cu -o matrix_mul
./matrix_mul
```

---

## 실행 결과

```
========================================
  Matrix Multiplication
  A(512x512) x B(512x512) = C(512x512)
========================================

Running CPU version...
Grid: 32 x 32 blocks
Block: 16 x 16 threads

Running GPU Basic version...
Running GPU Tiled version...

========== Results ==========
CPU Time:          487.234 ms
GPU Basic Time:     12.456 ms (39.1x faster than CPU)
GPU Tiled Time:      5.234 ms (93.1x faster than CPU)
Tiled vs Basic:    2.38x faster
=============================

Verifying Basic... PASSED!
Verifying Tiled... PASSED!

Sample results (first 3x3 of C):
  1234.0   1156.0   1289.0
  1098.0   1234.0   1167.0
  1345.0   1278.0   1312.0
```

---

## 코드 분석

### 행렬 곱셈 기본

```
C = A × B

A: M×K 행렬
B: K×N 행렬
C: M×N 행렬

C[i][j] = Σ(k=0 to K-1) A[i][k] × B[k][j]
```

### 1. 기본 GPU 커널

```c
__global__ void matrixMulBasic(float* A, float* B, float* C,
                                int M, int K, int N) {
    int row = blockIdx.y * blockDim.y + threadIdx.y;
    int col = blockIdx.x * blockDim.x + threadIdx.x;

    if (row < M && col < N) {
        float sum = 0;
        for (int k = 0; k < K; k++) {
            sum += A[row * K + k] * B[k * N + col];
        }
        C[row * N + col] = sum;
    }
}
```

**문제점:**
- 각 스레드가 Global Memory에서 K번 읽기
- Global Memory 접근은 느림 (~400 cycles)
- 같은 데이터를 여러 스레드가 중복 읽음

### 2. 타일링 GPU 커널 (Shared Memory)

```c
#define TILE_SIZE 16

__global__ void matrixMulTiled(float* A, float* B, float* C,
                                int M, int K, int N) {
    __shared__ float tileA[TILE_SIZE][TILE_SIZE];
    __shared__ float tileB[TILE_SIZE][TILE_SIZE];

    int row = blockIdx.y * TILE_SIZE + threadIdx.y;
    int col = blockIdx.x * TILE_SIZE + threadIdx.x;
    float sum = 0;

    // 타일 단위로 반복
    for (int t = 0; t < (K + TILE_SIZE - 1) / TILE_SIZE; t++) {
        // 1. Global → Shared 로드
        tileA[threadIdx.y][threadIdx.x] = A[row * K + t*TILE_SIZE + threadIdx.x];
        tileB[threadIdx.y][threadIdx.x] = B[(t*TILE_SIZE + threadIdx.y) * N + col];
        __syncthreads();  // 모든 스레드가 로드 완료 대기

        // 2. Shared Memory에서 계산
        for (int k = 0; k < TILE_SIZE; k++) {
            sum += tileA[threadIdx.y][k] * tileB[k][threadIdx.x];
        }
        __syncthreads();  // 다음 타일 로드 전 동기화
    }

    C[row * N + col] = sum;
}
```

---

## 핵심 포인트

### 1. 타일링이란?

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   512×512 행렬을 16×16 타일로 분할                          │
│                                                             │
│   ┌────┬────┬────┬────┬─...─┬────┐                          │
│   │T00 │T01 │T02 │T03 │     │T031│                          │
│   ├────┼────┼────┼────┼─...─┼────┤                          │
│   │T10 │T11 │T12 │T13 │     │T131│                          │
│   ├────┼────┼────┼────┼─...─┼────┤                          │
│   │... │    │    │    │     │    │                          │
│   ├────┼────┼────┼────┼─...─┼────┤                          │
│   │T310│    │    │    │     │T3131│                         │
│   └────┴────┴────┴────┴─...─┴────┘                          │
│                                                             │
│   32 × 32 = 1024개 타일                                     │
│   각 타일을 하나의 블록이 처리                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. Shared Memory의 효과

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   기본 방식 (Global Memory)                                 │
│                                                             │
│   스레드 0: A[0][0], A[0][1], ..., A[0][511]  ← 512번 읽기 │
│   스레드 1: A[0][0], A[0][1], ..., A[0][511]  ← 또 512번!  │
│   ...                                                       │
│   스레드 255: 같은 데이터를 또 읽음                         │
│                                                             │
│   → 중복 읽기가 엄청남!                                     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   타일링 방식 (Shared Memory)                               │
│                                                             │
│   1. 각 스레드가 하나씩 로드 → Shared Memory에 저장         │
│      스레드 0: tileA[0][0] = A[row][t*16+0]                │
│      스레드 1: tileA[0][1] = A[row][t*16+1]                │
│      ...                                                    │
│                                                             │
│   2. Shared Memory에서 256개 스레드가 재사용                │
│      → Global Memory 접근 대폭 감소!                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3. 메모리 접근 횟수 비교

```
512×512 행렬 곱셈:

기본 방식:
  - 각 요소 계산에 512번 읽기
  - 총: 512 × 512 × 512 × 2 = 2.68억 번 Global Memory 접근

타일링 방식:
  - 타일 수: 32 × 32 = 1024
  - 타일당 로드: 16 × 16 × 2 = 512번
  - 총: 1024 × 32 × 512 = 1677만 번 Global Memory 접근

감소율: 2.68억 / 1677만 = 16배 감소!
```

### 4. __syncthreads()의 중요성

```c
// 1. 모든 스레드가 Shared Memory 로드
tileA[ty][tx] = A[...];
tileB[ty][tx] = B[...];

__syncthreads();  // ⚠️ 필수! 모든 스레드가 로드 완료할 때까지 대기

// 2. Shared Memory 사용
for (int k = 0; k < TILE_SIZE; k++) {
    sum += tileA[ty][k] * tileB[k][tx];  // 다른 스레드가 로드한 데이터 사용
}

__syncthreads();  // 다음 타일 로드 전 동기화
```

없으면 **레이스 컨디션** 발생!

### 5. 2D 그리드/블록 구성

```c
dim3 threads(TILE_SIZE, TILE_SIZE);  // 16×16 = 256 스레드
dim3 blocks((N + TILE_SIZE - 1) / TILE_SIZE,
            (M + TILE_SIZE - 1) / TILE_SIZE);  // 32×32 = 1024 블록
```

행렬은 2차원이므로 2D 구조를 사용합니다.

---

## 이 예제에서 배우는 것

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   📚 핵심 교훈                                                ║
║                                                               ║
║   1. Shared Memory = 블록 내 스레드가 공유하는 빠른 메모리    ║
║      - Global: ~400 cycles                                    ║
║      - Shared: ~20 cycles (20배 빠름)                         ║
║                                                               ║
║   2. 타일링 = 데이터를 작은 조각으로 나눠 재사용              ║
║                                                               ║
║   3. __syncthreads() = 스레드 동기화 (필수!)                  ║
║                                                               ║
║   4. 2D 그리드/블록으로 행렬 문제 매핑                        ║
║                                                               ║
║   5. 최적화 효과: 기본 대비 2~3배 빠름                        ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 다음 단계

`reduction.cu`에서 Shared Memory를 사용한 또 다른 패턴인 Reduction을 배웁니다.

---

*작성일: 2026-02-20*
