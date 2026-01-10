'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LaborAttorneyPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const aiQuestions = [
    {
      title: "노동법 기초 개념",
      prompt: `공인노무사 시험 준비를 위한 노동법 기초 개념을 설명해주세요.

다음 내용을 포함해주세요:
1. 노동법의 체계와 구조
2. 근로기준법의 핵심 원칙
3. 노동조합법의 주요 내용
4. 개별적 근로관계와 집단적 노사관계
5. 최근 판례 동향과 출제 포인트`
    },
    {
      title: "사회보험법 핵심정리",
      prompt: `공인노무사 시험을 위한 사회보험법 핵심 내용을 정리해주세요.

다음 순서로 설명해주세요:
1. 4대 사회보험의 체계와 특징
2. 국민연금법의 핵심 포인트
3. 건강보험법의 주요 내용
4. 고용보험법과 산재보험법 비교
5. 시험 출제 빈도가 높은 주제`
    },
    {
      title: "2차 논술 작성법",
      prompt: `공인노무사 2차 시험 논술 답안 작성법을 알려주세요.

다음 내용을 포함해주세요:
1. 논술 답안의 기본 구조
2. 판례 인용 방법과 주의점
3. 논점별 서술 전략
4. 시간 배분 및 분량 조절
5. 고득점 답안의 특징`
    }
  ];

  const subjects1st = [
    { name: '노동법(1)', desc: '개별적 근로관계법', questions: 25, topics: ['근로기준법', '근로계약', '임금', '근로시간'] },
    { name: '노동법(2)', desc: '집단적 노사관계법', questions: 25, topics: ['노동조합법', '단체교섭', '쟁의행위', '부당노동행위'] },
    { name: '민법', desc: '민법 총칙·채권', questions: 25, topics: ['법률행위', '채권총론', '계약법', '불법행위'] },
    { name: '사회보험법', desc: '4대 사회보험', questions: 25, topics: ['국민연금', '건강보험', '고용보험', '산재보험'] },
    { name: '경제학원론', desc: '선택 (택1)', questions: 25, topics: ['미시경제', '거시경제', '노동경제', '국제경제'] }
  ];

  const subjects2nd = [
    { name: '노동법', desc: '논술형', time: '120분', topics: ['근로기준법', '노동조합법', '노동쟁의조정법', '판례분석'] },
    { name: '인사노무관리론', desc: '논술형', time: '90분', topics: ['인적자원관리', '노사관계', '보상관리', '인사평가'] },
    { name: '행정쟁송법', desc: '논술형', time: '90분', topics: ['행정소송', '행정심판', '노동위원회', '불복절차'] },
    { name: '경영조직론', desc: '논술형', time: '90분', topics: ['조직이론', '조직행동', '리더십', '조직문화'] }
  ];

  const studyLinks = [
    { name: '노동법', slug: 'labor-law', desc: '개별적·집단적 근로관계법 핵심', icon: '⚖️' },
    { name: '민법', slug: 'civil-law', desc: '총칙, 채권법 핵심 개념', icon: '📜' },
    { name: '사회보험법', slug: 'social-insurance', desc: '4대 사회보험 완전정복', icon: '🏥' },
    { name: '경영조직론', slug: 'business-organization', desc: '조직이론과 행동 분석', icon: '🏢' },
    { name: '노동경제학', slug: 'labor-economics', desc: '노동시장 이론과 분석', icon: '📊' },
    { name: '인사노무관리론', slug: 'hr-management', desc: '인적자원관리 전략', icon: '👥' }
  ];

  const schedule2026 = [
    { round: '제33회', apply: '2026.01.06~01.12', test1: '2026.02.22', test2: '2026.06.14', result: '2026.08.07' },
    { round: '제34회', apply: '2026.07.06~07.12', test1: '2026.08.22', test2: '2026.12.05', result: '2027.01.29' }
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
            <span className="text-amber-600 font-medium">공인노무사</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-5xl backdrop-blur-sm">
              👔
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">공인노무사</h1>
              <p className="text-xl text-amber-100 mb-4">Certified Public Labor Relations Attorney (CPLRA)</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                  난이도: ★★★★★
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                  연간 응시자: 약 1.2만명
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                  합격률: 1차 25% / 2차 8%
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
                <div className="text-amber-500 text-2xl mb-2">📝</div>
                <div className="text-sm text-gray-500">1차 시험</div>
                <div className="font-bold">객관식 125문항</div>
                <div className="text-xs text-gray-400 mt-1">150분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-orange-500 text-2xl mb-2">✍️</div>
                <div className="text-sm text-gray-500">2차 시험</div>
                <div className="font-bold">논술형 4과목</div>
                <div className="text-xs text-gray-400 mt-1">약 6시간</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-green-500 text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-500">응시료</div>
                <div className="font-bold">1차 30,000원</div>
                <div className="text-xs text-gray-400 mt-1">2차 32,000원</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-blue-500 text-2xl mb-2">🏛️</div>
                <div className="text-sm text-gray-500">주관기관</div>
                <div className="font-bold">고용노동부</div>
                <div className="text-xs text-gray-400 mt-1">Q-Net 접수</div>
              </div>
            </div>

            {/* 자격 개요 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-amber-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-lg mb-2">공인노무사란?</h3>
                  <p className="leading-relaxed">
                    공인노무사는 노동관계 법령에 따라 관계 기관에 대한 신고·신청·보고·진술·청구(이의신청·심사청구·심판청구 포함)
                    및 권리구제 등의 대행 또는 대리, 노동관계 법령에 따른 서류의 작성, 노무관리에 관한 상담·지도를 수행하는
                    노동 분야의 전문 자격사입니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">주요 업무</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>노동위원회 부당해고·부당노동행위 구제신청 대리</li>
                    <li>근로감독관 진정·고소·고발 대리</li>
                    <li>취업규칙, 단체협약 작성 및 자문</li>
                    <li>임금체계, 인사제도 설계 컨설팅</li>
                    <li>노사분쟁 조정 및 중재</li>
                    <li>산재보험, 고용보험 업무 대행</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">진출 분야</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['개인 노무사 사무소', '노무법인', '기업 인사노무팀', '노동조합', '공공기관', '노동위원회'].map((field, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
                        <span className="text-amber-500">✓</span>
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
                <span className="text-amber-500">📚</span> 1차 시험 과목
              </h2>
              <p className="text-gray-600 mb-4">객관식 5지선다형, 과목당 25문항 (총 125문항/150분)</p>
              <div className="space-y-3">
                {subjects1st.map((subject, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:border-amber-300 transition">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{idx + 1}. {subject.name}</h3>
                        <p className="text-sm text-gray-500">{subject.desc}</p>
                      </div>
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
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
              <div className="mt-4 p-4 bg-amber-50 rounded-xl">
                <p className="text-sm text-amber-800">
                  <strong>💡 합격 기준:</strong> 매 과목 40점 이상, 전 과목 평균 60점 이상
                </p>
              </div>
            </div>

            {/* 2차 시험 과목 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-orange-500">✍️</span> 2차 시험 과목
              </h2>
              <p className="text-gray-600 mb-4">논술형, 4과목 (총 약 6시간)</p>
              <div className="space-y-3">
                {subjects2nd.map((subject, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:border-orange-300 transition">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{idx + 1}. {subject.name}</h3>
                        <p className="text-sm text-gray-500">{subject.desc}</p>
                      </div>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
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
              <div className="mt-4 p-4 bg-orange-50 rounded-xl">
                <p className="text-sm text-orange-800">
                  <strong>💡 합격 기준:</strong> 매 과목 40점 이상, 전 과목 평균 60점 이상
                </p>
              </div>
            </div>

            {/* 추천 공부 순서 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-amber-500">🎯</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-amber-800">📘 비전공자 (18개월 과정)</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                      <span><strong>기초과정 (3개월)</strong><br/>노동법 기초이론, 민법 총칙</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                      <span><strong>1차 심화 (6개월)</strong><br/>노동법(1)(2), 사회보험법 정독</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                      <span><strong>1차 마무리 (3개월)</strong><br/>기출문제, 모의고사 집중</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
                      <span><strong>2차 준비 (6개월)</strong><br/>논술 연습, 사례형 문제</span>
                    </li>
                  </ol>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                  <h3 className="font-bold text-lg mb-3 text-orange-800">📗 전공자 (12개월 과정)</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                      <span><strong>이론 정리 (4개월)</strong><br/>1차 전 과목 속성 정리</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                      <span><strong>문제풀이 (2개월)</strong><br/>기출 15개년 완벽 분석</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">3</span>
                      <span><strong>2차 기본 (4개월)</strong><br/>논점 정리, 답안 구조화</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">4</span>
                      <span><strong>2차 실전 (2개월)</strong><br/>시간 내 답안 작성 연습</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 과목별 학습 바로가기 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-amber-500">📖</span> 과목별 학습하기
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {studyLinks.map((subject, idx) => (
                  <Link
                    key={idx}
                    href={`/category/legal/labor-attorney/study/${subject.slug}`}
                    className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition group"
                  >
                    <div className="text-2xl mb-2">{subject.icon}</div>
                    <h3 className="font-bold group-hover:text-amber-600">{subject.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{subject.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI 학습 도우미 */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="mb-4 text-amber-100">
                AI에게 공인노무사 시험 관련 질문을 해보세요. 복잡한 노동법 개념도 쉽게 이해할 수 있습니다.
              </p>
              <div className="grid gap-3">
                {aiQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                    className="w-full text-left p-4 bg-white/10 hover:bg-white/20 rounded-xl transition backdrop-blur-sm"
                  >
                    <span className="font-medium">{q.title}</span>
                    <span className="ml-2 text-amber-200">→</span>
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
                <span className="text-amber-500">📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-4">
                {schedule2026.map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg text-sm">
                    <div className="font-bold text-amber-600 mb-2">{item.round}</div>
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
                className="block mt-4 text-center py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition text-sm font-medium"
              >
                Q-Net 원서접수 바로가기 →
              </a>
            </div>

            {/* 과목별 목표점수 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-amber-500">🎯</span> 1차 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '노동법(1)', target: 80, color: 'bg-amber-500' },
                  { name: '노동법(2)', target: 75, color: 'bg-orange-500' },
                  { name: '민법', target: 70, color: 'bg-yellow-500' },
                  { name: '사회보험법', target: 75, color: 'bg-lime-500' },
                  { name: '경제학원론', target: 65, color: 'bg-green-500' }
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
              <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                <p className="text-xs text-amber-700">
                  <strong>목표 평균:</strong> 73점 이상 (안정권)
                </p>
              </div>
            </div>

            {/* 연계 자격증 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-amber-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '사회보험노무사', level: '연계 자격' },
                  { name: '경영지도사', level: '유사 자격' },
                  { name: '공인중개사', level: '병행 취득' },
                  { name: 'PHR/SPHR', level: '국제 자격' }
                ].map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm">{cert.name}</span>
                    <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded">
                      {cert.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-amber-500">📚</span> 추천 교재
              </h3>
              <div className="space-y-3">
                {[
                  { title: '김OO 노동법 기본서', category: '1차 노동법' },
                  { title: '이OO 민법 정리', category: '1차 민법' },
                  { title: '사회보험법 완성', category: '1차 사회보험' },
                  { title: '2차 논술 완벽대비', category: '2차 대비' }
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
              href="/category/legal/labor-attorney/exam"
              className="block w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition shadow-lg"
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
          <p className="text-gray-400">© 2026 자격증 가이드. 공인노무사 시험 준비를 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
