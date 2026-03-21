# 번호판 인식(LPR) 프로젝트 계획서

## 프로젝트 개요

**목표**: 한국 번호판 인식 시스템을 다양한 조건에서 실험하여 Object Detection + OCR 파이프라인 이해

**기간**: 예상 1-2주
**환경**: 로컬 PC (전처리/평가) + Google Colab (모델 학습)

---

## 2단계 아키텍처

```
[입력 이미지] → [1단계: 번호판 검출] → [2단계: 문자 인식] → [결과]
                   YOLO (Colab)           CNN (Colab)
```

---

## 실험 구조

### Phase 1: 번호판 검출 실험

| 실험 ID | 변경 요소 | 목적 | 환경 |
|:-------:|----------|------|:----:|
| DET-01 | YOLOv8 모델 크기 | n vs s vs m 비교 | Colab |
| DET-02 | 입력 해상도 | 320 vs 640 vs 1280 | Colab |
| DET-03 | 데이터 증강 | 기본 vs 강화 | Colab |
| DET-04 | 학습 에포크 | 50 vs 100 vs 200 | Colab |

### Phase 2: 문자 인식 실험

| 실험 ID | 변경 요소 | 목적 | 환경 |
|:-------:|----------|------|:----:|
| OCR-01 | 모델 구조 | Simple CNN vs ResNet-like | Colab |
| OCR-02 | 입력 크기 | 24x24 vs 32x32 vs 48x48 | Colab |
| OCR-03 | 문자 분리 방법 | 균등분할 vs Contour 기반 | 로컬 |
| OCR-04 | 전처리 기법 | 그레이 vs 이진화 vs 적응형 | 로컬 |

### Phase 3: 통합 파이프라인

| 실험 ID | 변경 요소 | 목적 | 환경 |
|:-------:|----------|------|:----:|
| INT-01 | 검출 신뢰도 임계값 | 0.3 vs 0.5 vs 0.7 | 로컬 |
| INT-02 | 후처리 전략 | 다수결 vs 신뢰도 기반 | 로컬 |
| INT-03 | 환경 조건별 평가 | 주간/야간/역광 | 로컬 |

### Phase 4: 배포 실험 (선택)

| 실험 ID | 변경 요소 | 목적 | 환경 |
|:-------:|----------|------|:----:|
| DEP-01 | 모델 최적화 | TorchScript vs ONNX | 로컬 |
| DEP-02 | 추론 속도 | CPU vs GPU 비교 | 로컬 |

---

## 폴더 구조

```
02-LicensePlate/
├── PROJECT_PLAN.md          # 이 파일
├── PROGRESS_LOG.md          # 진행 상황 기록
├── data/
│   ├── raw/                 # 원본 이미지
│   ├── processed/           # 전처리된 데이터
│   │   ├── detection/       # YOLO 형식 (images + labels)
│   │   └── recognition/     # 문자 이미지 (클래스별 폴더)
│   └── dataset.yaml         # YOLO 데이터셋 설정
├── experiments/
│   ├── phase1_detection/    # 검출 실험
│   │   ├── det01_model_size/
│   │   ├── det02_resolution/
│   │   ├── det03_augmentation/
│   │   └── det04_epochs/
│   ├── phase2_ocr/          # OCR 실험
│   │   ├── ocr01_architecture/
│   │   ├── ocr02_input_size/
│   │   ├── ocr03_segmentation/
│   │   └── ocr04_preprocessing/
│   ├── phase3_integration/  # 통합 실험
│   └── phase4_deployment/   # 배포 실험 (선택)
├── notebooks/
│   ├── colab/               # Colab 노트북
│   │   ├── 01_yolo_train.ipynb
│   │   └── 02_cnn_train.ipynb
│   └── local/               # 로컬 노트북
├── models/
│   ├── detection/           # YOLO 가중치
│   └── recognition/         # CNN 가중치
└── results/
    ├── metrics/             # 성능 지표
    └── visualizations/      # 시각화
```

---

## 데이터 수집 계획

### 방법 1: 공개 데이터셋 (권장)

| 소스 | 설명 | 규모 |
|------|------|------|
| AI Hub | 한국 차량 번호판 데이터 | ~10,000+ |
| Roboflow | License Plate 데이터셋 | 다양 |
| Kaggle | Korean License Plate | 가변 |

### 방법 2: 합성 데이터

```python
# 번호판 텍스트 생성
plates = ["12가3456", "34나7890", "123가4567"]
# PIL로 번호판 이미지 합성
```

### 데이터 규모 목표

| 단계 | 최소 | 권장 |
|------|------|------|
| 검출 학습 | 500장 | 2,000장+ |
| 문자 인식 학습 | 클래스당 100개 | 클래스당 500개+ |

---

## 무료 GPU 리소스 활용

### Google Colab 사용 계획

