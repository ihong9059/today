'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topicData = {
  id: 'pesticide',
  name: '농약학',
  color: 'from-yellow-500 to-amber-600',
  questions: [
      {
        id: 1,
        question: '농약 분류법은?',
        answer: `용도별(살충제/살균제/제초제), 작용기작별, 화학구조별, 제형별(유제/수화제/입제)`,
        prompt: `식물보호기사 농약학 관련 질문입니다: 농약 분류법은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 2,
        question: '농약의 안전사용기준이란?',
        answer: `살포횟수, 희석배수, 수확 전 최종살포일(PHI) 준수. 잔류허용기준(MRL) 초과 방지`,
        prompt: `식물보호기사 농약학 관련 질문입니다: 농약의 안전사용기준이란? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 3,
        question: '살충제 작용기작 종류는?',
        answer: `신경계(유기인계/카바메이트/피레스로이드), 호흡저해, 키틴합성저해(IGR), 기피제`,
        prompt: `식물보호기사 농약학 관련 질문입니다: 살충제 작용기작 종류는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 4,
        question: '저항성 관리 방법은?',
        answer: `작용기작 다른 약제 교호살포, 혼합제 사용, 적정 농도/시기 준수, IPM 적용`,
        prompt: `식물보호기사 농약학 관련 질문입니다: 저항성 관리 방법은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 5,
        question: '친환경 농약 종류는?',
        answer: `미생물제제(BT), 님오일, 고삼추출물, 제충국, 식물추출물, 페로몬`,
        prompt: `식물보호기사 농약학 관련 질문입니다: 친환경 농약 종류는? 이에 대해 자세히 설명해주세요.`
      },
  ]
};

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('plant-protection-engineer-pesticide-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (qId: number) => {
    const newCompleted = { ...completedQuestions, [qId]: !completedQuestions[qId] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('plant-protection-engineer-pesticide-progress', JSON.stringify(newCompleted));
  };

  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const totalCount = topicData.questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-lime-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/agriculture" className="text-gray-600 hover:text-lime-600">농림·축산</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/agriculture/plant-protection-engineer" className="text-gray-600 hover:text-lime-600">식물보호기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-lime-600 font-medium">{topicData.name}</span>
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
