'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'labor-law',
    name: '노동법',
    color: 'from-violet-500 to-purple-500',
    questions: [
        {
          id: 1,
          question: '근로기준법상 근로시간의 원칙은?',
          answer: '1주 40시간, 1일 8시간을 초과할 수 없다 (휴게시간 제외)',
          prompt: `공인노무사 노동법 시험 관련 질문입니다.

질문: 근로기준법상 근로시간의 원칙은?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 근로시간, 40시간, 8시간`
        },
        {
          id: 2,
          question: '해고의 정당한 사유란?',
          answer: '근로자의 귀책사유 또는 경영상 이유로 인한 해고로서 사회통념상 상당하다고 인정되는 경우',
          prompt: `공인노무사 노동법 시험 관련 질문입니다.

질문: 해고의 정당한 사유란?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 해고, 정당한 사유`
        },
        {
          id: 3,
          question: '부당노동행위의 유형 5가지는?',
          answer: '불이익취급, 비열계약, 단체교섭거부, 지배개입, 경비원조',
          prompt: `공인노무사 노동법 시험 관련 질문입니다.

질문: 부당노동행위의 유형 5가지는?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 부당노동행위, 지배개입`
        },
        {
          id: 4,
          question: '단체협약의 효력은?',
          answer: '규범적 효력(근로조건), 채무적 효력(당사자 의무), 일반적 구속력',
          prompt: `공인노무사 노동법 시험 관련 질문입니다.

질문: 단체협약의 효력은?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 단체협약, 규범적 효력`
        },
        {
          id: 5,
          question: '쟁의행위의 정당성 요건은?',
          answer: '주체, 목적, 절차, 수단·방법의 정당성을 모두 갖추어야 함',
          prompt: `공인노무사 노동법 시험 관련 질문입니다.

질문: 쟁의행위의 정당성 요건은?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 쟁의행위, 정당성`
        },
        {
          id: 6,
          question: '통상임금과 평균임금의 차이는?',
          answer: '통상임금은 소정근로의 대가, 평균임금은 3개월간 총임금/총일수',
          prompt: `공인노무사 노동법 시험 관련 질문입니다.

질문: 통상임금과 평균임금의 차이는?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 통상임금, 평균임금`
        },
        {
          id: 7,
          question: '근로계약의 기간 제한은?',
          answer: '기간제 근로자는 2년을 초과하여 사용할 수 없음 (예외 있음)',
          prompt: `공인노무사 노동법 시험 관련 질문입니다.

질문: 근로계약의 기간 제한은?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 기간제, 2년`
        }
    ],
  },
];

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('labor-attorney-labor-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleQuestion = (questionId: string) => {
    const updated = { ...completedQuestions, [questionId]: !completedQuestions[questionId] };
    setCompletedQuestions(updated);
    localStorage.setItem('labor-attorney-labor-law-progress', JSON.stringify(updated));
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
            <Link href="/category/legal/labor-attorney" className="text-gray-600 hover:text-violet-600">공인노무사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">노동법</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📚 노동법</h1>
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
          <Link href="/category/legal/labor-attorney" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700">
            ← 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
