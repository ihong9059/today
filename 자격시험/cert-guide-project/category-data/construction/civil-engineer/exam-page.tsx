import Link from 'next/link';

export default function CivilengineerExamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-amber-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction" className="text-gray-600 hover:text-amber-600">건축·토목</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction/civil-engineer" className="text-gray-600 hover:text-amber-600">토목기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-amber-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold">토목기사 시험정보</h1>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">시험 과목</h2>
          <ul className="space-y-2">
            <li className="text-gray-600">• 응용역학</li><li className="text-gray-600">• 측량학</li><li className="text-gray-600">• 수리학</li><li className="text-gray-600">• 토질 및 기초</li><li className="text-gray-600">• 철근콘크리트</li><li className="text-gray-600">• 실기</li>
          </ul>
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
