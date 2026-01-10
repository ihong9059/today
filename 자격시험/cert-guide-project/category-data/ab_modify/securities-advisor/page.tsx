'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SecuritiesAdvisorPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const examInfo = {
    name: '증권투자권유자문인력',
    englishName: 'Securities Investment Advisor',
    organization: '금융투자협회',
    difficulty: 3,
    passingRate: '40%',
    examTime: '100분',
    questionCount: '100문항',
    passingScore: '70점 이상',
    examFee: '27,500원',
    schedule: '매월 시행 (연 12회)',
  };

  const subjects = [
    { id: 'investment-products', name: '금융투자상품', questions: 25, icon: '📈', description: '주식, 채권, 파생상품 등 금융투자상품 이해' },
    { id: 'securities-analysis', name: '증권분석', questions: 25, icon: '📊', description: '기본적 분석, 기술적 분석, 포트폴리오 이론' },
    { id: 'investment-recommendation', name: '투자권유', questions: 25, icon: '🤝', description: '투자권유 절차, 적합성 원칙, 설명의무' },
    { id: 'securities-law-ethics', name: '직무윤리 및 법규', questions: 25, icon: '⚖️', description: '자본시장법, 직무윤리, 투자자보호' },
  ];

  const schedules2026 = [
    { round: '1월', apply: '12.26~1.2', exam: '1.11', result: '1.17' },
    { round: '2월', apply: '1.23~1.30', exam: '2.8', result: '2.14' },
    { round: '3월', apply: '2.20~2.27', exam: '3.8', result: '3.14' },
    { round: '4월', apply: '3.20~3.27', exam: '4.12', result: '4.18' },
    { round: '5월', apply: '4.17~4.24', exam: '5.10', result: '5.16' },
    { round: '6월', apply: '5.22~5.29', exam: '6.14', result: '6.20' },
  ];

  const studyPath = [
    { step: 1, title: '금융투자상품', desc: '주식, 채권, 파생상품 기초', duration: '2주' },
    { step: 2, title: '증권분석', desc: '기본적·기술적 분석 이해', duration: '2주' },
    { step: 3, title: '투자권유', desc: '고객 상담 및 권유 절차', duration: '1.5주' },
    { step: 4, title: '법규 및 윤리', desc: '자본시장법, 직무윤리', duration: '1주' },
    { step: 5, title: '문제풀이', desc: '기출문제 및 모의고사', duration: '1.5주' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-gray-600 hover:text-emerald-600">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance" className="text-gray-600 hover:text-emerald-600">금융</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">증권투자권유자문인력</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-green-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-5xl">📈</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{examInfo.name}</h1>
                <p className="text-emerald-100">{examInfo.englishName}</p>
                <p className="text-emerald-200 text-sm mt-1">주관: {examInfo.organization}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                <p className="text-2xl font-bold">{examInfo.questionCount}</p>
                <p className="text-xs text-emerald-100">문항 수</p>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                <p className="text-2xl font-bold">{examInfo.examTime}</p>
                <p className="text-xs text-emerald-100">시험시간</p>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                <p className="text-2xl font-bold">{examInfo.passingRate}</p>
                <p className="text-xs text-emerald-100">합격률</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: '개요' },
              { id: 'subjects', label: '시험과목' },
              { id: 'schedule', label: '시험일정' },
              { id: 'study', label: '학습하기' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-emerald-500">📋</span> 자격 개요
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  증권투자권유자문인력은 금융회사에서 주식, 채권 등 증권 상품을 판매하고 투자권유를 할 수 있는
                  전문인력 자격입니다. 증권사, 은행, 보험사 등 금융기관에서 증권 관련 업무를 수행하기 위해
                  반드시 취득해야 하는 필수 자격증입니다.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">응시자격</span>
                    <span className="text-gray-800">제한 없음</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">자격유효기간</span>
                    <span className="text-gray-800">5년 (갱신 필요)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">응시료</span>
                    <span className="text-gray-800">{examInfo.examFee}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-emerald-500">🎯</span> 합격 기준
                </h2>
                <div className="space-y-4">
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <p className="text-2xl font-bold text-emerald-600">{examInfo.passingScore}</p>
                    <p className="text-sm text-emerald-700">총점 100점 중 70점 이상</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>• 100문항 중 70문항 이상 정답 시 합격</p>
                    <p>• 과락 제도 없음 (총점 기준)</p>
                    <p>• 4지선다형 객관식</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📈</span> 추천 학습 순서
              </h2>
              <div className="grid md:grid-cols-5 gap-4">
                {studyPath.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold mb-3">
                        {item.step}
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                      <p className="text-xs text-emerald-600 mt-2">권장: {item.duration}</p>
                    </div>
                    {idx < studyPath.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 text-emerald-300">→</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-6 text-white">
              <h2 className="text-lg font-bold mb-2">💡 합격 TIP</h2>
              <ul className="space-y-2 text-emerald-50">
                <li>• 금융투자상품의 기본 개념과 특성을 확실히 이해하세요</li>
                <li>• 증권분석은 기본적 분석과 기술적 분석 모두 출제됩니다</li>
                <li>• 투자권유 파트는 펀드자격과 유사하나 증권 특화 내용 추가</li>
                <li>• 법규 파트는 자본시장법 핵심 조문 위주로 학습하세요</li>
              </ul>
            </div>
          </div>
        )}

        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-lg font-bold text-gray-800 mb-4">시험 구성</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">과목</th>
                      <th className="text-center py-3 px-4">문항 수</th>
                      <th className="text-center py-3 px-4">배점</th>
                      <th className="text-left py-3 px-4">주요 내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject, idx) => (
                      <tr key={idx} className="border-b last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span>{subject.icon}</span>
                            <span className="font-medium">{subject.name}</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">{subject.questions}문항</td>
                        <td className="text-center py-3 px-4">{subject.questions}점</td>
                        <td className="py-3 px-4 text-gray-600">{subject.description}</td>
                      </tr>
                    ))}
                    <tr className="bg-emerald-50 font-medium">
                      <td className="py-3 px-4">합계</td>
                      <td className="text-center py-3 px-4">100문항</td>
                      <td className="text-center py-3 px-4">100점</td>
                      <td className="py-3 px-4">시험시간: 100분</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {subjects.map((subject) => (
                <div key={subject.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{subject.icon}</span>
                      <div>
                        <h3 className="font-bold text-white">{subject.name}</h3>
                        <p className="text-emerald-100 text-sm">{subject.questions}문항</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-4">{subject.description}</p>
                    <Link
                      href={`/category/finance/securities-advisor/study/${subject.id}`}
                      className="block w-full text-center py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition font-medium"
                    >
                      학습하기 →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-lg font-bold text-gray-800 mb-4">2026년 상반기 시험일정</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-center py-3 px-4">회차</th>
                      <th className="text-center py-3 px-4">접수기간</th>
                      <th className="text-center py-3 px-4">시험일</th>
                      <th className="text-center py-3 px-4">합격발표</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules2026.map((schedule, idx) => (
                      <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="text-center py-3 px-4 font-medium">{schedule.round}</td>
                        <td className="text-center py-3 px-4">{schedule.apply}</td>
                        <td className="text-center py-3 px-4 text-emerald-600 font-medium">{schedule.exam}</td>
                        <td className="text-center py-3 px-4">{schedule.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-4">※ 정확한 일정은 금융투자협회 홈페이지에서 확인하세요</p>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
              <h3 className="font-bold text-emerald-800 mb-2">📌 시험 접수 안내</h3>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• 접수처: 금융투자협회 자격시험센터 (license.kofia.or.kr)</li>
                <li>• 결제방법: 신용카드, 계좌이체</li>
                <li>• 시험장소: 전국 주요 도시 CBT 시험장</li>
                <li>• 준비물: 신분증, 수험표</li>
              </ul>
            </div>
          </div>
        )}

        {/* Study Tab */}
        {activeTab === 'study' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">🤖 AI 학습 도우미</h2>
              <p className="text-emerald-100">
                각 과목별 핵심 문제를 AI와 함께 학습하세요.
                Claude, ChatGPT, Gemini 중 선택하여 상세한 해설을 받을 수 있습니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {subjects.map((subject) => (
                <Link
                  key={subject.id}
                  href={`/category/finance/securities-advisor/study/${subject.id}`}
                  className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">
                      {subject.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.questions}문항</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{subject.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">AI 학습 지원</span>
                    <span className="text-emerald-500 font-medium">학습하기 →</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/category/finance/securities-advisor/exam"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                📋 시험정보 상세보기
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. 증권투자권유자문인력 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
