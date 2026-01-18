# 공장 자동화 AI 비전 검사 시스템 도입 가이드

## 목차
1. [개요](#1-개요)
2. [프로젝트 추진 절차](#2-프로젝트-추진-절차)
3. [Phase 1: 현황 분석 및 요구사항 정의](#3-phase-1-현황-분석-및-요구사항-정의)
4. [Phase 2: 시스템 설계](#4-phase-2-시스템-설계)
5. [Phase 3: 데이터 수집 및 전처리](#5-phase-3-데이터-수집-및-전처리)
6. [Phase 4: AI 모델 개발](#6-phase-4-ai-모델-개발)
7. [Phase 5: 시스템 통합 및 테스트](#7-phase-5-시스템-통합-및-테스트)
8. [Phase 6: 현장 배포 및 운영](#8-phase-6-현장-배포-및-운영)
9. [하드웨어 구성 가이드](#9-하드웨어-구성-가이드)
10. [소프트웨어 아키텍처](#10-소프트웨어-아키텍처)
11. [비용 산정 및 ROI 분석](#11-비용-산정-및-roi-분석)
12. [체크리스트](#12-체크리스트)

---

## 1. 개요

### 1.1 AI 비전 검사 시스템이란?
AI 비전 검사 시스템은 카메라로 촬영한 제품 이미지를 인공지능(딥러닝) 알고리즘으로 분석하여 불량품을 자동으로 선별하는 시스템입니다.

### 1.2 기존 검사 방식과의 비교

| 구분 | 육안 검사 | Rule-based 비전 | AI 비전 검사 |
|------|----------|-----------------|--------------|
| 검사 속도 | 느림 | 빠름 | 빠름 |
| 일관성 | 낮음 (피로도 영향) | 높음 | 높음 |
| 복잡한 불량 검출 | 가능 | 어려움 | 가능 |
| 새로운 불량 대응 | 즉시 | 재개발 필요 | 재학습으로 대응 |
| 초기 비용 | 낮음 | 중간 | 높음 |
| 운영 비용 | 높음 | 낮음 | 낮음 |

### 1.3 적용 가능한 불량 유형
- **외관 불량**: 스크래치, 찍힘, 변색, 오염
- **형상 불량**: 변형, 치수 불량, 누락
- **조립 불량**: 오조립, 미조립, 위치 틀어짐
- **표면 결함**: 크랙, 기포, 이물질

---

## 2. 프로젝트 추진 절차

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AI 비전 검사 시스템 도입 로드맵                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Phase 1        Phase 2        Phase 3        Phase 4              │
│  ┌─────┐       ┌─────┐        ┌─────┐        ┌─────┐              │
│  │현황 │──────▶│시스템│───────▶│데이터│───────▶│모델 │              │
│  │분석 │       │설계 │        │수집 │        │개발 │              │
│  └─────┘       └─────┘        └─────┘        └─────┘              │
│                                                   │                 │
│                                                   ▼                 │
│  Phase 6        Phase 5                                            │
│  ┌─────┐       ┌─────┐                                            │
│  │현장 │◀──────│통합 │                                            │
│  │배포 │       │테스트│                                            │
│  └─────┘       └─────┘                                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Phase 1: 현황 분석 및 요구사항 정의

### 3.1 현장 조사 항목

#### 3.1.1 생산 라인 분석
```yaml
생산라인_정보:
  - 라인명:
  - 생산품목:
  - 일일_생산량:
  - 라인_속도: # 예: 60 ppm (parts per minute)
  - 택트_타임: # 예: 1초/개
  - 가동_시간: # 예: 24시간 3교대
```

#### 3.1.2 검사 대상 제품 분석
```yaml
제품_정보:
  - 제품명:
  - 제품_크기: # L x W x H (mm)
  - 검사_면: # 상면, 하면, 측면 등
  - 색상:
  - 재질:
  - 표면_특성: # 반사, 무광, 투명 등
```

#### 3.1.3 불량 유형 분류
| 불량 유형 | 발생 빈도 | 심각도 | 검출 난이도 | 현재 검출율 |
|----------|----------|--------|------------|------------|
| 스크래치 | 높음 | 중 | 중 | 70% |
| 찍힘 | 중간 | 고 | 하 | 90% |
| 변색 | 낮음 | 고 | 중 | 60% |
| 치수불량 | 낮음 | 고 | 고 | 50% |

### 3.2 요구사항 정의서

#### 3.2.1 성능 요구사항
```yaml
성능_요구사항:
  검출율: 99.5% 이상  # True Positive Rate
  오검출율: 0.1% 이하  # False Positive Rate
  처리속도: 100ms 이하/개
  가동률: 99.9% 이상
```

#### 3.2.2 환경 요구사항
```yaml
환경_요구사항:
  온도범위: 10°C ~ 40°C
  습도범위: 30% ~ 80% RH
  조명조건: 가변 (주간/야간)
  진동: 산업용 환경 수준
  분진: 일반 공장 수준
```

### 3.3 KPI 설정

| KPI 항목 | 현재 수준 | 목표 수준 | 측정 방법 |
|---------|----------|----------|----------|
| 불량 검출율 | 85% | 99.5% | 실제 불량 대비 검출 수 |
| 오검출율 | 5% | 0.1% | 양품 중 불량 판정 수 |
| 검사 시간 | 2초/개 | 0.1초/개 | 평균 처리 시간 |
| 인력 투입 | 3명/라인 | 0.5명/라인 | 검사 담당 인원 |

---

## 4. Phase 2: 시스템 설계

### 4.1 시스템 구성도

```
┌──────────────────────────────────────────────────────────────────────┐
│                        AI 비전 검사 시스템 구성도                       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐         │
│   │  조명   │    │ 카메라  │    │   AI    │    │  PLC/   │         │
│   │ 시스템  │    │         │    │  서버   │    │ Robot   │         │
│   └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘         │
│        │              │              │              │               │
│        ▼              ▼              ▼              ▼               │
│   ┌─────────────────────────────────────────────────────────┐      │
│   │                    생산 라인 (컨베이어)                    │      │
│   │  ○ ─ ○ ─ ○ ─ ○ ─ [검사] ─ ○ ─ ○ ─ [배출] ─ ○ ─ ○      │      │
│   │                      ▲              ▲                    │      │
│   │                   양품/불량       불량품                  │      │
│   │                   판정 위치       배출 위치              │      │
│   └─────────────────────────────────────────────────────────┘      │
│                                                                      │
│   ┌─────────────────────────────────────────────────────────┐      │
│   │                      데이터 플로우                        │      │
│   │                                                          │      │
│   │  카메라 ──▶ 이미지 ──▶ AI 추론 ──▶ 판정 ──▶ PLC 신호   │      │
│   │                          │                               │      │
│   │                          ▼                               │      │
│   │                    결과 저장/분석                         │      │
│   └─────────────────────────────────────────────────────────┘      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.2 카메라 선정 가이드

#### 4.2.1 카메라 유형별 특징
| 유형 | 장점 | 단점 | 적용 사례 |
|------|-----|------|----------|
| Area Scan | 정지 이미지, 고해상도 | 고속 라인 부적합 | 정지 검사 |
| Line Scan | 고속 대응, 연속 검사 | 조명 설계 복잡 | 컨베이어 검사 |
| 3D Camera | 깊이 정보 획득 | 고가, 처리 복잡 | 형상/조립 검사 |

#### 4.2.2 해상도 계산
```
필요 해상도 계산 공식:

해상도 = (검사 영역 크기) / (검출 최소 결함 크기 / 3)

예시:
- 검사 영역: 100mm x 100mm
- 최소 결함: 0.1mm
- 필요 해상도: 100mm / (0.1mm/3) = 3000 pixels
- 카메라 선정: 3000 x 3000 = 9MP 이상
```

#### 4.2.3 추천 카메라 사양
```yaml
산업용_카메라_사양:
  해상도: 5MP ~ 20MP
  센서타입: CMOS (Global Shutter)
  프레임레이트: 30fps 이상
  인터페이스: GigE Vision / USB3.0
  색상: 용도에 따라 선택 (Mono/Color)

추천_제조사:
  - Basler (ace 시리즈)
  - FLIR (Blackfly 시리즈)
  - Hikvision (산업용)
  - IDS (uEye)
```

### 4.3 조명 설계

#### 4.3.1 조명 유형별 적용
```
┌────────────────────────────────────────────────────────────┐
│                    조명 유형 선정 가이드                     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  1. 링 조명 (Ring Light)                                   │
│     └── 적용: 균일한 조명, 그림자 제거                      │
│     └── 용도: 표면 검사, 문자 인식                         │
│                                                            │
│  2. 바 조명 (Bar Light)                                    │
│     └── 적용: 넓은 영역 조명                               │
│     └── 용도: 라인스캔, 대형 제품                          │
│                                                            │
│  3. 돔 조명 (Dome Light)                                   │
│     └── 적용: 반사 표면, 곡면                              │
│     └── 용도: 금속/유리 제품, 광택면                       │
│                                                            │
│  4. 백라이트 (Back Light)                                  │
│     └── 적용: 실루엣, 외곽선                               │
│     └── 용도: 치수 측정, 구멍/홀 검사                      │
│                                                            │
│  5. 로우앵글 조명 (Low Angle)                              │
│     └── 적용: 미세 결함 강조                               │
│     └── 용도: 스크래치, 표면 요철                          │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 4.4 AI 서버 사양

#### 4.4.1 Edge AI vs Cloud AI

| 구분 | Edge AI | Cloud AI |
|------|---------|----------|
| 지연시간 | 매우 낮음 (< 50ms) | 높음 (> 200ms) |
| 네트워크 의존성 | 없음 | 높음 |
| 확장성 | 제한적 | 높음 |
| 비용 | 초기 투자 높음 | 운영비 누적 |
| 보안 | 높음 (로컬 처리) | 주의 필요 |

**권장: 실시간 검사에는 Edge AI 방식 권장**

#### 4.4.2 Edge AI 서버 사양
```yaml
권장_사양:
  CPU: Intel i7 12th Gen 이상 / AMD Ryzen 7
  RAM: 32GB DDR4 이상
  GPU: NVIDIA RTX 3060 이상 (CUDA 지원)
  Storage: NVMe SSD 512GB 이상
  OS: Ubuntu 20.04 LTS / Windows 10/11

고성능_사양:
  CPU: Intel Xeon / AMD EPYC
  RAM: 64GB ECC
  GPU: NVIDIA RTX 4090 / A4000
  Storage: NVMe SSD 1TB RAID

임베디드_옵션:
  - NVIDIA Jetson AGX Orin
  - Intel NUC (with discrete GPU)
  - Industrial PC with GPU
```

---

## 5. Phase 3: 데이터 수집 및 전처리

### 5.1 데이터 수집 전략

#### 5.1.1 필요 데이터 양 가이드
```yaml
데이터_수량_가이드:
  분류_모델:
    최소: 클래스당 500장
    권장: 클래스당 2,000~5,000장

  객체_탐지_모델:
    최소: 클래스당 1,000장
    권장: 클래스당 3,000~10,000장

  세그멘테이션_모델:
    최소: 클래스당 1,000장
    권장: 클래스당 5,000~15,000장
```

#### 5.1.2 데이터 수집 체크리스트
```
□ 양품 이미지 수집
  ├── 다양한 위치/각도
  ├── 조명 변화 반영
  └── 제품 variation 포함

□ 불량품 이미지 수집
  ├── 불량 유형별 분류
  ├── 불량 심각도별 분류
  └── 경계 케이스 포함

□ 촬영 조건 기록
  ├── 카메라 설정값
  ├── 조명 조건
  └── 환경 조건 (온도, 습도)
```

### 5.2 데이터 라벨링

#### 5.2.1 라벨링 도구 선택
| 도구 | 유형 | 비용 | 특징 |
|------|-----|------|------|
| LabelImg | 오픈소스 | 무료 | Bounding Box |
| CVAT | 오픈소스 | 무료 | 다기능, 협업 |
| Labelbox | 상용 | 유료 | 자동화, 협업 |
| Roboflow | 상용 | 부분무료 | 통합 파이프라인 |

#### 5.2.2 라벨링 가이드라인 예시
```yaml
라벨링_규칙:
  클래스_정의:
    - OK: 양품
    - NG_scratch: 스크래치 불량
    - NG_dent: 찍힘 불량
    - NG_stain: 오염 불량
    - NG_deform: 변형 불량

  바운딩_박스_규칙:
    - 결함 영역을 tight하게 감싸기
    - 최소 margin: 결함 크기의 10%
    - 중복 결함: 개별 박스로 처리

  품질_기준:
    - 라벨 정확도: 98% 이상
    - 교차 검증: 2인 이상 검토
```

### 5.3 데이터 증강 (Data Augmentation)

```python
# 데이터 증강 예시 코드 (Python/Albumentations)

import albumentations as A

transform = A.Compose([
    # 기하학적 변환
    A.Rotate(limit=15, p=0.5),
    A.HorizontalFlip(p=0.5),
    A.VerticalFlip(p=0.3),
    A.ShiftScaleRotate(shift_limit=0.1, scale_limit=0.1, p=0.5),

    # 색상/밝기 변환
    A.RandomBrightnessContrast(brightness_limit=0.2, contrast_limit=0.2, p=0.5),
    A.GaussNoise(var_limit=(10, 50), p=0.3),
    A.GaussianBlur(blur_limit=3, p=0.2),

    # 정규화
    A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])
```

### 5.4 데이터셋 분할

```yaml
데이터셋_분할_비율:
  훈련셋 (Train): 70%
  검증셋 (Validation): 15%
  테스트셋 (Test): 15%

주의사항:
  - 클래스 불균형 고려 (Stratified Split)
  - 시간순 분할 고려 (시계열 데이터)
  - 생산 로트별 분할 (일반화 성능)
```

---

## 6. Phase 4: AI 모델 개발

### 6.1 모델 아키텍처 선택

#### 6.1.1 용도별 추천 모델

| 용도 | 추천 모델 | 특징 |
|------|----------|------|
| 양품/불량 분류 | EfficientNet, ResNet | 빠른 추론, 높은 정확도 |
| 불량 위치 검출 | YOLOv8, DETR | 실시간 객체 탐지 |
| 불량 영역 분할 | U-Net, DeepLabV3+ | 픽셀 단위 정밀 분석 |
| 이상 탐지 | AutoEncoder, PatchCore | 양품만으로 학습 가능 |

#### 6.1.2 모델별 상세 비교
```yaml
분류_모델:
  EfficientNet-B4:
    정확도: 매우 높음
    속도: 빠름 (15ms/image on GPU)
    파라미터: 19M

  ResNet-50:
    정확도: 높음
    속도: 빠름 (10ms/image on GPU)
    파라미터: 25M

객체_탐지_모델:
  YOLOv8n:
    정확도: 높음
    속도: 매우 빠름 (5ms/image)
    용도: 실시간 검사

  YOLOv8x:
    정확도: 매우 높음
    속도: 빠름 (20ms/image)
    용도: 정밀 검사

이상_탐지_모델:
  PatchCore:
    장점: 양품만으로 학습 가능
    단점: 메모리 사용량 높음
    용도: 신규 불량 탐지
```

### 6.2 모델 학습 파이프라인

```python
# PyTorch 기반 학습 코드 예시

import torch
from torch.utils.data import DataLoader
from torchvision import models, transforms

# 1. 데이터 로더 설정
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)

# 2. 모델 정의 (Transfer Learning)
model = models.efficientnet_b4(pretrained=True)
model.classifier[-1] = torch.nn.Linear(model.classifier[-1].in_features, num_classes)

# 3. 학습 설정
criterion = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4)
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=100)

# 4. 학습 루프
for epoch in range(num_epochs):
    model.train()
    for images, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(images.cuda())
        loss = criterion(outputs, labels.cuda())
        loss.backward()
        optimizer.step()
    scheduler.step()

    # 검증
    model.eval()
    # ... validation loop
```

### 6.3 모델 최적화

#### 6.3.1 추론 속도 최적화
```yaml
최적화_기법:
  1. TensorRT 변환:
     - NVIDIA GPU 최적화
     - 2~5배 속도 향상

  2. ONNX 변환:
     - 크로스 플랫폼 호환
     - 추론 최적화

  3. 모델 경량화:
     - Quantization (INT8)
     - Pruning
     - Knowledge Distillation
```

#### 6.3.2 TensorRT 변환 예시
```python
import tensorrt as trt
import torch
from torch2trt import torch2trt

# PyTorch 모델을 TensorRT로 변환
model_trt = torch2trt(
    model,
    [torch.randn(1, 3, 224, 224).cuda()],
    fp16_mode=True,
    max_batch_size=1
)

# 저장
torch.save(model_trt.state_dict(), 'model_trt.pth')
```

### 6.4 모델 평가 지표

#### 6.4.1 분류 모델 평가
```
혼동 행렬 (Confusion Matrix):
                    예측
                 양품    불량
실제  양품      TN      FP
      불량      FN      TP

주요 지표:
- 정확도 (Accuracy) = (TP + TN) / Total
- 정밀도 (Precision) = TP / (TP + FP)
- 재현율 (Recall) = TP / (TP + FN)
- F1 Score = 2 * (Precision * Recall) / (Precision + Recall)

불량 검사에서 중요한 지표:
- 재현율 (Recall): 실제 불량을 얼마나 잡아내는가
- 목표: 99.5% 이상
```

#### 6.4.2 객체 탐지 모델 평가
```yaml
평가_지표:
  mAP (mean Average Precision):
    - mAP@50: IoU 50% 기준
    - mAP@50:95: IoU 50~95% 평균

  IoU (Intersection over Union):
    - 예측 영역과 실제 영역 겹침 비율

  추론_속도:
    - FPS (Frames Per Second)
    - Latency (ms)
```

---

## 7. Phase 5: 시스템 통합 및 테스트

### 7.1 소프트웨어 통합

#### 7.1.1 시스템 아키텍처
```
┌─────────────────────────────────────────────────────────────┐
│                    소프트웨어 아키텍처                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│  │   Camera    │    │   Image     │    │     AI      │    │
│  │   Driver    │───▶│ Processor   │───▶│   Engine    │    │
│  └─────────────┘    └─────────────┘    └──────┬──────┘    │
│                                               │            │
│                                               ▼            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│  │    PLC      │◀───│   Result    │◀───│   Post-     │    │
│  │Communication│    │   Handler   │    │ Processor   │    │
│  └─────────────┘    └─────────────┘    └─────────────┘    │
│                            │                               │
│                            ▼                               │
│                     ┌─────────────┐                       │
│                     │  Database   │                       │
│                     │  (결과저장)  │                       │
│                     └─────────────┘                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 7.1.2 통신 프로토콜
```yaml
카메라_통신:
  - GigE Vision (이더넷)
  - USB3 Vision
  - Camera Link

PLC_통신:
  - Modbus TCP/IP
  - EtherNet/IP
  - PROFINET
  - OPC UA

데이터_저장:
  - SQL Database (PostgreSQL, MySQL)
  - Time-series DB (InfluxDB)
  - 파일 시스템 (이미지 저장)
```

### 7.2 테스트 계획

#### 7.2.1 테스트 단계
```yaml
단위_테스트:
  - 카메라 이미지 획득 테스트
  - AI 모델 추론 테스트
  - PLC 통신 테스트

통합_테스트:
  - End-to-End 파이프라인 테스트
  - 처리 속도 테스트
  - 메모리 누수 테스트

성능_테스트:
  - 장시간 가동 테스트 (24시간 이상)
  - 스트레스 테스트
  - 동시 처리 테스트

현장_테스트:
  - 실제 라인 연동 테스트
  - 다양한 조건 테스트
  - 사용자 수용 테스트 (UAT)
```

#### 7.2.2 테스트 결과 기록 양식
| 테스트 항목 | 테스트 조건 | 예상 결과 | 실제 결과 | 합격/불합격 |
|------------|------------|----------|----------|------------|
| 검출 정확도 | 1000개 샘플 | 99.5% | | |
| 처리 속도 | 연속 1시간 | <100ms | | |
| 오검출율 | 양품 500개 | <0.1% | | |

### 7.3 PLC 연동

#### 7.3.1 신호 정의
```yaml
입력_신호: # PLC → AI 시스템
  - TRIG: 촬영 트리거
  - RESET: 시스템 리셋
  - MODE: 운전/정지 모드

출력_신호: # AI 시스템 → PLC
  - RESULT: 양품(0)/불량(1)
  - READY: 시스템 준비 상태
  - ERROR: 에러 발생
  - TYPE: 불량 유형 코드
```

#### 7.3.2 타이밍 다이어그램
```
        ┌───┐                   ┌───┐
TRIG ───┘   └───────────────────┘   └───────

            ┌───────────┐           ┌───────
BUSY ───────┘           └───────────┘

                    ┌───┐               ┌───
RESULT ─────────────┘   └───────────────┘

        |<-50ms->|<-100ms->|
           촬영      추론
```

---

## 8. Phase 6: 현장 배포 및 운영

### 8.1 배포 절차

```yaml
배포_체크리스트:
  설치_전:
    □ 설치 공간 확보
    □ 전원 공급 확인 (UPS 권장)
    □ 네트워크 환경 확인
    □ 관련자 교육 일정 수립

  설치:
    □ 하드웨어 설치
    □ 카메라/조명 정렬
    □ 소프트웨어 설치/설정
    □ PLC 연동 확인

  검증:
    □ 기능 테스트
    □ 성능 테스트
    □ 안정성 테스트
    □ 비상 정지 테스트

  인수:
    □ 운영자 교육
    □ 문서 인계
    □ 보증 조건 확인
```

### 8.2 운영 매뉴얼

#### 8.2.1 일상 점검 항목
```yaml
시작_전_점검:
  □ 카메라 렌즈 청소 상태
  □ 조명 정상 동작 확인
  □ 시스템 정상 부팅 확인
  □ PLC 통신 상태 확인

운전_중_모니터링:
  □ 검사 처리 속도
  □ 검출율/오검출율
  □ 시스템 리소스 (CPU, GPU, 메모리)

종료_시_점검:
  □ 데이터 백업 확인
  □ 로그 확인
  □ 이상 발생 여부 기록
```

#### 8.2.2 문제 해결 가이드
| 증상 | 가능한 원인 | 조치 방법 |
|------|------------|----------|
| 이미지 흐림 | 렌즈 오염, 진동 | 렌즈 청소, 고정 확인 |
| 오검출 증가 | 조명 변화, 제품 변경 | 조명 점검, 모델 재학습 |
| 처리 지연 | 시스템 과부하 | 불필요 프로세스 종료 |
| 통신 끊김 | 네트워크 문제 | 케이블/설정 확인 |

### 8.3 모델 재학습 및 업데이트

#### 8.3.1 재학습 트리거 조건
```yaml
재학습_시점:
  - 새로운 불량 유형 발생
  - 제품 디자인 변경
  - 검출 성능 저하 (목표 대비 2% 이상)
  - 오검출 증가 (기준 대비 50% 이상)
  - 정기 업데이트 (분기/반기)
```

#### 8.3.2 MLOps 파이프라인
```
┌─────────────────────────────────────────────────────────────┐
│                    MLOps 파이프라인                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐ │
│  │ 데이터  │───▶│  학습   │───▶│  평가   │───▶│  배포   │ │
│  │  수집   │    │         │    │         │    │         │ │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘ │
│       ▲                                            │       │
│       │                                            │       │
│       └────────────── 피드백 루프 ◀────────────────┘       │
│                                                             │
│  도구: MLflow, Weights & Biases, DVC                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. 하드웨어 구성 가이드

### 9.1 기본 구성 (소규모)

```yaml
기본_시스템_구성:
  카메라:
    모델: Basler ace acA2040-55uc
    해상도: 4MP
    프레임: 55fps
    가격: 약 80만원

  렌즈:
    모델: Computar M0814-MP2
    초점거리: 8mm
    가격: 약 15만원

  조명:
    모델: LED 링 조명 (100mm)
    컨트롤러: 4채널 조광 컨트롤러
    가격: 약 30만원

  AI_서버:
    모델: 산업용 PC + RTX 3060
    OS: Ubuntu 20.04 LTS
    가격: 약 250만원

  기타:
    - 카메라 브라켓/지그
    - 케이블/커넥터
    - 전원 공급 장치

  총_예상비용: 약 450만원
```

### 9.2 고급 구성 (대규모)

```yaml
고급_시스템_구성:
  카메라:
    모델: Basler ace 2 a2A5320-23ucPRO
    해상도: 20MP
    프레임: 23fps
    가격: 약 200만원

  렌즈:
    모델: Schneider 텔레센트릭 렌즈
    배율: 0.5X
    가격: 약 150만원

  조명:
    모델: 돔 조명 + 동축 조명
    컨트롤러: 스트로브 컨트롤러
    가격: 약 100만원

  AI_서버:
    모델: NVIDIA DGX Station
    GPU: A100 x 4
    가격: 약 3,000만원

  총_예상비용: 약 3,500만원 이상
```

### 9.3 임베디드 구성 (Edge AI)

```yaml
임베디드_시스템_구성:
  AI_보드:
    모델: NVIDIA Jetson AGX Orin
    성능: 275 TOPS
    가격: 약 250만원

  카메라:
    모델: FLIR Blackfly S (GigE)
    해상도: 5MP
    가격: 약 100만원

  장점:
    - 컴팩트한 크기
    - 저전력
    - 실시간 처리

  단점:
    - 대규모 모델 제한
    - 확장성 제한

  총_예상비용: 약 400만원
```

---

## 10. 소프트웨어 아키텍처

### 10.1 메인 프로그램 구조

```python
# main.py - AI 비전 검사 시스템 메인 프로그램

import cv2
import numpy as np
from camera import IndustrialCamera
from ai_engine import AIInspector
from plc_comm import PLCController
from database import ResultDatabase
from logger import SystemLogger

class VisionInspectionSystem:
    def __init__(self, config_path: str):
        self.config = self.load_config(config_path)
        self.camera = IndustrialCamera(self.config['camera'])
        self.ai_engine = AIInspector(self.config['model'])
        self.plc = PLCController(self.config['plc'])
        self.db = ResultDatabase(self.config['database'])
        self.logger = SystemLogger()

    def run(self):
        """메인 검사 루프"""
        self.logger.info("시스템 시작")

        while True:
            # 1. 트리거 대기
            if self.plc.wait_trigger():

                # 2. 이미지 획득
                image = self.camera.capture()

                # 3. AI 추론
                result = self.ai_engine.inspect(image)

                # 4. 결과 처리
                self.plc.send_result(result.is_ok)

                # 5. 결과 저장
                self.db.save_result(result)

                # 6. 로깅
                self.logger.log_inspection(result)

    def shutdown(self):
        """시스템 종료"""
        self.camera.release()
        self.plc.disconnect()
        self.db.close()
        self.logger.info("시스템 종료")

if __name__ == "__main__":
    system = VisionInspectionSystem("config.yaml")
    try:
        system.run()
    except KeyboardInterrupt:
        system.shutdown()
```

### 10.2 AI 엔진 구조

```python
# ai_engine.py - AI 추론 엔진

import torch
import numpy as np
from dataclasses import dataclass
from typing import List, Tuple

@dataclass
class InspectionResult:
    is_ok: bool
    confidence: float
    defect_type: str
    defect_location: List[Tuple[int, int, int, int]]
    inference_time: float
    image_path: str

class AIInspector:
    def __init__(self, config: dict):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = self.load_model(config['model_path'])
        self.threshold = config.get('threshold', 0.5)
        self.classes = config['classes']

    def load_model(self, model_path: str):
        """모델 로드 및 최적화"""
        model = torch.load(model_path)
        model.to(self.device)
        model.eval()
        return model

    def preprocess(self, image: np.ndarray) -> torch.Tensor:
        """이미지 전처리"""
        # Resize, Normalize, ToTensor
        image = cv2.resize(image, (224, 224))
        image = image.astype(np.float32) / 255.0
        image = (image - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
        tensor = torch.from_numpy(image).permute(2, 0, 1).unsqueeze(0)
        return tensor.to(self.device)

    def inspect(self, image: np.ndarray) -> InspectionResult:
        """AI 검사 수행"""
        import time
        start_time = time.time()

        # 전처리
        input_tensor = self.preprocess(image)

        # 추론
        with torch.no_grad():
            output = self.model(input_tensor)

        # 후처리
        probabilities = torch.softmax(output, dim=1)
        confidence, predicted = torch.max(probabilities, 1)

        inference_time = time.time() - start_time

        # 결과 생성
        is_ok = self.classes[predicted.item()] == 'OK'

        return InspectionResult(
            is_ok=is_ok,
            confidence=confidence.item(),
            defect_type=self.classes[predicted.item()],
            defect_location=[],
            inference_time=inference_time,
            image_path=""
        )
```

### 10.3 설정 파일 예시

```yaml
# config.yaml - 시스템 설정 파일

system:
  name: "AI Vision Inspection System"
  version: "1.0.0"
  line_id: "LINE-01"

camera:
  type: "GigE"
  ip: "192.168.1.100"
  exposure: 5000  # microseconds
  gain: 1.0
  trigger_mode: "hardware"

model:
  model_path: "./models/defect_classifier.pt"
  model_type: "efficientnet_b4"
  input_size: [224, 224]
  threshold: 0.5
  classes:
    - "OK"
    - "NG_scratch"
    - "NG_dent"
    - "NG_stain"

plc:
  protocol: "modbus_tcp"
  ip: "192.168.1.200"
  port: 502
  registers:
    trigger: 100
    result: 101
    defect_type: 102

database:
  type: "postgresql"
  host: "localhost"
  port: 5432
  name: "vision_inspection"
  user: "admin"
  password: "password"

logging:
  level: "INFO"
  file_path: "./logs/system.log"
  max_size: "100MB"
  backup_count: 10
```

---

## 11. 비용 산정 및 ROI 분석

### 11.1 초기 투자 비용

```yaml
하드웨어_비용:
  카메라_시스템: 1,000,000 ~ 5,000,000원
  조명_시스템: 300,000 ~ 1,500,000원
  AI_서버: 2,500,000 ~ 30,000,000원
  설치/지그: 500,000 ~ 2,000,000원

소프트웨어_비용:
  AI_개발비: 10,000,000 ~ 50,000,000원
  라이선스: 1,000,000 ~ 5,000,000원

총_초기비용: 15,000,000 ~ 100,000,000원
```

### 11.2 운영 비용

```yaml
연간_운영비용:
  유지보수: 초기비용의 10~15%
  소모품: 500,000원
  전력: 1,000,000원
  인건비: 감소 효과

총_연간운영비: 2,000,000 ~ 15,000,000원
```

### 11.3 ROI 계산 예시

```yaml
시나리오:
  일일생산량: 10,000개
  불량률: 2%
  불량_미검출_손실: 10,000원/개
  인건비: 40,000,000원/년/명
  검사_인원: 3명

현재_비용:
  불량_손실: 10,000 × 0.02 × 0.15 × 365 = 109,500,000원/년
  인건비: 40,000,000 × 3 = 120,000,000원/년
  총_비용: 229,500,000원/년

AI_도입_후:
  불량_손실: 10,000 × 0.02 × 0.005 × 365 = 3,650,000원/년
  인건비: 40,000,000 × 0.5 = 20,000,000원/년
  운영비: 10,000,000원/년
  총_비용: 33,650,000원/년

절감_효과: 195,850,000원/년
초기_투자: 50,000,000원
ROI_기간: 약 3개월
```

---

## 12. 체크리스트

### 12.1 프로젝트 시작 전 체크리스트

```
□ 프로젝트 목표 및 범위 정의
□ 예산 확보
□ 담당자/팀 구성
□ 일정 계획 수립
□ 기존 검사 방식 분석 완료
□ 불량 유형 정의 및 분류
□ 성능 목표 (KPI) 설정
```

### 12.2 시스템 설계 체크리스트

```
□ 검사 대상 제품 분석
□ 카메라 사양 선정
□ 조명 방식 결정
□ AI 서버 사양 결정
□ 네트워크 구성 설계
□ PLC 연동 방안 수립
□ 설치 위치/공간 확보
```

### 12.3 데이터 준비 체크리스트

```
□ 데이터 수집 계획 수립
□ 양품 이미지 수집 완료
□ 불량품 이미지 수집 완료
□ 라벨링 완료
□ 데이터 품질 검증
□ 데이터셋 분할 완료
□ 데이터 증강 적용
```

### 12.4 모델 개발 체크리스트

```
□ 모델 아키텍처 선정
□ 학습 환경 구축
□ 모델 학습 완료
□ 성능 평가 완료 (목표 달성)
□ 모델 최적화 (TensorRT 등)
□ 추론 속도 검증
□ 테스트셋 최종 평가
```

### 12.5 배포 체크리스트

```
□ 하드웨어 설치 완료
□ 소프트웨어 설치 완료
□ 카메라/조명 캘리브레이션
□ PLC 연동 테스트
□ 통합 테스트 완료
□ 성능 테스트 완료
□ 안정성 테스트 완료
□ 운영자 교육 완료
□ 문서 인계
```

---

## 부록

### A. 용어 정리

| 용어 | 설명 |
|------|------|
| AOI | Automated Optical Inspection, 자동 광학 검사 |
| ROI | Region of Interest, 관심 영역 / Return on Investment, 투자 수익률 |
| FOV | Field of View, 시야각 |
| WD | Working Distance, 작동 거리 |
| DOF | Depth of Field, 피사계 심도 |
| fps | Frames per Second, 초당 프레임 수 |
| mAP | mean Average Precision, 평균 정밀도 |
| IoU | Intersection over Union, 교차 합집합 비율 |
| TensorRT | NVIDIA의 딥러닝 추론 최적화 라이브러리 |
| MLOps | Machine Learning Operations, ML 운영 자동화 |

### B. 참고 자료

```yaml
학습_자료:
  - PyTorch 공식 튜토리얼: https://pytorch.org/tutorials/
  - Ultralytics YOLOv8: https://docs.ultralytics.com/
  - OpenCV 튜토리얼: https://docs.opencv.org/

산업용_카메라:
  - Basler: https://www.baslerweb.com/
  - FLIR: https://www.flir.com/
  - Hikvision: https://www.hikvision.com/

AI_하드웨어:
  - NVIDIA Jetson: https://developer.nvidia.com/embedded-computing
  - Intel OpenVINO: https://docs.openvino.ai/
```

### C. 문의 및 지원

```
기술 지원 문의:
- 시스템 설계 컨설팅
- AI 모델 개발 지원
- 현장 설치 지원
- 유지보수 서비스
```

---

**문서 버전**: 1.0
**작성일**: 2026-01-18
**작성자**: AI 적용 전문가
