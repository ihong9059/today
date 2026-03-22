# Step1 번호판 검출 - PC 테스트 가이드

Colab에서 학습한 모델을 로컬 PC에서 테스트하는 방법입니다.

---

## 목차

1. [사전 준비](#1-사전-준비)
2. [모델 다운로드](#2-모델-다운로드)
3. [환경 설정](#3-환경-설정)
4. [테스트 실행](#4-테스트-실행)
5. [결과 확인](#5-결과-확인)
6. [문제 해결](#6-문제-해결)

---

## 1. 사전 준비

### 필요 사항

| 항목 | 요구사항 |
|------|----------|
| Python | 3.8 이상 |
| GPU | 없어도 됨 (CPU로 추론 가능) |
| 저장 공간 | 약 500MB |

### 폴더 구조 확인

```
C:\todo\today\ai-practice\03-LicensePlate\
├── experiments\step1_detection\
│   ├── train_yolo.py      # 학습 스크립트
│   ├── test_model.py      # 테스트 스크립트 (생성 예정)
│   └── models\            # 모델 저장 폴더 (생성 필요)
│       └── plate_detector.pt
└── test_images\           # 테스트 이미지 (생성 필요)
    └── car1.jpg
```

---

## 2. 모델 다운로드

### 방법 1: Colab에서 직접 다운로드

Colab 노트북 마지막 셀 실행:
```python
from google.colab import files
files.download('runs/detect/plate_detector/weights/best.pt')
```

다운로드된 `best.pt` 파일을 다음 위치로 이동:
```
C:\todo\today\ai-practice\03-LicensePlate\experiments\step1_detection\models\plate_detector.pt
```

### 방법 2: Google Drive 경유

1. Colab에서 Drive에 저장 (노트북 셀 실행):
```python
from google.colab import drive
drive.mount('/content/drive')

import shutil
import os
save_dir = '/content/drive/MyDrive/AI_Practice/03-LicensePlate/models'
os.makedirs(save_dir, exist_ok=True)
shutil.copy('runs/detect/plate_detector/weights/best.pt', f'{save_dir}/plate_detector.pt')
```

2. PC에서 Google Drive 동기화 또는 웹에서 다운로드

---

## 3. 환경 설정

### 3.1 터미널 열기

```
Win + R → cmd 입력 → Enter
```

또는 VS Code 터미널 사용

### 3.2 프로젝트 폴더로 이동

```bash
cd C:\todo\today\ai-practice\03-LicensePlate\experiments\step1_detection
```

### 3.3 필요 패키지 설치

```bash
pip install ultralytics opencv-python pillow
```

### 3.4 폴더 생성

```bash
mkdir models
mkdir test_images
```

### 3.5 모델 파일 배치

다운로드한 `best.pt`를 `models\plate_detector.pt`로 저장

```bash
# 다운로드 폴더에서 복사 (예시)
copy C:\Users\%USERNAME%\Downloads\best.pt models\plate_detector.pt
```

### 3.6 테스트 이미지 준비

`test_images\` 폴더에 자동차 이미지 넣기:
- 직접 촬영한 사진
- 인터넷에서 다운로드한 이미지
- 지원 형식: `.jpg`, `.png`, `.jpeg`

---

## 4. 테스트 실행

### 4.1 테스트 스크립트 생성

`test_model.py` 파일이 없으면 아래 내용으로 생성:

```python
"""
번호판 검출 모델 테스트 스크립트

사용법:
    python test_model.py                    # test_images/ 폴더 전체 테스트
    python test_model.py --image car.jpg    # 단일 이미지 테스트
    python test_model.py --camera           # 웹캠 실시간 테스트
"""

import os
import argparse
from pathlib import Path

# Ultralytics 설치 확인
try:
    from ultralytics import YOLO
except ImportError:
    print("ultralytics 패키지를 설치하세요:")
    print("  pip install ultralytics")
    exit(1)

# 경로 설정
MODEL_PATH = Path("models/plate_detector.pt")
TEST_DIR = Path("test_images")
OUTPUT_DIR = Path("results")

def test_single_image(model, image_path, show=True, save=True):
    """단일 이미지 테스트"""
    print(f"\n테스트: {image_path}")

    results = model(str(image_path))

    # 결과 출력
    for r in results:
        boxes = r.boxes
        print(f"  검출된 번호판: {len(boxes)}개")

        for i, box in enumerate(boxes):
            conf = box.conf[0].item()
            xyxy = box.xyxy[0].tolist()
            print(f"    [{i+1}] 신뢰도: {conf:.2%}, 위치: {xyxy}")

    # 결과 이미지 표시
    if show:
        import cv2
        result_img = results[0].plot()
        cv2.imshow("Detection Result", result_img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    # 결과 이미지 저장
    if save:
        OUTPUT_DIR.mkdir(exist_ok=True)
        output_path = OUTPUT_DIR / f"result_{image_path.name}"
        result_img = results[0].plot()
        import cv2
        cv2.imwrite(str(output_path), result_img)
        print(f"  저장됨: {output_path}")

    return results

def test_folder(model, folder_path):
    """폴더 내 모든 이미지 테스트"""
    image_extensions = {'.jpg', '.jpeg', '.png', '.bmp'}
    images = [f for f in folder_path.iterdir()
              if f.suffix.lower() in image_extensions]

    if not images:
        print(f"'{folder_path}' 폴더에 이미지가 없습니다.")
        return

    print(f"\n총 {len(images)}개 이미지 테스트")
    print("=" * 50)

    total_plates = 0
    for img_path in images:
        results = test_single_image(model, img_path, show=False, save=True)
        total_plates += len(results[0].boxes)

    print("=" * 50)
    print(f"완료! 총 {total_plates}개 번호판 검출")
    print(f"결과 저장: {OUTPUT_DIR}/")

def test_camera(model):
    """웹캠 실시간 테스트"""
    import cv2

    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("웹캠을 열 수 없습니다.")
        return

    print("웹캠 테스트 시작 (종료: 'q' 키)")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 검출
        results = model(frame)

        # 결과 표시
        result_frame = results[0].plot()

        # 검출 개수 표시
        num_plates = len(results[0].boxes)
        cv2.putText(result_frame, f"Plates: {num_plates}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        cv2.imshow("License Plate Detection", result_frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

def main():
    parser = argparse.ArgumentParser(description="번호판 검출 테스트")
    parser.add_argument("--image", type=str, help="단일 이미지 경로")
    parser.add_argument("--folder", type=str, help="이미지 폴더 경로")
    parser.add_argument("--camera", action="store_true", help="웹캠 테스트")
    parser.add_argument("--model", type=str, default=str(MODEL_PATH),
                        help="모델 경로")
    args = parser.parse_args()

    # 모델 로드
    model_path = Path(args.model)
    if not model_path.exists():
        print(f"모델 파일을 찾을 수 없습니다: {model_path}")
        print("\n다음 위치에 모델을 배치하세요:")
        print(f"  {MODEL_PATH.absolute()}")
        return

    print(f"모델 로드: {model_path}")
    model = YOLO(str(model_path))

    # 테스트 실행
    if args.camera:
        test_camera(model)
    elif args.image:
        test_single_image(model, Path(args.image))
    elif args.folder:
        test_folder(model, Path(args.folder))
    else:
        # 기본: test_images 폴더 테스트
        if TEST_DIR.exists():
            test_folder(model, TEST_DIR)
        else:
            print(f"'{TEST_DIR}' 폴더가 없습니다.")
            print("\n사용법:")
            print("  python test_model.py --image car.jpg")
            print("  python test_model.py --folder test_images")
            print("  python test_model.py --camera")

if __name__ == "__main__":
    main()
```

### 4.2 테스트 실행

```bash
# 방법 1: test_images 폴더 전체 테스트
python test_model.py

# 방법 2: 단일 이미지 테스트
python test_model.py --image test_images\car1.jpg

# 방법 3: 웹캠 실시간 테스트
python test_model.py --camera
```

---

## 5. 결과 확인

### 5.1 출력 예시

```
모델 로드: models\plate_detector.pt

총 3개 이미지 테스트
==================================================

테스트: test_images\car1.jpg
  검출된 번호판: 1개
    [1] 신뢰도: 92.34%, 위치: [120.5, 340.2, 280.8, 390.5]
  저장됨: results\result_car1.jpg

테스트: test_images\car2.jpg
  검출된 번호판: 1개
    [1] 신뢰도: 88.76%, 위치: [200.1, 280.3, 350.4, 320.6]
  저장됨: results\result_car2.jpg

==================================================
완료! 총 2개 번호판 검출
결과 저장: results/
```

### 5.2 결과 이미지

`results/` 폴더에 바운딩 박스가 그려진 이미지가 저장됩니다.

```
results/
├── result_car1.jpg    # 번호판 위치 표시된 이미지
├── result_car2.jpg
└── ...
```

---

## 6. 문제 해결

### 문제 1: 모델 파일을 찾을 수 없음

```
모델 파일을 찾을 수 없습니다: models\plate_detector.pt
```

**해결**:
1. Colab에서 `best.pt` 다운로드
2. `models` 폴더 생성
3. `plate_detector.pt`로 이름 변경하여 저장

### 문제 2: ultralytics 모듈 없음

```
ModuleNotFoundError: No module named 'ultralytics'
```

**해결**:
```bash
pip install ultralytics
```

### 문제 3: OpenCV 오류

```
ModuleNotFoundError: No module named 'cv2'
```

**해결**:
```bash
pip install opencv-python
```

### 문제 4: 검출 결과가 없음

**원인**: 이미지에 번호판이 없거나, 너무 작거나, 각도가 심함

**해결**:
- 번호판이 명확히 보이는 이미지 사용
- 이미지 크기가 최소 640x480 이상 권장
- 번호판이 이미지의 5% 이상 차지하도록

### 문제 5: GPU 사용 안 됨

**확인**:
```python
import torch
print(f"CUDA 사용 가능: {torch.cuda.is_available()}")
```

**참고**: CPU로도 추론은 가능합니다 (약간 느림)

---

## 빠른 시작 요약

```bash
# 1. 폴더 이동
cd C:\todo\today\ai-practice\03-LicensePlate\experiments\step1_detection

# 2. 패키지 설치
pip install ultralytics opencv-python

# 3. 폴더 생성 및 모델 배치
mkdir models
mkdir test_images
# best.pt를 models\plate_detector.pt로 복사

# 4. 테스트 이미지 준비
# test_images\ 폴더에 자동차 사진 넣기

# 5. 테스트 실행
python test_model.py
```

---

## 다음 단계

테스트 완료 후:
- **Step 2**: 검출된 번호판에서 문자 분할 (OpenCV)
- **Step 3**: 분할된 문자 인식 (EMNIST 모델)
