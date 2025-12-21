'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Brain,
  Menu,
  X,
  Play,
  CheckCircle,
  Clock,
  ChevronRight,
  Code,
  Cpu,
  Database,
  Server,
  Terminal
} from 'lucide-react';

// 코딩전문가 강의 데이터
const courseData = {
  title: '코딩 전문가',
  subtitle: 'PC부터 임베디드까지 - 실무 프로그래밍 마스터 코스',
  icon: '💻',
  progress: {
    completed: 0,
    total: 7,
    percentage: 0,
  },
  lessons: [
    {
      id: '1.1',
      title: 'C 언어 (PC)',
      description: 'C 언어 기초부터 고급까지 | 포인터, 메모리 관리, 자료구조',
      icon: <Code className="w-5 h-5" />,
      hasQuiz: true,
      completed: false,
      duration: '10시간',
    },
    {
      id: '1.2',
      title: 'Python (PC)',
      description: '파이썬 프로그래밍 | 데이터 분석, 자동화, AI 기초',
      icon: <Terminal className="w-5 h-5" />,
      hasQuiz: true,
      completed: false,
      duration: '12시간',
    },
    {
      id: '1.3',
      title: 'C 언어 (ESP32)',
      description: 'ESP32 마이크로컨트롤러 프로그래밍 | IoT 디바이스 개발',
      icon: <Cpu className="w-5 h-5" />,
      hasQuiz: true,
      completed: false,
      duration: '15시간',
      highlight: true,
      image: '/images/esp32-board.jpg',
    },
    {
      id: '1.4',
      title: 'Python (UTTEC Shield)',
      description: 'UTTEC Shield를 활용한 파이썬 하드웨어 제어',
      icon: <Cpu className="w-5 h-5" />,
      hasQuiz: true,
      completed: false,
      duration: '10시간',
    },
    {
      id: '1.5',
      title: 'Node.js (PC)',
      description: '서버사이드 자바스크립트 | Express, REST API 개발',
      icon: <Server className="w-5 h-5" />,
      hasQuiz: true,
      completed: false,
      duration: '12시간',
    },
    {
      id: '1.6',
      title: 'Database (PC)',
      description: 'SQL & NoSQL | MySQL, MongoDB 실무 활용',
      icon: <Database className="w-5 h-5" />,
      hasQuiz: true,
      completed: false,
      duration: '8시간',
    },
    {
      id: '1.7',
      title: 'Node-RED (PC)',
      description: '플로우 기반 프로그래밍 | IoT 대시보드 구축',
      icon: <Terminal className="w-5 h-5" />,
      hasQuiz: false,
      completed: false,
      duration: '6시간',
    },
  ],
};

// 레슨 카드 컴포넌트
function LessonCard({ lesson }: { lesson: typeof courseData.lessons[0] }) {
  return (
    <Link
      href={`/course/2/lesson/${lesson.id}`}
      className={`block bg-white rounded-xl shadow-sm border p-5 hover:shadow-lg hover:border-blue-300 hover:scale-[1.02] transition-all duration-200 cursor-pointer ${
        lesson.highlight ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-100'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          lesson.highlight ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
        }`}>
          {lesson.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-blue-600">{lesson.id}</span>
            {lesson.hasQuiz && (
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                📝 퀴즈
              </span>
            )}
            {lesson.completed && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                ✓ 완료
              </span>
            )}
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">{lesson.title}</h4>
          <p className="text-sm text-gray-500 mb-2">{lesson.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {lesson.duration}
            </span>
            <span className="flex items-center gap-1 text-blue-600 font-medium text-sm">
              학습하기
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      {/* 하이라이트 레슨에 이미지 표시 */}
      {lesson.highlight && lesson.image && (
        <div className="mt-4 rounded-lg overflow-hidden border border-blue-200">
          <img
            src={lesson.image}
            alt={lesson.title}
            className="w-full h-40 object-cover"
          />
          <div className="bg-blue-50 p-3">
            <p className="text-sm text-blue-700 font-medium">🔧 실습 보드: UTTEC ESP32 개발보드</p>
            <p className="text-xs text-blue-600">수업에 사용되는 실제 하드웨어입니다</p>
          </div>
        </div>
      )}
    </Link>
  );
}

export default function CodingCoursePage() {
  const router = useRouter();
  const [userName, setUserName] = useState('홍광선');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-3xl">
              {courseData.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{courseData.title}</h1>
              <p className="text-gray-500">{courseData.subtitle}</p>
            </div>
          </div>
        </div>

        {/* 진행률 바 */}
        <div className="bg-white rounded-xl p-5 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900">전체 학습 진행률</span>
            <span className="font-bold text-blue-600">
              {courseData.progress.completed}/{courseData.progress.total} 완료 ({courseData.progress.percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-teal-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${courseData.progress.percentage}%` }}
            />
          </div>
        </div>

        {/* 커리큘럼 안내 */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-5 mb-6 text-white">
          <h3 className="text-xl font-bold mb-2">📚 코딩 전문가 커리큘럼</h3>
          <p className="text-green-100">PC 프로그래밍부터 임베디드 시스템까지, 실무에서 바로 활용할 수 있는 프로그래밍 스킬을 배웁니다.</p>
        </div>

        {/* 레슨 목록 */}
        <div className="grid md:grid-cols-2 gap-4">
          {courseData.lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>

        {/* 수강 안내 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mt-8">
          <h3 className="font-semibold text-yellow-800 mb-2">📌 수강 안내</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 1.3, 1.4 강의는 실습 보드가 필요합니다 (구입처 별도 안내)</li>
            <li>• 각 강의는 순서대로 수강하시는 것을 권장합니다</li>
            <li>• 퀴즈를 모두 통과해야 다음 강의로 진행됩니다</li>
          </ul>
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
