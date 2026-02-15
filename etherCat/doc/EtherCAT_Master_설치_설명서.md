# EtherCAT Master (SOEM) 설치 설명서

## Windows 11 PC용 상세 가이드

---

## 1. 사전 준비

### 1.1 시스템 요구사항 확인

현재 시스템이 다음 요구사항을 충족하는지 확인:

```
✓ Windows 11 Pro (Build 26100)
✓ Intel Core i5-1235U
✓ RAM 16GB
✓ Intel I219-V 이더넷 어댑터
```

### 1.2 관리자 권한 확인

SOEM은 RAW 소켓에 접근해야 하므로 관리자 권한이 필요합니다.

---

## 2. 필수 소프트웨어 설치

### 2.1 Npcap 설치 (가장 중요!)

**Npcap**은 Windows에서 EtherCAT 패킷을 송수신하기 위한 핵심 드라이버입니다.

#### 다운로드
```
URL: https://npcap.com/
최신 버전: 1.87 이상 권장
```

#### 설치 과정
1. `npcap-1.xx.exe` 실행
2. **반드시 체크해야 할 옵션**:
   ```
   [✓] Install Npcap in WinPcap API-compatible Mode  ← 필수!
   [✓] Support raw 802.11 traffic (선택)
   [ ] Restrict Npcap access to Administrators only (체크 해제 권장)
   ```
3. 설치 완료 후 재부팅

#### 설치 확인
```powershell
# 서비스 확인
Get-Service npcap

# 결과 예시:
# Status   Name     DisplayName
# ------   ----     -----------
# Running  npcap    Npcap Packet Driver
```

---

### 2.2 Visual Studio 2022 설치

#### 다운로드
```
URL: https://visualstudio.microsoft.com/ko/vs/
에디션: Community (무료) 또는 Professional
```

#### 설치 구성요소
Visual Studio Installer에서 다음 워크로드 선택:

```
[✓] Desktop development with C++
    ├─ [✓] MSVC v143 - VS 2022 C++ x64/x86 build tools
    ├─ [✓] Windows 11 SDK (10.0.22621.0)
    ├─ [✓] C++ CMake tools for Windows
    └─ [✓] C++ core features
```

---

### 2.3 CMake 설치

Visual Studio에 포함된 CMake를 사용하거나 별도 설치:

```
URL: https://cmake.org/download/
버전: 3.20 이상

설치 옵션:
[✓] Add CMake to the system PATH for all users
```

#### 설치 확인
```powershell
cmake --version
# cmake version 3.28.x
```

---

### 2.4 Git 설치

```
URL: https://git-scm.com/download/win
```

#### 설치 확인
```powershell
git --version
# git version 2.43.x
```

---

## 3. SOEM 빌드 및 설치

### 3.1 소스코드 다운로드

```powershell
# 작업 디렉토리 생성
mkdir C:\EtherCAT
cd C:\EtherCAT

# SOEM 소스코드 클론
git clone https://github.com/OpenEtherCATsociety/SOEM.git
cd SOEM
```

### 3.2 빌드 디렉토리 준비

```powershell
# 빌드 디렉토리 생성
mkdir build
cd build
```

### 3.3 CMake 구성

#### 방법 1: 명령줄 (권장)
```powershell
# Visual Studio 2022 Generator 사용
cmake .. -G "Visual Studio 17 2022" -A x64

# 또는 Ninja 사용 (더 빠름)
cmake .. -G "Ninja" -DCMAKE_BUILD_TYPE=Release
```

#### 방법 2: CMake GUI 사용
1. CMake GUI 실행
2. Source code: `C:/EtherCAT/SOEM`
3. Build binaries: `C:/EtherCAT/SOEM/build`
4. Configure → Visual Studio 17 2022 → x64
5. Generate

### 3.4 빌드 실행

```powershell
# Release 빌드
cmake --build . --config Release

# 또는 Visual Studio에서 직접 빌드
# SOEM.sln 파일을 열고 Build → Build Solution (F7)
```

### 3.5 설치 (선택)

```powershell
# 지정 경로에 설치
cmake --install . --prefix C:/SOEM --config Release
```

### 3.6 빌드 결과물 확인

```
C:\EtherCAT\SOEM\build\Release\
├── soem.lib           # 정적 라이브러리
├── simple_test.exe    # 기본 테스트 프로그램
├── slaveinfo.exe      # Slave 정보 확인 도구
└── eepromtool.exe     # EEPROM 읽기/쓰기 도구
```

---

## 4. 네트워크 설정

### 4.1 이더넷 어댑터 확인

```powershell
# 네트워크 어댑터 목록 확인
Get-NetAdapter | Select-Object Name, InterfaceDescription, Status

# 결과 예시:
# Name          InterfaceDescription                Status
# ----          --------------------                ------
# 이더넷 6      Intel(R) Ethernet Connection I219-V   Up
```

### 4.2 EtherCAT 전용 네트워크 설정

EtherCAT 통신용 이더넷 포트는 일반 네트워크와 분리하는 것이 좋습니다.

```powershell
# IP 주소 수동 설정 (DHCP 비활성화)
# 제어판 → 네트워크 → 어댑터 설정 → Intel I219-V → 속성

# 또는 PowerShell
New-NetIPAddress -InterfaceAlias "이더넷 6" -IPAddress 192.168.1.100 -PrefixLength 24
```

### 4.3 방화벽 설정

EtherCAT은 표준 이더넷 프레임을 사용하므로 별도 포트 개방 불필요.
단, 보안 소프트웨어가 RAW 소켓 접근을 차단할 수 있음.

