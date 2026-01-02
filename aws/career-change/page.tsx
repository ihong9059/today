'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, Menu, X, ChevronRight, Users, BookOpen, Clock, Star, Play, Sparkles, Target, Rocket, TrendingUp, Lightbulb, CheckCircle2 } from 'lucide-react';

// AI 시대 진로 전환자 코스 데이터 - 8개 코스로 확장
const careerChangeCourses = [
  {
    id: 'self-discovery',
    title: '나를 다시 발견하기',
    icon: '🔍',
    description: 'AI 분석으로 나의 숨겨진 강점, 가치관, 열정을 재발견하고 새로운 가능성 탐색',
    color: 'from-rose-500 to-pink-500',
    duration: '5일',
    students: 456,
    rating: 4.9,
    topics: ['강점 분석', '가치관 탐색', '숨겨진 재능 발견'],
    highlight: '셀프 브랜딩 기초',
  },
  {
    id: 'ai-era-trends',
    title: 'AI 시대 유망 분야',
    icon: '🌟',
    description: 'AI가 만드는 새로운 직업과 사라지는 직업, 미래 유망 분야 트렌드 분석',
    color: 'from-violet-500 to-purple-500',
    duration: '5일',
    students: 521,
    rating: 4.8,
    topics: ['미래 직업 트렌드', 'AI 대체 불가 영역', '신규 유망 분야'],
    highlight: '2025 최신 트렌드',
  },
  {
    id: 'ai-skills',
    title: 'AI 활용 필수 역량',
    icon: '🤖',
    description: 'ChatGPT, Claude, 미드저니 등 AI 도구 마스터하고 생산성 10배 높이기',
    color: 'from-blue-500 to-cyan-500',
    duration: '5일',
    students: 687,
    rating: 4.9,
    topics: ['AI 도구 실습', '프롬프트 엔지니어링', 'AI 협업 전략'],
    highlight: '실전 활용 중심',
  },
  {
    id: 'new-field-entry',
    title: '새 분야 진입 전략',
    icon: '🎯',
    description: '경력 전환자를 위한 새 분야 진입 노하우, 이력서/포트폴리오 전략',
    color: 'from-amber-500 to-orange-500',
    duration: '5일',
    students: 398,
    rating: 4.8,
    topics: ['스킬 갭 분석', '학습 로드맵', '네트워킹 전략'],
    highlight: '실전 취업 전략',
  },
  {
    id: 'digital-career',
    title: '디지털 커리어 설계',
    icon: '💻',
    description: '원격근무, 디지털 노마드, 하이브리드 워크 등 새로운 일의 방식 탐색',
    color: 'from-teal-500 to-emerald-500',
    duration: '5일',
    students: 342,
    rating: 4.7,
    topics: ['원격근무 준비', '디지털 도구 마스터', '온라인 협업'],
    highlight: '유연한 근무 형태',
  },
  {
    id: 'creator-economy',
    title: '크리에이터 경제 입문',
    icon: '🎨',
    description: '유튜브, 블로그, 뉴스레터 등 1인 미디어로 수익 창출하는 방법',
    color: 'from-pink-500 to-rose-500',
    duration: '5일',
    students: 476,
    rating: 4.9,
    topics: ['콘텐츠 전략', '수익화 모델', 'AI 콘텐츠 제작'],
    highlight: 'AI 활용 콘텐츠 제작',
  },
  {
    id: 'freelance-startup',
    title: '프리랜서/창업 준비',
    icon: '🚀',
    description: 'AI 시대 1인 사업, 프리랜서, 소규모 창업을 위한 실전 가이드',
    color: 'from-indigo-500 to-violet-500',
    duration: '5일',
    students: 289,
    rating: 4.8,
    topics: ['사업 모델 수립', '고객 확보', '비용 최소화 전략'],
    highlight: 'AI로 비용 절감',
  },
  {
    id: 'transition-roadmap',
    title: '전환 로드맵 수립',
    icon: '🗺️',
    description: '3개월, 6개월, 1년 단계별 실행 계획 수립과 리스크 관리',
    color: 'from-slate-600 to-gray-700',
    duration: '5일',
    students: 365,
    rating: 4.9,
    topics: ['단계별 목표', '리스크 관리', '실행 계획'],
    highlight: '맞춤형 로드맵',
  },
];

