# EtherCAT Slave 시뮬레이션 방법 검토서

## 1. 개요

본 문서는 Windows 11 PC에서 EtherCAT Master(SOEM)를 테스트하기 위한 Slave 시뮬레이션 방법을 검토한다.

### 1.1 검토 배경
- 실제 EtherCAT Slave 하드웨어 없이 Master 개발 및 테스트 필요
- 비용 및 시간 절약을 위한 시뮬레이션 환경 구축 검토

### 1.2 검토 대상
1. 순수 소프트웨어 시뮬레이션
2. Raspberry Pi + EtherCAT HAT 구성
3. TwinCAT 3 시뮬레이션 환경

---

## 2. 순수 소프트웨어 시뮬레이션

### 2.1 SOES (Simple Open EtherCAT Slave)

| 항목 | 내용 |
|------|------|
| 라이선스 | 오픈소스 (GPLv2) |
| 플랫폼 | Linux, 임베디드 시스템 |
| Windows 지원 | **제한적** |
| 하드웨어 요구 | ESC 칩 필요 (LAN9252, AX58100 등) |

**결론**: 순수 소프트웨어만으로 EtherCAT Slave 시뮬레이션 **불가**

EtherCAT은 하드웨어 레벨 프로토콜로, ESC(EtherCAT Slave Controller) 칩 없이는 완전한 시뮬레이션이 어렵다.

### 2.2 상용 솔루션: acontis EC-Simulator

| 항목 | 내용 |
|------|------|
| 제조사 | acontis technologies GmbH |
| 플랫폼 | Windows, Linux, QNX, VxWorks |
| 물리 NIC 필요 | **불필요** (가상 네트워크 지원) |
| 기능 | PDO/SDO 완전 지원, DC 지원 |
| 라이선스 | 상용 (평가판 가능) |
| API | C/C++, .NET |

**특징**:
- 물리적 네트워크 어댑터 없이 완전 가상 시뮬레이션 가능
- ENI 파일로 실제 네트워크 구성 그대로 시뮬레이션
- 개발 및 테스트 시간 단축

