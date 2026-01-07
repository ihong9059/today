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
  { id: 1, name: '신용분석 기초', description: '신용분석 개념, 체계, 프로세스' },
  { id: 2, name: '재무비율분석', description: '안정성, 수익성, 활동성, 성장성' },
  { id: 3, name: '현금흐름분석', description: '현금흐름표 분석, 현금창출능력' },
  { id: 4, name: '신용등급 결정', description: '등급 체계, 결정요인, 평가방법' },
  { id: 5, name: '신용리스크', description: '신용위험 측정, 관리, 대손' },
];

const initialQuestions: Question[] = [
  // 토픽 1: 신용분석 기초
  { id: 1, topic: '신용분석 기초', question: '신용분석의 의의와 목적을 설명하시오.', completed: false },
  { id: 2, topic: '신용분석 기초', question: '신용분석의 5C(Character, Capacity, Capital, Collateral, Condition)를 설명하시오.', completed: false },
  { id: 3, topic: '신용분석 기초', question: '정량분석과 정성분석의 차이점과 각각의 중요성을 설명하시오.', completed: false },
  { id: 4, topic: '신용분석 기초', question: '신용분석 프로세스의 단계별 내용을 설명하시오.', completed: false },
  { id: 5, topic: '신용분석 기초', question: '기업신용평가와 개인신용평가의 차이점을 설명하시오.', completed: false },
  { id: 6, topic: '신용분석 기초', question: '재무제표 분석 시 유의사항(분식회계, 회계정책 변경 등)을 설명하시오.', completed: false },
  { id: 7, topic: '신용분석 기초', question: '동종업계 비교분석(Peer Analysis)의 방법과 활용을 설명하시오.', completed: false },
  { id: 8, topic: '신용분석 기초', question: '시계열 분석(Trend Analysis)의 방법과 유의점을 설명하시오.', completed: false },
  { id: 9, topic: '신용분석 기초', question: '신용분석 보고서의 구성요소와 작성방법을 설명하시오.', completed: false },
  { id: 10, topic: '신용분석 기초', question: '신용분석에서 비재무적 요소(경영진, 산업환경 등)의 중요성을 설명하시오.', completed: false },
  // 토픽 2: 재무비율분석
  { id: 11, topic: '재무비율분석', question: '유동성비율(유동비율, 당좌비율)의 의미와 계산방법을 설명하시오.', completed: false },
  { id: 12, topic: '재무비율분석', question: '부채비율과 자기자본비율의 의미와 적정수준 판단기준을 설명하시오.', completed: false },
  { id: 13, topic: '재무비율분석', question: '이자보상비율(Interest Coverage Ratio)의 의미와 신용분석에서의 활용을 설명하시오.', completed: false },
  { id: 14, topic: '재무비율분석', question: '총자산이익률(ROA)과 자기자본이익률(ROE)을 비교 설명하시오.', completed: false },
  { id: 15, topic: '재무비율분석', question: 'ROE 분해(DuPont Analysis)의 3요소와 5요소 분해를 설명하시오.', completed: false },
  { id: 16, topic: '재무비율분석', question: '매출액이익률(매출총이익률, 영업이익률, 순이익률)의 의미와 분석방법을 설명하시오.', completed: false },
  { id: 17, topic: '재무비율분석', question: '총자산회전율과 재고자산회전율의 의미와 활용을 설명하시오.', completed: false },
  { id: 18, topic: '재무비율분석', question: '매출채권회전율과 매출채권회수기간의 분석방법을 설명하시오.', completed: false },
  { id: 19, topic: '재무비율분석', question: '현금순환주기(Cash Conversion Cycle)의 계산과 의미를 설명하시오.', completed: false },
  { id: 20, topic: '재무비율분석', question: '성장성비율(매출액증가율, 총자산증가율 등)의 분석방법을 설명하시오.', completed: false },
  // 토픽 3: 현금흐름분석
  { id: 21, topic: '현금흐름분석', question: '현금흐름표의 3가지 활동별 현금흐름을 설명하시오.', completed: false },
  { id: 22, topic: '현금흐름분석', question: '영업활동현금흐름의 직접법과 간접법 차이를 설명하시오.', completed: false },
  { id: 23, topic: '현금흐름분석', question: '당기순이익과 영업활동현금흐름의 차이 원인을 설명하시오.', completed: false },
  { id: 24, topic: '현금흐름분석', question: '잉여현금흐름(FCF: Free Cash Flow)의 계산방법과 활용을 설명하시오.', completed: false },
  { id: 25, topic: '현금흐름분석', question: 'EBITDA의 개념과 신용분석에서의 활용을 설명하시오.', completed: false },
  { id: 26, topic: '현금흐름분석', question: '현금흐름비율(현금흐름대비부채비율 등)을 설명하시오.', completed: false },
  { id: 27, topic: '현금흐름분석', question: '현금흐름 패턴 분석(성장기, 성숙기, 쇠퇴기)을 설명하시오.', completed: false },
  { id: 28, topic: '현금흐름분석', question: '투자활동현금흐름 분석 시 유의사항을 설명하시오.', completed: false },
  { id: 29, topic: '현금흐름분석', question: '재무활동현금흐름 분석 시 유의사항을 설명하시오.', completed: false },
  { id: 30, topic: '현금흐름분석', question: '현금흐름표를 통한 분식회계 탐지방법을 설명하시오.', completed: false },
  // 토픽 4: 신용등급 결정
  { id: 31, topic: '신용등급 결정', question: '신용등급의 의의와 등급체계(AAA~D)를 설명하시오.', completed: false },
  { id: 32, topic: '신용등급 결정', question: '투자등급(Investment Grade)과 투기등급(Speculative Grade)의 구분기준을 설명하시오.', completed: false },
  { id: 33, topic: '신용등급 결정', question: '장기신용등급과 단기신용등급의 차이를 설명하시오.', completed: false },
  { id: 34, topic: '신용등급 결정', question: '신용등급 결정 시 정량적 요소와 정성적 요소를 설명하시오.', completed: false },
  { id: 35, topic: '신용등급 결정', question: '신용등급 전망(Outlook)과 Watch의 의미를 설명하시오.', completed: false },
  { id: 36, topic: '신용등급 결정', question: '국내 주요 신용평가사(한신평, NICE신평, 한기평)의 등급체계를 설명하시오.', completed: false },
  { id: 37, topic: '신용등급 결정', question: '회사채 신용등급과 기업신용등급의 차이를 설명하시오.', completed: false },
  { id: 38, topic: '신용등급 결정', question: '신용등급의 한계점과 보완방법을 설명하시오.', completed: false },
  { id: 39, topic: '신용등급 결정', question: '구조화금융(ABS, MBS 등)의 신용등급 결정방법을 설명하시오.', completed: false },
  { id: 40, topic: '신용등급 결정', question: '금융기관(은행, 보험사) 신용등급의 특수성을 설명하시오.', completed: false },
  // 토픽 5: 신용리스크
  { id: 41, topic: '신용리스크', question: '신용리스크의 정의와 구성요소(PD, LGD, EAD)를 설명하시오.', completed: false },
  { id: 42, topic: '신용리스크', question: '예상손실(EL)과 비예상손실(UL)의 개념과 계산을 설명하시오.', completed: false },
  { id: 43, topic: '신용리스크', question: '신용VaR(Credit Value at Risk)의 개념과 활용을 설명하시오.', completed: false },
  { id: 44, topic: '신용리스크', question: '채무불이행(Default)의 정의와 유형을 설명하시오.', completed: false },
  { id: 45, topic: '신용리스크', question: '대손충당금 설정방법(개별평가, 집합평가)을 설명하시오.', completed: false },
  { id: 46, topic: '신용리스크', question: '여신심사와 사후관리의 중요성을 설명하시오.', completed: false },
  { id: 47, topic: '신용리스크', question: '담보평가와 담보인정비율(LTV)의 개념을 설명하시오.', completed: false },
  { id: 48, topic: '신용리스크', question: '신용리스크 경감기법(보증, 신용파생상품, 네팅 등)을 설명하시오.', completed: false },
  { id: 49, topic: '신용리스크', question: '조기경보시스템(Early Warning System)의 구축과 운영을 설명하시오.', completed: false },
  { id: 50, topic: '신용리스크', question: '바젤협약의 신용리스크 규제(표준방법, IRB방법)를 설명하시오.', completed: false },
];

