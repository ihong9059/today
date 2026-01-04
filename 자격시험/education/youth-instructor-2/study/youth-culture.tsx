'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'culture-theory',
    name: '문화이론',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: '문화의 개념과 특성을 설명하시오.', answer: '학습성, 공유성, 축적성, 변동성, 총체성', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 문화의 개념과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문화의 정의\n2. 학습성\n3. 공유성\n4. 축적성과 변동성\n5. 총체성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '문화상대주의와 자문화중심주의를 설명하시오.', answer: '문화상대주의: 각 문화의 고유성 인정 / 자문화중심주의: 자기 문화 우월 시각', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 문화상대주의와 자문화중심주의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문화상대주의 개념\n2. 자문화중심주의 개념\n3. 각각의 장단점\n4. 청소년문화에의 적용\n5. 바람직한 관점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '하위문화와 반문화를 설명하시오.', answer: '하위문화: 부분집단 문화 / 반문화: 주류문화 저항', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 하위문화와 반문화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 하위문화의 개념\n2. 하위문화 사례\n3. 반문화의 개념\n4. 반문화 사례\n5. 청소년문화의 특성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '문화지체 현상을 설명하시오.', answer: '물질문화는 빠르게 변화하나 비물질문화는 느리게 변화하는 현상', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 문화지체 현상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문화지체의 개념\n2. 물질문화와 비물질문화\n3. 문화지체 원인\n4. 청소년 관련 사례\n5. 해결 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '세대문화론을 설명하시오.', answer: '각 세대 고유의 경험과 가치관이 문화 형성', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 세대문화론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세대의 개념\n2. 세대 구분 (X, Y, Z세대 등)\n3. 세대별 특성\n4. 세대 갈등\n5. 세대 간 소통\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'youth-subculture',
    name: '청소년 하위문화',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      { id: 1, question: '청소년문화의 특성을 설명하시오.', answer: '또래지향성, 감각지향성, 현재지향성, 탈권위성', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 청소년문화의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 또래지향성\n2. 감각지향성\n3. 현재지향성\n4. 탈권위성\n5. 긍정적·부정적 측면\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '청소년 언어문화를 설명하시오.', answer: '은어, 속어, 신조어, 줄임말 사용, 또래집단 정체성 형성', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 청소년 언어문화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 언어의 특징\n2. 은어와 속어\n3. 신조어와 줄임말\n4. 긍정적 기능\n5. 바람직한 지도 방향\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '청소년 외모문화를 설명하시오.', answer: '외모 중시 경향, 패션·헤어스타일 등 자기표현', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 청소년 외모문화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외모 중시 배경\n2. 패션과 헤어스타일\n3. 긍정적 측면\n4. 부정적 영향 (외모지상주의)\n5. 건강한 외모문화 형성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '청소년 소비문화를 설명하시오.', answer: '또래 동조, 브랜드 선호, 과시소비, 합리적 소비교육 필요', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 청소년 소비문화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 소비 특성\n2. 또래 동조 소비\n3. 브랜드 선호\n4. 과소비 문제\n5. 합리적 소비교육\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '청소년 여가문화를 설명하시오.', answer: '게임, 스포츠, 음악, SNS 활동 등 다양한 여가 활동', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 청소년 여가문화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 여가의 특징\n2. 주요 여가 활동\n3. 여가의 긍정적 기능\n4. 여가 불균형 문제\n5. 건전한 여가문화 조성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'media-culture',
    name: '미디어 문화',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '청소년과 대중매체의 관계를 설명하시오.', answer: 'TV, 인터넷, 스마트폰 등 영향, 정보습득·가치관 형성', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 청소년과 대중매체의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대중매체의 종류\n2. 청소년에 미치는 영향\n3. 긍정적 영향\n4. 부정적 영향\n5. 미디어 리터러시 교육\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'SNS와 청소년문화를 설명하시오.', answer: '소통 수단, 자기표현, 관계형성, SNS 중독·사이버폭력 문제', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: SNS와 청소년문화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 SNS 이용 현황\n2. SNS의 긍정적 기능\n3. 관계 형성과 유지\n4. SNS 역기능 (중독, 사이버폭력)\n5. 건강한 SNS 이용 지도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '게임문화와 청소년을 설명하시오.', answer: '여가·스트레스 해소, e-스포츠, 게임 과몰입 문제', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 게임문화와 청소년을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 게임 이용 실태\n2. 게임의 순기능\n3. e-스포츠 문화\n4. 게임 과몰입 문제\n5. 건전한 게임문화 조성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '유튜브와 1인 미디어 문화를 설명하시오.', answer: '콘텐츠 소비·제작, 크리에이터 활동, 진로 인식 변화', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 유튜브와 1인 미디어 문화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유튜브 이용 현황\n2. 콘텐츠 제작 활동\n3. 크리에이터 문화\n4. 진로에 미치는 영향\n5. 미디어 제작 교육\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '디지털 리터러시 교육을 설명하시오.', answer: '정보검색, 비판적 사고, 디지털 시민성, 저작권 인식', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 디지털 리터러시 교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 디지털 리터러시 개념\n2. 정보 검색과 활용\n3. 비판적 사고 능력\n4. 디지털 시민성\n5. 저작권과 개인정보 보호\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'pop-culture',
    name: '대중문화',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: 'K-POP과 청소년문화를 설명하시오.', answer: '아이돌 팬덤 문화, 정체성 형성, 글로벌 문화 교류', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: K-POP과 청소년문화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. K-POP의 영향력\n2. 팬덤 문화\n3. 정체성과 소속감\n4. 글로벌 문화 교류\n5. 긍정적 활용 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '웹툰·웹소설 문화를 설명하시오.', answer: '디지털 콘텐츠 소비, 창작 활동, 스토리텔링', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 웹툰·웹소설 문화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 웹툰·웹소설 이용 현황\n2. 디지털 콘텐츠 특성\n3. 창작 활동 참여\n4. 교육적 활용\n5. 유해 콘텐츠 대응\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '영화·드라마와 청소년을 설명하시오.', answer: '가치관 형성, 롤모델 설정, OTT 플랫폼 이용', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 영화·드라마와 청소년을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시청 패턴 변화 (OTT)\n2. 가치관 형성 영향\n3. 롤모델 설정\n4. 비판적 시청 능력\n5. 영상 문화 교육\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '스포츠 문화와 청소년을 설명하시오.', answer: '스포츠 관람·참여, 건강 증진, 팀워크 학습', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 스포츠 문화와 청소년을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 스포츠 참여 현황\n2. 스포츠 관람 문화\n3. 건강 증진 효과\n4. 사회성 발달\n5. 생활체육 활성화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '축제·공연 문화를 설명하시오.', answer: '문화예술 체험, 감수성 발달, 청소년 참여 축제', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 축제·공연 문화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소년 문화예술 체험\n2. 축제 참여 의의\n3. 감수성 발달\n4. 청소년 주도 축제\n5. 문화예술교육 연계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'global-culture',
    name: '글로벌 문화',
    color: 'from-teal-500 to-emerald-500',
    questions: [
      { id: 1, question: '다문화사회와 청소년을 설명하시오.', answer: '문화다양성 이해, 다문화 청소년 지원, 상호문화교육', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 다문화사회와 청소년을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다문화사회 현황\n2. 다문화 청소년 특성\n3. 문화다양성 교육\n4. 다문화 청소년 지원\n5. 상호문화 이해 증진\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '세계시민교육을 설명하시오.', answer: '지구촌 문제 인식, 인권·평화·환경 가치, 책임있는 행동', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 세계시민교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세계시민교육 개념\n2. 지구촌 문제 인식\n3. 핵심 가치 (인권, 평화, 환경)\n4. 문화적 다양성 존중\n5. 실천 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '국제교류 활동을 설명하시오.', answer: '청소년 국제교류, 문화 이해, 글로벌 역량 강화', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 국제교류 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 국제교류 유형\n2. 교환 프로그램\n3. 문화 이해 증진\n4. 글로벌 역량 개발\n5. 국제교류 활성화 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '한류와 청소년 정체성을 설명하시오.', answer: 'K-문화 확산, 문화적 자긍심, 글로벌 소통', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 한류와 청소년 정체성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 한류 현상\n2. 문화적 자긍심\n3. 정체성 형성\n4. 글로벌 소통 기회\n5. 균형잡힌 관점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '지속가능발전교육(ESD)을 설명하시오.', answer: '환경·사회·경제의 조화, 미래세대 책임, 지속가능한 실천', prompt: '청소년지도사 청소년문화 문제입니다.\n\n문제: 지속가능발전교육(ESD)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지속가능발전 개념\n2. 환경·사회·경제 조화\n3. 미래세대 책임\n4. 청소년 실천 활동\n5. 교육 프로그램\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function YouthCultureStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('youth-instructor-youth-culture-progress');
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
    localStorage.setItem('youth-instructor-youth-culture-progress', JSON.stringify(arr));
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
            <span className="text-green-600 font-medium">청소년문화</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎯</span>
            <h1 className="text-2xl font-bold text-gray-800">청소년문화 학습하기</h1>
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
