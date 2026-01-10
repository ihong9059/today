'use client';

import { useState } from 'react';

export default function JudicialScrivenerExamPage() {
  const [activeTab, setActiveTab] = useState<'first' | 'second'>('first');

  const firstExamSubjects = [
    {
      id: 1,
      name: '민법',
      questions: 40,
      maxScore: 80,
      time: '50분',
      passRate: '55%',
      difficulty: 5,
      link: '/category/legal/judicial-scrivener/study/civil-law',
      topics: [
        { name: '총칙', detail: '법률행위, 의사표시, 대리, 무효·취소, 조건·기한, 소멸시효' },
        { name: '물권법', detail: '물권변동, 소유권, 점유권, 용익물권, 담보물권' },
        { name: '채권총론', detail: '채권의 목적, 채무불이행, 채권자대위권, 채권양도' },
        { name: '채권각론', detail: '계약총론, 매매, 임대차, 불법행위' },
        { name: '친족법', detail: '혼인, 이혼, 친자관계, 양자' },
        { name: '상속법', detail: '상속, 유언, 유류분' }
      ],
      tips: '민법은 전체 배점의 33%로 가장 중요. 판례 중심 학습 필수.'
    },
    {
      id: 2,
      name: '민사집행법',
      questions: 20,
      maxScore: 40,
      time: '25분',
      passRate: '48%',
      difficulty: 4,
      link: '/category/legal/judicial-scrivener/study/civil-execution',
      topics: [
        { name: '총론', detail: '집행권원, 집행문, 집행개시요건' },
        { name: '부동산집행', detail: '강제경매, 임의경매, 배당절차' },
        { name: '채권집행', detail: '채권압류, 추심명령, 전부명령' },
        { name: '동산집행', detail: '유체동산 압류, 선박·차량 집행' }
      ],
      tips: '경매절차와 배당순위가 핵심. 사례형 문제 대비 필요.'
    },
    {
      id: 3,
      name: '상법(회사법) + 비송사건절차법',
      questions: 20,
      maxScore: 40,
      time: '25분',
      passRate: '52%',
      difficulty: 4,
      link: '/category/legal/judicial-scrivener/study/commercial-law',
      topics: [
        { name: '회사 총론', detail: '회사의 종류, 설립, 능력' },
        { name: '주식회사', detail: '주식, 주주총회, 이사회, 감사' },
        { name: '유한회사', detail: '설립, 사원, 기관' },
        { name: '비송절차', detail: '법인등기, 비송사건 재판절차' }
      ],
      tips: '상업등기와 연계하여 학습. 회사 변경등기 관련 중요.'
    },
    {
      id: 4,
      name: '부동산등기법 + 상업등기법',
      questions: 20,
      maxScore: 40,
      time: '25분',
      passRate: '45%',
      difficulty: 5,
      link: '/category/legal/judicial-scrivener/study/real-estate-registration',
      topics: [
        { name: '부동산등기 총론', detail: '등기부, 등기절차, 등기관할' },
        { name: '소유권 등기', detail: '보존등기, 이전등기, 변경등기' },
        { name: '담보권 등기', detail: '저당권, 근저당권, 전세권' },
        { name: '상업등기', detail: '회사등기, 법인등기, 상호등기' }
      ],
      tips: '2차 서식과 직결되는 핵심 과목. 등기예규 숙지 필수.'
    },
    {
      id: 5,
      name: '헌법 + 공탁법 + 법무사법',
      questions: 20,
      maxScore: 40,
      time: '25분',
      passRate: '62%',
      difficulty: 3,
      link: null,
      topics: [
        { name: '헌법', detail: '기본권, 통치구조, 헌법재판' },
        { name: '공탁법', detail: '변제공탁, 담보공탁, 집행공탁' },
        { name: '법무사법', detail: '법무사의 직무, 윤리, 징계' }
      ],
      tips: '상대적으로 쉬운 과목. 고득점으로 평균 올리기 전략.'
    }
  ];

  const secondExamSubjects = [
    {
      id: 1,
      name: '1교시: 등기신청서 작성',
      time: '120분',
      maxScore: 200,
      sections: [
        {
          name: '부동산등기',
          weight: '약 70%',
          topics: [
            '소유권이전등기 (매매, 상속, 증여)',
            '근저당권설정등기',
            '전세권설정등기',
            '가등기 및 본등기',
            '말소등기',
            '경정·변경등기'
          ]
        },
        {
          name: '상업등기',
          weight: '약 30%',
          topics: [
            '회사설립등기 (주식회사, 유한회사)',
            '임원변경등기',
            '본점이전등기',
            '증자·감자등기',
            '합병·분할등기'
          ]
        }
      ],
      tips: '서식 암기보다 원리 이해가 중요. 기출 서식 반복 연습 필수.'
    },
    {
      id: 2,
      name: '2교시: 민법·민사집행법 논술',
      time: '120분',
      maxScore: 200,
      sections: [
        {
          name: '민법 논술',
          weight: '약 60%',
          topics: [
            '물권변동 사례',
            '계약 해제·해지',
            '채권자대위권·취소권',
            '상속분쟁 사례',
            '부동산 이중매매'
          ]
        },
        {
          name: '민사집행법 논술',
          weight: '약 40%',
          topics: [
            '경매절차 사례',
            '배당이의 사례',
            '채권집행 사례',
            '제3자이의의 소'
          ]
        }
      ],
      tips: '결론-이유-근거 순으로 논리적 서술. 조문과 판례 인용 연습.'
    }
  ];

  const examTrends = {
    always: ['물권변동', '근저당권', '배당순위', '회사설립', '상속등기'],
    frequent: ['가등기', '채권양도', '유치권', '법인등기', '전세권'],
    occasional: ['동산담보', '공탁절차', '비송재판', '헌법재판', '법무사윤리']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-violet-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/legal" className="text-gray-600 hover:text-violet-600">법률</a>
            <span className="text-gray-300">›</span>
            <a href="/category/legal/judicial-scrivener" className="text-gray-600 hover:text-violet-600">법무사</a>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">⚖️</span>
            <div>
              <h1 className="text-2xl font-bold">법무사 시험 상세정보</h1>
              <p className="text-violet-200">1차 객관식 + 2차 논술·서식형</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('first')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'first'
                  ? 'border-violet-500 text-violet-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 1차 시험 (객관식)
            </button>
            <button
              onClick={() => setActiveTab('second')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'second'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              ✍️ 2차 시험 (논술·서식)
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 1차 시험 탭 */}
        {activeTab === 'first' && (
          <div className="space-y-8">
            {/* 시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 1차 시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">총 문항수</p>
                  <p className="text-2xl font-bold text-violet-600">120문항</p>
                </div>
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">시험시간</p>
                  <p className="text-2xl font-bold text-violet-600">150분</p>
                </div>
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">총 배점</p>
                  <p className="text-2xl font-bold text-violet-600">240점</p>
                </div>
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">합격기준</p>
                  <p className="text-2xl font-bold text-violet-600">평균 60점↑</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>과락 주의:</strong> 각 과목당 40% 미만 득점 시 불합격 (민법 32점, 기타 16점 미만)
                </p>
              </div>
            </section>

            {/* 과목별 상세 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">📚 1차 과목별 상세</h2>
              {firstExamSubjects.map((subject) => (
                <div key={subject.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{subject.id}. {subject.name}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <span>📝 {subject.questions}문항</span>
                          <span>⏱️ {subject.time}</span>
                          <span>📊 {subject.maxScore}점 만점</span>
                          <span>✅ 평균합격률 {subject.passRate}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">난이도</p>
                        <p className="text-yellow-500">{'★'.repeat(subject.difficulty)}{'☆'.repeat(5-subject.difficulty)}</p>
                      </div>
                    </div>

                    {/* 토픽 */}
                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      {subject.topics.map((topic, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium text-violet-700">{topic.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{topic.detail}</p>
                        </div>
                      ))}
                    </div>

                    {/* 팁 */}
                    <div className="bg-violet-50 rounded-lg p-3">
                      <p className="text-sm text-violet-700">💡 {subject.tips}</p>
                    </div>

                    {/* 학습 링크 */}
                    {subject.link && (
                      <a
                        href={subject.link}
                        className="mt-4 inline-flex items-center gap-2 text-violet-600 hover:text-violet-800 font-medium"
                      >
                        📖 {subject.name} 학습하기 →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </section>

            {/* 출제경향 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📊 1차 출제 경향</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-bold text-red-700 mb-2">🔴 매회 출제</h3>
                  <div className="flex flex-wrap gap-2">
                    {examTrends.always.map((topic, i) => (
                      <span key={i} className="bg-white px-2 py-1 rounded text-sm text-red-600">{topic}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-bold text-yellow-700 mb-2">🟡 자주 출제</h3>
                  <div className="flex flex-wrap gap-2">
                    {examTrends.frequent.map((topic, i) => (
                      <span key={i} className="bg-white px-2 py-1 rounded text-sm text-yellow-600">{topic}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-green-700 mb-2">🟢 간헐 출제</h3>
                  <div className="flex flex-wrap gap-2">
                    {examTrends.occasional.map((topic, i) => (
                      <span key={i} className="bg-white px-2 py-1 rounded text-sm text-green-600">{topic}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 합격 전략 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 1차 합격 전략</h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <span className="bg-violet-100 text-violet-600 px-3 py-1 rounded-full font-bold">1</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">민법에 가장 많은 시간 투자</h3>
                    <p className="text-sm text-gray-500">전체 배점의 33%를 차지하며 2차 논술과도 직결됩니다.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-violet-100 text-violet-600 px-3 py-1 rounded-full font-bold">2</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">등기법은 서식과 함께 학습</h3>
                    <p className="text-sm text-gray-500">2차 서식 작성의 기초가 되므로 원리 이해 중심으로 공부하세요.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-violet-100 text-violet-600 px-3 py-1 rounded-full font-bold">3</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">기출문제 10개년 반복</h3>
                    <p className="text-sm text-gray-500">반복 출제되는 쟁점이 많으므로 기출 완벽 분석이 필수입니다.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-violet-100 text-violet-600 px-3 py-1 rounded-full font-bold">4</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">헌법·공탁·법무사법으로 평균 올리기</h3>
                    <p className="text-sm text-gray-500">상대적으로 쉬운 5과목에서 고득점하여 전체 평균을 높이세요.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2차 시험 탭 */}
        {activeTab === 'second' && (
          <div className="space-y-8">
            {/* 시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 2차 시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">시험유형</p>
                  <p className="text-2xl font-bold text-purple-600">서식+논술</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">총 시험시간</p>
                  <p className="text-2xl font-bold text-purple-600">240분</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">총 배점</p>
                  <p className="text-2xl font-bold text-purple-600">400점</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">합격기준</p>
                  <p className="text-2xl font-bold text-purple-600">총점 60%↑</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>과락 주의:</strong> 각 교시별 40% 미만 득점 시 불합격 (각 교시 80점 미만)
                </p>
              </div>
            </section>

            {/* 교시별 상세 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">📚 2차 교시별 상세</h2>
              {secondExamSubjects.map((subject) => (
                <div key={subject.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
                    <h3 className="text-lg font-bold">{subject.name}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-purple-100">
                      <span>⏱️ {subject.time}</span>
                      <span>📊 {subject.maxScore}점 만점</span>
                    </div>
                  </div>
                  <div className="p-6">
                    {subject.sections.map((section, i) => (
                      <div key={i} className="mb-6 last:mb-0">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-purple-700">{section.name}</h4>
                          <span className="text-sm text-gray-500">{section.weight}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2">
                          {section.topics.map((topic, j) => (
                            <div key={j} className="bg-gray-50 rounded px-3 py-2 text-sm text-gray-600">
                              • {topic}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 bg-purple-50 rounded-lg p-3">
                      <p className="text-sm text-purple-700">💡 {subject.tips}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* 서식 작성 팁 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">✏️ 등기신청서 작성 핵심</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-purple-700 mb-3">부동산등기 핵심 포인트</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-purple-500">•</span>
                      <span>등기원인 정확히 기재 (매매, 상속, 증여 구분)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-500">•</span>
                      <span>첨부서면 빠짐없이 작성 (등기원인증명정보, 인감증명서 등)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-500">•</span>
                      <span>등록면허세, 취득세 정확히 계산</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-500">•</span>
                      <span>관할등기소 표시 정확히</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-700 mb-3">상업등기 핵심 포인트</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-purple-500">•</span>
                      <span>주주총회/이사회 의사록 기재사항 확인</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-500">•</span>
                      <span>등기기간 준수 (2주 이내)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-500">•</span>
                      <span>대표이사 자격증명서면 첨부</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-500">•</span>
                      <span>인감신고서 필요 여부 확인</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 논술 작성 팁 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📝 논술 작성 전략</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">1. 답안 구성</h3>
                  <p className="text-sm text-gray-600">
                    <strong>두괄식 서술:</strong> 결론 → 법적 근거 → 적용 → 소결론 순서로 작성
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">2. 조문 인용</h3>
                  <p className="text-sm text-gray-600">
                    관련 조문을 정확히 인용 (민법 제186조 등). 조문 번호가 정확하지 않으면 감점.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">3. 판례 활용</h3>
                  <p className="text-sm text-gray-600">
                    대법원 판례 요지를 간략히 인용. "대법원 판례에 의하면..." 형식 사용.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">4. 시간 배분</h3>
                  <p className="text-sm text-gray-600">
                    문제당 30분 내외 배분. 마지막 10분은 검토 시간으로 확보.
                  </p>
                </div>
              </div>
            </section>

            {/* 합격 전략 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 2차 합격 전략</h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-bold">1</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">서식 암기보다 원리 이해</h3>
                    <p className="text-sm text-gray-500">등기법 원리를 이해하면 어떤 유형이 나와도 대응 가능합니다.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-bold">2</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">기출 서식 100회 이상 연습</h3>
                    <p className="text-sm text-gray-500">손이 기억할 때까지 반복 연습. 시간 내 완성이 중요합니다.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-bold">3</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">논술 모범답안 10개 암기</h3>
                    <p className="text-sm text-gray-500">자주 나오는 쟁점에 대한 모범답안을 암기하고 변형 연습.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-bold">4</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">실전 모의고사 필수</h3>
                    <p className="text-sm text-gray-500">학원 모의고사나 스터디를 통해 실전 감각을 유지하세요.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 학습 링크 */}
        <section className="mt-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl shadow-md p-6 text-white">
          <h2 className="text-xl font-bold mb-4">📖 과목별 학습하기</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/category/legal/judicial-scrivener/study/civil-law"
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 transition">
              <p className="font-bold">민법</p>
              <p className="text-sm text-violet-200">50문항 학습</p>
            </a>
            <a href="/category/legal/judicial-scrivener/study/civil-execution"
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 transition">
              <p className="font-bold">민사집행법</p>
              <p className="text-sm text-violet-200">50문항 학습</p>
            </a>
            <a href="/category/legal/judicial-scrivener/study/commercial-law"
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 transition">
              <p className="font-bold">상법·비송</p>
              <p className="text-sm text-violet-200">50문항 학습</p>
            </a>
            <a href="/category/legal/judicial-scrivener/study/real-estate-registration"
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 transition">
              <p className="font-bold">부동산등기법</p>
              <p className="text-sm text-violet-200">50문항 학습</p>
            </a>
            <a href="/category/legal/judicial-scrivener/study/practical"
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 transition">
              <p className="font-bold">2차 서식 실기</p>
              <p className="text-sm text-violet-200">25문항 학습</p>
            </a>
            <a href="/category/legal/judicial-scrivener"
              className="bg-white/20 hover:bg-white/30 rounded-lg p-4 transition">
              <p className="font-bold">법무사 메인</p>
              <p className="text-sm text-violet-200">← 돌아가기</p>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">본 사이트는 자격시험 정보 제공 목적으로 운영됩니다.</p>
        </div>
      </footer>
    </div>
  );
}
