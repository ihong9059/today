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
  { id: 1, name: '위험관리', description: '위험의 개념, 관리방법' },
  { id: 2, name: '생명보험', description: '종신보험, 정기보험, 연금보험' },
  { id: 3, name: '손해보험', description: '화재, 자동차, 배상책임보험' },
  { id: 4, name: '제3보험', description: '건강보험, 상해보험, 간병보험' },
  { id: 5, name: '보험설계', description: '필요보장분석, 상품선택' },
];

const initialQuestions: Question[] = [
  // 토픽 1: 위험관리
  { id: 1, topic: '위험관리', question: '위험(Risk)의 정의와 종류를 설명하시오.', completed: false },
  { id: 2, topic: '위험관리', question: '순수위험과 투기위험의 차이를 설명하시오.', completed: false },
  { id: 3, topic: '위험관리', question: '위험관리 프로세스(식별, 측정, 통제, 재무)를 설명하시오.', completed: false },
  { id: 4, topic: '위험관리', question: '위험통제 방법(회피, 통제, 보유, 전가)을 설명하시오.', completed: false },
  { id: 5, topic: '위험관리', question: '보험의 원리와 기능을 설명하시오.', completed: false },
  { id: 6, topic: '위험관리', question: '대수의 법칙과 보험료 산정의 원리를 설명하시오.', completed: false },
  { id: 7, topic: '위험관리', question: '보험의 기본원칙(최대선의의 원칙, 이해관계 등)을 설명하시오.', completed: false },
  { id: 8, topic: '위험관리', question: '보험료의 구성(순보험료, 부가보험료)을 설명하시오.', completed: false },
  { id: 9, topic: '위험관리', question: '예정기초율(예정이율, 예정위험률, 예정사업비율)을 설명하시오.', completed: false },
  { id: 10, topic: '위험관리', question: '재무적 위험관리에서 보험의 역할을 설명하시오.', completed: false },
  // 토픽 2: 생명보험
  { id: 11, topic: '생명보험', question: '생명보험의 정의와 특징을 설명하시오.', completed: false },
  { id: 12, topic: '생명보험', question: '종신보험의 특징과 활용방법을 설명하시오.', completed: false },
  { id: 13, topic: '생명보험', question: '정기보험의 특징과 종류를 설명하시오.', completed: false },
  { id: 14, topic: '생명보험', question: '저축성보험(양로보험 등)의 특징을 설명하시오.', completed: false },
  { id: 15, topic: '생명보험', question: '연금보험의 종류와 특징을 설명하시오.', completed: false },
  { id: 16, topic: '생명보험', question: '변액보험의 구조와 위험을 설명하시오.', completed: false },
  { id: 17, topic: '생명보험', question: '유니버셜보험의 특징을 설명하시오.', completed: false },
  { id: 18, topic: '생명보험', question: '보험금 지급사유와 면책사항을 설명하시오.', completed: false },
  { id: 19, topic: '생명보험', question: '생명보험의 계약관계자(계약자, 피보험자, 수익자)를 설명하시오.', completed: false },
  { id: 20, topic: '생명보험', question: '보험계약의 부활(효력회복)제도를 설명하시오.', completed: false },
  // 토픽 3: 손해보험
  { id: 21, topic: '손해보험', question: '손해보험의 정의와 특징을 설명하시오.', completed: false },
  { id: 22, topic: '손해보험', question: '실손보상원칙과 이득금지원칙을 설명하시오.', completed: false },
  { id: 23, topic: '손해보험', question: '화재보험의 보장내용과 특별약관을 설명하시오.', completed: false },
  { id: 24, topic: '손해보험', question: '자동차보험의 의무보험과 임의보험을 설명하시오.', completed: false },
  { id: 25, topic: '손해보험', question: '자동차보험의 대인배상, 대물배상을 설명하시오.', completed: false },
  { id: 26, topic: '손해보험', question: '배상책임보험의 종류와 보장내용을 설명하시오.', completed: false },
  { id: 27, topic: '손해보험', question: '재물보험과 책임보험의 차이를 설명하시오.', completed: false },
  { id: 28, topic: '손해보험', question: '가정종합보험의 보장범위를 설명하시오.', completed: false },
  { id: 29, topic: '손해보험', question: '손해보험의 보험가액과 보험금액을 설명하시오.', completed: false },
  { id: 30, topic: '손해보험', question: '일부보험, 초과보험, 중복보험을 설명하시오.', completed: false },
  // 토픽 4: 제3보험
  { id: 31, topic: '제3보험', question: '제3보험의 정의와 특징을 설명하시오.', completed: false },
  { id: 32, topic: '제3보험', question: '실손의료보험의 보장구조와 자기부담금을 설명하시오.', completed: false },
  { id: 33, topic: '제3보험', question: '질병보험의 종류와 보장내용을 설명하시오.', completed: false },
  { id: 34, topic: '제3보험', question: '암보험의 보장내용과 면책기간을 설명하시오.', completed: false },
  { id: 35, topic: '제3보험', question: '상해보험의 정의와 보장범위를 설명하시오.', completed: false },
  { id: 36, topic: '제3보험', question: '간병보험(LTC)의 특징과 지급요건을 설명하시오.', completed: false },
  { id: 37, topic: '제3보험', question: '치아보험의 보장내용을 설명하시오.', completed: false },
  { id: 38, topic: '제3보험', question: '어린이보험의 보장구성을 설명하시오.', completed: false },
  { id: 39, topic: '제3보험', question: '건강보험(정액형)과 실손보험의 차이를 설명하시오.', completed: false },
  { id: 40, topic: '제3보험', question: '보험금 지급심사와 분쟁조정을 설명하시오.', completed: false },
  // 토픽 5: 보험설계
  { id: 41, topic: '보험설계', question: '필요보장분석(Needs Analysis)의 방법을 설명하시오.', completed: false },
  { id: 42, topic: '보험설계', question: '사망보장 필요액 산정방법을 설명하시오.', completed: false },
  { id: 43, topic: '보험설계', question: '유족생활자금 산정방법을 설명하시오.', completed: false },
  { id: 44, topic: '보험설계', question: '의료비 보장설계의 원칙을 설명하시오.', completed: false },
  { id: 45, topic: '보험설계', question: '노후소득보장을 위한 연금설계를 설명하시오.', completed: false },
  { id: 46, topic: '보험설계', question: '보험상품 선택 시 고려사항을 설명하시오.', completed: false },
  { id: 47, topic: '보험설계', question: '보험증권 분석방법과 점검사항을 설명하시오.', completed: false },
  { id: 48, topic: '보험설계', question: '생애주기별 보험설계 방향을 설명하시오.', completed: false },
  { id: 49, topic: '보험설계', question: '보험리모델링의 필요성과 방법을 설명하시오.', completed: false },
  { id: 50, topic: '보험설계', question: '보험설계 시 윤리적 고려사항을 설명하시오.', completed: false },
];

