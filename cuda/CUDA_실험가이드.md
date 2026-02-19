# CUDA 실험 가이드

**작성일:** 2026-02-20
**대상:** Jetson Nano / PC (NVIDIA GPU)

---

# Part A: PC (NVIDIA GPU) 환경

---

## A1. PC에서 실험 가능 여부

### A1.1 결론: NVIDIA GPU가 있으면 모든 실습 가능

NVIDIA 그래픽카드가 장착된 PC에서 **모든 예제를 실행할 수 있습니다.**

| 주차 | 내용 | PC 호환 | 비고 |
|:----:|------|:-------:|------|
| 1주차 | Hello CUDA, 환경설정 | ✅ | 완벽 지원 |
| 2주차 | Vector Addition, SAXPY | ✅ | 더 빠른 실행 |
| 3주차 | Matrix Multiplication | ✅ | 대용량 가능 |
| 4주차 | 이미지 처리 | ✅ | 4K 이상 가능 |
| 5주차 | OpenCV + TensorRT | ⚠️ | TensorRT 별도 설치 |
| 6주차 | 프로젝트 | ✅ | 고성능 |

### A1.2 지원 GPU 확인

**CUDA 지원 GPU 목록:**
- GeForce GTX 600 시리즈 이상
- GeForce RTX 전 시리즈
- Quadro, Tesla 시리즈

```
성능 낮음 ◀─────────────────────────────────▶ 성능 높음

GTX 1050 → GTX 1660 → RTX 3060 → RTX 4070 → RTX 4090
  입문용      중급        고급       전문가      최고성능
```

### A1.3 Jetson vs PC 비교

| 항목 | Jetson Nano | PC (RTX 3060) |
|------|-------------|---------------|
| CUDA Cores | 128 | 3584 |
| Memory | 4GB (공유) | 12GB (전용) |
| 메모리 구조 | Unified | 분리 (Host/Device) |
| TDP | 10W | 170W |
| 가격 | ~$150 | ~$300 (GPU만) |
| 장점 | 저전력, 임베디드 | 고성능, 대용량 |

### A1.4 코드 호환성

```
⚠️ 주의사항: Unified Memory 차이

Jetson: CPU/GPU 메모리 공유 (cudaMallocManaged 최적)
PC: CPU/GPU 메모리 분리 (cudaMemcpy 필요할 수 있음)

→ 본 예제는 cudaMallocManaged를 사용하므로 PC에서도 동작합니다.
→ 단, PC에서는 명시적 메모리 복사가 더 빠를 수 있습니다.
```

---

## A2. PC 환경 설정 (Windows)

### A2.1 GPU 확인

```powershell
# PowerShell에서 실행
nvidia-smi
```

출력 예시:
```
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 535.xx       Driver Version: 535.xx       CUDA Version: 12.2    |
|-------------------------------+----------------------+----------------------+
| GPU  Name            TCC/WDDM | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  NVIDIA GeForce ...  WDDM | 00000000:01:00.0  On |                  N/A |
| 30%   45C    P8    15W / 170W |   1234MiB / 12288MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+
```

### A2.2 CUDA Toolkit 설치

1. **다운로드**
   - https://developer.nvidia.com/cuda-downloads
   - OS: Windows
   - Architecture: x86_64
   - Version: 10/11
   - Installer Type: exe (local)

2. **설치**
   - 다운로드한 exe 실행
   - "Express" 설치 선택
   - 재부팅

3. **환경변수 확인**
   - 보통 자동 설정됨
   - 수동 설정 필요 시:
   ```
   CUDA_PATH = C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.x
   PATH에 추가:
   - C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.x\bin
   - C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.x\libnvvp
   ```

4. **설치 확인**
   ```cmd
   nvcc --version
   ```

### A2.3 Visual Studio 설치 (필수)

CUDA는 Windows에서 Visual Studio C++ 컴파일러가 필요합니다.

1. **Visual Studio 2019/2022 Community 다운로드**
   - https://visualstudio.microsoft.com/ko/downloads/

2. **설치 시 선택**
   - "C++를 사용한 데스크톱 개발" 워크로드 체크

---

## A3. PC 환경 설정 (Linux/Ubuntu)

### A3.1 GPU 드라이버 설치

