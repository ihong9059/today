'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'group-dynamics',
    name: '집단역동',
    color: 'from-emerald-500 to-green-500',
    questions: [
      { id: 1, question: '집단역동의 개념을 설명하시오.', answer: '집단 내 상호작용, 역동적 관계, 집단 에너지', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단역동의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단역동의 정의\n2. 집단 내 상호작용\n3. 역동적 관계의 특성\n4. 집단 에너지와 분위기\n5. 상담에서의 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '집단 응집력을 설명하시오.', answer: '집단 매력도, 소속감, "우리" 의식, 치료적 효과', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단 응집력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 응집력의 개념\n2. 응집력의 구성요소\n3. 응집력 형성 요인\n4. 치료적 효과\n5. 응집력 향상 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '집단 규범을 설명하시오.', answer: '명시적·암묵적 규칙, 행동 지침, 안전감 제공', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단 규범을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단 규범의 정의\n2. 명시적 vs 암묵적 규범\n3. 규범의 기능\n4. 규범 형성 과정\n5. 건설적 규범 만들기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '집단 내 역할을 설명하시오.', answer: '과업역할, 유지역할, 개인역할, 역할 고정화', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단 내 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과업 역할의 종류\n2. 유지 역할의 종류\n3. 개인 역할 (방해 역할)\n4. 역할 고정화 문제\n5. 역할 다양화 촉진\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '집단 갈등과 저항을 설명하시오.', answer: '자연스러운 현상, 건설적 해결, 집단 성장 기회', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단 갈등과 저항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 갈등과 저항의 원인\n2. 갈등의 유형\n3. 건설적 갈등 vs 파괴적 갈등\n4. 저항 다루기\n5. 갈등 해결 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'group-stages',
    name: '집단 발달 단계',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: 'Tuckman의 집단 발달 단계를 설명하시오.', answer: '형성기-혼란기-규범기-수행기-종결기', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: Tuckman의 집단 발달 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 형성기 (Forming)\n2. 혼란기 (Storming)\n3. 규범기 (Norming)\n4. 수행기 (Performing)\n5. 종결기 (Adjourning)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '집단상담의 초기 단계를 설명하시오.', answer: '관계 형성, 신뢰 구축, 목표 설정, 구조화', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단상담의 초기 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초기 단계의 특징\n2. 신뢰와 안전감 구축\n3. 목표와 규칙 설정\n4. 구조화의 중요성\n5. 상담자의 역할\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '집단상담의 작업 단계를 설명하시오.', answer: '깊은 자기개방, 피드백, 통찰, 행동 변화 시도', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단상담의 작업 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작업 단계의 특징\n2. 자기개방의 심화\n3. 상호 피드백\n4. 통찰과 행동 변화\n5. 상담자의 촉진 역할\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '집단상담의 종결 단계를 설명하시오.', answer: '정리, 평가, 분리불안, 일상 전이', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단상담의 종결 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 종결 단계의 과제\n2. 성과 정리와 평가\n3. 분리 불안 다루기\n4. 일상 전이 계획\n5. 후속 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '각 단계별 상담자 개입을 설명하시오.', answer: '단계별 적절한 리더십, 구조화-촉진-정리', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 각 단계별 상담자 개입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초기: 구조화와 안전감\n2. 혼란기: 갈등 촉진과 중재\n3. 작업기: 탐색 촉진\n4. 종결기: 정리와 전이\n5. 단계별 리더십 스타일\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'group-leadership',
    name: '집단상담 리더십',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      { id: 1, question: '집단상담자의 역할을 설명하시오.', answer: '촉진자, 모델, 전문가, 다리 역할', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단상담자의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 촉진자 역할\n2. 모델링 역할\n3. 전문가 역할\n4. 다리(linking) 역할\n5. 역할의 균형\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '집단상담자의 기술을 설명하시오.', answer: '경청, 반영, 질문, 해석, 직면, 피드백', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단상담자의 기술을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적극적 경청\n2. 반영과 공감\n3. 효과적 질문\n4. 해석과 직면\n5. 건설적 피드백\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '공동 리더십을 설명하시오.', answer: '2명의 상담자, 역할 분담, 장단점, 협력', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 공동 리더십을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공동 리더십의 장점\n2. 공동 리더십의 단점\n3. 역할 분담 방식\n4. 리더 간 협력\n5. 효과적 운영 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '집단상담에서 윤리적 이슈를 설명하시오.', answer: '비밀보장, 이중관계, 강압 방지, 집단원 보호', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단상담에서 윤리적 이슈를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비밀보장의 한계\n2. 이중관계 문제\n3. 강압과 압력 방지\n4. 취약한 구성원 보호\n5. 윤리적 의사결정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '어려운 집단원 다루기를 설명하시오.', answer: '독점자, 침묵자, 저항자, 공격자 대처', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 어려운 집단원 다루기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 독점하는 구성원\n2. 침묵하는 구성원\n3. 저항하는 구성원\n4. 공격적인 구성원\n5. 효과적 개입 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'group-types',
    name: '집단상담 유형',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      { id: 1, question: '구조화 집단과 비구조화 집단을 비교하시오.', answer: '활동 유무, 지시성, 청소년은 구조화 선호', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 구조화 집단과 비구조화 집단을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 구조화 집단의 특징\n2. 비구조화 집단의 특징\n3. 장단점 비교\n4. 청소년에게 적합한 형태\n5. 통합적 접근\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '심리교육 집단을 설명하시오.', answer: '정보 제공, 기술 훈련, 예방적 개입, 교육+상담', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 심리교육 집단을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 심리교육 집단의 목적\n2. 내용과 주제\n3. 진행 방식\n4. 교육과 상담의 통합\n5. 청소년 대상 프로그램\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '치료 집단을 설명하시오.', answer: '심리적 문제 치료, 깊은 탐색, 장기 개입', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 치료 집단을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 치료 집단의 목적\n2. 대상과 선별 기준\n3. 집단 구성과 크기\n4. 치료적 요인\n5. 진행 과정과 기간\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '성장 집단을 설명하시오.', answer: '자기 이해, 잠재력 개발, 대인관계 향상', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 성장 집단을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성장 집단의 목적\n2. 주요 주제와 활동\n3. 인본주의 접근\n4. 대인관계 훈련\n5. 청소년 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년 집단상담의 특성을 설명하시오.', answer: '발달 고려, 구조화, 활동 중심, 단기 개입', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 청소년 집단상담의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년기 발달 특성 반영\n2. 구조화의 필요성\n3. 활동과 매체 활용\n4. 단기-집중 개입\n5. 학교 집단상담\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'therapeutic-factors',
    name: '치료적 요인',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: 'Yalom의 치료적 요인을 설명하시오.', answer: '보편성, 희망, 이타심, 카타르시스, 학습 등 11가지', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: Yalom의 치료적 요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보편성 (Universality)\n2. 희망 고취 (Hope)\n3. 정보 제공\n4. 이타심\n5. 나머지 치료적 요인들\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '집단에서 피드백의 기능을 설명하시오.', answer: '자기 인식, 대인관계 패턴, 맹점 발견, 성장', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단에서 피드백의 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피드백의 중요성\n2. 효과적 피드백 특성\n3. 피드백 주고받기\n4. 자기 인식 증진\n5. 청소년 피드백 훈련\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '집단에서 대리 학습을 설명하시오.', answer: '타인 관찰, 모델링, 간접 경험, 사회학습이론', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단에서 대리 학습을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대리 학습의 개념\n2. Bandura 사회학습이론\n3. 모델링 과정\n4. 집단에서의 활용\n5. 긍정적 모델 제공\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '집단에서 카타르시스를 설명하시오.', answer: '감정 정화, 억압된 감정 표출, 안전한 환경', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단에서 카타르시스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 카타르시스의 의미\n2. 정서적 표출과 정화\n3. 안전한 환경의 중요성\n4. 표출 후 통합\n5. 청소년의 감정 표현\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '집단에서 대인관계 학습을 설명하시오.', answer: '사회적 소우주, 여기-지금, 관계 패턴 재현', prompt: '청소년상담사 집단상담의 기초 문제입니다.\n\n문제: 집단에서 대인관계 학습을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단은 사회적 소우주\n2. 여기-지금 상호작용\n3. 관계 패턴 재현\n4. 새로운 관계 시도\n5. 일상 전이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function GroupCounselingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-group-counseling-progress');
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
    localStorage.setItem('youth-counselor-group-counseling-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-emerald-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-emerald-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/youth-counselor" className="text-gray-600 hover:text-emerald-600">청소년상담사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">집단상담의 기초</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">👥</span>
            <h1 className="text-2xl font-bold text-gray-800">집단상담의 기초 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">청소년상담사 3급 필기시험 핵심 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-emerald-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}>
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
