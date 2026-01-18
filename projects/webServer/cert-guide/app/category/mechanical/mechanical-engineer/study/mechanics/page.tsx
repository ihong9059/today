'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'stress-strain',
    name: '응력과 변형률',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '지름 20mm, 길이 2m인 강봉에 40kN의 인장하중이 작용할 때 인장응력을 구하시오.',
        answer: 'σ = 127.3 MPa',
        prompt: `기계기사 재료역학 문제입니다.

문제: 지름 20mm, 길이 2m인 강봉에 40kN의 인장하중이 작용할 때 인장응력을 구하시오.

다음 순서로 설명해주세요:
1. 인장응력 공식: σ = P/A
2. 원형 단면적 계산: A = πd²/4
3. 단위 환산 (kN → N, mm → m)
4. 대입 및 계산 과정
5. 최종 답과 단위 (MPa)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '탄성계수 E = 200GPa인 강재에 100MPa의 응력이 작용할 때 변형률을 구하시오.',
        answer: 'ε = 0.0005 (= 5×10⁻⁴)',
        prompt: `기계기사 재료역학 문제입니다.

문제: 탄성계수 E = 200GPa인 강재에 100MPa의 응력이 작용할 때 변형률을 구하시오.

다음 순서로 설명해주세요:
1. 훅의 법칙: σ = Eε
2. 변형률 공식 유도: ε = σ/E
3. 단위 통일 (GPa, MPa)
4. 대입 및 계산
5. 변형률의 의미 (무차원)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '길이 1m인 봉에 50kN의 인장력이 작용하여 0.5mm 늘어났다. 변형률을 구하시오.',
        answer: 'ε = 5×10⁻⁴',
        prompt: `기계기사 재료역학 문제입니다.

문제: 길이 1m인 봉에 50kN의 인장력이 작용하여 0.5mm 늘어났다. 변형률을 구하시오.

다음 순서로 설명해주세요:
1. 변형률 정의: ε = ΔL/L
2. 단위 통일 (m, mm)
3. 대입 및 계산
4. 변형률과 연신률의 관계
5. 공학적 변형률과 진변형률 차이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '푸아송비가 0.3인 재료에 축방향 변형률 0.001이 발생했다. 횡방향 변형률을 구하시오.',
        answer: 'ε_lateral = -0.0003',
        prompt: `기계기사 재료역학 문제입니다.

문제: 푸아송비가 0.3인 재료에 축방향 변형률 0.001이 발생했다. 횡방향 변형률을 구하시오.

다음 순서로 설명해주세요:
1. 푸아송비 정의: ν = -ε_lateral/ε_axial
2. 횡방향 변형률 공식 유도
3. 대입 및 계산
4. 음수의 의미 (수축)
5. 다양한 재료의 푸아송비 값

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'bending',
    name: '보의 굽힘',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 1,
        question: '길이 4m인 단순보 중앙에 10kN의 집중하중이 작용할 때 최대 굽힘모멘트를 구하시오.',
        answer: 'M_max = 10 kN·m',
        prompt: `기계기사 재료역학 문제입니다.

문제: 길이 4m인 단순보 중앙에 10kN의 집중하중이 작용할 때 최대 굽힘모멘트를 구하시오.

다음 순서로 설명해주세요:
1. 단순보 중앙 집중하중 공식: M = PL/4
2. 반력 계산
3. 굽힘모멘트 선도(BMD) 작성
4. 대입 및 계산
5. 최대 굽힘모멘트 위치와 값

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '폭 50mm, 높이 100mm인 직사각형 단면 보에 20kN·m의 굽힘모멘트가 작용할 때 최대 굽힘응력을 구하시오.',
        answer: 'σ_max = 240 MPa',
        prompt: `기계기사 재료역학 문제입니다.

문제: 폭 50mm, 높이 100mm인 직사각형 단면 보에 20kN·m의 굽힘모멘트가 작용할 때 최대 굽힘응력을 구하시오.

다음 순서로 설명해주세요:
1. 굽힘응력 공식: σ = My/I 또는 σ = M/Z
2. 직사각형 단면2차모멘트: I = bh³/12
3. 단면계수: Z = bh²/6
4. 대입 및 계산 (단위 주의)
5. 중립축에서 최대응력 위치

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '단순보에 등분포하중 w=5kN/m가 작용하고 스팬이 6m일 때 최대 처짐을 구하시오. (EI = 10⁴ kN·m²)',
        answer: 'δ_max = 12.66 mm',
        prompt: `기계기사 재료역학 문제입니다.

문제: 단순보에 등분포하중 w=5kN/m가 작용하고 스팬이 6m일 때 최대 처짐을 구하시오. (EI = 10⁴ kN·m²)

다음 순서로 설명해주세요:
1. 등분포하중 단순보 처짐 공식: δ = 5wL⁴/(384EI)
2. 단위 통일
3. 대입 및 계산
4. 최대 처짐 위치 (중앙)
5. 처짐 공식 유도 과정 (적분법)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'torsion',
    name: '비틀림',
    color: 'from-purple-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '지름 50mm인 중실축에 2kN·m의 토크가 작용할 때 최대 전단응력을 구하시오.',
        answer: 'τ_max = 81.5 MPa',
        prompt: `기계기사 재료역학 문제입니다.

