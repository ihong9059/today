# Edge AI / TinyML / Embedded AI / On-Device AI 상세 보고서

**작성일:** 2025년 12월 15일

---

## 1. 개요

소형 가전 및 IoT 기기에 적용되는 AI 기술은 크게 **Edge AI**, **TinyML**, **Embedded AI**, **On-Device AI**로 분류됩니다. 각 기술은 적용 규모, 필요 리소스, 사용 분야에 따라 구분됩니다.

---

## 2. AI 유형별 상세 정의 및 비교

### 2.1 TinyML (타이니 ML)

**정의:** 매우 제한된 컴퓨팅 리소스(수 KB ~ 수백 KB 메모리)를 가진 초소형 마이크로컨트롤러에서 구동되는 머신러닝

**특징:**
- 극도로 낮은 전력 소비 (mW ~ μW 단위)
- 코인셀 배터리로 수개월~수년 동작 가능
- 모델 크기: 2KB ~ 500KB
- 실시간 추론 (< 10ms)
- 인터넷 연결 불필요

**하드웨어 요구사항:**

| 항목 | 사양 |
|------|------|
| **CPU** | ARM Cortex-M0/M0+/M3/M4/M7, RISC-V |
| **클럭 속도** | 16MHz ~ 400MHz |
| **RAM** | 16KB ~ 512KB |
| **Flash** | 64KB ~ 2MB |
| **전력 소비** | 1μW ~ 100mW |
| **NPU/가속기** | 없음 또는 소형 DSP |

**주요 하드웨어 플랫폼:**
- Arduino Nano 33 BLE Sense (Cortex-M4, 256KB RAM)
- ESP32-S3 (240MHz, 512KB SRAM)
- STM32L4 시리즈 (Cortex-M4, 640KB SRAM)
- Raspberry Pi Pico (Cortex-M0+, 264KB SRAM)

**프레임워크:**
- TensorFlow Lite Micro (2KB부터 가능)
- Edge Impulse
- microTVM

---

### 2.2 Embedded AI (임베디드 AI)

**정의:** 임베디드 시스템에 통합된 AI로, TinyML보다 더 많은 리소스를 사용하며 더 복잡한 모델 구동 가능

**특징:**
- 중간 수준의 전력 소비
- 실시간 운영체제(RTOS) 또는 경량 Linux 사용
- 모델 크기: 500KB ~ 50MB
- 센서 퓨전 및 복잡한 추론 가능

**하드웨어 요구사항:**

| 항목 | 사양 |
|------|------|
| **CPU** | ARM Cortex-M7/M55, Cortex-A53/A55 |
| **클럭 속도** | 200MHz ~ 1.5GHz |
| **RAM** | 512KB ~ 1GB |
| **Flash/Storage** | 2MB ~ 8GB |
| **전력 소비** | 100mW ~ 5W |
| **NPU/가속기** | ARM Ethos-U55/U65, DSP 코어 |

**주요 하드웨어 플랫폼:**
- ARM Cortex-M55 + Ethos-U55 (4.8 TOPS)
- NXP i.MX RT1170 (Cortex-M7, 1GHz)
- STM32MP1 시리즈 (Cortex-A7 + M4)
- Renesas RZ/V2L (Cortex-A55 + DRP-AI)

---

### 2.3 Edge AI (엣지 AI)

**정의:** 클라우드가 아닌 로컬 엣지 디바이스에서 AI 처리를 수행하는 시스템. Embedded AI보다 더 강력한 연산 능력 보유

**특징:**
- 높은 연산 성능 (수 TOPS ~ 수백 TOPS)
- 전체 운영체제 (Linux, Android) 구동
- 복잡한 딥러닝 모델 실행 가능
- 모델 크기: 50MB ~ 수 GB
- 저지연 실시간 처리

**하드웨어 요구사항:**

| 항목 | 사양 |
|------|------|
| **CPU** | ARM Cortex-A72/A76/A78, x86 |
| **클럭 속도** | 1.5GHz ~ 3GHz |
| **RAM** | 2GB ~ 32GB |
| **Storage** | 16GB ~ 256GB |
| **전력 소비** | 5W ~ 60W |
| **NPU/가속기** | 전용 NPU, GPU (10~275 TOPS) |

