# 예제 4: cpu_vs_gpu.cu

## 목적
**CPU와 GPU의 성능 차이를 실제로 측정한다.**

이 예제는 동일한 연산을 CPU와 GPU에서 수행하고 시간을 비교합니다.

---

## 실행 방법

```bash
cd ~/cuda/week1/code
nvcc cpu_vs_gpu.cu -o cpu_vs_gpu
./cpu_vs_gpu
```

---

## 실행 결과 (Jetson Nano 기준)

```
==========================================
  CPU vs GPU 성능 비교
  배열 크기: 10000000 (38.1 MB)
==========================================

[CPU 실행 중...]
CPU 완료: 332.65 ms

[GPU 실행 중...]
GPU 커널만: 44.15 ms
GPU 전체 (메모리 전송 포함): 210.69 ms

==========================================
  결과 비교
==========================================
CPU 시간:             332.65 ms
GPU 커널 시간:         44.15 ms
GPU 전체 시간:        210.69 ms
------------------------------------------
GPU 커널 속도 향상:     7.54x
GPU 전체 속도 향상:     1.58x
------------------------------------------
결과 검증: 통과 (오차: 0개)
==========================================
```

---

## 코드 분석

### 연산 내용

```c
// CPU 버전
void cpu_compute(float *a, float *b, float *c, int n) {
    for (int i = 0; i < n; i++) {
        float temp = a[i] + b[i];   // 덧셈
        temp = temp * temp;          // 제곱
        temp = sqrtf(temp);          // 제곱근
        c[i] = temp;
    }
}

// GPU 버전 (동일한 연산)
__global__ void gpu_compute(float *a, float *b, float *c, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        float temp = a[idx] + b[idx];
        temp = temp * temp;
        temp = sqrtf(temp);
        c[idx] = temp;
    }
}
```

### GPU 메모리 관리

```c
// 1. GPU 메모리 할당
float *d_a, *d_b, *d_c;
cudaMalloc(&d_a, N * sizeof(float));
cudaMalloc(&d_b, N * sizeof(float));
cudaMalloc(&d_c, N * sizeof(float));

// 2. CPU → GPU 데이터 복사
cudaMemcpy(d_a, h_a, N * sizeof(float), cudaMemcpyHostToDevice);
cudaMemcpy(d_b, h_b, N * sizeof(float), cudaMemcpyHostToDevice);

// 3. GPU 커널 실행
int blockSize = 256;
int gridSize = (N + blockSize - 1) / blockSize;
gpu_compute<<<gridSize, blockSize>>>(d_a, d_b, d_c, N);

// 4. GPU → CPU 결과 복사
cudaMemcpy(h_c_gpu, d_c, N * sizeof(float), cudaMemcpyDeviceToHost);

// 5. 메모리 해제
cudaFree(d_a);
cudaFree(d_b);
cudaFree(d_c);
```

---

## 핵심 포인트

### 1. GPU 사용 과정

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [CPU 메모리]                      [GPU 메모리]            │
│                                                             │
│      h_a ───────(1) cudaMemcpy─────▶ d_a                   │
│      h_b ───────(1) cudaMemcpy─────▶ d_b                   │
│                                        ↓                    │
│                                   (2) 커널 실행             │
│                                        ↓                    │
│      h_c ◀──────(3) cudaMemcpy────── d_c                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. 시간 구성 분석

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   GPU 전체 시간: 210.69 ms                                  │
│                                                             │
│   ┌──────────────────────────────────────────────────────┐  │
│   │ CPU → GPU 복사:  ~80 ms   ████████████████           │  │
│   │ GPU 커널 실행:   ~44 ms   ██████████ ⭐              │  │
│   │ GPU → CPU 복사:  ~80 ms   ████████████████           │  │
│   └──────────────────────────────────────────────────────┘  │
│                                                             │
│   메모리 전송 시간: ~160 ms (76%)                           │
│   실제 연산 시간:    ~44 ms (24%)                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3. 그리드 크기 계산

```c
int blockSize = 256;  // 블록당 스레드 수
int gridSize = (N + blockSize - 1) / blockSize;  // 올림 나눗셈

// N = 10,000,000일 때:
// gridSize = (10000000 + 255) / 256 = 39063 블록
// 총 스레드 = 39063 × 256 = 10,000,128개 (데이터보다 약간 많음)
```

**왜 `(N + blockSize - 1) / blockSize`인가?**
```
N = 10일 때, blockSize = 4라면:
- 단순 나눗셈: 10 / 4 = 2 (8개 스레드, 2개 부족!)
- 올림 나눗셈: (10 + 3) / 4 = 3 (12개 스레드, OK!)
```

### 4. 경계 검사

```c
if (idx < n) {  // 중요!
    c[idx] = ...;
}
```
총 스레드(10,000,128)가 데이터 수(10,000,000)보다 많으므로, 범위를 벗어난 접근을 방지합니다.

---

## 시간 측정 방법

### CPU 시간 측정

```c
double get_time_ms() {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec * 1000.0 + ts.tv_nsec / 1000000.0;
}

double start = get_time_ms();
cpu_compute(...);
double cpu_time = get_time_ms() - start;
```

### GPU 커널 시간 측정

```c
cudaEvent_t start, stop;
cudaEventCreate(&start);
cudaEventCreate(&stop);

cudaEventRecord(start);
gpu_compute<<<gridSize, blockSize>>>(...);
cudaEventRecord(stop);
cudaEventSynchronize(stop);

float gpu_kernel_time;
cudaEventElapsedTime(&gpu_kernel_time, start, stop);
```

`cudaEvent`는 GPU 내부에서 정확한 시간을 측정합니다.

---

## 이 예제에서 배우는 것

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   📚 핵심 교훈                                                ║
║                                                               ║
║   1. GPU 메모리 관리 패턴                                     ║
║      cudaMalloc → cudaMemcpy → 커널 → cudaMemcpy → cudaFree  ║
║                                                               ║
║   2. 그리드 크기 계산                                         ║
║      gridSize = (N + blockSize - 1) / blockSize               ║
║                                                               ║
║   3. 경계 검사 필수                                           ║
║      if (idx < n) { ... }                                     ║
║                                                               ║
║   4. GPU 효과는 "커널 시간"이 아닌 "전체 시간"으로 판단       ║
║      - 커널만: 7.5x 빠름                                      ║
║      - 전체: 1.6x 빠름 (메모리 전송 포함)                     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 다음 단계

`cpu_vs_gpu_10K.cu`와 `cpu_vs_gpu_50M.cu`에서 데이터 크기에 따른 GPU 효과 차이를 확인합니다.

---

*작성일: 2026-02-20*
