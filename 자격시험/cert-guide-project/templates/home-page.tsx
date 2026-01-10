import Link from 'next/link';

export default function Home() {
  const categories = [
    { id: 'mechanical', name: '기계', icon: '⚙️', color: 'from-orange-500 to-amber-500', count: 6, href: '/category/mechanical' },
    { id: 'electrical', name: '전기', icon: '⚡', color: 'from-yellow-500 to-orange-500', count: 4, href: '/category/electrical' },
    { id: 'electronic', name: '전자', icon: '📡', color: 'from-blue-500 to-indigo-500', count: 5, href: '/category/electronic' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📜</span>
            <h1 className="text-2xl font-bold text-gray-800">자격시험 가이드</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
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
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">기계·전기·전자 자격시험 가이드</h2>
          <p className="text-xl text-blue-100 mb-8">AI 학습 도우미와 함께 효율적으로 자격증을 준비하세요</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              분야별 탐색
            </button>
            <button className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              AI 학습 가이드
            </button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">분야 선택</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden group"
            >
              <div className={`bg-gradient-to-r ${cat.color} p-8 text-center`}>
                <span className="text-6xl">{cat.icon}</span>
              </div>
              <div className="p-6 text-center">
                <h4 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition">{cat.name}</h4>
                <p className="text-gray-500 mt-2">{cat.count}개 자격증</p>
                <div className="mt-4 text-blue-500 font-medium">
                  자격증 보기 →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">주요 기능</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <span className="text-4xl">🤖</span>
              <h4 className="font-semibold text-lg mt-4 mb-2">AI 학습 도우미</h4>
              <p className="text-gray-600 text-sm">Claude, ChatGPT, Gemini와 함께 학습하세요</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <span className="text-4xl">📊</span>
              <h4 className="font-semibold text-lg mt-4 mb-2">상세 시험 정보</h4>
              <p className="text-gray-600 text-sm">응시자격, 시험과목, 합격률 등 모든 정보</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <span className="text-4xl">📖</span>
              <h4 className="font-semibold text-lg mt-4 mb-2">과목별 학습</h4>
              <p className="text-gray-600 text-sm">AI 프롬프트 기반 체계적 학습</p>
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
