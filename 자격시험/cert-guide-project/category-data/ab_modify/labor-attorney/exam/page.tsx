'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LaborAttorneyExamPage() {
  const [activeTab, setActiveTab] = useState<'first' | 'second'>('first');

  const firstExamSubjects = [
    {
      id: 1,
      name: '노동법(1)',
      subtitle: '개별적 근로관계법',
      questions: 25,
      time: 30,
      difficulty: '상',
      passRate: 65,
      topics: [
        { name: '근로기준법 총칙', weight: 20, desc: '근로자·사용자 정의, 근로조건 기준' },
        { name: '근로계약', weight: 25, desc: '근로계약 체결·변경·종료, 해고 제한' },
        { name: '임금', weight: 20, desc: '임금의 정의, 지급원칙, 최저임금' },
        { name: '근로시간·휴일·휴가', weight: 20, desc: '법정근로시간, 연장근로, 연차휴가' },
        { name: '여성·연소자 보호', weight: 8, desc: '모성보호, 연소자 근로제한' },
        { name: '기타 규정', weight: 7, desc: '취업규칙, 기숙사, 재해보상' }
      ],
      tips: [
        '판례 중심 학습 필수 - 대법원 판례 300선',
        '근로기준법 조문 숙지',
        '부당해고 판단기준 집중 학습',
        '임금 관련 계산문제 연습'
      ]
    },
    {
      id: 2,
      name: '노동법(2)',
      subtitle: '집단적 노사관계법',
      questions: 25,
      time: 30,
      difficulty: '상',
      passRate: 60,
      topics: [
        { name: '노동조합법', weight: 30, desc: '노조 설립·운영, 조합원 자격' },
        { name: '단체교섭', weight: 25, desc: '교섭의무, 교섭단위, 성실교섭' },
        { name: '단체협약', weight: 15, desc: '협약의 효력, 규범적·채무적 부분' },
        { name: '쟁의행위', weight: 15, desc: '쟁의행위 정당성, 파업·직장폐쇄' },
        { name: '부당노동행위', weight: 15, desc: '유형, 구제절차, 노동위원회' }
      ],
      tips: [
        '노조법 핵심 조문 암기',
        '부당노동행위 유형별 판례 정리',
        '쟁의행위 정당성 판단기준',
        '복수노조 관련 최신 판례'
      ]
    },
    {
      id: 3,
      name: '민법',
      subtitle: '총칙·채권',
      questions: 25,
      time: 30,
      difficulty: '중상',
      passRate: 55,
      topics: [
        { name: '민법 총칙', weight: 35, desc: '권리능력, 법률행위, 대리, 시효' },
        { name: '채권총론', weight: 30, desc: '채권의 목적·효력, 다수당사자' },
        { name: '계약법', weight: 25, desc: '계약의 성립·효력, 각종 계약' },
        { name: '불법행위', weight: 10, desc: '손해배상, 사용자책임' }
      ],
      tips: [
        '법률행위 무효·취소 구별',
        '채권양도·채무인수 비교',
        '계약해제·해지 효과',
        '노동관계 관련 민법 적용'
      ]
    },
    {
      id: 4,
      name: '사회보험법',
      subtitle: '4대 사회보험',
      questions: 25,
      time: 30,
      difficulty: '중',
      passRate: 70,
      topics: [
        { name: '국민연금법', weight: 25, desc: '가입자, 급여종류, 연금액 산정' },
        { name: '국민건강보험법', weight: 25, desc: '가입자, 보험료, 급여' },
        { name: '고용보험법', weight: 25, desc: '피보험자, 실업급여, 육아휴직' },
        { name: '산업재해보상보험법', weight: 25, desc: '업무상 재해, 보험급여' }
      ],
      tips: [
        '4대 보험 비교표 작성',
        '급여 종류와 요건 정리',
        '보험료 산정방식 이해',
        '최신 개정사항 체크'
      ]
    },
    {
      id: 5,
      name: '경제학원론',
      subtitle: '택1 (경영학개론)',
      questions: 25,
      time: 30,
      difficulty: '중',
      passRate: 75,
      topics: [
        { name: '미시경제학', weight: 30, desc: '수요·공급, 시장균형, 탄력성' },
        { name: '거시경제학', weight: 30, desc: 'GDP, 인플레이션, 실업' },
        { name: '노동경제학', weight: 25, desc: '노동시장, 임금결정, 노동공급' },
        { name: '국제경제학', weight: 15, desc: '무역이론, 환율, 국제수지' }
      ],
      tips: [
        '기본 그래프 해석 연습',
        '노동경제 파트 집중',
        '경제지표 계산문제',
        '최신 경제 이슈 파악'
      ]
    }
  ];

  const secondExamSubjects = [
    {
      id: 1,
      name: '노동법',
      subtitle: '논술형',
      time: 120,
      questions: 4,
      difficulty: '최상',
      passRate: 25,
      areas: [
        { name: '근로기준법', weight: 30, items: ['해고의 정당성', '임금체불', '근로시간'] },
        { name: '노동조합법', weight: 30, items: ['노조설립', '단체교섭', '쟁의행위'] },
        { name: '판례분석', weight: 25, items: ['최신 대법원 판례', '헌법재판소 결정'] },
        { name: '사례형 문제', weight: 15, items: ['복합 쟁점', '권리구제 절차'] }
      ],
      recentTopics: [
        { topic: '부당해고 구제', frequency: '매회' },
        { topic: '부당노동행위', frequency: '매회' },
        { topic: '쟁의행위 정당성', frequency: '자주' },
        { topic: '근로자성 판단', frequency: '자주' },
        { topic: '취업규칙 불이익변경', frequency: '간헐' }
      ],
      writingTips: [
        '쟁점 도출 → 관련 법리 → 사안 포섭 → 결론 순서',
        '판례 번호와 핵심 판시 정확히 인용',
        '양 당사자 입장 균형있게 검토',
        '시간 배분: 문제당 25-30분'
      ]
    },
    {
      id: 2,
      name: '인사노무관리론',
      subtitle: '논술형',
      time: 90,
      questions: 4,
      difficulty: '상',
      passRate: 35,
      areas: [
        { name: '인적자원관리', weight: 30, items: ['채용', '교육훈련', '경력개발'] },
        { name: '보상관리', weight: 25, items: ['임금체계', '성과급', '복리후생'] },
        { name: '노사관계', weight: 25, items: ['노사협의', '고충처리', '분쟁해결'] },
        { name: '인사평가', weight: 20, items: ['평가방법', '다면평가', 'MBO'] }
      ],
      recentTopics: [
        { topic: '성과주의 인사제도', frequency: '매회' },
        { topic: '직무급 임금체계', frequency: '자주' },
        { topic: '노사협력 방안', frequency: '자주' },
        { topic: '유연근무제', frequency: '간헐' },
        { topic: '인사평가 개선', frequency: '간헐' }
      ],
      writingTips: [
        '이론 + 실무적 적용방안 함께 서술',
        '도표나 프레임워크 적극 활용',
        '최신 HR 트렌드 반영',
        '구체적 기업 사례 언급'
      ]
    },
    {
      id: 3,
      name: '행정쟁송법',
      subtitle: '논술형',
      time: 90,
      questions: 4,
      difficulty: '상',
      passRate: 30,
      areas: [
        { name: '행정소송', weight: 35, items: ['취소소송', '무효확인소송', '당사자소송'] },
        { name: '행정심판', weight: 25, items: ['심판청구', '재결유형', '불복'] },
        { name: '노동위원회', weight: 25, items: ['구제신청', '심판절차', '재심'] },
        { name: '불복절차', weight: 15, items: ['소의 이익', '제소기간', '집행정지'] }
      ],
      recentTopics: [
        { topic: '노동위원회 구제명령', frequency: '매회' },
        { topic: '처분성 판단', frequency: '자주' },
        { topic: '원고적격', frequency: '자주' },
        { topic: '재결취소소송', frequency: '간헐' },
        { topic: '집행정지 요건', frequency: '간헐' }
      ],
      writingTips: [
        '소송요건 → 본안판단 순서 준수',
        '노동위원회 절차 정확히 서술',
        '판례 인용 시 요건과 효과 구분',
        '시간관리: 요건 40%, 본안 60%'
      ]
    },
    {
      id: 4,
      name: '경영조직론',
      subtitle: '논술형',
      time: 90,
      questions: 4,
      difficulty: '중상',
      passRate: 40,
      areas: [
        { name: '조직이론', weight: 30, items: ['조직구조', '조직설계', '조직환경'] },
        { name: '조직행동', weight: 30, items: ['동기부여', '리더십', '의사소통'] },
        { name: '조직문화', weight: 20, items: ['문화유형', '문화변화', '조직개발'] },
        { name: '조직변화', weight: 20, items: ['변화관리', '혁신', '학습조직'] }
      ],
      recentTopics: [
        { topic: '조직구조 설계', frequency: '매회' },
        { topic: '동기부여 이론', frequency: '매회' },
        { topic: '리더십 유형', frequency: '자주' },
        { topic: '조직문화 변화', frequency: '자주' },
        { topic: '조직학습', frequency: '간헐' }
      ],
      writingTips: [
        '이론명 정확히 기술 (학자명 포함)',
        '이론의 배경, 내용, 한계 순서',
        '실제 조직 사례 적용',
        '비판적 관점도 함께 제시'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/legal" className="text-gray-500 hover:text-gray-700">법률·행정</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/legal/labor-attorney" className="text-gray-500 hover:text-gray-700">공인노무사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-amber-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">📝</span>
            <div>
              <h1 className="text-3xl font-bold">공인노무사 시험 상세</h1>
              <p className="text-amber-100">Certified Public Labor Relations Attorney Examination</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-8">
            <button
              onClick={() => setActiveTab('first')}
              className={`px-6 py-3 rounded-t-xl font-medium transition ${
                activeTab === 'first'
                  ? 'bg-white text-amber-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              📚 1차 시험 (객관식)
            </button>
            <button
              onClick={() => setActiveTab('second')}
              className={`px-6 py-3 rounded-t-xl font-medium transition ${
                activeTab === 'second'
                  ? 'bg-white text-orange-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              ✍️ 2차 시험 (논술형)
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 1차 시험 탭 */}
        {activeTab === 'first' && (
          <div className="space-y-8">
            {/* 1차 시험 개요 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-amber-500">📋</span> 1차 시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-amber-50 rounded-xl text-center">
                  <div className="text-2xl font-bold text-amber-600">5과목</div>
                  <div className="text-sm text-gray-600">시험과목</div>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl text-center">
                  <div className="text-2xl font-bold text-amber-600">125문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl text-center">
                  <div className="text-2xl font-bold text-amber-600">150분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl text-center">
                  <div className="text-2xl font-bold text-amber-600">평균 60점</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>💡 합격 기준:</strong> 매 과목 100점 만점에 40점 이상, 전 과목 평균 60점 이상<br/>
                  <strong>📝 문제 유형:</strong> 5지선다형 객관식<br/>
                  <strong>⏰ 시험 시간:</strong> 09:30 ~ 12:00 (150분, 휴식 없음)
                </p>
              </div>
            </div>

            {/* 과목별 상세 */}
            <div className="space-y-6">
              {firstExamSubjects.map((subject) => (
                <div key={subject.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                  {/* 과목 헤더 */}
                  <div className="bg-gradient-to-r from-amber-500 to-orange-400 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{subject.id}. {subject.name}</h3>
                        <p className="text-amber-100">{subject.subtitle}</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="text-center px-3 py-1 bg-white/20 rounded-lg">
                          <div className="font-bold">{subject.questions}문항</div>
                          <div className="text-xs">문항수</div>
                        </div>
                        <div className="text-center px-3 py-1 bg-white/20 rounded-lg">
                          <div className="font-bold">{subject.difficulty}</div>
                          <div className="text-xs">난이도</div>
                        </div>
                        <div className="text-center px-3 py-1 bg-white/20 rounded-lg">
                          <div className="font-bold">{subject.passRate}%</div>
                          <div className="text-xs">과락률</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 출제 영역 */}
                  <div className="p-6">
                    <h4 className="font-bold mb-3 text-gray-800">📊 출제 영역별 비중</h4>
                    <div className="space-y-3 mb-6">
                      {subject.topics.map((topic, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{topic.name}</span>
                            <span className="text-amber-600">{topic.weight}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full"
                              style={{ width: `${topic.weight}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{topic.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* 학습 팁 */}
                    <div className="p-4 bg-amber-50 rounded-xl">
                      <h4 className="font-bold mb-2 text-amber-800">💡 학습 팁</h4>
                      <ul className="space-y-1">
                        {subject.tips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-amber-700 flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 학습 링크 */}
                    <div className="mt-4 flex justify-end">
                      <Link
                        href={`/category/legal/labor-attorney/study/${
                          subject.id === 1 ? 'labor-law' :
                          subject.id === 2 ? 'labor-law' :
                          subject.id === 3 ? 'civil-law' :
                          subject.id === 4 ? 'social-insurance' : 'labor-economics'
                        }`}
                        className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition text-sm"
                      >
                        📖 {subject.name} 학습하기 →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 1차 합격 전략 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-amber-500">🎯</span> 1차 시험 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-amber-800">✅ 핵심 전략</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">1.</span>
                      노동법(1)(2)에 시간 투자 집중 (전체의 50%!)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">2.</span>
                      사회보험법은 암기 과목 - 직전 2주 집중
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">3.</span>
                      민법은 노동법 관련 쟁점 위주로 학습
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">4.</span>
                      경제학은 기본 개념 + 노동경제 집중
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">5.</span>
                      기출문제 최소 10년치 3회독
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-orange-800">⚠️ 주의사항</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      과락(40점) 주의 - 민법이 가장 위험
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      시간 배분: 문제당 1분 12초
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      모르는 문제는 일단 건너뛰기
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      OMR 마킹 시간 10분 확보
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      1차 면제 2년 내 2차 합격해야
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2차 시험 탭 */}
        {activeTab === 'second' && (
          <div className="space-y-8">
            {/* 2차 시험 개요 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">📋</span> 2차 시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-orange-50 rounded-xl text-center">
                  <div className="text-2xl font-bold text-orange-600">4과목</div>
                  <div className="text-sm text-gray-600">시험과목</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl text-center">
                  <div className="text-2xl font-bold text-orange-600">16문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl text-center">
                  <div className="text-2xl font-bold text-orange-600">약 6시간</div>
                  <div className="text-sm text-gray-600">총 시험시간</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl text-center">
                  <div className="text-2xl font-bold text-orange-600">평균 60점</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>💡 합격 기준:</strong> 매 과목 100점 만점에 40점 이상, 전 과목 평균 60점 이상<br/>
                  <strong>📝 문제 유형:</strong> 논술형 (사례형 + 약술형)<br/>
                  <strong>⏰ 시험 일정:</strong> 1교시 노동법(120분) → 휴식 → 2교시 인사노무관리(90분) → 점심 → 3교시 행정쟁송법(90분) → 휴식 → 4교시 경영조직론(90분)
                </p>
              </div>
            </div>

            {/* 과목별 상세 */}
            <div className="space-y-6">
              {secondExamSubjects.map((subject) => (
                <div key={subject.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                  {/* 과목 헤더 */}
                  <div className="bg-gradient-to-r from-orange-500 to-red-400 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{subject.id}. {subject.name}</h3>
                        <p className="text-orange-100">{subject.subtitle}</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="text-center px-3 py-1 bg-white/20 rounded-lg">
                          <div className="font-bold">{subject.time}분</div>
                          <div className="text-xs">시험시간</div>
                        </div>
                        <div className="text-center px-3 py-1 bg-white/20 rounded-lg">
                          <div className="font-bold">{subject.questions}문항</div>
                          <div className="text-xs">문항수</div>
                        </div>
                        <div className="text-center px-3 py-1 bg-white/20 rounded-lg">
                          <div className="font-bold">{subject.difficulty}</div>
                          <div className="text-xs">난이도</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* 출제 영역 */}
                    <div className="mb-6">
                      <h4 className="font-bold mb-3 text-gray-800">📊 출제 영역별 비중</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {subject.areas.map((area, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{area.name}</span>
                              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm">
                                {area.weight}%
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {area.items.map((item, iidx) => (
                                <span key={iidx} className="px-2 py-0.5 bg-white text-xs text-gray-600 rounded border">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 출제 경향 */}
                    <div className="mb-6">
                      <h4 className="font-bold mb-3 text-gray-800">📈 최근 출제 경향</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="px-4 py-2 text-left">출제 주제</th>
                              <th className="px-4 py-2 text-center">출제 빈도</th>
                            </tr>
                          </thead>
                          <tbody>
                            {subject.recentTopics.map((topic, idx) => (
                              <tr key={idx} className="border-b">
                                <td className="px-4 py-2">{topic.topic}</td>
                                <td className="px-4 py-2 text-center">
                                  <span className={`px-2 py-1 rounded text-xs ${
                                    topic.frequency === '매회' ? 'bg-red-100 text-red-700' :
                                    topic.frequency === '자주' ? 'bg-orange-100 text-orange-700' :
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {topic.frequency}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 답안 작성 팁 */}
                    <div className="p-4 bg-orange-50 rounded-xl">
                      <h4 className="font-bold mb-2 text-orange-800">✍️ 답안 작성 팁</h4>
                      <ul className="space-y-1">
                        {subject.writingTips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-orange-700 flex items-start gap-2">
                            <span className="text-orange-500">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 학습 링크 */}
                    <div className="mt-4 flex justify-end">
                      <Link
                        href={`/category/legal/labor-attorney/study/${
                          subject.id === 1 ? 'labor-law' :
                          subject.id === 2 ? 'hr-management' :
                          subject.id === 3 ? 'labor-law' : 'business-organization'
                        }`}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm"
                      >
                        📖 {subject.name} 학습하기 →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 2차 합격 전략 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">🎯</span> 2차 시험 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-orange-800">✅ 논술 작성 요령</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">1.</span>
                      서론-본론-결론 3단 구조 필수
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">2.</span>
                      쟁점을 명확히 도출한 후 전개
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">3.</span>
                      판례는 판례번호와 핵심 판시 인용
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">4.</span>
                      사안 포섭 시 구체적 사실관계 언급
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">5.</span>
                      결론에서 법적 효과까지 기술
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-red-800">📝 시간 관리</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      노동법: 문제당 25-30분 (4문제 = 120분)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      기타과목: 문제당 20-22분 (4문제 = 90분)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      문제 읽기 + 구상: 전체의 15%
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      답안 작성: 전체의 80%
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      검토: 전체의 5%
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                <h3 className="font-bold text-amber-800 mb-2">🏆 합격자들의 공통점</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center">1</span>
                    <span>논술 연습 50회 이상</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center">2</span>
                    <span>핵심 판례 300선 암기</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center">3</span>
                    <span>스터디그룹 활동</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 하단 네비게이션 */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/category/legal/labor-attorney"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition text-center"
          >
            ← 공인노무사 메인으로
          </Link>
          <Link
            href="/category/legal/labor-attorney/study/labor-law"
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition text-center font-medium"
          >
            📖 노동법 학습 시작하기 →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인노무사 시험 준비를 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
