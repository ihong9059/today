'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UnitOperationsStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '유체역학', icon: '💧' },
    { id: 1, name: '열전달', icon: '🔥' },
    { id: 2, name: '물질전달', icon: '🌫️' },
    { id: 3, name: '증류', icon: '⚗️' },
    { id: 4, name: '흡수/추출', icon: '🧪' },
    { id: 5, name: '건조/증발', icon: '☀️' },
    { id: 6, name: '분리공정', icon: '🔬' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: 'Bernoulli 방정식의 의미는?', answer: 'P/ρ + V²/2 + gz = const, 이상유체의 에너지 보존 법칙', explanation: '압력, 속도, 위치 에너지 합' },
      { id: 2, question: 'Reynolds 수의 의미와 층류/난류 판정 기준은?', answer: 'Re = ρVD/μ, 원관에서 Re<2100 층류, Re>4000 난류', explanation: '관성력/점성력 비' },
      { id: 3, question: 'Darcy-Weisbach 식의 마찰손실 계산법은?', answer: 'hf = f(L/D)(V²/2g), f는 마찰계수, Moody 선도로 결정', explanation: '관내 압력손실 계산' },
      { id: 4, question: '펌프의 NPSH란?', answer: 'Net Positive Suction Head, 펌프 흡입측 유효수두로 캐비테이션 방지 기준', explanation: 'NPSHa > NPSHr 필요' }
    ],
    1: [
      { id: 5, question: '전도, 대류, 복사의 특징을 비교하시오.', answer: '전도: 분자운동, 대류: 유체흐름, 복사: 전자기파로 열전달', explanation: '열전달 3가지 메커니즘' },
      { id: 6, question: 'Fourier 법칙은?', answer: 'q = -kA(dT/dx), 열유속은 온도구배와 열전도도에 비례', explanation: '전도 열전달 기본식' },
      { id: 7, question: 'Newton 냉각법칙은?', answer: 'q = hA(Ts-T∞), 대류 열전달량은 온도차와 열전달계수에 비례', explanation: '대류 열전달 기본식' },
      { id: 8, question: '열교환기의 LMTD란?', answer: '대수평균온도차, 병류·향류에서 열교환 계산에 사용', explanation: 'ΔTlm = (ΔT1-ΔT2)/ln(ΔT1/ΔT2)' },
      { id: 9, question: 'NTU 방법의 장점은?', answer: '출구온도를 모를 때 열교환기 설계에 유용, 효율 ε 사용', explanation: 'NTU = UA/Cmin' }
    ],
    2: [
      { id: 10, question: 'Fick 확산법칙은?', answer: 'JA = -DAB(dCA/dx), 확산플럭스는 농도구배에 비례', explanation: '분자확산 기본식' },
      { id: 11, question: '물질전달계수(kc)의 의미는?', answer: 'NA = kc(CA-CAi), 대류 물질전달 속도 결정', explanation: '열전달의 h에 대응' },
      { id: 12, question: 'Schmidt 수의 정의와 의미는?', answer: 'Sc = μ/(ρDAB) = ν/DAB, 운동량 확산/물질 확산 비', explanation: 'Pr 수의 물질전달 대응' },
      { id: 13, question: 'Sherwood 수란?', answer: 'Sh = kcL/DAB, 대류/분자 물질전달 비', explanation: 'Nu 수의 물질전달 대응' }
    ],
    3: [
      { id: 14, question: '상대휘발도(α)의 정의는?', answer: 'α = (yA/xA)/(yB/xB), 두 성분의 분리 용이성 척도', explanation: 'α>1이면 A가 더 휘발성' },
      { id: 15, question: 'McCabe-Thiele 도법의 원리는?', answer: '기액평형선과 조작선을 이용해 이론단수를 계단작도로 결정', explanation: '등몰증류 가정' },
      { id: 16, question: '환류비(R)가 증류에 미치는 영향은?', answer: 'R↑: 분리 향상, 단수 감소, 에너지 비용 증가', explanation: 'R = L/D' },
      { id: 17, question: '최소환류비(Rmin)와 총환류의 관계는?', answer: 'Rmin: 무한 단수 필요, 총환류: 최소 단수, D=0', explanation: '경제적 R = 1.2~1.5 Rmin' }
    ],
    4: [
      { id: 18, question: '흡수탑에서 HTU와 NTU의 의미는?', answer: 'HTU: 이동단위높이, NTU: 이동단위수, H = HTU × NTU', explanation: '충전탑 높이 계산' },
      { id: 19, question: '추출에서 분배계수(K)란?', answer: 'K = 추출상 농도/라피네이트상 농도, 용질의 상간 분배', explanation: 'K↑이면 추출 용이' },
      { id: 20, question: '단추출과 다단향류추출의 차이는?', answer: '다단향류는 용매 효율 증가, 추출률 향상', explanation: '용매량 절감 효과' }
    ],
    5: [
      { id: 21, question: '건조에서 한계함수율이란?', answer: '항율건조기간에서 감률건조기간으로 전환되는 함수율', explanation: '표면 수분 증발 완료 시점' },
      { id: 22, question: '증발기의 종류와 특징은?', answer: '자연순환형, 강제순환형, 박막형, 다중효용 증발기', explanation: '용도에 따라 선택' },
      { id: 23, question: '다중효용 증발의 장점은?', answer: '증기 경제성 향상, 단위 증발량당 증기 소모량 감소', explanation: 'n효용시 증기경제성≈n' }
    ],
    6: [
      { id: 24, question: '결정화의 원리는?', answer: '과포화 상태에서 핵 생성 후 결정 성장', explanation: '냉각, 증발, 반응 결정화' },
      { id: 25, question: '막분리 공정의 종류는?', answer: 'MF, UF, NF, RO, 기체분리막, 투과증발', explanation: '분리막 기공크기 차이' },
      { id: 26, question: '침강속도에 영향을 주는 인자는?', answer: '입자크기, 밀도차, 유체점도, 중력가속도', explanation: 'Stokes 법칙 적용' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`화공기사 단위조작 관련 질문입니다:\n\n${question}\n\n이에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/chemistry" className="hover:text-white">화학·환경</Link><span>/</span>
            <Link href="/category/chemistry/chemical-engineer" className="hover:text-white">화공기사</Link><span>/</span>
            <span className="text-white">단위조작</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">⚙️ 단위조작</h1>
          <p className="text-blue-100">유체역학, 열전달, 물질전달, 분리공정</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-blue-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
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
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-blue-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg"><p className="font-medium text-blue-900">✅ 정답</p><p className="text-blue-800 mt-1">{q.answer}</p></div>
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