```bash
# 권장 드라이버 확인
ubuntu-drivers devices

# 자동 설치
sudo ubuntu-drivers autoinstall

# 재부팅
sudo reboot

# 확인
nvidia-smi
```

### A3.2 CUDA Toolkit 설치

```bash
# Ubuntu 22.04 예시
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update
sudo apt-get -y install cuda-toolkit-12-2

# 환경변수 설정
echo 'export PATH=/usr/local/cuda/bin:$PATH' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc
source ~/.bashrc

# 확인
nvcc --version
```

### A3.3 빌드 도구 설치

```bash
sudo apt-get install build-essential
```

---

## A4. PC에서 예제 실행

### A4.1 Windows에서 컴파일/실행

**방법 1: 명령 프롬프트 (CMD)**
```cmd
cd C:\cuda_study\week1
nvcc hello_cuda.cu -o hello_cuda.exe
hello_cuda.exe
```

**방법 2: PowerShell**
```powershell
cd C:\cuda_study\week1
nvcc hello_cuda.cu -o hello_cuda.exe
.\hello_cuda.exe
```

**방법 3: Visual Studio**
1. File → New → Project
2. CUDA Runtime 선택
3. .cu 파일 추가
4. Ctrl + F5 실행

### A4.2 Linux에서 컴파일/실행

```bash
cd ~/cuda_study/week1
nvcc hello_cuda.cu -o hello_cuda
./hello_cuda
```

### A4.3 GPU 아키텍처 설정

```bash
# 자동 감지 (권장)
nvcc -arch=native hello_cuda.cu -o hello_cuda

# 수동 지정 (GPU별)
nvcc -arch=sm_75 hello_cuda.cu -o hello_cuda   # RTX 20xx
nvcc -arch=sm_86 hello_cuda.cu -o hello_cuda   # RTX 30xx
nvcc -arch=sm_89 hello_cuda.cu -o hello_cuda   # RTX 40xx
```

| GPU 시리즈 | Compute Capability | -arch 옵션 |
|-----------|-------------------|------------|
| GTX 10xx | 6.1 | sm_61 |
| GTX 16xx | 7.5 | sm_75 |
| RTX 20xx | 7.5 | sm_75 |
| RTX 30xx | 8.6 | sm_86 |
| RTX 40xx | 8.9 | sm_89 |

---

## A5. PC에서 주차별 실습

### A5.1 Week 1-4: 동일하게 실행

모든 기본 예제는 수정 없이 실행 가능:

```bash
# Week 1
nvcc hello_cuda.cu -o hello_cuda && ./hello_cuda

# Week 2
nvcc vector_add.cu -o vector_add && ./vector_add

# Week 3
nvcc matrix_mul.cu -o matrix_mul && ./matrix_mul

# Week 4
nvcc grayscale.cu -o grayscale && ./grayscale input.jpg output.jpg
```

### A5.2 Week 5: OpenCV 설치

**Windows:**
1. https://opencv.org/releases/ 에서 다운로드
2. 환경변수에 OpenCV 경로 추가
3. 또는 vcpkg 사용:
   ```cmd
   vcpkg install opencv4:x64-windows
   ```

**Linux:**
```bash
sudo apt-get install libopencv-dev python3-opencv
```

**CUDA 지원 OpenCV 빌드 (선택):**
```bash
# 소스에서 빌드 필요 (복잡함)
# 기본 OpenCV도 CPU 처리는 가능
```

### A5.3 Week 5: TensorRT (선택)

PC에서 TensorRT는 별도 설치 필요:
- https://developer.nvidia.com/tensorrt
- NVIDIA 개발자 등록 필요

---

## A6. PC 성능 모니터링

### A6.1 nvidia-smi

```bash
# 기본 정보
nvidia-smi

# 실시간 모니터링 (1초 간격)
nvidia-smi -l 1

# GPU 사용률만
nvidia-smi --query-gpu=utilization.gpu --format=csv -l 1
```

### A6.2 GPU-Z (Windows)

- https://www.techpowerup.com/gpuz/
- GUI로 GPU 상태 실시간 모니터링

### A6.3 nvtop (Linux)

```bash
sudo apt install nvtop
nvtop
```

htop과 유사한 GPU 모니터링 도구

---

## A7. PC vs Jetson 코드 최적화

