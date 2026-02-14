# EtherCAT Master-Slave 테스트 실험 계획서

## 1. 실험 개요

### 1.1 목적
Windows 11 PC에 설치된 SOEM(Simple Open EtherCAT Master)과 AliExpress에서 구매한 EtherCAT Slave 모듈 간의 통신을 검증하고, EtherCAT 프로토콜의 기본 동작을 확인한다.

### 1.2 실험 대상 시스템

#### Master 시스템
| 항목 | 사양 |
|------|------|
| PC | DESKTOP-MD6RE2A |
| OS | Windows 11 Pro (Build 26100) |
| CPU | Intel Core i5-1235U |
| RAM | 16GB |
| NIC | Intel I219-V |
| Master Stack | SOEM (Simple Open EtherCAT Master) |

#### Slave 시스템 (구매 예정)
| 항목 | 사양 |
|------|------|
| 모듈 | LAN9252 EtherCAT Slave Development Board |
| MCU | STM32F407ZGT6 |
| ESC | Microchip LAN9252 |
| I/O | 16 Digital I/O (8 IN + 8 OUT) |
| 인터페이스 | SPI/FSMC |

---

## 2. 실험 환경 구성

### 2.1 하드웨어 구성도

```
┌─────────────────────────────────────────────────────────────┐
│                        Windows 11 PC                         │
│                     (EtherCAT Master)                        │
│  ┌──────────────┐                                           │
│  │    SOEM      │                                           │
│  │   Library    │                                           │
│  └──────┬───────┘                                           │
│         │                                                    │
│  ┌──────┴───────┐                                           │
│  │ Intel I219-V │                                           │
│  │  (100Mbps)   │                                           │
│  └──────┬───────┘                                           │
└─────────┼───────────────────────────────────────────────────┘
          │
          │ CAT6 Ethernet Cable
          │
┌─────────┴───────────────────────────────────────────────────┐
│              LAN9252 Slave Development Board                 │
│                     (EtherCAT Slave)                         │
│  ┌──────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │   RJ45 IN    │    │   LAN9252    │    │  STM32F407    │  │
│  │  (Port 0)    ├────┤     ESC      ├────┤     MCU       │  │
│  └──────────────┘    └──────────────┘    └───────┬───────┘  │
│                                                   │          │
│  ┌──────────────┐                         ┌──────┴───────┐  │
│  │   RJ45 OUT   │                         │   GPIO 16ch  │  │
│  │  (Port 1)    │                         │  8IN + 8OUT  │  │
│  └──────────────┘                         └──────────────┘  │
│                                                              │
│  [LED 1] [LED 2] [LED 3] ... [LED 8]  ← Output Indicators   │
│  [BTN 1] [BTN 2] [BTN 3] ... [BTN 8]  ← Input Switches      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 연결 구성

```
[PC - Intel I219-V] ──CAT6──> [Slave Port 0 (IN)]
                              [Slave Port 1 (OUT)] ──(미사용 또는 종단)
```

### 2.3 전원 구성

| 장치 | 전원 사양 | 전원 공급 |
|------|-----------|-----------|
| PC | AC 220V | 기존 전원 |
| Slave Board | DC 5V / 2A | USB 또는 DC 어댑터 |

---

## 3. 실험 단계

### Phase 1: 환경 준비 (Slave 도착 전)

#### 1.1 소프트웨어 설치
- [ ] Visual Studio 2022 설치
- [ ] CMake 설치
- [ ] Git 설치
- [ ] Npcap 설치 (WinPcap 호환 모드)
- [ ] SOEM 빌드 및 설치

#### 1.2 네트워크 설정
- [ ] Intel I219-V 드라이버 최신 버전 확인
- [ ] EtherCAT 전용 IP 설정 (192.168.1.100)
- [ ] 방화벽 예외 설정

#### 1.3 도구 준비
- [ ] slaveinfo.exe 동작 확인
- [ ] simple_test.exe 빌드 확인
- [ ] Wireshark 설치 (패킷 분석용)

### Phase 2: 하드웨어 연결 (Slave 도착 후)

#### 2.1 물리적 연결
- [ ] Slave 보드 육안 검사 (손상 여부)
- [ ] 전원 연결 (LED 점등 확인)
- [ ] 이더넷 케이블 연결

#### 2.2 연결 확인
- [ ] PC에서 Link LED 확인
- [ ] Slave 보드의 Link LED 확인
- [ ] Wireshark에서 EtherCAT 프레임 관찰

### Phase 3: 기본 통신 테스트

#### 3.1 Slave 인식 테스트
```powershell
# 테스트 명령
cd C:\EtherCAT\SOEM\build\Release
.\slaveinfo.exe 1

