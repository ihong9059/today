'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function SoilSciencePage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('organic-tech-soil-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('organic-tech-soil-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basic', title: '토양 기초', icon: '🪨', questions: ['토양의 정의와 기능을 설명하시오.', '토양의 생성을 설명하시오.', '토양 단면을 설명하시오.', '토양 물리적 성질을 설명하시오.', '토성을 설명하시오.', '토양 구조를 설명하시오.', '토양 공극을 설명하시오.', '토양 수분을 설명하시오.', '토양 통기를 설명하시오.', '토양 온도를 설명하시오.']},
    { id: 'chemistry', title: '토양 화학', icon: '⚗️', questions: ['토양 pH를 설명하시오.', '토양 산성화를 설명하시오.', '석회시용을 설명하시오.', 'CEC를 설명하시오.', '염기포화도를 설명하시오.', '토양 완충능을 설명하시오.', '산화환원을 설명하시오.', 'EC를 설명하시오.', '염류집적을 설명하시오.', '토양 오염을 설명하시오.']},
    { id: 'fertility', title: '토양 비옥도', icon: '🌿', questions: ['토양 비옥도를 설명하시오.', '질소 순환을 설명하시오.', '인산 고정을 설명하시오.', '칼리 유효도를 설명하시오.', '미량원소 유효도를 설명하시오.', '토양 검정을 설명하시오.', '비료 권장량을 설명하시오.', '유기물과 비옥도를 설명하시오.', '토양미생물을 설명하시오.', '지력 증진을 설명하시오.']},
    { id: 'organic', title: '토양 유기물', icon: '🍂', questions: ['토양 유기물 기능을 설명하시오.', '부식 생성을 설명하시오.', '탄질비(C/N비)를 설명하시오.', '유기물 분해를 설명하시오.', '퇴비 종류를 설명하시오.', '퇴비 제조를 설명하시오.', '부숙도 판정을 설명하시오.', '액비 제조를 설명하시오.', '녹비작물을 설명하시오.', '유기물 시용 효과를 설명하시오.']},
    { id: 'management', title: '토양 관리', icon: '🛠️', questions: ['토양 침식을 설명하시오.', '토양 다짐을 설명하시오.', '배수 개선을 설명하시오.', '관개 관리를 설명하시오.', '객토를 설명하시오.', '유기농 토양관리를 설명하시오.', '토양 생물다양성을 설명하시오.', '경운과 무경운을 설명하시오.', '피복작물 활용을 설명하시오.', '지속가능 토양관리를 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/agriculture/organic-farming-technician" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 유기농업산업기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🪨</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">토양학</h1><p className="text-gray-600">토양의 특성과 관리</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 토양학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 토양의 물리적, 화학적 성질 이해</li><li>• 유기물 관리와 퇴비 제조 숙지</li><li>• 토양 비옥도 관리법 파악</li><li>• 유기농 토양관리 학습</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 유기농업산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 유기농업산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 유기농업산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
