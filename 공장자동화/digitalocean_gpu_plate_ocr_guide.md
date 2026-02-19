# DigitalOcean GPU를 활용한 자동차 번호판 인식 프로젝트 가이드

**작성일:** 2026-01-23
**목적:** DigitalOcean GPU Droplet을 활용하여 자동차 번호판 OCR 인식 시스템 구축

---

## 1. 개요

### 1.1 프로젝트 목표

Jetson Nano (1.94초/장)보다 빠른 번호판 인식 속도를 DigitalOcean GPU 서버에서 달성

### 1.2 예상 성능 비교

| 플랫폼 | GPU | 예상 속도 | 비용 |
|:------:|:---:|:---------:|:----:|
| Jetson Nano | 128 CUDA | 1.94초/장 | 전기료 |
| **DO RTX 4000 Ada** | 6,144 CUDA | **~0.2초/장** | $0.76/hr |
| DO RTX 6000 Ada | 18,176 CUDA | ~0.1초/장 | $1.57/hr |
| DO H100 | 16,896 CUDA | ~0.05초/장 | $3.39/hr |

> RTX 4000 Ada는 Jetson Nano 대비 약 48배 CUDA 코어 → 예상 10x 이상 속도 향상

---

## 2. DigitalOcean GPU Droplet 선택 가이드

### 2.1 권장 Droplet (비용 대비 성능)

| 용도 | GPU | 가격 | GPU 메모리 | vCPU | RAM | 권장 |
|:-----|:----|-----:|:----------:|:----:|:---:|:----:|
| **개발/테스트** | RTX 4000 Ada | $0.76/hr | 20 GB | 8 | 32 GiB | **추천** |
| 프로덕션 (소규모) | RTX 6000 Ada | $1.57/hr | 48 GB | 8 | 64 GiB | |
| 프로덕션 (대규모) | L40S | $1.57/hr | 48 GB | 8 | 64 GiB | |
| AI 학습/추론 | H100 | $3.39/hr | 80 GB | 20 | 240 GiB | |

### 2.2 비용 계산 (RTX 4000 Ada 기준)

| 사용 시간 | 비용 | 처리량 (0.2초/장 기준) |
|:----------|-----:|----------------------:|
| 1시간 | $0.76 | ~18,000장 |
| 8시간 (하루 작업) | $6.08 | ~144,000장 |
| 1개월 (24x30) | $547.20 | 상시 서비스 |

### 2.3 사용 가능 데이터센터

- NYC2 (뉴욕)
- TOR1 (토론토)
- ATL1 (애틀랜타)
- AMS3 (암스테르담)

> **한국 사용자**: AMS3 또는 NYC2 권장 (아시아 리전 미지원)

---

## 3. GPU Droplet 생성 및 설정

### 3.1 Droplet 생성

#### 1) DigitalOcean 콘솔 접속

```
https://cloud.digitalocean.com/droplets
```

#### 2) "Create Droplet" 클릭

#### 3) GPU 탭 선택

- **Region**: NYC2 또는 AMS3
- **GPU Type**: NVIDIA RTX 4000 Ada (개발용) 또는 RTX 6000 Ada (프로덕션)
- **OS Image**: Ubuntu 22.04 (CUDA pre-installed)

#### 4) 인증 방식

```bash
# SSH Key 추가 (기존 키 사용)
cat ~/.ssh/id_rsa.pub
# 또는 기존 uttec-first-ec2.pem 사용
```

#### 5) Droplet 이름 설정

```
plate-ocr-gpu
```

### 3.2 SSH 접속 설정

#### Windows SSH config 추가

```bash
# C:\Users\{사용자명}\.ssh\config 에 추가

Host do-gpu
    HostName {GPU_DROPLET_IP}
    User root
    IdentityFile ~/.ssh/uttec-first-ec2.pem
    StrictHostKeyChecking no
```

#### 접속 테스트

```bash
ssh do-gpu
```

---

## 4. GPU 서버 환경 설정

### 4.1 기본 패키지 업데이트

```bash
# SSH 접속 후
ssh do-gpu

# 시스템 업데이트
apt update && apt upgrade -y
```

### 4.2 CUDA 확인 (사전 설치됨)

```bash
# CUDA 버전 확인
nvcc --version

# GPU 상태 확인
nvidia-smi
```

예상 출력:
```
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 535.xx       Driver Version: 535.xx       CUDA Version: 12.2    |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  NVIDIA RTX 4000 Ada   On | 00000000:00:05.0 Off |                  Off |
| 30%   35C    P8    15W / 130W |      0MiB / 20480MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+
```

