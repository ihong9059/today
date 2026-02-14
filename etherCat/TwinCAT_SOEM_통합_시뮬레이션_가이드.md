# TwinCAT Slave 시뮬레이션 + SOEM Master 통합 구성 가이드

## 1. 개요

### 1.1 목적
단일 Windows 11 PC에서 TwinCAT 3를 이용한 EtherCAT Slave 시뮬레이션과 SOEM Master를 동시에 구성하여 EtherCAT 통신을 테스트한다.

### 1.2 시스템 구성 개념

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Windows 11 PC (단일 PC)                          │
│                                                                          │
│  ┌─────────────────────────────┐    ┌─────────────────────────────┐     │
│  │      SOEM Application       │    │      TwinCAT 3 Runtime      │     │
│  │      (EtherCAT Master)      │    │   (EtherCAT Slave Sim)      │     │
│  │                             │    │                             │     │
│  │  ┌───────────────────────┐  │    │  ┌───────────────────────┐  │     │
│  │  │   simple_test.exe     │  │    │  │   TE1111 Simulation   │  │     │
│  │  │   slaveinfo.exe       │  │    │  │   Virtual Slaves      │  │     │
│  │  │   Custom App          │  │    │  │   (I/O, Servo, etc)   │  │     │
│  │  └───────────┬───────────┘  │    │  └───────────┬───────────┘  │     │
│  └──────────────┼──────────────┘    └──────────────┼──────────────┘     │
│                 │                                   │                    │
│          ┌──────┴───────┐                   ┌──────┴───────┐            │
│          │  NIC 1       │                   │  NIC 2       │            │
│          │ Intel I219-V │                   │ USB Ethernet │            │
│          │ (내장 NIC)   │                   │ (외장 NIC)   │            │
│          └──────┬───────┘                   └──────┬───────┘            │
│                 │                                   │                    │
└─────────────────┼───────────────────────────────────┼────────────────────┘
                  │                                   │
                  └───────────┬───────────────────────┘
                              │
                      CAT6 Ethernet Cable
                       (Loopback 연결)
