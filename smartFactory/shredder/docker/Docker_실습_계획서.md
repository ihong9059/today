# Docker 실습 계획서 — 슈레더 AI 시스템용

> **목적**: 슈레더 Edge AI 시스템에서 사용할 Docker 기반 컨테이너 배포를 실습
> **대상**: Docker 초보자 ~ 중급자
> **소요 시간**: 약 4~6시간 (단계별 진행)
> **환경**: Windows 11 (Docker Desktop) → 추후 Jetson Orin NX (JetPack) 적용

---

## 실습 전체 구조

```
┌─────────────────────────────────────────────────────────────┐
│                Docker 실습 5단계                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Step 1: Docker 기초 (30분)                                   │
│  └─ 설치, 기본 명령어, 컨테이너 생명주기                     │
│                                                               │
│  Step 2: Dockerfile 작성 (1시간)                              │
│  └─ Python AI 모델을 컨테이너로 패키징                       │
│                                                               │
│  Step 3: Docker Compose (1시간)                               │
│  └─ 다중 컨테이너 (AI + DB + 대시보드) 연동                 │
│                                                               │
│  Step 4: 슈레더 AI 모의 시스템 (1.5시간)                      │
│  └─ 센서 데이터 생성 → AI 추론 → 대시보드 표시              │
│                                                               │
│  Step 5: Jetson 배포 준비 (1시간)                             │
│  └─ ARM64 빌드, NVIDIA Container Runtime, 최적화             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Step 1: Docker 기초 (30분)

### 1.1 Docker Desktop 설치 확인

```bash
# 버전 확인
docker --version
docker compose version

# 정상 작동 확인
docker run hello-world
```

### 1.2 핵심 명령어 실습

```bash
# 이미지 관련
docker pull python:3.11-slim          # 이미지 다운로드
docker images                          # 이미지 목록

# 컨테이너 실행
docker run -it python:3.11-slim bash   # 대화형 실행
docker run -d --name test-web -p 8080:80 nginx  # 백그라운드 실행

# 컨테이너 관리
docker ps                              # 실행 중 컨테이너
docker ps -a                           # 전체 컨테이너
docker logs test-web                   # 로그 확인
docker stop test-web                   # 정지
docker rm test-web                     # 삭제

# 정리
docker system prune                    # 미사용 리소스 정리
```

### 1.3 핵심 개념 정리

| 개념 | 설명 | 비유 |
|------|------|------|
| **Image** | 실행 환경의 스냅샷 (읽기 전용) | 설계 도면 |
| **Container** | Image를 실행한 인스턴스 | 도면으로 지은 건물 |
| **Dockerfile** | Image를 만드는 스크립트 | 설계 지침서 |
| **Volume** | 컨테이너 외부 데이터 저장소 | 외장 하드 |
| **Port Mapping** | 호스트↔컨테이너 포트 연결 | 건물 출입구 연결 |

---

## Step 2: Dockerfile 작성 — AI 모델 컨테이너 (1시간)

### 2.1 프로젝트 구조

```
docker/
├── step2_ai_model/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── model.py              # 간단한 이상 탐지 모델
│   └── test_data.json        # 테스트 센서 데이터
```

### 2.2 Dockerfile

```dockerfile
# step2_ai_model/Dockerfile

# 1. 베이스 이미지
FROM python:3.11-slim

# 2. 작업 디렉토리
WORKDIR /app

# 3. 의존성 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. 소스 코드 복사
COPY . .

# 5. 실행
CMD ["python", "model.py"]
```

### 2.3 requirements.txt

```
numpy==1.26.4
scikit-learn==1.4.2
```

### 2.4 model.py — 간단한 베어링 이상 탐지

```python
"""
슈레더 베어링 이상 탐지 — Docker 실습용 간단 버전
실제 시스템: LSTM Autoencoder → 여기서는 Isolation Forest로 간소화
"""
import numpy as np
from sklearn.ensemble import IsolationForest
import json, time

