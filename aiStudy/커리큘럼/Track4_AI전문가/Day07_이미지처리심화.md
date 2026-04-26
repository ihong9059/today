# Day 7: 이미지 처리 심화 — "번호판을 읽기 위한 전처리 기술"

## 학습 목표
- 블러, 샤프닝 등 이미지 필터링을 수행한다
- Canny 엣지 검출과 Otsu 이진화를 적용한다
- 모폴로지 연산(침식, 팽창, 열기, 닫기)을 이해한다
- 번호판 이미지 전처리 파이프라인을 구성한다

## 준비물
- Google Colab
- 번호판 이미지 (인터넷에서 샘플 다운로드)

## 실습 1: 블러와 엣지 검출 (30분)

1. 다양한 블러 기법을 비교한다:

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# 테스트 이미지 생성 (노이즈 추가)
img = cv2.imread("sample.png", cv2.IMREAD_GRAYSCALE)
if img is None:
    img = np.random.randint(0, 256, (300, 400), dtype=np.uint8)
noisy = img.copy()
noise = np.random.normal(0, 25, img.shape).astype(np.uint8)
noisy = cv2.add(noisy, noise)

# 블러 적용
blur_avg = cv2.blur(noisy, (5, 5))
blur_gauss = cv2.GaussianBlur(noisy, (5, 5), 0)
blur_median = cv2.medianBlur(noisy, 5)
blur_bilateral = cv2.bilateralFilter(noisy, 9, 75, 75)

fig, axes = plt.subplots(2, 3, figsize=(15, 10))
titles = ["원본(노이즈)", "Average", "Gaussian", "Median", "Bilateral", "원본(깨끗)"]
images = [noisy, blur_avg, blur_gauss, blur_median, blur_bilateral, img]

for ax, title, image in zip(axes.flat, titles, images):
    ax.imshow(image, cmap='gray')
    ax.set_title(title)
    ax.axis('off')
plt.tight_layout()
plt.show()
```

2. Canny 엣지 검출을 적용한다:

```python
# Canny 엣지 검출
edges_low = cv2.Canny(img, 50, 100)
edges_mid = cv2.Canny(img, 100, 200)
edges_high = cv2.Canny(img, 200, 300)

fig, axes = plt.subplots(1, 4, figsize=(16, 4))
axes[0].imshow(img, cmap='gray')
axes[0].set_title("원본")
axes[1].imshow(edges_low, cmap='gray')
axes[1].set_title("Canny (50,100)")
axes[2].imshow(edges_mid, cmap='gray')
axes[2].set_title("Canny (100,200)")
axes[3].imshow(edges_high, cmap='gray')
axes[3].set_title("Canny (200,300)")

for ax in axes:
    ax.axis('off')
plt.tight_layout()
plt.show()
```

### 관찰 포인트
- Bilateral 필터가 에지를 보존하면서 노이즈를 제거하는 것을 확인했는가?
- Canny 임계값이 높을수록 약한 에지가 사라지는 것을 관찰했는가?

## 실습 2: 이진화와 모폴로지 연산 (30분)

1. 다양한 이진화 기법을 비교한다:

```python
# 전역 이진화
_, thresh_global = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)

# Otsu 이진화 (자동 임계값)
otsu_val, thresh_otsu = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
print(f"Otsu 자동 임계값: {otsu_val}")

# 적응형 이진화
thresh_adaptive = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                         cv2.THRESH_BINARY, 11, 2)

fig, axes = plt.subplots(1, 4, figsize=(16, 4))
axes[0].imshow(img, cmap='gray')
axes[0].set_title("원본")
axes[1].imshow(thresh_global, cmap='gray')
axes[1].set_title("전역 (127)")
axes[2].imshow(thresh_otsu, cmap='gray')
axes[2].set_title(f"Otsu ({otsu_val:.0f})")
axes[3].imshow(thresh_adaptive, cmap='gray')
axes[3].set_title("적응형")

for ax in axes:
    ax.axis('off')
plt.tight_layout()
plt.show()
```

2. 모폴로지 연산을 적용한다:

```python
kernel = np.ones((3, 3), np.uint8)

# 이진 이미지에 모폴로지 적용
binary = thresh_otsu

eroded = cv2.erode(binary, kernel, iterations=1)
dilated = cv2.dilate(binary, kernel, iterations=1)
opened = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)   # 침식 -> 팽창
closed = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)  # 팽창 -> 침식

