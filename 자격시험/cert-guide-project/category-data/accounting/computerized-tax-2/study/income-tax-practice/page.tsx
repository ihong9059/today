'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'withholding-tax',
    name: '원천징수',
    color: 'from-emerald-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '원천징수란?',
        answer: '소득 지급자가 지급시 세금을 미리 징수하여 국가에 납부하는 제도',
        prompt: `전산세무 2급 시험 문제입니다.

문제: 원천징수란?

상세히 설명해주세요.`
      },
      {
        id: 2,
        question: '근로소득 원천징수세율은?',
        answer: '간이세액표에 따른 세액 (기본세율 6~45%)',
        prompt: `전산세무 2급 시험 문제입니다.

문제: 근로소득 원천징수세율은?

상세히 설명해주세요.`
      },
      {
        id: 3,
        question: '이자소득 원천징수세율은?',
        answer: '14% (지방소득세 1.4% 별도, 총 15.4%)',
        prompt: `전산세무 2급 시험 문제입니다.

문제: 이자소득 원천징수세율은?

상세히 설명해주세요.`
      },
      {
        id: 4,
        question: '사업소득 원천징수세율은?',
        answer: '3% (프리랜서 등 인적용역 사업소득)',
        prompt: `전산세무 2급 시험 문제입니다.

문제: 사업소득 원천징수세율은?

상세히 설명해주세요.`
      },
      {
        id: 5,
        question: '원천징수영수증이란?',
        answer: '소득 지급자가 원천징수 내역을 기재하여 소득자에게 교부하는 증명서',
        prompt: `전산세무 2급 시험 문제입니다.

문제: 원천징수영수증이란?

상세히 설명해주세요.`
      },
    ],
  },
];


export default function IncometaxpracticeStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('computerized-tax-2-income-tax-practice-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('computerized-tax-2-income-tax-practice-progress', JSON.stringify(updated));
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
            <Link href="/category/accounting/computerized-tax-2" className="text-gray-600 hover:text-emerald-600">전산세무 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">소득세 실무</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">소득세 실무</h1>
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
