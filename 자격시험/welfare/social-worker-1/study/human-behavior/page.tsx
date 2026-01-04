'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'developmental-theory',
    name: '발달이론',
    color: 'from-violet-500 to-purple-600',
    questions: [
      {
        id: 1,
        question: '프로이트의 심리성적 발달단계를 설명하시오.',
        answer: '구강기-항문기-남근기-잠복기-생식기, 리비도 중심',
        prompt: `사회복지사 1급 인간행동과사회환경 문제입니다.\n\n문제: 프로이트의 심리성적 발달단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 2,
        question: '에릭슨의 심리사회적 발달 8단계를 설명하시오.',
        answer: '신뢰vs불신부터 자아통합vs절망까지 전생애 발달',
        prompt: `사회복지사 1급 인간행동과사회환경 문제입니다.\n\n문제: 에릭슨의 심리사회적 발달 8단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 3,
        question: '피아제의 인지발달 4단계를 설명하시오.',
        answer: '감각운동기-전조작기-구체적조작기-형식적조작기',
        prompt: `사회복지사 1급 인간행동과사회환경 문제입니다.\n\n문제: 피아제의 인지발달 4단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 4,
        question: '콜버그의 도덕발달 이론을 설명하시오.',
        answer: '전인습(처벌/보상)-인습(사회규범)-후인습(보편원리)',
        prompt: `사회복지사 1급 인간행동과사회환경 문제입니다.\n\n문제: 콜버그의 도덕발달 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 5,
        question: '반두라의 사회학습이론을 설명하시오.',
        answer: '관찰학습, 모델링, 자기효능감, 상호결정론',
        prompt: `사회복지사 1급 인간행동과사회환경 문제입니다.\n\n문제: 반두라의 사회학습이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      }
    ]
  },{
    id: 'system-theory',
    name: '체계이론',
    color: 'from-violet-500 to-purple-600',
    questions: [
      {
        id: 1,
        question: '생태체계이론의 환경체계를 설명하시오.',
        answer: '미시-중간-외부-거시-시간체계 (브론펜브레너)',
        prompt: `사회복지사 1급 인간행동과사회환경 문제입니다.\n\n문제: 생태체계이론의 환경체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 2,
        question: '일반체계이론의 주요 개념을 설명하시오.',
        answer: '경계, 개방체계/폐쇄체계, 항상성, 엔트로피, 피드백',
        prompt: `사회복지사 1급 인간행동과사회환경 문제입니다.\n\n문제: 일반체계이론의 주요 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 3,
        question: '가족체계이론의 특성을 설명하시오.',
        answer: '전체성, 순환적 인과성, 규칙, 항상성',
        prompt: `사회복지사 1급 인간행동과사회환경 문제입니다.\n\n문제: 가족체계이론의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 4,
        question: '사회체계의 기능(AGIL)을 설명하시오.',
        answer: '적응, 목표달성, 통합, 잠재적 패턴 유지 (파슨스)',
        prompt: `사회복지사 1급 인간행동과사회환경 문제입니다.\n\n문제: 사회체계의 기능(AGIL)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 5,
        question: '생태학적 관점의 주요 개념을 설명하시오.',
        answer: '적합성, 적응, 스트레스, 대처, 역량강화',
        prompt: `사회복지사 1급 인간행동과사회환경 문제입니다.\n\n문제: 생태학적 관점의 주요 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      }
    ]
  }
];

export default function HumanbehaviorStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('human-behavior-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = topicId + "-" + questionId;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('human-behavior-progress', JSON.stringify(newCompleted));
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
            <span className="text-violet-600 font-medium">인간행동과사회환경</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-500 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🤝</span></div>
              <div>
                <h1 className="text-2xl font-bold">인간행동과사회환경 학습</h1>
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
