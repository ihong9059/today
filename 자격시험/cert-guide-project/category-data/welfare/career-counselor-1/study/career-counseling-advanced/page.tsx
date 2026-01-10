'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'career-theory',
    name: '진로발달이론',
    color: 'from-violet-500 to-purple-600',
    questions: [
      {
        id: 1,
        question: '수퍼의 진로발달 5단계를 설명하시오.',
        answer: '성장기-탐색기-확립기-유지기-쇠퇴기',
        prompt: `직업상담사 1급 직업상담학 심화 문제입니다.\n\n문제: 수퍼의 진로발달 5단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 2,
        question: '홀랜드의 직업성격 유형을 설명하시오.',
        answer: 'RIASEC: 현실형-탐구형-예술형-사회형-기업형-관습형',
        prompt: `직업상담사 1급 직업상담학 심화 문제입니다.\n\n문제: 홀랜드의 직업성격 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 3,
        question: '크럼볼츠의 사회학습이론을 설명하시오.',
        answer: '학습경험, 과제접근기술, 우연학습이론',
        prompt: `직업상담사 1급 직업상담학 심화 문제입니다.\n\n문제: 크럼볼츠의 사회학습이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 4,
        question: '고트프레드슨의 제한타협이론을 설명하시오.',
        answer: '성역할-사회적지위-흥미, 인지적 타협 과정',
        prompt: `직업상담사 1급 직업상담학 심화 문제입니다.\n\n문제: 고트프레드슨의 제한타협이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 5,
        question: '사비카스의 진로구성이론을 설명하시오.',
        answer: '진로적응성, 생애주제, 내러티브 상담',
        prompt: `직업상담사 1급 직업상담학 심화 문제입니다.\n\n문제: 사비카스의 진로구성이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      }
    ]
  },{
    id: 'career-assessment',
    name: '직업심리검사',
    color: 'from-violet-500 to-purple-600',
    questions: [
      {
        id: 1,
        question: '직업흥미검사(Strong)를 설명하시오.',
        answer: '일반직업주제, 기본흥미척도, 개인특성척도',
        prompt: `직업상담사 1급 직업상담학 심화 문제입니다.\n\n문제: 직업흥미검사(Strong)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 2,
        question: '직업가치관검사를 설명하시오.',
        answer: '내재적/외재적 가치, 직업선택의 기준',
        prompt: `직업상담사 1급 직업상담학 심화 문제입니다.\n\n문제: 직업가치관검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 3,
        question: '직업적성검사의 종류를 설명하시오.',
        answer: 'GATB, 적성검사, 진로성숙도검사',
        prompt: `직업상담사 1급 직업상담학 심화 문제입니다.\n\n문제: 직업적성검사의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 4,
        question: '심리검사 해석의 원칙을 설명하시오.',
        answer: '규준참조, 개인차, 발달적 관점, 통합해석',
        prompt: `직업상담사 1급 직업상담학 심화 문제입니다.\n\n문제: 심리검사 해석의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 5,
        question: '직업정보 탐색방법을 설명하시오.',
        answer: '워크넷, 직업사전, 한국고용정보원, 직업체험',
        prompt: `직업상담사 1급 직업상담학 심화 문제입니다.\n\n문제: 직업정보 탐색방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      }
    ]
  }
];

export default function CareercounselingadvancedStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('career-counseling-advanced-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = topicId + "-" + questionId;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('career-counseling-advanced-progress', JSON.stringify(newCompleted));
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
            <Link href="/category/welfare/career-counselor-1" className="text-gray-600 hover:text-violet-600">직업상담사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">직업상담학 심화</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-500 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">💼</span></div>
              <div>
                <h1 className="text-2xl font-bold">직업상담학 심화 학습</h1>
                <p className="text-violet-100">직업상담사 1급</p>
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
