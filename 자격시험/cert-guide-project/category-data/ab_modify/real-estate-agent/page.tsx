'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RealEstateAgentMainPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const firstExamSubjects = [
    { name: '부동산학개론', desc: '부동산 경제, 투자, 금융, 정책', questions: 40, icon: '🏠' },
    { name: '민법 및 민사특별법', desc: '물권법, 채권법, 주택임대차보호법', questions: 40, icon: '📜' }
  ];

  const secondExamSubjects = [
    { name: '공인중개사법령', desc: '중개업법, 중개실무, 부동산거래신고', questions: 40, icon: '⚖️' },
    { name: '부동산공법', desc: '국토계획법, 건축법, 도시개발법', questions: 30, icon: '🏗️' },
    { name: '부동산공시법 및 세법', desc: '등기법, 지적법, 취득세, 양도소득세', questions: 30, icon: '📋' }
  ];

  const aiQuestions = [
    '부동산학개론에서 부동산 투자분석 방법을 설명해주세요',
    '민법상 물권변동의 원칙을 정리해주세요',
    '공인중개사의 중개보수 산정 기준을 알려주세요'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance" className="text-gray-500 hover:text-gray-700">금융</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">공인중개사</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-teal-600 to-cyan-500 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4">
                <span className="text-5xl">🏠</span>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">공인중개사</h1>
                  <p className="text-teal-100 mb-4">Licensed Real Estate Agent</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">난이도: ★★★★☆</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">연간 약 30만명 응시</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">합격률 1차 30% / 2차 25%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Info Cards */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-teal-500 text-2xl mb-2">📖</div>
                <div className="text-sm text-gray-500">1차 시험</div>
                <div className="font-bold">2과목/80문항</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-teal-500 text-2xl mb-2">📝</div>
                <div className="text-sm text-gray-500">2차 시험</div>
                <div className="font-bold">3과목/100문항</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-teal-500 text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-500">응시료</div>
                <div className="font-bold">1차 21,000원</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-teal-500 text-2xl mb-2">🏛️</div>
                <div className="text-sm text-gray-500">시행처</div>
                <div className="font-bold">한국산업인력공단</div>
              </div>
            </section>

            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>공인중개사</strong>는 부동산 중개업을 영위하기 위해 반드시 취득해야 하는
                  국가전문자격입니다. 토지, 건물 등 부동산의 매매·임대·교환 등 중개행위를 전문적으로
                  수행할 수 있는 자격을 부여합니다.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-teal-50 rounded-xl p-4">
                    <h3 className="font-bold text-teal-700 mb-2">주요 업무</h3>
                    <ul className="text-sm space-y-1">
                      <li>• 부동산 매매/임대 중개</li>
                      <li>• 부동산 시세 및 권리분석</li>
                      <li>• 계약서 작성 및 법률자문</li>
                      <li>• 부동산 컨설팅</li>
                    </ul>
                  </div>
                  <div className="bg-cyan-50 rounded-xl p-4">
                    <h3 className="font-bold text-cyan-700 mb-2">진출 분야</h3>
                    <ul className="text-sm space-y-1">
                      <li>• 부동산 중개사무소 개업</li>
                      <li>• 부동산 개발/투자회사</li>
                      <li>• 금융기관 담보평가</li>
                      <li>• 공공기관 부동산 관리</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* First Exam Subjects */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">📚</span> 1차 시험 과목
              </h2>
              <div className="space-y-4">
                {firstExamSubjects.map((subject, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-teal-50 transition">
                    <span className="text-3xl">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-teal-600 font-bold">{subject.questions}문항</span>
                      <Link href={`/category/finance/real-estate-agent/study/${subject.name === '부동산학개론' ? 'real-estate-intro' : 'civil-law'}`}
                        className="block text-sm text-teal-500 hover:text-teal-700 mt-1">학습하기 →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Second Exam Subjects */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">📝</span> 2차 시험 과목
              </h2>
              <div className="space-y-4">
                {secondExamSubjects.map((subject, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-cyan-50 transition">
                    <span className="text-3xl">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-cyan-600 font-bold">{subject.questions}문항</span>
                      <Link href={`/category/finance/real-estate-agent/study/${subject.name === '공인중개사법령' ? 'broker-law' : subject.name === '부동산공법' ? 'public-law' : 'registration-tax'}`}
                        className="block text-sm text-cyan-500 hover:text-cyan-700 mt-1">학습하기 →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Study Order */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">📖</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-teal-600 mb-3">📗 1차 대비</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                      <div>
                        <h4 className="font-medium">민법 기초 다지기</h4>
                        <p className="text-xs text-gray-500">물권법, 채권법 핵심 개념</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                      <div>
                        <h4 className="font-medium">부동산학개론 이론</h4>
                        <p className="text-xs text-gray-500">경제, 투자, 금융 이론</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-cyan-600 mb-3">📘 2차 대비</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <span className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                      <div>
                        <h4 className="font-medium">공인중개사법령</h4>
                        <p className="text-xs text-gray-500">중개업법, 실무, 신고법</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                      <div>
                        <h4 className="font-medium">부동산공법 + 공시세법</h4>
                        <p className="text-xs text-gray-500">국토계획법, 등기법, 세법</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Helper */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">🤖</span> AI 학습 도우미
              </h2>
              <p className="text-gray-600 mb-4">AI에게 공인중개사 관련 질문을 해보세요.</p>
              <div className="space-y-2">
                {aiQuestions.map((q, idx) => (
                  <button key={idx} onClick={() => { setCurrentPrompt(q); setShowAIModal(true); }}
                    className="w-full text-left p-3 bg-teal-50 hover:bg-teal-100 rounded-lg text-sm transition">
                    💬 {q}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA */}
            <div className="bg-gradient-to-br from-teal-600 to-cyan-500 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">학습 시작하기</h3>
              <p className="text-teal-100 text-sm mb-4">공인중개사 합격을 위한 체계적인 학습</p>
              <Link href="/category/finance/real-estate-agent/exam"
                className="block w-full py-3 bg-white text-teal-600 rounded-xl font-bold text-center hover:bg-teal-50 transition">
                시험 상세 보기
              </Link>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <div className="font-bold text-teal-700">제37회 1차 시험</div>
                  <div className="text-gray-600">2026.05.30 (토)</div>
                  <div className="text-xs text-gray-500">원서접수: 04.13~04.17</div>
                </div>
                <div className="p-3 bg-cyan-50 rounded-lg">
                  <div className="font-bold text-cyan-700">제37회 2차 시험</div>
                  <div className="text-gray-600">2026.10.31 (토)</div>
                  <div className="text-xs text-gray-500">원서접수: 09.07~09.11</div>
                </div>
              </div>
            </div>

            {/* Pass Criteria */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">✅</span> 합격 기준
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  <span>각 과목 40점 이상</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  <span>전 과목 평균 60점 이상</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                  <span>1차 합격 시 2차까지 유효</span>
                </div>
              </div>
            </div>

            {/* Study Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">🎯</span> 과목별 목표
              </h3>
              <div className="space-y-3">
                {[
                  { name: '부동산학개론', target: 75 },
                  { name: '민법', target: 70 },
                  { name: '공인중개사법령', target: 80 },
                  { name: '부동산공법', target: 70 },
                  { name: '공시법·세법', target: 75 }
                ].map((subject, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{subject.name}</span>
                      <span className="text-teal-600">{subject.target}점</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: `${subject.target}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Certs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                <Link href="/category/real-estate/appraiser" className="block p-3 bg-gray-50 rounded-lg hover:bg-teal-50 transition">
                  <div className="font-medium">감정평가사</div>
                  <div className="text-xs text-gray-500">부동산 가치평가 전문가</div>
                </Link>
                <Link href="/category/finance/financial-planner" className="block p-3 bg-gray-50 rounded-lg hover:bg-teal-50 transition">
                  <div className="font-medium">재무설계사(CFP)</div>
                  <div className="text-xs text-gray-500">자산관리 전문가</div>
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
          <p>© 2026 자격증 가이드. 공인중개사 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
