'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topicData = {
  id: 'history-9',
  name: '한국사',
  color: 'from-amber-500 to-orange-600',
  questions: [
      {
        id: 1,
        question: '9급 한국사 출제 범위는?',
        answer: `전 시대 출제. 근현대사 비중 높음(40%). 정치/경제/사회/문화 골고루 출제`,
        prompt: `9급 공채 한국사 관련 질문입니다: 9급 한국사 출제 범위는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 2,
        question: '통일신라 핵심은?',
        answer: `삼국통일(676), 신문왕(9서당10정/국학), 원성왕(독서삼품과), 말기 골품제 모순/후삼국`,
        prompt: `9급 공채 한국사 관련 질문입니다: 통일신라 핵심은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 3,
        question: '조선 붕당정치 흐름은?',
        answer: `동인/서인→남인/북인(동인)→노론/소론(서인)→탕평책(영조/정조)→세도정치`,
        prompt: `9급 공채 한국사 관련 질문입니다: 조선 붕당정치 흐름은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 4,
        question: '일제강점기 시기구분은?',
        answer: `무단통치(1910s)→문화통치(1920s)→민족말살통치(1930s~). 각 시기별 정책 숙지`,
        prompt: `9급 공채 한국사 관련 질문입니다: 일제강점기 시기구분은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 5,
        question: '정부 수립 과정은?',
        answer: `8.15광복→미소공위→좌우합작→남북협상→5.10총선→제헌헌법→정부수립(1948.8.15)`,
        prompt: `9급 공채 한국사 관련 질문입니다: 정부 수립 과정은? 이에 대해 자세히 설명해주세요.`
      },
  ]
};

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('civil-service-9-history-9-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (qId: number) => {
    const newCompleted = { ...completedQuestions, [qId]: !completedQuestions[qId] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('civil-service-9-history-9-progress', JSON.stringify(newCompleted));
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
            <Link href="/category/civil/civil-service-9" className="text-gray-600 hover:text-slate-600">9급 공채</Link>
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