### A7.1 메모리 전략 차이

**Jetson 최적 (Unified Memory):**
```c
// Jetson에서 효율적
float *data;
cudaMallocManaged(&data, size);
// CPU/GPU 모두 직접 접근
```

**PC 최적 (명시적 전송):**
```c
// PC에서 더 빠를 수 있음
float *h_data = (float*)malloc(size);      // Host
float *d_data;
cudaMalloc(&d_data, size);                  // Device
cudaMemcpy(d_data, h_data, size, cudaMemcpyHostToDevice);
// 커널 실행
cudaMemcpy(h_data, d_data, size, cudaMemcpyDeviceToHost);
```

### A7.2 그리드/블록 크기

**Jetson Nano (128 CUDA cores):**
```c
dim3 threads(16, 16);  // 256 threads
```

**PC GPU (수천 CUDA cores):**
```c
dim3 threads(32, 32);  // 1024 threads (최대)
```

---

## A8. PC 문제 해결

### A8.1 nvcc를 찾을 수 없음 (Windows)

```cmd
# 환경변수 확인
echo %CUDA_PATH%

# PATH에 추가
set PATH=%CUDA_PATH%\bin;%PATH%

# 영구 설정: 시스템 환경변수에서 PATH 편집
```

### A8.2 Visual Studio 컴파일러 오류

```cmd
# x64 Native Tools Command Prompt 사용
# 시작 메뉴 → "x64 Native Tools Command Prompt for VS 2022"
```

### A8.3 CUDA/드라이버 버전 불일치

```bash
# 드라이버가 지원하는 CUDA 버전 확인
nvidia-smi  # 우측 상단의 "CUDA Version"

# 해당 버전 이하의 CUDA Toolkit 설치
```

### A8.4 Out of Memory

```bash
# GPU 메모리 사용량 확인
nvidia-smi

# 다른 프로그램 종료 (게임, 브라우저 등)

# 코드에서 데이터 크기 줄이기
```

---

## A9. PC 빠른 시작 체크리스트

- [ ] NVIDIA GPU 장착 확인
- [ ] nvidia-smi 실행 확인
- [ ] CUDA Toolkit 설치
- [ ] Visual Studio 설치 (Windows)
- [ ] nvcc --version 확인
- [ ] Hello CUDA 컴파일/실행 성공
- [ ] GPU 사용률 모니터링 확인

---

## A10. WSL2에서 CUDA (Windows 대안)

Windows에서 Linux 환경을 원한다면:

```powershell
# WSL2 설치
wsl --install -d Ubuntu

# Ubuntu에서 CUDA 설치 (nvidia-smi는 Windows 드라이버 사용)
# CUDA Toolkit만 설치
sudo apt-get install nvidia-cuda-toolkit
```

---

# Part B: Jetson Nano 환경

---

## 1. Jetson Nano 실험 가능 여부

### 1.1 결론: 모든 실습 가능

이 학습자료의 모든 예제는 **Jetson Nano에서 실행 가능**합니다.

| 주차 | 내용 | Jetson Nano 호환 | 비고 |
|:----:|------|:----------------:|------|
| 1주차 | Hello CUDA, 환경설정 | ✅ | 완벽 지원 |
| 2주차 | Vector Addition, SAXPY | ✅ | Unified Memory 활용 |
| 3주차 | Matrix Multiplication | ✅ | 512x512 권장 |
| 4주차 | 이미지 처리 | ✅ | Full HD 이하 권장 |
| 5주차 | OpenCV + TensorRT | ✅ | JetPack 4.x 필요 |
| 6주차 | 프로젝트 | ✅ | 메모리 제한 고려 |

### 1.2 Jetson Nano 스펙

| 항목 | Jetson Nano 2GB | Jetson Nano 4GB |
|------|-----------------|-----------------|
| GPU | 128-core Maxwell | 128-core Maxwell |
| CUDA Cores | 128 | 128 |
| Memory | 2GB LPDDR4 | 4GB LPDDR4 |
| CUDA | 10.2 | 10.2 |
| JetPack | 4.5+ | 4.4+ |

### 1.3 제한사항 및 권장사항

