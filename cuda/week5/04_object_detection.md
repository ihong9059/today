# Day 4: 객체 탐지 예제

## 1. 객체 탐지란?

이미지에서 물체를 찾아 위치와 종류를 알려줍니다.

```
입력 이미지:          출력:
┌──────────────┐     ┌──────────────┐
│    🚗       │     │ ┌──┐ car 95% │
│         🐕  │ →   │ │🚗│         │
│    🧑       │     │ └──┘ ┌──┐    │
│              │     │     │🐕│ dog 87%
└──────────────┘     └──────────────┘
```

---

## 2. YOLO 소개

### 2.1 YOLO란?

**Y**ou **O**nly **L**ook **O**nce
- 실시간 객체 탐지 모델
- 빠르고 정확함
- Jetson에 최적

### 2.2 버전

| 버전 | 특징 |
|------|------|
| YOLOv5 | 널리 사용, PyTorch 기반 |
| YOLOv8 | 최신, 더 정확 |
| YOLO-NAS | 경량화 |

---

## 3. YOLOv5 + TensorRT

### 3.1 설치

```bash
# YOLOv5 클론
git clone https://github.com/ultralytics/yolov5.git
cd yolov5

# 의존성 설치
pip install -r requirements.txt
```

### 3.2 ONNX 내보내기

```bash
# YOLOv5s 모델을 ONNX로 변환
python export.py --weights yolov5s.pt --include onnx
```

### 3.3 TensorRT 엔진 빌드

```bash
trtexec --onnx=yolov5s.onnx \
        --saveEngine=yolov5s.engine \
        --fp16
```

---

## 4. Python 추론 코드

```python
# yolo_inference.py
import cv2
import numpy as np
import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit

class YOLODetector:
    def __init__(self, engine_path, conf_thresh=0.5, nms_thresh=0.4):
        self.conf_thresh = conf_thresh
        self.nms_thresh = nms_thresh

        # 엔진 로드
        logger = trt.Logger(trt.Logger.WARNING)
        with open(engine_path, 'rb') as f:
            self.engine = trt.Runtime(logger).deserialize_cuda_engine(f.read())

        self.context = self.engine.create_execution_context()

        # 입출력 정보
        self.input_shape = (1, 3, 640, 640)
        self.output_shape = (1, 25200, 85)  # YOLOv5s

        # GPU 메모리 할당
        self.d_input = cuda.mem_alloc(np.prod(self.input_shape) * 4)
        self.d_output = cuda.mem_alloc(np.prod(self.output_shape) * 4)

        # COCO 클래스
        self.classes = ['person', 'bicycle', 'car', 'motorcycle', ...]  # 80개

    def preprocess(self, img):
        # 크기 조정 + 정규화
        img_resized = cv2.resize(img, (640, 640))
        img_rgb = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)
        img_norm = img_rgb.astype(np.float32) / 255.0
        img_chw = np.transpose(img_norm, (2, 0, 1))
        img_batch = np.expand_dims(img_chw, axis=0)
        return np.ascontiguousarray(img_batch)

    def detect(self, img):
        orig_h, orig_w = img.shape[:2]

        # 전처리
        input_data = self.preprocess(img)

        # 추론
        cuda.memcpy_htod(self.d_input, input_data)
        self.context.execute_v2([int(self.d_input), int(self.d_output)])

        output = np.empty(self.output_shape, dtype=np.float32)
        cuda.memcpy_dtoh(output, self.d_output)

        # 후처리
        detections = self.postprocess(output[0], orig_w, orig_h)
        return detections

    def postprocess(self, output, orig_w, orig_h):
        # 신뢰도 필터링
        conf = output[:, 4]
        mask = conf > self.conf_thresh
        output = output[mask]

        if len(output) == 0:
            return []

        # 박스 변환
        boxes = output[:, :4]
        scores = output[:, 4:5] * output[:, 5:]
        class_ids = np.argmax(scores, axis=1)
        confidences = np.max(scores, axis=1)

        # 좌표 스케일링
        x_scale = orig_w / 640
        y_scale = orig_h / 640

        results = []
        for i, box in enumerate(boxes):
            cx, cy, w, h = box
            x1 = int((cx - w/2) * x_scale)
            y1 = int((cy - h/2) * y_scale)
            x2 = int((cx + w/2) * x_scale)
            y2 = int((cy + h/2) * y_scale)

            results.append({
                'box': [x1, y1, x2, y2],
                'class': self.classes[class_ids[i]],
                'confidence': confidences[i]
            })

        return results

def draw_detections(img, detections):
    for det in detections:
        x1, y1, x2, y2 = det['box']
        label = f"{det['class']} {det['confidence']:.2f}"

        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(img, label, (x1, y1-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    return img

# 사용 예시
if __name__ == "__main__":
    detector = YOLODetector("yolov5s.engine")

    img = cv2.imread("test.jpg")
    detections = detector.detect(img)

    result = draw_detections(img, detections)
    cv2.imwrite("result.jpg", result)

    for det in detections:
        print(f"{det['class']}: {det['confidence']:.2f}")
```

---

## 5. OpenCV DNN 대안

TensorRT 없이 OpenCV만으로도 가능:

```python
import cv2

# ONNX 모델 로드
net = cv2.dnn.readNetFromONNX("yolov5s.onnx")

# CUDA 백엔드 설정
net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

# 추론
blob = cv2.dnn.blobFromImage(img, 1/255.0, (640, 640), swapRB=True)
net.setInput(blob)
outputs = net.forward()
```

---

## 6. 성능 비교

| 방법 | FPS (Jetson Nano) |
|------|-------------------|
| PyTorch (CPU) | ~1 |
| PyTorch (GPU) | ~5 |
| OpenCV DNN (CUDA) | ~10 |
| TensorRT FP16 | ~20 |
| TensorRT INT8 | ~30 |

---

## 7. 오늘의 실습

### 실습 1: YOLO 설치
- [ ] YOLOv5 클론
- [ ] 의존성 설치

### 실습 2: TensorRT 변환
- [ ] ONNX 내보내기
- [ ] TensorRT 엔진 빌드

### 실습 3: 객체 탐지
- [ ] 이미지에서 객체 탐지
- [ ] 결과 시각화

---

## 8. 다음 시간 예고

내일은 실시간 영상 처리를 구현합니다!
- 웹캠 입력
- 실시간 객체 탐지
- FPS 최적화
