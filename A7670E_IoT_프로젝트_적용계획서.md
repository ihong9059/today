# A7670E 모듈 IoT 프로젝트 적용 계획서

**작성일:** 2025년 12월 18일
**모듈:** SIMCOM A7670E (LTE Cat 1 + GPS)
**구매처:** AliExpress

---

## 1. 모듈 개요

### 1.1 제품 정보
| 항목 | 내용 |
|------|------|
| 모델명 | SIMCOM A7670E |
| 타입 | LTE Cat 1 + GPS 통합 모듈 |
| 폼팩터 | LCC + LGA (24 x 24 x 2.5mm) |
| 호환성 | SIM7000/SIM7070 시리즈와 핀 호환 |

### 1.2 네트워크 지원
- **LTE-FDD:** B1/B3/B5/B7/B8/B20
- **GSM/GPRS/EDGE:** 900/1800 MHz
- **다운로드 속도:** 최대 10 Mbps
- **업로드 속도:** 최대 5 Mbps
- **GPRS/EDGE:** 최대 236.8 Kbps

### 1.3 GNSS (위치측위)
- **지원 시스템:** GPS, GLONASS, BDS (중국 베이더우)
- **버전 확인:** A7670E-FASE (GPS 포함) / A7670E-LASE (GPS 미포함)

---

## 2. 하드웨어 사양

### 2.1 전원
| 항목 | 사양 |
|------|------|
| 모듈 동작 전압 | 3.4V ~ 4.2V |
| 개발보드 입력 | 5V ~ 16V DC |
| UART 레벨 | 3.3V TTL |

### 2.2 인터페이스
- **UART:** 3개 (풀기능 1개, 일반 1개, 디버그 1개)
- **USB:** USB 2.0 (Micro USB)
- **SIM 슬롯:** 듀얼 SIM 지원 (SIM1, SIM2)
- **안테나:** IPEX 커넥터 (LTE, GPS, BLE용)

### 2.3 동작 환경
- **온도:** -40°C ~ 85°C
- **습도:** 산업용 등급

---

## 3. 소프트웨어 기능

### 3.1 지원 프로토콜
- TCP/IP/IPv4/IPv6
- HTTP/HTTPS
- FTP/FTPS
- MQTT (IoT 필수)
- SSL/TLS 보안 통신
- PPP/RNDIS/ECM

### 3.2 부가 기능
- **FOTA:** 원격 펌웨어 업데이트
- **LBS:** GPS 없이 기지국 기반 위치 측위
- **AT 명령어:** 표준 AT 명령어 지원

---

## 4. IoT 프로젝트 적용 계획

### 4.1 적용 시나리오

#### 시나리오 A: 원격 센서 모니터링
```
[센서] → [MCU (ESP32/STM32)] → [A7670E] → [LTE] → [클라우드 서버]
                                    ↓
                               [GPS 위치]
```
- 온도, 습도, 진동 등 센서 데이터 실시간 전송
- GPS로 설치 위치 자동 등록
- MQTT 프로토콜로 저전력 통신

#### 시나리오 B: 자산 추적기
```
[A7670E + GPS] → [LTE] → [서버] → [웹/앱 대시보드]
```
- 차량, 장비, 컨테이너 위치 실시간 추적
- 지오펜싱 알림
- 배터리 최적화 (주기적 위치 보고)

#### 시나리오 C: 스마트 계량기
```
[계량기] → [MCU] → [A7670E] → [유틸리티 서버]
```
- 전기/가스/수도 사용량 원격 검침
- 이상 감지 시 즉시 알림
- 2G 폴백으로 통신 안정성 확보

### 4.2 개발 환경 구성

#### 필요 하드웨어
| 항목 | 수량 | 비고 |
|------|------|------|
| A7670E 개발보드 | 1 | AliExpress 구매 |
| LTE 안테나 | 1 | 포함 여부 확인 |
| GPS 안테나 | 1 | 외장형 권장 |
| USB-UART 컨버터 | 1 | 디버깅용 |
| SIM 카드 | 1 | LTE 데이터 요금제 |
| MCU 보드 | 1 | ESP32 또는 STM32 |

