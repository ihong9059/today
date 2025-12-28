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

// 레벨별 코스 데이터
const courseDataByLevel: Record<string, any> = {
  '초급': {
    title: 'AI 도구 활용법 (Claude & Gemini)',
    level: '초급',
    subtitle: 'Claude와 Gemini 시작하기 - AI 대화의 기초',
    icon: '💬',
    liveInfo: {
      schedule: '매주 화요일 8PM | AI 도구 실습',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: 'Claude와 Gemini를 직접 사용해보세요! 🚀',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: AI 도구 시작하기 (Day 1-3)',
        subtitle: 'Claude와 Gemini 가입부터 첫 대화까지',
        icon: '🚀',
        lessons: [
          { day: 1, title: 'Claude 시작하기', description: 'Claude 가입하기 | 인터페이스 익히기 | 첫 대화 나누기', hasQuiz: true, completed: false },
          { day: 2, title: 'Gemini 시작하기', description: 'Gemini 접속하기 | 구글 연동 | 첫 대화 나누기', hasQuiz: true, completed: false },
          { day: 3, title: '효과적인 질문법', description: '좋은 프롬프트 작성 | 구체적인 요청 | 맥락 제공하기', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 일상에서 활용하기 (Day 4-5)',
        subtitle: '실생활에서 AI 도구 활용',
        icon: '🏠',
        lessons: [
          { day: 4, title: '정보 검색과 요약', description: '뉴스 요약 | 개념 설명 | 비교 분석', hasQuiz: true, completed: false },
          { day: 5, title: '글쓰기 도우미', description: '이메일 작성 | 보고서 초안 | 문장 다듬기', hasQuiz: true, completed: false },
        ],
      },
    ],
    nextLevel: '중급',
  },
  '중급': {
    title: 'AI 도구 활용법 (Claude & Gemini)',
    level: '중급',
    subtitle: 'AI 도구 심화 활용 - 업무 생산성 향상',
    icon: '💬',
    liveInfo: {
      schedule: '매주 목요일 8PM | AI 업무 활용',
    },
    announcement: {
      title: '중급 과정 준비 중!',
      description: '곧 업로드됩니다 📚',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 업무 활용 (Day 1-3)',
        subtitle: '직장에서 AI 도구 활용하기',
        icon: '💼',
        lessons: [
          { day: 1, title: '문서 작성 자동화', description: '보고서 | 제안서 | 회의록', hasQuiz: true, completed: false },
          { day: 2, title: '데이터 분석 보조', description: '엑셀 수식 | 데이터 해석 | 차트 제안', hasQuiz: true, completed: false },
          { day: 3, title: '번역과 다국어 소통', description: '문서 번역 | 이메일 번역 | 문화적 맥락', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 창의적 활용 (Day 4-5)',
        subtitle: 'AI와 함께 창작하기',
        icon: '🎨',
        lessons: [
          { day: 4, title: '아이디어 브레인스토밍', description: '기획 아이디어 | 문제 해결 | 대안 제시', hasQuiz: true, completed: false },
          { day: 5, title: '콘텐츠 제작 보조', description: '블로그 글 | SNS 포스트 | 마케팅 문구', hasQuiz: true, completed: false },
        ],
      },
    ],
    nextLevel: '고급',
  },
  '고급': {
    title: 'AI 도구 활용법 (Claude & Gemini)',
    level: '고급',
    subtitle: '고급 프롬프트 엔지니어링과 전문 활용',
    icon: '💬',
    liveInfo: {
      schedule: '매주 토요일 2PM | 프롬프트 마스터 클래스',
    },
    announcement: {
      title: '고급 과정 준비 중!',
      description: '곧 업로드됩니다 🎯',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 프롬프트 엔지니어링 (Day 1-3)',
        subtitle: '전문가 수준의 프롬프트 작성',
        icon: '⚡',
        lessons: [
          { day: 1, title: '고급 프롬프트 기법', description: '역할 부여 | 단계별 사고 | 제약조건 설정', hasQuiz: true, completed: false },
          { day: 2, title: '멀티턴 대화 전략', description: '맥락 유지 | 점진적 구체화 | 피드백 루프', hasQuiz: true, completed: false },
          { day: 3, title: 'Claude vs Gemini 비교 활용', description: '각 AI 강점 | 적합한 용도 | 조합 사용', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 전문 분야 활용 (Day 4-5)',
        subtitle: '특정 분야에서의 AI 활용',
        icon: '🎯',
        lessons: [
          { day: 4, title: '교육 분야 활용', description: '학습 자료 제작 | 퀴즈 생성 | 개인화 학습', hasQuiz: true, completed: false },
          { day: 5, title: 'AI 도구 워크플로우 구축', description: '자동화 시나리오 | 템플릿 제작 | 효율화 전략', hasQuiz: true, completed: false },
        ],
      },
    ],
    nextLevel: null,
  },
};

const levelColors: Record<string, { bg: string; text: string; border: string }> = {
  '초급': { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-400' },
  '중급': { bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-400' },
  '고급': { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-400' },
};

function LessonCard({ lesson, level, coursePath }: { lesson: any; level: string; coursePath: string }) {
  return (
    <Link
      href={`/course/parent/${coursePath}/${level}/lesson/${lesson.day}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:border-purple-300 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              {lesson.completed ? (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <Play className="w-3 h-3 text-gray-500" />
                </div>
              )}
              <span className="text-sm font-medium text-gray-500">Day {lesson.day}</span>
            </div>
            {lesson.hasQuiz && (
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">퀴즈 포함</span>
            )}
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">{lesson.title}</h4>
          <p className="text-sm text-gray-500 mb-4">{lesson.description}</p>
          <span className="flex items-center gap-2 text-purple-600 font-medium text-sm">
            {lesson.completed ? '다시 학습하기' : '학습 시작하기'}
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PartSection({ part, level, coursePath }: { part: any; level: string; coursePath: string }) {
  return (
    <section className="mb-8">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-5 mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          {part.icon} {part.title}
        </h3>
        <p className="text-purple-100 text-sm mt-1">{part.subtitle}</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {part.lessons.map((lesson: any) => (
          <LessonCard key={lesson.day} lesson={lesson} level={level} coursePath={coursePath} />
        ))}
      </div>
    </section>
  );
}

export default function ParentAiToolsPage() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);
  const coursePath = 'ai-tools';

  const [userName, setUserName] = useState('학부모');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const courseData = courseDataByLevel[level];

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
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

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 레벨입니다</h1>
          <Link href="/courses" className="text-blue-600 hover:underline">강좌 목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const allCompleted = courseData.progress.percentage === 100;
  const colors = levelColors[level] || levelColors['초급'];

  return (
    <div className="min-h-screen bg-gray-100">
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

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/courses" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm">
              <ChevronLeft className="w-4 h-4" />강좌 목록
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500 text-sm">학부형 코스</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500 text-sm">AI 도구 활용법</span>
            <span className="text-gray-300">/</span>
            <span className={`px-2 py-0.5 ${colors.bg} text-white text-sm rounded-full font-medium`}>{level}</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl">{courseData.icon}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{courseData.title}</h1>
                <span className={`px-3 py-1 ${colors.bg} text-white text-sm rounded-full font-medium`}>{courseData.level}</span>
              </div>
              <p className="text-gray-500">{courseData.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">주간 라이브 강의 입장</h3>
              <p className="text-purple-200 text-sm">{courseData.liveInfo.schedule}</p>
            </div>
          </div>
          <button className="bg-white text-purple-600 px-5 py-2 rounded-lg font-semibold hover:bg-purple-50 transition">입장하기</button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">{allCompleted ? '🎉' : '📢'}</span>
            <div>
              <p className="font-semibold text-yellow-800">{courseData.announcement.title}</p>
              <p className="text-sm text-yellow-700">{courseData.announcement.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900">전체 학습 진행률</span>
            <span className={`font-bold ${colors.text}`}>
              {courseData.progress.completed}/{courseData.progress.total} 완료 ({courseData.progress.percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className={`${colors.bg} h-3 rounded-full transition-all duration-500`} style={{ width: `${courseData.progress.percentage}%` }} />
          </div>
        </div>

        {courseData.parts.map((part: any) => (
          <PartSection key={part.id} part={part} level={level} coursePath={coursePath} />
        ))}

        {allCompleted && courseData.nextLevel && (
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-center mt-8">
            <div className="text-6xl mb-4">🎊</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">축하합니다! 모든 강의를 완료하셨습니다!</h2>
            <p className="text-purple-200 mb-6">이제 다음 단계로 나아갈 준비가 되었습니다! 🚀</p>
            <Link href={`/course/parent/${coursePath}/${courseData.nextLevel}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition">
              {courseData.nextLevel} 과정 시작하기
            </Link>
          </div>
        )}

        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">다른 레벨 강좌</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {['초급', '중급', '고급'].map((lvl) => {
              const isCurrentLevel = lvl === level;
              const lvlColors = levelColors[lvl];
              return isCurrentLevel ? (
                <div key={lvl} className={`p-4 rounded-lg border-2 ${lvlColors.border}`} style={{ backgroundColor: lvl === '초급' ? '#f0fdf4' : lvl === '중급' ? '#fefce8' : '#fef2f2' }}>
                  <span className={`text-sm ${lvlColors.text} font-medium`}>현재 학습 중</span>
                  <h4 className="font-bold text-gray-900 mt-1">{lvl}</h4>
                  <p className="text-sm text-gray-500">
                    {lvl === '초급' && 'Claude와 Gemini 시작하기'}
                    {lvl === '중급' && '업무 활용과 창의적 활용'}
                    {lvl === '고급' && '프롬프트 엔지니어링'}
                  </p>
                </div>
              ) : (
                <Link key={lvl} href={`/course/parent/${coursePath}/${lvl}`} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <span className="text-sm text-gray-500">{lvl === '초급' ? '기초 과정' : lvl === '중급' ? '다음 단계' : '심화 과정'}</span>
                  <h4 className="font-bold text-gray-900 mt-1">{lvl}</h4>
                  <p className="text-sm text-gray-500">
                    {lvl === '초급' && 'Claude와 Gemini 시작하기'}
                    {lvl === '중급' && '업무 활용과 창의적 활용'}
                    {lvl === '고급' && '프롬프트 엔지니어링'}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

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
