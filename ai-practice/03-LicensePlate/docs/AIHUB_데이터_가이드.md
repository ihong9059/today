# AIHUB 번호판 데이터셋 다운로드 가이드

---

## 데이터셋 정보

| 항목 | 내용 |
|------|------|
| **이름** | 자동차 차종/연식/번호판 인식용 영상 |
| **URL** | https://aihub.or.kr/aidata/27727 |
| **비용** | **무료** |
| **번호판 이미지** | 10만 장 |
| **차량 이미지** | 50만 장 |
| **라벨 형식** | JSON |

---

## 다운로드 절차

### 1단계: 회원가입

1. [AIHUB](https://aihub.or.kr/) 접속
2. 회원가입 (이메일 인증 필요)
3. 로그인

### 2단계: 데이터셋 신청

1. [번호판 데이터셋 페이지](https://aihub.or.kr/aidata/27727) 접속
2. "데이터 다운로드" 버튼 클릭
3. 활용 목적 작성 (예: "딥러닝 학습용")
4. 신청 완료

### 3단계: 승인 대기

- 보통 **1-2일** 소요
- 이메일로 승인 알림

### 4단계: 다운로드

#### 방법 1: 웹에서 직접 다운로드

```
AIHUB 사이트 → 마이페이지 → 데이터 다운로드
```

#### 방법 2: aihubshell 사용 (권장)

```bash
# Linux/WSL에서 실행

# 1. aihubshell 다운로드
curl -o aihubshell https://api.aihub.or.kr/api/aihubshell.do
chmod +x aihubshell

# 2. 실행
./aihubshell

# 3. 로그인 정보 입력
# 4. 데이터셋 키 입력: 27727
# 5. 다운로드 시작
```

---

## 데이터 구조

```
다운로드 폴더/
├── Training/
│   ├── 원천데이터/
│   │   ├── 번호판/
│   │   │   ├── plate_0001.jpg
│   │   │   ├── plate_0002.jpg
│   │   │   └── ...
│   │   └── 차량/
│   │       ├── car_0001.jpg
│   │       └── ...
│   └── 라벨링데이터/
│       ├── plate_0001.json
│       ├── plate_0002.json
│       └── ...
└── Validation/
    └── (동일 구조)
```

---

## JSON 라벨 형식

```json
{
  "image": {
    "filename": "plate_0001.jpg",
    "width": 640,
    "height": 480
  },
  "annotations": {
    "plate": {
      "bbox": {
        "x": 150,
        "y": 200,
        "width": 200,
        "height": 60
      },
      "text": "12가3456",
      "characters": [
        {"char": "1", "bbox": {...}},
        {"char": "2", "bbox": {...}},
        {"char": "가", "bbox": {...}},
        {"char": "3", "bbox": {...}},
        {"char": "4", "bbox": {...}},
        {"char": "5", "bbox": {...}},
        {"char": "6", "bbox": {...}}
      ]
    }
  }
}
```

---

## 데이터 전처리

### 프로젝트 폴더로 복사

```bash
# 다운로드 후 압축 해제
unzip Training.zip

# 프로젝트 폴더로 이동
cp -r Training/* /path/to/ai-practice/03-LicensePlate/data/raw/
```

### YOLO 형식 변환 (04-E2E용)

```python
import json
import os

def convert_to_yolo(json_path, img_width, img_height):
    """AIHUB JSON → YOLO TXT 변환"""
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    bbox = data['annotations']['plate']['bbox']

    # 중심점 + 크기로 변환 (정규화)
    center_x = (bbox['x'] + bbox['width'] / 2) / img_width
    center_y = (bbox['y'] + bbox['height'] / 2) / img_height
    width = bbox['width'] / img_width
    height = bbox['height'] / img_height

    # class_id center_x center_y width height
    return f"0 {center_x:.6f} {center_y:.6f} {width:.6f} {height:.6f}"

# 사용 예
yolo_label = convert_to_yolo('plate_0001.json', 640, 480)
print(yolo_label)
# 출력: 0 0.390625 0.479167 0.312500 0.125000
```

---

## Windows에서 다운로드

Windows에서는 WSL(Windows Subsystem for Linux) 설치 후 aihubshell 사용 권장:

```powershell
# 1. WSL 설치 (PowerShell 관리자 권한)
wsl --install

# 2. Ubuntu 터미널에서
curl -o aihubshell https://api.aihub.or.kr/api/aihubshell.do
chmod +x aihubshell
./aihubshell
```

또는 웹에서 직접 다운로드 (분할 압축 파일이므로 용량이 큼)

---

## 주의사항

1. **용량**: 전체 데이터가 수십 GB - 충분한 저장 공간 필요
2. **분할 압축**: 여러 개의 .zip 파일로 분할되어 있음
3. **개인정보**: 번호판에 실제 차량 정보 포함 - 학습 목적으로만 사용
4. **라이선스**: 상업적 이용 시 AIHUB 이용약관 확인 필요

---

## 문제 해결

### "승인 대기 중" 상태가 오래 지속됨
- 영업일 기준 1-2일 소요
- 3일 이상 시 AIHUB 고객센터 문의

### 다운로드 속도가 느림
- aihubshell 사용 시 더 빠름
- 야간 시간대 다운로드 권장

### 압축 해제 오류
- 분할 압축이므로 모든 파일이 있어야 함
- Linux에서 `cat` 명령으로 병합 후 해제

```bash
cat Training.z01 Training.z02 Training.zip > Training_full.zip
unzip Training_full.zip
```

---

## 대안 데이터셋

AIHUB 승인이 오래 걸리면 아래 데이터셋으로 먼저 시작:

| 데이터셋 | 특징 | 링크 |
|---------|------|------|
| Kaggle Car Plate | 즉시 다운로드, 외국 번호판 | [링크](https://www.kaggle.com/datasets/andrewmvd/car-plate-detection) |
| CCPD | 중국 번호판, 대용량 | [GitHub](https://github.com/detectRecog/CCPD) |
| OpenALPR | 다양한 국가 | [GitHub](https://github.com/openalpr/openalpr) |
