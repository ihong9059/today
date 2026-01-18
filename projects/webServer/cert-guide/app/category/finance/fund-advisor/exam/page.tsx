'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FundAdvisorExamPage() {
  const [activeSection, setActiveSection] = useState('structure');

  const sections = [
    { id: 'structure', label: '시험구조', icon: '📋' },
    { id: 'subjects', label: '과목상세', icon: '📚' },
    { id: 'tips', label: '합격전략', icon: '🎯' },
  ];

  const subjectDetails = [
    {
      name: '펀드일반',
      icon: '📊',
      questions: 30,
      topics: [
        '펀드의 정의와 특성',
        '펀드의 종류 (주식형, 채권형, 혼합형, MMF 등)',
        '펀드의 구조와 관계자',
        '펀드 운용전략 (액티브, 패시브)',
        '펀드 성과평가 지표',
        '펀드 비용 (보수, 수수료)',
        '펀드 환매와 분배',
        'ETF와 인덱스펀드',
        '해외펀드와 재간접펀드',
        '연금펀드와 TDF',
      ],
    },
    {
      name: '투자권유',
      icon: '🤝',
      questions: 30,
      topics: [
        '투자권유의 개념과 절차',
        '적합성 원칙',
        '적정성 원칙',
        '설명의무',
        '투자자 유형 분류',
        '투자성향 분석',
        '포트폴리오 구성',
        '투자권유 불원제도',
        '부당권유 금지',
        '금융소비자보호',
      ],
    },
    {
      name: '직무윤리 및 법규',
      icon: '⚖️',
      questions: 20,
      topics: [
        '자본시장법 개요',
        '금융투자업 인가·등록',
        '영업행위 규제',
        '불공정거래 규제',
        '펀드 관련 규정',
        '금융투자협회 규정',
        '직무윤리 강령',
        '이해상충 방지',
      ],
    },
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
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance" className="text-gray-600 hover:text-teal-600">금융</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance/fund-advisor" className="text-gray-600 hover:text-teal-600">펀드투자권유자문인력</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">📝</div>
            <div>
              <h1 className="text-2xl font-bold">펀드투자권유자문인력 시험정보</h1>
              <p className="text-teal-100">시험 구조, 과목별 상세 내용, 합격 전략</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 font-medium border-b-2 transition flex items-center gap-2 ${
                  activeSection === section.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Structure Section */}
        {activeSection === 'structure' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📝</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">시험 형식</h3>
                <p className="text-2xl font-bold text-teal-600">CBT</p>
                <p className="text-sm text-gray-500">컴퓨터 기반 시험</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⏱️</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">시험 시간</h3>
                <p className="text-2xl font-bold text-cyan-600">80분</p>
                <p className="text-sm text-gray-500">1문항당 1분</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">합격 기준</h3>
                <p className="text-2xl font-bold text-teal-600">70점</p>
                <p className="text-sm text-gray-500">100점 만점 기준</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-lg font-bold text-gray-800 mb-4">시험 구성</h2>
              <div className="space-y-4">
                {subjectDetails.map((subject, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.topics.length}개 주제</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-teal-600">{subject.questions}</p>
                      <p className="text-xs text-gray-500">문항</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-teal-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-teal-800">총계</span>
                  <span className="text-xl font-bold text-teal-600">80문항 / 100점</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-2">⚠️ 시험 주의사항</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• 신분증 미지참 시 시험 응시 불가</li>
                <li>• 시험 시작 30분 후부터 퇴실 가능</li>
                <li>• CBT 특성상 문제 순서가 무작위로 출제됨</li>
                <li>• 답안 제출 후 수정 불가</li>
              </ul>
            </div>
          </div>
        )}

        {/* Subjects Section */}
        {activeSection === 'subjects' && (
          <div className="space-y-6">
            {subjectDetails.map((subject, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{subject.icon}</span>
                      <div>
                        <h2 className="text-xl font-bold text-white">{subject.name}</h2>
                        <p className="text-teal-100">{subject.questions}문항 출제</p>
                      </div>
                    </div>
                    <Link
                      href={`/category/finance/fund-advisor/study/${subject.name === '펀드일반' ? 'fund-basics' : subject.name === '투자권유' ? 'investment-recommendation' : 'fund-law-ethics'}`}
                      className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
                    >
                      학습하기 →
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 mb-3">출제 범위</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {subject.topics.map((topic, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-medium">
                          {tIdx + 1}
                        </span>
                        <span className="text-sm text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips Section */}
        {activeSection === 'tips' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-lg font-bold text-gray-800 mb-4">📊 과목별 학습 전략</h2>
              <div className="space-y-4">
                <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                  <h3 className="font-bold text-teal-800">펀드일반 (30문항)</h3>
                  <p className="text-sm text-teal-700 mt-1">
                    펀드의 종류와 특성을 정확히 구분하는 것이 핵심입니다.
                    특히 ETF, MMF, 재간접펀드 등 특수펀드의 특성과 주식형/채권형/혼합형의 차이점을 명확히 이해하세요.
                  </p>
                </div>
                <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
                  <h3 className="font-bold text-cyan-800">투자권유 (30문항)</h3>
                  <p className="text-sm text-cyan-700 mt-1">
                    적합성·적정성 원칙과 설명의무의 차이를 확실히 구분해야 합니다.
                    투자자 유형별(일반/전문) 적용 규정이 다르므로 이 부분을 집중 학습하세요.
                  </p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                  <h3 className="font-bold text-indigo-800">직무윤리 및 법규 (20문항)</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    자본시장법의 핵심 조문과 용어 정의를 암기하세요.
                    불공정거래 유형(내부자거래, 시세조종, 부정거래)의 구성요건을 정확히 이해하는 것이 중요합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-lg font-bold text-gray-800 mb-4">⏰ 추천 학습 일정 (4주)</h2>
              <div className="space-y-4">
                {[
                  { week: '1주차', content: '펀드일반 - 펀드 개념, 종류, 구조', hours: '15시간' },
                  { week: '2주차', content: '펀드일반 완료 + 투자권유 기초', hours: '15시간' },
                  { week: '3주차', content: '투자권유 완료 + 직무윤리 및 법규', hours: '15시간' },
                  { week: '4주차', content: '기출문제 풀이 + 오답정리', hours: '20시간' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">
                      {item.week}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.content}</p>
                      <p className="text-sm text-gray-500">권장 학습시간: {item.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white">
              <h2 className="text-lg font-bold mb-4">🎯 최종 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">기출문제 반복</h3>
                  <p className="text-sm text-teal-100">최근 3개년 기출문제를 최소 3회 이상 풀어보세요. 출제 패턴이 유사합니다.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">오답노트 필수</h3>
                  <p className="text-sm text-teal-100">틀린 문제는 반드시 정리하고, 왜 틀렸는지 개념을 다시 확인하세요.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">시간 관리</h3>
                  <p className="text-sm text-teal-100">1문항 1분 원칙. 모르는 문제는 표시 후 넘어가고 나중에 풀이하세요.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">컨디션 관리</h3>
                  <p className="text-sm text-teal-100">시험 전날 충분히 휴식하고, 당일 여유있게 시험장에 도착하세요.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link href="/category/finance/fund-advisor" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 메인으로
          </Link>
          <Link href="/category/finance/fund-advisor/study/fund-basics" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
            학습 시작하기 →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. 펀드투자권유자문인력 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