**주요 하드웨어 플랫폼:**
- NVIDIA Jetson Orin Nano (40 TOPS, 7~15W)
- NVIDIA Jetson Orin NX (100 TOPS, 10~25W)
- NVIDIA Jetson AGX Orin (275 TOPS, 15~60W)
- Google Edge TPU (4 TOPS, 2W)
- Intel Movidius Myriad X (4 TOPS)
- Qualcomm QCS8550 (48 TOPS NPU)
- Rockchip RK3588 (6 TOPS NPU)

---

### 2.4 On-Device AI (온디바이스 AI)

**정의:** 스마트폰, 태블릿, 스마트 가전 등 최종 사용자 기기에서 직접 AI를 수행하는 기술. 마케팅 용어로도 많이 사용됨

**특징:**
- 사용자 프라이버시 보호 (데이터가 기기 외부로 나가지 않음)
- 오프라인 동작 가능
- 실시간 반응성
- 클라우드 비용 절감

**하드웨어 요구사항:**

| 항목 | 스마트폰급 | 스마트 가전급 |
|------|-----------|--------------|
| **CPU** | ARM Cortex-A78/X3 | Cortex-A55/A72 |
| **클럭 속도** | 2.5GHz ~ 3.4GHz | 1.5GHz ~ 2.2GHz |
| **RAM** | 8GB ~ 16GB | 1GB ~ 4GB |
| **NPU** | 15 ~ 45 TOPS | 2 ~ 10 TOPS |
| **전력** | 3W ~ 10W | 2W ~ 15W |

**주요 칩셋:**
- **스마트폰:** Qualcomm Snapdragon 8 Gen 3 (45 TOPS), Apple A17 Pro (35 TOPS), Samsung Exynos 2400 (37 TOPS)
- **가전용:** Samsung Exynos W930 (웨어러블), MediaTek Genio 시리즈, Amlogic A311D

---

## 3. AI 유형별 비교 요약표

| 구분 | TinyML | Embedded AI | Edge AI | On-Device AI |
|------|--------|-------------|---------|--------------|
| **메모리(RAM)** | 16KB ~ 512KB | 512KB ~ 1GB | 2GB ~ 32GB | 1GB ~ 16GB |
| **저장공간** | 64KB ~ 2MB | 2MB ~ 8GB | 16GB ~ 256GB | 8GB ~ 256GB |
| **CPU** | Cortex-M0~M4 | Cortex-M7/A55 | Cortex-A72+ | Cortex-A78+ |
| **클럭** | 16~400MHz | 200MHz~1.5GHz | 1.5~3GHz | 2~3.4GHz |
| **NPU** | 없음/DSP | 1~5 TOPS | 10~275 TOPS | 15~45 TOPS |
| **전력** | μW~100mW | 100mW~5W | 5W~60W | 2W~15W |
| **모델 크기** | 2KB~500KB | 500KB~50MB | 50MB~수GB | 10MB~수GB |
| **OS** | 베어메탈/RTOS | RTOS/경량Linux | Linux/Android | 전용OS/Android |
| **연결성** | 오프라인 | 선택적 | 선택적 | 선택적 |

---

## 4. 적용 분야별 상세 분류

### 4.1 스마트 홈 가전

#### 4.1.1 냉장고

| AI 기능 | AI 유형 | 필요 리소스 | 설명 |
|---------|---------|-------------|------|
| 식품 인식 | Edge AI | NPU 5-10 TOPS, 2GB RAM | 카메라로 식품 자동 인식 |
| 유통기한 관리 | Embedded AI | Cortex-A55, 512MB RAM | 식품별 유통기한 추적 |
| 레시피 추천 | On-Device AI | NPU 2-5 TOPS, 1GB RAM | 보유 식재료 기반 추천 |
| 에너지 최적화 | TinyML | Cortex-M4, 256KB RAM | 사용 패턴 학습, 냉각 최적화 |
| 음성 인식 | Edge AI | NPU 5 TOPS, 1GB RAM | 음성 명령 처리 |

**대표 제품:** Samsung Family Hub, LG ThinQ 냉장고

#### 4.1.2 세탁기/건조기

