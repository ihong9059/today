# EtherCAT Simulation 환경

## 폴더 구조

```
simulation/
├── README.md                    # 이 파일
├── run_simulation.bat           # 시뮬레이션 실행 메뉴
├── start_slave_emulator.bat     # Slave 에뮬레이터 시작
├── start_master_scan.bat        # Master 스캔 시작
├── setup/                       # 설치 스크립트
│   ├── 01_install_npcap.ps1    # Npcap 설치
│   ├── 02_install_soem.ps1     # SOEM 다운로드 및 빌드
│   ├── 03_install_pysoem.ps1   # PySOEM 설치
│   └── 04_install_twincat.md   # TwinCAT 설치 가이드
├── src/                         # 소스 코드
│   └── python/                  # Python 예제
│       ├── scan_slaves.py              # Slave 스캔
│       ├── digital_io_test.py          # Digital I/O 테스트
│       ├── ethercat_loopback_test.py   # 루프백 테스트
│       └── ethercat_slave_emulator.py  # Slave 에뮬레이터 (TwinCAT 대체)
├── tools/                       # 유틸리티
│   └── check_adapters.py       # 네트워크 어댑터 확인
└── docs/                        # 문서
    └── quick_start.md          # 빠른 시작 가이드
```

## 설치 완료 상태

- [x] Git
- [x] CMake
- [x] Npcap (WinPcap 호환 모드)
- [x] PySOEM
- [x] Scapy (Slave 에뮬레이터용)
- [ ] TwinCAT 3 (옵션 - Slave 시뮬레이션 대체 가능)

## 빠른 시작

### 1. 환경 확인
```powershell
py -3.14 tools/check_adapters.py
```

### 2. 어댑터 목록 확인
```powershell
py -3.14 src/python/scan_slaves.py list
```

### 3. 시뮬레이션 실행 (두 개의 관리자 권한 터미널 필요)

**터미널 1: Slave 에뮬레이터 시작**
```powershell
py -3.14 src/python/ethercat_slave_emulator.py "Realtek"
```

**터미널 2: Master 스캔**
```powershell
py -3.14 src/python/scan_slaves.py 8
```

또는 배치 파일 사용:
```
start_slave_emulator.bat   # 관리자 권한으로 실행
start_master_scan.bat      # 별도 터미널에서 관리자 권한으로 실행
```

## 현재 PC 네트워크 구성

| PySOEM 인덱스 | 장치 | 용도 |
|---------------|------|------|
| 7 | Realtek USB GbE Family Controller #2 | Slave 에뮬레이터 |
| 8 | Intel(R) Ethernet Connection (16) I219-V | SOEM Master |

## 시뮬레이션 방법

### 옵션 A: 소프트웨어 Slave 에뮬레이터 (현재 구현)

TwinCAT 없이 Scapy 기반 Slave 에뮬레이터로 EtherCAT 프레임 송수신 테스트.

**테스트 결과:**
- EtherCAT 프레임 송수신: **성공** (4000+ 프레임/초)
- 기본 통신 검증: **완료**
- 전체 Slave 인식: 부분적 (고급 프로토콜 시퀀스 필요)

### 옵션 B: TwinCAT 3 설치 (완전한 시뮬레이션)

Beckhoff TwinCAT 3을 설치하면 완전한 EtherCAT Slave 시뮬레이션 가능.

1. https://www.beckhoff.com 에서 TwinCAT 3 XAE 다운로드
2. 설치 후 EtherCAT Simulation Device 구성
3. 가상 Slave 추가 (EK1100, EL1008, EL2008 등)

### 옵션 C: 실제 하드웨어

- EasyCAT HAT + Raspberry Pi
- LAN9252 개발보드
- AliExpress EtherCAT Slave 모듈

## 문제 해결

| 문제 | 해결 |
|------|------|
| "PySOEM 없음" | `pip install pysoem` |
| "Scapy 없음" | `pip install scapy` |
| "어댑터 열기 실패" | 관리자 권한으로 실행 |
| "Slave 없음" | Slave 에뮬레이터 먼저 실행 |
| "Npcap 없음" | setup/npcap-1.80.exe 설치 |

## 다음 단계

1. TwinCAT 3 설치로 완전한 Slave 시뮬레이션 구성
2. 또는 실제 EtherCAT Slave 하드웨어 구매 및 연결
3. PDO 사이클 타임 테스트 (1ms 목표)
