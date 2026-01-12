'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SituationStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'rule-application',
      name: '법규적용',
      icon: '📜',
      questions: [
        { id: 1, q: '법규적용 문제 접근법을 설명하시오.', a: '조문 구조 파악 → 요건 확인 → 사례 적용' },
        { id: 2, q: '조문 해석 원칙을 설명하시오.', a: '문리해석 우선, 목적론적 해석 보충' },
        { id: 3, q: '요건/효과 분석 방법을 설명하시오.', a: '~하면(요건) ~한다(효과) 구조 파악' },
        { id: 4, q: '예외 규정 처리 방법을 설명하시오.', a: '단서, 다만, 예외 표현 주의 깊게 확인' },
        { id: 5, q: '복합 조건 적용 방법을 설명하시오.', a: 'AND(및), OR(또는) 조건 구분' },
        { id: 6, q: '기한/기간 계산 방법을 설명하시오.', a: '초일산입/불산입, 만료일 특정' },
        { id: 7, q: '금액/수량 계산 적용을 설명하시오.', a: '기준액, 가감율, 상한/하한 확인' },
        { id: 8, q: '자격/절차 요건 확인 방법을 설명하시오.', a: '필수요건과 선택요건 구분' },
        { id: 9, q: '제재/처분 적용 방법을 설명하시오.', a: '위반행위-처분 매칭, 가중/감경 확인' },
        { id: 10, q: '개정 규정 적용 문제를 설명하시오.', a: '시행일, 경과규정, 소급적용 여부 확인' }
      ]
    },
    {
      id: 'situation-inference',
      name: '상황추론',
      icon: '🔍',
      questions: [
        { id: 1, q: '상황추론 문제 유형을 설명하시오.', a: '진위판단, 범인찾기, 조건충족 등' },
        { id: 2, q: '가정법 문제 접근 전략을 설명하시오.', a: '가정 설정 → 조건 적용 → 결과 검증' },
        { id: 3, q: '진술 분석 방법을 설명하시오.', a: '참/거짓 판단, 일관성, 모순 확인' },
        { id: 4, q: '범인찾기 문제 전략을 설명하시오.', a: '알리바이, 증거, 진술 종합 분석' },
        { id: 5, q: '배치/배열 문제 접근법을 설명하시오.', a: '확정 정보 먼저 배치, 소거법 활용' },
        { id: 6, q: '스케줄링 문제 접근법을 설명하시오.', a: '시간대별 정리, 제약조건 확인' },
        { id: 7, q: '자원배분 문제 전략을 설명하시오.', a: '총량 확인, 조건별 할당, 최적해 도출' },
        { id: 8, q: '경로 탐색 문제 접근법을 설명하시오.', a: '조건 정리, 가능 경로 나열, 최적 선택' },
        { id: 9, q: '조합/선택 문제 전략을 설명하시오.', a: '필수/선택 구분, 제약조건 반영' },
        { id: 10, q: '순서결정 문제 접근법을 설명하시오.', a: '선후관계 파악, 고정점 찾기' }
      ]
    },
    {
      id: 'decision-making',
      name: '의사결정',
      icon: '⚖️',
      questions: [
        { id: 1, q: '의사결정 문제 유형을 설명하시오.', a: '대안 선택, 최적화, 게임이론 등' },
        { id: 2, q: '대안 비교 방법을 설명하시오.', a: '기준 설정, 정량/정성 평가, 순위화' },
        { id: 3, q: '비용-편익 분석을 설명하시오.', a: '비용과 편익 정량화, 순편익 비교' },
        { id: 4, q: '기회비용 개념을 설명하시오.', a: '선택하지 않은 대안의 최대 가치' },
        { id: 5, q: '매몰비용 개념을 설명하시오.', a: '이미 지출되어 회수 불가능한 비용, 의사결정 시 배제' },
        { id: 6, q: '위험/불확실성 하의 결정을 설명하시오.', a: '기대값, 최대최소 기준 등 활용' },
        { id: 7, q: '게임이론 기초를 설명하시오.', a: '경쟁상황에서 최적 전략 선택' },
        { id: 8, q: '우선순위 결정 방법을 설명하시오.', a: '긴급성, 중요성, 영향력 종합 고려' },
        { id: 9, q: '제약조건 하의 최적화를 설명하시오.', a: '자원/시간 한계 내 목표 최대화' },
        { id: 10, q: '다기준 의사결정을 설명하시오.', a: '여러 기준 가중치 부여, 종합점수 비교' }
      ]
    },
    {
      id: 'puzzle',
      name: '퍼즐/논리게임',
      icon: '🧩',
      questions: [
        { id: 1, q: '논리퍼즐 접근 전략을 설명하시오.', a: '조건 정리 → 확정 정보 → 추론 → 검증' },
        { id: 2, q: '진실/거짓 문제 접근법을 설명하시오.', a: '진실자/거짓말쟁이 가정 후 모순 확인' },
        { id: 3, q: '좌석배치 문제 전략을 설명하시오.', a: '기준점 설정, 상대위치 관계 정리' },
        { id: 4, q: '매칭 문제 접근법을 설명하시오.', a: '표 작성, 확정 정보 기입, 소거' },
        { id: 5, q: '수열/패턴 문제 접근법을 설명하시오.', a: '차이, 비율, 주기 패턴 파악' },
        { id: 6, q: '암호해독 문제 전략을 설명하시오.', a: '규칙 파악, 대응관계 분석' },
        { id: 7, q: '도형추론 문제 접근법을 설명하시오.', a: '회전, 대칭, 변환 규칙 파악' },
        { id: 8, q: '조합 계산 문제를 설명하시오.', a: '경우의 수, 순열, 조합 공식 활용' },
        { id: 9, q: '확률 계산 문제를 설명하시오.시오.', a: '기본 확률, 조건부 확률 계산' },
        { id: 10, q: '집합 문제 접근법을 설명하시오.', a: '벤다이어그램, 포함배제 원리 활용' }
      ]
    },
    {
      id: 'strategy',
      name: '문제 풀이 전략',
      icon: '⚡',
      questions: [
        { id: 1, q: '상황판단 시간배분을 설명하시오.', a: '문제당 약 2분, 어려운 문제 후순위' },
        { id: 2, q: '문제유형 파악 방법을 설명하시오.', a: '제시문 형태로 유형 구분, 접근법 결정' },
        { id: 3, q: '조건 정리 방법을 설명하시오.', a: '핵심 조건 표시, 시각화, 기호화' },
        { id: 4, q: '선지 활용 전략을 설명하시오.', a: '선지에서 힌트 얻기, 역산 검증' },
        { id: 5, q: '소거법 활용 전략을 설명하시오.', a: '확실히 틀린 선지 먼저 제외' },
        { id: 6, q: '표/그림 활용법을 설명하시오.', a: '복잡한 조건은 시각화하여 정리' },
        { id: 7, q: '가정검증법을 설명하시오.', a: '선지를 참으로 가정하고 모순 확인' },
        { id: 8, q: '최악의 경우 분석을 설명하시오.', a: '보장되는 최소값/최대값 확인' },
        { id: 9, q: '실수 방지 전략을 설명하시오.', a: '조건 재확인, 선지 정확히 읽기' },
        { id: 10, q: '포기 기준을 설명하시오.', a: '3분 이상 소요 시 표시 후 다음으로' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('civil5-situation-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil5-situation-progress', JSON.stringify(updated));
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
    const prompt = `5급 공채(행정고시) PSAT 상황판단 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🎯 상황판단</h1>
          <p className="text-gray-600 mb-4">법규적용, 상황추론, 의사결정</p>
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
