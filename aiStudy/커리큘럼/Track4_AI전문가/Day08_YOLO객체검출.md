# Day 8: YOLO 객체 검출 — "AI가 사물을 인식하는 법"

## 학습 목표
- YOLO(You Only Look Once)의 원리와 아키텍처를 이해한다
- Ultralytics YOLOv8을 설치하고 사전학습 모델로 추론한다
- 분류(Classification), 검출(Detection), 세그멘테이션(Segmentation)의 차이를 파악한다
- COCO 데이터셋의 80개 클래스로 다양한 이미지를 검출한다

## 준비물
- Google Colab (GPU 런타임)
- pip install ultralytics

## 실습 1: YOLOv8 설치와 첫 추론 (30분)

1. Ultralytics를 설치하고 모델을 로드한다:

```python
!pip install ultralytics -q
from ultralytics import YOLO
import cv2
import matplotlib.pyplot as plt
import numpy as np

# 사전학습 모델 로드 (COCO 80클래스)
model = YOLO("yolov8n.pt")  # nano 모델 (가장 가벼움)
print(f"모델 로드 완료: {model.model.names}")
```

2. 샘플 이미지로 추론한다:

```python
# Ultralytics 제공 샘플 이미지로 추론
results = model("https://ultralytics.com/images/bus.jpg")

# 결과 확인
for r in results:
    print(f"검출된 객체 수: {len(r.boxes)}")
    for box in r.boxes:
        cls_id = int(box.cls)
        conf = float(box.conf)
        xyxy = box.xyxy[0].tolist()
        print(f"  클래스: {model.names[cls_id]}, 신뢰도: {conf:.2f}, 좌표: {xyxy}")

# 결과 시각화
result_img = results[0].plot()
plt.figure(figsize=(10, 8))
plt.imshow(cv2.cvtColor(result_img, cv2.COLOR_BGR2RGB))
plt.title("YOLOv8 객체 검출 결과")
plt.axis('off')
plt.show()
```

3. 여러 이미지로 테스트한다:

```python
import urllib.request

# 다양한 샘플 이미지
urls = {
    "거리": "https://ultralytics.com/images/zidane.jpg",
    "버스": "https://ultralytics.com/images/bus.jpg",
}

fig, axes = plt.subplots(1, 2, figsize=(16, 6))
for ax, (name, url) in zip(axes, urls.items()):
    results = model(url)
    result_img = results[0].plot()
    ax.imshow(cv2.cvtColor(result_img, cv2.COLOR_BGR2RGB))
    ax.set_title(f"{name} - 검출: {len(results[0].boxes)}개")
    ax.axis('off')
plt.tight_layout()
plt.show()
```

### 관찰 포인트
- YOLO가 한 번의 추론으로 여러 객체를 동시에 검출하는가?
- 신뢰도(confidence)가 낮은 검출 결과는 어떤 특징이 있는가?

## 실습 2: 모델 크기별 비교 (30분)

1. YOLOv8 n/s/m 모델을 비교한다:

```python
import time

models = {
    "YOLOv8n (Nano)": YOLO("yolov8n.pt"),
    "YOLOv8s (Small)": YOLO("yolov8s.pt"),
    "YOLOv8m (Medium)": YOLO("yolov8m.pt"),
}

test_image = "https://ultralytics.com/images/bus.jpg"

for name, m in models.items():
    # 워밍업
    m(test_image, verbose=False)

    # 속도 측정
    start = time.time()
    for _ in range(10):
        results = m(test_image, verbose=False)
    elapsed = (time.time() - start) / 10

    n_detections = len(results[0].boxes)
    params = sum(p.numel() for p in m.model.parameters()) / 1e6
    print(f"{name}: {elapsed*1000:.1f}ms, 파라미터: {params:.1f}M, 검출: {n_detections}개")
```

2. 신뢰도 임계값을 조정한다:

