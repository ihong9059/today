'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topicData = {
  id: 'history-7',
  name: '한국사',
  color: 'from-amber-500 to-orange-600',
  questions: [
      {
        id: 1,
        question: '선사시대 핵심은?',
        answer: `구석기(뗀석기)-신석기(간석기/빗살무늬토기)-청동기(비파형동검/고인돌)-철기(세형동검)`,
        prompt: `7급 공채 한국사 관련 질문입니다: 선사시대 핵심은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 2,
        question: '삼국시대 정치사 핵심은?',
        answer: `고구려(태조왕/광개토대왕/장수왕), 백제(근초고왕/성왕), 신라(법흥왕/진흥왕) 전성기`,
        prompt: `7급 공채 한국사 관련 질문입니다: 삼국시대 정치사 핵심은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 3,
        question: '고려 정치제도는?',
        answer: `2성6부(중서문하성/상서성), 도병마사/식목도감, 중추원, 삼사(화폐/곡식)`,
        prompt: `7급 공채 한국사 관련 질문입니다: 고려 정치제도는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 4,
        question: '조선 통치체제는?',
        answer: `의정부-6조 체제, 언론기관(사헌부/사간원/홍문관), 비변사(전쟁 시 확대)`,
        prompt: `7급 공채 한국사 관련 질문입니다: 조선 통치체제는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 5,
        question: '근현대사 핵심 흐름은?',
        answer: `개항→갑오개혁→대한제국→일제강점→광복→분단→6.25→민주화→경제성장`,
        prompt: `7급 공채 한국사 관련 질문입니다: 근현대사 핵심 흐름은? 이에 대해 자세히 설명해주세요.`
      },
  ]
};

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('civil-service-7-history-7-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (qId: number) => {
    const newCompleted = { ...completedQuestions, [qId]: !completedQuestions[qId] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('civil-service-7-history-7-progress', JSON.stringify(newCompleted));
  };

  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const totalCount = topicData.questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-slate-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/civil" className="text-gray-600 hover:text-slate-600">공무원</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/civil/civil-service-7" className="text-gray-600 hover:text-slate-600">7급 공채</Link>
            <span className="text-gray-300">›</span>
            <span className="text-slate-600 font-medium">{topicData.name}</span>
          </nav>
        </div>
      </header>

      <section className={`bg-gradient-to-r ${topicData.color} text-white py-8`}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">{topicData.name}</h1>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-full px-3 py-1 text-sm">
              진행률: {completedCount}/{totalCount}
            </div>
            <div className="flex-1 bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all"
                style={{ width: `${(completedCount/totalCount)*100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topicData.questions.map((q) => (
            <div key={q.id} className={`bg-white rounded-xl shadow p-6 ${completedQuestions[q.id] ? 'border-l-4 border-green-500' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-gray-800">Q{q.id}. {q.question}</h3>
                <button
                  onClick={() => toggleComplete(q.id)}
                  className={`px-3 py-1 rounded-lg text-sm ${completedQuestions[q.id] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                >
                  {completedQuestions[q.id] ? '✓ 완료' : '완료'}
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700 whitespace-pre-line">{q.answer}</p>
              </div>
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
          ))}
        </div>
      </section>
    </div>
  );
}
