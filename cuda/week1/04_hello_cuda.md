# Day 4: Hello CUDA 작성

## 1. 첫 번째 CUDA 프로그램

오늘은 GPU에서 "Hello"를 출력하는 프로그램을 작성합니다!

### 1.1 작업 폴더로 이동

```bash
cd ~/cuda_study/week1
```

---

## 2. Hello CUDA 작성

### 2.1 파일 생성

```bash
nano hello_cuda.cu
```

### 2.2 코드 입력

```c
#include <stdio.h>

// __global__ : GPU에서 실행되는 함수 (커널)
__global__ void helloFromGPU() {
    printf("Hello from GPU! I am thread %d\n", threadIdx.x);
}

int main() {
    // CPU에서 출력
    printf("Hello from CPU!\n");
    printf("-------------------\n");

    // GPU 커널 호출
    // <<<1, 5>>> : 1개 블록, 5개 스레드
    helloFromGPU<<<1, 5>>>();

    // GPU 작업 완료 대기
    cudaDeviceSynchronize();

    printf("-------------------\n");
    printf("Done!\n");

    return 0;
}
```

저장: `Ctrl + O` → `Enter` → `Ctrl + X`

### 2.3 컴파일

```bash
nvcc hello_cuda.cu -o hello_cuda
```

### 2.4 실행

```bash
./hello_cuda
```

### 2.5 예상 출력

```
Hello from CPU!
-------------------
Hello from GPU! I am thread 0
Hello from GPU! I am thread 1
Hello from GPU! I am thread 2
Hello from GPU! I am thread 3
Hello from GPU! I am thread 4
-------------------
Done!
```

**참고:** 스레드의 출력 순서는 바뀔 수 있습니다! (병렬 실행이므로)

---

## 3. 코드 분석

### 3.1 `__global__` 키워드

```c
__global__ void helloFromGPU()
```

| 키워드 | 호출 위치 | 실행 위치 |
|--------|----------|----------|
| `__global__` | CPU에서 호출 | GPU에서 실행 |
| `__device__` | GPU에서 호출 | GPU에서 실행 |
| `__host__` | CPU에서 호출 | CPU에서 실행 |

### 3.2 `<<<블록 수, 스레드 수>>>`

```c
helloFromGPU<<<1, 5>>>();
//            ↑   ↑
//         블록수  블록당 스레드 수
```

| 설정 | 총 스레드 수 |
|------|-------------|
| `<<<1, 5>>>` | 1 × 5 = 5개 |
| `<<<2, 10>>>` | 2 × 10 = 20개 |
| `<<<4, 256>>>` | 4 × 256 = 1024개 |

### 3.3 `threadIdx.x`

각 스레드의 번호를 알려줍니다.

```
Block 0:
┌─────┬─────┬─────┬─────┬─────┐
│  0  │  1  │  2  │  3  │  4  │  ← threadIdx.x
└─────┴─────┴─────┴─────┴─────┘
```

### 3.4 `cudaDeviceSynchronize()`

GPU 작업이 끝날 때까지 CPU가 기다립니다.

```
CPU: 커널 호출 ──→ (기다림) ──→ 다음 코드 실행
                     ↑
GPU: ═══════════════════════
     커널 실행 중...   완료!
```

이 함수가 없으면 CPU가 GPU 작업 완료를 기다리지 않고 넘어갑니다!

---

## 4. 실험해보기

### 실험 1: 스레드 수 변경

```c
// 10개 스레드로 변경
helloFromGPU<<<1, 10>>>();
```

### 실험 2: 블록 수 변경

```c
// 2개 블록, 각 3개 스레드 = 총 6개
helloFromGPU<<<2, 3>>>();
```

블록 번호도 출력하려면 코드 수정:

```c
__global__ void helloFromGPU() {
    printf("Block %d, Thread %d\n", blockIdx.x, threadIdx.x);
}
```

### 실험 3: 많은 스레드

```c
// 1000개 스레드!
helloFromGPU<<<1, 1000>>>();
```

**주의:** 블록당 최대 스레드 수는 1024개입니다.

---

## 5. 전체 인덱스 계산

