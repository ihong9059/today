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
  { id: 1, name: '소득세', description: '종합소득, 세율, 공제' },
  { id: 2, name: '금융소득과세', description: '이자, 배당, 분리과세' },
  { id: 3, name: '양도소득세', description: '부동산, 주식 양도' },
  { id: 4, name: '상속세', description: '상속재산, 세율, 공제' },
  { id: 5, name: '증여세', description: '증여재산, 세율, 절세' },
];

const initialQuestions: Question[] = [
  // 토픽 1: 소득세
  { id: 1, topic: '소득세', question: '소득세의 개념과 과세체계를 설명하시오.', completed: false },
  { id: 2, topic: '소득세', question: '종합소득의 범위와 종류를 설명하시오.', completed: false },
  { id: 3, topic: '소득세', question: '종합소득세 계산구조를 설명하시오.', completed: false },
  { id: 4, topic: '소득세', question: '소득세 세율체계(누진세율)를 설명하시오.', completed: false },
  { id: 5, topic: '소득세', question: '근로소득의 계산과 과세방법을 설명하시오.', completed: false },
  { id: 6, topic: '소득세', question: '사업소득의 계산과 필요경비를 설명하시오.', completed: false },
  { id: 7, topic: '소득세', question: '연금소득의 과세방법을 설명하시오.', completed: false },
  { id: 8, topic: '소득세', question: '인적공제와 특별소득공제를 설명하시오.', completed: false },
  { id: 9, topic: '소득세', question: '세액공제의 종류와 한도를 설명하시오.', completed: false },
  { id: 10, topic: '소득세', question: '종합소득세 신고와 납부방법을 설명하시오.', completed: false },
  // 토픽 2: 금융소득과세
  { id: 11, topic: '금융소득과세', question: '금융소득(이자, 배당)의 정의와 범위를 설명하시오.', completed: false },
  { id: 12, topic: '금융소득과세', question: '이자소득의 종류와 과세방법을 설명하시오.', completed: false },
  { id: 13, topic: '금융소득과세', question: '배당소득의 종류와 과세방법을 설명하시오.', completed: false },
  { id: 14, topic: '금융소득과세', question: '금융소득 종합과세제도를 설명하시오.', completed: false },
  { id: 15, topic: '금융소득과세', question: '금융소득 2천만원 초과 시 세금계산을 설명하시오.', completed: false },
  { id: 16, topic: '금융소득과세', question: '분리과세 금융소득의 종류를 설명하시오.', completed: false },
  { id: 17, topic: '금융소득과세', question: '비과세 금융상품의 종류와 조건을 설명하시오.', completed: false },
  { id: 18, topic: '금융소득과세', question: '세금우대저축과 조합 예탁금을 설명하시오.', completed: false },
  { id: 19, topic: '금융소득과세', question: 'ISA(개인종합자산관리계좌)의 세제혜택을 설명하시오.', completed: false },
  { id: 20, topic: '금융소득과세', question: '금융소득 절세전략을 설명하시오.', completed: false },
  // 토픽 3: 양도소득세
  { id: 21, topic: '양도소득세', question: '양도소득세의 과세대상을 설명하시오.', completed: false },
  { id: 22, topic: '양도소득세', question: '양도소득금액 계산구조를 설명하시오.', completed: false },
  { id: 23, topic: '양도소득세', question: '취득가액과 필요경비 계산방법을 설명하시오.', completed: false },
  { id: 24, topic: '양도소득세', question: '장기보유특별공제의 적용요건과 공제율을 설명하시오.', completed: false },
  { id: 25, topic: '양도소득세', question: '1세대 1주택 비과세 요건을 설명하시오.', completed: false },
  { id: 26, topic: '양도소득세', question: '다주택자 양도소득세 중과세를 설명하시오.', completed: false },
  { id: 27, topic: '양도소득세', question: '주식 양도소득세 과세방법을 설명하시오.', completed: false },
  { id: 28, topic: '양도소득세', question: '대주주 주식 양도 시 세금계산을 설명하시오.', completed: false },
  { id: 29, topic: '양도소득세', question: '양도소득세 신고와 납부절차를 설명하시오.', completed: false },
  { id: 30, topic: '양도소득세', question: '부동산 양도 시 절세전략을 설명하시오.', completed: false },
  // 토픽 4: 상속세
  { id: 31, topic: '상속세', question: '상속세의 개념과 과세체계를 설명하시오.', completed: false },
  { id: 32, topic: '상속세', question: '상속재산의 범위와 평가방법을 설명하시오.', completed: false },
  { id: 33, topic: '상속세', question: '상속세 과세표준 계산구조를 설명하시오.', completed: false },
  { id: 34, topic: '상속세', question: '상속공제(기초공제, 배우자공제 등)를 설명하시오.', completed: false },
  { id: 35, topic: '상속세', question: '상속세 세율체계를 설명하시오.', completed: false },
  { id: 36, topic: '상속세', question: '상속세 신고와 납부방법을 설명하시오.', completed: false },
  { id: 37, topic: '상속세', question: '가업상속공제의 요건과 혜택을 설명하시오.', completed: false },
  { id: 38, topic: '상속세', question: '상속재산 분할과 세금의 관계를 설명하시오.', completed: false },
  { id: 39, topic: '상속세', question: '상속세 절세를 위한 사전 준비를 설명하시오.', completed: false },
  { id: 40, topic: '상속세', question: '상속세와 증여세의 관계를 설명하시오.', completed: false },
  // 토픽 5: 증여세
  { id: 41, topic: '증여세', question: '증여세의 개념과 과세체계를 설명하시오.', completed: false },
  { id: 42, topic: '증여세', question: '증여재산의 범위와 의제증여를 설명하시오.', completed: false },
  { id: 43, topic: '증여세', question: '증여재산 평가방법을 설명하시오.', completed: false },
  { id: 44, topic: '증여세', question: '증여재산공제(배우자, 직계존비속)를 설명하시오.', completed: false },
  { id: 45, topic: '증여세', question: '증여세 세율과 계산방법을 설명하시오.', completed: false },
  { id: 46, topic: '증여세', question: '증여세 합산과세 규정을 설명하시오.', completed: false },
  { id: 47, topic: '증여세', question: '부동산 증여 시 세금계산을 설명하시오.', completed: false },
  { id: 48, topic: '증여세', question: '금융자산 증여의 절세방법을 설명하시오.', completed: false },
  { id: 49, topic: '증여세', question: '세대생략 증여와 할증과세를 설명하시오.', completed: false },
  { id: 50, topic: '증여세', question: '효과적인 증여 계획 수립방법을 설명하시오.', completed: false },
];

