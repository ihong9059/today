# Day 5: 실습 및 복습

## 1. 이번 주 복습

### 1.1 핵심 개념 요약

```
┌─────────────────────────────────────────────────────┐
│  Jetson = 작은 AI 컴퓨터 (CPU + GPU 통합)           │
│  CUDA = GPU 프로그래밍 도구                          │
│  커널 = GPU에서 실행되는 함수 (__global__)           │
│  Thread = 가장 작은 실행 단위                        │
│  Block = Thread의 모음                              │
│  Grid = Block의 모음                                │
└─────────────────────────────────────────────────────┘
```

### 1.2 필수 명령어

```bash
# CUDA 버전 확인
nvcc --version

# GPU 상태 확인
nvidia-smi
tegrastats

# CUDA 컴파일
nvcc 파일명.cu -o 실행파일명

# 실행
./실행파일명
```

### 1.3 코드 템플릿

```c
#include <stdio.h>

__global__ void myKernel() {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    // GPU 코드
}

int main() {
    // 1. 커널 호출
    myKernel<<<블록수, 스레드수>>>();

    // 2. 완료 대기
    cudaDeviceSynchronize();

    return 0;
}
```

---

## 2. 연습 문제

### 문제 1: 환경 확인 (쉬움)

다음 명령어의 출력을 확인하세요:

```bash
nvcc --version
nvidia-smi
```

**질문:** CUDA 버전은 몇인가요?

---

### 문제 2: 코드 분석 (쉬움)

다음 코드의 출력을 예측하세요:

```c
__global__ void kernel() {
    printf("Thread %d\n", threadIdx.x);
}

int main() {
    kernel<<<1, 3>>>();
    cudaDeviceSynchronize();
    return 0;
}
```

**예상 출력:**
```
Thread ___
Thread ___
Thread ___
```

---

### 문제 3: 스레드 계산 (중간)

다음 설정에서 총 스레드 수는?

| 설정 | 총 스레드 수 |
|------|-------------|
| `<<<1, 10>>>` | ___ |
| `<<<5, 20>>>` | ___ |
| `<<<8, 128>>>` | ___ |
| `<<<256, 256>>>` | ___ |

---

### 문제 4: 전역 인덱스 계산 (중간)

`<<<4, 8>>>` 설정에서:

1. Block 2, Thread 5의 전역 인덱스는?
2. 전역 인덱스 27은 어느 Block의 몇 번 Thread인가?

**공식:** `globalIdx = blockIdx.x * blockDim.x + threadIdx.x`

---

### 문제 5: 코드 작성 (어려움)

1부터 10까지 숫자를 GPU에서 출력하는 프로그램을 작성하세요.

```c
// 파일명: print_numbers.cu

#include <stdio.h>

__global__ void printNumbers() {
    // 여기에 코드 작성
    // 힌트: threadIdx.x + 1
}

int main() {
    // 여기에 코드 작성
    // 힌트: 10개 스레드 필요

    return 0;
}
```

---

### 문제 6: 버그 찾기 (어려움)

다음 코드의 문제점을 찾으세요:

```c
#include <stdio.h>

__global__ void buggyKernel() {
    printf("Hello from thread %d\n", threadIdx.x);
}

int main() {
    printf("Starting...\n");
    buggyKernel<<<1, 5>>>();
    printf("Done!\n");
    return 0;
}
```

**문제점:**
___________________________________

**수정 방법:**
___________________________________

---

## 3. 실습 과제

### 과제 1: 자기 소개 프로그램

각 스레드가 자신을 소개하는 프로그램을 작성하세요.

**출력 예시:**
```
=== GPU Thread Introduction ===
Hi! I'm thread 0 from block 0 (global ID: 0)
Hi! I'm thread 1 from block 0 (global ID: 1)
...
Hi! I'm thread 0 from block 1 (global ID: 4)
...
```

**요구사항:**
- 2개 블록, 블록당 4개 스레드
- 전역 ID 포함
- `cudaDeviceSynchronize()` 사용

---

### 과제 2: 구구단 출력

특정 단의 구구단을 GPU에서 출력하세요.

**출력 예시 (3단):**
```
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
...
3 x 9 = 27
```

**힌트:**
```c
__global__ void gugudan(int dan) {
    int num = threadIdx.x + 1;  // 1~9
    printf("%d x %d = %d\n", dan, num, dan * num);
}

int main() {
    gugudan<<<1, 9>>>(3);  // 3단
    // ...
}
```

---

## 4. 정답

### 문제 2 정답
```
Thread 0
Thread 1
Thread 2
```
(순서는 바뀔 수 있음)

### 문제 3 정답
| 설정 | 총 스레드 수 |
|------|-------------|
| `<<<1, 10>>>` | 10 |
| `<<<5, 20>>>` | 100 |
| `<<<8, 128>>>` | 1024 |
| `<<<256, 256>>>` | 65536 |

### 문제 4 정답
1. Block 2, Thread 5: `2 * 8 + 5 = 21`
2. 27 ÷ 8 = 3 나머지 3 → Block 3, Thread 3

### 문제 5 정답
```c
#include <stdio.h>

__global__ void printNumbers() {
    int num = threadIdx.x + 1;
    printf("%d\n", num);
}

int main() {
    printNumbers<<<1, 10>>>();
    cudaDeviceSynchronize();
    return 0;
}
```

### 문제 6 정답
**문제점:** `cudaDeviceSynchronize()` 누락

**수정:**
```c
buggyKernel<<<1, 5>>>();
cudaDeviceSynchronize();  // 이 줄 추가
printf("Done!\n");
```

---

## 5. 과제 정답

### 과제 1 정답
```c
#include <stdio.h>

__global__ void introduce() {
    int globalId = blockIdx.x * blockDim.x + threadIdx.x;
    printf("Hi! I'm thread %d from block %d (global ID: %d)\n",
           threadIdx.x, blockIdx.x, globalId);
}

int main() {
    printf("=== GPU Thread Introduction ===\n");
    introduce<<<2, 4>>>();
    cudaDeviceSynchronize();
    return 0;
}
```

### 과제 2 정답
```c
#include <stdio.h>

__global__ void gugudan(int dan) {
    int num = threadIdx.x + 1;
    printf("%d x %d = %d\n", dan, num, dan * num);
}

int main() {
    int dan = 3;
    printf("=== %d단 ===\n", dan);
    gugudan<<<1, 9>>>(dan);
    cudaDeviceSynchronize();
    return 0;
}
```

---

## 6. 체크리스트

이번 주를 마무리하며 확인하세요:

- [ ] Jetson에 JetPack이 설치되어 있다
- [ ] `nvcc --version`이 정상 출력된다
- [ ] CUDA 프로그램을 컴파일할 수 있다
- [ ] `__global__`의 의미를 알고 있다
- [ ] Thread, Block, Grid 개념을 이해했다
- [ ] `threadIdx.x`, `blockIdx.x`를 사용할 수 있다
- [ ] 전역 인덱스를 계산할 수 있다
- [ ] `cudaDeviceSynchronize()`의 역할을 알고 있다

---

## 7. 다음 주 예고

**Week 2: Thread/Block 심화 + Vector Addition**

- Thread와 Block 심화 학습
- 메모리 할당 방법
- 실제 연산: 벡터 덧셈
- 성능 측정 기초

다음 주에는 실제로 계산을 수행하는 프로그램을 작성합니다!
