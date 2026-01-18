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
  { id: 1, name: '회계의 기초', description: '회계의 의의, 목적, 분류' },
  { id: 2, name: '재무제표', description: '재무상태표, 손익계산서, 현금흐름표' },
  { id: 3, name: '회계순환과정', description: '분개, 전기, 수정분개, 마감' },
  { id: 4, name: '자산회계', description: '유동자산, 비유동자산, 감가상각' },
  { id: 5, name: '부채와 자본', description: '부채의 종류, 자본의 구성' },
];

const initialQuestions: Question[] = [
  // 토픽 1: 회계의 기초
  { id: 1, topic: '회계의 기초', question: '회계의 의의와 목적, 회계정보이용자에 대해 설명하시오.', completed: false },
  { id: 2, topic: '회계의 기초', question: '재무회계와 관리회계의 차이점을 비교 설명하시오.', completed: false },
  { id: 3, topic: '회계의 기초', question: '회계공준(기업실체, 계속기업, 기간별 보고, 화폐단위)을 설명하시오.', completed: false },
  { id: 4, topic: '회계의 기초', question: '발생주의와 현금주의의 차이점을 예시와 함께 설명하시오.', completed: false },
  { id: 5, topic: '회계의 기초', question: '일반적으로 인정된 회계원칙(GAAP)의 의의와 특성을 설명하시오.', completed: false },
  { id: 6, topic: '회계의 기초', question: '회계정보의 질적특성(목적적합성, 신뢰성, 비교가능성)을 설명하시오.', completed: false },
  { id: 7, topic: '회계의 기초', question: '자산, 부채, 자본의 정의와 인식기준을 설명하시오.', completed: false },
  { id: 8, topic: '회계의 기초', question: '수익과 비용의 인식원칙(수익인식기준, 대응원칙)을 설명하시오.', completed: false },
  { id: 9, topic: '회계의 기초', question: '회계의 기본등식과 거래의 8요소를 설명하시오.', completed: false },
  { id: 10, topic: '회계의 기초', question: '복식부기의 원리와 차변·대변의 의미를 설명하시오.', completed: false },
  // 토픽 2: 재무제표
  { id: 11, topic: '재무제표', question: '재무제표의 종류와 각각의 목적을 설명하시오.', completed: false },
  { id: 12, topic: '재무제표', question: '재무상태표의 구성요소와 표시방법(계정식, 보고식)을 설명하시오.', completed: false },
  { id: 13, topic: '재무제표', question: '손익계산서의 구성요소와 당기순이익 계산과정을 설명하시오.', completed: false },
  { id: 14, topic: '재무제표', question: '현금흐름표의 의의와 3가지 활동(영업, 투자, 재무)을 설명하시오.', completed: false },
  { id: 15, topic: '재무제표', question: '자본변동표의 목적과 구성내용을 설명하시오.', completed: false },
  { id: 16, topic: '재무제표', question: '주석의 역할과 포함되는 주요 정보를 설명하시오.', completed: false },
  { id: 17, topic: '재무제표', question: '유동자산과 비유동자산의 분류기준을 설명하시오.', completed: false },
  { id: 18, topic: '재무제표', question: '유동부채와 비유동부채의 분류기준을 설명하시오.', completed: false },
  { id: 19, topic: '재무제표', question: '매출총이익, 영업이익, 당기순이익의 차이를 설명하시오.', completed: false },
  { id: 20, topic: '재무제표', question: '포괄손익계산서의 기타포괄손익 항목을 설명하시오.', completed: false },
  // 토픽 3: 회계순환과정
  { id: 21, topic: '회계순환과정', question: '회계순환과정의 전체 흐름을 단계별로 설명하시오.', completed: false },
  { id: 22, topic: '회계순환과정', question: '분개의 의미와 분개장 작성방법을 설명하시오.', completed: false },
  { id: 23, topic: '회계순환과정', question: '총계정원장으로의 전기 절차를 설명하시오.', completed: false },
  { id: 24, topic: '회계순환과정', question: '시산표의 종류(합계, 잔액, 합계잔액)와 작성목적을 설명하시오.', completed: false },
  { id: 25, topic: '회계순환과정', question: '기말수정분개의 필요성과 유형을 설명하시오.', completed: false },
  { id: 26, topic: '회계순환과정', question: '선급비용과 선수수익의 수정분개를 설명하시오.', completed: false },
  { id: 27, topic: '회계순환과정', question: '미지급비용과 미수수익의 수정분개를 설명하시오.', completed: false },
  { id: 28, topic: '회계순환과정', question: '감가상각비의 수정분개와 회계처리를 설명하시오.', completed: false },
  { id: 29, topic: '회계순환과정', question: '대손충당금 설정의 수정분개를 설명하시오.', completed: false },
  { id: 30, topic: '회계순환과정', question: '장부마감 절차(수익·비용계정 마감, 집합손익)를 설명하시오.', completed: false },
  // 토픽 4: 자산회계
  { id: 31, topic: '자산회계', question: '현금및현금성자산의 범위와 회계처리를 설명하시오.', completed: false },
  { id: 32, topic: '자산회계', question: '매출채권의 인식과 대손처리 방법을 설명하시오.', completed: false },
  { id: 33, topic: '자산회계', question: '재고자산의 의의와 원가배분 방법(선입선출, 평균법 등)을 설명하시오.', completed: false },
  { id: 34, topic: '자산회계', question: '재고자산의 저가법 평가와 회계처리를 설명하시오.', completed: false },
  { id: 35, topic: '자산회계', question: '유형자산의 취득원가 결정과 자본적 지출, 수익적 지출을 설명하시오.', completed: false },
  { id: 36, topic: '자산회계', question: '감가상각의 의의와 방법(정액법, 정률법, 연수합계법)을 설명하시오.', completed: false },
  { id: 37, topic: '자산회계', question: '유형자산의 처분, 교환, 손상차손 회계처리를 설명하시오.', completed: false },
  { id: 38, topic: '자산회계', question: '무형자산의 종류와 상각방법을 설명하시오.', completed: false },
  { id: 39, topic: '자산회계', question: '투자자산(지분법적용투자주식, 만기보유금융자산)의 회계처리를 설명하시오.', completed: false },
  { id: 40, topic: '자산회계', question: '자산재평가와 손상차손의 회계처리를 설명하시오.', completed: false },
  // 토픽 5: 부채와 자본
  { id: 41, topic: '부채와 자본', question: '부채의 정의와 유동부채, 비유동부채 분류를 설명하시오.', completed: false },
  { id: 42, topic: '부채와 자본', question: '매입채무와 미지급금의 차이점과 회계처리를 설명하시오.', completed: false },
  { id: 43, topic: '부채와 자본', question: '단기차입금과 유동성장기부채의 회계처리를 설명하시오.', completed: false },
  { id: 44, topic: '부채와 자본', question: '충당부채와 우발부채의 차이점과 인식기준을 설명하시오.', completed: false },
  { id: 45, topic: '부채와 자본', question: '사채의 발행과 이자비용 계산(유효이자율법)을 설명하시오.', completed: false },
  { id: 46, topic: '부채와 자본', question: '자본의 구성요소(자본금, 자본잉여금, 이익잉여금 등)를 설명하시오.', completed: false },
  { id: 47, topic: '부채와 자본', question: '주식발행(액면발행, 할인·할증발행)의 회계처리를 설명하시오.', completed: false },
  { id: 48, topic: '부채와 자본', question: '자기주식 취득과 처분의 회계처리를 설명하시오.', completed: false },
  { id: 49, topic: '부채와 자본', question: '이익잉여금 처분(배당, 적립금 적립)의 회계처리를 설명하시오.', completed: false },
  { id: 50, topic: '부채와 자본', question: '결손금 처리와 자본조정 항목의 회계처리를 설명하시오.', completed: false },
];

