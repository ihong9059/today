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

export default function HealthEducationBasicsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));

  const topics: Topic[] = [
    {
      title: '보건교육의 개념과 정의',
      questions: [
        { id: 1, question: '보건교육의 정의는 무엇인가?', answer: '보건교육은 개인, 가족, 지역사회가 건강에 대한 지식, 태도, 행동을 변화시켜 건강을 유지·증진하도록 돕는 계획적 학습 경험이다.', prompt: '보건교육사 3급 시험 준비: 보건교육의 정의를 쉽게 설명해주세요.' },
        { id: 2, question: '보건교육의 목적은 무엇인가?', answer: '건강 관련 지식 증가, 건강에 대한 긍정적 태도 형성, 건강행동 실천 및 유지가 주요 목적이다.', prompt: '보건교육사 3급 시험 준비: 보건교육의 목적 3가지를 설명해주세요.' },
        { id: 3, question: '보건교육과 건강교육의 차이는?', answer: '보건교육은 공중보건 관점에서 집단 건강증진을, 건강교육은 개인 수준의 건강관리에 초점을 둔다.', prompt: '보건교육사 3급 시험 준비: 보건교육과 건강교육의 차이를 설명해주세요.' },
        { id: 4, question: '보건교육의 필요성은 무엇인가?', answer: '만성질환 증가, 건강불평등 해소, 의료비 절감, 삶의 질 향상을 위해 보건교육이 필요하다.', prompt: '보건교육사 3급 시험 준비: 보건교육의 필요성을 설명해주세요.' },
        { id: 5, question: '보건교육의 대상은 누구인가?', answer: '개인, 가족, 학교, 직장, 지역사회 등 모든 연령과 집단이 보건교육의 대상이 된다.', prompt: '보건교육사 3급 시험 준비: 보건교육의 대상을 설명해주세요.' },
        { id: 6, question: 'WHO의 건강 정의는?', answer: '건강은 단순히 질병이 없는 상태가 아니라 신체적, 정신적, 사회적으로 완전히 안녕한 상태이다.', prompt: '보건교육사 3급 시험 준비: WHO의 건강 정의를 설명해주세요.' },
        { id: 7, question: '건강증진의 개념은?', answer: '건강증진은 사람들이 자신의 건강에 대한 통제력을 높이고 건강을 향상시킬 수 있게 하는 과정이다.', prompt: '보건교육사 3급 시험 준비: 건강증진의 개념을 설명해주세요.' },
        { id: 8, question: '1차, 2차, 3차 예방의 차이는?', answer: '1차는 질병 발생 전 예방, 2차는 조기발견·조기치료, 3차는 재활·합병증 예방이다.', prompt: '보건교육사 3급 시험 준비: 1차, 2차, 3차 예방의 차이를 설명해주세요.' },
        { id: 9, question: '보건교육사의 역할은?', answer: '보건교육 프로그램 기획, 실행, 평가와 건강정보 제공, 상담, 지역사회 자원 연계 등을 수행한다.', prompt: '보건교육사 3급 시험 준비: 보건교육사의 역할을 설명해주세요.' },
        { id: 10, question: '보건교육사 자격 등급별 차이는?', answer: '1급(경력+시험), 2급(학력+시험), 3급(시험)으로 구분되며 업무 범위와 책임이 다르다.', prompt: '보건교육사 3급 시험 준비: 보건교육사 등급별 차이를 설명해주세요.' },
      ],
    },
    {
      title: '보건교육의 역사와 발전',
      questions: [
        { id: 11, question: '보건교육의 역사적 발전 과정은?', answer: '위생교육(19세기) → 건강교육(20세기 초) → 건강증진교육(1986 오타와헌장 이후)으로 발전했다.', prompt: '보건교육사 3급 시험 준비: 보건교육의 역사적 발전 과정을 설명해주세요.' },
        { id: 12, question: '오타와 헌장(1986)의 의의는?', answer: '현대 건강증진의 기틀을 마련한 국제 선언으로, 5대 활동 영역과 3대 전략을 제시했다.', prompt: '보건교육사 3급 시험 준비: 오타와 헌장의 의의를 설명해주세요.' },
        { id: 13, question: '오타와 헌장의 5대 활동 영역은?', answer: '건강한 공공정책, 지지적 환경, 지역사회 활동 강화, 개인 기술 개발, 보건서비스 재정향이다.', prompt: '보건교육사 3급 시험 준비: 오타와 헌장의 5대 활동 영역을 설명해주세요.' },
        { id: 14, question: '한국 보건교육의 발전 과정은?', answer: '1960년대 가족계획 → 1995년 국민건강증진법 → 2003년 보건교육사 제도 도입으로 발전했다.', prompt: '보건교육사 3급 시험 준비: 한국 보건교육의 발전 과정을 설명해주세요.' },
        { id: 15, question: '국민건강증진법의 주요 내용은?', answer: '건강증진사업, 금연/절주/영양/운동, 보건교육사 제도, 건강증진기금 등을 규정한다.', prompt: '보건교육사 3급 시험 준비: 국민건강증진법의 주요 내용을 설명해주세요.' },
        { id: 16, question: '건강증진기금의 재원은?', answer: '담배에 부과되는 건강증진부담금이 주요 재원이다.', prompt: '보건교육사 3급 시험 준비: 건강증진기금의 재원을 설명해주세요.' },
        { id: 17, question: '국민건강증진종합계획(HP)이란?', answer: '국민건강 목표와 추진전략을 담은 10년 단위 국가 계획으로, 현재 HP2030이 시행 중이다.', prompt: '보건교육사 3급 시험 준비: 국민건강증진종합계획을 설명해주세요.' },
        { id: 18, question: '알마아타 선언(1978)의 의의는?', answer: '일차보건의료(PHC)의 중요성을 선언하고 "2000년까지 모든 사람에게 건강을" 목표를 제시했다.', prompt: '보건교육사 3급 시험 준비: 알마아타 선언의 의의를 설명해주세요.' },
        { id: 19, question: '방콕헌장(2005)의 주요 내용은?', answer: '세계화 시대 건강증진을 위해 옹호, 투자, 역량강화, 규제, 파트너십을 강조했다.', prompt: '보건교육사 3급 시험 준비: 방콕헌장의 주요 내용을 설명해주세요.' },
        { id: 20, question: '보건교육 관련 국제기구는?', answer: 'WHO(세계보건기구), IUHPE(국제건강증진교육연합) 등이 있다.', prompt: '보건교육사 3급 시험 준비: 보건교육 관련 국제기구를 설명해주세요.' },
      ],
    },
    {
      title: '학습이론의 기초',
      questions: [
        { id: 21, question: '학습의 정의는?', answer: '학습은 경험이나 연습을 통해 행동이나 지식이 비교적 영속적으로 변화하는 과정이다.', prompt: '보건교육사 3급 시험 준비: 학습의 정의를 설명해주세요.' },
        { id: 22, question: '행동주의 학습이론의 특징은?', answer: '외부 자극과 반응의 연결을 강조하며, 고전적 조건화와 조작적 조건화가 대표적이다.', prompt: '보건교육사 3급 시험 준비: 행동주의 학습이론의 특징을 설명해주세요.' },
        { id: 23, question: '고전적 조건화(파블로프)란?', answer: '무조건 자극과 조건 자극의 반복적 연합으로 조건 반응이 형성되는 학습이다.', prompt: '보건교육사 3급 시험 준비: 고전적 조건화를 설명해주세요.' },
        { id: 24, question: '조작적 조건화(스키너)란?', answer: '행동의 결과(강화 또는 처벌)에 따라 행동 빈도가 변화하는 학습이다.', prompt: '보건교육사 3급 시험 준비: 조작적 조건화를 설명해주세요.' },
        { id: 25, question: '강화의 유형은?', answer: '정적 강화(보상 제공), 부적 강화(불쾌자극 제거)로 행동을 증가시킨다.', prompt: '보건교육사 3급 시험 준비: 강화의 유형을 설명해주세요.' },
        { id: 26, question: '인지주의 학습이론의 특징은?', answer: '학습자의 내적 인지 과정(기억, 사고)을 강조하며, 정보처리이론이 대표적이다.', prompt: '보건교육사 3급 시험 준비: 인지주의 학습이론의 특징을 설명해주세요.' },
        { id: 27, question: '사회학습이론(반두라)의 핵심 개념은?', answer: '관찰학습과 자기효능감을 강조하며, 모델링을 통해 행동을 학습한다.', prompt: '보건교육사 3급 시험 준비: 사회학습이론의 핵심 개념을 설명해주세요.' },
        { id: 28, question: '자기효능감이란?', answer: '특정 과제를 성공적으로 수행할 수 있다는 개인의 믿음과 자신감이다.', prompt: '보건교육사 3급 시험 준비: 자기효능감을 설명해주세요.' },
        { id: 29, question: '성인학습의 특성(앤드라고지)은?', answer: '자기주도성, 경험 활용, 즉시 적용, 문제중심 학습이 성인 학습자의 특성이다.', prompt: '보건교육사 3급 시험 준비: 성인학습의 특성을 설명해주세요.' },
        { id: 30, question: '동기의 유형은?', answer: '내재적 동기(흥미, 만족)와 외재적 동기(보상, 인정)로 구분된다.', prompt: '보건교육사 3급 시험 준비: 동기의 유형을 설명해주세요.' },
      ],
    },
    {
      title: '교육방법과 매체',
      questions: [
        { id: 31, question: '강의법의 장단점은?', answer: '장점은 대규모 정보전달 효율성, 단점은 일방적이고 참여가 제한적이다.', prompt: '보건교육사 3급 시험 준비: 강의법의 장단점을 설명해주세요.' },
        { id: 32, question: '토의법의 종류는?', answer: '원탁토의, 패널토의, 심포지엄, 버즈세션 등이 있다.', prompt: '보건교육사 3급 시험 준비: 토의법의 종류를 설명해주세요.' },
        { id: 33, question: '시범의 효과적 진행 방법은?', answer: '전체 시범 → 단계별 설명 → 학습자 실습 → 피드백 순서로 진행한다.', prompt: '보건교육사 3급 시험 준비: 시범의 효과적 진행 방법을 설명해주세요.' },
        { id: 34, question: '역할극의 교육적 효과는?', answer: '태도 변화, 공감 능력 향상, 의사소통 기술 연습에 효과적이다.', prompt: '보건교육사 3급 시험 준비: 역할극의 교육적 효과를 설명해주세요.' },
        { id: 35, question: '사례연구법의 특징은?', answer: '실제 사례를 분석하여 문제해결 능력과 비판적 사고력을 기른다.', prompt: '보건교육사 3급 시험 준비: 사례연구법의 특징을 설명해주세요.' },
        { id: 36, question: '교육매체의 종류는?', answer: '인쇄매체(리플릿), 영상매체(동영상), 전자매체(앱), 실물 등이 있다.', prompt: '보건교육사 3급 시험 준비: 교육매체의 종류를 설명해주세요.' },
        { id: 37, question: '효과적인 프레젠테이션 원칙은?', answer: '간결한 내용, 적절한 시각자료, 명확한 발음, 청중과 눈맞춤이 중요하다.', prompt: '보건교육사 3급 시험 준비: 효과적인 프레젠테이션 원칙을 설명해주세요.' },
        { id: 38, question: '소집단 교육의 장점은?', answer: '참여 촉진, 개별 피드백 가능, 상호작용 활발, 심층 학습이 가능하다.', prompt: '보건교육사 3급 시험 준비: 소집단 교육의 장점을 설명해주세요.' },
        { id: 39, question: '대집단 교육의 특징은?', answer: '효율적 정보 전달이 가능하나 개별화가 어렵고 일방적이 되기 쉽다.', prompt: '보건교육사 3급 시험 준비: 대집단 교육의 특징을 설명해주세요.' },
        { id: 40, question: '온라인 교육의 장단점은?', answer: '장점은 시공간 제약 극복, 단점은 상호작용 부족, 자기조절 능력 필요이다.', prompt: '보건교육사 3급 시험 준비: 온라인 교육의 장단점을 설명해주세요.' },
      ],
    },
    {
      title: '교육평가와 프로그램 기획',
      questions: [
        { id: 41, question: '교육평가의 유형(시기별)은?', answer: '진단평가(사전), 형성평가(과정 중), 총괄평가(종료 후)로 구분된다.', prompt: '보건교육사 3급 시험 준비: 교육평가의 유형을 설명해주세요.' },
        { id: 42, question: '진단평가의 목적은?', answer: '학습자의 사전 지식, 기술, 태도 수준을 파악하여 교육 계획에 반영한다.', prompt: '보건교육사 3급 시험 준비: 진단평가의 목적을 설명해주세요.' },
        { id: 43, question: '형성평가의 목적은?', answer: '교육 과정 중 학습 진행 상황을 점검하고 교육 방법을 개선한다.', prompt: '보건교육사 3급 시험 준비: 형성평가의 목적을 설명해주세요.' },
        { id: 44, question: '총괄평가의 목적은?', answer: '교육 종료 후 목표 달성 여부와 교육 효과를 측정한다.', prompt: '보건교육사 3급 시험 준비: 총괄평가의 목적을 설명해주세요.' },
        { id: 45, question: '학습목표 작성의 원칙은?', answer: 'SMART 원칙: 구체적(S), 측정가능(M), 달성가능(A), 관련성(R), 기한(T)이다.', prompt: '보건교육사 3급 시험 준비: 학습목표 작성의 SMART 원칙을 설명해주세요.' },
        { id: 46, question: '요구도 조사의 목적은?', answer: '대상자의 건강문제와 교육 요구를 파악하여 우선순위를 결정한다.', prompt: '보건교육사 3급 시험 준비: 요구도 조사의 목적을 설명해주세요.' },
        { id: 47, question: '요구도 조사 방법은?', answer: '설문조사, 면담, 포커스그룹, 관찰, 기존 자료 분석 등이 있다.', prompt: '보건교육사 3급 시험 준비: 요구도 조사 방법을 설명해주세요.' },
        { id: 48, question: '보건교육 프로그램 기획 단계는?', answer: '요구조사 → 목표설정 → 내용구성 → 방법선정 → 실행 → 평가의 단계를 거친다.', prompt: '보건교육사 3급 시험 준비: 보건교육 프로그램 기획 단계를 설명해주세요.' },
        { id: 49, question: '교육 내용 선정 기준은?', answer: '대상자 요구, 시의성, 실용성, 중요도, 학습자 수준을 고려한다.', prompt: '보건교육사 3급 시험 준비: 교육 내용 선정 기준을 설명해주세요.' },
        { id: 50, question: '피드백의 중요성은?', answer: '학습 강화, 동기 유발, 행동 수정, 자기효능감 향상에 기여한다.', prompt: '보건교육사 3급 시험 준비: 피드백의 중요성을 설명해주세요.' },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-3-health-education-basics-progress');
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
    localStorage.setItem('health-educator-3-health-education-basics-progress', JSON.stringify([...newCompleted]));
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
            <Link href="/" className="hover:text-teal-600">홈</Link>
            <span>›</span>
            <Link href="/category/medical" className="hover:text-teal-600">의료·보건</Link>
            <span>›</span>
            <Link href="/category/medical/health-educator-3" className="hover:text-teal-600">보건교육사 3급</Link>
            <span>›</span>
            <span className="text-teal-600 font-medium">보건교육기초</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">📚 보건교육기초 학습 가이드</h1>
          <p className="text-sm text-gray-500 mt-1">보건교육사 3급 필기 1과목</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">학습 진도</span>
            <span className="text-sm text-gray-500">{completedCount} / {totalQuestions} 완료</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="text-right mt-1 text-sm text-teal-600 font-medium">{progressPercentage}%</div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.has(q.id) ? 'bg-teal-50 border-teal-200' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(q.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${completedQuestions.has(q.id) ? 'bg-teal-500 border-teal-500 text-white' : 'border-gray-300 hover:border-teal-500'}`}
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
