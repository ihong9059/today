'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OfficeAutomationExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: '사무자동화시스템',
      icon: '🖥️',
      questions: 20,
      topics: ['OA 개요', '하드웨어', '소프트웨어', '시스템 구축', '운영관리'],
      color: 'blue'
    },
    {
      name: '사무경영관리개론',
      icon: '📋',
      questions: 20,
      topics: ['사무관리론', '경영이론', '조직관리', '의사결정', '문서관리'],
      color: 'purple'
    },
    {
      name: '프로그래밍 일반',
      icon: '💻',
      questions: 20,
      topics: ['알고리즘', '자료구조', '프로그래밍언어', '운영체제', '데이터베이스'],
      color: 'green'
    },
    {
      name: '정보통신개론',
      icon: '🌐',
      questions: 20,
      topics: ['통신이론', '네트워크', '프로토콜', '인터넷', '정보보안'],
      color: 'cyan'
    }
  ];

  const practicalInfo = {
    name: '사무자동화 실무',
    icon: '⚡',
    time: 150,
    tasks: [
      { name: '스프레드시트', desc: '함수, 데이터분석, 차트', weight: '50%' },
      { name: '데이터베이스', desc: '테이블, 쿼리, 폼/보고서', weight: '50%' }
    ]
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; gradient: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-700', gradient: 'from-blue-500 to-indigo-500' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-700', gradient: 'from-purple-500 to-violet-500' },
      green: { bg: 'bg-green-100', text: 'text-green-700', gradient: 'from-green-500 to-emerald-500' },
      cyan: { bg: 'bg-cyan-100', text: 'text-cyan-700', gradient: 'from-cyan-500 to-teal-500' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <span className="text-2xl">📜</span>
              <span className="font-bold text-gray-800">자격시험 가이드</span>
            </Link>
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition">홈</Link>
              <span className="text-gray-300">/</span>
              <Link href="/category/office" className="text-gray-600 hover:text-blue-600 transition">사무·경영</Link>
              <span className="text-gray-300">/</span>
              <Link href="/category/office/office-automation" className="text-gray-600 hover:text-blue-600 transition">사무자동화산업기사</Link>
              <span className="text-gray-300">/</span>
              <span className="text-blue-600 font-medium">시험 정보</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">📋</span>
            </div>
            <div>
              <h1 className="text-3xl font-black">사무자동화산업기사</h1>
              <p className="text-blue-100">시험 상세 정보</p>
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
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'practical'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
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
                  { label: '시험 시간', value: '2시간' },
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
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">📚 필기 과목별 학습</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/category/office/office-automation/study/oa-system" className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3">
                  <span className="text-2xl">🖥️</span>
                  <div>
                    <p className="font-bold text-sm">사무자동화시스템</p>
                    <p className="text-xs opacity-80">학습하기</p>
                  </div>
                </Link>
                <Link href="/category/office/office-automation/study/office-management" className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <p className="font-bold text-sm">사무경영관리개론</p>
                    <p className="text-xs opacity-80">학습하기</p>
                  </div>
                </Link>
                <Link href="/category/office/office-automation/study/programming" className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3">
                  <span className="text-2xl">💻</span>
                  <div>
                    <p className="font-bold text-sm">프로그래밍 일반</p>
                    <p className="text-xs opacity-80">학습하기</p>
                  </div>
                </Link>
                <Link href="/category/office/office-automation/study/info-comm" className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3">
                  <span className="text-2xl">🌐</span>
                  <div>
                    <p className="font-bold text-sm">정보통신개론</p>
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
                  { label: '시험 과목', value: '사무자동화 실무' },
                  { label: '시험 방식', value: '컴퓨터 작업형' },
                  { label: '시험 시간', value: '2시간 30분' },
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
              <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
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
                        <span className="text-xl font-bold text-orange-600">{task.weight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Skills */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🔧 핵심 스킬</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span>📊</span> 스프레드시트 (엑셀)
                  </h4>
                  <div className="space-y-2">
                    {['VLOOKUP/HLOOKUP', 'SUMIF/COUNTIF', 'IF/AND/OR 중첩', '피벗테이블', '매크로/VBA'].map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm text-green-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span>🗄️</span> 데이터베이스 (액세스)
                  </h4>
                  <div className="space-y-2">
                    {['테이블 설계', '쿼리 작성 (SQL)', '폼 디자인', '보고서 작성', '매크로 활용'].map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                        <span className="text-blue-500">✓</span>
                        <span className="text-sm text-blue-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Study Link */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">💻 실기 학습</h3>
              <Link href="/category/office/office-automation/study/practical" className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3 w-fit">
                <span className="text-3xl">⚡</span>
                <div>
                  <p className="font-bold">사무자동화 실무</p>
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
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>관련 학과 졸업자 또는 졸업예정자</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>관련 분야 실무경력 2년 이상</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>기능사 취득 후 실무경력 1년 이상</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-2">접수 방법</h4>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-blue-800 font-medium">인터넷 접수</p>
                <p className="text-blue-600 text-sm mt-1">Q-Net (www.q-net.or.kr)</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <a
              href="https://www.q-net.or.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
            >
              시험 접수하기 →
            </a>
            <Link
              href="/category/office/office-automation"
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
