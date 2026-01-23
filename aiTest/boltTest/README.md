# Bolt Test - 볼트 품질검사 AI 시스템

볼트 생산 라인에서 이미지 기반으로 양품/불량을 자동 선별하는 AI 시스템

---

## 빠른 시작

### 1. 환경 설정

```bash
cd aiTest/boltTest
pip install -r requirements.txt
```

### 2. 데이터 생성 (표준 이미지 1장으로)

```bash
# 표준 볼트 이미지를 data/raw/에 저장 후
python src/generate_training_data.py --input data/raw/standard_bolt.jpg

# 생성 결과: data/train/good/, data/train/defect/
```

### 3. 모델 학습

```bash
python src/train.py --data data --epochs 30

# 출력: models/best_model.pth
```

### 4. 추론 테스트

```bash
# 단일 이미지
python src/inference.py -m models/best_model.pth -i test.jpg

# 폴더 전체
python src/inference.py -m models/best_model.pth -f data/test/

# 실시간 카메라
python src/inference.py -m models/best_model.pth -c 0
```

---

## 프로젝트 구조

```
boltTest/
├── README.md                          # 이 파일
├── requirements.txt                   # 의존성 패키지
├── 볼트_품질검사_AI시스템_계획서.md      # 전체 계획서
│
├── src/                               # 소스 코드
│   ├── generate_training_data.py      # 데이터 생성
│   ├── train.py                       # 모델 학습
│   └── inference.py                   # 추론
│
├── data/                              # 데이터셋
│   ├── raw/                           # 원본 이미지
│   ├── train/good/, defect/           # 학습 데이터
│   ├── val/good/, defect/             # 검증 데이터
│   └── test/good/, defect/            # 테스트 데이터
│
├── models/                            # 학습된 모델
│   ├── best_model.pth                 # 최고 성능 모델
│   └── training_report.md             # 학습 결과 리포트
│
└── docs/                              # 문서
    └── 데이터_생성_가이드.md            # 데이터 생성 가이드
```

---

## 스크립트 사용법

### generate_training_data.py - 데이터 생성

```bash
python src/generate_training_data.py \
    --input data/raw/bolt.jpg \    # 표준 이미지 (필수)
    --output data \                 # 출력 폴더
    --good 100 \                    # 양품 생성 수
    --defect 30                     # 결함 유형당 생성 수
```

**생성되는 결함 유형:**
- scratch (스크래치)
- dent (찍힘)
- rust (녹)
- crack (균열)
- missing_thread (나사산 결손)
- contamination (이물질)

### train.py - 모델 학습

```bash
python src/train.py \
    --data data \                   # 데이터 폴더
    --model mobilenet \             # 모델 (mobilenet/efficientnet/resnet18/resnet50)
    --epochs 30 \                   # 학습 에폭
    --batch 16 \                    # 배치 크기
    --lr 0.001 \                    # 학습률
    --img-size 224 \                # 이미지 크기
    --output models                 # 모델 저장 폴더
```

**지원 모델:**
| 모델 | 속도 | 정확도 | 권장 |
|:-----|:----:|:------:|:----:|
| mobilenet | 매우 빠름 | 높음 | 실시간 |
| mobilenet_large | 빠름 | 매우 높음 | 균형 |
| efficientnet | 빠름 | 매우 높음 | 균형 |
| resnet18 | 보통 | 높음 | - |
| resnet50 | 느림 | 최고 | 정확도 우선 |

### inference.py - 추론

```bash
# 단일 이미지 검사
python src/inference.py -m models/best_model.pth -i image.jpg

# 폴더 전체 검사
python src/inference.py -m models/best_model.pth -f ./images/

# 실시간 카메라 검사
python src/inference.py -m models/best_model.pth -c 0

# 디바이스 지정
python src/inference.py -m model.pth -i image.jpg --device cuda
```

---

## 워크플로우

```
1. 표준 볼트 촬영
   └── data/raw/standard_bolt.jpg

2. 시뮬레이션 데이터 생성
   └── generate_training_data.py
       ├── data/train/good/ (50개)
       └── data/train/defect/ (120개)

3. (선택) 검증 데이터 분리
   └── train에서 일부를 val로 이동

4. 모델 학습
   └── train.py
       └── models/best_model.pth

5. 테스트
   └── inference.py

6. 현장 적용
   └── 실시간 카메라 연동
```

---

## 성능 목표

| 지표 | 목표 |
|:-----|:-----|
| 정확도 | 95%+ |
| 재현율 (불량 검출) | **99%+** |
| 처리 속도 | 30 FPS+ |

---

## 진행 상태

- [x] 계획서 작성
- [x] 데이터 생성 스크립트
- [x] 모델 학습 스크립트
- [x] 추론 스크립트
- [ ] 표준 볼트 이미지 촬영
- [ ] 데이터 생성 및 학습
- [ ] 현장 테스트

---

*프로젝트 시작일: 2026-01-23*
