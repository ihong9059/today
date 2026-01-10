'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topicData = {
  id: 'fire-law',
  name: '소방관계법규',
  color: 'from-amber-500 to-yellow-600',
  questions: [
      {
        id: 1,
        question: '소방기본법 핵심은?',
        answer: `소방활동, 화재조사, 구조/구급, 의용소방대, 소방력기준`,
        prompt: `소방공무원(소방사) 소방관계법규 관련 질문입니다: 소방기본법 핵심은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 2,
        question: '소방시설법 핵심은?',
        answer: `소방시설 설치/유지관리, 소방시설관리사, 성능위주설계`,
        prompt: `소방공무원(소방사) 소방관계법규 관련 질문입니다: 소방시설법 핵심은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 3,
        question: '위험물안전관리법 핵심은?',
        answer: `위험물 6류 분류, 저장/취급 기준, 안전관리자 선임`,
        prompt: `소방공무원(소방사) 소방관계법규 관련 질문입니다: 위험물안전관리법 핵심은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 4,
        question: '다중이용업소법 핵심은?',
        answer: `다중이용업소 정의, 안전관리기본계획, 소방시설/비상구`,
        prompt: `소방공무원(소방사) 소방관계법규 관련 질문입니다: 다중이용업소법 핵심은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 5,
        question: '의무소방대설치법 핵심은?',
        answer: `의무소방원 복무, 의무소방대 설치/운영, 대체복무제도`,
        prompt: `소방공무원(소방사) 소방관계법규 관련 질문입니다: 의무소방대설치법 핵심은? 이에 대해 자세히 설명해주세요.`
      },
  ]
};

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('firefighter-fire-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (qId: number) => {
    const newCompleted = { ...completedQuestions, [qId]: !completedQuestions[qId] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('firefighter-fire-law-progress', JSON.stringify(newCompleted));
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
            <Link href="/category/civil/firefighter" className="text-gray-600 hover:text-slate-600">소방공무원(소방사)</Link>
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
