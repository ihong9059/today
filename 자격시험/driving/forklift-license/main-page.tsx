import Link from 'next/link';

export default function ForkliftlicenseMainPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/driving" className="text-gray-600 hover:text-gray-600">운전·조종</Link>
            <span className="text-gray-300">›</span>
            <span className="text-gray-600 font-medium">지게차운전기능사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-gray-500 to-slate-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">📦</span>
          <h1 className="text-3xl font-bold mb-2">지게차운전기능사</h1>
          <p className="text-gray-100">물류 지게차 조종자격</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6">📚 학습과목</h2>
        <div className="grid md:grid-cols-2 gap-4">
          
            <Link href="/category/driving/forklift-license/study/forklift-theory" className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 group">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-gray-500 to-slate-600 w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl">📖</div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-gray-600">지게차 이론</h3>
                  <p className="text-gray-500 text-sm">2개 토픽</p>
                </div>
              </div>
            </Link>
            <Link href="/category/driving/forklift-license/study/forklift-safety" className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 group">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-gray-500 to-slate-600 w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl">📖</div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-gray-600">안전관리</h3>
                  <p className="text-gray-500 text-sm">1개 토픽</p>
                </div>
              </div>
            </Link>
        </div>

        <div className="mt-8">
          <Link href="/category/driving/forklift-license/exam" className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            📋 시험정보 보기
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
