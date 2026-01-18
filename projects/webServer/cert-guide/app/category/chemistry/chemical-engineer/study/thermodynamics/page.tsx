'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ThermodynamicsStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '열역학 기초', icon: '📐' },
    { id: 1, name: '열역학 법칙', icon: '⚖️' },
    { id: 2, name: 'PVT 관계', icon: '📊' },
    { id: 3, name: '열역학적 성질', icon: '🔬' },
    { id: 4, name: '상평형', icon: '⚗️' },
    { id: 5, name: '화학평형', icon: '🧪' },
    { id: 6, name: '열기관과 냉동', icon: '❄️' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '열역학에서 계(System)의 종류와 특징은?', answer: '개방계(물질+에너지 교환), 폐쇄계(에너지만 교환), 고립계(교환 없음)로 구분된다.', explanation: '시스템 경계 정의가 중요' },
      { id: 2, question: '상태함수와 경로함수의 차이점은?', answer: '상태함수는 현재 상태에만 의존(T,P,V), 경로함수는 변화 과정에 의존(일, 열)한다.', explanation: 'U,H,S,G는 상태함수' },
      { id: 3, question: '강도성 성질과 크기성 성질을 구분하시오.', answer: '강도성(T,P,밀도)은 양에 무관, 크기성(V,m,U)은 양에 비례한다.', explanation: '강도성÷크기성=강도성' },
      { id: 4, question: '이상기체의 정의와 특성은?', answer: '분자 간 인력이 없고 분자 자체 부피가 없으며 PV=nRT를 따른다.', explanation: '저압, 고온에서 실제기체가 근사' }
    ],
    1: [
      { id: 5, question: '열역학 제0법칙의 내용은?', answer: 'A와 C, B와 C가 열평형이면 A와 B도 열평형이다. 온도 측정의 기초.', explanation: '열평형의 전이성' },
      { id: 6, question: '열역학 제1법칙을 수식으로 표현하시오.', answer: 'ΔU = Q - W, 에너지 보존법칙으로 내부에너지 변화는 열과 일의 합이다.', explanation: '폐쇄계에서 적용' },
      { id: 7, question: '열역학 제2법칙의 Clausius 표현은?', answer: '열은 저온에서 고온으로 자발적으로 흐르지 않는다.', explanation: '열기관 효율 한계 설명' },
      { id: 8, question: '열역학 제3법칙과 절대영도의 관계는?', answer: '완전결정의 절대영도에서 엔트로피는 0이다.', explanation: '절대 엔트로피 계산 기준' },
      { id: 9, question: '엔탈피(H)의 정의와 활용은?', answer: 'H = U + PV, 등압과정에서 열량 변화를 나타낸다.', explanation: '화학반응열 계산에 사용' }
    ],
    2: [
      { id: 10, question: '이상기체 상태방정식은?', answer: 'PV = nRT, R은 기체상수 8.314 J/(mol·K)', explanation: '모든 이상기체에 적용' },
      { id: 11, question: 'Van der Waals 상태방정식의 의미는?', answer: '(P + a/V²)(V-b) = RT, a는 분자간 인력, b는 분자 부피 보정', explanation: '실제기체 거동 설명' },
      { id: 12, question: '압축인자(Z)의 의미와 값의 해석은?', answer: 'Z = PV/RT, Z=1이면 이상기체, Z<1이면 인력 우세, Z>1이면 부피 효과 우세', explanation: '실제기체 이상성 평가' },
      { id: 13, question: '임계점의 정의와 특성은?', answer: '기체와 액체의 구별이 없어지는 점, 임계온도 이상에서는 액화 불가', explanation: 'Tc, Pc, Vc로 정의' },
      { id: 14, question: '환산상태의 원리는?', answer: '환산온도(Tr=T/Tc), 환산압력(Pr=P/Pc)이 같으면 모든 기체가 비슷한 거동', explanation: '일반화 상관식의 기초' }
    ],
    3: [
      { id: 15, question: '정적열용량(Cv)과 정압열용량(Cp)의 관계는?', answer: 'Cp - Cv = R (이상기체), Cp/Cv = γ (비열비)', explanation: '이상기체에서 성립' },
      { id: 16, question: 'Joule-Thomson 효과란?', answer: '단열 교축 팽창시 온도 변화 현상, 대부분 기체는 냉각된다.', explanation: '냉동기 원리에 활용' },
      { id: 17, question: 'Gibbs 자유에너지의 정의와 의미는?', answer: 'G = H - TS, 등온등압에서 최대 비팽창일을 나타낸다.', explanation: '화학반응 자발성 판단' },
      { id: 18, question: 'Helmholtz 자유에너지(A)의 용도는?', answer: 'A = U - TS, 등온등적에서 최대일을 나타낸다.', explanation: '상태방정식 유도에 활용' }
    ],
    4: [
      { id: 19, question: '상률(Phase Rule)을 설명하시오.', answer: 'F = C - P + 2, 자유도 = 성분수 - 상수 + 2', explanation: 'Gibbs 상률' },
      { id: 20, question: 'Raoult 법칙의 내용은?', answer: '이상용액에서 성분의 부분압 = 순수성분 증기압 × 몰분율', explanation: '이상용액 증기압 계산' },
      { id: 21, question: 'Henry 법칙은 언제 적용되는가?', answer: '묽은 용액에서 용질의 용해도는 기체상 분압에 비례한다.', explanation: '기체 용해도 계산' },
      { id: 22, question: '공비점(Azeotrope)이란?', answer: '기액 조성이 같아져 증류로 분리 불가능한 혼합물', explanation: '특수증류 필요' }
    ],
    5: [
      { id: 23, question: '화학평형상수(K)의 의미는?', answer: '평형에서 생성물과 반응물의 농도비, 온도에만 의존한다.', explanation: 'K = exp(-ΔG°/RT)' },
      { id: 24, question: 'Le Chatelier 원리를 설명하시오.', answer: '평형계에 변화를 주면 그 변화를 상쇄하는 방향으로 평형이 이동한다.', explanation: '압력, 온도, 농도 변화 적용' },
      { id: 25, question: '반응의 자유에너지 변화(ΔG)와 평형의 관계는?', answer: 'ΔG < 0이면 정반응 자발, ΔG = 0이면 평형, ΔG > 0이면 역반응 자발', explanation: '반응 방향 예측' }
    ],
    6: [
      { id: 26, question: 'Carnot 사이클의 효율은?', answer: 'η = 1 - Tc/Th, 이론적 최대 열효율', explanation: '가역 사이클의 효율' },
      { id: 27, question: '냉동기의 성능계수(COP)는?', answer: 'COP = Qc/W = Tc/(Th-Tc), 냉동 효과와 일의 비', explanation: '냉동기 성능 평가' },
      { id: 28, question: 'Rankine 사이클의 구성요소는?', answer: '보일러, 터빈, 응축기, 펌프로 구성된 증기동력 사이클', explanation: '발전소 기본 사이클' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`화공기사 화공열역학 관련 질문입니다:\n\n${question}\n\n이에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-red-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/chemistry" className="hover:text-white">화학·환경</Link><span>/</span>
            <Link href="/category/chemistry/chemical-engineer" className="hover:text-white">화공기사</Link><span>/</span>
            <span className="text-white">화공열역학</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">🔥 화공열역학</h1>
          <p className="text-red-100">열역학 법칙, 상평형, 화학평형</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-red-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
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
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-orange-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-orange-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-orange-50 rounded-lg"><p className="font-medium text-orange-900">✅ 정답</p><p className="text-orange-800 mt-1">{q.answer}</p></div>
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
