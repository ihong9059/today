'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'data-structure',
    name: '자료구조',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '스택과 큐의 차이를 설명하시오.',
        answer: '스택: LIFO, 큐: FIFO',
        prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 스택과 큐의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 2,
        question: '이진트리의 순회 방법을 설명하시오.',
        answer: '전위, 중위, 후위, 레벨 순회',
        prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 이진트리의 순회 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 3,
        question: '해시테이블의 충돌 해결 방법을 설명하시오.',
        answer: '체이닝, 개방주소법(선형탐색, 이차탐색)',
        prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 해시테이블의 충돌 해결 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 4,
        question: '그래프의 표현 방법을 설명하시오.',
        answer: '인접행렬, 인접리스트',
        prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 그래프의 표현 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 5,
        question: '힙(Heap)의 특성을 설명하시오.',
        answer: '완전이진트리, 부모≥자식(최대힙) 또는 부모≤자식(최소힙)',
        prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 힙(Heap)의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      }
    ]
  },{
    id: 'algorithm',
    name: '알고리즘',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '정렬 알고리즘의 시간복잡도를 비교하시오.',
        answer: '버블O(n²), 퀵O(nlogn), 병합O(nlogn)',
        prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 정렬 알고리즘의 시간복잡도를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 2,
        question: '탐색 알고리즘을 설명하시오.',
        answer: '순차탐색O(n), 이진탐색O(logn)',
        prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 탐색 알고리즘을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 3,
        question: '그래프 탐색 알고리즘을 비교하시오.',
        answer: 'DFS(깊이우선), BFS(너비우선)',
        prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 그래프 탐색 알고리즘을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 4,
        question: '동적 프로그래밍을 설명하시오.',
        answer: '부분문제의 최적해를 저장하여 전체 최적해 도출',
        prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 동적 프로그래밍을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      },{
        id: 5,
        question: '분할정복 알고리즘을 설명하시오.',
        answer: '문제를 분할→해결→결합하는 방식',
        prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 분할정복 알고리즘을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 공식\n5. 연습문제 3개`
      }
    ]
  }
];

export default function SoftwaredevelopmentStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('software-development-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = topicId + "-" + questionId;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('software-development-progress', JSON.stringify(newCompleted));
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
            <span className="text-blue-600 font-medium">소프트웨어 개발</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🖥️</span></div>
              <div>
                <h1 className="text-2xl font-bold">소프트웨어 개발 학습</h1>
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
