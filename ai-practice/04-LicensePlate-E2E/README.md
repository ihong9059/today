# 04-LicensePlate-E2E: End-to-End 번호판 인식

YOLO + OCR을 활용한 **End-to-End** 번호판 인식 프로젝트입니다.

---

## 접근 방식

```
┌─────────────────────────────────────────────────────────────┐
│                    End-to-End 파이프라인                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────┐     ┌─────────┐     ┌─────────┐              │
│   │  입력   │ ──▶ │  YOLO   │ ──▶ │   OCR   │ ──▶ "12가3456"│
│   │  이미지 │     │  검출   │     │  인식   │              │
│   └─────────┘     └─────────┘     └─────────┘              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

특징:
- 단일 파이프라인으로 입력 → 결과
- 문자 분할 단계 없음 (OCR이 자동 처리)
- 실시간 처리 가능
```

---

## 03 vs 04 비교

| 항목 | 03-LicensePlate (단계별) | 04-LicensePlate-E2E |
|------|-------------------------|---------------------|
| **구조** | 3단계 분리 | 2단계 통합 |
| **문자분할** | OpenCV 직접 구현 | OCR 자동 처리 |
| **학습 난이도** | 각 단계 이해 용이 | 블랙박스 느낌 |
| **성능** | 단계별 최적화 가능 | 일반적으로 더 높음 |
| **속도** | 상대적으로 느림 | 빠름 (최적화됨) |
| **유지보수** | 단계별 수정 가능 | 전체 재학습 필요 |

---

## 프로젝트 구조

```
04-LicensePlate-E2E/
├── README.md
├── docs/
│   ├── YOLOv8_가이드.md
│   ├── PaddleOCR_가이드.md
│   └── EasyOCR_가이드.md
├── experiments/
│   └── exp00_baseline/
│       ├── train_yolo.py          # YOLO 학습
│       ├── inference.py           # 추론 파이프라인
│       └── evaluate.py            # 성능 평가
├── notebooks/
│   ├── YOLO_Training_Colab.ipynb
│   └── E2E_Pipeline.ipynb
├── data/
│   ├── images/                    # 원본 이미지
│   ├── labels/                    # YOLO 형식 라벨
│   └── dataset.yaml               # YOLO 데이터셋 설정
├── models/
│   ├── yolo_plate_detector.pt     # YOLO 모델
│   └── best.pt                    # 최고 성능 모델
└── results/
```

---

## 기술 스택

### 1. 번호판 검출: YOLOv8

```python
from ultralytics import YOLO

# 모델 로드
model = YOLO('yolov8n.pt')

# 학습
model.train(data='dataset.yaml', epochs=100)

# 추론
results = model('car_image.jpg')
```

### 2. 문자 인식: OCR 선택

| OCR | 장점 | 단점 |
|-----|------|------|
| **PaddleOCR** | 한글 지원 우수, 빠름 | 설치 복잡 |
| **EasyOCR** | 설치 간단, 다국어 | 상대적으로 느림 |
| **Tesseract** | 무료, 가벼움 | 정확도 낮음 |

#### PaddleOCR (권장)
```python
from paddleocr import PaddleOCR

ocr = PaddleOCR(lang='korean')
result = ocr.ocr('plate_image.jpg')
```

#### EasyOCR
```python
import easyocr

reader = easyocr.Reader(['ko', 'en'])
result = reader.readtext('plate_image.jpg')
```

---

## 전체 파이프라인

```python
from ultralytics import YOLO
from paddleocr import PaddleOCR

class LicensePlateRecognizer:
    def __init__(self):
        self.detector = YOLO('models/yolo_plate_detector.pt')
        self.ocr = PaddleOCR(lang='korean')

    def recognize(self, image_path):
        # 1. 번호판 검출
        results = self.detector(image_path)

        plates = []
        for box in results[0].boxes:
            # 2. 번호판 영역 크롭
            x1, y1, x2, y2 = box.xyxy[0]
            plate_img = crop_image(image_path, x1, y1, x2, y2)

            # 3. OCR 인식
            text = self.ocr.ocr(plate_img)
            plates.append(text)

        return plates

# 사용
recognizer = LicensePlateRecognizer()
result = recognizer.recognize('car.jpg')
print(result)  # ['12가3456']
```

---

## 데이터 준비

### YOLO 형식 변환

AIHUB JSON → YOLO TXT 변환 필요

```
AIHUB JSON:
{
  "bbox": {"x": 100, "y": 200, "width": 150, "height": 50},
  "plate_number": "12가3456"
}

YOLO TXT (normalized):
0 0.35 0.45 0.15 0.05
↑ ↑    ↑    ↑    ↑
│ │    │    │    └─ height (비율)
│ │    │    └────── width (비율)
│ │    └─────────── center_y (비율)
│ └──────────────── center_x (비율)
└────────────────── class_id (0: plate)
```

### dataset.yaml

```yaml
path: /content/data
train: images/train
val: images/val
test: images/test

nc: 1
names: ['plate']
```

---

## 실행 순서

### 1. 환경 설정 (Colab)
```python
!pip install ultralytics paddlepaddle paddleocr
```

### 2. YOLO 학습
```bash
cd experiments/exp00_baseline
python train_yolo.py
```

### 3. 추론 테스트
```bash
python inference.py --image test_car.jpg
# 출력: Detected plate: 12가3456
```

---

## 예상 성능

| 단계 | 정확도 | 속도 (GPU) |
|------|:------:|:----------:|
| 번호판 검출 | 95%+ | 10ms |
| OCR 인식 | 90%+ | 50ms |
| **전체** | **85%+** | **60ms** |

---

## Colab 실행

### GPU 설정
```
런타임 → 런타임 유형 변경 → GPU (T4)
```

### 빠른 시작
```python
# 1. 설치
!pip install ultralytics paddlepaddle paddleocr

# 2. 사전학습 모델로 테스트
from ultralytics import YOLO
model = YOLO('yolov8n.pt')

# 3. 커스텀 학습
model.train(data='dataset.yaml', epochs=50, imgsz=640)
```

---

## 참고 자료

- [YOLOv8 공식 문서](https://docs.ultralytics.com/)
- [PaddleOCR GitHub](https://github.com/PaddlePaddle/PaddleOCR)
- [EasyOCR GitHub](https://github.com/JaidedAI/EasyOCR)
- [AIHUB 번호판 데이터](https://aihub.or.kr/aidata/27727)

---

## 이전 프로젝트

단계별 학습을 원하시면 → [03-LicensePlate](../03-LicensePlate/)
