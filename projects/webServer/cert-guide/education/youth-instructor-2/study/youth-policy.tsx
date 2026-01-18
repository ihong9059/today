'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'basic-law',
    name: '청소년기본법',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: '청소년기본법의 목적과 기본이념을 설명하시오.', answer: '청소년의 권리 및 책임과 가정·사회·국가·지방자치단체의 청소년에 대한 책임 명시', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년기본법의 목적과 기본이념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년기본법의 목적\n2. 청소년의 권리와 책임\n3. 국가와 지방자치단체의 책무\n4. 기본이념과 원칙\n5. 청소년 연령 정의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '청소년기본법상 청소년의 정의를 설명하시오.', answer: '9세 이상 24세 이하의 사람 (다만 다른 법률에서 다르게 정할 수 있음)', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년기본법상 청소년의 정의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 연령 범위\n2. 다른 법률과의 관계\n3. 청소년복지지원법과 비교\n4. 청소년보호법과 비교\n5. 실무적 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '청소년정책의 추진체계를 설명하시오.', answer: '청소년정책위원회, 지방청소년육성위원회, 청소년육성전담기구', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년정책의 추진체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년정책위원회\n2. 지방청소년육성위원회\n3. 청소년육성전담기구\n4. 청소년기본계획\n5. 연도별 시행계획\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년지도사의 배치와 역할을 설명하시오.', answer: '청소년활동시설에 배치, 청소년활동 지도·감독·조언', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년지도사의 배치와 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년지도사 자격 등급\n2. 배치 대상 시설\n3. 배치 기준\n4. 주요 역할과 직무\n5. 청소년상담사와 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년증 제도를 설명하시오.', answer: '청소년 본인임을 확인할 수 있는 신분증명서, 여성가족부장관 발급', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년증 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년증의 목적\n2. 발급 대상\n3. 발급 기관\n4. 청소년증 혜택\n5. 활성화 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'activity-law',
    name: '청소년활동진흥법',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      { id: 1, question: '청소년활동진흥법의 목적과 청소년활동의 정의를 설명하시오.', answer: '청소년의 균형있는 성장을 위한 활동 지원, 수련활동·교류활동·문화활동 등', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년활동진흥법의 목적과 청소년활동의 정의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년활동진흥법의 목적\n2. 청소년활동의 정의\n3. 수련활동의 개념\n4. 교류활동의 개념\n5. 문화활동의 개념\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '청소년수련시설의 종류를 설명하시오.', answer: '청소년수련관, 청소년수련원, 청소년문화의집, 청소년특화시설, 청소년야영장, 유스호스텔', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년수련시설의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년수련관\n2. 청소년수련원\n3. 청소년문화의집\n4. 청소년특화시설\n5. 청소년야영장 및 유스호스텔\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '청소년수련활동 인증제도를 설명하시오.', answer: '국가가 청소년수련활동의 공공성과 신뢰성을 인증, 안전·교육적 효과성 검증', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년수련활동 인증제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인증제도의 목적\n2. 인증 기준\n3. 인증 절차\n4. 인증의 효과\n5. 인증 취소 사유\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년수련활동 신고제도를 설명하시오.', answer: '일정 규모 이상의 수련활동 실시 전 신고 의무, 안전사고 예방', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년수련활동 신고제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고제도의 목적\n2. 신고 대상 활동\n3. 신고 시기 및 절차\n4. 신고 내용\n5. 미신고시 제재\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년수련활동 안전관리를 설명하시오.', answer: '안전점검, 안전교육, 배상책임보험 가입 의무', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년수련활동 안전관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전점검 의무\n2. 안전교육 실시\n3. 배상책임보험 가입\n4. 안전관리계획 수립\n5. 응급상황 대처 체계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'welfare-law',
    name: '청소년복지지원법',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '청소년복지지원법의 목적과 청소년복지의 정의를 설명하시오.', answer: '청소년의 건강한 성장과 삶의 질 향상, 특별지원 청소년 보호·지원', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년복지지원법의 목적과 청소년복지의 정의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년복지지원법의 목적\n2. 청소년복지의 개념\n3. 특별지원 청소년의 범위\n4. 국가와 지방자치단체의 책무\n5. 청소년복지 증진 시책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '특별지원 청소년의 선정기준과 지원내용을 설명하시오.', answer: '보호자가 없거나 실질적 보호를 받지 못하는 청소년, 생활·학업·의료 등 지원', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 특별지원 청소년의 선정기준과 지원내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 특별지원 청소년 선정기준\n2. 생활지원\n3. 학업지원\n4. 의료지원\n5. 그 밖의 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '청소년상담복지센터의 설치와 기능을 설명하시오.', answer: '국가 및 지방자치단체 설치, 상담·긴급구조·자활지원 등', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년상담복지센터의 설치와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 주체 및 근거\n2. 주요 기능\n3. 상담 서비스\n4. 긴급구조 체계\n5. 자활 지원 프로그램\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년쉼터의 종류와 운영을 설명하시오.', answer: '일시쉼터, 단기쉼터, 중장기쉼터로 구분, 가출청소년 보호·지원', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년쉼터의 종류와 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일시쉼터의 특성\n2. 단기쉼터의 특성\n3. 중장기쉼터의 특성\n4. 쉼터 운영 기준\n5. 제공 서비스 내용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년자립지원관의 역할을 설명하시오.', answer: '자립준비 청소년 대상 생활·취업·자립 통합 지원', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년자립지원관의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자립지원관의 설치 목적\n2. 지원 대상\n3. 생활 지원\n4. 취업 지원\n5. 자립 프로그램\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'protection-law',
    name: '청소년보호법',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '청소년보호법의 목적과 청소년의 정의를 설명하시오.', answer: '청소년에게 유해한 매체물과 약물 등으로부터 보호, 만 19세 미만', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년보호법의 목적과 청소년의 정의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년보호법의 목적\n2. 청소년 연령 정의\n3. 청소년 유해환경의 범위\n4. 보호법의 기본이념\n5. 다른 법률과의 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '청소년 유해매체물의 종류와 관리를 설명하시오.', answer: '청소년유해간행물, 영상물, 게임물 등 심의·고시 및 표시 의무', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년 유해매체물의 종류와 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유해간행물\n2. 유해영상물\n3. 유해게임물\n4. 심의 절차\n5. 표시 및 유통 제한\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '청소년 출입·고용금지업소를 설명하시오.', answer: '유흥주점, 단란주점, PC방 등 청소년 출입 및 고용 제한', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년 출입·고용금지업소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 출입금지업소 종류\n2. 고용금지업소 종류\n3. 연령 확인 의무\n4. 위반시 제재\n5. 예외 사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년 유해약물의 판매금지를 설명하시오.', answer: '주류, 담배, 마약류, 환각물질 등 판매 및 제공 금지', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년 유해약물의 판매금지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유해약물의 종류\n2. 판매금지 의무\n3. 연령 확인 방법\n4. 위반시 처벌\n5. 예방 교육\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년보호위원회의 기능을 설명하시오.', answer: '청소년보호정책 심의, 유해매체물 결정·고시', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년보호위원회의 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위원회의 구성\n2. 주요 기능\n3. 유해매체물 결정\n4. 정책 심의\n5. 시정 조치\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'other-laws',
    name: '기타 청소년 관련 법령',
    color: 'from-teal-500 to-emerald-500',
    questions: [
      { id: 1, question: '학교 밖 청소년 지원에 관한 법률을 설명하시오.', answer: '학교 밖 청소년 발견·지원, 학교밖청소년지원센터(꿈드림) 설치·운영', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 학교 밖 청소년 지원에 관한 법률을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법률의 목적\n2. 학교 밖 청소년 정의\n3. 지원센터(꿈드림) 기능\n4. 지원 내용\n5. 사례관리 체계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '아동·청소년의 성보호에 관한 법률을 설명하시오.', answer: '아동·청소년 대상 성범죄 처벌 및 피해자 보호·지원', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 아동·청소년의 성보호에 관한 법률을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법률의 목적\n2. 성범죄 유형\n3. 처벌 규정\n4. 피해자 보호\n5. 취업제한 제도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '다문화가족지원법상 청소년 지원을 설명하시오.', answer: '다문화가족 청소년 교육·상담·언어발달 지원', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 다문화가족지원법상 청소년 지원을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다문화가족의 정의\n2. 청소년 대상 지원\n3. 교육 지원\n4. 언어발달 지원\n5. 상담 서비스\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년 근로보호 관련 법령을 설명하시오.', answer: '근로기준법상 연소자 보호 규정, 취업인허증, 근로시간 제한', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년 근로보호 관련 법령을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연소자 정의\n2. 취업인허증 제도\n3. 근로시간 제한\n4. 야간근로 제한\n5. 임금 보호\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년참여위원회와 청소년운영위원회를 설명하시오.', answer: '청소년 정책참여 기구, 청소년시설 운영 참여', prompt: '청소년지도사 청소년육성제도론 문제입니다.\n\n문제: 청소년참여위원회와 청소년운영위원회를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년참여위원회 개념\n2. 청소년운영위원회 개념\n3. 구성 및 운영\n4. 주요 활동\n5. 참여의 효과\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function YouthPolicyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('youth-instructor-youth-policy-progress');
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
    localStorage.setItem('youth-instructor-youth-policy-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-green-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-green-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/youth-instructor" className="text-gray-600 hover:text-green-600">청소년지도사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">청소년육성제도론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎯</span>
            <h1 className="text-2xl font-bold text-gray-800">청소년육성제도론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">청소년지도사 2급 필기시험 핵심 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-green-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-green-500 text-white hover:bg-green-600'}`}>
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
