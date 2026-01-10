import Link from 'next/link';

export default function DrivingCategoryPage() {
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
            <span className="text-gray-600 font-medium">운전·조종</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-gray-500 to-slate-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">🚗</span>
          <h1 className="text-3xl font-bold mb-2">운전·조종</h1>
          <p className="text-gray-100">자동차, 건설기계, 선박, 항공 조종면허 10개</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            <Link href="/category/driving/driver-license-1-normal" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-gray-500 to-slate-600 p-6 text-center">
                <span className="text-5xl">🚗</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-600">1종 보통면허</h3>
                <p className="text-gray-500 text-sm mt-1">승용차, 승합차(15인 이하), 화물차(12톤 미만)</p>
                <div className="mt-3 text-gray-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/driving/driver-license-2-normal" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-gray-500 to-slate-600 p-6 text-center">
                <span className="text-5xl">🚙</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-600">2종 보통면허</h3>
                <p className="text-gray-500 text-sm mt-1">승용차, 승합차(10인 이하), 화물차(4톤 이하)</p>
                <div className="mt-3 text-gray-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/driving/driver-license-1-large" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-gray-500 to-slate-600 p-6 text-center">
                <span className="text-5xl">🚛</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-600">1종 대형면허</h3>
                <p className="text-gray-500 text-sm mt-1">승합차(16인 이상), 화물차(12톤 이상), 건설기계</p>
                <div className="mt-3 text-gray-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/driving/driver-license-1-special" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-gray-500 to-slate-600 p-6 text-center">
                <span className="text-5xl">🚜</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-600">1종 특수면허</h3>
                <p className="text-gray-500 text-sm mt-1">트레일러, 레커, 특수작업차량</p>
                <div className="mt-3 text-gray-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/driving/excavator-license" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-gray-500 to-slate-600 p-6 text-center">
                <span className="text-5xl">🏗️</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-600">굴삭기운전기능사</h3>
                <p className="text-gray-500 text-sm mt-1">건설기계 굴삭기 조종자격</p>
                <div className="mt-3 text-gray-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/driving/forklift-license" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-gray-500 to-slate-600 p-6 text-center">
                <span className="text-5xl">📦</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-600">지게차운전기능사</h3>
                <p className="text-gray-500 text-sm mt-1">물류 지게차 조종자격</p>
                <div className="mt-3 text-gray-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/driving/crane-license" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-gray-500 to-slate-600 p-6 text-center">
                <span className="text-5xl">🏗️</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-600">기중기운전기능사</h3>
                <p className="text-gray-500 text-sm mt-1">건설기계 기중기(크레인) 조종자격</p>
                <div className="mt-3 text-gray-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/driving/boat-license" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-gray-500 to-slate-600 p-6 text-center">
                <span className="text-5xl">⛵</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-600">소형선박조종사</h3>
                <p className="text-gray-500 text-sm mt-1">5톤 미만 소형선박 조종면허</p>
                <div className="mt-3 text-gray-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/driving/yacht-license" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-gray-500 to-slate-600 p-6 text-center">
                <span className="text-5xl">🛥️</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-600">요트조종면허</h3>
                <p className="text-gray-500 text-sm mt-1">요트 및 모터보트 조종면허</p>
                <div className="mt-3 text-gray-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/driving/pilot-license-private" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-gray-500 to-slate-600 p-6 text-center">
                <span className="text-5xl">✈️</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-600">자가용조종사</h3>
                <p className="text-gray-500 text-sm mt-1">비사업용 항공기 조종자격</p>
                <div className="mt-3 text-gray-500 text-sm font-medium">학습하기 →</div>
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
