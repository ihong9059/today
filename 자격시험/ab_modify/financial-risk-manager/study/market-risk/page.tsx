'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  topic: string;
  question: string;
  completed: boolean;
}

const topics = [
  { id: 1, name: 'VaR 개념', description: 'VaR 정의, 계산방법, 한계' },
  { id: 2, name: '금리리스크', description: '금리변동, 듀레이션, 갭분석' },
  { id: 3, name: '환율리스크', description: '환율변동, 헤지전략' },
  { id: 4, name: '주가리스크', description: '주식포트폴리오, 베타' },
  { id: 5, name: '파생상품리스크', description: '옵션, 선물, 스왑 리스크' },
];

const initialQuestions: Question[] = [
  // 토픽 1: VaR 개념
  { id: 1, topic: 'VaR 개념', question: 'VaR(Value at Risk)의 정의와 3가지 구성요소를 설명하시오.', completed: false },
  { id: 2, topic: 'VaR 개념', question: '신뢰수준(95%, 99%)과 보유기간의 선택 기준을 설명하시오.', completed: false },
  { id: 3, topic: 'VaR 개념', question: '분산-공분산법(Parametric VaR)의 계산과정을 설명하시오.', completed: false },
  { id: 4, topic: 'VaR 개념', question: '역사적 시뮬레이션법의 개념과 장단점을 설명하시오.', completed: false },
  { id: 5, topic: 'VaR 개념', question: '몬테카를로 시뮬레이션법의 개념과 적용방법을 설명하시오.', completed: false },
  { id: 6, topic: 'VaR 개념', question: '정규분포 가정의 한계와 Fat Tail 문제를 설명하시오.', completed: false },
  { id: 7, topic: 'VaR 개념', question: 'VaR의 한계점(비가산성, 극단적 손실 미반영)을 설명하시오.', completed: false },
  { id: 8, topic: 'VaR 개념', question: 'Expected Shortfall(CVaR)의 개념과 VaR과의 차이를 설명하시오.', completed: false },
  { id: 9, topic: 'VaR 개념', question: 'VaR 백테스팅의 목적과 방법(쿠폼테스트, 독립성검정)을 설명하시오.', completed: false },
  { id: 10, topic: 'VaR 개념', question: 'VaR 모형의 검증과 모형리스크 관리방안을 설명하시오.', completed: false },
  // 토픽 2: 금리리스크
  { id: 11, topic: '금리리스크', question: '금리리스크의 유형(재가격리스크, 기준금리리스크, 수익률곡선리스크)을 설명하시오.', completed: false },
  { id: 12, topic: '금리리스크', question: '듀레이션의 개념과 계산방법을 설명하시오.', completed: false },
  { id: 13, topic: '금리리스크', question: '수정듀레이션과 유효듀레이션의 차이를 설명하시오.', completed: false },
  { id: 14, topic: '금리리스크', question: '컨벡시티의 개념과 필요성을 설명하시오.', completed: false },
  { id: 15, topic: '금리리스크', question: '듀레이션 갭(Duration Gap) 분석을 설명하시오.', completed: false },
  { id: 16, topic: '금리리스크', question: '금리감응도 갭(Interest Rate Gap) 분석을 설명하시오.', completed: false },
  { id: 17, topic: '금리리스크', question: '수익률곡선의 형태변화와 리스크 영향을 설명하시오.', completed: false },
  { id: 18, topic: '금리리스크', question: '금리VaR 계산방법을 설명하시오.', completed: false },
  { id: 19, topic: '금리리스크', question: '금리스왑을 이용한 금리리스크 헤지를 설명하시오.', completed: false },
  { id: 20, topic: '금리리스크', question: '채권포트폴리오의 금리리스크 관리전략을 설명하시오.', completed: false },
  // 토픽 3: 환율리스크
  { id: 21, topic: '환율리스크', question: '환율리스크의 유형(거래위험, 환산위험, 경제적위험)을 설명하시오.', completed: false },
  { id: 22, topic: '환율리스크', question: '환포지션의 개념과 순포지션 계산을 설명하시오.', completed: false },
  { id: 23, topic: '환율리스크', question: '환율VaR의 계산방법을 설명하시오.', completed: false },
  { id: 24, topic: '환율리스크', question: '선물환(Forward)을 이용한 환헤지 방법을 설명하시오.', completed: false },
  { id: 25, topic: '환율리스크', question: '통화선물과 통화옵션을 이용한 환헤지를 설명하시오.', completed: false },
  { id: 26, topic: '환율리스크', question: '통화스왑을 이용한 환리스크 관리를 설명하시오.', completed: false },
  { id: 27, topic: '환율리스크', question: '환율변동성 추정방법(EWMA, GARCH)을 설명하시오.', completed: false },
  { id: 28, topic: '환율리스크', question: '복수통화 포트폴리오의 환리스크 측정을 설명하시오.', completed: false },
  { id: 29, topic: '환율리스크', question: '헤지비율(Hedge Ratio) 결정방법을 설명하시오.', completed: false },
  { id: 30, topic: '환율리스크', question: '자연적 헤지(Natural Hedge)와 운영적 헤지를 설명하시오.', completed: false },
  // 토픽 4: 주가리스크
  { id: 31, topic: '주가리스크', question: '주식리스크의 유형(개별리스크, 시장리스크)을 설명하시오.', completed: false },
  { id: 32, topic: '주가리스크', question: '베타(Beta)의 개념과 계산방법을 설명하시오.', completed: false },
  { id: 33, topic: '주가리스크', question: 'CAPM을 이용한 기대수익률 계산을 설명하시오.', completed: false },
  { id: 34, topic: '주가리스크', question: '주식포트폴리오의 VaR 계산방법을 설명하시오.', completed: false },
  { id: 35, topic: '주가리스크', question: '분산투자효과와 포트폴리오 리스크 감소를 설명하시오.', completed: false },
  { id: 36, topic: '주가리스크', question: '주가지수 선물을 이용한 헤지전략을 설명하시오.', completed: false },
  { id: 37, topic: '주가리스크', question: '최소분산헤지비율 계산방법을 설명하시오.', completed: false },
  { id: 38, topic: '주가리스크', question: '트래킹에러(Tracking Error)의 개념과 관리를 설명하시오.', completed: false },
  { id: 39, topic: '주가리스크', question: '스타일 리스크(Style Risk)와 팩터 모형을 설명하시오.', completed: false },
  { id: 40, topic: '주가리스크', question: '벤치마크 대비 상대 VaR을 설명하시오.', completed: false },
  // 토픽 5: 파생상품리스크
  { id: 41, topic: '파생상품리스크', question: '옵션의 그릭스(Greeks: Delta, Gamma, Vega, Theta, Rho)를 설명하시오.', completed: false },
  { id: 42, topic: '파생상품리스크', question: '델타헤지의 개념과 방법을 설명하시오.', completed: false },
  { id: 43, topic: '파생상품리스크', question: '감마리스크와 동적 헤지를 설명하시오.', completed: false },
  { id: 44, topic: '파생상품리스크', question: '베가리스크(변동성리스크)와 관리방안을 설명하시오.', completed: false },
  { id: 45, topic: '파생상품리스크', question: '옵션 포지션의 VaR 계산방법을 설명하시오.', completed: false },
  { id: 46, topic: '파생상품리스크', question: '선물계약의 기초자산리스크와 베이시스리스크를 설명하시오.', completed: false },
  { id: 47, topic: '파생상품리스크', question: '스왑의 리스크 요인과 측정방법을 설명하시오.', completed: false },
  { id: 48, topic: '파생상품리스크', question: '파생상품의 거래상대방 신용리스크(CCR)를 설명하시오.', completed: false },
  { id: 49, topic: '파생상품리스크', question: 'CVA(Credit Valuation Adjustment)의 개념을 설명하시오.', completed: false },
  { id: 50, topic: '파생상품리스크', question: '파생상품 포트폴리오의 통합리스크 측정을 설명하시오.', completed: false },
];

