'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'combustion-theory',
    name: '연소이론',
    color: 'from-red-500 to-pink-500',
    questions: [
      { id: 1, question: '연소의 3요소와 연소의 4요소를 설명하시오.', answer: '3요소: 가연물, 산소공급원, 점화원. 4요소: 3요소 + 연쇄반응', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 연소의 3요소와 4요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연소 3요소\n2. 각 요소의 역할\n3. 연소 4요소\n4. 연쇄반응의 의미\n5. 소화와의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '인화점, 발화점, 연소점의 차이를 설명하시오.', answer: '인화점: 인화 가능 최저온도. 발화점: 자연발화 온도. 연소점: 연소 지속 온도(인화점보다 높음)', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 인화점, 발화점, 연소점의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인화점 정의와 측정\n2. 발화점 정의\n3. 연소점 정의\n4. 세 온도의 관계\n5. 위험물 분류와의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '연소의 형태(표면연소, 증발연소, 분해연소, 자기연소)를 설명하시오.', answer: '표면연소: 고체표면(목탄, 코크스). 증발연소: 액체증발(석유류). 분해연소: 고체분해(목재, 석탄). 자기연소: 산소 포함(셀룰로이드)', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 연소의 형태를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표면연소\n2. 증발연소\n3. 분해연소\n4. 자기연소\n5. 위험물별 연소 형태\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '폭발의 종류와 폭발범위(연소범위)를 설명하시오.', answer: '물리적 폭발(압력), 화학적 폭발(산화), 분진폭발. 폭발범위: 연소하한계~연소상한계(부피% 또는 vol%)', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 폭발의 종류와 폭발범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 폭발\n2. 화학적 폭발\n3. 분진폭발\n4. 폭발범위(연소범위)\n5. 연소한계 측정과 위험성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '정전기의 발생 원인과 방지대책을 설명하시오.', answer: '발생: 마찰, 박리, 분무, 유동. 방지: 접지, 가습(상대습도 70% 이상), 유속 제한(1m/s 이하), 제전기', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 정전기의 발생과 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정전기 발생 원인\n2. 정전기 축적 조건\n3. 접지 방법과 저항값\n4. 유속 제한 기준\n5. 가습 및 제전\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'fire-classification',
    name: '화재의 분류',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '화재의 종류(A, B, C, D, K급)를 설명하시오.', answer: 'A급: 일반화재(목재, 종이). B급: 유류화재. C급: 전기화재. D급: 금속화재. K급: 주방화재', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 화재의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. A급 화재\n2. B급 화재\n3. C급 화재\n4. D급 화재\n5. K급 화재와 적응 소화약제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '유류화재의 특성과 소화방법을 설명하시오.', answer: '특성: 액체표면 연소, 비중 작음(물에 뜸). 소화: 포, 이산화탄소, 분말, 할론 (물 사용 금지-확산 위험)', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 유류화재의 특성과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유류화재 특성\n2. 물 사용 금지 이유\n3. 포 소화 원리\n4. 기타 소화약제\n5. 유류탱크 화재 대응\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '전기화재의 특성과 소화방법을 설명하시오.', answer: '특성: 통전 중 화재. 소화: 비전도성 소화약제(CO₂, 할론, 분말). 전원 차단 후 물 사용 가능', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 전기화재의 특성과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전기화재 특성\n2. 비전도성 소화약제\n3. 물 사용 시 위험성\n4. 전원 차단 중요성\n5. 감전 방지 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '금속화재의 특성과 소화방법을 설명하시오.', answer: '특성: 고온, 물과 반응. 대상: Mg, Na, K, Al 등. 소화: 건조사, 팽창질석, 마른 흑연 (물 사용 금지)', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 금속화재의 특성과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 금속화재 대상 금속\n2. 물과의 반응 위험성\n3. 건조사 소화\n4. 팽창질석, 흑연\n5. 금속화재 예방\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험물 화재의 일반적 특성을 설명하시오.', answer: '급격한 연소, 유독가스 발생, 폭발 위험, 재발화 가능성, 소화 곤란', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 위험물 화재의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연소 속도\n2. 유독가스 발생\n3. 폭발 위험성\n4. 재발화 가능성\n5. 소화 시 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'extinguishing-principle',
    name: '소화원리',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      { id: 1, question: '소화의 4가지 원리를 설명하시오.', answer: '제거소화(가연물 제거), 질식소화(산소 차단), 냉각소화(온도 저하), 억제소화(연쇄반응 차단)', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 소화의 4가지 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제거소화\n2. 질식소화\n3. 냉각소화\n4. 억제소화(부촉매 소화)\n5. 각 소화법 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '물 소화약제의 소화 원리와 특성을 설명하시오.', answer: '원리: 냉각(증발잠열 539kcal/kg), 질식. 장점: 저렴, 무독. 단점: 전기화재·유류화재 부적합, 동결', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 물 소화약제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 냉각 원리\n2. 증발잠열\n3. 적응 화재\n4. 부적응 화재\n5. 첨가제(습윤제, 부동액)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '포소화약제의 종류와 소화 원리를 설명하시오.', answer: '종류: 단백포, 합성계면활성제포, 수성막포(AFFF), 내알코올포. 원리: 질식(공기 차단), 냉각, 증기 억제', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 포소화약제의 종류와 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단백포\n2. 합성계면활성제포\n3. 수성막포(AFFF)\n4. 내알코올포\n5. 포 소화 원리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '분말소화약제의 종류와 소화 원리를 설명하시오.', answer: '제1종(NaHCO₃, BC급), 제2종(KHCO₃, BC급), 제3종(NH₄H₂PO₄, ABC급), 제4종(KHCO₃+요소, BC급). 원리: 억제, 질식', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 분말소화약제의 종류와 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제1종 분말(탄산수소나트륨)\n2. 제2종 분말(탄산수소칼륨)\n3. 제3종 분말(인산암모늄)\n4. 제4종 분말\n5. 분말 소화 원리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '이산화탄소 소화약제의 특성을 설명하시오.', answer: '원리: 질식(농도 30% 이상). 장점: 전기화재 적합, 잔재물 없음. 단점: 냉각효과 미미, 질식 위험, 심부화재 부적합', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 이산화탄소 소화약제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소화 원리\n2. 적응 화재\n3. 장점\n4. 단점 및 위험성\n5. 방호구역 설계 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'extinguishing-equipment',
    name: '소화설비',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '옥내소화전설비의 구성과 설치 기준을 설명하시오.', answer: '구성: 수원, 가압송수장치, 배관, 소화전함(호스·관창). 수원: 2.6㎥×소화전 수. 방수압력: 0.17MPa 이상. 방수량: 130L/min', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 옥내소화전설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설비 구성\n2. 수원 용량 기준\n3. 가압송수장치\n4. 소화전 설치 간격\n5. 방수압력 및 방수량\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '스프링클러설비의 종류와 작동 원리를 설명하시오.', answer: '습식: 배관 내 가압수. 건식: 배관 내 압축공기. 준비작동식: 감지기 작동 후 개방. 일제살수식: 모든 헤드 동시 개방', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 스프링클러설비의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 습식 스프링클러\n2. 건식 스프링클러\n3. 준비작동식\n4. 일제살수식\n5. 헤드 종류와 작동온도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '포소화설비의 구성과 종류를 설명하시오.', answer: '고정포방출구, 이동포방출구. 구성: 포소화약제 저장탱크, 혼합장치(혼합비 3% 또는 6%), 포방출구. 저발포(20배 미만), 고발포(20배 이상)', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 포소화설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고정포 방출구\n2. 이동포 방출구\n3. 포 혼합 장치\n4. 저발포·고발포\n5. 포 방출량 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '이산화탄소 소화설비의 설치 기준을 설명하시오.', answer: '전역방출방식: 방호공간 체적 기준 약제량. 국소방출방식: 방호대상물 기준. 방출 시간: 1분 이내. 자동폐쇄장치, 경보장치 필수', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 이산화탄소 소화설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전역방출방식\n2. 국소방출방식\n3. 약제량 산정\n4. 방출 시간\n5. 안전장치(자동폐쇄, 경보)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '소화기의 종류와 적응화재를 설명하시오.', answer: '물소화기(A급), 강화액소화기(AB급), 포소화기(AB급), CO₂소화기(BC급), 분말소화기(ABC급 또는 BC급), 할론소화기(BC급)', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 소화기의 종류와 적응화재를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물·강화액 소화기\n2. 포소화기\n3. CO₂ 소화기\n4. 분말소화기\n5. 소화기 설치 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'explosion-proof',
    name: '방폭',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '방폭구조의 종류를 설명하시오.', answer: '내압방폭(d): 용기 내 폭발 견딤. 압력방폭(p): 내부 양압 유지. 유입방폭(o): 절연유 중 설치. 안전증방폭(e): 불꽃 발생 방지. 본질안전방폭(i): 점화 에너지 이하', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 방폭구조의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내압방폭(d)\n2. 압력방폭(p)\n3. 유입방폭(o)\n4. 안전증방폭(e)\n5. 본질안전방폭(i)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '위험장소의 등급 분류를 설명하시오.', answer: '0종: 폭발성 분위기 연속 존재. 1종: 정상운전 시 폭발성 분위기 존재. 2종: 이상 시에만 폭발성 분위기 존재', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 위험장소의 등급 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 0종 위험장소\n2. 1종 위험장소\n3. 2종 위험장소\n4. 각 등급별 방폭 요구\n5. 위험장소 판정 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '위험물 취급 시설의 방폭 전기설비를 설명하시오.', answer: '방폭구조 전기기기 사용, 방폭배선(전선관·케이블 공사), 접지(10Ω 이하), 등전위본딩, 정전기 제거', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 방폭 전기설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방폭 전기기기 선정\n2. 방폭 배선 방법\n3. 접지 시스템\n4. 등전위 본딩\n5. 정전기 제거 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '폭발 등급과 온도 등급을 설명하시오.', answer: '폭발등급: IIA(프로판), IIB(에틸렌), IIC(수소-가장 위험). 온도등급: T1(450℃)~T6(85℃), 발화온도 기준', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 폭발 등급과 온도 등급을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 폭발등급 분류(IIA, IIB, IIC)\n2. 각 등급별 대표 가스\n3. 온도등급 분류(T1~T6)\n4. 온도등급별 발화온도\n5. 기기 선정 시 고려사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위험물 저장소의 환기설비를 설명하시오.', answer: '자연환기 또는 강제환기. 환기구: 바닥면적 150㎡마다 1개 이상. 급기구: 하부, 배기구: 상부. 방폭형 환기팬', prompt: '위험물기사 화재예방과 소화방법 문제입니다.\n\n문제: 위험물 저장소의 환기설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환기 목적\n2. 환기 방식\n3. 환기구 설치 기준\n4. 급기구·배기구 위치\n5. 방폭형 환기팬\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function FirePreventionStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-engineer-fire-prevention-progress');
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
    localStorage.setItem('hazardous-engineer-fire-prevention-progress', JSON.stringify(arr));
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
            <Link href="/category/safety/hazardous-engineer" className="text-gray-600 hover:text-red-600">위험물기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">화재예방과 소화방법</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔥</span>
            <h1 className="text-2xl font-bold text-gray-800">화재예방과 소화방법 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">위험물기사 필기시험 핵심 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-red-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:opacity-90'}`}>
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
