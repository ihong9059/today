# Jetson Nano B01 vs Orin 시리즈 비교 검토 보고서

**작성일:** 2026-01-20
**작성자:** Claude Code
**대상 장비:** NVIDIA Jetson Nano B01 (현재 보유) vs Jetson Orin 시리즈

---

## 1. 개요

현재 보유한 Jetson Nano B01의 성능과 한계를 분석하고, 업그레이드 옵션으로 Jetson Orin 시리즈를 비교 검토합니다.

---

## 2. 현재 보유 장비: Jetson Nano B01

### 2.1 하드웨어 사양

| 항목 | 사양 |
|------|------|
| **모델** | NVIDIA Jetson Nano Developer Kit B01 |
| **GPU** | Maxwell 128 CUDA Cores |
| **CPU** | ARM Cortex-A57 Quad-core @ 1.43GHz |
| **RAM** | 4GB LPDDR4 |
| **AI 성능** | 0.472 TFLOPS (FP16) |
| **전력** | 5-10W |
| **출시년도** | 2019년 |

### 2.2 소프트웨어 환경 (현재 설정)

| 소프트웨어 | 버전 | 비고 |
|-----------|------|------|
| JetPack | R32.7.6 (4.6.x) | 마지막 지원 버전 |
| Ubuntu | 18.04.6 LTS | glibc 2.27 |
| CUDA | 10.2.300 | 구버전 |
| cuDNN | 8.2.1 | |
| PyTorch | 1.10.0 | CUDA 지원 |
| torchvision | 0.11.1 | 소스 빌드 완료 |
| Node.js | 16.20.2 (최대) | glibc 제한 |
| Python | 3.6.9 | |

### 2.3 실제 운영 테스트 결과 (2026-01-19)

#### 웹서버 운영 현황

| 서비스 | 포트 | 상태 | 비고 |
|--------|:----:|:----:|------|
| device-info | 8080 | ✅ 정상 | Node.js 내장 모듈만 사용 |
| SensorMonitor | 5000 | ✅ 정상 | Express.js |
| snu-consulting | 8000 | ✅ 정상 | Python http.server |
| edu-backend | 3001 | ✅ 정상 | Express.js (mock mode) |
| cert-guide | - | ❌ 불가 | Next.js 16 (Node 18+ 필요) |
| edu-frontend | - | ❌ 불가 | Next.js 14 (Node 18+ 필요) |

#### 성능 제한사항

1. **glibc 2.27 제한**: Node.js 18+ 설치 불가
2. **메모리 제한**: 4GB로 대형 모델 로드 어려움
3. **CUDA 10.2**: 최신 AI 라이브러리 호환성 저하
4. **저장공간 부족**: eMMC 14GB (USB 확장 필수)

### 2.4 AI 예상 성능

| 작업 | 예상 FPS | 비고 |
|------|:--------:|------|
| 이미지 분류 (MobileNet) | ~25 | 실시간 가능 |
| 객체 탐지 (YOLOv5 nano) | 10-15 | 실용적 |
| 번호판 인식 | 5-10 | 경량 모델 필요 |
| LLM 추론 | ❌ | 메모리 부족 |

---

## 3. Jetson Orin 시리즈 비교

### 3.1 모델별 사양 비교

| 사양 | Nano B01 | Orin Nano Super | Orin NX 16GB | AGX Orin 64GB |
|------|:--------:|:---------------:|:------------:|:-------------:|
| **GPU 아키텍처** | Maxwell | Ampere | Ampere | Ampere |
| **CUDA Cores** | 128 | 1024 | 1024 | 2048 |
| **Tensor Cores** | 없음 | 32 | 32 | 64 |
| **CPU** | A57 4코어 | A78AE 6코어 | A78AE 8코어 | A78AE 12코어 |
| **CPU 클럭** | 1.43GHz | 1.7GHz | 2.0GHz | 2.2GHz |
| **RAM** | 4GB LPDDR4 | 8GB LPDDR5 | 16GB LPDDR5 | 64GB LPDDR5 |
| **AI 성능 (TOPS)** | ~0.5 | 67 | 100 | 275 |
| **전력** | 5-10W | 7-25W | 10-40W | 15-60W |

