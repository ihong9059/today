# Day 4: Unified Memory 활용

## 1. Unified Memory란?

### 1.1 전통적인 메모리 모델

```
┌──────────────┐          ┌──────────────┐
│  CPU Memory  │  복사→   │  GPU Memory  │
│   (Host)     │  ←복사   │  (Device)    │
└──────────────┘          └──────────────┘
      ↑                         ↑
     CPU                       GPU
```

프로그래머가 **직접** 메모리 복사를 관리해야 합니다.

### 1.2 Unified Memory 모델

```
┌────────────────────────────────────────┐
│           Unified Memory               │
│     CPU와 GPU가 같은 주소로 접근         │
│     시스템이 자동으로 데이터 이동         │
└────────────────────────────────────────┘
              ↑           ↑
             CPU         GPU
```

프로그래머가 메모리 복사를 **신경 쓰지 않아도** 됩니다.

---

## 2. Jetson의 특별함

### 2.1 데스크톱 GPU vs Jetson

**데스크톱 GPU (예: RTX 4090):**
- CPU 메모리 (RAM): DDR5 32GB
- GPU 메모리 (VRAM): GDDR6X 24GB
- PCIe로 연결 → 데이터 복사 필요

**Jetson:**
- CPU와 GPU가 **물리적으로 같은 메모리** 공유
- 진정한 Unified Memory
- 복사가 아닌 **포인터 공유**

### 2.2 Jetson에서의 장점

```
데스크톱: cudaMallocManaged → 페이지 단위 자동 복사 (느림)
Jetson:   cudaMallocManaged → 실제 메모리 공유 (빠름!)
```

---

## 3. 메모리 할당 방법 비교

### 3.1 세 가지 방법

```c
// 1. 전통적 방식 (명시적 복사)
float *h_data = (float*)malloc(size);
float *d_data;
cudaMalloc(&d_data, size);
cudaMemcpy(d_data, h_data, size, cudaMemcpyHostToDevice);

// 2. Unified Memory (자동 관리)
float *data;
cudaMallocManaged(&data, size);

// 3. Zero-Copy Memory (Jetson 최적)
float *data;
cudaHostAlloc(&data, size, cudaHostAllocMapped);
```

### 3.2 언제 무엇을 사용할까?

| 방법 | 장점 | 단점 | 권장 상황 |
|------|------|------|----------|
| 전통적 | 완전한 제어 | 코드 복잡 | 성능 최적화 필요 |
| Unified | 간단한 코드 | 자동 관리 오버헤드 | 일반적인 경우 |
| Zero-Copy | Jetson 최적 | Jetson 전용 | Jetson 프로젝트 |

---

## 4. cudaMallocManaged 상세

### 4.1 기본 사용법

```c
float *data;
cudaMallocManaged(&data, size);

// CPU에서 사용
for (int i = 0; i < n; i++) {
    data[i] = i;
}

// GPU에서 사용
kernel<<<blocks, threads>>>(data);
cudaDeviceSynchronize();

// 다시 CPU에서 사용
printf("%f\n", data[0]);

// 해제
cudaFree(data);
```

### 4.2 주의사항

**동기화 필요!**

```c
kernel<<<blocks, threads>>>(data);
// cudaDeviceSynchronize(); // 이거 없으면...
printf("%f\n", data[0]);     // 잘못된 값이 나올 수 있음!
```

GPU 커널이 완료되기 전에 CPU가 접근하면 문제 발생!

---

## 5. 메모리 프리페칭 (Prefetching)

### 5.1 왜 필요한가?

Unified Memory는 **페이지 폴트** 방식으로 동작:
1. GPU가 데이터 접근
2. 데이터가 GPU에 없으면 → 페이지 폴트
3. CPU에서 GPU로 해당 페이지 복사
4. 계속 실행

→ 페이지 폴트가 많으면 느려짐!

### 5.2 프리페칭으로 해결

미리 데이터를 원하는 곳으로 이동:

```c
int device;
cudaGetDevice(&device);

float *data;
cudaMallocManaged(&data, size);

// CPU에서 초기화
for (int i = 0; i < n; i++) {
    data[i] = i;
}

// GPU로 미리 이동 (프리페칭)
cudaMemPrefetchAsync(data, size, device);

// 커널 실행 (페이지 폴트 없음!)
kernel<<<blocks, threads>>>(data);
cudaDeviceSynchronize();

// CPU로 미리 이동
cudaMemPrefetchAsync(data, size, cudaCpuDeviceId);

// CPU에서 사용 (페이지 폴트 없음!)
printf("%f\n", data[0]);
```

### 5.3 Jetson에서는?

Jetson은 물리적으로 메모리를 공유하므로, 프리페칭의 효과가 데스크톱만큼 크지 않음.
하지만 캐시 최적화에는 도움이 될 수 있음.

---

## 6. Zero-Copy Memory (Jetson 최적)

### 6.1 cudaHostAlloc

```c
float *data;
cudaHostAlloc(&data, size, cudaHostAllocMapped);

// CPU에서 사용
data[0] = 1.0f;

// GPU에서도 같은 포인터 사용
kernel<<<blocks, threads>>>(data);
cudaDeviceSynchronize();

// 해제
cudaFreeHost(data);
```

