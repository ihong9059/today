'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DerivativesAdvisorExamPage() {
  const [activeSection, setActiveSection] = useState('structure');

  const sections = [
    { id: 'structure', label: '시험구조', icon: '📋' },
    { id: 'subjects', label: '과목상세', icon: '📚' },
    { id: 'tips', label: '합격전략', icon: '🎯' },
  ];

  const subjectDetails = [
    {
      name: '파생상품 I',
      icon: '📊',
      questions: 40,
      topics: [
        '선물(Futures)의 개념과 특성',
        '선물 가격결정 이론',
        '옵션(Options)의 종류와 특성',
        '옵션 가격결정 모형(BS, 이항모형)',
        '그릭스(Delta, Gamma, Theta, Vega)',
        '선물·옵션 거래전략',
        '헤지전략',
        '스프레드 전략',
        '차익거래',
        '변동성 거래',
      ],
    },
    {
      name: '파생상품 II',
      icon: '📈',
      questions: 20,
      topics: [
        '금리스왑(IRS)',
        '통화스왑(CRS)',
        '신용파생상품(CDS)',
        '구조화상품(ELS, DLS)',
        '장외파생상품 시장',
        '증거금 제도',
      ],
    },
    {
      name: '직무윤리 및 법규',
      icon: '⚖️',
      questions: 20,
      topics: [
        '자본시장법상 파생상품 규제',
        '파생상품 영업행위 규제',
        '적합성·적정성 원칙',
        '설명의무 강화',
        '불공정거래 규제',
        '직무윤리',
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
            <Link href="/" className="text-gray-600 hover:text-purple-600">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance" className="text-gray-600 hover:text-purple-600">금융</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance/derivatives-advisor" className="text-gray-600 hover:text-purple-600">파생상품투자권유자문인력</Link>
            <span className="text-gray-300">/</span>
            <span className="text-purple-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-violet-500 text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">📝</div>
            <div>
              <h1 className="text-2xl font-bold">파생상품투자권유자문인력 시험정보</h1>
              <p className="text-purple-100">시험 구조, 과목별 상세 내용, 합격 전략</p>
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
                    ? 'border-purple-500 text-purple-600'
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
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📝</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">시험 형식</h3>
                <p className="text-2xl font-bold text-purple-600">CBT</p>
                <p className="text-sm text-gray-500">컴퓨터 기반 시험</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border text-center">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⏱️</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">시험 시간</h3>
                <p className="text-2xl font-bold text-violet-600">80분</p>
                <p className="text-sm text-gray-500">1문항당 1분</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">합격 기준</h3>
                <p className="text-2xl font-bold text-purple-600">70점</p>
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
                      <p className="text-xl font-bold text-purple-600">{subject.questions}</p>
                      <p className="text-xs text-gray-500">문항</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-purple-800">총계</span>
                  <span className="text-xl font-bold text-purple-600">80문항 / 100점</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-2">⚠️ 시험 주의사항</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• 계산문제 비중이 높으므로 계산기 사용법 숙지 필수</li>
                <li>• 공학용 계산기 사용 가능 (프로그래밍 기능 제외)</li>
                <li>• 손익도 그리기 문제가 자주 출제됨</li>
                <li>• CBT 특성상 문제 순서가 무작위로 출제됨</li>
              </ul>
            </div>
          </div>
        )}

        {/* Subjects Section */}
        {activeSection === 'subjects' && (
          <div className="space-y-6">
            {subjectDetails.map((subject, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{subject.icon}</span>
                      <div>
                        <h2 className="text-xl font-bold text-white">{subject.name}</h2>
                        <p className="text-purple-100">{subject.questions}문항 출제</p>
                      </div>
                    </div>
                    <Link
                      href={`/category/finance/derivatives-advisor/study/${subject.name === '파생상품 I' ? 'derivatives-1' : subject.name === '파생상품 II' ? 'derivatives-2' : 'derivatives-law-ethics'}`}
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
                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-medium">
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
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h3 className="font-bold text-purple-800">파생상품 I (40문항) - 핵심 과목</h3>
                  <p className="text-sm text-purple-700 mt-1">
                    선물·옵션의 가격결정 이론이 핵심입니다. Black-Scholes 공식과 이항모형의 계산을 반복 연습하고,
                    그릭스의 의미와 활용을 완벽히 이해해야 합니다. 손익도 그리기 연습은 필수입니다.
                  </p>
                </div>
                <div className="p-4 bg-violet-50 rounded-lg border-l-4 border-violet-500">
                  <h3 className="font-bold text-violet-800">파생상품 II (20문항)</h3>
                  <p className="text-sm text-violet-700 mt-1">
                    스왑(IRS, CRS)의 구조와 가격결정을 이해하고, 신용파생상품(CDS)의 개념을 숙지하세요.
                    장외파생상품의 특성과 거래 방식, 증거금 제도도 중요합니다.
                  </p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                  <h3 className="font-bold text-indigo-800">직무윤리 및 법규 (20문항)</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    파생상품 특화 규제(레버리지 규제, 투자자 보호 강화)를 중점 학습하세요.
                    일반 금융자격과 다른 파생상품 고유의 적합성 기준을 이해해야 합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <h2 className="text-lg font-bold text-gray-800 mb-4">📝 핵심 계산 공식</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">선물 가격</h3>
                  <p className="font-mono text-sm text-purple-600">F = S × e^(r-d)T</p>
                  <p className="text-xs text-gray-500 mt-1">S: 현물가격, r: 무위험이자율, d: 배당수익률, T: 만기</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">풋-콜 패리티</h3>
                  <p className="font-mono text-sm text-purple-600">C - P = S - K×e^(-rT)</p>
                  <p className="text-xs text-gray-500 mt-1">C: 콜옵션, P: 풋옵션, S: 현물, K: 행사가</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">델타 (Delta)</h3>
                  <p className="font-mono text-sm text-purple-600">Δ = ∂V/∂S</p>
                  <p className="text-xs text-gray-500 mt-1">기초자산 가격 변화에 대한 옵션가격 민감도</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">감마 (Gamma)</h3>
                  <p className="font-mono text-sm text-purple-600">Γ = ∂²V/∂S²</p>
                  <p className="text-xs text-gray-500 mt-1">델타의 변화율 (델타 헤지 조정 빈도)</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl p-6 text-white">
              <h2 className="text-lg font-bold mb-4">🎯 최종 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">계산 연습 필수</h3>
                  <p className="text-sm text-purple-100">선물가격, 옵션프리미엄, 그릭스 계산을 반복 연습하세요.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">손익도 마스터</h3>
                  <p className="text-sm text-purple-100">각종 전략(스트래들, 스프레드 등)의 손익도를 그릴 수 있어야 합니다.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">기출문제 분석</h3>
                  <p className="text-sm text-purple-100">계산문제 유형을 파악하고 풀이 시간을 단축하세요.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-2">시간 배분</h3>
                  <p className="text-sm text-purple-100">계산문제는 시간이 오래 걸리므로 쉬운 문제부터 풀이하세요.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link href="/category/finance/derivatives-advisor" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 메인으로
          </Link>
          <Link href="/category/finance/derivatives-advisor/study/derivatives-1" className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            학습 시작하기 →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. 파생상품투자권유자문인력 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
