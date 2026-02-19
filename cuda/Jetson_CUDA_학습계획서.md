# Jetson CUDA 학습 계획서

**작성일:** 2026-02-20
**목표:** Jetson 보드를 활용한 CUDA 프로그래밍 학습

---

## 1. 학습 목표

- CUDA 병렬 프로그래밍 기초 이해
- Jetson의 GPU 아키텍처 이해
- 실제 응용 프로그램 개발 능력 습득

---

## 2. 사전 준비

### 2.1 하드웨어
- Jetson 보드 (Nano / Orin Nano / AGX 등)
- microSD 카드 (최소 32GB, 권장 64GB)
- 5V 전원 어댑터
- 모니터, 키보드, 마우스
- 이더넷 케이블 또는 WiFi 동글

### 2.2 소프트웨어
- JetPack SDK (CUDA Toolkit 포함)
- Ubuntu (Jetson용)

---

## 3. 학습 단계

### 3.1 Phase 1: 환경 설정

| 순서 | 내용 | 예상 시간 |
|:----:|------|:---------:|
| 1 | JetPack OS 설치 (SD카드 이미지 플래싱) | 1시간 |
| 2 | 초기 설정 (네트워크, 업데이트) | 30분 |
| 3 | CUDA 환경변수 설정 | 30분 |

**CUDA 환경변수 설정:**
```bash
# ~/.bashrc에 추가
export PATH=/usr/local/cuda/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH
```

**설치 확인:**
```bash
nvcc --version
```

### 3.2 Phase 2: CUDA 기초 (1주차)

| 일차 | 주제 | 실습 |
|:----:|------|------|
| 1 | CUDA 개념 이해 | Host/Device, Kernel 개념 |
| 2 | Hello CUDA | 첫 번째 .cu 파일 작성 |
| 3 | Thread/Block/Grid | 병렬 구조 이해 |
| 4 | 메모리 모델 | Global/Shared/Local 메모리 |
| 5 | Vector Addition | 벡터 덧셈 구현 |

**Hello CUDA 예제:**
```cuda
// hello.cu
#include <stdio.h>

__global__ void helloFromGPU() {
    printf("Hello from GPU! Thread %d\n", threadIdx.x);
}

int main() {
    helloFromGPU<<<1, 10>>>();
    cudaDeviceSynchronize();
    return 0;
}
```

**컴파일 및 실행:**
```bash
nvcc hello.cu -o hello
./hello
```

### 3.3 Phase 3: CUDA 심화 (2주차)

| 일차 | 주제 | 실습 |
|:----:|------|------|
| 1 | Unified Memory | Jetson 특화 메모리 관리 |
| 2 | 행렬 연산 | Matrix Multiplication |
| 3 | 동기화 | __syncthreads() 활용 |
| 4 | 에러 핸들링 | CUDA 에러 처리 |
| 5 | 성능 최적화 | 메모리 접근 패턴 |

**Jetson Unified Memory 예제:**
```cuda
// Jetson은 CPU/GPU 메모리 공유 - cudaMallocManaged 활용
int *data;
cudaMallocManaged(&data, size);
// CPU와 GPU 모두에서 접근 가능
```

### 3.4 Phase 4: 응용 프로젝트 (3-4주차)

| 프로젝트 | 설명 | 난이도 |
|----------|------|:------:|
| 이미지 필터링 | Grayscale, Blur 필터 | ★★☆ |
| 히스토그램 계산 | Atomic 연산 활용 | ★★☆ |
| 신경망 추론 | TensorRT 활용 | ★★★ |
| 실시간 영상처리 | OpenCV + CUDA | ★★★ |

---

## 4. 학습 자료

### 4.1 온라인 강좌
- [NVIDIA DLI (Deep Learning Institute)](https://developer.nvidia.com/embedded/learn/tutorials) - 무료 Jetson 강좌
- [Jetson CUDA Beginner Guide (Medium)](https://medium.com/@deborshisaha/chapter-1-a-beginners-guide-to-cuda-on-jetson-orin-nano-ec137d86227c)
- [CUDA Programming with Jetson (Maker Pro)](https://maker.pro/nvidia-jetson/tutorial/introduction-to-cuda-programming-with-jetson-nano)

### 4.2 공식 문서
- [NVIDIA CUDA Programming Guide](https://docs.nvidia.com/cuda/cuda-c-programming-guide/)
- [Jetson Developer Documentation](https://developer.nvidia.com/embedded/jetson-developer)

### 4.3 추천 도서
- "CUDA by Example" - Jason Sanders
- "Programming Massively Parallel Processors" - David Kirk

---

## 5. 주차별 목표

| 주차 | 목표 | 체크 |
|:----:|------|:----:|
| 1주차 | 환경 설정 + Hello CUDA | ⬜ |
| 2주차 | Thread/Block, Vector Addition | ⬜ |
| 3주차 | 메모리 관리, 행렬 연산 | ⬜ |
| 4주차 | 이미지 처리 프로젝트 | ⬜ |
| 5주차 | TensorRT/OpenCV 연동 | ⬜ |
| 6주차 | 개인 프로젝트 완성 | ⬜ |

---

## 6. Jetson 특화 사항

### 6.1 장점
- **Unified Memory**: CPU/GPU 메모리 공유로 데이터 전송 코드 간소화
- **저전력**: 데스크톱 GPU 대비 전력 효율 우수
- **임베디드 적합**: 로봇, 드론, IoT 응용에 최적

### 6.2 주의사항
- 데스크톱 GPU 대비 성능 제한 있음
- 메모리 용량 제한 (모델에 따라 4GB~64GB)
- 쿨링 필요 (방열판/팬 권장)

---

## 7. 다음 단계

CUDA 기초 완료 후 확장 가능한 분야:
- **AI/ML**: PyTorch, TensorFlow + CUDA
- **컴퓨터 비전**: OpenCV + CUDA
- **로보틱스**: ROS2 + Jetson
- **엣지 AI**: TensorRT 최적화

---

*Jetson의 Unified Memory 아키텍처는 CUDA 학습에 최적의 환경을 제공합니다.*
