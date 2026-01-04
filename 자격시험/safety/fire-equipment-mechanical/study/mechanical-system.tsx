'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'sprinkler',
    name: '스프링클러설비',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '스프링클러설비의 구성요소를 설명하시오.', answer: '수원, 가압송수장치, 배관, 헤드, 유수검지장치, 제어밸브, 부속품', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 스프링클러설비의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수원의 종류와 기준\n2. 가압송수장치\n3. 배관 구성\n4. 헤드 종류\n5. 유수검지장치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '스프링클러 헤드의 종류와 특성을 설명하시오.', answer: '폐쇄형(감열체), 개방형(일제개방), 표준형(68°C), 고온형(79°C, 141°C)', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 스프링클러 헤드의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 폐쇄형 헤드\n2. 개방형 헤드\n3. 감열체 종류\n4. 표시온도\n5. 반응시간지수(RTI)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '습식·건식·준비작동식 스프링클러를 비교하시오.', answer: '습식(상시충수), 건식(압축공기), 준비작동식(화재감지기연동)', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 스프링클러 방식을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 습식 스프링클러\n2. 건식 스프링클러\n3. 준비작동식\n4. 일제살수식\n5. 적용 장소\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '유수검지장치의 구조와 작동원리를 설명하시오.', answer: '알람밸브, 리타딩챔버, 압력스위치, 플로스위치, 경보 발신', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 유수검지장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 습식 유수검지장치\n2. 건식 유수검지장치\n3. 알람밸브 작동\n4. 압력스위치\n5. 경보 발신 원리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '스프링클러설비의 수원 및 가압송수장치를 설명하시오.', answer: '수조(20분+1.6㎥), 펌프(전동기펌프+내연기관펌프), 고가수조(낙차)', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 스프링클러 수원 및 가압송수장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수원 용량 산정\n2. 펌프 방식\n3. 고가수조 방식\n4. 가압수조 방식\n5. 예비동력 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'hydrant',
    name: '옥내소화전설비',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '옥내소화전설비의 구성요소를 설명하시오.', answer: '수원, 가압송수장치, 배관, 소화전함(호스·관창·노즐), 기동장치', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥내소화전설비의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수원 용량\n2. 가압송수장치\n3. 소화전함 구성\n4. 호스 규격\n5. 노즐 방수압력\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '옥내소화전 방수량과 방수압력 기준을 설명하시오.', answer: '노즐방수량 130L/min, 방수압력 0.17MPa, 방수거리 15m', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥내소화전 방수 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 노즐방수량\n2. 방수압력\n3. 방수거리\n4. 호스 마찰손실\n5. 펌프 양정 산정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '옥내소화전 펌프의 성능시험 기준을 설명하시오.', answer: '정격점 100%, 체절양정 140~170%, 150%점 양정 65%이상', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥내소화전 펌프 성능시험을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 체절운전 기준\n2. 정격점 확인\n3. 150%점 양정\n4. 성능곡선 작성\n5. 합격 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '옥내소화전 배관의 설계 기준을 설명하시오.', answer: '급수관 구경 산정, 주배관 루프형, 수직배관 관경 유지', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥내소화전 배관 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배관 구경 산정\n2. 급수배관 방식\n3. 수직배관 기준\n4. 관경 유지 규정\n5. 압력손실 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '옥내소화전 호스와 관창의 규격을 설명하시오.', answer: '호스 구경 40mm(1.5인치) 또는 65mm(2.5인치), 길이 15m', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 옥내소화전 호스와 관창을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 호스 규격\n2. 호스 길이\n3. 관창 종류\n4. 노즐 구경\n5. 방수 형태\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'water-spray',
    name: '물분무소화설비',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '물분무소화설비의 소화원리를 설명하시오.', answer: '냉각소화(미세입자), 질식소화(수증기), 유화소화(유류화재)', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 물분무소화설비의 소화원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 냉각 효과\n2. 질식 효과\n3. 유화 효과\n4. 미세입자 형성\n5. 적용 화재\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '물분무헤드의 종류와 특성을 설명하시오.', answer: '개방형 헤드, 분무각 60°~120°, 방수압력 0.1~0.35MPa', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 물분무헤드를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 헤드 구조\n2. 분무각\n3. 방수압력\n4. 입자크기\n5. 배치 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '물분무설비의 방수밀도 기준을 설명하시오.', answer: '차고 10L/min·㎡, 전기설비 20L/min·㎡, 가연성액체 20L/min·㎡', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 물분무설비의 방수밀도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방수밀도 개념\n2. 방호대상별 기준\n3. 방호면적 산정\n4. 헤드 개수 계산\n5. 총 방수량\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '물분무소화설비의 일제개방밸브를 설명하시오.', answer: '화재감지기 연동, 전기식·기계식, 일제개방, 경보 발신', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 일제개방밸브를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작동 원리\n2. 전기식 밸브\n3. 기계식 밸브\n4. 화재감지기 연동\n5. 수동기동장치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '물분무설비의 수원 및 가압송수장치를 설명하시오.', answer: '수원 20분 방수량, 펌프 정격유량·전양정, 예비동력', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 물분무설비 수원 및 펌프를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수원 용량 산정\n2. 펌프 용량 계산\n3. 전양정 산정\n4. 예비동력 기준\n5. 성능시험\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'foam',
    name: '포소화설비',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '포소화약제의 종류와 소화원리를 설명하시오.', answer: '단백포·합성계면활성제포·수성막포 / 질식·냉각·피복', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 포소화약제의 종류와 소화원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단백포\n2. 합성계면활성제포\n3. 수성막포(AFFF)\n4. 소화 원리\n5. 적용 화재\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '포의 발포배수와 방출률을 설명하시오.', answer: '발포배수=포부피/약액부피, 저발포(20배 미만), 고발포(80배 이상)', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 포의 발포배수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발포배수 정의\n2. 저발포\n3. 고발포\n4. 방출률 계산\n5. 소화 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '포헤드 및 포방출구의 종류를 설명하시오.', answer: '고정포방출구, 포헤드, 포모니터, 포워터 스프링클러', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 포헤드 및 포방출구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고정포방출구\n2. 포헤드\n3. 포모니터\n4. 포워터 스프링클러\n5. 적용 장소\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '포소화설비의 혼합장치를 설명하시오.', answer: '프레셔 프로포셔너, 라인 프로포셔너, 프레셔 사이드 프로포셔너', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 포소화설비의 혼합장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프레셔 프로포셔너\n2. 라인 프로포셔너\n3. 프레셔 사이드 프로포셔너\n4. 혼합 원리\n5. 혼합비 조정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '포소화설비의 방출량 기준을 설명하시오.', answer: '탱크화재: 방호면적×방출률(분당 L/㎡), 주차장: 바닥면적 기준', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 포소화설비의 방출량 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위험물탱크\n2. 주차장\n3. 방출률\n4. 방출시간\n5. 약제량 산정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'evacuation-smoke',
    name: '피난/제연설비',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '피난기구의 종류와 적용 기준을 설명하시오.', answer: '미끄럼대, 피난사다리, 구조대, 완강기, 공기안전매트', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 피난기구의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미끄럼대\n2. 피난사다리\n3. 완강기\n4. 구조대\n5. 적용 층수\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '제연설비의 목적과 원리를 설명하시오.', answer: '연기 배출·차단, 피난로 확보, 급기·배기, 차압 형성', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 제연설비의 목적과 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제연의 목적\n2. 배연 원리\n3. 급기 원리\n4. 차압 형성\n5. 피난로 확보\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '제연설비의 배출량 및 풍속 기준을 설명하시오.', answer: '제연구역 바닥면적 1㎡당 1㎥/min 이상, 개구부 풍속 0.7m/s 이상', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 제연설비의 배출량 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배출량 산정\n2. 개구부 풍속\n3. 제연구역 기준\n4. 제연경계 설정\n5. 배연기 용량\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '특별피난계단과 부속실 제연을 설명하시오.', answer: '차압 40~50Pa, 급기량 산정, 과압방지장치', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 특별피난계단 제연을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 차압 기준\n2. 급기량 산정\n3. 과압방지장치\n4. 제연방식\n5. 성능시험\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '유도등 및 유도표지의 종류를 설명하시오.', answer: '피난구유도등, 통로유도등, 객석유도등, 유도표지', prompt: '소방설비기사(기계) 소방기계시설의 구조 및 원리 문제입니다.\n\n문제: 유도등의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피난구유도등\n2. 통로유도등\n3. 객석유도등\n4. 유도표지\n5. 설치 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function MechanicalSystemStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('fire-equipment-mechanical-system-completed');
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
    localStorage.setItem('fire-equipment-mechanical-system-completed', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety" className="text-gray-600 hover:text-orange-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety/fire-equipment-mechanical" className="text-gray-600 hover:text-orange-600">소방설비기사(기계)</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">소방기계시설의 구조 및 원리</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚙️</span>
            <h1 className="text-2xl font-bold text-gray-800">소방기계시설의 구조 및 원리 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">소방설비기사(기계) 필기시험 핵심 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-orange-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>
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
