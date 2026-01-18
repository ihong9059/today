'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function AdvertisingPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('visual-engineer-ad-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('visual-engineer-ad-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basics', title: '광고 기초', icon: '📢', questions: ['광고의 정의를 설명하시오.', '광고의 기능을 설명하시오.', '광고의 종류를 설명하시오.', 'ATL과 BTL을 설명하시오.', 'IMC를 설명하시오.', '광고대행사를 설명하시오.', '광고주를 설명하시오.', '매체사를 설명하시오.', '광고 산업구조를 설명하시오.', '광고윤리를 설명하시오.']},
    { id: 'planning', title: '광고기획', icon: '📋', questions: ['광고기획을 설명하시오.', '광고전략을 설명하시오.', '크리에이티브 브리프를 설명하시오.', '타깃 설정을 설명하시오.', '포지셔닝을 설명하시오.', 'USP를 설명하시오.', '빅 아이디어를 설명하시오.', '캠페인을 설명하시오.', '광고 컨셉을 설명하시오.', '슬로건을 설명하시오.']},
    { id: 'creative', title: '크리에이티브', icon: '💡', questions: ['광고 크리에이티브를 설명하시오.', '카피라이팅을 설명하시오.', '헤드라인을 설명하시오.', '바디카피를 설명하시오.', '비주얼을 설명하시오.', '레이아웃을 설명하시오.', '스토리보드를 설명하시오.', 'CF제작을 설명하시오.', '인쇄광고를 설명하시오.', '디지털광고를 설명하시오.']},
    { id: 'marketing', title: '마케팅', icon: '📊', questions: ['마케팅을 설명하시오.', '마케팅 믹스를 설명하시오.', '4P를 설명하시오.', 'STP를 설명하시오.', 'SWOT분석을 설명하시오.', '소비자행동을 설명하시오.', '브랜드를 설명하시오.', '브랜드 자산을 설명하시오.', '브랜드 충성도를 설명하시오.', 'CRM을 설명하시오.']},
    { id: 'media', title: '매체기획', icon: '📺', questions: ['매체기획을 설명하시오.', '도달률을 설명하시오.', '빈도를 설명하시오.', 'GRP를 설명하시오.', 'CPM을 설명하시오.', '매체전략을 설명하시오.', '매체스케줄링을 설명하시오.', '디지털매체를 설명하시오.', 'SNS마케팅을 설명하시오.', '인플루언서 마케팅을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/design/visual-design-engineer" className="text-pink-700 hover:text-pink-900 flex items-center gap-2">← 시각디자인기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-3xl">📢</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">광고학</h1><p className="text-gray-600">광고기획과 전략</p></div>
            <div className="text-right"><p className="text-sm text-gray-500">진행률</p><p className="text-2xl font-bold text-pink-600">{completedCount}/{totalQuestions}</p></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-pink-500 to-rose-600 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} /></div>
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
                {expandedTopics[topic.id] && (<div className="px-6 pb-6 space-y-3">{topic.questions.map((question, idx) => { const isCompleted = completedQuestions[`${topic.id}-${idx}`]; return (<div key={idx} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'border-pink-300 bg-pink-50' : 'border-gray-200 hover:border-pink-300'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, idx)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'border-pink-500 bg-pink-500 text-white' : 'border-gray-300 hover:border-pink-400'}`}>{isCompleted && '✓'}</button><div className="flex-1"><p className={`${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>{idx + 1}. {question}</p><button onClick={() => handleAIClick(question)} className="mt-2 text-sm text-pink-600 hover:text-pink-800 font-medium">🤖 AI에게 물어보기</button></div></div></div>); })}</div>)}
              </div>
            );
          })}
        </div>
        <div className="mt-8 bg-pink-50 rounded-2xl p-6"><h3 className="font-bold text-pink-800 mb-3">📖 광고학 학습 가이드</h3><ul className="text-sm text-pink-700 space-y-2"><li>• 광고 기초 개념 이해</li><li>• 광고기획 프로세스 파악</li><li>• 크리에이티브 전략 학습</li><li>• 마케팅과 매체 기획 숙지</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 시각디자인기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 시각디자인기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 시각디자인기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
