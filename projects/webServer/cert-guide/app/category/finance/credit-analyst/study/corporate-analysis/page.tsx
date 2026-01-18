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
  { id: 1, name: '기업분석 개요', description: '기업분석 체계, 정보수집' },
  { id: 2, name: '산업분석', description: '산업구조, 경쟁환경, 수명주기' },
  { id: 3, name: '경영분석', description: '경영전략, 지배구조, 리스크' },
  { id: 4, name: '가치평가', description: 'DCF, 상대가치, 자산가치' },
  { id: 5, name: '부실기업 분석', description: '부실징후, 예측모형, 회생' },
];

const initialQuestions: Question[] = [
  // 토픽 1: 기업분석 개요
  { id: 1, topic: '기업분석 개요', question: '기업분석의 목적과 분석체계를 설명하시오.', completed: false },
  { id: 2, topic: '기업분석 개요', question: 'Top-Down 분석과 Bottom-Up 분석의 차이를 설명하시오.', completed: false },
  { id: 3, topic: '기업분석 개요', question: '기업분석에 필요한 정보원천과 수집방법을 설명하시오.', completed: false },
  { id: 4, topic: '기업분석 개요', question: '공시정보(사업보고서, 분기보고서 등)의 활용방법을 설명하시오.', completed: false },
  { id: 5, topic: '기업분석 개요', question: '기업 현장실사(Due Diligence)의 목적과 절차를 설명하시오.', completed: false },
  { id: 6, topic: '기업분석 개요', question: '비상장기업 분석 시 정보 부족 문제의 해결방안을 설명하시오.', completed: false },
  { id: 7, topic: '기업분석 개요', question: '기업의 사업포트폴리오 분석(BCG Matrix)을 설명하시오.', completed: false },
  { id: 8, topic: '기업분석 개요', question: 'SWOT 분석의 방법과 전략 도출 과정을 설명하시오.', completed: false },
  { id: 9, topic: '기업분석 개요', question: '기업의 핵심역량(Core Competency) 분석방법을 설명하시오.', completed: false },
  { id: 10, topic: '기업분석 개요', question: '기업분석 보고서의 구성요소와 작성 시 유의사항을 설명하시오.', completed: false },
  // 토픽 2: 산업분석
  { id: 11, topic: '산업분석', question: '산업분석의 목적과 주요 분석항목을 설명하시오.', completed: false },
  { id: 12, topic: '산업분석', question: 'Porter의 5가지 경쟁요인(Five Forces) 모형을 설명하시오.', completed: false },
  { id: 13, topic: '산업분석', question: '산업의 수명주기(도입기, 성장기, 성숙기, 쇠퇴기)와 특성을 설명하시오.', completed: false },
  { id: 14, topic: '산업분석', question: '산업집중도와 시장지배력 분석방법을 설명하시오.', completed: false },
  { id: 15, topic: '산업분석', question: '진입장벽과 퇴출장벽의 유형과 영향을 설명하시오.', completed: false },
  { id: 16, topic: '산업분석', question: '산업의 구조변화 요인(기술, 규제, 글로벌화 등)을 설명하시오.', completed: false },
  { id: 17, topic: '산업분석', question: '가치사슬(Value Chain) 분석의 방법과 활용을 설명하시오.', completed: false },
  { id: 18, topic: '산업분석', question: '경기변동과 산업별 영향(경기민감업종, 방어업종)을 설명하시오.', completed: false },
  { id: 19, topic: '산업분석', question: '정부정책과 규제가 산업에 미치는 영향을 설명하시오.', completed: false },
  { id: 20, topic: '산업분석', question: '산업 내 경쟁전략(원가우위, 차별화, 집중화)을 설명하시오.', completed: false },
  // 토픽 3: 경영분석
  { id: 21, topic: '경영분석', question: '경영자 분석(경영능력, 도덕성, 전략 등)의 중요성을 설명하시오.', completed: false },
  { id: 22, topic: '경영분석', question: '기업지배구조 분석(이사회, 감사위원회, 대주주)을 설명하시오.', completed: false },
  { id: 23, topic: '경영분석', question: '소유구조와 경영권 분쟁이 기업가치에 미치는 영향을 설명하시오.', completed: false },
  { id: 24, topic: '경영분석', question: '기업의 전략적 의사결정(M&A, 사업다각화 등) 분석방법을 설명하시오.', completed: false },
  { id: 25, topic: '경영분석', question: '조직구조와 인적자원 분석의 중요성을 설명하시오.', completed: false },
  { id: 26, topic: '경영분석', question: '기업의 운영효율성(생산성, 품질관리) 분석을 설명하시오.', completed: false },
  { id: 27, topic: '경영분석', question: '기업의 연구개발(R&D) 투자와 기술경쟁력 분석을 설명하시오.', completed: false },
  { id: 28, topic: '경영분석', question: '기업의 영업리스크와 재무리스크를 구분 설명하시오.', completed: false },
  { id: 29, topic: '경영분석', question: '계열사 분석과 그룹리스크 평가방법을 설명하시오.', completed: false },
  { id: 30, topic: '경영분석', question: '기업의 ESG(환경, 사회, 지배구조) 분석의 중요성을 설명하시오.', completed: false },
  // 토픽 4: 가치평가
  { id: 31, topic: '가치평가', question: '기업가치평가의 목적과 주요 접근법을 설명하시오.', completed: false },
  { id: 32, topic: '가치평가', question: '현금흐름할인법(DCF)의 개념과 계산절차를 설명하시오.', completed: false },
  { id: 33, topic: '가치평가', question: '가중평균자본비용(WACC)의 계산방법을 설명하시오.', completed: false },
  { id: 34, topic: '가치평가', question: '잔여가치(Terminal Value) 추정방법을 설명하시오.', completed: false },
  { id: 35, topic: '가치평가', question: '상대가치평가법(PER, PBR, EV/EBITDA 등)을 설명하시오.', completed: false },
  { id: 36, topic: '가치평가', question: 'PER(주가수익비율)의 결정요인과 해석방법을 설명하시오.', completed: false },
  { id: 37, topic: '가치평가', question: 'PBR(주가순자산비율)과 ROE의 관계를 설명하시오.', completed: false },
  { id: 38, topic: '가치평가', question: 'EV/EBITDA 배수의 활용과 해석을 설명하시오.', completed: false },
  { id: 39, topic: '가치평가', question: '자산가치평가법(청산가치, 순자산가치)을 설명하시오.', completed: false },
  { id: 40, topic: '가치평가', question: '비상장기업 가치평가의 특수성과 조정방법을 설명하시오.', completed: false },
  // 토픽 5: 부실기업 분석
  { id: 41, topic: '부실기업 분석', question: '기업부실의 정의와 유형(유동성 부실, 지급불능)을 설명하시오.', completed: false },
  { id: 42, topic: '부실기업 분석', question: '기업부실의 원인(내부요인, 외부요인)을 설명하시오.', completed: false },
  { id: 43, topic: '부실기업 분석', question: '부실기업의 재무적 징후(재무비율 악화)를 설명하시오.', completed: false },
  { id: 44, topic: '부실기업 분석', question: '부실기업의 비재무적 징후(경영진 교체, 회계법인 변경 등)를 설명하시오.', completed: false },
  { id: 45, topic: '부실기업 분석', question: 'Z-Score 모형의 개념과 계산방법을 설명하시오.', completed: false },
  { id: 46, topic: '부실기업 분석', question: '로지스틱 회귀분석을 이용한 부실예측 모형을 설명하시오.', completed: false },
  { id: 47, topic: '부실기업 분석', question: '워크아웃(기업개선작업)의 절차와 효과를 설명하시오.', completed: false },
  { id: 48, topic: '부실기업 분석', question: '법정관리(회생절차)의 개요와 진행과정을 설명하시오.', completed: false },
  { id: 49, topic: '부실기업 분석', question: '부실채권(NPL)의 정의와 처리방법을 설명하시오.', completed: false },
  { id: 50, topic: '부실기업 분석', question: 'M&A를 통한 부실기업 정상화 사례와 유의사항을 설명하시오.', completed: false },
];

