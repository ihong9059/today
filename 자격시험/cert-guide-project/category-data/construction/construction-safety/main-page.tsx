import Link from 'next/link';

export default function ConstructionsafetyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-yellow-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction" className="text-gray-600 hover:text-yellow-600">건축·토목</Link>
            <span className="text-gray-300">›</span>
            <span className="text-yellow-600 font-medium">건설안전기사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">🦺</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">건설안전기사</h1>
              <p className="text-yellow-100 text-lg mb-4">Construction Safety Engineer</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2"><span>📊</span><span>국가기술자격</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed">
                건설안전기사는 해당 분야의 전문지식과 기술을 갖춘 국가기술자격입니다.
              </p>
            </section>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-yellow-500">📚</span> 과목별 학습
            </h2>
            
            <Link
              key="safety-management"
              href={`/category/construction/construction-safety/study/safety-management`}
              className="block bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🦺</span>
                <div>
                  <h3 className="font-bold">안전관리론</h3>
                  <p className="text-sm opacity-80">안전관리 기본</p>
                </div>
              </div>
              <div className="mt-2 text-right text-sm opacity-80">학습하기 →</div>
            </Link>
            <Link
              key="construction-safety"
              href={`/category/construction/construction-safety/study/construction-safety`}
              className="block bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🦺</span>
                <div>
                  <h3 className="font-bold">건설안전기술</h3>
                  <p className="text-sm opacity-80">건설현장 안전</p>
                </div>
              </div>
              <div className="mt-2 text-right text-sm opacity-80">학습하기 →</div>
            </Link>
            <Link
              key="construction-materials"
              href={`/category/construction/construction-safety/study/construction-materials`}
              className="block bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🦺</span>
                <div>
                  <h3 className="font-bold">건설재료학</h3>
                  <p className="text-sm opacity-80">건설 재료</p>
                </div>
              </div>
              <div className="mt-2 text-right text-sm opacity-80">학습하기 →</div>
            </Link>
            <Link
              key="safety-law"
              href={`/category/construction/construction-safety/study/safety-law`}
              className="block bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🦺</span>
                <div>
                  <h3 className="font-bold">안전관계법규</h3>
                  <p className="text-sm opacity-80">산업안전보건법</p>
                </div>
              </div>
              <div className="mt-2 text-right text-sm opacity-80">학습하기 →</div>
            </Link>
            <Link
              key="practical"
              href={`/category/construction/construction-safety/study/practical`}
              className="block bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🦺</span>
                <div>
                  <h3 className="font-bold">실기</h3>
                  <p className="text-sm opacity-80">안전관리 실무</p>
                </div>
              </div>
              <div className="mt-2 text-right text-sm opacity-80">학습하기 →</div>
            </Link>
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
