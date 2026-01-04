'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CommunityHealthPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '지역사회보건의 개념',
      content: [
        '지역사회의 정의: 지리적, 사회적으로 연결된 주민 집단',
        '지역사회보건의 목표: 지역주민의 건강 유지 및 증진',
        '지역사회보건의 원칙: 주민참여, 통합성, 계속성, 포괄성',
        '보건사업 특성: 예방 중심, 대상자 중심, 지역 특성 반영',
      ],
    },
    {
      title: '지역사회 진단',
      content: [
        '지역사회 사정: 인구, 환경, 자원, 건강문제 파악',
        '자료 수집 방법: 통계자료, 설문조사, 면담, 관찰',
        '건강문제 우선순위 결정: 심각성, 발생빈도, 해결가능성',
        '지역사회 자원 파악: 인적, 물적, 조직적 자원',
      ],
    },
    {
      title: '보건소 조직 및 기능',
      content: [
        '보건소의 역할: 지역보건의료 중추기관',
        '주요 사업: 건강증진, 질병예방, 진료, 보건교육',
        '보건지소/보건진료소: 농어촌 지역 1차 보건의료',
        '방문보건사업: 취약계층 가정방문 및 건강관리',
      ],
    },
    {
      title: '모자보건',
      content: [
        '산전관리: 임산부 건강검진, 영양지도, 출산준비교육',
        '산후관리: 산후조리, 모유수유 지도, 산후우울 관리',
        '영유아건강: 예방접종, 성장발달 평가, 영양관리',
        '가족계획: 피임상담, 불임부부 지원',
      ],
    },
    {
      title: '감염병 관리',
      content: [
        '감염병 감시체계: 발생 모니터링 및 보고',
        '예방접종사업: 국가예방접종, 접종률 관리',
        '역학조사: 발생원인 규명 및 확산방지',
        '격리 및 치료: 환자관리, 접촉자 추적',
      ],
    },
    {
      title: '만성질환 관리',
      content: [
        '고혈압·당뇨병 관리: 조기발견, 지속관리, 합병증 예방',
        '암 관리: 검진사업, 환자등록, 추후관리',
        '정신건강: 우울증, 자살예방, 중독관리',
        '건강생활실천: 금연, 절주, 운동, 영양',
      ],
    },
  ];

  const questions = [
    {
      question: '지역사회보건의 원칙이 아닌 것은?',
      options: ['주민참여', '통합성', '전문성', '계속성'],
      correctAnswer: 2,
      explanation: '지역사회보건의 원칙은 주민참여, 통합성, 계속성, 포괄성입니다.',
    },
    {
      question: '지역사회 건강문제 우선순위 결정 시 고려사항이 아닌 것은?',
      options: ['심각성', '발생빈도', '예산 규모', '해결가능성'],
      correctAnswer: 2,
      explanation: '우선순위 결정 시 심각성, 발생빈도, 해결가능성을 고려합니다.',
    },
    {
      question: '보건소의 주요 기능이 아닌 것은?',
      options: ['건강증진사업', '질병예방사업', '3차 진료', '보건교육'],
      correctAnswer: 2,
      explanation: '보건소는 1차 보건의료기관으로 3차 진료는 수행하지 않습니다.',
    },
    {
      question: '모자보건사업에 해당하지 않는 것은?',
      options: ['산전관리', '예방접종', '직업병 관리', '영유아건강검진'],
      correctAnswer: 2,
      explanation: '직업병 관리는 산업보건 영역입니다.',
    },
    {
      question: '감염병 관리에서 발생원인을 규명하는 활동은?',
      options: ['감시체계', '예방접종', '역학조사', '격리'],
      correctAnswer: 2,
      explanation: '역학조사는 감염병 발생원인을 규명하고 확산을 방지하는 활동입니다.',
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
          <h1 className="text-4xl font-bold text-orange-600">지역사회보건</h1>
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
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              건강행동이론
            </Link>
            <Link
              href="/자격시험/medical/health-educator-2/study/community-health"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
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
                  <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-900">
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
            <div className="mt-6 p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white">
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