```

### 1.3 필요 장비

| 장비 | 수량 | 용도 | 예상 비용 |
|------|------|------|-----------|
| 내장 이더넷 (Intel I219-V) | 1 | SOEM Master용 | 기존 보유 |
| USB 이더넷 어댑터 | 1 | TwinCAT Slave Sim용 | $10~15 |
| CAT6 이더넷 케이블 | 1 | NIC 간 연결 | $3 |

**총 추가 비용**: 약 $13~18 (₩17,000~24,000)

---

## 2. 구현 가능한 시나리오

### 시나리오 1: Digital I/O 시뮬레이션

```
┌─────────────────────────────────────────────────────────────┐
│                    시나리오 1: Digital I/O                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SOEM Master                    TwinCAT Slave Simulation    │
│  ┌──────────────┐               ┌──────────────────────┐    │
│  │              │               │  EL1008 (8ch DI)     │    │
│  │  Digital     │──── PDO ────►│  ├─ Input 0~7        │    │
│  │  Output      │               │                      │    │
│  │  Control     │               │  EL2008 (8ch DO)     │    │
│  │              │◄─── PDO ─────│  ├─ Output 0~7       │    │
│  │  Digital     │               │                      │    │
│  │  Input       │               │  EK1100 (Coupler)    │    │
│  │  Monitor     │               │                      │    │
│  └──────────────┘               └──────────────────────┘    │
│                                                              │
│  응용: LED 제어, 스위치 상태 읽기, 기본 I/O 테스트           │
└─────────────────────────────────────────────────────────────┘
```

**구현 내용**:
- 8채널 Digital Output 제어 (LED 점멸 패턴)
- 8채널 Digital Input 읽기 (가상 스위치 상태)
- PDO 주기적 교환 확인

---

### 시나리오 2: 아날로그 I/O 시뮬레이션

```
┌─────────────────────────────────────────────────────────────┐
│                   시나리오 2: Analog I/O                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SOEM Master                    TwinCAT Slave Simulation    │
│  ┌──────────────┐               ┌──────────────────────┐    │
│  │              │               │  EL3102 (2ch AI)     │    │
│  │  Analog      │──── PDO ────►│  ├─ 0~10V Input      │    │
│  │  Output      │               │  ├─ 16-bit ADC      │    │
│  │  (Setpoint)  │               │                      │    │
│  │              │               │  EL4102 (2ch AO)     │    │
│  │  Analog      │◄─── PDO ─────│  ├─ 0~10V Output     │    │
│  │  Input       │               │  ├─ 16-bit DAC      │    │
│  │  (Feedback)  │               │                      │    │
│  └──────────────┘               └──────────────────────┘    │
│                                                              │
│  응용: 센서 값 시뮬레이션, PID 제어 테스트                   │
└─────────────────────────────────────────────────────────────┘
```

**구현 내용**:
- 아날로그 출력값 설정 (0~10V 범위)
- 아날로그 입력값 읽기 (시뮬레이션된 센서 데이터)
- 16비트 해상도 데이터 처리

---

### 시나리오 3: 서보 드라이브 시뮬레이션 (CiA 402)

```
┌─────────────────────────────────────────────────────────────┐
│                시나리오 3: Servo Drive (CiA 402)             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SOEM Master                    TwinCAT Slave Simulation    │
│  ┌──────────────┐               ┌──────────────────────┐    │
│  │              │               │  AX5000 Servo Drive  │    │
│  │  Control     │──── PDO ────►│  ├─ Control Word     │    │
│  │  Word        │               │  ├─ Target Position  │    │
│  │  Target Pos  │               │  ├─ Target Velocity  │    │
│  │              │               │                      │    │
│  │  Status      │◄─── PDO ─────│  ├─ Status Word      │    │
│  │  Word        │               │  ├─ Actual Position  │    │
│  │  Actual Pos  │               │  ├─ Actual Velocity  │    │
│  │              │               │                      │    │
│  │  SDO Access  │◄───SDO/CoE──►│  ├─ Parameters       │    │
│  └──────────────┘               └──────────────────────┘    │
│                                                              │
│  응용: 모션 제어 테스트, CiA 402 상태 머신 구현              │
└─────────────────────────────────────────────────────────────┘
```

**구현 내용**:
- CiA 402 상태 머신 구현 (Not Ready → Switch On → Operation Enabled)
- Position/Velocity/Torque 모드 제어
- 실시간 위치 피드백 확인

---

### 시나리오 4: 다중 Slave 네트워크

```
┌─────────────────────────────────────────────────────────────┐
│               시나리오 4: Multi-Slave Network                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SOEM Master                    TwinCAT Slave Simulation    │
│  ┌──────────────┐               ┌──────────────────────┐    │
│  │              │               │  Slave 1: EK1100     │    │
│  │  Network     │               │  (Bus Coupler)       │    │
│  │  Scanning    │               │         │            │    │
│  │              │               │  Slave 2: EL1008     │    │
│  │  Multi-Slave │──── PDO ────►│  (8ch Digital Input) │    │
│  │  Control     │               │         │            │    │
│  │              │               │  Slave 3: EL2008     │    │
│  │  Distributed │◄─── PDO ─────│  (8ch Digital Output)│    │
│  │  Clock Sync  │               │         │            │    │
│  │              │               │  Slave 4: EL3102     │    │
│  │              │               │  (2ch Analog Input)  │    │
│  └──────────────┘               └──────────────────────┘    │
│                                                              │
│  응용: 복합 시스템 테스트, DC 동기화 검증                    │
└─────────────────────────────────────────────────────────────┘
```

**구현 내용**:
- 여러 Slave 장치 동시 제어
- Distributed Clock (DC) 동기화
- 네트워크 토폴로지 관리

---

### 시나리오 5: 에러 핸들링 및 진단

```
┌─────────────────────────────────────────────────────────────┐
│              시나리오 5: Error Handling & Diagnosis          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SOEM Master                    TwinCAT Slave Simulation    │
│  ┌──────────────┐               ┌──────────────────────┐    │
│  │              │               │                      │    │
│  │  Error       │               │  Simulated Errors:   │    │
│  │  Detection   │◄────────────►│  ├─ Communication    │    │
│  │              │               │  ├─ Slave Lost       │    │
│  │  State       │               │  ├─ PDO Timeout      │    │
│  │  Recovery    │               │  ├─ State Change     │    │
│  │              │               │                      │    │
│  │  Diagnostic  │               │  Diagnostic Data:    │    │
│  │  Logging     │◄────────────►│  ├─ Error Counters   │    │
│  │              │               │  ├─ CRC Errors       │    │
│  └──────────────┘               └──────────────────────┘    │
│                                                              │
│  응용: 장애 대응 로직 테스트, 시스템 안정성 검증             │
└─────────────────────────────────────────────────────────────┘
```

**구현 내용**:
- 통신 오류 감지 및 복구
- Slave 상태 전이 모니터링
- 진단 데이터 로깅

---

## 3. 소프트웨어 설치

### 3.1 TwinCAT 3 XAE 설치

#### 다운로드
```
URL: https://www.beckhoff.com/en-en/support/download-finder/
파일: TwinCAT 3.1 Build 4024.xx (Full Setup)
크기: 약 3~5 GB
```

#### 설치 절차

```
1. TwinCAT 3.1 설치 파일 실행
   └─ 관리자 권한으로 실행

