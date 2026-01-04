'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'civil-law',
    name: '민법',
    color: 'from-violet-500 to-purple-500',
    questions: [
        {
          id: 1,
          question: '민법 제1조에서 규정하는 법원(法源)은?',
          answer: '법률에 규정이 없으면 관습법에 의하고, 관습법이 없으면 조리에 의한다.',
          prompt: `법무사 민법 시험 관련 질문입니다.

질문: 민법 제1조에서 규정하는 법원(法源)은?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 법원, 관습법, 조리`
        },
        {
          id: 2,
          question: '권리능력의 시기와 종기는?',
          answer: '권리능력은 출생으로 시작하여 사망으로 종료한다. 태아도 일정한 경우 권리능력이 있다.',
          prompt: `법무사 민법 시험 관련 질문입니다.

질문: 권리능력의 시기와 종기는?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 권리능력, 출생, 사망, 태아`
        },
        {
          id: 3,
          question: '법률행위의 요건 3가지는?',
          answer: '성립요건(당사자, 목적, 의사표시), 효력요건(권리능력, 행위능력, 적법성), 대항요건(등기, 점유)',
          prompt: `법무사 민법 시험 관련 질문입니다.

질문: 법률행위의 요건 3가지는?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 성립요건, 효력요건, 대항요건`
        },
        {
          id: 4,
          question: '물권법정주의란?',
          answer: '물권은 법률 또는 관습법에 의하는 외에는 임의로 창설하지 못한다는 원칙',
          prompt: `법무사 민법 시험 관련 질문입니다.

질문: 물권법정주의란?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 물권법정주의, 관습법`
        },
        {
          id: 5,
          question: '점유권과 소유권의 차이점은?',
          answer: '점유권은 물건을 사실상 지배하는 권리, 소유권은 법률상 전면적 지배권',
          prompt: `법무사 민법 시험 관련 질문입니다.

질문: 점유권과 소유권의 차이점은?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 점유권, 소유권, 지배권`
        },
        {
          id: 6,
          question: '저당권의 특징 3가지는?',
          answer: '부종성(피담보채권에 종속), 수반성(채권과 함께 이전), 불가분성(전부 변제 시까지 존속)',
          prompt: `법무사 민법 시험 관련 질문입니다.

질문: 저당권의 특징 3가지는?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 저당권, 부종성, 수반성, 불가분성`
        },
        {
          id: 7,
          question: '채권자대위권이란?',
          answer: '채권자가 자기의 채권을 보전하기 위하여 채무자의 권리를 대위하여 행사하는 권리',
          prompt: `법무사 민법 시험 관련 질문입니다.

질문: 채권자대위권이란?

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: 채권자대위권, 채권보전`
        }
    ],
  },
];

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('judicial-scrivener-civil-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleQuestion = (questionId: string) => {
    const updated = { ...completedQuestions, [questionId]: !completedQuestions[questionId] };
    setCompletedQuestions(updated);
    localStorage.setItem('judicial-scrivener-civil-law-progress', JSON.stringify(updated));
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
            <Link href="/category/legal/judicial-scrivener" className="text-gray-600 hover:text-violet-600">법무사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">민법</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📚 민법</h1>
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
          <Link href="/category/legal/judicial-scrivener" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700">
            ← 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
