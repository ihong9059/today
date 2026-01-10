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
  { id: 1, name: '운영리스크 유형', description: '정의, 손실유형, 사례' },
  { id: 2, name: '측정방법', description: '기초지표, 표준, AMA' },
  { id: 3, name: '내부통제', description: '통제환경, RCSA, KRI' },
  { id: 4, name: 'BCP', description: '업무연속성, 재해복구' },
  { id: 5, name: '자본산출', description: '바젤규제, SMA' },
];

const initialQuestions: Question[] = [
  // 토픽 1: 운영리스크 유형
  { id: 1, topic: '운영리스크 유형', question: '운영리스크의 정의와 특성을 설명하시오.', completed: false },
  { id: 2, topic: '운영리스크 유형', question: '바젤위원회의 운영리스크 7가지 손실유형을 설명하시오.', completed: false },
  { id: 3, topic: '운영리스크 유형', question: '내부사기(Internal Fraud)의 유형과 사례를 설명하시오.', completed: false },
  { id: 4, topic: '운영리스크 유형', question: '외부사기(External Fraud)의 유형과 대응방안을 설명하시오.', completed: false },
  { id: 5, topic: '운영리스크 유형', question: '고용관행 및 업무장 안전 리스크를 설명하시오.', completed: false },
  { id: 6, topic: '운영리스크 유형', question: '고객, 상품 및 영업행위 리스크를 설명하시오.', completed: false },
  { id: 7, topic: '운영리스크 유형', question: '유형자산 손상 리스크의 유형과 사례를 설명하시오.', completed: false },
  { id: 8, topic: '운영리스크 유형', question: '업무중단 및 시스템 장애 리스크를 설명하시오.', completed: false },
  { id: 9, topic: '운영리스크 유형', question: '실행, 배달 및 프로세스 관리 리스크를 설명하시오.', completed: false },
  { id: 10, topic: '운영리스크 유형', question: '주요 운영리스크 사건(베어링스, 소시에테제네랄 등)을 분석하시오.', completed: false },
  // 토픽 2: 측정방법
  { id: 11, topic: '측정방법', question: '운영리스크 측정의 어려움과 접근방법을 설명하시오.', completed: false },
  { id: 12, topic: '측정방법', question: '기초지표법(BIA)의 개념과 자본 계산방법을 설명하시오.', completed: false },
  { id: 13, topic: '측정방법', question: '표준방법(SA)의 개념과 사업부문별 베타계수를 설명하시오.', completed: false },
  { id: 14, topic: '측정방법', question: '고급측정법(AMA)의 개념과 승인요건을 설명하시오.', completed: false },
  { id: 15, topic: '측정방법', question: '내부손실데이터(ILD)의 수집과 활용을 설명하시오.', completed: false },
  { id: 16, topic: '측정방법', question: '외부손실데이터의 활용과 스케일링 방법을 설명하시오.', completed: false },
  { id: 17, topic: '측정방법', question: '시나리오 분석의 개념과 수행방법을 설명하시오.', completed: false },
  { id: 18, topic: '측정방법', question: '업무환경 및 내부통제 요소(BEICF)의 반영을 설명하시오.', completed: false },
  { id: 19, topic: '측정방법', question: '손실분포접근법(LDA)의 개념과 계산과정을 설명하시오.', completed: false },
  { id: 20, topic: '측정방법', question: '운영리스크 VaR과 경제적자본 산출을 설명하시오.', completed: false },
  // 토픽 3: 내부통제
  { id: 21, topic: '내부통제', question: '내부통제시스템의 정의와 구성요소를 설명하시오.', completed: false },
  { id: 22, topic: '내부통제', question: 'COSO 내부통제 프레임워크를 설명하시오.', completed: false },
  { id: 23, topic: '내부통제', question: '통제환경(Control Environment)의 중요성을 설명하시오.', completed: false },
  { id: 24, topic: '내부통제', question: '리스크 평가(Risk Assessment) 프로세스를 설명하시오.', completed: false },
  { id: 25, topic: '내부통제', question: '통제활동(Control Activities)의 유형과 사례를 설명하시오.', completed: false },
  { id: 26, topic: '내부통제', question: 'RCSA(리스크 통제 자가평가)의 개념과 수행방법을 설명하시오.', completed: false },
  { id: 27, topic: '내부통제', question: 'KRI(핵심리스크지표)의 설정과 모니터링을 설명하시오.', completed: false },
  { id: 28, topic: '내부통제', question: '손실사건 보고 및 관리체계를 설명하시오.', completed: false },
  { id: 29, topic: '내부통제', question: '정보 및 커뮤니케이션의 역할을 설명하시오.', completed: false },
  { id: 30, topic: '내부통제', question: '모니터링 활동과 내부감사의 역할을 설명하시오.', completed: false },
  // 토픽 4: BCP
  { id: 31, topic: 'BCP', question: '업무연속성관리(BCM)의 정의와 필요성을 설명하시오.', completed: false },
  { id: 32, topic: 'BCP', question: '업무연속성계획(BCP)의 구성요소를 설명하시오.', completed: false },
  { id: 33, topic: 'BCP', question: '업무영향분석(BIA)의 목적과 수행방법을 설명하시오.', completed: false },
  { id: 34, topic: 'BCP', question: '핵심업무(Critical Business Function) 식별방법을 설명하시오.', completed: false },
  { id: 35, topic: 'BCP', question: '복구목표시점(RPO)과 복구목표시간(RTO)을 설명하시오.', completed: false },
  { id: 36, topic: 'BCP', question: '재해복구계획(DRP)의 구성과 유형을 설명하시오.', completed: false },
  { id: 37, topic: 'BCP', question: '백업센터 유형(Hot, Warm, Cold Site)을 비교 설명하시오.', completed: false },
  { id: 38, topic: 'BCP', question: 'BCP 테스트 유형과 수행방법을 설명하시오.', completed: false },
  { id: 39, topic: 'BCP', question: '위기관리(Crisis Management)와 위기커뮤니케이션을 설명하시오.', completed: false },
  { id: 40, topic: 'BCP', question: '금융기관의 BCP 관련 규제요건을 설명하시오.', completed: false },
  // 토픽 5: 자본산출
  { id: 41, topic: '자본산출', question: '바젤II 운영리스크 자본산출 방법의 발전과정을 설명하시오.', completed: false },
  { id: 42, topic: '자본산출', question: '바젤III의 표준측정법(SMA) 도입 배경을 설명하시오.', completed: false },
  { id: 43, topic: '자본산출', question: 'SMA의 영업지표(BI) 구성요소를 설명하시오.', completed: false },
  { id: 44, topic: '자본산출', question: 'SMA의 영업지표요소(BIC) 계산방법을 설명하시오.', completed: false },
  { id: 45, topic: '자본산출', question: 'SMA의 내부손실승수(ILM) 개념과 계산을 설명하시오.', completed: false },
  { id: 46, topic: '자본산출', question: 'SMA 자본(SMA Capital)의 최종 계산과정을 설명하시오.', completed: false },
  { id: 47, topic: '자본산출', question: '운영리스크 자본과 내부자본의 관계를 설명하시오.', completed: false },
  { id: 48, topic: '자본산출', question: '운영리스크 자본배분과 성과측정을 설명하시오.', completed: false },
  { id: 49, topic: '자본산출', question: '운영리스크 보험의 활용과 자본인정 조건을 설명하시오.', completed: false },
  { id: 50, topic: '자본산출', question: '국내 운영리스크 규제체계와 감독기준을 설명하시오.', completed: false },
];