```
⚠️ 메모리 제한
- 2GB 모델: 대용량 행렬/이미지 처리 시 OOM 주의
- 4GB 모델: 대부분 실습 가능, 동시 작업 주의

권장사항:
- 행렬 크기: 512x512 이하 (1024x1024는 4GB 모델에서만)
- 이미지 크기: 1920x1080 이하
- Swap 공간: 4GB 추가 권장
```

---

## 2. 환경 설정

### 2.1 SD 카드 준비

1. **JetPack 4.6.x 다운로드** (Nano용 최신)
   - https://developer.nvidia.com/embedded/jetpack
   - "Jetson Nano Developer Kit" 선택
   - SD Card Image 다운로드 (~15GB)

2. **balenaEtcher로 굽기**
   ```bash
   # Windows/Mac/Linux에서 balenaEtcher 설치 후
   # 1. Select Image: 다운로드한 zip/img
   # 2. Select Target: SD 카드 (32GB 이상)
   # 3. Flash!
   ```

3. **첫 부팅**
   - SD 카드 삽입 → 전원 연결
   - 초기 설정 완료 (10분)

### 2.2 CUDA 환경변수 설정

```bash
# .bashrc에 추가
echo 'export PATH=/usr/local/cuda/bin:$PATH' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc
source ~/.bashrc

# 확인
nvcc --version
```

### 2.3 Swap 메모리 추가 (강력 권장)

Jetson Nano는 메모리가 적으므로 Swap 추가 필수:

```bash
# 4GB Swap 생성
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 영구 설정
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 확인
free -h
```

### 2.4 전원 모드 설정

```bash
# 최대 성능 모드 (5V 4A 전원 어댑터 필요)
sudo nvpmodel -m 0
sudo jetson_clocks

# 저전력 모드 (USB 전원 사용 시)
sudo nvpmodel -m 1
```

---

## 3. 실습 파일 전송 방법

### 3.1 방법 1: USB 드라이브

```bash
# USB 드라이브 마운트 (자동)
ls /media/$USER/

# 파일 복사
cp -r /media/$USER/USB_NAME/cuda ~/cuda_study
```

### 3.2 방법 2: SCP (네트워크 전송)

```bash
# PC에서 Jetson으로 전송
scp -r ./cuda user@jetson_ip:~/cuda_study

# Jetson IP 확인
hostname -I
```

### 3.3 방법 3: Git Clone

```bash
# 학습 자료가 GitHub에 있다면
git clone https://github.com/your-repo/cuda-study.git
```

---

## 4. 주차별 실험 방법

### 4.1 Week 1: Hello CUDA

```bash
# 작업 폴더 생성
mkdir -p ~/cuda_study/week1
cd ~/cuda_study/week1

# 코드 복사 (USB 또는 직접 작성)
# hello_cuda.cu 파일 생성

# 컴파일
nvcc hello_cuda.cu -o hello_cuda

# 실행
./hello_cuda
```

**예상 출력:**
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

### 4.2 Week 2: Vector Addition

```bash
cd ~/cuda_study/week2

# 컴파일
nvcc vector_add.cu -o vector_add

# 실행
./vector_add
```

**Jetson Nano 특이사항:**
- Unified Memory (`cudaMallocManaged`) 사용으로 코드 간소화
- CPU/GPU 메모리 공유 아키텍처의 장점

### 4.3 Week 3: Matrix Multiplication

```bash
cd ~/cuda_study/week3

# 컴파일
nvcc matrix_mul.cu -o matrix_mul

# 실행
./matrix_mul
```

**메모리 제한 조정:**
```c
// 원본: 512x512 (권장)
int M = 512;
int K = 512;
int N = 512;

// 2GB 모델에서 OOM 발생 시
int M = 256;
int K = 256;
int N = 256;
```

### 4.4 Week 4: 이미지 처리

```bash
cd ~/cuda_study/week4

# stb_image 다운로드
wget https://raw.githubusercontent.com/nothings/stb/master/stb_image.h
wget https://raw.githubusercontent.com/nothings/stb/master/stb_image_write.h

# 테스트 이미지 준비 (작은 이미지 권장)
# 800x600 또는 1280x720 권장

# 컴파일
nvcc grayscale.cu -o grayscale

# 실행
./grayscale input.jpg output.jpg
```

### 4.5 Week 5: OpenCV + CUDA

