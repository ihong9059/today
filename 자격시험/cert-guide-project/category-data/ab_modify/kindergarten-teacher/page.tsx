'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function KindergartenTeacherPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const handleAIHelp = (topic: string) => {
    setCurrentPrompt(`유치원정교사 자격증 ${topic}에 대해 자세히 설명해주세요. 응시자격, 취득방법, 시험과목, 합격기준, 취업전망 등을 포함해서 설명해주세요.`);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-purple-600/10" />
        <div className="max-w-6xl mx-auto px-4 py-16 relative">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-pink-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/education" className="hover:text-pink-600 transition">교육</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">유치원정교사</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <span>🎒</span>
                <span>국가자격증 · 교육부</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                유치원정교사
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                유아교육의 전문가로서 유치원에서 만 3~5세 유아의 교육을 담당하는 국가공인 자격증입니다.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/category/education/kindergarten-teacher/exam"
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-xl hover:from-pink-600 hover:to-purple-600 transition shadow-lg"
                >
                  📋 시험정보 보기
                </Link>
                <button
                  onClick={() => handleAIHelp('전체 개요')}
                  className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition shadow-lg border"
                >
                  🤖 AI에게 질문하기
                </button>
              </div>
            </div>
            <div className="w-64 h-64 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-8xl">👶</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '📚', label: '자격 구분', value: '1급/2급' },
            { icon: '🏫', label: '시행 기관', value: '교육부' },
            { icon: '📅', label: '취득 방법', value: '양성과정' },
            { icon: '💼', label: '취업 분야', value: '유치원' }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-lg text-center">
              <span className="text-3xl mb-2 block">{item.icon}</span>
              <p className="text-gray-500 text-sm">{item.label}</p>
              <p className="font-bold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* 자격개요 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">📋</span> 자격 개요
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  유치원정교사는 「유아교육법」에 따라 유치원에서 만 3세부터 초등학교 취학 전 유아의 교육을 담당하는 교원 자격증입니다.
                  유아의 신체적, 정서적, 사회적, 인지적 발달을 촉진하고 기본 생활습관을 형성하는 데 핵심적인 역할을 수행합니다.
                </p>
                <p>
                  유치원정교사 자격은 1급과 2급으로 구분되며, 2급은 대학에서 유아교육 관련 학과를 졸업하거나 보육교사 1급 자격 취득 후
                  일정 경력을 갖추면 취득할 수 있습니다. 1급은 2급 취득 후 교육경력과 자격연수를 통해 승급합니다.
                </p>
              </div>
            </div>

            {/* 응시자격 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">✅</span> 자격 취득 요건
              </h2>
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-xl p-4">
                  <h3 className="font-bold text-purple-800 mb-2">2급 정교사</h3>
                  <ul className="text-purple-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>대학(2~4년제)에서 유아교육과 졸업 (관련 학점 이수)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>대학원에서 유아교육 전공 석사 이상 학위 취득</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>보육교사 1급 + 유치원 1년 이상 근무 + 재교육 이수</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <h3 className="font-bold text-pink-800 mb-2">1급 정교사</h3>
                  <ul className="text-pink-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>2급 정교사 자격증 취득 후 3년 이상 교육경력</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>1급 정교사 자격연수(180시간 이상) 이수</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>유아교육 석·박사 학위 + 2급 취득 + 1년 이상 경력</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 임용시험 안내 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">📝</span> 공립유치원 임용시험
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  공립유치원 교사가 되기 위해서는 유치원정교사 자격증 취득 후 각 시·도교육청에서 시행하는
                  유치원교사 임용시험에 합격해야 합니다.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                    <h3 className="font-bold text-blue-800 mb-2">1차 시험 (필기)</h3>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• 교육학: 1문항 (논술)</li>
                      <li>• 전공: 유아교육학 40문항</li>
                      <li>• 시험시간: 약 4시간</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                    <h3 className="font-bold text-green-800 mb-2">2차 시험</h3>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• 교직적성 심층면접</li>
                      <li>• 수업실연 (지도안 작성 포함)</li>
                      <li>• 구술면접</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 시험과목 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">📖</span> 주요 학습 영역
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: '유아교육개론', desc: '유아교육의 역사, 철학, 이론적 기초', icon: '📚' },
                  { name: '아동발달', desc: '인지, 언어, 사회정서, 신체 발달', icon: '🌱' },
                  { name: '유치원 교육과정', desc: '누리과정, 교육계획, 평가', icon: '📋' },
                  { name: '교수학습방법', desc: '놀이중심, 활동중심 교수법', icon: '🎯' },
                  { name: '유아교과교육론', desc: '언어, 수학, 과학, 예술 교육', icon: '🎨' },
                  { name: '유아교육기관 운영', desc: '학급경영, 부모교육, 행정', icon: '🏫' }
                ].map((subject, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-pink-50 transition">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div>
                        <h3 className="font-bold text-gray-900">{subject.name}</h3>
                        <p className="text-sm text-gray-600">{subject.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 과목별 학습 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">📚</span> 과목별 AI 학습
              </h2>
              <p className="text-gray-600 mb-6">
                각 과목별로 핵심 문제를 AI와 함께 학습하세요.
                Claude, ChatGPT, Gemini 중 원하는 AI를 선택할 수 있습니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: '유아교육개론', path: 'early-childhood-education', icon: '📚', count: 50, color: 'pink' },
                  { name: '아동발달', path: 'child-development', icon: '🌱', count: 50, color: 'purple' },
                  { name: '유치원 교육과정', path: 'curriculum', icon: '📋', count: 50, color: 'blue' },
                  { name: '교수학습방법', path: 'teaching-methods', icon: '🎯', count: 50, color: 'green' },
                  { name: '면접', path: 'interview', icon: '🎤', count: 25, color: 'orange' }
                ].map((subject) => (
                  <Link
                    key={subject.path}
                    href={`/category/education/kindergarten-teacher/study/${subject.path}`}
                    className={`flex items-center gap-4 p-4 bg-gradient-to-r from-${subject.color}-50 to-${subject.color}-100 rounded-xl hover:shadow-md transition border border-${subject.color}-200`}
                  >
                    <span className="text-3xl">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{subject.name}</h3>
                      <p className="text-sm text-gray-600">{subject.count}문제</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* 진로 및 전망 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-pink-500">💼</span> 진로 및 전망
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">취업 분야</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      <span>공립/사립 유치원 교사</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      <span>유아교육 관련 연구기관</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      <span>유아교육 콘텐츠 개발</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      <span>유치원 원감/원장 (경력 후)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">처우 및 전망</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>공립: 교원 봉급표 적용</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>사립: 기관별 상이 (공무원 준용)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>무상교육 확대로 수요 증가</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>놀이중심 교육 전문성 중요</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* 시험 일정 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📅 임용시험 일정</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">원서접수</span>
                  <span className="font-medium">10월 중</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">1차 시험</span>
                  <span className="font-medium">11월 중</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">1차 발표</span>
                  <span className="font-medium">12월 중</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">2차 시험</span>
                  <span className="font-medium">1월 중</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">최종 발표</span>
                  <span className="font-medium">1~2월</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">※ 시·도교육청별로 일정 상이</p>
            </div>

            {/* 관련 자격증 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🔗 관련 자격증</h3>
              <div className="space-y-3">
                <Link
                  href="/category/education/teacher-certificate"
                  className="block p-3 bg-gray-50 rounded-xl hover:bg-pink-50 transition"
                >
                  <p className="font-medium text-gray-900">교원자격증</p>
                  <p className="text-sm text-gray-500">초중고 교사 자격</p>
                </Link>
                <Link
                  href="/category/welfare/childcare-teacher"
                  className="block p-3 bg-gray-50 rounded-xl hover:bg-pink-50 transition"
                >
                  <p className="font-medium text-gray-900">보육교사</p>
                  <p className="text-sm text-gray-500">어린이집 보육 담당</p>
                </Link>
                <Link
                  href="/category/welfare/youth-counselor-2"
                  className="block p-3 bg-gray-50 rounded-xl hover:bg-pink-50 transition"
                >
                  <p className="font-medium text-gray-900">청소년상담사</p>
                  <p className="text-sm text-gray-500">청소년 상담 전문가</p>
                </Link>
              </div>
            </div>

            {/* AI 학습 도우미 */}
            <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">🤖 AI 학습 도우미</h3>
              <p className="text-pink-100 text-sm mb-4">
                유치원정교사 시험 준비에 대해 AI에게 질문해보세요!
              </p>
              <button
                onClick={() => handleAIHelp('학습 방법과 합격 전략')}
                className="w-full py-3 bg-white text-pink-600 font-medium rounded-xl hover:bg-pink-50 transition"
              >
                AI에게 질문하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">🤖 AI 학습 도우미</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-6 text-sm bg-gray-50 p-4 rounded-xl">
                {currentPrompt.slice(0, 100)}...
              </p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-xl transition border border-orange-200"
                >
                  <span className="text-3xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-sm text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition border border-green-200"
                >
                  <span className="text-3xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-sm text-green-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition border border-blue-200"
                >
                  <span className="text-3xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-sm text-blue-600">Google AI</p>
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
