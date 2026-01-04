'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topicData = {
  id: 'entomology',
  name: '농업곤충학',
  color: 'from-green-500 to-emerald-600',
  questions: [
      {
        id: 1,
        question: '곤충의 기본 구조는?',
        answer: `머리(촉각/눈/구기), 가슴(다리3쌍/날개2쌍), 배(생식기/호흡기). 외골격 구조`,
        prompt: `식물보호기사 농업곤충학 관련 질문입니다: 곤충의 기본 구조는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 2,
        question: '불완전변태와 완전변태 차이는?',
        answer: `불완전: 알→약충→성충 (메뚜기/매미). 완전: 알→유충→번데기→성충 (나비/딱정벌레)`,
        prompt: `식물보호기사 농업곤충학 관련 질문입니다: 불완전변태와 완전변태 차이는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 3,
        question: '주요 해충 분류는?',
        answer: `저작구(나방유충), 흡수구(진딧물/멸구), 천공해충(나무좀), 지하해충(굼벵이)`,
        prompt: `식물보호기사 농업곤충학 관련 질문입니다: 주요 해충 분류는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 4,
        question: '천적을 이용한 생물적 방제란?',
        answer: `포식성/기생성 천적 활용. 무당벌레(진딧물), 기생벌(나방), 포식응애(응애)`,
        prompt: `식물보호기사 농업곤충학 관련 질문입니다: 천적을 이용한 생물적 방제란? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 5,
        question: '종합적병해충관리(IPM)란?',
        answer: `여러 방제법(경종적/생물적/화학적) 조합으로 경제적 피해수준 이하 유지하는 전략`,
        prompt: `식물보호기사 농업곤충학 관련 질문입니다: 종합적병해충관리(IPM)란? 이에 대해 자세히 설명해주세요.`
      },
  ]
};

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('plant-protection-engineer-entomology-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (qId: number) => {
    const newCompleted = { ...completedQuestions, [qId]: !completedQuestions[qId] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('plant-protection-engineer-entomology-progress', JSON.stringify(newCompleted));
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
            <Link href="/category/agriculture/plant-protection-engineer" className="text-gray-600 hover:text-lime-600">식물보호기사</Link>
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
