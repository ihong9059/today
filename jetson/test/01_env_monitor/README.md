# 환경 모니터 테스트 계획서

**프로젝트:** Jetson Nano WS2812 + AHT20 환경 모니터
**작성일:** 2026년 01월 26일
**테스트 장비:** Jetson Nano (yahboom)

---

## 1. 테스트 개요

### 1.1 목적

Jetson Nano의 GPIO를 활용하여 I2C 센서(AHT20)와 PWM LED(WS2812)가
정상적으로 동작하는지 검증하고, 통합 환경 모니터 앱의 기능을 확인한다.

### 1.2 테스트 환경

| 항목 | 내용 |
|:-----|:-----|
| **보드** | Jetson Nano (yahboom) |
| **OS** | Linux 4.9.337-tegra (aarch64) |
| **IP** | 192.168.1.11 |
| **사용자** | uttec |
| **센서** | AHT20 (I2C 온습도) |
| **출력** | WS2812 LED Strip (8개) |

### 1.3 폴더 구조

```
~/test/01_env_monitor/
├── README.md               # 이 문서 (테스트 계획서)
├── requirements.txt        # Python 의존성
├── src/
│   └── env_monitor.py      # 메인 앱
└── test/
    ├── test_aht20.py       # AHT20 단위 테스트
    └── test_ws2812.py      # WS2812 단위 테스트
```

---

## 2. 사전 준비

### 2.1 하드웨어 연결 확인

```
[ ] AHT20 센서 연결
    - VCC → Pin 4 (5V)
    - GND → Pin 6 (GND)
    - SDA → Pin 3 (SDA/I2C)
    - SCL → Pin 5 (SCL/I2C)

[ ] WS2812 LED 연결
    - VCC → 외부 5V 전원
    - GND → Pin 14 (GND) + 외부 GND (공통 접지)
    - DIN → Pin 12 (GPIO18)
```

### 2.2 소프트웨어 설치

```bash
# 1. 프로젝트 폴더로 이동
cd ~/test/01_env_monitor

# 2. 시스템 패키지 설치
sudo apt-get update
sudo apt-get install -y i2c-tools python3-smbus python3-pip

# 3. Python 의존성 설치
pip3 install -r requirements.txt

# 4. GPIO 권한 설정
sudo groupadd -f -r gpio
sudo usermod -a -G gpio $USER
```

### 2.3 I2C 활성화 확인

```bash
# I2C 버스 확인
ls /dev/i2c-*

# AHT20 주소 스캔 (0x38이 보여야 함)
sudo i2cdetect -y -r 1
```

---

## 3. 테스트 절차

### 3.1 테스트 1: I2C 통신 확인

**목적:** AHT20 센서가 I2C 버스에서 인식되는지 확인

**절차:**
```bash
sudo i2cdetect -y -r 1
```

**예상 결과:**
```
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
30: -- -- -- -- -- -- -- -- 38 -- -- -- -- -- -- --
```

**판정 기준:**
- [ ] PASS: 0x38 주소에 장치 감지됨
- [ ] FAIL: 장치 미감지 → 배선 확인

---

### 3.2 테스트 2: AHT20 센서 테스트

**목적:** AHT20 센서에서 온습도 값을 정상적으로 읽는지 확인

**절차:**
```bash
cd ~/test/01_env_monitor
python3 test/test_aht20.py
```

**예상 결과:**
```
==========================================
  AHT20 센서 테스트
==========================================

[1] I2C 버스 초기화...
    [OK] I2C 버스 준비됨

[2] AHT20 센서 연결...
    [OK] 센서 연결 성공!

[3] 5초간 측정 시작...
----------------------------------------
  [1] 온도:  25.30C | 습도:  62.50%
  [2] 온도:  25.31C | 습도:  62.48%
  ...
```

**판정 기준:**
- [ ] PASS: 온도/습도 값이 정상 범위 (온도: 10~40°C, 습도: 20~90%)
- [ ] FAIL: 오류 발생 또는 비정상 값

