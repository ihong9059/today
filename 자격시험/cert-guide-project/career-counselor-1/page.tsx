'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CareerCounselor1Page() {
  const [activeTab, setActiveTab] = useState('overview');

  const subjects = [
    { name: '고급직업상담학', slug: 'advanced-counseling', questions: 25, icon: '💬', description: '직업상담 이론, 기법, 윤리' },
    { name: '고급직업심리학', slug: 'advanced-psychology', questions: 25, icon: '🧠', description: '직업심리 이론, 검사해석' },
    { name: '고급직업정보론', slug: 'advanced-info', questions: 25, icon: '📊', description: '직업정보 분석, 노동시장' },
    { name: '노동시장론', slug: 'labor-market', questions: 25, icon: '📈', description: '노동경제, 고용정책' },
    { name: '노동관계법규', slug: 'labor-law', questions: 25, icon: '⚖️', description: '근로기준법, 고용보험법' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/welfare" className="text-gray-600 hover:text-blue-600">사회복지·상담</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">직업상담사 1급</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">💼</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">직업상담사 1급</h1>
              <p className="text-blue-100 mt-1">Career Counselor Level 1</p>
              <div className="flex gap-2 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">난이도 ★★★★☆</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">25%</p>
            <p className="text-sm text-gray-500">합격률</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">2급+3년</p>
            <p className="text-sm text-gray-500">응시자격</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">필기+실기</p>
            <p className="text-sm text-gray-500">시험형태</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-blue-600">상</p>
            <p className="text-sm text-gray-500">체감 난이도</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['overview', 'subjects', 'schedule'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>
              {tab === 'overview' ? '📋 개요' : tab === 'subjects' ? '📚 과목' : '📅 일정'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">📋 자격 개요</h2>
                <p className="text-gray-600 leading-relaxed">
                  직업상담사 1급은 취업지원, 직업상담, 진로지도 분야의 최고급 전문가 자격입니다.
                  고용노동부, 워크넷, 직업능력개발원 등에서 고급 상담업무를 수행합니다.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 주요 업무</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• 고용센터 취업지원 및 상담</li>
                  <li>• 직업심리검사 실시 및 해석</li>
                  <li>• 진로 및 경력개발 상담</li>
                  <li>• 취업알선 및 구인구직 연결</li>
                  <li>• 직업상담사 양성 및 교육</li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-800 mb-4">📌 응시자격</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 2급 취득 후 3년 경력</li>
                  <li>• 관련학과 석사 이상</li>
                  <li>• 관련분야 5년 이상 경력</li>
                </ul>
              </div>
              <Link href="/category/welfare/career-counselor-1/exam" className="block w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center rounded-xl font-medium">
                시험 정보 보기 →
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject) => (
              <Link key={subject.slug} href={`/category/welfare/career-counselor-1/study/${subject.slug}`}
                className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
                <div className="text-3xl mb-3">{subject.icon}</div>
                <h3 className="font-bold text-gray-800">{subject.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{subject.description}</p>
                <p className="text-sm text-blue-600 mt-2">{subject.questions}문항</p>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📅 2026년 시험일정</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">구분</th>
                    <th className="text-left py-3 px-4">필기시험</th>
                    <th className="text-left py-3 px-4">실기시험</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="py-3 px-4 font-medium">1회</td><td className="py-3 px-4">3월</td><td className="py-3 px-4">5월</td></tr>
                  <tr className="border-b"><td className="py-3 px-4 font-medium">2회</td><td className="py-3 px-4">5월</td><td className="py-3 px-4">7월</td></tr>
                  <tr className="border-b"><td className="py-3 px-4 font-medium">3회</td><td className="py-3 px-4">8월</td><td className="py-3 px-4">10월</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
