'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'generation',
    name: '발전공학',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '화력발전소의 열효율을 높이기 위한 방법 3가지를 설명하시오.', answer: '재열사이클, 재생사이클, 복합사이클', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 화력발전소의 열효율을 높이기 위한 방법 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재열사이클 (Reheat Cycle)\n2. 재생사이클 (Regenerative Cycle)\n3. 복합사이클 (Combined Cycle)\n4. 각 방법의 효율 향상 원리\n5. 실제 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '수력발전소의 이론 출력 공식을 유도하시오.', answer: 'P = 9.8QH [kW]', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 수력발전소의 이론 출력 공식을 유도하시오.\n\n다음 순서로 설명해주세요:\n1. 위치에너지: E = mgh\n2. 유량 Q[m³/s]와 질량의 관계\n3. 단위 시간당 에너지 = 출력\n4. P = 9.8QH 유도\n5. 효율을 고려한 실제 출력\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '원자력발전소에서 핵연료 1kg이 완전 핵분열 시 발생하는 에너지를 구하시오.', answer: 'E ≈ 8.2 × 10¹³ J (석탄 약 3,000톤 해당)', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 원자력발전소에서 핵연료 1kg이 완전 핵분열 시 발생하는 에너지를 구하시오.\n\n다음 순서로 설명해주세요:\n1. 질량-에너지 등가: E = mc²\n2. 핵분열 시 질량결손\n3. 에너지 계산\n4. 화석연료와 비교\n5. 실제 발전 효율\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '태양광 발전의 발전량에 영향을 주는 요소들을 설명하시오.', answer: '일사량, 설치각도, 온도, 모듈효율, 그림자', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 태양광 발전의 발전량에 영향을 주는 요소들을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일사량 (kWh/m²)\n2. 설치 각도와 방위각\n3. 온도 계수\n4. 모듈 효율\n5. 시스템 손실\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '풍력발전의 출력은 풍속의 몇 승에 비례하는가?', answer: '풍속의 3승에 비례 (P ∝ v³)', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 풍력발전의 출력은 풍속의 몇 승에 비례하는가?\n\n다음 순서로 설명해주세요:\n1. 풍력 에너지: E = (1/2)mv²\n2. 단위 시간당 공기 질량\n3. 출력 공식: P = (1/2)ρAv³\n4. 베츠 한계 (59.3%)\n5. 풍속 증가의 중요성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'transmission',
    name: '송전공학',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '송전 전압을 높이면 송전 손실이 감소하는 이유를 설명하시오.', answer: '손실 P = I²R, 전압 2배 → 전류 1/2배 → 손실 1/4배', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 송전 전압을 높이면 송전 손실이 감소하는 이유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전력 P = VI 관계\n2. 전압 상승 시 전류 감소\n3. 손실 Ploss = I²R 관계\n4. 전압 n배 → 손실 1/n²배\n5. 초고압 송전의 경제성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '송전선로의 코로나 현상을 설명하고 방지대책을 제시하시오.', answer: '전선 주위 공기 이온화 현상, 복도체 사용이 주요 대책', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 송전선로의 코로나 현상을 설명하고 방지대책을 제시하시오.\n\n다음 순서로 설명해주세요:\n1. 코로나 발생 원리\n2. 임계 전압 (Peek 공식)\n3. 코로나 손실\n4. 통신 장해\n5. 방지대책 (복도체, 굵은 전선)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '송전선로의 전압강하율 계산 공식을 쓰시오.', answer: 'ε = (Vs - Vr)/Vr × 100 [%]', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 송전선로의 전압강하율 계산 공식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 전압강하율 정의\n2. 공식: ε = (Vs - Vr)/Vr × 100\n3. 근사식: ε ≈ (PRcosφ + PXsinφ)/V²\n4. 역률과 전압강하 관계\n5. 허용 전압강하율\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '페란티 현상이 발생하는 조건과 대책을 설명하시오.', answer: '경부하 시 수전단 전압 > 송전단 전압, 분로리액터로 해결', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 페란티 현상이 발생하는 조건과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 페란티 현상 정의\n2. 발생 조건 (경부하, 긴 선로)\n3. 충전전류에 의한 전압상승\n4. 분로리액터 설치\n5. 조상설비 운용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'ACSR 전선의 특징과 구성을 설명하시오.', answer: '알루미늄 피복 강심 연선, 중심에 강선으로 인장강도 확보', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: ACSR 전선의 특징과 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ACSR 명칭 (Aluminum Conductor Steel Reinforced)\n2. 구조: 강심 + 알루미늄 피복\n3. 장점: 인장강도, 도전율\n4. 용도: 송전선로\n5. 단점과 대안 (ACSS 등)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'distribution',
    name: '배전공학',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '배전방식 중 루프(환상)배전과 방사상배전의 장단점을 비교하시오.', answer: '루프: 신뢰성 높음/비용 높음, 방사상: 간단/정전범위 넓음', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 배전방식 중 루프(환상)배전과 방사상배전의 장단점을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 방사상 배전 특징\n2. 루프 배전 특징\n3. 신뢰성 비교\n4. 경제성 비교\n5. 적용 장소\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '변압기의 병렬운전 조건 4가지를 쓰시오.', answer: '극성 동일, 권수비 동일, %임피던스 동일, 위상각 동일', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 변압기의 병렬운전 조건 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 극성 일치\n2. 권수비 일치 (전압비)\n3. %임피던스 일치\n4. 위상각 일치\n5. 조건 불일치 시 문제점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '수용률, 부하율, 부등률의 정의와 공식을 쓰시오.', answer: '수용률=최대/설비, 부하율=평균/최대, 부등률=개별합/합성최대', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 수용률, 부하율, 부등률의 정의와 공식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 수용률 = 최대수용전력/설비용량\n2. 부하율 = 평균전력/최대전력\n3. 부등률 = 개별최대합/합성최대\n4. 각각의 의미\n5. 실제 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '역률 개선의 효과 5가지를 설명하시오.', answer: '손실감소, 전압강하개선, 설비용량여유, 전기요금절감, 전력품질향상', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 역률 개선의 효과 5가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전력손실 감소\n2. 전압강하 개선\n3. 설비용량 여유 확보\n4. 전기요금 절감\n5. 전력품질 향상\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '역률 0.8에서 1.0으로 개선 시 전력손실 감소율을 구하시오.', answer: '손실감소율 = 1 - (0.8)² = 36%', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 역률 0.8에서 1.0으로 개선 시 전력손실 감소율을 구하시오.\n\n다음 순서로 설명해주세요:\n1. 손실 P = I²R\n2. 전류 I = P/(Vcosφ)\n3. 손실비 = (cosφ1/cosφ2)²\n4. 계산: 1 - (0.8/1.0)² = 0.36\n5. 역률 개선의 경제성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'protection',
    name: '보호계전기',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '과전류계전기(OCR)의 동작원리와 정정요소를 설명하시오.', answer: '탭(동작전류), 레버(동작시간) 정정', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 과전류계전기(OCR)의 동작원리와 정정요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. OCR 동작원리\n2. 탭(Tap) 정정 - 동작전류\n3. 레버(Lever) 정정 - 동작시간\n4. 한시특성곡선\n5. 협조 보호\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '차동계전기(비율차동계전기)의 동작원리를 설명하시오.', answer: '양단 CT 전류차이로 내부고장 검출, 억제코일로 오동작 방지', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 차동계전기(비율차동계전기)의 동작원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 차동계전기 원리\n2. 동작코일과 억제코일\n3. 비율 특성\n4. 내부고장과 외부고장 구분\n5. 변압기 보호 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '거리계전기의 동작원리와 특성을 설명하시오.', answer: '임피던스(거리)로 고장점 판별, Zone별 동작시간 설정', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 거리계전기의 동작원리와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 거리계전기 원리\n2. 임피던스 측정\n3. Zone1, Zone2, Zone3 설정\n4. 방향성 판별\n5. 송전선로 보호\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '피뢰기의 역할과 종류를 설명하시오.', answer: '이상전압 억제, 산화아연(ZnO) 피뢰기가 주류', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 피뢰기의 역할과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피뢰기 역할\n2. 직렬갭형 (SiC)\n3. 갭레스형 (ZnO)\n4. 제한전압과 방전전류\n5. 설치 위치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '접지저항 측정방법과 허용 접지저항값을 설명하시오.', answer: '3전극법, 특고압 10Ω 이하, 고압 75Ω 이하', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 접지저항 측정방법과 허용 접지저항값을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 3전극법(Kohlrausch법)\n2. 전위강하법\n3. 접지저항 허용값 (종별)\n4. 접지저항 저감 방법\n5. 접지 목적 (감전방지, 기기보호)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'substation',
    name: '변전설비',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '가스절연개폐장치(GIS)의 장점 5가지를 쓰시오.', answer: '축소형, 밀폐형(오염방지), 안전성, 저소음, 저유지보수', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 가스절연개폐장치(GIS)의 장점 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 축소 설치 (면적 1/10~1/20)\n2. 밀폐구조 (오염, 염해 방지)\n3. 안전성 향상\n4. 저소음, 환경친화\n5. 유지보수 간편\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'SF6 가스의 특성과 절연파괴 특성을 설명하시오.', answer: '불활성, 절연내력 공기의 2~3배, 소호능력 우수', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: SF6 가스의 특성과 절연파괴 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SF6 가스 화학적 특성\n2. 절연내력 (공기의 2~3배)\n3. 소호능력\n4. 단점 (온실가스)\n5. 대체 가스 연구\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '단로기(DS)와 차단기(CB)의 차이점을 설명하시오.', answer: '단로기: 무부하개폐, 차단기: 부하전류/고장전류 차단', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 단로기(DS)와 차단기(CB)의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단로기(DS) 역할\n2. 차단기(CB) 역할\n3. 차단용량 차이\n4. 개폐 순서\n5. 인터록 장치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '변압기 냉각방식의 종류를 설명하시오.', answer: 'ONAN, ONAF, OFAF, ODAF 등', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 변압기 냉각방식의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ONAN (Oil Natural Air Natural)\n2. ONAF (Oil Natural Air Forced)\n3. OFAF (Oil Forced Air Forced)\n4. ODAF (Oil Directed Air Forced)\n5. 용량별 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '변전소 모선방식 중 복모선 방식의 특징을 설명하시오.', answer: '2개 모선, 모선고장 시 무정전 전환, 신뢰성 높음', prompt: '전기산업기사 전력공학 문제입니다.\n\n문제: 변전소 모선방식 중 복모선 방식의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 복모선 구성\n2. 장점 (신뢰성)\n3. 모선연락차단기 역할\n4. 단모선과 비교\n5. 적용 변전소\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function ElectricCraftsmanPowerStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('electric-craftsman-power-completed');
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
    localStorage.setItem('electric-craftsman-power-completed', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-orange-600">기계·전기</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/electric-craftsman" className="text-gray-600 hover:text-orange-600">전기산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">전력공학</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">⚡</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">전력공학</h1>
              <p className="text-green-100">전기산업기사 필기 핵심 과목</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold">{totalCompleted}/{totalQuestions}</div>
              <div className="text-green-100 text-sm">문제 완료</div>
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
