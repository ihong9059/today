'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PatientAssessmentPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '환자평가 기본 원칙',
      content: [
        '환자평가 목적: 생명위협 발견, 처치 우선순위 결정',
        '평가 순서: 현장 안전 확인 → 1차 평가 → 2차 평가',
        '체계적 접근: 빠르고 정확한 평가로 적절한 처치',
        '지속적 재평가: 환자 상태 변화 모니터링',
      ],
    },
    {
      title: '1차 평가 (Primary Survey)',
      content: [
        '의식 평가: AVPU 척도 (Alert, Verbal, Pain, Unresponsive)',
        '기도(Airway): 기도 개방성 확인',
        '호흡(Breathing): 호흡 유무 및 양상 확인',
        '순환(Circulation): 맥박, 출혈, 피부 상태',
        '신경학적 평가: 의식, 동공 반응',
      ],
    },
    {
      title: '생체징후 측정',
      content: [
        '맥박: 정상 성인 60-100회/분, 위치·강도·규칙성',
        '호흡: 정상 성인 12-20회/분, 깊이와 양상',
        '혈압: 정상 120/80mmHg, 수축기/이완기',
        '체온: 정상 36.5-37.5°C, 측정 부위',
        '산소포화도: 정상 95% 이상',
      ],
    },
    {
      title: '2차 평가 (Secondary Survey)',
      content: [
        'SAMPLE 병력조사: 증상, 알레르기, 약물, 과거력, 최근식사, 사건',
        '신체검진: 머리부터 발끝까지 체계적 검진',
        '시진: 외관 관찰 (색깔, 변형, 출혈)',
        '촉진: 압통, 변형, 부종 확인',
        '청진: 호흡음, 심음 확인',
      ],
    },
    {
      title: '의식 수준 평가',
      content: [
        'AVPU: Alert(명료), Verbal(언어반응), Pain(통증반응), Unresponsive(무반응)',
        'GCS (Glasgow Coma Scale): 눈뜨기, 언어반응, 운동반응',
        'GCS 점수: 3-15점 (8점 이하 중증)',
        '동공 평가: 크기, 양측 대칭성, 대광반사',
      ],
    },
    {
      title: '환자 기록 및 보고',
      content: [
        'SOAP 기록: 주관적 정보, 객관적 정보, 평가, 계획',
        '활력징후 기록: 시간별 변화 추적',
        '처치 내용 기록: 시행한 처치와 반응',
        '인계: SBAR (상황, 배경, 평가, 요청)',
      ],
    },
  ];

  const questions = [
    {
      question: '환자평가의 올바른 순서는?',
      options: [
        '2차 평가 → 1차 평가 → 현장 안전',
        '현장 안전 → 2차 평가 → 1차 평가',
        '현장 안전 → 1차 평가 → 2차 평가',
        '1차 평가 → 현장 안전 → 2차 평가',
      ],
      correctAnswer: 2,
      explanation: '환자평가는 현장 안전 확인 → 1차 평가 → 2차 평가 순서로 진행합니다.',
    },
    {
      question: '1차 평가에서 확인하는 항목이 아닌 것은?',
      options: ['기도', '호흡', '순환', '과거 병력'],
      correctAnswer: 3,
      explanation: '1차 평가는 기도, 호흡, 순환, 의식 등 즉각적 생명위협을 확인하며, 과거 병력은 2차 평가에서 조사합니다.',
    },
    {
      question: '정상 성인의 맥박수 범위는?',
      options: ['40-60회/분', '60-100회/분', '100-120회/분', '120-140회/분'],
      correctAnswer: 1,
      explanation: '정상 성인의 맥박수는 분당 60-100회입니다.',
    },
    {
      question: 'AVPU 척도에서 V는 무엇을 의미하는가?',
      options: ['Vital (활력)', 'Verbal (언어반응)', 'Vision (시력)', 'Volume (용적)'],
      correctAnswer: 1,
      explanation: 'AVPU에서 V는 Verbal(언어반응)을 의미합니다.',
    },
    {
      question: 'SAMPLE 병력조사에서 P는 무엇을 의미하는가?',
      options: [
        'Pain (통증)',
        'Past history (과거력)',
        'Pressure (압력)',
        'Pulse (맥박)',
      ],
      correctAnswer: 1,
      explanation: 'SAMPLE에서 P는 Past history(과거 병력)을 의미합니다.',
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
            className="text-amber-600 hover:text-amber-800 mb-4 inline-block"
          >
            ← 응급구조사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold text-amber-600">환자평가</h1>
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
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
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
              <h3 className="text-xl font-semibold mb-3 text-amber-600">{topic.title}</h3>
              <ul className="space-y-2">
                {topic.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
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
                          ? 'bg-amber-50 border-2 border-amber-500'
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
              className="mt-6 w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              제출하기
            </button>
          ) : (
            <div className="mt-6 p-6 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg text-white">
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
