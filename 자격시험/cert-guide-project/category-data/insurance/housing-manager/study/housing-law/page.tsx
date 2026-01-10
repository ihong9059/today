'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'housing-law-1',
    name: '공동주택관리법',
    color: 'from-cyan-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '공동주택관리법의 적용대상은?',
        answer: '300세대 이상 공동주택, 승강기 설치 공동주택 등에 적용됩니다.',
        prompt: `공동주택관리법의 적용대상과 관리의무 기준을 설명해주세요.`
      },      {
        id: 2,
        question: '입주자대표회의 구성과 역할은?',
        answer: '동별 대표자로 구성되며, 관리규약 제정, 관리비 운영 등을 담당합니다.',
        prompt: `입주자대표회의의 구성 방법과 주요 역할을 설명해주세요.`
      },      {
        id: 3,
        question: '관리규약의 주요 내용은?',
        answer: '관리비 부과기준, 공용시설 이용, 층간소음 규정 등을 포함합니다.',
        prompt: `공동주택 관리규약에 포함되어야 할 필수 사항을 설명해주세요.`
      },      {
        id: 4,
        question: '장기수선충당금의 적립과 사용은?',
        answer: '월별 적립하고, 장기수선계획에 따라 사용합니다.',
        prompt: `장기수선충당금의 적립 기준과 사용 절차를 설명해주세요.`
      },      {
        id: 5,
        question: '하자담보책임 기간은?',
        answer: '구조체 10년, 설비 2~5년 등 부위별로 다릅니다.',
        prompt: `공동주택 하자담보책임의 부위별 기간과 보수 절차를 설명해주세요.`
      }
    ]
  }
];

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('housing-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleQuestion = (questionId: string) => {
    const updated = { ...completedQuestions, [questionId]: !completedQuestions[questionId] };
    setCompletedQuestions(updated);
    localStorage.setItem('housing-law-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progressPercent = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-cyan-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/insurance" className="text-gray-600 hover:text-cyan-600">보험·부동산</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/insurance/housing-manager" className="text-gray-600 hover:text-cyan-600">주택관리사(보)</Link>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">주택관계법령</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">주택관계법령</h1>
          <p className="text-cyan-100">주택관리사(보) - 주택관계법령 학습</p>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <p className="text-sm mt-2 text-cyan-100">{completedCount}/{totalQuestions} 완료 ({progressPercent}%)</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        {topics.map((topic) => (
          <div key={topic.id} className="mb-6">
            <button
              onClick={() => toggleTopic(topic.id)}
              className={`w-full flex items-center justify-between p-4 bg-gradient-to-r ${topic.color} text-white rounded-lg shadow-md`}
            >
              <h2 className="text-lg font-bold">{topic.name}</h2>
              <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
            </button>

            {expandedTopics[topic.id] && (
              <div className="mt-3 space-y-3">
                {topic.questions.map((q) => {
                  const qKey = `${topic.id}-${q.id}`;
                  return (
                    <div key={qKey} className="bg-white rounded-lg shadow-md p-4">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={!!completedQuestions[qKey]}
                          onChange={() => toggleQuestion(qKey)}
                          className="mt-1 w-5 h-5 text-cyan-600"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{q.question}</h3>
                          <p className="text-gray-600 mt-2 text-sm">{q.answer}</p>
                          <div className="flex gap-2 flex-wrap mt-3">
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
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
