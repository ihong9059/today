'use client';

import Link from 'next/link';

export default function TradeEnglish3Page() {
  const studyTopics = [
    { name: '기초 영문해석', path: 'basic-reading', icon: '📖', desc: '기초 무역 영문 읽기' },
    { name: '기초 영작문', path: 'basic-writing', icon: '✍️', desc: '기초 영문 작성' },
    { name: '기초 무역용어', path: 'basic-terms', icon: '📋', desc: '필수 무역 용어' },
    { name: '기초 서신', path: 'basic-letter', icon: '📧', desc: '기본 비즈니스 서신' },
    { name: '기초 서류', path: 'basic-documents', icon: '📄', desc: '기본 무역서류 이해' },
  ];

  const keyInfo = [
    { label: '시험 횟수', value: '연 4회', icon: '📅' },
    { label: '합격률', value: '약 55%', icon: '📊' },
    { label: '응시료', value: '20,000원', icon: '💰' },
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
            <Link href="/category/trade" className="text-gray-600 hover:text-teal-600">무역·물류</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">무역영어 3급</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-8xl">🌐</div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold">무역영어 3급</h1>
                <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold">입문</span>
              </div>
              <p className="text-teal-100 text-lg mb-4">무역 영어의 기초를 다지는 입문 자격</p>
              <p className="text-teal-200">무역 실무에 필요한 기초 영어 능력을 평가하는 자격증으로, 무역 분야 입문자에게 적합합니다. 기본적인 무역 용어와 간단한 서신 해석 능력을 키울 수 있습니다.</p>
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
            무역영어 3급은 대한상공회의소에서 주관하는 국가공인 자격시험으로, 무역 실무에 필요한 기초적인 영어 능력을 평가합니다. 기본적인 무역 용어, 간단한 영문 서신 해석, 기초적인 무역 서류 이해 능력이 필요합니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-teal-50 rounded-xl p-4">
              <h3 className="font-bold text-teal-700 mb-2">시험 구성</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 영문해석 (20문항)</li>
                <li>• 영작문 (20문항)</li>
                <li>• 무역실무 (20문항)</li>
                <li>• 총 60문항, 50분</li>
              </ul>
            </div>
            <div className="bg-cyan-50 rounded-xl p-4">
              <h3 className="font-bold text-cyan-700 mb-2">추천 대상</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 무역 분야 입문자</li>
                <li>• 무역 관련 학과 신입생</li>
                <li>• 영어 기초 학습자</li>
                <li>• 2급 응시 전 기초 다지기</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📝 응시 자격</h2>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-xl">
            <p className="text-green-800 font-medium">✅ 응시 자격 제한 없음</p>
            <p className="text-green-700 text-sm mt-1">학력, 경력, 나이에 관계없이 누구나 응시 가능합니다. 영어 기초부터 시작하기 좋은 자격증입니다.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">📚 학습 과목</h2>
            <Link href="/category/trade/trade-english-3/exam" className="text-teal-600 hover:text-teal-800 text-sm font-medium">시험 상세 보기 →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyTopics.map((topic, index) => (
              <Link key={index} href={`/category/trade/trade-english-3/study/${topic.path}`} className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 hover:shadow-md transition group">
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
          <h2 className="text-xl font-bold text-gray-800 mb-4">⚖️ 등급별 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left font-bold text-gray-700">구분</th>
                  <th className="py-3 px-4 text-center font-bold text-gray-600">1급</th>
                  <th className="py-3 px-4 text-center font-bold text-gray-600">2급</th>
                  <th className="py-3 px-4 text-center font-bold text-teal-600">3급</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100"><td className="py-3 px-4">문항 수</td><td className="py-3 px-4 text-center">100문항</td><td className="py-3 px-4 text-center">80문항</td><td className="py-3 px-4 text-center font-medium text-teal-600">60문항</td></tr>
                <tr className="border-b border-gray-100"><td className="py-3 px-4">시험 시간</td><td className="py-3 px-4 text-center">80분</td><td className="py-3 px-4 text-center">60분</td><td className="py-3 px-4 text-center font-medium text-teal-600">50분</td></tr>
                <tr className="border-b border-gray-100"><td className="py-3 px-4">합격 기준</td><td className="py-3 px-4 text-center">70점 이상</td><td className="py-3 px-4 text-center">60점 이상</td><td className="py-3 px-4 text-center font-medium text-teal-600">60점 이상</td></tr>
                <tr className="border-b border-gray-100"><td className="py-3 px-4">난이도</td><td className="py-3 px-4 text-center">고급</td><td className="py-3 px-4 text-center">중급</td><td className="py-3 px-4 text-center font-medium text-teal-600">초급</td></tr>
                <tr><td className="py-3 px-4">합격률</td><td className="py-3 px-4 text-center">약 25%</td><td className="py-3 px-4 text-center">약 40%</td><td className="py-3 px-4 text-center font-medium text-teal-600">약 55%</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 주요 출제 영역</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-teal-50 rounded-xl p-4">
              <h3 className="font-bold text-teal-700 mb-3">📖 영문해석 (33.3%)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 기초 무역 서신 해석</li>
                <li>• 간단한 용어 문맥 이해</li>
                <li>• 기본 영문 독해</li>
                <li>• 짧은 비즈니스 문장</li>
              </ul>
            </div>
            <div className="bg-cyan-50 rounded-xl p-4">
              <h3 className="font-bold text-cyan-700 mb-3">✍️ 영작문 (33.3%)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 기초 서신 표현</li>
                <li>• 간단한 문장 작성</li>
                <li>• 인사말/마무리 표현</li>
                <li>• 기본 요청 표현</li>
              </ul>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4">
              <h3 className="font-bold text-emerald-700 mb-3">📄 무역실무 (33.3%)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 기초 무역 용어</li>
                <li>• Incoterms 기본</li>
                <li>• 기본 무역 서류</li>
                <li>• 무역 절차 개요</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🎖️ 자격 취득 혜택</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl">
              <span className="text-2xl">🚀</span>
              <div><h3 className="font-bold text-gray-800">입문 기초 확립</h3><p className="text-sm text-gray-600">무역 영어의 기초를 체계적으로 학습</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-xl">
              <span className="text-2xl">📈</span>
              <div><h3 className="font-bold text-gray-800">상위 급수 도전</h3><p className="text-sm text-gray-600">2급, 1급 도전의 발판 마련</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl">
              <span className="text-2xl">🏆</span>
              <div><h3 className="font-bold text-gray-800">국가공인 자격</h3><p className="text-sm text-gray-600">대한상공회의소 주관 공인 자격증</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-xl">
              <span className="text-2xl">💼</span>
              <div><h3 className="font-bold text-gray-800">취업 기초 스펙</h3><p className="text-sm text-gray-600">무역 관련 취업 시 기본 자격 증명</p></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4">📌 학습 로드맵</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">1</div><p>기초 무역 용어 암기 (FOB, CIF 등)</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">2</div><p>간단한 비즈니스 서신 표현 학습</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">3</div><p>기본 무역 서류 종류 이해</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">4</div><p>기초 영문 해석 연습</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">5</div><p>기출문제 풀이로 실전 대비</p></div>
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