export default function CorporateAnalysisPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('credit-analyst-corporate-analysis-progress');
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
    localStorage.setItem('credit-analyst-corporate-analysis-progress', JSON.stringify(completedIds));
  };

  const toggleComplete = (id: number) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, completed: !q.completed } : q
    );
    setQuestions(updated);
    saveProgress(updated);
  };

  const openAIModal = (question: string) => {
    const prompt = `신용분석사 기업분석 문제입니다.\n\n문제: ${question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 분석방법 또는 사례\n4. 실무 적용\n5. 기출 포인트`;
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-purple-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/finance" className="hover:text-purple-600 transition">금융</Link>
            <span>/</span>
            <Link href="/category/finance/credit-analyst" className="hover:text-purple-600 transition">신용분석사</Link>
            <span>/</span>
            <span className="text-purple-600 font-medium">기업분석</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800">기업분석</h1>
          <p className="text-gray-600 mt-1">기업분석 개요, 산업분석, 경영분석, 가치평가, 부실기업 분석</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진행률</h2>
            <span className="text-2xl font-bold text-purple-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{completedCount} / {questions.length} 문항 완료</p>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-purple-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTopic === null
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300 text-gray-600'
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
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 text-gray-600'
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
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
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
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(q.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      q.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 hover:border-purple-500'
                    }`}
                  >
                    {q.completed && <span>✓</span>}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
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
                    className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-lg hover:from-purple-600 hover:to-fuchsia-600 transition-all text-sm font-medium shadow-md hover:shadow-lg"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-purple-200 text-purple-600 rounded-xl hover:bg-purple-50 transition font-medium"
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
