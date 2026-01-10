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
  { id: 1, name: '자본시장법 개요', description: '목적, 용어정의, 적용범위' },
  { id: 2, name: '금융투자업 규제', description: '인가·등록, 영업행위규제' },
  { id: 3, name: '불공정거래 규제', description: '내부자거래, 시세조종, 부정거래' },
  { id: 4, name: '직무윤리', description: '윤리강령, 이해상충방지, 정보보호' },
];

const initialQuestions: Question[] = [
  // 토픽 1: 자본시장법 개요
  { id: 1, topic: '자본시장법 개요', question: '자본시장법의 제정 목적과 금융투자상품의 포괄주의 규제 방식에 대해 설명하시오.', completed: false },
  { id: 2, topic: '자본시장법 개요', question: '금융투자상품의 정의와 증권·파생상품의 구분 기준을 설명하시오.', completed: false },
  { id: 3, topic: '자본시장법 개요', question: '집합투자의 개념과 집합투자기구의 유형별 특징을 설명하시오.', completed: false },
  { id: 4, topic: '자본시장법 개요', question: '자본시장법상 투자자 구분(일반투자자·전문투자자)과 보호 수준의 차이를 설명하시오.', completed: false },
  { id: 5, topic: '자본시장법 개요', question: '자본시장법의 적용범위와 역외적용에 관한 규정을 설명하시오.', completed: false },
  // 토픽 2: 금융투자업 규제
  { id: 6, topic: '금융투자업 규제', question: '금융투자업의 종류와 각 업종별 인가·등록 요건을 설명하시오.', completed: false },
  { id: 7, topic: '금융투자업 규제', question: '투자권유자문인력의 자격요건과 등록·관리 제도를 설명하시오.', completed: false },
  { id: 8, topic: '금융투자업 규제', question: '적합성 원칙과 적정성 원칙의 개념 및 적용 차이를 설명하시오.', completed: false },
  { id: 9, topic: '금융투자업 규제', question: '설명의무의 내용과 위반 시 손해배상책임에 대해 설명하시오.', completed: false },
  { id: 10, topic: '금융투자업 규제', question: '부당권유행위 금지와 불초청권유 금지 규정을 설명하시오.', completed: false },
  // 토픽 3: 불공정거래 규제
  { id: 11, topic: '불공정거래 규제', question: '내부자거래의 구성요건과 규제 대상을 설명하시오.', completed: false },
  { id: 12, topic: '불공정거래 규제', question: '미공개중요정보의 정의와 판단 기준을 설명하시오.', completed: false },
  { id: 13, topic: '불공정거래 규제', question: '시세조종행위의 유형과 규제 내용을 설명하시오.', completed: false },
  { id: 14, topic: '불공정거래 규제', question: '부정거래행위의 개념과 규제 범위를 설명하시오.', completed: false },
  { id: 15, topic: '불공정거래 규제', question: '불공정거래 위반에 대한 제재(형사·행정·민사)를 설명하시오.', completed: false },
  // 토픽 4: 직무윤리
  { id: 16, topic: '직무윤리', question: '금융투자업 종사자의 윤리강령과 기본원칙을 설명하시오.', completed: false },
  { id: 17, topic: '직무윤리', question: '이해상충 방지의무와 정보교류차단장치(Chinese Wall)를 설명하시오.', completed: false },
  { id: 18, topic: '직무윤리', question: '고객정보 보호의무와 개인정보보호법 준수사항을 설명하시오.', completed: false },
  { id: 19, topic: '직무윤리', question: '금융소비자보호법상 6대 판매원칙을 설명하시오.', completed: false },
  { id: 20, topic: '직무윤리', question: '자금세탁방지(AML) 및 고객확인(KYC) 의무를 설명하시오.', completed: false },
];

export default function FundLawEthicsPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fund-advisor-law-progress');
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
    localStorage.setItem('fund-advisor-law-progress', JSON.stringify(completedIds));
  };

  const toggleComplete = (id: number) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, completed: !q.completed } : q
    );
    setQuestions(updated);
    saveProgress(updated);
  };

  const openAIModal = (question: string) => {
    const prompt = `펀드투자권유자문인력 직무윤리 및 법규 문제입니다.\n\n문제: ${question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트`;
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-indigo-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-indigo-600 transition">금융</Link>
            <span>/</span>
            <Link href="/category/finance/fund-advisor" className="hover:text-indigo-600 transition">펀드투자권유자문인력</Link>
            <span>/</span>
            <span className="text-indigo-600 font-medium">직무윤리 및 법규</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">직무윤리 및 법규</h1>
          <p className="text-gray-600 mt-1">자본시장법, 금융투자업 규제, 불공정거래, 직무윤리</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-indigo-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-indigo-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{completedCount} / {questions.length} 문항 완료</p>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-indigo-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTopic === null
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-indigo-300 text-gray-600'
              }`}
            >
              <p className="font-bold">전체 보기</p>
              <p className="text-sm mt-1">{completedCount}/{questions.length} 완료</p>
            </button>
            {topics.map(topic => {
              const progress = getTopicProgress(topic.name);
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.name)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedTopic === topic.name
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-indigo-300 text-gray-600'
                  }`}
                >
                  <p className="font-bold text-sm">{topic.name}</p>
                  <p className="text-xs mt-1 opacity-75">{topic.description}</p>
                  <p className="text-xs mt-2">{progress.completed}/{progress.total} 완료</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            {selectedTopic ? selectedTopic : '전체 문항'} ({filteredQuestions.length}문항)
          </h2>
          <div className="space-y-4">
            {filteredQuestions.map((q, index) => (
              <div
                key={q.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  q.completed
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(q.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      q.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-indigo-500'
                    }`}
                  >
                    {q.completed && <span>✓</span>}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
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
                    className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all text-sm font-medium shadow-md hover:shadow-lg"
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
            href="/category/finance/fund-advisor"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-50 transition font-medium"
          >
            ← 펀드투자권유자문인력 메인으로
          </Link>
        </div>
      </main>

      {/* AI Modal */}
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}
    </div>
  );
}
