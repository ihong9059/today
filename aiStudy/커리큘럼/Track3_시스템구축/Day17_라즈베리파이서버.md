# Day 17: 라즈베리 파이 서버 (선택) — "손바닥 위의 서버"

## 학습 목표
- 라즈베리 파이에 OS를 설치하고 서버로 구성한다
- ARM 아키텍처에서 Docker를 설치하고 컨테이너를 실행한다
- 라즈베리 파이를 IoT 게이트웨이 또는 미니 서버로 활용하는 방법을 이해한다
- 클라우드 서버와 로컬 서버의 차이를 체감한다

## 준비물
- 라즈베리 파이 4/5 (4GB 이상 권장)
- MicroSD 카드 (32GB 이상)
- 전원 어댑터 (USB-C 5V 3A)
- Raspberry Pi Imager (PC에 설치)
- 이더넷 케이블 또는 Wi-Fi 환경
- Claude Code CLI (SSH 통해 원격 사용)

## 실습 1: Raspberry Pi OS 설치 + SSH 접속 (30분)

1. Raspberry Pi Imager로 OS를 설치한다
   - OS: Raspberry Pi OS Lite (64-bit)
   - 설정(톱니바퀴): SSH 활성화, 사용자명/비밀번호 설정, Wi-Fi 설정

2. SD 카드를 라즈베리 파이에 넣고 부팅한다

3. IP 주소를 확인하고 SSH로 접속한다

```bash
# 같은 네트워크에서 라즈베리 파이 IP 찾기
ping raspberrypi.local
# 또는
nmap -sn 192.168.1.0/24 | grep -i raspberry
```

4. SSH 접속 후 초기 설정을 한다

```bash
ssh pi@RASPBERRY_PI_IP
sudo apt update && sudo apt upgrade -y
sudo raspi-config
# → Expand Filesystem, Locale, Timezone 설정
```

5. Claude Code에게 시스템 정보를 확인하게 한다

```
Claude에게: "라즈베리 파이의 시스템 정보를 확인해줘. CPU 아키텍처, 메모리, 디스크 용량, 온도, OS 버전을 모두 조사해줘. DigitalOcean 서버와 비교 표도 만들어줘."
```

### 관찰 포인트
- ARM 아키텍처(aarch64)와 x86_64의 차이는?
- 라즈베리 파이의 CPU 온도는 몇 도인가? (`vcgencmd measure_temp`)

## 실습 2: Docker on Raspberry Pi (35분)

1. Docker를 설치한다

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker pi
# 재접속
exit
ssh pi@RASPBERRY_PI_IP
docker --version
```

2. ARM 호환 이미지를 실행한다

```bash
docker run --rm hello-world
docker run -d --name rpi-nginx -p 80:80 nginx:alpine
curl http://localhost
```

3. 시스템 리소스를 확인한다

```bash
docker stats --no-stream
free -h
# CPU 온도 모니터링
vcgencmd measure_temp
```

4. Claude Code에게 ARM 호환성을 점검하게 한다

```
Claude에게: "라즈베리 파이에서 Docker를 사용할 때 주의할 점을 알려줘. ARM 호환 이미지 확인 방법, 리소스 제한 설정 권장값, 발열 관리 방법을 포함해줘."
```

### 관찰 포인트
- x86용 이미지가 ARM에서 실행되지 않는 경우는?
- 라즈베리 파이에서 Docker를 실행하면 메모리 사용량은?

## 실습 3: FastAPI 앱 배포 (30분)

1. Track 2에서 만든 앱을 라즈베리 파이에서 실행한다

```bash
mkdir -p ~/myapp && cd ~/myapp
cat > app.py << 'EOF'
from fastapi import FastAPI
import platform
import psutil
import os

app = FastAPI()

@app.get("/")
def root():
    return {
        "message": "Hello from Raspberry Pi!",
        "arch": platform.machine(),
        "cpu_count": os.cpu_count()
    }

@app.get("/system")
def system_info():
    temp = os.popen("vcgencmd measure_temp").read().strip()
    return {
        "temperature": temp,
        "memory_percent": psutil.virtual_memory().percent,
        "disk_percent": psutil.disk_usage('/').percent,
        "cpu_percent": psutil.cpu_percent(interval=1)
    }
EOF

cat > requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn==0.24.0
psutil==5.9.6
EOF

cat > Dockerfile << 'EOF'
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
EOF
```

2. Docker로 빌드하고 실행한다

```bash
docker build -t rpi-app .
docker run -d --name myapp -p 8000:8000 --device /dev/vchiq rpi-app
curl http://localhost:8000
curl http://localhost:8000/system
```

3. 같은 네트워크의 PC에서 접속한다

```
브라우저: http://RASPBERRY_PI_IP:8000/system
```

### 관찰 포인트
- 라즈베리 파이에서 Docker 이미지 빌드 시간은 얼마나 걸리는가?
- 클라우드 서버 대비 응답 속도 차이는?

## 실습 4: Tailscale로 외부 접속 + IoT 게이트웨이 (25분)

1. 라즈베리 파이에 Tailscale을 설치한다

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
tailscale status
```

2. 외부에서 Tailscale VPN으로 접속한다

```bash
# 다른 네트워크(모바일 테더링 등)에서
curl http://100.x.x.x:8000/system
```

3. Claude Code에게 IoT 활용 시나리오를 분석하게 한다

```
Claude에게: "라즈베리 파이를 IoT 게이트웨이로 활용하는 시나리오를 설계해줘. UTTEC 보드(ESP32)에서 센서 데이터를 수집하고, 라즈베리 파이에서 FastAPI로 받아서 저장하고, 클라우드 서버로 동기화하는 구조를 설명해줘."
```

### 관찰 포인트
- 라즈베리 파이가 IoT에 적합한 이유는?
- 클라우드 서버만 사용하는 것 대비 로컬 서버(RPi)를 추가하는 장점은?

## 과제

### 제출물: "라즈베리 파이 서버 구축 보고서"

```markdown
# 라즈베리 파이 서버 구축 보고서

## 하드웨어 정보
- 모델:
- CPU:
- 메모리:
- 저장장치:
- OS:

## 클라우드 vs 라즈베리 파이 비교
| 항목 | DigitalOcean | Raspberry Pi |
|------|-------------|-------------|
| CPU | | |
| 메모리 | | |
| 디스크 | | |
| 네트워크 | | |
| 비용(월) | | |
| 전력 소비 | | |
| 물리적 접근 | | |

## Docker 동작 확인
| 이미지 | 빌드 시간 | 실행 결과 | 메모리 사용 |
|--------|----------|----------|-----------|
| nginx:alpine | | | |
| rpi-app | | | |

## 시스템 모니터링 결과
- CPU 온도:
- 메모리 사용률:
- 디스크 사용률:

## IoT 게이트웨이 활용 아이디어
1.
2.
3.

## 라즈베리 파이 서버의 장단점
### 장점
1.
2.
### 단점
1.
2.
```

## 강사 참고 사항
- 라즈베리 파이가 없는 학생은 DigitalOcean에서 ARM 인스턴스를 사용하거나 시연만 참관한다
- SD 카드 수명 이슈가 있으므로 프로덕션 용도가 아닌 학습/프로토타입 용도임을 설명한다
- UTTEC 보드(ESP32)와 라즈베리 파이의 역할 차이를 명확히 구분한다: ESP32는 센서/액추에이터, RPi는 게이트웨이/서버
