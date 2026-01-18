export default function CareerCounselor2Page() {
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
            <a href="/" className="text-gray-600 hover:text-teal-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/education" className="text-gray-600 hover:text-teal-600">교육</a>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">직업상담사 2급</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">💼</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">직업상담사 2급</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
              </div>
              <p className="text-teal-100 text-lg mb-4">Career Counselor Level 2</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: ★★★☆☆</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 약 3만명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 필기 35% / 실기 45%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <a href="/category/education/career-counselor-2/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-teal-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">필기</p>
            <p className="font-bold text-gray-800">5과목 100문항</p>
            <p className="text-xs text-gray-400">2시간 30분</p>
            <p className="text-xs text-teal-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <a href="/category/education/career-counselor-2/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-teal-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">✍️</span>
            <p className="text-gray-500 text-sm mt-2">실기</p>
            <p className="font-bold text-gray-800">필답형</p>
            <p className="text-xs text-gray-400">2시간 30분</p>
            <p className="text-xs text-teal-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-gray-500 text-sm mt-2">응시료</p>
            <p className="font-bold text-gray-800">필기 19,400원</p>
            <p className="text-xs text-gray-400">실기 20,800원</p>
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
                <span className="text-teal-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                직업상담사 2급은 직업 선택, 취업 준비, 경력 개발 등에 관한 전문적인 상담 서비스를 제공하는
                국가기술자격입니다. 고용센터, 직업훈련기관, 대학 취업지원센터 등에서 활동합니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-teal-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 구직자 직업상담 및 취업알선</li>
                    <li>• 직업심리검사 실시 및 해석</li>
                    <li>• 직업정보 제공 및 분석</li>
                    <li>• 취업 프로그램 기획 및 운영</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">취업 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 고용노동부 산하 고용센터</li>
                    <li>• 대학교 취업지원센터</li>
                    <li>• 직업훈련기관, 인력개발원</li>
                    <li>• 인재개발원, HR 컨설팅업체</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-teal-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-3">
                {[
                  { name: '직업상담학', slug: 'counseling', difficulty: 3, tip: '상담이론, 상담기법 위주 출제' },
                  { name: '직업심리학', slug: 'psychology', difficulty: 4, tip: '심리검사 해석, 직업발달이론 중요' },
                  { name: '직업정보론', slug: 'job-information', difficulty: 3, tip: '직업분류, 고용정보 분석' },
                  { name: '노동시장론', slug: 'labor-market', difficulty: 3, tip: '노동경제학 기초, 고용정책' },
                  { name: '노동관계법규', slug: 'labor-law', difficulty: 4, tip: '근로기준법, 고용보험법 필수' },
                ].map((subject, i) => (
                  <a key={i} href={`/category/education/career-counselor-2/study/${subject.slug}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-teal-50 transition cursor-pointer">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold">
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
                <span className="text-teal-500">✍️</span> 실기시험 구성
              </h2>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800">직업상담 실무</span>
                  <span className="text-sm text-gray-500">(필답형)</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: '직업상담 사례분석', ratio: '약 30%', desc: '상담 사례 해석 및 전략 수립' },
                  { name: '심리검사 해석', ratio: '약 25%', desc: 'MBTI, Holland 등 검사 해석' },
                  { name: '직업정보 활용', ratio: '약 25%', desc: '직업분류, 채용정보 분석' },
                  { name: '취업지원 실무', ratio: '약 20%', desc: '이력서 첨삭, 면접 코칭' },
                ].map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-teal-600 font-bold">{item.ratio}</span>
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
                <span className="text-teal-500">🎯</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="bg-teal-100 text-teal-600 px-2 py-1 rounded text-sm">비전공자</span>
                  </h3>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="bg-teal-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                      <span>직업상담학 (상담기법 이해)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-teal-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                      <span>직업심리학 (심리검사 유형)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-teal-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                      <span>직업정보론 (직업분류체계)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-teal-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">4</span>
                      <span>노동시장론 (고용정책)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-teal-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">5</span>
                      <span>노동관계법규 (암기 위주)</span>
                    </li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded text-sm">전공자/경력자</span>
                  </h3>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                      <span>노동관계법규 (법조문 정리)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                      <span>노동시장론 (통계 분석)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                      <span>직업심리학 (심리검사 심화)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">4</span>
                      <span>직업상담학/정보론 (기출 중심)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">5</span>
                      <span>실기 사례분석 집중</span>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-teal-500">🤖</span> AI 학습 도우미
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                각 과목 학습 페이지에서 AI 버튼을 클릭하면 Claude, ChatGPT, Gemini 중 선택하여 심화 학습할 수 있습니다.
              </p>
              <div className="grid gap-3">
                {[
                  "직업상담에서 내담자 중심 상담과 인지행동 상담의 차이점을 설명해주세요.",
                  "Holland 직업흥미검사의 6가지 유형(RIASEC)과 각 유형에 맞는 직업을 알려주세요.",
                  "근로기준법상 해고의 제한 규정과 부당해고 구제절차를 설명해주세요.",
                ].map((q, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-teal-500">💬</span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">

            {/* 시험 일정 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-teal-500">📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { round: '1회', apply: '1.3~1.9', written: '2.7', practical: '4.5' },
                  { round: '2회', apply: '4.4~4.10', written: '5.9', practical: '6.28' },
                  { round: '3회', apply: '6.20~6.26', written: '7.25', practical: '9.20' },
                ].map((s, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-800 mb-1">{s.round}</div>
                    <div className="text-gray-500 text-xs space-y-0.5">
                      <p>원서접수: {s.apply}</p>
                      <p>필기: {s.written}</p>
                      <p>실기: {s.practical}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer"
                className="block text-center text-sm text-teal-600 hover:text-teal-700 mt-4">
                Q-Net 일정 확인 →
              </a>
            </section>

            {/* 과목별 목표점수 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-teal-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '직업상담학', target: 70 },
                  { name: '직업심리학', target: 60 },
                  { name: '직업정보론', target: 65 },
                  { name: '노동시장론', target: 65 },
                  { name: '노동관계법규', target: 55 },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{s.name}</span>
                      <span className="font-medium text-gray-800">{s.target}점</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                        style={{ width: `${s.target}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">평균 63점 목표 (합격선 60점)</p>
            </section>

            {/* 연계 자격증 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-teal-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '직업상담사 1급', desc: '상위 자격' },
                  { name: '청소년상담사', desc: '상담 분야 확장' },
                  { name: '사회복지사', desc: '복지 분야 연계' },
                  { name: '심리상담사', desc: '심리상담 심화' },
                ].map((cert, i) => (
                  <div key={i} className="p-2 bg-gray-50 rounded-lg text-sm">
                    <span className="font-medium text-gray-800">{cert.name}</span>
                    <span className="text-gray-400 ml-2">{cert.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 추천 교재 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-teal-500">📖</span> 추천 교재
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">시대에듀 직업상담사 2급</p>
                  <p className="text-gray-500 text-xs">이론 + 기출문제 통합본</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">에듀윌 직업상담사 필기</p>
                  <p className="text-gray-500 text-xs">과목별 핵심요약</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">직업상담사 실기 완성</p>
                  <p className="text-gray-500 text-xs">사례분석 집중 대비</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>© 2026 자격시험 가이드. 시험 정보는 Q-Net 공식 정보를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}
