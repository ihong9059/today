# 예제 2: saxpy.cu

## 목적
**기계학습에서 자주 사용되는 SAXPY 연산을 GPU로 구현한다.**

SAXPY = **S**ingle-precision **A** times **X** **P**lus **Y**
→ `Y = a * X + Y`

이 연산은 딥러닝, 선형대수, 과학 계산의 기본 빌딩 블록입니다.

---

## 실행 방법

```bash
cd ~/cuda/week2/code
nvcc saxpy.cu -o saxpy
./saxpy
```

---

## 실행 결과

```
========================================
  SAXPY: Y = 2.0 * X + Y
  Elements: 1000000
========================================

GPU Time: 0.523 ms

Verification PASSED!

Sample results (Y = 2.0 * X + 1):
  X[0]=1 -> Y[0]=3 (expected: 3)
  X[1]=2 -> Y[1]=5 (expected: 5)
  X[2]=3 -> Y[2]=7 (expected: 7)
```

---

## 코드 분석

### SAXPY 커널

```c
// Y = a * X + Y
__global__ void saxpy(float a, float* x, float* y, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        y[idx] = a * x[idx] + y[idx];
    }
}
```

**특징:**
- 스칼라 `a`는 값으로 전달 (모든 스레드가 동일한 값 사용)
- 배열 `x`, `y`는 포인터로 전달
- 결과가 `y`에 **덮어쓰기** (in-place 연산)

### 초기화와 예상 결과

```c
// 초기화
for (int i = 0; i < n; i++) {
    x[i] = i + 1;      // X = [1, 2, 3, 4, ...]
    y_gpu[i] = 1.0f;   // Y = [1, 1, 1, 1, ...]
}

// a = 2.0일 때 연산 결과
// Y = 2.0 * X + Y
// Y[0] = 2.0 * 1 + 1 = 3
// Y[1] = 2.0 * 2 + 1 = 5
// Y[2] = 2.0 * 3 + 1 = 7
// ...
```

---

## 핵심 포인트

### 1. SAXPY가 중요한 이유

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   SAXPY는 BLAS(Basic Linear Algebra Subprograms)의 기본 연산│
│                                                             │
│   사용 분야:                                                │
│   ├─ 딥러닝: 가중치 업데이트                                │
│   │    weight = weight - learning_rate * gradient           │
│   │          = weight + (-lr) * gradient                    │
│   │          = SAXPY!                                       │
│   │                                                         │
│   ├─ 선형대수: 벡터 연산                                    │
│   │    행렬-벡터 곱의 기본 단위                             │
│   │                                                         │
│   └─ 물리 시뮬레이션: 위치 업데이트                         │
│        position = position + dt * velocity                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. 딥러닝에서의 SAXPY

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   경사 하강법 (Gradient Descent)                            │
│                                                             │
│   for each iteration:                                       │
│       gradient = compute_gradient(data)                     │
│       weight = weight - learning_rate * gradient            │
│              └────────────────────────────────┘             │
│                         SAXPY!                              │
│                                                             │
│   수백만 개의 파라미터를 동시에 업데이트                    │
│   → GPU 병렬 처리가 필수                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3. In-place 연산

```c
// 일반적인 연산 (새 배열 필요)
c[idx] = a * x[idx] + y[idx];  // c 배열 추가 필요

// SAXPY (in-place)
y[idx] = a * x[idx] + y[idx];  // y를 직접 수정

// 장점: 메모리 절약
// 단점: 원본 y 데이터 손실
```

### 4. GPU 메모리 대역폭 활용

```
SAXPY의 연산 강도 (Arithmetic Intensity):
- 메모리 읽기: x[idx], y[idx] (2회)
- 메모리 쓰기: y[idx] (1회)
- 연산: 곱셈 1회, 덧셈 1회 (2회)

연산/메모리 비율 = 2 / 3 ≈ 0.67

→ "메모리 바운드" 연산
   GPU의 연산 능력보다 메모리 대역폭이 병목
```

---

## 이 예제에서 배우는 것

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   📚 핵심 교훈                                                ║
║                                                               ║
║   1. SAXPY = Y = a*X + Y                                      ║
║      기계학습의 가장 기본적인 연산                            ║
║                                                               ║
║   2. 스칼라는 값으로, 배열은 포인터로 전달                    ║
║                                                               ║
║   3. In-place 연산으로 메모리 절약                            ║
║                                                               ║
║   4. 메모리 바운드 연산 이해                                  ║
║      - 연산보다 메모리 접근이 병목                            ║
║      - Week3에서 Shared Memory로 최적화 배움                  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 응용: 딥러닝 프레임워크

PyTorch, TensorFlow 등의 딥러닝 프레임워크 내부에서 SAXPY와 유사한 CUDA 커널이 수천 번 호출됩니다.

```python
# PyTorch 예시
optimizer.step()  # 내부적으로 SAXPY 호출
# weight = weight - lr * gradient
# → 수백만 개 파라미터에 대해 GPU에서 병렬 실행
```

---

## 다음 단계

Week3의 `matrix_mul.cu`에서 Shared Memory를 사용한 최적화를 배웁니다.

---

*작성일: 2026-02-20*
