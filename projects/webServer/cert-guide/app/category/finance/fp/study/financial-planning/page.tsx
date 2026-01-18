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
  { id: 1, name: '재무설계 개념', description: '재무설계의 의의, 목적, 필요성' },
  { id: 2, name: '재무설계 프로세스', description: '6단계 재무설계 프로세스' },
  { id: 3, name: '화폐의 시간가치', description: '현재가치, 미래가치, 연금' },
  { id: 4, name: '재무제표 분석', description: '개인재무제표, 비율분석' },
  { id: 5, name: '고객상담', description: '상담기법, 재무목표 설정' },
];

const initialQuestions: Question[] = [
  // 토픽 1: 재무설계 개념
  { id: 1, topic: '재무설계 개념', question: '재무설계(Financial Planning)의 정의와 목적을 설명하시오.', completed: false },
  { id: 2, topic: '재무설계 개념', question: '재무설계의 필요성과 기대효과를 설명하시오.', completed: false },
  { id: 3, topic: '재무설계 개념', question: '재무설계사의 역할과 필요한 역량을 설명하시오.', completed: false },
  { id: 4, topic: '재무설계 개념', question: '종합재무설계와 모듈식 재무설계의 차이를 설명하시오.', completed: false },
  { id: 5, topic: '재무설계 개념', question: '재무설계 서비스의 범위와 한계를 설명하시오.', completed: false },
  { id: 6, topic: '재무설계 개념', question: '재무설계사의 윤리강령과 준수사항을 설명하시오.', completed: false },
  { id: 7, topic: '재무설계 개념', question: '재무설계 업무의 법적 규제와 자격요건을 설명하시오.', completed: false },
  { id: 8, topic: '재무설계 개념', question: '재무설계와 자산관리의 차이점을 설명하시오.', completed: false },
  { id: 9, topic: '재무설계 개념', question: '생애주기(Life Cycle)에 따른 재무설계의 특징을 설명하시오.', completed: false },
  { id: 10, topic: '재무설계 개념', question: '재무설계 시장의 현황과 발전방향을 설명하시오.', completed: false },
  // 토픽 2: 재무설계 프로세스
  { id: 11, topic: '재무설계 프로세스', question: '재무설계 6단계 프로세스 전체를 설명하시오.', completed: false },
  { id: 12, topic: '재무설계 프로세스', question: '1단계: 고객과의 관계정립 방법을 설명하시오.', completed: false },
  { id: 13, topic: '재무설계 프로세스', question: '2단계: 고객 관련 정보수집 항목과 방법을 설명하시오.', completed: false },
  { id: 14, topic: '재무설계 프로세스', question: '3단계: 고객의 재무상태 분석방법을 설명하시오.', completed: false },
  { id: 15, topic: '재무설계 프로세스', question: '4단계: 재무설계 제안서 작성방법을 설명하시오.', completed: false },
  { id: 16, topic: '재무설계 프로세스', question: '5단계: 제안서 제시 및 실행방법을 설명하시오.', completed: false },
  { id: 17, topic: '재무설계 프로세스', question: '6단계: 사후관리(모니터링)의 중요성을 설명하시오.', completed: false },
  { id: 18, topic: '재무설계 프로세스', question: '재무목표 설정 시 SMART 기준을 설명하시오.', completed: false },
  { id: 19, topic: '재무설계 프로세스', question: '재무설계 제안서의 주요 구성요소를 설명하시오.', completed: false },
  { id: 20, topic: '재무설계 프로세스', question: '재무설계 실행 시 고객동의 및 문서화 절차를 설명하시오.', completed: false },
  // 토픽 3: 화폐의 시간가치
  { id: 21, topic: '화폐의 시간가치', question: '화폐의 시간가치 개념과 기본원리를 설명하시오.', completed: false },
  { id: 22, topic: '화폐의 시간가치', question: '단리와 복리의 차이 및 계산방법을 설명하시오.', completed: false },
  { id: 23, topic: '화폐의 시간가치', question: '미래가치(FV) 계산공식과 활용을 설명하시오.', completed: false },
  { id: 24, topic: '화폐의 시간가치', question: '현재가치(PV) 계산공식과 활용을 설명하시오.', completed: false },
  { id: 25, topic: '화폐의 시간가치', question: '정기적립식 미래가치(연금의 FV)를 설명하시오.', completed: false },
  { id: 26, topic: '화폐의 시간가치', question: '정기적립식 현재가치(연금의 PV)를 설명하시오.', completed: false },
  { id: 27, topic: '화폐의 시간가치', question: '기초연금과 기말연금의 차이와 계산을 설명하시오.', completed: false },
  { id: 28, topic: '화폐의 시간가치', question: '영구연금(Perpetuity)의 개념과 계산을 설명하시오.', completed: false },
  { id: 29, topic: '화폐의 시간가치', question: '명목이자율과 실질이자율의 관계를 설명하시오.', completed: false },
  { id: 30, topic: '화폐의 시간가치', question: '할부금 계산(PMT)과 대출상환 계획표를 설명하시오.', completed: false },
  // 토픽 4: 재무제표 분석
  { id: 31, topic: '재무제표 분석', question: '개인재무상태표의 구성요소와 작성방법을 설명하시오.', completed: false },
  { id: 32, topic: '재무제표 분석', question: '개인현금흐름표의 구성요소와 작성방법을 설명하시오.', completed: false },
  { id: 33, topic: '재무제표 분석', question: '순자산(Net Worth) 계산과 의미를 설명하시오.', completed: false },
  { id: 34, topic: '재무제표 분석', question: '저축률과 투자율의 계산과 적정수준을 설명하시오.', completed: false },
  { id: 35, topic: '재무제표 분석', question: '부채비율과 부채상환비율의 계산을 설명하시오.', completed: false },
  { id: 36, topic: '재무제표 분석', question: '유동성비율의 계산과 적정수준을 설명하시오.', completed: false },
  { id: 37, topic: '재무제표 분석', question: '비상예비자금의 적정규모 산정방법을 설명하시오.', completed: false },
  { id: 38, topic: '재무제표 분석', question: '재무건전성 평가지표와 기준을 설명하시오.', completed: false },
  { id: 39, topic: '재무제표 분석', question: '재무비율을 이용한 문제점 진단방법을 설명하시오.', completed: false },
  { id: 40, topic: '재무제표 분석', question: '재무목표 달성가능성 분석방법을 설명하시오.', completed: false },
  // 토픽 5: 고객상담
  { id: 41, topic: '고객상담', question: '고객상담의 기본원칙과 중요성을 설명하시오.', completed: false },
  { id: 42, topic: '고객상담', question: '효과적인 경청 기법과 질문기법을 설명하시오.', completed: false },
  { id: 43, topic: '고객상담', question: '고객의 재무목표 파악방법을 설명하시오.', completed: false },
  { id: 44, topic: '고객상담', question: '고객의 투자성향 파악과 위험수용능력 평가를 설명하시오.', completed: false },
  { id: 45, topic: '고객상담', question: '고객의 기대수익률과 적정 목표수익률 설정을 설명하시오.', completed: false },
  { id: 46, topic: '고객상담', question: '상담 시 발생할 수 있는 갈등상황 해결방법을 설명하시오.', completed: false },
  { id: 47, topic: '고객상담', question: '재무설계 제안 시 설득기법을 설명하시오.', completed: false },
  { id: 48, topic: '고객상담', question: '고객정보 보호와 비밀유지 의무를 설명하시오.', completed: false },
  { id: 49, topic: '고객상담', question: '이해상충 상황의 관리방법을 설명하시오.', completed: false },
  { id: 50, topic: '고객상담', question: '장기 고객관계 유지 및 발전방안을 설명하시오.', completed: false },
];

