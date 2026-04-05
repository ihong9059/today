# AI Hub 한국 차량 번호판 데이터 이용 가이드

## 1. AI Hub 소개

| 항목 | 내용 |
|------|------|
| **사이트** | [aihub.or.kr](https://aihub.or.kr) |
| **운영** | 한국지능정보사회진흥원 (NIA) |
| **비용** | 무료 (연구/학습 목적) |
| **데이터 규모** | 한국 차량 번호판 10만+ 장 |

---

## 2. 가입 및 데이터 신청 절차

### Step 1: 회원가입

1. [aihub.or.kr](https://aihub.or.kr) 접속
2. 우측 상단 **"회원가입"** 클릭
3. **본인인증** 진행 (휴대폰 또는 공인인증서)
4. 가입 완료 후 로그인

### Step 2: 데이터셋 검색

1. 상단 메뉴 **"AI 데이터"** 클릭
2. 검색창에 **"번호판"** 또는 **"차량 번호판"** 입력
3. 검색 결과에서 적합한 데이터셋 선택

### Step 3: 다운로드 신청

1. 원하는 데이터셋 상세 페이지 진입
2. **"데이터 다운로드"** 버튼 클릭
3. **활용 목적 작성** (예시):
   ```
   활용 목적: AI 학습 실습
   활용 내용: 자동차 번호판 인식 모델 개발 (Google Colab 환경)
   활용 기간: 1년
   ```
4. 신청 제출

### Step 4: 승인 및 다운로드

- **승인 소요 시간**: 즉시 ~ 1일 이내 (대부분 자동 승인)
- 승인 후 **"마이페이지 → 다운로드"**에서 zip 파일 다운로드
- 대용량 파일은 **전용 다운로더** 사용 권장

---

## 3. 관련 데이터셋 목록

| 데이터셋 | 규모 | 내용 | 난이도 |
|----------|------|------|--------|
| **자동차 차종/색상/번호판 인식용 영상** | 100만+ 장 | 차량 전체 사진 + 번호판 위치/텍스트 라벨링 | 대용량 |
| **차량 번호판 OCR 데이터** | 수만 장 | 번호판 크롭 이미지 + 텍스트 | 중간 |
| **교통 영상 데이터** | 다수 | CCTV 영상 내 차량/번호판 | 고급 |

> **초보자 권장**: "차량 번호판 OCR 데이터"가 용량이 작고 바로 사용하기 편함

---

## 4. 다운로드 데이터 구조

```
다운로드_파일.zip
│
├── 원천데이터/                  ← 자동차 사진 (JPG/PNG)
│   ├── train/
│   │   ├── IMG_00001.jpg
│   │   ├── IMG_00002.jpg
│   │   └── ... (수만~수십만 장)
│   └── val/
│       ├── IMG_50001.jpg
│       └── ...
│
└── 라벨링데이터/                ← 번호판 위치 + 텍스트 (JSON)
    ├── train/
    │   ├── IMG_00001.json
    │   ├── IMG_00002.json
    │   └── ...
    └── val/
        ├── IMG_50001.json
        └── ...
```

### JSON 라벨 예시

```json
{
  "image": {
    "filename": "IMG_00001.jpg",
    "width": 1920,
    "height": 1080
  },
  "annotations": [
    {
      "label": "license_plate",
      "bbox": {
        "x": 120,
        "y": 340,
        "width": 280,
        "height": 60
      },
      "text": "123가4567",
      "plate_type": "신형"
    }
  ]
}
```

| 필드 | 설명 |
|------|------|
| `bbox` | 번호판의 위치와 크기 (픽셀 단위) |
| `text` | 번호판에 적힌 실제 문자 |
| `plate_type` | 번호판 종류 (신형/구형/영업용 등) |

---

## 5. AI Hub → YOLO 포맷 변환

YOLOv8은 자체 라벨 포맷(`.txt`)을 사용하므로, AI Hub의 JSON을 변환해야 합니다.

### AI Hub JSON vs YOLO txt

```
[AI Hub JSON]
  "bbox": {"x": 120, "y": 340, "width": 280, "height": 60}
  이미지 크기: 1920 x 1080

[YOLO txt]  (비율 0~1로 정규화)
  0 0.1354 0.3426 0.1458 0.0556
  → 클래스 중심x/W 중심y/H 너비/W 높이/H
```

### 변환 스크립트

```python
import json
import os
from pathlib import Path

def convert_aihub_to_yolo(json_dir, output_dir, class_id=0):
    """
    AI Hub JSON 라벨을 YOLO txt 포맷으로 변환

    Args:
        json_dir: AI Hub JSON 파일들이 있는 폴더
        output_dir: YOLO txt 파일을 저장할 폴더
        class_id: 클래스 번호 (번호판 = 0)
    """
    os.makedirs(output_dir, exist_ok=True)
    count = 0

    for json_file in Path(json_dir).glob('*.json'):
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # 이미지 크기
        img_w = data['image']['width']
        img_h = data['image']['height']

        # YOLO 라벨 생성
        txt_name = json_file.stem + '.txt'
        txt_path = os.path.join(output_dir, txt_name)

        with open(txt_path, 'w') as f:
            for ann in data.get('annotations', []):
                bbox = ann['bbox']
                x = bbox['x']
                y = bbox['y']
                w = bbox['width']
                h = bbox['height']

                # YOLO 포맷: 중심 좌표 + 크기 (0~1 비율)
                cx = (x + w / 2) / img_w
                cy = (y + h / 2) / img_h
                nw = w / img_w
                nh = h / img_h

                f.write(f"{class_id} {cx:.6f} {cy:.6f} {nw:.6f} {nh:.6f}\n")

        count += 1

    print(f"변환 완료: {count}개 파일 → {output_dir}/")


# 사용 예시
convert_aihub_to_yolo(
    json_dir='라벨링데이터/train/',
    output_dir='dataset/train/labels/'
)
convert_aihub_to_yolo(
    json_dir='라벨링데이터/val/',
    output_dir='dataset/valid/labels/'
)
```

### 변환 후 폴더 구조

```
dataset/
├── train/
│   ├── images/     ← 원천데이터/train/ 의 이미지를 여기로 복사
│   └── labels/     ← 변환된 YOLO txt 파일
├── valid/
│   ├── images/
│   └── labels/
└── data.yaml       ← YOLOv8 설정 파일 (아래 참조)
```

### data.yaml 작성

```yaml
# data.yaml — YOLOv8 데이터셋 설정
path: /content/dataset        # 데이터셋 루트 경로
train: train/images            # 학습 이미지 폴더
val: valid/images              # 검증 이미지 폴더

# 클래스 정의
nc: 1                          # 클래스 수 (번호판 1개)
names: ['license_plate']       # 클래스 이름
```

---

## 6. Colab에서 사용하기

### 방법 1: Google Drive 경유 (권장)

```
PC에서:
  1. AI Hub에서 데이터 다운로드 (zip)
  2. 변환 스크립트 실행 (YOLO 포맷)
  3. Google Drive에 업로드

Colab에서:
  1. Drive 마운트
  2. 데이터 경로 지정하여 학습
```

```python
# Colab에서 Drive 마운트
from google.colab import drive
drive.mount('/content/drive')

# 데이터 경로
data_yaml = '/content/drive/MyDrive/plate_dataset/data.yaml'

# YOLOv8 학습
from ultralytics import YOLO
model = YOLO('yolov8n.pt')
model.train(data=data_yaml, epochs=50, imgsz=640)
```

### 방법 2: Colab에 직접 업로드

```python
# zip 파일 업로드 (소용량일 때만 권장)
from google.colab import files
uploaded = files.upload()  # zip 파일 선택

# 압축 해제
!unzip uploaded_file.zip -d dataset/
```

---

## 7. 주의사항

| 항목 | 내용 |
|------|------|
| **용량** | 전체 데이터셋은 수십~수백 GB (부분 다운로드 가능) |
| **라벨 변환** | AI Hub JSON → YOLO txt 변환 스크립트 필수 |
| **이용 조건** | 연구/학습 목적 무료, 상업 이용 시 별도 확인 |
| **유효 기간** | 다운로드 승인 후 보통 1년 (갱신 가능) |
| **Colab 용량** | 무료 Colab 디스크 약 100GB → 대용량 시 일부만 사용 |

---

## 8. 추천: 초보자 단계별 접근

```
[Step 1] Roboflow 공개 데이터 (5,000장)
  → 가입 즉시 사용, YOLO 포맷 제공
  → 빠른 프로토타입, 전체 파이프라인 확인
  → 소요 시간: 30분

[Step 2] AI Hub 데이터 신청
  → Step 1을 진행하는 동안 동시에 신청
  → 승인 대기: 즉시~1일

[Step 3] AI Hub 데이터 다운로드 + 포맷 변환
  → 대용량이므로 PC에서 변환 후 Drive 업로드
  → 10만 장 학습으로 정확도 대폭 향상

[Step 4] 실전 테스트
  → 직접 촬영한 사진으로 최종 검증
```

Step 1과 Step 2를 동시에 진행하면 시간을 절약할 수 있습니다.