# 예상 출력
# Slave:1
#  Name: LAN9252 EtherCAT Slave
#  Output size: X bytes
#  Input size: X bytes
#  State: PREOP
```

- [ ] Slave 감지 성공
- [ ] Slave 이름 확인
- [ ] PDO 크기 확인

#### 3.2 상태 전이 테스트
```
INIT → PRE-OP → SAFE-OP → OP
```

- [ ] INIT 상태 확인
- [ ] PRE-OP 전이 성공
- [ ] SAFE-OP 전이 성공
- [ ] OP 전이 성공

### Phase 4: PDO 통신 테스트

#### 4.1 Output 테스트 (Master → Slave)
- [ ] 개별 LED 제어 (LED 1~8 순차 점등)
- [ ] 전체 LED ON/OFF
- [ ] PWM 패턴 출력 (있는 경우)

#### 4.2 Input 테스트 (Slave → Master)
- [ ] 버튼 상태 읽기
- [ ] 버튼 눌림 이벤트 감지
- [ ] 입력 변화 반응 시간 측정

### Phase 5: 성능 측정

#### 5.1 통신 주기 측정
| 측정 항목 | 목표값 | 측정 방법 |
|-----------|--------|-----------|
| 통신 주기 | 1 ms | SOEM 타이머 |
| 지터 | < 100 μs | 통계 분석 |
| 패킷 손실률 | 0% | WKC 모니터링 |

#### 5.2 안정성 테스트
- [ ] 1시간 연속 동작 테스트
- [ ] 케이블 분리/재연결 복구 테스트
- [ ] 상태 전이 반복 테스트 (100회)

---

## 4. 테스트 케이스

### TC-001: Slave 감지
| 항목 | 내용 |
|------|------|
| 목적 | Master가 Slave를 정상 인식하는지 확인 |
| 사전조건 | Slave 전원 ON, 이더넷 연결 |
| 테스트 단계 | 1. slaveinfo.exe 실행<br>2. 출력 결과 확인 |
| 예상 결과 | Slave 이름, 상태, PDO 크기 출력 |
| 판정 기준 | Slave 1개 이상 감지 시 PASS |

### TC-002: OP 상태 전이
| 항목 | 내용 |
|------|------|
| 목적 | Slave가 OP 상태까지 정상 전이하는지 확인 |
| 사전조건 | TC-001 PASS |
| 테스트 단계 | 1. simple_test.exe 실행<br>2. 상태 전이 로그 확인 |
| 예상 결과 | "All slaves reached OP state" 메시지 |
| 판정 기준 | OP 상태 도달 시 PASS |

### TC-003: Digital Output 제어
| 항목 | 내용 |
|------|------|
| 목적 | Master에서 Slave의 출력을 제어할 수 있는지 확인 |
| 사전조건 | TC-002 PASS |
| 테스트 단계 | 1. 출력 데이터 0xFF 전송<br>2. LED 점등 확인<br>3. 출력 데이터 0x00 전송<br>4. LED 소등 확인 |
| 예상 결과 | 모든 LED 점등/소등 |
| 판정 기준 | 8개 LED 모두 제어 시 PASS |

### TC-004: Digital Input 읽기
| 항목 | 내용 |
|------|------|
| 목적 | Slave의 입력을 Master에서 읽을 수 있는지 확인 |
| 사전조건 | TC-002 PASS |
| 테스트 단계 | 1. 버튼 1 누름<br>2. 입력 데이터 확인<br>3. 버튼 1 해제<br>4. 입력 데이터 확인 |
| 예상 결과 | 버튼 상태에 따른 비트 변화 |
| 판정 기준 | 8개 입력 모두 감지 시 PASS |

### TC-005: 통신 주기 측정
| 항목 | 내용 |
|------|------|
| 목적 | 실시간 통신 성능 확인 |
| 사전조건 | TC-002 PASS |
| 테스트 단계 | 1. 1ms 주기로 PDO 교환<br>2. 1000회 반복<br>3. 소요 시간 측정 |
| 예상 결과 | 평균 주기 1ms ± 10% |
| 판정 기준 | 지터 100μs 이하 시 PASS |

### TC-006: 연속 동작 안정성
| 항목 | 내용 |
|------|------|
| 목적 | 장시간 동작 안정성 확인 |
| 사전조건 | TC-002 PASS |
| 테스트 단계 | 1. 1ms 주기 PDO 교환<br>2. 1시간 연속 동작<br>3. 오류 카운트 확인 |
| 예상 결과 | WKC 오류 0건 |
| 판정 기준 | 패킷 손실 0% 시 PASS |

---

## 5. 테스트 코드

### 5.1 기본 테스트 프로그램

```c
// ethercat_test.c
#include <stdio.h>
#include <string.h>
#include <time.h>
#include "ethercat.h"

