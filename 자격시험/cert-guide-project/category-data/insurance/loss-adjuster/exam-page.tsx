import Link from 'next/link';

export default function LossAdjusterExamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-cyan-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/insurance" className="text-gray-600 hover:text-cyan-600">보험·부동산</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/insurance/loss-adjuster" className="text-gray-600 hover:text-cyan-600">손해사정사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">손해사정사</h1>
          <p className="text-cyan-100">시험 정보 및 일정</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험 개요</h2>
          <p className="text-gray-600">보험사고 손해액 산정 전문가 자격시험입니다.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📅 시험 일정</h2>
          <p className="text-gray-600">해당 자격증 시행기관의 공식 홈페이지에서 정확한 시험일정을 확인하세요.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 시험 과목</h2>
          <ul className="space-y-2">
            <li className="text-gray-600">• 손해사정 이론</li><li className="text-gray-600">• 재물손해사정</li><li className="text-gray-600">• 차량손해사정</li>
          </ul>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
