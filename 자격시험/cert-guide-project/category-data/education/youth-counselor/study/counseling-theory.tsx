'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'psychoanalytic',
    name: '정신분석 상담',
    color: 'from-emerald-500 to-green-500',
    questions: [
      { id: 1, question: 'Freud의 성격 구조 이론을 설명하시오.', answer: '원초아(id), 자아(ego), 초자아(superego)', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: Freud의 성격 구조 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원초아 (id)의 특성\n2. 자아 (ego)의 역할\n3. 초자아 (superego)의 기능\n4. 세 구조의 갈등\n5. 건강한 성격\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '방어기제를 설명하시오.', answer: '억압, 투사, 합리화, 반동형성, 승화 등', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 방어기제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방어기제의 개념\n2. 억압 (repression)\n3. 투사 (projection)\n4. 합리화 (rationalization)\n5. 승화 (sublimation)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '심리성적 발달 단계를 설명하시오.', answer: '구강기, 항문기, 남근기, 잠재기, 생식기', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 심리성적 발달 단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구강기 (0-18개월)\n2. 항문기 (18개월-3세)\n3. 남근기 (3-6세, 오이디푸스/엘렉트라 콤플렉스)\n4. 잠재기 (6세-사춘기)\n5. 생식기 (사춘기 이후)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '무의식과 자유연상을 설명하시오.', answer: '의식 수준, 무의식 탐색, 자유연상 기법', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 무의식과 자유연상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의식, 전의식, 무의식\n2. 무의식의 중요성\n3. 자유연상 기법\n4. 꿈의 해석\n5. 저항과 전이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'Adler의 개인심리학을 설명하시오.', answer: '열등감, 우월 추구, 사회적 관심, 생활양식', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: Adler의 개인심리학을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 열등감과 보상\n2. 우월성 추구\n3. 사회적 관심\n4. 생활양식\n5. 출생순위 영향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'person-centered',
    name: '인간중심 상담',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: 'Rogers의 인간관을 설명하시오.', answer: '자기실현 경향성, 긍정적 인간관, 성장 잠재력', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: Rogers의 인간관을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기실현 경향성\n2. 긍정적 인간관\n3. 유기체적 가치화 과정\n4. 자아개념\n5. 일치와 불일치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '상담자의 3대 핵심 조건을 설명하시오.', answer: '진정성(일치), 무조건적 긍정적 존중, 공감적 이해', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 상담자의 3대 핵심 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 진정성 (congruence)\n2. 무조건적 긍정적 존중 (UPR)\n3. 공감적 이해 (empathy)\n4. 3대 조건의 충분성\n5. 청소년 상담 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '공감의 의미와 기법을 설명하시오.', answer: '내담자 준거틀, 정확한 공감, 공감 전달', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 공감의 의미와 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공감의 정의\n2. 내담자 준거틀\n3. 정확한 공감\n4. 공감 전달 기법\n5. 공감의 치료적 효과\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '완전히 기능하는 사람을 설명하시오.', answer: '경험 개방성, 실존적 삶, 유기체 신뢰, 자유, 창조성', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 완전히 기능하는 사람을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경험에 대한 개방성\n2. 실존적 삶\n3. 유기체적 신뢰\n4. 경험적 자유\n5. 창조성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '인간중심 상담의 과정을 설명하시오.', answer: '비지시적, 내담자 주도, 자기탐색, 통찰', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 인간중심 상담의 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비지시적 접근\n2. 내담자 주도성\n3. 자기탐색 촉진\n4. 통찰과 자각\n5. 행동 변화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'cognitive-behavioral',
    name: '인지행동 상담',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      { id: 1, question: 'Ellis의 합리적 정서행동치료(REBT)를 설명하시오.', answer: 'ABC 이론, 비합리적 신념, 논박', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: Ellis의 합리적 정서행동치료(REBT)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ABC 이론 (A-B-C-D-E)\n2. 비합리적 신념의 종류\n3. 논박 (disputing)\n4. 합리적 신념으로 대체\n5. 청소년 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'Beck의 인지치료를 설명하시오.', answer: '자동적 사고, 인지적 오류, 인지 재구조화', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: Beck의 인지치료를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자동적 사고\n2. 인지적 오류 (흑백논리, 과잉일반화 등)\n3. 핵심신념과 중간신념\n4. 인지 재구조화\n5. 우울증 치료\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '인지행동치료의 기법들을 설명하시오.', answer: '소크라테스식 질문, 사고기록지, 행동실험', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 인지행동치료의 기법들을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소크라테스식 질문\n2. 사고기록지 (일일기록지)\n3. 행동실험\n4. 점진적 노출\n5. 숙제 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '행동주의 상담 기법을 설명하시오.', answer: '체계적 둔감화, 홍수법, 토큰경제, 모델링', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 행동주의 상담 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 체계적 둔감화\n2. 홍수법 (flooding)\n3. 토큰경제\n4. 모델링\n5. 청소년 행동수정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '제3세대 인지행동치료를 설명하시오.', answer: 'ACT, DBT, MBCT, 수용과 마음챙김', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 제3세대 인지행동치료를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수용전념치료 (ACT)\n2. 변증법적 행동치료 (DBT)\n3. 마음챙김 기반 인지치료 (MBCT)\n4. 수용과 마음챙김\n5. 청소년 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'gestalt',
    name: '게슈탈트 상담',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      { id: 1, question: '게슈탈트 상담의 기본 개념을 설명하시오.', answer: '알아차림, 여기-지금, 미해결 과제, 접촉', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 게슈탈트 상담의 기본 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 알아차림 (awareness)\n2. 여기-지금 (here and now)\n3. 미해결 과제\n4. 접촉과 접촉경계\n5. 게슈탈트 형성과 해소\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '접촉경계 혼란을 설명하시오.', answer: '투사, 내사, 반전, 융합, 편향', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 접촉경계 혼란을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 투사 (projection)\n2. 내사 (introjection)\n3. 반전 (retroflection)\n4. 융합 (confluence)\n5. 편향 (deflection)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '게슈탈트 상담 기법을 설명하시오.', answer: '빈 의자, 과장하기, 실험, 꿈작업', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 게슈탈트 상담 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 빈 의자 기법\n2. 과장하기\n3. 실험 (experiment)\n4. 꿈 작업\n5. 청소년 적용 시 주의점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '알아차림 연속체를 설명하시오.', answer: '신체-감정-욕구-생각-행동의 연결', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 알아차림 연속체를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신체 감각 알아차림\n2. 감정 알아차림\n3. 욕구 알아차림\n4. 생각 알아차림\n5. 행동 선택\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: 'Perls의 책임과 선택을 설명하시오.', answer: '자기책임, "I" 언어, 주체적 선택', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: Perls의 책임과 선택을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기 책임의 강조\n2. "I" 언어 사용\n3. "~해야 한다"를 "~하고 싶다"로\n4. 선택과 자유\n5. 청소년 주체성 발달\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'other-theories',
    name: '기타 이론',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '현실치료를 설명하시오.', answer: 'Glasser, 선택이론, WDEP, 책임', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 현실치료를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Glasser의 선택이론\n2. 5가지 기본욕구\n3. WDEP 과정\n4. 책임의 강조\n5. 청소년 문제행동 개입\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '해결중심 단기치료를 설명하시오.', answer: '강점 중심, 예외질문, 기적질문, 척도질문', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 해결중심 단기치료를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 해결중심의 기본 가정\n2. 예외 질문\n3. 기적 질문\n4. 척도 질문\n5. 청소년 단기상담\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '교류분석(TA)을 설명하시오.', answer: 'Berne, 자아상태(P-A-C), 인생각본, 스트로크', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 교류분석(TA)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Berne의 교류분석\n2. 자아상태 (P-A-C)\n3. 교류 패턴 분석\n4. 인생 각본\n5. 스트로크와 게임\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '실존주의 상담을 설명하시오.', answer: 'Frankl, 의미 추구, 죽음·자유·고독·무의미', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 실존주의 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실존주의 철학\n2. Frankl의 로고테라피\n3. 4가지 실존적 관심사\n4. 의미 찾기\n5. 청소년 정체성 탐색\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '다문화 상담을 설명하시오.', answer: '문화적 역량, Sue의 상담 모델, 문화적 겸손', prompt: '청소년상담사 상담이론 문제입니다.\n\n문제: 다문화 상담을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문화적 역량의 구성요소\n2. Sue의 다문화 상담 모델\n3. 문화적 겸손\n4. 다문화 청소년 이슈\n5. 문화적으로 민감한 개입\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function CounselingTheoryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-counseling-theory-progress');
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
    localStorage.setItem('youth-counselor-counseling-theory-progress', JSON.stringify(arr));
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
            <span className="text-emerald-600 font-medium">상담이론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">💭</span>
            <h1 className="text-2xl font-bold text-gray-800">상담이론 학습하기</h1>
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
