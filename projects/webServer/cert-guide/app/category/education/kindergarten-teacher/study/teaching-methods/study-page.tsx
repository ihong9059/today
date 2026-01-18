'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'play',
    name: '놀이 지도',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '놀이의 교육적 가치를 설명하시오.', answer: '자발성, 즐거움, 과정중심, 내적동기, 비실제성', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 놀이의 교육적 가치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 놀이의 특성 (자발성, 즐거움, 과정중심, 내적동기, 비실제성)\n2. 인지발달과 놀이\n3. 사회성 발달과 놀이\n4. 정서발달과 놀이\n5. 창의성 발달과 놀이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '놀이 관찰과 기록을 설명하시오.', answer: '놀이 흐름 파악, 유아 이해, 지원 계획', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 놀이 관찰과 기록을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 놀이 관찰의 목적\n2. 놀이 흐름 파악\n3. 유아의 흥미와 요구 이해\n4. 관찰 기록 방법\n5. 놀이 지원 계획 수립\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '교사의 놀이 지원 방법을 설명하시오.', answer: '관찰, 상호작용, 환경 구성, 확장', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 교사의 놀이 지원 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 놀이 관찰과 민감성\n2. 적절한 상호작용\n3. 놀이 환경 구성\n4. 놀이 확장 지원\n5. 놀이와 배움의 연결\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '실내·외 놀이 지도를 설명하시오.', answer: '자유놀이, 바깥놀이, 전이시간 활용', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 실내·외 놀이 지도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실내 자유놀이 운영\n2. 바깥놀이의 중요성과 운영\n3. 전이시간 활용\n4. 놀이 안전 지도\n5. 정리정돈 지도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '놀이와 배움의 연결을 설명하시오.', answer: '놀이 속 배움 발견, 확장 활동, 기록', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 놀이와 배움의 연결을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 놀이 속 배움 발견\n2. 유아의 배움 의미 파악\n3. 배움의 확장 지원\n4. 놀이 기록과 공유\n5. 교육과정과의 연결\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'interaction',
    name: '교사-유아 상호작용',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '긍정적 상호작용의 원리를 설명하시오.', answer: '존중, 경청, 반응적 상호작용, 온정적 분위기', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 긍정적 상호작용의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유아 존중과 수용\n2. 경청과 공감\n3. 반응적 상호작용\n4. 온정적 분위기 조성\n5. 긍정적 언어 사용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '개방적 질문과 확장적 질문을 설명하시오.', answer: '개방형 vs 폐쇄형, 사고 확장, 창의성 촉진', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 개방적 질문과 확장적 질문을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개방형 질문과 폐쇄형 질문\n2. 사고를 확장하는 질문\n3. 창의성을 촉진하는 질문\n4. 적절한 질문 시기\n5. 질문 기법 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '비계설정(Scaffolding)을 설명하시오.', answer: '근접발달영역, 적절한 도움, 점진적 독립', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 비계설정(Scaffolding)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비고츠키의 근접발달영역\n2. 비계설정의 개념\n3. 적절한 수준의 도움 제공\n4. 점진적 독립 유도\n5. 비계설정 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '문제행동 지도 방법을 설명하시오.', answer: '원인 파악, 긍정적 행동 지원, 일관성', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 문제행동 지도 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문제행동의 원인 파악\n2. 긍정적 행동 지원 (PBS)\n3. 일관된 규칙 적용\n4. 대체 행동 가르치기\n5. 부모와의 협력\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '또래 간 상호작용 촉진을 설명하시오.', answer: '협력놀이, 갈등해결, 친사회적 행동', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 또래 간 상호작용 촉진을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 협력놀이 기회 제공\n2. 또래와의 갈등해결 지도\n3. 친사회적 행동 격려\n4. 소외 유아 지원\n5. 긍정적 또래문화 형성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'methods',
    name: '교수학습 방법',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '프로젝트 접근법을 설명하시오.', answer: '준비-시작-전개-마무리 단계, 심층 탐구', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 프로젝트 접근법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프로젝트 접근법의 개념 (Katz & Chard)\n2. 4단계 (준비-시작-전개-마무리)\n3. 심층 탐구의 특징\n4. 교사의 역할\n5. 프로젝트 평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '이야기나누기 활동을 설명하시오.', answer: '도입-전개-마무리, 참여 촉진, 경청', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 이야기나누기 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이야기나누기의 교육적 가치\n2. 도입-전개-마무리 구성\n3. 유아 참여 촉진 방법\n4. 경청 태도 지도\n5. 다양한 자료 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '동화 활동 지도를 설명하시오.', answer: '책 선정, 읽어주기, 확장활동', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 동화 활동 지도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발달에 적합한 책 선정\n2. 동화 읽어주기 방법\n3. 상호작용적 읽기\n4. 동화 확장활동 (극화, 미술 등)\n5. 책에 대한 흥미 증진\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '음악·동작 활동 지도를 설명하시오.', answer: '노래, 악기연주, 감상, 신체표현', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 음악·동작 활동 지도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 노래 부르기 지도\n2. 악기 연주 활동\n3. 음악 감상\n4. 신체표현 및 창의적 동작\n5. 통합적 음악 활동\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '과학 탐구 활동 지도를 설명하시오.', answer: '관찰, 예측, 실험, 결과 공유', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 과학 탐구 활동 지도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탐구과정 기술 (관찰, 분류, 측정, 예측)\n2. 실험 활동 계획\n3. 안전한 과학 활동\n4. 결과 공유 및 토의\n5. 일상 속 과학 경험\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'daily',
    name: '일과 운영',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '하루 일과 구성을 설명하시오.', answer: '등원, 자유놀이, 대·소집단, 바깥놀이, 귀가', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 하루 일과 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 하루 일과의 기본 틀\n2. 등원 및 맞이하기\n3. 자유놀이 시간 충분히 확보\n4. 대·소집단 활동\n5. 바깥놀이 및 귀가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '자유놀이 시간 운영을 설명하시오.', answer: '유아 선택, 충분한 시간, 다양한 영역', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 자유놀이 시간 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자유놀이 시간의 중요성\n2. 유아의 자발적 선택 존중\n3. 충분한 시간 제공\n4. 다양한 흥미영역 활용\n5. 교사의 관찰과 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '대·소집단 활동 운영을 설명하시오.', answer: '이야기나누기, 동화, 음악, 게임', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 대·소집단 활동 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대집단 활동의 종류와 운영\n2. 소집단 활동의 장점\n3. 집중시간 고려\n4. 참여 격려 방법\n5. 활동 간 균형\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '전이시간 운영을 설명하시오.', answer: '예측 가능, 부드러운 전환, 기다림 최소화', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 전이시간 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전이시간의 의미\n2. 예측 가능한 일과 운영\n3. 부드러운 전환 전략\n4. 기다림 시간 최소화\n5. 개별 유아의 속도 존중\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '기본생활습관 지도를 설명하시오.', answer: '식사, 낮잠, 화장실, 청결', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 기본생활습관 지도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 식사 및 간식 지도\n2. 낮잠 및 휴식 지도\n3. 화장실 사용 지도\n4. 청결 습관 지도\n5. 가정과의 연계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'parents',
    name: '부모 및 지역사회 연계',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '부모 참여 활동을 설명하시오.', answer: '참관, 참여수업, 재능기부, 부모교육', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 부모 참여 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 참관 및 참여수업\n2. 부모 재능기부\n3. 부모교육 운영\n4. 학부모 상담\n5. 부모-교사 협력 증진\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '부모 상담을 설명하시오.', answer: '개별 상담, 관찰 정보 공유, 협력적 태도', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 부모 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상담의 목적과 중요성\n2. 개별 상담 준비 및 진행\n3. 관찰 정보 및 발달 상황 공유\n4. 협력적·존중적 태도\n5. 비밀 보장 및 윤리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '가정 연계 활동을 설명하시오.', answer: '알림장, 주간계획, 가정학습, 행사', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 가정 연계 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 알림장 및 소식지\n2. 주간 교육계획 공유\n3. 가정학습 연계\n4. 가족 참여 행사\n5. 온라인 소통 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '지역사회 연계 활동을 설명하시오.', answer: '견학, 지역자원 활용, 봉사활동', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 지역사회 연계 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지역사회 견학 (도서관, 소방서 등)\n2. 지역 인적·물적 자원 활용\n3. 지역사회 봉사활동\n4. 지역 문화 경험\n5. 안전한 견학 운영\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '다문화·장애통합 교육을 설명하시오.', answer: '다양성 존중, 통합교육, 개별화 지원', prompt: '유치원 임용시험 유아교육방법론 문제입니다.\n\n문제: 다문화·장애통합 교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다문화 교육 (다양성 존중)\n2. 장애통합교육의 의의\n3. 개별화 교육 지원\n4. 또래 관계 형성 지원\n5. 전문가 및 가족과의 협력\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function TeachingMethodsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('kindergarten-teacher-teaching-methods-progress');
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
    localStorage.setItem('kindergarten-teacher-teaching-methods-progress', JSON.stringify(arr));
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
            <Link href="/category/education/kindergarten-teacher" className="text-gray-600 hover:text-indigo-600">유치원정교사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">유아교육방법론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎓</span>
            <h1 className="text-2xl font-bold text-gray-800">유아교육방법론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">유치원 임용시험 - 놀이와 교수학습 방법</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-indigo-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-violet-50 border-violet-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-violet-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-violet-500 text-white hover:bg-violet-600'}`}>
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
