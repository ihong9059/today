export const lesson8_2_content = `
# CUDA 프로그래밍 기초

## 학습 목표
이 레슨을 완료하면:
- CUDA가 무엇이고 왜 등장했는지 설명할 수 있다
- Host(CPU)와 Device(GPU)의 관계를 이해한다
- Thread, Block, Grid 계층 구조를 비유로 설명할 수 있다
- 간단한 CUDA 커널 코드를 읽고 이해할 수 있다

---

## 핵심 메시지
> **"CUDA는 GPU에게 일을 시키는 언어이다."**
> CPU가 사장님이라면, CUDA는 사장님이 공장(GPU)의 작업자들에게 업무를 지시하는 업무 지시서입니다.

---

## CUDA란 무엇인가

### 비유: GPU라는 공장에 업무 지시서를 보내기

예전의 GPU는 오직 화면에 그림을 그리는 일만 할 수 있었습니다.
마치 "그림만 그릴 수 있는 공장"이었죠. 아무리 일꾼이 많아도 그림 외의 일은 시킬 수 없었습니다.

2007년, NVIDIA가 **CUDA(Compute Unified Device Architecture)**를 발표하면서 상황이 바뀌었습니다.
CUDA 덕분에 GPU에게 "그림 말고 수학 계산도 해줘!"라고 지시할 수 있게 된 것입니다.

| 시기 | GPU의 역할 | 비유 |
|------|-----------|------|
| CUDA 이전 | 그래픽 전용 | 그림만 그리는 공장 |
| CUDA 이후 | 범용 연산 가능 | 무엇이든 만드는 공장 |

CUDA는 C/C++ 문법을 약간 확장한 것이라서, C를 아는 사람이면 비교적 쉽게 배울 수 있습니다.

---

## Host와 Device: 사장님과 공장

CUDA 프로그래밍에서는 두 가지 세계가 존재합니다.

### 비유: 본사와 공장

| 용어 | 의미 | 비유 | 역할 |
|------|------|------|------|
| **Host** | CPU + 시스템 메모리(RAM) | 본사 사무실 | 전체 프로그램 제어, 데이터 준비 |
| **Device** | GPU + GPU 메모리(VRAM) | 대규모 공장 | 대량의 병렬 연산 수행 |

중요한 점은 Host와 Device의 **메모리가 분리**되어 있다는 것입니다.
본사(CPU)의 서류를 공장(GPU)에서 사용하려면 반드시 **복사해서 보내야** 합니다.

\`\`\`text
CUDA 프로그램의 기본 흐름:

1. [Host] 데이터 준비 (CPU 메모리에)
2. [Host] GPU 메모리 공간 확보
3. [Host -> Device] 데이터 복사 (CPU -> GPU)
4. [Device] GPU에서 연산 실행 (커널 실행)
5. [Device -> Host] 결과 복사 (GPU -> CPU)
6. [Host] 결과 사용 및 정리
\`\`\`

이 흐름은 마치 본사에서 원재료를 공장으로 보내고, 공장에서 제품을 만든 뒤,
완성품을 다시 본사로 가져오는 과정과 같습니다.

---

## 커널(Kernel): GPU에게 내리는 작업 지시

**커널**이란 GPU에서 실행되는 함수입니다. 일반 C 함수와 비슷하지만,
수천 개의 스레드가 **동시에** 같은 함수를 실행한다는 점이 다릅니다.

### 비유: 같은 업무 매뉴얼을 받은 1000명의 작업자

공장장이 작업자 1000명에게 똑같은 매뉴얼을 나눠줍니다.
"매뉴얼의 3페이지를 읽고, 자기 번호에 해당하는 부품을 조립하세요."
각 작업자는 같은 매뉴얼(같은 코드)을 따르지만, 자기 번호(스레드 ID)에 따라 다른 데이터를 처리합니다.

\`\`\`text
// CUDA 커널 함수 선언 - __global__ 키워드가 핵심!
__global__ void addArrays(float* a, float* b, float* c, int n) {
    int idx = threadIdx.x + blockIdx.x * blockDim.x;
    if (idx < n) {
        c[idx] = a[idx] + b[idx];  // 각 스레드가 하나의 원소를 처리
    }
}

// 커널 호출 (Host에서)
addArrays<<<gridSize, blockSize>>>(d_a, d_b, d_c, n);
//         ^^^^^^^^^^^^^^^^^^^^ 이 부분이 CUDA만의 특별한 문법
\`\`\`

### CUDA 함수 종류

| 키워드 | 어디서 호출 | 어디서 실행 | 용도 |
|--------|-----------|-----------|------|
| \`__global__\` | Host (CPU) | Device (GPU) | 커널 함수 (GPU 작업 시작점) |
| \`__device__\` | Device (GPU) | Device (GPU) | GPU 내부 보조 함수 |
| \`__host__\` | Host (CPU) | Host (CPU) | 일반 CPU 함수 (기본값) |

---

## Thread, Block, Grid: 작업자 조직 체계

CUDA에서 가장 중요한 개념 중 하나가 **스레드 계층 구조**입니다.
수천~수만 개의 스레드를 어떻게 조직하는지를 이해해야 합니다.

### 비유: 공장의 조직 구조

거대한 공장을 상상해 봅시다.

- **Thread (스레드)** = 한 명의 작업자
- **Block (블록)** = 한 팀 (같은 작업장에서 일하는 작업자들)
- **Grid (그리드)** = 전체 공장 (모든 팀을 포함)

\`\`\`text
[Grid - 전체 공장]
+------------------+------------------+------------------+
|   Block 0 (1팀)  |   Block 1 (2팀)  |   Block 2 (3팀)  |  ...
| +--+--+--+--+   | +--+--+--+--+   | +--+--+--+--+   |
| |T0|T1|T2|T3|   | |T0|T1|T2|T3|   | |T0|T1|T2|T3|   |
| +--+--+--+--+   | +--+--+--+--+   | +--+--+--+--+   |
+------------------+------------------+------------------+

T = Thread (작업자)
Block = 같은 팀의 작업자들 (서로 협력 가능)
Grid = 전체 공장
\`\`\`

### 계층별 특징

| 계층 | 최대 크기 | 특징 |
|------|----------|------|
| **Thread** | - | 최소 실행 단위, 각자 고유한 ID를 가짐 |
| **Block** | 최대 1024개 스레드 | 같은 블록의 스레드끼리 데이터 공유 가능 |
| **Grid** | 사실상 무제한 | 블록들의 모음, 전체 작업을 나타냄 |

### 왜 이런 계층이 필요한가?

한 번에 10,000개의 데이터를 처리해야 한다고 합시다.
블록 하나에 최대 1024개의 스레드만 넣을 수 있으므로,
여러 블록으로 나눠야 합니다.

\`\`\`text
10,000개 데이터 처리하기:
- 블록당 256개 스레드 사용
- 필요한 블록 수 = ceil(10000 / 256) = 40개 블록
- 총 스레드 수 = 40 x 256 = 10,240개
- (남는 240개는 경계 검사로 아무 일도 안 함)
\`\`\`

---

## 스레드 인덱스: "나는 몇 번 작업자인가?"

각 스레드는 자신이 전체에서 몇 번째인지 알아야 합니다.
그래야 자기가 맡은 데이터를 찾아서 처리할 수 있습니다.

### 핵심 내장 변수

| 변수 | 의미 | 비유 |
|------|------|------|
| \`threadIdx.x\` | 블록 안에서 몇 번째 스레드인가 | 팀 안에서의 번호 |
| \`blockIdx.x\` | 그리드 안에서 몇 번째 블록인가 | 몇 번째 팀인가 |
| \`blockDim.x\` | 한 블록에 몇 개의 스레드가 있는가 | 한 팀의 인원 수 |

### 전역 인덱스 계산 공식

\`\`\`text
globalIdx = threadIdx.x + blockIdx.x * blockDim.x

예시: blockDim.x=4 (한 팀에 4명)

Block 0:        Block 1:        Block 2:
threadIdx: 0,1,2,3   threadIdx: 0,1,2,3   threadIdx: 0,1,2,3
globalIdx: 0,1,2,3   globalIdx: 4,5,6,7   globalIdx: 8,9,10,11

Block 1의 threadIdx=2인 스레드:
globalIdx = 2 + 1 * 4 = 6  => 전체에서 6번째 데이터를 처리
\`\`\`

---

## 커널 실행 구문: <<<블록 수, 스레드 수>>>

CUDA만의 특별한 문법이 바로 \`<<<>>>\` (triple angle bracket)입니다.
이것으로 "블록을 몇 개 만들고, 각 블록에 스레드를 몇 개 넣을지"를 지정합니다.

\`\`\`text
// 커널 실행 구문
myKernel<<<gridSize, blockSize>>>(인자들);
//          |           |
//          |           +-- 블록당 스레드 수 (보통 128 or 256)
//          +-------------- 블록 수

// 예시: 10,000개 원소 처리
int n = 10000;
int blockSize = 256;
int gridSize = (n + blockSize - 1) / blockSize;  // = 40
addArrays<<<40, 256>>>(d_a, d_b, d_c, n);
// 40개 블록 x 256 스레드 = 10,240개 스레드 동시 실행!
\`\`\`

### 블록 크기 선택 가이드

| 블록 크기 | 장단점 |
|----------|--------|
| 32 | Warp 크기와 일치, 작은 데이터에 적합 |
| 128 | 균형 잡힌 선택 |
| **256** | 대부분의 경우 추천 |
| 512 | 큰 데이터에 적합, 레지스터 제한 주의 |
| 1024 | 최대 크기, 제약 조건 많음 |

일반적으로 **256**을 기본값으로 사용하면 대부분의 경우 좋은 성능을 얻을 수 있습니다.

---

## 완전한 CUDA 프로그램 예시

아래는 두 배열을 더하는 완전한 CUDA 프로그램입니다.
각 단계가 앞서 배운 개념과 어떻게 연결되는지 주석으로 표시했습니다.

\`\`\`text
#include <cuda_runtime.h>
#include <stdio.h>

// 1단계: 커널 함수 정의 (__global__ = GPU에서 실행)
__global__ void vectorAdd(float* a, float* b, float* c, int n) {
    // 각 스레드가 자기 번호 계산
    int idx = threadIdx.x + blockIdx.x * blockDim.x;
    // 경계 검사: 데이터 범위를 넘지 않도록
    if (idx < n) {
        c[idx] = a[idx] + b[idx];
    }
}

int main() {
    int n = 10000;
    size_t size = n * sizeof(float);

    // 2단계: Host(CPU) 메모리 할당 및 데이터 준비
    float *h_a = (float*)malloc(size);
    float *h_b = (float*)malloc(size);
    float *h_c = (float*)malloc(size);
    for (int i = 0; i < n; i++) {
        h_a[i] = (float)i;
        h_b[i] = (float)(i * 2);
    }

    // 3단계: Device(GPU) 메모리 할당
    float *d_a, *d_b, *d_c;
    cudaMalloc(&d_a, size);
    cudaMalloc(&d_b, size);
    cudaMalloc(&d_c, size);

    // 4단계: Host -> Device 데이터 복사
    cudaMemcpy(d_a, h_a, size, cudaMemcpyHostToDevice);
    cudaMemcpy(d_b, h_b, size, cudaMemcpyHostToDevice);

    // 5단계: 커널 실행
    int blockSize = 256;
    int gridSize = (n + blockSize - 1) / blockSize;
    vectorAdd<<<gridSize, blockSize>>>(d_a, d_b, d_c, n);

    // 6단계: Device -> Host 결과 복사
    cudaMemcpy(h_c, d_c, size, cudaMemcpyDeviceToHost);

    // 7단계: 메모리 해제
    cudaFree(d_a); cudaFree(d_b); cudaFree(d_c);
    free(h_a); free(h_b); free(h_c);
    return 0;
}
\`\`\`

---

## 2D 블록과 그리드: 이미지 처리에 유용

지금까지는 1D(1차원) 인덱스만 사용했지만, CUDA는 2D, 3D 인덱스도 지원합니다.
이미지 처리처럼 2차원 데이터를 다룰 때 매우 편리합니다.

\`\`\`text
// 1920 x 1080 이미지 처리
dim3 blockSize(16, 16);    // 16x16 = 256 스레드/블록
dim3 gridSize(
    (1920 + 15) / 16,      // 120 블록 (가로)
    (1080 + 15) / 16       // 68 블록 (세로)
);

// 커널 내부에서 2D 좌표 계산
__global__ void processImage(...) {
    int x = threadIdx.x + blockIdx.x * blockDim.x;  // 가로 좌표
    int y = threadIdx.y + blockIdx.y * blockDim.y;  // 세로 좌표
    // 각 스레드가 하나의 픽셀을 처리
}
\`\`\`

---

## 핵심 요약

| 개념 | 설명 | 비유 |
|------|------|------|
| CUDA | NVIDIA GPU용 병렬 프로그래밍 플랫폼 | GPU 공장에 보내는 업무 지시서 |
| Host | CPU + RAM | 본사 사무실 |
| Device | GPU + VRAM | 대규모 공장 |
| 커널 | GPU에서 실행되는 함수 | 작업자들에게 나눠주는 매뉴얼 |
| Thread | 최소 실행 단위 | 한 명의 작업자 |
| Block | 스레드의 그룹 (최대 1024개) | 한 팀 |
| Grid | 블록의 그룹 | 전체 공장 |
| threadIdx | 블록 내 스레드 번호 | 팀 내 번호 |
| blockIdx | 그리드 내 블록 번호 | 팀 번호 |

---

## 학습 체크리스트
- [ ] CUDA가 등장하기 전과 후의 GPU 역할 차이를 설명할 수 있다
- [ ] Host와 Device의 관계를 "본사와 공장" 비유로 설명할 수 있다
- [ ] Thread/Block/Grid 계층 구조를 설명할 수 있다
- [ ] globalIdx = threadIdx.x + blockIdx.x * blockDim.x 공식을 이해한다
- [ ] <<<gridSize, blockSize>>> 구문의 의미를 설명할 수 있다
- [ ] 완전한 CUDA 프로그램의 6단계 흐름을 나열할 수 있다
`;
