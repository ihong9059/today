'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'behaviorism',
    name: '행동주의 학습이론',
    color: 'from-emerald-500 to-green-500',
    questions: [
      { id: 1, question: 'Pavlov의 고전적 조건형성을 설명하시오.', answer: '무조건자극-조건자극, 일반화, 변별, 소거', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: Pavlov의 고전적 조건형성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고전적 조건형성 원리\n2. 조건형성 과정\n3. 일반화와 변별\n4. 소거와 자발적 회복\n5. 청소년 정서반응 형성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'Skinner의 조작적 조건형성을 설명하시오.', answer: '강화와 벌, 정적·부적 강화, 강화계획', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: Skinner의 조작적 조건형성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조작적 조건형성 원리\n2. 정적 강화와 부적 강화\n3. 정적 벌과 부적 벌\n4. 강화계획 (고정/변동, 간격/비율)\n5. 행동수정 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '강화의 원리와 종류를 설명하시오.', answer: '1차 강화물, 2차 강화물, 즉시성, 일관성', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 강화의 원리와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1차 강화물 (무조건 강화물)\n2. 2차 강화물 (조건 강화물)\n3. 즉시성의 중요성\n4. 일관성 유지\n5. 청소년 행동관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '행동형성 기법을 설명하시오.', answer: '점진적 접근법, 연쇄, 용암법, 토큰경제', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 행동형성 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 행동형성 (shaping)\n2. 연쇄 (chaining)\n3. 용암법 (fading)\n4. 토큰경제\n5. 학교 현장 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '벌의 효과와 한계를 설명하시오.', answer: '일시적 억제, 부작용, 대안 행동 제시 필요', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 벌의 효과와 한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 벌의 효과\n2. 부작용 (공격성, 회피)\n3. 효과적 벌 사용 조건\n4. 대안 행동 강화\n5. 청소년 훈육 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'social-learning',
    name: '사회학습이론',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: 'Bandura의 사회학습이론을 설명하시오.', answer: '관찰학습, 모델링, 대리강화, 상호결정론', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: Bandura의 사회학습이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관찰학습의 원리\n2. 모델링 과정\n3. 대리강화와 대리처벌\n4. 상호결정론\n5. 청소년 행동 형성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '모델링의 과정을 설명하시오.', answer: '주의-파지-재생-동기화 4단계', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 모델링의 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주의 (attention) 과정\n2. 파지 (retention) 과정\n3. 재생 (reproduction) 과정\n4. 동기화 (motivation) 과정\n5. 효과적 모델 특성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '자기효능감을 설명하시오.', answer: '성공 경험, 대리 경험, 언어적 설득, 생리적 상태', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 자기효능감을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기효능감의 정의\n2. 성공 경험\n3. 대리 경험\n4. 언어적 설득\n5. 생리적·정서적 상태\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '자기조절학습을 설명하시오.', answer: '목표설정, 자기관찰, 자기평가, 자기강화', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 자기조절학습을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기조절학습의 개념\n2. 목표 설정\n3. 자기 관찰과 모니터링\n4. 자기 평가\n5. 자기 강화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '공격성의 사회학습이론을 설명하시오.', answer: 'Bobo doll 실험, 관찰을 통한 공격성 학습', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 공격성의 사회학습이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Bobo doll 실험\n2. 공격성의 관찰학습\n3. 미디어 폭력의 영향\n4. 또래와 부모의 모델링\n5. 친사회적 행동 학습\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'cognitive',
    name: '인지주의 학습이론',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      { id: 1, question: '정보처리이론을 설명하시오.', answer: '감각기억, 단기기억, 장기기억, 부호화-저장-인출', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 정보처리이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정보처리 모델\n2. 감각기억\n3. 단기기억 (작업기억)\n4. 장기기억\n5. 부호화-저장-인출 과정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '기억 전략을 설명하시오.', answer: '시연, 정교화, 조직화, 인출단서', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 기억 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시연 (rehearsal)\n2. 정교화 (elaboration)\n3. 조직화 (organization)\n4. 인출 단서\n5. 학습 전략 지도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '메타인지를 설명하시오.', answer: '자기 인지에 대한 인지, 계획-점검-평가', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 메타인지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 메타인지의 정의\n2. 메타인지적 지식\n3. 메타인지적 조절 (계획-점검-평가)\n4. 메타인지와 학업성취\n5. 메타인지 훈련\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'Ausubel의 유의미 학습을 설명하시오.', answer: '선행조직자, 기존 지식과 연결, 기계적 학습과 대비', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: Ausubel의 유의미 학습을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유의미 학습의 조건\n2. 선행조직자 (advance organizer)\n3. 기존 지식과의 통합\n4. 기계적 학습과의 차이\n5. 수업 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '인지 부하 이론을 설명하시오.', answer: '작업기억 용량, 내재적·외재적·생성적 부하', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 인지 부하 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작업기억의 제한\n2. 내재적 인지 부하\n3. 외재적 인지 부하\n4. 생성적 인지 부하\n5. 교수 설계 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'constructivism',
    name: '구성주의 학습이론',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      { id: 1, question: 'Piaget의 인지발달이론을 설명하시오.', answer: '도식, 동화, 조절, 평형화', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: Piaget의 인지발달이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도식 (schema)\n2. 동화 (assimilation)\n3. 조절 (accommodation)\n4. 평형화 (equilibration)\n5. 4단계 인지발달\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'Vygotsky의 사회문화이론을 설명하시오.', answer: '근접발달영역(ZPD), 비계설정, 사회적 상호작용', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: Vygotsky의 사회문화이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 근접발달영역 (ZPD)\n2. 비계설정 (scaffolding)\n3. 사회적 상호작용의 중요성\n4. 언어와 사고\n5. 협동학습 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '발견학습과 탐구학습을 설명하시오.', answer: 'Bruner, 능동적 학습, 나선형 교육과정', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 발견학습과 탐구학습을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Bruner의 발견학습\n2. 능동적 학습자\n3. 나선형 교육과정\n4. 탐구학습 과정\n5. 청소년 자기주도학습\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '상황학습이론을 설명하시오.', answer: '실제 맥락, 인지적 도제, 정당한 주변적 참여', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 상황학습이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상황인지의 개념\n2. 실제적 맥락에서 학습\n3. 인지적 도제\n4. 정당한 주변적 참여\n5. 실생활 연계 학습\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '협동학습을 설명하시오.', answer: '긍정적 상호의존, 개별 책무성, 사회적 기술', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 협동학습을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 협동학습의 요소\n2. 긍정적 상호의존성\n3. 개별 책무성\n4. 사회적 기술 훈련\n5. 협동학습 모형들\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'motivation',
    name: '동기이론',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '내재적 동기와 외재적 동기를 설명하시오.', answer: '흥미·호기심 vs 보상·처벌, 과잉정당화 효과', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 내재적 동기와 외재적 동기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내재적 동기의 특성\n2. 외재적 동기의 특성\n3. 과잉정당화 효과\n4. 동기의 내재화\n5. 내재적 동기 증진 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'Maslow의 욕구위계이론을 설명하시오.', answer: '생리-안전-소속-존중-자아실현 5단계', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: Maslow의 욕구위계이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 5단계 욕구 위계\n2. 결핍 욕구 vs 성장 욕구\n3. 단계적 진행\n4. 자아실현\n5. 청소년 발달 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '성취동기이론을 설명하시오.', answer: 'McClelland, 성취욕구, 성공추구-실패회피', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 성취동기이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. McClelland의 성취동기\n2. 성공 추구 동기\n3. 실패 회피 동기\n4. 과제 선택 패턴\n5. 성취동기 증진\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'Weiner의 귀인이론을 설명하시오.', answer: '능력-노력-과제난이도-운, 통제소재-안정성-통제가능성', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: Weiner의 귀인이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 귀인의 4가지 요인\n2. 통제 소재\n3. 안정성\n4. 통제 가능성\n5. 귀인 재훈련\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '자기결정이론을 설명하시오.', answer: 'Deci & Ryan, 자율성-유능성-관계성 욕구', prompt: '청소년상담사 학습이론 문제입니다.\n\n문제: 자기결정이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기결정이론의 기본 가정\n2. 자율성 욕구\n3. 유능성 욕구\n4. 관계성 욕구\n5. 자율성 지지 환경\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function LearningTheoryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-learning-theory-progress');
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
    localStorage.setItem('youth-counselor-learning-theory-progress', JSON.stringify(arr));
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
            <span className="text-emerald-600 font-medium">학습이론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <h1 className="text-2xl font-bold text-gray-800">학습이론 학습하기</h1>
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
