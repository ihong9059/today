'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'recommendation-basics',
    name: '투자권유 기초',
    color: 'from-cyan-500 to-cyan-400',
    questions: [
      { id: 1, question: '투자권유의 정의와 범위에 대해 설명하시오.', answer: '특정 투자자를 대상으로 금융투자상품 매매 또는 투자자문/일임계약 체결을 권유하는 행위', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자권유의 정의와 범위에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '투자권유 절차의 주요 단계를 설명하시오.', answer: '투자자 정보 파악 → 투자자 유형 분류 → 적합성 확인 → 설명의무 이행 → 계약 체결', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자권유 절차의 주요 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '투자권유대행인의 자격요건과 등록절차를 설명하시오.', answer: '금융투자협회 등록, 펀드투자권유자문인력 자격 필요, 금융투자회사의 위탁계약 필요', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자권유대행인의 자격요건과 등록절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '투자권유 없이 거래하는 경우의 요건을 설명하시오.', answer: '투자자가 투자권유 희망하지 않는 의사 표시, 서면 확인서 징구, 적정성 원칙 적용', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자권유 없이 거래하는 경우의 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '투자권유준칙의 주요 내용과 목적을 설명하시오.', answer: '금융투자회사가 수립하는 투자권유 기준, 투자자 보호 및 건전한 영업질서 확립 목적', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자권유준칙의 주요 내용과 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'suitability-principle',
    name: '적합성 원칙',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: '적합성 원칙의 정의와 법적 근거를 설명하시오.', answer: '투자자의 투자목적, 재산상황, 투자경험 등에 비추어 적합하지 않은 상품 투자권유 금지(자본시장법 제46조)', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 적합성 원칙의 정의와 법적 근거를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '투자자 정보 파악 항목을 나열하시오.', answer: '투자목적, 재산상황, 투자경험, 금융상품 이해도, 위험감수능력, 투자기간', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자자 정보 파악 항목을 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '투자자 정보 확인서의 유효기간과 갱신절차를 설명하시오.', answer: '일반투자자 2년 유효, 변경시 갱신, 재확인 의무', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자자 정보 확인서의 유효기간과 갱신절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '투자자 유형 분류 기준과 방법을 설명하시오.', answer: '위험감수능력에 따라 안정형, 안정추구형, 위험중립형, 적극투자형, 공격투자형 등으로 분류', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자자 유형 분류 기준과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '적합성 판단시 고려해야 할 투자상품 특성을 설명하시오.', answer: '투자상품의 위험등급, 복잡성, 환금성, 투자기간, 원금손실 가능성', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 적합성 판단시 고려해야 할 투자상품 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'appropriateness-principle',
    name: '적정성 원칙',
    color: 'from-teal-500 to-teal-400',
    questions: [
      { id: 1, question: '적정성 원칙의 정의와 적용 대상을 설명하시오.', answer: '투자권유 없이 파생상품 등 거래시 투자자가 상품 특성/위험을 이해했는지 확인하는 원칙', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 적정성 원칙의 정의와 적용 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '적합성 원칙과 적정성 원칙의 차이점을 설명하시오.', answer: '적합성: 투자권유시 적용, 적정성: 투자권유 없는 거래시 적용, 적정성은 경고의무 중심', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 적합성 원칙과 적정성 원칙의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '적정성 원칙 적용 대상 금융상품을 나열하시오.', answer: '파생상품, 파생결합증권, 고위험 펀드, 조건부자본증권 등 복잡한 금융투자상품', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 적정성 원칙 적용 대상 금융상품을 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '적정성 판단 결과 부적정시 조치사항을 설명하시오.', answer: '투자자에게 부적정 사실 고지, 서면 확인서 징구, 확인 후 거래 진행 가능', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 적정성 판단 결과 부적정시 조치사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '적정성 확인 절차와 필요 서류를 설명하시오.', answer: '투자자 정보 파악 → 적정성 판단 → 결과 통보 → 서면확인서 징구', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 적정성 확인 절차와 필요 서류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'duty-of-explanation',
    name: '설명의무',
    color: 'from-sky-500 to-sky-400',
    questions: [
      { id: 1, question: '설명의무의 정의와 법적 근거를 설명하시오.', answer: '금융상품 내용, 위험 등 중요사항을 일반투자자가 이해할 수 있도록 설명해야 하는 의무(자본시장법 제47조)', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 설명의무의 정의와 법적 근거를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '펀드 투자시 설명해야 할 주요 내용을 나열하시오.', answer: '펀드 특성/위험, 원금손실 가능성, 수수료, 환매조건, 투자대상, 운용방법', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 펀드 투자시 설명해야 할 주요 내용을 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '설명 확인서 징구의 의미와 방법을 설명하시오.', answer: '투자자가 설명을 이해했음을 서면으로 확인, 서명/기명날인 방식, 보관의무 있음', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 설명 확인서 징구의 의미와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '핵심설명서의 기재사항과 교부의무를 설명하시오.', answer: '상품 핵심내용 요약, 원금손실 위험, 수수료, 민원/분쟁처리 절차 등 기재, 사전 교부 필수', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 핵심설명서의 기재사항과 교부의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '설명의무 위반시 법적 제재와 책임을 설명하시오.', answer: '손해배상책임, 과태료, 행정제재, 민사상 손해배상 청구권 발생', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 설명의무 위반시 법적 제재와 책임을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'investor-protection',
    name: '투자자 보호',
    color: 'from-indigo-500 to-indigo-400',
    questions: [
      { id: 1, question: '일반투자자와 전문투자자의 구분 기준을 설명하시오.', answer: '금융기관, 상장법인, 금융투자상품 잔고 5억원 이상 개인/법인 등이 전문투자자, 그 외 일반투자자', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 일반투자자와 전문투자자의 구분 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '전문투자자에 대한 투자권유시 규제 완화 내용을 설명하시오.', answer: '적합성 원칙, 설명의무 면제, 계약서류 교부 의무 완화', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 전문투자자에 대한 투자권유시 규제 완화 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '일반투자자의 전문투자자 전환 요건을 설명하시오.', answer: '금융투자상품 잔고 5억원 이상, 1년 이상 거래경험, 서면 신청 필요', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 일반투자자의 전문투자자 전환 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '취약계층 투자자에 대한 보호강화 조치를 설명하시오.', answer: '고령투자자, 은퇴자 등에 대해 추가 설명, 숙려제도, 녹취 등 강화된 보호조치 시행', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 취약계층 투자자에 대한 보호강화 조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '투자자예탁금별도예치제도의 목적과 내용을 설명하시오.', answer: '투자자 재산 보호 목적, 예탁결제원에 별도 예치, 금융투자회사 고유재산과 분리', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자자예탁금별도예치제도의 목적과 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'prohibited-conduct',
    name: '금지행위',
    color: 'from-violet-500 to-violet-400',
    questions: [
      { id: 1, question: '부당권유행위의 유형을 나열하고 설명하시오.', answer: '허위/과장 설명, 확정수익 보장, 손실보전 약속, 부당한 투자권유, 강요/위협', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 부당권유행위의 유형을 나열하고 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '불초청 권유(Cold Calling) 금지 규정을 설명하시오.', answer: '투자자 요청 없이 방문/전화 등으로 투자권유하는 행위 금지, 일부 예외 존재', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 불초청 권유(Cold Calling) 금지 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '재권유 금지 규정과 예외 사유를 설명하시오.', answer: '투자자 거부의사 표시시 재권유 금지, 1개월 경과 또는 다른 상품시 예외', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 재권유 금지 규정과 예외 사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '손실보전/이익보장 금지 규정을 설명하시오.', answer: '투자손실 보전, 확정 이익 보장 약속 금지, 위반시 형사처벌 대상', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 손실보전/이익보장 금지 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '불건전영업행위의 유형과 제재를 설명하시오.', answer: '허위광고, 시세조종, 내부자거래, 이해충돌거래 등, 영업정지/과징금/형사처벌', prompt: `펀드투자권유자문인력 투자권유 문제입니다.\n\n문제: 불건전영업행위의 유형과 제재를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
];

export default function InvestmentRecommendationPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['recommendation-basics']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fund-advisor-recommendation-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('fund-advisor-recommendation-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleQuestion = (topicId: string, questionId: number) => {
    setCompletedQuestions(prev => {
      const topicCompleted = prev[topicId] || [];
      const newCompleted = topicCompleted.includes(questionId)
        ? topicCompleted.filter(id => id !== questionId)
        : [...topicCompleted, questionId];
      return { ...prev, [topicId]: newCompleted };
    });
  };

  const getTopicProgress = (topicId: string, total: number) => {
    const completed = completedQuestions[topicId]?.length || 0;
    return Math.round((completed / total) * 100);
  };

  const getTotalProgress = () => {
    const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
    const totalCompleted = Object.values(completedQuestions).reduce((acc, arr) => acc + arr.length, 0);
    return Math.round((totalCompleted / totalQuestions) * 100);
  };

  const openAIModal = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-cyan-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/finance" className="text-gray-600 hover:text-cyan-600">금융</a>
            <span className="text-gray-300">›</span>
            <a href="/category/finance/fund-advisor" className="text-gray-600 hover:text-cyan-600">펀드투자권유자문인력</a>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">투자권유</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">💼</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">투자권유</h1>
              <p className="text-cyan-100">펀드투자권유자문인력 - 투자권유 절차, 적합성/적정성 원칙, 설명의무</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-cyan-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all" style={{ width: `${getTotalProgress()}%` }} />
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button onClick={() => toggleTopic(topic.id)} className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{topic.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-sm">{topic.questions.length}문항</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-white/30 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }} />
                  </div>
                  <span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span>
                  <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span>
                </div>
              </button>
              {expandedTopics.includes(topic.id) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                          {completedQuestions[topic.id]?.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2"><span className="text-cyan-500 mr-2">Q{q.id}.</span>{q.question}</p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border"><span className="font-medium text-green-600">A.</span> {q.answer}</p>
                        </div>
                        <button onClick={() => openAIModal(q.prompt)} className="px-3 py-1 bg-cyan-100 text-cyan-600 rounded-lg text-sm hover:bg-cyan-200 transition">AI</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
