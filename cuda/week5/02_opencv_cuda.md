# Day 2: OpenCV + CUDA

## 1. OpenCV CUDA 모듈

### 1.1 개요

OpenCV는 많은 함수의 CUDA 버전을 제공합니다.
- `cv2.cuda` (Python)
- `cv::cuda` (C++)

### 1.2 장점

- 기존 OpenCV 코드와 쉽게 통합
- 직접 CUDA 커널 작성 불필요
- 대부분의 이미지 처리 함수 지원

---

## 2. 기본 사용법 (Python)

### 2.1 GPU 메모리 업로드/다운로드

```python
import cv2

# CPU 이미지 읽기
cpu_img = cv2.imread('input.jpg')

# GPU로 업로드
gpu_img = cv2.cuda_GpuMat()
gpu_img.upload(cpu_img)

# GPU에서 처리...

# CPU로 다운로드
result = gpu_img.download()
```

### 2.2 CUDA 함수 사용

```python
import cv2

# GPU 이미지
gpu_img = cv2.cuda_GpuMat()
gpu_img.upload(cv2.imread('input.jpg'))

# Grayscale 변환 (GPU)
gpu_gray = cv2.cuda.cvtColor(gpu_img, cv2.COLOR_BGR2GRAY)

# Blur (GPU)
gpu_blur = cv2.cuda.createGaussianFilter(
    cv2.CV_8UC1, cv2.CV_8UC1, (5, 5), 0
).apply(gpu_gray)

# 결과 다운로드
result = gpu_blur.download()
cv2.imwrite('output.jpg', result)
```

---

## 3. CUDA 함수 목록

### 3.1 색상 변환

```python
# Grayscale
gpu_gray = cv2.cuda.cvtColor(gpu_img, cv2.COLOR_BGR2GRAY)

# HSV
gpu_hsv = cv2.cuda.cvtColor(gpu_img, cv2.COLOR_BGR2HSV)
```

### 3.2 필터링

```python
# Gaussian Blur
blur_filter = cv2.cuda.createGaussianFilter(
    cv2.CV_8UC3, cv2.CV_8UC3, (15, 15), 0
)
gpu_blur = blur_filter.apply(gpu_img)

# Sobel Edge
sobel_filter = cv2.cuda.createSobelFilter(
    cv2.CV_8UC1, cv2.CV_8UC1, 1, 0, 3
)
gpu_sobel = sobel_filter.apply(gpu_gray)

# Canny Edge
canny_detector = cv2.cuda.createCannyEdgeDetector(50, 150)
gpu_edges = canny_detector.detect(gpu_gray)
```

### 3.3 크기 변환

```python
# Resize
gpu_resized = cv2.cuda.resize(gpu_img, (640, 480))

# Warp
# (회전, 변환 행렬 사용)
```

### 3.4 산술 연산

```python
# 더하기
gpu_result = cv2.cuda.add(gpu_img1, gpu_img2)

# 빼기
gpu_result = cv2.cuda.subtract(gpu_img1, gpu_img2)

# 곱하기
gpu_result = cv2.cuda.multiply(gpu_img1, gpu_img2)

# 절대값 차이
gpu_result = cv2.cuda.absdiff(gpu_img1, gpu_img2)
```

---

## 4. 성능 비교 예제

```python
# cuda_benchmark.py
import cv2
import time
import numpy as np

def benchmark():
    # 큰 이미지 생성
    img = np.random.randint(0, 256, (2000, 3000, 3), dtype=np.uint8)

    # CPU 테스트
    start = time.time()
    for _ in range(100):
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (15, 15), 0)
    cpu_time = time.time() - start
    print(f"CPU: {cpu_time:.3f}s for 100 iterations")

    # GPU 준비
    gpu_img = cv2.cuda_GpuMat()
    gpu_img.upload(img)
    blur_filter = cv2.cuda.createGaussianFilter(
        cv2.CV_8UC1, cv2.CV_8UC1, (15, 15), 0
    )

    # GPU 웜업
    gpu_gray = cv2.cuda.cvtColor(gpu_img, cv2.COLOR_BGR2GRAY)
    gpu_blur = blur_filter.apply(gpu_gray)

    # GPU 테스트
    start = time.time()
    for _ in range(100):
        gpu_gray = cv2.cuda.cvtColor(gpu_img, cv2.COLOR_BGR2GRAY)
        gpu_blur = blur_filter.apply(gpu_gray)
    cv2.cuda.Stream.Null().waitForCompletion()
    gpu_time = time.time() - start
    print(f"GPU: {gpu_time:.3f}s for 100 iterations")

    print(f"Speedup: {cpu_time / gpu_time:.2f}x")

if __name__ == "__main__":
    benchmark()
```

