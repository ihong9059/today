# Raspberry Pi + Coral TPU 엣지 배포 가이드

## 개요

Raspberry Pi와 Google Coral TPU를 결합하여 **초저전력 환경에서 실시간 AI 추론**을 수행하는 방법을 다룹니다. 번호판 인식, 객체 탐지 등 엣지 AI 애플리케이션에 적합한 구성입니다.

---

## 시스템 구성도

```
┌─────────────────────────────────────────────────────────────┐
│                    Raspberry Pi 4/5                         │
│  ┌─────────────────────────────────────────────────────────┤
│  │  CPU: ARM Cortex-A72/A76 (범용 연산)                     │
│  │  RAM: 4GB / 8GB                                          │
│  │  OS: Raspberry Pi OS (64-bit)                           │
│  └─────────────────────────────────────────────────────────┤
│                           │                                 │
│                      USB 3.0                                │
│                           │                                 │
│  ┌─────────────────────────────────────────────────────────┤
│  │  Coral USB Accelerator (Edge TPU)                        │
│  │  - 4 TOPS (Tera Operations Per Second)                  │
│  │  - 전용 ML 추론 가속기                                   │
│  │  - TensorFlow Lite 모델 전용                             │
│  └─────────────────────────────────────────────────────────┤
│                           │                                 │
│                       카메라                                 │
│  ┌─────────────────────────────────────────────────────────┤
│  │  Raspberry Pi Camera Module / USB Camera                │
│  │  - 이미지 캡처                                           │
│  │  - 실시간 스트리밍                                       │
│  └─────────────────────────────────────────────────────────┤
└─────────────────────────────────────────────────────────────┘
```

---

## 하드웨어 구성

### 필수 구성품

| 구성품 | 사양 | 가격(대략) | 비고 |
|--------|------|-----------|------|
| Raspberry Pi 4/5 | 4GB RAM 이상 | ₩80,000~120,000 | 64-bit OS 권장 |
| Coral USB Accelerator | Edge TPU | ₩90,000~120,000 | USB 3.0 필수 |
| MicroSD 카드 | 32GB 이상 | ₩15,000 | A2 등급 권장 |
| 전원 어댑터 | 5V 3A (USB-C) | ₩15,000 | 공식 어댑터 권장 |
| 카메라 | Pi Camera v2/v3 | ₩40,000~80,000 | USB 카메라도 가능 |
| 방열판/팬 | 쿨링 솔루션 | ₩10,000~30,000 | 장시간 운영 시 필수 |

**총 예상 비용**: ₩250,000 ~ 350,000

### 선택 구성품

| 구성품 | 용도 | 비고 |
|--------|------|------|
| 케이스 | 보호 + 방열 | 팬 장착 케이스 추천 |
| PoE HAT | 전원 + 네트워크 통합 | 설치 간소화 |
| GPIO 확장보드 | 센서/릴레이 연결 | IoT 통합 시 |

---

## Coral Edge TPU 상세 사양

### Edge TPU란?

Google이 개발한 **전용 ML 추론 가속기(ASIC)**입니다. TensorFlow Lite 모델을 매우 빠르게 실행할 수 있도록 설계되었습니다.

### 하드웨어 사양

| 항목 | 사양 |
|------|------|
| 연산 성능 | 4 TOPS (Tera Operations Per Second) |
| 전력 소비 | 2W (평균), 2.5W (피크) |
| 인터페이스 | USB 3.0 (Type-C) |
| 지원 연산 | INT8 양자화 모델만 |
| 지원 프레임워크 | TensorFlow Lite |
| 크기 | 65mm x 30mm x 8mm |

### 성능 비교

| 디바이스 | MobileNet v2 (ms) | SSD MobileNet (ms) | 전력(W) |
|----------|------------------|-------------------|---------|
| Raspberry Pi 4 (CPU) | 100~200 | 300~500 | 5 |
| **Coral USB + Pi 4** | **3~5** | **10~15** | 7 |
| Jetson Nano (GPU) | 30~50 | 50~80 | 10 |
| PC (GTX 1060) | 2~3 | 5~8 | 120 |

**Coral TPU는 CPU 대비 20~50배 빠름**

---

## 소프트웨어 설치

### 1. Raspberry Pi OS 설정

