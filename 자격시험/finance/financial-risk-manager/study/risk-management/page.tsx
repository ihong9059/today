'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'market-risk',
    name: '시장리스크',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: 'VaR(Value at Risk)의 정의와 계산방법을 설명하시오.',
        answer: '일정 신뢰수준에서 일정 기간 내 발생할 수 있는 최대 손실',
        prompt: `재무위험관리사 시험 문제입니다.

문제: VaR(Value at Risk)의 정의와 계산방법을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. VaR의 정의
2. 파라메트릭 VaR
3. 히스토리컬 시뮬레이션
4. 몬테카를로 시뮬레이션
5. VaR의 한계점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '베타(β)와 체계적 위험을 설명하시오.',
        answer: '베타=개별주식의 시장대비 민감도, 분산투자로 제거 불가능한 위험',
        prompt: `재무위험관리사 시험 문제입니다.

문제: 베타(β)와 체계적 위험을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 베타의 정의와 계산
2. 체계적 위험과 비체계적 위험
3. CAPM과의 관계
4. 포트폴리오 베타
5. 베타의 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '듀레이션과 볼록성을 설명하시오.',
        answer: '듀레이션=가격민감도, 볼록성=듀레이션 변화율',
        prompt: `재무위험관리사 시험 문제입니다.

문제: 듀레이션과 볼록성을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 듀레이션의 정의와 종류
2. 맥컬리 듀레이션
3. 수정 듀레이션
4. 볼록성(Convexity)의 의미
5. 금리 리스크 관리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '스트레스 테스트의 개념과 방법을 설명하시오.',
        answer: '극단적 시장상황 가정 하 포트폴리오 손실 측정',
        prompt: `재무위험관리사 시험 문제입니다.

문제: 스트레스 테스트의 개념과 방법을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 스트레스 테스트의 목적
2. 역사적 시나리오 분석
3. 가상 시나리오 분석
4. 역스트레스 테스트
5. 규제 요건과 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: 'Backtesting의 목적과 방법을 설명하시오.',
        answer: 'VaR 모형의 정확성 검증, 실제손실과 예측손실 비교',
        prompt: `재무위험관리사 시험 문제입니다.

문제: Backtesting의 목적과 방법을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. Backtesting의 정의
2. 예외발생률 분석
3. 바젤 신호등 접근법
4. Kupiec 테스트
5. 모형 개선 방안

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'credit-risk',
    name: '신용리스크',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      {
        id: 1,
        question: '예상손실(EL)과 비예상손실(UL)을 설명하시오.',
        answer: 'EL=PD×LGD×EAD, UL=손실분포의 표준편차',
        prompt: `재무위험관리사 시험 문제입니다.

문제: 예상손실(EL)과 비예상손실(UL)을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 예상손실(EL) 공식
2. PD, LGD, EAD의 의미
3. 비예상손실(UL)의 개념
4. 경제적 자본과의 관계
5. 충당금과 자본의 역할

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '신용VaR(Credit VaR)을 설명하시오.',
        answer: '신용포트폴리오의 잠재적 손실을 확률적으로 측정',
        prompt: `재무위험관리사 시험 문제입니다.

문제: 신용VaR(Credit VaR)을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 신용VaR의 정의
2. CreditMetrics 모형
3. 신용등급 전이행렬
4. 상관관계와 포트폴리오 효과
5. 시장VaR과의 차이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: 'CDS(신용부도스왑)의 구조를 설명하시오.',
        answer: '보장매수자가 프리미엄 지급, 신용사건 발생 시 보장매도자가 손실 보전',
        prompt: `재무위험관리사 시험 문제입니다.

문제: CDS(신용부도스왑)의 구조를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. CDS의 기본 구조
2. 보장매수자와 보장매도자
3. 신용사건의 정의
4. 프리미엄 결정 요인
5. 결제 방식

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '담보(Collateral)의 신용위험 완화 효과를 설명하시오.',
        answer: '담보가치만큼 LGD 감소, 헤어컷 적용 필요',
        prompt: `재무위험관리사 시험 문제입니다.

문제: 담보(Collateral)의 신용위험 완화 효과를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 담보의 종류
2. LGD 감소 효과
3. 헤어컷의 의미
4. 담보가치 변동 위험
5. 바젤 규제에서의 인정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '카운터파티 리스크를 설명하시오.',
        answer: '장외파생상품 거래에서 상대방 부도로 인한 손실 위험',
        prompt: `재무위험관리사 시험 문제입니다.

문제: 카운터파티 리스크를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 카운터파티 리스크의 정의
2. 대체비용(Replacement Cost)
3. 잠재적 익스포저(PFE)
4. CVA(Credit Valuation Adjustment)
5. 청산소(CCP)의 역할

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];


export default function RiskmanagementStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('financial-risk-manager-risk-management-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('financial-risk-manager-risk-management-progress', JSON.stringify(updated));
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/finance" className="text-gray-600 hover:text-teal-600">금융</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/finance/financial-risk-manager" className="text-gray-600 hover:text-teal-600">재무위험관리사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">리스크관리</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">리스크관리</h1>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-600 h-2 rounded-full transition-all"
                style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{totalCompleted}/{totalQuestions}</span>
          </div>
        </div>

        <div className="space-y-6">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm opacity-80">
                    ({getTopicProgress(topic.id, topic.questions.length)}/{topic.questions.length})
                  </span>
                </div>
                <span className="text-xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleComplete(topic.id, q.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                            completedQuestions[`${topic.id}-${q.id}`]
                              ? 'bg-teal-500 border-teal-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions[`${topic.id}-${q.id}`] && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">{q.id}. {q.question}</p>
                          <p className="text-teal-600 font-medium mb-3">💡 {q.answer}</p>
                          <div className="flex gap-2 flex-wrap">
                            <a
                              href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition"
                            >
                              🧡 Claude
                            </a>
                            <a
                              href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition"
                            >
                              💚 ChatGPT
                            </a>
                            <a
                              href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition"
                            >
                              💙 Gemini
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