| AI 기능 | AI 유형 | 필요 리소스 | 설명 |
|---------|---------|-------------|------|
| 세탁물 무게 감지 | TinyML | Cortex-M0+, 64KB RAM | 센서 데이터 기반 무게 추정 |
| 세탁물 재질 인식 | Embedded AI | Cortex-M4, 256KB RAM | 센서 퓨전으로 재질 판별 |
| 최적 코스 추천 | Embedded AI | Cortex-M7, 512KB RAM | 무게/재질/오염도 기반 코스 자동 선택 |
| 이상 진동 감지 | TinyML | Cortex-M0, 32KB RAM | 비정상 진동 패턴 감지 |
| 에너지 사용 최적화 | TinyML | Cortex-M4, 128KB RAM | 전력 피크 시간 회피 |

**대표 제품:** Samsung AI Ecobubble, LG AI DD

#### 4.1.3 로봇 청소기

| AI 기능 | AI 유형 | 필요 리소스 | 설명 |
|---------|---------|-------------|------|
| SLAM (공간 매핑) | Edge AI | NPU 2-10 TOPS, 2GB RAM | 실시간 지도 생성 및 위치 추정 |
| 장애물 인식/회피 | Edge AI | NPU 5-15 TOPS, 2GB RAM | 카메라/라이다로 장애물 분류 |
| 바닥재 인식 | Embedded AI | Cortex-M7, 512KB RAM | 카펫/하드우드 자동 인식 |
| 오염도 감지 | TinyML | Cortex-M4, 256KB RAM | 먼지 센서 데이터 분석 |
| 청소 경로 최적화 | Embedded AI | Cortex-A55, 1GB RAM | AI 기반 효율적 경로 계획 |
| 음성 명령 | Edge AI | NPU 2-5 TOPS, 1GB RAM | "거실 청소해줘" 등 명령 인식 |
| 펫/사람 인식 | Edge AI | NPU 5-10 TOPS, 2GB RAM | 실시간 객체 인식으로 회피 |

**대표 제품:** iRobot Roomba j9+, Roborock S8 MaxV, Samsung Bespoke Jet Bot AI

#### 4.1.4 에어컨/공기청정기

| AI 기능 | AI 유형 | 필요 리소스 | 설명 |
|---------|---------|-------------|------|
| 사용 패턴 학습 | TinyML | Cortex-M4, 128KB RAM | 시간대별 선호 온도 학습 |
| 재실 감지 | Embedded AI | Cortex-M7, 256KB RAM | 적외선/레이더 센서로 사람 감지 |
| 공기질 예측 | Embedded AI | Cortex-M4, 256KB RAM | 센서 데이터 기반 공기질 예측 |
| 에너지 최적화 | TinyML | Cortex-M0+, 64KB RAM | 외부 온도/습도 기반 효율 운전 |
| 음성 제어 | Edge AI | NPU 2-5 TOPS, 1GB RAM | 음성 명령 처리 |

**대표 제품:** Samsung Wind-Free AI, LG ThinQ 에어컨, Dyson Purifier

#### 4.1.5 스마트 TV

| AI 기능 | AI 유형 | 필요 리소스 | 설명 |
|---------|---------|-------------|------|
| AI 업스케일링 | Edge AI | NPU 5-15 TOPS, 2GB RAM | 저해상도→고해상도 실시간 변환 |
| 음성 인식 | Edge AI | NPU 2-5 TOPS, 1GB RAM | 음성 검색 및 제어 |
| 장면 인식 | Embedded AI | NPU 2-5 TOPS, 1GB RAM | 스포츠/영화/게임 자동 모드 전환 |
| 사운드 최적화 | Embedded AI | DSP, 512KB RAM | 콘텐츠별 음향 자동 조절 |
| 시청 습관 분석 | TinyML | Cortex-M4, 256KB RAM | 콘텐츠 추천을 위한 분석 |

**대표 제품:** Samsung Neo QLED AI TV, LG OLED AI ThinQ, Sony Bravia XR

---

### 4.2 웨어러블 기기

