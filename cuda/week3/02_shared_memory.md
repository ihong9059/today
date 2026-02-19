# Day 2: Shared Memory 활용

## 1. Shared Memory 복습

```
┌────────────────────────────────────┐
│           Block                    │
│  ┌────────────────────────────┐   │
│  │     Shared Memory          │   │  ← 빠름! (5 사이클)
│  │   블록 내 모든 스레드 공유    │   │
│  └────────────────────────────┘   │
│       ↑       ↑       ↑          │
│      T0      T1      T2   ...    │
└────────────────────────────────────┘
```

---

## 2. Shared Memory 기본 사용법

### 2.1 정적 할당

```c
__global__ void kernel() {
    __shared__ float data[256];  // 컴파일 시 크기 결정

    data[threadIdx.x] = threadIdx.x;
    __syncthreads();

    // 다른 스레드의 데이터 접근 가능
    float neighbor = data[(threadIdx.x + 1) % 256];
}
```

### 2.2 동적 할당

```c
__global__ void kernel() {
    extern __shared__ float data[];  // 크기 미정

    data[threadIdx.x] = threadIdx.x;
    __syncthreads();
}

int main() {
    int sharedSize = 256 * sizeof(float);
    kernel<<<blocks, threads, sharedSize>>>();  // 여기서 크기 지정
}
```

---

## 3. 실습: 배열 합계 (Reduction)

배열의 모든 원소를 더하는 문제입니다.

### 3.1 CPU 버전

```c
float sum = 0;
for (int i = 0; i < n; i++) {
    sum += data[i];
}
```

### 3.2 GPU 버전 (나이브)

```c
// 문제: 모든 스레드가 동시에 같은 변수에 쓰기!
__global__ void sumNaive(float* data, float* result, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        *result += data[idx];  // 경쟁 조건 (Race Condition)!
    }
}
```

### 3.3 GPU 버전 (Shared Memory + Reduction)

```c
__global__ void sumReduction(float* data, float* result, int n) {
    __shared__ float partialSum[256];

    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    int tid = threadIdx.x;

    // 1. Global → Shared
    partialSum[tid] = (idx < n) ? data[idx] : 0;
    __syncthreads();

    // 2. Reduction (트리 구조로 합산)
    for (int stride = blockDim.x / 2; stride > 0; stride /= 2) {
        if (tid < stride) {
            partialSum[tid] += partialSum[tid + stride];
        }
        __syncthreads();
    }

    // 3. 블록 대표가 결과 저장
    if (tid == 0) {
        atomicAdd(result, partialSum[0]);
    }
}
```

### 3.4 Reduction 과정 시각화

```
초기:  [1] [2] [3] [4] [5] [6] [7] [8]

stride=4:
       [1+5] [2+6] [3+7] [4+8] [5] [6] [7] [8]
       [6]   [8]   [10]  [12]

stride=2:
       [6+10] [8+12] [10] [12] ...
       [16]   [20]

stride=1:
       [16+20] [20] ...
       [36]

결과: 36 (= 1+2+3+4+5+6+7+8)
```

---

## 4. atomicAdd

### 4.1 왜 필요한가?

여러 스레드가 동시에 같은 변수를 수정하면 문제 발생:

```c
// Thread 0: result = result + 5  (result=0 읽음)
// Thread 1: result = result + 3  (result=0 읽음, 아직 0!)
// Thread 0: result = 5 (쓰기)
// Thread 1: result = 3 (쓰기)
// 최종: result = 3 (5가 덮어씌워짐!)
```

### 4.2 atomicAdd 사용

```c
atomicAdd(&result, value);
// 원자적으로 실행: 읽기 → 더하기 → 쓰기가 한 번에
```

### 4.3 지원되는 Atomic 연산

| 함수 | 연산 |
|------|------|
| atomicAdd | 덧셈 |
| atomicSub | 뺄셈 |
| atomicMax | 최대값 |
| atomicMin | 최소값 |
| atomicExch | 교환 |
| atomicCAS | Compare And Swap |

---

## 5. 완성 코드: 배열 합계

