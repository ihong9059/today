'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'fund-basics',
    name: '펀드의 기초',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: '집합투자기구의 정의와 유형을 설명하시오.',
        answer: '2인 이상 투자자 자금 모집 → 운용 → 수익 배분, 투자신탁/투자회사/투자합자회사 등',
        prompt: `펀드투자권유자문인력 시험 문제입니다.

문제: 집합투자기구의 정의와 유형을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 집합투자의 정의 (자본시장법)
2. 집합투자기구의 종류 (법적 형태별)
3. 투자신탁과 투자회사의 차이
4. 공모펀드와 사모펀드
5. 개방형펀드와 폐쇄형펀드

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '펀드의 가치평가와 기준가격을 설명하시오.',
        answer: '순자산가치(NAV) ÷ 총좌수 = 기준가격, 매일 공시',
        prompt: `펀드투자권유자문인력 시험 문제입니다.

문제: 펀드의 가치평가와 기준가격을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 순자산가치(NAV)의 계산
2. 기준가격의 산정방법
3. 기준가격 공시 시점
4. 장부가평가와 시가평가
5. 이익분배금과 기준가격 변동

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '환매와 환매연기 사유를 설명하시오.',
        answer: '환매: 펀드 지분 현금화 / 환매연기: 대량환매, 시장폐쇄 등 시 연기 가능',
        prompt: `펀드투자권유자문인력 시험 문제입니다.

문제: 환매와 환매연기 사유를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 환매의 정의와 절차
2. 환매수수료와 보유기간
3. 환매연기 사유 (법적 근거)
4. 일부환매와 전액환매
5. 환매연기 시 투자자 보호

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '펀드의 보수와 수수료 체계를 설명하시오.',
        answer: '운용보수, 판매보수, 수탁보수, 사무관리보수 / 선취·후취 수수료',
        prompt: `펀드투자권유자문인력 시험 문제입니다.

문제: 펀드의 보수와 수수료 체계를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 운용보수의 성격과 수준
2. 판매보수와 판매수수료 차이
3. 수탁보수와 사무관리보수
4. 선취수수료와 후취수수료
5. 총보수비용(TER)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '투자신탁과 투자회사의 구조적 차이를 설명하시오.',
        answer: '투자신탁: 신탁계약 기반, 수익증권 / 투자회사: 법인, 주식 발행',
        prompt: `펀드투자권유자문인력 시험 문제입니다.

문제: 투자신탁과 투자회사의 구조적 차이를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 법적 성격의 차이
2. 투자자의 지위 (수익자 vs 주주)
3. 증권의 종류 (수익증권 vs 주식)
4. 의사결정 구조
5. 세제상 차이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'fund-types',
    name: '펀드의 종류',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      {
        id: 1,
        question: '주식형 펀드와 채권형 펀드를 비교하시오.',
        answer: '주식형: 주식 60% 이상, 고위험·고수익 / 채권형: 채권 60% 이상, 저위험·저수익',
        prompt: `펀드투자권유자문인력 시험 문제입니다.

문제: 주식형 펀드와 채권형 펀드를 비교하시오.

다음 내용을 포함하여 설명해주세요:
1. 자산배분 기준
2. 위험-수익 특성
3. 투자자 성향과 적합성
4. 세금 처리
5. 혼합형 펀드와의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: 'MMF(Money Market Fund)의 특성을 설명하시오.',
        answer: '단기금융상품 투자, 원금안정 추구, 수시입출금 가능, 장부가평가',
        prompt: `펀드투자권유자문인력 시험 문제입니다.

문제: MMF(Money Market Fund)의 특성을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. MMF의 정의와 투자대상
2. 장부가평가의 의미
3. 유동성과 안정성
4. 단기채 펀드와의 차이
5. MMF 투자 시 유의사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: 'ETF(상장지수펀드)의 특성을 설명하시오.',
        answer: '지수 추적, 거래소 상장, 실시간 매매, 낮은 보수, 설정/환매 제도',
        prompt: `펀드투자권유자문인력 시험 문제입니다.

문제: ETF(상장지수펀드)의 특성을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. ETF의 정의와 구조
2. 지수 추적 방법
3. 일반 펀드와의 차이
4. 설정(Creation)과 환매(Redemption)
5. ETF 투자의 장단점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '재간접펀드(Fund of Funds)의 특성을 설명하시오.',
        answer: '다른 펀드에 투자하는 펀드, 분산투자 효과, 이중 보수 구조',
        prompt: `펀드투자권유자문인력 시험 문제입니다.

문제: 재간접펀드(Fund of Funds)의 특성을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 재간접펀드의 정의
2. 투자 구조와 분산효과
3. 보수 체계 (이중보수)
4. 장단점
5. 자산배분펀드와의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '파생상품펀드의 유형을 설명하시오.',
        answer: '원금보장형 ELF, 레버리지펀드, 인버스펀드 등',
        prompt: `펀드투자권유자문인력 시험 문제입니다.

문제: 파생상품펀드의 유형을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 파생상품펀드의 정의
2. ELF(주가연계펀드) 구조
3. 레버리지 펀드와 인버스 펀드
4. 위험 특성
5. 투자자 적합성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];


export default function FundgeneralStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('fund-advisor-fund-general-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('fund-advisor-fund-general-progress', JSON.stringify(updated));
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
            <Link href="/category/finance/fund-advisor" className="text-gray-600 hover:text-teal-600">펀드투자권유자문인력</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">펀드일반</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">펀드일반</h1>
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
