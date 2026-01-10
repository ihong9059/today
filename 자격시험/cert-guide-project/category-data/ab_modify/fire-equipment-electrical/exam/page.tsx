'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FireEquipmentElectricalExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: '소방원론',
      questions: 25,
      difficulty: '중',
      passRate: '45%',
      topics: ['연소의 정의와 조건', '화재의 분류', '소화의 원리', '소화약제의 종류', '위험물의 분류', '소방시설 기초', '방화구획', '피난계획']
    },
    {
      name: '소방전기일반',
      questions: 25,
      difficulty: '중상',
      passRate: '35%',
      topics: ['직류회로', '교류회로', '전자기학', '전기기기', '전력설비', '시퀀스제어', '전기측정', '배선설계']
    },
    {
      name: '소방관계법규',
      questions: 25,
      difficulty: '중',
      passRate: '50%',
      topics: ['소방기본법', '화재예방법', '소방시설법', '위험물안전관리법', '소방시설공사업법', '다중이용업소법', '특정소방대상물', '소방안전관리']
    },
    {
      name: '소방전기시설의 구조 및 원리',
      questions: 25,
      difficulty: '상',
      passRate: '30%',
      topics: ['자동화재탐지설비', '비상경보설비', '비상방송설비', '유도등/유도표지', '비상조명등', '비상콘센트설비', '무선통신보조설비', '소화활동설비']
    }
  ];

  const practicalAreas = [
    { name: '자동화재탐지설비', weight: 35, items: ['감지기 설치기준', '수신기 회로설계', '배선 계산', '감지기 결선도'] },
    { name: '비상경보/방송설비', weight: 25, items: ['스피커 배치', '음향장치 계산', '비상방송설비 설계', '확성기 결선'] },
    { name: '유도등/피난설비', weight: 20, items: ['유도등 설치기준', '비상조명등 설계', '유도표지 배치', '피난계단 설비'] },
    { name: '소화활동설비', weight: 20, items: ['비상콘센트설비', '무선통신보조설비', '제연설비 전기', '소방전원 설계'] }
  ];

  const strategies = {
    written: [
      { title: '전기이론 기초 확립', desc: '전기회로, 전자기학 기본 개념 완벽 이해' },
      { title: '소방시설 구조 암기', desc: '각 설비의 구성요소와 작동원리 체계적 정리' },
      { title: '법규 조문 숙지', desc: '설치기준, 유지관리기준 등 핵심 조문 암기' },
      { title: '기출문제 분석', desc: '최근 5년 기출문제 패턴 파악 및 반복 학습' }
    ],
    practical: [
      { title: '설계도면 작성 연습', desc: '자동화재탐지설비 평면도, 결선도 작성 숙달' },
      { title: '용량계산 공식 암기', desc: '감지기 수량, 배선용량, 전압강하 계산' },
      { title: '설치기준 적용', desc: 'NFSC 기준에 따른 설비 배치 연습' },
      { title: '시간배분 전략', desc: '3시간 내 필답형+작업형 완료 연습' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/safety" className="text-gray-500 hover:text-gray-700">안전·소방</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/safety/fire-equipment-electrical" className="text-gray-500 hover:text-gray-700">소방설비기사(전기)</Link>
            <span className="text-gray-300">/</span>
            <span className="text-orange-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">소방설비기사(전기) 시험 상세</h1>
          <p className="text-gray-600">필기시험과 실기시험의 상세 정보를 확인하세요</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button onClick={() => setActiveTab('written')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'written' ? 'bg-orange-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
            📝 필기시험
          </button>
          <button onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'practical' ? 'bg-orange-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
            🔧 실기시험
          </button>
        </div>

        {/* Written Tab */}
        {activeTab === 'written' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">📋</span> 필기시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">4과목</div>
                  <div className="text-sm text-gray-600">시험과목</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">100문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">2시간 30분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">60점</div>
                  <div className="text-sm text-gray-600">합격기준(평균)</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-xl">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ 합격 기준:</strong> 각 과목 40점 이상 + 전 과목 평균 60점 이상
                </p>
              </div>
            </section>

            {/* Subject Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-orange-500">📚</span> 과목별 상세
              </h2>
              {writtenSubjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{idx + 1}과목. {subject.name}</h3>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <span>{subject.questions}문항</span>
                        <span>난이도: {subject.difficulty}</span>
                        <span>합격률: {subject.passRate}</span>
                      </div>
                    </div>
                    <Link href={`/category/safety/fire-equipment-electrical/study/${idx === 0 ? 'fire-theory' : idx === 1 ? 'electrical-basics' : idx === 2 ? 'fire-law' : 'electrical-equipment'}`}
                      className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition text-sm font-medium">
                      학습하기 →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {subject.topics.map((topic, tidx) => (
                      <div key={tidx} className="bg-gray-50 px-3 py-2 rounded-lg text-sm">
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Written Strategy */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">🎯</span> 필기시험 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {strategies.written.map((s, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-orange-50 rounded-xl">
                    <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                    <div>
                      <h3 className="font-bold text-orange-700">{s.title}</h3>
                      <p className="text-sm text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Practical Tab */}
        {activeTab === 'practical' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-red-500">🔧</span> 실기시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">복합형</div>
                  <div className="text-sm text-gray-600">필답형+작업형</div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">약 3시간</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">60점</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">22,600원</div>
                  <div className="text-sm text-gray-600">응시료</div>
                </div>
              </div>
            </section>

            {/* Area Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-red-500">📊</span> 영역별 상세
              </h2>
              {practicalAreas.map((area, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                        {area.weight}%
                      </span>
                      <h3 className="text-lg font-bold">{area.name}</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {area.items.map((item, iidx) => (
                      <div key={iidx} className="bg-gray-50 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Frequency */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-red-500">📈</span> 출제 경향
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="font-medium">매회 출제</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['감지기 설치기준', '수신기 결선도', '유도등 설치', '배선용량 계산'].map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">{item}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="font-medium">자주 출제</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['비상방송설비', '비상콘센트', '전압강하 계산', '감지기 회로'].map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">{item}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="font-medium">간헐 출제</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['무선통신보조설비', '제연설비 전기', '축전지 용량'].map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Practical Strategy */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-red-500">🎯</span> 실기시험 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {strategies.practical.map((s, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-red-50 rounded-xl">
                    <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                    <div>
                      <h3 className="font-bold text-red-700">{s.title}</h3>
                      <p className="text-sm text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/category/safety/fire-equipment-electrical/study/practical"
                className="inline-block mt-6 px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition">
                실기 연습하기 →
              </Link>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. 소방설비기사(전기) 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
