# Day 12: 번호판 검출 모델 학습 — "YOLO로 번호판을 찾아낸다"

## 학습 목표
- 번호판 검출 전용 YOLO 모델을 학습시킨다
- 데이터 증강(Augmentation) 전략을 수립하고 적용한다
- mAP 80% 이상을 목표로 모델을 튜닝한다
- 학습 결과를 분석하고 문제점을 파악한다

## 준비물
- Google Colab (GPU 런타임)
- Roboflow 번호판 데이터셋 (Day 9에서 준비)
- 또는 공개 번호판 데이터셋 활용

## 실습 1: 학습 데이터 준비 및 증강 (30분)

1. 데이터셋을 로드하고 품질을 검수한다:

```python
!pip install ultralytics roboflow -q

from roboflow import Roboflow
import os
import cv2
import matplotlib.pyplot as plt
import numpy as np

# 데이터셋 다운로드 (Roboflow 또는 공개 데이터)
# 방법 1: Roboflow
# rf = Roboflow(api_key="YOUR_KEY")
# project = rf.workspace().project("license-plate-detection")
# dataset = project.version(1).download("yolov8")

# 방법 2: 자체 데이터셋 구조 확인
data_dir = "lpr_project/data/dataset"
for split in ["train", "valid"]:
    img_dir = os.path.join(data_dir, split, "images")
    lbl_dir = os.path.join(data_dir, split, "labels")
    if os.path.exists(img_dir):
        n_imgs = len([f for f in os.listdir(img_dir) if f.endswith(('.jpg', '.png'))])
        n_lbls = len([f for f in os.listdir(lbl_dir) if f.endswith('.txt')])
        print(f"{split}: 이미지 {n_imgs}개, 라벨 {n_lbls}개")
```

2. 라벨링 품질을 시각적으로 검수한다:

```python
def visualize_labels(img_dir, lbl_dir, n_samples=6):
    """라벨링 결과를 시각화하여 검수"""
    img_files = sorted([f for f in os.listdir(img_dir) if f.endswith(('.jpg', '.png'))])

    fig, axes = plt.subplots(2, 3, figsize=(15, 10))
    for ax, img_file in zip(axes.flat, img_files[:n_samples]):
        img = cv2.imread(os.path.join(img_dir, img_file))
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        h, w = img.shape[:2]

        # 라벨 읽기
        lbl_file = os.path.splitext(img_file)[0] + ".txt"
        lbl_path = os.path.join(lbl_dir, lbl_file)
        if os.path.exists(lbl_path):
            with open(lbl_path) as f:
                for line in f:
                    parts = line.strip().split()
                    cls, xc, yc, bw, bh = int(parts[0]), *[float(p) for p in parts[1:]]
                    x1 = int((xc - bw/2) * w)
                    y1 = int((yc - bh/2) * h)
                    x2 = int((xc + bw/2) * w)
                    y2 = int((yc + bh/2) * h)
                    cv2.rectangle(img_rgb, (x1, y1), (x2, y2), (0, 255, 0), 2)

        ax.imshow(img_rgb)
        ax.set_title(img_file)
        ax.axis('off')
    plt.suptitle("라벨링 검수")
    plt.tight_layout()
    plt.show()

# visualize_labels(img_dir, lbl_dir)
```

3. data.yaml을 작성한다:

```python
import yaml

data_yaml = {
    "path": os.path.abspath(data_dir),
    "train": "train/images",
    "val": "valid/images",
    "nc": 1,
    "names": ["plate"]
}

yaml_path = os.path.join(data_dir, "data.yaml")
with open(yaml_path, "w") as f:
    yaml.dump(data_yaml, f, default_flow_style=False)

print(f"data.yaml 저장: {yaml_path}")
print(yaml.dump(data_yaml, default_flow_style=False))
```

### 관찰 포인트
- 이미지와 라벨 파일이 1:1로 매칭되는지 확인했는가?
- 바운딩 박스가 번호판을 정확히 감싸고 있는가?

## 실습 2: YOLO 학습 실행 (40분)

1. 하이퍼파라미터를 설정하고 학습을 시작한다:

