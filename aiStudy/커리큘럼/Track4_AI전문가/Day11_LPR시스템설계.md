# Day 11: LPR 시스템 설계 — "번호판 인식 프로젝트의 청사진"

## 학습 목표
- LPR(License Plate Recognition) 시스템의 전체 파이프라인을 설계한다
- 한국 번호판의 종류와 특징을 분석한다
- EasyOCR과 Tesseract의 차이를 비교하고 적합한 도구를 선택한다
- 프로젝트 폴더 구조와 모듈별 역할을 정의한다

## 준비물
- Google Colab (GPU 런타임)
- pip install easyocr pytesseract
- 한국 번호판 이미지 10장 이상

## 실습 1: LPR 파이프라인 아키텍처 설계 (30분)

1. Claude Code로 시스템 아키텍처를 설계한다:

```
한국 번호판 인식(LPR) 시스템의 전체 파이프라인을 설계해줘.
다음 단계를 포함해야 해:
1. 이미지/영상 입력
2. 번호판 영역 검출 (YOLO)
3. 번호판 이미지 전처리 (OpenCV)
4. 문자 인식 (OCR)
5. 후처리 (정규식 검증)
6. 결과 저장/출력

각 단계의 입력/출력 형식과 사용할 라이브러리를 명시해줘.
```

2. 프로젝트 폴더 구조를 생성한다:

```python
import os

project_structure = {
    "lpr_project": [
        "data/images",
        "data/videos",
        "data/dataset/train/images",
        "data/dataset/train/labels",
        "data/dataset/valid/images",
        "data/dataset/valid/labels",
        "models",
        "src",
        "outputs",
        "tests",
    ]
}

for root, dirs in project_structure.items():
    for d in dirs:
        path = os.path.join(root, d)
        os.makedirs(path, exist_ok=True)
        print(f"생성: {path}")

# 파이프라인 설정 파일
config = {
    "detector": {
        "model": "yolov8n.pt",
        "conf_threshold": 0.5,
        "iou_threshold": 0.45,
        "imgsz": 640,
    },
    "ocr": {
        "engine": "easyocr",
        "languages": ["ko", "en"],
        "confidence_threshold": 0.3,
    },
    "postprocess": {
        "plate_pattern": r"^\d{2,3}[가-힣]\d{4}$",
        "min_plate_size": [50, 20],
    }
}

import json
with open("lpr_project/config.json", "w", encoding="utf-8") as f:
    json.dump(config, f, ensure_ascii=False, indent=2)
print("\nconfig.json 저장 완료")
```

### 관찰 포인트
- 각 단계 사이의 데이터 흐름(이미지 -> bbox -> cropped -> text)을 이해했는가?
- 설정 파일로 파라미터를 관리하는 이유를 알고 있는가?

## 실습 2: 한국 번호판 분석 (20분)

1. 한국 번호판 규격을 정리한다:

```python
# 한국 번호판 종류와 패턴
plate_types = {
    "신형 (2019~)": {
        "pattern": "NNN가NNNN",
        "regex": r"^\d{3}[가-힣]\d{4}$",
        "example": "123가4567",
        "size": "520mm x 110mm",
    },
    "구형 (2004~2019)": {
        "pattern": "NN가NNNN",
        "regex": r"^\d{2}[가-힣]\d{4}$",
        "example": "12가3456",
        "size": "520mm x 110mm",
    },
    "영업용": {
        "pattern": "서울NN가NNNN",
        "regex": r"^[가-힣]{2}\d{2}[가-힣]\d{4}$",
        "example": "서울12가3456",
        "size": "520mm x 110mm",
    },
}

for ptype, info in plate_types.items():
    print(f"\n=== {ptype} ===")
    for key, val in info.items():
        print(f"  {key}: {val}")
```

2. 정규식으로 번호판 패턴을 검증한다:

