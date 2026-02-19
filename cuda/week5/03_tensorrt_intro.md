# Day 3: TensorRT 소개

## 1. TensorRT란?

### 1.1 정의

TensorRT는 NVIDIA의 **딥러닝 추론 최적화 엔진**입니다.

```
학습된 모델 (PyTorch, TensorFlow)
            ↓
      ┌─────────────┐
      │  TensorRT   │  ← 최적화
      └─────────────┘
            ↓
    최적화된 추론 엔진
    (더 빠르고 효율적!)
```

### 1.2 왜 필요한가?

| 항목 | 일반 모델 | TensorRT |
|------|----------|----------|
| 추론 속도 | 느림 | 2~5배 빠름 |
| 메모리 | 많이 사용 | 최적화됨 |
| 배터리 | 많이 소모 | 효율적 |

### 1.3 Jetson에서의 중요성

Jetson은 제한된 리소스 → TensorRT 최적화 필수!

---

## 2. TensorRT 최적화 기법

### 2.1 레이어 융합 (Layer Fusion)

```
원본:          최적화 후:
[Conv] ─┐      ┌───────────────┐
        │  →   │ Conv+BN+ReLU  │
[BN]   ─┤      │   (하나로!)    │
        │      └───────────────┘
[ReLU] ─┘

→ 메모리 접근 감소, 속도 향상
```

### 2.2 정밀도 최적화

```
FP32 (32비트) → FP16 (16비트) → INT8 (8비트)
     ↓              ↓              ↓
  정확함        빠름/정확      매우 빠름
```

| 정밀도 | 속도 | 정확도 | 용도 |
|--------|------|--------|------|
| FP32 | 기준 | 최고 | 학습, 정밀 추론 |
| FP16 | 2배 | 거의 동일 | 일반 추론 |
| INT8 | 4배 | 약간 감소 | 실시간 추론 |

### 2.3 동적 텐서 메모리

- 메모리 재사용
- 최소 메모리 할당

---

## 3. TensorRT 파이프라인

```
1. 모델 학습 (PyTorch/TensorFlow)
        ↓
2. ONNX로 변환
        ↓
3. TensorRT 엔진 빌드
        ↓
4. 추론 실행
```

---

## 4. ONNX 변환

### 4.1 PyTorch → ONNX

```python
import torch
import torchvision.models as models

# 모델 로드
model = models.resnet18(pretrained=True)
model.eval()

# 더미 입력
dummy_input = torch.randn(1, 3, 224, 224)

# ONNX 내보내기
torch.onnx.export(
    model,
    dummy_input,
    "resnet18.onnx",
    input_names=['input'],
    output_names=['output'],
    dynamic_axes={'input': {0: 'batch'}}
)
print("Exported to resnet18.onnx")
```

### 4.2 TensorFlow → ONNX

```bash
pip install tf2onnx

python -m tf2onnx.convert \
    --saved-model ./saved_model \
    --output model.onnx
```

---

## 5. TensorRT 엔진 빌드

### 5.1 trtexec 사용 (CLI)

```bash
# FP16 엔진 빌드
trtexec --onnx=resnet18.onnx \
        --saveEngine=resnet18.engine \
        --fp16

# INT8 엔진 빌드 (캘리브레이션 필요)
trtexec --onnx=resnet18.onnx \
        --saveEngine=resnet18_int8.engine \
        --int8
```

### 5.2 Python API

```python
import tensorrt as trt

def build_engine(onnx_path, engine_path, fp16=True):
    logger = trt.Logger(trt.Logger.WARNING)
    builder = trt.Builder(logger)
    network = builder.create_network(
        1 << int(trt.NetworkDefinitionCreationFlag.EXPLICIT_BATCH)
    )
    parser = trt.OnnxParser(network, logger)

    # ONNX 파싱
    with open(onnx_path, 'rb') as f:
        if not parser.parse(f.read()):
            for error in range(parser.num_errors):
                print(parser.get_error(error))
            return None

    # 빌드 설정
    config = builder.create_builder_config()
    config.set_memory_pool_limit(trt.MemoryPoolType.WORKSPACE, 1 << 30)  # 1GB

    if fp16:
        config.set_flag(trt.BuilderFlag.FP16)

    # 엔진 빌드
    engine = builder.build_serialized_network(network, config)

    # 저장
    with open(engine_path, 'wb') as f:
        f.write(engine)

    print(f"Engine saved to {engine_path}")
    return engine

# 사용
build_engine("resnet18.onnx", "resnet18.engine", fp16=True)
```

---

## 6. TensorRT 추론

### 6.1 Python 추론

```python
import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit
import numpy as np

def infer(engine_path, input_data):
    # 엔진 로드
    logger = trt.Logger(trt.Logger.WARNING)
    with open(engine_path, 'rb') as f:
        engine = trt.Runtime(logger).deserialize_cuda_engine(f.read())

    context = engine.create_execution_context()

    # 메모리 할당
    input_shape = engine.get_binding_shape(0)
    output_shape = engine.get_binding_shape(1)

    d_input = cuda.mem_alloc(input_data.nbytes)
    d_output = cuda.mem_alloc(np.empty(output_shape, dtype=np.float32).nbytes)

    # 입력 복사
    cuda.memcpy_htod(d_input, input_data)

    # 추론
    context.execute_v2([int(d_input), int(d_output)])

    # 결과 복사
    output = np.empty(output_shape, dtype=np.float32)
    cuda.memcpy_dtoh(output, d_output)

    return output

# 사용
input_data = np.random.randn(1, 3, 224, 224).astype(np.float32)
output = infer("resnet18.engine", input_data)
print(f"Output shape: {output.shape}")
```

---

## 7. Jetson에서 TensorRT

### 7.1 JetPack에 포함

JetPack 설치 시 TensorRT가 자동 설치됩니다.

```bash
# 버전 확인
dpkg -l | grep tensorrt
```

### 7.2 예제 위치

```bash
ls /usr/src/tensorrt/samples/
```

---

## 8. 오늘의 실습

### 실습 1: ONNX 변환
- [ ] PyTorch 모델을 ONNX로 변환
- [ ] ONNX 파일 확인

### 실습 2: TensorRT 엔진 빌드
- [ ] trtexec로 FP16 엔진 빌드
- [ ] 빌드 시간 확인

### 실습 3: 추론 테스트
- [ ] 엔진 로드
- [ ] 더미 입력으로 추론
- [ ] 출력 확인

---

## 9. 용어 정리

| 용어 | 의미 |
|------|------|
| **TensorRT** | NVIDIA 딥러닝 추론 최적화 엔진 |
| **ONNX** | Open Neural Network Exchange 형식 |
| **FP16** | 16비트 부동소수점 |
| **INT8** | 8비트 정수 |
| **Layer Fusion** | 여러 레이어를 하나로 합침 |

---

## 10. 다음 시간 예고

내일은 객체 탐지를 구현합니다!
- YOLO 모델 사용
- TensorRT 최적화
- 실시간 탐지
