'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'class1-oxidizing',
    name: '제1류 위험물 (산화성고체)',
    color: 'from-red-500 to-pink-500',
    questions: [
      { id: 1, question: '제1류 위험물의 공통 성질을 설명하시오.', answer: '산화성 고체, 불연성, 가열·충격·마찰 시 산소 방출, 가연물과 혼합 시 폭발 위험, 물과 반응하는 것도 있음', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 제1류 위험물의 공통 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산화성의 의미\n2. 산소 방출 조건\n3. 가연물과의 반응\n4. 저장 시 주의사항\n5. 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '염소산칼륨(KClO₃)의 성질과 소화방법을 설명하시오.', answer: '백색 결정, 강산화제, 400℃에서 산소 방출, 황·인 등과 혼촉 금지. 소화: 다량의 물', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 염소산칼륨의 성질과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 성질\n2. 화학적 성질\n3. 위험성\n4. 혼촉 위험물질\n5. 저장·취급 및 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '과산화나트륨(Na₂O₂)의 성질을 설명하시오.', answer: '담황색 분말, 물과 반응하여 산소·열 발생(2Na₂O₂+2H₂O→4NaOH+O₂), CO₂와 반응, 습기 엄금', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 과산화나트륨의 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외관 및 물리적 성질\n2. 물과의 반응\n3. CO₂와의 반응\n4. 위험성\n5. 저장·취급 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '과망간산칼륨(KMnO₄)의 성질을 설명하시오.', answer: '자색 결정, 강산화제, 글리세린·황산과 혼촉 시 발화, 환원성 물질과 위험 반응', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 과망간산칼륨의 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 성질\n2. 산화성\n3. 혼촉 위험물질\n4. 발화 위험\n5. 저장·취급 및 소화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '제1류 위험물의 저장·취급 방법을 설명하시오.', answer: '환원성 물질과 격리, 가열·충격·마찰 금지, 건조·냉암소 보관, 용기 밀폐, 물 소화', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 제1류 위험물의 저장·취급 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 혼촉 금지물질\n2. 보관 장소 조건\n3. 취급 시 주의사항\n4. 용기 관리\n5. 화재 시 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'class2-flammable-solid',
    name: '제2류 위험물 (가연성고체)',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '제2류 위험물의 공통 성질을 설명하시오.', answer: '가연성 고체, 산화되기 쉬움, 착화온도 낮음, 분말은 분진폭발 위험, 물과 반응하는 것도 있음(금속분)', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 제2류 위험물의 공통 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가연성의 의미\n2. 산화 위험성\n3. 분진폭발\n4. 금속분의 특성\n5. 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '유황(S)의 성질과 소화방법을 설명하시오.', answer: '황색 고체, 이황화탄소에 녹음, 연소 시 SO₂ 발생(유독), 정전기 발생 위험. 소화: 물, 포, 분말', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 유황의 성질과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 성질\n2. 연소 생성물\n3. 정전기 위험\n4. 저장·취급\n5. 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '적린(P)과 황린의 차이를 설명하시오.', answer: '적린: 적갈색, 안정, 자연발화 없음, 무독. 황린: 담황색, 불안정, 자연발화(34℃), 맹독, 물속 보관', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 적린과 황린의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적린의 성질\n2. 황린의 성질\n3. 발화점 차이\n4. 독성\n5. 저장 방법 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '금속분(Mg, Al)의 성질과 위험성을 설명하시오.', answer: '물과 반응하여 수소 발생, 분진폭발 위험, 고온 연소(마그네슘 2500℃), 물 소화 금지. 소화: 건조사, 팽창질석', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 금속분의 성질과 위험성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물과의 반응\n2. 분진폭발 조건\n3. 연소 온도\n4. 물 소화 금지 이유\n5. 적절한 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '철분의 성질과 자연발화 조건을 설명하시오.', answer: '흑색 분말, 공기 중 산화되어 발열, 유분·수분 있으면 자연발화, 분진폭발. 소화: 건조사, 팽창질석', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 철분의 성질과 자연발화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 성질\n2. 공기 중 산화\n3. 자연발화 조건\n4. 분진폭발 위험\n5. 저장·소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'class3-spontaneous',
    name: '제3류 위험물 (자연발화성·금수성물질)',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      { id: 1, question: '제3류 위험물의 공통 성질을 설명하시오.', answer: '자연발화성 또는 금수성, 공기 또는 물과 접촉 시 발화·발열, 보호액 중 저장, 물 소화 금지', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 제3류 위험물의 공통 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자연발화성\n2. 금수성\n3. 보호액 저장\n4. 물 소화 금지 이유\n5. 적절한 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '나트륨(Na)과 칼륨(K)의 성질을 설명하시오.', answer: '은백색 연한 금속, 물과 격렬히 반응(2Na+2H₂O→2NaOH+H₂), 수소 발생·발화, 석유 또는 등유 중 보관', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 나트륨과 칼륨의 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 성질\n2. 물과의 반응\n3. 공기 중 보관 위험\n4. 보호액 종류\n5. 화재 시 대응\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '황린(P₄)의 성질과 저장방법을 설명하시오.', answer: '담황색 고체, 맹독, 자연발화온도 34℃, 이황화탄소에 녹음, 물속 보관(공기 차단)', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 황린의 성질과 저장방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 성질\n2. 발화온도\n3. 독성\n4. 물속 보관 이유\n5. 취급 시 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '알킬알루미늄의 성질을 설명하시오.', answer: '무색 액체, 공기 중 자연발화, 물과 격렬히 반응, 질소·아르곤 가스 중 저장. 소화: 건조사, 팽창질석', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 알킬알루미늄의 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 성질\n2. 자연발화성\n3. 물과의 반응\n4. 불활성 가스 저장\n5. 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '제3류 위험물의 소화방법을 설명하시오.', answer: '물 사용 금지(수소 발생·폭발). 건조사, 팽창질석, 마른 소다회. 질식소화', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 제3류 위험물의 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물 사용 금지 이유\n2. 건조사 소화\n3. 팽창질석\n4. 소다회(탄산나트륨)\n5. 질식소화 원리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'class4-flammable-liquid',
    name: '제4류 위험물 (인화성액체)',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '제4류 위험물의 공통 성질을 설명하시오.', answer: '인화성 액체, 증기는 공기보다 무거움, 비중 1보다 작음(물에 뜸), 정전기 발생, 증기 흡입 위험. 소화: 포, CO₂, 분말', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 제4류 위험물의 공통 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인화성\n2. 증기 특성\n3. 비중\n4. 정전기 위험\n5. 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '제4류 위험물의 품명별 분류를 설명하시오.', answer: '특수인화물(인화점 -20℃ 이하), 제1석유류(21℃ 미만), 제2석유류(21~70℃), 제3석유류(70~200℃), 제4석유류(200~250℃), 동식물유류', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 제4류 위험물의 품명별 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 특수인화물\n2. 제1석유류\n3. 제2석유류\n4. 제3석유류\n5. 제4석유류, 동식물유류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '가솔린과 경유의 성질 차이를 설명하시오.', answer: '가솔린: 제1석유류, 인화점 -40℃, 발화점 300℃, 비중 0.7, 휘발성 높음. 경유: 제2석유류, 인화점 50℃, 발화점 220℃, 비중 0.85', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 가솔린과 경유의 성질 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인화점 비교\n2. 발화점 비교\n3. 비중 비교\n4. 휘발성 차이\n5. 위험성 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '아세톤의 성질을 설명하시오.', answer: '무색 액체, 특이한 냄새, 제1석유류, 인화점 -18℃, 물·알코올에 잘 녹음, 휘발성·인화성 강함', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 아세톤의 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 성질\n2. 인화점과 발화점\n3. 용해성\n4. 위험성\n5. 저장·취급 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '제4류 위험물의 저장·취급 방법을 설명하시오.', answer: '환기, 온도관리, 화기엄금, 접지(정전기 제거), 용기 밀폐, 유출 방지, 증기 흡입 금지', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 제4류 위험물의 저장·취급 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환기 및 온도관리\n2. 화기 관리\n3. 정전기 방지\n4. 용기 및 탱크 관리\n5. 안전장비 착용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'class5-6',
    name: '제5류·제6류 위험물',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '제5류 위험물의 공통 성질을 설명하시오.', answer: '자기반응성 물질, 산소 포함(자체 산소 공급), 가열·충격·마찰로 폭발, 연소속도 빠름. 소화: 다량의 물로 냉각', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 제5류 위험물의 공통 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기반응성\n2. 산소 공급원\n3. 폭발 위험\n4. 연소 특성\n5. 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '니트로글리세린의 성질을 설명하시오.', answer: '무색 또는 담황색 유상 액체, 맹독, 충격·마찰에 극히 민감, 다이너마이트 원료, 냉각 소화', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 니트로글리세린의 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 성질\n2. 폭발 위험성\n3. 독성\n4. 안정화 방법\n5. 저장·취급\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'TNT(트리니트로톨루엔)의 성질을 설명하시오.', answer: '담황색 결정, 폭약, 충격에 둔감(기폭제 필요), 물에 불용, 유기용제에 가용', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: TNT의 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 성질\n2. 폭발 특성\n3. 용해성\n4. 안정성\n5. 저장·취급 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '제6류 위험물의 공통 성질을 설명하시오.', answer: '산화성 액체, 불연성, 강산화제, 가연물과 접촉 시 발화, 부식성 강함. 소화: 다량의 물', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 제6류 위험물의 공통 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산화성\n2. 가연물과의 반응\n3. 부식성\n4. 저장·취급 주의사항\n5. 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '과산화수소(H₂O₂)의 성질을 설명하시오.', answer: '무색 액체, 산화제, 분해하여 산소 발생(2H₂O₂→2H₂O+O₂), 부식성, 금속·유기물 접촉 금지, 냉암소 보관', prompt: '위험물기사 위험물의 성질과 취급 문제입니다.\n\n문제: 과산화수소의 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 성질\n2. 분해 반응\n3. 산화성\n4. 부식성\n5. 저장·취급 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function HazardousPropertiesStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-engineer-hazardous-properties-progress');
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
    localStorage.setItem('hazardous-engineer-hazardous-properties-progress', JSON.stringify(arr));
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
            <span className="text-red-600 font-medium">위험물의 성질과 취급</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚠️</span>
            <h1 className="text-2xl font-bold text-gray-800">위험물의 성질과 취급 학습하기</h1>
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
