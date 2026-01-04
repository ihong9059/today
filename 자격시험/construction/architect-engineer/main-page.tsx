import Link from 'next/link';

export default function ArchitectEngineerPage() {
  const subjects = [
    { id: 'building-planning', name: '건축계획', icon: '📋', desc: '건축물 기획 및 설계', color: 'from-orange-500 to-red-500' },
    { id: 'building-structure', name: '건축구조', icon: '🏗️', desc: '건축물 구조 설계', color: 'from-amber-500 to-orange-500' },
    { id: 'building-equipment', name: '건축설비', icon: '🔧', desc: '급배수, 냉난방, 환기', color: 'from-yellow-500 to-amber-500' },
    { id: 'building-construction', name: '건축시공', icon: '👷', desc: '건축물 시공 관리', color: 'from-teal-500 to-cyan-500' },
    { id: 'practical', name: '실기', icon: '✍️', desc: '건축 설계 및 적산', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction" className="text-gray-600 hover:text-orange-600">건축·토목</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">건축기사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">🏛️</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">건축기사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
              </div>
              <p className="text-orange-100 text-lg mb-4">Architect Engineer</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: ★★★★☆</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 4만명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 필기 30% / 실기 25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <Link href="/category/construction/architect-engineer/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-orange-300 border-2 border-transparent transition">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">필기</p>
            <p className="font-bold text-gray-800">4과목 100문항</p>
            <p className="text-xs text-gray-400">2시간 30분</p>
            <p className="text-xs text-orange-500 mt-2 font-medium">상세보기 →</p>
          </Link>
          <Link href="/category/construction/architect-engineer/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-orange-300 border-2 border-transparent transition">
            <span className="text-2xl">✍️</span>
            <p className="text-gray-500 text-sm mt-2">실기</p>
            <p className="font-bold text-gray-800">필답형+작업형</p>
            <p className="text-xs text-gray-400">약 6시간</p>
            <p className="text-xs text-orange-500 mt-2 font-medium">상세보기 →</p>
          </Link>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-gray-500 text-sm mt-2">응시료</p>
            <p className="font-bold text-gray-800">필기 19,400원</p>
            <p className="text-xs text-gray-400">실기 27,600원</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">🏢</span>
            <p className="text-gray-500 text-sm mt-2">주관</p>
            <p className="font-bold text-gray-800">한국산업인력공단</p>
            <p className="text-xs text-gray-400">Q-Net</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                건축기사는 건축물의 계획, 설계, 시공, 감리 등에 관한 전문지식과 기술을 갖추고,
                건축물의 안전하고 기능적인 설계와 시공을 담당하는 국가기술자격입니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-800 mb-2">주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 건축물 설계 및 도면 작성</li>
                    <li>• 건축 구조 계산 및 검토</li>
                    <li>• 시공 현장 관리 및 감독</li>
                    <li>• 건축 적산 및 견적</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">취업 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 건축설계사무소</li>
                    <li>• 건설회사</li>
                    <li>• 공공기관 건축직</li>
                    <li>• 감리회사</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 응시자격 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📌</span> 응시자격
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl">🎓</span>
                  <div>
                    <p className="font-medium text-gray-800">관련학과 졸업자</p>
                    <p className="text-sm text-gray-600">건축, 건축공학, 실내건축 등 관련학과 졸업(예정)자</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl">💼</span>
                  <div>
                    <p className="font-medium text-gray-800">실무경력자</p>
                    <p className="text-sm text-gray-600">동일 및 유사 직무분야 4년 이상 실무경력자</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl">📜</span>
                  <div>
                    <p className="font-medium text-gray-800">산업기사 자격 보유자</p>
                    <p className="text-sm text-gray-600">건축산업기사 + 1년 실무경력</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Study Subjects */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-orange-500">📚</span> 과목별 학습
            </h2>
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/category/construction/architect-engineer/study/${subject.id}`}
                className={`block bg-gradient-to-r ${subject.color} rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-1`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{subject.icon}</span>
                  <div>
                    <h3 className="font-bold">{subject.name}</h3>
                    <p className="text-sm opacity-80">{subject.desc}</p>
                  </div>
                </div>
                <div className="mt-2 text-right text-sm opacity-80">학습하기 →</div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
