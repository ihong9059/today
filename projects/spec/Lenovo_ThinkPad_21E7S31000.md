# Lenovo ThinkPad (21E7S31000) 사양

**작성일**: 2026-01-11

---

## 기기 정보

| 항목 | 사양 |
|------|------|
| **제조사** | LENOVO |
| **모델명** | 21E7S31000 |
| **제품군** | ThinkPad |
| **타입** | 노트북 PC |
| **OS** | Windows 11 Pro (64-bit) |
| **OS 버전** | 10.0.26100 |

---

## CPU

| 항목 | 사양 |
|------|------|
| **프로세서** | Intel Core i5-1235U (12세대 Alder Lake) |
| **코어 수** | 10코어 (2P + 8E) |
| **스레드 수** | 12 스레드 |
| **기본 클럭** | 1.3 GHz |
| **최대 터보** | 4.4 GHz |
| **공정** | Intel 7 (10nm) |
| **TDP** | 15W |

### CPU 코어 구성
- **Performance 코어 (P-Core)**: 2개 - 고성능 작업용
- **Efficient 코어 (E-Core)**: 8개 - 효율/백그라운드 작업용

---

## 메모리 (RAM)

| 항목 | 사양 |
|------|------|
| **총 용량** | 16GB |
| **타입** | DDR4 |
| **속도** | 3200 MHz |
| **제조사** | Ramaxel Technology |

---

## 저장소

| 항목 | 사양 |
|------|------|
| **SSD** | WD PC SN740 |
| **용량** | 512GB |
| **타입** | NVMe M.2 |
| **인터페이스** | PCIe Gen4 |

---

## GPU

| 항목 | 사양 |
|------|------|
| **GPU** | Intel UHD Graphics (내장) |
| **VRAM** | 2GB (공유 메모리) |
| **드라이버** | 32.0.101.7026 |
| **CUDA** | ❌ 미지원 (Intel GPU) |
| **DirectX** | 12 지원 |

### AI/머신러닝 지원
| 항목 | 지원 |
|------|------|
| **CUDA** | ❌ 미지원 |
| **OpenVINO** | ✅ 지원 (Intel AI) |
| **ONNX Runtime** | ✅ 지원 |
| **PyTorch (CPU)** | ✅ 지원 |

---

## 성능 비교 (보유 기기)

| 기기 | 타입 | CPU | RAM | 저장소 | AI 가속 |
|------|------|-----|-----|--------|---------|
| **ThinkPad** | 노트북 | i5-1235U (10코어) | **16GB** | **512GB** | CPU only |
| Galaxy M53 5G | 스마트폰 | Dimensity 900 | 8GB | 128GB | APU 3.0 |
| Galaxy A23 | 스마트폰 | Snapdragon 680 | 4GB | 128GB | NNAPI |
| Lenovo TB310FU | 태블릿 | Helio G80 | 4GB | 48GB | NNAPI |

---

## AI/OCR 작업 성능

### EasyOCR 실행 환경

```
이 PC에서 EasyOCR 실행:
┌─────────────────────────────────────┐
│  Python + PyTorch                   │
│         ↓                           │
│  CPU 처리 (i5-1235U, 10코어)        │
│         ↓                           │
│  처리 시간: 3~5초                   │
│  정확도: 90~95%                     │
└─────────────────────────────────────┘
```

| 비교 | 이 PC | NVIDIA GPU PC |
|------|-------|---------------|
| 처리 장치 | CPU (10코어) | GPU (수천 CUDA 코어) |
| OCR 속도 | 3~5초 | 0.5~1초 |
| AI 학습 | ⚠️ 가능하지만 느림 | ✅ 빠름 |
| 전력 소비 | 낮음 (15W TDP) | 높음 (100W+) |

---

## 휴대성

| 항목 | 특징 |
|------|------|
| **장점** | 가벼운 노트북, 이동 가능 |
| **배터리** | 일반적인 사용시 6~8시간 |
| **충전** | USB-C PD 지원 |

---

## 요약

**ThinkPad 21E7S31000**은 휴대용 개발/AI 작업에 적합한 노트북입니다.

### 장점
- 12세대 Intel CPU (10코어/12스레드)
- 16GB RAM - 다중 작업에 충분
- 512GB NVMe SSD - 빠른 읽기/쓰기
- Windows 11 Pro - 개발 환경 최적
- 휴대성 - 이동하며 작업 가능

### 단점
- NVIDIA GPU 없음 - AI 학습 속도 제한
- 내장 그래픽만 - 고성능 GPU 작업 불가

### AI 작업 적합성
- **OCR 추론**: ✅ 가능 (CPU로 3~5초)
- **AI 학습**: ⚠️ 가능하지만 느림
- **대규모 딥러닝**: ❌ NVIDIA GPU 필요

---

## 원본 데이터

### wmic 정보
```
ComputerSystem:
  Manufacturer: LENOVO
  Model: 21E7S31000
  TotalPhysicalMemory: 16839766016

CPU:
  Name: 12th Gen Intel(R) Core(TM) i5-1235U
  NumberOfCores: 10
  NumberOfLogicalProcessors: 12
  MaxClockSpeed: 1300

VideoController:
  Name: Intel(R) UHD Graphics
  AdapterRAM: 2147479552
  DriverVersion: 32.0.101.7026

DiskDrive:
  Model: WD PC SN740 SDDQMQD-512G-1001
  Size: 512105932800

OS:
  Caption: Microsoft Windows 11 Pro
  Version: 10.0.26100
  OSArchitecture: 64-bit
```

---

*이 문서는 WMIC 명령어를 통해 수집된 정보로 작성되었습니다.*