| 기기 | AI 기능 | AI 유형 | 필요 리소스 |
|------|---------|---------|-------------|
| **스마트워치** | 심박/ECG 분석 | TinyML | Cortex-M4, 256KB RAM |
| | 활동 인식 | TinyML | Cortex-M4, 128KB RAM |
| | 수면 분석 | TinyML | Cortex-M0+, 64KB RAM |
| | 음성 비서 | Embedded AI | NPU 1-2 TOPS, 512MB RAM |
| **무선 이어폰** | 노이즈 캔슬링 | TinyML | DSP, 64KB RAM |
| | 음성 감지 | TinyML | Cortex-M0, 32KB RAM |
| | 착용 감지 | TinyML | Cortex-M0, 16KB RAM |
| **스마트 안경** | 객체 인식 | Edge AI | NPU 5-10 TOPS, 2GB RAM |
| | 실시간 번역 | Edge AI | NPU 5 TOPS, 2GB RAM |

---

### 4.3 산업용 IoT (IIoT)

| 분야 | AI 기능 | AI 유형 | 필요 리소스 |
|------|---------|---------|-------------|
| **예측 유지보수** | 진동 분석 | TinyML | Cortex-M4, 256KB RAM |
| | 이상 탐지 | Embedded AI | Cortex-M7, 512KB RAM |
| | 고장 예측 | Edge AI | NPU 2-10 TOPS, 2GB RAM |
| **품질 검사** | 시각 검사 | Edge AI | NPU 10-50 TOPS, 4GB RAM |
| | 결함 분류 | Edge AI | NPU 5-20 TOPS, 2GB RAM |
| **공정 최적화** | 센서 퓨전 | Embedded AI | Cortex-A55, 1GB RAM |
| | 실시간 조정 | Edge AI | NPU 5-15 TOPS, 2GB RAM |

---

### 4.4 스마트 농업

| AI 기능 | AI 유형 | 필요 리소스 | 설명 |
|---------|---------|-------------|------|
| 토양 수분 예측 | TinyML | Cortex-M0+, 64KB RAM | 센서 데이터 기반 관수 시점 예측 |
| 작물 상태 모니터링 | Embedded AI | Cortex-M4, 512KB RAM | 이미지 기반 생육 상태 분석 |
| 병충해 감지 | Edge AI | NPU 5-10 TOPS, 2GB RAM | 카메라 기반 병충해 조기 발견 |
| 수확 시기 예측 | Embedded AI | Cortex-A55, 1GB RAM | 다중 센서 데이터 분석 |
| 드론 자율비행 | Edge AI | NPU 10-40 TOPS, 4GB RAM | 실시간 경로 계획 및 회피 |

---

### 4.5 헬스케어/의료기기

| 기기 | AI 기능 | AI 유형 | 필요 리소스 |
|------|---------|---------|-------------|
| **혈당측정기** | 혈당 예측 | TinyML | Cortex-M0+, 64KB RAM |
| **휴대용 ECG** | 부정맥 감지 | TinyML | Cortex-M4, 256KB RAM |
| **보청기** | 음성 향상 | TinyML | DSP, 128KB RAM |
| | 환경 적응 | TinyML | Cortex-M4, 256KB RAM |
| **수면무호흡 감지기** | 호흡 분석 | TinyML | Cortex-M4, 256KB RAM |
| **휴대용 초음파** | 이미지 분석 | Edge AI | NPU 10-20 TOPS, 4GB RAM |

---

### 4.6 자동차 (차량용 AI)

| AI 기능 | AI 유형 | 필요 리소스 | 설명 |
|---------|---------|-------------|------|
| ADAS (운전자 보조) | Edge AI | NPU 20-100 TOPS, 8GB RAM | 차선 유지, 충돌 방지 |
| 음성 비서 | Edge AI | NPU 5-15 TOPS, 4GB RAM | 차량 내 음성 제어 |
| 운전자 모니터링 | Edge AI | NPU 5-15 TOPS, 2GB RAM | 졸음/부주의 감지 |
| 차량 진단 | Embedded AI | Cortex-A55, 1GB RAM | 이상 징후 조기 감지 |
| 타이어 압력 예측 | TinyML | Cortex-M0, 32KB RAM | 센서 기반 압력 변화 예측 |

---

### 4.7 스마트 시티/인프라

