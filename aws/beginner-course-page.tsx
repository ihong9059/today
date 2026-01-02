'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  Brain,
  Menu,
  X,
  Play,
  ChevronRight,
  ChevronLeft,
  Video,
} from 'lucide-react';

// 사회초년생 코스 데이터
const courseData: Record<string, any> = {
  'ai-workplace': {
    title: 'AI 시대 직장생활',
    subtitle: 'AI 시대 직장인이 알아야 할 필수 지식과 마인드셋',
    icon: '💼',
    color: 'from-blue-500 to-indigo-500',
    liveInfo: {
      schedule: '매주 월요일 8PM | AI 시대 직장인 특강',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: 'AI 시대 직장생활의 모든 것을 배워보세요! 🚀',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: AI 시대의 변화 (Day 1-3)',
        subtitle: 'AI가 바꾸는 업무 환경과 트렌드',
        icon: '🌍',
        lessons: [
          { day: 1, title: 'AI 시대, 직장의 변화', description: '업무 환경 변화 | AI 도입 현황 | 직장인 역할 변화', hasQuiz: true },
          { day: 2, title: '직장 내 AI 활용 사례', description: '업무 자동화 | AI 협업 | 성공 사례', hasQuiz: true },
          { day: 3, title: 'AI와 공존하는 마인드셋', description: 'AI 리터러시 | 적응력 | 성장 마인드', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 경쟁력 강화 (Day 4-5)',
        subtitle: 'AI 시대 직장인 경쟁력 확보',
        icon: '💪',
        lessons: [
          { day: 4, title: 'AI로 업무 효율 높이기', description: '시간 관리 | 업무 자동화 | 생산성 향상', hasQuiz: true },
          { day: 5, title: '대체불가 인재되기', description: '핵심 역량 | 차별화 전략 | 지속 성장', hasQuiz: true },
        ],
      },
    ],
  },
  'ai-tools-work': {
    title: 'AI 도구 업무 활용',
    subtitle: 'ChatGPT, Gemini를 활용한 업무 생산성 200% 향상',
    icon: '🛠️',
    color: 'from-emerald-500 to-teal-500',
    liveInfo: {
      schedule: '매주 화요일 8PM | AI 도구 실습',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: 'AI 도구로 업무 생산성을 높여보세요! 🚀',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: AI 도구 기초 (Day 1-2)',
        subtitle: 'ChatGPT와 Gemini 기본 활용법',
        icon: '🎯',
        lessons: [
          { day: 1, title: 'ChatGPT 업무 활용 기초', description: 'ChatGPT 소개 | 기본 사용법 | 업무 적용', hasQuiz: true },
          { day: 2, title: 'Gemini 업무 활용 기초', description: 'Gemini 소개 | 기본 사용법 | 업무 적용', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 업무 자동화 (Day 3-5)',
        subtitle: 'AI로 업무 자동화하기',
        icon: '⚡',
        lessons: [
          { day: 3, title: '문서 작성 자동화', description: '보고서 | 이메일 | 제안서 작성', hasQuiz: true },
          { day: 4, title: '데이터 분석 자동화', description: '엑셀 데이터 | 분석 자동화 | 시각화', hasQuiz: true },
          { day: 5, title: '업무 프로세스 혁신', description: '워크플로우 개선 | 협업 도구 | 최적화', hasQuiz: true },
        ],
      },
    ],
  },
  'prompt-master': {
    title: '프롬프트 마스터',
    subtitle: '원하는 결과를 얻는 프롬프트 작성의 기술',
    icon: '✍️',
    color: 'from-purple-500 to-pink-500',
    liveInfo: {
      schedule: '매주 수요일 8PM | 프롬프트 워크샵',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: '프롬프트 작성의 달인이 되어보세요! 🚀',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 프롬프트 기초 (Day 1-2)',
        subtitle: '효과적인 프롬프트의 원리',
        icon: '📝',
        lessons: [
          { day: 1, title: '프롬프트란 무엇인가?', description: '프롬프트 정의 | 기본 구조 | 핵심 원리', hasQuiz: true },
          { day: 2, title: '좋은 프롬프트의 조건', description: '명확성 | 구체성 | 맥락 제공', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 고급 기법 (Day 3-5)',
        subtitle: '프롬프트 엔지니어링 심화',
        icon: '🎓',
        lessons: [
          { day: 3, title: '역할 부여와 페르소나', description: '역할 설정 | 전문가 모드 | 톤 조절', hasQuiz: true },
          { day: 4, title: '체인 오브 쏘트', description: '단계별 사고 | 복잡한 문제 해결 | 추론 유도', hasQuiz: true },
          { day: 5, title: '업무별 프롬프트 템플릿', description: '상황별 템플릿 | 실전 활용 | 나만의 템플릿', hasQuiz: true },
        ],
      },
    ],
  },
  'career-development': {
    title: 'AI 시대 커리어 개발',
    subtitle: 'AI 시대에도 살아남는 커리어 전략과 성장 로드맵',
    icon: '📈',
    color: 'from-orange-500 to-red-500',
    liveInfo: {
      schedule: '매주 목요일 8PM | 커리어 멘토링',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: 'AI 시대 커리어 전략을 세워보세요! 🚀',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 커리어 전략 (Day 1-3)',
        subtitle: 'AI 시대 생존 전략',
        icon: '🎯',
        lessons: [
          { day: 1, title: 'AI가 바꾸는 직업 세계', description: '직업 변화 | 위기와 기회 | 트렌드 분석', hasQuiz: true },
          { day: 2, title: '나의 핵심 역량 파악', description: '강점 분석 | 차별화 포인트 | 역량 진단', hasQuiz: true },
          { day: 3, title: '미래 지향 스킬셋', description: '필수 역량 | 기술 스킬 | 소프트 스킬', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 성장 로드맵 (Day 4-5)',
        subtitle: '지속 성장을 위한 계획',
        icon: '🗺️',
        lessons: [
          { day: 4, title: '스킬 개발 로드맵', description: '학습 계획 | 자격증 | 실무 경험', hasQuiz: true },
          { day: 5, title: '커리어 액션 플랜', description: '목표 설정 | 실행 계획 | 네트워킹', hasQuiz: true },
        ],
      },
    ],
  },
  'portfolio-building': {
    title: 'AI 활용 포트폴리오',
    subtitle: 'AI를 활용하여 돋보이는 포트폴리오 만들기',
    icon: '🎨',
    color: 'from-cyan-500 to-blue-500',
    liveInfo: {
      schedule: '매주 금요일 8PM | 포트폴리오 리뷰',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: 'AI로 멋진 포트폴리오를 만들어보세요! 🚀',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 포트폴리오 기획 (Day 1-2)',
        subtitle: '효과적인 포트폴리오 전략',
        icon: '📋',
        lessons: [
          { day: 1, title: '포트폴리오의 중요성', description: '포트폴리오 정의 | 유형 | 성공 사례', hasQuiz: true },
          { day: 2, title: '나만의 브랜딩 전략', description: '개인 브랜드 | 차별화 | 스토리텔링', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: AI 활용 제작 (Day 3-5)',
        subtitle: 'AI로 포트폴리오 완성하기',
        icon: '🎨',
        lessons: [
          { day: 3, title: 'AI로 콘텐츠 제작', description: '텍스트 생성 | 이미지 생성 | 동영상 제작', hasQuiz: true },
          { day: 4, title: '포트폴리오 디자인', description: '레이아웃 | 비주얼 | 웹사이트 제작', hasQuiz: true },
          { day: 5, title: '취업 연계 전략', description: 'LinkedIn | 이력서 | 면접 준비', hasQuiz: true },
        ],
      },
    ],
  },
};

// 레슨 카드 컴포넌트
function LessonCard({ lesson, courseId, courseInfo }: { lesson: any; courseId: string; courseInfo: any }) {
  return (
    <Link
      href={`/course/beginner/${courseId}/lesson/${lesson.day}`}
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

export default function BeginnerCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.course as string;

  const [userName, setUserName] = useState('사용자');
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
          <Link href="/course/beginner" className="text-blue-600 hover:underline">
            사회초년생 코스로 돌아가기
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
            <Link href="/course/beginner" className="text-gray-500 hover:text-gray-700 text-sm">사회초년생 코스</Link>
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
