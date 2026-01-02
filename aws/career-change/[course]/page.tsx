'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronRight, Play, Clock, CheckCircle, Lock, BookOpen, Star, ArrowLeft } from 'lucide-react';

// 코스 데이터 정의
const courseData: { [key: string]: {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  longDescription: string;
  lessons: {
    day: number;
    title: string;
    duration: string;
    description: string;
  }[];
}} = {
  'self-discovery': {
    id: 'self-discovery',
    title: '나를 다시 발견하기',
    icon: '🔍',
    color: 'from-rose-500 to-pink-500',
    description: 'AI 분석으로 나의 숨겨진 강점, 가치관, 열정을 재발견하고 새로운 가능성 탐색',
    longDescription: '진로 전환의 첫 걸음은 나 자신을 제대로 이해하는 것입니다. AI와 함께 과거 경험을 분석하고, 숨겨진 강점과 재능을 발견하며, 진정으로 원하는 것이 무엇인지 탐구합니다. 이 과정을 통해 새로운 커리어의 방향을 설정할 수 있습니다.',
    lessons: [
      { day: 1, title: '과거 경험에서 강점 찾기', duration: '35분', description: 'AI와 함께 지금까지의 경험을 분석하고 숨겨진 강점 발굴' },
      { day: 2, title: '핵심 가치관 탐색', duration: '30분', description: '일과 삶에서 가장 중요하게 여기는 가치 발견하기' },
      { day: 3, title: '열정과 관심사 매핑', duration: '35분', description: '시간 가는 줄 모르고 몰입하는 분야 찾기' },
      { day: 4, title: '성격 유형과 일의 궁합', duration: '30분', description: 'MBTI, 에니어그램 등으로 적합한 업무 스타일 파악' },
      { day: 5, title: '셀프 브랜딩 시작하기', duration: '40분', description: '나만의 고유한 가치 제안(Value Proposition) 만들기' }
    ],
  },
  'ai-era-trends': {
    id: 'ai-era-trends',
    title: 'AI 시대 유망 분야',
    icon: '🌟',
    color: 'from-violet-500 to-purple-500',
    description: 'AI가 만드는 새로운 직업과 사라지는 직업, 미래 유망 분야 트렌드 분석',
    longDescription: 'AI로 인해 직업 시장이 급변하고 있습니다. 어떤 직업이 사라지고, 어떤 새로운 직업이 생겨나는지 분석합니다. AI와 공존할 수 있는 유망 분야를 탐색하고, 미래에도 경쟁력을 유지할 수 있는 커리어 방향을 설계합니다.',
    lessons: [
      { day: 1, title: 'AI가 바꾸는 직업 세계', duration: '35분', description: 'AI 자동화로 변화하는 산업과 직업군 분석' },
      { day: 2, title: 'AI 대체 불가능한 영역', duration: '30분', description: '인간만이 할 수 있는 영역과 AI 협업 전략' },
      { day: 3, title: '2025년 유망 직종 분석', duration: '40분', description: 'AI 프롬프트 엔지니어, 데이터 분석가 등 신규 직종' },
      { day: 4, title: '산업별 전환 기회 탐색', duration: '35분', description: 'IT, 헬스케어, 교육, 콘텐츠 등 분야별 기회' },
      { day: 5, title: '나만의 니치 마켓 찾기', duration: '35분', description: 'AI 시대에 차별화된 포지션 발굴하기' }
    ],
  },
  'ai-skills': {
    id: 'ai-skills',
    title: 'AI 활용 필수 역량',
    icon: '🤖',
    color: 'from-blue-500 to-cyan-500',
    description: 'ChatGPT, Claude, 미드저니 등 AI 도구 마스터하고 생산성 10배 높이기',
    longDescription: 'AI 시대의 핵심 역량은 AI 도구를 능숙하게 다루는 것입니다. ChatGPT, Claude, 미드저니, Notion AI 등 주요 AI 도구의 활용법을 배우고, 프롬프트 엔지니어링 기초부터 실무 적용까지 익힙니다.',
    lessons: [
      { day: 1, title: 'ChatGPT 완전 정복', duration: '40분', description: '대화형 AI의 기본부터 고급 프롬프트까지' },
      { day: 2, title: 'Claude AI 활용법', duration: '35분', description: '긴 문서 분석, 코드 작성, 창의적 글쓰기' },
      { day: 3, title: '이미지 생성 AI 마스터', duration: '40분', description: '미드저니, DALL-E, Stable Diffusion 활용' },
      { day: 4, title: '업무 자동화 AI 도구', duration: '35분', description: 'Notion AI, Zapier, 자동화 워크플로우 구축' },
      { day: 5, title: 'AI 협업 프로젝트 실습', duration: '45분', description: 'AI를 활용한 실제 프로젝트 진행해보기' }
    ],
  },
  'new-field-entry': {
    id: 'new-field-entry',
    title: '새 분야 진입 전략',
    icon: '🎯',
    color: 'from-amber-500 to-orange-500',
    description: '경력 전환자를 위한 새 분야 진입 노하우, 이력서/포트폴리오 전략',
    longDescription: '새로운 분야로 전환하려면 전략적인 접근이 필요합니다. 스킬 갭 분석, 효율적인 학습 방법, 경력 전환자를 위한 이력서와 포트폴리오 작성법, 네트워킹 전략까지 실질적인 진입 방법을 배웁니다.',
    lessons: [
      { day: 1, title: '스킬 갭 분석하기', duration: '35분', description: '현재 역량과 목표 분야 요구 역량 비교 분석' },
      { day: 2, title: '효율적인 학습 로드맵', duration: '30분', description: '최소 시간 투자로 최대 효과를 내는 학습 전략' },
      { day: 3, title: '경력 전환자 이력서 작성', duration: '40분', description: '기존 경력을 새 분야에 맞게 재구성하기' },
      { day: 4, title: '포트폴리오 전략', duration: '35분', description: 'AI로 빠르게 포트폴리오 만들고 어필하기' },
      { day: 5, title: '네트워킹과 기회 창출', duration: '35분', description: 'LinkedIn, 커뮤니티 활용 네트워킹 전략' }
    ],
  },
  'digital-career': {
    id: 'digital-career',
    title: '디지털 커리어 설계',
    icon: '💻',
    color: 'from-teal-500 to-emerald-500',
    description: '원격근무, 디지털 노마드, 하이브리드 워크 등 새로운 일의 방식 탐색',
    longDescription: '코로나 이후 일하는 방식이 완전히 바뀌었습니다. 원격근무, 디지털 노마드, 하이브리드 워크 등 새로운 일의 방식을 이해하고, 디지털 환경에서 효과적으로 일하는 방법을 배웁니다.',
    lessons: [
      { day: 1, title: '원격근무 완전 가이드', duration: '35분', description: '효과적인 재택근무를 위한 환경과 습관 만들기' },
      { day: 2, title: '디지털 협업 도구 마스터', duration: '30분', description: 'Slack, Notion, Zoom 등 협업 도구 활용법' },
      { day: 3, title: '디지털 노마드 생활 설계', duration: '40분', description: '장소에 구애받지 않고 일하는 법' },
      { day: 4, title: '온라인 존재감 구축', duration: '35분', description: '개인 브랜드 온라인 채널 구축하기' },
      { day: 5, title: '글로벌 일자리 찾기', duration: '35분', description: '해외 원격 일자리 플랫폼과 지원 전략' }
    ],
  },
  'creator-economy': {
    id: 'creator-economy',
    title: '크리에이터 경제 입문',
    icon: '🎨',
    color: 'from-pink-500 to-rose-500',
    description: '유튜브, 블로그, 뉴스레터 등 1인 미디어로 수익 창출하는 방법',
    longDescription: '크리에이터 경제가 급성장하고 있습니다. 유튜브, 블로그, 뉴스레터, 온라인 강의 등 다양한 콘텐츠 채널을 활용해 수익을 창출하는 방법을 배웁니다. AI를 활용한 효율적인 콘텐츠 제작법도 함께 익힙니다.',
    lessons: [
      { day: 1, title: '크리에이터 경제 이해', duration: '30분', description: '콘텐츠로 수익을 만드는 다양한 비즈니스 모델' },
      { day: 2, title: '나만의 콘텐츠 주제 찾기', duration: '35분', description: '전문성과 관심사를 콘텐츠로 연결하기' },
      { day: 3, title: 'AI로 콘텐츠 제작하기', duration: '40분', description: 'ChatGPT, 미드저니로 콘텐츠 효율적으로 만들기' },
      { day: 4, title: '수익화 채널 구축', duration: '35분', description: '유튜브, 블로그, 뉴스레터 시작하기' },
      { day: 5, title: '지속 가능한 크리에이터 전략', duration: '35분', description: '번아웃 없이 꾸준히 콘텐츠 생산하는 법' }
    ],
  },
  'freelance-startup': {
    id: 'freelance-startup',
    title: '프리랜서/창업 준비',
    icon: '🚀',
    color: 'from-indigo-500 to-violet-500',
    description: 'AI 시대 1인 사업, 프리랜서, 소규모 창업을 위한 실전 가이드',
    longDescription: 'AI 시대에는 1인 사업의 진입 장벽이 낮아졌습니다. 프리랜서로 독립하거나 소규모 창업을 준비하는 방법을 배웁니다. AI를 활용해 비용을 줄이고, 효율적으로 사업을 운영하는 전략을 익힙니다.',
    lessons: [
      { day: 1, title: '프리랜서 vs 창업 선택', duration: '30분', description: '나에게 맞는 독립 형태 결정하기' },
      { day: 2, title: '1인 사업 아이템 발굴', duration: '35분', description: 'AI 시대 유망한 1인 사업 아이템 탐색' },
      { day: 3, title: 'AI로 비용 절감하기', duration: '40분', description: 'AI로 마케팅, 고객응대, 컨텐츠 제작 자동화' },
      { day: 4, title: '첫 고객 확보 전략', duration: '35분', description: '초기 고객 발굴과 레퍼런스 만들기' },
      { day: 5, title: '사업 확장과 시스템 구축', duration: '35분', description: '지속 가능한 수익 구조 만들기' }
    ],
  },
  'transition-roadmap': {
    id: 'transition-roadmap',
    title: '전환 로드맵 수립',
    icon: '🗺️',
    color: 'from-slate-600 to-gray-700',
    description: '3개월, 6개월, 1년 단계별 실행 계획 수립과 리스크 관리',
    longDescription: '성공적인 커리어 전환을 위해서는 체계적인 로드맵이 필요합니다. 3개월, 6개월, 1년 단위의 구체적인 목표와 실행 계획을 세우고, 리스크를 관리하며 전환을 완성하는 방법을 배웁니다.',
    lessons: [
      { day: 1, title: '전환 목표 구체화', duration: '30분', description: 'SMART 기법으로 명확한 목표 설정하기' },
      { day: 2, title: '3개월 단기 계획', duration: '35분', description: '즉시 실행 가능한 액션 플랜 수립' },
      { day: 3, title: '6개월 중기 계획', duration: '35분', description: '역량 개발과 기회 탐색 로드맵' },
      { day: 4, title: '리스크 관리 전략', duration: '30분', description: '수입 공백 대비, 실패 시 플랜 B 준비' },
      { day: 5, title: '1년 로드맵 완성', duration: '40분', description: '전환 완료까지의 통합 실행 계획' }
    ],
  }
};

