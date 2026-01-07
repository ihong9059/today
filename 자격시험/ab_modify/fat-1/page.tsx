'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FAT1Page() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects'>('overview');

  const subjects = [
    { name: '회계원리', icon: '📖', desc: '회계의 기초, 거래 기록', questions: 15, link: '/category/accounting/fat-1/study/accounting-principle' },
    { name: '재무회계', icon: '📊', desc: '재무제표, 자산/부채', questions: 15, link: '/category/accounting/fat-1/study/financial-accounting' },
    { name: '원가관리회계', icon: '🏭', desc: '원가계산, 관리회계', questions: 10, link: '/category/accounting/fat-1/study/cost-management' },
    { name: '세무회계', icon: '💰', desc: '부가세, 소득세 기초', questions: 10, link: '/category/accounting/fat-1/study/tax-accounting' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">FAT 1급</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-6">
                <div className="text-6xl">📗</div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">FAT 1급</h1>
                  <p className="text-emerald-100 mb-4">Financial Accounting Test Level 1</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">난이도: ★★★☆☆</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">연 응시자: 약 5만명</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">합격률: 이론 50% / 실무 40%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Info Cards */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
                <div className="text-emerald-500 text-2xl mb-2">📝</div>
                <div className="text-xs text-gray-500">이론시험</div>
                <div className="font-bold text-gray-800">4과목 50문항</div>
                <div className="text-xs text-gray-400">60분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
                <div className="text-emerald-500 text-2xl mb-2">💻</div>
                <div className="text-xs text-gray-500">실무시험</div>
                <div className="font-bold text-gray-800">더존 Smart A</div>
                <div className="text-xs text-gray-400">60분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
                <div className="text-emerald-500 text-2xl mb-2">💵</div>
                <div className="text-xs text-gray-500">응시료</div>
                <div className="font-bold text-gray-800">50,000원</div>
                <div className="text-xs text-gray-400">이론+실무</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
                <div className="text-emerald-500 text-2xl mb-2">🏛️</div>
                <div className="text-xs text-gray-500">주관</div>
                <div className="font-bold text-gray-800">한국공인회계사회</div>
                <div className="text-xs text-gray-400">국가공인</div>
              </div>
            </section>

            {/* Tab Navigation */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-medium transition ${activeTab === 'overview' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                자격 개요
              </button>
              <button
                onClick={() => setActiveTab('subjects')}
                className={`px-6 py-3 font-medium transition ${activeTab === 'subjects' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                시험 과목
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <section className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-emerald-500">📋</span> 자격 개요
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    FAT(Financial Accounting Test) 1급은 한국공인회계사회가 주관하는 회계정보 활용능력 검정시험입니다.
                    회계원리, 재무회계, 원가관리회계, 세무회계의 이론 지식과 더존 Smart A 프로그램을 활용한
                    실무처리 능력을 평가합니다.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <h3 className="font-bold text-emerald-800 mb-2">주요 업무</h3>
                      <ul className="text-sm text-emerald-700 space-y-1">
                        <li>• 회계정보시스템 운용</li>
                        <li>• 전표입력 및 장부관리</li>
                        <li>• 결산 및 재무제표 작성</li>
                        <li>• 세무신고 보조업무</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h3 className="font-bold text-green-800 mb-2">취업 분야</h3>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 기업 회계/경리 부서</li>
                        <li>• 회계법인/세무법인</li>
                        <li>• 금융기관</li>
                        <li>• 공기업/공공기관</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-emerald-500">🎯</span> 추천 공부 순서
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold shrink-0">1</div>
                      <div>
                        <h3 className="font-bold">회계원리</h3>
                        <p className="text-sm text-gray-600">복식부기, 계정과목, 분개 기초 학습</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold shrink-0">2</div>
                      <div>
                        <h3 className="font-bold">재무회계</h3>
                        <p className="text-sm text-gray-600">재무제표 구조, 자산/부채/자본 회계처리</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold shrink-0">3</div>
                      <div>
                        <h3 className="font-bold">원가관리회계 + 세무회계</h3>
                        <p className="text-sm text-gray-600">원가계산 기초, 부가세/소득세 기본</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold shrink-0">4</div>
                      <div>
                        <h3 className="font-bold">더존 Smart A 실무 연습</h3>
                        <p className="text-sm text-gray-600">전표입력, 결산, 부가세 신고 실습</p>
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
                    <span className="text-emerald-500">📚</span> 이론시험 과목
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {subjects.map((subject, idx) => (
                      <Link key={idx} href={subject.link} className="block bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4 hover:shadow-md transition border border-emerald-100">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{subject.icon}</span>
                          <div>
                            <h3 className="font-bold text-gray-800">{subject.name}</h3>
                            <p className="text-sm text-gray-600">{subject.desc}</p>
                            <p className="text-xs text-emerald-600 mt-1">{subject.questions}문항 출제</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-emerald-500">💻</span> 실무시험 구성
                  </h2>
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-100">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">🖥️</span>
                      <div>
                        <h3 className="font-bold text-gray-800">더존 Smart A (60분)</h3>
                        <p className="text-sm text-gray-600">회계정보시스템 실무처리</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white rounded p-2">
                        <span className="text-emerald-600 font-medium">기초정보등록</span>
                        <span className="text-gray-500 ml-2">10%</span>
                      </div>
                      <div className="bg-white rounded p-2">
                        <span className="text-emerald-600 font-medium">전표입력</span>
                        <span className="text-gray-500 ml-2">35%</span>
                      </div>
                      <div className="bg-white rounded p-2">
                        <span className="text-emerald-600 font-medium">결산처리</span>
                        <span className="text-gray-500 ml-2">30%</span>
                      </div>
                      <div className="bg-white rounded p-2">
                        <span className="text-emerald-600 font-medium">부가세신고</span>
                        <span className="text-gray-500 ml-2">25%</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/category/accounting/fat-1/study/practical" className="mt-4 block text-center py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium">
                    실무연습 문제 풀러가기 →
                  </Link>
                </section>
              </div>
            )}

            {/* AI Learning Section */}
            <section className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-gray-700 mb-4">FAT 1급 공부 중 궁금한 점을 AI에게 물어보세요!</p>
              <div className="space-y-2">
                <a href={`https://claude.ai/new?q=${encodeURIComponent('FAT 1급 회계원리에서 복식부기의 원리와 차변/대변 분류 방법을 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg p-3 hover:bg-emerald-50 transition text-gray-700 text-sm">
                  💡 "복식부기와 차변/대변 분류 방법은?"
                </a>
                <a href={`https://claude.ai/new?q=${encodeURIComponent('FAT 1급 재무회계에서 유형자산의 감가상각 방법과 회계처리를 알려주세요.')}`} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg p-3 hover:bg-emerald-50 transition text-gray-700 text-sm">
                  💡 "감가상각 방법과 회계처리는?"
                </a>
                <a href={`https://claude.ai/new?q=${encodeURIComponent('FAT 1급 더존 Smart A에서 전표입력과 결산처리 순서를 정리해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg p-3 hover:bg-emerald-50 transition text-gray-700 text-sm">
                  💡 "더존 Smart A 전표입력 순서 정리"
                </a>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Exam Schedule */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📅</span> 2026 시험일정
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">제72회</span>
                  <span className="font-medium">2026.02.15</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">제73회</span>
                  <span className="font-medium">2026.04.19</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">제74회</span>
                  <span className="font-medium">2026.06.21</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">제75회</span>
                  <span className="font-medium">2026.08.16</span>
                </div>
              </div>
              <a href="https://at.kicpa.or.kr" target="_blank" rel="noopener noreferrer" className="block mt-4 text-center py-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                한국공인회계사회 바로가기 →
              </a>
            </div>

            {/* Target Scores */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {subjects.map((subject, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{subject.name}</span>
                      <span className="font-medium text-emerald-600">70점</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">* 합격기준: 이론 70점, 실무 70점 이상</p>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🔗</span> 바로가기
              </h3>
              <div className="space-y-2">
                <Link href="/category/accounting/fat-1/exam" className="block py-2 px-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition text-emerald-700 text-sm font-medium">
                  📖 시험 상세정보
                </Link>
                <Link href="/category/accounting/fat-2" className="block py-2 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-gray-700 text-sm">
                  📘 FAT 2급 보기
                </Link>
                <Link href="/category/accounting/tat-1" className="block py-2 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-gray-700 text-sm">
                  📈 TAT 1급 도전하기
                </Link>
              </div>
            </div>

            {/* Related Certifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🏆</span> 연계 자격증
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <span>📘</span> FAT 2급 (선행 추천)
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span>📕</span> TAT 1급 (세무 심화)
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span>📗</span> 전산회계 1급 (유사 자격)
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span>📙</span> 전산세무 2급 (상위 자격)
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. FAT 1급 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
