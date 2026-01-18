'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SurveyingGeoExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      id: 1,
      name: '측량학 개론',
      description: '기본측량, 응용측량, 측량기기 등',
      topics: [
        '거리측량과 각측량',
        '수준측량',
        '다각측량과 삼각측량',
        '평판측량',
        '노선 및 하천측량'
      ],
      tips: '측량 오차의 원인과 보정법을 확실히 이해하세요.',
      difficulty: '중',
      studyPath: '/surveying-geo/study/surveying-basics'
    },
    {
      id: 2,
      name: 'GIS',
      description: '지리정보시스템의 구축과 활용',
      topics: [
        '공간데이터 모델',
        '래스터와 벡터',
        '공간분석 기법',
        '데이터베이스 관리',
        'GIS 응용 분야'
      ],
      tips: '공간분석 방법과 데이터 구조를 체계적으로 정리하세요.',
      difficulty: '중',
      studyPath: '/surveying-geo/study/gis'
    },
    {
      id: 3,
      name: '사진측량 및 원격탐사',
      description: '항공사진측량과 위성영상 분석',
      topics: [
        '사진측량의 기초',
        '내부표정과 외부표정',
        '수치사진측량',
        '원격탐사 원리',
        '영상처리 기법'
      ],
      tips: '편위수정과 표정요소 결정 방법을 숙지하세요.',
      difficulty: '상',
      studyPath: '/surveying-geo/study/photogrammetry'
    },
    {
      id: 4,
      name: '측지학 및 위성측위',
      description: 'GNSS 측량과 좌표계',
      topics: [
        '타원체와 지오이드',
        '좌표계와 투영법',
        'GPS 측위 원리',
        'GNSS 오차와 보정',
        'RTK 및 네트워크 측량'
      ],
      tips: 'GPS 오차 요인과 상대측위 원리를 이해하세요.',
      difficulty: '상',
      studyPath: '/surveying-geo/study/geodesy'
    }
  ];

  const practicalInfo = {
    title: '측량및지형공간정보기사 실기시험',
    description: '필답형으로 측량 실무 능력을 평가합니다.',
    examTime: '3시간',
    passingScore: '60점 이상',
    subjects: [
      {
        name: '측량실무',
        weight: '100%',
        contents: [
          '기준점측량 계산',
          '수준측량 야장 정리',
          '다각측량 계산',
          'GPS 측량 성과 처리',
          '지형도 독도 및 면적 계산',
          '노선측량 및 토량 계산'
        ]
      }
    ],
    studyTips: [
      '측량 계산 공식을 완벽히 암기하세요',
      '야장 정리와 조정 계산을 연습하세요',
      '좌표 변환 계산을 숙달하세요',
      '공학용 계산기 사용법을 익히세요',
      '과년도 기출문제를 반복 풀이하세요'
    ],
    studyPath: '/surveying-geo/study/practical'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/surveying-geo" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
            <span className="mr-2">←</span> 측량및지형공간정보기사 홈으로
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">📝 시험 정보</h1>
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
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📖 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'practical'
                ? 'bg-emerald-500 text-white shadow-md'
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
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">시험 과목</p>
                  <p className="text-2xl font-bold text-emerald-600">5과목</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">문항 수</p>
                  <p className="text-2xl font-bold text-teal-600">과목당 20문항</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">시험 시간</p>
                  <p className="text-2xl font-bold text-emerald-600">150분</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">합격 기준</p>
                  <p className="text-2xl font-bold text-teal-600">평균 60점</p>
                </div>
              </div>
            </div>

            {writtenSubjects.map((subject) => (
              <div key={subject.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 p-4">
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
                        <span key={idx} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
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
                    className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
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
                <div className="bg-emerald-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">시험 시간</p>
                  <p className="text-xl font-bold text-emerald-600">{practicalInfo.examTime}</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">합격 기준</p>
                  <p className="text-xl font-bold text-teal-600">{practicalInfo.passingScore}</p>
                </div>
              </div>

              {practicalInfo.subjects.map((subject, idx) => (
                <div key={idx} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">{subject.name}</h4>
                    <span className="text-emerald-600 font-medium">{subject.weight}</span>
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
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href={practicalInfo.studyPath}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-lg hover:from-emerald-600 hover:to-teal-500 transition-all shadow-md"
                >
                  실기시험 학습하러 가기 →
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">⚠️ 실기시험 주의사항</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>계산 과정을 반드시 기재하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>단위를 정확히 표기하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>공학용 계산기 사용이 가능합니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>시간 배분에 유의하세요</span>
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
                className="p-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-center transition-colors"
              >
                <p className="font-medium text-emerald-700 text-sm">{subject.name}</p>
              </Link>
            ))}
            <Link
              href={practicalInfo.studyPath}
              className="p-3 bg-teal-50 hover:bg-teal-100 rounded-lg text-center transition-colors"
            >
              <p className="font-medium text-teal-700 text-sm">실기시험</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
