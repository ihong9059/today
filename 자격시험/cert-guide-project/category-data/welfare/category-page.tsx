import Link from 'next/link';

export default function WelfareCategoryPage() {
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
            <span className="text-violet-600 font-medium">사회복지·상담</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-500 to-purple-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">🤝</span>
          <h1 className="text-3xl font-bold mb-2">사회복지·상담</h1>
          <p className="text-violet-100">사회복지사, 상담사, 보육교사 등 13개 자격증</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            <Link href="/category/welfare/social-worker-1" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-center">
                <span className="text-5xl">🤝</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">사회복지사 1급</h3>
                <p className="text-gray-500 text-sm mt-1">사회복지 서비스 제공 전문가</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/welfare/social-worker-2" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-center">
                <span className="text-5xl">🤝</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">사회복지사 2급</h3>
                <p className="text-gray-500 text-sm mt-1">사회복지 현장실무 전문가</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/welfare/childcare-teacher-1" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-center">
                <span className="text-5xl">👶</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">보육교사 1급</h3>
                <p className="text-gray-500 text-sm mt-1">어린이집 보육 전문가</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/welfare/childcare-teacher-2" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-center">
                <span className="text-5xl">👶</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">보육교사 2급</h3>
                <p className="text-gray-500 text-sm mt-1">어린이집 보육 실무자</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/welfare/career-counselor-1" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-center">
                <span className="text-5xl">💼</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">직업상담사 1급</h3>
                <p className="text-gray-500 text-sm mt-1">취업 및 진로 상담 전문가</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/welfare/career-counselor-2" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-center">
                <span className="text-5xl">💼</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">직업상담사 2급</h3>
                <p className="text-gray-500 text-sm mt-1">취업 및 진로 상담 실무자</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/welfare/youth-counselor-1" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-center">
                <span className="text-5xl">🧑‍🤝‍🧑</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">청소년상담사 1급</h3>
                <p className="text-gray-500 text-sm mt-1">청소년 심리상담 전문가</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/welfare/youth-counselor-2" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-center">
                <span className="text-5xl">🧑‍🤝‍🧑</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">청소년상담사 2급</h3>
                <p className="text-gray-500 text-sm mt-1">청소년 심리상담 중급자</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/welfare/youth-counselor-3" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-center">
                <span className="text-5xl">🧑‍🤝‍🧑</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">청소년상담사 3급</h3>
                <p className="text-gray-500 text-sm mt-1">청소년 심리상담 입문자</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/welfare/clinical-psychologist-1" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-center">
                <span className="text-5xl">🧠</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">임상심리사 1급</h3>
                <p className="text-gray-500 text-sm mt-1">심리평가 및 치료 전문가</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/welfare/clinical-psychologist-2" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-center">
                <span className="text-5xl">🧠</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">임상심리사 2급</h3>
                <p className="text-gray-500 text-sm mt-1">심리평가 및 치료 실무자</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/welfare/counseling-psychologist-1" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-center">
                <span className="text-5xl">💬</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">상담심리사 1급</h3>
                <p className="text-gray-500 text-sm mt-1">한국상담심리학회 1급</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>
            <Link href="/category/welfare/counseling-psychologist-2" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-center">
                <span className="text-5xl">💬</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600">상담심리사 2급</h3>
                <p className="text-gray-500 text-sm mt-1">한국상담심리학회 2급</p>
                <div className="mt-3 text-violet-500 text-sm font-medium">학습하기 →</div>
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
