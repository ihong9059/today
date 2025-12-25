'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  Brain,
  Menu,
  X,
  ChevronLeft,
  Lock,
  ShoppingCart,
  CheckCircle,
  Play,
  Clock,
  Target
} from 'lucide-react';

// 수강 신청 데이터
const enrollmentData: Record<string, string[]> = {
  'test@test.com': ['python-pc'],
};

// 강좌 정보
const courseInfo = {
  'python-pc': { title: 'Python (PC)', price: 79000 },
};

// Day별 강의 목록
const dayLessons = [
  { day: 1, title: 'Python 소개와 첫 프로그램', duration: '약 30분', objectives: ['Python 특징 이해', 'Hello World 실행'] },
  { day: 2, title: '변수와 자료형', duration: '약 50분', objectives: ['변수 개념', '기본 자료형', 'input() 함수'] },
  { day: 3, title: '연산자와 표현식', duration: '약 45분', objectives: ['산술 연산자', '비교 연산자', '논리 연산자'] },
  { day: 4, title: '조건문 (if-else)', duration: '약 50분', objectives: ['if문', 'elif/else', '중첩 조건문'] },
  { day: 5, title: '반복문 (for)', duration: '약 50분', objectives: ['for 루프', 'range() 함수', '리스트 순회'] },
  { day: 6, title: '반복문 (while)', duration: '약 45분', objectives: ['while 루프', 'break/continue', '무한 루프'] },
  { day: 7, title: '함수 기초', duration: '약 50분', objectives: ['함수 정의', '함수 호출', '매개변수'] },
  { day: 8, title: '함수 심화', duration: '약 55분', objectives: ['반환값', '기본값 매개변수', '가변 인자'] },
  { day: 9, title: '리스트 (List)', duration: '약 50분', objectives: ['리스트 생성', '인덱싱', '슬라이싱'] },
  { day: 10, title: '리스트 활용', duration: '약 55분', objectives: ['리스트 메서드', '리스트 컴프리헨션', '정렬'] },
  { day: 11, title: '딕셔너리 (Dictionary)', duration: '약 50분', objectives: ['딕셔너리 생성', '키-값 접근', '딕셔너리 메서드'] },
  { day: 12, title: '튜플과 세트', duration: '약 45분', objectives: ['튜플 특징', '세트 특징', '자료형 비교'] },
  { day: 13, title: '문자열 처리', duration: '약 50분', objectives: ['문자열 메서드', '포맷팅', '정규표현식 기초'] },
  { day: 14, title: '파일 입출력', duration: '약 50분', objectives: ['파일 읽기', '파일 쓰기', 'with문'] },
  { day: 15, title: '미니 프로젝트', duration: '약 60분', objectives: ['프로젝트 설계', '구현', '테스트'] },
];

// 수강 신청 안내 컴포넌트
function EnrollmentRequired({ courseId, level }: { courseId: string; level: string }) {
  const info = courseInfo[courseId as keyof typeof courseInfo];
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/courses" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">수강 신청이 필요합니다</h1>
          <p className="text-gray-600 mb-6">이 강의를 시청하려면 먼저 수강 신청을 해주세요.</p>
          {info && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h2>
              <p className="text-3xl font-bold text-yellow-600 mb-4">{info.price.toLocaleString()}원</p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <button className="w-full py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              수강 신청하기
            </button>
            <Link href="/login" className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition">
              로그인하기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PythonPCLevelPage() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);

  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const courseId = 'python-pc';

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userStr && token) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || '');
        setIsLoggedIn(true);
        const enrolledCourses = enrollmentData[user.email] || [];
        setIsEnrolled(enrolledCourses.includes(courseId));
      } catch (e) {
        setIsLoggedIn(false);
        setIsEnrolled(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsEnrolled(false);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !isEnrolled) {
    return <EnrollmentRequired courseId={courseId} level={level} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/courses" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mr-2">
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
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 네비게이션 */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/courses"
            className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium hover:bg-yellow-200 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            강좌 목록
          </Link>
          <span className="px-3 py-1.5 bg-yellow-400 text-yellow-900 rounded-full text-sm font-medium">Python (PC)</span>
          <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">{level}</span>
        </div>

        {/* 강좌 헤더 */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🐍</span>
            <div>
              <h1 className="text-2xl font-bold">Python (PC) - {level}</h1>
              <p className="text-yellow-100">AI 시대의 필수 언어, Python을 마스터하세요</p>
            </div>
          </div>

          {/* 진행률 */}
          <div className="mt-4 bg-yellow-600/50 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>전체 진행률</span>
              <span>{completedDays.length} / 15 Day 완료</span>
            </div>
            <div className="w-full bg-yellow-700/50 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedDays.length / 15) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 강의 특징 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">15일 완성</h3>
            <p className="text-sm text-gray-500">하루 1시간, 체계적인 커리큘럼</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">목표 기반 학습</h3>
            <p className="text-sm text-gray-500">매일 3가지 학습 목표 달성</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">AI와 함께</h3>
            <p className="text-sm text-gray-500">ChatGPT, Claude 활용 학습</p>
          </div>
        </div>

        {/* Day별 강의 목록 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Play className="w-5 h-5 text-yellow-600" />
              강의 목록
            </h2>
          </div>
          <div className="divide-y">
            {dayLessons.map((lesson) => {
              const isCompleted = completedDays.includes(lesson.day);
              return (
                <Link
                  key={lesson.day}
                  href={`/course/coding/python-pc/${level}/lesson/${lesson.day}`}
                  className="block p-4 hover:bg-yellow-50 transition"
                >
                  <div className="flex items-start gap-4">
                    {/* Day 번호 */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="font-bold">{lesson.day}</span>
                      )}
                    </div>

                    {/* 강의 정보 */}
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
                      <p className="text-sm text-gray-500 mb-2">{lesson.duration}</p>
                      <div className="flex flex-wrap gap-1">
                        {lesson.objectives.map((obj, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {obj}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 화살표 */}
                    <div className="flex-shrink-0 text-gray-400">
                      <ChevronLeft className="w-5 h-5 rotate-180" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