export default function CreditAnalysisPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('credit-analyst-credit-analysis-progress');
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
    localStorage.setItem('credit-analyst-credit-analysis-progress', JSON.stringify(completedIds));
  };

  const toggleComplete = (id: number) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, completed: !q.completed } : q
    );
    setQuestions(updated);
    saveProgress(updated);
  };

  const openAIModal = (question: string) => {
    const prompt = `신용분석사 신용분석 문제입니다.\n\n문제: ${question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산방법 또는 분석방법\n4. 실무 적용 사례\n5. 기출 포인트`;
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-violet-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-violet-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-violet-600 transition">금융</Link>
            <span>/</span>
            <Link href="/category/finance/credit-analyst" className="hover:text-violet-600 transition">신용분석사</Link>
            <span>/</span>
            <span className="text-violet-600 font-medium">신용분석</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">신용분석</h1>
          <p className="text-gray-600 mt-1">신용분석 기초, 재무비율분석, 현금흐름분석, 신용등급, 신용리스크</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-violet-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-violet-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-violet-500 to-purple-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{completedCount} / {questions.length} 문항 완료</p>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-violet-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTopic === null
                  ? 'border-violet-500 bg-violet-50 text-violet-700'
                  : 'border-gray-200 hover:border-violet-300 text-gray-600'
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
                      ? 'border-violet-500 bg-violet-50 text-violet-700'
                      : 'border-gray-200 hover:border-violet-300 text-gray-600'
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
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-violet-100">
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
                    : 'border-gray-200 hover:border-violet-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(q.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      q.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-violet-500'
                    }`}
                  >
                    {q.completed && <span>✓</span>}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-violet-100 text-violet-700 rounded-full font-medium">
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
                    className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg hover:from-violet-600 hover:to-purple-600 transition-all text-sm font-medium shadow-md hover:shadow-lg"
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
            href="/category/finance/credit-analyst"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-violet-200 text-violet-600 rounded-xl hover:bg-violet-50 transition font-medium"
          >
            ← 신용분석사 메인으로
          </Link>
        </div>
      </main>

      {/* AI Modal */}
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}
    </div>
  );
}