### 6.2 장점

- Jetson에서 가장 효율적
- 메모리 복사 완전히 제거
- 낮은 지연 시간

### 6.3 단점

- 데스크톱 GPU에서는 느릴 수 있음
- 포터블하지 않은 코드

---

## 7. 성능 비교 예제

```c
// performance_compare.cu
#include <stdio.h>
#include <stdlib.h>

__global__ void kernel(float* data, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        data[idx] = data[idx] * 2;
    }
}

int main() {
    int n = 10000000;  // 1000만
    size_t size = n * sizeof(float);
    int threads = 256;
    int blocks = (n + threads - 1) / threads;

    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);
    float ms;

    // ===== 방법 1: 전통적 방식 =====
    printf("=== Traditional Method ===\n");

    float *h_data1 = (float*)malloc(size);
    float *d_data1;
    cudaMalloc(&d_data1, size);

    for (int i = 0; i < n; i++) h_data1[i] = i;

    cudaEventRecord(start);
    cudaMemcpy(d_data1, h_data1, size, cudaMemcpyHostToDevice);
    kernel<<<blocks, threads>>>(d_data1, n);
    cudaMemcpy(h_data1, d_data1, size, cudaMemcpyDeviceToHost);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);
    cudaEventElapsedTime(&ms, start, stop);

    printf("Time: %.3f ms\n\n", ms);

    cudaFree(d_data1);
    free(h_data1);

    // ===== 방법 2: Unified Memory =====
    printf("=== Unified Memory ===\n");

    float *data2;
    cudaMallocManaged(&data2, size);

    for (int i = 0; i < n; i++) data2[i] = i;

    cudaEventRecord(start);
    kernel<<<blocks, threads>>>(data2, n);
    cudaDeviceSynchronize();
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);
    cudaEventElapsedTime(&ms, start, stop);

    printf("Time: %.3f ms\n\n", ms);

    // 결과 확인
    printf("data2[0] = %.0f (expected: 0)\n", data2[0]);
    printf("data2[1] = %.0f (expected: 2)\n\n", data2[1]);

    cudaFree(data2);

    // ===== 방법 3: Unified + Prefetch =====
    printf("=== Unified + Prefetch ===\n");

    int device;
    cudaGetDevice(&device);

    float *data3;
    cudaMallocManaged(&data3, size);

    for (int i = 0; i < n; i++) data3[i] = i;

    cudaEventRecord(start);
    cudaMemPrefetchAsync(data3, size, device);
    kernel<<<blocks, threads>>>(data3, n);
    cudaMemPrefetchAsync(data3, size, cudaCpuDeviceId);
    cudaDeviceSynchronize();
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);
    cudaEventElapsedTime(&ms, start, stop);

    printf("Time: %.3f ms\n", ms);

    cudaFree(data3);

    cudaEventDestroy(start);
    cudaEventDestroy(stop);

    return 0;
}
```

---

## 8. 메모리 사용량 확인

### 8.1 코드로 확인

```c
size_t free_mem, total_mem;
cudaMemGetInfo(&free_mem, &total_mem);

printf("Total GPU Memory: %.2f MB\n", total_mem / 1024.0 / 1024.0);
printf("Free GPU Memory: %.2f MB\n", free_mem / 1024.0 / 1024.0);
printf("Used GPU Memory: %.2f MB\n", (total_mem - free_mem) / 1024.0 / 1024.0);
```

### 8.2 터미널에서 확인

```bash
# Jetson
tegrastats

# 또는
nvidia-smi
```

---

## 9. 오늘의 실습

### 실습 1: Unified Memory
- [ ] `unified_memory.cu` 작성
- [ ] cudaDeviceSynchronize() 있을 때/없을 때 비교

### 실습 2: 프리페칭
- [ ] `performance_compare.cu` 작성
- [ ] 세 가지 방법 성능 비교

### 실습 3: 메모리 확인
- [ ] cudaMemGetInfo() 사용
- [ ] Jetson의 메모리 용량 확인

---

## 10. 베스트 프랙티스

### 10.1 Jetson에서 권장

```c
// 간단한 프로젝트
cudaMallocManaged(&data, size);

// 성능이 중요한 프로젝트
cudaHostAlloc(&data, size, cudaHostAllocMapped);
```

### 10.2 체크리스트

- [ ] cudaDeviceSynchronize() 잊지 않기
- [ ] 범위 체크 (idx < n) 항상 하기
- [ ] 메모리 해제 잊지 않기
- [ ] 에러 체크 추가하기

---

## 11. 용어 정리

| 용어 | 의미 |
|------|------|
| **Unified Memory** | CPU/GPU 공유 메모리 |
| **Zero-Copy** | 복사 없이 공유 |
| **Page Fault** | 메모리 접근 실패 시 발생 |
| **Prefetch** | 미리 데이터 이동 |
| **cudaCpuDeviceId** | CPU를 나타내는 상수 |

---

## 12. 다음 시간 예고

내일은 이번 주 내용을 복습하고 연습 문제를 풀어봅니다!
- Thread/Block 심화 복습
- 메모리 관리 복습
- Vector Addition 변형 문제
