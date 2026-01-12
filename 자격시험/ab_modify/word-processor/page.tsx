export default function WordProcessorPage() {
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
            <span className="text-blue-600 font-medium">워드프로세서</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">📄</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">워드프로세서</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
              </div>
              <p className="text-blue-100 text-lg mb-4">Word Processor</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: ★★☆☆☆</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 30만명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 필기 60% / 실기 40%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <a href="/category/office/word-processor/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-blue-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">필기</p>
            <p className="font-bold text-gray-800">3과목 60문항</p>
            <p className="text-xs text-gray-400">60분</p>
            <p className="text-xs text-blue-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <a href="/category/office/word-processor/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-blue-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">✍️</span>
            <p className="text-gray-500 text-sm mt-2">실기</p>
            <p className="font-bold text-gray-800">문서편집 작업형</p>
            <p className="text-xs text-gray-400">30분</p>
            <p className="text-xs text-blue-500 mt-2 font-medium">상세보기 →</p>
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
                <span className="text-blue-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                워드프로세서는 컴퓨터를 활용한 문서 작성 능력을 평가하는 국가기술자격입니다.
                한글(HWP), MS Word 등 워드프로세서 프로그램 활용 능력과 PC 기본 지식,
                문서 작성 이론을 종합적으로 평가합니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 비즈니스 문서 작성 및 편집</li>
                    <li>• 표, 차트, 그림 삽입 및 편집</li>
                    <li>• 문서 서식 및 스타일 적용</li>
                    <li>• 인쇄 및 문서 관리</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">활용 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 일반 기업 사무직 (필수)</li>
                    <li>• 공공기관, 공기업</li>
                    <li>• 학교, 교육기관</li>
                    <li>• 취업 스펙 (기본 자격)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-3">
                {[
                  { name: '워드프로세싱 용어 및 기능', difficulty: 2, tip: '용어 암기 위주, 쉬운 편' },
                  { name: 'PC 운영체제', difficulty: 3, tip: 'Windows 기능, 파일 관리' },
                  { name: 'PC 기본상식', difficulty: 2, tip: '컴퓨터 구조, 네트워크 기초' },
                ].map((subject, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
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
                <span className="text-blue-500">✍️</span> 실기시험 구성
              </h2>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800">문서편집 기능</span>
                  <span className="text-sm text-gray-500">(작업형 / 30분)</span>
                </div>
                <p className="text-sm text-gray-600">한글(HWP) 또는 MS Word를 사용하여 주어진 문서를 편집하는 실무 시험</p>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: '스타일 지정', ratio: '25점', desc: '글꼴, 크기, 정렬, 색상' },
                  { name: '표 작성', ratio: '30점', desc: '표 삽입, 셀 병합, 선 스타일' },
                  { name: '그림/차트 삽입', ratio: '25점', desc: '그림 삽입, 크기 조절' },
                  { name: '문서 서식', ratio: '20점', desc: '머리말/꼬리말, 쪽 번호' },
                ].map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-blue-600 font-bold">{item.ratio}</span>
                    </div>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  <strong>✅ 합격 기준:</strong> 100점 만점 70점 이상 (다른 자격증보다 높음!)
                </p>
              </div>
            </section>

            {/* 공부 순서 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">🎯</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-blue-200 rounded-xl p-4">
                  <h3 className="font-bold text-blue-600 mb-3">👨‍🎓 초보자 (3주)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '워드프로세싱 용어', period: '1주', note: '암기' },
                      { step: 2, name: 'PC 운영체제', period: '1주', note: '이해' },
                      { step: 3, name: 'PC 기본상식', period: '3일', note: '암기' },
                      { step: 4, name: '기출문제', period: '4일', note: '3회독' },
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
                  <h3 className="font-bold text-green-600 mb-3">💻 PC 사용자 (1주)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '워드프로세싱 용어', period: '2일', note: '암기' },
                      { step: 2, name: 'PC 운영체제', period: '2일', note: '복습' },
                      { step: 3, name: '기출문제 5회독', period: '3일', note: '마무리' },
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
                  <strong>📖 공부 비율:</strong> 이론 40% : 기출문제 60% → <strong>실기는 실습 필수!</strong>
                </p>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-purple-100 mb-4">Claude AI에게 워드프로세서 관련 질문을 해보세요!</p>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">개념 질문</p>
                  <p className="text-white">&quot;한글에서 머리말/꼬리말 설정하는 방법 알려줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">실기 도움</p>
                  <p className="text-white">&quot;워드프로세서 실기 표 작성 핵심 포인트 정리해줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">용어 정리</p>
                  <p className="text-white">&quot;워드프로세서 필기 자주 나오는 용어 20개 정리해줘&quot;</p>
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
                <span className="text-blue-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  상시시험으로 연중 응시 가능! 원하는 날짜에 접수하세요.
                </p>
                {[
                  { type: '필기', desc: '매주 토/일 시행' },
                  { type: '실기', desc: '매주 토/일 시행' },
                ].map((item) => (
                  <div key={item.type} className="border-l-4 border-blue-400 pl-3">
                    <p className="font-medium text-gray-800">{item.type}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
              <a href="https://license.korcham.net" target="_blank" rel="noopener noreferrer"
                className="mt-4 block text-center text-sm text-blue-600 hover:underline">
                대한상공회의소에서 접수하기 →
              </a>
            </div>

            {/* 합격 전략 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '워드프로세싱 용어', target: 80, color: 'bg-blue-500' },
                  { name: 'PC 운영체제', target: 70, color: 'bg-indigo-500' },
                  { name: 'PC 기본상식', target: 75, color: 'bg-violet-500' },
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
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">평균</p>
                <p className="text-2xl font-bold text-blue-600">75점</p>
                <p className="text-xs text-gray-500">= 합격!</p>
              </div>
            </div>

            {/* 실기 합격 TIP */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">💡</span> 실기 합격 TIP
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="font-medium text-amber-800">⚠️ 합격 기준 70점!</p>
                  <p className="text-amber-700">필기보다 높으니 주의하세요</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-800">📝 표 작성 30점</p>
                  <p className="text-blue-700">가장 배점 높음, 완벽히 연습</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-800">⌨️ 단축키 암기</p>
                  <p className="text-green-700">시간 단축의 핵심</p>
                </div>
              </div>
            </div>

            {/* 관련 자격증 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '컴퓨터활용능력 1급', desc: '상위 자격증', href: '/category/office/computer-skills-1' },
                  { name: '컴퓨터활용능력 2급', desc: '상위 자격증', href: '/category/office/computer-skills-2' },
                  { name: 'ITQ 한글', desc: '민간자격', href: '#' },
                  { name: 'MOS', desc: 'MS Office 국제자격', href: '#' },
                ].map((item) => (
                  <a key={item.name} href={item.href} className="block p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">📖</span> 추천 교재/인강
              </h3>
              <div className="space-y-3">
                <a href="https://www.ybmit.com" target="_blank" rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:border-blue-400 transition">
                  <p className="font-medium text-gray-800">YBM IT</p>
                  <p className="text-xs text-gray-500">워드프로세서 전문</p>
                </a>
                <a href="https://www.iamschool.net" target="_blank" rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:border-blue-400 transition">
                  <p className="font-medium text-gray-800">아이엠스쿨</p>
                  <p className="text-xs text-gray-500">무료 강의 다수</p>
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
