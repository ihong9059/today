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

export default function HealthPolicyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));

  const topics: Topic[] = [
    {
      title: '보건의료 정책의 이해',
      questions: [
        { id: 1, question: '보건정책의 정의와 특성은?', answer: '보건정책은 국민 건강 향상을 위한 정부의 계획적 활동으로, 공공성, 형평성, 효율성을 특징으로 한다.', prompt: '보건교육사 1급 시험 준비: 보건정책의 정의와 특성을 상세히 설명해주세요.' },
        { id: 2, question: '정책 형성 과정의 단계는?', answer: '의제설정→정책형성→정책결정→정책집행→정책평가의 순환적 과정을 거친다.', prompt: '보건교육사 1급 시험 준비: 정책 형성 과정의 각 단계를 설명해주세요.' },
        { id: 3, question: '다중흐름모형(Multiple Streams)이란?', answer: 'Kingdon의 이론으로, 문제의 흐름, 정책의 흐름, 정치의 흐름이 만나는 정책의 창에서 변화가 일어난다.', prompt: '보건교육사 1급 시험 준비: 다중흐름모형을 상세히 설명해주세요.' },
        { id: 4, question: '옹호연합모형(ACF)의 핵심 개념은?', answer: '옹호연합 간 상호작용, 정책하위체계, 신념체계(핵심-정책핵심-부차적 신념)로 정책변동을 설명한다.', prompt: '보건교육사 1급 시험 준비: 옹호연합모형의 핵심 개념을 설명해주세요.' },
        { id: 5, question: '점증주의와 합리주의 모형의 비교는?', answer: '합리주의는 최적 대안 선택, 점증주의는 기존 정책의 점진적 수정을 강조한다.', prompt: '보건교육사 1급 시험 준비: 점증주의와 합리주의 모형을 비교 설명해주세요.' },
        { id: 6, question: '근거기반 정책(EBP)의 원칙은?', answer: '과학적 연구 근거를 정책 결정에 활용하며, 체계적 문헌고찰, 메타분석 등을 활용한다.', prompt: '보건교육사 1급 시험 준비: 근거기반 정책의 원칙과 방법을 설명해주세요.' },
        { id: 7, question: '정책분석의 유형과 방법은?', answer: '정책과정분석, 정책내용분석, 정책결과분석이 있으며, 비용편익분석 등의 기법을 활용한다.', prompt: '보건교육사 1급 시험 준비: 정책분석의 유형과 방법을 설명해주세요.' },
        { id: 8, question: '정책평가의 유형과 기준은?', answer: '효과성, 효율성, 형평성, 적절성, 대응성 등의 기준으로 과정평가와 결과평가를 수행한다.', prompt: '보건교육사 1급 시험 준비: 정책평가의 유형과 기준을 설명해주세요.' },
        { id: 9, question: '정책 거버넌스의 개념과 유형은?', answer: '정부, 시장, 시민사회의 협력적 의사결정 구조로, 네트워크 거버넌스가 현대적 형태이다.', prompt: '보건교육사 1급 시험 준비: 정책 거버넌스의 개념과 유형을 설명해주세요.' },
        { id: 10, question: '보건정책에서 이해관계자 참여의 중요성은?', answer: '정책의 정당성과 수용성 확보를 위해 다양한 이해관계자의 참여가 필수적이다.', prompt: '보건교육사 1급 시험 준비: 보건정책에서 이해관계자 참여의 중요성을 설명해주세요.' },
      ],
    },
    {
      title: '국가 보건의료 체계',
      questions: [
        { id: 11, question: '보건의료체계의 구성요소는?', answer: '자원, 조직, 재정, 관리의 4가지 요소로 구성되며, 이들이 상호작용하여 서비스를 제공한다.', prompt: '보건교육사 1급 시험 준비: 보건의료체계의 구성요소를 상세히 설명해주세요.' },
        { id: 12, question: '국민건강보험의 특성과 원리는?', answer: '사회보험 방식으로 전국민 의무가입, 균등급여, 위험분산의 원리로 운영된다.', prompt: '보건교육사 1급 시험 준비: 국민건강보험의 특성과 원리를 설명해주세요.' },
        { id: 13, question: '의료급여제도의 특성과 대상은?', answer: '공공부조 방식으로 저소득층에게 의료서비스를 제공하며, 1종과 2종으로 구분된다.', prompt: '보건교육사 1급 시험 준비: 의료급여제도의 특성과 대상을 설명해주세요.' },
        { id: 14, question: '건강보험 수가제도의 유형은?', answer: '행위별수가제, 포괄수가제(DRG), 총액예산제, 인두제 등이 있으며 각각 장단점이 있다.', prompt: '보건교육사 1급 시험 준비: 건강보험 수가제도의 유형을 비교 설명해주세요.' },
        { id: 15, question: '보건의료서비스 전달체계란?', answer: '1차(일차의료), 2차(전문의료), 3차(고도전문의료)로 구분되며, 의뢰체계가 중요하다.', prompt: '보건교육사 1급 시험 준비: 보건의료서비스 전달체계를 설명해주세요.' },
        { id: 16, question: '공공보건의료의 역할과 기능은?', answer: '필수의료 제공, 취약계층 보호, 응급의료 등 시장실패를 보완하는 공익적 기능을 수행한다.', prompt: '보건교육사 1급 시험 준비: 공공보건의료의 역할과 기능을 설명해주세요.' },
        { id: 17, question: '보건소의 법적 지위와 기능은?', answer: '지역보건법에 근거하며, 건강증진, 질병예방, 방문건강관리 등 지역 공중보건 업무를 수행한다.', prompt: '보건교육사 1급 시험 준비: 보건소의 법적 지위와 기능을 설명해주세요.' },
        { id: 18, question: '의료의 질 평가와 인증제도는?', answer: '의료기관평가인증, 건강보험심사평가 등을 통해 의료의 질을 관리하고 개선한다.', prompt: '보건교육사 1급 시험 준비: 의료의 질 평가와 인증제도를 설명해주세요.' },
        { id: 19, question: '환자안전과 의료사고 예방 정책은?', answer: '환자안전법에 따른 환자안전사고 보고학습시스템, 의료분쟁조정제도 등이 운영된다.', prompt: '보건교육사 1급 시험 준비: 환자안전과 의료사고 예방 정책을 설명해주세요.' },
        { id: 20, question: '보건의료 인력 정책의 현황과 과제는?', answer: '의료인력 수급 불균형, 지역 편재, 필수의료 인력 부족 등이 주요 과제이다.', prompt: '보건교육사 1급 시험 준비: 보건의료 인력 정책의 현황과 과제를 설명해주세요.' },
      ],
    },
    {
      title: '보건 관련 법규',
      questions: [
        { id: 21, question: '국민건강증진법의 주요 내용은?', answer: '건강증진사업, 금연/절주/영양/운동, 보건교육사 제도, 건강증진기금 등을 규정한다.', prompt: '보건교육사 1급 시험 준비: 국민건강증진법의 주요 내용을 설명해주세요.' },
        { id: 22, question: '지역보건법의 주요 내용은?', answer: '보건소, 보건의료원, 보건지소의 설치와 기능, 지역보건의료계획 수립 등을 규정한다.', prompt: '보건교육사 1급 시험 준비: 지역보건법의 주요 내용을 설명해주세요.' },
        { id: 23, question: '감염병예방법의 주요 내용은?', answer: '감염병 분류(1-4급), 신고체계, 예방접종, 방역조치, 격리 등을 규정한다.', prompt: '보건교육사 1급 시험 준비: 감염병예방법의 주요 내용을 설명해주세요.' },
        { id: 24, question: '정신건강복지법의 주요 내용은?', answer: '정신건강증진시설, 입원유형(자의/동의/행정입원), 정신건강복지센터 등을 규정한다.', prompt: '보건교육사 1급 시험 준비: 정신건강복지법의 주요 내용을 설명해주세요.' },
        { id: 25, question: '학교보건법의 주요 내용은?', answer: '학교보건계획, 건강검사, 보건교육, 보건실 설치, 학교환경위생 등을 규정한다.', prompt: '보건교육사 1급 시험 준비: 학교보건법의 주요 내용을 설명해주세요.' },
        { id: 26, question: '산업안전보건법의 건강관리 규정은?', answer: '작업환경측정, 건강진단, 근로자 건강관리, 직업병 예방 등을 규정한다.', prompt: '보건교육사 1급 시험 준비: 산업안전보건법의 건강관리 규정을 설명해주세요.' },
        { id: 27, question: '노인보건복지법의 주요 내용은?', answer: '노인건강검진, 치매관리, 노인장기요양보험, 노인복지시설 등을 규정한다.', prompt: '보건교육사 1급 시험 준비: 노인보건복지법의 주요 내용을 설명해주세요.' },
        { id: 28, question: '모자보건법의 주요 내용은?', answer: '임산부/영유아 건강관리, 산전후관리, 모자보건수첩, 난임지원 등을 규정한다.', prompt: '보건교육사 1급 시험 준비: 모자보건법의 주요 내용을 설명해주세요.' },
        { id: 29, question: '건강검진기본법의 주요 내용은?', answer: '국가건강검진 대상과 항목, 암검진, 영유아검진, 학생검진 등을 규정한다.', prompt: '보건교육사 1급 시험 준비: 건강검진기본법의 주요 내용을 설명해주세요.' },
        { id: 30, question: '응급의료에 관한 법률의 주요 내용은?', answer: '응급의료체계, 응급환자 권리, 응급의료기관 지정, 구급대 운영 등을 규정한다.', prompt: '보건교육사 1급 시험 준비: 응급의료에 관한 법률의 주요 내용을 설명해주세요.' },
      ],
    },
    {
      title: '보건 행정과 관리',
      questions: [
        { id: 31, question: '보건행정의 원리와 특성은?', answer: '공익성, 사회성, 기술성, 조직성을 특성으로 하며, 기획-조직-인사-지휘-통제 기능을 수행한다.', prompt: '보건교육사 1급 시험 준비: 보건행정의 원리와 특성을 설명해주세요.' },
        { id: 32, question: '보건기획의 유형과 절차는?', answer: '전략기획, 운영기획, 사업기획이 있으며, 상황분석-목표설정-전략수립-실행-평가 절차를 따른다.', prompt: '보건교육사 1급 시험 준비: 보건기획의 유형과 절차를 설명해주세요.' },
        { id: 33, question: '보건조직의 유형과 구조는?', answer: '라인조직, 기능조직, 라인스탭조직, 매트릭스조직 등이 있으며, 공식/비공식 구조로 구분된다.', prompt: '보건교육사 1급 시험 준비: 보건조직의 유형과 구조를 설명해주세요.' },
        { id: 34, question: '보건인력 관리의 원칙과 방법은?', answer: '채용, 교육훈련, 성과평가, 동기부여, 경력개발 등을 체계적으로 관리한다.', prompt: '보건교육사 1급 시험 준비: 보건인력 관리의 원칙과 방법을 설명해주세요.' },
        { id: 35, question: '리더십 이론과 보건관리자의 역할은?', answer: '특성이론, 행동이론, 상황이론 등이 있으며, 비전제시, 동기부여, 조정 역할이 중요하다.', prompt: '보건교육사 1급 시험 준비: 리더십 이론과 보건관리자의 역할을 설명해주세요.' },
        { id: 36, question: '보건예산의 편성과 집행 원칙은?', answer: '단일성, 완전성, 통일성, 한정성 원칙에 따라 예산을 편성하고 집행한다.', prompt: '보건교육사 1급 시험 준비: 보건예산의 편성과 집행 원칙을 설명해주세요.' },
        { id: 37, question: '총체적 품질관리(TQM)의 원리는?', answer: '고객중심, 지속적 개선, 전원참여, 과정관리를 원칙으로 조직 전체의 질 향상을 추구한다.', prompt: '보건교육사 1급 시험 준비: 총체적 품질관리(TQM)의 원리를 설명해주세요.' },
        { id: 38, question: '의사결정의 유형과 기법은?', answer: '합리적, 제한적 합리성, 직관적 의사결정이 있으며, 의사결정나무, 비용편익분석 등 활용한다.', prompt: '보건교육사 1급 시험 준비: 의사결정의 유형과 기법을 설명해주세요.' },
        { id: 39, question: '조직변화 관리와 혁신 전략은?', answer: 'Lewin의 해빙-변화-재동결 모형, Kotter의 8단계 변화모형 등을 활용하여 변화를 관리한다.', prompt: '보건교육사 1급 시험 준비: 조직변화 관리와 혁신 전략을 설명해주세요.' },
        { id: 40, question: '보건정보 관리와 활용 방안은?', answer: '건강정보시스템, 전자건강기록, 보건통계 등을 활용하여 근거기반 의사결정을 지원한다.', prompt: '보건교육사 1급 시험 준비: 보건정보 관리와 활용 방안을 설명해주세요.' },
      ],
    },
    {
      title: '국제 보건 정책',
      questions: [
        { id: 41, question: 'WHO의 역할과 주요 기능은?', answer: '국제보건 기준 설정, 기술지원, 질병감시, 연구조정 등 글로벌 보건 거버넌스를 주도한다.', prompt: '보건교육사 1급 시험 준비: WHO의 역할과 주요 기능을 설명해주세요.' },
        { id: 42, question: '지속가능발전목표(SDGs)와 건강의 관계는?', answer: 'SDG3은 건강한 삶 보장, 모든 연령대 웰빙 증진이며, 다른 목표와도 밀접하게 연결된다.', prompt: '보건교육사 1급 시험 준비: SDGs와 건강의 관계를 설명해주세요.' },
        { id: 43, question: '글로벌 건강 거버넌스의 현황과 과제는?', answer: 'WHO, 세계은행, GAVI, 글로벌펀드 등 다양한 행위자가 참여하며, 조정과 협력이 과제이다.', prompt: '보건교육사 1급 시험 준비: 글로벌 건강 거버넌스의 현황과 과제를 설명해주세요.' },
        { id: 44, question: '국제보건규칙(IHR)의 주요 내용은?', answer: '국제적 공중보건위기상황(PHEIC) 선포, 감시체계, 통보의무 등을 규정한다.', prompt: '보건교육사 1급 시험 준비: 국제보건규칙(IHR)의 주요 내용을 설명해주세요.' },
        { id: 45, question: '담배규제기본협약(FCTC)의 주요 내용은?', answer: '담배 가격/세금 정책, 광고규제, 경고표시, 간접흡연 보호 등 종합적 담배규제를 규정한다.', prompt: '보건교육사 1급 시험 준비: 담배규제기본협약(FCTC)의 주요 내용을 설명해주세요.' },
        { id: 46, question: '일차보건의료(PHC)의 원칙과 요소는?', answer: '형평성, 지역사회 참여, 다부문 협력, 적정기술 활용이 원칙이며, 알마아타 선언에서 천명되었다.', prompt: '보건교육사 1급 시험 준비: 일차보건의료의 원칙과 요소를 설명해주세요.' },
        { id: 47, question: '보편적 건강보장(UHC)의 개념과 전략은?', answer: '모든 사람이 필요한 양질의 보건서비스를 재정적 어려움 없이 이용하는 것을 목표로 한다.', prompt: '보건교육사 1급 시험 준비: 보편적 건강보장(UHC)의 개념과 전략을 설명해주세요.' },
        { id: 48, question: '건강안보(Global Health Security)의 개념은?', answer: '신종 감염병, 생물테러 등 보건위협으로부터 국가와 국민을 보호하는 것을 의미한다.', prompt: '보건교육사 1급 시험 준비: 건강안보의 개념과 대응 전략을 설명해주세요.' },
        { id: 49, question: '국제보건협력의 유형과 사례는?', answer: 'ODA, 기술협력, 긴급구호, 역량강화 등 다양한 형태로 국제보건협력이 이루어진다.', prompt: '보건교육사 1급 시험 준비: 국제보건협력의 유형과 사례를 설명해주세요.' },
        { id: 50, question: '기후변화와 건강의 관계는?', answer: '기후변화는 감염병, 열사병, 대기오염 등을 통해 건강에 영향을 미치며, 건강 공동편익 정책이 필요하다.', prompt: '보건교육사 1급 시험 준비: 기후변화와 건강의 관계를 설명해주세요.' },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-1-health-policy-progress');
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
    localStorage.setItem('health-educator-1-health-policy-progress', JSON.stringify([...newCompleted]));
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
            <Link href="/" className="hover:text-green-600">홈</Link>
            <span>›</span>
            <Link href="/category/medical" className="hover:text-green-600">의료·보건</Link>
            <span>›</span>
            <Link href="/category/medical/health-educator-1" className="hover:text-green-600">보건교육사 1급</Link>
            <span>›</span>
            <span className="text-green-600 font-medium">보건정책</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">📋 보건정책 학습 가이드</h1>
          <p className="text-sm text-gray-500 mt-1">보건교육사 1급 필기 3과목</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">학습 진도</span>
            <span className="text-sm text-gray-500">{completedCount} / {totalQuestions} 완료</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="text-right mt-1 text-sm text-green-600 font-medium">{progressPercentage}%</div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.has(q.id) ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(q.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${completedQuestions.has(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'}`}
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
