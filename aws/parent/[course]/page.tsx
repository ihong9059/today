'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  Brain,
  Menu,
  X,
  Play,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Video,
} from 'lucide-react';

// 단일 코스 데이터 (레벨 없음)
const courseData: Record<string, any> = {
  'ai-understanding': {
    title: 'AI 시대 이해하기',
    subtitle: 'AI란 무엇인가? 우리 삶을 바꾸는 인공지능의 기초',
    icon: '🤖',
    color: 'from-blue-500 to-indigo-500',
    liveInfo: {
      schedule: '매주 월요일 8PM | AI 기초 개념 강의',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: '지금 바로 AI의 세계로 들어가세요! 🚀',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: AI 기초 개념 (Day 1-3)',
        subtitle: 'AI의 정의부터 역사까지 - 인공지능 첫걸음',
        icon: '📚',
        lessons: [
          { day: 1, title: 'AI란 무엇인가?', description: '인공지능의 정의 | 머신러닝과 딥러닝 | 일상 속 AI 사례', hasQuiz: true },
          { day: 2, title: 'AI의 역사와 발전', description: 'AI의 탄생 | 주요 이정표 | 현재와 미래', hasQuiz: true },
          { day: 3, title: 'AI가 할 수 있는 것들', description: '이미지 인식 | 자연어 처리 | 추천 시스템', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: AI와 우리 삶 (Day 4-5)',
        subtitle: 'AI가 바꾸는 일상과 미래',
        icon: '🏠',
        lessons: [
          { day: 4, title: 'AI와 일상생활', description: '스마트홈 | 자율주행 | 개인비서', hasQuiz: true },
          { day: 5, title: 'AI 시대 준비하기', description: 'AI 리터러시 | 미래 직업 | 올바른 AI 활용', hasQuiz: true },
        ],
      },
    ],
  },
  'career-exploration': {
    title: 'AI와 함께하는 진로 탐색',
    subtitle: '내 아이에게 맞는 진로 찾기 - AI 활용 진로 탐색',
    icon: '🎯',
    color: 'from-teal-500 to-cyan-500',
    liveInfo: {
      schedule: '매주 수요일 8PM | 진로 탐색 워크샵',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: 'AI와 함께 진로를 탐색해보세요! 🚀',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 진로 탐색 기초 (Day 1-3)',
        subtitle: '진로의 의미와 탐색 방법',
        icon: '🔍',
        lessons: [
          { day: 1, title: '진로란 무엇인가?', description: '진로의 정의 | 진로 vs 직업 | 진로 발달 단계', hasQuiz: true },
          { day: 2, title: 'AI로 직업 세계 탐험', description: 'AI 활용 직업 정보 검색 | 미래 직업 | 새로운 직종', hasQuiz: true },
          { day: 3, title: '자녀 성향 파악하기', description: '흥미 탐색 | 적성 발견 | 가치관 이해', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 진로 대화법 (Day 4-5)',
        subtitle: '자녀와 효과적인 진로 대화',
        icon: '💬',
        lessons: [
          { day: 4, title: '진로 대화의 기술', description: '경청하기 | 질문하기 | 공감하기', hasQuiz: true },
          { day: 5, title: 'AI와 함께 진로 시뮬레이션', description: '직업 체험 시뮬레이션 | 하루 일과 체험 | 역할극', hasQuiz: true },
        ],
      },
    ],
  },
  'mbti-career': {
    title: 'MBTI로 알아보는 직업',
    subtitle: 'MBTI 성격유형으로 진로 방향 찾기',
    icon: '🧠',
    color: 'from-indigo-500 to-purple-500',
    liveInfo: {
      schedule: '매주 목요일 8PM | MBTI 성격 분석',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: 'MBTI로 나만의 진로를 찾아보세요! 🚀',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: MBTI 기초 (Day 1-3)',
        subtitle: 'MBTI 이해하기',
        icon: '📖',
        lessons: [
          { day: 1, title: 'MBTI란 무엇인가?', description: '4가지 선호지표 | 16가지 유형 | 성격 이해', hasQuiz: true },
          { day: 2, title: '나의 MBTI 알아보기', description: 'MBTI 검사 | 결과 해석 | 유형 특성', hasQuiz: true },
          { day: 3, title: '자녀의 MBTI 파악하기', description: '행동 관찰 | 대화 패턴 | 학습 스타일', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: MBTI와 직업 (Day 4-5)',
        subtitle: '성격유형과 적합 직업',
        icon: '💼',
        lessons: [
          { day: 4, title: 'MBTI 유형별 적합 직업', description: '16유형별 직업군 | 강점 활용 | 적합도', hasQuiz: true },
          { day: 5, title: 'AI로 MBTI 진로 상담', description: 'AI 진로 상담 | 맞춤 추천 | 심층 분석', hasQuiz: true },
        ],
      },
    ],
  },
  'future-jobs': {
    title: '미래 유망 직종 안내',
    subtitle: 'AI 시대 새로운 직업의 세계 - 자녀에게 알려줄 미래 직업',
    icon: '🚀',
    color: 'from-orange-500 to-red-500',
    liveInfo: {
      schedule: '매주 금요일 8PM | 미래 직업 트렌드',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: '미래 직업 세계를 탐험해보세요! 🚀',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 미래 직업 트렌드 (Day 1-3)',
        subtitle: '변화하는 직업 세계',
        icon: '🔮',
        lessons: [
          { day: 1, title: '일자리의 미래', description: '4차 산업혁명 | 자동화 | 새로운 일자리', hasQuiz: true },
          { day: 2, title: 'AI 관련 직종', description: 'AI 엔지니어 | 데이터 사이언티스트 | 프롬프트 엔지니어', hasQuiz: true },
          { day: 3, title: '그린 & 지속가능 직종', description: '친환경 에너지 | ESG 전문가 | 순환경제', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 새로운 직업군 (Day 4-5)',
        subtitle: '알려지지 않은 미래 직업',
        icon: '✨',
        lessons: [
          { day: 4, title: '헬스케어 & 바이오', description: '원격의료 | 유전체 분석 | 디지털 치료', hasQuiz: true },
          { day: 5, title: '크리에이터 이코노미', description: '콘텐츠 크리에이터 | 메타버스 설계 | NFT 아티스트', hasQuiz: true },
        ],
      },
    ],
  },
  'ai-tools': {
    title: 'AI 도구 활용법',
    subtitle: 'Gemini와 ChatGPT 활용 - 효과적인 AI 대화와 일상 생산성 향상',
    icon: '💬',
    color: 'from-emerald-500 to-teal-500',
    liveInfo: {
      schedule: '매주 토요일 8PM | AI 도구 실습',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: 'AI 도구를 마스터해보세요! 🚀',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: AI 도구 시작하기 (Day 1-2)',
        subtitle: 'Gemini와 ChatGPT 기본 사용법',
        icon: '🚀',
        lessons: [
          { day: 1, title: 'Gemini 시작하기', description: 'Gemini 소개 | 기본 사용법 | 활용 팁', hasQuiz: true },
          { day: 2, title: 'ChatGPT 시작하기', description: 'ChatGPT 소개 | 기본 사용법 | 활용 팁', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: AI 실전 활용 (Day 3-5)',
        subtitle: '일상과 학습에서 AI 활용하기',
        icon: '💡',
        lessons: [
          { day: 3, title: '자녀 학습에 AI 활용하기', description: '숙제 도움 | 자녀와 대화 | 사용 규칙', hasQuiz: true },
          { day: 4, title: '일상생활에 AI 활용하기', description: '요리 | 여행 계획 | 생산성 향상', hasQuiz: true },
          { day: 5, title: 'AI 활용 실전 프로젝트', description: '가족 독서 | 자기계발 | AI 활용 계획', hasQuiz: true },
        ],
      },
    ],
  },
};

// 레슨 카드 컴포넌트
function LessonCard({ lesson, courseId, courseInfo }: { lesson: any; courseId: string; courseInfo: any }) {
  return (
    <Link
      href={`/course/parent/${courseId}/lesson/${lesson.day}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:border-blue-300 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <Play className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm font-medium text-gray-500">Day {lesson.day}</span>
            </div>
            {lesson.hasQuiz && (
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                퀴즈 포함
              </span>
            )}
          </div>

          <h4 className="font-semibold text-gray-900 mb-2">{lesson.title}</h4>
          <p className="text-sm text-gray-500 mb-4">{lesson.description}</p>

          <span className="flex items-center gap-2 text-blue-600 font-medium text-sm">
            학습 시작하기
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// 파트 섹션 컴포넌트
function PartSection({ part, courseId, courseInfo }: { part: any; courseId: string; courseInfo: any }) {
  return (
    <section className="mb-8">
      <div className={`bg-gradient-to-r ${courseInfo.color} rounded-xl p-5 mb-6`}>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          {part.icon} {part.title}
        </h3>
        <p className="text-white/80 text-sm mt-1">{part.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {part.lessons.map((lesson: any) => (
          <LessonCard key={lesson.day} lesson={lesson} courseId={courseId} courseInfo={courseInfo} />
        ))}
      </div>
    </section>
  );
}

export default function SingleCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.course as string;

  const [userName, setUserName] = useState('학부모');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const courseInfo = courseData[courseId];

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

  if (!courseInfo) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 코스입니다</h1>
          <Link href="/course/parent" className="text-blue-600 hover:underline">
            학부형 코스로 돌아가기
          </Link>
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
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 강의 헤더 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/courses" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm">
              <ChevronLeft className="w-4 h-4" />
              강좌 목록
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/course/parent" className="text-gray-500 hover:text-gray-700 text-sm">학부형 코스</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 text-sm font-medium">{courseInfo.title}</span>
          </div>

          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${courseInfo.color} rounded-2xl flex items-center justify-center text-3xl`}>
              {courseInfo.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{courseInfo.title}</h1>
              <p className="text-gray-500">{courseInfo.subtitle}</p>
            </div>
          </div>
        </div>

        {/* 라이브 강의 배너 */}
        <div className={`bg-gradient-to-r ${courseInfo.color} rounded-xl p-5 mb-6 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">주간 라이브 강의 입장</h3>
              <p className="text-white/70 text-sm">{courseInfo.liveInfo.schedule}</p>
            </div>
          </div>
          <button className="bg-white text-gray-900 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            입장하기
          </button>
        </div>

        {/* 공지 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">📢</span>
            <div>
              <p className="font-semibold text-yellow-800">{courseInfo.announcement.title}</p>
              <p className="text-sm text-yellow-700">{courseInfo.announcement.description}</p>
            </div>
          </div>
        </div>

        {/* 진행률 */}
        <div className="bg-white rounded-xl p-5 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900">전체 학습 진행률</span>
            <span className="font-bold text-blue-600">
              {courseInfo.progress.completed}/{courseInfo.progress.total} 완료 ({courseInfo.progress.percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`bg-gradient-to-r ${courseInfo.color} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${courseInfo.progress.percentage}%` }}
            />
          </div>
        </div>

        {/* 파트별 강의 목록 */}
        {courseInfo.parts.map((part: any) => (
          <PartSection key={part.id} part={part} courseId={courseId} courseInfo={courseInfo} />
        ))}
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
