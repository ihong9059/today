# Day 1: Thread/Block 심화

## 1. 복습: 1차원 인덱싱

지난 주에 배운 1D 인덱싱:

```c
int idx = blockIdx.x * blockDim.x + threadIdx.x;
```

```
Grid (1D)
┌─────────┬─────────┬─────────┐
│ Block 0 │ Block 1 │ Block 2 │
└─────────┴─────────┴─────────┘

Block 0 (1D)
┌───┬───┬───┬───┐
│ 0 │ 1 │ 2 │ 3 │  ← threadIdx.x
└───┴───┴───┴───┘
```

---

## 2. 2차원 Thread/Block

### 2.1 왜 2D가 필요한가?

이미지 처리에서 픽셀은 2D로 배열됩니다:

```
이미지 (640 x 480 픽셀)
┌───────────────────────────┐
│ (0,0) (1,0) (2,0) ...     │
│ (0,1) (1,1) (2,1) ...     │
│ (0,2) (1,2) (2,2) ...     │
│  ...   ...   ...   ...    │
└───────────────────────────┘
```

1D로 처리하면 불편:
```c
// 1D 인덱스를 2D 좌표로 변환 필요
int x = idx % width;
int y = idx / width;
```

2D로 처리하면 직관적:
```c
// 바로 2D 좌표 사용
int x = blockIdx.x * blockDim.x + threadIdx.x;
int y = blockIdx.y * blockDim.y + threadIdx.y;
```

### 2.2 2D Block 선언

```c
// dim3: CUDA의 3차원 벡터 타입
dim3 threadsPerBlock(16, 16);  // 16 x 16 = 256 스레드
dim3 numBlocks(4, 4);          // 4 x 4 = 16 블록

myKernel<<<numBlocks, threadsPerBlock>>>();
// 총 스레드: 16 x 16 x 4 x 4 = 4096개
```

### 2.3 2D 인덱스 계산

```c
__global__ void kernel2D() {
    // x 방향 인덱스
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    // y 방향 인덱스
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    printf("Thread at (%d, %d)\n", x, y);
}
```

### 2.4 2D 구조 시각화

```
Grid (2 x 2 블록)
┌─────────────┬─────────────┐
│  Block(0,0) │  Block(1,0) │
├─────────────┼─────────────┤
│  Block(0,1) │  Block(1,1) │
└─────────────┴─────────────┘

Block(0,0) 내부 (4 x 4 스레드)
┌─────┬─────┬─────┬─────┐
│(0,0)│(1,0)│(2,0)│(3,0)│
├─────┼─────┼─────┼─────┤
│(0,1)│(1,1)│(2,1)│(3,1)│
├─────┼─────┼─────┼─────┤
│(0,2)│(1,2)│(2,2)│(3,2)│
├─────┼─────┼─────┼─────┤
│(0,3)│(1,3)│(2,3)│(3,3)│
└─────┴─────┴─────┴─────┘
```

---

## 3. dim3 타입

### 3.1 dim3란?

CUDA에서 제공하는 3차원 벡터 타입입니다.

```c
dim3 myDim(x, y, z);  // 3D
dim3 myDim(x, y);     // 2D (z=1)
dim3 myDim(x);        // 1D (y=1, z=1)
```

### 3.2 사용 예시

```c
// 1D (기존 방식)
myKernel<<<4, 256>>>();

// 2D
dim3 blocks(4, 4);
dim3 threads(16, 16);
myKernel<<<blocks, threads>>>();

// 3D (거의 사용 안 함)
dim3 blocks3D(4, 4, 2);
dim3 threads3D(8, 8, 4);
myKernel<<<blocks3D, threads3D>>>();
```

---

## 4. CUDA 내장 변수 정리

| 변수 | 설명 | 타입 |
|------|------|------|
| `threadIdx` | 블록 내 스레드 위치 | dim3 |
| `blockIdx` | 그리드 내 블록 위치 | dim3 |
| `blockDim` | 블록 크기 | dim3 |
| `gridDim` | 그리드 크기 | dim3 |

### 4.1 접근 방법

```c
// x, y, z 멤버로 접근
threadIdx.x  // 0 ~ blockDim.x - 1
threadIdx.y  // 0 ~ blockDim.y - 1
threadIdx.z  // 0 ~ blockDim.z - 1

blockIdx.x   // 0 ~ gridDim.x - 1
blockIdx.y   // 0 ~ gridDim.y - 1
blockIdx.z   // 0 ~ gridDim.z - 1
```

