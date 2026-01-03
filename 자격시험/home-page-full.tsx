import Link from 'next/link';

export default function Home() {
  const categories = [
    { id: 'law', name: '법률', icon: '⚖️', color: 'from-slate-600 to-slate-800', count: 5, hasPage: false },
    { id: 'accounting', name: '회계·세무', icon: '📊', color: 'from-emerald-500 to-teal-600', count: 10, hasPage: false },
    { id: 'finance', name: '금융', icon: '💰', color: 'from-yellow-500 to-amber-600', count: 8, hasPage: false },
    { id: 'it', name: 'IT·정보통신', icon: '💻', color: 'from-blue-500 to-cyan-500', count: 12, hasPage: false },
    { id: 'construction', name: '건축·토목', icon: '🏗️', color: 'from-orange-500 to-red-500', count: 6, hasPage: false },
    { id: 'mechanical', name: '기계·전기·전자', icon: '⚙️', color: 'from-orange-500 to-amber-500', count: 15, hasPage: true, href: '/category/mechanical' },
    { id: 'chemistry', name: '화학·환경', icon: '🧪', color: 'from-green-500 to-emerald-600', count: 5, hasPage: false },
    { id: 'safety', name: '안전·소방', icon: '🛡️', color: 'from-red-500 to-orange-500', count: 8, hasPage: false },
    { id: 'medical', name: '의료·보건', icon: '🏥', color: 'from-pink-500 to-rose-500', count: 13, hasPage: false },
    { id: 'education', name: '교육', icon: '📚', color: 'from-indigo-500 to-purple-500', count: 5, hasPage: false },
    { id: 'welfare', name: '사회복지·상담', icon: '🤝', color: 'from-violet-500 to-purple-600', count: 8, hasPage: false },
    { id: 'language', name: '언어', icon: '🗣️', color: 'from-sky-500 to-blue-600', count: 8, hasPage: false },
    { id: 'driving', name: '운전·조종', icon: '🚗', color: 'from-gray-500 to-slate-600', count: 4, hasPage: false },
    { id: 'service', name: '서비스', icon: '🍽️', color: 'from-amber-500 to-orange-500', count: 10, hasPage: false },
    { id: 'trade', name: '무역·물류', icon: '🚢', color: 'from-blue-600 to-indigo-600', count: 4, hasPage: false },
    { id: 'office', name: '사무·경영', icon: '💼', color: 'from-teal-500 to-cyan-600', count: 5, hasPage: false },
    { id: 'civil', name: '공무원', icon: '🏛️', color: 'from-slate-500 to-gray-700', count: 12, hasPage: false },
    { id: 'agriculture', name: '농림·축산', icon: '🌾', color: 'from-lime-500 to-green-600', count: 5, hasPage: false },
    { id: 'design', name: '디자인·문화', icon: '🎨', color: 'from-fuchsia-500 to-pink-600', count: 7, hasPage: false },
    { id: 'insurance', name: '보험·부동산', icon: '🏠', color: 'from-cyan-500 to-teal-500', count: 5, hasPage: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📜</span>
            <h1 className="text-2xl font-bold text-gray-800">자격시험 가이드</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="자격증 검색..."
                className="w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">한국 자격시험 종합 가이드</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-6">20개 분야 200+ 자격시험 정보와 AI 학습 도우미</p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="bg-white/20 px-4 py-2 rounded-full text-sm">
              🤖 Claude · ChatGPT · Gemini
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full text-sm">
              📖 체계적 학습 가이드
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full text-sm">
              ✅ 진행률 추적
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">분야별 자격시험</h3>
        <p className="text-gray-500 text-center mb-8">원하는 분야를 선택하세요</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            cat.hasPage ? (
              <Link
                key={cat.id}
                href={cat.href!}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group"
              >
                <div className={`bg-gradient-to-r ${cat.color} p-4 text-center`}>
                  <span className="text-4xl">{cat.icon}</span>
                </div>
                <div className="p-4 text-center">
                  <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition text-sm md:text-base">{cat.name}</h4>
                  <p className="text-gray-400 text-xs mt-1">{cat.count}개 자격증</p>
                  <div className="mt-2 text-blue-500 text-xs font-medium">
                    보기 →
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={cat.id}
                className="bg-white rounded-xl shadow-md overflow-hidden opacity-75"
              >
                <div className={`bg-gradient-to-r ${cat.color} p-4 text-center`}>
                  <span className="text-4xl">{cat.icon}</span>
                </div>
                <div className="p-4 text-center">
                  <h4 className="font-bold text-gray-800 text-sm md:text-base">{cat.name}</h4>
                  <p className="text-gray-400 text-xs mt-1">{cat.count}개 자격증</p>
                  <div className="mt-2 text-gray-400 text-xs font-medium">
                    준비중
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Active Categories Highlight */}
      <section className="bg-white py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">지금 학습 가능한 분야</h3>
          <p className="text-gray-500 text-center mb-8">AI 기반 학습 시스템이 준비되어 있습니다</p>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/category/mechanical"
              className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl">⚙️</span>
                <div>
                  <h4 className="font-bold text-xl">기계</h4>
                  <p className="text-orange-100 text-sm">기계기사, 전기기사 등</p>
                </div>
              </div>
              <div className="mt-4 text-right text-orange-100 font-medium">
                6개 자격증 →
              </div>
            </Link>

            <Link
              href="/category/electrical"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl">⚡</span>
                <div>
                  <h4 className="font-bold text-xl">전기</h4>
                  <p className="text-yellow-100 text-sm">전기기사, 전기공사기사 등</p>
                </div>
              </div>
              <div className="mt-4 text-right text-yellow-100 font-medium">
                4개 자격증 →
              </div>
            </Link>

            <Link
              href="/category/electronic"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl">📡</span>
                <div>
                  <h4 className="font-bold text-xl">전자</h4>
                  <p className="text-blue-100 text-sm">전자기사, 정보통신기사 등</p>
                </div>
              </div>
              <div className="mt-4 text-right text-blue-100 font-medium">
                5개 자격증 →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">주요 기능</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <span className="text-4xl">🤖</span>
              <h4 className="font-semibold text-lg mt-4 mb-2">AI 학습 도우미</h4>
              <p className="text-gray-600 text-sm">Claude, ChatGPT, Gemini 3가지 AI와 함께 학습</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <span className="text-4xl">📊</span>
              <h4 className="font-semibold text-lg mt-4 mb-2">상세 시험 정보</h4>
              <p className="text-gray-600 text-sm">응시자격, 시험과목, 합격률 등 모든 정보 제공</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <span className="text-4xl">📖</span>
              <h4 className="font-semibold text-lg mt-4 mb-2">과목별 체계적 학습</h4>
              <p className="text-gray-600 text-sm">AI 프롬프트 기반 효율적인 학습 시스템</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">본 사이트는 자격시험 정보 제공 목적으로 운영됩니다.</p>
        </div>
      </footer>
    </div>
  );
}
