'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'project-planning',
    name: '실습 프로젝트 기획',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '실습 프로젝트의 목적과 범위를 설정하시오.', answer: '목표 설정, 범위 정의, 일정 계획, 자원 배분', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 실습 프로젝트의 목적과 범위를 설정하시오.\n\n다음 순서로 설명해주세요:\n1. 프로젝트 목표 설정\n2. 범위 정의\n3. 일정 계획 수립\n4. 자원 및 예산 배분\n5. 위험 요소 파악\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '실습기관 선정과 협약을 설명하시오.', answer: '기관 조사, 협약 체결, 역할 분담, 기대 조율', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 실습기관 선정과 협약을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실습기관 조사 및 선정\n2. 협약서 작성\n3. 역할과 책임 분담\n4. 기대사항 조율\n5. 실습 일정 협의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '실습 계획서 작성을 설명하시오.', answer: '목표, 활동, 일정, 평가계획', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 실습 계획서 작성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실습 목표 설정\n2. 주요 활동 계획\n3. 세부 일정표\n4. 평가 계획\n5. 예상 성과\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '실습 지도교수 및 현장 멘토와의 협력을 설명하시오.', answer: '정기 면담, 피드백, 슈퍼비전, 문제해결', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 실습 지도교수 및 현장 멘토와의 협력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정기적 면담\n2. 피드백 받기\n3. 슈퍼비전 활용\n4. 문제 상황 공유\n5. 성장 지원 받기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '윤리적 고려사항을 설명하시오.', answer: '개인정보 보호, 이해상충, 전문성, 책임', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 윤리적 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개인정보 보호\n2. 이해상충 방지\n3. 전문성 유지\n4. 책임과 의무\n5. 윤리 강령 준수\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'case-study',
    name: '사례연구 및 분석',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '평생교육기관 운영 사례를 분석하시오.', answer: '조직구조, 프로그램, 재정, 성과, 시사점', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 평생교육기관 운영 사례를 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 기관 개요 및 조직구조\n2. 주요 프로그램\n3. 재정 운영\n4. 성과와 한계\n5. 시사점 도출\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '우수 프로그램 사례를 연구하시오.', answer: '기획 과정, 실행 전략, 성과, 성공요인', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 우수 프로그램 사례를 연구하시오.\n\n다음 순서로 설명해주세요:\n1. 프로그램 개요\n2. 기획 및 설계 과정\n3. 실행 전략\n4. 성과 측정\n5. 성공 요인 분석\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '평생학습도시 사례를 분석하시오.', answer: '추진체계, 사업, 주민참여, 성과, 과제', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 평생학습도시 사례를 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 추진 배경 및 체계\n2. 주요 사업\n3. 주민 참여\n4. 성과와 효과\n5. 과제와 개선방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '혁신적 교수법 적용 사례를 연구하시오.', answer: '교수법 특징, 적용 과정, 효과, 확산', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 혁신적 교수법 적용 사례를 연구하시오.\n\n다음 순서로 설명해주세요:\n1. 교수법의 특징\n2. 적용 배경 및 과정\n3. 학습자 반응\n4. 교육 효과\n5. 확산 가능성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '국제 평생교육 사례를 비교 분석하시오.', answer: '해외 사례, 한국 사례, 비교, 시사점', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 국제 평생교육 사례를 비교 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 해외 우수 사례\n2. 한국 사례\n3. 비교 분석\n4. 차이점과 공통점\n5. 한국에의 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'fieldwork',
    name: '현장 실무',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '프로그램 기획 실무를 수행하시오.', answer: '요구분석, 기획서, 예산, 일정', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 프로그램 기획 실무를 수행하시오.\n\n다음 순서로 설명해주세요:\n1. 요구분석 실시\n2. 프로그램 기획서 작성\n3. 예산안 수립\n4. 세부 일정 계획\n5. 승인 및 피드백\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '프로그램 운영 실무를 수행하시오.', answer: '모집, 진행, 관리, 평가', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 프로그램 운영 실무를 수행하시오.\n\n다음 순서로 설명해주세요:\n1. 홍보 및 모집\n2. 프로그램 진행 지원\n3. 학습자 관리\n4. 중간 점검\n5. 만족도 조사\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '상담 및 컨설팅 실무를 수행하시오.', answer: '학습상담, 진로상담, 기관컨설팅', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 상담 및 컨설팅 실무를 수행하시오.\n\n다음 순서로 설명해주세요:\n1. 학습 상담\n2. 진로 및 경력 상담\n3. 기관 컨설팅\n4. 사례 기록\n5. 성과 분석\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '네트워크 구축 실무를 수행하시오.', answer: '파트너 발굴, MOU, 협력사업, 관계 유지', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 네트워크 구축 실무를 수행하시오.\n\n다음 순서로 설명해주세요:\n1. 협력 파트너 발굴\n2. MOU 체결\n3. 공동 사업 기획\n4. 관계 유지 관리\n5. 성과 평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '정책 연구 및 제안 실무를 수행하시오.', answer: '현황 분석, 정책 연구, 제안서, 발표', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 정책 연구 및 제안 실무를 수행하시오.\n\n다음 순서로 설명해주세요:\n1. 현황 및 문제 분석\n2. 정책 연구\n3. 제안서 작성\n4. 발표 및 토론\n5. 피드백 반영\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'documentation',
    name: '기록 및 보고',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '실습일지 작성을 설명하시오.', answer: '일일 활동, 성찰, 학습내용, 피드백', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 실습일지 작성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일일 활동 기록\n2. 성찰적 사고\n3. 학습 내용 정리\n4. 질문과 과제\n5. 멘토 피드백\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '중간보고서 작성을 설명하시오.', answer: '진행상황, 성과, 문제점, 계획', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 중간보고서 작성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 진행상황 요약\n2. 주요 성과\n3. 문제점 및 어려움\n4. 향후 계획\n5. 자기평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '최종보고서 작성을 설명하시오.', answer: '전체 개요, 활동 내용, 성과, 성찰', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 최종보고서 작성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실습 전체 개요\n2. 주요 활동 내용\n3. 성과 및 배움\n4. 성찰과 제언\n5. 향후 계획\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '포트폴리오 구성을 설명하시오.', answer: '활동 자료, 산출물, 성찰, 증빙', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 포트폴리오 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 활동 관련 자료\n2. 산출물 정리\n3. 성찰 기록\n4. 증빙 자료\n5. 체계적 구성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '발표 자료 준비를 설명하시오.', answer: 'PPT 구성, 핵심 내용, 시각화, 발표 연습', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 발표 자료 준비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PPT 구성\n2. 핵심 내용 선정\n3. 시각화 전략\n4. 발표 대본 작성\n5. 발표 연습\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'reflection',
    name: '성찰 및 성장',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '성찰적 실천을 설명하시오.', answer: '경험 분석, 비판적 사고, 개선, 성장', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 성찰적 실천을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경험의 의미 분석\n2. 비판적 사고\n3. 이론과 실제 연결\n4. 개선방안 도출\n5. 지속적 성장\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '전문가로서의 정체성 형성을 설명하시오.', answer: '역할 이해, 가치관, 윤리, 비전', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 전문가로서의 정체성 형성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평생교육사 역할 이해\n2. 전문가 가치관 확립\n3. 윤리 의식\n4. 비전 수립\n5. 정체성 통합\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '역량 개발 계획을 수립하시오.', answer: '현재 역량, 목표 역량, 개발 전략, 실행', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 역량 개발 계획을 수립하시오.\n\n다음 순서로 설명해주세요:\n1. 현재 역량 진단\n2. 목표 역량 설정\n3. 개발 전략 수립\n4. 실행 계획\n5. 평가 및 조정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '경력 개발 로드맵을 작성하시오.', answer: '단기·중기·장기 목표, 경로, 전략', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 경력 개발 로드맵을 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 단기 목표 (1-2년)\n2. 중기 목표 (3-5년)\n3. 장기 목표 (5-10년)\n4. 경력경로 설계\n5. 실행 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '실습을 통한 학습 성과를 정리하시오.', answer: '지식, 기술, 태도, 성찰, 적용', prompt: '평생교육사 1급 평생교육실습 문제입니다.\n\n문제: 실습을 통한 학습 성과를 정리하시오.\n\n다음 순서로 설명해주세요:\n1. 지식의 확장\n2. 기술의 습득\n3. 태도의 변화\n4. 성찰적 학습\n5. 현장 적용 가능성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function Practical1StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('lifelong-educator-1-practical-progress');
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
    localStorage.setItem('lifelong-educator-1-practical-progress', JSON.stringify(arr));
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
            <Link href="/category/education/lifelong-educator-1" className="text-gray-600 hover:text-indigo-600">평생교육사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">평생교육실습</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎯</span>
            <h1 className="text-2xl font-bold text-gray-800">평생교육실습 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">평생교육사 1급 - 실무 프로젝트 및 현장 연구</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-indigo-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
