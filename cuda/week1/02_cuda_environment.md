# Day 2: CUDA 환경 설정

## 1. CUDA란?

CUDA(Compute Unified Device Architecture)는 NVIDIA GPU에서 프로그램을 실행하기 위한 도구입니다.

```
┌─────────────────────────────────────────┐
│              우리가 작성한 코드           │
│                   ↓                     │
│           ┌─────────────┐               │
│           │    CUDA     │ ← 번역기 역할  │
│           └─────────────┘               │
│                   ↓                     │
│           ┌─────────────┐               │
│           │     GPU     │ ← 실제 실행    │
│           └─────────────┘               │
└─────────────────────────────────────────┘
```

---

## 2. CUDA 환경 변수 설정

JetPack에 CUDA가 설치되어 있지만, 시스템이 CUDA를 찾을 수 있도록 **경로를 알려줘야** 합니다.

### 2.1 현재 상태 확인

터미널에서 실행:
```bash
nvcc --version
```

`command not found`가 나오면 환경 설정이 필요합니다.

### 2.2 CUDA 위치 확인

```bash
ls /usr/local/cuda
```

`bin`, `lib64` 등 폴더가 보이면 CUDA가 설치된 것입니다.

### 2.3 환경 변수 추가

터미널에서 다음을 실행:

```bash
# .bashrc 파일 열기
nano ~/.bashrc
```

파일 맨 아래에 다음 두 줄 추가:

```bash
export PATH=/usr/local/cuda/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH
```

저장하고 나오기: `Ctrl + O` → `Enter` → `Ctrl + X`

### 2.4 설정 적용

```bash
source ~/.bashrc
```

### 2.5 설정 확인

```bash
nvcc --version
```

이제 CUDA 버전이 표시되면 성공입니다!

```
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2024 NVIDIA Corporation
Built on ...
Cuda compilation tools, release 12.x, V12.x.xxx
```

---

## 3. CUDA 파일 구조 이해

```
/usr/local/cuda/
├── bin/           ← 실행 파일 (nvcc 등)
│   └── nvcc       ← CUDA 컴파일러
├── lib64/         ← 라이브러리 파일
├── include/       ← 헤더 파일
└── samples/       ← 예제 코드
```

### 3.1 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `nvcc` | CUDA 컴파일러 |
| `nvidia-smi` | GPU 상태 확인 |
| `tegrastats` | Jetson 전용 모니터링 |

---

## 4. 작업 폴더 만들기

CUDA 실습을 위한 폴더를 만들어봅시다.

```bash
# 홈 디렉토리로 이동
cd ~

# cuda_study 폴더 생성
mkdir cuda_study

# 폴더로 이동
cd cuda_study

# week1 폴더 생성
mkdir week1
cd week1
```

---

## 5. 첫 번째 컴파일 테스트

### 5.1 간단한 C 프로그램 작성

```bash
nano test.c
```

다음 내용 입력:
```c
#include <stdio.h>

int main() {
    printf("Hello from CPU!\n");
    return 0;
}
```

저장: `Ctrl + O` → `Enter` → `Ctrl + X`

### 5.2 일반 C 컴파일 (gcc)

```bash
gcc test.c -o test
./test
```

출력: `Hello from CPU!`

### 5.3 CUDA 컴파일 테스트 (nvcc)

CUDA 파일은 `.cu` 확장자를 사용합니다.

```bash
nano test.cu
```

같은 내용 입력:
```c
#include <stdio.h>

int main() {
    printf("Hello from CUDA file!\n");
    return 0;
}
```

```bash
nvcc test.cu -o test_cuda
./test_cuda
```

출력: `Hello from CUDA file!`

**nvcc도 일반 C 코드를 컴파일할 수 있습니다!**

---

## 6. 편집기 선택

코드 작성에 사용할 편집기를 선택하세요:

### 6.1 터미널 편집기 (간단)
- **nano**: 가장 쉬움 (우리 실습에서 사용)
- **vim**: 강력하지만 학습 필요

### 6.2 GUI 편집기 (권장)
- **VS Code**: 가장 인기 있음
- **Gedit**: Ubuntu 기본 편집기

### VS Code 설치 (선택사항)

```bash
# ARM64용 VS Code 설치
sudo apt update
sudo apt install code
```

---

## 7. 오늘의 실습

### 실습 1: 환경 설정
- [ ] `.bashrc`에 CUDA 경로 추가
- [ ] `source ~/.bashrc` 실행
- [ ] `nvcc --version` 확인

### 실습 2: 폴더 구조 만들기
- [ ] `~/cuda_study/week1` 폴더 생성
- [ ] 해당 폴더로 이동

### 실습 3: 컴파일 테스트
- [ ] `test.c` 작성 및 gcc 컴파일
- [ ] `test.cu` 작성 및 nvcc 컴파일
- [ ] 두 프로그램 모두 실행

---

## 8. 문제 해결

### Q1: `nvcc: command not found`
```bash
# CUDA 경로 확인
ls /usr/local/cuda/bin/nvcc

# 경로가 다르면 해당 경로로 수정
# 예: /usr/local/cuda-12.2/bin
```

### Q2: `permission denied`
```bash
# 실행 권한 추가
chmod +x ./test
```

### Q3: 환경 변수가 적용 안됨
```bash
# 터미널 재시작 또는
source ~/.bashrc
```

---

## 9. 용어 정리

| 용어 | 의미 |
|------|------|
| **nvcc** | NVIDIA CUDA Compiler |
| **PATH** | 실행 파일을 찾는 경로 |
| **LD_LIBRARY_PATH** | 라이브러리 파일을 찾는 경로 |
| **.bashrc** | 터미널 시작 시 실행되는 설정 파일 |
| **.cu** | CUDA 소스 코드 확장자 |

---

## 10. 다음 시간 예고

내일은 CUDA의 핵심 개념을 배웁니다!
- CPU vs GPU 차이
- 왜 GPU가 빠른가?
- 병렬 처리란 무엇인가?
