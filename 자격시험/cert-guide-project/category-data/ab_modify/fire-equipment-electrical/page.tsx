'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FireEquipmentElectricalPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const examSubjects = [
    { name: '소방원론', desc: '연소, 화재, 소화 이론', questions: 25, icon: '🔥' },
    { name: '소방전기일반', desc: '전기이론, 회로, 전기기기', questions: 25, icon: '⚡' },
    { name: '소방관계법규', desc: '소방기본법, 화재예방법', questions: 25, icon: '📜' },
    { name: '소방전기시설의 구조 및 원리', desc: '경보설비, 피난설비, 소화활동설비', questions: 25, icon: '🚨' }
  ];

  const aiQuestions = [
    '자동화재탐지설비의 감지기 종류와 설치기준을 설명해주세요',
    '비상방송설비의 구성요소와 작동원리를 알려주세요',
    '유도등 및 유도표지의 설치기준을 정리해주세요'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/safety" className="text-gray-500 hover:text-gray-700">안전·소방</Link>
            <span className="text-gray-300">/</span>
            <span className="text-orange-600 font-medium">소방설비기사(전기)</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-600 to-red-500 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4">
                <span className="text-5xl">🚨</span>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">소방설비기사(전기분야)</h1>
                  <p className="text-orange-100 mb-4">Fire Protection Engineer (Electrical)</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">난이도: ★★★★☆</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">연간 약 2만명 응시</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">합격률 필기 30% / 실기 40%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Info Cards */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-orange-500 text-2xl mb-2">📝</div>
                <div className="text-sm text-gray-500">필기시험</div>
                <div className="font-bold">4과목/100문항</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-orange-500 text-2xl mb-2">🔧</div>
                <div className="text-sm text-gray-500">실기시험</div>
                <div className="font-bold">필답형+작업형</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-orange-500 text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-500">응시료</div>
                <div className="font-bold">필기 19,400원</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-orange-500 text-2xl mb-2">🏛️</div>
                <div className="text-sm text-gray-500">시행처</div>
                <div className="font-bold">한국산업인력공단</div>
              </div>
            </section>

            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>소방설비기사(전기분야)</strong>는 건축물의 화재 예방 및 진압을 위한
                  전기분야 소방설비의 설계, 시공, 감리 업무를 수행하는 국가기술자격입니다.
                  자동화재탐지설비, 비상방송설비, 유도등 등 전기적 소방시설을 전문으로 다룹니다.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-orange-50 rounded-xl p-4">
                    <h3 className="font-bold text-orange-700 mb-2">주요 업무</h3>
                    <ul className="text-sm space-y-1">
                      <li>• 소방전기설비 설계·시공</li>
                      <li>• 자동화재탐지설비 점검</li>
                      <li>• 비상방송/경보설비 관리</li>
                      <li>• 소방시설 완공검사</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4">
                    <h3 className="font-bold text-red-700 mb-2">취업 분야</h3>
                    <ul className="text-sm space-y-1">
                      <li>• 소방시설 설계/시공업체</li>
                      <li>• 소방안전관리 대행업체</li>
                      <li>• 건설회사 소방팀</li>
                      <li>• 공공기관 소방안전부서</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Exam Subjects */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-4">
                {examSubjects.map((subject, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition">
                    <span className="text-3xl">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-orange-600 font-bold">{subject.questions}문항</span>
                      <Link href={`/category/safety/fire-equipment-electrical/study/${idx === 0 ? 'fire-theory' : idx === 1 ? 'electrical-basics' : idx === 2 ? 'fire-law' : 'electrical-equipment'}`}
                        className="block text-sm text-orange-500 hover:text-orange-700 mt-1">학습하기 →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Practical Exam */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">🔧</span> 실기시험 구성
              </h2>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-orange-700 mb-3">시험 형태</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        필답형: 소방설비 설계 계산
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        작업형: 도면 작성, 결선도
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        시험시간: 약 3시간
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-red-700 mb-3">출제 영역</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        자동화재탐지설비 (35%)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        비상경보/방송설비 (25%)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        유도등/피난설비 (20%)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        소화활동설비 (20%)
                      </li>
                    </ul>
                  </div>
                </div>
                <Link href="/category/safety/fire-equipment-electrical/study/practical"
                  className="inline-block mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                  실기 연습하기 →
                </Link>
              </div>
            </section>

            {/* Study Order */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">📖</span> 추천 공부 순서
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <h3 className="font-bold">소방전기일반</h3>
                    <p className="text-sm text-gray-500">전기이론, 회로, 전기기기 기초</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold shrink-0">2</span>
                  <div>
                    <h3 className="font-bold">소방원론</h3>
                    <p className="text-sm text-gray-500">연소, 화재, 소화약제 이론</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <h3 className="font-bold">소방전기시설</h3>
                    <p className="text-sm text-gray-500">경보설비, 피난설비, 결선도</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold shrink-0">4</span>
                  <div>
                    <h3 className="font-bold">소방관계법규</h3>
                    <p className="text-sm text-gray-500">법규 암기 및 실기 설계 연습</p>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Helper */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">🤖</span> AI 학습 도우미
              </h2>
              <p className="text-gray-600 mb-4">AI에게 소방설비기사(전기) 관련 질문을 해보세요.</p>
              <div className="space-y-2">
                {aiQuestions.map((q, idx) => (
                  <button key={idx} onClick={() => { setCurrentPrompt(q); setShowAIModal(true); }}
                    className="w-full text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-sm transition">
                    💬 {q}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA */}
            <div className="bg-gradient-to-br from-orange-600 to-red-500 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">학습 시작하기</h3>
              <p className="text-orange-100 text-sm mb-4">소방설비기사(전기) 합격을 위한 체계적인 학습</p>
              <Link href="/category/safety/fire-equipment-electrical/exam"
                className="block w-full py-3 bg-white text-orange-600 rounded-xl font-bold text-center hover:bg-orange-50 transition">
                시험 상세 보기
              </Link>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { round: '1회', written: '03.08', practical: '04.26' },
                  { round: '2회', written: '06.07', practical: '07.26' },
                  { round: '3회', written: '08.16', practical: '10.18' }
                ].map((exam, idx) => (
                  <div key={idx} className="p-3 bg-orange-50 rounded-lg">
                    <div className="font-bold text-orange-700">{exam.round} 정기검정</div>
                    <div className="text-gray-600">필기: {exam.written} / 실기: {exam.practical}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pass Criteria */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">✅</span> 합격 기준
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-700">필기시험</div>
                  <div className="text-gray-500">과목당 40점 이상, 평균 60점 이상</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-700">실기시험</div>
                  <div className="text-gray-500">60점 이상</div>
                </div>
              </div>
            </div>

            {/* Study Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">🎯</span> 과목별 목표
              </h3>
              <div className="space-y-4">
                {[
                  { name: '소방원론', target: 70 },
                  { name: '소방전기일반', target: 75 },
                  { name: '소방관계법규', target: 70 },
                  { name: '소방전기시설', target: 80 },
                  { name: '실기', target: 70 }
                ].map((subject, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{subject.name}</span>
                      <span className="text-orange-600">{subject.target}점</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: `${subject.target}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Certs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                <Link href="/category/safety/fire-equipment-mechanical" className="block p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition">
                  <div className="font-medium">소방설비기사(기계)</div>
                  <div className="text-xs text-gray-500">기계분야 소방설비</div>
                </Link>
                <Link href="/category/safety/industrial-safety" className="block p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition">
                  <div className="font-medium">산업안전기사</div>
                  <div className="text-xs text-gray-500">산업안전관리</div>
                </Link>
                <Link href="/category/electrical/electrical-engineer" className="block p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition">
                  <div className="font-medium">전기기사</div>
                  <div className="text-xs text-gray-500">전기설비 전문가</div>
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
          <p>© 2026 자격증 가이드. 소방설비기사(전기) 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
