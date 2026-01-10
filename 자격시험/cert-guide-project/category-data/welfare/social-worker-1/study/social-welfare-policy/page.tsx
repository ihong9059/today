'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'policy-theory',
    name: '사회복지정책 이론',
    color: 'from-violet-500 to-purple-600',
    questions: [
      {
        id: 1,
        question: '사회복지정책의 개념과 특성을 설명하시오.',
        answer: '국민의 복지 향상을 위한 정부의 의도적 활동, 재분배 기능',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.\n\n문제: 사회복지정책의 개념과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 2,
        question: '사회복지정책의 가치(평등, 자유, 효율성)를 설명하시오.',
        answer: '평등: 동등한 기회/결과, 자유: 선택권 보장, 효율성: 자원 최적 배분',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.\n\n문제: 사회복지정책의 가치(평등, 자유, 효율성)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 3,
        question: '사회복지정책 발달이론(산업화이론, 국가중심이론)을 비교하시오.',
        answer: '산업화이론: 경제발전 결과, 국가중심이론: 국가 자율성 강조',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.\n\n문제: 사회복지정책 발달이론(산업화이론, 국가중심이론)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 4,
        question: '에스핑-앤더슨의 복지국가 유형론을 설명하시오.',
        answer: '자유주의(미국), 보수주의(독일), 사회민주주의(스웨덴)',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.\n\n문제: 에스핑-앤더슨의 복지국가 유형론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 5,
        question: '사회복지정책 분석틀(길버트와 스펙트)을 설명하시오.',
        answer: '급여대상, 급여형태, 전달체계, 재원 4가지 차원',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.\n\n문제: 사회복지정책 분석틀(길버트와 스펙트)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      }
    ]
  },{
    id: 'social-security',
    name: '사회보장론',
    color: 'from-violet-500 to-purple-600',
    questions: [
      {
        id: 1,
        question: '사회보험과 공공부조의 차이점을 설명하시오.',
        answer: '사회보험: 기여원칙/보편성, 공공부조: 무기여/선별성/자산조사',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.\n\n문제: 사회보험과 공공부조의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 2,
        question: '국민연금제도의 급여 종류를 설명하시오.',
        answer: '노령연금, 장애연금, 유족연금, 반환일시금',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.\n\n문제: 국민연금제도의 급여 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 3,
        question: '건강보험의 특성과 원리를 설명하시오.',
        answer: '강제가입, 보험료 부과, 현물급여 원칙, 사회연대 원리',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.\n\n문제: 건강보험의 특성과 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 4,
        question: '고용보험의 사업 내용을 설명하시오.',
        answer: '실업급여, 고용안정사업, 직업능력개발사업',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.\n\n문제: 고용보험의 사업 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      },{
        id: 5,
        question: '산업재해보상보험의 급여 종류를 설명하시오.',
        answer: '요양급여, 휴업급여, 장해급여, 유족급여, 상병보상연금',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.\n\n문제: 산업재해보상보험의 급여 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 이론\n5. 연습문제 3개`
      }
    ]
  }
];

export default function SocialwelfarepolicyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('social-welfare-policy-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = topicId + "-" + questionId;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('social-welfare-policy-progress', JSON.stringify(newCompleted));
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
            <span className="text-violet-600 font-medium">사회복지정책론</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-500 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">🤝</span></div>
              <div>
                <h1 className="text-2xl font-bold">사회복지정책론 학습</h1>
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
