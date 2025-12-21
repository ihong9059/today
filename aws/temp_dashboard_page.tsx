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
  RotateCcw
} from 'lucide-react';
import { useAuthStore } from '@/lib/store';

// 임시 데이터
const mockUserData = {
  name: '학습자',
  stats: {
    totalCourses: 2,
    inProgress: 1,
    completed: 1,
    totalTime: '5시간 30분',
  },
};

const mockLearningCourses = [
  {
    id: 1,
    title: 'STM32 GPIO 마스터하기',
    progress: 65,
    lastAccess: '2025. 12. 20',
    studyTime: '2시간 15분',
  },
];

const mockPurchasedCourses = [
  {
    id: 1,
    title: 'STM32 GPIO 마스터하기',
    purchaseDate: '2025. 12. 15',
    paymentMethod: '카드 결제',
    status: '수강중',
  },
  {
    id: 2,
    title: 'Arduino 기초부터 실전까지',
    purchaseDate: '2025. 12. 10',
    paymentMethod: '카드 결제',
    status: '수강완료',
  },
];

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
function LearningCard({ course }: { course: typeof mockLearningCourses[0] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-900">{course.title}</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
          {course.progress}%
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>진행률</span>
          <span>{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>📅 {course.lastAccess}</span>
        <span className="mx-2">·</span>
        <span>⏱️ {course.studyTime}</span>
      </div>

      <button className="w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition flex items-center justify-center gap-2">
        <RotateCcw className="w-4 h-4" />
        다시 보기
      </button>
    </div>
  );
}

// 구매 카드 컴포넌트
function PurchaseCard({ course }: { course: typeof mockPurchasedCourses[0] }) {
  const isCompleted = course.status === '수강완료';

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{course.title}</h3>
          <p className="text-sm text-gray-500 mt-1">📅 구매일: {course.purchaseDate}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          isCompleted
            ? 'bg-green-100 text-green-600'
            : 'bg-blue-100 text-blue-600'
        }`}>
          {course.status}
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <CreditCard className="w-4 h-4 mr-1" />
        <span>{course.paymentMethod}</span>
      </div>

      <button className={`w-full py-3 font-semibold rounded-xl transition flex items-center justify-center gap-2 ${
        isCompleted
          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}>
        <Play className="w-4 h-4" />
        {isCompleted ? '다시 보기' : '강의 시작하기'}
      </button>
    </div>
  );
}

// 진행률 위젯 컴포넌트
function ProgressWidget({ completed, total }: { completed: number; total: number }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center justify-center gap-2">
        📊 학습 진행률
      </h3>

      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#E5E7EB"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#3B82F6"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${percentage * 3.52} 352`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-blue-600">{percentage}%</span>
          <span className="text-xs text-gray-500">완료율</span>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        전체 <span className="font-semibold text-blue-600">{total}개</span> 강의 중{' '}
        <span className="font-semibold text-blue-600">{completed}개</span>를 완료했습니다
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [userName, setUserName] = useState(mockUserData.name);

  useEffect(() => {
    // 실제 사용자 이름으로 업데이트
    if (user?.name) {
      setUserName(user.name);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold">C</span>
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <Link href="/about" className="text-gray-300 hover:text-white transition">
                소개
              </Link>
              <Link href="/courses" className="text-gray-300 hover:text-white transition">
                강좌 목록
              </Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition">
                FAQ
              </Link>
              <Link href="/dashboard" className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-lg font-semibold">
                내 강의
              </Link>
              <button className="text-gray-300 hover:text-white transition relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  1
                </span>
              </button>
              <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                <User className="w-5 h-5" />
                <span>{userName}님</span>
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 환영 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                안녕하세요, {userName}님! 👋
                <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition">
                  ✏️ 내정보 변경
                </button>
              </h1>
              <p className="text-blue-200 mt-2">오늘도 새로운 지식을 쌓아가는 멋진 하루 되세요!</p>
            </div>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={BookOpen}
              label="총 수강 강의"
              value={mockUserData.stats.totalCourses}
              subLabel="개 강의"
            />
            <StatCard
              icon={Play}
              label="수강 중"
              value={mockUserData.stats.inProgress}
              subLabel="개 진행 중"
            />
            <StatCard
              icon={CheckCircle}
              label="완료한 강의"
              value={mockUserData.stats.completed}
              subLabel="개 완료"
            />
            <StatCard
              icon={Clock}
              label="총 학습 시간"
              value={mockUserData.stats.totalTime}
              subLabel="누적 시간"
              highlighted
            />
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* MY LEARNING 섹션 */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full mb-3">
              MY LEARNING
            </span>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              📚 나의 학습 여정
            </h2>
            <p className="text-gray-600 mt-2">현재 수강 중인 강의들을 확인하고 학습을 이어가세요</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockLearningCourses.map((course) => (
              <LearningCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* MY PURCHASES 섹션 */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 bg-green-600 text-white text-sm font-semibold rounded-full mb-3">
              MY PURCHASES
            </span>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              💳 구매한 강의
            </h2>
            <p className="text-gray-600 mt-2">결제 완료된 모든 강의 내역을 확인하세요</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPurchasedCourses.map((course) => (
              <PurchaseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* 학습 진행률 위젯 */}
        <section className="flex justify-center">
          <ProgressWidget
            completed={mockUserData.stats.completed}
            total={mockUserData.stats.totalCourses}
          />
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold">C</span>
                </div>
                <span className="text-white font-semibold">UTTEC Edu</span>
              </div>
              <p className="text-sm">
                임베디드 개발자 사관으로 시작하는 HW 마스터 여정
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">빠른 링크</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">홈</Link></li>
                <li><Link href="/courses" className="hover:text-white transition">강좌 목록</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">고객 지원</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white transition">이용약관</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">개인정보처리방침</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">고객센터</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 UTTEC Lab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
