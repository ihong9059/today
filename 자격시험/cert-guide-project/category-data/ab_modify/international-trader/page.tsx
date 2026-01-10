'use client';

import Link from 'next/link';

export default function InternationalTraderPage() {
  const studyTopics = [
    { name: '무역실무', path: 'trade-practice', icon: '📋', desc: '무역계약, 결제, 운송 실무' },
    { name: '무역영어', path: 'trade-english', icon: '🌍', desc: '무역 영문서류 및 서신' },
    { name: '관세법규', path: 'customs-law', icon: '⚖️', desc: '관세법, 수출입 통관 절차' },
    { name: '무역물류', path: 'trade-logistics', icon: '🚢', desc: '국제운송, 물류관리' },
    { name: '무역결제', path: 'trade-finance', icon: '💳', desc: '신용장, 외환, 무역금융' },
  ];

  const keyInfo = [
    { label: '시험 횟수', value: '연 2회', icon: '📅' },
    { label: '합격률', value: '약 30%', icon: '📊' },
    { label: '응시료', value: '50,000원', icon: '💰' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade" className="text-gray-600 hover:text-indigo-600">무역·물류</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">국제무역사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-8xl">🌐</div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold">국제무역사</h1>
                <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold">전문자격</span>
              </div>
              <p className="text-indigo-100 text-lg mb-4">국제무역 전문 인력 양성을 위한 국가공인 자격</p>
              <p className="text-indigo-200">국제무역사는 한국무역협회에서 주관하는 국가공인 자격시험으로, 무역실무, 무역영어, 관세법규, 무역물류 등 무역 전반에 대한 전문 지식을 검증합니다. 무역회사, 물류회사, 포워더 등 다양한 분야에서 활용됩니다.</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {keyInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <span className="text-3xl mb-2 block">{info.icon}</span>
              <p className="text-2xl font-bold text-indigo-600">{info.value}</p>
              <p className="text-gray-500 text-sm">{info.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 자격 개요</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            국제무역사는 무역 실무 전문가를 양성하기 위한 국가공인 자격증입니다. 무역계약, 대금결제, 운송, 보험, 통관 등 무역 전 과정에 대한 전문 지식과 실무 능력을 평가합니다. 1차와 2차 시험으로 나뉘어 진행됩니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 rounded-xl p-4">
              <h3 className="font-bold text-indigo-700 mb-2">1차 시험 (객관식)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 무역실무 (40문항)</li>
                <li>• 무역영어 (20문항)</li>
                <li>• 총 60문항, 60분</li>
                <li>• 합격기준: 60점 이상</li>
              </ul>
            </div>
            <div className="bg-violet-50 rounded-xl p-4">
              <h3 className="font-bold text-violet-700 mb-2">2차 시험 (논술형)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 무역실무 (서술형)</li>
                <li>• 무역영어 (서술형)</li>
                <li>• 관세실무 (서술형)</li>
                <li>• 합격기준: 60점 이상</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📝 응시 자격</h2>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-xl">
            <p className="text-green-800 font-medium">✅ 응시 자격 제한 없음</p>
            <p className="text-green-700 text-sm mt-1">학력, 경력, 나이에 관계없이 누구나 응시 가능합니다. 단, 2차 시험은 1차 시험 합격자에 한해 응시 가능합니다.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">📚 학습 과목</h2>
            <Link href="/category/trade/international-trader/exam" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">시험 상세 보기 →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyTopics.map((topic, index) => (
              <Link key={index} href={`/category/trade/international-trader/study/${topic.path}`} className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-4 hover:shadow-md transition group">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{topic.icon}</span>
                  <h3 className="font-bold text-gray-800 group-hover:text-indigo-600">{topic.name}</h3>
                </div>
                <p className="text-sm text-gray-500">{topic.desc}</p>
                <div className="mt-2 text-indigo-600 text-sm font-medium">학습하기 →</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 주요 출제 영역</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-indigo-50 rounded-xl p-4">
              <h3 className="font-bold text-indigo-700 mb-3">📋 무역실무</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 무역계약 및 Incoterms</li>
                <li>• 대금결제 및 신용장</li>
                <li>• 무역보험</li>
                <li>• 클레임 및 중재</li>
              </ul>
            </div>
            <div className="bg-violet-50 rounded-xl p-4">
              <h3 className="font-bold text-violet-700 mb-3">🌍 무역영어</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 무역서신 작성</li>
                <li>• 무역서류 해석</li>
                <li>• 무역계약서 영문</li>
                <li>• 비즈니스 커뮤니케이션</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="font-bold text-purple-700 mb-3">⚖️ 관세법규</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 관세법 총칙</li>
                <li>• 수출입 통관절차</li>
                <li>• 관세평가 및 품목분류</li>
                <li>• FTA 특혜관세</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-bold text-blue-700 mb-3">🚢 무역물류</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 해상운송</li>
                <li>• 항공운송</li>
                <li>• 복합운송</li>
                <li>• 국제물류관리</li>
              </ul>
            </div>
            <div className="bg-cyan-50 rounded-xl p-4">
              <h3 className="font-bold text-cyan-700 mb-3">💳 무역결제</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 신용장 실무</li>
                <li>• 외환관리</li>
                <li>• 무역금융</li>
                <li>• 환위험 관리</li>
              </ul>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4">
              <h3 className="font-bold text-emerald-700 mb-3">📄 무역서류</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 상업송장</li>
                <li>• 선하증권</li>
                <li>• 보험증권</li>
                <li>• 원산지증명서</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🎖️ 자격 취득 혜택</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl">
              <span className="text-2xl">💼</span>
              <div><h3 className="font-bold text-gray-800">취업 경쟁력</h3><p className="text-sm text-gray-600">무역회사, 물류회사, 포워더 등 취업 시 우대</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-violet-50 rounded-xl">
              <span className="text-2xl">📈</span>
              <div><h3 className="font-bold text-gray-800">승진/인사 가점</h3><p className="text-sm text-gray-600">무역 관련 기업에서 인사 평가 가점 부여</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl">
              <span className="text-2xl">🏆</span>
              <div><h3 className="font-bold text-gray-800">국가공인 자격</h3><p className="text-sm text-gray-600">한국무역협회 주관 국가공인 자격증</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-violet-50 rounded-xl">
              <span className="text-2xl">🌐</span>
              <div><h3 className="font-bold text-gray-800">전문성 인정</h3><p className="text-sm text-gray-600">무역 분야 전문 인력으로서 역량 인정</p></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🔗 관련 자격증</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/category/trade/trade-english-1" className="p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition">
              <h3 className="font-bold text-gray-800">무역영어 1급</h3>
              <p className="text-sm text-gray-500">고급 무역 영어 능력</p>
            </Link>
            <Link href="/category/trade/customs-broker" className="p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition">
              <h3 className="font-bold text-gray-800">관세사</h3>
              <p className="text-sm text-gray-500">관세 및 통관 전문가</p>
            </Link>
            <Link href="/category/trade/logistics-manager" className="p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition">
              <h3 className="font-bold text-gray-800">물류관리사</h3>
              <p className="text-sm text-gray-500">물류 전문 자격</p>
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4">📌 학습 로드맵</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">1</div><p>무역실무 기본 이론 학습 (계약, Incoterms)</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">2</div><p>신용장 및 무역결제 심화 학습</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">3</div><p>관세법규 및 통관절차 이해</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">4</div><p>무역영어 및 서류 작성 연습</p></div>
            <div className="flex items-center gap-4"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">5</div><p>기출문제 풀이 및 실전 대비</p></div>
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
