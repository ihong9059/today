'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'basic-laws',
    name: '열역학 기본 법칙',
    color: 'from-red-500 to-orange-500',
    questions: [
      {
        id: 1,
        question: '밀폐계에서 100kJ의 열을 받고 40kJ의 일을 했다면 내부에너지 변화량은?',
        answer: 'ΔU = 60 kJ',
        prompt: `기계기사 열역학 문제입니다.

문제: 밀폐계에서 100kJ의 열을 받고 40kJ의 일을 했다면 내부에너지 변화량은?

다음 순서로 설명해주세요:
1. 열역학 제1법칙: Q = ΔU + W
2. 부호 규약 (열 흡수: +, 일 방출: +)
3. 대입 및 계산
4. 내부에너지의 물리적 의미
5. 밀폐계와 개방계의 차이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '이상기체 2kg이 27°C, 100kPa 상태에서 부피는? (기체상수 R=0.287 kJ/kg·K)',
        answer: 'V = 1.72 m³',
        prompt: `기계기사 열역학 문제입니다.

문제: 이상기체 2kg이 27°C, 100kPa 상태에서 부피는? (기체상수 R=0.287 kJ/kg·K)

다음 순서로 설명해주세요:
1. 이상기체 상태방정식: PV = mRT
2. 온도 환산 (°C → K)
3. 단위 통일
4. 대입 및 계산
5. 이상기체 가정의 조건

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '엔트로피 증가량 ΔS = Q/T에서 300K에서 150kJ의 열을 받으면 엔트로피 변화는?',
        answer: 'ΔS = 0.5 kJ/K',
        prompt: `기계기사 열역학 문제입니다.

문제: 엔트로피 증가량 ΔS = Q/T에서 300K에서 150kJ의 열을 받으면 엔트로피 변화는?

다음 순서로 설명해주세요:
1. 엔트로피 정의: dS = δQ/T
2. 가역과정에서 엔트로피 변화
3. 대입 및 계산
4. 열역학 제2법칙과 엔트로피
5. 비가역과정에서 엔트로피 증가

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'processes',
    name: '열역학적 과정',
    color: 'from-orange-500 to-amber-500',
    questions: [
      {
        id: 1,
        question: '이상기체의 등온팽창에서 체적이 2배가 되었을 때 일은? (초기 P=200kPa, V=0.5m³)',
        answer: 'W = 69.3 kJ',
        prompt: `기계기사 열역학 문제입니다.

문제: 이상기체의 등온팽창에서 체적이 2배가 되었을 때 일은? (초기 P=200kPa, V=0.5m³)

다음 순서로 설명해주세요:
1. 등온과정 일 공식: W = P₁V₁ ln(V₂/V₁)
2. 또는 W = nRT ln(V₂/V₁)
3. 체적비 계산
4. 대입 및 계산
5. P-V 선도에서 등온선의 모양

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '단열팽창에서 압력이 1/4로 감소했을 때 체적비 V₂/V₁은? (k=1.4)',
        answer: 'V₂/V₁ = 2.69',
        prompt: `기계기사 열역학 문제입니다.

문제: 단열팽창에서 압력이 1/4로 감소했을 때 체적비 V₂/V₁은? (k=1.4)

다음 순서로 설명해주세요:
1. 단열과정 관계식: PVᵏ = 일정
2. P₁V₁ᵏ = P₂V₂ᵏ 정리
3. 체적비 유도
4. 대입 및 계산
5. 비열비 k의 의미와 값

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '정압과정에서 공기 1kg이 27°C에서 127°C로 가열될 때 일은? (Cp=1.005 kJ/kg·K)',
        answer: 'W = 28.7 kJ',
        prompt: `기계기사 열역학 문제입니다.

문제: 정압과정에서 공기 1kg이 27°C에서 127°C로 가열될 때 일은? (Cp=1.005 kJ/kg·K, R=0.287 kJ/kg·K)

다음 순서로 설명해주세요:
1. 정압과정 일: W = P(V₂-V₁) = mR(T₂-T₁)
2. 온도 변화 계산
3. 대입 및 계산
4. 정압과정에서의 열 Q = mCpΔT
5. 정압비열과 정적비열 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'cycles',
    name: '열역학 사이클',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      {
        id: 1,
        question: '고열원 600K, 저열원 300K 사이에서 작동하는 카르노 기관의 열효율은?',
        answer: 'η = 50%',
        prompt: `기계기사 열역학 문제입니다.

문제: 고열원 600K, 저열원 300K 사이에서 작동하는 카르노 기관의 열효율은?

다음 순서로 설명해주세요:
1. 카르노 효율 공식: η = 1 - TL/TH
2. 절대온도 확인
3. 대입 및 계산
4. 카르노 기관이 최대 효율인 이유
5. 실제 기관 효율과의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '오토 사이클의 압축비가 8일 때 열효율은? (k=1.4)',
        answer: 'η = 56.5%',
        prompt: `기계기사 열역학 문제입니다.

문제: 오토 사이클의 압축비가 8일 때 열효율은? (k=1.4)

다음 순서로 설명해주세요:
1. 오토 사이클 효율 공식: η = 1 - 1/r^(k-1)
2. 압축비 r의 정의
3. 대입 및 계산
4. 오토 사이클 P-V, T-S 선도
5. 가솔린 엔진과의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '디젤 사이클에서 압축비 16, 차단비 2일 때 열효율은? (k=1.4)',
        answer: 'η = 61.3%',
        prompt: `기계기사 열역학 문제입니다.

문제: 디젤 사이클에서 압축비 16, 차단비 2일 때 열효율은? (k=1.4)

다음 순서로 설명해주세요:
1. 디젤 사이클 효율 공식
2. 압축비 r과 차단비 ρ 정의
3. 대입 및 계산
4. 디젤 사이클 P-V 선도
5. 오토 사이클과의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '랭킨 사이클에서 터빈 입구 3MPa, 300°C이고 복수기 압력 10kPa일 때 효율 계산 과정을 설명하시오.',
        answer: '증기표 사용하여 h값 대입 후 계산',
        prompt: `기계기사 열역학 문제입니다.

문제: 랭킨 사이클에서 터빈 입구 3MPa, 300°C이고 복수기 압력 10kPa일 때 효율 계산 과정을 설명하시오.

다음 순서로 설명해주세요:
1. 랭킨 사이클 구성 (펌프-보일러-터빈-복수기)
2. 효율 공식: η = (h₁-h₂)-(h₄-h₃) / (h₁-h₄)
3. 증기표에서 각 상태점 엔탈피 결정
4. T-s 선도 작성
5. 재열 및 재생 사이클 개선 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'refrigeration',
    name: '냉동 사이클',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      {
        id: 1,
        question: '냉동기가 -10°C에서 30°C로 열을 이동시킬 때 이론 성능계수(COP)는?',
        answer: 'COP = 6.58',
        prompt: `기계기사 열역학 문제입니다.

문제: 냉동기가 -10°C에서 30°C로 열을 이동시킬 때 이론 성능계수(COP)는?

다음 순서로 설명해주세요:
1. 냉동기 COP 공식: COP = TL/(TH-TL)
2. 절대온도 환산
3. 대입 및 계산
4. COP의 의미 (1보다 클 수 있는 이유)
5. 히트펌프 COP와의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '냉동능력 3RT인 냉동기의 냉동능력을 kW로 환산하시오. (1RT = 3.52kW)',
        answer: 'Q = 10.56 kW',
        prompt: `기계기사 열역학 문제입니다.

문제: 냉동능력 3RT인 냉동기의 냉동능력을 kW로 환산하시오. (1RT = 3.52kW)

다음 순서로 설명해주세요:
1. 냉동톤(RT)의 정의
2. 단위 환산
3. 대입 및 계산
4. 냉동톤의 역사적 유래
5. 다양한 냉동능력 단위 (kcal/h, BTU/h)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function ThermodynamicsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('thermodynamics-progress');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => {
      allExpanded[t.id] = true;
    });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('thermodynamics-progress', JSON.stringify(newCompleted));
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
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-blue-600">기계·제어</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/mechanical-engineer" className="text-gray-600 hover:text-blue-600">기계기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">열역학</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">🔥</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">열역학 학습</h1>
                <p className="text-red-100">기계기사 필기 2과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-red-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter((q) => completedQuestions[`${topic.id}-${q.id}`]).length;
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={`w-full p-4 bg-gradient-to-r ${topic.color} text-white flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>
                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-4">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div key={q.id} className={`p-4 rounded-lg border-2 transition ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleComplete(topic.id, q.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'}`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                              <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                              <div className="flex gap-2 flex-wrap">
                                <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</a>
                                <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</a>
                                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</a>
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
