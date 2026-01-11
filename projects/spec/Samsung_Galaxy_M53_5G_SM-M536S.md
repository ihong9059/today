# Samsung Galaxy M53 5G (SM-M536S) 사양

**작성일**: 2026-01-11

---

## 기기 정보

| 항목 | 사양 |
|------|------|
| **모델명** | SM-M536S |
| **제품명** | Samsung Galaxy M53 5G |
| **브랜드** | Samsung |
| **Android 버전** | 14 |
| **SDK 버전** | 34 |
| **빌드 번호** | UP1A.231005.007.M536SKSSAEYD1 |
| **보안 패치** | 2025-04-01 |
| **시리얼 번호** | RFCTB13LCKF |

---

## 접속 방법

### USB ADB 접속

```bash
# ADB 장치 확인
adb devices

# 결과
RFCTB13LCKF    device
```

### 접속 전 필수 사항
1. 스마트폰에서 **개발자 옵션** 활성화
2. **USB 디버깅** 켜기
3. USB 케이블로 PC에 연결
4. "USB 디버깅 허용" 팝업에서 **허용** 선택

### SSH 접속 (Termux)

| 항목 | 값 |
|------|-----|
| **IP 주소** | 192.168.0.12 |
| **포트** | 8022 |
| **사용자** | u0_a323 |

```bash
ssh -p 8022 u0_a323@192.168.0.12
```

---

## Termux 환경

| 항목 | 사양 |
|------|------|
| **Termux 버전** | 0.118.3 |
| **Python** | 3.12.12 |
| **SSH** | OpenSSH 10.2p1 |

### Python 사용법

```bash
# SSH 접속 후 Python 실행
python

# 스크립트 실행
python script.py

# 패키지 설치
pip install numpy pandas
```

### Termux 추가 패키지 설치

```bash
# Termux 내에서
pkg install git vim nodejs
```

---

## CPU

| 항목 | 사양 |
|------|------|
| **프로세서** | MediaTek Dimensity 900 (MT6877V/ZA) |
| **플랫폼** | mt6877 |
| **코어 수** | 8코어 (옥타코어) |
| **아키텍처** | ARM64-v8a (64비트) |
| **공정** | 6nm |

### CPU 코어 구성

| 코어 | 타입 | 클럭 속도 | 개수 |
|------|------|----------|------|
| 0-5 | Cortex-A55 (효율) | 최대 2.0 GHz | 6개 |
| 6-7 | Cortex-A78 (성능) | 최대 2.4 GHz | 2개 |

### CPU 상세
- CPU part 0xd05: ARM Cortex-A55 (6개) - 효율 코어
- CPU part 0xd41: ARM Cortex-A78 (2개) - 성능 코어
- Hardware: MediaTek MT6877V/ZA (Dimensity 900)

---

## 메모리 (RAM)

| 항목 | 용량 |
|------|------|
| **RAM 총량** | 7,704 MB (약 8GB) |
| **사용 가능** | 약 2.7GB |
| **캐시** | 약 2.6GB |

---

## 저장소

| 항목 | 용량 |
|------|------|
| **전체 용량** | 107GB (128GB 모델) |
| **사용 중** | 52GB (49%) |
| **남은 공간** | 55GB (51%) |

---

## GPU

| 항목 | 사양 |
|------|------|
| **GPU** | Mali-G68 MC4 |
| **OpenGL ES** | 3.2 |
| **OpenGL 버전 코드** | 196610 |
| **Vulkan** | 지원 |

### GPU AI 가속
- **NNAPI**: 지원 (Neural Network API)
- **TensorFlow Lite GPU Delegate**: 지원
- **ML Kit 가속**: 지원

---

## 디스플레이

| 항목 | 사양 |
|------|------|
| **해상도** | 1080 x 2400 (FHD+) |
| **물리적 밀도** | 450 dpi |
| **화면 크기** | 6.7인치 |
| **화면 비율** | 20:9 |
| **주사율** | 120Hz |
| **패널** | Super AMOLED Plus |

---

## 지원 ABI

| 타입 | ABI |
|------|-----|
| 64비트 | arm64-v8a |
| 32비트 | armeabi-v7a, armeabi |

---

## 5G 지원

| 항목 | 사양 |
|------|------|
| **5G** | Sub-6GHz 지원 |
| **LTE** | Cat.18 지원 |
| **WiFi** | WiFi 6 (802.11ax) |

---

## 성능 비교 (보유 기기)

| 기기 | CPU | 코어 | RAM | 저장소 | 특징 |
|------|-----|------|-----|--------|------|
| **Galaxy M53 5G** | Dimensity 900 | 8코어 2.4GHz | **8GB** | 128GB | **최고 성능**, 5G |
| Galaxy A23 | Snapdragon 680 | 8코어 2.4GHz | 4GB | 128GB | 중급, 4G |
| Lenovo TB310FU | Helio G80 | 8코어 2.0GHz | 4GB | 48GB | 태블릿, 큰 화면 |

### 성능 순위
1. **Galaxy M53 5G** - RAM 2배, 6nm 공정, Cortex-A78 탑재
2. Galaxy A23 - 안정적인 중급 성능
3. Lenovo 태블릿 - 화면 크기 장점

---

## AI 활용 능력

| 항목 | 지원 |
|------|------|
| **ML Kit** | ✅ GPU 가속 |
| **TensorFlow Lite** | ✅ GPU/NNAPI 가속 |
| **MediaTek APU** | ✅ AI 전용 프로세서 (APU 3.0) |
| **On-device AI** | ✅ 고성능 |

### MediaTek APU (AI Processing Unit)
Dimensity 900은 **APU 3.0**을 탑재하여 AI 연산 전용 하드웨어 가속을 지원합니다.
- OCR, 이미지 인식 등에서 더 빠른 처리 가능
- GPU보다 AI 작업에 최적화

---

## 요약

**Galaxy M53 5G**는 보유 기기 중 **최고 성능**의 스마트폰입니다.

- **장점**:
  - 8GB RAM (다른 기기 대비 2배)
  - 6nm 공정 CPU (전력 효율 우수)
  - Cortex-A78 고성능 코어
  - MediaTek APU 3.0 (AI 가속)
  - 5G 지원
  - 120Hz Super AMOLED 디스플레이

- **단점**:
  - 특별한 단점 없음

---

## 원본 데이터

### /proc/cpuinfo (요약)
```
processor   : 0-5  (CPU part: 0xd05 - Cortex-A55)
processor   : 6-7  (CPU part: 0xd41 - Cortex-A78)
Hardware    : MT6877V/ZA
```

### getprop 정보
```
ro.product.model=SM-M536S
ro.product.brand=samsung
ro.build.version.release=14
ro.board.platform=mt6877
ro.hardware=mt6877
ro.product.cpu.abi=arm64-v8a
ro.product.cpu.abilist=arm64-v8a,armeabi-v7a,armeabi
```

### /proc/meminfo (요약)
```
MemTotal:        7704000 kB
MemFree:          310560 kB
MemAvailable:    2791740 kB
```

---

*이 문서는 ADB를 통해 수집된 정보로 작성되었습니다.*
