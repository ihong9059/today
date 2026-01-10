'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'needs-assessment',
    name: '요구분석',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '학습 요구분석의 개념을 설명하시오.', answer: '학습자 필요, 조직 요구, 현재-이상 격차 분석', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 학습 요구분석의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 요구(needs)의 정의\n2. 학습자 요구 vs 조직 요구\n3. 현재상태-이상상태 격차\n4. 요구분석의 목적과 중요성\n5. 평생교육에서의 요구분석\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '요구분석 방법을 설명하시오.', answer: '설문조사, 인터뷰, 관찰, 포커스그룹, 델파이', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 요구분석 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설문조사법\n2. 면접법 (인터뷰)\n3. 관찰법\n4. 포커스그룹 인터뷰 (FGI)\n5. 델파이 기법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '요구 우선순위 결정을 설명하시오.', answer: '중요도, 시급성, 실행가능성, 비용효과', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 요구 우선순위 결정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 우선순위 결정 기준 (중요도, 시급성)\n2. 실행가능성 검토\n3. 비용효과 분석\n4. 이해관계자 합의\n5. 우선순위 매트릭스\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '학습자 특성 분석을 설명하시오.', answer: '인구통계, 학습배경, 동기, 선호도', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 학습자 특성 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인구통계적 특성 (연령, 성별, 학력)\n2. 학습 배경 및 경험\n3. 학습 동기 및 목적\n4. 학습 스타일 및 선호도\n5. 성인학습자 특성 고려\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '환경분석을 설명하시오.', answer: 'SWOT, PEST, 지역사회 자원, 경쟁기관', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 환경분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SWOT 분석 (강점, 약점, 기회, 위협)\n2. PEST 분석 (정치, 경제, 사회, 기술)\n3. 지역사회 자원 파악\n4. 경쟁기관 분석\n5. 환경분석 결과 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'design',
    name: '프로그램 설계',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '프로그램 목표 설정을 설명하시오.', answer: '일반목표, 구체적 목표, SMART 원칙, 학습성과', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 프로그램 목표 설정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프로그램 목표의 중요성\n2. 일반목표와 구체적 목표\n3. SMART 원칙 (구체적, 측정가능, 달성가능, 관련성, 시간제한)\n4. 학습성과 (learning outcomes) 진술\n5. 목표와 내용의 연계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '내용 선정과 조직을 설명하시오.', answer: '타당성, 적절성, 계열성, 계속성, 통합성', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 내용 선정과 조직을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내용 선정 원리 (타당성, 적절성)\n2. 내용 조직 원리 (계열성, 계속성, 통합성)\n3. 내용의 범위와 수준\n4. 모듈화 및 단원 구성\n5. 성인학습자 맞춤 내용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '교수학습 방법 선정을 설명하시오.', answer: '강의, 토의, 실습, 프로젝트, 학습자 특성 고려', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 교수학습 방법 선정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교수방법의 종류 (강의, 토의, 실습)\n2. 학습목표에 따른 방법 선택\n3. 학습자 특성 고려\n4. 온·오프라인 방법 통합\n5. 참여형·경험형 학습 설계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '프로그램 일정 계획을 설명하시오.', answer: '총 시수, 차시별 구성, 시간대, 요일, 기간', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 프로그램 일정 계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 총 시수 및 기간 결정\n2. 차시별 구성 (주제, 활동)\n3. 시간대 및 요일 선정\n4. 집중과정 vs 분산과정\n5. 성인학습자 시간 고려\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '프로그램 설계 모형을 설명하시오.', answer: 'ADDIE, Tyler, Caffarella, 순환적 모형', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 프로그램 설계 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ADDIE 모형 (분석-설계-개발-실행-평가)\n2. Tyler의 합리적 모형\n3. Caffarella의 상호작용 모형\n4. Knowles의 안드라고지 모형\n5. 상황에 맞는 모형 선택\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'implementation',
    name: '프로그램 실행',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '프로그램 홍보 전략을 설명하시오.', answer: '타겟 설정, 매체 선택, 메시지 개발, 등록 유도', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 프로그램 홍보 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 타겟 학습자 설정\n2. 홍보 매체 선택 (온·오프라인)\n3. 홍보 메시지 개발\n4. 등록 절차 안내\n5. 홍보 효과 측정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '강사 섭외 및 관리를 설명하시오.', answer: '자격 요건, 섭외, 오리엔테이션, 지원, 평가', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 강사 섭외 및 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강사 자격 요건 설정\n2. 강사 섭외 및 계약\n3. 강사 오리엔테이션\n4. 강의 지원 (자료, 시설)\n5. 강사 평가 및 피드백\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '학습자 등록 관리를 설명하시오.', answer: '모집, 접수, 선발, 오리엔테이션, 출결관리', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 학습자 등록 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 모집 공고 및 홍보\n2. 온라인·오프라인 접수\n3. 학습자 선발 기준\n4. 오리엔테이션 운영\n5. 출결 및 학사 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '학습자 지원 서비스를 설명하시오.', answer: '상담, 학습자료, 시설편의, 동기부여, 학습공동체', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 학습자 지원 서비스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습 상담 및 코칭\n2. 학습자료 제공\n3. 시설 및 편의 지원\n4. 동기부여 활동\n5. 학습공동체 형성 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '프로그램 운영 중 모니터링을 설명하시오.', answer: '출석, 만족도, 진도, 문제점 파악, 즉각 개선', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 프로그램 운영 중 모니터링을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 출석률 및 중도탈락 관리\n2. 학습자 만족도 수시 점검\n3. 학습 진도 및 성취도\n4. 문제점 및 애로사항 파악\n5. 즉각적 개선 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'evaluation',
    name: '프로그램 평가',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '프로그램 평가의 목적을 설명하시오.', answer: '성과측정, 책무성, 개선, 의사결정', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 프로그램 평가의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프로그램 성과 측정\n2. 책무성 확보\n3. 프로그램 개선\n4. 의사결정 지원\n5. 이해관계자 소통\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'Kirkpatrick의 4단계 평가모형을 설명하시오.', answer: '반응, 학습, 행동, 결과 평가', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: Kirkpatrick의 4단계 평가모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1단계: 반응 평가 (만족도)\n2. 2단계: 학습 평가 (지식·기술 습득)\n3. 3단계: 행동 평가 (전이)\n4. 4단계: 결과 평가 (성과)\n5. 각 단계별 평가 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '형성평가와 총괄평가를 설명하시오.', answer: '진행 중 평가 vs 종료 후 평가, 개선 vs 판단', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 형성평가와 총괄평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 형성평가 (과정평가) 개념과 목적\n2. 총괄평가 (성과평가) 개념과 목적\n3. 형성평가 시기와 방법\n4. 총괄평가 시기와 방법\n5. 두 평가의 통합 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '평가 자료 수집 방법을 설명하시오.', answer: '설문지, 인터뷰, 관찰, 시험, 포트폴리오', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 평가 자료 수집 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설문조사 (만족도, 학습성과)\n2. 심층 인터뷰 (개별, 집단)\n3. 관찰법 (참여관찰, 비참여관찰)\n4. 학습성취도 시험\n5. 포트폴리오 평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '평가 결과 활용을 설명하시오.', answer: '보고서 작성, 환류, 프로그램 개선, 의사결정', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 평가 결과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평가 보고서 작성\n2. 이해관계자 공유\n3. 평가 결과 환류 (feedback)\n4. 프로그램 개선 계획\n5. 차기 프로그램 기획 반영\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'special-program',
    name: '특수 프로그램 개발',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '문해교육 프로그램을 설명하시오.', answer: '기초문해, 생활문해, 디지털문해, 성인 비문해자', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 문해교육 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문해교육 필요성\n2. 기초문해 (한글 읽기·쓰기)\n3. 생활문해 (실용문서 이해)\n4. 디지털 문해\n5. 문해교육 프로그램 설계 특성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '직업능력개발 프로그램을 설명하시오.', answer: 'NCS, 실무중심, 자격증, 취업·창업', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 직업능력개발 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직업능력개발 필요성\n2. NCS (국가직무능력표준) 기반 설계\n3. 실무중심 교육과정\n4. 자격증 연계 프로그램\n5. 취업·창업 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '노인교육 프로그램을 설명하시오.', answer: '고령자 특성, 건강, 여가, 사회참여, 세대통합', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 노인교육 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고령학습자 특성\n2. 건강 및 여가 프로그램\n3. 사회참여 및 자원봉사\n4. 세대통합 프로그램\n5. 노인교육 프로그램 설계 유의점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '다문화교육 프로그램을 설명하시오.', answer: '한국어교육, 문화적응, 사회통합, 상호문화이해', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 다문화교육 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다문화 학습자 특성\n2. 한국어 및 기초교육\n3. 문화적응 프로그램\n4. 사회통합 교육\n5. 상호문화이해 증진\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '온라인 프로그램 개발을 설명하시오.', answer: 'LMS, 콘텐츠 제작, 상호작용, 학습관리, 평가', prompt: '평생교육사 2급 평생교육프로그램개발론 문제입니다.\n\n문제: 온라인 프로그램 개발을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. LMS (학습관리시스템) 선택\n2. 콘텐츠 제작 (동영상, 자료)\n3. 온라인 상호작용 설계\n4. 학습 관리 및 지원\n5. 온라인 평가 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function ProgramDevelopmentStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('lifelong-educator-program-development-progress');
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
    localStorage.setItem('lifelong-educator-program-development-progress', JSON.stringify(arr));
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
            <Link href="/category/education/lifelong-educator" className="text-gray-600 hover:text-indigo-600">평생교육사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">평생교육프로그램개발론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <h1 className="text-2xl font-bold text-gray-800">평생교육프로그램개발론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">평생교육사 2급 필수과목 - 프로그램 기획과 평가</p>
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
