'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'needs-assessment',
    name: '요구분석 및 기획',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '체계적 요구분석 방법을 설명하시오.', answer: '불일치 분석, 델파이, 포커스그룹, 우선순위', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 체계적 요구분석 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 요구분석의 개념\n2. 불일치 분석 모형\n3. 델파이 기법\n4. 포커스그룹 인터뷰\n5. 우선순위 결정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '학습자 분석을 설명하시오.', answer: '학습자 특성, 사전지식, 동기, 학습양식', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 학습자 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습자 인구학적 특성\n2. 사전지식과 경험\n3. 학습동기 분석\n4. 학습양식 파악\n5. 분석결과 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '환경분석과 상황분석을 설명하시오.', answer: 'SWOT, PEST, 자원분석, 경쟁환경', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 환경분석과 상황분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SWOT 분석\n2. PEST 분석\n3. 자원 및 제약분석\n4. 경쟁환경 분석\n5. 전략적 함의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '프로그램 기획서 작성을 설명하시오.', answer: '목적·목표, 대상, 내용, 방법, 예산', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 프로그램 기획서 작성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프로그램 목적과 목표\n2. 대상 선정\n3. 내용 구성\n4. 방법 및 전략\n5. 예산 및 일정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '타당성 분석을 설명하시오.', answer: '교육적 타당성, 경제적 타당성, 실행 가능성', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 타당성 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교육적 타당성\n2. 경제적 타당성\n3. 실행 가능성\n4. 사회적 타당성\n5. 종합 의사결정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'program-design',
    name: '프로그램 설계',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '학습목표 설정과 진술을 설명하시오.', answer: 'Bloom 목표분류, SMART 원칙, 성취기준', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 학습목표 설정과 진술을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Bloom의 목표분류학\n2. SMART 원칙\n3. 성취기준 설정\n4. 목표 진술 방법\n5. 목표와 평가의 연계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '교육과정 설계 모형을 설명하시오.', answer: 'Tyler 모형, Taba 모형, 백워드 설계', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 교육과정 설계 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Tyler의 합리적 모형\n2. Taba의 귀납적 모형\n3. 백워드 설계(UbD)\n4. 역량기반 설계\n5. 모형의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '교수학습 전략 설계를 설명하시오.', answer: '교수법 선택, 학습활동, 매체 활용, 상호작용', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 교수학습 전략 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교수법 선택\n2. 학습활동 설계\n3. 매체 활용 전략\n4. 상호작용 설계\n5. 학습지원 체계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '평가 설계를 설명하시오.', answer: '진단·형성·총괄 평가, 평가도구, 루브릭', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 평가 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 진단·형성·총괄 평가\n2. 평가도구 개발\n3. 루브릭 설계\n4. 타당도와 신뢰도\n5. 평가결과 환류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '교수자료 개발을 설명하시오.', answer: '교재 개발, 시청각 자료, 온라인 콘텐츠, 저작권', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 교수자료 개발을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교재 개발 원리\n2. 시청각 자료 제작\n3. 온라인 콘텐츠 개발\n4. 저작권 고려사항\n5. 자료의 질 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'implementation',
    name: '프로그램 실행',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '프로그램 마케팅과 홍보를 설명하시오.', answer: '수요 창출, 홍보 전략, 모집, 등록관리', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 프로그램 마케팅과 홍보를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수요 창출 전략\n2. 통합 마케팅\n3. 효과적 홍보\n4. 모집 및 선발\n5. 등록관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '프로그램 운영 관리를 설명하시오.', answer: '일정 관리, 강사 관리, 학습자 관리, 시설·자원', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 프로그램 운영 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일정 및 진행 관리\n2. 강사 섭외와 관리\n3. 학습자 관리\n4. 시설 및 자원 관리\n5. 행정 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '학습자 참여 촉진을 설명하시오.', answer: '동기부여, 참여활동, 학습공동체, 피드백', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 학습자 참여 촉진을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 동기부여 전략\n2. 적극적 참여활동\n3. 학습공동체 형성\n4. 지속적 피드백\n5. 참여율 제고\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '프로그램 모니터링을 설명하시오.', answer: '진행 점검, 문제 파악, 즉시 개선, 기록 관리', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 프로그램 모니터링을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 진행상황 점검\n2. 문제점 파악\n3. 즉각적 개선\n4. 기록 및 문서화\n5. 중간평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위기 대응과 문제해결을 설명하시오.', answer: '위기 상황, 대응 매뉴얼, 의사소통, 해결 방안', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 위기 대응과 문제해결을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위기 상황 유형\n2. 대응 매뉴얼\n3. 신속한 의사소통\n4. 문제해결 전략\n5. 사후 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'evaluation',
    name: '프로그램 평가',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: 'CIPP 평가모형을 설명하시오.', answer: '상황·투입·과정·산출 평가, 의사결정 지원', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: CIPP 평가모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상황평가(Context)\n2. 투입평가(Input)\n3. 과정평가(Process)\n4. 산출평가(Product)\n5. 의사결정 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'Kirkpatrick 4단계 평가를 설명하시오.', answer: '반응·학습·행동·결과, ROI 측정', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: Kirkpatrick 4단계 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1단계: 반응평가\n2. 2단계: 학습평가\n3. 3단계: 행동평가\n4. 4단계: 결과평가\n5. ROI 측정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '성과 측정과 분석을 설명하시오.', answer: '성과지표, 데이터 수집, 통계분석, 해석', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 성과 측정과 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성과지표 설정\n2. 데이터 수집 방법\n3. 통계분석\n4. 결과 해석\n5. 보고서 작성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '질적 평가 방법을 설명하시오.', answer: '면담, 관찰, 포커스그룹, 사례연구', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 질적 평가 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 심층면담\n2. 참여관찰\n3. 포커스그룹\n4. 사례연구\n5. 질적 데이터 분석\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '평가결과 활용과 환류를 설명하시오.', answer: '개선방안, 의사결정, 보고, 차기 기획', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 평가결과 활용과 환류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개선방안 도출\n2. 의사결정 지원\n3. 보고 및 공유\n4. 차기 프로그램 기획\n5. 지속적 개선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'advanced-topics',
    name: '프로그램 개발 심화',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '혁신적 프로그램 개발을 설명하시오.', answer: '디자인씽킹, 린스타트업, 애자일, 프로토타입', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 혁신적 프로그램 개발을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 디자인씽킹 적용\n2. 린스타트업 방법론\n3. 애자일 개발\n4. 프로토타입 제작\n5. 반복 개선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '온라인 프로그램 개발을 설명하시오.', answer: 'LMS, 콘텐츠 설계, 상호작용, 학습분석', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 온라인 프로그램 개발을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. LMS 구축\n2. 온라인 콘텐츠 설계\n3. 상호작용 설계\n4. 학습분석 활용\n5. 질 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '역량기반 프로그램 개발을 설명하시오.', answer: 'NCS, 역량체계, 교육과정, 평가', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 역량기반 프로그램 개발을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. NCS 기반 설계\n2. 역량체계 수립\n3. 역량기반 교육과정\n4. 역량평가 도구\n5. 역량인증\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '지역사회 기반 프로그램 개발을 설명하시오.', answer: '지역자원 연계, 파트너십, 맞춤형, 지속가능성', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 지역사회 기반 프로그램 개발을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지역자원 분석\n2. 파트너십 구축\n3. 지역 맞춤형 설계\n4. 주민참여 촉진\n5. 지속가능성 확보\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '프로그램 개발자의 역량을 설명하시오.', answer: '기획력, 실행력, 평가력, 협력, 혁신', prompt: '평생교육사 1급 평생교육프로그램개발론 문제입니다.\n\n문제: 프로그램 개발자의 역량을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기획 및 설계 역량\n2. 실행 및 운영 역량\n3. 평가 및 개선 역량\n4. 협력 및 소통 역량\n5. 혁신 및 창의 역량\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function ProgramDevelopment1StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('lifelong-educator-1-program-development-progress');
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
    localStorage.setItem('lifelong-educator-1-program-development-progress', JSON.stringify(arr));
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
            <span className="text-indigo-600 font-medium">평생교육프로그램개발론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">💡</span>
            <h1 className="text-2xl font-bold text-gray-800">평생교육프로그램개발론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">평생교육사 1급 시험과목 - 프로그램 개발 및 평가체계</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-indigo-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
