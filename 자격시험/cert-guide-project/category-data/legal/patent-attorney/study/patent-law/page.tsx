'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'patent-law',
    name: '특허법',
    color: 'from-violet-500 to-purple-500',
    questions: [
        {
          id: 1,
          question: '특허요건 3가지는?',
          answer: '산업상 이용가능성, 신규성, 진보성',
          prompt: `변리사 특허법 시험 관련 질문입니다.

질문: 특허요건 3가지는?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 특허요건, 신규성, 진보성`
        },
        {
          id: 2,
          question: '특허권의 존속기간은?',
          answer: '출원일로부터 20년 (의약품 등은 최대 5년 연장 가능)',
          prompt: `변리사 특허법 시험 관련 질문입니다.

질문: 특허권의 존속기간은?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 존속기간, 20년`
        },
        {
          id: 3,
          question: '선원주의란?',
          answer: '동일한 발명에 대해 먼저 출원한 자에게 특허권을 부여하는 원칙',
          prompt: `변리사 특허법 시험 관련 질문입니다.

질문: 선원주의란?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 선원주의, 먼저 출원`
        },
        {
          id: 4,
          question: '특허출원 절차는?',
          answer: '출원 → 방식심사 → 출원공개(18개월) → 심사청구 → 실체심사 → 등록결정/거절결정',
          prompt: `변리사 특허법 시험 관련 질문입니다.

질문: 특허출원 절차는?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 출원절차, 심사청구`
        },
        {
          id: 5,
          question: '균등론이란?',
          answer: '청구범위 문언과 동일하지 않더라도 실질적으로 동일한 기술은 침해로 보는 이론',
          prompt: `변리사 특허법 시험 관련 질문입니다.

질문: 균등론이란?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 균등론, 침해`
        },
        {
          id: 6,
          question: '직무발명이란?',
          answer: '종업원이 그 직무에 관하여 발명한 것으로 사용자의 업무범위에 속하는 발명',
          prompt: `변리사 특허법 시험 관련 질문입니다.

질문: 직무발명이란?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 직무발명, 종업원`
        },
        {
          id: 7,
          question: '특허심판의 종류는?',
          answer: '거절결정불복심판, 무효심판, 정정심판, 권리범위확인심판 등',
          prompt: `변리사 특허법 시험 관련 질문입니다.

질문: 특허심판의 종류는?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 특허심판, 무효심판`
        }
    ],
  },
];

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('patent-attorney-patent-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleQuestion = (questionId: string) => {
    const updated = { ...completedQuestions, [questionId]: !completedQuestions[questionId] };
    setCompletedQuestions(updated);
    localStorage.setItem('patent-attorney-patent-law-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progressPercent = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-violet-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/legal" className="text-gray-600 hover:text-violet-600">법률</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/legal/patent-attorney" className="text-gray-600 hover:text-violet-600">변리사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">특허법</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📚 특허법</h1>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="text-sm text-gray-600">{completedCount}/{totalQuestions}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button onClick={() => toggleTopic(topic.id)} className="w-full px-5 py-4 flex items-center justify-between bg-gradient-to-r from-violet-500 to-purple-600">
                <h2 className="text-lg font-bold text-white">{topic.name}</h2>
                <span className="text-white text-xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 rounded-lg border-2 transition-all ${completedQuestions[`${topic.id}-${q.id}`] ? 'border-green-300 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleQuestion(`${topic.id}-${q.id}`)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${completedQuestions[`${topic.id}-${q.id}`] ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>
                          {completedQuestions[`${topic.id}-${q.id}`] && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">{q.question}</p>
                          <p className="text-gray-600 text-sm mb-3 p-3 bg-white rounded border">{q.answer}</p>
                          <div className="flex gap-2 flex-wrap">
                            <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</a>
                            <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</a>
                            <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/category/legal/patent-attorney" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700">
            ← 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
