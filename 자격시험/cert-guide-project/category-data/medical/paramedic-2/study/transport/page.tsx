'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TransportPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '환자 이송 원칙',
      content: [
        '이송 목적: 안전하고 신속한 의료기관 이송',
        '이송 전 평가: 환자 상태 안정화 우선',
        '이송 중 관찰: 지속적인 생체징후 모니터링',
        '안전 확보: 환자와 구조자 모두의 안전',
      ],
    },
    {
      title: '환자 이동 및 운반 기법',
      content: [
        '1인 운반법: 부축법, 등에 업는 법, 안아서 운반',
        '2인 운반법: 의자법, 팔 걸터앉히기, 들것 운반',
        '3인 이상 운반: 척추 손상 의심 시, 동시에 이동',
        '긴급 이동: 화재, 폭발 위험 시 신속 이동',
      ],
    },
    {
      title: '들것 사용법',
      content: [
        '들것 종류: 이동식 들것, 스쿱 들것, 바스켓 들것',
        '환자 옮기기: 로그롤링, 들어올리기',
        '고정 방법: 안전벨트 사용, 머리 고정',
        '계단 이송: 머리를 위로, 발을 아래로',
      ],
    },
    {
      title: '특수 상황 이송',
      content: [
        '척추 손상: 척추고정판, 경추보호대 적용',
        '골절 환자: 부목 고정 후 이송',
        '화상 환자: 무균 시트로 덮어 이송',
        '임신부: 왼쪽으로 15-30도 기울임',
        '소아: 보호자 동반, 불안 완화',
      ],
    },
    {
      title: '구급차 운용',
      content: [
        '구급차 종류: 일반형, 특수형(중환자용)',
        '장비 점검: 출동 전 필수 장비 확인',
        '운전 원칙: 안전운전, 환자 상태 고려',
        '구급차 내 배치: 환자 관찰 가능한 위치',
        '감염 관리: 사용 후 소독 및 청결 유지',
      ],
    },
    {
      title: '이송 기록 및 인계',
      content: [
        '이송 기록: 출동 시간, 도착 시간, 처치 내용',
        '의료기관 선정: 환자 상태에 적합한 병원',
        '병원 사전 연락: 환자 정보 전달',
        '인계: SBAR 형식 (상황, 배경, 평가, 요청)',
        '법적 서류: 환자 동의서, 이송 기록지',
      ],
    },
  ];

  const questions = [
    {
      question: '계단으로 환자를 이송할 때 올바른 방법은?',
      options: [
        '머리를 아래로, 발을 위로',
        '머리를 위로, 발을 아래로',
        '옆으로 눕혀서 이송',
        '세워서 이송',
      ],
      correctAnswer: 1,
      explanation: '계단 이송 시 환자의 머리를 위로, 발을 아래로 하여 이송합니다.',
    },
    {
      question: '척추 손상이 의심되는 환자 이송 시 필수 장비는?',
      options: [
        '산소마스크',
        '척추고정판과 경추보호대',
        '부목',
        '들것만 있으면 됨',
      ],
      correctAnswer: 1,
      explanation: '척추 손상 의심 환자는 척추고정판과 경추보호대를 사용하여 이송해야 합니다.',
    },
    {
      question: '임신부 이송 시 올바른 자세는?',
      options: [
        '바로 누운 자세',
        '왼쪽으로 15-30도 기울임',
        '오른쪽으로 15-30도 기울임',
        '앉은 자세',
      ],
      correctAnswer: 1,
      explanation: '임신부는 자궁이 하대정맥을 압박하지 않도록 왼쪽으로 15-30도 기울여 이송합니다.',
    },
    {
      question: '로그롤링(Log rolling) 기법이 필요한 경우는?',
      options: [
        '골절이 있는 환자',
        '척추 손상이 의심되는 환자',
        '화상 환자',
        '심장마비 환자',
      ],
      correctAnswer: 1,
      explanation: '로그롤링은 척추 손상이 의심되는 환자를 움직일 때 사용하는 기법입니다.',
    },
    {
      question: '병원 인계 시 사용하는 SBAR에서 B는 무엇을 의미하는가?',
      options: ['Blood (혈액)', 'Background (배경)', 'Breathing (호흡)', 'Burn (화상)'],
      correctAnswer: 1,
      explanation: 'SBAR에서 B는 Background(배경)를 의미합니다.',
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
            className="text-yellow-600 hover:text-yellow-800 mb-4 inline-block"
          >
            ← 응급구조사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold text-yellow-600">환자 이송</h1>
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
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
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
              <h3 className="text-xl font-semibold mb-3 text-yellow-600">{topic.title}</h3>
              <ul className="space-y-2">
                {topic.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
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
                          ? 'bg-yellow-50 border-2 border-yellow-500'
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
              className="mt-6 w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              제출하기
            </button>
          ) : (
            <div className="mt-6 p-6 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg text-white">
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
