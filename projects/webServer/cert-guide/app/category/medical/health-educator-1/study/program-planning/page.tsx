'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  answer: string;
  prompt: string;
}

interface Topic {
  title: string;
  questions: Question[];
}

export default function ProgramPlanningStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));

  const topics: Topic[] = [
    {
      title: '요구도 분석과 우선순위 설정',
      questions: [
        { id: 1, question: '요구도 조사의 목적과 유형은?', answer: '실제 요구, 표현된 요구, 규범적 요구, 비교 요구를 파악하여 프로그램 방향을 결정한다.', prompt: '보건교육사 1급 시험 준비: 요구도 조사의 목적과 유형을 상세히 설명해주세요.' },
        { id: 2, question: '요구도 조사 방법의 종류는?', answer: '설문조사, 면담, 포커스그룹, 델파이기법, 명목집단기법, 지역사회포럼 등이 있다.', prompt: '보건교육사 1급 시험 준비: 요구도 조사 방법의 종류와 특징을 설명해주세요.' },
        { id: 3, question: '건강문제 우선순위 결정 기준은?', answer: '문제의 크기, 심각성, 해결가능성, 주민관심도 등을 종합적으로 고려한다.', prompt: '보건교육사 1급 시험 준비: 건강문제 우선순위 결정 기준을 설명해주세요.' },
        { id: 4, question: 'BPRS(Basic Priority Rating System)란?', answer: '문제의 크기, 심각성, 효과성을 점수화하여 우선순위를 결정하는 방법이다.', prompt: '보건교육사 1급 시험 준비: BPRS 우선순위 결정 방법을 설명해주세요.' },
        { id: 5, question: 'PATCH 모형의 특징과 단계는?', answer: 'Planned Approach to Community Health로, 지역사회 참여 기반 기획 모형이다.', prompt: '보건교육사 1급 시험 준비: PATCH 모형의 특징과 단계를 설명해주세요.' },
        { id: 6, question: 'MAPP 모형의 구성요소는?', answer: '지역사회 건강상태, 주제/힘 분석, 지역보건체계, 지역사회 강점 분석의 4가지 평가로 구성된다.', prompt: '보건교육사 1급 시험 준비: MAPP 모형의 구성요소를 설명해주세요.' },
        { id: 7, question: 'SWOT 분석의 활용 방법은?', answer: '강점, 약점, 기회, 위협을 분석하여 전략적 방향을 도출한다.', prompt: '보건교육사 1급 시험 준비: SWOT 분석의 활용 방법을 설명해주세요.' },
        { id: 8, question: '역학적 자료의 수집과 분석 방법은?', answer: '유병률, 발생률, 사망률 등 역학지표를 수집하고 지역간, 시간별 비교 분석한다.', prompt: '보건교육사 1급 시험 준비: 역학적 자료의 수집과 분석 방법을 설명해주세요.' },
        { id: 9, question: '자산기반 요구도 조사(Asset Mapping)란?', answer: '지역사회의 자원과 강점을 파악하여 이를 활용한 프로그램을 기획한다.', prompt: '보건교육사 1급 시험 준비: 자산기반 요구도 조사의 개념과 방법을 설명해주세요.' },
        { id: 10, question: '대상자 분석(Target Population Analysis)이란?', answer: '인구학적, 심리적, 행동적 특성을 분석하여 맞춤형 프로그램을 설계한다.', prompt: '보건교육사 1급 시험 준비: 대상자 분석의 방법과 중요성을 설명해주세요.' },
      ],
    },
    {
      title: 'PRECEDE-PROCEED 모형 적용',
      questions: [
        { id: 11, question: 'PRECEDE 모형의 사회적 진단이란?', answer: '지역사회 구성원의 삶의 질과 관련된 사회적 문제와 욕구를 파악하는 단계이다.', prompt: '보건교육사 1급 시험 준비: PRECEDE 모형의 사회적 진단을 설명해주세요.' },
        { id: 12, question: 'PRECEDE의 역학적 진단 방법은?', answer: '건강문제와 관련 요인을 파악하고 우선순위를 결정하는 단계이다.', prompt: '보건교육사 1급 시험 준비: PRECEDE의 역학적 진단 방법을 설명해주세요.' },
        { id: 13, question: '행동·환경적 진단의 구성요소는?', answer: '건강에 영향을 미치는 행동요인과 환경요인을 분석하여 개입점을 파악한다.', prompt: '보건교육사 1급 시험 준비: 행동·환경적 진단의 구성요소를 설명해주세요.' },
        { id: 14, question: '성향요인(Predisposing Factors)의 유형은?', answer: '지식, 태도, 신념, 가치, 자기효능감 등 행동 동기에 영향을 미치는 요인이다.', prompt: '보건교육사 1급 시험 준비: 성향요인의 유형과 분석 방법을 설명해주세요.' },
        { id: 15, question: '가능요인(Enabling Factors)의 유형은?', answer: '기술, 자원, 접근성, 서비스 가용성 등 행동을 가능하게 하는 요인이다.', prompt: '보건교육사 1급 시험 준비: 가능요인의 유형과 분석 방법을 설명해주세요.' },
        { id: 16, question: '강화요인(Reinforcing Factors)의 유형은?', answer: '사회적 지지, 보상, 피드백 등 행동을 유지하게 하는 요인이다.', prompt: '보건교육사 1급 시험 준비: 강화요인의 유형과 분석 방법을 설명해주세요.' },
        { id: 17, question: '행정·정책적 진단의 내용은?', answer: '조직 역량, 자원, 정책 환경을 분석하여 실행 가능성을 평가한다.', prompt: '보건교육사 1급 시험 준비: 행정·정책적 진단의 내용을 설명해주세요.' },
        { id: 18, question: 'PROCEED의 과정평가 방법은?', answer: '프로그램 실행 과정의 충실도, 참여율, 만족도 등을 평가한다.', prompt: '보건교육사 1급 시험 준비: PROCEED의 과정평가 방법을 설명해주세요.' },
        { id: 19, question: 'PROCEED의 영향평가와 결과평가는?', answer: '영향평가는 성향/가능/강화 요인 변화, 결과평가는 건강상태 변화를 측정한다.', prompt: '보건교육사 1급 시험 준비: PROCEED의 영향평가와 결과평가를 설명해주세요.' },
        { id: 20, question: 'PRECEDE-PROCEED 모형의 장단점은?', answer: '종합적 접근이 장점이나 시간과 자원이 많이 소요되는 것이 단점이다.', prompt: '보건교육사 1급 시험 준비: PRECEDE-PROCEED 모형의 장단점을 설명해주세요.' },
      ],
    },
    {
      title: '프로그램 설계와 목표 설정',
      questions: [
        { id: 21, question: 'SMART 목표 설정의 원칙은?', answer: 'Specific, Measurable, Achievable, Relevant, Time-bound의 원칙을 적용한다.', prompt: '보건교육사 1급 시험 준비: SMART 목표 설정의 원칙과 예시를 설명해주세요.' },
        { id: 22, question: '학습목표의 3가지 영역은?', answer: '인지적(지식), 정의적(태도), 심동적(기술) 영역으로 구분하여 목표를 설정한다.', prompt: '보건교육사 1급 시험 준비: 학습목표의 3가지 영역을 설명해주세요.' },
        { id: 23, question: '논리모형(Logic Model) 작성법은?', answer: '투입→활동→산출→결과→영향의 인과관계를 논리적으로 연결한다.', prompt: '보건교육사 1급 시험 준비: 논리모형 작성법을 상세히 설명해주세요.' },
        { id: 24, question: '이론기반 프로그램 설계의 중요성은?', answer: '건강행동이론을 적용하여 프로그램의 효과성을 높이고 평가 근거를 확보한다.', prompt: '보건교육사 1급 시험 준비: 이론기반 프로그램 설계의 중요성을 설명해주세요.' },
        { id: 25, question: '인터벤션 매핑의 6단계는?', answer: '요구사정→목표행렬→이론기반방법→프로그램구성요소→채택실행계획→평가계획의 6단계이다.', prompt: '보건교육사 1급 시험 준비: 인터벤션 매핑의 6단계를 상세히 설명해주세요.' },
        { id: 26, question: '수행목표(Performance Objectives) 설정법은?', answer: '누가, 무엇을, 얼마나, 언제까지를 포함하여 구체적으로 진술한다.', prompt: '보건교육사 1급 시험 준비: 수행목표 설정법을 설명해주세요.' },
        { id: 27, question: '결정요인(Determinants) 분석 방법은?', answer: '행동에 영향을 미치는 개인적, 환경적 요인을 이론에 근거하여 분석한다.', prompt: '보건교육사 1급 시험 준비: 결정요인 분석 방법을 설명해주세요.' },
        { id: 28, question: '변화방법(Change Methods) 선정 기준은?', answer: '이론적 근거, 효과 크기, 실행 가능성, 적용 조건을 고려하여 선정한다.', prompt: '보건교육사 1급 시험 준비: 변화방법 선정 기준을 설명해주세요.' },
        { id: 29, question: '프로그램 구성요소 설계 원칙은?', answer: '대상자 특성, 세팅, 자원을 고려하여 실행 가능한 활동을 설계한다.', prompt: '보건교육사 1급 시험 준비: 프로그램 구성요소 설계 원칙을 설명해주세요.' },
        { id: 30, question: '프로그램 범위와 순서 결정 방법은?', answer: '학습 내용의 범위(scope)와 계열(sequence)을 논리적으로 조직한다.', prompt: '보건교육사 1급 시험 준비: 프로그램 범위와 순서 결정 방법을 설명해주세요.' },
      ],
    },
    {
      title: '프로그램 실행과 관리',
      questions: [
        { id: 31, question: '프로그램 실행 계획 수립 방법은?', answer: '일정, 담당자, 자원, 장소, 방법을 구체화하여 실행계획서를 작성한다.', prompt: '보건교육사 1급 시험 준비: 프로그램 실행 계획 수립 방법을 설명해주세요.' },
        { id: 32, question: '간트차트(Gantt Chart) 작성법은?', answer: '작업, 일정, 담당자를 막대그래프로 표시하여 진행상황을 관리한다.', prompt: '보건교육사 1급 시험 준비: 간트차트 작성법을 설명해주세요.' },
        { id: 33, question: 'PERT/CPM의 활용 방법은?', answer: '작업 간 의존관계와 소요시간을 분석하여 핵심경로를 파악한다.', prompt: '보건교육사 1급 시험 준비: PERT/CPM의 활용 방법을 설명해주세요.' },
        { id: 34, question: '예산 편성과 관리 원칙은?', answer: '인건비, 운영비, 사업비 등을 항목별로 편성하고 집행을 관리한다.', prompt: '보건교육사 1급 시험 준비: 예산 편성과 관리 원칙을 설명해주세요.' },
        { id: 35, question: '인력 배치와 역할 분담 방법은?', answer: '업무 특성에 맞는 인력을 배치하고 역할과 책임을 명확히 한다.', prompt: '보건교육사 1급 시험 준비: 인력 배치와 역할 분담 방법을 설명해주세요.' },
        { id: 36, question: '파일럿 테스트의 목적과 방법은?', answer: '본 실행 전 소규모로 시범 운영하여 문제점을 파악하고 수정한다.', prompt: '보건교육사 1급 시험 준비: 파일럿 테스트의 목적과 방법을 설명해주세요.' },
        { id: 37, question: '프로그램 충실도(Fidelity) 관리는?', answer: '계획대로 실행되는지 내용, 빈도, 시간, 방법의 충실도를 점검한다.', prompt: '보건교육사 1급 시험 준비: 프로그램 충실도 관리 방법을 설명해주세요.' },
        { id: 38, question: '위기관리와 문제해결 방법은?', answer: '예상 문제를 사전에 파악하고 대응 계획을 수립하여 위기에 대비한다.', prompt: '보건교육사 1급 시험 준비: 위기관리와 문제해결 방법을 설명해주세요.' },
        { id: 39, question: '협력 파트너십 구축 방법은?', answer: '지역사회 자원을 연계하고 협력관계를 구축하여 프로그램 효과를 높인다.', prompt: '보건교육사 1급 시험 준비: 협력 파트너십 구축 방법을 설명해주세요.' },
        { id: 40, question: '참여자 모집과 유지 전략은?', answer: '홍보, 인센티브, 편의제공, 리마인더 등을 활용하여 참여를 촉진한다.', prompt: '보건교육사 1급 시험 준비: 참여자 모집과 유지 전략을 설명해주세요.' },
      ],
    },
    {
      title: '프로그램 평가와 확산',
      questions: [
        { id: 41, question: '프로그램 평가의 유형과 목적은?', answer: '형성평가, 과정평가, 총괄평가(영향/결과)로 구분되며 각각 다른 목적을 가진다.', prompt: '보건교육사 1급 시험 준비: 프로그램 평가의 유형과 목적을 설명해주세요.' },
        { id: 42, question: 'RE-AIM 프레임워크의 적용은?', answer: 'Reach, Efficacy, Adoption, Implementation, Maintenance 5차원으로 평가한다.', prompt: '보건교육사 1급 시험 준비: RE-AIM 프레임워크의 적용 방법을 설명해주세요.' },
        { id: 43, question: '비용효과분석과 비용편익분석의 차이는?', answer: '비용효과는 자연단위, 비용편익은 화폐단위로 결과를 측정하여 분석한다.', prompt: '보건교육사 1급 시험 준비: 비용효과분석과 비용편익분석의 차이를 설명해주세요.' },
        { id: 44, question: '평가 설계의 유형과 특징은?', answer: '실험설계, 준실험설계, 비실험설계가 있으며 내적/외적 타당도를 고려한다.', prompt: '보건교육사 1급 시험 준비: 평가 설계의 유형과 특징을 설명해주세요.' },
        { id: 45, question: '양적 평가와 질적 평가의 통합은?', answer: '혼합방법 연구로 양적 데이터와 질적 데이터를 통합하여 심층 이해를 도모한다.', prompt: '보건교육사 1급 시험 준비: 양적 평가와 질적 평가의 통합 방법을 설명해주세요.' },
        { id: 46, question: '평가결과 보고서 작성법은?', answer: '목적, 방법, 결과, 결론, 권고사항을 체계적으로 기술하여 이해관계자와 공유한다.', prompt: '보건교육사 1급 시험 준비: 평가결과 보고서 작성법을 설명해주세요.' },
        { id: 47, question: '프로그램 확산(Dissemination) 전략은?', answer: '근거 생성, 매뉴얼화, 교육훈련, 기술지원 등을 통해 확산을 촉진한다.', prompt: '보건교육사 1급 시험 준비: 프로그램 확산 전략을 설명해주세요.' },
        { id: 48, question: '프로그램 지속가능성 확보 방안은?', answer: '제도화, 재정 확보, 인력 역량강화, 조직 지원 등을 통해 지속성을 확보한다.', prompt: '보건교육사 1급 시험 준비: 프로그램 지속가능성 확보 방안을 설명해주세요.' },
        { id: 49, question: '성공적 프로그램의 특성은?', answer: '이론 기반, 대상자 맞춤, 다수준 접근, 충분한 기간, 질 관리가 핵심이다.', prompt: '보건교육사 1급 시험 준비: 성공적 프로그램의 특성을 설명해주세요.' },
        { id: 50, question: '근거기반 프로그램 선정과 적용은?', answer: '효과가 입증된 프로그램을 선정하고 지역 맥락에 맞게 적응하여 적용한다.', prompt: '보건교육사 1급 시험 준비: 근거기반 프로그램 선정과 적용 방법을 설명해주세요.' },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-1-program-planning-progress');
    if (saved) {
      setCompletedQuestions(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleQuestion = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedQuestions(newCompleted);
    localStorage.setItem('health-educator-1-program-planning-progress', JSON.stringify([...newCompleted]));
  };

  const toggleTopic = (index: number) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTopics(newExpanded);
  };

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = completedQuestions.size;
  const progressPercentage = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-orange-600">홈</Link>
            <span>›</span>
            <Link href="/category/medical" className="hover:text-orange-600">의료·보건</Link>
            <span>›</span>
            <Link href="/category/medical/health-educator-1" className="hover:text-orange-600">보건교육사 1급</Link>
            <span>›</span>
            <span className="text-orange-600 font-medium">프로그램개발</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">🎯 프로그램개발 학습 가이드</h1>
          <p className="text-sm text-gray-500 mt-1">보건교육사 1급 필기 4과목</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">학습 진도</span>
            <span className="text-sm text-gray-500">{completedCount} / {totalQuestions} 완료</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="text-right mt-1 text-sm text-orange-600 font-medium">{progressPercentage}%</div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicCompleted = topic.questions.filter(q => completedQuestions.has(q.id)).length;
            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{expandedTopics.has(topicIndex) ? '📂' : '📁'}</span>
                    <span className="font-medium text-gray-800">{topic.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{topicCompleted}/{topic.questions.length}</span>
                    <span className="text-gray-400">{expandedTopics.has(topicIndex) ? '▲' : '▼'}</span>
                  </div>
                </button>
                {expandedTopics.has(topicIndex) && (
                  <div className="p-4 space-y-3">
                    {topic.questions.map((q) => (
                      <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.has(q.id) ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(q.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${completedQuestions.has(q.id) ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300 hover:border-orange-500'}`}
                          >
                            {completedQuestions.has(q.id) && '✓'}
                          </button>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                            <p className="text-sm text-gray-600 mb-3">{q.answer}</p>
                            <div className="flex gap-2">
                              <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition">Claude</a>
                              <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition">ChatGPT</a>
                              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">Gemini</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
