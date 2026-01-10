export default function ComputerOrganizationPage() {
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
            <a href="/category/it" className="text-gray-600 hover:text-blue-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">전자계산기조직응용기사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">🖥️</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">전자계산기조직응용기사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
              </div>
              <p className="text-blue-100 text-lg mb-4">Engineer Computer Organization Application</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: ★★★★☆</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 약 3천명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 필기 35% / 실기 40%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <a href="/category/it/computer-organization/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-cyan-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">필기</p>
            <p className="font-bold text-gray-800">4과목 80문항</p>
            <p className="text-xs text-gray-400">2시간</p>
            <p className="text-xs text-cyan-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <a href="/category/it/computer-organization/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-cyan-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">✍️</span>
            <p className="text-gray-500 text-sm mt-2">실기</p>
            <p className="font-bold text-gray-800">필답형</p>
            <p className="text-xs text-gray-400">3시간</p>
            <p className="text-xs text-cyan-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-gray-500 text-sm mt-2">응시료</p>
            <p className="font-bold text-gray-800">필기 19,400원</p>
            <p className="text-xs text-gray-400">실기 22,600원</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">🏢</span>
            <p className="text-gray-500 text-sm mt-2">주관</p>
            <p className="font-bold text-gray-800">한국산업인력공단</p>
            <p className="text-xs text-gray-400">Q-Net</p>
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
                <span className="text-cyan-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                전자계산기조직응용기사는 컴퓨터 하드웨어와 시스템 소프트웨어에 대한 전문 지식을 갖추고,
                컴퓨터 시스템의 설계, 개발, 운영 및 유지보수를 담당하는 기술인력을 양성하기 위한 국가기술자격입니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 컴퓨터 시스템 설계 및 개발</li>
                    <li>• 운영체제 및 시스템 소프트웨어 관리</li>
                    <li>• 네트워크 시스템 구축 및 운영</li>
                    <li>• 임베디드 시스템 개발</li>
                  </ul>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">취업 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 시스템 엔지니어 (삼성전자, LG전자 등)</li>
                    <li>• 임베디드 개발자</li>
                    <li>• 공기업 전산직 (한전, 코레일 등)</li>
                    <li>• 반도체/하드웨어 기업</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-3">
                {[
                  { name: '전자계산기구조', difficulty: 4, tip: 'CPU, 메모리, 명령어 체계' },
                  { name: '운영체제', difficulty: 4, tip: '프로세스, 메모리관리, 파일시스템' },
                  { name: '소프트웨어공학', difficulty: 3, tip: '개발방법론, 테스트, 품질관리' },
                  { name: '데이터통신', difficulty: 3, tip: 'OSI, TCP/IP, 네트워크' },
                ].map((subject, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-bold">
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
                  </div>
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
                <span className="text-cyan-500">✍️</span> 실기시험 구성
              </h2>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800">전자계산기응용 실무</span>
                  <span className="text-sm text-gray-500">(필답형 - 서술, 약술, 단답)</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: '컴퓨터구조 응용', ratio: '30%', desc: 'CPU 설계, 메모리 계층, 파이프라인' },
                  { name: '운영체제 응용', ratio: '25%', desc: '프로세스, 동기화, 스케줄링' },
                  { name: '시스템 분석/설계', ratio: '25%', desc: '시스템 구조, 인터페이스' },
                  { name: '데이터통신 응용', ratio: '20%', desc: '프로토콜, 네트워크 구성' },
                ].map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-cyan-600 font-bold">{item.ratio}</span>
                    </div>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  <strong>✅ 합격 기준:</strong> 100점 만점 60점 이상
                </p>
              </div>
            </section>

            {/* 공부 순서 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-cyan-500">🎯</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-blue-200 rounded-xl p-4">
                  <h3 className="font-bold text-blue-600 mb-3">👨‍🎓 비전공자 (4개월)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '전자계산기구조', period: '5주', note: '핵심!' },
                      { step: 2, name: '운영체제', period: '5주', note: '중요' },
                      { step: 3, name: '데이터통신', period: '3주', note: '' },
                      { step: 4, name: '소프트웨어공학', period: '2주', note: '암기' },
                      { step: 5, name: '기출문제 3회독', period: '2주', note: '마무리' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {item.step}
                        </div>
                        <span className="flex-1 text-sm">{item.name}</span>
                        <span className="text-xs text-gray-400">{item.period}</span>
                        {item.note && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">{item.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-2 border-green-200 rounded-xl p-4">
                  <h3 className="font-bold text-green-600 mb-3">👨‍💼 전공자 (2개월)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '전자계산기구조', period: '3주', note: '심화' },
                      { step: 2, name: '운영체제', period: '3주', note: '복습' },
                      { step: 3, name: '데이터통신 + 소공', period: '2주', note: '암기' },
                      { step: 4, name: '기출문제 3회독', period: '1주', note: '마무리' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {item.step}
                        </div>
                        <span className="flex-1 text-sm">{item.name}</span>
                        <span className="text-xs text-gray-400">{item.period}</span>
                        {item.note && <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">{item.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-700 text-center">
                  <strong>📖 공부 비율:</strong> 이론 40% : 기출문제 60% → <strong>컴퓨터구조 집중 학습!</strong>
                </p>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-cyan-100 mb-4">Claude AI에게 전자계산기조직응용기사 관련 질문을 해보세요!</p>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-cyan-200 mb-1">개념 질문</p>
                  <p className="text-white">&quot;파이프라인 해저드의 종류와 해결 방법을 설명해줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-cyan-200 mb-1">운영체제</p>
                  <p className="text-white">&quot;프로세스 스케줄링 알고리즘을 비교 설명해줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-cyan-200 mb-1">데이터통신</p>
                  <p className="text-white">&quot;OSI 7계층과 TCP/IP 4계층의 차이점을 알려줘&quot;</p>
                </div>
              </div>
              <button className="mt-4 w-full bg-white text-cyan-600 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition">
                AI에게 질문하기 →
              </button>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">

            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-4">
                {[
                  { round: '1회', written: '2.28', practical: '4.26' },
                  { round: '2회', written: '5.9', practical: '7.5' },
                  { round: '3회', written: '8.8', practical: '10.18' },
                ].map((item) => (
                  <div key={item.round} className="border-l-4 border-cyan-400 pl-3">
                    <p className="font-medium text-gray-800">{item.round}</p>
                    <p className="text-sm text-gray-500">필기: {item.written} / 실기: {item.practical}</p>
                  </div>
                ))}
              </div>
              <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer"
                className="mt-4 block text-center text-sm text-cyan-600 hover:underline">
                Q-Net에서 접수하기 →
              </a>
            </div>

            {/* 합격 전략 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-cyan-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '전자계산기구조', target: 60, color: 'bg-blue-500' },
                  { name: '운영체제', target: 60, color: 'bg-cyan-500' },
                  { name: '소프트웨어공학', target: 70, color: 'bg-teal-500' },
                  { name: '데이터통신', target: 65, color: 'bg-sky-500' },
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
              <div className="mt-4 p-3 bg-cyan-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">평균</p>
                <p className="text-2xl font-bold text-cyan-600">64점</p>
                <p className="text-xs text-gray-500">= 합격!</p>
              </div>
            </div>

            {/* 관련 자격증 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-cyan-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '정보처리기사', desc: 'IT 전반 자격' },
                  { name: '임베디드기사', desc: '임베디드 시스템' },
                  { name: '정보통신기사', desc: '통신 전문 자격' },
                  { name: '네트워크관리사', desc: '네트워크 분야' },
                ].map((item) => (
                  <a key={item.name} href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-cyan-50 transition">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📖</span> 추천 교재/인강
              </h3>
              <div className="space-y-3">
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:border-cyan-400 transition">
                  <p className="font-medium text-gray-800">컴퓨터구조 강의</p>
                  <p className="text-xs text-gray-500">무료 유튜브 강의</p>
                </a>
                <a href="https://www.gilbut.co.kr" target="_blank" rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:border-cyan-400 transition">
                  <p className="font-medium text-gray-800">시나공/이기적</p>
                  <p className="text-xs text-gray-500">수험서 베스트셀러</p>
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
            본 페이지의 정보는 참고용이며, 정확한 정보는 Q-Net에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
