'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, Menu, X, ChevronRight, Users, BookOpen, Clock, Star, Play } from 'lucide-react';

// 교사/교육자 코스 - 학교급별 분류
const teacherLevels = [
  {
    id: 'elementary',
    title: '초등교사 코스',
    icon: '🌱',
    description: '초등학생 눈높이에 맞는 AI 활용 수업 설계',
    color: 'from-green-500 to-emerald-500',
    duration: '5개 강좌',
    students: 234,
    rating: 4.9,
    topics: ['초등 AI 교육', '놀이 기반 학습', '창의력 개발'],
    features: [
      '초등학생 발달 단계에 맞는 AI 교육',
      '게임/놀이 기반 AI 수업 설계',
      '학부모 소통 및 협력 방법',
    ],
  },
  {
    id: 'middle',
    title: '중등교사 코스',
    icon: '📚',
    description: '중학생 진로탐색과 AI 융합 수업 전략',
    color: 'from-blue-500 to-indigo-500',
    duration: '5개 강좌',
    students: 312,
    rating: 4.8,
    topics: ['진로 탐색', 'AI 융합 수업', '자유학기제'],
    features: [
      '자유학기제 AI 프로그램 설계',
      '교과 연계 AI 활용 수업',
      '진로 탐색 AI 도구 활용',
    ],
  },
  {
    id: 'high',
    title: '고등교사 코스',
    icon: '🎓',
    description: '고등학생 진로/진학 지도와 심화 AI 교육',
    color: 'from-purple-500 to-pink-500',
    duration: '5개 강좌',
    students: 278,
    rating: 4.9,
    topics: ['진로진학', 'AI 심화 교육', '생기부 작성'],
    features: [
      '대입 연계 진로 지도 전략',
      '생활기록부 AI 활용 지도',
      '교과 심화 AI 프로젝트',
    ],
  },
];

export default function TeacherCoursePage() {
  const router = useRouter();
  const [userName, setUserName] = useState('선생님');
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

  const handleStartLevel = (levelId: string) => {
    router.push(`/course/teacher/${levelId}`);
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
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/courses" className="text-amber-200 hover:text-white text-sm">강좌 목록</Link>
            <ChevronRight className="w-4 h-4 text-amber-200" />
            <span className="text-sm">교사/교육자 코스</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            📚 교사/교육자 코스
          </h1>
          <p className="text-lg text-amber-100 mb-6">
            학교급별 맞춤형 AI 활용 교육 전문가 양성<br />
            초등/중등/고등 교사를 위한 실전 AI 수업 설계!
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <BookOpen className="w-5 h-5" />
              <span>3개 학교급</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Clock className="w-5 h-5" />
              <span>각 5개 강좌</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Users className="w-5 h-5" />
              <span>800+ 교육자</span>
            </div>
          </div>
        </div>

        {/* 학교급 선택 안내 */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
          <h3 className="font-semibold text-amber-900 mb-2">🎯 나에게 맞는 코스를 선택하세요</h3>
          <p className="text-amber-800 text-sm">
            각 학교급의 특성에 맞는 AI 활용 교육 콘텐츠를 제공합니다.
            담당 학교급을 선택하여 맞춤형 수업 설계 역량을 키워보세요!
          </p>
        </div>

        {/* 학교급별 코스 목록 */}
        <div className="grid gap-6">
          {teacherLevels.map((level) => (
            <div key={level.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition">
              <div className="md:flex">
                {/* 왼쪽: 아이콘 */}
                <div className={`md:w-48 p-6 bg-gradient-to-br ${level.color} flex items-center justify-center`}>
                  <span className="text-6xl">{level.icon}</span>
                </div>

                {/* 중앙: 정보 */}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{level.title}</h3>
                  <p className="text-gray-600 mb-4">{level.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {level.topics.map((topic) => (
                      <span key={topic} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    {level.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {level.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {level.students}명 수강
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {level.rating}
                    </span>
                  </div>
                </div>

                {/* 오른쪽: 시작 버튼 */}
                <div className="p-6 bg-gray-50 md:w-64 flex flex-col justify-center">
                  <button
                    onClick={() => handleStartLevel(level.id)}
                    className={`w-full py-3 bg-gradient-to-r ${level.color} text-white font-semibold rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2`}
                  >
                    <Play className="w-5 h-5" />
                    코스 시작하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 코스 구성 안내 */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">📖 각 코스 구성</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📖</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">1. 교육학 기초</h3>
              <p className="text-xs text-gray-500 mt-1">학교급별 발달 이해</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🎓</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">2. 효과적인 교수법</h3>
              <p className="text-xs text-gray-500 mt-1">AI 활용 수업 기법</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📝</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">3. AI 자료 제작</h3>
              <p className="text-xs text-gray-500 mt-1">교육 자료 AI 제작</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🏫</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">4. 수업 설계</h3>
              <p className="text-xs text-gray-500 mt-1">실전 수업 설계</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📁</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">5. 포트폴리오</h3>
              <p className="text-xs text-gray-500 mt-1">교육 콘텐츠 정리</p>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-6 text-sm">
            * 각 강좌는 5일 과정이며, 학교급별 특성에 맞는 콘텐츠로 구성됩니다.
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
