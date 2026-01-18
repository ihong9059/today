'use client';

import Link from 'next/link';

export default function TradeEnglish1Page() {
  const studyTopics = [
    { name: '영문해석', path: 'english-reading', icon: '📖', desc: '무역 관련 영문 해석 능력' },
    { name: '영작문', path: 'english-writing', icon: '✍️', desc: '무역 영문 작성 능력' },
    { name: '무역용어', path: 'trade-terms', icon: '📋', desc: 'Incoterms 및 무역 전문용어' },
    { name: '비즈니스 서신', path: 'business-letter', icon: '📧', desc: '무역 서신 작성법' },
    { name: '무역서류', path: 'trade-documents', icon: '📄', desc: 'L/C, B/L 등 무역서류' },
  ];

  const keyInfo = [
    { label: '시험 횟수', value: '연 4회', icon: '📅' },
    { label: '합격률', value: '약 25%', icon: '📊' },
    { label: '응시료', value: '30,000원', icon: '💰' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade" className="text-gray-600 hover:text-blue-600">무역·물류</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">무역영어 1급</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-8xl">🌐</div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold">무역영어 1급</h1>
                <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold">최고 등급</span>
              </div>
              <p className="text-blue-100 text-lg mb-4">국제무역 전문 영어 능력을 인증하는 최상위 자격</p>
              <p className="text-blue-200">무역 실무에서 요구되는 고급 영어 능력을 평가하는 자격증으로, 무역회사, 물류업체, 포워더 등에서 우대하는 공인 자격입니다.</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {keyInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <span className="text-3xl mb-2 block">{info.icon}</span>
              <p className="text-2xl font-bold text-blue-600">{info.value}</p>
              <p className="text-gray-500 text-sm">{info.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 자격 개요</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            무역영어 1급은 대한상공회의소에서 주관하는 국가공인 자격시험으로, 국제무역 실무에서 요구되는 최고 수준의 영어 능력을 평가합니다. 무역계약, 신용장, 선적서류 등 전문적인 무역영어 해석 및 작성 능력이 필요합니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-bold text-blue-700 mb-2">시험 구성</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 영문해석 (40문항)</li>
                <li>• 영작문 (30문항)</li>
                <li>• 무역실무 (30문항)</li>
                <li>• 총 100문항, 80분</li>
              </ul>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4">
              <h3 className="font-bold text-indigo-700 mb-2">취업 분야</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 종합상사, 무역회사</li>
                <li>• 국제물류·포워딩 업체</li>
                <li>• 은행 외환부서</li>
                <li>• 관세법인, 관세사 사무소</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📝 응시 자격</h2>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-xl">
            <p className="text-green-800 font-medium">✅ 응시 자격 제한 없음</p>
            <p className="text-green-700 text-sm mt-1">학력, 경력, 나이에 관계없이 누구나 응시 가능합니다. 단, 1급은 난이도가 높아 2급 취득 후 도전을 권장합니다.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">📚 학습 과목</h2>
            <Link href="/category/trade/trade-english-1/exam" className="text-blue-600 hover:text-blue-800 text-sm font-medium">시험 상세 보기 →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyTopics.map((topic, index) => (
              <Link key={index} href={`/category/trade/trade-english-1/study/${topic.path}`} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 hover:shadow-md transition group">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{topic.icon}</span>
                  <h3 className="font-bold text-gray-800 group-hover:text-blue-600">{topic.name}</h3>
                </div>
                <p className="text-sm text-gray-500">{topic.desc}</p>
                <div className="mt-2 text-blue-600 text-sm font-medium">학습하기 →</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">⚖️ 등급별 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left font-bold text-gray-700">구분</th>
                  <th className="py-3 px-4 text-center font-bold text-blue-600">1급</th>
                  <th className="py-3 px-4 text-center font-bold text-gray-600">2급</th>
                  <th className="py-3 px-4 text-center font-bold text-gray-600">3급</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100"><td className="py-3 px-4">문항 수</td><td className="py-3 px-4 text-center font-medium text-blue-600">100문항</td><td className="py-3 px-4 text-center">80문항</td><td className="py-3 px-4 text-center">60문항</td></tr>
                <tr className="border-b border-gray-100"><td className="py-3 px-4">시험 시간</td><td className="py-3 px-4 text-center font-medium text-blue-600">80분</td><td className="py-3 px-4 text-center">60분</td><td className="py-3 px-4 text-center">50분</td></tr>
                <tr className="border-b border-gray-100"><td className="py-3 px-4">합격 기준</td><td className="py-3 px-4 text-center font-medium text-blue-600">70점 이상</td><td className="py-3 px-4 text-center">60점 이상</td><td className="py-3 px-4 text-center">60점 이상</td></tr>
                <tr className="border-b border-gray-100"><td className="py-3 px-4">난이도</td><td className="py-3 px-4 text-center font-medium text-blue-600">고급</td><td className="py-3 px-4 text-center">중급</td><td className="py-3 px-4 text-center">초급</td></tr>
                <tr><td className="py-3 px-4">합격률</td><td className="py-3 px-4 text-center font-medium text-blue-600">약 25%</td><td className="py-3 px-4 text-center">약 40%</td><td className="py-3 px-4 text-center">약 55%</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 주요 출제 영역</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-bold text-blue-700 mb-3">📖 영문해석 (40%)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 무역계약서 해석</li>
                <li>• 신용장(L/C) 조건 분석</li>
                <li>• 무역서신 이해</li>
                <li>• 국제협약 조항 해석</li>
              </ul>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4">
              <h3 className="font-bold text-indigo-700 mb-3">✍️ 영작문 (30%)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 무역서신 작성</li>
                <li>• 클레임 대응 문서</li>
                <li>• 오퍼·주문서 작성</li>
                <li>• 선적통지서 작성</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="font-bold text-purple-700 mb-3">📄 무역실무 (30%)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Incoterms 2020</li>
                <li>• 결제조건 (L/C, T/T 등)</li>
                <li>• 선적서류 (B/L, Invoice)</li>
                <li>• 보험·클레임</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🎖️ 자격 취득 혜택</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
              <span className="text-2xl">💼</span>
              <div><h3 className="font-bold text-gray-800">취업 경쟁력</h3><p className="text-sm text-gray-600">무역회사, 물류업체 입사 시 우대</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl">
              <span className="text-2xl">📈</span>
              <div><h3 className="font-bold text-gray-800">승진 가점</h3><p className="text-sm text-gray-600">공기업·공무원 승진 시 자격 가점</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
              <span className="text-2xl">🏆</span>
              <div><h3 className="font-bold text-gray-800">국가공인 자격</h3><p className="text-sm text-gray-600">대한상공회의소 주관 공인 자격증</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl">
              <span className="text-2xl">🌍</span>
              <div><h3 className="font-bold text-gray-800">실무 능력 인증</h3><p className="text-sm text-gray-600">국제무역 영어 실무 능력 공식 인증</p></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4">📌 학습 로드맵</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">1</div><p>무역용어(Incoterms)로 기초 개념 확립</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">2</div><p>무역서류(L/C, B/L) 읽기 연습</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">3</div><p>비즈니스 서신 작성 패턴 학습</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">4</div><p>영문해석·영작문 고급 문제 풀이</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">5</div><p>기출문제로 실전 감각 익히기</p></div>
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
