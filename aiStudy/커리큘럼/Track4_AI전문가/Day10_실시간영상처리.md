# Day 10: 실시간 영상 처리 — "웹캠으로 AI 객체 검출을 체험한다"

## 학습 목표
- 웹캠 또는 비디오 파일에서 실시간 객체 검출을 수행한다
- FPS(Frames Per Second)를 측정하고 최적화한다
- Bounding Box에 라벨, 신뢰도, 색상을 커스터마이징한다
- 검출 결과를 비디오 파일로 저장한다

## 준비물
- Google Colab (GPU 런타임)
- 테스트 비디오 파일 또는 웹캠 (로컬 PC에서 실행 시)
- Day 8~9에서 학습한 YOLO 모델

## 실습 1: 비디오 파일 객체 검출 (30분)

1. 테스트 비디오를 준비하고 YOLO로 처리한다:

```python
!pip install ultralytics -q
from ultralytics import YOLO
import cv2
import time
import numpy as np

# 샘플 비디오 다운로드
import urllib.request
video_url = "https://github.com/ultralytics/assets/releases/download/v0.0.0/decelera_landscape_min.mov"
urllib.request.urlretrieve(video_url, "test_video.mov")

model = YOLO("yolov8n.pt")

# 비디오 정보 확인
cap = cv2.VideoCapture("test_video.mov")
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
cap.release()

print(f"비디오 정보:")
print(f"  해상도: {width}x{height}")
print(f"  FPS: {fps}")
print(f"  총 프레임: {total_frames}")
print(f"  길이: {total_frames/fps:.1f}초")
```

2. 프레임별 검출을 수행한다:

```python
cap = cv2.VideoCapture("test_video.mov")

frame_count = 0
detection_log = []
fps_list = []

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    start_time = time.time()

    # YOLO 추론
    results = model(frame, verbose=False)

    # FPS 계산
    inference_time = time.time() - start_time
    current_fps = 1.0 / inference_time if inference_time > 0 else 0
    fps_list.append(current_fps)

    # 검출 결과 기록
    n_detections = len(results[0].boxes)
    detection_log.append(n_detections)

    frame_count += 1
    if frame_count % 30 == 0:
        print(f"프레임 {frame_count}/{total_frames}: "
              f"검출 {n_detections}개, FPS: {current_fps:.1f}")

cap.release()

avg_fps = np.mean(fps_list)
print(f"\n처리 완료: {frame_count} 프레임, 평균 FPS: {avg_fps:.1f}")
```

### 관찰 포인트
- 평균 FPS가 실시간(30 FPS) 이상인가?
- 프레임마다 검출 수가 변동하는 이유는 무엇인가?

## 실습 2: 커스텀 바운딩 박스 시각화 (30분)

1. 바운딩 박스를 직접 그리는 함수를 만든다:

```python
def draw_detections(frame, results, model):
    """커스텀 바운딩 박스 시각화"""
    # 클래스별 색상 지정
    colors = {
        'person': (0, 255, 0),
        'car': (255, 0, 0),
        'bus': (0, 0, 255),
        'truck': (255, 255, 0),
    }
    default_color = (128, 128, 128)

    for box in results[0].boxes:
        # 좌표 추출
        x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
        conf = float(box.conf)
        cls_id = int(box.cls)
        cls_name = model.names[cls_id]

        # 색상 선택
        color = colors.get(cls_name, default_color)

        # 바운딩 박스
        cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)

        # 라벨 배경
        label = f"{cls_name} {conf:.2f}"
        (label_w, label_h), baseline = cv2.getTextSize(
            label, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 1)
        cv2.rectangle(frame, (x1, y1 - label_h - 10),
                      (x1 + label_w, y1), color, -1)

        # 라벨 텍스트
        cv2.putText(frame, label, (x1, y1 - 5),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)

    return frame


# 테스트: 단일 프레임에 적용
cap = cv2.VideoCapture("test_video.mov")
ret, frame = cap.read()
cap.release()

results = model(frame, verbose=False)
annotated = draw_detections(frame.copy(), results, model)

import matplotlib.pyplot as plt
plt.figure(figsize=(12, 8))
plt.imshow(cv2.cvtColor(annotated, cv2.COLOR_BGR2RGB))
plt.title("커스텀 바운딩 박스")
plt.axis('off')
plt.show()
```

2. FPS 오버레이를 추가한다:

```python
def add_fps_overlay(frame, fps):
    """FPS 표시 오버레이"""
    text = f"FPS: {fps:.1f}"
    cv2.putText(frame, text, (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    return frame
```

### 관찰 포인트
- 클래스별 색상 구분이 가독성을 높이는가?
- 라벨 배경을 추가하면 가독성이 어떻게 변하는가?

## 실습 3: 결과 비디오 저장 (20분)

1. 검출 결과를 비디오 파일로 저장한다:

```python
cap = cv2.VideoCapture("test_video.mov")
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# VideoWriter 설정
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter("output_detected.mp4", fourcc, fps, (width, height))

frame_count = 0
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    start = time.time()
    results = model(frame, verbose=False)
    current_fps = 1.0 / (time.time() - start)

    # 바운딩 박스 + FPS 그리기
    annotated = draw_detections(frame.copy(), results, model)
    annotated = add_fps_overlay(annotated, current_fps)

    out.write(annotated)
    frame_count += 1

cap.release()
out.release()
print(f"저장 완료: output_detected.mp4 ({frame_count} 프레임)")
```

2. Colab에서 결과 비디오를 확인한다:

```python
from IPython.display import HTML
from base64 import b64encode

# 비디오 표시 (Colab용)
video_data = open("output_detected.mp4", "rb").read()
video_b64 = b64encode(video_data).decode()
HTML(f'<video controls width="640"><source src="data:video/mp4;base64,{video_b64}"></video>')
```

### 관찰 포인트
- 출력 비디오의 FPS가 원본과 동일한가?
- 비디오 코덱(mp4v)이 호환성 문제를 일으키지 않는가?

## 과제

### 제출물: "실시간 영상 처리 결과 보고서"

```markdown
# Day 10 과제: 실시간 영상 처리

## 1. FPS 측정 결과
| 모델     | 해상도   | 평균 FPS | 실시간 가능 여부 |
|----------|----------|----------|-----------------|
| YOLOv8n  | 640x480  |          |                 |
| YOLOv8s  | 640x480  |          |                 |
| YOLOv8n  | 1280x720 |          |                 |

## 2. 출력 비디오
- 파일명:
- 프레임 수:
- 검출된 주요 객체:

## 3. 최적화 아이디어
- FPS를 높이기 위한 방법 3가지:
- 정확도를 유지하면서 속도를 개선하는 전략:
```

## 강사 참고 사항
- Colab에서는 웹캠 직접 사용이 어려우므로 비디오 파일로 대체한다
- 로컬 PC가 있는 경우 웹캠 실시간 데모를 보여주면 효과적이다
- 비디오 인코딩 시 H264 코덱을 사용하면 호환성이 좋다
