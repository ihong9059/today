import Link from 'next/link';

export default function DamageAssessorMainPage() {
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
            <span className="text-cyan-600 font-medium">손해평가사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">손해평가사</h1>
          <p className="text-lg text-cyan-100">농작물재해 손해평가 전문가</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex gap-4 mb-8">
          <Link href="/category/insurance/damage-assessor/exam" className="flex-1 bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <span className="text-3xl">📋</span>
            <h3 className="font-semibold mt-2">시험정보</h3>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 과목별 학습</h2>
        <div className="grid gap-4">
          <Link href="/category/insurance/damage-assessor/study/crop-damage" className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-cyan-500">
            <h3 className="text-lg font-semibold text-gray-800">농작물재해보험</h3>
            <p className="text-gray-500 text-sm mt-2">학습 시작하기 →</p>
          </Link>
          <Link href="/category/insurance/damage-assessor/study/assessment-practice" className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-cyan-500">
            <h3 className="text-lg font-semibold text-gray-800">손해평가 실무</h3>
            <p className="text-gray-500 text-sm mt-2">학습 시작하기 →</p>
          </Link>
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
