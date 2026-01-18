'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function FeedSciencePage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('livestock-tech-feed-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('livestock-tech-feed-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'roughage', title: '조사료', icon: '🌿', questions: ['조사료의 특성을 설명하시오.', '목초의 종류를 설명하시오.', '화본과 목초를 설명하시오.', '두과 목초를 설명하시오.', '건초 제조를 설명하시오.', '사일리지 제조를 설명하시오.', '사일리지 발효를 설명하시오.', '볏짚 이용을 설명하시오.', '조사료 품질을 설명하시오.', '조사료 저장을 설명하시오.']},
    { id: 'concentrate', title: '농후사료', icon: '🌽', questions: ['농후사료의 특성을 설명하시오.', '곡류사료를 설명하시오.', '옥수수를 설명하시오.', '보리를 설명하시오.', '밀기울을 설명하시오.', '대두박을 설명하시오.', '면실박을 설명하시오.', '어분을 설명하시오.', '당밀을 설명하시오.', '농후사료 저장을 설명하시오.']},
    { id: 'processing', title: '사료가공', icon: '⚙️', questions: ['사료가공의 목적을 설명하시오.', '분쇄를 설명하시오.', '압편을 설명하시오.', '펠렛팅을 설명하시오.', '익스트루딩을 설명하시오.', '증기처리를 설명하시오.', 'TMR을 설명하시오.', '사료첨가제를 설명하시오.', '가공효과를 설명하시오.', '가공시설을 설명하시오.']},
    { id: 'formulation', title: '사료배합', icon: '📐', questions: ['영양소 요구량을 설명하시오.', '사료배합 원칙을 설명하시오.', '피어슨 방정식을 설명하시오.', '배합비 계산을 설명하시오.', 'TDN을 설명하시오.', 'ME를 설명하시오.', 'CP를 설명하시오.', 'NDF와 ADF를 설명하시오.', '최소비용 배합을 설명하시오.', '배합사료를 설명하시오.']},
    { id: 'feeding', title: '사료급여', icon: '🍽️', questions: ['사료급여 방법을 설명하시오.', '자유급이를 설명하시오.', '제한급이를 설명하시오.', '급여횟수를 설명하시오.', '급여량 결정을 설명하시오.', '사료효율을 설명하시오.', '축종별 급여를 설명하시오.', '성장단계별 급여를 설명하시오.', '급여기록을 설명하시오.', '사료비 절감을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/agriculture/livestock-technician" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 축산산업기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🌾</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">사료학</h1><p className="text-gray-600">사료의 종류와 이용</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 사료학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 조사료와 농후사료 이해</li><li>• 사료가공 방법 파악</li><li>• 사료배합 기초 학습</li><li>• 사료급여 실무 숙지</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 축산산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 축산산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 축산산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
