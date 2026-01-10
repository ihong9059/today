'use client';

import Link from 'next/link';

export default function ComputerizedAccounting1Page() {
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
            <span className="text-indigo-600 font-medium">전산회계 1급</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-6">
                <div className="text-6xl">📊</div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">전산회계 1급</h1>
                  <p className="text-indigo-100 mb-4">Computerized Accounting Level 1</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">난이도: ★★★☆☆</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">연간 약 15만명 응시</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">합격률: 약 35%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Info Cards */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-xs text-gray-500">필기시험</div>
                <div className="font-bold text-indigo-600">30문항/40분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-2">💻</div>
                <div className="text-xs text-gray-500">실기시험</div>
                <div className="font-bold text-purple-600">실무/70분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-xs text-gray-500">응시료</div>
                <div className="font-bold">30,000원</div>
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
                <span className="text-indigo-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">전산회계 1급이란?</h3>
                  <p className="leading-relaxed">
                    전산회계 1급은 한국세무사회에서 주관하는 회계 실무 자격시험으로,
                    회계 프로그램(케이렙)을 활용한 전표입력, 결산, 재무제표 작성 능력을 검증합니다.
                    회계원리, 원가회계, 세무회계의 이론과 실무를 모두 평가합니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">주요 업무 영역</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {['전표 입력 및 관리', '결산 및 재무제표 작성', '원가계산 실무', '부가세 신고 보조', '급여 및 4대보험 처리', '세무조정 기초'].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">취업 분야</h3>
                  <div className="flex flex-wrap gap-2">
                    {['기업 회계팀', '세무법인', '회계법인', '공공기관', '금융기관', '개인사업장'].map((field, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">{field}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Exam Subjects - Theory */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-indigo-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-4">
                {[
                  { name: '회계원리', questions: '10문항', difficulty: '★★★☆☆', color: 'indigo',
                    topics: ['회계의 기본원리', '계정과목 분류', '분개와 전기', '결산 절차', '재무제표 작성'],
                    tip: '분개 연습이 가장 중요합니다. 계정과목별 성격을 완벽히 숙지하세요.' },
                  { name: '원가회계', questions: '10문항', difficulty: '★★★★☆', color: 'purple',
                    topics: ['원가의 개념', '요소별 원가계산', '부문별 원가계산', '제품별 원가계산', '표준원가'],
                    tip: '제조원가 흐름을 이해하고 각종 배부 계산을 반복 연습하세요.' },
                  { name: '세무회계', questions: '10문항', difficulty: '★★★☆☆', color: 'pink',
                    topics: ['부가가치세 개요', '과세거래', '세금계산서', '신고와 납부', '가산세'],
                    tip: '부가세 실무 중심으로 출제됩니다. 세금계산서 발급 시기가 중요합니다.' }
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
                <span className="text-purple-500">💻</span> 실기시험 구성
              </h2>
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold mb-3">케이렙(KcLep) 프로그램 실습</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { area: '기초정보관리', weight: '10%', items: ['거래처등록', '계정과목설정', '기초잔액입력'] },
                      { area: '거래자료입력', weight: '30%', items: ['일반전표입력', '매입매출전표', '고정자산등록'] },
                      { area: '부가가치세', weight: '30%', items: ['세금계산서', '신고서작성', '부속서류'] },
                      { area: '결산/재무제표', weight: '30%', items: ['결산자료입력', '장부조회', '재무제표출력'] }
                    ].map((area, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{area.area}</span>
                          <span className="text-purple-600 font-bold">{area.weight}</span>
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
                    <li>• 케이렙 프로그램 조작에 익숙해지는 것이 필수</li>
                    <li>• 전표입력 속도와 정확도 모두 중요</li>
                    <li>• 결산 과정의 흐름을 완벽히 이해해야 함</li>
                    <li>• 부가세 신고서 작성 실습을 충분히 해야 함</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Study Order */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-indigo-500">📖</span> 추천 학습 순서
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-indigo-600 mb-3">🔰 회계 초보자</h3>
                  <div className="flex flex-wrap gap-2 items-center">
                    {['회계원리 기초', '→', '분개 연습', '→', '세무회계', '→', '원가회계', '→', '케이렙 실습'].map((step, idx) => (
                      <span key={idx} className={step === '→' ? 'text-gray-400' : 'px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm'}>{step}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">기본 분개부터 탄탄히! 실기는 이론 완성 후 집중 연습</p>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-600 mb-3">📈 전산회계 2급 합격자</h3>
                  <div className="flex flex-wrap gap-2 items-center">
                    {['원가회계', '→', '세무회계 심화', '→', '케이렙 실습', '→', '기출문제 풀이'].map((step, idx) => (
                      <span key={idx} className={step === '→' ? 'text-gray-400' : 'px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm'}>{step}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">2급에서 다루지 않은 원가회계 집중! 부가세 실무 강화</p>
                </div>
              </div>
            </section>

            {/* AI Helper */}
            <section className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="mb-4 text-indigo-100">전산회계 1급 학습 중 궁금한 점을 AI에게 물어보세요!</p>
              <div className="grid gap-3">
                {[
                  '회계원리에서 분개할 때 차변과 대변을 구분하는 방법을 알려주세요',
                  '원가회계에서 제조간접비 배부 방법을 예시와 함께 설명해주세요',
                  '부가가치세 세금계산서 발급 시기와 가산세에 대해 정리해주세요'
                ].map((q, idx) => (
                  <a key={idx} href={`https://claude.ai/new?q=${encodeURIComponent(`전산회계 1급 학습 질문입니다.\n\n${q}\n\n쉽게 이해할 수 있도록 예시와 함께 설명해주세요.`)}`}
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
                <Link href="/category/accounting/computerized-accounting-1/exam"
                  className="flex items-center justify-between p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition">
                  <span className="font-medium text-indigo-700">📋 시험 상세 정보</span>
                  <span className="text-indigo-400">→</span>
                </Link>
                <Link href="/category/accounting/computerized-accounting-1/study/accounting-principle"
                  className="flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition">
                  <span className="font-medium text-purple-700">📚 학습 시작하기</span>
                  <span className="text-purple-400">→</span>
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
                    <span className="font-medium text-indigo-600">{schedule.round}</span>
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
                  { name: '회계원리', target: 80, color: 'indigo' },
                  { name: '원가회계', target: 70, color: 'purple' },
                  { name: '세무회계', target: 80, color: 'pink' },
                  { name: '실기', target: 70, color: 'indigo' }
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
              <p className="text-xs text-gray-500 mt-3">* 평균 70점 이상 합격 (과락 40점)</p>
            </div>

            {/* Study Pages */}
            <div className="bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-bold mb-4">📖 학습 페이지</h3>
              <div className="space-y-2">
                {[
                  { name: '회계원리', path: 'accounting-principle', questions: 50 },
                  { name: '원가회계', path: 'cost-accounting', questions: 50 },
                  { name: '세무회계', path: 'tax-accounting', questions: 50 },
                  { name: '실무연습', path: 'practical', questions: 25 }
                ].map((study, idx) => (
                  <Link key={idx} href={`/category/accounting/computerized-accounting-1/study/${study.path}`}
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
                  { name: '전산회계 2급', desc: '기초 단계', path: '/category/accounting/computerized-accounting-2' },
                  { name: '전산세무 2급', desc: '심화 단계', path: '/category/accounting/computerized-tax-2' },
                  { name: 'FAT 1급', desc: '동급 자격', path: '/category/accounting/fat-1' },
                  { name: 'TAT 2급', desc: '세무 특화', path: '/category/accounting/tat-2' }
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
                  <span className="text-indigo-500">•</span>
                  <span>이기적 전산회계 1급 (영진닷컴)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">•</span>
                  <span>에듀윌 전산회계 1급 (에듀윌)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">•</span>
                  <span>시나공 전산회계 1급 (길벗)</span>
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
            <a href="https://license.kacpta.or.kr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline ml-1">한국세무사회 자격시험</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
