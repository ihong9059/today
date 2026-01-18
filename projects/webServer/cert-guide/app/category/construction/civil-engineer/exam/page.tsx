'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CivilEngineerExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      id: 1,
      name: '응용역학',
      description: '정역학, 재료역학, 구조역학의 기본 원리와 응용',
      topics: [
        '힘의 평형과 모멘트',
        '트러스 해석',
        '보의 응력과 변형',
        '기둥의 좌굴',
        '부정정 구조물 해석'
      ],
      tips: '공식 암기보다 원리 이해가 중요합니다. 자유물체도를 정확히 그리는 연습을 하세요.',
      difficulty: '상',
      studyPath: '/category/construction/civil-engineer/study/applied-mechanics'
    },
    {
      id: 2,
      name: '측량학',
      description: '거리, 각도, 높이 측정 및 지형도 작성 기술',
      topics: [
        '거리측량과 각측량',
        '수준측량',
        '삼각측량',
        'GPS 측량',
        '지형측량과 노선측량'
      ],
      tips: '측량 장비의 원리와 오차 보정 방법을 확실히 이해하세요.',
      difficulty: '중',
      studyPath: '/category/construction/civil-engineer/study/surveying'
    },
    {
      id: 3,
      name: '수리학 및 수문학',
      description: '물의 흐름과 수자원 관리에 관한 이론',
      topics: [
        '정수역학',
        '동수역학과 관수로',
        '개수로 흐름',
        '수문학 기초',
        '지하수와 하천수문'
      ],
      tips: '베르누이 방정식과 연속방정식의 응용을 완벽히 익히세요.',
      difficulty: '상',
      studyPath: '/category/construction/civil-engineer/study/hydraulics'
    },
    {
      id: 4,
      name: '토질 및 기초',
      description: '흙의 성질과 기초 구조물 설계',
      topics: [
        '흙의 물리적 성질',
        '투수와 침투',
        '압밀과 전단강도',
        '토압과 사면안정',
        '얕은기초와 깊은기초'
      ],
      tips: '흙의 분류와 각종 시험 방법을 정확히 알아두세요.',
      difficulty: '상',
      studyPath: '/category/construction/civil-engineer/study/soil-mechanics'
    },
    {
      id: 5,
      name: '상하수도공학',
      description: '상수도 및 하수도 시설의 계획과 설계',
      topics: [
        '상수도 계획',
        '취수 및 도수시설',
        '정수처리',
        '하수도 계획',
        '하수처리 공정'
      ],
      tips: '수질 기준과 처리 공정의 순서를 체계적으로 정리하세요.',
      difficulty: '중',
      studyPath: '/category/construction/civil-engineer/study/water-supply'
    }
  ];

  const practicalInfo = {
    title: '토목기사 실기시험',
    description: '필답형으로 토목 분야 실무 능력을 평가합니다.',
    examTime: '180분 (3시간)',
    passingScore: '60점 이상',
    subjects: [
      {
        name: '토목설계 및 시공',
        weight: '100%',
        contents: [
          '측량 및 지형공간정보',
          '구조물 설계 계산',
          '토공 및 기초공사',
          '콘크리트 공사',
          '도로 및 포장공사',
          '수리 및 항만공사',
          '공정관리 및 품질관리'
        ]
      }
    ],
    studyTips: [
      '계산 문제는 단위 환산에 주의하세요',
      '공식 유도 과정을 이해하면 응용이 쉬워집니다',
      '시공 순서와 품질관리 기준을 암기하세요',
      '과년도 기출문제를 반복 풀이하세요',
      '도면 해석 능력을 키우세요'
    ],
    studyPath: '/category/construction/civil-engineer/study/practical'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/construction/civil-engineer" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
            <span className="mr-2">←</span> 토목기사 홈으로
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">📝 토목기사 시험 정보</h1>
          <p className="text-lg text-white/90">과목별 상세 정보와 학습 전략을 확인하세요</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-2 inline-flex">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'written'
                ? 'bg-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📖 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'practical'
                ? 'bg-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            ✍️ 실기시험
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'written' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">시험 과목</p>
                  <p className="text-2xl font-bold text-teal-600">5과목</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">문항 수</p>
                  <p className="text-2xl font-bold text-cyan-600">과목당 20문항</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">시험 시간</p>
                  <p className="text-2xl font-bold text-blue-600">150분</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">합격 기준</p>
                  <p className="text-2xl font-bold text-indigo-600">평균 60점</p>
                </div>
              </div>
            </div>

            {writtenSubjects.map((subject) => (
              <div key={subject.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-400 p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">
                      {subject.id}. {subject.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      subject.difficulty === '상' ? 'bg-red-100 text-red-700' :
                      subject.difficulty === '중' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      난이도: {subject.difficulty}
                    </span>
                  </div>
                  <p className="text-white/90 mt-1">{subject.description}</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">📚 주요 학습 내용</h4>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic, idx) => (
                        <span key={idx} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <p className="text-sm text-yellow-800">
                      <strong>💡 학습 TIP:</strong> {subject.tips}
                    </p>
                  </div>
                  <Link
                    href={subject.studyPath}
                    className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    학습하러 가기 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{practicalInfo.title}</h2>
              <p className="text-gray-600 mb-6">{practicalInfo.description}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-teal-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">시험 시간</p>
                  <p className="text-xl font-bold text-teal-600">{practicalInfo.examTime}</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">합격 기준</p>
                  <p className="text-xl font-bold text-cyan-600">{practicalInfo.passingScore}</p>
                </div>
              </div>

              {practicalInfo.subjects.map((subject, idx) => (
                <div key={idx} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">{subject.name}</h4>
                    <span className="text-teal-600 font-medium">{subject.weight}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {subject.contents.map((content, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {content}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📝 실기시험 학습 전략</h3>
              <div className="space-y-3">
                {practicalInfo.studyTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href={practicalInfo.studyPath}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-400 text-white rounded-lg hover:from-teal-600 hover:to-cyan-500 transition-all shadow-md"
                >
                  실기시험 학습하러 가기 →
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-500 to-cyan-400 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">⚠️ 실기시험 주의사항</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>계산 과정을 반드시 기재해야 부분 점수를 받을 수 있습니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>단위를 정확히 기재하세요 (kN, MPa, m³ 등)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>공학용 계산기 사용이 가능합니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>시간 배분을 잘 하여 모든 문제에 답안을 작성하세요</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📚 과목별 학습 바로가기</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {writtenSubjects.map((subject) => (
              <Link
                key={subject.id}
                href={subject.studyPath}
                className="p-3 bg-teal-50 hover:bg-teal-100 rounded-lg text-center transition-colors"
              >
                <p className="font-medium text-teal-700 text-sm">{subject.name}</p>
              </Link>
            ))}
            <Link
              href={practicalInfo.studyPath}
              className="p-3 bg-cyan-50 hover:bg-cyan-100 rounded-lg text-center transition-colors"
            >
              <p className="font-medium text-cyan-700 text-sm">실기시험</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
