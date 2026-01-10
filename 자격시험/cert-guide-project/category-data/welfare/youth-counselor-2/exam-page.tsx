import Link from 'next/link';

export default function Youthcounselor2ExamPage() {
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
            <Link href="/category/welfare" className="text-gray-600 hover:text-violet-600">사회복지·상담</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/welfare/youth-counselor-2" className="text-gray-600 hover:text-violet-600">청소년상담사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-500 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold">청소년상담사 2급 시험정보</h1>
          <p className="text-violet-100 mt-1">응시자격, 시험과목, 합격기준</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📋 시험 개요</h2>
            <p className="text-gray-600">한국산업인력공단 또는 해당 학회/협회에서 시행하는 국가자격/민간자격 시험입니다.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📝 응시자격</h2>
            <p className="text-gray-600">해당 자격증별 응시자격을 확인하세요. (학력, 경력, 실습시간 등)</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📚 시험과목</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>청소년발달</li><li>상담이론</li><li>집단상담</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">✅ 합격기준</h2>
            <p className="text-gray-600">각 과목 40점 이상, 전과목 평균 60점 이상 (일반적 기준)</p>
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
