'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EcommerceManager1Page() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'tips'>('overview');

  const subjects = [
    {
      title: '전자상거래 기획',
      icon: '📊',
      desc: '전자상거래 전략, 마케팅, 사업계획',
      questions: 20,
      color: 'from-indigo-500 to-purple-500',
      href: '/category/office/ecommerce-1/study/ec-planning'
    },
    {
      title: '전자상거래 운영관리',
      icon: '🛒',
      desc: '쇼핑몰 운영, 물류, 고객관리',
      questions: 20,
      color: 'from-blue-500 to-cyan-500',
      href: '/category/office/ecommerce-1/study/ec-operation'
    },
    {
      title: '전자상거래 시스템관리',
      icon: '💻',
      desc: '웹개발, 보안, 시스템 구축',
      questions: 20,
      color: 'from-emerald-500 to-teal-500',
      href: '/category/office/ecommerce-1/study/ec-system'
    },
    {
      title: '전자상거래 관련법규',
      icon: '⚖️',
      desc: '전자상거래법, 개인정보보호, 소비자보호',
      questions: 20,
      color: 'from-amber-500 to-orange-500',
      href: '/category/office/ecommerce-1/study/ec-law'
    }
  ];

  const practicalSubjects = [
    {
      title: '전자상거래 실무',
      icon: '⚡',
      desc: '쇼핑몰 구축, 운영 실무',
      color: 'from-rose-500 to-pink-500',
      href: '/category/office/ecommerce-1/study/practical'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <span className="text-2xl">📜</span>
              <span className="font-bold text-gray-800">자격시험 가이드</span>
            </Link>
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-indigo-600 transition">홈</Link>
              <span className="text-gray-300">/</span>
              <Link href="/category/office" className="text-gray-600 hover:text-indigo-600 transition">사무·경영</Link>
              <span className="text-gray-300">/</span>
              <span className="text-indigo-600 font-medium">전자상거래관리사 1급</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-6xl mx-auto px-4 py-16 relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
                <span className="animate-pulse">🏆</span>
                <span>전자상거래 전문가 자격</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                전자상거래관리사<br />
                <span className="text-indigo-200">1급</span>
              </h1>
              <p className="text-indigo-100 text-lg mb-8 max-w-lg">
                온라인 쇼핑몰의 기획, 구축, 운영 및 관리 전반에 걸친 전문 역량을 검증하는 국가공인 자격증
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  href="/category/office/ecommerce-1/exam"
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all hover:scale-105 shadow-lg"
                >
                  시험 정보 보기
                </Link>
                <Link
                  href="#study"
                  className="px-8 py-4 bg-indigo-500/30 backdrop-blur text-white rounded-xl font-bold hover:bg-indigo-500/50 transition-all border border-white/30"
                >
                  학습 시작하기
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <div className="text-8xl mb-4 text-center">🛍️</div>
                  <div className="text-center">
                    <p className="text-indigo-200 text-sm">대한상공회의소</p>
                    <p className="text-2xl font-bold">국가공인 자격</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '📝', label: '필기', value: '4과목 80문항', sub: '100분' },
            { icon: '💻', label: '실기', value: '필답형+작업형', sub: '150분' },
            { icon: '📈', label: '합격률', value: '필기 35%', sub: '실기 25%' },
            { icon: '💰', label: '응시료', value: '필기 19,000원', sub: '실기 20,000원' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-gray-500 text-sm mt-2">{item.label}</p>
              <p className="font-bold text-gray-800">{item.value}</p>
              <p className="text-xs text-gray-400">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <div className="flex gap-2 border-b border-gray-200">
          {[
            { id: 'overview', label: '시험 개요', icon: '📋' },
            { id: 'subjects', label: '과목 안내', icon: '📚' },
            { id: 'tips', label: '합격 전략', icon: '🎯' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all relative
                ${activeTab === tab.id
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'}`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎯</span> 시험 개요
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>전자상거래관리사 1급은 온라인 비즈니스 전반에 걸친 고급 전문 역량을 검증하는 자격증입니다.</p>
                <div className="bg-indigo-50 rounded-xl p-4">
                  <p className="font-medium text-indigo-800">💡 취득 시 혜택</p>
                  <ul className="text-sm text-indigo-700 mt-2 space-y-1">
                    <li>• 이커머스 기업 취업 시 우대</li>
                    <li>• 쇼핑몰 창업 역량 인증</li>
                    <li>• 디지털 마케팅 전문성 증명</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">시험 방식</span>
                  <span className="font-bold text-indigo-600">정기시험 (연 4회)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">응시 자격</span>
                  <span className="font-bold">제한 없음</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">합격 기준</span>
                  <span className="font-bold">과목당 40점, 평균 60점</span>
                </div>
                <a
                  href="https://license.korcham.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center p-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition mt-4"
                >
                  대한상공회의소 바로가기 →
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📝</span> 필기시험 (4과목)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {subjects.map((subject, idx) => (
                  <Link
                    key={idx}
                    href={subject.href}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${subject.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition`}>
                      {subject.icon}
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{subject.title}</h4>
                    <p className="text-gray-500 text-sm mb-3">{subject.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        {subject.questions}문항
                      </span>
                      <span className="text-indigo-600 font-medium text-sm group-hover:translate-x-1 transition">
                        학습하기 →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>💻</span> 실기시험 (1과목)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {practicalSubjects.map((subject, idx) => (
                  <Link
                    key={idx}
                    href={subject.href}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${subject.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition`}>
                      {subject.icon}
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{subject.title}</h4>
                    <p className="text-gray-500 text-sm mb-3">{subject.desc}</p>
                    <div className="flex items-center justify-end">
                      <span className="text-rose-600 font-medium text-sm group-hover:translate-x-1 transition">
                        학습하기 →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📚 학습 전략</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                  <p className="font-bold text-indigo-800 mb-2">🎯 초보자 (3개월 과정)</p>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• 1개월: 기획 + 운영관리</li>
                    <li>• 2개월: 시스템관리 + 법규</li>
                    <li>• 3개월: 실기 + 기출문제 풀이</li>
                  </ul>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <p className="font-bold text-purple-800 mb-2">⚡ 이커머스 경험자 (2개월)</p>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• 1개월: 필기 4과목 집중</li>
                    <li>• 2개월: 실기 + 기출문제</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💡 합격 포인트</h3>
              <div className="space-y-3">
                {[
                  { icon: '🛒', title: '실무 중심 학습', desc: '실제 쇼핑몰 사례 분석' },
                  { icon: '⚖️', title: '법규 암기 필수', desc: '전자상거래법, 개인정보보호법' },
                  { icon: '💻', title: '웹 기술 이해', desc: 'HTML, 보안, 결제시스템' },
                  { icon: '📝', title: '기출문제 반복', desc: '최근 5년 기출 집중' }
                ].map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <p className="font-bold text-gray-800">{tip.title}</p>
                      <p className="text-sm text-gray-500">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Study Section */}
      <section id="study" className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-800 mb-2">📖 과목별 학습</h2>
          <p className="text-gray-500">AI와 함께하는 효율적인 학습</p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...subjects, ...practicalSubjects].map((subject, idx) => (
            <Link
              key={idx}
              href={subject.href}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className={`h-24 bg-gradient-to-r ${subject.color} flex items-center justify-center`}>
                <span className="text-4xl group-hover:scale-110 transition">{subject.icon}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1 text-sm">{subject.title}</h3>
                <p className="text-gray-500 text-xs mb-2">{subject.desc}</p>
                <span className="text-indigo-600 font-medium text-xs group-hover:translate-x-1 transition inline-block">
                  학습 →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">전자상거래관리사 1급 - 이커머스 전문가 자격증</p>
        </div>
      </footer>
    </div>
  );
}
