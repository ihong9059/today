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
  { id: 1, name: '투자환경', description: '금융시장, 경제지표, 투자원칙' },
  { id: 2, name: '채권투자', description: '채권 종류, 가격결정, 수익률' },
  { id: 3, name: '주식투자', description: '주식 분석, 가치평가, 투자전략' },
  { id: 4, name: '펀드투자', description: '펀드 종류, 선택기준, 성과평가' },
  { id: 5, name: '포트폴리오', description: '자산배분, 분산투자, 리밸런싱' },
];

const initialQuestions: Question[] = [
  // 토픽 1: 투자환경
  { id: 1, topic: '투자환경', question: '금융시장의 구조(자금시장, 자본시장)와 기능을 설명하시오.', completed: false },
  { id: 2, topic: '투자환경', question: '경기순환과 금융시장의 관계를 설명하시오.', completed: false },
  { id: 3, topic: '투자환경', question: '금리 변동이 자산가격에 미치는 영향을 설명하시오.', completed: false },
  { id: 4, topic: '투자환경', question: '인플레이션과 투자수익의 관계를 설명하시오.', completed: false },
  { id: 5, topic: '투자환경', question: '환율 변동이 투자에 미치는 영향을 설명하시오.', completed: false },
  { id: 6, topic: '투자환경', question: '투자의 기본원칙(분산투자, 장기투자 등)을 설명하시오.', completed: false },
  { id: 7, topic: '투자환경', question: '위험과 수익의 상충관계(Trade-off)를 설명하시오.', completed: false },
  { id: 8, topic: '투자환경', question: '체계적 위험과 비체계적 위험의 차이를 설명하시오.', completed: false },
  { id: 9, topic: '투자환경', question: '주요 경제지표(GDP, 물가, 금리 등)와 해석방법을 설명하시오.', completed: false },
  { id: 10, topic: '투자환경', question: '행동재무학의 주요 개념(손실회피, 과신 등)을 설명하시오.', completed: false },
  // 토픽 2: 채권투자
  { id: 11, topic: '채권투자', question: '채권의 정의와 주요 특성을 설명하시오.', completed: false },
  { id: 12, topic: '채권투자', question: '채권의 종류(국채, 회사채, 지방채 등)를 설명하시오.', completed: false },
  { id: 13, topic: '채권투자', question: '채권 가격결정의 기본원리를 설명하시오.', completed: false },
  { id: 14, topic: '채권투자', question: '채권수익률의 종류(표면금리, 현재수익률, 만기수익률)를 설명하시오.', completed: false },
  { id: 15, topic: '채권투자', question: '금리와 채권가격의 역관계를 설명하시오.', completed: false },
  { id: 16, topic: '채권투자', question: '듀레이션의 개념과 활용방법을 설명하시오.', completed: false },
  { id: 17, topic: '채권투자', question: '볼록성(Convexity)의 개념과 중요성을 설명하시오.', completed: false },
  { id: 18, topic: '채권투자', question: '신용등급과 채권투자의 관계를 설명하시오.', completed: false },
  { id: 19, topic: '채권투자', question: '이자율 기간구조(수익률곡선)를 설명하시오.', completed: false },
  { id: 20, topic: '채권투자', question: '채권투자 전략(만기보유, 사다리형 등)을 설명하시오.', completed: false },
  // 토픽 3: 주식투자
  { id: 21, topic: '주식투자', question: '주식의 정의와 주주의 권리를 설명하시오.', completed: false },
  { id: 22, topic: '주식투자', question: '보통주와 우선주의 차이를 설명하시오.', completed: false },
  { id: 23, topic: '주식투자', question: '기본적 분석의 방법과 활용을 설명하시오.', completed: false },
  { id: 24, topic: '주식투자', question: '기술적 분석의 방법과 한계를 설명하시오.', completed: false },
  { id: 25, topic: '주식투자', question: 'PER(주가수익비율)의 의미와 활용을 설명하시오.', completed: false },
  { id: 26, topic: '주식투자', question: 'PBR(주가순자산비율)의 의미와 활용을 설명하시오.', completed: false },
  { id: 27, topic: '주식투자', question: 'ROE와 주가의 관계를 설명하시오.', completed: false },
  { id: 28, topic: '주식투자', question: '배당수익률과 배당성향을 설명하시오.', completed: false },
  { id: 29, topic: '주식투자', question: '주식투자 스타일(가치투자, 성장투자)을 설명하시오.', completed: false },
  { id: 30, topic: '주식투자', question: '시장효율성 가설의 내용과 시사점을 설명하시오.', completed: false },
  // 토픽 4: 펀드투자
  { id: 31, topic: '펀드투자', question: '펀드(집합투자기구)의 정의와 장점을 설명하시오.', completed: false },
  { id: 32, topic: '펀드투자', question: '펀드의 종류(주식형, 채권형, 혼합형, MMF 등)를 설명하시오.', completed: false },
  { id: 33, topic: '펀드투자', question: '인덱스펀드와 액티브펀드의 차이를 설명하시오.', completed: false },
  { id: 34, topic: '펀드투자', question: 'ETF의 특징과 투자방법을 설명하시오.', completed: false },
  { id: 35, topic: '펀드투자', question: '펀드 선택 시 고려사항을 설명하시오.', completed: false },
  { id: 36, topic: '펀드투자', question: '펀드 비용(판매수수료, 운용보수 등)을 설명하시오.', completed: false },
  { id: 37, topic: '펀드투자', question: '펀드 성과평가 지표(샤프지수, 트레이너지수 등)를 설명하시오.', completed: false },
  { id: 38, topic: '펀드투자', question: '벤치마크 대비 초과수익(알파)을 설명하시오.', completed: false },
  { id: 39, topic: '펀드투자', question: '적립식 펀드투자의 장점(평균매입단가 효과)을 설명하시오.', completed: false },
  { id: 40, topic: '펀드투자', question: '펀드 투자설명서 주요 내용을 설명하시오.', completed: false },
  // 토픽 5: 포트폴리오
  { id: 41, topic: '포트폴리오', question: '포트폴리오 이론의 기본개념을 설명하시오.', completed: false },
  { id: 42, topic: '포트폴리오', question: '분산투자의 효과와 상관계수의 역할을 설명하시오.', completed: false },
  { id: 43, topic: '포트폴리오', question: '효율적 프론티어(Efficient Frontier)를 설명하시오.', completed: false },
  { id: 44, topic: '포트폴리오', question: 'CAPM(자본자산가격결정모형)을 설명하시오.', completed: false },
  { id: 45, topic: '포트폴리오', question: '베타(β)의 의미와 활용을 설명하시오.', completed: false },
  { id: 46, topic: '포트폴리오', question: '전략적 자산배분과 전술적 자산배분을 설명하시오.', completed: false },
  { id: 47, topic: '포트폴리오', question: '생애주기에 따른 자산배분 전략을 설명하시오.', completed: false },
  { id: 48, topic: '포트폴리오', question: '리밸런싱의 필요성과 방법을 설명하시오.', completed: false },
  { id: 49, topic: '포트폴리오', question: '자산군별 상관관계와 분산효과를 설명하시오.', completed: false },
  { id: 50, topic: '포트폴리오', question: '고객의 투자성향에 맞는 포트폴리오 구성방법을 설명하시오.', completed: false },
];