### 4.3 Python 환경 설정

```bash
# Python 가상환경 생성
python3 -m venv /opt/plate-ocr
source /opt/plate-ocr/bin/activate

# pip 업그레이드
pip install --upgrade pip
```

### 4.4 필수 패키지 설치

```bash
# PyTorch (CUDA 12.x)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# EasyOCR 및 의존성
pip install easyocr opencv-python-headless pillow numpy

# 웹 서비스용 (선택)
pip install flask gunicorn
```

### 4.5 cuDNN 최적화 확인

```python
# Python에서 확인
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
print(f"GPU: {torch.cuda.get_device_name(0)}")
print(f"cuDNN: {torch.backends.cudnn.version()}")
```

---

## 5. 번호판 인식 코드 배포

### 5.1 프로젝트 구조

```
/opt/plate-ocr/
├── app/
│   ├── __init__.py
│   ├── ocr_engine.py      # OCR 엔진 (EasyOCR)
│   ├── plate_detector.py  # 번호판 영역 검출
│   ├── utils.py           # 유틸리티 함수
│   └── api.py             # REST API (Flask)
├── data/
│   └── test_images/       # 테스트 이미지
├── scripts/
│   ├── benchmark.py       # 벤치마크 스크립트
│   └── test_single.py     # 단일 이미지 테스트
├── requirements.txt
└── README.md
```

### 5.2 핵심 코드 (ocr_engine.py)

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
DigitalOcean GPU용 번호판 인식 엔진
- RTX 4000 Ada / RTX 6000 Ada / H100 최적화
"""

import os
import re
import time
import cv2
import numpy as np
import easyocr
import torch
import torch.backends.cudnn as cudnn

# GPU 최적화 설정
cudnn.benchmark = True
cudnn.deterministic = False
torch.backends.cuda.matmul.allow_tf32 = True  # RTX 40xx 이상

OPTIMAL_SIZE = 640  # 고성능 GPU는 큰 이미지 가능


class PlateOCREngine:
    """번호판 OCR 엔진"""

    def __init__(self, gpu=True):
        """
        Args:
            gpu: GPU 사용 여부 (기본: True)
        """
        self.gpu = gpu and torch.cuda.is_available()
        self.reader = None
        self._load_model()

    def _load_model(self):
        """EasyOCR 모델 로딩"""
        print(f"[OCR Engine] 모델 로딩 중... (GPU: {self.gpu})")
        start = time.time()
        self.reader = easyocr.Reader(
            ['ko', 'en'],
            gpu=self.gpu,
            model_storage_directory='/opt/plate-ocr/models'
        )
        print(f"[OCR Engine] 로딩 완료: {time.time()-start:.2f}초")

    def extract_plate_number(self, text):
        """번호판 번호 추출 (보정 포함)"""
        cleaned = re.sub(r'[^0-9가-힣]', '', text)

        # 표준 형식: 123가4567 또는 12가3456
        match = re.search(r'(\d{2,3})([가-힣])(\d{4})', cleaned)
        if match:
            return f"{match.group(1)}{match.group(2)}{match.group(3)}", True

        # '오' ↔ '2' 오인식 보정
        digits = re.sub(r'[^0-9]', '', cleaned)
        if len(digits) == 7:  # 9927890 → 99오7890
            return f"{digits[:2]}오{digits[3:]}", True
        if len(digits) == 8:  # 12327890 → 123오7890
            return f"{digits[:3]}오{digits[4:]}", True

        return cleaned, False

    def detect_plate_regions(self, img):
        """OpenCV 기반 번호판 영역 검출"""
        h, w = img.shape[:2]
        candidates = []

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur = cv2.bilateralFilter(gray, 11, 17, 17)
        edges = cv2.Canny(blur, 30, 200)

        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
        edges = cv2.dilate(edges, kernel, iterations=1)

        contours, _ = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        for contour in contours:
            peri = cv2.arcLength(contour, True)
            approx = cv2.approxPolyDP(contour, 0.02 * peri, True)

            if len(approx) >= 4:
                x, y, cw, ch = cv2.boundingRect(approx)
                aspect = cw / ch if ch > 0 else 0
                area_ratio = (cw * ch) / (w * h)

                if (1.5 <= aspect <= 6.0 and
                    0.01 <= area_ratio <= 0.3 and
                    cw > 50 and ch > 15):
                    candidates.append((x, y, cw, ch, cw * ch))

        candidates.sort(key=lambda c: c[4], reverse=True)
        return [(c[0], c[1], c[2], c[3]) for c in candidates[:3]]

    def recognize(self, img, use_detection=True):
        """
        번호판 인식

        Args:
            img: OpenCV 이미지 (BGR)
            use_detection: 영역 검출 사용 여부

        Returns:
            tuple: (번호판 텍스트, 신뢰도, 처리시간)
        """
        start = time.time()
        best_plate = ""
        best_conf = 0

        if use_detection:
            # 방법 1: 영역 검출 후 OCR
            regions = self.detect_plate_regions(img)
            for region in regions[:2]:
                try:
                    x, y, w, h = region
                    padding = 10
                    ih, iw = img.shape[:2]
                    x1, y1 = max(0, x-padding), max(0, y-padding)
                    x2, y2 = min(iw, x+w+padding), min(ih, y+h+padding)

                    cropped = img[y1:y2, x1:x2]
                    result = self.reader.readtext(cropped)

                    for r in result:
                        plate, is_valid = self.extract_plate_number(r[1])
                        if is_valid and r[2] > best_conf:
                            best_plate = plate
                            best_conf = r[2]
                except:
                    continue

        # 방법 2: 전체 이미지 (폴백)
        if not best_plate:
            img_resized = cv2.resize(img, (OPTIMAL_SIZE, OPTIMAL_SIZE))
            result = self.reader.readtext(img_resized)

            for r in result:
                plate, is_valid = self.extract_plate_number(r[1])
                if is_valid and r[2] > best_conf:
                    best_plate = plate
                    best_conf = r[2]

        elapsed = time.time() - start
        return best_plate, best_conf, elapsed


# 싱글톤 인스턴스
_engine = None

def get_engine():
    """OCR 엔진 싱글톤 인스턴스"""
    global _engine
    if _engine is None:
        _engine = PlateOCREngine(gpu=True)
    return _engine


if __name__ == '__main__':
    # 테스트
    engine = get_engine()

    # 테스트 이미지
    test_img = cv2.imread('/opt/plate-ocr/data/test_images/plate_01.png')
    plate, conf, elapsed = engine.recognize(test_img)

    print(f"번호판: {plate}")
    print(f"신뢰도: {conf:.2f}")
    print(f"처리시간: {elapsed:.3f}초")
```

### 5.3 REST API (api.py)

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
번호판 인식 REST API
"""

