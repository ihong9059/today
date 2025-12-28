'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, Menu, X, ChevronRight, Users, BookOpen, Clock, Star, Play } from 'lucide-react';

// 학부형 코스 데이터
const parentCourses = [
  {
    id: 'ai-understanding',
    title: 'AI 시대 이해하기',
    icon: '🤖',
    description: 'AI란 무엇인가? 우리 삶을 바꾸는 인공지능의 기초',
    color: 'from-blue-500 to-indigo-500',
    duration: '5강',
    students: 156,
    rating: 4.8,
    topics: ['AI 개념', '일상 속 AI', 'AI 윤리'],
  },
  {
    id: 'career-exploration',
    title: 'AI와 함께하는 진로 탐색',
    icon: '🎯',
    description: '내 아이에게 맞는 진로 찾기 - AI 활용 진로 탐색',
    color: 'from-teal-500 to-cyan-500',
    duration: '5강',
    students: 178,
    rating: 4.7,
    topics: ['진로 탐색', '적성 발견', '진로 대화'],
  },
  {
    id: 'mbti-career',
    title: 'MBTI로 알아보는 직업',
    icon: '🧠',
    description: 'MBTI 성격유형으로 진로 방향 찾기',
    color: 'from-indigo-500 to-purple-500',
    duration: '5강',
    students: 234,
    rating: 4.8,
    topics: ['MBTI 이해', '유형별 직업', 'AI 진로 상담'],
  },
  {
    id: 'future-jobs',
    title: '미래 유망 직종 안내',
    icon: '🚀',
    description: 'AI 시대 새로운 직업의 세계 - 자녀에게 알려줄 미래 직업',
    color: 'from-orange-500 to-red-500',
    duration: '5강',
    students: 189,
    rating: 4.6,
    topics: ['미래 직업', 'AI 관련 직종', '그린 직업'],
  },
  {
    id: 'ai-tools',
    title: 'AI 도구 활용법',
    icon: '💬',
    description: 'Gemini와 ChatGPT 활용 - 효과적인 AI 대화와 일상 생산성 향상',
    color: 'from-emerald-500 to-teal-500',
    duration: '5강',
    students: 203,
    rating: 4.9,
    topics: ['Gemini', 'ChatGPT', '일상 활용'],
  },
];

export default function ParentCoursePage() {
  const router = useRouter();
  const [userName, setUserName] = useState('학부모');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleStartCourse = (courseId: string) => {
    router.push(`/course/parent/${courseId}`);
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
              <Link href="/about" className="text-gray-300 hover:text-white transition px-3 py-2">소개</Link>
              <Link href="/mbti" className="text-gray-300 hover:text-white transition px-3 py-2">MBTI</Link>
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">강좌 목록</Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition px-3 py-2">FAQ</Link>
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
        {/* 헤더 섹션 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/courses" className="text-blue-200 hover:text-white text-sm">강좌 목록</Link>
            <ChevronRight className="w-4 h-4 text-blue-200" />
            <span className="text-sm">학부형 코스</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            👨‍👩‍👧‍👦 학부형 코스
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            AI 시대, 자녀의 미래를 위한 부모 교육 프로그램<br />
            AI 이해부터 진로 지도까지, 자녀와 함께 성장하세요!
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <BookOpen className="w-5 h-5" />
              <span>5개 강좌</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Clock className="w-5 h-5" />
              <span>강좌당 약 5시간</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Users className="w-5 h-5" />
              <span>960+ 수강생</span>
            </div>
          </div>
        </div>

        {/* 코스 목록 */}
        <div className="grid gap-6">
          {parentCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition">
              <div className="md:flex">
                {/* 왼쪽: 아이콘 */}
                <div className={`md:w-48 p-6 bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                  <span className="text-6xl">{course.icon}</span>
                </div>

                {/* 중앙: 정보 */}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.topics.map((topic) => (
                      <span key={topic} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students}명 수강
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {course.rating}
                    </span>
                  </div>
                </div>

                {/* 오른쪽: 시작 버튼 */}
                <div className="p-6 bg-gray-50 md:w-64 flex flex-col justify-center">
                  <button
                    onClick={() => handleStartCourse(course.id)}
                    className={`w-full py-3 bg-gradient-to-r ${course.color} text-white font-semibold rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2`}
                  >
                    <Play className="w-5 h-5" />
                    강의 시작하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 학습 추천 순서 */}
        <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">📚 추천 학습 순서</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {parentCourses.map((course, idx) => (
              <div key={course.id} className="text-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white text-xl font-bold`}>
                  {idx + 1}
                </div>
                <p className="text-2xl mb-1">{course.icon}</p>
                <h3 className="font-semibold text-gray-900 text-sm">{course.title}</h3>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-6 text-sm">
            * 순서대로 학습하시면 더욱 효과적입니다. 단, 관심 있는 강좌부터 시작해도 좋습니다!
          </p>
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
              <h4 className="text-white font-semibold mb-4">빠른 링크</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">홈</Link></li>
                <li><Link href="/courses" className="hover:text-white transition">강좌 목록</Link></li>
                <li><Link href="/about" className="hover:text-white transition">소개</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">문의</h4>
              <ul className="space-y-2 text-sm">
                <li>이메일: uttec@uttec.co.kr</li>
                <li>전화: 010-3922-1809</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 UTTEC Edu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
