'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ComputerSkills2Page() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'tips'>('overview');

  const subjects = [
    {
      title: '컴퓨터 일반',
      icon: '🖥️',
      desc: '컴퓨터 시스템, 운영체제, 네트워크 기초',
      questions: 20,
      color: 'from-violet-500 to-purple-500',
      href: '/category/office/computer-skills-2/study/computer-general'
    },
    {
      title: '스프레드시트 일반',
      icon: '📊',
      desc: '엑셀 함수, 데이터 관리, 차트 활용',
      questions: 20,
      color: 'from-green-500 to-emerald-500',
      href: '/category/office/computer-skills-2/study/spreadsheet'
    }
  ];

  const practicalSubjects = [
    {
      title: '스프레드시트 실무',
      icon: '💻',
      desc: '엑셀 실무 작업, 함수 활용, 매크로',
      color: 'from-teal-500 to-cyan-500',
      href: '/category/office/computer-skills-2/study/spreadsheet-practical'
    }
  ];

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
              <span className="text-green-600 font-medium">컴퓨터활용능력 2급</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-6xl mx-auto px-4 py-16 relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
                <span className="animate-pulse">🔥</span>
                <span>사무직 필수 자격증</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                컴퓨터활용능력<br />
                <span className="text-green-200">2급</span>
              </h1>
              <p className="text-green-100 text-lg mb-8 max-w-lg">
                스프레드시트(Excel) 프로그램의 실무 활용 능력을 평가하는 국가기술자격
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  href="/category/office/computer-skills-2/exam"
                  className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all hover:scale-105 shadow-lg"
                >
                  시험 정보 보기
                </Link>
                <Link
                  href="#study"
                  className="px-8 py-4 bg-green-500/30 backdrop-blur text-white rounded-xl font-bold hover:bg-green-500/50 transition-all border border-white/30"
                >
                  학습 시작하기
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <div className="text-8xl mb-4 text-center">📊</div>
                  <div className="text-center">
                    <p className="text-green-200 text-sm">대한상공회의소</p>
                    <p className="text-2xl font-bold">국가기술자격</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '📝', label: '필기', value: '2과목 40문항', sub: '40분' },
            { icon: '💻', label: '실기', value: '엑셀', sub: '40분' },
            { icon: '📈', label: '합격률', value: '필기 50%', sub: '실기 40%' },
            { icon: '💰', label: '응시료', value: '필기 19,000원', sub: '실기 22,500원' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-gray-500 text-sm mt-2">{item.label}</p>
              <p className="font-bold text-gray-800">{item.value}</p>
              <p className="text-xs text-gray-400">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <div className="flex gap-2 border-b border-gray-200">
          {[
            { id: 'overview', label: '시험 개요', icon: '📋' },
            { id: 'subjects', label: '과목 안내', icon: '📚' },
            { id: 'tips', label: '합격 전략', icon: '🎯' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all relative
                ${activeTab === tab.id
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700'}`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎯</span> 시험 개요
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>컴퓨터활용능력 2급은 스프레드시트(엑셀)의 기본부터 중급 수준의 활용 능력을 평가하는 시험입니다.</p>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="font-medium text-green-800">💡 1급과의 차이점</p>
                  <ul className="text-sm text-green-700 mt-2 space-y-1">
                    <li>• 데이터베이스(Access) 과목 없음</li>
                    <li>• 엑셀 함수 난이도 낮음</li>
                    <li>• 실기 시간 40분 (1급 90분)</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">시험 방식</span>
                  <span className="font-bold text-green-600">상시시험</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">접수 방법</span>
                  <span className="font-bold">인터넷 접수</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">합격 기준</span>
                  <span className="font-bold">과목당 40점, 평균 60점 이상</span>
                </div>
                <a
                  href="https://license.korcham.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center p-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition mt-4"
                >
                  대한상공회의소 바로가기 →
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📝</span> 필기시험 (2과목)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {subjects.map((subject, idx) => (
                  <Link
                    key={idx}
                    href={subject.href}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${subject.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition`}>
                      {subject.icon}
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{subject.title}</h4>
                    <p className="text-gray-500 text-sm mb-3">{subject.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        {subject.questions}문항
                      </span>
                      <span className="text-green-600 font-medium text-sm group-hover:translate-x-1 transition">
                        학습하기 →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>💻</span> 실기시험 (1과목)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {practicalSubjects.map((subject, idx) => (
                  <Link
                    key={idx}
                    href={subject.href}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${subject.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition`}>
                      {subject.icon}
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{subject.title}</h4>
                    <p className="text-gray-500 text-sm mb-3">{subject.desc}</p>
                    <div className="flex items-center justify-end">
                      <span className="text-teal-600 font-medium text-sm group-hover:translate-x-1 transition">
                        학습하기 →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📚 학습 전략</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <p className="font-bold text-green-800 mb-2">🎯 초보자 (4주 과정)</p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 1주: 컴퓨터 일반 이론</li>
                    <li>• 2주: 엑셀 기본 함수</li>
                    <li>• 3주: 엑셀 실무 작업</li>
                    <li>• 4주: 기출문제 풀이</li>
                  </ul>
                </div>
                <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl">
                  <p className="font-bold text-teal-800 mb-2">⚡ 엑셀 경험자 (2주 과정)</p>
                  <ul className="text-sm text-teal-700 space-y-1">
                    <li>• 1주: 컴퓨터 일반 + 함수 복습</li>
                    <li>• 2주: 실기 집중 + 기출문제</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💡 합격 포인트</h3>
              <div className="space-y-3">
                {[
                  { icon: '📊', title: '필기 30% : 실기 70%', desc: '실기 중심 학습 권장' },
                  { icon: '🔢', title: '필수 함수 암기', desc: 'VLOOKUP, SUMIF, IF 등' },
                  { icon: '⌨️', title: '단축키 활용', desc: 'Ctrl+C, Ctrl+V 등 기본부터' },
                  { icon: '📝', title: '기출문제 반복', desc: '최근 3년 기출 집중' }
                ].map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <p className="font-bold text-gray-800">{tip.title}</p>
                      <p className="text-sm text-gray-500">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Study Section */}
      <section id="study" className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-800 mb-2">📖 과목별 학습</h2>
          <p className="text-gray-500">AI와 함께하는 효율적인 학습</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[...subjects, ...practicalSubjects].map((subject, idx) => (
            <Link
              key={idx}
              href={subject.href}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className={`h-32 bg-gradient-to-r ${subject.color} flex items-center justify-center`}>
                <span className="text-6xl group-hover:scale-110 transition">{subject.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{subject.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{subject.desc}</p>
                <div className="flex items-center justify-between">
                  {'questions' in subject && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      {subject.questions}문항
                    </span>
                  )}
                  <span className="text-green-600 font-medium group-hover:translate-x-1 transition">
                    학습 시작 →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">컴퓨터활용능력 2급 - 사무직 기본 역량 자격증</p>
        </div>
      </footer>
    </div>
  );
}
