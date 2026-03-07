export const lesson8_3_content = `
# GPU 메모리 계층

## 학습 목표
이 레슨을 완료하면:
- GPU의 다양한 메모리 종류와 각각의 특성을 설명할 수 있다
- Global, Shared, Register 메모리의 속도 차이를 이해한다
- 메모리 대역폭이 성능에 미치는 영향을 이해한다
- 왜 메모리 계층을 활용한 최적화가 중요한지 설명할 수 있다

---

## 핵심 메시지
> **"GPU 메모리는 책상 서랍, 사무실 캐비닛, 창고의 관계와 같다."**
> 가까울수록 빠르지만 작고, 멀수록 크지만 느립니다. 자주 쓰는 것을 가까이 두는 것이 성능의 핵심입니다.

---

## 비유로 시작하기: 사무실의 수납 체계

여러분이 사무실에서 일한다고 상상해 봅시다.

**책상 서랍 (Register)**
- 지금 당장 작업 중인 서류를 넣어둡니다
- 손만 뻗으면 바로 꺼낼 수 있어 가장 빠릅니다
- 하지만 공간이 매우 작습니다 (서류 몇 장만 가능)

**사무실 캐비닛 (Shared Memory)**
- 같은 사무실(같은 팀)의 동료들과 공유하는 캐비닛입니다
- 일어나서 몇 걸음 걸으면 접근 가능합니다
- 중간 크기, 중간 속도입니다

**건물 지하 창고 (Global Memory)**
- 회사 전체가 공유하는 대규모 창고입니다
- 엘리베이터를 타고 내려가야 해서 시간이 많이 걸립니다
- 하지만 엄청나게 넓어서 모든 서류를 보관할 수 있습니다

| 수납 공간 | GPU 메모리 | 크기 | 속도 | 누가 접근 |
|----------|-----------|------|------|----------|
| 책상 서랍 | Register | 매우 작음 | 매우 빠름 | 본인만 |
| 사무실 캐비닛 | Shared Memory | 작음 | 빠름 | 같은 팀(블록) |
| 건물 창고 | Global Memory | 매우 큼 | 느림 | 전체 |

---

## GPU 메모리 종류 상세

### 1. Register (레지스터)

레지스터는 각 스레드가 **개인적으로 사용하는 초고속 저장 공간**입니다.

| 특성 | 내용 |
|------|------|
| 속도 | 가장 빠름 (1 클럭 사이클) |
| 크기 | 스레드당 수십 개 (32비트 레지스터) |
| 접근 범위 | 해당 스레드만 접근 가능 |
| 용도 | 지역 변수, 중간 계산 결과 |

\`\`\`text
__global__ void myKernel(float* data) {
    // 아래 변수들은 모두 레지스터에 저장됩니다
    int idx = threadIdx.x + blockIdx.x * blockDim.x;
    float value = data[idx];     // Global에서 읽어와 레지스터에 저장
    float result = value * 2.0f; // 레지스터끼리의 연산 = 초고속
    data[idx] = result;          // 레지스터에서 Global로 저장
}
\`\`\`

### 2. Shared Memory (공유 메모리)

같은 블록 안의 스레드들이 **함께 사용하는 빠른 메모리**입니다.

| 특성 | 내용 |
|------|------|
| 속도 | 빠름 (레지스터 다음) |
| 크기 | 블록당 48~100 KB |
| 접근 범위 | 같은 블록의 스레드들이 공유 |
| 용도 | 스레드 간 데이터 공유, 임시 캐싱 |

\`\`\`text
__global__ void sharedExample(float* input, float* output) {
    // __shared__ 키워드로 공유 메모리 선언
    __shared__ float cache[256];

    int idx = threadIdx.x + blockIdx.x * blockDim.x;

    // 1. Global -> Shared로 데이터 로드
    cache[threadIdx.x] = input[idx];

    // 2. 블록 내 모든 스레드가 로드를 마칠 때까지 대기
    __syncthreads();

    // 3. Shared Memory에서 빠르게 읽어 사용
    // (같은 블록의 다른 스레드가 로드한 데이터도 접근 가능)
    if (threadIdx.x > 0) {
        output[idx] = cache[threadIdx.x] + cache[threadIdx.x - 1];
    }
}
\`\`\`

**\`__syncthreads()\`** 는 블록 내 모든 스레드가 이 지점에 도달할 때까지 기다리는 함수입니다.
이것이 없으면 다른 스레드가 아직 데이터를 로드하지 않았는데 읽으려는 문제가 발생합니다.

### 3. Global Memory (글로벌 메모리)

GPU의 **주 메모리(VRAM)**입니다. 가장 크지만 가장 느립니다.

| 특성 | 내용 |
|------|------|
| 속도 | 느림 (수백 클럭 사이클의 지연) |
| 크기 | 수 GB ~ 수십 GB |
| 접근 범위 | 모든 스레드가 접근 가능 |
| 용도 | 입력 데이터, 출력 결과, 대량 데이터 |

\`\`\`text
// cudaMalloc으로 할당하는 메모리가 바로 Global Memory
float* d_data;
cudaMalloc(&d_data, size);  // GPU의 Global Memory에 공간 확보

// cudaMemcpy로 CPU에서 GPU Global Memory로 복사
cudaMemcpy(d_data, h_data, size, cudaMemcpyHostToDevice);
\`\`\`

### 4. Constant Memory (상수 메모리)

읽기 전용 데이터를 위한 특수 메모리입니다.

| 특성 | 내용 |
|------|------|
| 속도 | 캐시 히트 시 빠름 |
| 크기 | 64 KB |
| 접근 범위 | 모든 스레드 (읽기 전용) |
| 용도 | 모든 스레드가 같은 값을 읽을 때 |

---

## 메모리 속도 비교

각 메모리의 속도 차이를 숫자로 비교해 봅시다.

| 메모리 종류 | 접근 시간 (클럭) | 대역폭 | 비유 |
|------------|----------------|--------|------|
| Register | 1 클럭 | - | 책상 위 (즉시) |
| Shared Memory | 5~30 클럭 | ~수 TB/s | 사무실 캐비닛 (몇 초) |
| L2 Cache | ~200 클럭 | ~수 TB/s | 같은 층 복사실 |
| Global Memory | 200~800 클럭 | 500~2000 GB/s | 지하 창고 (몇 분) |

Register와 Global Memory의 속도 차이가 **수백 배**에 달한다는 점을 주목하세요.
이것이 메모리 최적화가 중요한 이유입니다.

---

## 실행해보기: 메모리 접근 패턴의 중요성

GPU에서는 메모리를 어떤 패턴으로 접근하느냐에 따라 성능이 크게 달라집니다.
NumPy로 비슷한 개념을 체감해 봅시다.

\`\`\`python
import numpy as np
import time

n = 10000

# 큰 행렬 생성
matrix = np.random.rand(n, n).astype(np.float32)

# 행 방향 접근 (연속 메모리 접근 - Coalesced Access와 유사)
start = time.time()
row_sums = np.sum(matrix, axis=1)  # 각 행의 합
row_time = time.time() - start

# 열 방향 접근 (불연속 메모리 접근 - Strided Access와 유사)
start = time.time()
col_sums = np.sum(matrix, axis=0)  # 각 열의 합
col_time = time.time() - start

print("메모리 접근 패턴에 따른 속도 차이")
print("=" * 50)
print(f"행렬 크기: {n} x {n}")
print(f"행 방향 합산 (연속 접근): {row_time:.4f}초")
print(f"열 방향 합산 (불연속 접근): {col_time:.4f}초")
print(f"비율: {max(col_time,row_time)/max(min(col_time,row_time),0.0001):.2f}배")
print()
print("C/NumPy에서 행렬은 행(row) 순서로 메모리에 저장됩니다.")
print("행 방향 접근은 연속된 메모리를 읽으므로 캐시 효율이 높습니다.")
print("GPU에서도 연속 메모리 접근(Coalesced Access)이 훨씬 빠릅니다.")
\`\`\`

---

## Coalesced Access: GPU 메모리의 핵심 규칙

GPU에서 Global Memory 성능을 극대화하는 핵심 규칙은 **Coalesced Access(병합 접근)**입니다.

### 비유: 택배 트럭

택배 트럭이 물건을 배달할 때, 같은 동네의 물건을 모아서 한 번에 배달하면 효율적입니다.
각 집을 따로 방문하면 시간이 훨씬 오래 걸립니다.

GPU도 마찬가지입니다. 같은 Warp(32개 스레드)의 스레드들이 **연속된 메모리 주소**를
접근하면, GPU가 이를 하나의 큰 요청으로 합쳐서 처리합니다.

\`\`\`text
[좋은 패턴 - Coalesced Access]
스레드 0: data[0]
스레드 1: data[1]
스레드 2: data[2]
스레드 3: data[3]
=> 연속된 주소 => 하나의 메모리 요청으로 합쳐짐 => 빠름!

[나쁜 패턴 - Strided Access]
스레드 0: data[0]
스레드 1: data[100]
스레드 2: data[200]
스레드 3: data[300]
=> 띄엄띄엄 접근 => 여러 번의 메모리 요청 필요 => 느림!
\`\`\`

---

## 실행해보기: 캐시 효과 시뮬레이션

자주 사용하는 데이터를 가까운 곳에 두면 얼마나 빨라지는지 확인해 봅시다.
이것이 Shared Memory 활용의 핵심 아이디어입니다.

\`\`\`python
import numpy as np
import time

n = 5000
data = np.random.rand(n).astype(np.float32)

# 방법 1: 매번 원본 배열에서 읽기 (Global Memory에서 반복 읽기와 유사)
start = time.time()
result1 = 0.0
for repeat in range(1000):
    for i in range(n):
        result1 += data[i]  # 매번 원본에서 접근
time1 = time.time() - start

# 방법 2: 작은 청크를 로컬에 복사 후 사용 (Shared Memory 캐싱과 유사)
start = time.time()
result2 = 0.0
chunk_size = 256
for repeat in range(1000):
    for start_idx in range(0, n, chunk_size):
        end_idx = min(start_idx + chunk_size, n)
        local_cache = data[start_idx:end_idx].copy()  # "Shared Memory"로 복사
        for val in local_cache:
            result2 += val
time2 = time.time() - start

# 방법 3: NumPy 벡터 연산 (하드웨어 최적화된 메모리 접근)
start = time.time()
result3 = 0.0
for repeat in range(1000):
    result3 = np.sum(data)
time3 = time.time() - start

print("메모리 캐싱 효과 비교")
print("=" * 50)
print(f"방법 1 (매번 원본 접근):   {time1:.4f}초")
print(f"방법 2 (청크 캐싱):       {time2:.4f}초")
print(f"방법 3 (NumPy 최적화):    {time3:.4f}초")
print()
print("GPU에서 Shared Memory를 활용하면,")
print("느린 Global Memory 접근 횟수를 줄여 성능을 크게 향상시킬 수 있습니다.")
\`\`\`

---

## 메모리 계층 최적화 전략 요약

| 전략 | 설명 | 효과 |
|------|------|------|
| Coalesced Access | 스레드들이 연속된 메모리 주소 접근 | Global Memory 대역폭 극대화 |
| Shared Memory 활용 | 자주 쓰는 데이터를 Shared에 캐싱 | Global Memory 접근 횟수 감소 |
| 레지스터 활용 | 중간 결과를 지역 변수에 저장 | 가장 빠른 접근 |
| 메모리 재사용 | 같은 데이터를 여러 번 사용 시 캐싱 | 불필요한 전송 제거 |

---

## 핵심 요약

| 개념 | 설명 | 비유 |
|------|------|------|
| Register | 스레드 전용 초고속 메모리 | 책상 서랍 |
| Shared Memory | 블록 내 공유, 빠름 | 사무실 캐비닛 |
| Global Memory | 전체 공유, 크지만 느림 | 건물 지하 창고 |
| Constant Memory | 읽기 전용, 캐시 가능 | 게시판에 붙은 공지 |
| Coalesced Access | 연속 메모리 접근 패턴 | 택배를 동네별로 묶어 배달 |
| __syncthreads() | 블록 내 동기화 | "다들 준비됐나?" 확인 |

---

## 학습 체크리스트
- [ ] Register, Shared, Global Memory의 속도와 크기 차이를 설명할 수 있다
- [ ] "책상 서랍, 캐비닛, 창고" 비유로 메모리 계층을 설명할 수 있다
- [ ] Coalesced Access가 왜 중요한지 설명할 수 있다
- [ ] Shared Memory가 성능을 향상시키는 원리를 이해한다
- [ ] __syncthreads()의 역할을 설명할 수 있다
`;
