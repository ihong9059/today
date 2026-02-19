# Day 3: 행렬 덧셈

## 1. 행렬이란?

행렬은 2차원 배열입니다.

```
     열(Column)
     0   1   2   3
   ┌───┬───┬───┬───┐
행 0│ 1 │ 2 │ 3 │ 4 │
(R)├───┼───┼───┼───┤
  1│ 5 │ 6 │ 7 │ 8 │
   ├───┼───┼───┼───┤
  2│ 9 │10 │11 │12 │
   └───┴───┴───┴───┘

이 행렬: 3행 4열 (3x4)
```

---

## 2. 메모리에서의 행렬 저장

### 2.1 Row-Major Order (C/CUDA 방식)

행 단위로 연속 저장:

```
메모리:  [1][2][3][4][5][6][7][8][9][10][11][12]
          ─────────  ─────────  ──────────────
            행 0       행 1         행 2

인덱스 계산: matrix[row][col] = matrix[row * numCols + col]
예: matrix[1][2] = matrix[1 * 4 + 2] = matrix[6] = 7
```

### 2.2 Column-Major Order (Fortran/MATLAB 방식)

열 단위로 연속 저장 (CUDA에서는 보통 안 씀)

---

## 3. 행렬 덧셈

### 3.1 수학적 정의

같은 위치의 원소끼리 더함:

```
A + B = C

[1 2]   [5 6]   [6  8]
[3 4] + [7 8] = [10 12]
```

### 3.2 조건

- 두 행렬의 크기가 같아야 함

---

## 4. CPU 버전

```c
void matrixAddCPU(float* A, float* B, float* C,
                  int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            int idx = i * cols + j;
            C[idx] = A[idx] + B[idx];
        }
    }
}
```

---

## 5. GPU 버전

### 5.1 커널

```c
__global__ void matrixAddGPU(float* A, float* B, float* C,
                              int rows, int cols) {
    int col = blockIdx.x * blockDim.x + threadIdx.x;
    int row = blockIdx.y * blockDim.y + threadIdx.y;

    if (row < rows && col < cols) {
        int idx = row * cols + col;
        C[idx] = A[idx] + B[idx];
    }
}
```

### 5.2 Grid/Block 설정

```c
dim3 threadsPerBlock(16, 16);  // 256 threads per block

dim3 numBlocks(
    (cols + threadsPerBlock.x - 1) / threadsPerBlock.x,
    (rows + threadsPerBlock.y - 1) / threadsPerBlock.y
);

matrixAddGPU<<<numBlocks, threadsPerBlock>>>(A, B, C, rows, cols);
```

### 5.3 시각화

```
행렬 (8x8):
┌───┬───┬───┬───┬───┬───┬───┬───┐
│   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │
...

Block (4x4):
┌───────────────┬───────────────┐
│   Block(0,0)  │   Block(1,0)  │
│   16 threads  │   16 threads  │
├───────────────┼───────────────┤
│   Block(0,1)  │   Block(1,1)  │
│   16 threads  │   16 threads  │
└───────────────┴───────────────┘

각 스레드가 하나의 원소 처리!
```

---

## 6. 완성 코드

