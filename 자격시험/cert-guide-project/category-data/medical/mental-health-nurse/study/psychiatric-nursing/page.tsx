'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PsychiatricNursingPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '정신질환의 이해',
      content: [
        '정신질환 분류: DSM-5 진단 체계 이해',
        '조현병: 양성/음성 증상, 인지 기능 장애',
        '기분장애: 주요우울장애, 양극성장애',
        '불안장애: 공황장애, 범불안장애, 강박장애',
      ],
    },
    {
      title: '정신간호 사정',
      content: [
        '정신상태 검사(MSE): 외모, 행동, 사고, 정서 평가',
        '위험성 평가: 자살, 타해, 자해 위험도 사정',
        '기능 평가: ADL, 사회적 기능, 인지 기능',
        '가족 사정: 가족 역동, 지지체계 파악',
      ],
    },
    {
      title: '정신간호 진단 및 계획',
      content: [
        'NANDA 간호진단 적용',
        '단기/장기 목표 설정',
        '우선순위 결정: 안전 > 생리적 욕구 > 심리사회적 욕구',
        '개별화된 간호계획 수립',
      ],
    },
    {
      title: '정신간호 중재',
      content: [
        '치료적 환경 조성: 안전하고 구조화된 환경',
        '행동 관리: 공격성, 자해 행동 관리',
        '증상 관리: 환각, 망상 대처 기법',
        '자가관리 증진: 위생, 식사, 수면 관리',
      ],
    },
    {
      title: '위기 개입',
      content: [
        '위기의 단계: 충격 → 방어 → 인정 → 적응',
        '자살 위기 개입: 위험 평가, 안전 계획, 즉각 개입',
        '공격적 행동 관리: 탈자극, 언어적 개입, 신체적 제한',
        '재발 예방: 조기 경고 신호 인식, 대처 계획',
      ],
    },
    {
      title: '재활 간호',
      content: [
        '사회기술훈련: 대인관계, 문제해결 기술',
        '직업재활: 직업 평가, 훈련, 취업 지원',
        '정신건강교육: 질병 이해, 약물 관리, 재발 예방',
        '지역사회 자원 연계: 정신건강증진센터, 재활시설',
      ],
    },
  ];

  const questions = [
    {
      question: '조현병의 양성 증상에 해당하는 것은?',
      options: ['무감동', '사회적 위축', '환각', '의욕 저하'],
      correctAnswer: 2,
      explanation: '환각, 망상, 와해된 언어 등은 조현병의 양성 증상입니다. 음성 증상은 무감동, 사회적 위축, 의욕 저하 등이 포함됩니다.',
    },
    {
      question: '정신상태 검사(MSE)에서 평가하지 않는 항목은?',
      options: ['외모와 행동', '사고 과정', '혈압과 맥박', '정서와 기분'],
      correctAnswer: 2,
      explanation: '정신상태 검사는 외모, 행동, 언어, 사고, 정서, 인지 등을 평가하며, 혈압과 맥박 같은 생리적 지표는 포함되지 않습니다.',
    },
    {
      question: '자살 위험이 높은 환자의 간호 중재로 가장 우선되는 것은?',
      options: ['가족 상담', '안전 환경 조성', '취미 활동 권장', '약물 교육'],
      correctAnswer: 1,
      explanation: '자살 위험이 높은 환자는 안전이 최우선이므로 위험 물품 제거, 집중 관찰 등 안전 환경 조성이 가장 중요합니다.',
    },
    {
      question: '환각을 호소하는 환자에 대한 적절한 간호는?',
      options: [
        '환각이 실제가 아님을 반복해서 설명한다',
        '환각의 내용에 대해 동의한다',
        '환각으로 인한 불안을 인정하고 현실에 집중하도록 돕는다',
        '환각을 무시하고 다른 주제로 대화한다',
      ],
      correctAnswer: 2,
      explanation: '환각을 경험하는 환자의 불안을 인정하면서도, 현실 지남력을 유지하도록 돕는 것이 적절한 간호입니다.',
    },
    {
      question: '정신재활의 주요 목표가 아닌 것은?',
      options: [
        '사회적 기능 회복',
        '증상의 완전한 제거',
        '독립적 생활 능력 향상',
        '삶의 질 개선',
      ],
      correctAnswer: 1,
      explanation: '정신재활은 증상의 완전한 제거보다는 증상 관리와 함께 사회적 기능 회복, 독립적 생활, 삶의 질 개선에 초점을 둡니다.',
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
            href="/자격시험/medical/mental-health-nurse"
            className="text-purple-600 hover:text-purple-800 mb-4 inline-block"
          >
            ← 정신건강간호사 메인으로
          </Link>
          <h1 className="text-4xl font-bold text-purple-600">정신간호학</h1>
        </div>

        {/* 과목 네비게이션 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/자격시험/medical/mental-health-nurse/study/psychiatric-nursing"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              정신간호학
            </Link>
            <Link
              href="/자격시험/medical/mental-health-nurse/study/mental-health-theory"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              정신건강이론
            </Link>
            <Link
              href="/자격시험/medical/mental-health-nurse/study/psychopharmacology"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              정신약리학
            </Link>
            <Link
              href="/자격시험/medical/mental-health-nurse/study/therapeutic-communication"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              치료적의사소통
            </Link>
            <Link
              href="/자격시험/medical/mental-health-nurse/study/practical"
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
              <h3 className="text-xl font-semibold mb-3 text-purple-600">{topic.title}</h3>
              <ul className="space-y-2">
                {topic.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
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
                          ? 'bg-purple-50 border-2 border-purple-500'
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
                  <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-900">
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
              className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              제출하기
            </button>
          ) : (
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white">
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
