'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'dc-circuit',
    name: '직류회로',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '저항 R1=6Ω, R2=3Ω를 병렬 연결했을 때 합성저항은?', answer: 'R = 2Ω', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 저항 R1=6Ω, R2=3Ω를 병렬 연결했을 때 합성저항은?\n\n다음 순서로 설명해주세요:\n1. 병렬 합성저항 공식\n2. 1/R = 1/R1 + 1/R2\n3. 대입하여 계산\n4. R = R1×R2/(R1+R2)\n5. 병렬 특성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '키르히호프 전류법칙(KCL)을 설명하시오.', answer: '노드로 들어오는 전류 = 나가는 전류', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 키르히호프 전류법칙(KCL)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. KCL 정의\n2. 전하 보존 법칙\n3. ΣI = 0\n4. 예제 회로\n5. 적용 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '키르히호프 전압법칙(KVL)을 설명하시오.', answer: '폐회로의 전압 합 = 0', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 키르히호프 전압법칙(KVL)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. KVL 정의\n2. 에너지 보존 법칙\n3. ΣV = 0\n4. 예제 회로\n5. 적용 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '전력 P=100W, 저항 R=25Ω일 때 전류는?', answer: 'I = 2A', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 전력 P=100W, 저항 R=25Ω일 때 전류는?\n\n다음 순서로 설명해주세요:\n1. 전력 공식 P = I²R\n2. I = √(P/R)\n3. 대입하여 계산\n4. 다른 공식들\n5. 검산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '테브난 등가회로의 구성요소를 설명하시오.', answer: 'Vth(개방전압)과 Rth(등가저항)의 직렬연결', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 테브난 등가회로의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 테브난 정리\n2. Vth 구하기\n3. Rth 구하기\n4. 등가회로 구성\n5. 노턴 정리와 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'ac-circuit',
    name: '교류회로',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: 'R-L 직렬회로의 임피던스를 구하시오.', answer: 'Z = √(R² + XL²)', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: R-L 직렬회로의 임피던스를 구하시오.\n\n다음 순서로 설명해주세요:\n1. 임피던스 정의\n2. R과 XL의 위상차\n3. Z = √(R² + XL²)\n4. 위상각 θ = tan⁻¹(XL/R)\n5. 페이저 다이어그램\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'R-L-C 직렬회로에서 공진조건은?', answer: 'XL = XC, ω₀ = 1/√(LC)', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: R-L-C 직렬회로에서 공진조건은?\n\n다음 순서로 설명해주세요:\n1. 공진 정의\n2. XL = XC 조건\n3. ω₀L = 1/(ω₀C)\n4. 공진주파수 f₀\n5. 공진 특성 (최대전류)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '역률 cosφ = 0.8(지상)일 때 무효전력 비율은?', answer: 'sinφ = 0.6, 무효전력/피상전력 = 0.6', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 역률 cosφ = 0.8(지상)일 때 무효전력 비율은?\n\n다음 순서로 설명해주세요:\n1. 역률 정의\n2. sinφ 계산\n3. 유효/무효/피상전력\n4. 전력삼각형\n5. 역률 개선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '교류 220V의 최대값과 평균값을 구하시오.', answer: '최대값 311V, 평균값 198V', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 교류 220V(실효값)의 최대값과 평균값을 구하시오.\n\n다음 순서로 설명해주세요:\n1. 실효값 정의\n2. Vm = √2 × Vrms\n3. Vavg = 2Vm/π\n4. 파형률, 파고율\n5. 각 값의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '병렬 R-L-C 회로에서 공진 시 임피던스는?', answer: '무한대(이상적), 실제로는 최대', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 병렬 R-L-C 회로에서 공진 시 임피던스는?\n\n다음 순서로 설명해주세요:\n1. 병렬공진 조건\n2. BL = BC일 때\n3. 임피던스 최대\n4. 전류 최소\n5. Q팩터\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'three-phase',
    name: '3상 교류',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: 'Y결선에서 선간전압과 상전압의 관계는?', answer: 'VL = √3Vp', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: Y결선에서 선간전압과 상전압의 관계는?\n\n다음 순서로 설명해주세요:\n1. Y결선 구조\n2. VL = √3Vp 유도\n3. 위상차 30°\n4. 전류 관계 IL = Ip\n5. 페이저 다이어그램\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'Δ결선에서 선전류와 상전류의 관계는?', answer: 'IL = √3Ip', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: Δ결선에서 선전류와 상전류의 관계는?\n\n다음 순서로 설명해주세요:\n1. Δ결선 구조\n2. IL = √3Ip 유도\n3. 전압 관계 VL = Vp\n4. 위상차\n5. Y결선과 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '3상 전력 공식을 쓰시오.', answer: 'P = √3VLILcosφ', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 3상 전력 공식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 단상 전력\n2. 3상 유효전력\n3. P = √3VLILcosφ\n4. 무효전력 Q\n5. 피상전력 S\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'Y-Δ 변환 시 임피던스 관계는?', answer: 'ZΔ = 3ZY', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: Y-Δ 변환 시 임피던스 관계는?\n\n다음 순서로 설명해주세요:\n1. Y결선 임피던스\n2. Δ결선 임피던스\n3. ZΔ = 3ZY 관계\n4. 변환 공식 유도\n5. 역변환\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '3상 불평형 부하에서 중성선 전류는?', answer: '각 상전류의 벡터합', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 3상 불평형 부하에서 중성선 전류는?\n\n다음 순서로 설명해주세요:\n1. 불평형 부하\n2. In = Ia + Ib + Ic\n3. 벡터합 계산\n4. 평형 시 In = 0\n5. 중성선 역할\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'transient',
    name: '과도현상',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: 'R-L 직렬회로의 시정수를 구하시오.', answer: 'τ = L/R', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: R-L 직렬회로의 시정수를 구하시오.\n\n다음 순서로 설명해주세요:\n1. 시정수 정의\n2. τ = L/R 유도\n3. 물리적 의미\n4. 5τ 후 정상상태\n5. 과도응답\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'R-C 직렬회로의 시정수를 구하시오.', answer: 'τ = RC', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: R-C 직렬회로의 시정수를 구하시오.\n\n다음 순서로 설명해주세요:\n1. 시정수 정의\n2. τ = RC 유도\n3. 충전 곡선\n4. 방전 곡선\n5. 63.2% 도달 시간\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'R=10Ω, C=100μF일 때 시정수는?', answer: 'τ = 1ms', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: R=10Ω, C=100μF일 때 시정수는?\n\n다음 순서로 설명해주세요:\n1. τ = RC\n2. 단위 변환\n3. 대입하여 계산\n4. 5τ 시간\n5. 충전 완료 시간\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'L-C 회로의 자유진동 주파수를 구하시오.', answer: 'f₀ = 1/(2π√LC)', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: L-C 회로의 자유진동 주파수를 구하시오.\n\n다음 순서로 설명해주세요:\n1. LC 진동회로\n2. 에너지 교환\n3. ω₀ = 1/√(LC)\n4. f₀ = ω₀/2π\n5. 감쇠 진동\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '콘덴서 충전 시 전압이 63.2%에 도달하는 시간은?', answer: 't = τ = RC', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 콘덴서 충전 시 전압이 63.2%에 도달하는 시간은?\n\n다음 순서로 설명해주세요:\n1. 충전 공식 v(t)\n2. v(τ) = V(1-e⁻¹)\n3. 1-e⁻¹ = 0.632\n4. 99% 도달 시간\n5. 방전과 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'control',
    name: '제어공학 기초',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '개루프 제어와 폐루프 제어의 차이점은?', answer: '폐루프: 피드백 있음, 오차 보정 가능', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 개루프 제어와 폐루프 제어의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 개루프 제어 특성\n2. 폐루프 제어 특성\n3. 피드백 역할\n4. 장단점 비교\n5. 적용 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '전달함수의 정의를 쓰시오.', answer: 'G(s) = 출력/입력 (라플라스 변환)', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 전달함수의 정의를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 라플라스 변환\n2. G(s) = Y(s)/X(s)\n3. 초기조건 0\n4. 극점과 영점\n5. 시스템 특성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'PID 제어기의 각 요소 역할을 설명하시오.', answer: 'P:비례, I:적분(정상오차제거), D:미분(응답속도)', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: PID 제어기의 각 요소 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. P 제어 (비례)\n2. I 제어 (적분)\n3. D 제어 (미분)\n4. 조합 효과\n5. 튜닝 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '1차 시스템의 시간응답 특성을 설명하시오.', answer: '지수함수적 응답, 시정수 τ', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 1차 시스템의 시간응답 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1차 시스템 전달함수\n2. 단위계단응답\n3. 시정수 τ\n4. 상승시간\n5. 정상상태값\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '안정도 판별 방법을 3가지 쓰시오.', answer: '루스-허르비츠, 나이퀴스트, 보드선도', prompt: '전기산업기사 회로이론 문제입니다.\n\n문제: 안정도 판별 방법을 3가지 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 루스-허르비츠 판별법\n2. 나이퀴스트 판별법\n3. 보드선도 판별법\n4. 안정조건\n5. 위상여유/이득여유\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function ElectricCraftsmanCircuitStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('electric-craftsman-circuit-completed');
    if (saved) {
      const arr = JSON.parse(saved);
      const obj: Record<string, boolean> = {};
      arr.forEach((key: string) => { obj[key] = true; });
      setCompletedQuestions(obj);
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    const arr = Object.keys(newCompleted).filter(k => newCompleted[k]);
    localStorage.setItem('electric-craftsman-circuit-completed', JSON.stringify(arr));
  };

  const getCompletedCount = (topicId: string) => {
    return Object.keys(completedQuestions).filter(key => key.startsWith(topicId) && completedQuestions[key]).length;
  };

  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-orange-600">기계·전기</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/electric-craftsman" className="text-gray-600 hover:text-orange-600">전기산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">회로이론</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🔌</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">회로이론/제어공학</h1>
              <p className="text-orange-100">전기산업기사 필기 핵심 과목</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold">{totalCompleted}/{totalQuestions}</div>
              <div className="text-orange-100 text-sm">문제 완료</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
                    {getCompletedCount(topic.id)}/{topic.questions.length}
                  </span>
                </div>
                <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => {
                    const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border-2 transition ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleComplete(topic.id, q.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
                          >
                            {isCompleted && '✓'}
                          </button>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                            <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                            <div className="flex gap-2 flex-wrap">
                              <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">🧡 Claude</a>
                              <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">💚 ChatGPT</a>
                              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">💙 Gemini</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
