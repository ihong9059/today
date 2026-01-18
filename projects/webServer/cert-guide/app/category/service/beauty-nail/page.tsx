'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BeautyNailPage() {
  const [showAIModal, setShowAIModal] = useState(false);

  const subjects = [
    { name: '네일 개론', path: 'nail-theory', icon: '📚', desc: '네일의 구조, 기능, 위생' },
    { name: '네일 아트', path: 'nail-art', icon: '🎨', desc: '네일 디자인, 컬러링, 아트 기법' },
    { name: '매니큐어', path: 'manicure', icon: '💅', desc: '손톱 관리, 큐티클, 폴리시' },
    { name: '페디큐어', path: 'pedicure', icon: '🦶', desc: '발톱 관리, 풋케어, 각질' },
    { name: '실기', path: 'practical', icon: '✨', desc: '실기시험 대비 실전 문제' },
  ];

  const examSchedule2026 = [
    { round: '1회', apply: '1.3~1.9', written: '2.8~2.21', practical: '3.29~4.11' },
    { round: '2회', apply: '3.21~3.27', written: '4.19~5.2', practical: '6.7~6.20' },
    { round: '3회', apply: '6.6~6.12', written: '7.5~7.18', practical: '8.23~9.5' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/category/service" className="text-rose-600 hover:text-rose-800 font-medium">
              ← 서비스 분야
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">💅 미용사(네일)</h1>
              <p className="text-rose-100 text-lg mb-4">네일 아트 전문 기술을 인정받는 국가기술자격</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">난이도 ★★★☆☆</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">연 4만명 응시</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">실기 중요</span>
              </div>
            </div>
            <div className="mt-6 md:mt-0 text-center">
              <div className="inline-block bg-white/20 rounded-2xl p-6">
                <p className="text-rose-100 text-sm mb-1">2024 합격률</p>
                <p className="text-4xl font-bold">필기 48%</p>
                <p className="text-4xl font-bold">실기 42%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Info */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm">
            <p className="text-3xl mb-2">📋</p>
            <p className="text-gray-500 text-sm">시험 유형</p>
            <p className="font-bold text-gray-800">필기 + 실기</p>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm">
            <p className="text-3xl mb-2">⏱️</p>
            <p className="text-gray-500 text-sm">필기 시간</p>
            <p className="font-bold text-gray-800">60분</p>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm">
            <p className="text-3xl mb-2">✅</p>
            <p className="text-gray-500 text-sm">합격 기준</p>
            <p className="font-bold text-gray-800">60점 이상</p>
          </div>
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm">
            <p className="text-3xl mb-2">💰</p>
            <p className="text-gray-500 text-sm">응시료</p>
            <p className="font-bold text-gray-800">필기 14,500원</p>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📌 자격증 소개</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            미용사(네일)는 손톱과 발톱의 관리, 네일 아트, 인조 네일 시술 등 네일 미용에 관한 전문 기술을
            평가하는 국가기술자격입니다. 네일 아트의 인기와 함께 수요가 꾸준히 증가하고 있습니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-rose-50 rounded-xl p-4">
              <h3 className="font-bold text-rose-700 mb-2">💼 주요 업무</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 네일 케어 및 손발 관리</li>
                <li>• 네일 폴리시, 젤 네일 시술</li>
                <li>• 네일 아트 및 디자인</li>
                <li>• 인조 네일 연장 시술</li>
              </ul>
            </div>
            <div className="bg-pink-50 rounded-xl p-4">
              <h3 className="font-bold text-pink-700 mb-2">🏢 취업 분야</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 네일샵, 네일아트 전문점</li>
                <li>• 뷰티샵, 피부관리실</li>
                <li>• 웨딩샵, 스튜디오</li>
                <li>• 개인 창업</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Subjects Section */}
        <section className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">📚 과목별 학습</h2>
            <Link href="/category/service/beauty-nail/exam" className="text-rose-600 hover:text-rose-800 text-sm font-medium">
              시험 상세 →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject.path}
                href={`/category/service/beauty-nail/study/${subject.path}`}
                className="group bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-5 hover:from-rose-100 hover:to-pink-100 transition-all hover:shadow-md"
              >
                <div className="text-3xl mb-3">{subject.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">{subject.name}</h3>
                <p className="text-xs text-gray-500">{subject.desc}</p>
                <div className="mt-3 text-rose-600 text-sm font-medium group-hover:text-rose-700">
                  학습하기 →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Exam Schedule */}
        <section className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📅 2026년 시험 일정</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-gray-600">회차</th>
                  <th className="py-3 px-4 text-left text-gray-600">접수 기간</th>
                  <th className="py-3 px-4 text-left text-gray-600">필기시험</th>
                  <th className="py-3 px-4 text-left text-gray-600">실기시험</th>
                </tr>
              </thead>
              <tbody>
                {examSchedule2026.map((schedule) => (
                  <tr key={schedule.round} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">{schedule.round}</td>
                    <td className="py-3 px-4 text-gray-600">{schedule.apply}</td>
                    <td className="py-3 px-4 text-gray-600">{schedule.written}</td>
                    <td className="py-3 px-4 text-gray-600">{schedule.practical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Study Tips */}
        <section className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💡 합격 전략</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-rose-600 mb-3">📝 필기시험 공부법</h3>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="font-bold text-rose-500">1.</span> 네일 개론으로 기초 다지기</li>
                <li className="flex gap-2"><span className="font-bold text-rose-500">2.</span> 매니큐어/페디큐어 시술 과정 이해</li>
                <li className="flex gap-2"><span className="font-bold text-rose-500">3.</span> 네일 아트 기법 및 재료 숙지</li>
                <li className="flex gap-2"><span className="font-bold text-rose-500">4.</span> 기출문제 반복 풀이</li>
              </ol>
            </div>
            <div>
              <h3 className="font-bold text-pink-600 mb-3">🛠️ 실기시험 준비</h3>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="font-bold text-pink-500">1.</span> 시험 과제 순서와 시간 배분 연습</li>
                <li className="flex gap-2"><span className="font-bold text-pink-500">2.</span> 재료 준비 및 정리 정돈 습관화</li>
                <li className="flex gap-2"><span className="font-bold text-pink-500">3.</span> 위생 관리 및 안전 수칙 철저</li>
                <li className="flex gap-2"><span className="font-bold text-pink-500">4.</span> 실제 모델 시술 연습 필수</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Recommended Study Order */}
        <section className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📖 추천 학습 순서</h2>
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-white px-4 py-2 rounded-full font-medium text-rose-700 shadow-sm">1. 네일 개론</span>
            <span className="text-rose-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full font-medium text-rose-700 shadow-sm">2. 매니큐어</span>
            <span className="text-rose-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full font-medium text-rose-700 shadow-sm">3. 페디큐어</span>
            <span className="text-rose-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full font-medium text-rose-700 shadow-sm">4. 네일 아트</span>
            <span className="text-rose-400">→</span>
            <span className="bg-white px-4 py-2 rounded-full font-medium text-rose-700 shadow-sm">5. 실기</span>
          </div>
        </section>

        {/* AI Helper */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🤖 AI 학습 도우미</h2>
          <p className="text-gray-600 mb-4">
            네일 관련 용어, 시술 방법, 문제 해설 등 궁금한 점을 AI에게 물어보세요.
          </p>
          <button
            onClick={() => setShowAIModal(true)}
            className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-bold hover:from-rose-600 hover:to-pink-600 transition"
          >
            AI에게 질문하기
          </button>
        </section>
      </main>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">🤖 AI 선택</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent('미용사(네일) 자격증 시험에 대해 알려주세요. 시험 과목, 합격 기준, 공부 방법 등을 상세히 설명해주세요.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"
                >
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent('미용사(네일) 자격증 시험에 대해 알려주세요. 시험 과목, 합격 기준, 공부 방법 등을 상세히 설명해주세요.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"
                >
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/?q=${encodeURIComponent('미용사(네일) 자격증 시험에 대해 알려주세요. 시험 과목, 합격 기준, 공부 방법 등을 상세히 설명해주세요.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"
                >
                  <span className="text-2xl">💙</span>
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
