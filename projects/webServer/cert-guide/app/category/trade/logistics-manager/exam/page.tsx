'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LogisticsManagerExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'info'>('written');

  const examSubjects = [
    { name: '물류관리론', questions: 40, time: '40분', desc: '물류시스템, 물류전략, SCM' },
    { name: '화물운송론', questions: 30, time: '30분', desc: '육상/해상/항공운송, 운임' },
    { name: '국제물류론', questions: 30, time: '30분', desc: '국제운송, 무역실무, 관세' },
    { name: '보관하역론', questions: 30, time: '30분', desc: '창고관리, 하역기기, 포장' },
    { name: '물류관련법규', questions: 20, time: '20분', desc: '물류정책기본법 등' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade" className="text-gray-600 hover:text-indigo-600">무역·물류</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade/logistics-manager" className="text-gray-600 hover:text-indigo-600">물류관리사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/trade/logistics-manager" className="inline-flex items-center gap-2 text-indigo-200 hover:text-white mb-4 transition-colors">
            ← 물류관리사 메인으로
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">📋 물류관리사 시험정보</h1>
          <p className="text-indigo-100 text-lg">시험 구성, 출제 범위, 합격 기준 안내</p>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('written')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'written'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'info'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📌 시험안내
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'written' && (
              <div className="space-y-8">
                {/* Overview */}
                <div className="grid sm:grid-cols-4 gap-4">
                  {[
                    { label: '시험시간', value: '150분', icon: '⏱️' },
                    { label: '문항수', value: '150문항', icon: '📝' },
                    { label: '합격기준', value: '평균 60점 이상', icon: '🎯' },
                    { label: '과락기준', value: '과목당 40점 미만', icon: '⚠️' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 text-center">
                      <span className="text-2xl mb-2 block">{item.icon}</span>
                      <p className="text-gray-500 text-sm">{item.label}</p>
                      <p className="font-bold text-indigo-700">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Subjects Table */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">과목별 출제 정보</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-indigo-50">
                          <th className="px-4 py-3 text-left font-medium text-indigo-700">과목명</th>
                          <th className="px-4 py-3 text-center font-medium text-indigo-700">문항수</th>
                          <th className="px-4 py-3 text-center font-medium text-indigo-700">배점</th>
                          <th className="px-4 py-3 text-left font-medium text-indigo-700">출제범위</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {examSubjects.map((subject, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-800">{subject.name}</td>
                            <td className="px-4 py-4 text-center text-gray-600">{subject.questions}문항</td>
                            <td className="px-4 py-4 text-center text-gray-600">{subject.questions}점</td>
                            <td className="px-4 py-4 text-gray-500 text-sm">{subject.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-indigo-100 font-bold">
                          <td className="px-4 py-3 text-indigo-700">합계</td>
                          <td className="px-4 py-3 text-center text-indigo-700">150문항</td>
                          <td className="px-4 py-3 text-center text-indigo-700">150점</td>
                          <td className="px-4 py-3"></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Pass Criteria */}
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">🎯 합격 기준</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white/20 rounded-xl p-4">
                      <p className="font-medium mb-1">필기시험 합격</p>
                      <p className="text-sm text-indigo-100">전과목 평균 60점 이상 + 과목당 40점 이상</p>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4">
                      <p className="font-medium mb-1">합격 유효기간</p>
                      <p className="text-sm text-indigo-100">합격 발표일로부터 2년간 유효</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="space-y-8">
                {/* Schedule */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">📅 시험일정 (연 1회)</h3>
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
                    <div className="grid sm:grid-cols-3 gap-6">
                      <div>
                        <p className="text-gray-500 text-sm mb-1">원서접수</p>
                        <p className="font-bold text-indigo-700">8월 중</p>
                        <p className="text-xs text-gray-400 mt-1">큐넷(Q-net) 온라인 접수</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm mb-1">시험일</p>
                        <p className="font-bold text-indigo-700">10월 중</p>
                        <p className="text-xs text-gray-400 mt-1">CBT 방식 시행</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm mb-1">합격발표</p>
                        <p className="font-bold text-indigo-700">11월 중</p>
                        <p className="text-xs text-gray-400 mt-1">큐넷 홈페이지 발표</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">📝 응시 안내</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="border rounded-xl p-4">
                      <h4 className="font-medium text-gray-800 mb-2">응시자격</h4>
                      <p className="text-gray-600 text-sm">제한 없음 (연령, 학력, 경력 무관)</p>
                    </div>
                    <div className="border rounded-xl p-4">
                      <h4 className="font-medium text-gray-800 mb-2">응시료</h4>
                      <p className="text-gray-600 text-sm">필기: 20,000원</p>
                    </div>
                    <div className="border rounded-xl p-4">
                      <h4 className="font-medium text-gray-800 mb-2">시행기관</h4>
                      <p className="text-gray-600 text-sm">한국산업인력공단</p>
                    </div>
                    <div className="border rounded-xl p-4">
                      <h4 className="font-medium text-gray-800 mb-2">접수방법</h4>
                      <p className="text-gray-600 text-sm">큐넷(www.q-net.or.kr) 온라인 접수</p>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">💼 취득 혜택</h3>
                  <div className="space-y-3">
                    {[
                      { title: '취업 우대', desc: '물류기업, 유통업체, 제조업체 등 취업 시 우대' },
                      { title: '승진 가점', desc: '공공기관 및 대기업 승진심사 시 가산점' },
                      { title: '물류전문가 인증', desc: '물류 분야 국가공인 전문자격 보유' },
                      { title: '급여 우대', desc: '물류관리사 자격수당 지급 기업 다수' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                        <span className="text-indigo-500 mt-0.5">✓</span>
                        <div>
                          <p className="font-medium text-gray-800">{item.title}</p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="bg-gray-100 rounded-xl p-6">
                  <h3 className="font-bold text-gray-800 mb-4">🔗 관련 링크</h3>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://www.q-net.or.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border"
                    >
                      큐넷 홈페이지 →
                    </a>
                    <a
                      href="https://www.klfa.or.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border"
                    >
                      한국물류협회 →
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <Link
          href="/category/trade/logistics-manager"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          ← 물류관리사 메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