#define EC_TIMEOUTMON 500

char IOmap[4096];
int expectedWKC;

int main(int argc, char *argv[])
{
    int i, oloop, iloop, chk;

    if (argc < 2) {
        printf("Usage: ethercat_test ifname\n");
        return 1;
    }

    printf("=== EtherCAT Master-Slave Test ===\n");
    printf("Interface: %s\n\n", argv[1]);

    // Phase 1: 초기화
    printf("[Phase 1] Initializing...\n");
    if (ec_init(argv[1])) {
        printf("  ec_init succeeded.\n");

        // Phase 2: Slave 검색
        printf("[Phase 2] Scanning for slaves...\n");
        if (ec_config_init(FALSE) > 0) {
            printf("  %d slave(s) found and configured.\n", ec_slavecount);

            // Slave 정보 출력
            for (i = 1; i <= ec_slavecount; i++) {
                printf("  Slave %d:\n", i);
                printf("    Name: %s\n", ec_slave[i].name);
                printf("    Output: %d bytes\n", ec_slave[i].Obytes);
                printf("    Input: %d bytes\n", ec_slave[i].Ibytes);
            }

            // Phase 3: PDO 매핑
            printf("[Phase 3] Mapping PDOs...\n");
            ec_config_map(&IOmap);
            ec_configdc();
            printf("  IOmap size: %d\n", (int)sizeof(IOmap));

            // Phase 4: SAFE-OP 전이
            printf("[Phase 4] Transitioning to SAFE-OP...\n");
            ec_statecheck(0, EC_STATE_SAFE_OP, EC_TIMEOUTSTATE * 4);

            expectedWKC = (ec_group[0].outputsWKC * 2) + ec_group[0].inputsWKC;
            printf("  Expected WKC: %d\n", expectedWKC);

            // Phase 5: OP 전이
            printf("[Phase 5] Requesting OP state...\n");
            ec_slave[0].state = EC_STATE_OPERATIONAL;
            ec_send_processdata();
            ec_receive_processdata(EC_TIMEOUTRET);
            ec_writestate(0);

            chk = 200;
            do {
                ec_send_processdata();
                ec_receive_processdata(EC_TIMEOUTRET);
                ec_statecheck(0, EC_STATE_OPERATIONAL, 50000);
            } while (chk-- && (ec_slave[0].state != EC_STATE_OPERATIONAL));

            if (ec_slave[0].state == EC_STATE_OPERATIONAL) {
                printf("  SUCCESS: All slaves in OP state!\n\n");

                // Phase 6: PDO 통신 테스트
                printf("[Phase 6] PDO Communication Test...\n");
                printf("  Running 1000 cycles...\n");

                int wkc_errors = 0;
                clock_t start = clock();

                for (i = 0; i < 1000; i++) {
                    // Output 테스트: LED 패턴
                    ec_slave[1].outputs[0] = (i % 256);

                    ec_send_processdata();
                    int wkc = ec_receive_processdata(EC_TIMEOUTRET);

                    if (wkc < expectedWKC) {
                        wkc_errors++;
                    }

                    // 1ms 대기
                    osal_usleep(1000);
                }

                clock_t end = clock();
                double elapsed = (double)(end - start) / CLOCKS_PER_SEC;

                printf("  Completed in %.3f seconds\n", elapsed);
                printf("  WKC Errors: %d\n", wkc_errors);
                printf("  Average cycle: %.3f ms\n", elapsed);

                // 입력 상태 출력
                printf("\n[Phase 7] Input Status:\n");
                printf("  Input byte 0: 0x%02X\n", ec_slave[1].inputs[0]);

                printf("\n=== TEST COMPLETED ===\n");
            }
            else {
                printf("  FAILED: Could not reach OP state.\n");
            }

            // 정리
            printf("\nRequesting INIT state...\n");
            ec_slave[0].state = EC_STATE_INIT;
            ec_writestate(0);
        }
        else {
            printf("  No slaves found!\n");
        }
        ec_close();
    }
    else {
        printf("  ec_init failed!\n");
    }

    return 0;
}
```

### 5.2 빌드 방법

```powershell
# CMakeLists.txt에 추가
add_executable(ethercat_test test/ethercat_test.c)
target_link_libraries(ethercat_test soem)

