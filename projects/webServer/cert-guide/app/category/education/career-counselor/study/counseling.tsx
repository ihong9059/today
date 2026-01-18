'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'theories',
    name: '상담이론',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '정신분석 상담이론의 주요 개념을 설명하시오.', answer: '무의식, 자아방어기제, 전이, 자유연상, 꿈해석', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 정신분석 상담이론의 주요 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프로이트의 성격구조론 (원초아, 자아, 초자아)\n2. 무의식의 역할\n3. 방어기제의 종류와 기능\n4. 전이와 역전이\n5. 정신분석 기법 (자유연상, 꿈해석)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '인간중심 상담이론의 핵심 개념을 설명하시오.', answer: '자아실현경향, 무조건적 긍정적 존중, 공감적 이해, 일치성', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 인간중심 상담이론의 핵심 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 로저스의 인간관\n2. 자아실현 경향성\n3. 상담자의 3대 태도 (일치성, 무조건적 긍정적 존중, 공감적 이해)\n4. 충분히 기능하는 사람\n5. 상담과정과 변화 원리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '행동주의 상담이론의 원리를 설명하시오.', answer: '고전적 조건형성, 조작적 조건형성, 강화, 소거, 행동수정', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 행동주의 상담이론의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 행동주의 기본 가정\n2. 고전적 조건형성 (파블로프)\n3. 조작적 조건형성 (스키너)\n4. 강화와 처벌\n5. 행동수정 기법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '인지행동 상담이론을 설명하시오.', answer: '비합리적 신념, 인지적 왜곡, 자동적 사고, ABC모델', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 인지행동 상담이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 엘리스의 REBT (ABC모델)\n2. 비합리적 신념의 종류\n3. 벡의 인지치료\n4. 인지적 왜곡과 자동적 사고\n5. 인지재구조화 기법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '게슈탈트 상담이론의 주요 개념을 설명하시오.', answer: '알아차림, 지금-여기, 미해결과제, 접촉경계혼란', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 게슈탈트 상담이론의 주요 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 펄스의 게슈탈트 이론\n2. 알아차림(awareness)의 중요성\n3. 지금-여기(here and now)\n4. 미해결과제와 접촉경계혼란\n5. 게슈탈트 기법 (빈 의자, 역할교환)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'techniques',
    name: '상담기법',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '경청기술의 요소를 설명하시오.', answer: '주의집중, 최소 격려, 반영, 명료화, 요약', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 경청기술의 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경청의 중요성\n2. 주의집중 기술 (SOLER)\n3. 최소 격려와 침묵\n4. 반영과 재진술\n5. 명료화와 요약\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '질문기법의 종류를 설명하시오.', answer: '개방형 질문, 폐쇄형 질문, 탐색질문, 확인질문', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 질문기법의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개방형 질문의 특징과 활용\n2. 폐쇄형 질문의 특징과 활용\n3. 탐색질문 기법\n4. 확인질문과 명료화 질문\n5. 효과적인 질문 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '공감의 단계를 설명하시오.', answer: '1차 공감(감정반영), 2차 공감(의미반영), 3차 공감(깊이 공감)', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 공감의 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공감의 정의와 중요성\n2. 1차 공감 (감정 반영)\n3. 2차 공감 (의미 반영)\n4. 3차 공감 (깊이 있는 공감)\n5. 공감 반응의 실제 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '직면기법을 설명하시오.', answer: '모순 지적, 불일치 직면, 방어기제 다루기', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 직면기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직면의 정의와 목적\n2. 직면의 시기와 방법\n3. 모순과 불일치 다루기\n4. 직면 시 주의사항\n5. 효과적인 직면 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '해석과 재구성 기법을 설명하시오.', answer: '행동의 의미 해석, 인지 재구조화, 새로운 관점 제시', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 해석과 재구성 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 해석의 정의와 목적\n2. 해석의 시기와 수준\n3. 인지적 재구성\n4. 재구성의 원리와 방법\n5. 해석과 재구성의 실제 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'process',
    name: '상담과정',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '상담의 초기 단계를 설명하시오.', answer: '라포형성, 문제파악, 목표설정, 계약', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 상담의 초기 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 라포(rapport) 형성의 중요성\n2. 관계 형성 기법\n3. 문제 탐색 및 사정\n4. 상담 목표 설정\n5. 상담 계약 및 구조화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '상담의 중기 단계를 설명하시오.', answer: '문제탐색, 통찰촉진, 대안모색, 행동계획', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 상담의 중기 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 심층 탐색과 이해\n2. 통찰 촉진\n3. 문제 재정의\n4. 대안 탐색과 선택\n5. 행동계획 수립\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '상담의 종결 단계를 설명하시오.', answer: '종결준비, 성과평가, 재발방지, 추수상담', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 상담의 종결 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 종결 시기 판단\n2. 종결 준비와 예고\n3. 상담 성과 평가\n4. 재발 방지 전략\n5. 추수상담과 의뢰\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '사례개념화를 설명하시오.', answer: '문제분석, 원인파악, 개입전략, 예후예측', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 사례개념화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사례개념화의 정의와 목적\n2. 내담자 문제 분석\n3. 문제의 원인과 유지 요인\n4. 개입 전략 수립\n5. 예후 예측과 평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '상담자의 윤리를 설명하시오.', answer: '비밀보장, 이중관계금지, 고지된 동의, 전문성 유지', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 상담자의 윤리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비밀보장의 원칙과 예외\n2. 이중관계 금지\n3. 고지된 동의(informed consent)\n4. 전문성과 역량 유지\n5. 윤리적 딜레마 해결\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'group',
    name: '집단상담',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '집단상담의 장점을 설명하시오.', answer: '보편성, 상호작용, 피드백, 대인관계학습, 경제성', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 집단상담의 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보편성 경험\n2. 집단 응집력\n3. 대인관계 학습 기회\n4. 다양한 피드백\n5. 경제성과 효율성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '집단발달 단계를 설명하시오.', answer: '형성기, 과도기, 작업기, 종결기', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 집단발달 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 형성기(forming) 특징\n2. 과도기(storming) 특징과 대응\n3. 작업기(norming/performing) 활동\n4. 종결기(adjourning) 과제\n5. 각 단계별 지도자 역할\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '집단상담의 치료적 요인을 설명하시오.', answer: '희망고취, 보편성, 정보제공, 이타심, 카타르시스', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 집단상담의 치료적 요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 얄롬의 치료적 요인 11가지\n2. 희망 고취와 보편성\n3. 정보 제공과 이타심\n4. 카타르시스와 실존적 요인\n5. 치료적 요인의 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '집단지도자의 역할을 설명하시오.', answer: '촉진자, 관찰자, 모델, 중재자, 피드백 제공자', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 집단지도자의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 촉진자로서의 역할\n2. 관찰자로서의 역할\n3. 모델링 제공\n4. 갈등 중재\n5. 효과적인 피드백 제공\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '집단상담의 운영기법을 설명하시오.', answer: '선발, 구성, 규칙설정, 회기진행, 평가', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 집단상담의 운영기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단원 선발과 사전면담\n2. 집단 크기와 구성\n3. 집단 규칙 설정\n4. 회기 진행 방법\n5. 과정 평가와 종결\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'career',
    name: '직업상담',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '직업상담의 목표를 설명하시오.', answer: '자기이해, 직업세계 이해, 의사결정, 취업준비', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 직업상담의 목표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기 이해 증진\n2. 직업 세계 이해\n3. 합리적 의사결정\n4. 취업 준비와 적응\n5. 경력개발 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '직업상담의 과정을 설명하시오.', answer: '접수, 사정, 목표설정, 개입, 평가, 종결', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 직업상담의 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접수 및 관계형성\n2. 종합 사정 (적성, 흥미, 가치관)\n3. 상담 목표 설정\n4. 개입 전략 수립과 실행\n5. 평가 및 추수지도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '직업상담의 기법을 설명하시오.', answer: '심리검사, 직업정보제공, 역할연습, 의사결정훈련', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 직업상담의 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 심리검사 활용\n2. 직업정보 제공 방법\n3. 역할연습과 시뮬레이션\n4. 의사결정 훈련\n5. 취업기술 코칭\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '특수집단 직업상담을 설명하시오.', answer: '청소년, 여성, 장애인, 중장년, 다문화', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 특수집단 직업상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 진로상담 특성\n2. 여성 경력개발 상담\n3. 장애인 직업재활 상담\n4. 중장년 전직지원 상담\n5. 다문화가족 취업상담\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '온라인 직업상담을 설명하시오.', answer: '화상상담, 채팅상담, 이메일상담, 장단점', prompt: '직업상담사 2급 직업상담학 문제입니다.\n\n문제: 온라인 직업상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온라인 상담의 유형\n2. 화상 상담의 장단점\n3. 채팅 및 이메일 상담\n4. 온라인 상담 윤리\n5. 효과적인 운영 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function CounselingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('career-counselor-counseling-progress');
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
    localStorage.setItem('career-counselor-counseling-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-blue-600">교육·상담</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/career-counselor" className="text-gray-600 hover:text-blue-600">직업상담사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">직업상담학</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">💼</span>
            <h1 className="text-2xl font-bold text-gray-800">직업상담학 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">직업상담사 2급 필기시험 핵심 과목 - 상담이론과 기법</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-blue-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
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