export default function CareerChangeCourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.course as string;
  const [userName, setUserName] = useState('사용자');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const course = courseData[courseId];

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }

    // 완료된 레슨 로드
    const savedProgress = localStorage.getItem(`career-change-${courseId}-progress`);
    if (savedProgress) {
      setCompletedLessons(JSON.parse(savedProgress));
    }
  }, [courseId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleStartLesson = (day: number) => {
    router.push(`/course/career-change/${courseId}/lesson/${day}`);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">코스를 찾을 수 없습니다</h1>
          <Link href="/course/career-change" className="text-purple-600 hover:underline">
            코스 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const progress = course.lessons.length > 0
    ? Math.round((completedLessons.length / course.lessons.length) * 100)
    : 0;

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
        {/* 뒤로가기 */}
        <Link href="/course/career-change" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          코스 목록으로 돌아가기
        </Link>

        {/* 코스 헤더 */}
        <div className={`bg-gradient-to-r ${course.color} rounded-2xl p-8 mb-8 text-white`}>
          <div className="flex items-center gap-2 mb-4 text-white/80">
            <Link href="/courses" className="hover:text-white text-sm">강좌 목록</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/course/career-change" className="hover:text-white text-sm">진로 전환자 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-sm">{course.title}</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{course.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-white/80 mt-1">{course.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <BookOpen className="w-5 h-5" />
              <span>{course.lessons.length}강</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Clock className="w-5 h-5" />
              <span>5일 과정</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Star className="w-5 h-5" />
              <span>4.9 평점</span>
            </div>
          </div>
        </div>

        {/* 진행률 */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900">학습 진행률</h3>
            <span className="text-purple-600 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`bg-gradient-to-r ${course.color} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {completedLessons.length}개 / {course.lessons.length}개 강의 완료
          </p>
        </div>

        {/* 코스 소개 */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">코스 소개</h2>
          <p className="text-gray-600 leading-relaxed">{course.longDescription}</p>
        </div>

        {/* 레슨 목록 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">커리큘럼</h2>
          </div>
          <div className="divide-y">
            {course.lessons.map((lesson, idx) => {
              const isCompleted = completedLessons.includes(lesson.day);
              const isLocked = idx > 0 && !completedLessons.includes(course.lessons[idx - 1].day) && !isCompleted;

              return (
                <div
                  key={lesson.day}
                  className={`p-5 hover:bg-gray-50 transition cursor-pointer ${isLocked ? 'opacity-60' : ''}`}
                  onClick={() => !isLocked && handleStartLesson(lesson.day)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-100 text-green-600'
                        : isLocked
                        ? 'bg-gray-100 text-gray-400'
                        : `bg-gradient-to-br ${course.color} text-white`
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : isLocked ? (
                        <Lock className="w-5 h-5" />
                      ) : (
                        <span className="font-bold">{lesson.day}</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                          DAY {lesson.day}
                        </span>
                        {isCompleted && (
                          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                            완료
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mt-1">{lesson.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {lesson.duration}
                      </span>
                      {!isLocked && (
                        <button className={`px-4 py-2 rounded-lg font-medium text-sm ${
                          isCompleted
                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            : `bg-gradient-to-r ${course.color} text-white hover:opacity-90`
                        } transition flex items-center gap-2`}>
                          <Play className="w-4 h-4" />
                          {isCompleted ? '다시 보기' : '시작하기'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 UTTEC Edu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
