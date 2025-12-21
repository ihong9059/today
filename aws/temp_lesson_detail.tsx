'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Brain,
  Menu,
  X,
  Play,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  FileText,
  Download,
  AlertTriangle
} from 'lucide-react';

// 레슨 데이터
const lessonData = {
  day: 1,
  title: '내 첫 AI 친구: ChatGPT와 Agent의 차이',
  subtitle: 'ChatGPT와 에이전트 빌더의 차이점을 이해하고, 워크플로우 자동화 개념을 배웁니다.',
  progress: 0,
  totalLessons: 10,
  currentLesson: 1,
  learningGoals: [
    'ChatGPT와 에이전트 빌더의 차이점 이해하기',
    '워크플로우 자동화 개념 배우기',
    '실습으로 에이전트 빌더 사용해보기',
  ],
  sections: [
    {
      id: 1,
      type: 'video',
      badge: '🎬 이론',
      duration: '8분 이상',
      title: '추가 영상: 중요 안내',
      description: '⚠️ 이 영상을 먼저 시청해주세요!\n강의 진행 전 반드시 알아야 할 중요한 내용입니다.',
      videoId: 'ZT25P9lUN9c',
      important: true,
    },
    {
      id: 2,
      type: 'video',
      badge: '🎬 이론',
      duration: '6분',
      title: '이론 강의: ChatGPT와 Agent의 차이',
      description: '',
      videoId: 'ZT25P9lUN9c',
      content: {
        title: 'ChatGPT vs 🤖 에이전트 빌더',
        items: [
          { label: 'ChatGPT:', description: '사람과 대화하는 AI' },
          { label: '에이전트:', description: '빌더 일을 자동화하는 워크플로우 도구이다' },
        ],
        keyPoint: {
          title: '💡 핵심 차이',
          description: '워크플로우란 무엇인가 쉽게들면 한 번 실행하면 여러 단계 작업이 자동 실행됩니다\n예시: \'유튜브 콘텐츠 만들어줘\' → 조사, 스크립트, 썸네일, 업로드 자동 진행!',
        },
      },
    },
    {
      id: 3,
      type: 'video',
      badge: '💻 실습',
      duration: '8분 이상',
      title: '실습: 에이전트 빌더 시작하기',
      description: '위의 실습 비디오를 보면서 에이전트 빌더로 첫 워크플로우를 만들어보세요!',
      videoId: 'ZT25P9lUN9c',
    },
  ],
  quiz: {
    title: '📝 퀴즈',
    questions: [
      {
        id: 1,
        question: 'Q1. ChatGPT와 에이전트 빌더의 에이전트 개념은 무엇인가요?',
        options: [
          'ChatGPT는 대화형 서비스고, 에이전트 빌더는 워크플로우를 자동화하는 도구이다',
          'ChatGPT는 느리고, 에이전트 빌더는 빠르다',
          'ChatGPT는 한국어를 지원하지 않는다',
          'ChatGPT는 OpenAI 제품이 아니다',
        ],
        correct: 0,
      },
      {
        id: 2,
        question: 'Q2. 워크플로우(Work Flow)가 무엇을 의미하나요?',
        options: [
          '작업 속도',
          '작업 비용',
          '일의 흐름',
          '작업 완료 시간',
        ],
        correct: 2,
      },
      {
        id: 3,
        question: 'Q3. 에이전트 빌더의 장점으로 올바른 것은?',
        options: [
          '일일 무료로 사용할 수 있다',
          '코딩 지식이 필요하다',
          '한 번의 요청으로 여러 단계의 작업을 자동으로 실행할 수 있다',
          'ChatGPT보다 대화를 잘 한다',
        ],
        correct: 2,
      },
    ],
  },
  additionalResources: [
    { title: '예제 워크플로우 가이드', type: 'PDF' },
  ],
};