---

### 3.3 테스트 3: WS2812 LED 테스트

**목적:** WS2812 LED가 정상적으로 제어되는지 확인

**절차:**
```bash
cd ~/test/01_env_monitor
sudo python3 test/test_ws2812.py
```

**예상 결과:**
1. 전체 빨강 점등 (1초)
2. 전체 초록 점등 (1초)
3. 전체 파랑 점등 (1초)
4. 전체 흰색 점등 (1초)
5. 레인보우 순차 점등
6. 깜빡임 3회
7. LED 소등

**판정 기준:**
- [ ] PASS: 모든 LED가 올바른 색상으로 점등
- [ ] FAIL: LED 미점등 또는 색상 오류

---

### 3.4 테스트 4: 통합 테스트 (환경 모니터)

**목적:** AHT20 + WS2812 통합 앱이 정상 동작하는지 확인

**절차:**
```bash
cd ~/test/01_env_monitor
sudo python3 src/env_monitor.py
```

**예상 결과:**
```
==================================================
  Jetson Nano 환경 모니터
  AHT20 + WS2812
==================================================

[초기화]
  [OK] AHT20 센서 연결됨
  [OK] WS2812 LED 연결됨

[모니터링 시작] (Ctrl+C로 종료)
--------------------------------------------------
  온도:  25.3C | 습도:  62.5%
```

**판정 기준:**
- [ ] PASS: 센서값에 따라 LED 색상이 변경됨
- [ ] FAIL: 센서 오류 또는 LED 미동작

---

## 4. 테스트 결과 기록

### 4.1 테스트 결과표

| 테스트 | 날짜 | 결과 | 비고 |
|:-------|:-----|:----:|:-----|
| 1. I2C 통신 | | [ ] PASS / [ ] FAIL | |
| 2. AHT20 센서 | | [ ] PASS / [ ] FAIL | |
| 3. WS2812 LED | | [ ] PASS / [ ] FAIL | |
| 4. 통합 테스트 | | [ ] PASS / [ ] FAIL | |

### 4.2 측정값 기록

| 시간 | 온도 (°C) | 습도 (%) | LED 상태 | 비고 |
|:-----|----------:|----------:|:---------|:-----|
| | | | | |
| | | | | |
| | | | | |

---

## 5. 트러블슈팅

### 5.1 일반적인 문제

| 증상 | 원인 | 해결책 |
|:-----|:-----|:-------|
| I2C 장치 미감지 | 배선 오류 | SDA/SCL 핀 재확인 |
| Permission denied | 권한 부족 | `sudo` 사용 또는 gpio 그룹 추가 |
| LED 안 켜짐 | 전원 부족 | 외부 5V 전원 사용 |
| LED 색상 이상 | GRB/RGB 설정 | 라이브러리 설정 확인 |
| 센서값 이상 | 센서 불량 | 센서 교체 또는 배선 확인 |

### 5.2 디버깅 명령어

```bash
# I2C 장치 스캔
sudo i2cdetect -y -r 1

# GPIO 상태 확인
cat /sys/kernel/debug/gpio

# 커널 로그 확인
dmesg | tail -30

# Python 패키지 확인
pip3 list | grep -i adafruit
```

---

## 6. 다음 단계

테스트 완료 후 진행할 작업:

1. [ ] 테스트 결과 문서화
2. [ ] 문제점 수정 및 재테스트
3. [ ] 확장 기능 구현 (웹 대시보드, 데이터 로깅 등)
4. [ ] 최종 보고서 작성

---

## 7. 참고 명령어

### 빠른 실행

```bash
# SSH 접속
ssh uttec@192.168.1.11

# 프로젝트 폴더
cd ~/test/01_env_monitor

# 테스트 실행
python3 test/test_aht20.py           # AHT20 테스트
sudo python3 test/test_ws2812.py     # WS2812 테스트
sudo python3 src/env_monitor.py      # 메인 앱
```

---

**문서 버전:** 1.0
**작성자:** Claude Code
