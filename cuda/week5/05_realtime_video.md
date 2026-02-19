# Day 5: 실시간 영상 처리

## 1. 실시간 처리의 과제

### 1.1 목표

- 30 FPS 이상 유지
- 낮은 지연 시간
- 안정적인 처리

### 1.2 병목 지점

```
카메라 캡처 → 전처리 → 추론 → 후처리 → 화면 표시
    ↓           ↓        ↓        ↓          ↓
   빠름       보통     느림!     보통       빠름
```

---

## 2. 최적화 전략

### 2.1 비동기 처리

```
프레임 1: [캡처] [전처리] [추론] [표시]
프레임 2:        [캡처] [전처리] [추론] [표시]
프레임 3:               [캡처] [전처리] [추론] [표시]
                    ↑ 병렬 처리!
```

### 2.2 프레임 스킵

모든 프레임을 처리하지 않고 일부만 처리

### 2.3 해상도 조절

```
1080p → 720p → 480p
  ↓       ↓       ↓
느림    보통    빠름
```

---

## 3. 기본 실시간 처리

```python
# realtime_basic.py
import cv2
import time

def main():
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    # FPS 계산용
    prev_time = time.time()
    fps_list = []

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 처리 (예: Grayscale)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 50, 150)

        # FPS 계산
        curr_time = time.time()
        fps = 1 / (curr_time - prev_time)
        prev_time = curr_time
        fps_list.append(fps)

        # FPS 표시
        cv2.putText(frame, f"FPS: {fps:.1f}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # 결과 표시
        cv2.imshow('Original', frame)
        cv2.imshow('Edges', edges)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    print(f"Average FPS: {sum(fps_list)/len(fps_list):.1f}")

if __name__ == "__main__":
    main()
```

---

## 4. 실시간 객체 탐지

```python
# realtime_detection.py
import cv2
import time
import numpy as np

class RealtimeDetector:
    def __init__(self, engine_path):
        # TensorRT 엔진 로드 (이전 코드 참조)
        self.detector = YOLODetector(engine_path)
        self.skip_frames = 2  # 2프레임마다 탐지
        self.frame_count = 0
        self.last_detections = []

    def process_frame(self, frame):
        self.frame_count += 1

        # 프레임 스킵
        if self.frame_count % self.skip_frames == 0:
            self.last_detections = self.detector.detect(frame)

        # 결과 그리기
        return draw_detections(frame.copy(), self.last_detections)

def main():
    detector = RealtimeDetector("yolov5s.engine")

    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    prev_time = time.time()

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 탐지
        result = detector.process_frame(frame)

        # FPS
        curr_time = time.time()
        fps = 1 / (curr_time - prev_time)
        prev_time = curr_time

        cv2.putText(result, f"FPS: {fps:.1f}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        cv2.imshow('Detection', result)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
```

---

## 5. 멀티스레딩

```python
# threaded_video.py
import cv2
import threading
import queue
import time

class VideoCapture:
    def __init__(self, src=0):
        self.cap = cv2.VideoCapture(src)
        self.q = queue.Queue(maxsize=2)
        self.stopped = False

        # 캡처 스레드 시작
        self.thread = threading.Thread(target=self._capture)
        self.thread.daemon = True
        self.thread.start()

    def _capture(self):
        while not self.stopped:
            ret, frame = self.cap.read()
            if ret:
                if self.q.full():
                    self.q.get()  # 오래된 프레임 제거
                self.q.put(frame)

    def read(self):
        return self.q.get()

    def stop(self):
        self.stopped = True
        self.cap.release()

def main():
    # 멀티스레드 캡처
    cap = VideoCapture(0)

    prev_time = time.time()

    while True:
        frame = cap.read()

        # 처리
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # FPS
        curr_time = time.time()
        fps = 1 / (curr_time - prev_time)
        prev_time = curr_time

        cv2.putText(frame, f"FPS: {fps:.1f}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        cv2.imshow('Frame', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.stop()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
```

---

## 6. GStreamer 파이프라인 (Jetson)

Jetson에서 더 빠른 카메라 캡처:

```python
def gstreamer_pipeline(
    capture_width=1280,
    capture_height=720,
    display_width=640,
    display_height=480,
    framerate=30,
):
    return (
        f"nvarguscamerasrc ! "
        f"video/x-raw(memory:NVMM), "
        f"width={capture_width}, height={capture_height}, "
        f"format=NV12, framerate={framerate}/1 ! "
        f"nvvidconv flip-method=0 ! "
        f"video/x-raw, width={display_width}, height={display_height}, format=BGRx ! "
        f"videoconvert ! video/x-raw, format=BGR ! "
        f"appsink"
    )

# CSI 카메라 사용
cap = cv2.VideoCapture(gstreamer_pipeline(), cv2.CAP_GSTREAMER)
```

---

## 7. 이번 주 정리

### 7.1 배운 내용

1. OpenCV 기본 사용법
2. OpenCV CUDA 가속
3. TensorRT 개념 및 사용법
4. 객체 탐지 구현
5. 실시간 영상 처리 최적화

### 7.2 성능 최적화 요약

| 기법 | 효과 |
|------|------|
| TensorRT | 추론 2~5배 가속 |
| FP16/INT8 | 추가 2배 가속 |
| 프레임 스킵 | FPS 향상 |
| 멀티스레딩 | 지연 시간 감소 |
| GStreamer | 카메라 캡처 최적화 |

---

## 8. 다음 주 예고

**Week 6: 개인 프로젝트**

- 프로젝트 기획
- 구현
- 발표 및 평가
