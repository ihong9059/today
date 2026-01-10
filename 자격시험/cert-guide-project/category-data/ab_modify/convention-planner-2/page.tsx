'use client';

import Link from 'next/link';

export default function ConventionPlanner2Page() {
  const studyTopics = [
    { name: '컨벤션 기초', path: 'convention-basics', icon: '📖', desc: 'MICE 산업 기초 이론' },
    { name: '컨벤션 마케팅', path: 'convention-marketing', icon: '📢', desc: '마케팅 기초와 홍보' },
    { name: '컨벤션 운영', path: 'convention-operation', icon: '⚙️', desc: '기획 및 운영 실무' },
    { name: '관광자원론', path: 'tourism-resource', icon: '🏛️', desc: '관광 자원과 개발' },
    { name: '실기시험', path: 'practical', icon: '📋', desc: '기획서 작성 실습' },
  ];

  const keyInfo = [
    { label: '시험 횟수', value: '연 2회', icon: '📅' },
    { label: '합격률', value: '45%', icon: '📊' },
    { label: '응시료', value: '26,900원', icon: '💰' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-teal-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/service" className="text-gray-600 hover:text-teal-600">서비스</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">컨벤션기획사2급</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-8xl">📋</div>
            <div>
              <h1 className="text-4xl font-bold mb-3">컨벤션기획사 2급</h1>
              <p className="text-teal-100 text-lg mb-4">MICE 산업 실무 전문가 양성 자격증</p>
              <p className="text-teal-200">국제회의, 전시회, 이벤트 기획·운영의 실무 능력을 인정받는 국가공인 자격증으로, 응시 자격 제한 없이 누구나 도전할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {keyInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <span className="text-3xl mb-2 block">{info.icon}</span>
              <p className="text-2xl font-bold text-teal-600">{info.value}</p>
              <p className="text-gray-500 text-sm">{info.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 자격 개요</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            컨벤션기획사 2급은 MICE(Meeting, Incentive, Convention, Exhibition/Event) 산업의 기초 지식과 실무 능력을 평가하는 국가공인 자격증입니다. 컨벤션, 전시회, 기업 행사 등의 기획·운영 실무를 담당할 수 있는 역량을 인정받습니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-teal-50 rounded-xl p-4">
              <h3 className="font-bold text-teal-700 mb-2">주요 업무</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 컨벤션·이벤트 기획 보조</li>
                <li>• 참가자 등록·관리</li>
                <li>• 현장 운영 지원</li>
                <li>• 마케팅·홍보 업무</li>
              </ul>
            </div>
            <div className="bg-cyan-50 rounded-xl p-4">
              <h3 className="font-bold text-cyan-700 mb-2">취업 분야</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• PCO(전문회의기획사) 업체</li>
                <li>• 컨벤션센터, 전시장</li>
                <li>• 이벤트·행사 대행사</li>
                <li>• 호텔 MICE 부서</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📝 응시 자격</h2>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-xl">
            <p className="text-green-800 font-medium">✅ 응시 자격 제한 없음</p>
            <p className="text-green-700 text-sm mt-1">학력, 경력, 나이에 관계없이 누구나 응시 가능합니다.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">📚 학습 과목</h2>
            <Link href="/category/service/convention-planner-2/exam" className="text-teal-600 hover:text-teal-800 text-sm font-medium">시험 상세 보기 →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyTopics.map((topic, index) => (
              <Link key={index} href={`/category/service/convention-planner-2/study/${topic.path}`} className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 hover:shadow-md transition group">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{topic.icon}</span>
                  <h3 className="font-bold text-gray-800 group-hover:text-teal-600">{topic.name}</h3>
                </div>
                <p className="text-sm text-gray-500">{topic.desc}</p>
                <div className="mt-2 text-teal-600 text-sm font-medium">학습하기 →</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">⚖️ 2급 vs 1급 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left font-bold text-gray-700">구분</th>
                  <th className="py-3 px-4 text-center font-bold text-teal-600">2급</th>
                  <th className="py-3 px-4 text-center font-bold text-gray-600">1급</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100"><td className="py-3 px-4">응시 자격</td><td className="py-3 px-4 text-center">제한 없음</td><td className="py-3 px-4 text-center">경력/학력 요건</td></tr>
                <tr className="border-b border-gray-100"><td className="py-3 px-4">필기 과목</td><td className="py-3 px-4 text-center">4과목 (기초)</td><td className="py-3 px-4 text-center">4과목 (심화)</td></tr>
                <tr className="border-b border-gray-100"><td className="py-3 px-4">실기 시험</td><td className="py-3 px-4 text-center">기획서 작성 (2시간)</td><td className="py-3 px-4 text-center">기획서 작성 (3시간)</td></tr>
                <tr className="border-b border-gray-100"><td className="py-3 px-4">난이도</td><td className="py-3 px-4 text-center">중급</td><td className="py-3 px-4 text-center">상급</td></tr>
                <tr className="border-b border-gray-100"><td className="py-3 px-4">합격률</td><td className="py-3 px-4 text-center">약 45%</td><td className="py-3 px-4 text-center">약 30%</td></tr>
                <tr><td className="py-3 px-4">역할</td><td className="py-3 px-4 text-center">실무 담당자</td><td className="py-3 px-4 text-center">총괄 기획자</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🎖️ 자격 취득 혜택</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl">
              <span className="text-2xl">💼</span>
              <div><h3 className="font-bold text-gray-800">취업 경쟁력</h3><p className="text-sm text-gray-600">PCO, 이벤트 업체 취업 시 우대</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-xl">
              <span className="text-2xl">📈</span>
              <div><h3 className="font-bold text-gray-800">1급 응시 자격</h3><p className="text-sm text-gray-600">2급 취득 후 3년 경력 시 1급 응시 가능</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl">
              <span className="text-2xl">🎓</span>
              <div><h3 className="font-bold text-gray-800">전문성 인정</h3><p className="text-sm text-gray-600">MICE 산업 전문 인력 인증</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-xl">
              <span className="text-2xl">🌐</span>
              <div><h3 className="font-bold text-gray-800">업계 네트워크</h3><p className="text-sm text-gray-600">컨벤션 업계 진입 기회</p></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4">📌 학습 로드맵</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">1</div><p>컨벤션 기초로 MICE 산업 개념 이해</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">2</div><p>관광자원론으로 관광 산업 연계 학습</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">3</div><p>컨벤션 마케팅 기초 습득</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">4</div><p>컨벤션 운영으로 실무 역량 강화</p></div>
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
