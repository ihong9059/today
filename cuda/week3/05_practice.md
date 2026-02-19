# Day 5: 실습 및 복습

## 1. 이번 주 복습

### 1.1 CUDA 메모리 계층

```
속도:  Register > Shared > L1/L2 Cache > Global

크기:  Global > L2 > L1 > Shared > Register

용도:
- Register: 지역 변수
- Shared: 블록 내 공유 데이터
- Global: 대용량 데이터
```

### 1.2 핵심 함수/키워드

| 항목 | 용도 |
|------|------|
| `__shared__` | Shared Memory 선언 |
| `__syncthreads()` | 블록 내 동기화 |
| `atomicAdd()` | 원자적 덧셈 |
| `extern __shared__` | 동적 Shared Memory |

### 1.3 행렬 연산

```c
// 2D 인덱싱
int row = blockIdx.y * blockDim.y + threadIdx.y;
int col = blockIdx.x * blockDim.x + threadIdx.x;

// 1D 인덱스 변환
int idx = row * numCols + col;
```

---

## 2. 연습 문제

### 문제 1: 메모리 종류 (쉬움)

다음 변수는 어떤 메모리에 저장되나요?

```c
__global__ void kernel(float* data) {
    __shared__ float s[256];      // A: ___________
    float x = threadIdx.x;         // B: ___________
    float y = data[threadIdx.x];   // C: ___________ (data가 가리키는 곳)
}
```

### 문제 2: 동기화 (쉬움)

다음 코드의 문제점은?

```c
__global__ void buggy() {
    __shared__ float data[256];

    if (threadIdx.x < 128) {
        data[threadIdx.x] = 1;
        __syncthreads();
    } else {
        data[threadIdx.x] = 2;
        __syncthreads();
    }
}
```

### 문제 3: Reduction (중간)

배열의 최솟값을 찾는 커널을 완성하세요:

```c
__global__ void minReduction(float* data, float* result, int n) {
    __shared__ float partialMin[256];
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    int tid = threadIdx.x;

    // 1. 데이터 로드
    partialMin[tid] = (idx < n) ? data[idx] : FLT_MAX;
    __syncthreads();

    // 2. Reduction
    for (int stride = blockDim.x / 2; stride > 0; stride /= 2) {
        if (tid < stride) {
            // 여기에 코드 작성
        }
        __syncthreads();
    }

    // 3. 결과 저장
    if (tid == 0) {
        atomicMin(result, partialMin[0]);  // 주의: float용 atomicMin 필요
    }
}
```

### 문제 4: 행렬 전치 (중간)

Shared Memory를 사용한 행렬 전치:

```c
#define TILE_SIZE 16

__global__ void transpose(float* A, float* B, int rows, int cols) {
    __shared__ float tile[TILE_SIZE][TILE_SIZE];

    int x = blockIdx.x * TILE_SIZE + threadIdx.x;
    int y = blockIdx.y * TILE_SIZE + threadIdx.y;

    // A에서 읽어 Shared Memory에 저장
    // 여기에 코드 작성

    __syncthreads();

    // Shared Memory에서 읽어 B에 전치하여 저장
    // 힌트: x와 y를 바꿔야 함
    // 여기에 코드 작성
}
```

### 문제 5: 타일링 이해 (어려움)

16x16 타일로 32x32 행렬을 처리할 때:

1. 필요한 타일 수는? (Grid 크기)
2. 행렬 곱셈에서 각 블록이 몇 번 타일을 로드하나요?
3. 총 Shared Memory 접근 vs Global Memory 접근 비율은?

---

## 3. 실습 과제

### 과제 1: 1D Convolution

1차원 합성곱 구현 (이미지 필터링의 기초):

```
입력:  [1, 2, 3, 4, 5]
필터:  [1, 0, -1]
출력:  [_, 2, 2, 2, _]  (양 끝은 0 또는 무시)

계산: out[i] = in[i-1]*f[0] + in[i]*f[1] + in[i+1]*f[2]
      out[2] = 2*1 + 3*0 + 4*(-1) = 2 - 4 = -2... (예시 수정 필요)
```

Shared Memory를 사용하여 구현하세요.

### 과제 2: 행렬-벡터 곱셈

y = A × x (A: MxN 행렬, x: N 벡터, y: M 벡터)

```c
// y[i] = Σ A[i][j] * x[j]
__global__ void matVecMul(float* A, float* x, float* y,
                           int M, int N) {
    // 구현하세요
    // 힌트: 각 스레드가 y의 한 원소 담당
}
```

---

## 4. 정답

### 문제 1 정답
- A: Shared Memory
- B: Register
- C: Global Memory

### 문제 2 정답
데드락 발생! 조건문에서 일부 스레드만 `__syncthreads()`에 도달.

**수정:**
```c
data[threadIdx.x] = (threadIdx.x < 128) ? 1 : 2;
__syncthreads();  // 모든 스레드가 도달
```

### 문제 3 정답 (핵심 부분)
```c
if (tid < stride) {
    if (partialMin[tid + stride] < partialMin[tid]) {
        partialMin[tid] = partialMin[tid + stride];
    }
    // 또는: partialMin[tid] = fminf(partialMin[tid], partialMin[tid + stride]);
}
```

### 문제 4 정답
```c
// A에서 읽어 Shared Memory에 저장
if (x < cols && y < rows) {
    tile[threadIdx.y][threadIdx.x] = A[y * cols + x];
}
__syncthreads();

// 전치된 위치 계산
int newX = blockIdx.y * TILE_SIZE + threadIdx.x;
int newY = blockIdx.x * TILE_SIZE + threadIdx.y;

// B에 전치하여 저장
if (newX < rows && newY < cols) {
    B[newY * rows + newX] = tile[threadIdx.x][threadIdx.y];
}
```

### 문제 5 정답
1. 2x2 = 4 블록 (타일)
2. 2번 (K/TILE_SIZE = 32/16 = 2)
3. Global: 2×16×16 = 512회 (로드)
   Shared: 16×16 = 256회 (계산 시 접근)
   비율: 약 2:1 (데이터 재사용)

---

## 5. 체크리스트

- [ ] CUDA 메모리 계층을 설명할 수 있다
- [ ] `__shared__`와 `__syncthreads()`를 사용할 수 있다
- [ ] Reduction 알고리즘을 이해한다
- [ ] 행렬 덧셈을 GPU로 구현할 수 있다
- [ ] 행렬 곱셈을 GPU로 구현할 수 있다
- [ ] 타일링 기법의 장점을 설명할 수 있다

---

## 6. 다음 주 예고

**Week 4: 이미지 처리 프로젝트**

- 이미지 파일 읽기/쓰기
- Grayscale 변환
- 이미지 필터링 (Blur, Edge Detection)
- 실제 프로젝트 완성
