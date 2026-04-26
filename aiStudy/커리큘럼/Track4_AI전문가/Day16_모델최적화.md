# Day 16: 모델 최적화 — "더 빠르게, 더 가볍게"

## 학습 목표
- PyTorch 모델을 ONNX 형식으로 변환한다
- YOLOv8n/s/m 모델의 크기, 속도, 정확도를 비교한다
- TensorRT 최적화의 원리와 효과를 이해한다
- 모델 경량화 기법(양자화, 프루닝)의 개념을 파악한다

## 준��물
- Google Colab (GPU 런타임)
- pip install ultralytics onnx onnxruntime-gpu

## 실습 1: ONNX 변환 (30분)

1. YOLOv8 모델�� ONNX로 변환���다:

```python
!pip install ultralytics onnx onnxruntime-gpu -q
from ultralytics import YOLO
import time
import os

# 모델 로드 및 ONNX 변환
model = YOLO("yolov8n.pt")
onnx_path = model.export(format="onnx", imgsz=640, simplify=True)

print(f"ONNX 모델 저장: {onnx_path}")
print(f"원본 크기: {os.path.getsize('yolov8n.pt') / 1e6:.1f} MB")
print(f"ONNX 크기: {os.path.getsize(onnx_path) / 1e6:.1f} MB")
```

2. ONNX 모델 구조를 확인한다:

```python
import onnx

onnx_model = onnx.load(onnx_path)
print(f"ONNX 버전: {onnx_model.opset_import[0].version}")
print(f"\n입력 정보:")
for inp in onnx_model.graph.input:
    shape = [d.dim_value for d in inp.type.tensor_type.shape.dim]
    print(f"  {inp.name}: {shape}")

print(f"\n출력 정보:")
for out in onnx_model.graph.output:
    shape = [d.dim_value for d in out.type.tensor_type.shape.dim]
    print(f"  {out.name}: {shape}")

print(f"\n레이어 수: {len(onnx_model.graph.node)}")
```

3. ONNX Runtime으로 추론한다:

```python
import onnxruntime as ort
import numpy as np
import cv2

# ONNX Runtime 세션 생성
providers = ['CUDAExecutionProvider', 'CPUExecutionProvider']
session = ort.InferenceSession(onnx_path, providers=providers)

print(f"사용 프로바이더: {session.get_providers()}")

# 테스트 이미지 준비
test_img = np.random.randint(0, 255, (640, 640, 3), dtype=np.uint8)
blob = cv2.dnn.blobFromImage(test_img, 1/255.0, (640, 640), swapRB=True)

# 추론
input_name = session.get_inputs()[0].name
start = time.time()
for _ in range(100):
    outputs = session.run(None, {input_name: blob})
onnx_time = (time.time() - start) / 100

print(f"ONNX 추론 시간: {onnx_time*1000:.1f}ms")
print(f"출력 shape: {outputs[0].shape}")
```

### 관찰 포인트
- ONNX 변환 후 파일 크기가 변했는가?
- ONNX Runtime이 PyTorch보다 추론이 빠른가?

## 실습 2: 모델 크기별 비교 벤���마크 (30분)

1. YOLOv8 n/s/m을 종합 비교한다:

```python
import torch
import matplotlib.pyplot as plt

models_info = {}

for variant in ['n', 's', 'm']:
    model_name = f"yolov8{variant}.pt"
    model = YOLO(model_name)

    # 모델 정보
    params = sum(p.numel() for p in model.model.parameters())
    file_size = os.path.getsize(model_name) / 1e6

    # 추론 속도 측정 (GPU)
    test_img = np.random.randint(0, 255, (640, 640, 3), dtype=np.uint8)

    # 워밍업
    for _ in range(5):
        model(test_img, verbose=False)

    # 벤치마크 (50회)
    times = []
    for _ in range(50):
        start = time.time()
        results = model(test_img, verbose=False)
        times.append(time.time() - start)

    avg_time = np.mean(times) * 1000
    fps = 1000 / avg_time

    # COCO 공식 mAP (Ultralytics 공개값)
    coco_map = {'n': 37.3, 's': 44.9, 'm': 50.2}

    models_info[variant] = {
        'params': params / 1e6,
        'size_mb': file_size,
        'time_ms': avg_time,
        'fps': fps,
        'mAP50_95': coco_map[variant],
    }

    print(f"YOLOv8{variant}: {params/1e6:.1f}M params, {file_size:.1f}MB, "
          f"{avg_time:.1f}ms ({fps:.0f} FPS), mAP={coco_map[variant]}")
```

2. 비교 차트를 그린다:

