export default function SocialWorkerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" className="text-gray-600 hover:text-pink-600">홈</a>
            <span className="text-gray-300">›</span>
            <span className="text-gray-600">교육·복지</span>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">사회복지사 1급</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">🤝</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">사회복지사 1급</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가자격증</span>
              </div>
              <p className="text-pink-100 text-lg mb-4">Social Worker Level 1</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: ★★★☆☆</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 3만명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 35%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <a href="/education/social-worker/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-pink-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">필기시험</p>
            <p className="font-bold text-gray-800">3영역 200문항</p>
            <p className="text-xs text-gray-400">2시간 30분</p>
            <p className="text-xs text-pink-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">🎓</span>
            <p className="text-gray-500 text-sm mt-2">응시자격</p>
            <p className="font-bold text-gray-800">사회복지학 전공</p>
            <p className="text-xs text-gray-400">학사 이상</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-gray-500 text-sm mt-2">응시료</p>
            <p className="font-bold text-gray-800">20,000원</p>
            <p className="text-xs text-gray-400">1회 응시 기준</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">🏢</span>
            <p className="text-gray-500 text-sm mt-2">주관</p>
            <p className="font-bold text-gray-800">한국사회복지사협회</p>
            <p className="text-xs text-gray-400">보건복지부</p>
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
                <span className="text-pink-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                사회복지사 1급은 사회복지사업법에 따른 국가자격증으로, 사회복지학 전공 학사 이상 학위 취득 후
                국가시험에 합격한 자에게 부여됩니다. 사회복지 현장에서 전문적인 실천과 정책 수립 능력을 갖춘
                전문가로 인정받습니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-pink-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 사회복지 상담 및 사례관리</li>
                    <li>• 복지 프로그램 기획·운영</li>
                    <li>• 지역사회 복지 자원 연계</li>
                    <li>• 사회복지 정책 연구·개발</li>
                  </ul>
                </div>
                <div className="bg-rose-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">취업 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 종합사회복지관, 노인복지관</li>
                    <li>• 병원 의료사회복지사</li>
                    <li>• 학교사회복지사</li>
                    <li>• 공무원(사회복지직)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 응시자격 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-pink-500">🎓</span> 응시자격
              </h2>
              <div className="space-y-3">
                <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <h3 className="font-bold text-pink-700 mb-2">✅ 기본 요건</h3>
                  <p className="text-sm text-gray-700">
                    고등교육법에 의한 대학원, 대학, 전문대학에서 보건복지부령으로 정하는 사회복지학 전공과목과
                    사회복지 관련 교과목을 이수하고 학위를 취득한 자
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-1">4년제 학사</h4>
                    <p className="text-sm text-gray-600">전공과목 10과목 + 관련교과목 4과목</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-1">전문학사 + 경력</h4>
                    <p className="text-sm text-gray-600">전문대학 졸업 + 3년 실무경력</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 시험 구성 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-pink-500">📚</span> 시험 구성 (3영역 200문항)
              </h2>
              <div className="space-y-3">
                {[
                  {
                    name: '사회복지기초',
                    subjects: '인간행동과 사회환경, 사회복지조사론',
                    questions: 80,
                    difficulty: 3,
                    tip: '이론 중심, 개념 정확히'
                  },
                  {
                    name: '사회복지실천',
                    subjects: '사회복지실천론, 사회복지실천기술론, 지역사회복지론',
                    questions: 80,
                    difficulty: 3,
                    tip: '실천 사례 중심'
                  },
                  {
                    name: '사회복지정책과 제도',
                    subjects: '사회복지정책론, 사회복지행정론, 사회복지법제론',
                    questions: 40,
                    difficulty: 3,
                    tip: '법·제도 암기'
                  },
                ].map((area, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-800">{area.name}</span>
                        <span className="text-xs text-gray-400">({area.questions}문항)</span>
                      </div>
                      <p className="text-sm text-gray-600">{area.subjects}</p>
                      <p className="text-xs text-pink-600 mt-1">{area.tip}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <span key={s} className={s <= area.difficulty ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>💡 합격 기준:</strong> 영역별 40점 이상(과락) + 전체 평균 60점 이상
                </p>
              </div>
            </section>

            {/* 공부 순서 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-pink-500">🎯</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-pink-200 rounded-xl p-4">
                  <h3 className="font-bold text-pink-600 mb-3">👨‍🎓 전공자 (3개월)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '사회복지기초', period: '3주', note: '기본' },
                      { step: 2, name: '사회복지실천', period: '4주', note: '핵심' },
                      { step: 3, name: '정책과 제도', period: '3주', note: '암기' },
                      { step: 4, name: '기출문제 풀이', period: '2주', note: '마무리' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {item.step}
                        </div>
                        <span className="flex-1 text-sm">{item.name}</span>
                        <span className="text-xs text-gray-400">{item.period}</span>
                        {item.note && <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded">{item.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-2 border-rose-200 rounded-xl p-4">
                  <h3 className="font-bold text-rose-600 mb-3">👨‍💼 편입/학점은행 (6개월)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '이론 정리', period: '2개월', note: '개념' },
                      { step: 2, name: '실천 영역', period: '2개월', note: '사례' },
                      { step: 3, name: '정책·법제', period: '1개월', note: '암기' },
                      { step: 4, name: '기출 3회독', period: '1개월', note: '마무리' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {item.step}
                        </div>
                        <span className="flex-1 text-sm">{item.name}</span>
                        <span className="text-xs text-gray-400">{item.period}</span>
                        {item.note && <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded">{item.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-700 text-center">
                  <strong>📖 공부 비율:</strong> 이론 40% : 기출문제 60% → <strong>최근 5개년 기출 필수!</strong>
                </p>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-purple-100 mb-4">Claude AI에게 사회복지사 관련 질문을 해보세요!</p>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">개념 질문</p>
                  <p className="text-white">&quot;매슬로우의 욕구위계론을 사회복지와 연결해서 설명해줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">사례 분석</p>
                  <p className="text-white">&quot;노인 우울 사례관리 개입 방법 3가지 알려줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">법제도 암기</p>
                  <p className="text-white">&quot;사회보장기본법 주요 내용 정리해줘&quot;</p>
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
                <span className="text-pink-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-4">
                {[
                  { round: '제19회', date: '1.18 (토)', apply: '23.12월' },
                  { round: '제20회', date: '8.2 (토)', apply: '24.6월' },
                ].map((item) => (
                  <div key={item.round} className="border-l-4 border-pink-400 pl-3">
                    <p className="font-medium text-gray-800">{item.round}</p>
                    <p className="text-sm text-gray-500">시험: {item.date}</p>
                    <p className="text-xs text-gray-400">접수: {item.apply}</p>
                  </div>
                ))}
              </div>
              <a href="https://www.welfare.net" target="_blank" rel="noopener noreferrer"
                className="mt-4 block text-center text-sm text-pink-600 hover:underline">
                한국사회복지사협회 바로가기 →
              </a>
            </div>

            {/* 합격 전략 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-pink-500">🎯</span> 영역별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '사회복지기초', target: 65, color: 'bg-pink-500' },
                  { name: '사회복지실천', target: 70, color: 'bg-rose-500' },
                  { name: '정책과 제도', target: 60, color: 'bg-red-500' },
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
              <div className="mt-4 p-3 bg-pink-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">평균</p>
                <p className="text-2xl font-bold text-pink-600">65점</p>
                <p className="text-xs text-gray-500">= 합격!</p>
              </div>
            </div>

            {/* 관련 자격증 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-pink-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '정신건강사회복지사', desc: '정신건강 전문' },
                  { name: '의료사회복지사', desc: '병원 전문' },
                  { name: '학교사회복지사', desc: '교육 전문' },
                  { name: '사회복지사 2급', desc: '기초 자격' },
                ].map((item) => (
                  <a key={item.name} href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-pink-500">📖</span> 추천 교재/인강
              </h3>
              <div className="space-y-3">
                <a href="https://www.eduwill.net" target="_blank" rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:border-pink-400 transition">
                  <p className="font-medium text-gray-800">에듀윌</p>
                  <p className="text-xs text-gray-500">사회복지사 전문</p>
                </a>
                <a href="https://www.cyberedu.co.kr" target="_blank" rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:border-pink-400 transition">
                  <p className="font-medium text-gray-800">사이버국가고시센터</p>
                  <p className="text-xs text-gray-500">기출문제 해설</p>
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
            본 페이지의 정보는 참고용이며, 정확한 정보는 한국사회복지사협회에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
