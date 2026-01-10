'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'combustion-theory',
    name: '연소 이론',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '연소의 3요소를 설명하시오.', answer: '가연물(Fuel), 산소공급원(Oxygen), 점화원(Ignition Source)', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 연소의 3요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가연물의 종류와 특성\n2. 산소공급원 (공기 중 21%)\n3. 점화원의 형태\n4. 연소의 4요소 (연쇄반응 포함)\n5. 소화 원리와 연결\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '완전연소와 불완전연소의 차이를 설명하시오.', answer: '완전연소: CO₂+H₂O 생성, 불완전연소: CO+C(그을음) 생성', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 완전연소와 불완전연소의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 완전연소 조건\n2. 불완전연소 원인\n3. 생성물질 비교\n4. 발열량 차이\n5. 안전상 문제점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '이론공기량과 과잉공기를 설명하시오.', answer: '이론공기량: 완전연소에 필요한 최소 공기량, 과잉공기: 안전계수 고려 추가 공급량', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 이론공기량과 과잉공기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론공기량 계산법\n2. 과잉공기계수\n3. 공기비 개념\n4. 실제공기량 계산\n5. 과잉공기의 영향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '발열량의 종류를 설명하시오.', answer: '고위발열량(총발열량): 수증기 응축열 포함, 저위발열량(진발열량): 응축열 제외', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 발열량의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고위발열량 정의\n2. 저위발열량 정의\n3. 계산 방법\n4. 응용 분야\n5. 가스별 발열량\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '연소속도에 영향을 주는 요인을 설명하시오.', answer: '온도, 압력, 농도, 난류 정도, 촉매', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 연소속도에 영향을 주는 요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온도의 영향\n2. 압력의 영향\n3. 농도의 영향\n4. 난류와 층류\n5. 촉매의 역할\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'flame-characteristics',
    name: '화염 특성',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '예혼합화염과 확산화염의 차이를 설명하시오.', answer: '예혼합: 가스+공기 사전혼합(분젠버너), 확산: 연소 중 혼합(촛불)', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 예혼합화염과 확산화염의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예혼합화염 특징\n2. 확산화염 특징\n3. 화염 구조 차이\n4. 연소속도 비교\n5. 응용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '역화(Back Fire)와 선화(Blow Off) 현象을 설명하시오.', answer: '역화: 화염속도>가스속도, 선화: 화염속도<가스속도', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 역화와 선화 현상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역화 발생 조건\n2. 선화 발생 조건\n3. 예방 대책\n4. 화염 안정화 방법\n5. 버너 설계 시 고려사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '화염의 색깔과 온도 관계를 설명하시오.', answer: '적색(저온) → 황색 → 백색 → 청백색(고온)', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 화염의 색깔과 온도 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온도별 화염 색상\n2. 흑체복사 원리\n3. 불완전연소 시 색상\n4. 금속염의 불꽃색\n5. 화염온도 측정법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '화염전파속도와 연소속도를 구분하시오.', answer: '화염전파속도: 관찰자 기준, 연소속도: 화염면 기준', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 화염전파속도와 연소속도를 구분하시오.\n\n다음 순서로 설명해주세요:\n1. 화염전파속도 정의\n2. 연소속도 정의\n3. 관계식\n4. 측정 방법\n5. 실용적 의미\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '층류화염과 난류화염의 특징을 설명하시오.', answer: '층류: 매끄러운 화염면, 난류: 불규칙한 화염면, 연소속도 증가', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 층류화염과 난류화염의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 층류화염 특성\n2. 난류화염 특성\n3. 레이놀즈수 영향\n4. 연소효율 차이\n5. 산업용 버너 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'explosion-phenomenon',
    name: '폭발 현상',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '폭발한계(연소범위)를 설명하시오.', answer: '하한계(LEL): 최소 가연농도, 상한계(UEL): 최대 가연농도', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 폭발한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 폭발하한계 개념\n2. 폭발상한계 개념\n3. 주요 가스별 폭발한계\n4. 온도·압력의 영향\n5. 안전관리 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '폭굉(Detonation)과 폭연(Deflagration)의 차이를 설명하시오.', answer: '폭굉: 초음속 연소(충격파), 폭연: 아음속 연소', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 폭굉과 폭연의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 폭연 특성\n2. 폭굉 특성\n3. 전파속도 비교\n4. 압력 상승 비교\n5. 방호 대책 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'BLEVE(Boiling Liquid Expanding Vapor Explosion)를 설명하시오.', answer: '액화가스 저장탱크 외부 화재 시 급격한 비등팽창 폭발', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: BLEVE를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. BLEVE 발생 메커니즘\n2. 발생 조건\n3. 위험성\n4. 예방 대책\n5. 대표 사고 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '분진폭발의 조건과 예방법을 설명하시오.', answer: '조건: 가연성분진+공기+점화원+밀폐공간+적정농도, 예방: 환기·제진·불꽃방지', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 분진폭발의 조건과 예방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분진폭발 5요소\n2. 폭발 위험 분진 종류\n3. 분진농도 관리\n4. 점화원 제거\n5. 폭발 억제 장치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '증기운폭발(VCE, Vapor Cloud Explosion)을 설명하시오.', answer: '대량 가스 누출 → 증기운 형성 → 지연점화 → 대규모 폭발', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 증기운폭발을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. VCE 발생 과정\n2. 필요 조건\n3. 피해 범위\n4. 예방 대책\n5. 사고 사례 분석\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'gas-properties',
    name: '가스 물성',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '비중(공기=1 기준)과 가스의 거동을 설명하시오.', answer: '비중<1: 상승(메탄, 수소), 비중>1: 하강(LPG, CO₂)', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 가스 비중과 거동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비중 계산법\n2. 주요 가스별 비중\n3. 비중에 따른 거동\n4. 환기설비 설계\n5. 검지기 설치 위치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '액화가스와 압축가스의 차이를 설명하시오.', answer: '액화가스: 상온에서 압력으로 액화, 압축가스: 고압 압축 상태', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 액화가스와 압축가스의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 액화가스 특성 (LPG, 암모니아)\n2. 압축가스 특성 (수소, 산소)\n3. 임계온도 개념\n4. 저장 방법 차이\n5. 안전관리 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '증기압과 끓는점의 관계를 설명하시오.', answer: '증기압=대기압일 때 끓는점, 온도 상승 시 증기압 증가', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 증기압과 끓는점의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 증기압 정의\n2. 끓는점 정의\n3. Clausius-Clapeyron 식\n4. 압력에 따른 끓는점 변화\n5. 액화가스 저장탱크 압력\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '독성가스와 가연성가스를 구분하시오.', answer: '독성: CO, H₂S, NH₃, 가연성: CH₄, C₃H₈, H₂', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 독성가스와 가연성가스를 구분하시오.\n\n다음 순서로 설명해주세요:\n1. 독성가스 종류와 TLV\n2. 가연성가스 종류와 폭발한계\n3. 양쪽 특성 모두 가진 가스\n4. 검지 및 경보\n5. 누출 시 대응 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '도시가스(LNG)와 LPG의 차이를 설명하시오.', answer: 'LNG: 메탄(CH₄) 주성분, -162℃ 액화, 비중 0.6 / LPG: 프로판·부탄, 상온 액화, 비중 1.5~2.0', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: LNG와 LPG의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성분 차이\n2. 액화 조건 차이\n3. 비중 및 거동 차이\n4. 공급 방식 차이\n5. 발열량 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'fire-extinguishing',
    name: '소화 원리',
    color: 'from-yellow-500 to-amber-500',
    questions: [
      { id: 1, question: '소화의 3원리를 설명하시오.', answer: '냉각소화(제거), 질식소화(산소), 제거소화(가연물), 억제소화(연쇄반응)', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 소화의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 냉각소화 (물)\n2. 질식소화 (CO₂, 질소)\n3. 제거소화 (밸브차단)\n4. 억제소화 (할론, 분말)\n5. 화재유형별 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '가스화재 시 소화 방법을 설명하시오.', answer: '1순위: 밸브 차단(공급 중단), 2순위: 냉각(주수), 3순위: 질식(불활성가스)', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 가스화재 시 소화 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공급 차단 방법\n2. 냉각 소화 적용\n3. 질식 소화 적용\n4. 잔화 처리\n5. 재착화 방지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '불활성가스에 의한 소화를 설명하시오.', answer: 'CO₂, N₂, Ar 등으로 산소농도를 15% 이하로 저하', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 불활성가스 소화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불활성가스 종류\n2. 소화 메커니즘\n3. 필요 농도\n4. 적용 장소\n5. 질식 위험성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '할로겐화합물 소화약제를 설명하시오.', answer: 'Halon 1301(CF₃Br), Halon 1211: 연쇄반응 억제, 오존층 파괴로 사용 제한', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 할로겐화합물 소화약제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 할론 종류와 화학식\n2. 소화 메커니즘\n3. 장단점\n4. 환경 문제\n5. 대체 약제 (HFC, FK)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '분말소화약제의 종류와 특성을 설명하시오.', answer: '제1종(탄산수소나트륨): BC급, 제2종(탄산수소칼륨): BC급 고효율, 제3종(인산암모늄): ABC급', prompt: '가스산업기사 연소공학 문제입니다.\n\n문제: 분말소화약제의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제1종 분말 특성\n2. 제2종 분말 특성\n3. 제3종 분말 특성\n4. 소화 메커니즘\n5. 적응 화재 유형\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function CombustionStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('gas-technician-combustion-progress');
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
    localStorage.setItem('gas-technician-combustion-progress', JSON.stringify(arr));
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
            <Link href="/category/safety/gas-technician" className="text-gray-600 hover:text-red-600">가스산업기사</Link>
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
          <p className="text-gray-600 mb-4">가스산업기사 필기시험 핵심 과목</p>
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