export default function InsurancePlanningPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fp-insurance-planning-progress');
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
    localStorage.setItem('fp-insurance-planning-progress', JSON.stringify(completedIds));
  };

  const toggleComplete = (id: number) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, completed: !q.completed } : q
    );
    setQuestions(updated);
    saveProgress(updated);
  };

  const openAIModal = (question: string) => {
    const prompt = `자산관리사(FP) 보험설계 문제입니다.\n\n문제: ${question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 적용사례\n4. 실무 적용\n5. 기출 포인트`;
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-cyan-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-cyan-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-cyan-600 transition">금융</Link>
            <span>/</span>
            <Link href="/category/finance/fp" className="hover:text-cyan-600 transition">자산관리사(FP)</Link>
            <span>/</span>
            <span className="text-cyan-600 font-medium">보험설계</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">보험설계</h1>
          <p className="text-gray-600 mt-1">위험관리, 생명보험, 손해보험, 제3보험, 보험설계</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-cyan-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-cyan-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-cyan-500 to-sky-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{completedCount} / {questions.length} 문항 완료</p>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-cyan-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTopic === null
                  ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                  : 'border-gray-200 hover:border-cyan-300 text-gray-600'
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
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                      : 'border-gray-200 hover:border-cyan-300 text-gray-600'
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
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-cyan-100">
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
                    : 'border-gray-200 hover:border-cyan-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(q.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      q.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-cyan-500'
                    }`}
                  >
                    {q.completed && <span>✓</span>}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full font-medium">
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
                    className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 text-white rounded-lg hover:from-cyan-600 hover:to-sky-600 transition-all text-sm font-medium shadow-md hover:shadow-lg"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-cyan-200 text-cyan-600 rounded-xl hover:bg-cyan-50 transition font-medium"
          >
            ← 자산관리사(FP) 메인으로
          </Link>
        </div>
      </main>

      {/* AI Modal */}
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}
    </div>
  );
}
