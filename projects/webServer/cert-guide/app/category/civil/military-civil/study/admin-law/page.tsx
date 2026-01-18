'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function MilitaryAdminLawPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('military-adminlaw-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('military-adminlaw-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'general', title: '행정법 총론', icon: '📚', questions: ['행정법의 의의와 특성을 설명하시오.', '법치행정의 원리를 설명하시오.', '행정법의 법원을 설명하시오.', '행정법의 일반원칙을 설명하시오.', '행정상 법률관계의 당사자를 설명하시오.', '공법관계와 사법관계의 구별을 설명하시오.', '행정법상 개인의 공권을 설명하시오.', '행정법 관계에서 사인의 지위를 설명하시오.', '특별권력관계론을 설명하시오.', '공물의 개념과 종류를 설명하시오.']},
    { id: 'act', title: '행정작용법', icon: '⚖️', questions: ['행정행위의 개념과 특성을 설명하시오.', '행정행위의 종류를 비교하시오.', '행정행위의 효력을 설명하시오.', '행정행위의 부관을 설명하시오.', '행정행위의 하자와 효과를 설명하시오.', '행정행위의 취소와 철회를 비교하시오.', '행정입법의 종류를 설명하시오.', '행정계획의 법적 성질을 설명하시오.', '공법상 계약을 설명하시오.', '행정지도의 개념과 한계를 설명하시오.']},
    { id: 'procedure', title: '행정절차', icon: '📋', questions: ['행정절차법의 적용범위를 설명하시오.', '처분절차를 설명하시오.', '청문의 의의와 절차를 설명하시오.', '공청회와 의견제출의 차이를 설명하시오.', '처분의 이유제시 의무를 설명하시오.', '행정예고의 의의와 절차를 설명하시오.', '행정상 입법예고제도를 설명하시오.', '행정절차의 하자와 처분의 효력을 설명하시오.', '정보공개제도의 의의를 설명하시오.', '개인정보보호의 원칙을 설명하시오.']},
    { id: 'enforcement', title: '행정의 실효성 확보', icon: '🔨', questions: ['행정강제의 의의와 종류를 설명하시오.', '행정대집행의 요건과 절차를 설명하시오.', '이행강제금제도를 설명하시오.', '직접강제의 의의와 한계를 설명하시오.', '행정상 즉시강제를 설명하시오.', '행정벌을 비교하시오.', '과징금 제도의 법적 성질을 설명하시오.', '가산세와 가산금을 비교하시오.', '명단공표의 법적 성질을 설명하시오.', '새로운 의무이행확보수단을 설명하시오.']},
    { id: 'remedy', title: '행정구제', icon: '🛡️', questions: ['행정심판의 종류와 청구요건을 설명하시오.', '행정심판과 행정소송의 관계를 설명하시오.', '취소소송의 소송요건을 설명하시오.', '처분성의 개념과 판단기준을 설명하시오.', '원고적격과 소의 이익을 설명하시오.', '취소소송의 판결 유형을 설명하시오.', '무효등확인소송의 요건을 설명하시오.', '당사자소송의 종류와 활용을 설명하시오.', '국가배상제도를 설명하시오.', '손실보상의 요건과 기준을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/civil/military-civil" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 군무원으로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">⚖️</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">행정법</h1><p className="text-gray-600">행정법총론, 행정작용, 행정구제</p></div>
            <div className="text-right"><p className="text-sm text-gray-500">진행률</p><p className="text-2xl font-bold text-green-600">{completedCount}/{totalQuestions}</p></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-green-600 to-emerald-700 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} /></div>
        </div>
        <div className="space-y-4">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter((_, idx) => completedQuestions[`${topic.id}-${idx}`]).length;
            return (
              <div key={topic.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button onClick={() => setExpandedTopics((prev) => ({ ...prev, [topic.id]: !prev[topic.id] }))} className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="flex items-center gap-4"><span className="text-2xl">{topic.icon}</span><div className="text-left"><h3 className="font-bold text-gray-800">{topic.title}</h3><p className="text-sm text-gray-500">{topicCompleted}/{topic.questions.length} 완료</p></div></div>
                  <span className={`transform transition ${expandedTopics[topic.id] ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {expandedTopics[topic.id] && (<div className="px-6 pb-6 space-y-3">{topic.questions.map((question, idx) => { const isCompleted = completedQuestions[`${topic.id}-${idx}`]; return (<div key={idx} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, idx)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 hover:border-green-400'}`}>{isCompleted && '✓'}</button><div className="flex-1"><p className={`${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>{idx + 1}. {question}</p><button onClick={() => handleAIClick(question)} className="mt-2 text-sm text-green-600 hover:text-green-800 font-medium">🤖 AI에게 물어보기</button></div></div></div>); })}</div>)}
              </div>
            );
          })}
        </div>
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 행정법 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 행정법 일반원칙과 행정행위 이론 철저히 학습</li><li>• 행정소송 관련 판례 숙지 필수</li><li>• 행정절차법 조문 정리</li><li>• 국가배상과 손실보상 비교 학습</li><li>• 최신 판례 동향 파악</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 군무원 9급 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 군무원 9급 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 군무원 9급 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
