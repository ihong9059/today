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

export default function HealthEducationTheoryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));

  const topics: Topic[] = [
    {
      title: '보건교육의 철학과 역사',
      questions: [
        { id: 1, question: '보건교육의 정의와 목적은 무엇인가?', answer: '보건교육은 개인, 가족, 지역사회가 건강에 대한 지식, 태도, 행동을 변화시켜 건강을 유지·증진하도록 돕는 계획적 학습 경험이다.', prompt: '보건교육사 1급 시험 준비: 보건교육의 정의와 목적에 대해 상세히 설명해주세요. 역사적 맥락과 현대적 의미를 포함해주세요.' },
        { id: 2, question: '보건교육의 역사적 발전 과정을 설명하시오.', answer: '초기 위생교육 → 건강교육 → 건강증진교육으로 발전. 오타와헌장(1986)이 현대 건강증진의 기틀을 마련했다.', prompt: '보건교육사 1급 시험 준비: 보건교육의 역사적 발전 과정을 시대별로 상세히 설명해주세요.' },
        { id: 3, question: '보건교육 철학의 주요 관점을 비교하시오.', answer: '행동주의(외부자극-반응), 인본주의(자기실현), 비판주의(사회구조 비판), 구성주의(학습자 중심 지식구성) 관점이 있다.', prompt: '보건교육사 1급 시험 준비: 보건교육 철학의 4가지 주요 관점을 비교 설명해주세요.' },
        { id: 4, question: '한국 보건교육의 발전 과정과 특징은?', answer: '1960년대 가족계획사업 → 1995년 국민건강증진법 → 2003년 보건교육사 제도 도입으로 전문화되었다.', prompt: '보건교육사 1급 시험 준비: 한국 보건교육의 발전 과정과 특징을 설명해주세요.' },
        { id: 5, question: '보건교육사 제도의 의의와 역할은?', answer: '국민건강증진법에 근거한 국가공인 자격으로, 건강증진 전문인력으로서 보건교육 기획, 실행, 평가를 담당한다.', prompt: '보건교육사 1급 시험 준비: 보건교육사 제도의 법적 근거, 의의, 역할에 대해 설명해주세요.' },
        { id: 6, question: '세계보건기구(WHO)의 건강 정의와 그 의미는?', answer: '단순히 질병이 없는 상태가 아닌, 신체적, 정신적, 사회적으로 완전히 안녕한 상태를 의미한다.', prompt: '보건교육사 1급 시험 준비: WHO의 건강 정의와 그 발전 과정, 현대적 의미를 설명해주세요.' },
        { id: 7, question: '오타와 헌장의 5가지 건강증진 활동 영역은?', answer: '건강한 공공정책 수립, 지지적 환경 조성, 지역사회 활동 강화, 개인의 기술 개발, 보건의료서비스 재정향이다.', prompt: '보건교육사 1급 시험 준비: 오타와 헌장의 5가지 건강증진 활동 영역을 상세히 설명해주세요.' },
        { id: 8, question: '건강증진의 3가지 핵심 전략은?', answer: '옹호(Advocate), 역량강화(Enable), 중재(Mediate)가 오타와 헌장에서 제시된 핵심 전략이다.', prompt: '보건교육사 1급 시험 준비: 건강증진의 3가지 핵심 전략(옹호, 역량강화, 중재)을 설명해주세요.' },
        { id: 9, question: '보건교육과 건강증진의 관계는?', answer: '보건교육은 건강증진의 핵심 전략 중 하나로, 개인의 건강역량 강화를 통해 건강증진 목표 달성에 기여한다.', prompt: '보건교육사 1급 시험 준비: 보건교육과 건강증진의 관계를 개념적으로 설명해주세요.' },
        { id: 10, question: '보건교육의 윤리적 원칙은?', answer: '자율성 존중, 선행, 악행금지, 정의의 원칙이 적용되며, 대상자의 자기결정권을 존중해야 한다.', prompt: '보건교육사 1급 시험 준비: 보건교육의 윤리적 원칙과 실천 방안을 설명해주세요.' },
      ],
    },
    {
      title: '학습이론과 교육심리',
      questions: [
        { id: 11, question: '행동주의 학습이론의 핵심 개념은?', answer: '외부 자극에 의한 행동 변화를 강조하며, 고전적 조건화(파블로프), 조작적 조건화(스키너)가 대표적이다.', prompt: '보건교육사 1급 시험 준비: 행동주의 학습이론의 핵심 개념과 보건교육 적용 사례를 설명해주세요.' },
        { id: 12, question: '인지주의 학습이론의 주요 특징은?', answer: '학습자의 내적 인지 과정을 강조하며, 정보처리이론, 발견학습(브루너), 유의미학습(오수벨)이 있다.', prompt: '보건교육사 1급 시험 준비: 인지주의 학습이론의 특징과 보건교육 적용을 설명해주세요.' },
        { id: 13, question: '사회학습이론(반두라)의 핵심 개념은?', answer: '관찰학습과 자기효능감을 강조하며, 주의-파지-재생-동기화의 4단계 모방학습 과정을 거친다.', prompt: '보건교육사 1급 시험 준비: 반두라의 사회학습이론과 보건교육 적용을 상세히 설명해주세요.' },
        { id: 14, question: '구성주의 학습이론의 원리는?', answer: '학습자가 능동적으로 지식을 구성한다는 관점으로, 문제중심학습, 협동학습 등에 적용된다.', prompt: '보건교육사 1급 시험 준비: 구성주의 학습이론의 원리와 보건교육 적용 방안을 설명해주세요.' },
        { id: 15, question: '성인학습이론(앤드라고지)의 특징은?', answer: '자기주도성, 경험 활용, 즉시적 적용, 문제중심 학습, 내적 동기가 성인 학습자의 특성이다.', prompt: '보건교육사 1급 시험 준비: 앤드라고지(성인학습이론)의 특징과 보건교육 적용을 설명해주세요.' },
        { id: 16, question: '동기부여 이론과 보건교육의 관계는?', answer: '매슬로우의 욕구위계, 내재적/외재적 동기, 자기결정이론 등이 건강행동 변화 동기 유발에 활용된다.', prompt: '보건교육사 1급 시험 준비: 동기부여 이론들과 보건교육에서의 적용 방안을 설명해주세요.' },
        { id: 17, question: '자기효능감의 4가지 원천은?', answer: '성취경험(가장 강력), 대리경험, 언어적 설득, 생리적/정서적 상태가 자기효능감을 형성한다.', prompt: '보건교육사 1급 시험 준비: 자기효능감의 4가지 원천과 향상 전략을 설명해주세요.' },
        { id: 18, question: '학습양식의 유형과 교육 적용은?', answer: '시각형, 청각형, 읽기/쓰기형, 운동감각형 등 다양한 학습양식에 맞춘 교육방법 선택이 필요하다.', prompt: '보건교육사 1급 시험 준비: 학습양식의 유형과 보건교육에서의 적용 방안을 설명해주세요.' },
        { id: 19, question: '전이(Transfer)의 유형과 촉진 방법은?', answer: '긍정적/부정적, 수평적/수직적 전이가 있으며, 실제 상황과 유사한 학습환경 조성으로 촉진한다.', prompt: '보건교육사 1급 시험 준비: 학습전이의 유형과 촉진 방법을 보건교육 맥락에서 설명해주세요.' },
        { id: 20, question: '피드백의 유형과 효과적 제공 방법은?', answer: '즉각적/지연적, 긍정적/교정적 피드백이 있으며, 구체적이고 건설적인 피드백이 학습효과를 높인다.', prompt: '보건교육사 1급 시험 준비: 피드백의 유형과 효과적인 제공 방법을 설명해주세요.' },
      ],
    },
    {
      title: '교수설계와 교육방법',
      questions: [
        { id: 21, question: 'ADDIE 모형의 5단계를 설명하시오.', answer: '분석(Analysis), 설계(Design), 개발(Development), 실행(Implementation), 평가(Evaluation)의 체계적 교수설계 모형이다.', prompt: '보건교육사 1급 시험 준비: ADDIE 모형의 각 단계와 보건교육 프로그램 적용 사례를 설명해주세요.' },
        { id: 22, question: '학습목표 진술의 ABCD 원칙은?', answer: 'Audience(대상), Behavior(행동), Condition(조건), Degree(기준)를 포함하여 구체적으로 진술해야 한다.', prompt: '보건교육사 1급 시험 준비: 학습목표 진술의 ABCD 원칙과 좋은 예시를 설명해주세요.' },
        { id: 23, question: '블룸의 교육목표 분류체계는?', answer: '인지적(지식→이해→적용→분석→종합→평가), 정의적(수용→반응→가치화→조직화→인격화), 심동적 영역으로 분류된다.', prompt: '보건교육사 1급 시험 준비: 블룸의 교육목표 분류체계를 상세히 설명해주세요.' },
        { id: 24, question: '강의법의 장단점과 효과적 활용 방법은?', answer: '대규모 정보전달에 효과적이나 일방적이라는 단점. 질문, 시청각 자료 활용으로 상호작용을 높인다.', prompt: '보건교육사 1급 시험 준비: 강의법의 장단점과 효과적인 활용 방법을 설명해주세요.' },
        { id: 25, question: '토의법의 유형과 진행 방법은?', answer: '원탁토의, 패널토의, 심포지엄, 버즈세션 등이 있으며, 명확한 주제와 규칙 설정이 중요하다.', prompt: '보건교육사 1급 시험 준비: 토의법의 유형과 효과적인 진행 방법을 설명해주세요.' },
        { id: 26, question: '역할극의 교육적 효과와 적용 방법은?', answer: '태도 변화와 공감 능력 향상에 효과적이며, 충분한 사전 안내와 디브리핑이 필요하다.', prompt: '보건교육사 1급 시험 준비: 역할극의 교육적 효과와 적용 방법을 설명해주세요.' },
        { id: 27, question: '사례연구법의 특징과 활용 방법은?', answer: '실제 사례를 분석하여 문제해결 능력을 기르며, 다양한 관점에서 분석하도록 유도한다.', prompt: '보건교육사 1급 시험 준비: 사례연구법의 특징과 보건교육에서의 활용 방법을 설명해주세요.' },
        { id: 28, question: '시뮬레이션과 게이미피케이션의 활용은?', answer: '안전한 환경에서 실제 상황을 경험하게 하며, 게임 요소로 학습 동기와 몰입을 높인다.', prompt: '보건교육사 1급 시험 준비: 시뮬레이션과 게이미피케이션의 보건교육 적용을 설명해주세요.' },
        { id: 29, question: '플립러닝(거꾸로 학습)의 원리와 적용은?', answer: '사전학습 후 수업시간에 토론/실습하는 방식으로, 자기주도학습과 심화학습이 가능하다.', prompt: '보건교육사 1급 시험 준비: 플립러닝의 원리와 보건교육 적용 방안을 설명해주세요.' },
        { id: 30, question: '교수매체 선정의 기준과 원리는?', answer: 'ASSURE 모형에 따라 학습자, 목표, 내용, 환경을 고려하여 적절한 매체를 선정한다.', prompt: '보건교육사 1급 시험 준비: 교수매체 선정의 기준과 ASSURE 모형을 설명해주세요.' },
      ],
    },
    {
      title: '교육평가와 요구도 조사',
      questions: [
        { id: 31, question: '교육평가의 유형(시기별)을 설명하시오.', answer: '진단평가(사전), 형성평가(과정 중), 총괄평가(종료 후)로 구분되며 각각 다른 목적을 가진다.', prompt: '보건교육사 1급 시험 준비: 시기별 교육평가 유형과 각각의 목적, 방법을 설명해주세요.' },
        { id: 32, question: '평가도구의 타당도 유형은?', answer: '내용타당도, 구인타당도, 준거타당도(예측/공인)가 있으며, 측정하고자 하는 것을 정확히 측정하는지를 나타낸다.', prompt: '보건교육사 1급 시험 준비: 평가도구 타당도의 유형과 확보 방법을 설명해주세요.' },
        { id: 33, question: '평가도구의 신뢰도 확보 방법은?', answer: '검사-재검사, 동형검사, 반분검사, 문항내적일관성(Cronbach\'s α) 방법으로 신뢰도를 검증한다.', prompt: '보건교육사 1급 시험 준비: 평가도구 신뢰도의 유형과 확보 방법을 설명해주세요.' },
        { id: 34, question: '요구도 조사의 목적과 방법은?', answer: '현재 상태와 바람직한 상태의 차이를 파악하여 교육 우선순위를 결정하는 것이 목적이다.', prompt: '보건교육사 1급 시험 준비: 요구도 조사의 목적, 방법, 분석 기법을 설명해주세요.' },
        { id: 35, question: 'PRECEDE 모형에서의 요구도 진단 단계는?', answer: '사회적 진단, 역학적 진단, 행동환경적 진단, 교육조직적 진단, 행정정책적 진단의 5단계로 구성된다.', prompt: '보건교육사 1급 시험 준비: PRECEDE 모형의 요구도 진단 5단계를 상세히 설명해주세요.' },
        { id: 36, question: '커크패트릭의 4단계 평가모형은?', answer: '반응(1단계), 학습(2단계), 행동(3단계), 결과(4단계)로 교육효과를 체계적으로 평가한다.', prompt: '보건교육사 1급 시험 준비: 커크패트릭의 4단계 평가모형과 각 단계별 평가방법을 설명해주세요.' },
        { id: 37, question: '질적 평가와 양적 평가의 특징 비교는?', answer: '양적 평가는 수량화와 일반화, 질적 평가는 맥락적 이해와 심층 분석에 강점이 있다.', prompt: '보건교육사 1급 시험 준비: 질적 평가와 양적 평가의 특징을 비교 설명해주세요.' },
        { id: 38, question: '포트폴리오 평가의 특징과 활용은?', answer: '학습 과정과 성장을 종합적으로 평가하며, 자기성찰과 자기주도학습을 촉진한다.', prompt: '보건교육사 1급 시험 준비: 포트폴리오 평가의 특징과 보건교육 적용을 설명해주세요.' },
        { id: 39, question: '수행평가의 유형과 설계 원리는?', answer: '실제 과제 수행을 통해 능력을 평가하며, 루브릭을 활용하여 객관적 평가기준을 마련한다.', prompt: '보건교육사 1급 시험 준비: 수행평가의 유형과 루브릭 설계 원리를 설명해주세요.' },
        { id: 40, question: '평가결과의 환류(피드백) 활용 방법은?', answer: '평가결과를 교육프로그램 개선, 학습자 피드백, 정책 결정에 활용하여 질 향상을 도모한다.', prompt: '보건교육사 1급 시험 준비: 평가결과의 환류 활용 방법과 의의를 설명해주세요.' },
      ],
    },
    {
      title: '보건교육 프로그램 기획과 관리',
      questions: [
        { id: 41, question: 'PRECEDE-PROCEED 모형의 전체 구조는?', answer: 'PRECEDE(4단계 진단)와 PROCEED(4단계 실행/평가)로 구성된 종합적 보건교육 기획모형이다.', prompt: '보건교육사 1급 시험 준비: PRECEDE-PROCEED 모형의 전체 구조와 각 단계를 상세히 설명해주세요.' },
        { id: 42, question: '논리모형(Logic Model)의 구성요소는?', answer: '투입(Input), 활동(Activity), 산출(Output), 결과(Outcome), 영향(Impact)으로 구성된다.', prompt: '보건교육사 1급 시험 준비: 논리모형의 구성요소와 작성 방법을 설명해주세요.' },
        { id: 43, question: 'SMART 목표 설정 원칙은?', answer: 'Specific(구체적), Measurable(측정가능), Achievable(달성가능), Relevant(관련성), Time-bound(기한설정)의 원칙이다.', prompt: '보건교육사 1급 시험 준비: SMART 목표 설정 원칙과 좋은 예시를 설명해주세요.' },
        { id: 44, question: '프로그램 예산 편성의 원칙과 방법은?', answer: '목표 기반 예산편성, 항목별 예산, 성과 기반 예산 등의 방법이 있으며 효율성을 고려한다.', prompt: '보건교육사 1급 시험 준비: 보건교육 프로그램 예산 편성의 원칙과 방법을 설명해주세요.' },
        { id: 45, question: '프로젝트 관리 도구(간트차트, PERT)의 활용은?', answer: '간트차트는 일정관리, PERT/CPM은 작업 순서와 소요시간 분석에 활용된다.', prompt: '보건교육사 1급 시험 준비: 간트차트와 PERT의 특징과 활용 방법을 설명해주세요.' },
        { id: 46, question: '이해관계자 분석의 목적과 방법은?', answer: '프로그램에 영향을 주고받는 집단을 파악하고 참여 전략을 수립하여 협력을 이끌어낸다.', prompt: '보건교육사 1급 시험 준비: 이해관계자 분석의 목적과 방법을 설명해주세요.' },
        { id: 47, question: '파일럿 테스트의 목적과 절차는?', answer: '본 프로그램 실시 전 소규모로 시범 운영하여 문제점을 파악하고 개선하는 과정이다.', prompt: '보건교육사 1급 시험 준비: 파일럿 테스트의 목적과 절차를 설명해주세요.' },
        { id: 48, question: '프로그램 품질관리(QA/QI)의 원리는?', answer: '지속적 질 향상(CQI)을 위해 계획-실행-점검-개선(PDCA) 사이클을 적용한다.', prompt: '보건교육사 1급 시험 준비: 프로그램 품질관리의 원리와 방법을 설명해주세요.' },
        { id: 49, question: '프로그램 지속가능성 확보 전략은?', answer: '제도화, 재정 확보, 역량강화, 파트너십 구축, 근거 생성 등의 전략이 필요하다.', prompt: '보건교육사 1급 시험 준비: 프로그램 지속가능성 확보 전략을 설명해주세요.' },
        { id: 50, question: '프로그램 확산(Dissemination)과 채택 전략은?', answer: '혁신확산이론에 따라 상대적 이점, 적합성, 복잡성, 시험가능성, 관찰가능성을 고려한다.', prompt: '보건교육사 1급 시험 준비: 프로그램 확산 전략과 혁신확산이론을 설명해주세요.' },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-1-health-education-theory-progress');
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
    localStorage.setItem('health-educator-1-health-education-theory-progress', JSON.stringify([...newCompleted]));
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
            <Link href="/" className="hover:text-pink-600">홈</Link>
            <span>›</span>
            <Link href="/category/medical" className="hover:text-pink-600">의료·보건</Link>
            <span>›</span>
            <Link href="/category/medical/health-educator-1" className="hover:text-pink-600">보건교육사 1급</Link>
            <span>›</span>
            <span className="text-pink-600 font-medium">보건교육학</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">📚 보건교육학 학습 가이드</h1>
          <p className="text-sm text-gray-500 mt-1">보건교육사 1급 필기 1과목</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">학습 진도</span>
            <span className="text-sm text-gray-500">{completedCount} / {totalQuestions} 완료</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-pink-500 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="text-right mt-1 text-sm text-pink-600 font-medium">{progressPercentage}%</div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.has(q.id) ? 'bg-pink-50 border-pink-200' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(q.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${completedQuestions.has(q.id) ? 'bg-pink-500 border-pink-500 text-white' : 'border-gray-300 hover:border-pink-500'}`}
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
