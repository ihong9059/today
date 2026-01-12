'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VerbalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'argument-analysis',
      name: '논증분석',
      icon: '🔍',
      questions: [
        { id: 1, q: '논증의 구성요소를 설명하시오.', a: '전제(근거), 결론(주장), 추론과정' },
        { id: 2, q: '연역논증의 특징을 설명하시오.', a: '전제가 참이면 결론이 반드시 참, 필연적 추론' },
        { id: 3, q: '귀납논증의 특징을 설명하시오.', a: '전제가 참이어도 결론이 개연적, 확률적 추론' },
        { id: 4, q: '타당한 논증과 건전한 논증의 차이를 설명하시오.', a: '타당: 형식적 올바름 / 건전: 타당+전제가 실제로 참' },
        { id: 5, q: '숨은 전제 찾기 방법을 설명하시오.', a: '결론 도출에 필요하나 명시되지 않은 가정 파악' },
        { id: 6, q: '논증 강화/약화 문제 접근법을 설명하시오.', a: '전제-결론 연결고리 파악 후 지지/반박 선지 찾기' },
        { id: 7, q: '반론 제시 문제 유형을 설명하시오.', a: '논증의 전제 부정, 반례 제시, 대안 설명 제공' },
        { id: 8, q: '유비논증의 평가 기준을 설명하시오.', a: '비교대상 간 유사성의 정도와 관련성' },
        { id: 9, q: '인과논증의 평가 방법을 설명하시오.', a: '시간순서, 상관관계, 제3변수 통제 확인' },
        { id: 10, q: '논증 재구성 문제 접근법을 설명하시오.', a: '핵심 주장 파악 → 근거 정리 → 논리적 순서 배열' }
      ]
    },
    {
      id: 'logical-error',
      name: '논리적 오류',
      icon: '⚠️',
      questions: [
        { id: 1, q: '허수아비 공격 오류를 설명하시오.', a: '상대 주장을 왜곡하여 공격하기 쉬운 형태로 변형' },
        { id: 2, q: '순환논증 오류를 설명하시오.', a: '결론을 전제로 사용, 논점 선취의 오류' },
        { id: 3, q: '성급한 일반화 오류를 설명하시오.', a: '불충분한 사례로 전체에 대한 결론 도출' },
        { id: 4, q: '인신공격 오류를 설명하시오.', a: '주장 대신 주장자의 인격/배경을 공격' },
        { id: 5, q: '거짓 딜레마 오류를 설명하시오.', a: '실제로 더 많은 선택지가 있는데 두 가지로 한정' },
        { id: 6, q: '권위에 호소 오류를 설명하시오.', a: '관련 없는 권위자의 의견을 근거로 제시' },
        { id: 7, q: '감정에 호소 오류를 설명하시오.', a: '논리적 근거 대신 감정에 호소하여 설득' },
        { id: 8, q: '미끄러운 비탈길 오류를 설명하시오.', a: '한 가지가 일어나면 연쇄적 결과 발생 주장' },
        { id: 9, q: '원천봉쇄 오류를 설명하시오.', a: '정보의 출처를 문제 삼아 내용 자체를 부정' },
        { id: 10, q: '피장파장 오류를 설명하시오.', a: '상대도 같은 잘못을 했다며 자신의 잘못 정당화' }
      ]
    },
    {
      id: 'reading-comprehension',
      name: '독해',
      icon: '📖',
      questions: [
        { id: 1, q: '중심 내용 파악 전략을 설명하시오.', a: '각 문단 주제문 파악, 반복 키워드, 글의 구조 분석' },
        { id: 2, q: '세부 내용 확인 문제 접근법을 설명하시오.', a: '선지와 지문 대조, 변형/왜곡 여부 확인' },
        { id: 3, q: '필자의 관점 파악 방법을 설명하시오.', a: '평가적 표현, 강조 어구, 결론부 주목' },
        { id: 4, q: '글의 전개 방식 유형을 설명하시오.', a: '비교/대조, 원인/결과, 문제/해결, 시간순 등' },
        { id: 5, q: '추론 문제 유형을 설명하시오.', a: '빈칸 추론, 다음 내용 추론, 전제 추론' },
        { id: 6, q: '빈칸 추론 전략을 설명하시오.', a: '앞뒤 문맥, 접속어, 지시어 활용' },
        { id: 7, q: '일치/불일치 문제 접근법을 설명하시오.', a: '선지별 해당 부분 찾아 대조, 범위/정도 주의' },
        { id: 8, q: '문단 배열 문제 전략을 설명하시오.', a: '지시어, 접속어, 시간/논리적 순서 파악' },
        { id: 9, q: '어휘/어구 의미 파악 방법을 설명하시오.', a: '문맥 속 사용 맥락, 대체 가능성 검토' },
        { id: 10, q: '복합 지문 접근법을 설명하시오.', a: '각 지문 요지 파악 후 관계(일치/대립/보완) 분석' }
      ]
    },
    {
      id: 'inference',
      name: '추론',
      icon: '💭',
      questions: [
        { id: 1, q: '필연적 추론과 개연적 추론의 차이를 설명하시오.', a: '필연: 전제 참이면 결론 반드시 참 / 개연: 확률적' },
        { id: 2, q: '정언삼단논법을 설명하시오.', a: '대전제, 소전제, 결론으로 구성된 연역 추론' },
        { id: 3, q: '가언삼단논법을 설명하시오.', a: 'P→Q, Q→R, 따라서 P→R 형태의 추론' },
        { id: 4, q: '선언삼단논법을 설명하시오.', a: 'P∨Q, ¬P, 따라서 Q 형태의 추론' },
        { id: 5, q: '긍정식과 부정식을 설명하시오.', a: '긍정식: P→Q, P, ∴Q / 부정식: P→Q, ¬Q, ∴¬P' },
        { id: 6, q: '역, 이, 대우 관계를 설명하시오.', a: 'P→Q: 역 Q→P, 이 ¬P→¬Q, 대우 ¬Q→¬P' },
        { id: 7, q: '드모르간 법칙을 설명하시오.', a: '¬(P∧Q)=¬P∨¬Q, ¬(P∨Q)=¬P∧¬Q' },
        { id: 8, q: '배중률을 설명하시오.', a: '어떤 명제는 참이거나 거짓 둘 중 하나' },
        { id: 9, q: '모순율을 설명하시오.', a: '어떤 명제가 동시에 참이면서 거짓일 수 없음' },
        { id: 10, q: '조건문 해석 주의점을 설명하시오.', a: '필요조건/충분조건 구분, 역/대우 혼동 주의' }
      ]
    },
    {
      id: 'language-reasoning',
      name: '언어추리',
      icon: '🧩',
      questions: [
        { id: 1, q: '진위 판단 문제 접근법을 설명하시오.', a: '조건 정리 → 가정 → 검증 → 모순 확인' },
        { id: 2, q: '순서/배열 문제 전략을 설명하시오.', a: '확정 정보부터 배치, 조건 간 연결고리 파악' },
        { id: 3, q: '조합/매칭 문제 접근법을 설명하시오.', a: '표 작성, 확정 정보 기입, 소거법 활용' },
        { id: 4, q: '논리퍼즐 문제 유형을 설명하시오.', a: '진실/거짓, 범인 찾기, 좌석 배치 등' },
        { id: 5, q: '조건 명제 해석 방법을 설명하시오.', a: '~하면, ~해야, ~만, ~때만 등 조건 표현 정확히 이해' },
        { id: 6, q: '가정법 문제 풀이 전략을 설명하시오.', a: '가정 설정 → 조건 적용 → 결과 도출 → 검증' },
        { id: 7, q: '집합 관계 추론을 설명하시오.', a: '벤다이어그램 활용, 포함/배제 관계 파악' },
        { id: 8, q: '수량 명제 해석을 설명하시오.', a: '모든, 어떤, ~가 아닌 것은 없다 등 정확히 이해' },
        { id: 9, q: '시간 관계 추론을 설명하시오.', a: '선후 관계, 동시성, 기간 조건 정리' },
        { id: 10, q: '공간 관계 추론을 설명하시오.', a: '위치, 방향, 거리 조건을 그림으로 정리' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('civil5-verbal-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil5-verbal-progress', JSON.stringify(updated));
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
    const prompt = `5급 공채(행정고시) PSAT 언어논리 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📖 언어논리</h1>
          <p className="text-gray-600 mb-4">논증분석, 비판적 독해, 추론</p>
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
