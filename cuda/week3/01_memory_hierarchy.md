# Day 1: CUDA 메모리 계층

## 1. 왜 메모리가 중요한가?

GPU는 연산은 빠르지만, 메모리 접근이 병목이 될 수 있습니다.

```
연산 속도:  ████████████████████████████████  (매우 빠름)
메모리 속도: ████████                          (상대적으로 느림)

→ 메모리 접근을 최적화하면 성능이 크게 향상!
```

---

## 2. CUDA 메모리 종류

### 2.1 전체 구조

```
┌─────────────────────────────────────────────────────────┐
│                      GPU                                │
│  ┌────────────────────────────────────────────────┐    │
│  │              Global Memory (느림, 큼)           │    │
│  │                  모든 스레드 접근 가능            │    │
│  └────────────────────────────────────────────────┘    │
│                          ↑↓                            │
│  ┌──────────────────┐  ┌──────────────────┐           │
│  │    Block 0       │  │    Block 1       │  ...      │
│  │ ┌──────────────┐ │  │ ┌──────────────┐ │           │
│  │ │Shared Memory │ │  │ │Shared Memory │ │  (빠름)   │
│  │ │ (블록 내 공유) │ │  │ │ (블록 내 공유) │ │           │
│  │ └──────────────┘ │  │ └──────────────┘ │           │
│  │  ↑↓          ↑↓  │  │  ↑↓          ↑↓  │           │
│  │ ┌───┐ ┌───┐ ... │  │ ┌───┐ ┌───┐ ... │           │
│  │ │Reg│ │Reg│     │  │ │Reg│ │Reg│     │  (가장빠름)│
│  │ └───┘ └───┘     │  │ └───┘ └───┘     │           │
│  │  T0    T1       │  │  T0    T1       │           │
│  └──────────────────┘  └──────────────────┘           │
└─────────────────────────────────────────────────────────┘
```

### 2.2 메모리 종류 비교

| 메모리 | 속도 | 크기 | 범위 | 수명 |
|--------|------|------|------|------|
| Register | 가장 빠름 | 가장 작음 | 스레드 전용 | 스레드 |
| Shared | 빠름 | 작음 (48KB) | 블록 내 공유 | 블록 |
| Global | 느림 | 큼 (GB) | 모든 스레드 | 애플리케이션 |
| Constant | 빠름 (캐시) | 작음 (64KB) | 읽기 전용 | 애플리케이션 |

---

## 3. Register (레지스터)

### 3.1 특징

- **가장 빠른** 메모리
- 각 스레드가 **개별 소유**
- 지역 변수가 저장됨

### 3.2 예시

```c
__global__ void kernel() {
    int x = 10;       // 레지스터에 저장
    float y = 3.14f;  // 레지스터에 저장
    int result = x * y;  // 레지스터에서 연산
}
```

### 3.3 주의사항

- 레지스터 수는 제한됨 (스레드당 ~255개)
- 너무 많은 변수 → "register spilling" → 느려짐

---

## 4. Global Memory (전역 메모리)

### 4.1 특징

- **가장 큰** 메모리 (GB 단위)
- 모든 스레드가 접근 가능
- **가장 느림** (수백 사이클)

### 4.2 예시

```c
// Global Memory 할당
float *d_data;
cudaMalloc(&d_data, size);

__global__ void kernel(float* data) {
    // data는 Global Memory를 가리킴
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    data[idx] = data[idx] * 2;  // Global Memory 접근
}
```

### 4.3 최적화: Coalesced Access

연속된 스레드가 연속된 메모리에 접근하면 빠름:

```
좋은 예 (Coalesced):
Thread 0 → data[0]
Thread 1 → data[1]
Thread 2 → data[2]
Thread 3 → data[3]
→ 한 번의 메모리 트랜잭션

나쁜 예 (Non-coalesced):
Thread 0 → data[0]
Thread 1 → data[100]
Thread 2 → data[200]
Thread 3 → data[300]
→ 여러 번의 메모리 트랜잭션 (느림!)
```

---

## 5. Shared Memory (공유 메모리)

### 5.1 특징

- **블록 내 스레드들이 공유**
- Global Memory보다 ~100배 빠름
- 크기 제한: 블록당 48KB (보통)
- 프로그래머가 직접 관리

### 5.2 선언 방법

```c
__global__ void kernel() {
    // 정적 할당
    __shared__ float sharedData[256];

    // 사용
    sharedData[threadIdx.x] = 10.0f;
}
```

### 5.3 동적 할당

```c
__global__ void kernel() {
    // 동적 Shared Memory (extern 사용)
    extern __shared__ float sharedData[];

    sharedData[threadIdx.x] = 10.0f;
}

// 호출 시 크기 지정
kernel<<<blocks, threads, sharedMemSize>>>();
```

