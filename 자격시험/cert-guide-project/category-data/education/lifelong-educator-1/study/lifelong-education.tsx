'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'advanced-theory',
    name: '평생교육 심화 이론',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '포스트모던 평생교육론의 특징을 설명하시오.', answer: '다양성 존중, 탈중심화, 맥락 중심 학습, 비판적 성찰', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 포스트모던 평생교육론의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 포스트모더니즘의 교육철학적 배경\n2. 다양성과 차이의 존중\n3. 탈중심화된 학습 체계\n4. 맥락 중심 학습의 중요성\n5. 평생교육에의 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '비판적 평생교육론을 설명하시오.', answer: '프레이리, 하버마스, 의식화, 해방적 학습, 사회변혁', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 비판적 평생교육론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프레이리의 비판적 교육학\n2. 하버마스의 의사소통행위이론\n3. 의식화와 해방적 학습\n4. 사회변혁을 위한 평생교육\n5. 한국 평생교육에의 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '평생교육의 국제적 동향을 설명하시오.', answer: 'UNESCO EFA, SDG4, OECD 평생학습 정책, EU LLL', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 평생교육의 국제적 동향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. UNESCO의 모두를 위한 교육(EFA)\n2. SDG4 지속가능발전목표\n3. OECD 평생학습 정책 프레임워크\n4. EU의 평생학습(LLL) 전략\n5. 한국 평생교육 정책에의 반영\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '평생교육과 사회자본의 관계를 설명하시오.', answer: '신뢰, 네트워크, 호혜성, 공동체 역량, 사회통합', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 평생교육과 사회자본의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사회자본의 개념 (퍼트남, 콜만)\n2. 신뢰, 네트워크, 호혜성의 구성요소\n3. 평생교육을 통한 사회자본 형성\n4. 학습공동체와 사회통합\n5. 사회자본 축적 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '평생교육의 철학적 패러다임을 비교 설명하시오.', answer: '인본주의, 진보주의, 급진주의, 구조주의, 후기구조주의', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 평생교육의 철학적 패러다임을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인본주의 철학 (매슬로우, 로저스)\n2. 진보주의 철학 (듀이)\n3. 급진주의 철학 (프레이리, 일리치)\n4. 구조주의와 후기구조주의\n5. 각 패러다임의 교육적 함의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'policy-research',
    name: '평생교육 정책 연구',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '평생교육진흥 기본계획의 수립과 추진체계를 설명하시오.', answer: '5개년 기본계획, 국가·지역 단위, 정책과제, 추진체계', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 평생교육진흥 기본계획의 수립과 추진체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평생교육진흥 기본계획의 법적 근거\n2. 5개년 기본계획의 주요 내용\n3. 국가 및 지역 단위 추진체계\n4. 핵심 정책과제\n5. 평가 및 환류 체계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '평생교육 거버넌스 체계를 설명하시오.', answer: '국가평생교육진흥원, 지역평생교육진흥원, 시도협의회, 민관협력', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 평생교육 거버넌스 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 국가평생교육진흥원의 역할\n2. 시도 평생교육진흥원\n3. 평생교육협의회 구성과 기능\n4. 민관협력 거버넌스\n5. 효과적 거버넌스 구축 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '평생학습도시 조성사업의 성과와 과제를 설명하시오.', answer: '지역학습공동체, 평생학습 인프라, 네트워크, 정책과제', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 평생학습도시 조성사업의 성과와 과제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평생학습도시의 개념과 배경\n2. 조성사업의 주요 성과\n3. 지역학습공동체 활성화\n4. 현재의 한계와 과제\n5. 발전 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '성인문해교육 지원사업을 설명하시오.', answer: '문해교육 프로그램, 문해교육기관, 교원 양성, 학력인정', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 성인문해교육 지원사업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성인문해교육의 개념과 필요성\n2. 문해교육 프로그램 유형\n3. 문해교육 교원 양성 체계\n4. 문해교육 학력인정제도\n5. 디지털 문해교육 확대\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '평생교육 바우처사업의 운영과 효과를 설명하시오.', answer: '학습계좌제, 국민내일배움카드, 학습비 지원, 교육격차 해소', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 평생교육 바우처사업의 운영과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평생교육 바우처의 개념\n2. 학습계좌제와 국민내일배움카드\n3. 지원 대상 및 지원 범위\n4. 교육격차 해소 효과\n5. 개선 과제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'comparative-education',
    name: '비교 평생교육론',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '북유럽 평생교육 체계의 특징을 설명하시오.', answer: '폴케호이스콜레, 학습서클, 교육복지, 민주시민교육', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 북유럽 평생교육 체계의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 덴마크의 폴케호이스콜레\n2. 스웨덴의 학습서클\n3. 교육복지 체계\n4. 민주시민교육 전통\n5. 한국 평생교육에의 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '독일의 평생교육 체계를 설명하시오.', answer: '민중대학(VHS), 직업교육, 이원화체제, 마이스터제도', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 독일의 평생교육 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 민중대학(Volkshochschule)의 역사와 현황\n2. 직업교육 이원화 체제\n3. 마이스터 제도\n4. 평생직업능력개발 정책\n5. 한국 직업교육에의 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '미국의 평생교육 체계를 설명하시오.', answer: '커뮤니티칼리지, 성인교육법, 지역사회 중심, 평생학습계좌', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 미국의 평생교육 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 커뮤니티칼리지의 역할\n2. 성인교육법과 정책\n3. 지역사회 중심 평생교육\n4. 평생학습계좌 시스템\n5. 한국 평생교육에의 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '일본의 평생교육 체계를 설명하시오.', answer: '사회교육법, 공민관, 평생학습진흥정책, 고령화 대응', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 일본의 평생교육 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사회교육법과 평생학습진흥법\n2. 공민관(코민칸) 제도\n3. 평생학습진흥정책\n4. 초고령사회 대응 교육\n5. 한국 평생교육에의 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '영국의 평생교육 체계를 설명하시오.', answer: '성인교육 전통, 공개대학, 자격체계(NVQ), Skills Strategy', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 영국의 평생교육 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성인교육의 전통\n2. 공개대학(Open University)\n3. 국가직업자격체계(NVQ)\n4. Skills Strategy 정책\n5. 한국 평생교육에의 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'future-trends',
    name: '평생교육 미래 동향',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '디지털 전환 시대의 평생교육을 설명하시오.', answer: 'AI·빅데이터 활용, 에듀테크, 맞춤형 학습, 디지털 격차', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 디지털 전환 시대의 평생교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AI와 빅데이터 활용 교육\n2. 에듀테크의 발전과 적용\n3. 개인 맞춤형 학습 체계\n4. 디지털 격차 해소 과제\n5. 미래 평생교육의 방향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '초고령사회와 평생교육을 설명하시오.', answer: '액티브 에이징, 노년교육, 세대통합, 생애전환기 교육', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 초고령사회와 평생교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초고령사회의 특징과 과제\n2. 액티브 에이징(Active Ageing)\n3. 노년기 평생교육 프로그램\n4. 세대통합 교육\n5. 생애전환기 교육 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '지속가능발전교육(ESD)을 설명하시오.', answer: 'SDGs, 기후위기 대응, 환경교육, 세계시민교육', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 지속가능발전교육(ESD)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지속가능발전목표(SDGs)와 교육\n2. 기후위기 대응 교육\n3. 환경·생태 평생교육\n4. 세계시민교육\n5. 평생교육기관의 역할\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '미래 직업능력개발 체계를 설명하시오.', answer: '평생직업능력개발, 리스킬링, 업스킬링, K-디지털 트레이닝', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 미래 직업능력개발 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평생직업능력개발의 필요성\n2. 리스킬링과 업스킬링\n3. K-디지털 트레이닝\n4. 개인학습계좌제\n5. 미래 직업교육의 방향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '학습복지 실현 방안을 설명하시오.', answer: '교육격차 해소, 취약계층 지원, 평생교육 바우처, 접근성 보장', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 학습복지 실현 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습복지의 개념과 필요성\n2. 교육격차 현황 분석\n3. 취약계층 평생교육 지원\n4. 평생교육 바우처 확대\n5. 학습권 보장 정책 과제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'research-methodology',
    name: '평생교육 연구방법론',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '평생교육 연구의 패러다임을 설명하시오.', answer: '실증주의, 해석주의, 비판주의, 혼합연구', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 평생교육 연구의 패러다임을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실증주의 패러다임\n2. 해석주의 패러다임\n3. 비판주의 패러다임\n4. 혼합연구 접근\n5. 각 패러다임의 장단점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '평생교육 질적연구 방법을 설명하시오.', answer: '현상학, 근거이론, 문화기술지, 사례연구, 내러티브', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 평생교육 질적연구 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현상학적 연구\n2. 근거이론 연구\n3. 문화기술지 연구\n4. 사례연구\n5. 내러티브 연구\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '평생교육 통계분석 방법을 설명하시오.', answer: '기술통계, 추리통계, 회귀분석, 구조방정식, 데이터마이닝', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 평생교육 통계분석 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기술통계와 추리통계\n2. 회귀분석 활용\n3. 구조방정식 모형\n4. 데이터마이닝 기법\n5. 빅데이터 분석\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '평생교육 프로그램 평가연구를 설명하시오.', answer: 'CIPP 모형, 목표달성 모형, 참여자 중심 평가, 메타평가', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 평생교육 프로그램 평가연구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CIPP 평가 모형\n2. 목표달성 평가 모형\n3. 참여자 중심 평가\n4. 성과 평가와 메타평가\n5. 평가결과 활용 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '평생교육 실행연구를 설명하시오.', answer: '참여적 실행연구, 계획-실행-관찰-성찰, 현장 개선', prompt: '평생교육사 1급 평생교육론 문제입니다.\n\n문제: 평생교육 실행연구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실행연구의 개념과 특징\n2. 참여적 실행연구\n3. 실행연구 순환과정 (계획-실행-관찰-성찰)\n4. 현장 개선을 위한 적용\n5. 실행연구의 장점과 한계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function LifelongEducation1StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('lifelong-educator-1-lifelong-education-progress');
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
    localStorage.setItem('lifelong-educator-1-lifelong-education-progress', JSON.stringify(arr));
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
            <span className="text-indigo-600 font-medium">평생교육론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <h1 className="text-2xl font-bold text-gray-800">평생교육론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">평생교육사 1급 시험과목 - 평생교육 심화 이론과 연구</p>
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
