'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'combustion-theory',
    name: '연소이론',
    color: 'from-red-500 to-pink-500',
    questions: [
      { id: 1, question: '연소의 3요소와 4요소를 설명하시오.', answer: '3요소: 가연물, 산소공급원, 점화원. 4요소: 3요소 + 연쇄반응', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 연소의 3요소와 4요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연소 3요소\n2. 각 요소의 역할\n3. 연소 4요소\n4. 연쇄반응의 의미\n5. 소화와의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '인화점, 발화점, 연소점의 차이를 설명하시오.', answer: '인화점: 인화 가능 최저온도, 발화점: 자연발화 온도, 연소점: 연소 지속 온도(인화점보다 높음)', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 인화점, 발화점, 연소점의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인화점 정의\n2. 발화점 정의\n3. 연소점 정의\n4. 세 온도의 관계\n5. 위험물 분류와의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '연소의 형태(표면연소, 증발연소, 분해연소, 자기연소)를 설명하시오.', answer: '표면연소: 목탄, 증발연소: 석유류, 분해연소: 목재, 자기연소: 니트로셀룰로오스', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 연소의 형태를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표면연소\n2. 증발연소\n3. 분해연소\n4. 자기연소\n5. 위험물별 연소 형태\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '폭발의 종류와 폭발범위를 설명하시오.', answer: '물리적 폭발, 화학적 폭발, 분진폭발. 폭발범위: 연소하한계~연소상한계(농도 범위)', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 폭발의 종류와 폭발범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 폭발\n2. 화학적 폭발\n3. 분진폭발\n4. 폭발범위 정의\n5. 연소한계 측정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '정전기의 발생과 방지대책을 설명하시오.', answer: '발생: 마찰·박리·분무. 방지: 접지, 가습, 제전기, 유속 제한, 정전기 제거제', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 정전기의 발생과 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정전기 발생 원인\n2. 정전기 축적 조건\n3. 접지 방법\n4. 유속 제한 기준\n5. 가습 및 제전\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'fire-prevention',
    name: '화재예방',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '위험물 저장소의 화재예방 대책을 설명하시오.', answer: '환기, 온도관리, 화기엄금, 정전기 제거, 방폭전기설비, 피뢰침 설치', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 위험물 저장소의 화재예방 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환기설비 기준\n2. 온도 및 습도 관리\n3. 화기 사용 제한\n4. 정전기 제거 장치\n5. 피뢰침 설치 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '위험물 취급 시 착화원 관리를 설명하시오.', answer: '나화 금지, 전기스파크 방지, 정전기 제거, 충격·마찰 방지, 자연발화 방지', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 위험물 취급 시 착화원 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 나화(裸火) 관리\n2. 전기 스파크 방지\n3. 정전기 발생 방지\n4. 충격·마찰 방지\n5. 자연발화 방지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '위험물 탱크의 통기관 설치 기준을 설명하시오.', answer: '탱크 내 압력 조절, 지면에서 4m 이상, 인화방지장치 설치, 직경 30mm 이상', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 위험물 탱크의 통기관 설치 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통기관의 목적\n2. 높이 기준\n3. 직경 기준\n4. 인화방지장치\n5. 설치 위치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '위험물 탱크의 증기 회수 설비를 설명하시오.', answer: '주유 시 발생 증기 회수, 환경오염 방지, 화재위험 감소, 경제성', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 위험물 탱크의 증기 회수 설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 증기 회수 시스템 원리\n2. 설치 대상\n3. 회수 방법\n4. 환경 및 안전 효과\n5. 유지관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험물 저장 탱크의 온도 관리 방법을 설명하시오.', answer: '단열재 시공, 냉각설비, 통풍, 태양열 차단, 온도계 설치', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 위험물 저장 탱크의 온도 관리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외부 온도 영향\n2. 단열재 시공\n3. 냉각설비 설치\n4. 통풍 및 환기\n5. 온도 모니터링\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'extinguishing-principle',
    name: '소화원리',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      { id: 1, question: '소화의 4가지 원리를 설명하시오.', answer: '제거소화(가연물 제거), 질식소화(산소 차단), 냉각소화(온도 저하), 억제소화(연쇄반응 차단)', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 소화의 4가지 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제거소화\n2. 질식소화\n3. 냉각소화\n4. 억제소화(부촉매 소화)\n5. 각 소화법 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '소화약제의 종류와 특성을 설명하시오.', answer: '물, 포, 이산화탄소, 할론(할로겐화합물), 분말, 강화액, 청정소화약제', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 소화약제의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물 소화약제\n2. 포 소화약제\n3. 이산화탄소\n4. 분말 소화약제\n5. 청정 소화약제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '포소화약제의 종류와 적용을 설명하시오.', answer: '단백포, 합성계면활성제포, 수성막포(AFFF), 내알코올포(AR-AFFF), 불소단백포', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 포소화약제의 종류와 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단백포\n2. 합성계면활성제포\n3. 수성막포(AFFF)\n4. 내알코올포\n5. 포 소화 원리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '분말소화약제의 종류와 적응화재를 설명하시오.', answer: '제1종(탄산수소나트륨, BC급), 제2종(탄산수소칼륨, BC급), 제3종(인산암모늄, ABC급), 제4종(탄산수소칼륨+요소, BC급)', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 분말소화약제의 종류와 적응화재를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제1종 분말\n2. 제2종 분말\n3. 제3종 분말(ABC)\n4. 제4종 분말\n5. 분말 소화 원리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '이산화탄소 소화약제의 특성과 적용을 설명하시오.', answer: '질식소화(냉각효과 미미), 전기화재 적합, 잔재물 없음, 밀폐공간 질식 위험', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 이산화탄소 소화약제의 특성과 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소화 원리\n2. 적응 화재\n3. 장점\n4. 단점 및 위험성\n5. 방호구역 설계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'extinguishing-equipment',
    name: '소화설비',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '옥내소화전설비의 구성과 설치 기준을 설명하시오.', answer: '수원, 가압송수장치, 배관, 소화전함(호스·관창), 기동장치, 전원', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 옥내소화전설비의 구성과 설치 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수원 용량 기준\n2. 가압송수장치\n3. 소화전 설치 간격\n4. 호스 및 관창\n5. 방수압력 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '스프링클러설비의 종류와 작동 원리를 설명하시오.', answer: '습식, 건식, 준비작동식, 일제살수식. 감열부 작동 → 헤드 개방 → 자동 방수', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 스프링클러설비의 종류와 작동 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 습식 스프링클러\n2. 건식 스프링클러\n3. 준비작동식\n4. 일제살수식\n5. 헤드 종류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '포소화설비의 구성과 종류를 설명하시오.', answer: '고정포, 이동포. 구성: 포소화약제 저장탱크, 혼합장치, 포방출구. 저발포, 고발포', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 포소화설비의 구성과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고정포 방출구\n2. 이동포 방출구\n3. 포 혼합 장치\n4. 저발포·고발포\n5. 포 방출량 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '이산화탄소 소화설비의 설치 기준을 설명하시오.', answer: '전역방출방식, 국소방출방식. 약제량: 방호공간 체적 기준, 방출 시간, 자동폐쇄장치', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 이산화탄소 소화설비의 설치 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전역방출방식\n2. 국소방출방식\n3. 약제량 산정\n4. 방출 시간\n5. 안전장치(자동폐쇄, 경보)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '소화기의 종류와 적응화재를 설명하시오.', answer: '물소화기(A급), 포소화기(AB급), 이산화탄소(BC급), 분말(ABC급 또는 BC급), 할론소화기(BC급)', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 소화기의 종류와 적응화재를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물소화기\n2. 포소화기\n3. 이산화탄소 소화기\n4. 분말소화기\n5. 소화기 설치 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'explosion-proof',
    name: '방폭',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '방폭구조의 종류를 설명하시오.', answer: '내압방폭, 압력방폭, 유입방폭, 안전증방폭, 본질안전방폭', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 방폭구조의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내압방폭(d)\n2. 압력방폭(p)\n3. 유입방폭(o)\n4. 안전증방폭(e)\n5. 본질안전방폭(i)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '위험장소의 등급 분류를 설명하시오.', answer: '0종 장소(연속적 존재), 1종 장소(정상운전 시 존재), 2종 장소(이상 시 존재)', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 위험장소의 등급 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 0종 위험장소\n2. 1종 위험장소\n3. 2종 위험장소\n4. 각 등급별 방폭 요구\n5. 위험장소 판정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '위험물 취급 시설의 방폭 전기설비를 설명하시오.', answer: '방폭구조 전기기기, 방폭배선, 접지, 등전위본딩, 정전기 제거', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 위험물 취급 시설의 방폭 전기설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방폭 전기기기 선정\n2. 방폭 배선 방법\n3. 접지 시스템\n4. 등전위 본딩\n5. 정전기 제거\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '폭발 등급과 온도 등급을 설명하시오.', answer: '폭발등급: IIA, IIB, IIC(수소). 온도등급: T1~T6(발화온도 450℃~85℃)', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 폭발 등급과 온도 등급을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 폭발등급 분류\n2. 각 등급별 대표 가스\n3. 온도등급 분류\n4. T1~T6 온도 범위\n5. 기기 선정 시 고려사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험물 저장소의 방폭 조명 설비를 설명하시오.', answer: '방폭형 조명기구, 적절한 방폭등급 선정, 내압방폭 또는 안전증방폭, 비상조명', prompt: '위험물기능장 화재예방과 소화 문제입니다.\n\n문제: 위험물 저장소의 방폭 조명 설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방폭 조명기구 종류\n2. 방폭등급 선정\n3. 설치 위치\n4. 비상조명\n5. 유지관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function FirePreventionStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-master-fire-prevention-completed');
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
    localStorage.setItem('hazardous-master-fire-prevention-completed', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-yellow-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety" className="text-gray-600 hover:text-yellow-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety/hazardous-master" className="text-gray-600 hover:text-yellow-600">위험물기능장</Link>
            <span className="text-gray-300">›</span>
            <span className="text-yellow-600 font-medium">화재예방과 소화</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔥</span>
            <h1 className="text-2xl font-bold text-gray-800">화재예방과 소화 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">위험물기능장 필기시험 핵심 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-yellow-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}>
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
