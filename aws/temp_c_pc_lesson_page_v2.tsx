'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  Brain,
  Menu,
  X,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Target,
  Lock,
  ShoppingCart,
  Copy,
  ExternalLink,
  Download,
  Save,
  MessageSquare,
  Sparkles,
  BookOpen,
  Play
} from 'lucide-react';

// 수강 신청 데이터 (실제로는 DB에서 관리)
const enrollmentData: Record<string, string[]> = {
  'test@test.com': ['c-esp32', 'c-pc'],
};

// 강좌 정보
const courseInfo: Record<string, { title: string; price: number }> = {
  'c-pc': { title: 'C 언어 (PC)', price: 79000 },
};

// 무료 AI 목록
const aiServices = [
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'bg-green-500 hover:bg-green-600', icon: '🤖' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/', color: 'bg-orange-500 hover:bg-orange-600', icon: '🧠' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/', color: 'bg-blue-500 hover:bg-blue-600', icon: '✨' },
  { id: 'copilot', name: 'Copilot', url: 'https://copilot.microsoft.com/', color: 'bg-purple-500 hover:bg-purple-600', icon: '💡' },
];

// Day별 레슨 데이터
const lessonDataByDay: Record<number, any> = {
  1: {
    day: 1,
    title: 'C 언어 소개와 개발환경 설정',
    subtitle: 'C 언어의 역사와 특징을 이해하고 VS Code 개발환경을 설정합니다.',
    learningGoals: [
      'C 언어의 역사와 특징 이해하기',
      'Visual Studio Code 설치 및 설정 배우기',
      '첫 번째 Hello World 프로그램 작성하기',
    ],
    videoId: 'ZT25P9lUN9c',
    videoTitle: 'C 언어 입문 - Day 1: 개발환경 설정',
    defaultPrompt: `C 언어를 처음 배우려고 합니다.
다음 질문에 대해 초보자도 이해할 수 있게 설명해주세요:

1. C 언어는 언제, 누가 만들었나요?
2. C 언어의 가장 큰 특징 3가지는 무엇인가요?
3. Windows에서 C 언어를 개발하려면 무엇을 설치해야 하나요?
4. "Hello World"를 출력하는 가장 간단한 C 코드를 보여주세요.

코드 예시도 함께 보여주세요.`,
    expectedKeywords: ['Dennis Ritchie', '1972', '컴파일', 'printf', 'main'],
    quiz: {
      title: '학습 확인 퀴즈',
      questions: [
        {
          id: 1,
          question: 'C 언어를 개발한 사람은?',
          options: ['Linus Torvalds', 'Dennis Ritchie', 'Bjarne Stroustrup', 'James Gosling'],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: 'C 프로그램을 실행하려면 무엇이 필요한가?',
          options: ['인터프리터', '컴파일러', 'JVM', '브라우저'],
          correctAnswer: 1,
        },
      ],
    },
    nextLesson: { day: 2, title: '변수와 자료형' },
  },
  // Day 2-10은 기존 구조 유지 (추후 확장)
};

// 기본 레슨 데이터 생성
for (let day = 2; day <= 10; day++) {
  if (!lessonDataByDay[day]) {
    lessonDataByDay[day] = {
      day,
      title: `Day ${day} 강의`,
      subtitle: '준비 중인 강의입니다.',
      learningGoals: ['학습 목표 1', '학습 목표 2'],
      videoId: 'ZT25P9lUN9c',
      videoTitle: `Day ${day} 강의 영상`,
      defaultPrompt: `Day ${day} 학습 내용에 대해 질문해주세요.`,
      expectedKeywords: [],
      quiz: null,
      nextLesson: day < 10 ? { day: day + 1, title: `Day ${day + 1} 강의` } : null,
    };
  }
}

