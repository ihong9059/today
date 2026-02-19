# Day 5: 실습 및 복습

## 1. 이번 주 복습

### 1.1 핵심 개념

```
┌─────────────────────────────────────────────────────┐
│  dim3: 다차원 설정 타입                              │
│  2D Grid/Block: 이미지 처리에 적합                   │
│  cudaMalloc: GPU 메모리 할당                         │
│  cudaMemcpy: 메모리 복사                             │
│  cudaMallocManaged: Unified Memory 할당             │
│  cudaDeviceSynchronize: GPU 완료 대기               │
└─────────────────────────────────────────────────────┘
```

### 1.2 메모리 관리 요약

| 함수 | 용도 | Jetson 권장 |
|------|------|:-----------:|
| cudaMalloc | GPU 전용 메모리 | △ |
| cudaMemcpy | 메모리 복사 | △ |
| cudaMallocManaged | Unified Memory | ◎ |
| cudaFree | 메모리 해제 | 필수 |

### 1.3 Vector Addition 패턴

```c
__global__ void vectorOp(float* a, float* b, float* c, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        c[idx] = a[idx] + b[idx];  // 연산
    }
}

int main() {
    // 1. Unified Memory 할당
    cudaMallocManaged(&a, size);
    cudaMallocManaged(&b, size);
    cudaMallocManaged(&c, size);

    // 2. 초기화
    // ...

    // 3. 블록 수 계산
    int threads = 256;
    int blocks = (n + threads - 1) / threads;

    // 4. 커널 실행
    vectorOp<<<blocks, threads>>>(a, b, c, n);
    cudaDeviceSynchronize();

    // 5. 결과 사용 & 해제
}
```

---

## 2. 연습 문제

### 문제 1: 2D 인덱스 계산 (쉬움)

`<<<dim3(4,3), dim3(8,8)>>>` 설정에서:

1. 총 블록 수는?
2. 블록당 스레드 수는?
3. 총 스레드 수는?
4. Block(2,1)의 Thread(5,3)의 전역 좌표 (x,y)는?

---

### 문제 2: 메모리 함수 매칭 (쉬움)

올바른 짝을 연결하세요:

| 함수 | 용도 |
|------|------|
| A. cudaMalloc | 1. 메모리 해제 |
| B. cudaMemcpy | 2. Unified Memory 할당 |
| C. cudaFree | 3. GPU 메모리 할당 |
| D. cudaMallocManaged | 4. 데이터 복사 |

---

### 문제 3: 버그 찾기 (중간)

다음 코드의 문제점은?

```c
float *data;
cudaMallocManaged(&data, 1000 * sizeof(float));

for (int i = 0; i < 1000; i++) {
    data[i] = i;
}

kernel<<<4, 256>>>(data, 1000);

printf("Result: %f\n", data[0]);

cudaFree(data);
```

---

### 문제 4: Vector Subtraction (중간)

두 벡터의 뺄셈을 구현하세요: C = A - B

```c
// vector_sub.cu

#include <stdio.h>

__global__ void vectorSub(float* a, float* b, float* c, int n) {
    // 여기에 코드 작성
}

int main() {
    int n = 1000;
    // 여기에 코드 작성

    return 0;
}
```

---

### 문제 5: Dot Product (어려움)

두 벡터의 내적(dot product)을 계산하세요:

result = A[0]*B[0] + A[1]*B[1] + ... + A[n-1]*B[n-1]

힌트: 각 스레드가 곱셈 결과를 저장하고, 나중에 합산

```c
// 단계 1: 원소별 곱셈
__global__ void multiply(float* a, float* b, float* c, int n) {
    // 여기에 코드 작성
}

// 단계 2: CPU에서 합산
float sum = 0;
for (int i = 0; i < n; i++) {
    sum += c[i];
}
```

---

### 문제 6: 이미지 밝기 조절 (어려움)

2D 이미지의 모든 픽셀 밝기를 조절하는 커널:

```c
// 가정: 이미지는 width x height 크기의 1D 배열
// image[y * width + x] = 픽셀 (x, y)의 값

__global__ void adjustBrightness(unsigned char* image,
                                  int width, int height,
                                  int adjustment) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    // 여기에 코드 작성
    // 힌트: 범위 체크 필요
    // 힌트: 밝기는 0~255 사이
}
```

