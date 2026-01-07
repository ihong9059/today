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
  { id: 1, name: '재무보고 개념체계', description: '재무보고 목적, 질적특성' },
  { id: 2, name: '유동자산', description: '현금, 매출채권, 재고자산' },
  { id: 3, name: '비유동자산', description: '유형자산, 무형자산, 투자자산' },
  { id: 4, name: '부채', description: '금융부채, 충당부채, 사채' },
  { id: 5, name: '자본과 이익잉여금', description: '자본구조, 배당, 주당이익' },
];

const initialQuestions: Question[] = [
  // 토픽 1: 재무보고 개념체계
  { id: 1, topic: '재무보고 개념체계', question: 'K-IFRS와 K-GAAP의 주요 차이점을 설명하시오.', completed: false },
  { id: 2, topic: '재무보고 개념체계', question: '재무보고의 목적과 일반목적재무보고의 한계를 설명하시오.', completed: false },
  { id: 3, topic: '재무보고 개념체계', question: '유용한 재무정보의 질적특성(근본적, 보강적 특성)을 설명하시오.', completed: false },
  { id: 4, topic: '재무보고 개념체계', question: '재무제표 요소(자산, 부채, 자본, 수익, 비용)의 정의와 인식기준을 설명하시오.', completed: false },
  { id: 5, topic: '재무보고 개념체계', question: '측정기준(역사적원가, 공정가치, 현재가치 등)을 비교 설명하시오.', completed: false },
  { id: 6, topic: '재무보고 개념체계', question: '재무제표 표시의 일반원칙과 계속기업 가정을 설명하시오.', completed: false },
  { id: 7, topic: '재무보고 개념체계', question: '회계정책, 회계추정의 변경과 오류수정의 회계처리를 설명하시오.', completed: false },
  { id: 8, topic: '재무보고 개념체계', question: '보고기간후 사건의 유형과 회계처리를 설명하시오.', completed: false },
  { id: 9, topic: '재무보고 개념체계', question: '중요성 개념과 재무제표 표시에의 영향을 설명하시오.', completed: false },
  { id: 10, topic: '재무보고 개념체계', question: '연결재무제표와 별도재무제표의 차이점을 설명하시오.', completed: false },
  // 토픽 2: 유동자산
  { id: 11, topic: '유동자산', question: '현금및현금성자산의 범위와 현금과부족 처리를 설명하시오.', completed: false },
  { id: 12, topic: '유동자산', question: '금융자산의 분류(상각후원가, FVOCI, FVPL)와 측정을 설명하시오.', completed: false },
  { id: 13, topic: '유동자산', question: '매출채권의 최초측정과 대손충당금 설정방법을 설명하시오.', completed: false },
  { id: 14, topic: '유동자산', question: '매출채권 양도(팩토링)의 회계처리를 설명하시오.', completed: false },
  { id: 15, topic: '유동자산', question: '어음할인의 제거요건과 회계처리를 설명하시오.', completed: false },
  { id: 16, topic: '유동자산', question: '재고자산의 취득원가 결정과 원가배분 방법을 설명하시오.', completed: false },
  { id: 17, topic: '유동자산', question: '재고자산 저가평가와 손상차손 회계처리를 설명하시오.', completed: false },
  { id: 18, topic: '유동자산', question: '재고자산 감모손실과 평가손실의 차이를 설명하시오.', completed: false },
  { id: 19, topic: '유동자산', question: '소매재고법의 원가율 계산과 기말재고 평가를 설명하시오.', completed: false },
  { id: 20, topic: '유동자산', question: '선급비용과 선급금의 회계처리를 설명하시오.', completed: false },
  // 토픽 3: 비유동자산
  { id: 21, topic: '비유동자산', question: '유형자산의 취득원가에 포함되는 항목을 설명하시오.', completed: false },
  { id: 22, topic: '비유동자산', question: '자본화대상 차입원가의 범위와 계산방법을 설명하시오.', completed: false },
  { id: 23, topic: '비유동자산', question: '유형자산의 후속측정(원가모형, 재평가모형)을 설명하시오.', completed: false },
  { id: 24, topic: '비유동자산', question: '감가상각의 내용연수, 잔존가치, 감가상각방법 결정을 설명하시오.', completed: false },
  { id: 25, topic: '비유동자산', question: '유형자산의 손상차손 인식과 환입을 설명하시오.', completed: false },
  { id: 26, topic: '비유동자산', question: '유형자산의 제거(처분, 교환)와 관련 손익을 설명하시오.', completed: false },
  { id: 27, topic: '비유동자산', question: '무형자산의 정의, 인식요건, 취득원가를 설명하시오.', completed: false },
  { id: 28, topic: '비유동자산', question: '내부창출 무형자산(연구단계, 개발단계)의 회계처리를 설명하시오.', completed: false },
  { id: 29, topic: '비유동자산', question: '영업권의 인식과 후속측정(손상검사)을 설명하시오.', completed: false },
  { id: 30, topic: '비유동자산', question: '투자부동산의 정의와 후속측정(원가모형, 공정가치모형)을 설명하시오.', completed: false },
  // 토픽 4: 부채
  { id: 31, topic: '부채', question: '금융부채의 최초인식과 후속측정을 설명하시오.', completed: false },
  { id: 32, topic: '부채', question: '사채의 할인·할증발행과 유효이자율법 적용을 설명하시오.', completed: false },
  { id: 33, topic: '부채', question: '전환사채의 발행자 회계처리(부채요소, 자본요소 분리)를 설명하시오.', completed: false },
  { id: 34, topic: '부채', question: '신주인수권부사채의 회계처리를 설명하시오.', completed: false },
  { id: 35, topic: '부채', question: '사채의 조기상환과 상환손익 회계처리를 설명하시오.', completed: false },
  { id: 36, topic: '부채', question: '충당부채의 인식요건과 측정(최선의 추정치, 현재가치)을 설명하시오.', completed: false },
  { id: 37, topic: '부채', question: '제품보증충당부채와 판매보증충당부채의 회계처리를 설명하시오.', completed: false },
  { id: 38, topic: '부채', question: '우발부채와 우발자산의 공시 요건을 설명하시오.', completed: false },
  { id: 39, topic: '부채', question: '리스부채의 인식과 측정(리스이용자 회계처리)을 설명하시오.', completed: false },
  { id: 40, topic: '부채', question: '퇴직급여충당부채(확정급여제도)의 회계처리를 설명하시오.', completed: false },
  // 토픽 5: 자본과 이익잉여금
  { id: 41, topic: '자본과 이익잉여금', question: '자본의 분류(자본금, 자본잉여금, 이익잉여금, 기타포괄손익누계액)를 설명하시오.', completed: false },
  { id: 42, topic: '자본과 이익잉여금', question: '보통주와 우선주의 차이점과 회계처리를 설명하시오.', completed: false },
  { id: 43, topic: '자본과 이익잉여금', question: '증자(유상증자, 무상증자)의 회계처리를 설명하시오.', completed: false },
  { id: 44, topic: '자본과 이익잉여금', question: '감자(유상감자, 무상감자)의 회계처리를 설명하시오.', completed: false },
  { id: 45, topic: '자본과 이익잉여금', question: '자기주식의 취득, 처분, 소각의 회계처리를 설명하시오.', completed: false },
  { id: 46, topic: '자본과 이익잉여금', question: '배당(현금배당, 주식배당)의 회계처리를 설명하시오.', completed: false },
  { id: 47, topic: '자본과 이익잉여금', question: '이익잉여금처분계산서의 구성과 작성방법을 설명하시오.', completed: false },
  { id: 48, topic: '자본과 이익잉여금', question: '기본주당이익(EPS)의 계산방법을 설명하시오.', completed: false },
  { id: 49, topic: '자본과 이익잉여금', question: '희석주당이익의 계산방법(전환증권, 주식옵션 고려)을 설명하시오.', completed: false },
  { id: 50, topic: '자본과 이익잉여금', question: '기타포괄손익의 항목과 후속 재분류 여부를 설명하시오.', completed: false },
];

