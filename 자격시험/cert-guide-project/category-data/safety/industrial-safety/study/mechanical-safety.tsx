'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'machine-guard',
    name: '기계설비 방호장치',
    color: 'from-gray-500 to-slate-600',
    questions: [
      { id: 1, question: '방호장치의 종류와 특성을 설명하시오.', answer: '고정식, 조절식, 연동식, 자동식, 격리식, 트립식', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 방호장치의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고정식 방호장치\n2. 조절식 방호장치\n3. 연동식 방호장치\n4. 자동식 방호장치\n5. 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '프레스의 방호장치를 설명하시오.', answer: '양수조작식, 게이트가드식, 손쳐내기식, 수인식, 광전자식', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 프레스의 방호장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 양수조작식 구조\n2. 게이트가드식 원리\n3. 손쳐내기식/수인식\n4. 광전자식 특성\n5. 선정 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '연삭기의 방호장치를 설명하시오.', answer: '덮개(Hood), 조정편, 작업받침대, 측면덮개, 투명덮개', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 연삭기의 방호장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 덮개 각도 기준\n2. 조정편 간격\n3. 작업받침대 간격\n4. 연삭숫돌 검사\n5. 안전작업 수칙\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '목재가공용 기계의 방호장치를 설명하시오.', answer: '날 접촉예방장치, 반발예방장치, 분할날, 안내판', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 목재가공용 기계의 방호장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 둥근톱 방호장치\n2. 대패기계 방호장치\n3. 반발예방장치\n4. 분할날 역할\n5. 안전작업 수칙\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '안전거리의 산정 방법을 설명하시오.', answer: 'Ds = 1.6 × (Ts + Tc), Ds: 안전거리, Ts: 정지시간, Tc: 감지시간', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 안전거리의 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전거리 개념\n2. 계산 공식\n3. 정지시간 구성\n4. 신체부위별 거리\n5. 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'conveyor',
    name: '운반기계 안전',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '컨베이어의 안전장치를 설명하시오.', answer: '비상정지장치, 이탈방지장치, 낙하방지장치, 역주행방지장치', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 컨베이어의 안전장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비상정지장치 종류\n2. 이탈방지장치\n3. 낙하방지장치\n4. 역주행방지장치\n5. 통로/덮개 설치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '지게차(포크리프트) 안전수칙을 설명하시오.', answer: '허용하중 준수, 전방시야 확보, 경사로 주행방법, 주차 시 조치', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 지게차 안전수칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허용하중 확인\n2. 전방시야 확보\n3. 경사로 주행 방법\n4. 주차 시 조치사항\n5. 작업계획서 작성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '크레인의 방호장치를 설명하시오.', answer: '과부하방지장치, 권과방지장치, 비상정지장치, 제한스위치', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 크레인의 방호장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과부하방지장치\n2. 권과방지장치\n3. 비상정지장치\n4. 제한스위치 종류\n5. 정기검사 항목\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '와이어로프의 사용금지 기준을 설명하시오.', answer: '꼬임 끊어진 것, 직경 감소 7% 초과, 킹크, 심하게 변형된 것', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 와이어로프 사용금지 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 끊어진 소선 기준\n2. 직경 감소 기준\n3. 킹크 발생\n4. 부식/마모 상태\n5. 점검 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '리프트(승강기)의 안전장치를 설명하시오.', answer: '과부하방지장치, 추락방지장치, 비상정지장치, 출입문 연동장치', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 리프트의 안전장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과부하방지장치\n2. 추락방지장치\n3. 비상정지장치\n4. 출입문 연동장치\n5. 정기검사 항목\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'pressure-vessel',
    name: '압력용기 안전',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '보일러의 안전장치를 설명하시오.', answer: '안전밸브, 압력계, 수면계, 자동제어장치, 화염검출기', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 보일러의 안전장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전밸브 설정\n2. 압력계 설치 기준\n3. 수면계 종류\n4. 자동제어장치\n5. 정기검사 항목\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '압력용기의 안전밸브 설정압력을 설명하시오.', answer: '최고사용압력 이하로 설정, 2개 이상 시 최고사용압력의 1.05배 이하', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 안전밸브 설정압력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설정압력 기준\n2. 복수 설치 시 기준\n3. 분출량 계산\n4. 취급 시 주의사항\n5. 점검 주기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '공기압축기의 안전장치를 설명하시오.', answer: '안전밸브, 압력계, 압력방출장치, 오일분리기, 드레인장치', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 공기압축기의 안전장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전밸브 설정\n2. 압력방출장치\n3. 오일분리기\n4. 드레인 관리\n5. 폭발 예방대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '아세틸렌 용접장치의 안전수칙을 설명하시오.', answer: '역화방지기 설치, 사용압력 제한(게이지 1.3kgf/㎠ 이하), 동합금 사용금지', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 아세틸렌 용접장치의 안전수칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역화방지기 설치\n2. 사용압력 제한\n3. 동합금 사용금지 이유\n4. 안전기 설치 위치\n5. 저장/취급 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '가스용기의 저장/취급 안전수칙을 설명하시오.', answer: '직사광선 차단, 충전용기와 빈용기 구분, 넘어짐 방지, 화기 격리', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 가스용기의 저장/취급 안전수칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저장장소 기준\n2. 운반 시 주의사항\n3. 용기 구분 표시\n4. 밸브 보호조치\n5. 점검 사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'rotating-machine',
    name: '회전기계 안전',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '회전체의 위험점 종류를 설명하시오.', answer: '협착점, 물림점, 접선물림점, 회전말림점, 절단점', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 회전체의 위험점 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 협착점(Pinch Point)\n2. 물림점(Nip Point)\n3. 접선물림점\n4. 회전말림점\n5. 방호 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '동력전달장치의 방호조치를 설명하시오.', answer: '벨트, 풀리, 기어, 체인, 커플링에 덮개 또는 울 설치', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 동력전달장치의 방호조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 벨트/풀리 방호\n2. 기어 방호\n3. 체인/스프로킷 방호\n4. 커플링 방호\n5. 방호덮개 재질\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '선반 작업의 안전수칙을 설명하시오.', answer: '칩(chip) 제거 시 공구 사용, 면장갑 착용금지, 회전 중 측정금지', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 선반 작업의 안전수칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 복장 주의사항\n2. 칩 제거 방법\n3. 회전 중 금지사항\n4. 척 취급 주의\n5. 정리정돈\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '밀링머신 작업의 안전수칙을 설명하시오.', answer: '커터 교환 시 전원차단, 상향절삭 주의, 칩 비산방지', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 밀링머신 작업의 안전수칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 커터 취급 주의\n2. 상향/하향 절삭\n3. 칩 비산 방지\n4. 작업 중 금지사항\n5. 보호구 착용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '드릴링머신 작업의 안전수칙을 설명하시오.', answer: '면장갑 착용금지, 공작물 고정 철저, 드릴 파손 시 조치', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 드릴링머신 작업의 안전수칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 복장 주의사항\n2. 공작물 고정\n3. 드릴 파손 대응\n4. 절삭유 사용\n5. 청소 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'safety-device',
    name: '안전장치 일반',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '풀프루프(Fool Proof)와 페일세이프(Fail Safe)를 비교하시오.', answer: 'Fool Proof: 인간 실수 방지 설계, Fail Safe: 고장 시 안전측 작동', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: Fool Proof와 Fail Safe를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. Fool Proof 개념\n2. Fail Safe 개념\n3. 차이점\n4. 적용 사례\n5. 설계 원칙\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '인터록(Interlock) 장치를 설명하시오.', answer: '일정 조건이 만족되지 않으면 기계 작동을 제한하는 연동장치', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 인터록 장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인터록 개념\n2. 작동 원리\n3. 종류(기계식/전기식)\n4. 적용 사례\n5. 설계 시 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '급정지장치의 설계요건을 설명하시오.', answer: '즉시 접근 가능, 적색 버섯형, 리셋 전 재시동 불가', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 급정지장치의 설계요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위치 기준\n2. 형상 규격\n3. 색상 규정\n4. 작동 방식\n5. 리셋 조건\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '안전율(Safety Factor)을 설명하시오.', answer: '안전율 = 극한강도/허용응력, 재료와 하중특성에 따라 결정', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 안전율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전율 정의\n2. 결정 요소\n3. 재료별 기준\n4. 하중 유형별 기준\n5. 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '잠금장치/표지장치(LOTO)를 설명하시오.', answer: '정비작업 시 에너지 차단 후 잠금장치 및 표지판 부착', prompt: '산업안전기사 기계위험방지기술 문제입니다.\n\n문제: 잠금장치/표지장치(LOTO)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. LOTO 개념\n2. 적용 대상\n3. 절차(차단-잠금-표시-확인)\n4. 잠금장치 종류\n5. 해제 절차\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function MechanicalSafetyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('industrial-safety-mechanical-safety-completed');
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
    localStorage.setItem('industrial-safety-mechanical-safety-completed', JSON.stringify(arr));
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
            <Link href="/category/safety/industrial-safety" className="text-gray-600 hover:text-red-600">산업안전기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">기계위험방지기술</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚙️</span>
            <h1 className="text-2xl font-bold text-gray-800">기계위험방지기술 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">산업안전기사 필기시험 핵심 과목</p>
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
