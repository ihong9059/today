# Day 17: Jetson Nano 배포 (선택) — "AI를 엣지 디바이스에 올린다"

## 학습 목표
- 엣지 AI의 개념과 활용 사례를 이해한다
- Jetson Nano의 하드웨어 스펙과 개발 환경을 파악한다
- 최적화된 모델을 Jetson Nano에 배포하여 실시간 추론한다
- 클라우드 vs 엣지 추론의 장단점을 비교한다

## 준비물
- Jetson Nano Developer Kit (또는 시뮬레이션 환경)
- microSD 카드 (32GB 이상, JetPack 설치)
- USB 웹캠 또는 CSI 카메라
- 모니터, 키보드, 마우스

## 실습 1: 엣지 AI 개념과 Jetson Nano 소개 (30분)

1. 엣지 AI의 개념을 정리한다:

```
Claude Code에 다음을 요청한다:

엣지 AI와 클라우드 AI의 차이를 비교 분석해줘.
다음 항목을 포함해서:
1. 지연시간(Latency)
2. 프라이버시
3. 네트워크 의존성
4. 처리 능력
5. 비용 구조
6. 실제 활용 사례 (CCTV, 자율주행, 스마트팩토리 등)
```

2. Jetson Nano 스펙을 확인한다:

```python
# Jetson Nano에서 실행 (또는 사양 확인용)
import subprocess
import os

def check_jetson_info():
    """Jetson Nano 시스템 정보 확인"""
    info = {}

    # JetPack 버전
    try:
        result = subprocess.run(['cat', '/etc/nv_tegra_release'],
                                capture_output=True, text=True)
        info['jetpack'] = result.stdout.strip()
    except:
        info['jetpack'] = "확인 불가 (Jetson 아님)"

    # GPU 정보
    try:
        result = subprocess.run(['tegrastats'], capture_output=True,
                                text=True, timeout=2)
        info['gpu'] = result.stdout.strip()
    except:
        info['gpu'] = "NVIDIA Maxwell 128-core GPU"

    # 메모리
    import psutil
    mem = psutil.virtual_memory()
    info['ram'] = f"{mem.total / 1e9:.1f} GB (사용 가능: {mem.available / 1e9:.1f} GB)"

    # CPU
    info['cpu'] = f"Quad-core ARM Cortex-A57 @ 1.43 GHz"

    for key, val in info.items():
        print(f"{key}: {val}")

# Jetson에서만 실행
# check_jetson_info()

# 시뮬레이션용 스펙 출력
print("=== Jetson Nano 4GB 스펙 ===")
print("GPU: NVIDIA Maxwell 128-core")
print("CPU: Quad-core ARM Cortex-A57 @ 1.43 GHz")
print("RAM: 4 GB LPDDR4")
print("Storage: microSD")
print("Power: 5W / 10W 모드")
print("CUDA: 10.2")
print("TensorRT: 8.x")
```

### 관찰 포인트
- Jetson Nano의 GPU가 데스크톱 GPU와 어떻게 다른가?
- 4GB RAM의 제약이 모델 선택에 어떤 영향을 미치는가?

## 실습 2: Jetson Nano 환경 설정과 모델 배포 (30분)

1. JetPack 환경에서 필요 패키지를 설치한다:

```bash
# Jetson Nano에서 실행하는 셸 명령어
# JetPack에 PyTorch가 포함되어 있지만, 별도 설치 필요 시:
sudo apt-get update
sudo apt-get install -y python3-pip libopenblas-dev

# PyTorch for Jetson (NVIDIA 공식)
# https://forums.developer.nvidia.com/t/pytorch-for-jetson/72048
pip3 install torch-1.10.0-cp36-cp36m-linux_aarch64.whl
pip3 install torchvision-0.11.0-cp36-cp36m-linux_aarch64.whl

# Ultralytics
pip3 install ultralytics

# OpenCV (JetPack에 기본 포함)
python3 -c "import cv2; print(f'OpenCV: {cv2.__version__}')"
```

2. 모델을 Jetson에 전송하고 TensorRT로 변환한다:

