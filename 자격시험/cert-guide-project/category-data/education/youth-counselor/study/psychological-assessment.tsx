'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'test-theory',
    name: '심리검사 이론',
    color: 'from-emerald-500 to-green-500',
    questions: [
      { id: 1, question: '심리검사의 목적과 활용을 설명하시오.', answer: '진단, 선발, 배치, 연구, 자기이해', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 심리검사의 목적과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 심리검사의 정의\n2. 주요 목적들\n3. 상담에서의 활용\n4. 윤리적 고려사항\n5. 청소년 대상 검사\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '신뢰도의 개념과 종류를 설명하시오.', answer: '측정의 일관성, 재검사·동형검사·반분·내적 일관성', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 신뢰도의 개념과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신뢰도의 정의\n2. 재검사 신뢰도\n3. 동형검사 신뢰도\n4. 반분 신뢰도\n5. 내적 일관성 (Cronbach α)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '타당도의 개념과 종류를 설명하시오.', answer: '측정하고자 하는 것을 측정, 내용·준거·구성타당도', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 타당도의 개념과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 타당도의 정의\n2. 내용 타당도\n3. 준거 타당도 (예언·공인)\n4. 구성 타당도\n5. 신뢰도와의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '규준의 종류를 설명하시오.', answer: '백분위, T점수, 표준점수, 연령규준, 학년규준', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 규준의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 규준의 개념\n2. 백분위 점수\n3. 표준점수 (z, T)\n4. 연령/학년 규준\n5. 규준 해석 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '검사의 표준화 과정을 설명하시오.', answer: '문항 개발, 예비검사, 규준 설정, 신뢰도·타당도 검증', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 검사의 표준화 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표준화의 의미\n2. 문항 개발과 선정\n3. 예비검사 실시\n4. 규준 설정\n5. 신뢰도·타당도 검증\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'intelligence',
    name: '지능검사',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: '지능의 정의와 이론을 설명하시오.', answer: 'Spearman g요인, Thurstone 다요인, Gardner 다중지능', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 지능의 정의와 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지능의 정의\n2. Spearman의 g요인 이론\n3. Thurstone의 다요인 이론\n4. Gardner의 다중지능 이론\n5. Sternberg의 삼원이론\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'Wechsler 지능검사를 설명하시오.', answer: 'WISC, 언어성·동작성 IQ, 소검사 프로파일', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: Wechsler 지능검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. WISC의 구성\n2. 언어성 지능\n3. 동작성 지능\n4. 소검사 프로파일 분석\n5. 해석상 유의점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'K-WISC의 소검사들을 설명하시오.', answer: '상식, 공통성, 산수, 어휘, 이해, 숫자, 기호쓰기, 토막짜기 등', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: K-WISC의 소검사들을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 언어성 소검사들\n2. 동작성 소검사들\n3. 각 소검사가 측정하는 능력\n4. 프로파일 패턴 해석\n5. 학습장애 진단 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'IQ의 의미와 해석을 설명하시오.', answer: 'M=100, SD=15, 정규분포, 발달지수', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: IQ의 의미와 해석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. IQ의 계산 (편차IQ)\n2. 평균 100, 표준편차 15\n3. 정규분포와 백분위\n4. IQ 범주 (경계선, 평균, 우수 등)\n5. 해석 시 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '집단 지능검사를 설명하시오.', answer: '효율성, 간편성, 선별용, 개인검사 보완', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 집단 지능검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단검사의 특징\n2. 장점과 단점\n3. 주요 집단 지능검사\n4. 개인검사와의 비교\n5. 학교 현장 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'personality',
    name: '성격검사',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      { id: 1, question: '객관적 성격검사를 설명하시오.', answer: '자기보고식, MMPI, NEO, 16PF, 정량적 분석', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 객관적 성격검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 객관적 검사의 특징\n2. MMPI의 구조와 척도\n3. NEO 성격검사 (Big 5)\n4. 16PF\n5. 장단점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'MMPI-A를 설명하시오.', answer: '청소년용, 타당도 척도, 임상 척도, 프로파일 해석', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: MMPI-A를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MMPI-A의 특징\n2. 타당도 척도 (L, F, K 등)\n3. 임상 척도 10개\n4. 프로파일 해석\n5. 청소년 적용 시 고려사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'Big 5 성격 모델을 설명하시오.', answer: '개방성, 성실성, 외향성, 친화성, 신경증', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: Big 5 성격 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개방성 (Openness)\n2. 성실성 (Conscientiousness)\n3. 외향성 (Extraversion)\n4. 친화성 (Agreeableness)\n5. 신경증 (Neuroticism)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'MBTI의 구조와 활용을 설명하시오.', answer: 'EI, SN, TF, JP 4가지 차원, 16가지 유형', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: MBTI의 구조와 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Jung의 심리유형론\n2. 4가지 선호 차원\n3. 16가지 성격 유형\n4. 진로상담 활용\n5. 한계점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '기질 및 성격검사(TCI)를 설명하시오.', answer: '기질 4차원, 성격 3차원, Cloninger 모델', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 기질 및 성격검사(TCI)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Cloninger의 모델\n2. 기질 차원 4가지\n3. 성격 차원 3가지\n4. 기질과 성격의 차이\n5. 청소년 상담 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'projective',
    name: '투사검사',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      { id: 1, question: '투사검사의 원리와 특징을 설명하시오.', answer: '무의식 투사, 모호한 자극, 자유 반응, 질적 분석', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 투사검사의 원리와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 투사의 개념\n2. 모호한 자극의 사용\n3. 자유 반응 방식\n4. 질적 분석\n5. 장단점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '로르샤하 검사를 설명하시오.', answer: '잉크반점, 반응내용·위치·결정인, 정신분석적 해석', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 로르샤하 검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 10개 잉크반점 카드\n2. 반응 영역 (W, D, Dd)\n3. 결정인 (형태, 색채, 운동)\n4. 채점과 해석\n5. 청소년 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'TAT(주제통각검사)를 설명하시오.', answer: '그림자극, 이야기 구성, Murray 욕구-압력 이론', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: TAT(주제통각검사)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. TAT의 구성\n2. Murray의 이론적 배경\n3. 실시 방법\n4. 이야기 분석\n5. 욕구와 압력 파악\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '그림검사들을 설명하시오.', answer: 'HTP, KFD, DAP, 투사적 해석', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 그림검사들을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. HTP (집-나무-사람)\n2. KFD (동적 가족화)\n3. DAP (인물화)\n4. 그림 해석 지표들\n5. 청소년 활용과 주의점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '문장완성검사(SCT)를 설명하시오.', answer: '미완성 문장, 반구조화, 태도·욕구·갈등 파악', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 문장완성검사(SCT)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SCT의 구조\n2. 반구조화된 투사검사\n3. 주요 영역 (가족, 자아, 대인관계 등)\n4. 분석과 해석\n5. 청소년 상담 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'special-tests',
    name: '특수검사',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '적성검사를 설명하시오.', answer: '잠재능력 측정, 직업·학업 적성, 진로지도 활용', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 적성검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적성의 개념\n2. 적성 vs 지능 vs 성취\n3. 다중적성검사\n4. 진로적성검사\n5. 진로상담 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '흥미검사를 설명하시오.', answer: 'Holland 유형론, RIASEC, Strong 흥미검사', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 흥미검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Holland의 RIASEC 모델\n2. Strong 직업흥미검사\n3. 한국형 검사들\n4. 흥미-직업 매칭\n5. 청소년 진로지도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '학습전략검사를 설명하시오.', answer: '학습동기, 학습전략, 시간관리, 시험불안', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 학습전략검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습전략의 구성요소\n2. 동기와 정의적 요인\n3. 인지 전략\n4. 메타인지 전략\n5. 학습상담 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '우울 및 불안검사를 설명하시오.', answer: 'BDI, BAI, CDI, RCMAS, 증상 평가', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 우울 및 불안검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Beck 우울척도 (BDI)\n2. Beck 불안척도 (BAI)\n3. 아동 우울척도 (CDI)\n4. 청소년용 불안검사\n5. 상담 개입 계획\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '자아개념 및 자존감 검사를 설명하시오.', answer: '전반적·영역별 자존감, Rosenberg, Coopersmith', prompt: '청소년상담사 심리측정 및 평가 문제입니다.\n\n문제: 자아개념 및 자존감 검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자아개념의 정의\n2. 전반적 자존감\n3. 영역별 자존감\n4. 주요 자존감 검사들\n5. 청소년 자존감 향상 프로그램\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function PsychologicalAssessmentStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-psychological-assessment-progress');
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
    localStorage.setItem('youth-counselor-psychological-assessment-progress', JSON.stringify(arr));
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
            <span className="text-emerald-600 font-medium">심리측정 및 평가</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📊</span>
            <h1 className="text-2xl font-bold text-gray-800">심리측정 및 평가 학습하기</h1>
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
