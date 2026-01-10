'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'accounting-framework',
    name: '회계기준 체계',
    color: 'from-emerald-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: 'IFRS와 K-IFRS의 차이점은?',
        answer: 'K-IFRS는 한국채택국제회계기준으로, 국제회계기준(IFRS)을 한국 실정에 맞게 도입한 것',
        prompt: `공인회계사 시험 재무회계 문제입니다.

문제: IFRS와 K-IFRS의 차이점은?

상세히 설명해주세요.`
      },
      {
        id: 2,
        question: '재무제표의 5가지 구성요소는?',
        answer: '재무상태표, 포괄손익계산서, 자본변동표, 현금흐름표, 주석',
        prompt: `공인회계사 시험 재무회계 문제입니다.

문제: 재무제표의 5가지 구성요소는?

상세히 설명해주세요.`
      },
      {
        id: 3,
        question: '발생주의와 현금주의의 차이는?',
        answer: '발생주의: 거래가 발생한 시점에 인식, 현금주의: 현금을 수취하거나 지급한 시점에 인식',
        prompt: `공인회계사 시험 재무회계 문제입니다.

문제: 발생주의와 현금주의의 차이는?

상세히 설명해주세요.`
      },
      {
        id: 4,
        question: '계속기업가정이란?',
        answer: '기업이 예측 가능한 미래까지 계속 영업활동을 수행할 것이라는 가정',
        prompt: `공인회계사 시험 재무회계 문제입니다.

문제: 계속기업가정이란?

상세히 설명해주세요.`
      },
      {
        id: 5,
        question: '중요성의 원칙이란?',
        answer: '정보누락이나 왜곡표시가 이용자의 경제적 의사결정에 영향을 미칠 수 있는 경우 그 정보는 중요함',
        prompt: `공인회계사 시험 재무회계 문제입니다.

문제: 중요성의 원칙이란?

상세히 설명해주세요.`
      },
    ],
  },
  {
    id: 'asset-accounting',
    name: '자산회계',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: '유형자산의 인식조건 두 가지는?',
        answer: '1) 미래경제적효익이 기업에 유입될 가능성이 높음, 2) 자산의 원가를 신뢰성 있게 측정 가능',
        prompt: `공인회계사 시험 재무회계 문제입니다.

문제: 유형자산의 인식조건 두 가지는?

상세히 설명해주세요.`
      },
      {
        id: 2,
        question: '감가상각 방법 3가지는?',
        answer: '정액법, 정률법, 생산량비례법',
        prompt: `공인회계사 시험 재무회계 문제입니다.

문제: 감가상각 방법 3가지는?

상세히 설명해주세요.`
      },
      {
        id: 3,
        question: '무형자산의 종류는?',
        answer: '특허권, 상표권, 영업권, 개발비, 저작권, 프랜차이즈권 등',
        prompt: `공인회계사 시험 재무회계 문제입니다.

문제: 무형자산의 종류는?

상세히 설명해주세요.`
      },
      {
        id: 4,
        question: '재고자산 평가방법은?',
        answer: '선입선출법(FIFO), 평균법, 개별법. 후입선출법(LIFO)은 K-IFRS에서 금지',
        prompt: `공인회계사 시험 재무회계 문제입니다.

문제: 재고자산 평가방법은?

상세히 설명해주세요.`
      },
      {
        id: 5,
        question: '손상차손이란?',
        answer: '자산의 회수가능액이 장부금액보다 낮을 때 인식하는 손실',
        prompt: `공인회계사 시험 재무회계 문제입니다.

문제: 손상차손이란?

상세히 설명해주세요.`
      },
    ],
  },
];


export default function FinancialaccountingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('cpa-financial-accounting-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('cpa-financial-accounting-progress', JSON.stringify(updated));
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
            <Link href="/" className="text-gray-600 hover:text-emerald-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/accounting" className="text-gray-600 hover:text-emerald-600">회계·세무</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/accounting/cpa" className="text-gray-600 hover:text-emerald-600">공인회계사(CPA)</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">재무회계</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">재무회계</h1>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all"
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
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions[`${topic.id}-${q.id}`] && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">{q.id}. {q.question}</p>
                          <p className="text-emerald-600 font-medium mb-3">💡 {q.answer}</p>
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