### 3.2 AI 성능 비교 (배수)

```
Jetson Nano B01:     ████ 1x (기준)
Orin Nano Super:     ████████████████████████████████████████████████████████████████████ 142x
Orin NX 16GB:        ████████████████████████████████████████████████████████████████████████████████████████████████████ 200x
AGX Orin 64GB:       ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 550x
```

### 3.3 가격 비교 (2026년 1월 기준)

| 모델 | 가격 (USD) | 가격 (KRW 예상) | 성능/가격 비율 |
|------|:----------:|:---------------:|:--------------:|
| **Jetson Nano B01** | $99 (단종) | ~130,000원 | 기준 |
| **Orin Nano Super Dev Kit** | **$249** | ~330,000원 | 매우 우수 |
| Orin NX 8GB (모듈) | $399 | ~530,000원 | 우수 |
| Orin NX 16GB (모듈) | $599 | ~800,000원 | 우수 |
| AGX Orin 32GB Dev Kit | $1,999 | ~2,650,000원 | 전문가용 |

> **참고**: Orin Nano Super는 기존 $499에서 $249로 50% 가격 인하됨

---

## 4. 용도별 추천 모델

### 4.1 웹서버 + 경량 AI (현재 용도)

| 추천 | 모델 | 이유 |
|:----:|------|------|
| ⭐⭐⭐ | **Orin Nano Super** | 최적의 가성비, Node.js 18+ 지원, 67 TOPS |
| ⭐⭐ | Orin NX 8GB | 더 높은 성능, 동일 폼팩터 |
| ⭐ | Nano B01 (현재) | 기본 웹서버 운영은 가능 |

### 4.2 AI 비전 검사 (공장자동화)

| 추천 | 모델 | 이유 |
|:----:|------|------|
| ⭐⭐⭐ | **Orin NX 16GB** | YOLOv8 실시간 처리, 다중 카메라 |
| ⭐⭐ | Orin Nano Super | 단일 카메라 실시간 검사 |
| ❌ | Nano B01 | 성능 부족, 모델 제한 |

### 4.3 LLM/생성형 AI

| 추천 | 모델 | 이유 |
|:----:|------|------|
| ⭐⭐⭐ | **AGX Orin 64GB** | Llama-3.1-70B 실행 가능 |
| ⭐⭐ | Orin Nano Super | Llama-3.1-8B, 소형 LLM |
| ❌ | Nano B01 | 메모리 부족, 불가능 |

### 4.4 교육/학습 목적

| 추천 | 모델 | 이유 |
|:----:|------|------|
| ⭐⭐⭐ | **Orin Nano Super** | $249로 최신 AI 학습 가능 |
| ⭐⭐ | Nano B01 (현재) | 기초 학습에 충분, 저렴 |

---

## 5. Orin Nano Super 상세 분석 (최적 업그레이드 후보)

### 5.1 주요 개선점 (vs Nano B01)

| 항목 | Nano B01 | Orin Nano Super | 개선 |
|------|----------|-----------------|:----:|
| AI 성능 | 0.5 TOPS | 67 TOPS | **142x** |
| CUDA Cores | 128 | 1024 | **8x** |
| RAM | 4GB | 8GB | **2x** |
| RAM 대역폭 | 25.6 GB/s | 102 GB/s | **4x** |
| Tensor Cores | 없음 | 32 | ✅ 신규 |
| JetPack | 4.6 | 6.x | 최신 |
| Ubuntu | 18.04 | 22.04 | 최신 |
| CUDA | 10.2 | 12.x | 최신 |
| Node.js | 16 max | 20+ | 최신 |

### 5.2 Orin Nano Super에서 가능한 작업