---

## 5. 실시간 영상 처리 (GPU)

```python
# cuda_video.py
import cv2

def main():
    cap = cv2.VideoCapture(0)

    # GPU 필터 준비
    blur_filter = cv2.cuda.createGaussianFilter(
        cv2.CV_8UC3, cv2.CV_8UC3, (15, 15), 0
    )

    gpu_frame = cv2.cuda_GpuMat()

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # GPU로 업로드
        gpu_frame.upload(frame)

        # GPU에서 Blur 적용
        gpu_blur = blur_filter.apply(gpu_frame)

        # CPU로 다운로드
        result = gpu_blur.download()

        cv2.imshow('GPU Blur', result)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
```

---

## 6. C++ 예제

```cpp
// cuda_opencv.cpp
#include <opencv2/opencv.hpp>
#include <opencv2/cudaimgproc.hpp>
#include <opencv2/cudafilters.hpp>

using namespace cv;
using namespace cv::cuda;

int main() {
    // CPU 이미지 읽기
    Mat cpu_img = imread("input.jpg");

    // GPU로 업로드
    GpuMat gpu_img;
    gpu_img.upload(cpu_img);

    // Grayscale (GPU)
    GpuMat gpu_gray;
    cuda::cvtColor(gpu_img, gpu_gray, COLOR_BGR2GRAY);

    // Gaussian Blur (GPU)
    GpuMat gpu_blur;
    Ptr<cuda::Filter> blur_filter = cuda::createGaussianFilter(
        CV_8UC1, CV_8UC1, Size(15, 15), 0
    );
    blur_filter->apply(gpu_gray, gpu_blur);

    // CPU로 다운로드
    Mat result;
    gpu_blur.download(result);

    imwrite("output.jpg", result);
    printf("Done!\n");

    return 0;
}
```

### 컴파일

```bash
g++ -o cuda_opencv cuda_opencv.cpp \
    `pkg-config --cflags --libs opencv4` \
    -I/usr/local/cuda/include \
    -L/usr/local/cuda/lib64 -lcudart
```

---

## 7. 주의사항

### 7.1 메모리 관리

- GPU 업로드/다운로드에 시간 소요
- 가능하면 GPU에서 연속 처리 후 마지막에 다운로드

### 7.2 지원 함수 확인

모든 OpenCV 함수가 CUDA 버전을 가지지는 않습니다:
```python
# 지원 확인
print(dir(cv2.cuda))
```

### 7.3 Jetson에서

JetPack의 OpenCV가 CUDA 지원으로 빌드되어 있는지 확인:
```bash
opencv_version -v  # CUDA 관련 정보 확인
```

---

## 8. 오늘의 실습

### 실습 1: CUDA 지원 확인
- [ ] `cv2.cuda.getCudaEnabledDeviceCount()` 확인
- [ ] CUDA 함수 목록 출력

### 실습 2: GPU 이미지 처리
- [ ] 이미지 GPU 업로드
- [ ] GPU에서 Grayscale, Blur 적용
- [ ] 결과 저장

### 실습 3: 성능 비교
- [ ] CPU vs GPU 벤치마크 실행
- [ ] Speedup 측정

---

## 9. 다음 시간 예고

내일은 TensorRT를 소개합니다!
- TensorRT란?
- 모델 최적화
- Jetson에서 AI 추론
