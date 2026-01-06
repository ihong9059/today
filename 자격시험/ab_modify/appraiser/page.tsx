'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AppraiserPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const aiQuestions = [
    {
      title: "감정평가 3방식 비교",
      prompt: `감정평가사 시험 준비를 위한 감정평가 3방식을 비교 설명해주세요.

다음 내용을 포함해주세요:
1. 비교방식(거래사례비교법)의 원리와 적용
2. 원가방식(원가법)의 원리와 적용
3. 수익방식(수익환원법)의 원리와 적용
4. 각 방식의 장단점 비교
5. 실무에서의 적용 사례와 출제 포인트`
    },
    {
      title: "부동산 가격공시제도",
      prompt: `감정평가사 시험을 위한 부동산 가격공시제도를 설명해주세요.

다음 순서로 설명해주세요:
1. 표준지공시지가와 개별공시지가
2. 표준주택가격과 개별주택가격
3. 공동주택가격 공시제도
4. 비주거용 부동산 가격공시
5. 가격공시의 효력과 활용`
    },
    {
      title: "2차 논술 작성법",
      prompt: `감정평가사 2차 시험 논술 답안 작성법을 알려주세요.

다음 내용을 포함해주세요:
1. 감정평가서 작성의 기본 구조
2. 평가조건 설정과 가격시점 결정
3. 시산가액 조정과 최종 가격 결정
4. 계산문제 풀이 전략
5. 고득점 답안의 특징`
    }
  ];

  const subjects1st = [
    { name: '민법', desc: '물권법 중심', questions: 40, topics: ['물권총론', '소유권', '용익물권', '담보물권'] },
    { name: '경제학원론', desc: '미시·거시경제', questions: 40, topics: ['수요공급', '시장이론', '거시변수', '경제정책'] },
    { name: '부동산학원론', desc: '부동산 기초이론', questions: 40, topics: ['부동산 특성', '시장분석', '투자분석', '정책론'] },
    { name: '감정평가관계법규', desc: '평가 관련 법률', questions: 40, topics: ['감정평가법', '부동산공시법', '국토계획법', '건축법'] },
    { name: '회계학', desc: '재무회계 중심', questions: 40, topics: ['재무제표', '자산평가', '부채·자본', '현금흐름'] }
  ];

  const subjects2nd = [
    { name: '감정평가실무', desc: '평가서 작성', time: '150분', topics: ['토지평가', '건물평가', '기계기구', '영업권'] },
    { name: '감정평가이론', desc: '논술형', time: '100분', topics: ['평가3방식', '최유효이용', '가치이론', '시장분석'] },
    { name: '감정평가 및 보상법규', desc: '논술형', time: '100분', topics: ['감정평가법', '공익사업법', '보상기준', '이의절차'] }
  ];

  const studyLinks = [
    { name: '감정평가이론', slug: 'appraisal-theory', desc: '평가3방식, 가치이론', icon: '📊' },
    { name: '감정평가법규', slug: 'appraisal-law', desc: '감정평가법, 보상법규', icon: '⚖️' },
    { name: '민법(물권)', slug: 'civil-law', desc: '물권법 핵심 개념', icon: '📜' },
    { name: '경제학', slug: 'economics', desc: '미시·거시경제 이론', icon: '📈' },
    { name: '회계학', slug: 'accounting', desc: '재무회계, 자산평가', icon: '💰' },
    { name: '실무연습', slug: 'practical', desc: '평가서 작성 연습', icon: '✍️' }
  ];

  const schedule2026 = [
    { round: '제35회', apply: '2026.02.03~02.07', test1: '2026.04.25', test2: '2026.07.12', result: '2026.09.18' }
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
            <Link href="/category/legal" className="text-gray-500 hover:text-gray-700">법률·행정</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">감정평가사</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-5xl backdrop-blur-sm">
              🏠
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">감정평가사</h1>
              <p className="text-xl text-emerald-100 mb-4">Certified Appraiser</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                  난이도: ★★★★★
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                  연간 응시자: 약 8,000명
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                  합격률: 1차 25% / 2차 20%
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
                <div className="text-emerald-500 text-2xl mb-2">📝</div>
                <div className="text-sm text-gray-500">1차 시험</div>
                <div className="font-bold">객관식 200문항</div>
                <div className="text-xs text-gray-400 mt-1">5과목, 200분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-teal-500 text-2xl mb-2">✍️</div>
                <div className="text-sm text-gray-500">2차 시험</div>
                <div className="font-bold">논술형 3과목</div>
                <div className="text-xs text-gray-400 mt-1">약 6시간</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-green-500 text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-500">응시료</div>
                <div className="font-bold">1차 30,000원</div>
                <div className="text-xs text-gray-400 mt-1">2차 35,000원</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-blue-500 text-2xl mb-2">🏛️</div>
                <div className="text-sm text-gray-500">주관기관</div>
                <div className="font-bold">국토교통부</div>
                <div className="text-xs text-gray-400 mt-1">Q-Net 접수</div>
              </div>
            </div>

            {/* 자격 개요 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-lg mb-2">감정평가사란?</h3>
                  <p className="leading-relaxed">
                    감정평가사는 토지, 건물, 기계기구, 항공기, 선박, 유가증권, 영업권 등 유·무형의 재산에 대하여
                    경제적 가치를 판정하여 그 결과를 가액으로 표시하는 전문 자격사입니다.
                    부동산 공시가격 산정, 담보평가, 경매·보상평가 등 다양한 분야에서 활동합니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">주요 업무</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>토지·건물 등 부동산 감정평가</li>
                    <li>공시지가 조사·산정</li>
                    <li>담보물건 평가 (은행, 금융기관)</li>
                    <li>공익사업 보상평가</li>
                    <li>경매·공매 감정평가</li>
                    <li>기업가치, 무형자산 평가</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">진출 분야</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['감정평가법인', '개인 감정평가사무소', '금융기관 (은행, 보험)', '공공기관 (LH, 국토부)', '부동산 컨설팅', '자산운용사'].map((field, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg">
                        <span className="text-emerald-500">✓</span>
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
                <span className="text-emerald-500">📚</span> 1차 시험 과목
              </h2>
              <p className="text-gray-600 mb-4">객관식 5지선다형, 과목당 40문항 (총 200문항/200분)</p>
              <div className="space-y-3">
                {subjects1st.map((subject, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:border-emerald-300 transition">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{idx + 1}. {subject.name}</h3>
                        <p className="text-sm text-gray-500">{subject.desc}</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
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
              <div className="mt-4 p-4 bg-emerald-50 rounded-xl">
                <p className="text-sm text-emerald-800">
                  <strong>💡 합격 기준:</strong> 매 과목 40점 이상, 전 과목 평균 60점 이상 (영어 제외)
                </p>
              </div>
            </div>

            {/* 2차 시험 과목 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">✍️</span> 2차 시험 과목
              </h2>
              <p className="text-gray-600 mb-4">논술형, 3과목 (총 약 6시간)</p>
              <div className="space-y-3">
                {subjects2nd.map((subject, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:border-teal-300 transition">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{idx + 1}. {subject.name}</h3>
                        <p className="text-sm text-gray-500">{subject.desc}</p>
                      </div>
                      <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
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
              <div className="mt-4 p-4 bg-teal-50 rounded-xl">
                <p className="text-sm text-teal-800">
                  <strong>💡 합격 기준:</strong> 매 과목 40점 이상, 전 과목 평균 60점 이상
                </p>
              </div>
            </div>

            {/* 추천 공부 순서 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🎯</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-emerald-800">📘 비전공자 (24개월 과정)</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                      <span><strong>기초과정 (6개월)</strong><br/>경제학, 민법 기초이론 학습</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                      <span><strong>1차 심화 (8개월)</strong><br/>5과목 전체 정독 + 문제풀이</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                      <span><strong>1차 마무리 (4개월)</strong><br/>기출문제 10년치 3회독</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
                      <span><strong>2차 준비 (6개월)</strong><br/>실무연습, 논술 답안 작성</span>
                    </li>
                  </ol>
                </div>
                <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-teal-800">📗 전공자 (18개월 과정)</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                      <span><strong>이론 정리 (6개월)</strong><br/>1차 전 과목 핵심 정리</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                      <span><strong>문제풀이 (4개월)</strong><br/>기출분석 + 모의고사</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                      <span><strong>2차 기본 (5개월)</strong><br/>감정평가실무 집중</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
                      <span><strong>2차 실전 (3개월)</strong><br/>실전 모의고사, 시간관리</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 과목별 학습 바로가기 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📖</span> 과목별 학습하기
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {studyLinks.map((subject, idx) => (
                  <Link
                    key={idx}
                    href={`/category/legal/appraiser/study/${subject.slug}`}
                    className="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition group"
                  >
                    <div className="text-2xl mb-2">{subject.icon}</div>
                    <h3 className="font-bold group-hover:text-emerald-600">{subject.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{subject.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI 학습 도우미 */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="mb-4 text-emerald-100">
                AI에게 감정평가사 시험 관련 질문을 해보세요. 복잡한 평가이론도 쉽게 이해할 수 있습니다.
              </p>
              <div className="grid gap-3">
                {aiQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                    className="w-full text-left p-4 bg-white/10 hover:bg-white/20 rounded-xl transition backdrop-blur-sm"
                  >
                    <span className="font-medium">{q.title}</span>
                    <span className="ml-2 text-emerald-200">→</span>
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
                <span className="text-emerald-500">📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-4">
                {schedule2026.map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg text-sm">
                    <div className="font-bold text-emerald-600 mb-2">{item.round}</div>
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
                href="https://www.q-net.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition text-sm font-medium"
              >
                Q-Net 원서접수 바로가기 →
              </a>
            </div>

            {/* 과목별 목표점수 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🎯</span> 1차 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '민법', target: 70, color: 'bg-emerald-500' },
                  { name: '경제학원론', target: 75, color: 'bg-teal-500' },
                  { name: '부동산학원론', target: 80, color: 'bg-cyan-500' },
                  { name: '감정평가관계법규', target: 75, color: 'bg-green-500' },
                  { name: '회계학', target: 65, color: 'bg-lime-500' }
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
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                <p className="text-xs text-emerald-700">
                  <strong>목표 평균:</strong> 73점 이상 (안정권)
                </p>
              </div>
            </div>

            {/* 연계 자격증 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '공인중개사', level: '선취득 추천' },
                  { name: '주택관리사', level: '병행 취득' },
                  { name: '투자자산운용사', level: '금융 연계' },
                  { name: 'CFA/FRM', level: '해외 자격' }
                ].map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm">{cert.name}</span>
                    <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                      {cert.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📚</span> 추천 교재
              </h3>
              <div className="space-y-3">
                {[
                  { title: '감정평가실무 기본서', category: '2차 실무' },
                  { title: '감정평가이론 정리', category: '2차 이론' },
                  { title: '부동산학원론 완성', category: '1차 부동산' },
                  { title: '민법(물권) 핵심정리', category: '1차 민법' }
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
              href="/category/legal/appraiser/exam"
              className="block w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition shadow-lg"
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
          <p className="text-gray-400">© 2026 자격증 가이드. 감정평가사 시험 준비를 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
