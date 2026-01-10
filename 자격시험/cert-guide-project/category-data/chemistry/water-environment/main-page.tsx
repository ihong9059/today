'use client';
import Link from 'next/link';

export default function WaterEnvironmentPage() {
  const subjects = [
    { id: 'water-pollution-overview', name: '수질오염개론', icon: '🌊', color: 'from-blue-500 to-cyan-500', desc: '수질오염의 원인과 영향' },
    { id: 'water-treatment', name: '상하수도계획', icon: '🚰', color: 'from-teal-500 to-green-500', desc: '상수도 및 하수도 시설계획' },
    { id: 'water-pollution-control', name: '수질오염방지기술', icon: '🏭', color: 'from-gray-500 to-slate-600', desc: '폐수처리 및 방지시설' },
    { id: 'water-testing', name: '수질오염공정시험기준', icon: '🔬', color: 'from-purple-500 to-pink-500', desc: '수질분석 및 시험방법' },
    { id: 'practical', name: '실기', icon: '🧪', color: 'from-amber-500 to-orange-500', desc: '실무 계산 및 측정' },
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
            <Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry" className="text-gray-600 hover:text-sky-600">화학·환경</Link>
            <span className="text-gray-300">›</span>
            <span className="text-sky-600 font-medium">수질환경기사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">💧</span>
            <div>
              <h1 className="text-3xl font-bold">수질환경기사</h1>
              <p className="text-white/80 mt-1">수질오염 방지 및 수자원 관리 전문 자격</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험 정보</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b"><span className="text-gray-600">시행기관</span><span className="font-medium">한국산업인력공단</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-600">시험과목</span><span className="font-medium">필기 4과목 + 실기</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-600">합격기준</span><span className="font-medium">과목당 40점, 평균 60점 이상</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-600">시험방식</span><span className="font-medium">필기: 객관식 / 실기: 필답형</span></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">💼 취득 후 진로</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2"><span className="text-blue-500">•</span>환경부, 지자체 환경관련 부서</li>
              <li className="flex items-center gap-2"><span className="text-blue-500">•</span>수질오염 방지시설업체</li>
              <li className="flex items-center gap-2"><span className="text-blue-500">•</span>정수장, 하수처리장 운영</li>
              <li className="flex items-center gap-2"><span className="text-blue-500">•</span>환경영향평가 전문기관</li>
              <li className="flex items-center gap-2"><span className="text-blue-500">•</span>기업체 환경관리 담당</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <Link href="/category/chemistry/water-environment/exam" className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-center hover:opacity-90 transition shadow-lg">
            📝 시험 정보 상세
          </Link>
          <Link href="/category/chemistry/water-environment/study/water-pollution-overview" className="flex-1 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold text-center hover:opacity-90 transition shadow-lg">
            📚 학습 시작하기
          </Link>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <Link key={subject.id} href={`/category/chemistry/water-environment/study/${subject.id}`} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{subject.icon}</span>
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition">{subject.name}</h3>
              </div>
              <p className="text-sm text-gray-500">{subject.desc}</p>
              <div className={`mt-3 h-1 rounded-full bg-gradient-to-r ${subject.color}`}></div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
