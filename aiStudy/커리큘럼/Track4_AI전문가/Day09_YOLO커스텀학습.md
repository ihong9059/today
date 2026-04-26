# Day 9: YOLO 커스텀 학습 — "나만의 데이터로 AI를 훈련한다"

## 학습 목표
- Roboflow를 사용하여 이미지에 라벨링(바운딩 박스)을 수행한다
- YOLO 학습용 데이터셋 구조(data.yaml)를 이해한다
- 커스텀 데이터로 YOLOv8을 학습(Fine-tuning)시킨다
- mAP(mean Average Precision) 등 검출 평가 지표를 분석한다

## 준비물
- Google Colab (GPU 런타임)
- Roboflow 계정 (무료)
- 학습용 이미지 30~50장 (번호판 또는 특정 객체)

## 실습 1: Roboflow 라벨링 (40분)

1. Roboflow에서 프로젝트를 생성한다:

```
1. https://roboflow.com 접속 -> Sign Up (무료)
2. Create New Project
   - Project Name: "license-plate-detection"
   - Project Type: Object Detection
   - Annotation Group: "plate"
3. Upload Images (30~50장의 번호판 이미지)
4. Annotate:
   - 각 이미지에서 번호판 영역을 바운딩 박스로 표시
   - 클래스: "plate"
5. Generate Dataset:
   - Train/Valid/Test: 70/20/10 비율
   - Preprocessing: Auto-Orient, Resize 640x640
   - Augmentation: Flip, Rotation, Brightness
6. Export -> YOLOv8 format -> Download Code
```

2. Claude Code로 라벨링 가이드를 요청한다:

```
Roboflow에서 번호판 라벨링할 때 주의사항을 정리해줘.
바운딩 박스를 정확하게 그리는 방법,
번호판 일부가 가려진 경우의 처리 방법,
라벨링 품질이 학습 결과에 미치는 영향을 포함해줘.
```

### 관찰 포인트
- 바운딩 박스를 너무 크게/작게 그리면 학습 품질에 어떤 영향이 있는가?
- Augmentation이 적은 데이터를 보완하는 원리를 이해했는가?

## 실습 2: 데이터셋 구조 이해 및 학습 (30분)

1. Roboflow에서 다운로드한 데이터셋을 확인한다:

```python
!pip install ultralytics roboflow -q

# Roboflow에서 데이터셋 다운로드
from roboflow import Roboflow
rf = Roboflow(api_key="YOUR_API_KEY")
project = rf.workspace().project("license-plate-detection")
dataset = project.version(1).download("yolov8")
```

2. data.yaml 파일을 확인한다:

```python
import yaml

# data.yaml 구조 확인
with open(f"{dataset.location}/data.yaml", "r") as f:
    data_config = yaml.safe_load(f)

print("=== data.yaml 내용 ===")
for key, value in data_config.items():
    print(f"  {key}: {value}")

# 예상 구조:
# train: /path/to/train/images
# val: /path/to/valid/images
# test: /path/to/test/images
# nc: 1
# names: ['plate']
```

3. YOLO 학습 데이터 포맷을 확인한다:

```python
import os

# 라벨 파일 확인 (YOLO 포맷: class x_center y_center width height)
train_labels = os.path.join(dataset.location, "train", "labels")
label_files = os.listdir(train_labels)
print(f"학습 라벨 파일 수: {len(label_files)}")

# 첫 번째 라벨 확인
with open(os.path.join(train_labels, label_files[0])) as f:
    content = f.read()
    print(f"\n라벨 예시 ({label_files[0]}):")
    print(content)
    # 형식: class_id x_center y_center width height (0~1 정규화)
```

4. 학습을 실행한다:

```python
from ultralytics import YOLO

# 사전학습 모델 기반 전이학습
model = YOLO("yolov8n.pt")

# 학습 시작
results = model.train(
    data=f"{dataset.location}/data.yaml",
    epochs=50,
    imgsz=640,
    batch=16,
    name="plate_detector",
    patience=10,        # Early stopping
    save=True,
    plots=True,
)
```

### 관찰 포인트
- YOLO 라벨 포맷이 정규화된 좌표(0~1)를 사용하는 이유를 이해했는가?
- 전이학습(pre-trained + fine-tuning)이 처음부터 학습하는 것보다 왜 효과적인가?

## 실습 3: 학습 결과 분석 (20분)

1. 학습 곡선과 mAP를 확인한다:

```python
import matplotlib.pyplot as plt
from PIL import Image

# 학습 결과 시각화 (자동 생성된 그래프)
results_dir = "runs/detect/plate_detector"

# 학습 곡선
img = Image.open(f"{results_dir}/results.png")
plt.figure(figsize=(15, 8))
plt.imshow(img)
plt.title("학습 결과 그래프")
plt.axis('off')
plt.show()

# 혼동 행렬
if os.path.exists(f"{results_dir}/confusion_matrix.png"):
    cm_img = Image.open(f"{results_dir}/confusion_matrix.png")
    plt.figure(figsize=(8, 8))
    plt.imshow(cm_img)
    plt.title("혼동 행렬")
    plt.axis('off')
    plt.show()
```

2. 검증 데이터로 평가한다:

```python
# 최적 모델로 검증
best_model = YOLO(f"{results_dir}/weights/best.pt")
metrics = best_model.val()

print(f"=== 검증 결과 ===")
print(f"mAP50: {metrics.box.map50:.4f}")
print(f"mAP50-95: {metrics.box.map:.4f}")
print(f"Precision: {metrics.box.mp:.4f}")
print(f"Recall: {metrics.box.mr:.4f}")
```

3. 테스트 이미지로 추론한다:

```python
# 학습되지 않은 새 이미지로 테스트
test_results = best_model.predict(
    source=f"{dataset.location}/test/images",
    conf=0.25,
    save=True,
    save_txt=True,
)

for r in test_results[:5]:
    print(f"이미지: {r.path}, 검출: {len(r.boxes)}개")
```

### 관찰 포인트
- mAP50이 80% 이상 달성되었는가?
- Precision과 Recall의 트레이드오프를 이해했는가?

## 과제

### 제출물: "YOLO 커스텀 학습 결과 보고서"

```markdown
# Day 9 과제: YOLO 커스텀 학습

## 1. 데이터셋 정보
- 총 이미지 수:
- Train/Valid/Test 비율:
- 클래스 수와 이름:
- Augmentation 적용 항목:

## 2. 학습 결과
- 최종 mAP50:
- 최종 mAP50-95:
- Precision / Recall:
- 학습 곡선 스크린샷:

## 3. 검출 결과 분석
- 성공적인 검출 예시 3장 (스크린샷):
- 실패한 검출 예시와 원인 분석:
- 개선 방향 제안:
```

## 강사 참고 사항
- Roboflow 무료 플랜은 프로젝트 3개, 이미지 1만장까지 가능하다
- 데이터가 30장 미만이면 Augmentation을 강하게 적용해야 한다
- mAP50이 60% 미만이면 라벨링 품질을 먼저 점검하게 한다
