'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DistributionManager2Page() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const handleAIHelp = (topic: string) => {
    setCurrentPrompt(`유통관리사 2급 ${topic}에 대해 자세히 설명해주세요. 시험에 자주 나오는 핵심 개념과 암기 포인트를 알려주세요.`);
    setShowAIModal(true);
  };

  const subjects = [
    { name: '유통물류일반', icon: '📦', desc: '유통의 기초개념, 물류관리 기본원리', questions: 20, href: '/category/trade/distribution-manager-2/study/distribution-overview' },
    { name: '상권분석', icon: '📊', desc: '상권의 개념, 입지분석, 상권조사', questions: 20, href: '/category/trade/distribution-manager-2/study/store-management' },
    { name: '유통마케팅', icon: '🎯', desc: '마케팅 기초, 소비자행동, 촉진전략', questions: 20, href: '/category/trade/distribution-manager-2/study/marketing-basics' },
    { name: '유통정보', icon: '💻', desc: 'POS시스템, 유통정보화, EDI', questions: 20, href: '/category/trade/distribution-manager-2/study/distribution-info' },
    { name: '판매 및 고객관리', icon: '🤝', desc: '판매기법, 고객서비스, CRM', questions: 20, href: '/category/trade/distribution-manager-2/study/merchandising' },
  ];

  const studyOrder = [
    { step: 1, title: '유통물류일반', desc: '유통의 기본 개념과 물류 흐름 이해', duration: '2주' },
    { step: 2, title: '상권분석', desc: '상권조사와 입지선정 방법 학습', duration: '2주' },
    { step: 3, title: '유통마케팅', desc: '마케팅 믹스와 촉진전략 이해', duration: '2주' },
    { step: 4, title: '유통정보', desc: 'POS, EDI 등 정보시스템 학습', duration: '1주' },
    { step: 5, title: '판매 및 고객관리', desc: '실무 판매기법과 CRM 학습', duration: '1주' },
    { step: 6, title: '기출문제 풀이', desc: '최근 5개년 기출문제 반복 학습', duration: '2주' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
            {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade" className="text-gray-600 hover:text-teal-600">무역·물류</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">유통관리사 2급</span>
          </nav>
        </div>
      </header>

{/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></span>
                국가공인 유통 전문자격증
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                유통관리사
                <span className="block text-cyan-200">2급</span>
              </h1>
              <p className="text-lg sm:text-xl text-teal-100 mb-8 max-w-2xl">
                유통업계 실무 담당자를 위한 국가공인 자격증
                <br />체계적인 학습으로 합격을 향해 나아가세요!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/category/trade/distribution-manager-2/exam"
                  className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  📋 시험정보 보기
                </Link>
                <button
                  onClick={() => handleAIHelp('전체 학습 가이드')}
                  className="inline-flex items-center justify-center gap-2 bg-cyan-500/30 backdrop-blur-sm border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-500/50 transition-all"
                >
                  🤖 AI 학습도우미
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-cyan-400/30 to-teal-400/30 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <span className="text-8xl sm:text-9xl">🏪</span>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white text-teal-700 px-6 py-3 rounded-2xl shadow-xl font-bold">
                  <span className="text-cyan-500">2급</span> 실무 자격
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: '시험시간', value: '100분', icon: '⏱️', color: 'from-teal-500 to-teal-600' },
            { label: '문항수', value: '100문항', icon: '📝', color: 'from-cyan-500 to-cyan-600' },
            { label: '합격기준', value: '평균 60점', icon: '🎯', color: 'from-emerald-500 to-emerald-600' },
            { label: '시험방식', value: 'CBT', icon: '💻', color: 'from-blue-500 to-blue-600' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white text-2xl mb-4`}>
                {item.icon}
              </div>
              <p className="text-gray-500 text-sm">{item.label}</p>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview Section */}
            <section className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-white">📖</span>
                자격증 개요
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="text-lg leading-relaxed mb-4">
                  <strong className="text-teal-600">유통관리사 2급</strong>은 대한상공회의소에서 시행하는 국가공인 자격증으로,
                  유통업계 실무 담당자에게 필요한 전문지식을 평가합니다.
                </p>
                <p className="leading-relaxed mb-4">
                  소매점, 도매업, 프랜차이즈, 물류센터 등 다양한 유통채널에서 실무 업무를 수행하기 위한
                  핵심 역량을 검증하며, 유통관리사 1급 응시를 위한 기초 자격으로도 활용됩니다.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
                    <h4 className="font-bold text-teal-700 mb-2">👥 응시자격</h4>
                    <p className="text-sm text-gray-600">제한 없음 (연령, 학력, 경력 무관)</p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-100">
                    <h4 className="font-bold text-cyan-700 mb-2">📅 시험일정</h4>
                    <p className="text-sm text-gray-600">연 4회 (3월, 5월, 8월, 11월)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Subjects Section */}
            <section className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-white">📚</span>
                시험 과목
              </h2>
              <div className="space-y-4">
                {subjects.map((subject, idx) => (
                  <Link
                    key={idx}
                    href={subject.href}
                    className="flex items-center gap-4 p-5 bg-gradient-to-r from-gray-50 to-teal-50/50 rounded-2xl hover:from-teal-50 hover:to-cyan-50 transition-all group border border-gray-100 hover:border-teal-200"
                  >
                    <div className="w-14 h-14 bg-white rounded-xl shadow flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                        {subject.questions}문항
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Study Order */}
            <section className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-white">🗺️</span>
                추천 학습 순서
              </h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-cyan-500 to-emerald-500"></div>
                <div className="space-y-6">
                  {studyOrder.map((item, idx) => (
                    <div key={idx} className="relative pl-14">
                      <div className="absolute left-4 w-5 h-5 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full border-4 border-white shadow"></div>
                      <div className="bg-gradient-to-r from-gray-50 to-teal-50/30 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-800">
                            <span className="text-teal-500 mr-2">Step {item.step}.</span>
                            {item.title}
                          </h4>
                          <span className="text-sm text-cyan-600 font-medium bg-cyan-50 px-3 py-1 rounded-full">
                            {item.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Start Card */}
            <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-3xl p-6 text-white sticky top-6">
              <h3 className="text-xl font-bold mb-4">🚀 빠른 시작</h3>
              <p className="text-teal-100 text-sm mb-6">
                지금 바로 학습을 시작하세요!<br />
                AI 도우미가 함께합니다.
              </p>
              <div className="space-y-3">
                <Link
                  href="/category/trade/distribution-manager-2/study/distribution-overview"
                  className="block w-full bg-white/20 backdrop-blur-sm text-center py-3 rounded-xl font-medium hover:bg-white/30 transition-all"
                >
                  📦 유통물류일반 시작
                </Link>
                <Link
                  href="/category/trade/distribution-manager-2/exam"
                  className="block w-full bg-white text-teal-700 text-center py-3 rounded-xl font-bold hover:bg-teal-50 transition-all"
                >
                  📋 시험정보 확인
                </Link>
              </div>
            </div>

            {/* Study Tips */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                💡 합격 TIP
              </h3>
              <ul className="space-y-3">
                {[
                  '기출문제 반복 학습이 가장 효과적',
                  '유통물류일반은 기본 개념 이해 중요',
                  '상권분석은 사례 문제 많이 출제',
                  '마케팅 4P, 소비자행동 집중 학습',
                  '실무 용어와 약어 암기 필수',
                ].map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-teal-500 mt-0.5">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Helper */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                🤖 AI 학습 도우미
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                어려운 개념이 있으신가요?<br />
                AI에게 질문해보세요!
              </p>
              <div className="space-y-2">
                {['유통경로 유형', '상권분석 방법', 'POS시스템 개념'].map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAIHelp(topic)}
                    className="block w-full text-left bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl text-sm transition-all"
                  >
                    💬 {topic} 질문하기
                  </button>
                ))}
              </div>
            </div>

            {/* Related Certs */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📌 관련 자격증</h3>
              <div className="space-y-3">
                <Link
                  href="/category/trade/distribution-manager-1"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-teal-50 transition-all group"
                >
                  <span className="text-2xl">📦</span>
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-teal-600">유통관리사 1급</p>
                    <p className="text-xs text-gray-500">상위 자격증</p>
                  </div>
                </Link>
                <Link
                  href="/category/trade/distribution-manager-3"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-teal-50 transition-all group"
                >
                  <span className="text-2xl">🏬</span>
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-teal-600">유통관리사 3급</p>
                    <p className="text-xs text-gray-500">입문 자격증</p>
                  </div>
                </Link>
                <Link
                  href="/category/trade/trade-english-2"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-teal-50 transition-all group"
                >
                  <span className="text-2xl">🌍</span>
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-teal-600">무역영어 2급</p>
                    <p className="text-xs text-gray-500">무역 분야 자격증</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">🤖 AI 선택</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-500 text-sm mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-all border border-orange-200"
                >
                  <span className="text-3xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all border border-emerald-200"
                >
                  <span className="text-3xl">💚</span>
                  <div>
                    <p className="font-bold text-emerald-700">ChatGPT</p>
                    <p className="text-xs text-emerald-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-200"
                >
                  <span className="text-3xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
