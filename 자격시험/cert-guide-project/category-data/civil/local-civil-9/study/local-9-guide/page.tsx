'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topicData = {
  id: 'local-9-guide',
  name: '시험 가이드',
  color: 'from-teal-500 to-cyan-600',
  questions: [
      {
        id: 1,
        question: '지방직과 국가직 차이는?',
        answer: `시험 주관기관, 시험일자, 합격선 차이. 과목/문항수는 동일. 지방직이 경쟁률 낮은 편`,
        prompt: `지방직 9급 시험 가이드 관련 질문입니다: 지방직과 국가직 차이는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 2,
        question: '지방직 선택과목 추천은?',
        answer: `행정직: 행정학+행정법. 세무직: 세법+회계. 선호 지역 경쟁률 확인 필수`,
        prompt: `지방직 9급 시험 가이드 관련 질문입니다: 지방직 선택과목 추천은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 3,
        question: '지역 가산점 제도란?',
        answer: `해당 지역 거주자/출신자에게 가산점 부여. 지자체별 규정 상이`,
        prompt: `지방직 9급 시험 가이드 관련 질문입니다: 지역 가산점 제도란? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 4,
        question: '면접 준비 방법은?',
        answer: `해당 지자체 현안 파악, 지역특화 정책 이해, 공직가치관/문제해결력 준비`,
        prompt: `지방직 9급 시험 가이드 관련 질문입니다: 면접 준비 방법은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 5,
        question: '합격 커트라인 추이는?',
        answer: `인기 지역(서울/경기) 높음. 비수도권 상대적 낮음. 평균 75~85점 수준`,
        prompt: `지방직 9급 시험 가이드 관련 질문입니다: 합격 커트라인 추이는? 이에 대해 자세히 설명해주세요.`
      },
  ]
};

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('local-civil-9-local-9-guide-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (qId: number) => {
    const newCompleted = { ...completedQuestions, [qId]: !completedQuestions[qId] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('local-civil-9-local-9-guide-progress', JSON.stringify(newCompleted));
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
            <Link href="/category/civil/local-civil-9" className="text-gray-600 hover:text-slate-600">지방직 9급</Link>
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