// 학습 여정 단계
const learningJourney = [
  { phase: '탐색', courses: ['self-discovery', 'ai-era-trends'], description: '나와 시장 이해하기' },
  { phase: '준비', courses: ['ai-skills', 'new-field-entry'], description: '역량과 전략 갖추기' },
  { phase: '실행', courses: ['digital-career', 'creator-economy', 'freelance-startup'], description: '새로운 커리어 시작' },
  { phase: '완성', courses: ['transition-roadmap'], description: '체계적인 실행' },
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
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/courses" className="text-purple-200 hover:text-white text-sm">강좌 목록</Link>
              <ChevronRight className="w-4 h-4 text-purple-200" />
              <span className="text-sm">진로 전환자 코스</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <h1 className="text-3xl md:text-4xl font-bold">AI 시대 진로 전환 마스터</h1>
            </div>

            <p className="text-lg text-purple-100 mb-6 max-w-2xl">
              AI가 바꾸는 세상, 두려움 대신 기회로!<br />
              체계적인 8단계 과정으로 성공적인 커리어 전환을 완성하세요.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                <BookOpen className="w-5 h-5" />
                <span>8개 코스</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                <Clock className="w-5 h-5" />
                <span>총 40강 (코스당 5일)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                <Users className="w-5 h-5" />
                <span>3,500+ 수강생</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-400 text-purple-900 rounded-lg px-4 py-2 font-semibold">
                <Rocket className="w-5 h-5" />
                <span>2025 신규 개편</span>
              </div>
            </div>
          </div>
        </div>

        {/* 이런 분께 추천합니다 */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            이런 분께 추천합니다
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'AI 시대에 현재 직업의 미래가 불안한 분',
              '새로운 분야로 이직/전직을 고민하는 분',
              '경력 단절 후 새로운 시작을 준비하는 분',
              '프리랜서/창업으로 독립을 꿈꾸는 분',
              'AI를 활용한 새로운 커리어를 원하는 분',
              '디지털 노마드 라이프를 꿈꾸는 분',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-amber-800">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 학습 여정 */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            학습 여정 가이드
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {learningJourney.map((journey, idx) => (
              <div key={journey.phase} className="relative">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <h3 className="font-bold text-purple-900">{journey.phase}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{journey.description}</p>
                  <div className="space-y-1">
                    {journey.courses.map(courseId => {
                      const course = careerChangeCourses.find(c => c.id === courseId);
                      return course ? (
                        <div key={courseId} className="text-xs text-purple-700 flex items-center gap-1">
                          <span>{course.icon}</span>
                          <span>{course.title}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
                {idx < learningJourney.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-4 h-4 text-purple-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 코스 목록 */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-500" />
          전체 코스 목록
        </h2>

        <div className="grid gap-4">
          {careerChangeCourses.map((course, index) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition group">
              <div className="md:flex">
                <div className={`md:w-40 p-4 bg-gradient-to-br ${course.color} flex flex-col items-center justify-center`}>
                  <span className="text-4xl mb-1">{course.icon}</span>
                  <span className="text-white/90 text-xs font-medium bg-white/20 px-2 py-1 rounded">DAY 1-5</span>
                </div>

                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">STEP {index + 1}</span>
                        {course.highlight && (
                          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{course.highlight}</span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{course.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {course.topics.map((topic) => (
                      <span key={topic} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {course.students}명
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {course.rating}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 md:w-48 flex flex-col justify-center">
                  <button
                    onClick={() => handleStartCourse(course.id)}
                    className={`w-full py-2.5 bg-gradient-to-r ${course.color} text-white font-semibold rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 text-sm`}
                  >
                    <Play className="w-4 h-4" />
                    시작하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 수강 후기 */}
        <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">💬 수강생 후기</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: '김○○',
                role: '전직 마케터 → AI 컨설턴트',
                comment: 'AI 도구 활용법을 배우고 3개월 만에 새 분야로 이직했어요. 체계적인 로드맵이 큰 도움이 됐습니다.',
              },
              {
                name: '이○○',
                role: '경력단절 5년 → 콘텐츠 크리에이터',
                comment: '막막했던 재취업 대신 1인 미디어 창업을 선택했어요. 이제 월 수익이 이전 직장보다 높아요!',
              },
              {
                name: '박○○',
                role: '회사원 → 프리랜서 개발자',
                comment: 'AI 시대에 맞는 스킬셋을 쌓고 프리랜서로 독립했습니다. 시간적 자유가 생겼어요.',
              },
            ].map((review, idx) => (
              <div key={idx} className="bg-white/10 rounded-xl p-5">
                <p className="text-gray-200 text-sm mb-4">"{review.comment}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI 시대 전환 체크리스트 */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">✅ AI 시대 커리어 전환 체크리스트</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              '나의 강점과 열정을 AI 관점에서 재분석했다',
              'AI 대체 불가능한 나만의 역량을 파악했다',
              'ChatGPT, Claude 등 AI 도구를 자유롭게 활용한다',
              '새로운 분야 진입을 위한 구체적 로드맵이 있다',
              '디지털 환경에서 일할 준비가 되어 있다',
              '수익 창출 채널을 2개 이상 확보했다',
              '프리랜서/창업 시 필요한 기초 지식이 있다',
              '3개월, 6개월, 1년 단위 실행 계획이 있다',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                <div className="w-6 h-6 border-2 border-purple-300 rounded flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-6 text-sm">
            이 코스를 완료하면 모든 항목에 체크할 수 있습니다!
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
