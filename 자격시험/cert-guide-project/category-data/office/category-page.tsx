import Link from 'next/link';

export default function OfficeCategoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-violet-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">사무·경영</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-500 to-purple-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">💼</span>
          <h1 className="text-3xl font-bold mb-2">사무·경영</h1>
          <p className="text-violet-100">사무, 컴퓨터, 비서 분야 자격증 9개</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            <Link href="/category/office/word-processor" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 text-center">
                <span className="text-5xl">📄</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">워드프로세서</h3>
                <p className="text-gray-500 text-sm mt-1">대한상공회의소 문서작성 전문 자격</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/office/computer-skills-1" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 text-center">
                <span className="text-5xl">💻</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">컴퓨터활용능력 1급</h3>
                <p className="text-gray-500 text-sm mt-1">대한상공회의소 컴퓨터활용 최상위 자격</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/office/computer-skills-2" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 text-center">
                <span className="text-5xl">🖥️</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">컴퓨터활용능력 2급</h3>
                <p className="text-gray-500 text-sm mt-1">대한상공회의소 컴퓨터활용 중급 자격</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/office/office-automation" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 text-center">
                <span className="text-5xl">⚙️</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">사무자동화산업기사</h3>
                <p className="text-gray-500 text-sm mt-1">한국산업인력공단 사무자동화 전문 자격</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/office/ecommerce-1" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 text-center">
                <span className="text-5xl">🛒</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">전자상거래관리사 1급</h3>
                <p className="text-gray-500 text-sm mt-1">대한상공회의소 전자상거래 최상위 자격</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/office/ecommerce-2" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 text-center">
                <span className="text-5xl">🖱️</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">전자상거래관리사 2급</h3>
                <p className="text-gray-500 text-sm mt-1">대한상공회의소 전자상거래 중급 자격</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/office/secretary-1" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 text-center">
                <span className="text-5xl">👔</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">비서 1급</h3>
                <p className="text-gray-500 text-sm mt-1">대한상공회의소 비서 최상위 자격</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/office/secretary-2" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 text-center">
                <span className="text-5xl">👩‍💼</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">비서 2급</h3>
                <p className="text-gray-500 text-sm mt-1">대한상공회의소 비서 중급 자격</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/office/secretary-3" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6 text-center">
                <span className="text-5xl">📋</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">비서 3급</h3>
                <p className="text-gray-500 text-sm mt-1">대한상공회의소 비서 초급 자격</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
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
