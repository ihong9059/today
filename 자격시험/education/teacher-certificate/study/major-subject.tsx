'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'korean',
    name: '국어과 (예시)',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '음운론의 기본 개념을 설명하시오.', answer: '음운, 변동, 체계, 음절 구조', prompt: '중등교원임용시험 국어 전공 문제입니다.\n\n문제: 음운론의 기본 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 음운(phoneme)의 개념과 변이음\n2. 음운 체계 (자음, 모음)\n3. 음운 변동 (교체, 탈락, 첨가, 축약)\n4. 음절 구조와 제약\n5. 교육적 함의 (발음 교육)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '형태론의 단어 형성 방법을 설명하시오.', answer: '파생법, 합성법, 굴절, 조어법', prompt: '중등교원임용시험 국어 전공 문제입니다.\n\n문제: 형태론의 단어 형성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 형태소의 개념과 종류\n2. 파생법 (접두사, 접미사)\n3. 합성법 (통사적, 비통사적)\n4. 단어의 내적 구조\n5. 국어 단어 형성의 특징\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '문법교육의 목표와 방법을 설명하시오.', answer: '문법 지식, 탐구능력, 국어의식', prompt: '중등교원임용시험 국어 전공 문제입니다.\n\n문제: 문법교육의 목표와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문법교육의 목표 (지식, 탐구, 태도)\n2. 문법 탐구학습\n3. 귀납적·연역적 접근\n4. 문법과 국어생활의 통합\n5. 2022 개정 국어과 교육과정의 문법 영역\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'math',
    name: '수학과 (예시)',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '수학적 문제해결력을 설명하시오.', answer: 'Polya 4단계, 문제해결 전략, 메타인지', prompt: '중등교원임용시험 수학 전공 문제입니다.\n\n문제: 수학적 문제해결력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Polya의 문제해결 4단계\n2. 문제해결 전략 (그림그리기, 식세우기 등)\n3. 메타인지와 문제해결\n4. 수학적 사고력과의 관계\n5. 문제해결력 신장 교수법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '수학적 추론을 설명하시오.', answer: '귀납적 추론, 연역적 추론, 유비추론', prompt: '중등교원임용시험 수학 전공 문제입니다.\n\n문제: 수학적 추론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수학적 추론의 개념과 중요성\n2. 귀납적 추론 (관찰→일반화)\n3. 연역적 추론 (논리적 증명)\n4. 유비추론 (유사성 활용)\n5. 수업에서의 추론 활동 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '수학교육과정의 5대 내용 영역을 설명하시오.', answer: '수와 연산, 도형, 측정, 규칙성, 자료와 가능성', prompt: '중등교원임용시험 수학 전공 문제입니다.\n\n문제: 수학교육과정의 5대 내용 영역을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수와 연산 영역\n2. 도형 영역 (기하)\n3. 측정 영역\n4. 규칙성 영역 (대수)\n5. 자료와 가능성 영역 (통계와 확률)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'english',
    name: '영어과 (예시)',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '의사소통 중심 교수법(CLT)을 설명하시오.', answer: '의사소통 능력, 의미 중심, 과업중심', prompt: '중등교원임용시험 영어 전공 문제입니다.\n\n문제: 의사소통 중심 교수법(CLT)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CLT의 이론적 배경\n2. 의사소통 능력 (문법적, 사회언어학적, 담화적, 전략적)\n3. 의미 중심 활동\n4. 과업중심 언어 교수(TBLT)\n5. CLT 수업 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '영어 읽기 교수법을 설명하시오.', answer: '상향식, 하향식, 상호작용 모형, 전략', prompt: '중등교원임용시험 영어 전공 문제입니다.\n\n문제: 영어 읽기 교수법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상향식(bottom-up) 읽기\n2. 하향식(top-down) 읽기\n3. 상호작용 모형\n4. 읽기 전략 (예측, 추론, 요약)\n5. 읽기 수업 활동 (pre-while-post)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '어휘 교수법을 설명하시오.', answer: '명시적·암시적 학습, 맥락, 반복, 어휘망', prompt: '중등교원임용시험 영어 전공 문제입니다.\n\n문제: 어휘 교수법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 명시적 어휘 학습 vs 암시적 학습\n2. 맥락을 통한 어휘 학습\n3. 반복과 재활용의 중요성\n4. 어휘망(lexical network) 형성\n5. 효과적인 어휘 교수 활동\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'science',
    name: '과학과 (예시)',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '과학탐구 과정을 설명하시오.', answer: '기초탐구, 통합탐구, 과학적 방법', prompt: '중등교원임용시험 과학 전공 문제입니다.\n\n문제: 과학탐구 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과학탐구의 의미\n2. 기초탐구기능 (관찰, 측정, 분류, 예상 등)\n3. 통합탐구기능 (가설설정, 변인통제, 자료해석 등)\n4. 과학적 방법과 탐구 절차\n5. 탐구중심 과학 수업\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '개념변화 학습모형을 설명하시오.', answer: '선개념, 인지갈등, 개념변화, 오개념', prompt: '중등교원임용시험 과학 전공 문제입니다.\n\n문제: 개념변화 학습모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선개념(오개념)의 특징\n2. 인지갈등 유발\n3. 개념변화 조건 (불만족, 이해가능, 그럴듯함, 유용함)\n4. 개념변화 수업 전략\n5. 과학 수업에서의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: 'STS 교육을 설명하시오.', answer: '과학-기술-사회, 실생활 연계, 의사결정', prompt: '중등교원임용시험 과학 전공 문제입니다.\n\n문제: STS 교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. STS(Science-Technology-Society)의 개념\n2. STS 교육의 목표와 특징\n3. 과학의 사회적 책임과 윤리\n4. 실생활 문제와 의사결정\n5. STS 수업 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'general',
    name: '교과교육론 공통',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '교과별 핵심역량을 설명하시오.', answer: '2022 개정, 교과역량, 총론역량', prompt: '중등교원임용시험 교과교육론 문제입니다.\n\n문제: 교과별 핵심역량을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 2022 개정 교육과정의 역량 체계\n2. 총론의 6대 핵심역량\n3. 교과별 역량 (국어, 수학, 영어 등)\n4. 역량중심 수업 설계\n5. 역량 평가 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '교과서의 역할과 활용을 설명하시오.', answer: '국정, 검정, 인정, 교과서 재구성', prompt: '중등교원임용시험 교과교육론 문제입니다.\n\n문제: 교과서의 역할과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교과서의 기능과 역할\n2. 교과서 제도 (국정, 검정, 인정)\n3. 디지털 교과서\n4. 교과서 재구성의 필요성과 방법\n5. 다양한 교수학습 자료 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '교과 통합 수업을 설명하시오.', answer: '융합교육, STEAM, 프로젝트학습', prompt: '중등교원임용시험 교과교육론 문제입니다.\n\n문제: 교과 통합 수업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교과 통합의 필요성\n2. 통합 유형 (주제중심, 탐구중심 등)\n3. STEAM 교육 (과학, 기술, 공학, 예술, 수학)\n4. 프로젝트 기반 통합학습\n5. 통합 수업 설계 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function MajorSubjectStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('teacher-certificate-major-subject-progress');
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
    localStorage.setItem('teacher-certificate-major-subject-progress', JSON.stringify(arr));
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
            <Link href="/category/education/teacher-certificate" className="text-gray-600 hover:text-indigo-600">교원자격증</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">전공과목</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📖</span>
            <h1 className="text-2xl font-bold text-gray-800">전공과목 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">교원임용시험 1차 - 과목별 전공 A·B (국어, 수학, 영어, 과학 등)</p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-orange-800">
              <strong>안내:</strong> 이 페이지는 과목별 전공 학습의 예시입니다. 실제 임용시험은 지원하는 과목에 따라 전공 영역이 달라집니다.
              본인의 전공 과목에 맞는 기출문제와 교재를 활용하여 학습하세요.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-indigo-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                            Claude
                          </a>
                          <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            ChatGPT
                          </a>
                          <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                            Gemini
                          </a>
                          <button onClick={() => toggleComplete(topic.id, q.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}>
                            {isCompleted ? '완료 취소' : '완료'}
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
