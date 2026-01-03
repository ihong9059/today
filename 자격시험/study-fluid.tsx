'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'properties',
    name: '유체의 성질',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      {
        id: 1,
        question: '비중량 γ=9810N/m³인 물의 밀도는? (g=9.81m/s²)',
        answer: 'ρ = 1000 kg/m³',
        prompt: `기계기사 유체역학 문제입니다.

문제: 비중량 γ=9810N/m³인 물의 밀도는? (g=9.81m/s²)

다음 순서로 설명해주세요:
1. 비중량과 밀도 관계: γ = ρg
2. 밀도 공식 유도: ρ = γ/g
3. 대입 및 계산
4. 비중량, 밀도, 비중의 차이
5. 물의 표준 물성치

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '동점성계수 ν=1×10⁻⁶ m²/s, 밀도 ρ=1000kg/m³일 때 점성계수 μ는?',
        answer: 'μ = 0.001 Pa·s (= 1 cP)',
        prompt: `기계기사 유체역학 문제입니다.

문제: 동점성계수 ν=1×10⁻⁶ m²/s, 밀도 ρ=1000kg/m³일 때 점성계수 μ는?

다음 순서로 설명해주세요:
1. 동점성계수와 점성계수 관계: ν = μ/ρ
2. 점성계수 공식: μ = ρν
3. 대입 및 계산
4. 점성계수 단위 (Pa·s, Poise)
5. 뉴턴 유체와 비뉴턴 유체

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'statics',
    name: '유체 정역학',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '수심 10m에서의 게이지 압력은? (ρ=1000kg/m³, g=10m/s²)',
        answer: 'P = 100 kPa',
        prompt: `기계기사 유체역학 문제입니다.

문제: 수심 10m에서의 게이지 압력은? (ρ=1000kg/m³, g=10m/s²)

다음 순서로 설명해주세요:
1. 정수압 공식: P = ρgh
2. 대입 및 계산
3. 게이지 압력과 절대압력 차이
4. 파스칼의 원리
5. 수압기 응용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '폭 2m, 높이 3m인 수직 평판이 물에 완전히 잠겨 있을 때 작용하는 전수압은?',
        answer: 'F = 88.29 kN',
        prompt: `기계기사 유체역학 문제입니다.

문제: 폭 2m, 높이 3m인 수직 평판이 물에 완전히 잠겨 있을 때 작용하는 전수압은?

다음 순서로 설명해주세요:
1. 전수압 공식: F = γ·hc·A
2. 도심 깊이 hc 계산
3. 면적 A 계산
4. 대입 및 계산
5. 압력중심 위치 계산

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '부피 0.5m³, 질량 400kg인 물체가 물에 떠있을 때 잠긴 부피는?',
        answer: 'V_잠김 = 0.4 m³',
        prompt: `기계기사 유체역학 문제입니다.

문제: 부피 0.5m³, 질량 400kg인 물체가 물에 떠있을 때 잠긴 부피는?

다음 순서로 설명해주세요:
1. 아르키메데스 원리: 부력 = 배제한 유체 무게
2. 부력 평형: W = FB
3. FB = ρ_물 × V_잠김 × g
4. 대입 및 계산
5. 안정성과 경심

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'bernoulli',
    name: '베르누이 방정식',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 1,
        question: '유속 10m/s인 물의 동압은? (ρ=1000kg/m³)',
        answer: 'q = 50 kPa',
        prompt: `기계기사 유체역학 문제입니다.

문제: 유속 10m/s인 물의 동압은? (ρ=1000kg/m³)

다음 순서로 설명해주세요:
1. 동압 공식: q = ½ρV²
2. 대입 및 계산
3. 정압, 동압, 전압의 관계
4. 베르누이 방정식 유도
5. 피토관 원리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '높이 5m의 탱크 바닥 오리피스에서 유출되는 물의 이론 속도는?',
        answer: 'V = 9.9 m/s',
        prompt: `기계기사 유체역학 문제입니다.

문제: 높이 5m의 탱크 바닥 오리피스에서 유출되는 물의 이론 속도는?

다음 순서로 설명해주세요:
1. 토리첼리 공식: V = √(2gh)
2. 베르누이 방정식으로부터 유도
3. 대입 및 계산
4. 유량계수, 수축계수, 속도계수
5. 실제 유속과의 차이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '직경 100mm 관에서 50mm 관으로 축소될 때 연속방정식으로 속도비를 구하시오.',
        answer: 'V₂/V₁ = 4',
        prompt: `기계기사 유체역학 문제입니다.

문제: 직경 100mm 관에서 50mm 관으로 축소될 때 연속방정식으로 속도비를 구하시오.

다음 순서로 설명해주세요:
1. 연속방정식: A₁V₁ = A₂V₂
2. 면적 계산: A = πd²/4
3. 속도비 유도
4. 대입 및 계산
5. 벤츄리관 원리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'pipe-flow',
    name: '관로 유동',
    color: 'from-purple-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '직경 50mm 관에 속도 2m/s로 물이 흐를 때 레이놀즈 수는? (ν=10⁻⁶ m²/s)',
        answer: 'Re = 100,000 (난류)',
        prompt: `기계기사 유체역학 문제입니다.

문제: 직경 50mm 관에 속도 2m/s로 물이 흐를 때 레이놀즈 수는? (ν=10⁻⁶ m²/s)

다음 순서로 설명해주세요:
1. 레이놀즈 수 공식: Re = VD/ν
2. 단위 통일
3. 대입 및 계산
4. 층류/천이/난류 구분 (2300, 4000)
5. 레이놀즈 수의 물리적 의미

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '길이 100m, 직경 100mm인 관에 속도 2m/s로 흐를 때 마찰손실수두는? (f=0.02)',
        answer: 'hf = 4.08 m',
        prompt: `기계기사 유체역학 문제입니다.

문제: 길이 100m, 직경 100mm인 관에 속도 2m/s로 흐를 때 마찰손실수두는? (f=0.02)

다음 순서로 설명해주세요:
1. 다르시-바이스바흐 공식: hf = f(L/D)(V²/2g)
2. 단위 통일
3. 대입 및 계산
4. 마찰계수 결정 (무디 선도)
5. 부차적 손실 (엘보, 밸브 등)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'dimensional',
    name: '차원해석',
    color: 'from-orange-500 to-red-500',
    questions: [
      {
        id: 1,
        question: '프루드 수(Fr)의 물리적 의미와 공식을 설명하시오.',
        answer: 'Fr = V/√(gL), 관성력/중력 비율',
        prompt: `기계기사 유체역학 문제입니다.

문제: 프루드 수(Fr)의 물리적 의미와 공식을 설명하시오.

다음 순서로 설명해주세요:
1. 프루드 수 정의: Fr = V/√(gL)
2. 물리적 의미 (관성력/중력)
3. 적용 분야 (선박, 수리모형)
4. 상사법칙에서의 역할
5. 다른 무차원수와 비교 (Re, Ma)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '버킹엄 파이 정리를 이용하여 원관 유동의 무차원수를 유도하시오.',
        answer: 'Δp/(ρV²) = f(Re, L/D, ε/D)',
        prompt: `기계기사 유체역학 문제입니다.

문제: 버킹엄 파이 정리를 이용하여 원관 유동의 무차원수를 유도하시오.

다음 순서로 설명해주세요:
1. 버킹엄 π 정리 개요
2. 관련 변수 식별 (Δp, V, D, L, ρ, μ, ε)
3. 기본 차원 (M, L, T) 분석
4. 무차원 파라미터 유도
5. 결과 해석 (압력계수, 레이놀즈 수)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function FluidStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('fluid-progress');
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
    localStorage.setItem('fluid-progress', JSON.stringify(newCompleted));
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
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/mechanical-engineer" className="text-gray-600 hover:text-blue-600">기계기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">유체역학</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">💧</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">유체역학 학습</h1>
                <p className="text-cyan-100">기계기사 필기 3과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-cyan-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
