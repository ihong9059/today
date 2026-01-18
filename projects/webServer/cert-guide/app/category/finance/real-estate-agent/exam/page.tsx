'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RealEstateAgentExamPage() {
  const [activeTab, setActiveTab] = useState<'first' | 'second'>('first');

  const firstExamSubjects = [
    {
      name: '부동산학개론',
      questions: 40,
      time: '50분',
      difficulty: '중상',
      passRate: '35%',
      topics: ['부동산의 개념과 특성', '부동산 경제론', '부동산 시장분석', '부동산 투자론', '부동산 금융론', '부동산 정책론', '부동산 가격론', '감정평가 기초']
    },
    {
      name: '민법 및 민사특별법',
      questions: 40,
      time: '50분',
      difficulty: '상',
      passRate: '30%',
      topics: ['민법총칙', '물권법', '물권변동', '담보물권', '채권법', '계약법', '주택임대차보호법', '상가건물임대차보호법']
    }
  ];

  const secondExamSubjects = [
    {
      name: '공인중개사법령 및 중개실무',
      questions: 40,
      time: '40분',
      difficulty: '중',
      passRate: '40%',
      topics: ['공인중개사법', '중개업 개설등록', '중개행위 및 금지행위', '중개보수', '손해배상책임', '부동산거래신고법', '중개실무', '계약서 작성']
    },
    {
      name: '부동산공법',
      questions: 30,
      time: '30분',
      difficulty: '상',
      passRate: '28%',
      topics: ['국토의 계획 및 이용에 관한 법률', '도시개발법', '도시 및 주거환경정비법', '건축법', '주택법', '농지법', '산지관리법', '개발행위허가']
    },
    {
      name: '부동산공시법 및 세법',
      questions: 30,
      time: '30분',
      difficulty: '중상',
      passRate: '32%',
      topics: ['부동산등기법', '공간정보관리법(지적법)', '부동산실명법', '취득세', '재산세', '양도소득세', '종합부동산세', '등록면허세']
    }
  ];

  const strategies = {
    first: [
      { title: '민법 기초 확립', desc: '물권법과 채권법의 기본 개념을 탄탄히 다지기' },
      { title: '부동산학개론 암기', desc: '공식과 이론을 체계적으로 암기' },
      { title: '판례 학습', desc: '자주 출제되는 대법원 판례 정리' },
      { title: '기출문제 반복', desc: '최근 10년 기출문제 완벽 분석' }
    ],
    second: [
      { title: '법령 조문 숙지', desc: '공인중개사법, 국토계획법 조문 암기' },
      { title: '공법 체계 이해', desc: '각 법률의 적용 관계와 예외 규정 파악' },
      { title: '세법 계산 연습', desc: '취득세, 양도세 계산 문제 반복' },
      { title: '개정법령 확인', desc: '최신 개정 사항 반드시 체크' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance" className="text-gray-500 hover:text-gray-700">금융</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance/real-estate-agent" className="text-gray-500 hover:text-gray-700">공인중개사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">공인중개사 시험 상세</h1>
          <p className="text-gray-600">1차 시험과 2차 시험의 상세 정보를 확인하세요</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button onClick={() => setActiveTab('first')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'first' ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
            📗 1차 시험
          </button>
          <button onClick={() => setActiveTab('second')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'second' ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
            📘 2차 시험
          </button>
        </div>

        {/* First Exam Tab */}
        {activeTab === 'first' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">📋</span> 1차 시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">2과목</div>
                  <div className="text-sm text-gray-600">시험과목</div>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">80문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">100분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">60점</div>
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
                <span className="text-teal-500">📚</span> 과목별 상세
              </h2>
              {firstExamSubjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{idx + 1}과목. {subject.name}</h3>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <span>{subject.questions}문항</span>
                        <span>{subject.time}</span>
                        <span>난이도: {subject.difficulty}</span>
                        <span>합격률: {subject.passRate}</span>
                      </div>
                    </div>
                    <Link href={`/category/finance/real-estate-agent/study/${subject.name === '부동산학개론' ? 'real-estate-intro' : 'civil-law'}`}
                      className="px-4 py-2 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 transition text-sm font-medium">
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

            {/* First Exam Strategy */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">🎯</span> 1차 시험 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {strategies.first.map((s, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-teal-50 rounded-xl">
                    <span className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                    <div>
                      <h3 className="font-bold text-teal-700">{s.title}</h3>
                      <p className="text-sm text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Second Exam Tab */}
        {activeTab === 'second' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📋</span> 2차 시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">3과목</div>
                  <div className="text-sm text-gray-600">시험과목</div>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">100문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">100분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">60점</div>
                  <div className="text-sm text-gray-600">합격기준(평균)</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-xl">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ 합격 기준:</strong> 각 과목 40점 이상 + 전 과목 평균 60점 이상 (1차 합격자에 한함)
                </p>
              </div>
            </section>

            {/* Subject Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-cyan-500">📚</span> 과목별 상세
              </h2>
              {secondExamSubjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{idx + 1}과목. {subject.name}</h3>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <span>{subject.questions}문항</span>
                        <span>{subject.time}</span>
                        <span>난이도: {subject.difficulty}</span>
                        <span>합격률: {subject.passRate}</span>
                      </div>
                    </div>
                    <Link href={`/category/finance/real-estate-agent/study/${idx === 0 ? 'broker-law' : idx === 1 ? 'public-law' : 'registration-tax'}`}
                      className="px-4 py-2 bg-cyan-100 text-cyan-600 rounded-lg hover:bg-cyan-200 transition text-sm font-medium">
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

            {/* Frequency */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📈</span> 출제 경향
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="font-medium">매회 출제</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['중개보수', '손해배상', '용도지역', '건축허가', '취득세', '등기'].map((item, idx) => (
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
                    {['개발행위허가', '양도소득세', '재산세', '지목변경', '분양권전매'].map((item, idx) => (
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
                    {['농지취득자격', '산지전용', '종합부동산세', '신탁등기'].map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Second Exam Strategy */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">🎯</span> 2차 시험 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {strategies.second.map((s, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-cyan-50 rounded-xl">
                    <span className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                    <div>
                      <h3 className="font-bold text-cyan-700">{s.title}</h3>
                      <p className="text-sm text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/category/finance/real-estate-agent/study/practical"
                className="inline-block mt-6 px-6 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition">
                실전 연습하기 →
              </Link>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. 공인중개사 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
