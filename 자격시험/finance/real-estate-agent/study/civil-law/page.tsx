'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'civil-general',
    name: '민법총칙',
    color: 'from-purple-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '법률행위의 성립요건과 효력요건을 구분하여 설명하시오.',
        answer: '성립요건: 당사자, 목적, 의사표시 / 효력요건: 당사자 능력, 목적 적법성, 의사표시 하자 없음',
        prompt: `공인중개사 시험 민법 문제입니다.

문제: 법률행위의 성립요건과 효력요건을 구분하여 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 일반성립요건과 특별성립요건
2. 일반효력요건과 특별효력요건
3. 당사자의 의사능력과 행위능력
4. 목적의 확정성, 적법성, 사회적 타당성
5. 의사표시의 하자 유형

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '의사표시의 하자 중 사기와 강박의 효과를 비교하시오.',
        answer: '사기·강박에 의한 의사표시는 취소할 수 있음, 단 제3자 보호규정 적용',
        prompt: `공인중개사 시험 민법 문제입니다.

문제: 의사표시의 하자 중 사기와 강박의 효과를 비교하시오.

다음 내용을 포함하여 설명해주세요:
1. 사기의 요건과 효과
2. 강박의 요건과 효과
3. 제3자에 의한 사기·강박
4. 선의의 제3자 보호
5. 착오와의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '무효와 취소의 차이를 설명하시오.',
        answer: '무효: 처음부터 효력 없음 / 취소: 취소시까지 유효, 취소하면 소급 무효',
        prompt: `공인중개사 시험 민법 문제입니다.

문제: 무효와 취소의 차이를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 무효의 의의와 효과
2. 취소의 의의와 효과
3. 주장권자의 범위 차이
4. 추인의 가능성 차이
5. 소멸시효 적용 차이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '대리의 3요소와 무권대리의 효과를 설명하시오.',
        answer: '3요소: 현명, 대리권, 대리행위 / 무권대리: 본인에게 효력 없음, 추인시 소급 유효',
        prompt: `공인중개사 시험 민법 문제입니다.

문제: 대리의 3요소와 무권대리의 효과를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 대리의 3요소 (현명, 대리권, 대리행위)
2. 무권대리의 의의
3. 본인의 추인권
4. 상대방의 보호 (철회권, 최고권)
5. 표현대리와의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '소멸시효의 요건과 효과를 설명하시오.',
        answer: '권리 불행사 + 시효기간 경과 → 권리 소멸, 소멸시효 완성 시 원용 필요',
        prompt: `공인중개사 시험 민법 문제입니다.

문제: 소멸시효의 요건과 효과를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 소멸시효의 존재이유
2. 소멸시효의 대상
3. 시효기간 (10년, 5년, 3년 등)
4. 시효의 중단사유
5. 시효완성의 효과와 원용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'property-law',
    name: '물권법',
    color: 'from-orange-500 to-amber-500',
    questions: [
      {
        id: 1,
        question: '물권의 종류와 물권법정주의를 설명하시오.',
        answer: '점유권, 소유권, 지상권, 지역권, 전세권, 유치권, 질권, 저당권 / 법률에 정한 것 외 창설 불가',
        prompt: `공인중개사 시험 민법 문제입니다.

문제: 물권의 종류와 물권법정주의를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 물권법정주의의 의의
2. 본권과 점유권
3. 용익물권의 종류
4. 담보물권의 종류
5. 관습법상 물권 인정 여부

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '부동산 물권변동의 공시방법과 대항력을 설명하시오.',
        answer: '등기가 공시방법, 등기하지 않으면 제3자에게 대항 불가',
        prompt: `공인중개사 시험 민법 문제입니다.

문제: 부동산 물권변동의 공시방법과 대항력을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 공시의 원칙
2. 등기의 효력 (성립요건주의)
3. 대항력의 의미
4. 등기 없이도 물권 취득하는 경우
5. 공신의 원칙 적용 여부

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '지상권과 전세권을 비교하시오.',
        answer: '지상권: 건물 소유 목적 / 전세권: 사용·수익 + 전세금 반환청구권',
        prompt: `공인중개사 시험 민법 문제입니다.

문제: 지상권과 전세권을 비교하시오.

다음 내용을 포함하여 설명해주세요:
1. 설정 목적의 차이
2. 존속기간의 차이
3. 지료와 전세금
4. 경매청구권과 우선변제권
5. 법정지상권과 법정전세권

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '저당권의 효력 범위와 물상대위를 설명하시오.',
        answer: '저당물의 부합물, 종물, 과실에 미침 / 물상대위: 대가에 대해 권리행사 가능',
        prompt: `공인중개사 시험 민법 문제입니다.

문제: 저당권의 효력 범위와 물상대위를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 저당권의 부종성
2. 효력이 미치는 범위 (부합물, 종물)
3. 물상대위의 의의
4. 물상대위의 대상 (매각대금, 보험금 등)
5. 압류 요건

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '유치권의 성립요건과 효력을 설명하시오.',
        answer: '타인 물건 점유 + 피담보채권이 물건에 관하여 생긴 것 → 유치 가능, 경매청구권 있음',
        prompt: `공인중개사 시험 민법 문제입니다.

문제: 유치권의 성립요건과 효력을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 유치권의 성립요건 4가지
2. 견련성의 의미
3. 유치적 효력
4. 경매청구권
5. 우선변제권 유무

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];


export default function CivillawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('real-estate-agent-civil-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('real-estate-agent-civil-law-progress', JSON.stringify(updated));
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
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/finance" className="text-gray-600 hover:text-teal-600">금융</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/finance/real-estate-agent" className="text-gray-600 hover:text-teal-600">공인중개사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">민법 및 민사특별법</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">민법 및 민사특별법</h1>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-600 h-2 rounded-full transition-all"
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
                              ? 'bg-teal-500 border-teal-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions[`${topic.id}-${q.id}`] && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">{q.id}. {q.question}</p>
                          <p className="text-teal-600 font-medium mb-3">💡 {q.answer}</p>
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
