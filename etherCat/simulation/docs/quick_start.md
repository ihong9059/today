# EtherCAT 시뮬레이션 빠른 시작 가이드

## 1. 현재 환경

| 항목 | 상태 |
|------|------|
| PC | Windows 11 Pro, i5-1235U, 16GB |
| NIC 1 | Intel I219-V (내장) - SOEM Master용 |
| NIC 2 | Realtek USB GbE (외장) - TwinCAT Slave용 |
| 케이블 | 두 NIC 간 연결 완료 |

## 2. 설치 순서

### Step 1: Npcap 설치 (필수)

```powershell
# 관리자 권한 PowerShell
cd C:\todo\today\etherCat\simulation
.\setup\01_install_npcap.ps1
```

**중요**: 설치 시 "WinPcap API-compatible Mode" 반드시 체크!

### Step 2: PySOEM 설치

```powershell
.\setup\03_install_pysoem.ps1

# 또는 직접 설치
pip install pysoem
```

### Step 3: 환경 확인

```powershell
python tools\check_adapters.py
```

## 3. 테스트 실행

### 어댑터 목록 확인
```powershell
python src\python\scan_slaves.py list
```

### Slave 스캔 (TwinCAT 실행 후)
```powershell
# 관리자 권한 필요
python src\python\scan_slaves.py 0
```

### Digital I/O 테스트
```powershell
python src\python\digital_io_test.py 0
```

## 4. TwinCAT Slave 시뮬레이션 설정

TwinCAT이 설치되어 있지 않은 경우, 현재는 **Slave가 없는 상태**입니다.

### 옵션 A: TwinCAT 3 설치 (권장)
1. https://www.beckhoff.com 에서 TwinCAT 3 XAE 다운로드
2. 설치 후 EtherCAT Simulation Device 구성
3. 가상 Slave 추가 (EK1100, EL1008, EL2008 등)

### 옵션 B: 실제 Slave 하드웨어 사용
- EasyCAT HAT + Raspberry Pi
- LAN9252 개발보드

### 옵션 C: 두 NIC 간 직접 통신 테스트
현재 구성에서는 TwinCAT 없이 Slave가 없으므로,
scan_slaves.py 실행 시 "Slave를 찾을 수 없습니다" 출력됨.

## 5. 예상 출력

### 성공 시 (TwinCAT Slave 실행 중)
```
============================================================
  EtherCAT Slave 스캔
============================================================

  어댑터: Intel(R) Ethernet Connection (16) I219-V

------------------------------------------------------------
[1] 어댑터 열기...
    ✓ 성공

[2] Slave 검색 중...
    ✓ 3개 Slave 발견!

------------------------------------------------------------
  발견된 Slave 목록
------------------------------------------------------------

  Slave 1:
    이름:       EK1100
    제조사 ID:  0x00000002
    제품 코드:  0x044C2C52

  Slave 2:
    이름:       EL1008
    ...
```

### TwinCAT 미실행 시
```
[2] Slave 검색 중...
    ✗ Slave를 찾을 수 없습니다!

    확인사항:
    - TwinCAT Slave 시뮬레이션이 실행 중인지 확인
    - 이더넷 케이블이 올바르게 연결되었는지 확인
```

## 6. 문제 해결

| 문제 | 해결 |
|------|------|
| "PySOEM 없음" | `pip install pysoem` |
| "어댑터 열기 실패" | 관리자 권한으로 실행 |
| "Slave 없음" | TwinCAT 실행 확인, 케이블 확인 |
| "Npcap 없음" | 01_install_npcap.ps1 실행 |

## 7. 다음 단계

1. TwinCAT 3 설치
2. EtherCAT Simulation Device 구성
3. 가상 Slave 추가
4. scan_slaves.py로 연결 확인
5. digital_io_test.py로 PDO 통신 테스트
