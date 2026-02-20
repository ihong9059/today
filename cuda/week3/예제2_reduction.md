# 예제 2: reduction.cu

## 목적
**Shared Memory를 사용한 병렬 Reduction(합계) 알고리즘을 배운다.**

배열의 합계를 구하는 것은 간단해 보이지만, **병렬로 효율적으로** 처리하려면 특별한 알고리즘이 필요합니다.

---

## 실행 방법

```bash
cd ~/cuda/week3/code
nvcc reduction.cu -o reduction
./reduction
```

---

## 실행 결과

```
========================================
  Array Sum with Reduction
  Elements: 1000000
========================================

Grid: 3907 blocks
Block: 256 threads

CPU Sum: 499523.47 (Time: 1.234 ms)
GPU Sum: 499523.50 (Time: 0.312 ms)
Difference: 0.031250
Speedup: 3.96x

Verification PASSED!
```

---

## 코드 분석

### GPU Reduction 커널

```c
#define BLOCK_SIZE 256

__global__ void sumReduction(float* data, float* blockSums, int n) {
    __shared__ float partialSum[BLOCK_SIZE];

    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    int tid = threadIdx.x;

    // 1. Global → Shared Memory
    partialSum[tid] = (idx < n) ? data[idx] : 0;
    __syncthreads();

    // 2. 트리 구조로 합산 (Reduction)
    for (int stride = blockDim.x / 2; stride > 0; stride /= 2) {
        if (tid < stride) {
            partialSum[tid] += partialSum[tid + stride];
        }
        __syncthreads();
    }

    // 3. 블록의 최종 합을 저장
    if (tid == 0) {
        blockSums[blockIdx.x] = partialSum[0];
    }
}
```

---

## 핵심 포인트

### 1. 왜 단순 합산이 안 되는가?

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   CPU 방식 (순차)                                           │
│                                                             │
│   sum = 0                                                   │
│   for (i = 0; i < n; i++)                                   │
│       sum += data[i]  ← 의존성! 이전 결과가 필요            │
│                                                             │
│   → 병렬화 불가                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   GPU 방식 (병렬 Reduction)                                 │
│                                                             │
│   트리 구조로 합산하여 의존성 제거                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. 트리 구조 Reduction

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   8개 요소 합산 예시                                        │
│                                                             │
│   초기: [1] [2] [3] [4] [5] [6] [7] [8]                     │
│          │   │   │   │   │   │   │   │                     │
│   Step1: [1+5] [2+6] [3+7] [4+8] [ ] [ ] [ ] [ ]           │
│          = [6]  [8]  [10]  [12]                             │
│            │     │     │     │                              │
│   Step2:  [6+10] [8+12] [ ] [ ]                             │
│          = [16]  [20]                                       │
│             │     │                                         │
│   Step3:   [16+20]                                          │
│          = [36]  ← 최종 합계!                               │
│                                                             │
│   3단계만에 완료! (log2(8) = 3)                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3. stride 변화 과정

```c
for (int stride = blockDim.x / 2; stride > 0; stride /= 2) {
    if (tid < stride) {
        partialSum[tid] += partialSum[tid + stride];
    }
    __syncthreads();
}
```

BLOCK_SIZE = 256일 때:
```
stride = 128: 스레드 0~127이 0+128, 1+129, ..., 127+255 합산
stride = 64:  스레드 0~63이 0+64, 1+65, ..., 63+127 합산
stride = 32:  스레드 0~31이 0+32, 1+33, ..., 31+63 합산
stride = 16:  스레드 0~15가 합산
stride = 8:   스레드 0~7이 합산
stride = 4:   스레드 0~3이 합산
stride = 2:   스레드 0~1이 합산
stride = 1:   스레드 0이 최종 합산

→ 8단계 (log2(256) = 8)
```

### 4. 2단계 Reduction

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   100만 개 요소 합산                                        │
│                                                             │
│   [단계 1: GPU]                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ 블록 0: 256개 → 합계 S0                             │   │
│   │ 블록 1: 256개 → 합계 S1                             │   │
│   │ 블록 2: 256개 → 합계 S2                             │   │
│   │ ...                                                 │   │
│   │ 블록 3906: 256개 → 합계 S3906                       │   │
│   └─────────────────────────────────────────────────────┘   │
│   → 3907개의 부분 합계                                      │
│                                                             │
│   [단계 2: CPU]                                             │
│   for (i = 0; i < numBlocks; i++)                           │
│       gpu_sum += blockSums[i];                              │
│   → 최종 합계                                               │
│                                                             │
│   (또는 GPU에서 재귀적으로 Reduction 가능)                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5. __syncthreads()가 필수인 이유

```c
// stride = 128일 때
if (tid < 128) {
    partialSum[tid] += partialSum[tid + 128];  // tid=0은 [0]+[128]
}
__syncthreads();  // ⚠️ 필수!

// stride = 64일 때
if (tid < 64) {
    partialSum[tid] += partialSum[tid + 64];   // tid=0은 [0]+[64]
}                                               // [64]가 아직 업데이트 안 됐을 수 있음!
```

동기화가 없으면 스레드 64가 아직 계산 중인데 스레드 0이 읽을 수 있음!

---

## 알고리즘 복잡도

| 방식 | 시간 복잡도 | 병렬성 |
|------|------------|--------|
| CPU 순차 | O(n) | 없음 |
| GPU Reduction | O(log n) | 최대 n/2 |

100만 개 합산:
- CPU: 100만 단계
- GPU: log2(1,000,000) ≈ 20 단계 (블록 내)

---

## 이 예제에서 배우는 것

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   📚 핵심 교훈                                                ║
║                                                               ║
║   1. Reduction = 트리 구조로 병렬 합산                        ║
║      - 의존성 있는 연산도 병렬화 가능                         ║
║      - O(n) → O(log n)                                        ║
║                                                               ║
║   2. Shared Memory로 블록 내 데이터 공유                      ║
║                                                               ║
║   3. stride 패턴: 절반씩 줄여가며 합산                        ║
║                                                               ║
║   4. 2단계 처리: GPU(블록별 합) + CPU(최종 합)                ║
║                                                               ║
║   5. 응용: 합계, 최대값, 최소값, 평균 등                      ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 응용 사례

| 연산 | Reduction 적용 |
|------|---------------|
| 합계 | `sum += val` |
| 최대값 | `max = (val > max) ? val : max` |
| 최소값 | `min = (val < min) ? val : min` |
| 평균 | 합계 / 개수 |
| 분산 | (x - mean)^2의 합계 |

딥러닝에서:
- **Loss 계산**: 배치 내 모든 샘플의 손실 합산
- **Normalization**: 평균, 분산 계산
- **Softmax**: 지수 합계 계산

---

## Week3 정리

| 예제 | 핵심 기법 | 효과 |
|------|----------|------|
| matrix_mul | Shared Memory + 타일링 | 2~3x 성능 향상 |
| reduction | Shared Memory + 트리 구조 | 병렬 합산 가능 |

**Shared Memory = GPU 최적화의 핵심!**

---

*작성일: 2026-02-20*
