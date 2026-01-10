'use client';

import { useState } from 'react';

export default function DistributionManager1ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'info'>('written');

  const subjects = [
    {
      num: 1,
      name: '유통경영',
      items: 20,
      time: '30분',
      passRate: '40%',
      difficulty: '★★★★☆',
      description: '유통기업의 경영전략, 조직관리, 인사관리, 재무관리 전반',
      topics: [
        { name: '유통전략', desc: '유통환경 분석, 경쟁전략, 성장전략, 글로벌 전략' },
        { name: '유통조직', desc: '조직구조, 조직문화, 리더십, 의사결정' },
        { name: '인사관리', desc: '채용·교육, 평가·보상, 동기부여, 노사관계' },
        { name: '재무관리', desc: '재무분석, 투자결정, 자금조달, 원가관리' },
        { name: '점포관리', desc: '점포운영, 매장관리, 고객관리, 품질관리' },
        { name: '프랜차이즈', desc: 'FC 시스템, 가맹사업, 본부-가맹점 관계' },
        { name: '서비스경영', desc: '서비스품질, 고객만족, 서비스마케팅' },
        { name: '유통윤리', desc: 'CSR, 지속가능경영, 윤리경영' },
      ],
      strategy: '유통전략과 조직관리 중심으로 학습. 최신 유통 트렌드(무인매장, 라이브커머스 등) 파악 필수.',
      studyPath: '/category/trade/distribution-manager-1/study/distribution-management',
    },
    {
      num: 2,
      name: '물류경영',
      items: 20,
      time: '30분',
      passRate: '35%',
      difficulty: '★★★★☆',
      description: '공급사슬관리, 재고관리, 운송·보관, 물류정보시스템 관리',
      topics: [
        { name: 'SCM', desc: '공급사슬관리, 수요예측, 공급업체 관리, 협업' },
        { name: '재고관리', desc: 'EOQ, JIT, ABC분석, 안전재고, 재고회전율' },
        { name: '운송관리', desc: '운송수단, 운송경로, 배차관리, 운송비용' },
        { name: '보관하역', desc: '창고관리, 하역장비, 피킹, 패킹' },
        { name: '물류센터', desc: 'DC/FC 설계, 레이아웃, 자동화시스템' },
        { name: '국제물류', desc: '해운, 항공, Incoterms, 통관' },
        { name: '물류정보', desc: 'WMS, TMS, 물류추적, RFID' },
        { name: '물류비관리', desc: '물류원가계산, ABC, 물류아웃소싱' },
      ],
      strategy: 'SCM 전체 흐름 이해 후 세부 영역 학습. 재고관리 공식(EOQ, 안전재고)은 반드시 암기.',
      studyPath: '/category/trade/distribution-manager-1/study/logistics-management',
    },
    {
      num: 3,
      name: '상권분석',
      items: 20,
      time: '30분',
      passRate: '45%',
      difficulty: '★★★☆☆',
      description: '상권이론, 입지분석, 매출예측, 점포개발 실무',
      topics: [
        { name: '상권이론', desc: '중심지이론, 소매인력법칙, 허프모델, 상권범위' },
        { name: '상권조사', desc: '상권유형, 경쟁분석, 유동인구조사, 접근성분석' },
        { name: '입지분석', desc: '입지유형, 입지요인, 입지평가, 상가분류' },
        { name: '매출예측', desc: '유추법, 회귀분석, 체크리스트법' },
        { name: '점포개발', desc: '개점계획, 출점전략, 리모델링, 폐점관리' },
        { name: '상가임대차', desc: '권리금, 임대료산정, 상가건물임대차보호법' },
        { name: 'GIS분석', desc: '상권분석 소프트웨어, 빅데이터 활용' },
        { name: '상권변화', desc: '젠트리피케이션, 상권이동, 상권성쇠' },
      ],
      strategy: '상권이론(허프모델, 소매인력법칙)은 필수. 실제 상권분석 사례를 통해 응용력 배양.',
      studyPath: '/category/trade/distribution-manager-1/study/business-strategy',
    },
    {
      num: 4,
      name: '유통마케팅',
      items: 20,
      time: '30분',
      passRate: '38%',
      difficulty: '★★★★☆',
      description: '마케팅전략, 소비자행동, 판촉관리, CRM, 브랜드관리',
      topics: [
        { name: '마케팅전략', desc: 'STP, 4P/7P, 마케팅믹스, 포지셔닝' },
        { name: '소비자행동', desc: '구매의사결정, 소비자심리, 라이프스타일' },
        { name: '판촉관리', desc: '판촉믹스, POP, 할인전략, 쿠폰' },
        { name: '가격전략', desc: '가격결정, 가격차별화, 심리적 가격' },
        { name: 'CRM', desc: '고객생애가치, 로열티프로그램, 고객세분화' },
        { name: '브랜드관리', desc: 'PB/NB, 브랜드자산, 브랜드확장' },
        { name: 'VMD', desc: '비주얼머천다이징, 진열기법, 매장연출' },
        { name: '디지털마케팅', desc: '소셜미디어, 인플루언서, 퍼포먼스마케팅' },
      ],
      strategy: '마케팅 기본이론(STP, 4P)을 완벽히 이해하고, 최신 디지털마케팅 트렌드 파악.',
      studyPath: '/category/trade/distribution-manager-1/study/marketing',
    },
    {
      num: 5,
      name: '유통정보',
      items: 20,
      time: '30분',
      passRate: '48%',
      difficulty: '★★★☆☆',
      description: '유통정보시스템, POS/EDI, 빅데이터, e-커머스',
      topics: [
        { name: 'POS시스템', desc: 'POS 구성, 판매데이터분석, 재고연동' },
        { name: 'EDI', desc: '전자문서교환, VAN, 표준화' },
        { name: 'ERP/SCM', desc: '전사적자원관리, 공급망시스템 연계' },
        { name: '바코드/RFID', desc: '상품식별, 물류추적, IoT' },
        { name: '빅데이터', desc: '데이터분석, AI활용, 예측모델' },
        { name: 'e-커머스', desc: '온라인쇼핑몰, O2O, 옴니채널' },
        { name: '결제시스템', desc: '간편결제, 핀테크, 블록체인' },
        { name: '정보보안', desc: '개인정보보호, 보안시스템, 인증' },
      ],
      strategy: 'IT 용어와 약어 암기 필수. e-커머스 및 빅데이터 관련 최신 동향 파악.',
      studyPath: '/category/trade/distribution-manager-1/study/distribution-info',
    },
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
            <a href="/category/trade" className="text-gray-600 hover:text-blue-600">무역·물류</a>
            <span className="text-gray-300">›</span>
            <a href="/category/trade/distribution-manager-1" className="text-gray-600 hover:text-blue-600">유통관리사 1급</a>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">📝</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">유통관리사 1급 시험 상세</h1>
              <p className="text-emerald-100">필기시험 5과목 100문항 · 2시간 30분</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-[57px] z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('written')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'written'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'info'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📋 시험안내
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'written' && (
          <div className="space-y-8">
            {/* 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📋</span> 필기시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-600">5과목</p>
                  <p className="text-sm text-gray-600">시험과목</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-teal-600">100문항</p>
                  <p className="text-sm text-gray-600">객관식 4지선다</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-cyan-600">2시간 30분</p>
                  <p className="text-sm text-gray-600">150분</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">60점 이상</p>
                  <p className="text-sm text-gray-600">평균 / 과목당 40점</p>
                </div>
              </div>
            </section>

            {/* 과목별 상세 */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-emerald-500">📚</span> 과목별 상세
              </h2>

              {subjects.map((subject) => (
                <div key={subject.num} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 text-white">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                          {subject.num}
                        </span>
                        <div>
                          <h3 className="text-lg font-bold">{subject.name}</h3>
                          <p className="text-sm text-emerald-100">{subject.description}</p>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <p>{subject.items}문항 / {subject.time}</p>
                        <p>난이도: {subject.difficulty}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="font-bold text-gray-800 mb-3">📌 주요 출제 토픽</h4>
                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      {subject.topics.map((topic) => (
                        <div key={topic.name} className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium text-emerald-700">{topic.name}</p>
                          <p className="text-sm text-gray-600">{topic.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 items-center justify-between border-t pt-4">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">합격률: <strong className="text-emerald-600">{subject.passRate}</strong></span>
                      </div>
                      <a
                        href={subject.studyPath}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition text-sm font-medium"
                      >
                        📖 학습하기 →
                      </a>
                    </div>

                    <div className="mt-4 bg-emerald-50 rounded-lg p-3">
                      <p className="text-sm text-emerald-800">
                        <strong>💡 학습 전략:</strong> {subject.strategy}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* 합격 전략 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🏆</span> 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">✅ 핵심 합격 포인트</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>유통경영과 물류경영에서 과락 주의 (난이도 높음)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>상권분석, 유통정보에서 고득점하여 평균 확보</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>최신 유통 트렌드(옴니채널, 라이브커머스 등) 파악</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>기출문제 3개년 반복 학습으로 출제 패턴 파악</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">📅 학습 일정 (3개월)</h3>
                  <div className="space-y-2">
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <p className="font-medium text-emerald-700">1개월차: 기초 다지기</p>
                      <p className="text-sm text-gray-600">전과목 이론서 1회독, 개념 정리</p>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-3">
                      <p className="font-medium text-teal-700">2개월차: 심화 학습</p>
                      <p className="text-sm text-gray-600">과목별 문제풀이, 취약점 보완</p>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-3">
                      <p className="font-medium text-cyan-700">3개월차: 실전 대비</p>
                      <p className="text-sm text-gray-600">기출문제 풀이, 모의고사, 오답정리</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 출제 경향 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📊</span> 최근 출제 경향
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-medium text-gray-700">출제 영역</th>
                      <th className="text-center p-3 font-medium text-gray-700">매회 출제</th>
                      <th className="text-center p-3 font-medium text-gray-700">자주 출제</th>
                      <th className="text-center p-3 font-medium text-gray-700">간헐 출제</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-3 text-gray-800">유통전략·SCM</td>
                      <td className="p-3 text-center">🔴</td>
                      <td className="p-3 text-center"></td>
                      <td className="p-3 text-center"></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-800">재고관리(EOQ/JIT)</td>
                      <td className="p-3 text-center">🔴</td>
                      <td className="p-3 text-center"></td>
                      <td className="p-3 text-center"></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-800">상권이론(허프모델)</td>
                      <td className="p-3 text-center">🔴</td>
                      <td className="p-3 text-center"></td>
                      <td className="p-3 text-center"></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-800">마케팅믹스(4P/STP)</td>
                      <td className="p-3 text-center">🔴</td>
                      <td className="p-3 text-center"></td>
                      <td className="p-3 text-center"></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-800">POS/EDI/바코드</td>
                      <td className="p-3 text-center">🔴</td>
                      <td className="p-3 text-center"></td>
                      <td className="p-3 text-center"></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-800">옴니채널/O2O</td>
                      <td className="p-3 text-center"></td>
                      <td className="p-3 text-center">🟠</td>
                      <td className="p-3 text-center"></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-800">빅데이터/AI 활용</td>
                      <td className="p-3 text-center"></td>
                      <td className="p-3 text-center">🟠</td>
                      <td className="p-3 text-center"></td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-800">친환경물류/ESG</td>
                      <td className="p-3 text-center"></td>
                      <td className="p-3 text-center"></td>
                      <td className="p-3 text-center">🟡</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-8">
            {/* 시험 안내 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📋</span> 시험 안내
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">📌 응시자격</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-1">•</span>
                        <span>학력, 경력 제한 없음 (누구나 응시 가능)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-1">•</span>
                        <span>유통관리사 2급 미소지자도 1급 직접 응시 가능</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">💰 응시료</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-2xl font-bold text-emerald-600 mb-2">18,800원</p>
                    <p className="text-sm text-gray-600">결제: 신용카드, 계좌이체, 가상계좌</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 원서접수 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📝</span> 원서접수 안내
              </h2>
              <div className="space-y-4">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h3 className="font-bold text-emerald-700 mb-2">온라인 접수</h3>
                  <p className="text-gray-600">대한상공회의소 자격평가사업단 (license.korcham.net)</p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-gray-800">접수기간</p>
                    <p className="text-sm text-gray-600">시험 약 5주 전 (평일 5일간)</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-gray-800">필요서류</p>
                    <p className="text-sm text-gray-600">증명사진 1매 (6개월 이내)</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-gray-800">수험표</p>
                    <p className="text-sm text-gray-600">접수 후 출력 (신분증 필수)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 합격 기준 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">✅</span> 합격 기준
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-lg p-6">
                  <h3 className="font-bold text-emerald-700 text-lg mb-2">평균 점수</h3>
                  <p className="text-3xl font-bold text-emerald-600 mb-2">60점 이상</p>
                  <p className="text-sm text-gray-600">전 과목 평균 점수 기준</p>
                </div>
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="font-bold text-red-700 text-lg mb-2">과락 기준</h3>
                  <p className="text-3xl font-bold text-red-600 mb-2">40점 미만</p>
                  <p className="text-sm text-gray-600">1개 과목이라도 40점 미만 시 불합격</p>
                </div>
              </div>
            </section>

            {/* 자격 취득 후 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🎓</span> 자격 취득 후 혜택
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">👔 취업·승진</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>유통업계 취업 시 가산점 및 우대</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>대기업 유통본부 입사 시 필수/우대 자격</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>프랜차이즈 본사 슈퍼바이저 자격 요건</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">📜 공인 혜택</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>대형마트 신규 출점 시 유통관리사 배치 의무</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>유통산업발전법 기반 국가공인자격</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>학점은행제 학점 인정 (14학점)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 시험장 안내 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🏫</span> 시험장 안내
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-2">시험 장소</h3>
                  <p className="text-sm text-gray-600">전국 상공회의소 지정 고사장</p>
                  <p className="text-sm text-gray-600">서울, 부산, 대구, 광주, 대전 등 주요 도시</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-2">준비물</h3>
                  <p className="text-sm text-gray-600">수험표, 신분증, 컴퓨터용 사인펜</p>
                  <p className="text-sm text-gray-600">※ 계산기 사용 불가</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 자격시험 가이드. 본 사이트는 학습 참고용이며, 정확한 정보는 대한상공회의소에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
