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
  Clock,
  FileText,
  Download,
  ShoppingCart,
  ExternalLink,
  Cpu
} from 'lucide-react';

// 레슨 데이터
const lessonData = {
  id: '1.3',
  title: 'C 언어 (ESP32)',
  subtitle: 'ESP32 마이크로컨트롤러를 활용한 임베디드 C 프로그래밍',
  duration: '15시간',
  learningGoals: [
    'ESP32 개발환경 설정 (Arduino IDE / PlatformIO)',
    'GPIO 제어 및 인터럽트 프로그래밍',
    'Wi-Fi/Bluetooth 통신 구현',
    'OLED 디스플레이 및 센서 연동',
    'FreeRTOS 멀티태스킹 기초',
  ],
  board: {
    name: 'UTTEC ESP32 개발보드',
    image: '/images/esp32-board.jpg',
    features: [
      'ESP32-WROOM-32 모듈',
      '0.96" OLED 디스플레이',
      'RGB LED (빨강, 노랑, 파랑)',
      '버튼 3개 (파랑, 노랑, 빨강)',
      '부저',
      'I2C 확장 포트 (UTTEC 센서 연결용)',
    ],
    purchaseInfo: {
      note: '구입처는 추후 공지됩니다',
      price: '추후 안내',
    },
  },
  sections: [
    {
      id: 1,
      type: 'video',
      badge: '🎬 이론',
      duration: '15분',
      title: 'ESP32 소개 및 개발환경 설정',
      description: 'ESP32의 특징과 Arduino IDE 설치 방법을 배웁니다.',
      videoId: 'ZT25P9lUN9c',
    },
    {
      id: 2,
      type: 'video',
      badge: '💻 실습',
      duration: '20분',
      title: '첫 번째 프로젝트: LED 제어',
      description: 'UTTEC 보드의 RGB LED를 제어하는 프로그램을 작성합니다.',
      videoId: 'ZT25P9lUN9c',
    },
    {
      id: 3,
      type: 'video',
      badge: '💻 실습',
      duration: '25분',
      title: '버튼 입력과 OLED 출력',
      description: '버튼 입력을 받아 OLED 디스플레이에 출력하는 프로그램을 만듭니다.',
      videoId: 'ZT25P9lUN9c',
    },
  ],
  quiz: {
    title: '📝 퀴즈',
    questions: [
      {
        id: 1,
        question: 'Q1. ESP32의 특징으로 올바른 것은?',
        options: [
          'Wi-Fi만 지원한다',
          'Wi-Fi와 Bluetooth를 모두 지원한다',
          'Wi-Fi와 Bluetooth를 모두 지원하지 않는다',
          'Bluetooth만 지원한다',
        ],
        correct: 1,
      },
      {
        id: 2,
        question: 'Q2. GPIO란 무엇의 약자인가요?',
        options: [
          'General Purpose Input/Output',
          'Global Program Input/Output',
          'General Program Interface/Output',
          'Global Purpose Input/Output',
        ],
        correct: 0,
      },
      {
        id: 3,
        question: 'Q3. ESP32에서 LED를 켜기 위한 함수는?',
        options: [
          'ledOn()',
          'digitalWrite()',
          'turnLED()',
          'setLED()',
        ],
        correct: 1,
      },
    ],
  },
  additionalResources: [
    { title: 'ESP32 핀맵 가이드', type: 'PDF' },
    { title: '예제 소스코드', type: 'ZIP' },
    { title: 'UTTEC 보드 회로도', type: 'PDF' },
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
        <div className="mt-6 p-4 bg-green-50 rounded-xl">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 mb-2">
              🎉 1.3강 완료!
            </p>
            <p className="text-gray-600 mb-4">
              {correctCount}/{quiz.questions.length}개 정답을 맞추셨습니다.
            </p>
            <Link
              href="/course/2"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              <CheckCircle className="w-5 h-5" />
              완료! 다음 강의로 →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ESP32LessonPage() {
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

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
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

      {/* 상단 네비게이션 */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/course/2"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              코딩 전문가 목록
            </Link>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {lessonData.id}
              </span>
              <span className="px-3 py-1 bg-green-500 rounded-full text-sm">
                📝 퀴즈 포함
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 레슨 헤더 */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="w-8 h-8" />
            <h1 className="text-2xl md:text-3xl font-bold">{lessonData.title}</h1>
          </div>
          <p className="text-green-200">{lessonData.subtitle}</p>
          <div className="flex items-center gap-4 mt-4 text-green-100">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              총 {lessonData.duration}
            </span>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8 -mt-4">
        {/* 실습 보드 안내 - 중요! */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-300 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">🔧 실습 보드 안내</h3>
          </div>

          {/* 보드 이미지 */}
          <div className="mb-6">
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
              <img
                src={lessonData.board.image}
                alt={lessonData.board.name}
                className="w-full h-64 md:h-80 object-contain bg-white"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="w-full h-64 md:h-80 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                      <div class="text-center">
                        <div class="text-6xl mb-4">🔌</div>
                        <p class="text-gray-600 font-medium">UTTEC ESP32 개발보드</p>
                        <p class="text-gray-500 text-sm">이미지 준비 중</p>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              {lessonData.board.name} - 수업에 사용되는 실제 하드웨어입니다
            </p>
          </div>

          {/* 보드 특징 */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <h4 className="font-semibold text-gray-800 mb-3">보드 구성 요소</h4>
            <ul className="grid md:grid-cols-2 gap-2">
              {lessonData.board.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 구입 안내 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <ShoppingCart className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-800">구입 안내</p>
                <p className="text-sm text-yellow-700">{lessonData.board.purchaseInfo.note}</p>
                <p className="text-sm text-yellow-600 mt-1">가격: {lessonData.board.purchaseInfo.price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 학습 목표 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            📚 학습 목표
          </h3>
          <ul className="space-y-2">
            {lessonData.learningGoals.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </span>
                <span className="text-gray-700">{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 동영상 섹션들 */}
        {lessonData.sections.map((section) => (
          <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {section.badge}
              </span>
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {section.duration}
              </span>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h4>

            <YouTubePlayer videoId={section.videoId} title={section.title} />

            {section.description && (
              <p className="mt-4 text-gray-600 text-sm">{section.description}</p>
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
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    resource.type === 'PDF' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      resource.type === 'PDF' ? 'text-red-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">{resource.title}</span>
                    <span className="ml-2 text-xs text-gray-500">{resource.type}</span>
                  </div>
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
              <p className="text-sm">AI와 함께하는 진로교육 플랫폼</p>
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