```python
variants = list(models_info.keys())

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# 파라미터 수
axes[0].bar(variants, [models_info[v]['params'] for v in variants], color='steelblue')
axes[0].set_title("파라미터 수 (M)")
axes[0].set_ylabel("Millions")

# 추론 시간
axes[1].bar(variants, [models_info[v]['time_ms'] for v in variants], color='coral')
axes[1].set_title("추론 시간 (ms)")
axes[1].set_ylabel("ms")

# mAP
axes[2].bar(variants, [models_info[v]['mAP50_95'] for v in variants], color='green')
axes[2].set_title("COCO mAP50-95")
axes[2].set_ylabel("%")

for ax in axes:
    ax.set_xlabel("모델")
plt.suptitle("YOLOv8 모델 크기별 비교", fontsize=14)
plt.tight_layout()
plt.show()
```

### 관��� 포인트
- Nano는 빠르지만 정확도가 낮고, Medium은 정확하지만 느리다는 트레이드오프를 확인했는가?
- 실시간 처리(30 FPS 이상)에는 어떤 모델이 적합한가?

## 실습 3: TensorRT와 양자화 개념 (20분)

1. TensorRT 변환을 시도한다:

```python
# TensorRT 변환 (NVIDIA GPU 필요)
model = YOLO("yolov8n.pt")

try:
    # TensorRT FP16 변환
    trt_path = model.export(format="engine", imgsz=640, half=True)
    print(f"TensorRT 모델 저장: {trt_path}")

    # TensorRT 모델로 추론
    trt_model = YOLO(trt_path)

    # 속도 비교
    for _ in range(10):
        trt_model(test_img, verbose=False)

    trt_times = []
    for _ in range(50):
        start = time.time()
        trt_model(test_img, verbose=False)
        trt_times.append(time.time() - start)

    trt_avg = np.mean(trt_times) * 1000
    print(f"TensorRT 추론: {trt_avg:.1f}ms ({1000/trt_avg:.0f} FPS)")
    print(f"PyTorch 대비 {models_info['n']['time_ms']/trt_avg:.1f}배 빠름")

except Exception as e:
    print(f"TensorRT 변환 실패 (GPU 미지원): {e}")
    print("TensorRT는 NVIDIA GPU에서만 사용 가능합니���.")
```

2. 양자화 개념을 이해한다:

```python
# INT8 양자화 시뮬��이션
print("=== 양자화(Quantization) 개념 ===")
print()

# FP32 vs FP16 vs INT8 비교
fp32_val = torch.tensor(3.141592653589793, dtype=torch.float32)
fp16_val = fp32_val.half()
int8_val = torch.tensor(3, dtype=torch.int8)

print(f"FP32: {fp32_val.item():.10f} (4 bytes)")
print(f"FP16: {fp16_val.item():.10f} (2 bytes)")
print(f"INT8: {int8_val.item()} (1 byte)")

print(f"\n메모리 절약:")
print(f"  FP32 -> FP16: 50% 절약, 정밀도 손실 거의 없���")
print(f"  FP32 -> INT8: 75% 절약, 약간의 정확도 손실")

# ONNX FP16 변환
model = YOLO("yolov8n.pt")
fp16_path = model.export(format="onnx", imgsz=640, half=True, simplify=True)
print(f"\nFP16 ONNX 크기: {os.path.getsize(fp16_path) / 1e6:.1f} MB")
```

### 관찰 포인트
- TensorRT가 일반 PyTorch 대비 몇 배 빠른가?
- FP16 양자화 시 정확도 손실이 체감되는가?

## 과제

### 제출물: "모델 최적화 벤치마크 보고서"

```markdown
# Day 16 과제: 모델 최적화

## 1. 모델 형식별 비교
| 형식       | 파일 크기 | 추론 시간 | FPS  |
|-----------|----------|-----------|------|
| PyTorch   |          |           |      |
| ONNX      |          |           |      |
| ONNX FP16 |          |           |      |
| TensorRT  |          |           |      |

## 2. 모델 크기별 비교
| 모델     | 파라미터 | 크기   | 속도   | mAP  |
|----------|---------|--------|--------|------|
| YOLOv8n  |         |        |        |      |
| YOLOv8s  |         |        |        |      |
| YOLOv8m  |         |        |        |      |

## 3. LPR 프로젝트에 적합한 최적화 전략
- 선택한 모델과 형식:
- 선택 이유:
- 예상 실시간 처리 FPS:
```

## 강사 참고 사항
- Colab 무료 GPU(T4)에서도 TensorRT가 동작하지만, 버전 호환성 문제가 있을 수 있다
- TensorRT 설치가 안 되면 ONNX까지만 진행해도 충분하다
- 엣지 디바이스(Day 17)와 연계하여 "왜 최적화가 필요한지" 동기를 부여한다