export default function OperationalRiskPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('frm-operational-risk-progress');
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
    localStorage.setItem('frm-operational-risk-progress', JSON.stringify(completedIds));
  };

  const toggleComplete = (id: number) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, completed: !q.completed } : q
    );
    setQuestions(updated);
    saveProgress(updated);
  };

  const openAIModal = (question: string) => {
    const prompt = `재무위험관리사 운영리스크 문제입니다.\n\n문제: ${question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 실무 적용 사례\n4. 바젤규제 관련 내용\n5. 기출 포인트`;
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-amber-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-amber-600 transition">금융</Link>
            <span>/</span>
            <Link href="/category/finance/financial-risk-manager" className="hover:text-amber-600 transition">재무위험관리사</Link>
            <span>/</span>
            <span className="text-amber-600 font-medium">운영리스크</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">운영리스크</h1>
          <p className="text-gray-600 mt-1">운영리스크 유형, 측정방법, 내부통제, BCP, 자본산출</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-amber-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-amber-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{completedCount} / {questions.length} 문항 완료</p>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-amber-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTopic === null
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 hover:border-amber-300 text-gray-600'
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
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-gray-200 hover:border-amber-300 text-gray-600'
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
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
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
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(q.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      q.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-amber-500'
                    }`}
                  >
                    {q.completed && <span>✓</span>}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
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
                    className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all text-sm font-medium shadow-md hover:shadow-lg"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-amber-200 text-amber-600 rounded-xl hover:bg-amber-50 transition font-medium"
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
