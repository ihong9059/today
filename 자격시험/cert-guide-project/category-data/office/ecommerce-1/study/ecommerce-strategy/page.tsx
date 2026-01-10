'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'ebiz-model',
    name: 'e-비즈니스 모델',
    color: 'from-violet-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: '전자상거래의 유형을 설명하시오.',
        answer: 'B2B, B2C, C2C, B2G, O2O',
        prompt: `전자상거래관리사 1급 전자상거래 전략 문제입니다.\n\n문제: 전자상거래의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 2,
        question: '온라인 마켓플레이스를 설명하시오.',
        answer: '오픈마켓, 소셜커머스, 종합몰',
        prompt: `전자상거래관리사 1급 전자상거래 전략 문제입니다.\n\n문제: 온라인 마켓플레이스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 3,
        question: '옴니채널 전략을 설명하시오.',
        answer: '온오프라인 통합, 일관된 고객경험',
        prompt: `전자상거래관리사 1급 전자상거래 전략 문제입니다.\n\n문제: 옴니채널 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 4,
        question: '플랫폼 비즈니스를 설명하시오.',
        answer: '양면시장, 네트워크 효과',
        prompt: `전자상거래관리사 1급 전자상거래 전략 문제입니다.\n\n문제: 플랫폼 비즈니스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 5,
        question: '구독경제 모델을 설명하시오.',
        answer: '정기구독, 반복매출, 고객유지',
        prompt: `전자상거래관리사 1급 전자상거래 전략 문제입니다.\n\n문제: 구독경제 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      }
    ]
  },{
    id: 'digital-marketing',
    name: '디지털 마케팅',
    color: 'from-violet-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: 'SEO를 설명하시오.',
        answer: '검색엔진최적화, 자연검색 상위노출',
        prompt: `전자상거래관리사 1급 전자상거래 전략 문제입니다.\n\n문제: SEO를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 2,
        question: 'SEM/PPC를 설명하시오.',
        answer: '검색엔진마케팅, 클릭당 과금',
        prompt: `전자상거래관리사 1급 전자상거래 전략 문제입니다.\n\n문제: SEM/PPC를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 3,
        question: '소셜미디어 마케팅을 설명하시오.',
        answer: 'SNS 채널 활용, 바이럴마케팅',
        prompt: `전자상거래관리사 1급 전자상거래 전략 문제입니다.\n\n문제: 소셜미디어 마케팅을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 4,
        question: '이메일 마케팅을 설명하시오.',
        answer: '뉴스레터, 타겟팅, 자동화',
        prompt: `전자상거래관리사 1급 전자상거래 전략 문제입니다.\n\n문제: 이메일 마케팅을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      },{
        id: 5,
        question: '데이터분석 마케팅을 설명하시오.',
        answer: 'CRM, 퍼널분석, A/B테스트',
        prompt: `전자상거래관리사 1급 전자상거래 전략 문제입니다.\n\n문제: 데이터분석 마케팅을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 실무 적용\n5. 연습문제 3개`
      }
    ]
  }
];

export default function EcommercestrategyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('ecommerce-strategy-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = topicId + "-" + questionId;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('ecommerce-strategy-progress', JSON.stringify(newCompleted));
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
            <Link href="/category/office/ecommerce-1" className="text-gray-600 hover:text-violet-600">전자상거래관리사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">전자상거래 전략</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-500 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🛒</span></div>
              <div>
                <h1 className="text-2xl font-bold">전자상거래 전략 학습</h1>
                <p className="text-violet-100">전자상거래관리사 1급</p>
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
