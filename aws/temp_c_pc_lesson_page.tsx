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
  Target,
  Lock,
  ShoppingCart
} from 'lucide-react';

// 수강 신청 데이터 (실제로는 DB에서 관리)
const enrollmentData: Record<string, string[]> = {
  'test@test.com': ['c-esp32', 'c-pc'], // test@test.com은 c-esp32, c-pc 강좌 수강 신청됨
};

// 강좌 정보
const courseInfo: Record<string, { title: string; price: number }> = {
  'c-esp32': { title: 'C 언어 (ESP32)', price: 99000 },
  'c-pc': { title: 'C 언어 (PC)', price: 79000 },
  'python-pc': { title: 'Python (PC)', price: 89000 },
  'python-uttec': { title: 'Python (UTTEC Shield)', price: 109000 },
  'nodejs': { title: 'Node.js (PC)', price: 79000 },
  'database': { title: 'Database (PC)', price: 69000 },
  'node-red': { title: 'Node-RED (PC)', price: 59000 },
};

// Day별 레슨 데이터 (C 언어 PC 초급)
const lessonDataByDay: Record<number, any> = {
  1: {
    day: 1,
    title: 'C 언어 소개와 개발환경 설정',
    subtitle: 'C 언어의 역사와 특징을 이해하고 VS Code 개발환경을 설정합니다.',
    progress: 0,
    learningGoals: [
      'C 언어의 역사와 특징 이해하기',
      'Visual Studio Code 설치 및 설정 배우기',
      '첫 번째 Hello World 프로그램 작성하기',
    ],
    sections: [
      {
        id: 1,
        type: 'video',
        badge: '필수',
        duration: '10분 시청',
        title: '추가 영상: 강의 소개',
        videoId: 'ZT25P9lUN9c',
        notice: {
          icon: '⚠️',
          text: '이 영상을 먼저 시청해주세요!',
          subtext: '강의 진행 방식과 학습 가이드를 안내합니다.',
        },
      },
      {
        id: 2,
        type: 'video',
        badge: '이론',
        duration: '8분',
        title: '이론 강의: C 언어란?',
        videoId: 'ZT25P9lUN9c',
        content: {
          title: 'C 언어의 특징',
          items: [
            { label: '탄생', description: '1972년 Dennis Ritchie가 개발' },
            { label: '특징', description: '절차 지향, 시스템 프로그래밍에 적합' },
            { label: '활용', description: '운영체제, 임베디드, 게임 엔진 등' },
          ],
          keyPoint: {
            title: '왜 C 언어를 배워야 하나?',
            description: 'C 언어는 다른 언어들의 기반이 되며, 하드웨어에 가까운 저수준 프로그래밍을 이해할 수 있게 해줍니다.',
            example: 'C → C++ → Java, C#, Python 등 많은 언어들이 C의 영향을 받았습니다.',
          },
        },
      },
      {
        id: 3,
        type: 'video',
        badge: '실습',
        duration: '15분 시청',
        title: '실습: VS Code 설치 및 Hello World',
        videoId: 'ZT25P9lUN9c',
        description: 'VS Code를 설치하고 MinGW 컴파일러를 설정한 후, 첫 번째 C 프로그램을 작성해봅니다!',
      },
    ],
    quiz: {
      title: '퀴즈',
      questions: [
        {
          id: 1,
          question: 'C 언어를 개발한 사람은?',
          options: [
            'Linus Torvalds',
            'Dennis Ritchie',
            'Bjarne Stroustrup',
            'James Gosling',
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: 'C 언어의 가장 큰 특징은?',
          options: [
            '객체 지향 언어이다',
            '인터프리터 언어이다',
            '시스템 프로그래밍에 적합한 저수준 언어이다',
            '웹 개발 전용 언어이다',
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: 'C 프로그램을 실행하려면 무엇이 필요한가?',
          options: ['인터프리터', '컴파일러', 'JVM', '브라우저'],
          correctAnswer: 1,
        },
      ],
    },
    additionalResources: [
      { title: 'VS Code 설치 가이드 PDF', type: 'download', icon: 'file' },
      { title: 'MinGW 설치 가이드', type: 'download', icon: 'file' },
    ],
    nextLesson: { day: 2, title: '변수와 자료형' },
  },
  2: {
    day: 2,
    title: '변수와 자료형',
    subtitle: '데이터를 저장하는 변수와 다양한 자료형을 배웁니다.',
    progress: 0,
    learningGoals: [
      '변수의 개념과 선언 방법 이해하기',
      '정수형, 실수형, 문자형 자료형 배우기',
      'sizeof 연산자로 자료형 크기 확인하기',
    ],
    sections: [
      {
        id: 1,
        type: 'video',
        badge: '이론',
        duration: '12분',
        title: '이론 강의: 변수와 자료형',
        videoId: 'ZT25P9lUN9c',
        content: {
          title: 'C 언어의 기본 자료형',
          items: [
            { label: 'int', description: '정수형 (4바이트, -21억 ~ 21억)' },
            { label: 'float', description: '실수형 (4바이트, 소수점 6자리)' },
            { label: 'double', description: '실수형 (8바이트, 소수점 15자리)' },
            { label: 'char', description: '문자형 (1바이트, ASCII 코드)' },
          ],
          keyPoint: {
            title: '변수 선언 문법',
            description: '자료형 변수명 = 초기값;',
            example: 'int age = 25;\nfloat height = 175.5;\nchar grade = \'A\';',
          },
        },
      },
      {
        id: 2,
        type: 'video',
        badge: '실습',
        duration: '18분 시청',
        title: '실습: 변수 선언과 출력',
        videoId: 'ZT25P9lUN9c',
        description: '다양한 자료형의 변수를 선언하고 printf로 출력해봅니다!',
      },
    ],
    quiz: {
      title: '퀴즈',
      questions: [
        { id: 1, question: 'int 자료형의 크기는?', options: ['1바이트', '2바이트', '4바이트', '8바이트'], correctAnswer: 2 },
        { id: 2, question: '소수점을 저장하려면 어떤 자료형을 사용하나요?', options: ['int', 'char', 'float', 'bool'], correctAnswer: 2 },
      ],
    },
    additionalResources: [{ title: '자료형 정리표 PDF', type: 'download', icon: 'file' }],
    nextLesson: { day: 3, title: '연산자' },
  },
  3: {
    day: 3,
    title: '연산자',
    subtitle: '산술, 관계, 논리, 비트 연산자를 배웁니다.',
    progress: 0,
    learningGoals: [
      '산술 연산자 (+, -, *, /, %) 이해하기',
      '관계 연산자 (==, !=, <, >, <=, >=) 배우기',
      '논리 연산자 (&&, ||, !) 활용하기',
    ],
    sections: [
      { id: 1, type: 'video', badge: '이론', duration: '10분', title: '이론 강의: 연산자의 종류', videoId: 'ZT25P9lUN9c' },
      { id: 2, type: 'video', badge: '실습', duration: '15분', title: '실습: 연산자 활용하기', videoId: 'ZT25P9lUN9c' },
    ],
    quiz: {
      title: '퀴즈',
      questions: [
        { id: 1, question: '10 % 3의 결과는?', options: ['3', '1', '0', '10'], correctAnswer: 1 },
        { id: 2, question: '논리 AND 연산자는?', options: ['||', '&&', '!', '&'], correctAnswer: 1 },
      ],
    },
    additionalResources: [],
    nextLesson: { day: 4, title: '조건문' },
  },
  4: {
    day: 4,
    title: '조건문',
    subtitle: 'if-else, switch-case 문으로 프로그램 흐름을 제어합니다.',
    progress: 0,
    learningGoals: [
      'if-else 문 작성하기',
      'switch-case 문 활용하기',
      '삼항 연산자 이해하기',
    ],
    sections: [
      { id: 1, type: 'video', badge: '이론', duration: '12분', title: '이론 강의: 조건문', videoId: 'ZT25P9lUN9c' },
      { id: 2, type: 'video', badge: '실습', duration: '20분', title: '실습: 성적 판별 프로그램', videoId: 'ZT25P9lUN9c' },
    ],
    quiz: {
      title: '퀴즈',
      questions: [
        { id: 1, question: 'else if를 여러 개 사용할 수 있나요?', options: ['예', '아니오'], correctAnswer: 0 },
      ],
    },
    additionalResources: [],
    nextLesson: { day: 5, title: '반복문' },
  },
  5: {
    day: 5,
    title: '반복문',
    subtitle: 'for, while, do-while 문으로 반복 작업을 처리합니다.',
    progress: 0,
    learningGoals: [
      'for 문으로 반복 처리하기',
      'while 문과 do-while 문 차이 이해하기',
      'break와 continue 활용하기',
    ],
    sections: [
      { id: 1, type: 'video', badge: '이론', duration: '15분', title: '이론 강의: 반복문', videoId: 'ZT25P9lUN9c' },
      { id: 2, type: 'video', badge: '실습', duration: '18분', title: '실습: 구구단 출력', videoId: 'ZT25P9lUN9c' },
    ],
    quiz: {
      title: '퀴즈',
      questions: [
        { id: 1, question: '무한 루프를 만들 때 자주 사용하는 것은?', options: ['for(;;)', 'while(1)', '둘 다', 'none'], correctAnswer: 2 },
      ],
    },
    additionalResources: [],
    nextLesson: { day: 6, title: '종합 실습: 숫자 맞추기 게임' },
  },
  6: {
    day: 6,
    title: '종합 실습: 숫자 맞추기 게임',
    subtitle: '조건문과 반복문을 활용해 게임을 만들어봅니다.',
    progress: 0,
    learningGoals: [
      '난수 생성 (rand, srand) 배우기',
      '사용자 입력 (scanf) 처리하기',
      '조건문 + 반복문 통합 활용하기',
    ],
    sections: [
      { id: 1, type: 'video', badge: '이론', duration: '5분', title: '게임 로직 설명', videoId: 'ZT25P9lUN9c' },
      { id: 2, type: 'video', badge: '실습', duration: '25분', title: '실습: 숫자 맞추기 게임 구현', videoId: 'ZT25P9lUN9c' },
    ],
    quiz: null,
    additionalResources: [{ title: '숫자 맞추기 게임 소스코드', type: 'download', icon: 'file' }],
    nextLesson: { day: 7, title: '함수 기초' },
  },
  7: {
    day: 7,
    title: '함수 기초',
    subtitle: '함수를 정의하고 호출하는 방법을 배웁니다.',
    progress: 0,
    learningGoals: [
      '함수의 개념과 필요성 이해하기',
      '매개변수와 반환값 다루기',
      '함수 프로토타입 선언하기',
    ],
    sections: [
      { id: 1, type: 'video', badge: '이론', duration: '12분', title: '이론 강의: 함수란?', videoId: 'ZT25P9lUN9c' },
      { id: 2, type: 'video', badge: '실습', duration: '20분', title: '실습: 계산기 함수 만들기', videoId: 'ZT25P9lUN9c' },
    ],
    quiz: {
      title: '퀴즈',
      questions: [
        { id: 1, question: '함수가 값을 반환하지 않을 때 사용하는 자료형은?', options: ['int', 'void', 'null', 'none'], correctAnswer: 1 },
      ],
    },
    additionalResources: [],
    nextLesson: { day: 8, title: '배열' },
  },
  8: {
    day: 8,
    title: '배열',
    subtitle: '같은 타입의 데이터를 연속으로 저장하는 배열을 배웁니다.',
    progress: 0,
    learningGoals: [
      '1차원 배열 선언과 초기화',
      '배열과 반복문 활용하기',
      '문자 배열과 문자열 이해하기',
    ],
    sections: [
      { id: 1, type: 'video', badge: '이론', duration: '15분', title: '이론 강의: 배열', videoId: 'ZT25P9lUN9c' },
      { id: 2, type: 'video', badge: '실습', duration: '18분', title: '실습: 성적 평균 계산', videoId: 'ZT25P9lUN9c' },
    ],
    quiz: {
      title: '퀴즈',
      questions: [
        { id: 1, question: '배열의 인덱스는 몇부터 시작하나요?', options: ['0', '1', '-1', '2'], correctAnswer: 0 },
      ],
    },
    additionalResources: [],
    nextLesson: { day: 9, title: '다차원 배열' },
  },
  9: {
    day: 9,
    title: '다차원 배열',
    subtitle: '2차원 배열과 행렬 연산을 배웁니다.',
    progress: 0,
    learningGoals: [
      '2차원 배열 선언과 초기화',
      '행렬 표현 및 연산하기',
      '배열을 함수에 전달하기',
    ],
    sections: [
      { id: 1, type: 'video', badge: '이론', duration: '12분', title: '이론 강의: 다차원 배열', videoId: 'ZT25P9lUN9c' },
      { id: 2, type: 'video', badge: '실습', duration: '20분', title: '실습: 행렬 덧셈', videoId: 'ZT25P9lUN9c' },
    ],
    quiz: null,
    additionalResources: [],
    nextLesson: { day: 10, title: '종합 프로젝트: 성적 관리 프로그램' },
  },
  10: {
    day: 10,
    title: '종합 프로젝트: 성적 관리 프로그램',
    subtitle: '배열과 함수를 활용해 성적 관리 프로그램을 만들어봅니다.',
    progress: 0,
    learningGoals: [
      '배열 + 함수 통합 활용하기',
      '평균, 최대, 최소값 계산하기',
      '메뉴 시스템 구현하기',
    ],
    sections: [
      { id: 1, type: 'video', badge: '이론', duration: '5분', title: '프로젝트 구조 설명', videoId: 'ZT25P9lUN9c' },
      { id: 2, type: 'video', badge: '실습', duration: '30분', title: '실습: 성적 관리 프로그램 구현', videoId: 'ZT25P9lUN9c' },
    ],
    quiz: null,
    additionalResources: [{ title: '성적 관리 프로그램 소스코드', type: 'download', icon: 'file' }],
    nextLesson: null,
  },
};

// 비디오 섹션 컴포넌트
function VideoSection({ section }: { section: any }) {
  const badgeColors: Record<string, string> = {
    '필수': 'bg-red-500',
    '이론': 'bg-blue-500',
    '실습': 'bg-green-500',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <span className={`px-3 py-1 ${badgeColors[section.badge] || 'bg-gray-500'} text-white text-sm font-medium rounded-full`}>
          {section.badge}
        </span>
        <span className="text-sm text-gray-500">{section.duration}</span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>

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
                <pre className="text-sm text-gray-500 bg-gray-50 p-2 rounded font-mono whitespace-pre-wrap">
                  {section.content.keyPoint.example}
                </pre>
              </div>
            )}
          </div>
        )}

        {section.description && (
          <p className="text-gray-600 mt-4 bg-blue-50 p-4 rounded-lg">{section.description}</p>
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
      if (answers[q.id] === q.correctAnswer) correct++;
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
          정답 보기
        </button>
      ) : (
        <div className="mt-6">
          <div className={`p-4 rounded-lg text-center ${allCorrect ? 'bg-green-100' : 'bg-yellow-100'}`}>
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
          <p className="text-gray-600 mb-6">
            이 강의를 시청하려면 먼저 수강 신청을 해주세요.
          </p>

          {info && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h2>
              <p className="text-3xl font-bold text-blue-600 mb-4">
                {info.price.toLocaleString()}원
              </p>
              <ul className="text-left text-gray-600 space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  초급/중급/고급 전 과정 포함
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Day 1-10 전체 강의 제공
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  퀴즈 및 실습 자료 포함
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  평생 소장 가능
                </li>
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              수강 신청하기
            </button>
            <Link
              href="/login"
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              로그인하기
            </Link>
            <Link
              href={`/course/coding/${courseId}/${level}`}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              강좌 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CPCLessonDayPage() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const lessonData = lessonDataByDay[day];
  const courseId = 'c-pc'; // C 언어 (PC) 강좌 ID

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userStr && token) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || '');
        setUserEmail(user.email || '');
        setIsLoggedIn(true);

        // 수강 신청 여부 확인
        const enrolledCourses = enrollmentData[user.email] || [];
        setIsEnrolled(enrolledCourses.includes(courseId));
      } catch (e) {
        console.error('Failed to parse user data');
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

  const handleComplete = () => {
    setIsCompleted(true);
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

  // 로그인하지 않았거나 수강 신청하지 않은 경우
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
            href={`/course/coding/c-pc/${level}`}
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
              href={`/course/coding/c-pc/${level}/lesson/${lessonData.nextLesson.day}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition"
            >
              다음 강의로
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        )}

        {/* 과정 완료 시 */}
        {!lessonData.nextLesson && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white text-center">
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