2. 라이선스 동의
   └─ "I accept the terms in the license agreement" 선택

3. 설치 유형 선택
   └─ "Complete" 또는 "Custom" 선택
   └─ 최소 구성요소:
      [✓] TwinCAT 3 XAE (Engineering)
      [✓] TwinCAT 3 XAR (Runtime)
      [✓] TwinCAT 3 EtherCAT Master
      [✓] TE1111 EtherCAT Simulation (평가판)

4. Visual Studio 통합
   └─ Visual Studio 미설치 시: "Install TwinCAT XAE Shell" 선택
   └─ Visual Studio 설치 시: 통합 설치

5. 설치 완료 후 재부팅 필수!
```

#### 주의사항

```
⚠️ Windows 11 24H2 주의
   - TwinCAT 4024.x는 Windows 11 24H2와 호환성 문제 있음
   - 가능하면 Windows 11 23H2 또는 Windows 10 사용 권장

⚠️ 7일 평가판 라이선스
   - 설치 후 7일간 모든 기능 사용 가능
   - 7일마다 라이선스 갱신 필요 (무료)
   - 개발/테스트 용도로 충분
```

### 3.2 SOEM 설치

이미 작성된 `EtherCAT_Master_설치_설명서.md` 참조

```powershell
# 요약
1. Npcap 설치 (WinPcap 호환 모드)
2. Visual Studio 2022 설치
3. SOEM 빌드
   git clone https://github.com/OpenEtherCATsociety/SOEM.git
   cd SOEM && mkdir build && cd build
   cmake .. -G "Visual Studio 17 2022" -A x64
   cmake --build . --config Release
```

### 3.3 USB 이더넷 어댑터 설치

```
권장 제품:
- Realtek RTL8153 기반 USB 3.0 Gigabit Ethernet
- 가격: $10~15
- 드라이버: Windows 11 자동 인식

설치 후 확인:
1. 장치 관리자 → 네트워크 어댑터
2. 새 이더넷 어댑터 확인
3. IP 설정: 192.168.2.x (내장 NIC와 다른 서브넷)
```

---

## 4. 네트워크 구성

### 4.1 IP 주소 설정

| NIC | 용도 | IP 주소 | 서브넷 마스크 |
|-----|------|---------|---------------|
| Intel I219-V (내장) | SOEM Master | 192.168.1.100 | 255.255.255.0 |
| USB Ethernet (외장) | TwinCAT Slave Sim | 192.168.1.200 | 255.255.255.0 |

**주의**: 같은 서브넷이어야 EtherCAT 프레임 교환 가능

### 4.2 물리 연결

```
┌─────────────────┐     CAT6 Cable     ┌─────────────────┐
│  Intel I219-V   │◄──────────────────►│  USB Ethernet   │
│  (SOEM Master)  │                    │  (TwinCAT Sim)  │
└─────────────────┘                    └─────────────────┘
```

### 4.3 TwinCAT 실시간 드라이버 설정

```
1. TwinCAT XAE 실행
2. 메뉴: TwinCAT → Show Real Time Ethernet Compatible Devices
3. USB Ethernet 어댑터 선택
4. "Install" 클릭하여 실시간 드라이버 설치
5. 재부팅
```

---

## 5. TwinCAT Slave 시뮬레이션 구성

### 5.1 새 프로젝트 생성

```
1. TwinCAT XAE (또는 Visual Studio with TwinCAT) 실행
2. File → New → Project
3. TwinCAT Projects → TwinCAT XAE Project
4. 프로젝트 이름: "EtherCAT_Slave_Simulation"
5. Create
```

### 5.2 EtherCAT Simulation Device 추가

```
1. Solution Explorer에서 "I/O" → "Devices" 우클릭
2. Add New Item → EtherCAT Simulation
3. "Device 1 (EtherCAT Simulation)" 생성됨
```

### 5.3 가상 Slave 추가 (시나리오 1: Digital I/O)

```
1. "Device 1 (EtherCAT Simulation)" 우클릭
2. Add New Item → Search...
3. 검색: "EK1100" (EtherCAT Coupler)
4. EK1100 추가

