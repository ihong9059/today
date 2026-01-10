'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'research-basic',
    name: '연구의 기초',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: '청소년 연구의 목적과 특성을 설명하시오.', answer: '청소년의 발달과 행동 이해, 정책 및 프로그램 개발 근거 마련, 과학적 방법론 적용', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 청소년 연구의 목적과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 연구의 목적\n2. 청소년 연구의 특성\n3. 청소년 연구의 중요성\n4. 연구윤리의 필요성\n5. 청소년 연구의 과제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '양적 연구와 질적 연구의 차이를 설명하시오.', answer: '양적: 통계적 분석, 일반화 목적 / 질적: 심층적 이해, 맥락 파악', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 양적 연구와 질적 연구의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 양적 연구의 특징\n2. 질적 연구의 특징\n3. 자료수집 방법 비교\n4. 분석 방법 비교\n5. 혼합연구 접근\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '연구문제 설정의 원칙을 설명하시오.', answer: '명확성, 연구 가능성, 의의성, 윤리성, 이론적 근거', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 연구문제 설정의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 명확성의 원칙\n2. 연구 가능성\n3. 의의성과 기여도\n4. 윤리적 고려\n5. 이론적 기반\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '가설의 종류와 설정 방법을 설명하시오.', answer: '영가설, 연구가설, 방향성 가설, 비방향성 가설 / 이론과 선행연구 기반', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 가설의 종류와 설정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가설의 정의\n2. 가설의 종류\n3. 가설 설정 방법\n4. 가설 검증 절차\n5. 가설 기각과 채택\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '변인의 종류와 통제방법을 설명하시오.', answer: '독립변인, 종속변인, 조절변인, 매개변인 / 무선할당, 통계적 통제', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 변인의 종류와 통제방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변인의 개념\n2. 변인의 종류\n3. 변인의 조작적 정의\n4. 외생변인 통제\n5. 통제 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'research-design',
    name: '연구설계',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      { id: 1, question: '실험설계의 유형을 설명하시오.', answer: '진실험설계, 준실험설계, 전실험설계 / 내적타당도와 외적타당도', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 실험설계의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 진실험설계\n2. 준실험설계\n3. 전실험설계\n4. 내적타당도\n5. 외적타당도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '종단연구와 횡단연구를 비교하시오.', answer: '종단: 시간에 따른 변화 / 횡단: 특정 시점의 차이', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 종단연구와 횡단연구를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 종단연구의 특징\n2. 횡단연구의 특징\n3. 장단점 비교\n4. 코호트 연구\n5. 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '사례연구의 특성과 절차를 설명하시오.', answer: '심층적 이해, 맥락 파악 / 사례선정, 자료수집, 분석, 해석', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 사례연구의 특성과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사례연구의 개념\n2. 사례연구의 특성\n3. 사례 선정 기준\n4. 연구 절차\n5. 신뢰도 확보 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '실행연구(Action Research)를 설명하시오.', answer: '현장문제 해결, 실천과 연구 통합, 순환적 과정', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 실행연구(Action Research)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실행연구의 개념\n2. 실행연구의 특징\n3. 순환적 과정\n4. 청소년 현장 적용\n5. 한계점과 극복 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '연구설계의 타당도 저해요인을 설명하시오.', answer: '역사, 성숙, 검사, 도구, 회귀, 선정, 상실 효과', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 연구설계의 타당도 저해요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내적타당도 저해요인\n2. 외적타당도 저해요인\n3. 구성타당도\n4. 통계적 결론 타당도\n5. 통제 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'data-collection',
    name: '자료수집',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '설문조사의 설계와 실시 절차를 설명하시오.', answer: '문항개발, 예비조사, 본조사, 신뢰도·타당도 확보', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 설문조사의 설계와 실시 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설문지 구성\n2. 문항 개발 원칙\n3. 예비조사\n4. 본조사 실시\n5. 신뢰도와 타당도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '면접법의 종류와 실시 방법을 설명하시오.', answer: '구조화, 반구조화, 비구조화 면접 / 라포형성, 질문기법', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 면접법의 종류와 실시 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구조화 면접\n2. 반구조화 면접\n3. 비구조화 면접\n4. 면접 기법\n5. 자료 기록 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '관찰법의 유형과 실시 절차를 설명하시오.', answer: '참여관찰, 비참여관찰, 구조화 관찰 / 체계적 기록과 해석', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 관찰법의 유형과 실시 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관찰법의 종류\n2. 참여관찰의 특성\n3. 관찰 절차\n4. 기록 방법\n5. 관찰자 효과 통제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '포커스 그룹 인터뷰(FGI)를 설명하시오.', answer: '집단토의를 통한 심층정보 수집, 6-12명 구성, 진행자 역할', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 포커스 그룹 인터뷰(FGI)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. FGI의 개념과 목적\n2. 참여자 구성\n3. 진행 절차\n4. 진행자의 역할\n5. 분석 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '표집방법의 종류를 설명하시오.', answer: '확률표집(단순, 층화, 집락, 체계), 비확률표집(편의, 할당, 눈덩이)', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 표집방법의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 확률표집 방법\n2. 비확률표집 방법\n3. 표본크기 결정\n4. 표집오차\n5. 적절한 표집방법 선택\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'data-analysis',
    name: '자료분석',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '기술통계와 추리통계를 비교하시오.', answer: '기술통계: 자료의 요약 / 추리통계: 모집단 추론', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 기술통계와 추리통계를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 기술통계의 개념\n2. 추리통계의 개념\n3. 중심경향치\n4. 산포도\n5. 통계적 검정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 't-검정과 분산분석(ANOVA)을 설명하시오.', answer: 't-검정: 두 집단 비교 / ANOVA: 세 집단 이상 비교', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: t-검정과 분산분석(ANOVA)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. t-검정의 종류\n2. ANOVA의 개념\n3. 사후검정\n4. 가정 충족 확인\n5. 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '상관분석과 회귀분석을 설명하시오.', answer: '상관: 변인 간 관계 / 회귀: 예측과 설명', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 상관분석과 회귀분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상관계수의 종류\n2. 상관관계 해석\n3. 단순회귀분석\n4. 다중회귀분석\n5. 결정계수(R²)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '질적 자료 분석 방법을 설명하시오.', answer: '내용분석, 근거이론, 현상학적 분석, 주제분석', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 질적 자료 분석 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내용분석법\n2. 근거이론 접근\n3. 현상학적 분석\n4. 코딩 절차\n5. 신뢰도 확보\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '신뢰도와 타당도의 개념을 설명하시오.', answer: '신뢰도: 측정의 일관성 / 타당도: 측정의 정확성', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 신뢰도와 타당도의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신뢰도의 종류\n2. 신뢰도 측정 방법\n3. 타당도의 종류\n4. 타당도 확보 방법\n5. 신뢰도와 타당도 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'research-ethics',
    name: '연구윤리',
    color: 'from-teal-500 to-emerald-500',
    questions: [
      { id: 1, question: '연구윤리의 원칙을 설명하시오.', answer: '자율성 존중, 해악금지, 선행, 정의의 원칙', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 연구윤리의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자율성 존중\n2. 해악금지 원칙\n3. 선행의 원칙\n4. 정의의 원칙\n5. 청소년 연구의 특수성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '연구 참여자 보호 방안을 설명하시오.', answer: '사전동의, 익명성 보장, 비밀보장, 철회권 보장', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 연구 참여자 보호 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사전 동의 절차\n2. 익명성 보장\n3. 비밀보장\n4. 참여 철회권\n5. 취약집단 보호\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'IRB(연구윤리심의위원회)의 역할을 설명하시오.', answer: '연구계획 심의, 참여자 보호, 윤리적 문제 검토', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: IRB(연구윤리심의위원회)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. IRB의 개념과 목적\n2. IRB 구성\n3. 심의 절차\n4. 심의 기준\n5. IRB 승인 면제 대상\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '연구부정행위의 유형을 설명하시오.', answer: '위조, 변조, 표절, 부당한 저자 표시, 중복 게재', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 연구부정행위의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위조와 변조\n2. 표절의 유형\n3. 부당한 저자 표시\n4. 중복 게재\n5. 제재 및 예방\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년 대상 연구의 윤리적 고려사항을 설명하시오.', answer: '발달 특성 고려, 부모 동의, 동화(assent), 취약성 보호', prompt: '청소년지도사 1급 면접 문제입니다.\n\n문제: 청소년 대상 연구의 윤리적 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년의 발달 특성\n2. 부모 동의 절차\n3. 청소년 동화(assent)\n4. 취약성 보호\n5. 연구 결과 공유\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function ResearchMethodStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('youth-instructor-1-practical-progress');
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
    localStorage.setItem('youth-instructor-1-practical-progress', JSON.stringify(arr));
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
            <Link href="/category/education/youth-instructor-1" className="text-gray-600 hover:text-green-600">청소년지도사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">면접</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📊</span>
            <h1 className="text-2xl font-bold text-gray-800">면접 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">청소년지도사 1급 필기시험 핵심 과목</p>
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
