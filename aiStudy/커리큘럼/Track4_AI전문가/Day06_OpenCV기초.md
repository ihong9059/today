# Day 6: OpenCV 기초 — "컴퓨터의 눈으로 이미지를 본다"

## 학습 목표
- OpenCV의 기본 함수로 이미지를 읽고, 표시하고, 저장한다
- 색상 공간 변환(BGR, RGB, Gray, HSV)을 이해한다
- 이미지 크기 조절, 자르기, 회전 등 기본 변환을 수행한다
- 이미지에 도형과 텍스트를 그린다

## 준비물
- Google Colab
- 테스트용 이미지 (Colab에서 샘플 다운로드)

## 실습 1: 이미지 읽기와 색상 변환 (30분)

1. 테스트 이미지를 준비하고 읽는다:

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
from google.colab.patches import cv2_imshow
import urllib.request

# 샘플 이미지 다운로드
url = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/300px-PNG_transparency_demonstration_1.png"
urllib.request.urlretrieve(url, "sample.png")

# 이미지 읽기
img = cv2.imread("sample.png")
print(f"이미지 shape: {img.shape}")  # (H, W, C) - BGR
print(f"데이터 타입: {img.dtype}")
print(f"크기: {img.shape[1]}x{img.shape[0]}")
```

2. 색상 공간을 변환한다:

```python
# BGR -> RGB (matplotlib 표시용)
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# BGR -> Grayscale
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# BGR -> HSV
img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

fig, axes = plt.subplots(1, 4, figsize=(16, 4))
axes[0].imshow(img_rgb)
axes[0].set_title("RGB")
axes[1].imshow(img_gray, cmap='gray')
axes[1].set_title("Grayscale")
axes[2].imshow(img_hsv[:,:,0], cmap='hsv')
axes[2].set_title("HSV - Hue")
axes[3].imshow(img_hsv[:,:,1], cmap='gray')
axes[3].set_title("HSV - Saturation")

for ax in axes:
    ax.axis('off')
plt.tight_layout()
plt.show()
```

### 관찰 포인트
- OpenCV는 BGR, matplotlib은 RGB 순서를 사용한다는 점을 인지했는가?
- HSV의 H(색조), S(채도), V(명도) 각각의 의미를 이해했는가?

## 실습 2: 이미지 변환 — 크기, 자르기, 회전 (30분)

1. 크기 조절:

```python
# 리사이즈
resized = cv2.resize(img, (200, 200))
print(f"원본: {img.shape}, 리사이즈: {resized.shape}")

# 비율 유지 리사이즈
scale_percent = 50
width = int(img.shape[1] * scale_percent / 100)
height = int(img.shape[0] * scale_percent / 100)
resized_ratio = cv2.resize(img, (width, height), interpolation=cv2.INTER_AREA)
print(f"50% 축소: {resized_ratio.shape}")
```

2. 이미지 자르기(ROI):

```python
# 이미지 중앙 100x100 잘라내기
h, w = img.shape[:2]
cy, cx = h // 2, w // 2
cropped = img[cy-50:cy+50, cx-50:cx+50]

plt.figure(figsize=(8, 4))
plt.subplot(1, 2, 1)
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.title("원본")
plt.subplot(1, 2, 2)
plt.imshow(cv2.cvtColor(cropped, cv2.COLOR_BGR2RGB))
plt.title("중앙 100x100 크롭")
plt.show()
```

3. 회전:

```python
# 중심 기준 45도 회전
center = (w // 2, h // 2)
M = cv2.getRotationMatrix2D(center, 45, 1.0)
rotated = cv2.warpAffine(img, M, (w, h))

# 상하/좌우 반전
flip_h = cv2.flip(img, 1)  # 좌우
flip_v = cv2.flip(img, 0)  # 상하

fig, axes = plt.subplots(1, 3, figsize=(12, 4))
axes[0].imshow(cv2.cvtColor(rotated, cv2.COLOR_BGR2RGB))
axes[0].set_title("45도 회전")
axes[1].imshow(cv2.cvtColor(flip_h, cv2.COLOR_BGR2RGB))
axes[1].set_title("좌우 반전")
axes[2].imshow(cv2.cvtColor(flip_v, cv2.COLOR_BGR2RGB))
axes[2].set_title("상하 반전")
for ax in axes:
    ax.axis('off')
plt.tight_layout()
plt.show()
```

### 관찰 포인트
- 이미지 좌표계가 (y, x) = (행, 열) 순서임을 이해했는가?
- interpolation 방법(INTER_AREA, INTER_LINEAR)의 차이를 알고 있는가?

## 실습 3: 도형과 텍스트 그리기 (20분)

1. 이미지 위에 다양한 도형을 그린다:

```python
# 빈 캔버스 생성
canvas = np.zeros((400, 600, 3), dtype=np.uint8)

# 직선
cv2.line(canvas, (50, 50), (550, 50), (0, 255, 0), 2)

# 사각형
cv2.rectangle(canvas, (50, 100), (250, 250), (0, 0, 255), 2)
cv2.rectangle(canvas, (300, 100), (500, 250), (255, 0, 0), -1)  # 채움

# 원
cv2.circle(canvas, (300, 330), 50, (0, 255, 255), 2)

# 텍스트
cv2.putText(canvas, "OpenCV Test", (150, 380),
            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

plt.figure(figsize=(10, 6))
plt.imshow(cv2.cvtColor(canvas, cv2.COLOR_BGR2RGB))
plt.title("도형 그리기")
plt.axis('off')
plt.show()
```

2. 실제 이미지에 바운딩 박스를 그린다:

```python
# 이미지 복사 (원본 보존)
img_draw = img.copy()

# 가상의 객체 검출 결과 표시
detections = [
    {"label": "object1", "bbox": (30, 30, 150, 150), "color": (0, 255, 0)},
    {"label": "object2", "bbox": (100, 80, 250, 200), "color": (0, 0, 255)},
]

for det in detections:
    x1, y1, x2, y2 = det["bbox"]
    cv2.rectangle(img_draw, (x1, y1), (x2, y2), det["color"], 2)
    cv2.putText(img_draw, det["label"], (x1, y1-10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, det["color"], 2)

plt.imshow(cv2.cvtColor(img_draw, cv2.COLOR_BGR2RGB))
plt.title("바운딩 박스 표시")
plt.axis('off')
plt.show()
```

### 관찰 포인트
- 바운딩 박스 그리기가 YOLO 결과 시각화의 기본이 됨을 인지했는가?
- thickness=-1이면 채워진 도형이 된다는 점을 확인했는가?

## 과제

### 제출물: "OpenCV 기초 실습 포트폴리오"

```markdown
# Day 6 과제: OpenCV 기초

## 1. 색상 공간 실험
- 자신의 사진을 BGR/Gray/HSV로 변환한 결과 스크린샷:
- HSV에서 특정 색상만 추출(마스킹)한 결과:

## 2. 이미지 변환 모음
- 원본, 리사이즈, 크롭, 회전, 반전 결과:
- 각 변환 코드와 결과 이미지:

## 3. 바운딩 박스 시각화
- 임의의 이미지에 최소 3개의 바운딩 박스를 그린 결과:
- 각 박스에 라벨과 신뢰도(confidence) 텍스트 포함:
```

## 강사 참고 사항
- Colab에서는 cv2.imshow() 대신 matplotlib 또는 cv2_imshow()를 사용해야 한다
- BGR/RGB 혼동은 초보자가 가장 많이 하는 실수이므로 강조한다
- Day 8 YOLO에서 바운딩 박스를 그려야 하므로, 이 실습을 충분히 연습시킨다