import os
import cv2
import numpy as np
from flask import Flask, request, jsonify
from ocr_engine import get_engine

app = Flask(__name__)
engine = get_engine()


@app.route('/health', methods=['GET'])
def health():
    """헬스체크"""
    return jsonify({
        'status': 'ok',
        'gpu': engine.gpu,
        'model': 'EasyOCR'
    })


@app.route('/recognize', methods=['POST'])
def recognize():
    """
    번호판 인식 API

    Request:
        - file: 이미지 파일 (multipart/form-data)
        또는
        - image: base64 인코딩된 이미지 (JSON)

    Response:
        {
            "plate": "12가3456",
            "confidence": 0.95,
            "processing_time": 0.15
        }
    """
    try:
        # 파일 업로드 방식
        if 'file' in request.files:
            file = request.files['file']
            img_array = np.frombuffer(file.read(), np.uint8)
            img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        # Base64 방식
        elif request.is_json and 'image' in request.json:
            import base64
            img_data = base64.b64decode(request.json['image'])
            img_array = np.frombuffer(img_data, np.uint8)
            img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        else:
            return jsonify({'error': 'No image provided'}), 400

        # 번호판 인식
        plate, conf, elapsed = engine.recognize(img)

        return jsonify({
            'plate': plate or None,
            'confidence': round(conf, 3),
            'processing_time': round(elapsed, 3)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/batch', methods=['POST'])
def batch_recognize():
    """
    배치 인식 API (여러 이미지 동시 처리)

    Request:
        - files: 이미지 파일 목록 (multipart/form-data)

    Response:
        {
            "results": [
                {"filename": "img1.jpg", "plate": "12가3456", ...},
                ...
            ],
            "total_time": 1.23
        }
    """
    import time

    if 'files' not in request.files:
        return jsonify({'error': 'No files provided'}), 400

    files = request.files.getlist('files')
    results = []
    total_start = time.time()

    for file in files:
        img_array = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        plate, conf, elapsed = engine.recognize(img)

        results.append({
            'filename': file.filename,
            'plate': plate or None,
            'confidence': round(conf, 3),
            'processing_time': round(elapsed, 3)
        })

    return jsonify({
        'results': results,
        'total_time': round(time.time() - total_start, 3)
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
```

### 5.4 코드 배포

```bash
# 로컬에서 서버로 코드 전송
scp -r ./plate-ocr/* do-gpu:/opt/plate-ocr/

# 또는 Git 사용
ssh do-gpu
cd /opt
git clone https://github.com/yourrepo/plate-ocr.git
```

---

## 6. 서비스 실행 및 테스트

### 6.1 단일 이미지 테스트

```bash
ssh do-gpu
source /opt/plate-ocr/bin/activate
cd /opt/plate-ocr/app

python ocr_engine.py
```

### 6.2 벤치마크 실행

```bash
# benchmark.py
python scripts/benchmark.py --images /opt/plate-ocr/data/test_images/
```

예상 결과 (RTX 4000 Ada):
```
============================================================
  번호판 인식 벤치마크 (DigitalOcean GPU)
============================================================
GPU: NVIDIA RTX 4000 Ada Generation
CUDA: 12.2
cuDNN: 8.9.x

[1] 모델 로딩: 2.15초
[2] 워밍업: 0.35초

[3] 벤치마크 (10개 이미지)
------------------------------------------------------------
  plate_01.png: 12가3456     [O] 0.18s
  plate_02.png: 45하9283     [O] 0.15s
  ...
  plate_10.png: 91모7392     [O] 0.21s

============================================================
  결과 요약
============================================================
  인식률: 9/10 (90%)
  평균 시간: 0.19초
  기존 대비 속도: 10.2x (Jetson Nano 1.94초 기준)
```

### 6.3 API 서버 실행

```bash
# 개발 모드
python api.py

# 프로덕션 모드 (Gunicorn)
gunicorn -w 1 -b 0.0.0.0:5000 api:app
```

### 6.4 API 테스트

```bash
# 헬스체크
curl http://{GPU_IP}:5000/health

# 이미지 업로드
curl -X POST -F "file=@plate_01.png" http://{GPU_IP}:5000/recognize

# 배치 처리
curl -X POST \
  -F "files=@plate_01.png" \
  -F "files=@plate_02.png" \
  -F "files=@plate_03.png" \
  http://{GPU_IP}:5000/batch
```

---

## 7. 프로덕션 배포

### 7.1 Systemd 서비스 등록

```bash
# /etc/systemd/system/plate-ocr.service
sudo tee /etc/systemd/system/plate-ocr.service << 'EOF'
[Unit]
Description=Plate OCR API Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/plate-ocr/app
Environment="PATH=/opt/plate-ocr/bin"
ExecStart=/opt/plate-ocr/bin/gunicorn -w 1 -b 0.0.0.0:5000 api:app
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# 서비스 활성화
sudo systemctl daemon-reload
sudo systemctl enable plate-ocr
sudo systemctl start plate-ocr
sudo systemctl status plate-ocr
```

### 7.2 Nginx 리버스 프록시 (선택)

```bash
# Nginx 설치
apt install nginx -y

# 설정 파일
sudo tee /etc/nginx/sites-available/plate-ocr << 'EOF'
server {
    listen 80;
    server_name plate-ocr.example.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # 파일 업로드 크기 제한
        client_max_body_size 10M;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/plate-ocr /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 7.3 SSL 인증서 (Let's Encrypt)

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d plate-ocr.example.com
```

---

## 8. 비용 최적화 전략

### 8.1 사용량 기반 운영

| 사용 패턴 | 전략 | 예상 비용 |
|:----------|:-----|----------:|
| 간헐적 사용 | 필요 시 생성/삭제 | 사용시간만 과금 |
| 업무 시간 (8h/day) | 스케줄링 자동화 | $0.76 × 8 × 22 = $134/월 |
| 24시간 서비스 | Reserved 요금제 | 협상 필요 |

### 8.2 자동 시작/중지 스크립트

```bash
# start_gpu.sh - GPU Droplet 시작
#!/bin/bash
doctl compute droplet-action power-on {DROPLET_ID}
echo "GPU Droplet starting..."
sleep 60
ssh do-gpu "systemctl start plate-ocr"

# stop_gpu.sh - GPU Droplet 중지
#!/bin/bash
ssh do-gpu "systemctl stop plate-ocr"
doctl compute droplet-action power-off {DROPLET_ID}
echo "GPU Droplet stopped."
```

### 8.3 Cron 스케줄링 (업무시간만 운영)

```bash
# 평일 09:00 시작, 18:00 중지
0 9 * * 1-5 /opt/scripts/start_gpu.sh
0 18 * * 1-5 /opt/scripts/stop_gpu.sh
```

---

## 9. 모니터링 및 로깅

### 9.1 GPU 모니터링

```bash
# 실시간 GPU 상태
watch -n 1 nvidia-smi

# GPU 사용량 로깅
nvidia-smi --query-gpu=timestamp,utilization.gpu,memory.used,memory.total --format=csv -l 5 >> /var/log/gpu_usage.csv
```

### 9.2 API 로깅

```python
# api.py에 로깅 추가
import logging

logging.basicConfig(
    filename='/var/log/plate-ocr.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

@app.after_request
def log_request(response):
    logging.info(f"{request.method} {request.path} - {response.status_code}")
    return response
```

---

## 10. 기존 환경과 비교

### 10.1 성능 비교 예상

| 항목 | Jetson Nano | DO RTX 4000 Ada | 개선 |
|:-----|------------:|----------------:|-----:|
| **CUDA 코어** | 128 | 6,144 | 48x |
| **GPU 메모리** | 4 GB | 20 GB | 5x |
| **모델 로딩** | ~30초 | ~2초 | 15x |
| **추론 속도** | 1.94초/장 | ~0.2초/장 | **10x** |
| **배치 처리** | 제한적 | 가능 (대용량) | - |

### 10.2 사용 시나리오 비교

| 시나리오 | Jetson Nano | DigitalOcean GPU |
|:---------|:-----------:|:----------------:|
| 엣지 디바이스 (현장) | **적합** | 부적합 |
| 실시간 스트리밍 | 제한적 | **적합** |
| 대량 배치 처리 | 부적합 | **적합** |
| 24시간 서비스 | 전기료 낮음 | 월 $500+ |
| 개발/테스트 | 느림 | **빠름** |

---

## 11. 체크리스트

### 11.1 초기 설정

- [ ] DigitalOcean 계정 생성 및 결제 설정
- [ ] GPU Droplet 생성 (RTX 4000 Ada 권장)
- [ ] SSH 접속 설정 (`~/.ssh/config`)
- [ ] CUDA/cuDNN 확인 (`nvidia-smi`)

### 11.2 환경 구성

- [ ] Python 가상환경 생성
- [ ] PyTorch (CUDA 12.x) 설치
- [ ] EasyOCR 설치
- [ ] 테스트 이미지 업로드

### 11.3 코드 배포

- [ ] OCR 엔진 코드 배포
- [ ] 벤치마크 테스트 실행
- [ ] API 서버 실행 테스트

### 11.4 프로덕션

- [ ] Systemd 서비스 등록
- [ ] Nginx 리버스 프록시 설정
- [ ] SSL 인증서 발급
- [ ] 모니터링 설정

---

## 12. 문제 해결

### 12.1 CUDA 오류

```bash
# CUDA 버전 불일치
pip uninstall torch
pip install torch --index-url https://download.pytorch.org/whl/cu121
```

### 12.2 메모리 부족

```bash
# GPU 메모리 확인
nvidia-smi

# 배치 크기 줄이기 또는 이미지 크기 조정
OPTIMAL_SIZE = 480  # 640 → 480
```

### 12.3 느린 모델 로딩

```python
# 모델 캐시 디렉토리 설정
reader = easyocr.Reader(
    ['ko', 'en'],
    model_storage_directory='/opt/plate-ocr/models'
)
```

---

## 13. 참고 자료

### 13.1 관련 문서

| 문서 | 위치 |
|------|------|
| 번호판 인식 성능비교 리포트 | `aiTest/번호판_인식_성능비교_리포트.md` |
| 최적화 코드 (Jetson Nano) | `aiTest/plate_ocr_optimized_final.py` |
| DigitalOcean 서버 정보 | `pem/digitalocean_server_info.md` |
| SSH 설정 가이드 | `pem/windows_ssh_setup_guide.md` |

### 13.2 외부 링크

- [DigitalOcean GPU Droplets](https://www.digitalocean.com/products/gradient/gpu-droplets)
- [EasyOCR GitHub](https://github.com/JaidedAI/EasyOCR)
- [PyTorch CUDA 설치](https://pytorch.org/get-started/locally/)

---

*작성일: 2026-01-23*
*DigitalOcean GPU를 활용한 번호판 인식 프로젝트 가이드*
