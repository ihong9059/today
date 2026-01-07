'use client';

import Link from 'next/link';

export default function ComputerizedAccounting2Page() {
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
            <span className="text-teal-600 font-medium">전산회계 2급</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-teal-600 to-cyan-500 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-6">
                <div className="text-6xl">📒</div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">전산회계 2급</h1>
                  <p className="text-teal-100 mb-4">Computerized Accounting Level 2</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">난이도: ★★☆☆☆</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">연간 약 20만명 응시</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">합격률: 약 45%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Info Cards */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-xs text-gray-500">필기시험</div>
                <div className="font-bold text-teal-600">20문항/30분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-2">💻</div>
                <div className="text-xs text-gray-500">실기시험</div>
                <div className="font-bold text-cyan-600">실무/60분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-xs text-gray-500">응시료</div>
                <div className="font-bold">25,000원</div>
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
                <span className="text-teal-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">전산회계 2급이란?</h3>
                  <p className="leading-relaxed">
                    전산회계 2급은 회계 입문자를 위한 기초 자격증으로, 한국세무사회에서 주관합니다.
                    회계의 기본 원리와 케이렙(KcLep) 프로그램을 활용한 기초 전표 입력 능력을 검증합니다.
                    회계 공부의 첫 발걸음으로 추천되는 자격증입니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">주요 학습 내용</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {['회계의 기본 개념', '계정과목의 이해', '분개와 전기', '전표 작성법', '장부 기장 원리', '기초 재무제표'].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">취득 후 진로</h3>
                  <div className="flex flex-wrap gap-2">
                    {['전산회계 1급 도전', '전산세무 2급 도전', '사무보조', '경리 사무원', 'FAT 2급 병행'].map((field, idx) => (
                      <span key={idx} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">{field}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Exam Subjects - Theory */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-teal-500 bg-teal-50 rounded-r-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">회계원리 기초</h3>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-white px-2 py-1 rounded">20문항</span>
                      <span className="bg-white px-2 py-1 rounded">★★☆☆☆</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-teal-700 mb-2">출제 범위</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 회계의 기본개념과 목적</li>
                        <li>• 재무상태표와 손익계산서 구조</li>
                        <li>• 계정과목의 분류와 성격</li>
                        <li>• 거래의 8요소와 분개</li>
                        <li>• 전표의 종류와 작성법</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-teal-700 mb-2">핵심 포인트</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✓ 차변/대변 구분 완벽 숙지</li>
                        <li>✓ 계정과목별 성격 암기</li>
                        <li>✓ 기본 분개 유형 반복 연습</li>
                        <li>✓ 전표 종류별 특징 이해</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">💡 Tip: 분개가 가장 중요합니다. 차변/대변 구분 원리를 확실히 익히세요!</p>
                </div>
              </div>
            </section>

            {/* Practical Exam */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">💻</span> 실기시험 구성
              </h2>
              <div className="space-y-4">
                <div className="bg-cyan-50 rounded-lg p-4">
                  <h3 className="font-bold mb-3">케이렙(KcLep) 프로그램 실습</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { area: '기초정보관리', weight: '15%', items: ['거래처등록', '계정과목확인', '기초잔액'] },
                      { area: '일반전표입력', weight: '40%', items: ['입금전표', '출금전표', '대체전표'] },
                      { area: '매입매출전표', weight: '25%', items: ['세금계산서', '매입/매출처리'] },
                      { area: '장부조회', weight: '20%', items: ['거래처원장', '총계정원장', '일계표'] }
                    ].map((area, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{area.area}</span>
                          <span className="text-cyan-600 font-bold">{area.weight}</span>
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
                    <li>• 케이렙 프로그램 메뉴 위치 익히기</li>
                    <li>• 전표 종류에 따른 입력 방법 숙지</li>
                    <li>• 거래처 코드 검색 방법 (F2키)</li>
                    <li>• 차변/대변 금액 일치 확인 습관화</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Study Order */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">📖</span> 추천 학습 순서
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-teal-600 mb-3">🔰 완전 초보자 (회계 처음)</h3>
                  <div className="flex flex-wrap gap-2 items-center">
                    {['회계란 무엇인가', '→', '계정과목 암기', '→', '분개 연습', '→', '케이렙 익히기', '→', '기출문제'].map((step, idx) => (
                      <span key={idx} className={step === '→' ? 'text-gray-400' : 'px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm'}>{step}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">회계의 기본 개념부터 차근차근! 분개가 핵심입니다.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-cyan-600 mb-3">📈 경리/사무 경험자</h3>
                  <div className="flex flex-wrap gap-2 items-center">
                    {['이론 정리', '→', '케이렙 실습', '→', '기출문제 풀이'].map((step, idx) => (
                      <span key={idx} className={step === '→' ? 'text-gray-400' : 'px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm'}>{step}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">실무 경험이 있다면 프로그램 적응이 빠릅니다!</p>
                </div>
              </div>
            </section>

            {/* AI Helper */}
            <section className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="mb-4 text-teal-100">전산회계 2급 학습 중 궁금한 점을 AI에게 물어보세요!</p>
              <div className="grid gap-3">
                {[
                  '회계에서 차변과 대변은 무엇이고 어떻게 구분하나요?',
                  '자산, 부채, 자본, 수익, 비용의 계정과목 예시를 알려주세요',
                  '현금 매출과 외상 매출의 분개 방법을 알려주세요'
                ].map((q, idx) => (
                  <a key={idx} href={`https://claude.ai/new?q=${encodeURIComponent(`전산회계 2급 학습 질문입니다.\n\n${q}\n\n회계 초보자도 이해할 수 있도록 쉽게 설명해주세요.`)}`}
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
                <Link href="/category/accounting/computerized-accounting-2/exam"
                  className="flex items-center justify-between p-3 bg-teal-50 hover:bg-teal-100 rounded-lg transition">
                  <span className="font-medium text-teal-700">📋 시험 상세 정보</span>
                  <span className="text-teal-400">→</span>
                </Link>
                <Link href="/category/accounting/computerized-accounting-2/study/accounting-basics"
                  className="flex items-center justify-between p-3 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition">
                  <span className="font-medium text-cyan-700">📚 학습 시작하기</span>
                  <span className="text-cyan-400">→</span>
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
                    <span className="font-medium text-teal-600">{schedule.round}</span>
                    <span className="text-gray-600">{schedule.exam}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">* 한국세무사회 공식 일정 기준</p>
            </div>

            {/* Pass Requirements */}
            <div className="bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-bold mb-4">🎯 합격 기준</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>필기시험</span>
                    <span className="font-medium">70점 이상</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>실기시험</span>
                    <span className="font-medium">70점 이상</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">* 필기·실기 각각 70점 이상 합격</p>
            </div>

            {/* Study Pages */}
            <div className="bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-bold mb-4">📖 학습 페이지</h3>
              <div className="space-y-2">
                {[
                  { name: '회계기초', path: 'accounting-basics', questions: 50 },
                  { name: '실무연습', path: 'practical', questions: 25 }
                ].map((study, idx) => (
                  <Link key={idx} href={`/category/accounting/computerized-accounting-2/study/${study.path}`}
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
                  { name: '전산회계 1급', desc: '다음 단계', path: '/category/accounting/computerized-accounting-1' },
                  { name: '전산세무 2급', desc: '세무 입문', path: '/category/accounting/computerized-tax-2' },
                  { name: 'FAT 2급', desc: '동급 자격', path: '/category/accounting/fat-2' }
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
                  <span className="text-teal-500">•</span>
                  <span>이기적 전산회계 2급 (영진닷컴)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">•</span>
                  <span>에듀윌 전산회계 2급 (에듀윌)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">•</span>
                  <span>시나공 전산회계 2급 (길벗)</span>
                </li>
              </ul>
            </div>

            {/* Beginner Tips */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-5 text-white">
              <h3 className="font-bold mb-3">💡 초보자 팁</h3>
              <ul className="text-sm space-y-2 text-teal-100">
                <li>• 회계 용어가 낯설어도 포기하지 마세요</li>
                <li>• 분개 10개만 완벽히 익히면 됩니다</li>
                <li>• 케이렙은 반복이 답입니다</li>
                <li>• 2주 집중이면 충분히 합격 가능!</li>
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
            <a href="https://license.kacpta.or.kr" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline ml-1">한국세무사회 자격시험</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