```c
// reduction.cu
#include <stdio.h>
#include <stdlib.h>

#define BLOCK_SIZE 256

__global__ void sumReduction(float* data, float* blockSums, int n) {
    __shared__ float partialSum[BLOCK_SIZE];

    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    int tid = threadIdx.x;

    // Global → Shared
    partialSum[tid] = (idx < n) ? data[idx] : 0;
    __syncthreads();

    // Reduction
    for (int stride = blockDim.x / 2; stride > 0; stride /= 2) {
        if (tid < stride) {
            partialSum[tid] += partialSum[tid + stride];
        }
        __syncthreads();
    }

    // 각 블록의 합을 저장
    if (tid == 0) {
        blockSums[blockIdx.x] = partialSum[0];
    }
}

int main() {
    int n = 1000000;
    size_t size = n * sizeof(float);

    // 메모리 할당
    float *data, *blockSums;
    cudaMallocManaged(&data, size);

    int numBlocks = (n + BLOCK_SIZE - 1) / BLOCK_SIZE;
    cudaMallocManaged(&blockSums, numBlocks * sizeof(float));

    // 초기화
    for (int i = 0; i < n; i++) {
        data[i] = 1.0f;  // 모두 1이면 합은 n
    }

    // 커널 실행
    sumReduction<<<numBlocks, BLOCK_SIZE>>>(data, blockSums, n);
    cudaDeviceSynchronize();

    // CPU에서 블록 합계를 최종 합산
    float total = 0;
    for (int i = 0; i < numBlocks; i++) {
        total += blockSums[i];
    }

    printf("Sum of %d elements: %.0f\n", n, total);
    printf("Expected: %d\n", n);

    cudaFree(data);
    cudaFree(blockSums);

    return 0;
}
```

---

## 6. Bank Conflict (심화)

### 6.1 Shared Memory 구조

Shared Memory는 32개의 "Bank"로 나뉨:

```
Bank 0:  data[0], data[32], data[64], ...
Bank 1:  data[1], data[33], data[65], ...
Bank 2:  data[2], data[34], data[66], ...
...
Bank 31: data[31], data[63], data[95], ...
```

### 6.2 Bank Conflict

같은 Bank에 동시 접근하면 순차 처리 → 느려짐!

```c
// Bank Conflict (나쁨)
shared[threadIdx.x * 32]  // 모두 Bank 0 접근!

// No Bank Conflict (좋음)
shared[threadIdx.x]  // 각자 다른 Bank 접근
```

### 6.3 Jetson 초보자는?

처음에는 Bank Conflict를 너무 걱정하지 마세요.
기본 패턴 (`shared[threadIdx.x]`)만 쓰면 대부분 문제없습니다.

---

## 7. Shared Memory 사용 패턴

### 패턴 1: 데이터 재사용

```c
// Global Memory에서 여러 번 읽기 (느림)
for (int i = 0; i < 10; i++) {
    result += globalData[idx] * weights[i];
}

// Shared Memory로 한 번 복사 후 여러 번 사용 (빠름)
__shared__ float localData[256];
localData[tid] = globalData[idx];
__syncthreads();

for (int i = 0; i < 10; i++) {
    result += localData[tid] * weights[i];
}
```

### 패턴 2: 이웃 데이터 접근

```c
// 이미지 필터링: 주변 픽셀 접근
__shared__ float tile[BLOCK_SIZE + 2];  // 양쪽 1픽셀 여유

// 데이터 로드 (경계 포함)
tile[tid + 1] = data[idx];
if (tid == 0) tile[0] = data[idx - 1];
if (tid == BLOCK_SIZE - 1) tile[BLOCK_SIZE + 1] = data[idx + 1];
__syncthreads();

// 3점 평균 필터
result = (tile[tid] + tile[tid + 1] + tile[tid + 2]) / 3;
```

---

## 8. 오늘의 실습

### 실습 1: Reduction 구현
- [ ] `reduction.cu` 작성
- [ ] n=1000000으로 테스트
- [ ] 결과 검증

### 실습 2: 최대값 찾기

Reduction을 변형하여 배열의 최대값을 찾으세요:

```c
__global__ void maxReduction(float* data, float* blockMax, int n) {
    __shared__ float partialMax[256];

    // 여기에 구현
    // 힌트: += 대신 max() 사용
}
```

### 실습 3: 성능 비교
- [ ] Shared Memory 사용 버전
- [ ] Global Memory만 사용 버전
- [ ] 시간 비교

---

## 9. 용어 정리

| 용어 | 의미 |
|------|------|
| **Reduction** | 배열을 하나의 값으로 축소 (합, 최대 등) |
| **atomicAdd** | 원자적 덧셈 연산 |
| **Bank** | Shared Memory의 물리적 단위 |
| **Bank Conflict** | 같은 Bank 동시 접근으로 인한 지연 |
| **Stride** | 접근 간격 |

---

## 10. 다음 시간 예고

내일은 행렬 덧셈을 구현합니다!
- 2D Grid/Block 복습
- 행렬 메모리 레이아웃
- 행렬 덧셈 GPU 구현