```c
// matrix_add.cu
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define BLOCK_SIZE 16

// GPU 커널
__global__ void matrixAddGPU(float* A, float* B, float* C,
                              int rows, int cols) {
    int col = blockIdx.x * blockDim.x + threadIdx.x;
    int row = blockIdx.y * blockDim.y + threadIdx.y;

    if (row < rows && col < cols) {
        int idx = row * cols + col;
        C[idx] = A[idx] + B[idx];
    }
}

// CPU 함수 (검증용)
void matrixAddCPU(float* A, float* B, float* C, int rows, int cols) {
    for (int i = 0; i < rows * cols; i++) {
        C[i] = A[i] + B[i];
    }
}

// 결과 검증
int verify(float* cpu, float* gpu, int size) {
    for (int i = 0; i < size; i++) {
        if (abs(cpu[i] - gpu[i]) > 0.0001f) {
            printf("Mismatch at %d: CPU=%f, GPU=%f\n", i, cpu[i], gpu[i]);
            return 0;
        }
    }
    return 1;
}

// 행렬 출력 (작은 행렬용)
void printMatrix(float* M, int rows, int cols, const char* name) {
    printf("%s:\n", name);
    for (int i = 0; i < rows && i < 4; i++) {
        for (int j = 0; j < cols && j < 4; j++) {
            printf("%6.1f ", M[i * cols + j]);
        }
        if (cols > 4) printf("...");
        printf("\n");
    }
    if (rows > 4) printf("  ...\n");
    printf("\n");
}

int main() {
    int rows = 1024;
    int cols = 1024;
    int size = rows * cols;
    size_t bytes = size * sizeof(float);

    printf("========================================\n");
    printf("  Matrix Addition: %d x %d\n", rows, cols);
    printf("========================================\n\n");

    // 메모리 할당
    float *A, *B, *C_gpu, *C_cpu;
    cudaMallocManaged(&A, bytes);
    cudaMallocManaged(&B, bytes);
    cudaMallocManaged(&C_gpu, bytes);
    C_cpu = (float*)malloc(bytes);

    // 초기화
    srand(42);
    for (int i = 0; i < size; i++) {
        A[i] = rand() % 100;
        B[i] = rand() % 100;
    }

    // CPU 실행
    clock_t cpu_start = clock();
    matrixAddCPU(A, B, C_cpu, rows, cols);
    clock_t cpu_end = clock();
    double cpu_time = (double)(cpu_end - cpu_start) / CLOCKS_PER_SEC * 1000;

    // GPU 실행
    dim3 threadsPerBlock(BLOCK_SIZE, BLOCK_SIZE);
    dim3 numBlocks(
        (cols + BLOCK_SIZE - 1) / BLOCK_SIZE,
        (rows + BLOCK_SIZE - 1) / BLOCK_SIZE
    );

    printf("Grid: %d x %d blocks\n", numBlocks.x, numBlocks.y);
    printf("Block: %d x %d threads\n\n", BLOCK_SIZE, BLOCK_SIZE);

    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    cudaEventRecord(start);
    matrixAddGPU<<<numBlocks, threadsPerBlock>>>(A, B, C_gpu, rows, cols);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float gpu_time;
    cudaEventElapsedTime(&gpu_time, start, stop);

    // 결과 출력
    printf("CPU Time: %.3f ms\n", cpu_time);
    printf("GPU Time: %.3f ms\n", gpu_time);
    if (gpu_time > 0) {
        printf("Speedup: %.2fx\n\n", cpu_time / gpu_time);
    }

    // 검증
    if (verify(C_cpu, C_gpu, size)) {
        printf("Verification PASSED!\n\n");
    }

    // 작은 부분 출력
    printMatrix(A, rows, cols, "A (first 4x4)");
    printMatrix(B, rows, cols, "B (first 4x4)");
    printMatrix(C_gpu, rows, cols, "C = A + B (first 4x4)");

    // 메모리 해제
    cudaFree(A);
    cudaFree(B);
    cudaFree(C_gpu);
    free(C_cpu);

    cudaEventDestroy(start);
    cudaEventDestroy(stop);

    return 0;
}
```

---

## 7. 컴파일 및 실행

```bash
nvcc matrix_add.cu -o matrix_add
./matrix_add
```

**예상 출력:**
```
========================================
  Matrix Addition: 1024 x 1024
========================================

Grid: 64 x 64 blocks
Block: 16 x 16 threads

CPU Time: 5.234 ms
GPU Time: 0.342 ms
Speedup: 15.30x

Verification PASSED!

A (first 4x4):
  83.0   86.0   77.0   15.0 ...
  93.0   35.0   86.0   92.0 ...
  ...
```

---

## 8. 최적화 포인트

### 8.1 블록 크기 선택

```c
// 일반적인 선택
dim3 threads(16, 16);  // 256 threads
dim3 threads(32, 8);   // 256 threads
dim3 threads(32, 32);  // 1024 threads (최대)
```

### 8.2 메모리 접근 패턴

Row-major 저장이므로, x 방향(열)으로 연속 접근이 효율적:

```c
// 좋음: col이 threadIdx.x
int col = blockIdx.x * blockDim.x + threadIdx.x;
int row = blockIdx.y * blockDim.y + threadIdx.y;

// 인접 스레드가 인접 메모리 접근 (Coalesced)
```

---

## 9. 오늘의 실습

### 실습 1: 기본 행렬 덧셈
- [ ] `matrix_add.cu` 작성
- [ ] 1024x1024 행렬로 테스트
- [ ] CPU vs GPU 속도 비교

### 실습 2: 크기 실험
- [ ] 256x256, 512x512, 2048x2048 테스트
- [ ] 크기에 따른 Speedup 변화 관찰

### 실습 3: 행렬 뺄셈
- [ ] C = A - B 구현
- [ ] 검증 코드 작성

### 실습 4: 스칼라 곱셈
- [ ] C = A * scalar 구현

---

## 10. 연습 문제

### 문제 1: 행렬 원소별 곱셈

A와 B의 같은 위치 원소를 곱하는 커널:

```c
// C[i][j] = A[i][j] * B[i][j]
__global__ void matrixMulElement(float* A, float* B, float* C,
                                  int rows, int cols) {
    // 구현하세요
}
```

### 문제 2: 행렬 전치

행과 열을 바꾸는 커널:

```c
// B[j][i] = A[i][j]
__global__ void matrixTranspose(float* A, float* B,
                                 int rows, int cols) {
    // 구현하세요
}
```

---

## 11. 용어 정리

| 용어 | 의미 |
|------|------|
| **Row-Major** | 행 단위로 메모리 저장 |
| **Column-Major** | 열 단위로 메모리 저장 |
| **Element-wise** | 원소 단위 연산 |
| **Transpose** | 전치 (행↔열 교환) |

---

## 12. 다음 시간 예고

내일은 행렬 곱셈을 구현합니다!
- 행렬 곱셈 알고리즘
- 타일링 기법
- Shared Memory 활용
