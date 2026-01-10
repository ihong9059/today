'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topicData = {
  id: 'plant-pathology',
  name: '식물병리학',
  color: 'from-lime-500 to-green-600',
  questions: [
      {
        id: 1,
        question: '식물병의 정의와 발생 조건은?',
        answer: `식물의 정상적 생리기능 장애. 발생조건: 병원체(기주), 환경조건(온습도/광), 감수성 식물 3요소 충족 필요`,
        prompt: `식물보호기사 식물병리학 관련 질문입니다: 식물병의 정의와 발생 조건은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 2,
        question: '식물병원균의 종류는?',
        answer: `진균(곰팡이), 세균, 바이러스, 파이토플라스마, 선충. 진균이 70% 이상 차지`,
        prompt: `식물보호기사 식물병리학 관련 질문입니다: 식물병원균의 종류는? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 3,
        question: '곰팡이병 방제법은?',
        answer: `예방적 살균제 처리, 저항성 품종 재배, 윤작, 이병체 제거, 환기 개선`,
        prompt: `식물보호기사 식물병리학 관련 질문입니다: 곰팡이병 방제법은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 4,
        question: '세균병 특징은?',
        answer: `수침상 증상, 악취 발생, 물관부 이동. 무름병, 궤양병, 점무늬병 등`,
        prompt: `식물보호기사 식물병리학 관련 질문입니다: 세균병 특징은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 5,
        question: '바이러스병 방제 전략은?',
        answer: `매개충 방제(진딧물/총채벌레), 무병묘 사용, 이병주 제거, 저항성 품종`,
        prompt: `식물보호기사 식물병리학 관련 질문입니다: 바이러스병 방제 전략은? 이에 대해 자세히 설명해주세요.`
      },
  ]
};

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('plant-protection-engineer-plant-pathology-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (qId: number) => {
    const newCompleted = { ...completedQuestions, [qId]: !completedQuestions[qId] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('plant-protection-engineer-plant-pathology-progress', JSON.stringify(newCompleted));
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
