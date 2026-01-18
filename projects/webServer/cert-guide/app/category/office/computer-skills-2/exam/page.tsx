'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ComputerSkills2ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: '컴퓨터 일반',
      icon: '🖥️',
      questions: 20,
      topics: ['컴퓨터 시스템', '운영체제', 'PC 유지보수', '네트워크', '정보 보안'],
      color: 'violet'
    },
    {
      name: '스프레드시트 일반',
      icon: '📊',
      questions: 20,
      topics: ['데이터 입력', '수식/함수', '차트', '데이터 관리', '인쇄'],
      color: 'green'
    }
  ];

  const practicalInfo = {
    name: '스프레드시트 실무',
    icon: '💻',
    time: 40,
    tasks: [
      { name: '기본 작업', desc: '입력, 서식, 조건부 서식', weight: '15%' },
      { name: '계산 작업', desc: '수식, 함수 활용', weight: '35%' },
      { name: '분석 작업', desc: '정렬, 부분합, 피벗', weight: '25%' },
      { name: '기타 작업', desc: '차트, 매크로', weight: '25%' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <span className="text-2xl">📜</span>
              <span className="font-bold text-gray-800">자격시험 가이드</span>
            </Link>
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-green-600 transition">홈</Link>
              <span className="text-gray-300">/</span>
              <Link href="/category/office" className="text-gray-600 hover:text-green-600 transition">사무·경영</Link>
              <span className="text-gray-300">/</span>
              <Link href="/category/office/computer-skills-2" className="text-gray-600 hover:text-green-600 transition">컴퓨터활용능력 2급</Link>
              <span className="text-gray-300">/</span>
              <span className="text-green-600 font-medium">시험 정보</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">📋</span>
            </div>
            <div>
              <h1 className="text-3xl font-black">컴퓨터활용능력 2급</h1>
              <p className="text-green-100">시험 상세 정보</p>
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
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'practical'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
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
                  { label: '시험 과목', value: '2과목' },
                  { label: '문항 수', value: '40문항' },
                  { label: '시험 시간', value: '40분' },
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
              {writtenSubjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className={`p-6 bg-gradient-to-r ${subject.color === 'violet' ? 'from-violet-500 to-purple-500' : 'from-green-500 to-emerald-500'} text-white`}>
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
                        <span key={tIdx} className={`px-3 py-1 rounded-full text-sm ${subject.color === 'violet' ? 'bg-violet-100 text-violet-700' : 'bg-green-100 text-green-700'}`}>
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Study Links */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">📚 필기 과목별 학습</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/category/office/computer-skills-2/study/computer-general" className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3">
                  <span className="text-3xl">🖥️</span>
                  <div>
                    <p className="font-bold">컴퓨터 일반</p>
                    <p className="text-sm opacity-80">50문제 학습하기</p>
                  </div>
                </Link>
                <Link href="/category/office/computer-skills-2/study/spreadsheet" className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3">
                  <span className="text-3xl">📊</span>
                  <div>
                    <p className="font-bold">스프레드시트 일반</p>
                    <p className="text-sm opacity-80">50문제 학습하기</p>
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
                  { label: '시험 과목', value: '스프레드시트 실무' },
                  { label: '시험 방식', value: '컴퓨터 작업형' },
                  { label: '시험 시간', value: '40분' },
                  { label: '합격 기준', value: '70점 이상' }
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
              <div className="p-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
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
                        <span className="text-xl font-bold text-teal-600">{task.weight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Functions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🔢 필수 함수 목록</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { category: '논리 함수', funcs: ['IF', 'AND', 'OR', 'NOT'] },
                  { category: '통계 함수', funcs: ['SUMIF', 'COUNTIF', 'AVERAGEIF', 'RANK'] },
                  { category: '찾기/참조', funcs: ['VLOOKUP', 'HLOOKUP', 'INDEX', 'MATCH'] },
                  { category: '텍스트 함수', funcs: ['LEFT', 'RIGHT', 'MID', 'CONCATENATE'] },
                  { category: '날짜 함수', funcs: ['DATE', 'YEAR', 'MONTH', 'DAY'] },
                  { category: '수학 함수', funcs: ['ROUND', 'ROUNDUP', 'ROUNDDOWN', 'MOD'] }
                ].map((group, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4">
                    <p className="font-bold text-gray-800 mb-2">{group.category}</p>
                    <div className="flex flex-wrap gap-1">
                      {group.funcs.map((func, fIdx) => (
                        <span key={fIdx} className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs font-mono">
                          {func}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Link */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">💻 실기 학습</h3>
              <Link href="/category/office/computer-skills-2/study/spreadsheet-practical" className="bg-white/20 backdrop-blur rounded-xl p-4 hover:bg-white/30 transition flex items-center gap-3 w-fit">
                <span className="text-3xl">📊</span>
                <div>
                  <p className="font-bold">스프레드시트 실무</p>
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
              <h4 className="font-bold text-gray-700 mb-2">접수 방법</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  인터넷 접수: license.korcham.net
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  상시시험으로 수시 접수 가능
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  필기/실기 개별 접수
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-2">응시 자격</h4>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-green-800 font-medium">제한 없음</p>
                <p className="text-green-600 text-sm mt-1">누구나 응시 가능합니다.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <a
              href="https://license.korcham.net"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition"
            >
              시험 접수하기 →
            </a>
            <Link
              href="/category/office/computer-skills-2"
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
