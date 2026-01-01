'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, CheckCircle, Play, Clock, Code, Cpu, Wifi, Database, Shield, Zap } from 'lucide-react';

// 레벨별 강의 데이터
const levelData: { [key: string]: {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bgColor: string;
  days: number;
  startDay: number;
  description: string;
  features: string[];
  lessons: { day: number; title: string; duration: string; description: string; project: string }[];
}} = {
  'beginner': {
    id: 'beginner',
    title: 'ESP32 Arduino 초급',
    subtitle: 'GPIO & 센서 기초 (15일)',
    icon: '🔌',
    color: 'from-green-500 to-teal-600',
    bgColor: 'bg-green-500',
    days: 15,
    startDay: 1,
    description: 'ESP32 GPIO 제어, 센서 읽기, WiFi 웹서버 기초까지. 아두이노 IoT의 첫 걸음!',
    features: ['GPIO 제어', 'Active HIGH', 'I2C 센서', 'OLED 디스플레이', 'WiFi 웹서버'],
    lessons: [
      { day: 1, title: '환경설정 및 Hello World', duration: '30분', description: 'Arduino IDE 설정, Serial 통신', project: '시리얼 모니터 출력' },
      { day: 2, title: 'LED 켜기/끄기', duration: '35분', description: 'GPIO 출력, Active HIGH', project: 'LED 제어' },
      { day: 3, title: '신호등 만들기', duration: '40분', description: '순차 제어, delay()', project: '3색 신호등' },
      { day: 4, title: '버튼 입력 처리', duration: '40분', description: 'GPIO 입력, 디바운싱', project: '버튼으로 LED 토글' },
      { day: 5, title: '버튼 인터럽트와 부저', duration: '45분', description: 'attachInterrupt, ISR', project: '도어벨 시스템' },
      { day: 6, title: 'PWM LED 밝기 조절', duration: '40분', description: 'LEDC PWM, 듀티 사이클', project: 'LED 페이더' },
      { day: 7, title: '멜로디 연주', duration: '45분', description: 'ledcWriteTone, 주파수', project: '음계 연주기' },
      { day: 8, title: 'I2C 통신과 AHT20', duration: '45분', description: 'Wire, 센서 데이터 읽기', project: '온습도 모니터' },
      { day: 9, title: 'OLED 디스플레이', duration: '45분', description: 'Adafruit_SSD1306', project: 'OLED Hello World' },
      { day: 10, title: 'OLED에 센서 데이터 표시', duration: '50분', description: '센서 + 디스플레이 연동', project: '온습도 디스플레이' },
      { day: 11, title: 'WiFi 연결', duration: '40분', description: 'WiFi.begin, Station 모드', project: 'WiFi 연결 테스트' },
      { day: 12, title: '웹서버 기초', duration: '45분', description: 'WebServer.h', project: 'Hello World 웹서버' },
      { day: 13, title: '웹으로 LED 제어', duration: '50분', description: 'HTTP 라우팅', project: '웹 LED 제어' },
      { day: 14, title: '웹에 센서 데이터 표시', duration: '55분', description: 'JSON API, AJAX', project: '센서 데이터 API' },
      { day: 15, title: '초급 종합 프로젝트', duration: '90분', description: '모든 개념 통합', project: 'IoT 환경 모니터 v1' },
    ]
  },
  'intermediate': {
    id: 'intermediate',
    title: 'ESP32 Arduino 중급',
    subtitle: 'WiFi AP & LoRa 통신 (30일)',
    icon: '📡',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-500',
    days: 30,
    startDay: 16,
    description: 'WiFi AP 모드, WebSocket 실시간 통신, LoRa 장거리 통신, 데이터 로깅까지!',
    features: ['WiFi AP 모드', 'WebSocket', 'LoRa 통신', 'SPIFFS/LittleFS', 'SD 카드 로깅'],
    lessons: [
      { day: 16, title: 'WiFi AP 모드 기초', duration: '40분', description: 'WiFi.softAP', project: '핫스팟 생성' },
      { day: 17, title: 'AP 모드 웹서버', duration: '45분', description: 'AP + WebServer', project: 'AP 설정 페이지' },
      { day: 18, title: '캡티브 포털', duration: '50분', description: 'DNSServer', project: '자동 설정 페이지' },
      { day: 19, title: 'SPIFFS 파일 시스템', duration: '45분', description: 'SPIFFS.h', project: '파일 저장' },
      { day: 20, title: 'SPIFFS 웹 페이지 저장', duration: '50분', description: 'serveStatic', project: 'HTML/CSS 파일 서빙' },
      { day: 21, title: 'LittleFS 마이그레이션', duration: '45분', description: 'LittleFS.h', project: 'LittleFS 파일 시스템' },
      { day: 22, title: '설정 파일 관리', duration: '45분', description: 'ArduinoJson', project: 'JSON 설정 저장' },
      { day: 23, title: 'WebSocket 기초', duration: '50분', description: 'WebSocketsServer', project: '실시간 통신' },
      { day: 24, title: 'WebSocket LED 제어', duration: '55분', description: '실시간 동기화', project: '실시간 LED 제어' },
      { day: 25, title: 'WebSocket 센서 모니터', duration: '55분', description: 'Chart.js', project: '실시간 센서 대시보드' },
      { day: 26, title: 'LoRa 모듈 기초', duration: '45분', description: 'UART2, E32/E220', project: 'LoRa 초기화' },
      { day: 27, title: 'LoRa 파라미터 설정', duration: '50분', description: 'AT 명령어', project: 'LoRa 설정 프로그램' },
      { day: 28, title: 'LoRa 거리 테스트', duration: '50분', description: '패킷 손실률', project: 'LoRa 범위 측정' },
      { day: 29, title: 'LoRa 문자열 통신', duration: '45분', description: '메시지 송수신', project: '텍스트 메시지 송수신' },
      { day: 30, title: 'LoRa 구조체 전송', duration: '50분', description: 'packed struct', project: '센서 데이터 패킷' },
      { day: 31, title: 'LoRa ACK 시스템', duration: '50분', description: '신뢰성 통신', project: '신뢰성 있는 전송' },
      { day: 32, title: 'LoRa 센서 노드', duration: '55분', description: '원격 센서', project: '원격 센서 노드' },
      { day: 33, title: 'LoRa 게이트웨이', duration: '55분', description: 'LoRa-WiFi 브릿지', project: 'LoRa-WiFi 브릿지' },
      { day: 34, title: 'LoRa 브로드캐스트', duration: '50분', description: '일대다 통신', project: '일대다 통신' },
      { day: 35, title: 'LoRa 중계기', duration: '55분', description: 'TTL, 메시', project: '메시 네트워크 기초' },
      { day: 36, title: 'EEPROM 기초', duration: '40분', description: 'EEPROM.h', project: '데이터 영구 저장' },
      { day: 37, title: 'Preferences 라이브러리', duration: '45분', description: 'NVS', project: 'NVS 설정 저장' },
      { day: 38, title: '자동 WiFi 연결', duration: '50분', description: '저장된 WiFi', project: '저장된 WiFi 자동 연결' },
      { day: 39, title: 'SD 카드 기초', duration: '45분', description: 'SD.h', project: 'SD 카드 읽기/쓰기' },
      { day: 40, title: 'SD 카드 데이터 로깅', duration: '50분', description: 'CSV 저장', project: '센서 데이터 CSV 저장' },
      { day: 41, title: 'NTP 시간 동기화', duration: '40분', description: 'configTime', project: '인터넷 시간 연동' },
      { day: 42, title: '시간 기반 로깅', duration: '50분', description: 'ISO 8601', project: '타임스탬프 로그' },
      { day: 43, title: '중급 종합 프로젝트 1', duration: '60분', description: '센서/웹', project: 'IoT 환경 모니터 v2 - 센서/웹' },
      { day: 44, title: '중급 종합 프로젝트 2', duration: '60분', description: 'LoRa', project: 'IoT 환경 모니터 v2 - LoRa' },
      { day: 45, title: '중급 종합 프로젝트 3', duration: '90분', description: '통합', project: 'IoT 환경 모니터 v2 - 통합' },
    ]
  },
  'advanced': {
    id: 'advanced',
    title: 'ESP32 Arduino 고급',
    subtitle: '클라우드 & FreeRTOS (45일)',
    icon: '🚀',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-500',
    days: 45,
    startDay: 46,
    description: 'MQTT, Firebase, OTA 업데이트, FreeRTOS 멀티태스킹, Home Assistant 연동까지!',
    features: ['MQTT', 'Firebase', 'OTA 업데이트', 'FreeRTOS', 'Home Assistant'],
    lessons: [
      { day: 46, title: 'MQTT 기초', duration: '50분', description: 'PubSubClient', project: 'MQTT 연결' },
      { day: 47, title: 'MQTT 발행/구독', duration: '50분', description: 'Pub/Sub', project: 'Pub/Sub 통신' },
      { day: 48, title: 'MQTT 센서 모니터', duration: '55분', description: 'JSON 발행', project: 'MQTT 센서 대시보드' },
      { day: 49, title: 'Firebase 소개', duration: '50분', description: 'Firebase_ESP_Client', project: 'Firebase 프로젝트 설정' },
      { day: 50, title: 'Firebase Realtime Database', duration: '55분', description: 'RTDB', project: '클라우드 데이터 저장' },
      { day: 51, title: 'Firebase 스트림', duration: '55분', description: '실시간 동기화', project: '실시간 데이터 동기화' },
      { day: 52, title: 'Firebase 히스토리 저장', duration: '50분', description: 'push()', project: '시계열 데이터 저장' },
      { day: 53, title: 'ThingSpeak 소개', duration: '45분', description: 'ThingSpeak', project: 'ThingSpeak 채널' },
      { day: 54, title: 'ThingSpeak 그래프', duration: '50분', description: '시각화', project: '데이터 시각화' },
      { day: 55, title: 'Blynk 앱 연동', duration: '50분', description: 'Blynk', project: '스마트폰 제어' },
      { day: 56, title: 'HTTPS 클라이언트', duration: '50분', description: 'WiFiClientSecure', project: '보안 API 호출' },
      { day: 57, title: 'HTTPS POST', duration: '50분', description: 'JSON POST', project: '보안 데이터 전송' },
      { day: 58, title: 'API 인증', duration: '50분', description: 'Bearer Token', project: 'Bearer Token 인증' },
      { day: 59, title: 'ArduinoOTA 기초', duration: '45분', description: 'OTA', project: '무선 펌웨어 업데이트' },
      { day: 60, title: '웹 기반 OTA', duration: '50분', description: 'HTTP OTA', project: 'HTTP OTA 업데이트' },
      { day: 61, title: '자동 OTA 업데이트', duration: '50분', description: '서버 다운로드', project: '서버에서 펌웨어 다운로드' },
      { day: 62, title: '버전 관리', duration: '45분', description: 'SemVer', project: '펌웨어 버전 시스템' },
      { day: 63, title: 'ESP-NOW 기초', duration: '50분', description: 'esp_now.h', project: 'P2P 통신' },
      { day: 64, title: 'ESP-NOW 센서 네트워크', duration: '55분', description: '다중 노드', project: '다중 노드 통신' },
      { day: 65, title: 'ESP-NOW 브로드캐스트', duration: '50분', description: '일대다', project: '일대다 동기화' },
      { day: 66, title: '딥슬립 기초', duration: '45분', description: 'esp_deep_sleep', project: '저전력 모드' },
      { day: 67, title: '외부 인터럽트 깨우기', duration: '50분', description: 'ext0_wakeup', project: '버튼으로 슬립 해제' },
      { day: 68, title: '저전력 센서 노드', duration: '55분', description: '배터리 구동', project: '배터리 구동 센서' },
      { day: 69, title: 'FreeRTOS 태스크', duration: '50분', description: 'xTaskCreate', project: '멀티태스킹' },
      { day: 70, title: '세마포어와 뮤텍스', duration: '55분', description: '동기화', project: '리소스 동기화' },
      { day: 71, title: 'FreeRTOS 큐', duration: '50분', description: 'xQueueCreate', project: '태스크 간 통신' },
      { day: 72, title: 'FreeRTOS 타이머', duration: '45분', description: 'xTimerCreate', project: '소프트웨어 타이머' },
      { day: 73, title: '멀티코어 기초', duration: '55분', description: 'PinnedToCore', project: '듀얼 코어 활용' },
      { day: 74, title: '성능 최적화', duration: '50분', description: 'Heap, Stack', project: '시스템 모니터링' },
      { day: 75, title: '워치독 타이머', duration: '45분', description: 'task_wdt', project: '시스템 안정성' },
      { day: 76, title: 'Home Assistant 소개', duration: '50분', description: 'MQTT Discovery', project: 'MQTT Discovery' },
      { day: 77, title: 'HA 센서 엔티티', duration: '55분', description: 'sensor', project: '다중 센서 등록' },
      { day: 78, title: 'HA 스위치 엔티티', duration: '50분', description: 'switch', project: 'LED 원격 제어' },
      { day: 79, title: 'HA 자동화', duration: '50분', description: 'Automation', project: '자동화 규칙 연동' },
      { day: 80, title: 'HA 통합 대시보드', duration: '55분', description: 'Lovelace', project: 'Lovelace 카드' },
      { day: 81, title: '최종 프로젝트 1', duration: '60분', description: '센서 수집', project: '스마트홈 허브 - 센서 수집' },
      { day: 82, title: '최종 프로젝트 2', duration: '60분', description: '통신', project: '스마트홈 허브 - 통신' },
      { day: 83, title: '최종 프로젝트 3', duration: '90분', description: '웹 UI', project: '스마트홈 허브 - 웹 UI' },
      { day: 84, title: '최종 프로젝트 4', duration: '60분', description: '데이터 저장', project: '스마트홈 허브 - 데이터 저장' },
      { day: 85, title: '최종 프로젝트 5', duration: '90분', description: '통합', project: '스마트홈 허브 - 통합' },
      { day: 86, title: '코드 리팩토링', duration: '60분', description: '품질 개선', project: '코드 품질 개선' },
      { day: 87, title: '테스트 및 디버깅', duration: '60분', description: '검증', project: '시스템 검증' },
      { day: 88, title: '문서화', duration: '45분', description: 'README', project: '사용자 매뉴얼' },
      { day: 89, title: 'PCB 설계 기초', duration: '50분', description: 'KiCad', project: '회로도 및 PCB' },
      { day: 90, title: '과정 완료 및 다음 단계', duration: '30분', description: '수료', project: '최종 리뷰' },
    ]
  }
};

