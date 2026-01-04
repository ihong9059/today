import Link from 'next/link';

export default function TradeCategoryPage() {
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
            <span className="text-teal-600 font-medium">무역·물류</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">📦</span>
          <h1 className="text-3xl font-bold mb-2">무역·물류</h1>
          <p className="text-teal-100">무역, 유통, 물류 분야 자격증 8개</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            <Link href="/category/trade/trade-english-1" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-center">
                <span className="text-5xl">📧</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-teal-600">무역영어 1급</h3>
                <p className="text-gray-500 text-sm mt-1">대한상공회의소 무역실무 영어 최상위 자격</p>
                <div className="mt-3 text-teal-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/trade/trade-english-2" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-center">
                <span className="text-5xl">✉️</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-teal-600">무역영어 2급</h3>
                <p className="text-gray-500 text-sm mt-1">대한상공회의소 무역실무 영어 중급 자격</p>
                <div className="mt-3 text-teal-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/trade/trade-english-3" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-center">
                <span className="text-5xl">📝</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-teal-600">무역영어 3급</h3>
                <p className="text-gray-500 text-sm mt-1">대한상공회의소 무역실무 영어 초급 자격</p>
                <div className="mt-3 text-teal-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/trade/international-trader" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-center">
                <span className="text-5xl">🌐</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-teal-600">국제무역사</h3>
                <p className="text-gray-500 text-sm mt-1">한국무역협회 무역전문가 자격</p>
                <div className="mt-3 text-teal-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/trade/distribution-manager-1" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-center">
                <span className="text-5xl">🏪</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-teal-600">유통관리사 1급</h3>
                <p className="text-gray-500 text-sm mt-1">대한상공회의소 유통전문가 최상위 자격</p>
                <div className="mt-3 text-teal-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/trade/distribution-manager-2" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-center">
                <span className="text-5xl">🛒</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-teal-600">유통관리사 2급</h3>
                <p className="text-gray-500 text-sm mt-1">대한상공회의소 유통관리 중급 자격</p>
                <div className="mt-3 text-teal-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/trade/distribution-manager-3" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-center">
                <span className="text-5xl">🏬</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-teal-600">유통관리사 3급</h3>
                <p className="text-gray-500 text-sm mt-1">대한상공회의소 유통관리 초급 자격</p>
                <div className="mt-3 text-teal-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/trade/logistics-manager" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-center">
                <span className="text-5xl">📦</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-teal-600">물류관리사</h3>
                <p className="text-gray-500 text-sm mt-1">한국산업인력공단 물류전문가 자격</p>
                <div className="mt-3 text-teal-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
