# Jetson Nano B01 개발 환경 사양서

**작성일:** 2026-01-19
**장치:** NVIDIA Jetson Nano Developer Kit B01

---

## 1. 하드웨어 사양

### 기본 정보

| 항목 | 사양 |
|------|------|
| **모델** | NVIDIA Jetson Nano Developer Kit B01 |
| **GPU** | NVIDIA Maxwell, 128 CUDA cores |
| **CPU** | ARM Cortex-A57 Quad-core @ 1.43GHz |
| **RAM** | 4GB LPDDR4 |
| **저장장치** | 16GB eMMC (또는 microSD) |
| **전원** | 5V/4A (Barrel Jack) 또는 Micro-USB |

### GPU 세부 사양

| 항목 | 사양 |
|------|------|
| **아키텍처** | Maxwell |
| **CUDA Cores** | 128 |
| **메모리** | 4GB (CPU와 공유) |
| **FP16 성능** | 472 GFLOPs |
| **FP32 성능** | 236 GFLOPs |

---

## 2. 소프트웨어 환경

### 운영체제

| 항목 | 버전 |
|------|------|
| **JetPack** | R32.7.6 (JetPack 4.6.x) |
| **Ubuntu** | 18.04.6 LTS (Bionic) |
| **Kernel** | 4.9.337-tegra |
| **아키텍처** | aarch64 (ARM64) |

### 개발 환경 (설치 완료)

| 소프트웨어 | 버전 | 용도 |
|-----------|------|------|
| **CUDA Toolkit** | 10.2.300 | GPU 연산 |
| **cuDNN** | 8.2.1 | 딥러닝 가속 |
| **PyTorch** | 1.10.0 | AI 프레임워크 |
| **torchvision** | 0.11.1 | 이미지 처리 (빌드 중) |
| **OpenCV** | 3.2.0 | 컴퓨터 비전 |
| **NumPy** | 1.13.3 | 수치 계산 |
| **Matplotlib** | 2.1.1 | 시각화 |
| **Python** | 3.6.9 | 기본 언어 |
| **Node.js** | 16.20.2 (nvm) | API 서버용 |
| **npm** | 8.19.4 | 패키지 관리 |

---

## 3. 네트워크 정보

| 항목 | 값 |
|------|-----|
| **IP 주소** | 192.168.0.33 |
| **호스트명** | yahboom |
| **SSH 사용자** | jetson |
| **SSH 비밀번호** | yahboom |

### SSH 접속 명령어

```bash
ssh jetson@192.168.0.33
# 비밀번호: yahboom
```

---

## 4. 리소스 상태

### 메모리

| 항목 | 용량 |
|------|------|
| **총 RAM** | 3.9GB |
| **사용 가능** | ~2.3GB |
| **Swap** | 1.9GB (zram x4) |

### 저장장치

| 장치 | 용량 | 마운트 |
|------|------|--------|
| **eMMC** | 14GB (1.9GB 여유) | `/` |
| **USB (HKS)** | 30GB (17GB 여유) | `/media/jetson/HKS` |

### 온도 (정상 상태)

- GPU: ~46.5°C
- CPU: ~38.5°C

---

## 5. AI 성능 및 제한사항

### 성능

| 작업 | 예상 성능 |
|------|----------|
| 이미지 분류 (MobileNet) | ~25 FPS |
| 객체 탐지 (YOLOv5 nano) | ~10-15 FPS |
| 번호판 인식 | ~5-10 FPS |

### 제한사항

| 항목 | 제한 | 대안 |
|------|------|------|
| **glibc** | 2.27 (고정) | Node.js 18+ 설치 불가 |
| **Python** | 3.6 (시스템) | virtualenv 사용 가능 |
| **메모리** | 4GB | Swap 활용, 경량 모델 사용 |
| **저장공간** | 제한적 | USB/SSD 외장 스토리지 활용 |

---

## 6. 프로젝트 폴더 구조

```
/home/jetson/
├── ai-projects/          # USB 심볼릭 링크
│   └── torchvision/      # torchvision 소스 (빌드 중)
├── .nvm/                 # Node Version Manager
└── .local/               # Python 패키지

/media/jetson/HKS/        # USB 드라이브 (30GB)
├── ai-projects/          # AI 프로젝트 작업 공간
└── tmp/                  # 빌드 임시 폴더
```

---

## 7. 환경 변수 설정 (~/.bashrc)

```bash
# CUDA 환경 변수
export PATH=/usr/local/cuda/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH

# NVM (Node Version Manager)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

---

## 8. 유용한 명령어

### 시스템 정보

```bash
# JetPack 버전 확인
cat /etc/nv_tegra_release

# GPU 정보
cat /proc/device-tree/model

# CUDA 버전
nvcc --version

# 온도 확인
cat /sys/devices/virtual/thermal/thermal_zone*/temp
```

### AI 환경 테스트

```bash
# PyTorch CUDA 테스트
python3 -c "import torch; print(torch.cuda.is_available())"

# GPU 메모리 확인
python3 -c "import torch; print(torch.cuda.get_device_properties(0))"
```

### 서비스 관리

```bash
# 메모리 확인
free -h

# 디스크 확인
df -h

# USB 장치 확인
lsblk
```

---

## 9. AI 학습 프로젝트 용도

### 가능한 프로젝트

1. **품질 검사 시스템**
   - 생산품 합격/불합격 분류
   - 불량품 검출 (스크래치, 결함)

2. **객체 분류**
   - 연필 vs 만년필 구분
   - 제품 종류 분류

3. **번호판 인식 (ANPR)**
   - YOLOv5 nano + OCR
   - 실시간 차량 번호 인식

4. **엣지 AI 학습**
   - TinyML 개념 이해
   - 모델 최적화 (TensorRT)

### 권장 모델

| 용도 | 권장 모델 | 이유 |
|------|----------|------|
| 분류 | MobileNetV2 | 경량, 빠름 |
| 탐지 | YOLOv5 nano/small | 메모리 효율적 |
| OCR | EasyOCR, PaddleOCR | Python 지원 |

---

## 10. 참고 자료

- [NVIDIA Jetson Nano 공식 문서](https://developer.nvidia.com/embedded/jetson-nano)
- [JetPack SDK](https://developer.nvidia.com/embedded/jetpack)
- [PyTorch for Jetson](https://forums.developer.nvidia.com/t/pytorch-for-jetson/)

---

*이 문서는 2026-01-19 기준으로 작성되었습니다.*
