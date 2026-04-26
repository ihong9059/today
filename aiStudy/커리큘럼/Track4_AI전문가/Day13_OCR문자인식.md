# Day 13: OCR 문자 인식 — "번호판 글자를 읽어낸다"

## 학습 목표
- EasyOCR로 번호판 텍스트를 인식한다
- 전처리 -> OCR -> 후처리(정규식) 파이프라인을 구축한다
- OCR 정확도를 높이기 위한 전처리 최적화 기법을 적용한다
- 다양한 번호판 유형에 대한 인식률을 측정한다

## 준비물
- Google Colab (GPU 런타임)
- EasyOCR 설치 완료
- 번호판 크롭 이미지 20장 이상

## 실습 1: EasyOCR 기본 사용법 (20분)

1. EasyOCR을 초기화하고 기본 인식을 수행한다:

```python
!pip install easyocr -q
import easyocr
import cv2
import numpy as np
import matplotlib.pyplot as plt

# EasyOCR 리더 초기화 (첫 실행 시 모델 다운로드)
reader = easyocr.Reader(['ko', 'en'], gpu=True)
print("EasyOCR 초기화 완료")

# 테스트 번호판 이미지 생성
def create_plate(text, noise_level=0, blur_level=0):
    """번호판 시뮬레이션 이미지 생성"""
    plate = np.ones((100, 400, 3), dtype=np.uint8) * 255
    cv2.rectangle(plate, (5, 5), (395, 95), (0, 100, 0), 3)
    cv2.putText(plate, text, (20, 72),
                cv2.FONT_HERSHEY_SIMPLEX, 2.0, (0, 0, 0), 4)
    if noise_level > 0:
        noise = np.random.normal(0, noise_level, plate.shape).astype(np.uint8)
        plate = cv2.add(plate, noise)
    if blur_level > 0:
        plate = cv2.GaussianBlur(plate, (blur_level, blur_level), 0)
    return plate

# 기본 인식 테스트
plate_img = create_plate("123A4567")
results = reader.readtext(plate_img)

for bbox, text, conf in results:
    print(f"인식 텍스트: '{text}', 신뢰도: {conf:.4f}")

plt.imshow(cv2.cvtColor(plate_img, cv2.COLOR_BGR2RGB))
plt.title("테스트 번호판")
plt.axis('off')
plt.show()
```

2. 다양한 조건에서 인식률을 테스트한다:

```python
conditions = {
    "깨끗": create_plate("123A4567", noise_level=0, blur_level=0),
    "노이즈(약)": create_plate("123A4567", noise_level=15, blur_level=0),
    "노이즈(강)": create_plate("123A4567", noise_level=40, blur_level=0),
    "블러(약)": create_plate("123A4567", noise_level=0, blur_level=3),
    "블러(강)": create_plate("123A4567", noise_level=0, blur_level=7),
    "복합": create_plate("123A4567", noise_level=20, blur_level=3),
}

fig, axes = plt.subplots(2, 3, figsize=(15, 8))
for ax, (name, img) in zip(axes.flat, conditions.items()):
    results = reader.readtext(img)
    text = results[0][1] if results else "인식실패"
    conf = results[0][2] if results else 0

    ax.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    ax.set_title(f"{name}\n'{text}' ({conf:.2f})", fontsize=10)
    ax.axis('off')

plt.suptitle("조건별 OCR 결과")
plt.tight_layout()
plt.show()
```

### 관찰 포인트
- 노이즈와 블러가 OCR 정확도에 어떤 영향을 미치는가?
- 신뢰도(confidence)가 낮은 결과를 어떻게 처리해야 하는가?

## 실습 2: 전처리 최적화 (30분)

1. OCR 전처리 파이프라인을 구축한다:

```python
def preprocess_for_ocr(image, method="standard"):
    """OCR을 위한 전처리 파이프라인"""
    # 그레이스케일 변환
    if len(image.shape) == 3:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    else:
        gray = image.copy()

    if method == "standard":
        # 1. 노이즈 제거
        denoised = cv2.bilateralFilter(gray, 11, 17, 17)
        # 2. Otsu 이진화
        _, binary = cv2.threshold(denoised, 0, 255,
                                   cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        return binary

    elif method == "adaptive":
        # 1. CLAHE (대비 향상)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced = clahe.apply(gray)
        # 2. 적응형 이진화
        binary = cv2.adaptiveThreshold(enhanced, 255,
                                        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                        cv2.THRESH_BINARY, 11, 2)
        return binary

    elif method == "morphology":
        # 1. Otsu 이진화
        _, binary = cv2.threshold(gray, 0, 255,
                                   cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        # 2. 모폴로지 열기 (노이즈 제거)
        kernel = np.ones((2, 2), np.uint8)
        cleaned = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)
        # 3. 모폴로지 닫기 (끊김 연결)
        closed = cv2.morphologyEx(cleaned, cv2.MORPH_CLOSE, kernel)
        return closed

    return gray
```

2. 전처리 방법별 OCR 결과를 비교한다:

