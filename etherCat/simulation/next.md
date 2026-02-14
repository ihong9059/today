# EtherCAT 시뮬레이션 - 다음 단계

## 현재 상태 요약

| 항목 | 상태 | 비고 |
|------|------|------|
| Npcap | 설치됨 | WinPcap 호환 모드 |
| PySOEM | 설치됨 | Python 3.14 |
| Scapy | 설치됨 | Slave 에뮬레이터용 |
| Master 기능 | 정상 | Intel I219-V 사용 |
| Slave 에뮬레이터 | 부분 동작 | 프레임 송수신 성공 (4000+/초) |
| 완전한 Slave 인식 | 미완료 | TwinCAT 또는 하드웨어 필요 |

---

## 다음 단계 옵션

### 옵션 A: TwinCAT 3 설치 (권장)

완전한 EtherCAT Slave 시뮬레이션을 위한 가장 확실한 방법.

**작업 순서:**
1. Beckhoff 웹사이트 회원가입
   - https://www.beckhoff.com/ko-kr/

2. TwinCAT 3 XAE 다운로드
   - 경로: 다운로드 > 소프트웨어 > TwinCAT 3
   - 파일: TC31-Full-Setup

3. 설치 (약 30분 소요)
   - Visual Studio 통합 설치
   - EtherCAT Master/Slave 드라이버 설치

4. EtherCAT Simulation Device 구성
   - TwinCAT XAE 실행
   - 새 프로젝트 생성
   - I/O > EtherCAT Simulation Device 추가
   - Realtek USB GbE 어댑터에 바인딩

5. 가상 Slave 추가
   - EK1100 (Bus Coupler)
   - EL1008 (8-Ch Digital Input)
   - EL2008 (8-Ch Digital Output)

6. 시뮬레이션 활성화
   - Configuration 모드에서 Run 모드로 전환

**예상 결과:**
```
py -3.14 src\python\scan_slaves.py 8

[2] Slave 검색 중...
    ✓ 3개 Slave 발견!

  Slave 1: EK1100
  Slave 2: EL1008
  Slave 3: EL2008
```

---

### 옵션 B: 실제 EtherCAT Slave 하드웨어 구매

빠른 테스트를 위한 저렴한 하드웨어 옵션.

**추천 제품 (AliExpress):**

| 제품 | 가격 | 용도 |
|------|------|------|
| LAN9252 개발보드 | ~$30 | 범용 Slave |
| EasyCAT PRO | ~$50 | Arduino/Raspberry Pi 호환 |
| EC-SIM 모듈 | ~$80 | Digital I/O 시뮬레이션 |

**구매 링크:** `etherCat/AliExpress_EtherCAT_Slave_추천목록.md` 참조

**작업 순서:**
1. 하드웨어 구매 및 수령 (1-2주)
2. Intel I219-V 포트에 직접 연결
3. scan_slaves.py로 인식 확인
4. digital_io_test.py로 PDO 통신 테스트

---

### 옵션 C: Slave 에뮬레이터 개선

현재 소프트웨어 에뮬레이터를 개선하여 완전한 Slave 인식 구현.

**필요한 개선 사항:**

1. **EEPROM/SII 완전 구현**
   - ESI (EtherCAT Slave Information) 데이터 구조
   - SII 읽기 시퀀스 (0x0502, 0x0504, 0x0508 레지스터)
   - 카테고리 데이터 (Strings, General, FMMU, SM, TxPDO, RxPDO)

2. **상태 머신 완전 구현**
   - INIT → PRE-OP → SAFE-OP → OP 전이
   - AL Status Code 응답
   - Sync Manager 구성

3. **PDO 매핑 지원**
   - TxPDO/RxPDO 구성
   - FMMU 매핑

**예상 작업량:** 2-3일

---

## 권장 진행 순서

### 단기 (오늘)
- [ ] TwinCAT 3 다운로드 시작 (시간 소요)

### 중기 (이번 주)
- [ ] TwinCAT 3 설치 완료
- [ ] EtherCAT Simulation Device 구성
- [ ] 가상 Slave로 scan_slaves.py 테스트
- [ ] PDO 사이클 테스트 (digital_io_test.py)

### 장기 (하드웨어 도착 후)
- [ ] 실제 EtherCAT Slave 모듈 연결
- [ ] 실시간 PDO 통신 테스트 (1ms 사이클)
- [ ] 모터 드라이브 연동 테스트

---

## 참고 문서

| 문서 | 경로 |
|------|------|
| TwinCAT 설치 가이드 | `simulation/setup/04_install_twincat.md` |
| 통합 시뮬레이션 가이드 | `etherCat/TwinCAT_SOEM_통합_시뮬레이션_가이드.md` |
| AliExpress 추천 목록 | `etherCat/AliExpress_EtherCAT_Slave_추천목록.md` |
| Master/Slave 설명서 | `etherCat/EtherCAT_Master_Slave_설명서.md` |

---

## 명령어 빠른 참조

```powershell
# 환경 확인
py -3.14 tools\check_adapters.py

# 어댑터 목록
py -3.14 src\python\scan_slaves.py list

# Slave 에뮬레이터 시작 (터미널 1)
py -3.14 src\python\ethercat_slave_emulator.py "Realtek"

# Master 스캔 (터미널 2)
py -3.14 src\python\scan_slaves.py 8

# 루프백 테스트
py -3.14 src\python\ethercat_loopback_test.py
```
