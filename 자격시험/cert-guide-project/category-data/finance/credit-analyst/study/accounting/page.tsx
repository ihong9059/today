'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'financial-statements',
    name: '재무제표 분석',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: '재무상태표의 구성요소와 등식을 설명하시오.',
        answer: '자산 = 부채 + 자본, 유동/비유동 구분',
        prompt: `신용분석사 시험 회계학 문제입니다.

문제: 재무상태표의 구성요소와 등식을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 재무상태표 등식
2. 자산의 분류 (유동/비유동)
3. 부채의 분류 (유동/비유동)
4. 자본의 구성요소
5. 재무상태표 분석 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '손익계산서의 주요 항목을 설명하시오.',
        answer: '매출액, 매출원가, 매출총이익, 영업이익, 당기순이익',
        prompt: `신용분석사 시험 회계학 문제입니다.

문제: 손익계산서의 주요 항목을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 매출액과 매출원가
2. 매출총이익
3. 판매비와 관리비
4. 영업이익
5. 당기순이익

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '현금흐름표의 세 가지 활동을 설명하시오.',
        answer: '영업활동, 투자활동, 재무활동 현금흐름',
        prompt: `신용분석사 시험 회계학 문제입니다.

문제: 현금흐름표의 세 가지 활동을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 영업활동 현금흐름 (직접법/간접법)
2. 투자활동 현금흐름
3. 재무활동 현금흐름
4. 현금흐름표 분석
5. 자유현금흐름(FCF)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '유동비율과 당좌비율의 차이를 설명하시오.',
        answer: '유동비율=유동자산/유동부채, 당좌비율=(유동자산-재고자산)/유동부채',
        prompt: `신용분석사 시험 회계학 문제입니다.

문제: 유동비율과 당좌비율의 차이를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 유동비율의 계산과 의미
2. 당좌비율의 계산과 의미
3. 재고자산 제외 이유
4. 적정 비율 수준
5. 한계점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '감가상각의 방법과 효과를 설명하시오.',
        answer: '정액법, 정률법, 생산량비례법 / 비용인식과 세금효과',
        prompt: `신용분석사 시험 회계학 문제입니다.

문제: 감가상각의 방법과 효과를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 감가상각의 의의
2. 정액법 계산
3. 정률법 계산
4. 방법별 손익 영향
5. 법인세 효과

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'credit-rating',
    name: '신용평가',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      {
        id: 1,
        question: '신용등급의 체계와 의미를 설명하시오.',
        answer: '투자등급(AAA~BBB), 투기등급(BB~D), 부도확률 반영',
        prompt: `신용분석사 시험 문제입니다.

문제: 신용등급의 체계와 의미를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 신용등급의 정의
2. 투자등급과 투기등급
3. 등급별 부도확률
4. 국내외 신용평가사
5. 신용등급의 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '기업신용평가의 주요 분석요소를 설명하시오.',
        answer: '산업위험, 영업위험, 재무위험, 사업위험 종합 평가',
        prompt: `신용분석사 시험 문제입니다.

문제: 기업신용평가의 주요 분석요소를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 산업위험 분석
2. 영업위험 분석
3. 재무위험 분석
4. 경영자 및 지배구조 분석
5. 종합 신용등급 결정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '부채비율과 이자보상비율의 의미를 설명하시오.',
        answer: '부채비율=부채/자본, 이자보상비율=영업이익/이자비용',
        prompt: `신용분석사 시험 문제입니다.

문제: 부채비율과 이자보상비율의 의미를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 부채비율의 계산과 해석
2. 이자보상비율의 계산과 해석
3. 재무안정성 판단
4. 업종별 적정 수준
5. 신용평가에서의 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '매출채권회전율과 재고자산회전율을 설명하시오.',
        answer: '매출채권회전율=매출액/매출채권, 재고자산회전율=매출원가/재고자산',
        prompt: `신용분석사 시험 문제입니다.

문제: 매출채권회전율과 재고자산회전율을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 매출채권회전율 계산
2. 매출채권회전기간
3. 재고자산회전율 계산
4. 재고자산회전기간
5. 운전자본 관리와의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '신용위험(Credit Risk)의 종류를 설명하시오.',
        answer: '부도위험, 신용스프레드위험, 신용등급변동위험',
        prompt: `신용분석사 시험 문제입니다.

문제: 신용위험(Credit Risk)의 종류를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 부도위험(Default Risk)
2. 신용스프레드 위험
3. 신용등급 하향 위험
4. 회수율 위험
5. 신용위험 측정 모형

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];


export default function AccountingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('credit-analyst-accounting-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('credit-analyst-accounting-progress', JSON.stringify(updated));
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
            <Link href="/category/finance/credit-analyst" className="text-gray-600 hover:text-teal-600">신용분석사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">회계학</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">회계학</h1>
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
