'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, Menu, X, ChevronRight, Users, BookOpen, Clock, Star, Play } from 'lucide-react';

// 진로 전환자 코스 데이터
const careerChangeCourses = [
  {
    id: 'find-field',
    title: '나에게 맞는 분야 찾기',
    icon: '🔍',
    description: 'AI와 함께 나의 강점과 적성에 맞는 새로운 분야 탐색',
    color: 'from-rose-500 to-pink-500',
    duration: '5강',
    students: 287,
    rating: 4.9,
    topics: ['자기 분석', '분야 탐색', '적합도 평가'],
  },
  {
    id: 'job-simulation',
    title: '직업 체험 시뮬레이션',
    icon: '🎮',
    description: 'AI로 가상 직업 체험하고 실제 업무 맛보기',
    color: 'from-violet-500 to-purple-500',
    duration: '5강',
    students: 342,
    rating: 4.8,
    topics: ['가상 체험', '업무 이해', '현실 점검'],
  },
  {
    id: 'new-skill',
    title: '새 분야 기초 역량',
    icon: '💪',
    description: 'AI 시대 전환에 필요한 핵심 역량 빠르게 쌓기',
    color: 'from-amber-500 to-orange-500',
    duration: '5강',
    students: 398,
    rating: 4.9,
    topics: ['디지털 역량', 'AI 활용', '학습 전략'],
  },
  {
    id: 'roadmap',
    title: '전환 로드맵 수립',
    icon: '🗺️',
    description: '현실적인 커리어 전환 계획 세우고 실행하기',
    color: 'from-teal-500 to-cyan-500',
    duration: '5강',
    students: 265,
    rating: 4.8,
    topics: ['단계별 계획', '리스크 관리', '실행 전략'],
  },
];

export default function CareerChangeCoursePage() {
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
    router.push(`/course/career-change/${courseId}`);
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
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/courses" className="text-rose-200 hover:text-white text-sm">강좌 목록</Link>
            <ChevronRight className="w-4 h-4 text-rose-200" />
            <span className="text-sm">진로 전환자 코스</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            🔄 진로 전환자 코스
          </h1>
          <p className="text-lg text-rose-100 mb-6">
            새로운 분야로의 도전, AI와 함께라면 두렵지 않습니다!<br />
            체계적인 탐색과 준비로 성공적인 커리어 전환을 시작하세요.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <BookOpen className="w-5 h-5" />
              <span>4개 강좌</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Clock className="w-5 h-5" />
              <span>강좌당 약 2-3시간</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Users className="w-5 h-5" />
              <span>1,200+ 수강생</span>
            </div>
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-8">
          <h3 className="font-semibold text-rose-900 mb-2">💡 진로 전환, 이렇게 시작하세요</h3>
          <p className="text-rose-800 text-sm">
            1단계: 나에게 맞는 분야 찾기 → 2단계: 직업 체험 시뮬레이션 → 3단계: 기초 역량 쌓기 → 4단계: 전환 로드맵 수립
          </p>
        </div>

        {/* 코스 목록 */}
        <div className="grid gap-6">
          {careerChangeCourses.map((course, index) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition">
              <div className="md:flex">
                {/* 왼쪽: 아이콘 및 단계 */}
                <div className={`md:w-48 p-6 bg-gradient-to-br ${course.color} flex flex-col items-center justify-center`}>
                  <span className="text-5xl mb-2">{course.icon}</span>
                  <span className="text-white/80 text-sm font-medium">STEP {index + 1}</span>
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

        {/* 추천 학습 순서 */}
        <div className="mt-12 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🚀 성공적인 전환을 위한 여정</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {careerChangeCourses.map((course, idx) => (
              <div key={course.id} className="text-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white text-xl font-bold`}>
                  {idx + 1}
                </div>
                <p className="text-2xl mb-1">{course.icon}</p>
                <h3 className="font-semibold text-gray-900 text-sm">{course.title}</h3>
                {idx < careerChangeCourses.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-6 text-sm">
            * 순서대로 학습하시면 더욱 효과적입니다. 자신의 상황에 맞게 선택하셔도 좋습니다!
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
