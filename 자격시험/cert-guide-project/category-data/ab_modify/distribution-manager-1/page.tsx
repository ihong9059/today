export default function DistributionManager1Page() {
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
            <a href="/category/trade" className="text-gray-600 hover:text-blue-600">무역·물류</a>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">유통관리사 1급</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">🏪</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">유통관리사 1급</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가공인자격</span>
              </div>
              <p className="text-emerald-100 text-lg mb-4">Distribution Manager Level 1</p>
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
                  <span>합격률: 약 35%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <a href="/category/trade/distribution-manager-1/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-emerald-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">필기시험</p>
            <p className="font-bold text-gray-800">5과목 100문항</p>
            <p className="text-xs text-gray-400">2시간 30분</p>
            <p className="text-xs text-emerald-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <a href="/category/trade/distribution-manager-1/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-emerald-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">✍️</span>
            <p className="text-gray-500 text-sm mt-2">합격기준</p>
            <p className="font-bold text-gray-800">평균 60점 이상</p>
            <p className="text-xs text-gray-400">과목당 40점 이상</p>
            <p className="text-xs text-emerald-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-gray-500 text-sm mt-2">응시료</p>
            <p className="font-bold text-gray-800">18,800원</p>
            <p className="text-xs text-gray-400">필기시험</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">🏢</span>
            <p className="text-gray-500 text-sm mt-2">주관</p>
            <p className="font-bold text-gray-800">대한상공회의소</p>
            <p className="text-xs text-gray-400">KORCHAM</p>
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
                유통관리사 1급은 유통업계의 최고 전문가 자격으로, 유통경영 전반에 대한 고도의 전문지식과
                실무능력을 갖추고 유통기업의 경영전략, 물류관리, 마케팅, 유통정보시스템 등
                핵심 분야를 총괄 관리하는 유통전문가입니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-bold text-emerald-700 mb-2">👔 주요 업무</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 유통기업 경영전략 수립</li>
                    <li>• 상권분석 및 점포개발</li>
                    <li>• 물류시스템 설계·운영</li>
                    <li>• 유통마케팅 기획·실행</li>
                    <li>• 유통정보시스템 관리</li>
                  </ul>
                </div>
                <div className="bg-teal-50 rounded-lg p-4">
                  <h4 className="font-bold text-teal-700 mb-2">🏢 취업 분야</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 대형마트·백화점 본사</li>
                    <li>• 편의점·프랜차이즈 본사</li>
                    <li>• 물류센터·물류기업</li>
                    <li>• 유통컨설팅 회사</li>
                    <li>• 공공기관·연구소</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📚</span> 필기시험 과목 (5과목)
              </h2>
              <div className="space-y-4">
                {[
                  { num: 1, name: '유통경영', items: 20, topics: ['유통전략', '유통조직', '인사관리', '재무관리'], difficulty: '★★★★☆', tip: '경영학 기초 필수' },
                  { num: 2, name: '물류경영', items: 20, topics: ['물류관리', '재고관리', '운송관리', '보관하역'], difficulty: '★★★★☆', tip: 'SCM 개념 중요' },
                  { num: 3, name: '상권분석', items: 20, topics: ['상권이론', '입지분석', '매출예측', '점포개발'], difficulty: '★★★☆☆', tip: '실무 사례 다수 출제' },
                  { num: 4, name: '유통마케팅', items: 20, topics: ['마케팅전략', '소비자행동', '판촉관리', 'CRM'], difficulty: '★★★★☆', tip: '최신 트렌드 반영' },
                  { num: 5, name: '유통정보', items: 20, topics: ['유통정보시스템', 'POS/EDI', '빅데이터', 'e-커머스'], difficulty: '★★★☆☆', tip: 'IT 용어 암기 필수' },
                ].map((subject) => (
                  <div key={subject.num} className="border rounded-lg p-4 hover:border-emerald-300 transition">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                          {subject.num}
                        </span>
                        <h3 className="font-bold text-gray-800">{subject.name}</h3>
                      </div>
                      <span className="text-xs text-gray-500">{subject.items}문항</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {subject.topics.map((topic) => (
                        <span key={topic} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-yellow-600">난이도: {subject.difficulty}</span>
                      <span className="text-emerald-600">💡 {subject.tip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 추천 공부 순서 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📖</span> 추천 공부 순서
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h3 className="font-bold text-gray-800 mb-2">🔰 비전공자/입문자 (4~6개월)</h3>
                  <div className="flex flex-wrap gap-2">
                    {['1. 유통정보 (기초개념)', '2. 상권분석 (실무이해)', '3. 유통마케팅 (응용)', '4. 물류경영 (심화)', '5. 유통경영 (종합)'].map((step) => (
                      <span key={step} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm">
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="font-bold text-gray-800 mb-2">⭐ 유통업 종사자/전공자 (2~3개월)</h3>
                  <div className="flex flex-wrap gap-2">
                    {['1. 기출문제 분석', '2. 취약과목 집중', '3. 유통경영 심화', '4. 전과목 모의고사'].map((step) => (
                      <span key={step} className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm">
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-emerald-100 mb-4">
                각 과목별 학습 페이지에서 AI 버튼을 클릭하면 Claude, ChatGPT, Gemini 중
                원하는 AI를 선택하여 상세한 해설을 받을 수 있습니다.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm font-medium">💬 질문 예시 1</p>
                  <p className="text-xs text-emerald-100 mt-1">"유통경영에서 SPA와 VMD의 차이점을 설명해주세요"</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm font-medium">💬 질문 예시 2</p>
                  <p className="text-xs text-emerald-100 mt-1">"크로스도킹과 머천다이징의 관계를 알려주세요"</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm font-medium">💬 질문 예시 3</p>
                  <p className="text-xs text-emerald-100 mt-1">"옴니채널과 O2O 마케팅 전략을 비교해주세요"</p>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-3">
                {[
                  { round: '제1회', apply: '02.10 ~ 02.14', exam: '03.15(토)', result: '04.04' },
                  { round: '제2회', apply: '06.09 ~ 06.13', exam: '07.12(토)', result: '08.01' },
                ].map((schedule) => (
                  <div key={schedule.round} className="border rounded-lg p-3 text-sm">
                    <div className="font-bold text-emerald-600 mb-1">{schedule.round}</div>
                    <div className="text-gray-600">
                      <p>원서접수: {schedule.apply}</p>
                      <p>시험일: {schedule.exam}</p>
                      <p>합격발표: {schedule.result}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">* 정확한 일정은 대한상공회의소 확인</p>
            </div>

            {/* 과목별 목표점수 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '유통경영', target: 70, color: 'bg-emerald-500' },
                  { name: '물류경영', target: 65, color: 'bg-teal-500' },
                  { name: '상권분석', target: 75, color: 'bg-cyan-500' },
                  { name: '유통마케팅', target: 70, color: 'bg-green-500' },
                  { name: '유통정보', target: 75, color: 'bg-lime-500' },
                ].map((subject) => (
                  <div key={subject.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{subject.name}</span>
                      <span className="font-bold text-gray-800">{subject.target}점</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${subject.color} rounded-full`}
                        style={{ width: `${subject.target}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">평균 60점 이상 / 과목당 40점 이상</p>
            </div>

            {/* 과목별 학습 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📚</span> 과목별 학습
              </h3>
              <div className="space-y-2">
                {[
                  { name: '유통경영', path: 'distribution-management', icon: '🏪' },
                  { name: '물류경영', path: 'logistics-management', icon: '📦' },
                  { name: '상권분석', path: 'business-strategy', icon: '📍' },
                  { name: '유통마케팅', path: 'marketing', icon: '📣' },
                  { name: '유통정보', path: 'distribution-info', icon: '💻' },
                ].map((subject) => (
                  <a
                    key={subject.path}
                    href={`/category/trade/distribution-manager-1/study/${subject.path}`}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 border border-transparent transition"
                  >
                    <div className="flex items-center gap-2">
                      <span>{subject.icon}</span>
                      <span className="text-gray-700 font-medium">{subject.name}</span>
                    </div>
                    <span className="text-emerald-500">→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* 연계 자격증 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '유통관리사 2급', path: '/category/trade/distribution-manager-2' },
                  { name: '물류관리사', path: '/category/trade/logistics-manager' },
                  { name: '국제무역사', path: '/category/trade/international-trader' },
                  { name: '무역영어 1급', path: '/category/trade/trade-english-1' },
                ].map((cert) => (
                  <a
                    key={cert.path}
                    href={cert.path}
                    className="block p-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded transition"
                  >
                    → {cert.name}
                  </a>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📕</span> 추천 교재
              </h3>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <p className="font-medium text-gray-800 text-sm">유통관리사 1급 한권으로 끝내기</p>
                  <p className="text-xs text-gray-500">시대고시기획</p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="font-medium text-gray-800 text-sm">유통관리사 1급 기출문제집</p>
                  <p className="text-xs text-gray-500">에듀윌</p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="font-medium text-gray-800 text-sm">유통관리사 1급 핵심요약집</p>
                  <p className="text-xs text-gray-500">시대에듀</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 자격시험 가이드. 본 사이트는 학습 참고용이며, 정확한 정보는 대한상공회의소에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
