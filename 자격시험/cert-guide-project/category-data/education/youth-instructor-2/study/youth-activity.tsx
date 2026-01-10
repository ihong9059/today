'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'training-activity',
    name: '청소년 수련활동',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: '청소년 수련활동의 개념과 유형을 설명하시오.', answer: '생활권·자연권 수련활동, 체험중심 교육적 활동', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 청소년 수련활동의 개념과 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수련활동의 정의\n2. 생활권 수련활동\n3. 자연권 수련활동\n4. 특화 수련활동\n5. 수련활동의 교육적 의의\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '야영활동의 종류와 운영을 설명하시오.', answer: '캠핑, 백패킹, 하이킹 등, 자연 속 공동생활 경험', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 야영활동의 종류와 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 야영활동의 교육적 가치\n2. 캠핑의 종류\n3. 텐트 설치 및 야영지 선정\n4. 안전관리\n5. 환경보호 (Leave No Trace)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '모험활동 프로그램을 설명하시오.', answer: '암벽등반, 래프팅, 로프코스 등, 도전정신·극복 경험', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 모험활동 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 모험활동의 교육적 효과\n2. 로프코스 (하이/로우)\n3. 암벽등반\n4. 수상활동 (래프팅, 카약)\n5. 안전관리 체계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '집단게임 활동을 설명하시오.', answer: '협동게임, 신뢰게임, 문제해결게임, 팀워크 향상', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 집단게임 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단게임의 목적\n2. 협동게임\n3. 신뢰형성게임\n4. 문제해결게임\n5. 디브리핑 (성찰)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '야외요리 활동을 설명하시오.', answer: '캠프파이어 요리, 협동심 함양, 생활기술 습득', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 야외요리 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 야외요리의 교육적 가치\n2. 화덕 만들기\n3. 요리 종류 (밥짓기, 찌개 등)\n4. 협동과 역할분담\n5. 안전 및 위생관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'exchange-activity',
    name: '청소년 교류활동',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      { id: 1, question: '청소년 교류활동의 의의를 설명하시오.', answer: '지역·국가 간 교류, 상호이해·우정 증진, 시야 확대', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 청소년 교류활동의 의의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교류활동의 개념\n2. 교육적 의의\n3. 상호이해 증진\n4. 문화다양성 경험\n5. 글로벌 역량 개발\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '국내 청소년 교류활동을 설명하시오.', answer: '도농교류, 지역간 교류, 학교간 교류', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 국내 청소년 교류활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도농교류 활동\n2. 지역간 교류\n3. 학교간 교류\n4. 프로그램 운영 방법\n5. 교류의 효과\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '국제 청소년 교류활동을 설명하시오.', answer: '문화교류, 방문단 파견·초청, 온라인 교류', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 국제 청소년 교류활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 국제교류의 목적\n2. 방문단 교류\n3. 홈스테이 프로그램\n4. 온라인 국제교류\n5. 사전·사후 교육\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '자매결연 교류를 설명하시오.', answer: '지속적 교류 관계, 정기적 방문·교류, 우정 증진', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 자매결연 교류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자매결연의 의미\n2. 결연 절차\n3. 정기 교류 프로그램\n4. 지속적 관계 유지\n5. 성공 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '다문화 교류활동을 설명하시오.', answer: '다문화 청소년과의 교류, 문화다양성 이해, 편견 해소', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 다문화 교류활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다문화 교류의 필요성\n2. 프로그램 종류\n3. 문화이해 교육\n4. 편견 해소\n5. 통합 증진\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'cultural-activity',
    name: '청소년 문화활동',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '청소년 문화예술활동을 설명하시오.', answer: '음악, 미술, 연극, 무용 등 예술 체험·표현 활동', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 청소년 문화예술활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문화예술활동의 교육적 가치\n2. 음악 활동 (밴드, 합창)\n3. 미술 활동\n4. 연극·뮤지컬\n5. 감수성과 창의성 발달\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '청소년 축제·행사를 설명하시오.', answer: '청소년 주도 축제, 발표회, 경연대회, 참여·소통 경험', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 청소년 축제·행사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 축제의 의의\n2. 청소년 주도 기획\n3. 다양한 축제 유형\n4. 발표와 공유\n5. 성취감과 자신감\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '미디어 제작 활동을 설명하시오.', answer: '영상, UCC, 팟캐스트 제작, 미디어 리터러시', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 미디어 제작 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미디어 제작 교육 의의\n2. 영상 제작 과정\n3. UCC 및 유튜브 콘텐츠\n4. 팟캐스트 제작\n5. 미디어 리터러시 향상\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '독서·토론 활동을 설명하시오.', answer: '독서동아리, 토론회, 비판적 사고력·표현력 향상', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 독서·토론 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 독서활동의 중요성\n2. 독서동아리 운영\n3. 토론 기법 (찬반토론, 하브루타)\n4. 비판적 사고력\n5. 표현력과 소통 능력\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '문화유산 탐방활동을 설명하시오.', answer: '역사·문화유적 탐방, 문화정체성 형성, 애국심 함양', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 문화유산 탐방활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문화유산 교육의 의의\n2. 탐방 프로그램 기획\n3. 체험 활동 연계\n4. 문화정체성 형성\n5. 역사 인식 제고\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'volunteer-activity',
    name: '청소년 봉사활동',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '청소년 봉사활동의 의의를 설명하시오.', answer: '나눔과 배려, 공동체 의식, 사회적 책임감', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 청소년 봉사활동의 의의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 봉사활동의 개념\n2. 교육적 가치\n3. 나눔과 배려 실천\n4. 공동체 의식 함양\n5. 사회적 책임감 발달\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '봉사활동의 유형을 설명하시오.', answer: '환경보호, 복지시설, 재능기부, 캠페인 등', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 봉사활동의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환경보호 활동\n2. 복지시설 봉사\n3. 재능기부\n4. 캠페인 활동\n5. 지역사회 봉사\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '봉사학습(Service-Learning)을 설명하시오.', answer: '봉사와 학습의 결합, 성찰·적용, 의미있는 경험', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 봉사학습(Service-Learning)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 봉사학습의 개념\n2. 준비 단계\n3. 실행 단계\n4. 성찰 단계\n5. 학습과의 연계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년 자원봉사 인증제를 설명하시오.', answer: 'VMS 시스템, 봉사시간 인정, 동기부여', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 청소년 자원봉사 인증제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자원봉사 인증제 개요\n2. VMS (1365) 시스템\n3. 봉사시간 인정\n4. 활용 (입시, 표창)\n5. 동기부여 효과\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '지역사회 연계 봉사활동을 설명하시오.', answer: '지역사회 문제 발견·해결, 시민참여, 주인의식', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 지역사회 연계 봉사활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지역사회 연계 필요성\n2. 지역 문제 발견\n3. 해결 방안 모색\n4. 실천 활동\n5. 주인의식 함양\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'participation-activity',
    name: '청소년 참여활동',
    color: 'from-teal-500 to-emerald-500',
    questions: [
      { id: 1, question: '청소년 참여의 개념과 중요성을 설명하시오.', answer: '의사결정 참여, 민주시민 역량, 권리 행사', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 청소년 참여의 개념과 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 참여의 정의\n2. 참여의 권리\n3. 민주시민 역량\n4. 자기효능감 향상\n5. 참여의 수준 (사다리 모형)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '청소년참여위원회 활동을 설명하시오.', answer: '정책 제안, 모니터링, 의견 수렴, 참여 기구', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 청소년참여위원회 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년참여위원회 개요\n2. 구성 및 운영\n3. 정책 제안 활동\n4. 모니터링 활동\n5. 성과와 과제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '청소년운영위원회를 설명하시오.', answer: '시설 운영 참여, 프로그램 기획, 모니터링', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 청소년운영위원회를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년운영위원회 개념\n2. 시설 운영 참여\n3. 프로그램 기획 참여\n4. 모니터링 활동\n5. 운영 활성화 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년 의회 활동을 설명하시오.', answer: '모의의회, 정책 토론, 민주주의 학습', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 청소년 의회 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 의회 개념\n2. 모의의회 운영\n3. 정책 토론\n4. 민주주의 학습\n5. 시민 역량 함양\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년 사회참여 활동을 설명하시오.', answer: '캠페인, 공익활동, 정책 제안, 사회 변화 주도', prompt: '청소년지도사 청소년활동 문제입니다.\n\n문제: 청소년 사회참여 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사회참여의 의의\n2. 캠페인 활동\n3. 공익 프로젝트\n4. 정책 제안\n5. 사회 변화 주도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function YouthActivityStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('youth-instructor-youth-activity-progress');
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
    localStorage.setItem('youth-instructor-youth-activity-progress', JSON.stringify(arr));
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
            <span className="text-green-600 font-medium">청소년활동</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎯</span>
            <h1 className="text-2xl font-bold text-gray-800">청소년활동 학습하기</h1>
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
