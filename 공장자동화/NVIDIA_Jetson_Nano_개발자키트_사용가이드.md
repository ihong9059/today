# NVIDIA Jetson Nano 개발자 키트 사용 가이드

**작성일:** 2026-01-15
**대상:** 현장 엔지니어, AI 개발 입문자

---

## 목차

1. [Jetson Nano 개요](#1-jetson-nano-개요)
2. [필요 장비](#2-필요-장비)
3. [SD 카드 이미지 설치](#3-sd-카드-이미지-설치)
4. [하드웨어 조립](#4-하드웨어-조립)
5. [초기 설정](#5-초기-설정-첫-부팅)
6. [기본 명령어](#6-기본-명령어)
7. [개발 환경 설정](#7-개발-환경-설정)
8. [카메라 테스트](#8-카메라-테스트)
9. [AI 예제](#9-간단한-ai-예제)
10. [원격 접속 설정](#10-원격-접속-설정)
11. [유용한 팁](#11-유용한-팁)
12. [문제 해결](#12-문제-해결)

---

## 1. Jetson Nano 개요

### 1.1 제품 소개

NVIDIA Jetson Nano는 AI 애플리케이션을 위한 소형 컴퓨터입니다. 라즈베리파이처럼 작지만, GPU가 내장되어 딥러닝 추론이 가능합니다.

### 1.2 하드웨어 사양

| 항목 | 사양 |
|------|------|
| **GPU** | 128-core Maxwell |
| **CPU** | Quad-core ARM Cortex-A57 @ 1.43GHz |
| **메모리** | 4GB LPDDR4 (64-bit) |
| **저장장치** | microSD 카드 (별도 구매) |
| **AI 성능** | 472 GFLOPS (FP16) |
| **비디오 인코더** | 4K @ 30fps |
| **비디오 디코더** | 4K @ 60fps |
| **카메라** | MIPI CSI-2 x1 |
| **디스플레이** | HDMI 2.0, eDP 1.4 |
| **USB** | USB 3.0 x4 |
| **네트워크** | 기가비트 이더넷 |
| **전력** | 5W / 10W 모드 |
| **크기** | 100 x 80 x 29 mm |

### 1.3 Jetson Nano vs Jetson Orin Nano 비교

| 항목 | Jetson Nano | Jetson Orin Nano |
|------|-------------|------------------|
| AI 성능 | 472 GFLOPS | 40 TOPS |
| GPU | 128-core Maxwell | 1024-core Ampere |
| CPU | A57 (4코어) | A78AE (6코어) |
| 메모리 | 4GB | 8GB |
| 가격 | ~15만원 | ~70만원 |
| 용도 | 학습/프로토타입 | 상용 제품 |

---

## 2. 필요 장비

### 2.1 필수 장비

| 장비 | 사양 | 예상 가격 |
|------|------|-----------|
| Jetson Nano 개발자 키트 | B01 버전 권장 | 15~20만원 |
| microSD 카드 | 64GB 이상, UHS-1, Class 10 | 1~2만원 |
| DC 전원 어댑터 | 5V/4A, 배럴잭 (5.5x2.1mm) | 1만원 |
| USB 키보드 | 일반 USB 키보드 | - |
| USB 마우스 | 일반 USB 마우스 | - |
| HDMI 케이블 | HDMI 2.0 | 1만원 |
| 모니터 | HDMI 입력 지원 | - |
| 이더넷 케이블 | Cat5e 이상 | 5천원 |

### 2.2 권장 장비

| 장비 | 용도 | 예상 가격 |
|------|------|-----------|
| USB WiFi 동글 | 무선 네트워크 (내장 WiFi 없음) | 1~2만원 |
| 방열 팬 | 고부하 작업 시 냉각 | 1만원 |
| 케이스 | 보호 및 방열 | 2~3만원 |
| USB 카메라 | 영상 입력 | 2~5만원 |
| CSI 카메라 | Raspberry Pi Camera v2 호환 | 3~5만원 |

### 2.3 추천 SD 카드

```
추천 제품:
- SanDisk Extreme 64GB (읽기 170MB/s)
- Samsung EVO Plus 64GB (읽기 130MB/s)
- SanDisk Ultra 128GB (읽기 120MB/s)

주의: 저가형 SD 카드는 속도가 느려 부팅/실행이 매우 느림
```

---

## 3. SD 카드 이미지 설치

### 3.1 JetPack SDK 다운로드

**다운로드 주소:**
```
https://developer.nvidia.com/embedded/jetpack-archive
```

**JetPack에 포함된 소프트웨어:**
- Ubuntu 18.04 또는 20.04 기반 Linux
- CUDA Toolkit
- cuDNN (Deep Neural Network 라이브러리)
- TensorRT (추론 최적화)
- OpenCV (컴퓨터 비전)
- VisionWorks
- Multimedia API

### 3.2 Windows에서 SD 카드 굽기

**방법 1: balenaEtcher 사용 (추천)**

```
1. https://www.balena.io/etcher/ 접속
2. balenaEtcher 다운로드 및 설치
3. 프로그램 실행
4. "Flash from file" 클릭 → 다운로드한 .zip 또는 .img 선택
5. "Select target" 클릭 → SD 카드 드라이브 선택
6. "Flash!" 클릭
7. 완료까지 약 10~20분 대기
8. "Flash Complete!" 메시지 확인 후 SD 카드 제거
```

**방법 2: Win32 Disk Imager 사용**

```
1. https://sourceforge.net/projects/win32diskimager/ 다운로드
2. .img 파일 압축 해제 (ZIP인 경우)
3. Win32 Disk Imager 실행
4. Image File: 압축 해제한 .img 파일 선택
5. Device: SD 카드 드라이브 선택
6. Write 버튼 클릭
7. 완료 대기
```

### 3.3 macOS에서 SD 카드 굽기

```bash
# 1. SD 카드 장치명 확인
diskutil list

# 출력 예시:
# /dev/disk4 (external, physical):
#    #:     TYPE NAME          SIZE
#    0:     FDisk_partition_scheme   *64.0 GB

# 2. SD 카드 마운트 해제
diskutil unmountDisk /dev/disk4

# 3. 이미지 쓰기 (시간 소요)
sudo dd if=jetson-nano-jp461-sd-card-image.img of=/dev/rdisk4 bs=1m status=progress

# 4. 완료 후 안전하게 제거
diskutil eject /dev/disk4
```

### 3.4 Linux에서 SD 카드 굽기

```bash
# 1. SD 카드 장치명 확인
lsblk

# 출력 예시:
# sdb           8:16   1  59.5G  0 disk
# └─sdb1        8:17   1  59.5G  0 part /media/user/SD

# 2. 마운트 해제
sudo umount /dev/sdb1

# 3. 이미지 쓰기
sudo dd if=jetson-nano-jp461-sd-card-image.img of=/dev/sdb bs=4M status=progress

# 4. 쓰기 완료 대기
sync

# 5. SD 카드 제거
```

---

## 4. 하드웨어 조립

### 4.1 Jetson Nano 포트 배치

```
            ┌─────────────────────────────────────────┐
            │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  ← GPIO 40핀     │
            │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○                  │
            │                                         │
  USB 3.0 → │ ▓▓▓▓ │                    │ HDMI │ ← HDMI
  (4개)     │ ▓▓▓▓ │      [히트싱크]    │      │
            │ ▓▓▓▓ │                    ├──────┤
            │ ▓▓▓▓ │                    │DP    │ ← DisplayPort
            │                                         │
            │  │GbE│  │DC│  │USB│       │CAM│        │
            └──┴───┴──┴──┴──┴───┴───────┴───┴────────┘
                ↑      ↑     ↑           ↑
             이더넷  전원  Micro   CSI 카메라
                    (5V)   USB
```

### 4.2 전원 설정 (매우 중요!)

Jetson Nano는 두 가지 전원 방식을 지원합니다:

```
┌────────────────────────────────────────────────────────┐
│                    전원 선택 점퍼 (J48)                 │
├────────────────────────────────────────────────────────┤
│                                                        │
│   J48 점퍼 위치 (히트싱크 옆)                          │
│                                                        │
│   ┌───┐                                                │
│   │○ ○│ ← 점퍼 없음: Micro-USB 전원 사용 (5V/2A)      │
│   └───┘    - 간단하지만 전력 부족 가능                 │
│            - 저전력 작업에만 권장                      │
│                                                        │
│   ┌───┐                                                │
│   │●━●│ ← 점퍼 연결: DC 배럴잭 전원 사용 (5V/4A)      │
│   └───┘    - 안정적인 전력 공급                        │
│            - AI 추론, 카메라 사용 시 필수              │
│                                                        │
│   ⚠️  권장: DC 배럴잭 (5V/4A) 사용                     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### 4.3 조립 순서

```
순서대로 진행하세요:

[1단계] microSD 카드 삽입
        - Jetson Nano 뒷면(바닥)의 슬롯에 삽입
        - 딸깍 소리가 날 때까지 밀어 넣기
        - 금속 접점이 위를 향하도록

[2단계] J48 점퍼 설정
        - DC 전원 사용 시: 점퍼 연결
        - Micro-USB 사용 시: 점퍼 제거

[3단계] HDMI 케이블 연결
        - 모니터와 Jetson Nano HDMI 포트 연결

[4단계] USB 장치 연결
        - 키보드, 마우스 연결 (USB 포트 4개)

[5단계] 네트워크 연결
        - 이더넷 케이블 연결 (권장)
        - 또는 USB WiFi 동글 연결

[6단계] 전원 연결 (마지막!)
        - DC 어댑터 또는 Micro-USB 연결
        - 녹색 LED 점등 확인
        - 자동으로 부팅 시작
```

### 4.4 방열 팬 연결 (선택)

```
팬 커넥터 위치: J15 (4핀 PWM)

핀 배치:
┌─────────────────┐
│ 1: GND (검정)   │
│ 2: +5V (빨강)   │
│ 3: PWM (파랑)   │
│ 4: TACH (노랑)  │
└─────────────────┘

- 5V/0.2A 이하의 40mm 팬 사용
- PWM 제어로 자동 속도 조절
```

---

## 5. 초기 설정 (첫 부팅)

### 5.1 부팅 과정

```
전원 연결 후:

1. 녹색 LED 점등
2. NVIDIA 로고 표시 (약 30초)
3. Ubuntu 설정 화면 시작
```

### 5.2 초기 설정 화면

```
┌─────────────────────────────────────────────────────────┐
│              NVIDIA Jetson Nano Initial Setup           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [1] License Agreement                                  │
│      → "I accept the terms" 체크                        │
│      → Continue                                         │
│                                                         │
│  [2] Language                                           │
│      → English (권장) 또는 한국어                       │
│      → Continue                                         │
│                                                         │
│  [3] Keyboard Layout                                    │
│      → Korean (101/104 key compatible)                  │
│      → Continue                                         │
│                                                         │
│  [4] Time Zone                                          │
│      → Asia/Seoul                                       │
│      → Continue                                         │
│                                                         │
│  [5] User Account                                       │
│      → Name: jetson (원하는 이름)                       │
│      → Computer name: jetson-nano                       │
│      → Username: jetson                                 │
│      → Password: ********                               │
│      → Continue                                         │
│                                                         │
│  [6] APP Partition Size                                 │
│      → 기본값 사용 (최대 크기)                          │
│      → Continue                                         │
│                                                         │
│  [7] Network Configuration                              │
│      → 이더넷: 자동 연결                                │
│      → WiFi: 동글 연결 시 설정 가능                     │
│                                                         │
│  [8] 설정 완료                                          │
│      → 시스템 재부팅                                    │
│      → 데스크톱 환경 진입                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 5.3 첫 로그인 후 확인사항

```bash
# 터미널 열기: Ctrl + Alt + T

# 1. 시스템 정보 확인
cat /etc/nv_tegra_release
# 출력: # R32 (release), REVISION: 7.1, ...

# 2. Ubuntu 버전 확인
lsb_release -a
# 출력: Ubuntu 18.04.6 LTS

# 3. CUDA 버전 확인
nvcc --version
# 출력: Cuda compilation tools, release 10.2, V10.2.89

# 4. 디스크 용량 확인
df -h
# 출력: /dev/mmcblk0p1  59G  12G  45G  22% /

# 5. 메모리 확인
free -h
# 출력: Mem: 3.9Gi  1.2Gi  2.0Gi  ...

# 6. IP 주소 확인
hostname -I
# 출력: 192.168.0.100
```

---

## 6. 기본 명령어

### 6.1 시스템 모니터링

#### tegrastats (GPU/CPU 모니터)

```bash
# 실시간 시스템 상태 확인
tegrastats

# 출력 예시:
# RAM 1456/3956MB (lfb 166x4MB) SWAP 0/1982MB (cached 0MB)
# CPU [25%@1479,15%@1479,12%@1479,18%@1479]
# EMC_FREQ 0% GR3D_FREQ 0% PLL@35C CPU@37C PMIC@100C
# GPU@36.5C AO@42C thermal@36.75C

# 항목 설명:
# RAM: 메모리 사용량
# CPU: 각 코어 사용률 및 클럭
# GR3D_FREQ: GPU 사용률
# CPU@37C: CPU 온도
# GPU@36.5C: GPU 온도
```

#### jtop (향상된 모니터링 도구)

```bash
# 설치
sudo apt update
sudo pip3 install jetson-stats

# 재부팅 필요
sudo reboot

# 실행
sudo jtop

# 기능:
# - GPU/CPU/메모리 사용량 그래프
# - 전력 소비량
# - 온도 모니터링
# - 팬 속도 제어
# - 프로세스 목록
```

### 6.2 전력 모드 관리

```bash
# 현재 전력 모드 확인
sudo nvpmodel -q

# 출력:
# NV Power Mode: MAXN (기본)
# 0

# 전력 모드 목록
# ┌──────┬──────────┬────────┬─────────┐
# │ 모드 │ 이름     │ 전력   │ CPU코어 │
# ├──────┼──────────┼────────┼─────────┤
# │  0   │ MAXN     │ 10W    │ 4코어   │
# │  1   │ 5W       │ 5W     │ 2코어   │
# └──────┴──────────┴────────┴─────────┘

# 10W 모드 설정 (최대 성능)
sudo nvpmodel -m 0

# 5W 모드 설정 (저전력)
sudo nvpmodel -m 1

# CPU/GPU 클럭 최대로 고정
sudo jetson_clocks

# 클럭 상태 확인
sudo jetson_clocks --show
```

### 6.3 소프트웨어 업데이트

```bash
# 패키지 목록 업데이트
sudo apt update

# 설치된 패키지 업그레이드
sudo apt upgrade -y

# 불필요한 패키지 제거
sudo apt autoremove -y

# 시스템 전체 업그레이드 (주의!)
sudo apt dist-upgrade -y
```

### 6.4 기본 유틸리티

```bash
# 파일 탐색기 (GUI)
nautilus .

# 텍스트 편집기 (GUI)
gedit filename.txt

# 터미널 텍스트 편집기
nano filename.txt

# 프로세스 확인
htop

# 네트워크 상태
ifconfig
ip addr

# 디스크 사용량
df -h

# 폴더 크기
du -sh *
```

---

## 7. 개발 환경 설정

### 7.1 Python 환경

```bash
# Python 버전 확인
python3 --version
# Python 3.6.9 (JetPack 4.x 기본)

# pip 업그레이드
sudo apt update
sudo apt install python3-pip python3-dev -y
pip3 install --upgrade pip

# 가상환경 도구 설치
sudo apt install python3-venv -y

# 가상환경 생성
python3 -m venv ~/venv/jetson
source ~/venv/jetson/bin/activate

# 기본 패키지 설치
pip3 install numpy
pip3 install pandas
pip3 install matplotlib
pip3 install scipy
pip3 install scikit-learn
```

### 7.2 Jupyter Notebook 설치

```bash
# Jupyter 설치
pip3 install jupyter jupyterlab

# Jupyter 설정 파일 생성
jupyter notebook --generate-config

# 원격 접속을 위한 설정
nano ~/.jupyter/jupyter_notebook_config.py

# 다음 내용 추가:
# c.NotebookApp.ip = '0.0.0.0'
# c.NotebookApp.port = 8888
# c.NotebookApp.open_browser = False
# c.NotebookApp.allow_remote_access = True

# 비밀번호 설정
jupyter notebook password

# Jupyter 실행
jupyter notebook --ip=0.0.0.0 --port=8888

# 브라우저에서 접속:
# http://[Jetson_IP]:8888
```

### 7.3 TensorFlow 설치

```bash
# TensorFlow for Jetson (공식 빌드)
# JetPack 버전에 맞는 TensorFlow 설치

# 의존성 패키지 설치
sudo apt install -y libhdf5-serial-dev hdf5-tools libhdf5-dev
sudo apt install -y zlib1g-dev zip libjpeg8-dev liblapack-dev
sudo apt install -y libblas-dev gfortran

# pip 패키지 설치
pip3 install -U pip testresources setuptools==65.5.0

# TensorFlow 설치 (JetPack 4.6용)
pip3 install --extra-index-url https://developer.download.nvidia.com/compute/redist/jp/v46 tensorflow==2.6.2+nv21.12

# 설치 확인
python3 -c "import tensorflow as tf; print(tf.__version__)"
python3 -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"
```

### 7.4 PyTorch 설치

```bash
# PyTorch for Jetson
# NVIDIA 포럼에서 wheel 파일 다운로드 필요

# 의존성 설치
sudo apt install -y libopenblas-base libopenmpi-dev libomp-dev

# PyTorch wheel 다운로드 (JetPack 4.6, Python 3.6용)
wget https://nvidia.box.com/shared/static/fjtbno0vpo676a25cgvuqc1wty0fkkg6.whl -O torch-1.10.0-cp36-cp36m-linux_aarch64.whl

# 설치
pip3 install torch-1.10.0-cp36-cp36m-linux_aarch64.whl

# torchvision 설치 (소스에서 빌드)
sudo apt install -y libjpeg-dev zlib1g-dev libpython3-dev libavcodec-dev libavformat-dev libswscale-dev
git clone --branch v0.11.1 https://github.com/pytorch/vision torchvision
cd torchvision
pip3 install -e .

# 설치 확인
python3 -c "import torch; print(torch.__version__); print(torch.cuda.is_available())"
```

### 7.5 OpenCV 확인 및 업그레이드

```bash
# 기본 설치된 OpenCV 확인
python3 -c "import cv2; print(cv2.__version__)"

# CUDA 지원 확인
python3 -c "import cv2; print(cv2.cuda.getCudaEnabledDeviceCount())"

# OpenCV 추가 모듈 (contrib)
pip3 install opencv-contrib-python
```

---

## 8. 카메라 테스트

### 8.1 CSI 카메라 (Raspberry Pi Camera v2)

```bash
# 카메라 연결 확인
ls /dev/video*
# /dev/video0 이 나타나야 함

# GStreamer로 카메라 테스트
gst-launch-1.0 nvarguscamerasrc ! \
  'video/x-raw(memory:NVMM),width=1280,height=720,framerate=30/1,format=NV12' ! \
  nvvidconv ! \
  'video/x-raw,width=640,height=480' ! \
  nvvidconv ! \
  nvegltransform ! \
  nveglglessink

# nvgstcapture 유틸리티 사용
nvgstcapture-1.0

# 사진 촬영: j 키
# 녹화 시작/중지: 1 키
# 종료: q 키
```

### 8.2 USB 웹캠

```bash
# USB 카메라 연결 확인
lsusb
# Bus 001 Device 003: ID 046d:0825 Logitech, Inc. Webcam C270

# 비디오 장치 확인
v4l2-ctl --list-devices

# 지원 해상도 확인
v4l2-ctl -d /dev/video1 --list-formats-ext
```

### 8.3 Python에서 카메라 사용

```python
#!/usr/bin/env python3
# camera_test.py

import cv2

# USB 카메라 (보통 /dev/video1)
# cap = cv2.VideoCapture(1)

# CSI 카메라 (GStreamer 파이프라인)
gst_pipeline = (
    "nvarguscamerasrc ! "
    "video/x-raw(memory:NVMM), width=1280, height=720, format=NV12, framerate=30/1 ! "
    "nvvidconv ! "
    "video/x-raw, format=BGRx ! "
    "videoconvert ! "
    "video/x-raw, format=BGR ! "
    "appsink"
)
cap = cv2.VideoCapture(gst_pipeline, cv2.CAP_GSTREAMER)

if not cap.isOpened():
    print("카메라를 열 수 없습니다!")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        print("프레임을 읽을 수 없습니다!")
        break

    # FPS 표시
    cv2.putText(frame, "Press 'q' to quit", (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow('Camera Test', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

```bash
# 실행
python3 camera_test.py
```

---

## 9. 간단한 AI 예제

### 9.1 이미지 분류 (ResNet-18)

```python
#!/usr/bin/env python3
# image_classification.py

import torch
import torchvision.transforms as transforms
from torchvision.models import resnet18
from PIL import Image
import urllib.request

# ImageNet 클래스 레이블 다운로드
url = "https://raw.githubusercontent.com/pytorch/hub/master/imagenet_classes.txt"
urllib.request.urlretrieve(url, "imagenet_classes.txt")

with open("imagenet_classes.txt", "r") as f:
    categories = [s.strip() for s in f.readlines()]

# 모델 로드
print("모델 로딩 중...")
model = resnet18(pretrained=True)
model.eval()
model.cuda()  # GPU 사용
print("모델 로딩 완료!")

# 이미지 전처리
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# 테스트 이미지 다운로드
urllib.request.urlretrieve(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "test_cat.jpg"
)

# 이미지 로드 및 분류
img = Image.open('test_cat.jpg')
img_tensor = transform(img).unsqueeze(0).cuda()

# 추론
with torch.no_grad():
    output = model(img_tensor)
    probabilities = torch.nn.functional.softmax(output[0], dim=0)

# Top 5 결과 출력
top5_prob, top5_idx = torch.topk(probabilities, 5)
print("\n=== 분류 결과 ===")
for i in range(5):
    print(f"{i+1}. {categories[top5_idx[i]]}: {top5_prob[i].item()*100:.2f}%")
```

### 9.2 실시간 얼굴 감지

```python
#!/usr/bin/env python3
# face_detection.py

import cv2

# Haar Cascade 얼굴 검출기 로드
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
)

# 카메라 열기
cap = cv2.VideoCapture(0)  # USB 카메라

if not cap.isOpened():
    print("카메라를 열 수 없습니다!")
    exit()

print("얼굴 감지 시작... 'q'를 눌러 종료")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # 그레이스케일 변환
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # 얼굴 검출
    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30)
    )

    # 검출된 얼굴에 사각형 그리기
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
        cv2.putText(frame, "Face", (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    # 얼굴 수 표시
    cv2.putText(frame, f"Faces: {len(faces)}", (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

    cv2.imshow('Face Detection', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

### 9.3 YOLO 객체 감지 (TensorRT 최적화)

```bash
# jetson-inference 설치 (NVIDIA 공식 예제)
cd ~
git clone --recursive https://github.com/dusty-nv/jetson-inference
cd jetson-inference
mkdir build && cd build
cmake ..
make -j$(nproc)
sudo make install
sudo ldconfig

# 객체 감지 실행
detectnet /dev/video0  # USB 카메라
detectnet csi://0      # CSI 카메라
```

---

## 10. 원격 접속 설정

### 10.1 SSH 설정

```bash
# SSH 서버 상태 확인
sudo systemctl status ssh

# SSH 서버 시작 및 자동 시작 설정
sudo systemctl start ssh
sudo systemctl enable ssh

# 방화벽 허용 (필요시)
sudo ufw allow ssh

# IP 주소 확인
hostname -I
# 예: 192.168.0.100

# 다른 컴퓨터에서 접속
# ssh jetson@192.168.0.100
```

### 10.2 파일 전송 (SCP/SFTP)

```bash
# Windows → Jetson (파일 업로드)
scp C:\Users\user\file.txt jetson@192.168.0.100:~/

# Jetson → Windows (파일 다운로드)
scp jetson@192.168.0.100:~/result.txt C:\Users\user\

# 폴더 전체 전송 (-r 옵션)
scp -r jetson@192.168.0.100:~/project C:\Users\user\

# SFTP 접속
sftp jetson@192.168.0.100
# 명령어: put, get, ls, cd, lcd, pwd, lpwd
```

### 10.3 VNC 원격 데스크톱

```bash
# Vino VNC 서버 (기본 설치됨)
# 설정 → Sharing → Screen Sharing 활성화

# 또는 x11vnc 설치
sudo apt install x11vnc -y

# VNC 서버 시작
x11vnc -display :0 -forever -bg -rfbport 5900

# 자동 시작 설정
mkdir -p ~/.config/autostart
cat > ~/.config/autostart/x11vnc.desktop << 'EOF'
[Desktop Entry]
Type=Application
Name=X11VNC
Exec=x11vnc -display :0 -forever -bg -rfbport 5900
EOF

# VNC 클라이언트로 접속
# 주소: 192.168.0.100:5900
# 클라이언트: RealVNC, TightVNC, Remmina 등
```

### 10.4 NoMachine (권장)

```bash
# NoMachine 다운로드 (ARM64 버전)
wget https://download.nomachine.com/download/8.2/Arm/nomachine_8.2.3_3_arm64.deb

# 설치
sudo dpkg -i nomachine_8.2.3_3_arm64.deb

# 클라이언트 PC에서도 NoMachine 설치 후 접속
# 장점: 빠른 속도, CUDA 렌더링 지원
```

---

## 11. 유용한 팁

### 11.1 스왑 메모리 증가

```bash
# 현재 스왑 확인
free -h

# 4GB RAM으로는 부족할 수 있음
# 스왑 파일 생성 (4GB)
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 영구 적용
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 확인
free -h
# Swap:         4.0Gi       0B       4.0Gi
```

### 11.2 SD 카드 수명 연장

```bash
# 불필요한 로그 비활성화
sudo systemctl disable rsyslog

# /tmp를 RAM에 마운트
echo 'tmpfs /tmp tmpfs defaults,noatime,nosuid,size=100m 0 0' | sudo tee -a /etc/fstab

# 브라우저 캐시를 RAM에
mkdir -p /tmp/chromium-cache
# 브라우저 설정에서 캐시 위치 변경
```

### 11.3 자동 시작 프로그램 설정

```bash
# systemd 서비스 생성
sudo nano /etc/systemd/system/myapp.service
```

```ini
[Unit]
Description=My AI Application
After=network.target

[Service]
Type=simple
User=jetson
WorkingDirectory=/home/jetson/myapp
ExecStart=/usr/bin/python3 /home/jetson/myapp/main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
# 서비스 활성화 및 시작
sudo systemctl daemon-reload
sudo systemctl enable myapp.service
sudo systemctl start myapp.service

# 상태 확인
sudo systemctl status myapp.service

# 로그 확인
sudo journalctl -u myapp.service -f
```

### 11.4 GPIO 사용

```python
#!/usr/bin/env python3
# gpio_example.py

import Jetson.GPIO as GPIO
import time

# BCM 핀 번호 사용
GPIO.setmode(GPIO.BCM)

# 출력 핀 설정 (LED)
LED_PIN = 18
GPIO.setup(LED_PIN, GPIO.OUT)

# 입력 핀 설정 (버튼)
BUTTON_PIN = 24
GPIO.setup(BUTTON_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

try:
    while True:
        # 버튼 상태 읽기
        if GPIO.input(BUTTON_PIN) == GPIO.LOW:
            print("버튼 눌림!")
            GPIO.output(LED_PIN, GPIO.HIGH)
        else:
            GPIO.output(LED_PIN, GPIO.LOW)
        time.sleep(0.1)

except KeyboardInterrupt:
    print("종료")
finally:
    GPIO.cleanup()
```

### 11.5 유용한 명령어 모음

```bash
# 시스템 정보
cat /etc/nv_tegra_release     # JetPack 버전
nvcc --version                 # CUDA 버전
python3 -c "import torch; print(torch.__version__)"  # PyTorch 버전
python3 -c "import tensorflow as tf; print(tf.__version__)"  # TF 버전

# 하드웨어 정보
lscpu                          # CPU 정보
lsusb                          # USB 장치
lspci                          # PCI 장치
vcgencmd measure_temp          # 온도 (Raspberry Pi 명령, Jetson은 tegrastats 사용)

# 네트워크
hostname -I                    # IP 주소
iwconfig                       # WiFi 상태
ping google.com               # 네트워크 테스트

# 프로세스 관리
ps aux | grep python          # Python 프로세스 확인
kill -9 [PID]                 # 프로세스 강제 종료
pkill -f "python3 myapp.py"   # 이름으로 종료

# 디스크 관리
df -h                          # 디스크 사용량
du -sh ~/                      # 홈 디렉토리 크기
ncdu                          # 인터랙티브 디스크 분석
```

---

## 12. 문제 해결

### 12.1 일반적인 문제

| 증상 | 원인 | 해결 방법 |
|------|------|-----------|
| 부팅 안됨 | SD 카드 문제 | SD 카드 다시 플래시, 다른 SD 카드 시도 |
| 부팅 안됨 | 전원 부족 | DC 5V/4A 어댑터 사용, J48 점퍼 확인 |
| 화면 안나옴 | HDMI 연결 | 케이블 확인, 다른 모니터 시도 |
| 느림/멈춤 | 메모리 부족 | 스왑 추가, 불필요한 프로그램 종료 |
| 느림/멈춤 | 전력 모드 | `sudo nvpmodel -m 0` 으로 10W 모드 설정 |
| 과열 | 냉각 부족 | 팬 설치, 방열판 확인, 통풍 개선 |
| WiFi 안됨 | 내장 WiFi 없음 | USB WiFi 동글 구매 |
| CUDA 오류 | 버전 불일치 | JetPack과 패키지 버전 호환성 확인 |
| 카메라 안됨 | 드라이버/연결 | `/dev/video*` 확인, 케이블 재연결 |

### 12.2 메모리 부족 해결

```bash
# 1. 현재 메모리 상태 확인
free -h

# 2. 메모리 많이 사용하는 프로세스 확인
ps aux --sort=-%mem | head

# 3. 불필요한 서비스 중지
sudo systemctl stop bluetooth
sudo systemctl stop cups

# 4. GUI 없이 부팅 (메모리 절약)
sudo systemctl set-default multi-user.target
# GUI 복구: sudo systemctl set-default graphical.target

# 5. 스왑 추가 (위 11.1 참조)
```

### 12.3 SD 카드 속도 문제

```bash
# SD 카드 속도 테스트
# 쓰기 속도
dd if=/dev/zero of=~/test.tmp bs=1M count=256 conv=fdatasync

# 읽기 속도
dd if=~/test.tmp of=/dev/null bs=1M count=256

# 테스트 파일 삭제
rm ~/test.tmp

# 권장 속도:
# 읽기: 80MB/s 이상
# 쓰기: 30MB/s 이상
```

### 12.4 CUDA 문제 해결

```bash
# CUDA 경로 확인
echo $PATH | grep cuda
echo $LD_LIBRARY_PATH | grep cuda

# 경로 설정 (.bashrc에 추가)
export PATH=/usr/local/cuda/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH

# CUDA 샘플 테스트
cd /usr/local/cuda/samples/1_Utilities/deviceQuery
sudo make
./deviceQuery
# Result = PASS 확인
```

---

## 부록: 참고 자료

### 공식 문서

- **시작 가이드**: https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit
- **JetPack SDK**: https://developer.nvidia.com/embedded/jetpack
- **개발자 포럼**: https://forums.developer.nvidia.com/c/agx-autonomous-machines/jetson-embedded-systems/jetson-nano/

### 유용한 GitHub 저장소

- **jetson-inference**: https://github.com/dusty-nv/jetson-inference
- **jetson-utils**: https://github.com/dusty-nv/jetson-utils
- **JetBot**: https://github.com/NVIDIA-AI-IOT/jetbot

### 한국어 커뮤니티

- **네이버 카페**: NVIDIA Jetson 사용자 모임
- **유튜브**: "Jetson Nano 강좌" 검색

---

*작성일: 2026-01-15*
*버전: 1.0*
*대상 JetPack: 4.6.x*
