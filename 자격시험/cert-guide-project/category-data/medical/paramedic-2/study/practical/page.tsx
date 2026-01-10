'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PracticalPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '실기시험 개요',
      content: [
        '시험 방식: 실제 상황을 재현한 술기 평가',
        '평가 항목: 심폐소생술, 기도유지, 출혈조절, 부목고정, 환자이송',
        '평가 기준: 정확성, 신속성, 안전성',
        '합격 기준: 각 술기별 체크리스트 항목 충족',
      ],
    },
    {
      title: '심폐소생술 실기',
      content: [
        '환자 확인: 반응 확인, 호흡 확인 (10초 이내)',
        '119 신고: 주변인 지정, AED 요청',
        '가슴압박: 위치(흉골 하부 1/2), 깊이(5-6cm), 속도(100-120회/분)',
        '인공호흡: 기도개방, 2회 1초씩',
        '30:2 비율: 5주기 시행 (약 2분)',
      ],
    },
    {
      title: '기도유지 및 산소공급',
      content: [
        '기도개방: 머리 젖히고 턱 들어올리기',
        '구강 인두기: 크기 선택, 삽입 방법',
        '백-밸브-마스크: 적절한 밀착, 환기량',
        '산소공급: 비강캐뉼라, 마스크 사용법',
        '흡인: 흡인기 사용, 10초 이내',
      ],
    },
    {
      title: '출혈조절 및 상처처치',
      content: [
        '직접압박: 멸균 거즈, 강한 압력',
        '압박붕대: 적절한 압박 강도',
        '지혈대: 마지막 수단, 사용 시간 기록',
        '상처 세척: 생리식염수 사용',
        '드레싱: 무균 처치, 고정',
      ],
    },
    {
      title: '부목고정',
      content: [
        '부목 종류: 공기부목, 판 부목, 진공부목',
        '고정 원칙: 골절 부위 상하 관절 포함',
        '순환 확인: 맥박, 감각, 운동, 피부색',
        '상지 골절: 팔걸이 사용',
        '하지 골절: 다리 고정, 부목 적용',
      ],
    },
    {
      title: '환자 이동 및 운반',
      content: [
        '척추고정: 경추보호대, 척추고정판',
        '로그롤링: 3인 이상, 동시 이동',
        '들것 이송: 안전벨트 고정',
        '계단 이송: 머리 위, 발 아래',
        '긴급 이동: 위험 상황 시 신속 이동',
      ],
    },
  ];

  const questions = [
    {
      question: '심폐소생술 실기 시 가슴압박과 인공호흡의 비율은?',
      options: ['15:2', '30:2', '30:1', '100:2'],
      correctAnswer: 1,
      explanation: '심폐소생술은 가슴압박 30회, 인공호흡 2회 비율로 시행합니다.',
    },
    {
      question: '가슴압박 시 정확한 위치는?',
      options: [
        '흉골 상부',
        '흉골 하부 1/2 지점',
        '명치',
        '좌측 가슴',
      ],
      correctAnswer: 1,
      explanation: '가슴압박은 흉골 하부 1/2 지점(가슴 정중앙)에서 시행합니다.',
    },
    {
      question: '출혈 조절의 우선순위가 올바른 것은?',
      options: [
        '지혈대 → 직접압박 → 압박붕대',
        '직접압박 → 압박붕대 → 지혈대',
        '압박붕대 → 직접압박 → 지혈대',
        '지혈점 압박 → 지혈대 → 직접압박',
      ],
      correctAnswer: 1,
      explanation: '출혈 조절은 직접압박 → 압박붕대 → 지혈점 압박 → 지혈대 순서로 시행합니다.',
    },
    {
      question: '부목 고정 시 반드시 포함해야 하는 부위는?',
      options: [
        '골절 부위만',
        '골절 부위와 위쪽 관절',
        '골절 부위와 아래쪽 관절',
        '골절 부위 상하 관절',
      ],
      correctAnswer: 3,
      explanation: '부목 고정 시 골절 부위의 상하 관절을 모두 포함하여 고정합니다.',
    },
    {
      question: '척추 손상 환자를 움직일 때 사용하는 기법은?',
      options: [
        '1인 운반법',
        '로그롤링',
        '안아서 운반',
        '끌어서 이동',
      ],
      correctAnswer: 1,
      explanation: '척추 손상 환자는 로그롤링 기법을 사용하여 3인 이상이 동시에 이동시킵니다.',
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
            className="text-lime-600 hover:text-lime-800 mb-4 inline-block"
          >
            ← 응급구조사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold text-lime-600">실기</h1>
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
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
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
              className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700"
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
              <h3 className="text-xl font-semibold mb-3 text-lime-600">{topic.title}</h3>
              <ul className="space-y-2">
                {topic.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-lime-500 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 실기 준비 팁 */}
        <div className="bg-gradient-to-r from-lime-50 to-green-50 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-lime-800">실기시험 준비 팁</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start">
              <span className="text-lime-600 mr-2 text-xl">✓</span>
              <span>체크리스트를 숙지하고 각 단계를 정확히 수행하세요.</span>
            </div>
            <div className="flex items-start">
              <span className="text-lime-600 mr-2 text-xl">✓</span>
              <span>마네킹이나 실습 도구로 반복 연습하세요.</span>
            </div>
            <div className="flex items-start">
              <span className="text-lime-600 mr-2 text-xl">✓</span>
              <span>시간 관리를 연습하여 제한 시간 내 완료하세요.</span>
            </div>
            <div className="flex items-start">
              <span className="text-lime-600 mr-2 text-xl">✓</span>
              <span>감독관에게 각 단계를 설명하며 시연하세요.</span>
            </div>
            <div className="flex items-start">
              <span className="text-lime-600 mr-2 text-xl">✓</span>
              <span>안전과 감염 관리에 신경 쓰세요 (장갑 착용 등).</span>
            </div>
          </div>
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
                          ? 'bg-lime-50 border-2 border-lime-500'
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
              className="mt-6 w-full bg-lime-600 text-white py-3 rounded-lg font-semibold hover:bg-lime-700 transition-colors"
            >
              제출하기
            </button>
          ) : (
            <div className="mt-6 p-6 bg-gradient-to-r from-lime-500 to-green-500 rounded-lg text-white">
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
