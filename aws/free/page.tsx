'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, Menu, X, ChevronRight, Users, BookOpen, Clock, Star, Play, Gift } from 'lucide-react';

// Free 체험 코스 데이터
const freeCourses = [
  {
    id: 'film-director',
    title: '영화 감독',
    icon: '🎬',
    description: 'AI와 함께 영화 제작의 세계를 체험하고 감독의 시선으로 작품 구상하기',
    color: 'from-red-500 to-rose-500',
    duration: '5강',
    students: 523,
    rating: 4.9,
    topics: ['시나리오 구상', '촬영 기법', '연출 체험'],
  },
  {
    id: 'renewable-energy',
    title: '신재생에너지발전설비기사',
    icon: '⚡',
    description: '신재생에너지 분야 자격증 준비와 실무 기초 지식 습득하기',
    color: 'from-green-500 to-emerald-500',
    duration: '5강',
    students: 412,
    rating: 4.8,
    topics: ['태양광/풍력', '시험 준비', '실무 기초'],
  },
  {
    id: 'elementary-teacher',
    title: '초등학교 선생님',
    icon: '👩‍🏫',
    description: 'AI로 초등교육 현장을 체험하고 수업 설계부터 학급 운영까지 경험하기',
    color: 'from-blue-500 to-cyan-500',
    duration: '5강',
    students: 687,
    rating: 4.9,
    topics: ['수업 설계', '학급 운영', '학생 상담'],
  },
  {
    id: 'welding-technician',
    title: '용접 기사',
    icon: '🔧',
    description: '용접 기술의 기초와 자격증 준비, 산업 현장 이해하기',
    color: 'from-orange-500 to-amber-500',
    duration: '5강',
    students: 298,
    rating: 4.7,
    topics: ['용접 기초', '자격증 준비', '현장 실무'],
  },
  {
    id: 'orchard-owner',
    title: '과수원 운영자',
    icon: '🍎',
    description: 'AI와 함께 과수원 창업부터 운영, 유통까지 농업 경영 체험하기',
    color: 'from-lime-500 to-green-500',
    duration: '5강',
    students: 356,
    rating: 4.8,
    topics: ['과수원 창업', '재배 기술', '유통 판매'],
  },
];

export default function FreeCoursePage() {
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
    router.push(`/course/free/${courseId}`);
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
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/courses" className="text-teal-200 hover:text-white text-sm">강좌 목록</Link>
            <ChevronRight className="w-4 h-4 text-teal-200" />
            <span className="text-sm">Free 체험</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Free 체험 코스
            </h1>
          </div>
          <p className="text-lg text-teal-100 mb-6">
            다양한 직업을 AI와 함께 무료로 체험해보세요!<br />
            간접 경험과 기초 지식으로 나에게 맞는 진로를 탐색합니다.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <BookOpen className="w-5 h-5" />
              <span>5개 직업 체험</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Clock className="w-5 h-5" />
              <span>강좌당 약 2-3시간</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Users className="w-5 h-5" />
              <span>2,200+ 수강생</span>
            </div>
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-8">
          <h3 className="font-semibold text-teal-900 mb-2">🎁 완전 무료로 체험하세요!</h3>
          <p className="text-teal-800 text-sm">
            각 직업별 5일 과정으로 구성되어 있습니다. 간접 경험 → 기초 지식 → 실무 체험 → 자격/진입 방법 → 커리어 로드맵 순서로 학습합니다.
          </p>
        </div>

        {/* 코스 목록 */}
        <div className="grid gap-6">
          {freeCourses.map((course, index) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition">
              <div className="md:flex">
                {/* 왼쪽: 아이콘 */}
                <div className={`md:w-48 p-6 bg-gradient-to-br ${course.color} flex flex-col items-center justify-center`}>
                  <span className="text-5xl mb-2">{course.icon}</span>
                  <span className="text-white/80 text-sm font-medium">무료 체험</span>
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
                    무료 체험하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 학습 방법 안내 */}
        <div className="mt-12 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">📚 이렇게 학습해요</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-xl font-bold">
                1
              </div>
              <p className="text-2xl mb-1">👀</p>
              <h3 className="font-semibold text-gray-900 text-sm">직업 이해</h3>
              <p className="text-xs text-gray-500">하루 일과 체험</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-xl font-bold">
                2
              </div>
              <p className="text-2xl mb-1">📖</p>
              <h3 className="font-semibold text-gray-900 text-sm">기초 지식</h3>
              <p className="text-xs text-gray-500">핵심 개념 학습</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-xl font-bold">
                3
              </div>
              <p className="text-2xl mb-1">🛠️</p>
              <h3 className="font-semibold text-gray-900 text-sm">실무 체험</h3>
              <p className="text-xs text-gray-500">AI와 실습</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-xl font-bold">
                4
              </div>
              <p className="text-2xl mb-1">🎯</p>
              <h3 className="font-semibold text-gray-900 text-sm">진입 방법</h3>
              <p className="text-xs text-gray-500">자격증/교육</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-xl font-bold">
                5
              </div>
              <p className="text-2xl mb-1">🗺️</p>
              <h3 className="font-semibold text-gray-900 text-sm">커리어 로드맵</h3>
              <p className="text-xs text-gray-500">성장 경로</p>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-6 text-sm">
            * 각 직업별 5일 과정으로 진행되며, AI와 대화하며 실제 업무를 체험합니다!
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
