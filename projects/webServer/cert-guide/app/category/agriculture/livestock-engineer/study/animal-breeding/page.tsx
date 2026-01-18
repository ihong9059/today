'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function AnimalBreedingPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('livestock-breeding-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('livestock-breeding-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'genetics', title: '유전학 기초', icon: '🧬', questions: ['멘델의 유전법칙을 설명하시오.', '대립유전자를 설명하시오.', '우성과 열성을 설명하시오.', '유전자형과 표현형을 설명하시오.', '연관과 교차를 설명하시오.', '성연관 유전을 설명하시오.', '다인자 유전을 설명하시오.', '상위성을 설명하시오.', '유전자 상호작용을 설명하시오.', '돌연변이를 설명하시오.']},
    { id: 'population', title: '집단유전학', icon: '📊', questions: ['하디-바인베르크 법칙을 설명하시오.', '유전자빈도를 설명하시오.', '유전적 평형을 설명하시오.', '근친교배를 설명하시오.', '근교계수를 설명하시오.', '유전적 부동을 설명하시오.', '이주의 효과를 설명하시오.', '선발의 효과를 설명하시오.', '돌연변이율을 설명하시오.', '유효집단크기를 설명하시오.']},
    { id: 'quantitative', title: '양적유전학', icon: '📈', questions: ['양적형질을 설명하시오.', '유전력을 설명하시오.', '유전력 추정법을 설명하시오.', '유전상관을 설명하시오.', '표현형 분산을 설명하시오.', '유전분산을 설명하시오.', '환경분산을 설명하시오.', '선발반응을 설명하시오.', '선발차를 설명하시오.', '세대간격을 설명하시오.']},
    { id: 'selection', title: '선발과 교배', icon: '🎯', questions: ['개체선발을 설명하시오.', '가계선발을 설명하시오.', '후대검정을 설명하시오.', '선발지수를 설명하시오.', '순종교배를 설명하시오.', '품종간교배를 설명하시오.', '잡종강세를 설명하시오.', '윤환교배를 설명하시오.', '역교배를 설명하시오.', '합성품종을 설명하시오.']},
    { id: 'improvement', title: '가축개량', icon: '🐄', questions: ['육종목표를 설명하시오.', '능력검정을 설명하시오.', '유전능력평가를 설명하시오.', 'BLUP을 설명하시오.', '종축선발을 설명하시오.', '종축등록을 설명하시오.', '인공수정의 육종효과를 설명하시오.', '수정란이식의 육종효과를 설명하시오.', '유전자표지를 설명하시오.', '게놈선발을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/agriculture/livestock-engineer" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 축산기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🧬</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">가축육종학</h1><p className="text-gray-600">유전과 개량</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 가축육종학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 유전법칙과 집단유전학 이해</li><li>• 유전력 추정과 선발반응 계산</li><li>• 교배방법과 잡종강세 학습</li><li>• 현대 육종기술 파악</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 축산기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 축산기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 축산기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
