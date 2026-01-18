'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function IndustrialDesignPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('cg-industrial-design-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('cg-industrial-design-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basics', title: '디자인 기초', icon: '🎨', questions: ['디자인의 정의를 설명하시오.', '디자인의 조건을 설명하시오.', '조형의 요소를 설명하시오.', '조형의 원리를 설명하시오.', '통일과 변화를 설명하시오.', '균형을 설명하시오.', '리듬을 설명하시오.', '강조를 설명하시오.', '비례를 설명하시오.', '조화를 설명하시오.']},
    { id: 'history', title: '디자인사', icon: '📜', questions: ['아르누보를 설명하시오.', '바우하우스를 설명하시오.', '아르데코를 설명하시오.', '모더니즘을 설명하시오.', '포스트모더니즘을 설명하시오.', '미니멀리즘을 설명하시오.', '팝아트를 설명하시오.', '구성주의를 설명하시오.', '데스틸을 설명하시오.', '미래주의를 설명하시오.']},
    { id: 'visual', title: '시각디자인', icon: '👁️', questions: ['시각디자인의 정의를 설명하시오.', '타이포그래피를 설명하시오.', '레이아웃을 설명하시오.', 'CI디자인을 설명하시오.', 'BI디자인을 설명하시오.', '편집디자인을 설명하시오.', '광고디자인을 설명하시오.', '패키지디자인을 설명하시오.', '일러스트레이션을 설명하시오.', '픽토그램을 설명하시오.']},
    { id: 'product', title: '제품디자인', icon: '📱', questions: ['제품디자인의 정의를 설명하시오.', '인간공학을 설명하시오.', '사용성을 설명하시오.', '어포던스를 설명하시오.', '프로토타입을 설명하시오.', '렌더링을 설명하시오.', '모델링을 설명하시오.', '유니버설디자인을 설명하시오.', '지속가능디자인을 설명하시오.', '디자인 프로세스를 설명하시오.']},
    { id: 'environment', title: '환경디자인', icon: '🏠', questions: ['환경디자인의 정의를 설명하시오.', '실내디자인을 설명하시오.', '전시디자인을 설명하시오.', '공공디자인을 설명하시오.', '조경디자인을 설명하시오.', '사인디자인을 설명하시오.', '공간구성요소를 설명하시오.', '동선계획을 설명하시오.', '조명디자인을 설명하시오.', '색채계획을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/design/computer-graphics" className="text-purple-700 hover:text-purple-900 flex items-center gap-2">← 컴퓨터그래픽스운용기능사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center text-3xl">🎨</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">산업디자인일반</h1><p className="text-gray-600">디자인 기초이론</p></div>
            <div className="text-right"><p className="text-sm text-gray-500">진행률</p><p className="text-2xl font-bold text-purple-600">{completedCount}/{totalQuestions}</p></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-purple-600 to-indigo-700 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} /></div>
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
                {expandedTopics[topic.id] && (<div className="px-6 pb-6 space-y-3">{topic.questions.map((question, idx) => { const isCompleted = completedQuestions[`${topic.id}-${idx}`]; return (<div key={idx} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, idx)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'border-purple-500 bg-purple-500 text-white' : 'border-gray-300 hover:border-purple-400'}`}>{isCompleted && '✓'}</button><div className="flex-1"><p className={`${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>{idx + 1}. {question}</p><button onClick={() => handleAIClick(question)} className="mt-2 text-sm text-purple-600 hover:text-purple-800 font-medium">🤖 AI에게 물어보기</button></div></div></div>); })}</div>)}
              </div>
            );
          })}
        </div>
        <div className="mt-8 bg-purple-50 rounded-2xl p-6"><h3 className="font-bold text-purple-800 mb-3">📖 산업디자인일반 학습 가이드</h3><ul className="text-sm text-purple-700 space-y-2"><li>• 디자인 기초 개념 이해</li><li>• 디자인사 주요 사조 파악</li><li>• 시각디자인 분야 학습</li><li>• 제품/환경디자인 이해</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 컴퓨터그래픽스운용기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 컴퓨터그래픽스운용기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 컴퓨터그래픽스운용기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
