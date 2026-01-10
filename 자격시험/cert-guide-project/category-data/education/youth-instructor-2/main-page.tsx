import Link from 'next/link';

export default function YouthInstructorPage() {
  const subjects = [
    { id: 'youth-policy', name: '청소년육성제도론', icon: '📋', color: 'from-green-500 to-teal-500', questions: 25 },
    { id: 'instruction-method', name: '청소년지도방법론', icon: '🎓', color: 'from-blue-500 to-cyan-500', questions: 25 },
    { id: 'psychology-counseling', name: '청소년심리및상담', icon: '🧠', color: 'from-purple-500 to-pink-500', questions: 25 },
    { id: 'youth-culture', name: '청소년문화', icon: '🎭', color: 'from-orange-500 to-amber-500', questions: 25 },
    { id: 'youth-activity', name: '청소년활동', icon: '⚽', color: 'from-teal-500 to-emerald-500', questions: 25 },
    { id: 'practical', name: '면접', icon: '🎯', color: 'from-red-500 to-rose-500', questions: 15 },
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
            <Link href="/category/education" className="text-gray-600 hover:text-green-600">교육</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">청소년지도사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🎯</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">청소년지도사 2급</h1>
              <p className="text-green-100 mt-1">Youth Instructor Level 2</p>
              <div className="flex gap-2 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가자격증</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">난이도 ★★★☆☆</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">45%</p>
            <p className="text-sm text-gray-500">합격률</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">관련학과</p>
            <p className="text-sm text-gray-500">응시자격</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">필기+면접</p>
            <p className="text-sm text-gray-500">시험형태</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">중</p>
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
                청소년지도사는 청소년기본법에 따른 국가자격증으로, 청소년 수련시설 및 청소년단체 등에서
                청소년의 성장과 발달을 돕고 청소년활동을 전문적으로 지도하는 역할을 담당합니다.
                2급 자격은 관련 학과 졸업 또는 3급 취득 후 2년 경력으로 응시할 수 있습니다.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 필기시험 과목</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {subjects.slice(0, 5).map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/education/youth-instructor/study/${subject.id}`}
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
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 면접시험</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">구술면접</p>
                  <p className="text-sm text-gray-600 mt-1">청소년지도 실무능력 및 자질 평가</p>
                </div>
                <Link
                  href="/category/education/youth-instructor/study/practical"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:border-green-300 hover:bg-green-50 transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center text-white">
                    🎯
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">면접 학습하기</p>
                    <p className="text-xs text-gray-500">예상 질문 대비</p>
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
                  <p className="text-gray-700">청소년육성제도론 - 법과 제도의 기초 이해</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">2</span>
                  <p className="text-gray-700">청소년심리및상담 - 발달 및 상담 이론</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">3</span>
                  <p className="text-gray-700">청소년지도방법론 - 프로그램 기획과 운영</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">4</span>
                  <p className="text-gray-700">청소년문화 - 현대 청소년 문화 이해</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">5</span>
                  <p className="text-gray-700">청소년활동 - 다양한 활동 이론과 실제</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">6</span>
                  <p className="text-gray-700">면접 - 실무 능력 및 자질 준비</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
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
                  <p className="text-gray-600">필기: 5월 / 면접: 7월</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">2026년 2회</p>
                  <p className="text-gray-600">필기: 10월 / 면접: 12월</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🎯 과목별 목표점수</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">청소년육성제도론</span>
                  <span className="font-medium text-green-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">청소년지도방법론</span>
                  <span className="font-medium text-green-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">청소년심리및상담</span>
                  <span className="font-medium text-green-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">청소년문화</span>
                  <span className="font-medium text-green-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">청소년활동</span>
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
              <h3 className="font-bold text-gray-800 mb-4">📌 응시자격</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 관련학과 전공 학사학위 이상</p>
                <p>• 3급 청소년지도사 + 2년 경력</p>
                <p>• 비관련학과 학사 + 양성과정 이수</p>
              </div>
            </div>

            <Link
              href="/category/education/youth-instructor/exam"
              className="block w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white text-center rounded-xl font-medium hover:opacity-90 transition"
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
