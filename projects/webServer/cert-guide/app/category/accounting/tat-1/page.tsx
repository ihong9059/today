'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TAT1MainPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const theorySubjects = [
    { name: '재무회계', desc: '재무제표 작성, 회계처리, 결산', questions: 10, icon: '📊' },
    { name: '원가관리회계', desc: '원가계산, 원가분석, 예산관리', questions: 10, icon: '📈' },
    { name: '세무회계', desc: '소득세, 부가가치세, 원천징수', questions: 10, icon: '📋' }
  ];

  const aiQuestions = [
    'TAT 1급 재무회계에서 재무제표 작성 절차를 설명해주세요',
    '원가관리회계의 원가배부 방법을 비교해주세요',
    '부가가치세 신고 실무에서 주의할 점을 알려주세요'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <span className="text-rose-600 font-medium">TAT 1급</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-rose-600 to-pink-500 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4">
                <span className="text-5xl">📝</span>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">TAT 1급</h1>
                  <p className="text-rose-100 mb-4">Tax Accounting Technician Level 1</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">난이도: ★★★★☆</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">연간 약 8천명 응시</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">합격률 약 35%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Info Cards */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-rose-500 text-2xl mb-2">📖</div>
                <div className="text-sm text-gray-500">이론시험</div>
                <div className="font-bold">30문항/30분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-rose-500 text-2xl mb-2">💻</div>
                <div className="text-sm text-gray-500">실무시험</div>
                <div className="font-bold">더존 Smart A 90분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-rose-500 text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-500">응시료</div>
                <div className="font-bold">50,000원</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-rose-500 text-2xl mb-2">🏛️</div>
                <div className="text-sm text-gray-500">시행처</div>
                <div className="font-bold">한국공인회계사회</div>
              </div>
            </section>

            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-rose-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>TAT(Tax Accounting Technician) 1급</strong>은 한국공인회계사회에서 시행하는
                  세무정보처리 국가공인 민간자격입니다. 기업의 세무 실무를 더존 Smart A 프로그램으로
                  처리하는 능력을 평가합니다.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-rose-50 rounded-xl p-4">
                    <h3 className="font-bold text-rose-700 mb-2">주요 업무</h3>
                    <ul className="text-sm space-y-1">
                      <li>• 부가가치세 신고 업무</li>
                      <li>• 원천징수 및 연말정산</li>
                      <li>• 소득세/법인세 세무조정</li>
                      <li>• 전자세금계산서 발행</li>
                    </ul>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4">
                    <h3 className="font-bold text-pink-700 mb-2">취업 분야</h3>
                    <ul className="text-sm space-y-1">
                      <li>• 세무법인/회계법인</li>
                      <li>• 기업 세무/회계팀</li>
                      <li>• 세무사 사무소</li>
                      <li>• 공공기관 회계부서</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Theory Subjects */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-rose-500">📚</span> 이론시험 과목
              </h2>
              <div className="space-y-4">
                {theorySubjects.map((subject, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-rose-50 transition">
                    <span className="text-3xl">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-rose-600 font-bold">{subject.questions}문항</span>
                      <Link href={`/category/accounting/tat-1/study/${subject.name === '재무회계' ? 'financial-accounting' : subject.name === '원가관리회계' ? 'cost-accounting' : 'tax-accounting'}`}
                        className="block text-sm text-rose-500 hover:text-rose-700 mt-1">학습하기 →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Practical Exam */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-rose-500">💻</span> 실무시험 구성
              </h2>
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-rose-700 mb-3">시험 환경</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                        프로그램: 더존 Smart A
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                        시험시간: 90분
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                        합격기준: 70점 이상
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-pink-700 mb-3">출제 영역</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        부가가치세 신고 (40%)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        원천징수/연말정산 (30%)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        소득세/법인세 조정 (30%)
                      </li>
                    </ul>
                  </div>
                </div>
                <Link href="/category/accounting/tat-1/study/practical"
                  className="inline-block mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition">
                  실무 연습하기 →
                </Link>
              </div>
            </section>

            {/* Study Order */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-rose-500">📖</span> 추천 공부 순서
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <h3 className="font-bold">재무회계 기초</h3>
                    <p className="text-sm text-gray-500">재무제표 구조, 계정과목 이해, 결산 절차</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold shrink-0">2</span>
                  <div>
                    <h3 className="font-bold">세무회계 핵심</h3>
                    <p className="text-sm text-gray-500">부가가치세, 소득세, 원천징수 실무</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <h3 className="font-bold">원가관리회계</h3>
                    <p className="text-sm text-gray-500">원가계산, 원가배부, CVP 분석</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold shrink-0">4</span>
                  <div>
                    <h3 className="font-bold">더존 Smart A 실습</h3>
                    <p className="text-sm text-gray-500">프로그램 조작, 실무 문제 반복 연습</p>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Helper */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-rose-500">🤖</span> AI 학습 도우미
              </h2>
              <p className="text-gray-600 mb-4">AI에게 TAT 1급 관련 질문을 해보세요.</p>
              <div className="space-y-2">
                {aiQuestions.map((q, idx) => (
                  <button key={idx} onClick={() => { setCurrentPrompt(q); setShowAIModal(true); }}
                    className="w-full text-left p-3 bg-rose-50 hover:bg-rose-100 rounded-lg text-sm transition">
                    💬 {q}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA */}
            <div className="bg-gradient-to-br from-rose-600 to-pink-500 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">학습 시작하기</h3>
              <p className="text-rose-100 text-sm mb-4">TAT 1급 합격을 위한 체계적인 학습</p>
              <Link href="/category/accounting/tat-1/exam"
                className="block w-full py-3 bg-white text-rose-600 rounded-xl font-bold text-center hover:bg-rose-50 transition">
                시험 상세 보기
              </Link>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-rose-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { round: '제61회', date: '02.08', apply: '01.06~01.17' },
                  { round: '제62회', date: '04.12', apply: '03.09~03.20' },
                  { round: '제63회', date: '06.14', apply: '05.11~05.22' },
                  { round: '제64회', date: '08.09', apply: '07.06~07.17' },
                  { round: '제65회', date: '10.18', apply: '09.15~09.26' },
                  { round: '제66회', date: '12.13', apply: '11.09~11.20' }
                ].map((exam, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="font-medium">{exam.round}</span>
                    <span className="text-rose-600">{exam.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-rose-500">🎯</span> 과목별 목표
              </h3>
              <div className="space-y-4">
                {[
                  { name: '재무회계', target: 80 },
                  { name: '원가관리회계', target: 75 },
                  { name: '세무회계', target: 85 },
                  { name: '실무', target: 70 }
                ].map((subject, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{subject.name}</span>
                      <span className="text-rose-600">{subject.target}점</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${subject.target}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Certs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-rose-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                <Link href="/category/accounting/tat-2" className="block p-3 bg-gray-50 rounded-lg hover:bg-rose-50 transition">
                  <div className="font-medium">TAT 2급</div>
                  <div className="text-xs text-gray-500">세무정보처리 입문</div>
                </Link>
                <Link href="/category/accounting/fat-1" className="block p-3 bg-gray-50 rounded-lg hover:bg-rose-50 transition">
                  <div className="font-medium">FAT 1급</div>
                  <div className="text-xs text-gray-500">회계정보처리</div>
                </Link>
                <Link href="/category/accounting/computerized-tax-1" className="block p-3 bg-gray-50 rounded-lg hover:bg-rose-50 transition">
                  <div className="font-medium">전산세무 1급</div>
                  <div className="text-xs text-gray-500">한국세무사회</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. TAT 1급 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
