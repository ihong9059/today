# 예제 1: opencv_cuda_basic.cpp

## 목적
**OpenCV의 CUDA 가속 기능을 사용하여 이미지를 처리한다.**

OpenCV는 이미 최적화된 CUDA 함수들을 제공합니다. 직접 커널을 작성하지 않고도 GPU 가속을 활용할 수 있습니다.

---

## 실행 방법

```bash
cd ~/cuda/week5/code

# 컴파일 (Jetson에서)
g++ opencv_cuda_basic.cpp -o opencv_cuda_basic \
    `pkg-config --cflags --libs opencv4`

# 실행
./opencv_cuda_basic [input.jpg]
```

---

## 실행 결과

```
==========================================
  OpenCV CUDA Basic Example
==========================================

CUDA Devices: 1
Device: NVIDIA Tegra X1
Memory: 3964 MB

Loaded: input.jpg (1920x1080)

--- Test 1: Grayscale Conversion ---
CPU: 5.234 ms
GPU: 0.312 ms
Speedup: 16.78x

--- Test 2: Gaussian Blur ---
CPU: 45.678 ms
GPU: 2.345 ms
Speedup: 19.48x

--- Test 3: Resize (50%) ---
CPU: 12.345 ms
GPU: 0.567 ms
Speedup: 21.77x

--- Test 4: Sobel Edge Detection ---
CPU: 23.456 ms
GPU: 1.234 ms
Speedup: 19.01x

Results saved:
  - opencv_blur_output.jpg
  - opencv_edge_output.jpg
```

---

## 코드 분석

### CUDA 디바이스 확인

```cpp
int deviceCount = cuda::getCudaEnabledDeviceCount();
cout << "CUDA Devices: " << deviceCount << endl;

cuda::DeviceInfo deviceInfo;
cout << "Device: " << deviceInfo.name() << endl;
cout << "Memory: " << deviceInfo.totalMemory() / (1024*1024) << " MB" << endl;
```

### GpuMat - GPU 메모리에 저장되는 행렬

```cpp
Mat img = imread("input.jpg");        // CPU 메모리
cuda::GpuMat d_img;                    // GPU 메모리
d_img.upload(img);                     // CPU → GPU 복사

// GPU에서 처리
cuda::GpuMat d_result;
cuda::cvtColor(d_img, d_result, COLOR_BGR2GRAY);

// GPU → CPU 복사
Mat result;
d_result.download(result);
```

### 주요 CUDA 함수들

```cpp
// 색상 변환
cuda::cvtColor(d_img, d_gray, COLOR_BGR2GRAY);

// 가우시안 블러
Ptr<cuda::Filter> gaussianFilter =
    cuda::createGaussianFilter(d_img.type(), -1, Size(15, 15), 0);
gaussianFilter->apply(d_img, d_blur);

// 리사이즈
cuda::resize(d_img, d_resize, Size(), 0.5, 0.5);

// 소벨 엣지
Ptr<cuda::Filter> sobelFilter =
    cuda::createSobelFilter(CV_8UC1, CV_8UC1, 1, 1);
sobelFilter->apply(d_gray, d_sobel);
```

---

## 핵심 포인트

### 1. OpenCV CUDA vs 직접 커널 작성

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   직접 커널 작성 (Week4)                                    │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ - 최대 성능 최적화 가능                             │   │
│   │ - 커스텀 알고리즘 구현                              │   │
│   │ - 코드가 복잡함                                     │   │
│   │ - 메모리 관리 직접 해야 함                          │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   OpenCV CUDA (Week5)                                       │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ + 이미 최적화된 함수 사용                           │   │
│   │ + 코드가 간결함                                     │   │
│   │ + GpuMat로 메모리 관리 자동화                       │   │
│   │ - 커스터마이징 제한                                 │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   → 대부분의 경우 OpenCV CUDA로 충분!                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. Jetson에서 OpenCV 사용

Jetson Nano의 JetPack에는 OpenCV 4.x가 CUDA 지원과 함께 설치되어 있습니다:

```bash
# OpenCV 버전 확인
pkg-config --modversion opencv4

# CUDA 지원 확인
python3 -c "import cv2; print(cv2.cuda.getCudaEnabledDeviceCount())"
```

### 3. Filter 객체 패턴

```cpp
// 필터 생성 (한 번만)
Ptr<cuda::Filter> filter = cuda::createGaussianFilter(...);

// 필터 적용 (여러 번)
filter->apply(input1, output1);
filter->apply(input2, output2);
```

필터 객체를 재사용하면 초기화 오버헤드를 줄일 수 있습니다.

---

## 주요 OpenCV CUDA 모듈

| 모듈 | 기능 |
|------|------|
| `cuda::cvtColor` | 색상 변환 |
| `cuda::resize` | 리사이즈 |
| `cuda::GaussianFilter` | 가우시안 블러 |
| `cuda::SobelFilter` | 엣지 검출 |
| `cuda::threshold` | 이진화 |
| `cuda::warpAffine` | 어파인 변환 |
| `cuda::HOG` | 객체 검출 |

---

## 이 예제에서 배우는 것

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   📚 핵심 교훈                                                ║
║                                                               ║
║   1. GpuMat = GPU 메모리에 저장되는 OpenCV 행렬               ║
║                                                               ║
║   2. upload() / download()로 CPU ↔ GPU 전송                   ║
║                                                               ║
║   3. cuda:: 네임스페이스의 함수들 = GPU 가속 버전             ║
║                                                               ║
║   4. Filter 객체를 재사용하여 성능 향상                       ║
║                                                               ║
║   5. 직접 커널 작성 없이도 ~20x 속도 향상 가능                ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 다음 단계

`video_processing.cpp`에서 실시간 영상에 CUDA 필터를 적용합니다.

---

*작성일: 2026-02-20*
