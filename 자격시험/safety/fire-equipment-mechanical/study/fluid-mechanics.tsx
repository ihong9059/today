'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'hydrostatics',
    name: '유체정역학',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '압력의 정의와 단위 환산을 설명하시오.', answer: 'P=F/A, 1bar=10⁵Pa, 1kgf/cm²=98.07kPa=0.9807bar', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 압력의 정의와 단위 환산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압력의 정의\n2. 압력 단위(Pa, bar, kgf/cm²)\n3. 단위 환산\n4. 게이지압과 절대압\n5. 소방설비 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '파스칼의 원리를 설명하시오.', answer: '밀폐된 유체의 한 점에 가한 압력은 모든 방향으로 같은 크기로 전달', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 파스칼의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 파스칼의 원리 정의\n2. 압력 전달 특성\n3. 유압장치 응용\n4. 소방설비 적용 예\n5. 계산 예제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '정지 유체 내 압력 분포를 설명하시오.', answer: 'P=ρgh, 수심이 깊을수록 압력 증가, 같은 수평면은 동일 압력', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 정지 유체 내 압력 분포를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정수압 공식\n2. 수심과 압력 관계\n3. 수평면 압력\n4. 연결관 원리\n5. 수조/탱크 설계 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '부력과 아르키메데스 원리를 설명하시오.', answer: '부력=배제한 유체의 무게, FB=ρgV', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 부력과 아르키메데스 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 아르키메데스 원리\n2. 부력 계산식\n3. 부유/침강 조건\n4. 비중과의 관계\n5. 소방설비 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '마노미터(압력계)의 원리를 설명하시오.', answer: 'U자관, 경사관, 차압계 등 / P=ρgh 이용', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 마노미터의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. U자관 마노미터\n2. 경사관 마노미터\n3. 차압계\n4. 압력 측정 원리\n5. 측정 계산 예제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'hydrodynamics',
    name: '유체동역학',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '연속방정식을 설명하시오.', answer: 'A₁V₁=A₂V₂, 질량보존법칙, 단면적↓→속도↑', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 연속방정식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연속방정식 유도\n2. 질량보존법칙\n3. 단면적과 유속 관계\n4. 배관 축소/확대 적용\n5. 계산 예제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '베르누이 방정식을 설명하시오.', answer: 'P/ρg + V²/2g + Z = 일정, 에너지보존법칙', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 베르누이 방정식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 베르누이 방정식\n2. 압력수두, 속도수두, 위치수두\n3. 에너지보존법칙\n4. 적용 조건과 제한\n5. 소방배관 설계 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '레이놀즈 수와 유동 형태를 설명하시오.', answer: 'Re=ρVD/μ, Re<2300 층류, Re>4000 난류', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 레이놀즈 수와 유동 형태를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 레이놀즈 수 정의\n2. 층류와 난류 구분\n3. 천이영역\n4. 점성의 영향\n5. 배관 설계 고려사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '오리피스와 벤투리미터를 설명하시오.', answer: '유량측정장치, Q=CA√(2gΔh), 오리피스 간단/손실大, 벤투리 정확/손실小', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 오리피스와 벤투리미터를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 오리피스 원리\n2. 벤투리미터 원리\n3. 유량 계산식\n4. 장단점 비교\n5. 소방설비 유량측정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '토리첼리 정리를 설명하시오.', answer: '방출속도 V=√(2gh), 수조 바닥 작은 구멍에서 물 방출', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 토리첼리 정리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 토리첼리 정리 내용\n2. 방출속도 공식\n3. 유량 계산\n4. 방출시간 계산\n5. 소방수조 설계 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'pipe-flow',
    name: '배관유동',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '마찰손실수두를 설명하시오.', answer: 'Darcy-Weisbach: hf=f(L/D)(V²/2g), Hazen-Williams: hf=10.67Q^1.85/C^1.85D^4.87×L', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 마찰손실수두를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Darcy-Weisbach 공식\n2. Hazen-Williams 공식\n3. 마찰계수\n4. 관경/유량/손실 관계\n5. 소방배관 손실 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '형상손실(국부손실)을 설명하시오.', answer: '엘보, 밸브, 축소/확대 등에서 손실, hL=K(V²/2g)', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 형상손실을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 형상손실 정의\n2. 손실계수 K값\n3. 주요 관부속품 손실\n4. 등가관길이 개념\n5. 배관 설계 고려사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '배관의 직렬 및 병렬연결을 설명하시오.', answer: '직렬: Q동일, h합산 / 병렬: h동일, Q합산', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 배관의 직렬 및 병렬연결을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직렬연결 특성\n2. 병렬연결 특성\n3. 유량 분배\n4. 손실수두 계산\n5. 소방배관망 설계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '관망해석(Hardy-Cross법)을 설명하시오.', answer: '반복계산법, ΣhL=0(루프), ΣQ=0(절점)', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 관망해석 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Hardy-Cross법 원리\n2. 루프방정식\n3. 절점방정식\n4. 반복계산 절차\n5. 스프링클러 배관망 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '수격현상(워터해머)을 설명하시오.', answer: '급폐쇄 시 압력상승, Δp=ρcV, c=음속, 배관파손위험', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 수격현상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수격현상 발생원인\n2. 압력상승 계산\n3. 파동속도\n4. 배관 손상 위험\n5. 방지대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'pump-theory',
    name: '펌프이론',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '펌프의 종류와 특성을 설명하시오.', answer: '원심펌프(대유량 저양정), 터빈펌프(고양정), 용적형펌프(정량토출)', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 펌프의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원심펌프\n2. 터빈펌프\n3. 용적형펌프\n4. 각 펌프 특성비교\n5. 소방설비 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '펌프의 양정과 동력을 설명하시오.', answer: 'H=전양정(흡입+토출양정+손실), L=ρgQH/η', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 펌프의 양정과 동력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전양정 개념\n2. 실양정과 손실양정\n3. 펌프 동력 계산\n4. 펌프 효율\n5. 펌프 선정 계산\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '펌프의 성능곡선을 설명하시오.', answer: 'Q-H곡선, 효율곡선, 동력곡선, 운전점=시스템곡선 교점', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 펌프의 성능곡선을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Q-H 곡선\n2. 효율 곡선\n3. 동력 곡선\n4. 운전점 결정\n5. 최적 운전영역\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '캐비테이션을 설명하시오.', answer: '흡입측 압력저하→증기포 발생→파손, NPSH>NPSHr 필요', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 캐비테이션을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 캐비테이션 발생원리\n2. NPSH 개념\n3. 캐비테이션 영향\n4. 발생 조건\n5. 방지 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '펌프의 직렬 및 병렬운전을 설명하시오.', answer: '직렬: 양정증가, 병렬: 유량증가', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 펌프의 직렬 및 병렬운전을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직렬운전 특성\n2. 병렬운전 특성\n3. 합성성능곡선\n4. 적용 사례\n5. 소방펌프 설계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'hydraulic-calc',
    name: '수리계산',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '스프링클러 수리계산 방법을 설명하시오.', answer: 'K=Q/√P, 최원단 헤드→급수관, 배관마찰손실 합산', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 스프링클러 수리계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. K계수(방수량계수)\n2. 최원단 헤드 압력\n3. 배관 손실계산\n4. 급수배관 압력\n5. 펌프 양정 결정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '옥내소화전 수리계산을 설명하시오.', answer: '130L/min 노즐방수량, 0.17MPa 노즐압력, 배관손실+낙차+노즐압', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 옥내소화전 수리계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방수량 기준\n2. 노즐압력\n3. 호스 마찰손실\n4. 배관 손실\n5. 펌프 양정 산정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '물분무 방수밀도 계산을 설명하시오.', answer: '방수밀도 L/min·㎡, 방호면적×방수밀도=총유량', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 물분무 방수밀도 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방수밀도 기준\n2. 방호면적 산정\n3. 헤드 개수 결정\n4. 총 방수량 계산\n5. 배관 설계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '소방펌프 성능시험 방법을 설명하시오.', answer: '정격점 150%, 140%, 100%(정격), 체절운전, 성능곡선 작성', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 소방펌프 성능시험 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시험 조건\n2. 체절양정 측정\n3. 정격점 확인\n4. 150% 점 확인\n5. 성능곡선 검증\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '급수배관 구경 결정 방법을 설명하시오.', answer: '유속법(V<4m/s), 손실수두법(hf<10%), 등가관길이', prompt: '소방설비기사(기계) 소방유체역학 문제입니다.\n\n문제: 급수배관 구경 결정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유속 제한\n2. 손실수두 제한\n3. 경제관경\n4. 등가관길이\n5. 배관 선정 절차\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function FluidMechanicsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('fire-equipment-fluid-mechanics-completed');
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
    localStorage.setItem('fire-equipment-fluid-mechanics-completed', JSON.stringify(arr));
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
            <span className="text-orange-600 font-medium">소방유체역학</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">💧</span>
            <h1 className="text-2xl font-bold text-gray-800">소방유체역학 학습하기</h1>
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
