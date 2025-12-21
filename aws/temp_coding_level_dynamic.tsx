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
  Cpu
} from 'lucide-react';

// 레벨별 코스 데이터
const courseDataByLevel: Record<string, any> = {
  '초급': {
    title: 'C 언어 (ESP32)',
    level: '초급',
    subtitle: 'ESP32 마이크로컨트롤러를 활용한 임베디드 C 프로그래밍 입문',
    icon: '🔌',
    liveInfo: {
      schedule: '매주 화요일 8PM | AI 최신 트렌드 & 실습',
    },
    announcement: {
      title: 'Day 1-10 전체 강의 업로드 완료!',
      description: '지금 바로 학습을 시작하세요! 🚀',
    },
    progress: {
      completed: 10,
      total: 10,
      percentage: 100,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1 (Day 1-6)',
        subtitle: 'ESP32 개발환경 설정부터 기본 프로그래밍까지 - 임베디드 C 기초 다지기',
        icon: '📚',
        lessons: [
          { day: 1, title: 'ESP32 소개와 개발환경 설정', description: 'ESP32의 특징 이해 | Arduino IDE 설치 | 보드 드라이버 설정', hasQuiz: true, completed: true },
          { day: 2, title: 'GPIO 기초 - LED 제어하기', description: '디지털 출력 제어 | RGB LED 제어 | 블링크 패턴 만들기', hasQuiz: true, completed: true },
          { day: 3, title: '버튼 입력과 인터럽트', description: '디지털 입력 읽기 | 풀업/풀다운 저항 | 인터럽트 처리', hasQuiz: true, completed: true },
          { day: 4, title: 'OLED 디스플레이 제어', description: 'I2C 통신 기초 | SSD1306 라이브러리 | 텍스트/그래픽 출력', hasQuiz: false, completed: true },
          { day: 5, title: '부저와 사운드 출력', description: 'PWM 신호 생성 | 톤 출력 | 멜로디 재생', hasQuiz: true, completed: true },
          { day: 6, title: '종합 실습: 미니 게임 만들기', description: 'LED + 버튼 + 부저 + OLED 통합 | 반응속도 게임 제작', hasQuiz: false, completed: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2 (Day 7-10)',
        subtitle: '실전! Wi-Fi 연결부터 IoT 프로젝트까지 - 네트워크 기초',
        icon: '🚀',
        lessons: [
          { day: 7, title: 'Wi-Fi 연결하기', description: 'ESP32 Wi-Fi 모드 | 네트워크 스캔 | AP/Station 모드', hasQuiz: false, completed: true },
          { day: 8, title: '웹 서버 만들기', description: 'HTTP 서버 구축 | HTML 페이지 서빙 | LED 원격 제어', hasQuiz: true, completed: true },
          { day: 9, title: '센서 데이터 수집', description: '아날로그 입력 | 온습도 센서 연동 | 데이터 로깅', hasQuiz: false, completed: true },
          { day: 10, title: '종합 프로젝트: IoT 모니터링 시스템', description: '센서 + Wi-Fi + 웹서버 통합 | 실시간 모니터링 대시보드', hasQuiz: false, completed: true },
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