5. EK1100 하위에 추가:
   - EL1008 (8-channel Digital Input)
   - EL2008 (8-channel Digital Output)

최종 구조:
└── I/O
    └── Devices
        └── Device 1 (EtherCAT Simulation)
            └── EK1100 (EtherCAT Coupler)
                ├── EL1008 (8ch DI)
                └── EL2008 (8ch DO)
```

### 5.4 네트워크 어댑터 연결

```
1. "Device 1 (EtherCAT Simulation)" 선택
2. "Adapter" 탭 클릭
3. "Search" 버튼 클릭
4. USB Ethernet 어댑터 선택
5. "OK"
```

### 5.5 시뮬레이션 활성화

```
1. TwinCAT 메뉴 → Activate Configuration (Ctrl+Shift+F4)
2. "OK" 클릭
3. TwinCAT 상태: "Run" 모드 전환
4. 시스템 트레이의 TwinCAT 아이콘: 녹색
```

---

## 6. SOEM Master 테스트

### 6.1 Slave 감지 테스트

```powershell
# 관리자 권한 명령 프롬프트 실행
cd C:\EtherCAT\SOEM\build\Release

# 네트워크 인터페이스 확인
.\slaveinfo.exe

# 출력 예시:
# SOEM (Simple Open EtherCAT Master)
# Available adapters:
# [1] \Device\NPF_{...} - Intel(R) Ethernet Connection (16) I219-V
# [2] \Device\NPF_{...} - USB Ethernet Adapter

# Intel I219-V로 Slave 검색
.\slaveinfo.exe 1

# 예상 출력:
# SOEM (Simple Open EtherCAT Master)
# Starting slaveinfo
# ec_init on \Device\NPF_{...} succeeded.
# 3 slaves found and configured.
# Calculated workcounter 6
#
# Slave:1
#  Name:EK1100
#  Output size: 0bits
#  Input size:  0bits
#  State: 18
#  Delay: 0[ns]
#  Has DC: Yes
#
# Slave:2
#  Name:EL1008
#  Output size: 0bits
#  Input size:  8bits
#  State: 18
#  Delay: 140[ns]
#  Has DC: Yes
#
# Slave:3
#  Name:EL2008
#  Output size: 8bits
#  Input size:  0bits
#  State: 18
#  Delay: 280[ns]
#  Has DC: Yes
```

### 6.2 기본 통신 테스트

```powershell
.\simple_test.exe 1

# 예상 출력:
# SOEM (Simple Open EtherCAT Master)
# Starting simple test
# ec_init on \Device\NPF_{...} succeeded.
# 3 slaves found and configured.
# Slaves mapped, state to SAFE_OP.
# Calculated workcounter 6
# Request operational state for all slaves
# Operational state reached for all slaves.
# PDO cycle running...
# T:0001 O: 00 00 00 00 I: 00 00 00 00
# T:0002 O: 01 00 00 00 I: 00 00 00 00
# ...
```

---

## 7. 예제 코드

### 7.1 Digital I/O 제어 예제

```c
// digital_io_test.c
#include <stdio.h>
#include <string.h>
#include <inttypes.h>
#include "ethercat.h"

#define EC_TIMEOUTMON 500
#define CYCLE_TIME_US 1000  // 1ms