---

## 3. 실습 과제

### 과제 1: SAXPY

SAXPY: Y = a*X + Y (a는 스칼라)

기계학습에서 자주 사용되는 연산입니다.

```c
// saxpy.cu
#include <stdio.h>

__global__ void saxpy(float a, float* x, float* y, int n) {
    // 여기에 구현
}

int main() {
    int n = 1000000;
    float a = 2.0f;

    // Unified Memory 사용
    // X와 Y 초기화
    // 커널 실행
    // 결과 검증

    return 0;
}
```

**테스트:**
- X = [1, 2, 3, ...], Y = [1, 1, 1, ...], a = 2
- 결과 Y = [3, 5, 7, ...] 이어야 함

---

### 과제 2: 벡터 정규화

벡터의 모든 원소를 최대값으로 나누어 0~1 범위로 만들기:

```c
// 1단계: 최대값 찾기 (CPU에서)
// 2단계: 모든 원소를 최대값으로 나누기 (GPU에서)

__global__ void normalize(float* data, float maxVal, int n) {
    // 여기에 구현
}
```

---

## 4. 정답

### 문제 1 정답

1. 4 × 3 = **12 블록**
2. 8 × 8 = **64 스레드**
3. 12 × 64 = **768 스레드**
4. x = 2 × 8 + 5 = **21**, y = 1 × 8 + 3 = **11** → **(21, 11)**

### 문제 2 정답

A-3, B-4, C-1, D-2

### 문제 3 정답

`cudaDeviceSynchronize()` 누락!

```c
kernel<<<4, 256>>>(data, 1000);
cudaDeviceSynchronize();  // 추가 필요
printf("Result: %f\n", data[0]);
```

### 문제 4 정답

```c
#include <stdio.h>

__global__ void vectorSub(float* a, float* b, float* c, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        c[idx] = a[idx] - b[idx];
    }
}

int main() {
    int n = 1000;
    size_t size = n * sizeof(float);

    float *a, *b, *c;
    cudaMallocManaged(&a, size);
    cudaMallocManaged(&b, size);
    cudaMallocManaged(&c, size);

    for (int i = 0; i < n; i++) {
        a[i] = i * 2;
        b[i] = i;
    }

    int threads = 256;
    int blocks = (n + threads - 1) / threads;

    vectorSub<<<blocks, threads>>>(a, b, c, n);
    cudaDeviceSynchronize();

    // 검증: c[i] = a[i] - b[i] = 2i - i = i
    printf("c[0] = %.0f (expected: 0)\n", c[0]);
    printf("c[5] = %.0f (expected: 5)\n", c[5]);
    printf("c[999] = %.0f (expected: 999)\n", c[999]);

    cudaFree(a);
    cudaFree(b);
    cudaFree(c);

    return 0;
}
```

### 문제 6 정답 (일부)

```c
__global__ void adjustBrightness(unsigned char* image,
                                  int width, int height,
                                  int adjustment) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    if (x < width && y < height) {
        int idx = y * width + x;
        int newVal = image[idx] + adjustment;

        // 0~255 범위 유지
        if (newVal < 0) newVal = 0;
        if (newVal > 255) newVal = 255;

        image[idx] = (unsigned char)newVal;
    }
}
```

---

## 5. 체크리스트

이번 주를 마무리하며:

- [ ] dim3 타입을 사용할 수 있다
- [ ] 2D Grid/Block 인덱스를 계산할 수 있다
- [ ] cudaMallocManaged()를 사용할 수 있다
- [ ] cudaDeviceSynchronize()의 중요성을 안다
- [ ] Vector Addition을 구현할 수 있다
- [ ] 블록 수를 올바르게 계산할 수 있다
- [ ] 범위 체크를 잊지 않는다

---

## 6. 다음 주 예고

**Week 3: 메모리 관리 심화 + 행렬 연산**

- Shared Memory 사용법
- 메모리 접근 패턴 최적화
- 행렬 곱셈 구현
- 성능 측정 및 분석

다음 주에는 더 복잡한 연산과 최적화 기법을 배웁니다!
