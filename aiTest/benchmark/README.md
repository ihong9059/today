# AI 벤치마크 결과 - 크로스 플랫폼 종합

**테스트 일시:** 2026-01-24
**테스트 플랫폼:** Windows PC, Mac, Jetson Nano, RPi5, DO Server, Ubuntu PC

---

## 1. 번호판 OCR 벤치마크 (30개 이미지)

### 결과 요약

| 순위 | 플랫폼 | 평균 시간 | FPS | 인식률 |
|:----:|:-------|----------:|----:|:------:|
| 🥇 | **Windows PC (i5-1235U)** | **1.00초** | **1.00** | 83% |
| 🥈 | Mac (i7-4770HQ) | 1.19초 | 0.84 | 83% |
| 🥉 | **Ubuntu PC (i5-6200U)** | 1.63초 | 0.61 | 83% |
| 4 | Jetson Nano (GPU) | 2.28초 | 0.44 | 83% |
| 5 | Raspberry Pi 5 | 2.61초 | 0.38 | 83% |
| 6 | DO Server (2vCPU) | 3.52초 | 0.28 | 83% |

### 플랫폼별 상세

| 플랫폼 | CPU/GPU | 모델 로딩 | 비고 |
|:-------|:--------|----------:|:-----|
| Windows PC | i5-1235U (12세대) | 2.56초 | 가장 빠름 |
| Mac | i7-4770HQ (4세대) | 6.77초 | 휴대용 |
| Ubuntu PC | i5-6200U (6세대) | 17.98초 | 데스크탑 |
| Jetson Nano | ARM + 128 CUDA | 24.41초 | GPU 가속 |
| Raspberry Pi 5 | ARM Cortex-A76 | 4.13초 | 임베디드 |
| DO Server | AMD 2vCPU | 6.52초 | 클라우드 |

---

## 2. 볼트 품질검사 AI 벤치마크 (10 에폭 학습)

### 결과 요약

| 순위 | 플랫폼 | 학습 시간 | 추론 FPS | 테스트 정확도 | 재현율 |
|:----:|:-------|----------:|---------:|--------------:|-------:|
| 🥇 | **Windows PC (i5-1235U)** | **2.45분** | **31.2** | **92.4%** | 86.1% |
| 🥈 | **Ubuntu PC (i5-6200U)** | 2.88분 | 26.7 | 90.9% | 94.4% |
| 🥉 | Raspberry Pi 5 | 3.90분 | 21.5 | 84.8% | 91.7% |
| 4 | DO Server (2vCPU) | 4.93분 | 18.6 | 81.8% | 88.9% |

### 플랫폼별 상세

| 플랫폼 | 모델 로딩 | 최고 Val 재현율 | 이미지당 시간 |
|:-------|----------:|----------------:|--------------:|
| Windows PC | 1.35초 | 97.2% | 32.1ms |
| Ubuntu PC | 4.09초 | 97.2% | 37.5ms |
| Raspberry Pi 5 | 1.24초 | 94.4% | 46.5ms |
| DO Server | 0.59초 | 97.2% | 53.8ms |

---

## 3. 플랫폼 정보

### Windows PC (기준)
| 항목 | 값 |
|:-----|:---|
| OS | Windows 11 |
| CPU | Intel i5-1235U (10C/12T, 4.4GHz) |
| RAM | 16GB |
| Python | 3.14.2 |
| PyTorch | 2.9.1+cpu |

### Raspberry Pi 5
| 항목 | 값 |
|:-----|:---|
| OS | Debian (ARM64) |
| CPU | ARM Cortex-A76 (4C, 2.4GHz) |
| RAM | 8GB |
| Python | 3.13.5 |
| PyTorch | 2.10.0+cpu |

### DigitalOcean Server
| 항목 | 값 |
|:-----|:---|
| OS | Ubuntu 24.04 LTS |
| CPU | AMD 2vCPU |
| RAM | 4GB |
| Python | 3.12.3 |
| PyTorch | 2.10.0+cpu |

### Ubuntu PC (192.168.0.16)
| 항목 | 값 |
|:-----|:---|
| OS | Ubuntu 22.04.5 LTS |
| CPU | Intel i5-6200U (2C/4T, 2.3GHz) |
| RAM | 8GB |
| Python | 3.10.12 |
| PyTorch | 2.10.0+cu128 |

### Mac
| 항목 | 값 |
|:-----|:---|
| OS | macOS |
| CPU | Intel i7-4770HQ (4C/8T) |
| RAM | 16GB |

### Jetson Nano
| 항목 | 값 |
|:-----|:---|
| OS | Ubuntu (ARM) |
| GPU | 128 CUDA cores |
| RAM | 4GB |

---

## 4. 결론

### 번호판 OCR
- **최고 성능**: Windows PC (i5-1235U) - 1.00 FPS
- 12세대 Intel CPU가 가장 빠른 OCR 처리 속도
- **Ubuntu PC (i5-6200U)가 3위** - 6세대 CPU도 좋은 성능 (0.61 FPS)
- RPi5가 Jetson Nano와 비슷한 성능 (GPU 없이도 경쟁력 있음)
- DO Server는 2vCPU로 제한되어 가장 느림

### 볼트 품질검사
- **최고 성능**: Windows PC (i5-1235U) - 31.2 FPS
- **Ubuntu PC (i5-6200U) 2위** - 26.7 FPS, 정확도 90.9%
- RPi5가 DO Server보다 빠름 (21.5 vs 18.6 FPS)
- RPi5는 임베디드 환경에서 실시간 추론 가능 (21.5 FPS)

### 향후 계획
- DigitalOcean GPU Droplet (RTX 4000 Ada) 테스트 예정
- GPU 가속 시 5-10배 성능 향상 예상

---

## 5. 파일 구조

```
benchmark/
├── README.md                      # 이 파일
├── plate_ocr_windows_pc.json/md   # Windows PC 번호판 OCR
├── plate_ocr_ubuntu_pc.json/md    # Ubuntu PC 번호판 OCR
├── plate_ocr_rpi5.json/md         # Raspberry Pi 5 번호판 OCR
├── plate_ocr_do_server.json/md    # DO Server 번호판 OCR
├── bolt_test_windows_pc.json/md   # Windows PC 볼트 품질검사
├── bolt_test_ubuntu_pc.json/md    # Ubuntu PC 볼트 품질검사
├── bolt_test_rpi5.json/md         # Raspberry Pi 5 볼트 품질검사
└── bolt_test_do_server.json/md    # DO Server 볼트 품질검사
```

---

*최종 업데이트: 2026-01-24*
