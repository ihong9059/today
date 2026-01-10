'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ComputerizedTax1ExamPage() {
  const [activeTab, setActiveTab] = useState<'theory' | 'practical'>('theory');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-tax-1" className="text-gray-500 hover:text-gray-700">전산세무 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-rose-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">전산세무 1급 시험 상세</h1>
          <p className="text-gray-600">필기시험과 실기시험의 상세 정보 및 출제 경향을 확인하세요.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('theory')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'theory' ? 'bg-rose-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border'}`}>
            📝 필기시험
          </button>
          <button onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'practical' ? 'bg-red-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border'}`}>
            💻 실기시험
          </button>
        </div>

        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-rose-500">📋</span> 필기시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-rose-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">과목 수</div>
                  <div className="text-2xl font-bold text-rose-600">5과목</div>
                </div>
                <div className="bg-rose-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">총 문항</div>
                  <div className="text-2xl font-bold text-rose-600">40문항</div>
                </div>
                <div className="bg-rose-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">시험 시간</div>
                  <div className="text-2xl font-bold text-rose-600">60분</div>
                </div>
                <div className="bg-rose-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">합격 기준</div>
                  <div className="text-2xl font-bold text-rose-600">70점</div>
                </div>
              </div>
            </section>

            {/* Subject 1: 재무회계 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600 font-bold">1</span>
                  재무회계
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full">10문항</span>
                  <span className="text-yellow-500">★★★☆☆</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">📌 주요 출제 토픽</h3>
                  <div className="space-y-2">
                    {[
                      { topic: '재무제표 작성', freq: '매회', desc: 'K-IFRS 기준 재무제표' },
                      { topic: '유형자산', freq: '매회', desc: '취득, 감가상각, 처분' },
                      { topic: '금융자산', freq: '자주', desc: '유가증권, 채권 회계' },
                      { topic: '충당부채', freq: '자주', desc: '충당부채 인식과 측정' },
                      { topic: '자본변동표', freq: '간헐', desc: '자본의 변동 내역' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{item.topic}</span>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${item.freq === '매회' ? 'bg-red-100 text-red-600' : item.freq === '자주' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                          {item.freq}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">💡 학습 전략</h3>
                  <div className="bg-rose-50 rounded-lg p-4 mb-3">
                    <ul className="text-sm text-rose-700 space-y-1">
                      <li>• 전산회계 1급 재무회계의 심화 버전</li>
                      <li>• K-IFRS 기준 회계처리 숙지</li>
                      <li>• 감가상각비 계산 문제 다수 출제</li>
                    </ul>
                  </div>
                  <Link href="/category/accounting/computerized-tax-1/study/financial-accounting"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition">
                    📚 재무회계 학습하기
                  </Link>
                </div>
              </div>
            </section>

            {/* Subject 2: 원가회계 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold">2</span>
                  원가회계
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">5문항</span>
                  <span className="text-yellow-500">★★★★☆</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">📌 주요 출제 토픽</h3>
                  <div className="space-y-2">
                    {[
                      { topic: '원가계산', freq: '매회', desc: '개별원가, 종합원가' },
                      { topic: '표준원가', freq: '자주', desc: '차이분석' },
                      { topic: 'CVP분석', freq: '자주', desc: '손익분기점' },
                      { topic: '예산관리', freq: '간헐', desc: '예산 편성과 통제' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{item.topic}</span>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${item.freq === '매회' ? 'bg-red-100 text-red-600' : item.freq === '자주' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                          {item.freq}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">💡 학습 전략</h3>
                  <div className="bg-orange-50 rounded-lg p-4 mb-3">
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• 계산문제가 대부분 - 공식 암기 필수</li>
                      <li>• CVP분석 공식 정확히 숙지</li>
                      <li>• 표준원가 차이분석 유형 암기</li>
                    </ul>
                  </div>
                  <Link href="/category/accounting/computerized-tax-1/study/cost-accounting"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                    📚 원가회계 학습하기
                  </Link>
                </div>
              </div>
            </section>

            {/* Subject 3: 법인세 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold">3</span>
                  법인세
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">10문항</span>
                  <span className="text-yellow-500">★★★★★</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">📌 주요 출제 토픽</h3>
                  <div className="space-y-2">
                    {[
                      { topic: '익금/손금', freq: '매회', desc: '익금산입, 손금불산입' },
                      { topic: '감가상각', freq: '매회', desc: '세무상 감가상각' },
                      { topic: '접대비', freq: '자주', desc: '접대비 한도' },
                      { topic: '기부금', freq: '자주', desc: '기부금 한도' },
                      { topic: '세무조정', freq: '매회', desc: '결산조정, 신고조정' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{item.topic}</span>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${item.freq === '매회' ? 'bg-red-100 text-red-600' : item.freq === '자주' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                          {item.freq}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">💡 학습 전략</h3>
                  <div className="bg-red-50 rounded-lg p-4 mb-3">
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• 가장 어렵고 중요한 과목!</li>
                      <li>• 손금불산입 항목 완벽 암기</li>
                      <li>• 세무조정 유형별 정리 필수</li>
                    </ul>
                  </div>
                  <Link href="/category/accounting/computerized-tax-1/study/corporate-tax"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    📚 법인세 학습하기
                  </Link>
                </div>
              </div>
            </section>

            {/* Subject 4: 소득세 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold">4</span>
                  소득세
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">10문항</span>
                  <span className="text-yellow-500">★★★★☆</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">📌 주요 출제 토픽</h3>
                  <div className="space-y-2">
                    {[
                      { topic: '종합소득', freq: '매회', desc: '소득의 종류와 계산' },
                      { topic: '근로소득', freq: '매회', desc: '급여, 연말정산' },
                      { topic: '사업소득', freq: '자주', desc: '필요경비, 추계신고' },
                      { topic: '소득공제', freq: '매회', desc: '인적공제, 특별공제' },
                      { topic: '세액공제', freq: '자주', desc: '자녀세액, 연금세액' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{item.topic}</span>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${item.freq === '매회' ? 'bg-red-100 text-red-600' : item.freq === '자주' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                          {item.freq}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">💡 학습 전략</h3>
                  <div className="bg-pink-50 rounded-lg p-4 mb-3">
                    <ul className="text-sm text-pink-700 space-y-1">
                      <li>• 연말정산 실무와 직결되는 내용</li>
                      <li>• 소득공제 vs 세액공제 구분 중요</li>
                      <li>• 종합소득세 계산구조 이해 필수</li>
                    </ul>
                  </div>
                  <Link href="/category/accounting/computerized-tax-1/study/income-tax"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
                    📚 소득세 학습하기
                  </Link>
                </div>
              </div>
            </section>

            {/* Subject 5: 부가가치세 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold">5</span>
                  부가가치세
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">5문항</span>
                  <span className="text-yellow-500">★★★☆☆</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">📌 주요 출제 토픽</h3>
                  <div className="space-y-2">
                    {[
                      { topic: '과세표준', freq: '매회', desc: '공급가액 계산' },
                      { topic: '매입세액공제', freq: '자주', desc: '불공제, 공통매입세액' },
                      { topic: '간이과세', freq: '자주', desc: '간이과세자 특례' },
                      { topic: '가산세', freq: '간헐', desc: '각종 가산세 계산' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{item.topic}</span>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${item.freq === '매회' ? 'bg-red-100 text-red-600' : item.freq === '자주' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                          {item.freq}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">💡 학습 전략</h3>
                  <div className="bg-purple-50 rounded-lg p-4 mb-3">
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• 전산회계에서 배운 내용의 심화</li>
                      <li>• 공통매입세액 안분계산 중요</li>
                      <li>• 간이과세자 특례 규정 숙지</li>
                    </ul>
                  </div>
                  <Link href="/category/accounting/computerized-tax-1/study/vat"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    📚 부가가치세 학습하기
                  </Link>
                </div>
              </div>
            </section>

            {/* Pass Strategy */}
            <section className="bg-gradient-to-r from-rose-500 to-red-500 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 필기시험 합격 전략</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">1단계: 회계 기반</h3>
                  <p className="text-sm text-rose-100">재무회계와 원가회계로 기초를 다지세요.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">2단계: 세법 학습</h3>
                  <p className="text-sm text-rose-100">법인세 → 소득세 → 부가세 순으로 학습하세요.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">3단계: 기출 분석</h3>
                  <p className="text-sm text-rose-100">최근 10회 기출로 출제 패턴을 파악하세요.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Practical Tab */}
        {activeTab === 'practical' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-red-500">💻</span> 실기시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">시험 유형</div>
                  <div className="text-xl font-bold text-red-600">실무형</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">시험 시간</div>
                  <div className="text-2xl font-bold text-red-600">90분</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">사용 프로그램</div>
                  <div className="text-xl font-bold text-red-600">케이렙</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">합격 기준</div>
                  <div className="text-2xl font-bold text-red-600">70점</div>
                </div>
              </div>
            </section>

            {/* Practical Areas */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-6">📊 실기시험 영역별 상세</h2>
              <div className="space-y-6">
                {[
                  { name: '재무회계', weight: '15%', color: 'rose', items: ['전표입력', '결산정리분개', '재무제표 작성', '장부조회'] },
                  { name: '부가가치세', weight: '25%', color: 'purple', items: ['매입매출전표', '세금계산서합계표', '부가세 신고서', '가산세 계산'] },
                  { name: '원천징수', weight: '20%', color: 'blue', items: ['급여대장 작성', '원천세 신고', '연말정산', '지급명세서'] },
                  { name: '법인세', weight: '25%', color: 'red', items: ['세무조정', '법인세 신고서', '주요 부속서류', '이월결손금'] },
                  { name: '소득세', weight: '15%', color: 'pink', items: ['종합소득세 신고', '사업소득 계산', '신고서 작성', '납부서 출력'] }
                ].map((area, idx) => (
                  <div key={idx} className={`border-l-4 border-${area.color}-500 bg-${area.color}-50 rounded-r-lg p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg">{area.name}</h3>
                      <span className={`bg-${area.color}-500 text-white px-3 py-1 rounded-full text-sm font-bold`}>{area.weight}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {area.items.map((item, iidx) => (
                        <div key={iidx} className="bg-white px-3 py-2 rounded text-sm text-center">{item}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Time Management */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4">⏱️ 시간 배분 가이드</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3">영역</th>
                      <th className="text-center p-3">배점</th>
                      <th className="text-center p-3">권장 시간</th>
                      <th className="text-left p-3">핵심 팁</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr><td className="p-3 font-medium">재무회계</td><td className="p-3 text-center">15점</td><td className="p-3 text-center">12분</td><td className="p-3 text-gray-600">전표입력 먼저, 결산은 마지막</td></tr>
                    <tr><td className="p-3 font-medium">부가가치세</td><td className="p-3 text-center">25점</td><td className="p-3 text-center">20분</td><td className="p-3 text-gray-600">자동작성 후 검토 필수</td></tr>
                    <tr><td className="p-3 font-medium">원천징수</td><td className="p-3 text-center">20점</td><td className="p-3 text-center">18분</td><td className="p-3 text-gray-600">급여항목 빠짐없이 입력</td></tr>
                    <tr><td className="p-3 font-medium">법인세</td><td className="p-3 text-center">25점</td><td className="p-3 text-center">25분</td><td className="p-3 text-gray-600">세무조정 순서대로 진행</td></tr>
                    <tr><td className="p-3 font-medium">소득세</td><td className="p-3 text-center">15점</td><td className="p-3 text-center">15분</td><td className="p-3 text-gray-600">공제항목 체크리스트 활용</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Pass Strategy */}
            <section className="bg-gradient-to-r from-red-500 to-rose-500 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 실기시험 합격 전략</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">1단계: 메뉴 숙지</h3>
                  <p className="text-sm text-red-100">케이렙 세무신고 메뉴 위치를 완벽히 익히세요.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">2단계: 신고서 연습</h3>
                  <p className="text-sm text-red-100">각 세금별 신고서 작성을 반복 연습하세요.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">3단계: 시간 관리</h3>
                  <p className="text-sm text-red-100">90분 제한시간 내 완료하는 연습이 필수입니다.</p>
                </div>
              </div>
              <Link href="/category/accounting/computerized-tax-1/study/practical"
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-red-50 transition">
                💻 실기 연습 시작하기
              </Link>
            </section>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-sm">
            본 사이트는 학습 참고용이며, 정확한 시험 정보는
            <a href="https://license.kacpta.or.kr" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline ml-1">한국세무사회 자격시험</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
