# Day 1: Jetson 소개 및 JetPack 설치

## 1. Jetson이란?

### 1.1 Jetson은 작은 슈퍼컴퓨터

Jetson은 NVIDIA가 만든 **작은 컴퓨터**입니다.
손바닥 크기지만, 인공지능(AI)을 실행할 수 있는 강력한 GPU가 들어있습니다.

```
┌─────────────────────────────────────┐
│         일반 컴퓨터                  │
│  ┌─────┐    ┌─────┐                │
│  │ CPU │    │ GPU │  ← 따로 있음    │
│  └─────┘    └─────┘                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│           Jetson                    │
│  ┌───────────────┐                 │
│  │   CPU + GPU   │  ← 하나에 통합!  │
│  │   (메모리공유) │                 │
│  └───────────────┘                 │
└─────────────────────────────────────┘
```

### 1.2 왜 Jetson을 사용하나요?

| 특징 | 설명 |
|------|------|
| **작고 가벼움** | 로봇, 드론에 탑재 가능 |
| **저전력** | 5~15W로 동작 (노트북: 45W, 데스크톱: 300W) |
| **AI 가속** | GPU로 AI 연산을 빠르게 처리 |
| **가격** | 데스크톱 GPU보다 저렴 |

### 1.3 Jetson 종류

```
성능 낮음 ◀─────────────────────────▶ 성능 높음

Nano    →    Orin Nano    →    Orin NX    →    AGX Orin
($149)       ($199~)          ($399~)         ($999~)
입문용        입문/중급         중급/고급        전문가용
```

---

## 2. JetPack이란?

JetPack은 Jetson을 위한 **운영체제 + 개발도구 모음**입니다.

### 2.1 JetPack에 포함된 것들

```
JetPack
├── Ubuntu Linux (운영체제)
├── CUDA Toolkit (GPU 프로그래밍)
├── cuDNN (딥러닝 가속)
├── TensorRT (AI 추론 최적화)
└── OpenCV (이미지 처리)
```

### 2.2 현재 버전

- JetPack 6.x: 최신 버전 (Orin 시리즈용)
- JetPack 4.x: Nano용

---

## 3. JetPack 설치하기

### 3.1 방법 1: SD 카드 이미지 (초보자 권장)

**Step 1: 이미지 다운로드**

1. [NVIDIA 다운로드 페이지](https://developer.nvidia.com/embedded/jetpack) 접속
2. 보유한 Jetson 모델 선택
3. SD Card Image 다운로드 (약 15GB)

**Step 2: SD 카드에 굽기**

1. [balenaEtcher](https://www.balena.io/etcher/) 다운로드 및 설치
2. balenaEtcher 실행
3. 다운로드한 이미지 선택
4. SD 카드 선택
5. "Flash!" 클릭 (약 20분 소요)

```
┌─────────────────────────────────────┐
│         balenaEtcher                │
│                                     │
│  [이미지 선택] → [SD카드] → [Flash!]│
│                                     │
└─────────────────────────────────────┘
```

**Step 3: Jetson 부팅**

1. SD 카드를 Jetson에 삽입
2. 모니터, 키보드, 마우스 연결
3. 전원 연결
4. 초기 설정 진행 (언어, 사용자명, 비밀번호)

### 3.2 방법 2: SDK Manager (고급)

PC에서 USB로 Jetson에 직접 설치하는 방법입니다.
(Ubuntu PC 필요)

---

## 4. 첫 부팅 후 확인사항

터미널을 열고 다음 명령어를 실행하세요:

### 4.1 시스템 정보 확인
```bash
# Jetson 모델 확인
cat /etc/nv_tegra_release

# Ubuntu 버전 확인
lsb_release -a
```

### 4.2 GPU 확인
```bash
# GPU 상태 확인
nvidia-smi
# 또는
tegrastats
```

### 4.3 CUDA 확인
```bash
# CUDA 버전 확인
nvcc --version
```

만약 `nvcc: command not found`가 나오면, 내일 환경 설정에서 해결합니다!

---

## 5. 오늘의 실습

### 실습 1: Jetson 부팅하기
- [ ] SD 카드에 JetPack 이미지 굽기
- [ ] Jetson 부팅 및 초기 설정 완료
- [ ] 터미널 열기

### 실습 2: 시스템 확인
- [ ] `cat /etc/nv_tegra_release` 실행
- [ ] `nvidia-smi` 또는 `tegrastats` 실행
- [ ] 결과 스크린샷 저장

---

## 6. 용어 정리

| 용어 | 의미 |
|------|------|
| **Jetson** | NVIDIA의 소형 AI 컴퓨터 |
| **JetPack** | Jetson용 운영체제 + 개발도구 |
| **GPU** | 그래픽 처리 장치, AI 연산에 활용 |
| **CUDA** | GPU 프로그래밍 도구 |
| **Flash** | 이미지를 SD 카드에 굽는 것 |

---

## 7. 다음 시간 예고

내일은 CUDA 개발 환경을 설정합니다!
- 환경 변수 설정
- nvcc 컴파일러 사용법
- 첫 번째 컴파일 테스트
