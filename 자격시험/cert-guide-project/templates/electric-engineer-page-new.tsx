export default function ElectricEngineerPage() {
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
            <a href="/" className="text-gray-600 hover:text-yellow-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical" className="text-gray-600 hover:text-yellow-600">기계·제어</a>
            <span className="text-gray-300">›</span>
            <span className="text-yellow-600 font-medium">전기기사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">⚡</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">전기기사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
              </div>
              <p className="text-yellow-100 text-lg mb-4">Engineer Electricity</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: ★★★★☆</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 12만명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 필기 20% / 실기 30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <a href="/category/mechanical/electric-engineer/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-yellow-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">필기</p>
            <p className="font-bold text-gray-800">5과목 100문항</p>
            <p className="text-xs text-gray-400">2시간 30분</p>
            <p className="text-xs text-yellow-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <a href="/category/mechanical/electric-engineer/exam?tab=practical" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-yellow-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">✍️</span>
            <p className="text-gray-500 text-sm mt-2">실기</p>
            <p className="font-bold text-gray-800">필답형</p>
            <p className="text-xs text-gray-400">약 2시간 30분</p>
            <p className="text-xs text-yellow-500 mt-2 font-medium">상세보기 →</p>
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
                <span className="text-yellow-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                전기기사는 전기설비의 설계, 시공, 감리 등 전기 분야에 관한 고도의 전문지식과
                기술을 갖추고 업무를 수행하는 국가기술자격입니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 전기설비 설계 및 시공</li>
                    <li>• 전력시스템 운영 및 관리</li>
                    <li>• 전기안전 점검 및 감리</li>
                    <li>• 신재생에너지 설비 관리</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">취업 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 한국전력공사, 발전공기업</li>
                    <li>• 전기설계/시공 업체</li>
                    <li>• 건설회사 전기팀</li>
                    <li>• 공장, 빌딩 전기관리</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-3">
                {[
                  { name: '전기자기학', difficulty: 5, tip: '가장 어려운 과목, 과락률 1위' },
                  { name: '전력공학', difficulty: 3, tip: '암기 위주, 고득점 가능' },
                  { name: '전기기기', difficulty: 4, tip: '계산 문제 많음, 등가회로 이해' },
                  { name: '회로이론 및 제어공학', difficulty: 3, tip: '기초 과목, 먼저 공부 권장' },
                  { name: '전기설비기술기준', difficulty: 2, tip: '순수 암기, 막판 집중' },
                ].map((subject, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold">
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
                <span className="text-yellow-500">✍️</span> 실기시험 구성
              </h2>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800">전기설비 설계 및 관리</span>
                  <span className="text-sm text-gray-500">(필답형)</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: '전기설비 설계', ratio: '약 30%', desc: '수변전설비, 배선설계' },
                  { name: '전력계통 계산', ratio: '약 25%', desc: '단락전류, 역률, 전압강하' },
                  { name: '전기기기 응용', ratio: '약 25%', desc: '변압기, 전동기 계산' },
                  { name: '전기법규', ratio: '약 20%', desc: 'KEC 기준, 안전관리' },
                ].map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-yellow-600 font-bold">{item.ratio}</span>
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
                <span className="text-yellow-500">🎯</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-yellow-200 rounded-xl p-4">
                  <h3 className="font-bold text-yellow-600 mb-3">👨‍🎓 비전공자 (6개월)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '회로이론/제어공학', period: '1.5개월', note: '기초!' },
                      { step: 2, name: '전력공학', period: '1개월', note: '암기' },
                      { step: 3, name: '전기기기', period: '1.5개월', note: '' },
                      { step: 4, name: '전기자기학', period: '1.5개월', note: '핵심!' },
                      { step: 5, name: '전기설비기술기준', period: '0.5개월', note: '마무리' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {item.step}
                        </div>
                        <span className="flex-1 text-sm">{item.name}</span>
                        <span className="text-xs text-gray-400">{item.period}</span>
                        {item.note && <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded">{item.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-2 border-green-200 rounded-xl p-4">
                  <h3 className="font-bold text-green-600 mb-3">👨‍💼 전공자 (3개월)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '회로이론 + 전기자기학', period: '1개월', note: '복습' },
                      { step: 2, name: '전력공학 + 전기기기', period: '1개월', note: '심화' },
                      { step: 3, name: '전기설비기술기준', period: '2주', note: '암기' },
                      { step: 4, name: '기출문제 5회독', period: '2주', note: '마무리' },
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
                  <strong>📖 공부 비율:</strong> 이론 30% : 기출문제 70% → <strong>기출 최소 3회독 필수!</strong>
                </p>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-purple-100 mb-4">Claude AI에게 전기기사 관련 질문을 해보세요!</p>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">개념 질문</p>
                  <p className="text-white">&quot;전기자기학에서 맥스웰 방정식을 쉽게 설명해줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">문제 풀이</p>
                  <p className="text-white">&quot;변압기 효율 계산 문제 3개 만들어줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">암기 도우미</p>
                  <p className="text-white">&quot;전기설비기술기준 접지저항값 정리해줘&quot;</p>
                </div>
              </div>
              <button className="mt-4 w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
                AI에게 질문하기 →
              </button>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">

            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-4">
                {[
                  { round: '1회', written: '2.7', practical: '4.19' },
                  { round: '2회', written: '5.9', practical: '7.18' },
                  { round: '3회', written: '8.1', practical: '11.1~7' },
                ].map((item) => (
                  <div key={item.round} className="border-l-4 border-yellow-400 pl-3">
                    <p className="font-medium text-gray-800">{item.round}</p>
                    <p className="text-sm text-gray-500">필기: {item.written} / 실기: {item.practical}</p>
                  </div>
                ))}
              </div>
              <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer"
                className="mt-4 block text-center text-sm text-yellow-600 hover:underline">
                Q-Net에서 접수하기 →
              </a>
            </div>

            {/* 합격 전략 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '전기자기학', target: 50, color: 'bg-red-500' },
                  { name: '전력공학', target: 75, color: 'bg-green-500' },
                  { name: '전기기기', target: 60, color: 'bg-yellow-500' },
                  { name: '회로이론/제어공학', target: 70, color: 'bg-blue-500' },
                  { name: '전기설비기술기준', target: 80, color: 'bg-emerald-500' },
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
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">평균</p>
                <p className="text-2xl font-bold text-yellow-600">67점</p>
                <p className="text-xs text-gray-500">= 합격!</p>
              </div>
            </div>

            {/* 관련 자격증 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '전기산업기사', desc: '중급 자격증' },
                  { name: '전기공사기사', desc: '시공 전문' },
                  { name: '소방설비기사(전기)', desc: '소방 분야' },
                  { name: '전기기술사', desc: '최고급 자격' },
                ].map((item) => (
                  <a key={item.name} href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-yellow-50 transition">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">📖</span> 추천 교재/인강
              </h3>
              <div className="space-y-3">
                <a href="https://www.eduwill.net" target="_blank" rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:border-yellow-400 transition">
                  <p className="font-medium text-gray-800">에듀윌</p>
                  <p className="text-xs text-gray-500">체계적 커리큘럼</p>
                </a>
                <a href="https://www.sdedu.co.kr" target="_blank" rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:border-yellow-400 transition">
                  <p className="font-medium text-gray-800">서현전기학원</p>
                  <p className="text-xs text-gray-500">전기 전문 인강</p>
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