```bash
# OpenCV 확인
python3 -c "import cv2; print(cv2.__version__)"
python3 -c "import cv2; print(cv2.cuda.getCudaEnabledDeviceCount())"

# Python 예제 실행
cd ~/cuda_study/week5
python3 opencv_cuda_test.py
```

### 4.6 Week 6: 프로젝트

실시간 영상 처리 프로젝트:

```bash
# 웹캠 테스트
python3 camera_test.py

# CSI 카메라 사용 시
gst-launch-1.0 nvarguscamerasrc ! nvoverlaysink
```

---

## 5. 성능 모니터링

### 5.1 tegrastats (실시간 모니터링)

```bash
# 실행
tegrastats

# 출력 예시
RAM 1234/3956MB (lfb 123x4MB) SWAP 0/4096MB (cached 0MB)
CPU [15%@1479,14%@1479,13%@1479,12%@1479]
EMC_FREQ 0% GR3D_FREQ 0% PLL@32C ...
```

| 항목 | 설명 |
|------|------|
| RAM | 사용 중인 메모리 / 전체 |
| CPU | 각 코어 사용률 |
| GR3D_FREQ | GPU 사용률 |
| PLL | 온도 |

### 5.2 jtop (추천)

```bash
# 설치
sudo pip3 install jetson-stats

# 실행 (재부팅 필요할 수 있음)
jtop
```

jtop은 htop과 유사한 UI로 Jetson 상태를 보여줍니다.

### 5.3 GPU 모니터링

```bash
# nvidia-smi는 Jetson에서 제한적
# 대신 tegrastats 또는 jtop 사용

# GPU 정보 확인
cat /proc/device-tree/model
```

---

## 6. 문제 해결

### 6.1 nvcc: command not found

```bash
# CUDA 경로 확인
ls /usr/local/cuda/bin/nvcc

# 환경변수 재설정
export PATH=/usr/local/cuda/bin:$PATH
source ~/.bashrc
```

### 6.2 Out of Memory (OOM)

```bash
# 현재 메모리 확인
free -h

# 불필요한 프로세스 종료
sudo systemctl stop gdm  # GUI 종료 (메모리 절약)

# Swap 확인
swapon --show

# 코드에서 데이터 크기 줄이기
# 예: 1000000 → 100000
```

### 6.3 컴파일 에러

```bash
# 아키텍처 명시 (Nano는 compute_53)
nvcc -arch=sm_53 hello_cuda.cu -o hello_cuda

# 또는 자동 감지
nvcc -arch=native hello_cuda.cu -o hello_cuda
```

### 6.4 느린 실행 속도

```bash
# 전원 모드 확인
sudo nvpmodel -q

# 최대 성능 모드 설정 (4A 어댑터 필요)
sudo nvpmodel -m 0
sudo jetson_clocks
```

### 6.5 카메라가 안 됨

```bash
# CSI 카메라 확인
ls /dev/video0

# 권한 확인
sudo usermod -a -G video $USER
# 로그아웃 후 재로그인

# 테스트
nvgstcapture-1.0
```

---

## 7. 권장 워크플로우

### 7.1 일일 학습 루틴

```bash
# 1. 전원 모드 확인
sudo nvpmodel -q

# 2. 메모리 확인
free -h

# 3. 작업 폴더 이동
cd ~/cuda_study/weekN

# 4. 코드 작성/수정
nano example.cu

# 5. 컴파일
nvcc example.cu -o example

# 6. 실행 및 모니터링
./example &
tegrastats

# 7. 결과 확인
ls -la
```

### 7.2 SSH 원격 접속 (권장)

Jetson에 직접 모니터를 연결하는 대신 PC에서 SSH로 접속:

```bash
# PC에서
ssh user@jetson_ip

# VS Code Remote SSH 사용 시 더 편리
```

### 7.3 파일 백업

```bash
# 작업 결과 PC로 백업
scp -r ~/cuda_study user@pc_ip:~/backup/

# 또는 Git 사용
git add .
git commit -m "Week N 완료"
git push
```

---

## 8. 추가 팁

### 8.1 쿨링

- Jetson Nano는 발열이 심함
- **반드시 방열판 부착**
- 가능하면 쿨링팬 추가 (5V PWM 팬)

### 8.2 전원

- USB 전원 (5V 2A): 저전력 모드만 가능
- DC 배럴잭 (5V 4A): 최대 성능 사용 가능
- **4A 어댑터 강력 권장**