```bash
# Raspberry Pi OS (64-bit) 설치 후
sudo apt update && sudo apt upgrade -y

# 필수 패키지 설치
sudo apt install -y python3-pip python3-venv libedgetpu1-std
```

### 2. Coral 런타임 설치

```bash
# Coral Edge TPU 런타임 (표준 모드)
echo "deb https://packages.cloud.google.com/apt coral-edgetpu-stable main" | \
    sudo tee /etc/apt/sources.list.d/coral-edgetpu.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo apt update

# 표준 클럭 (추천 - 발열 적음)
sudo apt install libedgetpu1-std

# 또는 최대 성능 (발열 증가)
# sudo apt install libedgetpu1-max

# PyCoral 라이브러리 (Python 바인딩)
pip3 install --extra-index-url https://google-coral.github.io/py-repo/ pycoral~=2.0
```

### 3. TensorFlow Lite 런타임 설치

```bash
# TFLite 런타임 (경량 버전)
pip3 install tflite-runtime

# 또는 전체 TensorFlow (무거움)
# pip3 install tensorflow
```

---

## 모델 변환 파이프라인

### 전체 흐름

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  PyTorch    │ ──▶ │   ONNX      │ ──▶ │  TFLite     │ ──▶ │  EdgeTPU    │
│  (float32)  │     │  (float32)  │     │  (int8)     │     │  (int8)     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
     모델 학습         중간 포맷           양자화              컴파일
```

### 1단계: PyTorch → ONNX 변환

```python
import torch

# 학습된 모델 로드
model = YourModel()
model.load_state_dict(torch.load("model.pth"))
model.eval()

# ONNX로 변환
dummy_input = torch.randn(1, 3, 224, 224)
torch.onnx.export(
    model,
    dummy_input,
    "model.onnx",
    input_names=["input"],
    output_names=["output"],
    opset_version=13
)
```

### 2단계: ONNX → TensorFlow 변환

```bash
pip install onnx-tf

# ONNX를 TensorFlow SavedModel로 변환
onnx-tf convert -i model.onnx -o model_tf
```

### 3단계: TensorFlow → TFLite (INT8 양자화)

```python
import tensorflow as tf

# 대표 데이터셋 (양자화 보정용)
def representative_dataset():
    for _ in range(100):
        # 실제 입력 데이터와 유사한 샘플
        data = np.random.rand(1, 224, 224, 3).astype(np.float32)
        yield [data]

# TFLite 변환기
converter = tf.lite.TFLiteConverter.from_saved_model("model_tf")

# INT8 양자화 설정
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.representative_dataset = representative_dataset
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
converter.inference_input_type = tf.uint8
converter.inference_output_type = tf.uint8

# 변환
tflite_model = converter.convert()

# 저장
with open("model_quant.tflite", "wb") as f:
    f.write(tflite_model)
```

### 4단계: TFLite → Edge TPU 컴파일

```bash
# Edge TPU 컴파일러 설치 (PC에서)
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://packages.cloud.google.com/apt coral-edgetpu-stable main" | \
    sudo tee /etc/apt/sources.list.d/coral-edgetpu.list
sudo apt update
sudo apt install edgetpu-compiler

# Edge TPU용 모델 컴파일
edgetpu_compiler model_quant.tflite

# 출력: model_quant_edgetpu.tflite
```

**컴파일 결과 확인**:
```
Edge TPU Compiler version X.X.X
Input: model_quant.tflite
Output: model_quant_edgetpu.tflite

Number of operations that will run on Edge TPU: 45
Number of operations that will run on CPU: 2
```

---

## 추론 코드 예제

### 기본 추론

```python
from pycoral.utils.edgetpu import make_interpreter
from pycoral.adapters import common
from pycoral.adapters import classify
from PIL import Image
import numpy as np

# Edge TPU 인터프리터 생성
interpreter = make_interpreter("model_quant_edgetpu.tflite")
interpreter.allocate_tensors()

# 이미지 전처리
image = Image.open("test_image.jpg").resize((224, 224))
input_data = np.array(image, dtype=np.uint8)

# 입력 설정
common.set_input(interpreter, input_data)

# 추론 실행 (매우 빠름!)
interpreter.invoke()

