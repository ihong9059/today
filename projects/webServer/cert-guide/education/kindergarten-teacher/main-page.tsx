import Link from 'next/link';

export default function KindergartenTeacherPage() {
  const subjects = [
    { id: 'early-childhood-education', name: '유아교육론', icon: '📚', color: 'from-indigo-500 to-purple-500', questions: 25 },
    { id: 'child-development', name: '유아발달', icon: '🧒', color: 'from-purple-500 to-pink-500', questions: 25 },
    { id: 'curriculum', name: '유아교육과정', icon: '📖', color: 'from-blue-500 to-indigo-500', questions: 25 },
    { id: 'teaching-methods', name: '유아교육방법론', icon: '🎓', color: 'from-violet-500 to-purple-500', questions: 25 },
    { id: 'interview', name: '면접', icon: '🎯', color: 'from-pink-500 to-rose-500', questions: 15 },
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
            <span className="text-indigo-600 font-medium">유치원정교사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">🧒</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">유치원정교사</h1>
              <p className="text-indigo-100 mt-1">Kindergarten Teacher Certificate</p>
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
            <p className="text-2xl font-bold text-indigo-600">유아교육과</p>
            <p className="text-sm text-gray-500">응시 자격</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">임용시험</p>
            <p className="text-sm text-gray-500">취득 방법</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">1급/2급</p>
            <p className="text-sm text-gray-500">자격 등급</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">4/5</p>
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
                유치원정교사는 유치원 교육법에 의거하여 유치원에서 유아를 교육하는 국가자격증입니다.
                유아교육과를 졸업하면 2급 정교사 자격을 취득할 수 있으며, 공립 유치원 교사가 되기 위해서는
                교육청 주관 임용시험에 합격해야 합니다. 사립 유치원은 자격증만으로 지원 가능합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 임용시험 과목</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {subjects.slice(0, 4).map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/education/kindergarten-teacher/study/${subject.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:border-indigo-300 hover:bg-indigo-50 transition"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center text-white`}>
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{subject.name}</p>
                      <p className="text-xs text-gray-500">1차 시험</p>
                    </div>
                    <span className="text-indigo-500">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 2차 시험 - 면접</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">교직 인성 및 적성</p>
                  <p className="text-sm text-gray-600 mt-1">유아교육관, 교직관, 교육철학 등</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">교육 상황 대처 능력</p>
                  <p className="text-sm text-gray-600 mt-1">문제 상황 판단, 교육적 해결 방안 제시</p>
                </div>
                <Link
                  href="/category/education/kindergarten-teacher/study/interview"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:border-indigo-300 hover:bg-indigo-50 transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white">
                    🎯
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">면접 학습하기</p>
                    <p className="text-xs text-gray-500">2차 시험 대비</p>
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
                  <p className="text-gray-700">유아교육론 - 유아교육의 기본 철학과 이론</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">2</span>
                  <p className="text-gray-700">유아발달 - 발달 이론과 영역별 발달</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">3</span>
                  <p className="text-gray-700">유아교육과정 - 누리과정, 교육과정 운영</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">4</span>
                  <p className="text-gray-700">유아교육방법론 - 놀이, 교수학습 방법</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">5</span>
                  <p className="text-gray-700">면접 - 교직 인성 및 상황 대처 능력</p>
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
                  <p className="text-gray-600">유아교육과 진학 (전문대 또는 4년제)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">2단계</p>
                  <p className="text-gray-600">교직 이수 및 전공 필수 과목 이수</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">3단계</p>
                  <p className="text-gray-600">교육실습 4주 이수</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">4단계</p>
                  <p className="text-gray-600">졸업 후 2급 정교사 자격증 신청</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">5단계 (선택)</p>
                  <p className="text-gray-600">교육청 임용시험 응시 (공립)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🎯 응시 자격</h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">2급 정교사</p>
                  <p className="text-gray-600">유아교육과 졸업 (전문대 이상)</p>
                  <p className="text-gray-600 text-xs mt-1">교직 과목 이수 + 교육실습</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">1급 정교사</p>
                  <p className="text-gray-600">2급 취득 후 3년 경력</p>
                  <p className="text-gray-600 text-xs mt-1">+ 승급연수 180시간 이수</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">임용시험</p>
                  <p className="text-gray-600">2급 정교사 자격증 소지자</p>
                  <p className="text-gray-600 text-xs mt-1">1차 필기 + 2차 면접</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🔗 진로 및 취업</h3>
              <div className="space-y-2">
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 공립 유치원 교사 (임용)
                </div>
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 사립 유치원 교사
                </div>
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 어린이집 원장 자격 취득 가능
                </div>
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 유아교육 관련 연구기관
                </div>
              </div>
            </div>

            <Link
              href="/category/education/kindergarten-teacher/exam"
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
