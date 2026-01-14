export default function SolarPowerEngineerPage() {
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
            <a href="/" className="text-gray-600 hover:text-orange-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical" className="text-gray-600 hover:text-orange-600">기계·전기</a>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">태양광발전설비기사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">☀️</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">태양광발전설비기사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
              </div>
              <p className="text-yellow-100 text-lg mb-4">Engineer Solar Photovoltaic Power Generation</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: ★★★★☆</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 약 5,000명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 필기 30% / 실기 40%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <a href="/category/mechanical/solar-power-engineer/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-orange-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">필기</p>
            <p className="font-bold text-gray-800">5과목 100문항</p>
            <p className="text-xs text-gray-400">2시간 30분</p>
            <p className="text-xs text-orange-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <a href="/category/mechanical/solar-power-engineer/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-orange-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">✍️</span>
            <p className="text-gray-500 text-sm mt-2">실기</p>
            <p className="font-bold text-gray-800">필답형+작업형</p>
            <p className="text-xs text-gray-400">약 4시간</p>
            <p className="text-xs text-orange-500 mt-2 font-medium">상세보기 →</p>
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
                <span className="text-orange-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                태양광발전설비기사는 태양광 발전시스템의 설계, 시공, 운영 및 유지보수에 관한 전문 지식과
                기술을 갖추고, 신재생에너지 분야의 핵심 인력으로 활동하는 국가기술자격입니다.
                정부의 탄소중립 정책과 함께 수요가 급증하고 있는 유망 자격증입니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-bold text-yellow-800 mb-2">💼 주요 업무</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 태양광 발전설비 설계</li>
                    <li>• 발전시스템 시공 및 감리</li>
                    <li>• 설비 운영 및 유지보수</li>
                    <li>• 발전효율 분석 및 최적화</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-bold text-orange-800 mb-2">🏢 취업 분야</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• 신재생에너지 전문기업</li>
                    <li>• 태양광 발전소 운영사</li>
                    <li>• 전기공사 및 설계사무소</li>
                    <li>• 한국에너지공단, 전력거래소</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 필기시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-4">
                {[
                  { name: '태양광발전시스템 이론', desc: '태양전지 원리, 모듈 특성, 일사량 분석', icon: '☀️', difficulty: 4, tip: '태양전지 종류별 특성과 효율 계산이 핵심!' },
                  { name: '전력계통 및 전기설비', desc: '계통연계, 인버터, 배전반, 보호계전기', icon: '⚡', difficulty: 4, tip: '인버터 종류와 계통연계 조건 필수 암기!' },
                  { name: '태양광발전설비 설계', desc: '용량설계, 구조설계, 전기설계, 접지', icon: '📐', difficulty: 5, tip: '설계 계산문제가 많이 출제됨!' },
                  { name: '태양광발전설비 시공', desc: '설치공법, 배선공사, 안전관리', icon: '🔧', difficulty: 3, tip: '시공순서와 안전규정 위주 학습!' },
                  { name: '전기설비기술기준 및 법규', desc: 'KEC, 신재생에너지법, 안전관리법', icon: '📜', difficulty: 3, tip: '법규 개정사항 반드시 확인!' },
                ].map((subject, idx) => (
                  <div key={idx} className="border rounded-lg p-4 hover:border-orange-300 transition">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-800">{idx + 1}. {subject.name}</h3>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <span key={s} className={`text-xs ${s <= subject.difficulty ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{subject.desc}</p>
                        <p className="text-xs text-orange-600 mt-2 bg-orange-50 inline-block px-2 py-1 rounded">💡 {subject.tip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 실기시험 구성 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">✍️</span> 실기시험 구성
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-3">필답형 (60점)</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {['태양광발전시스템 설계', '발전량 예측 및 분석', '전력품질 관리', '유지보수 계획'].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs">{idx + 1}</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-3">작업형 (40점)</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {['PV 모듈 특성시험', '인버터 연결 및 설정', '계통연계 시험', '접지저항 측정'].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">{idx + 1}</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 추천 공부 순서 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📖</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-yellow-200 rounded-xl p-4">
                  <h3 className="font-bold text-yellow-700 mb-3">🌱 비전공자 (3~4개월)</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><span className="bg-yellow-100 text-yellow-700 w-6 h-6 rounded-full flex items-center justify-center font-bold">1</span>전기기초 선행학습 (2주)</li>
                    <li className="flex items-center gap-2"><span className="bg-yellow-100 text-yellow-700 w-6 h-6 rounded-full flex items-center justify-center font-bold">2</span>태양광발전시스템 이론 (4주)</li>
                    <li className="flex items-center gap-2"><span className="bg-yellow-100 text-yellow-700 w-6 h-6 rounded-full flex items-center justify-center font-bold">3</span>전력계통 및 전기설비 (3주)</li>
                    <li className="flex items-center gap-2"><span className="bg-yellow-100 text-yellow-700 w-6 h-6 rounded-full flex items-center justify-center font-bold">4</span>설계·시공·법규 (4주)</li>
                    <li className="flex items-center gap-2"><span className="bg-yellow-100 text-yellow-700 w-6 h-6 rounded-full flex items-center justify-center font-bold">5</span>기출문제 풀이 (3주)</li>
                  </ol>
                </div>
                <div className="border-2 border-orange-200 rounded-xl p-4">
                  <h3 className="font-bold text-orange-700 mb-3">⚡ 전공자 (2개월)</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><span className="bg-orange-100 text-orange-700 w-6 h-6 rounded-full flex items-center justify-center font-bold">1</span>태양광발전시스템 이론 (2주)</li>
                    <li className="flex items-center gap-2"><span className="bg-orange-100 text-orange-700 w-6 h-6 rounded-full flex items-center justify-center font-bold">2</span>설계·시공 집중학습 (3주)</li>
                    <li className="flex items-center gap-2"><span className="bg-orange-100 text-orange-700 w-6 h-6 rounded-full flex items-center justify-center font-bold">3</span>법규 및 기준 암기 (1주)</li>
                    <li className="flex items-center gap-2"><span className="bg-orange-100 text-orange-700 w-6 h-6 rounded-full flex items-center justify-center font-bold">4</span>기출문제 풀이 (2주)</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-yellow-100 mb-4">AI에게 태양광발전설비기사 관련 질문을 해보세요!</p>
              <div className="space-y-2">
                {[
                  '태양전지의 I-V 특성곡선에서 MPP란 무엇인가요?',
                  '계통연계형 인버터의 보호기능에는 어떤 것들이 있나요?',
                  '태양광발전소 용량 설계 시 고려해야 할 요소는?',
                ].map((q, idx) => (
                  <a
                    key={idx}
                    href={`https://claude.ai/new?q=${encodeURIComponent(`태양광발전설비기사 시험 준비 중입니다. ${q} 자세히 설명해주세요.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/20 hover:bg-white/30 rounded-lg p-3 text-sm transition"
                  >
                    💬 {q}
                  </a>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">

            {/* 시험 일정 */}
            <section className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-3">
                {[
                  { round: '1회', apply: '1.6~1.9', written: '2.6', practical: '3.15~3.28' },
                  { round: '2회', apply: '3.24~3.27', written: '5.10', practical: '6.21~7.4' },
                  { round: '3회', apply: '6.9~6.12', written: '8.2', practical: '10.4~10.17' },
                ].map((schedule, idx) => (
                  <div key={idx} className="border rounded-lg p-3 text-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-orange-600">{schedule.round}</span>
                      <span className="text-xs text-gray-400">2026년</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-gray-400">접수</p>
                        <p className="text-gray-700">{schedule.apply}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">필기</p>
                        <p className="text-gray-700">{schedule.written}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">실기</p>
                        <p className="text-gray-700">{schedule.practical}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="https://www.q-net.or.kr/crf005.do?id=crf00503&gSite=Q&gId="
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm text-orange-600 hover:text-orange-700 mt-4"
              >
                Q-Net에서 상세일정 확인 →
              </a>
            </section>

            {/* 과목별 목표점수 */}
            <section className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">🎯</span> 과목별 목표점수
              </h3>
              <p className="text-xs text-gray-500 mb-3">과목당 40점 이상, 평균 60점 이상</p>
              <div className="space-y-3">
                {[
                  { name: '태양광발전시스템 이론', target: 70, color: 'bg-yellow-500' },
                  { name: '전력계통 및 전기설비', target: 65, color: 'bg-orange-500' },
                  { name: '태양광발전설비 설계', target: 55, color: 'bg-red-500' },
                  { name: '태양광발전설비 시공', target: 75, color: 'bg-green-500' },
                  { name: '전기설비기술기준 및 법규', target: 70, color: 'bg-blue-500' },
                ].map((subject, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 truncate">{subject.name}</span>
                      <span className="text-gray-500 font-medium">{subject.target}점</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${subject.color} rounded-full`} style={{ width: `${subject.target}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 연계 자격증 */}
            <section className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '전기기사', path: '/category/mechanical/electric-engineer', icon: '⚡' },
                  { name: '전기공사기사', path: '/category/mechanical/electrical-work-engineer', icon: '🔧' },
                  { name: '신재생에너지발전설비기사(풍력)', path: '#', icon: '💨' },
                  { name: '에너지관리기사', path: '#', icon: '🔋' },
                ].map((cert, idx) => (
                  <a key={idx} href={cert.path} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition text-sm">
                    <span>{cert.icon}</span>
                    <span className="text-gray-700">{cert.name}</span>
                    <span className="ml-auto text-gray-400">→</span>
                  </a>
                ))}
              </div>
            </section>

            {/* 추천 교재 */}
            <section className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📚</span> 추천 교재
              </h3>
              <div className="space-y-3">
                {[
                  { title: '태양광발전설비기사 필기', author: '성안당', tag: '기본서' },
                  { title: '태양광발전설비기사 실기', author: '성안당', tag: '실기' },
                  { title: '태양광발전 핵심이론', author: '한솔아카데미', tag: '이론' },
                ].map((book, idx) => (
                  <div key={idx} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{book.title}</p>
                        <p className="text-xs text-gray-500">{book.author}</p>
                      </div>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">{book.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