```python
# PC에서 Jetson으로 모델 전송 (scp)
# scp yolov8n.pt jetson@192.168.1.100:~/lpr_project/models/

# Jetson에서 TensorRT 변환
from ultralytics import YOLO

model = YOLO("models/yolov8n.pt")

# TensorRT FP16 변환 (Jetson에서 가장 효율적)
trt_path = model.export(
    format="engine",
    imgsz=640,
    half=True,  # FP16
    device=0,
)
print(f"TensorRT 모델 저장: {trt_path}")
```

3. TensorRT 모델 추론 속도를 측정한다:

```python
import time
import numpy as np
import cv2

trt_model = YOLO(trt_path)

# 워밍업
test_img = np.random.randint(0, 255, (480, 640, 3), dtype=np.uint8)
for _ in range(10):
    trt_model(test_img, verbose=False)

# 벤치마크
times = []
for _ in range(100):
    start = time.time()
    results = trt_model(test_img, verbose=False)
    times.append(time.time() - start)

avg_ms = np.mean(times) * 1000
fps = 1000 / avg_ms
print(f"Jetson Nano TensorRT 추론:")
print(f"  평균: {avg_ms:.1f}ms")
print(f"  FPS: {fps:.1f}")
print(f"  최소: {min(times)*1000:.1f}ms, 최대: {max(times)*1000:.1f}ms")
```

### 관찰 포인트
- Jetson Nano에서 TensorRT FP16이 몇 FPS를 달성하는가? (목표: 15+ FPS)
- PyTorch 직접 추론 대비 TensorRT가 몇 배 빠른가?

## 실습 3: 실시간 추론 데모 (30분)

1. USB 웹캠으로 실시간 객체 검출을 수행한다:

```python
# Jetson Nano에서 실행
import cv2
import time
from ultralytics import YOLO

model = YOLO("yolov8n.engine")  # TensorRT 모델

# 웹캠 열기
cap = cv2.VideoCapture(0)  # USB 카메라
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

if not cap.isOpened():
    print("카메라를 열 수 없습니다")
    exit()

print("실시간 검출 시작... (q: 종료)")
fps_list = []

while True:
    ret, frame = cap.read()
    if not ret:
        break

    start = time.time()

    # 추론
    results = model(frame, verbose=False, conf=0.3)

    # 결과 그리기
    annotated = results[0].plot()

    # FPS 표시
    current_fps = 1.0 / (time.time() - start)
    fps_list.append(current_fps)
    cv2.putText(annotated, f"FPS: {current_fps:.1f}",
                (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow("Jetson LPR", annotated)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

print(f"평균 FPS: {np.mean(fps_list):.1f}")
```

2. Jetson 전력 모드를 비교한다:

```bash
# 10W 모드 (최대 성능)
sudo nvpmodel -m 0
sudo jetson_clocks

# 5W 모드 (저전력)
sudo nvpmodel -m 1

# 현재 모드 확인
sudo nvpmodel -q
```

### 관찰 포인트
- 10W 모드와 5W 모드에서 FPS 차이가 얼마나 나는가?
- 발열 관리(팬, 방열판)가 성능에 영향을 미치는가?

## 과제

### 제출물: "엣지 AI 배포 보고서"

```markdown
# Day 17 과제: Jetson Nano 배포

## 1. 엣지 vs 클라우드 비교
| 항목         | 클라우드 AI | 엣지 AI (Jetson) |
|-------------|------------|------------------|
| 지연시간     |            |                  |
| 네트워크     |            |                  |
| 프라이버시   |            |                  |
| 비용         |            |                  |
| 처리 능력    |            |                  |

## 2. Jetson Nano 벤치마크
| 모델 형식       | 추론 시간 | FPS  | 메모리 사용 |
|----------------|----------|------|------------|
| PyTorch FP32   |          |      |            |
| ONNX FP32      |          |      |            |
| TensorRT FP16  |          |      |            |

## 3. 실시간 데모 결과
- 평균 FPS:
- 검출 정확도 (체감):
- 발견된 문제점과 해결 방법:
```

## 강사 참고 사항
- Jetson Nano가 없는 경우 Colab에서 TensorRT 변환까지만 진행하고, 엣지 개념은 이론으로 다룬다
- Jetson Orin Nano가 있으면 성능이 훨씬 좋으므로, 가능하면 최신 기기를 사용한다
- 이 수업은 "선택"이므로, Jetson이 없는 수강생은 Day 18-19 프로젝트 준비에 시간을 할당한다
