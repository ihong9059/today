import Link from 'next/link';

export default function LibrarianTeacherPage() {
  const subjects = [
    { id: 'library-management', name: '도서관경영', icon: '📊', color: 'from-blue-500 to-indigo-500', questions: 20 },
    { id: 'information-organization', name: '정보조직론', icon: '📑', color: 'from-indigo-500 to-purple-500', questions: 20 },
    { id: 'information-service', name: '정보서비스론', icon: '🔍', color: 'from-purple-500 to-pink-500', questions: 20 },
    { id: 'reading-education', name: '독서교육론', icon: '📖', color: 'from-pink-500 to-rose-500', questions: 20 },
    { id: 'school-library', name: '학교도서관운영', icon: '🏫', color: 'from-violet-500 to-purple-500', questions: 20 },
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
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-blue-600">교육</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">사서교사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">📚</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">사서교사 임용시험</h1>
              <p className="text-blue-100 mt-1">Librarian Teacher Certificate</p>
              <div className="flex gap-2 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">교원임용</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">난이도 ★★★★☆</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">문헌정보학</p>
            <p className="text-sm text-gray-500">전공 요건</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">교직이수</p>
            <p className="text-sm text-gray-500">응시자격</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">5과목</p>
            <p className="text-sm text-gray-500">시험 과목</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">상</p>
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
                사서교사는 학교도서관에서 학생들의 독서교육과 정보활용교육을 담당하는 교원입니다.
                문헌정보학 전공에 교직과정을 이수하거나 교육대학원 사서교육전공을 통해 응시자격을 얻을 수 있으며,
                각 시도교육청에서 실시하는 임용시험에 합격해야 합니다. 학교 교육과정 운영, 독서교육 프로그램 기획,
                정보자료 관리 등의 업무를 수행합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 임용시험 과목</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {subjects.map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/education/librarian-teacher/study/${subject.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:border-blue-300 hover:bg-blue-50 transition"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center text-white`}>
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{subject.name}</p>
                      <p className="text-xs text-gray-500">{subject.questions}문항</p>
                    </div>
                    <span className="text-blue-500">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📖 추천 공부 순서</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</span>
                  <p className="text-gray-700">정보조직론 - 분류, 목록의 기초 이론</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">2</span>
                  <p className="text-gray-700">정보서비스론 - 참고봉사와 정보검색</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">3</span>
                  <p className="text-gray-700">도서관경영 - 도서관 운영 및 관리</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">4</span>
                  <p className="text-gray-700">독서교육론 - 독서지도와 프로그램</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">5</span>
                  <p className="text-gray-700">학교도서관운영 - 학교도서관 특화 실무</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h2 className="text-xl font-bold text-blue-800 mb-4">🤖 AI 학습 도우미</h2>
              <p className="text-blue-700 mb-4">각 과목별 학습 페이지에서 AI와 함께 공부하세요!</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">🧡 Claude</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">💚 ChatGPT</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">💙 Gemini</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">📅 응시 절차</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">1단계</p>
                  <p className="text-gray-600">문헌정보학과 진학 또는 복수전공</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">2단계</p>
                  <p className="text-gray-600">교직과정 이수 (22학점 이상)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">3단계</p>
                  <p className="text-gray-600">교육실습 4주 이수</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">4단계</p>
                  <p className="text-gray-600">교원자격증 취득</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">5단계</p>
                  <p className="text-gray-600">각 시도교육청 임용시험 응시</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🎯 응시 자격</h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">정규 과정</p>
                  <p className="text-gray-600">문헌정보학과 + 교직이수</p>
                  <p className="text-gray-600 text-xs mt-1">4년제 대학 문헌정보학 전공</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">교육대학원</p>
                  <p className="text-gray-600">사서교육전공 석사과정</p>
                  <p className="text-gray-600 text-xs mt-1">2급 정사서 자격 소지자</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🔗 관련 분야</h3>
              <div className="space-y-2">
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 초중고 학교도서관
                </div>
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 독서교육 프로그램 개발
                </div>
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 정보활용교육 강사
                </div>
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 사서직 공무원 (도서관)
                </div>
              </div>
            </div>

            <Link
              href="/category/education/librarian-teacher/exam"
              className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:opacity-90 transition"
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
