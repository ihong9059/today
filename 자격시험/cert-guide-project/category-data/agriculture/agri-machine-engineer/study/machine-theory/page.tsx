'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topicData = {
  id: 'machine-theory',
  name: '농업기계학',
  color: 'from-gray-500 to-slate-600',
  questions: [
      {
        id: 1,
        question: '농업기계 분류는?',
        answer: `동력기계(트랙터), 경운기계(로터리), 파종·이식기, 수확기계(콤바인), 건조기`,
        prompt: `농업기계기사 농업기계학 관련 질문입니다: 농업기계 분류는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 2,
        question: '트랙터 구조와 원리는?',
        answer: `엔진(디젤), 동력전달장치(PTO), 유압장치, 3점링크, 조향/제동장치`,
        prompt: `농업기계기사 농업기계학 관련 질문입니다: 트랙터 구조와 원리는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 3,
        question: '콤바인 작동원리는?',
        answer: `예취부→이송부→탈곡부→선별부→저장부. 자탈형/보통형 구분`,
        prompt: `농업기계기사 농업기계학 관련 질문입니다: 콤바인 작동원리는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 4,
        question: '농업용 엔진 특성은?',
        answer: `디젤엔진 주류, 저속고토크, 내구성, 연료효율, 냉각방식(수냉/공냉)`,
        prompt: `농업기계기사 농업기계학 관련 질문입니다: 농업용 엔진 특성은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 5,
        question: '정밀농업 기술은?',
        answer: `GPS 자율주행, 드론 방제, 센서기반 가변살포, 빅데이터 농업, 스마트팜`,
        prompt: `농업기계기사 농업기계학 관련 질문입니다: 정밀농업 기술은? 이에 대해 자세히 설명해주세요.`
      },
  ]
};

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('agri-machine-engineer-machine-theory-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (qId: number) => {
    const newCompleted = { ...completedQuestions, [qId]: !completedQuestions[qId] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('agri-machine-engineer-machine-theory-progress', JSON.stringify(newCompleted));
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
            <Link href="/category/agriculture/agri-machine-engineer" className="text-gray-600 hover:text-lime-600">농업기계기사</Link>
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
