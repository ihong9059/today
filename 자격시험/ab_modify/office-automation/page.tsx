'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OfficeAutomationPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'tips'>('overview');

  const subjects = [
    {
      title: '사무자동화시스템',
      icon: '🖥️',
      desc: 'OA 시스템, 하드웨어, 소프트웨어',
      questions: 20,
      color: 'from-blue-500 to-indigo-500',
      href: '/category/office/office-automation/study/oa-system'
    },
    {
      title: '사무경영관리개론',
      icon: '📋',
      desc: '사무관리, 경영이론, 조직관리',
      questions: 20,
      color: 'from-purple-500 to-violet-500',
      href: '/category/office/office-automation/study/office-management'
    },
    {
      title: '프로그래밍 일반',
      icon: '💻',
      desc: '알고리즘, 자료구조, 프로그래밍언어',
      questions: 20,
      color: 'from-green-500 to-emerald-500',
      href: '/category/office/office-automation/study/programming'
    },
    {
      title: '정보통신개론',
      icon: '🌐',
      desc: '네트워크, 통신 프로토콜, 보안',
      questions: 20,
      color: 'from-cyan-500 to-teal-500',
      href: '/category/office/office-automation/study/info-comm'
    }
  ];

  const practicalSubjects = [
    {
      title: '사무자동화 실무',
      icon: '⚡',
      desc: '스프레드시트, 데이터베이스 실무',
      color: 'from-orange-500 to-amber-500',
      href: '/category/office/office-automation/study/practical'
    }
  ];

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
              <span className="text-blue-600 font-medium">사무자동화산업기사</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-6xl mx-auto px-4 py-16 relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
                <span className="animate-pulse">🏆</span>
                <span>산업기사급 국가기술자격</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                사무자동화<br />
                <span className="text-blue-200">산업기사</span>
              </h1>
              <p className="text-blue-100 text-lg mb-8 max-w-lg">
                사무자동화 시스템의 기획, 구축, 운영 및 관리 업무를 수행하는 전문 인력 양성
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  href="/category/office/office-automation/exam"
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
                >
                  시험 정보 보기
                </Link>
                <Link
                  href="#study"
                  className="px-8 py-4 bg-blue-500/30 backdrop-blur text-white rounded-xl font-bold hover:bg-blue-500/50 transition-all border border-white/30"
                >
                  학습 시작하기
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <div className="text-8xl mb-4 text-center">🖥️</div>
                  <div className="text-center">
                    <p className="text-blue-200 text-sm">한국산업인력공단</p>
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
            { icon: '📝', label: '필기', value: '4과목 80문항', sub: '2시간' },
            { icon: '💻', label: '실기', value: '컴퓨터 작업형', sub: '2시간 30분' },
            { icon: '📈', label: '합격률', value: '필기 45%', sub: '실기 35%' },
            { icon: '💰', label: '응시료', value: '필기 19,400원', sub: '실기 20,800원' }
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
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'}`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
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
                <p>사무자동화산업기사는 OA 시스템의 기획, 구축, 운영 및 관리 업무를 수행할 수 있는 능력을 평가하는 국가기술자격입니다.</p>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="font-medium text-blue-800">💡 취득 시 혜택</p>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• 공무원 채용 시 가산점</li>
                    <li>• IT 관련 기업 취업 우대</li>
                    <li>• 사무자동화기사 응시자격 부여</li>
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
                  <span className="font-bold text-blue-600">정기시험 (연 3회)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">응시 자격</span>
                  <span className="font-bold">관련 학력/경력 필요</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">합격 기준</span>
                  <span className="font-bold">과목당 40점, 평균 60점</span>
                </div>
                <a
                  href="https://www.q-net.or.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center p-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition mt-4"
                >
                  Q-Net 바로가기 →
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📝</span> 필기시험 (4과목)
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
                      <span className="text-blue-600 font-medium text-sm group-hover:translate-x-1 transition">
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
                      <span className="text-orange-600 font-medium text-sm group-hover:translate-x-1 transition">
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
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <p className="font-bold text-blue-800 mb-2">🎯 초보자 (3개월 과정)</p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 1개월: 사무자동화시스템 + 프로그래밍</li>
                    <li>• 2개월: 사무경영관리 + 정보통신</li>
                    <li>• 3개월: 실기 + 기출문제 풀이</li>
                  </ul>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
                  <p className="font-bold text-purple-800 mb-2">⚡ IT 경험자 (2개월 과정)</p>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• 1개월: 필기 4과목 집중</li>
                    <li>• 2개월: 실기 + 기출문제</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💡 합격 포인트</h3>
              <div className="space-y-3">
                {[
                  { icon: '📊', title: '필기 40% : 실기 60%', desc: '실기 비중 높게 학습' },
                  { icon: '💾', title: '엑셀/액세스 필수', desc: '실기 핵심 프로그램' },
                  { icon: '📝', title: '기출문제 반복', desc: '최근 5년 기출 필수' },
                  { icon: '⏰', title: '시간 관리', desc: '실기 2시간 30분 배분' }
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
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...subjects, ...practicalSubjects].map((subject, idx) => (
            <Link
              key={idx}
              href={subject.href}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className={`h-24 bg-gradient-to-r ${subject.color} flex items-center justify-center`}>
                <span className="text-4xl group-hover:scale-110 transition">{subject.icon}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1 text-sm">{subject.title}</h3>
                <p className="text-gray-500 text-xs mb-2">{subject.desc}</p>
                <span className="text-blue-600 font-medium text-xs group-hover:translate-x-1 transition inline-block">
                  학습 →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">사무자동화산업기사 - OA 전문가 양성 자격증</p>
        </div>
      </footer>
    </div>
  );
}
