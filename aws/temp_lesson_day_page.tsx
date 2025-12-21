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
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  AlertTriangle,
  BookOpen,
  Code,
  Target
} from 'lucide-react';

// Day별 레슨 데이터
const lessonDataByDay: Record<number, any> = {
  1: {
    day: 1,
    title: 'ESP32 소개와 개발환경 설정',
    subtitle: 'ChatGPT와 에이전트 빌더의 차이점을 이해하고, 워크플로우 자동화의 개념을 배웁니다.',
    progress: 0,
    learningGoals: [
      'ESP32의 특징과 활용 분야 이해하기',
      'Arduino IDE 설치 및 ESP32 보드 설정 배우기',
      '첫 번째 프로그램(Blink) 업로드해보기',
    ],
    sections: [
      {
        id: 1,
        type: 'video',
        badge: '필수',
        duration: '8분 시청',
        title: '추가 영상: 중요 안내',
        videoId: 'ZT25P9lUN9c',
        notice: {
          icon: '⚠️',
          text: '이 영상을 먼저 시청해주세요!',
          subtext: '강의 진행 전 반드시 알아야 할 중요한 내용입니다.',
        },
      },
      {
        id: 2,
        type: 'video',
        badge: '이론',
        duration: '5분',
        title: '이론 강의: ESP32 마이크로컨트롤러 소개',
        videoId: 'ZT25P9lUN9c',
        content: {
          title: 'ESP32 vs Arduino 비교',
          items: [
            {
              label: 'Arduino',
              description: '입문자를 위한 간단한 마이크로컨트롤러',
            },
            {
              label: 'ESP32',
              description: 'Wi-Fi/Bluetooth 내장, 고성능 듀얼코어 프로세서',
            },
          ],
          keyPoint: {
            title: '핵심 차이',
            description: 'ESP32는 Wi-Fi와 Bluetooth가 내장되어 있어 IoT 프로젝트에 최적화되어 있습니다.',
            example: '"무선 연결이 필요한 프로젝트" → LED 원격제어, 센서 데이터 전송, 스마트홈 등',
          },
        },
      },
      {
        id: 3,
        type: 'video',
        badge: '실습',
        duration: '10분 시청',
        title: '실습: 개발환경 설정하기',
        videoId: 'ZT25P9lUN9c',
        description: '위의 실습 비디오를 보면서 Arduino IDE를 설치하고 ESP32 보드를 설정해보세요!',
      },
    ],
    quiz: {
      title: '퀴즈',
      questions: [
        {
          id: 1,
          question: 'ESP32의 가장 큰 특징은 무엇인가요?',
          options: [
            'ESP32는 매우 저렴하다',
            'ESP32는 Wi-Fi와 Bluetooth가 내장되어 있다',
            'ESP32는 아두이노보다 작다',
            'ESP32는 C언어만 지원한다',
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: 'Arduino IDE에서 ESP32 보드를 사용하려면 무엇을 해야 하나요?',
          options: [
            '별도 설정 없이 바로 사용',
            '보드 매니저에서 ESP32 패키지 설치',
            '새로운 IDE 설치',
            'Python 설치',
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: 'ESP32의 코어 개수는?',
          options: [
            '싱글 코어',
            '듀얼 코어',
            '쿼드 코어',
            '옥타 코어',
          ],
          correctAnswer: 1,
        },
      ],
    },
    additionalResources: [
      {
        title: '예제 파일과 자료집',
        type: 'download',
        icon: 'file',
      },
    ],
    nextLesson: {
      day: 2,
      title: 'GPIO 기초 - LED 제어하기',
    },
  },
  2: {
    day: 2,
    title: 'GPIO 기초 - LED 제어하기',
    subtitle: '디지털 출력을 이해하고 LED를 제어하는 방법을 배웁니다.',
    progress: 0,
    learningGoals: [
      'GPIO 핀의 개념과 디지털 출력 이해하기',
      'LED 회로 구성 방법 배우기',
      '다양한 블링크 패턴 프로그래밍하기',
    ],
    sections: [
      {
        id: 1,
        type: 'video',
        badge: '이론',
        duration: '7분',
        title: '이론 강의: GPIO와 디지털 출력',
        videoId: 'ZT25P9lUN9c',
        content: {
          title: 'GPIO (General Purpose Input/Output)',
          items: [
            { label: 'HIGH', description: '3.3V 출력 (LED ON)' },
            { label: 'LOW', description: '0V 출력 (LED OFF)' },
          ],
          keyPoint: {
            title: '중요 개념',
            description: 'ESP32는 3.3V 로직을 사용합니다. 5V 센서 연결 시 주의가 필요합니다.',
            example: 'pinMode(LED_PIN, OUTPUT); → digitalWrite(LED_PIN, HIGH);',
          },
        },
      },
      {
        id: 2,
        type: 'video',
        badge: '실습',
        duration: '15분 시청',
        title: '실습: LED 블링크 만들기',
        videoId: 'ZT25P9lUN9c',
        description: 'LED를 연결하고 다양한 블링크 패턴을 만들어보세요!',
      },
    ],
    quiz: {
      title: '퀴즈',
      questions: [
        {
          id: 1,
          question: 'ESP32의 GPIO 출력 전압은?',
          options: ['1.8V', '3.3V', '5V', '12V'],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: 'LED를 켜려면 어떤 함수를 사용하나요?',
          options: ['ledOn()', 'digitalWrite(pin, HIGH)', 'turnOn(LED)', 'LED.on()'],
          correctAnswer: 1,
        },
      ],
    },
    additionalResources: [
      { title: 'LED 회로도 및 예제 코드', type: 'download', icon: 'file' },
    ],
    nextLesson: { day: 3, title: '버튼 입력과 인터럽트' },
  },
};

// 기본 레슨 데이터 (Day 3-10)
for (let day = 3; day <= 10; day++) {
  if (!lessonDataByDay[day]) {
    lessonDataByDay[day] = {
      day,
      title: `Day ${day} 강의`,
      subtitle: '준비 중인 강의입니다.',
      progress: 0,
      learningGoals: ['학습 목표 1', '학습 목표 2', '학습 목표 3'],
      sections: [
        {
          id: 1,
          type: 'video',
          badge: '이론',
          duration: '10분',
          title: '이론 강의',
          videoId: 'ZT25P9lUN9c',
        },
        {
          id: 2,
          type: 'video',
          badge: '실습',
          duration: '15분',
          title: '실습',
          videoId: 'ZT25P9lUN9c',
        },
      ],
      quiz: {
        title: '퀴즈',
        questions: [
          {
            id: 1,
            question: '퀴즈 문제 1',
            options: ['보기 1', '보기 2', '보기 3', '보기 4'],
            correctAnswer: 0,
          },
        ],
      },
      additionalResources: [],
      nextLesson: day < 10 ? { day: day + 1, title: `Day ${day + 1} 강의` } : null,
    };
  }
}

// 비디오 섹션 컴포넌트
function VideoSection({ section }: { section: any }) {
  const badgeColors: Record<string, string> = {
    '필수': 'bg-red-500',
    '이론': 'bg-blue-500',
    '실습': 'bg-green-500',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <span className={`px-3 py-1 ${badgeColors[section.badge] || 'bg-gray-500'} text-white text-sm font-medium rounded-full`}>
          {section.badge}
        </span>
        <span className="text-sm text-gray-500">{section.duration}</span>
      </div>

      {/* 제목 */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>

        {/* 비디오 */}
        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${section.videoId}`}
            title={section.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* 알림 박스 */}
        {section.notice && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <span className="text-xl">{section.notice.icon}</span>
              <div>
                <p className="font-semibold text-yellow-800">{section.notice.text}</p>
                <p className="text-sm text-yellow-700">{section.notice.subtext}</p>
              </div>
            </div>
          </div>
        )}

        {/* 콘텐츠 설명 */}
        {section.content && (
          <div className="bg-gray-50 rounded-lg p-5 mt-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-500" />
              {section.content.title}
            </h4>

            {section.content.items && (
              <div className="space-y-2 mb-4">
                {section.content.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="font-semibold text-blue-600 min-w-[80px]">{item.label}:</span>
                    <span className="text-gray-600">{item.description}</span>
                  </div>
                ))}
              </div>
            )}

            {section.content.keyPoint && (
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  {section.content.keyPoint.title}
                </h5>
                <p className="text-gray-700 mb-2">{section.content.keyPoint.description}</p>
                <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded font-mono">
                  {section.content.keyPoint.example}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 실습 설명 */}
        {section.description && (
          <p className="text-gray-600 mt-4 bg-blue-50 p-4 rounded-lg">
            {section.description}
          </p>
        )}
      </div>
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
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setShowResults(true);
  };

  const allAnswered = quiz.questions.every((q: any) => answers[q.id] !== undefined);
  const allCorrect = score === quiz.questions.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-blue-500" />
        {quiz.title}
      </h3>

      <div className="space-y-8">
        {quiz.questions.map((question: any, qIdx: number) => (
          <div key={question.id} className="border-b border-gray-100 pb-6 last:border-0">
            <p className="font-semibold text-gray-900 mb-4">
              Q{qIdx + 1}. {question.question}
            </p>
            <div className="space-y-2">
              {question.options.map((option: string, oIdx: number) => {
                const isSelected = answers[question.id] === oIdx;
                const isCorrect = question.correctAnswer === oIdx;
                let optionClass = 'border-gray-200 hover:border-blue-300 hover:bg-blue-50';

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
                  <button
                    key={oIdx}
                    onClick={() => handleAnswer(question.id, oIdx)}
                    disabled={showResults}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${optionClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-blue-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                      </div>
                      <span className="text-gray-700">{option}</span>
                      {showResults && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      )}
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
          className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${
            allAnswered
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          정답 보기
        </button>
      ) : (
        <div className="mt-6">
          <div className={`p-4 rounded-lg text-center ${
            allCorrect ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            <p className="text-2xl mb-2">{allCorrect ? '🎉' : '📝'}</p>
            <p className={`font-bold text-lg ${allCorrect ? 'text-green-800' : 'text-yellow-800'}`}>
              {score}/{quiz.questions.length}점 {allCorrect ? '완료!' : ''}
            </p>
            <p className={`text-sm ${allCorrect ? 'text-green-700' : 'text-yellow-700'}`}>
              {allCorrect ? '모든 문제를 맞추셨습니다!' : '틀린 문제를 다시 확인해보세요.'}
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

export default function LessonDayPage() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('홍광선');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const lessonData = lessonDataByDay[day];

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

  const handleComplete = () => {
    setIsCompleted(true);
    if (lessonData.nextLesson) {
      router.push(`/course/coding/c-esp32/${level}/lesson/${lessonData.nextLesson.day}`);
    } else {
      router.push(`/course/coding/c-esp32/${level}`);
    }
  };

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 강의입니다</h1>
          <Link href={`/course/coding/c-esp32/${level}`} className="text-blue-600 hover:underline">
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
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">
                강좌 목록
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
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 네비게이션 */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href={`/course/coding/c-esp32/${level}`}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            강의 목록으로
          </Link>
          <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            Day {day}
          </span>
          <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
            {level}
          </span>
        </div>

        {/* 강의 헤더 */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 mb-6 text-white">
          <h1 className="text-2xl font-bold mb-2">{lessonData.title}</h1>
          <p className="text-blue-200">{lessonData.subtitle}</p>

          {/* 진행률 */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>진행률</span>
              <span>{lessonData.progress}%</span>
            </div>
            <div className="w-full bg-blue-900/50 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all"
                style={{ width: `${lessonData.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 학습 목표 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            학습 목표
          </h3>
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
        </div>

        {/* 비디오 섹션들 */}
        {lessonData.sections.map((section: any) => (
          <VideoSection key={section.id} section={section} />
        ))}

        {/* 퀴즈 */}
        {lessonData.quiz && (
          <QuizSection quiz={lessonData.quiz} onComplete={handleComplete} />
        )}

        {/* 추가 학습 자료 */}
        {lessonData.additionalResources && lessonData.additionalResources.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              추가 학습 자료
            </h3>
            <div className="space-y-3">
              {lessonData.additionalResources.map((resource: any, idx: number) => (
                <button
                  key={idx}
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-left"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Download className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-700">{resource.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 다음 강의 안내 */}
        {lessonData.nextLesson && (
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white text-center">
            <p className="text-green-100 mb-2">다음 강의</p>
            <h3 className="text-xl font-bold mb-4">
              Day {lessonData.nextLesson.day}: {lessonData.nextLesson.title}
            </h3>
            <Link
              href={`/course/coding/c-esp32/${level}/lesson/${lessonData.nextLesson.day}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition"
            >
              다음 강의로
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        )}
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