# 빌드
cmake --build . --config Release --target ethercat_test
```

---

## 6. 예상 문제 및 대응

| 문제 | 원인 | 대응 방안 |
|------|------|-----------|
| Slave 미감지 | 케이블/전원 문제 | 케이블 교체, 전원 확인 |
| WKC = 0 | Windows 11 이슈 | nicdrv.c 패치 적용 |
| OP 전이 실패 | ESI 설정 불일치 | ESI 파일 확인/수정 |
| 지터 과다 | 시스템 부하 | 프로세스 우선순위 조정 |
| 통신 끊김 | EMI/노이즈 | 차폐 케이블 사용 |

---

## 7. 결과 보고서 양식

### 7.1 테스트 결과 요약

| 테스트 ID | 테스트 항목 | 결과 | 비고 |
|-----------|-------------|------|------|
| TC-001 | Slave 감지 | PASS/FAIL | |
| TC-002 | OP 상태 전이 | PASS/FAIL | |
| TC-003 | Digital Output | PASS/FAIL | |
| TC-004 | Digital Input | PASS/FAIL | |
| TC-005 | 통신 주기 | PASS/FAIL | 측정값: ___ms |
| TC-006 | 안정성 | PASS/FAIL | 오류: ___건 |

### 7.2 성능 측정 결과

| 측정 항목 | 목표 | 측정값 | 판정 |
|-----------|------|--------|------|
| 통신 주기 | 1 ms | ___ ms | |
| 지터 (최대) | 100 μs | ___ μs | |
| 지터 (평균) | 50 μs | ___ μs | |
| 패킷 손실률 | 0% | ___% | |

### 7.3 문제점 및 개선사항

| 번호 | 문제점 | 원인 분석 | 개선 방안 | 상태 |
|------|--------|-----------|-----------|------|
| 1 | | | | |
| 2 | | | | |

---

## 8. 일정

| 단계 | 작업 내용 | 예상 소요 |
|------|-----------|-----------|
| 준비 | 소프트웨어 설치, SOEM 빌드 | 1일 |
| 대기 | Slave 모듈 배송 | 2~3주 |
| Phase 1-2 | 하드웨어 연결 및 확인 | 0.5일 |
| Phase 3 | 기본 통신 테스트 | 0.5일 |
| Phase 4 | PDO 통신 테스트 | 1일 |
| Phase 5 | 성능 측정 | 1일 |
| 보고서 | 결과 정리 및 문서화 | 0.5일 |

---

## 9. 필요 물품 체크리스트

### 하드웨어
- [ ] LAN9252 Slave Development Board ($99~$145)
- [ ] CAT6 이더넷 케이블 2m x 2 ($6)
- [ ] DC 5V/2A 전원 어댑터 ($5)
- [ ] USB-JTAG 디버거 (ST-Link V2) ($5) - 선택

### 소프트웨어
- [ ] Visual Studio 2022 Community
- [ ] CMake 3.20+
- [ ] Npcap 1.87+
- [ ] Git
- [ ] Wireshark
- [ ] SOEM (GitHub)

### 문서
- [ ] LAN9252 Datasheet
- [ ] STM32F407 Reference Manual
- [ ] ESI 파일 (제조사 제공 또는 생성)

---

**문서 버전**: 1.0
**작성일**: 2026-02-14
**작성자**: EtherCAT 테스트팀
