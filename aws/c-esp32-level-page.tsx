'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  Brain,
  Menu,
  X,
  Play,
  CheckCircle,
  Clock,
  ChevronRight,
  ChevronLeft,
  Video,
  Cpu,
  Download,
  ExternalLink
} from 'lucide-react';

// 레벨별 코스 데이터
const courseDataByLevel: Record<string, any> = {
  '초급': {
    title: 'ESP32 Arduino IoT',
    level: '초급',
    subtitle: 'ESP32 마이크로컨트롤러를 활용한 Arduino 프로그래밍 입문',
    icon: '🔌',
    liveInfo: {
      schedule: '매주 화요일 8PM | AI 최신 트렌드 & 실습',
    },
    announcement: {
      title: 'Day 1-15 전체 강의 업로드 완료!',
      description: '지금 바로 학습을 시작하세요! 🚀',
    },
    progress: {
      completed: 0,
      total: 15,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 개발환경 및 기본 출력 (Day 1-3)',
        subtitle: 'ESP32 개발환경 설정부터 LED 제어까지 - Arduino 기초 다지기',
        icon: '📚',
        lessons: [
          { day: 1, title: 'ESP32 소개와 개발환경 설정', description: 'ESP32 특징 이해 | Arduino IDE 설치 | Serial Monitor로 Hello ESP32 출력', hasQuiz: true, completed: false },
          { day: 2, title: 'LED 제어하기 - digitalWrite', description: 'GPIO 개념 | pinMode() | 빨강/노랑/파랑 LED 순차 점등 | 신호등 패턴', hasQuiz: true, completed: false },
          { day: 3, title: 'LED 밝기 제어 - PWM', description: 'PWM 개념 | analogWrite() | LED 페이드 인/아웃 | 숨쉬기 효과', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 입력과 소리 (Day 4-6)',
        subtitle: '스위치 입력, 부저 제어, 통합 실습',
        icon: '🎮',
        lessons: [
          { day: 4, title: '스위치 입력 - digitalRead', description: '디지털 입력 | 풀업/풀다운 저항 | 버튼으로 LED 제어', hasQuiz: true, completed: false },
          { day: 5, title: '부저 제어 - tone()', description: '주파수와 음계 | 비프음 출력 | 도레미파솔라시도 연주', hasQuiz: true, completed: false },
          { day: 6, title: '입출력 통합 실습', description: '이벤트 처리 | 상태 머신 개념 | 버튼+LED+부저 연동', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 3,
        title: 'Part 3: I2C 통신과 센서 (Day 7-9)',
        subtitle: 'OLED 디스플레이와 온습도 센서',
        icon: '📟',
        lessons: [
          { day: 7, title: 'I2C 통신과 OLED 디스플레이', description: 'I2C 통신 원리 | SDA/SCL | OLED 텍스트 출력', hasQuiz: true, completed: false },
          { day: 8, title: 'OLED 그래픽과 애니메이션', description: '좌표계 | 원/사각형/선 그리기 | 움직이는 공 애니메이션', hasQuiz: true, completed: false },
          { day: 9, title: '온습도 센서 (AHT20)', description: '온습도 센서 원리 | AHT20 데이터 읽기 | OLED에 실시간 표시', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 4,
        title: 'Part 4: Wi-Fi 기초 (Day 10-12)',
        subtitle: 'Wi-Fi 연결부터 웹 서버까지',
        icon: '📡',
        lessons: [
          { day: 10, title: 'Wi-Fi 연결하기', description: 'Wi-Fi 개념 | Station/AP 모드 | IP 주소 확인 | 연결 상태 LED 표시', hasQuiz: true, completed: false },
          { day: 11, title: '간단한 웹 서버 만들기', description: 'HTTP 프로토콜 | WebServer 라이브러리 | 웹 페이지 서빙', hasQuiz: true, completed: false },
          { day: 12, title: 'HTML 기초와 웹 페이지 꾸미기', description: 'HTML 태그 | CSS 기초 | 반응형 디자인 | 센서 데이터 카드', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 5,
        title: 'Part 5: 웹 제어와 종합 프로젝트 (Day 13-15)',
        subtitle: '웹으로 하드웨어 제어하고 종합 프로젝트 완성',
        icon: '🚀',
        lessons: [
          { day: 13, title: '웹으로 LED 제어하기', description: 'GET 요청 | URL 파라미터 | 웹 버튼으로 LED 켜고 끄기', hasQuiz: true, completed: false },
          { day: 14, title: '자동 새로고침과 실시간 데이터', description: 'meta refresh | 5초마다 자동 갱신 | 온도 경고 기능', hasQuiz: true, completed: false },
          { day: 15, title: '종합 프로젝트 - 스마트 환경 모니터', description: '온습도 측정 + OLED + Wi-Fi 웹 모니터링 + LED 경고 시스템', hasQuiz: true, completed: false },
        ],
      },
    ],
    nextLevel: '중급',
  },
  '중급': {
    title: 'C 언어 (ESP32)',
    level: '중급',
    subtitle: '센서 연동과 통신 프로토콜 - ESP32 활용 심화',
    icon: '🔌',
    liveInfo: {
      schedule: '매주 목요일 8PM | 실전 프로젝트 실습',
    },
    announcement: {
      title: '중급 과정 준비 중!',
      description: '곧 업로드됩니다 📚',
    },
    progress: {
      completed: 0,
      total: 10,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1 (Day 1-5)',
        subtitle: '다양한 센서 연동과 데이터 처리',
        icon: '📚',
        lessons: [
          { day: 1, title: '다양한 센서 이해하기', description: '온습도, 조도, 거리 센서 등', hasQuiz: true, completed: false },
          { day: 2, title: 'I2C 심화 - 다중 센서 연동', description: '멀티 디바이스 통신 | 주소 스캔', hasQuiz: true, completed: false },
          { day: 3, title: 'SPI 통신', description: 'SPI 프로토콜 이해 | SD 카드 연동', hasQuiz: true, completed: false },
          { day: 4, title: 'UART 시리얼 통신', description: 'UART 기초 | GPS 모듈 연동', hasQuiz: false, completed: false },
          { day: 5, title: '센서 데이터 필터링', description: '노이즈 제거 | 이동 평균 필터', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2,
        title: 'Part 2 (Day 6-10)',
        subtitle: '클라우드 연동과 실전 프로젝트',
        icon: '🚀',
        lessons: [
          { day: 6, title: 'MQTT 프로토콜', description: 'MQTT 개념 | 브로커 연결', hasQuiz: false, completed: false },
          { day: 7, title: 'ThingSpeak 클라우드', description: '데이터 업로드 | 차트 시각화', hasQuiz: true, completed: false },
          { day: 8, title: 'Firebase 연동', description: 'Realtime DB | 인증', hasQuiz: false, completed: false },
          { day: 9, title: '모바일 앱 연동', description: 'Blynk 앱 | 원격 제어', hasQuiz: false, completed: false },
          { day: 10, title: '종합 프로젝트: 스마트 홈', description: '다중 센서 + 클라우드 + 앱 통합', hasQuiz: false, completed: false },
        ],
      },
    ],
    nextLevel: '고급',
  },
  '고급': {
    title: 'C 언어 (ESP32)',
    level: '고급',
    subtitle: 'FreeRTOS와 실전 프로젝트 - 전문가 과정',
    icon: '🔌',
    liveInfo: {
      schedule: '매주 토요일 2PM | 고급 프로젝트 세미나',
    },
    announcement: {
      title: '고급 과정 준비 중!',
      description: '곧 업로드됩니다 🎯',
    },
    progress: {
      completed: 0,
      total: 10,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1 (Day 1-5)',
        subtitle: 'FreeRTOS 멀티태스킹 마스터',
        icon: '📚',
        lessons: [
          { day: 1, title: 'FreeRTOS 소개', description: 'RTOS 개념 | 태스크와 스케줄링', hasQuiz: true, completed: false },
          { day: 2, title: '태스크 생성과 관리', description: '태스크 우선순위 | 상태 전환', hasQuiz: true, completed: false },
          { day: 3, title: '세마포어와 뮤텍스', description: '동기화 기법 | 공유 자원 관리', hasQuiz: true, completed: false },
          { day: 4, title: '큐와 태스크 통신', description: '메시지 큐 | 이벤트 그룹', hasQuiz: false, completed: false },
          { day: 5, title: '타이머와 인터럽트', description: '소프트웨어 타이머 | ISR 처리', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2,
        title: 'Part 2 (Day 6-10)',
        subtitle: '실전 산업용 프로젝트',
        icon: '🚀',
        lessons: [
          { day: 6, title: '저전력 모드', description: 'Deep Sleep | 배터리 최적화', hasQuiz: false, completed: false },
          { day: 7, title: 'OTA 업데이트', description: '무선 펌웨어 업데이트', hasQuiz: true, completed: false },
          { day: 8, title: '보안 통신', description: 'TLS/SSL | 인증서 관리', hasQuiz: false, completed: false },
          { day: 9, title: '대량 생산 준비', description: '펌웨어 배포 | 품질 테스트', hasQuiz: false, completed: false },
          { day: 10, title: '종합 프로젝트: 산업용 IoT', description: '완성도 높은 상용 제품 개발', hasQuiz: false, completed: false },
        ],
      },
    ],
    nextLevel: null,
  },
};

const levelColors: Record<string, { bg: string; text: string; border: string }> = {
  '초급': { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-400' },
  '중급': { bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-400' },
  '고급': { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-400' },
};

// 레슨 카드 컴포넌트
function LessonCard({ lesson, level }: { lesson: any; level: string }) {
  return (
    <Link
      href={`/course/coding/c-esp32/${level}/lesson/${lesson.day}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:border-blue-300 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              {lesson.completed ? (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <Play className="w-3 h-3 text-gray-500" />
                </div>
              )}
              <span className="text-sm font-medium text-gray-500">Day {lesson.day}</span>
            </div>
            {lesson.hasQuiz && (
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                퀴즈 포함
              </span>
            )}
            {lesson.completed && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                완료
              </span>
            )}
          </div>

          <h4 className="font-semibold text-gray-900 mb-2">{lesson.title}</h4>
          <p className="text-sm text-gray-500 mb-4">{lesson.description}</p>

          <span className="flex items-center gap-2 text-blue-600 font-medium text-sm">
            {lesson.completed ? '다시 학습하기' : '학습 시작하기'}
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// 파트 섹션 컴포넌트
function PartSection({ part, level }: { part: any; level: string }) {
  return (
    <section className="mb-8">
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-5 mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          {part.icon} {part.title}
        </h3>
        <p className="text-yellow-100 text-sm mt-1">{part.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {part.lessons.map((lesson: any) => (
          <LessonCard key={lesson.day} lesson={lesson} level={level} />
        ))}
      </div>
    </section>
  );
}

export default function CodingLevelCoursePage() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);

  const [userName, setUserName] = useState('홍광선');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const courseData = courseDataByLevel[level];

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) {
          setUserName(user.name);
        }
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 레벨입니다</h1>
          <Link href="/courses" className="text-blue-600 hover:underline">
            강좌 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const allCompleted = courseData.progress.percentage === 100;
  const colors = levelColors[level] || levelColors['초급'];

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
              <Link href="/about" className="text-gray-300 hover:text-white transition px-3 py-2">
                소개
              </Link>
              <Link href="/mbti" className="text-gray-300 hover:text-white transition px-3 py-2">
                MBTI
              </Link>
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">
                강좌 목록
              </Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition px-3 py-2">
                FAQ
              </Link>
              <Link
                href="/dashboard"
                className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                내 강의
              </Link>
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-700">
                <span className="text-gray-300">안녕하세요, {userName}님!</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white transition px-3 py-2"
                >
                  로그아웃
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white px-3 py-2">소개</Link>
              <Link href="/mbti" className="block text-gray-300 hover:text-white px-3 py-2">MBTI</Link>
              <Link href="/courses" className="block text-gray-300 hover:text-white px-3 py-2">강좌 목록</Link>
              <Link href="/faq" className="block text-gray-300 hover:text-white px-3 py-2">FAQ</Link>
              <Link href="/dashboard" className="block bg-yellow-400 text-slate-900 px-3 py-2 rounded-lg font-semibold">내 강의</Link>
            </div>
          )}
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 강의 헤더 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/courses"
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              강좌 목록
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500 text-sm">코딩 전문가</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500 text-sm">C 언어 (ESP32)</span>
            <span className="text-gray-300">/</span>
            <span className={`px-2 py-0.5 ${colors.bg} text-white text-sm rounded-full font-medium`}>
              {level}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-3xl">
              {courseData.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{courseData.title}</h1>
                <span className={`px-3 py-1 ${colors.bg} text-white text-sm rounded-full font-medium`}>
                  {courseData.level}
                </span>
              </div>
              <p className="text-gray-500">{courseData.subtitle}</p>
            </div>
          </div>
        </div>

        {/* 라이브 강의 배너 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">주간 라이브 강의 입장</h3>
              <p className="text-blue-200 text-sm">{courseData.liveInfo.schedule}</p>
            </div>
          </div>
          <button className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
            입장하기
          </button>
        </div>

        {/* 전체 강의 업로드 완료 알림 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">{allCompleted ? '🎉' : '📢'}</span>
            <div>
              <p className="font-semibold text-yellow-800">{courseData.announcement.title}</p>
              <p className="text-sm text-yellow-700">{courseData.announcement.description}</p>
            </div>
          </div>
        </div>

        {/* 초급일 때 개발환경 설정 가이드 섹션 */}
        {level === '초급' && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-teal-600" />
              개발환경 설정 가이드
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              ESP32 개발을 시작하기 전에 아래 순서대로 환경을 설정해주세요.
            </p>

            {/* Step 1: Arduino IDE 설치 */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-5 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Arduino IDE 설치</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    ESP32 프로그래밍을 위한 Arduino IDE를 설치합니다. 아래 동영상을 보면서 따라해주세요.
                  </p>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden mb-3">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/QCmWohuTHPw"
                      title="Arduino IDE 설치 방법"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <a
                    href="https://youtu.be/QCmWohuTHPw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    유튜브에서 보기
                  </a>
                </div>
              </div>
            </div>

            {/* Step 2: USB 드라이버 설치 */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">USB 드라이버 설치 (CP210x)</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    ESP32 보드를 PC와 연결하려면 CP210x USB 드라이버가 필요합니다.
                    아래 버튼을 클릭하여 드라이버를 다운로드하고 설치하세요.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-2">
                    <a
                      href="/downloads/CP210x_Windows_Drivers.zip"
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition"
                    >
                      <Download className="w-4 h-4" />
                      CP210x 드라이버 다운로드 (Windows)
                    </a>
                  </div>
                  <p className="text-xs text-gray-500">
                    * 압축을 풀고 CP210xVCPInstaller_x64.exe (64비트) 또는 CP210xVCPInstaller_x86.exe (32비트)를 실행하세요.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Serial 테스트 코드 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Serial 통신 테스트 코드</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    ESP32 개발환경이 제대로 설정되었는지 확인하는 테스트 코드입니다.
                    아래 동영상을 보면서 보드 설정 후 테스트하세요.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <a
                      href="/downloads/ESP32_Serial_Test.zip"
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
                    >
                      <Download className="w-4 h-4" />
                      테스트 코드 다운로드
                    </a>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-3">
                    <p className="text-xs text-blue-700 font-medium mb-2">사용 방법:</p>
                    <ol className="text-xs text-blue-700 list-decimal list-inside space-y-1">
                      <li>압축을 풀고 ESP32_Serial_Test.ino 파일을 Arduino IDE로 엽니다</li>
                      <li>도구 → 보드 → ESP32 Dev Module 선택</li>
                      <li>도구 → 포트 → 해당 COM 포트 선택</li>
                      <li>업로드 버튼 클릭</li>
                      <li>도구 → 시리얼 모니터 (115200 baud)에서 메시지 확인</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: ESP32 보드 설정 */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">ESP32 보드 설정 및 테스트</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Arduino IDE의 Board Manager에서 ESP32 보드를 설치하고, 위의 테스트 코드로 시리얼 통신을 확인합니다.
                  </p>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden mb-3">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/JWBLCTQbEhc"
                      title="ESP32 보드 설정 및 시리얼 테스트"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <a
                    href="https://youtu.be/JWBLCTQbEhc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    유튜브에서 보기
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 진행률 바 */}
        <div className="bg-white rounded-xl p-5 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900">전체 학습 진행률</span>
            <span className={`font-bold ${colors.text}`}>
              {courseData.progress.completed}/{courseData.progress.total} 완료 ({courseData.progress.percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`${colors.bg} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${courseData.progress.percentage}%` }}
            />
          </div>
        </div>

        {/* 파트별 강의 목록 */}
        {courseData.parts.map((part: any) => (
          <PartSection key={part.id} part={part} level={level} />
        ))}

        {/* 완료 축하 배너 */}
        {allCompleted && courseData.nextLevel && (
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-center mt-8">
            <div className="text-6xl mb-4">🎊</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              축하합니다! 모든 강의를 완료하셨습니다!
            </h2>
            <p className="text-purple-200 mb-6">
              이제 다음 단계로 나아갈 준비가 되었습니다! 🚀
            </p>
            <Link
              href={`/course/coding/c-esp32/${courseData.nextLevel}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition"
            >
              {courseData.nextLevel} 과정 시작하기
            </Link>
          </div>
        )}

        {/* 다른 레벨 안내 */}
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">다른 레벨 강좌</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {['초급', '중급', '고급'].map((lvl) => {
              const isCurrentLevel = lvl === level;
              const lvlColors = levelColors[lvl];
              return isCurrentLevel ? (
                <div key={lvl} className={`p-4 bg-${lvl === '초급' ? 'green' : lvl === '중급' ? 'yellow' : 'red'}-50 rounded-lg border-2 ${lvlColors.border}`}>
                  <span className={`text-sm ${lvlColors.text} font-medium`}>현재 학습 중</span>
                  <h4 className="font-bold text-gray-900 mt-1">{lvl}</h4>
                  <p className="text-sm text-gray-500">
                    {lvl === '초급' && '개발환경 설정부터 기본 프로그래밍'}
                    {lvl === '중급' && '센서 연동과 통신 프로토콜'}
                    {lvl === '고급' && 'FreeRTOS와 실전 프로젝트'}
                  </p>
                </div>
              ) : (
                <Link
                  key={lvl}
                  href={`/course/coding/c-esp32/${lvl}`}
                  className={`p-4 bg-gray-50 rounded-lg hover:bg-${lvl === '초급' ? 'green' : lvl === '중급' ? 'yellow' : 'red'}-50 transition`}
                >
                  <span className="text-sm text-gray-500">{lvl === '초급' ? '기초 과정' : lvl === '중급' ? '다음 단계' : '심화 과정'}</span>
                  <h4 className="font-bold text-gray-900 mt-1">{lvl}</h4>
                  <p className="text-sm text-gray-500">
                    {lvl === '초급' && '개발환경 설정부터 기본 프로그래밍'}
                    {lvl === '중급' && '센서 연동과 통신 프로토콜'}
                    {lvl === '고급' && 'FreeRTOS와 실전 프로젝트'}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold">UTTEC Edu</span>
              </div>
              <p className="text-sm">AI와 함께하는 진로교육 플랫폼</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 underline">빠른 링크</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">홈</Link></li>
                <li><Link href="/courses" className="hover:text-white transition">강좌 목록</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 underline">고객 지원</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white transition">이용약관</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">개인정보처리방침</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">고객센터</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 커넥트에이아이. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
