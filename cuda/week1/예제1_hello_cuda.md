# 예제 1: hello_cuda.cu

## 목적
**CUDA의 가장 기본적인 구조를 이해한다.**

이 예제는 CUDA 프로그래밍의 "Hello World"입니다. GPU에서 코드가 어떻게 실행되는지 처음으로 확인합니다.

---

## 실행 방법

```bash
cd ~/cuda/week1/code
nvcc hello_cuda.cu -o hello_cuda
./hello_cuda
```

---

## 실행 결과

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

---

## 코드 분석

### 핵심 코드

```c
// __global__ : GPU에서 실행되는 함수 (커널)
__global__ void helloFromGPU() {
    printf("Hello from GPU! I am thread %d\n", threadIdx.x);
}

int main() {
    printf("Hello from CPU!\n");

    // GPU 커널 호출: 1개 블록, 5개 스레드
    helloFromGPU<<<1, 5>>>();

    // GPU 작업 완료 대기
    cudaDeviceSynchronize();

    printf("Done!\n");
    return 0;
}
```

### 배우는 개념

| 개념 | 설명 |
|------|------|
| `__global__` | GPU에서 실행되는 함수임을 표시 (커널 함수) |
| `<<<1, 5>>>` | 1개 블록, 5개 스레드로 커널 실행 |
| `threadIdx.x` | 각 스레드의 고유 번호 (0, 1, 2, 3, 4) |
| `cudaDeviceSynchronize()` | GPU 작업이 끝날 때까지 CPU가 대기 |

---

## 핵심 포인트

### 1. CPU와 GPU는 별도로 실행된다

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   CPU                              GPU                      │
│   ┌─────────────────┐              ┌─────────────────┐      │
│   │ printf("CPU!")  │              │                 │      │
│   │        ↓        │    호출      │                 │      │
│   │ helloFromGPU<<< │ ──────────▶  │ 스레드 0: Hello │      │
│   │                 │              │ 스레드 1: Hello │      │
│   │ (대기중...)     │              │ 스레드 2: Hello │      │
│   │        ↓        │    완료      │ 스레드 3: Hello │      │
│   │ printf("Done!") │ ◀──────────  │ 스레드 4: Hello │      │
│   └─────────────────┘              └─────────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. 스레드가 "동시에" 실행된다

5개의 스레드가 동시에 같은 함수를 실행합니다. 각 스레드는 `threadIdx.x`로 자신이 몇 번째인지 알 수 있습니다.

```
스레드 0 → printf("I am thread 0")  ─┐
스레드 1 → printf("I am thread 1")   │
스레드 2 → printf("I am thread 2")   ├─ 동시 실행!
스레드 3 → printf("I am thread 3")   │
스레드 4 → printf("I am thread 4")  ─┘
```

### 3. cudaDeviceSynchronize()가 필요한 이유

GPU는 CPU와 **비동기**로 실행됩니다. 이 함수가 없으면 CPU가 GPU 완료를 기다리지 않고 바로 종료해버립니다.

```c
// 만약 cudaDeviceSynchronize()가 없다면:
helloFromGPU<<<1, 5>>>();  // GPU에 작업 요청만 하고
printf("Done!\n");          // 바로 다음으로 넘어감
// → GPU 출력이 안 보일 수 있음!
```

---

## 이 예제에서 배우는 것

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   📚 핵심 교훈                                                ║
║                                                               ║
║   1. __global__ 함수는 GPU에서 실행된다                       ║
║                                                               ║
║   2. <<<블록수, 스레드수>>> 로 커널을 실행한다                ║
║                                                               ║
║   3. threadIdx.x로 각 스레드를 구분한다                       ║
║                                                               ║
║   4. cudaDeviceSynchronize()로 GPU 완료를 기다린다            ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 다음 단계

`hello_cuda_v2.cu`에서 블록과 스레드의 관계를 더 자세히 배웁니다.

---

*작성일: 2026-02-20*
