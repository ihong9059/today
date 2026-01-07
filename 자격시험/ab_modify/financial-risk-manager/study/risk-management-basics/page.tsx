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
  { id: 1, name: '리스크 개념', description: '리스크의 정의, 분류, 특성' },
  { id: 2, name: '리스크 유형', description: '시장, 신용, 운영, 유동성 리스크' },
  { id: 3, name: '관리체계', description: '리스크관리 조직, 프로세스' },
  { id: 4, name: 'ERM', description: '전사적리스크관리, 통합관리' },
  { id: 5, name: '규제환경', description: '바젤규제, 금융감독' },
];

const initialQuestions: Question[] = [
  // 토픽 1: 리스크 개념
  { id: 1, topic: '리스크 개념', question: '리스크의 정의와 불확실성과의 차이점을 설명하시오.', completed: false },
  { id: 2, topic: '리스크 개념', question: '금융리스크의 특성(측정가능성, 관리가능성, 상호의존성)을 설명하시오.', completed: false },
  { id: 3, topic: '리스크 개념', question: '기대손실(Expected Loss)과 비기대손실(Unexpected Loss)을 설명하시오.', completed: false },
  { id: 4, topic: '리스크 개념', question: '리스크와 수익의 관계(Risk-Return Trade-off)를 설명하시오.', completed: false },
  { id: 5, topic: '리스크 개념', question: '체계적 리스크와 비체계적 리스크의 차이를 설명하시오.', completed: false },
  { id: 6, topic: '리스크 개념', question: '리스크 측정의 기본 개념(확률분포, 표준편차, VaR)을 설명하시오.', completed: false },
  { id: 7, topic: '리스크 개념', question: '리스크관리의 목적과 기대효과를 설명하시오.', completed: false },
  { id: 8, topic: '리스크 개념', question: '위험조정성과측정(RAPM)의 개념과 종류를 설명하시오.', completed: false },
  { id: 9, topic: '리스크 개념', question: 'RAROC의 계산방법과 활용을 설명하시오.', completed: false },
  { id: 10, topic: '리스크 개념', question: '경제적자본(Economic Capital)의 개념과 산출을 설명하시오.', completed: false },
  // 토픽 2: 리스크 유형
  { id: 11, topic: '리스크 유형', question: '시장리스크의 정의와 세부 유형(금리, 환율, 주가)을 설명하시오.', completed: false },
  { id: 12, topic: '리스크 유형', question: '신용리스크의 정의와 구성요소(PD, LGD, EAD)를 설명하시오.', completed: false },
  { id: 13, topic: '리스크 유형', question: '운영리스크의 정의와 7가지 손실유형을 설명하시오.', completed: false },
  { id: 14, topic: '리스크 유형', question: '유동성리스크의 정의와 유형(자금조달, 시장유동성)을 설명하시오.', completed: false },
  { id: 15, topic: '리스크 유형', question: '금리리스크의 유형(재가격리스크, 기준금리리스크, 옵션리스크)을 설명하시오.', completed: false },
  { id: 16, topic: '리스크 유형', question: '환리스크의 유형(거래위험, 환산위험, 경제적위험)을 설명하시오.', completed: false },
  { id: 17, topic: '리스크 유형', question: '전략리스크와 평판리스크의 개념을 설명하시오.', completed: false },
  { id: 18, topic: '리스크 유형', question: '모형리스크(Model Risk)의 개념과 관리방안을 설명하시오.', completed: false },
  { id: 19, topic: '리스크 유형', question: '집중리스크(Concentration Risk)의 개념과 유형을 설명하시오.', completed: false },
  { id: 20, topic: '리스크 유형', question: '법적리스크와 컴플라이언스 리스크를 설명하시오.', completed: false },
  // 토픽 3: 관리체계
  { id: 21, topic: '관리체계', question: '리스크관리 조직체계(이사회, 리스크관리위원회, 리스크관리부서)를 설명하시오.', completed: false },
  { id: 22, topic: '관리체계', question: '3선 방어모델(Three Lines of Defense)을 설명하시오.', completed: false },
  { id: 23, topic: '관리체계', question: 'CRO(최고리스크관리책임자)의 역할과 책임을 설명하시오.', completed: false },
  { id: 24, topic: '관리체계', question: '리스크관리 프로세스(식별, 측정, 모니터링, 통제)를 설명하시오.', completed: false },
  { id: 25, topic: '관리체계', question: '리스크한도(Risk Limit) 설정과 관리방법을 설명하시오.', completed: false },
  { id: 26, topic: '관리체계', question: '리스크 보고체계와 보고서 종류를 설명하시오.', completed: false },
  { id: 27, topic: '관리체계', question: '리스크 문화와 리스크 거버넌스의 중요성을 설명하시오.', completed: false },
  { id: 28, topic: '관리체계', question: '리스크 인식지표(KRI: Key Risk Indicator)의 설정과 활용을 설명하시오.', completed: false },
  { id: 29, topic: '관리체계', question: '리스크 자가평가(RCSA)의 개념과 수행방법을 설명하시오.', completed: false },
  { id: 30, topic: '관리체계', question: '내부통제시스템과 리스크관리의 관계를 설명하시오.', completed: false },
  // 토픽 4: ERM
  { id: 31, topic: 'ERM', question: '전사적리스크관리(ERM)의 정의와 필요성을 설명하시오.', completed: false },
  { id: 32, topic: 'ERM', question: 'COSO ERM 프레임워크의 구성요소를 설명하시오.', completed: false },
  { id: 33, topic: 'ERM', question: 'ERM과 전통적 리스크관리의 차이점을 설명하시오.', completed: false },
  { id: 34, topic: 'ERM', question: '리스크 통합관리(Integrated Risk Management)의 방법을 설명하시오.', completed: false },
  { id: 35, topic: 'ERM', question: '리스크 상관관계 분석과 포트폴리오 효과를 설명하시오.', completed: false },
  { id: 36, topic: 'ERM', question: 'Risk Appetite와 Risk Tolerance의 차이를 설명하시오.', completed: false },
  { id: 37, topic: 'ERM', question: 'Risk Appetite Statement 작성방법을 설명하시오.', completed: false },
  { id: 38, topic: 'ERM', question: '스트레스 테스트와 시나리오 분석의 차이를 설명하시오.', completed: false },
  { id: 39, topic: 'ERM', question: '역스트레스 테스트(Reverse Stress Test)의 개념을 설명하시오.', completed: false },
  { id: 40, topic: 'ERM', question: 'ERM 성숙도 모델과 발전단계를 설명하시오.', completed: false },
  // 토픽 5: 규제환경
  { id: 41, topic: '규제환경', question: '바젤위원회(BCBS)의 역할과 바젤규제의 발전과정을 설명하시오.', completed: false },
  { id: 42, topic: '규제환경', question: '바젤I, II, III의 주요 내용과 차이점을 설명하시오.', completed: false },
  { id: 43, topic: '규제환경', question: '바젤II의 3개 축(Pillar 1, 2, 3)을 설명하시오.', completed: false },
  { id: 44, topic: '규제환경', question: '바젤III의 자본규제 강화 내용을 설명하시오.', completed: false },
  { id: 45, topic: '규제환경', question: '바젤III의 유동성규제(LCR, NSFR)를 설명하시오.', completed: false },
  { id: 46, topic: '규제환경', question: '레버리지비율 규제의 목적과 계산방법을 설명하시오.', completed: false },
  { id: 47, topic: '규제환경', question: '시스템적으로 중요한 은행(SIFI, G-SIB)에 대한 규제를 설명하시오.', completed: false },
  { id: 48, topic: '규제환경', question: '국내 금융감독체계와 주요 규제를 설명하시오.', completed: false },
  { id: 49, topic: '규제환경', question: '금융회사의 건전성 감독기준(BIS비율, 지급여력비율)을 설명하시오.', completed: false },
  { id: 50, topic: '규제환경', question: '금융규제의 최근 동향(바젤IV, 기후리스크 등)을 설명하시오.', completed: false },
];

