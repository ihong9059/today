'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topicData = {
  id: 'soil-fertility',
  name: '토양비옥도 관리',
  color: 'from-amber-500 to-orange-600',
  questions: [
      {
        id: 1,
        question: '토양 유기물의 역할은?',
        answer: `양분공급, 보수력/배수력 개선, 미생물 서식처, 완충능력, 입단구조 형성`,
        prompt: `유기농업기사 토양비옥도 관리 관련 질문입니다: 토양 유기물의 역할은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 2,
        question: '퇴비 제조 방법은?',
        answer: `C/N비 25~30:1, 수분 60~70%, 호기성 발효, 뒤집기, 온도관리(60~70℃)`,
        prompt: `유기농업기사 토양비옥도 관리 관련 질문입니다: 퇴비 제조 방법은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 3,
        question: '녹비작물 종류와 효과는?',
        answer: `두과(헤어리베치/자운영): 질소고정. 화본과(호밀/보리): 유기물 공급. 유채: 녹비+채종`,
        prompt: `유기농업기사 토양비옥도 관리 관련 질문입니다: 녹비작물 종류와 효과는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 4,
        question: '윤작의 효과는?',
        answer: `병해충 경감, 토양양분 균형, 잡초억제, 토양구조 개선, 수량안정`,
        prompt: `유기농업기사 토양비옥도 관리 관련 질문입니다: 윤작의 효과는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 5,
        question: '미생물 활용법은?',
        answer: `근권미생물(PGPR), 균근균, 질소고정균(근류균), 길항미생물, 분해미생물`,
        prompt: `유기농업기사 토양비옥도 관리 관련 질문입니다: 미생물 활용법은? 이에 대해 자세히 설명해주세요.`
      },
  ]
};

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('organic-farming-engineer-soil-fertility-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (qId: number) => {
    const newCompleted = { ...completedQuestions, [qId]: !completedQuestions[qId] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('organic-farming-engineer-soil-fertility-progress', JSON.stringify(newCompleted));
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
