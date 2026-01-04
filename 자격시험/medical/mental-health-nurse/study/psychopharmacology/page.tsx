'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PsychopharmacologyPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '항정신병 약물',
      content: [
        '전형적 항정신병약물(1세대): Haloperidol, Chlorpromazine - 도파민 D2 수용체 차단',
        '비전형적 항정신병약물(2세대): Risperidone, Olanzapine, Quetiapine - 세로토닌, 도파민 조절',
        '적응증: 조현병, 양극성장애의 조증, 정신병적 증상',
        '부작용: 추체외로증상(EPS), 지연성 운동장애, 체중 증가, 대사증후군',
      ],
    },
    {
      title: '항우울제',
      content: [
        'SSRI: Fluoxetine, Sertraline - 세로토닌 재흡수 억제',
        'SNRI: Venlafaxine, Duloxetine - 세로토닌, 노르에피네프린 재흡수 억제',
        '삼환계 항우울제(TCA): Amitriptyline - 부작용 많아 2차 선택',
        'MAOI: Phenelzine - 식이 제한 필요, 약물 상호작용 주의',
      ],
    },
    {
      title: '기분조절제',
      content: [
        'Lithium: 양극성장애 치료의 금기준, 좁은 치료 범위 (0.6-1.2 mEq/L)',
        '항경련제: Valproate, Carbamazepine, Lamotrigine',
        '부작용: Lithium - 떨림, 다뇨, 갑상선 기능저하',
        '모니터링: 혈중 농도, 신기능, 갑상선 기능 정기 검사',
      ],
    },
    {
      title: '항불안제 및 수면제',
      content: [
        'Benzodiazepines: Lorazepam, Diazepam, Alprazolam',
        '작용: GABA 수용체 작용, 즉각적 항불안 효과',
        '부작용: 진정, 의존성, 금단증상',
        '비벤조디아제핀 수면제: Zolpidem, Zaleplon - 의존성 낮음',
      ],
    },
    {
      title: '추체외로증상(EPS) 관리',
      content: [
        'Acute Dystonia(급성 근긴장이상): 근육 경련, 응급 처치 필요 - Benztropine 투여',
        'Parkinsonism: 떨림, 경직, 서동 - 항콜린제 투여',
        'Akathisia(정좌불능): 안절부절, 베타차단제 효과적',
        'Tardive Dyskinesia(지연성 운동장애): 비가역적, 예방이 중요',
      ],
    },
    {
      title: '약물 간호 관리',
      content: [
        '복약 순응도 증진: 교육, 부작용 관리, 지지',
        '약물 상호작용 모니터링',
        '임신 중 약물 사용: 최소화, 위험-이득 평가',
        '응급 상황: 세로토닌 증후군, 신경이완제 악성증후군(NMS) 인식',
      ],
    },
  ];

  const questions = [
    {
      question: '비전형적 항정신병약물의 장점은?',
      options: [
        '추체외로증상이 적다',
        '가격이 저렴하다',
        '즉각적인 효과가 있다',
        '부작용이 전혀 없다',
      ],
      correctAnswer: 0,
      explanation: '비전형적(2세대) 항정신병약물은 전형적 약물에 비해 추체외로증상(EPS)이 적고 음성 증상에도 효과적입니다.',
    },
    {
      question: 'Lithium의 치료 농도 범위는?',
      options: ['0.1-0.3 mEq/L', '0.6-1.2 mEq/L', '2.0-3.0 mEq/L', '5.0-10.0 mEq/L'],
      correctAnswer: 1,
      explanation: 'Lithium의 치료 농도는 0.6-1.2 mEq/L로 매우 좁은 범위이며, 정기적인 혈중 농도 모니터링이 필수입니다.',
    },
    {
      question: 'SSRI 항우울제의 작용 기전은?',
      options: [
        '도파민 수용체 차단',
        '세로토닌 재흡수 억제',
        'GABA 수용체 작용',
        '노르에피네프린 분비 촉진',
      ],
      correctAnswer: 1,
      explanation: 'SSRI(선택적 세로토닌 재흡수 억제제)는 시냅스에서 세로토닌의 재흡수를 억제하여 세로토닌 농도를 증가시킵니다.',
    },
    {
      question: '급성 근긴장이상(Acute Dystonia)의 응급 처치는?',
      options: [
        'Lithium 투여',
        'Fluoxetine 투여',
        'Benztropine 투여',
        '약물 중단만으로 충분',
      ],
      correctAnswer: 2,
      explanation: '급성 근긴장이상은 응급 상황으로 항콜린제인 Benztropine이나 Diphenhydramine을 즉시 투여해야 합니다.',
    },
    {
      question: 'Benzodiazepines의 주요 부작용이 아닌 것은?',
      options: ['진정', '의존성', '금단증상', '추체외로증상'],
      correctAnswer: 3,
      explanation: '추체외로증상은 항정신병약물의 부작용이며, Benzodiazepines의 주요 부작용은 진정, 의존성, 금단증상입니다.',
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
            className="text-green-600 hover:text-green-800 mb-4 inline-block"
          >
            ← 정신건강간호사 메인으로
          </Link>
          <h1 className="text-4xl font-bold text-green-600">정신약리학</h1>
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
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
            <div className="mt-6 p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white">
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
