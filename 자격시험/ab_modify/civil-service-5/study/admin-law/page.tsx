'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminLawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'admin-law-general',
      name: '행정법 총론',
      icon: '📜',
      questions: [
        { id: 1, q: '행정법의 법원(法源)을 설명하시오.', a: '헌법, 법률, 명령·규칙, 조례, 관습법, 판례' },
        { id: 2, q: '행정법의 일반원칙을 설명하시오.', a: '법치주의, 신뢰보호, 비례원칙, 평등원칙' },
        { id: 3, q: '법률유보원칙을 설명하시오.', a: '행정작용은 법률의 근거 필요, 침해유보→전부유보' },
        { id: 4, q: '신뢰보호원칙을 설명하시오.', a: '행정청 선행조치 신뢰 보호, 요건과 한계' },
        { id: 5, q: '비례원칙을 설명하시오.', a: '적합성, 필요성, 상당성의 3단계 심사' },
        { id: 6, q: '행정법관계의 특수성을 설명하시오.', a: '공권력성, 일방성, 공정력' },
        { id: 7, q: '공권과 반사적 이익을 설명하시오.', a: '공권: 법적 보호 / 반사적 이익: 사실상 이익' },
        { id: 8, q: '특별권력관계를 설명하시오.', a: '공무원, 군인, 수형자 등 특별한 법률관계' },
        { id: 9, q: '행정상 법률관계의 당사자를 설명하시오.', a: '행정주체(국가, 지자체), 행정객체(사인)' },
        { id: 10, q: '사인의 공법행위를 설명하시오.', a: '신청, 신고, 동의, 이의신청 등' }
      ]
    },
    {
      id: 'administrative-action',
      name: '행정작용',
      icon: '⚡',
      questions: [
        { id: 1, q: '행정행위의 개념을 설명하시오.', a: '행정청의 구체적 법집행, 외부적 효력 발생' },
        { id: 2, q: '행정행위의 종류를 설명하시오.', a: '허가, 특허, 인가, 확인, 공증, 통지, 수리' },
        { id: 3, q: '허가와 특허의 차이를 설명하시오.', a: '허가: 금지해제 / 특허: 새로운 권리 설정' },
        { id: 4, q: '행정행위의 효력을 설명하시오.', a: '구속력, 공정력, 존속력, 집행력' },
        { id: 5, q: '공정력을 설명하시오.', a: '하자 있어도 권한기관 취소까지 유효로 추정' },
        { id: 6, q: '행정행위의 하자를 설명하시오.', a: '무효(중대명백), 취소(일반하자)' },
        { id: 7, q: '행정행위의 취소와 철회를 설명하시오.', a: '취소: 원시적 하자 / 철회: 후발적 사유' },
        { id: 8, q: '행정입법을 설명하시오.', a: '법규명령(대통령령 등)과 행정규칙(훈령 등)' },
        { id: 9, q: '행정계획을 설명하시오.', a: '장기적·종합적 행정목표 설정, 계획재량' },
        { id: 10, q: '행정계약을 설명하시오.', a: '공법상 계약, 대등당사자 관계' }
      ]
    },
    {
      id: 'administrative-procedure',
      name: '행정절차',
      icon: '📋',
      questions: [
        { id: 1, q: '행정절차법의 목적을 설명하시오.', a: '국민 권익 보호, 행정의 공정성·투명성 확보' },
        { id: 2, q: '처분의 사전통지를 설명하시오.', a: '불이익처분 전 의견제출 기회 부여' },
        { id: 3, q: '청문 절차를 설명하시오.', a: '허가취소 등 중대처분 시 청문 실시' },
        { id: 4, q: '이유제시의무를 설명하시오.', a: '처분의 근거와 이유를 제시해야 함' },
        { id: 5, q: '신청에 대한 처리기간을 설명하시오.', a: '법정기간 내 처리, 지연 시 통지' },
        { id: 6, q: '행정예고를 설명하시오.', a: '법령·정책 등 입안 시 사전 예고' },
        { id: 7, q: '정보공개제도를 설명하시오.', a: '국민 알권리, 비공개 사유 제한적 열거' },
        { id: 8, q: '개인정보보호를 설명하시오.', a: '수집제한, 목적 외 이용금지, 열람청구권' },
        { id: 9, q: '행정지도를 설명하시오.', a: '비권력적 사실행위, 임의성, 불이익 금지' },
        { id: 10, q: '민원처리절차를 설명하시오.', a: '민원인 권익보호, 처리기간 준수' }
      ]
    },
    {
      id: 'administrative-remedy',
      name: '행정구제',
      icon: '🛡️',
      questions: [
        { id: 1, q: '행정심판의 개념을 설명하시오.', a: '행정청에 의한 쟁송, 준사법적 절차' },
        { id: 2, q: '행정심판의 종류를 설명하시오.', a: '취소심판, 무효확인심판, 의무이행심판' },
        { id: 3, q: '행정심판의 재결을 설명하시오.', a: '각하, 기각, 인용(취소, 변경), 기속력' },
        { id: 4, q: '행정소송의 종류를 설명하시오.', a: '항고소송, 당사자소송, 민중소송, 기관소송' },
        { id: 5, q: '취소소송의 소송요건을 설명하시오.', a: '처분성, 원고적격, 제소기간, 재판관할' },
        { id: 6, q: '처분성을 설명하시오.', a: '구체적 법집행, 외부적 효력, 권리의무 변동' },
        { id: 7, q: '원고적격을 설명하시오.', a: '법률상 이익 있는 자, 확대 추세' },
        { id: 8, q: '취소판결의 효력을 설명하시오.', a: '형성력, 기속력, 제3자효' },
        { id: 9, q: '국가배상을 설명하시오.', a: '공무원 위법행위로 손해 발생 시 배상' },
        { id: 10, q: '손실보상을 설명하시오.', a: '적법행위로 재산권 침해 시 정당한 보상' }
      ]
    },
    {
      id: 'administrative-organization',
      name: '행정조직법',
      icon: '🏛️',
      questions: [
        { id: 1, q: '행정주체의 종류를 설명하시오.', a: '국가, 지방자치단체, 공공단체, 공무수탁사인' },
        { id: 2, q: '행정기관의 개념을 설명하시오.', a: '행정주체의 의사결정·집행 기관' },
        { id: 3, q: '중앙행정기관의 종류를 설명하시오.', a: '대통령, 국무총리, 부·처·청, 위원회' },
        { id: 4, q: '지방자치단체의 종류를 설명하시오.', a: '광역: 시·도 / 기초: 시·군·구' },
        { id: 5, q: '자치입법권을 설명하시오.', a: '조례·규칙 제정, 법령 범위 내' },
        { id: 6, q: '자치사무와 위임사무를 설명하시오.', a: '자치: 고유사무 / 위임: 국가사무 위임' },
        { id: 7, q: '지방의회를 설명하시오.', a: '의결기관, 조례 제정, 예산 심의' },
        { id: 8, q: '지방자치단체의 장을 설명하시오.', a: '집행기관, 규칙 제정, 사무총괄' },
        { id: 9, q: '국가의 지방자치단체 감독을 설명하시오.', a: '합법성 감독 원칙, 위법 시 시정명령' },
        { id: 10, q: '공무원법의 기본원칙을 설명하시오.', a: '직업공무원제, 정치적 중립, 신분보장' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('civil5-adminlaw-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil5-adminlaw-progress', JSON.stringify(updated));
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
    const prompt = `5급 공채(행정고시) 행정법 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📜 행정법</h1>
          <p className="text-gray-600 mb-4">행정법총론, 행정구제, 행정조직</p>
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
