'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'rights-theory',
    name: '청소년 인권 이론',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: '청소년 인권의 개념과 특성을 설명하시오.', answer: '청소년의 기본권, 발달권, 보호권, 참여권의 조화', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 청소년 인권의 개념과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인권의 기본 개념\n2. 청소년 인권의 특수성\n3. 인권의 보편성과 불가분성\n4. 청소년 인권의 범위\n5. 권리와 책임의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'UN 아동권리협약의 4대 기본원칙을 설명하시오.', answer: '비차별, 아동 최선의 이익, 생존과 발달권, 아동 의견 존중', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: UN 아동권리협약의 4대 기본원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비차별의 원칙\n2. 아동 최선의 이익\n3. 생존과 발달의 권리\n4. 아동 의견 존중\n5. 한국의 이행 현황\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '청소년의 참여권을 설명하시오.', answer: '의견표명권, 정보접근권, 결사의 자유, 정책참여권', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 청소년의 참여권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 참여권의 개념\n2. 참여권의 종류\n3. 의견표명권\n4. 정보접근권\n5. 참여권 보장 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년 인권침해 유형과 구제절차를 설명하시오.', answer: '교육권, 노동권, 사생활권 침해 / 국가인권위원회, 옴부즈만', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 청소년 인권침해 유형과 구제절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주요 인권침해 유형\n2. 학교에서의 인권침해\n3. 구제 절차\n4. 국가인권위원회 역할\n5. 예방 대책\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '인권교육의 목표와 방법을 설명하시오.', answer: '인권 의식 함양, 인권 감수성 향상 / 체험교육, 토론학습', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 인권교육의 목표와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인권교육의 목표\n2. 인권 감수성\n3. 교육 내용\n4. 교육 방법\n5. 효과적 인권교육 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'participation-theory',
    name: '청소년 참여 이론',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      { id: 1, question: '청소년 참여의 개념과 의의를 설명하시오.', answer: '의사결정 과정 참여, 주체적 시민성 개발, 민주주의 학습', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 청소년 참여의 개념과 의의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 참여의 개념\n2. 청소년 참여의 특성\n3. 참여의 의의\n4. 참여와 발달의 관계\n5. 참여 저해 요인\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'Hart의 참여 사다리 모형을 설명하시오.', answer: '비참여(조작, 장식, 형식) ~ 진정한 참여(8단계)', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: Hart의 참여 사다리 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비참여 단계\n2. 형식적 참여\n3. 진정한 참여\n4. 각 단계의 특징\n5. 실천적 함의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '청소년 참여의 유형을 설명하시오.', answer: '정책참여, 활동참여, 의사결정 참여, 온라인 참여', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 청소년 참여의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정책참여\n2. 활동참여\n3. 의사결정 참여\n4. 온라인 참여\n5. 각 유형의 장단점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년 참여 활성화 방안을 설명하시오.', answer: '제도적 보장, 교육 강화, 플랫폼 구축, 성인의 태도 변화', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 청소년 참여 활성화 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제도적 보장\n2. 참여교육 강화\n3. 참여 플랫폼\n4. 성인의 역할\n5. 참여 문화 조성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년 참여기구의 종류와 운영을 설명하시오.', answer: '청소년참여위원회, 청소년운영위원회, 청소년의회', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 청소년 참여기구의 종류와 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년참여위원회\n2. 청소년운영위원회\n3. 청소년의회\n4. 효과적 운영 방안\n5. 성과와 과제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'citizenship',
    name: '시민교육',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '시민성 교육의 개념과 목표를 설명하시오.', answer: '민주시민 자질 함양, 공동체 의식, 참여 역량 개발', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 시민성 교육의 개념과 목표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시민성의 개념\n2. 시민교육의 목표\n3. 시민교육의 내용\n4. 청소년 시민교육의 특성\n5. 효과적 교육 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '민주시민교육의 원리와 방법을 설명하시오.', answer: '자율성, 비판적 사고, 참여 학습, 토론과 대화', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 민주시민교육의 원리와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 민주시민교육 원리\n2. 참여 학습\n3. 토론 교육\n4. 프로젝트 학습\n5. 실천 중심 교육\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '글로벌 시민교육을 설명하시오.', answer: '세계시민 의식, 다문화 이해, 지속가능발전교육', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 글로벌 시민교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 글로벌 시민성\n2. 교육 목표\n3. 핵심 역량\n4. 교육 내용\n5. 실천 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년의 사회참여 활동 유형을 설명하시오.', answer: '자원봉사, 캠페인, 정책제안, 사회적 기업', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 청소년의 사회참여 활동 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자원봉사 활동\n2. 캠페인 활동\n3. 정책제안 활동\n4. 사회적 경제 참여\n5. 활동의 효과\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '디지털 시민성을 설명하시오.', answer: '온라인 윤리, 미디어 리터러시, 디지털 참여', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 디지털 시민성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 디지털 시민성 개념\n2. 온라인 윤리\n3. 미디어 리터러시\n4. 디지털 참여\n5. 교육 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'youth-voice',
    name: '청소년 목소리',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '청소년의 의견표명권을 설명하시오.', answer: 'UN협약 12조, 자유로운 의견 표현, 의견 반영 의무', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 청소년의 의견표명권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의견표명권의 근거\n2. 의견표명권의 내용\n3. 연령과 성숙도 고려\n4. 의견 반영 절차\n5. 실현 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '청소년 당사자주의를 설명하시오.', answer: '청소년 문제의 주체로서 청소년, Nothing about us without us', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 청소년 당사자주의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 당사자주의 개념\n2. 청소년 당사자성\n3. 정책 결정 참여\n4. 당사자주의 실천\n5. 한계와 과제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '청소년 의견 수렴 방법을 설명하시오.', answer: '설문조사, 공청회, 간담회, 온라인 플랫폼', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 청소년 의견 수렴 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설문조사 방법\n2. 공청회와 간담회\n3. 온라인 플랫폼\n4. 참여형 워크숍\n5. 효과적 수렴 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년 정책제안 과정을 설명하시오.', answer: '문제발견, 의제화, 정책대안 개발, 제안, 모니터링', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 청소년 정책제안 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문제 발견\n2. 의제화 과정\n3. 정책대안 개발\n4. 정책제안\n5. 정책 모니터링\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년 옹호(Advocacy)를 설명하시오.', answer: '청소년 권리 대변, 정책 변화 촉구, 임파워먼트', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 청소년 옹호(Advocacy)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 옹호의 개념\n2. 옹호의 유형\n3. 옹호 전략\n4. 옹호 주체\n5. 효과적 옹호 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'international',
    name: '국제 기준과 동향',
    color: 'from-teal-500 to-emerald-500',
    questions: [
      { id: 1, question: 'UN 아동권리협약의 주요 내용을 설명하시오.', answer: '생존권, 보호권, 발달권, 참여권 / 국가 이행 의무', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: UN 아동권리협약의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 협약의 배경\n2. 4대 기본권\n3. 국가 의무\n4. 이행 감독 체계\n5. 한국의 이행\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '세계인권선언과 청소년 인권을 설명하시오.', answer: '인권의 보편성, 차별금지, 청소년 권리 적용', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 세계인권선언과 청소년 인권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세계인권선언 개요\n2. 주요 내용\n3. 청소년 권리 적용\n4. 국제인권규약\n5. 한국의 인권 보장\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '국가별 청소년 참여 정책을 비교하시오.', answer: '북유럽, 영미권, 아시아 국가의 참여 정책과 기구', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 국가별 청소년 참여 정책을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 북유럽 국가\n2. 영미권 국가\n3. 아시아 국가\n4. 주요 특징 비교\n5. 한국에의 시사점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'UN 청소년포럼과 국제 참여 기구를 설명하시오.', answer: 'UN Youth Forum, 유럽청소년포럼, 청소년 대표단', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: UN 청소년포럼과 국제 참여 기구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. UN Youth Forum\n2. 유럽청소년포럼\n3. 국제 청소년 대표단\n4. 주요 활동\n5. 한국 청소년 참여\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '지속가능발전목표(SDGs)와 청소년 참여를 설명하시오.', answer: 'SDG 4.7 청소년 교육, 목표 달성을 위한 청소년 참여', prompt: '청소년지도사 1급 청소년인권과참여 문제입니다.\n\n문제: 지속가능발전목표(SDGs)와 청소년 참여를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SDGs 개요\n2. 청소년 관련 목표\n3. 청소년 참여의 중요성\n4. 참여 사례\n5. 실천 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function RightsParticipationStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('youth-instructor-1-rights-participation-progress');
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
    localStorage.setItem('youth-instructor-1-rights-participation-progress', JSON.stringify(arr));
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
            <Link href="/category/education/youth-instructor-1" className="text-gray-600 hover:text-green-600">청소년지도사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">청소년인권과참여</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">✊</span>
            <h1 className="text-2xl font-bold text-gray-800">청소년인권과참여 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">청소년지도사 1급 필기시험 핵심 과목</p>
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
