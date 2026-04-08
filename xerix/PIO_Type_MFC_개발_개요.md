# PIO Type MFC(Mass Flow Controller) 개발 개요

## 1. PIO의 의미

**PIO = Parallel I/O (병렬 입출력)**

MFC 업계에서 PIO Type은 통신 방식에 따른 분류 중 하나로, 호스트(PLC, 장비 컨트롤러)와 MFC 사이를 **디지털 병렬 신호선**으로 직접 연결하는 타입이다.

## 2. MFC 통신 타입 분류

| 타입 | 방식 | 특징 |
|---|---|---|
| **Analog** | 0~5V / 4~20mA | 가장 전통적, 아날로그 setpoint/feedback |
| **PIO (Parallel I/O)** | 디지털 병렬 신호 | 반도체 장비 표준, 빠른 응답, 노이즈 강함 |
| **DeviceNet** | CAN 기반 필드버스 | 배선 단순화 |
| **EtherCAT / Ethernet/IP** | 산업용 이더넷 | 고속, 다수 장비 통합 |
| **RS-485 / Modbus** | 시리얼 | 간단한 디지털 통신 |

## 3. PIO Type MFC의 특징

- **반도체 장비(Semiconductor Fab)에서 널리 사용** — AMAT, TEL, LAM 등 장비에서 표준적
- **Setpoint (유량 설정값)**: 12~16bit 병렬 디지털 입력 핀으로 수신
- **Flow 출력(Feedback)**: 병렬 디지털 출력으로 현재 유량 전송
- **제어 신호**: Valve Open/Close, Zero, Alarm, Ready 등 디스크리트 I/O 라인
- **커넥터**: D-Sub (주로 15/25/37pin)
- **장점**: 아날로그 대비 정밀도·재현성 우수, 필드버스 대비 지연 없음(실시간)
- **단점**: 배선 수 많음, 장거리 전송 불리

## 4. H/W 구축 항목

- **입출력 핀 정의**
  - Setpoint 16bit
  - Flow Output 16bit
  - Valve Control, Alarm, Strobe, Ready 등 디스크리트 라인
- **신호 레벨**: TTL/CMOS (3.3V or 5V), 광절연(포토커플러) 인터페이스
- **커넥터 핀맵**: D-Sub 핀 번호별 기능 정의
- **ADC/DAC**: 센서 신호 측정과 밸브 구동
- **MCU**: STM32 등으로 병렬 버스 샘플링 + PID 제어
- **전원**: ±15V (센서/밸브), +5V/3.3V (로직)

## 5. S/W 구축 항목

- **병렬 버스 읽기/쓰기**: GPIO 또는 FSMC/외부버스 인터페이스
- **Strobe/Latch 동기화 로직**: 호스트가 값을 변경할 때 안정적으로 캡처
- **PID 제어 루프**: Setpoint ↔ Flow sensor feedback
- **밸브 드라이브**: Solenoid/Piezo 밸브 PWM 또는 DAC
- **Zero/Calibration/Alarm 처리**
- **진단·로깅**

## 6. 참고 표준

- SEMI S2/S8 (장비 안전)
- SEMI E52 (PIO 인터페이스 관련)
- SEMI F점 시리즈 (가스 공급 시스템)
