'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function WeedSciencePage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('plant-protection-weed-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('plant-protection-weed-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basic', title: '잡초 총론', icon: '🌿', questions: ['잡초의 정의와 특성을 설명하시오.', '잡초의 유해성과 유익성을 설명하시오.', '잡초의 생활형에 따른 분류를 설명하시오.', '일년생 잡초와 다년생 잡초를 비교하시오.', '잡초의 번식 방법을 설명하시오.', '잡초 종자의 휴면과 발아를 설명하시오.', '잡초 종자의 수명과 토양종자은행을 설명하시오.', '잡초의 경합 작용을 설명하시오.', '잡초의 타감작용을 설명하시오.', '잡초 군락의 천이를 설명하시오.']},
    { id: 'identification', title: '잡초 식별', icon: '🔍', questions: ['논잡초의 종류와 특성을 설명하시오.', '밭잡초의 종류와 특성을 설명하시오.', '과수원 잡초의 종류를 설명하시오.', '화본과 잡초의 특성을 설명하시오.', '광엽잡초의 특성을 설명하시오.', '사초과 잡초의 특성을 설명하시오.', '피의 생태와 방제를 설명하시오.', '물달개비의 생태와 방제를 설명하시오.', '바랭이의 생태와 방제를 설명하시오.', '명아주의 생태와 방제를 설명하시오.']},
    { id: 'herbicide', title: '제초제 총론', icon: '🧪', questions: ['제초제의 발달 역사를 설명하시오.', '제초제의 분류 방법을 설명하시오.', '선택성 제초제와 비선택성 제초제를 비교하시오.', '접촉형 제초제와 이행형 제초제를 비교하시오.', '제초제의 흡수와 이동을 설명하시오.', '제초제의 선택성 원리를 설명하시오.', '제초제 저항성의 발달을 설명하시오.', '제초제 저항성 잡초 관리를 설명하시오.', '제초제의 토양 잔류성을 설명하시오.', '제초제의 환경 영향을 설명하시오.']},
    { id: 'mechanism', title: '제초제 작용기작', icon: '⚗️', questions: ['광합성 억제형 제초제를 설명하시오.', '아미노산 합성 억제형 제초제를 설명하시오.', '세포분열 억제형 제초제를 설명하시오.', '호르몬형 제초제를 설명하시오.', '지방산 합성 억제형 제초제를 설명하시오.', '글리포세이트의 작용기작을 설명하시오.', '설포닐우레아계 제초제를 설명하시오.', '파라콰트의 작용기작을 설명하시오.', '제초제의 해독 기작을 설명하시오.', '작물안전제의 원리를 설명하시오.']},
    { id: 'management', title: '잡초 관리', icon: '🛡️', questions: ['예방적 잡초방제를 설명하시오.', '경종적 잡초방제를 설명하시오.', '기계적 잡초방제를 설명하시오.', '생물적 잡초방제를 설명하시오.', '화학적 잡초방제를 설명하시오.', '종합적 잡초관리(IWM)를 설명하시오.', '논 잡초 방제 체계를 설명하시오.', '밭 잡초 방제 체계를 설명하시오.', '과수원 잡초 관리를 설명하시오.', '친환경 잡초 관리를 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/agriculture/plant-protection-engineer" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 식물보호기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🌿</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">잡초학</h1><p className="text-gray-600">잡초의 생태와 방제</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 잡초학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 주요 잡초의 형태와 생태 특성 이해</li><li>• 제초제의 종류와 작용기작 숙지</li><li>• 잡초 사진을 통한 식별 능력 배양</li><li>• 제초제 저항성 관리 전략 이해</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 식물보호기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 식물보호기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 식물보호기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
