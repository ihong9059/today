export default function CareerCounselor1Page() {
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
            <a href="/" className="text-gray-600 hover:text-violet-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/education" className="text-gray-600 hover:text-violet-600">교육</a>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">직업상담사 1급</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">💼</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">직업상담사 1급</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
              </div>
              <p className="text-violet-100 text-lg mb-4">Career Counselor Level 1</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: ★★★★☆</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 약 5천명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 1차 25% / 2차 35%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <a href="/category/education/career-counselor-1/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-violet-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">1차 시험</p>
            <p className="font-bold text-gray-800">5과목 125문항</p>
            <p className="text-xs text-gray-400">객관식</p>
            <p className="text-xs text-violet-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <a href="/category/education/career-counselor-1/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-violet-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">✍️</span>
            <p className="text-gray-500 text-sm mt-2">2차 시험</p>
            <p className="font-bold text-gray-800">논술형</p>
            <p className="text-xs text-gray-400">3시간</p>
            <p className="text-xs text-violet-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-gray-500 text-sm mt-2">응시료</p>
            <p className="font-bold text-gray-800">1차 26,000원</p>
            <p className="text-xs text-gray-400">2차 27,000원</p>
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
                <span className="text-violet-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                직업상담사 1급은 직업상담 분야의 최고급 자격으로, 고급 상담이론과 기법을 활용하여
                복잡한 진로·취업 문제를 해결하고, 직업상담 프로그램을 개발·운영하는 전문가입니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-violet-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 고급 직업상담 및 사례지도</li>
                    <li>• 직업상담 프로그램 개발·운영</li>
                    <li>• 직업상담사 교육·훈련</li>
                    <li>• 노동시장 조사·분석</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">취업 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 고용노동부, 고용센터 관리직</li>
                    <li>• 대학 취업지원센터장</li>
                    <li>• 직업훈련기관 책임자</li>
                    <li>• HR 컨설팅 전문가</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>📌 응시자격:</strong> 2급 취득 후 실무경력 3년 이상, 또는 관련 학과 석사학위 + 실무 2년 등
                </p>
              </div>
            </section>

            {/* 1차 시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-violet-500">📚</span> 1차 시험 과목
              </h2>
              <div className="space-y-3">
                {[
                  { name: '고급직업상담학', slug: 'advanced-counseling', difficulty: 4, tip: '상담이론 심화, 수퍼비전' },
                  { name: '고급직업심리학', slug: 'advanced-psychology', difficulty: 4, tip: '심리검사 개발, 연구방법론' },
                  { name: '고급직업정보론', slug: 'advanced-job-info', difficulty: 3, tip: '직업분류 고급, 정보시스템' },
                  { name: '노동시장론', slug: 'labor-market', difficulty: 4, tip: '노동경제학 심화' },
                  { name: '노동관계법규', slug: 'labor-law', difficulty: 4, tip: '판례 중심 학습' },
                ].map((subject, i) => (
                  <a key={i} href={`/category/education/career-counselor-1/study/${subject.slug}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-violet-50 transition cursor-pointer">
                    <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{subject.name}</span>
                        <span className="text-xs text-gray-400">(25문항)</span>
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

            {/* 2차 시험 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-violet-500">✍️</span> 2차 시험 구성
              </h2>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800">직업상담 실무 고급</span>
                  <span className="text-sm text-gray-500">(논술형)</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: '사례분석 및 수퍼비전', ratio: '약 30%', desc: '복잡 사례 분석, 상담지도' },
                  { name: '프로그램 개발', ratio: '약 25%', desc: '집단상담·훈련 프로그램 설계' },
                  { name: '연구방법론', ratio: '약 25%', desc: '조사설계, 통계분석' },
                  { name: '정책분석', ratio: '약 20%', desc: '고용정책 분석 및 제안' },
                ].map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-violet-600 font-bold">{item.ratio}</span>
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
                <span className="text-violet-500">🎯</span> 추천 공부 순서
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-violet-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">1단계: 1차 시험 대비</h3>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. 2급 내용 복습 (기초 확립)</li>
                    <li>2. 고급직업상담학·심리학 (이론 심화)</li>
                    <li>3. 노동시장론·법규 (시사 이슈 연계)</li>
                    <li>4. 고급직업정보론 (정보시스템 실습)</li>
                  </ol>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">2단계: 2차 시험 대비</h3>
                  <ol className="text-sm text-gray-600 space-y-1">
                    <li>1. 논술 답안 작성 연습 (구조화)</li>
                    <li>2. 실제 사례분석 훈련</li>
                    <li>3. 프로그램 기획서 작성 실습</li>
                    <li>4. 기출문제 분석 및 모의시험</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-violet-500">🤖</span> AI 학습 도우미
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                각 과목 학습 페이지에서 AI 버튼을 클릭하면 Claude, ChatGPT, Gemini 중 선택하여 심화 학습할 수 있습니다.
              </p>
              <div className="grid gap-3">
                {[
                  "수퍼비전에서 평행과정(Parallel Process)의 개념과 활용방법을 설명해주세요.",
                  "직업상담 효과성 연구에서 사용되는 실험설계 방법을 비교해주세요.",
                  "유연안정성(Flexicurity) 모델의 한국 적용 가능성을 분석해주세요.",
                ].map((q, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-violet-500">💬</span>
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
                <span className="text-violet-500">📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { round: '1회', apply: '1.3~1.9', first: '2.22', second: '5.3' },
                  { round: '2회', apply: '4.4~4.10', first: '6.7', second: '8.23' },
                ].map((s, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-800 mb-1">{s.round}</div>
                    <div className="text-gray-500 text-xs space-y-0.5">
                      <p>원서접수: {s.apply}</p>
                      <p>1차: {s.first}</p>
                      <p>2차: {s.second}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer"
                className="block text-center text-sm text-violet-600 hover:text-violet-700 mt-4">
                Q-Net 일정 확인 →
              </a>
            </section>

            {/* 과목별 목표점수 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-violet-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '고급직업상담학', target: 65 },
                  { name: '고급직업심리학', target: 60 },
                  { name: '고급직업정보론', target: 70 },
                  { name: '노동시장론', target: 60 },
                  { name: '노동관계법규', target: 55 },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{s.name}</span>
                      <span className="font-medium text-gray-800">{s.target}점</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                        style={{ width: `${s.target}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">평균 62점 목표 (합격선 60점)</p>
            </section>

            {/* 응시자격 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-violet-500">📌</span> 응시자격
              </h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">2급 취득 후 실무 3년</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">관련 석사 + 실무 2년</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">관련 박사</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">실무 7년 이상</p>
                </div>
              </div>
            </section>

            {/* 추천 교재 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-violet-500">📖</span> 추천 교재
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">직업상담사 1급 이론서</p>
                  <p className="text-gray-500 text-xs">고급 상담이론 + 연구방법론</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">1급 기출문제집</p>
                  <p className="text-gray-500 text-xs">1차/2차 기출 분석</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">논술 답안 작성법</p>
                  <p className="text-gray-500 text-xs">2차 시험 대비</p>
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