export default function RiskManagementBasicsPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('frm-risk-basics-progress');
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
    localStorage.setItem('frm-risk-basics-progress', JSON.stringify(completedIds));
  };

  const toggleComplete = (id: number) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, completed: !q.completed } : q
    );
    setQuestions(updated);
    saveProgress(updated);
  };

  const openAIModal = (question: string) => {
    const prompt = `재무위험관리사 리스크관리 기초 문제입니다.\n\n문제: ${question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 실무 적용\n4. 관련 규제\n5. 기출 포인트`;
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-red-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-red-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-red-600 transition">금융</Link>
            <span>/</span>
            <Link href="/category/finance/financial-risk-manager" className="hover:text-red-600 transition">재무위험관리사</Link>
            <span>/</span>
            <span className="text-red-600 font-medium">리스크관리 기초</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">리스크관리 기초</h1>
          <p className="text-gray-600 mt-1">리스크 개념, 유형, 관리체계, ERM, 규제환경</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-red-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-red-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-red-500 to-rose-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{completedCount} / {questions.length} 문항 완료</p>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-red-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTopic === null
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 hover:border-red-300 text-gray-600'
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
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-red-300 text-gray-600'
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
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100">
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
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(q.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      q.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-red-500'
                    }`}
                  >
                    {q.completed && <span>✓</span>}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
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
                    className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:from-red-600 hover:to-rose-600 transition-all text-sm font-medium shadow-md hover:shadow-lg"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition font-medium"
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
