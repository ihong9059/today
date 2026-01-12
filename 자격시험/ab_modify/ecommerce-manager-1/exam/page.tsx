'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EcommerceManager1ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: '전자상거래 기획',
      icon: '📊',
      questions: 20,
      topics: ['전자상거래 전략', '마케팅 기획', '사업계획', '시장분석', '수익모델'],
      color: 'indigo'
    },
    {
      name: '전자상거래 운영관리',
      icon: '🛒',
      questions: 20,
      topics: ['쇼핑몰 운영', '상품관리', '물류/배송', '고객관리', 'CS 운영'],
      color: 'blue'
    },
    {
      name: '전자상거래 시스템관리',
      icon: '💻',
      questions: 20,
      topics: ['웹개발', '보안', '결제시스템', '서버관리', '데이터베이스'],
      color: 'emerald'
    },
    {
      name: '전자상거래 관련법규',
      icon: '⚖️',
      questions: 20,
      topics: ['전자상거래법', '개인정보보호', '소비자보호', '전자서명', '통신판매업'],
      color: 'amber'
    }
  ];

  const practicalInfo = {
    name: '전자상거래 실무',
    icon: '⚡',
    time: 150,
    tasks: [
      { name: '필답형', desc: '사업계획, 마케팅 전략 서술', weight: '40%' },
      { name: '컴퓨터작업형', desc: '쇼핑몰 구축, 데이터 분석', weight: '60%' }
    ]
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; gradient: string }> = {
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700', gradient: 'from-indigo-500 to-purple-500' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-700', gradient: 'from-blue-500 to-cyan-500' },
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700', gradient: 'from-emerald-500 to-teal-500' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-700', gradient: 'from-amber-500 to-orange-500' }
    };
    return colors[color] || colors.indigo;
  };

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
              <Link href="/category/office/ecommerce-1" className="text-gray-600 hover:text-indigo-600 transition">전자상거래관리사 1급</Link>
              <span className="text-gray-300">/</span>
              <span className="text-indigo-600 font-medium">시험 정보</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">📋</span>
            </div>
            <div>
              <h1 className="text-3xl font-black">전자상거래관리사 1급</h1>
              <p className="text-indigo-100">시험 상세 정보</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-lg w-fit">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'written'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'practical'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            💻 실기시험
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'written' && (
          <div className="space-y-8">
            {/* Overview Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📝</span> 필기시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { label: '시험 과목', value: '4과목' },
                  { label: '문항 수', value: '80문항' },
                  { label: '시험 시간', value: '100분' },
                  { label: '합격 기준', value: '과목당 40점, 평균 60점' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-gray-500 text-sm">{item.label}</p>
                    <p className="font-bold text-gray-800 text-lg">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Subjects */}
            <div className="grid md:grid-cols-2 gap-6">
              {writtenSubjects.map((subject, idx) => {
                const colorClasses = getColorClasses(subject.color);
                return (
                  <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className={`p-6 bg-gradient-to-r ${colorClasses.gradient} text-white`}>
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{subject.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold">{subject.name}</h3>
                          <p className="text-sm opacity-80">{subject.questions}문항</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-gray-800 mb-3">출제 범위</h4>
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map((topic, tIdx) => (
                          <span key={tIdx} className={`px-3 py-1 rounded-full text-sm ${colorClasses.bg} ${colorClasses.text}`}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Study Links */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">📚 필기 과목별 학습</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/category/office/ecommerce-1/study/ec-planning" className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className="font-bold text-sm">전자상거래 기획</p>
                    <p className="text-xs opacity-80">학습하기</p>
                  </div>
                </Link>
                <Link href="/category/office/ecommerce-1/study/ec-operation" className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3">
                  <span className="text-2xl">🛒</span>
                  <div>
                    <p className="font-bold text-sm">전자상거래 운영관리</p>
                    <p className="text-xs opacity-80">학습하기</p>
                  </div>
                </Link>
                <Link href="/category/office/ecommerce-1/study/ec-system" className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3">
                  <span className="text-2xl">💻</span>
                  <div>
                    <p className="font-bold text-sm">전자상거래 시스템관리</p>
                    <p className="text-xs opacity-80">학습하기</p>
                  </div>
                </Link>
                <Link href="/category/office/ecommerce-1/study/ec-law" className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3">
                  <span className="text-2xl">⚖️</span>
                  <div>
                    <p className="font-bold text-sm">전자상거래 관련법규</p>
                    <p className="text-xs opacity-80">학습하기</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practical' && (
          <div className="space-y-8">
            {/* Overview Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">💻</span> 실기시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { label: '시험 과목', value: '전자상거래 실무' },
                  { label: '시험 방식', value: '필답형+작업형' },
                  { label: '시험 시간', value: '150분' },
                  { label: '합격 기준', value: '60점 이상' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-gray-500 text-sm">{item.label}</p>
                    <p className="font-bold text-gray-800 text-lg">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Task Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{practicalInfo.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold">{practicalInfo.name}</h3>
                    <p className="text-sm opacity-80">{practicalInfo.time}분</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-gray-800 mb-4">작업 유형별 배점</h4>
                <div className="space-y-3">
                  {practicalInfo.tasks.map((task, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <p className="font-bold text-gray-800">{task.name}</p>
                        <p className="text-sm text-gray-500">{task.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-rose-600">{task.weight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Skills */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🔧 핵심 실무 스킬</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span>📝</span> 필답형 영역
                  </h4>
                  <div className="space-y-2">
                    {['사업계획서 작성', '마케팅 전략 수립', '고객분석 및 타겟팅', '수익모델 설계', 'KPI 설정 및 분석'].map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-rose-50 rounded-lg">
                        <span className="text-rose-500">✓</span>
                        <span className="text-sm text-rose-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span>💻</span> 작업형 영역
                  </h4>
                  <div className="space-y-2">
                    {['쇼핑몰 페이지 구축', 'HTML/CSS 코딩', '상품등록 및 관리', '데이터 분석 (엑셀)', '결제시스템 설정'].map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-indigo-50 rounded-lg">
                        <span className="text-indigo-500">✓</span>
                        <span className="text-sm text-indigo-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Study Link */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">💻 실기 학습</h3>
              <Link href="/category/office/ecommerce-1/study/practical" className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3 w-fit">
                <span className="text-3xl">⚡</span>
                <div>
                  <p className="font-bold">전자상거래 실무</p>
                  <p className="text-sm opacity-80">실기 문제 학습하기</p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Registration Info */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span> 시험 접수 안내
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-700 mb-2">응시 자격</h4>
              <div className="bg-indigo-50 rounded-xl p-4">
                <p className="text-indigo-800 font-medium">제한 없음</p>
                <p className="text-indigo-600 text-sm mt-1">누구나 응시 가능합니다.</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-2">접수 방법</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-indigo-500">✓</span>
                  인터넷 접수: license.korcham.net
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-500">✓</span>
                  연 4회 정기시험
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <a
              href="https://license.korcham.net"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
            >
              시험 접수하기 →
            </a>
            <Link
              href="/category/office/ecommerce-1"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition"
            >
              ← 돌아가기
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
