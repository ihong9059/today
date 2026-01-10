'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'customs-basics',
    name: '관세법 기초',
    color: 'from-emerald-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '관세의 정의는?',
        answer: '외국으로부터 수입되는 물품에 대해 부과하는 조세',
        prompt: `관세사 시험 관세법 문제입니다.

문제: 관세의 정의는?

상세히 설명해주세요.`
      },
      {
        id: 2,
        question: '관세의 과세물건은?',
        answer: '수입물품. 수입이란 외국물품을 국내에 반입하거나 소비/사용하는 것',
        prompt: `관세사 시험 관세법 문제입니다.

문제: 관세의 과세물건은?

상세히 설명해주세요.`
      },
      {
        id: 3,
        question: '납세의무자는?',
        answer: '수입신고를 한 화주. 보세구역에서 물품이 도난/분실된 경우 운영인',
        prompt: `관세사 시험 관세법 문제입니다.

문제: 납세의무자는?

상세히 설명해주세요.`
      },
      {
        id: 4,
        question: '보세구역이란?',
        answer: '외국물품을 장치/검사/처리하기 위해 세관장이 지정한 구역',
        prompt: `관세사 시험 관세법 문제입니다.

문제: 보세구역이란?

상세히 설명해주세요.`
      },
      {
        id: 5,
        question: '수입신고시기는?',
        answer: '물품이 보세구역에 반입된 후',
        prompt: `관세사 시험 관세법 문제입니다.

문제: 수입신고시기는?

상세히 설명해주세요.`
      },
    ],
  },
];


export default function CustomslawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('customs-broker-customs-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('customs-broker-customs-law-progress', JSON.stringify(updated));
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
            <Link href="/category/accounting/customs-broker" className="text-gray-600 hover:text-emerald-600">관세사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">관세법</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">관세법</h1>
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
