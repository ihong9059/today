'use client';

import Link from 'next/link';

export default function ComputerizedTax1Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <span className="text-rose-600 font-medium">전산세무 1급</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-rose-600 to-red-500 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-6">
                <div className="text-6xl">📑</div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">전산세무 1급</h1>
                  <p className="text-rose-100 mb-4">Computerized Tax Accounting Level 1</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">난이도: ★★★★☆</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">연간 약 8만명 응시</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">합격률: 약 25%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Info Cards */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-xs text-gray-500">필기시험</div>
                <div className="font-bold text-rose-600">40문항/60분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-2">💻</div>
                <div className="text-xs text-gray-500">실기시험</div>
                <div className="font-bold text-red-600">실무/90분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-xs text-gray-500">응시료</div>
                <div className="font-bold">35,000원</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-2">🏛️</div>
                <div className="text-xs text-gray-500">주관기관</div>
                <div className="font-bold text-sm">한국세무사회</div>
              </div>
            </section>

            {/* Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-rose-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">전산세무 1급이란?</h3>
                  <p className="leading-relaxed">
                    전산세무 1급은 한국세무사회에서 주관하는 세무회계 최상위 자격증으로,
                    법인세, 소득세, 부가가치세 등 세무신고 실무와 재무회계, 원가회계 전반을 다룹니다.
                    세무사 사무실, 기업 세무팀 취업에 강력한 경쟁력을 갖출 수 있습니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">주요 업무 영역</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {['법인세 세무조정', '종합소득세 신고', '부가가치세 신고', '원천징수 실무', '결산 및 재무제표', '세무조정계산서'].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">취업 분야</h3>
                  <div className="flex flex-wrap gap-2">
                    {['세무법인', '회계법인', '기업 세무팀', '세무사 사무실', '공공기관', '금융기관'].map((field, idx) => (
                      <span key={idx} className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-sm">{field}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Exam Subjects - Theory */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-rose-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-4">
                {[
                  { name: '재무회계', questions: '10문항', difficulty: '★★★☆☆', color: 'rose',
                    topics: ['재무제표 분석', '유형자산', '금융자산', '충당부채', '자본변동'],
                    tip: '전산회계 1급 수준에서 심화된 내용입니다. K-IFRS 기준 숙지 필요.' },
                  { name: '원가회계', questions: '5문항', difficulty: '★★★★☆', color: 'orange',
                    topics: ['원가계산', '표준원가', 'CVP분석', '예산관리', '성과평가'],
                    tip: '계산문제가 많으므로 공식 암기와 빠른 계산 연습이 필수입니다.' },
                  { name: '법인세', questions: '10문항', difficulty: '★★★★★', color: 'red',
                    topics: ['익금/손금', '세무조정', '감가상각', '접대비', '기부금'],
                    tip: '세무조정이 핵심입니다. 손금불산입/익금산입 유형을 반드시 암기하세요.' },
                  { name: '소득세', questions: '10문항', difficulty: '★★★★☆', color: 'pink',
                    topics: ['종합소득', '근로소득', '사업소득', '소득공제', '세액공제'],
                    tip: '소득 구분과 공제항목을 정확히 이해해야 합니다. 연말정산 실무 중요.' },
                  { name: '부가가치세', questions: '5문항', difficulty: '★★★☆☆', color: 'purple',
                    topics: ['과세표준', '매입세액', '간이과세', '수정신고', '가산세'],
                    tip: '전산회계에서 배운 내용의 심화입니다. 특수거래 처리가 추가됩니다.' }
                ].map((subject, idx) => (
                  <div key={idx} className={`border-l-4 border-${subject.color}-500 bg-${subject.color}-50 rounded-r-lg p-4`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{subject.name}</h3>
                      <div className="flex gap-2 text-xs">
                        <span className="bg-white px-2 py-1 rounded">{subject.questions}</span>
                        <span className="bg-white px-2 py-1 rounded">{subject.difficulty}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {subject.topics.map((topic, tidx) => (
                        <span key={tidx} className="text-xs bg-white/70 px-2 py-0.5 rounded">{topic}</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">💡 {subject.tip}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Practical Exam */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-red-500">💻</span> 실기시험 구성
              </h2>
              <div className="space-y-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-bold mb-3">케이렙(KcLep) 프로그램 실습</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { area: '재무회계', weight: '15%', items: ['전표입력', '결산정리', '재무제표'] },
                      { area: '부가가치세', weight: '25%', items: ['세금계산서', '신고서작성', '가산세계산'] },
                      { area: '원천징수', weight: '20%', items: ['급여대장', '원천세신고', '연말정산'] },
                      { area: '법인세', weight: '25%', items: ['세무조정', '법인세신고서', '부속서류'] },
                      { area: '소득세', weight: '15%', items: ['종합소득세', '사업소득', '신고서작성'] }
                    ].map((area, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{area.area}</span>
                          <span className="text-red-600 font-bold">{area.weight}</span>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {area.items.map((item, iidx) => (
                            <li key={iidx}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-800 mb-2">⚠️ 실기시험 핵심 포인트</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 90분 안에 모든 과제 완료 필수 - 시간 관리 중요</li>
                    <li>• 법인세 세무조정이 가장 어렵고 배점 높음</li>
                    <li>• 원천징수/연말정산은 실무에서 많이 쓰이므로 확실히 익히기</li>
                    <li>• 신고서 출력 전 검토하는 습관 필수</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Study Order */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-rose-500">📖</span> 추천 학습 순서
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-rose-600 mb-3">🔰 전산회계 1급 합격자</h3>
                  <div className="flex flex-wrap gap-2 items-center">
                    {['재무회계 심화', '→', '원가회계', '→', '부가세 심화', '→', '소득세', '→', '법인세', '→', '실기 집중'].map((step, idx) => (
                      <span key={idx} className={step === '→' ? 'text-gray-400' : 'px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm'}>{step}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">전산회계 기반 위에 세무 과목을 쌓아가세요. 법인세가 가장 어려우므로 마지막에!</p>
                </div>
                <div>
                  <h3 className="font-semibold text-red-600 mb-3">📈 세무 경력자</h3>
                  <div className="flex flex-wrap gap-2 items-center">
                    {['이론 정리', '→', '케이렙 실습', '→', '세무신고서 작성', '→', '기출문제'].map((step, idx) => (
                      <span key={idx} className={step === '→' ? 'text-gray-400' : 'px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm'}>{step}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">실무 경험이 있다면 이론 정리 후 프로그램 적응에 집중하세요!</p>
                </div>
              </div>
            </section>

            {/* AI Helper */}
            <section className="bg-gradient-to-r from-rose-500 to-red-500 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="mb-4 text-rose-100">전산세무 1급 학습 중 궁금한 점을 AI에게 물어보세요!</p>
              <div className="grid gap-3">
                {[
                  '법인세 세무조정에서 손금불산입 항목을 정리해주세요',
                  '종합소득세 소득공제와 세액공제의 차이를 설명해주세요',
                  '원천징수 실무에서 자주 실수하는 부분을 알려주세요'
                ].map((q, idx) => (
                  <a key={idx} href={`https://claude.ai/new?q=${encodeURIComponent(`전산세무 1급 학습 질문입니다.\n\n${q}\n\n실무 관점에서 이해하기 쉽게 설명해주세요.`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-3 transition">
                    <span className="text-xl">💬</span>
                    <span className="text-sm">{q}</span>
                  </a>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-bold mb-4">⚡ 바로가기</h3>
              <div className="space-y-2">
                <Link href="/category/accounting/computerized-tax-1/exam"
                  className="flex items-center justify-between p-3 bg-rose-50 hover:bg-rose-100 rounded-lg transition">
                  <span className="font-medium text-rose-700">📋 시험 상세 정보</span>
                  <span className="text-rose-400">→</span>
                </Link>
                <Link href="/category/accounting/computerized-tax-1/study/financial-accounting"
                  className="flex items-center justify-between p-3 bg-red-50 hover:bg-red-100 rounded-lg transition">
                  <span className="font-medium text-red-700">📚 학습 시작하기</span>
                  <span className="text-red-400">→</span>
                </Link>
              </div>
            </div>

            {/* 2026 Schedule */}
            <div className="bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-bold mb-4">📅 2026년 시험 일정</h3>
              <div className="space-y-3 text-sm">
                {[
                  { round: '제119회', apply: '01.02~01.08', exam: '02.08', result: '02.27' },
                  { round: '제120회', apply: '02.27~03.05', exam: '04.05', result: '04.24' },
                  { round: '제121회', apply: '04.24~04.30', exam: '05.31', result: '06.19' },
                  { round: '제122회', apply: '06.19~06.25', exam: '07.26', result: '08.14' },
                  { round: '제123회', apply: '08.14~08.20', exam: '09.20', result: '10.08' },
                  { round: '제124회', apply: '10.08~10.14', exam: '11.15', result: '12.04' }
                ].map((schedule, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span className="font-medium text-rose-600">{schedule.round}</span>
                    <span className="text-gray-600">{schedule.exam}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">* 한국세무사회 공식 일정 기준</p>
            </div>

            {/* Subject Goals */}
            <div className="bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-bold mb-4">🎯 과목별 목표 점수</h3>
              <div className="space-y-4">
                {[
                  { name: '재무회계', target: 80, color: 'rose' },
                  { name: '원가회계', target: 70, color: 'orange' },
                  { name: '법인세', target: 70, color: 'red' },
                  { name: '소득세', target: 75, color: 'pink' },
                  { name: '부가가치세', target: 80, color: 'purple' },
                  { name: '실기', target: 70, color: 'rose' }
                ].map((subject, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{subject.name}</span>
                      <span className="font-medium">{subject.target}점</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-${subject.color}-500 rounded-full`} style={{ width: `${subject.target}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">* 평균 70점 이상 합격</p>
            </div>

            {/* Study Pages */}
            <div className="bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-bold mb-4">📖 학습 페이지</h3>
              <div className="space-y-2">
                {[
                  { name: '재무회계', path: 'financial-accounting', questions: 50 },
                  { name: '원가회계', path: 'cost-accounting', questions: 50 },
                  { name: '법인세', path: 'corporate-tax', questions: 50 },
                  { name: '소득세', path: 'income-tax', questions: 50 },
                  { name: '부가가치세', path: 'vat', questions: 50 },
                  { name: '실무연습', path: 'practical', questions: 25 }
                ].map((study, idx) => (
                  <Link key={idx} href={`/category/accounting/computerized-tax-1/study/${study.path}`}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                    <span>{study.name}</span>
                    <span className="text-sm text-gray-500">{study.questions}문항</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Certs */}
            <div className="bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-bold mb-4">🔗 연계 자격증</h3>
              <div className="space-y-2">
                {[
                  { name: '전산세무 2급', desc: '기초 단계', path: '/category/accounting/computerized-tax-2' },
                  { name: '전산회계 1급', desc: '회계 기초', path: '/category/accounting/computerized-accounting-1' },
                  { name: 'TAT 1급', desc: '동급 자격', path: '/category/accounting/tat-1' },
                  { name: '세무사', desc: '최상위 자격', path: '/category/accounting/tax-accountant' }
                ].map((cert, idx) => (
                  <Link key={idx} href={cert.path}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition">
                    <span className="font-medium">{cert.name}</span>
                    <span className="text-xs text-gray-500">{cert.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-bold mb-4">📚 추천 교재</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500">•</span>
                  <span>이기적 전산세무 1급 (영진닷컴)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500">•</span>
                  <span>에듀윌 전산세무 1급 (에듀윌)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500">•</span>
                  <span>해커스 전산세무 1급 (해커스)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-sm">
            본 사이트는 학습 참고용이며, 정확한 시험 정보는
            <a href="https://license.kacpta.or.kr" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline ml-1">한국세무사회 자격시험</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
