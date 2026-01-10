'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CPAExamPage() {
  const [activeTab, setActiveTab] = useState<'first' | 'second'>('first');

  const firstExamSubjects = [
    {
      name: '경영학',
      questions: 40,
      time: 50,
      difficulty: '중',
      passRate: 72,
      topics: [
        { name: '경영전략', items: ['SWOT 분석', '포터의 5 Forces', '경쟁전략', '다각화전략', '핵심역량', 'BCG 매트릭스', 'M&A 전략', '글로벌전략'] },
        { name: '조직행동론', items: ['동기부여이론', '리더십이론', '조직문화', '조직구조', '갈등관리', '의사결정', '조직변화', '팀빌딩'] },
        { name: '마케팅', items: ['STP 전략', '4P Mix', '소비자행동', '브랜드관리', '디지털마케팅', 'CRM', '가격전략', '유통채널'] },
        { name: '재무관리', items: ['자본예산', 'WACC', '배당정책', '자본구조', '합병가치평가', '위험관리', '옵션이론', '포트폴리오'] }
      ],
      studyTips: '재무관리와 조직행동론 비중이 높음. 기본이론 중심 출제'
    },
    {
      name: '경제원론',
      questions: 40,
      time: 50,
      difficulty: '중상',
      passRate: 65,
      topics: [
        { name: '미시경제(수요공급)', items: ['수요법칙', '공급법칙', '탄력성', '소비자잉여', '생산자잉여', '가격통제', '조세귀착', '국제무역'] },
        { name: '미시경제(시장구조)', items: ['완전경쟁', '독점시장', '독점적경쟁', '과점시장', '게임이론', '외부성', '공공재', '정보비대칭'] },
        { name: '거시경제(국민소득)', items: ['GDP 개념', '총수요', '총공급', '승수효과', '인플레이션', '실업', '경기변동', '경제성장'] },
        { name: '거시경제(통화금융)', items: ['화폐수요', '화폐공급', '통화정책', '이자율결정', 'IS-LM 모형', 'AD-AS 모형', '환율결정', '국제수지'] }
      ],
      studyTips: '그래프 해석과 계산문제 비중 높음. 미시경제 40%, 거시경제 60%'
    },
    {
      name: '상법',
      questions: 40,
      time: 50,
      difficulty: '상',
      passRate: 58,
      topics: [
        { name: '회사설립·자본', items: ['발기설립', '모집설립', '정관', '자본금', '주식발행', '자본금감소', '주식소각', '자기주식'] },
        { name: '주식·주주', items: ['주식양도', '주주총회', '의결권', '주주제안권', '집중투표', '이익배당', '주주명부', '전환주식'] },
        { name: '이사회·경영', items: ['이사선임', '이사회결의', '대표이사', '이사의무', '경업금지', '자기거래', '책임추궁', '업무집행'] },
        { name: '합병·분할', items: ['합병절차', '합병비율', '분할', '주식교환', '주식이전', '영업양도', '사업결합', '반대주주매수청구'] }
      ],
      studyTips: '회사법 중심 출제. 주식회사 제도를 완벽히 이해해야 함'
    },
    {
      name: '세법개론',
      questions: 40,
      time: 50,
      difficulty: '중상',
      passRate: 62,
      topics: [
        { name: '소득세', items: ['종합소득', '퇴직소득', '양도소득', '과세표준', '세액공제', '원천징수', '중간예납', '확정신고'] },
        { name: '법인세', items: ['세무조정', '익금', '손금', '접대비', '감가상각', '지급이자', '충당금', '세액계산'] },
        { name: '부가가치세', items: ['과세대상', '영세율', '면세', '세금계산서', '매입세액', '대손세액', '간이과세', '신고납부'] },
        { name: '상속증여세', items: ['상속세과세', '증여세과세', '평가방법', '공제제도', '세율체계', '신고납부', '연대납세', '물납'] }
      ],
      studyTips: '법인세, 소득세가 핵심. 계산문제와 사례형 출제 비중 높음'
    },
    {
      name: '회계학',
      questions: 80,
      time: 100,
      difficulty: '상',
      passRate: 55,
      topics: [
        { name: '재무회계(기초)', items: ['회계순환', '재무제표', '현금흐름표', '재고자산', '유형자산', '무형자산', '금융자산', '충당부채'] },
        { name: '재무회계(심화)', items: ['수익인식', '리스회계', '종업원급여', '법인세회계', '주당이익', '환율변동', '연결회계', '관계기업'] },
        { name: '원가관리회계', items: ['원가분류', '원가흐름', '개별원가', '종합원가', 'CVP분석', '표준원가', 'ABC', '대체가격'] },
        { name: '회계감사', items: ['감사기준', '감사위험', '내부통제', '표본감사', '분석적절차', '감사증거', '감사의견', '검토보고'] }
      ],
      studyTips: '재무회계 60%, 원가관리 30%, 감사 10%. 계산력 필수'
    }
  ];

  const secondExamSubjects = [
    {
      name: '재무회계',
      time: 240,
      weight: 100,
      format: '계산형 + 논술형',
      topics: [
        { name: '금융상품', weight: 20, items: ['금융자산분류', 'FVPL', 'FVOCI', 'AC', '손상차손', '제거', '위험회피', '내재파생'] },
        { name: '수익인식', weight: 15, items: ['5단계모형', '계약식별', '이행의무', '거래가격', '기간수익', '변동대가', '계약변경', '라이선스'] },
        { name: '연결재무제표', weight: 25, items: ['지배력판단', '연결조정', '비지배지분', '내부거래', '지분변동', '종속기업취득', '관계기업', '공동약정'] },
        { name: '기타', weight: 40, items: ['리스', '종업원급여', '법인세회계', '환율변동', '주당이익', '공정가치', '오류수정', '회계변경'] }
      ],
      passStrategy: '연결회계와 금융상품이 핵심. 시간배분 중요 (4시간)'
    },
    {
      name: '원가관리회계',
      time: 120,
      weight: 100,
      format: '계산형 + 단답형',
      topics: [
        { name: 'CVP분석', weight: 25, items: ['공헌이익', '손익분기점', '목표이익', '안전한계', '영업레버리지', '복수제품', '불확실성', '민감도'] },
        { name: '표준원가·차이분석', weight: 25, items: ['표준원가설정', '재료차이', '노무차이', '제조간접비차이', '4분법', '3분법', '판매차이', '고정비배부'] },
        { name: '의사결정', weight: 25, items: ['관련원가', '특별주문', '자가제조', '제약조건', '품질원가', '제품폐기', '설비대체', '대체가격'] },
        { name: '성과평가', weight: 25, items: ['책임회계', 'ROI', 'EVA', 'BSC', '이전가격', '분권화', '비재무지표', '벤치마킹'] }
      ],
      passStrategy: '계산속도와 정확성이 합격의 관건. 기출패턴 분석 필수'
    },
    {
      name: '세무회계',
      time: 120,
      weight: 100,
      format: '세무조정 + 계산형',
      topics: [
        { name: '법인세 세무조정', weight: 40, items: ['익금산입', '익금불산입', '손금산입', '손금불산입', '접대비', '기부금', '감가상각', '충당금'] },
        { name: '소득세', weight: 25, items: ['종합소득', '사업소득', '근로소득', '금융소득', '필요경비', '세액공제', '원천징수', '성실신고'] },
        { name: '부가가치세', weight: 20, items: ['과세거래', '영세율', '매입세액', '세금계산서', '간이과세', '대손세액', '가산세', '경정청구'] },
        { name: '조세절차법', weight: 15, items: ['국세기본법', '과세처분', '경정청구', '수정신고', '불복절차', '심판청구', '조세형벌', '가산세'] }
      ],
      passStrategy: '법인세 세무조정이 핵심. 실무 사례형 문제 대비 필요'
    },
    {
      name: '회계감사',
      time: 180,
      weight: 100,
      format: '논술형 + 사례형',
      topics: [
        { name: '감사기준·책임', weight: 25, items: ['감사기준체계', '직업윤리', '품질관리', '감사계약', '독립성', '감사인책임', '부정위험', '계속기업'] },
        { name: '위험평가·내부통제', weight: 25, items: ['감사위험모형', '중요성결정', '위험식별', '내부통제이해', '통제테스트', 'COSO', 'IT통제', '위험대응'] },
        { name: '감사증거·절차', weight: 25, items: ['감사증거속성', '분석적절차', '확인서', '표본감사', '감사조서', '전문가활용', '특수관계자', '후속사건'] },
        { name: '감사보고', weight: 25, items: ['적정의견', '한정의견', '부적정의견', '의견거절', '강조사항', '핵심감사사항', '비교정보', '기타정보'] }
      ],
      passStrategy: '감사기준서 원문 학습 필수. 논리적 서술능력 중요'
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
            <Link href="/category" className="text-gray-500 hover:text-gray-700">자격증</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/cpa" className="text-gray-500 hover:text-gray-700">공인회계사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-blue-600 font-medium">시험정보</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl backdrop-blur-sm">
              📊
            </div>
            <div>
              <h1 className="text-3xl font-bold">공인회계사 시험정보</h1>
              <p className="text-blue-100">CPA 1차·2차 시험 상세 안내</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab('first')}
              className={`px-6 py-4 font-medium transition-colors relative ${
                activeTab === 'first'
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              1차 시험 (객관식)
              {activeTab === 'first' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('second')}
              className={`px-6 py-4 font-medium transition-colors relative ${
                activeTab === 'second'
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              2차 시험 (주관식)
              {activeTab === 'second' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 1차 시험 탭 */}
        {activeTab === 'first' && (
          <div className="space-y-8">
            {/* 1차 시험 개요 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-500">📝</span> 1차 시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">5과목</div>
                  <div className="text-sm text-gray-600 mt-1">시험 과목</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">240문항</div>
                  <div className="text-sm text-gray-600 mt-1">총 문항 수</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">300분</div>
                  <div className="text-sm text-gray-600 mt-1">시험 시간</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">~20%</div>
                  <div className="text-sm text-gray-600 mt-1">평균 합격률</div>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>⚡ 합격 기준:</strong> 매 과목 100점 만점, 과목당 40점 이상 + 전 과목 평균 60점 이상
                  <br/>
                  <strong>📌 영어시험:</strong> 공인영어성적(TOEIC 700, TOEFL 71, TEPS 340 등)으로 대체
                </p>
              </div>
            </div>

            {/* 과목별 상세 */}
            <div className="space-y-6">
              {firstExamSubjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </span>
                        {subject.name}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {subject.questions}문항
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {subject.time}분
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        subject.difficulty === '상' ? 'bg-red-100 text-red-700' :
                        subject.difficulty === '중상' ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        난이도 {subject.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {subject.topics.map((topic, tidx) => (
                      <div key={tidx} className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-semibold text-blue-600 mb-2">{topic.name}</h4>
                        <div className="flex flex-wrap gap-1">
                          {topic.items.map((item, iidx) => (
                            <span key={iidx} className="px-2 py-0.5 bg-white text-gray-600 rounded text-xs border">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                    <div className="text-sm">
                      <span className="text-blue-800 font-medium">💡 {subject.studyTips}</span>
                    </div>
                    <Link
                      href={`/category/accounting/cpa/study/${
                        idx === 0 ? 'business-admin' :
                        idx === 1 ? 'economics' :
                        idx === 2 ? 'commercial-law' :
                        idx === 3 ? 'tax-intro' : 'accounting-theory'
                      }`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
                    >
                      학습하기 →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* 1차 합격 전략 */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">🎯 1차 시험 합격 전략</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="font-bold mb-2">📚 기본기 확립</h3>
                  <ul className="text-sm text-blue-100 space-y-1">
                    <li>• 회계학 80문항 집중 공략</li>
                    <li>• 재무회계 기초이론 완벽 숙지</li>
                    <li>• 원가회계 계산력 강화</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="font-bold mb-2">📝 문제풀이</h3>
                  <ul className="text-sm text-blue-100 space-y-1">
                    <li>• 최근 15년 기출문제 3회독</li>
                    <li>• 오답노트 필수 작성</li>
                    <li>• 시간 내 풀이 연습</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="font-bold mb-2">⏰ 시간관리</h3>
                  <ul className="text-sm text-blue-100 space-y-1">
                    <li>• 문항당 1분 15초 배분</li>
                    <li>• 모르는 문제 빠른 패스</li>
                    <li>• 마킹시간 10분 확보</li>
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
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-indigo-500">✍️</span> 2차 시험 개요
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-indigo-50 rounded-xl">
                  <div className="text-3xl font-bold text-indigo-600">4과목</div>
                  <div className="text-sm text-gray-600 mt-1">시험 과목</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-xl">
                  <div className="text-3xl font-bold text-indigo-600">2일</div>
                  <div className="text-sm text-gray-600 mt-1">시험 기간</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-xl">
                  <div className="text-3xl font-bold text-indigo-600">660분</div>
                  <div className="text-sm text-gray-600 mt-1">총 시험시간</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-xl">
                  <div className="text-3xl font-bold text-indigo-600">~15%</div>
                  <div className="text-sm text-gray-600 mt-1">평균 합격률</div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <p className="text-sm text-purple-800">
                  <strong>⚡ 합격 기준:</strong> 매 과목 100점 만점, 과목당 40점 이상 + 전 과목 평균 60점 이상 (상대평가)
                  <br/>
                  <strong>📌 시험 일정:</strong> 1일차 - 재무회계(240분), 2일차 - 원가관리(120분) + 세무회계(120분) + 회계감사(180분)
                </p>
              </div>
            </div>

            {/* 과목별 상세 */}
            <div className="space-y-6">
              {secondExamSubjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </span>
                        {subject.name}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                        {subject.time}분
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {subject.format}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {subject.topics.map((topic, tidx) => (
                      <div key={tidx} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-indigo-600">{topic.name}</h4>
                          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded">
                            배점 {topic.weight}%
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {topic.items.map((item, iidx) => (
                            <span key={iidx} className="px-2 py-0.5 bg-white text-gray-600 rounded text-xs border">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-indigo-50 rounded-xl">
                    <span className="text-sm text-indigo-800 font-medium">💡 {subject.passStrategy}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 2차 출제 경향 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-indigo-500">📊</span> 2차 시험 출제 경향
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-bold text-red-600 mb-2">🔴 매회 출제 (필수)</h3>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• 연결재무제표 (지분법 포함)</li>
                    <li>• 금융상품 (FVPL/FVOCI/AC)</li>
                    <li>• 법인세 세무조정</li>
                    <li>• CVP분석 및 의사결정</li>
                    <li>• 감사보고서 및 의견유형</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-orange-600 mb-2">🟠 자주 출제</h3>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• 리스회계 (IFRS 16)</li>
                    <li>• 수익인식 5단계</li>
                    <li>• 표준원가 차이분석</li>
                    <li>• 소득세 종합소득</li>
                    <li>• 내부통제 평가</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-green-600 mb-2">🟢 간헐 출제</h3>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• 파생상품 회계</li>
                    <li>• ABC 원가계산</li>
                    <li>• 상속증여세</li>
                    <li>• 사업결합 (IFRS 3)</li>
                    <li>• IT감사</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2차 합격 전략 */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">🎯 2차 시험 합격 전략</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="font-bold mb-2">📝 답안작성법</h3>
                  <ul className="text-sm text-indigo-100 space-y-1">
                    <li>• 분개 + 설명 병기</li>
                    <li>• 계산과정 명확히 표시</li>
                    <li>• 두괄식 논술 구성</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="font-bold mb-2">⏰ 시간배분</h3>
                  <ul className="text-sm text-indigo-100 space-y-1">
                    <li>• 재무회계: 문항당 40분</li>
                    <li>• 원가관리: 문항당 24분</li>
                    <li>• 감사: 논술 충분히</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="font-bold mb-2">🎓 핵심전략</h3>
                  <ul className="text-sm text-indigo-100 space-y-1">
                    <li>• 연결회계 완벽 마스터</li>
                    <li>• 세무조정 실무 연습</li>
                    <li>• 감사기준서 암기</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 공통 하단 */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/category/accounting/cpa"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition text-center"
          >
            ← 공인회계사 메인으로
          </Link>
          <Link
            href="/category/accounting/cpa/study/accounting-theory"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition text-center"
          >
            회계학 학습 시작하기 →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인회계사 시험 준비를 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