**링크**: [acontis EC-Simulator](https://www.acontis.com/en/ethercat-simulation.html)

---

## 3. Raspberry Pi + EtherCAT HAT 구성

### 3.1 시스템 구성도

```
┌─────────────────────────────────────────────────────────────┐
│                    Windows 11 PC (Master)                    │
│  ┌──────────────┐                                           │
│  │    SOEM      │                                           │
│  │   Library    │                                           │
│  └──────┬───────┘                                           │
│         │                                                    │
│  ┌──────┴───────┐                                           │
│  │ Intel I219-V │                                           │
│  └──────┬───────┘                                           │
└─────────┼───────────────────────────────────────────────────┘
          │
          │ CAT6 Ethernet Cable
          │
┌─────────┴───────────────────────────────────────────────────┐
│                  Raspberry Pi 3 B (Slave)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   EasyCAT HAT                         │   │
│  │  ┌────────────┐    ┌────────────┐    ┌────────────┐  │   │
│  │  │  RJ45 IN   │    │  LAN9252   │    │  RJ45 OUT  │  │   │
│  │  │  (Port 0)  │    │    ESC     │    │  (Port 1)  │  │   │
│  │  └────────────┘    └─────┬──────┘    └────────────┘  │   │
│  │                          │ SPI                        │   │
│  └──────────────────────────┼───────────────────────────┘   │
│                             │                                │
│  ┌──────────────────────────┴───────────────────────────┐   │
│  │              Raspberry Pi 3 B                         │   │
│  │  ┌──────────┐    ┌──────────┐    ┌──────────────┐    │   │
│  │  │   SOES   │    │   SPI    │    │   GPIO       │    │   │
│  │  │  Stack   │◄──►│Interface │◄──►│  (I/O제어)   │    │   │
│  │  └──────────┘    └──────────┘    └──────────────┘    │   │
│  └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 하드웨어 옵션 비교

| 제품 | 가격 | 특징 | 구매처 |
|------|------|------|--------|
| **EasyCAT HAT** | €50 (~$55) | 공식 제품, 문서 풍부, DIP스위치/LED 포함 | [AB&T Shop](https://www.bausano.net/shop/en/home/14-raspberry-ethercat.html) |
| **EtherC V1.6** | €45~60 | RTC 포함, LAN9252 기반 | [SG Electronic](https://www.sg-electronic-systems.com/ethercat-shield-for-raspberry-pi-etherc-v1-6/) |
| **LAN9252 모듈 (DIY)** | $30~50 | 직접 배선 필요 | AliExpress |

### 3.3 EasyCAT HAT 사양

| 항목 | 사양 |
|------|------|
| ESC 칩 | Microchip LAN9252 |
| 인터페이스 | SPI (Raspberry Pi GPIO) |
| PDO 크기 | 32 Byte (최대 128 Byte 확장 가능) |
| 이더넷 포트 | 2x RJ45 (IN/OUT) |
| 동기화 방식 | Free RUN, SM Sync, Distributed Clocks |
| 온보드 I/O | DIP 스위치 4개, LED 4개 |
| 가격 | €50 (세금 별도) |

### 3.4 소프트웨어 설정

#### Raspberry Pi 측 (Slave)

```bash
# 1. SPI 활성화
sudo raspi-config
# Interface Options → SPI → Enable

# 2. BCM2835 라이브러리 설치
wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.73.tar.gz
tar xvfz bcm2835-1.73.tar.gz
cd bcm2835-1.73
./configure
make
sudo make install

# 3. SOES 클론 (Raspberry Pi 지원 버전)
git clone https://github.com/iwoodsawyer/SOES.git
cd SOES

# 4. 빌드
mkdir build && cd build
cmake .. -DHAL=raspberrypi-lan9252
make

# 5. 실행
sudo ./soes_demo
```

#### Windows PC 측 (Master)

```powershell
# 기존 SOEM 사용
cd C:\EtherCAT\SOEM\build\Release
.\slaveinfo.exe \Device\NPF_{YOUR-ADAPTER-GUID}
.\simple_test.exe \Device\NPF_{YOUR-ADAPTER-GUID}
```

### 3.5 예상 비용

| 항목 | 수량 | 가격 | 비고 |
|------|------|------|------|
| Raspberry Pi 3 B | 1 | 보유 시 ₩0 | - |
| EasyCAT HAT | 1 | €50 (~₩75,000) | 배송비 별도 |
| CAT6 케이블 | 2 | ₩5,000 | 1m x 2 |
| DC 5V 전원 | 1 | 보유 시 ₩0 | RPi용 |
| **총계** | | **~₩80,000** | RPi 보유 시 |

### 3.6 장단점

**장점**:
- 비용 효율적 (RPi 보유 시 €50만 추가)
- Python/C로 Slave 로직 자유롭게 개발 가능
- RPi GPIO 활용하여 다양한 센서/액추에이터 연결 가능
- 실제 하드웨어 기반 테스트로 신뢰성 높음
- 문서 및 커뮤니티 지원 풍부

**단점**:
- HAT 보드 구매 및 배송 대기 필요 (2~3주)
- 초기 설정 작업 필요
- 단일 Slave만 가능 (다중 Slave 테스트 불가)

### 3.7 참고 링크

- [SOES Raspberry Pi Fork - GitHub](https://github.com/iwoodsawyer/SOES)
- [Acontis RPi4 + EasyCAT 가이드](https://www.acontis.com/en/ethercat-slave-stack-on-raspberry-pi-4-with-easycat-hat.html)
- [EasyCAT HAT 공식 페이지](https://www.bausano.net/en/hardware/ethercat-and-raspberry.html)

---

## 4. TwinCAT 3 시뮬레이션 환경

### 4.1 개요

Beckhoff TwinCAT 3의 TE1111 EtherCAT Simulation 기능을 사용하여 가상 Slave 네트워크를 구성할 수 있다.

### 4.2 시뮬레이션 가능 Slave 수

| 항목 | 제한 |
|------|------|
| **EtherCAT 프로토콜 최대** | 65,535개 Slave |
| **TwinCAT Master 지원** | 65,535개 Slave (1개 EtherCAT 시스템당) |

#### 실제 제한 요소

| 제한 요소 | 설명 |
|-----------|------|
| PC 성능 | CPU, RAM에 따라 시뮬레이션 가능 수 결정 |
| 사이클 타임 | 최소 50μs (시뮬레이션), 실제 100μs 이상 권장 |
| PDO 크기 | Slave당 PDO 데이터 크기에 따라 달라짐 |
| 라이선스 | TE1111은 인스턴스 기반 라이선스 |

#### PC 사양별 예상 가능 Slave 수

| PC 사양 | 예상 가능 Slave 수 | 사이클 타임 |
|---------|-------------------|-------------|
| i5 + 16GB (현재 PC) | **수십~수백 개** | 1ms |
| 고성능 IPC | **수백~수천 개** | 100μs~1ms |
| 산업용 서버 | **수천 개 이상** | 가능 |

### 4.3 TE1111 EtherCAT Simulation 특징

```
✓ 실제 Slave 없이 전체 네트워크 시뮬레이션
✓ Distributed Clock (DC) 지원
✓ CoE, SoE 프로토콜 지원
✓ 실제 Slave와 가상 Slave 혼합 운영 가능
✓ HIL (Hardware-in-the-Loop) 시뮬레이션 지원
✓ 기존 프로젝트 수정 없이 테스트 가능
```

### 4.4 구성 방식

#### 방식 1: 2대 PC 구성 (권장)

```
┌────────────────┐         ┌────────────────┐
│   PC 1 (SUT)   │         │ PC 2 (Simulator)│
│                │         │                 │
│  TwinCAT       │  ETH    │  TE1111         │
│  Master        │◄───────►│  EtherCAT Sim   │
│                │  Cable  │                 │
│  PLC Program   │         │  Virtual Slaves │
│                │         │  (수십~수백 개)  │
└────────────────┘         └────────────────┘
```

#### 방식 2: 단일 PC 구성

| 방법 | 설명 |
|------|------|
| 가상 네트워크 | 물리적 NIC 없이 내부 시뮬레이션 |
| 루프백 | 2개 NIC를 케이블로 연결 |
| 혼합 모드 | 실제 Slave + 가상 Slave |

### 4.5 라이선스

| 에디션 | 가격 | 기간 | Slave 제한 |
|--------|------|------|-----------|
| **TwinCAT 3 XAE** | 무료 | 7일 평가 | 제한 없음 |
| **TE1111 라이선스** | 유료 | 영구 | 인스턴스당 |

**무료 평가판 특징**:
- 7일마다 라이선스 갱신 필요
- 기능 제한 없음
- 개발 및 테스트 용도로 충분

### 4.6 장단점

**장점**:
- 하드웨어 없이 다수 Slave 시뮬레이션 가능
- 다양한 Slave 타입 (I/O, 서보, 센서 등) 시뮬레이션
- 실제 산업 환경과 동일한 개발 환경
- DC, CoE, SoE 등 모든 EtherCAT 기능 지원
- 무료 평가판 사용 가능

**단점**:
- 설치 및 설정 복잡
- Windows 전용
- 상용 라이선스 비용 (장기 사용 시)
- 학습 곡선 존재

### 4.7 참고 링크

- [Beckhoff TE1111 제품 페이지](https://www.beckhoff.com/en-en/products/automation/twincat/texxxx-twincat-3-engineering/te1111.html)
- [TE1111 매뉴얼 PDF](https://download.beckhoff.com/download/document/automation/twincat3/TE1111_TC3_EtherCAT_Simulation_en.pdf)
- [TwinCAT 3 다운로드](https://www.beckhoff.com/en-en/products/automation/twincat/)

---

## 5. 방법별 비교

| 항목 | 소프트웨어 시뮬레이션 | Raspberry Pi + HAT | TwinCAT 3 시뮬레이션 |
|------|----------------------|-------------------|---------------------|
| **비용** | EC-Simulator: 유료 | €50 + RPi | 무료 (7일 평가) |
| **Slave 수** | 다수 가능 | 1개 | 수십~수백 개 |
| **설정 난이도** | 중간 | 낮음~중간 | 높음 |
| **실제 HW 테스트** | 불가 | **가능** | 제한적 |
| **개발 유연성** | 높음 | **높음** | 중간 |
| **산업 호환성** | 높음 | 중간 | **매우 높음** |
| **학습 가치** | 중간 | **높음** | 높음 |

---

## 6. 권장 사항

### 6.1 용도별 추천

| 용도 | 권장 방법 | 이유 |
|------|-----------|------|
| **학습/입문** | Raspberry Pi + EasyCAT HAT | 비용 효율적, 실제 HW 경험 |
| **Master 개발** | TwinCAT 3 시뮬레이션 | 다수 Slave 테스트 가능 |
| **제품 개발** | 실제 Slave HW | 신뢰성 검증 필수 |
| **HIL 테스트** | TwinCAT 3 + 실제 HW 혼합 | 가장 현실적인 테스트 |

### 6.2 현재 환경 기준 추천

**Raspberry Pi 3 B 보유 시:**
1. **1순위**: EasyCAT HAT 구매 (€50) → 실제 Slave 테스트
2. **2순위**: TwinCAT 3 평가판 → 다중 Slave 시뮬레이션

**Raspberry Pi 미보유 시:**
1. **1순위**: TwinCAT 3 평가판 → 무료 시뮬레이션
2. **2순위**: AliExpress LAN9252 개발보드 ($99) → 실제 HW 테스트

### 6.3 단계별 접근 권장

```
Step 1: TwinCAT 3 평가판 설치 (무료)
        → 기본 시뮬레이션 환경 구축
        → EtherCAT 개념 학습

Step 2: Raspberry Pi + EasyCAT HAT (€50)
        → 실제 하드웨어 테스트
        → Slave 펌웨어 개발 경험

Step 3: AliExpress Slave 모듈 추가 ($99~)
        → 다중 Slave 실제 테스트
        → 산업용 적용 준비
```

---

## 7. 결론

| 질문 | 답변 |
|------|------|
| PC만으로 Slave 시뮬레이션 가능? | **제한적** (TwinCAT 3 또는 상용 솔루션 필요) |
| Raspberry Pi로 Slave 구성 가능? | **가능** (EasyCAT HAT €50 필요) |
| TwinCAT 최대 Slave 수? | 이론적 65,535개, 실제 수십~수백 개 |
| 가장 비용 효율적인 방법? | RPi 보유 시 EasyCAT HAT (€50) |
| 가장 빠른 테스트 방법? | TwinCAT 3 평가판 (무료, 즉시 시작) |

---

**문서 버전**: 1.0
**작성일**: 2026-02-14
**대상 시스템**: Windows 11 Pro (i5-1235U, 16GB RAM)
