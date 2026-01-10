'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FinancialRiskManagerPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'tips'>('overview');

  const examInfo = {
    name: '재무위험관리사',
    englishName: 'Financial Risk Manager',
    category: '금융',
    organizer: '한국금융연수원',
    difficulty: '중상',
    passingScore: '70점 이상',
    examFormat: '객관식 4지선다',
    totalQuestions: 80,
    examTime: 100,
    examFee: '50,000원',
    schedule: '연 4회 (3월, 6월, 9월, 12월)',
    validity: '영구',
  };

  const subjects = [
    {
      id: 1,
      name: '리스크관리 기초',
      slug: 'risk-management-basics',
      questions: 20,
      description: '리스크의 개념, 유형, 관리체계',
      topics: ['리스크 개념', '리스크 유형', '관리체계', 'ERM', '규제환경'],
      color: 'red',
    },
    {
      id: 2,
      name: '시장리스크',
      slug: 'market-risk',
      questions: 20,
      description: 'VaR, 금리/환율/주가 리스크',
      topics: ['VaR 개념', '금리리스크', '환율리스크', '주가리스크', '파생상품리스크'],
      color: 'rose',
    },
    {
      id: 3,
      name: '신용리스크',
      slug: 'credit-risk',
      questions: 20,
      description: '신용평가, PD/LGD/EAD, 포트폴리오',
      topics: ['신용평가', 'PD/LGD/EAD', '신용VaR', '포트폴리오관리', '바젤규제'],
      color: 'orange',
    },
    {
      id: 4,
      name: '운영리스크',
      slug: 'operational-risk',
      questions: 20,
      description: '운영리스크 측정, 내부통제, BCP',
      topics: ['운영리스크 유형', '측정방법', '내부통제', 'BCP', '자본산출'],
      color: 'amber',
    },
  ];

  const studyTips = [
    {
      title: '리스크 개념 정립',
      description: '시장/신용/운영리스크의 개념과 상호관계를 먼저 이해하세요.',
      icon: '📚',
    },
    {
      title: 'VaR 계산 연습',
      description: 'VaR의 다양한 계산방법(분산-공분산, 역사적 시뮬레이션, 몬테카를로)을 숙지하세요.',
      icon: '📊',
    },
    {
      title: '바젤규제 이해',
      description: '바젤II/III의 자본규제와 리스크별 자본산출 방법을 학습하세요.',
      icon: '📋',
    },
    {
      title: '기출문제 반복',
      description: '최근 5개년 기출문제를 통해 출제 경향을 파악하세요.',
      icon: '✍️',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; hover: string }> = {
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', hover: 'hover:border-red-400' },
      rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', hover: 'hover:border-rose-400' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', hover: 'hover:border-orange-400' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', hover: 'hover:border-amber-400' },
    };
    return colors[color] || colors.red;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-red-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-red-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-red-600 transition">금융</Link>
            <span>/</span>
            <span className="text-red-600 font-medium">재무위험관리사</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{examInfo.name}</h1>
              <p className="text-gray-500">{examInfo.englishName}</p>
            </div>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              {examInfo.category}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">재무위험관리사</h2>
              <p className="text-red-100 mb-4">금융기관의 리스크를 측정하고 관리하는 전문가 자격증</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">난이도: {examInfo.difficulty}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{examInfo.totalQuestions}문항</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{examInfo.examTime}분</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/category/finance/financial-risk-manager/exam"
                className="px-6 py-3 bg-white text-red-600 rounded-xl font-medium hover:bg-red-50 transition shadow-lg"
              >
                시험 정보
              </Link>
              <Link
                href="#subjects"
                className="px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-400 transition"
              >
                학습 시작
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Info Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-red-100">
            <p className="text-sm text-gray-500 mb-1">주관기관</p>
            <p className="font-bold text-gray-800">{examInfo.organizer}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-red-100">
            <p className="text-sm text-gray-500 mb-1">합격기준</p>
            <p className="font-bold text-gray-800">{examInfo.passingScore}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-red-100">
            <p className="text-sm text-gray-500 mb-1">응시료</p>
            <p className="font-bold text-gray-800">{examInfo.examFee}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-red-100">
            <p className="text-sm text-gray-500 mb-1">시험일정</p>
            <p className="font-bold text-gray-800">{examInfo.schedule}</p>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'overview', label: '시험 개요' },
            { id: 'subjects', label: '과목별 학습' },
            { id: 'tips', label: '합격 전략' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'subjects' | 'tips')}
              className={`px-5 py-2.5 rounded-xl font-medium transition ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-red-50 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">재무위험관리사란?</h3>
            <div className="prose max-w-none text-gray-600 space-y-4">
              <p>
                재무위험관리사는 한국금융연수원에서 주관하는 자격시험으로, 금융기관의
                다양한 리스크(시장, 신용, 운영)를 측정, 분석, 관리하는 데 필요한
                전문지식과 능력을 검증하는 자격증입니다.
              </p>
              <p>
                금융기관의 리스크관리부서, 준법감시부서, ALM부서 등에서
                업무를 수행하는 데 필수적인 자격증으로 인정받고 있습니다.
              </p>
              <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">주요 취업 분야</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>은행, 증권사, 보험사 리스크관리부서</li>
                <li>금융기관 ALM(자산부채관리)팀</li>
                <li>금융감독원, 예금보험공사 등 금융감독기관</li>
                <li>신용평가회사 리스크분석팀</li>
                <li>컨설팅펌 금융리스크 자문부서</li>
              </ul>
              <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">시험 구성</h4>
              <div className="bg-red-50 rounded-xl p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-red-200">
                      <th className="text-left py-2 font-semibold">과목</th>
                      <th className="text-center py-2 font-semibold">문항수</th>
                      <th className="text-center py-2 font-semibold">배점</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => (
                      <tr key={subject.id} className="border-b border-red-100">
                        <td className="py-2">{subject.name}</td>
                        <td className="text-center py-2">{subject.questions}문항</td>
                        <td className="text-center py-2">{subject.questions * 1.25}점</td>
                      </tr>
                    ))}
                    <tr className="font-bold">
                      <td className="py-2">합계</td>
                      <td className="text-center py-2">80문항</td>
                      <td className="text-center py-2">100점</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'subjects' && (
          <section id="subjects" className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">과목별 학습</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {subjects.map((subject) => {
                const colorClasses = getColorClasses(subject.color);
                return (
                  <div
                    key={subject.id}
                    className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${colorClasses.border} ${colorClasses.hover} transition-all hover:shadow-xl`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">{subject.name}</h4>
                        <p className="text-sm text-gray-500">{subject.description}</p>
                      </div>
                      <span className={`px-3 py-1 ${colorClasses.bg} ${colorClasses.text} rounded-full text-sm font-medium`}>
                        {subject.questions}문항
                      </span>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">주요 토픽</p>
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map((topic, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      href={`/category/finance/financial-risk-manager/study/${subject.slug}`}
                      className={`block w-full text-center py-3 ${colorClasses.bg} ${colorClasses.text} rounded-xl font-medium hover:opacity-80 transition`}
                    >
                      학습 시작하기
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {activeTab === 'tips' && (
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-red-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">합격 전략</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {studyTips.map((tip, index) => (
                <div key={index} className="flex gap-4 p-4 bg-red-50 rounded-xl">
                  <span className="text-3xl">{tip.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-red-100 to-rose-100 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-3">추천 학습 순서</h4>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                {subjects.map((subject, index) => (
                  <div key={subject.id} className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-700">{subject.name}</span>
                    {index < subjects.length - 1 && (
                      <span className="hidden md:block text-gray-400 ml-2">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Quick Links */}
        <section className="mt-8 grid md:grid-cols-2 gap-6">
          <Link
            href="/category/finance/financial-risk-manager/exam"
            className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 hover:border-red-300 transition group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition">
                📋
              </div>
              <div>
                <h4 className="font-bold text-gray-800">시험 상세 정보</h4>
                <p className="text-sm text-gray-500">일정, 접수방법, 준비물 확인</p>
              </div>
            </div>
          </Link>
          <a
            href="https://www.kbi.or.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 hover:border-red-300 transition group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition">
                🔗
              </div>
              <div>
                <h4 className="font-bold text-gray-800">한국금융연수원</h4>
                <p className="text-sm text-gray-500">공식 사이트 바로가기</p>
              </div>
            </div>
          </a>
        </section>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/category/finance"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition font-medium"
          >
            ← 금융 분야 목록으로
          </Link>
        </div>
      </main>
    </div>
  );
}
