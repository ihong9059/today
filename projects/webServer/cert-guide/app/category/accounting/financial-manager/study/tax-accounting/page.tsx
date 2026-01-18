'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TaxAccountingStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '세법총론', icon: '📖' },
    { id: 1, name: '부가가치세', icon: '🏷️' },
    { id: 2, name: '소득세', icon: '👤' },
    { id: 3, name: '법인세', icon: '🏢' },
    { id: 4, name: '원천징수', icon: '💳' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '조세의 3대 원칙은?', answer: '공평의 원칙, 중립의 원칙, 간소화 원칙', explanation: '헌법상 조세법률주의' },
      { id: 2, question: '국세와 지방세의 구분은?', answer: '국세: 소득세, 법인세, 부가세 등. 지방세: 취득세, 재산세, 자동차세 등', explanation: '징수권한에 따른 구분' },
      { id: 3, question: '납세의무 성립시기는?', answer: '소득세/법인세: 과세기간 종료일, 부가세: 과세기간 종료일', explanation: '성립→확정→소멸 단계' },
      { id: 4, question: '가산세의 종류는?', answer: '무신고가산세, 과소신고가산세, 납부불성실가산세, 원천징수납부불성실가산세', explanation: '세법 위반에 대한 제재' }
    ],
    1: [
      { id: 5, question: '부가가치세 과세대상은?', answer: '재화 또는 용역의 공급, 재화의 수입', explanation: '사업자가 공급하는 경우' },
      { id: 6, question: '영세율과 면세의 차이는?', answer: '영세율: 세율 0%, 매입세액 공제 가능. 면세: 과세 제외, 매입세액 불공제', explanation: '수출, 국외용역 등은 영세율' },
      { id: 7, question: '부가세 신고기한은?', answer: '1기 확정: 7.25, 2기 확정: 1.25, 예정신고: 각 분기 말일 25일', explanation: '법인/개인 동일' },
      { id: 8, question: '세금계산서 필수 기재사항은?', answer: '공급자/공급받는자 사업자등록번호, 공급가액, 세액, 작성일자', explanation: '전자세금계산서 의무발급' },
      { id: 9, question: '매입세액 불공제 항목은?', answer: '비영업용 소형승용차, 접대비, 면세사업 관련, 사업과 무관한 지출', explanation: '개인적 소비 관련 불공제' }
    ],
    2: [
      { id: 10, question: '종합소득의 종류는?', answer: '이자, 배당, 사업, 근로, 연금, 기타소득', explanation: '6가지 소득 합산' },
      { id: 11, question: '근로소득 연말정산 공제항목은?', answer: '인적공제, 연금보험료, 특별공제(의료비, 교육비, 신용카드 등)', explanation: '과세표준 계산 전 공제' },
      { id: 12, question: '종합소득세 세율은?', answer: '6%~45% 8단계 초과누진세율', explanation: '1,200만원 이하 6%' },
      { id: 13, question: '분리과세 대상 소득은?', answer: '일용근로소득, 2천만원 이하 금융소득, 주택임대소득 2천만원 이하', explanation: '종합과세 제외 분리과세' },
      { id: 14, question: '소득세 신고납부 기한은?', answer: '5월 1일~5월 31일, 성실신고확인대상자는 6월 30일', explanation: '종합소득 확정신고' }
    ],
    3: [
      { id: 15, question: '법인세 과세표준 계산구조는?', answer: '각 사업연도 소득 = 익금 - 손금', explanation: '결산서상 당기순이익에서 시작' },
      { id: 16, question: '익금산입/불산입 항목은?', answer: '익금산입: 세법상 수익, 익금불산입: 법인세환급, 이월결손금', explanation: '세무조정 가산항목' },
      { id: 17, question: '손금산입/불산입 항목은?', answer: '손금불산입: 법인세, 벌금, 과태료, 접대비 한도초과', explanation: '세무조정 차감항목' },
      { id: 18, question: '법인세 세율은?', answer: '2억 이하 9%, 2~200억 19%, 200~3000억 21%, 3000억 초과 24%', explanation: '4단계 초과누진세율' },
      { id: 19, question: '법인세 신고납부 기한은?', answer: '사업연도 종료일로부터 3개월 이내', explanation: '12월 법인은 3월 말' }
    ],
    4: [
      { id: 20, question: '원천징수 대상 소득은?', answer: '이자, 배당, 근로, 퇴직, 기타소득, 사업소득 일부', explanation: '소득 지급시 세금 선공제' },
      { id: 21, question: '근로소득 원천징수 방법은?', answer: '간이세액표에 따라 매월 원천징수, 연말정산으로 정산', explanation: '급여 지급시 원천징수' },
      { id: 22, question: '원천징수 납부기한은?', answer: '원천징수일이 속하는 달의 다음 달 10일까지', explanation: '반기납부 특례 가능' },
      { id: 23, question: '지급명세서 제출기한은?', answer: '근로소득: 다음연도 3월 10일, 이자배당: 2월 말', explanation: '소득자별 지급내역 신고' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`재경관리사 세무회계 관련 질문입니다:\n\n${question}\n\n이에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-emerald-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/accounting" className="hover:text-white">회계·세무</Link><span>/</span>
            <Link href="/category/accounting/financial-manager" className="hover:text-white">재경관리사</Link><span>/</span>
            <span className="text-white">세무회계</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">📋 세무회계</h1>
          <p className="text-emerald-100">부가세, 소득세, 법인세</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-emerald-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
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
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-emerald-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-emerald-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-emerald-50 rounded-lg"><p className="font-medium text-emerald-900">✅ 정답</p><p className="text-emerald-800 mt-1">{q.answer}</p></div>
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
