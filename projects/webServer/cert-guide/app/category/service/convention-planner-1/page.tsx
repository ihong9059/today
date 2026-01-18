'use client';

import Link from 'next/link';

export default function ConventionPlanner1Page() {
  const studyTopics = [
    { name: '컨벤션 개론', path: 'convention-overview', icon: '🌐', desc: '컨벤션 산업의 개념과 발전' },
    { name: '마케팅·홍보', path: 'marketing-promotion', icon: '📢', desc: '컨벤션 마케팅 전략과 홍보' },
    { name: '운영관리', path: 'operation-management', icon: '⚙️', desc: '컨벤션 기획 및 운영 실무' },
    { name: '국제회의론', path: 'international-convention', icon: '🌍', desc: '국제회의 유치와 개최' },
    { name: '실기시험', path: 'practical', icon: '📋', desc: '기획서 작성 및 실무 능력' },
  ];

  const keyInfo = [
    { label: '시험 횟수', value: '연 2회', icon: '📅' },
    { label: '합격률', value: '30%', icon: '📊' },
    { label: '응시료', value: '40,200원', icon: '💰' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-purple-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/service" className="text-gray-600 hover:text-purple-600">서비스</Link>
            <span className="text-gray-300">›</span>
            <span className="text-purple-600 font-medium">컨벤션기획사1급</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-8xl">🎪</div>
            <div>
              <h1 className="text-4xl font-bold mb-3">컨벤션기획사 1급</h1>
              <p className="text-purple-100 text-lg mb-4">국제회의 기획·운영의 최고급 전문가 자격증</p>
              <p className="text-purple-200">MICE 산업의 핵심 인력으로서 대규모 국제회의, 전시회, 이벤트를 기획하고 운영하는 전문가</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {keyInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <span className="text-3xl mb-2 block">{info.icon}</span>
              <p className="text-2xl font-bold text-purple-600">{info.value}</p>
              <p className="text-gray-500 text-sm">{info.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 자격 개요</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            컨벤션기획사 1급은 국제회의, 전시회, 인센티브 투어, 이벤트(MICE) 산업에서 최고 수준의 기획·운영 능력을 인정받는 국가공인 자격증입니다. 대규모 국제회의 유치부터 기획, 실행, 사후 관리까지 전 과정을 총괄할 수 있는 역량을 평가합니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="font-bold text-purple-700 mb-2">주요 업무</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 국제회의 유치 전략 수립</li>
                <li>• 컨벤션 기획서 작성 및 예산 관리</li>
                <li>• 행사 프로그램 개발 및 운영</li>
                <li>• 참가자 관리 및 마케팅</li>
              </ul>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4">
              <h3 className="font-bold text-indigo-700 mb-2">취업 분야</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• PCO(전문회의기획사) 업체</li>
                <li>• 컨벤션센터, 전시장</li>
                <li>• 관광공사, 지자체 컨벤션뷰로</li>
                <li>• 호텔, 리조트 MICE 부서</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📝 응시 자격</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl mb-4">
            <p className="text-yellow-800 font-medium">1급은 다음 중 하나에 해당해야 응시 가능합니다:</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-700 mb-2">경력 조건</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 컨벤션기획사 2급 취득 후 3년 이상 경력</li>
                <li>• 관련 분야 5년 이상 실무 경력</li>
                <li>• 관련 학과 졸업 후 3년 이상 경력</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-700 mb-2">학력 조건</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 관련 학과 석사학위 이상</li>
                <li>• 관련 분야 기사 자격 취득자</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">📚 학습 과목</h2>
            <Link href="/category/service/convention-planner-1/exam" className="text-purple-600 hover:text-purple-800 text-sm font-medium">시험 상세 보기 →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyTopics.map((topic, index) => (
              <Link key={index} href={`/category/service/convention-planner-1/study/${topic.path}`} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 hover:shadow-md transition group">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{topic.icon}</span>
                  <h3 className="font-bold text-gray-800 group-hover:text-purple-600">{topic.name}</h3>
                </div>
                <p className="text-sm text-gray-500">{topic.desc}</p>
                <div className="mt-2 text-purple-600 text-sm font-medium">학습하기 →</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">⚖️ 1급 vs 2급 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left font-bold text-gray-700">구분</th>
                  <th className="py-3 px-4 text-center font-bold text-purple-600">1급</th>
                  <th className="py-3 px-4 text-center font-bold text-gray-600">2급</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100"><td className="py-3 px-4">응시 자격</td><td className="py-3 px-4 text-center">경력/학력 요건</td><td className="py-3 px-4 text-center">제한 없음</td></tr>
                <tr className="border-b border-gray-100"><td className="py-3 px-4">필기 과목</td><td className="py-3 px-4 text-center">4과목 (심화)</td><td className="py-3 px-4 text-center">4과목 (기초)</td></tr>
                <tr className="border-b border-gray-100"><td className="py-3 px-4">실기 시험</td><td className="py-3 px-4 text-center">기획서 작성 (3시간)</td><td className="py-3 px-4 text-center">기획서 작성 (2시간)</td></tr>
                <tr className="border-b border-gray-100"><td className="py-3 px-4">난이도</td><td className="py-3 px-4 text-center">상급</td><td className="py-3 px-4 text-center">중급</td></tr>
                <tr className="border-b border-gray-100"><td className="py-3 px-4">합격률</td><td className="py-3 px-4 text-center">약 30%</td><td className="py-3 px-4 text-center">약 45%</td></tr>
                <tr><td className="py-3 px-4">역할</td><td className="py-3 px-4 text-center">총괄 기획자</td><td className="py-3 px-4 text-center">실무 담당자</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🎖️ 자격 취득 혜택</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
              <span className="text-2xl">💼</span>
              <div><h3 className="font-bold text-gray-800">취업 경쟁력</h3><p className="text-sm text-gray-600">PCO 업체, 컨벤션센터 우대</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl">
              <span className="text-2xl">📈</span>
              <div><h3 className="font-bold text-gray-800">승진 가산점</h3><p className="text-sm text-gray-600">관련 업계 승진 시 가산점</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
              <span className="text-2xl">🌐</span>
              <div><h3 className="font-bold text-gray-800">국제 네트워크</h3><p className="text-sm text-gray-600">글로벌 MICE 업계 진출</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl">
              <span className="text-2xl">🏆</span>
              <div><h3 className="font-bold text-gray-800">전문성 인정</h3><p className="text-sm text-gray-600">국가공인 최고급 자격</p></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4">📌 학습 로드맵</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">1</div><p>컨벤션 개론으로 MICE 산업 이해</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">2</div><p>국제회의론으로 유치·개최 전략 학습</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">3</div><p>마케팅·홍보 전략 습득</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">4</div><p>운영관리로 실무 역량 강화</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">5</div><p>실기 기획서 작성 연습</p></div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