| 분야 | AI 기능 | AI 유형 | 필요 리소스 |
|------|---------|---------|-------------|
| **가로등** | 조도 자동 조절 | TinyML | Cortex-M0, 32KB RAM |
| | 사람/차량 감지 | TinyML | Cortex-M4, 256KB RAM |
| **주차장** | 빈자리 감지 | TinyML | Cortex-M0+, 64KB RAM |
| | 번호판 인식 | Edge AI | NPU 5-10 TOPS, 2GB RAM |
| **CCTV** | 객체 감지 | Edge AI | NPU 5-20 TOPS, 2GB RAM |
| | 이상 행동 탐지 | Edge AI | NPU 10-30 TOPS, 4GB RAM |
| **스마트 미터** | 에너지 사용 예측 | TinyML | Cortex-M0+, 64KB RAM |

---

## 5. 주요 하드웨어 플랫폼 상세

### 5.1 TinyML용 MCU

| 플랫폼 | CPU | 클럭 | RAM | Flash | 특징 |
|--------|-----|------|-----|-------|------|
| Arduino Nano 33 BLE | Cortex-M4F | 64MHz | 256KB | 1MB | BLE 내장, TFLite 지원 |
| ESP32-S3 | Xtensa LX7 | 240MHz | 512KB | 16MB | WiFi/BLE, AI 가속기 |
| STM32L4R9 | Cortex-M4 | 120MHz | 640KB | 2MB | 초저전력, DSP |
| Nordic nRF5340 | Cortex-M33 | 128MHz | 512KB | 1MB | BLE 5.3, TrustZone |
| RP2040 | Cortex-M0+ x2 | 133MHz | 264KB | 외장 | 듀얼코어, 저가 |

### 5.2 Embedded AI용 MCU/MPU

| 플랫폼 | CPU | NPU/가속기 | RAM | 전력 | 특징 |
|--------|-----|-----------|-----|------|------|
| STM32N6 | Cortex-M55 | Ethos-U65 (2 TOPS) | 4.2MB | ~500mW | ST 최신 AI MCU |
| NXP i.MX RT1170 | Cortex-M7 | DSP | 2MB | ~1W | 1GHz, 실시간 AI |
| Renesas RA8 | Cortex-M85 | Helium | 1MB | ~300mW | 최신 Cortex-M |
| Alif E7 | Cortex-M55 | Ethos-U55 (1 TOPS) | 13.5MB | ~100mW | 초저전력 AI |

### 5.3 Edge AI용 SoC

| 플랫폼 | CPU | NPU/GPU | RAM | 전력 | TOPS | 용도 |
|--------|-----|---------|-----|------|------|------|
| NVIDIA Jetson Orin Nano | Cortex-A78 x6 | Ampere GPU | 8GB | 7-15W | 40 | 로봇, 드론 |
| NVIDIA Jetson Orin NX | Cortex-A78 x8 | Ampere GPU | 16GB | 10-25W | 100 | 산업용 AI |
| NVIDIA Jetson AGX Orin | Cortex-A78 x12 | Ampere GPU | 32-64GB | 15-60W | 275 | 자율주행 |
| Google Edge TPU | 외장 | TPU | 외장 | 2W | 4 | 추론 전용 |
| Qualcomm QCS8550 | Cortex-A78 x8 | Hexagon NPU | 16GB | 15W | 48 | 카메라, 로봇 |
| Rockchip RK3588 | Cortex-A76 x4 | NPU | 8GB | 10W | 6 | 스마트 디스플레이 |
| Amlogic A311D2 | Cortex-A73 x4 | NPU | 4GB | 8W | 5 | 스마트 TV, 가전 |

---

## 6. AI 모델 최적화 기술

### 6.1 양자화 (Quantization)

| 유형 | 정밀도 | 모델 크기 감소 | 정확도 손실 | 적용 대상 |
|------|--------|---------------|-------------|-----------|
| FP32 (원본) | 32비트 | 기준 | 없음 | 클라우드 |
| FP16 | 16비트 | 50% | 최소 | Edge AI |
| INT8 | 8비트 | 75% | 1-3% | Embedded/Edge |
| INT4 | 4비트 | 87.5% | 3-10% | TinyML |
| Binary (1비트) | 1비트 | 97% | 10-30% | 극한 TinyML |

### 6.2 기타 최적화 기법

