# KC 기능시험 RS485 사전 검증 시스템

리비타 링크 KC 인증 기능시험 프로토콜을 사전 검증하기 위한 DUT 시뮬레이터 + Web Host.

## 구성

```
rs485/
  modbus_crc.py       # 공통 Modbus CRC-16 모듈
  run.bat             # DUT + Host 동시 실행
  dut/
    dut_simulator.py  # DUT 시뮬레이터 (COM16)
  host/
    app.py            # Flask 웹 서버 (COM15)
    templates/
      index.html      # Web UI (단일 대시보드)
```

## 실행 방법

### 자동 실행
```
run.bat
```

### 수동 실행
```bash
# Terminal 1 - DUT 시뮬레이터
python dut/dut_simulator.py COM16 9600

# Terminal 2 - Host 웹 서버
python host/app.py COM15 9600 5000
```

브라우저: http://localhost:5000

## 필요 패키지

```
pip install pyserial flask
```

## RS485 연결

COM15, COM16에 USB-RS485 컨버터가 연결되어 A/B 라인으로 상호 연결:

```
COM15 (Host) ---- A ---- COM16 (DUT)
              ---- B ----
              ---- GND --
```
