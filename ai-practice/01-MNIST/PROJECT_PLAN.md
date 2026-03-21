# MNIST 프로젝트 계획서

## 프로젝트 개요

**목표**: MNIST 손글씨 숫자 인식을 다양한 조건에서 실험하여 딥러닝 핵심 개념 이해

**기간**: 예상 2-3일
**환경**: 로컬 PC (CPU) + Google Colab (GPU)

---

## 실험 구조

### 기본 실험 (Baseline)
- 표준 CNN 모델
- 기본 하이퍼파라미터

### 변형 실험 (소 프로젝트)

| 실험 ID | 변경 요소 | 목적 | 환경 |
|:-------:|----------|------|:----:|
| EXP-01 | 모델 구조 변경 | MLP vs CNN 비교 | 로컬 |
| EXP-02 | 활성화 함수 | ReLU vs LeakyReLU vs GELU | 로컬 |
| EXP-03 | 옵티마이저 | SGD vs Adam vs AdamW | 로컬 |
| EXP-04 | 학습률 스케줄러 | StepLR vs CosineAnnealing | 로컬 |
| EXP-05 | 배치 크기 | 16 vs 64 vs 256 | 로컬 |
| EXP-06 | 데이터 증강 | 기본 vs 강화 증강 | Colab |
| EXP-07 | 정규화 기법 | Dropout vs BatchNorm vs 둘 다 | 로컬 |
| EXP-08 | 손실 함수 | CrossEntropy vs LabelSmoothing | 로컬 |

---

## 폴더 구조

```
01-MNIST/
├── PROJECT_PLAN.md          # 이 파일
├── PROGRESS_LOG.md          # 진행 상황 기록
├── experiments/
│   ├── exp01_model_arch/    # 모델 구조 비교
│   ├── exp02_activation/    # 활성화 함수 비교
│   ├── exp03_optimizer/     # 옵티마이저 비교
│   ├── exp04_scheduler/     # 학습률 스케줄러
│   ├── exp05_batch_size/    # 배치 크기 영향
│   ├── exp06_augmentation/  # 데이터 증강
│   ├── exp07_regularization/# 정규화 기법
│   └── exp08_loss_func/     # 손실 함수
├── notebooks/
│   ├── 01_baseline.ipynb    # 기본 실험
│   └── colab/               # Colab용 노트북
├── models/                  # 저장된 모델 (.pth)
└── results/
    ├── metrics/             # 성능 지표 CSV
    └── plots/               # 시각화 이미지
```

---

## 무료 GPU 리소스

| 서비스 | GPU | 제한 | 용도 |
|--------|-----|------|------|
| **Google Colab** | T4 (15GB) | 12시간/세션 | 주력 사용 |
| **Kaggle Notebooks** | P100/T4 | 30시간/주 | 백업 |
| **Lightning.ai** | T4 | 22시간/월 | 대안 |

### Colab 사용 전략
1. 데이터 로드/전처리: 로컬에서 준비
2. 모델 학습: Colab에서 실행
3. 결과 분석/시각화: 로컬에서 수행

---

## 실험별 상세 계획

### EXP-01: 모델 구조 비교

| 모델 | 파라미터 수 | 예상 정확도 |
|------|-----------|------------|
| MLP (784→256→128→10) | ~120K | 97~98% |
| Simple CNN (2 Conv) | ~50K | 98~99% |
| Deep CNN (4 Conv) | ~200K | 99%+ |

**질문**: 왜 CNN이 MLP보다 이미지에서 좋은가?

### EXP-02: 활성화 함수 비교

```python
activations = {
    'ReLU': nn.ReLU(),
    'LeakyReLU': nn.LeakyReLU(0.01),
    'GELU': nn.GELU(),
    'SiLU': nn.SiLU()  # Swish
}
```

**질문**: 죽은 뉴런(Dead Neuron) 문제란?

### EXP-03: 옵티마이저 비교

| 옵티마이저 | 학습률 | 특징 |
|-----------|--------|------|
| SGD | 0.01 | 기본, 느림 |
| SGD+Momentum | 0.01, m=0.9 | 가속 |
| Adam | 0.001 | 적응형 |
| AdamW | 0.001, wd=0.01 | 가중치 감쇠 개선 |

**질문**: Adam이 항상 좋은가?

### EXP-04: 학습률 스케줄러

```python
schedulers = {
    'StepLR': StepLR(optimizer, step_size=10, gamma=0.1),
    'CosineAnnealing': CosineAnnealingLR(optimizer, T_max=50),
    'OneCycleLR': OneCycleLR(optimizer, max_lr=0.01, epochs=50)
}
```

### EXP-05: 배치 크기 영향

| 배치 크기 | 특징 |
|----------|------|
| 16 | 노이즈 많음, 일반화 좋을 수 있음 |
| 64 | 균형 |
| 256 | 안정적, 메모리 많이 사용 |

### EXP-06: 데이터 증강 (Colab 권장)

```python
# 기본 증강
transforms.Compose([
    transforms.RandomRotation(10),
    transforms.ToTensor(),
])

# 강화 증강
transforms.Compose([
    transforms.RandomRotation(15),
    transforms.RandomAffine(degrees=0, translate=(0.1, 0.1)),
    transforms.RandomPerspective(distortion_scale=0.2),
    transforms.ToTensor(),
])
```

### EXP-07: 정규화 기법

| 기법 | 적용 위치 | 효과 |
|------|----------|------|
| Dropout | FC층 | 과적합 방지 |
| BatchNorm | Conv 후 | 학습 안정화 |
| 둘 다 | 혼합 | 시너지 |

### EXP-08: 손실 함수

```python
losses = {
    'CrossEntropy': nn.CrossEntropyLoss(),
    'LabelSmoothing': nn.CrossEntropyLoss(label_smoothing=0.1)
}
```

---

## 평가 지표

| 지표 | 설명 |
|------|------|
| Test Accuracy | 테스트셋 정확도 |
| Train Loss Curve | 학습 수렴 속도 |
| Confusion Matrix | 어떤 숫자를 혼동하는지 |
| 학습 시간 | 실용성 평가 |

---

## 진행 체크리스트

- [ ] 환경 설정 (PyTorch, 라이브러리)
- [ ] Baseline 모델 구현 및 테스트
- [ ] EXP-01: 모델 구조 비교
- [ ] EXP-02: 활성화 함수 비교
- [ ] EXP-03: 옵티마이저 비교
- [ ] EXP-04: 학습률 스케줄러
- [ ] EXP-05: 배치 크기 영향
- [ ] EXP-06: 데이터 증강 (Colab)
- [ ] EXP-07: 정규화 기법
- [ ] EXP-08: 손실 함수
- [ ] 결과 종합 및 리포트 작성

---

## 변경 이력

| 날짜 | 변경 내용 | 비고 |
|------|----------|------|
| 2026-03-21 | 초기 계획서 작성 | |

---

## 참고 자료

- [PyTorch MNIST 튜토리얼](https://pytorch.org/tutorials/)
- [aiStudy Level-4 자료](../aiStudy/Level-4-PyTorch실전/)
- [Google Colab](https://colab.research.google.com/)
