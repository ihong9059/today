// 고급 과정 Part 1 (Day 46-60): BLE와 ESP-NOW
// esp32-arduino-lesson-day-page.tsx에서 import해서 사용

export const advancedDataPart1: Record<number, any> = {
  // ============================================
  // Day 46: BLE 기초
  // ============================================
  46: {
    day: 46,
    title: 'BLE 기초',
    subtitle: 'Bluetooth Low Energy의 기본 개념을 이해합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'BLE 개념 이해',
        description: 'BLE와 Classic Bluetooth의 차이를 학습합니다.',
        prompt: `BLE(Bluetooth Low Energy)에 대해 설명해줘.

설명해야 할 내용:
1. BLE란 무엇인지 (저전력 블루투스)
2. Classic Bluetooth vs BLE 비교
3. BLE의 장점 (저전력, 빠른 연결)
4. GAP(Generic Access Profile)과 GATT(Generic Attribute Profile)
5. Central과 Peripheral 역할
6. Service, Characteristic, Descriptor

📚 문법 설명:
- Peripheral: 데이터 제공자 (ESP32 센서)
- Central: 데이터 소비자 (스마트폰)
- Advertising: 연결 가능하다고 알림
- GATT: 데이터 교환 프로토콜

BLE 구조도(텍스트)를 그려줘.`,
        expectedKeywords: ['BLE', 'GATT', 'Peripheral', 'Central'],
        quiz: {
          question: 'BLE에서 데이터를 제공하는 역할은?',
          options: ['Central', 'Peripheral', 'Master', 'Client'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'BLE 서버 만들기',
        description: 'ESP32를 BLE Peripheral로 설정합니다.',
        prompt: `ESP32에서 BLE 서버를 만드는 코드를 작성해줘.

요구사항:
1. BLE 서버 생성 및 광고 시작
2. 커스텀 Service 생성 (UUID)
3. 센서 데이터 Characteristic (Read, Notify)
4. 연결 상태 콜백 (connect/disconnect)
5. OLED에 연결 상태 표시
6. LED로 연결 표시 (연결:파랑, 광고:점멸)

📚 문법 설명 (코드 내 주석으로 포함):
- #include <BLEDevice.h>: BLE 라이브러리
- BLEDevice::init("DeviceName"): BLE 초기화
- BLEServer *pServer = BLEDevice::createServer()
- BLEService *pService = pServer->createService(UUID)
- BLECharacteristic: Read/Write/Notify 속성
- pAdvertising->start(): 광고 시작

핀: LED(25,27), I2C(21,22)`,
        expectedKeywords: ['BLEDevice', 'createServer', 'createService', 'Characteristic'],
        quiz: {
          question: 'BLE 광고를 시작하는 함수는?',
          options: ['start()', 'advertise()', 'broadcast()', 'announce()'],
          correctAnswer: 0,
        },
      },
      {
        id: 3,
        title: '스마트폰 연결',
        description: 'nRF Connect 앱으로 ESP32 BLE에 연결합니다.',
        prompt: `ESP32 BLE 서버에서 스마트폰으로 센서 데이터를 전송하는 코드를 작성해줘.

요구사항:
1. 온습도 센서 데이터 Characteristic
2. 2초마다 값 업데이트 (Notify)
3. LED 제어 Characteristic (Write)
4. 배터리 레벨 Characteristic (표준 UUID)
5. 장치 정보 Service
6. 연결 간격 설정

📚 문법 설명 (코드 내 주석으로 포함):
- pCharacteristic->notify(): Notify 전송
- pCharacteristic->setValue(value): 값 설정
- BLECharacteristicCallbacks: Write 콜백
- 표준 UUID: 0x180F (Battery), 0x2A19 (Battery Level)

테스트 방법:
- nRF Connect 앱 설치 (iOS/Android)
- ESP32 스캔 및 연결
- Characteristic 읽기/쓰기/구독

핀: I2C(21,22), LED(25,26,27)`,
        expectedKeywords: ['notify', 'setValue', 'Callbacks', 'nRF Connect'],
        quiz: {
          question: 'Characteristic 값이 바뀌면 Central에 알리는 방법은?',
          options: ['send()', 'notify()', 'push()', 'update()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 47, title: 'BLE iBeacon' },
  },

  // ============================================
  // Day 47: BLE iBeacon
  // ============================================
  47: {
    day: 47,
    title: 'BLE iBeacon',
    subtitle: 'ESP32를 iBeacon으로 만들어 위치 기반 서비스를 구현합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'iBeacon 이해',
        description: 'iBeacon 프로토콜과 활용 방법을 학습합니다.',
        prompt: `iBeacon에 대해 설명해줘.

설명해야 할 내용:
1. iBeacon이란 (Apple의 BLE 비콘 표준)
2. iBeacon 데이터 구조 (UUID, Major, Minor)
3. RSSI와 거리 추정
4. 활용 사례 (실내 위치, 근접 마케팅, 출석)
5. Eddystone과의 비교

📚 문법 설명:
- UUID: 비콘 그룹 식별자 (128비트)
- Major: 세부 그룹 (예: 층)
- Minor: 개별 식별 (예: 방)
- RSSI: 수신 신호 강도 (거리 추정)

iBeacon 패킷 구조(텍스트)를 보여줘.`,
        expectedKeywords: ['iBeacon', 'UUID', 'Major', 'Minor', 'RSSI'],
        quiz: {
          question: 'iBeacon에서 개별 비콘을 구분하는 값은?',
          options: ['UUID', 'Major', 'Minor', 'RSSI'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: 'iBeacon 송신기 만들기',
        description: 'ESP32를 iBeacon 송신기로 설정합니다.',
        prompt: `ESP32를 iBeacon 송신기로 만드는 코드를 작성해줘.

요구사항:
1. iBeacon 광고 패킷 설정
2. UUID, Major, Minor 설정
3. 송신 전력 조절 (거리 조절)
4. OLED에 비콘 정보 표시
5. LED로 광고 상태 표시
6. 버튼으로 Major/Minor 변경

📚 문법 설명 (코드 내 주석으로 포함):
- BLEBeacon beacon: iBeacon 객체
- beacon.setProximityUUID(BLEUUID::fromString(...))
- beacon.setMajor(major), beacon.setMinor(minor)
- esp_ble_tx_power_set(): 송신 전력 설정
- pAdvertising->setAdvertisementData(oAdvertisementData)

핀: 버튼(32), LED(25), I2C(21,22)`,
        expectedKeywords: ['BLEBeacon', 'setProximityUUID', 'setMajor', 'tx_power'],
        quiz: {
          question: 'iBeacon의 신호 도달 거리를 조절하려면?',
          options: ['UUID 변경', 'Major 변경', '송신 전력 조절', 'Minor 변경'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: 'iBeacon 스캐너',
        description: '주변 iBeacon을 스캔하고 거리를 추정합니다.',
        prompt: `ESP32에서 iBeacon을 스캔하는 코드를 작성해줘.

요구사항:
1. BLE 스캔 시작
2. iBeacon 패킷 파싱
3. UUID, Major, Minor, RSSI 추출
4. RSSI로 거리 추정 (근접/가까움/멀리)
5. 발견된 비콘 목록 OLED에 표시
6. 가장 가까운 비콘 하이라이트

📚 문법 설명 (코드 내 주석으로 포함):
- BLEScan *pBLEScan = BLEDevice::getScan()
- pBLEScan->setActiveScan(true): 능동 스캔
- BLEAdvertisedDeviceCallbacks: 발견 콜백
- getPayload(): 광고 패킷 데이터
- 거리 추정: distance = pow(10, (txPower - RSSI) / 20)

핀: I2C(21,22), LED(25,26,27)`,
        expectedKeywords: ['BLEScan', 'setActiveScan', 'Callbacks', 'RSSI'],
        quiz: {
          question: 'BLE 스캔을 위해 호출하는 함수는?',
          options: ['BLEDevice::scan()', 'BLEDevice::getScan()', 'BLEDevice::search()', 'BLEDevice::find()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 48, title: 'BLE 양방향 통신' },
  },

  // ============================================
  // Day 48: BLE 양방향 통신
  // ============================================
  48: {
    day: 48,
    title: 'BLE 양방향 통신',
    subtitle: 'BLE로 스마트폰과 양방향 데이터 교환을 구현합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'Read/Write/Notify 이해',
        description: 'BLE Characteristic의 속성들을 학습합니다.',
        prompt: `BLE Characteristic의 속성에 대해 설명해줘.

설명해야 할 내용:
1. Read: Central이 값을 읽어감
2. Write: Central이 값을 씀
3. WriteWithoutResponse: 응답 없이 쓰기
4. Notify: Peripheral이 값 변경 알림
5. Indicate: Notify + 확인 응답
6. 속성 조합으로 다양한 통신 패턴

📚 문법 설명:
- BLECharacteristic::PROPERTY_READ
- BLECharacteristic::PROPERTY_WRITE
- BLECharacteristic::PROPERTY_NOTIFY
- 조합: PROPERTY_READ | PROPERTY_WRITE

각 속성의 사용 예시를 설명해줘.`,
        expectedKeywords: ['Read', 'Write', 'Notify', 'Indicate'],
        quiz: {
          question: 'Peripheral에서 Central로 데이터 변경을 알리는 속성은?',
          options: ['Read', 'Write', 'Notify', 'Subscribe'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '명령-응답 시스템',
        description: 'BLE로 명령을 받고 응답을 보내는 시스템을 만듭니다.',
        prompt: `ESP32에서 BLE 명령-응답 시스템을 만들어줘.

요구사항:
1. 명령 수신 Characteristic (Write)
2. 응답 전송 Characteristic (Notify)
3. JSON 형식 명령: {"cmd":"led","color":"red","state":"on"}
4. 명령 처리 후 결과 JSON 응답
5. 지원 명령: LED 제어, 센서 읽기, 상태 조회
6. OLED에 마지막 명령/응답 표시

📚 문법 설명 (코드 내 주석으로 포함):
- class MyCharacteristicCallbacks: public BLECharacteristicCallbacks
- void onWrite(BLECharacteristic *pCharacteristic)
- std::string value = pCharacteristic->getValue()
- ArduinoJson으로 명령 파싱
- 응답 Characteristic에 setValue 후 notify

핀: LED(25,26,27), I2C(21,22)`,
        expectedKeywords: ['onWrite', 'getValue', 'JSON', '명령-응답'],
        quiz: {
          question: 'BLE Write 이벤트를 받는 콜백 함수는?',
          options: ['onReceive()', 'onWrite()', 'onData()', 'onCommand()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'BLE 시리얼 통신',
        description: 'BLE를 시리얼처럼 사용하여 데이터를 주고받습니다.',
        prompt: `ESP32에서 BLE 시리얼 통신을 구현하는 코드를 작성해줘.

요구사항:
1. UART 서비스 UUID 사용 (Nordic UART)
2. TX Characteristic (Notify): ESP32 → 스마트폰
3. RX Characteristic (Write): 스마트폰 → ESP32
4. 문자열 단위 송수신
5. 시리얼 터미널처럼 동작
6. 수신 데이터 OLED에 표시

📚 문법 설명 (코드 내 주석으로 포함):
- Nordic UART Service UUID: 6E400001-B5A3-F393-E0A9-E50E24DCCA9E
- TX UUID: 6E400003... (Notify)
- RX UUID: 6E400002... (Write)
- 버퍼링: 줄 단위로 처리
- nRF Toolbox 앱의 UART 기능으로 테스트

핀: I2C(21,22)`,
        expectedKeywords: ['Nordic UART', 'TX', 'RX', '버퍼링'],
        quiz: {
          question: 'Nordic UART Service에서 ESP32가 데이터를 보내는 Characteristic은?',
          options: ['RX', 'TX', 'DATA', 'SEND'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 49, title: 'ESP-NOW 기초' },
  },

  // ============================================
  // Day 49: ESP-NOW 기초
  // ============================================
  49: {
    day: 49,
    title: 'ESP-NOW 기초',
    subtitle: 'ESP-NOW로 ESP32 간 초고속 무선 통신을 구현합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'ESP-NOW 이해',
        description: 'ESP-NOW 프로토콜의 특징을 학습합니다.',
        prompt: `ESP-NOW에 대해 설명해줘.

설명해야 할 내용:
1. ESP-NOW란 (Espressif의 독자 프로토콜)
2. WiFi와 ESP-NOW의 차이
3. ESP-NOW 장점 (저지연, 연결 불필요, 저전력)
4. 통신 범위와 속도
5. 최대 페어링 수 (20개)
6. 브로드캐스트 vs 유니캐스트

📚 문법 설명:
- 피어(Peer): 통신 상대 ESP32
- MAC 주소로 상대 식별
- 라우터 불필요 (ESP32끼리 직접 통신)
- 최대 250바이트 페이로드

ESP-NOW와 WiFi 비교표를 보여줘.`,
        expectedKeywords: ['ESP-NOW', 'Peer', 'MAC', '저지연'],
        quiz: {
          question: 'ESP-NOW의 최대 페이로드 크기는?',
          options: ['100바이트', '250바이트', '512바이트', '1024바이트'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'ESP-NOW 송신기',
        description: 'ESP-NOW로 데이터를 송신하는 코드를 작성합니다.',
        prompt: `ESP32에서 ESP-NOW로 데이터를 송신하는 코드를 작성해줘.

요구사항:
1. ESP-NOW 초기화
2. 수신기 MAC 주소로 피어 등록
3. 센서 데이터 구조체 정의
4. 2초마다 데이터 전송
5. 전송 성공/실패 콜백
6. OLED에 전송 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #include <esp_now.h>: ESP-NOW 라이브러리
- esp_now_init(): ESP-NOW 초기화
- esp_now_register_send_cb(): 송신 콜백 등록
- esp_now_peer_info_t: 피어 정보 구조체
- esp_now_add_peer(): 피어 추가
- esp_now_send(): 데이터 전송

핀: I2C(21,22), LED(25,27)`,
        expectedKeywords: ['esp_now_init', 'esp_now_send', 'add_peer', 'send_cb'],
        quiz: {
          question: 'ESP-NOW에서 데이터를 전송하는 함수는?',
          options: ['esp_now_transmit()', 'esp_now_send()', 'esp_now_write()', 'esp_now_broadcast()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'ESP-NOW 수신기',
        description: 'ESP-NOW로 데이터를 수신하는 코드를 작성합니다.',
        prompt: `ESP32에서 ESP-NOW로 데이터를 수신하는 코드를 작성해줘.

요구사항:
1. ESP-NOW 수신 모드 초기화
2. 수신 콜백 함수 등록
3. 송신기와 동일한 데이터 구조체
4. 수신 데이터 파싱 및 표시
5. 송신기 MAC 주소 표시
6. LED로 수신 표시 (깜빡임)

📚 문법 설명 (코드 내 주석으로 포함):
- esp_now_register_recv_cb(): 수신 콜백 등록
- void OnDataRecv(const uint8_t *mac, const uint8_t *data, int len)
- memcpy(): 수신 데이터를 구조체로 복사
- MAC 주소 출력: %02X:%02X:... 형식

핀: I2C(21,22), LED(27)`,
        expectedKeywords: ['recv_cb', 'OnDataRecv', 'memcpy', 'MAC'],
        quiz: {
          question: 'ESP-NOW 수신 콜백을 등록하는 함수는?',
          options: ['esp_now_recv()', 'esp_now_register_recv_cb()', 'esp_now_on_receive()', 'esp_now_listen()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 50, title: 'ESP-NOW 양방향 통신' },
  },

  // ============================================
  // Day 50: ESP-NOW 양방향 통신
  // ============================================
  50: {
    day: 50,
    title: 'ESP-NOW 양방향 통신',
    subtitle: '두 ESP32 간 양방향 데이터 교환을 구현합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '양방향 통신 구조',
        description: '요청-응답 패턴의 양방향 통신을 설계합니다.',
        prompt: `ESP-NOW 양방향 통신 구조를 설명해줘.

설명해야 할 내용:
1. 양방향 통신의 필요성 (센서 + 제어)
2. 송신/수신 콜백 모두 등록
3. 메시지 타입 구분 (요청/응답/알림)
4. 데이터 구조체 설계 (타입 + 페이로드)
5. 동기/비동기 통신 패턴

📚 문법 설명:
- 송수신 겸용: 두 ESP32 모두 send/recv 콜백 등록
- 메시지 타입: enum { REQUEST, RESPONSE, NOTIFY }
- 구조체: { uint8_t type; uint8_t data[246]; }

통신 시퀀스 다이어그램(텍스트)을 그려줘.`,
        expectedKeywords: ['양방향', '요청', '응답', '메시지 타입'],
        quiz: {
          question: '양방향 통신에서 두 ESP32 모두 등록해야 하는 것은?',
          options: ['송신 콜백만', '수신 콜백만', '둘 다', '피어만'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: '요청-응답 시스템',
        description: '한 ESP32가 요청하고 다른 ESP32가 응답합니다.',
        prompt: `ESP-NOW로 요청-응답 시스템을 만들어줘.

요구사항:
1. Master: 센서 데이터 요청, LED 제어 명령
2. Slave: 요청에 응답, 명령 실행
3. 메시지 구조체: { type, command, data }
4. Master 버튼으로 요청 전송
5. Slave 응답을 Master OLED에 표시
6. 타임아웃 처리 (3초)

📚 문법 설명 (코드 내 주석으로 포함):
- 공통 구조체 정의 (두 ESP32 동일)
- Master: 요청 전송 → 응답 대기
- Slave: 요청 수신 → 처리 → 응답 전송
- volatile 플래그로 응답 수신 확인

핀: 버튼(32), LED(25,26,27), I2C(21,22)`,
        expectedKeywords: ['Master', 'Slave', '타임아웃', '응답 대기'],
        quiz: {
          question: '요청 후 응답이 없으면?',
          options: ['무한 대기', '타임아웃 처리', '재부팅', '에러 무시'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '동기화 시스템',
        description: '두 ESP32의 상태를 동기화합니다.',
        prompt: `ESP-NOW로 두 ESP32 상태를 동기화하는 코드를 작성해줘.

요구사항:
1. LED 상태 동기화 (한쪽 변경 → 다른 쪽도 변경)
2. 센서 데이터 공유
3. 5초마다 하트비트 교환
4. 연결 상태 모니터링 (타임아웃 시 경고)
5. 양쪽 OLED에 상대방 상태 표시
6. 버튼으로 상태 변경

📚 문법 설명 (코드 내 주석으로 포함):
- 상태 구조체: { ledState[3], temp, humid, uptime }
- 상태 변경 시 즉시 전송
- 주기적 하트비트로 연결 확인
- millis()로 마지막 수신 시간 추적

핀: 버튼(32), LED(25,26,27), I2C(21,22)`,
        expectedKeywords: ['동기화', '하트비트', '상태 공유', '연결 확인'],
        quiz: {
          question: '두 장치 간 연결을 확인하는 방법은?',
          options: ['핑 명령', '하트비트', 'ACK 패킷', '케이블 연결'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 51, title: 'ESP-NOW 다중 통신' },
  },

  // ============================================
  // Day 51: ESP-NOW 다중 통신
  // ============================================
  51: {
    day: 51,
    title: 'ESP-NOW 다중 통신',
    subtitle: '여러 ESP32 간 통신 네트워크를 구축합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '다중 피어 관리',
        description: '여러 ESP32와 통신하는 구조를 설계합니다.',
        prompt: `ESP-NOW 다중 피어 통신에 대해 설명해줘.

설명해야 할 내용:
1. 최대 피어 수 (암호화 6개, 비암호화 20개)
2. 브로드캐스트 주소 (FF:FF:FF:FF:FF:FF)
3. 유니캐스트 vs 브로드캐스트
4. 피어 동적 추가/제거
5. 메시지에 발신자 ID 포함

📚 문법 설명:
- 브로드캐스트: 모든 근처 ESP32에 전송
- 유니캐스트: 특정 MAC 주소로 전송
- esp_now_del_peer(): 피어 제거
- esp_now_mod_peer(): 피어 정보 수정

네트워크 토폴로지(텍스트)를 그려줘.`,
        expectedKeywords: ['브로드캐스트', '유니캐스트', '피어', '20개'],
        quiz: {
          question: 'ESP-NOW 브로드캐스트 주소는?',
          options: ['00:00:00:00:00:00', 'FF:FF:FF:FF:FF:FF', '01:02:03:04:05:06', '모든 피어 MAC'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'Star 토폴로지 네트워크',
        description: '하나의 Master와 여러 Slave 구조를 구현합니다.',
        prompt: `ESP-NOW로 Star 토폴로지 네트워크를 구현해줘.

요구사항:
1. Master 1대 + Slave 여러 대
2. Slave는 센서 데이터를 Master에 전송
3. Master는 모든 Slave 데이터 수집
4. Master는 특정 Slave에 명령 전송
5. Slave 목록 자동 관리 (발견/타임아웃)
6. Master OLED에 모든 Slave 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- Slave 목록: 구조체 배열로 관리
- 각 Slave: { MAC, lastSeen, data }
- 발견: 첫 수신 시 목록에 추가
- 타임아웃: lastSeen 오래되면 제거

Master 코드:
- 핀: I2C(21,22), LED(25)

Slave 코드:
- 핀: 센서, LED(27)`,
        expectedKeywords: ['Star', 'Master', 'Slave', '목록 관리'],
        quiz: {
          question: 'Star 토폴로지에서 중앙 역할은?',
          options: ['Slave', 'Master', 'Router', 'Gateway'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '메시지 라우팅',
        description: 'Master를 통해 Slave 간 메시지를 중계합니다.',
        prompt: `ESP-NOW에서 Master를 통해 Slave 간 메시지를 중계하는 코드를 작성해줘.

요구사항:
1. Slave A → Master → Slave B 메시지 전달
2. 메시지 구조: { 발신자, 수신자, 타입, 데이터 }
3. Master가 수신자 MAC으로 포워딩
4. 브로드캐스트 메시지 (모든 Slave에 전달)
5. 메시지 TTL (무한 루프 방지)
6. 라우팅 로그 기록

📚 문법 설명 (코드 내 주석으로 포함):
- 메시지 헤더: { srcMAC[6], dstMAC[6], msgType, ttl }
- Master: 수신 → dstMAC 확인 → 포워딩
- TTL: 전달할 때마다 감소, 0이면 폐기

핀: (이전과 동일)`,
        expectedKeywords: ['라우팅', '포워딩', 'TTL', '메시지 헤더'],
        quiz: {
          question: '메시지 무한 루프를 방지하는 방법은?',
          options: ['MAC 필터', 'TTL', '암호화', '타임스탬프'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 52, title: 'ESP-NOW + WiFi 동시 사용' },
  },

  // ============================================
  // Day 52: ESP-NOW + WiFi 동시 사용
  // ============================================
  52: {
    day: 52,
    title: 'ESP-NOW + WiFi 동시 사용',
    subtitle: 'ESP-NOW와 WiFi를 함께 사용하여 게이트웨이를 만듭니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '동시 사용 제약 이해',
        description: 'ESP-NOW와 WiFi 동시 사용 시 제약사항을 학습합니다.',
        prompt: `ESP-NOW와 WiFi 동시 사용에 대해 설명해줘.

설명해야 할 내용:
1. 같은 채널 사용 필요성
2. WiFi 연결 시 ESP-NOW 채널 자동 변경
3. ESP-NOW 채널 고정 방법
4. AP 모드 + ESP-NOW 조합
5. STA 모드 + ESP-NOW 조합의 주의점

📚 문법 설명:
- WiFi 채널: 공유기가 결정
- ESP-NOW는 기본 채널 1
- esp_wifi_set_channel(): 채널 설정
- STA 모드에서는 공유기 채널에 맞춤

동작 원리를 다이어그램(텍스트)으로 설명해줘.`,
        expectedKeywords: ['채널', 'AP 모드', 'STA 모드', '동시 사용'],
        quiz: {
          question: 'ESP-NOW와 WiFi를 동시에 쓰려면?',
          options: ['불가능', '같은 채널 사용', '다른 채널 사용', 'BLE 사용'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'IoT 게이트웨이 만들기',
        description: 'ESP-NOW 센서 데이터를 WiFi로 클라우드에 전송합니다.',
        prompt: `ESP-NOW → WiFi 게이트웨이를 만들어줘.

요구사항:
1. 게이트웨이: WiFi + ESP-NOW 동시 동작
2. 센서 노드: ESP-NOW로 데이터 전송
3. 게이트웨이가 데이터 수집
4. HTTP POST로 클라우드 전송
5. 웹 대시보드에서 모든 센서 조회
6. 센서 노드는 딥슬립으로 저전력

📚 문법 설명 (코드 내 주석으로 포함):
게이트웨이:
- WiFi.mode(WIFI_AP_STA): AP + STA 모드
- WiFi 연결 후 채널 확인
- ESP-NOW 초기화
- 수신 데이터 HTTP 전송

센서 노드:
- ESP-NOW 전송 후 딥슬립

핀: 게이트웨이 - I2C(21,22), LED(25,27)`,
        expectedKeywords: ['게이트웨이', 'WIFI_AP_STA', 'HTTP POST', '딥슬립'],
        quiz: {
          question: 'ESP-NOW 센서 노드가 전력을 절약하려면?',
          options: ['WiFi 사용', '딥슬립', '더 빠른 전송', '큰 안테나'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '양방향 게이트웨이',
        description: '클라우드 명령을 ESP-NOW 센서 노드에 전달합니다.',
        prompt: `양방향 ESP-NOW 게이트웨이를 만들어줘.

요구사항:
1. 센서 데이터: ESP-NOW → 게이트웨이 → 클라우드
2. 제어 명령: 클라우드 → 게이트웨이 → ESP-NOW
3. MQTT로 클라우드 연결
4. MQTT 구독으로 명령 수신
5. 해당 센서 노드에 ESP-NOW로 전달
6. 센서 노드 응답을 MQTT로 발행

📚 문법 설명 (코드 내 주석으로 포함):
- MQTT 토픽: sensor/[MAC]/data, sensor/[MAC]/cmd
- 명령 수신 콜백에서 ESP-NOW 전송
- ESP-NOW 응답을 MQTT로 발행
- MAC 주소 문자열 ↔ 바이트 배열 변환

핀: (이전과 동일)`,
        expectedKeywords: ['양방향', 'MQTT', '명령 전달', '응답 발행'],
        quiz: {
          question: '클라우드에서 센서까지 명령이 전달되는 순서는?',
          options: ['MQTT→ESP-NOW', 'HTTP→ESP-NOW', 'WebSocket→BLE', 'WiFi→Bluetooth'],
          correctAnswer: 0,
        },
      },
    ],
    nextLesson: { day: 53, title: '멀티태스킹 - FreeRTOS' },
  },

  // ============================================
  // Day 53: 멀티태스킹 - FreeRTOS
  // ============================================
  53: {
    day: 53,
    title: '멀티태스킹 - FreeRTOS',
    subtitle: 'FreeRTOS로 여러 작업을 동시에 실행합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'FreeRTOS 개념 이해',
        description: 'RTOS와 태스크의 개념을 학습합니다.',
        prompt: `FreeRTOS에 대해 설명해줘.

설명해야 할 내용:
1. RTOS란 (실시간 운영체제)
2. ESP32의 듀얼 코어와 FreeRTOS
3. 태스크(Task)란 무엇인지
4. 태스크 우선순위와 스케줄링
5. 시분할 멀티태스킹 원리
6. loop()도 사실 태스크

📚 문법 설명:
- Task: 독립적으로 실행되는 함수
- Priority: 숫자가 클수록 우선순위 높음
- Stack: 각 태스크의 메모리 공간
- Core 0: WiFi/BLE 처리
- Core 1: 사용자 코드 (loop)

FreeRTOS 구조를 다이어그램(텍스트)으로 설명해줘.`,
        expectedKeywords: ['FreeRTOS', 'Task', 'Priority', '듀얼 코어'],
        quiz: {
          question: 'ESP32의 Arduino loop()는 어느 코어에서 실행?',
          options: ['Core 0', 'Core 1', '두 코어', '없음'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '태스크 생성하기',
        description: 'xTaskCreate로 새로운 태스크를 생성합니다.',
        prompt: `ESP32에서 FreeRTOS 태스크를 생성하는 코드를 작성해줘.

요구사항:
1. LED 깜빡이는 태스크
2. 센서 읽는 태스크
3. OLED 업데이트 태스크
4. 각 태스크에 다른 주기
5. 태스크 우선순위 설정
6. 코어 지정 (pinToCore)

📚 문법 설명 (코드 내 주석으로 포함):
- xTaskCreate(함수, 이름, 스택크기, 파라미터, 우선순위, 핸들)
- xTaskCreatePinnedToCore(..., 코어번호): 특정 코어에 고정
- vTaskDelay(pdMS_TO_TICKS(ms)): 태스크 대기
- 태스크 함수: void taskFunc(void *parameter) { for(;;) {...} }

핀: LED(25,26,27), I2C(21,22)`,
        expectedKeywords: ['xTaskCreate', 'vTaskDelay', 'Priority', 'PinnedToCore'],
        quiz: {
          question: '태스크를 특정 코어에 고정하는 함수는?',
          options: ['xTaskCreate()', 'xTaskCreatePinnedToCore()', 'xTaskPin()', 'xTaskAssign()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '태스크 통신 - Queue',
        description: '큐를 사용하여 태스크 간 데이터를 전달합니다.',
        prompt: `FreeRTOS Queue로 태스크 간 통신하는 코드를 작성해줘.

요구사항:
1. 센서 태스크: 데이터 읽어서 Queue에 저장
2. 처리 태스크: Queue에서 데이터 꺼내서 처리
3. 디스플레이 태스크: 처리된 데이터 표시
4. 버튼 인터럽트 → Queue로 이벤트 전달
5. Queue 풀(full) 처리
6. Queue 상태 모니터링

📚 문법 설명 (코드 내 주석으로 포함):
- QueueHandle_t queue = xQueueCreate(크기, 아이템크기)
- xQueueSend(queue, &data, 대기시간)
- xQueueReceive(queue, &data, 대기시간)
- uxQueueMessagesWaiting(queue): 대기 메시지 수
- xQueueSendFromISR(): 인터럽트에서 사용

핀: 버튼(32), I2C(21,22), LED(25)`,
        expectedKeywords: ['Queue', 'xQueueCreate', 'xQueueSend', 'xQueueReceive'],
        quiz: {
          question: '인터럽트에서 Queue에 데이터를 보내는 함수는?',
          options: ['xQueueSend()', 'xQueueSendFromISR()', 'xQueuePush()', 'xQueueInsert()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 54, title: 'FreeRTOS 동기화' },
  },

  // ============================================
  // Day 54: FreeRTOS 동기화
  // ============================================
  54: {
    day: 54,
    title: 'FreeRTOS 동기화',
    subtitle: '세마포어와 뮤텍스로 태스크를 동기화합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '동기화 문제 이해',
        description: '멀티태스킹에서 발생하는 동기화 문제를 학습합니다.',
        prompt: `FreeRTOS 동기화 문제에 대해 설명해줘.

설명해야 할 내용:
1. 경쟁 조건(Race Condition)이란
2. 공유 자원 접근 문제
3. 데드락(Deadlock) 위험
4. 세마포어(Semaphore)의 역할
5. 뮤텍스(Mutex)와 세마포어 차이
6. 바이너리 세마포어 vs 카운팅 세마포어

📚 문법 설명:
- 경쟁 조건: 두 태스크가 동시에 같은 자원 접근
- 뮤텍스: 상호 배제 (한 번에 하나만 접근)
- 세마포어: 자원 카운팅 또는 신호

경쟁 조건 예시를 코드로 보여줘.`,
        expectedKeywords: ['경쟁 조건', '세마포어', '뮤텍스', '데드락'],
        quiz: {
          question: '두 태스크가 동시에 같은 변수를 수정하면?',
          options: ['문제 없음', '경쟁 조건 발생', '자동 동기화', '에러 발생'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '뮤텍스 사용하기',
        description: '뮤텍스로 공유 자원을 보호합니다.',
        prompt: `FreeRTOS 뮤텍스로 공유 자원을 보호하는 코드를 작성해줘.

요구사항:
1. 공유 변수: 센서 데이터 구조체
2. 센서 태스크: 데이터 업데이트
3. 디스플레이 태스크: 데이터 읽기
4. 뮤텍스로 동시 접근 방지
5. 타임아웃 처리
6. OLED에 안전하게 표시

📚 문법 설명 (코드 내 주석으로 포함):
- SemaphoreHandle_t mutex = xSemaphoreCreateMutex()
- xSemaphoreTake(mutex, 대기시간): 뮤텍스 획득
- xSemaphoreGive(mutex): 뮤텍스 해제
- portMAX_DELAY: 무한 대기
- pdMS_TO_TICKS(100): 100ms 대기

핀: I2C(21,22)`,
        expectedKeywords: ['xSemaphoreCreateMutex', 'xSemaphoreTake', 'xSemaphoreGive'],
        quiz: {
          question: '뮤텍스를 획득하는 함수는?',
          options: ['xSemaphoreLock()', 'xSemaphoreTake()', 'xSemaphoreGet()', 'xSemaphoreAcquire()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '세마포어로 이벤트 동기화',
        description: '바이너리 세마포어로 태스크 간 이벤트를 알립니다.',
        prompt: `바이너리 세마포어로 이벤트 동기화하는 코드를 작성해줘.

요구사항:
1. 버튼 인터럽트 → 세마포어 Give
2. 처리 태스크: 세마포어 Take 후 작업 수행
3. 센서 데이터 준비 완료 → 세마포어 Give
4. 전송 태스크: 준비 완료 대기 후 전송
5. 여러 이벤트를 위한 다중 세마포어
6. 이벤트 대기 상태 LED로 표시

📚 문법 설명 (코드 내 주석으로 포함):
- xSemaphoreCreateBinary(): 바이너리 세마포어 생성
- xSemaphoreGiveFromISR(): 인터럽트에서 Give
- 이벤트 대기: xSemaphoreTake(sema, portMAX_DELAY)
- 세마포어는 "신호" 역할

핀: 버튼(32), LED(25,26,27), I2C(21,22)`,
        expectedKeywords: ['Binary', 'GiveFromISR', '이벤트', '대기'],
        quiz: {
          question: '인터럽트에서 세마포어를 Give하는 함수는?',
          options: ['xSemaphoreGive()', 'xSemaphoreGiveFromISR()', 'xSemaphoreSignal()', 'xSemaphoreSet()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 55, title: '저전력 모드' },
  },

  // ============================================
  // Day 55: 저전력 모드
  // ============================================
  55: {
    day: 55,
    title: '저전력 모드',
    subtitle: 'ESP32의 다양한 저전력 모드를 활용합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '저전력 모드 이해',
        description: 'ESP32의 전력 관리와 슬립 모드를 학습합니다.',
        prompt: `ESP32의 저전력 모드에 대해 설명해줘.

설명해야 할 내용:
1. Active Mode: 정상 동작 (~240mA)
2. Modem-sleep: WiFi/BLE 일시 정지 (~20mA)
3. Light-sleep: CPU 일시 정지 (~0.8mA)
4. Deep-sleep: 거의 모든 것 정지 (~10μA)
5. Hibernation: 최저 전력 (~5μA)
6. 각 모드에서 유지되는 것

📚 문법 설명:
- RTC 메모리: 딥슬립에서도 유지
- ULP 코프로세서: 딥슬립 중 동작 가능
- 웨이크업 소스: 타이머, GPIO, 터치

각 모드 비교표를 보여줘.`,
        expectedKeywords: ['Deep-sleep', 'Light-sleep', 'RTC', '웨이크업'],
        quiz: {
          question: 'Deep-sleep에서 ESP32 소비 전류는?',
          options: ['~240mA', '~20mA', '~0.8mA', '~10μA'],
          correctAnswer: 3,
        },
      },
      {
        id: 2,
        title: 'Deep-sleep 구현',
        description: '타이머와 GPIO로 딥슬립을 구현합니다.',
        prompt: `ESP32 Deep-sleep을 구현하는 코드를 작성해줘.

요구사항:
1. 센서 데이터 측정 및 전송
2. 10분간 딥슬립
3. RTC 메모리에 부팅 횟수 저장
4. GPIO 버튼으로 즉시 웨이크업
5. 웨이크업 원인 확인 및 표시
6. 슬립 전 WiFi/BLE 정리

📚 문법 설명 (코드 내 주석으로 포함):
- esp_sleep_enable_timer_wakeup(us): 타이머 웨이크업
- esp_sleep_enable_ext0_wakeup(pin, level): GPIO 웨이크업
- esp_deep_sleep_start(): 딥슬립 진입
- esp_sleep_get_wakeup_cause(): 웨이크업 원인
- RTC_DATA_ATTR int bootCount = 0: RTC 메모리 변수

핀: 버튼(GPIO 33 - RTC GPIO), I2C(21,22)`,
        expectedKeywords: ['esp_deep_sleep_start', 'timer_wakeup', 'ext0_wakeup', 'RTC_DATA_ATTR'],
        quiz: {
          question: 'RTC 메모리 변수를 선언하는 방법은?',
          options: ['volatile int', 'static int', 'RTC_DATA_ATTR int', 'EEPROM int'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: '저전력 센서 노드',
        description: '배터리로 장기간 동작하는 센서 노드를 만듭니다.',
        prompt: `ESP32 저전력 센서 노드를 만들어줘.

요구사항:
1. 딥슬립 → 웨이크업 → 측정 → 전송 → 딥슬립
2. 웨이크업 간격: 5분 (조정 가능)
3. ESP-NOW로 데이터 전송 (빠른 전송)
4. 배터리 전압 측정 및 전송
5. 저전압 경고 시 더 긴 슬립
6. 연속 실패 시 슬립 시간 증가

📚 문법 설명 (코드 내 주석으로 포함):
- 빠른 부팅: setup()에서 모든 작업 수행
- ESP-NOW: WiFi 연결 없이 빠른 전송
- 배터리 ADC: 분압 회로로 3.7V → 1V 범위
- 적응형 슬립: 상황에 따라 슬립 시간 조정

핀: 배터리(34), I2C(21,22)`,
        expectedKeywords: ['저전력', '배터리', 'ESP-NOW', '적응형'],
        quiz: {
          question: '센서 노드에서 ESP-NOW를 사용하는 이유는?',
          options: ['보안', 'WiFi보다 빠른 전송', '긴 거리', '많은 데이터'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 56, title: '터치 센서' },
  },

  // ============================================
  // Day 56: 터치 센서
  // ============================================
  56: {
    day: 56,
    title: '터치 센서',
    subtitle: 'ESP32 내장 터치 센서를 활용합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '터치 센서 이해',
        description: 'ESP32 정전식 터치 센서의 원리를 학습합니다.',
        prompt: `ESP32 터치 센서에 대해 설명해줘.

설명해야 할 내용:
1. 정전식 터치 센서 원리 (정전용량 변화)
2. ESP32 터치 핀 (T0~T9, GPIO 4,0,2,15,13,12,14,27,33,32)
3. touchRead() 반환값 (낮을수록 터치)
4. 임계값 설정 방법
5. 터치로 딥슬립 웨이크업
6. 터치 인터럽트

📚 문법 설명:
- 터치하면 정전용량 증가 → 값 감소
- 기준값 측정 후 임계값 설정
- 환경에 따라 기준값 변동

터치 센서 핀 맵을 보여줘.`,
        expectedKeywords: ['터치', '정전용량', 'touchRead', '임계값'],
        quiz: {
          question: 'ESP32 터치 센서를 터치하면 값은?',
          options: ['증가', '감소', '변화 없음', '0'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '터치 버튼 만들기',
        description: '터치로 LED를 제어하는 버튼을 만듭니다.',
        prompt: `ESP32 터치 센서로 터치 버튼을 만들어줘.

요구사항:
1. 3개 터치 패드로 3색 LED 제어
2. 터치 임계값 자동 캘리브레이션
3. 터치 시 LED 토글
4. 길게 터치 감지 (1초 이상)
5. OLED에 터치 상태와 값 표시
6. 터치 인터럽트 사용

📚 문법 설명 (코드 내 주석으로 포함):
- touchRead(pin): 터치 값 읽기
- touchAttachInterrupt(pin, callback, threshold): 인터럽트
- 캘리브레이션: 부팅 시 기준값 측정
- 임계값 = 기준값 * 0.7 (또는 적절한 비율)

핀: T0(4), T3(15), T4(13), LED(25,26,27), I2C(21,22)`,
        expectedKeywords: ['touchRead', 'touchAttachInterrupt', '캘리브레이션'],
        quiz: {
          question: '터치 인터럽트를 설정하는 함수는?',
          options: ['attachInterrupt()', 'touchAttachInterrupt()', 'onTouch()', 'setTouchISR()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '터치 슬라이더',
        description: '여러 터치 패드로 슬라이더 인터페이스를 만듭니다.',
        prompt: `ESP32 터치 센서로 슬라이더를 만들어줘.

요구사항:
1. 5개 터치 패드를 나란히 배치
2. 터치 위치에 따라 값 0~100
3. 슬라이더 값으로 LED 밝기 조절
4. 멀티터치 감지 (두 패드 동시)
5. OLED에 슬라이더 바 그래픽 표시
6. 스와이프 제스처 감지 (좌→우, 우→좌)

📚 문법 설명 (코드 내 주석으로 포함):
- 각 패드 터치 값 읽기
- 가중 평균으로 위치 계산
- 멀티터치: 여러 패드 값이 동시에 낮음
- 스와이프: 연속으로 다른 패드 터치

핀: T0(4), T2(2), T3(15), T4(13), T5(12), LED(25), I2C(21,22)`,
        expectedKeywords: ['슬라이더', '멀티터치', '스와이프', '가중 평균'],
        quiz: {
          question: '터치 슬라이더에서 위치를 계산하는 방법은?',
          options: ['최대값 패드', '가중 평균', '첫 터치 패드', '마지막 패드'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 57, title: '홀 센서' },
  },

  // ============================================
  // Day 57: 홀 센서
  // ============================================
  57: {
    day: 57,
    title: '홀 센서',
    subtitle: 'ESP32 내장 홀 센서와 외장 홀 센서를 활용합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '홀 센서 이해',
        description: '홀 효과와 홀 센서의 원리를 학습합니다.',
        prompt: `홀 센서에 대해 설명해줘.

설명해야 할 내용:
1. 홀 효과란 (자기장에 의한 전압 발생)
2. ESP32 내장 홀 센서
3. 외장 홀 센서 종류 (디지털/아날로그)
4. 활용 사례 (RPM 측정, 위치 감지, 도어 센서)
5. 자석 극성에 따른 값 변화

📚 문법 설명:
- hallRead(): ESP32 내장 홀 센서 읽기
- 자석이 가까우면 값 변화
- N극/S극에 따라 +/- 변화

홀 효과 다이어그램(텍스트)을 그려줘.`,
        expectedKeywords: ['홀 효과', 'hallRead', '자기장', 'RPM'],
        quiz: {
          question: 'ESP32 내장 홀 센서를 읽는 함수는?',
          options: ['magnetRead()', 'hallRead()', 'magRead()', 'sensorRead()'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '자석 감지기',
        description: '홀 센서로 자석 접근을 감지합니다.',
        prompt: `ESP32 홀 센서로 자석 감지기를 만들어줘.

요구사항:
1. 내장 홀 센서로 자석 접근 감지
2. 기준값 캘리브레이션
3. 자석 접근 시 LED + 비프음
4. N극/S극 구분 (값의 방향)
5. 접근 거리에 따른 세기 표시
6. OLED에 센서 값 그래프

📚 문법 설명 (코드 내 주석으로 포함):
- hallRead(): 내장 홀 센서 (ADC1 사용 주의)
- 이동 평균으로 노이즈 감소
- 임계값으로 접근 감지
- 값의 부호로 극성 판단

핀: LED(25), 부저(14), I2C(21,22)`,
        expectedKeywords: ['hallRead', '캘리브레이션', 'N극', 'S극'],
        quiz: {
          question: '홀 센서 값의 부호가 바뀌면?',
          options: ['에러', '자석 극성 변화', '거리 변화', '온도 변화'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'RPM 측정기',
        description: '홀 센서로 회전 속도를 측정합니다.',
        prompt: `외장 홀 센서로 RPM을 측정하는 코드를 작성해줘.

요구사항:
1. 디지털 홀 센서 사용
2. 회전체에 자석 부착
3. 자석 통과 시 펄스 카운트
4. 1초당 펄스 수 → RPM 변환
5. OLED에 RPM 게이지 표시
6. 최대/평균 RPM 기록

📚 문법 설명 (코드 내 주석으로 포함):
- 인터럽트로 펄스 카운트
- RPM = (펄스 수 / 자석 수) * 60
- volatile 카운터 변수
- 1초 간격으로 RPM 계산 후 리셋

핀: 홀센서(32), I2C(21,22), LED(25)`,
        expectedKeywords: ['RPM', '펄스', '인터럽트', 'volatile'],
        quiz: {
          question: '자석 1개로 1초에 10번 감지되면 RPM은?',
          options: ['10', '60', '600', '6000'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 58, title: '가속도 센서' },
  },

  // ============================================
  // Day 58: 가속도 센서
  // ============================================
  58: {
    day: 58,
    title: '가속도 센서',
    subtitle: 'MPU6050으로 가속도와 자이로 데이터를 읽습니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '가속도/자이로 이해',
        description: 'IMU 센서의 원리와 데이터를 학습합니다.',
        prompt: `MPU6050 IMU 센서에 대해 설명해줘.

설명해야 할 내용:
1. 가속도계란 (선형 가속도 측정)
2. 자이로스코프란 (각속도 측정)
3. 6축 IMU (3축 가속도 + 3축 자이로)
4. 중력 가속도와 기울기 측정
5. 드리프트 문제와 보정
6. MPU6050 사양 (I2C 주소 0x68)

📚 문법 설명:
- 가속도 단위: g (9.8m/s²)
- 자이로 단위: °/s (초당 각도)
- Roll, Pitch, Yaw: 3축 회전각

좌표계와 축을 그림(텍스트)으로 설명해줘.`,
        expectedKeywords: ['가속도', '자이로', 'IMU', 'MPU6050'],
        quiz: {
          question: 'MPU6050은 몇 축 IMU인가?',
          options: ['3축', '6축', '9축', '12축'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '센서 데이터 읽기',
        description: 'MPU6050에서 가속도/자이로 데이터를 읽습니다.',
        prompt: `ESP32에서 MPU6050 데이터를 읽는 코드를 작성해줘.

요구사항:
1. MPU6050 라이브러리 사용
2. 가속도 X, Y, Z 읽기
3. 자이로 X, Y, Z 읽기
4. 온도 데이터 읽기
5. 시리얼에 모든 값 출력
6. OLED에 주요 값 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #include <MPU6050.h> 또는 Adafruit_MPU6050
- mpu.begin(): 센서 초기화
- mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz)
- 원시값 → 실제 단위 변환 (스케일 팩터)
- 가속도: 16384 LSB/g (기본 ±2g)

핀: I2C(21,22)`,
        expectedKeywords: ['getMotion6', '가속도', '자이로', '스케일'],
        quiz: {
          question: 'MPU6050의 I2C 기본 주소는?',
          options: ['0x3C', '0x68', '0x76', '0x38'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '기울기 측정기',
        description: '가속도 데이터로 기울기를 계산합니다.',
        prompt: `MPU6050으로 기울기를 측정하는 코드를 작성해줘.

요구사항:
1. 가속도 데이터로 Roll, Pitch 계산
2. 상보 필터로 자이로 데이터 결합
3. 수평계 형태로 OLED에 시각화
4. 수평 상태 시 초록 LED
5. 기울어지면 빨강 LED + 경고음
6. 기울기 임계값 설정 (10도)

📚 문법 설명 (코드 내 주석으로 포함):
- Roll = atan2(ay, az) * 180 / PI
- Pitch = atan2(-ax, sqrt(ay*ay + az*az)) * 180 / PI
- 상보 필터: angle = 0.98*(angle+gyro*dt) + 0.02*accelAngle
- dt: 샘플링 간격

핀: I2C(21,22), LED(25,27), 부저(14)`,
        expectedKeywords: ['Roll', 'Pitch', 'atan2', '상보 필터'],
        quiz: {
          question: 'Roll 각도를 계산하는 수식은?',
          options: ['atan(ax/az)', 'atan2(ay, az)', 'ax + ay', 'sqrt(ax² + ay²)'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 59, title: '음성 인식 기초' },
  },

  // ============================================
  // Day 59: 음성 인식 기초
  // ============================================
  59: {
    day: 59,
    title: '음성 인식 기초',
    subtitle: '마이크로 음성 명령을 인식합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '음성 처리 개념',
        description: '음성 인식의 기본 원리를 학습합니다.',
        prompt: `임베디드 음성 인식에 대해 설명해줘.

설명해야 할 내용:
1. 음성 인식 vs 음성 감지
2. 키워드 스포팅(Wake Word)
3. MEMS 마이크와 I2S 인터페이스
4. ESP32의 I2S 기능
5. 클라우드 음성 인식 vs 엣지 음성 인식
6. 음성 데이터 형식 (PCM, 샘플링 레이트)

📚 문법 설명:
- I2S: 디지털 오디오 인터페이스
- PCM: 펄스 코드 변조 (디지털 오디오)
- 샘플링 레이트: 16kHz (음성), 44.1kHz (음악)
- INMP441: I2S MEMS 마이크

음성 처리 파이프라인을 설명해줘.`,
        expectedKeywords: ['음성 인식', 'I2S', 'MEMS', '샘플링'],
        quiz: {
          question: '음성 인식에서 흔히 사용하는 샘플링 레이트는?',
          options: ['8kHz', '16kHz', '44.1kHz', '96kHz'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '마이크 입력 받기',
        description: 'I2S 마이크로 오디오를 녹음합니다.',
        prompt: `ESP32에서 I2S 마이크로 오디오를 녹음하는 코드를 작성해줘.

요구사항:
1. INMP441 I2S 마이크 연결
2. I2S 드라이버 설정
3. 오디오 샘플 읽기 (16kHz, 16비트)
4. 음량 레벨 측정
5. OLED에 음량 바 표시
6. 임계값 이상 시 LED 점등

📚 문법 설명 (코드 내 주석으로 포함):
- #include <driver/i2s.h>: I2S 드라이버
- i2s_config_t: I2S 설정 구조체
- i2s_pin_config_t: I2S 핀 설정
- i2s_driver_install(): 드라이버 설치
- i2s_read(): 오디오 데이터 읽기
- RMS 계산: sqrt(sum(sample²) / N)

핀: I2S_WS(25), I2S_SCK(26), I2S_SD(27), I2C(21,22)`,
        expectedKeywords: ['i2s_config_t', 'i2s_read', 'RMS', 'INMP441'],
        quiz: {
          question: 'I2S 오디오를 읽는 함수는?',
          options: ['i2s_get()', 'i2s_read()', 'i2s_receive()', 'i2s_sample()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '박수 감지',
        description: '갑작스러운 큰 소리를 감지합니다.',
        prompt: `ESP32에서 박수 소리를 감지하는 코드를 작성해줘.

요구사항:
1. 연속 음량 모니터링
2. 갑작스러운 음량 상승 감지 (피크)
3. 짧은 시간 내 2번 피크 = 박수
4. 박수 감지 시 LED 토글
5. 감도 조절 가능
6. 연속 박수 카운트

📚 문법 설명 (코드 내 주석으로 포함):
- 피크 감지: 현재 음량 > 평균 * 임계값
- 박수 패턴: 피크 간 시간 100~500ms
- 더블 클릭처럼 박수 인식
- 디바운싱으로 오인식 방지

핀: (이전과 동일)`,
        expectedKeywords: ['피크', '박수', '디바운싱', '감도'],
        quiz: {
          question: '박수 2번을 인식하려면?',
          options: ['음량만 측정', '피크 2번과 시간 간격 확인', '주파수 분석', '웨이브폼 저장'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 60, title: '고급 1차 종합 프로젝트' },
  },

  // ============================================
  // Day 60: 고급 1차 종합 프로젝트
  // ============================================
  60: {
    day: 60,
    title: '고급 1차 종합 프로젝트',
    subtitle: 'BLE, ESP-NOW, FreeRTOS를 활용한 스마트 센서 네트워크를 구축합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '프로젝트 설계',
        description: '스마트 센서 네트워크를 설계합니다.',
        prompt: `ESP32 스마트 센서 네트워크 프로젝트를 설계해줘.

시스템 구성:
1. 센서 노드 (여러 개): ESP-NOW + 딥슬립
2. 게이트웨이 (1개): ESP-NOW + WiFi + BLE
3. 스마트폰: BLE로 게이트웨이 연결

기능:
- 센서 노드: 온습도 + 조도 + 움직임
- 게이트웨이: 데이터 수집 + 클라우드 전송 + 앱 연동
- 스마트폰 앱: 실시간 모니터링

각 노드의 하드웨어와 소프트웨어 구조를 설계해줘.`,
        expectedKeywords: ['센서 노드', '게이트웨이', 'ESP-NOW', 'BLE'],
        quiz: {
          question: '이 시스템에서 가장 전력 소모가 적어야 하는 것은?',
          options: ['게이트웨이', '센서 노드', '스마트폰', '클라우드'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '센서 노드 구현',
        description: '저전력 센서 노드 코드를 작성합니다.',
        prompt: `저전력 ESP32 센서 노드 코드를 작성해줘.

요구사항:
1. 딥슬립 → 웨이크업 → 측정 → ESP-NOW 전송 → 딥슬립
2. 온습도 + 조도 + 배터리 측정
3. 5분 간격 데이터 전송
4. 움직임 감지 시 즉시 전송
5. 전송 실패 시 RTC 메모리에 저장
6. 저전압 시 슬립 시간 증가

📚 문법 설명 (코드 내 주석으로 포함):
- 모든 작업을 setup()에서 수행
- loop()는 빈 상태 (도달 안 함)
- RTC_DATA_ATTR로 상태 유지
- PIR 인터럽트로 웨이크업

핀: I2C(21,22), PIR(33), 조도(34), 배터리(35)`,
        expectedKeywords: ['setup', 'RTC_DATA_ATTR', 'PIR', '저전력'],
        quiz: {
          question: '센서 노드에서 모든 작업을 수행하는 함수는?',
          options: ['loop()', 'setup()', 'main()', 'run()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '게이트웨이 구현',
        description: '데이터 수집 및 전송 게이트웨이를 구현합니다.',
        prompt: `ESP32 게이트웨이 코드를 작성해줘.

요구사항:
1. ESP-NOW로 센서 노드 데이터 수신
2. FreeRTOS 태스크로 병렬 처리
3. WiFi로 클라우드 전송 (MQTT)
4. BLE로 스마트폰 앱 연동
5. 센서 노드 목록 자동 관리
6. OLED에 대시보드 표시

📚 문법 설명 (코드 내 주석으로 포함):
- ESP-NOW 수신 → Queue → 처리 태스크
- MQTT 발행 태스크
- BLE 서버 태스크
- 뮤텍스로 데이터 보호

핀: I2C(21,22), LED(25,26,27)`,
        expectedKeywords: ['게이트웨이', 'Queue', 'MQTT', 'BLE'],
        quiz: {
          question: '게이트웨이에서 태스크 간 데이터 전달 방법은?',
          options: ['전역 변수', 'Queue', '함수 호출', '파일'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 61, title: 'TFT 디스플레이' },
  },
};
