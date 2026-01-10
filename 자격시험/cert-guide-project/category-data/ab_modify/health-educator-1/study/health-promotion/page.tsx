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

export default function HealthPromotionStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));

  const topics: Topic[] = [
    {
      title: '건강증진의 개념과 원리',
      questions: [
        { id: 1, question: '건강증진의 정의와 기본 개념은?', answer: '건강증진은 사람들이 자신의 건강에 대한 통제력을 높이고 건강을 향상시킬 수 있도록 하는 과정이다.', prompt: '보건교육사 1급 시험 준비: 건강증진의 정의와 기본 개념을 상세히 설명해주세요.' },
        { id: 2, question: '건강증진과 질병예방의 차이점은?', answer: '건강증진은 적극적 건강향상, 질병예방은 특정 질병 발생 방지에 초점을 둔다. 1차/2차/3차 예방과 연계된다.', prompt: '보건교육사 1급 시험 준비: 건강증진과 질병예방의 차이점을 비교 설명해주세요.' },
        { id: 3, question: '오타와 헌장의 건강증진 5대 활동 영역은?', answer: '건강한 공공정책 수립, 지지적 환경 조성, 지역사회 활동 강화, 개인의 기술 개발, 보건의료서비스 재정향이다.', prompt: '보건교육사 1급 시험 준비: 오타와 헌장의 5대 활동 영역을 상세히 설명해주세요.' },
        { id: 4, question: '방콕헌장(2005)의 주요 내용은?', answer: '세계화 시대 건강증진 전략으로, 옹호, 투자, 역량강화, 규제, 파트너십의 5가지 핵심 약속을 제시했다.', prompt: '보건교육사 1급 시험 준비: 방콕헌장의 주요 내용과 배경을 설명해주세요.' },
        { id: 5, question: '상하이 선언(2016)의 핵심 메시지는?', answer: '지속가능발전목표(SDGs)와 연계하여 건강형평성, 거버넌스, 건강도시/지역사회 강조했다.', prompt: '보건교육사 1급 시험 준비: 상하이 선언의 핵심 메시지와 의의를 설명해주세요.' },
        { id: 6, question: '건강의 사회적 결정요인이란?', answer: '사회경제적 지위, 교육, 고용, 주거환경 등 건강에 영향을 미치는 사회적 조건과 구조적 요인이다.', prompt: '보건교육사 1급 시험 준비: 건강의 사회적 결정요인과 그 영향을 설명해주세요.' },
        { id: 7, question: '건강형평성의 개념과 중요성은?', answer: '모든 사람이 건강 잠재력을 최대한 발휘할 수 있는 공정한 기회를 갖는 것으로, 취약계층 배려가 핵심이다.', prompt: '보건교육사 1급 시험 준비: 건강형평성의 개념과 중요성을 설명해주세요.' },
        { id: 8, question: '임파워먼트(역량강화)의 개념과 전략은?', answer: '개인과 지역사회가 건강에 대한 통제력을 갖도록 하는 과정으로, 참여적 접근이 핵심이다.', prompt: '보건교육사 1급 시험 준비: 임파워먼트의 개념과 건강증진에서의 적용 전략을 설명해주세요.' },
        { id: 9, question: '건강증진 접근법의 변천 과정은?', answer: '의료모형 → 예방모형 → 건강증진모형으로 발전했으며, 개인에서 사회생태학적 접근으로 확대되었다.', prompt: '보건교육사 1급 시험 준비: 건강증진 접근법의 변천 과정을 설명해주세요.' },
        { id: 10, question: '건강증진의 다부문 협력 전략은?', answer: '모든 정책에서의 건강(HiAP) 접근으로, 보건 이외 부문(교육, 교통 등)과의 협력이 필수적이다.', prompt: '보건교육사 1급 시험 준비: 건강증진의 다부문 협력 전략과 HiAP를 설명해주세요.' },
      ],
    },
    {
      title: '건강행동 변화 이론',
      questions: [
        { id: 11, question: '건강신념모형(HBM)의 구성요소는?', answer: '인지된 민감성, 심각성, 이익, 장애, 자기효능감, 행동 계기로 구성되어 건강행동을 설명한다.', prompt: '보건교육사 1급 시험 준비: 건강신념모형의 구성요소와 적용 사례를 설명해주세요.' },
        { id: 12, question: '합리적 행동이론과 계획행동이론의 차이는?', answer: 'TPB는 TRA에 지각된 행동통제력을 추가하여 비자발적 행동까지 설명 범위를 확장했다.', prompt: '보건교육사 1급 시험 준비: TRA와 TPB의 차이점과 적용을 설명해주세요.' },
        { id: 13, question: '범이론적 모형(TTM)의 변화 단계는?', answer: '계획전단계→계획단계→준비단계→행동단계→유지단계→(종결단계)의 6단계로 구성된다.', prompt: '보건교육사 1급 시험 준비: 범이론적 모형의 변화 단계와 각 단계별 개입 전략을 설명해주세요.' },
        { id: 14, question: 'TTM의 변화과정과 의사결정균형은?', answer: '인지적/행동적 변화과정 10가지와 장점/단점 균형 분석이 단계 이동을 촉진한다.', prompt: '보건교육사 1급 시험 준비: TTM의 변화과정과 의사결정균형을 상세히 설명해주세요.' },
        { id: 15, question: '사회인지이론(SCT)의 핵심 개념은?', answer: '상호결정론, 자기효능감, 결과기대, 관찰학습, 강화 등이 핵심이며 환경-개인-행동의 상호작용을 강조한다.', prompt: '보건교육사 1급 시험 준비: 사회인지이론의 핵심 개념과 적용을 설명해주세요.' },
        { id: 16, question: '자기효능감 증진 전략은?', answer: '성취경험, 대리경험, 언어적 설득, 생리적 상태 개선의 4가지 원천을 활용한다.', prompt: '보건교육사 1급 시험 준비: 자기효능감 증진 전략을 구체적으로 설명해주세요.' },
        { id: 17, question: '혁신확산이론의 채택자 유형은?', answer: '혁신자(2.5%), 초기채택자(13.5%), 초기다수(34%), 후기다수(34%), 지각수용자(16%)로 분류된다.', prompt: '보건교육사 1급 시험 준비: 혁신확산이론의 채택자 유형과 건강증진 적용을 설명해주세요.' },
        { id: 18, question: '혁신의 특성 5가지는?', answer: '상대적 이점, 적합성, 복잡성, 시험가능성, 관찰가능성이 혁신 채택에 영향을 미친다.', prompt: '보건교육사 1급 시험 준비: 혁신의 5가지 특성과 건강행동 변화 적용을 설명해주세요.' },
        { id: 19, question: '동기면담(MI)의 원리와 기법은?', answer: '공감표현, 모순발견, 저항극복, 자기효능감 지지가 핵심 원리이며 OARS 기법을 활용한다.', prompt: '보건교육사 1급 시험 준비: 동기면담의 원리와 기법을 상세히 설명해주세요.' },
        { id: 20, question: '변화단계별 맞춤형 개입 전략은?', answer: '각 단계에 맞는 변화과정을 적용하며, 계획전-인지적 과정, 행동-행동적 과정을 강조한다.', prompt: '보건교육사 1급 시험 준비: 변화단계별 맞춤형 개입 전략을 설명해주세요.' },
      ],
    },
    {
      title: '사회생태학적 모형과 지역사회 접근',
      questions: [
        { id: 21, question: '사회생태학적 모형의 다수준 구조는?', answer: '개인, 대인관계, 조직, 지역사회, 공공정책의 5개 수준에서 복합적으로 건강행동에 영향을 미친다.', prompt: '보건교육사 1급 시험 준비: 사회생태학적 모형의 다수준 구조를 설명해주세요.' },
        { id: 22, question: '지역사회 역량(Community Capacity)이란?', answer: '지역사회가 건강문제를 파악하고 해결할 수 있는 능력으로, 참여, 리더십, 자원 등이 포함된다.', prompt: '보건교육사 1급 시험 준비: 지역사회 역량의 개념과 구성요소를 설명해주세요.' },
        { id: 23, question: '지역사회 조직화 전략은?', answer: '지역사회 개발, 사회계획, 사회행동의 3가지 모델이 있으며 주민 참여와 역량강화가 핵심이다.', prompt: '보건교육사 1급 시험 준비: 지역사회 조직화 전략의 3가지 모델을 설명해주세요.' },
        { id: 24, question: '연합체(Coalition) 구축과 운영은?', answer: '다양한 이해관계자가 공동 목표를 위해 협력하는 조직으로, 명확한 미션과 역할 분담이 중요하다.', prompt: '보건교육사 1급 시험 준비: 건강증진 연합체 구축과 운영 방법을 설명해주세요.' },
        { id: 25, question: '사회적 자본과 건강의 관계는?', answer: '신뢰, 호혜성, 네트워크 등 사회적 자본이 건강에 긍정적 영향을 미치며 지역사회 결속력을 높인다.', prompt: '보건교육사 1급 시험 준비: 사회적 자본과 건강의 관계를 설명해주세요.' },
        { id: 26, question: '건강도시(Healthy Cities) 프로젝트란?', answer: 'WHO 주도의 도시건강 향상 프로젝트로, 건강한 환경과 정책을 통해 시민 건강을 증진한다.', prompt: '보건교육사 1급 시험 준비: 건강도시 프로젝트의 개념과 특징을 설명해주세요.' },
        { id: 27, question: '건강영향평가(HIA)의 절차와 방법은?', answer: '선별-범위설정-평가-권고-모니터링의 절차로 정책/사업이 건강에 미치는 영향을 사전 평가한다.', prompt: '보건교육사 1급 시험 준비: 건강영향평가의 절차와 방법을 설명해주세요.' },
        { id: 28, question: '사회적 마케팅의 4P 전략은?', answer: 'Product(제품), Price(가격), Place(장소), Promotion(촉진)을 건강행동 변화에 적용한다.', prompt: '보건교육사 1급 시험 준비: 사회적 마케팅의 4P 전략과 건강증진 적용을 설명해주세요.' },
        { id: 29, question: '지역사회 참여적 연구(CBPR)란?', answer: '지역사회 구성원이 연구 전 과정에 동등하게 참여하는 협력적 연구 방법론이다.', prompt: '보건교육사 1급 시험 준비: 지역사회 참여적 연구(CBPR)의 원칙과 절차를 설명해주세요.' },
        { id: 30, question: '자산기반 지역사회 개발(ABCD)이란?', answer: '지역사회의 강점과 자원에 초점을 맞추어 역량을 강화하는 접근법이다.', prompt: '보건교육사 1급 시험 준비: 자산기반 지역사회 개발(ABCD)의 원리를 설명해주세요.' },
      ],
    },
    {
      title: '건강증진 프로그램 기획과 평가',
      questions: [
        { id: 31, question: 'PRECEDE-PROCEED 모형의 전체 구조는?', answer: 'PRECEDE(사회-역학-행동환경-교육생태 진단)와 PROCEED(실행-과정-영향-결과 평가)로 구성된다.', prompt: '보건교육사 1급 시험 준비: PRECEDE-PROCEED 모형의 전체 구조를 상세히 설명해주세요.' },
        { id: 32, question: 'PRECEDE의 성향요인, 가능요인, 강화요인은?', answer: '성향(지식,태도), 가능(기술,자원), 강화(사회적 지지,보상) 요인이 건강행동에 영향을 미친다.', prompt: '보건교육사 1급 시험 준비: 성향요인, 가능요인, 강화요인을 상세히 설명해주세요.' },
        { id: 33, question: '인터벤션 매핑의 6단계는?', answer: '요구사정→목표설정→이론적방법선택→프로그램구성→채택실행계획→평가계획의 6단계로 구성된다.', prompt: '보건교육사 1급 시험 준비: 인터벤션 매핑의 6단계를 상세히 설명해주세요.' },
        { id: 34, question: 'RE-AIM 평가 프레임워크란?', answer: 'Reach, Efficacy, Adoption, Implementation, Maintenance의 5가지 차원으로 프로그램을 평가한다.', prompt: '보건교육사 1급 시험 준비: RE-AIM 평가 프레임워크의 각 차원을 설명해주세요.' },
        { id: 35, question: '논리모형 작성의 원칙과 방법은?', answer: '투입-활동-산출-결과-영향을 논리적으로 연결하여 프로그램 이론을 시각화한다.', prompt: '보건교육사 1급 시험 준비: 논리모형 작성의 원칙과 방법을 설명해주세요.' },
        { id: 36, question: '형성평가와 과정평가의 차이는?', answer: '형성평가는 프로그램 개발 중, 과정평가는 실행 중 개선을 위해 수행된다.', prompt: '보건교육사 1급 시험 준비: 형성평가와 과정평가의 차이를 설명해주세요.' },
        { id: 37, question: '영향평가와 결과평가의 차이는?', answer: '영향평가는 중간지표(지식,태도,행동), 결과평가는 최종지표(건강상태)를 측정한다.', prompt: '보건교육사 1급 시험 준비: 영향평가와 결과평가의 차이를 설명해주세요.' },
        { id: 38, question: '비용효과분석과 비용편익분석의 차이는?', answer: '비용효과는 결과를 자연단위로, 비용편익은 모든 것을 화폐단위로 환산하여 분석한다.', prompt: '보건교육사 1급 시험 준비: 비용효과분석과 비용편익분석의 차이를 설명해주세요.' },
        { id: 39, question: '프로그램 충실도(Fidelity) 평가란?', answer: '계획된 대로 프로그램이 실행되었는지 확인하는 것으로, 내용, 빈도, 시간 등을 점검한다.', prompt: '보건교육사 1급 시험 준비: 프로그램 충실도 평가의 개념과 방법을 설명해주세요.' },
        { id: 40, question: '근거기반 건강증진의 원칙은?', answer: '연구 근거, 전문가 경험, 대상자 선호를 통합하여 효과적인 전략을 선택하고 적용한다.', prompt: '보건교육사 1급 시험 준비: 근거기반 건강증진의 원칙과 실천 방법을 설명해주세요.' },
      ],
    },
    {
      title: '건강증진 정책과 제도',
      questions: [
        { id: 41, question: '국민건강증진법의 주요 내용은?', answer: '1995년 제정, 국민건강증진기금, 건강증진사업, 보건교육사 제도 등을 규정한다.', prompt: '보건교육사 1급 시험 준비: 국민건강증진법의 주요 내용을 설명해주세요.' },
        { id: 42, question: '국민건강증진종합계획(HP)의 구조는?', answer: 'HP2030은 건강형평성 제고를 비전으로, 건강생활실천, 정신건강 등 6개 분과로 구성된다.', prompt: '보건교육사 1급 시험 준비: 국민건강증진종합계획의 구조와 주요 내용을 설명해주세요.' },
        { id: 43, question: '건강증진기금의 재원과 활용은?', answer: '담배부담금이 주요 재원이며, 금연, 절주, 영양, 운동 등 건강증진사업에 활용된다.', prompt: '보건교육사 1급 시험 준비: 건강증진기금의 재원과 활용 방법을 설명해주세요.' },
        { id: 44, question: '보건소 건강증진사업의 유형은?', answer: '통합건강증진사업으로 금연, 절주, 영양, 운동, 정신건강, 구강건강 등 다양한 사업을 수행한다.', prompt: '보건교육사 1급 시험 준비: 보건소 건강증진사업의 유형과 특징을 설명해주세요.' },
        { id: 45, question: '직장건강증진 프로그램의 유형은?', answer: '산업안전보건법에 따른 건강관리, 건강검진, 직무스트레스 관리, 건강증진 프로그램 등이 있다.', prompt: '보건교육사 1급 시험 준비: 직장건강증진 프로그램의 유형과 효과를 설명해주세요.' },
        { id: 46, question: '학교건강증진 정책과 프로그램은?', answer: '학교보건법에 따른 건강검사, 보건교육, 건강증진학교(HPS) 모형 적용 등이 있다.', prompt: '보건교육사 1급 시험 준비: 학교건강증진 정책과 프로그램을 설명해주세요.' },
        { id: 47, question: '금연정책의 유형과 효과는?', answer: '담뱃값 인상, 금연구역 확대, 경고그림, 금연지원서비스 등 다양한 정책이 복합적으로 작용한다.', prompt: '보건교육사 1급 시험 준비: 금연정책의 유형과 효과를 설명해주세요.' },
        { id: 48, question: '절주정책과 음주폐해 예방전략은?', answer: '주류 광고규제, 가격정책, 음주운전 단속, 조기개입 등의 전략이 있다.', prompt: '보건교육사 1급 시험 준비: 절주정책과 음주폐해 예방전략을 설명해주세요.' },
        { id: 49, question: '비만예방 정책과 환경 조성 전략은?', answer: '식품표시제, 건강한 식품접근성, 신체활동 환경 조성, 학교급식 개선 등의 전략이 있다.', prompt: '보건교육사 1급 시험 준비: 비만예방 정책과 환경 조성 전략을 설명해주세요.' },
        { id: 50, question: '건강증진 옹호(Advocacy)의 전략은?', answer: '미디어 옹호, 정책 옹호, 지역사회 조직화를 통해 건강증진 정책 변화를 이끌어낸다.', prompt: '보건교육사 1급 시험 준비: 건강증진 옹호 전략의 유형과 방법을 설명해주세요.' },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-1-health-promotion-progress');
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
    localStorage.setItem('health-educator-1-health-promotion-progress', JSON.stringify([...newCompleted]));
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
            <Link href="/" className="hover:text-blue-600">홈</Link>
            <span>›</span>
            <Link href="/category/medical" className="hover:text-blue-600">의료·보건</Link>
            <span>›</span>
            <Link href="/category/medical/health-educator-1" className="hover:text-blue-600">보건교육사 1급</Link>
            <span>›</span>
            <span className="text-blue-600 font-medium">건강증진이론</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">💪 건강증진이론 학습 가이드</h1>
          <p className="text-sm text-gray-500 mt-1">보건교육사 1급 필기 2과목</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">학습 진도</span>
            <span className="text-sm text-gray-500">{completedCount} / {totalQuestions} 완료</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="text-right mt-1 text-sm text-blue-600 font-medium">{progressPercentage}%</div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.has(q.id) ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(q.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${completedQuestions.has(q.id) ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 hover:border-blue-500'}`}
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
