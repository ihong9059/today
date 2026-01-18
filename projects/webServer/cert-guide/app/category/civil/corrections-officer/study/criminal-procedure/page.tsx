'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function CriminalProcedurePage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('correction-procedure-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('correction-procedure-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basic', title: '형사소송법 총론', icon: '📚', questions: ['형사소송법의 목적과 기본이념을 설명하시오.', '형사소송의 기본구조(소송주체)를 설명하시오.', '적법절차의 원칙에 대해 설명하시오.', '무죄추정의 원칙에 대해 설명하시오.', '신속한 재판을 받을 권리를 설명하시오.', '형사소송법의 적용범위를 설명하시오.', '형사소송의 절차적 구조를 설명하시오.', '형사소송에서 소송행위의 개념을 설명하시오.', '소송조건과 소송장애사유를 설명하시오.', '형사소송에서 기간의 계산을 설명하시오.']},
    { id: 'investigation', title: '수사', icon: '🔍', questions: ['수사의 개념과 구조를 설명하시오.', '수사의 단서(고소, 고발, 자수)를 설명하시오.', '임의수사와 강제수사를 비교하시오.', '피의자의 권리(진술거부권 등)를 설명하시오.', '변호인의 접견교통권을 설명하시오.', '체포의 유형과 요건을 설명하시오.', '구속의 요건과 절차를 설명하시오.', '압수·수색의 요건과 절차를 설명하시오.', '검증과 감정의 차이를 설명하시오.', '수사의 종결(기소, 불기소)을 설명하시오.']},
    { id: 'prosecution', title: '공소', icon: '⚖️', questions: ['공소의 개념과 기능을 설명하시오.', '공소제기의 기본원칙을 설명하시오.', '기소독점주의와 기소편의주의를 설명하시오.', '공소시효의 개념과 기간을 설명하시오.', '공소시효의 정지와 소급을 설명하시오.', '공소장일본주의를 설명하시오.', '공소사실의 동일성을 설명하시오.', '공소장변경의 요건과 절차를 설명하시오.', '공소취소의 요건과 효력을 설명하시오.', '재정신청제도에 대해 설명하시오.']},
    { id: 'trial', title: '공판', icon: '🏛️', questions: ['공판절차의 기본원칙을 설명하시오.', '공판준비절차를 설명하시오.', '공판기일의 절차를 설명하시오.', '증인신문의 방법과 절차를 설명하시오.', '피고인신문의 방법을 설명하시오.', '공판조서의 증거능력을 설명하시오.', '간이공판절차를 설명하시오.', '약식절차와 즉결심판을 비교하시오.', '배심재판의 특성을 설명하시오.', '판결의 선고와 효력을 설명하시오.']},
    { id: 'evidence', title: '증거·상소', icon: '📋', questions: ['증거의 의의와 종류를 설명하시오.', '증거재판주의의 내용을 설명하시오.', '자유심증주의의 내용을 설명하시오.', '위법수집증거배제법칙을 설명하시오.', '자백의 증거능력을 설명하시오.', '전문법칙과 예외를 설명하시오.', '상소제도의 종류를 설명하시오.', '항소심의 구조와 심판범위를 설명하시오.', '상고이유와 심판범위를 설명하시오.', '재심제도에 대해 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-zinc-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/civil/corrections-officer" className="text-slate-600 hover:text-slate-800 flex items-center gap-2">← 교정직 공무원으로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-zinc-700 rounded-2xl flex items-center justify-center text-3xl">⚖️</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">형사소송법</h1><p className="text-gray-600">수사, 공판, 증거, 상소</p></div>
            <div className="text-right"><p className="text-sm text-gray-500">진행률</p><p className="text-2xl font-bold text-slate-600">{completedCount}/{totalQuestions}</p></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-slate-600 to-zinc-700 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} /></div>
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
                {expandedTopics[topic.id] && (<div className="px-6 pb-6 space-y-3">{topic.questions.map((question, idx) => { const isCompleted = completedQuestions[`${topic.id}-${idx}`]; return (<div key={idx} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'border-slate-300 bg-slate-50' : 'border-gray-200 hover:border-slate-300'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, idx)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'border-slate-500 bg-slate-500 text-white' : 'border-gray-300 hover:border-slate-400'}`}>{isCompleted && '✓'}</button><div className="flex-1"><p className={`${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>{idx + 1}. {question}</p><button onClick={() => handleAIClick(question)} className="mt-2 text-sm text-slate-600 hover:text-slate-800 font-medium">🤖 AI에게 물어보기</button></div></div></div>); })}</div>)}
              </div>
            );
          })}
        </div>
        <div className="mt-8 bg-slate-50 rounded-2xl p-6"><h3 className="font-bold text-slate-800 mb-3">📖 형사소송법 학습 가이드</h3><ul className="text-sm text-slate-700 space-y-2"><li>• 수사절차와 공판절차 흐름 이해</li><li>• 체포·구속 요건과 절차 철저히 학습</li><li>• 증거법(전문법칙, 위법수집증거) 중점</li><li>• 대법원 판례 숙지 필수</li><li>• 최신 개정 내용 확인</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 교정직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 교정직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 교정직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
