'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InteriorArchitectExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      id: 1,
      name: '실내디자인론',
      description: '실내디자인의 역사, 원리, 계획방법론',
      topics: [
        '디자인 원리와 요소',
        '공간계획과 동선',
        '실내디자인 역사',
        '스타일과 트렌드',
        '프로젝트 진행 과정'
      ],
      tips: '디자인 원리와 역사적 양식을 체계적으로 정리하세요.',
      difficulty: '중',
      studyPath: '/interior-architect/study/interior-planning'
    },
    {
      id: 2,
      name: '실내환경',
      description: '열환경, 빛환경, 음환경 등 실내 환경 계획',
      topics: [
        '열환경과 단열',
        '조명계획과 채광',
        '음환경과 차음',
        '환기와 공기질',
        '에너지 효율'
      ],
      tips: '각 환경 요소의 기준치와 계산 방법을 숙지하세요.',
      difficulty: '상',
      studyPath: '/interior-architect/study/interior-environment'
    },
    {
      id: 3,
      name: '실내건축구조',
      description: '건축구조 및 실내건축 시공방법',
      topics: [
        '구조의 기본 원리',
        '바닥, 벽, 천장 구조',
        '개구부와 계단',
        '마감공사',
        '설비시스템'
      ],
      tips: '각 부위별 구조 방식과 시공 순서를 이해하세요.',
      difficulty: '상',
      studyPath: '/interior-architect/study/interior-structure'
    },
    {
      id: 4,
      name: '건축재료',
      description: '실내건축에 사용되는 각종 재료의 특성',
      topics: [
        '목재와 목질재료',
        '석재와 타일',
        '금속재료',
        '유리와 플라스틱',
        '도장과 마감재'
      ],
      tips: '재료별 특성과 적용 부위를 연결하여 암기하세요.',
      difficulty: '중',
      studyPath: '/interior-architect/study/interior-materials'
    }
  ];

  const practicalInfo = {
    title: '실내건축기사 실기시험',
    description: '작업형으로 실내건축 설계 및 시공도면을 작성합니다.',
    examTime: '5시간',
    passingScore: '60점 이상',
    subjects: [
      {
        name: '실내건축설계 및 시공',
        weight: '100%',
        contents: [
          '평면도 작성',
          '천장도 작성',
          '입면도 및 단면도',
          '상세도 작성',
          '투시도 또는 액소노메트릭',
          '마감재료 지정'
        ]
      }
    ],
    studyTips: [
      'AutoCAD 활용 능력을 충분히 익히세요',
      '도면 작성 순서와 레이어 관리를 체계화하세요',
      '척도와 치수 기입 규칙을 숙지하세요',
      '시간 배분 연습이 매우 중요합니다',
      '과년도 기출문제를 반복 연습하세요'
    ],
    studyPath: '/interior-architect/study/practical'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/interior-architect" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
            <span className="mr-2">←</span> 실내건축기사 홈으로
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">📝 실내건축기사 시험 정보</h1>
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
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📖 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'practical'
                ? 'bg-purple-500 text-white shadow-md'
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
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">시험 과목</p>
                  <p className="text-2xl font-bold text-purple-600">5과목</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">문항 수</p>
                  <p className="text-2xl font-bold text-pink-600">과목당 20문항</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">시험 시간</p>
                  <p className="text-2xl font-bold text-purple-600">150분</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">합격 기준</p>
                  <p className="text-2xl font-bold text-pink-600">평균 60점</p>
                </div>
              </div>
            </div>

            {writtenSubjects.map((subject) => (
              <div key={subject.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-400 p-4">
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
                        <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
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
                    className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
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
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">시험 시간</p>
                  <p className="text-xl font-bold text-purple-600">{practicalInfo.examTime}</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">합격 기준</p>
                  <p className="text-xl font-bold text-pink-600">{practicalInfo.passingScore}</p>
                </div>
              </div>

              {practicalInfo.subjects.map((subject, idx) => (
                <div key={idx} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">{subject.name}</h4>
                    <span className="text-purple-600 font-medium">{subject.weight}</span>
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
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href={practicalInfo.studyPath}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-lg hover:from-purple-600 hover:to-pink-500 transition-all shadow-md"
                >
                  실기시험 학습하러 가기 →
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">⚠️ 실기시험 주의사항</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>도면 작성 시 축척을 정확히 지켜야 합니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>치수 기입과 문자 높이 규정을 준수하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>제한 시간 내 모든 도면을 완성해야 합니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>CAD 프로그램 버전을 미리 확인하세요</span>
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {writtenSubjects.map((subject) => (
              <Link
                key={subject.id}
                href={subject.studyPath}
                className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors"
              >
                <p className="font-medium text-purple-700 text-sm">{subject.name}</p>
              </Link>
            ))}
            <Link
              href={practicalInfo.studyPath}
              className="p-3 bg-pink-50 hover:bg-pink-100 rounded-lg text-center transition-colors"
            >
              <p className="font-medium text-pink-700 text-sm">실기시험</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
