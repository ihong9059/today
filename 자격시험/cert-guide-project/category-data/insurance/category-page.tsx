import Link from 'next/link';

const cert = {
  'damage-assessor': { name: '손해평가사', desc: '농작물재해 손해평가' },
  'housing-manager': { name: '주택관리사(보)', desc: '공동주택 관리' },
  'actuary': { name: '보험계리사', desc: '보험상품 설계 및 리스크 관리' },
  'loss-adjuster': { name: '손해사정사', desc: '보험사고 손해액 산정' },
  'insurance-broker': { name: '보험중개사', desc: '보험상품 중개' },
};

export default function InsuranceCategoryPage() {
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
            <span className="text-cyan-600 font-medium">보험·부동산</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-5xl mb-4 block">🏠</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">보험·부동산 자격시험</h1>
          <p className="text-lg text-cyan-100">보험, 부동산, 리스크관리 분야 전문자격</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/category/insurance/damage-assessor" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-4">
              <h3 className="text-xl font-bold text-white">손해평가사</h3>
              <p className="text-cyan-100 text-sm mt-1">농작물재해 손해평가</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-cyan-600">
                <span>학습 시작하기</span>
                <span>→</span>
              </div>
            </div>
          </Link>
          <Link href="/category/insurance/housing-manager" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-4">
              <h3 className="text-xl font-bold text-white">주택관리사(보)</h3>
              <p className="text-cyan-100 text-sm mt-1">공동주택 관리</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-cyan-600">
                <span>학습 시작하기</span>
                <span>→</span>
              </div>
            </div>
          </Link>
          <Link href="/category/insurance/actuary" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-4">
              <h3 className="text-xl font-bold text-white">보험계리사</h3>
              <p className="text-cyan-100 text-sm mt-1">보험상품 설계 및 리스크 관리</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-cyan-600">
                <span>학습 시작하기</span>
                <span>→</span>
              </div>
            </div>
          </Link>
          <Link href="/category/insurance/loss-adjuster" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-4">
              <h3 className="text-xl font-bold text-white">손해사정사</h3>
              <p className="text-cyan-100 text-sm mt-1">보험사고 손해액 산정</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-cyan-600">
                <span>학습 시작하기</span>
                <span>→</span>
              </div>
            </div>
          </Link>
          <Link href="/category/insurance/insurance-broker" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-4">
              <h3 className="text-xl font-bold text-white">보험중개사</h3>
              <p className="text-cyan-100 text-sm mt-1">보험상품 중개</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-cyan-600">
                <span>학습 시작하기</span>
                <span>→</span>
              </div>
            </div>
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
