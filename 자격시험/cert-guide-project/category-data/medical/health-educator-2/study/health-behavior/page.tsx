'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HealthBehaviorPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '건강행동이론의 개요',
      content: [
        '건강행동의 정의: 건강 유지 및 증진을 위한 행위',
        '건강행동 결정요인: 개인적, 사회적, 환경적 요인',
        '건강행동 변화 단계: 인지-태도-실천',
        '이론의 활용: 보건교육 프로그램 설계 및 중재 전략 수립',
      ],
    },
    {
      title: '건강신념모형 (HBM)',
      content: [
        '지각된 민감성: 질병 걸릴 가능성에 대한 인식',
        '지각된 심각성: 질병의 심각성에 대한 인식',
        '지각된 유익성: 건강행동의 이득에 대한 인식',
        '지각된 장애성: 건강행동 실천의 어려움',
        '행동계기: 건강행동을 촉발하는 자극',
        '자기효능감: 행동 실천 능력에 대한 믿음',
      ],
    },
    {
      title: '범이론적 모형 (TTM)',
      content: [
        '계획전 단계: 변화 의도 없음 (6개월 내)',
        '계획 단계: 변화 고려 중 (6개월 내)',
        '준비 단계: 변화 준비 중 (1개월 내)',
        '행동 단계: 변화 실천 중 (6개월 이내)',
        '유지 단계: 변화 유지 중 (6개월 이상)',
      ],
    },
    {
      title: '계획된 행동이론 (TPB)',
      content: [
        '태도: 행동에 대한 긍정적/부정적 평가',
        '주관적 규범: 중요한 타인의 영향',
        '지각된 행동통제: 행동 수행의 용이성',
        '행동의도: 행동 실천 의지',
        '행동 실천: 의도에 따른 행동 수행',
      ],
    },
    {
      title: '사회인지이론 (SCT)',
      content: [
        '상호결정론: 개인-행동-환경의 상호작용',
        '관찰학습: 타인의 행동 관찰 후 모방',
        '자기효능감: 행동 수행 능력 믿음',
        '결과기대: 행동 결과에 대한 예상',
        '강화: 긍정적/부정적 결과로 행동 조정',
      ],
    },
    {
      title: '사회생태학적 모형',
      content: [
        '개인 수준: 지식, 태도, 기술',
        '대인 수준: 가족, 친구, 동료',
        '조직 수준: 학교, 직장, 지역사회',
        '지역사회 수준: 사회적 규범, 문화',
        '정책 수준: 법, 제도, 정책',
      ],
    },
  ];

  const questions = [
    {
      question: '건강신념모형(HBM)의 구성요소가 아닌 것은?',
      options: ['지각된 민감성', '지각된 심각성', '관찰학습', '지각된 유익성'],
      correctAnswer: 2,
      explanation: '관찰학습은 사회인지이론의 개념입니다.',
    },
    {
      question: '범이론적 모형에서 변화를 고려하고 있는 단계는?',
      options: ['계획전 단계', '계획 단계', '준비 단계', '행동 단계'],
      correctAnswer: 1,
      explanation: '계획 단계는 6개월 내 변화를 고려하고 있는 단계입니다.',
    },
    {
      question: '계획된 행동이론(TPB)에서 중요한 타인의 영향을 의미하는 것은?',
      options: ['태도', '주관적 규범', '지각된 행동통제', '행동의도'],
      correctAnswer: 1,
      explanation: '주관적 규범은 중요한 타인들이 특정 행동에 대해 어떻게 생각하는지를 의미합니다.',
    },
    {
      question: '사회인지이론에서 타인의 행동을 관찰한 후 모방하는 것은?',
      options: ['강화', '관찰학습', '자기효능감', '결과기대'],
      correctAnswer: 1,
      explanation: '관찰학습은 타인의 행동을 관찰하고 모방하여 학습하는 것입니다.',
    },
    {
      question: '사회생태학적 모형에서 법, 제도, 정책에 해당하는 수준은?',
      options: ['개인 수준', '조직 수준', '지역사회 수준', '정책 수준'],
      correctAnswer: 3,
      explanation: '정책 수준은 법, 제도, 정책 등 거시적 환경을 의미합니다.',
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
          <h1 className="text-4xl font-bold text-purple-600">건강행동이론</h1>
        </div>

        {/* 과목 네비게이션 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/자격시험/medical/health-educator-2/study/health-education-intro"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
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
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
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
                            ? 'bg-green-100 border-green-500'
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
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white">
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
