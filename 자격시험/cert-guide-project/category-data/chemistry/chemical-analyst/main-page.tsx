import Link from 'next/link';

export default function ChemicalAnalystPage() {
  const subjects = [
    { id: 'general-chemistry', name: '일반화학', icon: '⚗️', color: 'from-blue-500 to-indigo-500', questions: 25 },
    { id: 'analytical-chemistry', name: '분석화학', icon: '🔬', color: 'from-green-500 to-emerald-500', questions: 25 },
    { id: 'instrumental-analysis', name: '기기분석', icon: '📊', color: 'from-purple-500 to-pink-500', questions: 25 },
    { id: 'environmental-chemistry', name: '환경화학', icon: '🌿', color: 'from-teal-500 to-cyan-500', questions: 25 },
    { id: 'practical', name: '실기', icon: '🧪', color: 'from-orange-500 to-red-500', questions: 15 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-green-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry" className="text-gray-600 hover:text-green-600">화학·환경</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">화학분석기사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🧪</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">화학분석기사</h1>
              <p className="text-green-100 mt-1">Engineer Chemical Analysis</p>
              <div className="flex gap-2 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">난이도 ★★★★☆</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">35%</p>
            <p className="text-sm text-gray-500">합격률</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">관련학과</p>
            <p className="text-sm text-gray-500">응시자격</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">필기+실기</p>
            <p className="text-sm text-gray-500">시험형태</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">중상</p>
            <p className="text-sm text-gray-500">체감 난이도</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 자격 개요</h2>
              <p className="text-gray-600 leading-relaxed">
                화학분석기사는 화학물질의 성분 분석, 품질관리, 환경오염물질 측정 등의 업무를 수행하는
                전문 기술자격입니다. 석유화학, 제약, 식품, 환경 분야 등 다양한 산업 현장에서
                필수적인 역할을 담당합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 필기시험 과목</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {subjects.slice(0, 4).map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/chemistry/chemical-analyst/study/${subject.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:border-green-300 hover:bg-green-50 transition"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center text-white`}>
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{subject.name}</p>
                      <p className="text-xs text-gray-500">{subject.questions}문항</p>
                    </div>
                    <span className="text-green-500">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 실기시험</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">필답형 + 작업형</p>
                  <p className="text-sm text-gray-600 mt-1">화학물질 분석 실무, 기기 조작, 데이터 분석</p>
                </div>
                <Link
                  href="/category/chemistry/chemical-analyst/study/practical"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:border-green-300 hover:bg-green-50 transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white">
                    🧪
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">실기 학습하기</p>
                    <p className="text-xs text-gray-500">작업형 문제 대비</p>
                  </div>
                  <span className="text-green-500">→</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📖 추천 공부 순서</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">1</span>
                  <p className="text-gray-700">일반화학 - 화학의 기본 개념 이해</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">2</span>
                  <p className="text-gray-700">분석화학 - 정성·정량 분석 원리</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">3</span>
                  <p className="text-gray-700">기기분석 - 분석기기 원리와 활용</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">4</span>
                  <p className="text-gray-700">환경화학 - 환경오염물질 분석</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">5</span>
                  <p className="text-gray-700">실기 - 실험 실습 및 기출문제</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h2 className="text-xl font-bold text-green-800 mb-4">🤖 AI 학습 도우미</h2>
              <p className="text-green-700 mb-4">각 과목별 학습 페이지에서 AI와 함께 공부하세요!</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">🧡 Claude</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">💚 ChatGPT</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">💙 Gemini</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">📅 시험 일정</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">2026년 1회</p>
                  <p className="text-gray-600">필기: 3월 / 실기: 5월</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">2026년 2회</p>
                  <p className="text-gray-600">필기: 5월 / 실기: 7월</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">2026년 3회</p>
                  <p className="text-gray-600">필기: 8월 / 실기: 10월</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🎯 과목별 목표점수</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">일반화학</span>
                  <span className="font-medium text-green-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">분석화학</span>
                  <span className="font-medium text-green-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">기기분석</span>
                  <span className="font-medium text-green-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">환경화학</span>
                  <span className="font-medium text-green-600">60점 이상</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">평균</span>
                  <span className="font-bold text-green-600">60점 이상</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🔗 연계 자격증</h3>
              <div className="space-y-2">
                <Link href="/category/chemistry/environmental-engineer" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-green-600">
                  → 환경기사
                </Link>
                <Link href="/category/chemistry/water-environment" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-green-600">
                  → 수질환경기사
                </Link>
                <Link href="/category/chemistry/air-environment" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-green-600">
                  → 대기환경기사
                </Link>
              </div>
            </div>

            <Link
              href="/category/chemistry/chemical-analyst/exam"
              className="block w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center rounded-xl font-medium hover:opacity-90 transition"
            >
              시험 정보 보기 →
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
