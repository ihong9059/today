# Docker 초보자 완전 가이드 — PC에서 만들고, Raspberry Pi 5에서 똑같이 실행하기

## "Docker를 전혀 모르는 사람"을 위한 원리부터 실습까지

---

## 문서 정보

| 항목 | 내용 |
|------|------|
| **작성일** | 2026-03-28 |
| **목적** | Docker의 원리를 이해하고, PC에서 개발한 시스템을 Raspberry Pi 5에 이관하여 동일하게 실행하는 전체 과정을 실습 |
| **대상 독자** | Docker를 전혀 모르는 사람 (프로그래밍 기초 지식만 있으면 됨) |
| **실습 환경** | Windows 11 PC (개발) → Raspberry Pi 5 (운영) |
| **소요 시간** | 약 3~4시간 |

---

## 목차

### Part 1 — Docker란 무엇인가? (원리 이해)
1. [Docker가 해결하는 문제 — "내 PC에서는 되는데?"](#1-docker가-해결하는-문제)
2. [Docker의 핵심 개념 — 컨테이너, 이미지, 레지스트리](#2-docker의-핵심-개념)
3. [Docker vs 가상머신(VM) — 무엇이 다른가?](#3-docker-vs-가상머신)
4. [Docker가 이 프로젝트에서 하는 역할](#4-docker가-이-프로젝트에서-하는-역할)

### Part 2 — PC에서 개발하기 (Windows 11)
5. [환경 준비 — Docker Desktop 설치](#5-환경-준비)
6. [Step 1: Docker 기본 명령어 익히기](#6-step-1-기본-명령어)
7. [Step 2: 우리가 만들 시스템 설계](#7-step-2-시스템-설계)
8. [Step 3: 애플리케이션 코드 작성](#8-step-3-코드-작성)
9. [Step 4: Dockerfile 작성 — "설계 도면 만들기"](#9-step-4-dockerfile-작성)
10. [Step 5: Docker 이미지 빌드 — "도면으로 건물 짓기"](#10-step-5-이미지-빌드)
11. [Step 6: PC에서 실행 및 테스트](#11-step-6-pc에서-실행)

### Part 3 — Raspberry Pi 5로 이관하기
12. [이관의 원리 — 왜 Docker면 가능한가?](#12-이관의-원리)
13. [Step 7: Raspberry Pi 5에 Docker 설치](#13-step-7-raspberry-pi-docker-설치)
14. [Step 8: 이미지를 Raspberry Pi로 옮기기 (3가지 방법)](#14-step-8-이미지-옮기기)
15. [Step 9: Raspberry Pi에서 실행 — "동일한 시스템이 돌아간다!"](#15-step-9-raspberry-pi에서-실행)
16. [Step 10: 검증 — PC와 Raspberry Pi 결과 비교](#16-step-10-검증)

### Part 4 — 정리 및 의미
17. [전체 과정 요약](#17-전체-과정-요약)
18. [이것이 왜 중요한가? — 실제 산업 현장에서의 의미](#18-이것이-왜-중요한가)

---

# Part 1 — Docker란 무엇인가?

---

## 1. Docker가 해결하는 문제

### 1.1 "내 PC에서는 되는데?"

소프트웨어 개발에서 가장 흔하고 골치 아픈 문제가 있습니다:

```
[흔한 상황]

  개발자 A: "이 프로그램 완성했어요. 제 PC에서 완벽하게 돌아갑니다!"

  운영 담당자: "제 서버에 설치했는데 안 돌아가요..."

  개발자 A: "네?? 제 PC에서는 되는데요??"

  원인:
  ├── PC에는 Python 3.11이 있는데, 서버에는 Python 3.8이 설치됨
  ├── PC에는 특정 라이브러리가 있는데, 서버에는 없음
  ├── PC는 Windows인데, 서버는 Linux임
  ├── 환경 변수, 설정 파일 등이 다름
  └── 결론: "환경"이 다르면 같은 코드도 다르게 작동한다
```

### 1.2 Docker의 해결 방식

```
[Docker의 발상]

  "프로그램만 옮기지 말고, 프로그램이 돌아가는 환경 전체를 통째로 옮기자!"

  ┌─────────────────────────────────────────────────┐
  │                                                   │
  │  기존 방식:                                       │
  │  프로그램 코드만 전달 → 환경이 달라서 안 됨      │
  │                                                   │
  │  Docker 방식:                                     │
  │  프로그램 + Python + 라이브러리 + 설정 + OS       │
  │  → 전부 하나의 "상자(컨테이너)"에 담아서 전달    │
  │  → 어디서 열어도 똑같이 작동                     │
  │                                                   │
  └─────────────────────────────────────────────────┘
```

### 1.3 일상생활 비유

```
[비유 1: 이사]

  기존 방식 = 가구만 옮기는 이사
  → 새 집에 콘센트 위치가 달라서 가전이 안 맞음
  → 인터넷 설정을 새로 해야 함
  → 결국 새 집에서 한참 걸려야 정상화

  Docker 방식 = 집 전체를 통째로 옮기는 이사
  → 콘센트, 인터넷, 가구 배치 전부 그대로
  → 옮기자마자 바로 생활 가능


[비유 2: 도시락]

  기존 방식 = 레시피만 전달
  → "밥 해주세요" → 상대방 집에 재료가 없을 수 있음

  Docker 방식 = 완성된 도시락을 전달
  → 뚜껑만 열면 바로 먹을 수 있음
  → 어디서 열든 같은 음식
```

---

## 2. Docker의 핵심 개념

### 2.1 3가지만 기억하세요

```
┌─────────────────────────────────────────────────────────────────┐
│                  Docker 핵심 3요소                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Dockerfile (설계 도면)                                       │
│     └─ "어떤 환경을 만들지" 적어놓은 텍스트 파일                │
│     └─ 예: "Python 3.11 설치하고, 이 코드 넣고, 이 명령 실행"  │
│                                                                 │
│  2. Image (완성된 상자 = 틀)                                     │
│     └─ Dockerfile로 만든 "실행 준비가 된 패키지"               │
│     └─ 읽기 전용 (변경 불가)                                    │
│     └─ 예: "Python + 내 코드 + 라이브러리"가 들어있는 상자      │
│                                                                 │
│  3. Container (실행 중인 상자)                                   │
│     └─ Image를 실제로 "실행"한 것                               │
│     └─ 하나의 Image로 여러 Container를 만들 수 있음             │
│     └─ 예: 상자를 열어서 프로그램이 돌아가고 있는 상태          │
│                                                                 │
│  관계:                                                           │
│  Dockerfile ──(빌드)──▶ Image ──(실행)──▶ Container             │
│  (도면)                 (틀)              (실제 작동)            │
│                                                                 │
│  비유:                                                           │
│  레시피 ──(요리)──▶ 냉동식품 ──(해동)──▶ 먹을 수 있는 음식     │
│  설계도 ──(건축)──▶ 조립식주택 ──(설치)──▶ 사람이 사는 집      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 추가 개념

| 개념 | 설명 | 비유 |
|------|------|------|
| **Registry** | Image를 저장/공유하는 저장소 | 앱 스토어 (Docker Hub = 구글 플레이) |
| **Volume** | 컨테이너 외부에 데이터를 저장 | 외장 하드 (컨테이너 삭제해도 데이터 유지) |
| **Port Mapping** | 호스트 PC의 포트와 컨테이너의 포트를 연결 | 건물 입구를 도로와 연결 |
| **Docker Compose** | 여러 컨테이너를 한 번에 관리 | 아파트 단지 관리 (각 동 = 각 컨테이너) |

### 2.3 Docker의 작동 흐름 (전체 그림)

```
[개발자 PC에서]

  1. 코드 작성 (app.py)
  2. Dockerfile 작성 ("Python 3.11 + 이 코드 + 이 라이브러리")
  3. docker build → Image 생성
  4. docker run → Container 실행 → 테스트 OK!

[다른 PC/서버/Raspberry Pi로 옮길 때]

  5. Image를 파일로 저장 (docker save)
     또는 Docker Hub에 업로드 (docker push)

  6. 다른 장비에서 Image를 가져옴 (docker load 또는 docker pull)

  7. docker run → 동일한 Container 실행!
     → PC에서 돌아가던 것이 그대로 돌아감!

  핵심: Image 안에 "환경 전체"가 들어있으므로,
        어떤 장비에서든 동일하게 작동합니다.
```

---

## 3. Docker vs 가상머신(VM)

### 3.1 차이점

```
[가상머신 (VM)]

  ┌──────────────────────────┐
  │        애플리케이션       │
  ├──────────────────────────┤
  │       게스트 OS          │ ← Windows/Linux 전체를 설치
  │    (수 GB ~ 수십 GB)    │    부팅에 수십 초~수 분
  ├──────────────────────────┤
  │      하이퍼바이저        │
  ├──────────────────────────┤
  │       호스트 OS          │
  └──────────────────────────┘

  → OS 전체를 포함하므로 무겁고 느림
  → 이미지 크기: 수 GB ~ 수십 GB
  → 시작 시간: 수십 초 ~ 수 분


[Docker 컨테이너]

  ┌──────────────────────────┐
  │        애플리케이션       │
  ├──────────────────────────┤
  │    필요한 라이브러리만   │ ← OS 전체가 아닌 필요한 부분만
  │     (수십 MB ~ 수백 MB) │    시작에 수 초
  ├──────────────────────────┤
  │       Docker 엔진        │
  ├──────────────────────────┤
  │       호스트 OS          │
  └──────────────────────────┘

  → 필요한 것만 포함하므로 가볍고 빠름
  → 이미지 크기: 수십 MB ~ 수백 MB
  → 시작 시간: 수 초
```

### 3.2 비교 요약

| 비교 항목 | 가상머신 (VM) | Docker 컨테이너 |
|----------|:------------:|:--------------:|
| **크기** | 수 GB ~ 수십 GB | 수십 MB ~ 수백 MB |
| **시작 시간** | 수십 초 ~ 수 분 | **수 초** |
| **성능** | 오버헤드 있음 | **거의 네이티브** |
| **격리** | 완전 격리 (OS 별도) | 프로세스 수준 격리 |
| **이식성** | 무거워서 이동 어려움 | **매우 가벼워서 이동 용이** |
| **적합한 용도** | 다른 OS 실행 필요 시 | 앱 배포, 마이크로서비스 |

> **결론**: Raspberry Pi처럼 자원이 제한된 장비에서는 VM은 사실상 불가능하지만, Docker는 가볍게 실행 가능합니다.

---

## 4. Docker가 이 프로젝트에서 하는 역할

### 4.1 우리의 목표

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [Windows 11 PC]          ──────▶         [Raspberry Pi 5]      │
│                                                                 │
│  여기서 개발하고              이미지 전달       여기서 동일하게 │
│  테스트한 시스템을                              실행한다!       │
│                                                                 │
│  Python 3.11                                   Python 3.11      │
│  + FastAPI                                     + FastAPI        │
│  + 센서 시뮬레이터                             + 센서 시뮬레이터│
│  + 웹 대시보드                                 + 웹 대시보드   │
│                                                                 │
│  전부 Docker 컨테이너 안에 들어있으므로,                        │
│  Raspberry Pi에서도 "동일한 환경"이 보장됨                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 왜 Docker 없이는 어려운가?

```
[Docker 없이 Raspberry Pi에 설치하려면]

  1. Raspberry Pi에 Python 3.11 설치
     → Raspberry Pi OS 기본은 3.9일 수 있음 → 수동 빌드 필요 (30분+)
  2. pip install로 라이브러리 설치
     → numpy, scikit-learn 등이 ARM64에서 빌드 에러 날 수 있음
  3. 환경 변수, 설정 파일 등 수동 맞춤
     → "내 PC에서는 됐는데..." 문제 재발
  4. 나중에 업데이트할 때마다 위 과정 반복

  → 시간 낭비 + 오류 가능성 높음


[Docker 사용하면]

  1. PC에서 docker build로 이미지 빌드 (1번만)
  2. 이미지를 Raspberry Pi로 복사
  3. docker run → 끝!

  → Python, 라이브러리, 설정 전부 이미지 안에 포함
  → 업데이트 시에도 새 이미지만 전달하면 됨
```

---

# Part 2 — PC에서 개발하기

---

## 5. 환경 준비

### 5.1 Docker Desktop 설치 (Windows 11)

```
1. https://www.docker.com/products/docker-desktop/ 에서 다운로드
2. 설치 후 재부팅
3. Docker Desktop 실행 → 트레이 아이콘에 고래 모양 확인
```

### 5.2 설치 확인

```bash
# 터미널(PowerShell 또는 Git Bash)에서 실행
docker --version
# 출력 예: Docker version 27.x.x, build xxxxxxx

docker compose version
# 출력 예: Docker Compose version v2.x.x

# 정상 작동 테스트
docker run hello-world
# "Hello from Docker!" 메시지가 나오면 성공!
```

---

## 6. Step 1: Docker 기본 명령어 익히기

### 6.1 꼭 알아야 할 명령어 10개

```bash
# ===== 이미지 관련 =====

# 1. 이미지 다운로드 (Docker Hub에서)
docker pull python:3.11-slim

# 2. 내 PC에 있는 이미지 목록 보기
docker images

# 3. 이미지 삭제
docker rmi python:3.11-slim


# ===== 컨테이너 관련 =====

# 4. 컨테이너 실행 (대화형 — 터미널 직접 사용)
docker run -it python:3.11-slim bash
# (-it: 터미널 연결, bash: 쉘 실행)
# 나가기: exit 입력

# 5. 컨테이너 실행 (백그라운드)
docker run -d --name my-web -p 8080:80 nginx
# (-d: 백그라운드, --name: 이름 지정, -p: 포트 매핑)

# 6. 실행 중인 컨테이너 목록
docker ps

# 7. 전체 컨테이너 목록 (정지된 것 포함)
docker ps -a

# 8. 컨테이너 로그 보기
docker logs my-web

# 9. 컨테이너 정지
docker stop my-web

# 10. 컨테이너 삭제
docker rm my-web
```

### 6.2 실습: nginx 웹 서버 돌려보기

```bash
# 1. nginx 웹 서버 컨테이너 실행
docker run -d --name test-web -p 8080:80 nginx

# 2. 브라우저에서 http://localhost:8080 접속
#    → "Welcome to nginx!" 페이지가 보이면 성공!

# 3. 정리
docker stop test-web
docker rm test-web
```

> **축하합니다!** 방금 Docker로 웹 서버를 실행한 것입니다. nginx 설치, 설정 등을 전혀 하지 않았는데 웹 서버가 돌아갑니다. 이것이 Docker의 힘입니다.

---

## 7. Step 2: 우리가 만들 시스템 설계

### 7.1 시스템 구성

```
┌─────────────────────────────────────────────────────────────────┐
│                  우리가 만들 시스템                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  "온도 모니터링 시스템"                                          │
│                                                                 │
│  1. 센서 시뮬레이터 (Python)                                     │
│     └─ 가상의 온도 센서 데이터를 1초마다 생성                   │
│     └─ 실제 센서 대신 랜덤 데이터 사용                          │
│                                                                 │
│  2. 분석 서버 (Python + FastAPI)                                 │
│     └─ 센서 데이터를 받아서 분석                                │
│     └─ "정상/주의/경고/위험" 판정                               │
│     └─ REST API로 결과 제공                                     │
│                                                                 │
│  3. 웹 대시보드 (HTML + JavaScript)                              │
│     └─ 브라우저에서 실시간 상태 확인                            │
│     └─ 온도 그래프 + 상태 표시                                  │
│                                                                 │
│  ┌────────────┐     ┌────────────┐     ┌────────────┐          │
│  │  센서       │────▶│  분석 서버 │────▶│  대시보드  │          │
│  │  시뮬레이터 │     │  (FastAPI) │     │  (웹 브라우저)        │
│  │  :5001      │     │  :8000     │     │  :3000     │          │
│  └────────────┘     └────────────┘     └────────────┘          │
│                                                                 │
│  → 이 3개를 Docker 컨테이너로 만들어서                          │
│  → PC에서 테스트하고                                            │
│  → 그대로 Raspberry Pi 5로 옮겨서 실행!                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 폴더 구조

```
docker/실습/
├── docker-compose.yml          ← 전체 시스템 구성 파일
├── sensor/                     ← 센서 시뮬레이터
│   ├── Dockerfile
│   ├── requirements.txt
│   └── sensor.py
├── server/                     ← 분석 서버
│   ├── Dockerfile
│   ├── requirements.txt
│   └── server.py
└── dashboard/                  ← 웹 대시보드
    ├── Dockerfile
    └── index.html
```

---

## 8. Step 3: 애플리케이션 코드 작성

### 8.1 센서 시뮬레이터 (sensor/sensor.py)

```python
"""
온도 센서 시뮬레이터
- 1초마다 가상의 온도 데이터를 생성하여 분석 서버로 전송
- 가끔 이상 온도(고온)를 발생시켜 경고 테스트
"""
import requests
import time
import random
import math
from datetime import datetime

SERVER_URL = "http://server:8000/data"  # Docker 내부 네트워크에서 서비스명으로 접근

def generate_temperature():
    """
    실제 온도 센서처럼 데이터를 생성합니다.
    - 기본 온도: 25°C 근처
    - 시간에 따른 자연스러운 변동 추가
    - 5% 확률로 이상 고온 발생 (테스트용)
    """
    base = 25.0  # 기본 온도

    # 자연스러운 변동 (사인파 + 랜덤 노이즈)
    now = time.time()
    variation = 3.0 * math.sin(now / 30) + random.gauss(0, 0.5)

    # 5% 확률로 이상 고온 발생
    if random.random() < 0.05:
        variation += random.uniform(15, 30)  # 40~55도까지 상승

    return round(base + variation, 1)

def main():
    print("=" * 50)
    print("  온도 센서 시뮬레이터 시작")
    print(f"  전송 대상: {SERVER_URL}")
    print("=" * 50)

    sensor_id = "TEMP-001"
    count = 0

    # 서버가 시작될 때까지 대기
    print("\n서버 연결 대기 중...")
    for i in range(30):
        try:
            requests.get("http://server:8000/health", timeout=2)
            print("서버 연결 성공!\n")
            break
        except:
            time.sleep(1)

    while True:
        count += 1
        temp = generate_temperature()
        timestamp = datetime.now().strftime("%H:%M:%S")

        data = {
            "sensor_id": sensor_id,
            "temperature": temp,
            "timestamp": timestamp,
            "count": count
        }

        try:
            resp = requests.post(SERVER_URL, json=data, timeout=5)
            result = resp.json()

            # 상태에 따른 아이콘
            icons = {"정상": "✅", "주의": "⚠️", "경고": "🔶", "위험": "🚨"}
            icon = icons.get(result.get("status", ""), "❓")

            print(f"  [{timestamp}] #{count:04d} | "
                  f"온도: {temp:5.1f}°C | "
                  f"상태: {icon} {result.get('status', '?')} | "
                  f"메시지: {result.get('message', '')}")
        except Exception as e:
            print(f"  [{timestamp}] #{count:04d} | ⚠️ 전송 실패: {e}")

        time.sleep(1)

if __name__ == "__main__":
    main()
```

### 8.2 분석 서버 (server/server.py)

```python
"""
온도 분석 서버 (FastAPI)
- 센서 데이터를 받아서 분석
- 온도 기준으로 상태 판정 (정상/주의/경고/위험)
- REST API로 현재 상태와 이력 제공
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from collections import deque

app = FastAPI(title="온도 모니터링 분석 서버")

# CORS 설정 (대시보드에서 접근 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 최근 데이터 저장 (최대 100건)
history = deque(maxlen=100)
current_status = {"status": "대기", "temperature": 0, "message": "데이터 없음"}

class SensorData(BaseModel):
    sensor_id: str
    temperature: float
    timestamp: str
    count: int

def analyze_temperature(temp: float) -> dict:
    """
    온도 기준으로 상태를 판정합니다.

    이 기준은 슈레더 시스템의 베어링 온도 감시를 단순화한 것입니다:
    - 정상: 20~35°C (일반 운전)
    - 주의: 35~45°C (모니터링 강화)
    - 경고: 45~55°C (정비 계획 수립)
    - 위험: 55°C 이상 (즉시 점검)
    """
    if temp < 20:
        return {"status": "정상", "level": 0, "message": f"저온 {temp}°C — 정상 범위"}
    elif temp < 35:
        return {"status": "정상", "level": 0, "message": f"{temp}°C — 정상 운전"}
    elif temp < 45:
        return {"status": "주의", "level": 1, "message": f"{temp}°C — 모니터링 강화 필요"}
    elif temp < 55:
        return {"status": "경고", "level": 2, "message": f"{temp}°C — 정비 계획 수립 권고"}
    else:
        return {"status": "위험", "level": 3, "message": f"{temp}°C — 즉시 점검 필요!"}

@app.get("/")
def root():
    return {"service": "온도 모니터링 분석 서버", "status": "running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/data")
def receive_data(data: SensorData):
    """센서 데이터 수신 및 분석"""
    result = analyze_temperature(data.temperature)

    record = {
        "sensor_id": data.sensor_id,
        "temperature": data.temperature,
        "timestamp": data.timestamp,
        "count": data.count,
        **result
    }

    history.append(record)
    current_status.update(record)

    return result

@app.get("/current")
def get_current():
    """현재 상태 조회 (대시보드용)"""
    return current_status

@app.get("/history")
def get_history():
    """최근 이력 조회 (대시보드 그래프용)"""
    return list(history)
```

### 8.3 웹 대시보드 (dashboard/index.html)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>온도 모니터링 대시보드</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:-apple-system,'Malgun Gothic',sans-serif; background:#0f172a; color:#e2e8f0; padding:20px; }
  h1 { text-align:center; font-size:24px; margin-bottom:20px; color:#60a5fa; }
  .grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; max-width:900px; margin:0 auto 20px; }
  .card { background:#1e293b; border-radius:12px; padding:20px; text-align:center; border:1px solid #334155; }
  .card .label { font-size:12px; color:#94a3b8; margin-bottom:4px; }
  .card .value { font-size:32px; font-weight:800; }
  .card .value.green { color:#4ade80; }
  .card .value.yellow { color:#fbbf24; }
  .card .value.orange { color:#fb923c; }
  .card .value.red { color:#f87171; }
  #status-card { border-width:2px; }
  .chart-area { background:#1e293b; border-radius:12px; padding:20px; max-width:900px; margin:0 auto 20px; border:1px solid #334155; }
  .chart-title { font-size:14px; color:#94a3b8; margin-bottom:10px; }
  canvas { width:100%; height:200px; }
  .log-area { background:#1e293b; border-radius:12px; padding:16px; max-width:900px; margin:0 auto; border:1px solid #334155; max-height:200px; overflow-y:auto; }
  .log-area .log-title { font-size:14px; color:#94a3b8; margin-bottom:8px; }
  .log-item { font-size:12px; font-family:Consolas,monospace; padding:2px 0; color:#cbd5e1; }
  .footer { text-align:center; margin-top:20px; font-size:11px; color:#475569; }
  .docker-badge { display:inline-block; background:#1e40af; color:#93c5fd; padding:2px 10px; border-radius:10px; font-size:11px; margin-top:8px; }
</style>
</head>
<body>
  <h1>🌡️ 온도 모니터링 대시보드</h1>

  <div class="grid">
    <div class="card">
      <div class="label">현재 온도</div>
      <div class="value green" id="temp-value">--.-°C</div>
    </div>
    <div class="card" id="status-card">
      <div class="label">상태</div>
      <div class="value green" id="status-value">대기</div>
    </div>
    <div class="card">
      <div class="label">수신 건수</div>
      <div class="value" id="count-value" style="color:#60a5fa;">0</div>
    </div>
  </div>

  <div class="chart-area">
    <div class="chart-title">📊 온도 추이 (최근 50건)</div>
    <canvas id="chart"></canvas>
  </div>

  <div class="log-area">
    <div class="log-title">📋 실시간 로그</div>
    <div id="log-list"></div>
  </div>

  <div class="footer">
    Docker 실습 — PC에서 개발, Raspberry Pi 5에서 실행
    <br><span class="docker-badge">🐳 Powered by Docker</span>
  </div>

<script>
const API = 'http://' + window.location.hostname + ':8000';
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
let tempHistory = [];

const statusColors = { '정상':'green', '주의':'yellow', '경고':'orange', '위험':'red' };
const statusBorders = { '정상':'#4ade80', '주의':'#fbbf24', '경고':'#fb923c', '위험':'#f87171' };

function drawChart() {
  const w = canvas.width = canvas.offsetWidth;
  const h = canvas.height = 200;
  ctx.clearRect(0, 0, w, h);

  if (tempHistory.length < 2) return;

  const temps = tempHistory.slice(-50);
  const min = Math.min(...temps) - 5;
  const max = Math.max(...temps) + 5;
  const range = max - min || 1;

  // 경고 영역 배경
  const y35 = h - ((35-min)/range)*h;
  const y45 = h - ((45-min)/range)*h;
  const y55 = h - ((55-min)/range)*h;

  ctx.fillStyle='rgba(74,222,128,0.05)'; ctx.fillRect(0,y35,w,h-y35);
  ctx.fillStyle='rgba(251,191,36,0.08)'; ctx.fillRect(0,y45,w,y35-y45);
  ctx.fillStyle='rgba(251,146,60,0.08)'; ctx.fillRect(0,y55,w,y45-y55);
  ctx.fillStyle='rgba(248,113,113,0.08)'; ctx.fillRect(0,0,w,y55);

  // 라인
  ctx.beginPath();
  ctx.strokeStyle='#60a5fa'; ctx.lineWidth=2;
  temps.forEach((t,i) => {
    const x = (i/(temps.length-1))*w;
    const y = h - ((t-min)/range)*h;
    i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
  });
  ctx.stroke();

  // 점
  temps.forEach((t,i) => {
    const x = (i/(temps.length-1))*w;
    const y = h - ((t-min)/range)*h;
    ctx.beginPath();
    ctx.fillStyle = t>=55?'#f87171':t>=45?'#fb923c':t>=35?'#fbbf24':'#4ade80';
    ctx.arc(x,y,3,0,Math.PI*2);
    ctx.fill();
  });
}

function addLog(msg) {
  const el = document.getElementById('log-list');
  const div = document.createElement('div');
  div.className = 'log-item';
  div.textContent = msg;
  el.insertBefore(div, el.firstChild);
  if (el.children.length > 30) el.removeChild(el.lastChild);
}

async function update() {
  try {
    const resp = await fetch(API + '/current');
    const data = await resp.json();

    if (data.temperature) {
      const t = data.temperature;
      const s = data.status || '대기';
      const c = statusColors[s] || 'green';

      document.getElementById('temp-value').textContent = t.toFixed(1) + '°C';
      document.getElementById('temp-value').className = 'value ' + c;
      document.getElementById('status-value').textContent = s;
      document.getElementById('status-value').className = 'value ' + c;
      document.getElementById('status-card').style.borderColor = statusBorders[s] || '#334155';
      document.getElementById('count-value').textContent = data.count || 0;

      tempHistory.push(t);
      if (tempHistory.length > 50) tempHistory.shift();
      drawChart();

      const icons = {'정상':'✅','주의':'⚠️','경고':'🔶','위험':'🚨'};
      addLog(`[${data.timestamp}] ${icons[s]||''} ${t.toFixed(1)}°C — ${data.message||s}`);
    }
  } catch(e) {
    addLog(`[연결 실패] ${e.message}`);
  }
}

setInterval(update, 1000);
update();
</script>
</body>
</html>
```

---

## 9. Step 4: Dockerfile 작성

### 9.1 sensor/Dockerfile

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY sensor.py .
CMD ["python", "-u", "sensor.py"]
```

### 9.2 sensor/requirements.txt

```
requests==2.31.0
```

### 9.3 server/Dockerfile

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY server.py .
EXPOSE 8000
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 9.4 server/requirements.txt

```
fastapi==0.115.0
uvicorn==0.30.0
```

### 9.5 dashboard/Dockerfile

```dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
```

---

## 10. Step 5: Docker 이미지 빌드

### 10.1 docker-compose.yml

```yaml
version: '3.8'

services:
  server:
    build: ./server
    container_name: monitor-server
    ports:
      - "8000:8000"
    restart: unless-stopped

  sensor:
    build: ./sensor
    container_name: monitor-sensor
    depends_on:
      - server
    restart: unless-stopped

  dashboard:
    build: ./dashboard
    container_name: monitor-dashboard
    ports:
      - "3000:80"
    depends_on:
      - server
    restart: unless-stopped
```

### 10.2 빌드 명령어

```bash
# 실습 폴더로 이동
cd docker/실습

# 전체 빌드 + 실행
docker compose up -d --build

# 상태 확인
docker compose ps
```

---

## 11. Step 6: PC에서 실행 및 테스트

```bash
# 1. 전체 시스템 시작
docker compose up -d --build

# 2. 컨테이너 상태 확인
docker compose ps
# 3개 컨테이너가 모두 "running" 상태인지 확인

# 3. 센서 시뮬레이터 로그 확인
docker compose logs -f sensor
# 1초마다 온도 데이터가 전송되는 것이 보임

# 4. 분석 서버 API 테스트
curl http://localhost:8000/current
# 현재 온도와 상태가 JSON으로 반환됨

# 5. 대시보드 확인
# 브라우저에서 http://localhost:3000 접속
# → 실시간 온도 그래프와 상태가 표시됨!

# 6. 정상 작동 확인 후 — 이 시스템을 Raspberry Pi로 옮길 것!
```

**PC에서 정상 작동 확인 완료!** 이제 이것을 Raspberry Pi 5로 옮깁니다.

---

# Part 3 — Raspberry Pi 5로 이관하기

---

## 12. 이관의 원리

### 12.1 왜 Docker면 가능한가?

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [핵심 원리]                                                     │
│                                                                 │
│  Docker Image 안에는 "환경 전체"가 들어있습니다:                │
│  • Python 3.11                                                   │
│  • FastAPI, requests 등 라이브러리                              │
│  • 우리가 작성한 코드                                           │
│  • 실행에 필요한 설정                                           │
│                                                                 │
│  이 Image를 Raspberry Pi로 옮기면,                              │
│  Raspberry Pi에 Python을 설치할 필요도,                         │
│  라이브러리를 설치할 필요도 없습니다.                           │
│  Image 안에 이미 다 들어있으니까!                               │
│                                                                 │
│  단, 한 가지 주의:                                               │
│  PC (Intel/AMD = x86_64)와                                      │
│  Raspberry Pi (ARM = aarch64)는 CPU 아키텍처가 다릅니다.        │
│                                                                 │
│  따라서 Raspberry Pi용 이미지를 별도로 빌드하거나,              │
│  멀티 아키텍처 빌드를 사용해야 합니다.                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 12.2 CPU 아키텍처 문제

```
PC (Windows 11):
  CPU: Intel / AMD → 아키텍처: x86_64 (amd64)

Raspberry Pi 5:
  CPU: ARM Cortex-A76 → 아키텍처: aarch64 (arm64)

  → 같은 Docker Image라도 CPU가 다르면 실행 불가!
  → 해결: Raspberry Pi(ARM64)용으로 다시 빌드하면 됨

  방법 1: PC에서 멀티 아키텍처 빌드 (docker buildx)
  방법 2: Raspberry Pi에서 직접 빌드 (docker compose build)
  방법 3: Docker Hub에 멀티 아키텍처로 push → Pi에서 pull
```

---

## 13. Step 7: Raspberry Pi 5에 Docker 설치

### 13.1 Raspberry Pi OS 준비

```bash
# Raspberry Pi에 SSH로 접속한 상태에서:

# 1. 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# 2. Docker 설치 (공식 스크립트)
curl -fsSL https://get.docker.com | sudo sh

# 3. 현재 사용자를 docker 그룹에 추가 (sudo 없이 docker 사용)
sudo usermod -aG docker $USER

# 4. 재로그인 (그룹 변경 적용)
logout
# 다시 SSH 접속

# 5. 설치 확인
docker --version
docker compose version
docker run hello-world
# "Hello from Docker!" → 성공!
```

---

## 14. Step 8: 이미지를 Raspberry Pi로 옮기기

### 방법 A: Raspberry Pi에서 직접 빌드 (가장 간단, 권장)

```bash
# 1. PC에서 프로젝트 폴더를 Raspberry Pi로 복사
#    (PC의 터미널에서 실행)
scp -r "docker/실습" pi@<라즈베리파이IP>:~/monitor-system

# 2. Raspberry Pi에서 빌드 + 실행
#    (Raspberry Pi SSH에서 실행)
cd ~/monitor-system
docker compose up -d --build

# → Raspberry Pi의 ARM64 CPU에 맞는 이미지가 자동으로 빌드됨
# → python:3.11-slim, nginx:alpine 등 베이스 이미지는
#    Docker Hub에서 ARM64 버전을 자동으로 다운로드
```

### 방법 B: PC에서 ARM64 이미지 빌드 후 전송

```bash
# === PC에서 실행 ===

# 1. buildx로 ARM64 이미지 빌드 + 파일로 저장
docker buildx build --platform linux/arm64 -t monitor-server:arm64 ./server --output type=docker,dest=server-arm64.tar
docker buildx build --platform linux/arm64 -t monitor-sensor:arm64 ./sensor --output type=docker,dest=sensor-arm64.tar
docker buildx build --platform linux/arm64 -t monitor-dashboard:arm64 ./dashboard --output type=docker,dest=dashboard-arm64.tar

# 2. tar 파일을 Raspberry Pi로 전송
scp *-arm64.tar pi@<라즈베리파이IP>:~/

# === Raspberry Pi에서 실행 ===

# 3. 이미지 로드
docker load -i ~/server-arm64.tar
docker load -i ~/sensor-arm64.tar
docker load -i ~/dashboard-arm64.tar

# 4. 실행
docker run -d --name monitor-server -p 8000:8000 monitor-server:arm64
docker run -d --name monitor-sensor --link monitor-server:server monitor-sensor:arm64
docker run -d --name monitor-dashboard -p 3000:80 monitor-dashboard:arm64
```

### 방법 C: Docker Hub 경유 (인터넷 연결 필요)

```bash
# === PC에서 실행 ===

# 1. Docker Hub 로그인
docker login

# 2. 멀티 아키텍처 빌드 + push
docker buildx build --platform linux/amd64,linux/arm64 \
  -t <Docker Hub 사용자명>/monitor-server:latest \
  --push ./server

# === Raspberry Pi에서 실행 ===

# 3. pull + run
docker pull <Docker Hub 사용자명>/monitor-server:latest
docker run -d -p 8000:8000 <Docker Hub 사용자명>/monitor-server:latest
```

### 세 가지 방법 비교

| 방법 | 난이도 | 인터넷 | 속도 | 권장 |
|------|:------:|:------:|:----:|:----:|
| **A: Pi에서 직접 빌드** | 쉬움 | 필요 (베이스 이미지) | 느림 (Pi에서 빌드) | **초보자 권장** |
| **B: PC에서 ARM64 빌드 후 전송** | 중간 | 불필요 (전송 후) | 빠름 | 폐쇄망 환경 |
| **C: Docker Hub 경유** | 중간 | 필요 | 빠름 | 팀 협업 시 |

---

## 15. Step 9: Raspberry Pi에서 실행

### 15.1 방법 A 기준 (권장)

```bash
# Raspberry Pi SSH에서:

# 1. 프로젝트 폴더로 이동
cd ~/monitor-system

# 2. 빌드 + 실행
docker compose up -d --build

# 3. 상태 확인
docker compose ps
# 3개 컨테이너가 모두 running인지 확인

# 4. 로그 확인
docker compose logs -f sensor
# PC에서와 동일한 센서 데이터가 1초마다 출력됨!
```

### 15.2 대시보드 확인

```
브라우저에서 접속:
http://<라즈베리파이IP>:3000

→ PC에서 보던 것과 동일한 대시보드가 표시됨!
→ 실시간 온도 그래프 + 상태 판정이 작동
```

---

## 16. Step 10: 검증 — PC와 Raspberry Pi 결과 비교

### 16.1 비교 항목

| 항목 | PC (Windows 11) | Raspberry Pi 5 | 동일 여부 |
|------|:---:|:---:|:---:|
| 센서 데이터 생성 | 1초 간격 | 1초 간격 | ✅ |
| API 응답 형식 | JSON | JSON | ✅ |
| 상태 판정 (정상/주의/경고/위험) | 동일 기준 | 동일 기준 | ✅ |
| 대시보드 화면 | 동일 | 동일 | ✅ |
| 컨테이너 수 | 3개 | 3개 | ✅ |
| 사용 포트 | 8000, 3000 | 8000, 3000 | ✅ |

### 16.2 API 비교 테스트

```bash
# PC에서
curl http://localhost:8000/current

# Raspberry Pi에서 (또는 같은 네트워크의 다른 PC에서)
curl http://<라즈베리파이IP>:8000/current

# → 두 응답의 형식이 동일하면 성공!
# (온도 값은 랜덤이므로 다를 수 있지만, 구조는 동일)
```

### 16.3 이것이 의미하는 것

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ★ 검증 완료!                                                   │
│                                                                 │
│  PC(Windows, Intel x86_64)에서 개발한 시스템이                  │
│  Raspberry Pi 5(Linux, ARM aarch64)에서                         │
│  코드 수정 없이, 환경 설정 없이, 동일하게 작동합니다.          │
│                                                                 │
│  이것이 Docker의 핵심 가치입니다:                               │
│  "한 번 만들면, 어디서든 돌아간다"                              │
│  (Build once, run anywhere)                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# Part 4 — 정리 및 의미

---

## 17. 전체 과정 요약

```
┌─────────────────────────────────────────────────────────────────┐
│                  전체 과정 한눈에 보기                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [PC에서 — 개발]                                                │
│                                                                 │
│  1. 코드 작성 (sensor.py, server.py, index.html)                │
│  2. Dockerfile 작성 (각 서비스별 "설계 도면")                   │
│  3. docker-compose.yml 작성 (3개 서비스 구성)                   │
│  4. docker compose up --build (이미지 빌드 + 실행)              │
│  5. 테스트 완료! ✅                                             │
│           │                                                      │
│           │ 프로젝트 폴더를 scp로 복사                          │
│           ▼                                                      │
│  [Raspberry Pi에서 — 운영]                                      │
│                                                                 │
│  6. Docker 설치 (1회)                                            │
│  7. docker compose up --build (Pi에서 ARM64로 빌드)             │
│  8. 동일한 시스템이 Raspberry Pi에서 작동! ✅                   │
│                                                                 │
│  핵심: 코드를 한 줄도 수정하지 않았습니다.                      │
│  핵심: Python이나 라이브러리를 수동 설치하지 않았습니다.        │
│  핵심: Docker가 모든 환경을 자동으로 맞춰줍니다.               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 18. 이것이 왜 중요한가?

### 18.1 이 실습이 실제 산업에서 의미하는 것

```
[실습에서 한 것]                    [실제 산업에서]

PC에서 개발                    →    개발 서버에서 AI 모델 개발
  ↓                                   ↓
Raspberry Pi로 이관            →    공장 현장의 Edge 장비로 배포
  ↓                                   ↓
동일하게 작동 확인             →    현장에서 AI가 센서 데이터 분석


  온도 센서 시뮬레이터         →    실제 진동/온도/전류 센서
  FastAPI 분석 서버            →    AI 추론 서버 (이상 탐지 모델)
  웹 대시보드                  →    Grafana 대시보드
  Raspberry Pi 5               →    NVIDIA Jetson Orin NX
```

### 18.2 Docker가 제공하는 5가지 가치

| 가치 | 설명 |
|------|------|
| **이식성 (Portability)** | PC → Pi → 서버 → 클라우드, 어디서든 동일 작동 |
| **재현성 (Reproducibility)** | 3개월 후에 다시 실행해도 동일한 결과 보장 |
| **격리성 (Isolation)** | 서비스 간 독립, 하나가 죽어도 다른 것에 영향 없음 |
| **확장성 (Scalability)** | 같은 이미지로 10대, 100대에 동시 배포 가능 |
| **버전 관리** | 이미지에 태그(v1, v2)를 붙여 롤백 가능 |

### 18.3 슈레더 AI 시스템과의 연결

```
이 실습에서 배운 Docker 기술은
슈레더 AI 시스템에서 다음과 같이 사용됩니다:

  ┌──────────────────────────────────────────────────┐
  │  NVIDIA Jetson Orin NX (Edge AI Gateway)         │
  │                                                    │
  │  ┌────────────┐ ┌────────────┐ ┌────────────┐   │
  │  │ Container 1│ │ Container 2│ │ Container 3│   │
  │  │ 고장 예지  │ │ 사고 예방  │ │ 품질 관리  │   │
  │  │ AI 모델   │ │ AI 모델   │ │ AI 모델   │   │
  │  └────────────┘ └────────────┘ └────────────┘   │
  │  ┌────────────┐ ┌────────────┐                   │
  │  │ Container 4│ │ Container 5│                   │
  │  │ TimescaleDB│ │ 대시보드   │                   │
  │  └────────────┘ └────────────┘                   │
  │                                                    │
  │  → 각 AI 모델이 독립된 Docker 컨테이너로 실행    │
  │  → 하나의 모델을 업데이트해도 다른 모델에 영향 없음│
  │  → 새 모델 추가 = 새 컨테이너 추가              │
  │  → 문제 시 롤백 = 이전 이미지로 교체             │
  │                                                    │
  └──────────────────────────────────────────────────┘
```

---

## 실습 체크리스트

| # | 단계 | 핵심 내용 | 소요 | 상태 |
|:-:|------|----------|:----:|:----:|
| 1 | Docker 기초 이해 | 컨테이너/이미지/Dockerfile 개념 | 읽기 20분 | ⬜ |
| 2 | Docker Desktop 설치 | Windows 11에 설치 + 확인 | 10분 | ⬜ |
| 3 | 기본 명령어 실습 | pull, run, ps, stop, rm | 20분 | ⬜ |
| 4 | 코드 작성 | sensor.py, server.py, index.html | 30분 | ⬜ |
| 5 | Dockerfile 작성 | 3개 서비스별 Dockerfile | 15분 | ⬜ |
| 6 | docker-compose.yml | 3개 서비스 구성 | 10분 | ⬜ |
| 7 | PC에서 빌드 + 실행 | docker compose up --build | 10분 | ⬜ |
| 8 | PC에서 테스트 | 대시보드 + API 확인 | 10분 | ⬜ |
| 9 | Raspberry Pi Docker 설치 | curl + docker install | 10분 | ⬜ |
| 10 | 프로젝트 폴더 복사 | scp로 전송 | 5분 | ⬜ |
| 11 | Raspberry Pi에서 빌드 + 실행 | docker compose up --build | 15분 | ⬜ |
| 12 | 검증 | PC vs Pi 결과 비교 | 10분 | ⬜ |

**총 소요 시간: 약 3시간**

---

## 자주 하는 실수 & 해결

| 실수 | 원인 | 해결 |
|------|------|------|
| `docker: command not found` | Docker 미설치 또는 PATH 미등록 | Docker Desktop 재설치 후 재부팅 |
| `permission denied` (Pi) | docker 그룹에 미추가 | `sudo usermod -aG docker $USER` 후 재로그인 |
| `port already in use` | 이미 같은 포트를 사용하는 프로그램 | 포트 번호 변경 (예: 8000→8001) |
| `cannot connect to Docker daemon` | Docker Desktop 미실행 (Windows) | 트레이에서 Docker Desktop 실행 |
| 대시보드에서 데이터 안 보임 | CORS 또는 네트워크 문제 | server.py의 CORS 설정 확인, IP 확인 |
| Pi에서 빌드가 매우 느림 | ARM64 빌드는 PC보다 느림 | 정상, 5~10분 소요 가능. 또는 방법 B 사용 |

---

> **이 문서는 Docker를 처음 접하는 사람이 "원리 이해 → PC 실습 → Raspberry Pi 이관"까지 한 번에 경험할 수 있도록 작성되었습니다.**
> **실습 완료 후에는 슈레더 AI 시스템의 Docker 기반 배포 구조를 자연스럽게 이해할 수 있습니다.**
