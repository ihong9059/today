'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ReactionEngineeringStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '반응속도론', icon: '⏱️' },
    { id: 1, name: '회분식 반응기', icon: '🧪' },
    { id: 2, name: 'CSTR', icon: '🔄' },
    { id: 3, name: 'PFR', icon: '➡️' },
    { id: 4, name: '반응기 설계', icon: '📐' },
    { id: 5, name: '촉매반응', icon: '⚗️' },
    { id: 6, name: '비등온 반응', icon: '🌡️' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '반응속도식의 일반적인 형태는?', answer: '-rA = k·CA^n, k는 속도상수, n은 반응차수', explanation: '속도상수는 온도 의존' },
      { id: 2, question: 'Arrhenius 식의 의미는?', answer: 'k = A·exp(-Ea/RT), 온도에 따른 속도상수 변화', explanation: 'Ea: 활성화에너지' },
      { id: 3, question: '1차 반응의 반감기 특성은?', answer: 't1/2 = ln2/k = 0.693/k, 초기농도와 무관', explanation: '방사성 붕괴가 대표적' },
      { id: 4, question: '반응차수 결정법은?', answer: '적분법, 미분법, 반감기법, 초기속도법', explanation: '실험 데이터로 결정' }
    ],
    1: [
      { id: 5, question: '회분식 반응기의 설계방정식은?', answer: 't = NAo∫(dXA/-rA·V), 반응시간 계산', explanation: '일정부피 가정시 단순화' },
      { id: 6, question: '회분식 반응기의 장점은?', answer: '다품종 소량생산, 반응조건 변경 용이, 초기투자 저렴', explanation: '제약/정밀화학에 적합' },
      { id: 7, question: '회분식 반응기의 전환율 계산법은?', answer: 'XA = (NAo-NA)/NAo = (CAo-CA)/CAo (등몰)', explanation: '반응 진행도 표시' }
    ],
    2: [
      { id: 8, question: 'CSTR의 특성은?', answer: '완전혼합, 유출물=반응기 내부 조성 동일', explanation: 'Continuous Stirred Tank' },
      { id: 9, question: 'CSTR 설계방정식은?', answer: 'V/FAo = XA/(-rA), τ = CAo·XA/(-rA)', explanation: '공간시간 τ = V/v' },
      { id: 10, question: 'CSTR의 장점과 단점은?', answer: '장점: 온도조절 용이, 연속운전. 단점: 같은 전환율시 부피 큼', explanation: '발열반응에 유리' },
      { id: 11, question: '다단 CSTR의 효과는?', answer: 'n개 직렬시 PFR에 근접, 단수↑ 효율↑', explanation: '최적 단수 경제성 고려' }
    ],
    3: [
      { id: 12, question: 'PFR의 특성은?', answer: '플러그흐름, 농도구배 존재, 역혼합 없음', explanation: 'Plug Flow Reactor' },
      { id: 13, question: 'PFR 설계방정식은?', answer: 'V/FAo = ∫(dXA/-rA), 적분으로 부피 결정', explanation: '농도 변화 고려' },
      { id: 14, question: 'PFR과 CSTR 비교시 유리한 경우는?', answer: 'PFR: 1차 이상 반응, CSTR: 자기촉매반응', explanation: '반응속도-전환율 관계' },
      { id: 15, question: '공간시간(τ)과 공간속도(SV)의 관계는?', answer: 'τ = 1/SV = V/v, 반응기 크기와 유량 비', explanation: '체류시간 개념' }
    ],
    4: [
      { id: 16, question: '레벤스필 도표(Levenspiel plot)의 활용은?', answer: 'FAo/(-rA) vs XA 그래프로 최적 반응기 조합 결정', explanation: '면적이 반응기 부피' },
      { id: 17, question: '최적 반응기 배열 원칙은?', answer: 'CSTR은 고농도, PFR은 저농도에서 유리', explanation: 'n>0 반응 기준' },
      { id: 18, question: '순환반응기의 효과는?', answer: '순환비 R→∞면 CSTR 거동, R=0이면 PFR', explanation: '거동 조절 가능' },
      { id: 19, question: '선택도(Selectivity)의 정의는?', answer: 'S = 목적생성물량/부반응생성물량', explanation: '높을수록 유리' }
    ],
    5: [
      { id: 20, question: '촉매의 역할은?', answer: '활성화에너지 감소, 반응속도 증가, 평형 불변', explanation: '반응경로만 변경' },
      { id: 21, question: 'Langmuir-Hinshelwood 메커니즘은?', answer: '표면흡착 → 표면반응 → 탈착 단계', explanation: '불균일 촉매반응' },
      { id: 22, question: '촉매 비활성화 원인은?', answer: '피독(poisoning), 소결(sintering), 코킹(coking)', explanation: '촉매 수명 결정' },
      { id: 23, question: 'Thiele modulus(φ)의 의미는?', answer: '반응속도/확산속도 비, φ↑이면 확산제어', explanation: '유효계수 η 결정' }
    ],
    6: [
      { id: 24, question: '단열반응기에서 온도변화 예측은?', answer: 'ΔT = (-ΔHr)·XA·CAo/(ρ·Cp)', explanation: '발열: T↑, 흡열: T↓' },
      { id: 25, question: '열폭주(Runaway) 현상이란?', answer: '발열속도>방열속도시 온도 급상승, 위험', explanation: '제어시스템 필수' },
      { id: 26, question: '다관식 반응기의 장점은?', answer: '열교환 효율↑, 온도제어 용이', explanation: '고발열반응에 사용' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`화공기사 반응공학 관련 질문입니다:\n\n${question}\n\n이에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-green-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/chemistry" className="hover:text-white">화학·환경</Link><span>/</span>
            <Link href="/category/chemistry/chemical-engineer" className="hover:text-white">화공기사</Link><span>/</span>
            <span className="text-white">반응공학</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">⚗️ 반응공학</h1>
          <p className="text-green-100">반응속도론, 반응기 설계, 촉매반응</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-green-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
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
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-green-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-green-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg"><p className="font-medium text-green-900">✅ 정답</p><p className="text-green-800 mt-1">{q.answer}</p></div>
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
