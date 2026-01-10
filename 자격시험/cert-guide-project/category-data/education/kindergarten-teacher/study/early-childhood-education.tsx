'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'philosophy',
    name: '유아교육의 철학적 기초',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '루소의 자연주의 교육사상을 설명하시오.', answer: '성선설, 소극적 교육, 자연적 발달 존중', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 루소의 자연주의 교육사상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 루소의 성선설과 자연주의\n2. 소극적 교육의 의미\n3. 발달단계에 따른 교육\n4. 에밀에 나타난 교육관\n5. 현대 유아교육에 주는 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '페스탈로치의 교육사상을 설명하시오.', answer: '전인교육, 직관교육, 생활교육, 조화로운 발달', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 페스탈로치의 교육사상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전인교육의 의미 (머리·가슴·손)\n2. 직관교육의 원리\n3. 생활이 도야한다\n4. 조화로운 발달의 중요성\n5. 유아교육에의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '프뢰벨의 유치원 사상을 설명하시오.', answer: '은물, 작업, 놀이, 통일성의 원리', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 프뢰벨의 유치원 사상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통일성의 원리 (신-자연-인간)\n2. 은물(Gifts)의 개념과 종류\n3. 작업(Occupations)의 의미\n4. 놀이의 교육적 가치\n5. 세계 최초의 유치원 설립\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '몬테소리의 교육방법을 설명하시오.', answer: '준비된 환경, 감각교육, 교구, 자동교육', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 몬테소리의 교육방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 준비된 환경의 원리\n2. 감각교육의 중요성\n3. 몬테소리 교구의 특징\n4. 자동교육과 정상화\n5. 교사의 역할\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '듀이의 진보주의 교육사상을 설명하시오.', answer: '경험중심, 아동중심, 민주주의 교육, 행함으로써 배움', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 듀이의 진보주의 교육사상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경험중심 교육의 의미\n2. 아동중심 교육관\n3. 행함으로써 배운다 (Learning by doing)\n4. 민주주의와 교육\n5. 유아교육에의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'history',
    name: '유아교육의 역사',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '한국 유아교육의 발달 과정을 설명하시오.', answer: '1897년 부산유치원 → 해방 후 확대 → 2012년 누리과정', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 한국 유아교육의 발달 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 최초 유치원 설립 (1897 부산유치원)\n2. 일제강점기 유아교육\n3. 해방 후 유치원 확대\n4. 유아교육법 제정 (2004)\n5. 누리과정 도입 (2012)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '외국의 유아교육 발달사를 설명하시오.', answer: '프뢰벨 유치원 → 몬테소리 어린이집 → 레지오 에밀리아', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 외국의 유아교육 발달사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프뢰벨 유치원 설립 (1840)\n2. 몬테소리 어린이집\n3. 레지오 에밀리아 접근법\n4. 발도르프 유치원\n5. 현대 유아교육에의 영향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '유아교육 프로그램의 발달을 설명하시오.', answer: '뱅크스트리트 → 하이스코프 → 프로젝트 접근법', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 유아교육 프로그램의 발달을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 뱅크스트리트 프로그램\n2. 하이스코프 프로그램\n3. 프로젝트 접근법\n4. 레지오 에밀리아 접근법\n5. 한국의 프로그램 도입 현황\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '유아교육 정책의 변천을 설명하시오.', answer: '유치원 확충 → 공교육화 → 무상교육', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 유아교육 정책의 변천을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유치원 확충 정책\n2. 공교육화 추진\n3. 유아교육법 제정 (2004)\n4. 5세 누리과정 (2012)\n5. 유아교육 무상교육 확대\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '누리과정의 도입 배경과 의의를 설명하시오.', answer: '유보통합, 무상교육, 국가수준 교육과정', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 누리과정의 도입 배경과 의의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도입 배경 (2012년)\n2. 유보통합의 첫 걸음\n3. 만 3~5세 공통 교육과정\n4. 무상교육 실시\n5. 2019 개정 누리과정의 특징\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'theory',
    name: '유아교육 이론',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '성숙주의 이론을 설명하시오.', answer: '게젤, 내적 성숙, 준비도, 발달 시간표', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 성숙주의 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 게젤의 성숙주의 이론\n2. 내적 성숙의 개념\n3. 준비도(Readiness)의 중요성\n4. 발달 시간표\n5. 유아교육에의 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '행동주의 이론을 설명하시오.', answer: '손다이크, 파블로프, 스키너, 강화', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 행동주의 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손다이크의 시행착오설\n2. 파블로프의 고전적 조건형성\n3. 스키너의 조작적 조건형성\n4. 강화의 원리\n5. 유아교육에의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '구성주의 이론을 설명하시오.', answer: '피아제, 비고츠키, 능동적 학습자, 사회적 구성', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 구성주의 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피아제의 인지적 구성주의\n2. 비고츠키의 사회적 구성주의\n3. 능동적 학습자 개념\n4. 지식의 구성 과정\n5. 유아교육에의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '생태학적 체계 이론을 설명하시오.', answer: '브론펜브레너, 미시-중간-외-거시-시간 체계', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 생태학적 체계 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 브론펜브레너의 생태학적 이론\n2. 미시체계 (가정, 유치원)\n3. 중간체계 (체계 간 상호작용)\n4. 외체계, 거시체계, 시간체계\n5. 유아교육에의 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '다중지능 이론을 설명하시오.', answer: '가드너, 8가지 지능, 개인차 존중', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 다중지능 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가드너의 다중지능 이론\n2. 8가지 지능의 종류\n3. 모든 사람은 8가지 지능 보유\n4. 개인차 존중과 강점 발견\n5. 유아교육에의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'curriculum',
    name: '교육과정의 이해',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '교육과정의 개념과 유형을 설명하시오.', answer: '경험, 교과, 잠재적 교육과정, 영 교육과정', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 교육과정의 개념과 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교육과정의 개념 (경험으로서의 교육과정)\n2. 교과 중심 교육과정\n3. 잠재적 교육과정\n4. 영 교육과정 (Null Curriculum)\n5. 유아교육과정의 특성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '교육과정 구성의 원리를 설명하시오.', answer: '타일러 원리, 목표-내용-방법-평가', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 교육과정 구성의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 타일러의 합리적 모형\n2. 교육목표 설정\n3. 학습경험 선정과 조직\n4. 교수학습 방법\n5. 평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '통합교육과정을 설명하시오.', answer: '교과통합, 주제중심, 프로젝트', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 통합교육과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통합교육과정의 개념\n2. 교과 간 통합의 필요성\n3. 주제중심 통합\n4. 프로젝트 접근법\n5. 누리과정의 통합적 접근\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '발현적 교육과정을 설명하시오.', answer: '아동 흥미, 유연성, 레지오 에밀리아', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 발현적 교육과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발현적 교육과정의 개념\n2. 아동의 흥미와 요구 반영\n3. 교사의 융통성과 반응성\n4. 레지오 에밀리아 접근법\n5. 2019 개정 누리과정과의 관련성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '교육과정 운영의 원리를 설명하시오.', answer: '자율성, 융통성, 다양성, 통합성', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 교육과정 운영의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자율성의 원리\n2. 융통성의 원리\n3. 다양성의 원리\n4. 통합성의 원리\n5. 2019 개정 누리과정의 운영 원리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'recent',
    name: '최근 동향',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '2019 개정 누리과정의 특징을 설명하시오.', answer: '유아·놀이중심, 교사 자율성 강화, 간략화', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 2019 개정 누리과정의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유아·놀이중심 교육과정\n2. 교사의 교육과정 자율성 강화\n3. 교육과정 내용 간략화\n4. 5개 영역의 통합적 운영\n5. 평가의 변화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '유아중심·놀이중심 교육과정을 설명하시오.', answer: '유아 주도성, 놀이 가치, 교사 지원', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 유아중심·놀이중심 교육과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유아중심의 의미 (유아 주도성)\n2. 놀이중심의 의미 (놀이의 가치)\n3. 교사의 역할 (관찰-지원-확장)\n4. 일과 운영의 변화\n5. 실제 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '유아교육의 공공성 강화를 설명하시오.', answer: '국공립 확충, 무상교육, 교육격차 해소', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 유아교육의 공공성 강화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 국공립 유치원 확충 정책\n2. 유아교육 무상교육 확대\n3. 교육격차 해소 노력\n4. 유치원 회계 투명성 강화\n5. 공공성 강화의 의의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '디지털 시대 유아교육을 설명하시오.', answer: '디지털 리터러시, 미디어 교육, 과의존 예방', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 디지털 시대 유아교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유아 디지털 리터러시\n2. 미디어 교육의 필요성\n3. 디지털 기기 과의존 예방\n4. 적절한 디지털 활용 방안\n5. 교사의 역할\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '유아 인성교육을 설명하시오.', answer: '존중, 배려, 협력, 나눔, 질서', prompt: '유치원 임용시험 유아교육론 문제입니다.\n\n문제: 유아 인성교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인성교육의 중요성\n2. 누리과정의 인성 덕목 (존중, 배려, 협력, 나눔, 질서)\n3. 인성교육 방법 (모델링, 역할놀이)\n4. 일상생활 속 인성교육\n5. 가정과의 연계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function EarlyChildhoodEducationStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('kindergarten-teacher-early-childhood-education-progress');
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
    localStorage.setItem('kindergarten-teacher-early-childhood-education-progress', JSON.stringify(arr));
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
            <span className="text-indigo-600 font-medium">유아교육론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <h1 className="text-2xl font-bold text-gray-800">유아교육론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">유치원 임용시험 - 유아교육의 철학과 이론</p>
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
