# 03-LicensePlate: 단계별 번호판 인식

번호판 인식을 **3단계**로 나누어 학습하는 프로젝트입니다.

---

## 접근 방식

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Step 1         │     │  Step 2         │     │  Step 3         │
│  번호판 검출    │ ──▶ │  문자 분할      │ ──▶ │  문자 인식      │
│  (YOLO/CNN)     │     │  (OpenCV)       │     │  (CNN)          │
└─────────────────┘     └─────────────────┘     └─────────────────┘
     ↓                        ↓                        ↓
  번호판 위치 찾기      개별 문자 추출        각 문자 인식
  (바운딩 박스)         (이진화, 컨투어)      (EMNIST 활용)
```

---

## 프로젝트 구조

```
03-LicensePlate/
├── README.md
├── docs/
│   ├── AIHUB_데이터_가이드.md      # AIHUB 다운로드 방법
│   ├── Step1_Detection.md         # 번호판 검출 설명
│   ├── Step2_Segmentation.md      # 문자 분할 설명
│   └── Step3_Recognition.md       # 문자 인식 설명
├── experiments/
│   ├── step1_detection/           # 번호판 영역 검출
│   │   ├── train.py
│   │   └── detect.py
│   ├── step2_segmentation/        # 문자 분할
│   │   └── segment.py
│   └── step3_recognition/         # 문자 인식
│       ├── train.py
│       └── recognize.py
├── notebooks/
│   ├── Step1_Detection_Colab.ipynb
│   ├── Step2_Segmentation.ipynb
│   └── Step3_Recognition_Colab.ipynb
├── data/
│   ├── raw/                       # AIHUB 원본 데이터
│   └── processed/                 # 전처리된 데이터
├── models/
│   ├── plate_detector.pt          # Step 1 모델
│   └── char_recognizer.pt         # Step 3 모델
└── results/
```

---

## 각 단계 설명

### Step 1: 번호판 검출 (Detection)

**목표**: 이미지에서 번호판 위치 찾기

```
입력: 자동차 이미지
      ┌──────────────────────┐
      │  ┌────┐              │
      │  │ 차 │   [12가3456] │  ← 번호판 위치 검출
      │  └────┘              │
      └──────────────────────┘

출력: 바운딩 박스 좌표 (x, y, w, h)
```

**방법**:
- YOLOv8 (빠르고 정확)
- CNN + Sliding Window (기초 학습용)

---

### Step 2: 문자 분할 (Segmentation)

**목표**: 번호판에서 개별 문자 추출

```
입력: 번호판 이미지
      ┌────────────────┐
      │ 12 가 3456     │
      └────────────────┘

출력: 개별 문자 이미지
      [1] [2] [가] [3] [4] [5] [6]
```

**방법**:
- OpenCV 이진화 (Thresholding)
- 컨투어 검출 (findContours)
- 문자 영역 추출

---

### Step 3: 문자 인식 (Recognition)

**목표**: 각 문자 이미지를 인식

```
입력: 개별 문자 이미지 [3]
출력: 인식 결과 "3" (confidence: 98%)
```

**방법**:
- 숫자/영문: EMNIST 모델 활용 (02-EMNIST에서 학습)
- 한글: 별도 한글 CNN 모델 학습

---

## 데이터셋

### AIHUB 자동차 번호판 데이터

| 항목 | 내용 |
|------|------|
| 출처 | [AIHUB](https://aihub.or.kr/aidata/27727) |
| 비용 | **무료** (회원가입 필요) |
| 번호판 이미지 | 10만 장 |
| 라벨 | JSON (번호판 값, 바운딩박스) |

### 다운로드 방법

```bash
# 1. AIHUB 회원가입 (aihub.or.kr)
# 2. 데이터셋 승인 신청
# 3. 승인 후 aihubshell로 다운로드

# Linux/WSL
curl -o aihubshell https://api.aihub.or.kr/api/aihubshell.do
chmod +x aihubshell
./aihubshell
# 데이터셋 키 입력: 27727
```

---

## 실행 순서

### 1. 데이터 준비
```bash
# AIHUB에서 데이터 다운로드 후 data/raw/ 에 배치
```

### 2. Step 1: 번호판 검출
```bash
cd experiments/step1_detection
python train.py      # 검출 모델 학습
python detect.py     # 테스트
```

### 3. Step 2: 문자 분할
```bash
cd experiments/step2_segmentation
python segment.py    # OpenCV로 문자 분할
```

### 4. Step 3: 문자 인식
```bash
cd experiments/step3_recognition
python train.py      # 인식 모델 학습 (또는 EMNIST 모델 사용)
python recognize.py  # 테스트
```

### 5. 전체 파이프라인 테스트
```bash
python pipeline.py --image test_car.jpg
# 출력: 12가3456
```

---

## 한국 번호판 형식

### 현행 번호판 (2019년~)

```
┌─────────────────────────┐
│  123 가 4567            │  ← 3자리 + 한글 + 4자리
└─────────────────────────┘

구성:
- 앞 3자리: 차종 구분 (001~699: 승용, 700~799: 승합 등)
- 한글 1자: 용도 구분 (가~호)
- 뒤 4자리: 일련번호
```

### 구형 번호판

```
┌─────────────────────────┐
│  서울 12 가 3456        │  ← 지역 + 2자리 + 한글 + 4자리
└─────────────────────────┘
```

---

## 예상 난이도

| 단계 | 내용 | 난이도 | 예상 시간 |
|------|------|:------:|----------|
| Step 1 | 번호판 검출 | ★★☆ | 2-3일 |
| Step 2 | 문자 분할 | ★★☆ | 1일 |
| Step 3 | 문자 인식 | ★☆☆ | 1일 (EMNIST 활용) |
| 한글 인식 | 한글 CNN | ★★★ | 3-5일 |

---

## 다음 단계

이 프로젝트 완료 후 → [04-LicensePlate-E2E](../04-LicensePlate-E2E/)에서 End-to-End 방식으로 진행

---

## 참고 자료

- [AIHUB 번호판 데이터셋](https://aihub.or.kr/aidata/27727)
- [OpenCV 컨투어 검출](https://docs.opencv.org/4.x/d4/d73/tutorial_py_contours_begin.html)
- [YOLOv8 문서](https://docs.ultralytics.com/)