char IOmap[4096];
volatile int wkc;
int expectedWKC;

// EL2008 Digital Output 제어
void set_digital_output(uint8_t value)
{
    // Slave 3 (EL2008)의 출력 데이터 설정
    // 8비트: 각 비트가 1개 채널
    ec_slave[3].outputs[0] = value;
}

// EL1008 Digital Input 읽기
uint8_t get_digital_input(void)
{
    // Slave 2 (EL1008)의 입력 데이터 읽기
    return ec_slave[2].inputs[0];
}

int main(int argc, char *argv[])
{
    int i;
    uint8_t output_pattern = 0x01;
    uint8_t input_value;

    if (argc < 2) {
        printf("Usage: digital_io_test <ifname>\n");
        printf("  ifname: Network interface (e.g., eth0 or 1)\n");
        return 1;
    }

    printf("=== EtherCAT Digital I/O Test ===\n\n");

    // 1. EtherCAT 초기화
    printf("[1] Initializing EtherCAT...\n");
    if (!ec_init(argv[1])) {
        printf("ERROR: ec_init failed!\n");
        return 1;
    }
    printf("    ec_init succeeded.\n");

    // 2. Slave 검색 및 구성
    printf("[2] Scanning for slaves...\n");
    if (ec_config_init(FALSE) <= 0) {
        printf("ERROR: No slaves found!\n");
        ec_close();
        return 1;
    }
    printf("    %d slaves found.\n", ec_slavecount);

    // 3. Slave 정보 출력
    printf("[3] Slave information:\n");
    for (i = 1; i <= ec_slavecount; i++) {
        printf("    Slave %d: %s\n", i, ec_slave[i].name);
    }

    // 4. PDO 매핑
    printf("[4] Mapping PDOs...\n");
    ec_config_map(&IOmap);
    ec_configdc();

    // 5. SAFE-OP 상태 전이
    printf("[5] Transitioning to SAFE-OP...\n");
    ec_statecheck(0, EC_STATE_SAFE_OP, EC_TIMEOUTSTATE * 4);

    expectedWKC = (ec_group[0].outputsWKC * 2) + ec_group[0].inputsWKC;
    printf("    Expected WKC: %d\n", expectedWKC);

    // 6. OP 상태 전이
    printf("[6] Requesting OP state...\n");
    ec_slave[0].state = EC_STATE_OPERATIONAL;
    ec_send_processdata();
    ec_receive_processdata(EC_TIMEOUTRET);
    ec_writestate(0);

    int chk = 200;
    do {
        ec_send_processdata();
        ec_receive_processdata(EC_TIMEOUTRET);
        ec_statecheck(0, EC_STATE_OPERATIONAL, 50000);
    } while (chk-- && (ec_slave[0].state != EC_STATE_OPERATIONAL));

    if (ec_slave[0].state != EC_STATE_OPERATIONAL) {
        printf("ERROR: Failed to reach OP state!\n");
        ec_close();
        return 1;
    }
    printf("    All slaves in OP state.\n\n");

    // 7. PDO 통신 루프
    printf("[7] Starting PDO communication...\n");
    printf("    Press Ctrl+C to stop.\n\n");
    printf("    Cycle | Output (hex) | Input (hex) | WKC\n");
    printf("    ------+--------------+-------------+----\n");

    for (i = 0; i < 100; i++) {
        // LED 순차 점등 패턴
        set_digital_output(output_pattern);

        // PDO 송수신
        ec_send_processdata();
        wkc = ec_receive_processdata(EC_TIMEOUTRET);

        // 입력 읽기
        input_value = get_digital_input();

        // 결과 출력
        printf("    %5d |     0x%02X     |    0x%02X     | %d\n",
               i, output_pattern, input_value, wkc);

        // 패턴 회전
        output_pattern = (output_pattern << 1) | (output_pattern >> 7);

        // 1ms 대기
        osal_usleep(CYCLE_TIME_US);
    }

    // 8. 종료
    printf("\n[8] Shutting down...\n");
    ec_slave[0].state = EC_STATE_INIT;
    ec_writestate(0);
    ec_close();
    printf("    Done.\n");

    return 0;
}
```

### 7.2 빌드 방법

```cmake
# CMakeLists.txt에 추가
add_executable(digital_io_test examples/digital_io_test.c)
target_link_libraries(digital_io_test soem)
```

```powershell
# 빌드
cmake --build . --config Release --target digital_io_test

