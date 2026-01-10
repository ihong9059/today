'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TherapeuticCommunicationPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '치료적 관계의 원리',
      content: [
        '치료적 관계의 특성: 목적 지향적, 시간 제한적, 전문적 관계',
        '치료적 관계의 단계: 도입기 → 작업기 → 종결기',
        'Peplau의 간호사-환자 관계 이론: 낯선 사람, 자원 제공자, 교사, 상담자',
        '전이와 역전이: 인식하고 관리하기',
      ],
    },
    {
      title: '치료적 의사소통 기법',
      content: [
        '경청(Active Listening): 완전한 주의 집중, 비언어적 신호 인식',
        '공감(Empathy): 환자의 감정을 이해하고 인정',
        '명료화(Clarification): 모호한 내용을 분명히 함',
        '반영(Reflection): 환자의 말이나 감정을 되돌려 줌',
        '침묵(Silence): 의미 있는 침묵의 활용',
      ],
    },
    {
      title: '비치료적 의사소통',
      content: [
        '안심시키기: "걱정하지 마세요" - 환자의 감정 무시',
        '조언하기: "이렇게 하세요" - 환자의 자율성 침해',
        '방어하기: "그건 아니에요" - 소통 단절',
        '주제 바꾸기: 환자가 다루고자 하는 문제 회피',
        '판단하기: 환자의 행동이나 감정을 평가',
      ],
    },
    {
      title: '면담 기술',
      content: [
        '개방형 질문: "어떻게 느끼세요?" - 자유로운 표현 유도',
        '폐쇄형 질문: "잠은 잘 주무셨나요?" - 구체적 정보 수집',
        '탐색: "그것에 대해 더 말씀해 주시겠어요?"',
        '초점 맞추기: 중요한 주제로 대화 유도',
        '요약: 대화 내용을 정리하여 확인',
      ],
    },
    {
      title: '특수 상황의 의사소통',
      content: [
        '공격적 환자: 안전 유지, 차분한 태도, 명확한 한계 설정',
        '망상 환자: 망상 내용 인정하지 않되 감정은 인정',
        '우울한 환자: 시간 주기, 희망 주기, 자살 위험 평가',
        '조증 환자: 간결한 지시, 자극 최소화, 한계 설정',
      ],
    },
    {
      title: '집단 치료 의사소통',
      content: [
        '집단 역동: 응집력, 보편성, 이타심, 카타르시스',
        '집단 지도자 역할: 촉진자, 관찰자, 모델',
        '집단 규범 설정: 비밀 보장, 존중, 참여',
        '문제 해결: 갈등 관리, 저항 다루기',
      ],
    },
  ];

  const questions = [
    {
      question: '치료적 관계의 특성이 아닌 것은?',
      options: ['목적 지향적', '시간 제한적', '개인적 친밀성', '전문적 관계'],
      correctAnswer: 2,
      explanation: '치료적 관계는 목적 지향적이고 전문적인 관계로, 개인적 친밀성이 아닌 전문적 경계를 유지해야 합니다.',
    },
    {
      question: '다음 중 치료적 의사소통 기법은?',
      options: ['안심시키기', '조언하기', '공감하기', '판단하기'],
      correctAnswer: 2,
      explanation: '공감은 환자의 감정을 이해하고 인정하는 치료적 의사소통 기법입니다. 나머지는 비치료적 의사소통입니다.',
    },
    {
      question: '망상을 호소하는 환자에게 적절한 의사소통은?',
      options: [
        '"그건 사실이 아니에요"라고 단정한다',
        '"그렇게 느끼시는군요. 불안하시겠어요"라고 감정을 인정한다',
        '망상 내용에 동의한다',
        '망상 내용을 무시한다',
      ],
      correctAnswer: 1,
      explanation: '망상 자체를 인정하지는 않지만, 환자가 느끼는 감정과 불안은 인정하고 공감하는 것이 적절합니다.',
    },
    {
      question: '"어떻게 느끼세요?"는 어떤 유형의 질문인가?',
      options: ['폐쇄형 질문', '개방형 질문', '유도 질문', '확인 질문'],
      correctAnswer: 1,
      explanation: '개방형 질문은 환자가 자유롭게 자신의 생각과 감정을 표현할 수 있도록 하는 질문입니다.',
    },
    {
      question: '집단 치료에서 "다른 사람들도 비슷한 문제를 겪고 있다"는 깨달음은?',
      options: ['보편성', '이타심', '카타르시스', '사회화'],
      correctAnswer: 0,
      explanation: '보편성(Universality)은 자신만 겪는 문제가 아니라 다른 사람들도 유사한 어려움을 경험한다는 깨달음입니다.',
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
            className="text-orange-600 hover:text-orange-800 mb-4 inline-block"
          >
            ← 정신건강간호사 메인으로
          </Link>
          <h1 className="text-4xl font-bold text-orange-600">치료적의사소통</h1>
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
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
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
            <div className="mt-6 p-6 bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg text-white">
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
