# Day 14: LPR 파이프라인 통합 — "검출부터 인식까지 한 번에"

## 학습 목표
- YOLO 검출 -> 크롭 -> 전처리 -> OCR -> 후처리를 하나의 파이프라인으로 통합한다
- 오검출 필터링 전략을 구현한다
- 검출 결과를 데이터베이스(SQLite)에 저장한다
- 전체 파이프라인의 처리 시간과 정확도를 측정한다

## 준비물
- Google Colab (GPU 런타임)
- Day 12 학습 모델 (plate_detector.pt)
- Day 13 OCR 파이프라인 코드

## 실습 1: 통합 파이프라인 구현 (40분)

1. 전체 LPR 파이프라인 클래스를 작성한다:

```python
!pip install ultralytics easyocr -q

import cv2
import numpy as np
import re
import time
import easyocr
from ultralytics import YOLO

class LPRPipeline:
    def __init__(self, detector_path="yolov8n.pt", conf_threshold=0.5):
        """LPR 파이프라인 초기화"""
        self.detector = YOLO(detector_path)
        self.reader = easyocr.Reader(['ko', 'en'], gpu=True)
        self.conf_threshold = conf_threshold

        # 한국 번호판 패턴
        self.plate_patterns = [
            r'^\d{3}[가-힣]\d{4}$',  # 신형
            r'^\d{2}[가-힣]\d{4}$',  # 구형
        ]

        # OCR 오류 보정 맵
        self.ocr_corrections = {
            'O': '0', 'o': '0', 'I': '1', 'l': '1',
            'Z': '2', 'S': '5', 'B': '8', 'G': '6',
        }

    def detect_plates(self, image):
        """1단계: 번호판 영역 검출"""
        results = self.detector(image, verbose=False, conf=self.conf_threshold)
        plates = []
        for box in results[0].boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
            conf = float(box.conf)
            plates.append({
                'bbox': (x1, y1, x2, y2),
                'confidence': conf
            })
        return plates

    def crop_plate(self, image, bbox, padding=5):
        """2단계: 번호판 영역 크롭"""
        x1, y1, x2, y2 = bbox
        h, w = image.shape[:2]
        x1 = max(0, x1 - padding)
        y1 = max(0, y1 - padding)
        x2 = min(w, x2 + padding)
        y2 = min(h, y2 + padding)
        return image[y1:y2, x1:x2]

    def preprocess(self, plate_image):
        """3단계: OCR 전처리"""
        gray = cv2.cvtColor(plate_image, cv2.COLOR_BGR2GRAY)
        denoised = cv2.bilateralFilter(gray, 11, 17, 17)
        _, binary = cv2.threshold(denoised, 0, 255,
                                   cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        return binary

    def recognize(self, processed_image):
        """4단계: OCR 문자 인식"""
        results = self.reader.readtext(processed_image, detail=1)
        if not results:
            return "", 0.0
        best = max(results, key=lambda x: x[2])
        return best[1], best[2]

    def postprocess(self, text):
        """5단계: 후처리 (보정 + 검증)"""
        cleaned = re.sub(r'[^0-9가-힣a-zA-Z]', '', text)
        corrected = list(cleaned)
        for i, ch in enumerate(corrected):
            if ch in self.ocr_corrections:
                corrected[i] = self.ocr_corrections[ch]
        corrected = ''.join(corrected)

        for pattern in self.plate_patterns:
            if re.match(pattern, corrected):
                return corrected, True
        return corrected, False

    def process(self, image):
        """전체 파이프라인 실행"""
        start_time = time.time()
        results = []

        # 1. 검출
        plates = self.detect_plates(image)

        for plate_info in plates:
            # 2. 크롭
            cropped = self.crop_plate(image, plate_info['bbox'])

            # 3. 전처리
            processed = self.preprocess(cropped)

            # 4. OCR
            raw_text, ocr_conf = self.recognize(processed)

            # 5. 후처리
            final_text, is_valid = self.postprocess(raw_text)

            results.append({
                'bbox': plate_info['bbox'],
                'det_confidence': plate_info['confidence'],
                'raw_text': raw_text,
                'final_text': final_text,
                'ocr_confidence': ocr_conf,
                'is_valid': is_valid,
            })

        elapsed = time.time() - start_time
        return results, elapsed

# 파이프라인 초기화
lpr = LPRPipeline(detector_path="yolov8n.pt", conf_threshold=0.3)
print("LPR 파이프라인 초기화 완료")
```

2. 테스트 이미지로 파이프라인을 실행한다:

```python
import matplotlib.pyplot as plt

# 테스트 이미지 생성 (실제 차량 이미지로 대체 권장)
test_img = np.ones((400, 600, 3), dtype=np.uint8) * 180
cv2.rectangle(test_img, (150, 250), (450, 310), (255, 255, 255), -1)
cv2.rectangle(test_img, (155, 255), (445, 305), (0, 100, 0), 2)
cv2.putText(test_img, "123A4567", (170, 295),
            cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 0, 0), 3)

results, elapsed = lpr.process(test_img)
print(f"처리 시간: {elapsed*1000:.1f}ms")
for r in results:
    print(f"검출: {r['bbox']}, OCR: '{r['final_text']}', 유효: {r['is_valid']}")
```

