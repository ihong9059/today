'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'combustion',
    name: '연소이론',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '연소의 3요소와 4요소를 설명하시오.', answer: '3요소: 가연물, 산소, 점화원 / 4요소: +연쇄반응', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 연소의 3요소와 4요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연소의 3요소\n2. 연소의 4요소\n3. 연쇄반응의 의미\n4. 각 요소 제거 시 소화효과\n5. 적용 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '인화점, 발화점, 연소점의 차이를 설명하시오.', answer: '인화점<연소점<발화점 순서, 인화점: 점화원 필요, 발화점: 자연발화', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 인화점, 발화점, 연소점의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인화점 정의\n2. 발화점 정의\n3. 연소점 정의\n4. 온도 순서 관계\n5. 위험물 분류 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '폭발한계(LEL, UEL)를 설명하시오.', answer: 'LEL: 폭발하한계, UEL: 폭발상한계, 위험도=(UEL-LEL)/LEL', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 폭발한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 폭발하한계(LEL)\n2. 폭발상한계(UEL)\n3. 위험도 계산\n4. 주요 가스 폭발한계\n5. 안전관리 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '연소의 형태를 분류하시오.', answer: '기체: 확산/예혼합, 액체: 증발/분무, 고체: 표면/분해/자기연소', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 연소의 형태를 분류하시오.\n\n다음 순서로 설명해주세요:\n1. 기체 연소 형태\n2. 액체 연소 형태\n3. 고체 연소 형태\n4. 각 형태별 특징\n5. 소화 방법과의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '연소생성물의 종류와 위험성을 설명하시오.', answer: 'CO(일산화탄소), CO2, HCN(시안화수소), 연기(가시거리 저하)', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 연소생성물의 종류와 위험성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일산화탄소(CO) 독성\n2. 이산화탄소(CO2) 영향\n3. 시안화수소(HCN)\n4. 연기의 위험성\n5. 인체 영향 농도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'fire-phenomena',
    name: '화재현상',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '플래시오버(Flashover)를 설명하시오.', answer: '실내 온도 약 600°C, 복사열로 전면화재로 급격히 전이', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 플래시오버를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 플래시오버 정의\n2. 발생 조건(온도/열유속)\n3. 발생 전후 현상\n4. 위험성\n5. 대응 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '백드래프트(Backdraft)를 설명하시오.', answer: '산소부족 상태에서 공기 유입 시 폭발적 연소', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 백드래프트를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 백드래프트 정의\n2. 발생 조건\n3. 징후 파악\n4. 위험성\n5. 예방/대응 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '화재의 성장곡선을 설명하시오.', answer: '초기→성장기→최성기→감쇠기, t²화재(αt²)', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 화재의 성장곡선을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초기 단계\n2. 성장기\n3. 최성기\n4. 감쇠기\n5. t²화재 개념\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '화재하중과 등가가연물량을 설명하시오.', answer: '화재하중(MJ/㎡)=가연물총발열량/바닥면적, 등가가연물(kg/㎡)', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 화재하중과 등가가연물량을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화재하중 정의\n2. 등가가연물량 정의\n3. 계산 방법\n4. 건물 용도별 기준\n5. 설계 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '연기의 확산과 제연을 설명하시오.', answer: '굴뚝효과, 부력효과, 공조효과 / 제연방식: 자연/기계배연', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 연기의 확산과 제연을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 굴뚝효과\n2. 부력효과\n3. 공조효과\n4. 자연배연\n5. 기계배연\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'extinguishing',
    name: '소화원리',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '소화의 4가지 방법을 설명하시오.', answer: '냉각소화, 질식소화, 제거소화, 억제소화(부촉매)', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 소화의 4가지 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 냉각소화 원리\n2. 질식소화 원리\n3. 제거소화 원리\n4. 억제소화 원리\n5. 각 방법의 적용 예\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '소화약제별 소화원리를 설명하시오.', answer: '물(냉각), CO2(질식), 분말(억제+질식), 포(질식+냉각)', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 소화약제별 소화원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물 소화약제\n2. 이산화탄소\n3. 분말 소화약제\n4. 포 소화약제\n5. 청정소화약제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '화재 분류(A,B,C,D,K급)와 적응 소화약제를 설명하시오.', answer: 'A급(일반)-물, B급(유류)-포/CO2, C급(전기)-CO2/분말, D급(금속)-특수, K급(주방)-습식약제', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 화재 분류와 적응 소화약제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. A급 화재\n2. B급 화재\n3. C급 화재\n4. D급 화재\n5. K급 화재\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '물의 소화 특성을 설명하시오.', answer: '비열 4.186kJ/kg·K, 기화잠열 2257kJ/kg, 수증기 팽창 1700배', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 물의 소화 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비열과 열용량\n2. 증발잠열\n3. 수증기 팽창\n4. 냉각효과\n5. 물 소화의 장단점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '분말소화약제의 종류와 특성을 설명하시오.', answer: '제1종(NaHCO3), 제2종(KHCO3), 제3종(NH4H2PO4), 제4종(KHCO3+요소)', prompt: '소방설비기사(기계) 소방원론 문제입니다.\n\n문제: 분말소화약제의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제1종 분말\n2. 제2종 분말\n3. 제3종 분말\n4. 제4종 분말\n5. 적응 화재\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function FireTheoryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('fire-equipment-fire-theory-completed');
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
    localStorage.setItem('fire-equipment-fire-theory-completed', JSON.stringify(arr));
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
            <span className="text-orange-600 font-medium">소방원론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔥</span>
            <h1 className="text-2xl font-bold text-gray-800">소방원론 학습하기</h1>
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
