'use client';

import { useState } from 'react';

export default function PatentAttorneyExamPage() {
  const [activeTab, setActiveTab] = useState<'first' | 'second'>('first');

  const firstExamSubjects = [
    {
      id: 1,
      name: '산업재산권법',
      questions: 40,
      time: '70분',
      passingScore: 40,
      difficulty: 5,
      passRate: '30%',
      description: '특허법, 상표법, 디자인보호법의 통합 과목',
      studyLink: '/category/legal/patent-attorney/study/industrial-property',
      topics: [
        '특허법 - 특허요건, 출원절차, 심사기준',
        '특허법 - 특허권의 효력과 제한, 실시권',
        '특허법 - 심판 및 소송, 국제출원(PCT)',
        '상표법 - 상표의 정의와 등록요건',
        '상표법 - 상표권의 효력, 침해와 구제',
        '디자인보호법 - 디자인등록요건',
        '디자인보호법 - 디자인권의 효력',
        '부정경쟁방지법 - 부정경쟁행위 유형'
      ],
      tips: '특허법이 60% 이상 출제되므로 특허법 중심 학습 필수'
    },
    {
      id: 2,
      name: '민법개론',
      questions: 40,
      time: '70분',
      passingScore: 40,
      difficulty: 4,
      passRate: '35%',
      description: '민법 총칙, 물권법, 채권법 기초',
      studyLink: '/category/legal/patent-attorney/study/civil-law',
      topics: [
        '민법 총칙 - 권리능력, 행위능력',
        '민법 총칙 - 법률행위, 의사표시',
        '민법 총칙 - 대리, 무효와 취소',
        '물권법 - 물권변동, 등기',
        '물권법 - 소유권, 용익물권, 담보물권',
        '채권법 - 채권의 목적과 효력',
        '채권법 - 채권양도, 채무인수',
        '채권법 - 계약 총론, 불법행위'
      ],
      tips: '물권법과 채권법 비중이 높음, 판례 중심 학습'
    },
    {
      id: 3,
      name: '자연과학개론',
      questions: 20,
      time: '70분',
      passingScore: 40,
      difficulty: 3,
      passRate: '50%',
      description: '물리학·화학·생물학·지구과학 중 택1',
      studyLink: '/category/legal/patent-attorney/study/natural-science',
      topics: [
        '물리학 - 역학, 열역학, 파동',
        '물리학 - 전자기학, 광학, 현대물리',
        '화학 - 물질의 구조, 화학결합',
        '화학 - 화학반응, 유기화학 기초',
        '생물학 - 세포, 유전, 진화',
        '생물학 - 생태계, 분자생물학',
        '지구과학 - 지질학, 대기과학',
        '지구과학 - 해양학, 천문학'
      ],
      tips: '본인 전공 분야 선택 권장, 기초 개념 확실히'
    }
  ];

  const secondExamSubjects = [
    {
      id: 1,
      name: '특허법',
      time: '120분',
      score: 200,
      difficulty: 5,
      description: '특허법 전 범위 논술형 시험',
      studyLink: '/category/legal/patent-attorney/study/patent-law',
      areas: [
        { name: '특허요건', weight: 25, items: ['신규성', '진보성', '산업상 이용가능성', '명세서 기재요건'] },
        { name: '출원·심사', weight: 20, items: ['출원절차', '분할/변경출원', '우선권', '심사청구'] },
        { name: '청구범위 해석', weight: 25, items: ['청구범위 작성', '발명의 동일성', '균등론', '출원경과금반언'] },
        { name: '특허권 효력', weight: 15, items: ['특허권의 효력', '실시권', '효력의 제한'] },
        { name: '심판·소송', weight: 15, items: ['무효심판', '정정심판', '권리범위확인심판', '침해소송'] }
      ],
      recentTopics: [
        { topic: '진보성 판단기준', frequency: '매회' },
        { topic: '청구범위 해석', frequency: '매회' },
        { topic: '균등침해 요건', frequency: '자주' },
        { topic: '명세서 기재불비', frequency: '자주' },
        { topic: 'PCT 국제출원', frequency: '간헐' }
      ],
      strategy: '사례형 문제 대비를 위해 판례 분석 필수, 청구범위 작성 연습 반복'
    },
    {
      id: 2,
      name: '상표법',
      time: '120분',
      score: 100,
      difficulty: 4,
      description: '상표법 및 부정경쟁방지법 논술',
      studyLink: '/category/legal/patent-attorney/study/trademark-law',
      areas: [
        { name: '상표등록요건', weight: 30, items: ['식별력', '등록거절이유', '주지·저명상표'] },
        { name: '상표권 효력', weight: 25, items: ['상표권의 효력범위', '유사판단', '효력의 제한'] },
        { name: '상표침해', weight: 25, items: ['침해유형', '혼동가능성', '희석화이론'] },
        { name: '국제출원', weight: 20, items: ['마드리드 의정서', '국제등록', '사후지정'] }
      ],
      recentTopics: [
        { topic: '상표 유사판단', frequency: '매회' },
        { topic: '식별력 판단', frequency: '매회' },
        { topic: '부정경쟁행위', frequency: '자주' },
        { topic: '상표권 침해', frequency: '자주' },
        { topic: '마드리드 출원', frequency: '간헐' }
      ],
      strategy: '상표 유사 판단 사례 다양하게 분석, 부정경쟁방지법 병행 학습'
    },
    {
      id: 3,
      name: '민사소송법',
      time: '120분',
      score: 100,
      difficulty: 4,
      description: '민사소송법 전반 논술',
      studyLink: '/category/legal/patent-attorney/study/civil-procedure',
      areas: [
        { name: '소송요건', weight: 25, items: ['당사자적격', '소의 이익', '소송물', '관할'] },
        { name: '소송절차', weight: 25, items: ['변론주의', '처분권주의', '소송행위', '기일·기간'] },
        { name: '증거법', weight: 25, items: ['증명책임', '자유심증주의', '증거조사', '서증'] },
        { name: '판결·상소', weight: 25, items: ['판결의 효력', '기판력', '항소', '상고'] }
      ],
      recentTopics: [
        { topic: '당사자적격', frequency: '매회' },
        { topic: '기판력 범위', frequency: '자주' },
        { topic: '증명책임 분배', frequency: '자주' },
        { topic: '변론주의', frequency: '자주' },
        { topic: '가처분', frequency: '간헐' }
      ],
      strategy: '특허소송 관련 민소법 쟁점 집중, 절차적 흐름 이해 필수'
    }
  ];

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
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/legal" className="text-gray-600 hover:text-blue-600">법률</a>
            <span className="text-gray-300">›</span>
            <a href="/category/legal/patent-attorney" className="text-gray-600 hover:text-blue-600">변리사</a>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🔬</span>
            <div>
              <h1 className="text-2xl font-bold">변리사 시험 상세</h1>
              <p className="text-cyan-100">시험 과목별 상세 정보 및 합격 전략</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-[57px] z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('first')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'first'
                  ? 'border-cyan-500 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 1차 시험 (객관식)
            </button>
            <button
              onClick={() => setActiveTab('second')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'second'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              ✍️ 2차 시험 (논술형)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'first' ? (
          <div className="space-y-8">
            {/* 1차 시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📋</span> 1차 시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">시험 과목</p>
                  <p className="text-2xl font-bold text-cyan-600">3과목</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">총 문항수</p>
                  <p className="text-2xl font-bold text-cyan-600">100문항</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">시험 시간</p>
                  <p className="text-2xl font-bold text-cyan-600">210분</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">합격 기준</p>
                  <p className="text-2xl font-bold text-cyan-600">평균 60점</p>
                  <p className="text-xs text-gray-400">과목당 40점 이상</p>
                </div>
              </div>
            </section>

            {/* 과목별 상세 */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-cyan-500">📚</span> 과목별 상세
              </h2>
              {firstExamSubjects.map((subject) => (
                <div key={subject.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{subject.id}과목: {subject.name}</h3>
                        <p className="text-cyan-100 text-sm mt-1">{subject.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{subject.questions}문항 / {subject.time}</p>
                        <div className="flex gap-1 mt-1 justify-end">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < subject.difficulty ? 'text-yellow-300' : 'text-white/30'}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <span className="text-cyan-500">📖</span> 주요 토픽
                        </h4>
                        <ul className="space-y-2">
                          {subject.topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-cyan-500 mt-1">•</span>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-800 mb-2">📊 통계</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">과목 과락 기준</span>
                              <span className="font-medium">{subject.passingScore}점</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">평균 합격률</span>
                              <span className="font-medium text-cyan-600">{subject.passRate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-cyan-50 rounded-lg p-4">
                          <h4 className="font-semibold text-cyan-800 mb-2">💡 학습 팁</h4>
                          <p className="text-sm text-gray-600">{subject.tips}</p>
                        </div>
                        <a
                          href={subject.studyLink}
                          className="block bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-center py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-teal-600 transition"
                        >
                          {subject.name} 학습하기 →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* 1차 합격 전략 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-cyan-500">🎯</span> 1차 합격 전략
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-cyan-50 rounded-lg p-4">
                  <h3 className="font-semibold text-cyan-800 mb-2">1️⃣ 산업재산권법 집중</h3>
                  <p className="text-sm text-gray-600">
                    배점이 가장 높고 2차와 연결되므로 가장 깊이 있게 학습.
                    특허법 조문 암기 필수.
                  </p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4">
                  <h3 className="font-semibold text-teal-800 mb-2">2️⃣ 민법 효율 학습</h3>
                  <p className="text-sm text-gray-600">
                    변리사 민법은 범위가 제한적.
                    기출 분석하여 자주 나오는 부분 집중.
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h3 className="font-semibold text-emerald-800 mb-2">3️⃣ 자연과학 선택</h3>
                  <p className="text-sm text-gray-600">
                    본인 전공 분야 선택이 유리.
                    기초 개념 위주로 안정적 득점.
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 2차 시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-teal-500">📋</span> 2차 시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">시험 과목</p>
                  <p className="text-2xl font-bold text-teal-600">3과목</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">총 배점</p>
                  <p className="text-2xl font-bold text-teal-600">400점</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">시험 시간</p>
                  <p className="text-2xl font-bold text-teal-600">360분</p>
                  <p className="text-xs text-gray-400">각 120분</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">합격 기준</p>
                  <p className="text-2xl font-bold text-teal-600">240점</p>
                  <p className="text-xs text-gray-400">과목당 40% 이상</p>
                </div>
              </div>
            </section>

            {/* 2차 과목별 상세 */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-teal-500">📚</span> 과목별 상세
              </h2>
              {secondExamSubjects.map((subject) => (
                <div key={subject.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{subject.id}교시: {subject.name}</h3>
                        <p className="text-teal-100 text-sm mt-1">{subject.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{subject.score}점</p>
                        <p className="text-sm text-teal-100">{subject.time}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* 출제 영역 */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <span className="text-teal-500">📊</span> 출제 영역별 비중
                        </h4>
                        <div className="space-y-3">
                          {subject.areas.map((area, i) => (
                            <div key={i}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-700">{area.name}</span>
                                <span className="text-teal-600">{area.weight}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div
                                  className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full"
                                  style={{ width: `${area.weight}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500">{area.items.join(', ')}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 출제 경향 */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <span className="text-teal-500">📈</span> 최근 출제 경향
                          </h4>
                          <div className="space-y-2">
                            {subject.recentTopics.map((item, i) => (
                              <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <span className="text-sm text-gray-700">{item.topic}</span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  item.frequency === '매회' ? 'bg-red-100 text-red-700' :
                                  item.frequency === '자주' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  {item.frequency}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-teal-50 rounded-lg p-4">
                          <h4 className="font-semibold text-teal-800 mb-2">💡 합격 전략</h4>
                          <p className="text-sm text-gray-600">{subject.strategy}</p>
                        </div>

                        <a
                          href={subject.studyLink}
                          className="block bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-center py-3 rounded-lg font-medium hover:from-teal-600 hover:to-emerald-600 transition"
                        >
                          {subject.name} 학습하기 →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* 2차 합격 전략 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-teal-500">🎯</span> 2차 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-teal-50 rounded-lg p-4">
                    <h3 className="font-semibold text-teal-800 mb-2">✍️ 답안 작성 요령</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 쟁점 파악 → 관련 조문 → 판례 → 결론 순서</li>
                      <li>• 두괄식 작성으로 결론 먼저 제시</li>
                      <li>• 시간 배분: 문제당 30분 원칙</li>
                      <li>• 모르는 문제도 부분점수 노리기</li>
                    </ul>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <h3 className="font-semibold text-emerald-800 mb-2">📝 특허법 고득점 비결</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 청구범위 해석 문제 집중 대비</li>
                      <li>• 주요 판례 30개 암기</li>
                      <li>• 명세서 작성 실습 필수</li>
                      <li>• 사례형 문제 유형별 정리</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <h3 className="font-semibold text-cyan-800 mb-2">📊 목표 점수 설정</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">특허법 (200점)</span>
                        <span className="font-medium text-cyan-600">130점 이상</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">상표법 (100점)</span>
                        <span className="font-medium text-cyan-600">60점 이상</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">민사소송법 (100점)</span>
                        <span className="font-medium text-cyan-600">60점 이상</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2">
                        <span className="font-semibold text-gray-800">목표 총점</span>
                        <span className="font-bold text-teal-600">250점/400점</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-2">⚠️ 주의사항</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 과목별 과락(40%) 주의</li>
                      <li>• 시간 부족 대비 연습 필수</li>
                      <li>• 최신 법 개정사항 확인</li>
                      <li>• 글씨 가독성도 중요</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 실무수습 안내 */}
            <section className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🎓</span> 합격 후 진로
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">1. 실무수습</h3>
                  <p className="text-sm text-teal-100">
                    합격 후 6개월간 특허법인에서 실무수습 필수
                  </p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">2. 변리사 등록</h3>
                  <p className="text-sm text-teal-100">
                    대한변리사회에 등록 후 업무 개시
                  </p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">3. 전문분야</h3>
                  <p className="text-sm text-teal-100">
                    기계, 전기전자, 화학, 바이오 등 전문화
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
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
