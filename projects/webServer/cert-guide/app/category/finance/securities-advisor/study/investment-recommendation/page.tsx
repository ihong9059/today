'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'recommendation-basics',
    name: '투자권유 기초',
    color: 'from-teal-500 to-teal-400',
    questions: [
      { id: 1, question: '투자권유의 정의와 법적 개념에 대해 설명하시오.', answer: '특정 투자자를 대상으로 금융투자상품의 매매 또는 투자자문·일임계약 체결을 권유하는 행위(자본시장법 제9조)', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자권유의 정의와 법적 개념에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '투자권유 절차의 단계별 내용을 설명하시오.', answer: '투자자 정보 파악 → 투자자 유형 분류 → 적합성 확인 → 상품 설명 → 서면 확인 → 계약 체결', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자권유 절차의 단계별 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '투자권유대행인의 자격요건과 등록절차를 설명하시오.', answer: '금융투자협회 등록, 증권투자권유자문인력 등 자격 필요, 금융투자회사의 위탁계약 체결 후 영업 가능', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자권유대행인의 자격요건과 등록절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '투자권유준칙의 내용과 수립 의무를 설명하시오.', answer: '금융투자회사가 수립하는 투자권유 기준, 투자자 보호 및 건전한 영업질서 확립 목적, 금융위원회 규정에 따른 의무사항 포함', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자권유준칙의 내용과 수립 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '투자권유 없이 거래하는 경우의 요건을 설명하시오.', answer: '투자자가 투자권유를 희망하지 않는 의사를 서면으로 표시, 적정성 원칙 적용 대상 상품의 경우 적정성 확인 필요', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자권유 없이 거래하는 경우의 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'suitability-principle',
    name: '적합성 원칙',
    color: 'from-cyan-500 to-cyan-400',
    questions: [
      { id: 1, question: '적합성 원칙의 정의와 법적 근거를 설명하시오.', answer: '투자자의 투자목적, 재산상황, 투자경험 등에 비추어 적합하지 않은 투자권유 금지(자본시장법 제46조)', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 적합성 원칙의 정의와 법적 근거를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '투자자 정보 파악 항목을 구체적으로 나열하시오.', answer: '투자목적, 재산상황(소득/자산), 투자경험, 금융상품 이해도, 위험감수능력, 연령, 투자기간', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자자 정보 파악 항목을 구체적으로 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '투자자 정보 확인서의 유효기간과 갱신의무를 설명하시오.', answer: '일반투자자 대상 2년 유효, 투자자 정보 변경시 즉시 갱신, 유효기간 경과시 재확인 필요', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자자 정보 확인서의 유효기간과 갱신의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '투자자 유형 분류 기준과 분류 방법을 설명하시오.', answer: '위험감수능력에 따라 안정형, 안정추구형, 위험중립형, 적극투자형, 공격투자형 등으로 분류, 투자성향 설문 활용', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자자 유형 분류 기준과 분류 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '적합성 판단시 고려해야 할 상품 특성을 설명하시오.', answer: '상품의 위험등급, 복잡성 정도, 환금성, 투자기간, 원금손실 가능성, 레버리지 여부', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 적합성 판단시 고려해야 할 상품 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'appropriateness-principle',
    name: '적정성 원칙',
    color: 'from-sky-500 to-sky-400',
    questions: [
      { id: 1, question: '적정성 원칙의 정의와 적용 대상 상품을 설명하시오.', answer: '투자권유 없이 복잡한 금융상품 거래시 투자자가 상품 특성과 위험을 이해했는지 확인하는 원칙(파생상품, 파생결합증권 등)', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 적정성 원칙의 정의와 적용 대상 상품을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '적정성 확인 절차와 필요 서류를 설명하시오.', answer: '투자자 정보 파악 → 적정성 판단 → 결과 통보 → 부적정시 서면확인서 징구, 적정성 판단 결과 기록·유지', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 적정성 확인 절차와 필요 서류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '적합성 원칙과 적정성 원칙의 차이점을 비교하시오.', answer: '적합성: 투자권유시 적용/부적합 투자권유 금지, 적정성: 비권유 거래시 적용/부적정시 고지 후 확인서 징구로 거래 가능', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 적합성 원칙과 적정성 원칙의 차이점을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '적정성 판단 결과 부적정시 조치사항을 설명하시오.', answer: '투자자에게 부적정 사실과 그 사유를 서면으로 고지, 투자자의 서면 확인 후 거래 진행 가능', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 적정성 판단 결과 부적정시 조치사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '적정성 원칙 적용이 제외되는 경우를 설명하시오.', answer: '전문투자자 거래, 장내파생상품 거래, 기존에 같은 유형 상품 거래 경험이 있는 경우 등', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 적정성 원칙 적용이 제외되는 경우를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'duty-of-explanation',
    name: '설명의무',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: '설명의무의 정의와 법적 근거를 설명하시오.', answer: '금융상품 내용, 투자위험 등 중요사항을 일반투자자가 이해할 수 있도록 설명해야 하는 의무(자본시장법 제47조)', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 설명의무의 정의와 법적 근거를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '증권 투자시 설명해야 할 주요 내용을 나열하시오.', answer: '상품 특성 및 위험, 원금손실 가능성, 수수료·비용, 중도환매 조건, 투자대상, 운용방법, 과거수익률', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 증권 투자시 설명해야 할 주요 내용을 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '설명 확인서 징구의 의미와 방법을 설명하시오.', answer: '투자자가 설명을 이해했음을 서면(전자서면 포함)으로 확인, 서명 또는 기명날인 방식, 5년간 보관의무', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 설명 확인서 징구의 의미와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '핵심설명서의 기재사항과 교부의무를 설명하시오.', answer: '상품 핵심내용 요약, 원금손실 위험, 수수료 등 중요사항 기재, 계약체결 전 사전 교부 필수, 간결명료하게 작성', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 핵심설명서의 기재사항과 교부의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '설명의무 위반시 법적 제재와 민사책임을 설명하시오.', answer: '손해배상책임(입증책임 전환), 과태료, 행정제재(영업정지·인허가취소), 금융소비자보호법상 과징금 부과', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 설명의무 위반시 법적 제재와 민사책임을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
  {
    id: 'investor-protection',
    name: '투자자 보호',
    color: 'from-indigo-500 to-indigo-400',
    questions: [
      { id: 1, question: '일반투자자와 전문투자자의 구분 기준을 설명하시오.', answer: '전문투자자: 금융기관, 상장법인, 금융투자상품 잔고 5억원 이상 개인/법인 등, 그 외는 일반투자자로 분류', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 일반투자자와 전문투자자의 구분 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 2, question: '일반투자자의 전문투자자 전환 요건과 절차를 설명하시오.', answer: '금융투자상품 잔고 5억원 이상, 1년 이상 거래경험, 서면 신청 후 금융투자회사 승인', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 일반투자자의 전문투자자 전환 요건과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 3, question: '금융소비자보호법상 투자자 보호 제도를 설명하시오.', answer: '청약철회권, 위법계약해지권, 자료열람요구권, 분쟁조정 신청권, 손해배상 입증책임 전환', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 금융소비자보호법상 투자자 보호 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 4, question: '고령투자자 등 취약계층 보호 강화 조치를 설명하시오.', answer: '고령(65세 이상), 은퇴자 등에 대해 숙려제도(2영업일), 녹취의무, 가족확인 절차, 모니터링 강화', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 고령투자자 등 취약계층 보호 강화 조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
      { id: 5, question: '투자자예탁금 별도예치제도와 투자자보호기금을 설명하시오.', answer: '예탁금 별도예치: 예탁결제원에 고유재산과 분리 예치, 투자자보호기금: 회사 파산시 1인당 5천만원 한도 보상', prompt: `증권투자권유자문인력 투자권유 문제입니다.\n\n문제: 투자자예탁금 별도예치제도와 투자자보호기금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트` },
    ],
  },
];

export default function InvestmentRecommendationPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['recommendation-basics']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('securities-advisor-recommendation-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('securities-advisor-recommendation-progress', JSON.stringify(completedQuestions));
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
            <a href="/" className="text-gray-600 hover:text-teal-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/finance" className="text-gray-600 hover:text-teal-600">금융</a>
            <span className="text-gray-300">›</span>
            <a href="/category/finance/securities-advisor" className="text-gray-600 hover:text-teal-600">증권투자권유자문인력</a>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">투자권유</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">💼</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">투자권유</h1>
              <p className="text-teal-100">증권투자권유자문인력 - 투자권유 절차, 적합성/적정성 원칙, 설명의무, 투자자 보호</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-teal-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all" style={{ width: `${getTotalProgress()}%` }} />
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
                          <p className="font-medium text-gray-800 mb-2"><span className="text-teal-500 mr-2">Q{q.id}.</span>{q.question}</p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border"><span className="font-medium text-green-600">A.</span> {q.answer}</p>
                        </div>
                        <button onClick={() => openAIModal(q.prompt)} className="px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition">AI</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
