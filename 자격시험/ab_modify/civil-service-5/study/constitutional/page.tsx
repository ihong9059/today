'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ConstitutionalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'constitutional-general',
      name: '헌법총론',
      icon: '📜',
      questions: [
        { id: 1, q: '헌법의 의의와 특성을 설명하시오.', a: '최고규범성, 정치적 규범, 개방적 규범' },
        { id: 2, q: '헌법의 기능을 설명하시오.', a: '국가창설, 기본권 보장, 권력 통제, 정치 통합' },
        { id: 3, q: '헌법 전문의 법적 성격을 설명하시오.', a: '헌법의 일부로서 법적 효력 인정(통설)' },
        { id: 4, q: '국민주권원리를 설명하시오.', a: '모든 국가권력의 정당성이 국민에게 있음' },
        { id: 5, q: '민주공화국의 의미를 설명하시오.', a: '주권재민 + 권력분립 + 법치주의' },
        { id: 6, q: '법치국가원리를 설명하시오.', a: '법의 우위, 법률유보, 기본권 보장' },
        { id: 7, q: '사회국가원리를 설명하시오.', a: '실질적 평등 추구, 사회적 기본권 보장' },
        { id: 8, q: '헌법개정의 한계를 설명하시오.', a: '국민주권, 민주공화국, 기본권 본질 등' },
        { id: 9, q: '헌법의 수호를 설명하시오.', a: '위헌법률심사, 탄핵, 헌법재판 등' },
        { id: 10, q: '대한민국 영토조항의 의미를 설명하시오.', a: '제3조, 한반도와 부속도서, 통일 지향' }
      ]
    },
    {
      id: 'fundamental-rights-general',
      name: '기본권 총론',
      icon: '⚖️',
      questions: [
        { id: 1, q: '기본권의 법적 성격을 설명하시오.', a: '주관적 공권 + 객관적 가치질서' },
        { id: 2, q: '기본권의 주체를 설명하시오.', a: '자연인 중심, 법인의 제한적 인정' },
        { id: 3, q: '기본권의 대국가적 효력을 설명하시오.', a: '국가에 대한 방어권, 청구권, 참여권' },
        { id: 4, q: '기본권의 대사인적 효력을 설명하시오.', a: '직접/간접 적용설, 판례는 간접효력설' },
        { id: 5, q: '기본권의 경합을 설명하시오.', a: '하나의 행위가 여러 기본권 관련, 특별관계 우선' },
        { id: 6, q: '기본권의 충돌을 설명하시오.', a: '상이한 기본권 주체 간 충돌, 이익형량' },
        { id: 7, q: '기본권 제한의 일반원칙을 설명하시오.', a: '법률유보, 과잉금지, 본질내용 침해금지' },
        { id: 8, q: '과잉금지원칙의 내용을 설명하시오.', a: '목적정당성, 수단적합성, 피해최소성, 법익균형성' },
        { id: 9, q: '본질적 내용 침해금지를 설명하시오.', a: '기본권의 핵심영역은 제한 불가' },
        { id: 10, q: '특별권력관계와 기본권을 설명하시오.', a: '군인, 공무원 등 특수신분, 제한적 제약 인정' }
      ]
    },
    {
      id: 'fundamental-rights',
      name: '개별 기본권',
      icon: '🛡️',
      questions: [
        { id: 1, q: '인간의 존엄과 가치를 설명하시오.', a: '모든 기본권의 이념적 출발점, 절대적 권리' },
        { id: 2, q: '행복추구권의 내용을 설명하시오.', a: '일반적 행동자유권, 인격권, 자기결정권' },
        { id: 3, q: '평등권의 내용을 설명하시오.', a: '상대적·실질적 평등, 합리적 차별 허용' },
        { id: 4, q: '신체의 자유를 설명하시오.', a: '적법절차, 영장주의, 무죄추정, 변호인조력권' },
        { id: 5, q: '표현의 자유를 설명하시오.', a: '언론·출판·집회·결사의 자유, 검열금지' },
        { id: 6, q: '종교의 자유를 설명하시오.', a: '신앙, 종교행위, 종교교육의 자유, 정교분리' },
        { id: 7, q: '재산권을 설명하시오.', a: '사유재산 보장, 공용침해 시 정당보상' },
        { id: 8, q: '직업선택의 자유를 설명하시오.', a: '직업결정, 직업수행, 전직의 자유' },
        { id: 9, q: '거주이전의 자유를 설명하시오.', a: '국내이전, 해외이주, 국적변경의 자유' },
        { id: 10, q: '사생활의 비밀과 자유를 설명하시오.', a: '사생활 불가침, 개인정보자기결정권' }
      ]
    },
    {
      id: 'governance',
      name: '통치구조',
      icon: '🏛️',
      questions: [
        { id: 1, q: '권력분립의 원리를 설명하시오.', a: '입법·행정·사법 분리, 상호 견제와 균형' },
        { id: 2, q: '대통령의 헌법상 지위를 설명하시오.', a: '국가원수, 행정수반, 국군통수권자' },
        { id: 3, q: '대통령의 권한을 설명하시오.', a: '국정수행권, 외교권, 국군통수권, 긴급권' },
        { id: 4, q: '국회의 지위와 구성을 설명하시오.', a: '국민대표기관, 입법기관, 비례대표제 혼용' },
        { id: 5, q: '국회의 입법권을 설명하시오.', a: '법률안 발의·심의·의결, 예산 심의권' },
        { id: 6, q: '국회의 재정권을 설명하시오.', a: '예산안 심의·확정, 결산 심사권' },
        { id: 7, q: '국회의 국정통제권을 설명하시오.', a: '국정감사·조사, 탄핵소추, 해임건의' },
        { id: 8, q: '법원의 조직과 권한을 설명하시오.', a: '대법원, 고등법원, 특별법원, 사법권 독립' },
        { id: 9, q: '헌법재판소의 구성을 설명하시오.', a: '9인 재판관, 대통령·국회·대법원장 3인씩 선출' },
        { id: 10, q: '헌법재판소의 권한을 설명하시오.', a: '위헌심판, 탄핵심판, 헌법소원, 권한쟁의' }
      ]
    },
    {
      id: 'constitutional-adjudication',
      name: '헌법재판',
      icon: '⚡',
      questions: [
        { id: 1, q: '위헌법률심판을 설명하시오.', a: '법원 제청 → 헌재 심판, 위헌결정 효력' },
        { id: 2, q: '헌법소원의 유형을 설명하시오.', a: '권리구제형(68조1항), 위헌심사형(68조2항)' },
        { id: 3, q: '헌법소원의 적법요건을 설명하시오.', a: '기본권 침해, 청구기간, 보충성, 자기관련성' },
        { id: 4, q: '탄핵심판을 설명하시오.', a: '헌법·법률 위반 시 국회 소추, 헌재 심판' },
        { id: 5, q: '정당해산심판을 설명하시오.', a: '민주적 기본질서 위배 정당 해산, 정부 제소' },
        { id: 6, q: '권한쟁의심판을 설명하시오.', a: '국가기관·지방자치단체 간 권한 다툼' },
        { id: 7, q: '헌법재판의 심리원칙을 설명하시오.', a: '서면심리 원칙, 구술변론 병행 가능' },
        { id: 8, q: '위헌결정의 효력을 설명하시오.', a: '기속력, 형벌조항은 소급효 인정' },
        { id: 9, q: '헌법불합치결정을 설명하시오.', a: '위헌이나 즉시 효력상실 부적절 시, 개선입법 촉구' },
        { id: 10, q: '한정합헌/위헌결정을 설명하시오.', a: '특정 해석으로 한정하여 합헌/위헌 선언' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('civil5-constitutional-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil5-constitutional-progress', JSON.stringify(updated));
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
    const prompt = `5급 공채(행정고시) 헌법 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">⚖️ 헌법</h1>
          <p className="text-gray-600 mb-4">헌법총론, 기본권, 통치구조</p>
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
