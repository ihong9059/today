'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

interface Question {
  id: number;
  topic: string;
  question: string;
  completed: boolean;
}

const topics = [
  { id: 1, name: '신용평가', description: '신용등급, 평가모형, 스코어링' },
  { id: 2, name: 'PD/LGD/EAD', description: '부도확률, 손실률, 익스포저' },
  { id: 3, name: '신용VaR', description: '신용리스크 측정, 모형' },
  { id: 4, name: '포트폴리오관리', description: '집중리스크, 분산효과' },
  { id: 5, name: '바젤규제', description: '자본산출, 표준방법, IRB' },
];

const initialQuestions: Question[] = [
  // 토픽 1: 신용평가
  { id: 1, topic: '신용평가', question: '신용리스크의 정의와 구성요소를 설명하시오.', completed: false },
  { id: 2, topic: '신용평가', question: '신용등급 체계(AAA~D)와 투자등급/투기등급 구분을 설명하시오.', completed: false },
  { id: 3, topic: '신용평가', question: '내부신용등급 시스템의 구축요소를 설명하시오.', completed: false },
  { id: 4, topic: '신용평가', question: '재무비율을 이용한 신용평가 방법을 설명하시오.', completed: false },
  { id: 5, topic: '신용평가', question: '신용스코어링 모형의 종류와 특징을 설명하시오.', completed: false },
  { id: 6, topic: '신용평가', question: 'Z-score 모형과 KMV 모형을 비교 설명하시오.', completed: false },
  { id: 7, topic: '신용평가', question: '로지스틱 회귀분석을 이용한 신용평가 모형을 설명하시오.', completed: false },
  { id: 8, topic: '신용평가', question: '신용등급 전이행렬(Transition Matrix)의 개념과 활용을 설명하시오.', completed: false },
  { id: 9, topic: '신용평가', question: '신용평가 모형의 검증(AR, CAP, ROC)을 설명하시오.', completed: false },
  { id: 10, topic: '신용평가', question: '거시경제변수와 신용리스크의 관계를 설명하시오.', completed: false },
  // 토픽 2: PD/LGD/EAD
  { id: 11, topic: 'PD/LGD/EAD', question: '부도확률(PD)의 정의와 추정방법을 설명하시오.', completed: false },
  { id: 12, topic: 'PD/LGD/EAD', question: 'Through-the-Cycle PD와 Point-in-Time PD의 차이를 설명하시오.', completed: false },
  { id: 13, topic: 'PD/LGD/EAD', question: '부도시손실률(LGD)의 정의와 추정방법을 설명하시오.', completed: false },
  { id: 14, topic: 'PD/LGD/EAD', question: 'LGD에 영향을 미치는 요인(담보, 선순위 등)을 설명하시오.', completed: false },
  { id: 15, topic: 'PD/LGD/EAD', question: '부도시익스포저(EAD)의 정의와 계산방법을 설명하시오.', completed: false },
  { id: 16, topic: 'PD/LGD/EAD', question: '신용환산율(CCF)의 개념과 적용을 설명하시오.', completed: false },
  { id: 17, topic: 'PD/LGD/EAD', question: '예상손실(EL = PD × LGD × EAD) 계산을 설명하시오.', completed: false },
  { id: 18, topic: 'PD/LGD/EAD', question: '담보별 LGD 산출방법을 설명하시오.', completed: false },
  { id: 19, topic: 'PD/LGD/EAD', question: 'Workout LGD와 Market LGD의 차이를 설명하시오.', completed: false },
  { id: 20, topic: 'PD/LGD/EAD', question: '회수율(Recovery Rate)과 LGD의 관계를 설명하시오.', completed: false },
  // 토픽 3: 신용VaR
  { id: 21, topic: '신용VaR', question: '신용VaR의 개념과 시장VaR과의 차이를 설명하시오.', completed: false },
  { id: 22, topic: '신용VaR', question: '비예상손실(UL: Unexpected Loss)의 개념과 계산을 설명하시오.', completed: false },
  { id: 23, topic: '신용VaR', question: 'CreditMetrics 모형의 개요와 계산과정을 설명하시오.', completed: false },
  { id: 24, topic: '신용VaR', question: 'CreditRisk+ 모형의 개요와 특징을 설명하시오.', completed: false },
  { id: 25, topic: '신용VaR', question: 'KMV Portfolio Manager 모형을 설명하시오.', completed: false },
  { id: 26, topic: '신용VaR', question: '부도상관관계(Default Correlation)의 개념과 측정을 설명하시오.', completed: false },
  { id: 27, topic: '신용VaR', question: '자산상관관계와 부도상관관계의 관계를 설명하시오.', completed: false },
  { id: 28, topic: '신용VaR', question: '몬테카를로 시뮬레이션을 이용한 신용VaR 계산을 설명하시오.', completed: false },
  { id: 29, topic: '신용VaR', question: '신용리스크의 분포 특성(Fat tail, 비대칭성)을 설명하시오.', completed: false },
  { id: 30, topic: '신용VaR', question: '신용VaR 모형의 검증방법을 설명하시오.', completed: false },
  // 토픽 4: 포트폴리오관리
  { id: 31, topic: '포트폴리오관리', question: '신용포트폴리오 관리의 목적과 방법을 설명하시오.', completed: false },
  { id: 32, topic: '포트폴리오관리', question: '집중리스크(Concentration Risk)의 유형과 측정을 설명하시오.', completed: false },
  { id: 33, topic: '포트폴리오관리', question: '이름집중리스크(Name Concentration)와 산업집중리스크를 설명하시오.', completed: false },
  { id: 34, topic: '포트폴리오관리', question: '신용포트폴리오의 분산효과 측정을 설명하시오.', completed: false },
  { id: 35, topic: '포트폴리오관리', question: '한계기여도(Marginal Contribution)의 개념과 활용을 설명하시오.', completed: false },
  { id: 36, topic: '포트폴리오관리', question: '신용파생상품(CDS, CLN)을 이용한 신용리스크 이전을 설명하시오.', completed: false },
  { id: 37, topic: '포트폴리오관리', question: '대출채권 매각(Loan Sale)과 유동화를 설명하시오.', completed: false },
  { id: 38, topic: '포트폴리오관리', question: 'CLO(Collateralized Loan Obligation)의 구조와 리스크를 설명하시오.', completed: false },
  { id: 39, topic: '포트폴리오관리', question: '신용한도(Credit Limit) 설정과 관리를 설명하시오.', completed: false },
  { id: 40, topic: '포트폴리오관리', question: '거래상대방 신용리스크(CCR) 관리를 설명하시오.', completed: false },
  // 토픽 5: 바젤규제
  { id: 41, topic: '바젤규제', question: '바젤II 신용리스크 자본산출의 표준방법을 설명하시오.', completed: false },
  { id: 42, topic: '바젤규제', question: '바젤II 신용리스크 자본산출의 IRB 방법(기본/고급)을 설명하시오.', completed: false },
  { id: 43, topic: '바젤규제', question: 'IRB 방법의 위험가중자산(RWA) 계산공식을 설명하시오.', completed: false },
  { id: 44, topic: '바젤규제', question: '자산유형별(기업, 소매, 주거용모기지) 위험가중치를 설명하시오.', completed: false },
  { id: 45, topic: '바젤규제', question: '신용리스크 경감기법(담보, 보증, 신용파생상품)의 인정요건을 설명하시오.', completed: false },
  { id: 46, topic: '바젤규제', question: '만기조정(Maturity Adjustment)의 개념과 계산을 설명하시오.', completed: false },
  { id: 47, topic: '바젤규제', question: '유동화 익스포저의 자본산출 방법을 설명하시오.', completed: false },
  { id: 48, topic: '바젤규제', question: '바젤III의 신용리스크 규제 강화 내용을 설명하시오.', completed: false },
  { id: 49, topic: '바젤규제', question: 'CVA(Credit Valuation Adjustment) 자본규제를 설명하시오.', completed: false },
  { id: 50, topic: '바젤규제', question: '바젤IV의 신용리스크 관련 주요 변경사항을 설명하시오.', completed: false },
];

