'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InsuranceBrokerPage() {
  const [showAIModal, setShowAIModal] = useState(false);

  const subjects = [
    { name: '보험이론', desc: '보험의 개념, 원리, 제도', icon: '📚', questions: 50, path: 'insurance-theory' },
    { name: '보험관계법규', desc: '보험업법, 보험계약법', icon: '⚖️', questions: 50, path: 'insurance-law' },
    { name: '보험업무', desc: '보험상품, 언더라이팅', icon: '📋', questions: 50, path: 'insurance-business' },
    { name: '위험관리론', desc: '리스크 분석 및 관리', icon: '🎯', questions: 50, path: 'risk-management' },
    { name: '중개실무', desc: '보험중개 실무지식', icon: '🤝', questions: 50, path: 'brokerage-practice' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/insurance" className="inline-flex items-center text-teal-100 hover:text-white mb-4 transition">
            ← 보험 자격증
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">보험중개사</h1>
          <p className="text-xl text-teal-100 mb-6">보험계약자를 위해 최적의 보험상품을 중개하는 전문가</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/category/insurance/insurance-broker/exam" className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition">
              시험 정보 보기
            </Link>
            <button onClick={() => setShowAIModal(true)} className="bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-800 transition">
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
            <div className="font-bold text-gray-800">연 1회</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-gray-500 text-sm">합격기준</div>
            <div className="font-bold text-gray-800">과목당 40점↑, 평균 60점↑</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">⏰</div>
            <div className="text-gray-500 text-sm">시험시간</div>
            <div className="font-bold text-gray-800">총 150분</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">💼</div>
            <div className="text-gray-500 text-sm">진로</div>
            <div className="font-bold text-gray-800">보험중개법인·컨설팅</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="md:col-span-2 space-y-8">
            {/* 시험 과목 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm mr-3">필기</span>
                시험 과목
              </h2>
              <div className="grid gap-4">
                {subjects.map((subject, idx) => (
                  <Link key={idx} href={`/category/insurance/insurance-broker/study/${subject.path}`}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition group">
                    <span className="text-3xl mr-4">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 group-hover:text-teal-600">{subject.name}</h3>
                      <p className="text-gray-500 text-sm">{subject.desc}</p>
                    </div>
                    <span className="text-teal-500 font-medium">{subject.questions}문항 →</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 자격 소개 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">보험중개사란?</h2>
              <div className="prose text-gray-600">
                <p>보험중개사는 보험계약자의 이익을 위해 독립적인 지위에서 보험회사와 계약자 사이의 보험계약 체결을 중개하는 전문가입니다.</p>
                <ul className="mt-4 space-y-2">
                  <li>• 독립적 지위에서 계약자를 위해 최적의 보험상품 추천</li>
                  <li>• 다수 보험회사 상품 비교 분석 능력</li>
                  <li>• 기업성 보험, 해상보험 등 전문 보험 중개</li>
                  <li>• 국제 보험 중개 업무 수행 가능</li>
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
                <li className="flex justify-between"><span>합격률</span><span className="font-medium">20~30%</span></li>
                <li className="flex justify-between"><span>응시료</span><span className="font-medium">50,000원</span></li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-bold mb-4">🎯 합격 전략</h3>
              <ul className="space-y-2 text-teal-100">
                <li>✓ 보험업법 조문 철저 암기</li>
                <li>✓ 위험관리 프로세스 이해</li>
                <li>✓ 중개실무 사례 분석</li>
                <li>✓ 최신 보험시장 동향 파악</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">🔗 관련 링크</h3>
              <ul className="space-y-2">
                <li><a href="https://www.fss.or.kr" target="_blank" className="text-teal-600 hover:underline">금융감독원 →</a></li>
                <li><a href="https://www.klia.or.kr" target="_blank" className="text-teal-600 hover:underline">생명보험협회 →</a></li>
                <li><a href="https://www.knia.or.kr" target="_blank" className="text-teal-600 hover:underline">손해보험협회 →</a></li>
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
            <p className="text-gray-600 mb-6">보험중개사 시험 준비를 도와줄 AI를 선택하세요.</p>
            <div className="grid gap-3">
              <a href="https://claude.ai" target="_blank" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-teal-50 transition">
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
