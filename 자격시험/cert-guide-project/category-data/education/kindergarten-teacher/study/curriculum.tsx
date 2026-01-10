'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'nuri',
    name: '2019 개정 누리과정',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '2019 개정 누리과정의 성격을 설명하시오.', answer: '국가수준 교육과정, 유아·놀이중심, 공통과정', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 2019 개정 누리과정의 성격을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 국가수준 교육과정으로서의 성격\n2. 유아·놀이중심 교육과정\n3. 만 3~5세 공통과정\n4. 교사의 자율성 강화\n5. 개정 누리과정의 의의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '누리과정의 목적과 목표를 설명하시오.', answer: '건강한 사람, 자주적인 사람, 창의적인 사람, 감성이 풍부한 사람, 더불어 사는 사람', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 누리과정의 목적과 목표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 누리과정의 목적\n2. 5가지 인간상 (건강한 사람, 자주적인 사람, 창의적인 사람, 감성이 풍부한 사람, 더불어 사는 사람)\n3. 각 인간상의 의미\n4. 누리과정 목표와의 연계\n5. 교육과정 운영에의 반영\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '누리과정의 구성 방향을 설명하시오.', answer: '추구하는 인간상, 목표, 5개 영역, 고려사항', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 누리과정의 구성 방향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 추구하는 인간상 구현\n2. 유아의 전인발달 지원\n3. 5개 영역의 통합적 운영\n4. 놀이를 통한 배움 강조\n5. 개별 유아의 특성 고려\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '누리과정 편성·운영을 설명하시오.', answer: '자율성, 융통성, 1일 4~5시간 운영', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 누리과정 편성·운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 편성·운영의 기본원칙\n2. 1일 4~5시간 운영\n3. 교사의 자율성과 융통성\n4. 가정 및 지역사회 연계\n5. 교육환경 구성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '누리과정 교수학습 방법을 설명하시오.', answer: '놀이중심, 유아주도, 생활주제 통합', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 누리과정 교수학습 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 놀이를 중심으로 운영\n2. 유아 주도적 놀이 지원\n3. 5개 영역의 통합적 접근\n4. 일상생활 중심 운영\n5. 교사의 역할 (관찰-상호작용-지원)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'areas',
    name: '5개 영역',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '신체운동·건강 영역을 설명하시오.', answer: '신체활동, 건강한 생활, 안전한 생활', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 신체운동·건강 영역을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영역의 목표\n2. 신체활동 즐기기\n3. 건강하게 생활하기\n4. 안전하게 생활하기\n5. 교수학습 방법 및 유의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '의사소통 영역을 설명하시오.', answer: '듣기, 말하기, 읽기, 쓰기', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 의사소통 영역을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영역의 목표\n2. 듣기와 말하기\n3. 읽기와 쓰기에 관심 가지기\n4. 책과 이야기 즐기기\n5. 교수학습 방법 및 유의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '사회관계 영역을 설명하시오.', answer: '나를 알고 존중, 더불어 생활, 사회에 관심', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 사회관계 영역을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영역의 목표\n2. 나를 알고 존중하기\n3. 더불어 생활하기\n4. 사회에 관심 가지기\n5. 교수학습 방법 및 유의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '예술경험 영역을 설명하시오.', answer: '아름다움 찾기, 창의적 표현, 예술 감상', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 예술경험 영역을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영역의 목표\n2. 아름다움 찾아보기\n3. 창의적으로 표현하기\n4. 예술 감상하기\n5. 교수학습 방법 및 유의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '자연탐구 영역을 설명하시오.', answer: '탐구과정 즐기기, 생활 속 탐구, 자연과 더불어', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 자연탐구 영역을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영역의 목표\n2. 탐구과정 즐기기\n3. 생활 속에서 탐구하기\n4. 자연과 더불어 살기\n5. 교수학습 방법 및 유의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'planning',
    name: '교육계획',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '연간교육계획을 설명하시오.', answer: '연간 주제, 행사, 교육목표 설정', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 연간교육계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연간교육계획의 목적\n2. 연간 생활주제 선정\n3. 연간 행사 계획\n4. 교육목표 설정\n5. 계획 수립 시 고려사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '주간교육계획을 설명하시오.', answer: '주제, 활동, 일과 운영', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 주간교육계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주간교육계획의 목적\n2. 주제 및 소주제 선정\n3. 5개 영역별 활동 계획\n4. 일과 운영 계획\n5. 가정연계 활동\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '일일교육계획을 설명하시오.', answer: '하루 일과, 활동 계획, 환경 구성', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 일일교육계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일일교육계획의 목적\n2. 하루 일과 구성\n3. 활동별 세부 계획\n4. 교육환경 구성\n5. 평가 및 반성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '생활주제 중심 통합교육과정을 설명하시오.', answer: '주제 선정, 주제망 구성, 활동 전개', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 생활주제 중심 통합교육과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 생활주제의 개념\n2. 주제 선정 기준\n3. 주제망 구성 방법\n4. 5개 영역 통합 활동 전개\n5. 평가 및 확장\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '교육과정 운영 평가를 설명하시오.', answer: '교육계획 평가, 운영과정 평가, 개선방안', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 교육과정 운영 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교육과정 운영 평가의 목적\n2. 교육계획 평가\n3. 교육활동 운영과정 평가\n4. 교육환경 평가\n5. 평가 결과 활용 및 개선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'assessment',
    name: '유아 평가',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '유아 평가의 목적과 원리를 설명하시오.', answer: '발달 이해, 교육개선, 관찰중심 평가', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 유아 평가의 목적과 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유아 평가의 목적\n2. 유아 평가의 원리\n3. 과정중심 평가\n4. 관찰중심 평가\n5. 개별 유아 이해 및 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '관찰법을 설명하시오.', answer: '일화기록, 시간표집, 사건표집, 체크리스트', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 관찰법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일화기록법\n2. 시간표집법\n3. 사건표집법\n4. 체크리스트법\n5. 각 방법의 장단점 및 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '포트폴리오 평가를 설명하시오.', answer: '작품 수집, 발달 과정 기록, 성장 파악', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 포트폴리오 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 포트폴리오 평가의 개념\n2. 작품 및 자료 수집\n3. 발달 과정 기록\n4. 유아의 성장 파악\n5. 학부모 면담 시 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '평가 결과의 활용을 설명하시오.', answer: '개별 지도, 교육과정 개선, 부모 상담', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 평가 결과의 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개별 유아 이해 및 지도\n2. 교육과정 운영 개선\n3. 학부모 상담 자료\n4. 다음 교육계획 수립\n5. 유아 성장 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '평가 시 유의사항을 설명하시오.', answer: '객관성, 타당성, 신뢰성, 윤리성', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 평가 시 유의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 객관적 관찰과 기록\n2. 평가의 타당성과 신뢰성\n3. 평가 내용의 비밀 보장\n4. 부정적 표현 지양\n5. 윤리적 평가 실시\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'environment',
    name: '교육환경',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '실내 흥미영역 구성을 설명하시오.', answer: '언어, 수·조작, 과학, 음률, 미술, 쌓기, 역할놀이', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 실내 흥미영역 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 흥미영역의 종류 (언어, 수·조작, 과학, 음률, 미술, 쌓기, 역할놀이 등)\n2. 영역별 배치 원리\n3. 동선 고려\n4. 자료 제공 및 관리\n5. 영역 재구성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '실외 놀이환경 구성을 설명하시오.', answer: '놀이기구, 모래·물, 자연체험, 안전', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 실외 놀이환경 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실외 놀이공간의 중요성\n2. 대근육 활동 영역 (놀이기구)\n3. 모래·물 놀이 영역\n4. 자연체험 영역\n5. 안전 고려사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '교재교구 선정과 활용을 설명하시오.', answer: '발달 적합성, 안전성, 다양성, 활용도', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 교재교구 선정과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교재교구 선정 기준 (발달 적합성, 안전성, 흥미)\n2. 다양한 교재교구 제공\n3. 자료의 배치 및 관리\n4. 유아의 자발적 활용 지원\n5. 주기적 교체 및 보충\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '물리적 환경 구성 원리를 설명하시오.', answer: '안전성, 심미성, 융통성, 편안함', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 물리적 환경 구성 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전한 환경\n2. 심미적 환경\n3. 융통성 있는 환경\n4. 편안한 환경\n5. 유아 참여를 통한 환경 구성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '심리적 환경 구성을 설명하시오.', answer: '신뢰감, 안정감, 자율성, 소속감', prompt: '유치원 임용시험 유아교육과정 문제입니다.\n\n문제: 심리적 환경 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신뢰로운 분위기 조성\n2. 정서적 안정감 제공\n3. 자율성 존중\n4. 소속감 형성\n5. 긍정적 교사-유아 상호작용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function CurriculumStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('kindergarten-teacher-curriculum-progress');
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
    localStorage.setItem('kindergarten-teacher-curriculum-progress', JSON.stringify(arr));
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
            <span className="text-indigo-600 font-medium">유아교육과정</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📖</span>
            <h1 className="text-2xl font-bold text-gray-800">유아교육과정 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">유치원 임용시험 - 누리과정과 교육과정 운영</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-indigo-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
