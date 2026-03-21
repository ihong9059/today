"""
번호판 검출 YOLO 학습 스크립트

데이터셋: andrewmvd/car-plate-detection (Kaggle)
- 433개 이미지 + Pascal VOC XML 라벨

사용법:
1. Colab에서: 노트북(Step1_Detection_Colab.ipynb) 사용 권장
2. 로컬에서: python train_yolo.py (GPU 필요)

Kaggle 데이터 다운로드:
    kaggle datasets download -d andrewmvd/car-plate-detection
    unzip car-plate-detection.zip -d data/
"""

import os
import shutil
import xml.etree.ElementTree as ET
from pathlib import Path

# scikit-learn 설치 확인
try:
    from sklearn.model_selection import train_test_split
except ImportError:
    print("Installing scikit-learn...")
    os.system("pip install scikit-learn")
    from sklearn.model_selection import train_test_split

print("=" * 60)
print("License Plate Detection - YOLO Training")
print("Dataset: andrewmvd/car-plate-detection")
print("=" * 60)

# ============================================================
# 설정
# ============================================================
DATA_DIR = Path('data')           # 원본 데이터 폴더
DATASET_DIR = Path('dataset')     # YOLO 형식 출력 폴더
EPOCHS = 50
BATCH_SIZE = 16
IMG_SIZE = 640

# ============================================================
# 1. 폴더 생성
# ============================================================
print("\n[1/5] Creating folders...")

for split in ['train', 'val']:
    (DATASET_DIR / 'images' / split).mkdir(parents=True, exist_ok=True)
    (DATASET_DIR / 'labels' / split).mkdir(parents=True, exist_ok=True)
    print(f"  - dataset/images/{split}")
    print(f"  - dataset/labels/{split}")

# ============================================================
# 2. XML → YOLO 변환 함수
# ============================================================
def convert_xml_to_yolo(xml_path):
    """XML 라벨을 YOLO 형식으로 변환"""
    tree = ET.parse(xml_path)
    root = tree.getroot()

    # 이미지 크기
    size = root.find('size')
    img_width = int(size.find('width').text)
    img_height = int(size.find('height').text)

    yolo_lines = []
    for obj in root.findall('object'):
        bbox = obj.find('bndbox')
        xmin = int(bbox.find('xmin').text)
        ymin = int(bbox.find('ymin').text)
        xmax = int(bbox.find('xmax').text)
        ymax = int(bbox.find('ymax').text)

        # YOLO 형식 (정규화된 중심점 + 크기)
        center_x = ((xmin + xmax) / 2) / img_width
        center_y = ((ymin + ymax) / 2) / img_height
        width = (xmax - xmin) / img_width
        height = (ymax - ymin) / img_height

        # class_id center_x center_y width height
        yolo_lines.append(f"0 {center_x:.6f} {center_y:.6f} {width:.6f} {height:.6f}")

    return '\n'.join(yolo_lines)

# ============================================================
# 3. 데이터 변환
# ============================================================
print("\n[2/5] Converting XML to YOLO format...")

# XML 파일 찾기
xml_files = list(DATA_DIR.rglob('*.xml'))
print(f"  Found {len(xml_files)} XML files")

if len(xml_files) == 0:
    print("\n  ERROR: No XML files found!")
    print("  Please download the dataset first:")
    print("    kaggle datasets download -d andrewmvd/car-plate-detection")
    print("    unzip car-plate-detection.zip -d data/")
    exit(1)

# Train/Val 분리 (80:20)
train_files, val_files = train_test_split(xml_files, test_size=0.2, random_state=42)
print(f"  Train: {len(train_files)}, Val: {len(val_files)}")

# 변환 및 복사
success_count = 0
error_count = 0

for split, files in [('train', train_files), ('val', val_files)]:
    for xml_path in files:
        try:
            xml_name = xml_path.stem  # 확장자 제외한 파일명

            # 이미지 경로 찾기
            img_path = None
            for ext in ['.png', '.jpg', '.jpeg']:
                # images 폴더 확인
                test_path = DATA_DIR / 'images' / f'{xml_name}{ext}'
                if test_path.exists():
                    img_path = test_path
                    break
                # XML과 같은 폴더 확인
                test_path = xml_path.with_suffix(ext)
                if test_path.exists():
                    img_path = test_path
                    break

            if img_path and img_path.exists():
                # 이미지 복사
                shutil.copy(img_path, DATASET_DIR / 'images' / split / img_path.name)

                # YOLO 라벨 변환 및 저장
                yolo_label = convert_xml_to_yolo(xml_path)
                label_path = DATASET_DIR / 'labels' / split / f'{xml_name}.txt'
                label_path.write_text(yolo_label)

                success_count += 1
            else:
                error_count += 1

        except Exception as e:
            error_count += 1
            print(f"  Error: {xml_path} - {e}")

print(f"\n  Conversion complete!")
print(f"  Success: {success_count}, Errors: {error_count}")
print(f"  Train images: {len(list((DATASET_DIR / 'images/train').iterdir()))}")
print(f"  Val images: {len(list((DATASET_DIR / 'images/val').iterdir()))}")

# ============================================================
# 4. dataset.yaml 생성
# ============================================================
print("\n[3/5] Creating dataset.yaml...")

# 절대 경로 사용 (로컬 실행 시)
abs_path = DATASET_DIR.resolve()

yaml_content = f"""path: {abs_path}
train: images/train
val: images/val

nc: 1
names: ['plate']
"""

yaml_path = DATASET_DIR / 'dataset.yaml'
yaml_path.write_text(yaml_content)

print(f"  Created: {yaml_path}")

# ============================================================
# 5. YOLO 학습
# ============================================================
print("\n[4/5] Starting YOLO training...")
print(f"  Epochs: {EPOCHS}")
print(f"  Batch size: {BATCH_SIZE}")
print(f"  Image size: {IMG_SIZE}")

try:
    from ultralytics import YOLO
except ImportError:
    print("Installing ultralytics...")
    os.system("pip install ultralytics")
    from ultralytics import YOLO

# 모델 로드
model = YOLO('yolov8n.pt')

# 학습 시작
results = model.train(
    data=str(yaml_path),
    epochs=EPOCHS,
    imgsz=IMG_SIZE,
    batch=BATCH_SIZE,
    name='plate_detector',
    patience=10,
    save=True,
    plots=True
)

print("\n[5/5] Training complete!")

# ============================================================
# 6. 결과 확인
# ============================================================
print("\n" + "=" * 60)
print("Results")
print("=" * 60)

best_model = Path('runs/detect/plate_detector/weights/best.pt')
print(f"\nBest model: {best_model}")

print("\nResult files:")
print("  - runs/detect/plate_detector/results.png (학습 곡선)")
print("  - runs/detect/plate_detector/confusion_matrix.png (혼동 행렬)")
print("  - runs/detect/plate_detector/val_batch0_pred.jpg (예측 샘플)")

# ============================================================
# 7. 간단한 테스트
# ============================================================
print("\n" + "-" * 40)
print("Test Prediction")
print("-" * 40)

val_images = list((DATASET_DIR / 'images/val').glob('*'))[:5]

if val_images and best_model.exists():
    test_model = YOLO(str(best_model))

    for img_path in val_images:
        results = test_model(str(img_path))
        print(f"  {img_path.name}: {len(results[0].boxes)} plates detected")

print("\n" + "=" * 60)
print("Done!")
print("=" * 60)