### 5.4 사용 패턴

```c
__global__ void kernel(float* global_in, float* global_out, int n) {
    __shared__ float shared[256];

    int idx = blockIdx.x * blockDim.x + threadIdx.x;

    // 1. Global → Shared (한 번 읽기)
    if (idx < n) {
        shared[threadIdx.x] = global_in[idx];
    }

    // 2. 동기화 (모든 스레드가 로드 완료까지 대기)
    __syncthreads();

    // 3. Shared에서 여러 번 읽기 (빠름!)
    if (idx < n) {
        float result = shared[threadIdx.x] * 2;
        result += shared[threadIdx.x] + 1;
        global_out[idx] = result;
    }
}
```

---

## 6. `__syncthreads()`

### 6.1 역할

블록 내 모든 스레드가 이 지점에 도달할 때까지 대기

### 6.2 필요한 이유

```c
__shared__ float data[256];

// Thread 0: 데이터 쓰기
data[0] = 100;

// Thread 1: 데이터 읽기
float x = data[0];  // 문제! Thread 0이 아직 안 썼을 수도 있음
```

**해결:**
```c
__shared__ float data[256];

data[threadIdx.x] = threadIdx.x;  // 모두가 쓰기

__syncthreads();  // 모두 대기!

float x = data[(threadIdx.x + 1) % 256];  // 이제 안전하게 읽기
```

### 6.3 주의사항

- 조건문 안에서 사용 시 주의!
- 모든 스레드가 동일한 __syncthreads()에 도달해야 함

```c
// 위험한 코드!
if (threadIdx.x < 128) {
    __syncthreads();  // 절반만 도달 → 데드락!
}

// 올바른 코드
__syncthreads();
if (threadIdx.x < 128) {
    // 작업
}
```

---

## 7. Constant Memory (상수 메모리)

### 7.1 특징

- 읽기 전용
- 캐시됨 → 빠른 읽기
- 모든 스레드가 같은 값 읽을 때 효율적

### 7.2 사용법

```c
// 전역 선언 (커널 밖)
__constant__ float constData[256];

int main() {
    float hostData[256];
    // ... 초기화 ...

    // Constant Memory로 복사
    cudaMemcpyToSymbol(constData, hostData, sizeof(hostData));

    kernel<<<blocks, threads>>>();
}

__global__ void kernel() {
    float x = constData[0];  // 빠른 읽기!
}
```

---

## 8. 메모리 접근 속도 비교

```
레지스터:    ████████████████████████████████ 1 사이클
Shared:      ████████████████████████████    5 사이클
L1 캐시:     ████████████████████            20 사이클
L2 캐시:     ████████████████                40 사이클
Global:      ████████                        400+ 사이클
```

---

## 9. Jetson에서의 특이점

Jetson의 Unified Memory 덕분에:
- Global Memory 접근이 상대적으로 빠름
- 하지만 Shared Memory는 여전히 훨씬 빠름!

```
일반 GPU:    Global = 매우 느림, Shared = 빠름
Jetson:      Global = 보통, Shared = 빠름

→ Jetson에서도 Shared Memory 사용하면 성능 향상!
```

---

## 10. 오늘의 실습

### 실습 1: 메모리 종류 확인

```c
// memory_types.cu
#include <stdio.h>

__constant__ int constValue = 42;

__global__ void showMemory() {
    __shared__ int sharedValue;

    if (threadIdx.x == 0) {
        sharedValue = 100;  // Shared Memory
    }
    __syncthreads();

    int localValue = threadIdx.x;  // Register

    printf("Thread %d: const=%d, shared=%d, local=%d\n",
           threadIdx.x, constValue, sharedValue, localValue);
}

int main() {
    showMemory<<<1, 4>>>();
    cudaDeviceSynchronize();
    return 0;
}
```

### 실습 2: __syncthreads() 테스트
- [ ] __syncthreads() 없이 실행
- [ ] __syncthreads() 있이 실행
- [ ] 결과 차이 관찰

---

## 11. 용어 정리

| 용어 | 의미 |
|------|------|
| **Register** | 스레드 전용 가장 빠른 메모리 |
| **Shared Memory** | 블록 내 공유 메모리 |
| **Global Memory** | 모든 스레드 접근 가능한 큰 메모리 |
| **Constant Memory** | 읽기 전용 캐시 메모리 |
| **Coalesced Access** | 연속 메모리 접근 패턴 |
| **__syncthreads()** | 블록 내 스레드 동기화 |

---

## 12. 다음 시간 예고

내일은 Shared Memory를 실제로 활용해봅니다!
- 배열 합계 계산 (Reduction)
- Shared Memory 최적화 기법
