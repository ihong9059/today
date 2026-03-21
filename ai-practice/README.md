# AI 실습 프로젝트

PyTorch 기반 딥러닝 실습을 위한 프로젝트 모음입니다.

---

## 프로젝트 목록

| 번호 | 프로젝트 | 설명 | 난이도 |
|:----:|----------|------|:------:|
| 01 | MNIST | 손글씨 숫자 인식 (0-9) | ★☆☆ |
| 02 | EMNIST | 영문자+숫자 인식 (47클래스) | ★★☆ |
| 03 | LicensePlate | 번호판 인식 - 단계별 (검출→분할→인식) | ★★☆ |
| 04 | LicensePlate-E2E | 번호판 인식 - End-to-End (YOLO+OCR) | ★★★ |

---

## 전체 폴더 구조

```
ai-practice/
├── README.md                    # 이 파일 (전체 설명)
│
├── 01-MNIST/                    # MNIST 손글씨 숫자 인식
│   ├── docs/                    # 설명 문서
│   ├── experiments/             # 실험별 코드
│   │   └── exp00_baseline/      # 기본 CNN 모델
│   ├── notebooks/               # Colab 노트북
│   ├── models/                  # 학습된 모델
│   ├── results/                 # 결과 이미지/JSON
│   └── my_digits/               # 테스트용 손글씨
│
├── 02-EMNIST/                   # 영문자+숫자 인식 (47클래스)
│   ├── docs/                    # 설명 문서
│   ├── experiments/             # 실험별 코드
│   │   └── exp00_baseline/      # 기본 CNN 모델
│   ├── notebooks/               # Colab 노트북
│   ├── models/                  # 학습된 모델
│   ├── results/                 # 결과 이미지/JSON
│   └── my_chars/                # 테스트용 손글씨
│
├── 03-LicensePlate/             # 번호판 인식 - 단계별
│   ├── docs/                    # AIHUB 가이드 등
│   ├── experiments/
│   │   ├── step1_detection/     # 번호판 검출
│   │   ├── step2_segmentation/  # 문자 분할
│   │   └── step3_recognition/   # 문자 인식
│   ├── data/                    # AIHUB 데이터
│   ├── models/                  # 학습된 모델
│   └── results/                 # 결과
│
└── 04-LicensePlate-E2E/         # 번호판 인식 - End-to-End
    ├── docs/                    # YOLO, OCR 가이드
    ├── experiments/
    │   └── exp00_baseline/      # YOLO + PaddleOCR
    ├── data/                    # YOLO 형식 데이터
    ├── models/                  # YOLO 모델
    └── results/                 # 결과
```

---

## 폴더별 설명

### 공통 파일

| 파일/폴더 | 용도 |
|-----------|------|
| `PROJECT_PLAN.md` | 프로젝트 목표, 실험 계획, 기술 스택 정의 |
| `PROGRESS_LOG.md` | 진행 상황 추적, 실험 결과 기록, 다음 작업 관리 |

### 공통 폴더

| 폴더 | 용도 | 예시 |
|------|------|------|
| `docs/` | 프로젝트 관련 문서 | 데이터셋 가이드, 참고 자료 |
| `experiments/` | 실험별 코드 분리 | `exp01_model_arch/`, `exp02_optimizer/` |
| `notebooks/` | Jupyter/Colab 노트북 | `.ipynb` 파일 |
| `models/` | 학습 완료된 모델 | `.pt`, `.pth`, `.onnx` 파일 |
| `results/` | 실험 결과 저장 | 그래프, CSV, 혼동 행렬 이미지 |

### LicensePlate 전용

| 폴더 | 용도 |
|------|------|
| `data/` | 원본/처리된 이미지 및 라벨 데이터 |

---

## experiments/ 폴더 구조

각 실험은 독립적인 폴더로 관리됩니다.

```
experiments/
├── exp01_model_arch/       # 실험 1: 모델 구조 비교
│   ├── train.py            # 학습 코드
│   ├── model.py            # 모델 정의
│   ├── config.yaml         # 설정 파일
│   └── README.md           # 실험 설명
│
├── exp02_optimizer/        # 실험 2: 옵티마이저 비교
│   └── ...
│
└── baseline/               # 기준 모델 (비교 대상)
    └── ...
```

**폴더 명명 규칙**: `exp{번호}_{실험내용}`

---

## results/ 폴더 구조

```
results/
├── metrics/                # 수치 결과
│   ├── exp01_accuracy.csv
│   └── exp02_loss.csv
│
├── plots/                  # 시각화
│   ├── exp01_learning_curve.png
│   └── exp02_confusion_matrix.png
│
└── comparisons/            # 실험 간 비교
    └── model_comparison.png
```

---

## models/ 폴더 구조

```
models/
├── exp01_best.pt           # 실험 1 최고 성능 모델
├── exp02_best.pt           # 실험 2 최고 성능 모델
├── final_model.pt          # 최종 선택 모델
└── checkpoints/            # 학습 중간 체크포인트
    ├── epoch_10.pt
    └── epoch_20.pt
```

**파일 명명 규칙**: `{실험ID}_{상태}.pt`
- `best`: 검증 정확도 최고
- `last`: 마지막 에포크
- `final`: 최종 배포용

---

## 실행 환경

### 로컬 (이 PC)
- 데이터 전처리
- 경량 모델 학습 (MNIST)
- 결과 분석 및 시각화

### Google Colab
- GPU 필요한 학습 (YOLO, 대용량 CNN)
- 데이터 증강 실험
- 장시간 학습

### 환경 전환 시 주의사항

1. **Colab → 로컬 동기화**
   - Google Drive 데스크톱 앱 사용
   - 또는 수동으로 모델 파일 다운로드

2. **경로 차이**
   ```python
   # 로컬
   DATA_PATH = 'C:/todo/today/ai-practice/01-MNIST/data'

   # Colab
   DATA_PATH = '/content/drive/MyDrive/ai-practice/01-MNIST/data'
   ```

---

## 빠른 시작

### 1. MNIST 프로젝트
```bash
# 프로젝트로 이동
cd ai-practice/01-MNIST

# 계획서 확인
cat PROJECT_PLAN.md

# 진행 상황 확인
cat PROGRESS_LOG.md
```

### 2. Claude Code에서
```
# MNIST 실습 시작
/mnist

# 번호판 인식 실습 시작
/lpr
```

---

## 실험 진행 워크플로우

```
┌─────────────────────────────────────────────────────────────┐
│  1. 계획 수립                                                │
│     PROJECT_PLAN.md 확인 → 실험 선택                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  2. 실험 폴더 생성                                           │
│     experiments/exp{번호}_{이름}/ 생성                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  3. 코드 작성 & 학습                                         │
│     train.py 작성 → 로컬/Colab에서 실행                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  4. 결과 저장                                                │
│     results/metrics/ → CSV                                  │
│     results/plots/ → 그래프                                 │
│     models/ → 모델 파일                                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  5. 로그 업데이트                                            │
│     PROGRESS_LOG.md 업데이트 (상태, 결과, 발견사항)         │
└─────────────────────────────────────────────────────────────┘
```

---

## 참고 자료

- [PyTorch 공식 튜토리얼](https://pytorch.org/tutorials/)
- [Ultralytics YOLOv8](https://docs.ultralytics.com/)
- [Google Colab](https://colab.research.google.com/)
- [aiStudy 학습자료](../aiStudy/)

---

## 문의

Claude Code `/mnist` 또는 `/lpr` 명령어로 프로젝트별 상세 가이드를 확인할 수 있습니다.
