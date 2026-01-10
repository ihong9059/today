'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'asset-allocation',
    name: '자산배분',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: '전략적 자산배분과 전술적 자산배분을 비교하시오.',
        answer: '전략적: 장기목표 기반 / 전술적: 시장상황에 따른 단기 조정',
        prompt: `자산관리사 시험 문제입니다.

문제: 전략적 자산배분과 전술적 자산배분을 비교하시오.

다음 내용을 포함하여 설명해주세요:
1. 전략적 자산배분(SAA)의 개념
2. 전술적 자산배분(TAA)의 개념
3. 리밸런싱 전략
4. 투자자 성향과 연계
5. 자산배분의 중요성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '포트폴리오 이론에서 효율적 투자선을 설명하시오.',
        answer: '동일 위험에서 최대 수익, 동일 수익에서 최소 위험 조합',
        prompt: `자산관리사 시험 문제입니다.

문제: 포트폴리오 이론에서 효율적 투자선을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 마코위츠 포트폴리오 이론
2. 효율적 투자선(Efficient Frontier)
3. 최소분산 포트폴리오
4. 무위험자산과 자본배분선
5. 최적 포트폴리오 선택

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '분산투자 효과와 상관계수의 관계를 설명하시오.',
        answer: '상관계수가 낮을수록 분산투자 효과 증가',
        prompt: `자산관리사 시험 문제입니다.

문제: 분산투자 효과와 상관계수의 관계를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 분산투자의 원리
2. 상관계수의 범위와 의미
3. 포트폴리오 위험 계산
4. 자산군별 상관관계
5. 분산투자의 한계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '생애주기에 따른 자산배분 전략을 설명하시오.',
        answer: '청년기: 위험자산 비중↑ / 노년기: 안전자산 비중↑',
        prompt: `자산관리사 시험 문제입니다.

문제: 생애주기에 따른 자산배분 전략을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 생애주기 가설
2. 연령별 자산배분 권장 비율
3. 인적자본과 금융자본
4. 목표일자펀드(TDF)
5. 은퇴 전후 전략 변화

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '투자성향 분석의 요소를 설명하시오.',
        answer: '위험감수능력(객관적) + 위험감수성향(주관적)',
        prompt: `자산관리사 시험 문제입니다.

문제: 투자성향 분석의 요소를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 위험감수능력의 구성요소
2. 위험감수성향의 측정
3. 투자목적과 기간
4. 투자자 분류 (안정형~공격형)
5. 적합성 원칙

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'tax-planning',
    name: '세무설계',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      {
        id: 1,
        question: '금융소득종합과세 기준과 세율을 설명하시오.',
        answer: '이자·배당소득 2천만원 초과 시 종합과세, 6%~45%',
        prompt: `자산관리사 시험 문제입니다.

문제: 금융소득종합과세 기준과 세율을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 금융소득의 범위
2. 종합과세 기준 (2천만원)
3. 종합소득세율
4. 분리과세와의 비교
5. 절세 전략

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '양도소득세의 과세대상과 세율을 설명하시오.',
        answer: '부동산, 주식 등 양도차익 과세, 보유기간·규모에 따라 세율 차등',
        prompt: `자산관리사 시험 문제입니다.

문제: 양도소득세의 과세대상과 세율을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 양도소득세 과세대상
2. 부동산 양도소득세율
3. 주식 양도소득세
4. 장기보유특별공제
5. 비과세 및 감면

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '연금소득의 과세방법을 설명하시오.',
        answer: '공적연금: 연금소득세 / 사적연금: 1,200만원 초과 시 종합과세',
        prompt: `자산관리사 시험 문제입니다.

문제: 연금소득의 과세방법을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 공적연금의 과세
2. 사적연금의 과세
3. 연금저축 세액공제
4. 분리과세 선택
5. 연금수령 전략

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '증여세와 상속세의 차이를 설명하시오.',
        answer: '증여: 생전 무상이전 / 상속: 사망으로 인한 이전, 공제액 차이',
        prompt: `자산관리사 시험 문제입니다.

문제: 증여세와 상속세의 차이를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 증여세의 과세 기준
2. 상속세의 과세 기준
3. 공제 항목 비교
4. 세율 구조
5. 절세 전략

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '절세형 금융상품의 종류를 설명하시오.',
        answer: '연금저축, IRP, ISA, 비과세종합저축 등',
        prompt: `자산관리사 시험 문제입니다.

문제: 절세형 금융상품의 종류를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 연금저축의 세제혜택
2. IRP의 특징과 혜택
3. ISA의 비과세 한도
4. 비과세종합저축
5. 상품별 가입 전략

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];


export default function WealthmanagementStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('financial-planner-wealth-management-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('financial-planner-wealth-management-progress', JSON.stringify(updated));
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
            <Link href="/category/finance/financial-planner" className="text-gray-600 hover:text-teal-600">자산관리사(FP)</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">자산관리</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">자산관리</h1>
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
