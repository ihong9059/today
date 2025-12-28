'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, Menu, X, ChevronRight, Users, BookOpen, Clock, Star, Play } from 'lucide-react';

// 사회초년생 코스 데이터
const beginnerCourses = [
  {
    id: 'ai-workplace',
    title: 'AI 시대 직장생활',
    icon: '💼',
    description: 'AI 시대 직장인이 알아야 할 필수 지식과 마인드셋',
    color: 'from-blue-500 to-indigo-500',
    duration: '5강',
    students: 342,
    rating: 4.9,
    topics: ['AI 시대 변화', '직장 내 AI', '경쟁력 강화'],
  },
  {
    id: 'ai-tools-work',
    title: 'AI 도구 업무 활용',
    icon: '🛠️',
    description: 'ChatGPT, Gemini를 활용한 업무 생산성 200% 향상',
    color: 'from-emerald-500 to-teal-500',
    duration: '5강',
    students: 521,
    rating: 4.8,
    topics: ['ChatGPT 활용', 'Gemini 활용', '업무 자동화'],
  },
  {
    id: 'prompt-master',
    title: '프롬프트 마스터',
    icon: '✍️',
    description: '원하는 결과를 얻는 프롬프트 작성의 기술',
    color: 'from-purple-500 to-pink-500',
    duration: '5강',
    students: 387,
    rating: 4.9,
    topics: ['프롬프트 기초', '고급 기법', '실전 활용'],
  },
  {
    id: 'career-development',
    title: 'AI 시대 커리어 개발',
    icon: '📈',
    description: 'AI 시대에도 살아남는 커리어 전략과 성장 로드맵',
    color: 'from-orange-500 to-red-500',
    duration: '5강',
    students: 298,
    rating: 4.7,
    topics: ['커리어 전략', '스킬 개발', '성장 로드맵'],
  },
  {
    id: 'portfolio-building',
    title: 'AI 활용 포트폴리오',
    icon: '🎨',
    description: 'AI를 활용하여 돋보이는 포트폴리오 만들기',
    color: 'from-cyan-500 to-blue-500',
    duration: '5강',
    students: 245,
    rating: 4.8,
    topics: ['포트폴리오 기획', 'AI 디자인', '취업 연계'],
  },
];

export default function BeginnerCoursePage() {
  const router = useRouter();
  const [userName, setUserName] = useState('사용자');
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
    router.push(`/course/beginner/${courseId}`);
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
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/courses" className="text-blue-200 hover:text-white text-sm">강좌 목록</Link>
            <ChevronRight className="w-4 h-4 text-blue-200" />
            <span className="text-sm">사회초년생 코스</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            💼 사회초년생 코스
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            AI 시대, 경쟁력 있는 직장인으로 성장하기<br />
            실무에 바로 적용 가능한 AI 활용 능력을 키워보세요!
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <BookOpen className="w-5 h-5" />
              <span>5개 강좌</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Clock className="w-5 h-5" />
              <span>강좌당 약 2-3시간</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Users className="w-5 h-5" />
              <span>1,700+ 수강생</span>
            </div>
          </div>
        </div>

        {/* 코스 목록 */}
        <div className="grid gap-6">
          {beginnerCourses.map((course) => (
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
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">📚 추천 학습 순서</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {beginnerCourses.map((course, idx) => (
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
