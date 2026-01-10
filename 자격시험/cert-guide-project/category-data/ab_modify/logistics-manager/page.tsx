'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LogisticsManagerPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const handleAIHelp = (topic: string) => {
    setCurrentPrompt(`물류관리사 ${topic}에 대해 자세히 설명해주세요. 시험에 자주 나오는 핵심 개념과 암기 포인트를 알려주세요.`);
    setShowAIModal(true);
  };

  const subjects = [
    { name: '물류관리론', icon: '📦', desc: '물류의 기본개념, 물류시스템, 물류전략', questions: 40, href: '/category/trade/logistics-manager/study/logistics-overview' },
    { name: '화물운송론', icon: '🚛', desc: '운송수단, 운송계약, 운임체계', questions: 30, href: '/category/trade/logistics-manager/study/logistics-management' },
    { name: '국제물류론', icon: '🌍', desc: '국제물류, 무역실무, 관세', questions: 30, href: '/category/trade/logistics-manager/study/international-logistics' },
    { name: '보관하역론', icon: '🏭', desc: '창고관리, 하역작업, 포장', questions: 30, href: '/category/trade/logistics-manager/study/warehouse-transport' },
    { name: '물류관련법규', icon: '⚖️', desc: '물류정책기본법, 화물자동차운수사업법 등', questions: 20, href: '/category/trade/logistics-manager/study/logistics-info' },
  ];

  const studyOrder = [
    { step: 1, title: '물류관리론', desc: '물류의 기본 개념과 전체 흐름 이해', duration: '3주' },
    { step: 2, title: '화물운송론', desc: '각 운송수단별 특성과 운임 학습', duration: '2주' },
    { step: 3, title: '보관하역론', desc: '창고관리와 하역기기 학습', duration: '2주' },
    { step: 4, title: '국제물류론', desc: '수출입 절차와 국제운송 학습', duration: '2주' },
    { step: 5, title: '물류관련법규', desc: '핵심 법규와 조문 암기', duration: '1주' },
    { step: 6, title: '기출문제 풀이', desc: '최근 5개년 기출문제 반복 학습', duration: '2주' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade" className="text-gray-600 hover:text-indigo-600">무역·물류</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">물류관리사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></span>
                국가공인 물류전문가 자격증
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                물류관리사
              </h1>
              <p className="text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl">
                물류 분야 최고의 국가공인 자격증
                <br />물류 전문가로서의 첫 걸음을 시작하세요!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/category/trade/logistics-manager/exam"
                  className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  📋 시험정보 보기
                </Link>
                <button
                  onClick={() => handleAIHelp('전체 학습 가이드')}
                  className="inline-flex items-center justify-center gap-2 bg-blue-500/30 backdrop-blur-sm border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-500/50 transition-all"
                >
                  🤖 AI 학습도우미
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <span className="text-8xl sm:text-9xl">📦</span>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white text-indigo-700 px-6 py-3 rounded-2xl shadow-xl font-bold">
                  <span className="text-blue-500">물류</span> 전문가
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
            { label: '시험시간', value: '150분', icon: '⏱️', color: 'from-indigo-500 to-indigo-600' },
            { label: '문항수', value: '150문항', icon: '📝', color: 'from-blue-500 to-blue-600' },
            { label: '합격기준', value: '평균 60점', icon: '🎯', color: 'from-violet-500 to-violet-600' },
            { label: '시험방식', value: 'CBT', icon: '💻', color: 'from-purple-500 to-purple-600' },
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
                <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center text-white">📖</span>
                자격증 개요
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="text-lg leading-relaxed mb-4">
                  <strong className="text-indigo-600">물류관리사</strong>는 한국산업인력공단에서 시행하는 국가공인 자격증으로,
                  물류 분야의 전문 지식과 실무 능력을 갖춘 물류관리 전문가를 양성하기 위한 자격증입니다.
                </p>
                <p className="leading-relaxed mb-4">
                  물류기업, 제조업체, 유통업체, 무역회사 등 다양한 분야에서 물류 전문가로서
                  활동할 수 있으며, 물류 비용 절감과 효율성 향상에 핵심적인 역할을 수행합니다.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                    <h4 className="font-bold text-indigo-700 mb-2">👥 응시자격</h4>
                    <p className="text-sm text-gray-600">제한 없음 (연령, 학력, 경력 무관)</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl p-4 border border-blue-100">
                    <h4 className="font-bold text-blue-700 mb-2">📅 시험일정</h4>
                    <p className="text-sm text-gray-600">연 1회 (10월 경)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Subjects Section */}
            <section className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center text-white">📚</span>
                시험 과목
              </h2>
              <div className="space-y-4">
                {subjects.map((subject, idx) => (
                  <Link
                    key={idx}
                    href={subject.href}
                    className="flex items-center gap-4 p-5 bg-gradient-to-r from-gray-50 to-indigo-50/50 rounded-2xl hover:from-indigo-50 hover:to-blue-50 transition-all group border border-gray-100 hover:border-indigo-200"
                  >
                    <div className="w-14 h-14 bg-white rounded-xl shadow flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
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
                <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center text-white">🗺️</span>
                추천 학습 순서
              </h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-blue-500 to-violet-500"></div>
                <div className="space-y-6">
                  {studyOrder.map((item, idx) => (
                    <div key={idx} className="relative pl-14">
                      <div className="absolute left-4 w-5 h-5 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full border-4 border-white shadow"></div>
                      <div className="bg-gradient-to-r from-gray-50 to-indigo-50/30 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-800">
                            <span className="text-indigo-500 mr-2">Step {item.step}.</span>
                            {item.title}
                          </h4>
                          <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
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
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white sticky top-20">
              <h3 className="text-xl font-bold mb-4">🚀 빠른 시작</h3>
              <p className="text-indigo-100 text-sm mb-6">
                지금 바로 학습을 시작하세요!<br />
                AI 도우미가 함께합니다.
              </p>
              <div className="space-y-3">
                <Link
                  href="/category/trade/logistics-manager/study/logistics-overview"
                  className="block w-full bg-white/20 backdrop-blur-sm text-center py-3 rounded-xl font-medium hover:bg-white/30 transition-all"
                >
                  📦 물류관리론 시작
                </Link>
                <Link
                  href="/category/trade/logistics-manager/exam"
                  className="block w-full bg-white text-indigo-700 text-center py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all"
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
                  '물류관리론이 출제비중 높으니 집중 학습',
                  '화물운송론은 운임계산 문제 대비',
                  '국제물류는 인코텀즈 완벽 암기',
                  '보관하역은 하역기기 종류 구분 중요',
                  '법규는 최신 개정내용 확인 필수',
                ].map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-indigo-500 mt-0.5">✓</span>
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
                {['물류시스템 유형', '인코텀즈 2020', '하역기기 종류'].map((topic, idx) => (
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
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-all group"
                >
                  <span className="text-2xl">🏪</span>
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-indigo-600">유통관리사 1급</p>
                    <p className="text-xs text-gray-500">유통 분야 자격증</p>
                  </div>
                </Link>
                <Link
                  href="/category/trade/international-trader"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-all group"
                >
                  <span className="text-2xl">🌐</span>
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-indigo-600">국제무역사</p>
                    <p className="text-xs text-gray-500">무역 분야 자격증</p>
                  </div>
                </Link>
                <Link
                  href="/category/trade/trade-english-1"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-all group"
                >
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-medium text-gray-800 group-hover:text-indigo-600">무역영어 1급</p>
                    <p className="text-xs text-gray-500">무역실무 영어</p>
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
