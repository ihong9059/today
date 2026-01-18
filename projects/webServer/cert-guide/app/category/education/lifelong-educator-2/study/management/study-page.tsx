'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'organization',
    name: '평생교육기관 조직 관리',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '평생교육기관의 조직 구조를 설명하시오.', answer: '계층제, 매트릭스, 네트워크 조직, 유기적 구조', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 평생교육기관의 조직 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조직 구조의 유형 (계층제, 수평적)\n2. 매트릭스 조직\n3. 네트워크 조직\n4. 평생교육기관의 특성에 맞는 구조\n5. 유연한 조직 설계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '리더십 이론을 설명하시오.', answer: '변혁적 리더십, 서번트 리더십, 분산적 리더십', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 리더십 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변혁적 리더십 (Bass)\n2. 서번트 리더십 (Greenleaf)\n3. 분산적 리더십\n4. 상황적 리더십\n5. 평생교육기관장의 리더십\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '조직문화를 설명하시오.', answer: '공유된 가치, 규범, 학습조직 문화, 혁신문화', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 조직문화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조직문화 개념과 구성요소\n2. 조직문화 유형 (경쟁가치모형)\n3. 학습조직 문화\n4. 혁신적 조직문화 조성\n5. 평생교육기관의 바람직한 문화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '의사결정 과정을 설명하시오.', answer: '문제인식, 대안탐색, 평가, 선택, 실행, 참여적 의사결정', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 의사결정 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의사결정 단계\n2. 합리적 의사결정 모형\n3. 참여적 의사결정\n4. 집단 의사결정 기법 (브레인스토밍, 명목집단법)\n5. 의사결정의 함정과 편향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '조직 의사소통을 설명하시오.', answer: '공식·비공식 의사소통, 수평·수직 소통, 피드백', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 조직 의사소통을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공식적·비공식적 의사소통\n2. 수평적·수직적 소통\n3. 효과적인 의사소통 전략\n4. 갈등관리와 소통\n5. 디지털 시대 의사소통\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'hrm',
    name: '인적자원 관리',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '평생교육사 직무와 역량을 설명하시오.', answer: '프로그램 기획, 운영, 평가, 상담, 전문성', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 평생교육사 직무와 역량을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평생교육사의 주요 직무\n2. 필요 역량 (기획, 운영, 평가, 상담)\n3. 전문성 개발\n4. 윤리강령\n5. 역량 강화 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '강사 관리를 설명하시오.', answer: '채용, 평가, 개발, 동기부여, 보상', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 강사 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강사 선발 및 채용\n2. 강사 오리엔테이션\n3. 강의 평가 (학습자, 동료)\n4. 강사 전문성 개발\n5. 강사 동기부여 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '자원봉사자 관리를 설명하시오.', answer: '모집, 교육, 배치, 관리, 인정보상', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 자원봉사자 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자원봉사자 모집 전략\n2. 자원봉사자 교육훈련\n3. 업무 배치 및 슈퍼비전\n4. 활동 관리 및 평가\n5. 인정과 보상\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '직무만족과 동기부여를 설명하시오.', answer: '매슬로우 욕구이론, 허츠버그 2요인이론, 공정성이론', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 직무만족과 동기부여를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매슬로우의 욕구단계이론\n2. 허츠버그의 2요인이론 (위생·동기요인)\n3. 공정성이론\n4. 직무만족 향상 방안\n5. 평생교육 종사자 동기부여\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '팀워크와 협력을 설명하시오.', answer: '팀빌딩, 협력적 문화, 갈등관리, 시너지', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 팀워크와 협력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 효과적인 팀의 특징\n2. 팀빌딩 활동\n3. 협력적 업무 문화 조성\n4. 갈등관리 전략\n5. 시너지 창출\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'finance',
    name: '재정 관리',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '평생교육 예산 편성을 설명하시오.', answer: '예산의 원칙, 수입·지출, 인건비·사업비·운영비', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 평생교육 예산 편성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예산 편성 원칙\n2. 수입 항목 (정부지원금, 수강료, 후원금)\n3. 지출 항목 (인건비, 사업비, 운영비)\n4. 예산 편성 절차\n5. 예산 심의 및 확정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '재정 확보 방안을 설명하시오.', answer: '정부지원, 수강료, 후원금, 기부금, 수익사업', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 재정 확보 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정부 지원금 (국비, 지방비)\n2. 수강료 수입\n3. 후원금 및 기부금 모금\n4. 수익사업 운영\n5. 지속가능한 재정 모델\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '예산 집행 및 결산을 설명하시오.', answer: '집행 절차, 증빙서류, 회계감사, 결산보고', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 예산 집행 및 결산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예산 집행 절차\n2. 증빙서류 관리\n3. 예산 변경 및 전용\n4. 회계감사\n5. 결산 및 보고\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '비용효과 분석을 설명하시오.', answer: '비용편익분석, ROI, 투자 대비 효과, 성과측정', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 비용효과 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비용편익분석 개념\n2. ROI (투자수익률) 계산\n3. 비용효과성 평가\n4. 평생교육 성과측정의 어려움\n5. 질적·양적 성과 통합 평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '재정 투명성 확보를 설명하시오.', answer: '회계 공개, 감사, 내부통제, 윤리경영', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 재정 투명성 확보를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회계정보 공개\n2. 내부 및 외부 감사\n3. 내부통제 시스템\n4. 윤리경영\n5. 이해관계자 신뢰 구축\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'marketing',
    name: '마케팅과 홍보',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '평생교육 마케팅 전략을 설명하시오.', answer: 'STP (세분화, 목표시장, 포지셔닝), 4P (제품, 가격, 유통, 촉진)', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 평생교육 마케팅 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. STP 전략 (시장세분화, 표적시장, 포지셔닝)\n2. 4P (제품, 가격, 유통, 촉진)\n3. 서비스 마케팅 특성\n4. 학습자 중심 마케팅\n5. 차별화 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '홍보 전략을 설명하시오.', answer: '온라인·오프라인 홍보, SNS, 언론보도, 구전', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 홍보 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온라인 홍보 (홈페이지, SNS, 블로그)\n2. 오프라인 홍보 (전단지, 현수막, 포스터)\n3. 언론 보도자료 작성\n4. 구전 마케팅 (입소문)\n5. 통합 마케팅 커뮤니케이션\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '학습자 모집 전략을 설명하시오.', answer: '요구분석, 타겟 설정, 접근성, 등록 편의성', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 학습자 모집 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습 요구조사\n2. 타겟 학습자 설정\n3. 접근성 향상 (시간, 장소, 비용)\n4. 등록 절차 간소화\n5. 신규 vs 재등록 학습자 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '브랜드 관리를 설명하시오.', answer: '브랜드 아이덴티티, 이미지, 평판, 충성도', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 브랜드 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 브랜드 아이덴티티 구축\n2. 브랜드 이미지 관리\n3. 평판 관리\n4. 학습자 충성도 제고\n5. 브랜드 가치 향상\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '학습자 만족도 관리를 설명하시오.', answer: '서비스 품질, 만족도 조사, 불만 처리, 관계 유지', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 학습자 만족도 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서비스 품질 관리\n2. 만족도 조사 및 분석\n3. 불만 및 고충 처리\n4. 학습자 관계 유지 (CRM)\n5. 만족도 향상 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'planning',
    name: '전략기획과 평가',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '전략기획을 설명하시오.', answer: '비전, 미션, 전략목표, SWOT 분석', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 전략기획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비전과 미션 수립\n2. SWOT 분석\n3. 전략목표 설정\n4. 실행계획 수립\n5. 모니터링과 평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '성과관리를 설명하시오.', answer: 'KPI 설정, BSC, 성과평가, 피드백', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 성과관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. KPI (핵심성과지표) 설정\n2. BSC (균형성과표)\n3. 성과 측정 및 평가\n4. 피드백과 개선\n5. 성과급 연계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '평생교육기관 평가를 설명하시오.', answer: '자체평가, 외부평가, 인증, 질 관리', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 평생교육기관 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자체평가 (내부평가)\n2. 외부평가 (기관평가)\n3. 평가인증제도\n4. 질 관리 (Total Quality Management)\n5. 평가 결과 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '변화관리를 설명하시오.', answer: '조직 변화, 저항 관리, 변화 주도, 혁신', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 변화관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조직 변화의 필요성\n2. 변화에 대한 저항 관리\n3. Kotter의 8단계 변화관리\n4. 변화 주도 리더십\n5. 혁신적 조직문화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위기관리를 설명하시오.', answer: '위기 예방, 대응, 복구, 안전관리', prompt: '평생교육사 2급 평생교육경영론 문제입니다.\n\n문제: 위기관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위기 유형 (재난, 사고, 평판)\n2. 위기 예방 체계\n3. 위기 대응 매뉴얼\n4. 위기 커뮤니케이션\n5. 위기 이후 복구 및 학습\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function ManagementStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('lifelong-educator-management-progress');
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
    localStorage.setItem('lifelong-educator-management-progress', JSON.stringify(arr));
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
            <span className="text-indigo-600 font-medium">평생교육경영론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <h1 className="text-2xl font-bold text-gray-800">평생교육경영론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">평생교육사 2급 필수과목 - 조직 운영 및 관리</p>
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