export default function InvestmentPlanningPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fp-investment-planning-progress');
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
    localStorage.setItem('fp-investment-planning-progress', JSON.stringify(completedIds));
  };

  const toggleComplete = (id: number) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, completed: !q.completed } : q
    );
    setQuestions(updated);
    saveProgress(updated);
  };

  const openAIModal = (question: string) => {
    const prompt = `자산관리사(FP) 투자설계 문제입니다.\n\n문제: ${question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산방법 또는 적용사례\n4. 실무 적용\n5. 기출 포인트`;
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-teal-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-teal-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-teal-600 transition">금융</Link>
            <span>/</span>
            <Link href="/category/finance/fp" className="hover:text-teal-600 transition">자산관리사(FP)</Link>
            <span>/</span>
            <span className="text-teal-600 font-medium">투자설계</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">투자설계</h1>
          <p className="text-gray-600 mt-1">투자환경, 채권투자, 주식투자, 펀드투자, 포트폴리오</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-teal-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-teal-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-teal-500 to-cyan-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{completedCount} / {questions.length} 문항 완료</p>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-teal-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTopic === null
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-gray-200 hover:border-teal-300 text-gray-600'
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
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-teal-300 text-gray-600'
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
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-teal-100">
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
                    : 'border-gray-200 hover:border-teal-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(q.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      q.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-teal-500'
                    }`}
                  >
                    {q.completed && <span>✓</span>}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full font-medium">
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
                    className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all text-sm font-medium shadow-md hover:shadow-lg"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-teal-200 text-teal-600 rounded-xl hover:bg-teal-50 transition font-medium"
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