# 결과 가져오기
output = common.output_tensor(interpreter, 0)
print(f"Output shape: {output.shape}")
print(f"Predictions: {output}")
```

### 객체 탐지 (SSD MobileNet)

```python
from pycoral.utils.edgetpu import make_interpreter
from pycoral.adapters import detect
from PIL import Image
import cv2

# 모델 로드
interpreter = make_interpreter("ssd_mobilenet_v2_coco_quant_edgetpu.tflite")
interpreter.allocate_tensors()

# 카메라 또는 이미지
cap = cv2.VideoCapture(0)  # Pi Camera

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # 전처리
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image = Image.fromarray(rgb).resize((320, 320))

    # 추론
    _, scale = common.set_resized_input(
        interpreter, image.size,
        lambda size: image.resize(size, Image.LANCZOS)
    )
    interpreter.invoke()

    # 결과 파싱
    objs = detect.get_objects(interpreter, score_threshold=0.5, image_scale=scale)

    # 바운딩 박스 그리기
    for obj in objs:
        bbox = obj.bbox
        cv2.rectangle(frame,
                     (int(bbox.xmin), int(bbox.ymin)),
                     (int(bbox.xmax), int(bbox.ymax)),
                     (0, 255, 0), 2)
        cv2.putText(frame, f"{obj.id}: {obj.score:.2f}",
                   (int(bbox.xmin), int(bbox.ymin) - 10),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    cv2.imshow("Detection", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

### 번호판 인식 파이프라인

```python
import time
from pycoral.utils.edgetpu import make_interpreter
from pycoral.adapters import common, detect
from PIL import Image
import numpy as np

class LPRPipeline:
    """Raspberry Pi + Coral TPU 번호판 인식 파이프라인"""

    def __init__(self, detector_path, classifier_path):
        # 검출 모델 (Edge TPU)
        self.detector = make_interpreter(detector_path)
        self.detector.allocate_tensors()

        # 문자 분류 모델 (Edge TPU)
        self.classifier = make_interpreter(classifier_path)
        self.classifier.allocate_tensors()

        # 클래스 정의
        self.classes = (
            list("0123456789") +
            ["가","나","다","라","마","바","사","아","자",
             "거","너","더","러","머","버","서","어","저",
             "고","노","도","로","모","보","소","오","조",
             "구","누","두","루","무","부","수","우","주",
             "허","하","호","배"]
        )

    def detect_plate(self, image):
        """번호판 검출"""
        start = time.time()

        # 전처리
        input_image = image.resize((320, 320))
        common.set_input(self.detector, np.array(input_image, dtype=np.uint8))

        # 추론
        self.detector.invoke()

        # 결과 파싱
        boxes = detect.get_objects(self.detector, score_threshold=0.5)

        elapsed = (time.time() - start) * 1000
        print(f"Detection: {elapsed:.1f}ms, Found: {len(boxes)} plates")

        return boxes

    def classify_characters(self, char_images):
        """문자 분류"""
        results = []

        for char_img in char_images:
            # 전처리 (32x32 그레이스케일)
            img = char_img.resize((32, 32)).convert("L")
            input_data = np.array(img, dtype=np.uint8).reshape(1, 32, 32, 1)

            # 추론
            common.set_input(self.classifier, input_data)
            self.classifier.invoke()

            # 결과
            output = common.output_tensor(self.classifier, 0)
            class_id = np.argmax(output)
            confidence = output[class_id] / 255.0  # UINT8 정규화

            results.append({
                "char": self.classes[class_id],
                "confidence": confidence
            })

        return results

    def recognize(self, image):
        """전체 파이프라인"""
        total_start = time.time()

        # 1. 번호판 검출
        plates = self.detect_plate(image)

        results = []
        for plate in plates:
            # 2. 번호판 영역 크롭
            bbox = plate.bbox
            plate_crop = image.crop((bbox.xmin, bbox.ymin, bbox.xmax, bbox.ymax))

            # 3. 문자 분리 (간단 버전: 수직 분할)
            char_images = self._segment_characters(plate_crop)

            # 4. 각 문자 인식
            chars = self.classify_characters(char_images)

            # 5. 결과 조합
            plate_text = "".join([c["char"] for c in chars])
            avg_conf = np.mean([c["confidence"] for c in chars])

            results.append({
                "text": plate_text,
                "confidence": avg_conf,
                "bbox": (bbox.xmin, bbox.ymin, bbox.xmax, bbox.ymax)
            })

        total_elapsed = (time.time() - total_start) * 1000
        print(f"Total: {total_elapsed:.1f}ms")

        return results

    def _segment_characters(self, plate_image, num_chars=7):
        """간단한 문자 분리 (균등 분할)"""
        w, h = plate_image.size
        char_w = w // num_chars

        chars = []
        for i in range(num_chars):
            char_crop = plate_image.crop((i * char_w, 0, (i+1) * char_w, h))
            chars.append(char_crop)

        return chars


# 사용 예시
if __name__ == "__main__":
    pipeline = LPRPipeline(
        detector_path="plate_detector_edgetpu.tflite",
        classifier_path="char_classifier_edgetpu.tflite"
    )

    image = Image.open("car.jpg")
    results = pipeline.recognize(image)

    for r in results:
        print(f"Plate: {r['text']}, Confidence: {r['confidence']:.2%}")
```

---

## 성능 최적화 팁

### 1. 모델 최적화

| 기법 | 효과 | 적용 방법 |
|------|------|----------|
| INT8 양자화 | 모델 크기 1/4, 속도 2~4배 | TFLite 변환 시 적용 |
| 입력 해상도 축소 | 속도 비례 향상 | 320x320 → 224x224 |
| MobileNet 계열 사용 | Edge에 최적화된 구조 | MobileNetV2, EfficientNet-Lite |
| Pruning | 파라미터 감소 | TF Model Optimization Toolkit |

### 2. 시스템 최적화

```bash
# CPU Governor를 performance로 설정
echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# GPU 메모리 할당 최소화 (카메라 미사용 시)
# /boot/config.txt
gpu_mem=16

# 스왑 비활성화 (SD카드 수명 연장)
sudo dphys-swapfile swapoff
sudo dphys-swapfile uninstall
```

### 3. 멀티스레드 파이프라인

```python
import threading
import queue

class AsyncPipeline:
    """비동기 파이프라인으로 프레임 처리 최적화"""

    def __init__(self, detector, classifier):
        self.detector = detector
        self.classifier = classifier

        self.frame_queue = queue.Queue(maxsize=2)
        self.result_queue = queue.Queue()

        self.running = False

    def start(self):
        self.running = True

        # 캡처 스레드
        self.capture_thread = threading.Thread(target=self._capture_loop)
        self.capture_thread.start()

        # 추론 스레드
        self.inference_thread = threading.Thread(target=self._inference_loop)
        self.inference_thread.start()

    def _capture_loop(self):
        cap = cv2.VideoCapture(0)
        while self.running:
            ret, frame = cap.read()
            if ret and not self.frame_queue.full():
                self.frame_queue.put(frame)
        cap.release()

    def _inference_loop(self):
        while self.running:
            try:
                frame = self.frame_queue.get(timeout=1)
                result = self._process(frame)
                self.result_queue.put(result)
            except queue.Empty:
                continue
```

---

## 전력 관리

### 전력 소비 분석

| 구성 | 유휴 시 | 추론 시 | 피크 |
|------|--------|--------|------|
| Raspberry Pi 4 | 2.7W | 4.5W | 6.5W |
| Coral USB | 0W | 2W | 2.5W |
| **합계** | 2.7W | 6.5W | 9W |

### 전원 옵션

| 방식 | 장점 | 단점 |
|------|------|------|
| USB-C 어댑터 (5V 3A) | 가장 안정적 | 전원 콘센트 필요 |
| 보조 배터리 (20000mAh) | 이동식, 5~8시간 | 충전 관리 필요 |
| PoE (Power over Ethernet) | 전원+네트워크 통합 | PoE HAT 필요 |
| 태양광 패널 (20W+) | 완전 독립형 | 날씨 의존, 배터리 필요 |

---

## 배포 아키텍처

### 독립형 (Standalone)

```
┌─────────────────┐
│  카메라         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Raspberry Pi   │ ◀── 전원
│  + Coral TPU    │
│                 │
│  [추론 결과]    │──▶ LCD/LED 표시
│  [로컬 저장]    │──▶ SD카드 로그
└─────────────────┘
```

### 연결형 (Connected)

```
┌─────────────────┐     ┌─────────────────┐
│  카메라         │     │  클라우드 서버   │
└────────┬────────┘     │  - 결과 저장     │
         │              │  - 통계 분석     │
         ▼              │  - 모델 업데이트  │
┌─────────────────┐     └────────▲────────┘
│  Raspberry Pi   │              │
│  + Coral TPU    │──────────────┘
│                 │     WiFi/LTE/이더넷
│  [엣지 추론]    │
└─────────────────┘
```

### 분산형 (Distributed)

```
       ┌──────────────────────────────────┐
       │          중앙 서버               │
       │  - 결과 집계                     │
       │  - 대시보드                      │
       │  - 모델 배포                     │
       └────────────▲─────────────────────┘
                    │
       ┌────────────┼────────────┐
       │            │            │
       ▼            ▼            ▼
┌───────────┐ ┌───────────┐ ┌───────────┐
│  엣지 #1  │ │  엣지 #2  │ │  엣지 #3  │
│  (입구)   │ │  (출구)   │ │  (주차장) │
└───────────┘ └───────────┘ └───────────┘
```

---

## 트러블슈팅

### 일반적인 문제

| 증상 | 원인 | 해결책 |
|------|------|--------|
| TPU 인식 안됨 | USB 연결 문제 | USB 3.0 포트 사용, 케이블 교체 |
| 추론 느림 | CPU에서 실행 중 | 모델이 Edge TPU 호환인지 확인 |
| 발열 심함 | 냉각 부족 | 방열판/팬 추가, 주변 통풍 확보 |
| Out of Memory | 모델 너무 큼 | 경량 모델 사용, 입력 크기 축소 |
| 프레임 드롭 | 처리 속도 부족 | 해상도 낮추기, 멀티스레딩 |

### Edge TPU 호환성 확인

```bash
# 컴파일 로그 확인
edgetpu_compiler model.tflite

# 출력 예시 (일부 레이어 미지원 시)
# Number of operations that will run on Edge TPU: 45
# Number of operations that will run on CPU: 5  ← 5개 연산은 CPU에서 실행
```

**100% Edge TPU 실행**을 위해서는:
- 모든 연산이 지원되어야 함
- INT8 완전 양자화 필수
- 지원되지 않는 연산: 일부 활성화 함수, 커스텀 레이어

---

## 비용 대비 성능 비교

| 구성 | 비용 | 성능 (FPS) | 전력 | 추천 용도 |
|------|------|-----------|------|----------|
| Pi 4 (CPU only) | ₩80,000 | 3~5 | 5W | 프로토타입 |
| **Pi 4 + Coral USB** | ₩200,000 | 30~60 | 7W | **가성비 최고** |
| Pi 5 + Coral USB | ₩250,000 | 40~80 | 10W | 최신 호환성 |
| Jetson Nano | ₩150,000 | 20~40 | 10W | GPU 직접 활용 |
| Jetson Orin Nano | ₩400,000 | 60~120 | 15W | 고성능 엣지 |

**결론**: 가성비 측면에서 **Raspberry Pi 4 + Coral USB** 조합이 가장 효율적

---

## 요약

### Raspberry Pi + Coral TPU 장점

1. **초저전력**: 7W로 실시간 AI 추론
2. **저비용**: ₩200,000 수준으로 엣지 AI 구축
3. **컴팩트**: 주먹 크기로 현장 설치 용이
4. **오프라인**: 네트워크 없이도 추론 가능

### 적합한 사용 사례

- 번호판 인식 (주차장, 입구)
- 객체 탐지 (보안 카메라)
- 품질 검사 (생산 라인)
- 스마트 도어벨
- 동물/해충 감지

### 부적합한 사용 사례

- 대규모 배치 처리 (서버 GPU 권장)
- 복잡한 모델 (Transformer 등)
- 학습 (추론 전용)
- 고해상도 처리 (4K 이상)

---

## 참고 자료

- [Coral AI 공식 문서](https://coral.ai/docs/)
- [TensorFlow Lite 문서](https://www.tensorflow.org/lite)
- [Raspberry Pi 공식 문서](https://www.raspberrypi.org/documentation/)
- [PyCoral GitHub](https://github.com/google-coral/pycoral)
- [Edge TPU Compiler](https://coral.ai/docs/edgetpu/compiler/)
