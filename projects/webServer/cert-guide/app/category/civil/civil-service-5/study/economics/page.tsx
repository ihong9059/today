'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function EconomicsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'micro-basic',
      name: '미시경제학 기초',
      icon: '📈',
      questions: [
        { id: 1, q: '희소성과 선택의 문제를 설명하시오.', a: '자원 유한, 욕구 무한 → 선택 불가피, 기회비용 발생' },
        { id: 2, q: '수요와 공급의 법칙을 설명하시오.', a: '가격↑ → 수요↓·공급↑, 가격↓ → 수요↑·공급↓' },
        { id: 3, q: '탄력성의 개념을 설명하시오.', a: '가격변화에 대한 수요량/공급량 변화 비율' },
        { id: 4, q: '소비자 잉여를 설명하시오.', a: '지불의사액 - 실제 지불액' },
        { id: 5, q: '생산자 잉여를 설명하시오.', a: '실제 수취액 - 최소 수취의사액' },
        { id: 6, q: '한계효용체감의 법칙을 설명하시오.', a: '소비량 증가 시 추가 효용 감소' },
        { id: 7, q: '무차별곡선을 설명하시오.', a: '동일 효용 제공하는 재화 조합의 궤적' },
        { id: 8, q: '예산제약선을 설명하시오.', a: '주어진 소득으로 구매 가능한 재화 조합' },
        { id: 9, q: '소비자 최적 선택을 설명하시오.', a: 'MRS = 가격비 (무차별곡선과 예산선 접점)' },
        { id: 10, q: '대체효과와 소득효과를 설명하시오.', a: '대체: 상대가격 변화 / 소득: 실질소득 변화 효과' }
      ]
    },
    {
      id: 'micro-advanced',
      name: '미시경제학 심화',
      icon: '🔬',
      questions: [
        { id: 1, q: '생산함수를 설명하시오.', a: '투입요소와 산출량의 기술적 관계' },
        { id: 2, q: '한계생산체감의 법칙을 설명하시오.', a: '가변투입 증가 시 한계생산 감소' },
        { id: 3, q: '비용함수의 종류를 설명하시오.', a: '고정비용, 가변비용, 총비용, 평균/한계비용' },
        { id: 4, q: '완전경쟁시장을 설명하시오.', a: '다수 판매자, 동질제품, 자유진입, 가격수용자' },
        { id: 5, q: '독점시장을 설명하시오.', a: '단일 공급자, 진입장벽, 가격설정자' },
        { id: 6, q: '과점시장을 설명하시오.', a: '소수 기업, 상호의존성, 전략적 행동' },
        { id: 7, q: '독점적 경쟁시장을 설명하시오.', a: '다수 기업, 차별화 제품, 자유 진입' },
        { id: 8, q: '가격차별을 설명하시오.', a: '동일 재화를 소비자별 다른 가격으로 판매' },
        { id: 9, q: '외부성을 설명하시오.', a: '거래당사자 외 제3자에게 미치는 영향' },
        { id: 10, q: '공공재를 설명하시오.', a: '비경합성, 비배제성 → 시장실패 가능' }
      ]
    },
    {
      id: 'macro-basic',
      name: '거시경제학 기초',
      icon: '🌍',
      questions: [
        { id: 1, q: 'GDP의 개념을 설명하시오.', a: '일정 기간 한 국가 내 생산된 최종재 가치 합계' },
        { id: 2, q: 'GDP의 측정방법을 설명하시오.', a: '생산접근, 지출접근, 소득접근 (삼면등가)' },
        { id: 3, q: '명목GDP와 실질GDP를 설명하시오.', a: '명목: 당해년 가격 / 실질: 기준년 가격' },
        { id: 4, q: '물가지수를 설명하시오.', a: 'GDP디플레이터, 소비자물가지수(CPI)' },
        { id: 5, q: '인플레이션의 원인을 설명하시오.', a: '수요견인(총수요↑), 비용인상(총공급↓)' },
        { id: 6, q: '실업의 유형을 설명하시오.', a: '마찰적, 구조적, 경기적 실업' },
        { id: 7, q: '자연실업률을 설명하시오.', a: '마찰적+구조적 실업률, 완전고용 상태' },
        { id: 8, q: '필립스곡선을 설명하시오.', a: '인플레이션과 실업률의 역관계 (단기)' },
        { id: 9, q: '경기변동을 설명하시오.', a: '확장→정점→수축→저점 반복' },
        { id: 10, q: '총수요-총공급 모형을 설명하시오.', a: 'AD-AS 곡선으로 거시경제 균형 분석' }
      ]
    },
    {
      id: 'macro-policy',
      name: '거시경제정책',
      icon: '🏦',
      questions: [
        { id: 1, q: '재정정책을 설명하시오.', a: '정부지출·조세 조정으로 경기 조절' },
        { id: 2, q: '승수효과를 설명하시오.', a: '초기 지출 증가의 연쇄적 소득 증가 효과' },
        { id: 3, q: '구축효과를 설명하시오.', a: '재정지출↑ → 이자율↑ → 민간투자↓' },
        { id: 4, q: '자동안정화장치를 설명하시오.', a: '누진세, 실업급여 등 자동적 경기조절 기능' },
        { id: 5, q: '통화정책을 설명하시오.', a: '중앙은행의 통화량·이자율 조절' },
        { id: 6, q: '통화정책 수단을 설명하시오.', a: '공개시장조작, 지급준비율, 기준금리' },
        { id: 7, q: '화폐수량설을 설명하시오.', a: 'MV=PY, 통화량 증가 → 물가 상승' },
        { id: 8, q: 'IS-LM 모형을 설명하시오.', a: '재화시장(IS)과 화폐시장(LM) 동시 균형' },
        { id: 9, q: '유동성함정을 설명하시오.', a: '이자율이 매우 낮아 통화정책 무효화' },
        { id: 10, q: '정책시차를 설명하시오.', a: '인식시차, 결정시차, 효과시차' }
      ]
    },
    {
      id: 'public-finance',
      name: '재정학',
      icon: '💵',
      questions: [
        { id: 1, q: '시장실패의 원인을 설명하시오.', a: '외부성, 공공재, 불완전경쟁, 정보비대칭' },
        { id: 2, q: '정부실패의 원인을 설명하시오.', a: '관료제 비효율, 지대추구, 정치적 경기순환' },
        { id: 3, q: '조세의 원칙을 설명하시오.', a: '공평성(수직/수평), 효율성(초과부담 최소화)' },
        { id: 4, q: '조세의 전가와 귀착을 설명하시오.', a: '전가: 조세부담 이전 / 귀착: 최종 부담자' },
        { id: 5, q: '조세의 초과부담을 설명하시오.', a: '조세로 인한 자원배분 왜곡의 사회적 비용' },
        { id: 6, q: '최적조세이론을 설명하시오.', a: '효율성과 공평성 조화, 램지규칙' },
        { id: 7, q: '공채의 경제적 효과를 설명하시오.', a: '경기부양, 세대간 부담 이전, 구축효과' },
        { id: 8, q: '리카도 대등정리를 설명하시오.', a: '국채발행과 증세의 경제적 효과 동일' },
        { id: 9, q: '비용-편익 분석을 설명하시오.', a: '공공사업의 사회적 비용과 편익 비교 평가' },
        { id: 10, q: '지방재정조정제도를 설명하시오.', a: '지방교부세, 국고보조금, 재정 형평화' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('civil5-economics-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil5-economics-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const getTopicProgress = (topicId: string, questionCount: number) => {
    let completed = 0;
    for (let i = 1; i <= questionCount; i++) {
      if (completedQuestions[`${topicId}-${i}`]) completed++;
    }
    return completed;
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;

  const handleAskAI = (question: string) => {
    const prompt = `5급 공채(행정고시) 경제학 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil/civil-service-5" className="text-slate-600 hover:text-slate-800 flex items-center gap-2">
            ← 5급 공채로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">💹 경제학</h1>
          <p className="text-gray-600 mb-4">미시경제, 거시경제, 재정학</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-slate-500 to-gray-600 h-4 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }} />
            </div>
            <span className="text-sm font-medium text-gray-600">{totalCompleted} / {totalQuestions}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => {
            const progress = getTopicProgress(topic.id, topic.questions.length);
            const isExpanded = expandedTopics[topic.id];
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button onClick={() => toggleTopic(topic.id)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <span className="font-semibold text-gray-800">{topic.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{progress}/{topic.questions.length}</span>
                    <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-6 pb-4 space-y-3">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div key={q.id} className={`p-4 rounded-lg border-2 transition-all ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-slate-300'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>{isCompleted && '✓'}</button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                              <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{q.a}</p>
                              <button onClick={() => handleAskAI(q.q)} className="mt-2 text-sm text-slate-600 hover:text-slate-800 flex items-center gap-1">🤖 AI에게 자세히 물어보기</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                  <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
                </div>
                <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
                <div className="space-y-3">
                  <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                    <span className="text-2xl">🧡</span>
                    <div className="text-left"><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                  </a>
                  <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                    <span className="text-2xl">💚</span>
                    <div className="text-left"><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                  </a>
                  <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                    <span className="text-2xl">💙</span>
                    <div className="text-left"><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