def generate_sensor_data(n_samples=100, anomaly_ratio=0.05):
    """슈레더 진동 센서(VIB-A) 모의 데이터 생성"""
    n_normal = int(n_samples * (1 - anomaly_ratio))
    n_anomaly = n_samples - n_normal

    # 정상: 진동 RMS 2~5 mm/s
    normal = np.random.normal(loc=3.5, scale=0.5, size=(n_normal, 3))
    # 이상: 진동 RMS 8~15 mm/s (베어링 손상)
    anomaly = np.random.normal(loc=12.0, scale=2.0, size=(n_anomaly, 3))

    data = np.vstack([normal, anomaly])
    labels = np.array([0]*n_normal + [1]*n_anomaly)

    return data, labels

def main():
    print("=" * 50)
    print("  슈레더 베어링 이상 탐지 AI (Docker 실습)")
    print("  센서: VIB-A (3축 진동 가속도계)")
    print("=" * 50)

    # 1. 학습 데이터 생성 (정상 데이터만)
    train_data, _ = generate_sensor_data(500, anomaly_ratio=0.0)
    print(f"\n[학습] 정상 데이터 {len(train_data)}건으로 모델 학습...")

    # 2. 모델 학습
    model = IsolationForest(contamination=0.05, random_state=42)
    model.fit(train_data)
    print("[학습] 완료!")

    # 3. 실시간 추론 시뮬레이션
    print("\n[추론] 실시간 센서 데이터 분석 시작...")
    print("-" * 50)

    test_data, true_labels = generate_sensor_data(20, anomaly_ratio=0.15)

    for i, (sample, label) in enumerate(zip(test_data, true_labels)):
        prediction = model.predict([sample])[0]
        score = model.score_samples([sample])[0]
        status = "정상" if prediction == 1 else "이상"
        icon = "✅" if prediction == 1 else "🚨"

        print(f"  [{i+1:02d}] VIB: [{sample[0]:.1f}, {sample[1]:.1f}, {sample[2]:.1f}] "
              f"→ {icon} {status} (score: {score:.3f})")
        time.sleep(0.3)

    print("-" * 50)
    print("[완료] 이상 탐지 시뮬레이션 종료")

if __name__ == "__main__":
    main()
```

### 2.5 빌드 및 실행

```bash
cd step2_ai_model

# 이미지 빌드
docker build -t shredder-ai:v1 .

# 컨테이너 실행
docker run --rm shredder-ai:v1

# 이미지 크기 확인
docker images shredder-ai
```

---

## Step 3: Docker Compose — 다중 컨테이너 (1시간)

### 3.1 프로젝트 구조

```
docker/
├── step3_compose/
│   ├── docker-compose.yml
│   ├── ai-service/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   └── app.py            # FastAPI AI 추론 서비스
│   └── dashboard/
│       ├── Dockerfile
│       └── index.html         # 간단한 대시보드
```

### 3.2 docker-compose.yml

```yaml
# step3_compose/docker-compose.yml
version: '3.8'

services:
  # 1. TimescaleDB (센서 데이터 저장)
  timescaledb:
    image: timescale/timescaledb:latest-pg16
    container_name: shredder-db
    environment:
      POSTGRES_USER: shredder
      POSTGRES_PASSWORD: ai2026
      POSTGRES_DB: sensor_data
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data

  # 2. AI 추론 서비스 (FastAPI)
  ai-service:
    build: ./ai-service
    container_name: shredder-ai
    ports:
      - "8000:8000"
    depends_on:
      - timescaledb
    environment:
      DB_HOST: timescaledb
      DB_PORT: 5432

  # 3. 대시보드 (Nginx)
  dashboard:
    build: ./dashboard
    container_name: shredder-dashboard
    ports:
      - "3000:80"
    depends_on:
      - ai-service

volumes:
  db-data:
