'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'requirement-analysis',
    name: '요구사항 분석',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '요구사항 분석 기법을 설명하시오.',
        answer: '인터뷰, 설문, 프로토타이핑, 유스케이스',
        prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 요구사항 분석 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 2,
        question: '기능적 요구사항과 비기능적 요구사항을 구분하시오.',
        answer: '기능: 시스템이 해야 할 일, 비기능: 성능/보안/품질',
        prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 기능적 요구사항과 비기능적 요구사항을 구분하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 3,
        question: '요구사항 명세서의 구성요소를 설명하시오.',
        answer: '시스템 개요, 기능요구, 비기능요구, 제약사항',
        prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 요구사항 명세서의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 4,
        question: '요구사항 검증 기법을 설명하시오.',
        answer: '워크스루, 인스펙션, 동료검토',
        prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 요구사항 검증 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 5,
        question: '요구공학 프로세스를 설명하시오.',
        answer: '도출→분석→명세→확인',
        prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 요구공학 프로세스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      }
    ]
  },{
    id: 'uml',
    name: 'UML',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: 'UML 다이어그램의 종류를 설명하시오.',
        answer: '클래스, 시퀀스, 유스케이스, 상태, 활동 다이어그램',
        prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: UML 다이어그램의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 2,
        question: '클래스 다이어그램의 관계를 설명하시오.',
        answer: '연관, 집합, 합성, 의존, 상속, 구현',
        prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 클래스 다이어그램의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 3,
        question: '시퀀스 다이어그램의 구성요소를 설명하시오.',
        answer: '객체, 생명선, 메시지, 활성화박스',
        prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 시퀀스 다이어그램의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 4,
        question: '유스케이스 다이어그램의 관계를 설명하시오.',
        answer: '포함(include), 확장(extend), 일반화',
        prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 유스케이스 다이어그램의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 5,
        question: '상태 다이어그램의 구성요소를 설명하시오.',
        answer: '상태, 전이, 이벤트, 액션',
        prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 상태 다이어그램의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      }
    ]
  }
];

export default function SoftwaredesignStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('software-design-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = topicId + "-" + questionId;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('software-design-progress', JSON.stringify(newCompleted));
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
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it" className="text-gray-600 hover:text-blue-600">IT·정보통신</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it/information-processor" className="text-gray-600 hover:text-blue-600">정보처리기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">소프트웨어 설계</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🖥️</span></div>
              <div>
                <h1 className="text-2xl font-bold">소프트웨어 설계 학습</h1>
                <p className="text-blue-100">정보처리기사</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-blue-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
