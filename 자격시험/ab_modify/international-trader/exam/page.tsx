'use client';

import Link from 'next/link';

export default function InternationalTraderExamPage() {
  const firstExamSubjects = [
    { name: '무역실무', questions: 40, desc: '무역계약, Incoterms, 결제, 운송, 보험' },
    { name: '무역영어', questions: 20, desc: '무역서신, 무역서류, 영문계약서' },
  ];

  const secondExamSubjects = [
    { name: '무역실무', type: '서술형', desc: '무역계약, 결제, 클레임 사례 분석' },
    { name: '무역영어', type: '서술형', desc: '영문서신 작성, 서류 해석' },
    { name: '관세실무', type: '서술형', desc: '통관절차, 관세평가, HS Code' },
  ];

  const schedule2026 = [
    { round: '제38회', apply: '2026.02.01~02.15', firstExam: '2026.03.21', firstResult: '2026.04.04', secondExam: '2026.05.16', finalResult: '2026.06.13' },
    { round: '제39회', apply: '2026.07.01~07.15', firstExam: '2026.08.22', firstResult: '2026.09.05', secondExam: '2026.10.17', finalResult: '2026.11.14' },
  ];

  const studyMaterials = [
    { name: '무역실무', path: 'trade-practice', icon: '📋' },
    { name: '무역영어', path: 'trade-english', icon: '🌍' },
    { name: '관세법규', path: 'customs-law', icon: '⚖️' },
    { name: '무역물류', path: 'trade-logistics', icon: '🚢' },
    { name: '무역결제', path: 'trade-finance', icon: '💳' },
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
            <Link href="/category/trade/international-trader" className="text-gray-600 hover:text-indigo-600">국제무역사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">시험 정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-6xl">📝</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">국제무역사 시험 정보</h1>
              <p className="text-indigo-100">시험 구성, 일정 및 합격 기준 상세 안내</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* 시험 개요 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험 개요</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">시행기관</span>
                <span className="font-medium">한국무역협회</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">자격종류</span>
                <span className="font-medium">국가공인 민간자격</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">시험횟수</span>
                <span className="font-medium">연 2회 (상반기/하반기)</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">응시자격</span>
                <span className="font-medium">제한 없음</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">1차 응시료</span>
                <span className="font-medium">30,000원</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">2차 응시료</span>
                <span className="font-medium">50,000원</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">1차 합격 유효기간</span>
                <span className="font-medium">2년간</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">홈페이지</span>
                <a href="https://www.kita.net" target="_blank" className="font-medium text-indigo-600 hover:underline">한국무역협회</a>
              </div>
            </div>
          </div>
        </div>

        {/* 1차 시험 구성 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📖 1차 시험 (객관식)</h2>
          <div className="bg-indigo-50 rounded-xl p-4 mb-4">
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-indigo-600">60문항</p>
                <p className="text-sm text-gray-600">총 문항 수</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-600">60분</p>
                <p className="text-sm text-gray-600">시험 시간</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-600">60점</p>
                <p className="text-sm text-gray-600">합격 기준</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-600">4지선다</p>
                <p className="text-sm text-gray-600">출제 형식</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">과목명</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">문항 수</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">주요 내용</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {firstExamSubjects.map((subject, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{subject.name}</td>
                    <td className="px-4 py-3 text-center text-indigo-600 font-bold">{subject.questions}문항</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{subject.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2차 시험 구성 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📝 2차 시험 (논술형)</h2>
          <div className="bg-violet-50 rounded-xl p-4 mb-4">
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-violet-600">3과목</p>
                <p className="text-sm text-gray-600">시험 과목</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-violet-600">150분</p>
                <p className="text-sm text-gray-600">시험 시간</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-violet-600">60점</p>
                <p className="text-sm text-gray-600">합격 기준</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-violet-600">서술형</p>
                <p className="text-sm text-gray-600">출제 형식</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">과목명</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">출제 형식</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">주요 내용</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {secondExamSubjects.map((subject, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{subject.name}</td>
                    <td className="px-4 py-3 text-center text-violet-600 font-bold">{subject.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{subject.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl">
            <p className="text-amber-800 text-sm">
              <strong>💡 참고:</strong> 2차 시험은 1차 합격자에 한해 응시 가능하며, 1차 합격 유효기간은 2년입니다.
            </p>
          </div>
        </div>

        {/* 2026년 시험 일정 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📅 2026년 시험 일정</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">회차</th>
                  <th className="px-3 py-3 text-center text-sm font-medium text-gray-700">원서접수</th>
                  <th className="px-3 py-3 text-center text-sm font-medium text-gray-700">1차 시험</th>
                  <th className="px-3 py-3 text-center text-sm font-medium text-gray-700">1차 합격</th>
                  <th className="px-3 py-3 text-center text-sm font-medium text-gray-700">2차 시험</th>
                  <th className="px-3 py-3 text-center text-sm font-medium text-gray-700">최종 합격</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {schedule2026.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-3 font-medium text-indigo-600">{item.round}</td>
                    <td className="px-3 py-3 text-center text-sm">{item.apply}</td>
                    <td className="px-3 py-3 text-center text-sm font-medium">{item.firstExam}</td>
                    <td className="px-3 py-3 text-center text-sm">{item.firstResult}</td>
                    <td className="px-3 py-3 text-center text-sm font-medium">{item.secondExam}</td>
                    <td className="px-3 py-3 text-center text-sm">{item.finalResult}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">※ 상기 일정은 예상 일정이며, 정확한 일정은 한국무역협회 공지사항을 확인하세요.</p>
        </div>

        {/* 출제 경향 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📊 출제 경향</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 rounded-xl p-4">
              <h3 className="font-bold text-indigo-700 mb-3">1차 시험 출제 경향</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• <strong>무역실무 (40문항):</strong> Incoterms 2020이 매년 10문항 이상 출제</li>
                <li>• 신용장 관련 문제 비중 높음 (UCP 600)</li>
                <li>• 무역계약 조건 및 클레임 사례 문제</li>
                <li>• <strong>무역영어 (20문항):</strong> 무역서신 해석 및 작성</li>
                <li>• 선하증권, 보험증권 등 서류 영문 해석</li>
              </ul>
            </div>
            <div className="bg-violet-50 rounded-xl p-4">
              <h3 className="font-bold text-violet-700 mb-3">2차 시험 출제 경향</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• <strong>무역실무:</strong> 사례 분석 및 해결방안 서술</li>
                <li>• <strong>무역영어:</strong> 상황별 영문 서신 작성</li>
                <li>• <strong>관세실무:</strong> 통관절차, 관세평가 사례</li>
                <li>• 실무 중심 서술형 답안 작성 능력 평가</li>
                <li>• 최신 무역 이슈 반영 문제 출제</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 합격 전략 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 합격 전략</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">1</div>
              <div>
                <h3 className="font-bold text-gray-800">Incoterms 2020 완벽 암기</h3>
                <p className="text-sm text-gray-600">11개 조건별 위험/비용 이전시점, 의무사항 정확히 구분</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-violet-50 rounded-xl">
              <div className="w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">2</div>
              <div>
                <h3 className="font-bold text-gray-800">신용장 실무 집중 학습</h3>
                <p className="text-sm text-gray-600">UCP 600 규정, 신용장 종류별 특징, 서류 심사 기준 숙지</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">3</div>
              <div>
                <h3 className="font-bold text-gray-800">무역영어 패턴 학습</h3>
                <p className="text-sm text-gray-600">자주 사용되는 무역 서신 표현 및 서류 양식 암기</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-violet-50 rounded-xl">
              <div className="w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">4</div>
              <div>
                <h3 className="font-bold text-gray-800">기출문제 반복 풀이</h3>
                <p className="text-sm text-gray-600">최근 5개년 기출문제 분석 및 오답노트 작성</p>
              </div>
            </div>
          </div>
        </div>

        {/* 학습 자료 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습하기</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {studyMaterials.map((item, index) => (
              <Link key={index} href={`/category/trade/international-trader/study/${item.path}`} className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-4 text-center hover:shadow-md transition group">
                <span className="text-3xl mb-2 block">{item.icon}</span>
                <h3 className="font-bold text-gray-800 group-hover:text-indigo-600">{item.name}</h3>
                <p className="text-indigo-600 text-sm mt-1">학습하기 →</p>
              </Link>
            ))}
          </div>
        </div>

        {/* 하단 CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white text-center">
          <h2 className="text-xl font-bold mb-2">국제무역사 합격을 위한 체계적인 학습!</h2>
          <p className="text-indigo-100 mb-4">과목별 핵심 문제로 1차, 2차 시험 모두 완벽 대비하세요.</p>
          <Link href="/category/trade/international-trader" className="inline-block bg-white text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-indigo-50 transition">
            학습 시작하기 →
          </Link>
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
