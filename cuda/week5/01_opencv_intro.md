# Day 1: OpenCV 소개 및 설치

## 1. OpenCV란?

### 1.1 소개

OpenCV (Open Source Computer Vision Library)
- 컴퓨터 비전 라이브러리
- 이미지/영상 처리에 필수
- C++, Python, Java 지원
- GPU 가속 지원

### 1.2 주요 기능

- 이미지 읽기/쓰기/표시
- 영상 캡처 및 재생
- 이미지 변환 (크기, 색상 등)
- 필터링, 에지 검출
- 객체 탐지, 추적
- 딥러닝 추론

---

## 2. Jetson에서 OpenCV

### 2.1 JetPack에 포함

JetPack을 설치하면 OpenCV가 이미 설치되어 있습니다!

```bash
# 버전 확인
python3 -c "import cv2; print(cv2.__version__)"

# 또는
pkg-config --modversion opencv4
```

### 2.2 CUDA 지원 확인

```python
import cv2
print(cv2.cuda.getCudaEnabledDeviceCount())  # 1 이상이면 CUDA 지원
```

---

## 3. Python 기초

### 3.1 이미지 읽기/쓰기

```python
import cv2

# 이미지 읽기
img = cv2.imread('input.jpg')

# BGR → RGB 변환 (OpenCV는 BGR 사용)
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# 이미지 저장
cv2.imwrite('output.jpg', img)

# 이미지 표시
cv2.imshow('Image', img)
cv2.waitKey(0)  # 키 입력 대기
cv2.destroyAllWindows()
```

### 3.2 이미지 정보

```python
# 크기, 채널
height, width, channels = img.shape
print(f"Size: {width} x {height}, Channels: {channels}")

# 데이터 타입
print(img.dtype)  # uint8
```

### 3.3 영상 처리

```python
import cv2

# 웹캠 열기
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # 프레임 처리
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    cv2.imshow('Gray', gray)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

---

## 4. C++ 기초

### 4.1 기본 구조

```cpp
#include <opencv2/opencv.hpp>
using namespace cv;

int main() {
    // 이미지 읽기
    Mat img = imread("input.jpg");

    if (img.empty()) {
        printf("Failed to load image!\n");
        return -1;
    }

    // Grayscale 변환
    Mat gray;
    cvtColor(img, gray, COLOR_BGR2GRAY);

    // 저장
    imwrite("gray.jpg", gray);

    // 표시
    imshow("Image", gray);
    waitKey(0);

    return 0;
}
```

### 4.2 컴파일

```bash
g++ -o test test.cpp `pkg-config --cflags --libs opencv4`
./test
```

---

## 5. 자주 사용하는 함수

### 5.1 이미지 변환

```python
# 크기 변경
resized = cv2.resize(img, (640, 480))

# 회전
rotated = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)

# 색상 변환
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
```

### 5.2 필터링

```python
# Blur
blurred = cv2.GaussianBlur(img, (5, 5), 0)

# Edge
edges = cv2.Canny(gray, 100, 200)

# 밝기/대비
adjusted = cv2.convertScaleAbs(img, alpha=1.2, beta=30)
```

### 5.3 도형 그리기

```python
# 선
cv2.line(img, (0, 0), (100, 100), (255, 0, 0), 2)

# 사각형
cv2.rectangle(img, (10, 10), (200, 200), (0, 255, 0), 2)

# 원
cv2.circle(img, (150, 150), 50, (0, 0, 255), -1)

# 텍스트
cv2.putText(img, "Hello", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
```

---

## 6. 예제: 이미지 필터 적용

### 6.1 Python 코드

```python
# opencv_filters.py
import cv2
import sys

def apply_filters(input_path, output_prefix):
    # 이미지 읽기
    img = cv2.imread(input_path)
    if img is None:
        print(f"Failed to load {input_path}")
        return

    print(f"Image: {img.shape[1]}x{img.shape[0]}")

    # 1. Grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    cv2.imwrite(f"{output_prefix}_gray.jpg", gray)

    # 2. Blur
    blur = cv2.GaussianBlur(img, (15, 15), 0)
    cv2.imwrite(f"{output_prefix}_blur.jpg", blur)

    # 3. Edge
    edges = cv2.Canny(gray, 50, 150)
    cv2.imwrite(f"{output_prefix}_edge.jpg", edges)

    # 4. Resize (50%)
    h, w = img.shape[:2]
    resized = cv2.resize(img, (w // 2, h // 2))
    cv2.imwrite(f"{output_prefix}_small.jpg", resized)

    print("Saved: gray, blur, edge, small")

if __name__ == "__main__":
    input_file = sys.argv[1] if len(sys.argv) > 1 else "input.jpg"
    apply_filters(input_file, "output")
```

### 6.2 실행

```bash
python3 opencv_filters.py input.jpg
```

---

## 7. 오늘의 실습

### 실습 1: OpenCV 설치 확인
- [ ] 버전 확인
- [ ] CUDA 지원 확인

### 실습 2: 기본 이미지 처리
- [ ] 이미지 읽기/저장
- [ ] Grayscale 변환
- [ ] 이미지 표시

### 실습 3: 영상 처리
- [ ] 웹캠 열기
- [ ] 실시간 Grayscale 변환
- [ ] 'q' 키로 종료

---

## 8. 용어 정리

| 용어 | 의미 |
|------|------|
| **Mat** | OpenCV의 이미지 행렬 클래스 |
| **BGR** | Blue-Green-Red 색상 순서 |
| **VideoCapture** | 영상/카메라 입력 클래스 |

---

## 9. 다음 시간 예고

내일은 OpenCV의 CUDA 가속을 알아봅니다!
- cv2.cuda 모듈
- GPU 업로드/다운로드
- 성능 비교