export default function CreditRiskPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('frm-credit-risk-progress');
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
    localStorage.setItem('frm-credit-risk-progress', JSON.stringify(completedIds));
  };

  const toggleComplete = (id: number) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, completed: !q.completed } : q
    );
    setQuestions(updated);
    saveProgress(updated);
  };

  const openAIModal = (question: string) => {
    const prompt = `재무위험관리사 신용리스크 문제입니다.\n\n문제: ${question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산방법 또는 공식\n4. 바젤규제 관련 내용\n5. 기출 포인트`;
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-orange-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-orange-600 transition">금융</Link>
            <span>/</span>
            <Link href="/category/finance/financial-risk-manager" className="hover:text-orange-600 transition">재무위험관리사</Link>
            <span>/</span>
            <span className="text-orange-600 font-medium">신용리스크</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">신용리스크</h1>
          <p className="text-gray-600 mt-1">신용평가, PD/LGD/EAD, 신용VaR, 포트폴리오관리, 바젤규제</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-orange-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{completedCount} / {questions.length} 문항 완료</p>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-orange-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTopic === null
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-orange-300 text-gray-600'
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
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 text-gray-600'
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
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
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
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(q.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      q.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-orange-500'
                    }`}
                  >
                    {q.completed && <span>✓</span>}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
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
                    className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all text-sm font-medium shadow-md hover:shadow-lg"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-orange-200 text-orange-600 rounded-xl hover:bg-orange-50 transition font-medium"
          >
            ← 재무위험관리사 메인으로
          </Link>
        </div>
      </main>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}
    </div>
  );
}
