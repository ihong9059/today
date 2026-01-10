'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CPRAEDPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '심폐소생술(CPR) 기본 개념',
      content: [
        '심정지 정의: 심장이 멈춰 혈액순환이 중단된 상태',
        '생존 사슬: 신속한 인지 → 신속한 CPR → 신속한 제세동 → 전문소생술',
        'CPR 목적: 뇌와 심장에 산소 공급, 생명 유지',
        '골든타임: 4-6분 이내 CPR 시작 시 생존율 증가',
      ],
    },
    {
      title: '성인 심폐소생술 순서',
      content: [
        '1단계: 반응 확인 및 119 신고',
        '2단계: 호흡 확인 (10초 이내)',
        '3단계: 가슴압박 30회 (강하고 빠르게)',
        '4단계: 기도개방 후 인공호흡 2회',
        '5단계: 30:2 비율로 반복 (119 도착 시까지)',
      ],
    },
    {
      title: '가슴압박 방법',
      content: [
        '위치: 가슴 정중앙 (흉골 하부 1/2 지점)',
        '깊이: 성인 5-6cm, 소아 4-5cm',
        '속도: 분당 100-120회',
        '압박 해제: 완전히 이완되도록',
        '자세: 양 팔을 곧게 펴고 수직으로 압박',
      ],
    },
    {
      title: '인공호흡 방법',
      content: [
        '기도개방: 머리 젖히고 턱 들어올리기',
        '코 막기: 엄지와 검지로 코를 완전히 막음',
        '호흡량: 가슴이 올라올 정도 (1초간)',
        '횟수: 30회 가슴압박 후 2회 인공호흡',
        '주의사항: 과도한 환기 금지',
      ],
    },
    {
      title: '자동제세동기(AED) 사용법',
      content: [
        '1단계: AED 전원 켜기',
        '2단계: 패드 부착 (우측 쇄골 아래, 좌측 겨드랑이 아래)',
        '3단계: 심장리듬 분석 (모두 떨어지세요)',
        '4단계: 제세동 필요 시 쇼크 버튼 누르기',
        '5단계: 즉시 CPR 재개 (30:2)',
      ],
    },
    {
      title: '특수 상황 CPR',
      content: [
        '소아/영아: 압박 깊이 조절, 영아는 두 손가락 사용',
        '임신부: 자궁을 왼쪽으로 밀어냄',
        '익수자: 물 밖으로 구출 후 즉시 CPR',
        '감전: 전원 차단 확인 후 CPR',
        '저체온증: 정상 체온까지 CPR 계속',
      ],
    },
  ];

  const questions = [
    {
      question: '성인 심폐소생술 시 가슴압박과 인공호흡의 비율은?',
      options: ['15:2', '30:2', '30:1', '100:2'],
      correctAnswer: 1,
      explanation: '성인 심폐소생술은 가슴압박 30회, 인공호흡 2회 비율로 시행합니다.',
    },
    {
      question: '성인 가슴압박의 올바른 깊이는?',
      options: ['3-4cm', '4-5cm', '5-6cm', '6-7cm'],
      correctAnswer: 2,
      explanation: '성인 가슴압박은 5-6cm 깊이로 시행합니다.',
    },
    {
      question: '가슴압박 속도로 올바른 것은?',
      options: ['분당 60-80회', '분당 80-100회', '분당 100-120회', '분당 120-140회'],
      correctAnswer: 2,
      explanation: '가슴압박은 분당 100-120회 속도로 시행합니다.',
    },
    {
      question: 'AED 패드 부착 위치로 올바른 것은?',
      options: [
        '양쪽 겨드랑이 아래',
        '가슴 중앙과 배꼽',
        '우측 쇄골 아래와 좌측 겨드랑이 아래',
        '좌측 쇄골 아래와 우측 겨드랑이 아래',
      ],
      correctAnswer: 2,
      explanation: 'AED 패드는 우측 쇄골 아래와 좌측 겨드랑이 아래에 부착합니다.',
    },
    {
      question: '심정지 환자 발견 시 가장 먼저 해야 할 것은?',
      options: [
        '즉시 가슴압박 시작',
        '반응 확인 및 119 신고',
        'AED 가져오기',
        '인공호흡 실시',
      ],
      correctAnswer: 1,
      explanation: '심정지 의심 환자 발견 시 가장 먼저 반응을 확인하고 119에 신고해야 합니다.',
    },
  ];

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswer({
      ...selectedAnswer,
      [questionIndex]: answerIndex,
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswer[index] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/자격시험/medical/paramedic-2"
            className="text-orange-600 hover:text-orange-800 mb-4 inline-block"
          >
            ← 응급구조사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold text-orange-600">심폐소생술 및 AED</h1>
        </div>

        {/* 과목 네비게이션 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/자격시험/medical/paramedic-2/study/first-aid"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              응급처치학
            </Link>
            <Link
              href="/자격시험/medical/paramedic-2/study/cpr-aed"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              심폐소생술/AED
            </Link>
            <Link
              href="/자격시험/medical/paramedic-2/study/patient-assessment"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              환자평가
            </Link>
            <Link
              href="/자격시험/medical/paramedic-2/study/transport"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              이송
            </Link>
            <Link
              href="/자격시험/medical/paramedic-2/study/practical"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              실기
            </Link>
          </div>
        </div>

        {/* 학습 내용 */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">핵심 내용</h2>
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3 text-orange-600">{topic.title}</h3>
              <ul className="space-y-2">
                {topic.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 연습 문제 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">연습 문제</h2>
          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="border-b border-gray-200 pb-6 last:border-b-0">
                <p className="font-semibold mb-3 text-gray-800">
                  {qIndex + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, oIndex) => (
                    <label
                      key={oIndex}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedAnswer[qIndex] === oIndex
                          ? 'bg-orange-50 border-2 border-orange-500'
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      } ${
                        showResults
                          ? oIndex === q.correctAnswer
                            ? 'bg-green-50 border-green-500'
                            : selectedAnswer[qIndex] === oIndex
                            ? 'bg-red-50 border-red-500'
                            : ''
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        checked={selectedAnswer[qIndex] === oIndex}
                        onChange={() => handleAnswerSelect(qIndex, oIndex)}
                        disabled={showResults}
                        className="mr-3"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {showResults && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>해설:</strong> {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!showResults ? (
            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              제출하기
            </button>
          ) : (
            <div className="mt-6 p-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg text-white">
              <h3 className="text-xl font-semibold mb-2">결과</h3>
              <p className="text-2xl font-bold">
                {calculateScore()} / {questions.length} 정답
              </p>
              <p className="mt-2">
                정답률: {((calculateScore() / questions.length) * 100).toFixed(0)}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
