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
  description: string;
  features: string[];
  lessons: { day: number; title: string; duration: string; description: string; app: string }[];
}} = {
  '초급': {
    id: 'beginner',
    title: 'UTTEC Shield 초급',
    subtitle: 'GPIO & 센서 기초 (15일)',
    icon: '🛡️',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-500',
    days: 15,
    description: 'Raspberry Pi GPIO 제어, 센서 읽기, Flask 웹 기초까지. 하드웨어 제어의 첫 걸음!',
    features: ['GPIO 제어', 'Active LOW', 'I2C 센서', 'OLED 디스플레이', 'Flask 웹서버'],
    lessons: [
      { day: 1, title: '환경설정 및 Hello World', duration: '30분', description: 'RPi 환경 설정, Python 기초', app: '시스템 정보 출력 프로그램' },
      { day: 2, title: 'LED 켜기/끄기', duration: '35분', description: 'GPIO 출력, Active LOW 이해', app: 'LED 제어 프로그램' },
      { day: 3, title: '신호등 만들기', duration: '40분', description: '순차 제어, time.sleep()', app: '3색 신호등' },
      { day: 4, title: '버튼 입력 처리', duration: '40분', description: 'GPIO 입력, 풀업 저항', app: '버튼으로 LED 토글' },
      { day: 5, title: '버튼 인터럽트와 부저', duration: '45분', description: '인터럽트, 이벤트 기반 프로그래밍', app: '도어벨 시스템' },
      { day: 6, title: 'I2C 통신과 장치 스캔', duration: '40분', description: 'I2C 프로토콜, 버스 스캔', app: 'I2C 장치 탐지기' },
      { day: 7, title: '온습도 센서 (AHT20)', duration: '45분', description: 'I2C 센서 데이터 읽기', app: '온습도 모니터' },
      { day: 8, title: 'OLED 디스플레이 기초', duration: '45분', description: 'I2C 디스플레이, 텍스트 출력', app: 'OLED Hello World' },
      { day: 9, title: 'OLED에 센서 데이터 표시', duration: '50분', description: '센서 + 디스플레이 연동', app: '온습도 디스플레이' },
      { day: 10, title: 'NeoPixel LED 기초', duration: '45분', description: 'WS2812 제어, RGB 색상', app: '무지개 LED' },
      { day: 11, title: 'Flask 웹서버 기초', duration: '40분', description: 'HTTP, Flask 기본', app: 'Hello World 웹서버' },
      { day: 12, title: 'HTML/CSS 기초', duration: '45분', description: '프론트엔드 기초', app: 'LED 제어 UI 디자인' },
      { day: 13, title: 'JavaScript와 AJAX', duration: '50분', description: 'DOM 조작, 비동기 통신', app: '동적 LED 제어' },
      { day: 14, title: '웹으로 LED 제어', duration: '55분', description: 'RESTful API, 하드웨어 연동', app: '웹 LED 제어 시스템' },
      { day: 15, title: '초급 종합 프로젝트', duration: '90분', description: '모든 개념 통합 프로젝트', app: '스마트 환경 모니터 v1' },
    ]
  },
  '중급': {
    id: 'intermediate',
    title: 'UTTEC Shield 중급',
    subtitle: 'PWM & ESP32 WiFi AP (30일)',
    icon: '📡',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-500',
    days: 30,
    description: 'PWM 제어, ESP32-C3 WiFi AP 연동, 데이터베이스까지. 스마트폰으로 제어하는 IoT 시스템!',
    features: ['PWM 제어', 'ESP32 WiFi AP', 'UART 통신', 'SQLite DB', '데이터 로깅'],
    lessons: [
      { day: 16, title: 'PWM 기초 - LED 밝기 조절', duration: '40분', description: '소프트웨어 PWM, 듀티 사이클', app: 'LED 페이더' },
      { day: 17, title: '스피커 톤 생성', duration: '45분', description: 'PWM 주파수, 음계', app: '음계 연주기' },
      { day: 18, title: 'NeoPixel 고급 효과', duration: '50분', description: '애니메이션, 효과', app: 'LED 애니메이션' },
      { day: 19, title: '온도 기반 LED 표시', duration: '45분', description: '센서 + LED 연동', app: '온도 시각화' },
      { day: 20, title: '알람 시스템', duration: '50분', description: '임계값, 경고', app: '온도 알람' },
      { day: 21, title: 'OLED 그래픽', duration: '50분', description: 'Pillow, 도형 그리기', app: '온도 게이지' },
      { day: 22, title: 'OLED 멀티 화면', duration: '45분', description: '화면 전환', app: '화면 전환 시스템' },
      { day: 23, title: 'UART 통신 기초', duration: '45분', description: 'pyserial, 시리얼 통신', app: '시리얼 통신 테스트' },
      { day: 24, title: 'ESP32-C3 Arduino 환경설정', duration: '50분', description: 'Arduino IDE, ESP32', app: 'ESP32 LED Blink' },
      { day: 25, title: 'ESP32 WiFi AP 모드', duration: '55분', description: 'WiFi 핫스팟', app: 'WiFi 핫스팟' },
      { day: 26, title: 'ESP32 웹서버', duration: '55분', description: 'WebServer', app: 'ESP32 미니 웹서버' },
      { day: 27, title: 'RPi-ESP32 명령 프로토콜', duration: '50분', description: 'JSON 프로토콜', app: '통신 프로토콜 설계' },
      { day: 28, title: 'ESP32 AP + RPi 연동 (1)', duration: '60분', description: '3-Tier 아키텍처', app: '3-Tier 아키텍처' },
      { day: 29, title: 'ESP32 AP + RPi 연동 (2)', duration: '60분', description: '실시간 데이터', app: '실시간 데이터 전송' },
      { day: 30, title: '모바일 친화적 UI', duration: '50분', description: '반응형 디자인', app: '터치 UI' },
      { day: 31, title: 'PC 브라우저 연동', duration: '55분', description: 'Chart.js 대시보드', app: '대시보드' },
      { day: 32, title: '다중 클라이언트 처리', duration: '50분', description: '상태 동기화', app: '멀티 클라이언트' },
      { day: 33, title: 'SQLite 데이터베이스', duration: '50분', description: 'sqlite3, CRUD', app: '센서 DB' },
      { day: 34, title: '센서 데이터 로깅', duration: '50분', description: '백그라운드 스레드', app: '자동 로거' },
      { day: 35, title: '데이터 조회 API', duration: '45분', description: 'History API', app: 'History API' },
      { day: 36, title: '웹 그래프 표시', duration: '55분', description: 'Chart.js 시계열', app: '데이터 시각화' },
      { day: 37, title: '이벤트 로깅', duration: '45분', description: '이벤트 기록', app: '이벤트 히스토리' },
      { day: 38, title: '설정 저장/불러오기', duration: '40분', description: 'config.json', app: '설정 관리자' },
      { day: 39, title: '데이터 내보내기', duration: '45분', description: 'CSV 익스포트', app: 'CSV 익스포터' },
      { day: 40, title: '중급 종합 프로젝트 (1)', duration: '60분', description: '설계', app: '스마트 환경 모니터 v2 - 설계' },
      { day: 41, title: '중급 종합 프로젝트 (2)', duration: '90분', description: '백엔드', app: '스마트 환경 모니터 v2 - 백엔드' },
      { day: 42, title: '중급 종합 프로젝트 (3)', duration: '90분', description: '프론트엔드', app: '스마트 환경 모니터 v2 - 프론트' },
      { day: 43, title: '중급 종합 프로젝트 (4)', duration: '60분', description: 'ESP32', app: '스마트 환경 모니터 v2 - ESP32' },
      { day: 44, title: '중급 종합 프로젝트 (5)', duration: '90분', description: '통합', app: '스마트 환경 모니터 v2 - 통합' },
      { day: 45, title: '중급 종합 프로젝트 (6)', duration: '60분', description: '완성', app: '스마트 환경 모니터 v2 - 완성' },
    ]
  },
  '고급': {
    id: 'advanced',
    title: 'UTTEC Shield 고급',
    subtitle: '실시간 통신 & 클라우드 (45일)',
    icon: '🚀',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-500',
    days: 45,
    description: 'WebSocket 실시간 통신, 보안 인증, MQTT, 클라우드 연동까지. 프로 IoT 개발자로 도약!',
    features: ['WebSocket', '사용자 인증', 'MQTT', 'Home Assistant', '클라우드 연동'],
    lessons: [
      { day: 46, title: 'WebSocket 기초', duration: '50분', description: 'Flask-SocketIO', app: '실시간 채팅' },
      { day: 47, title: 'WebSocket 센서 푸시', duration: '50분', description: '서버 푸시', app: '실시간 센서 모니터' },
      { day: 48, title: 'WebSocket LED 동기화', duration: '50분', description: '상태 동기화', app: 'LED 상태 동기화' },
      { day: 49, title: 'ESP32 WebSocket 서버', duration: '55분', description: 'ArduinoWebSockets', app: 'ESP32 실시간 통신' },
      { day: 50, title: 'ESP32-RPi WebSocket 브릿지', duration: '60분', description: 'WS 브릿지', app: 'WebSocket 브릿지' },
      { day: 51, title: 'APScheduler 스케줄링', duration: '45분', description: '주기적 작업', app: '자동화 스케줄러' },
      { day: 52, title: 'IF-THEN 자동화', duration: '50분', description: '규칙 엔진', app: '시나리오 자동화' },
      { day: 53, title: '매크로 녹화/재생', duration: '50분', description: '매크로 시스템', app: '매크로 시스템' },
      { day: 54, title: '사용자 인증 - 로그인', duration: '50분', description: 'session, 해싱', app: '로그인 시스템' },
      { day: 55, title: '세션 기반 인증', duration: '45분', description: '세션 관리', app: '세션 관리' },
      { day: 56, title: '역할 기반 접근 제어', duration: '50분', description: 'RBAC', app: '관리자/사용자 권한' },
      { day: 57, title: 'HTTPS 적용', duration: '45분', description: 'SSL 인증서', app: 'SSL 인증서 설정' },
      { day: 58, title: 'API 토큰 인증', duration: '50분', description: 'API Key', app: 'API Key 시스템' },
      { day: 59, title: '입력 검증과 보안', duration: '45분', description: '보안 강화', app: '보안 강화' },
      { day: 60, title: '감사 로그', duration: '45분', description: '보안 감사', app: '보안 감사' },
      { day: 61, title: '하드웨어 PWM (pigpio)', duration: '50분', description: '정밀 PWM', app: '정밀 PWM 제어' },
      { day: 62, title: 'WAV 파일 재생', duration: '45분', description: 'pygame.mixer', app: '사운드 플레이어' },
      { day: 63, title: '멜로디 작곡기', duration: '50분', description: 'RTTTL', app: 'RTTTL 플레이어' },
      { day: 64, title: 'NeoPixel 고급 애니메이션', duration: '55분', description: 'LED 쇼', app: 'LED 쇼' },
      { day: 65, title: 'OLED 애니메이션', duration: '50분', description: '아날로그 시계', app: '아날로그 시계' },
      { day: 66, title: '센서 캘리브레이션', duration: '45분', description: '보정', app: '정밀 센서 보정' },
      { day: 67, title: '멀티스레딩', duration: '50분', description: 'threading', app: '병렬 작업 처리' },
      { day: 68, title: 'asyncio 비동기', duration: '50분', description: 'async/await', app: '비동기 센서 읽기' },
      { day: 69, title: '시스템 모니터링', duration: '50분', description: 'CPU, 메모리', app: 'RPi 상태 모니터' },
      { day: 70, title: 'ESP32 Station 모드', duration: '50분', description: '인터넷 연결', app: '인터넷 연결' },
      { day: 71, title: '날씨 API 연동', duration: '50분', description: 'OpenWeatherMap', app: '날씨 정보 표시' },
      { day: 72, title: 'NTP 시간 동기화', duration: '40분', description: 'ntplib', app: '정확한 시계' },
      { day: 73, title: 'MQTT 기초', duration: '50분', description: 'paho-mqtt', app: 'MQTT 클라이언트' },
      { day: 74, title: 'MQTT 센서 발행', duration: '50분', description: 'IoT 센서 노드', app: 'IoT 센서 노드' },
      { day: 75, title: 'MQTT 장치 제어', duration: '50분', description: 'MQTT 제어', app: 'MQTT LED 제어' },
      { day: 76, title: 'Home Assistant 연동', duration: '55분', description: 'HA 통합', app: 'HA 통합' },
      { day: 77, title: '클라우드 데이터 저장', duration: '55분', description: 'Firebase', app: 'Firebase 연동' },
      { day: 78, title: 'PWA 모바일 앱', duration: '55분', description: 'Service Worker', app: '설치 가능 웹앱' },
      { day: 79, title: '텔레그램 봇', duration: '50분', description: '알림 봇', app: '알림 봇' },
      { day: 80, title: '음성 제어', duration: '55분', description: 'SpeechRecognition', app: '음성 명령' },
      { day: 81, title: '최종 프로젝트 기획', duration: '60분', description: '기획', app: '스마트홈 컨트롤러 - 기획' },
      { day: 82, title: '최종 프로젝트 설계', duration: '60분', description: '설계', app: '스마트홈 컨트롤러 - 설계' },
      { day: 83, title: '최종 프로젝트 백엔드 (1)', duration: '90분', description: '코어 백엔드', app: '스마트홈 - 코어 백엔드' },
      { day: 84, title: '최종 프로젝트 백엔드 (2)', duration: '90분', description: '장치 제어', app: '스마트홈 - 장치 제어' },
      { day: 85, title: '최종 프로젝트 프론트 (1)', duration: '90분', description: '대시보드', app: '스마트홈 - 대시보드' },
      { day: 86, title: '최종 프로젝트 프론트 (2)', duration: '90분', description: '설정/자동화', app: '스마트홈 - 설정/자동화' },
      { day: 87, title: '최종 프로젝트 ESP32', duration: '60분', description: 'ESP32 연동', app: '스마트홈 - ESP32' },
      { day: 88, title: '최종 프로젝트 통합', duration: '90분', description: '전체 통합', app: '스마트홈 - 통합' },
      { day: 89, title: '최종 프로젝트 테스트', duration: '60분', description: 'pytest', app: '스마트홈 - 테스트' },
      { day: 90, title: '최종 프로젝트 완성', duration: '60분', description: '문서화', app: '스마트홈 컨트롤러 - 완성' },
    ]
  }
};

