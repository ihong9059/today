'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function CultivationPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('seed-tech-cultivation-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('seed-tech-cultivation-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'environment', title: '재배환경', icon: '🌍', questions: ['재배환경의 구성요소를 설명하시오.', '광합성을 설명하시오.', '광포화점을 설명하시오.', '광보상점을 설명하시오.', '일장효과를 설명하시오.', '온도반응을 설명하시오.', '적산온도를 설명하시오.', '춘화현상을 설명하시오.', '수분환경을 설명하시오.', '토양환경을 설명하시오.']},
    { id: 'growth', title: '작물생리', icon: '🌿', questions: ['작물의 생육단계를 설명하시오.', '영양생장을 설명하시오.', '생식생장을 설명하시오.', '물질대사를 설명하시오.', '호흡작용을 설명하시오.', '증산작용을 설명하시오.', '양분흡수를 설명하시오.', '식물호르몬을 설명하시오.', '옥신을 설명하시오.', '지베렐린을 설명하시오.']},
    { id: 'soil', title: '토양관리', icon: '🏔️', questions: ['토양의 구성을 설명하시오.', '토양의 3상을 설명하시오.', '토성을 설명하시오.', '토양구조를 설명하시오.', '토양반응(pH)을 설명하시오.', '양이온치환용량을 설명하시오.', '토양유기물을 설명하시오.', '토양개량을 설명하시오.', '객토를 설명하시오.', '심경을 설명하시오.']},
    { id: 'fertilizer', title: '비료관리', icon: '🧪', questions: ['비료의 3요소를 설명하시오.', '질소비료를 설명하시오.', '인산비료를 설명하시오.', '칼리비료를 설명하시오.', '유기질비료를 설명하시오.', '복합비료를 설명하시오.', '미량원소를 설명하시오.', '시비량 결정을 설명하시오.', '기비와 추비를 설명하시오.', '엽면시비를 설명하시오.']},
    { id: 'management', title: '재배관리', icon: '👨‍🌾', questions: ['파종을 설명하시오.', '육묘를 설명하시오.', '정식을 설명하시오.', '관수를 설명하시오.', '중경제초를 설명하시오.', '멀칭을 설명하시오.', '전정을 설명하시오.', '적과를 설명하시오.', '수확적기를 설명하시오.', '저장관리를 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/agriculture/seed-technician" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 종자산업기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🌾</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">재배원론</h1><p className="text-gray-600">작물재배의 기초</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 재배원론 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 재배환경 요인 이해</li><li>• 작물생리와 생육단계 파악</li><li>• 토양과 비료 관리 학습</li><li>• 재배기술 숙지</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 종자산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 종자산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 종자산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