```

### 3.3 ai-service/app.py — FastAPI 추론 서버

```python
"""슈레더 AI 추론 API — Docker Compose 실습"""
from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from sklearn.ensemble import IsolationForest

app = FastAPI(title="슈레더 AI 추론 서비스")

# 모델 초기화 (실제로는 학습된 모델 로드)
model = IsolationForest(contamination=0.05, random_state=42)
train_data = np.random.normal(loc=3.5, scale=0.5, size=(500, 3))
model.fit(train_data)

class SensorData(BaseModel):
    vib_x: float
    vib_y: float
    vib_z: float
    sensor_id: str = "VIB-A"

class PredictionResult(BaseModel):
    sensor_id: str
    status: str         # "정상" or "이상"
    anomaly_score: float
    health_score: int    # 0~100

@app.get("/")
def root():
    return {"service": "슈레더 AI 추론", "status": "running"}

@app.get("/health")
def health():
    return {"status": "healthy", "model": "IsolationForest", "sensors": 14}

@app.post("/predict", response_model=PredictionResult)
def predict(data: SensorData):
    sample = np.array([[data.vib_x, data.vib_y, data.vib_z]])
    prediction = model.predict(sample)[0]
    score = model.score_samples(sample)[0]

    status = "정상" if prediction == 1 else "이상"
    health = max(0, min(100, int((score + 0.5) * 100)))

    return PredictionResult(
        sensor_id=data.sensor_id,
        status=status,
        anomaly_score=round(score, 4),
        health_score=health
    )
```

### 3.4 ai-service/Dockerfile

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 3.5 ai-service/requirements.txt

```
fastapi==0.115.0
uvicorn==0.30.0
numpy==1.26.4
scikit-learn==1.4.2
```

### 3.6 실행 및 테스트

```bash
cd step3_compose

# 전체 서비스 시작
docker compose up -d --build

# 상태 확인
docker compose ps

# AI API 테스트 (정상 데이터)
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"vib_x": 3.2, "vib_y": 3.8, "vib_z": 3.5, "sensor_id": "VIB-A"}'

# AI API 테스트 (이상 데이터 — 베어링 손상)
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"vib_x": 12.5, "vib_y": 14.2, "vib_z": 11.8, "sensor_id": "VIB-A"}'

# 대시보드 확인
# 브라우저에서 http://localhost:3000

# 로그 확인
docker compose logs ai-service

# 종료
docker compose down
```

---

## Step 4: 슈레더 AI 모의 시스템 (1.5시간)

### 4.1 구조

Step 3를 확장하여 **센서 시뮬레이터 + AI 추론 + 알림**까지 구현합니다.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ sensor-sim   │────▶│ ai-service   │────▶│ dashboard    │
│ (센서 시뮬)  │     │ (AI 추론)    │     │ (웹 대시보드)│
│ Python       │     │ FastAPI      │     │ Nginx+HTML   │
└──────────────┘     └──────┬───────┘     └──────────────┘
                            │
                     ┌──────▼───────┐
                     │ timescaledb  │
                     │ (데이터 저장)│
                     └──────────────┘
```

### 4.2 추가할 서비스: sensor-sim