// 수강 신청 안내 컴포넌트
function EnrollmentRequired({ courseId, level }: { courseId: string; level: string }) {
  const info = courseInfo[courseId];
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/courses" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">수강 신청이 필요합니다</h1>
          <p className="text-gray-600 mb-6">이 강의를 시청하려면 먼저 수강 신청을 해주세요.</p>
          {info && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h2>
              <p className="text-3xl font-bold text-blue-600 mb-4">{info.price.toLocaleString()}원</p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              수강 신청하기
            </button>
            <Link href="/login" className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition">
              로그인하기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

// 퀴즈 컴포넌트
function QuizSection({ quiz, onComplete }: { quiz: any; onComplete: () => void }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId: number, optionIndex: number) => {
    if (!showResults) {
      setAnswers({ ...answers, [questionId]: optionIndex });
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.questions.forEach((q: any) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    setScore(correct);
    setShowResults(true);
  };

  const allAnswered = quiz.questions.every((q: any) => answers[q.id] !== undefined);
  const allCorrect = score === quiz.questions.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-blue-500" />
        {quiz.title}
      </h3>
      <div className="space-y-6">
        {quiz.questions.map((question: any, qIdx: number) => (
          <div key={question.id} className="border-b border-gray-100 pb-6 last:border-0">
            <p className="font-semibold text-gray-900 mb-4">Q{qIdx + 1}. {question.question}</p>
            <div className="space-y-2">
              {question.options.map((option: string, oIdx: number) => {
                const isSelected = answers[question.id] === oIdx;
                const isCorrect = question.correctAnswer === oIdx;
                let optionClass = 'border-gray-200 hover:border-blue-300 hover:bg-blue-50';
                if (showResults) {
                  if (isCorrect) optionClass = 'border-green-500 bg-green-50';
                  else if (isSelected && !isCorrect) optionClass = 'border-red-500 bg-red-50';
                } else if (isSelected) {
                  optionClass = 'border-blue-500 bg-blue-50';
                }
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswer(question.id, oIdx)}
                    disabled={showResults}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${optionClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-500' : 'border-gray-300'}`}>
                        {isSelected && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                      </div>
                      <span className="text-gray-700">{option}</span>
                      {showResults && isCorrect && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {!showResults ? (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${allAnswered ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          정답 확인
        </button>
      ) : (
        <div className="mt-6">
          <div className={`p-4 rounded-lg text-center ${allCorrect ? 'bg-green-100' : 'bg-yellow-100'}`}>
            <p className="text-2xl mb-2">{allCorrect ? '🎉' : '📝'}</p>
            <p className={`font-bold text-lg ${allCorrect ? 'text-green-800' : 'text-yellow-800'}`}>
              {score}/{quiz.questions.length}점
            </p>
          </div>
          {allCorrect && (
            <button
              onClick={onComplete}
              className="mt-4 w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              다음 강의로 이동
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function CPCLessonDayPageV2() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // AI Prompt 관련 상태
  const [prompt, setPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isResultSaved, setIsResultSaved] = useState(false);

  const lessonData = lessonDataByDay[day];
  const courseId = 'c-pc';

  useEffect(() => {
    if (lessonData) {
      setPrompt(lessonData.defaultPrompt);
    }
  }, [day]);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userStr && token) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || '');
        setIsLoggedIn(true);
        const enrolledCourses = enrollmentData[user.email] || [];
        setIsEnrolled(enrolledCourses.includes(courseId));
      } catch (e) {
        setIsLoggedIn(false);
        setIsEnrolled(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsEnrolled(false);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  // HTTP 환경에서도 동작하는 클립보드 복사 함수
  const copyToClipboard = (text: string): boolean => {
    // 방법 1: navigator.clipboard (HTTPS에서만 동작)
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
      return true;
    }

    // 방법 2: execCommand fallback (HTTP에서도 동작)
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      textArea.remove();
      return true;
    } catch (err) {
      textArea.remove();
      return false;
    }
  };

  const handleCopyAndOpenAI = (aiUrl: string) => {
    const success = copyToClipboard(prompt);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      window.open(aiUrl, '_blank');
    } else {
      alert('클립보드 복사에 실패했습니다. 질문을 직접 선택하여 복사해주세요.');
    }
  };

  const handleCopyPrompt = () => {
    const success = copyToClipboard(prompt);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } else {
      alert('클립보드 복사에 실패했습니다. 질문을 직접 선택하여 복사해주세요.');
    }
  };

  const handleSaveResult = () => {
    if (aiResult.trim()) {
      localStorage.setItem(`lesson_${courseId}_${level}_day${day}_result`, aiResult);
      setIsResultSaved(true);
      setTimeout(() => setIsResultSaved(false), 2000);
    }
  };

  const handleDownloadResult = () => {
    if (aiResult.trim()) {
      const blob = new Blob([aiResult], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `C언어_${level}_Day${day}_AI결과.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleComplete = () => {
    if (lessonData.nextLesson) {
      router.push(`/course/coding/c-pc/${level}/lesson/${lessonData.nextLesson.day}`);
    } else {
      router.push(`/course/coding/c-pc/${level}`);
    }
  };

  // 로딩 중
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 수강 신청 필요
  if (!isLoggedIn || !isEnrolled) {
    return <EnrollmentRequired courseId={courseId} level={level} />;
  }

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 강의입니다</h1>
          <Link href={`/course/coding/c-pc/${level}`} className="text-blue-600 hover:underline">
            강좌 목록으로 돌아가기
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
              <Link href="/courses" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
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
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* 네비게이션 */}
        <div className="flex items-center gap-2">
          <Link
            href={`/course/coding/c-pc/${level}`}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            강의 목록으로
          </Link>
          <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">Day {day}</span>
          <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">{level}</span>
        </div>

        {/* 섹션 1: 학습 목표와 목적 */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="text-sm text-blue-600 font-medium">섹션 1</span>
              <h2 className="text-xl font-bold text-gray-900">학습 목표와 목적</h2>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-5 mb-4 text-white">
            <h3 className="text-lg font-bold mb-1">{lessonData.title}</h3>
            <p className="text-blue-200 text-sm">{lessonData.subtitle}</p>
          </div>

          <div className="space-y-3">
            {lessonData.learningGoals.map((goal: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-gray-700">{goal}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 섹션 2: 동영상 */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <span className="text-sm text-red-600 font-medium">섹션 2</span>
              <h2 className="text-xl font-bold text-gray-900">전체 과정 설명 동영상</h2>
            </div>
          </div>

          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${lessonData.videoId}`}
              title={lessonData.videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">{lessonData.videoTitle}</p>
        </section>

        {/* 섹션 3: AI에 질문할 Prompt */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <span className="text-sm text-purple-600 font-medium">섹션 3</span>
              <h2 className="text-xl font-bold text-gray-900">AI에 질문하기</h2>
            </div>
          </div>

          <p className="text-gray-600 mb-4 text-sm">
            아래 질문을 AI에게 물어보고, 답변을 확인해보세요. 질문을 수정할 수도 있습니다.
          </p>

          {/* Prompt 입력창 */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-48 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-800 text-sm font-mono"
            placeholder="AI에게 질문할 내용을 입력하세요..."
          />

          {/* 복사 버튼 */}
          <div className="flex items-center gap-2 mt-3 mb-4">
            <button
              onClick={handleCopyPrompt}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                isCopied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Copy className="w-4 h-4" />
              {isCopied ? '복사됨!' : '질문 복사하기'}
            </button>
          </div>

          {/* 섹션 3.1: AI URL 버튼들 */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
            <p className="text-sm text-purple-700 font-medium mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              버튼을 클릭하면 질문이 복사되고 AI 사이트가 열립니다. Ctrl+V로 붙여넣기 하세요!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {aiServices.map((ai) => (
                <button
                  key={ai.id}
                  onClick={() => handleCopyAndOpenAI(ai.url)}
                  className={`${ai.color} text-white px-4 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2`}
                >
                  <span className="text-lg">{ai.icon}</span>
                  <span>{ai.name}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 섹션 4: AI 결과 확인 */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <span className="text-sm text-green-600 font-medium">섹션 4</span>
              <h2 className="text-xl font-bold text-gray-900">AI 결과 확인</h2>
            </div>
          </div>

          <p className="text-gray-600 mb-4 text-sm">
            AI로부터 받은 답변을 아래에 붙여넣어 저장하거나 다운로드할 수 있습니다.
          </p>

          <textarea
            value={aiResult}
            onChange={(e) => setAiResult(e.target.value)}
            className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-gray-800 text-sm"
            placeholder="AI의 답변을 여기에 붙여넣으세요 (Ctrl+V)..."
          />

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handleSaveResult}
              disabled={!aiResult.trim()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                isResultSaved
                  ? 'bg-green-500 text-white'
                  : aiResult.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Save className="w-4 h-4" />
              {isResultSaved ? '저장됨!' : '결과 저장'}
            </button>
            <button
              onClick={handleDownloadResult}
              disabled={!aiResult.trim()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                aiResult.trim()
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Download className="w-4 h-4" />
              다운로드
            </button>
          </div>

          {/* 결과 미리 확인 팁 */}
          {lessonData.expectedKeywords && lessonData.expectedKeywords.length > 0 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 font-medium mb-2">💡 확인 포인트</p>
              <p className="text-sm text-yellow-700">
                AI 답변에 다음 키워드가 포함되어 있는지 확인해보세요: {' '}
                <span className="font-mono bg-yellow-100 px-1 rounded">
                  {lessonData.expectedKeywords.join(', ')}
                </span>
              </p>
            </div>
          )}
        </section>

        {/* 섹션 5: 퀴즈 & 다음 진행 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <span className="text-sm text-orange-600 font-medium">섹션 5</span>
              <h2 className="text-xl font-bold text-gray-900">학습 확인 및 다음 진행</h2>
            </div>
          </div>

          {/* 퀴즈 */}
          {lessonData.quiz && (
            <QuizSection quiz={lessonData.quiz} onComplete={handleComplete} />
          )}

          {/* 다음 강의 안내 */}
          {lessonData.nextLesson && (
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white text-center mt-6">
              <p className="text-green-100 mb-2">다음 강의</p>
              <h3 className="text-xl font-bold mb-4">Day {lessonData.nextLesson.day}: {lessonData.nextLesson.title}</h3>
              <Link
                href={`/course/coding/c-pc/${level}/lesson/${lessonData.nextLesson.day}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition"
              >
                다음 강의로
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          )}

          {/* 과정 완료 */}
          {!lessonData.nextLesson && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white text-center mt-6">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold mb-2">축하합니다!</h3>
              <p className="text-purple-100 mb-4">{level} 과정의 모든 강의를 완료했습니다!</p>
              <Link
                href={`/course/coding/c-pc/${level}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition"
              >
                강좌 목록으로 돌아가기
              </Link>
            </div>
          )}
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© 2025 커넥트에이아이. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