// 유튜브 플레이어 컴포넌트
function YouTubePlayer({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

// 퀴즈 컴포넌트
function QuizSection({ quiz }: { quiz: typeof lessonData.quiz }) {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const correctCount = quiz.questions.filter(
    (q) => answers[q.id] === q.correct
  ).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">{quiz.title}</h3>

      <div className="space-y-8">
        {quiz.questions.map((question) => (
          <div key={question.id} className="space-y-3">
            <p className="font-medium text-gray-900">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((option, idx) => {
                const isSelected = answers[question.id] === idx;
                const isCorrect = question.correct === idx;
                let optionClass = 'border-gray-200 hover:border-blue-300';

                if (showResults) {
                  if (isCorrect) {
                    optionClass = 'border-green-500 bg-green-50';
                  } else if (isSelected && !isCorrect) {
                    optionClass = 'border-red-500 bg-red-50';
                  }
                } else if (isSelected) {
                  optionClass = 'border-blue-500 bg-blue-50';
                }

                return (
                  <label
                    key={idx}
                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition ${optionClass}`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      checked={isSelected}
                      onChange={() => handleAnswer(question.id, idx)}
                      disabled={showResults}
                      className="mr-3"
                    />
                    <span className={showResults && isCorrect ? 'font-semibold text-green-700' : ''}>
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!showResults ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < quiz.questions.length}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          정답 보기
        </button>
      ) : (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 mb-2">
              🎉 1강 완료함!
            </p>
            <p className="text-gray-600 mb-4">
              {correctCount}/{quiz.questions.length}개 정답을 맞추셨습니다.
            </p>
            <Link
              href="/course/1"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              <CheckCircle className="w-5 h-5" />
              완료! 2강으로 →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LessonDetailPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('홍광선');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) {
          setUserName(user.name);
        }
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

            {/* 데스크탑 메뉴 */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/about" className="text-gray-300 hover:text-white transition px-3 py-2">
                소개
              </Link>
              <Link href="/mbti" className="text-gray-300 hover:text-white transition px-3 py-2">
                MBTI
              </Link>
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">
                강좌 목록
              </Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition px-3 py-2">
                FAQ
              </Link>
              <Link
                href="/dashboard"
                className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                내 강의
              </Link>
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-700">
                <span className="text-gray-300">안녕하세요, {userName}님!</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white transition px-3 py-2"
                >
                  로그아웃
                </button>
              </div>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* 모바일 메뉴 */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white px-3 py-2">소개</Link>
              <Link href="/mbti" className="block text-gray-300 hover:text-white px-3 py-2">MBTI</Link>
              <Link href="/courses" className="block text-gray-300 hover:text-white px-3 py-2">강좌 목록</Link>
              <Link href="/faq" className="block text-gray-300 hover:text-white px-3 py-2">FAQ</Link>
              <Link href="/dashboard" className="block bg-yellow-400 text-slate-900 px-3 py-2 rounded-lg font-semibold">내 강의</Link>
              <div className="border-t border-gray-700 pt-2 mt-2">
                <span className="block text-gray-300 px-3 py-2">안녕하세요, {userName}님!</span>
                <button onClick={handleLogout} className="block text-gray-400 hover:text-white px-3 py-2">로그아웃</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 상단 네비게이션 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/course/1"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              강의 목록으로
            </Link>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                Day {lessonData.day}
              </span>
              <span className="px-3 py-1 bg-green-500 rounded-full text-sm">
                ✓ 퀴즈 포함
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 레슨 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{lessonData.title}</h1>
          <p className="text-blue-200">{lessonData.subtitle}</p>

          {/* 진행률 바 */}
          <div className="mt-6 bg-white/20 rounded-full p-1">
            <div className="flex justify-between text-sm mb-1 px-2">
              <span>학습 진행률</span>
              <span>0%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '0%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8 -mt-4">
        {/* 학습 목표 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            📚 학습 목표
          </h3>
          <ul className="space-y-2">
            {lessonData.learningGoals.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </span>
                <span className="text-gray-700">{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 섹션들 */}
        {lessonData.sections.map((section) => (
          <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            {/* 섹션 헤더 */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {section.badge}
              </span>
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {section.duration}
              </span>
            </div>

            {/* 중요 알림 */}
            {section.important && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-800">⚠️ 이 영상을 먼저 시청해주세요!</p>
                    <p className="text-sm text-yellow-700">강의 진행 전 반드시 알아야 할 중요한 내용입니다.</p>
                  </div>
                </div>
              </div>
            )}

            <h4 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h4>

            {/* 유튜브 플레이어 */}
            <YouTubePlayer videoId={section.videoId} title={section.title} />

            {/* 추가 설명 */}
            {section.description && (
              <p className="mt-4 text-gray-600 text-sm">{section.description}</p>
            )}

            {/* 콘텐츠 박스 (이론 강의용) */}
            {section.content && (
              <div className="mt-6 space-y-4">
                <div className="bg-gray-50 rounded-xl p-5">
                  <h5 className="font-semibold text-gray-900 mb-3">{section.content.title}</h5>
                  <ul className="space-y-2">
                    {section.content.items.map((item, idx) => (
                      <li key={idx} className="text-gray-700">
                        <span className="font-medium text-blue-600">{item.label}</span> {item.description}
                      </li>
                    ))}
                  </ul>
                </div>

                {section.content.keyPoint && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <h5 className="font-semibold text-blue-800 mb-2">{section.content.keyPoint.title}</h5>
                    <p className="text-blue-700 text-sm whitespace-pre-line">
                      {section.content.keyPoint.description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* 퀴즈 섹션 */}
        <QuizSection quiz={lessonData.quiz} />

        {/* 추가 학습 자료 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            📎 추가 학습 자료
          </h3>
          <div className="space-y-3">
            {lessonData.additionalResources.map((resource, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-medium text-gray-900">{resource.title}</span>
                </div>
                <Download className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
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
              <p className="text-sm">
                AI와 함께하는 진로교육 플랫폼
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 underline">빠른 링크</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">홈</Link></li>
                <li><Link href="/courses" className="hover:text-white transition">강좌 목록</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 underline">고객 지원</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white transition">이용약관</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">개인정보처리방침</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">고객센터</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 커넥트에이아이. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
