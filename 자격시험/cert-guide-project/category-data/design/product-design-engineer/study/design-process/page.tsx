'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<number, boolean>>({});

  const topic = {
    id: 'design-process',
    name: '디자인 프로세스',
    color: 'from-blue-500 to-cyan-600'
  };

  const questions = [
      {
        id: 1,
        question: '디자인 씽킹 5단계는?',
        answer: '공감→정의→아이디어→프로토타입→테스트. 사용자 중심 문제 해결',
        prompt: '제품디자인기사 시험 관련 질문입니다: 디자인 씽킹 5단계는? 자세히 설명해주세요.'
      },
      {
        id: 2,
        question: '더블 다이아몬드 모델이란?',
        answer: '발산→수렴→발산→수렴. 문제 발견, 문제 정의, 해결책 개발, 구체화',
        prompt: '제품디자인기사 시험 관련 질문입니다: 더블 다이아몬드 모델이란? 자세히 설명해주세요.'
      },
      {
        id: 3,
        question: '사용자 리서치 방법은?',
        answer: '인터뷰, 설문조사, 관찰법, 페르소나, 여정맵. 사용자 니즈 파악',
        prompt: '제품디자인기사 시험 관련 질문입니다: 사용자 리서치 방법은? 자세히 설명해주세요.'
      },
      {
        id: 4,
        question: '프로토타이핑 종류는?',
        answer: '페이퍼, 디지털, 물리적 프로토타입. 아이디어 검증, 반복 개선',
        prompt: '제품디자인기사 시험 관련 질문입니다: 프로토타이핑 종류는? 자세히 설명해주세요.'
      },
      {
        id: 5,
        question: '제품 라이프사이클이란?',
        answer: '도입기→성장기→성숙기→쇠퇴기. 각 단계별 마케팅 전략 다름',
        prompt: '제품디자인기사 시험 관련 질문입니다: 제품 라이프사이클이란? 자세히 설명해주세요.'
      },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('product-design-engineer-design-process-progress');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
  }, []);

  const toggleComplete = (id: number) => {
    const updated = { ...completedQuestions, [id]: !completedQuestions[id] };
    setCompletedQuestions(updated);
    localStorage.setItem('product-design-engineer-design-process-progress', JSON.stringify(updated));
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
            <Link href="/category/design/product-design-engineer" className="text-gray-600 hover:text-pink-600">제품디자인기사</Link>
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
            href="/category/design/product-design-engineer"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← 목록으로 돌아가기
          </Link>
        </div>
      </section>
    </div>
  );
}
