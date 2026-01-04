'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HealthEducationIntroPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '보건교육의 개념',
      content: [
        '보건교육의 정의: 개인, 집단, 지역사회의 건강행위 변화를 목적으로 하는 계획적 학습경험',
        '보건교육의 목표: 지식 증진, 태도 변화, 행동 실천',
        '보건교육의 3요소: 교육자, 학습자, 교육내용',
      ],
    },
    {
      title: '보건교육의 원리',
      content: [
        '자발성의 원리: 학습자의 자발적 참여 유도',
        '계속성의 원리: 지속적이고 반복적인 교육',
        '통합성의 원리: 다양한 분야와 연계한 종합적 접근',
        '개별성의 원리: 학습자의 특성 고려',
      ],
    },
    {
      title: '보건교육 계획 수립',
      content: [
        'PRECEDE-PROCEED 모형: 진단-계획-실행-평가',
        '요구도 사정: 대상자의 건강문제 및 교육 필요성 파악',
        '목표 설정: SMART 원칙 (구체적, 측정가능, 달성가능, 관련성, 시한)',
        '교육방법 선정: 강의, 토론, 시범, 역할극 등',
      ],
    },
    {
      title: '보건교육 실행',
      content: [
        '교육 환경 조성: 물리적, 심리적 환경 준비',
        '교육매체 활용: 시청각 자료, 실물, 모형 등',
        '학습자 참여 유도: 질문, 토론, 실습 기회 제공',
        '피드백 제공: 즉각적이고 구체적인 반응',
      ],
    },
    {
      title: '보건교육 평가',
      content: [
        '과정평가: 교육 진행 과정의 적절성',
        '영향평가: 지식, 태도, 기술의 변화',
        '결과평가: 행동 변화 및 건강상태 개선',
        '평가도구: 설문지, 관찰, 면담, 생리적 측정',
      ],
    },
    {
      title: '보건교육사의 역할',
      content: [
        '기획자: 보건교육 프로그램 개발 및 계획',
        '실행자: 교육 프로그램 운영 및 진행',
        '평가자: 교육 효과 측정 및 개선',
        '조정자: 관련 기관 및 인력 간 협력 조정',
        '자문가: 보건교육 관련 전문적 조언 제공',
      ],
    },
  ];

  const questions = [
    {
      question: '보건교육의 3요소가 아닌 것은?',
      options: ['교육자', '학습자', '교육내용', '교육시설'],
      correctAnswer: 3,
      explanation: '보건교육의 3요소는 교육자, 학습자, 교육내용입니다.',
    },
    {
      question: 'SMART 원칙에서 M이 의미하는 것은?',
      options: ['Meaningful (의미있는)', 'Measurable (측정가능한)', 'Manageable (관리가능한)', 'Motivational (동기부여하는)'],
      correctAnswer: 1,
      explanation: 'SMART 원칙에서 M은 Measurable(측정가능한)을 의미합니다.',
    },
    {
      question: '보건교육 평가 중 지식, 태도, 기술의 변화를 측정하는 것은?',
      options: ['과정평가', '영향평가', '결과평가', '형성평가'],
      correctAnswer: 1,
      explanation: '영향평가는 교육을 통한 지식, 태도, 기술의 변화를 측정합니다.',
    },
    {
      question: 'PRECEDE-PROCEED 모형의 단계가 아닌 것은?',
      options: ['진단', '계획', '실행', '보고'],
      correctAnswer: 3,
      explanation: 'PRECEDE-PROCEED 모형은 진단-계획-실행-평가의 단계로 구성됩니다.',
    },
    {
      question: '보건교육의 자발성 원리에 대한 설명으로 옳은 것은?',
      options: [
        '교육자가 일방적으로 지식을 전달한다',
        '학습자의 자발적 참여를 유도한다',
        '반복적으로 교육을 실시한다',
        '다양한 분야와 연계하여 접근한다',
      ],
      correctAnswer: 1,
      explanation: '자발성의 원리는 학습자의 자발적 참여를 유도하는 것을 의미합니다.',
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
            href="/자격시험/medical/health-educator-2"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← 보건교육사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold text-blue-600">보건교육학개론</h1>
        </div>

        {/* 과목 네비게이션 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/자격시험/medical/health-educator-2/study/health-education-intro"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              보건교육학개론
            </Link>
            <Link
              href="/자격시험/medical/health-educator-2/study/health-communication"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              보건의사소통
            </Link>
            <Link
              href="/자격시험/medical/health-educator-2/study/health-behavior"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              건강행동이론
            </Link>
            <Link
              href="/자격시험/medical/health-educator-2/study/community-health"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              지역사회보건
            </Link>
            <Link
              href="/자격시험/medical/health-educator-2/study/practical"
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
              <h3 className="text-xl font-semibold mb-3 text-blue-600">{topic.title}</h3>
              <ul className="space-y-2">
                {topic.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
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
                          ? 'bg-blue-50 border-2 border-blue-500'
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
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              제출하기
            </button>
          ) : (
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
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
