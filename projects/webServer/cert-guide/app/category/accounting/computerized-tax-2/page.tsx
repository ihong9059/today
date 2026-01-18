'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ComputerizedTax2Page() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects'>('overview');

  const subjects = [
    { name: '재무회계', icon: '📊', desc: '재무제표, 회계처리', questions: 10, link: '/category/accounting/computerized-tax-2/study/financial-accounting' },
    { name: '원가회계', icon: '🏭', desc: '원가계산, 배부', questions: 10, link: '/category/accounting/computerized-tax-2/study/cost-accounting' },
    { name: '소득세', icon: '💰', desc: '종합소득, 원천징수', questions: 10, link: '/category/accounting/computerized-tax-2/study/income-tax' },
    { name: '부가가치세', icon: '🧾', desc: '과세표준, 신고납부', questions: 10, link: '/category/accounting/computerized-tax-2/study/vat' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <span className="text-amber-600 font-medium">전산세무 2급</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-amber-600 to-yellow-500 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-6">
                <div className="text-6xl">🧮</div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">전산세무 2급</h1>
                  <p className="text-amber-100 mb-4">Computerized Tax Accounting Level 2</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">난이도: ★★★☆☆</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">연 응시자: 약 8만명</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">합격률: 필기 45% / 실기 35%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Info Cards */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-100">
                <div className="text-amber-500 text-2xl mb-2">📝</div>
                <div className="text-xs text-gray-500">필기시험</div>
                <div className="font-bold text-gray-800">4과목 40문항</div>
                <div className="text-xs text-gray-400">60분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-100">
                <div className="text-amber-500 text-2xl mb-2">💻</div>
                <div className="text-xs text-gray-500">실기시험</div>
                <div className="font-bold text-gray-800">케이렙 60분</div>
                <div className="text-xs text-gray-400">실무작업형</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-100">
                <div className="text-amber-500 text-2xl mb-2">💵</div>
                <div className="text-xs text-gray-500">응시료</div>
                <div className="font-bold text-gray-800">필기 20,000원</div>
                <div className="text-xs text-gray-400">실기 25,000원</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-100">
                <div className="text-amber-500 text-2xl mb-2">🏛️</div>
                <div className="text-xs text-gray-500">주관</div>
                <div className="font-bold text-gray-800">한국세무사회</div>
                <div className="text-xs text-gray-400">국가공인</div>
              </div>
            </section>

            {/* Tab Navigation */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-medium transition ${activeTab === 'overview' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                자격 개요
              </button>
              <button
                onClick={() => setActiveTab('subjects')}
                className={`px-6 py-3 font-medium transition ${activeTab === 'subjects' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                시험 과목
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <section className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-amber-500">📋</span> 자격 개요
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    전산세무 2급은 세무 회계 프로그램을 활용하여 기업의 세무업무를 처리할 수 있는 능력을 평가하는
                    국가공인 자격증입니다. 재무회계, 원가회계, 소득세, 부가가치세 등 핵심 세무 지식을 바탕으로
                    실무 전산처리 능력을 검증합니다.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-amber-50 rounded-lg p-4">
                      <h3 className="font-bold text-amber-800 mb-2">주요 업무</h3>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• 전표입력 및 결산처리</li>
                        <li>• 부가가치세 신고</li>
                        <li>• 원천징수 업무</li>
                        <li>• 재무제표 작성</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h3 className="font-bold text-yellow-800 mb-2">취업 분야</h3>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• 기업 회계/세무 부서</li>
                        <li>• 세무법인/회계사무소</li>
                        <li>• 금융기관</li>
                        <li>• 공기업/공공기관</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-amber-500">🎯</span> 추천 공부 순서
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold shrink-0">1</div>
                      <div>
                        <h3 className="font-bold">재무회계 기초</h3>
                        <p className="text-sm text-gray-600">회계원리, 재무제표 이해, 계정과목 학습</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold shrink-0">2</div>
                      <div>
                        <h3 className="font-bold">원가회계</h3>
                        <p className="text-sm text-gray-600">원가요소, 원가계산, 배부기준 이해</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold shrink-0">3</div>
                      <div>
                        <h3 className="font-bold">세무회계 (소득세/부가세)</h3>
                        <p className="text-sm text-gray-600">소득세 계산구조, 부가가치세 신고 실무</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold shrink-0">4</div>
                      <div>
                        <h3 className="font-bold">케이렙 실기 연습</h3>
                        <p className="text-sm text-gray-600">전표입력, 결산, 부가세 신고서 작성 반복</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'subjects' && (
              <div className="space-y-6">
                <section className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-amber-500">📚</span> 필기시험 과목
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {subjects.map((subject, idx) => (
                      <Link key={idx} href={subject.link} className="block bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 hover:shadow-md transition border border-amber-100">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{subject.icon}</span>
                          <div>
                            <h3 className="font-bold text-gray-800">{subject.name}</h3>
                            <p className="text-sm text-gray-600">{subject.desc}</p>
                            <p className="text-xs text-amber-600 mt-1">{subject.questions}문항 출제</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-amber-500">💻</span> 실기시험 구성
                  </h2>
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-100">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">🖥️</span>
                      <div>
                        <h3 className="font-bold text-gray-800">케이렙 실무 (60분)</h3>
                        <p className="text-sm text-gray-600">한국세무사회 전산세무회계프로그램</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white rounded p-2">
                        <span className="text-amber-600 font-medium">전표입력</span>
                        <span className="text-gray-500 ml-2">30%</span>
                      </div>
                      <div className="bg-white rounded p-2">
                        <span className="text-amber-600 font-medium">결산처리</span>
                        <span className="text-gray-500 ml-2">25%</span>
                      </div>
                      <div className="bg-white rounded p-2">
                        <span className="text-amber-600 font-medium">부가세신고</span>
                        <span className="text-gray-500 ml-2">25%</span>
                      </div>
                      <div className="bg-white rounded p-2">
                        <span className="text-amber-600 font-medium">원천징수</span>
                        <span className="text-gray-500 ml-2">20%</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/category/accounting/computerized-tax-2/study/practical" className="mt-4 block text-center py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-medium">
                    실무연습 문제 풀러가기 →
                  </Link>
                </section>
              </div>
            )}

            {/* AI Learning Section */}
            <section className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-gray-700 mb-4">전산세무 2급 공부 중 궁금한 점을 AI에게 물어보세요!</p>
              <div className="space-y-2">
                <a href={`https://claude.ai/new?q=${encodeURIComponent('전산세무 2급 재무회계에서 유동자산과 비유동자산의 구분 기준을 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg p-3 hover:bg-amber-50 transition text-gray-700 text-sm">
                  💡 "유동자산과 비유동자산의 구분 기준은?"
                </a>
                <a href={`https://claude.ai/new?q=${encodeURIComponent('전산세무 2급 부가가치세에서 과세표준과 매출세액 계산 방법을 알려주세요.')}`} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg p-3 hover:bg-amber-50 transition text-gray-700 text-sm">
                  💡 "부가가치세 과세표준 계산 방법은?"
                </a>
                <a href={`https://claude.ai/new?q=${encodeURIComponent('전산세무 2급 소득세에서 원천징수 대상 소득과 세율을 정리해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg p-3 hover:bg-amber-50 transition text-gray-700 text-sm">
                  💡 "원천징수 대상 소득과 세율 정리"
                </a>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Exam Schedule */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-amber-500">📅</span> 2026 시험일정
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">제126회</span>
                  <span className="font-medium">2026.02.08</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">제127회</span>
                  <span className="font-medium">2026.04.12</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">제128회</span>
                  <span className="font-medium">2026.06.14</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">제129회</span>
                  <span className="font-medium">2026.08.09</span>
                </div>
              </div>
              <a href="https://license.kacpta.or.kr" target="_blank" rel="noopener noreferrer" className="block mt-4 text-center py-2 text-amber-600 hover:text-amber-700 text-sm font-medium">
                한국세무사회 바로가기 →
              </a>
            </div>

            {/* Target Scores */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-amber-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {subjects.map((subject, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{subject.name}</span>
                      <span className="font-medium text-amber-600">70점</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">* 합격기준: 평균 60점 이상, 과목별 40점 이상</p>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-amber-500">🔗</span> 바로가기
              </h3>
              <div className="space-y-2">
                <Link href="/category/accounting/computerized-tax-2/exam" className="block py-2 px-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition text-amber-700 text-sm font-medium">
                  📖 시험 상세정보
                </Link>
                <Link href="/category/accounting/computerized-tax-1" className="block py-2 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-gray-700 text-sm">
                  📈 전산세무 1급 도전하기
                </Link>
                <Link href="/category/accounting/computerized-accounting-1" className="block py-2 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-gray-700 text-sm">
                  📊 전산회계 1급 보기
                </Link>
              </div>
            </div>

            {/* Related Certifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-amber-500">🏆</span> 연계 자격증
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <span>📗</span> 전산회계 1급 (선행 추천)
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span>📕</span> 전산세무 1급 (상위 자격)
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span>📘</span> TAT 2급 (AT자격)
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span>📙</span> 세무사 (전문자격)
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. 전산세무 2급 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
