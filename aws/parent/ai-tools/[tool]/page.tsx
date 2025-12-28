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
  ExternalLink,
  Download,
} from 'lucide-react';

// 도구별 코스 데이터
const toolData: Record<string, any> = {
  'claude': {
    title: 'Claude 활용법',
    subtitle: 'Anthropic의 AI 어시스턴트 Claude 마스터하기',
    icon: '🟣',
    color: 'from-purple-600 to-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    officialUrl: 'https://claude.ai',
    description: 'Claude는 Anthropic이 개발한 AI 어시스턴트입니다. 안전하고 도움이 되는 대화를 위해 설계되었습니다.',
    features: ['긴 문맥 이해', '안전한 응답', '코드 작성 지원', '문서 분석'],
    liveInfo: {
      schedule: '매주 화요일 8PM | Claude 실습',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: 'Claude와 함께 AI 활용법을 배워보세요! 🟣',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: Claude 시작하기 (Day 1-3)',
        subtitle: 'Claude 가입부터 효과적인 대화까지',
        icon: '🚀',
        lessons: [
          { day: 1, title: 'Claude 시작하기', description: 'Claude.ai 가입 | 인터페이스 익히기 | 첫 대화 나누기', hasQuiz: true, completed: false },
          { day: 2, title: 'Claude와 효과적인 대화', description: '좋은 프롬프트 작성 | 맥락 제공하기 | 명확한 요청', hasQuiz: true, completed: false },
          { day: 3, title: 'Claude의 강점 활용', description: '긴 문서 분석 | 코드 리뷰 | 글쓰기 도우미', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 실전 활용 (Day 4-5)',
        subtitle: '일상과 업무에서 Claude 활용',
        icon: '💼',
        lessons: [
          { day: 4, title: '일상에서 Claude 활용', description: '정보 검색 | 학습 도우미 | 아이디어 브레인스토밍', hasQuiz: true, completed: false },
          { day: 5, title: '업무 생산성 향상', description: '이메일 작성 | 보고서 초안 | 회의 준비', hasQuiz: true, completed: false },
        ],
      },
    ],
  },
  'gemini': {
    title: 'Gemini 활용법',
    subtitle: 'Google의 AI 어시스턴트 Gemini 마스터하기',
    icon: '🔵',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    officialUrl: 'https://gemini.google.com',
    description: 'Gemini는 Google이 개발한 AI 어시스턴트입니다. Google 서비스와의 연동이 강점입니다.',
    features: ['Google 연동', '이미지 분석', '실시간 정보', '다국어 지원'],
    liveInfo: {
      schedule: '매주 목요일 8PM | Gemini 실습',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: 'Gemini와 함께 AI 활용법을 배워보세요! 🔵',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: Gemini 시작하기 (Day 1-3)',
        subtitle: 'Gemini 접속부터 효과적인 대화까지',
        icon: '🚀',
        lessons: [
          { day: 1, title: 'Gemini 시작하기', description: 'Gemini 접속 | Google 계정 연동 | 첫 대화 나누기', hasQuiz: true, completed: false },
          { day: 2, title: 'Gemini와 효과적인 대화', description: '좋은 프롬프트 작성 | 이미지 활용 | 맥락 유지', hasQuiz: true, completed: false },
          { day: 3, title: 'Gemini의 강점 활용', description: 'Google 서비스 연동 | 실시간 정보 | 이미지 분석', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 실전 활용 (Day 4-5)',
        subtitle: '일상과 업무에서 Gemini 활용',
        icon: '💼',
        lessons: [
          { day: 4, title: '일상에서 Gemini 활용', description: '여행 계획 | 레시피 추천 | 학습 도우미', hasQuiz: true, completed: false },
          { day: 5, title: '업무 생산성 향상', description: 'Gmail 연동 | 문서 작성 | 프레젠테이션 준비', hasQuiz: true, completed: false },
        ],
      },
    ],
  },
};

// 레슨 카드 컴포넌트
function LessonCard({ lesson, tool, toolInfo }: { lesson: any; tool: string; toolInfo: any }) {
  return (
    <Link
      href={`/course/parent/ai-tools/${tool}/lesson/${lesson.day}`}
      className={`block bg-white rounded-xl shadow-sm border ${toolInfo.borderColor} p-5 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer`}
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
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                퀴즈 포함
              </span>
            )}
          </div>

          <h4 className="font-semibold text-gray-900 mb-2">{lesson.title}</h4>
          <p className="text-sm text-gray-500 mb-4">{lesson.description}</p>

          <span className={`flex items-center gap-2 ${toolInfo.textColor} font-medium text-sm`}>
            {lesson.completed ? '다시 학습하기' : '학습 시작하기'}
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// 파트 섹션 컴포넌트
function PartSection({ part, tool, toolInfo }: { part: any; tool: string; toolInfo: any }) {
  return (
    <section className="mb-8">
      <div className={`bg-gradient-to-r ${toolInfo.color} rounded-xl p-5 mb-6`}>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          {part.icon} {part.title}
        </h3>
        <p className="text-white/80 text-sm mt-1">{part.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {part.lessons.map((lesson: any) => (
          <LessonCard key={lesson.day} lesson={lesson} tool={tool} toolInfo={toolInfo} />
        ))}
      </div>
    </section>
  );
}

export default function AiToolsPage() {
  const router = useRouter();
  const params = useParams();
  const tool = params.tool as string;

  const [userName, setUserName] = useState('학부모');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toolInfo = toolData[tool];

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

  if (!toolInfo) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 도구입니다</h1>
          <Link href="/course/parent" className="text-blue-600 hover:underline">
            학부형 코스로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const otherTool = tool === 'claude' ? 'gemini' : 'claude';
  const otherToolInfo = toolData[otherTool];

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
        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/courses" className="text-gray-500 hover:text-gray-700 text-sm">강좌 목록</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href="/course/parent" className="text-gray-500 hover:text-gray-700 text-sm">학부형 코스</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 text-sm font-medium">AI 도구 활용법</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className={`px-2 py-0.5 rounded-full text-sm font-medium text-white bg-gradient-to-r ${toolInfo.color}`}>
            {toolInfo.icon} {tool === 'claude' ? 'Claude' : 'Gemini'}
          </span>
        </div>

        {/* 도구 선택 탭 */}
        <div className="bg-white rounded-2xl shadow-sm p-2 mb-6 flex gap-2">
          <Link
            href="/course/parent/ai-tools/claude"
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
              tool === 'claude'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🟣 Claude
          </Link>
          <Link
            href="/course/parent/ai-tools/gemini"
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
              tool === 'gemini'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🔵 Gemini
          </Link>
        </div>

        {/* 강의 헤더 */}
        <div className={`bg-gradient-to-r ${toolInfo.color} rounded-2xl p-6 mb-6 text-white`}>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
              {toolInfo.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{toolInfo.title}</h1>
              <p className="text-white/80 mb-4">{toolInfo.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {toolInfo.features.map((feature: string) => (
                  <span key={feature} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 공식 사이트 안내 */}
        <div className={`${toolInfo.bgColor} border ${toolInfo.borderColor} rounded-xl p-5 mb-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-semibold ${toolInfo.textColor} mb-1`}>
                {toolInfo.icon} {tool === 'claude' ? 'Claude' : 'Gemini'} 시작하기
              </h3>
              <p className="text-gray-600 text-sm">{toolInfo.description}</p>
            </div>
            <a
              href={toolInfo.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${toolInfo.color} text-white rounded-lg font-medium hover:opacity-90 transition`}
            >
              <ExternalLink className="w-4 h-4" />
              공식 사이트
            </a>
          </div>
        </div>

        {/* 라이브 강의 배너 */}
        <div className={`bg-gradient-to-r ${toolInfo.color} rounded-xl p-5 mb-6 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">주간 라이브 강의 입장</h3>
              <p className="text-white/70 text-sm">{toolInfo.liveInfo.schedule}</p>
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
              <p className="font-semibold text-yellow-800">{toolInfo.announcement.title}</p>
              <p className="text-sm text-yellow-700">{toolInfo.announcement.description}</p>
            </div>
          </div>
        </div>

        {/* 진행률 */}
        <div className="bg-white rounded-xl p-5 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900">전체 학습 진행률</span>
            <span className={`font-bold ${toolInfo.textColor}`}>
              {toolInfo.progress.completed}/{toolInfo.progress.total} 완료 ({toolInfo.progress.percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`bg-gradient-to-r ${toolInfo.color} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${toolInfo.progress.percentage}%` }}
            />
          </div>
        </div>

        {/* 파트별 강의 목록 */}
        {toolInfo.parts.map((part: any) => (
          <PartSection key={part.id} part={part} tool={tool} toolInfo={toolInfo} />
        ))}

        {/* 다른 도구 안내 */}
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">다른 AI 도구도 배워보세요</h3>
          <Link
            href={`/course/parent/ai-tools/${otherTool}`}
            className={`flex items-center justify-between p-4 ${otherToolInfo.bgColor} border ${otherToolInfo.borderColor} rounded-xl hover:shadow-md transition`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{otherToolInfo.icon}</span>
              <div>
                <h4 className="font-semibold text-gray-900">{otherToolInfo.title}</h4>
                <p className="text-sm text-gray-600">{otherToolInfo.subtitle}</p>
              </div>
            </div>
            <ChevronRight className={`w-6 h-6 ${otherToolInfo.textColor}`} />
          </Link>
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
