'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

interface Question {
  id: number;
  topic: string;
  question: string;
  prompt: string;
}

const topics = [
  '주식의 이해',
  '채권의 이해',
  '파생상품 기초',
  '집합투자증권',
  '구조화증권'
];

const questions: Question[] = [
  // 토픽 1: 주식의 이해 (5문항)
  { id: 1, topic: '주식의 이해', question: '보통주와 우선주의 차이점 및 각각의 특성은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 보통주와 우선주의 차이점 및 각각의 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 2, topic: '주식의 이해', question: '주식의 발행시장과 유통시장의 구조와 기능은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 주식의 발행시장과 유통시장의 구조와 기능은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 3, topic: '주식의 이해', question: '유상증자와 무상증자의 차이 및 주가에 미치는 영향은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 유상증자와 무상증자의 차이 및 주가에 미치는 영향은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 4, topic: '주식의 이해', question: '주식 거래의 결제제도(T+2)와 매매체결 원칙은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 주식 거래의 결제제도(T+2)와 매매체결 원칙은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 5, topic: '주식의 이해', question: '주식 관련 사채(CB, BW, EB)의 종류와 특징은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 주식 관련 사채(CB, BW, EB)의 종류와 특징은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },

  // 토픽 2: 채권의 이해 (5문항)
  { id: 6, topic: '채권의 이해', question: '채권의 종류(국채, 지방채, 회사채)별 특성과 신용등급은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 채권의 종류(국채, 지방채, 회사채)별 특성과 신용등급은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 7, topic: '채권의 이해', question: '채권 가격과 금리의 관계 및 듀레이션의 개념은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 채권 가격과 금리의 관계 및 듀레이션의 개념은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 8, topic: '채권의 이해', question: '채권 수익률(표면이율, 만기수익률, 경상수익률)의 계산과 의미는?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 채권 수익률(표면이율, 만기수익률, 경상수익률)의 계산과 의미는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 9, topic: '채권의 이해', question: '채권의 발행방식(공모, 사모)과 인수제도는?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 채권의 발행방식(공모, 사모)과 인수제도는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 10, topic: '채권의 이해', question: '채권의 신용위험과 신용스프레드의 개념은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 채권의 신용위험과 신용스프레드의 개념은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },

  // 토픽 3: 파생상품 기초 (5문항)
  { id: 11, topic: '파생상품 기초', question: '선물(Futures)의 개념, 거래구조 및 결제방식은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 선물(Futures)의 개념, 거래구조 및 결제방식은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 12, topic: '파생상품 기초', question: '옵션(Option)의 종류(콜/풋)와 손익구조는?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 옵션(Option)의 종류(콜/풋)와 손익구조는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 13, topic: '파생상품 기초', question: '스왑(Swap)의 종류(금리스왑, 통화스왑)와 활용은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 스왑(Swap)의 종류(금리스왑, 통화스왑)와 활용은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 14, topic: '파생상품 기초', question: '파생상품의 헤지(Hedge)와 투기(Speculation) 목적은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 파생상품의 헤지(Hedge)와 투기(Speculation) 목적은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 15, topic: '파생상품 기초', question: '옵션의 가격결정요인과 그릭스(Greeks)의 개념은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 옵션의 가격결정요인과 그릭스(Greeks)의 개념은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },

  // 토픽 4: 집합투자증권 (5문항)
  { id: 16, topic: '집합투자증권', question: '집합투자기구(펀드)의 종류와 법적 형태는?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 집합투자기구(펀드)의 종류와 법적 형태는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 17, topic: '집합투자증권', question: '펀드의 운용구조와 관련 당사자(운용사, 수탁사, 판매사)의 역할은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 펀드의 운용구조와 관련 당사자(운용사, 수탁사, 판매사)의 역할은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 18, topic: '집합투자증권', question: 'ETF(상장지수펀드)의 구조와 일반 펀드와의 차이점은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: ETF(상장지수펀드)의 구조와 일반 펀드와의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 19, topic: '집합투자증권', question: '펀드의 기준가격(NAV) 산정방식과 수수료 구조는?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 펀드의 기준가격(NAV) 산정방식과 수수료 구조는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 20, topic: '집합투자증권', question: '공모펀드와 사모펀드의 구분 기준 및 규제 차이는?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 공모펀드와 사모펀드의 구분 기준 및 규제 차이는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },

  // 토픽 5: 구조화증권 (5문항)
  { id: 21, topic: '구조화증권', question: 'ELS(주가연계증권)의 구조와 수익/손실 조건은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: ELS(주가연계증권)의 구조와 수익/손실 조건은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 22, topic: '구조화증권', question: 'DLS(파생결합증권)의 종류와 기초자산 특성은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: DLS(파생결합증권)의 종류와 기초자산 특성은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 23, topic: '구조화증권', question: 'ELW(주식워런트증권)의 거래방식과 가격결정요인은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: ELW(주식워런트증권)의 거래방식과 가격결정요인은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 24, topic: '구조화증권', question: '구조화증권의 위험요소와 투자자 보호 규정은?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 구조화증권의 위험요소와 투자자 보호 규정은?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
  { id: 25, topic: '구조화증권', question: '녹인(Knock-In)과 녹아웃(Knock-Out) 조건의 의미와 효과는?', prompt: '증권투자권유자문인력 금융투자상품 문제입니다.\n\n문제: 녹인(Knock-In)과 녹아웃(Knock-Out) 조건의 의미와 효과는?\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 규정\n4. 실무 적용\n5. 기출 포인트' },
];

export default function InvestmentProductsPage() {
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(topics);

  useEffect(() => {
    const saved = localStorage.getItem('securities-advisor-products-progress');
    if (saved) {
      setCompletedItems(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (newCompleted: number[]) => {
    setCompletedItems(newCompleted);
    localStorage.setItem('securities-advisor-products-progress', JSON.stringify(newCompleted));
  };

  const toggleComplete = (id: number) => {
    const newCompleted = completedItems.includes(id)
      ? completedItems.filter(item => item !== id)
      : [...completedItems, id];
    saveProgress(newCompleted);
  };

  const openAIModal = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const getTopicProgress = (topic: string) => {
    const topicQuestions = questions.filter(q => q.topic === topic);
    const completed = topicQuestions.filter(q => completedItems.includes(q.id)).length;
    return { completed, total: topicQuestions.length };
  };

  const totalProgress = Math.round((completedItems.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-green-500 text-white py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-emerald-100 text-sm mb-4">
            <a href="/" className="hover:text-white">홈</a>
            <span className="mx-2">&gt;</span>
            <a href="/category/finance" className="hover:text-white">금융</a>
            <span className="mx-2">&gt;</span>
            <a href="/category/finance/securities-advisor" className="hover:text-white">증권투자권유자문인력</a>
            <span className="mx-2">&gt;</span>
            <span className="text-white">금융투자상품</span>
          </nav>

          <h1 className="text-3xl font-bold mb-2">금융투자상품</h1>
          <p className="text-emerald-100">증권투자권유자문인력 - 금융투자상품의 종류와 특성</p>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>학습 진행률</span>
              <span>{completedItems.length}/{questions.length} 완료 ({totalProgress}%)</span>
            </div>
            <div className="w-full bg-emerald-800 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-300"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map((topic, topicIndex) => {
            const progress = getTopicProgress(topic);
            const isExpanded = expandedTopics.includes(topic);
            const topicQuestions = questions.filter(q => q.topic === topic);

            return (
              <div key={topic} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Topic Header */}
                <button
                  onClick={() => toggleTopic(topic)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      {topicIndex + 1}
                    </span>
                    <div className="text-left">
                      <h2 className="font-bold text-gray-900">{topic}</h2>
                      <p className="text-sm text-gray-500">{progress.completed}/{progress.total} 완료</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                      />
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Questions List */}
                {isExpanded && (
                  <div className="divide-y divide-gray-100">
                    {topicQuestions.map((q, qIndex) => (
                      <div
                        key={q.id}
                        className={`px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition ${
                          completedItems.includes(q.id) ? 'bg-emerald-50/50' : ''
                        }`}
                      >
                        <button
                          onClick={() => toggleComplete(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            completedItems.includes(q.id)
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-gray-300 hover:border-emerald-500'
                          }`}
                        >
                          {completedItems.includes(q.id) && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <span className="text-sm text-gray-400 w-8">{qIndex + 1}.</span>
                        <span className={`flex-1 ${completedItems.includes(q.id) ? 'text-gray-500' : 'text-gray-900'}`}>
                          {q.question}
                        </span>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition text-sm font-medium"
                        >
                          AI 질문
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <a
            href="/category/finance/securities-advisor"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            증권투자권유자문인력 메인으로 돌아가기
          </a>
        </div>
      </main>

      {/* AI Selection Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}
    </div>
  );
}
