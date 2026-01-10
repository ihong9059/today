import Link from 'next/link';

export default function YouthInstructor1Page() {
  const subjects = [
    { id: 'research-method', name: '청소년연구방법론', icon: '📊', color: 'from-green-500 to-teal-500', questions: 25 },
    { id: 'rights-participation', name: '청소년인권과참여', icon: '✊', color: 'from-blue-500 to-cyan-500', questions: 25 },
    { id: 'policy', name: '청소년정책론', icon: '📋', color: 'from-purple-500 to-pink-500', questions: 25 },
    { id: 'institution-management', name: '청소년기관운영', icon: '🏢', color: 'from-orange-500 to-amber-500', questions: 25 },
    { id: 'instructor-theory', name: '청소년지도자론', icon: '👨‍🏫', color: 'from-teal-500 to-emerald-500', questions: 25 },
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
            <span className="text-green-600 font-medium">청소년지도사 1급</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🏆</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">청소년지도사 1급</h1>
              <p className="text-green-100 mt-1">Youth Instructor Level 1</p>
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
            <p className="text-2xl font-bold text-green-600">35%</p>
            <p className="text-sm text-gray-500">합격률</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">2급+3년</p>
            <p className="text-sm text-gray-500">응시자격</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">필기+면접</p>
            <p className="text-sm text-gray-500">시험형태</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">상</p>
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
                청소년지도사 1급은 청소년지도사 자격의 최고 등급으로, 청소년 수련시설 및 단체에서
                관리자 또는 책임자 역할을 수행합니다. 2급 자격 취득 후 청소년활동 분야 3년 이상의
                실무 경력이 있는 전문가를 대상으로 하며, 청소년정책 수립, 연구, 기관 운영 등
                고급 전문성을 평가합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 필기시험 과목</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {subjects.slice(0, 5).map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/education/youth-instructor-1/study/${subject.id}`}
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
                  <p className="text-sm text-gray-600 mt-1">청소년정책 수립, 연구능력, 기관운영 전문성 평가</p>
                </div>
                <Link
                  href="/category/education/youth-instructor-1/study/practical"
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
                  <p className="text-gray-700">청소년정책론 - 정책 수립과 평가의 이해</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">2</span>
                  <p className="text-gray-700">청소년연구방법론 - 연구 설계와 분석 기법</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">3</span>
                  <p className="text-gray-700">청소년인권과참여 - 권리 보장과 참여 활성화</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">4</span>
                  <p className="text-gray-700">청소년기관운영 - 조직관리와 예산 운영</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">5</span>
                  <p className="text-gray-700">청소년지도자론 - 리더십과 전문성 개발</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">6</span>
                  <p className="text-gray-700">면접 - 정책과 운영 실무 역량 준비</p>
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
                  <span className="text-gray-600">청소년연구방법론</span>
                  <span className="font-medium text-green-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">청소년인권과참여</span>
                  <span className="font-medium text-green-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">청소년정책론</span>
                  <span className="font-medium text-green-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">청소년기관운영</span>
                  <span className="font-medium text-green-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">청소년지도자론</span>
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
                <p>• 2급 청소년지도사 자격 취득</p>
                <p>• 청소년활동 분야 3년 이상 경력</p>
                <p>• 청소년 수련시설 또는 단체 근무</p>
              </div>
            </div>

            <Link
              href="/category/education/youth-instructor-1/exam"
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
