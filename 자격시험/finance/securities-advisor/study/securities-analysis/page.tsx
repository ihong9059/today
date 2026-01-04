'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'fundamental-analysis',
    name: '기본적 분석',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: 'PER(주가수익비율)와 PBR(주가순자산비율)을 설명하시오.',
        answer: 'PER = 주가/EPS, 수익성 평가 / PBR = 주가/BPS, 자산가치 평가',
        prompt: `증권투자권유자문인력 시험 문제입니다.

문제: PER(주가수익비율)와 PBR(주가순자산비율)을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. PER의 정의와 계산
2. PBR의 정의와 계산
3. 적정주가 산정 방법
4. 업종별 특성
5. 투자판단 기준

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: 'ROE(자기자본이익률)와 ROA(총자산이익률)를 비교하시오.',
        answer: 'ROE = 순이익/자기자본, ROA = 순이익/총자산, 수익성 지표',
        prompt: `증권투자권유자문인력 시험 문제입니다.

문제: ROE(자기자본이익률)와 ROA(총자산이익률)를 비교하시오.

다음 내용을 포함하여 설명해주세요:
1. ROE와 ROA의 계산
2. 두 지표의 차이점
3. 레버리지 효과와의 관계
4. 듀퐁분석
5. 투자판단에서의 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: 'DCF(할인현금흐름) 모형을 설명하시오.',
        answer: '미래 현금흐름을 현재가치로 할인하여 기업가치 산정',
        prompt: `증권투자권유자문인력 시험 문제입니다.

문제: DCF(할인현금흐름) 모형을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. DCF 모형의 기본원리
2. 자유현금흐름(FCF) 계산
3. 할인율(WACC) 산정
4. 영속가치(Terminal Value)
5. DCF 모형의 한계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: 'EV/EBITDA 배수의 의미를 설명하시오.',
        answer: '기업가치/세전영업이익, 인수합병 시 활용, 자본구조 영향 배제',
        prompt: `증권투자권유자문인력 시험 문제입니다.

문제: EV/EBITDA 배수의 의미를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. EV(Enterprise Value)의 계산
2. EBITDA의 정의
3. PER과의 차이점
4. M&A에서의 활용
5. 업종별 특성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '배당할인모형(DDM)을 설명하시오.',
        answer: '주가 = 미래배당금의 현재가치 합계, 고든성장모형 포함',
        prompt: `증권투자권유자문인력 시험 문제입니다.

문제: 배당할인모형(DDM)을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. DDM의 기본 원리
2. 제로성장 모형
3. 고든 성장모형 (Gordon Growth Model)
4. 다단계 성장모형
5. DDM의 한계와 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'technical-analysis',
    name: '기술적 분석',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      {
        id: 1,
        question: '이동평균선의 종류와 활용방법을 설명하시오.',
        answer: '단순/지수/가중 이동평균, 골든크로스/데드크로스 매매신호',
        prompt: `증권투자권유자문인력 시험 문제입니다.

문제: 이동평균선의 종류와 활용방법을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 단순이동평균(SMA)
2. 지수이동평균(EMA)
3. 골든크로스와 데드크로스
4. 지지선과 저항선 역할
5. 이격도 분석

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: 'RSI(상대강도지수)의 해석 방법을 설명하시오.',
        answer: '0~100 범위, 70 이상 과매수, 30 이하 과매도',
        prompt: `증권투자권유자문인력 시험 문제입니다.

문제: RSI(상대강도지수)의 해석 방법을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. RSI의 계산 공식
2. 과매수/과매도 판단
3. 다이버전스 현상
4. 기간 설정 (14일 등)
5. 다른 보조지표와의 조합

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '볼린저 밴드의 구조와 활용법을 설명하시오.',
        answer: '중심선 = 이동평균, 상하한 = 표준편차 2배, 밴드폭 활용',
        prompt: `증권투자권유자문인력 시험 문제입니다.

문제: 볼린저 밴드의 구조와 활용법을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 볼린저 밴드의 구성
2. 상단/하단 밴드 의미
3. 밴드 수축과 확장
4. 매매 전략
5. 한계점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: 'MACD의 구성과 매매신호를 설명하시오.',
        answer: 'MACD선 = 단기EMA - 장기EMA, 시그널선과의 교차로 매매',
        prompt: `증권투자권유자문인력 시험 문제입니다.

문제: MACD의 구성과 매매신호를 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. MACD 선의 계산
2. 시그널 선의 역할
3. MACD 오실레이터
4. 매수/매도 신호
5. 다이버전스 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '캔들차트의 주요 패턴을 설명하시오.',
        answer: '망치형, 역망치형, 도지, 장악형, 샛별/저녁별 등',
        prompt: `증권투자권유자문인력 시험 문제입니다.

문제: 캔들차트의 주요 패턴을 설명하시오.

다음 내용을 포함하여 설명해주세요:
1. 캔들의 구성요소 (시가, 고가, 저가, 종가)
2. 반전 패턴 (망치형, 역망치형)
3. 연속 패턴
4. 도지의 의미
5. 패턴 신뢰도

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];


export default function SecuritiesanalysisStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('securities-advisor-securities-analysis-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('securities-advisor-securities-analysis-progress', JSON.stringify(updated));
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
            <Link href="/category/finance/securities-advisor" className="text-gray-600 hover:text-teal-600">증권투자권유자문인력</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">증권분석</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">증권분석</h1>
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