#### 필요 소프트웨어
- **시리얼 모니터:** PuTTY, Tera Term
- **개발 IDE:** Arduino IDE, PlatformIO, STM32CubeIDE
- **AT 명령어 테스트:** QCOM, 시리얼 터미널

### 4.3 개발 단계

```
Phase 1: 모듈 테스트 (1단계)
├── AT 명령어 통신 확인
├── SIM 카드 인식 및 네트워크 등록
├── GPS 수신 테스트
└── 인터넷 연결 (HTTP GET/POST)

Phase 2: 프로토타입 (2단계)
├── MCU와 UART 연동
├── 센서 데이터 수집 + 전송
├── 서버 통신 구현 (MQTT/HTTP)
└── GPS 위치 로깅

Phase 3: 최적화 (3단계)
├── 저전력 모드 구현
├── 에러 핸들링
├── OTA 업데이트 구현
└── 필드 테스트

Phase 4: 양산 준비 (4단계)
├── PCB 설계 (모듈 직접 실장)
├── 인증 검토 (KC, CE 등)
└── 양산 테스트
```

---

## 5. 핵심 AT 명령어

### 5.1 기본 명령어
```
AT                    # 통신 확인
AT+CPIN?              # SIM 상태 확인
AT+CSQ                # 신호 강도 확인
AT+CREG?              # 네트워크 등록 상태
AT+CGATT?             # GPRS 연결 상태
```

### 5.2 데이터 통신
```
AT+CGDCONT=1,"IP","인터넷APN"    # APN 설정
AT+CGACT=1,1                      # PDP 컨텍스트 활성화
AT+HTTPINIT                       # HTTP 초기화
AT+HTTPPARA="URL","http://..."    # URL 설정
AT+HTTPACTION=0                   # GET 요청
```

### 5.3 GPS
```
AT+CGNSPWR=1          # GPS 전원 ON
AT+CGNSSEQ="RMC"      # NMEA 문장 설정
AT+CGNSINF            # GPS 정보 조회
```

---

## 6. 주의사항

### 6.1 구매 시 확인
- [ ] **버전 확인:** A7670E-FASE (GPS 포함) vs A7670E-LASE (GPS 미포함)
- [ ] **지역 확인:** A7670E (유럽), A7670SA (남미/호주), A7670G (글로벌)
- [ ] **안테나 포함 여부:** LTE + GPS 안테나 별도 구매 필요할 수 있음
- [ ] **개발보드 vs 모듈:** 초기 테스트는 개발보드 권장

### 6.2 한국 사용 시
- LTE 주파수 호환성 확인 필요 (SKT/KT/LGU+ 대역)
- A7670E는 유럽 대역 위주 → **A7670G (글로벌) 권장**
- 국내 통신사 APN 설정 필요

### 6.3 전원 설계
- 피크 전류 최대 2A 발생 가능
- 안정적인 전원 공급 필수 (LDO + 대용량 커패시터)

---

## 7. 참고 자료

- [SIMCOM A7670 하드웨어 설계 가이드 (PDF)](https://nostris.ee/pdf/A7670%20Series%20Hardware%20Design_V1.00.pdf)
- [OTRONIC A7670 제품 페이지](https://www.otronic.nl/en/a7670-dual-sim-4g-lte-cat-1-and-gps-module.html)
- [LILYGO T-A7670E 개발보드](https://lilygo.cc/products/t-sim-a7670e)
- [Elecrow A7670E 모듈](https://www.elecrow.com/crowtail-sim-a7670e-4g-module-gps-breakout-board-support-gps-glonass-bds.html)

---

## 8. 예상 비용

| 항목 | 예상 가격 | 비고 |
|------|----------|------|
| A7670E 개발보드 | ~$50-70 | AliExpress 기준 |
| LTE 안테나 | ~$5-10 | |
| GPS 안테나 | ~$5-10 | |
| SIM 카드 (데이터) | 월 ~10,000원 | IoT 요금제 |
| MCU (ESP32) | ~$5-15 | |
| **초기 총 비용** | **약 10만원 내외** | |

---

**작성:** Claude Code
**다음 단계:** 모듈 구매 후 Phase 1 테스트 진행
