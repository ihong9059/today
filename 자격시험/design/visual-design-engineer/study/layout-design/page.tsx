'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<number, boolean>>({});

  const topic = {
    id: 'layout-design',
    name: '레이아웃 디자인',
    color: 'from-blue-500 to-cyan-600'
  };

  const questions = [
      {
        id: 1,
        question: 'CRAP 원칙이란?',
        answer: 'Contrast(대비), Repetition(반복), Alignment(정렬), Proximity(근접)',
        prompt: '시각디자인기사 시험 관련 질문입니다: CRAP 원칙이란? 자세히 설명해주세요.'
      },
      {
        id: 2,
        question: '여백(White Space) 역할은?',
        answer: '가독성 향상, 시각적 휴식, 강조 효과. 디자인 품격 결정',
        prompt: '시각디자인기사 시험 관련 질문입니다: 여백(White Space) 역할은? 자세히 설명해주세요.'
      },
      {
        id: 3,
        question: '시선의 흐름이란?',
        answer: '디자인에서 눈이 움직이는 경로. Z패턴, F패턴 레이아웃',
        prompt: '시각디자인기사 시험 관련 질문입니다: 시선의 흐름이란? 자세히 설명해주세요.'
      },
      {
        id: 4,
        question: '모듈 시스템이란?',
        answer: '기본 단위 반복으로 레이아웃 구성. 일관성과 효율성',
        prompt: '시각디자인기사 시험 관련 질문입니다: 모듈 시스템이란? 자세히 설명해주세요.'
      },
      {
        id: 5,
        question: '단(Column) 설정 이유는?',
        answer: '텍스트 가독성 향상. 한 줄 45~75자가 적정, 단으로 조절',
        prompt: '시각디자인기사 시험 관련 질문입니다: 단(Column) 설정 이유는? 자세히 설명해주세요.'
      },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('visual-design-engineer-layout-design-progress');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
  }, []);

  const toggleComplete = (id: number) => {
    const updated = { ...completedQuestions, [id]: !completedQuestions[id] };
    setCompletedQuestions(updated);
    localStorage.setItem('visual-design-engineer-layout-design-progress', JSON.stringify(updated));
  };

  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/design" className="text-gray-600 hover:text-pink-600">디자인·문화</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/design/visual-design-engineer" className="text-gray-600 hover:text-pink-600">시각디자인기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">{topic.name}</span>
          </nav>
        </div>
      </header>

      <section className={`bg-gradient-to-r ${topic.color} text-white py-8`}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">{topic.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white/30 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-white/90 text-sm">{completedCount}/{questions.length} 완료</span>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className={`bg-white rounded-xl shadow p-6 border-l-4 transition-all ${
                completedQuestions[q.id]
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleComplete(q.id)}
                  className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    completedQuestions[q.id]
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-pink-400'
                  }`}
                >
                  {completedQuestions[q.id] && '✓'}
                </button>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-2">{q.question}</h3>
                  <p className="text-gray-600 bg-gray-50 rounded-lg p-3 mb-3">💡 {q.answer}</p>
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
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/category/design/visual-design-engineer"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← 목록으로 돌아가기
          </Link>
        </div>
      </section>
    </div>
  );
}
