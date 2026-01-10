import Link from 'next/link';

export default function TeacherCertificatePage() {
  const subjects = [
    { id: 'education-theory', name: '교육학', icon: '📚', color: 'from-indigo-500 to-purple-500', questions: 25 },
    { id: 'major-subject', name: '전공과목', icon: '📖', color: 'from-purple-500 to-pink-500', questions: 30 },
    { id: 'teaching-essay', name: '교직논술', icon: '✍️', color: 'from-blue-500 to-indigo-500', questions: 20 },
    { id: 'class-demonstration', name: '수업실연', icon: '🎭', color: 'from-violet-500 to-purple-500', questions: 15 },
    { id: 'interview', name: '면접', icon: '💬', color: 'from-pink-500 to-rose-500', questions: 15 },
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
            <span className="text-indigo-600 font-medium">교원자격증</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">👨‍🏫</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">교원자격증 (초등/중등/특수)</h1>
              <p className="text-indigo-100 mt-1">Teacher Certificate</p>
              <div className="flex gap-2 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가자격증</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">난이도 ★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">임용시험</p>
            <p className="text-sm text-gray-500">취득 방법</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">2단계</p>
            <p className="text-sm text-gray-500">시험 전형</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">교대/사범대</p>
            <p className="text-sm text-gray-500">응시자격</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">매우 높음</p>
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
                교원자격증은 초등학교, 중학교, 고등학교에서 교사로 근무하기 위해 반드시 필요한 국가자격증입니다.
                초등교사는 교육대학 졸업, 중등교사는 사범대학 졸업 또는 일반대학 교직이수, 특수교사는 특수교육과 졸업 후
                각각 임용시험에 합격해야 정교사로 임용될 수 있습니다.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 임용시험 과목</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {subjects.slice(0, 4).map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/education/teacher-certificate/study/${subject.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:border-indigo-300 hover:bg-indigo-50 transition"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${subject.color} flex items-center justify-center text-white`}>
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{subject.name}</p>
                      <p className="text-xs text-gray-500">1차/2차 시험</p>
                    </div>
                    <span className="text-indigo-500">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 2차 시험</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">수업실연</p>
                  <p className="text-sm text-gray-600 mt-1">실제 수업 시연 및 교수능력 평가</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">면접</p>
                  <p className="text-sm text-gray-600 mt-1">교직관, 인성, 상황대처 능력 평가</p>
                </div>
                <Link
                  href="/category/education/teacher-certificate/study/interview"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:border-indigo-300 hover:bg-indigo-50 transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white">
                    💬
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
                  <p className="text-gray-700">교육학 - 교육의 기본 이론과 철학</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">2</span>
                  <p className="text-gray-700">전공과목 - 해당 과목의 전문 지식</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">3</span>
                  <p className="text-gray-700">교직논술 - 논리적 사고와 글쓰기</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">4</span>
                  <p className="text-gray-700">수업실연 - 교수학습 방법 실습</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">5</span>
                  <p className="text-gray-700">면접 - 교직관 및 인성 준비</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <h2 className="text-xl font-bold text-indigo-800 mb-4">AI 학습 도우미</h2>
              <p className="text-indigo-700 mb-4">각 과목별 학습 페이지에서 AI와 함께 공부하세요!</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Claude</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">ChatGPT</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Gemini</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">📅 자격 취득 절차</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">1단계</p>
                  <p className="text-gray-600">교육대학/사범대학 졸업 또는 교직이수</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">2단계</p>
                  <p className="text-gray-600">교원자격증 취득 (2급 정교사)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">3단계</p>
                  <p className="text-gray-600">임용시험 1차 합격 (필기시험)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">4단계</p>
                  <p className="text-gray-600">임용시험 2차 합격 (수업실연·면접)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">5단계</p>
                  <p className="text-gray-600">공립학교 정교사 임용</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🎯 자격 종류</h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">초등교사</p>
                  <p className="text-gray-600">교육대학 졸업</p>
                  <p className="text-gray-600 text-xs mt-1">전 과목 교육</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">중등교사</p>
                  <p className="text-gray-600">사범대학 또는 교직이수</p>
                  <p className="text-gray-600 text-xs mt-1">과목별 전공 (국어, 수학, 영어 등)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">특수교사</p>
                  <p className="text-gray-600">특수교육과 졸업</p>
                  <p className="text-gray-600 text-xs mt-1">특수교육 대상 학생 교육</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">🔗 진로 및 전망</h3>
              <div className="space-y-2">
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 공립 초·중·고등학교 교사
                </div>
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 사립학교 교사
                </div>
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 특수학교 교사
                </div>
                <div className="block p-2 rounded bg-gray-50 text-sm text-gray-600">
                  → 교육전문직 (장학사, 연구사)
                </div>
              </div>
            </div>

            <Link
              href="/category/education/teacher-certificate/exam"
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
