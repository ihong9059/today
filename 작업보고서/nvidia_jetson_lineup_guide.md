# NVIDIA Jetson 라인업 가이드

**작성일:** 2026-01-23
**목적:** Jetson Nano 업그레이드 경로 및 모델별 사양 비교

---

## 1. Jetson 라인업 전체 비교

| 모델 | AI 성능 | GPU | CUDA 코어 | RAM | 전력 | 가격 | Nano 대비 |
|:-----|--------:|:----|----------:|----:|-----:|-----:|----------:|
| **Jetson Nano** | 0.47 TOPS | Maxwell | 128 | 4 GB | 5-10W | 단종 | 1x (기준) |
| **Jetson Orin Nano 4GB** | 20 TOPS | Ampere | 512 | 4 GB | 7-10W | ~$169 | 43x |
| **Jetson Orin Nano 8GB** | 40 TOPS | Ampere | 1024 | 8 GB | 7-15W | ~$199 | 85x |
| **Jetson Orin Nano Super** | **67 TOPS** | Ampere | 1024 | 8 GB | 15-25W | **$249** | **142x** |
| **Jetson Orin NX 8GB** | 70 TOPS | Ampere | 1024 | 8 GB | 10-20W | ~$349 | 149x |
| **Jetson Orin NX 16GB** | 100 TOPS | Ampere | 1024 | 16 GB | 10-25W | ~$399 | 213x |
| **Jetson Orin NX Super** | **157 TOPS** | Ampere | 1024 | 16 GB | 25W | ~$499 | **334x** |
| **Jetson AGX Orin 32GB** | 200 TOPS | Ampere | 1792 | 32 GB | 15-40W | ~$999 | 426x |
| **Jetson AGX Orin 64GB** | 275 TOPS | Ampere | 2048 | 64 GB | 15-60W | ~$1,599 | 585x |
| **Jetson AGX Thor** | 2,070 TOPS | Blackwell | - | 128 GB | 40-130W | TBD | 4,404x |

---

## 2. 업그레이드 경로

```
┌─────────────────────────────────────────────────────────────────┐
│                    NVIDIA Jetson 업그레이드 경로                   │
└─────────────────────────────────────────────────────────────────┘

  Jetson Nano (0.47 TOPS) - 단종
        │
        ▼
  ┌─────────────────────────────────────┐
  │  Jetson Orin Nano Super ($249)      │ ◀── 가성비 최고 추천!
  │  67 TOPS / 8GB / 15-25W             │
  └─────────────────────────────────────┘
        │
        ▼
  ┌─────────────────────────────────────┐
  │  Jetson Orin NX Super ($499)        │ ◀── 고성능 엣지 디바이스
  │  157 TOPS / 16GB / 25W              │
  └─────────────────────────────────────┘
        │
        ▼
  ┌─────────────────────────────────────┐
  │  Jetson AGX Orin 64GB ($1,599)      │ ◀── 프로덕션 / 로보틱스
  │  275 TOPS / 64GB / 15-60W           │
  └─────────────────────────────────────┘
        │
        ▼
  ┌─────────────────────────────────────┐
  │  Jetson AGX Thor (2025.08 출시)      │ ◀── 차세대 플래그십
  │  2,070 TOPS / 128GB / 40-130W       │
  └─────────────────────────────────────┘
```

---

## 3. Jetson Nano vs Orin Nano Super 상세 비교

| 항목 | Jetson Nano | Orin Nano Super | 개선 |
|:-----|:-----------:|:---------------:|:----:|
| **AI 성능** | 0.47 TOPS | 67 TOPS | **142x** |
| **GPU 아키텍처** | Maxwell | Ampere | 3세대 신형 |
| **CUDA 코어** | 128 | 1024 | **8x** |
| **Tensor 코어** | 없음 | 32 | AI 가속 |
| **CPU** | 4코어 A57 | 6코어 A78AE | 고성능 |
| **CPU 클럭** | 1.43 GHz | 1.7 GHz | +19% |
| **RAM** | 4 GB LPDDR4 | 8 GB LPDDR5 | **2x** |
| **메모리 대역폭** | 25.6 GB/s | 102 GB/s | **4x** |
| **스토리지** | microSD | NVMe SSD 지원 | 고속 |
| **전력** | 5-10W | 15-25W | 약간 증가 |
| **비디오 인코딩** | 4K30 | 4K60 | 2x |
| **비디오 디코딩** | 4K60 | 4K120 | 2x |
| **가격** | 단종 (~$99) | **$249** | - |
| **JetPack** | 4.x | 6.x | 최신 |
| **Python** | 3.6 | 3.10+ | 최신 |
| **CUDA** | 10.2 | 12.x | 최신 |
| **지원 기간** | 종료 | **2032년** | 장기 지원 |