```python
from ultralytics import YOLO

# 사전학습 모델 로드
model = YOLO("yolov8n.pt")

# 학습 실행
results = model.train(
    data=yaml_path,
    epochs=100,
    imgsz=640,
    batch=16,
    name="plate_v1",
    patience=15,           # Early stopping
    lr0=0.01,              # 초기 학습률
    lrf=0.01,              # 최종 학습률 비율
    # 데이터 증강 설정
    hsv_h=0.015,           # 색조 변환
    hsv_s=0.7,             # 채도 변환
    hsv_v=0.4,             # 명도 변환
    degrees=5.0,           # 회전 범위
    translate=0.1,         # 이동 범위
    scale=0.5,             # 스케일 범위
    flipud=0.0,            # 상하 반전 (번호판은 비활성화)
    fliplr=0.5,            # 좌우 반전
    mosaic=1.0,            # 모자이크 증강
    mixup=0.1,             # MixUp 증강
    save=True,
    plots=True,
    verbose=True,
)
```

2. 학습 진행 상황을 모니터링한다:

```python
# 학습 중간 결과 확인 (학습 완료 후)
import glob
from PIL import Image

results_dir = "runs/detect/plate_v1"

# 학습 곡선
if os.path.exists(f"{results_dir}/results.png"):
    img = Image.open(f"{results_dir}/results.png")
    plt.figure(figsize=(16, 8))
    plt.imshow(img)
    plt.title("학습 곡선")
    plt.axis('off')
    plt.show()

# 학습 데이터 배치 시각화
for batch_img in glob.glob(f"{results_dir}/train_batch*.jpg")[:3]:
    img = Image.open(batch_img)
    plt.figure(figsize=(10, 10))
    plt.imshow(img)
    plt.title(os.path.basename(batch_img))
    plt.axis('off')
    plt.show()
```

### 관찰 포인트
- 학습 loss가 안정적으로 감소하는가?
- Early stopping이 발동했다면, 어느 epoch에서 멈추었는가?

## 실습 3: 모델 평가 및 튜닝 (20분)

1. 검증 데이터로 성능을 평가한다:

```python
# 최적 모델 로드
best_model = YOLO(f"{results_dir}/weights/best.pt")

# 검증 평가
metrics = best_model.val()
print("=== 검증 결과 ===")
print(f"mAP50: {metrics.box.map50:.4f}")
print(f"mAP50-95: {metrics.box.map:.4f}")
print(f"Precision: {metrics.box.mp:.4f}")
print(f"Recall: {metrics.box.mr:.4f}")

# 목표: mAP50 > 0.80
if metrics.box.map50 > 0.80:
    print("\n목표 달성! mAP50 > 80%")
else:
    print(f"\n목표 미달 ({metrics.box.map50:.2%}). 개선 필요.")
    print("개선 방법: 데이터 추가, 라벨링 정제, 에폭 증가, 모델 크기 변경")
```

2. 검출 결과를 시각화한다:

```python
# 검증 이미지에 대한 추론
val_results = best_model.predict(
    source=os.path.join(data_dir, "valid/images"),
    conf=0.25,
    save=True,
    name="plate_v1_val"
)

# 결과 확인
for r in val_results[:6]:
    result_img = r.plot()
    plt.figure(figsize=(8, 6))
    plt.imshow(cv2.cvtColor(result_img, cv2.COLOR_BGR2RGB))
    plt.title(f"검출: {len(r.boxes)}개")
    plt.axis('off')
    plt.show()
```

3. 모델을 저장한다:

```python
import shutil

# 최종 모델을 프로젝트 폴더로 복사
os.makedirs("lpr_project/models", exist_ok=True)
shutil.copy(f"{results_dir}/weights/best.pt", "lpr_project/models/plate_detector.pt")
print("모델 저장: lpr_project/models/plate_detector.pt")
```

### 관찰 포인트
- mAP50과 mAP50-95의 차이가 큰 이유는 무엇인가?
- 작은 번호판이나 기울어진 번호판이 검출에 실패하는 경우가 있는가?

## 과제

### 제출물: "번호판 검출 모델 학습 보고서"

```markdown
# Day 12 과제: 번호판 검출 모델

## 1. 학습 설정
- 데이터셋 크기: Train ___장, Valid ___장
- 모델: YOLOv8___
- 에폭: ___, 배치: ___
- 증강 설정:

## 2. 학습 결과
- 최종 mAP50:
- 최종 Precision / Recall:
- 학습 곡선 스크린샷:
- 혼동 행렬 스크린샷:

## 3. 실패 사례 분석
- 검출 실패 이미지 3장과 원인:
  1.
  2.
  3.
- 개선 계획:
```

## 강사 참고 사항
- 데이터가 50장 미만이면 mAP 80% 달성이 어려우므로, 공개 데이터셋을 보충한다
- 번호판은 상하 반전이 의미 없으므로 flipud=0.0으로 설정한다
- 학습이 오래 걸리면 epoch를 30~50으로 줄이고, 나머지는 배경에서 실행한다
