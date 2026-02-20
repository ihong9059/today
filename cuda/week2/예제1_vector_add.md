# 예제 1: vector_add.cu

## 목적
**Unified Memory를 사용한 간편한 GPU 프로그래밍을 배운다.**

Week1에서는 `cudaMalloc` + `cudaMemcpy`를 사용했지만, 이 예제에서는 **Unified Memory**를 사용하여 메모리 관리를 단순화합니다.

---

## 실행 방법

```bash
cd ~/cuda/week2/code
nvcc vector_add.cu -o vector_add
./vector_add
```

---

## 실행 결과

```
========================================
  Vector Addition: 1000000 elements
========================================

Grid: 3907 blocks
Block: 256 threads

CPU Time: 2.891 ms
GPU Time: 0.842 ms
Speedup: 3.43x

Results match!

First 5 results:
  0.3745 + 0.9507 = 1.3253
  0.7320 + 0.5987 = 1.3307
  0.1560 + 0.1560 = 0.3120
  0.0581 + 0.8662 = 0.9243
  0.6011 + 0.7081 = 1.3092
```

---

## 코드 분석

### 핵심: Unified Memory

```c
// Week1 방식 (복잡)
float *h_a = (float*)malloc(size);      // CPU 메모리
float *d_a;
cudaMalloc(&d_a, size);                  // GPU 메모리
cudaMemcpy(d_a, h_a, size, cudaMemcpyHostToDevice);  // 복사
// ... 커널 실행 ...
cudaMemcpy(h_a, d_a, size, cudaMemcpyDeviceToHost);  // 복사
cudaFree(d_a);
free(h_a);

// Week2 방식 (간단!)
float *a;
cudaMallocManaged(&a, size);  // CPU와 GPU 모두 접근 가능!
// ... 데이터 초기화 (CPU에서) ...
// ... 커널 실행 (GPU에서) ...
// ... 결과 사용 (CPU에서) - 자동으로 동기화!
cudaFree(a);
```

### GPU 커널

```c
__global__ void vectorAddGPU(float* a, float* b, float* c, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        c[idx] = a[idx] + b[idx];  // 단순 덧셈
    }
}
```

### 전체 흐름

```c
// 1. Unified Memory 할당
cudaMallocManaged(&a, size);
cudaMallocManaged(&b, size);
cudaMallocManaged(&c_gpu, size);

// 2. CPU에서 데이터 초기화
for (int i = 0; i < n; i++) {
    a[i] = rand() / (float)RAND_MAX;
    b[i] = rand() / (float)RAND_MAX;
}

// 3. GPU 커널 실행
vectorAddGPU<<<blocksPerGrid, threadsPerBlock>>>(a, b, c_gpu, n);

// 4. GPU 완료 대기 후 CPU에서 결과 접근
cudaDeviceSynchronize();
// c_gpu[i]를 CPU에서 바로 접근 가능!
```

---

## 핵심 포인트

### 1. Unified Memory란?

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   기존 방식 (Week1)                                         │
│                                                             │
│   [CPU 메모리]          [GPU 메모리]                        │
│      h_a    ──복사──▶     d_a                              │
│      h_b    ──복사──▶     d_b                              │
│      h_c    ◀──복사──     d_c                              │
│                                                             │
│   프로그래머가 직접 메모리를 관리해야 함                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Unified Memory (Week2)                                    │
│                                                             │
│   ┌─────────────────────────────────────┐                   │
│   │         Unified Memory              │                   │
│   │              a                      │                   │
│   │              b                      │                   │
│   │              c                      │                   │
│   │                                     │                   │
│   │   CPU가 접근하면 ← 자동으로 CPU에   │                   │
│   │   GPU가 접근하면 ← 자동으로 GPU에   │                   │
│   └─────────────────────────────────────┘                   │
│                                                             │
│   시스템이 자동으로 데이터를 이동!                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. cudaMallocManaged의 장점

| 항목 | cudaMalloc | cudaMallocManaged |
|------|-----------|-------------------|
| 메모리 할당 | CPU/GPU 별도 | 한 번만 |
| 데이터 복사 | 수동 (cudaMemcpy) | 자동 |
| 코드 복잡도 | 높음 | 낮음 |
| 성능 | 최적화 가능 | 약간의 오버헤드 |
| 디버깅 | 어려움 | 쉬움 |

### 3. 결과 검증

```c
int verify(float* cpu, float* gpu, int n) {
    for (int i = 0; i < n; i++) {
        if (abs(cpu[i] - gpu[i]) > 0.0001) {
            printf("Mismatch at %d: CPU=%f, GPU=%f\n", i, cpu[i], gpu[i]);
            return 0;
        }
    }
    return 1;
}
```

GPU 결과가 CPU 결과와 일치하는지 확인합니다. 부동소수점 오차를 고려하여 0.0001 이내면 통과합니다.

---

## 이 예제에서 배우는 것

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   📚 핵심 교훈                                                ║
║                                                               ║
║   1. cudaMallocManaged = CPU와 GPU 모두 접근 가능한 메모리    ║
║                                                               ║
║   2. cudaMemcpy가 필요 없음 → 코드가 간결해짐                 ║
║                                                               ║
║   3. 프로토타이핑과 학습에 적합                               ║
║      (성능 최적화 시에는 명시적 복사가 더 좋을 수 있음)       ║
║                                                               ║
║   4. GPU와 CPU 결과를 비교하여 검증하는 습관                  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 다음 단계

`saxpy.cu`에서 기계학습의 기본 연산인 SAXPY를 구현합니다.

---

*작성일: 2026-02-20*
