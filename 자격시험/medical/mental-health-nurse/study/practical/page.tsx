'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PracticalPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '정신질환 사례 분석',
      content: [
        '사례 정보 수집: 인구학적 정보, 주 호소, 현 병력, 과거력',
        '증상 분석: DSM-5 진단 기준에 따른 증상 파악',
        '위험 요인 사정: 자살, 타해, 자해 위험도 평가',
        '강점과 자원 파악: 개인적, 가족적, 사회적 자원',
      ],
    },
    {
      title: '간호 진단 수립',
      content: [
        'NANDA 간호진단 적용',
        '우선순위 결정: 생명 위협 > 안전 > 심리사회적 문제',
        '관련 요인과 증상 기술',
        '실제적 진단 vs 위험 진단 구분',
      ],
    },
    {
      title: '간호 계획 수립',
      content: [
        '장기 목표: 퇴원 시 달성 목표 (예: 재발 없이 지역사회 생활)',
        '단기 목표: 측정 가능하고 구체적인 목표 (예: 3일 내 자살 사고 감소)',
        '간호 중재 계획: 약물 관리, 치료적 의사소통, 환경 조성',
        '평가 기준 설정: 목표 달성 여부를 측정할 기준',
      ],
    },
    {
      title: '간호 수행',
      content: [
        '직접 간호: 투약, 증상 관리, 일상생활 지원',
        '간접 간호: 환경 관리, 팀 협력, 가족 교육',
        '안전 관리: 자살 예방, 공격성 관리, 낙상 예방',
        '문서화: 정확하고 객관적인 기록',
      ],
    },
    {
      title: '간호 평가',
      content: [
        '목표 달성도 평가: 완전 달성, 부분 달성, 미달성',
        '증상 변화 측정: 척도 사용 (예: PHQ-9, GAD-7)',
        '간호 중재의 효과성 평가',
        '간호 계획 수정: 평가 결과에 따른 계획 재조정',
      ],
    },
    {
      title: '실무 시나리오',
      content: [
        '자살 위기 환자: 즉각 안전 조치, 1:1 관찰, 정신과 의뢰',
        '공격적 행동 환자: 탈자극, 안전한 환경, 필요시 격리/억제',
        '약물 부작용 관리: 증상 인식, 보고, 처치',
        '퇴원 계획: 지역사회 자원 연계, 추후 관리 교육',
      ],
    },
  ];

  const questions = [
    {
      question: '자살 사고를 표현하는 환자에게 최우선 간호 중재는?',
      options: [
        '항우울제 투여',
        '안전 환경 조성 및 1:1 관찰',
        '가족 면회 제한',
        '취미 활동 권장',
      ],
      correctAnswer: 1,
      explanation: '자살 위험이 있는 환자의 최우선 간호는 안전 확보입니다. 위험 물품 제거, 집중 관찰, 안전 계약 등이 필요합니다.',
    },
    {
      question: 'NANDA 간호진단 우선순위 결정 원칙으로 옳은 것은?',
      options: [
        '심리적 문제 > 생리적 문제',
        '만성 문제 > 급성 문제',
        '생명 위협 > 안전 > 심리사회적 문제',
        '환자 선호도 중심',
      ],
      correctAnswer: 2,
      explanation: '간호진단 우선순위는 생명을 위협하는 문제, 안전 문제, 심리사회적 문제 순으로 결정합니다.',
    },
    {
      question: '조현병 환자의 단기 목표로 가장 적절한 것은?',
      options: [
        '완전한 증상 소실',
        '3일 내 환각으로 인한 불안 감소',
        '평생 재발 없음',
        '즉시 직장 복귀',
      ],
      correctAnswer: 1,
      explanation: '단기 목표는 측정 가능하고 현실적이며 기간이 명확해야 합니다. "3일 내 환각으로 인한 불안 감소"가 적절합니다.',
    },
    {
      question: '공격적 행동을 보이는 환자 관리의 첫 단계는?',
      options: [
        '즉시 격리 및 억제',
        '탈자극과 언어적 개입',
        '진정제 강제 투여',
        '보호자 호출',
      ],
      correctAnswer: 1,
      explanation: '공격성 관리는 최소 제한의 원칙에 따라 먼저 탈자극과 언어적 개입을 시도하고, 효과 없을 때 단계적으로 제한을 증가시킵니다.',
    },
    {
      question: '퇴원 계획에 포함되어야 할 내용이 아닌 것은?',
      options: [
        '복약 교육',
        '지역사회 자원 정보',
        '재발 조기 경고 신호',
        '입원 경력 공개 의무',
      ],
      correctAnswer: 3,
      explanation: '퇴원 계획에는 복약 교육, 지역사회 자원 연계, 재발 예방 교육이 포함되지만, 입원 경력 공개 의무는 포함되지 않습니다.',
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
            className="text-pink-600 hover:text-pink-800 mb-4 inline-block"
          >
            ← 정신건강간호사 메인으로
          </Link>
          <h1 className="text-4xl font-bold text-pink-600">실기</h1>
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
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              치료적의사소통
            </Link>
            <Link
              href="/자격시험/medical/mental-health-nurse/study/practical"
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
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
              <h3 className="text-xl font-semibold mb-3 text-pink-600">{topic.title}</h3>
              <ul className="space-y-2">
                {topic.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
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
                          ? 'bg-pink-50 border-2 border-pink-500'
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
                  <div className="mt-3 p-3 bg-pink-50 rounded-lg">
                    <p className="text-sm text-pink-900">
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
              className="mt-6 w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              제출하기
            </button>
          ) : (
            <div className="mt-6 p-6 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg text-white">
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
