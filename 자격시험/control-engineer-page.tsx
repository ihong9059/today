'use client';

import Link from 'next/link';

export default function ControlEngineerPage() {
  const subjects = [
    { name: '계측기학', icon: '📊', desc: '측정원리, 센서, 계측시스템' },
    { name: '자동제어', icon: '🎛️', desc: '제어이론, PID제어, 시스템해석' },
    { name: '전자공학', icon: '💡', desc: '회로이론, 반도체, 신호처리' },
    { name: '공업계측', icon: '🔬', desc: '온도/압력/유량/레벨 계측' },
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
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-indigo-600">기계·전기</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">제어계측기사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-6 rounded-2xl">
              <span className="text-6xl">🎛️</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">제어계측기사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Engineer Control Instrumentation</span>
              </div>
              <p className="text-blue-100 text-lg">자동제어 시스템 설계 및 관리 전문가</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className={s <= 4 ? 'text-yellow-300 text-xl' : 'text-white/30 text-xl'}>★</span>
                  ))}
                </div>
                <span className="text-blue-100">난이도: 상</span>
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
                  <p className="font-medium text-gray-800">필답형 + 작업형 (약 4시간)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">합격기준</p>
                  <p className="font-medium text-gray-800">필기/실기 각 60점 이상</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">응시자격</p>
                  <p className="font-medium text-gray-800">관련학과 졸업(예정)자 또는 경력자</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📚</span> 시험 과목
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {subjects.map((subject, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50/50 transition">
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
                <div className="flex items-center gap-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <span className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-medium text-gray-800">전자공학</p>
                    <p className="text-sm text-gray-600">회로이론, 반도체, 아날로그/디지털 기초</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-medium text-gray-800">자동제어</p>
                    <p className="text-sm text-gray-600">제어시스템 해석, PID 제어, 안정도</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-medium text-gray-800">계측기학</p>
                    <p className="text-sm text-gray-600">측정원리, 센서, 신호조절</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-medium text-gray-800">공업계측</p>
                    <p className="text-sm text-gray-600">프로세스 변수 측정 및 제어</p>
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
                  href="/category/mechanical/control-engineer/exam"
                  className="block w-full text-center py-3 rounded-lg text-white font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 transition"
                >
                  시험 정보 보기 →
                </Link>
                <Link
                  href="/category/mechanical/control-engineer/exam?tab=written"
                  className="block w-full text-center py-3 rounded-lg text-indigo-600 font-medium bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition"
                >
                  필기시험 학습하기
                </Link>
                <Link
                  href="/category/mechanical/control-engineer/exam?tab=practical"
                  className="block w-full text-center py-3 rounded-lg text-indigo-600 font-medium bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition"
                >
                  실기시험 학습하기
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span>💡</span> 합격 TIP
              </h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>라플라스 변환과 전달함수 완벽 숙지</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>PID 제어 파라미터 튜닝 이해</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>각종 센서 원리와 특성 암기</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>실기는 PLC 프로그래밍 연습 필수</span>
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
                  <span className="font-medium text-gray-800">필기 35% / 실기 45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">시험 횟수</span>
                  <span className="font-medium text-gray-800">연 3회</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">응시료</span>
                  <span className="font-medium text-gray-800">필기 19,400원 / 실기 22,600원</span>
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
