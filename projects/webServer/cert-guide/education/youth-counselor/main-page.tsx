import Link from 'next/link';

export default function YouthCounselorPage() {
  const subjects = [
    { id: 'developmental-psychology', name: '발달심리', icon: '🧠', color: 'from-emerald-500 to-green-500', questions: 25 },
    { id: 'group-counseling', name: '집단상담의 기초', icon: '👥', color: 'from-green-500 to-teal-500', questions: 25 },
    { id: 'psychological-assessment', name: '심리측정 및 평가', icon: '📊', color: 'from-teal-500 to-cyan-500', questions: 25 },
    { id: 'counseling-theory', name: '상담이론', icon: '💭', color: 'from-cyan-500 to-blue-500', questions: 25 },
    { id: 'learning-theory', name: '학습이론', icon: '📚', color: 'from-blue-500 to-indigo-500', questions: 25 },
    { id: 'practical', name: '면접', icon: '💚', color: 'from-purple-500 to-pink-500', questions: 15 },
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
            <Link href="/" className="text-gray-600 hover:text-emerald-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-emerald-600">교육</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">청소년상담사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-emerald-500 to-green-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">💚</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">청소년상담사 3급</h1>
              <p className="text-emerald-100 mt-1">Youth Counselor Level 3</p>
              <div className="flex gap-2 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가자격</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">난이도 ★★★★☆</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-emerald-600">30%</p>
            <p className="text-sm text-gray-500">합격률</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-emerald-600">대졸 이상</p>
            <p className="text-sm text-gray-500">응시자격</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-emerald-600">필기+면접</p>
            <p className="text-sm text-gray-500">시험형태</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-emerald-600">중상</p>
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
                청소년상담사는 청소년기본법에 따른 국가자격증으로, 청소년의 심리·정서적 문제를
                전문적으로 상담하고 지원하는 전문가입니다. 학교, 청소년상담복지센터, 청소년수련관 등
                다양한 현장에서 청소년의 건강한 성장을 돕는 역할을 담당합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 필기시험 과목</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {subjects.slice(0, 5).map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/education/youth-counselor/study/${subject.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:border-emerald-300 hover:bg-emerald-50 transition"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center text-white`}>
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{subject.name}</p>
                      <p className="text-xs text-gray-500">{subject.questions}문항</p>
                    </div>
                    <span className="text-emerald-500">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎤 면접시험</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">집단 면접 + 개별 면접</p>
                  <p className="text-sm text-gray-600 mt-1">상담 실무능력, 전문성, 인성 평가</p>
                </div>
                <Link
                  href="/category/education/youth-counselor/study/practical"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:border-emerald-300 hover:bg-emerald-50 transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                    💚
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">면접 준비하기</p>
                    <p className="text-xs text-gray-500">예상 질문 대비</p>
                  </div>
                  <span className="text-emerald-500">→</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📖 추천 공부 순서</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">1</span>
                  <p className="text-gray-700">발달심리 - 청소년기 발달의 기초</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">2</span>
                  <p className="text-gray-700">상담이론 - 다양한 상담 접근법</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">3</span>
                  <p className="text-gray-700">집단상담의 기초 - 집단상담 이론과 실제</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">4</span>
                  <p className="text-gray-700">심리측정 및 평가 - 심리검사 활용</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">5</span>
                  <p className="text-gray-700">학습이론 - 학습심리와 교육</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">6</span>
                  <p className="text-gray-700">면접 - 실전 면접 준비</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
              <h2 className="text-xl font-bold text-emerald-800 mb-4">🤖 AI 학습 도우미</h2>
              <p className="text-emerald-700 mb-4">각 과목별 학습 페이지에서 AI와 함께 공부하세요!</p>
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
                  <p className="text-gray-600">필기: 4월 / 면접: 6월</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">2026년 2회</p>
                  <p className="text-gray-600">필기: 8월 / 면접: 10월</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🎯 과목별 목표점수</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">발달심리</span>
                  <span className="font-medium text-emerald-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">집단상담</span>
                  <span className="font-medium text-emerald-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">심리측정</span>
                  <span className="font-medium text-emerald-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">상담이론</span>
                  <span className="font-medium text-emerald-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">학습이론</span>
                  <span className="font-medium text-emerald-600">60점 이상</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">평균</span>
                  <span className="font-bold text-emerald-600">60점 이상</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🔗 연계 자격증</h3>
              <div className="space-y-2">
                <Link href="/category/education/youth-instructor" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-emerald-600">
                  → 청소년지도사
                </Link>
                <Link href="/category/education/career-counselor" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-emerald-600">
                  → 직업상담사
                </Link>
                <Link href="/category/education/social-worker" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-emerald-600">
                  → 사회복지사
                </Link>
              </div>
            </div>

            <Link
              href="/category/education/youth-counselor/exam"
              className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-center rounded-xl font-medium hover:opacity-90 transition"
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
