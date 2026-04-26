# Day 15: 실시간 LPR + 웹 서비스 — "API로 번호판 인식을 서비스한다"

## 학습 목표
- FastAPI로 LPR REST API 서버를 구축한다
- POST /api/lpr 엔드포인트를 구현하여 이미지를 받아 번호판을 인식한다
- 간단한 웹 UI를 만들어 사용자가 이미지를 업로드할 수 있게 한다
- 인식 결과를 JSON 응답과 DB에 동시에 저장한다

## 준비물
- Google Colab 또는 로컬 Python 환경
- pip install fastapi uvicorn python-multipart
- Day 14 LPR 파이프라인 클래스

## 실습 1: FastAPI 서버 구축 (40분)

1. FastAPI 앱을 작성한다:

```python
# lpr_project/src/app.py

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import cv2
import numpy as np
import sqlite3
from datetime import datetime
import os
import json

app = FastAPI(title="LPR API", version="1.0")

# LPR 파이프라인 (Day 14 코드 재사용)
# 실제로는 import로 가져옴
from ultralytics import YOLO
import easyocr
import re

class LPRService:
    def __init__(self):
        self.detector = YOLO("yolov8n.pt")
        self.reader = easyocr.Reader(['ko', 'en'], gpu=False)
        self.plate_patterns = [
            r'^\d{3}[가-힣]\d{4}$',
            r'^\d{2}[가-힣]\d{4}$',
        ]

    def process_image(self, image_bytes):
        """바이트 이미지를 받아 LPR 수행"""
        nparr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if image is None:
            return {"error": "이미지 디코딩 실패"}

        # 검출
        det_results = self.detector(image, verbose=False, conf=0.3)
        plates = []

        for box in det_results[0].boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
            det_conf = float(box.conf)

            # 크롭 + 전처리
            cropped = image[max(0,y1):y2, max(0,x1):x2]
            if cropped.size == 0:
                continue

            gray = cv2.cvtColor(cropped, cv2.COLOR_BGR2GRAY)
            _, binary = cv2.threshold(gray, 0, 255,
                                       cv2.THRESH_BINARY + cv2.THRESH_OTSU)

            # OCR
            ocr_results = self.reader.readtext(binary, detail=1)
            if ocr_results:
                best = max(ocr_results, key=lambda x: x[2])
                raw_text, ocr_conf = best[1], float(best[2])
            else:
                raw_text, ocr_conf = "", 0.0

            # 후처리
            cleaned = re.sub(r'[^0-9가-힣]', '', raw_text)
            is_valid = any(re.match(p, cleaned) for p in self.plate_patterns)

            plates.append({
                "bbox": [x1, y1, x2, y2],
                "plate_text": cleaned,
                "raw_text": raw_text,
                "det_confidence": round(det_conf, 4),
                "ocr_confidence": round(ocr_conf, 4),
                "is_valid": is_valid,
            })

        return {
            "count": len(plates),
            "plates": plates,
            "timestamp": datetime.now().isoformat(),
        }

# 서비스 인스턴스
lpr_service = LPRService()
```

2. API 엔드포인트를 정의한다:

```python
@app.post("/api/lpr")
async def recognize_plate(file: UploadFile = File(...)):
    """이미지를 업로드하면 번호판 인식 결과를 반환"""
    contents = await file.read()

    # LPR 처리
    result = lpr_service.process_image(contents)

    # DB 저장 (옵션)
    save_to_db(file.filename, result)

    return JSONResponse(content=result)


@app.get("/api/history")
async def get_history(limit: int = 20):
    """최근 인식 기록 조회"""
    conn = sqlite3.connect("lpr_results.db")
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM detections ORDER BY id DESC LIMIT ?", (limit,))
    rows = cursor.fetchall()
    conn.close()

    history = []
    for row in rows:
        history.append({
            "id": row[0],
            "timestamp": row[1],
            "plate_text": row[3],
            "is_valid": bool(row[4]),
        })
    return {"history": history}


def save_to_db(filename, result):
    """결과를 SQLite에 저장"""
    conn = sqlite3.connect("lpr_results.db")
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS detections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT, filename TEXT, plate_text TEXT,
        is_valid INTEGER, det_conf REAL, ocr_conf REAL
    )''')
    for plate in result.get("plates", []):
        cursor.execute(
            "INSERT INTO detections VALUES (NULL, ?, ?, ?, ?, ?, ?)",
            (result["timestamp"], filename, plate["plate_text"],
             int(plate["is_valid"]), plate["det_confidence"],
             plate["ocr_confidence"])
        )
    conn.commit()
    conn.close()
```

### 관찰 포인트
- POST 엔드포인트가 이미지 파일을 바이트로 받아 처리하는가?
- 응답 형식(JSON)이 프론트엔드에서 사용하기 편한 구조인가?

## 실습 2: 웹 UI 구현 (20분)

1. HTML 업로드 페이지를 작성한다:

```python
@app.get("/", response_class=HTMLResponse)
async def home():
    return """
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>LPR - 번호판 인식 시스템</title>
        <style>
            body { font-family: 'Malgun Gothic', sans-serif; max-width: 800px;
                   margin: 0 auto; padding: 20px; background: #f5f5f5; }
            h1 { color: #333; text-align: center; }
            .upload-area { border: 2px dashed #999; padding: 40px;
                          text-align: center; margin: 20px 0; background: white;
                          border-radius: 8px; }
            .result { background: white; padding: 20px; margin: 10px 0;
                     border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .valid { color: green; font-weight: bold; }
            .invalid { color: red; font-weight: bold; }
            button { background: #4CAF50; color: white; padding: 12px 24px;
                    border: none; border-radius: 4px; cursor: pointer;
                    font-size: 16px; }
            button:hover { background: #45a049; }
            #preview { max-width: 100%; margin: 10px 0; }
        </style>
    </head>
    <body>
        <h1>LPR 번호판 인식 시스템</h1>
        <div class="upload-area">
            <input type="file" id="imageInput" accept="image/*">
            <br><br>
            <button onclick="uploadImage()">인식 시작</button>
            <br><br>
            <img id="preview" style="display:none;">
        </div>
        <div id="results"></div>

        <script>
        document.getElementById('imageInput').onchange = function(e) {
            const preview = document.getElementById('preview');
            preview.src = URL.createObjectURL(e.target.files[0]);
            preview.style.display = 'block';
        };

        async function uploadImage() {
            const input = document.getElementById('imageInput');
            if (!input.files[0]) { alert('이미지를 선택하세요'); return; }

            const formData = new FormData();
            formData.append('file', input.files[0]);

            const response = await fetch('/api/lpr', {
                method: 'POST', body: formData
            });
            const data = await response.json();

            let html = '<div class="result">';
            html += '<h3>인식 결과 (' + data.count + '개)</h3>';
            for (const plate of data.plates) {
                const cls = plate.is_valid ? 'valid' : 'invalid';
                html += '<p class="' + cls + '">';
                html += '번호: ' + plate.plate_text;
                html += ' (검출: ' + (plate.det_confidence*100).toFixed(1) + '%, ';
                html += 'OCR: ' + (plate.ocr_confidence*100).toFixed(1) + '%)</p>';
            }
            html += '<p><small>' + data.timestamp + '</small></p>';
            html += '</div>';

            document.getElementById('results').innerHTML = html;
        }
        </script>
    </body>
    </html>
    """
```

### 관찰 포인트
- 이미지 미리보기 기능이 동작하는가?
- API 응답을 파싱하여 결과를 표시할 수 있는가?

## 실습 3: 서버 실행 및 테스트 (20분)

1. 서버를 실행한다:

```python
# Colab에서 실행 (ngrok 터널링)
!pip install pyngrok -q
from pyngrok import ngrok

# ngrok 터널 생성
public_url = ngrok.connect(8000)
print(f"공개 URL: {public_url}")

# 서버 실행 (백그라운드)
import uvicorn
import threading

def run_server():
    uvicorn.run(app, host="0.0.0.0", port=8000)

server_thread = threading.Thread(target=run_server, daemon=True)
server_thread.start()
print("서버 시작됨: http://localhost:8000")
```

2. curl로 API를 테스트한다:

```python
import requests

# API 테스트
# 테스트 이미지를 저장하고 전송
test_img = np.ones((400, 600, 3), dtype=np.uint8) * 180
cv2.imwrite("test_plate.jpg", test_img)

with open("test_plate.jpg", "rb") as f:
    response = requests.post("http://localhost:8000/api/lpr",
                             files={"file": ("test.jpg", f, "image/jpeg")})

print(f"상태 코드: {response.status_code}")
print(f"응답: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
```

3. 히스토리 API를 테스트한다:

```python
response = requests.get("http://localhost:8000/api/history?limit=5")
history = response.json()
print(f"최근 기록 {len(history['history'])}건:")
for h in history['history']:
    print(f"  [{h['timestamp'][:19]}] {h['plate_text']} (유효: {h['is_valid']})")
```

### 관찰 포인트
- API 응답 시간이 실용적인 수준(< 2초)인가?
- 여러 이미지를 연속으로 업로드해도 안정적으로 동작하는가?

## 과제

### 제출물: "LPR 웹 서비스 데모 보고서"

```markdown
# Day 15 과제: 실시간 LPR 웹 서비스

## 1. API 명세
| 엔드포인트    | 메서드 | 입력          | 출력           |
|-------------|--------|--------------|----------------|
| /api/lpr    | POST   | 이미지 파일   | 번호판 JSON    |
| /api/history| GET    | limit 파라미터 | 기록 리스트    |

## 2. 테스트 결과
- 테스트 이미지 5장의 API 응답:
- 평균 응답 시간:
- 웹 UI 스크린샷:

## 3. 개선 아이디어
- 동시 요청 처리 (비동기):
- 이미지 용량 제한:
- 인증/보안 추가:
```

## 강사 참고 사항
- Colab에서는 ngrok 무료 플랜 제한(40 연결/분)이 있으므로 주의한다
- 로컬 환경이 있는 수강생은 localhost에서 직접 실행하는 것이 안정적이다
- EasyOCR 초기 로딩이 느리므로 서버 시작 시 미리 로드해야 한다