| 작업 | 예상 시간 | GPU 필요 |
|------|----------|:--------:|
| YOLOv8 학습 (100 epoch) | 1~2시간 | ✅ |
| CNN 학습 (50 epoch) | 30분~1시간 | ✅ |
| 데이터 전처리 | 30분 | ❌ |
| 결과 분석 | 1시간 | ❌ |

### Colab 노트북 구조

```
notebooks/colab/
├── 01_data_preparation.ipynb   # 데이터 로드 (Google Drive 연동)
├── 02_yolo_detection.ipynb     # YOLO 학습
├── 03_cnn_recognition.ipynb    # CNN 학습
└── 04_full_pipeline.ipynb      # 통합 테스트
```

### Google Drive 연동

```python
from google.colab import drive
drive.mount('/content/drive')

# 데이터 경로
DATA_PATH = '/content/drive/MyDrive/ai-practice/02-LicensePlate/data'
```

---

## 실험별 상세 계획

### DET-01: YOLO 모델 크기 비교

| 모델 | 파라미터 | 예상 mAP | 속도 |
|------|---------|----------|------|
| YOLOv8n | 3.2M | 85~90% | 빠름 |
| YOLOv8s | 11.2M | 90~95% | 중간 |
| YOLOv8m | 25.9M | 93~97% | 느림 |

**질문**: 번호판 검출에 큰 모델이 필요한가?

### DET-02: 입력 해상도 영향

| 해상도 | 장점 | 단점 |
|--------|------|------|
| 320 | 빠름 | 작은 번호판 놓칠 수 있음 |
| 640 | 균형 | 표준 |
| 1280 | 작은 객체 탐지 | 느림, 메모리 많이 사용 |

### OCR-01: CNN 구조 비교

```python
# Simple CNN
nn.Sequential(
    nn.Conv2d(1, 32, 3), nn.ReLU(), nn.MaxPool2d(2),
    nn.Conv2d(32, 64, 3), nn.ReLU(), nn.MaxPool2d(2),
    nn.Flatten(),
    nn.Linear(64*6*6, 128), nn.ReLU(),
    nn.Linear(128, 50)
)

# ResNet-like (Residual blocks)
# Skip connections 추가
```

### OCR-03: 문자 분리 방법

| 방법 | 장점 | 단점 |
|------|------|------|
| 균등 분할 | 구현 간단 | 문자 폭 다르면 부정확 |
| Contour 기반 | 정확 | 노이즈에 민감 |
| Connected Component | 겹친 문자 분리 가능 | 복잡 |

---

## 평가 지표

### 검출 단계

| 지표 | 설명 | 목표 |
|------|------|------|
| mAP@0.5 | IoU 50% 기준 | 95%+ |
| Precision | 오탐 비율 | 95%+ |
| Recall | 미탐 비율 | 95%+ |

### 인식 단계

| 지표 | 설명 | 목표 |
|------|------|------|
| 문자 정확도 | 개별 문자 | 98%+ |
| 번호판 정확도 | 전체 일치 | 90%+ |
| F1-score | 클래스별 | 95%+ |

### 종합

| 지표 | 계산 | 목표 |
|------|------|------|
| End-to-End 정확도 | 검출 × (문자^글자수) | 85%+ |
| 추론 시간 | 이미지당 ms | 200ms 이내 |

---

## 진행 체크리스트

### Phase 0: 준비
- [ ] 데이터 수집/확보
- [ ] Colab 환경 설정
- [ ] Google Drive 연동

### Phase 1: 검출
- [ ] DET-01: 모델 크기 비교
- [ ] DET-02: 해상도 비교
- [ ] DET-03: 데이터 증강
- [ ] DET-04: 에포크 수
- [ ] 최적 검출 모델 선정

### Phase 2: 인식
- [ ] 문자 데이터셋 준비
- [ ] OCR-01: 모델 구조
- [ ] OCR-02: 입력 크기
- [ ] OCR-03: 문자 분리
- [ ] OCR-04: 전처리
- [ ] 최적 인식 모델 선정

### Phase 3: 통합
- [ ] INT-01: 신뢰도 임계값
- [ ] INT-02: 후처리 전략
- [ ] INT-03: 환경 조건별 평가
- [ ] 최종 파이프라인 완성

### Phase 4: 배포 (선택)
- [ ] DEP-01: 모델 최적화
- [ ] DEP-02: 추론 속도 측정
- [ ] API 서버 구현

---

## 변경 이력

| 날짜 | 변경 내용 | 비고 |
|------|----------|------|
| 2026-03-21 | 초기 계획서 작성 | |

---

## 참고 자료

- [Ultralytics YOLOv8 문서](https://docs.ultralytics.com/)
- [aiStudy Level-9 자료](../aiStudy/Level-9-종합프로젝트/)
- [AI Hub 한국 번호판 데이터](https://aihub.or.kr/)
- [Roboflow Universe](https://universe.roboflow.com/)
