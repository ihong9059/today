'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DamageAssessorPage() {
  const [showAIModal, setShowAIModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격증 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-emerald-600 transition-colors">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance" className="text-gray-600 hover:text-emerald-600 transition-colors">보험·부동산</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">손해평가사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            국가전문자격
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">손해평가사</h1>
          <p className="text-xl text-emerald-100 mb-6">농작물·가축 재해보험 손해평가 전문가</p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="block text-2xl font-bold">연 1회</span>
              <span className="text-sm text-emerald-100">시험 횟수</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="block text-2xl font-bold">약 15%</span>
              <span className="text-sm text-emerald-100">합격률</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="block text-2xl font-bold">농금원</span>
              <span className="text-sm text-emerald-100">시행기관</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { icon: "📅", title: "시험일정", desc: "매년 6~7월경", color: "bg-emerald-500" },
            { icon: "📝", title: "시험방식", desc: "1차 객관식, 2차 주관식", color: "bg-teal-500" },
            { icon: "💰", title: "응시료", desc: "1차 20,000원 / 2차 30,000원", color: "bg-cyan-500" },
            { icon: "🎯", title: "합격기준", desc: "과목당 40점, 평균 60점 이상", color: "bg-blue-500" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow border-t-4" style={{borderTopColor: item.color.replace('bg-', '').includes('emerald') ? '#10b981' : item.color.includes('teal') ? '#14b8a6' : item.color.includes('cyan') ? '#06b6d4' : '#3b82f6'}}>
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-bold text-gray-800 mt-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">🌾</span>
            손해평가사란?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                손해평가사는 「농어업재해보험법」에 따라 농작물재해보험과 가축재해보험의 손해평가를
                전문적으로 수행하는 국가전문자격사입니다. 태풍, 우박, 가뭄, 홍수 등 자연재해로 인한
                농작물 및 가축의 피해를 객관적으로 평가하여 보험금 산정의 기초를 제공합니다.
              </p>
              <p className="text-gray-600 leading-relaxed">
                기후변화로 인한 자연재해 증가와 농업보험 확대 정책에 따라 손해평가사의 수요가
                지속적으로 증가하고 있으며, 농촌지역의 안정적인 직업으로 주목받고 있습니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-4">📌 주요 업무</h3>
              <ul className="space-y-2">
                {[
                  "농작물재해보험 손해평가 및 보험금 산정",
                  "가축재해보험 피해조사 및 평가",
                  "재해 발생 시 현장조사 및 피해액 산출",
                  "손해평가서 작성 및 보고",
                  "보험계약자 상담 및 민원처리"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Structure */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">📋</span>
          시험 구성
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">1차 시험 (이론)</h3>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">객관식</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">상법(보험편)</span>
                <span className="text-gray-500 text-sm">25문항</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">농어업재해보험법령</span>
                <span className="text-gray-500 text-sm">25문항</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">농학개론</span>
                <span className="text-gray-500 text-sm">25문항</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-gray-500 text-sm">총 75문항 / 90분</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-teal-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">2차 시험 (실무)</h3>
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">주관식</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">농작물재해보험 이론과 실무</span>
                <span className="text-gray-500 text-sm">논술형</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">가축재해보험 이론과 실무</span>
                <span className="text-gray-500 text-sm">논술형</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-gray-500 text-sm">2과목 / 각 100분</p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link href="/category/insurance/damage-assessor/exam" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl">
            시험 상세정보 보기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Study Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">📚</span>
          과목별 학습
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1차 과목 */}
          <Link href="/category/insurance/damage-assessor/study/commercial-law" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium">1차</span>
              <span className="text-emerald-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">상법(보험편)</h3>
            <p className="text-gray-500 text-sm">보험계약, 손해보험, 인보험의 법률관계</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
              <span>📝 50문제</span>
            </div>
          </Link>

          <Link href="/category/insurance/damage-assessor/study/insurance-law" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium">1차</span>
              <span className="text-emerald-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">농어업재해보험법령</h3>
            <p className="text-gray-500 text-sm">농어업재해보험법, 시행령, 시행규칙</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
              <span>📝 50문제</span>
            </div>
          </Link>

          <Link href="/category/insurance/damage-assessor/study/agriculture-intro" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium">1차</span>
              <span className="text-emerald-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">농학개론</h3>
            <p className="text-gray-500 text-sm">식물생리, 재배, 토양, 병충해 기초</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
              <span>📝 50문제</span>
            </div>
          </Link>

          {/* 2차 과목 */}
          <Link href="/category/insurance/damage-assessor/study/crop-insurance" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-teal-500">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs font-medium">2차</span>
              <span className="text-teal-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">농작물재해보험 이론과 실무</h3>
            <p className="text-gray-500 text-sm">손해평가 이론, 평가요령, 현장실무</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
              <span>📝 50문제</span>
            </div>
          </Link>

          <Link href="/category/insurance/damage-assessor/study/livestock-insurance" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-teal-500">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs font-medium">2차</span>
              <span className="text-teal-500 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">가축재해보험 이론과 실무</h3>
            <p className="text-gray-500 text-sm">가축질병, 폐사평가, 보험금 산정</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
              <span>📝 50문제</span>
            </div>
          </Link>

          {/* AI 학습 */}
          <button
            onClick={() => setShowAIModal(true)}
            className="group bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-white text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="bg-white/20 text-white px-2 py-1 rounded text-xs font-medium">AI</span>
              <span className="text-white/80 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <h3 className="font-bold mb-2">AI 맞춤 학습</h3>
            <p className="text-emerald-100 text-sm">AI가 분석한 취약점 집중 학습</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-200">
              <span>🤖 준비 중</span>
            </div>
          </button>
        </div>
      </section>

      {/* Career & Outlook */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">💼</span>
            진로 및 전망
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3">🌱 활동 분야</h3>
              <ul className="space-y-2">
                {[
                  "농협 및 수협 재해보험 손해평가",
                  "보험회사 농작물재해보험 업무",
                  "손해평가법인 소속 평가사",
                  "개인 손해평가사 사무소 운영",
                  "농업 관련 컨설팅 업체"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">📈 전망</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🌍</span>
                    <span className="font-medium">기후변화 대응</span>
                  </div>
                  <p className="text-sm text-emerald-100">이상기후 증가로 재해보험 수요 확대</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📊</span>
                    <span className="font-medium">정책적 지원</span>
                  </div>
                  <p className="text-sm text-emerald-100">농업재해보험 의무화 확대 추세</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Study Tips */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">💡</span>
          합격 전략
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📖</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">1차 시험 전략</h3>
            <p className="text-gray-600 text-sm">
              상법은 보험편에 집중하고, 농어업재해보험법령은 조문 암기가 필수입니다.
              농학개론은 재배학, 토양학 위주로 학습하세요.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">✍️</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">2차 시험 전략</h3>
            <p className="text-gray-600 text-sm">
              손해평가요령 숙지가 핵심입니다. 실제 손해평가서 작성 연습과
              계산문제 반복 학습이 합격의 열쇠입니다.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">효과적인 학습법</h3>
            <p className="text-gray-600 text-sm">
              농협, 농금원 자료와 기출문제 분석이 중요합니다.
              실무 경험이 없다면 손해평가 사례집을 통해 감각을 익히세요.
            </p>
          </div>
        </div>
      </section>

      {/* Related Certifications */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">🔗</span>
          연관 자격증
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { name: "손해사정사", path: "/category/insurance/loss-adjuster", icon: "📊" },
            { name: "보험중개사", path: "/category/insurance/insurance-broker", icon: "🤝" },
            { name: "보험계리사", path: "/category/insurance/actuary", icon: "📈" },
            { name: "공인중개사", path: "/category/insurance/housing-manager", icon: "🏠" }
          ].map((cert, idx) => (
            <Link key={idx} href={cert.path} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow flex items-center gap-3">
              <span className="text-2xl">{cert.icon}</span>
              <span className="font-medium text-gray-700">{cert.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">지금 바로 학습을 시작하세요!</h2>
          <p className="text-gray-600 mb-6">체계적인 학습으로 손해평가사 자격증을 취득하세요</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/category/insurance/damage-assessor/study/commercial-law" className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg">
              1차 과목 학습 시작
            </Link>
            <Link href="/category/insurance/damage-assessor/study/crop-insurance" className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors shadow-lg">
              2차 과목 학습 시작
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. UTTEC</p>
        </div>
      </footer>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAIModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">AI 맞춤 학습</h3>
              <p className="text-gray-600 mb-6">
                AI가 학습 패턴을 분석하여 취약 부분을 집중 학습할 수 있도록 도와드립니다.
                현재 개발 중인 기능입니다.
              </p>
              <button
                onClick={() => setShowAIModal(false)}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
