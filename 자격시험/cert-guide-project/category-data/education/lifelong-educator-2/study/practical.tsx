'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'adult-learning',
    name: '성인학습자 이해',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '성인학습자의 특성을 설명하시오.', answer: '자기주도성, 경험 풍부, 실용성 중시, 학습동기 명확', prompt: '평생교육사 2급 성인학습및상담 문제입니다.\n\n문제: 성인학습자의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기주도적 학습 특성\n2. 풍부한 경험과 배경\n3. 실용성 및 문제중심 학습\n4. 명확한 학습동기\n5. 시간적·경제적 제약\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '성인의 발달 단계를 설명하시오.', answer: '청년기, 중년기, 노년기, 생애전환기', prompt: '평생교육사 2급 성인학습및상담 문제입니다.\n\n문제: 성인의 발달 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청년기 (20-30대) 발달과제\n2. 중년기 (40-50대) 발달과제\n3. 노년기 (60대 이상) 발달과제\n4. 생애전환기 특성\n5. 발달단계별 교육적 접근\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '성인학습 동기이론을 설명하시오.', answer: '내재적·외재적 동기, 자기결정성, 기대-가치', prompt: '평생교육사 2급 성인학습및상담 문제입니다.\n\n문제: 성인학습 동기이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내재적 동기와 외재적 동기\n2. 자기결정성 이론 (Deci & Ryan)\n3. 기대-가치 이론\n4. 성인의 학습참여 동기\n5. 동기 유지 및 강화 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'counseling',
    name: '상담 이론과 기법',
    color: 'from-rose-500 to-red-500',
    questions: [
      { id: 1, question: '상담의 기본 원리를 설명하시오.', answer: '수용, 공감, 경청, 비밀보장, 내담자 중심', prompt: '평생교육사 2급 성인학습및상담 문제입니다.\n\n문제: 상담의 기본 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무조건적 긍정적 수용\n2. 공감적 이해\n3. 적극적 경청\n4. 비밀보장과 윤리\n5. 내담자 중심 접근\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '상담 이론을 설명하시오.', answer: '정신분석, 인간중심, 인지행동, 현실치료, 해결중심', prompt: '평생교육사 2급 성인학습및상담 문제입니다.\n\n문제: 상담 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정신분석 상담 (프로이트)\n2. 인간중심 상담 (로저스)\n3. 인지행동 상담 (Beck, Ellis)\n4. 현실치료 (Glasser)\n5. 해결중심 단기상담\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '상담 기법을 설명하시오.', answer: '경청, 반영, 질문, 요약, 해석, 직면', prompt: '평생교육사 2급 성인학습및상담 문제입니다.\n\n문제: 상담 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적극적 경청 (active listening)\n2. 반영 (reflection)\n3. 개방형·폐쇄형 질문\n4. 요약 (summarizing)\n5. 직면 (confrontation)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'career-counseling',
    name: '진로·학습 상담',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '진로상담을 설명하시오.', answer: '진로탐색, 적성검사, 의사결정, 진로전환', prompt: '평생교육사 2급 성인학습및상담 문제입니다.\n\n문제: 진로상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성인 진로발달 특성\n2. 진로탐색 및 자기이해\n3. 적성·흥미 검사 활용\n4. 진로 의사결정 지원\n5. 진로전환 및 재취업 상담\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '학습상담을 설명하시오.', answer: '학습진단, 학습전략, 시간관리, 동기부여', prompt: '평생교육사 2급 성인학습및상담 문제입니다.\n\n문제: 학습상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습진단 (학습스타일, 선호도)\n2. 효과적인 학습전략 지도\n3. 시간관리 및 계획 수립\n4. 학습동기 유지 지원\n5. 학습장애 요인 해결\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '생애설계 상담을 설명하시오.', answer: '생애목표, 경력개발, 일-생활 균형, 생애전환', prompt: '평생교육사 2급 성인학습및상담 문제입니다.\n\n문제: 생애설계 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 생애목표 설정\n2. 경력개발 계획\n3. 일-생활 균형 (work-life balance)\n4. 생애전환기 지원\n5. 은퇴 후 생활 설계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'group-counseling',
    name: '집단상담 및 프로그램',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '집단상담의 특성을 설명하시오.', answer: '집단역동, 상호작용, 보편성, 피드백', prompt: '평생교육사 2급 성인학습및상담 문제입니다.\n\n문제: 집단상담의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단상담의 개념과 목적\n2. 집단역동 (group dynamics)\n3. 상호작용과 피드백\n4. 보편성과 희망 고취\n5. 집단상담의 장점과 한계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '집단상담 진행 과정을 설명하시오.', answer: '초기-과도기-작업기-종결기, 집단규범, 응집력', prompt: '평생교육사 2급 성인학습및상담 문제입니다.\n\n문제: 집단상담 진행 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초기 단계 (신뢰형성, 규범설정)\n2. 과도기 단계 (갈등, 저항)\n3. 작업 단계 (깊이있는 작업)\n4. 종결 단계 (마무리, 평가)\n5. 집단 리더의 역할\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '집단상담 프로그램 사례를 설명하시오.', answer: '자기성장, 대인관계, 스트레스관리, 진로탐색', prompt: '평생교육사 2급 성인학습및상담 문제입니다.\n\n문제: 집단상담 프로그램 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기성장 집단 (자존감, 자기이해)\n2. 대인관계 집단 (의사소통, 갈등해결)\n3. 스트레스 관리 집단\n4. 진로탐색 집단\n5. 성인학습자 대상 프로그램 설계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'field-practice',
    name: '현장실습',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '평생교육 현장실습의 목적을 설명하시오.', answer: '이론-실무 연계, 현장 경험, 직무 이해, 전문성 개발', prompt: '평생교육사 2급 현장실습 문제입니다.\n\n문제: 평생교육 현장실습의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론과 실무의 연계\n2. 평생교육 현장 경험\n3. 평생교육사 직무 이해\n4. 전문성 및 역량 개발\n5. 실습을 통한 자기성찰\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '실습 기관의 종류와 업무를 설명하시오.', answer: '평생학습관, 대학평생교육원, 직업훈련기관, 사회복지시설', prompt: '평생교육사 2급 현장실습 문제입니다.\n\n문제: 실습 기관의 종류와 업무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평생학습관 실습 업무\n2. 대학 평생교육원 실습 업무\n3. 직업훈련기관 실습 업무\n4. 사회복지시설 실습 업무\n5. 기관별 특성과 실습 내용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '실습일지 작성 방법을 설명하시오.', answer: '날짜·시간, 실습내용, 배운점, 성찰, 슈퍼비전', prompt: '평생교육사 2급 현장실습 문제입니다.\n\n문제: 실습일지 작성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실습일지 구성 요소\n2. 실습 내용 기록 방법\n3. 배운 점과 느낀 점\n4. 성찰적 기록 (reflection)\n5. 슈퍼바이저 피드백 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('lifelong-educator-practical-progress');
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
    localStorage.setItem('lifelong-educator-practical-progress', JSON.stringify(arr));
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
            <span className="text-indigo-600 font-medium">성인학습및상담 + 실습</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <h1 className="text-2xl font-bold text-gray-800">성인학습및상담 + 실습 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">평생교육사 2급 필수과목 - 성인학습자 이해 및 상담기법</p>
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
