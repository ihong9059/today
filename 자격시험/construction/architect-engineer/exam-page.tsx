import Link from 'next/link';

export default function ArchitectEngineerExamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction" className="text-gray-600 hover:text-orange-600">건축·토목</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction/architect-engineer" className="text-gray-600 hover:text-orange-600">건축기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold">건축기사 시험정보</h1>
          <p className="text-orange-100 mt-1">Architect Engineer Examination</p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 필기시험 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-orange-500">📝</span> 필기시험
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">시험과목</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>1. 건축계획 (20문항)</li>
                  <li>2. 건축구조 (20문항)</li>
                  <li>3. 건축설비 (20문항)</li>
                  <li>4. 건축시공 (40문항)</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">시험시간</p>
                  <p className="font-bold text-orange-600">2시간 30분</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">합격기준</p>
                  <p className="font-bold text-orange-600">평균 60점 이상</p>
                </div>
              </div>
            </div>
          </div>

          {/* 실기시험 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-orange-500">✍️</span> 실기시험
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">시험내용</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 건축설계 및 도면작성 (작업형)</li>
                  <li>• 건축적산 (필답형)</li>
                  <li>• 건축구조계산 (필답형)</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">시험시간</p>
                  <p className="font-bold text-red-600">약 6시간</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">합격기준</p>
                  <p className="font-bold text-red-600">60점 이상</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 시험일정 */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-orange-500">📅</span> 2026년 시험일정
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">회차</th>
                  <th className="p-3 text-left">필기원서접수</th>
                  <th className="p-3 text-left">필기시험</th>
                  <th className="p-3 text-left">실기원서접수</th>
                  <th className="p-3 text-left">실기시험</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3 font-medium">1회</td>
                  <td className="p-3">1.6 ~ 1.9</td>
                  <td className="p-3">2.7 ~ 2.27</td>
                  <td className="p-3">3.24 ~ 3.27</td>
                  <td className="p-3">4.19 ~ 5.4</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">2회</td>
                  <td className="p-3">4.7 ~ 4.10</td>
                  <td className="p-3">5.9 ~ 5.29</td>
                  <td className="p-3">6.23 ~ 6.26</td>
                  <td className="p-3">7.26 ~ 8.8</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">3회</td>
                  <td className="p-3">6.9 ~ 6.12</td>
                  <td className="p-3">7.5 ~ 7.24</td>
                  <td className="p-3">9.1 ~ 9.4</td>
                  <td className="p-3">10.18 ~ 10.31</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 학습 바로가기 */}
        <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4">과목별 학습 바로가기</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Link href="/category/construction/architect-engineer/study/building-planning" className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition">
              <span className="text-2xl">📋</span>
              <p className="text-sm mt-1">건축계획</p>
            </Link>
            <Link href="/category/construction/architect-engineer/study/building-structure" className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition">
              <span className="text-2xl">🏗️</span>
              <p className="text-sm mt-1">건축구조</p>
            </Link>
            <Link href="/category/construction/architect-engineer/study/building-equipment" className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition">
              <span className="text-2xl">🔧</span>
              <p className="text-sm mt-1">건축설비</p>
            </Link>
            <Link href="/category/construction/architect-engineer/study/building-construction" className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition">
              <span className="text-2xl">👷</span>
              <p className="text-sm mt-1">건축시공</p>
            </Link>
            <Link href="/category/construction/architect-engineer/study/practical" className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition">
              <span className="text-2xl">✍️</span>
              <p className="text-sm mt-1">실기</p>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