---

## 4. 모델별 용도 가이드

### 4.1 Jetson Orin Nano Super ($249) - 추천

**적합한 용도:**
- 학습/프로토타이핑
- 소규모 AI 프로젝트
- 번호판 인식, 얼굴 인식
- IoT 엣지 디바이스
- 학생/메이커 프로젝트

**장점:**
- 가격 대비 최고 성능 (142x vs Nano)
- $249로 67 TOPS 달성
- JetPack 6.x 최신 소프트웨어 지원
- 2032년까지 장기 지원

### 4.2 Jetson Orin NX Super ($499)

**적합한 용도:**
- 실시간 멀티 카메라 처리
- 자율 주행 프로토타입
- 드론/로봇 비전
- 프로덕션 엣지 AI

**장점:**
- 157 TOPS 고성능
- 16GB 대용량 메모리
- 복잡한 모델 구동 가능

### 4.3 Jetson AGX Orin ($999~$1,599)

**적합한 용도:**
- 상용 로봇 플랫폼
- 자율 주행 차량
- 의료 영상 분석
- 산업용 비전 시스템

**장점:**
- 275 TOPS 최고 성능
- 64GB 대용량 메모리
- 멀티 센서 퓨전
- 자동차 등급 안전성

### 4.4 Jetson AGX Thor (2025.08 출시)

**적합한 용도:**
- 차세대 자율 주행
- 휴머노이드 로봇
- 대규모 LLM 엣지 추론
- Physical AI

**장점:**
- 2,070 TOPS (AGX Orin 대비 7.5x)
- 128GB 메모리
- Blackwell GPU 아키텍처
- 3.5x 에너지 효율

---

## 5. 번호판 인식 예상 성능

### 5.1 플랫폼별 예상 속도

| 플랫폼 | AI 성능 | 예상 속도 | Nano 대비 | 비용 |
|:-------|--------:|----------:|----------:|-----:|
| **Jetson Nano** | 0.47 TOPS | 1.94초/장 | 1x (기준) | 단종 |
| **Orin Nano Super** | 67 TOPS | **~0.1초/장** | **~20x** | $249 |
| **Orin NX Super** | 157 TOPS | ~0.05초/장 | ~40x | $499 |
| **AGX Orin 64GB** | 275 TOPS | ~0.03초/장 | ~65x | $1,599 |
| **DO RTX 4000 Ada** | - | ~0.2초/장 | ~10x | $0.76/hr |

### 5.2 현재 vs 업그레이드 비교

| 항목 | Jetson Nano (현재) | Orin Nano Super | 개선 |
|:-----|-------------------:|----------------:|-----:|
| **추론 속도** | 1.94초/장 | ~0.1초/장 | **~20x** |
| **모델 로딩** | ~30초 | ~5초 | **6x** |
| **인식률** | 90% | 90%+ | 동일 이상 |
| **배치 처리** | 제한적 | 가능 | 개선 |
| **PaddleOCR** | 불가 (Python 3.6) | **가능** | 신규 |
| **TensorRT** | 제한적 | **완전 지원** | 개선 |

---

## 6. 구매 가이드

### 6.1 공식 판매처

| 판매처 | URL | 비고 |
|:-------|:----|:-----|
| NVIDIA 공식 | https://store.nvidia.com | 미국 직배송 |
| Arrow Electronics | https://www.arrow.com | 글로벌 |
| Seeed Studio | https://www.seeedstudio.com | 아시아 |
| SparkFun | https://www.sparkfun.com | 미국 |

### 6.2 국내 구매

| 판매처 | 비고 |
|:-------|:-----|
| 엘레파츠 | https://www.eleparts.co.kr |
| 디바이스마트 | https://www.devicemart.co.kr |
| 아이씨뱅큐 | https://www.icbanq.com |

### 6.3 예상 국내 가격 (2026년 1월 기준)

| 모델 | 미국 가격 | 예상 국내 가격 |
|:-----|----------:|---------------:|
| Orin Nano Super | $249 | ~35만원 |
| Orin NX 16GB | $399 | ~55만원 |
| Orin NX Super | $499 | ~70만원 |
| AGX Orin 64GB | $1,599 | ~220만원 |

