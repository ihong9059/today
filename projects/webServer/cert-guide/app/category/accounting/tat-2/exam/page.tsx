'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TAT2ExamPage() {
  const [activeTab, setActiveTab] = useState<'theory' | 'practical'>('theory');

  const theorySubjects = [
    {
      name: '회계원리',
      questions: 10,
      difficulty: '중',
      passRate: '55%',
      topics: ['회계의 기초개념', '재무제표의 구조', '자산의 회계처리', '부채와 자본', '수익과 비용', '결산 기초', '분개와 전기', '시산표 작성']
    },
    {
      name: '부가가치세',
      questions: 10,
      difficulty: '중',
      passRate: '50%',
      topics: ['부가가치세 개요', '과세대상과 면세', '세금계산서 기초', '매입세액공제', '부가세 신고 기초', '가산세 기초', '영세율', '간이과세자']
    }
  ];

  const practicalAreas = [
    { name: '매입매출전표 입력', weight: 50, items: ['매입전표 입력', '매출전표 입력', '카드매출 입력', '현금매출 입력'] },
    { name: '세금계산서 작성', weight: 25, items: ['세금계산서 발행', '세금계산서 수취', '전자세금계산서', '계산서 작성'] },
    { name: '부가세 신고서', weight: 25, items: ['부가세 신고서 작성', '매출·매입 집계', '납부세액 계산', '신고서 검토'] }
  ];

  const strategies = {
    theory: [
      { title: '회계 기초 확립', desc: '분개의 원리와 계정과목을 확실히 이해하기' },
      { title: '부가세 핵심 암기', desc: '과세/면세 구분, 세금계산서 발행 요건 숙지' },
      { title: '기출문제 반복', desc: '동일한 유형이 반복 출제되므로 기출 위주 학습' },
      { title: '계산 문제 연습', desc: '매입세액공제, 납부세액 계산 문제 집중 연습' }
    ],
    practical: [
      { title: '더존 Smart A 익숙해지기', desc: '프로그램 기본 메뉴와 단축키 익히기' },
      { title: '매입매출전표 집중', desc: '가장 큰 비중(50%)인 전표 입력 반복 연습' },
      { title: '거래 유형별 연습', desc: '카드, 현금, 외상 등 다양한 거래 유형 학습' },
      { title: '시간 관리', desc: '60분 내 모든 작업 완료를 위한 속도 연습' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/tat-2" className="text-gray-500 hover:text-gray-700">TAT 2급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-violet-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">TAT 2급 시험 상세</h1>
          <p className="text-gray-600">이론시험과 실무시험의 상세 정보를 확인하세요</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button onClick={() => setActiveTab('theory')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'theory' ? 'bg-violet-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
            📖 이론시험
          </button>
          <button onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'practical' ? 'bg-violet-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
            💻 실무시험
          </button>
        </div>

        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-violet-500">📋</span> 이론시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-violet-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-violet-600">2과목</div>
                  <div className="text-sm text-gray-600">시험과목</div>
                </div>
                <div className="bg-violet-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-violet-600">20문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="bg-violet-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-violet-600">20분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-violet-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-violet-600">70점</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
              </div>
            </section>

            {/* Subject Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-violet-500">📚</span> 과목별 상세
              </h2>
              {theorySubjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{idx + 1}. {subject.name}</h3>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <span>{subject.questions}문항</span>
                        <span>난이도: {subject.difficulty}</span>
                        <span>합격률: {subject.passRate}</span>
                      </div>
                    </div>
                    <Link href={`/category/accounting/tat-2/study/${subject.name === '회계원리' ? 'accounting-principles' : 'vat-basics'}`}
                      className="px-4 py-2 bg-violet-100 text-violet-600 rounded-lg hover:bg-violet-200 transition text-sm font-medium">
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

            {/* Theory Strategy */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-violet-500">🎯</span> 이론시험 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {strategies.theory.map((s, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-violet-50 rounded-xl">
                    <span className="w-8 h-8 bg-violet-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                    <div>
                      <h3 className="font-bold text-violet-700">{s.title}</h3>
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
                <span className="text-violet-500">💻</span> 실무시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">더존</div>
                  <div className="text-sm text-gray-600">Smart A</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">60분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">70점</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">부가세</div>
                  <div className="text-sm text-gray-600">출제범위</div>
                </div>
              </div>
            </section>

            {/* Area Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-violet-500">📊</span> 영역별 상세
              </h2>
              {practicalAreas.map((area, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                        {area.weight}%
                      </span>
                      <h3 className="text-lg font-bold">{area.name}</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {area.items.map((item, iidx) => (
                      <div key={iidx} className="bg-gray-50 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-violet-500 rounded-full"></span>
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
                <span className="text-violet-500">📈</span> 출제 경향
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="font-medium">매회 출제</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['매입전표 입력', '매출전표 입력', '세금계산서 발행'].map((item, idx) => (
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
                    {['부가세 신고서', '카드매출 입력', '현금영수증'].map((item, idx) => (
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
                    {['계산서 작성', '영세율 적용'].map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Practical Strategy */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-violet-500">🎯</span> 실무시험 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {strategies.practical.map((s, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-purple-50 rounded-xl">
                    <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                    <div>
                      <h3 className="font-bold text-purple-700">{s.title}</h3>
                      <p className="text-sm text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/category/accounting/tat-2/study/practical"
                className="inline-block mt-6 px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition">
                실무 연습하기 →
              </Link>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. TAT 2급 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
