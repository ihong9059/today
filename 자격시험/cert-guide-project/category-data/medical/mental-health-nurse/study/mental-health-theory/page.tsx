'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MentalHealthTheoryPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '정신건강의 개념',
      content: [
        '정신건강의 정의: WHO - 완전한 신체적, 정신적, 사회적 안녕 상태',
        '정신건강 모델: 의학적, 심리적, 사회적, 영적 모델',
        '정상과 비정상의 기준: 통계적, 사회문화적, 기능적 관점',
        '정신건강 연속선: 건강 ↔ 질병의 연속체',
      ],
    },
    {
      title: '성격 발달 이론',
      content: [
        'Freud 정신분석이론: 구강기, 항문기, 남근기, 잠복기, 생식기',
        'Erikson 심리사회발달이론: 8단계 발달 과업 (신뢰 vs 불신 등)',
        'Piaget 인지발달이론: 감각운동기, 전조작기, 구체적 조작기, 형식적 조작기',
        'Kohlberg 도덕발달이론: 전인습, 인습, 후인습 수준',
      ],
    },
    {
      title: '스트레스와 적응',
      content: [
        'Selye의 일반적응증후군(GAS): 경고 → 저항 → 소진',
        'Holmes & Rahe 생활사건 스트레스 척도',
        '스트레스 평가: 1차 평가(위협 인식), 2차 평가(대처 자원)',
        '적응 기전: 문제중심 대처, 정서중심 대처',
      ],
    },
    {
      title: '방어기제',
      content: [
        '억압(Repression): 고통스러운 기억을 무의식으로 밀어냄',
        '부정(Denial): 현실을 인정하지 않음',
        '투사(Projection): 자신의 감정을 타인에게 돌림',
        '합리화(Rationalization): 논리적 이유를 대어 정당화',
        '승화(Sublimation): 사회적으로 인정받는 방향으로 전환',
      ],
    },
    {
      title: '위기 이론',
      content: [
        '위기의 정의: 평형 상태를 깨뜨리는 사건과 대처 자원의 불균형',
        '위기의 유형: 발달적 위기, 상황적 위기',
        '위기 단계: Caplan - 불안 증가 → 문제해결 시도 → 비상 대처 → 붕괴',
        '위기 개입 원칙: 즉시성, 근접성, 단순성, 실용성',
      ],
    },
    {
      title: '정신건강 증진',
      content: [
        '1차 예방: 질병 발생 예방 (교육, 환경 개선)',
        '2차 예방: 조기 발견 및 치료 (선별검사, 상담)',
        '3차 예방: 재발 방지 및 재활 (재활 프로그램)',
        '정신건강증진 전략: 개인, 가족, 지역사회 수준 접근',
      ],
    },
  ];

  const questions = [
    {
      question: 'Erikson의 심리사회발달이론에서 영아기(0-1세)의 발달 과업은?',
      options: ['자율성 vs 수치심', '신뢰감 vs 불신감', '주도성 vs 죄책감', '근면성 vs 열등감'],
      correctAnswer: 1,
      explanation: 'Erikson 이론에서 영아기(0-1세)의 발달 과업은 신뢰감 vs 불신감입니다.',
    },
    {
      question: 'Selye의 일반적응증후군(GAS)의 단계를 순서대로 나열한 것은?',
      options: [
        '저항 → 경고 → 소진',
        '경고 → 저항 → 소진',
        '소진 → 경고 → 저항',
        '경고 → 소진 → 저항',
      ],
      correctAnswer: 1,
      explanation: '일반적응증후군은 경고(alarm) → 저항(resistance) → 소진(exhaustion) 단계로 진행됩니다.',
    },
    {
      question: '자신의 공격적 감정을 타인이 가지고 있다고 생각하는 방어기제는?',
      options: ['억압', '투사', '전치', '반동형성'],
      correctAnswer: 1,
      explanation: '투사(Projection)는 자신의 용납할 수 없는 감정이나 욕구를 다른 사람에게 돌리는 방어기제입니다.',
    },
    {
      question: '위기 개입의 원칙이 아닌 것은?',
      options: ['즉시성', '근접성', '복잡성', '실용성'],
      correctAnswer: 2,
      explanation: '위기 개입의 원칙은 즉시성(Immediacy), 근접성(Proximity), 단순성(Simplicity), 실용성(Practicality)입니다.',
    },
    {
      question: '정신건강 1차 예방에 해당하는 것은?',
      options: [
        '정신질환 조기 선별검사',
        '정신건강교육 프로그램',
        '재활 프로그램 운영',
        '약물 치료 시작',
      ],
      correctAnswer: 1,
      explanation: '1차 예방은 질병 발생을 예방하는 것으로, 정신건강교육, 스트레스 관리 교육 등이 포함됩니다.',
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
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← 정신건강간호사 메인으로
          </Link>
          <h1 className="text-4xl font-bold text-blue-600">정신건강이론</h1>
        </div>

        {/* 과목 네비게이션 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/자격시험/medical/mental-health-nurse/study/psychiatric-nursing"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              정신간호학
            </Link>
            <Link
              href="/자격시험/medical/mental-health-nurse/study/mental-health-theory"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg text-white">
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
