'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CPAPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const aiQuestions = [
    {
      title: "재무회계 연결재무제표",
      prompt: `공인회계사 시험 준비를 위한 연결재무제표를 설명해주세요.

다음 내용을 포함해주세요:
1. 연결재무제표의 개념과 작성 목적
2. 지배기업과 종속기업의 판단 기준
3. 연결조정분개의 주요 유형
4. 비지배지분의 처리 방법
5. 내부거래 제거 및 출제 포인트`
    },
    {
      title: "원가관리회계 CVP분석",
      prompt: `공인회계사 시험을 위한 CVP(원가-조업도-이익) 분석을 설명해주세요.

다음 순서로 설명해주세요:
1. CVP분석의 기본 가정과 공식
2. 공헌이익과 손익분기점 계산
3. 목표이익 달성 판매량 산출
4. 안전한계율과 영업레버리지
5. 복수제품의 CVP분석 방법`
    },
    {
      title: "2차 주관식 답안 작성법",
      prompt: `공인회계사 2차 시험 주관식 답안 작성법을 알려주세요.

다음 내용을 포함해주세요:
1. 재무회계 장문형 답안 구성법
2. 원가관리회계 계산문제 풀이 전략
3. 세무회계 세무조정 답안 작성
4. 회계감사 논술형 답안 구조
5. 시간 배분 및 고득점 전략`
    }
  ];

  const subjects1st = [
    { name: '경영학', desc: '경영전략, 조직행동', questions: 40, topics: ['경영전략', '조직행동', '마케팅', '재무관리'] },
    { name: '경제원론', desc: '미시·거시경제학', questions: 40, topics: ['수요공급', '시장구조', '국민소득', '통화금융'] },
    { name: '상법', desc: '회사법 중심', questions: 40, topics: ['회사설립', '주식·주주', '이사회', '합병·분할'] },
    { name: '세법개론', desc: '세법 기초', questions: 40, topics: ['소득세', '법인세', '부가가치세', '상속증여세'] },
    { name: '회계학', desc: '재무+원가회계', questions: 80, topics: ['재무회계', '원가회계', '회계감사', '정부회계'] }
  ];

  const subjects2nd = [
    { name: '재무회계', desc: '심화 논술형', time: '240분', topics: ['금융상품', '수익인식', '연결재무제표', '파생상품'] },
    { name: '원가관리회계', desc: '계산·논술형', time: '120분', topics: ['CVP분석', 'ABC', '대체가격', '성과평가'] },
    { name: '세무회계', desc: '세무조정', time: '120분', topics: ['법인세조정', '소득세', '부가가치세', '세무조사'] },
    { name: '회계감사', desc: '논술형', time: '180분', topics: ['감사기준', '내부통제', '감사증거', '감사보고서'] }
  ];

  const studyLinks = [
    { name: '경영학', slug: 'business-admin', desc: '경영전략, 마케팅', icon: '💼' },
    { name: '경제원론', slug: 'economics', desc: '미시·거시경제', icon: '📈' },
    { name: '상법', slug: 'commercial-law', desc: '회사법 핵심', icon: '⚖️' },
    { name: '세법개론', slug: 'tax-intro', desc: '세법 기초이론', icon: '📋' },
    { name: '회계학', slug: 'accounting-theory', desc: '재무·원가회계', icon: '📊' },
    { name: '재무회계(2차)', slug: 'financial-accounting', desc: '심화 연결·금융', icon: '💰' },
    { name: '실무연습', slug: 'practical', desc: '2차 답안작성', icon: '✍️' }
  ];

  const schedule2026 = [
    { round: '제61회', apply: '2026.01.20~01.24', test1: '2026.02.22', test2: '2026.06.27~28', result: '2026.09.04' }
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
            <span className="text-blue-600 font-medium">공인회계사</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-5xl backdrop-blur-sm">
              📊
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">공인회계사</h1>
              <p className="text-xl text-blue-100 mb-4">Certified Public Accountant (CPA)</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                  난이도: ★★★★★
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                  연간 응시자: 약 15,000명
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                  합격률: 1차 20% / 2차 15%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-blue-500 text-2xl mb-2">📝</div>
                <div className="text-sm text-gray-500">1차 시험</div>
                <div className="font-bold">객관식 240문항</div>
                <div className="text-xs text-gray-400 mt-1">5과목, 300분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-indigo-500 text-2xl mb-2">✍️</div>
                <div className="text-sm text-gray-500">2차 시험</div>
                <div className="font-bold">주관식 4과목</div>
                <div className="text-xs text-gray-400 mt-1">2일간, 약 11시간</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-green-500 text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-500">응시료</div>
                <div className="font-bold">1차 20,000원</div>
                <div className="text-xs text-gray-400 mt-1">2차 20,000원</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-purple-500 text-2xl mb-2">🏛️</div>
                <div className="text-sm text-gray-500">주관기관</div>
                <div className="font-bold">금융감독원</div>
                <div className="text-xs text-gray-400 mt-1">금융위원회</div>
              </div>
            </div>

            {/* 자격 개요 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-lg mb-2">공인회계사란?</h3>
                  <p className="leading-relaxed">
                    공인회계사(CPA)는 타인의 의뢰에 의하여 재무제표의 감사·증명, 세무대리,
                    경영컨설팅 등 회계에 관한 전문적인 업무를 수행하는 국가공인 전문자격사입니다.
                    대한민국 3대 전문자격(변호사, 의사, 회계사) 중 하나로 높은 사회적 인정을 받습니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">주요 업무</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>재무제표 회계감사 및 검토</li>
                    <li>세무조정 및 세무대리</li>
                    <li>기업인수합병(M&A) 자문</li>
                    <li>경영컨설팅 및 내부감사</li>
                    <li>IPO(기업공개) 자문</li>
                    <li>법정관리·회생 자문</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">진출 분야</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Big4 회계법인', '중소 회계법인', '일반기업 재경팀', '금융기관 (은행, 증권)', '공공기관 (금감원, 국세청)', '개업 세무·회계사무소'].map((field, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                        <span className="text-blue-500">✓</span>
                        <span className="text-sm">{field}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 1차 시험 과목 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-500">📚</span> 1차 시험 과목
              </h2>
              <p className="text-gray-600 mb-4">객관식 5지선다형, 총 240문항 (300분, 영어 별도)</p>
              <div className="space-y-3">
                {subjects1st.map((subject, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{idx + 1}. {subject.name}</h3>
                        <p className="text-sm text-gray-500">{subject.desc}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {subject.questions}문항
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {subject.topics.map((topic, tidx) => (
                        <span key={tidx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-800">
                  <strong>💡 합격 기준:</strong> 매 과목 40점 이상, 전 과목 평균 60점 이상 (영어 별도 기준점수)
                </p>
              </div>
            </div>

            {/* 2차 시험 과목 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-indigo-500">✍️</span> 2차 시험 과목
              </h2>
              <p className="text-gray-600 mb-4">주관식(논술형+계산형), 4과목 (2일간, 총 660분)</p>
              <div className="space-y-3">
                {subjects2nd.map((subject, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{idx + 1}. {subject.name}</h3>
                        <p className="text-sm text-gray-500">{subject.desc}</p>
                      </div>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                        {subject.time}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {subject.topics.map((topic, tidx) => (
                        <span key={tidx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
                <p className="text-sm text-indigo-800">
                  <strong>💡 합격 기준:</strong> 매 과목 40점 이상, 전 과목 평균 60점 이상 (상대평가)
                </p>
              </div>
            </div>

            {/* 추천 공부 순서 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-500">🎯</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-blue-800">📘 비전공자 (30개월 과정)</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                      <span><strong>기초과정 (6개월)</strong><br/>회계원리, 재무회계 기초</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                      <span><strong>1차 심화 (10개월)</strong><br/>5과목 전체 이론 + 문제풀이</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                      <span><strong>1차 마무리 (4개월)</strong><br/>기출문제 15년치 3회독</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
                      <span><strong>2차 준비 (10개월)</strong><br/>4과목 심화 + 모의고사</span>
                    </li>
                  </ol>
                </div>
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-indigo-800">📗 전공자 (24개월 과정)</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                      <span><strong>이론 정리 (6개월)</strong><br/>1차 전 과목 핵심 정리</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                      <span><strong>문제풀이 (6개월)</strong><br/>기출분석 + 모의고사</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                      <span><strong>2차 기본 (8개월)</strong><br/>재무회계, 원가관리 집중</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
                      <span><strong>2차 실전 (4개월)</strong><br/>실전 모의고사, 시간관리</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 과목별 학습 바로가기 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-500">📖</span> 과목별 학습하기
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {studyLinks.map((subject, idx) => (
                  <Link
                    key={idx}
                    href={`/category/accounting/cpa/study/${subject.slug}`}
                    className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition group"
                  >
                    <div className="text-2xl mb-2">{subject.icon}</div>
                    <h3 className="font-bold group-hover:text-blue-600">{subject.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{subject.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI 학습 도우미 */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="mb-4 text-blue-100">
                AI에게 공인회계사 시험 관련 질문을 해보세요. 복잡한 회계처리도 쉽게 이해할 수 있습니다.
              </p>
              <div className="grid gap-3">
                {aiQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                    className="w-full text-left p-4 bg-white/10 hover:bg-white/20 rounded-xl transition backdrop-blur-sm"
                  >
                    <span className="font-medium">{q.title}</span>
                    <span className="ml-2 text-blue-200">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* 시험 일정 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-blue-500">📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-4">
                {schedule2026.map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg text-sm">
                    <div className="font-bold text-blue-600 mb-2">{item.round}</div>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex justify-between">
                        <span>원서접수</span>
                        <span className="font-medium">{item.apply}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>1차 시험</span>
                        <span className="font-medium">{item.test1}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2차 시험</span>
                        <span className="font-medium">{item.test2}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>최종발표</span>
                        <span className="font-medium">{item.result}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="https://cpa.fss.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium"
              >
                금감원 CPA 사이트 바로가기 →
              </a>
            </div>

            {/* 과목별 목표점수 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-blue-500">🎯</span> 1차 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '경영학', target: 75, color: 'bg-blue-500' },
                  { name: '경제원론', target: 70, color: 'bg-indigo-500' },
                  { name: '상법', target: 65, color: 'bg-purple-500' },
                  { name: '세법개론', target: 70, color: 'bg-violet-500' },
                  { name: '회계학', target: 80, color: 'bg-cyan-500' }
                ].map((subject, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{subject.name}</span>
                      <span className="font-medium">{subject.target}점</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${subject.color} h-2 rounded-full`}
                        style={{ width: `${subject.target}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>목표 평균:</strong> 72점 이상 (안정권)
                </p>
              </div>
            </div>

            {/* 연계 자격증 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-blue-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '세무사', level: '동시취득 가능' },
                  { name: 'AICPA', level: '미국 CPA' },
                  { name: 'CFA', level: '금융분석사' },
                  { name: 'FRM', level: '리스크관리' }
                ].map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm">{cert.name}</span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {cert.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-blue-500">📚</span> 추천 교재
              </h3>
              <div className="space-y-3">
                {[
                  { title: '중급회계 (IFRS)', category: '재무회계' },
                  { title: '원가관리회계', category: '원가회계' },
                  { title: '세법개론', category: '세무회계' },
                  { title: '회계감사기준서 해설', category: '회계감사' }
                ].map((book, idx) => (
                  <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                    <div className="text-sm font-medium">{book.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{book.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 시험 바로가기 */}
            <Link
              href="/category/accounting/cpa/exam"
              className="block w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-bold hover:from-blue-600 hover:to-indigo-600 transition shadow-lg"
            >
              시험 상세정보 보기 →
            </Link>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인회계사 시험 준비를 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
