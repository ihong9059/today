import Link from 'next/link';

export default function IndustrialSafetyPage() {
  const subjects = [
    { id: 'safety-management', name: '안전관리론', icon: '📋', color: 'from-red-500 to-orange-500', questions: 20 },
    { id: 'human-factors', name: '인간공학 및 시스템안전공학', icon: '🧠', color: 'from-blue-500 to-indigo-500', questions: 20 },
    { id: 'mechanical-safety', name: '기계위험방지기술', icon: '⚙️', color: 'from-gray-500 to-slate-600', questions: 20 },
    { id: 'electrical-safety', name: '전기위험방지기술', icon: '⚡', color: 'from-yellow-500 to-amber-500', questions: 20 },
    { id: 'chemical-safety', name: '화학설비위험방지기술', icon: '🧪', color: 'from-green-500 to-emerald-500', questions: 20 },
    { id: 'construction-safety', name: '건설안전기술', icon: '🏗️', color: 'from-orange-500 to-red-500', questions: 20 },
    { id: 'practical', name: '실기', icon: '🦺', color: 'from-purple-500 to-pink-500', questions: 15 },
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
            <Link href="/" className="text-gray-600 hover:text-red-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety" className="text-gray-600 hover:text-red-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">산업안전기사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🦺</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">산업안전기사</h1>
              <p className="text-red-100 mt-1">Engineer Industrial Safety</p>
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
            <p className="text-2xl font-bold text-red-600">40%</p>
            <p className="text-sm text-gray-500">합격률</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-red-600">관련학과</p>
            <p className="text-sm text-gray-500">응시자격</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-red-600">필기+실기</p>
            <p className="text-sm text-gray-500">시험형태</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-red-600">중상</p>
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
                산업안전기사는 산업현장에서 발생할 수 있는 각종 안전사고를 예방하고,
                작업환경의 안전성을 확보하는 전문 기술자격입니다. 제조업, 건설업,
                서비스업 등 다양한 산업 현장에서 안전관리자로 활동할 수 있습니다.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 필기시험 과목</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {subjects.slice(0, 6).map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/safety/industrial-safety/study/${subject.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:border-red-300 hover:bg-red-50 transition"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center text-white`}>
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{subject.name}</p>
                      <p className="text-xs text-gray-500">{subject.questions}문항</p>
                    </div>
                    <span className="text-red-500">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 실기시험</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">필답형</p>
                  <p className="text-sm text-gray-600 mt-1">산업안전 실무, 위험성평가, 안전점검 등</p>
                </div>
                <Link
                  href="/category/safety/industrial-safety/study/practical"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:border-red-300 hover:bg-red-50 transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                    🦺
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">실기 학습하기</p>
                    <p className="text-xs text-gray-500">필답형 문제 대비</p>
                  </div>
                  <span className="text-red-500">→</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📖 추천 공부 순서</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">1</span>
                  <p className="text-gray-700">안전관리론 - 안전관리의 기본 개념과 체계</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">2</span>
                  <p className="text-gray-700">인간공학 - 인적 오류 예방과 시스템안전</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">3</span>
                  <p className="text-gray-700">기계/전기/화학 위험방지 - 분야별 안전기술</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">4</span>
                  <p className="text-gray-700">건설안전 - 건설현장 특화 안전관리</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">5</span>
                  <p className="text-gray-700">실기 - 실무 문제 및 기출 문제 풀이</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
              <h2 className="text-xl font-bold text-red-800 mb-4">🤖 AI 학습 도우미</h2>
              <p className="text-red-700 mb-4">각 과목별 학습 페이지에서 AI와 함께 공부하세요!</p>
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
                  <span className="text-gray-600">안전관리론</span>
                  <span className="font-medium text-red-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">인간공학</span>
                  <span className="font-medium text-red-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">기계위험방지</span>
                  <span className="font-medium text-red-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">전기위험방지</span>
                  <span className="font-medium text-red-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">화학설비</span>
                  <span className="font-medium text-red-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">건설안전</span>
                  <span className="font-medium text-red-600">60점 이상</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">평균</span>
                  <span className="font-bold text-red-600">60점 이상</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🔗 연계 자격증</h3>
              <div className="space-y-2">
                <Link href="/category/safety/fire-equipment-mechanical" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-red-600">
                  → 소방설비기사(기계)
                </Link>
                <Link href="/category/safety/hazardous-master" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-red-600">
                  → 위험물기능장
                </Link>
                <Link href="/category/chemistry/hazardous-materials" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-red-600">
                  → 위험물산업기사
                </Link>
              </div>
            </div>

            <Link
              href="/category/safety/industrial-safety/exam"
              className="block w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-center rounded-xl font-medium hover:opacity-90 transition"
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
