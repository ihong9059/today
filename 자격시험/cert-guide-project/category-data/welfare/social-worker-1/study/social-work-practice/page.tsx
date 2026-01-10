'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'practice-theory',
    name: '실천이론',
    color: 'from-violet-500 to-purple-600',
    questions: [
      {
        id: 1,
        question: '사회복지실천의 가치와 윤리원칙을 설명하시오.',
        answer: '인간존엄, 자기결정권, 비밀보장, 클라이언트 이익 우선',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.\n\n문제: 사회복지실천의 가치와 윤리원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 2,
        question: '사회복지실천의 통합적 접근을 설명하시오.',
        answer: '4체계모델(변화매개-클라이언트-표적-행동체계)',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.\n\n문제: 사회복지실천의 통합적 접근을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 3,
        question: '관계의 7대 원칙(비에스텍)을 설명하시오.',
        answer: '개별화, 의도적 감정표현, 통제된 정서적 관여, 수용, 비심판적 태도, 자기결정, 비밀보장',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.\n\n문제: 관계의 7대 원칙(비에스텍)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 4,
        question: '사회복지실천 과정을 설명하시오.',
        answer: '접수-자료수집-사정-계획-개입-평가-종결',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.\n\n문제: 사회복지실천 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 5,
        question: '강점관점 실천의 원칙을 설명하시오.',
        answer: '모든 사람의 강점 존재, 문제가 아닌 가능성 초점, 클라이언트 전문가 인정',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.\n\n문제: 강점관점 실천의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      }
    ]
  },{
    id: 'practice-model',
    name: '실천모델',
    color: 'from-violet-500 to-purple-600',
    questions: [
      {
        id: 1,
        question: '심리사회모델의 특성을 설명하시오.',
        answer: '상황 속의 인간, 직접적/간접적 개입, 지지-탐색-환기',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.\n\n문제: 심리사회모델의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 2,
        question: '인지행동모델의 기법을 설명하시오.',
        answer: '인지재구조화, 합리적정서행동치료(REBT), 체계적 둔감화',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.\n\n문제: 인지행동모델의 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 3,
        question: '과제중심모델의 특성을 설명하시오.',
        answer: '단기개입, 표적문제 선정, 과제합의, 시간제한',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.\n\n문제: 과제중심모델의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 4,
        question: '위기개입모델의 특성을 설명하시오.',
        answer: '즉각적 개입, 단기집중, 위기상태 사정, 지지체계 활용',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.\n\n문제: 위기개입모델의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 5,
        question: '해결중심모델의 질문기법을 설명하시오.',
        answer: '기적질문, 예외질문, 척도질문, 대처질문',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.\n\n문제: 해결중심모델의 질문기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      }
    ]
  }
];

export default function SocialworkpracticeStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('social-work-practice-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = topicId + "-" + questionId;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('social-work-practice-progress', JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-violet-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/welfare" className="text-gray-600 hover:text-violet-600">사회복지·상담</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/welfare/social-worker-1" className="text-gray-600 hover:text-violet-600">사회복지사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">사회복지실천론</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-500 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🤝</span></div>
              <div>
                <h1 className="text-2xl font-bold">사회복지실천론 학습</h1>
                <p className="text-violet-100">사회복지사 1급</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-violet-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all duration-500" style={{ width: progress + "%" }} />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter((q) => completedQuestions[topic.id + "-" + q.id]).length;
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button onClick={() => toggleTopic(topic.id)} className={"w-full p-4 bg-gradient-to-r " + topic.color + " text-white flex items-center justify-between"}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? "−" : "+"}</span>
                </button>
                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-4">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[topic.id + "-" + q.id];
                      return (
                        <div key={q.id} className={"p-4 rounded-lg border-2 transition " + (isCompleted ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200")}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleComplete(topic.id, q.id)} className={"mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition " + (isCompleted ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-green-500")}>
                              {isCompleted && "✓"}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                              <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                              <div className="flex gap-2 flex-wrap">
                                <a href={"https://claude.ai/new?q=" + encodeURIComponent(q.prompt)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</a>
                                <a href={"https://chat.openai.com/?q=" + encodeURIComponent(q.prompt)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</a>
                                <a href={"https://gemini.google.com/app?q=" + encodeURIComponent(q.prompt)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