export default function FinancialPlanningPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fp-financial-planning-progress');
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
    localStorage.setItem('fp-financial-planning-progress', JSON.stringify(completedIds));
  };

  const toggleComplete = (id: number) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, completed: !q.completed } : q
    );
    setQuestions(updated);
    saveProgress(updated);
  };

  const openAIModal = (question: string) => {
    const prompt = `자산관리사(FP) 재무설계 개론 문제입니다.\n\n문제: ${question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산방법 또는 적용사례\n4. 실무 적용\n5. 기출 포인트`;
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-emerald-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-emerald-600 transition">금융</Link>
            <span>/</span>
            <Link href="/category/finance/fp" className="hover:text-emerald-600 transition">자산관리사(FP)</Link>
            <span>/</span>
            <span className="text-emerald-600 font-medium">재무설계 개론</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">재무설계 개론</h1>
          <p className="text-gray-600 mt-1">재무설계 개념, 프로세스, 화폐의 시간가치, 재무제표 분석</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-emerald-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-emerald-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{completedCount} / {questions.length} 문항 완료</p>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-emerald-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTopic === null
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 hover:border-emerald-300 text-gray-600'
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
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-300 text-gray-600'
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
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
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
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(q.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      q.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-emerald-500'
                    }`}
                  >
                    {q.completed && <span>✓</span>}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
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
                    className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all text-sm font-medium shadow-md hover:shadow-lg"
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
            href="/category/finance/fp"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-emerald-200 text-emerald-600 rounded-xl hover:bg-emerald-50 transition font-medium"
          >
            ← 자산관리사(FP) 메인으로
          </Link>
        </div>
      </main>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}
    </div>
  );
}
