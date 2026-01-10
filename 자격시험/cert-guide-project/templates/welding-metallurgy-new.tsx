'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'steel',
    name: '철강재료',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '탄소강의 탄소 함량에 따른 분류를 설명하시오.', answer: '저탄소강(0.25% 이하), 중탄소강(0.25~0.6%), 고탄소강(0.6% 이상)', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 탄소강의 탄소 함량에 따른 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저탄소강 특성\n2. 중탄소강 특성\n3. 고탄소강 특성\n4. 용접성 비교\n5. 적용 분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'Fe-C 상태도에서 공석점과 공정점을 설명하시오.', answer: '공석점: 723℃/0.77%C, 공정점: 1147℃/4.3%C', prompt: '용접기사 용접야금 문제입니다.\n\n문제: Fe-C 상태도에서 공석점과 공정점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공석변태 (γ→α+Fe3C)\n2. 공정반응 (L→γ+Fe3C)\n3. 온도와 조성\n4. 펄라이트 조직\n5. 상태도 해석\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '마르텐사이트 변태의 특징을 설명하시오.', answer: '무확산 변태, 급냉 시 발생, 경도 높음', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 마르텐사이트 변태의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무확산 변태 원리\n2. 냉각속도 영향\n3. 경도/강도 증가\n4. 취성 증가\n5. 용접부 문제점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'HAZ(열영향부)의 조직 변화를 설명하시오.', answer: '조립역, 미세립역, 불완전변태역, 템퍼링역', prompt: '용접기사 용접야금 문제입니다.\n\n문제: HAZ(열영향부)의 조직 변화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용융경계부\n2. 조립역 (과열)\n3. 미세립역\n4. 불완전변태역\n5. 템퍼링역\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '탄소당량(CE)의 의미와 공식을 쓰시오.', answer: 'CE = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 탄소당량(CE)의 의미와 공식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 탄소당량 정의\n2. CE 공식\n3. 용접성 평가\n4. 예열온도 결정\n5. 허용 범위\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'weld-metal',
    name: '용접금속',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '용접금속의 응고과정을 설명하시오.', answer: '주상정 성장, 중심부 등축정, 편석 발생', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 용접금속의 응고과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵생성\n2. 주상정 성장\n3. 등축정 형성\n4. 편석 현상\n5. 냉각속도 영향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '용접금속의 희석률을 설명하시오.', answer: '희석률 = 모재용융량 / 전체용착량 × 100%', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 용접금속의 희석률을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 희석률 정의\n2. 계산 공식\n3. 희석률에 영향주는 인자\n4. 희석률 제어\n5. 이종금속 용접\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '용접금속 중 기공 발생 원인과 대책을 설명하시오.', answer: '원인: 수소/질소/CO, 대책: 건조/청결/차폐', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 용접금속 중 기공 발생 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수소에 의한 기공\n2. 질소에 의한 기공\n3. CO 가스\n4. 발생 방지 대책\n5. 용접봉 건조\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '용접금속의 편석 현상을 설명하시오.', answer: '응고 시 용질원소의 불균일 분포', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 용접금속의 편석 현상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 편석 정의\n2. 미시편석\n3. 거시편석\n4. 중심선 편석\n5. 방지 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '용접금속의 탈산 작용을 설명하시오.', answer: 'Si, Mn 등 탈산제가 산소 제거', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 용접금속의 탈산 작용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탈산 필요성\n2. Si 탈산\n3. Mn 탈산\n4. 복합탈산\n5. 용접봉 피복제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'defect',
    name: '용접결함/균열',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '고온균열과 저온균열의 차이점을 설명하시오.', answer: '고온: 응고 중 발생, 저온: 냉각 후 수소에 의해 발생', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 고온균열과 저온균열의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고온균열 원인\n2. 저온균열 원인\n3. 발생 온도 차이\n4. 균열 형태\n5. 방지 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '수소유기균열(지연균열)의 발생조건을 설명하시오.', answer: '확산성 수소 + 경화조직 + 인장응력', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 수소유기균열(지연균열)의 발생조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 확산성 수소\n2. 경화조직(마르텐사이트)\n3. 잔류인장응력\n4. 3조건 동시 충족\n5. 방지 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '용접부 라멜라테어(층상파괴)를 설명하시오.', answer: '압연판 두께방향 인장응력에 의한 계단형 파괴', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 용접부 라멜라테어(층상파괴)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 라멜라테어 정의\n2. 발생 원인\n3. 비금속 개재물\n4. 이음 설계\n5. 방지 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '응력부식균열(SCC)의 발생조건을 설명하시오.', answer: '인장응력 + 부식환경 + 예민화 조직', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 응력부식균열(SCC)의 발생조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SCC 정의\n2. 인장응력\n3. 부식환경\n4. 예민화 조직\n5. 방지 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '재열균열의 발생원인과 방지대책을 설명하시오.', answer: '석출강화형 강에서 PWHT 시 발생, 저C/저불순물', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 재열균열의 발생원인과 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재열균열 정의\n2. 발생 기구\n3. 석출강화 원소\n4. HAZ 조립역\n5. 방지 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'heattreat',
    name: '열처리',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '예열의 목적과 효과를 설명하시오.', answer: '냉각속도 저하, 경화조직 억제, 수소 확산', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 예열의 목적과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 냉각속도 저하\n2. 경화조직 억제\n3. 수소 확산 촉진\n4. 잔류응력 감소\n5. 예열온도 결정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'PWHT(용접후열처리)의 목적을 설명하시오.', answer: '잔류응력 제거, 조직 안정화, 수소 제거', prompt: '용접기사 용접야금 문제입니다.\n\n문제: PWHT(용접후열처리)의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 잔류응력 제거\n2. 조직 안정화\n3. 수소 제거\n4. 인성 회복\n5. PWHT 조건\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '담금질(Quenching)과 뜨임(Tempering)을 설명하시오.', answer: '담금질: 급냉경화, 뜨임: 연화+인성 회복', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 담금질(Quenching)과 뜨임(Tempering)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 담금질 목적\n2. 마르텐사이트 생성\n3. 뜨임 목적\n4. 뜨임 취성\n5. 조질(Q+T) 강\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '불림(Normalizing)과 풀림(Annealing)의 차이를 설명하시오.', answer: '불림: 공냉, 풀림: 노냉, 경도 차이', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 불림(Normalizing)과 풀림(Annealing)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불림 목적\n2. 풀림 목적\n3. 냉각방법 차이\n4. 조직/경도 차이\n5. 적용 분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '층간온도 관리의 필요성을 설명하시오.', answer: '다층용접 시 HAZ 조직 제어, 균열 방지', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 층간온도 관리의 필요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 층간온도 정의\n2. 최소 층간온도\n3. 최대 층간온도\n4. HAZ 영향\n5. 관리 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'alloy',
    name: '합금강/특수강',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '스테인리스강의 종류와 용접특성을 설명하시오.', answer: '오스테나이트계, 페라이트계, 마르텐사이트계', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 스테인리스강의 종류와 용접특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 오스테나이트계 특성\n2. 페라이트계 특성\n3. 마르텐사이트계 특성\n4. 예민화 현상\n5. 용접봉 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '오스테나이트 스테인리스강의 예민화 현상을 설명하시오.', answer: '입계에 Cr23C6 석출로 Cr 결핍, 입계부식', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 오스테나이트 스테인리스강의 예민화 현상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예민화 정의\n2. Cr23C6 석출\n3. Cr 결핍역\n4. 입계부식\n5. 방지 대책 (저C, Ti/Nb)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '이종금속 용접 시 주의사항을 설명하시오.', answer: '탄소이동, 희석률, 열팽창차, 용접봉 선정', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 이종금속 용접 시 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탄소이동 현상\n2. 희석률 제어\n3. 열팽창계수 차이\n4. 버터링 기법\n5. 용접재료 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '내열강의 용접 특성을 설명하시오.', answer: 'Cr-Mo 강, 예열/PWHT 필수, 수소균열 주의', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 내열강의 용접 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Cr-Mo 강 종류\n2. 예열 필요성\n3. PWHT 조건\n4. 수소균열 방지\n5. 용접봉 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '알루미늄 합금의 용접 특성을 설명하시오.', answer: '산화피막, 열전도 높음, 기공 발생 쉬움', prompt: '용접기사 용접야금 문제입니다.\n\n문제: 알루미늄 합금의 용접 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산화피막(Al2O3)\n2. 높은 열전도도\n3. 기공 발생\n4. 고온균열\n5. TIG/MIG 용접\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function WeldingMetallurgyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('welding-metallurgy-completed');
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
    localStorage.setItem('welding-metallurgy-completed', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-red-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-red-600">기계·전기</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/welding-engineer" className="text-gray-600 hover:text-red-600">용접기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">용접야금</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🔥</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">용접야금</h1>
              <p className="text-red-100">용접기사 필기 핵심 과목</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold">{totalCompleted}/{totalQuestions}</div>
              <div className="text-red-100 text-sm">문제 완료</div>
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
