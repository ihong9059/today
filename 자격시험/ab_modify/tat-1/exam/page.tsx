'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TAT1ExamPage() {
  const [activeTab, setActiveTab] = useState<'theory' | 'practical'>('theory');

  const theorySubjects = [
    {
      name: '재무회계',
      questions: 10,
      difficulty: '중상',
      passRate: '45%',
      topics: ['재무제표 작성', '유동자산 회계처리', '비유동자산 감가상각', '부채와 자본', '수익·비용 인식', '결산 및 재무제표 분석', '연결재무제표 기초', '현금흐름표']
    },
    {
      name: '원가관리회계',
      questions: 10,
      difficulty: '상',
      passRate: '40%',
      topics: ['원가의 개념과 분류', '개별원가계산', '종합원가계산', '활동기준원가계산', '표준원가계산', 'CVP 분석', '예산관리', '성과평가']
    },
    {
      name: '세무회계',
      questions: 10,
      difficulty: '상',
      passRate: '38%',
      topics: ['부가가치세법', '소득세법 기초', '원천징수 실무', '연말정산', '법인세 기초', '세금계산서', '가산세', '조세특례제한법']
    }
  ];

  const practicalAreas = [
    { name: '부가가치세 신고', weight: 40, items: ['매입매출전표 입력', '세금계산서 작성', '부가세 신고서 작성', '수정세금계산서'] },
    { name: '원천징수/연말정산', weight: 30, items: ['급여자료 입력', '원천징수이행상황신고서', '연말정산 자료입력', '원천징수영수증'] },
    { name: '소득세/법인세', weight: 30, items: ['결산정리분개', '세무조정계산서', '소득금액조정합계표', '법인세 신고서'] }
  ];

  const strategies = {
    theory: [
      { title: '세무회계 집중', desc: '출제 비중이 높고 실무와 연계되는 세무회계부터 학습' },
      { title: '재무회계 기본기', desc: 'FAT 수준의 재무회계 기초를 탄탄히 다진 후 심화' },
      { title: '원가회계 공식 암기', desc: '원가계산 공식과 CVP 분석 공식을 반드시 암기' },
      { title: '최신 세법 반영', desc: '매년 바뀌는 세법 개정사항 확인 필수' }
    ],
    practical: [
      { title: '더존 Smart A 숙달', desc: '프로그램 단축키와 메뉴 구조를 완벽히 익히기' },
      { title: '부가세 신고 반복', desc: '가장 높은 비중의 부가세 신고를 반복 연습' },
      { title: '실제 데이터 연습', desc: '기출문제의 실제 거래 데이터로 입력 연습' },
      { title: '시간 배분 전략', desc: '90분 내 모든 작업 완료를 위한 시간 관리' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/tat-1" className="text-gray-500 hover:text-gray-700">TAT 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-rose-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">TAT 1급 시험 상세</h1>
          <p className="text-gray-600">이론시험과 실무시험의 상세 정보를 확인하세요</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button onClick={() => setActiveTab('theory')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'theory' ? 'bg-rose-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
            📖 이론시험
          </button>
          <button onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'practical' ? 'bg-rose-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
            💻 실무시험
          </button>
        </div>

        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-rose-500">📋</span> 이론시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-rose-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-rose-600">3과목</div>
                  <div className="text-sm text-gray-600">시험과목</div>
                </div>
                <div className="bg-rose-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-rose-600">30문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="bg-rose-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-rose-600">30분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-rose-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-rose-600">70점</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
              </div>
            </section>

            {/* Subject Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-rose-500">📚</span> 과목별 상세
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
                    <Link href={`/category/accounting/tat-1/study/${subject.name === '재무회계' ? 'financial-accounting' : subject.name === '원가관리회계' ? 'cost-accounting' : 'tax-accounting'}`}
                      className="px-4 py-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition text-sm font-medium">
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
                <span className="text-rose-500">🎯</span> 이론시험 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {strategies.theory.map((s, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-rose-50 rounded-xl">
                    <span className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                    <div>
                      <h3 className="font-bold text-rose-700">{s.title}</h3>
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
                <span className="text-rose-500">💻</span> 실무시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600">더존</div>
                  <div className="text-sm text-gray-600">Smart A</div>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600">90분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600">70점</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600">세무</div>
                  <div className="text-sm text-gray-600">출제범위</div>
                </div>
              </div>
            </section>

            {/* Area Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-rose-500">📊</span> 영역별 상세
              </h2>
              {practicalAreas.map((area, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                        {area.weight}%
                      </span>
                      <h3 className="text-lg font-bold">{area.name}</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {area.items.map((item, iidx) => (
                      <div key={iidx} className="bg-gray-50 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
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
                <span className="text-rose-500">📈</span> 출제 경향
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="font-medium">매회 출제</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['부가세 신고서', '매입매출전표', '원천징수이행상황신고서', '급여자료입력'].map((item, idx) => (
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
                    {['연말정산', '세금계산서 발행', '결산정리분개', '세무조정'].map((item, idx) => (
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
                    {['수정세금계산서', '가산세 계산', '법인세 신고서'].map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Practical Strategy */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-rose-500">🎯</span> 실무시험 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {strategies.practical.map((s, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-pink-50 rounded-xl">
                    <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                    <div>
                      <h3 className="font-bold text-pink-700">{s.title}</h3>
                      <p className="text-sm text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/category/accounting/tat-1/study/practical"
                className="inline-block mt-6 px-6 py-3 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition">
                실무 연습하기 →
              </Link>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. TAT 1급 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
