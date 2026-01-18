'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DistributionManager3Page() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const handleAIHelp = (topic: string) => {
    setCurrentPrompt(`유통관리사 3급 ${topic}에 대해 자세히 설명해주세요. 시험에 자주 나오는 핵심 개념과 암기 포인트를 알려주세요.`);
    setShowAIModal(true);
  };

  const subjects = [
    { name: '유통상식', icon: '📦', desc: '유통의 기본 개념, 소매업과 도매업 이해', questions: 25, href: '/category/trade/distribution-manager-3/study/distribution-basics' },
    { name: '판매 및 고객응대', icon: '🤝', desc: '판매의 기초, 고객응대 방법', questions: 25, href: '/category/trade/distribution-manager-3/study/sales-basics' },
    { name: '소매경영', icon: '🏪', desc: '소매점 운영의 기본원리', questions: 25, href: '/category/trade/distribution-manager-3/study/retail-basics' },
    { name: '유통정보 기초', icon: '💻', desc: 'POS, 바코드 등 기본 시스템', questions: 25, href: '/category/trade/distribution-manager-3/study/distribution-info-basics' },
    { name: '고객서비스', icon: '⭐', desc: '서비스 마인드, 클레임 대응', questions: 25, href: '/category/trade/distribution-manager-3/study/customer-service' },
  ];

  const studyOrder = [
    { step: 1, title: '유통상식', desc: '유통의 기본 개념부터 시작', duration: '1주' },
    { step: 2, title: '소매경영', desc: '소매점 운영의 기초 이해', duration: '1주' },
    { step: 3, title: '판매 및 고객응대', desc: '기본적인 판매 스킬 습득', duration: '1주' },
    { step: 4, title: '유통정보 기초', desc: 'POS, 바코드 등 기본 시스템', duration: '1주' },
    { step: 5, title: '고객서비스', desc: '서비스 마인드와 CS 기초', duration: '1주' },
    { step: 6, title: '기출문제 풀이', desc: '최근 기출문제 반복 학습', duration: '1주' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-green-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade" className="text-gray-600 hover:text-green-600">무역·물류</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">유통관리사 3급</span>
          </nav>
        </div>
      </header>

{/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span>
                국가공인 유통 입문 자격증
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                유통관리사
                <span className="block text-emerald-200">3급</span>
              </h1>
              <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-2xl">
                유통업계 입문자를 위한 기초 자격증
                <br />쉽게 시작하고 탄탄하게 기초를 다지세요!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/category/trade/distribution-manager-3/exam"
                  className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  📋 시험정보 보기
                </Link>
                <button
                  onClick={() => handleAIHelp('전체 학습 가이드')}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500/30 backdrop-blur-sm border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-500/50 transition-all"
                >
                  🤖 AI 학습도우미
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-emerald-400/30 to-green-400/30 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <span className="text-8xl sm:text-9xl">🏬</span>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white text-green-700 px-6 py-3 rounded-2xl shadow-xl font-bold">
                  <span className="text-emerald-500">3급</span> 입문 자격
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
            { label: '시험시간', value: '60분', icon: '⏱️', color: 'from-green-500 to-green-600' },
            { label: '문항수', value: '60문항', icon: '📝', color: 'from-emerald-500 to-emerald-600' },
            { label: '합격기준', value: '60점 이상', icon: '🎯', color: 'from-teal-500 to-teal-600' },
            { label: '시험방식', value: 'CBT', icon: '💻', color: 'from-cyan-500 to-cyan-600' },
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
                <span className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">📖</span>
                자격증 개요
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="text-lg leading-relaxed mb-4">
                  <strong className="text-green-600">유통관리사 3급</strong>은 대한상공회의소에서 시행하는 국가공인 자격증으로,
                  유통업계 입문자에게 필요한 기초 지식을 평가합니다.
                </p>
                <p className="leading-relaxed mb-4">
                  소매점 판매사원, 매장관리 보조원 등 유통업계 첫 발을 내딛는 분들에게 적합하며,
                  유통관리사 2급 도전을 위한 기초 자격으로도 활용됩니다.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <h4 className="font-bold text-green-700 mb-2">👥 응시자격</h4>
                    <p className="text-sm text-gray-600">제한 없음 (연령, 학력, 경력 무관)</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                    <h4 className="font-bold text-emerald-700 mb-2">📅 시험일정</h4>
                    <p className="text-sm text-gray-600">연 4회 (3월, 5월, 8월, 11월)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Subjects Section */}
            <section className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">📚</span>
                시험 과목
              </h2>
              <div className="space-y-4">
                {subjects.map((subject, idx) => (
                  <Link
                    key={idx}
                    href={subject.href}
                    className="flex items-center gap-4 p-5 bg-gradient-to-r from-gray-50 to-green-50/50 rounded-2xl hover:from-green-50 hover:to-emerald-50 transition-all group border border-gray-100 hover:border-green-200"
                  >
                    <div className="w-14 h-14 bg-white rounded-xl shadow flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
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
                <span className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">🗺️</span>
                추천 학습 순서
              </h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-emerald-500 to-teal-500"></div>
                <div className="space-y-6">
                  {studyOrder.map((item, idx) => (
                    <div key={idx} className="relative pl-14">
                      <div className="absolute left-4 w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full border-4 border-white shadow"></div>
                      <div className="bg-gradient-to-r from-gray-50 to-green-50/30 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-800">
                            <span className="text-green-500 mr-2">Step {item.step}.</span>
                            {item.title}
                          </h4>
                          <span className="text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">
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
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-6 text-white sticky top-6">
              <h3 className="text-xl font-bold mb-4">🚀 빠른 시작</h3>
              <p className="text-green-100 text-sm mb-6">
                지금 바로 학습을 시작하세요!<br />
                AI 도우미가 함께합니다.
              </p>
              <div className="space-y-3">
                <Link
                  href="/category/trade/distribution-manager-3/study/distribution-basics"
                  className="block w-full bg-white/20 backdrop-blur-sm text-center py-3 rounded-xl font-medium hover:bg-white/30 transition-all"
                >
                  📦 유통상식 시작
                </Link>
                <Link
                  href="/category/trade/distribution-manager-3/exam"
                  className="block w-full bg-white text-green-700 text-center py-3 rounded-xl font-bold hover:bg-green-50 transition-all"
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
                  '3급은 기초 개념 이해가 핵심',
                  '용어의 정확한 의미 파악 중요',
                  '기출문제 패턴 익히면 합격률 UP',
                  '60분 60문항, 시간 여유 있음',
                  '2급 진학을 위한 기초 다지기',
                ].map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5">✓</span>
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
                {['유통의 기본 개념', '소매업의 종류', 'POS 시스템 개념'].map((topic, idx) => (
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
                  href="/category/trade/distribution-manager-2"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-green-50 transition-all group"
                >
                  <span className="text-2xl">🏪</span>
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-green-600">유통관리사 2급</p>
                    <p className="text-xs text-gray-500">다음 단계 자격증</p>
                  </div>
                </Link>
                <Link
                  href="/category/trade/distribution-manager-1"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-green-50 transition-all group"
                >
                  <span className="text-2xl">📦</span>
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-green-600">유통관리사 1급</p>
                    <p className="text-xs text-gray-500">최상위 자격증</p>
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
