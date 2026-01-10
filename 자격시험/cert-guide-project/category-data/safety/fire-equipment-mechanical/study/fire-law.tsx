'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'fire-basic-law',
    name: '소방기본법',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '소방기본법의 목적과 적용범위를 설명하시오.', answer: '화재예방·경계·진압, 국민생명·신체·재산보호, 공공안전·복리증진', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방기본법의 목적과 적용범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소방기본법 목적\n2. 적용 범위\n3. 국가와 지방자치단체 책무\n4. 소방력 기준\n5. 다른 법과의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '화재의 예방조치와 소방대상물 관계인의 의무를 설명하시오.', answer: '화기취급 감독, 피난시설 유지관리, 소방활동 방해금지', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 화재의 예방조치와 소방대상물 관계인의 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관계인의 정의\n2. 화재예방 의무\n3. 소방시설 유지관리\n4. 피난시설 관리\n5. 위반 시 처벌\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '소방활동과 소방대의 긴급통행을 설명하시오.', answer: '소방대 우선통행, 긴급차량 양보의무, 소방활동구역 설정', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방활동과 소방대의 긴급통행을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소방대 우선통행권\n2. 긴급통행 방해 금지\n3. 소방활동구역 설정\n4. 강제처분 권한\n5. 보상 규정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '화재의 조사와 보고를 설명하시오.', answer: '화재원인조사, 피해조사, 화재통계, 관할서장 보고의무', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 화재의 조사와 보고를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화재조사 목적\n2. 조사 주체와 권한\n3. 화재원인 판정\n4. 보고 의무\n5. 통계 작성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '소방용수시설과 소방출동로를 설명하시오.', answer: '소화전 설치기준(100m 이내), 급수탑, 저수조, 소방차 전용구역', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방용수시설과 소방출동로를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소화전 설치기준\n2. 급수탑 설치\n3. 저수조 설치\n4. 소방출동로 확보\n5. 소방차 전용구역\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'fire-prevention-law',
    name: '화재예방법',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '화재예방법의 목적과 특정소방대상물을 설명하시오.', answer: '화재·재난·재해 예방, 특정소방대상물: 근린생활시설, 판매·업무·숙박시설 등', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 화재예방법의 목적과 특정소방대상물을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화재예방법 목적\n2. 특정소방대상물 정의\n3. 대상물 분류\n4. 규모별 구분\n5. 적용 법령\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '소방안전관리자의 선임과 업무를 설명하시오.', answer: '1급·2급·3급 구분, 특급대상물 1급, 방화관리업무, 자위소방대 조직', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방안전관리자의 선임과 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임 대상\n2. 등급별 구분\n3. 선임 기준\n4. 업무 내용\n5. 교육 의무\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '소방계획서와 피난계획을 설명하시오.', answer: '소방시설 관리, 자위소방대 편성, 피난훈련 실시, 소방훈련 연2회', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방계획서와 피난계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소방계획서 작성\n2. 피난계획 수립\n3. 자위소방대 편성\n4. 소방훈련 실시\n5. 제출 및 보고\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '다중이용업소 안전관리를 설명하시오.', answer: '노래연습장, PC방, 영화상영관, 실내게임장 등 / 안전시설 기준 강화', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 다중이용업소 안전관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다중이용업소 정의\n2. 안전시설 기준\n3. 영업허가 조건\n4. 정기점검 의무\n5. 안전교육 실시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '화기취급 감독과 특수가연물 저장·취급을 설명하시오.', answer: '용접·용단 작업 허가, 특수가연물 지정수량, 저장·취급 기준', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 화기취급 감독과 특수가연물을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화기취급 감독자\n2. 작업허가 절차\n3. 특수가연물 정의\n4. 지정수량\n5. 저장·취급 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'fire-facility-law',
    name: '소방시설법',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '소방시설의 종류를 설명하시오.', answer: '소화설비, 경보설비, 피난설비, 소화용수설비, 소화활동설비', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방시설의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소화설비 종류\n2. 경보설비 종류\n3. 피난설비 종류\n4. 소화용수설비\n5. 소화활동설비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '소방시설 설치·유지 및 안전관리를 설명하시오.', answer: '특정소방대상물별 설치기준, 성능위주설계, 자체점검, 종합정밀점검', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방시설 설치·유지 및 안전관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 대상\n2. 설치 기준\n3. 자체점검\n4. 종합정밀점검\n5. 유지관리 의무\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '소방시설공사업과 감리업을 설명하시오.', answer: '설계·시공·감리 등록, 소방기술자 배치기준, 착공신고, 완공검사', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방시설공사업과 감리업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공사업 등록\n2. 감리업 등록\n3. 기술인력 기준\n4. 착공신고\n5. 완공검사\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '성능위주설계와 소방시설 성능시험을 설명하시오.', answer: '30층 이상, 연면적 20만㎡ 이상 등 / 화재·피난 시뮬레이션', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 성능위주설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성능위주설계 대상\n2. 설계 방법\n3. 화재 시뮬레이션\n4. 피난 시뮬레이션\n5. 평가 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '소방시설 자체점검과 정기점검을 설명하시오.', answer: '작동점검(연2회), 종합정밀점검(연1회), 점검인력 배치, 점검결과 보고', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 소방시설 자체점검을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작동점검\n2. 종합정밀점검\n3. 점검 대상\n4. 점검자 자격\n5. 결과 보고\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'hazmat-law',
    name: '위험물안전관리법',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '위험물의 종류와 지정수량을 설명하시오.', answer: '제1류~제6류 / 지정수량: 제4류 휘발유 200L, 경유 1000L', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 위험물의 종류와 지정수량을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위험물 6류 분류\n2. 지정수량 개념\n3. 류별 지정수량\n4. 배수 계산\n5. 규제 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '위험물제조소등의 종류를 설명하시오.', answer: '제조소, 저장소(옥내·옥외·옥상·지하·간이·이동), 취급소(주유·판매·이송)', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 위험물제조소등의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조소\n2. 저장소 종류\n3. 취급소 종류\n4. 각각의 정의\n5. 허가 대상\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '위험물안전관리자의 선임과 업무를 설명하시오.', answer: '갑종·을종·병종, 제조소등 감독, 안전교육 이수, 위험물 취급 감독', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 위험물안전관리자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임 대상\n2. 자격 등급\n3. 선임 기준\n4. 업무 내용\n5. 교육 의무\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '제조소의 위치·구조·설비 기준을 설명하시오.', answer: '보유공지, 방유제, 피뢰침, 경계표지, 소화설비, 자동화재탐지설비', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 제조소의 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위치 기준\n2. 구조 기준\n3. 보유공지\n4. 방유제 설치\n5. 소화설비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '옥내저장소의 기준과 소화설비를 설명하시오.', answer: '바닥면적 1000㎡ 이하, 연면적 1000㎡당 구획, 스프링클러·물분무·포소화설비', prompt: '소방설비기사(기계) 소방관계법규 문제입니다.\n\n문제: 옥내저장소의 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구조 기준\n2. 면적 제한\n3. 구획 기준\n4. 소화설비 설치\n5. 환기설비\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function FireLawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('fire-equipment-fire-law-completed');
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
    localStorage.setItem('fire-equipment-fire-law-completed', JSON.stringify(arr));
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
            <span className="text-orange-600 font-medium">소방관계법규</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚖️</span>
            <h1 className="text-2xl font-bold text-gray-800">소방관계법규 학습하기</h1>
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