fig, axes = plt.subplots(2, 3, figsize=(15, 10))
titles = ["이진화", "침식(Erode)", "팽창(Dilate)", "열기(Open)", "닫기(Close)", "원본"]
images = [binary, eroded, dilated, opened, closed, img]

for ax, title, image in zip(axes.flat, titles, images):
    ax.imshow(image, cmap='gray')
    ax.set_title(title)
    ax.axis('off')
plt.tight_layout()
plt.show()
```

### 관찰 포인트
- Otsu가 자동으로 최적 임계값을 찾는 원리를 이해했는가?
- Open(노이즈 제거)과 Close(홀 메우기)의 차이를 체감했는가?

## 실습 3: 번호판 전처리 파이프라인 (30분)

1. 번호판 이미지에 전처리를 적용한다:

```python
# 번호판 이미지 시뮬레이션 (실제 이미지로 대체 가능)
plate = np.ones((80, 300, 3), dtype=np.uint8) * 255
cv2.putText(plate, "12가 3456", (10, 55), cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 0, 0), 3)
# 노이즈 추가
plate_noisy = cv2.add(plate, np.random.normal(0, 30, plate.shape).astype(np.uint8))

def preprocess_plate(image):
    """번호판 OCR을 위한 전처리 파이프라인"""
    # 1. 그레이스케일 변환
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 2. 노이즈 제거 (Bilateral)
    denoised = cv2.bilateralFilter(gray, 11, 17, 17)

    # 3. Otsu 이진화
    _, binary = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # 4. 모폴로지 닫기 (글자 끊김 연결)
    kernel = np.ones((2, 2), np.uint8)
    cleaned = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)

    return gray, denoised, binary, cleaned

gray, denoised, binary, cleaned = preprocess_plate(plate_noisy)

fig, axes = plt.subplots(1, 5, figsize=(20, 4))
titles = ["원본(노이즈)", "그레이", "노이즈제거", "Otsu이진화", "모폴로지"]
images = [cv2.cvtColor(plate_noisy, cv2.COLOR_BGR2RGB), gray, denoised, binary, cleaned]

for ax, title, image in zip(axes, titles, images):
    cmap = None if len(image.shape) == 3 else 'gray'
    ax.imshow(image, cmap=cmap)
    ax.set_title(title)
    ax.axis('off')
plt.suptitle("번호판 전처리 파이프라인")
plt.tight_layout()
plt.show()
```

2. 컨투어를 이용한 문자 영역 찾기:

```python
contours, _ = cv2.findContours(255 - cleaned, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

result = cv2.cvtColor(cleaned, cv2.COLOR_GRAY2BGR)
for cnt in contours:
    x, y, w, h = cv2.boundingRect(cnt)
    if h > 20 and w > 5:  # 작은 노이즈 필터링
        cv2.rectangle(result, (x, y), (x+w, y+h), (0, 255, 0), 1)

plt.imshow(cv2.cvtColor(result, cv2.COLOR_BGR2RGB))
plt.title("문자 영역 검출")
plt.axis('off')
plt.show()
```

### 관찰 포인트
- 전처리 순서가 결과에 어떤 영향을 미치는가?
- 컨투어로 개별 문자를 분리할 수 있는가?

## 과제

### 제출물: "이미지 전처리 파이프라인 보고서"

```markdown
# Day 7 과제: 이미지 처리 심화

## 1. 블러 비교 실험
- 4가지 블러 결과 스크린샷:
- 각 블러의 특징과 적합한 사용 상황:

## 2. 번호판 전처리 실험
- 3장의 다른 번호판 이미지에 파이프라인 적용 결과:
- 각 단계별 중간 결과 이미지:

## 3. 전처리 파이프라인 개선
- 조명 변화에 대응하기 위한 개선 사항:
- 적응형 이진화를 사용한 결과 비교:
```

## 강사 참고 사항
- 실제 번호판 이미지를 사용하면 훨씬 실감나지만, 저작권 문제로 시뮬레이션 이미지를 기본으로 한다
- Day 11~14 LPR 프로젝트의 전처리 단계와 직결되므로 충분히 연습시킨다
- 커널 크기와 반복 횟수에 따른 결과 차이를 실험해보게 한다