```python
# 신뢰도 임계값 변경
for conf_threshold in [0.1, 0.25, 0.5, 0.75]:
    results = model("https://ultralytics.com/images/bus.jpg", conf=conf_threshold)
    n = len(results[0].boxes)
    print(f"conf={conf_threshold}: 검출 {n}개")
```

### 관찰 포인트
- 모델 크기가 커질수록 정확도와 속도가 어떻게 트레이드오프 되는가?
- conf 임계값을 낮추면 검출 수가 증가하지만 오검출도 늘어나는가?

## 실습 3: 분류 / 검출 / 세그멘테이션 비교 (20분)

1. 세 가지 태스크를 비교한다:

```python
# 분류 모델
cls_model = YOLO("yolov8n-cls.pt")
cls_results = cls_model("https://ultralytics.com/images/bus.jpg")
print("=== 분류 결과 ===")
top5 = cls_results[0].probs.top5
top5conf = cls_results[0].probs.top5conf
for idx, conf in zip(top5, top5conf):
    print(f"  {cls_model.names[idx]}: {conf:.4f}")

# 검출 모델
det_model = YOLO("yolov8n.pt")
det_results = det_model("https://ultralytics.com/images/bus.jpg")
print(f"\n=== 검출 결과 ===")
print(f"  검출 객체: {len(det_results[0].boxes)}개")

# 세그멘테이션 모델
seg_model = YOLO("yolov8n-seg.pt")
seg_results = seg_model("https://ultralytics.com/images/bus.jpg")
print(f"\n=== 세그멘테이션 결과 ===")
print(f"  세그먼트 마스크: {len(seg_results[0].masks)}개")
```

2. 세그멘테이션 결과를 시각화한다:

```python
fig, axes = plt.subplots(1, 3, figsize=(18, 6))

# 검출 결과
det_img = det_results[0].plot()
axes[0].imshow(cv2.cvtColor(det_img, cv2.COLOR_BGR2RGB))
axes[0].set_title("Detection (바운딩 박스)")

# 세그멘테이션 결과
seg_img = seg_results[0].plot()
axes[1].imshow(cv2.cvtColor(seg_img, cv2.COLOR_BGR2RGB))
axes[1].set_title("Segmentation (마스크)")

# 마스크만 표시
if seg_results[0].masks is not None:
    combined_mask = seg_results[0].masks.data.cpu().numpy().sum(axis=0)
    axes[2].imshow(combined_mask, cmap='jet')
    axes[2].set_title("마스크 합성")

for ax in axes:
    ax.axis('off')
plt.tight_layout()
plt.show()
```

### 관찰 포인트
- 분류는 이미지 전체, 검출은 위치+크기, 세그멘테이션은 픽셀 단위임을 이해했는가?
- 실시간 처리에서 각 태스크의 속도 차이가 있는가?

## 과제

### 제출물: "YOLOv8 객체 검출 실험 보고서"

```markdown
# Day 8 과제: YOLO 객체 검출

## 1. 모델 크기별 비교표
| 모델     | 파라미터 | 추론 시간 | 검출 수 |
|----------|----------|-----------|---------|
| YOLOv8n  |          |           |         |
| YOLOv8s  |          |           |         |
| YOLOv8m  |          |           |         |

## 2. 다양한 이미지 테스트
- 최소 5장의 이미지에 대한 검출 결과:
- 잘 검출되는 경우와 실패하는 경우 분석:

## 3. COCO 80클래스 중 검출해본 클래스 목록
- 검출 성공 클래스:
- 어려웠던 클래스와 이유:
```

## 강사 참고 사항
- YOLOv8n으로 시작하여 부담 없이 첫 추론을 경험하게 한다
- YOLO의 내부 아키텍처(backbone, neck, head)는 개념 수준으로만 설명한다
- Day 9의 커스텀 학습을 위해 "사전학습 모델의 한계"를 느끼게 하는 것이 중요하다