# 실행 (관리자 권한)
.\digital_io_test.exe 1
```

### 7.3 Python 예제 (PySOEM)

```python
# digital_io_test.py
import pysoem
import time

def main():
    print("=== EtherCAT Digital I/O Test (Python) ===\n")

    # 네트워크 어댑터 목록
    adapters = pysoem.find_adapters()
    print("[1] Available adapters:")
    for i, adapter in enumerate(adapters):
        print(f"    [{i}] {adapter.name} - {adapter.desc}")

    if len(adapters) == 0:
        print("ERROR: No adapters found!")
        return

    # Master 생성
    master = pysoem.Master()

    # 첫 번째 어댑터로 연결 (또는 인덱스 지정)
    adapter_name = adapters[0].name
    print(f"\n[2] Opening adapter: {adapter_name}")
    master.open(adapter_name)

    # Slave 검색
    print("[3] Scanning for slaves...")
    if master.config_init() <= 0:
        print("ERROR: No slaves found!")
        master.close()
        return

    print(f"    {len(master.slaves)} slaves found.")

    # Slave 정보 출력
    print("[4] Slave information:")
    for i, slave in enumerate(master.slaves):
        print(f"    Slave {i+1}: {slave.name}")

    # PDO 매핑
    print("[5] Mapping PDOs...")
    master.config_map()
    master.config_dc()

    # SAFE-OP 전이
    print("[6] Transitioning to SAFE-OP...")
    master.state = pysoem.SAFEOP_STATE
    master.write_state()
    master.state_check(pysoem.SAFEOP_STATE, 50000)

    # OP 전이
    print("[7] Requesting OP state...")
    master.state = pysoem.OP_STATE
    master.write_state()

    for _ in range(200):
        master.send_processdata()
        master.receive_processdata(10000)
        if master.state_check(pysoem.OP_STATE, 50000) == pysoem.OP_STATE:
            break

    if master.state != pysoem.OP_STATE:
        print("ERROR: Failed to reach OP state!")
        master.close()
        return

    print("    All slaves in OP state.\n")

    # PDO 통신
    print("[8] Running PDO cycles...")
    print("    Cycle | Output | Input")
    print("    ------+--------+------")

    output_pattern = 0x01

    try:
        for cycle in range(100):
            # EL2008 (Slave 3) 출력 설정
            if len(master.slaves) >= 3:
                master.slaves[2].output = bytes([output_pattern])

            # PDO 송수신
            master.send_processdata()
            master.receive_processdata(10000)

            # EL1008 (Slave 2) 입력 읽기
            input_value = 0
            if len(master.slaves) >= 2:
                input_data = master.slaves[1].input
                if input_data:
                    input_value = input_data[0]

            print(f"    {cycle:5d} |  0x{output_pattern:02X}  | 0x{input_value:02X}")

            # 패턴 회전
            output_pattern = ((output_pattern << 1) | (output_pattern >> 7)) & 0xFF

            time.sleep(0.001)  # 1ms

    except KeyboardInterrupt:
        print("\n\nInterrupted by user.")

    # 종료
    print("\n[9] Shutting down...")
    master.state = pysoem.INIT_STATE
    master.write_state()
    master.close()
    print("    Done.")

if __name__ == "__main__":
    main()
```

```powershell
# PySOEM 설치
pip install pysoem

# 실행 (관리자 권한)
python digital_io_test.py
```

---

## 8. 예상 결과 및 확인 방법

### 8.1 성공 시 예상 출력

```
=== EtherCAT Digital I/O Test ===

[1] Initializing EtherCAT...
    ec_init succeeded.
[2] Scanning for slaves...
    3 slaves found.
[3] Slave information:
    Slave 1: EK1100
    Slave 2: EL1008
    Slave 3: EL2008
[4] Mapping PDOs...
[5] Transitioning to SAFE-OP...
    Expected WKC: 6
[6] Requesting OP state...
    All slaves in OP state.