| 작업 | 가능 여부 | 예상 성능 |
|------|:--------:|----------|
| Next.js 16 웹서버 | ✅ | Node.js 20 지원 |
| YOLOv8 실시간 추론 | ✅ | 30+ FPS |
| Llama-3.1-8B | ✅ | 토큰/초: 10-15 |
| Stable Diffusion | ✅ | 이미지당 10-20초 |
| TensorRT 최적화 | ✅ | 2-3x 속도 향상 |
| 다중 AI 파이프라인 | ✅ | 동시 실행 가능 |

### 5.3 소프트웨어 지원

- **NVIDIA AI Stack**: TensorRT, cuDNN, CUDA 12
- **ML 프레임워크**: PyTorch 2.x, TensorFlow 2.x
- **LLM 지원**: Ollama, llama.cpp, vLLM, TensorRT-LLM
- **HuggingFace**: Transformers 전체 지원
- **컨테이너**: Docker, NVIDIA Container Runtime

---

## 6. 비용 대비 효과 분석

### 6.1 투자 대비 성능 향상

| 모델 | 가격 | AI 성능 | 성능/100USD |
|------|:----:|:-------:|:-----------:|
| Nano B01 | $99 | 0.5 TOPS | 0.5 TOPS |
| **Orin Nano Super** | **$249** | **67 TOPS** | **27 TOPS** |
| Orin NX 16GB | $599 | 100 TOPS | 17 TOPS |
| AGX Orin 64GB | $1,999 | 275 TOPS | 14 TOPS |

> **결론**: Orin Nano Super가 가장 높은 가성비 (TOPS/$)

### 6.2 총 소유 비용 (TCO) 예측

| 항목 | Nano B01 | Orin Nano Super |
|------|:--------:|:---------------:|
| 본체 | $99 | $249 |
| 추가 저장장치 | $30 (USB) | $50 (NVMe) |
| 전력 (1년) | ~$9 | ~$22 |
| **총합** | **~$138** | **~$321** |

추가 비용 $183으로 **142배 성능 향상** 획득

---

## 7. 결론 및 권장사항

### 7.1 현재 상황 요약

- Jetson Nano B01은 **기본 웹서버 운영**에는 충분
- **최신 Node.js, Next.js** 사용 불가 (glibc 제한)
- **AI 성능 한계**: 경량 모델만 실행 가능
- **향후 확장성 제한**: 더 이상 JetPack 업데이트 없음

### 7.2 업그레이드 권장사항

| 시나리오 | 권장 모델 | 예산 |
|----------|----------|:----:|
| 예산 제한, 현재 유지 | Nano B01 유지 | $0 |
| **최적 업그레이드** | **Orin Nano Super** | **$249** |
| AI 비전 검사 프로덕션 | Orin NX 16GB | $599 |
| 연구/개발 전용 | AGX Orin 64GB | $1,999 |

### 7.3 최종 권장

**Orin Nano Super Developer Kit ($249)** 구매를 권장합니다.

**이유:**
1. **가격 대비 최고 성능**: 142배 AI 성능 향상
2. **소프트웨어 호환성**: 최신 Node.js, Python, CUDA 지원
3. **미래 대비**: 생성형 AI, LLM 실행 가능
4. **동일 폼팩터**: 기존 설정 재활용 가능
5. **학습 가치**: 최신 AI 기술 습득에 최적

---

## 8. 참고 자료

- [NVIDIA Jetson Orin Nano Super Developer Kit](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/nano-super-developer-kit/)
- [NVIDIA Jetson AGX Orin](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/)
- [NVIDIA Jetson 모듈 비교 (Connect Tech)](https://connecttech.com/orin-module-comparison/)
- [Jetson 비교 가이드 (Seeed Studio)](https://www.seeedstudio.com/blog/nvidia-jetson-comparison-nano-tx2-nx-xavier-nx-agx-orin/)
- [NVIDIA 공식 구매처](https://developer.nvidia.com/buy-jetson)

---

*이 문서는 2026-01-20 기준으로 작성되었습니다.*
