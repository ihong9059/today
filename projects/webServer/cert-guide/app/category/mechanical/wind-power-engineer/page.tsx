'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WindPowerEngineerPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const examSubjects = [
    {
      name: '풍력발전시스템 이론',
      description: '풍력 에너지 원리, 풍력터빈 공기역학, 바람 자원 분석',
      icon: '🌬️',
      topics: ['공기역학', '풍력 자원', '에너지 변환', '풍속 분포']
    },
    {
      name: '전력계통 및 전기설비',
      description: '계통 연계, 발전기, 전력변환장치, 보호시스템',
      icon: '⚡',
      topics: ['계통연계', '발전기', '전력변환', '보호장치']
    },
    {
      name: '풍력발전설비 설계',
      description: '터빈 선정, 타워 설계, 기초 설계, 전기설계',
      icon: '📐',
      topics: ['터빈 선정', '구조설계', '기초설계', '단지설계']
    },
    {
      name: '풍력발전설비 시공',
      description: '터빈 설치, 배선 공사, 시운전, 품질관리',
      icon: '🔧',
      topics: ['터빈 설치', '전기 시공', '시운전', '품질관리']
    },
    {
      name: '전기설비기술기준 및 법규',
      description: 'KEC, 신재생에너지법, 전기사업법, 안전관리법',
      icon: '📋',
      topics: ['KEC', '신재생에너지법', '전기사업법', '안전관리']
    }
  ];

  const practicalInfo = {
    title: '실기시험',
    type: '필답형 + 작업형',
    time: '약 4시간',
    description: '풍력발전시스템 설계도서 작성, 측정·시험, 고장진단 및 유지보수 실무'
  };

  const studyOrder = [
    { step: 1, subject: '풍력발전시스템 이론', reason: '풍력 에너지의 기본 원리 이해가 필수', duration: '4주' },
    { step: 2, subject: '전력계통 및 전기설비', reason: '발전기와 계통연계 기술의 핵심', duration: '4주' },
    { step: 3, subject: '풍력발전설비 설계', reason: '이론을 바탕으로 실제 설계 학습', duration: '3주' },
    { step: 4, subject: '풍력발전설비 시공', reason: '현장 적용을 위한 시공 지식', duration: '3주' },
    { step: 5, subject: '전기설비기술기준 및 법규', reason: '관련 법규와 기준 암기', duration: '2주' }
  ];

  const openAIModal = (prompt: string) => {
    setAiPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-cyan-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link>
            <span>/</span>
            <Link href="/category/mechanical" className="hover:text-white">기계·전기·전자</Link>
            <span>/</span>
            <span className="text-white">풍력발전설비기사</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">🌪️</span>
            <div>
              <h1 className="text-4xl font-bold mb-2">풍력발전설비기사</h1>
              <p className="text-xl text-cyan-100">Engineer Wind Power</p>
            </div>
          </div>
          <p className="text-lg text-cyan-50 max-w-3xl">
            풍력발전시스템의 설계, 시공, 운영 및 유지보수에 관한 전문 지식과 기술을 갖춘
            신재생에너지 분야의 핵심 전문가 자격입니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/category/mechanical/wind-power-engineer/exam"
              className="bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition-colors"
            >
              📝 시험 정보 보기
            </Link>
            <button
              onClick={() => openAIModal('풍력발전설비기사 자격증 취득을 위한 효율적인 학습 전략과 합격 팁을 알려주세요.')}
              className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors border border-cyan-400"
            >
              🤖 AI 학습 도우미
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-sm text-gray-500">필기과목</div>
                <div className="text-xl font-bold text-gray-900">5과목</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">❓</div>
                <div className="text-sm text-gray-500">문항수</div>
                <div className="text-xl font-bold text-gray-900">100문항</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">⏱️</div>
                <div className="text-sm text-gray-500">시험시간</div>
                <div className="text-xl font-bold text-gray-900">2시간 30분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">✅</div>
                <div className="text-sm text-gray-500">합격기준</div>
                <div className="text-xl font-bold text-gray-900">60점 이상</div>
              </div>
            </div>

            {/* 자격 개요 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📌 자격 개요</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  풍력발전설비기사는 풍력발전시스템의 설계, 시공, 운영 및 유지보수에 관한 전문 지식과
                  기술을 갖추고, 신재생에너지 분야의 핵심 인력으로 활동하는 국가기술자격입니다.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-900 mb-2">💼 주요 직무</h4>
                    <ul className="text-sm text-cyan-700 space-y-1">
                      <li>• 풍력발전단지 설계 및 시공</li>
                      <li>• 풍력터빈 운영 및 유지보수</li>
                      <li>• 바람 자원 분석 및 발전량 예측</li>
                      <li>• 계통 연계 및 전력품질 관리</li>
                    </ul>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-4">
                    <h4 className="font-semibold text-teal-900 mb-2">🏢 취업 분야</h4>
                    <ul className="text-sm text-teal-700 space-y-1">
                      <li>• 풍력발전 전문 기업</li>
                      <li>• 발전 공기업 (한전, 발전자회사)</li>
                      <li>• 신재생에너지 컨설팅</li>
                      <li>• 풍력터빈 제조사</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 필기시험 과목 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 필기시험 과목</h2>
              <div className="space-y-4">
                {examSubjects.map((subject, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-cyan-300 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{subject.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{subject.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {subject.topics.map((topic, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
                        20문항
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 실기시험 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">✍️ 실기시험</h2>
              <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">📋</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{practicalInfo.title}</h3>
                    <p className="text-gray-600">{practicalInfo.type} | {practicalInfo.time}</p>
                  </div>
                </div>
                <p className="text-gray-700">{practicalInfo.description}</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-cyan-600">설계도서</div>
                    <div className="text-sm text-gray-500">단선결선도, 배치도</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-cyan-600">측정·시험</div>
                    <div className="text-sm text-gray-500">풍속, 출력, 진동</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-cyan-600">유지보수</div>
                    <div className="text-sm text-gray-500">고장진단, 정비</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 추천 공부 순서 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📖 추천 공부 순서</h2>
              <div className="space-y-4">
                {studyOrder.map((item) => (
                  <div key={item.step} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{item.subject}</h3>
                        <span className="text-sm text-cyan-600 font-medium">{item.duration}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-cyan-50 rounded-xl">
                <h4 className="font-semibold text-cyan-900 mb-2">💡 학습 TIP</h4>
                <ul className="text-sm text-cyan-700 space-y-1">
                  <li>• 태양광발전설비기사와 함께 취득하면 신재생에너지 전문가로 경쟁력 UP</li>
                  <li>• 공기역학과 전력계통 이론이 핵심 - 기본기를 탄탄히</li>
                  <li>• 실기는 현장 경험이 중요하므로 관련 실습 기회 활용</li>
                </ul>
              </div>
            </div>

            {/* AI 학습 도우미 */}
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">🤖 AI 학습 도우미</h2>
              <p className="text-cyan-100 mb-6">
                풍력발전설비기사 시험 준비에 필요한 모든 것을 AI에게 물어보세요!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => openAIModal('풍력발전설비기사 필기시험 과목별 출제 비중과 중요 토픽을 정리해주세요.')}
                  className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors"
                >
                  <span className="font-medium">📊 과목별 출제 비중</span>
                </button>
                <button
                  onClick={() => openAIModal('풍력발전설비기사 실기시험 준비 방법과 자주 출제되는 문제 유형을 알려주세요.')}
                  className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors"
                >
                  <span className="font-medium">✍️ 실기 준비 가이드</span>
                </button>
                <button
                  onClick={() => openAIModal('풍력발전설비기사와 태양광발전설비기사를 함께 준비하는 효율적인 방법을 알려주세요.')}
                  className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors"
                >
                  <span className="font-medium">🔗 연계 자격증 전략</span>
                </button>
                <button
                  onClick={() => openAIModal('풍력발전 분야 취업 전망과 풍력발전설비기사 자격증의 활용도를 알려주세요.')}
                  className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors"
                >
                  <span className="font-medium">💼 취업 및 전망</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* 시험 일정 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📅 2026년 시험 일정</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-cyan-500 pl-3">
                  <div className="font-medium text-gray-900">제1회</div>
                  <div className="text-sm text-gray-500">필기: 3월 2주</div>
                  <div className="text-sm text-gray-500">실기: 4월 3주</div>
                </div>
                <div className="border-l-4 border-teal-500 pl-3">
                  <div className="font-medium text-gray-900">제2회</div>
                  <div className="text-sm text-gray-500">필기: 6월 1주</div>
                  <div className="text-sm text-gray-500">실기: 7월 2주</div>
                </div>
                <div className="border-l-4 border-cyan-500 pl-3">
                  <div className="font-medium text-gray-900">제3회</div>
                  <div className="text-sm text-gray-500">필기: 9월 2주</div>
                  <div className="text-sm text-gray-500">실기: 10월 3주</div>
                </div>
              </div>
              <a
                href="https://www.q-net.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center text-sm text-cyan-600 hover:text-cyan-700"
              >
                큐넷에서 정확한 일정 확인 →
              </a>
            </div>

            {/* 합격률 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📊 합격률 현황</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">필기시험</span>
                    <span className="font-medium text-gray-900">약 35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{width: '35%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">실기시험</span>
                    <span className="font-medium text-gray-900">약 45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                * 최근 시험 기준, 회차별로 다를 수 있음
              </p>
            </div>

            {/* 연계 자격증 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🔗 연계 자격증</h3>
              <div className="space-y-3">
                <Link href="/category/mechanical/solar-power-engineer" className="block p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                  <div className="font-medium text-gray-900">☀️ 태양광발전설비기사</div>
                  <div className="text-sm text-gray-500">신재생에너지 전문가 완성</div>
                </Link>
                <Link href="/category/mechanical/electrical-engineer" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="font-medium text-gray-900">⚡ 전기기사</div>
                  <div className="text-sm text-gray-500">전기 분야 기본 자격</div>
                </Link>
                <Link href="/category/mechanical/electrical-construction" className="block p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <div className="font-medium text-gray-900">🔌 전기공사기사</div>
                  <div className="text-sm text-gray-500">시공 분야 확장</div>
                </Link>
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📚 추천 교재</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">풍력발전설비기사 필기</div>
                  <div className="text-sm text-gray-500">한국풍력에너지연구원</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">풍력발전공학</div>
                  <div className="text-sm text-gray-500">대학 전공 서적</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">신재생에너지 실무</div>
                  <div className="text-sm text-gray-500">현장 실무 가이드</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">🤖 AI에게 질문하기</h3>
              <button
                onClick={() => setShowAIModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700">{aiPrompt}</p>
            </div>
            <div className="space-y-2">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(aiPrompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-colors"
              >
                Claude에서 질문하기
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(aiPrompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-colors"
              >
                ChatGPT에서 질문하기
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(aiPrompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-colors"
              >
                Gemini에서 질문하기
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
