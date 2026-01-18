'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SocialWelfareIntroStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '사회복지 개념', icon: '📚' },
    { id: 1, name: '사회복지 역사', icon: '📜' },
    { id: 2, name: '가치와 윤리', icon: '⚖️' },
    { id: 3, name: '사회복지사 역할', icon: '👤' },
    { id: 4, name: '복지국가', icon: '🏛️' },
    { id: 5, name: '사회복지 분야', icon: '🌐' },
    { id: 6, name: '사회복지 전망', icon: '🔮' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '사회복지(Social Welfare)의 정의를 설명하시오.', answer: '사회복지란 국민의 생활안정과 교육, 직업, 의료의 보장을 포함한 복지를 향상시키려는 사회적 노력을 말한다.', explanation: '광의: 모든 국민의 삶의 질 향상, 협의: 취약계층 지원' },
      { id: 2, question: '잔여적 사회복지와 제도적 사회복지를 비교하시오.', answer: '잔여적 복지는 가족·시장 실패 시 임시적 지원, 제도적 복지는 보편적·예방적 서비스 제공이다.', explanation: 'Wilensky & Lebeaux(1965)의 분류' },
      { id: 3, question: '사회복지의 목적을 설명하시오.', answer: '인간다운 생활 보장, 사회통합, 자립 지원, 삶의 질 향상이 주요 목적이다.', explanation: '개인적·사회적 기능 수행 지원' },
      { id: 4, question: '사회보장의 개념과 구성체계를 설명하시오.', answer: '사회보장은 사회보험, 공공부조, 사회서비스로 구성되며 국민의 기본적 생활을 보장한다.', explanation: '사회보장기본법 제3조 정의' },
      { id: 5, question: '사회복지와 사회사업의 차이를 설명하시오.', answer: '사회복지는 제도·정책 중심의 거시적 개념, 사회사업은 실천 중심의 미시적 개념이다.', explanation: '현재는 통합적으로 사용' },
      { id: 6, question: '사회복지의 주체와 객체를 설명하시오.', answer: '주체는 국가, 지방자치단체, 민간단체이고, 객체는 복지 서비스 대상자(클라이언트)이다.', explanation: '공공과 민간의 협력 중요' },
      { id: 7, question: '사회보험과 공공부조의 차이점을 설명하시오.', answer: '사회보험은 기여(보험료)에 기반한 급여, 공공부조는 무기여 자산조사 기반 급여이다.', explanation: '사회보험: 국민연금, 건강보험 등' }
    ],
    1: [
      { id: 8, question: '엘리자베스 구빈법(1601)의 주요 내용을 설명하시오.', answer: '노동능력 유무에 따른 빈민 분류, 구빈세 징수, 교구 단위 구빈 행정을 규정하였다.', explanation: '근대 사회복지의 시초' },
      { id: 9, question: '신구빈법(1834)의 특징과 한계를 설명하시오.', answer: '열등처우원칙, 작업장 검사, 전국 통일적 구빈행정을 규정하였으나 가혹한 처우가 문제였다.', explanation: '빈민에 대한 억압적 정책' },
      { id: 10, question: '비스마르크 사회보험(1883)의 의의를 설명하시오.', answer: '세계 최초의 사회보험으로 질병, 산재, 노령연금 보험을 도입하였다.', explanation: '독일 사회보험의 시작' },
      { id: 11, question: '베버리지 보고서(1942)의 주요 내용을 설명하시오.', answer: '5대 사회악(궁핍, 질병, 무지, 불결, 나태) 해결을 위한 사회보장 체계를 제안하였다.', explanation: '영국 복지국가의 청사진' },
      { id: 12, question: 'COS(자선조직협회)와 인보관 운동을 비교하시오.', answer: 'COS는 개별사회사업 발전에, 인보관은 지역사회조직·집단사회사업에 기여하였다.', explanation: '전문 사회복지실천의 양대 뿌리' },
      { id: 13, question: '한국 사회복지 역사의 주요 흐름을 설명하시오.', answer: '조선시대 향약, 일제강점기 조선구호령, 1961년 생활보호법, 2000년 국민기초생활보장법 제정.', explanation: '잔여적 복지에서 보편적 복지로 발전' },
      { id: 14, question: '프리드랜더의 사회복지 발달 단계를 설명하시오.', answer: '상호부조 → 자선사업 → 박애사업 → 공공복지 → 복지국가 단계로 발전한다.', explanation: 'Friedlander의 발달 단계론' }
    ],
    2: [
      { id: 15, question: '사회복지의 핵심 가치 6가지를 설명하시오.', answer: '인간 존엄성, 자기결정권, 기회균등, 사회연대, 사회적 책임, 전문적 역량이다.', explanation: 'NASW 윤리강령 기반' },
      { id: 16, question: '사회복지사 윤리강령의 주요 내용을 설명하시오.', answer: '클라이언트에 대한 윤리, 동료에 대한 윤리, 기관에 대한 윤리, 사회에 대한 윤리로 구성된다.', explanation: '한국사회복지사협회 윤리강령' },
      { id: 17, question: '클라이언트 자기결정권의 의미와 한계를 설명하시오.', answer: '클라이언트가 스스로 결정할 권리를 존중하되, 타인이나 사회에 해가 되는 경우 제한된다.', explanation: 'Biestek의 7대 원칙 중 하나' },
      { id: 18, question: '비밀보장의 원칙과 예외 상황을 설명하시오.', answer: '클라이언트 정보 보호가 원칙이나, 자·타해 위험, 아동학대, 법원 명령 시 예외이다.', explanation: '비밀보장의 상대적 성격' },
      { id: 19, question: '사회복지 실천에서 윤리적 딜레마란 무엇인가?', answer: '두 가지 이상의 윤리 원칙이 충돌하여 선택이 어려운 상황을 말한다.', explanation: '예: 비밀보장 vs 위험 고지' },
      { id: 20, question: '로웬버그와 돌고프의 윤리적 원칙 순위를 설명하시오.', answer: '생명보호 > 평등·불평등 > 자율성·자유 > 최소해악 > 삶의 질 > 사생활 > 진실성 순서이다.', explanation: 'Loewenberg & Dolgoff의 원칙 체계' },
      { id: 21, question: '사회정의와 사회복지의 관계를 설명하시오.', answer: '사회복지는 분배적 정의를 실현하여 사회적 불평등을 해소하고자 한다.', explanation: 'Rawls의 정의론 관련' }
    ],
    3: [
      { id: 22, question: '사회복지사의 역할을 미시·거시적으로 구분하시오.', answer: '미시: 상담가, 옹호자, 중개자 / 거시: 계획가, 행정가, 사회운동가 역할이다.', explanation: '직접 vs 간접 실천' },
      { id: 23, question: '사회복지사 자격제도의 종류를 설명하시오.', answer: '사회복지사 1급(국가시험), 2급(학점이수), 3급(폐지 예정)으로 구분된다.', explanation: '사회복지사업법 규정' },
      { id: 24, question: '사회복지사 1급과 2급의 업무 범위 차이를 설명하시오.', answer: '1급은 시설장, 슈퍼바이저 가능, 2급은 일반 사회복지사로 활동한다.', explanation: '1급이 전문성 더 높음' },
      { id: 25, question: '사회복지사의 전문성 요소를 설명하시오.', answer: '체계적 이론, 전문교육, 윤리강령, 자율규제, 사회적 인정이 전문성 요소이다.', explanation: 'Greenwood의 전문직 속성' },
      { id: 26, question: '사회복지사의 소진(Burnout)과 대처 방법을 설명하시오.', answer: '정서적 고갈, 비인간화, 성취감 저하가 나타나며, 슈퍼비전과 자기관리가 필요하다.', explanation: 'Maslach의 소진 이론' },
      { id: 27, question: '슈퍼비전의 기능을 설명하시오.', answer: '행정적 기능(업무조정), 교육적 기능(역량개발), 지지적 기능(정서지원)이 있다.', explanation: 'Kadushin의 슈퍼비전 모델' },
      { id: 28, question: '사회복지사 보수교육의 목적과 시간을 설명하시오.', answer: '전문성 향상을 위해 연간 8시간 이상의 보수교육을 이수해야 한다.', explanation: '사회복지사업법 규정' }
    ],
    4: [
      { id: 29, question: '복지국가의 유형을 분류하시오(Esping-Andersen).', answer: '자유주의(미국), 보수주의(독일), 사민주의(스웨덴) 복지국가로 분류된다.', explanation: '탈상품화, 계층화 기준' },
      { id: 30, question: '복지국가의 위기와 재편 논의를 설명하시오.', answer: '1970년대 이후 경제위기로 복지 축소, 민영화, 근로연계복지 등이 논의되었다.', explanation: '신자유주의 영향' },
      { id: 31, question: '보편주의와 선별주의의 장단점을 비교하시오.', answer: '보편주의는 낙인 없으나 비용 크고, 선별주의는 효율적이나 낙인 효과가 있다.', explanation: '복지 대상자 선정 방식' },
      { id: 32, question: '복지다원주의란 무엇인가?', answer: '국가, 시장, 가족, 시민사회가 복지 공급을 분담하는 체제를 말한다.', explanation: '복지 혼합(Welfare Mix)' },
      { id: 33, question: '생산적 복지와 적극적 복지를 설명하시오.', answer: '생산적 복지는 근로연계, 적극적 복지는 사전예방적 투자를 강조한다.', explanation: '한국 복지정책 방향' },
      { id: 34, question: '사회투자국가론을 설명하시오.', answer: '인적자본 투자(교육, 보육)를 통해 생산성과 복지를 동시에 추구한다.', explanation: 'Giddens의 제3의 길' },
      { id: 35, question: '한국 복지국가의 특성을 설명하시오.', answer: '압축적 발전, 낮은 복지지출, 가족주의, 잔여적 성격이 특징이다.', explanation: '발전국가형 복지체제' }
    ],
    5: [
      { id: 36, question: '아동복지의 원칙과 주요 서비스를 설명하시오.', answer: '아동 최선의 이익 원칙하에 보호, 발달지원, 가족지원 서비스를 제공한다.', explanation: 'UN 아동권리협약 기반' },
      { id: 37, question: '노인복지의 현황과 과제를 설명하시오.', answer: '고령화로 노인돌봄, 연금, 건강, 일자리 정책이 중요해지고 있다.', explanation: '2025년 초고령사회 진입' },
      { id: 38, question: '장애인복지의 패러다임 변화를 설명하시오.', answer: '의료모델에서 사회모델로, 시설보호에서 지역사회통합으로 전환 중이다.', explanation: '탈시설화, 자립생활' },
      { id: 39, question: '가족복지의 영역과 서비스를 설명하시오.', answer: '한부모, 다문화, 조손가족 등 다양한 가족 유형에 맞는 지원 서비스 제공.', explanation: '가족 다양성 인정' },
      { id: 40, question: '정신건강복지의 주요 내용을 설명하시오.', answer: '정신질환 예방, 치료, 재활, 사회복귀를 지원하며 인권 보호를 강조한다.', explanation: '정신건강복지법(2017)' },
      { id: 41, question: '의료사회복지사의 역할을 설명하시오.', answer: '병원에서 환자와 가족 상담, 자원연계, 퇴원계획, 지역사회 연결을 담당한다.', explanation: '의료팀의 일원으로 활동' },
      { id: 42, question: '학교사회복지사의 역할을 설명하시오.', answer: '학교부적응, 학교폭력, 가정문제 학생을 지원하고 학교-가정-지역사회를 연계한다.', explanation: '교육복지 영역' }
    ],
    6: [
      { id: 43, question: '4차 산업혁명이 사회복지에 미치는 영향을 설명하시오.', answer: 'AI, 빅데이터 활용으로 맞춤형 서비스, 비대면 상담이 확대되고 있다.', explanation: '디지털 복지 전환' },
      { id: 44, question: '지역사회 통합돌봄(커뮤니티케어)을 설명하시오.', answer: '노인, 장애인이 시설이 아닌 지역사회에서 살아갈 수 있도록 통합 서비스 제공.', explanation: '탈시설화 정책' },
      { id: 45, question: '사회서비스원의 역할과 의의를 설명하시오.', answer: '공공이 직접 사회서비스를 제공하여 서비스 질과 종사자 처우를 개선한다.', explanation: '사회서비스 공공성 강화' },
      { id: 46, question: '긴급복지지원제도를 설명하시오.', answer: '위기상황(실직, 질병 등) 발생 시 신속하게 생계, 의료, 주거 지원을 제공한다.', explanation: '긴급복지지원법' },
      { id: 47, question: '사회복지 전달체계 개편 방향을 설명하시오.', answer: '읍면동 복지허브화, 찾아가는 복지, 통합사례관리로 접근성을 강화한다.', explanation: '주민 중심 복지' },
      { id: 48, question: '사회복지시설 평가제도를 설명하시오.', answer: '3년마다 시설 운영, 서비스 질을 평가하여 서비스 개선을 유도한다.', explanation: '사회복지사업법 규정' },
      { id: 49, question: '사회복지 공동모금회의 역할을 설명하시오.', answer: '민간 모금을 통해 복지 재원을 마련하고 다양한 복지사업을 지원한다.', explanation: '사랑의열매' },
      { id: 50, question: '향후 사회복지사의 역량 개발 방향을 설명하시오.', answer: '디지털 역량, 다문화 역량, 사례관리 역량, 정책분석 역량이 중요해진다.', explanation: '변화하는 복지 환경 대응' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`사회복지사 2급 학습 질문입니다:\n\n${question}\n\n이 개념에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-pink-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/welfare" className="hover:text-white">사회복지·상담</Link><span>/</span>
            <Link href="/category/welfare/social-worker-2" className="hover:text-white">사회복지사 2급</Link><span>/</span>
            <Link href="/category/welfare/social-worker-2/study" className="hover:text-white">학습</Link><span>/</span>
            <span className="text-white">사회복지개론</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">📚 사회복지개론</h1>
          <p className="text-pink-100">사회복지의 개념, 역사, 가치와 윤리</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-pink-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
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
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-pink-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-pink-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-pink-50 rounded-lg"><p className="font-medium text-pink-900">✅ 정답</p><p className="text-pink-800 mt-1">{q.answer}</p></div>
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
