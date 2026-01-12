export default function ComputerSkills1Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/office" className="text-gray-600 hover:text-blue-600">사무·행정</a>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">컴퓨터활용능력 1급</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">💻</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">컴퓨터활용능력 1급</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
              </div>
              <p className="text-emerald-100 text-lg mb-4">Computer Literacy Level 1</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: ★★★★☆</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 50만명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 필기 40% / 실기 30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <a href="/category/office/computer-skills-1/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-emerald-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">필기</p>
            <p className="font-bold text-gray-800">3과목 60문항</p>
            <p className="text-xs text-gray-400">60분</p>
            <p className="text-xs text-emerald-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <a href="/category/office/computer-skills-1/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-emerald-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">✍️</span>
            <p className="text-gray-500 text-sm mt-2">실기</p>
            <p className="font-bold text-gray-800">엑셀 + 액세스</p>
            <p className="text-xs text-gray-400">90분 (각 45분)</p>
            <p className="text-xs text-emerald-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-gray-500 text-sm mt-2">응시료</p>
            <p className="font-bold text-gray-800">필기 19,000원</p>
            <p className="text-xs text-gray-400">실기 22,500원</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">🏢</span>
            <p className="text-gray-500 text-sm mt-2">주관</p>
            <p className="font-bold text-gray-800">대한상공회의소</p>
            <p className="text-xs text-gray-400">license.korcham.net</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                컴퓨터활용능력 1급은 스프레드시트(Excel)와 데이터베이스(Access) 프로그램의
                고급 활용 능력을 평가하는 국가기술자격입니다. 사무직 필수 자격증으로
                취업 시 가산점 및 승진 시 우대받는 대표적인 OA 자격증입니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 엑셀 함수/매크로 활용 데이터 분석</li>
                    <li>• 피벗 테이블, 차트 작성</li>
                    <li>• 액세스 데이터베이스 설계</li>
                    <li>• 쿼리, 폼, 보고서 작성</li>
                  </ul>
                </div>
                <div className="bg-teal-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">취업/활용 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 일반 기업 사무직 (필수)</li>
                    <li>• 공공기관, 공기업 가산점</li>
                    <li>• 금융권, 회계법인</li>
                    <li>• 데이터 분석 업무</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 필기시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-3">
                {[
                  { name: '컴퓨터 일반', difficulty: 3, tip: '운영체제, 네트워크, 하드웨어 기초', href: '/category/office/computer-skills-1/study/computer-general' },
                  { name: '스프레드시트 일반', difficulty: 4, tip: '엑셀 함수, 데이터 관리, 차트', href: '/category/office/computer-skills-1/study/spreadsheet' },
                  { name: '데이터베이스 일반', difficulty: 4, tip: 'DB 개념, SQL, 정규화', href: '/category/office/computer-skills-1/study/database' },
                ].map((subject, i) => (
                  <a key={i} href={subject.href} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{subject.name}</span>
                        <span className="text-xs text-gray-400">(20문항)</span>
                      </div>
                      <p className="text-sm text-gray-500">{subject.tip}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <span key={s} className={s <= subject.difficulty ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>💡 합격 기준:</strong> 과목당 40점 이상 + 전체 평균 60점 이상
                </p>
              </div>
            </section>

            {/* 실기시험 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">✍️</span> 실기시험 구성
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 border-2 border-emerald-200 rounded-xl bg-emerald-50/50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <h3 className="font-bold text-gray-800">스프레드시트 실무</h3>
                      <p className="text-sm text-gray-500">MS Excel / 45분</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 고급 함수 (VLOOKUP, INDEX, MATCH 등)</li>
                    <li>• 피벗 테이블 및 차트</li>
                    <li>• 매크로/VBA 기초</li>
                    <li>• 데이터 유효성 검사</li>
                  </ul>
                  <a href="/category/office/computer-skills-1/study/spreadsheet-practical" className="mt-3 block text-center text-emerald-600 text-sm font-medium hover:underline">
                    실기 학습하기 →
                  </a>
                </div>
                <div className="p-4 border-2 border-teal-200 rounded-xl bg-teal-50/50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🗄️</span>
                    <div>
                      <h3 className="font-bold text-gray-800">데이터베이스 실무</h3>
                      <p className="text-sm text-gray-500">MS Access / 45분</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 테이블 설계 및 관계 설정</li>
                    <li>• 쿼리 작성 (선택, 매개변수, 실행)</li>
                    <li>• 폼 디자인</li>
                    <li>• 보고서 작성</li>
                  </ul>
                  <a href="/category/office/computer-skills-1/study/database-practical" className="mt-3 block text-center text-teal-600 text-sm font-medium hover:underline">
                    실기 학습하기 →
                  </a>
                </div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-800">
                  <strong>⚠️ 실기 합격 기준:</strong> 100점 만점 70점 이상 (필기 60점보다 높음!)
                </p>
              </div>
            </section>

            {/* 공부 순서 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🎯</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-emerald-200 rounded-xl p-4">
                  <h3 className="font-bold text-emerald-600 mb-3">👨‍🎓 초보자 (2개월)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '컴퓨터 일반', period: '2주', note: '암기' },
                      { step: 2, name: '스프레드시트 일반', period: '2주', note: '함수 중요' },
                      { step: 3, name: '데이터베이스 일반', period: '2주', note: 'SQL 집중' },
                      { step: 4, name: '필기 기출문제', period: '1주', note: '3회독' },
                      { step: 5, name: '실기 집중 연습', period: '3주', note: '핵심!' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {item.step}
                        </div>
                        <span className="flex-1 text-sm">{item.name}</span>
                        <span className="text-xs text-gray-400">{item.period}</span>
                        {item.note && <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded">{item.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-2 border-teal-200 rounded-xl p-4">
                  <h3 className="font-bold text-teal-600 mb-3">💻 엑셀 경험자 (1개월)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '필기 전 과목 속성', period: '1주', note: '요약본' },
                      { step: 2, name: '필기 기출문제', period: '1주', note: '5회독' },
                      { step: 3, name: '실기 엑셀', period: '1주', note: '함수 연습' },
                      { step: 4, name: '실기 액세스', period: '1주', note: '쿼리 집중' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {item.step}
                        </div>
                        <span className="flex-1 text-sm">{item.name}</span>
                        <span className="text-xs text-gray-400">{item.period}</span>
                        {item.note && <span className="text-xs bg-teal-100 text-teal-600 px-2 py-0.5 rounded">{item.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-700 text-center">
                  <strong>📖 공부 비율:</strong> 필기 30% : 실기 70% → <strong>실기가 핵심! 실습 필수!</strong>
                </p>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-purple-100 mb-4">Claude AI에게 컴퓨터활용능력 관련 질문을 해보세요!</p>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">함수 질문</p>
                  <p className="text-white">&quot;VLOOKUP과 INDEX MATCH 차이점 설명해줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">실기 도움</p>
                  <p className="text-white">&quot;액세스 쿼리에서 매개변수 쿼리 만드는 방법 알려줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">개념 정리</p>
                  <p className="text-white">&quot;데이터베이스 정규화 1NF, 2NF, 3NF 쉽게 설명해줘&quot;</p>
                </div>
              </div>
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer"
                className="mt-4 block text-center bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
                AI에게 질문하기 →
              </a>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">

            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 bg-emerald-50 p-3 rounded-lg">
                  상시시험으로 연중 응시 가능! 원하는 날짜에 접수하세요.
                </p>
                {[
                  { type: '필기', desc: '매주 토/일 시행' },
                  { type: '실기', desc: '매주 토/일 시행' },
                ].map((item) => (
                  <div key={item.type} className="border-l-4 border-emerald-400 pl-3">
                    <p className="font-medium text-gray-800">{item.type}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
              <a href="https://license.korcham.net" target="_blank" rel="noopener noreferrer"
                className="mt-4 block text-center text-sm text-emerald-600 hover:underline">
                대한상공회의소에서 접수하기 →
              </a>
            </div>

            {/* 합격 전략 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '컴퓨터 일반', target: 75, color: 'bg-emerald-500' },
                  { name: '스프레드시트 일반', target: 70, color: 'bg-teal-500' },
                  { name: '데이터베이스 일반', target: 65, color: 'bg-cyan-500' },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="font-bold text-gray-800">{item.target}점</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{width: `${item.target}%`}}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">평균</p>
                <p className="text-2xl font-bold text-emerald-600">70점</p>
                <p className="text-xs text-gray-500">= 합격!</p>
              </div>
            </div>

            {/* 실기 핵심 TIP */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">💡</span> 실기 핵심 TIP
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="font-medium text-red-800">⚠️ 합격 기준 70점!</p>
                  <p className="text-red-700">필기보다 높으니 충분히 연습</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <p className="font-medium text-emerald-800">📊 엑셀 함수 암기</p>
                  <p className="text-emerald-700">VLOOKUP, SUMIF, COUNTIF 필수</p>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <p className="font-medium text-teal-800">🗄️ 액세스 쿼리</p>
                  <p className="text-teal-700">선택/매개변수/실행 쿼리 구분</p>
                </div>
              </div>
            </div>

            {/* 관련 자격증 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '컴퓨터활용능력 2급', desc: '입문 자격증', href: '/category/office/computer-skills-2' },
                  { name: '워드프로세서', desc: 'OA 기초', href: '/category/office/word-processor' },
                  { name: 'SQLD', desc: 'DB 전문 자격', href: '#' },
                  { name: 'MOS Master', desc: 'MS Office 국제자격', href: '#' },
                ].map((item) => (
                  <a key={item.name} href={item.href} className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📖</span> 추천 교재/인강
              </h3>
              <div className="space-y-3">
                <a href="https://www.ybmit.com" target="_blank" rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:border-emerald-400 transition">
                  <p className="font-medium text-gray-800">YBM IT</p>
                  <p className="text-xs text-gray-500">컴활 전문 인강</p>
                </a>
                <a href="https://www.eduwill.net" target="_blank" rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:border-emerald-400 transition">
                  <p className="font-medium text-gray-800">에듀윌</p>
                  <p className="text-xs text-gray-500">체계적 커리큘럼</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">
            본 페이지의 정보는 참고용이며, 정확한 정보는 대한상공회의소에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