---

## 5. 예제: 2D Grid 출력

### 5.1 코드

```c
// grid2d.cu
#include <stdio.h>

__global__ void print2D() {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;

    // 블록 (0,0)의 스레드만 출력 (출력 양 제한)
    if (blockIdx.x == 0 && blockIdx.y == 0) {
        printf("Global(%d,%d) = Block(%d,%d) Thread(%d,%d)\n",
               x, y, blockIdx.x, blockIdx.y, threadIdx.x, threadIdx.y);
    }
}

int main() {
    printf("=== 2D Grid Example ===\n\n");

    dim3 blocks(2, 2);     // 2x2 블록
    dim3 threads(4, 4);    // 4x4 스레드

    printf("Grid: %d x %d blocks\n", 2, 2);
    printf("Block: %d x %d threads\n", 4, 4);
    printf("Total: %d threads\n\n", 2*2*4*4);

    print2D<<<blocks, threads>>>();
    cudaDeviceSynchronize();

    return 0;
}
```

### 5.2 컴파일 및 실행

```bash
nvcc grid2d.cu -o grid2d
./grid2d
```

---

## 6. 블록 크기 선택 가이드

### 6.1 제한 사항

| 항목 | 최대값 |
|------|--------|
| 블록당 스레드 수 | 1024 |
| blockDim.x | 1024 |
| blockDim.y | 1024 |
| blockDim.z | 64 |
| gridDim.x | 2^31 - 1 |
| gridDim.y | 65535 |
| gridDim.z | 65535 |

### 6.2 권장 설정

```c
// 1D 작업
dim3 threads(256);      // 256개 스레드

// 2D 작업 (이미지 처리)
dim3 threads(16, 16);   // 16x16 = 256개

// 또는
dim3 threads(32, 8);    // 32x8 = 256개
```

### 6.3 왜 256, 512를 자주 쓰나요?

- GPU는 32개 스레드 단위(Warp)로 실행
- 256 = 32 × 8, 512 = 32 × 16
- 32의 배수가 효율적

---

## 7. 데이터 크기에 맞는 Grid 계산

### 7.1 문제

1000개 데이터를 처리하려면 몇 개의 블록이 필요할까?

### 7.2 계산 공식

```c
int dataSize = 1000;
int threadsPerBlock = 256;

// 올림 나눗셈
int numBlocks = (dataSize + threadsPerBlock - 1) / threadsPerBlock;
// numBlocks = (1000 + 255) / 256 = 4

// 총 스레드: 4 × 256 = 1024개 (24개 여분)
```

### 7.3 범위 체크

스레드가 데이터보다 많으면 범위 체크 필요:

```c
__global__ void process(int* data, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;

    // 범위 체크!
    if (idx < n) {
        data[idx] = data[idx] * 2;
    }
}

int main() {
    int n = 1000;
    int threads = 256;
    int blocks = (n + threads - 1) / threads;  // 4

    process<<<blocks, threads>>>(d_data, n);
}
```

---

## 8. 오늘의 실습

### 실습 1: 2D Grid 이해
- [ ] `grid2d.cu` 작성 및 실행
- [ ] 출력 결과 분석

### 실습 2: dim3 실험
- [ ] `dim3 blocks(3, 2);` `dim3 threads(8, 8);` 설정
- [ ] 총 스레드 수 계산 후 실행으로 확인

### 실습 3: 블록 수 계산
- [ ] 1000개 데이터, 블록당 256 스레드일 때 블록 수는?
- [ ] 10000개 데이터, 블록당 512 스레드일 때 블록 수는?

---

## 9. 용어 정리

| 용어 | 의미 |
|------|------|
| **dim3** | CUDA의 3차원 벡터 타입 |
| **gridDim** | Grid의 크기 (블록 수) |
| **blockDim** | Block의 크기 (스레드 수) |
| **Warp** | 32개 스레드 묶음 (GPU 실행 단위) |

---

## 10. 다음 시간 예고

내일은 GPU 메모리 할당 방법을 배웁니다!
- `cudaMalloc()`: GPU 메모리 할당
- `cudaMemcpy()`: 데이터 복사
- `cudaFree()`: 메모리 해제
