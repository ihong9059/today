'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FirstAidPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '응급처치의 기본 원칙',
      content: [
        '응급처치 정의: 생명을 구하고 추가 손상을 방지하기 위한 즉각적 처치',
        '응급처치 3대 원칙: 신속성, 적절성, 안전성',
        '응급처치 우선순위: 기도확보 → 호흡 → 순환',
        '현장 안전 확인: 처치자와 환자의 안전이 최우선',
      ],
    },
    {
      title: '기도유지 및 호흡관리',
      content: [
        '기도폐쇄의 원인: 이물질, 혀 후퇴, 구토물, 부종',
        '기도유지 방법: 머리 젖히고 턱 들어올리기, 턱 밀어올리기',
        '이물질 제거: 복부 밀어내기(하임리히법), 등 두드리기',
        '산소공급: 비강캐뉼라, 마스크를 통한 산소 투여',
      ],
    },
    {
      title: '외상 응급처치',
      content: [
        '출혈 조절: 직접압박 → 압박붕대 → 지혈점 압박 → 지혈대',
        '골절 처치: 부목 고정, 고정 시 혈액순환 확인',
        '화상 처치: 흐르는 물로 냉각(10-20분), 물집 터뜨리지 않기',
        '두부외상: 경추 보호, 의식 및 동공 확인',
      ],
    },
    {
      title: '내과적 응급상황',
      content: [
        '심근경색: 흉통, 호흡곤란, 식은땀, 즉시 119 신고',
        '뇌졸중: FAST 평가 (Face, Arm, Speech, Time)',
        '저혈당: 의식 있으면 당분 섭취, 없으면 119 신고',
        '과호흡 증후군: 안정, 천천히 호흡 유도',
      ],
    },
    {
      title: '환경성 응급상황',
      content: [
        '열사병: 체온 낮추기, 물 적신 천으로 냉각',
        '저체온증: 서서히 체온 올리기, 젖은 옷 제거',
        '감전: 전원 차단 후 접근, 심정지 시 CPR',
        '익수: 물 밖으로 구출, 기도 확보 및 CPR',
      ],
    },
    {
      title: '특수 상황 응급처치',
      content: [
        '중독: 독성물질 확인, 구토 유발 금지(부식성 물질)',
        '교상: 상처 소독, 동물 확인(광견병 위험)',
        '벌레 물림: 침 제거, 알레르기 반응 관찰',
        '이물질 박힘: 깊게 박힌 경우 제거하지 않고 고정',
      ],
    },
  ];

  const questions = [
    {
      question: '응급처치의 3대 원칙이 아닌 것은?',
      options: ['신속성', '적절성', '안전성', '경제성'],
      correctAnswer: 3,
      explanation: '응급처치의 3대 원칙은 신속성, 적절성, 안전성입니다.',
    },
    {
      question: '응급처치 우선순위의 올바른 순서는?',
      options: [
        '호흡 → 기도확보 → 순환',
        '기도확보 → 호흡 → 순환',
        '순환 → 기도확보 → 호흡',
        '기도확보 → 순환 → 호흡',
      ],
      correctAnswer: 1,
      explanation: '응급처치는 기도확보 → 호흡 → 순환 순서로 진행합니다.',
    },
    {
      question: '출혈 조절의 우선순위가 올바른 것은?',
      options: [
        '지혈대 → 직접압박 → 압박붕대',
        '직접압박 → 압박붕대 → 지혈점 압박 → 지혈대',
        '압박붕대 → 직접압박 → 지혈대',
        '지혈점 압박 → 직접압박 → 지혈대',
      ],
      correctAnswer: 1,
      explanation: '출혈 조절은 직접압박 → 압박붕대 → 지혈점 압박 → 지혈대 순서입니다.',
    },
    {
      question: '화상 처치 시 가장 먼저 해야 할 것은?',
      options: [
        '물집을 터뜨린다',
        '연고를 바른다',
        '흐르는 물로 냉각한다',
        '얼음을 직접 댄다',
      ],
      correctAnswer: 2,
      explanation: '화상은 먼저 흐르는 물로 10-20분간 냉각해야 하며, 물집을 터뜨리지 않습니다.',
    },
    {
      question: '뇌졸중 의심 환자 평가에 사용하는 FAST에서 F는 무엇을 의미하는가?',
      options: ['First (첫번째)', 'Fast (빠른)', 'Face (얼굴)', 'Finger (손가락)'],
      correctAnswer: 2,
      explanation: 'FAST는 Face(얼굴), Arm(팔), Speech(언어), Time(시간)을 의미합니다.',
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
            className="text-red-600 hover:text-red-800 mb-4 inline-block"
          >
            ← 응급구조사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold text-red-600">응급처치학</h1>
        </div>

        {/* 과목 네비게이션 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/자격시험/medical/paramedic-2/study/first-aid"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
              <h3 className="text-xl font-semibold mb-3 text-red-600">{topic.title}</h3>
              <ul className="space-y-2">
                {topic.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
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
                          ? 'bg-red-50 border-2 border-red-500'
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
              className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              제출하기
            </button>
          ) : (
            <div className="mt-6 p-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg text-white">
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