| 기법 | 설명 | 효과 |
|------|------|------|
| **Pruning (가지치기)** | 중요도 낮은 가중치 제거 | 모델 크기 50-90% 감소 |
| **Knowledge Distillation** | 큰 모델→작은 모델 지식 전이 | 작은 모델로 유사 성능 |
| **Neural Architecture Search** | 최적 구조 자동 탐색 | 효율적인 아키텍처 발견 |
| **Operator Fusion** | 여러 연산을 하나로 결합 | 추론 속도 향상 |

---

## 7. 프레임워크 및 개발 도구

### 7.1 TinyML 프레임워크

| 프레임워크 | 개발사 | 최소 메모리 | 특징 |
|------------|--------|-------------|------|
| TensorFlow Lite Micro | Google | 2KB | 가장 널리 사용, ARM 최적화 |
| Edge Impulse | Edge Impulse | 2KB | 클라우드 기반 AutoML |
| microTVM | Apache | 수 KB | 유연한 컴파일러 |
| CMSIS-NN | ARM | 수 KB | ARM Cortex-M 최적화 |
| STM32Cube.AI | ST | 수 KB | STM32 전용 |

### 7.2 Edge AI 프레임워크

| 프레임워크 | 개발사 | 지원 하드웨어 | 특징 |
|------------|--------|--------------|------|
| NVIDIA TensorRT | NVIDIA | Jetson, GPU | 고성능 추론 최적화 |
| ONNX Runtime | Microsoft | 범용 | 크로스플랫폼 |
| OpenVINO | Intel | Intel CPU/GPU/VPU | Intel 하드웨어 최적화 |
| Qualcomm AI Engine | Qualcomm | Snapdragon | 모바일/IoT 최적화 |
| MediaPipe | Google | 범용 | 멀티미디어 AI 파이프라인 |

---

## 8. 시장 동향 및 전망 (2025)

### 8.1 시장 규모

| 분야 | 2024년 | 2025년 예상 | 2030년 전망 |
|------|--------|-------------|-------------|
| Edge AI | $150억 | $200억 | $600억 |
| TinyML | $10억 | $15억 | $80억 |
| 스마트 가전 AI | $80억 | $110억 | $300억 |

### 8.2 주요 트렌드

1. **온디바이스 LLM**: 9B 파라미터 이하 모델이 엣지에서 구동 가능
2. **NPU 보급 확대**: 저가 MCU에도 AI 가속기 내장
3. **프라이버시 중시**: 데이터 로컬 처리 수요 증가
4. **초저전력 AI**: μW 단위 전력으로 상시 AI 구동
5. **멀티모달 AI**: 음성+비전+센서 통합 처리

---

## 9. 결론

소형 가전 및 IoT 기기에 적용되는 AI는 리소스 요구사항과 적용 분야에 따라 TinyML, Embedded AI, Edge AI, On-Device AI로 구분됩니다.

- **TinyML**: 배터리 구동, 상시 모니터링이 필요한 초소형 기기
- **Embedded AI**: 센서 퓨전, 실시간 제어가 필요한 가전/산업 기기
- **Edge AI**: 복잡한 비전/음성 AI가 필요한 고성능 기기
- **On-Device AI**: 사용자 프라이버시와 오프라인 동작이 중요한 스마트 기기

2025년에는 NPU 보급 확대와 모델 최적화 기술 발전으로, 더 작은 기기에서 더 강력한 AI가 구동되는 추세가 가속화되고 있습니다.

---

## 참고 자료

- [TinyML: Machine Learning at the Edge](https://research.aimultiple.com/tinyml/)
- [Edge LLM Deployment in 2025](https://kodekx-solutions.medium.com/edge-llm-deployment-on-small-devices-the-2025-guide-2eafb7c59d07)
- [TinyML - Harvard Edge Computing Lab](https://edge.seas.harvard.edu/tinyml)
- [Edge AI Architecture and the Race for Embedded Intelligence](https://www.embedded.com/edge-ai-architecture-and-the-race-for-embedded-intelligence/)
- [TinyML and Edge AI on Resource-Constrained Devices](https://areeblog.com/tinyml-and-edge-ai-on-resource-constrained-devices/)
- [Top 8 TinyML Frameworks](https://www.dfrobot.com/blog-13921.html)

---

*본 보고서는 2025년 12월 15일 기준으로 작성되었습니다.*
