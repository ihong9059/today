'use client';

import Link from 'next/link';

export default function MechanicalCraftsmanPage() {
  const subjects = [
    { name: '기계제도', icon: '📐', desc: '도면 해독 및 작성, KS 규격' },
    { name: '기계재료', icon: '🔩', desc: '금속/비금속 재료, 열처리' },
    { name: '기계설계', icon: '⚙️', desc: '기계요소 설계, 강도계산' },
    { name: '기계제작법', icon: '�icing', desc: '주조, 용접, 절삭가공' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-amber-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-amber-600">기계·전기</Link>
            <span className="text-gray-300">›</span>
            <span className="text-amber-600 font-medium">기계산업기사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-6 rounded-2xl">
              <span className="text-6xl">🔧</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">기계산업기사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Industrial Engineer Mechanical</span>
              </div>
              <p className="text-amber-100 text-lg">기계 분야 중급 기술 인력 양성을 위한 국가기술자격</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className={s <= 3 ? 'text-yellow-300 text-xl' : 'text-white/30 text-xl'}>★</span>
                  ))}
                </div>
                <span className="text-amber-100">난이도: 중급</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📋</span> 시험 개요
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">시행기관</p>
                  <p className="font-medium text-gray-800">한국산업인력공단</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">시험 방식</p>
                  <p className="font-medium text-gray-800">필기 + 실기</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">필기시험</p>
                  <p className="font-medium text-gray-800">객관식 4지선다 80문항 (2시간)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">실기시험</p>
                  <p className="font-medium text-gray-800">필답형 (2시간 30분)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">합격기준</p>
                  <p className="font-medium text-gray-800">필기/실기 각 60점 이상</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">응시자격</p>
                  <p className="font-medium text-gray-800">관련학과 전문대졸 이상 또는 실무경력 2년</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📚</span> 시험 과목
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {subjects.map((subject, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4 hover:border-amber-300 hover:bg-amber-50/50 transition">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div>
                        <p className="font-medium text-gray-800">{subject.name}</p>
                        <p className="text-sm text-gray-500">{subject.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📖</span> 추천 학습 순서
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <span className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-medium text-gray-800">기계제도</p>
                    <p className="text-sm text-gray-600">도면 해독의 기초, 모든 과목의 기반</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-medium text-gray-800">기계재료</p>
                    <p className="text-sm text-gray-600">재료의 특성과 선정 기준 이해</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-medium text-gray-800">기계설계</p>
                    <p className="text-sm text-gray-600">기계요소 설계와 강도계산</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-medium text-gray-800">기계제작법</p>
                    <p className="text-sm text-gray-600">가공방법과 제작공정 이해</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🎯</span> 바로가기
              </h2>
              <div className="space-y-3">
                <Link
                  href="/category/mechanical/mechanical-craftsman/exam"
                  className="block w-full text-center py-3 rounded-lg text-white font-medium bg-gradient-to-r from-amber-500 to-yellow-500 hover:opacity-90 transition"
                >
                  시험 정보 보기 →
                </Link>
                <Link
                  href="/category/mechanical/mechanical-craftsman/exam?tab=written"
                  className="block w-full text-center py-3 rounded-lg text-amber-600 font-medium bg-amber-50 border border-amber-200 hover:bg-amber-100 transition"
                >
                  필기시험 학습하기
                </Link>
                <Link
                  href="/category/mechanical/mechanical-craftsman/exam?tab=practical"
                  className="block w-full text-center py-3 rounded-lg text-amber-600 font-medium bg-amber-50 border border-amber-200 hover:bg-amber-100 transition"
                >
                  실기시험 학습하기
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span>💡</span> 합격 TIP
              </h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>기계제도 KS규격을 먼저 숙지하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>재료의 기계적 성질과 열처리 집중 학습</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>설계 계산문제는 공식 암기 필수</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>기출문제 5개년 반복 학습</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📊</span> 시험 정보
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">2024 합격률</span>
                  <span className="font-medium text-gray-800">필기 45% / 실기 52%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">시험 횟수</span>
                  <span className="font-medium text-gray-800">연 3회</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">응시료</span>
                  <span className="font-medium text-gray-800">필기 19,400원 / 실기 20,800원</span>
                </div>
              </div>
            </div>
          </div>
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