### 8.3 저장 공간

- 32GB SD 카드: 최소 (JetPack만으로 거의 가득)
- **64GB 이상 권장**
- A2 등급 SD 카드 사용 시 속도 향상

---

## 9. 빠른 시작 체크리스트

- [ ] JetPack 설치 완료
- [ ] CUDA 환경변수 설정
- [ ] Swap 4GB 추가
- [ ] 방열판 장착
- [ ] 4A 전원 어댑터 연결
- [ ] 네트워크 연결 (SSH용)
- [ ] 학습자료 복사 완료
- [ ] nvcc --version 확인
- [ ] Hello CUDA 실행 성공

---

## 10. 유용한 명령어 모음

```bash
# 시스템 정보
cat /etc/nv_tegra_release    # JetPack 버전
nvcc --version               # CUDA 버전
python3 -c "import cv2; print(cv2.__version__)"  # OpenCV 버전

# 모니터링
tegrastats                   # 실시간 상태
jtop                        # GUI 모니터링
free -h                     # 메모리
df -h                       # 디스크

# 전원/성능
sudo nvpmodel -m 0          # 최대 성능
sudo nvpmodel -m 1          # 저전력
sudo jetson_clocks          # 클럭 최대화

# 컴파일
nvcc -arch=sm_53 file.cu -o file   # Nano용 아키텍처
nvcc -arch=native file.cu -o file  # 자동 감지
```

---

*Jetson Nano는 CUDA 학습에 최적의 입문 플랫폼입니다. 메모리 제한만 주의하면 모든 실습을 진행할 수 있습니다.*

---

# Part C: 플랫폼 선택 가이드

---

## C1. 어떤 환경을 선택할까?

### C1.1 상황별 추천

| 상황 | 추천 | 이유 |
|------|------|------|
| CUDA 처음 배우기 | PC 또는 Jetson | 둘 다 가능 |
| 이미 NVIDIA GPU PC 있음 | PC | 추가 비용 없음 |
| 임베디드/로봇 개발 목표 | Jetson | 실제 환경과 동일 |
| 고성능 연산 필요 | PC | 더 많은 CUDA 코어 |
| 저전력/휴대성 필요 | Jetson | 10W로 동작 |
| 예산 제한 | 상황에 따라 | PC GPU 있으면 무료 |

### C1.2 학습 경로

```
초급 (Week 1-2)
├── PC: 빠른 시작, 쉬운 설치
└── Jetson: 환경 설정 연습 포함

중급 (Week 3-4)
├── PC: 대용량 데이터 처리 가능
└── Jetson: 메모리 최적화 학습

고급 (Week 5-6)
├── PC: TensorRT 별도 설치 필요
└── Jetson: JetPack에 모두 포함
```

### C1.3 동시 사용 추천

**최적의 학습 방법:**
1. **PC에서 개발/디버깅** - 빠른 컴파일, 큰 화면
2. **Jetson에서 배포/테스트** - 실제 임베디드 환경

```bash
# PC에서 코드 작성 후 Jetson으로 전송
scp -r ./cuda_project user@jetson_ip:~/

# Jetson에서 실행
ssh user@jetson_ip
cd cuda_project && nvcc main.cu -o main && ./main
```

---

## C2. 요약 비교표

| 항목 | PC (NVIDIA GPU) | Jetson Nano |
|------|-----------------|-------------|
| 설치 난이도 | 쉬움 (CUDA Toolkit만) | 보통 (JetPack 이미지) |
| 성능 | 높음 (GPU에 따라) | 낮음 (128 CUDA cores) |
| 메모리 | 넉넉함 (8-24GB) | 제한적 (2-4GB) |
| 전력 소모 | 높음 (100W+) | 낮음 (5-10W) |
| 이식성 | 없음 (데스크톱) | 높음 (소형) |
| OpenCV CUDA | 별도 빌드 필요 | JetPack 포함 |
| TensorRT | 별도 설치 | JetPack 포함 |
| 실무 적용 | AI 서버, 연구 | 로봇, 드론, IoT |

---

*PC와 Jetson 모두 CUDA 학습에 적합합니다. 보유한 하드웨어와 목표에 맞게 선택하세요!*