export default function MarketRiskPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('frm-market-risk-progress');
    if (saved) {
      const completedIds = JSON.parse(saved) as number[];
      setQuestions(prev => prev.map(q => ({
        ...q,
        completed: completedIds.includes(q.id)
      })));
    }
  }, []);

  const saveProgress = (updatedQuestions: Question[]) => {
    const completedIds = updatedQuestions.filter(q => q.completed).map(q => q.id);
    localStorage.setItem('frm-market-risk-progress', JSON.stringify(completedIds));
  };

  const toggleComplete = (id: number) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, completed: !q.completed } : q
    );
    setQuestions(updated);
    saveProgress(updated);
  };

  const openAIModal = (question: string) => {
    const prompt = `재무위험관리사 시장리스크 문제입니다.\n\n문제: ${question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산방법 또는 공식\n4. 실무 적용\n5. 기출 포인트`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const filteredQuestions = selectedTopic
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  const completedCount = questions.filter(q => q.completed).length;
  const progressPercent = Math.round((completedCount / questions.length) * 100);

  const getTopicProgress = (topicName: string) => {
    const topicQuestions = questions.filter(q => q.topic === topicName);
    const completed = topicQuestions.filter(q => q.completed).length;
    return { completed, total: topicQuestions.length };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-rose-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-rose-600 transition">금융</Link>
            <span>/</span>
            <Link href="/category/finance/financial-risk-manager" className="hover:text-rose-600 transition">재무위험관리사</Link>
            <span>/</span>
            <span className="text-rose-600 font-medium">시장리스크</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">시장리스크</h1>
          <p className="text-gray-600 mt-1">VaR, 금리리스크, 환율리스크, 주가리스크, 파생상품리스크</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-rose-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-rose-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{completedCount} / {questions.length} 문항 완료</p>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-rose-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTopic === null
                  ? 'border-rose-500 bg-rose-50 text-rose-700'
                  : 'border-gray-200 hover:border-rose-300 text-gray-600'
              }`}
            >
              <p className="font-bold">전체 보기</p>
              <p className="text-sm mt-1">{completedCount}/{questions.length}</p>
            </button>
            {topics.map(topic => {
              const progress = getTopicProgress(topic.name);
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.name)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedTopic === topic.name
                      ? 'border-rose-500 bg-rose-50 text-rose-700'
                      : 'border-gray-200 hover:border-rose-300 text-gray-600'
                  }`}
                >
                  <p className="font-bold text-sm">{topic.name}</p>
                  <p className="text-xs mt-1 opacity-75">{topic.description}</p>
                  <p className="text-xs mt-2">{progress.completed}/{progress.total}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {selectedTopic ? selectedTopic : '전체 문항'} ({filteredQuestions.length}문항)
          </h2>
          <div className="space-y-4">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  q.completed
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 hover:border-rose-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(q.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      q.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-rose-500'
                    }`}
                  >
                    {q.completed && <span>✓</span>}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-rose-100 text-rose-700 rounded-full font-medium">
                        {q.topic}
                      </span>
                      <span className="text-xs text-gray-400">#{q.id}</span>
                    </div>
                    <p className={`text-gray-800 ${q.completed ? 'line-through opacity-60' : ''}`}>
                      {q.question}
                    </p>
                  </div>
                  <button
                    onClick={() => openAIModal(q.question)}
                    className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all text-sm font-medium shadow-md hover:shadow-lg"
                  >
                    AI 풀이
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/category/finance/financial-risk-manager"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-rose-200 text-rose-600 rounded-xl hover:bg-rose-50 transition font-medium"
          >
            ← 재무위험관리사 메인으로
          </Link>
        </div>
      </main>

      {/* AI Modal */}
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}
    </div>
  );
}
