'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'visual',
    name: '육안검사',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '용접부 육안검사(VT) 항목을 설명하시오.', answer: '비드외관, 언더컷, 오버랩, 균열, 기공', prompt: '용접기사 용접검사 문제입니다.\n\n문제: 용접부 육안검사(VT) 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비드 외관/형상\n2. 언더컷 검사\n3. 오버랩 검사\n4. 표면균열\n5. 표면기공\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '용접결함 중 언더컷과 오버랩의 차이를 설명하시오.', answer: '언더컷: 모재홈, 오버랩: 비드가 모재 덮음', prompt: '용접기사 용접검사 문제입니다.\n\n문제: 용접결함 중 언더컷과 오버랩의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 언더컷 정의/원인\n2. 오버랩 정의/원인\n3. 허용 기준\n4. 발생 방지\n5. 보수 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '용접비드의 합격 기준을 설명하시오.', answer: '균일 비드폭, 적정 여성, 결함 없음', prompt: '용접기사 용접검사 문제입니다.\n\n문제: 용접비드의 합격 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비드폭 균일성\n2. 여성(덧살) 높이\n3. 표면결함 부재\n4. 시작/끝단 처리\n5. 규격별 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '용접부 치수 검사 항목을 설명하시오.', answer: '비드폭, 여성높이, 다리길이, 용입깊이', prompt: '용접기사 용접검사 문제입니다.\n\n문제: 용접부 치수 검사 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비드폭 측정\n2. 덧살높이\n3. 필릿 다리길이\n4. 용입깊이\n5. 측정 도구\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '용접게이지 사용법을 설명하시오.', answer: '필릿게이지, 언더컷게이지, 각도게이지', prompt: '용접기사 용접검사 문제입니다.\n\n문제: 용접게이지 사용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 필릿게이지\n2. 언더컷게이지\n3. 각도게이지\n4. 높이게이지\n5. 사용시 주의점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'rt',
    name: '방사선투과검사(RT)',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '방사선투과검사(RT)의 원리를 설명하시오.', answer: 'X선/γ선 투과, 결함부 농도차로 판별', prompt: '용접기사 용접검사 문제입니다.\n\n문제: 방사선투과검사(RT)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방사선 특성\n2. 투과 원리\n3. 필름 상형성\n4. 결함 검출\n5. X선 vs γ선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'RT 필름의 농도와 상질 조건을 설명하시오.', answer: '농도 1.8~4.0, IQI 식별 필요', prompt: '용접기사 용접검사 문제입니다.\n\n문제: RT 필름의 농도와 상질 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 필름농도 정의\n2. 적정 농도 범위\n3. IQI(투과도계)\n4. 상질 판정\n5. 불감도 측정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'RT 검사로 검출 가능한 결함을 설명하시오.', answer: '기공, 슬래그, 용입불량, 균열', prompt: '용접기사 용접검사 문제입니다.\n\n문제: RT 검사로 검출 가능한 결함을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기공 (둥근 상)\n2. 슬래그 (불규칙)\n3. 용입불량 (선상)\n4. 균열\n5. 검출 한계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'RT 검사 시 안전관리 사항을 설명하시오.', answer: '피폭선량 관리, 관리구역, 필름배지', prompt: '용접기사 용접검사 문제입니다.\n\n문제: RT 검사 시 안전관리 사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방사선 피폭 위험\n2. 관리구역 설정\n3. 개인선량계\n4. 차폐\n5. 법적 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'RT 필름 판독 방법을 설명하시오.', answer: '결함 종류/크기/위치 기록, 합부 판정', prompt: '용접기사 용접검사 문제입니다.\n\n문제: RT 필름 판독 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관찰 조건\n2. 결함 종류 식별\n3. 크기 측정\n4. 위치 기록\n5. 합격/불합격 판정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'ut',
    name: '초음파탐상검사(UT)',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '초음파탐상검사(UT)의 원리를 설명하시오.', answer: '초음파 반사 원리, 결함에서 에코 발생', prompt: '용접기사 용접검사 문제입니다.\n\n문제: 초음파탐상검사(UT)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초음파 특성\n2. 반사/굴절 원리\n3. 펄스에코법\n4. 결함에코\n5. 장단점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'UT 탐촉자 종류와 특성을 설명하시오.', answer: '수직탐촉자, 사각탐촉자, 이중탐촉자', prompt: '용접기사 용접검사 문제입니다.\n\n문제: UT 탐촉자 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수직탐촉자\n2. 사각탐촉자 (45°, 60°, 70°)\n3. 이중탐촉자\n4. 집속탐촉자\n5. 선정 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'UT DAC 곡선을 설명하시오.', answer: '거리-진폭 보정곡선, 감도 설정용', prompt: '용접기사 용접검사 문제입니다.\n\n문제: UT DAC 곡선을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. DAC 정의\n2. 거리감쇠 보정\n3. 기준반사체\n4. 곡선 작성법\n5. 감도 설정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'UT와 RT의 장단점을 비교하시오.', answer: 'UT: 면상결함 유리, RT: 체적결함 유리', prompt: '용접기사 용접검사 문제입니다.\n\n문제: UT와 RT의 장단점을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. UT 장점\n2. UT 단점\n3. RT 장점\n4. RT 단점\n5. 선정 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'UT 결함평가 방법을 설명하시오.', answer: '에코높이, 지시길이, 에코패턴', prompt: '용접기사 용접검사 문제입니다.\n\n문제: UT 결함평가 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 에코높이 측정\n2. 지시길이 측정\n3. 에코패턴 분석\n4. 결함 분류\n5. 합부 판정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'mt-pt',
    name: '자분/침투탐상검사',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '자분탐상검사(MT)의 원리를 설명하시오.', answer: '자화 후 자분 도포, 누설자장에 자분 부착', prompt: '용접기사 용접검사 문제입니다.\n\n문제: 자분탐상검사(MT)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자화 원리\n2. 누설자장\n3. 자분 부착\n4. 건식/습식\n5. 적용 재료\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'MT 자화방법의 종류를 설명하시오.', answer: '축통전법, 코일법, 극간법, 프로드법', prompt: '용접기사 용접검사 문제입니다.\n\n문제: MT 자화방법의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 축통전법\n2. 코일법\n3. 극간법(요크법)\n4. 프로드법\n5. 선정 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '침투탐상검사(PT)의 원리를 설명하시오.', answer: '모세관 현상으로 침투액 침투, 현상제로 지시', prompt: '용접기사 용접검사 문제입니다.\n\n문제: 침투탐상검사(PT)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 모세관 현상\n2. 침투액 적용\n3. 세척\n4. 현상제 도포\n5. 지시 관찰\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'PT 침투액 종류와 특성을 설명하시오.', answer: '수세성, 후유화성, 용제제거성', prompt: '용접기사 용접검사 문제입니다.\n\n문제: PT 침투액 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수세성 침투액\n2. 후유화성 침투액\n3. 용제제거성 침투액\n4. 형광/비형광\n5. 선정 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'MT와 PT의 적용 범위를 비교하시오.', answer: 'MT: 자성체만, PT: 비자성체 포함', prompt: '용접기사 용접검사 문제입니다.\n\n문제: MT와 PT의 적용 범위를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. MT 적용 재료\n2. PT 적용 재료\n3. 감도 비교\n4. 결함 검출능\n5. 선정 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'mechanical',
    name: '기계적 시험',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '용접부 인장시험 방법을 설명하시오.', answer: '모재/용접금속/이음 인장강도 측정', prompt: '용접기사 용접검사 문제입니다.\n\n문제: 용접부 인장시험 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시험편 채취\n2. 시험 방법\n3. 인장강도 계산\n4. 파단 위치\n5. 합격 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '굽힘시험의 종류와 목적을 설명하시오.', answer: '표면굽힘, 이면굽힘, 측면굽힘', prompt: '용접기사 용접검사 문제입니다.\n\n문제: 굽힘시험의 종류와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표면굽힘(Face)\n2. 이면굽힘(Root)\n3. 측면굽힘(Side)\n4. 굽힘각도\n5. 합격 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '샤르피 충격시험 방법을 설명하시오.', answer: 'V노치 시험편, 충격흡수에너지 측정', prompt: '용접기사 용접검사 문제입니다.\n\n문제: 샤르피 충격시험 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. V노치 시험편\n2. 시험 온도\n3. 충격흡수에너지\n4. 천이온도\n5. 합격 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '용접부 경도시험 방법을 설명하시오.', answer: '비커스, 로크웰, HAZ 경도 분포', prompt: '용접기사 용접검사 문제입니다.\n\n문제: 용접부 경도시험 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비커스 경도\n2. 로크웰 경도\n3. 측정 위치\n4. HAZ 경도 분포\n5. 허용 경도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '매크로/마이크로 시험을 설명하시오.', answer: '단면 조직 관찰, 결함/조직 확인', prompt: '용접기사 용접검사 문제입니다.\n\n문제: 매크로/마이크로 시험을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매크로 시험\n2. 마이크로 시험\n3. 시편 준비\n4. 에칭\n5. 관찰 항목\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function WeldingInspectionStudyPage() {
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const [activeQuestionId, setActiveQuestionId] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  const activeTopic = topics.find(t => t.id === activeTopicId)!;
  const activeQuestion = activeTopic.questions.find(q => q.id === activeQuestionId)!;

  useEffect(() => {
    const saved = localStorage.getItem('welding-inspection-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const markComplete = () => {
    const key = `${activeTopicId}-${activeQuestionId}`;
    const newCompleted = new Set(completedQuestions);
    newCompleted.add(key);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('welding-inspection-completed', JSON.stringify([...newCompleted]));
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
            <span className="text-red-600 font-medium">용접검사</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔍</span>
            <h1 className="text-2xl font-bold text-gray-800">용접검사 학습하기</h1>
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
