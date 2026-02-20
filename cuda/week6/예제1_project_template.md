# 예제 1: project_template.cu

## 목적
**CUDA 프로젝트의 기본 구조를 제공한다.**

이 템플릿을 복사하여 자신만의 프로젝트를 시작할 수 있습니다.

---

## 사용 방법

```bash
cd ~/cuda/week6/code

# 템플릿 복사
cp project_template.cu my_project.cu

# 수정 후 컴파일
nvcc my_project.cu -o my_project

# 실행
./my_project
```

---

## 템플릿 구조

```
project_template.cu
├── 설정 (#define)
├── GPU 커널 (__global__)
├── CPU 함수 (검증용)
├── 유틸리티 함수
│   ├── 시간 측정
│   ├── 에러 체크
│   └── 결과 검증
└── main()
    ├── 메모리 할당
    ├── 데이터 초기화
    ├── CPU 실행
    ├── GPU 실행
    ├── 결과 비교
    └── 정리
```

---

## 코드 분석

### 1. 설정 영역

```c
#define DATA_SIZE 1000000  // 데이터 크기
#define BLOCK_SIZE 256     // 블록당 스레드 수
```

프로젝트에 맞게 상수를 정의합니다.

### 2. GPU 커널

```c
__global__ void myKernel(float* input, float* output, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;

    if (idx < n) {
        // TODO: 실제 연산을 구현하세요
        output[idx] = input[idx] * 2.0f;
    }
}
```

이 부분을 프로젝트에 맞게 수정합니다.

### 3. CUDA 에러 체크 매크로

```c
#define CUDA_CHECK(call) \
    do { \
        cudaError_t err = call; \
        if (err != cudaSuccess) { \
            printf("CUDA Error: %s at line %d\n", \
                   cudaGetErrorString(err), __LINE__); \
            exit(1); \
        } \
    } while(0)

// 사용 예
CUDA_CHECK(cudaMalloc(&d_input, size));
CUDA_CHECK(cudaMemcpy(d_input, h_input, size, cudaMemcpyHostToDevice));
```

CUDA 함수 호출 후 에러를 즉시 확인합니다.

### 4. 결과 검증 함수

```c
int verifyResults(float* cpu, float* gpu, int n, float tolerance) {
    int errors = 0;
    for (int i = 0; i < n; i++) {
        if (fabsf(cpu[i] - gpu[i]) > tolerance) {
            errors++;
        }
    }
    return errors;
}
```

CPU와 GPU 결과를 비교하여 정확성을 확인합니다.

---

## 프로젝트 아이디어

### 난이도 ★☆☆ (초급)

| 프로젝트 | 설명 | 주요 기술 |
|----------|------|----------|
| 히스토그램 | 이미지 밝기 분포 계산 | atomicAdd |
| 행렬 전치 | 행과 열 교환 | Shared Memory |
| 이미지 회전 | 90도 회전 | 좌표 변환 |

### 난이도 ★★☆ (중급)

| 프로젝트 | 설명 | 주요 기술 |
|----------|------|----------|
| 히스토그램 평활화 | 이미지 대비 향상 | 히스토그램 + 변환 |
| 가우시안 블러 | 부드러운 블러 | 컨볼루션 |
| K-Means 클러스터링 | 색상 양자화 | 반복 알고리즘 |

### 난이도 ★★★ (고급)

| 프로젝트 | 설명 | 주요 기술 |
|----------|------|----------|
| 얼굴 검출 | Haar Cascade | OpenCV + CUDA |
| 객체 추적 | 실시간 추적 | 영상 처리 |
| 신경망 추론 | 간단한 MLP | 행렬 연산 |

---

## 프로젝트 체크리스트

```
□ 프로젝트 주제 선정
□ 알고리즘 이해
□ CPU 버전 구현 및 테스트
□ GPU 커널 설계
□ GPU 버전 구현
□ 결과 검증 (CPU vs GPU)
□ 성능 측정 및 분석
□ 코드 정리 및 주석
□ 문서화 (README)
□ 발표 준비
```

---

## 평가 기준

| 항목 | 비중 | 세부 내용 |
|------|:----:|----------|
| 기능 구현 | 40% | 요구사항 충족, 정확성 |
| 코드 품질 | 20% | 가독성, 구조화, 주석 |
| CUDA 활용 | 20% | GPU 최적화, 성능 향상 |
| 문서화/발표 | 20% | README, 설명, 데모 |

---

## 이 템플릿에서 제공하는 것

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   📁 템플릿 구성요소                                          ║
║                                                               ║
║   ✅ CUDA 에러 체크 매크로 (CUDA_CHECK)                       ║
║                                                               ║
║   ✅ 시간 측정 함수 (getTimeMs)                               ║
║                                                               ║
║   ✅ 결과 검증 함수 (verifyResults)                           ║
║                                                               ║
║   ✅ GPU 커널 기본 구조                                       ║
║                                                               ║
║   ✅ Shared Memory 사용 예시                                  ║
║                                                               ║
║   ✅ 메모리 관리 패턴 (할당 → 사용 → 해제)                    ║
║                                                               ║
║   ✅ CPU/GPU 성능 비교 출력                                   ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Week6 (프로젝트 주간) 일정

| 일차 | 활동 |
|:----:|------|
| Day 1 | 주제 선정, 설계 |
| Day 2-3 | 구현 |
| Day 4 | 테스트, 최적화 |
| Day 5 | 문서화, 발표 |

---

*작성일: 2026-02-20*
