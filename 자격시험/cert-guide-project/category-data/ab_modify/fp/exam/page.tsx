'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FPExamPage() {
  const [activeSection, setActiveSection] = useState<'schedule' | 'registration' | 'info'>('schedule');

  const examSchedule = [
    { round: '제1회', registration: '2월 초 ~ 2월 말', examDate: '3월 셋째주 토요일', result: '4월 초' },
    { round: '제2회', registration: '5월 초 ~ 5월 말', examDate: '6월 셋째주 토요일', result: '7월 초' },
    { round: '제3회', registration: '8월 초 ~ 8월 말', examDate: '9월 셋째주 토요일', result: '10월 초' },
    { round: '제4회', registration: '11월 초 ~ 11월 말', examDate: '12월 셋째주 토요일', result: '1월 초' },
  ];

  const subjects = [
    { name: '재무설계 개론', questions: 20, time: 25, topics: '재무설계 프로세스, 화폐의 시간가치, 재무제표 분석' },
    { name: '투자설계', questions: 20, time: 25, topics: '투자상품, 채권/주식/펀드 투자, 포트폴리오' },
    { name: '보험설계', questions: 20, time: 25, topics: '생명보험, 손해보험, 제3보험, 리스크관리' },
    { name: '세금설계', questions: 20, time: 25, topics: '소득세, 금융소득과세, 양도세, 상속/증여세' },
  ];

  const registrationSteps = [
    { step: 1, title: '회원가입', description: '한국금융연수원 홈페이지에서 회원가입' },
    { step: 2, title: '시험접수', description: '자격시험 > 시험접수 메뉴에서 자산관리사(FP) 선택' },
    { step: 3, title: '응시료 결제', description: '50,000원 결제 (카드, 계좌이체 가능)' },
    { step: 4, title: '수험표 출력', description: '접수 완료 후 수험표 출력 (시험 당일 지참)' },
  ];

  const examRules = [
    { icon: '📝', title: '신분증 필수', description: '주민등록증, 운전면허증, 여권 중 하나' },
    { icon: '⏰', title: '입실시간', description: '시험 시작 30분 전까지 입실 완료' },
    { icon: '🚫', title: '전자기기 금지', description: '휴대폰, 스마트워치 등 전자기기 반입 금지' },
    { icon: '🧮', title: '계산기 허용', description: '금융계산기 사용 가능 (메모리 초기화)' },
  ];

  const passingCriteria = [
    { criteria: '합격 기준', value: '100점 만점 중 70점 이상' },
    { criteria: '과락 기준', value: '과목별 과락 없음' },
    { criteria: '문항당 배점', value: '1.25점 (80문항 × 1.25점 = 100점)' },
    { criteria: '시험 시간', value: '100분' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-emerald-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-emerald-600 transition">금융</Link>
            <span>/</span>
            <Link href="/category/finance/fp" className="hover:text-emerald-600 transition">자산관리사(FP)</Link>
            <span>/</span>
            <span className="text-emerald-600 font-medium">시험 정보</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">자산관리사(FP) 시험 정보</h1>
          <p className="text-gray-600 mt-1">시험 일정, 접수 방법, 합격 기준 안내</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100 text-center">
            <p className="text-3xl font-bold text-emerald-600">80</p>
            <p className="text-sm text-gray-500 mt-1">문항수</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100 text-center">
            <p className="text-3xl font-bold text-teal-600">100</p>
            <p className="text-sm text-gray-500 mt-1">시험시간(분)</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100 text-center">
            <p className="text-3xl font-bold text-cyan-600">70</p>
            <p className="text-sm text-gray-500 mt-1">합격점수</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100 text-center">
            <p className="text-3xl font-bold text-sky-600">4</p>
            <p className="text-sm text-gray-500 mt-1">연간 시험횟수</p>
          </div>
        </section>

        {/* Section Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'schedule', label: '시험 일정' },
            { id: 'registration', label: '접수 방법' },
            { id: 'info', label: '시험 안내' },
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as 'schedule' | 'registration' | 'info')}
              className={`px-5 py-2.5 rounded-xl font-medium transition whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 border border-gray-200'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Schedule Section */}
        {activeSection === 'schedule' && (
          <div className="space-y-6">
            <section className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">2025년 시험 일정</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-emerald-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">회차</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">접수기간</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">시험일</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">합격발표</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examSchedule.map((schedule, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-emerald-50 transition">
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                            {schedule.round}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{schedule.registration}</td>
                        <td className="py-4 px-4 font-medium text-gray-800">{schedule.examDate}</td>
                        <td className="py-4 px-4 text-gray-600">{schedule.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                ※ 정확한 일정은 한국금융연수원 홈페이지에서 확인하세요.
              </p>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">과목별 출제 범위</h2>
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{subject.name}</h3>
                      <span className="text-sm text-emerald-600 font-medium">{subject.questions}문항</span>
                    </div>
                    <p className="text-sm text-gray-600">{subject.topics}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Registration Section */}
        {activeSection === 'registration' && (
          <div className="space-y-6">
            <section className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">시험 접수 방법</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {registrationSteps.map((step) => (
                  <div key={step.step} className="flex gap-4 p-4 bg-emerald-50 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl">
                <p className="font-medium text-gray-800">접수처</p>
                <a
                  href="https://www.kbi.or.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  한국금융연수원 홈페이지 (www.kbi.or.kr)
                </a>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">응시 자격</h2>
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">✅</span>
                  <h3 className="font-bold text-green-800">제한 없음</h3>
                </div>
                <p className="text-green-700">
                  학력, 경력, 나이 등의 제한 없이 누구나 응시 가능합니다.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">응시료 안내</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">응시료</p>
                  <p className="text-2xl font-bold text-emerald-600">50,000원</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">결제방법</p>
                  <p className="font-medium text-gray-800">카드결제, 계좌이체</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                ※ 접수 취소는 시험일 7일 전까지 가능하며, 100% 환불됩니다.
              </p>
            </section>
          </div>
        )}

        {/* Info Section */}
        {activeSection === 'info' && (
          <div className="space-y-6">
            <section className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">합격 기준</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {passingCriteria.map((item, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">{item.criteria}</p>
                    <p className="font-bold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">시험 당일 안내</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {examRules.map((rule, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl">{rule.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-800">{rule.title}</h3>
                      <p className="text-sm text-gray-600">{rule.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">자격증 활용</h2>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <h3 className="font-bold text-gray-800 mb-2">은행 PB센터</h3>
                  <p className="text-sm text-gray-600">
                    시중은행, 지방은행의 PB(Private Banking) 부서 취업 및 업무수행
                  </p>
                </div>
                <div className="p-4 bg-teal-50 rounded-xl">
                  <h3 className="font-bold text-gray-800 mb-2">증권사 WM사업부</h3>
                  <p className="text-sm text-gray-600">
                    증권사 자산관리(Wealth Management) 부서 입사 시 필수
                  </p>
                </div>
                <div className="p-4 bg-cyan-50 rounded-xl">
                  <h3 className="font-bold text-gray-800 mb-2">보험사 FA</h3>
                  <p className="text-sm text-gray-600">
                    보험사 재무설계사(Financial Advisor)로 활동
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">관련 자격증</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                  <h3 className="font-bold text-gray-800 mb-2">AFPK (한국재무설계사)</h3>
                  <p className="text-sm text-gray-600">한국FPSB 주관, FP의 상위 자격증</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                  <h3 className="font-bold text-gray-800 mb-2">CFP (국제공인재무설계사)</h3>
                  <p className="text-sm text-gray-600">국제 공인자격, AFPK 취득 후 응시</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Study Links */}
        <section className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">과목별 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/category/finance/fp/study/financial-planning"
              className="p-4 bg-emerald-50 rounded-xl text-center hover:bg-emerald-100 transition group"
            >
              <p className="font-bold text-emerald-700 group-hover:scale-105 transition">재무설계 개론</p>
              <p className="text-sm text-emerald-500">20문항</p>
            </Link>
            <Link
              href="/category/finance/fp/study/investment-planning"
              className="p-4 bg-teal-50 rounded-xl text-center hover:bg-teal-100 transition group"
            >
              <p className="font-bold text-teal-700 group-hover:scale-105 transition">투자설계</p>
              <p className="text-sm text-teal-500">20문항</p>
            </Link>
            <Link
              href="/category/finance/fp/study/insurance-planning"
              className="p-4 bg-cyan-50 rounded-xl text-center hover:bg-cyan-100 transition group"
            >
              <p className="font-bold text-cyan-700 group-hover:scale-105 transition">보험설계</p>
              <p className="text-sm text-cyan-500">20문항</p>
            </Link>
            <Link
              href="/category/finance/fp/study/tax-planning"
              className="p-4 bg-sky-50 rounded-xl text-center hover:bg-sky-100 transition group"
            >
              <p className="font-bold text-sky-700 group-hover:scale-105 transition">세금설계</p>
              <p className="text-sm text-sky-500">20문항</p>
            </Link>
          </div>
        </section>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/category/finance/fp"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-emerald-200 text-emerald-600 rounded-xl hover:bg-emerald-50 transition font-medium"
          >
            ← 자산관리사(FP) 메인으로
          </Link>
        </div>
      </main>
    </div>
  );
}