export default function PythonUTTECLevelPage() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);
  const levelInfo = levelData[level];

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
    const saved = localStorage.getItem(`python-uttec-${level}-completed`);
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, [level]);

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
          <p className="text-gray-600 mb-4">초급, 중급, 고급 중 선택해주세요.</p>
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">강좌 목록</Link>
              <Link href="/dashboard" className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">내 강의</Link>
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-700">
                <span className="text-gray-300">안녕하세요, {userName}님!</span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white transition px-3 py-2">로그아웃</button>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/courses" className="block text-gray-300 hover:text-white px-3 py-2">강좌 목록</Link>
              <Link href="/dashboard" className="block bg-yellow-400 text-slate-900 px-3 py-2 rounded-lg font-semibold">내 강의</Link>
            </div>
          )}
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/courses" className="hover:text-gray-700">강좌 목록</Link>
          <ChevronRight className="w-4 h-4" />
          <span>코딩</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Python (UTTEC Shield) - {level}</span>
        </div>

        {/* 코스 헤더 */}
        <div className={`bg-gradient-to-r ${levelInfo.color} rounded-2xl p-8 mb-8 text-white`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{levelInfo.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{levelInfo.title}</h1>
              <p className="text-white/80">{levelInfo.subtitle}</p>
            </div>
          </div>
          <p className="text-lg text-white/90 mb-6">{levelInfo.description}</p>

          {/* 특징 태그 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {levelInfo.features.map((feature, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {feature}
              </span>
            ))}
          </div>

          {/* 진행률 */}
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>학습 진행률</span>
              <span>{progress}% ({completedDays.filter(d => levelInfo.lessons.some(l => l.day === d)).length}/{levelInfo.lessons.length}일)</span>
            </div>
            <div className="h-3 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 레벨 선택 탭 */}
        <div className="flex gap-2 mb-6">
          {Object.keys(levelData).map((lvl) => (
            <Link
              key={lvl}
              href={`/course/coding/python-uttec/${lvl}`}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                lvl === level
                  ? `${levelData[lvl].bgColor} text-white`
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {levelData[lvl].icon} {lvl} ({levelData[lvl].days}일)
            </Link>
          ))}
        </div>

        {/* 하드웨어 안내 */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            UTTEC Shield 하드웨어
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-purple-800">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              LED x3 (Active LOW)
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              버튼, 부저
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              AHT20, OLED
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              ESP32-C3 WiFi
            </div>
          </div>
        </div>

        {/* 학습 방법 안내 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-yellow-900 mb-2">📚 학습 방법</h3>
          <ol className="text-yellow-800 text-sm space-y-1">
            <li>1. 각 Day의 프롬프트를 Claude/Gemini/ChatGPT에 입력 (포트설명서 첨부 권장)</li>
            <li>2. AI가 생성한 코드를 <code className="bg-yellow-100 px-1 rounded">===== 파일: xxx =====</code> 구분자로 파일별 저장</li>
            <li>3. Raspberry Pi에서 <code className="bg-yellow-100 px-1 rounded">python3 main.py</code> 실행</li>
            <li>4. 코드를 이해하고 수정해보기</li>
          </ol>
        </div>

        {/* 강의 목록 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className={`p-4 bg-gradient-to-r ${levelInfo.color}`}>
            <h2 className="font-bold text-white flex items-center gap-2">
              <Play className="w-5 h-5" />
              {level} 강의 목록 ({levelInfo.lessons.length}일)
            </h2>
          </div>
          <div className="divide-y">
            {levelInfo.lessons.map((lesson) => {
              const isCompleted = completedDays.includes(lesson.day);
              return (
                <Link
                  key={lesson.day}
                  href={`/course/coding/python-uttec/${level}/lesson/${lesson.day}`}
                  className="block p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : `bg-gradient-to-br ${levelInfo.color} text-white`
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="font-bold text-sm">{lesson.day}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          Day {lesson.day}: {lesson.title}
                        </h3>
                        {isCompleted && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            완료
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{lesson.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Code className="w-3 h-3" />
                          {lesson.app}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Edu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
