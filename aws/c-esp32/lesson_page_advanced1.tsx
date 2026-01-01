// 고급 과정 Part 1 (Day 46-55): 클라우드 연동
export const advancedPromptsPart1: { [day: number]: { title: string; project: string; prompt: string; files: string[] } } = {
  46: {
    title: 'MQTT 기초',
    project: 'MQTT 연결',
    files: ['main.ino', 'mqtt_client.h', 'mqtt_client.cpp', 'config.h', 'README.md'],
    prompt: `[Day 46] ESP32 Arduino - MQTT 기초

프로젝트: MQTT 연결

프로젝트 구조:
day46_mqtt_basic/
├── main.ino
├── mqtt_client.h
├── mqtt_client.cpp
├── config.h
└── README.md

요구사항:
1. PubSubClient 라이브러리 사용
2. 공개 MQTT 브로커 연결 (test.mosquitto.org)
3. client.connect(clientId)
4. 연결 상태 LED 표시
5. 재연결 로직 구현
6. 시리얼에 연결 상태 출력

📚 문법 설명 (코드 내 주석으로 포함):
- #include <PubSubClient.h>: MQTT 클라이언트 라이브러리
- WiFiClient espClient: TCP 연결용 클라이언트 객체
- PubSubClient client(espClient): MQTT 클라이언트 생성 (WiFi 클라이언트 전달)
- client.setServer(브로커주소, 포트): MQTT 브로커 설정 (기본 포트 1883)
- client.connect(클라이언트ID): 브로커에 연결 (고유 ID 필요)
- client.connected(): 연결 상태 확인 (true/false)
- client.loop(): MQTT 메시지 처리 (loop에서 반복 호출 필수)
- MQTT: Message Queuing Telemetry Transport - IoT용 경량 메시징 프로토콜

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: mqtt_client.h =====
(코드)
===== 파일 끝 =====

===== 파일: mqtt_client.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: config.h =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(MQTT 기초 및 PubSubClient 설치)
===== 파일 끝 =====`
  },
  47: {
    title: 'MQTT 발행/구독',
    project: 'Pub/Sub 통신',
    files: ['main.ino', 'mqtt_pubsub.h', 'mqtt_pubsub.cpp', 'README.md'],
    prompt: `[Day 47] ESP32 Arduino - MQTT 발행/구독

프로젝트: Pub/Sub 통신

프로젝트 구조:
day47_mqtt_pubsub/
├── main.ino
├── mqtt_pubsub.h
├── mqtt_pubsub.cpp
└── README.md

요구사항:
1. client.publish(topic, payload)
2. client.subscribe(topic)
3. callback 함수로 메시지 수신
4. 토픽: esp32/sensor/temperature
5. 토픽: esp32/control/led
6. QoS 0 사용 (기본)

📚 문법 설명 (코드 내 주석으로 포함):
- client.publish(토픽, 페이로드): MQTT 브로커에 메시지 발행
- client.subscribe(토픽): 특정 토픽 구독하여 메시지 수신 대기
- client.setCallback(함수명): 메시지 수신 시 호출할 콜백 함수 설정
- void callback(char* topic, byte* payload, unsigned int length): 콜백 함수 시그니처
- byte* payload: 수신 데이터 바이트 배열 포인터
- 토픽(Topic): MQTT에서 메시지 경로 (예: esp32/sensor/temp)
- /로 계층 구분: 토픽 구조화 (장치/센서타입/값)
- QoS 0/1/2: 메시지 전달 보장 수준 (0=최선노력, 1=최소1회, 2=정확히1회)

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: mqtt_pubsub.h =====
(코드)
===== 파일 끝 =====

===== 파일: mqtt_pubsub.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(토픽 구조 및 테스트 방법)
===== 파일 끝 =====`
  },
  48: {
    title: 'MQTT 센서 모니터',
    project: 'MQTT 센서 대시보드',
    files: ['main.ino', 'mqtt_sensor.h', 'mqtt_sensor.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'README.md'],
    prompt: `[Day 48] ESP32 Arduino - MQTT 센서 모니터

프로젝트: MQTT 센서 대시보드

프로젝트 구조:
day48_mqtt_sensor/
├── main.ino
├── mqtt_sensor.h
├── mqtt_sensor.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
└── README.md

요구사항:
1. 센서 데이터 JSON 형식 발행
2. 10초 간격 발행
3. {"temperature": 25.3, "humidity": 45.2}
4. LED 제어 명령 구독
5. 명령: {"led": "red", "state": "on"}
6. Node-RED 또는 MQTT Explorer로 확인

📚 문법 설명 (코드 내 주석으로 포함):
- client.publish(토픽, jsonBuffer): JSON 문자열을 MQTT로 발행
- snprintf(buffer, size, format, ...): 버퍼에 포맷팅된 문자열 생성
- char jsonBuffer[128]: JSON 문자열 저장용 문자 배열
- strcmp(str1, str2): 문자열 비교 (같으면 0 반환)
- payload를 String으로 변환: String((char*)payload).substring(0, length)
- MQTT + JSON 조합: IoT에서 구조화된 데이터 전송의 표준 패턴

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: mqtt_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: mqtt_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(MQTT Explorer 사용법)
===== 파일 끝 =====`
  },
  49: {
    title: 'Firebase 소개',
    project: 'Firebase 프로젝트 설정',
    files: ['main.ino', 'firebase_config.h', 'firebase_config.cpp', 'README.md'],
    prompt: `[Day 49] ESP32 Arduino - Firebase 소개

프로젝트: Firebase 프로젝트 설정

프로젝트 구조:
day49_firebase_intro/
├── main.ino
├── firebase_config.h
├── firebase_config.cpp
└── README.md

요구사항:
1. Firebase_ESP_Client 라이브러리 설치
2. Firebase 프로젝트 생성 안내
3. API Key, Database URL 설정
4. 인증 토큰 획득
5. 연결 테스트
6. config.h에 자격증명 저장 (gitignore 필요)

📚 문법 설명 (코드 내 주석으로 포함):
- #include <Firebase_ESP_Client.h>: Firebase 클라이언트 라이브러리
- FirebaseData fbdo: Firebase 데이터 객체 (요청/응답 저장)
- FirebaseAuth auth: 인증 정보 객체
- FirebaseConfig config: 설정 정보 객체
- config.api_key = "...": API 키 설정
- config.database_url = "...": Realtime Database URL 설정
- Firebase.begin(&config, &auth): Firebase 초기화
- Firebase.ready(): Firebase 연결 상태 확인
- 익명 인증: auth.user.email/password를 비우면 익명 사용자로 연결

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: firebase_config.h =====
(코드 - API_KEY, DATABASE_URL 플레이스홀더)
===== 파일 끝 =====

===== 파일: firebase_config.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(Firebase 프로젝트 생성 단계별 안내)
===== 파일 끝 =====`
  },
  50: {
    title: 'Firebase Realtime Database',
    project: '클라우드 데이터 저장',
    files: ['main.ino', 'firebase_db.h', 'firebase_db.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'README.md'],
    prompt: `[Day 50] ESP32 Arduino - Firebase Realtime Database

프로젝트: 클라우드 데이터 저장

프로젝트 구조:
day50_firebase_rtdb/
├── main.ino
├── firebase_db.h
├── firebase_db.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
└── README.md

요구사항:
1. Firebase.setInt(), Firebase.setFloat()
2. /sensors/temperature, /sensors/humidity 경로
3. 타임스탬프 포함 저장
4. Firebase.getInt()로 값 읽기
5. /control/led 경로 모니터링
6. 실시간 동기화 확인

📚 문법 설명 (코드 내 주석으로 포함):
- Firebase.RTDB.setInt(&fbdo, 경로, 값): 정수 데이터 저장
- Firebase.RTDB.setFloat(&fbdo, 경로, 값): 실수 데이터 저장
- Firebase.RTDB.setString(&fbdo, 경로, 문자열): 문자열 저장
- Firebase.RTDB.getInt(&fbdo, 경로): 정수 데이터 읽기
- fbdo.intData(): getInt 결과값 가져오기
- fbdo.floatData(): getFloat 결과값 가져오기
- 경로 표기: /부모/자식 형태 (예: /sensors/temperature)
- RTDB: Realtime Database의 약자

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: firebase_db.h =====
(코드)
===== 파일 끝 =====

===== 파일: firebase_db.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(데이터베이스 규칙 설정)
===== 파일 끝 =====`
  },
  51: {
    title: 'Firebase 스트림',
    project: '실시간 데이터 동기화',
    files: ['main.ino', 'firebase_stream.h', 'firebase_stream.cpp', 'led_control.h', 'led_control.cpp', 'README.md'],
    prompt: `[Day 51] ESP32 Arduino - Firebase 스트림

프로젝트: 실시간 데이터 동기화

프로젝트 구조:
day51_firebase_stream/
├── main.ino
├── firebase_stream.h
├── firebase_stream.cpp
├── led_control.h
├── led_control.cpp
└── README.md

요구사항:
1. Firebase.beginStream() 사용
2. 데이터 변경 시 콜백 호출
3. /control 경로 스트림
4. 원격 LED 제어 실시간 반영
5. 연결 끊김 시 재연결
6. 스트림 이벤트 로깅

📚 문법 설명 (코드 내 주석으로 포함):
- Firebase.RTDB.beginStream(&fbdo, 경로): 실시간 데이터 스트림 시작
- Firebase.RTDB.readStream(&fbdo): 스트림에서 데이터 읽기
- fbdo.streamAvailable(): 새 데이터 존재 여부 확인
- fbdo.dataPath(): 변경된 데이터 경로 반환
- fbdo.dataType(): 데이터 타입 확인 (int, float, string 등)
- fbdo.streamTimeout(): 스트림 타임아웃 발생 여부
- 스트림 vs 폴링: 스트림은 서버가 변경 시 푸시, 폴링은 클라이언트가 주기적 요청
- SSE(Server-Sent Events): Firebase 스트림이 사용하는 프로토콜

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: firebase_stream.h =====
(코드)
===== 파일 끝 =====

===== 파일: firebase_stream.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.h =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(스트림 vs 폴링 비교)
===== 파일 끝 =====`
  },
  52: {
    title: 'Firebase 히스토리 저장',
    project: '시계열 데이터 저장',
    files: ['main.ino', 'firebase_history.h', 'firebase_history.cpp', 'ntp_time.h', 'ntp_time.cpp', 'README.md'],
    prompt: `[Day 52] ESP32 Arduino - Firebase 히스토리 저장

프로젝트: 시계열 데이터 저장

프로젝트 구조:
day52_firebase_history/
├── main.ino
├── firebase_history.h
├── firebase_history.cpp
├── ntp_time.h
├── ntp_time.cpp
└── README.md

요구사항:
1. /history/YYYYMMDD/HHMMSS 경로 구조
2. push()로 자동 키 생성
3. 데이터 보관 기간 관리
4. 일별 최대 데이터 제한
5. 오래된 데이터 삭제 (선택)
6. Firebase 콘솔에서 데이터 확인

📚 문법 설명 (코드 내 주석으로 포함):
- Firebase.RTDB.pushJSON(&fbdo, 경로, &json): JSON 데이터를 push하여 자동 키 생성
- fbdo.pushName(): push로 생성된 고유 키 반환 (예: -Nabc123)
- Firebase.RTDB.deleteNode(&fbdo, 경로): 특정 경로의 데이터 삭제
- String 경로 조합: "/history/" + date + "/" + time
- 시계열 데이터: 시간순으로 정렬된 연속적인 데이터
- 날짜 기반 경로: 데이터 검색 및 관리 용이

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: firebase_history.h =====
(코드)
===== 파일 끝 =====

===== 파일: firebase_history.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: ntp_time.h =====
(코드)
===== 파일 끝 =====

===== 파일: ntp_time.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(데이터 구조 설계)
===== 파일 끝 =====`
  },
  53: {
    title: 'ThingSpeak 소개',
    project: 'ThingSpeak 채널',
    files: ['main.ino', 'thingspeak_client.h', 'thingspeak_client.cpp', 'config.h', 'README.md'],
    prompt: `[Day 53] ESP32 Arduino - ThingSpeak 소개

프로젝트: ThingSpeak 채널

프로젝트 구조:
day53_thingspeak/
├── main.ino
├── thingspeak_client.h
├── thingspeak_client.cpp
├── config.h
└── README.md

요구사항:
1. ThingSpeak 라이브러리 설치
2. 채널 생성 (온도, 습도 필드)
3. ThingSpeak.writeField() 사용
4. API Key 설정
5. 15초 간격 업로드 (무료 제한)
6. 채널 대시보드 확인

📚 문법 설명 (코드 내 주석으로 포함):
- #include <ThingSpeak.h>: ThingSpeak 공식 라이브러리
- ThingSpeak.begin(client): ThingSpeak 초기화 (WiFiClient 전달)
- ThingSpeak.writeField(채널ID, 필드번호, 값, API키): 단일 필드에 데이터 전송
- 채널(Channel): ThingSpeak에서 데이터를 저장하는 단위
- 필드(Field): 채널 내 개별 데이터 항목 (최대 8개)
- Write API Key: 데이터 쓰기 권한용 키
- Read API Key: 데이터 읽기 권한용 키
- 15초 제한: 무료 계정은 최소 15초 간격으로만 업로드 가능

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: thingspeak_client.h =====
(코드)
===== 파일 끝 =====

===== 파일: thingspeak_client.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: config.h =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(ThingSpeak 계정 및 채널 생성)
===== 파일 끝 =====`
  },
  54: {
    title: 'ThingSpeak 그래프',
    project: '데이터 시각화',
    files: ['main.ino', 'thingspeak_multi.h', 'thingspeak_multi.cpp', 'aht20_sensor.h', 'aht20_sensor.cpp', 'README.md'],
    prompt: `[Day 54] ESP32 Arduino - ThingSpeak 그래프

프로젝트: 데이터 시각화

프로젝트 구조:
day54_thingspeak_chart/
├── main.ino
├── thingspeak_multi.h
├── thingspeak_multi.cpp
├── aht20_sensor.h
├── aht20_sensor.cpp
└── README.md

요구사항:
1. 다중 필드 동시 업로드
2. ThingSpeak.setField(1, temp); setField(2, humi);
3. ThingSpeak.writeFields()
4. 차트 위젯 설정
5. MATLAB 분석 기초
6. React 앱 연동 (iframe)

📚 문법 설명 (코드 내 주석으로 포함):
- ThingSpeak.setField(필드번호, 값): 전송할 필드 값 설정 (버퍼에 저장)
- ThingSpeak.writeFields(채널ID, API키): 설정된 모든 필드 한 번에 전송
- setField vs writeField: setField는 버퍼 저장, writeFields는 일괄 전송
- 반환값 200: HTTP 성공 코드 (전송 성공)
- 반환값 -401: 인증 실패 (API 키 오류)
- iframe 임베딩: <iframe src="thingspeak차트URL"> 웹페이지에 차트 삽입

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: thingspeak_multi.h =====
(코드)
===== 파일 끝 =====

===== 파일: thingspeak_multi.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.h =====
(코드)
===== 파일 끝 =====

===== 파일: aht20_sensor.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(차트 설정 및 공유)
===== 파일 끝 =====`
  },
  55: {
    title: 'Blynk 앱 연동',
    project: '스마트폰 제어',
    files: ['main.ino', 'blynk_client.h', 'blynk_client.cpp', 'led_control.h', 'led_control.cpp', 'README.md'],
    prompt: `[Day 55] ESP32 Arduino - Blynk 앱 연동

프로젝트: 스마트폰 제어

프로젝트 구조:
day55_blynk/
├── main.ino
├── blynk_client.h
├── blynk_client.cpp
├── led_control.h
├── led_control.cpp
└── README.md

요구사항:
1. Blynk 라이브러리 설치
2. Blynk 앱에서 프로젝트 생성
3. Auth Token 설정
4. Virtual Pin으로 LED 제어
5. Blynk.virtualWrite()로 센서 전송
6. Button, Gauge 위젯 사용

📚 문법 설명 (코드 내 주석으로 포함):
- #define BLYNK_TEMPLATE_ID "...": Blynk 템플릿 ID (대시보드에서 확인)
- #define BLYNK_TEMPLATE_NAME "...": 템플릿 이름
- #define BLYNK_AUTH_TOKEN "...": 인증 토큰 (기기 고유 키)
- #include <BlynkSimpleEsp32.h>: ESP32용 Blynk 라이브러리
- Blynk.begin(auth, ssid, pass): Blynk 서버 연결
- Blynk.run(): 메인 루프에서 호출하여 Blynk 통신 유지
- Blynk.virtualWrite(Vpin, 값): Virtual Pin에 값 전송 (앱으로)
- BLYNK_WRITE(Vpin): 앱에서 값 수신 시 호출되는 함수
- param.asInt(): 수신 값을 정수로 변환
- Virtual Pin (V0~V255): 물리 핀 아닌 가상 데이터 채널

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: main.ino =====
(코드)
===== 파일 끝 =====

===== 파일: blynk_client.h =====
(코드)
===== 파일 끝 =====

===== 파일: blynk_client.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.h =====
(코드)
===== 파일 끝 =====

===== 파일: led_control.cpp =====
(코드)
===== 파일 끝 =====

===== 파일: README.md =====
(Blynk 앱 설정 및 위젯 구성)
===== 파일 끝 =====`
  }
};

export default advancedPromptsPart1;