[7] Starting PDO communication...
    Press Ctrl+C to stop.

    Cycle | Output (hex) | Input (hex) | WKC
    ------+--------------+-------------+----
        0 |     0x01     |    0x00     | 6
        1 |     0x02     |    0x00     | 6
        2 |     0x04     |    0x00     | 6
        3 |     0x08     |    0x00     | 6
        ...
```

### 8.2 TwinCAT 측 확인

```
1. TwinCAT XAE에서 "Device 1 (EtherCAT Simulation)" 선택
2. "Online" 탭 확인
3. State: OP
4. "Process Data" 탭에서 Input/Output 값 실시간 확인
```

### 8.3 Wireshark로 패킷 분석

```
1. Wireshark 실행
2. Intel I219-V 인터페이스 선택
3. 캡처 시작
4. 필터: ecat

EtherCAT 프레임 확인:
- EtherType: 0x88A4
- Command: LRD, LWR, LRW 등
- Working Counter 값
```

---

## 9. 문제 해결

### 9.1 "No slaves found" 오류

| 원인 | 해결 방법 |
|------|-----------|
| TwinCAT 미실행 | TwinCAT을 Run 모드로 활성화 |
| 케이블 연결 안됨 | 이더넷 케이블 연결 확인 |
| 잘못된 NIC 선택 | slaveinfo로 올바른 인터페이스 확인 |
| TwinCAT 드라이버 충돌 | SOEM용 NIC와 TwinCAT용 NIC 분리 |

### 9.2 WKC 오류

| 원인 | 해결 방법 |
|------|-----------|
| PDO 매핑 불일치 | TwinCAT에서 PDO 구성 확인 |
| Slave 상태 이상 | ec_statecheck로 상태 확인 |
| 통신 타임아웃 | EC_TIMEOUTRET 값 증가 |

### 9.3 TwinCAT 실시간 드라이버 문제

```
증상: TwinCAT에서 어댑터를 찾을 수 없음

해결:
1. 장치 관리자 → 네트워크 어댑터
2. USB Ethernet 어댑터 우클릭 → 속성
3. 드라이버 → 드라이버 업데이트
4. TwinCAT 재시작
```

---

## 10. 추가 시나리오 구현

### 10.1 시나리오 확장 가이드

| 시나리오 | TwinCAT Slave 추가 | SOEM 코드 수정 |
|----------|-------------------|----------------|
| 아날로그 I/O | EL3102, EL4102 추가 | 16비트 데이터 처리 |
| 서보 드라이브 | AX5000 추가 | CiA 402 상태머신 |
| 엔코더 | EL5101 추가 | 카운터 값 읽기 |
| 온도 센서 | EL3314 추가 | 열전대 데이터 처리 |

### 10.2 성능 측정

```c
// 통신 주기 측정 예제
#include <time.h>

clock_t start, end;
double elapsed;

start = clock();
for (i = 0; i < 10000; i++) {
    ec_send_processdata();
    ec_receive_processdata(EC_TIMEOUTRET);
}
end = clock();

elapsed = (double)(end - start) / CLOCKS_PER_SEC;
printf("10000 cycles in %.3f seconds\n", elapsed);
printf("Average cycle time: %.3f ms\n", elapsed / 10.0);
```

---

## 11. 참고 자료

### 공식 문서
- [TwinCAT 3 TE1111 EtherCAT Simulation](https://www.beckhoff.com/en-en/products/automation/twincat/texxxx-twincat-3-engineering/te1111.html)
- [TE1111 매뉴얼 PDF](https://download.beckhoff.com/download/document/automation/twincat3/TE1111_TC3_EtherCAT_Simulation_en.pdf)
- [SOEM GitHub](https://github.com/OpenEtherCATsociety/SOEM)
- [PySOEM GitHub](https://github.com/bnjmnp/pysoem)

### 튜토리얼
- [TwinCAT 3 Quick Start](https://www.contactandcoil.com/twincat-3-tutorial/quick-start/)
- [SOEM on Windows (ROS)](https://ms-iot.github.io/ROSOnWindows/tutorials/ethercat/soem.html)

---

**문서 버전**: 1.0
**작성일**: 2026-02-14
**대상 시스템**: Windows 11 Pro (i5-1235U, 16GB RAM, Intel I219-V)
