'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topicData = {
  id: 'pest-control-basic',
  name: '병해충 방제 기초',
  color: 'from-lime-500 to-green-600',
  questions: [
      {
        id: 1,
        question: '작물별 주요 병해충은?',
        answer: `벼: 도열병/멸구. 배추: 무사마귀병/배추좀나방. 사과: 탄저병/심식나방`,
        prompt: `식물보호산업기사 병해충 방제 기초 관련 질문입니다: 작물별 주요 병해충은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 2,
        question: '병해충 예찰 방법은?',
        answer: `포장조사, 유인트랩(페로몬), 예찰등, 황색끈끈이트랩, 기상데이터 활용`,
        prompt: `식물보호산업기사 병해충 방제 기초 관련 질문입니다: 병해충 예찰 방법은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 3,
        question: '방제 적기 판단법은?',
        answer: `해충밀도 조사, 경제적피해허용수준(EIL) 비교, 기상조건, 작물 생육단계 고려`,
        prompt: `식물보호산업기사 병해충 방제 기초 관련 질문입니다: 방제 적기 판단법은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 4,
        question: '농약 살포 기술은?',
        answer: `균일살포, 적정량/농도, 바람/기온 고려, 안전장비 착용, 살포기 점검`,
        prompt: `식물보호산업기사 병해충 방제 기초 관련 질문입니다: 농약 살포 기술은? 이에 대해 자세히 설명해주세요.`
      },
      {
        id: 5,
        question: '저장해충 관리법은?',
        answer: `온습도 관리(15℃/65%RH), 훈증소독, 저온저장, 밀폐포장, 정기 점검`,
        prompt: `식물보호산업기사 병해충 방제 기초 관련 질문입니다: 저장해충 관리법은? 이에 대해 자세히 설명해주세요.`
      },
  ]
};

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('plant-protection-technician-pest-control-basic-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (qId: number) => {
    const newCompleted = { ...completedQuestions, [qId]: !completedQuestions[qId] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('plant-protection-technician-pest-control-basic-progress', JSON.stringify(newCompleted));
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
            <Link href="/category/agriculture/plant-protection-technician" className="text-gray-600 hover:text-lime-600">식물보호산업기사</Link>
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
