"""
번호판 검출 YOLO 학습 스크립트 (Kaggle 데이터셋용)

Colab에서 실행:
1. 이 파일을 Colab에 업로드
2. !python train_yolo_kaggle.py 실행

또는 셀별로 실행하려면 각 섹션을 복사하여 실행
"""

# ============================================================
# 1. 패키지 설치 (Colab에서 실행)
# ============================================================
# !pip install ultralytics

import os
import glob
import shutil
import xml.etree.ElementTree as ET
from sklearn.model_selection import train_test_split

print("=" * 60)
print("License Plate Detection - YOLO Training")
print("=" * 60)

# ============================================================
# 2. 데이터셋 다운로드 (이미 완료되었으면 스킵)
# ============================================================
"""
# Kaggle 데이터 다운로드 (이미 완료됨)
!kaggle datasets download -d fareselmenshawii/license-plate-dataset
!unzip -q license-plate-dataset.zip -d data/
"""

# ============================================================
# 3. 폴더 생성
# ============================================================
print("\n[1/5] Creating folders...")

os.makedirs('dataset/images/train', exist_ok=True)
os.makedirs('dataset/images/val', exist_ok=True)
os.makedirs('dataset/labels/train', exist_ok=True)
os.makedirs('dataset/labels/val', exist_ok=True)

print("  - dataset/images/train")
print("  - dataset/images/val")
print("  - dataset/labels/train")
print("  - dataset/labels/val")

# ============================================================
# 4. XML → YOLO 변환 함수
# ============================================================
def convert_xml_to_yolo(xml_path):
    """XML 라벨을 YOLO 형식으로 변환"""
    tree = ET.parse(xml_path)
    root = tree.getroot()

    # 이미지 크기
    img_width = int(root.find('.//width').text)
    img_height = int(root.find('.//height').text)

    yolo_lines = []
    for obj in root.findall('.//object'):
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
# 5. 데이터 변환
# ============================================================
print("\n[2/5] Converting XML to YOLO format...")

# XML 파일 찾기
xml_files = glob.glob('data/**/*.xml', recursive=True)
print(f"  Found {len(xml_files)} XML files")

if len(xml_files) == 0:
    print("  ERROR: No XML files found!")
    print("  Please run: !unzip -q license-plate-dataset.zip -d data/")
    exit()

# Train/Val 분리 (80:20)
train_files, val_files = train_test_split(xml_files, test_size=0.2, random_state=42)
print(f"  Train: {len(train_files)}, Val: {len(val_files)}")

# 변환 및 복사
success_count = 0
error_count = 0

for split, files in [('train', train_files), ('val', val_files)]:
    for xml_path in files:
        try:
            # 이미지 경로 찾기
            img_path = xml_path.replace('.xml', '.jpg')
            if not os.path.exists(img_path):
                img_path = xml_path.replace('.xml', '.png')
            if not os.path.exists(img_path):
                img_path = xml_path.replace('.xml', '.jpeg')

            if os.path.exists(img_path):
                # 이미지 복사
                img_name = os.path.basename(img_path)
                shutil.copy(img_path, f'dataset/images/{split}/{img_name}')

                # 라벨 변환 및 저장
                yolo_label = convert_xml_to_yolo(xml_path)
                label_name = img_name.rsplit('.', 1)[0] + '.txt'
                with open(f'dataset/labels/{split}/{label_name}', 'w') as f:
                    f.write(yolo_label)

                success_count += 1
            else:
                error_count += 1

        except Exception as e:
            error_count += 1
            print(f"  Error: {xml_path} - {e}")

print(f"\n  Conversion complete!")
print(f"  Success: {success_count}, Errors: {error_count}")
print(f"  Train images: {len(os.listdir('dataset/images/train'))}")
print(f"  Val images: {len(os.listdir('dataset/images/val'))}")

# ============================================================
# 6. dataset.yaml 생성
# ============================================================
print("\n[3/5] Creating dataset.yaml...")

yaml_content = """path: /content/dataset
train: images/train
val: images/val

nc: 1
names: ['plate']
"""

with open('dataset/dataset.yaml', 'w') as f:
    f.write(yaml_content)

print("  dataset.yaml created!")

# ============================================================
# 7. YOLO 학습
# ============================================================
print("\n[4/5] Starting YOLO training...")
print("  This will take about 15-30 minutes...")

from ultralytics import YOLO

# 모델 로드 (사전학습된 YOLOv8n - 가장 가벼운 모델)
model = YOLO('yolov8n.pt')

# 학습 시작
results = model.train(
    data='dataset/dataset.yaml',
    epochs=50,           # 에포크 수
    imgsz=640,           # 이미지 크기
    batch=16,            # 배치 크기
    name='plate_detector',
    patience=10,         # Early stopping
    save=True,           # 모델 저장
    plots=True           # 결과 그래프 저장
)

print("\n[5/5] Training complete!")

# ============================================================
# 8. 결과 확인
# ============================================================
print("\n" + "=" * 60)
print("Results")
print("=" * 60)

# 최고 성능 모델 경로
best_model = 'runs/detect/plate_detector/weights/best.pt'
print(f"\nBest model saved: {best_model}")

# 결과 이미지 경로
print("\nResult images:")
print("  - runs/detect/plate_detector/results.png (학습 곡선)")
print("  - runs/detect/plate_detector/confusion_matrix.png (혼동 행렬)")
print("  - runs/detect/plate_detector/val_batch0_pred.jpg (예측 샘플)")

# ============================================================
# 9. 테스트 예측 (선택사항)
# ============================================================
print("\n" + "-" * 40)
print("Test Prediction")
print("-" * 40)

# 검증 이미지로 테스트
val_images = glob.glob('dataset/images/val/*.jpg')[:5]

if val_images:
    # 최고 모델 로드
    best_model = YOLO('runs/detect/plate_detector/weights/best.pt')

    for img_path in val_images:
        results = best_model(img_path)
        print(f"  {os.path.basename(img_path)}: {len(results[0].boxes)} plates detected")

print("\n" + "=" * 60)
print("Done! You can now use the model for inference.")
print("=" * 60)

# ============================================================
# 10. 모델 다운로드 (Colab에서 실행)
# ============================================================
"""
# Google Drive에 저장
from google.colab import drive
drive.mount('/content/drive')

import shutil
shutil.copy('runs/detect/plate_detector/weights/best.pt',
            '/content/drive/MyDrive/plate_detector.pt')

# 또는 직접 다운로드
from google.colab import files
files.download('runs/detect/plate_detector/weights/best.pt')
"""
