# Day 4: 행렬 곱셈

## 1. 행렬 곱셈이란?

### 1.1 수학적 정의

```
A (M x K) × B (K x N) = C (M x N)

C[i][j] = Σ A[i][k] * B[k][j]  (k = 0 to K-1)
```

### 1.2 예시

```
A (2x3):        B (3x2):        C (2x2):
[1 2 3]    ×    [7  8]     =    [58  64]
[4 5 6]         [9  10]         [139 154]
                [11 12]

C[0][0] = 1*7 + 2*9 + 3*11 = 7 + 18 + 33 = 58
C[0][1] = 1*8 + 2*10 + 3*12 = 8 + 20 + 36 = 64
C[1][0] = 4*7 + 5*9 + 6*11 = 28 + 45 + 66 = 139
C[1][1] = 4*8 + 5*10 + 6*12 = 32 + 50 + 72 = 154
```

### 1.3 계산량

- C의 각 원소: K번의 곱셈과 덧셈
- 전체: M × N × K 연산
- O(N³) 복잡도 (정사각 행렬 기준)

---

## 2. CPU 버전

```c
void matrixMulCPU(float* A, float* B, float* C,
                  int M, int K, int N) {
    for (int i = 0; i < M; i++) {
        for (int j = 0; j < N; j++) {
            float sum = 0;
            for (int k = 0; k < K; k++) {
                sum += A[i * K + k] * B[k * N + j];
            }
            C[i * N + j] = sum;
        }
    }
}
```

---

## 3. GPU 버전 (기본)

### 3.1 기본 커널

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

### 3.2 각 스레드의 역할

```
스레드 (row, col)이 C[row][col] 계산:

      B의 col열
         ↓
A의 row행 → [a₀ a₁ a₂ ...] × [b₀]  = C[row][col]
                              [b₁]
                              [b₂]
                              [...]
```

### 3.3 문제점

각 스레드가 A의 한 행과 B의 한 열을 **Global Memory**에서 반복 읽음 → 느림!

---

## 4. GPU 버전 (타일링 + Shared Memory)

### 4.1 타일링 아이디어

행렬을 작은 타일로 나누어 Shared Memory에 로드:

```
     ┌─────────────────────┐
     │  B                  │
     │ ┌───┐               │
     │ │Tile│              │
     │ └───┘               │
┌────┼─────────────────────┤
│ A  │                     │
│┌───┤                     │
││Tile    →     C의 일부    │
│└───┤                     │
└────┴─────────────────────┘
```

### 4.2 타일링 커널

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
        // A 타일 로드
        int aCol = t * TILE_SIZE + threadIdx.x;
        if (row < M && aCol < K) {
            tileA[threadIdx.y][threadIdx.x] = A[row * K + aCol];
        } else {
            tileA[threadIdx.y][threadIdx.x] = 0;
        }

        // B 타일 로드
        int bRow = t * TILE_SIZE + threadIdx.y;
        if (bRow < K && col < N) {
            tileB[threadIdx.y][threadIdx.x] = B[bRow * N + col];
        } else {
            tileB[threadIdx.y][threadIdx.x] = 0;
        }

        __syncthreads();

        // 타일 내 계산
        for (int k = 0; k < TILE_SIZE; k++) {
            sum += tileA[threadIdx.y][k] * tileB[k][threadIdx.x];
        }

        __syncthreads();
    }

    // 결과 저장
    if (row < M && col < N) {
        C[row * N + col] = sum;
    }
}
```

### 4.3 타일링의 장점

```
기본 버전:
- C의 한 원소당 Global Memory 접근: 2K번

타일링 버전:
- C의 한 원소당 Global Memory 접근: 2K/TILE_SIZE번
- 나머지는 Shared Memory에서 읽음 (100배 빠름!)
```

---

## 5. 완성 코드

```c
// matrix_mul.cu
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define TILE_SIZE 16

// 기본 GPU 커널
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

// 타일링 GPU 커널
__global__ void matrixMulTiled(float* A, float* B, float* C,
                                int M, int K, int N) {
    __shared__ float tileA[TILE_SIZE][TILE_SIZE];
    __shared__ float tileB[TILE_SIZE][TILE_SIZE];

    int row = blockIdx.y * TILE_SIZE + threadIdx.y;
    int col = blockIdx.x * TILE_SIZE + threadIdx.x;

    float sum = 0;

    for (int t = 0; t < (K + TILE_SIZE - 1) / TILE_SIZE; t++) {
        int aCol = t * TILE_SIZE + threadIdx.x;
        int bRow = t * TILE_SIZE + threadIdx.y;

        tileA[threadIdx.y][threadIdx.x] =
            (row < M && aCol < K) ? A[row * K + aCol] : 0;
        tileB[threadIdx.y][threadIdx.x] =
            (bRow < K && col < N) ? B[bRow * N + col] : 0;

        __syncthreads();

        for (int k = 0; k < TILE_SIZE; k++) {
            sum += tileA[threadIdx.y][k] * tileB[k][threadIdx.x];
        }

        __syncthreads();
    }

    if (row < M && col < N) {
        C[row * N + col] = sum;
    }
}

