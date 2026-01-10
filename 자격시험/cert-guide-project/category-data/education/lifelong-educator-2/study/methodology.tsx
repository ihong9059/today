'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'teaching-theory',
    name: '교수학습 이론',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '행동주의 학습이론을 설명하시오.', answer: '자극-반응, 강화, 조건형성 (파블로프, 스키너)', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 행동주의 학습이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 행동주의 기본 원리\n2. 파블로프의 고전적 조건형성\n3. 스키너의 조작적 조건형성\n4. 강화와 처벌\n5. 성인교육에의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '인지주의 학습이론을 설명하시오.', answer: '정보처리, 스키마, 인지구조 (피아제, 브루너)', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 인지주의 학습이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인지주의 기본 원리\n2. 피아제의 인지발달 이론\n3. 브루너의 발견학습\n4. 정보처리 이론\n5. 성인 인지 특성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '구성주의 학습이론을 설명하시오.', answer: '지식구성, 사회적 구성주의, 비고츠키, 상황학습', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 구성주의 학습이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구성주의 기본 원리\n2. 비고츠키의 사회문화적 이론\n3. 근접발달영역 (ZPD)\n4. 비계설정 (Scaffolding)\n5. 평생교육에의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '전이학습 이론을 설명하시오.', answer: '학습의 전이, 근전이, 원전이, 메타인지', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 전이학습 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습전이 개념\n2. 근전이와 원전이\n3. 긍정적 전이와 부정적 전이\n4. 전이 촉진 전략\n5. 메타인지와 전이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '동기이론을 설명하시오.', answer: '내재적 동기, 외재적 동기, 자기결정성 이론, 기대-가치 이론', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 동기이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내재적 동기와 외재적 동기\n2. 자기결정성 이론 (Deci & Ryan)\n3. 기대-가치 이론\n4. 성인학습자 동기 특성\n5. 동기 촉진 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'teaching-method',
    name: '교수방법',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '강의법의 특징과 활용을 설명하시오.', answer: '일방적 전달, 효율적, 대규모 가능, 수동적 학습', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 강의법의 특징과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강의법의 개념과 특징\n2. 강의법의 장점과 단점\n3. 효과적인 강의 전략\n4. 성인학습자 대상 강의 요령\n5. 강의법 개선 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '토의법을 설명하시오.', answer: '소집단 토의, 브레인스토밍, 버즈토의, 포럼', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 토의법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 토의법의 개념과 목적\n2. 소집단 토의 진행 방법\n3. 브레인스토밍 기법\n4. 버즈토의, 패널토의, 심포지엄\n5. 토의 촉진자 역할\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '협동학습을 설명하시오.', answer: '소집단 협력, 상호의존, 직소, STAD', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 협동학습을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 협동학습 개념과 원리\n2. 긍정적 상호의존성\n3. Jigsaw (직소) 기법\n4. STAD (Student Teams Achievement Divisions)\n5. 성인교육에서의 협동학습\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '문제기반학습(PBL)을 설명하시오.', answer: '실제 문제, 자기주도학습, 협력학습, 튜터 역할', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 문제기반학습(PBL)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PBL 개념과 특징\n2. PBL 진행 절차\n3. 문제 설계 원리\n4. 튜터의 역할\n5. PBL의 장점과 유의점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '사례연구법을 설명하시오.', answer: '실제 사례, 분석, 토론, 의사결정 연습', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 사례연구법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사례연구법 개념\n2. 사례 선정 기준\n3. 사례연구 진행 절차\n4. 사례 분석 방법\n5. 하버드 사례연구법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'media',
    name: '교육매체 활용',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '시청각 교육매체를 설명하시오.', answer: 'PPT, 동영상, 오디오, 시각자료, 멀티미디어', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 시청각 교육매체를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시청각 매체의 종류\n2. 파워포인트 활용 전략\n3. 동영상 제작 및 활용\n4. 시각자료 디자인 원리\n5. 멀티미디어 통합 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '이러닝을 설명하시오.', answer: '온라인 학습, LMS, 비동기·동기 학습, 상호작용', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 이러닝을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이러닝 개념과 특징\n2. LMS (학습관리시스템)\n3. 비동기 학습과 동기 학습\n4. 온라인 상호작용 전략\n5. 이러닝 설계 원리 (ADDIE)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '블렌디드러닝을 설명하시오.', answer: '온·오프라인 혼합, 플립러닝, 하이브리드', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 블렌디드러닝을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 블렌디드러닝 개념\n2. 블렌디드러닝 모형\n3. 플립러닝 (거꾸로 교실)\n4. 온·오프라인 연계 전략\n5. 블렌디드러닝 설계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '모바일러닝을 설명하시오.', answer: '스마트폰, 태블릿, 앱 기반, 마이크로러닝', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 모바일러닝을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 모바일러닝 개념과 특징\n2. 모바일러닝의 장점\n3. 학습 앱 활용\n4. 마이크로러닝 (짧은 학습 콘텐츠)\n5. 모바일러닝 설계 고려사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'AR/VR 등 신기술을 활용한 교육을 설명하시오.', answer: '증강현실, 가상현실, 메타버스, 몰입형 학습', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: AR/VR 등 신기술을 활용한 교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AR (증강현실) 교육 활용\n2. VR (가상현실) 교육 활용\n3. 메타버스 학습 공간\n4. 몰입형 학습 경험\n5. 신기술 활용의 과제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'facilitation',
    name: '학습촉진 기법',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '성인학습 촉진자의 역할을 설명하시오.', answer: '안내자, 조력자, 자원제공자, 피드백 제공', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 성인학습 촉진자의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 촉진자(facilitator) 개념\n2. 교수자와 촉진자의 차이\n3. 학습 환경 조성\n4. 학습자 자율성 지원\n5. 촉진적 질문 기법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '아이스브레이킹 기법을 설명하시오.', answer: '긴장완화, 친밀감 형성, 게임, 자기소개', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 아이스브레이킹 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 아이스브레이킹 목적\n2. 자기소개 활동\n3. 팀빌딩 게임\n4. 에너자이저 활동\n5. 상황별 적용 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '질문법을 설명하시오.', answer: '개방형 질문, 폐쇄형 질문, 소크라테스식 질문, 성찰적 질문', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 질문법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개방형 vs 폐쇄형 질문\n2. 소크라테스식 질문법\n3. 성찰적 질문\n4. 효과적인 질문 기법\n5. 질문에 대한 응답 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '피드백 제공 방법을 설명하시오.', answer: '즉각적, 구체적, 긍정적, 건설적, 샌드위치 기법', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 피드백 제공 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 효과적인 피드백 원리\n2. 즉각적이고 구체적인 피드백\n3. 샌드위치 피드백 기법\n4. 동료 피드백 활용\n5. 성인학습자 피드백 유의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '학습분위기 조성 방법을 설명하시오.', answer: '안전한 환경, 존중, 참여 유도, 물리적 환경', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 학습분위기 조성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 심리적 안전감 형성\n2. 상호존중 분위기\n3. 적극적 참여 유도\n4. 물리적 환경 배치\n5. 학습공동체 문화 조성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'assessment',
    name: '평가방법',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '평가의 유형을 설명하시오.', answer: '진단평가, 형성평가, 총괄평가, 준거참조평가, 규준참조평가', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 평가의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 진단평가·형성평가·총괄평가\n2. 준거참조평가 vs 규준참조평가\n3. 양적평가 vs 질적평가\n4. 자기평가, 동료평가, 교수자평가\n5. 성인교육 평가 특성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '수행평가를 설명하시오.', answer: '실제 수행, 과정 중시, 루브릭, 포트폴리오', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 수행평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수행평가 개념과 특징\n2. 수행평가 유형 (발표, 토론, 프로젝트)\n3. 루브릭 (평가준거) 개발\n4. 포트폴리오 평가\n5. 수행평가의 장점과 유의점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '학습성찰 기법을 설명하시오.', answer: '성찰일지, 학습일지, 비판적 성찰, 메타인지', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 학습성찰 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성찰적 학습 개념\n2. 성찰일지 작성 방법\n3. 비판적 성찰 질문\n4. 메타인지적 성찰\n5. 성찰을 통한 학습 개선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '학습자 참여 평가를 설명하시오.', answer: '자기평가, 동료평가, 상호평가, 협력적 평가', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 학습자 참여 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기평가 방법과 효과\n2. 동료평가 절차\n3. 상호평가 (피드백 교환)\n4. 평가 기준 공동 개발\n5. 참여 평가의 교육적 의미\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '형성평가와 피드백을 설명하시오.', answer: '학습과정 중 평가, 즉각 피드백, 학습 개선', prompt: '평생교육사 2급 평생교육방법론 문제입니다.\n\n문제: 형성평가와 피드백을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 형성평가의 목적과 특징\n2. 형성평가 시기와 방법\n3. 즉각적 피드백 제공\n4. 피드백 기반 학습 조정\n5. 온라인 환경의 형성평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function MethodologyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('lifelong-educator-methodology-progress');
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
    localStorage.setItem('lifelong-educator-methodology-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-indigo-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/lifelong-educator" className="text-gray-600 hover:text-indigo-600">평생교육사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">평생교육방법론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <h1 className="text-2xl font-bold text-gray-800">평생교육방법론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">평생교육사 2급 필수과목 - 교수학습 방법과 전략</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-indigo-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}>
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
