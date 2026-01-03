'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'arc',
    name: '아크용접',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: 'SMAW(피복아크용접)의 특징과 장단점을 설명하시오.', answer: '장비 간단, 전자세 가능, 생산성 낮음', prompt: '용접기사 용접시공 문제입니다.\n\n문제: SMAW(피복아크용접)의 특징과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SMAW 원리\n2. 장점\n3. 단점\n4. 피복제 역할\n5. 적용 분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'GMAW(MIG/MAG)의 원리와 보호가스 종류를 설명하시오.', answer: 'MIG: Ar/He, MAG: CO2/혼합가스', prompt: '용접기사 용접시공 문제입니다.\n\n문제: GMAW(MIG/MAG)의 원리와 보호가스 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. GMAW 원리\n2. MIG (불활성가스)\n3. MAG (활성가스)\n4. 혼합가스\n5. 각 가스 특성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'GTAW(TIG)의 특징과 적용을 설명하시오.', answer: '비소모전극, 고품질, 박판/비철금속', prompt: '용접기사 용접시공 문제입니다.\n\n문제: GTAW(TIG)의 특징과 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. GTAW 원리\n2. 텅스텐 전극\n3. 보호가스 (Ar)\n4. 장단점\n5. 적용 분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'FCAW(플럭스코어드아크용접)의 특징을 설명하시오.', answer: '자체 플럭스, 고능률, 실드가스 필요/불필요', prompt: '용접기사 용접시공 문제입니다.\n\n문제: FCAW(플럭스코어드아크용접)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. FCAW 원리\n2. 플럭스코어드 와이어\n3. 가스실드/셀프실드\n4. 장단점\n5. 적용 분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'SAW(서브머지드아크용접)의 특징을 설명하시오.', answer: '플럭스 속 아크, 고용착, 자동화', prompt: '용접기사 용접시공 문제입니다.\n\n문제: SAW(서브머지드아크용접)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SAW 원리\n2. 플럭스 역할\n3. 장단점\n4. 용접조건\n5. 적용 분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'special',
    name: '특수용접',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '레이저빔용접의 원리와 특징을 설명하시오.', answer: '고에너지밀도, 좁은HAZ, 고속용접', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 레이저빔용접의 원리와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 레이저 원리\n2. 고에너지 밀도\n3. 키홀 용접\n4. 장단점\n5. 적용 분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '전자빔용접의 특징을 설명하시오.', answer: '진공 필수, 최고 에너지밀도, 깊은 용입', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 전자빔용접의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전자빔 원리\n2. 진공 환경\n3. 용입 깊이\n4. 장단점\n5. 적용 분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '저항용접의 종류와 원리를 설명하시오.', answer: '점용접, 심용접, 프로젝션용접', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 저항용접의 종류와 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저항발열 원리\n2. 점용접(Spot)\n3. 심용접(Seam)\n4. 프로젝션용접\n5. 적용 분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '마찰용접의 원리와 특징을 설명하시오.', answer: '회전마찰열로 접합, 고상접합, 이종금속 가능', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 마찰용접의 원리와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 마찰열 발생\n2. 업셋팅\n3. 고상접합 특성\n4. 장단점\n5. 적용 분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '플라즈마용접의 특징을 설명하시오.', answer: 'TIG보다 고에너지, 키홀용접 가능', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 플라즈마용접의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 플라즈마 아크 원리\n2. 오리피스 가스\n3. 키홀 용접\n4. TIG와 비교\n5. 적용 분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'condition',
    name: '용접조건',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '용접입열량 계산 공식과 의미를 설명하시오.', answer: 'H = 60EI/v [J/cm]', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 용접입열량 계산 공식과 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 입열량 정의\n2. H = 60EI/v\n3. 입열량 영향\n4. 적정 입열량\n5. HAZ 제어\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '용접전류가 용접품질에 미치는 영향을 설명하시오.', answer: '용입깊이, 용착량, 스패터, 비드외관', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 용접전류가 용접품질에 미치는 영향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전류 증가 시 용입\n2. 용착량 변화\n3. 스패터 발생\n4. 비드 외관\n5. 적정 전류 선정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '용접속도가 용접품질에 미치는 영향을 설명하시오.', answer: '비드폭, 용입깊이, 입열량', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 용접속도가 용접품질에 미치는 영향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 속도와 비드폭\n2. 속도와 용입\n3. 입열량 관계\n4. 너무 빠를 때\n5. 너무 느릴 때\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '와이어 돌출길이(Extension)의 영향을 설명하시오.', answer: '저항발열 증가, 전류감소 효과, 용입감소', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 와이어 돌출길이(Extension)의 영향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 돌출길이 정의\n2. 저항발열\n3. 용입 영향\n4. 적정 길이\n5. 관리 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '용접자세별 용접조건 변화를 설명하시오.', answer: '수직/위보기 시 전류/속도 감소', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 용접자세별 용접조건 변화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 아래보기(F)\n2. 수평(H)\n3. 수직(V)\n4. 위보기(O)\n5. 조건 조정 원리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'material',
    name: '용접재료',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '피복용접봉의 피복제 역할을 설명하시오.', answer: '아크안정, 보호가스, 슬래그, 합금원소', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 피복용접봉의 피복제 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 아크안정제\n2. 보호가스 발생\n3. 슬래그 형성\n4. 합금원소 첨가\n5. 탈산제 역할\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '피복용접봉의 분류(E7016, E7018)를 설명하시오.', answer: 'E: 전극, 70: 인장강도, 16: 피복제/전류', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 피복용접봉의 분류(E7016, E7018)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. E: 전극\n2. 70: 인장강도 70ksi\n3. 1: 전자세\n4. 6: 저수소계/AC-DC\n5. 8: 철분저수소계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '저수소계 용접봉의 특징과 관리를 설명하시오.', answer: '수소 함량 최소, 건조 필수, 고강도강용', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 저수소계 용접봉의 특징과 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저수소 특성\n2. 건조 조건\n3. 보관 방법\n4. 적용 모재\n5. 재건조 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '솔리드와이어와 플럭스코어드와이어를 비교하시오.', answer: '솔리드: 외부가스, FCW: 내부플럭스', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 솔리드와이어와 플럭스코어드와이어를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 솔리드와이어 특성\n2. FCW 특성\n3. 보호방식 차이\n4. 용착률 비교\n5. 적용 분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'SAW 플럭스의 종류와 특성을 설명하시오.', answer: '용융형, 소결형, 본드형', prompt: '용접기사 용접시공 문제입니다.\n\n문제: SAW 플럭스의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용융형 플럭스\n2. 소결형 플럭스\n3. 본드형 플럭스\n4. 각 특성 비교\n5. 선정 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'safety',
    name: '안전관리',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '용접작업 시 감전 방지대책을 설명하시오.', answer: '절연보호구, 건조환경, 자동전격방지기', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 용접작업 시 감전 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 절연장갑/작업복\n2. 건조한 환경\n3. 자동전격방지기\n4. 접지 확인\n5. 무부하전압 제한\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '아크광선에 의한 건강장해와 예방을 설명하시오.', answer: '자외선/적외선, 전광성안염, 차광보안경', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 아크광선에 의한 건강장해와 예방을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자외선 영향\n2. 적외선 영향\n3. 전광성안염\n4. 차광도 선정\n5. 보호구 착용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '용접흄 발생과 대책을 설명하시오.', answer: '금속산화물 흄, 국소배기, 마스크 착용', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 용접흄 발생과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용접흄 성분\n2. 건강장해\n3. 국소배기장치\n4. 방진마스크\n5. 작업환경 개선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '가스용접/절단 시 폭발위험과 예방을 설명하시오.', answer: '역화방지, 호스관리, 환기', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 가스용접/절단 시 폭발위험과 예방을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역화(Flashback)\n2. 역화방지기\n3. 호스/조정기 관리\n4. 환기\n5. 가스누출 점검\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '밀폐공간 용접작업 시 안전대책을 설명하시오.', answer: '환기, 산소농도측정, 감시인, 구조장비', prompt: '용접기사 용접시공 문제입니다.\n\n문제: 밀폐공간 용접작업 시 안전대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 밀폐공간 정의\n2. 환기 실시\n3. 산소농도 측정\n4. 감시인 배치\n5. 구조장비 준비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function WeldingProcessStudyPage() {
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const [activeQuestionId, setActiveQuestionId] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  const activeTopic = topics.find(t => t.id === activeTopicId)!;
  const activeQuestion = activeTopic.questions.find(q => q.id === activeQuestionId)!;

  useEffect(() => {
    const saved = localStorage.getItem('welding-process-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const markComplete = () => {
    const key = `${activeTopicId}-${activeQuestionId}`;
    const newCompleted = new Set(completedQuestions);
    newCompleted.add(key);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('welding-process-completed', JSON.stringify([...newCompleted]));
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
            <span className="text-red-600 font-medium">용접시공</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔧</span>
            <h1 className="text-2xl font-bold text-gray-800">용접시공 학습하기</h1>
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
