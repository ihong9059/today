'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'national-tax-basic',
    name: '국세기본법',
    color: 'from-emerald-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '국세부과의 제척기간은?',
        answer: '일반: 5년, 무신고/포탈: 7년, 사기/부정행위: 10년',
        prompt: `세무사 시험 세법학 문제입니다.

문제: 국세부과의 제척기간은?

상세히 설명해주세요.`
      },
      {
        id: 2,
        question: '국세징수권 소멸시효는?',
        answer: '5년. 다만, 체납처분 중에는 진행 정지',
        prompt: `세무사 시험 세법학 문제입니다.

문제: 국세징수권 소멸시효는?

상세히 설명해주세요.`
      },
      {
        id: 3,
        question: '수정신고와 경정청구의 차이는?',
        answer: '수정신고: 과소신고시 세금 추가 납부, 경정청구: 과다납부시 환급 요청',
        prompt: `세무사 시험 세법학 문제입니다.

문제: 수정신고와 경정청구의 차이는?

상세히 설명해주세요.`
      },
      {
        id: 4,
        question: '가산세의 종류는?',
        answer: '무신고가산세, 과소신고가산세, 납부지연가산세, 원천징수납부지연가산세 등',
        prompt: `세무사 시험 세법학 문제입니다.

문제: 가산세의 종류는?

상세히 설명해주세요.`
      },
      {
        id: 5,
        question: '조세심판청구란?',
        answer: '위법/부당한 처분에 대해 조세심판원에 불복을 신청하는 행정구제 절차',
        prompt: `세무사 시험 세법학 문제입니다.

문제: 조세심판청구란?

상세히 설명해주세요.`
      },
    ],
  },
  {
    id: 'income-tax',
    name: '소득세법',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: '소득세의 과세기간은?',
        answer: '1월 1일부터 12월 31일까지 1년',
        prompt: `세무사 시험 세법학 문제입니다.

문제: 소득세의 과세기간은?

상세히 설명해주세요.`
      },
      {
        id: 2,
        question: '종합소득세 과세대상 소득은?',
        answer: '이자, 배당, 사업, 근로, 연금, 기타소득 (6가지)',
        prompt: `세무사 시험 세법학 문제입니다.

문제: 종합소득세 과세대상 소득은?

상세히 설명해주세요.`
      },
      {
        id: 3,
        question: '분리과세소득이란?',
        answer: '종합소득에 합산하지 않고 원천징수로 납세의무 종결',
        prompt: `세무사 시험 세법학 문제입니다.

문제: 분리과세소득이란?

상세히 설명해주세요.`
      },
      {
        id: 4,
        question: '기본공제 대상자 요건은?',
        answer: '배우자: 연간소득금액 100만원 이하, 부양가족: 연간소득금액 100만원 이하 + 연령요건',
        prompt: `세무사 시험 세법학 문제입니다.

문제: 기본공제 대상자 요건은?

상세히 설명해주세요.`
      },
      {
        id: 5,
        question: '세율 구조는?',
        answer: '6%~45% 누진세율 (8단계)',
        prompt: `세무사 시험 세법학 문제입니다.

문제: 세율 구조는?

상세히 설명해주세요.`
      },
    ],
  },
];


export default function TaxlawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('tax-accountant-tax-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('tax-accountant-tax-law-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const getTopicProgress = (topicId: string, questionCount: number) => {
    let completed = 0;
    for (let i = 1; i <= questionCount; i++) {
      if (completedQuestions[`${topicId}-${i}`]) completed++;
    }
    return completed;
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-emerald-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/accounting" className="text-gray-600 hover:text-emerald-600">회계·세무</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/accounting/tax-accountant" className="text-gray-600 hover:text-emerald-600">세무사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">세법학</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">세법학</h1>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all"
                style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{totalCompleted}/{totalQuestions}</span>
          </div>
        </div>

        <div className="space-y-6">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm opacity-80">
                    ({getTopicProgress(topic.id, topic.questions.length)}/{topic.questions.length})
                  </span>
                </div>
                <span className="text-xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleComplete(topic.id, q.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                            completedQuestions[`${topic.id}-${q.id}`]
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions[`${topic.id}-${q.id}`] && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">{q.id}. {q.question}</p>
                          <p className="text-emerald-600 font-medium mb-3">💡 {q.answer}</p>
                          <div className="flex gap-2 flex-wrap">
                            <a
                              href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition"
                            >
                              🧡 Claude
                            </a>
                            <a
                              href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition"
                            >
                              💚 ChatGPT
                            </a>
                            <a
                              href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition"
                            >
                              💙 Gemini
                            </a>
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
      </main>
    </div>
  );
}
