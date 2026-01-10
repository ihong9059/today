import Link from 'next/link';

export default function HotelmanagerExamPage() {
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
            <Link href="/category/service/hotel-manager" className="text-gray-600 hover:text-rose-600">호텔경영사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-rose-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-rose-500 to-pink-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold">호텔경영사 시험정보</h1>
          <p className="text-rose-100 mt-1">응시자격, 시험과목, 합격기준</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📋 시험 개요</h2>
            <p className="text-gray-600">한국산업인력공단 Q-Net에서 시행하는 국가기술자격시험입니다.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📝 응시자격</h2>
            <p className="text-gray-600">제한 없음 (일부 자격증은 관련 경력/학력 필요)</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📚 시험과목</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>호텔경영론</li><li>호텔마케팅</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">✅ 합격기준</h2>
            <p className="text-gray-600">필기: 과목당 40점 이상, 전체 평균 60점 이상 / 실기: 60점 이상</p>
          </div>
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
