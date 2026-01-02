// 고급 과정 Part 3 (Day 76-90): PCB, 제품화, 최종 프로젝트
// esp32-arduino-lesson-day-page.tsx에서 import해서 사용

export const advancedDataPart3: Record<number, any> = {
  // ============================================
  // Day 76: PCB 설계 기초
  // ============================================
  76: {
    day: 76,
    title: 'PCB 설계 기초',
    subtitle: 'KiCad로 ESP32 PCB를 설계하는 기초를 배웁니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'PCB 설계 이해',
        description: 'PCB 설계의 기본 개념을 학습합니다.',
        prompt: `PCB 설계 기초에 대해 설명해줘.

설명해야 할 내용:
1. PCB란 (Printed Circuit Board)
2. PCB 설계 과정 (회로도 → 레이아웃 → 제조)
3. KiCad 소개 (오픈소스 EDA)
4. 부품 라이브러리 (심볼, 풋프린트)
5. 레이어 개념 (Top, Bottom, Silkscreen)
6. DRC (Design Rule Check)

📚 문법 설명:
- 심볼: 회로도에서의 부품 표현
- 풋프린트: PCB에서의 실제 패드 배치
- 거버 파일: PCB 제조용 파일

PCB 설계 흐름을 설명해줘.`,
        expectedKeywords: ['PCB', 'KiCad', '회로도', '풋프린트'],
        quiz: {
          question: 'PCB 제조에 필요한 파일 형식은?',
          options: ['PDF', '거버 파일', 'PNG', 'DXF'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'ESP32 회로도 그리기',
        description: 'KiCad로 ESP32 기본 회로도를 그립니다.',
        prompt: `KiCad로 ESP32 기본 회로도를 그리는 방법을 설명해줘.

요구사항:
1. ESP32 모듈 심볼 배치
2. 전원 회로 (3.3V 레귤레이터)
3. USB-C 커넥터 (프로그래밍)
4. 리셋/부트 버튼
5. LED 연결
6. 센서 커넥터 핀헤더

📚 문법 설명:
- 심볼 추가: 라이브러리에서 검색
- 와이어 연결: 'W' 키
- 라벨: 같은 이름은 연결된 것
- 전원 심볼: VCC, GND

회로도 설계 팁을 알려줘.`,
        expectedKeywords: ['심볼', '와이어', '라벨', '전원'],
        quiz: {
          question: 'KiCad에서 와이어를 그리는 단축키는?',
          options: ['L', 'W', 'R', 'C'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'PCB 레이아웃',
        description: '회로도를 PCB로 변환합니다.',
        prompt: `KiCad에서 PCB 레이아웃을 하는 방법을 설명해줘.

요구사항:
1. 넷리스트 가져오기
2. 부품 배치 (그룹화)
3. 배선 (Auto route 또는 수동)
4. 그라운드 플레인
5. DRC 검사
6. 거버 파일 생성

📚 문법 설명:
- 배치: 관련 부품 가까이
- 배선: 짧게, 직각 피하기
- 비아: 레이어 간 연결
- 그라운드 플레인: 노이즈 감소

PCB 설계 모범 사례를 알려줘.`,
        expectedKeywords: ['배치', '배선', '비아', 'DRC'],
        quiz: {
          question: 'PCB 레이어 간 연결에 사용하는 것은?',
          options: ['와이어', '비아', '점퍼', '브릿지'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 77, title: '3D 프린팅 케이스' },
  },

  // ============================================
  // Day 77: 3D 프린팅 케이스
  // ============================================
  77: {
    day: 77,
    title: '3D 프린팅 케이스',
    subtitle: 'ESP32 프로젝트용 케이스를 설계하고 출력합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '3D 모델링 기초',
        description: 'Fusion 360 또는 TinkerCAD로 케이스를 설계합니다.',
        prompt: `IoT 장치용 3D 케이스 설계에 대해 설명해줘.

설명해야 할 내용:
1. 3D 모델링 소프트웨어 (TinkerCAD, Fusion 360)
2. 치수 측정의 중요성
3. 공차와 끼워맞춤
4. 벽 두께와 강도
5. 통풍구와 방열
6. 버튼/LED/커넥터 구멍

📚 문법 설명:
- 공차: 여유 공간 (보통 0.3~0.5mm)
- 스냅핏: 나사 없이 결합
- STL 파일: 3D 프린터용 형식

케이스 설계 고려사항을 알려줘.`,
        expectedKeywords: ['공차', 'STL', '통풍구', '스냅핏'],
        quiz: {
          question: '부품 끼워맞춤을 위한 여유 공간은?',
          options: ['0mm', '0.3~0.5mm', '2mm', '5mm'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'ESP32 케이스 설계',
        description: 'ESP32 + 센서 + 디스플레이용 케이스를 설계합니다.',
        prompt: `ESP32 환경 모니터 케이스를 설계하는 방법을 설명해줘.

요구사항:
1. ESP32 모듈 고정
2. OLED 디스플레이 창
3. USB 충전 포트 구멍
4. 센서 통풍 구멍
5. 버튼 접근 구멍
6. 상하 분리 결합 (나사 또는 스냅핏)

📚 문법 설명:
- 내부 기둥: PCB 고정용
- 디스플레이 베젤: 창 테두리
- 케이블 홀: 전원선 입구

설계 시 주의사항을 알려줘.`,
        expectedKeywords: ['기둥', '베젤', '스냅핏', '나사'],
        quiz: {
          question: 'PCB를 고정하는 케이스 내부 구조는?',
          options: ['벽', '기둥', '바닥', '뚜껑'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '3D 프린팅',
        description: '슬라이서 설정과 출력을 진행합니다.',
        prompt: `3D 프린팅으로 케이스를 출력하는 방법을 설명해줘.

요구사항:
1. 슬라이서 소프트웨어 (Cura, PrusaSlicer)
2. 레이어 높이와 품질
3. 인필 밀도
4. 서포트 설정
5. 베드 접착
6. 출력 후 후처리

📚 문법 설명:
- 슬라이서: STL → G-code 변환
- 레이어 높이: 0.2mm 표준
- 인필: 내부 채움 (15~20% 일반)
- 서포트: 돌출부 지지

프린팅 팁을 알려줘.`,
        expectedKeywords: ['슬라이서', 'G-code', '인필', '서포트'],
        quiz: {
          question: '일반적인 레이어 높이는?',
          options: ['0.1mm', '0.2mm', '0.5mm', '1mm'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 78, title: '배터리 전원 관리' },
  },

  // ============================================
  // Day 78: 배터리 전원 관리
  // ============================================
  78: {
    day: 78,
    title: '배터리 전원 관리',
    subtitle: '리튬 배터리로 ESP32를 안전하게 구동합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '배터리 기초',
        description: '리튬 배터리의 특성과 안전 사용법을 학습합니다.',
        prompt: `리튬 배터리에 대해 설명해줘.

설명해야 할 내용:
1. 리튬이온 vs 리튬폴리머
2. 배터리 전압 (3.7V 공칭, 4.2V 만충, 3.0V 완방)
3. 용량과 방전율 (mAh, C-rate)
4. 충전 프로세스 (CC-CV)
5. 보호회로 (BMS)
6. 안전 주의사항

📚 문법 설명:
- 공칭 전압: 평균 동작 전압
- C-rate: 충방전 속도 (1C = 1시간 완충/완방)
- BMS: 과충전/과방전/과전류 보호

배터리 취급 주의사항을 알려줘.`,
        expectedKeywords: ['리튬', '3.7V', 'BMS', '과충전'],
        quiz: {
          question: '리튬 배터리의 공칭 전압은?',
          options: ['1.5V', '3.7V', '5V', '9V'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '충전 회로',
        description: 'TP4056으로 배터리 충전 회로를 구성합니다.',
        prompt: `TP4056 충전 모듈로 배터리 충전 회로를 구성하는 방법을 설명해줘.

요구사항:
1. TP4056 모듈 연결
2. USB 전원 입력
3. 배터리 연결
4. 충전 상태 LED
5. 과방전 보호 (DW01A)
6. 전원 스위치

📚 문법 설명:
- TP4056: 리튬 배터리 충전 IC (1A)
- CHRG: 충전 중 LED
- STDBY: 충전 완료 LED
- DW01A + 8205A: 보호 회로

회로 연결도를 설명해줘.`,
        expectedKeywords: ['TP4056', 'CHRG', 'STDBY', 'DW01A'],
        quiz: {
          question: 'TP4056의 최대 충전 전류는?',
          options: ['0.5A', '1A', '2A', '3A'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '전압 변환과 모니터링',
        description: '3.3V 변환과 배터리 잔량 모니터링을 구현합니다.',
        prompt: `ESP32에서 배터리 전압을 모니터링하는 코드를 작성해줘.

요구사항:
1. 분압 회로로 배터리 전압 측정
2. 전압 → 잔량(%) 변환
3. 저전압 경고 (3.3V 이하)
4. 딥슬립으로 전력 절약
5. OLED에 배터리 아이콘 표시
6. 충전 상태 감지 (GPIO)

📚 문법 설명 (코드 내 주석으로 포함):
- 분압: 4.2V → 1V 범위로 ADC 입력
- 전압 = ADC값 * (3.3/4095) * 분압비
- 잔량: 선형 또는 룩업 테이블
- 저전압 시 딥슬립 진입

핀: 배터리(34), 충전상태(35), I2C(21,22)`,
        expectedKeywords: ['분압', 'ADC', '잔량', '저전압'],
        quiz: {
          question: '4.2V를 ADC로 읽으려면 필요한 것은?',
          options: ['증폭기', '분압 회로', '정류기', '변압기'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 79, title: '태양광 충전' },
  },

  // ============================================
  // Day 79: 태양광 충전
  // ============================================
  79: {
    day: 79,
    title: '태양광 충전',
    subtitle: '태양광 패널로 ESP32를 구동하는 시스템을 만듭니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '태양광 패널 이해',
        description: '태양광 발전의 기본 원리를 학습합니다.',
        prompt: `태양광 충전 시스템에 대해 설명해줘.

설명해야 할 내용:
1. 태양광 패널 작동 원리
2. 패널 사양 (Voc, Isc, Vmp, Imp)
3. 패널 크기와 출력 선택
4. MPPT vs PWM 충전
5. 날씨와 각도에 따른 출력 변화
6. ESP32 + 태양광 고려사항

📚 문법 설명:
- Voc: 개방 전압 (부하 없을 때)
- Isc: 단락 전류 (최대 전류)
- MPPT: 최대 전력점 추적

태양광 패널 선택 기준을 알려줘.`,
        expectedKeywords: ['태양광', 'Voc', 'MPPT', 'PWM'],
        quiz: {
          question: '태양광 충전에서 효율이 더 좋은 방식은?',
          options: ['PWM', 'MPPT', '직접 연결', 'DC-DC'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '충전 회로 구성',
        description: '태양광 패널 + 배터리 + ESP32 시스템을 구성합니다.',
        prompt: `태양광 충전 시스템 회로를 구성하는 방법을 설명해줘.

요구사항:
1. 5V/1W 태양광 패널 사용
2. TP4056으로 배터리 충전
3. 3.7V → 3.3V 레귤레이터
4. 태양광/USB 자동 전환
5. 역전류 방지 다이오드
6. 충전 상태 모니터링

📚 문법 설명:
- 다이오드: 배터리 → 패널 역류 방지
- 병렬 전원: USB + 태양광
- 우선순위: USB > 태양광

회로 구성도를 설명해줘.`,
        expectedKeywords: ['다이오드', '역전류', '레귤레이터', '병렬'],
        quiz: {
          question: '배터리에서 패널로 역류를 막는 부품은?',
          options: ['저항', '다이오드', '커패시터', '인덕터'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '자급자족 센서 노드',
        description: '태양광으로 영구 동작하는 센서 노드를 만듭니다.',
        prompt: `태양광 자급자족 센서 노드를 만드는 코드를 작성해줘.

요구사항:
1. 태양광 + 배터리 전원
2. 딥슬립으로 최소 전력 소비
3. 30분마다 센서 읽기 + 전송
4. 배터리 잔량에 따른 슬립 시간 조절
5. 충분한 전력 시에만 WiFi 사용
6. 태양광 발전량 모니터링

📚 문법 설명 (코드 내 주석으로 포함):
- 적응형 슬립: 배터리 낮으면 더 긴 슬립
- 태양광 전압으로 충전 상태 판단
- ESP-NOW: WiFi보다 저전력

핀: 배터리(34), 태양광(35), I2C(21,22)`,
        expectedKeywords: ['자급자족', '적응형', '딥슬립', 'ESP-NOW'],
        quiz: {
          question: '배터리가 부족할 때 취해야 할 조치는?',
          options: ['더 자주 전송', '슬립 시간 증가', '밝기 증가', 'WiFi 항상 켜기'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 80, title: '산업용 통신 - Modbus' },
  },

  // ============================================
  // Day 80: 산업용 통신 - Modbus
  // ============================================
  80: {
    day: 80,
    title: '산업용 통신 - Modbus',
    subtitle: 'Modbus 프로토콜로 산업 장비와 통신합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'Modbus 프로토콜 이해',
        description: 'Modbus 통신의 기본 개념을 학습합니다.',
        prompt: `Modbus 프로토콜에 대해 설명해줘.

설명해야 할 내용:
1. Modbus란 (산업용 통신 표준)
2. Modbus RTU vs Modbus TCP
3. 마스터/슬레이브 구조
4. 레지스터 타입 (Coil, Input, Holding, Discrete)
5. 함수 코드 (01, 02, 03, 04, 05, 06)
6. 주소 체계

📚 문법 설명:
- RTU: RS-485 시리얼 통신
- TCP: 이더넷 통신
- Holding Register: 읽기/쓰기 가능

Modbus 프레임 구조를 설명해줘.`,
        expectedKeywords: ['Modbus', 'RTU', 'TCP', 'Register'],
        quiz: {
          question: 'Modbus에서 읽기/쓰기 가능한 레지스터는?',
          options: ['Coil', 'Input Register', 'Holding Register', 'Discrete Input'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: 'Modbus RTU 마스터',
        description: 'ESP32에서 Modbus RTU 마스터를 구현합니다.',
        prompt: `ESP32에서 Modbus RTU 마스터를 구현하는 코드를 작성해줘.

요구사항:
1. RS-485 모듈 연결 (MAX485)
2. 슬레이브 레지스터 읽기 (03)
3. 슬레이브 레지스터 쓰기 (06)
4. CRC16 검사
5. 타임아웃 처리
6. 여러 슬레이브 스캔

📚 문법 설명 (코드 내 주석으로 포함):
- ModbusMaster 라이브러리
- 프레임: 주소 + 함수 + 데이터 + CRC
- DE/RE 핀: 송수신 방향 제어
- Serial2: UART2 사용

핀: TX(17), RX(16), DE/RE(4)`,
        expectedKeywords: ['ModbusMaster', 'CRC16', 'DE/RE', 'Serial2'],
        quiz: {
          question: 'RS-485에서 송수신 방향을 제어하는 핀은?',
          options: ['TX/RX', 'DE/RE', 'VCC/GND', 'A/B'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'Modbus TCP 서버',
        description: 'ESP32를 Modbus TCP 서버로 동작시킵니다.',
        prompt: `ESP32를 Modbus TCP 서버로 구현하는 코드를 작성해줘.

요구사항:
1. WiFi 연결
2. 포트 502에서 Modbus TCP 서버
3. Holding Register에 센서 값 저장
4. 외부 HMI/SCADA에서 읽기
5. Coil로 릴레이 제어
6. 다중 클라이언트 지원

📚 문법 설명 (코드 내 주석으로 포함):
- ModbusTCPServer 또는 WiFiServer + 직접 구현
- MBAP 헤더: Transaction ID, Protocol, Length, Unit
- Register 배열로 데이터 관리

핀: I2C(21,22), 릴레이(25)`,
        expectedKeywords: ['ModbusTCPServer', 'MBAP', 'Register', '502'],
        quiz: {
          question: 'Modbus TCP의 기본 포트는?',
          options: ['80', '443', '502', '1883'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 81, title: 'LoRa 통신' },
  },

  // ============================================
  // Day 81: LoRa 통신
  // ============================================
  81: {
    day: 81,
    title: 'LoRa 통신',
    subtitle: 'LoRa로 장거리 무선 통신을 구현합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'LoRa 이해',
        description: 'LoRa 기술의 특징과 활용을 학습합니다.',
        prompt: `LoRa 통신에 대해 설명해줘.

설명해야 할 내용:
1. LoRa란 (Long Range)
2. LoRa vs LoRaWAN
3. 통신 거리와 속도 트레이드오프
4. 확산 계수(SF)와 대역폭(BW)
5. 주파수 대역 (KR: 920-923MHz)
6. 활용 사례 (농업, 스마트시티)

📚 문법 설명:
- SF (Spreading Factor): 높을수록 거리↑ 속도↓
- BW (Bandwidth): 높을수록 속도↑ 거리↓
- LoRaWAN: LoRa + 네트워크 프로토콜

LoRa 파라미터와 성능 관계를 설명해줘.`,
        expectedKeywords: ['LoRa', 'SF', 'BW', 'LoRaWAN'],
        quiz: {
          question: 'LoRa에서 SF 값이 높아지면?',
          options: ['속도↑ 거리↓', '속도↓ 거리↑', '둘 다 증가', '둘 다 감소'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'LoRa 송수신',
        description: 'SX1276/SX1278로 LoRa 통신을 구현합니다.',
        prompt: `ESP32에서 LoRa 송수신을 구현하는 코드를 작성해줘.

요구사항:
1. SX1278 LoRa 모듈 연결 (SPI)
2. 주파수, SF, BW 설정
3. 패킷 송신
4. 패킷 수신 (인터럽트 또는 폴링)
5. RSSI 확인
6. 센서 데이터 전송

📚 문법 설명 (코드 내 주석으로 포함):
- #include <LoRa.h>: LoRa 라이브러리
- LoRa.begin(frequency): 초기화
- LoRa.setSpreadingFactor(sf): SF 설정
- LoRa.beginPacket(); LoRa.print(); LoRa.endPacket()
- LoRa.onReceive(callback): 수신 콜백

핀: SCK(5), MISO(19), MOSI(27), SS(18), RST(14), DIO0(26)`,
        expectedKeywords: ['LoRa.begin', 'setSpreadingFactor', 'beginPacket', 'onReceive'],
        quiz: {
          question: 'LoRa 패킷 전송을 시작하는 함수는?',
          options: ['LoRa.send()', 'LoRa.beginPacket()', 'LoRa.write()', 'LoRa.transmit()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'LoRa 센서 네트워크',
        description: '여러 노드로 LoRa 센서 네트워크를 구축합니다.',
        prompt: `LoRa 센서 네트워크를 구축하는 코드를 작성해줘.

요구사항:
1. 게이트웨이 (1개): 데이터 수집 + WiFi 전송
2. 센서 노드 (여러 개): LoRa 전송 + 딥슬립
3. 노드 ID로 구분
4. 간단한 프로토콜 (ID + 데이터 + CRC)
5. ACK 응답 (선택)
6. 게이트웨이 OLED에 모든 노드 표시

📚 문법 설명 (코드 내 주석으로 포함):
- 간단한 패킷 구조: [NodeID][Type][Data][CRC]
- 시분할: 노드별 전송 시간 분리
- 재전송: ACK 없으면 재시도

핀: (LoRa 모듈 핀), I2C(21,22)`,
        expectedKeywords: ['게이트웨이', '센서 노드', 'ACK', '시분할'],
        quiz: {
          question: 'LoRa 네트워크에서 충돌을 줄이는 방법은?',
          options: ['더 센 출력', '시분할', '같은 SF', '더 낮은 주파수'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 82, title: '머신러닝 - TinyML' },
  },

  // ============================================
  // Day 82: 머신러닝 - TinyML
  // ============================================
  82: {
    day: 82,
    title: '머신러닝 - TinyML',
    subtitle: 'ESP32에서 머신러닝 모델을 실행합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'TinyML 소개',
        description: '엣지 AI와 TinyML의 개념을 학습합니다.',
        prompt: `TinyML에 대해 설명해줘.

설명해야 할 내용:
1. TinyML이란 (초소형 기기의 ML)
2. 클라우드 AI vs 엣지 AI
3. TensorFlow Lite for Microcontrollers
4. 모델 양자화 (Quantization)
5. ESP32에서 가능한 ML 작업
6. 제약사항 (메모리, 연산)

📚 문법 설명:
- 양자화: Float32 → Int8 (모델 경량화)
- 추론 (Inference): 학습된 모델 실행
- 텐서: 다차원 배열 (입출력 데이터)

TinyML 활용 사례를 알려줘.`,
        expectedKeywords: ['TinyML', '양자화', '추론', 'TensorFlow Lite'],
        quiz: {
          question: '모델을 경량화하는 기법은?',
          options: ['증폭', '양자화', '압축', '암호화'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '모델 배포',
        description: 'TFLite 모델을 ESP32에 배포합니다.',
        prompt: `TensorFlow Lite 모델을 ESP32에 배포하는 방법을 설명해줘.

요구사항:
1. 학습된 모델을 TFLite로 변환
2. 양자화 (Int8)
3. C 배열로 변환 (xxd)
4. ESP32에 모델 포함
5. 인터프리터 초기화
6. 추론 실행

📚 문법 설명 (코드 내 주석으로 포함):
- #include "tensorflow/lite/micro/all_ops_resolver.h"
- tflite::MicroInterpreter 사용
- 입력 텐서에 데이터 복사
- interpreter.Invoke(): 추론 실행
- 출력 텐서에서 결과 읽기

핀: (센서에 따라)`,
        expectedKeywords: ['TFLite', 'MicroInterpreter', 'Invoke', '텐서'],
        quiz: {
          question: 'TFLite 추론을 실행하는 함수는?',
          options: ['interpreter.Run()', 'interpreter.Invoke()', 'interpreter.Execute()', 'interpreter.Predict()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '제스처 인식',
        description: '가속도 센서로 제스처를 인식합니다.',
        prompt: `가속도 센서 데이터로 제스처를 인식하는 코드를 작성해줘.

요구사항:
1. MPU6050 가속도 데이터 수집
2. 윈도우 샘플링 (예: 200 샘플)
3. TFLite 모델로 제스처 분류
4. 인식 결과: 흔들기, 기울이기, 두드리기
5. 제스처에 따른 액션 (LED, 비프음)
6. 신뢰도 표시

📚 문법 설명 (코드 내 주석으로 포함):
- 슬라이딩 윈도우: 연속 데이터를 윈도우로 자르기
- 정규화: 입력 데이터를 모델 범위에 맞춤
- Softmax 출력: 각 클래스 확률

핀: I2C(21,22), LED(25,26,27), 부저(14)`,
        expectedKeywords: ['제스처', '윈도우', '정규화', 'Softmax'],
        quiz: {
          question: '시계열 데이터를 모델에 입력하는 방법은?',
          options: ['한 샘플씩', '윈도우로 묶어서', '평균값만', '최대값만'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 83, title: '음성 웨이크워드' },
  },

  // ============================================
  // Day 83: 음성 웨이크워드
  // ============================================
  83: {
    day: 83,
    title: '음성 웨이크워드',
    subtitle: '음성 명령 키워드를 인식합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '웨이크워드 이해',
        description: '음성 웨이크워드 인식의 원리를 학습합니다.',
        prompt: `음성 웨이크워드 인식에 대해 설명해줘.

설명해야 할 내용:
1. 웨이크워드란 (예: "Alexa", "Hey Google")
2. 항상 듣기 vs 웨이크워드 감지
3. MFCC 특징 추출
4. 키워드 스포팅 모델
5. ESP-SR 라이브러리
6. 오인식과 미인식 트레이드오프

📚 문법 설명:
- MFCC: 음성 특징 벡터
- 모델: 특정 키워드 패턴 매칭
- 임계값: 인식 민감도 조절

웨이크워드 처리 파이프라인을 설명해줘.`,
        expectedKeywords: ['웨이크워드', 'MFCC', '키워드 스포팅', 'ESP-SR'],
        quiz: {
          question: '음성을 숫자로 변환하는 특징은?',
          options: ['FFT', 'MFCC', 'PCM', 'WAV'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'ESP-SR 웨이크워드',
        description: 'ESP-SR 라이브러리로 웨이크워드를 인식합니다.',
        prompt: `ESP-SR로 웨이크워드를 인식하는 코드를 작성해줘.

요구사항:
1. I2S 마이크 설정
2. ESP-SR 초기화
3. "Hi Lexin" 또는 커스텀 웨이크워드
4. 인식 시 LED + 비프음
5. 인식 후 명령 대기 모드
6. 간단한 명령 인식 (On, Off)

📚 문법 설명 (코드 내 주석으로 포함):
- esp_sr 라이브러리 사용
- 웨이크워드 모델 로드
- 오디오 스트림 처리
- 인식 결과 콜백

핀: I2S_WS(25), I2S_SCK(26), I2S_SD(27), LED(33), 부저(14)`,
        expectedKeywords: ['esp_sr', '웨이크워드', '콜백', '명령'],
        quiz: {
          question: 'ESP-SR의 기본 웨이크워드는?',
          options: ['Alexa', 'Hey Google', 'Hi Lexin', 'OK ESP'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: '음성 제어 시스템',
        description: '음성으로 IoT 장치를 제어합니다.',
        prompt: `음성으로 IoT 장치를 제어하는 시스템을 만들어줘.

요구사항:
1. 웨이크워드 감지 ("Hi Lexin")
2. 명령 인식 ("불 켜줘", "불 꺼줘")
3. LED/릴레이 제어
4. 음성 피드백 (I2S 스피커)
5. 인식 실패 시 재시도 안내
6. OLED에 현재 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- 상태 머신: IDLE → LISTENING → EXECUTING
- 명령 목록과 액션 매핑
- TTS 또는 미리 녹음된 응답 재생

핀: (마이크 + 스피커), LED(33), 릴레이(25), I2C(21,22)`,
        expectedKeywords: ['상태 머신', '명령 매핑', 'TTS', '피드백'],
        quiz: {
          question: '음성 제어에서 상태 전환 순서는?',
          options: ['실행→대기→인식', '대기→웨이크워드→명령→실행', '인식→대기→실행', '실행→인식→대기'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 84, title: '이미지 분류' },
  },

  // ============================================
  // Day 84: 이미지 분류
  // ============================================
  84: {
    day: 84,
    title: '이미지 분류',
    subtitle: 'ESP32-CAM으로 객체를 분류합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '이미지 분류 이해',
        description: 'CNN 기반 이미지 분류를 이해합니다.',
        prompt: `ESP32에서의 이미지 분류에 대해 설명해줘.

설명해야 할 내용:
1. CNN(Convolutional Neural Network) 기초
2. 이미지 분류 모델 (MobileNet, SqueezeNet)
3. ESP32 제약과 모델 선택
4. 입력 이미지 전처리 (리사이즈, 정규화)
5. 추론 시간과 정확도
6. 클래스 수와 메모리

📚 문법 설명:
- 입력: 96x96x3 또는 더 작은 이미지
- 출력: 클래스별 확률
- MobileNet: 경량 CNN

ESP32에서 가능한 이미지 분류 규모를 설명해줘.`,
        expectedKeywords: ['CNN', 'MobileNet', '전처리', '추론'],
        quiz: {
          question: '경량 이미지 분류 모델은?',
          options: ['VGG16', 'ResNet', 'MobileNet', 'AlexNet'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '간단한 분류기 구현',
        description: 'ESP32-CAM에서 간단한 이미지 분류를 수행합니다.',
        prompt: `ESP32-CAM에서 간단한 이미지 분류를 구현해줘.

요구사항:
1. 카메라 이미지 캡처
2. 96x96으로 리사이즈
3. TFLite 모델 로드 (예: 사람/사물 구분)
4. 추론 실행
5. 결과에 따른 액션
6. 웹에서 분류 결과 확인

📚 문법 설명 (코드 내 주석으로 포함):
- 이미지 리사이즈: 간단한 다운샘플링
- RGB → 정규화 (-1 ~ 1 또는 0 ~ 1)
- 입력 텐서에 이미지 복사
- argmax로 최고 확률 클래스

핀: (ESP32-CAM), LED(4)`,
        expectedKeywords: ['리사이즈', '정규화', 'argmax', '클래스'],
        quiz: {
          question: '분류 결과에서 가장 높은 확률의 클래스를 찾는 함수는?',
          options: ['max()', 'argmax()', 'top()', 'best()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '스마트 분류 시스템',
        description: '실용적인 이미지 분류 시스템을 만듭니다.',
        prompt: `실용적인 이미지 분류 시스템을 만들어줘.

요구사항:
1. 버튼으로 분류 트리거
2. 분류 카테고리: 예) 과일 종류, 재활용 분류
3. 결과를 TFT/OLED에 표시
4. 신뢰도 낮으면 "불확실" 표시
5. 분류 기록 저장 (SPIFFS)
6. 웹 대시보드에서 통계 확인

📚 문법 설명 (코드 내 주석으로 포함):
- 신뢰도 임계값: 0.7 이상만 확정
- 클래스 레이블 배열
- 로그: 시간 + 클래스 + 신뢰도

핀: (ESP32-CAM), 버튼(12), TFT/OLED`,
        expectedKeywords: ['신뢰도', '임계값', '레이블', '통계'],
        quiz: {
          question: '분류 신뢰도가 낮을 때 어떻게 처리?',
          options: ['무조건 분류', '불확실로 표시', '재촬영 요청', '에러 발생'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 85, title: '제품화 - 생산 설정' },
  },

  // ============================================
  // Day 85: 제품화 - 생산 설정
  // ============================================
  85: {
    day: 85,
    title: '제품화 - 생산 설정',
    subtitle: 'ESP32 제품 양산을 위한 설정을 배웁니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '제품화 고려사항',
        description: '프로토타입에서 제품으로 전환 시 고려사항을 학습합니다.',
        prompt: `ESP32 제품화 고려사항에 대해 설명해줘.

설명해야 할 내용:
1. 프로토타입 vs 양산
2. 안정성과 신뢰성
3. 펌웨어 보안 (암호화, 서명)
4. MAC 주소와 인증서 관리
5. 공장 초기화 기능
6. 품질 관리와 테스트

📚 문법 설명:
- 플래시 암호화: 펌웨어 보호
- Secure Boot: 서명된 펌웨어만 실행
- 제조 데이터: 시리얼, MAC, 인증서

제품화 체크리스트를 알려줘.`,
        expectedKeywords: ['양산', '암호화', 'Secure Boot', '품질'],
        quiz: {
          question: '펌웨어 역공학을 방지하는 방법은?',
          options: ['주석 제거', '플래시 암호화', '코드 압축', '변수명 변경'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '제조 데이터 관리',
        description: 'NVS에 제조 데이터를 저장하고 관리합니다.',
        prompt: `ESP32 제조 데이터 관리 방법을 설명해줘.

요구사항:
1. 시리얼 번호 저장 (NVS)
2. MAC 주소 커스텀 (옵션)
3. 인증서/키 저장
4. 제조일/버전 정보
5. 생산 라인에서 자동 설정
6. 초기 설정 모드

📚 문법 설명 (코드 내 주석으로 포함):
- nvs_flash 파티션: 제조 데이터용
- esptool.py를 통한 대량 프로비저닝
- QR코드로 시리얼 확인

핀: (없음)`,
        expectedKeywords: ['NVS', '시리얼 번호', '프로비저닝', 'esptool'],
        quiz: {
          question: '제조 데이터를 저장하는 ESP32 파티션은?',
          options: ['app', 'ota', 'nvs', 'spiffs'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: '공장 초기화',
        description: '제품을 공장 상태로 초기화하는 기능을 구현합니다.',
        prompt: `공장 초기화 기능을 구현하는 코드를 작성해줘.

요구사항:
1. 버튼 10초 누르면 초기화 모드
2. WiFi 설정 삭제
3. 사용자 데이터 삭제
4. 제조 데이터는 유지
5. 초기화 진행 LED 표시
6. 재부팅 후 초기 설정 모드

📚 문법 설명 (코드 내 주석으로 포함):
- nvs_flash_erase(): NVS 전체 삭제
- 또는 네임스페이스별 선택적 삭제
- 제조 데이터: 별도 파티션 또는 플래그

핀: 버튼(32), LED(25,26,27)`,
        expectedKeywords: ['공장 초기화', 'nvs_flash_erase', '제조 데이터', '선택적 삭제'],
        quiz: {
          question: '공장 초기화에서 보존해야 할 것은?',
          options: ['WiFi 설정', '사용자 데이터', '제조 데이터', '로그'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 86, title: '테스트 자동화' },
  },

  // ============================================
  // Day 86: 테스트 자동화
  // ============================================
  86: {
    day: 86,
    title: '테스트 자동화',
    subtitle: '펌웨어 테스트를 자동화합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '테스트 전략',
        description: '임베디드 시스템 테스트 전략을 학습합니다.',
        prompt: `임베디드 펌웨어 테스트 전략에 대해 설명해줘.

설명해야 할 내용:
1. 단위 테스트 (Unit Test)
2. 통합 테스트 (Integration Test)
3. 하드웨어 인 더 루프 테스트 (HIL)
4. Unity 테스트 프레임워크
5. 테스트 더블 (Mock, Stub)
6. CI/CD 파이프라인

📚 문법 설명:
- 단위 테스트: 개별 함수 검증
- Mock: 하드웨어 대체 모의 객체
- CI: 지속적 통합 (자동 빌드/테스트)

테스트 피라미드를 설명해줘.`,
        expectedKeywords: ['단위 테스트', 'Mock', 'CI', 'Unity'],
        quiz: {
          question: '개별 함수를 검증하는 테스트는?',
          options: ['통합 테스트', '시스템 테스트', '단위 테스트', '인수 테스트'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: 'Unity 테스트',
        description: 'Unity 프레임워크로 단위 테스트를 작성합니다.',
        prompt: `Unity 프레임워크로 단위 테스트를 작성하는 방법을 설명해줘.

요구사항:
1. Unity 테스트 프레임워크 설정
2. 센서 읽기 함수 테스트
3. 데이터 변환 함수 테스트
4. 테스트 케이스 그룹화
5. 시리얼로 결과 출력
6. 통과/실패 카운트

📚 문법 설명 (코드 내 주석으로 포함):
- #include "unity.h"
- TEST_ASSERT_EQUAL(expected, actual)
- TEST_ASSERT_TRUE(condition)
- RUN_TEST(test_function)
- UNITY_BEGIN(); UNITY_END();

핀: (없음, 테스트 환경)`,
        expectedKeywords: ['Unity', 'TEST_ASSERT', 'RUN_TEST', 'UNITY_BEGIN'],
        quiz: {
          question: 'Unity에서 값이 같은지 확인하는 매크로는?',
          options: ['ASSERT_EQ', 'TEST_ASSERT_EQUAL', 'CHECK_EQUAL', 'EXPECT_EQ'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'Mock 활용',
        description: 'Mock으로 하드웨어 의존성을 제거합니다.',
        prompt: `Mock을 활용한 테스트 방법을 설명해줘.

요구사항:
1. 센서 읽기 함수 Mock
2. Mock이 고정값 반환
3. 비즈니스 로직 테스트
4. 네트워크 함수 Mock
5. 다양한 시나리오 테스트
6. 경계값 테스트

📚 문법 설명 (코드 내 주석으로 포함):
- 인터페이스: 실제/Mock 함수 포인터
- Mock 함수: 원하는 값 반환
- 의존성 주입: 테스트 시 Mock 주입

핀: (없음)`,
        expectedKeywords: ['Mock', '의존성 주입', '인터페이스', '시나리오'],
        quiz: {
          question: 'Mock의 목적은?',
          options: ['속도 향상', '하드웨어 의존성 제거', '코드 압축', '메모리 절약'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 87, title: '문서화' },
  },

  // ============================================
  // Day 87: 문서화
  // ============================================
  87: {
    day: 87,
    title: '문서화',
    subtitle: '프로젝트 문서를 체계적으로 작성합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '기술 문서 작성',
        description: '좋은 기술 문서의 구성을 학습합니다.',
        prompt: `IoT 프로젝트 기술 문서 작성에 대해 설명해줘.

설명해야 할 내용:
1. 문서 종류 (사용자 매뉴얼, API 문서, 하드웨어 문서)
2. README 구조
3. 설치/설정 가이드
4. API 참조 문서
5. 회로도와 핀아웃
6. 트러블슈팅 가이드

📚 문법 설명:
- Markdown: 간단한 문서 형식
- Doxygen: 코드 주석 → 문서 생성
- Mermaid: 다이어그램 생성

좋은 README 템플릿을 보여줘.`,
        expectedKeywords: ['README', 'API 문서', 'Markdown', 'Doxygen'],
        quiz: {
          question: '코드 주석에서 문서를 자동 생성하는 도구는?',
          options: ['Git', 'Doxygen', 'npm', 'CMake'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '코드 주석',
        description: 'Doxygen 스타일로 코드를 문서화합니다.',
        prompt: `Doxygen 스타일 코드 주석 작성법을 설명해줘.

요구사항:
1. 파일 헤더 주석
2. 함수 설명 (@brief, @param, @return)
3. 변수/상수 설명
4. 예제 코드 (@example)
5. 그룹화 (@defgroup)
6. 경고/주의 (@warning, @note)

📚 문법 설명:
/**
 * @brief 함수 간단 설명
 * @param name 파라미터 설명
 * @return 반환값 설명
 */

Doxygen 태그들을 정리해줘.`,
        expectedKeywords: ['@brief', '@param', '@return', '@example'],
        quiz: {
          question: '함수의 반환값을 설명하는 Doxygen 태그는?',
          options: ['@output', '@return', '@result', '@gives'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '사용자 가이드',
        description: '최종 사용자를 위한 가이드를 작성합니다.',
        prompt: `IoT 제품 사용자 가이드를 작성하는 방법을 설명해줘.

요구사항:
1. 제품 개요
2. 박스 내용물
3. 하드웨어 설치
4. 초기 설정 (WiFi 연결)
5. 앱 사용법
6. FAQ와 문제 해결
7. 사양 및 인증

📚 문법 설명:
- 그림과 스크린샷 활용
- 단계별 번호 매기기
- 경고/주의 사항 강조
- 다국어 지원 고려

사용자 가이드 템플릿을 만들어줘.`,
        expectedKeywords: ['사용자 가이드', 'FAQ', '스크린샷', '단계별'],
        quiz: {
          question: '사용자 가이드에서 가장 중요한 것은?',
          options: ['기술 용어', '명확한 단계별 설명', '코드 예제', '이론 설명'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 88, title: '최종 프로젝트 기획' },
  },

  // ============================================
  // Day 88: 최종 프로젝트 기획
  // ============================================
  88: {
    day: 88,
    title: '최종 프로젝트 기획',
    subtitle: '90일 과정의 집대성 프로젝트를 기획합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '프로젝트 아이디어',
        description: '최종 프로젝트 아이디어를 선정합니다.',
        prompt: `ESP32 최종 프로젝트 아이디어를 제안해줘.

프로젝트 요구사항:
1. 90일간 배운 기술 종합 활용
2. 실용적인 IoT 제품
3. 하드웨어 + 소프트웨어 + 클라우드
4. 모바일 앱 또는 웹 대시보드
5. 제품화 가능한 수준
6. 문서화 포함

📚 추천 프로젝트:
- 스마트 홈 컨트롤러
- 환경 모니터링 스테이션
- AI 보안 카메라
- 스마트 농업 시스템

프로젝트 선정 기준을 설명해줘.`,
        expectedKeywords: ['종합', '실용적', '제품화', '문서화'],
        quiz: {
          question: '최종 프로젝트에서 가장 중요한 것은?',
          options: ['복잡한 기능', '실용성과 완성도', '코드 길이', '새로운 기술'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '시스템 설계',
        description: '프로젝트의 전체 아키텍처를 설계합니다.',
        prompt: `최종 프로젝트의 시스템 아키텍처를 설계해줘.

선택한 프로젝트: 스마트 환경 모니터링 스테이션

요구사항:
1. 센서 노드 (여러 개): 온습도, 조도, 미세먼지
2. 게이트웨이: 데이터 수집 + 클라우드 연동
3. 클라우드: Firebase/AWS 데이터 저장
4. 웹 대시보드: 실시간 그래프
5. 모바일 알림: 임계값 초과 시
6. TFT 디스플레이: 로컬 표시

시스템 블록 다이어그램을 그려줘.`,
        expectedKeywords: ['아키텍처', '노드', '게이트웨이', '클라우드'],
        quiz: {
          question: '시스템 설계에서 먼저 해야 할 것은?',
          options: ['코딩', '요구사항 정의', '하드웨어 구매', '테스트'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '개발 계획',
        description: '단계별 개발 계획을 수립합니다.',
        prompt: `최종 프로젝트 개발 계획을 수립해줘.

요구사항:
1. 개발 단계 분류 (하드웨어, 펌웨어, 클라우드, UI)
2. 각 단계의 세부 작업
3. 의존성 파악 (무엇이 먼저?)
4. Day 89~90 일정 배분
5. 테스트 계획
6. 문서화 계획

📚 개발 단계:
- Phase 1: 하드웨어 조립 + 기본 펌웨어
- Phase 2: 통신 구현 (ESP-NOW, WiFi)
- Phase 3: 클라우드 연동
- Phase 4: UI 개발 + 테스트
- Phase 5: 문서화 + 마무리

작업 체크리스트를 만들어줘.`,
        expectedKeywords: ['단계', '의존성', '테스트', '체크리스트'],
        quiz: {
          question: '프로젝트 계획에서 의존성을 파악하는 이유는?',
          options: ['비용 계산', '작업 순서 결정', '인원 배치', '도구 선택'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 89, title: '최종 프로젝트 구현' },
  },

  // ============================================
  // Day 89: 최종 프로젝트 구현
  // ============================================
  89: {
    day: 89,
    title: '최종 프로젝트 구현',
    subtitle: '설계한 프로젝트를 구현합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '하드웨어 조립',
        description: '프로젝트 하드웨어를 조립합니다.',
        prompt: `최종 프로젝트 하드웨어 조립을 진행해줘.

조립 순서:
1. 부품 확인 및 테스트
2. 센서 연결 (I2C, SPI, GPIO)
3. 전원 회로 (배터리/어댑터)
4. 디스플레이 연결
5. 케이스 조립
6. 배선 정리

📚 체크리스트:
- [ ] ESP32 정상 부팅
- [ ] 모든 센서 인식
- [ ] 디스플레이 출력
- [ ] 전원 안정
- [ ] 물리적 고정

조립 팁과 주의사항을 알려줘.`,
        expectedKeywords: ['조립', '테스트', '배선', '체크리스트'],
        quiz: {
          question: '하드웨어 조립 전 먼저 해야 할 것은?',
          options: ['케이스 조립', '개별 부품 테스트', '코딩', '문서 작성'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '펌웨어 구현',
        description: '핵심 펌웨어 기능을 구현합니다.',
        prompt: `최종 프로젝트 펌웨어를 구현해줘.

구현할 기능:
1. 센서 데이터 수집 (멀티태스킹)
2. 로컬 디스플레이 업데이트
3. ESP-NOW로 게이트웨이 전송
4. WiFi/MQTT로 클라우드 전송
5. 명령 수신 및 처리
6. 에러 핸들링 및 워치독

📚 문법 설명 (코드 내 주석으로 포함):
- FreeRTOS 태스크 구조
- Queue로 태스크 간 통신
- 뮤텍스로 공유 자원 보호
- 워치독 타이머 설정

모듈화된 코드 구조를 만들어줘.`,
        expectedKeywords: ['모듈화', 'FreeRTOS', 'Queue', '워치독'],
        quiz: {
          question: '시스템 멈춤을 방지하는 기능은?',
          options: ['딥슬립', '워치독', '인터럽트', '폴링'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '클라우드/UI 연동',
        description: '클라우드와 UI를 연동합니다.',
        prompt: `클라우드 연동 및 웹 UI를 구현해줘.

구현할 기능:
1. Firebase/AWS 연결
2. 센서 데이터 저장
3. 실시간 동기화
4. 웹 대시보드 (Chart.js 그래프)
5. 알림 설정 (임계값)
6. 원격 제어

📚 웹 대시보드 구성:
- 현재 센서 값 카드
- 시간별 그래프
- 장치 상태
- 설정 페이지

기본 웹 페이지 코드를 만들어줘.`,
        expectedKeywords: ['Firebase', 'Chart.js', '대시보드', '알림'],
        quiz: {
          question: '웹 대시보드에서 실시간 데이터를 표시하려면?',
          options: ['새로고침', 'WebSocket/Firebase 실시간 DB', '이메일', 'SMS'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 90, title: '최종 프로젝트 완성' },
  },

  // ============================================
  // Day 90: 최종 프로젝트 완성
  // ============================================
  90: {
    day: 90,
    title: '최종 프로젝트 완성',
    subtitle: '프로젝트를 완성하고 문서화합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '테스트 및 디버깅',
        description: '전체 시스템을 테스트하고 버그를 수정합니다.',
        prompt: `최종 프로젝트 테스트 및 디버깅을 진행해줘.

테스트 체크리스트:
1. 센서 정확도 검증
2. 통신 안정성 (ESP-NOW, WiFi)
3. 클라우드 데이터 정합성
4. 웹 대시보드 기능
5. 장시간 동작 테스트 (24시간)
6. 에지 케이스 테스트

📚 디버깅 방법:
- 시리얼 로그 분석
- LED 상태 표시
- 원격 로깅 (MQTT)
- 메모리 누수 확인

발견된 버그 목록과 수정 방법을 정리해줘.`,
        expectedKeywords: ['테스트', '디버깅', '체크리스트', '버그'],
        quiz: {
          question: '시스템 안정성을 확인하는 테스트는?',
          options: ['단위 테스트', '장시간 동작 테스트', 'UI 테스트', '코드 리뷰'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '문서 완성',
        description: '프로젝트 문서를 완성합니다.',
        prompt: `최종 프로젝트 문서를 완성해줘.

필요한 문서:
1. README.md (프로젝트 개요)
2. 하드웨어 문서 (회로도, BOM)
3. 소프트웨어 문서 (API, 설정)
4. 사용자 가이드
5. 트러블슈팅 가이드
6. 라이선스

📚 문서 구조:
- 목적과 기능 설명
- 설치 및 설정 방법
- 사용 방법
- API 참조
- FAQ

각 문서의 핵심 내용을 정리해줘.`,
        expectedKeywords: ['README', '회로도', 'API', '가이드'],
        quiz: {
          question: '오픈소스 프로젝트에 반드시 필요한 파일은?',
          options: ['주석', 'README.md', '테스트 코드', '디자인 파일'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '발표 및 공유',
        description: '프로젝트를 발표하고 커뮤니티에 공유합니다.',
        prompt: `최종 프로젝트 발표 자료를 준비해줘.

발표 내용:
1. 프로젝트 소개 (목적, 기능)
2. 시스템 아키텍처
3. 핵심 기술 설명
4. 데모 시연
5. 개발 과정과 도전
6. 향후 개선 방향

📚 공유 방법:
- GitHub 저장소 공개
- YouTube 데모 영상
- 블로그 포스팅
- 커뮤니티 공유 (Reddit, 네이버 카페)

발표 슬라이드 구성을 제안해줘.

축하합니다! 90일 ESP32 Arduino 과정을 완료했습니다! 🎉`,
        expectedKeywords: ['발표', 'GitHub', '데모', '공유'],
        quiz: {
          question: '프로젝트 공유에서 가장 중요한 것은?',
          options: ['복잡한 코드', '명확한 문서와 데모', '많은 기능', '고급 기술'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: null,  // 마지막 강의
  },
};