문제: 지름 50mm인 중실축에 2kN·m의 토크가 작용할 때 최대 전단응력을 구하시오.

다음 순서로 설명해주세요:
1. 비틀림 전단응력 공식: τ = Tr/J 또는 τ = T/Zp
2. 중실원형 단면의 극단면2차모멘트: J = πd⁴/32
3. 극단면계수: Zp = πd³/16
4. 대입 및 계산 (단위 주의)
5. 최대 전단응력 위치 (표면)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '외경 60mm, 내경 40mm인 중공축에 3kN·m의 토크가 작용할 때 비틀림각을 구하시오. (G=80GPa, L=1m)',
        answer: 'θ = 2.27°',
        prompt: `기계기사 재료역학 문제입니다.

문제: 외경 60mm, 내경 40mm인 중공축에 3kN·m의 토크가 작용할 때 비틀림각을 구하시오. (G=80GPa, L=1m)

다음 순서로 설명해주세요:
1. 비틀림각 공식: θ = TL/(GJ)
2. 중공축 극단면2차모멘트: J = π(d₄⁴-d₁⁴)/32
3. 단위 통일 (라디안 → 도)
4. 대입 및 계산
5. 중공축의 장점 (경량화)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'mohr',
    name: '모어의 응력원',
    color: 'from-orange-500 to-red-500',
    questions: [
      {
        id: 1,
        question: 'σx=80MPa, σy=20MPa, τxy=30MPa일 때 주응력을 구하시오.',
        answer: 'σ₁=96.1MPa, σ₂=3.9MPa',
        prompt: `기계기사 재료역학 문제입니다.

문제: σx=80MPa, σy=20MPa, τxy=30MPa일 때 주응력을 구하시오.

다음 순서로 설명해주세요:
1. 주응력 공식: σ₁,₂ = (σx+σy)/2 ± √[(σx-σy)/2]² + τxy²
2. 평균응력 계산
3. 응력원 반지름 계산
4. 주응력 σ₁, σ₂ 계산
5. 모어의 응력원 그래프 해석

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: 'σx=100MPa, σy=-40MPa일 때 최대 전단응력을 구하시오.',
        answer: 'τ_max = 70 MPa',
        prompt: `기계기사 재료역학 문제입니다.

문제: σx=100MPa, σy=-40MPa일 때 최대 전단응력을 구하시오.

다음 순서로 설명해주세요:
1. 최대 전단응력 공식: τ_max = (σ₁-σ₂)/2
2. 또는 τ_max = √[(σx-σy)/2]² + τxy²
3. 대입 및 계산
4. 최대 전단응력 평면의 방향
5. 모어의 원에서 최대 전단응력 위치

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'buckling',
    name: '기둥의 좌굴',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      {
        id: 1,
        question: '길이 3m, 단면 50mm×50mm인 정사각형 기둥의 양단 힌지일 때 오일러 좌굴하중을 구하시오. (E=200GPa)',
        answer: 'P_cr = 114 kN',
        prompt: `기계기사 재료역학 문제입니다.

문제: 길이 3m, 단면 50mm×50mm인 정사각형 기둥의 양단 힌지일 때 오일러 좌굴하중을 구하시오. (E=200GPa)

다음 순서로 설명해주세요:
1. 오일러 좌굴하중 공식: P_cr = π²EI/(Le)²
2. 정사각형 단면2차모멘트: I = a⁴/12
3. 유효길이 Le (양단 힌지: Le = L)
4. 단위 통일 및 대입
5. 다양한 단부조건별 유효길이계수 n

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '세장비 100인 기둥의 임계응력을 구하시오. (E=200GPa)',
        answer: 'σ_cr = 197 MPa',
        prompt: `기계기사 재료역학 문제입니다.

문제: 세장비 100인 기둥의 임계응력을 구하시오. (E=200GPa)

다음 순서로 설명해주세요:
1. 세장비 정의: λ = Le/k (k: 단면2차반경)
2. 임계응력 공식: σ_cr = π²E/λ²
3. 대입 및 계산
4. 장주와 단주 구분 기준
5. 랭킨 공식과의 비교

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function MechanicsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('mechanics-progress');
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
    localStorage.setItem('mechanics-progress', JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            <span className="text-blue-600 font-medium">재료역학</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">📐</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">재료역학 학습</h1>
                <p className="text-blue-100">기계기사 필기 1과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-blue-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter(
              (q) => completedQuestions[`${topic.id}-${q.id}`]
            ).length;

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
                      <p className="text-sm opacity-80">
                        {topicCompleted}/{topic.questions.length} 완료
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>

                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-4">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-lg border-2 transition ${
                            isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleComplete(topic.id, q.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                                isCompleted
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-500'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">
                                Q{q.id}. {q.question}
                              </p>
                              <p className="text-sm text-gray-600 mb-3">
                                <strong>정답:</strong> {q.answer}
                              </p>
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
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
