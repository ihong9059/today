'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'classification',
    name: '직업분류',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '한국표준직업분류(KSCO)를 설명하시오.', answer: '대분류 10개, 중분류, 소분류, 세분류 체계', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 한국표준직업분류(KSCO)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. KSCO의 목적과 체계\n2. 대분류 10개 범주\n3. 중·소·세분류 구조\n4. 분류 기준 (직무와 숙련도)\n5. ISCO와의 관계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '한국고용직업분류(KECO)를 설명하시오.', answer: '고용정보 중심, 24개 대분류, 직무와 산업 연계', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 한국고용직업분류(KECO)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. KECO의 개발 배경\n2. 24개 대분류 체계\n3. 직무 중심 분류 특징\n4. KSCO와의 차이점\n5. 워크넷 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '한국직업사전을 설명하시오.', answer: '직업정보 DB, 직무내용, 요구조건, 전망', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 한국직업사전을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 한국직업사전의 구성\n2. 수록 정보 (직무, 자격, 전망)\n3. 직업정보 활용 방법\n4. 워크넷 커리어넷 연계\n5. 직업상담에서의 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'O*NET 직업분류를 설명하시오.', answer: '미국 직업정보망, 능력-지식-기술, SOC 연계', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: O*NET 직업분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. O*NET의 개요\n2. Content Model 구조\n3. 능력·지식·기술 정보\n4. SOC 분류체계\n5. 한국 직업정보와 비교\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '직업정보의 분류기준을 설명하시오.', answer: '직무, 산업, 숙련도, 학력, 자격', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보의 분류기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직무 중심 분류\n2. 산업 중심 분류\n3. 숙련수준 분류\n4. 학력·자격 분류\n5. 복합 분류 체계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'collection',
    name: '정보수집',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '직업정보의 출처를 설명하시오.', answer: '통계청, 고용노동부, 교육부, 산업별 협회', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보의 출처를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정부기관 (통계청, 고용부)\n2. 공공기관 (한국고용정보원)\n3. 산업별 협회 및 단체\n4. 민간 구인구직 사이트\n5. 정보의 신뢰성 평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '직업정보 수집방법을 설명하시오.', answer: '문헌조사, 설문조사, 면접조사, 현장관찰', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보 수집방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문헌 조사 방법\n2. 설문조사 기법\n3. 심층 면접 조사\n4. 현장 관찰과 체험\n5. 온라인 정보 수집\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '직무분석 기법을 설명하시오.', answer: '관찰법, 면접법, 질문지법, 작업일지법', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직무분석 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직무분석의 목적\n2. 관찰법의 장단점\n3. 면접법의 활용\n4. 질문지법 설계\n5. 작업일지법과 체크리스트\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '직업정보 평가기준을 설명하시오.', answer: '정확성, 최신성, 포괄성, 접근성, 이해용이성', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보 평가기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정확성과 신뢰성\n2. 최신성과 시의성\n3. 포괄성과 완전성\n4. 접근성과 활용성\n5. 이해용이성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '빅데이터와 직업정보를 설명하시오.', answer: '구인구직 빅데이터, AI 분석, 트렌드 예측', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 빅데이터와 직업정보를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 빅데이터의 개념\n2. 구인구직 데이터 분석\n3. AI 기반 직업 매칭\n4. 직업 트렌드 예측\n5. 직업상담에서의 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'prospect',
    name: '직업전망',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '직업전망의 분석요소를 설명하시오.', answer: '인력수요, 공급, 임금, 근로조건, 발전가능성', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업전망의 분석요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인력 수요 전망\n2. 인력 공급 전망\n3. 임금 및 보수 수준\n4. 근로조건과 환경\n5. 발전가능성과 안정성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '미래 유망직업을 설명하시오.', answer: 'AI, 빅데이터, 친환경, 헬스케어, 문화콘텐츠', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 미래 유망직업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 4차 산업혁명과 신직업\n2. AI·빅데이터 관련 직업\n3. 친환경·에너지 분야\n4. 헬스케어·바이오 분야\n5. 문화콘텐츠 분야\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '직업세계의 변화를 설명하시오.', answer: '자동화, 플랫폼노동, 원격근무, 긱경제', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업세계의 변화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자동화와 일자리 변화\n2. 플랫폼 노동의 증가\n3. 원격근무와 재택근무\n4. 긱 이코노미(Gig Economy)\n5. 평생학습의 중요성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '산업구조 변화와 직업을 설명하시오.', answer: '1·2·3차 산업 변화, 지식기반경제, 서비스업 확대', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 산업구조 변화와 직업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1·2·3차 산업구조 변화\n2. 지식기반경제로의 전환\n3. 서비스업 확대\n4. 제조업의 고도화\n5. 신산업 분야 직업\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '직업 생애주기를 설명하시오.', answer: '신생직업, 성장직업, 성숙직업, 쇠퇴직업', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업 생애주기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신생직업의 특징\n2. 성장직업의 조건\n3. 성숙직업의 안정성\n4. 쇠퇴직업의 원인\n5. 직업선택 시 고려사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'employment',
    name: '고용정보',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '고용동향 지표를 설명하시오.', answer: '실업률, 고용률, 경제활동참가율, 취업자수', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 고용동향 지표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실업률의 정의와 계산\n2. 고용률의 의미\n3. 경제활동참가율\n4. 취업자·실업자 구분\n5. 비경제활동인구\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '구인구직 정보를 설명하시오.', answer: '워크넷, 사람인, 잡코리아, 직종별 특화 사이트', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 구인구직 정보를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 워크넷 활용법\n2. 민간 구인구직 사이트\n3. 직종별 특화 플랫폼\n4. 구인정보 분석 방법\n5. 효과적인 구직 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '직업훈련 정보를 설명하시오.', answer: 'HRD-Net, 국가기간전략산업, 내일배움카드', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업훈련 정보를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. HRD-Net 훈련정보망\n2. 국가기간·전략산업직종훈련\n3. 내일배움카드 제도\n4. K-디지털 트레이닝\n5. 직업훈련 선택 기준\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '자격증 정보를 설명하시오.', answer: '큐넷, 국가자격, 민간자격, 자격요건, 활용도', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 자격증 정보를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Q-Net 자격정보\n2. 국가기술자격 체계\n3. 민간자격 인증\n4. 자격요건과 시험정보\n5. 자격증 활용도 평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '취업지원 프로그램을 설명하시오.', answer: '청년취업, 여성새로일하기, 중장년, 장애인', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 취업지원 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청년 취업지원 정책\n2. 여성 새로일하기센터\n3. 중장년 재취업 지원\n4. 장애인 고용지원\n5. 고용센터 서비스\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'utilization',
    name: '정보활용',
    color: 'from-red-500 to-rose-500',
    questions: [
      { id: 1, question: '직업정보의 제공방법을 설명하시오.', answer: '개별상담, 집단지도, 인터넷, 책자, 박람회', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보의 제공방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개별 상담을 통한 제공\n2. 집단 진로지도\n3. 인터넷 정보 제공\n4. 책자 및 리플릿\n5. 취업박람회 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '직업체험 프로그램을 설명하시오.', answer: '현장견학, 직업체험, 멘토링, 인턴십', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업체험 프로그램을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현장견학의 효과\n2. 직업체험센터 활용\n3. 멘토링 프로그램\n4. 인턴십과 현장실습\n5. 직업체험 사후관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '진로정보 시스템을 설명하시오.', answer: '커리어넷, 워크넷, 대입정보포털', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 진로정보 시스템을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 커리어넷 활용\n2. 워크넷 서비스\n3. 대입정보포털\n4. 학과정보 검색\n5. 심리검사 연계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '직업정보 DB 구축을 설명하시오.', answer: '수집, 분류, 저장, 갱신, 관리체계', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보 DB 구축을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정보 수집 계획\n2. 분류 및 코딩\n3. 데이터베이스 설계\n4. 정보 갱신 주기\n5. 품질관리 체계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '직업정보 상담기법을 설명하시오.', answer: '욕구파악, 정보탐색, 정보제공, 의사결정지원', prompt: '직업상담사 2급 직업정보론 문제입니다.\n\n문제: 직업정보 상담기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내담자 욕구 파악\n2. 정보 탐색 지원\n3. 맞춤형 정보 제공\n4. 정보 해석 돕기\n5. 의사결정 지원\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function JobInformationStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('career-counselor-job-information-progress');
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
    localStorage.setItem('career-counselor-job-information-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-blue-600">교육·상담</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/career-counselor" className="text-gray-600 hover:text-blue-600">직업상담사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">직업정보론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📊</span>
            <h1 className="text-2xl font-bold text-gray-800">직업정보론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">직업상담사 2급 필기시험 핵심 과목 - 직업분류와 정보수집</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-blue-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
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
