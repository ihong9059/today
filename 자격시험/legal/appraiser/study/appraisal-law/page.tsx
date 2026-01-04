'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'appraisal-law',
    name: '감정평가이론',
    color: 'from-violet-500 to-purple-500',
    questions: [
        {
          id: 1,
          question: '감정평가의 3방식은?',
          answer: '비교방식(거래사례비교법), 원가방식(원가법), 수익방식(수익환원법)',
          prompt: `감정평가사 감정평가이론 시험 관련 질문입니다.

질문: 감정평가의 3방식은?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 3방식, 비교방식, 원가방식, 수익방식`
        },
        {
          id: 2,
          question: '시장가치란?',
          answer: '통상적인 시장에서 충분한 기간 동안 거래된다면 성립될 것으로 기대되는 적정가격',
          prompt: `감정평가사 감정평가이론 시험 관련 질문입니다.

질문: 시장가치란?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 시장가치, 적정가격`
        },
        {
          id: 3,
          question: '최유효이용이란?',
          answer: '합법적이고 합리적인 이용방법 중 물리적으로 가능하고 경제적으로 가장 높은 수익을 올리는 이용',
          prompt: `감정평가사 감정평가이론 시험 관련 질문입니다.

질문: 최유효이용이란?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 최유효이용`
        },
        {
          id: 4,
          question: '지역분석과 개별분석의 차이는?',
          answer: '지역분석은 해당 지역의 표준적 이용, 개별분석은 대상부동산의 최유효이용 파악',
          prompt: `감정평가사 감정평가이론 시험 관련 질문입니다.

질문: 지역분석과 개별분석의 차이는?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 지역분석, 개별분석`
        },
        {
          id: 5,
          question: '토지보상법상 보상원칙은?',
          answer: '현금보상, 사업시행자보상, 개인별보상, 일괄보상, 사전보상 원칙',
          prompt: `감정평가사 감정평가이론 시험 관련 질문입니다.

질문: 토지보상법상 보상원칙은?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 보상원칙, 현금보상`
        },
        {
          id: 6,
          question: '수익환원법의 기본공식은?',
          answer: '가격 = 순수익 / 환원이율',
          prompt: `감정평가사 감정평가이론 시험 관련 질문입니다.

질문: 수익환원법의 기본공식은?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 수익환원법, 환원이율`
        },
        {
          id: 7,
          question: '공시지가란?',
          answer: '국토교통부장관이 조사·평가하여 공시한 표준지의 단위면적당 가격',
          prompt: `감정평가사 감정평가이론 시험 관련 질문입니다.

질문: 공시지가란?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 공시지가, 표준지`
        }
    ],
  },
];

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('appraiser-appraisal-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleQuestion = (questionId: string) => {
    const updated = { ...completedQuestions, [questionId]: !completedQuestions[questionId] };
    setCompletedQuestions(updated);
    localStorage.setItem('appraiser-appraisal-law-progress', JSON.stringify(updated));
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
            <Link href="/category/legal/appraiser" className="text-gray-600 hover:text-violet-600">감정평가사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">감정평가이론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📚 감정평가이론</h1>
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
          <Link href="/category/legal/appraiser" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700">
            ← 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
