'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Brain, ArrowRight, RotateCcw } from 'lucide-react';

// MBTI 질문 (간단 버전)
const questions = [
  {
    id: 1,
    question: '새로운 프로젝트를 시작할 때 당신은?',
    options: [
      { text: '팀원들과 함께 아이디어를 나누며 시작한다', type: 'E' },
      { text: '혼자 조용히 계획을 세운 후 시작한다', type: 'I' },
    ],
  },
  {
    id: 2,
    question: '코드를 작성할 때 당신은?',
    options: [
      { text: '구체적인 예제와 실습을 통해 배운다', type: 'S' },
      { text: '전체 개념과 원리를 먼저 이해한다', type: 'N' },
    ],
  },
  {
    id: 3,
    question: '버그를 발견했을 때 당신은?',
    options: [
      { text: '논리적으로 원인을 분석하고 해결한다', type: 'T' },
      { text: '사용자 경험을 먼저 고려하며 해결한다', type: 'F' },
    ],
  },
  {
    id: 4,
    question: '프로젝트 일정 관리는?',
    options: [
      { text: '계획표를 세우고 체계적으로 진행한다', type: 'J' },
      { text: '유연하게 상황에 맞춰 진행한다', type: 'P' },
    ],
  },
];

// MBTI 결과 설명
const mbtiResults: { [key: string]: { title: string; description: string; recommendedCourses: string[] } } = {
  ISTJ: {
    title: '체계적인 개발자',
    description: '꼼꼼하고 체계적인 당신! 기초부터 차근차근 배우는 것을 좋아합니다.',
    recommendedCourses: ['C언어 기초', 'STM32 입문'],
  },
  ISFJ: {
    title: '배려하는 개발자',
    description: '사용자를 생각하는 당신! UI/UX를 고려한 개발에 강점이 있습니다.',
    recommendedCourses: ['Arduino 프로젝트', 'ESP32 IoT'],
  },
  INFJ: {
    title: '비전있는 개발자',
    description: '큰 그림을 보는 당신! 아키텍처 설계에 재능이 있습니다.',
    recommendedCourses: ['시스템 설계', 'RTOS 기초'],
  },
  INTJ: {
    title: '전략적인 개발자',
    description: '효율을 추구하는 당신! 최적화와 알고리즘에 강합니다.',
    recommendedCourses: ['펌웨어 최적화', '고급 C 프로그래밍'],
  },
  // 기본 결과
  DEFAULT: {
    title: '잠재력 있는 개발자',
    description: '다양한 가능성을 가진 당신! 여러 분야를 탐색해보세요.',
    recommendedCourses: ['C언어 기초', 'Python 입문', 'Arduino 시작하기'],
  },
};

export default function MBTIPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 결과 계산
      const mbtiType = calculateMBTI(newAnswers);
      setResult(mbtiType);
      setShowResult(true);
    }
  };

  const calculateMBTI = (answers: string[]) => {
    // 간단한 MBTI 계산 로직
    const types = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0,
    };

    answers.forEach((answer) => {
      types[answer as keyof typeof types]++;
    });

    const result =
      (types.E >= types.I ? 'E' : 'I') +
      (types.S >= types.N ? 'S' : 'N') +
      (types.T >= types.F ? 'T' : 'F') +
      (types.J >= types.P ? 'J' : 'P');

    return result;
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult('');
  };

  const resultData = mbtiResults[result] || mbtiResults.DEFAULT;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-16">
        {!showResult ? (
          <>
            {/* 테스트 헤더 */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-10 h-10 text-purple-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">개발자 MBTI 테스트</h1>
              <p className="text-gray-600">나에게 맞는 학습 스타일을 찾아보세요!</p>
            </div>

            {/* 진행률 */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>질문 {currentQuestion + 1} / {questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* 질문 카드 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.type)}
                    className="w-full p-4 text-left bg-gray-50 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-400 rounded-xl transition-all duration-200"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* 결과 화면 */
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">{result}</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">{resultData.title}</h2>
              <p className="text-gray-600 mb-8">{resultData.description}</p>

              <div className="bg-purple-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-purple-900 mb-4">추천 강좌</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {resultData.recommendedCourses.map((course, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white rounded-full text-purple-700 shadow-sm"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={resetTest}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  다시 테스트
                </button>
                <Link
                  href="/courses"
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  강좌 둘러보기
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
