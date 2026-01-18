import Link from 'next/link';

export default function CivilengineerPage() {
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
            <span className="text-amber-600 font-medium">토목기사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">🌉</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">토목기사</h1>
              <p className="text-amber-100 text-lg mb-4">Civil Engineer</p>
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
                <span className="text-amber-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed">
                토목기사는 해당 분야의 전문지식과 기술을 갖춘 국가기술자격입니다.
              </p>
            </section>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-amber-500">📚</span> 과목별 학습
            </h2>
            
            <Link
              key="applied-mechanics"
              href={`/category/construction/civil-engineer/study/applied-mechanics`}
              className="block bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌉</span>
                <div>
                  <h3 className="font-bold">응용역학</h3>
                  <p className="text-sm opacity-80">역학 기초 및 구조해석</p>
                </div>
              </div>
              <div className="mt-2 text-right text-sm opacity-80">학습하기 →</div>
            </Link>
            <Link
              key="surveying"
              href={`/category/construction/civil-engineer/study/surveying`}
              className="block bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌉</span>
                <div>
                  <h3 className="font-bold">측량학</h3>
                  <p className="text-sm opacity-80">측량 원리 및 실무</p>
                </div>
              </div>
              <div className="mt-2 text-right text-sm opacity-80">학습하기 →</div>
            </Link>
            <Link
              key="hydraulics"
              href={`/category/construction/civil-engineer/study/hydraulics`}
              className="block bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌉</span>
                <div>
                  <h3 className="font-bold">수리학</h3>
                  <p className="text-sm opacity-80">유체역학 및 수공학</p>
                </div>
              </div>
              <div className="mt-2 text-right text-sm opacity-80">학습하기 →</div>
            </Link>
            <Link
              key="soil-mechanics"
              href={`/category/construction/civil-engineer/study/soil-mechanics`}
              className="block bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌉</span>
                <div>
                  <h3 className="font-bold">토질 및 기초</h3>
                  <p className="text-sm opacity-80">토질역학 및 기초공학</p>
                </div>
              </div>
              <div className="mt-2 text-right text-sm opacity-80">학습하기 →</div>
            </Link>
            <Link
              key="reinforced-concrete"
              href={`/category/construction/civil-engineer/study/reinforced-concrete`}
              className="block bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌉</span>
                <div>
                  <h3 className="font-bold">철근콘크리트</h3>
                  <p className="text-sm opacity-80">RC 구조 설계</p>
                </div>
              </div>
              <div className="mt-2 text-right text-sm opacity-80">학습하기 →</div>
            </Link>
            <Link
              key="practical"
              href={`/category/construction/civil-engineer/study/practical`}
              className="block bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌉</span>
                <div>
                  <h3 className="font-bold">실기</h3>
                  <p className="text-sm opacity-80">토목 설계 및 시공</p>
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
