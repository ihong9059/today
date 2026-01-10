'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HousingManagerMainPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const firstExamSubjects = [
    { name: '민법', desc: '물권법, 채권법, 계약법, 주택임대차보호법', questions: 40, icon: '📜' },
    { name: '회계원리', desc: '재무회계, 원가회계, 관리회계 기초', questions: 40, icon: '📊' }
  ];

  const secondExamSubjects = [
    { name: '공동주택시설개론', desc: '건축설비, 전기설비, 소방설비, 승강기', questions: 40, icon: '🏗️' },
    { name: '주택관리관계법규', desc: '공동주택관리법, 주택법, 건축법', questions: 40, icon: '⚖️' },
    { name: '공동주택관리실무', desc: '입주자관리, 하자관리, 장기수선계획', questions: 40, icon: '🏢' }
  ];

  const aiQuestions = [
    '공동주택의 장기수선계획 수립 절차를 설명해주세요',
    '입주자대표회의의 구성과 역할을 정리해주세요',
    '공동주택 하자담보책임 기간을 항목별로 알려주세요'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance" className="text-gray-500 hover:text-gray-700">보험·부동산</Link>
            <span className="text-gray-300">/</span>
            <span className="text-cyan-600 font-medium">주택관리사(보)</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-cyan-600 to-teal-500 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4">
                <span className="text-5xl">🏢</span>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">주택관리사(보)</h1>
                  <p className="text-cyan-100 mb-4">Housing Manager Assistant</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">난이도: ★★★☆☆</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">연간 약 4만명 응시</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">합격률 1차 35% / 2차 40%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Info Cards */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-cyan-500 text-2xl mb-2">📖</div>
                <div className="text-sm text-gray-500">1차 시험</div>
                <div className="font-bold">2과목/80문항</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-cyan-500 text-2xl mb-2">📝</div>
                <div className="text-sm text-gray-500">2차 시험</div>
                <div className="font-bold">3과목/주관식</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-cyan-500 text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-500">응시료</div>
                <div className="font-bold">1차 18,000원</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-cyan-500 text-2xl mb-2">🏛️</div>
                <div className="text-sm text-gray-500">시행처</div>
                <div className="font-bold">한국산업인력공단</div>
              </div>
            </section>

            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>주택관리사(보)</strong>는 공동주택(아파트) 관리 전문가로서, 입주민의 쾌적한
                  주거환경 조성과 공동주택의 효율적 관리를 담당합니다. 500세대 이상 공동주택에는
                  반드시 주택관리사(보) 자격을 가진 관리사무소장이 배치되어야 합니다.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-cyan-50 rounded-xl p-4">
                    <h3 className="font-bold text-cyan-700 mb-2">주요 업무</h3>
                    <ul className="text-sm space-y-1">
                      <li>• 공동주택 시설물 유지보수</li>
                      <li>• 관리비 부과 및 회계처리</li>
                      <li>• 입주자대표회의 운영 지원</li>
                      <li>• 장기수선계획 수립/관리</li>
                    </ul>
                  </div>
                  <div className="bg-teal-50 rounded-xl p-4">
                    <h3 className="font-bold text-teal-700 mb-2">진출 분야</h3>
                    <ul className="text-sm space-y-1">
                      <li>• 아파트 관리사무소장</li>
                      <li>• 주택관리업체 취업</li>
                      <li>• 공공기관 주택관리직</li>
                      <li>• 건설사 AS/관리팀</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* First Exam Subjects */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📚</span> 1차 시험 과목 (객관식)
              </h2>
              <div className="space-y-4">
                {firstExamSubjects.map((subject, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-cyan-50 transition">
                    <span className="text-3xl">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-cyan-600 font-bold">{subject.questions}문항</span>
                      <Link href={`/category/insurance/housing-manager/study/${subject.name === '민법' ? 'civil-law' : 'accounting'}`}
                        className="block text-sm text-cyan-500 hover:text-cyan-700 mt-1">학습하기 →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Second Exam Subjects */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📝</span> 2차 시험 과목 (주관식)
              </h2>
              <div className="space-y-4">
                {secondExamSubjects.map((subject, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-teal-50 transition">
                    <span className="text-3xl">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-teal-600 font-bold">{subject.questions}점</span>
                      <Link href={`/category/insurance/housing-manager/study/${idx === 0 ? 'facility-intro' : idx === 1 ? 'housing-law' : 'practical'}`}
                        className="block text-sm text-teal-500 hover:text-teal-700 mt-1">학습하기 →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Study Order */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📖</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-cyan-600 mb-3">📗 1차 대비</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <span className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                      <div>
                        <h4 className="font-medium">민법 기초 다지기</h4>
                        <p className="text-xs text-gray-500">물권법, 채권법 핵심 개념</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                      <div>
                        <h4 className="font-medium">회계원리 기본</h4>
                        <p className="text-xs text-gray-500">재무제표, 분개, 결산</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-teal-600 mb-3">📘 2차 대비</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                      <div>
                        <h4 className="font-medium">주택관리관계법규</h4>
                        <p className="text-xs text-gray-500">공동주택관리법 완벽 정리</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                      <div>
                        <h4 className="font-medium">시설개론 + 관리실무</h4>
                        <p className="text-xs text-gray-500">설비이론, 관리실무 병행</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Helper */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">🤖</span> AI 학습 도우미
              </h2>
              <p className="text-gray-600 mb-4">AI에게 주택관리사 관련 질문을 해보세요.</p>
              <div className="space-y-2">
                {aiQuestions.map((q, idx) => (
                  <button key={idx} onClick={() => { setCurrentPrompt(q); setShowAIModal(true); }}
                    className="w-full text-left p-3 bg-cyan-50 hover:bg-cyan-100 rounded-lg text-sm transition">
                    💬 {q}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA */}
            <div className="bg-gradient-to-br from-cyan-600 to-teal-500 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">학습 시작하기</h3>
              <p className="text-cyan-100 text-sm mb-4">주택관리사(보) 합격을 위한 체계적인 학습</p>
              <Link href="/category/insurance/housing-manager/exam"
                className="block w-full py-3 bg-white text-cyan-600 rounded-xl font-bold text-center hover:bg-cyan-50 transition">
                시험 상세 보기
              </Link>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-cyan-50 rounded-lg">
                  <div className="font-bold text-cyan-700">제29회 1차 시험</div>
                  <div className="text-gray-600">2026.06.20 (토)</div>
                  <div className="text-xs text-gray-500">원서접수: 04.20~04.24</div>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <div className="font-bold text-teal-700">제29회 2차 시험</div>
                  <div className="text-gray-600">2026.09.05 (토)</div>
                  <div className="text-xs text-gray-500">원서접수: 07.06~07.10</div>
                </div>
              </div>
            </div>

            {/* Pass Criteria */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">✅</span> 합격 기준
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-bold text-gray-700 mb-1">1차 시험</div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                    <span>각 과목 40점 이상</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                    <span>전 과목 평균 60점 이상</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-bold text-gray-700 mb-1">2차 시험</div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    <span>각 과목 40점 이상</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    <span>전 과목 평균 60점 이상</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Study Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">🎯</span> 과목별 목표
              </h3>
              <div className="space-y-3">
                {[
                  { name: '민법', target: 70 },
                  { name: '회계원리', target: 75 },
                  { name: '공동주택시설개론', target: 70 },
                  { name: '주택관리관계법규', target: 80 },
                  { name: '공동주택관리실무', target: 75 }
                ].map((subject, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{subject.name}</span>
                      <span className="text-cyan-600">{subject.target}점</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${subject.target}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Certs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                <Link href="/category/finance/real-estate-agent" className="block p-3 bg-gray-50 rounded-lg hover:bg-cyan-50 transition">
                  <div className="font-medium">공인중개사</div>
                  <div className="text-xs text-gray-500">부동산 중개 전문가</div>
                </Link>
                <Link href="/category/construction/building-facility-engineer" className="block p-3 bg-gray-50 rounded-lg hover:bg-cyan-50 transition">
                  <div className="font-medium">건축설비기사</div>
                  <div className="text-xs text-gray-500">건축설비 설계·시공</div>
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
          <p>© 2026 자격증 가이드. 주택관리사(보) 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
