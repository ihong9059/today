# Raspberry Pi Zero SSH 연결 가이드

**작성일:** 2026-02-03
**목적:** Raspberry Pi Zero를 Raspberry Pi 3/4와 SSH로 연결하는 방법

---

## 목차

1. [개요](#1-개요)
2. [하드웨어 준비](#2-하드웨어-준비)
3. [연결 방식 비교](#3-연결-방식-비교)
4. [방법 1: USB OTG 연결 (Pi Zero → Pi 3/4)](#4-방법-1-usb-otg-연결-pi-zero--pi-34)
5. [방법 2: WiFi 네트워크 연결](#5-방법-2-wifi-네트워크-연결)
6. [방법 3: 이더넷 가젯 모드 (USB Ethernet)](#6-방법-3-이더넷-가젯-모드-usb-ethernet)
7. [방법 4: UART 시리얼 연결](#7-방법-4-uart-시리얼-연결)
8. [SSH 키 기반 인증 설정](#8-ssh-키-기반-인증-설정)
9. [트러블슈팅](#9-트러블슈팅)
10. [유용한 명령어 모음](#10-유용한-명령어-모음)

---

## 1. 개요

### 1.1 Raspberry Pi Zero 특징

| 모델 | CPU | RAM | WiFi | Bluetooth | USB |
|:-----|:----|:----|:----:|:---------:|:----|
| Pi Zero | 1GHz Single-core | 512MB | ❌ | ❌ | Micro USB (OTG) |
| Pi Zero W | 1GHz Single-core | 512MB | ✅ 2.4GHz | ✅ 4.0 | Micro USB (OTG) |
| Pi Zero 2 W | 1GHz Quad-core | 512MB | ✅ 2.4GHz | ✅ 4.2 | Micro USB (OTG) |

### 1.2 연결 시나리오

```
┌─────────────────┐         SSH          ┌─────────────────┐
│  Raspberry Pi   │ ◄──────────────────► │  Raspberry Pi   │
│     Zero (W)    │                      │      3 / 4      │
└─────────────────┘                      └─────────────────┘
     (클라이언트)                              (서버/호스트)
```

**목표:** Pi Zero에서 Pi 3/4로 SSH 접속하거나, Pi 3/4에서 Pi Zero로 SSH 접속

---

## 2. 하드웨어 준비

### 2.1 필수 장비

| 장비 | Pi Zero | Pi Zero W/2W | 용도 |
|:-----|:-------:|:------------:|:-----|
| MicroSD 카드 (8GB+) | ✅ | ✅ | OS 설치 |
| Micro USB 케이블 | ✅ | ✅ | 전원/데이터 |
| USB OTG 어댑터 | ✅ | 선택 | USB 장치 연결 |
| USB WiFi 동글 | ✅ | ❌ | 무선 연결 (Pi Zero 전용) |
| Mini HDMI 어댑터 | 선택 | 선택 | 모니터 연결 |
| USB 허브 | 선택 | 선택 | 키보드/마우스 연결 |

### 2.2 Pi Zero 포트 구성

```
┌──────────────────────────────────────────────────┐
│                 Raspberry Pi Zero                │
├──────────────────────────────────────────────────┤
│                                                  │
│  [Mini HDMI]  [USB Data/OTG]  [USB Power]       │
│                    ▲               ▲             │
│                    │               │             │
│              데이터 전송      전원 공급 전용      │
│                                                  │
└──────────────────────────────────────────────────┘
```

**중요:** USB 포트가 2개인데, **왼쪽이 데이터용(OTG)**, **오른쪽이 전원 전용**입니다.

---

## 3. 연결 방식 비교

| 방식 | 난이도 | 속도 | 추가 장비 | Pi Zero W | Pi Zero |
|:-----|:------:|:----:|:----------|:---------:|:-------:|
| WiFi 네트워크 | ★☆☆ | 빠름 | 공유기 | ✅ | USB 동글 필요 |
| USB 이더넷 가젯 | ★★☆ | 중간 | USB 케이블 | ✅ | ✅ |
| UART 시리얼 | ★★★ | 느림 | 점퍼선 | ✅ | ✅ |
| USB OTG + 허브 | ★★☆ | 중간 | 허브, 동글 | ✅ | ✅ |

---

## 4. 방법 1: USB OTG 연결 (Pi Zero → Pi 3/4)

USB OTG를 통해 Pi Zero를 Pi 3/4에 직접 연결하여 이더넷처럼 사용하는 방법입니다.

### 4.1 Pi Zero SD 카드 설정

#### Step 1: Raspberry Pi OS 이미지 굽기

```bash
# Raspberry Pi Imager 사용 권장
# https://www.raspberrypi.com/software/

# 또는 dd 명령어 사용 (Linux/Mac)
sudo dd bs=4M if=raspios.img of=/dev/sdX status=progress
sync
```

#### Step 2: boot 파티션 설정

SD 카드의 boot 파티션을 마운트하고 다음 파일들을 수정합니다.

**config.txt 수정** - 맨 아래에 추가:
```bash
# USB OTG 이더넷 가젯 모드 활성화
dtoverlay=dwc2
```

**cmdline.txt 수정** - `rootwait` 뒤에 추가 (한 줄로 유지):
```
... rootwait modules-load=dwc2,g_ether ...
```

**주의:** cmdline.txt는 반드시 한 줄로 유지해야 합니다!

#### Step 3: SSH 활성화

boot 파티션에 빈 `ssh` 파일 생성:
```bash
touch /boot/ssh
# 또는 Windows에서는 빈 파일 'ssh' (확장자 없음) 생성
```

### 4.2 Pi 3/4 호스트 설정

#### Step 1: USB RNDIS/Ethernet 드라이버 확인

Pi 3/4에서 Pi Zero를 USB로 연결하면 자동으로 usb0 인터페이스가 생성됩니다.

```bash
# Pi Zero 연결 후 확인
ip link show
# usb0 인터페이스가 보여야 함

dmesg | tail -20
# RNDIS 또는 CDC Ethernet 관련 메시지 확인
```

#### Step 2: 고정 IP 설정 (Pi 3/4)

`/etc/dhcpcd.conf` 파일 수정:
```bash
sudo nano /etc/dhcpcd.conf
```

아래 내용 추가:
```bash
# USB 이더넷 (Pi Zero 연결용)
interface usb0
static ip_address=10.0.0.1/24
```

#### Step 3: DHCP 서버 설정 (Pi 3/4)

dnsmasq 설치 및 설정:
```bash
sudo apt update
sudo apt install dnsmasq -y
```

`/etc/dnsmasq.d/usb0.conf` 파일 생성:
```bash
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

### 4.3 연결 및 SSH 접속

```bash
# Pi Zero를 Pi 3/4의 USB 포트에 연결 (Pi Zero의 USB Data 포트 사용)

# Pi 3/4에서 Pi Zero 찾기
ping 10.0.0.2

# SSH 접속
ssh pi@10.0.0.2
# 기본 비밀번호: raspberry
```

### 4.4 인터넷 공유 설정 (선택)

Pi 3/4의 인터넷을 Pi Zero에 공유하려면:

```bash
# Pi 3/4에서 실행
# IP 포워딩 활성화
sudo sysctl -w net.ipv4.ip_forward=1

# 영구 설정
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf

# NAT 설정 (wlan0이 인터넷에 연결된 인터페이스라면)
sudo iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE
sudo iptables -A FORWARD -i usb0 -o wlan0 -j ACCEPT
sudo iptables -A FORWARD -i wlan0 -o usb0 -m state --state RELATED,ESTABLISHED -j ACCEPT

# iptables 규칙 저장
sudo apt install iptables-persistent -y
sudo netfilter-persistent save
```

Pi Zero에서 게이트웨이 설정:
```bash
# Pi Zero에서 실행
sudo ip route add default via 10.0.0.1
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
```

---

## 5. 방법 2: WiFi 네트워크 연결

Pi Zero W/2W 또는 USB WiFi 동글을 사용하는 경우 가장 간단한 방법입니다.

### 5.1 Headless WiFi 설정 (SD 카드에서 직접 설정)

#### Step 1: wpa_supplicant.conf 파일 생성

boot 파티션에 `wpa_supplicant.conf` 파일 생성:

```bash
# /boot/wpa_supplicant.conf
country=KR
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="YOUR_WIFI_SSID"
    psk="YOUR_WIFI_PASSWORD"
    key_mgmt=WPA-PSK
    priority=1
}
```

**여러 네트워크 설정 (우선순위 지정):**
```bash
country=KR
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="HOME_WIFI"
    psk="home_password"
    key_mgmt=WPA-PSK
    priority=2
}

network={
    ssid="OFFICE_WIFI"
    psk="office_password"
    key_mgmt=WPA-PSK
    priority=1
}
```

#### Step 2: SSH 활성화

```bash
touch /boot/ssh
```

### 5.2 Pi Zero 부팅 후 IP 확인

#### 방법 A: 공유기 관리 페이지에서 확인
- 공유기 관리 페이지 접속 (보통 192.168.0.1 또는 192.168.1.1)
- 연결된 장치 목록에서 'raspberrypi' 찾기

#### 방법 B: Pi 3/4에서 네트워크 스캔

```bash
# nmap 설치
sudo apt install nmap -y

# 같은 네트워크 스캔
nmap -sn 192.168.0.0/24

# 또는 arp-scan 사용
sudo apt install arp-scan -y
sudo arp-scan --localnet
```

#### 방법 C: avahi (mDNS) 사용

Pi Zero가 avahi-daemon을 실행 중이면:
```bash
# Pi 3/4에서 실행
ping raspberrypi.local

# SSH 접속
ssh pi@raspberrypi.local
```

### 5.3 고정 IP 설정 (권장)

Pi Zero에서 `/etc/dhcpcd.conf` 수정:
```bash
sudo nano /etc/dhcpcd.conf
```

추가:
```bash
interface wlan0
static ip_address=192.168.0.100/24
static routers=192.168.0.1
static domain_name_servers=192.168.0.1 8.8.8.8
```

재부팅:
```bash
sudo reboot
```

### 5.4 SSH 접속

```bash
# Pi 3/4에서 Pi Zero로 접속
ssh pi@192.168.0.100

# 또는 Pi Zero에서 Pi 3/4로 접속
ssh pi@192.168.0.XXX  # Pi 3/4의 IP
```

---

## 6. 방법 3: 이더넷 가젯 모드 (USB Ethernet)

PC나 다른 Raspberry Pi에 USB로 직접 연결하여 네트워크 인터페이스처럼 사용합니다.

### 6.1 Pi Zero 설정 (Headless)

#### config.txt 수정:
```bash
# /boot/config.txt 맨 아래에 추가
dtoverlay=dwc2
```

#### cmdline.txt 수정:
`rootwait` 뒤에 공백 하나 추가 후:
```
modules-load=dwc2,g_ether
```

**전체 cmdline.txt 예시:**
```
console=serial0,115200 console=tty1 root=PARTUUID=xxxxx rootfstype=ext4 fsck.repair=yes rootwait modules-load=dwc2,g_ether
```

#### SSH 활성화:
```bash
touch /boot/ssh
```

### 6.2 호스트(Pi 3/4) 설정

Pi Zero를 USB로 연결하면 `usb0` 인터페이스가 자동 생성됩니다.

```bash
# 인터페이스 확인
ip addr show usb0

# 수동 IP 할당
sudo ip addr add 10.0.0.1/24 dev usb0
sudo ip link set usb0 up
```

### 6.3 Pi Zero에 IP 할당

Pi Zero 콘솔에 접근할 수 있다면:
```bash
sudo ip addr add 10.0.0.2/24 dev usb0
sudo ip link set usb0 up
```

또는 Pi 3/4에서 DHCP 서버 실행 (4.2절 참조)

### 6.4 SSH 접속

```bash
ssh pi@10.0.0.2
```

---

## 7. 방법 4: UART 시리얼 연결

GPIO를 통한 시리얼 연결로, 네트워크 설정 전 초기 설정에 유용합니다.

### 7.1 핀 연결

```
Pi Zero                    Pi 3/4
───────                    ──────
GND (Pin 6)  ──────────►  GND (Pin 6)
TX  (Pin 8)  ──────────►  RX  (Pin 10)
RX  (Pin 10) ──────────►  TX  (Pin 8)
```

**주의:** TX와 RX를 교차 연결합니다 (TX→RX, RX→TX)

### 7.2 Pi Zero UART 활성화

`/boot/config.txt`에 추가:
```bash
enable_uart=1
```

### 7.3 Pi 3/4에서 시리얼 콘솔 접속

```bash
# minicom 설치
sudo apt install minicom -y

# 시리얼 접속
sudo minicom -b 115200 -D /dev/serial0

# 또는 screen 사용
sudo screen /dev/serial0 115200
```

### 7.4 시리얼 콘솔에서 네트워크 설정

시리얼로 접속 후 WiFi나 다른 네트워크를 설정하고 SSH로 전환합니다.

```bash
# WiFi 설정
sudo raspi-config
# Network Options → Wi-Fi 선택

# 또는 직접 설정
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```

---

## 8. SSH 키 기반 인증 설정

비밀번호 없이 SSH 접속을 위한 키 인증 설정입니다.

### 8.1 SSH 키 생성 (Pi 3/4에서)

```bash
# RSA 키 생성
ssh-keygen -t rsa -b 4096 -C "pi3-to-zero"

# 또는 Ed25519 키 (더 안전하고 빠름)
ssh-keygen -t ed25519 -C "pi3-to-zero"

# 기본 위치: ~/.ssh/id_rsa 또는 ~/.ssh/id_ed25519
```

### 8.2 공개키를 Pi Zero에 복사

```bash
# ssh-copy-id 사용 (가장 쉬움)
ssh-copy-id pi@10.0.0.2

# 또는 수동으로 복사
cat ~/.ssh/id_rsa.pub | ssh pi@10.0.0.2 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### 8.3 SSH 설정 파일 구성

`~/.ssh/config` 파일 생성/수정:
```bash
nano ~/.ssh/config
```

내용:
```bash
# Pi Zero (USB 연결)
Host pizero-usb
    HostName 10.0.0.2
    User pi
    IdentityFile ~/.ssh/id_rsa

# Pi Zero (WiFi)
Host pizero-wifi
    HostName 192.168.0.100
    User pi
    IdentityFile ~/.ssh/id_rsa

# Pi Zero (mDNS)
Host pizero
    HostName raspberrypi.local
    User pi
    IdentityFile ~/.ssh/id_rsa
```

### 8.4 간편 접속

```bash
# 설정 후 간단하게 접속
ssh pizero-usb
ssh pizero-wifi
ssh pizero
```

### 8.5 비밀번호 인증 비활성화 (보안 강화)

Pi Zero의 `/etc/ssh/sshd_config` 수정:
```bash
sudo nano /etc/ssh/sshd_config
```

변경:
```bash
PasswordAuthentication no
PubkeyAuthentication yes
```

SSH 서비스 재시작:
```bash
sudo systemctl restart sshd
```

---

## 9. 트러블슈팅

### 9.1 SSH 연결 거부

**증상:** `Connection refused` 또는 `No route to host`

**해결:**
```bash
# Pi Zero에서 SSH 서비스 확인
sudo systemctl status ssh
sudo systemctl start ssh
sudo systemctl enable ssh

# 방화벽 확인 (있다면)
sudo ufw status
sudo ufw allow 22
```

### 9.2 USB 이더넷 인식 안 됨

**증상:** `usb0` 인터페이스가 생성되지 않음

**해결:**
```bash
# cmdline.txt 확인 (한 줄인지 확인!)
cat /boot/cmdline.txt

# config.txt 확인
grep dwc2 /boot/config.txt

# 커널 모듈 수동 로드
sudo modprobe dwc2
sudo modprobe g_ether

# dmesg 로그 확인
dmesg | grep -i usb
dmesg | grep -i cdc
```

### 9.3 WiFi 연결 실패

**증상:** WiFi에 연결되지 않음

**해결:**
```bash
# 현재 WiFi 상태 확인
iwconfig wlan0
wpa_cli status

# WiFi 인터페이스 재시작
sudo ip link set wlan0 down
sudo ip link set wlan0 up

# wpa_supplicant 재시작
sudo systemctl restart wpa_supplicant

# 수동 연결 시도
sudo wpa_supplicant -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant.conf -B
sudo dhclient wlan0

# 로그 확인
journalctl -u wpa_supplicant
```

### 9.4 호스트 키 변경 오류

**증상:** `WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!`

**해결:**
```bash
# 기존 호스트 키 삭제
ssh-keygen -R 10.0.0.2
ssh-keygen -R raspberrypi.local

# 또는 known_hosts 파일 직접 편집
nano ~/.ssh/known_hosts
```

### 9.5 Avahi/mDNS 작동 안 함

**증상:** `raspberrypi.local` 접속 불가

**해결:**
```bash
# Pi Zero에서 avahi 설치/재시작
sudo apt install avahi-daemon -y
sudo systemctl restart avahi-daemon
sudo systemctl enable avahi-daemon

# 호스트네임 확인
hostname

# Pi 3/4에서 mDNS 지원 확인
sudo apt install avahi-utils -y
avahi-browse -at
```

### 9.6 권한 문제

**증상:** `Permission denied (publickey)`

**해결:**
```bash
# SSH 키 권한 확인 (클라이언트)
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

# authorized_keys 권한 확인 (서버)
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# SELinux 컨텍스트 복구 (해당되는 경우)
restorecon -Rv ~/.ssh
```

---

## 10. 유용한 명령어 모음

### 10.1 네트워크 진단

```bash
# IP 주소 확인
ip addr show
hostname -I

# 네트워크 인터페이스 상태
ip link show

# 라우팅 테이블
ip route show

# DNS 확인
cat /etc/resolv.conf
nslookup google.com

# 연결 테스트
ping -c 4 192.168.0.1
ping -c 4 google.com

# 포트 스캔
nmap -p 22 192.168.0.100

# TCP 연결 상태
ss -tuln
netstat -tuln
```

### 10.2 SSH 관련

```bash
# SSH 상태 확인
sudo systemctl status ssh

# SSH 로그 확인
journalctl -u ssh -f

# 활성 SSH 연결 확인
who
w

# SSH 설정 테스트
sudo sshd -t

# 상세 모드로 SSH 접속 (디버깅)
ssh -vvv pi@192.168.0.100
```

### 10.3 시스템 정보

```bash
# Raspberry Pi 모델 확인
cat /proc/device-tree/model

# CPU 정보
cat /proc/cpuinfo

# 메모리 사용량
free -h

# 디스크 사용량
df -h

# 온도 확인
vcgencmd measure_temp

# 시스템 가동 시간
uptime
```

### 10.4 원격 파일 전송

```bash
# SCP로 파일 복사
scp file.txt pi@10.0.0.2:/home/pi/
scp pi@10.0.0.2:/home/pi/file.txt ./

# 디렉토리 복사
scp -r folder/ pi@10.0.0.2:/home/pi/

# rsync (대용량/동기화에 유용)
rsync -avz ./project/ pi@10.0.0.2:/home/pi/project/
rsync -avz --progress ./large_file pi@10.0.0.2:/home/pi/
```

### 10.5 SSH 터널링

```bash
# 로컬 포트 포워딩 (Pi Zero의 80 포트를 로컬 8080으로)
ssh -L 8080:localhost:80 pi@10.0.0.2

# 리모트 포트 포워딩 (로컬 3000을 Pi Zero에서 접근 가능하게)
ssh -R 3000:localhost:3000 pi@10.0.0.2

# 동적 포트 포워딩 (SOCKS 프록시)
ssh -D 1080 pi@10.0.0.2
```

---

## 부록 A: 빠른 설정 체크리스트

### Pi Zero Headless 설정 (USB 이더넷)

- [ ] SD 카드에 Raspberry Pi OS 굽기
- [ ] `/boot/config.txt`에 `dtoverlay=dwc2` 추가
- [ ] `/boot/cmdline.txt`에 `modules-load=dwc2,g_ether` 추가
- [ ] `/boot/ssh` 빈 파일 생성
- [ ] Pi Zero의 **USB Data 포트**(왼쪽)를 Pi 3/4에 연결
- [ ] Pi 3/4에서 DHCP 서버 설정 또는 수동 IP 할당
- [ ] `ssh pi@10.0.0.2`로 접속

### Pi Zero W Headless 설정 (WiFi)

- [ ] SD 카드에 Raspberry Pi OS 굽기
- [ ] `/boot/wpa_supplicant.conf` 생성 (WiFi 정보 입력)
- [ ] `/boot/ssh` 빈 파일 생성
- [ ] Pi Zero W 부팅
- [ ] 공유기 또는 nmap으로 IP 확인
- [ ] `ssh pi@<IP주소>`로 접속

---

## 부록 B: 참고 자료

- [Raspberry Pi 공식 문서](https://www.raspberrypi.com/documentation/)
- [USB Gadget 모드 설명](https://www.kernel.org/doc/html/latest/usb/gadget_configfs.html)
- [Raspberry Pi Zero Headless 설정](https://www.raspberrypi.com/documentation/computers/configuration.html#setting-up-a-headless-raspberry-pi)

---

*작성일: 2026-02-03*