```python
"""센서 시뮬레이터 — 슈레더 14개 센서 모의 데이터 생성"""
import requests, time, random, numpy as np

API_URL = "http://ai-service:8000/predict"

def simulate_bearing():
    """베어링 진동 센서 시뮬레이션 (정상~이상 천이)"""
    cycle = 0
    while True:
        cycle += 1
        # 200사이클마다 이상 발생 시뮬레이션
        if cycle % 200 < 180:
            vib = np.random.normal(3.5, 0.5, 3)  # 정상
        else:
            vib = np.random.normal(10.0, 2.0, 3)  # 이상 (베어링 손상)

        data = {
            "vib_x": round(float(vib[0]), 2),
            "vib_y": round(float(vib[1]), 2),
            "vib_z": round(float(vib[2]), 2),
            "sensor_id": "VIB-A"
        }

        try:
            resp = requests.post(API_URL, json=data, timeout=5)
            result = resp.json()
            icon = "✅" if result["status"] == "정상" else "🚨"
            print(f"[{cycle:04d}] {icon} {result['status']} "
                  f"| 건강점수: {result['health_score']} "
                  f"| VIB: [{data['vib_x']}, {data['vib_y']}, {data['vib_z']}]")
        except Exception as e:
            print(f"[{cycle:04d}] ⚠️ 연결 실패: {e}")

        time.sleep(1)

if __name__ == "__main__":
    print("=" * 60)
    print("  슈레더 센서 시뮬레이터 시작")
    print("  VIB-A (3축 진동) → AI 추론 서비스로 전송")
    print("=" * 60)
    time.sleep(3)  # AI 서비스 시작 대기
    simulate_bearing()
```

### 4.3 docker-compose.yml에 추가

```yaml
  sensor-sim:
    build: ./sensor-sim
    container_name: shredder-sensor-sim
    depends_on:
      - ai-service
    restart: unless-stopped
```

---

## Step 5: Jetson 배포 준비 (1시간)

### 5.1 ARM64 멀티 아키텍처 빌드

```bash
# buildx로 ARM64 (Jetson) 용 이미지 빌드
docker buildx create --use
docker buildx build --platform linux/arm64 -t shredder-ai:jetson .
```

### 5.2 Jetson 전용 Dockerfile (참고)

```dockerfile
# Jetson Orin NX 전용 — JetPack 6 + NVIDIA Runtime
FROM nvcr.io/nvidia/l4t-ml:r36.2.0-py3

WORKDIR /app
COPY requirements-jetson.txt .
RUN pip install --no-cache-dir -r requirements-jetson.txt

COPY . .
EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 5.3 Jetson에서 실행 시 명령어

```bash
# NVIDIA Container Runtime 사용
docker run --runtime nvidia --rm shredder-ai:jetson

# GPU 사용 확인
docker run --runtime nvidia --rm nvcr.io/nvidia/l4t-ml:r36.2.0-py3 \
  python3 -c "import torch; print(torch.cuda.is_available())"
```

### 5.4 실제 배포 시 Docker Compose (Jetson)

```yaml
# docker-compose.jetson.yml
version: '3.8'
services:
  ai-service:
    image: shredder-ai:jetson
    runtime: nvidia          # NVIDIA GPU 사용
    container_name: shredder-ai
    ports:
      - "8000:8000"
    volumes:
      - /dev:/dev            # 센서 디바이스 접근
    privileged: true         # 하드웨어 접근 허용
    restart: always
```

---

## 실습 체크리스트

| # | 단계 | 핵심 실습 항목 | 소요 | 상태 |
|:-:|------|-------------|:----:|:----:|
| 1 | Docker 기초 | 설치 확인, pull/run/ps/stop/rm | 30분 | ⬜ |
| 2 | Dockerfile | AI 모델 컨테이너 빌드 + 실행 | 1시간 | ⬜ |
| 3 | Docker Compose | DB + AI + 대시보드 3개 컨테이너 연동 | 1시간 | ⬜ |
| 4 | 모의 시스템 | 센서 시뮬 → AI 추론 → 대시보드 | 1.5시간 | ⬜ |
| 5 | Jetson 준비 | ARM64 빌드, NVIDIA Runtime | 1시간 | ⬜ |

---

## 참고

- 이 실습은 슈레더 AI 시스템(Edge_AI_슈레더_제안서.md)의 **소프트웨어 설계 12장**에서 정의한 Docker 기반 컨테이너 배포를 실습하기 위한 것입니다.
- 실제 시스템에서는 TensorRT + LSTM Autoencoder를 사용하지만, 실습에서는 scikit-learn의 Isolation Forest로 간소화했습니다.
- Step 5는 실제 Jetson 장비가 있을 때 진행합니다.