```python
# 노이즈가 있는 번호판
noisy_plate = create_plate("123A4567", noise_level=30, blur_level=3)

methods = ["standard", "adaptive", "morphology"]
fig, axes = plt.subplots(1, 4, figsize=(16, 4))

# 원본
axes[0].imshow(cv2.cvtColor(noisy_plate, cv2.COLOR_BGR2RGB))
raw_result = reader.readtext(noisy_plate)
raw_text = raw_result[0][1] if raw_result else "실패"
axes[0].set_title(f"원본\n'{raw_text}'")
axes[0].axis('off')

# 전처리별
for ax, method in zip(axes[1:], methods):
    processed = preprocess_for_ocr(noisy_plate, method)
    result = reader.readtext(processed)
    text = result[0][1] if result else "실패"
    conf = result[0][2] if result else 0

    ax.imshow(processed, cmap='gray')
    ax.set_title(f"{method}\n'{text}' ({conf:.2f})")
    ax.axis('off')

plt.suptitle("전처리 방법별 OCR 비교")
plt.tight_layout()
plt.show()
```

### 관찰 포인트
- 어떤 전처리 방법이 가장 높은 인식률을 보이는가?
- CLAHE가 조명이 고르지 않은 이미지에서 효과적인가?

## 실습 3: 후처리 — 정규식 검증 및 보정 (30분)

1. OCR 결과를 정규식으로 검증하고 보정한다:

```python
import re

def postprocess_plate(ocr_text, ocr_conf):
    """OCR 결과 후처리: 정규식 검증 + 보정"""

    # 1. 공백, 특수문자 제거
    cleaned = re.sub(r'[^0-9가-힣a-zA-Z]', '', ocr_text)

    # 2. 흔한 OCR 오류 보정
    corrections = {
        'O': '0', 'o': '0',
        'I': '1', 'l': '1',
        'Z': '2', 'z': '2',
        'S': '5', 's': '5',
        'B': '8',
        'G': '6',
    }

    # 숫자 위치에서 문자 -> 숫자로 보정
    corrected = list(cleaned)
    for i, ch in enumerate(corrected):
        if ch in corrections and not ('가' <= ch <= '힣'):
            corrected[i] = corrections[ch]
    corrected = ''.join(corrected)

    # 3. 패턴 매칭
    patterns = [
        (r'^(\d{3})([가-힣])(\d{4})$', '신형'),
        (r'^(\d{2})([가-힣])(\d{4})$', '구형'),
    ]

    for pattern, ptype in patterns:
        match = re.match(pattern, corrected)
        if match:
            return {
                'original': ocr_text,
                'corrected': corrected,
                'type': ptype,
                'confidence': ocr_conf,
                'valid': True
            }

    return {
        'original': ocr_text,
        'corrected': corrected,
        'type': '미인식',
        'confidence': ocr_conf,
        'valid': False
    }

# 테스트
test_ocr_results = [
    ("l23가4567", 0.85),
    ("12 나 3456", 0.90),
    ("O8바7890", 0.75),
    ("ABC1234", 0.60),
]

for text, conf in test_ocr_results:
    result = postprocess_plate(text, conf)
    print(f"원본: '{result['original']}' -> 보정: '{result['corrected']}' "
          f"({result['type']}, 유효: {result['valid']})")
```

2. 전체 OCR 파이프라인을 함수로 통합한다:

```python
def ocr_pipeline(plate_image, reader):
    """전처리 -> OCR -> 후처리 통합 파이프라인"""
    # 전처리
    processed = preprocess_for_ocr(plate_image, method="standard")

    # OCR
    results = reader.readtext(processed, detail=1)

    if not results:
        return {"text": "", "confidence": 0, "valid": False, "type": "인식실패"}

    # 가장 높은 신뢰도 결과 선택
    best = max(results, key=lambda x: x[2])
    _, text, conf = best

    # 후처리
    final = postprocess_plate(text, conf)
    return final

# 파이프라인 테스트
plate = create_plate("123A4567", noise_level=15)
result = ocr_pipeline(plate, reader)
print(f"최종 결과: {result}")
```

### 관찰 포인트
- OCR 오류 보정(O->0, l->1)이 실제로 인식률을 높이는가?
- 정규식으로 필터링하면 잘못된 인식 결과를 걸러낼 수 있는가?

## 과제

### 제출물: "OCR 파이프라인 성능 평가 보고서"

```markdown
# Day 13 과제: OCR 문자 인식

## 1. 전처리 방법별 인식률
| 전처리 방법 | 인식 성공 | 인식 실패 | 정확도 |
|------------|----------|----------|--------|
| 원본(없음) |          |          |        |
| standard   |          |          |        |
| adaptive   |          |          |        |
| morphology |          |          |        |

## 2. 후처리 보정 효과
- 보정 전 정확도:
- 보정 후 정확도:
- 주요 보정 사례:

## 3. 실패 사례 분석
- 인식 실패 이미지 3장과 원인:
- 개선 아이디어:
```

## 강사 참고 사항
- 한글 폰트가 Colab에 설치되어 있지 않으면 cv2.putText로 한글 표시가 안 된다 (PIL 사용 필요)
- 실제 번호판 이미지는 시뮬레이션보다 어려우므로, 기대 수준을 적절히 조절한다
- EasyOCR의 allowlist 옵션으로 인식 문자를 제한하면 정확도가 올라간다