export default function TaxPlanningPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fp-tax-planning-progress');
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
    localStorage.setItem('fp-tax-planning-progress', JSON.stringify(completedIds));
  };

  const toggleComplete = (id: number) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, completed: !q.completed } : q
    );
    setQuestions(updated);
    saveProgress(updated);
  };

  const openAIModal = (question: string) => {
    const prompt = `자산관리사(FP) 세금설계 문제입니다.\n\n문제: ${question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 세금 계산 예시\n4. 절세 전략\n5. 기출 포인트`;
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sky-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-sky-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-sky-600 transition">금융</Link>
            <span>/</span>
            <Link href="/category/finance/fp" className="hover:text-sky-600 transition">자산관리사(FP)</Link>
            <span>/</span>
            <span className="text-sky-600 font-medium">세금설계</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">세금설계</h1>
          <p className="text-gray-600 mt-1">소득세, 금융소득과세, 양도소득세, 상속세, 증여세</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-sky-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-sky-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-sky-500 to-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{completedCount} / {questions.length} 문항 완료</p>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-sky-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTopic === null
                  ? 'border-sky-500 bg-sky-50 text-sky-700'
                  : 'border-gray-200 hover:border-sky-300 text-gray-600'
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
                      ? 'border-sky-500 bg-sky-50 text-sky-700'
                      : 'border-gray-200 hover:border-sky-300 text-gray-600'
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
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-sky-100">
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
                    : 'border-gray-200 hover:border-sky-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(q.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      q.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-sky-500'
                    }`}
                  >
                    {q.completed && <span>✓</span>}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-sky-100 text-sky-700 rounded-full font-medium">
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
                    className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-lg hover:from-sky-600 hover:to-blue-600 transition-all text-sm font-medium shadow-md hover:shadow-lg"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-sky-200 text-sky-600 rounded-xl hover:bg-sky-50 transition font-medium"
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
