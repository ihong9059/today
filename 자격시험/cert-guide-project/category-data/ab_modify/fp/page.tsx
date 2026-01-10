'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FPPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'tips'>('overview');

  const examInfo = {
    name: '자산관리사(FP)',
    englishName: 'Financial Planner',
    category: '금융',
    organizer: '한국금융연수원',
    difficulty: '중',
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
      name: '재무설계 개론',
      slug: 'financial-planning',
      questions: 20,
      description: '재무설계 프로세스, 화폐의 시간가치',
      topics: ['재무설계 개념', '재무설계 프로세스', '화폐의 시간가치', '재무제표 분석', '고객상담'],
      color: 'emerald',
    },
    {
      id: 2,
      name: '투자설계',
      slug: 'investment-planning',
      questions: 20,
      description: '투자상품, 포트폴리오, 자산배분',
      topics: ['투자환경', '채권투자', '주식투자', '펀드투자', '포트폴리오'],
      color: 'teal',
    },
    {
      id: 3,
      name: '보험설계',
      slug: 'insurance-planning',
      questions: 20,
      description: '생명보험, 손해보험, 리스크관리',
      topics: ['위험관리', '생명보험', '손해보험', '제3보험', '보험설계'],
      color: 'cyan',
    },
    {
      id: 4,
      name: '세금설계',
      slug: 'tax-planning',
      questions: 20,
      description: '소득세, 상속세, 증여세, 절세전략',
      topics: ['소득세', '금융소득과세', '양도소득세', '상속세', '증여세'],
      color: 'sky',
    },
  ];

  const studyTips = [
    {
      title: '화폐의 시간가치 계산',
      description: '현재가치, 미래가치, 연금계산 등 기본 공식을 숙지하세요.',
      icon: '📊',
    },
    {
      title: '투자상품 이해',
      description: '예금, 채권, 주식, 펀드 등 각 상품의 특성과 위험을 파악하세요.',
      icon: '💰',
    },
    {
      title: '보험상품 정리',
      description: '생명보험, 손해보험의 종류와 보장내용을 체계적으로 정리하세요.',
      icon: '🛡️',
    },
    {
      title: '세금 계산 연습',
      description: '소득세, 상속세, 증여세 계산 문제를 반복 연습하세요.',
      icon: '📝',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; hover: string }> = {
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', hover: 'hover:border-emerald-400' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', hover: 'hover:border-teal-400' },
      cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', hover: 'hover:border-cyan-400' },
      sky: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', hover: 'hover:border-sky-400' },
    };
    return colors[color] || colors.emerald;
  };

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
            <span className="text-emerald-600 font-medium">자산관리사(FP)</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{examInfo.name}</h1>
              <p className="text-gray-500">{examInfo.englishName}</p>
            </div>
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              {examInfo.category}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">자산관리사(FP)</h2>
              <p className="text-emerald-100 mb-4">개인의 재무목표 달성을 위한 종합 재무설계 전문가 자격증</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">난이도: {examInfo.difficulty}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{examInfo.totalQuestions}문항</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{examInfo.examTime}분</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/category/finance/fp/exam"
                className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 transition shadow-lg"
              >
                시험 정보
              </Link>
              <Link
                href="#subjects"
                className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-400 transition"
              >
                학습 시작
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Info Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100">
            <p className="text-sm text-gray-500 mb-1">주관기관</p>
            <p className="font-bold text-gray-800">{examInfo.organizer}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100">
            <p className="text-sm text-gray-500 mb-1">합격기준</p>
            <p className="font-bold text-gray-800">{examInfo.passingScore}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100">
            <p className="text-sm text-gray-500 mb-1">응시료</p>
            <p className="font-bold text-gray-800">{examInfo.examFee}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100">
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
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">자산관리사(FP)란?</h3>
            <div className="prose max-w-none text-gray-600 space-y-4">
              <p>
                자산관리사(FP: Financial Planner)는 한국금융연수원에서 주관하는 자격시험으로,
                고객의 재무목표 달성을 위해 재무설계, 투자, 보험, 세금 등 종합적인
                자산관리 서비스를 제공하는 전문가 자격증입니다.
              </p>
              <p>
                은행, 증권, 보험 등 금융기관의 PB(Private Banker), WM(Wealth Manager),
                자산관리 컨설턴트로 활동하는 데 필수적인 자격증으로 인정받고 있습니다.
              </p>
              <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">주요 취업 분야</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>은행 PB센터, 자산관리부서</li>
                <li>증권사 WM사업부, 자산관리팀</li>
                <li>보험사 FA(Financial Advisor)</li>
                <li>독립 재무설계사(IFA)</li>
                <li>자산운용사, 신탁회사</li>
              </ul>
              <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">시험 구성</h4>
              <div className="bg-emerald-50 rounded-xl p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-emerald-200">
                      <th className="text-left py-2 font-semibold">과목</th>
                      <th className="text-center py-2 font-semibold">문항수</th>
                      <th className="text-center py-2 font-semibold">배점</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => (
                      <tr key={subject.id} className="border-b border-emerald-100">
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
                      href={`/category/finance/fp/study/${subject.slug}`}
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
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">합격 전략</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {studyTips.map((tip, index) => (
                <div key={index} className="flex gap-4 p-4 bg-emerald-50 rounded-xl">
                  <span className="text-3xl">{tip.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-3">추천 학습 순서</h4>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                {subjects.map((subject, index) => (
                  <div key={subject.id} className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
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
            href="/category/finance/fp/exam"
            className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 hover:border-emerald-300 transition group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition">
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
            className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 hover:border-emerald-300 transition group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-emerald-200 text-emerald-600 rounded-xl hover:bg-emerald-50 transition font-medium"
          >
            ← 금융 분야 목록으로
          </Link>
        </div>
      </main>
    </div>
  );
}