// URL 파라미터 매핑
const levelParamMap: { [key: string]: string } = {
  'beginner': 'beginner',
  'intermediate': 'intermediate',
  'advanced': 'advanced',
  '초급': 'beginner',
  '중급': 'intermediate',
  '고급': 'advanced'
};

export default function ESP32LevelPage() {
  const router = useRouter();
  const params = useParams();
  const levelParam = decodeURIComponent(params.level as string);
  const levelKey = levelParamMap[levelParam] || levelParam;
  const levelInfo = levelData[levelKey];

  const [userName, setUserName] = useState('사용자');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }

    // 완료된 레슨 로드
    const saved = localStorage.getItem(`c-esp32-${levelKey}-completed`);
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, [levelKey]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!levelInfo) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">레벨을 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-4">beginner, intermediate, advanced 중 선택해주세요.</p>
          <Link href="/courses" className="text-blue-600 hover:underline">
            강좌 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const progress = levelInfo.lessons.length > 0
    ? Math.round((completedDays.filter(d => levelInfo.lessons.some(l => l.day === d)).length / levelInfo.lessons.length) * 100)
    : 0;

  const levelNames: { [key: string]: string } = {
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급'
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">UTTEC Edu</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/courses" className="text-gray-600 hover:text-gray-900 transition-colors">
                전체 강좌
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-700">C 언어 (ESP32)</span>
            </nav>

            <div className="flex items-center gap-4">
              <span className="text-gray-600 hidden sm:block">안녕하세요, {userName}님</span>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <nav className="px-4 py-4 space-y-3">
            <Link href="/courses" className="block text-gray-600 hover:text-gray-900">
              전체 강좌
            </Link>
            <button onClick={handleLogout} className="block text-red-600 hover:text-red-700">
              로그아웃
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/courses" className="hover:text-gray-700">강좌</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/course/coding/c-esp32" className="hover:text-gray-700">C 언어 (ESP32)</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{levelNames[levelKey]}</span>
        </div>

        {/* Level Header */}
        <div className={`bg-gradient-to-r ${levelInfo.color} rounded-2xl p-8 text-white mb-8`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{levelInfo.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{levelInfo.title}</h1>
              <p className="text-white/80">{levelInfo.subtitle}</p>
            </div>
          </div>
          <p className="text-white/90 mb-6 max-w-2xl">{levelInfo.description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {levelInfo.features.map((feature, index) => (
              <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {feature}
              </span>
            ))}
          </div>

          {/* Progress */}
          <div className="bg-white/20 rounded-full h-3 w-full max-w-md">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/80 text-sm mt-2">진행률: {progress}% ({completedDays.length}/{levelInfo.lessons.length} 완료)</p>
        </div>

        {/* Lessons Grid */}
        <div className="grid gap-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2">레슨 목록</h2>

          {levelInfo.lessons.map((lesson, index) => {
            const isCompleted = completedDays.includes(lesson.day);

            return (
              <Link
                key={lesson.day}
                href={`/course/coding/c-esp32/${levelKey}/lesson/${lesson.day}`}
                className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-l-4 ${
                  isCompleted ? 'border-green-500' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isCompleted ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <span className="text-lg font-bold text-gray-500">{lesson.day}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Day {lesson.day}: {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-500">{lesson.description}</p>
                      <p className="text-sm text-blue-600 mt-1">프로젝트: {lesson.project}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{lesson.duration}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/course/coding/c-esp32"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            레벨 선택으로
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500">
          <p>© 2025 UTTEC Edu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
