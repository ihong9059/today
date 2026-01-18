'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ColorSciencePage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('visual-engineer-color-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('visual-engineer-color-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'theory', title: '색채이론', icon: '🌈', questions: ['색의 정의를 설명하시오.', '빛과 색의 관계를 설명하시오.', '색의 3속성을 설명하시오.', '색상을 설명하시오.', '명도를 설명하시오.', '채도를 설명하시오.', '색상환을 설명하시오.', '가산혼합을 설명하시오.', '감산혼합을 설명하시오.', '색의 항상성을 설명하시오.']},
    { id: 'system', title: '표색계', icon: '📊', questions: ['먼셀 표색계를 설명하시오.', 'PCCS를 설명하시오.', 'NCS를 설명하시오.', 'CIE 표색계를 설명하시오.', 'RGB를 설명하시오.', 'CMYK를 설명하시오.', 'Lab 모드를 설명하시오.', 'HSB를 설명하시오.', '색역을 설명하시오.', 'ICC 프로파일을 설명하시오.']},
    { id: 'harmony', title: '색채조화', icon: '🎨', questions: ['색채조화를 설명하시오.', '보색조화를 설명하시오.', '유사색조화를 설명하시오.', '삼색조화를 설명하시오.', '분리보색을 설명하시오.', '톤온톤을 설명하시오.', '톤인톤을 설명하시오.', '그라데이션을 설명하시오.', '악센트 배색을 설명하시오.', '도미넌트 배색을 설명하시오.']},
    { id: 'psychology', title: '색채심리', icon: '🧠', questions: ['색의 온도감을 설명하시오.', '색의 경중감을 설명하시오.', '색의 진출후퇴를 설명하시오.', '색의 팽창수축을 설명하시오.', '색채 감정을 설명하시오.', '빨강의 심리를 설명하시오.', '파랑의 심리를 설명하시오.', '노랑의 심리를 설명하시오.', '초록의 심리를 설명하시오.', '무채색의 심리를 설명하시오.']},
    { id: 'application', title: '색채응용', icon: '🖌️', questions: ['색채 계획을 설명하시오.', '색채 마케팅을 설명하시오.', '색채 트렌드를 설명하시오.', '환경색채를 설명하시오.', '기업색채를 설명하시오.', '제품색채를 설명하시오.', '패션색채를 설명하시오.', '인테리어색채를 설명하시오.', '색채 관리를 설명하시오.', '색채 컨설팅을 설명하시오.']},
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
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-3xl">🌈</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">색채학</h1><p className="text-gray-600">색채이론과 배색</p></div>
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
        <div className="mt-8 bg-pink-50 rounded-2xl p-6"><h3 className="font-bold text-pink-800 mb-3">📖 색채학 학습 가이드</h3><ul className="text-sm text-pink-700 space-y-2"><li>• 색의 3속성 완벽 이해</li><li>• 표색계별 특징 파악</li><li>• 배색원리와 조화 학습</li><li>• 색채심리와 응용 숙지</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 시각디자인기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 시각디자인기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 시각디자인기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
