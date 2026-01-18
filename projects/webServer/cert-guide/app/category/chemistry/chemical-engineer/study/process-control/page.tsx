'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProcessControlStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '제어기초', icon: '📐' },
    { id: 1, name: '라플라스변환', icon: '∫' },
    { id: 2, name: '전달함수', icon: '📊' },
    { id: 3, name: 'PID 제어', icon: '🎛️' },
    { id: 4, name: '안정성 분석', icon: '⚖️' },
    { id: 5, name: '고급제어', icon: '🔧' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '피드백 제어의 기본 구성요소는?', answer: '측정요소, 제어기, 조절요소, 공정으로 구성된 폐루프 시스템', explanation: '오차를 줄이는 방향으로 작동' },
      { id: 2, question: '피드포워드 제어의 장점은?', answer: '외란 발생 전 보정, 빠른 응답, 피드백과 병용시 효과적', explanation: '외란 측정 필요' },
      { id: 3, question: '조절변수, 측정변수, 외란의 정의는?', answer: '조절변수: 제어기가 조작, 측정변수: 센서가 감지, 외란: 공정 교란 요인', explanation: '제어루프 구성요소' },
      { id: 4, question: '제어계의 시간상수(τ)란?', answer: '1차계에서 최종값의 63.2%에 도달하는 시간', explanation: '응답속도 지표' }
    ],
    1: [
      { id: 5, question: '라플라스변환의 정의는?', answer: 'L{f(t)} = ∫₀^∞ f(t)e^(-st)dt = F(s)', explanation: '시간영역→주파수영역' },
      { id: 6, question: '단위계단함수의 라플라스변환은?', answer: 'L{u(t)} = 1/s', explanation: '가장 기본적인 변환' },
      { id: 7, question: '지연시간의 라플라스변환은?', answer: 'L{f(t-θ)} = e^(-θs)·F(s)', explanation: '순수지연 표현' },
      { id: 8, question: '미분의 라플라스변환은?', answer: 'L{df/dt} = sF(s) - f(0)', explanation: '초기조건 포함' },
      { id: 9, question: '최종값 정리란?', answer: 'lim(t→∞)f(t) = lim(s→0)sF(s)', explanation: '정상상태 값 예측' }
    ],
    2: [
      { id: 10, question: '1차 시스템의 전달함수는?', answer: 'G(s) = K/(τs+1), K는 이득, τ는 시간상수', explanation: '대부분 공정 근사' },
      { id: 11, question: '2차 시스템의 특성은?', answer: 'G(s) = K/(τ²s²+2ζτs+1), ζ<1 진동, ζ=1 임계감쇠', explanation: 'ζ: 감쇠비' },
      { id: 12, question: '공정이득(Kp)의 의미는?', answer: '입력변화에 대한 출력변화의 비, 정상상태 관계', explanation: 'Kp = Δy/Δu' },
      { id: 13, question: '순수지연(Dead time)의 영향은?', answer: '응답 지연, 제어 어려움 증가, 불안정성 야기', explanation: 'θ/τ↑ 제어 난이도↑' }
    ],
    3: [
      { id: 14, question: 'P 제어기의 특성은?', answer: 'u = Kc·e, 비례제어, 잔류편차(offset) 발생', explanation: 'Kc↑ 응답속도↑ 진동↑' },
      { id: 15, question: 'PI 제어기의 장점은?', answer: '적분작용으로 잔류편차 제거, 느린 응답', explanation: 'u = Kc(e + 1/τI∫edt)' },
      { id: 16, question: 'PID 제어기의 전달함수는?', answer: 'Gc(s) = Kc(1 + 1/τIs + τDs)', explanation: '비례+적분+미분' },
      { id: 17, question: 'Ziegler-Nichols 동조법이란?', answer: '임계이득(Ku)과 임계주기(Pu)로 PID 파라미터 결정', explanation: '실험적 동조법' },
      { id: 18, question: '적분 와인드업 현상이란?', answer: '조절변수 포화시 적분항 과적분으로 오버슈트 발생', explanation: 'Anti-windup 필요' }
    ],
    4: [
      { id: 19, question: 'Bode 안정도 판별법은?', answer: '이득여유(GM)>0dB, 위상여유(PM)>0°이면 안정', explanation: '주파수 응답 분석' },
      { id: 20, question: 'Routh 안정도 판별법의 원리는?', answer: 'Routh 배열에서 첫 번째 열의 부호변화 수 = 불안정근 수', explanation: '특성방정식 분석' },
      { id: 21, question: 'Nyquist 판별법이란?', answer: 'G(jω)H(jω)가 (-1,0)를 감싸는 횟수로 안정도 판별', explanation: '개루프 응답 이용' },
      { id: 22, question: '이득여유(GM)의 정의는?', answer: '위상이 -180°일 때 이득이 1까지 증가 가능한 비', explanation: 'GM = 1/|G(jωpc)|' }
    ],
    5: [
      { id: 23, question: '캐스케이드 제어의 원리는?', answer: '내부루프가 외란을 빠르게 제거, 외부루프가 설정치 추종', explanation: '2개 제어기 직렬' },
      { id: 24, question: '비율 제어의 적용 예는?', answer: '연료-공기비, 반응물비, 혼합비 제어', explanation: 'R = Y₁/Y₂ 일정' },
      { id: 25, question: '선택 제어(Override)란?', answer: '여러 제어기 중 조건에 따라 선택 작동', explanation: '안전한계 제어에 사용' },
      { id: 26, question: 'Smith 예측기의 원리는?', answer: '공정 모델로 지연시간 효과 예측 보상', explanation: '순수지연 극복' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`화공기사 공정제어 관련 질문입니다:\n\n${question}\n\n이에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-purple-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/chemistry" className="hover:text-white">화학·환경</Link><span>/</span>
            <Link href="/category/chemistry/chemical-engineer" className="hover:text-white">화공기사</Link><span>/</span>
            <span className="text-white">공정제어</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">📊 공정제어</h1>
          <p className="text-purple-100">제어시스템, PID제어, 안정성분석</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-purple-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
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
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-purple-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-purple-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-purple-50 rounded-lg"><p className="font-medium text-purple-900">✅ 정답</p><p className="text-purple-800 mt-1">{q.answer}</p></div>
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