export default function AccountingPrinciplesPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('credit-analyst-accounting-principles-progress');
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
    localStorage.setItem('credit-analyst-accounting-principles-progress', JSON.stringify(completedIds));
  };

  const toggleComplete = (id: number) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, completed: !q.completed } : q
    );
    setQuestions(updated);
    saveProgress(updated);
  };

  const openAIModal = (question: string) => {
    const prompt = `신용분석사 회계원리 문제입니다.\n\n문제: ${question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시\n4. 실무 적용\n5. 기출 포인트`;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-blue-600 transition">금융</Link>
            <span>/</span>
            <Link href="/category/finance/credit-analyst" className="hover:text-blue-600 transition">신용분석사</Link>
            <span>/</span>
            <span className="text-blue-600 font-medium">회계원리</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">회계원리</h1>
          <p className="text-gray-600 mt-1">회계의 기초, 재무제표, 회계순환과정, 자산·부채·자본회계</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-blue-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{completedCount} / {questions.length} 문항 완료</p>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-blue-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTopic === null
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300 text-gray-600'
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
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 text-gray-600'
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
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
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
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(q.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      q.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    {q.completed && <span>✓</span>}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
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
                    className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all text-sm font-medium shadow-md hover:shadow-lg"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 transition font-medium"
          >
            ← 신용분석사 메인으로
          </Link>
        </div>
      </main>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}
    </div>
  );
}
