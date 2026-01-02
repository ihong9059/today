// 중급 과정 Part 1 (Day 16-30): WiFi AP와 고급 웹
// esp32-arduino-lesson-day-page.tsx에서 import해서 사용

export const intermediateDataPart1: Record<number, any> = {
  // ============================================
  // Day 16: WiFi AP 모드 기초
  // ============================================
  16: {
    day: 16,
    title: 'WiFi AP 모드 기초',
    subtitle: 'ESP32를 핫스팟으로 만들어 다른 기기가 연결할 수 있게 합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'AP 모드 개념 이해하기',
        description: 'ESP32의 AP 모드와 Station 모드의 차이를 이해합니다.',
        prompt: `ESP32의 WiFi AP(Access Point) 모드에 대해 설명해줘.

설명해야 할 내용:
1. AP 모드란 무엇인지 (ESP32가 공유기 역할)
2. Station 모드와 AP 모드의 차이
3. AP 모드를 언제 사용하는지 (예: 공유기 없는 환경)
4. ESP32 AP의 기본 IP 주소 (192.168.4.1)

📚 문법 설명:
- WiFi.mode(WIFI_AP): WiFi를 AP 전용 모드로 설정
- WiFi.mode(WIFI_STA): WiFi를 Station(클라이언트) 모드로 설정
- WiFi.mode(WIFI_AP_STA): AP와 Station 동시 사용

초보자가 이해하기 쉽게 비유를 들어 설명해줘.`,
        expectedKeywords: ['AP', 'Access Point', 'Station', '192.168.4.1'],
        quiz: {
          question: 'ESP32 AP 모드의 기본 IP 주소는?',
          options: ['192.168.0.1', '192.168.1.1', '192.168.4.1', '10.0.0.1'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: 'ESP32 핫스팟 만들기',
        description: 'softAP()로 ESP32를 핫스팟으로 설정합니다.',
        prompt: `ESP32에서 WiFi 핫스팟을 만드는 코드를 작성해줘.

요구사항:
1. WiFi.softAP(ssid, password)로 AP 시작
2. AP 이름: "ESP32_IoT_Lab"
3. AP 비밀번호: "12345678"
4. 시리얼에 AP IP 주소 출력
5. OLED에 AP 정보 표시 (SSID, IP)
6. LED로 AP 상태 표시 (켜짐 = AP 활성)

📚 문법 설명 (코드 내 주석으로 포함):
- WiFi.softAP(ssid, password): ESP32를 AP로 동작시켜 핫스팟 생성
- WiFi.softAPIP(): AP 모드에서 ESP32의 IP 주소 반환
- WiFi.softAPgetStationNum(): 연결된 클라이언트 수 반환
- IPAddress 타입: IP 주소를 저장하는 자료형

핀: I2C(21,22), LED(25)`,
        expectedKeywords: ['softAP', 'softAPIP', 'SSID', 'password'],
        quiz: {
          question: 'AP를 시작하는 함수는?',
          options: ['WiFi.begin()', 'WiFi.softAP()', 'WiFi.connect()', 'WiFi.start()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '연결된 클라이언트 모니터링',
        description: '핫스팟에 연결된 기기 수를 모니터링합니다.',
        prompt: `ESP32 AP에 연결된 클라이언트 수를 모니터링하는 코드를 작성해줘.

요구사항:
1. AP 모드로 핫스팟 시작
2. 2초마다 연결된 클라이언트 수 확인
3. 클라이언트 수가 변경되면 시리얼에 출력
4. OLED에 "연결: X대" 형식으로 표시
5. 연결된 기기가 있으면 파랑 LED, 없으면 꺼짐

📚 문법 설명 (코드 내 주석으로 포함):
- WiFi.softAPgetStationNum(): 현재 연결된 클라이언트 수 반환
- static 변수: 함수 호출 사이에 값이 유지되는 변수
- 이전 값과 비교하여 변경 감지하는 패턴

핀: I2C(21,22), LED(파랑:27)`,
        expectedKeywords: ['softAPgetStationNum', 'static', '클라이언트'],
        quiz: {
          question: '연결된 클라이언트 수를 확인하는 함수는?',
          options: ['WiFi.clientCount()', 'WiFi.softAPgetStationNum()', 'WiFi.getClients()', 'WiFi.connected()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 17, title: 'AP 모드 웹서버' },
  },

  // ============================================
  // Day 17: AP 모드 웹서버
  // ============================================
  17: {
    day: 17,
    title: 'AP 모드 웹서버',
    subtitle: '공유기 없이 ESP32만으로 웹서버를 운영합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'AP + 웹서버 구조 이해',
        description: 'AP 모드에서 웹서버가 동작하는 구조를 이해합니다.',
        prompt: `ESP32 AP 모드에서 웹서버를 운영하는 구조를 설명해줘.

설명해야 할 내용:
1. AP 모드 웹서버의 동작 원리
2. 클라이언트가 ESP32에 직접 연결하는 방식
3. 인터넷 없이 로컬 네트워크만으로 통신
4. 언제 이 구조를 사용하는지 (현장 설정, 센서 읽기 등)

📚 문법 설명:
- 클라이언트: ESP32 AP에 연결한 스마트폰/PC
- 웹서버: HTTP 요청을 받아 응답하는 서버
- 192.168.4.1로 접속: AP 모드 기본 주소

초보자가 이해하기 쉽게 그림으로 설명해줘 (텍스트 다이어그램).`,
        expectedKeywords: ['AP', '웹서버', '192.168.4.1', '로컬'],
        quiz: {
          question: 'AP 모드 웹서버의 장점이 아닌 것은?',
          options: ['공유기 불필요', '인터넷 접속 가능', '현장 설정 용이', '독립적 동작'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'AP 모드 웹페이지 만들기',
        description: 'AP 모드에서 접속할 수 있는 웹페이지를 만듭니다.',
        prompt: `ESP32 AP 모드에서 웹페이지를 제공하는 코드를 작성해줘.

요구사항:
1. AP 모드로 시작 (SSID: "ESP32_Config")
2. 192.168.4.1 접속 시 환영 페이지 표시
3. 페이지에 현재 온습도 표시 (AHT20 센서)
4. 3색 LED 제어 버튼 (빨강/노랑/파랑)
5. 반응형 CSS로 모바일 대응
6. 시리얼에 접속 로그 출력

📚 문법 설명 (코드 내 주석으로 포함):
- WebServer server(80): 포트 80에서 웹서버 생성
- server.on("/", handleRoot): 루트 경로 핸들러 등록
- server.send(200, "text/html", html): HTML 응답 전송
- String html = R"rawliteral(...)rawliteral": 여러 줄 문자열

핀: I2C(21,22), LED(25,26,27)`,
        expectedKeywords: ['softAP', 'WebServer', 'server.on', 'handleRoot'],
        quiz: {
          question: 'ESP32 AP에 스마트폰으로 접속하려면?',
          options: ['인터넷 연결', 'ESP32 WiFi에 연결 후 192.168.4.1 접속', '블루투스 연결', '케이블 연결'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'WiFi 설정 입력 페이지',
        description: '웹에서 WiFi 정보를 입력받아 저장합니다.',
        prompt: `ESP32에서 웹페이지로 WiFi 설정을 입력받는 코드를 작성해줘.

요구사항:
1. AP 모드로 시작
2. 설정 페이지에 WiFi SSID 입력 필드
3. WiFi 비밀번호 입력 필드 (password 타입)
4. "저장" 버튼 클릭 시 입력값 받기
5. 입력받은 정보를 시리얼에 출력
6. 저장 완료 메시지 페이지로 이동

📚 문법 설명 (코드 내 주석으로 포함):
- server.arg("파라미터명"): HTTP 요청에서 폼 데이터 가져오기
- server.hasArg("파라미터명"): 해당 파라미터 존재 여부 확인
- <form method="POST" action="/save">: 데이터를 /save로 전송
- <input type="password">: 비밀번호 입력 필드 (가려짐)
- server.sendHeader("Location", "/"): 리다이렉트 헤더

핀: I2C(21,22)`,
        expectedKeywords: ['server.arg', 'hasArg', 'form', 'POST'],
        quiz: {
          question: '폼 데이터를 가져오는 함수는?',
          options: ['server.getData()', 'server.arg()', 'server.form()', 'server.input()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 18, title: '캡티브 포털' },
  },

  // ============================================
  // Day 18: 캡티브 포털
  // ============================================
  18: {
    day: 18,
    title: '캡티브 포털',
    subtitle: 'WiFi 연결 시 자동으로 설정 페이지가 열리는 시스템을 만듭니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '캡티브 포털 원리 이해',
        description: 'DNS 서버를 이용한 캡티브 포털의 원리를 학습합니다.',
        prompt: `캡티브 포털(Captive Portal)의 원리를 설명해줘.

설명해야 할 내용:
1. 캡티브 포털이란 (카페 WiFi 로그인 페이지 같은 것)
2. DNS 서버의 역할 (도메인 → IP 변환)
3. 모든 도메인을 ESP32 IP로 리다이렉트하는 원리
4. 스마트폰/PC가 캡티브 포털을 감지하는 방식

📚 문법 설명:
- DNS (Domain Name System): 도메인을 IP로 변환하는 시스템
- 캡티브 포털: WiFi 연결 시 자동으로 뜨는 로그인/설정 페이지
- 리다이렉트: 다른 주소로 자동 이동시키는 것

초보자가 이해하기 쉽게 단계별로 설명해줘.`,
        expectedKeywords: ['캡티브 포털', 'DNS', '리다이렉트', '자동'],
        quiz: {
          question: '캡티브 포털에서 DNS 서버의 역할은?',
          options: ['파일 저장', '모든 도메인을 ESP32 IP로 변환', '암호화', '데이터 압축'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'DNS 서버 설정하기',
        description: 'DNSServer 라이브러리로 캡티브 포털을 구현합니다.',
        prompt: `ESP32에서 캡티브 포털을 구현하는 코드를 작성해줘.

요구사항:
1. AP 모드 시작 + DNS 서버 시작
2. 모든 도메인 요청을 ESP32 IP로 리다이렉트
3. 스마트폰 연결 시 자동으로 설정 페이지 표시
4. 모바일 친화적 UI (viewport 메타태그)
5. WiFi SSID/Password 입력 폼
6. 설정 저장 후 연결 시도

📚 문법 설명 (코드 내 주석으로 포함):
- #include <DNSServer.h>: DNS 서버 라이브러리
- DNSServer dnsServer: DNS 서버 객체 생성
- dnsServer.start(53, "*", apIP): 포트 53에서 모든 도메인을 apIP로 리다이렉트
- dnsServer.processNextRequest(): DNS 요청 처리 (loop에서 반드시 호출)
- <meta name="viewport" content="width=device-width">: 모바일 화면 맞춤

핀: I2C(21,22)`,
        expectedKeywords: ['DNSServer', 'start', '53', 'processNextRequest'],
        quiz: {
          question: 'DNS 서버의 기본 포트 번호는?',
          options: ['80', '443', '53', '8080'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: '연결 테스트 및 결과 표시',
        description: '입력받은 WiFi 정보로 연결을 시도하고 결과를 표시합니다.',
        prompt: `ESP32에서 입력받은 WiFi 정보로 연결을 시도하고 결과를 표시하는 코드를 작성해줘.

요구사항:
1. 캡티브 포털에서 WiFi 정보 입력받기
2. AP_STA 모드로 전환하여 연결 시도
3. 연결 진행 상태를 OLED에 표시
4. 연결 성공: 파랑 LED + 성공 페이지 + IP 표시
5. 연결 실패: 빨강 LED + 실패 페이지 + 재시도 버튼
6. 타임아웃 10초 설정

📚 문법 설명 (코드 내 주석으로 포함):
- WiFi.mode(WIFI_AP_STA): AP와 Station 모드 동시 사용
- WiFi.begin(ssid, password): Station 모드로 연결 시도
- WiFi.status() == WL_CONNECTED: 연결 성공 확인
- millis(): 부팅 후 경과 시간 (밀리초)
- 타임아웃 패턴: 시작시간 저장 후 경과시간 비교

핀: I2C(21,22), LED(빨강:25, 파랑:27)`,
        expectedKeywords: ['WIFI_AP_STA', 'WL_CONNECTED', 'millis', 'timeout'],
        quiz: {
          question: 'AP와 Station 모드를 동시에 사용하려면?',
          options: ['WIFI_AP', 'WIFI_STA', 'WIFI_AP_STA', 'WIFI_DUAL'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 19, title: 'EEPROM 데이터 저장' },
  },

  // ============================================
  // Day 19: EEPROM 데이터 저장
  // ============================================
  19: {
    day: 19,
    title: 'EEPROM 데이터 저장',
    subtitle: '전원이 꺼져도 데이터가 유지되는 EEPROM 사용법을 배웁니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'EEPROM 개념 이해',
        description: 'EEPROM의 특징과 활용 방법을 학습합니다.',
        prompt: `ESP32의 EEPROM에 대해 설명해줘.

설명해야 할 내용:
1. EEPROM이란 (Electrically Erasable Programmable ROM)
2. RAM과 EEPROM의 차이 (전원 차단 시 유지 여부)
3. ESP32에서 EEPROM 사용 시 주의사항 (쓰기 횟수 제한)
4. 어떤 데이터를 EEPROM에 저장하는지 (설정값, WiFi 정보 등)

📚 문법 설명:
- EEPROM: 전원이 꺼져도 데이터가 유지되는 메모리
- Flash 메모리: ESP32에서 EEPROM을 에뮬레이션하는 실제 메모리
- 쓰기 수명: 약 10만~100만 회 (자주 쓰기 금지)

초보자가 이해하기 쉽게 비유를 들어 설명해줘.`,
        expectedKeywords: ['EEPROM', '비휘발성', 'Flash', '쓰기 수명'],
        quiz: {
          question: 'EEPROM의 특징이 아닌 것은?',
          options: ['전원 꺼져도 데이터 유지', '무한 쓰기 가능', '설정값 저장에 적합', '느린 쓰기 속도'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'EEPROM 읽기/쓰기',
        description: 'EEPROM에 데이터를 저장하고 읽는 코드를 작성합니다.',
        prompt: `ESP32에서 EEPROM에 데이터를 저장하고 읽는 코드를 작성해줘.

요구사항:
1. EEPROM 512바이트 초기화
2. 정수값 저장 (0번 주소부터 4바이트)
3. 문자열 저장 (10번 주소부터)
4. 부팅 시 저장된 값 읽어서 시리얼 출력
5. 버튼 누르면 값 변경 후 저장
6. OLED에 현재 저장된 값 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #include <EEPROM.h>: EEPROM 라이브러리 포함
- EEPROM.begin(size): EEPROM 초기화 (바이트 수 지정)
- EEPROM.write(addr, value): 1바이트 쓰기
- EEPROM.read(addr): 1바이트 읽기
- EEPROM.put(addr, data): 구조체/변수 쓰기
- EEPROM.get(addr, data): 구조체/변수 읽기
- EEPROM.commit(): 변경사항을 실제로 저장 (필수!)

핀: I2C(21,22), 버튼(32)`,
        expectedKeywords: ['EEPROM.begin', 'EEPROM.put', 'EEPROM.get', 'commit'],
        quiz: {
          question: 'EEPROM 쓰기 후 반드시 호출해야 하는 함수는?',
          options: ['EEPROM.save()', 'EEPROM.commit()', 'EEPROM.flush()', 'EEPROM.end()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'WiFi 정보 영구 저장',
        description: 'WiFi SSID와 비밀번호를 EEPROM에 저장합니다.',
        prompt: `ESP32에서 WiFi 설정을 EEPROM에 저장하고 자동 연결하는 코드를 작성해줘.

요구사항:
1. 구조체로 WiFi 설정 정의 (SSID, Password, 유효 플래그)
2. 부팅 시 EEPROM에서 WiFi 정보 읽기
3. 유효한 정보가 있으면 자동 연결 시도
4. 없으면 AP 모드로 캡티브 포털 시작
5. 웹에서 새 WiFi 정보 입력 시 EEPROM 저장
6. 설정 초기화 버튼 (5초 누르면 EEPROM 삭제)

📚 문법 설명 (코드 내 주석으로 포함):
- struct WiFiConfig { char ssid[32]; char pass[64]; bool valid; };
- EEPROM.put(0, config): 구조체 전체를 EEPROM에 저장
- EEPROM.get(0, config): EEPROM에서 구조체로 읽기
- strncpy(dest, src, n): 문자열 복사 (버퍼 오버플로우 방지)
- valid 플래그: 유효한 데이터인지 구분하는 표시

핀: I2C(21,22), 버튼(32), LED(25,27)`,
        expectedKeywords: ['struct', 'strncpy', 'valid', '자동 연결'],
        quiz: {
          question: 'WiFi 정보를 구조체로 저장할 때 사용하는 함수는?',
          options: ['EEPROM.write()', 'EEPROM.put()', 'EEPROM.save()', 'EEPROM.store()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 20, title: 'Preferences 라이브러리' },
  },

  // ============================================
  // Day 20: Preferences 라이브러리
  // ============================================
  20: {
    day: 20,
    title: 'Preferences 라이브러리',
    subtitle: 'ESP32 전용 Preferences로 더 편리하게 설정을 저장합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'Preferences vs EEPROM',
        description: 'Preferences 라이브러리의 장점을 이해합니다.',
        prompt: `ESP32의 Preferences 라이브러리에 대해 설명해줘.

설명해야 할 내용:
1. Preferences란 (ESP32 전용 NVS 기반 저장소)
2. EEPROM과 Preferences의 차이
3. Preferences의 장점 (키-값 저장, 네임스페이스)
4. 언제 Preferences를 사용하고 언제 EEPROM을 사용하는지

📚 문법 설명:
- NVS (Non-Volatile Storage): ESP32의 비휘발성 저장 시스템
- 네임스페이스: 설정을 그룹으로 분리 (앱별 설정 분리 가능)
- 키-값 저장: 주소 대신 이름으로 데이터 접근

초보자가 이해하기 쉽게 비교 표로 설명해줘.`,
        expectedKeywords: ['Preferences', 'NVS', '키-값', '네임스페이스'],
        quiz: {
          question: 'Preferences의 장점이 아닌 것은?',
          options: ['키-값 저장', '네임스페이스 지원', '더 빠른 속도', '모든 Arduino 보드 지원'],
          correctAnswer: 3,
        },
      },
      {
        id: 2,
        title: 'Preferences 사용하기',
        description: 'Preferences로 설정값을 저장하고 읽습니다.',
        prompt: `ESP32에서 Preferences 라이브러리를 사용하는 코드를 작성해줘.

요구사항:
1. "settings" 네임스페이스 생성
2. 정수값 저장 (키: "count")
3. 문자열 저장 (키: "username")
4. 불린값 저장 (키: "enabled")
5. 부팅 시 저장된 값 읽어서 OLED에 표시
6. 버튼으로 값 변경 후 저장

📚 문법 설명 (코드 내 주석으로 포함):
- #include <Preferences.h>: Preferences 라이브러리 포함
- Preferences prefs: Preferences 객체 생성
- prefs.begin("namespace", false): 네임스페이스 열기 (false=읽기/쓰기)
- prefs.putInt("key", value): 정수 저장
- prefs.getInt("key", default): 정수 읽기 (없으면 default 반환)
- prefs.putString("key", value): 문자열 저장
- prefs.getString("key", default): 문자열 읽기
- prefs.end(): 네임스페이스 닫기

핀: I2C(21,22), 버튼(32)`,
        expectedKeywords: ['Preferences', 'begin', 'putInt', 'getString'],
        quiz: {
          question: 'Preferences에서 네임스페이스를 여는 함수는?',
          options: ['prefs.open()', 'prefs.begin()', 'prefs.start()', 'prefs.init()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'WiFi 자동 연결 시스템',
        description: 'Preferences로 WiFi 정보를 관리하는 완성형 시스템을 만듭니다.',
        prompt: `ESP32에서 Preferences로 WiFi 정보를 관리하는 완성형 시스템을 만들어줘.

요구사항:
1. "wifi" 네임스페이스에 SSID, Password 저장
2. 부팅 시 저장된 WiFi로 자동 연결 시도
3. 연결 실패 또는 저장된 정보 없음 → 캡티브 포털 모드
4. 캡티브 포털에서 새 WiFi 입력 시 Preferences에 저장
5. "초기화" 버튼으로 저장된 WiFi 삭제
6. OLED에 현재 상태 표시 (연결됨/AP모드/연결중)

📚 문법 설명 (코드 내 주석으로 포함):
- prefs.isKey("key"): 해당 키가 존재하는지 확인
- prefs.remove("key"): 특정 키 삭제
- prefs.clear(): 네임스페이스의 모든 키 삭제
- 상태 머신: 여러 상태를 enum으로 정의하고 전환

핀: I2C(21,22), 버튼(32), LED(25,26,27)`,
        expectedKeywords: ['isKey', 'remove', 'clear', '상태 머신'],
        quiz: {
          question: 'Preferences에서 모든 키를 삭제하는 함수는?',
          options: ['prefs.deleteAll()', 'prefs.clear()', 'prefs.reset()', 'prefs.erase()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 21, title: 'JSON 데이터 처리' },
  },

  // ============================================
  // Day 21: JSON 데이터 처리
  // ============================================
  21: {
    day: 21,
    title: 'JSON 데이터 처리',
    subtitle: 'ArduinoJson 라이브러리로 JSON 데이터를 파싱하고 생성합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'JSON 형식 이해하기',
        description: 'JSON 데이터 형식과 활용 방법을 학습합니다.',
        prompt: `JSON(JavaScript Object Notation) 데이터 형식에 대해 설명해줘.

설명해야 할 내용:
1. JSON이란 무엇인지 (데이터 교환 형식)
2. JSON의 기본 구조 (객체 {}, 배열 [])
3. 지원하는 데이터 타입 (문자열, 숫자, 불린, null, 객체, 배열)
4. IoT에서 JSON을 사용하는 이유 (API 통신, 설정 저장)

📚 문법 설명:
- 객체: {"key": "value", "number": 123}
- 배열: [1, 2, 3] 또는 ["a", "b", "c"]
- 중첩: {"sensor": {"temp": 25.5, "humid": 60}}

JSON 예시를 여러 개 보여주고 설명해줘.`,
        expectedKeywords: ['JSON', '객체', '배열', '키-값'],
        quiz: {
          question: 'JSON에서 객체를 나타내는 기호는?',
          options: ['[]', '()', '{}', '<>'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: 'JSON 생성하기',
        description: 'ArduinoJson으로 센서 데이터를 JSON으로 만듭니다.',
        prompt: `ESP32에서 ArduinoJson으로 센서 데이터를 JSON으로 만드는 코드를 작성해줘.

요구사항:
1. ArduinoJson 라이브러리 사용
2. 온습도 센서 데이터 읽기
3. JSON 형식으로 변환: {"device":"ESP32", "temp":25.5, "humid":60, "time":12345}
4. 시리얼에 JSON 문자열 출력
5. 2초마다 반복

📚 문법 설명 (코드 내 주석으로 포함):
- #include <ArduinoJson.h>: ArduinoJson 라이브러리 포함
- StaticJsonDocument<256> doc: 정적 JSON 문서 생성 (256바이트)
- doc["key"] = value: JSON에 키-값 추가
- serializeJson(doc, output): JSON을 문자열로 변환
- serializeJsonPretty(doc, output): 보기 좋게 들여쓰기 포함

핀: I2C(21,22)`,
        expectedKeywords: ['ArduinoJson', 'StaticJsonDocument', 'serializeJson'],
        quiz: {
          question: 'JSON 문서를 문자열로 변환하는 함수는?',
          options: ['toJson()', 'stringify()', 'serializeJson()', 'convertJson()'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: 'JSON 파싱하기',
        description: 'JSON 문자열에서 데이터를 추출합니다.',
        prompt: `ESP32에서 JSON 문자열을 파싱하여 데이터를 추출하는 코드를 작성해줘.

요구사항:
1. 시리얼로 JSON 명령 수신: {"led":"red", "state":"on"}
2. JSON 파싱하여 LED 색상과 상태 추출
3. 해당 LED 제어 (on/off)
4. 응답 JSON 전송: {"result":"ok", "led":"red", "state":"on"}
5. 잘못된 JSON이면 에러 응답

📚 문법 설명 (코드 내 주석으로 포함):
- deserializeJson(doc, input): JSON 문자열 파싱
- DeserializationError error = deserializeJson(...): 에러 확인
- if (error) { ... }: 파싱 실패 처리
- doc["key"].as<String>(): 문자열로 값 추출
- doc["key"].as<int>(): 정수로 값 추출
- doc.containsKey("key"): 키 존재 여부 확인

핀: LED(빨강:25, 노랑:26, 파랑:27)`,
        expectedKeywords: ['deserializeJson', 'as<String>', 'containsKey'],
        quiz: {
          question: 'JSON 파싱에 실패했는지 확인하는 방법은?',
          options: ['doc.error()', 'deserializeJson 반환값 확인', 'doc.isNull()', 'doc.failed()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 22, title: 'HTTP 클라이언트 기초' },
  },

  // ============================================
  // Day 22: HTTP 클라이언트 기초
  // ============================================
  22: {
    day: 22,
    title: 'HTTP 클라이언트 기초',
    subtitle: 'ESP32에서 웹 API를 호출하여 데이터를 주고받습니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'HTTP 통신 이해하기',
        description: 'HTTP 요청과 응답의 구조를 학습합니다.',
        prompt: `HTTP 통신의 기본 개념을 설명해줘.

설명해야 할 내용:
1. HTTP란 무엇인지 (웹 통신 프로토콜)
2. HTTP 요청 메서드 (GET, POST, PUT, DELETE)
3. HTTP 상태 코드 (200, 404, 500 등)
4. 요청 헤더와 바디의 역할
5. IoT에서 HTTP 활용 (센서 데이터 전송, 명령 수신)

📚 문법 설명:
- GET: 데이터 조회 (URL에 파라미터)
- POST: 데이터 전송 (바디에 데이터)
- 200 OK: 성공
- 404 Not Found: 페이지 없음
- 500 Internal Server Error: 서버 오류

초보자가 이해하기 쉽게 예시와 함께 설명해줘.`,
        expectedKeywords: ['HTTP', 'GET', 'POST', '상태 코드'],
        quiz: {
          question: 'HTTP 요청 성공을 나타내는 상태 코드는?',
          options: ['100', '200', '404', '500'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'HTTP GET 요청',
        description: 'HTTPClient로 웹 API에서 데이터를 가져옵니다.',
        prompt: `ESP32에서 HTTP GET 요청으로 데이터를 가져오는 코드를 작성해줘.

요구사항:
1. WiFi 연결 후 HTTP 요청
2. 공개 API 호출 (예: 날씨 API 또는 시간 API)
3. 응답 상태 코드 확인
4. 응답 바디(JSON) 시리얼에 출력
5. 30초마다 자동 요청
6. 연결 실패 시 재시도 로직

📚 문법 설명 (코드 내 주석으로 포함):
- #include <HTTPClient.h>: HTTP 클라이언트 라이브러리
- HTTPClient http: HTTP 클라이언트 객체 생성
- http.begin(url): URL로 연결 시작
- http.GET(): GET 요청 수행, 상태 코드 반환
- http.getString(): 응답 바디를 문자열로 가져오기
- http.end(): 연결 종료 (필수!)

핀: I2C(21,22)`,
        expectedKeywords: ['HTTPClient', 'http.begin', 'http.GET', 'getString'],
        quiz: {
          question: 'HTTP GET 요청을 수행하는 함수는?',
          options: ['http.request()', 'http.GET()', 'http.fetch()', 'http.send()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'API 응답 파싱',
        description: 'API 응답 JSON을 파싱하여 OLED에 표시합니다.',
        prompt: `ESP32에서 API 응답을 파싱하여 OLED에 표시하는 코드를 작성해줘.

요구사항:
1. 시간 API 호출 (worldtimeapi.org 또는 유사 API)
2. 응답 JSON에서 현재 시간 추출
3. OLED에 현재 시간 표시
4. 1분마다 시간 업데이트
5. API 에러 시 "동기화 실패" 표시
6. 마지막 동기화 시간 표시

📚 문법 설명 (코드 내 주석으로 포함):
- HTTPClient + ArduinoJson 조합 사용
- http.getString()으로 받은 문자열을 deserializeJson()
- 중첩 JSON 접근: doc["datetime"].as<String>()
- substring(): 문자열에서 일부 추출

핀: I2C(21,22), LED(27)`,
        expectedKeywords: ['HTTPClient', 'deserializeJson', 'datetime', 'substring'],
        quiz: {
          question: 'HTTP 응답을 JSON으로 파싱하려면 어떤 라이브러리 조합이 필요한가?',
          options: ['WiFi + WebServer', 'HTTPClient + ArduinoJson', 'WiFi + EEPROM', 'WebServer + Preferences'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 23, title: 'HTTP POST 요청' },
  },

  // ============================================
  // Day 23: HTTP POST 요청
  // ============================================
  23: {
    day: 23,
    title: 'HTTP POST 요청',
    subtitle: '서버에 센서 데이터를 전송하는 방법을 배웁니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'POST 요청 이해하기',
        description: 'GET과 POST의 차이와 POST 사용 시나리오를 학습합니다.',
        prompt: `HTTP POST 요청에 대해 설명해줘.

설명해야 할 내용:
1. POST와 GET의 차이
2. POST 요청의 구조 (헤더, 바디)
3. Content-Type 헤더의 역할
4. POST를 사용하는 경우 (데이터 전송, 리소스 생성)
5. IoT에서 POST 활용 (센서 데이터 전송)

📚 문법 설명:
- Content-Type: application/json (JSON 데이터 전송 시)
- Content-Type: application/x-www-form-urlencoded (폼 데이터)
- 요청 바디: 실제 전송할 데이터

GET과 POST를 비교하는 표를 보여줘.`,
        expectedKeywords: ['POST', 'Content-Type', '바디', 'JSON'],
        quiz: {
          question: 'JSON 데이터를 POST로 전송할 때 Content-Type은?',
          options: ['text/html', 'application/json', 'text/plain', 'multipart/form-data'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'JSON 데이터 POST',
        description: '센서 데이터를 JSON으로 서버에 전송합니다.',
        prompt: `ESP32에서 센서 데이터를 JSON으로 서버에 POST하는 코드를 작성해줘.

요구사항:
1. 온습도 센서 데이터 읽기
2. JSON 형식으로 데이터 구성
3. HTTP POST로 서버에 전송
4. 서버 URL: "http://httpbin.org/post" (테스트용)
5. 응답 확인 및 시리얼 출력
6. 5초마다 데이터 전송

📚 문법 설명 (코드 내 주석으로 포함):
- http.addHeader("Content-Type", "application/json"): 헤더 추가
- http.POST(jsonString): POST 요청, 상태 코드 반환
- serializeJson(doc, jsonString): JSON 객체를 문자열로 변환
- 응답 코드 200-299: 성공 범위

핀: I2C(21,22)`,
        expectedKeywords: ['addHeader', 'http.POST', 'Content-Type', 'serializeJson'],
        quiz: {
          question: 'HTTP POST 요청에서 헤더를 추가하는 함수는?',
          options: ['http.setHeader()', 'http.addHeader()', 'http.header()', 'http.appendHeader()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '데이터 로깅 시스템',
        description: '센서 데이터를 클라우드에 주기적으로 전송합니다.',
        prompt: `ESP32에서 센서 데이터를 클라우드에 로깅하는 시스템을 만들어줘.

요구사항:
1. 온습도 데이터 5분마다 측정
2. 측정 데이터를 JSON으로 서버에 POST
3. 전송 성공/실패를 OLED에 표시
4. 전송 실패 시 로컬에 임시 저장 (배열)
5. 연결 복구 시 저장된 데이터 일괄 전송
6. 전송 횟수와 마지막 전송 시간 표시

📚 문법 설명 (코드 내 주석으로 포함):
- 데이터 버퍼링: 구조체 배열로 임시 저장
- 재시도 로직: 실패 시 저장하고 나중에 재전송
- millis() 타이머: 논블로킹 주기 실행
- 순환 버퍼: 오래된 데이터 덮어쓰기

핀: I2C(21,22), LED(25,27)`,
        expectedKeywords: ['버퍼링', '재시도', 'millis', '일괄 전송'],
        quiz: {
          question: '데이터 전송 실패 시 가장 좋은 대처 방법은?',
          options: ['무시', '프로그램 종료', '로컬에 저장 후 재시도', '전원 재시작'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 24, title: 'WebSocket 통신' },
  },

  // ============================================
  // Day 24: WebSocket 통신
  // ============================================
  24: {
    day: 24,
    title: 'WebSocket 통신',
    subtitle: '실시간 양방향 통신을 구현합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'WebSocket 이해하기',
        description: 'WebSocket의 특징과 HTTP와의 차이를 학습합니다.',
        prompt: `WebSocket 통신에 대해 설명해줘.

설명해야 할 내용:
1. WebSocket이란 무엇인지
2. HTTP와 WebSocket의 차이
3. WebSocket의 장점 (실시간, 양방향, 저지연)
4. WebSocket 연결 과정 (핸드셰이크)
5. IoT에서 WebSocket 활용 (실시간 제어, 모니터링)

📚 문법 설명:
- 전이중 통신: 서버와 클라이언트가 동시에 송수신
- 연결 유지: 한 번 연결하면 계속 유지
- 이벤트 기반: 메시지 도착 시 콜백 실행

HTTP와 WebSocket을 비교하는 다이어그램(텍스트)을 보여줘.`,
        expectedKeywords: ['WebSocket', '양방향', '실시간', '전이중'],
        quiz: {
          question: 'WebSocket의 장점이 아닌 것은?',
          options: ['실시간 통신', '양방향 통신', '매 요청마다 연결', '낮은 지연시간'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: 'WebSocket 서버 만들기',
        description: 'ESP32에서 WebSocket 서버를 구동합니다.',
        prompt: `ESP32에서 WebSocket 서버를 구동하는 코드를 작성해줘.

요구사항:
1. WiFi 연결 후 WebSocket 서버 시작 (포트 81)
2. 클라이언트 연결 시 환영 메시지 전송
3. 메시지 수신 시 시리얼에 출력
4. LED 제어 명령 처리 (JSON: {"led":"red","state":"on"})
5. 상태 변경 시 모든 클라이언트에 브로드캐스트
6. 연결/해제 이벤트 로깅

📚 문법 설명 (코드 내 주석으로 포함):
- #include <WebSocketsServer.h>: WebSocket 서버 라이브러리
- WebSocketsServer ws(81): 포트 81에서 서버 생성
- ws.begin(): WebSocket 서버 시작
- ws.onEvent(callback): 이벤트 핸들러 등록
- ws.loop(): 이벤트 처리 (loop에서 호출)
- ws.sendTXT(num, message): 특정 클라이언트에 메시지 전송
- ws.broadcastTXT(message): 모든 클라이언트에 전송

핀: LED(25,26,27)`,
        expectedKeywords: ['WebSocketsServer', 'onEvent', 'sendTXT', 'broadcastTXT'],
        quiz: {
          question: '모든 WebSocket 클라이언트에 메시지를 보내는 함수는?',
          options: ['ws.sendAll()', 'ws.broadcastTXT()', 'ws.multicast()', 'ws.sendToAll()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '실시간 센서 모니터링',
        description: 'WebSocket으로 실시간 센서 데이터를 전송합니다.',
        prompt: `ESP32에서 WebSocket으로 실시간 센서 데이터를 전송하는 코드를 작성해줘.

요구사항:
1. 웹 페이지 제공 (HTTP 서버)
2. WebSocket으로 실시간 데이터 전송
3. 1초마다 온습도 데이터 JSON 전송
4. 웹 페이지에서 실시간 그래프 표시 (Chart.js)
5. LED 제어 버튼 (WebSocket으로 명령 전송)
6. 연결 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- HTTP 서버 + WebSocket 서버 동시 운영
- 웹 페이지에 JavaScript WebSocket 클라이언트 코드 포함
- new WebSocket('ws://' + ip + ':81'): 클라이언트 연결
- ws.onmessage = function(e) { ... }: 메시지 수신 처리
- JSON.parse(e.data): JSON 파싱

핀: I2C(21,22), LED(25,26,27)`,
        expectedKeywords: ['실시간', 'Chart.js', 'onmessage', 'JSON.parse'],
        quiz: {
          question: 'WebSocket URL의 프로토콜 접두사는?',
          options: ['http://', 'wss://', 'ws://', 'socket://'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 25, title: 'MQTT 기초' },
  },

  // ============================================
  // Day 25: MQTT 기초
  // ============================================
  25: {
    day: 25,
    title: 'MQTT 기초',
    subtitle: 'IoT 표준 프로토콜인 MQTT의 기본을 배웁니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'MQTT 개념 이해',
        description: 'MQTT의 발행/구독 모델을 학습합니다.',
        prompt: `MQTT(Message Queuing Telemetry Transport)에 대해 설명해줘.

설명해야 할 내용:
1. MQTT란 무엇인지 (경량 메시징 프로토콜)
2. 발행(Publish)/구독(Subscribe) 모델
3. 브로커의 역할 (메시지 중개자)
4. 토픽의 개념과 구조 (home/room1/temp)
5. QoS 레벨 (0, 1, 2)
6. MQTT가 IoT에 적합한 이유

📚 문법 설명:
- 발행자(Publisher): 데이터를 보내는 쪽
- 구독자(Subscriber): 데이터를 받는 쪽
- 브로커(Broker): 메시지를 중개하는 서버
- 토픽(Topic): 메시지 분류 경로 (폴더 구조와 유사)

그림(텍스트 다이어그램)으로 MQTT 구조를 설명해줘.`,
        expectedKeywords: ['MQTT', 'Publish', 'Subscribe', '브로커', '토픽'],
        quiz: {
          question: 'MQTT에서 메시지를 중개하는 역할은?',
          options: ['Publisher', 'Subscriber', 'Broker', 'Topic'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: 'MQTT 브로커 연결',
        description: 'PubSubClient로 MQTT 브로커에 연결합니다.',
        prompt: `ESP32에서 MQTT 브로커에 연결하는 코드를 작성해줘.

요구사항:
1. WiFi 연결 후 MQTT 브로커 연결
2. 무료 공개 브로커 사용 (test.mosquitto.org)
3. 클라이언트 ID 고유하게 설정
4. 연결 성공/실패 상태 OLED에 표시
5. 연결 끊김 시 자동 재연결
6. LED로 연결 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #include <PubSubClient.h>: MQTT 클라이언트 라이브러리
- PubSubClient mqtt(wifiClient): MQTT 클라이언트 생성
- mqtt.setServer(broker, port): 브로커 주소 설정 (기본 포트 1883)
- mqtt.connect(clientId): 브로커에 연결
- mqtt.connected(): 연결 상태 확인
- mqtt.loop(): MQTT 이벤트 처리 (loop에서 반드시 호출)

핀: I2C(21,22), LED(27)`,
        expectedKeywords: ['PubSubClient', 'setServer', 'connect', 'mqtt.loop'],
        quiz: {
          question: 'MQTT의 기본 포트 번호는?',
          options: ['80', '443', '1883', '8080'],
          correctAnswer: 2,
        },
      },
      {
        id: 3,
        title: '센서 데이터 발행',
        description: '센서 데이터를 MQTT 토픽으로 발행합니다.',
        prompt: `ESP32에서 센서 데이터를 MQTT로 발행하는 코드를 작성해줘.

요구사항:
1. 온습도 센서 데이터 읽기
2. JSON 형식으로 데이터 구성
3. "esp32/sensor/data" 토픽으로 발행
4. 10초마다 데이터 발행
5. 발행 성공/실패 OLED에 표시
6. 발행 횟수 카운트 및 표시

📚 문법 설명 (코드 내 주석으로 포함):
- mqtt.publish(topic, payload): 토픽에 메시지 발행
- mqtt.publish(topic, payload, retained): retained=true면 브로커가 마지막 메시지 저장
- char payload[256]: 발행할 메시지 버퍼
- serializeJson(doc, payload): JSON을 char 배열로 변환

핀: I2C(21,22)`,
        expectedKeywords: ['mqtt.publish', 'topic', 'payload', 'retained'],
        quiz: {
          question: 'MQTT에서 메시지를 보내는 함수는?',
          options: ['mqtt.send()', 'mqtt.publish()', 'mqtt.broadcast()', 'mqtt.emit()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 26, title: 'MQTT 구독과 제어' },
  },

  // ============================================
  // Day 26: MQTT 구독과 제어
  // ============================================
  26: {
    day: 26,
    title: 'MQTT 구독과 제어',
    subtitle: 'MQTT 토픽을 구독하여 원격 제어를 구현합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'MQTT 구독 이해',
        description: '토픽 구독과 와일드카드를 학습합니다.',
        prompt: `MQTT 구독(Subscribe)에 대해 설명해줘.

설명해야 할 내용:
1. 구독의 개념 (관심 토픽 등록)
2. 토픽 와일드카드 (+, #)
3. + 와일드카드: 한 레벨 (home/+/temp)
4. # 와일드카드: 모든 하위 레벨 (home/#)
5. 구독 시 콜백 함수 동작

📚 문법 설명:
- home/room1/temp: 특정 토픽
- home/+/temp: 모든 방의 온도 (home/room1/temp, home/room2/temp 등)
- home/#: home 아래 모든 토픽

예시를 들어 와일드카드 사용법을 설명해줘.`,
        expectedKeywords: ['구독', '와일드카드', '+', '#'],
        quiz: {
          question: '"home/+/temp" 토픽이 매칭되는 것은?',
          options: ['home/temp', 'home/room1/temp', 'home/room1/sensor/temp', '모든 home 토픽'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '원격 LED 제어',
        description: 'MQTT 메시지로 LED를 원격 제어합니다.',
        prompt: `ESP32에서 MQTT 메시지로 LED를 원격 제어하는 코드를 작성해줘.

요구사항:
1. "esp32/led/control" 토픽 구독
2. JSON 명령 수신: {"color":"red","state":"on"}
3. 해당 색상 LED 제어
4. 상태 변경 시 "esp32/led/status" 토픽으로 응답 발행
5. OLED에 현재 LED 상태 표시
6. 잘못된 명령 시 에러 응답

📚 문법 설명 (코드 내 주석으로 포함):
- mqtt.setCallback(callback): 메시지 수신 콜백 설정
- mqtt.subscribe(topic): 토픽 구독
- void callback(topic, payload, length): 콜백 함수 형태
- 콜백에서 topic과 payload 처리
- payload는 byte 배열 → String으로 변환 필요

핀: LED(25,26,27), I2C(21,22)`,
        expectedKeywords: ['setCallback', 'subscribe', 'callback', 'payload'],
        quiz: {
          question: 'MQTT 메시지 수신 콜백을 설정하는 함수는?',
          options: ['mqtt.onMessage()', 'mqtt.setCallback()', 'mqtt.receive()', 'mqtt.listen()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '양방향 MQTT 시스템',
        description: '센서 발행 + 명령 구독을 통합합니다.',
        prompt: `ESP32에서 MQTT로 센서 데이터 발행과 명령 구독을 동시에 하는 코드를 작성해줘.

요구사항:
1. "esp32/sensor/data" 토픽으로 온습도 발행 (30초마다)
2. "esp32/led/control" 토픽 구독하여 LED 제어
3. "esp32/system/status" 토픽으로 상태 발행 (연결시간, 메모리)
4. "esp32/system/restart" 토픽 구독하여 재시작 명령 처리
5. 모든 동작 OLED에 표시
6. 하트비트: 60초마다 "esp32/heartbeat" 발행

📚 문법 설명 (코드 내 주석으로 포함):
- 여러 토픽 구독: subscribe를 여러 번 호출
- 콜백에서 토픽 분기 처리: strcmp(topic, "...") 또는 String 비교
- ESP.restart(): ESP32 재시작
- ESP.getFreeHeap(): 남은 힙 메모리

핀: I2C(21,22), LED(25,26,27)`,
        expectedKeywords: ['양방향', 'strcmp', 'ESP.restart', '하트비트'],
        quiz: {
          question: 'ESP32를 소프트웨어적으로 재시작하는 함수는?',
          options: ['ESP.reboot()', 'ESP.restart()', 'ESP.reset()', 'system.restart()'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 27, title: 'NTP 시간 동기화' },
  },

  // ============================================
  // Day 27: NTP 시간 동기화
  // ============================================
  27: {
    day: 27,
    title: 'NTP 시간 동기화',
    subtitle: '인터넷에서 정확한 시간을 가져와 사용합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'NTP 개념 이해',
        description: 'NTP 프로토콜과 시간 동기화의 중요성을 학습합니다.',
        prompt: `NTP(Network Time Protocol)에 대해 설명해줘.

설명해야 할 내용:
1. NTP란 무엇인지 (네트워크 시간 동기화 프로토콜)
2. ESP32에 RTC가 없는 이유와 NTP의 필요성
3. NTP 서버의 역할
4. 시간대(Timezone)와 UTC
5. IoT에서 정확한 시간이 필요한 이유 (로깅, 스케줄링)

📚 문법 설명:
- UTC: 협정 세계시 (기준 시간)
- KST: 한국 표준시 (UTC+9)
- NTP 서버: 정확한 시간을 제공하는 서버 (pool.ntp.org)

초보자가 이해하기 쉽게 비유를 들어 설명해줘.`,
        expectedKeywords: ['NTP', 'UTC', 'KST', '시간대'],
        quiz: {
          question: '한국 표준시(KST)는 UTC 기준 몇 시간?',
          options: ['+8시간', '+9시간', '+10시간', '-9시간'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: 'NTP 시간 가져오기',
        description: 'ESP32에서 NTP 서버로부터 시간을 가져옵니다.',
        prompt: `ESP32에서 NTP 서버로부터 시간을 가져오는 코드를 작성해줘.

요구사항:
1. WiFi 연결 후 NTP 동기화
2. NTP 서버: pool.ntp.org
3. 시간대: KST (UTC+9)
4. 동기화 성공 시 시리얼에 현재 시간 출력
5. OLED에 시계 표시 (HH:MM:SS)
6. 1초마다 시간 업데이트

📚 문법 설명 (코드 내 주석으로 포함):
- #include <time.h>: 시간 관련 함수
- configTime(gmtOffset_sec, daylightOffset, ntpServer): NTP 설정
- gmtOffset_sec = 9 * 3600: KST = UTC+9 (초 단위)
- getLocalTime(&timeinfo): 현재 시간 가져오기
- strftime(buffer, size, format, &timeinfo): 시간 포맷팅
- %H:%M:%S: 시:분:초 형식

핀: I2C(21,22)`,
        expectedKeywords: ['configTime', 'getLocalTime', 'strftime', 'gmtOffset'],
        quiz: {
          question: 'ESP32에서 NTP 시간을 설정하는 함수는?',
          options: ['setTime()', 'configTime()', 'syncTime()', 'initTime()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '디지털 시계 만들기',
        description: 'OLED에 날짜와 시간을 표시하는 시계를 만듭니다.',
        prompt: `ESP32로 OLED 디지털 시계를 만드는 코드를 작성해줘.

요구사항:
1. NTP로 시간 동기화
2. OLED에 현재 날짜 표시 (2024년 1월 15일)
3. OLED에 현재 시간 표시 (14:30:25)
4. 요일도 함께 표시 (월요일)
5. 1시간마다 NTP 재동기화
6. 동기화 상태 아이콘 표시

📚 문법 설명 (코드 내 주석으로 포함):
- strftime(buffer, size, "%Y년 %m월 %d일", &timeinfo): 한글 날짜
- timeinfo.tm_wday: 요일 (0=일요일, 1=월요일, ...)
- 요일 배열: {"일", "월", "화", "수", "목", "금", "토"}
- millis() 기반 재동기화 타이머

핀: I2C(21,22)`,
        expectedKeywords: ['strftime', 'tm_wday', '요일', '재동기화'],
        quiz: {
          question: 'tm_wday가 1일 때의 요일은?',
          options: ['일요일', '월요일', '화요일', '토요일'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 28, title: '타이머와 스케줄링' },
  },

  // ============================================
  // Day 28: 타이머와 스케줄링
  // ============================================
  28: {
    day: 28,
    title: '타이머와 스케줄링',
    subtitle: '특정 시간에 동작하는 스케줄러를 구현합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '스케줄링 개념 이해',
        description: '시간 기반 작업 실행의 원리를 학습합니다.',
        prompt: `IoT에서의 스케줄링 개념에 대해 설명해줘.

설명해야 할 내용:
1. 스케줄링이란 (특정 시간/조건에 작업 실행)
2. 주기적 작업 vs 특정 시간 작업
3. millis() 기반 논블로킹 타이머
4. NTP 시간 기반 스케줄러
5. 활용 예시 (조명 타이머, 알람, 데이터 수집)

📚 문법 설명:
- 논블로킹: delay() 사용 안 하고 millis()로 시간 체크
- 주기 실행: 마지막 실행 시간 저장 후 경과 시간 비교
- 시간 매칭: 현재 시:분이 설정값과 같은지 확인

cron 표현식에 대해서도 간단히 설명해줘.`,
        expectedKeywords: ['스케줄링', '논블로킹', 'millis', '주기'],
        quiz: {
          question: '논블로킹 타이머에서 사용하는 함수는?',
          options: ['delay()', 'millis()', 'wait()', 'sleep()'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '알람 시스템 만들기',
        description: '특정 시간에 알람이 울리는 시스템을 만듭니다.',
        prompt: `ESP32에서 알람 시스템을 만드는 코드를 작성해줘.

요구사항:
1. NTP로 현재 시간 동기화
2. 알람 시간 설정 (07:00, 12:00, 18:00)
3. 알람 시간이 되면 부저 + LED 점멸
4. 버튼으로 알람 해제
5. OLED에 현재 시간과 다음 알람 표시
6. 알람 on/off 토글 기능

📚 문법 설명 (코드 내 주석으로 포함):
- struct Alarm { int hour; int minute; bool enabled; };
- 배열로 여러 알람 관리
- 현재 시:분과 알람 시:분 비교
- 알람 중복 방지: lastAlarmMinute 저장
- tone(pin, frequency, duration): 부저 소리

핀: I2C(21,22), 부저(14), 버튼(32), LED(25)`,
        expectedKeywords: ['Alarm', 'hour', 'minute', 'tone'],
        quiz: {
          question: '알람이 중복으로 울리지 않게 하는 방법은?',
          options: ['delay 사용', '마지막 알람 시간 저장', '알람 삭제', '전원 차단'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '조명 타이머 만들기',
        description: '시간대별로 LED가 자동 제어되는 타이머를 만듭니다.',
        prompt: `ESP32에서 조명 타이머 시스템을 만드는 코드를 작성해줘.

요구사항:
1. NTP 시간 동기화
2. 시간대별 LED 제어:
   - 06:00~08:00: 노랑 LED (아침)
   - 18:00~22:00: 파랑 LED (저녁)
   - 22:00~06:00: 모든 LED 끔 (취침)
3. 웹 인터페이스로 스케줄 수정 가능
4. 수동 모드 전환 (스케줄 무시)
5. OLED에 현재 모드와 다음 변경 시간 표시
6. Preferences로 스케줄 저장

📚 문법 설명 (코드 내 주석으로 포함):
- 시간 범위 체크: if (hour >= start && hour < end)
- 자정 넘어가는 경우 처리: || (hour < endNextDay)
- 상태 머신: enum Mode { AUTO, MANUAL }
- Preferences로 스케줄 영구 저장

핀: I2C(21,22), LED(25,26,27)`,
        expectedKeywords: ['시간대', 'AUTO', 'MANUAL', '스케줄'],
        quiz: {
          question: '22:00~06:00 범위를 체크할 때 주의할 점은?',
          options: ['특별히 없음', '자정을 넘어가는 처리', '초 단위 확인', '밀리초 사용'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 29, title: '펌웨어 OTA 업데이트' },
  },

  // ============================================
  // Day 29: 펌웨어 OTA 업데이트
  // ============================================
  29: {
    day: 29,
    title: '펌웨어 OTA 업데이트',
    subtitle: 'WiFi를 통해 무선으로 펌웨어를 업데이트합니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'OTA 개념 이해',
        description: 'OTA 업데이트의 원리와 장점을 학습합니다.',
        prompt: `OTA(Over-The-Air) 업데이트에 대해 설명해줘.

설명해야 할 내용:
1. OTA란 무엇인지 (무선 펌웨어 업데이트)
2. OTA의 장점 (케이블 불필요, 원격 업데이트)
3. OTA의 위험성 (업데이트 실패, 보안)
4. ESP32의 OTA 방식 (ArduinoOTA, HTTP OTA)
5. 듀얼 파티션 시스템

📚 문법 설명:
- 펌웨어: ESP32에서 실행되는 프로그램
- 파티션: Flash 메모리를 나눈 영역
- 롤백: 업데이트 실패 시 이전 버전으로 복구

OTA 업데이트 과정을 단계별로 설명해줘.`,
        expectedKeywords: ['OTA', '무선', '펌웨어', '파티션'],
        quiz: {
          question: 'OTA의 장점이 아닌 것은?',
          options: ['원격 업데이트', '케이블 불필요', '더 빠른 업로드', '편리한 유지보수'],
          correctAnswer: 2,
        },
      },
      {
        id: 2,
        title: 'ArduinoOTA 설정',
        description: 'ArduinoOTA로 무선 업로드를 설정합니다.',
        prompt: `ESP32에서 ArduinoOTA를 설정하는 코드를 작성해줘.

요구사항:
1. WiFi 연결 후 OTA 초기화
2. OTA 호스트명 설정 (esp32-iot-device)
3. OTA 비밀번호 설정 (보안)
4. 업로드 진행률 OLED에 표시
5. 업데이트 완료/에러 이벤트 처리
6. LED로 OTA 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #include <ArduinoOTA.h>: ArduinoOTA 라이브러리
- ArduinoOTA.setHostname("name"): 네트워크에서 보이는 이름
- ArduinoOTA.setPassword("pass"): OTA 비밀번호
- ArduinoOTA.onStart(callback): 업데이트 시작 콜백
- ArduinoOTA.onProgress(callback): 진행률 콜백
- ArduinoOTA.onEnd(callback): 완료 콜백
- ArduinoOTA.onError(callback): 에러 콜백
- ArduinoOTA.begin(): OTA 시작
- ArduinoOTA.handle(): OTA 처리 (loop에서 호출)

핀: I2C(21,22), LED(25,26,27)`,
        expectedKeywords: ['ArduinoOTA', 'setHostname', 'onProgress', 'handle'],
        quiz: {
          question: 'OTA 업데이트 처리를 위해 loop()에서 호출해야 하는 함수는?',
          options: ['ArduinoOTA.loop()', 'ArduinoOTA.handle()', 'ArduinoOTA.process()', 'ArduinoOTA.run()'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: 'OTA 버전 관리',
        description: '펌웨어 버전을 관리하고 표시합니다.',
        prompt: `ESP32에서 펌웨어 버전을 관리하는 코드를 작성해줘.

요구사항:
1. #define으로 펌웨어 버전 정의 (예: "1.0.0")
2. 부팅 시 시리얼과 OLED에 버전 표시
3. 웹 페이지에서 현재 버전 확인 가능
4. OTA 업데이트 완료 후 버전 확인
5. MQTT로 버전 정보 발행
6. 빌드 날짜/시간도 함께 표시

📚 문법 설명 (코드 내 주석으로 포함):
- #define FW_VERSION "1.0.0": 펌웨어 버전 상수
- __DATE__: 컴파일 날짜 (전처리기 매크로)
- __TIME__: 컴파일 시간 (전처리기 매크로)
- String 연결로 버전 문자열 생성

핀: I2C(21,22)`,
        expectedKeywords: ['FW_VERSION', '__DATE__', '__TIME__', '버전'],
        quiz: {
          question: '컴파일 날짜를 자동으로 넣어주는 매크로는?',
          options: ['BUILD_DATE', '__DATE__', 'COMPILE_DATE', 'DATE'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 30, title: '중급 종합 프로젝트' },
  },

  // ============================================
  // Day 30: 중급 종합 프로젝트
  // ============================================
  30: {
    day: 30,
    title: '중급 종합 프로젝트',
    subtitle: '중급에서 배운 모든 기술을 통합한 스마트 홈 게이트웨이를 만듭니다.',
    videoId: '4IkqT89qei0',
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: '프로젝트 설계',
        description: '스마트 홈 게이트웨이의 기능을 설계합니다.',
        prompt: `ESP32 스마트 홈 게이트웨이 프로젝트를 설계해줘.

통합할 기능:
1. WiFi 자동 연결 (캡티브 포털로 설정)
2. MQTT로 센서 데이터 발행
3. MQTT로 LED 원격 제어
4. NTP 시간 동기화
5. 조명 타이머 스케줄러
6. 웹 대시보드 (실시간 데이터, 제어)
7. OTA 펌웨어 업데이트
8. Preferences로 설정 저장

각 기능별로 필요한 라이브러리와 핀을 정리하고,
시스템 구조도(텍스트)를 그려줘.`,
        expectedKeywords: ['설계', '통합', 'MQTT', 'OTA'],
        quiz: {
          question: '프로젝트 설계에서 가장 중요한 것은?',
          options: ['빨리 코딩 시작', '요구사항 정리', '화려한 UI', '많은 기능'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '핵심 기능 통합',
        description: '주요 기능들을 하나의 코드로 통합합니다.',
        prompt: `ESP32 스마트 홈 게이트웨이 핵심 코드를 작성해줘.

통합할 기능:
1. WiFi 연결 (저장된 정보 또는 캡티브 포털)
2. MQTT 연결 및 센서 데이터 발행 (30초마다)
3. MQTT 구독으로 LED 제어
4. NTP 시간 동기화
5. 웹 서버 + WebSocket 실시간 데이터
6. OLED 상태 표시

📚 문법 설명 (코드 내 주석으로 포함):
- 여러 라이브러리 초기화 순서
- loop()에서 각 서비스 처리
- 상태 변수로 연결 상태 관리
- 에러 핸들링 패턴

핀: I2C(21,22), LED(25,26,27), 부저(14)`,
        expectedKeywords: ['통합', '초기화 순서', 'loop', '상태 관리'],
        quiz: {
          question: '여러 네트워크 서비스를 사용할 때 주의할 점은?',
          options: ['하나만 사용', '순서대로 초기화', 'delay 많이 사용', '전역변수 금지'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '테스트 및 문서화',
        description: '프로젝트를 테스트하고 문서화합니다.',
        prompt: `ESP32 스마트 홈 게이트웨이 테스트 체크리스트와 사용 설명서를 만들어줘.

테스트 체크리스트:
1. 초기 설정 (캡티브 포털) 테스트
2. MQTT 연결 및 데이터 발행 테스트
3. 원격 LED 제어 테스트
4. 웹 대시보드 접속 테스트
5. 스케줄러 동작 테스트
6. OTA 업데이트 테스트
7. 전원 재시작 후 자동 복구 테스트

사용 설명서:
- 초기 설정 방법
- 웹 대시보드 사용법
- MQTT 연동 방법
- 문제 해결 (FAQ)

마크다운 형식으로 작성해줘.`,
        expectedKeywords: ['테스트', '체크리스트', '설명서', 'FAQ'],
        quiz: {
          question: '프로젝트 완료 후 반드시 해야 할 것은?',
          options: ['바로 배포', '테스트와 문서화', '다음 프로젝트 시작', '코드 삭제'],
          correctAnswer: 1,
        },
      },
    ],
    nextLesson: { day: 31, title: '인터럽트 기초' },
  },
};
