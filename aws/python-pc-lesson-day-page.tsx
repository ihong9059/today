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
  Play,
  Circle,
  CheckCircle2
} from 'lucide-react';

// 수강 신청 데이터
const enrollmentData: Record<string, string[]> = {
  'test@test.com': ['python-pc'],
};

// 강좌 정보
const courseInfo: Record<string, { title: string; price: number }> = {
  'python-pc': { title: 'Python (PC)', price: 79000 },
};

// 무료 AI 목록
const aiServices = [
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'bg-green-500 hover:bg-green-600', icon: '🤖' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/', color: 'bg-orange-500 hover:bg-orange-600', icon: '🧠' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/', color: 'bg-blue-500 hover:bg-blue-600', icon: '✨' },
  { id: 'copilot', name: 'Copilot', url: 'https://copilot.microsoft.com/', color: 'bg-purple-500 hover:bg-purple-600', icon: '💡' },
];

// ============================================
// Python Day별 레슨 데이터
// ============================================
const lessonDataByDay: Record<number, any> = {
  // ============================================
  // Day 1: Python 소개와 개발환경 설정
  // ============================================
  1: {
    day: 1,
    title: 'Python 소개와 첫 프로그램',
    subtitle: 'Python의 특징을 이해하고 VS Code에서 첫 번째 프로그램을 실행합니다.',
    videoId: 'YOUTUBE_VIDEO_ID_HERE',  // 진행방법 동영상 ID로 교체 필요
    videoTitle: '진행방법',
    goals: [
      {
        id: 1,
        title: 'Python의 특징과 활용 분야 이해하기',
        description: 'Python이 왜 인기 있는 언어인지, 어디에 사용되는지 학습합니다.',
        prompt: `Python을 처음 배우려고 합니다. 다음 질문에 대해 초보자도 이해할 수 있게 설명해주세요:

1. Python은 언제, 누가 만들었나요?
2. Python의 가장 큰 특징 3가지는 무엇인가요?
3. Python이 사용되는 분야는 어디인가요? (예: AI, 웹, 데이터 분석 등)
4. Python이 다른 언어(C, Java)에 비해 배우기 쉬운 이유는?

간단한 예시와 함께 설명해주세요.`,
        expectedKeywords: ['Guido van Rossum', '1991', '인터프리터', '들여쓰기'],
        quiz: {
          question: 'Python을 개발한 사람은 누구인가요?',
          options: ['Dennis Ritchie', 'Guido van Rossum', 'James Gosling', 'Brendan Eich'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '첫 번째 Hello World 프로그램 실행하기',
        description: 'VS Code에서 Python 파일을 만들고 실행해봅니다.',
        prompt: `Python으로 첫 번째 프로그램을 작성하려고 합니다. 다음을 설명해주세요:

1. VS Code에서 .py 파일을 만드는 방법
2. "Hello, World!"를 출력하는 Python 코드를 보여주세요.
3. print() 함수는 어떻게 사용하나요?
4. VS Code에서 Python 파일을 실행하는 방법 (실행 버튼, 터미널)
5. C언어와 비교했을 때 Python이 얼마나 간단한가요?

코드 예시와 함께 설명해주세요.`,
        expectedKeywords: ['print', '.py', '실행 버튼', 'python'],
        quiz: {
          question: 'Python에서 화면에 출력할 때 사용하는 함수는?',
          options: ['console.log()', 'printf()', 'print()', 'echo()'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 2, title: '변수와 자료형' },
  },

  // ============================================
  // Day 2: 변수와 자료형 (기본 구조)
  // ============================================
  2: {
    day: 2,
    title: '변수와 자료형',
    subtitle: 'Python의 변수 선언 방법과 기본 자료형을 학습합니다.',
    videoId: 'kWiCuklohdY',
    videoTitle: 'Python 입문 - Day 2: 변수와 자료형',
    goals: [
      {
        id: 1,
        title: '변수의 개념과 선언 방법 이해하기',
        description: 'Python에서 변수를 만들고 값을 저장하는 방법을 학습합니다.',
        prompt: `Python의 변수에 대해 배우려고 합니다. 다음을 설명해주세요:

1. 변수란 무엇인가요?
2. Python에서 변수를 만드는 방법 (C언어처럼 자료형을 쓰지 않아도 되는 이유)
3. 변수 이름 규칙 (시작 문자, 예약어 등)
4. 예시 코드: name = "홍길동", age = 25, height = 175.5

코드 예시와 함께 설명해주세요.`,
        expectedKeywords: ['변수', '할당', '=', '동적 타이핑'],
        quiz: {
          question: 'Python에서 변수를 만들 때 필요한 것은?',
          options: ['int 키워드', '= 연산자만', 'var 키워드', 'let 키워드'],
          correctAnswer: 1,
        },
      },
      {
        id: 2,
        title: '기본 자료형 (숫자, 문자열, 불린)',
        description: 'Python의 기본 자료형을 이해하고 사용합니다.',
        prompt: `Python의 기본 자료형에 대해 배우려고 합니다:

1. 정수(int)와 실수(float)의 차이점
2. 문자열(str) 만드는 방법 (작은따옴표, 큰따옴표)
3. 불린(bool) - True와 False
4. type() 함수로 자료형 확인하는 방법
5. 각 자료형의 예시 코드

코드 예시와 함께 설명해주세요.`,
        expectedKeywords: ['int', 'float', 'str', 'bool', 'type()'],
        quiz: {
          question: 'Python에서 3.14의 자료형은?',
          options: ['int', 'float', 'str', 'double'],
          correctAnswer: 1,
        },
      },
      {
        id: 3,
        title: '사용자 입력 받기 (input 함수)',
        description: 'input() 함수로 사용자로부터 데이터를 입력받습니다.',
        prompt: `Python의 input() 함수에 대해 배우려고 합니다:

1. input() 함수의 기본 사용법
2. input()은 항상 문자열을 반환한다는 점
3. 숫자를 입력받으려면 int()나 float()로 변환해야 하는 이유
4. 예시: 이름과 나이를 입력받아 출력하는 프로그램

코드 예시와 함께 설명해주세요.`,
        expectedKeywords: ['input()', 'int()', 'float()', '형변환'],
        quiz: {
          question: 'input() 함수가 반환하는 자료형은?',
          options: ['int', 'float', 'str', 'bool'],
          correctAnswer: 2,
        },
      },
    ],
    nextLesson: { day: 3, title: '연산자와 표현식' },
  },

  // ============================================
  // Day 3 ~ Day 15 기본 구조 (나중에 상세 내용 추가)
  // ============================================
};

// Day 3~15 기본 구조 생성
const dayTopics: Record<number, { title: string; subtitle: string; nextTitle: string }> = {
  3: { title: '연산자와 표현식', subtitle: '산술, 비교, 논리 연산자를 학습합니다.', nextTitle: '조건문 (if-else)' },
  4: { title: '조건문 (if-else)', subtitle: 'if, elif, else를 사용한 조건 분기를 학습합니다.', nextTitle: '반복문 (for)' },
  5: { title: '반복문 (for)', subtitle: 'for 루프와 range() 함수를 학습합니다.', nextTitle: '반복문 (while)' },
  6: { title: '반복문 (while)', subtitle: 'while 루프와 break, continue를 학습합니다.', nextTitle: '함수 기초' },
  7: { title: '함수 기초', subtitle: '함수 정의와 호출 방법을 학습합니다.', nextTitle: '함수 심화' },
  8: { title: '함수 심화', subtitle: '매개변수, 반환값, 기본값을 학습합니다.', nextTitle: '리스트 (List)' },
  9: { title: '리스트 (List)', subtitle: '리스트 생성, 인덱싱, 슬라이싱을 학습합니다.', nextTitle: '리스트 활용' },
  10: { title: '리스트 활용', subtitle: '리스트 메서드와 리스트 컴프리헨션을 학습합니다.', nextTitle: '딕셔너리 (Dictionary)' },
  11: { title: '딕셔너리 (Dictionary)', subtitle: '딕셔너리 생성과 활용 방법을 학습합니다.', nextTitle: '튜플과 세트' },
  12: { title: '튜플과 세트', subtitle: '튜플과 세트 자료형을 학습합니다.', nextTitle: '문자열 처리' },
  13: { title: '문자열 처리', subtitle: '문자열 메서드와 포맷팅을 학습합니다.', nextTitle: '파일 입출력' },
  14: { title: '파일 입출력', subtitle: '파일 읽기/쓰기 방법을 학습합니다.', nextTitle: '미니 프로젝트' },
  15: { title: '미니 프로젝트', subtitle: '배운 내용을 활용한 프로젝트를 완성합니다.', nextTitle: '' },
};

for (let day = 3; day <= 15; day++) {
  if (!lessonDataByDay[day]) {
    const topic = dayTopics[day];
    lessonDataByDay[day] = {
      day,
      title: topic.title,
      subtitle: topic.subtitle,
      videoId: 'kWiCuklohdY',
      videoTitle: `Python 입문 - Day ${day}: ${topic.title}`,
      goals: [
        {
          id: 1,
          title: `${topic.title} 개념 이해하기`,
          description: '핵심 개념을 학습합니다.',
          prompt: `Python의 ${topic.title}에 대해 초보자도 이해할 수 있게 설명해주세요.

1. ${topic.title}이란 무엇인가요?
2. 기본 문법과 사용 방법
3. 간단한 예제 코드
4. 주의할 점

코드 예시와 함께 설명해주세요.`,
          expectedKeywords: [],
          quiz: { question: '퀴즈 문제 (준비 중)', options: ['보기1', '보기2', '보기3', '보기4'], correctAnswer: 0 },
        },
        {
          id: 2,
          title: `${topic.title} 실습하기`,
          description: '직접 코드를 작성해봅니다.',
          prompt: `Python ${topic.title} 실습 문제입니다:

간단한 연습 문제와 풀이를 알려주세요.
초보자가 따라할 수 있도록 단계별로 설명해주세요.`,
          expectedKeywords: [],
          quiz: { question: '퀴즈 문제 (준비 중)', options: ['보기1', '보기2', '보기3', '보기4'], correctAnswer: 0 },
        },
        {
          id: 3,
          title: `${topic.title} 응용하기`,
          description: '배운 내용을 응용해봅니다.',
          prompt: `Python ${topic.title}를 응용한 프로그램을 만들어주세요:

실생활에서 활용할 수 있는 간단한 프로그램 예시를 보여주세요.
코드와 함께 설명해주세요.`,
          expectedKeywords: [],
          quiz: { question: '퀴즈 문제 (준비 중)', options: ['보기1', '보기2', '보기3', '보기4'], correctAnswer: 0 },
        },
      ],
      nextLesson: day < 15 ? { day: day + 1, title: topic.nextTitle } : null,
    };
  }
}

// ============================================
// 수강 신청 안내 컴포넌트
// ============================================
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

// ============================================
// 개별 목표 섹션 컴포넌트
// ============================================
function GoalSection({
  goal,
  goalIndex,
  totalGoals,
  isActive,
  isCompleted,
  onComplete,
  copyToClipboard,
  courseId,
  level,
  day
}: {
  goal: any;
  goalIndex: number;
  totalGoals: number;
  isActive: boolean;
  isCompleted: boolean;
  onComplete: () => void;
  copyToClipboard: (text: string) => boolean;
  courseId: string;
  level: string;
  day: number;
}) {
  const [prompt, setPrompt] = useState(goal.prompt);
  const [aiResult, setAiResult] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState(false);
  const [downloadedFileName, setDownloadedFileName] = useState<string | null>(null);

  const handleCopyAndOpenAI = (aiUrl: string) => {
    const success = copyToClipboard(prompt);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      window.open(aiUrl, '_blank');
    }
  };

  const handleCopyPrompt = () => {
    const success = copyToClipboard(prompt);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const getFileName = () => {
    return `Python_${level}_Day${day}_목표${goal.id}_${goal.title.replace(/\s+/g, '_')}.txt`;
  };

  const handleSaveAs = async () => {
    if (!aiResult.trim()) return;
    const fileName = getFileName();
    if ('showSaveFilePicker' in window) {
      try {
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: fileName,
          types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }],
        });
        const writable = await handle.createWritable();
        await writable.write(aiResult);
        await writable.close();
        setDownloadedFileName(fileName);
        setTimeout(() => setDownloadedFileName(null), 5000);
      } catch (err: any) {
        if (err.name !== 'AbortError') console.error('Save failed:', err);
      }
    } else {
      handleDownloadResult();
    }
  };

  const handleDownloadResult = () => {
    if (!aiResult.trim()) return;
    const fileName = getFileName();
    const blob = new Blob([aiResult], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadedFileName(fileName);
    setTimeout(() => setDownloadedFileName(null), 5000);
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === goal.quiz.correctAnswer;
    setIsQuizCorrect(correct);
    setShowQuizResult(true);
    if (correct) {
      setTimeout(() => onComplete(), 1000);
    }
  };

  // 비활성 상태
  if (!isActive && !isCompleted) {
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 opacity-60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-bold">
            {goalIndex + 1}
          </div>
          <div>
            <h3 className="font-semibold text-gray-500">{goal.title}</h3>
            <p className="text-sm text-gray-400">이전 목표를 완료하면 진행할 수 있습니다</p>
          </div>
        </div>
      </div>
    );
  }

  // 완료된 상태
  if (isCompleted) {
    return (
      <div className="bg-green-50 rounded-xl border border-green-200 p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-green-800">{goal.title}</h3>
            <p className="text-sm text-green-600">✓ 완료됨</p>
          </div>
        </div>
      </div>
    );
  }

  // 활성 상태 (현재 진행 중)
  return (
    <div className="bg-white rounded-xl border-2 border-yellow-400 shadow-lg overflow-hidden">
      {/* 섹션 헤더 - Python 테마 (노란색) */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
            {goalIndex + 1}
          </div>
          <div>
            <p className="text-yellow-100 text-sm">목표 {goalIndex + 1} / {totalGoals}</p>
            <h3 className="font-bold text-lg">{goal.title}</h3>
          </div>
        </div>
        <p className="text-yellow-100 text-sm mt-2 ml-11">{goal.description}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Step 1: AI 질문하기 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-800">Step 1: AI에게 질문하기</h4>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-36 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none text-gray-800 text-sm font-mono"
          />

          <div className="flex items-center gap-2 mt-2 mb-3">
            <button
              onClick={handleCopyPrompt}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                isCopied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Copy className="w-3 h-3" />
              {isCopied ? '복사됨!' : '복사'}
            </button>
          </div>

          <div className="bg-yellow-50 rounded-lg p-3">
            <p className="text-xs text-yellow-700 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              버튼 클릭 → 질문 복사 → AI 사이트 열림 → Ctrl+V로 붙여넣기
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {aiServices.map((ai) => (
                <button
                  key={ai.id}
                  onClick={() => handleCopyAndOpenAI(ai.url)}
                  className={`${ai.color} text-white px-3 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-1`}
                >
                  <span>{ai.icon}</span>
                  <span>{ai.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: AI 결과 확인 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-800">Step 2: AI 결과 붙여넣기</h4>
          </div>

          <textarea
            value={aiResult}
            onChange={(e) => setAiResult(e.target.value)}
            className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-gray-800 text-sm"
            placeholder="AI의 답변을 여기에 붙여넣으세요 (Ctrl+V)... 나중에 VS Code에서 실행하여 검증할 수 있습니다."
          />

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveAs}
                disabled={!aiResult.trim()}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  aiResult.trim()
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Save className="w-3 h-3" />
                다른 이름으로 저장
              </button>
              <button
                onClick={handleDownloadResult}
                disabled={!aiResult.trim()}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  aiResult.trim()
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Download className="w-3 h-3" />
                다운로드
              </button>
            </div>

            <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
              {downloadedFileName ? (
                <p className="text-green-600 font-medium">
                  ✅ 저장 완료: <span className="font-mono bg-green-100 px-1 rounded">{downloadedFileName}</span>
                </p>
              ) : (
                <p>
                  💾 <strong>다른 이름으로 저장</strong>: 원하는 폴더 선택 가능 (Chrome/Edge)<br/>
                  📁 <strong>다운로드</strong>: 기본 다운로드 폴더에 저장됨
                </p>
              )}
            </div>
          </div>

          {goal.expectedKeywords && goal.expectedKeywords.length > 0 && (
            <p className="text-xs text-gray-500 mt-3">
              💡 확인 포인트: <span className="font-mono bg-gray-100 px-1 rounded">{goal.expectedKeywords.join(', ')}</span>
            </p>
          )}
        </div>

        {/* Step 3: 퀴즈 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-800">Step 3: 학습 확인 퀴즈</h4>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-3">{goal.quiz.question}</p>
            <div className="space-y-2">
              {goal.quiz.options.map((option: string, idx: number) => {
                let optionClass = 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50';
                if (showQuizResult) {
                  if (idx === goal.quiz.correctAnswer) {
                    optionClass = 'border-green-500 bg-green-50';
                  } else if (idx === selectedAnswer && !isQuizCorrect) {
                    optionClass = 'border-red-500 bg-red-50';
                  }
                } else if (idx === selectedAnswer) {
                  optionClass = 'border-yellow-500 bg-yellow-50';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !showQuizResult && setSelectedAnswer(idx)}
                    disabled={showQuizResult}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${optionClass}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAnswer === idx ? 'border-yellow-500' : 'border-gray-300'}`}>
                        {selectedAnswer === idx && <div className="w-2 h-2 rounded-full bg-yellow-500" />}
                      </div>
                      <span className="text-gray-700 text-sm">{option}</span>
                      {showQuizResult && idx === goal.quiz.correctAnswer && (
                        <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {!showQuizResult ? (
              <button
                onClick={handleQuizSubmit}
                disabled={selectedAnswer === null}
                className={`mt-4 w-full py-2 rounded-lg font-semibold text-sm transition ${
                  selectedAnswer !== null
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                정답 확인
              </button>
            ) : (
              <div className={`mt-4 p-3 rounded-lg text-center ${isQuizCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className={`font-bold ${isQuizCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isQuizCorrect ? '🎉 정답입니다! 다음 목표로 이동합니다...' : '❌ 틀렸습니다. 다시 시도해주세요.'}
                </p>
                {!isQuizCorrect && (
                  <button
                    onClick={() => {
                      setShowQuizResult(false);
                      setSelectedAnswer(null);
                    }}
                    className="mt-2 text-sm text-red-600 underline"
                  >
                    다시 시도
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 메인 페이지 컴포넌트
// ============================================
export default function PythonPCLessonDayPage() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [completedGoals, setCompletedGoals] = useState<number[]>([]);
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);

  const lessonData = lessonDataByDay[day];
  const courseId = 'python-pc';

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

  const copyToClipboard = (text: string): boolean => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
      return true;
    }
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleGoalComplete = (goalId: number) => {
    if (!completedGoals.includes(goalId)) {
      setCompletedGoals([...completedGoals, goalId]);
      if (currentGoalIndex < lessonData.goals.length - 1) {
        setCurrentGoalIndex(currentGoalIndex + 1);
      }
    }
  };

  const allGoalsCompleted = lessonData && completedGoals.length === lessonData.goals.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !isEnrolled) {
    return <EnrollmentRequired courseId={courseId} level={level} />;
  }

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 강의입니다</h1>
          <Link href={`/course/coding/python-pc/${level}`} className="text-yellow-600 hover:underline">
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
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mr-2">
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
            href={`/course/coding/python-pc/${level}`}
            className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium hover:bg-yellow-200 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            강의 목록으로
          </Link>
          <span className="px-3 py-1.5 bg-yellow-400 text-yellow-900 rounded-full text-sm font-medium">Day {day}</span>
          <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">{level}</span>
        </div>

        {/* 강의 제목 - Python 테마 */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🐍</span>
            <h1 className="text-2xl font-bold">{lessonData.title}</h1>
          </div>
          <p className="text-yellow-100 text-sm">{lessonData.subtitle}</p>

          {/* 진행률 */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>진행률</span>
              <span>{completedGoals.length}/{lessonData.goals.length} 완료</span>
            </div>
            <div className="w-full bg-yellow-700/50 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedGoals.length / lessonData.goals.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 학습 목표 목록 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-yellow-600" />
            <h2 className="font-bold text-gray-900">오늘의 학습 목표</h2>
          </div>
          <div className="space-y-2">
            {lessonData.goals.map((goal: any, idx: number) => (
              <div key={goal.id} className="flex items-center gap-3">
                {completedGoals.includes(goal.id) ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : idx === currentGoalIndex ? (
                  <div className="w-5 h-5 border-2 border-yellow-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
                <span className={`text-sm ${completedGoals.includes(goal.id) ? 'text-green-700 line-through' : idx === currentGoalIndex ? 'text-yellow-700 font-medium' : 'text-gray-400'}`}>
                  {goal.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 동영상 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Play className="w-5 h-5 text-red-600" />
            <h2 className="font-bold text-gray-900">진행방법</h2>
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
        </div>

        {/* 목표별 섹션들 */}
        <div className="space-y-4">
          {lessonData.goals.map((goal: any, idx: number) => (
            <GoalSection
              key={goal.id}
              goal={goal}
              goalIndex={idx}
              totalGoals={lessonData.goals.length}
              isActive={idx === currentGoalIndex}
              isCompleted={completedGoals.includes(goal.id)}
              onComplete={() => handleGoalComplete(goal.id)}
              copyToClipboard={copyToClipboard}
              courseId={courseId}
              level={level}
              day={day}
            />
          ))}
        </div>

        {/* 완료 시 다음 강의 */}
        {allGoalsCompleted && (
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="text-xl font-bold mb-2">Day {day} 학습 완료!</h2>
            <p className="text-green-100 mb-4">모든 목표를 달성했습니다. 훌륭해요!</p>
            {lessonData.nextLesson && (
              <Link
                href={`/course/coding/python-pc/${level}/lesson/${lessonData.nextLesson.day}`}
                className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                다음 강의: {lessonData.nextLesson.title}
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        )}

        {/* Day 이동 버튼 */}
        <div className="flex justify-between items-center pt-4">
          {day > 1 ? (
            <Link
              href={`/course/coding/python-pc/${level}/lesson/${day - 1}`}
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Day {day - 1}
            </Link>
          ) : (
            <div />
          )}
          {day < 15 && (
            <Link
              href={`/course/coding/python-pc/${level}/lesson/${day + 1}`}
              className="flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              Day {day + 1}
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
