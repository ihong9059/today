# Pi Zero W USB SSH 연결 가이드 (호스트별)

**작성일:** 2026-02-03
**대상 장치:** Raspberry Pi Zero W (uttec / 192.168.0.15 / USB: 10.0.0.2)

---

## 목차

1. [개요](#1-개요)
2. [Pi Zero W 사전 설정 (공통)](#2-pi-zero-w-사전-설정-공통)
3. [Windows에서 USB SSH 연결](#3-windows에서-usb-ssh-연결)
4. [Raspberry Pi 3/4에서 USB SSH 연결](#4-raspberry-pi-34에서-usb-ssh-연결)
5. [macOS에서 USB SSH 연결](#5-macos에서-usb-ssh-연결)
6. [Python 프로그램 작성 및 실행](#6-python-프로그램-작성-및-실행)
7. [트러블슈팅](#7-트러블슈팅)

---

## 1. 개요

### 1.1 연결 구성도

```
┌─────────────────┐                      ┌─────────────────┐
│      Host       │      USB Cable       │   Pi Zero W     │
│  (Win/RPi/Mac)  │ ◄──────────────────► │                 │
│                 │                      │                 │
│  IP: 10.0.0.1   │    USB Ethernet      │  IP: 10.0.0.2   │
└─────────────────┘     (CDC Gadget)     └─────────────────┘
```

### 1.2 Pi Zero W 정보

| 항목 | 값 |
|:-----|:---|
| 호스트명 | uttec |
| 사용자 | uttec |
| 비밀번호 | uttec |
| WiFi IP | 192.168.0.15 |
| USB IP | 10.0.0.2 |

### 1.3 USB 포트 확인 (중요!)

```
┌─────────────────────────────────────────┐
│           Raspberry Pi Zero W           │
│  [Mini HDMI]  [USB Data]  [USB Power]   │
│                   ▲                     │
│           이 포트에 연결!               │
└─────────────────────────────────────────┘
```

**반드시 가운데 USB Data 포트 사용** (오른쪽은 전원 전용)

---

## 2. Pi Zero W 사전 설정 (공통)

Pi Zero W에는 이미 다음 설정이 완료되어 있습니다.

### 2.1 /boot/firmware/config.txt

```bash
[all]
enable_uart=1
# USB OTG Ethernet Gadget Mode for Pi Zero W
dtoverlay=dwc2
```

### 2.2 /boot/firmware/cmdline.txt

```bash
console=serial0,115200 console=tty1 root=PARTUUID=81e41361-02 rootfstype=ext4 fsck.repair=yes rootwait modules-load=dwc2,g_cdc cfg80211.ieee80211_regdom=KR
```

**핵심:** `modules-load=dwc2,g_cdc`
- `g_cdc`: macOS/Windows/Linux 모두 호환
- `g_ether`: Linux만 호환 (RNDIS)

### 2.3 /etc/dhcpcd.conf (고정 IP)

```bash
# USB Ethernet Gadget - Static IP
interface usb0
static ip_address=10.0.0.2/24
```

### 2.4 SSH 활성화

```bash
sudo systemctl enable ssh
sudo systemctl start ssh
```

---

## 3. Windows에서 USB SSH 연결

### 3.1 드라이버 설치

Windows 10/11은 CDC Ethernet 드라이버를 **자동 설치**합니다.

**확인 방법:**
1. Pi Zero W를 USB로 연결
2. `장치 관리자` 열기 (Win + X → 장치 관리자)
3. `네트워크 어댑터`에서 확인:
   - `USB Ethernet/RNDIS Gadget` 또는
   - `Remote NDIS Compatible Device` 또는
   - `USB Serial Device (COMx)`

**드라이버가 없는 경우:**
1. [RNDIS 드라이버 다운로드](https://www.catalog.update.microsoft.com/Search.aspx?q=RNDIS)
2. 장치 관리자 → 알 수 없는 장치 → 드라이버 업데이트 → 수동 설치

### 3.2 네트워크 인터페이스 확인

**PowerShell:**
```powershell
# 네트워크 어댑터 목록
Get-NetAdapter

# USB Ethernet 어댑터 찾기
Get-NetAdapter | Where-Object { $_.InterfaceDescription -like "*USB*" -or $_.InterfaceDescription -like "*RNDIS*" }
```

**CMD:**
```cmd
ipconfig /all
```

`Ethernet adapter` 또는 `이더넷 어댑터`에서 새로운 어댑터 확인

### 3.3 고정 IP 설정

#### 방법 A: GUI (네트워크 설정)

1. `설정` → `네트워크 및 인터넷` → `이더넷`
2. 새로 생긴 USB 네트워크 어댑터 선택
3. `IP 설정` → `편집`
4. 다음 값 입력:
   - IP 주소: `10.0.0.1`
   - 서브넷 마스크: `255.255.255.0` (또는 접두사 길이: 24)
   - 게이트웨이: (비워둠)
5. `저장`

#### 방법 B: PowerShell (관리자 권한)

```powershell
# 어댑터 이름 확인
Get-NetAdapter

# 어댑터 이름이 "이더넷 2"인 경우 (실제 이름으로 변경)
$adapterName = "이더넷 2"

# 기존 IP 제거
Remove-NetIPAddress -InterfaceAlias $adapterName -Confirm:$false -ErrorAction SilentlyContinue

# 고정 IP 설정
New-NetIPAddress -InterfaceAlias $adapterName -IPAddress 10.0.0.1 -PrefixLength 24

# 확인
Get-NetIPAddress -InterfaceAlias $adapterName
```

#### 방법 C: netsh (CMD 관리자 권한)

```cmd
:: 어댑터 이름 확인
netsh interface show interface

:: 고정 IP 설정 (어댑터 이름이 "이더넷 2"인 경우)
netsh interface ip set address name="이더넷 2" static 10.0.0.1 255.255.255.0
```

### 3.4 연결 테스트

**PowerShell/CMD:**
```cmd
:: Ping 테스트
ping 10.0.0.2

:: SSH 접속 (Windows 10 이상 기본 제공)
ssh uttec@10.0.0.2
```

**PuTTY 사용:**
1. Host Name: `10.0.0.2`
2. Port: `22`
3. Connection type: `SSH`
4. Open → 로그인: `uttec` / `uttec`

### 3.5 Windows 영구 설정

위의 GUI 방법으로 설정하면 **재부팅 후에도 유지**됩니다.

PowerShell로 설정한 경우에도 영구 적용됩니다.

---

## 4. Raspberry Pi 3/4에서 USB SSH 연결

### 4.1 물리적 연결

```
┌─────────────────┐                      ┌─────────────────┐
│  Raspberry Pi   │      USB Cable       │   Pi Zero W     │
│     3 / 4       │ ◄──────────────────► │                 │
│                 │                      │                 │
│  USB-A 포트     │                      │  USB Data 포트  │
│  (아무거나)      │                      │  (가운데)        │
└─────────────────┘                      └─────────────────┘
```

Pi Zero W의 **USB Data 포트(가운데)** → Pi 3/4의 **USB-A 포트(아무거나)**

### 4.2 USB 인터페이스 확인

Pi Zero W를 연결한 후 Pi 3/4에서:

```bash
# USB 장치 확인
lsusb
# 출력 예: Bus 001 Device 005: ID 0525:a4aa PLX Technology, Inc. Linux-USB CDC Composite Gadget

# 네트워크 인터페이스 확인
ip link show
# usb0 또는 eth1 등으로 표시됨

# dmesg 로그 확인
dmesg | tail -20
# cdc_ether 또는 cdc_acm 관련 메시지 확인
```

### 4.3 고정 IP 설정

#### 방법 A: 임시 설정 (재부팅 시 사라짐)

```bash
# 인터페이스 이름 확인 (usb0 또는 다른 이름)
ip link show

# IP 할당 (usb0인 경우)
sudo ip addr add 10.0.0.1/24 dev usb0
sudo ip link set usb0 up

# 확인
ip addr show usb0
```

#### 방법 B: dhcpcd.conf로 영구 설정

```bash
sudo nano /etc/dhcpcd.conf
```

파일 끝에 추가:
```bash
# Pi Zero W USB 연결용
interface usb0
static ip_address=10.0.0.1/24
```

저장 후 적용:
```bash
sudo systemctl restart dhcpcd
```

#### 방법 C: /etc/network/interfaces로 영구 설정

```bash
sudo nano /etc/network/interfaces
```

추가:
```bash
# Pi Zero W USB 연결
allow-hotplug usb0
iface usb0 inet static
    address 10.0.0.1
    netmask 255.255.255.0
```

### 4.4 DHCP 서버 설정 (선택사항)

Pi Zero W의 dhcpcd.conf 고정 IP 대신 Pi 3/4에서 DHCP로 IP를 할당할 수도 있습니다.

```bash
# dnsmasq 설치
sudo apt update
sudo apt install dnsmasq -y

# 설정 파일 생성
sudo nano /etc/dnsmasq.d/usb0.conf
```

내용:
```bash
interface=usb0
dhcp-range=10.0.0.2,10.0.0.10,255.255.255.0,24h
```

서비스 재시작:
```bash
sudo systemctl restart dnsmasq
sudo systemctl enable dnsmasq
```

### 4.5 연결 테스트

```bash
# Ping 테스트
ping -c 3 10.0.0.2

# SSH 접속
ssh uttec@10.0.0.2
# 비밀번호: uttec
```

### 4.6 SSH 키 설정 (비밀번호 없이 접속)

```bash
# Pi 3/4에서 SSH 키 생성 (이미 있으면 생략)
ssh-keygen -t ed25519 -C "rpi3-to-zero"

# 공개키를 Pi Zero W에 복사
ssh-copy-id uttec@10.0.0.2

# 이후 비밀번호 없이 접속 가능
ssh uttec@10.0.0.2
```

### 4.7 인터넷 공유 (Pi 3/4 → Pi Zero W)

Pi 3/4가 WiFi/이더넷으로 인터넷에 연결되어 있다면:

```bash
# Pi 3/4에서 실행

# IP 포워딩 활성화
sudo sysctl -w net.ipv4.ip_forward=1

# 영구 설정
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf

# NAT 설정 (wlan0이 인터넷 인터페이스인 경우)
sudo iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE
sudo iptables -A FORWARD -i usb0 -o wlan0 -j ACCEPT
sudo iptables -A FORWARD -i wlan0 -o usb0 -m state --state RELATED,ESTABLISHED -j ACCEPT

# iptables 규칙 저장
sudo apt install iptables-persistent -y
sudo netfilter-persistent save
```

Pi Zero W에서 게이트웨이 설정:
```bash
# Pi Zero W에서 실행
sudo ip route add default via 10.0.0.1
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
```

---

## 5. macOS에서 USB SSH 연결

### 5.1 연결 확인

Pi Zero W 연결 후:

```bash
# USB 장치 확인
system_profiler SPUSBDataType | grep -A 10 "CDC\|Gadget"

# 네트워크 인터페이스 확인
ifconfig | grep -A 5 "en[0-9]"
```

새로운 `en` 인터페이스 (예: en6, en7)가 생성됨

### 5.2 고정 IP 설정

#### 방법 A: 터미널 (임시)

```bash
sudo ifconfig en6 10.0.0.1 netmask 255.255.255.0
```

#### 방법 B: 시스템 환경설정 (영구)

1. `시스템 환경설정` → `네트워크`
2. 왼쪽 목록에서 `RNDIS/Ethernet Gadget` 또는 새로 생긴 USB 네트워크 선택
3. `IPv4 구성`: 수동
4. IP 주소: `10.0.0.1`
5. 서브넷 마스크: `255.255.255.0`
6. `적용`

### 5.3 연결 테스트

```bash
ping 10.0.0.2
ssh uttec@10.0.0.2
```

---

## 6. Python 프로그램 작성 및 실행

### 6.1 호스트에서 Pi Zero W로 파일 전송

#### SCP 사용

```bash
# 단일 파일 전송
scp my_program.py uttec@10.0.0.2:/home/uttec/

# 폴더 전송
scp -r my_project/ uttec@10.0.0.2:/home/uttec/
```

#### rsync 사용 (대용량/동기화)

```bash
rsync -avz my_project/ uttec@10.0.0.2:/home/uttec/my_project/
```

### 6.2 Pi Zero W에서 Python 환경 설정

```bash
# SSH 접속
ssh uttec@10.0.0.2

# Python 버전 확인
python3 --version

# pip 설치 (없는 경우)
sudo apt update
sudo apt install python3-pip -y

# 가상환경 생성 (권장)
python3 -m venv ~/myenv
source ~/myenv/bin/activate

# 필요한 패키지 설치
pip install RPi.GPIO gpiozero
```

### 6.3 예제: LED 제어 프로그램

#### led_blink.py

```python
#!/usr/bin/env python3
"""
Pi Zero W LED 깜빡이기 예제
GPIO 17에 LED 연결 (330옴 저항 사용)
"""

import RPi.GPIO as GPIO
import time

# GPIO 설정
LED_PIN = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(LED_PIN, GPIO.OUT)

print("LED 깜빡이기 시작 (Ctrl+C로 종료)")

try:
    while True:
        GPIO.output(LED_PIN, GPIO.HIGH)
        print("LED ON")
        time.sleep(1)

        GPIO.output(LED_PIN, GPIO.LOW)
        print("LED OFF")
        time.sleep(1)

except KeyboardInterrupt:
    print("\n프로그램 종료")

finally:
    GPIO.cleanup()
```

#### 실행 방법

```bash
# 호스트에서 파일 전송
scp led_blink.py uttec@10.0.0.2:/home/uttec/

# Pi Zero W에서 실행
ssh uttec@10.0.0.2 "python3 /home/uttec/led_blink.py"

# 또는 SSH 접속 후 실행
ssh uttec@10.0.0.2
python3 led_blink.py
```

### 6.4 예제: 온도 센서 읽기 (DHT11/DHT22)

#### temp_sensor.py

```python
#!/usr/bin/env python3
"""
DHT11/DHT22 온습도 센서 읽기
GPIO 4에 센서 연결
"""

import Adafruit_DHT
import time

# 센서 설정
SENSOR = Adafruit_DHT.DHT11  # DHT22는 Adafruit_DHT.DHT22
PIN = 4

print("온습도 측정 시작 (Ctrl+C로 종료)")

try:
    while True:
        humidity, temperature = Adafruit_DHT.read_retry(SENSOR, PIN)

        if humidity is not None and temperature is not None:
            print(f"온도: {temperature:.1f}°C, 습도: {humidity:.1f}%")
        else:
            print("센서 읽기 실패")

        time.sleep(2)

except KeyboardInterrupt:
    print("\n프로그램 종료")
```

#### 설치 및 실행

```bash
# 라이브러리 설치
pip install Adafruit_DHT

# 실행
python3 temp_sensor.py
```

### 6.5 예제: 웹 서버 (Flask)

#### web_server.py

```python
#!/usr/bin/env python3
"""
Pi Zero W 간단한 웹 서버
http://10.0.0.2:5000 으로 접속
"""

from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return '''
    <html>
    <head><title>Pi Zero W</title></head>
    <body>
        <h1>Pi Zero W Web Server</h1>
        <p>USB로 연결된 Pi Zero W입니다!</p>
        <ul>
            <li><a href="/api/system">시스템 정보</a></li>
            <li><a href="/api/temperature">CPU 온도</a></li>
        </ul>
    </body>
    </html>
    '''

@app.route('/api/system')
def system_info():
    hostname = os.popen('hostname').read().strip()
    uptime = os.popen('uptime -p').read().strip()
    return jsonify({
        'hostname': hostname,
        'uptime': uptime
    })

@app.route('/api/temperature')
def temperature():
    temp = os.popen('vcgencmd measure_temp').read().strip()
    return jsonify({'cpu_temp': temp})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

#### 실행

```bash
# Flask 설치
pip install flask

# 서버 실행
python3 web_server.py
```

호스트 브라우저에서 `http://10.0.0.2:5000` 접속

### 6.6 호스트에서 원격 실행 스크립트

#### run_on_zero.sh (Linux/macOS)

```bash
#!/bin/bash
# Pi Zero W에서 Python 스크립트 원격 실행

ZERO_IP="10.0.0.2"
ZERO_USER="uttec"
SCRIPT_PATH="$1"

if [ -z "$SCRIPT_PATH" ]; then
    echo "Usage: $0 <script.py>"
    exit 1
fi

# 파일 전송
scp "$SCRIPT_PATH" ${ZERO_USER}@${ZERO_IP}:/home/${ZERO_USER}/

# 원격 실행
SCRIPT_NAME=$(basename "$SCRIPT_PATH")
ssh ${ZERO_USER}@${ZERO_IP} "python3 /home/${ZERO_USER}/${SCRIPT_NAME}"
```

#### run_on_zero.ps1 (Windows PowerShell)

```powershell
# Pi Zero W에서 Python 스크립트 원격 실행

param(
    [Parameter(Mandatory=$true)]
    [string]$ScriptPath
)

$ZERO_IP = "10.0.0.2"
$ZERO_USER = "uttec"

# 파일 전송
scp $ScriptPath "${ZERO_USER}@${ZERO_IP}:/home/${ZERO_USER}/"

# 원격 실행
$ScriptName = Split-Path $ScriptPath -Leaf
ssh "${ZERO_USER}@${ZERO_IP}" "python3 /home/${ZERO_USER}/${ScriptName}"
```

사용 예:
```bash
# Linux/macOS
./run_on_zero.sh my_program.py

# Windows PowerShell
.\run_on_zero.ps1 -ScriptPath my_program.py
```

---

## 7. 트러블슈팅

### 7.1 USB 장치가 인식되지 않음

**증상:** 호스트에서 USB 장치가 보이지 않음

**해결:**
1. USB 케이블 확인 (데이터 케이블인지, 충전 전용인지)
2. Pi Zero W의 **USB Data 포트(가운데)** 에 연결했는지 확인
3. Pi Zero W 재부팅
4. `/boot/firmware/cmdline.txt`에 `modules-load=dwc2,g_cdc` 있는지 확인

```bash
# Pi Zero W에서 확인 (WiFi로 접속)
cat /boot/firmware/cmdline.txt | grep g_cdc
```

### 7.2 네트워크 인터페이스가 생성되지 않음

**증상:** USB 장치는 보이지만 네트워크 인터페이스(usb0, en6 등)가 없음

**Windows:**
```powershell
# 드라이버 재설치
pnputil /scan-devices
```

**Linux/Raspberry Pi:**
```bash
# 커널 모듈 확인
lsmod | grep cdc

# 수동 로드
sudo modprobe cdc_ether
```

### 7.3 Ping이 안 됨

**증상:** 네트워크 인터페이스는 있지만 ping 실패

**확인사항:**
1. 양쪽 IP가 같은 서브넷인지 (10.0.0.x/24)
2. 방화벽 확인

**Pi Zero W:**
```bash
ip addr show usb0
# inet 10.0.0.2/24 가 있어야 함
```

**호스트:**
```bash
# Linux/macOS
ifconfig | grep 10.0.0

# Windows
ipconfig | findstr 10.0.0
```

### 7.4 SSH 연결 거부

**증상:** `Connection refused`

**해결:**
```bash
# Pi Zero W에서 SSH 상태 확인 (WiFi로 접속)
ssh uttec@192.168.0.15 "sudo systemctl status ssh"

# SSH 재시작
ssh uttec@192.168.0.15 "sudo systemctl restart ssh"
```

### 7.5 호스트 키 변경 오류

**증상:** `WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!`

**해결:**
```bash
# Linux/macOS
ssh-keygen -R 10.0.0.2

# Windows (PowerShell)
ssh-keygen -R 10.0.0.2
# 또는 직접 편집
notepad $env:USERPROFILE\.ssh\known_hosts
```

### 7.6 Pi Zero W 전원 부족

**증상:** 연결 후 Pi Zero W가 재부팅되거나 불안정

**해결:**
1. 전원 공급 USB 허브 사용
2. Pi Zero W의 **USB Power 포트(오른쪽)** 에 별도 전원 연결
3. 저전력 사용 설정

```bash
# Pi Zero W에서 /boot/firmware/config.txt에 추가
sudo nano /boot/firmware/config.txt
```
```
# 전력 소모 감소
arm_freq=700
over_voltage=0
```

---

## 부록: 빠른 참조

### 연결 정보

| 항목 | 값 |
|:-----|:---|
| Pi Zero W 호스트명 | uttec |
| 사용자 / 비밀번호 | uttec / uttec |
| WiFi IP | 192.168.0.15 |
| USB IP | 10.0.0.2 |
| 호스트 USB IP | 10.0.0.1 |
| 서브넷 마스크 | 255.255.255.0 |

### SSH 명령어

```bash
# WiFi로 접속
ssh uttec@192.168.0.15

# USB로 접속
ssh uttec@10.0.0.2
```

### 파일 전송

```bash
# 호스트 → Pi Zero W
scp file.py uttec@10.0.0.2:/home/uttec/

# Pi Zero W → 호스트
scp uttec@10.0.0.2:/home/uttec/file.py ./
```

### Python 실행

```bash
# 로컬에서 원격 실행
ssh uttec@10.0.0.2 "python3 /home/uttec/script.py"

# 또는 접속 후 실행
ssh uttec@10.0.0.2
python3 script.py
```

---

*작성일: 2026-02-03*
