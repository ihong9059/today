'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'development',
    name: '청소년 발달이론',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: '청소년기의 특징과 발달과업을 설명하시오.', answer: '신체·인지·정서·사회성 발달, 자아정체감 형성, 자율성 확립', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 청소년기의 특징과 발달과업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년기 연령 범위\n2. 신체적 발달\n3. 인지적 발달\n4. 정서·사회적 발달\n5. 주요 발달과업\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'Erikson의 심리사회적 발달이론을 설명하시오.', answer: '청소년기: 정체감 대 역할혼미, 자아정체감 형성이 핵심 과업', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: Erikson의 심리사회적 발달이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 8단계 발달이론 개요\n2. 청소년기 단계 (정체감 대 역할혼미)\n3. 자아정체감 형성\n4. 정체감 위기\n5. 청소년 지도에의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'Piaget의 인지발달이론을 설명하시오.', answer: '형식적 조작기: 추상적·가설적 사고, 논리적 추론 가능', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: Piaget의 인지발달이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 4단계 인지발달이론\n2. 형식적 조작기 특성\n3. 추상적 사고 능력\n4. 가설연역적 추론\n5. 교육적 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'Kohlberg의 도덕성 발달이론을 설명하시오.', answer: '인습수준: 타인 기대, 사회 질서 준수 / 후인습수준: 보편적 원리', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: Kohlberg의 도덕성 발달이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 3수준 6단계 이론\n2. 인습 이전 수준\n3. 인습 수준\n4. 후인습 수준\n5. 도덕교육 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'Marcia의 자아정체감 지위이론을 설명하시오.', answer: '정체감 성취, 유예, 유실, 혼미 4가지 지위', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: Marcia의 자아정체감 지위이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정체감 성취\n2. 정체감 유예\n3. 정체감 유실\n4. 정체감 혼미\n5. 지도 방향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'counseling-theory',
    name: '상담이론',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      { id: 1, question: '정신분석 상담이론(Freud)을 설명하시오.', answer: '무의식 탐색, 전이·저항 분석, 통찰을 통한 치료', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 정신분석 상담이론(Freud)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성격구조 (원초아, 자아, 초자아)\n2. 무의식의 역할\n3. 방어기제\n4. 전이와 저항\n5. 치료 기법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '인간중심 상담이론(Rogers)을 설명하시오.', answer: '공감, 무조건적 긍정적 존중, 진솔성, 내담자 중심', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 인간중심 상담이론(Rogers)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기본 가정\n2. 공감적 이해\n3. 무조건적 긍정적 존중\n4. 진솔성 (일치성)\n5. 상담 과정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '인지행동 상담이론을 설명하시오.', answer: '비합리적 신념 수정, 인지 재구조화, 행동 변화', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 인지행동 상담이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Ellis의 REBT\n2. Beck의 인지치료\n3. ABC 모델\n4. 인지 왜곡\n5. 기법 (인지 재구조화, 행동실험)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '현실치료 상담이론(Glasser)을 설명하시오.', answer: 'WDEP 모델: Wants(욕구), Doing(행동), Evaluation(평가), Planning(계획)', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 현실치료 상담이론(Glasser)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선택이론\n2. Wants (욕구 탐색)\n3. Doing (현재 행동)\n4. Evaluation (자기평가)\n5. Planning (실행계획)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '게슈탈트 상담이론(Perls)을 설명하시오.', answer: '알아차림, 지금-여기, 미해결 과제 해결', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 게슈탈트 상담이론(Perls)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 알아차림 (awareness)\n2. 지금-여기 원리\n3. 미해결 과제\n4. 빈 의자 기법\n5. 청소년 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'counseling-process',
    name: '상담 과정',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '상담의 기본원리를 설명하시오.', answer: '자발성, 비밀보장, 수용, 개별화, 비심판적 태도', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 상담의 기본원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자발성 원리\n2. 비밀보장 원리\n3. 수용 원리\n4. 개별화 원리\n5. 비심판적 태도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '상담 관계 형성 기법을 설명하시오.', answer: '라포 형성, 경청, 공감, 반영, 질문 기술', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 상담 관계 형성 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 라포 (rapport) 형성\n2. 적극적 경청\n3. 공감적 반응\n4. 반영 기법\n5. 효과적인 질문\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '상담 단계를 설명하시오.', answer: '초기(관계형성) → 중기(문제탐색·목표설정) → 종결(변화·정리)', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 상담 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초기 단계 (관계 형성)\n2. 중기 단계 (문제 탐색)\n3. 중기 단계 (목표 설정)\n4. 후기 단계 (변화 시도)\n5. 종결 단계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '상담 기록과 사례관리를 설명하시오.', answer: '상담일지 작성, 사례회의, 슈퍼비전, 사후관리', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 상담 기록과 사례관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상담일지 작성\n2. 사례 기록 방법\n3. 사례회의\n4. 슈퍼비전\n5. 사후관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '상담자 윤리를 설명하시오.', answer: '비밀보장, 이중관계 금지, 전문성 개발, 내담자 복지 우선', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 상담자 윤리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비밀보장 의무\n2. 이중관계 금지\n3. 전문성 유지\n4. 내담자 복지 우선\n5. 윤리적 딜레마 대처\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'group-counseling',
    name: '집단상담',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '집단상담의 특성과 장점을 설명하시오.', answer: '상호작용, 피드백, 보편성, 대인관계 학습', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 집단상담의 특성과 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단상담의 개념\n2. 상호작용 효과\n3. 보편성 경험\n4. 대인관계 학습\n5. 개인상담과의 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '집단상담의 단계를 설명하시오.', answer: '준비 → 초기(신뢰형성) → 전환기(갈등) → 작업기(변화) → 종결', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 집단상담의 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 준비 단계\n2. 초기 단계 (신뢰 형성)\n3. 전환기 (갈등)\n4. 작업기 (변화)\n5. 종결 단계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '집단 역동성을 설명하시오.', answer: '집단 응집력, 규범, 리더십, 역할, 의사소통 패턴', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 집단 역동성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단 응집력\n2. 집단 규범\n3. 리더십\n4. 역할 분화\n5. 의사소통 패턴\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '집단상담 리더의 역할과 기술을 설명하시오.', answer: '촉진, 조정, 모델링, 링킹, 차단 기술', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 집단상담 리더의 역할과 기술을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 촉진 기술\n2. 조정 기술\n3. 모델링\n4. 링킹 (연결)\n5. 차단 기술\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '구조화된 집단상담 프로그램을 설명하시오.', answer: '자존감 향상, 진로탐색, 의사소통 훈련 등 주제별 프로그램', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 구조화된 집단상담 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구조화 프로그램 특성\n2. 자존감 향상 프로그램\n3. 진로탐색 프로그램\n4. 의사소통 훈련\n5. 프로그램 진행 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'crisis-counseling',
    name: '위기상담',
    color: 'from-teal-500 to-emerald-500',
    questions: [
      { id: 1, question: '위기개입 상담을 설명하시오.', answer: '즉각적 개입, 안전 확보, 지지, 자원 연결', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 위기개입 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위기의 정의\n2. 위기개입 원칙\n3. 안전 확보\n4. 정서적 지지\n5. 자원 연결\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '자살 위기 개입을 설명하시오.', answer: '자살 위험성 평가, 즉각 개입, 안전계획 수립, 전문기관 연계', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 자살 위기 개입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자살 경고 신호\n2. 위험성 평가\n3. 즉각적 개입\n4. 안전계획 수립\n5. 전문기관 연계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '학교폭력 피해 청소년 상담을 설명하시오.', answer: '안전 확보, 트라우마 치료, 자존감 회복, 보호 체계 구축', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 학교폭력 피해 청소년 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피해 사실 확인\n2. 안전 확보\n3. 트라우마 상담\n4. 자존감 회복\n5. 보호 체계 구축\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '가출 청소년 상담을 설명하시오.', answer: '가출 원인 파악, 귀가 지도, 가족상담, 대안 모색', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 가출 청소년 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가출 원인 탐색\n2. 현재 상황 파악\n3. 귀가 지도\n4. 가족상담\n5. 쉼터 연계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '중독 문제 청소년 상담을 설명하시오.', answer: '중독 유형 파악, 동기강화, 재발방지, 가족 개입', prompt: '청소년지도사 청소년심리및상담 문제입니다.\n\n문제: 중독 문제 청소년 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 중독 유형 (게임, 스마트폰, 약물)\n2. 중독 평가\n3. 동기강화 상담\n4. 재발방지 계획\n5. 가족 개입\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function PsychologyCounselingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('youth-instructor-psychology-counseling-progress');
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
    localStorage.setItem('youth-instructor-psychology-counseling-progress', JSON.stringify(arr));
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
            <span className="text-green-600 font-medium">청소년심리및상담</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎯</span>
            <h1 className="text-2xl font-bold text-gray-800">청소년심리및상담 학습하기</h1>
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
