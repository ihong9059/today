import Link from 'next/link';

export default function EnvironmentalEngineerPage() {
  const subjects = [
    { id: 'environmental-engineering', name: '환경공학개론', icon: '🌍', color: 'from-teal-500 to-green-500', questions: 20 },
    { id: 'air-pollution', name: '대기오염방지기술', icon: '💨', color: 'from-sky-500 to-blue-500', questions: 20 },
    { id: 'water-pollution', name: '수질오염방지기술', icon: '💧', color: 'from-blue-500 to-cyan-500', questions: 20 },
    { id: 'waste-management', name: '폐기물처리', icon: '♻️', color: 'from-green-500 to-lime-500', questions: 20 },
    { id: 'noise-vibration', name: '소음진동', icon: '📢', color: 'from-purple-500 to-pink-500', questions: 20 },
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
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry" className="text-gray-600 hover:text-teal-600">화학·환경</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">환경기사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-500 to-green-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🌿</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">환경기사</h1>
              <p className="text-teal-100 mt-1">Engineer Environment</p>
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
            <p className="text-2xl font-bold text-teal-600">30%</p>
            <p className="text-sm text-gray-500">합격률</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-teal-600">관련학과</p>
            <p className="text-sm text-gray-500">응시자격</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-teal-600">필기+실기</p>
            <p className="text-sm text-gray-500">시험형태</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-teal-600">상</p>
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
                환경기사는 대기, 수질, 폐기물, 소음·진동 등 환경오염 전반에 대한
                방지시설의 설계, 시공, 운영 업무를 수행하는 전문 기술자격입니다.
                환경컨설팅, 환경영향평가, 환경관련 기업에서 필수적인 자격증입니다.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 필기시험 과목</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {subjects.slice(0, 5).map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/chemistry/environmental-engineer/study/${subject.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:border-teal-300 hover:bg-teal-50 transition"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center text-white`}>
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{subject.name}</p>
                      <p className="text-xs text-gray-500">{subject.questions}문항</p>
                    </div>
                    <span className="text-teal-500">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 실기시험</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">필답형 + 작업형</p>
                  <p className="text-sm text-gray-600 mt-1">환경오염방지 실무, 설계 계산, 분석</p>
                </div>
                <Link
                  href="/category/chemistry/environmental-engineer/study/practical"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:border-teal-300 hover:bg-teal-50 transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white">
                    🧪
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">실기 학습하기</p>
                    <p className="text-xs text-gray-500">실무 문제 대비</p>
                  </div>
                  <span className="text-teal-500">→</span>
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-6 border border-teal-200">
              <h2 className="text-xl font-bold text-teal-800 mb-4">🤖 AI 학습 도우미</h2>
              <p className="text-teal-700 mb-4">각 과목별 학습 페이지에서 AI와 함께 공부하세요!</p>
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
                  <span className="text-gray-600">환경공학개론</span>
                  <span className="font-medium text-teal-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">대기오염방지기술</span>
                  <span className="font-medium text-teal-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">수질오염방지기술</span>
                  <span className="font-medium text-teal-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">폐기물처리</span>
                  <span className="font-medium text-teal-600">60점 이상</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">소음진동</span>
                  <span className="font-medium text-teal-600">60점 이상</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">평균</span>
                  <span className="font-bold text-teal-600">60점 이상</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🔗 연계 자격증</h3>
              <div className="space-y-2">
                <Link href="/category/chemistry/air-environment" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-teal-600">
                  → 대기환경기사
                </Link>
                <Link href="/category/chemistry/water-environment" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-teal-600">
                  → 수질환경기사
                </Link>
                <Link href="/category/chemistry/chemical-analyst" className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-600 hover:text-teal-600">
                  → 화학분석기사
                </Link>
              </div>
            </div>

            <Link
              href="/category/chemistry/environmental-engineer/exam"
              className="block w-full py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white text-center rounded-xl font-medium hover:opacity-90 transition"
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