```powershell
# Windows 방화벽에서 SOEM 프로그램 허용
New-NetFirewallRule -DisplayName "SOEM EtherCAT" -Direction Outbound -Program "C:\EtherCAT\SOEM\build\Release\simple_test.exe" -Action Allow
```

---

## 5. 동작 테스트

### 5.1 slaveinfo 실행

Slave가 연결되지 않은 상태에서도 네트워크 인터페이스 확인 가능:

```powershell
cd C:\EtherCAT\SOEM\build\Release

# 관리자 권한으로 실행 필수!
.\slaveinfo.exe

# 출력 예시:
# SOEM (Simple Open EtherCAT Master)
# Available adapters:
# \Device\NPF_{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX} - Intel(R) Ethernet Connection (16) I219-V
```

### 5.2 Slave 연결 후 테스트

```powershell
# Slave 정보 확인 (인터페이스 이름 지정)
.\slaveinfo.exe \Device\NPF_{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}

# 또는 인터페이스 번호로
.\slaveinfo.exe 1

# 출력 예시 (Slave 연결 시):
# Slave:1
#  Name:LAN9252 EtherCAT Slave
#  Output size: 2 bytes
#  Input size:  2 bytes
#  State: PREOP
#  Delay: 0[ns]
#  Has DC: No
```

### 5.3 simple_test 실행

```powershell
.\simple_test.exe \Device\NPF_{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}

# 성공 시 출력:
# ec_init succeeded.
# 1 slaves found and configured.
# Slaves mapped, state to SAFE_OP.
# Slave 1 State=0x12 StatusCode=0x0000
# All slaves reached SAFE_OP state.
# Request operational state for all slaves
# All slaves reached OP state.
# ...
```

---

## 6. 문제 해결

### 6.1 "No adapters found" 오류

**원인**: Npcap이 설치되지 않았거나 WinPcap 호환 모드가 비활성화됨

**해결**:
1. Npcap 재설치
2. "Install Npcap in WinPcap API-compatible Mode" 반드시 체크
3. PC 재부팅

### 6.2 "Unable to find slave" 오류

**원인**: 네트워크 연결 문제 또는 Slave 전원 문제

**해결**:
1. 이더넷 케이블 연결 확인
2. Slave 전원 확인 (LED 상태)
3. 올바른 네트워크 인터페이스 선택 확인

### 6.3 WKC가 항상 0인 문제 (Windows 11)

**원인**: Windows 11 22H2에서 알려진 이슈

**해결**: `oshw/win32/nicdrv.c` 수정

```c
// ecx_inframe() 함수에 다음 코드 추가
// LA(Locally-Administered) 비트 체크
if (rxbuf[6] & 0x02) {
    // 자신이 보낸 프레임 무시
    continue;
}
```

수정 후 SOEM 재빌드 필요.

### 6.4 "Access denied" 오류

**원인**: 관리자 권한 부족

**해결**:
- 명령 프롬프트를 "관리자 권한으로 실행"
- 또는 exe 파일 → 속성 → 호환성 → "관리자 권한으로 실행" 체크

---

## 7. 개발 환경 구성

### 7.1 Visual Studio 프로젝트 설정

새 프로젝트에서 SOEM 사용:

```
Include 디렉토리:
C:\EtherCAT\SOEM\soem
C:\EtherCAT\SOEM\osal
C:\EtherCAT\SOEM\osal\win32
C:\EtherCAT\SOEM\oshw\win32

Library 디렉토리:
C:\EtherCAT\SOEM\build\Release

추가 종속성:
soem.lib
Winmm.lib
ws2_32.lib
```

### 7.2 간단한 예제 코드

```c
#include <stdio.h>
#include "ethercat.h"

int main(int argc, char *argv[])
{
    char ifname[] = "\\Device\\NPF_{YOUR-ADAPTER-GUID}";

    // EtherCAT 초기화
    if (ec_init(ifname))
    {
        printf("ec_init succeeded.\n");

        // Slave 검색
        if (ec_config(FALSE, &IOmap) > 0)
        {
            printf("%d slaves found.\n", ec_slavecount);

            // OP 상태 전환
            ec_slave[0].state = EC_STATE_OPERATIONAL;
            ec_writestate(0);

            // PDO 교환 루프
            while(1)
            {
                ec_send_processdata();
                ec_receive_processdata(EC_TIMEOUTRET);
                // 데이터 처리...
            }
        }
        ec_close();
    }
    return 0;
}
```

---

## 8. 유용한 도구

### 8.1 PySOEM (Python 래퍼)

Python에서 SOEM 사용:

```powershell
pip install pysoem
```

```python
import pysoem

master = pysoem.Master()
master.open('\\Device\\NPF_{YOUR-ADAPTER-GUID}')

if master.config_init() > 0:
    print(f'{len(master.slaves)} slaves found')
    for slave in master.slaves:
        print(f'  - {slave.name}')
```

### 8.2 Wireshark로 EtherCAT 패킷 분석

1. Wireshark 설치 (https://www.wireshark.org/)
2. Npcap과 함께 설치됨
3. EtherCAT 인터페이스 선택 후 캡처
4. 필터: `ecat`

---

## 9. 참고 링크

- [SOEM GitHub](https://github.com/OpenEtherCATsociety/SOEM)
- [Npcap 다운로드](https://npcap.com/)
- [EtherCAT Technology Group](https://www.ethercat.org/)
- [PySOEM GitHub](https://github.com/bnjmnp/pysoem)

---

**문서 버전**: 1.0
**작성일**: 2026-02-14
**대상 시스템**: Windows 11 Pro + Intel I219-V
