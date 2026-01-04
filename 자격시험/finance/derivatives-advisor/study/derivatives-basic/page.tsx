'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'futures',
    name: '선물',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: '선물계약의 정의와 특성을 설명하시오.',
        answer: '미래 특정일에 특정 가격으로 매매하기로 하는 표준화된 계약',
        prompt: `파생상품투자권유자문인력 시험 문제입니다.

문제: 선물계약의 정의와 특성을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 선물계약의 정의
2. 표준화의 의미
3. 증거금 제도
4. 일일정산 (Daily Settlement)
5. 선물과 선도의 차이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '선물가격 결정이론(Cost of Carry)을 설명하시오.',
        answer: '선물가격 = 현물가격 × (1 + 금융비용 - 편익수익률)',
        prompt: `파생상품투자권유자문인력 시험 문제입니다.

문제: 선물가격 결정이론(Cost of Carry)을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 보유비용 모형의 원리
2. 금융비용 (이자비용)
3. 편익수익률 (배당, 보관비 등)
4. 베이시스의 의미
5. 무차익거래 조건

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '헤지거래의 종류와 베이시스 위험을 설명하시오.',
        answer: '매도헤지/매수헤지, 베이시스=현물가격-선물가격, 베이시스 변동 위험',
        prompt: `파생상품투자권유자문인력 시험 문제입니다.

문제: 헤지거래의 종류와 베이시스 위험을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 매도헤지(Short Hedge)
2. 매수헤지(Long Hedge)
3. 베이시스의 정의와 변동
4. 베이시스 위험
5. 헤지비율 결정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: 'KOSPI200 선물의 거래 구조를 설명하시오.',
        answer: '기초자산=KOSPI200, 거래단위=지수×25만원, 결제월, 증거금',
        prompt: `파생상품투자권유자문인력 시험 문제입니다.

문제: KOSPI200 선물의 거래 구조를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 계약 사양 (거래단위, 호가단위)
2. 결제월과 만기일
3. 증거금 (개시/유지)
4. 일일정산과 마진콜
5. 최종결제 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '선물을 이용한 차익거래를 설명하시오.',
        answer: '프로그램매매, 매수차익거래(선물저평가), 매도차익거래(선물고평가)',
        prompt: `파생상품투자권유자문인력 시험 문제입니다.

문제: 선물을 이용한 차익거래를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 차익거래의 원리
2. 매수차익거래 전략
3. 매도차익거래 전략
4. 프로그램매매
5. 거래비용과 수익

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'options',
    name: '옵션',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      {
        id: 1,
        question: '콜옵션과 풋옵션의 차이를 설명하시오.',
        answer: '콜=매수권리, 풋=매도권리, 매수자 권리/매도자 의무',
        prompt: `파생상품투자권유자문인력 시험 문제입니다.

문제: 콜옵션과 풋옵션의 차이를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 콜옵션의 정의와 손익구조
2. 풋옵션의 정의와 손익구조
3. 옵션 매수자와 매도자
4. 내가격/외가격/등가격
5. 옵션 프리미엄

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '옵션 가격의 결정요인을 설명하시오.',
        answer: '기초자산 가격, 행사가격, 만기, 변동성, 이자율, 배당',
        prompt: `파생상품투자권유자문인력 시험 문제입니다.

문제: 옵션 가격의 결정요인을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 내재가치와 시간가치
2. 기초자산 가격의 영향
3. 변동성의 영향
4. 잔존만기의 영향
5. 이자율과 배당의 영향

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '옵션 그릭스(Greeks)를 설명하시오.',
        answer: '델타, 감마, 베가, 세타, 로 - 옵션 가격 민감도 지표',
        prompt: `파생상품투자권유자문인력 시험 문제입니다.

문제: 옵션 그릭스(Greeks)를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 델타(Delta) - 기초자산 가격 변화
2. 감마(Gamma) - 델타의 변화율
3. 베가(Vega) - 변동성 민감도
4. 세타(Theta) - 시간가치 소멸
5. 로(Rho) - 이자율 민감도

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '스트래들과 스트랭글 전략을 비교하시오.',
        answer: '스트래들: 동일 행사가 콜+풋 / 스트랭글: 다른 행사가 콜+풋',
        prompt: `파생상품투자권유자문인력 시험 문제입니다.

문제: 스트래들과 스트랭글 전략을 비교하시오.

다음 내용을 포함하여 설명해주세요:
1. 스트래들(Straddle) 구조
2. 스트랭글(Strangle) 구조
3. 손익분기점 계산
4. 변동성 전망과 전략 선택
5. 비용과 수익 특성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '풋-콜 패리티를 설명하시오.',
        answer: 'C + PV(K) = P + S, 콜/풋/기초자산/채권의 가격 관계',
        prompt: `파생상품투자권유자문인력 시험 문제입니다.

문제: 풋-콜 패리티를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 풋-콜 패리티 공식
2. 각 요소의 의미
3. 무차익거래 조건
4. 합성 포지션 구성
5. 패리티 위반 시 차익거래

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];


export default function DerivativesbasicStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('derivatives-advisor-derivatives-basic-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('derivatives-advisor-derivatives-basic-progress', JSON.stringify(updated));
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
            <Link href="/category/finance/derivatives-advisor" className="text-gray-600 hover:text-teal-600">파생상품투자권유자문인력</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">파생상품 기초</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">파생상품 기초</h1>
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
