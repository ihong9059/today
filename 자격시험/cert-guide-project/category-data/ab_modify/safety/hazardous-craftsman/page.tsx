'use client';

import Link from 'next/link';

export default function HazardousCraftsmanPage() {
  const subjects = [
    { name: '일반화학', icon: '⚗️', desc: '화학 기초, 원소, 화학반응', href: '/category/safety/hazardous-craftsman/study/general-chemistry' },
    { name: '화재예방과 소화방법', icon: '🧯', desc: '연소이론, 소화이론, 소화설비', href: '/category/safety/hazardous-craftsman/study/fire-prevention' },
    { name: '위험물의 성질과 취급', icon: '☢️', desc: '위험물 분류, 성질, 저장·취급', href: '/category/safety/hazardous-craftsman/study/hazardous-properties' },
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
            <Link href="/" className="text-gray-600 hover:text-red-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety" className="text-gray-600 hover:text-red-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">위험물기능사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-6 rounded-2xl">
              <span className="text-6xl">☢️</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">위험물기능사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Craftsman Hazardous Materials</span>
              </div>
              <p className="text-red-100 text-lg">위험물 안전 관리 및 취급 기능 인력</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className={s <= 2 ? 'text-yellow-300 text-xl' : 'text-white/30 text-xl'}>★</span>
                  ))}
                </div>
                <span className="text-red-100">난이도: 중하</span>
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
                  <p className="font-medium text-gray-800">객관식 4지선다 60문항 (1시간)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">실기시험</p>
                  <p className="font-medium text-gray-800">필답형 (1시간 30분)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">합격기준</p>
                  <p className="font-medium text-gray-800">필기/실기 각 60점 이상</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">응시자격</p>
                  <p className="font-medium text-gray-800">제한 없음</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📚</span> 시험 과목
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {subjects.map((subject, i) => (
                  <Link key={i} href={subject.href} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 hover:bg-red-50/50 transition block">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div>
                        <p className="font-medium text-gray-800">{subject.name}</p>
                        <p className="text-sm text-gray-500">{subject.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📖</span> 추천 학습 순서
              </h2>
              <div className="space-y-3">
                <Link href="/category/safety/hazardous-craftsman/study/general-chemistry" className="flex items-center gap-4 p-3 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition">
                  <span className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-medium text-gray-800">일반화학</p>
                    <p className="text-sm text-gray-600">화학 기초, 원소 주기율표, 화학반응, 산·염기</p>
                  </div>
                </Link>
                <Link href="/category/safety/hazardous-craftsman/study/fire-prevention" className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <span className="bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-medium text-gray-800">화재예방과 소화방법</p>
                    <p className="text-sm text-gray-600">연소의 3요소, 소화이론, 소화설비 및 소화약제</p>
                  </div>
                </Link>
                <Link href="/category/safety/hazardous-craftsman/study/hazardous-properties" className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <span className="bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-medium text-gray-800">위험물의 성질과 취급</p>
                    <p className="text-sm text-gray-600">위험물 1~6류 분류, 각 류별 성질 및 저장·취급방법</p>
                  </div>
                </Link>
                <Link href="/category/safety/hazardous-craftsman/study/practical" className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <span className="bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-medium text-gray-800">실기시험 대비</p>
                    <p className="text-sm text-gray-600">위험물 취급 실무, 안전관리, 필답형 문제 연습</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🎓</span> 자격 취득 활용
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <h3 className="font-medium text-orange-800 mb-2">취업 분야</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• 주유소, 가스충전소</li>
                    <li>• 석유화학 공장</li>
                    <li>• 위험물 제조·저장 시설</li>
                    <li>• 도료, 페인트 제조업체</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <h3 className="font-medium text-red-800 mb-2">승급 경로</h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• 위험물기능사 → 위험물산업기사</li>
                    <li>• 위험물산업기사 → 위험물기사</li>
                    <li>• 위험물기사 → 위험물기능장</li>
                    <li>• 안전관리자 선임 가능</li>
                  </ul>
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
                  href="/category/safety/hazardous-craftsman/exam"
                  className="block w-full text-center py-3 rounded-lg text-white font-medium bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition"
                >
                  시험 정보 보기 →
                </Link>
                <Link
                  href="/category/safety/hazardous-craftsman/study/general-chemistry"
                  className="block w-full text-center py-3 rounded-lg text-red-600 font-medium bg-red-50 border border-red-200 hover:bg-red-100 transition"
                >
                  일반화학 학습하기
                </Link>
                <Link
                  href="/category/safety/hazardous-craftsman/study/hazardous-properties"
                  className="block w-full text-center py-3 rounded-lg text-red-600 font-medium bg-red-50 border border-red-200 hover:bg-red-100 transition"
                >
                  위험물 성질 학습하기
                </Link>
                <Link
                  href="/category/safety/hazardous-craftsman/study/practical"
                  className="block w-full text-center py-3 rounded-lg text-red-600 font-medium bg-red-50 border border-red-200 hover:bg-red-100 transition"
                >
                  실기시험 대비하기
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span>💡</span> 합격 TIP
              </h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>위험물 1~6류 분류 기준 암기 필수</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>각 류별 대표 물질 특성 숙지</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>소화약제 적응성 표 완벽 암기</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>기출문제 반복 풀이 (5개년)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>실기는 필기 내용 심화 + 실무</span>
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
                  <span className="font-medium text-gray-800">필기 48% / 실기 52%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">시험 횟수</span>
                  <span className="font-medium text-gray-800">상시시험 (CBT)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">응시료</span>
                  <span className="font-medium text-gray-800">필기 14,500원 / 실기 17,200원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">필기 유효기간</span>
                  <span className="font-medium text-gray-800">2년</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl shadow-md p-6 border border-yellow-200">
              <h2 className="text-lg font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <span>⚠️</span> 위험물 분류
              </h2>
              <div className="text-sm text-yellow-700 space-y-1">
                <p><strong>1류:</strong> 산화성 고체 (과산화물 등)</p>
                <p><strong>2류:</strong> 가연성 고체 (황, 마그네슘 등)</p>
                <p><strong>3류:</strong> 자연발화·금수성 (나트륨, 칼륨 등)</p>
                <p><strong>4류:</strong> 인화성 액체 (휘발유, 알코올 등)</p>
                <p><strong>5류:</strong> 자기반응성 (니트로화합물 등)</p>
                <p><strong>6류:</strong> 산화성 액체 (질산, 과산화수소 등)</p>
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
