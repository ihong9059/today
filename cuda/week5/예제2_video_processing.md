# 예제 2: video_processing.cpp

## 목적
**실시간 영상에 CUDA 가속 필터를 적용한다.**

카메라 또는 비디오 파일에서 프레임을 읽고, GPU로 처리한 후 화면에 표시합니다.

---

## 실행 방법

```bash
cd ~/cuda/week5/code

# 컴파일
g++ video_processing.cpp -o video_processing \
    `pkg-config --cflags --libs opencv4`

# 카메라로 실행
./video_processing 0

# 비디오 파일로 실행
./video_processing video.mp4
```

---

## 실행 결과

```
==========================================
  Real-time Video Processing with CUDA
==========================================
Press:
  1 - Original
  2 - Grayscale
  3 - Gaussian Blur
  4 - Edge Detection
  q - Quit
==========================================

Video: 1920x1080 @ 30 fps

[실시간 영상 처리 중...]

Average processing time: 8.234 ms
Average FPS: 121.5
```

---

## 코드 분석

### 비디오 소스 열기

```cpp
VideoCapture cap;

if (isdigit(argv[1][0])) {
    cap.open(atoi(argv[1]));  // 카메라 번호
} else {
    cap.open(argv[1]);         // 파일 경로
}
```

### 실시간 처리 루프

```cpp
while (true) {
    cap >> frame;
    if (frame.empty()) break;

    // GPU로 업로드
    d_frame.upload(frame);

    // 선택된 모드에 따라 처리
    switch (mode) {
        case 1: d_result = d_frame; break;  // 원본
        case 2: cuda::cvtColor(d_frame, d_result, COLOR_BGR2GRAY); break;
        case 3: gaussianFilter->apply(d_frame, d_result); break;
        case 4: sobelFilter->apply(d_gray, d_result); break;
    }

    // GPU에서 다운로드
    d_result.download(display);

    imshow("CUDA Video Processing", display);

    // 키 입력 처리
    int key = waitKey(1);
    if (key == 'q') break;
}
```

---

## 핵심 포인트

### 1. 실시간 처리 파이프라인

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   카메라 → 프레임 → GPU 업로드 → 처리 → 다운로드 → 화면    │
│                                                             │
│   ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐         │
│   │ 캡처   │ → │ upload │ → │ 필터   │ → │download│ → 표시  │
│   │ ~2ms   │   │ ~3ms   │   │ ~2ms   │   │ ~3ms   │         │
│   └────────┘   └────────┘   └────────┘   └────────┘         │
│                                                             │
│   총: ~10ms → 약 100 FPS 가능!                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. FPS 계산

```cpp
double avg_fps = frame_count / (total_time / 1000.0);

// 화면에 정보 표시
putText(display, info, Point(10, 30), FONT_HERSHEY_SIMPLEX,
        0.7, Scalar(0, 255, 0), 2);
```

### 3. 키보드 입력 처리

```cpp
int key = waitKey(1) & 0xFF;  // 1ms 대기
if (key == 'q' || key == 27) break;  // q 또는 ESC
if (key >= '1' && key <= '4') mode = key - '0';
```

`waitKey(1)`은:
- 1ms 동안 키 입력 대기
- 프레임 갱신을 위해 필요
- 0이면 무한 대기

### 4. Jetson 카메라 설정

```cpp
// CSI 카메라 (Raspberry Pi Camera 등)
cap.open("nvarguscamerasrc ! video/x-raw(memory:NVMM), "
         "width=1280, height=720, framerate=30/1 ! "
         "nvvidconv ! video/x-raw, format=BGRx ! "
         "videoconvert ! video/x-raw, format=BGR ! appsink",
         CAP_GSTREAMER);

// USB 웹캠
cap.open(0);
```

---

## 성능 최적화 팁

### 1. GpuMat 재사용

```cpp
// 좋음: 미리 할당
cuda::GpuMat d_frame, d_result;

while (...) {
    d_frame.upload(frame);  // 기존 버퍼 재사용
    filter->apply(d_frame, d_result);
}

// 나쁨: 매번 새로 생성
while (...) {
    cuda::GpuMat d_frame;  // 매번 할당
}
```

### 2. 비동기 처리

```cpp
// 스트림 사용
cuda::Stream stream;

d_frame.upload(frame, stream);
filter->apply(d_frame, d_result, stream);
d_result.download(display, stream);
stream.waitForCompletion();
```

### 3. 해상도 조절

```cpp
// 처리 전 축소 → 처리 → 확대
cuda::resize(d_frame, d_small, Size(), 0.5, 0.5);
filter->apply(d_small, d_result);
cuda::resize(d_result, d_output, d_frame.size());
```

---

## 이 예제에서 배우는 것

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   📚 핵심 교훈                                                ║
║                                                               ║
║   1. VideoCapture로 카메라/비디오 읽기                        ║
║                                                               ║
║   2. 실시간 처리 루프 구조                                    ║
║      캡처 → upload → 처리 → download → 표시                  ║
║                                                               ║
║   3. waitKey()로 키 입력 + 화면 갱신                          ║
║                                                               ║
║   4. GPU 처리로 100+ FPS 달성 가능                            ║
║                                                               ║
║   5. GpuMat 재사용으로 성능 최적화                            ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Week5 정리

| 예제 | 내용 | 핵심 기술 |
|------|------|----------|
| opencv_cuda_basic | 정적 이미지 처리 | GpuMat, CUDA 필터 |
| video_processing | 실시간 영상 처리 | VideoCapture, 루프 |

**OpenCV CUDA = 프로덕션 레벨 GPU 가속!**

---

*작성일: 2026-02-20*
