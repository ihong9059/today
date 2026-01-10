'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'program-planning',
    name: '프로그램 기획',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: '청소년활동 프로그램 개발의 기본원리를 설명하시오.', answer: '자발성, 자율성, 창의성, 다양성 존중 및 청소년 욕구 반영', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 청소년활동 프로그램 개발의 기본원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자발성 원리\n2. 자율성 원리\n3. 창의성 원리\n4. 다양성 원리\n5. 욕구조사 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '프로그램 기획 단계를 설명하시오.', answer: '욕구조사 → 목표설정 → 프로그램 설계 → 실행계획 수립', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 프로그램 기획 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 욕구조사 및 분석\n2. 목표 설정\n3. 프로그램 설계\n4. 실행계획 수립\n5. 예산 편성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'SMART 목표설정 기법을 설명하시오.', answer: 'Specific(구체적), Measurable(측정가능), Achievable(달성가능), Relevant(관련성), Time-bound(시한)', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: SMART 목표설정 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Specific (구체적)\n2. Measurable (측정가능)\n3. Achievable (달성가능)\n4. Relevant (관련성)\n5. Time-bound (시한)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '로직모델(Logic Model)을 설명하시오.', answer: '투입 → 활동 → 산출 → 성과 → 영향의 논리적 흐름', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 로직모델(Logic Model)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 로직모델의 개념\n2. 투입(Input)\n3. 활동(Activities)\n4. 산출(Output)\n5. 성과(Outcome)와 영향(Impact)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년 참여형 프로그램 기획 방법을 설명하시오.', answer: '청소년 기획단 구성, 의견수렴, 공동기획, 자율적 의사결정', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 청소년 참여형 프로그램 기획 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 참여의 의의\n2. 청소년 기획단 구성\n3. 의견수렴 방법\n4. 공동기획 과정\n5. 참여의 효과\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'program-operation',
    name: '프로그램 운영',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      { id: 1, question: '청소년활동 프로그램 실행 절차를 설명하시오.', answer: '사전준비 → 오리엔테이션 → 본 활동 → 정리 → 사후관리', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 청소년활동 프로그램 실행 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사전 준비\n2. 오리엔테이션\n3. 본 활동 진행\n4. 정리 및 마무리\n5. 사후관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '집단역학을 활용한 프로그램 운영을 설명하시오.', answer: '집단형성 → 갈등 → 규범화 → 수행 → 해체 단계 이해 및 활용', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 집단역학을 활용한 프로그램 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단형성 단계\n2. 갈등 단계\n3. 규범화 단계\n4. 수행 단계\n5. 해체 단계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '아이스브레이킹(Ice Breaking) 기법을 설명하시오.', answer: '긴장완화, 친밀감 형성, 참여동기 부여를 위한 도입 활동', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 아이스브레이킹(Ice Breaking) 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 아이스브레이킹의 목적\n2. 활용 시기\n3. 기법의 종류\n4. 진행 시 유의사항\n5. 효과적인 활용 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '퍼실리테이션(Facilitation) 기법을 설명하시오.', answer: '청소년의 자발적 참여와 상호작용을 촉진하는 촉진자 역할', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 퍼실리테이션(Facilitation) 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퍼실리테이션의 개념\n2. 퍼실리테이터의 역할\n3. 주요 기법\n4. 질문 기술\n5. 효과\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년활동 안전관리를 설명하시오.', answer: '사전 안전점검, 안전교육, 응급대처, 보험가입', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 청소년활동 안전관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사전 안전점검\n2. 안전교육 실시\n3. 응급상황 대처\n4. 보험 가입\n5. 사고 예방 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'program-evaluation',
    name: '프로그램 평가',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '프로그램 평가의 목적과 유형을 설명하시오.', answer: '형성평가(과정), 총괄평가(결과), 환류를 통한 개선', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 프로그램 평가의 목적과 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평가의 목적\n2. 형성평가\n3. 총괄평가\n4. 과정평가와 성과평가\n5. 환류(Feedback)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'CIPP 평가모형을 설명하시오.', answer: 'Context(상황), Input(투입), Process(과정), Product(산출) 평가', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: CIPP 평가모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Context 평가 (상황)\n2. Input 평가 (투입)\n3. Process 평가 (과정)\n4. Product 평가 (산출)\n5. 실제 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '평가도구 개발 방법을 설명하시오.', answer: '설문지, 관찰법, 면담법, 포트폴리오 등 타당도·신뢰도 확보', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 평가도구 개발 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설문지법\n2. 관찰법\n3. 면담법\n4. 타당도 확보\n5. 신뢰도 확보\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '만족도 조사 방법을 설명하시오.', answer: '리커트 척도, 개방형 질문 활용, 즉시평가 및 추후평가', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 만족도 조사 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 만족도 조사 목적\n2. 리커트 척도 활용\n3. 개방형 질문\n4. 조사 시기\n5. 결과 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '평가결과 활용 방안을 설명하시오.', answer: '개선점 도출, 차기 프로그램 반영, 보고서 작성, 성과 공유', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 평가결과 활용 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개선점 도출\n2. 차기 프로그램 반영\n3. 평가 보고서 작성\n4. 성과 공유\n5. 지속적 개선(CQI)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'instruction-theory',
    name: '지도이론',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '경험학습 이론(Kolb)을 설명하시오.', answer: '구체적 경험 → 성찰적 관찰 → 추상적 개념화 → 능동적 실험의 순환', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 경험학습 이론(Kolb)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경험학습의 개념\n2. 구체적 경험\n3. 성찰적 관찰\n4. 추상적 개념화\n5. 능동적 실험\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '체험학습 단계를 설명하시오.', answer: '도입 → 전개(활동) → 나눔(성찰) → 일반화 → 적용', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 체험학습 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도입 단계\n2. 전개(활동) 단계\n3. 나눔(성찰) 단계\n4. 일반화 단계\n5. 적용 단계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '프로젝트 학습법을 설명하시오.', answer: '청소년 주도 문제해결 학습, 기획-실행-평가 과정', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 프로젝트 학습법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프로젝트 학습의 특징\n2. 주제 선정\n3. 계획 수립\n4. 실행 과정\n5. 발표 및 평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '협동학습 기법을 설명하시오.', answer: '긍정적 상호의존성, 개별 책무성, 사회적 기술 학습', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 협동학습 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 협동학습의 원리\n2. 긍정적 상호의존성\n3. 개별 책무성\n4. 사회적 기술\n5. 협동학습 기법 예시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '리더십 교육 방법을 설명하시오.', answer: '역할모델 제시, 실습 기회 부여, 피드백, 성찰', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 리더십 교육 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 리더십의 개념\n2. 역할모델 학습\n3. 실습 기회 제공\n4. 피드백\n5. 성찰 활동\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'instructor-role',
    name: '지도자 역할',
    color: 'from-teal-500 to-emerald-500',
    questions: [
      { id: 1, question: '청소년지도자의 역할과 자질을 설명하시오.', answer: '촉진자, 조력자, 멘토 역할 및 전문성, 윤리성, 열정', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 청소년지도자의 역할과 자질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 촉진자 역할\n2. 조력자 역할\n3. 멘토 역할\n4. 필요한 자질\n5. 전문성 개발\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '청소년지도자 윤리강령을 설명하시오.', answer: '청소년 최우선, 전문성, 공정성, 책임성, 청렴성', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 청소년지도자 윤리강령을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 최우선 원칙\n2. 전문성 제고\n3. 공정한 대우\n4. 책임있는 행동\n5. 청렴성 유지\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '멘토링의 원리와 기법을 설명하시오.', answer: '신뢰관계, 경청, 공감, 격려, 모델링', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 멘토링의 원리와 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 멘토링의 개념\n2. 신뢰관계 형성\n3. 경청과 공감\n4. 격려와 지지\n5. 역할 모델링\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '코칭 기법을 설명하시오.', answer: 'GROW 모델: Goal(목표), Reality(현실), Options(선택), Will(의지)', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 코칭 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 코칭의 개념\n2. Goal (목표 설정)\n3. Reality (현실 파악)\n4. Options (대안 탐색)\n5. Will (실행 의지)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년지도자의 전문성 개발 방법을 설명하시오.', answer: '보수교육, 슈퍼비전, 학습공동체, 자기성찰', prompt: '청소년지도사 청소년지도방법론 문제입니다.\n\n문제: 청소년지도자의 전문성 개발 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보수교육 참여\n2. 슈퍼비전 활용\n3. 학습공동체 참여\n4. 자기성찰\n5. 연구 및 학습\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function InstructionMethodStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('youth-instructor-instruction-method-progress');
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
    localStorage.setItem('youth-instructor-instruction-method-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-green-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-green-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/youth-instructor" className="text-gray-600 hover:text-green-600">청소년지도사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">청소년지도방법론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎯</span>
            <h1 className="text-2xl font-bold text-gray-800">청소년지도방법론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">청소년지도사 2급 필기시험 핵심 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-green-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-green-500 text-white hover:bg-green-600'}`}>
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
