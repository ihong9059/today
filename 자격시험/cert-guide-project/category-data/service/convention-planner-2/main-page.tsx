import Link from 'next/link';

export default function Conventionplanner2MainPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-rose-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/service" className="text-gray-600 hover:text-rose-600">서비스</Link>
            <span className="text-gray-300">›</span>
            <span className="text-rose-600 font-medium">컨벤션기획사2급</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-rose-500 to-pink-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">📋</span>
          <h1 className="text-3xl font-bold mb-2">컨벤션기획사2급</h1>
          <p className="text-rose-100">국제회의 실무 자격증</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6">📚 학습과목</h2>
        <div className="grid md:grid-cols-2 gap-4">
          
            <Link href="/category/service/convention-planner-2/study/convention-basic-2" className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 group">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-rose-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl">📖</div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-rose-600">컨벤션 기초</h3>
                  <p className="text-gray-500 text-sm">2개 토픽</p>
                </div>
              </div>
            </Link>
            <Link href="/category/service/convention-planner-2/study/convention-practice" className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 group">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-rose-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl">📖</div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-rose-600">실무지식</h3>
                  <p className="text-gray-500 text-sm">1개 토픽</p>
                </div>
              </div>
            </Link>
        </div>

        <div className="mt-8">
          <Link href="/category/service/convention-planner-2/exam" className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-lg hover:bg-rose-200 transition">
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
