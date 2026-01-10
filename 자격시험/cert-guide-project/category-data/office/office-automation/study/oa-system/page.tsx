'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'oa-overview',
    name: 'OA 개요',
    color: 'from-violet-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: '사무자동화의 정의를 설명하시오.',
        answer: '컴퓨터 이용 사무처리 효율화',
        prompt: `사무자동화산업기사 사무자동화 시스템 문제입니다.\n\n문제: 사무자동화의 정의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 2,
        question: 'OA 시스템 구성요소를 설명하시오.',
        answer: '하드웨어, 소프트웨어, 네트워크, 데이터베이스',
        prompt: `사무자동화산업기사 사무자동화 시스템 문제입니다.\n\n문제: OA 시스템 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 3,
        question: '문서관리시스템(DMS)을 설명하시오.',
        answer: '전자문서 생성/저장/검색/공유',
        prompt: `사무자동화산업기사 사무자동화 시스템 문제입니다.\n\n문제: 문서관리시스템(DMS)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 4,
        question: '그룹웨어를 설명하시오.',
        answer: '협업도구, 전자결재/일정관리/게시판',
        prompt: `사무자동화산업기사 사무자동화 시스템 문제입니다.\n\n문제: 그룹웨어를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 5,
        question: 'ERP를 설명하시오.',
        answer: '전사적자원관리, 업무 통합 시스템',
        prompt: `사무자동화산업기사 사무자동화 시스템 문제입니다.\n\n문제: ERP를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      }
    ]
  },{
    id: 'office-network',
    name: '사무 네트워크',
    color: 'from-violet-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: 'LAN의 구성을 설명하시오.',
        answer: '근거리통신망, 이더넷, 토폴로지',
        prompt: `사무자동화산업기사 사무자동화 시스템 문제입니다.\n\n문제: LAN의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 2,
        question: '클라이언트-서버 모델을 설명하시오.',
        answer: '서버: 자원제공, 클라이언트: 서비스 요청',
        prompt: `사무자동화산업기사 사무자동화 시스템 문제입니다.\n\n문제: 클라이언트-서버 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 3,
        question: 'VPN의 기능을 설명하시오.',
        answer: '가상사설망, 암호화 터널링',
        prompt: `사무자동화산업기사 사무자동화 시스템 문제입니다.\n\n문제: VPN의 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 4,
        question: '클라우드 서비스를 설명하시오.',
        answer: 'IaaS, PaaS, SaaS 형태의 인터넷 서비스',
        prompt: `사무자동화산업기사 사무자동화 시스템 문제입니다.\n\n문제: 클라우드 서비스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 5,
        question: '보안 프로토콜을 설명하시오.',
        answer: 'SSL/TLS, HTTPS, 암호화 통신',
        prompt: `사무자동화산업기사 사무자동화 시스템 문제입니다.\n\n문제: 보안 프로토콜을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      }
    ]
  }
];

export default function OasystemStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('oa-system-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = topicId + "-" + questionId;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('oa-system-progress', JSON.stringify(newCompleted));
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
            <Link href="/category/office" className="text-gray-600 hover:text-violet-600">사무·경영</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/office/office-automation" className="text-gray-600 hover:text-violet-600">사무자동화산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">사무자동화 시스템</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-500 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">⚙️</span></div>
              <div>
                <h1 className="text-2xl font-bold">사무자동화 시스템 학습</h1>
                <p className="text-violet-100">사무자동화산업기사</p>
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
