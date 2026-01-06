export default function InformationSecurityPage() {
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
            <a href="/" className="text-gray-600 hover:text-green-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-green-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">정보보안기사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">🔐</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">정보보안기사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
              </div>
              <p className="text-green-100 text-lg mb-4">Engineer Information Security</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: ★★★★☆</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 약 5만명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 필기 30% / 실기 20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <a href="/category/it/information-security/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-green-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">필기</p>
            <p className="font-bold text-gray-800">5과목 100문항</p>
            <p className="text-xs text-gray-400">2시간 30분</p>
            <p className="text-xs text-green-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <a href="/category/it/information-security/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-green-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">✍️</span>
            <p className="text-gray-500 text-sm mt-2">실기</p>
            <p className="font-bold text-gray-800">필답형</p>
            <p className="text-xs text-gray-400">3시간</p>
            <p className="text-xs text-green-500 mt-2 font-medium">상세보기 →</p>
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
            <p className="font-bold text-gray-800">한국인터넷진흥원</p>
            <p className="text-xs text-gray-400">KISA</p>
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
                <span className="text-green-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                정보보안기사는 정보보안에 관한 전문적인 지식과 기술을 갖추고 시스템, 네트워크, 애플리케이션 보안 및
                보안 관제, 침해사고 대응 등의 업무를 수행하는 국가공인 정보보안 전문가 자격입니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 보안 시스템 구축 및 운영</li>
                    <li>• 침해사고 분석 및 대응</li>
                    <li>• 취약점 분석 및 모의해킹</li>
                    <li>• 보안 정책 수립 및 컨설팅</li>
                  </ul>
                </div>
                <div className="bg-teal-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">취업 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 보안 전문기업 (안랩, 이글루시큐리티 등)</li>
                    <li>• 금융권 보안팀 (은행, 증권사, 보험사)</li>
                    <li>• 공공기관 정보보호 (KISA, 국정원 등)</li>
                    <li>• 대기업 정보보안팀, 컨설팅펌</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-green-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-3">
                {[
                  { name: '시스템 보안', difficulty: 4, tip: '운영체제, 서버보안, 접근제어' },
                  { name: '네트워크 보안', difficulty: 4, tip: '방화벽, IDS/IPS, VPN' },
                  { name: '애플리케이션 보안', difficulty: 3, tip: '웹보안, 소프트웨어 보안' },
                  { name: '정보보안 일반', difficulty: 3, tip: '암호학, 인증, 접근통제' },
                  { name: '정보보안 관리 및 법규', difficulty: 2, tip: 'ISMS, 개인정보보호법' },
                ].map((subject, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
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
                <span className="text-green-500">✍️</span> 실기시험 구성
              </h2>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800">정보보안 실무</span>
                  <span className="text-sm text-gray-500">(필답형 - 서술, 약술, 단답)</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: '시스템/네트워크 보안', ratio: '35%', desc: '취약점 분석, 로그분석, 보안설정' },
                  { name: '애플리케이션 보안', ratio: '25%', desc: '웹 취약점, 시큐어코딩' },
                  { name: '암호학/인증', ratio: '20%', desc: '암호 알고리즘, PKI, 전자서명' },
                  { name: '보안관리/법규', ratio: '20%', desc: 'ISMS, 침해사고대응, 법률' },
                ].map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-green-600 font-bold">{item.ratio}</span>
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
                <span className="text-green-500">🎯</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-green-200 rounded-xl p-4">
                  <h3 className="font-bold text-green-600 mb-3">👨‍🎓 비전공자 (4개월)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '네트워크 보안', period: '5주', note: '기초!' },
                      { step: 2, name: '시스템 보안', period: '5주', note: '핵심' },
                      { step: 3, name: '정보보안 일반(암호학)', period: '3주', note: '' },
                      { step: 4, name: '애플리케이션 보안', period: '2주', note: '' },
                      { step: 5, name: '관리 및 법규', period: '1주', note: '암기' },
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
                <div className="border-2 border-teal-200 rounded-xl p-4">
                  <h3 className="font-bold text-teal-600 mb-3">👨‍💼 보안경력자 (2개월)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '시스템+네트워크 보안', period: '3주', note: '복습' },
                      { step: 2, name: '암호학+애플리케이션', period: '3주', note: '심화' },
                      { step: 3, name: '관리 및 법규', period: '1주', note: '암기' },
                      { step: 4, name: '기출문제 3회독', period: '1주', note: '마무리' },
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
                  <strong>📖 공부 비율:</strong> 이론 40% : 기출문제 60% → <strong>실습환경 구축 필수!</strong>
                </p>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-teal-500 to-green-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-teal-100 mb-4">Claude AI에게 정보보안기사 관련 질문을 해보세요!</p>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-teal-200 mb-1">암호학 질문</p>
                  <p className="text-white">&quot;AES와 RSA 암호화 방식의 차이점을 설명해줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-teal-200 mb-1">네트워크 보안</p>
                  <p className="text-white">&quot;방화벽 정책 설정 시 고려해야 할 사항 5가지&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-teal-200 mb-1">웹 취약점</p>
                  <p className="text-white">&quot;OWASP Top 10 취약점을 하나씩 설명해줘&quot;</p>
                </div>
              </div>
              <button className="mt-4 w-full bg-white text-teal-600 py-3 rounded-lg font-semibold hover:bg-teal-50 transition">
                AI에게 질문하기 →
              </button>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">

            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-green-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-4">
                {[
                  { round: '1회', written: '3.15', practical: '5.17' },
                  { round: '2회', written: '6.14', practical: '8.16' },
                  { round: '3회', written: '9.13', practical: '11.15' },
                ].map((item) => (
                  <div key={item.round} className="border-l-4 border-green-400 pl-3">
                    <p className="font-medium text-gray-800">{item.round}</p>
                    <p className="text-sm text-gray-500">필기: {item.written} / 실기: {item.practical}</p>
                  </div>
                ))}
              </div>
              <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer"
                className="mt-4 block text-center text-sm text-green-600 hover:underline">
                Q-Net에서 접수하기 →
              </a>
            </div>

            {/* 합격 전략 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-green-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '시스템 보안', target: 60, color: 'bg-green-500' },
                  { name: '네트워크 보안', target: 60, color: 'bg-teal-500' },
                  { name: '애플리케이션 보안', target: 65, color: 'bg-cyan-500' },
                  { name: '정보보안 일반', target: 60, color: 'bg-emerald-500' },
                  { name: '관리 및 법규', target: 75, color: 'bg-lime-500' },
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
              <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">평균</p>
                <p className="text-2xl font-bold text-green-600">64점</p>
                <p className="text-xs text-gray-500">= 합격!</p>
              </div>
            </div>

            {/* 관련 자격증 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-green-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '정보처리기사', desc: 'IT 기초 자격' },
                  { name: 'CISA/CISSP', desc: '국제 보안 자격' },
                  { name: '개인정보관리사', desc: '개인정보보호' },
                  { name: '디지털포렌식전문가', desc: '침해사고 분석' },
                ].map((item) => (
                  <a key={item.name} href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-green-500">📖</span> 추천 교재/강의
              </h3>
              <div className="space-y-3">
                <a href="https://www.aladin.co.kr" target="_blank" rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:border-green-400 transition">
                  <p className="font-medium text-gray-800">시나공/이기적</p>
                  <p className="text-xs text-gray-500">정보보안기사 수험서</p>
                </a>
                <a href="https://www.kisa.or.kr" target="_blank" rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:border-green-400 transition">
                  <p className="font-medium text-gray-800">KISA 교육자료</p>
                  <p className="text-xs text-gray-500">무료 보안 교육 자료</p>
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
