import Link from 'next/link';

export default function SolarStudyIndexPage() {
  const subjects = [
    { id: 'photovoltaics', name: '태양광발전시스템 이론', icon: '☀️', desc: '태양전지 원리, 모듈 특성, 일사량 분석', count: 50 },
    { id: 'power-systems', name: '전력계통 및 전기설비', icon: '⚡', desc: '계통연계, 인버터, 보호장치', count: 50 },
    { id: 'electrical-equipment', name: '태양광발전설비 설계', icon: '📐', desc: '용량설계, 전기설계, 구조설계', count: 50 },
    { id: 'construction', name: '태양광발전설비 시공', icon: '🔧', desc: '설치공법, 배선공사, 안전관리', count: 50 },
    { id: 'standards', name: '전기설비기술기준 및 법규', icon: '📜', desc: 'KEC, 신재생에너지법, 안전관리법', count: 50 },
    { id: 'practical', name: '실기 대비', icon: '✍️', desc: '설계계산, 측정실습, 도면작성', count: 25 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-orange-600">기계·전기</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/solar-power-engineer" className="text-gray-600 hover:text-orange-600">태양광발전설비기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">학습하기</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-5xl mb-4 block">☀️</span>
          <h1 className="text-3xl font-bold mb-2">태양광발전설비기사 학습</h1>
          <p className="text-yellow-100">과목별 핵심 문제를 풀어보세요</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-4">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/category/mechanical/solar-power-engineer/study/${subject.id}`}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border-2 border-transparent hover:border-orange-300"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{subject.icon}</span>
                <div className="flex-1">
                  <h2 className="font-bold text-lg text-gray-800">{subject.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{subject.desc}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">{subject.count}문항</span>
                    <span className="text-orange-600 text-sm font-medium">학습하기 →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