### 관찰 포인트
- 각 단계(검출/크롭/전처리/OCR/후처리)가 순서대로 실행되는가?
- 전체 처리 시간 중 어느 단계가 가장 오래 걸리는가?

## 실습 2: 오검출 필터링 (20분)

1. 오검출을 걸러내는 필터를 추가한다:

```python
def filter_detections(self, results):
    """오검출 필터링"""
    filtered = []
    for r in results:
        # 필터 1: 검출 신뢰도 < 0.3이면 제거
        if r['det_confidence'] < 0.3:
            continue

        # 필터 2: OCR 신뢰도 < 0.2이면 제거
        if r['ocr_confidence'] < 0.2:
            continue

        # 필터 3: 텍스트 길이가 너무 짧거나 긴 경우
        text_len = len(r['final_text'])
        if text_len < 4 or text_len > 10:
            continue

        # 필터 4: 바운딩 박스 비율 (번호판은 가로가 세로보다 긴 직사각형)
        x1, y1, x2, y2 = r['bbox']
        w = x2 - x1
        h = y2 - y1
        aspect_ratio = w / max(h, 1)
        if aspect_ratio < 1.5 or aspect_ratio > 8.0:
            continue

        filtered.append(r)

    return filtered

# LPRPipeline에 메서드 추가
LPRPipeline.filter_detections = filter_detections

# 필터링 테스트
raw_results, _ = lpr.process(test_img)
filtered_results = lpr.filter_detections(raw_results)
print(f"필터링 전: {len(raw_results)}개 -> 후: {len(filtered_results)}개")
```

### 관찰 포인트
- 바운딩 박스 종횡비 필터가 오검출을 효과적으로 걸러내는가?
- 필터 조건을 너무 엄격하게 하면 정상 검출도 걸러질 위험이 있는가?

## 실습 3: SQLite 데이터베이스 저장 (20분)

1. 검출 결과를 DB에 저장한다:

```python
import sqlite3
from datetime import datetime

def init_database(db_path="lpr_project/outputs/lpr_results.db"):
    """데이터베이스 초기화"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS detections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            image_path TEXT,
            plate_text TEXT,
            is_valid INTEGER,
            det_confidence REAL,
            ocr_confidence REAL,
            bbox_x1 INTEGER, bbox_y1 INTEGER,
            bbox_x2 INTEGER, bbox_y2 INTEGER
        )
    ''')
    conn.commit()
    return conn

def save_result(conn, image_path, result):
    """검출 결과를 DB에 저장"""
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO detections
        (timestamp, image_path, plate_text, is_valid,
         det_confidence, ocr_confidence,
         bbox_x1, bbox_y1, bbox_x2, bbox_y2)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        datetime.now().isoformat(),
        image_path,
        result['final_text'],
        int(result['is_valid']),
        result['det_confidence'],
        result['ocr_confidence'],
        *result['bbox']
    ))
    conn.commit()

# DB 초기화 및 저장 테스트
import os
os.makedirs("lpr_project/outputs", exist_ok=True)
conn = init_database()

# 결과 저장
for r in filtered_results:
    save_result(conn, "test_image.jpg", r)

# 저장된 결과 확인
cursor = conn.cursor()
cursor.execute("SELECT * FROM detections")
rows = cursor.fetchall()
print(f"\n=== DB 저장 결과 ({len(rows)}건) ===")
for row in rows:
    print(f"  ID:{row[0]}, 시간:{row[1][:19]}, 번호:{row[3]}, 유효:{row[4]}")

conn.close()
```

### 관찰 포인트
- 이미지 경로와 함께 저장하면 나중에 결과를 추적할 수 있는가?
- timestamp를 기록하면 시간대별 통계를 낼 수 있는가?

## 과제

### 제출물: "LPR 통합 파이프라인 테스트 보고서"

```markdown
# Day 14 과제: LPR 파이프라인 통합

## 1. 파이프라인 성능 측정
- 테스트 이미지 수:
- 평균 처리 시간:
- 전체 정확도 (검출 + OCR):

## 2. 단계별 소요 시간
| 단계        | 평균 시간(ms) | 비율(%) |
|------------|--------------|---------|
| 검출(YOLO) |              |         |
| 크롭       |              |         |
| 전처리     |              |         |
| OCR        |              |         |
| 후처리     |              |         |

## 3. 필터링 효과
- 필터링 전 결과 수:
- 필터링 후 결과 수:
- 제거된 오검출 사례:
```

## 강사 참고 사항
- 이 단계에서 가장 중요한 것은 "각 모듈이 연결되어 동작하는 경험"이다
- 실제 차량 이미지가 없으면 시뮬레이션 이미지로 진행해도 된다
- Day 15에서 웹 서비스로 확장하므로, 파이프라인이 함수/클래스로 깔끔하게 정리되어야 한다
