'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FinancialAccountingStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '회계원리', icon: '📖' },
    { id: 1, name: '재무제표', icon: '📊' },
    { id: 2, name: '자산회계', icon: '🏦' },
    { id: 3, name: '부채회계', icon: '💳' },
    { id: 4, name: '자본회계', icon: '💰' },
    { id: 5, name: '수익/비용', icon: '📈' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '회계의 기본 가정 4가지는?', answer: '기업실체, 계속기업, 화폐단위, 기간별 보고', explanation: '재무보고의 기본 전제조건' },
      { id: 2, question: '발생주의와 현금주의의 차이점은?', answer: '발생주의: 거래 발생 시점, 현금주의: 현금 수수 시점에 인식', explanation: '기업회계는 발생주의 원칙' },
      { id: 3, question: '복식부기의 원리는?', answer: '모든 거래를 차변과 대변에 동시 기록, 차변합계=대변합계', explanation: '자기검증 기능 보유' },
      { id: 4, question: '재무제표의 질적 특성은?', answer: '목적적합성, 충실한 표현, 비교가능성, 검증가능성, 적시성, 이해가능성', explanation: '유용한 재무정보의 특성' }
    ],
    1: [
      { id: 5, question: '재무상태표의 구성요소는?', answer: '자산, 부채, 자본. 자산=부채+자본의 등식 성립', explanation: '일정 시점의 재무상태' },
      { id: 6, question: '손익계산서의 구성요소는?', answer: '수익, 비용, 이익. 수익-비용=순이익', explanation: '일정 기간의 경영성과' },
      { id: 7, question: '현금흐름표의 3가지 활동은?', answer: '영업활동, 투자활동, 재무활동', explanation: '현금의 유입과 유출 분류' },
      { id: 8, question: '자본변동표의 역할은?', answer: '자본의 변동내역을 항목별로 표시, 이익잉여금처분계산서 포함', explanation: '자본 구성요소의 변동' },
      { id: 9, question: 'K-IFRS와 K-GAAP의 차이는?', answer: 'K-IFRS: 원칙중심, 공정가치 중시. K-GAAP: 규정중심, 역사적원가 중시', explanation: '상장기업은 K-IFRS 적용' }
    ],
    2: [
      { id: 10, question: '유동자산의 분류 기준은?', answer: '1년 이내 현금화 가능 또는 정상영업주기 내 실현', explanation: '당좌자산+재고자산' },
      { id: 11, question: '매출채권의 대손 회계처리는?', answer: '대손충당금 설정(비용), 실제 대손 발생시 대손충당금 차감', explanation: '충당금 설정법 vs 직접차감법' },
      { id: 12, question: '재고자산 평가방법은?', answer: '선입선출법, 후입선출법(IFRS 불허), 평균법, 개별법', explanation: '원가흐름 가정에 따라 선택' },
      { id: 13, question: '유형자산의 감가상각 방법은?', answer: '정액법, 정률법, 생산량비례법, 연수합계법', explanation: '내용연수 동안 체계적 배분' },
      { id: 14, question: '무형자산의 인식요건은?', answer: '식별가능성, 자원에 대한 통제, 미래경제적효익 존재', explanation: '영업권은 내부창출 불가' }
    ],
    3: [
      { id: 15, question: '유동부채와 비유동부채의 구분은?', answer: '1년 기준 또는 정상영업주기 기준으로 구분', explanation: '지급능력 평가에 중요' },
      { id: 16, question: '충당부채의 인식요건은?', answer: '현재의무 존재, 자원유출 가능성 높음, 금액의 신뢰성 있는 추정', explanation: '제품보증충당부채 등' },
      { id: 17, question: '사채할인발행의 회계처리는?', answer: '사채할인발행차금을 부채 차감계정으로 표시, 유효이자율법으로 상각', explanation: '액면이자율<시장이자율' },
      { id: 18, question: '금융부채의 제거 요건은?', answer: '계약상 의무 소멸, 채무면제, 만기도래시', explanation: '실질적 조건 변경시 제거' }
    ],
    4: [
      { id: 19, question: '자본의 구성요소는?', answer: '자본금, 자본잉여금, 이익잉여금, 기타포괄손익누계액, 기타자본항목', explanation: '자본=순자산' },
      { id: 20, question: '자기주식의 회계처리는?', answer: '취득시 자본의 차감항목으로 표시, 처분시 자본잉여금 또는 이익잉여금', explanation: '자산으로 인식 불가' },
      { id: 21, question: '주식배당과 현금배당의 차이는?', answer: '주식배당: 자본금 증가, 현금배당: 현금 유출, 이익잉여금 감소', explanation: '주식배당은 자본 내 이동' },
      { id: 22, question: '기타포괄손익의 예시는?', answer: '매도가능금융자산평가손익, 재평가잉여금, 해외사업환산손익, 현금흐름위험회피손익', explanation: '당기손익 불포함 항목' }
    ],
    5: [
      { id: 23, question: '수익인식의 5단계 모형은?', answer: '1)계약식별 2)수행의무식별 3)거래가격결정 4)가격배분 5)수익인식', explanation: 'K-IFRS 1115 적용' },
      { id: 24, question: '건설계약 수익인식 방법은?', answer: '진행기준: 진행률에 따라 수익인식, 완성기준: 완성시 전액인식', explanation: '기간에 걸쳐 이행하는 의무' },
      { id: 25, question: '비용인식의 원칙은?', answer: '수익비용대응원칙: 수익과 관련 비용을 같은 기간에 인식', explanation: '기간비용, 제품원가 구분' },
      { id: 26, question: '법인세비용의 구성은?', answer: '당기법인세+이연법인세, 회계이익과 과세소득 차이 조정', explanation: '일시적 차이로 이연법인세 발생' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`재경관리사 재무회계 관련 질문입니다:\n\n${question}\n\n이에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-indigo-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/agriculture" className="hover:text-white">농림·축산</Link><span>/</span>
            <Link href="/category/agriculture/financial-manager" className="hover:text-white">재경관리사</Link><span>/</span>
            <span className="text-white">재무회계</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">📊 재무회계</h1>
          <p className="text-indigo-100">재무제표, 계정과목, 결산</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-indigo-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
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
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-indigo-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-indigo-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-indigo-50 rounded-lg"><p className="font-medium text-indigo-900">✅ 정답</p><p className="text-indigo-800 mt-1">{q.answer}</p></div>
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
