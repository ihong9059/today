'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'joint',
    name: '이음설계',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '맞대기 이음의 그루브 형상 종류를 설명하시오.', answer: 'I, V, U, X, K, J형 그루브', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 맞대기 이음의 그루브 형상 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. I형 그루브 (박판)\n2. V형 그루브 (편면)\n3. U형 그루브 (후판)\n4. X형 그루브 (양면)\n5. K, J형 특성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '필릿용접의 유효목두께 계산방법을 설명하시오.', answer: 'a = 0.7S (S: 다리길이, 등각필릿)', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 필릿용접의 유효목두께 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 목두께(Throat) 정의\n2. 이론목두께\n3. 유효목두께\n4. a = 0.7S 유도\n5. 부등각 필릿\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '용접이음의 효율을 설명하시오.', answer: '용접이음 강도 / 모재 강도 × 100%', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 용접이음의 효율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이음효율 정의\n2. 완전용입 효율\n3. 부분용입 효율\n4. 필릿용접 효율\n5. 검사에 따른 효율\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '용접기호 표시방법을 설명하시오.', answer: '기선, 화살표, 용접기호, 치수로 구성', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 용접기호 표시방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기선 (Reference line)\n2. 화살표 (Arrow)\n3. 용접기호 위치\n4. 치수 표시\n5. 보조기호\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'T이음과 십자이음의 강도 특성을 비교하시오.', answer: 'T이음: 비대칭, 십자이음: 대칭하중 유리', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: T이음과 십자이음의 강도 특성을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. T이음 특성\n2. 십자이음 특성\n3. 응력집중\n4. 설계 시 주의점\n5. 적용 분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'strength',
    name: '강도계산',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '맞대기용접 이음의 허용응력 계산식을 쓰시오.', answer: 'σ = P / (t × L)', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 맞대기용접 이음의 허용응력 계산식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 인장하중 P\n2. 판두께 t\n3. 용접길이 L\n4. 허용응력 계산\n5. 안전율 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '필릿용접의 허용전단응력 계산식을 쓰시오.', answer: 'τ = P / (0.7S × L)', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 필릿용접의 허용전단응력 계산식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 유효목두께 0.7S\n2. 용접길이 L\n3. 전단하중 P\n4. 전단응력 계산\n5. 허용값 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '용접부의 피로강도에 영향을 주는 요소를 설명하시오.', answer: '응력집중, 잔류응력, 결함, 표면상태', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 용접부의 피로강도에 영향을 주는 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 응력집중계수\n2. 잔류응력\n3. 용접결함\n4. 표면상태\n5. 피로수명 향상법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '조합응력을 받는 용접부의 강도 판정 기준을 설명하시오.', answer: '√(σ² + 3τ²) ≤ σa (von Mises)', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 조합응력을 받는 용접부의 강도 판정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인장응력 σ\n2. 전단응력 τ\n3. von Mises 기준\n4. 상당응력 계산\n5. 허용응력 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '용접부 응력집중계수(Kt)의 개념을 설명하시오.', answer: 'Kt = 최대응력 / 공칭응력', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 용접부 응력집중계수(Kt)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 응력집중 정의\n2. Kt 계산\n3. 형상에 따른 Kt\n4. 피로강도 영향\n5. 저감 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'residual',
    name: '잔류응력/변형',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '용접 잔류응력의 발생원인을 설명하시오.', answer: '불균일 가열/냉각에 의한 열응력', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 용접 잔류응력의 발생원인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 국부가열\n2. 열팽창 구속\n3. 냉각 수축\n4. 잔류응력 분포\n5. 영향 인자\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '용접 잔류응력 제거방법을 설명하시오.', answer: 'SR(응력제거 열처리), 피닝, 진동법', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 용접 잔류응력 제거방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SR 열처리 (PWHT)\n2. 피닝 (Peening)\n3. 진동 응력제거\n4. 기계적 방법\n5. 각 방법 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '용접변형의 종류를 설명하시오.', answer: '종수축, 횡수축, 각변형, 좌굴, 회전변형', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 용접변형의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 종수축(세로)\n2. 횡수축(가로)\n3. 각변형\n4. 좌굴변형\n5. 회전변형\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '용접변형 방지대책을 설명하시오.', answer: '역변형, 구속, 용접순서, 저입열', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 용접변형 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역변형법\n2. 구속법\n3. 용접순서 조정\n4. 저입열 용접\n5. 대칭용접\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '용접변형 교정방법을 설명하시오.', answer: '기계적 교정, 선상가열, 점가열', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 용접변형 교정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 롤러교정\n2. 프레스교정\n3. 선상가열\n4. 점가열\n5. 교정 시 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'code',
    name: '규격/기준',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '용접이음 등급(이음 범주)을 설명하시오.', answer: 'AWS D1.1: Complete/Partial Joint Penetration', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 용접이음 등급(이음 범주)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CJP (완전용입)\n2. PJP (부분용입)\n3. 필릿용접\n4. 각 등급 특성\n5. 적용 하중 조건\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'WPS(용접절차사양서)에 포함되어야 할 내용을 설명하시오.', answer: '모재, 용접봉, 전류/전압, 속도, 예열, 층간온도', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: WPS(용접절차사양서)에 포함되어야 할 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 모재 사양\n2. 용접재료\n3. 용접조건\n4. 예열/층간온도\n5. 후열처리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'PQR(용접절차인정기록)의 역할을 설명하시오.', answer: 'WPS를 검증하는 시험 결과 기록', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: PQR(용접절차인정기록)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PQR 정의\n2. WPS와 관계\n3. 시험 항목\n4. 인정 범위\n5. 유효기간\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '용접사 자격인정의 필수변수를 설명하시오.', answer: '용접법, 자세, 모재두께, 용접재료', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 용접사 자격인정의 필수변수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용접법 (SMAW, GMAW 등)\n2. 용접자세 (F, H, V, O)\n3. 모재 두께 범위\n4. 용접재료 그룹\n5. 인정 범위\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '압력용기 용접부 허용결함 크기 기준을 설명하시오.', answer: 'ASME VIII: RT 기준 균열불허, 기공/슬래그 크기제한', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 압력용기 용접부 허용결함 크기 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 균열 불허\n2. 기공 허용크기\n3. 슬래그 허용크기\n4. 용입불량\n5. 합격/불합격 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'structure',
    name: '구조물설계',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '용접구조물 설계 시 고려사항을 설명하시오.', answer: '응력흐름, 접근성, 변형제어, 검사가능성', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 용접구조물 설계 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 응력흐름 고려\n2. 용접 접근성\n3. 변형제어\n4. 검사 가능성\n5. 경제성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '용접이음 위치 선정 시 주의사항을 설명하시오.', answer: '응력집중부 회피, 교차용접 회피, 검사용이', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 용접이음 위치 선정 시 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 응력집중부 회피\n2. 용접선 교차 회피\n3. 구속도 최소화\n4. 검사 용이성\n5. 접근성 확보\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '피로하중을 받는 용접부 설계 시 고려사항을 설명하시오.', answer: '이음 등급, 응력범위, 응력집중 저감', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 피로하중을 받는 용접부 설계 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이음 등급 분류\n2. 허용 응력범위\n3. 응력집중 저감\n4. 용접토우 처리\n5. S-N 곡선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '강구조물 기둥-보 접합부 설계를 설명하시오.', answer: '강접합, 핀접합, 반강접합 선택', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 강구조물 기둥-보 접합부 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강접합 특성\n2. 핀접합 특성\n3. 반강접합\n4. 다이어프램\n5. 패널존 설계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '용접 접근성을 고려한 설계 원칙을 설명하시오.', answer: '아래보기 자세 최대화, 공간 확보, 순서 고려', prompt: '용접기사 용접구조설계 문제입니다.\n\n문제: 용접 접근성을 고려한 설계 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 아래보기 자세 확보\n2. 작업공간 확보\n3. 용접순서 고려\n4. 토치 접근\n5. 현장용접 최소화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function WeldingDesignStudyPage() {
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const [activeQuestionId, setActiveQuestionId] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  const activeTopic = topics.find(t => t.id === activeTopicId)!;
  const activeQuestion = activeTopic.questions.find(q => q.id === activeQuestionId)!;

  useEffect(() => {
    const saved = localStorage.getItem('welding-design-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const markComplete = () => {
    const key = `${activeTopicId}-${activeQuestionId}`;
    const newCompleted = new Set(completedQuestions);
    newCompleted.add(key);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('welding-design-completed', JSON.stringify([...newCompleted]));
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
            <a href="/" className="text-gray-600 hover:text-red-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical" className="text-gray-600 hover:text-red-600">기계·제어</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/welding-engineer" className="text-gray-600 hover:text-red-600">용접기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">용접구조설계</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📐</span>
            <h1 className="text-2xl font-bold text-gray-800">용접구조설계 학습하기</h1>
          </div>
          <p className="text-gray-600">용접기사 필기시험 핵심 과목</p>
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
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${activeQuestionId === q.id ? 'bg-red-500 text-white' : isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
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
                  <button onClick={() => setShowAnswer(true)} className="w-full py-3 bg-red-500 text-white rounded-lg font-medium">정답 보기</button>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-bold text-green-700">정답: </span>
                      <span className="text-green-800">{activeQuestion.answer}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={copyPrompt} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium">📋 AI 프롬프트 복사</button>
                      <button onClick={markComplete} className="flex-1 py-3 bg-green-500 text-white rounded-lg font-medium">✓ 학습 완료</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => { if (activeQuestionId > 1) { setActiveQuestionId(activeQuestionId - 1); setShowAnswer(false); } }} disabled={activeQuestionId === 1}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium disabled:opacity-50">← 이전</button>
              <button onClick={() => { if (activeQuestionId < activeTopic.questions.length) { setActiveQuestionId(activeQuestionId + 1); setShowAnswer(false); } }} disabled={activeQuestionId === activeTopic.questions.length}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium disabled:opacity-50">다음 →</button>
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
