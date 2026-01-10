'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TaxAccountantExamPage() {
  const [activeTab, setActiveTab] = useState<'first' | 'second'>('first');

  const firstExamSubjects = [
    {
      id: 'fiscal-policy',
      name: '재정학',
      questions: 40,
      time: 60,
      difficulty: '중상',
      passRate: '65%',
      topics: [
        '조세의 기초이론',
        '조세의 전가와 귀착',
        '최적조세론',
        '조세와 효율성',
        '소득세·법인세 이론',
        '공공지출론',
        '재정정책의 효과',
        '지방재정론',
      ],
      tips: '조세론 파트가 60% 이상 출제됩니다. 조세의 전가·귀착과 초과부담 계산문제를 집중 학습하세요.',
    },
    {
      id: 'tax-law-intro',
      name: '세법학개론',
      questions: 40,
      time: 60,
      difficulty: '상',
      passRate: '60%',
      topics: [
        '국세기본법',
        '소득세법 (종합소득, 양도소득)',
        '법인세법 (익금·손금, 세무조정)',
        '부가가치세법',
        '상속세 및 증여세법',
        '조세특례제한법',
        '국세징수법',
        '조세범처벌법',
      ],
      tips: '소득세법과 법인세법이 핵심입니다. 계산문제 유형을 완벽히 숙지하고, 국세기본법은 판례 위주로 학습하세요.',
    },
    {
      id: 'accounting-intro',
      name: '회계학개론',
      questions: 40,
      time: 60,
      difficulty: '중상',
      passRate: '62%',
      topics: [
        '재무회계 기초',
        '금융자산과 금융부채',
        '유형자산과 무형자산',
        '수익인식',
        '리스회계',
        '원가회계 기초',
        '원가배분과 원가계산',
        '관리회계 기초',
      ],
      tips: '재무회계 70%, 원가관리회계 30% 비중입니다. K-IFRS 기준서 내용을 정확히 이해하세요.',
    },
    {
      id: 'commercial-law',
      name: '상법 (선택)',
      questions: 40,
      time: 60,
      difficulty: '중',
      passRate: '68%',
      topics: [
        '회사의 설립',
        '주식과 주주',
        '주주총회',
        '이사와 이사회',
        '감사와 감사위원회',
        '자본금의 변동',
        '회사의 합병·분할',
        '상행위법',
      ],
      tips: '회사법이 80% 이상입니다. 주식회사 관련 조문을 완벽히 숙지하고, 판례 결론을 암기하세요.',
    },
  ];

  const secondExamSubjects = [
    {
      name: '세법학1부',
      time: 120,
      topics: [
        { name: '국세기본법', weight: '15%', detail: '납세의무, 과세관청, 기간과 기한, 국세부과 제척기간' },
        { name: '소득세법', weight: '35%', detail: '종합소득, 퇴직소득, 양도소득 계산구조와 세액계산' },
        { name: '법인세법', weight: '35%', detail: '익금·손금 세무조정, 소득처분, 합병·분할 과세특례' },
        { name: '상속세 및 증여세법', weight: '15%', detail: '과세가액, 공제, 세액계산, 증여추정·의제' },
      ],
    },
    {
      name: '세법학2부',
      time: 120,
      topics: [
        { name: '부가가치세법', weight: '40%', detail: '과세거래, 영세율·면세, 매입세액공제, 간이과세' },
        { name: '개별소비세법', weight: '15%', detail: '과세물품, 세율, 미납세반출' },
        { name: '지방세법', weight: '25%', detail: '취득세, 재산세, 지방소득세' },
        { name: '조세특례제한법', weight: '20%', detail: '중소기업 특례, 연구개발 세액공제' },
      ],
    },
    {
      name: '회계학1부 (재무회계)',
      time: 90,
      topics: [
        { name: '금융상품', weight: '25%', detail: 'FVPL, FVOCI, AC, 손상차손' },
        { name: '유형·무형자산', weight: '20%', detail: '취득원가, 감가상각, 손상, 재평가' },
        { name: '수익인식', weight: '20%', detail: '5단계 모형, 변동대가, 계약변경' },
        { name: '연결·지분법', weight: '35%', detail: '연결재무제표, 지분법, 사업결합' },
      ],
    },
    {
      name: '회계학2부 (원가관리회계)',
      time: 90,
      topics: [
        { name: '원가계산', weight: '30%', detail: '개별원가, 종합원가, 활동기준원가' },
        { name: 'CVP분석', weight: '20%', detail: '손익분기점, 목표이익, 민감도분석' },
        { name: '예산과 성과평가', weight: '25%', detail: '변동예산, 차이분석, BSC' },
        { name: '의사결정', weight: '25%', detail: '관련원가, 특별주문, 제품라인 결정' },
      ],
    },
  ];

  const examTrends = [
    { topic: '소득세 종합소득 계산', frequency: '매회 출제', importance: '최상' },
    { topic: '법인세 세무조정', frequency: '매회 출제', importance: '최상' },
    { topic: '부가가치세 매입세액공제', frequency: '매회 출제', importance: '상' },
    { topic: '연결재무제표', frequency: '2회 중 1회', importance: '상' },
    { topic: '조세의 전가와 귀착', frequency: '매회 출제', importance: '상' },
    { topic: '리스회계', frequency: '2회 중 1회', importance: '중' },
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
            <Link href="/category/accounting/tax-accountant" className="text-gray-500 hover:text-gray-700">세무사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📋 세무사 시험 상세정보</h1>
          <p className="text-gray-600">1차 객관식(160문항/240분) + 2차 논술형(4과목/420분)</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('first')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'first'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border'
            }`}
          >
            1차 시험 (객관식)
          </button>
          <button
            onClick={() => setActiveTab('second')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'second'
                ? 'bg-teal-600 text-white'
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
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">4과목</div>
                  <div className="text-sm text-gray-600">시험 과목수</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">160문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">240분</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">60점</div>
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
                        <span className="text-emerald-600">난이도: {subject.difficulty}</span>
                        <span className="text-blue-600">평균합격률: {subject.passRate}</span>
                      </div>
                    </div>
                    <Link
                      href={`/category/accounting/tax-accountant/study/${subject.id}`}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm"
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
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <p className="text-sm text-emerald-800">💡 <strong>학습 팁:</strong> {subject.tips}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* 1차 합격 전략 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 1차 시험 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-emerald-600 mb-3">✅ 과목별 전략</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• <strong>세법학개론:</strong> 계산문제 완벽 대비, 조문 암기</li>
                    <li>• <strong>재정학:</strong> 조세론 70% 이상 집중, 그래프 해석력</li>
                    <li>• <strong>회계학개론:</strong> K-IFRS 기준서 숙지, 분개 연습</li>
                    <li>• <strong>상법:</strong> 회사법 조문 + 판례 결론 암기</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-teal-600 mb-3">📊 시간 배분</h3>
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
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <div className="text-2xl font-bold text-teal-600">4과목</div>
                  <div className="text-sm text-gray-600">시험 과목수</div>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <div className="text-2xl font-bold text-teal-600">논술형</div>
                  <div className="text-sm text-gray-600">시험 유형</div>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <div className="text-2xl font-bold text-teal-600">420분</div>
                  <div className="text-sm text-gray-600">총 시험 시간</div>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <div className="text-2xl font-bold text-teal-600">60점</div>
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
                      <span className="text-teal-600">{subject.time}분</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {subject.topics.map((topic, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-900">{topic.name}</span>
                          <p className="text-sm text-gray-500 mt-1">{topic.detail}</p>
                        </div>
                        <span className="text-teal-600 font-medium">{topic.weight}</span>
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
                  <h3 className="font-bold text-teal-600 mb-3">✅ 답안 작성 요령</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 논점별 소제목 명시</li>
                    <li>• 조문 번호 정확히 기재</li>
                    <li>• 계산 과정 상세히 서술</li>
                    <li>• 결론을 먼저 쓰고 근거 전개</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-emerald-600 mb-3">📝 실전 대비</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 실제 시험 시간에 맞춰 모의고사</li>
                    <li>• 기출문제 답안 작성 연습</li>
                    <li>• 세법 조문집 활용법 숙지</li>
                    <li>• 계산기 사용 능숙도 향상</li>
                  </ul>
                </div>
              </div>
            </section>

            <Link
              href="/category/accounting/tax-accountant/study/tax-law-advanced"
              className="block w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-500 text-white text-center rounded-xl font-bold hover:from-teal-700 hover:to-emerald-600 transition shadow-lg"
            >
              2차 시험 심화학습 시작 →
            </Link>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t">
          <Link href="/category/accounting/tax-accountant" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 세무사 메인으로
          </Link>
          <Link href="/category/accounting/tax-accountant/study/fiscal-policy" className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
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
