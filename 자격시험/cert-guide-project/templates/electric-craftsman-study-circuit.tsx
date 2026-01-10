'use client';

import { useState, useEffect } from 'react';

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
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const [activeQuestionId, setActiveQuestionId] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  const activeTopic = topics.find(t => t.id === activeTopicId)!;
  const activeQuestion = activeTopic.questions.find(q => q.id === activeQuestionId)!;

  useEffect(() => {
    const saved = localStorage.getItem('electric-craftsman-circuit-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const markComplete = () => {
    const key = `${activeTopicId}-${activeQuestionId}`;
    const newCompleted = new Set(completedQuestions);
    newCompleted.add(key);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('electric-craftsman-circuit-completed', JSON.stringify([...newCompleted]));
  };

  const getCompletedCount = (topicId: string) => [...completedQuestions].filter(key => key.startsWith(topicId)).length;
  const copyPrompt = () => navigator.clipboard.writeText(activeQuestion.prompt);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-orange-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical" className="text-gray-600 hover:text-orange-600">기계·제어</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/electric-craftsman" className="text-gray-600 hover:text-orange-600">전기산업기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">회로이론/제어공학</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔌</span>
            <h1 className="text-2xl font-bold text-gray-800">회로이론/제어공학 학습하기</h1>
          </div>
          <p className="text-gray-600">전기산업기사 필기시험 핵심 과목</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-bold text-gray-800 mb-4">📚 학습 주제</h3>
              <div className="space-y-2">
                {topics.map((topic) => (
                  <button key={topic.id} onClick={() => { setActiveTopicId(topic.id); setActiveQuestionId(1); setShowAnswer(false); }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${activeTopicId === topic.id ? `bg-gradient-to-r ${topic.color} text-white` : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{topic.name}</span>
                      <span className={`text-xs ${activeTopicId === topic.id ? 'text-white/80' : 'text-gray-500'}`}>{getCompletedCount(topic.id)}/{topic.questions.length}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800">{activeTopic.name}</h3>
                <span className="text-sm text-gray-500">{activeQuestionId} / {activeTopic.questions.length}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeTopic.questions.map((q) => {
                  const isCompleted = completedQuestions.has(`${activeTopicId}-${q.id}`);
                  return (
                    <button key={q.id} onClick={() => { setActiveQuestionId(q.id); setShowAnswer(false); }}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${activeQuestionId === q.id ? 'bg-orange-500 text-white' : isCompleted ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {isCompleted ? '✓' : q.id}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">문제 {activeQuestionId}</h4>
                <p className="text-gray-700 text-lg leading-relaxed">{activeQuestion.question}</p>
              </div>
              <div className="border-t pt-4">
                {!showAnswer ? (
                  <button onClick={() => setShowAnswer(true)} className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">정답 보기</button>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-bold text-green-700">정답: </span>
                      <span className="text-green-800">{activeQuestion.answer}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={copyPrompt} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium">📋 AI 학습 프롬프트 복사</button>
                      <button onClick={markComplete} className="flex-1 py-3 bg-green-500 text-white rounded-lg font-medium">✓ 학습 완료</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => { if (activeQuestionId > 1) { setActiveQuestionId(activeQuestionId - 1); setShowAnswer(false); } }} disabled={activeQuestionId === 1}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium disabled:opacity-50">← 이전 문제</button>
              <button onClick={() => { if (activeQuestionId < activeTopic.questions.length) { setActiveQuestionId(activeQuestionId + 1); setShowAnswer(false); } }} disabled={activeQuestionId === activeTopic.questions.length}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium disabled:opacity-50">다음 문제 →</button>
            </div>

            {showAnswer && (
              <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                <h4 className="font-bold text-purple-800 mb-3">🤖 AI 학습 프롬프트</h4>
                <pre className="bg-white p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap border overflow-x-auto">{activeQuestion.prompt}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
