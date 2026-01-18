'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HumanBehaviorStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '인간발달 기초', icon: '👶' },
    { id: 1, name: '정신역동이론', icon: '🧠' },
    { id: 2, name: '행동주의 이론', icon: '📊' },
    { id: 3, name: '인본주의 이론', icon: '💚' },
    { id: 4, name: '인지발달 이론', icon: '💭' },
    { id: 5, name: '사회체계 이론', icon: '🔄' },
    { id: 6, name: '생애주기', icon: '🌱' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '인간발달의 정의와 특성을 설명하시오.', answer: '인간발달은 수정에서 죽음까지 전 생애에 걸친 양적·질적 변화 과정이다.', explanation: '연속성, 순서성, 개인차 특성' },
      { id: 2, question: '발달의 원리 5가지를 설명하시오.', answer: '연속성, 순서성, 개인차, 분화와 통합, 결정적 시기가 있다.', explanation: '발달의 보편적 원리' },
      { id: 3, question: '성숙과 학습의 관계를 설명하시오.', answer: '성숙은 유전적 요인에 의한 변화, 학습은 경험에 의한 변화이며 상호작용한다.', explanation: '유전과 환경의 상호작용' },
      { id: 4, question: '결정적 시기(Critical Period)의 개념을 설명하시오.', answer: '특정 발달이 가장 잘 이루어지는 최적의 시기로, 이 시기를 놓치면 발달이 어렵다.', explanation: '언어발달, 애착형성 등' },
      { id: 5, question: '발달과업(Developmental Task)의 개념을 설명하시오.', answer: '각 발달단계에서 성취해야 할 과제로, 다음 단계 발달에 영향을 미친다.', explanation: 'Havighurst의 발달과업' },
      { id: 6, question: '유전과 환경 논쟁을 설명하시오.', answer: '인간 발달에서 유전(Nature)과 환경(Nurture)의 상대적 영향력에 관한 논쟁이다.', explanation: '현재는 상호작용론 지지' },
      { id: 7, question: '발달의 개인차 요인을 설명하시오.', answer: '유전, 환경, 성별, 문화, 사회경제적 지위 등이 개인차를 만든다.', explanation: '다양한 발달 경로' }
    ],
    1: [
      { id: 8, question: '프로이트의 성격 구조(원초아, 자아, 초자아)를 설명하시오.', answer: '원초아(본능), 자아(현실), 초자아(도덕)로 구성되며 갈등과 균형으로 성격이 결정된다.', explanation: '정신분석 성격이론' },
      { id: 9, question: '프로이트의 심리성적 발달단계를 설명하시오.', answer: '구강기→항문기→남근기→잠복기→생식기 5단계로 리비도가 신체 부위를 이동한다.', explanation: '각 단계 고착 시 성격 문제' },
      { id: 10, question: '방어기제의 종류를 5가지 이상 설명하시오.', answer: '억압, 투사, 합리화, 반동형성, 퇴행, 승화, 부정 등이 있다.', explanation: '불안에 대한 무의식적 대응' },
      { id: 11, question: '에릭슨의 심리사회적 발달이론을 설명하시오.', answer: '8단계 발달과업(신뢰vs불신, 자율vs수치 등)을 제시하며 자아발달을 강조한다.', explanation: '전 생애 발달 관점' },
      { id: 12, question: '에릭슨 이론의 각 단계별 과업을 설명하시오.', answer: '신뢰, 자율, 주도성, 근면성, 정체감, 친밀감, 생산성, 자아통합이다.', explanation: '성공적 과업 수행이 건강한 발달' },
      { id: 13, question: '융(Jung)의 분석심리학을 설명하시오.', answer: '집단무의식, 원형(아니마, 아니무스, 그림자, 페르소나) 개념을 제시했다.', explanation: '개인무의식과 집단무의식' },
      { id: 14, question: '아들러(Adler)의 개인심리학을 설명하시오.', answer: '열등감과 보상, 우월성 추구, 사회적 관심, 생활양식을 강조했다.', explanation: '출생순위의 영향' }
    ],
    2: [
      { id: 15, question: '파블로프의 고전적 조건형성을 설명하시오.', answer: '중성자극이 무조건자극과 반복 연합되어 조건반응을 일으키는 학습이다.', explanation: '개 실험(침 분비)' },
      { id: 16, question: '스키너의 조작적 조건형성을 설명하시오.', answer: '행동의 결과(강화/벌)에 따라 행동 빈도가 변화하는 학습이다.', explanation: '스키너 상자 실험' },
      { id: 17, question: '정적 강화와 부적 강화의 차이를 설명하시오.', answer: '정적 강화는 자극 추가로, 부적 강화는 혐오자극 제거로 행동을 증가시킨다.', explanation: '둘 다 행동 증가' },
      { id: 18, question: '강화계획의 종류를 설명하시오.', answer: '연속강화, 고정비율, 변동비율, 고정간격, 변동간격 강화계획이 있다.', explanation: '변동비율이 소거에 강함' },
      { id: 19, question: '반두라의 사회학습이론을 설명하시오.', answer: '관찰학습(모델링)을 통해 행동을 학습하며, 자기효능감을 강조한다.', explanation: '보보인형 실험' },
      { id: 20, question: '관찰학습의 4단계를 설명하시오.', answer: '주의집중 → 파지(기억) → 운동재생 → 동기화 단계를 거친다.', explanation: '모델의 특성이 중요' },
      { id: 21, question: '자기효능감(Self-efficacy)을 설명하시오.', answer: '특정 과제를 성공적으로 수행할 수 있다는 자신에 대한 믿음이다.', explanation: '성취경험이 가장 중요' }
    ],
    3: [
      { id: 22, question: '매슬로우의 욕구위계이론을 설명하시오.', answer: '생리→안전→소속→존중→자아실현 5단계 욕구가 위계적으로 충족된다.', explanation: '하위욕구 충족 후 상위욕구' },
      { id: 23, question: '자아실현의 특성을 설명하시오.', answer: '현실지각, 자기수용, 자발성, 문제중심, 독립성, 절정경험을 보인다.', explanation: 'Maslow의 자아실현 개념' },
      { id: 24, question: '로저스의 인간중심이론을 설명하시오.', answer: '인간의 자기실현 경향성을 믿고 무조건적 긍정적 존중을 강조한다.', explanation: '현상학적 접근' },
      { id: 25, question: '로저스의 핵심 조건 3가지를 설명하시오.', answer: '일치성(진실성), 무조건적 긍정적 존중, 공감적 이해이다.', explanation: '상담자의 태도' },
      { id: 26, question: '자기개념(Self-concept)을 설명하시오.', answer: '자신에 대한 지각과 평가의 총체로, 이상적 자기와 현실적 자기로 구분된다.', explanation: '자기불일치 시 불안' },
      { id: 27, question: '실존주의 이론의 핵심 개념을 설명하시오.', answer: '자유, 책임, 선택, 실존적 불안, 죽음, 의미추구를 강조한다.', explanation: '삶의 의미 탐색' },
      { id: 28, question: '인본주의 이론의 사회복지 적용을 설명하시오.', answer: '클라이언트 중심, 강점 관점, 자기결정권 존중에 적용된다.', explanation: '비지시적 상담' }
    ],
    4: [
      { id: 29, question: '피아제의 인지발달 4단계를 설명하시오.', answer: '감각운동기(0-2세)→전조작기(2-7세)→구체적조작기(7-11세)→형식적조작기(11세~)이다.', explanation: '도식의 질적 변화' },
      { id: 30, question: '도식, 동화, 조절의 개념을 설명하시오.', answer: '도식은 인지구조, 동화는 기존 도식에 맞추기, 조절은 도식 수정이다.', explanation: '인지발달의 기제' },
      { id: 31, question: '전조작기의 특성(자기중심성, 보존개념 결여)을 설명하시오.', answer: '자기중심적 사고, 물활론, 보존개념 미획득, 직관적 사고가 특징이다.', explanation: '세 산 실험' },
      { id: 32, question: '콜버그의 도덕발달 6단계를 설명하시오.', answer: '전인습(처벌회피, 보상)→인습(좋은아이, 법과질서)→후인습(사회계약, 보편윤리)이다.', explanation: '하인츠 딜레마' },
      { id: 33, question: '비고츠키의 근접발달영역(ZPD)을 설명하시오.', answer: '혼자서는 못하지만 도움받아 할 수 있는 발달 가능 영역이다.', explanation: '비계설정(Scaffolding)' },
      { id: 34, question: '정보처리이론을 설명하시오.', answer: '인간의 인지를 컴퓨터 정보처리에 비유하여 입력-처리-출력으로 설명한다.', explanation: '감각기억, 작업기억, 장기기억' },
      { id: 35, question: '인지발달이론의 사회복지 적용을 설명하시오.', answer: '클라이언트 인지수준에 맞는 개입, 인지적 왜곡 수정에 활용한다.', explanation: '인지행동치료의 기초' }
    ],
    5: [
      { id: 36, question: '체계이론의 기본 개념을 설명하시오.', answer: '체계는 상호작용하는 부분들의 집합으로, 경계, 투입, 산출, 피드백 개념이 있다.', explanation: 'von Bertalanffy의 일반체계론' },
      { id: 37, question: '개방체계와 폐쇄체계를 비교하시오.', answer: '개방체계는 환경과 교류하고, 폐쇄체계는 환경과 단절된 체계이다.', explanation: '인간은 개방체계' },
      { id: 38, question: '생태체계이론(Bronfenbrenner)을 설명하시오.', answer: '미시, 중간, 외, 거시, 시간체계의 5개 환경층으로 인간발달을 설명한다.', explanation: '환경 속의 인간' },
      { id: 39, question: '생태체계 관점의 주요 개념을 설명하시오.', answer: '적응, 스트레스, 대처, 적합성, 상호교류 개념을 사용한다.', explanation: 'Person-in-Environment' },
      { id: 40, question: '가족체계이론을 설명하시오.', answer: '가족을 하나의 체계로 보고, 하위체계, 경계, 규칙, 항상성을 분석한다.', explanation: '가족치료의 기초' },
      { id: 41, question: '사회체계와 사회환경의 관계를 설명하시오.', answer: '인간은 다양한 사회체계(가족, 집단, 조직, 지역사회)와 상호작용하며 발달한다.', explanation: '사회복지실천의 기초' },
      { id: 42, question: '생태체계 관점의 사회복지 적용을 설명하시오.', answer: '클라이언트와 환경의 상호작용, 자원 연계, 환경 수정에 활용한다.', explanation: 'PIE 관점' }
    ],
    6: [
      { id: 43, question: '영아기(0-2세)의 발달 특성을 설명하시오.', answer: '애착 형성, 감각운동 발달, 대상영속성 획득이 주요 과업이다.', explanation: 'Bowlby의 애착이론' },
      { id: 44, question: '유아기(3-6세)의 발달 특성을 설명하시오.', answer: '언어폭발, 자기중심성, 성역할 학습, 놀이를 통한 학습이 특징이다.', explanation: '상상력과 창의성 발달' },
      { id: 45, question: '아동기(7-12세)의 발달 특성을 설명하시오.', answer: '학교생활 적응, 또래관계, 근면성 발달, 구체적 조작 사고가 특징이다.', explanation: '학령기' },
      { id: 46, question: '청소년기의 발달 특성을 설명하시오.', answer: '2차 성징, 형식적 조작 사고, 정체감 형성, 또래 중요성이 특징이다.', explanation: '질풍노도의 시기' },
      { id: 47, question: '청년기의 발달 특성을 설명하시오.', answer: '직업 선택, 배우자 선택, 친밀감 형성, 부모로부터 독립이 과업이다.', explanation: '성인초기' },
      { id: 48, question: '중년기의 발달 특성을 설명하시오.', answer: '생산성 vs 침체, 빈둥지 증후군, 갱년기, 부모 부양 이슈가 있다.', explanation: '중년의 위기' },
      { id: 49, question: '노년기의 발달 특성을 설명하시오.', answer: '자아통합 vs 절망, 은퇴 적응, 배우자 상실, 죽음 준비가 과업이다.', explanation: '성공적 노화' },
      { id: 50, question: '생애주기 관점의 사회복지 적용을 설명하시오.', answer: '각 발달단계별 욕구와 위기에 맞는 복지서비스 제공에 활용한다.', explanation: '생애주기별 복지정책' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => { setShowAnswer(prev => ({ ...prev, [id]: !prev[id] })); if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id])); };
  const openAIModal = (question: string) => { setCurrentPrompt(`사회복지사 2급 학습 질문입니다:\n\n${question}\n\n이 개념에 대해 자세히 설명해주세요.`); setShowAIModal(true); };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-purple-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/welfare" className="hover:text-white">사회복지·상담</Link><span>/</span>
            <Link href="/category/welfare/social-worker-2" className="hover:text-white">사회복지사 2급</Link><span>/</span>
            <Link href="/category/welfare/social-worker-2/study" className="hover:text-white">학습</Link><span>/</span>
            <span className="text-white">인간행동과 사회환경</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">🧠 인간행동과 사회환경</h1>
          <p className="text-purple-100">인간발달, 성격이론, 사회체계이론</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md"><div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div></div>
          <p className="text-purple-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0"><div className="bg-white rounded-xl shadow-sm p-4 sticky top-4"><h3 className="font-bold text-gray-900 mb-4">📚 학습 토픽</h3><div className="space-y-2">{topics.map((topic) => (<button key={topic.id} onClick={() => setCurrentTopic(topic.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-purple-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>{topic.icon} {topic.name}</button>))}</div></div></div>
          <div className="flex-1 space-y-4">{currentQuestions.map((q) => (<div key={q.id} className="bg-white rounded-xl shadow-sm p-6"><h3 className="font-medium text-gray-900 mb-4"><span className="text-purple-500 font-bold">Q{q.id}.</span> {q.question}</h3><div className="flex gap-2"><button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button><button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button></div>{showAnswer[q.id] && (<div className="mt-4 space-y-3"><div className="p-4 bg-purple-50 rounded-lg"><p className="font-medium text-purple-900">✅ 정답</p><p className="text-purple-800 mt-1">{q.answer}</p></div><div className="p-4 bg-gray-50 rounded-lg"><p className="font-medium text-gray-700">💡 해설</p><p className="text-gray-600 mt-1">{q.explanation}</p></div></div>)}</div>))}</div>
        </div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold text-gray-900">🤖 AI에게 질문하기</h3><button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button></div><div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto"><p className="text-gray-700 text-sm whitespace-pre-wrap">{currentPrompt}</p></div><div className="space-y-2"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 rounded-lg font-medium">Claude에서 질문하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-lg font-medium">ChatGPT에서 질문하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 rounded-lg font-medium">Gemini에서 질문하기</a></div></div></div>)}
    </div>
  );
}
