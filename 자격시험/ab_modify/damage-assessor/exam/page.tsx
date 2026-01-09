'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DamageAssessorExamPage() {
  const [activeTab, setActiveTab] = useState<'first' | 'second'>('first');

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
            <Link href="/category/insurance/damage-assessor" className="text-gray-600 hover:text-emerald-600 transition-colors">손해평가사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/category/insurance/damage-assessor" className="inline-flex items-center text-emerald-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            손해평가사 메인으로
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">손해평가사 시험정보</h1>
          <p className="text-emerald-100">시험 일정, 과목, 합격 기준 상세 안내</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('first')}
            className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all ${
              activeTab === 'first'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-emerald-50'
            }`}
          >
            <span className="block text-lg">1차 시험</span>
            <span className={`text-sm ${activeTab === 'first' ? 'text-emerald-100' : 'text-gray-400'}`}>이론 (객관식)</span>
          </button>
          <button
            onClick={() => setActiveTab('second')}
            className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all ${
              activeTab === 'second'
                ? 'bg-teal-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-teal-50'
            }`}
          >
            <span className="block text-lg">2차 시험</span>
            <span className={`text-sm ${activeTab === 'second' ? 'text-teal-100' : 'text-gray-400'}`}>실무 (주관식)</span>
          </button>
        </div>

        {/* First Exam Content */}
        {activeTab === 'first' && (
          <div className="space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-lg">📋</span>
                1차 시험 개요
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <span className="text-3xl">📝</span>
                  <p className="text-gray-500 text-sm mt-2">시험 형태</p>
                  <p className="font-bold text-gray-800">객관식 4지선다</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <span className="text-3xl">📊</span>
                  <p className="text-gray-500 text-sm mt-2">문항 수</p>
                  <p className="font-bold text-gray-800">3과목 75문항</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <span className="text-3xl">⏱️</span>
                  <p className="text-gray-500 text-sm mt-2">시험 시간</p>
                  <p className="font-bold text-gray-800">90분</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <span className="text-3xl">✅</span>
                  <p className="text-gray-500 text-sm mt-2">합격 기준</p>
                  <p className="font-bold text-gray-800">과목 40점, 평균 60점</p>
                </div>
              </div>
            </div>

            {/* Subjects Detail */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-lg">📚</span>
                과목별 상세
              </h2>
              <div className="space-y-4">
                {/* 상법(보험편) */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between">
                    <h3 className="font-bold">상법(보험편)</h3>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">25문항</span>
                  </div>
                  <div className="p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">📌 출제 범위</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• 보험계약 총론 (보험계약의 성립, 효력)</li>
                          <li>• 손해보험 (화재, 운송, 해상, 책임보험)</li>
                          <li>• 인보험 (생명, 상해보험)</li>
                          <li>• 보험금청구권 및 대위</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">💡 학습 포인트</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• 상법 제4편 보험편 조문 정리</li>
                          <li>• 보험계약의 효력 및 해지 요건</li>
                          <li>• 손해보험과 인보험의 차이점</li>
                          <li>• 보험자의 면책사유 암기</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 농어업재해보험법령 */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-teal-600 text-white px-4 py-3 flex items-center justify-between">
                    <h3 className="font-bold">농어업재해보험법령</h3>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">25문항</span>
                  </div>
                  <div className="p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">📌 출제 범위</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• 농어업재해보험법 (목적, 정의, 보험사업)</li>
                          <li>• 시행령 (보험대상, 보험금, 손해평가)</li>
                          <li>• 시행규칙 (신고, 평가 절차)</li>
                          <li>• 농작물·가축재해보험 관련 고시</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">💡 학습 포인트</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• 법·시행령·시행규칙 체계 이해</li>
                          <li>• 손해평가사 자격 및 결격사유</li>
                          <li>• 재보험 및 국고지원 규정</li>
                          <li>• 손해평가 절차 및 기준</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 농학개론 */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-cyan-600 text-white px-4 py-3 flex items-center justify-between">
                    <h3 className="font-bold">농학개론</h3>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">25문항</span>
                  </div>
                  <div className="p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">📌 출제 범위</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• 재배학 (작물생리, 재배환경, 재배기술)</li>
                          <li>• 토양학 (토양의 성질, 비료)</li>
                          <li>• 식물병리학 (병해 종류, 방제)</li>
                          <li>• 해충학 (해충 종류, 방제)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">💡 학습 포인트</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• 주요 작물별 생육 특성</li>
                          <li>• 기상재해(냉해, 수해, 한해) 영향</li>
                          <li>• 토양 성분과 비료의 관계</li>
                          <li>• 병해충 피해 증상 구분</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Passing Rate */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-lg">📈</span>
                합격률 추이
              </h2>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  { year: "2020", rate: "18.2%" },
                  { year: "2021", rate: "15.8%" },
                  { year: "2022", rate: "14.5%" },
                  { year: "2023", rate: "16.3%" },
                  { year: "2024", rate: "15.1%" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 text-center">
                    <p className="text-gray-500 text-sm">{item.year}년</p>
                    <p className="text-2xl font-bold text-emerald-600">{item.rate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Second Exam Content */}
        {activeTab === 'second' && (
          <div className="space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-lg">📋</span>
                2차 시험 개요
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <span className="text-3xl">✍️</span>
                  <p className="text-gray-500 text-sm mt-2">시험 형태</p>
                  <p className="font-bold text-gray-800">주관식 논술형</p>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <span className="text-3xl">📊</span>
                  <p className="text-gray-500 text-sm mt-2">과목 수</p>
                  <p className="font-bold text-gray-800">2과목</p>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <span className="text-3xl">⏱️</span>
                  <p className="text-gray-500 text-sm mt-2">시험 시간</p>
                  <p className="font-bold text-gray-800">과목당 100분</p>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <span className="text-3xl">✅</span>
                  <p className="text-gray-500 text-sm mt-2">합격 기준</p>
                  <p className="font-bold text-gray-800">과목 40점, 평균 60점</p>
                </div>
              </div>
            </div>

            {/* Subjects Detail */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-lg">📚</span>
                과목별 상세
              </h2>
              <div className="space-y-4">
                {/* 농작물재해보험 */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between">
                    <h3 className="font-bold">농작물재해보험 이론과 실무</h3>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">100분</span>
                  </div>
                  <div className="p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">📌 출제 범위</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• 농작물재해보험 상품 이해</li>
                          <li>• 손해평가요령 및 기준</li>
                          <li>• 피해율 산정 방법</li>
                          <li>• 보험금 산출 계산</li>
                          <li>• 현장조사 및 평가서 작성</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">💡 학습 포인트</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• 작물별 손해평가요령 숙지</li>
                          <li>• 피해율 계산 공식 암기</li>
                          <li>• 보험금 = 보험가액 × 피해율 × 자기부담비율</li>
                          <li>• 손해평가서 양식 작성 연습</li>
                          <li>• 기출문제 계산 유형 분석</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-amber-800 text-sm">
                        <strong>💡 Tip:</strong> 농금원에서 발간하는 '손해평가요령' 책자를 반드시 숙지하세요. 계산문제가 많이 출제됩니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 가축재해보험 */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-teal-600 text-white px-4 py-3 flex items-center justify-between">
                    <h3 className="font-bold">가축재해보험 이론과 실무</h3>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">100분</span>
                  </div>
                  <div className="p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">📌 출제 범위</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• 가축재해보험 상품 이해</li>
                          <li>• 축종별 질병 및 재해 특성</li>
                          <li>• 폐사·도태 평가 기준</li>
                          <li>• 가축 시가 산정 방법</li>
                          <li>• 보험금 청구 및 지급 절차</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">💡 학습 포인트</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• 축종별(소, 돼지, 닭 등) 평가 기준</li>
                          <li>• 법정전염병 및 면책사항</li>
                          <li>• 가축시세 및 평가금액 산정</li>
                          <li>• 손해평가 현장조사 요령</li>
                          <li>• 사고 접수 및 처리 절차</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-amber-800 text-sm">
                        <strong>💡 Tip:</strong> 가축질병에 대한 기본 지식과 축종별 사육 특성 이해가 필요합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exam Format */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-lg">📝</span>
                출제 유형
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-3">논술형 문제</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      손해평가 절차 및 방법 서술
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      법령 내용 및 해석 설명
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      사례별 평가 방법 기술
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-3">계산형 문제</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-0.5">•</span>
                      피해율 및 감수율 계산
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-0.5">•</span>
                      보험가액 및 보험금 산출
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-0.5">•</span>
                      자기부담금 적용 계산
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-lg">📅</span>
            시험 일정 (연간)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-700">구분</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">원서접수</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">시험일</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">합격발표</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium text-emerald-600">1차 시험</td>
                  <td className="px-4 py-3 text-gray-600">4월 중</td>
                  <td className="px-4 py-3 text-gray-600">6월 중</td>
                  <td className="px-4 py-3 text-gray-600">7월 중</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-4 py-3 font-medium text-teal-600">2차 시험</td>
                  <td className="px-4 py-3 text-gray-600">7월 중</td>
                  <td className="px-4 py-3 text-gray-600">9월 중</td>
                  <td className="px-4 py-3 text-gray-600">11월 중</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            * 정확한 일정은 농업금융원 손해평가사 홈페이지에서 확인하세요.
          </p>
        </div>

        {/* Study Links */}
        <div className="mt-8 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">과목별 학습 시작하기</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "상법(보험편)", path: "/category/insurance/damage-assessor/study/commercial-law", badge: "1차" },
              { name: "농어업재해보험법령", path: "/category/insurance/damage-assessor/study/insurance-law", badge: "1차" },
              { name: "농학개론", path: "/category/insurance/damage-assessor/study/agriculture-intro", badge: "1차" },
              { name: "농작물재해보험", path: "/category/insurance/damage-assessor/study/crop-insurance", badge: "2차" },
              { name: "가축재해보험", path: "/category/insurance/damage-assessor/study/livestock-insurance", badge: "2차" }
            ].map((subject, idx) => (
              <Link key={idx} href={subject.path} className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-shadow">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${subject.badge === '1차' ? 'bg-emerald-100 text-emerald-700' : 'bg-teal-100 text-teal-700'}`}>
                  {subject.badge}
                </span>
                <h3 className="font-medium text-gray-800 text-sm">{subject.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
