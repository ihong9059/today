'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topicData = {
  id: 'organic-theory',
  name: '유기농업 일반',
  color: 'from-green-500 to-emerald-600',
  questions: [
      {
        id: 1,
        question: '유기농업의 정의와 원칙은?',
        answer: `합성농약/화학비료 미사용, 순환농법, 생태계 보전, 건강한 토양 유지, 지속가능성`,
        prompt: `유기농업기사 유기농업 일반 관련 질문입니다: 유기농업의 정의와 원칙은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 2,
        question: '유기인증 종류는?',
        answer: `유기농산물(3년 전환), 무농약농산물, 유기가공식품, 무항생제축산물`,
        prompt: `유기농업기사 유기농업 일반 관련 질문입니다: 유기인증 종류는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 3,
        question: '유기농업 허용자재는?',
        answer: `유기물비료, 녹비작물, 미생물제제, 천연광물, 허용된 식물추출물`,
        prompt: `유기농업기사 유기농업 일반 관련 질문입니다: 유기농업 허용자재는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 4,
        question: '국제유기인증 기준은?',
        answer: `IFOAM 기본원칙, EU/USDA/JAS 규격, Codex 가이드라인, 상호동등성 협정`,
        prompt: `유기농업기사 유기농업 일반 관련 질문입니다: 국제유기인증 기준은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 5,
        question: '유기농업 장단점은?',
        answer: `장점: 환경보전, 고부가가치, 건강. 단점: 수확량감소, 노동력증가, 가격높음`,
        prompt: `유기농업기사 유기농업 일반 관련 질문입니다: 유기농업 장단점은? 이에 대해 자세히 설명해주세요.`
      },
  ]
};

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('organic-farming-engineer-organic-theory-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (qId: number) => {
    const newCompleted = { ...completedQuestions, [qId]: !completedQuestions[qId] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('organic-farming-engineer-organic-theory-progress', JSON.stringify(newCompleted));
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
            <Link href="/category/agriculture/organic-farming-engineer" className="text-gray-600 hover:text-lime-600">유기농업기사</Link>
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
