import Link from 'next/link';

export default function LifelongEducator1Page() {
  const subjects = [
    { id: 'lifelong-education', name: '평생교육론', icon: '📚', color: 'from-indigo-500 to-purple-500', questions: 25 },
    { id: 'methodology', name: '평생교육방법론', icon: '🎓', color: 'from-purple-500 to-pink-500', questions: 25 },
    { id: 'management', name: '평생교육경영론', icon: '📊', color: 'from-blue-500 to-indigo-500', questions: 25 },
    { id: 'program-development', name: '평생교육프로그램개발론', icon: '💡', color: 'from-violet-500 to-purple-500', questions: 25 },
    { id: 'practical', name: '평생교육실습', icon: '🎯', color: 'from-pink-500 to-rose-500', questions: 15 },
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
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-indigo-600">교육</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">평생교육사 1급</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">📚</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">평생교육사 1급</h1>
              <p className="text-indigo-100 mt-1">Senior Lifelong Educator Certificate</p>
              <div className="flex gap-2 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가자격증</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">난이도 ★★★★☆</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">승급시험</p>
            <p className="text-sm text-gray-500">취득 방법</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">5년+</p>
            <p className="text-sm text-gray-500">실무경력</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">2급필수</p>
            <p className="text-sm text-gray-500">응시자격</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">상</p>
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
                평생교육사 1급은 평생교육법에 의거하여 평생교육 프로그램 기획·진행·분석·평가 및
                평생교육기관 경영·관리 업무를 총괄하는 고급 전문가 자격증입니다. 평생교육사 2급 취득 후
                5년 이상의 실무경력 또는 석사학위와 2급 자격을 갖춘 후 응시할 수 있으며,
                평생교육기관의 관리자, 평생교육정책 전문가로 활동할 수 있습니다.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 시험 과목</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {subjects.slice(0, 4).map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/education/lifelong-educator-1/study/${subject.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:border-indigo-300 hover:bg-indigo-50 transition"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center text-white`}>
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{subject.name}</p>
                      <p className="text-xs text-gray-500">필기시험</p>
                    </div>
                    <span className="text-indigo-500">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 실습</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">평생교육실습</p>
                  <p className="text-sm text-gray-600 mt-1">평생교육기관에서의 고급 실무 경험 및 프로젝트 수행</p>
                </div>
                <Link
                  href="/category/education/lifelong-educator-1/study/practical"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:border-indigo-300 hover:bg-indigo-50 transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white">
                    🎯
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">평생교육실습 학습하기</p>
                    <p className="text-xs text-gray-500">실무 프로젝트 및 사례연구</p>
                  </div>
                  <span className="text-indigo-500">→</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📖 추천 공부 순서</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">1</span>
                  <p className="text-gray-700">평생교육론 - 평생교육의 심화 이론과 철학</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">2</span>
                  <p className="text-gray-700">평생교육방법론 - 고급 교수학습 전략 및 평가</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">3</span>
                  <p className="text-gray-700">평생교육경영론 - 기관 경영 및 전략적 관리</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">4</span>
                  <p className="text-gray-700">평생교육프로그램개발론 - 프로그램 개발 및 평가체계</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">5</span>
                  <p className="text-gray-700">평생교육실습 - 실무 프로젝트 및 현장 연구</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <h2 className="text-xl font-bold text-indigo-800 mb-4">🤖 AI 학습 도우미</h2>
              <p className="text-indigo-700 mb-4">각 과목별 학습 페이지에서 AI와 함께 공부하세요!</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">🧡 Claude</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">💚 ChatGPT</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">💙 Gemini</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">📅 자격 취득 절차</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">1단계</p>
                  <p className="text-gray-600">평생교육사 2급 자격 취득</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">2단계</p>
                  <p className="text-gray-600">평생교육 실무경력 5년 이상 쌓기 (또는 석사학위 취득)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">3단계</p>
                  <p className="text-gray-600">평생교육사 1급 승급시험 응시</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">4단계</p>
                  <p className="text-gray-600">필기시험 합격 (4과목 평균 60점 이상)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">5단계</p>
                  <p className="text-gray-600">평생교육실습 이수 및 자격증 발급</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🎯 응시 자격</h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">경력 기준</p>
                  <p className="text-gray-600">평생교육사 2급 취득 후</p>
                  <p className="text-gray-600 text-xs mt-1">평생교육 관련 실무경력 5년 이상</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">학력 기준</p>
                  <p className="text-gray-600">대학원 석사학위 소지자</p>
                  <p className="text-gray-600 text-xs mt-1">평생교육사 2급 자격 보유</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🔗 진로 분야</h3>
              <div className="space-y-2">
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 평생교육원 센터장
                </div>
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 평생학습관 관장
                </div>
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 기업 HRD 임원
                </div>
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 평생교육정책 전문가
                </div>
              </div>
            </div>

            <Link
              href="/category/education/lifelong-educator-1/exam"
              className="block w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center rounded-xl font-medium hover:opacity-90 transition"
            >
              자격 정보 보기 →
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