블록이 여러 개일 때, 전역 스레드 번호 계산:

```c
__global__ void kernel() {
    // 전역 스레드 ID 계산
    int globalIdx = blockIdx.x * blockDim.x + threadIdx.x;
    //              ─────────   ──────────   ───────────
    //              블록 번호    블록 크기    블록 내 번호

    printf("Global ID: %d (Block %d, Thread %d)\n",
           globalIdx, blockIdx.x, threadIdx.x);
}

int main() {
    // 3개 블록, 블록당 4개 스레드 = 12개 스레드
    kernel<<<3, 4>>>();
    cudaDeviceSynchronize();
    return 0;
}
```

**결과:**
```
Block 0: Thread 0,1,2,3 → Global 0,1,2,3
Block 1: Thread 0,1,2,3 → Global 4,5,6,7
Block 2: Thread 0,1,2,3 → Global 8,9,10,11
```

계산 방법:
```
Global ID = blockIdx.x × blockDim.x + threadIdx.x

Block 1, Thread 2의 경우:
Global ID = 1 × 4 + 2 = 6
```

---

## 6. 완성 코드: hello_cuda_v2.cu

```c
#include <stdio.h>

__global__ void helloFromGPU() {
    // 전역 스레드 ID 계산
    int globalIdx = blockIdx.x * blockDim.x + threadIdx.x;

    printf("Hello! Global ID: %d (Block: %d, Thread: %d)\n",
           globalIdx, blockIdx.x, threadIdx.x);
}

int main() {
    printf("=== CUDA Hello World ===\n\n");

    printf("CPU: Launching kernel with 3 blocks, 4 threads each\n");
    printf("Total threads: %d\n\n", 3 * 4);

    // 3개 블록, 4개 스레드
    helloFromGPU<<<3, 4>>>();

    // GPU 작업 완료 대기
    cudaDeviceSynchronize();

    printf("\nCPU: Kernel finished!\n");

    return 0;
}
```

---

## 7. 오늘의 실습

### 실습 1: 기본 Hello CUDA
- [ ] `hello_cuda.cu` 작성
- [ ] 컴파일 및 실행
- [ ] 스레드 번호 확인

### 실습 2: 스레드 수 실험
- [ ] `<<<1, 10>>>` 으로 변경하여 실행
- [ ] `<<<2, 5>>>` 로 변경하여 실행
- [ ] 출력 순서가 다른지 확인

### 실습 3: 전역 인덱스
- [ ] `hello_cuda_v2.cu` 작성
- [ ] `<<<3, 4>>>` 로 실행
- [ ] 전역 ID가 0~11인지 확인

### 실습 4: 도전!
- [ ] 총 100개의 스레드를 만들어보세요
- [ ] 힌트: `<<<10, 10>>>` 또는 `<<<4, 25>>>`

---

## 8. 자주 하는 실수

### 실수 1: cudaDeviceSynchronize() 빠뜨림
```c
helloFromGPU<<<1, 5>>>();
// cudaDeviceSynchronize(); 없음
printf("Done!\n");  // GPU 출력 전에 프로그램 종료!
```

### 실수 2: 확장자를 .c로 함
```bash
nvcc hello.c -o hello  # 에러 가능
nvcc hello.cu -o hello # 올바름
```

### 실수 3: 블록당 스레드 1024개 초과
```c
helloFromGPU<<<1, 2000>>>();  // 에러!
helloFromGPU<<<2, 1000>>>();  // 올바름 (2000개 스레드)
```

---

## 9. 용어 정리

| 용어 | 의미 |
|------|------|
| `__global__` | GPU 커널 함수 선언 |
| `<<<B, T>>>` | B개 블록, T개 스레드로 실행 |
| `threadIdx.x` | 블록 내 스레드 번호 |
| `blockIdx.x` | 블록 번호 |
| `blockDim.x` | 블록 크기 (스레드 수) |
| `cudaDeviceSynchronize()` | GPU 완료 대기 |

---

## 10. 다음 시간 예고

내일은 이번 주 내용을 복습하고 연습 문제를 풀어봅니다!
- 환경 설정 복습
- CUDA 개념 복습
- 코드 작성 연습
