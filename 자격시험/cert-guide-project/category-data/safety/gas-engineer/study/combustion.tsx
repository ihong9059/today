'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'combustion-theory',
    name: '연소이론',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '연소의 3요소와 연소범위를 설명하시오.', answer: '가연물(연료), 산소(공기), 점화원(착화에너지). 연소범위: 연소하한계~연소상한계', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 연소의 3요소와 연소범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연소의 3요소\n2. 연소 4면체 (산화반응 추가)\n3. 연소범위 정의\n4. 연소상한계/하한계\n5. 위험도 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '발열량(고위발열량, 저위발열량)을 설명하시오.', answer: '고위발열량: 수증기 응축열 포함, 저위발열량: 수증기 응축열 제외', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 발열량을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고위발열량(총발열량)\n2. 저위발열량(진발열량)\n3. 차이점 및 계산식\n4. 실제 사용 시 고려사항\n5. 가스별 발열량 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '연소속도와 화염전파속도를 설명하시오.', answer: '연소속도: 미연소 혼합기가 연소하는 속도, 화염전파속도: 화염면이 이동하는 속도', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 연소속도와 화염전파속도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연소속도 정의\n2. 화염전파속도 정의\n3. 영향 인자\n4. 측정 방법\n5. 실무 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '이론공기량과 과잉공기를 설명하시오.', answer: '이론공기량: 완전연소에 필요한 최소 공기량, 과잉공기: 이론공기량보다 많이 공급한 공기', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 이론공기량과 과잉공기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론공기량 계산\n2. 실제공기량\n3. 과잉공기율\n4. 공기비\n5. 최적 과잉공기율\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '단열화염온도를 설명하시오.', answer: '연소열이 모두 연소가스 온도 상승에만 사용될 때의 최고온도', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 단열화염온도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단열화염온도 정의\n2. 계산 방법\n3. 이론온도와 실제온도 차이\n4. 영향 인자\n5. 가스별 단열화염온도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'flame',
    name: '화염',
    color: 'from-orange-500 to-yellow-500',
    questions: [
      { id: 1, question: '예혼합화염과 확산화염을 비교하시오.', answer: '예혼합: 연료+공기 사전혼합 후 연소(분젠버너), 확산: 연료와 공기가 연소면에서 혼합(초불)', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 예혼합화염과 확산화염을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 예혼합화염 특징\n2. 확산화염 특징\n3. 화염 구조 비교\n4. 연소 효율 차이\n5. 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '역화(Back Fire)와 선화(Blow Off)를 설명하시오.', answer: '역화: 화염전파속도 > 분출속도로 화염이 버너 내부로 역류, 선화: 화염전파속도 < 분출속도로 화염이 날아감', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 역화와 선화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역화 발생 원인\n2. 선화 발생 원인\n3. 위험성\n4. 방지 대책\n5. 안전장치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '화염의 안정화 방법을 설명하시오.', answer: '버너구조 개선, 유속조정, 화염안정기(보염기) 설치, 재순환영역 형성', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 화염의 안정화 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화염 불안정 원인\n2. 버너 구조 개선\n3. 화염안정기 종류\n4. 재순환 영역 형성\n5. 실무 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '화염의 색깔과 연소 상태의 관계를 설명하시오.', answer: '청색: 완전연소, 황색: 불완전연소(그을음 발생), 적색: 저온연소', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 화염의 색깔과 연소 상태의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청색 화염 특성\n2. 황색 화염 원인\n3. 적색 화염 의미\n4. 공기비와 화염색 관계\n5. 진단 및 조치 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '층류화염과 난류화염을 비교하시오.', answer: '층류: 유체가 층류로 흐를 때 형성, 난류: 유체가 난류로 흐를 때 형성(더 빠른 연소)', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 층류화염과 난류화염을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 층류화염 특징\n2. 난류화염 특징\n3. 레이놀즈수 영향\n4. 연소효율 차이\n5. 산업용 버너 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'explosion',
    name: '폭발',
    color: 'from-yellow-500 to-red-600',
    questions: [
      { id: 1, question: '폭발의 종류(물리적 폭발, 화학적 폭발)를 설명하시오.', answer: '물리적: 압력용기 파열, 화학적: 급격한 산화반응(가스폭발, 분진폭발)', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 폭발의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 폭발 사례\n2. 화학적 폭발 메커니즘\n3. 가스폭발 특성\n4. 분진폭발 특성\n5. 예방 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '폭발범위와 폭발한계를 설명하시오.', answer: '폭발하한계(LEL): 최소 가연성 농도, 폭발상한계(UEL): 최대 가연성 농도', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 폭발범위와 폭발한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 폭발하한계(LEL) 정의\n2. 폭발상한계(UEL) 정의\n3. 온도/압력 영향\n4. 불활성가스 첨가 효과\n5. 가스별 폭발범위\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'BLEVE(Boiling Liquid Expanding Vapor Explosion)를 설명하시오.', answer: '액화가스 저장탱크 화재 시 압력 상승→파열→증기운 폭발', prompt: '가스기사 연소공학 문제입니다.\n\n문제: BLEVE를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. BLEVE 발생 메커니즘\n2. 발생 조건\n3. 위험성\n4. 예방 대책\n5. 사고 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '증기운 폭발(UVCE)을 설명하시오.', answer: '가연성 가스/증기 누출→공기와 혼합→점화원에 의한 폭발', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 증기운 폭발을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 증기운 형성 과정\n2. 폭발 메커니즘\n3. TNT 환산량\n4. 피해 범위 예측\n5. 방지 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '폭굉(Detonation)과 폭연(Deflagration)을 비교하시오.', answer: '폭굉: 음속 이상의 초음속 연소(충격파), 폭연: 음속 이하의 아음속 연소', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 폭굉과 폭연을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 폭굉 특성\n2. 폭연 특성\n3. 전파속도 차이\n4. 압력 상승 비교\n5. DDT(폭연→폭굉 전이)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'fire-extinguishing',
    name: '소화이론',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '소화의 원리(4가지)를 설명하시오.', answer: '냉각소화(열 제거), 질식소화(산소 차단), 제거소화(가연물 제거), 부촉매소화(연쇄반응 억제)', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 소화의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 냉각소화 메커니즘\n2. 질식소화 방법\n3. 제거소화 적용\n4. 부촉매소화 원리\n5. 화재 유형별 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '소화약제의 종류와 특성을 설명하시오.', answer: '물(냉각), 포(질식), 이산화탄소(질식), 할로겐화합물(부촉매), 분말(질식+부촉매)', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 소화약제의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물 소화약제\n2. 포 소화약제\n3. 이산화탄소 소화약제\n4. 할로겐화합물 소화약제\n5. 분말 소화약제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '불활성가스 소화설비를 설명하시오.', answer: 'CO2, N2, Ar 등으로 산소 농도를 낮춰 소화(15% 이하)', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 불활성가스 소화설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작동 원리\n2. 사용 가스 종류\n3. 소화 농도\n4. 적용 대상\n5. 안전 고려사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '화재의 분류(A, B, C, D급)를 설명하시오.', answer: 'A급: 일반화재(목재), B급: 유류화재, C급: 전기화재, D급: 금속화재', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 화재의 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. A급 화재 특성\n2. B급 화재 특성\n3. C급 화재 특성\n4. D급 화재 특성\n5. 각 화재별 적합 소화약제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '할론 소화약제의 문제점과 대체물질을 설명하시오.', answer: '오존층 파괴→HFC, FK-5-1-12, 불활성가스로 대체', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 할론 소화약제의 문제점과 대체물질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 할론의 오존층 파괴\n2. 몬트리올 의정서\n3. HFC 대체물질\n4. FK-5-1-12 특성\n5. 청정소화약제 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'gas-properties',
    name: '가스의 물성',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '이상기체 법칙과 실제기체를 설명하시오.', answer: 'PV=nRT (이상기체), 반데르발스 방정식 (실제기체, 분자간력·체적 고려)', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 이상기체 법칙과 실제기체를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이상기체 법칙 (PV=nRT)\n2. 실제기체 거동\n3. 반데르발스 방정식\n4. 압축인자(Z)\n5. 임계점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '가스의 비중과 밀도를 설명하시오.', answer: '비중: 공기 대비 상대밀도(공기=1), 밀도: 단위부피당 질량(kg/m³)', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 가스의 비중과 밀도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비중 정의 및 계산\n2. 밀도 정의 및 계산\n3. 온도·압력 영향\n4. 주요 가스의 비중\n5. 실무 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '가스의 확산과 분출을 설명하시오.', answer: '확산: 농도차에 의한 이동(Fick 법칙), 분출: 압력차에 의한 유출', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 가스의 확산과 분출을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Fick의 확산 법칙\n2. 그레이엄의 법칙\n3. 분출 유량 계산\n4. 노즐 분출\n5. 안전 거리 산정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '액화가스의 증발과 비등을 설명하시오.', answer: '증발: 액면에서 기화, 비등: 내부에서 기포 발생하며 기화(비등점)', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 액화가스의 증발과 비등을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 증발 메커니즘\n2. 비등 메커니즘\n3. 증발잠열\n4. 비등점과 압력 관계\n5. 롤오버 현상\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '가스의 점도와 유동특성을 설명하시오.', answer: '점도: 유동 저항, 레이놀즈수: 층류/난류 판별(Re=ρvD/μ)', prompt: '가스기사 연소공학 문제입니다.\n\n문제: 가스의 점도와 유동특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 점도 정의\n2. 동점도\n3. 레이놀즈수\n4. 층류와 난류\n5. 압력손실 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function CombustionStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('gas-engineer-combustion-progress');
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
    localStorage.setItem('gas-engineer-combustion-progress', JSON.stringify(arr));
  };

  const getCompletedCount = (topicId: string) => {
    return Object.keys(completedQuestions).filter(key => key.startsWith(topicId) && completedQuestions[key]).length;
  };

  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-red-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety" className="text-gray-600 hover:text-red-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety/gas-engineer" className="text-gray-600 hover:text-red-600">가스기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">연소공학</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔥</span>
            <h1 className="text-2xl font-bold text-gray-800">연소공학 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">가스기사 필기시험 핵심 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-red-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm opacity-80">({getCompletedCount(topic.id)}/{topic.questions.length})</span>
                </div>
                <span className="text-xl">{expandedTopics[topic.id] ? '▲' : '▼'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {topic.questions.map((q) => {
                    const key = `${topic.id}-${q.id}`;
                    const isCompleted = completedQuestions[key];
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {isCompleted ? '✓' : q.id}
                          </span>
                          <p className="flex-1 text-gray-800 font-medium">{q.question}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                        <div className="flex gap-2 flex-wrap">
                          <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">
                            🧡 Claude
                          </a>
                          <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            💚 ChatGPT
                          </a>
                          <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                            💙 Gemini
                          </a>
                          <button onClick={() => toggleComplete(topic.id, q.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-red-500 text-white hover:bg-red-600'}`}>
                            {isCompleted ? '완료 취소' : '✓ 완료'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
