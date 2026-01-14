'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FinancialManagerPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const subjects = [
    { name: '재무회계', slug: 'financial-accounting', questions: 40, icon: '📊', description: '재무제표, 계정과목, 결산' },
    { name: '세무회계', slug: 'tax-accounting', questions: 40, icon: '📋', description: '부가세, 소득세, 법인세' },
    { name: '원가관리회계', slug: 'cost-accounting', questions: 40, icon: '💰', description: '원가계산, 관리회계, CVP분석' },
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
            <Link href="/category/agriculture" className="text-gray-600 hover:text-blue-600">농림·축산</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">재경관리사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">💼</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">재경관리사</h1>
              <p className="text-indigo-100 mt-1">Financial Manager</p>
              <div className="flex gap-2 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">민간자격</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">삼일회계법인</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">난이도 ★★★☆☆</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">50%</p>
            <p className="text-sm text-gray-500">합격률</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">무관</p>
            <p className="text-sm text-gray-500">응시자격</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">객관식</p>
            <p className="text-sm text-gray-500">시험형태</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-indigo-600">중</p>
            <p className="text-sm text-gray-500">체감 난이도</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['overview', 'subjects', 'schedule'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}>
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
                  재경관리사는 삼일회계법인에서 주관하는 재무/회계 분야의 대표적인 민간자격증입니다.
                  재무회계, 세무회계, 원가관리회계 3과목을 평가하며, 기업의 재경부서 취업 시 필수 자격증으로 인정받고 있습니다.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 주요 업무</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• 기업 재무제표 작성 및 분석</li>
                  <li>• 세무신고 및 세무조정</li>
                  <li>• 원가계산 및 관리회계</li>
                  <li>• 경영의사결정 지원</li>
                  <li>• 내부통제 및 회계감사 보조</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">💼 취업 분야</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• 일반기업 재경부서, 회계팀</li>
                  <li>• 세무법인, 회계법인</li>
                  <li>• 금융기관 (은행, 증권사)</li>
                  <li>• 공기업 및 공공기관</li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-800 mb-4">📌 시험 정보</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 응시자격: 제한 없음</li>
                  <li>• 시험시간: 150분</li>
                  <li>• 문항수: 120문항</li>
                  <li>• 합격기준: 과목당 40점, 평균 70점</li>
                  <li>• 응시료: 70,000원</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-800 mb-4">🔗 연계 자격증</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 회계관리 1급/2급</li>
                  <li>• 전산세무 1급/2급</li>
                  <li>• 세무사</li>
                  <li>• 공인회계사(CPA)</li>
                </ul>
              </div>
              <Link href="/category/agriculture/financial-manager/exam" className="block w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center rounded-xl font-medium">
                시험 정보 보기 →
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject) => (
              <Link key={subject.slug} href={`/category/agriculture/financial-manager/study/${subject.slug}`}
                className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
                <div className="text-3xl mb-3">{subject.icon}</div>
                <h3 className="font-bold text-gray-800">{subject.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{subject.description}</p>
                <p className="text-sm text-indigo-600 mt-2">{subject.questions}문항</p>
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
                    <th className="text-left py-3 px-4">회차</th>
                    <th className="text-left py-3 px-4">접수기간</th>
                    <th className="text-left py-3 px-4">시험일</th>
                    <th className="text-left py-3 px-4">합격발표</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="py-3 px-4 font-medium">1회</td><td className="py-3 px-4">1월</td><td className="py-3 px-4">2월</td><td className="py-3 px-4">3월</td></tr>
                  <tr className="border-b"><td className="py-3 px-4 font-medium">2회</td><td className="py-3 px-4">4월</td><td className="py-3 px-4">5월</td><td className="py-3 px-4">6월</td></tr>
                  <tr className="border-b"><td className="py-3 px-4 font-medium">3회</td><td className="py-3 px-4">7월</td><td className="py-3 px-4">8월</td><td className="py-3 px-4">9월</td></tr>
                  <tr className="border-b"><td className="py-3 px-4 font-medium">4회</td><td className="py-3 px-4">10월</td><td className="py-3 px-4">11월</td><td className="py-3 px-4">12월</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4">※ 정확한 일정은 삼일회계법인 자격시험센터에서 확인하세요.</p>
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
