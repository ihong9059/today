'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Bell,
  User,
  LogOut,
  CreditCard,
  RotateCcw,
  Brain,
  Menu,
  X,
  ChevronRight,
  Cpu
} from 'lucide-react';

// 수강 신청 데이터 (실제로는 DB에서 관리)
const enrollmentData: Record<string, {
  courses: {
    id: string;
    title: string;
    icon: string;
    progress: number;
    lastLevel: string;
    lastDay: number;
    purchaseDate: string;
    totalDays: number;
    completedDays: number;
  }[];
}> = {
  'test@test.com': {
    courses: [
      {
        id: 'c-esp32',
        title: 'C 언어 (ESP32)',
        icon: '🔌',
        progress: 30,
        lastLevel: '초급',
        lastDay: 3,
        purchaseDate: '2025. 12. 15.',
        totalDays: 30, // 초급10 + 중급10 + 고급10
        completedDays: 3,
      },
    ],
  },
};

// 통계 카드 컴포넌트
function StatCard({
  icon: Icon,
  label,
  value,
  subLabel,
  highlighted = false
}: {
  icon: any;
  label: string;
  value: string | number;
  subLabel: string;
  highlighted?: boolean;
}) {
  return (
    <div className={`p-6 rounded-2xl ${highlighted ? 'bg-yellow-400 text-slate-900' : 'bg-white/10 text-white'}`}>
      <div className="flex justify-center mb-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${highlighted ? 'bg-yellow-500' : 'bg-white/20'}`}>
          <Icon className={`w-6 h-6 ${highlighted ? 'text-slate-900' : 'text-white'}`} />
        </div>
      </div>
      <p className={`text-sm text-center mb-1 ${highlighted ? 'text-slate-700' : 'text-blue-200'}`}>{label}</p>
      <p className={`text-3xl font-bold text-center ${highlighted ? 'text-slate-900' : 'text-white'}`}>{value}</p>
      <p className={`text-xs text-center mt-1 ${highlighted ? 'text-slate-600' : 'text-blue-300'}`}>{subLabel}</p>
    </div>
  );
}

// 학습 카드 컴포넌트
function LearningCard({ course }: { course: typeof enrollmentData['test@test.com']['courses'][0] }) {
  const isCompleted = course.progress === 100;

  return (
    <Link
      href={`/course/coding/${course.id}/${course.lastLevel}`}
      className="block bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
          {course.icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">{course.title}</h3>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
              isCompleted
                ? 'bg-green-100 text-green-600'
                : 'bg-blue-100 text-blue-600'
            }`}>
              {isCompleted ? '완료' : `${course.progress}%`}
            </span>
          </div>

          <div className="mb-3">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>진행률</span>
              <span>{course.completedDays}/{course.totalDays} 강의 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCompleted ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="px-2 py-1 bg-gray-100 rounded">
                현재: {course.lastLevel} Day {course.lastDay}
              </span>
            </div>
            <span className="flex items-center gap-1 text-blue-600 font-medium text-sm">
              이어서 학습하기
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// 구매 내역 카드 컴포넌트
function PurchaseCard({ course }: { course: typeof enrollmentData['test@test.com']['courses'][0] }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center text-lg">
          {course.icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{course.title}</h4>
          <p className="text-sm text-gray-500">구매일: {course.purchaseDate}</p>
        </div>
      </div>
      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
        결제완료
      </span>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCourses, setUserCourses] = useState<typeof enrollmentData['test@test.com']['courses']>([]);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userStr && token) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || '');
        setUserEmail(user.email || '');
        setIsLoggedIn(true);

        // 사용자의 등록된 강좌 가져오기
        const enrollment = enrollmentData[user.email];
        if (enrollment) {
          setUserCourses(enrollment.courses);
        }
      } catch (e) {
        console.error('Failed to parse user data');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  // 통계 계산
  const stats = {
    totalCourses: userCourses.length,
    inProgress: userCourses.filter(c => c.progress > 0 && c.progress < 100).length,
    completed: userCourses.filter(c => c.progress === 100).length,
    totalTime: '10시간 30분',
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

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

      {/* 대시보드 헤더 */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">안녕하세요, {userName}님!</h1>
              <p className="text-blue-200">오늘도 함께 성장해요</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={BookOpen}
              label="수강 중인 강좌"
              value={stats.totalCourses}
              subLabel="Total Courses"
            />
            <StatCard
              icon={Play}
              label="진행 중"
              value={stats.inProgress}
              subLabel="In Progress"
            />
            <StatCard
              icon={CheckCircle}
              label="완료"
              value={stats.completed}
              subLabel="Completed"
              highlighted
            />
            <StatCard
              icon={Clock}
              label="총 학습 시간"
              value={stats.totalTime}
              subLabel="Total Time"
            />
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 내 학습 */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">내 학습</h2>
              <Link href="/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                더 많은 강좌 보기 →
              </Link>
            </div>

            {userCourses.length > 0 ? (
              <div className="space-y-4">
                {userCourses.map((course) => (
                  <LearningCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">등록된 강좌가 없습니다</h3>
                <p className="text-gray-500 mb-4">새로운 강좌를 수강 신청해보세요!</p>
                <Link
                  href="/courses"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  강좌 둘러보기
                </Link>
              </div>
            )}
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 구매 내역 */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-500" />
                구매 내역
              </h3>
              {userCourses.length > 0 ? (
                <div className="space-y-3">
                  {userCourses.map((course) => (
                    <PurchaseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">구매 내역이 없습니다.</p>
              )}
            </div>

            {/* 학습 진행 위젯 */}
            {userCourses.length > 0 && (
              <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-4">이어서 학습하기</h3>
                <div className="bg-white/20 rounded-xl p-4 mb-4">
                  <p className="font-medium">{userCourses[0].title}</p>
                  <p className="text-sm text-green-100 mt-1">
                    {userCourses[0].lastLevel} Day {userCourses[0].lastDay}
                  </p>
                </div>
                <Link
                  href={`/course/coding/${userCourses[0].id}/${userCourses[0].lastLevel}/lesson/${userCourses[0].lastDay}`}
                  className="block w-full py-3 bg-white text-green-600 rounded-lg font-semibold text-center hover:bg-green-50 transition"
                >
                  바로 학습하기
                </Link>
              </div>
            )}

            {/* 알림 */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-500" />
                알림
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">새로운 강의가 업로드되었습니다!</p>
                  <p className="text-xs text-blue-600 mt-1">2시간 전</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">주간 라이브 강의가 곧 시작됩니다.</p>
                  <p className="text-xs text-gray-500 mt-1">어제</p>
                </div>
              </div>
            </div>
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
                <li><Link href="/courses" className="hover:text-white transition">홈</Link></li>
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