```python
import re

def validate_plate(text):
    """한국 번호판 패턴 검증"""
    patterns = [
        (r"^\d{3}[가-힣]\d{4}$", "신형"),
        (r"^\d{2}[가-힣]\d{4}$", "구형"),
        (r"^[가-힣]{2}\d{2}[가-힣]\d{4}$", "영업용"),
    ]

    # 공백 제거
    text = text.replace(" ", "")

    for pattern, ptype in patterns:
        if re.match(pattern, text):
            return True, ptype

    return False, "미인식"

# 테스트
test_cases = ["123가4567", "12나3456", "서울34가5678", "ABC1234", "12 가 3456"]
for tc in test_cases:
    valid, ptype = validate_plate(tc)
    print(f"  '{tc}' -> 유효: {valid}, 유형: {ptype}")
```

### 관찰 포인트
- 한국 번호판의 한글 위치가 패턴 인식에 어떤 역할을 하는가?
- 공백이나 특수문자가 포함된 OCR 결과를 어떻게 정제하는가?

## 실습 3: EasyOCR vs Tesseract 비교 (30분)

1. 두 OCR 엔진을 설치하고 비교한다:

```python
!pip install easyocr pytesseract -q
!apt-get install tesseract-ocr tesseract-ocr-kor -q

import easyocr
import pytesseract
import cv2
import numpy as np
import time

# 테스트 번호판 이미지 생성
def create_plate_image(text="123가4567"):
    plate = np.ones((80, 350, 3), dtype=np.uint8) * 255
    cv2.rectangle(plate, (5, 5), (345, 75), (0, 100, 0), 2)
    cv2.putText(plate, text, (15, 58),
                cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 0, 0), 3)
    return plate

plate_img = create_plate_image()
plate_gray = cv2.cvtColor(plate_img, cv2.COLOR_BGR2GRAY)
```

2. EasyOCR 테스트:

```python
reader = easyocr.Reader(['ko', 'en'], gpu=True)

start = time.time()
easy_results = reader.readtext(plate_gray)
easy_time = time.time() - start

print("=== EasyOCR 결과 ===")
for bbox, text, conf in easy_results:
    print(f"  텍스트: '{text}', 신뢰도: {conf:.4f}")
print(f"  처리 시간: {easy_time*1000:.1f}ms")
```

3. Tesseract 테스트:

```python
start = time.time()
tess_text = pytesseract.image_to_string(plate_gray, lang='kor+eng',
                                         config='--psm 7')
tess_time = time.time() - start

print("\n=== Tesseract 결과 ===")
print(f"  텍스트: '{tess_text.strip()}'")
print(f"  처리 시간: {tess_time*1000:.1f}ms")

print("\n=== 비교 요약 ===")
print(f"EasyOCR: 정확도 높음, 속도 {easy_time*1000:.0f}ms")
print(f"Tesseract: 설치 간편, 속도 {tess_time*1000:.0f}ms")
```

### 관찰 포인트
- EasyOCR이 한국어 인식에서 더 나은 성능을 보이는가?
- 전처리 품질에 따라 OCR 결과가 얼마나 달라지는가?

## 과제

### 제출물: "LPR 시스템 설계 문서"

```markdown
# Day 11 과제: LPR 시스템 설계

## 1. 파이프라인 다이어그램
- 이미지 입력 -> [단계1] -> [단계2] -> ... -> 결과 출력
- 각 단계의 입력/출력 명시:

## 2. 한국 번호판 패턴 정리
| 유형   | 패턴        | 정규식              | 예시       |
|--------|-------------|---------------------|------------|
| 신형   |             |                     |            |
| 구형   |             |                     |            |
| 영업용 |             |                     |            |

## 3. OCR 엔진 선택 근거
- EasyOCR 장단점:
- Tesseract 장단점:
- 최종 선택과 이유:
```

## 강사 참고 사항
- 이 날은 코딩보다 설계에 집중하므로 화이트보드나 그림을 많이 활용한다
- 번호판 이미지는 저작권 문제로 직접 촬영하거나 시뮬레이션 이미지를 사용한다
- EasyOCR이 한국어 지원이 좋지만, 첫 로딩이 느린 점을 미리 안내한다
