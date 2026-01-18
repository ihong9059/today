'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DistributionManager3ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'guide'>('written');
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const handleAIHelp = (topic: string) => {
    setCurrentPrompt(`유통관리사 3급 ${topic}에 대해 자세히 설명해주세요. 시험 출제 경향과 핵심 내용을 알려주세요.`);
    setShowAIModal(true);
  };

  const subjects = [
    {
      name: '유통상식',
      icon: '📦',
      questions: 12,
      topics: [
        '유통의 정의와 기능',
        '유통경로의 이해',
        '도매업과 소매업',
        '물류의 기초',
        '유통환경 변화',
        '유통관련 법규',
      ],
    },
    {
      name: '판매 및 고객응대',
      icon: '🤝',
      questions: 12,
      topics: [
        '판매의 기본 개념',
        '고객응대 기본자세',
        '판매화법 기초',
        '상품설명 방법',
        '결제 처리',
        '포장 기술',
      ],
    },
    {
      name: '소매경영',
      icon: '🏪',
      questions: 12,
      topics: [
        '소매업의 유형',
        '매장 관리 기초',
        '상품 진열 기본',
        '재고 관리 개념',
        '매장 청결 관리',
        '영업 준비',
      ],
    },
    {
      name: '유통정보 기초',
      icon: '💻',
      questions: 12,
      topics: [
        'POS 시스템 개요',
        '바코드의 이해',
        '영수증 처리',
        '카드결제 기초',
        '재고시스템 개념',
        '전자상거래 기초',
      ],
    },
    {
      name: '고객서비스',
      icon: '⭐',
      questions: 12,
      topics: [
        '서비스 마인드',
        '고객만족의 이해',
        '불만 고객 응대',
        '전화응대 기초',
        '서비스 예절',
        '개인정보 보호',
      ],
    },
  ];

  const examSchedule = [
    { round: '제1회', apply: '2월 초', exam: '3월 중', result: '4월 초' },
    { round: '제2회', apply: '4월 초', exam: '5월 중', result: '6월 초' },
    { round: '제3회', apply: '7월 초', exam: '8월 중', result: '9월 초' },
    { round: '제4회', apply: '10월 초', exam: '11월 중', result: '12월 초' },
  ];

  const strategies = [
    {
      title: '기초 개념 이해',
      icon: '📚',
      desc: '3급은 기초 개념 이해가 핵심입니다. 용어의 정확한 의미를 파악하고 기본 원리를 이해하세요.',
    },
    {
      title: '기출문제 학습',
      icon: '📝',
      desc: '최근 기출문제를 풀어보며 출제 패턴을 파악하세요. 비슷한 유형이 반복 출제됩니다.',
    },
    {
      title: '실무 연결',
      icon: '💡',
      desc: '유통 매장에서 실제로 일어나는 상황을 떠올리며 공부하면 이해가 더 쉽습니다.',
    },
    {
      title: '시간 관리',
      icon: '⏱️',
      desc: '60문항을 60분 내에 풀어야 합니다. 문항당 1분이니 여유있게 풀 수 있습니다.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link
            href="/category/trade/distribution-manager-3"
            className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 transition-colors"
          >
            ← 유통관리사 3급 메인으로
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black mb-4">
            📋 시험 상세정보
          </h1>
          <p className="text-green-100 text-lg">
            유통관리사 3급 필기시험의 상세 정보와 합격 전략을 확인하세요.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'written'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'guide'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📖 시험안내
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === 'written' ? (
          <div className="space-y-8">
            {/* Exam Overview */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">📋</span>
                시험 개요
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: '시험시간', value: '60분', icon: '⏱️' },
                  { label: '총 문항', value: '60문항', icon: '📝' },
                  { label: '합격기준', value: '60점 이상 (절대평가)', icon: '🎯' },
                  { label: '출제방식', value: '객관식 4지선다', icon: '✏️' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-bold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Subjects Detail */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">📚</span>
                과목별 출제범위
              </h2>
              <div className="space-y-6">
                {subjects.map((subject, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{subject.icon}</span>
                        <div>
                          <h3 className="font-bold text-gray-800">{subject.name}</h3>
                          <p className="text-sm text-gray-500">{subject.questions}문항 출제</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAIHelp(subject.name)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                      >
                        🤖 AI 도움
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {subject.topics.map((topic, tidx) => (
                          <div
                            key={tidx}
                            className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors cursor-pointer"
                            onClick={() => handleAIHelp(topic)}
                          >
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Links */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">📖</span>
                과목별 학습하기
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: '유통상식', icon: '📦', href: '/category/trade/distribution-manager-3/study/distribution-basics' },
                  { name: '판매 및 고객응대', icon: '🤝', href: '/category/trade/distribution-manager-3/study/sales-basics' },
                  { name: '소매경영', icon: '🏪', href: '/category/trade/distribution-manager-3/study/retail-basics' },
                  { name: '유통정보 기초', icon: '💻', href: '/category/trade/distribution-manager-3/study/distribution-info-basics' },
                  { name: '고객서비스', icon: '⭐', href: '/category/trade/distribution-manager-3/study/customer-service' },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-green-50/50 rounded-xl hover:from-green-50 hover:to-emerald-50 transition-all border border-gray-100 hover:border-green-200 group"
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <p className="font-bold text-gray-800 group-hover:text-green-600">{item.name}</p>
                      <p className="text-sm text-gray-500">50문항 학습</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Exam Schedule */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">📅</span>
                시험 일정 (연간)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-50 to-emerald-50">
                      <th className="px-6 py-4 text-left font-bold text-gray-700 rounded-l-xl">회차</th>
                      <th className="px-6 py-4 text-left font-bold text-gray-700">원서접수</th>
                      <th className="px-6 py-4 text-left font-bold text-gray-700">시험일</th>
                      <th className="px-6 py-4 text-left font-bold text-gray-700 rounded-r-xl">합격발표</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {examSchedule.map((schedule, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-green-600">{schedule.round}</td>
                        <td className="px-6 py-4 text-gray-600">{schedule.apply}</td>
                        <td className="px-6 py-4 text-gray-600">{schedule.exam}</td>
                        <td className="px-6 py-4 text-gray-600">{schedule.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                ※ 정확한 일정은 대한상공회의소 자격평가사업단 홈페이지에서 확인하세요.
              </p>
            </div>

            {/* Application Info */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">📝</span>
                응시 안내
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h3 className="font-bold text-green-700 mb-3">👥 응시자격</h3>
                  <p className="text-gray-600">제한 없음</p>
                  <p className="text-sm text-gray-500 mt-2">연령, 학력, 경력 제한 없이 누구나 응시 가능</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <h3 className="font-bold text-emerald-700 mb-3">💰 응시료</h3>
                  <p className="text-gray-600">필기 15,000원</p>
                  <p className="text-sm text-gray-500 mt-2">CBT 방식으로 시행</p>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 border border-teal-100">
                  <h3 className="font-bold text-teal-700 mb-3">📍 시험장소</h3>
                  <p className="text-gray-600">전국 CBT 시험장</p>
                  <p className="text-sm text-gray-500 mt-2">상공회의소 지정 CBT 센터에서 시행</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-xl p-6 border border-cyan-100">
                  <h3 className="font-bold text-cyan-700 mb-3">🌐 접수방법</h3>
                  <p className="text-gray-600">인터넷 접수</p>
                  <p className="text-sm text-gray-500 mt-2">license.korcham.net 에서 접수</p>
                </div>
              </div>
            </div>

            {/* Strategies */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">🎯</span>
                합격 전략
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {strategies.map((strategy, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{strategy.icon}</span>
                      <h3 className="font-bold text-gray-800">{strategy.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{strategy.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pass Rate */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">📊</span>
                합격률 현황
              </h2>
              <div className="space-y-4">
                {[
                  { year: '2024년', rate: '72%', applicants: '약 5,000명' },
                  { year: '2023년', rate: '68%', applicants: '약 4,500명' },
                  { year: '2022년', rate: '65%', applicants: '약 4,200명' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="font-bold text-gray-700 w-20">{item.year}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-end pr-4"
                        style={{ width: item.rate }}
                      >
                        <span className="text-white text-sm font-bold">{item.rate}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 w-28">{item.applicants}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-500">
                ※ 유통관리사 3급은 입문 자격으로 비교적 높은 합격률을 보입니다.
              </p>
            </div>
          </div>
        )}
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
