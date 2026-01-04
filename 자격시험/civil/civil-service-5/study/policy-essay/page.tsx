'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topicData = {
  id: 'policy-essay',
  name: '정책논술',
  color: 'from-purple-500 to-violet-600',
  questions: [
      {
        id: 1,
        question: '정책논술 기본 구조는?',
        answer: `서론(문제제기)-본론(현황분석/원인/대안)-결론(정책제언). 논리적 흐름이 핵심`,
        prompt: `5급 공채(행정고시) 정책논술 관련 질문입니다: 정책논술 기본 구조는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 2,
        question: '정책대안 제시 방법은?',
        answer: `문제 정의→원인 분석→대안 도출→대안 비교평가→최적안 선택→실행방안`,
        prompt: `5급 공채(행정고시) 정책논술 관련 질문입니다: 정책대안 제시 방법은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 3,
        question: '정책분석 프레임워크는?',
        answer: `효과성, 효율성, 형평성, 실현가능성(정치적/행정적/재정적) 기준으로 평가`,
        prompt: `5급 공채(행정고시) 정책논술 관련 질문입니다: 정책분석 프레임워크는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 4,
        question: '시사 이슈 정리 방법은?',
        answer: `분야별(경제/사회/행정) 핵심 이슈 정리, 찬반 논거 파악, 정부 정책 동향 확인`,
        prompt: `5급 공채(행정고시) 정책논술 관련 질문입니다: 시사 이슈 정리 방법은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 5,
        question: '논술 시간 배분은?',
        answer: `구상 20%, 작성 70%, 검토 10%. 개요 작성 후 본문 작성 권장`,
        prompt: `5급 공채(행정고시) 정책논술 관련 질문입니다: 논술 시간 배분은? 이에 대해 자세히 설명해주세요.`
      },
  ]
};

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('civil-service-5-policy-essay-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (qId: number) => {
    const newCompleted = { ...completedQuestions, [qId]: !completedQuestions[qId] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('civil-service-5-policy-essay-progress', JSON.stringify(newCompleted));
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