export default function FinancialAccountingPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('credit-analyst-financial-accounting-progress');
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
    localStorage.setItem('credit-analyst-financial-accounting-progress', JSON.stringify(completedIds));
  };

  const toggleComplete = (id: number) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, completed: !q.completed } : q
    );
    setQuestions(updated);
    saveProgress(updated);
  };

  const openAIModal = (question: string) => {
    const prompt = `신용분석사 재무회계 문제입니다.\n\n문제: ${question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 회계처리 예시 (분개 포함)\n4. K-IFRS 기준서 관련 내용\n5. 기출 포인트`;
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-indigo-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-indigo-600 transition">금융</Link>
            <span>/</span>
            <Link href="/category/finance/credit-analyst" className="hover:text-indigo-600 transition">신용분석사</Link>
            <span>/</span>
            <span className="text-indigo-600 font-medium">재무회계</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">재무회계</h1>
          <p className="text-gray-600 mt-1">재무보고 개념체계, 유동자산, 비유동자산, 부채, 자본</p>
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
              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{completedCount} / {questions.length} 문항 완료</p>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-indigo-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTopic === null
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-indigo-300 text-gray-600'
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
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-indigo-300 text-gray-600'
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
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
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
                    className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg hover:from-indigo-600 hover:to-violet-600 transition-all text-sm font-medium shadow-md hover:shadow-lg"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-50 transition font-medium"
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
