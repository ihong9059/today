'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ActuaryMainPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const firstExamSubjects = [
    { name: '보험수학', desc: '확률론, 생명보험수학, 손해보험수학', questions: 25, icon: '📐' },
    { name: '보험계약법', desc: '상법 보험편, 보험업법, 약관규제법', questions: 25, icon: '⚖️' },
    { name: '경제학', desc: '미시경제학, 거시경제학, 금융경제학', questions: 25, icon: '📈' }
  ];

  const secondExamSubjects = [
    { name: '회계학', desc: '재무회계, 원가관리회계, 보험회계', questions: 25, icon: '📊' },
    { name: '보험업법및실무', desc: '보험업법, 보험감독규정, 계리실무', questions: 25, icon: '📋' }
  ];

  const aiQuestions = [
    '순보험료 산출의 대수의 법칙을 설명해주세요',
    '생명보험의 책임준비금 계산방법을 정리해주세요',
    '보험계약법상 고지의무 위반 효과를 알려주세요'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance" className="text-gray-500 hover:text-gray-700">보험·부동산</Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-600 font-medium">보험계리사</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-500 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4">
                <span className="text-5xl">🧮</span>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">보험계리사</h1>
                  <p className="text-indigo-100 mb-4">Actuary</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">난이도: ★★★★★</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">연간 약 1,500명 응시</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">합격률 1차 20% / 2차 15%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Info Cards */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-indigo-500 text-2xl mb-2">📖</div>
                <div className="text-sm text-gray-500">1차 시험</div>
                <div className="font-bold">3과목/객관식</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-indigo-500 text-2xl mb-2">📝</div>
                <div className="text-sm text-gray-500">2차 시험</div>
                <div className="font-bold">2과목/논술형</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-indigo-500 text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-500">응시료</div>
                <div className="font-bold">1차 30,000원</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-indigo-500 text-2xl mb-2">🏛️</div>
                <div className="text-sm text-gray-500">시행처</div>
                <div className="font-bold">금융감독원</div>
              </div>
            </section>

            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-indigo-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>보험계리사</strong>는 보험회사에서 보험료 산정, 책임준비금 평가,
                  보험상품 개발 등 보험의 핵심적인 계리업무를 수행하는 전문가입니다.
                  보험업법에 의해 보험회사는 반드시 보험계리사를 선임해야 합니다.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-indigo-50 rounded-xl p-4">
                    <h3 className="font-bold text-indigo-700 mb-2">주요 업무</h3>
                    <ul className="text-sm space-y-1">
                      <li>• 보험료 및 책임준비금 산출</li>
                      <li>• 보험상품 개발 및 인가 업무</li>
                      <li>• 보험계약 위험평가</li>
                      <li>• 보험회사 재무건전성 분석</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <h3 className="font-bold text-purple-700 mb-2">진로 분야</h3>
                    <ul className="text-sm space-y-1">
                      <li>• 생명/손해보험회사 계리팀</li>
                      <li>• 금융감독원, 보험개발원</li>
                      <li>• 계리컨설팅 법인</li>
                      <li>• 회계법인 보험계리부서</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 1차 시험 과목 */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-indigo-500">📚</span> 1차 시험 과목
              </h2>
              <div className="grid gap-4">
                {firstExamSubjects.map((subject, idx) => (
                  <Link
                    key={idx}
                    href={`/category/insurance/actuary/study/${
                      idx === 0 ? 'insurance-math' : idx === 1 ? 'insurance-law' : 'economics'
                    }`}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-white rounded-xl hover:shadow-md transition-all border border-indigo-100"
                  >
                    <span className="text-3xl">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-indigo-600 font-bold">{subject.questions}문항</div>
                      <div className="text-xs text-gray-400">학습하기 →</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* 2차 시험 과목 */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-purple-500">📝</span> 2차 시험 과목
              </h2>
              <div className="grid gap-4">
                {secondExamSubjects.map((subject, idx) => (
                  <Link
                    key={idx}
                    href={`/category/insurance/actuary/study/${
                      idx === 0 ? 'accounting' : 'insurance-business'
                    }`}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-white rounded-xl hover:shadow-md transition-all border border-purple-100"
                  >
                    <span className="text-3xl">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-600 font-bold">{subject.questions}문항</div>
                      <div className="text-xs text-gray-400">학습하기 →</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* AI Helper Section */}
            <section className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 border border-indigo-200">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-gray-600 mb-4">
                어려운 계리 개념을 AI에게 질문해보세요. 복잡한 수학적 개념도 쉽게 설명해드립니다.
              </p>
              <div className="grid gap-2">
                {aiQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setCurrentPrompt(q); setShowAIModal(true); }}
                    className="text-left p-3 bg-white/70 rounded-lg hover:bg-white transition-colors text-sm"
                  >
                    💡 {q}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border sticky top-24">
              <h3 className="font-bold text-lg mb-4">시험 일정</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">1차 시험</span>
                  <span className="font-medium">매년 4월</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">2차 시험</span>
                  <span className="font-medium">매년 7월</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">합격 기준</span>
                  <span className="font-medium">과목당 40점 이상</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">전과목 평균</span>
                  <span className="font-medium">60점 이상</span>
                </div>
              </div>
              <Link
                href="/category/insurance/actuary/exam"
                className="block w-full mt-6 py-3 bg-indigo-600 text-white text-center rounded-xl hover:bg-indigo-700 transition-colors font-medium"
              >
                시험 상세정보 →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">합격 전략</h3>
              <ul className="text-sm space-y-2 text-indigo-100">
                <li>✓ 1차: 보험수학 기초 완벽 정리</li>
                <li>✓ 확률론과 통계학 선행학습 필수</li>
                <li>✓ 2차: 논술형 답안작성 연습</li>
                <li>✓ 기출문제 반복 풀이</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="font-bold text-lg mb-4">추천 학습순서</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span className="text-sm">보험수학 (기초확률론)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span className="text-sm">경제학 (미시/거시)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span className="text-sm">보험계약법</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <span className="text-sm">회계학</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <span className="text-sm">보험업법및실무</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">AI에게 질문하기</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700">{currentPrompt}</p>
            </div>
            <div className="grid gap-3">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Claude에게 질문하기
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
              >
                ChatGPT에게 질문하기
              </a>
              <a
                href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Gemini에게 질문하기
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
