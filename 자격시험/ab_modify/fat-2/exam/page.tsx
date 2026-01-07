'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FAT2ExamPage() {
  const [activeTab, setActiveTab] = useState<'theory' | 'practical'>('theory');

  const theorySubjects = [
    {
      name: '회계기초',
      questions: 25,
      time: '30분',
      difficulty: '★★☆☆☆',
      topics: ['회계의 정의', '재무제표 개요', '회계등식', '자산의 개념', '부채의 개념', '자본의 개념', '수익과 비용', '재무상태표 구조'],
      tips: '회계등식(자산=부채+자본)을 확실히 이해하세요.',
      link: '/category/accounting/fat-2/study/accounting-basics'
    },
    {
      name: '부기입문',
      questions: 25,
      time: '30분',
      difficulty: '★★☆☆☆',
      topics: ['계정과목', '차변과 대변', '분개의 원리', '전기', '시산표', '총계정원장', '보조장부', '결산 기초'],
      tips: '분개 연습을 많이 하고 계정과목을 암기하세요.',
      link: '/category/accounting/fat-2/study/bookkeeping'
    },
  ];

  const practicalAreas = [
    { name: '기초정보등록', percent: 20, desc: '회사, 거래처, 계정과목', items: ['회사정보 등록', '거래처 등록', '계정과목 설정', '기초잔액 입력'] },
    { name: '전표입력', percent: 40, desc: '일반전표 입력', items: ['출금전표 입력', '입금전표 입력', '대체전표 입력', '전표 수정/삭제'] },
    { name: '장부조회', percent: 25, desc: '장부 확인 및 출력', items: ['총계정원장', '일계표', '거래처원장', '계정별원장'] },
    { name: '결산기초', percent: 15, desc: '기초 결산처리', items: ['시산표 조회', '재무상태표', '손익계산서', '결산 마감'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/fat-2" className="text-gray-500 hover:text-gray-700">FAT 2급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-cyan-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <section className="bg-gradient-to-r from-cyan-600 to-sky-500 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">FAT 2급 시험 상세</h1>
          <p className="text-cyan-100">이론시험과 실무시험의 상세 정보를 확인하세요.</p>
        </section>

        {/* Tab Navigation */}
        <div className="flex border-b mb-8 bg-white rounded-t-xl">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex-1 py-4 font-medium transition ${activeTab === 'theory' ? 'text-cyan-600 border-b-2 border-cyan-600 bg-cyan-50' : 'text-gray-500 hover:text-gray-700'}`}
          >
            📝 이론시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`flex-1 py-4 font-medium transition ${activeTab === 'practical' ? 'text-cyan-600 border-b-2 border-cyan-600 bg-cyan-50' : 'text-gray-500 hover:text-gray-700'}`}
          >
            💻 실무시험 (더존 Smart A)
          </button>
        </div>

        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📋</span> 이론시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">2과목</div>
                  <div className="text-sm text-gray-600">시험과목</div>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">50문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">60분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">70점</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
              </div>
            </section>

            {/* Subject Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-cyan-500">📚</span> 과목별 상세
              </h2>
              {theorySubjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{idx + 1}. {subject.name}</h3>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">{subject.questions}문항</span>
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm">{subject.time}</span>
                    <span className="text-cyan-500">{subject.difficulty}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">출제 토픽</h4>
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map((topic, tidx) => (
                          <span key={tidx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{topic}</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-4">
                      <h4 className="font-medium text-cyan-800 mb-2">💡 합격 TIP</h4>
                      <p className="text-sm text-cyan-700">{subject.tips}</p>
                    </div>
                  </div>
                  <Link href={subject.link} className="inline-block px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition text-sm font-medium">
                    {subject.name} 학습하기 →
                  </Link>
                </div>
              ))}
            </section>

            {/* Strategy */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">🎯</span> 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">시간 배분 전략</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">회계기초 (25문항)</span>
                      <span className="font-medium">30분</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">부기입문 (25문항)</span>
                      <span className="font-medium">30분</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">학습 우선순위</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <span className="text-gray-700">부기입문 (분개 필수)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <span className="text-gray-700">회계기초 (개념 이해)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <span className="text-gray-700">기출문제 반복</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Practical Tab */}
        {activeTab === 'practical' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">💻</span> 실무시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">더존</div>
                  <div className="text-sm text-gray-600">Smart A</div>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">60분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">70점</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">4영역</div>
                  <div className="text-sm text-gray-600">출제범위</div>
                </div>
              </div>
            </section>

            {/* Area Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-cyan-500">📊</span> 영역별 상세
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {practicalAreas.map((area, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800">{area.name}</h3>
                      <span className="px-3 py-1 bg-cyan-600 text-white rounded-full text-sm font-medium">{area.percent}%</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{area.desc}</p>
                    <div className="space-y-2">
                      {area.items.map((item, iidx) => (
                        <div key={iidx} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Time Management */}
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">⏱️</span> 시간 관리 가이드 (60분)
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-medium text-gray-600">0~10분</div>
                  <div className="flex-1 bg-blue-100 rounded-lg p-3">
                    <span className="font-medium text-blue-800">기초정보등록</span>
                    <span className="text-blue-600 text-sm ml-2">- 회사, 거래처, 계정과목 확인</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-medium text-gray-600">10~35분</div>
                  <div className="flex-1 bg-cyan-100 rounded-lg p-3">
                    <span className="font-medium text-cyan-800">전표입력</span>
                    <span className="text-cyan-600 text-sm ml-2">- 출금/입금/대체전표 입력</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-medium text-gray-600">35~50분</div>
                  <div className="flex-1 bg-sky-100 rounded-lg p-3">
                    <span className="font-medium text-sky-800">장부조회</span>
                    <span className="text-sky-600 text-sm ml-2">- 원장, 일계표 조회</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-medium text-gray-600">50~60분</div>
                  <div className="flex-1 bg-indigo-100 rounded-lg p-3">
                    <span className="font-medium text-indigo-800">결산/검토</span>
                    <span className="text-indigo-600 text-sm ml-2">- 재무제표 확인, 오류 수정</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Tips */}
            <section className="bg-gradient-to-r from-cyan-100 to-sky-100 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>💡</span> 실무 대비 핵심 TIP
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-cyan-800 mb-2">더존 기본 조작</h3>
                  <p className="text-sm text-gray-600">프로그램 실행, 회사 선택, 메뉴 이동을 빠르게 익히세요.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-cyan-800 mb-2">전표 입력 연습</h3>
                  <p className="text-sm text-gray-600">출금/입금/대체전표 입력을 반복 연습하세요.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-cyan-800 mb-2">계정과목 암기</h3>
                  <p className="text-sm text-gray-600">자주 사용하는 계정과목 코드를 외워두면 빠릅니다.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-cyan-800 mb-2">장부조회 숙달</h3>
                  <p className="text-sm text-gray-600">총계정원장, 일계표 조회 방법을 확실히 익히세요.</p>
                </div>
              </div>
              <Link href="/category/accounting/fat-2/study/practical" className="mt-6 block text-center py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition font-medium">
                실무연습 문제 풀러가기 →
              </Link>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. FAT 2급 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
