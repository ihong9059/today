'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CostAccountingStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '원가개념', icon: '📖' },
    { id: 1, name: '원가배분', icon: '📊' },
    { id: 2, name: '개별원가계산', icon: '🔢' },
    { id: 3, name: '종합원가계산', icon: '🏭' },
    { id: 4, name: 'CVP분석', icon: '📈' },
    { id: 5, name: '예산/성과평가', icon: '🎯' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '원가의 3요소는?', answer: '직접재료비, 직접노무비, 제조간접비', explanation: '제조원가의 구성요소' },
      { id: 2, question: '변동비와 고정비의 구분은?', answer: '변동비: 조업도에 비례 변동, 고정비: 조업도와 무관하게 일정', explanation: '원가행태에 따른 분류' },
      { id: 3, question: '기회원가의 개념은?', answer: '특정 대안 선택시 포기한 차선의 대안에서 얻을 수 있었던 이익', explanation: '의사결정에 활용' },
      { id: 4, question: '매몰원가란?', answer: '과거에 이미 발생하여 현재 의사결정에 영향을 미치지 않는 원가', explanation: '의사결정시 제외' }
    ],
    1: [
      { id: 5, question: '제조간접비 배부기준은?', answer: '직접노동시간, 기계시간, 직접노무비, 직접재료비 등', explanation: '원가동인 기준 배부' },
      { id: 6, question: '정상원가계산과 실제원가계산의 차이는?', answer: '정상: 예정배부율 사용, 실제: 실제배부율 사용', explanation: '실무에서는 정상원가 주로 사용' },
      { id: 7, question: '배부차이 처리방법은?', answer: '매출원가 조정법, 재고자산비례법, 이론적 방법', explanation: '예정배부율과 실제 차이' },
      { id: 8, question: '활동기준원가계산(ABC)의 장점은?', answer: '원가동인에 따른 정확한 배부, 제조간접비 비중 높을 때 유용', explanation: '전통적 원가계산의 한계 극복' }
    ],
    2: [
      { id: 9, question: '개별원가계산의 적용 업종은?', answer: '조선업, 건설업, 인쇄업 등 주문생산 업종', explanation: '작업지시서별 원가집계' },
      { id: 10, question: '작업원가표의 구성요소는?', answer: '직접재료비, 직접노무비, 제조간접비(배부액)', explanation: '개별 작업별 원가 기록' },
      { id: 11, question: '개별원가계산의 원가흐름은?', answer: '재료→재공품→제품→매출원가', explanation: '작업지시서 기준 추적' }
    ],
    3: [
      { id: 12, question: '종합원가계산의 적용 업종은?', answer: '화학, 식품, 정유업 등 연속대량생산 업종', explanation: '공정별 평균원가 계산' },
      { id: 13, question: '완성품환산량의 계산법은?', answer: '완성품환산량 = 완성품수량 + (기말재공품수량 × 완성도)', explanation: '가중평균법, 선입선출법' },
      { id: 14, question: '정상공손과 비정상공손의 처리는?', answer: '정상공손: 완성품원가에 포함, 비정상공손: 당기비용 처리', explanation: '품질관리 기준 구분' },
      { id: 15, question: '연산품원가계산 방법은?', answer: '물량기준법, 판매가치법, 순실현가치법, 균등이익률법', explanation: '결합원가 배분 방법' }
    ],
    4: [
      { id: 16, question: 'CVP분석의 가정은?', answer: '원가를 변동비/고정비로 구분, 단일제품, 선형관계', explanation: 'Cost-Volume-Profit' },
      { id: 17, question: '손익분기점 계산공식은?', answer: 'BEP수량 = 고정비 / (판매단가 - 변동비단가)', explanation: '공헌이익으로 고정비 회수' },
      { id: 18, question: '공헌이익률의 의미는?', answer: '공헌이익률 = 공헌이익 / 매출액, 매출 1원당 고정비 회수액', explanation: '손익분기매출 = 고정비/공헌이익률' },
      { id: 19, question: '안전한계율의 의미는?', answer: '(현재매출-손익분기매출)/현재매출, 매출 감소 여유율', explanation: '영업위험 측정 지표' },
      { id: 20, question: '영업레버리지의 의미는?', answer: '공헌이익/영업이익, 매출변화에 대한 영업이익 민감도', explanation: '고정비 비중 높을수록 큼' }
    ],
    5: [
      { id: 21, question: '예산의 종류는?', answer: '고정예산, 변동예산, 탄력적 예산, 영기준예산', explanation: '조업도 변동 반영 여부' },
      { id: 22, question: '표준원가와 예산의 차이는?', answer: '표준원가: 단위당 기준원가, 예산: 총액기준 계획', explanation: '단위 vs 총액' },
      { id: 23, question: '재료원가차이 분석은?', answer: '가격차이 = (실제가격-표준가격)×실제수량, 능률차이 = (실제수량-표준수량)×표준가격', explanation: '2분법 분석' },
      { id: 24, question: '제조간접비 차이분석은?', answer: '예산차이(소비차이), 능률차이, 조업도차이로 분석', explanation: '3분법, 4분법 분석' },
      { id: 25, question: '책임회계제도란?', answer: '성과평가를 위해 조직을 원가중심점, 이익중심점, 투자중심점으로 구분', explanation: '통제가능성 기준 평가' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`재경관리사 원가관리회계 관련 질문입니다:\n\n${question}\n\n이에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-amber-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/agriculture" className="hover:text-white">농림·축산</Link><span>/</span>
            <Link href="/category/agriculture/financial-manager" className="hover:text-white">재경관리사</Link><span>/</span>
            <span className="text-white">원가관리회계</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">💰 원가관리회계</h1>
          <p className="text-amber-100">원가계산, 관리회계, CVP분석</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-amber-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
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
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-amber-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-amber-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-amber-50 rounded-lg"><p className="font-medium text-amber-900">✅ 정답</p><p className="text-amber-800 mt-1">{q.answer}</p></div>
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
