'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CommunityWelfareStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '지역사회 개념', icon: '🏘️' },
    { id: 1, name: '이론과 모델', icon: '📖' },
    { id: 2, name: '지역사회조직', icon: '🏛️' },
    { id: 3, name: '자원개발', icon: '💰' },
    { id: 4, name: '네트워크', icon: '🔗' },
    { id: 5, name: '주민참여', icon: '👥' },
    { id: 6, name: '실천분야', icon: '🎯' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '지역사회(Community)의 정의와 구성요소는?', answer: '일정한 지리적 영역 내에서 공동의 이해관계와 유대감을 가진 사람들의 집합이며, 지역성과 공동체성이 핵심이다.', explanation: '지리적 지역사회와 기능적 지역사회' },
      { id: 2, question: '지역사회복지의 개념과 목적은?', answer: '지역사회 단위에서 주민의 복지 욕구를 충족하고 삶의 질을 향상시키는 사회복지 실천이다.', explanation: '지역주민 주체성 강조' },
      { id: 3, question: '지역사회복지와 지역복지의 차이는?', answer: '지역사회복지는 전문적 실천방법을, 지역복지는 지역의 복지 상태나 제도를 의미한다.', explanation: '과정과 상태의 구분' },
      { id: 4, question: '지역사회 욕구조사의 방법은?', answer: '서베이조사, 포커스그룹, 주요정보제공자 면접, 공청회, 기존자료 분석 등이 있다.', explanation: '양적·질적 방법 혼용' },
      { id: 5, question: '지역사회 자산(Asset)의 유형은?', answer: '개인자산, 조직자산, 기관자산, 물리적 자산, 관계자산(사회적 자본) 등이 있다.', explanation: '자산기반 지역사회개발(ABCD)' },
      { id: 6, question: '사회적 자본(Social Capital)이란?', answer: '신뢰, 호혜성, 네트워크 등 사회적 관계에서 발생하는 무형의 자원이다.', explanation: '퍼트남(Putnam)의 개념' },
      { id: 7, question: '지역사회 권력구조의 유형은?', answer: '엘리트론(소수 지배), 다원론(다양한 집단 경쟁)이 있으며 권력의 분산 정도가 다르다.', explanation: '지역사회 분석에 활용' }
    ],
    1: [
      { id: 8, question: '로스만(Rothman)의 지역사회조직 모델 3가지는?', answer: '지역사회개발모델, 사회계획모델, 사회행동모델이다.', explanation: '과정-과업-행동 중심' },
      { id: 9, question: '지역사회개발모델의 특성은?', answer: '과정 중심, 주민참여, 자조역량 강화, 합의 형성을 강조한다.', explanation: '민주적 참여와 협력' },
      { id: 10, question: '사회계획모델의 특성은?', answer: '과업 중심, 전문가 주도, 합리적 문제해결, 기술적 접근을 강조한다.', explanation: '효율성과 효과성 중시' },
      { id: 11, question: '사회행동모델의 특성은?', answer: '권력재분배, 불이익집단 조직화, 갈등전략, 사회정의 실현을 추구한다.', explanation: '알린스키(Alinsky) 영향' },
      { id: 12, question: '웨일과 갬블(Weil & Gamble)의 8가지 모델은?', answer: '근린조직, 기능적 조직, 지역사회개발, 사회·경제개발, 사회계획, 연합, 정치·사회행동, 사회운동이다.', explanation: '로스만 모델의 확장' },
      { id: 13, question: '테일러와 로버츠의 지역사회실천모델은?', answer: '프로그램 개발·조정, 계획, 지역사회연계, 지역사회개발, 정치적 역량강화 모델이다.', explanation: '실천 중심 분류' },
      { id: 14, question: '포플과 레이건의 모델 분류는?', answer: '지역사회보호, 지역사회조직, 지역사회개발, 사회·지역계획, 사회행동으로 분류한다.', explanation: '영국 중심 모델' }
    ],
    2: [
      { id: 15, question: '지역사회조직(Community Organization)의 정의는?', answer: '지역사회의 문제해결을 위해 주민과 자원을 조직화하고 역량을 강화하는 전문적 실천이다.', explanation: '전통적 지역사회복지 방법' },
      { id: 16, question: '지역사회조직의 원칙은?', answer: '주민참여, 자기결정, 협력, 민주적 과정, 욕구 기반, 통합적 접근이 있다.', explanation: '주민 중심 원칙' },
      { id: 17, question: '조직화 전략의 유형은?', answer: '합의 전략, 갈등 전략, 혼합 전략이 있으며 상황에 따라 선택한다.', explanation: '목표와 권력관계에 따라 선택' },
      { id: 18, question: '풀뿌리 조직(Grassroots Organization)의 특성은?', answer: '지역주민이 직접 조직하고 운영하며, 지역문제 해결과 권익옹호를 목표로 한다.', explanation: '상향식(Bottom-up) 접근' },
      { id: 19, question: '사회복지사의 조직화 역할은?', answer: '조력자, 촉진자, 중개자, 조정자, 교육자, 옹호자 역할을 수행한다.', explanation: '간접 서비스 역할 강조' },
      { id: 20, question: '주민조직의 발전 단계는?', answer: '형성기 → 갈등기 → 규범기 → 수행기 → 종료기의 단계를 거친다.', explanation: '집단발달이론 적용' },
      { id: 21, question: '리더십 개발의 중요성과 방법은?', answer: '지역사회 역량강화의 핵심이며, 교육, 멘토링, 경험학습을 통해 개발한다.', explanation: '지속가능한 조직화의 관건' }
    ],
    3: [
      { id: 22, question: '지역사회 자원의 유형은?', answer: '인적 자원, 물적 자원, 재정 자원, 정보 자원, 조직 자원 등이 있다.', explanation: '유형·무형 자원 포함' },
      { id: 23, question: '자원개발(Resource Development)의 방법은?', answer: '모금, 정부보조금, 기업후원, 공동모금, 자원봉사 개발 등이 있다.', explanation: '다양한 재원 확보 전략' },
      { id: 24, question: '공동모금회의 역할과 기능은?', answer: '사회복지 재원을 공동으로 모금하고 배분하며, 복지 인프라 구축을 지원한다.', explanation: '연합모금 방식' },
      { id: 25, question: '사회복지공동모금회 배분사업의 유형은?', answer: '신청배분, 기획배분, 지정기탁, 긴급지원 등이 있다.', explanation: '욕구에 따른 배분' },
      { id: 26, question: '기업사회공헌(CSR)과 협력 방안은?', answer: '기업의 사회적 책임 활동과 연계하여 인적·물적 자원을 확보한다.', explanation: '윈-윈(Win-Win) 관계' },
      { id: 27, question: '자원봉사자 관리의 과정은?', answer: '모집 → 교육 → 배치 → 지도감독 → 인정·보상의 과정이다.', explanation: '체계적 관리 필요' },
      { id: 28, question: '후원자 개발과 관리 전략은?', answer: '정기후원 확보, 관계 유지, 투명한 사용 보고, 감사 표현이 중요하다.', explanation: '지속적 관계 형성' }
    ],
    4: [
      { id: 29, question: '지역사회 네트워크의 개념과 유형은?', answer: '조직 간 연결망으로 정보공유, 서비스연계, 협력사업 등을 위해 형성된다.', explanation: '공식·비공식 네트워크' },
      { id: 30, question: '서비스 연계(Linkage)의 중요성과 방법은?', answer: '서비스 중복과 누락을 방지하고 통합적 지원을 위해 의뢰, 정보공유, 공동사업을 수행한다.', explanation: '원스톱 서비스 구현' },
      { id: 31, question: '협력적 파트너십의 원칙은?', answer: '상호 존중, 신뢰, 호혜성, 공동목표, 역할 분담, 의사소통이 중요하다.', explanation: '대등한 관계 형성' },
      { id: 32, question: '지역사회복지협의체의 역할은?', answer: '지역복지계획 수립, 서비스 연계·조정, 민관협력 촉진을 담당한다.', explanation: '법정 민관협의기구' },
      { id: 33, question: '지역사회보장협의체의 구성은?', answer: '시군구 단위로 대표협의체, 실무협의체, 실무분과로 구성된다.', explanation: '사회보장급여법 근거' },
      { id: 34, question: '연합체(Coalition) 형성의 전략은?', answer: '공동의 이슈 발굴, 참여조직 모집, 역할 분담, 공동행동 계획을 수립한다.', explanation: '이슈 중심 연합' },
      { id: 35, question: '거버넌스(Governance)의 개념은?', answer: '정부, 시장, 시민사회가 협력하여 공공문제를 해결하는 새로운 통치방식이다.', explanation: '협치, 민관협력 강조' }
    ],
    5: [
      { id: 36, question: '주민참여(Citizen Participation)의 의의는?', answer: '지역사회 의사결정에 주민이 직접 참여하여 민주주의를 실현하고 정책 효과를 높인다.', explanation: '참여민주주의 실현' },
      { id: 37, question: '아른슈타인(Arnstein)의 주민참여 8단계는?', answer: '조작, 치료 → 정보제공, 상담, 회유 → 파트너십, 권한위임, 시민통제의 단계이다.', explanation: '비참여 → 형식참여 → 실질참여' },
      { id: 38, question: '주민참여의 방법은?', answer: '공청회, 주민투표, 주민자치회, 위원회 참여, 주민제안 등이 있다.', explanation: '직접·간접 참여' },
      { id: 39, question: '주민참여의 장애요인은?', answer: '무관심, 시간부족, 정보부족, 참여역량 미흡, 형식적 참여구조 등이 있다.', explanation: '참여 촉진 전략 필요' },
      { id: 40, question: '역량강화(Empowerment) 접근이란?', answer: '주민이 자신의 삶에 영향을 미치는 결정에 참여할 힘을 갖도록 지원하는 것이다.', explanation: '권한부여와 자기효능감' },
      { id: 41, question: '주민자치회의 역할과 기능은?', answer: '읍면동 단위에서 주민이 직접 지역문제를 논의하고 해결하는 자치조직이다.', explanation: '풀뿌리 자치 실현' },
      { id: 42, question: '사회적 약자의 참여 보장 방안은?', answer: '접근성 향상, 정보제공, 역량강화 교육, 당사자 대표성 보장이 필요하다.', explanation: '포용적 참여 구조' }
    ],
    6: [
      { id: 43, question: '사회복지관의 기능과 역할은?', answer: '지역사회 종합복지센터로 상담, 교육, 자활지원, 가족기능강화 등을 수행한다.', explanation: '지역복지 거점기관' },
      { id: 44, question: '재가복지서비스의 내용은?', answer: '가정방문 돌봄, 주간보호, 식사배달, 가사지원 등 가정 내 서비스이다.', explanation: '시설보호의 대안' },
      { id: 45, question: '지역아동센터의 역할은?', answer: '아동의 방과 후 보호, 학습지원, 급식, 정서지원 프로그램을 제공한다.', explanation: '취약계층 아동 지원' },
      { id: 46, question: '노인복지관의 프로그램 영역은?', answer: '건강증진, 평생교육, 여가문화, 취업지원, 자원봉사, 사회참여 프로그램이 있다.', explanation: '활기찬 노후 지원' },
      { id: 47, question: '마을만들기 사업의 특성은?', answer: '주민 주도로 마을의 물리적·사회적 환경을 개선하고 공동체를 형성한다.', explanation: '도시재생과 연계' },
      { id: 48, question: '사회적 경제 조직의 유형은?', answer: '사회적기업, 협동조합, 마을기업, 자활기업 등이 있다.', explanation: '경제적·사회적 가치 동시 추구' },
      { id: 49, question: '지역사회통합돌봄(커뮤니티케어)이란?', answer: '주민이 살던 곳에서 의료·돌봄·주거 서비스를 통합적으로 받는 체계이다.', explanation: '탈시설화, 지역사회 중심' },
      { id: 50, question: '지역사회복지운동의 방향은?', answer: '복지권리 옹호, 정책참여, 연대활동을 통해 복지국가를 실현한다.', explanation: '시민사회 역할 강조' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`사회복지사 2급 지역사회복지론 관련 질문입니다:\n\n${question}\n\n이 개념에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-teal-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/welfare" className="hover:text-white">사회복지·상담</Link><span>/</span>
            <Link href="/category/welfare/social-worker-2" className="hover:text-white">사회복지사 2급</Link><span>/</span>
            <Link href="/category/welfare/social-worker-2/study" className="hover:text-white">학습</Link><span>/</span>
            <span className="text-white">지역사회복지론</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">🏘️ 지역사회복지론</h1>
          <p className="text-teal-100">지역사회 조직화, 자원개발, 네트워크, 주민참여</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-teal-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">📚 학습 토픽</h3>
              <div className="space-y-2">
                {topics.map((topic) => (
                  <button key={topic.id} onClick={() => setCurrentTopic(topic.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-teal-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-teal-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-teal-50 rounded-lg"><p className="font-medium text-teal-900">✅ 정답</p><p className="text-teal-800 mt-1">{q.answer}</p></div>
                    <div className="p-4 bg-gray-50 rounded-lg"><p className="font-medium text-gray-700">💡 해설</p><p className="text-gray-600 mt-1">{q.explanation}</p></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">🤖 AI에게 질문하기</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto"><p className="text-gray-700 text-sm whitespace-pre-wrap">{currentPrompt}</p></div>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 rounded-lg font-medium">Claude에서 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-lg font-medium">ChatGPT에서 질문하기</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 rounded-lg font-medium">Gemini에서 질문하기</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
