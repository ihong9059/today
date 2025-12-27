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
  Code,
  Download
} from 'lucide-react';

// 레벨별 코스 데이터
const courseDataByLevel: Record<string, any> = {
  '초급': {
    title: 'C 언어 (PC)',
    level: '초급',
    subtitle: 'PC 환경에서 배우는 C 프로그래밍 기초 - 변수, 조건문, 반복문부터 시작',
    icon: '💻',
    liveInfo: {
      schedule: '매주 월요일 8PM | C 기초 문법 & 실습',
    },
    announcement: {
      title: 'Day 1-10 전체 강의 업로드 완료!',
      description: '지금 바로 학습을 시작하세요! 🚀',
    },
    progress: {
      completed: 0,
      total: 10,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1 (Day 1-6)',
        subtitle: 'C 언어 기초 문법과 프로그래밍 개념 익히기',
        icon: '📚',
        lessons: [
          { day: 1, title: 'C 언어 소개와 개발환경 설정', description: 'C 언어의 역사와 특징 | Visual Studio Code 설치 | 첫 번째 프로그램', hasQuiz: true, completed: false },
          { day: 2, title: '변수와 자료형', description: '정수형, 실수형, 문자형 | 변수 선언과 초기화 | sizeof 연산자', hasQuiz: true, completed: false },
          { day: 3, title: '연산자', description: '산술, 관계, 논리 연산자 | 비트 연산자 | 연산자 우선순위', hasQuiz: true, completed: false },
          { day: 4, title: '조건문', description: 'if-else 문 | switch-case 문 | 삼항 연산자', hasQuiz: true, completed: false },
          { day: 5, title: '반복문', description: 'for 문 | while 문 | do-while 문 | break와 continue', hasQuiz: true, completed: false },
          { day: 6, title: '종합 실습: 숫자 맞추기 게임', description: '조건문 + 반복문 통합 | 난수 생성 | 사용자 입력 처리', hasQuiz: false, completed: false },
        ],
      },
      {
        id: 2,
        title: 'Part 2 (Day 7-10)',
        subtitle: '함수와 배열 - 코드 구조화의 시작',
        icon: '🚀',
        lessons: [
          { day: 7, title: '함수 기초', description: '함수 정의와 호출 | 매개변수와 반환값 | 함수 프로토타입', hasQuiz: true, completed: false },
          { day: 8, title: '배열', description: '1차원 배열 | 배열과 반복문 | 문자 배열과 문자열', hasQuiz: true, completed: false },
          { day: 9, title: '다차원 배열', description: '2차원 배열 | 행렬 연산 | 배열과 함수', hasQuiz: false, completed: false },
          { day: 10, title: '종합 프로젝트: 성적 관리 프로그램', description: '배열 + 함수 통합 | 평균/최대/최소 계산 | 메뉴 시스템', hasQuiz: false, completed: false },
        ],
      },
    ],
    nextLevel: '중급',
  },
  '중급': {
    title: 'C 언어 (PC)',
    level: '중급',
    subtitle: '포인터와 메모리 관리 - C 언어의 핵심',
    icon: '💻',
    liveInfo: {
      schedule: '매주 수요일 8PM | 포인터 심화 학습',
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
        subtitle: '포인터의 이해와 활용',
        icon: '📚',
        lessons: [
          { day: 1, title: '포인터 기초', description: '주소와 포인터 | 포인터 선언과 초기화', hasQuiz: true, completed: false },
          { day: 2, title: '포인터와 배열', description: '배열과 포인터의 관계 | 포인터 연산', hasQuiz: true, completed: false },
          { day: 3, title: '포인터와 함수', description: 'Call by Reference | 배열 전달', hasQuiz: true, completed: false },
          { day: 4, title: '동적 메모리 할당', description: 'malloc, calloc, realloc, free', hasQuiz: true, completed: false },
          { day: 5, title: '문자열 처리', description: '문자열 함수 | 문자열 포인터', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2,
        title: 'Part 2 (Day 6-10)',
        subtitle: '구조체와 파일 입출력',
        icon: '🚀',
        lessons: [
          { day: 6, title: '구조체 기초', description: '구조체 정의와 사용', hasQuiz: true, completed: false },
          { day: 7, title: '구조체와 포인터', description: '구조체 포인터 | 자기 참조 구조체', hasQuiz: false, completed: false },
          { day: 8, title: '파일 입출력', description: '파일 열기/닫기 | 텍스트 파일 처리', hasQuiz: true, completed: false },
          { day: 9, title: '이진 파일 처리', description: '바이너리 파일 읽기/쓰기', hasQuiz: false, completed: false },
          { day: 10, title: '종합 프로젝트: 주소록 프로그램', description: '구조체 + 파일 + 동적 메모리 통합', hasQuiz: false, completed: false },
        ],
      },
    ],
    nextLevel: '고급',
  },
  '고급': {
    title: 'C 언어 (PC)',
    level: '고급',
    subtitle: '자료구조와 알고리즘 - 실전 프로그래밍',
    icon: '💻',
    liveInfo: {
      schedule: '매주 금요일 8PM | 알고리즘 문제풀이',
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
        subtitle: '자료구조 구현',
        icon: '📚',
        lessons: [
          { day: 1, title: '연결 리스트', description: '단일 연결 리스트 구현', hasQuiz: true, completed: false },
          { day: 2, title: '이중 연결 리스트', description: '양방향 연결 리스트', hasQuiz: true, completed: false },
          { day: 3, title: '스택', description: '배열/연결리스트 기반 스택', hasQuiz: true, completed: false },
          { day: 4, title: '큐', description: '원형 큐 | 우선순위 큐', hasQuiz: true, completed: false },
          { day: 5, title: '트리', description: '이진 트리 | 트리 순회', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2,
        title: 'Part 2 (Day 6-10)',
        subtitle: '알고리즘과 실전 프로젝트',
        icon: '🚀',
        lessons: [
          { day: 6, title: '정렬 알고리즘', description: '버블, 선택, 삽입, 퀵 정렬', hasQuiz: true, completed: false },
          { day: 7, title: '탐색 알고리즘', description: '선형, 이진 탐색', hasQuiz: false, completed: false },
          { day: 8, title: '재귀와 분할정복', description: '재귀 함수 | 하노이 탑', hasQuiz: true, completed: false },
          { day: 9, title: '해시 테이블', description: '해시 함수 | 충돌 처리', hasQuiz: false, completed: false },
          { day: 10, title: '종합 프로젝트: 데이터베이스 시스템', description: '자료구조 종합 활용', hasQuiz: false, completed: false },
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
      href={`/course/coding/c-pc/${level}/lesson/${lesson.day}`}
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
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          {part.icon} {part.title}
        </h3>
        <p className="text-blue-100 text-sm mt-1">{part.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {part.lessons.map((lesson: any) => (
          <LessonCard key={lesson.day} lesson={lesson} level={level} />
        ))}
      </div>
    </section>
  );
}

export default function CPCLevelCoursePage() {
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
              <Link href="/courses" className="flex items-center">
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
            <span className="text-gray-500 text-sm">C 언어 (PC)</span>
            <span className="text-gray-300">/</span>
            <span className={`px-2 py-0.5 ${colors.bg} text-white text-sm rounded-full font-medium`}>
              {level}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl">
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
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">주간 라이브 강의 입장</h3>
              <p className="text-indigo-200 text-sm">{courseData.liveInfo.schedule}</p>
            </div>
          </div>
          <button className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition">
            입장하기
          </button>
        </div>

        {/* 전체 강의 업로드 완료 알림 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">{allCompleted ? '🎉' : '📢'}</span>
            <div>
              <p className="font-semibold text-blue-800">{courseData.announcement.title}</p>
              <p className="text-sm text-blue-700">{courseData.announcement.description}</p>
            </div>
          </div>
        </div>

        {/* 초급일 때만 드라이버 다운로드 섹션 표시 */}
        {level === '초급' && (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">USB 드라이버 다운로드</h3>
                <p className="text-sm text-gray-600 mb-3">
                  ESP32 보드를 PC와 연결하려면 CP210x USB 드라이버가 필요합니다.
                  아래 버튼을 클릭하여 드라이버를 다운로드하고 설치하세요.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/downloads/CP210x_Windows_Drivers.zip"
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition"
                  >
                    <Download className="w-4 h-4" />
                    CP210x 드라이버 다운로드 (Windows)
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * 압축을 풀고 CP210xVCPInstaller_x64.exe (64비트) 또는 CP210xVCPInstaller_x86.exe (32비트)를 실행하세요.
                </p>
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
              href={`/course/coding/c-pc/${courseData.nextLevel}`}
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
                <div key={lvl} className={`p-4 rounded-lg border-2 ${lvlColors.border} ${lvl === '초급' ? 'bg-green-50' : lvl === '중급' ? 'bg-yellow-50' : 'bg-red-50'}`}>
                  <span className={`text-sm ${lvlColors.text} font-medium`}>현재 학습 중</span>
                  <h4 className="font-bold text-gray-900 mt-1">{lvl}</h4>
                  <p className="text-sm text-gray-500">
                    {lvl === '초급' && '변수, 조건문, 반복문, 함수, 배열'}
                    {lvl === '중급' && '포인터, 메모리, 구조체, 파일'}
                    {lvl === '고급' && '자료구조, 알고리즘'}
                  </p>
                </div>
              ) : (
                <Link
                  key={lvl}
                  href={`/course/coding/c-pc/${lvl}`}
                  className={`p-4 bg-gray-50 rounded-lg hover:${lvl === '초급' ? 'bg-green-50' : lvl === '중급' ? 'bg-yellow-50' : 'bg-red-50'} transition`}
                >
                  <span className="text-sm text-gray-500">{lvl === '초급' ? '기초 과정' : lvl === '중급' ? '다음 단계' : '심화 과정'}</span>
                  <h4 className="font-bold text-gray-900 mt-1">{lvl}</h4>
                  <p className="text-sm text-gray-500">
                    {lvl === '초급' && '변수, 조건문, 반복문, 함수, 배열'}
                    {lvl === '중급' && '포인터, 메모리, 구조체, 파일'}
                    {lvl === '고급' && '자료구조, 알고리즘'}
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