// CPU 버전
void matrixMulCPU(float* A, float* B, float* C,
                  int M, int K, int N) {
    for (int i = 0; i < M; i++) {
        for (int j = 0; j < N; j++) {
            float sum = 0;
            for (int k = 0; k < K; k++) {
                sum += A[i * K + k] * B[k * N + j];
            }
            C[i * N + j] = sum;
        }
    }
}

int main() {
    int M = 512, K = 512, N = 512;

    printf("========================================\n");
    printf("  Matrix Multiplication\n");
    printf("  A(%dx%d) x B(%dx%d) = C(%dx%d)\n", M, K, K, N, M, N);
    printf("========================================\n\n");

    size_t sizeA = M * K * sizeof(float);
    size_t sizeB = K * N * sizeof(float);
    size_t sizeC = M * N * sizeof(float);

    float *A, *B, *C_basic, *C_tiled, *C_cpu;
    cudaMallocManaged(&A, sizeA);
    cudaMallocManaged(&B, sizeB);
    cudaMallocManaged(&C_basic, sizeC);
    cudaMallocManaged(&C_tiled, sizeC);
    C_cpu = (float*)malloc(sizeC);

    // 초기화
    srand(42);
    for (int i = 0; i < M * K; i++) A[i] = rand() % 10;
    for (int i = 0; i < K * N; i++) B[i] = rand() % 10;

    // CPU 실행
    clock_t cpu_start = clock();
    matrixMulCPU(A, B, C_cpu, M, K, N);
    clock_t cpu_end = clock();
    double cpu_time = (double)(cpu_end - cpu_start) / CLOCKS_PER_SEC * 1000;

    // GPU 설정
    dim3 threads(TILE_SIZE, TILE_SIZE);
    dim3 blocks((N + TILE_SIZE - 1) / TILE_SIZE,
                (M + TILE_SIZE - 1) / TILE_SIZE);

    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);
    float ms;

    // 기본 GPU
    cudaEventRecord(start);
    matrixMulBasic<<<blocks, threads>>>(A, B, C_basic, M, K, N);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);
    cudaEventElapsedTime(&ms, start, stop);
    float basic_time = ms;

    // 타일링 GPU
    cudaEventRecord(start);
    matrixMulTiled<<<blocks, threads>>>(A, B, C_tiled, M, K, N);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);
    cudaEventElapsedTime(&ms, start, stop);
    float tiled_time = ms;

    // 결과 출력
    printf("CPU Time:        %8.3f ms\n", cpu_time);
    printf("GPU Basic Time:  %8.3f ms (%.1fx faster than CPU)\n",
           basic_time, cpu_time / basic_time);
    printf("GPU Tiled Time:  %8.3f ms (%.1fx faster than CPU)\n",
           tiled_time, cpu_time / tiled_time);
    printf("Tiled vs Basic:  %.1fx faster\n\n", basic_time / tiled_time);

    // 검증
    int errors = 0;
    for (int i = 0; i < M * N && errors < 5; i++) {
        if (abs(C_cpu[i] - C_tiled[i]) > 0.01f) {
            printf("Mismatch at %d: CPU=%f, GPU=%f\n",
                   i, C_cpu[i], C_tiled[i]);
            errors++;
        }
    }
    if (errors == 0) printf("Verification PASSED!\n");

    cudaFree(A);
    cudaFree(B);
    cudaFree(C_basic);
    cudaFree(C_tiled);
    free(C_cpu);

    return 0;
}
```

---

## 6. 성능 비교

| 방법 | 512x512 | 1024x1024 |
|------|---------|-----------|
| CPU | ~1000ms | ~8000ms |
| GPU Basic | ~50ms | ~400ms |
| GPU Tiled | ~10ms | ~50ms |

**타일링은 5~10배 추가 성능 향상!**

---

## 7. 오늘의 실습

### 실습 1: 기본 행렬 곱셈
- [ ] `matrix_mul.cu` 작성
- [ ] 512x512 행렬로 테스트
- [ ] CPU vs GPU 속도 비교

### 실습 2: 타일 크기 실험
- [ ] TILE_SIZE = 8, 16, 32 테스트
- [ ] 최적 크기 찾기

### 실습 3: 행렬 크기 실험
- [ ] 256, 512, 1024, 2048 테스트
- [ ] 크기별 Speedup 기록

---

## 8. 용어 정리

| 용어 | 의미 |
|------|------|
| **Tiling** | 큰 데이터를 작은 조각으로 나눔 |
| **Tile** | 나눠진 작은 조각 |
| **Data Reuse** | 같은 데이터를 여러 번 사용 |

---

## 9. 다음 시간 예고

내일은 이번 주 내용을 복습하고 연습 문제를 풀어봅니다!
