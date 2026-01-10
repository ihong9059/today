'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LossAdjusterPage() {
  const [showAIModal, setShowAIModal] = useState(false);

  const subjects1st = [
    { name: '보험이론', desc: '보험의 개념, 원리, 제도', icon: '📚', questions: 50 },
    { name: '보험업법', desc: '보험업법 및 시행령', icon: '⚖️', questions: 50 },
    { name: '손해사정이론', desc: '손해사정 기초 이론', icon: '📋', questions: 50 },
  ];

  const subjects2nd = [
    { name: '재물손해사정', desc: '화재·재물 손해사정', icon: '🏠', questions: 50 },
    { name: '차량손해사정', desc: '자동차 손해사정', icon: '🚗', questions: 50 },
    { name: '신체손해사정', desc: '신체 손해사정 실무', icon: '🏥', questions: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/insurance" className="inline-flex items-center text-orange-100 hover:text-white mb-4 transition">
            ← 보험 자격증
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">손해사정사</h1>
          <p className="text-xl text-orange-100 mb-6">보험사고 발생 시 손해액 및 보험금 산정 전문가</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/category/insurance/loss-adjuster/exam" className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition">
              시험 정보 보기
            </Link>
            <button onClick={() => setShowAIModal(true)} className="bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-800 transition">
              🤖 AI 학습 도우미
            </button>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-gray-500 text-sm">시험일정</div>
            <div className="font-bold text-gray-800">연 2회</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-gray-500 text-sm">합격기준</div>
            <div className="font-bold text-gray-800">과목당 40점↑, 평균 60점↑</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">⏰</div>
            <div className="text-gray-500 text-sm">시험시간</div>
            <div className="font-bold text-gray-800">과목당 60분</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">💼</div>
            <div className="text-gray-500 text-sm">진로</div>
            <div className="font-bold text-gray-800">보험사·손해사정법인</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="md:col-span-2 space-y-8">
            {/* 1차 시험 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm mr-3">1차</span>
                필기시험 과목
              </h2>
              <div className="grid gap-4">
                {subjects1st.map((subject, idx) => (
                  <Link key={idx} href={`/category/insurance/loss-adjuster/study/${['insurance-theory', 'insurance-law', 'damage-assessment'][idx]}`}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition group">
                    <span className="text-3xl mr-4">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 group-hover:text-orange-600">{subject.name}</h3>
                      <p className="text-gray-500 text-sm">{subject.desc}</p>
                    </div>
                    <span className="text-orange-500 font-medium">{subject.questions}문항 →</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2차 시험 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm mr-3">2차</span>
                실기시험 과목
              </h2>
              <div className="grid gap-4">
                {subjects2nd.map((subject, idx) => (
                  <Link key={idx} href={`/category/insurance/loss-adjuster/study/${['property-assessment', 'auto-assessment', 'body-assessment'][idx]}`}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition group">
                    <span className="text-3xl mr-4">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 group-hover:text-red-600">{subject.name}</h3>
                      <p className="text-gray-500 text-sm">{subject.desc}</p>
                    </div>
                    <span className="text-red-500 font-medium">{subject.questions}문항 →</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 자격 소개 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">손해사정사란?</h2>
              <div className="prose text-gray-600">
                <p>손해사정사는 보험사고 발생 시 손해액 및 보험금을 산정하는 전문 자격입니다. 보험계약자와 보험회사 사이에서 공정한 보험금 산정을 담당합니다.</p>
                <ul className="mt-4 space-y-2">
                  <li>• 재물손해사정사: 화재, 재물, 특종보험 손해사정</li>
                  <li>• 차량손해사정사: 자동차보험 손해사정</li>
                  <li>• 신체손해사정사: 상해, 질병, 신체 관련 손해사정</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">📌 시험 정보</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex justify-between"><span>시행기관</span><span className="font-medium">금융감독원</span></li>
                <li className="flex justify-between"><span>응시자격</span><span className="font-medium">제한없음</span></li>
                <li className="flex justify-between"><span>합격률</span><span className="font-medium">15~25%</span></li>
                <li className="flex justify-between"><span>응시료</span><span className="font-medium">50,000원</span></li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-bold mb-4">🎯 합격 전략</h3>
              <ul className="space-y-2 text-orange-100">
                <li>✓ 보험업법 조문 암기</li>
                <li>✓ 손해사정 계산문제 연습</li>
                <li>✓ 판례·사례 분석</li>
                <li>✓ 분야별 전문성 확보</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">🔗 관련 링크</h3>
              <ul className="space-y-2">
                <li><a href="https://www.fss.or.kr" target="_blank" className="text-orange-600 hover:underline">금융감독원 →</a></li>
                <li><a href="https://www.klia.or.kr" target="_blank" className="text-orange-600 hover:underline">생명보험협회 →</a></li>
                <li><a href="https://www.knia.or.kr" target="_blank" className="text-orange-600 hover:underline">손해보험협회 →</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAIModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI 학습 도우미</h3>
            <p className="text-gray-600 mb-6">손해사정사 시험 준비를 도와줄 AI를 선택하세요.</p>
            <div className="grid gap-3">
              <a href="https://claude.ai" target="_blank" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-orange-50 transition">
                <span className="text-2xl mr-3">🟠</span>
                <div><div className="font-semibold">Claude</div><div className="text-sm text-gray-500">Anthropic AI</div></div>
              </a>
              <a href="https://chat.openai.com" target="_blank" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 transition">
                <span className="text-2xl mr-3">🟢</span>
                <div><div className="font-semibold">ChatGPT</div><div className="text-sm text-gray-500">OpenAI</div></div>
              </a>
              <a href="https://gemini.google.com" target="_blank" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition">
                <span className="text-2xl mr-3">🔵</span>
                <div><div className="font-semibold">Gemini</div><div className="text-sm text-gray-500">Google AI</div></div>
              </a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
