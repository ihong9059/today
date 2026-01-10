'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ElectricalWorkEngineerExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: '전기응용',
      questions: 20,
      time: 30,
      passRate: 42,
      difficulty: 4,
      topics: [
        { name: '조명공학', desc: '조도계산, 광원특성, 조명설계', weight: 30 },
        { name: '전열공학', desc: '열전달, 전기가열, 열량계산', weight: 25 },
        { name: '전기화학', desc: '전해, 도금, 전지', weight: 20 },
        { name: '전동력응용', desc: '전동기선정, 기동법, 속도제어', weight: 25 },
      ],
      tips: '조명계산 공식과 광원특성 암기 필수',
      href: '/category/mechanical/electrical-work-engineer/study/electrical-application',
    },
    {
      name: '전기설비기술기준',
      questions: 20,
      time: 30,
      passRate: 38,
      difficulty: 5,
      topics: [
        { name: '총칙 및 정의', desc: '용어정의, 적용범위', weight: 15 },
        { name: '저압/고압 시설', desc: '전압별 시설기준', weight: 30 },
        { name: '접지설비', desc: '접지종류, 접지저항', weight: 25 },
        { name: '배선공사', desc: '공사방법별 기준', weight: 30 },
      ],
      tips: 'KEC 개정내용 반드시 확인',
      href: '/category/mechanical/electrical-work-engineer/study/electrical-equipment',
    },
    {
      name: '전기기기',
      questions: 20,
      time: 30,
      passRate: 45,
      difficulty: 4,
      topics: [
        { name: '변압기', desc: '원리, 등가회로, 효율', weight: 30 },
        { name: '유도기', desc: '유도전동기 원리, 특성', weight: 30 },
        { name: '동기기', desc: '동기발전기, 동기전동기', weight: 20 },
        { name: '직류기', desc: '직류전동기, 발전기', weight: 20 },
      ],
      tips: '등가회로와 특성곡선 이해 중요',
      href: '/category/mechanical/electrical-work-engineer/study/electrical-machine',
    },
    {
      name: '배전설비',
      questions: 20,
      time: 30,
      passRate: 48,
      difficulty: 3,
      topics: [
        { name: '배전계통', desc: '배전방식, 전압강하', weight: 25 },
        { name: '배전선로', desc: '가공/지중 배전선', weight: 25 },
        { name: '보호장치', desc: '개폐기, 퓨즈, 계전기', weight: 25 },
        { name: '배전자동화', desc: 'SCADA, 원격제어', weight: 25 },
      ],
      tips: '전압강하 계산문제 자주 출제',
      href: '/category/mechanical/electrical-work-engineer/study/distribution-equipment',
    },
  ];

  const practicalAreas = [
    {
      name: '공사계획 수립',
      weight: 20,
      items: ['공사비 산출', '공정표 작성', '자재명세서'],
      frequency: '매회',
    },
    {
      name: '배선공사',
      weight: 30,
      items: ['배선도면 해석', '전선 굵기 선정', '배관공사'],
      frequency: '매회',
    },
    {
      name: '기기설치공사',
      weight: 25,
      items: ['수변전설비', '조명설비', '동력설비'],
      frequency: '자주',
    },
    {
      name: '시운전 및 검사',
      weight: 25,
      items: ['절연저항 측정', '접지저항 측정', '보호계전기 시험'],
      frequency: '매회',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-amber-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-amber-600">기계·전기</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/electrical-work-engineer" className="text-gray-600 hover:text-amber-600">전기공사기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-amber-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/mechanical/electrical-work-engineer" className="text-amber-100 hover:text-white mb-2 inline-block">
            ← 전기공사기사
          </Link>
          <h1 className="text-3xl font-bold">시험 상세 정보</h1>
          <p className="text-amber-100 mt-2">필기/실기 시험 과목별 출제 범위와 합격 전략</p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('written')}
              className={`py-4 px-2 border-b-2 font-medium transition ${activeTab === 'written' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`py-4 px-2 border-b-2 font-medium transition ${activeTab === 'practical' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              🔧 실기시험
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'written' ? (
          <div className="space-y-8">
            {/* Written Overview */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 필기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">과목수</p>
                  <p className="text-2xl font-bold text-amber-600">4과목</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">문항수</p>
                  <p className="text-2xl font-bold text-amber-600">80문항</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">시험시간</p>
                  <p className="text-2xl font-bold text-amber-600">2시간</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">합격기준</p>
                  <p className="text-2xl font-bold text-amber-600">60점 이상</p>
                  <p className="text-xs text-gray-500">과목당 40점 이상</p>
                </div>
              </div>
            </section>

            {/* Subject Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">📚 과목별 상세</h2>
              {writtenSubjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">{idx + 1}과목: {subject.name}</h3>
                        <p className="text-amber-100 text-sm">{subject.questions}문항 / {subject.time}분</p>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <span key={s} className={s <= subject.difficulty ? 'text-yellow-300' : 'text-white/30'}>★</span>
                          ))}
                        </div>
                        <p className="text-xs text-amber-100">합격률 {subject.passRate}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {subject.topics.map((topic, i) => (
                        <div key={i} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-800">{topic.name}</span>
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">{topic.weight}%</span>
                          </div>
                          <p className="text-sm text-gray-500">{topic.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <p className="text-sm text-amber-600">💡 {subject.tips}</p>
                      <Link href={subject.href} className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-600 transition">
                        학습하기 →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Written Strategy */}
            <section className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h2 className="text-xl font-bold text-amber-800 mb-4">🎯 필기 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">📌 핵심 포인트</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 전기설비기술기준 KEC 개정 내용 필수</li>
                    <li>• 조명계산 공식 완벽 암기</li>
                    <li>• 배전설비 전압강하 계산 반복</li>
                    <li>• 전기기기 등가회로 이해</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">⏰ 시간 배분</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 1과목: 25분 (쉬운 문제 먼저)</li>
                    <li>• 2과목: 30분 (기준 암기 필요)</li>
                    <li>• 3과목: 25분 (계산문제 주의)</li>
                    <li>• 4과목: 25분 (개념문제 위주)</li>
                    <li>• 검토: 15분</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Practical Overview */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 실기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">시험유형</p>
                  <p className="text-xl font-bold text-amber-600">필답형+작업형</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">시험시간</p>
                  <p className="text-2xl font-bold text-amber-600">약 4시간</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">합격기준</p>
                  <p className="text-2xl font-bold text-amber-600">60점 이상</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">합격률</p>
                  <p className="text-2xl font-bold text-amber-600">약 45%</p>
                </div>
              </div>
            </section>

            {/* Practical Areas */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 영역별 상세</h2>
              <div className="space-y-4">
                {practicalAreas.map((area, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-800">{area.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded ${area.frequency === '매회' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {area.frequency} 출제
                        </span>
                        <span className="font-bold text-amber-600">{area.weight}%</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-full h-2 mb-3">
                      <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-2 rounded-full" style={{ width: `${area.weight}%` }} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {area.items.map((item, i) => (
                        <span key={i} className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Practical Tips */}
            <section className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h2 className="text-xl font-bold text-amber-800 mb-4">🎯 실기 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">📌 필답형 대비</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 공사비 산출 공식 암기</li>
                    <li>• 전선굵기 선정표 숙지</li>
                    <li>• 접지저항 계산문제 연습</li>
                    <li>• 조도계산 반복 연습</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">🔧 작업형 대비</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 배선도면 해석 능력</li>
                    <li>• 결선 작업 실습</li>
                    <li>• 측정기기 사용법</li>
                    <li>• 시험성적서 작성법</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Study Link */}
            <section className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">실기 대비 학습</h3>
              <p className="text-amber-100 mb-4">실기시험 핵심 문제와 해설</p>
              <Link href="/category/mechanical/electrical-work-engineer/study/practical" className="inline-block bg-white text-amber-600 px-6 py-3 rounded-lg font-bold hover:bg-amber-50 transition">
                실기 학습하기 →
              </Link>
            </section>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
