'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreditAnalystPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'tips'>('overview');

  const examInfo = {
    name: '신용분석사',
    englishName: 'Credit Analyst',
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
      name: '회계원리',
      slug: 'accounting-principles',
      questions: 20,
      description: '회계의 기본원리, 재무제표 작성, 회계순환과정',
      topics: ['회계의 기초', '재무제표', '회계순환과정', '자산회계', '부채와 자본회계'],
      color: 'blue',
    },
    {
      id: 2,
      name: '재무회계',
      slug: 'financial-accounting',
      questions: 20,
      description: '재무보고, 기업회계기준, 재무제표 분석',
      topics: ['재무보고의 개념체계', '유동자산', '비유동자산', '부채', '자본과 이익잉여금'],
      color: 'indigo',
    },
    {
      id: 3,
      name: '신용분석',
      slug: 'credit-analysis',
      questions: 20,
      description: '신용평가, 신용등급, 신용리스크 관리',
      topics: ['신용분석 기초', '재무비율분석', '현금흐름분석', '신용등급 결정', '신용리스크'],
      color: 'violet',
    },
    {
      id: 4,
      name: '기업분석',
      slug: 'corporate-analysis',
      questions: 20,
      description: '기업가치평가, 산업분석, 경영분석',
      topics: ['기업분석 개요', '산업분석', '경영분석', '가치평가', '부실기업 분석'],
      color: 'purple',
    },
  ];

  const studyTips = [
    {
      title: '회계원리부터 탄탄하게',
      description: '신용분석의 기초가 되는 회계원리를 먼저 완벽히 이해해야 합니다.',
      icon: '📚',
    },
    {
      title: '재무비율 암기 필수',
      description: '유동성, 수익성, 안정성 비율의 공식과 해석법을 반드시 암기하세요.',
      icon: '📊',
    },
    {
      title: '실제 재무제표 분석 연습',
      description: '상장기업의 실제 재무제표를 분석해보면 이해도가 높아집니다.',
      icon: '📈',
    },
    {
      title: '기출문제 반복 학습',
      description: '최근 5개년 기출문제를 최소 3회 이상 반복 풀이하세요.',
      icon: '✍️',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; hover: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', hover: 'hover:border-blue-400' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', hover: 'hover:border-indigo-400' },
      violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', hover: 'hover:border-violet-400' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', hover: 'hover:border-purple-400' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-blue-600 transition">금융</Link>
            <span>/</span>
            <span className="text-blue-600 font-medium">신용분석사</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{examInfo.name}</h1>
              <p className="text-gray-500">{examInfo.englishName}</p>
            </div>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {examInfo.category}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">신용분석사</h2>
              <p className="text-blue-100 mb-4">기업의 신용상태를 분석하고 평가하는 금융전문가 자격증</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">난이도: {examInfo.difficulty}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{examInfo.totalQuestions}문항</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{examInfo.examTime}분</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/category/finance/credit-analyst/exam"
                className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition shadow-lg"
              >
                시험 정보
              </Link>
              <Link
                href="#subjects"
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-400 transition"
              >
                학습 시작
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Info Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-blue-100">
            <p className="text-sm text-gray-500 mb-1">주관기관</p>
            <p className="font-bold text-gray-800">{examInfo.organizer}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-blue-100">
            <p className="text-sm text-gray-500 mb-1">합격기준</p>
            <p className="font-bold text-gray-800">{examInfo.passingScore}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-blue-100">
            <p className="text-sm text-gray-500 mb-1">응시료</p>
            <p className="font-bold text-gray-800">{examInfo.examFee}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-blue-100">
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
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">신용분석사란?</h3>
            <div className="prose max-w-none text-gray-600 space-y-4">
              <p>
                신용분석사는 한국금융연수원에서 주관하는 자격시험으로, 기업의 신용상태를 분석하고
                평가하는 데 필요한 전문지식과 능력을 검증하는 자격증입니다.
              </p>
              <p>
                금융기관에서 여신업무, 기업심사, 신용평가 업무를 수행하는 데 필요한
                회계, 재무분석, 신용분석에 대한 종합적인 이해를 요구합니다.
              </p>
              <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">주요 취업 분야</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>은행, 저축은행 등 금융기관 여신부서</li>
                <li>신용평가회사 (한국신용평가, NICE신용평가 등)</li>
                <li>증권사, 자산운용사 리서치부서</li>
                <li>기업 재무팀, 회계법인</li>
                <li>공공기관 금융 관련 부서</li>
              </ul>
              <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">시험 구성</h4>
              <div className="bg-blue-50 rounded-xl p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-blue-200">
                      <th className="text-left py-2 font-semibold">과목</th>
                      <th className="text-center py-2 font-semibold">문항수</th>
                      <th className="text-center py-2 font-semibold">배점</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => (
                      <tr key={subject.id} className="border-b border-blue-100">
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
                      href={`/category/finance/credit-analyst/study/${subject.slug}`}
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
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">합격 전략</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {studyTips.map((tip, index) => (
                <div key={index} className="flex gap-4 p-4 bg-blue-50 rounded-xl">
                  <span className="text-3xl">{tip.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-3">추천 학습 순서</h4>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                {subjects.map((subject, index) => (
                  <div key={subject.id} className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
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
            href="/category/finance/credit-analyst/exam"
            className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:border-blue-300 transition group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition">
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
            className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:border-blue-300 transition group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 transition font-medium"
          >
            ← 금융 분야 목록으로
          </Link>
        </div>
      </main>
    </div>
  );
}
