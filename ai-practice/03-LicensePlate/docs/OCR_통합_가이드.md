# 번호판 OCR 통합 가이드

YOLO 번호판 검출 이후 EasyOCR을 사용하여 문자를 인식하는 전체 과정을 설명합니다.

---

## 목차

1. [전체 파이프라인 개요](#1-전체-파이프라인-개요)
2. [Step 1: YOLO 번호판 검출 (복습)](#2-step-1-yolo-번호판-검출-복습)
3. [Step 2+3: EasyOCR 문자 인식](#3-step-23-easyocr-문자-인식)
4. [통합 스크립트 실행](#4-통합-스크립트-실행)
5. [모델 및 결과 저장 위치](#5-모델-및-결과-저장-위치)
6. [테스트 결과](#6-테스트-결과)
7. [문제 해결](#7-문제-해결)

---

## 1. 전체 파이프라인 개요

번호판 인식은 3단계로 구성됩니다:

```
┌─────────────────────────────────────────────────────────────────┐
│                        입력: 자동차 이미지                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: 번호판 검출 (Detection)                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  모델: YOLOv8n (직접 학습)                                  │  │
│  │  학습: Google Colab (Tesla T4 GPU)                        │  │
│  │  데이터셋: andrewmvd/car-plate-detection (433장)           │  │
│  │  결과: mAP50 = 88%                                        │  │
│  │  모델 파일: models/plate_detector.pt                       │  │
│  └───────────────────────────────────────────────────────────┘  │
│  출력: 번호판 바운딩 박스 좌표 (x1, y1, x2, y2)                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 2+3: 문자 인식 (OCR)                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  라이브러리: EasyOCR                                        │  │
│  │  학습: 사전 학습된 모델 사용 (직접 학습 X)                     │  │
│  │  지원 언어: 한국어 (ko) + 영어 (en)                          │  │
│  │  모델 저장: ~/.EasyOCR/model/ (자동 다운로드)                 │  │
│  └───────────────────────────────────────────────────────────┘  │
│  출력: 인식된 텍스트 + 신뢰도                                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    출력: "TN 37 55 e7651"                        │
└─────────────────────────────────────────────────────────────────┘
```

### 핵심 포인트

| 단계 | 모델 | 학습 여부 | 학습 위치 |
|------|------|:---------:|----------|
| Step 1: 검출 | YOLOv8n | ✅ 직접 학습 | Google Colab |
| Step 2+3: OCR | EasyOCR | ❌ 사전 학습 모델 | - (다운로드만) |

---

## 2. Step 1: YOLO 번호판 검출 (복습)

### 2.1 학습 환경

| 항목 | 내용 |
|------|------|
| 플랫폼 | Google Colab |
| GPU | Tesla T4 (15GB VRAM) |
| 학습 시간 | 약 4분 (29 epochs) |
| 조기 종료 | EarlyStopping (patience=10) |

### 2.2 데이터셋

```
데이터셋: andrewmvd/car-plate-detection (Kaggle)
├── images/           # 433개 이미지 (.png)
│   ├── Cars0.png
│   ├── Cars1.png
│   └── ...
└── annotations/      # 433개 라벨 (.xml, Pascal VOC 형식)
    ├── Cars0.xml
    ├── Cars1.xml
    └── ...
```

**XML → YOLO 형식 변환:**
```python
# Pascal VOC (XML)
<annotation>
    <object>
        <name>licence</name>
        <bndbox>
            <xmin>100</xmin>
            <ymin>200</ymin>
            <xmax>300</xmax>
            <ymax>250</ymax>
        </bndbox>
    </object>
</annotation>

# YOLO 형식 (txt)
# class_id x_center y_center width height (정규화된 값)
0 0.5 0.5 0.4 0.1
```

### 2.3 학습 결과

```
Results saved to runs/detect/plate_detector
- mAP50: 0.881 (88.1%)
- mAP50-95: 0.576 (57.6%)
- Precision: 0.864
- Recall: 0.847
```

### 2.4 모델 저장 위치

```
로컬 PC:
C:\todo\today\ai-practice\03-LicensePlate\experiments\step1_detection\
└── models\
    └── plate_detector.pt    ← 학습된 YOLO 모델 (약 6MB)
```

---

## 3. Step 2+3: EasyOCR 문자 인식

### 3.1 EasyOCR이란?

EasyOCR은 사전 학습된 딥러닝 OCR 라이브러리입니다.

| 특징 | 설명 |
|------|------|
| 지원 언어 | 80+ 언어 (한국어, 영어, 중국어 등) |
| 기반 기술 | CRNN (CNN + RNN) + CTC |
| 프레임워크 | PyTorch |
| 장점 | 설치 간단, 한글 지원 우수 |

### 3.2 우리가 한 것 vs 하지 않은 것

```
✅ 우리가 한 것:
   1. EasyOCR 패키지 설치 (pip install easyocr)
   2. 사전 학습된 모델 다운로드 (자동)
   3. YOLO 검출 결과와 연동

❌ 우리가 하지 않은 것:
   1. OCR 모델 직접 학습
   2. 한글/영문 인식 모델 개발
   3. 문자 분할 알고리즘 구현
```

### 3.3 EasyOCR 모델 저장 위치

EasyOCR은 최초 실행 시 모델을 자동 다운로드합니다:

```
Windows:
C:\Users\{사용자명}\.EasyOCR\model\
├── craft_mlt_25k.pth           # 텍스트 검출 모델 (~90MB)
├── korean_g2.pth               # 한국어 인식 모델 (~16MB)
└── english_g2.pth              # 영어 인식 모델 (~8MB)

Linux/Mac:
~/.EasyOCR/model/
```

### 3.4 EasyOCR 동작 원리

```
번호판 이미지 (크롭된 영역)
         │
         ▼
┌─────────────────────┐
│  CRAFT 모델         │  ← 텍스트 영역 검출
│  (Text Detection)   │
└──────────┬──────────┘
           │ 문자 영역들
           ▼
┌─────────────────────┐
│  CRNN 모델          │  ← 문자 인식
│  (Text Recognition) │
│  - CNN: 특징 추출   │
│  - RNN: 시퀀스 모델 │
│  - CTC: 디코딩      │
└──────────┬──────────┘
           │
           ▼
    인식된 텍스트
    "TN 37 55 e7651"
```

### 3.5 코드 사용법

```python
import easyocr

# 리더 초기화 (한국어 + 영어)
# 최초 실행 시 모델 다운로드 (1-2분)
reader = easyocr.Reader(['ko', 'en'], gpu=True)

# OCR 실행
results = reader.readtext(plate_image)

# 결과 구조
# results = [
#     ([좌표], '인식된 텍스트', 신뢰도),
#     ([좌표], '인식된 텍스트', 신뢰도),
#     ...
# ]

for (bbox, text, confidence) in results:
    print(f"텍스트: {text}, 신뢰도: {confidence:.2%}")
```

---

## 4. 통합 스크립트 실행

### 4.1 스크립트 위치

```
C:\todo\today\ai-practice\03-LicensePlate\experiments\step1_detection\
├── detect_and_read.py    ← YOLO + EasyOCR 통합 스크립트
├── test_model.py         ← YOLO만 테스트
├── models\
│   └── plate_detector.pt
├── test_images\          ← 테스트 이미지 (433개)
└── results\              ← 결과 저장 폴더
```

### 4.2 실행 방법

```bash
# 1. 프로젝트 폴더로 이동
cd C:\todo\today\ai-practice\03-LicensePlate\experiments\step1_detection

# 2. 가상환경 활성화
C:\todo\today\ai-practice\venv\Scripts\activate

# 3-1. 단일 이미지 테스트
python detect_and_read.py --image test_images\Cars0.png

# 3-2. 폴더 전체 테스트 (처음 10개)
python detect_and_read.py --folder test_images

# 3-3. 웹캠 실시간
python detect_and_read.py --camera

# 결과 이미지 표시 안 함 (headless)
python detect_and_read.py --image test_images\Cars0.png --no-show
```

### 4.3 실행 흐름

```python
# detect_and_read.py 핵심 코드

from ultralytics import YOLO
import easyocr

# 1. 모델 로드
detector = YOLO('models/plate_detector.pt')  # 직접 학습한 모델
reader = easyocr.Reader(['ko', 'en'])        # 사전 학습 모델 (자동 다운로드)

# 2. 번호판 검출 (YOLO)
detections = detector(image)

for box in detections[0].boxes:
    x1, y1, x2, y2 = box.xyxy[0].tolist()

    # 3. 번호판 영역 크롭
    plate_img = image[y1:y2, x1:x2]

    # 4. OCR 문자 인식 (EasyOCR)
    ocr_results = reader.readtext(plate_img)

    # 5. 텍스트 합치기
    plate_text = ' '.join([text for _, text, _ in ocr_results])
    print(f"번호판: {plate_text}")
```

---

## 5. 모델 및 결과 저장 위치

### 5.1 전체 폴더 구조

```
C:\todo\today\ai-practice\
├── venv\                          # Python 가상환경
│   └── Lib\site-packages\
│       ├── ultralytics\           # YOLO 패키지
│       ├── easyocr\               # EasyOCR 패키지
│       └── torch\                 # PyTorch
│
├── docs\
│   ├── Google_Colab_사용가이드.md
│   └── kaggle.json               # Kaggle API 키
│
└── 03-LicensePlate\
    ├── docs\
    │   ├── 번호판_인식_단계별_가이드.md
    │   ├── PC_테스트_가이드.md
    │   └── OCR_통합_가이드.md      ← 이 문서
    │
    ├── notebooks\
    │   └── Step1_Detection_Colab.ipynb  # Colab 학습 노트북
    │
    └── experiments\step1_detection\
        ├── train_yolo.py          # 로컬 학습 스크립트
        ├── test_model.py          # 검출만 테스트
        ├── detect_and_read.py     # 검출 + OCR 통합
        │
        ├── models\
        │   └── plate_detector.pt  # ✅ 학습된 YOLO 모델
        │
        ├── test_images\           # 테스트 이미지 (433개)
        │   ├── Cars0.png
        │   ├── Cars1.png
        │   └── ...
        │
        ├── results\               # ✅ 결과 저장
        │   ├── ocr_Cars0.png      # OCR 결과 이미지
        │   ├── ocr_Cars10.png
        │   └── ...
        │
        └── temp_data\             # Kaggle 다운로드 데이터
            ├── images\
            └── annotations\
```

### 5.2 모델 파일 요약

| 모델 | 위치 | 크기 | 학습 |
|------|------|------|:----:|
| YOLO (번호판 검출) | `models/plate_detector.pt` | ~6MB | ✅ 직접 |
| EasyOCR (텍스트 검출) | `~/.EasyOCR/model/craft_mlt_25k.pth` | ~90MB | ❌ 다운로드 |
| EasyOCR (한국어) | `~/.EasyOCR/model/korean_g2.pth` | ~16MB | ❌ 다운로드 |
| EasyOCR (영어) | `~/.EasyOCR/model/english_g2.pth` | ~8MB | ❌ 다운로드 |

---

## 6. 테스트 결과

### 6.1 테스트 환경

| 항목 | 내용 |
|------|------|
| PC | Windows (CPU 모드) |
| Python | 3.13 |
| 가상환경 | ai-practice/venv |

### 6.2 실행 결과

```
=== Cars0.png ===
YOLO 모델 로드: models\plate_detector.pt
OCR 모델 로딩 중... (최초 실행 시 모델 다운로드, 1-2분 소요)
OCR 모델 로드 완료!

처리 중: test_images\Cars0.png
  [1] 번호판: KLG1EA2553
      검출 신뢰도: 78.44%
      OCR 신뢰도: 8.77%
  저장됨: results\ocr_Cars0.png

=== Cars10.png ===
처리 중: test_images\Cars10.png
  [1] 번호판: TN 37 55 e7651
      검출 신뢰도: 67.63%
      OCR 신뢰도: 72.24%
  저장됨: results\ocr_Cars10.png
```

### 6.3 결과 분석

| 이미지 | 번호판 텍스트 | 검출 신뢰도 | OCR 신뢰도 | 비고 |
|--------|--------------|-------------|------------|------|
| Cars0.png | KLG1EA2553 | 78.44% | 8.77% | OCR 낮음 |
| Cars10.png | TN 37 55 e7651 | 67.63% | 72.24% | 양호 |
| Cars5.png | (미검출) | - | - | 번호판 없음 |

**참고:**
- GPU 없이 CPU로 실행하면 속도가 느리고 정확도가 낮을 수 있음
- OCR 신뢰도가 낮은 경우: 이미지 품질, 각도, 크기 문제

---

## 7. 문제 해결

### 7.1 GPU 관련 경고

```
Neither CUDA nor MPS are available - defaulting to CPU.
```

**원인:** NVIDIA GPU가 없거나 CUDA가 설치되지 않음

**해결:** CPU로도 동작하나, 속도가 느림. GPU 사용 시:
```bash
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
```

### 7.2 EasyOCR 모델 다운로드 실패

**해결:** 수동 다운로드 후 `~/.EasyOCR/model/`에 배치
- https://github.com/JaidedAI/EasyOCR/releases

### 7.3 한글 깨짐 (결과 이미지)

OpenCV의 `putText`는 한글을 지원하지 않습니다.

**해결:** PIL 사용
```python
from PIL import Image, ImageDraw, ImageFont

font = ImageFont.truetype("malgun.ttf", 20)  # 한글 폰트
draw.text((x, y), text, font=font, fill=(0, 255, 0))
```

### 7.4 검출은 되는데 OCR 결과가 이상함

**원인:**
1. 번호판 이미지가 너무 작음
2. 번호판이 기울어짐
3. 조명/반사 문제

**해결:**
```python
# 크롭 시 여유 공간 추가
margin = 10  # 5 → 10으로 증가
plate_img = image[y1-margin:y2+margin, x1-margin:x2+margin]

# 이미지 전처리 (선택)
import cv2
gray = cv2.cvtColor(plate_img, cv2.COLOR_BGR2GRAY)
_, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
```

---

## 다음 단계 (선택)

### 방법 A: 직접 구현 학습

Step 2, Step 3을 직접 구현하여 딥러닝 이해도를 높이고 싶다면:

1. **Step 2: 문자 분할** - OpenCV 컨투어로 개별 문자 추출
2. **Step 3: 문자 인식** - EMNIST 모델로 숫자/영문, 한글 CNN 모델 학습

자세한 내용: `번호판_인식_단계별_가이드.md` 참조

### 방법 B: 성능 개선

현재 EasyOCR 기반 시스템의 성능 개선:

1. GPU 환경 구축 (CUDA 설치)
2. 이미지 전처리 추가 (이진화, 노이즈 제거)
3. 한국 번호판 특화 후처리 (형식 검증)

---

## 요약

```
┌────────────────────────────────────────────────────────────┐
│                    번호판 인식 시스템                        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  [Step 1] YOLO 번호판 검출                                  │
│  ├─ 학습: Google Colab (Tesla T4)                          │
│  ├─ 데이터: Kaggle 433장                                   │
│  ├─ 결과: mAP50 = 88%                                      │
│  └─ 모델: models/plate_detector.pt                         │
│                                                            │
│  [Step 2+3] EasyOCR 문자 인식                               │
│  ├─ 학습: ❌ 없음 (사전 학습 모델 사용)                       │
│  ├─ 모델: ~/.EasyOCR/model/ (자동 다운로드)                  │
│  └─ 지원: 한국어 + 영어                                     │
│                                                            │
│  [통합 스크립트]                                            │
│  └─ detect_and_read.py                                     │
│                                                            │
│  [결과 저장]                                                │
│  └─ results/ocr_*.png                                      │
│                                                            │
└────────────────────────────────────────────────────────────┘
```
