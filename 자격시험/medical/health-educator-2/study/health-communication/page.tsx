'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HealthCommunicationPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '보건의사소통의 개념',
      content: [
        '보건의사소통의 정의: 건강 관련 정보와 메시지를 효과적으로 전달하는 과정',
        '의사소통의 구성요소: 송신자, 수신자, 메시지, 채널, 피드백',
        '의사소통의 유형: 언어적/비언어적, 일방향/쌍방향',
        '효과적 의사소통의 원칙: 명확성, 간결성, 정확성, 적시성',
      ],
    },
    {
      title: '언어적 의사소통',
      content: [
        '명확한 표현: 전문용어 피하고 이해하기 쉬운 언어 사용',
        '적극적 경청: 상대방의 말에 집중하고 반응하기',
        '질문 기법: 개방형 질문으로 대화 유도',
        '요약 및 확인: 이해한 내용을 정리하여 확인',
      ],
    },
    {
      title: '비언어적 의사소통',
      content: [
        '신체언어: 자세, 제스처, 움직임',
        '얼굴 표정: 감정과 태도 표현',
        '눈 맞춤: 관심과 신뢰 표현',
        '공간 활용: 적절한 거리 유지',
        '음성 특성: 어조, 속도, 크기, 억양',
      ],
    },
    {
      title: '대인 의사소통 기법',
      content: [
        '공감: 상대방의 감정과 입장 이해',
        '존중: 대상자의 가치와 신념 존중',
        '명료화: 불명확한 내용 확인 및 재진술',
        '반영: 상대방의 감정과 내용 되돌려주기',
        '침묵 활용: 생각할 시간 제공',
      ],
    },
    {
      title: '집단 의사소통',
      content: [
        '회의 운영: 명확한 목적과 의제 설정',
        '토론 진행: 참여 독려 및 의견 조율',
        '갈등 관리: 차이 인정하고 중재',
        '의사결정: 합의 도출 및 실행계획 수립',
      ],
    },
    {
      title: '매스미디어 활용',
      content: [
        '매체 선택: 대상자 특성에 맞는 매체 선정',
        '메시지 설계: 핵심 내용 강조, 간결한 표현',
        'SNS 활용: 쌍방향 소통, 실시간 정보 제공',
        '효과 평가: 도달률, 이해도, 행동변화 측정',
      ],
    },
  ];

  const questions = [
    {
      question: '의사소통의 구성요소가 아닌 것은?',
      options: ['송신자', '수신자', '메시지', '평가'],
      correctAnswer: 3,
      explanation: '의사소통의 구성요소는 송신자, 수신자, 메시지, 채널, 피드백입니다.',
    },
    {
      question: '비언어적 의사소통의 예로 적절하지 않은 것은?',
      options: ['눈 맞춤', '질문하기', '얼굴 표정', '자세'],
      correctAnswer: 1,
      explanation: '질문하기는 언어적 의사소통에 해당합니다.',
    },
    {
      question: '적극적 경청에 대한 설명으로 옳은 것은?',
      options: [
        '상대방의 말을 듣지 않고 자신의 의견만 말한다',
        '상대방의 말에 집중하고 반응한다',
        '전문용어를 많이 사용한다',
        '일방적으로 정보를 전달한다',
      ],
      correctAnswer: 1,
      explanation: '적극적 경청은 상대방의 말에 집중하고 적절히 반응하는 것입니다.',
    },
    {
      question: '개방형 질문의 예로 적절한 것은?',
      options: [
        '오늘 운동하셨나요?',
        '식사는 하셨나요?',
        '건강관리를 위해 어떤 노력을 하고 계신가요?',
        '약은 드셨나요?',
      ],
      correctAnswer: 2,
      explanation: '개방형 질문은 예/아니오로 답할 수 없고 자세한 답변을 유도하는 질문입니다.',
    },
    {
      question: '공감에 대한 설명으로 옳은 것은?',
      options: [
        '상대방의 잘못을 지적한다',
        '자신의 경험을 강요한다',
        '상대방의 감정과 입장을 이해한다',
        '동정심을 표현한다',
      ],
      correctAnswer: 2,
      explanation: '공감은 상대방의 감정과 입장을 이해하고 함께 느끼는 것입니다.',
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
          <h1 className="text-4xl font-bold text-green-600">보건의사소통</h1>
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
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
              <h3 className="text-xl font-semibold mb-3 text-green-600">{topic.title}</h3>
              <ul className="space-y-2">
                {topic.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
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
                          ? 'bg-green-50 border-2 border-green-500'
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
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-900">
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
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              제출하기
            </button>
          ) : (
            <div className="mt-6 p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white">
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
