'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topicData = {
  id: 'situation',
  name: '상황판단',
  color: 'from-green-500 to-emerald-600',
  questions: [
      {
        id: 1,
        question: '법조문 해석 유형 접근법은?',
        answer: `요건-효과 구조 파악, 예외조항 주의, 적용 사례 매칭`,
        prompt: `5급 공채(행정고시) 상황판단 관련 질문입니다: 법조문 해석 유형 접근법은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 2,
        question: '의사결정 문제 해결법은?',
        answer: `기준 설정, 대안 비교, 제약조건 확인, 최적해 도출`,
        prompt: `5급 공채(행정고시) 상황판단 관련 질문입니다: 의사결정 문제 해결법은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 3,
        question: '자원배분 문제 유형은?',
        answer: `예산 배분, 인력 배치, 시간 관리 등. 제약조건 하 최적화가 핵심`,
        prompt: `5급 공채(행정고시) 상황판단 관련 질문입니다: 자원배분 문제 유형은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 4,
        question: '퍼즐형 문제 접근법은?',
        answer: `조건 정리, 경우의 수 줄이기, 소거법 활용, 표/도식화`,
        prompt: `5급 공채(행정고시) 상황판단 관련 질문입니다: 퍼즐형 문제 접근법은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 5,
        question: '시간 관리 전략은?',
        answer: `쉬운 문제 먼저, 시간 소모 큰 문제 표시 후 넘기기, 마지막 검토 시간 확보`,
        prompt: `5급 공채(행정고시) 상황판단 관련 질문입니다: 시간 관리 전략은? 이에 대해 자세히 설명해주세요.`
      },
  ]
};

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('civil-service-5-situation-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (qId: number) => {
    const newCompleted = { ...completedQuestions, [qId]: !completedQuestions[qId] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('civil-service-5-situation-progress', JSON.stringify(newCompleted));
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
            <Link href="/category/civil/civil-service-5" className="text-gray-600 hover:text-slate-600">5급 공채(행정고시)</Link>
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
