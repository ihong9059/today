'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function DataStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'table-analysis',
      name: '표 분석',
      icon: '📋',
      questions: [
        { id: 1, q: '표 해석의 기본 원칙을 설명하시오.', a: '제목, 행/열 헤더, 단위, 주석 먼저 확인' },
        { id: 2, q: '증가율 계산 방법을 설명하시오.', a: '(현재-과거)/과거 × 100' },
        { id: 3, q: '구성비 계산 방법을 설명하시오.', a: '부분/전체 × 100' },
        { id: 4, q: '평균 계산 시 주의점을 설명하시오.', a: '가중평균 여부, 이상치 영향 확인' },
        { id: 5, q: '표의 결측값 처리 방법을 설명하시오.', a: '결측 표시 확인, 합계/평균 계산 시 제외 여부' },
        { id: 6, q: '연도별 비교 분석 방법을 설명하시오.', a: '기준연도 설정, 변화량/변화율 구분' },
        { id: 7, q: '항목별 비교 분석 전략을 설명하시오.', a: '크기 순위, 비율, 차이 분석' },
        { id: 8, q: '복합표 해석 방법을 설명하시오.', a: '행/열 교차 정보, 소계/합계 관계 파악' },
        { id: 9, q: '시계열 데이터 분석을 설명하시오.', a: '추세, 계절성, 불규칙 변동 파악' },
        { id: 10, q: '표 데이터 검증 방법을 설명하시오.', a: '합계 일치, 비율 합 100%, 논리적 정합성' }
      ]
    },
    {
      id: 'graph-analysis',
      name: '그래프 분석',
      icon: '📊',
      questions: [
        { id: 1, q: '막대그래프 해석 방법을 설명하시오.', a: '축 눈금, 범례, 막대 높이/길이 비교' },
        { id: 2, q: '선그래프 해석 방법을 설명하시오.', a: '기울기로 변화율, 교차점으로 역전 파악' },
        { id: 3, q: '원그래프 해석 방법을 설명하시오.', a: '비율 합계 100%, 각 부분 크기 비교' },
        { id: 4, q: '이중축 그래프 주의점을 설명하시오.', a: '좌우 축 단위와 범위가 다름을 인식' },
        { id: 5, q: '누적 그래프 해석 방법을 설명하시오.', a: '전체 합계와 각 부분 기여도 동시 파악' },
        { id: 6, q: '산점도 해석 방법을 설명하시오.', a: '두 변수 간 상관관계, 군집, 이상치 파악' },
        { id: 7, q: '복합 그래프 분석 전략을 설명하시오.', a: '각 그래프 유형별 정보 종합, 관계 파악' },
        { id: 8, q: '그래프 왜곡 사례를 설명하시오.', a: 'Y축 절단, 비례 왜곡, 3D 효과 착시' },
        { id: 9, q: '면적 그래프 해석을 설명하시오.', a: '시간에 따른 구성비 변화 추이 파악' },
        { id: 10, q: '버블차트 해석 방법을 설명하시오.', a: 'X축, Y축, 버블 크기 3가지 변수 동시 분석' }
      ]
    },
    {
      id: 'calculation',
      name: '계산',
      icon: '🔢',
      questions: [
        { id: 1, q: '빠른 덧셈/뺄셈 전략을 설명하시오.', a: '어림수 활용, 보수 이용, 자릿수 맞춤' },
        { id: 2, q: '빠른 곱셈 전략을 설명하시오.', a: '10, 100단위 활용, 분배법칙, 근사값' },
        { id: 3, q: '빠른 나눗셈 전략을 설명하시오.', a: '약분, 기약분수, 소수 변환' },
        { id: 4, q: '백분율 암산 방법을 설명하시오.', a: '10%, 1% 기준 계산, 50%=1/2, 25%=1/4' },
        { id: 5, q: '분수-소수-백분율 변환을 설명하시오.', a: '1/4=0.25=25%, 1/5=0.2=20%' },
        { id: 6, q: '비율 비교 전략을 설명하시오.', a: '분모 통일, 교차곱 비교, 기준값 활용' },
        { id: 7, q: '증감률 연속 적용을 설명하시오.', a: '복리 개념, (1+r₁)(1+r₂)-1' },
        { id: 8, q: '평균 역산 방법을 설명하시오.', a: '평균×개수=합계 이용' },
        { id: 9, q: '가중평균 계산 방법을 설명하시오.', a: 'Σ(값×가중치)/Σ가중치' },
        { id: 10, q: '지수 계산 방법을 설명하시오.', a: '기준연도=100, 비교연도=실제값/기준값×100' }
      ]
    },
    {
      id: 'inference',
      name: '자료 추론',
      icon: '🎯',
      questions: [
        { id: 1, q: '추세 예측 방법을 설명하시오.', a: '과거 패턴 분석, 선형/비선형 추세선' },
        { id: 2, q: '비율 추론 방법을 설명하시오.', a: '주어진 비율로 미지값 계산' },
        { id: 3, q: '누락 데이터 추론을 설명하시오.', a: '합계, 평균, 비율 관계 이용' },
        { id: 4, q: '조건부 계산 문제 접근법을 설명하시오.', a: '조건 적용 순서 파악, 단계별 계산' },
        { id: 5, q: '최적화 문제 접근법을 설명하시오.', a: '제약조건 정리, 목표값 최대/최소화' },
        { id: 6, q: '변화량 예측 방법을 설명하시오.', a: '변화율 적용, 절대량 vs 상대량 구분' },
        { id: 7, q: '순위 추론 방법을 설명하시오.', a: '비교 가능한 값으로 순서 결정' },
        { id: 8, q: '구간 추정 방법을 설명하시오.', a: '최소값, 최대값 범위 계산' },
        { id: 9, q: '복합 조건 충족 여부 판단을 설명하시오.', a: '각 조건 개별 확인 후 AND/OR 적용' },
        { id: 10, q: '선지 검증 전략을 설명하시오.', a: '계산 전 선지 분석, 반례로 소거' }
      ]
    },
    {
      id: 'strategy',
      name: '문제 풀이 전략',
      icon: '⚡',
      questions: [
        { id: 1, q: '시간 관리 전략을 설명하시오.', a: '쉬운 문제 먼저, 어려운 문제 나중에' },
        { id: 2, q: '선지 활용 전략을 설명하시오.', a: '선지 간격으로 정밀도 파악, 역산 가능' },
        { id: 3, q: '어림 계산 활용법을 설명하시오.', a: '정확한 계산 전 대략적 범위 파악' },
        { id: 4, q: '소거법 활용을 설명하시오.', a: '명확히 틀린 선지부터 제외' },
        { id: 5, q: '단위 확인의 중요성을 설명하시오.', a: '백만/천, 원/억원 등 단위 변환 주의' },
        { id: 6, q: '함정 유형을 설명하시오.', a: '단위 혼동, 기준 착오, 항목 혼동' },
        { id: 7, q: '복합 문제 분해 전략을 설명하시오.', a: '하위 질문으로 분해, 단계별 해결' },
        { id: 8, q: '데이터 표시 방법을 설명하시오.', a: '필요한 부분만 표시, 계산 과정 기록' },
        { id: 9, q: '검산 전략을 설명하시오.', a: '다른 방법으로 검증, 상식적 판단' },
        { id: 10, q: '포기 기준을 설명하시오.', a: '3분 이상 소요 시 다음 문제로, 나중에 재도전' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('civil5-data-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil5-data-progress', JSON.stringify(updated));
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
    const prompt = `5급 공채(행정고시) PSAT 자료해석 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📊 자료해석</h1>
          <p className="text-gray-600 mb-4">통계분석, 수치추론, 자료비교</p>
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
