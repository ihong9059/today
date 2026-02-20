# 예제 2: hello_cuda_v2.cu

## 목적
**블록(Block)과 스레드(Thread)의 관계를 이해한다.**

CUDA에서 가장 중요한 개념인 **그리드-블록-스레드 계층 구조**를 배웁니다.

---

## 실행 방법

```bash
cd ~/cuda/week1/code
nvcc hello_cuda_v2.cu -o hello_cuda_v2
./hello_cuda_v2
```

---

## 실행 결과

```
=== CUDA Hello World v2 ===

CPU: Launching kernel with 3 blocks, 4 threads each
Total threads: 12

Hello! Global ID:  0 (Block: 0, Thread: 0)
Hello! Global ID:  1 (Block: 0, Thread: 1)
Hello! Global ID:  2 (Block: 0, Thread: 2)
Hello! Global ID:  3 (Block: 0, Thread: 3)
Hello! Global ID:  4 (Block: 1, Thread: 0)
Hello! Global ID:  5 (Block: 1, Thread: 1)
Hello! Global ID:  6 (Block: 1, Thread: 2)
Hello! Global ID:  7 (Block: 1, Thread: 3)
Hello! Global ID:  8 (Block: 2, Thread: 0)
Hello! Global ID:  9 (Block: 2, Thread: 1)
Hello! Global ID: 10 (Block: 2, Thread: 2)
Hello! Global ID: 11 (Block: 2, Thread: 3)

CPU: Kernel finished!
```

---

## 코드 분석

### 핵심 코드

```c
__global__ void helloFromGPU() {
    // 전역 스레드 ID 계산
    int globalIdx = blockIdx.x * blockDim.x + threadIdx.x;

    printf("Hello! Global ID: %2d (Block: %d, Thread: %d)\n",
           globalIdx, blockIdx.x, threadIdx.x);
}

int main() {
    int numBlocks = 3;
    int threadsPerBlock = 4;

    // 커널 호출: 3개 블록, 각 블록당 4개 스레드
    helloFromGPU<<<numBlocks, threadsPerBlock>>>();

    cudaDeviceSynchronize();
    return 0;
}
```

### CUDA 내장 변수

| 변수 | 의미 | 이 예제에서 값 |
|------|------|--------------|
| `blockIdx.x` | 현재 블록 번호 | 0, 1, 2 |
| `blockDim.x` | 블록당 스레드 수 | 4 |
| `threadIdx.x` | 블록 내 스레드 번호 | 0, 1, 2, 3 |

---

## 핵심 포인트

### 1. 그리드-블록-스레드 계층 구조

```
┌─────────────────────────────────────────────────────────────┐
│                         그리드 (Grid)                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                     │    │
│  │   블록 0              블록 1              블록 2    │    │
│  │  ┌─────────┐         ┌─────────┐         ┌─────────┐│    │
│  │  │ T0  T1  │         │ T0  T1  │         │ T0  T1  ││    │
│  │  │ T2  T3  │         │ T2  T3  │         │ T2  T3  ││    │
│  │  └─────────┘         └─────────┘         └─────────┘│    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  <<<3, 4>>> = 3개 블록 × 4개 스레드 = 12개 스레드           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. 전역 인덱스 계산 공식

```
globalIdx = blockIdx.x * blockDim.x + threadIdx.x
```

이 공식은 CUDA 프로그래밍에서 **가장 중요한 공식**입니다!

```
블록 0: globalIdx = 0 * 4 + (0,1,2,3) = 0, 1, 2, 3
블록 1: globalIdx = 1 * 4 + (0,1,2,3) = 4, 5, 6, 7
블록 2: globalIdx = 2 * 4 + (0,1,2,3) = 8, 9, 10, 11
```

### 3. 시각적 이해

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   배열 데이터:  [0][1][2][3][4][5][6][7][8][9][10][11]      │
│                  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓   ↓   ↓      │
│                 ┌──────────┐┌──────────┐┌──────────┐        │
│                 │  블록 0  ││  블록 1  ││  블록 2  │        │
│                 │ T0 T1 T2 ││ T0 T1 T2 ││ T0 T1 T2 │        │
│                 │ T3       ││ T3       ││ T3       │        │
│                 └──────────┘└──────────┘└──────────┘        │
│                                                             │
│   → 각 스레드가 배열의 한 요소를 담당!                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 왜 블록으로 나누는가?

### 하드웨어 제한

| 제한 사항 | 값 (일반적) |
|----------|------------|
| 블록당 최대 스레드 수 | 1024개 |
| 그리드당 최대 블록 수 | 수백만 개 |

### 실제 활용

```
1천만 개 데이터를 처리하려면:
- 블록당 256 스레드
- 필요한 블록 수 = 10,000,000 / 256 = 39,063개

gridSize = (N + blockSize - 1) / blockSize  ← 자주 쓰는 공식
```

---

## 이 예제에서 배우는 것

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   📚 핵심 교훈                                                ║
║                                                               ║
║   1. CUDA는 그리드 > 블록 > 스레드 계층 구조                  ║
║                                                               ║
║   2. globalIdx = blockIdx.x * blockDim.x + threadIdx.x        ║
║      → 이 공식으로 각 스레드가 처리할 데이터를 결정           ║
║                                                               ║
║   3. blockIdx.x : 블록 번호                                   ║
║      blockDim.x : 블록 크기 (스레드 수)                       ║
║      threadIdx.x : 블록 내 스레드 번호                        ║
║                                                               ║
║   4. 이 인덱스 계산이 GPU 병렬 처리의 핵심!                   ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 연습 문제

1. `<<<4, 8>>>`로 실행하면 총 몇 개의 스레드가 생성될까요?
2. Block 3, Thread 5의 globalIdx는 얼마일까요?

**정답:**
1. 4 × 8 = 32개
2. 3 × 8 + 5 = 29

---

## 다음 단계

`gugudan.cu`에서 이 개념을 활용하여 실제 계산을 수행합니다.

---

*작성일: 2026-02-20*
