'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CustomsBrokerExamPage() {
  const [activeTab, setActiveTab] = useState<'first' | 'second'>('first');

  const firstExamSubjects = [
    {
      id: 'customs-law',
      name: '관세법개론',
      questions: 40,
      time: 60,
      difficulty: '상',
      passRate: '55%',
      topics: [
        '관세법 총칙',
        '수출입통관',
        '관세의 부과와 징수',
        '세율과 품목분류',
        '관세감면',
        '관세환급',
        '보세구역',
        'FTA특례법',
      ],
      tips: '관세법 조문과 통관절차를 정확히 숙지하세요. 품목분류와 세율적용이 핵심입니다.',
    },
    {
      id: 'trade-english',
      name: '무역영어',
      questions: 40,
      time: 60,
      difficulty: '중상',
      passRate: '60%',
      topics: [
        '무역계약의 기초',
        '정형무역조건(Incoterms)',
        '신용장(L/C)',
        '선하증권(B/L)',
        '해상보험',
        '무역클레임',
        '무역서식 해석',
        '무역실무 영문',
      ],
      tips: 'Incoterms 2020과 UCP 600을 완벽히 암기하고, 무역서류 해석 연습을 집중하세요.',
    },
    {
      id: 'consumption-tax',
      name: '내국소비세법',
      questions: 40,
      time: 60,
      difficulty: '중상',
      passRate: '62%',
      topics: [
        '부가가치세법',
        '개별소비세법',
        '주세법',
        '교통·에너지·환경세법',
        '인지세법',
        '증권거래세법',
        '수입물품 과세',
        '환급 및 면세',
      ],
      tips: '부가가치세법이 60% 이상 출제됩니다. 수입 시 과세특례를 집중 학습하세요.',
    },
    {
      id: 'accounting',
      name: '회계학',
      questions: 40,
      time: 60,
      difficulty: '중',
      passRate: '65%',
      topics: [
        '재무회계의 기초',
        '자산회계',
        '부채와 자본',
        '수익과 비용',
        '재무제표 분석',
        '원가회계 기초',
        '관리회계 기초',
        '무역회계',
      ],
      tips: '재무회계 기초와 재무제표 분석이 핵심입니다. 계산문제 유형을 충분히 연습하세요.',
    },
  ];

  const secondExamSubjects = [
    {
      name: '관세법',
      time: 120,
      topics: [
        { name: '관세법 총론', weight: '20%', detail: '관세의 의의, 과세요건, 납세의무' },
        { name: '수출입통관', weight: '30%', detail: '수입·수출 신고, 보세운송, 통관절차' },
        { name: '관세의 부과징수', weight: '25%', detail: '과세표준, 세율, 경정청구' },
        { name: '관세감면·환급', weight: '25%', detail: '감면요건, 환급절차, 사후관리' },
      ],
    },
    {
      name: '관세율표 및 상품학',
      time: 120,
      topics: [
        { name: 'HS 품목분류', weight: '40%', detail: '품목분류 원칙, 류·호·소호 해석' },
        { name: '관세율표 해설', weight: '25%', detail: '각류 해설, 용어정의' },
        { name: '품목분류 실무', weight: '20%', detail: '분류사례, 사전심사' },
        { name: '상품학 기초', weight: '15%', detail: '원산지, 성분분석, 상품특성' },
      ],
    },
    {
      name: '관세평가',
      time: 90,
      topics: [
        { name: '과세가격 결정원칙', weight: '35%', detail: '거래가격 원칙, 가산요소, 공제요소' },
        { name: '대체평가방법', weight: '25%', detail: '동종·유사물품, 공제법, 산정법' },
        { name: '특수관계 평가', weight: '20%', detail: '특수관계 영향, 시가조정' },
        { name: '평가실무', weight: '20%', detail: '신고가격 검증, 심사사례' },
      ],
    },
    {
      name: '무역실무',
      time: 90,
      topics: [
        { name: '무역계약', weight: '25%', detail: '계약체결, 이행, 분쟁해결' },
        { name: '대외무역법', weight: '25%', detail: '수출입공고, 원산지규정' },
        { name: '외국환거래', weight: '25%', detail: '결제방식, 환위험관리' },
        { name: '운송·보험', weight: '25%', detail: '해상운송, 적하보험, 클레임' },
      ],
    },
  ];

  const examTrends = [
    { topic: 'HS 품목분류', frequency: '매회 출제', importance: '최상' },
    { topic: '과세가격 결정', frequency: '매회 출제', importance: '최상' },
    { topic: '수입통관 절차', frequency: '매회 출제', importance: '상' },
    { topic: 'Incoterms 조건', frequency: '매회 출제', importance: '상' },
    { topic: 'FTA 원산지 특례', frequency: '2회 중 1회', importance: '상' },
    { topic: '신용장 해석', frequency: '2회 중 1회', importance: '중' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category" className="text-gray-500 hover:text-gray-700">자격증</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/customs-broker" className="text-gray-500 hover:text-gray-700">관세사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sky-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📋 관세사 시험 상세정보</h1>
          <p className="text-gray-600">1차 객관식(160문항/240분) + 2차 논술형(4과목/420분)</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('first')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'first'
                ? 'bg-sky-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border'
            }`}
          >
            1차 시험 (객관식)
          </button>
          <button
            onClick={() => setActiveTab('second')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'second'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border'
            }`}
          >
            2차 시험 (논술형)
          </button>
        </div>

        {/* 1차 시험 Content */}
        {activeTab === 'first' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📝 1차 시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-sky-50 rounded-lg">
                  <div className="text-2xl font-bold text-sky-600">4과목</div>
                  <div className="text-sm text-gray-600">시험 과목수</div>
                </div>
                <div className="text-center p-4 bg-sky-50 rounded-lg">
                  <div className="text-2xl font-bold text-sky-600">160문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="text-center p-4 bg-sky-50 rounded-lg">
                  <div className="text-2xl font-bold text-sky-600">240분</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
                <div className="text-center p-4 bg-sky-50 rounded-lg">
                  <div className="text-2xl font-bold text-sky-600">60점</div>
                  <div className="text-sm text-gray-600">합격 기준 (평균)</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ 과락 기준:</strong> 매 과목 40점 미만 시 과락 (영어 과목 제외)
                </p>
              </div>
            </section>

            {/* Subject Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">📚 과목별 상세</h2>
              {firstExamSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{index + 1}. {subject.name}</h3>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-gray-500">{subject.questions}문항</span>
                        <span className="text-gray-500">{subject.time}분</span>
                        <span className="text-sky-600">난이도: {subject.difficulty}</span>
                        <span className="text-blue-600">평균합격률: {subject.passRate}</span>
                      </div>
                    </div>
                    <Link
                      href={`/category/accounting/customs-broker/study/${subject.id}`}
                      className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition text-sm"
                    >
                      학습하기
                    </Link>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">주요 출제 토픽</h4>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-sky-50 rounded-lg">
                    <p className="text-sm text-sky-800">💡 <strong>학습 팁:</strong> {subject.tips}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* 1차 합격 전략 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 1차 시험 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-sky-600 mb-3">✅ 과목별 전략</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• <strong>관세법개론:</strong> 조문 암기와 통관절차 이해 필수</li>
                    <li>• <strong>무역영어:</strong> Incoterms, UCP 600 완벽 숙지</li>
                    <li>• <strong>내국소비세법:</strong> 부가세 수입과세 집중</li>
                    <li>• <strong>회계학:</strong> 재무제표 분석과 계산문제 연습</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-blue-600 mb-3">📊 시간 배분</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 과목당 60분 (문항당 1.5분)</li>
                    <li>• 쉬운 문제 먼저 풀고 어려운 문제 후순위</li>
                    <li>• 계산문제는 검산 시간 확보</li>
                    <li>• 마지막 10분은 OMR 확인</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2차 시험 Content */}
        {activeTab === 'second' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">✍️ 2차 시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">4과목</div>
                  <div className="text-sm text-gray-600">시험 과목수</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">논술형</div>
                  <div className="text-sm text-gray-600">시험 유형</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">420분</div>
                  <div className="text-sm text-gray-600">총 시험 시간</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">60점</div>
                  <div className="text-sm text-gray-600">합격 기준 (평균)</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ 과락 기준:</strong> 매 과목 40점 미만 시 과락
                </p>
              </div>
            </section>

            {/* 2차 Subject Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">📚 과목별 상세</h2>
              {secondExamSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{subject.name}</h3>
                      <span className="text-blue-600">{subject.time}분</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {subject.topics.map((topic, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-900">{topic.name}</span>
                          <p className="text-sm text-gray-500 mt-1">{topic.detail}</p>
                        </div>
                        <span className="text-blue-600 font-medium">{topic.weight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* 출제 경향 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📊 최근 출제 경향</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">출제 토픽</th>
                      <th className="text-left py-3 px-4">출제 빈도</th>
                      <th className="text-left py-3 px-4">중요도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examTrends.map((trend, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{trend.topic}</td>
                        <td className="py-3 px-4 text-gray-600">{trend.frequency}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm ${
                            trend.importance === '최상' ? 'bg-red-100 text-red-700' :
                            trend.importance === '상' ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {trend.importance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 2차 합격 전략 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 2차 시험 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-blue-600 mb-3">✅ 답안 작성 요령</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 논점별 소제목 명시</li>
                    <li>• 관세법 조문 번호 정확히 기재</li>
                    <li>• HS코드 분류근거 상세히 서술</li>
                    <li>• 결론을 먼저 쓰고 근거 전개</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-sky-600 mb-3">📝 실전 대비</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 실제 시험 시간에 맞춰 모의고사</li>
                    <li>• 기출문제 답안 작성 연습</li>
                    <li>• 관세율표 활용법 숙지</li>
                    <li>• HS해설서 주요 분류 암기</li>
                  </ul>
                </div>
              </div>
            </section>

            <Link
              href="/category/accounting/customs-broker/study/customs-advanced"
              className="block w-full py-4 bg-gradient-to-r from-sky-600 to-blue-500 text-white text-center rounded-xl font-bold hover:from-sky-700 hover:to-blue-600 transition shadow-lg"
            >
              2차 시험 심화학습 시작 →
            </Link>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t">
          <Link href="/category/accounting/customs-broker" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 관세사 메인으로
          </Link>
          <Link href="/category/accounting/customs-broker/study/customs-law" className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
            학습 시작하기 →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2026 자격증 가이드. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