---

## 7. Orin Nano Super 세팅 가이드

### 7.1 필요 장비

| 장비 | 용도 | 비고 |
|:-----|:-----|:-----|
| Orin Nano Super 개발자 키트 | 본체 | $249 |
| NVMe SSD (256GB+) | 저장장치 | microSD보다 10x 빠름 |
| USB-C 전원 어댑터 (65W) | 전원 | 25W Super 모드용 |
| 방열팬/히트싱크 | 쿨링 | 25W 모드 필수 |
| USB 키보드/마우스 | 초기 설정 | - |
| HDMI 모니터 | 초기 설정 | - |

### 7.2 JetPack 6.x 설치

```bash
# SD 카드 이미지 다운로드
# https://developer.nvidia.com/embedded/jetpack

# 또는 SDK Manager 사용 (Ubuntu PC 필요)
sudo apt install nvidia-sdk-manager
```

### 7.3 Super 모드 활성화

```bash
# JetPack 6.2 이상에서 Super 모드 활성화
sudo nvpmodel -m 0  # MAXN SUPER 모드

# 현재 모드 확인
nvpmodel -q

# 전력 모드 목록
# 0: MAXN SUPER (25W, 67 TOPS)
# 1: 25W
# 2: 15W
```

### 7.4 번호판 인식 환경 설정

```bash
# Python 가상환경
python3 -m venv ~/plate-ocr
source ~/plate-ocr/bin/activate

# PyTorch (JetPack 6.x용)
pip install --upgrade pip
pip install torch torchvision --index-url https://developer.download.nvidia.com/compute/redist/jp/v60/

# EasyOCR
pip install easyocr opencv-python

# PaddleOCR (Orin에서 가능!)
pip install paddlepaddle-gpu paddleocr
```

---

## 8. 비용 비교 (번호판 인식 서비스 기준)

### 8.1 초기 비용

| 옵션 | 초기 비용 | 월 운영비 | 1년 총비용 |
|:-----|----------:|----------:|-----------:|
| **Jetson Nano** (현재) | $0 (보유) | ~$5 (전기) | ~$60 |
| **Orin Nano Super** | $249 | ~$8 (전기) | ~$345 |
| **DO RTX 4000 (8hr/day)** | $0 | ~$134 | ~$1,608 |
| **DO RTX 4000 (24hr)** | $0 | ~$547 | ~$6,564 |

### 8.2 권장 선택

| 상황 | 권장 옵션 | 이유 |
|:-----|:---------|:-----|
| **엣지/현장 설치** | Orin Nano Super | 독립 운영, 저전력 |
| **개발/테스트** | DO GPU (시간당) | 유연한 사용 |
| **대량 배치 처리** | DO GPU | 고성능 필요 |
| **24시간 서비스** | Orin Nano Super | 장기 비용 절감 |

---

## 9. 결론 및 권장사항

### 9.1 Jetson Nano 사용자를 위한 권장

| 우선순위 | 권장 모델 | 가격 | 이유 |
|:--------:|:----------|-----:|:-----|
| **1순위** | Orin Nano Super | $249 | 가성비 최고, 142x 성능 향상 |
| 2순위 | Orin NX Super | $499 | 고성능 필요 시 |
| 대안 | DO GPU Droplet | $0.76/hr | 클라우드 선호 시 |

### 9.2 번호판 인식 프로젝트 권장

```
현재: Jetson Nano (1.94초/장, 90%)
          ↓
권장: Orin Nano Super (~0.1초/장 예상, 90%+)
      - $249 일회성 투자
      - 20배 속도 향상
      - PaddleOCR 사용 가능
      - TensorRT 완전 지원
      - 2032년까지 장기 지원
```

---

## 10. 참고 자료

### 10.1 공식 문서

- [Jetson Orin Nano Super Developer Kit](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/nano-super-developer-kit/)
- [Jetson Modules Lineup](https://developer.nvidia.com/embedded/jetson-modules)
- [JetPack SDK](https://developer.nvidia.com/embedded/jetpack)

### 10.2 관련 작업보고서

- `aiTest/번호판_인식_성능비교_리포트.md` - Jetson Nano 성능 데이터
- `작업보고서/digitalocean_gpu_plate_ocr_guide.md` - DO GPU 가이드

---

*작성일: 2026-01-23*
*NVIDIA Jetson 라인업 가이드 - Nano에서 Orin으로 업그레이드*
