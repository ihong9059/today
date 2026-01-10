'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DesignGeneralPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('webdesign-design-general-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('webdesign-design-general-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basics', title: '디자인 기초', icon: '🎨', questions: ['디자인의 정의를 설명하시오.', '디자인의 조건을 설명하시오.', '조형의 요소를 설명하시오.', '점, 선, 면을 설명하시오.', '형태를 설명하시오.', '질감을 설명하시오.', '공간을 설명하시오.', '조형의 원리를 설명하시오.', '통일과 변화를 설명하시오.', '균형을 설명하시오.']},
    { id: 'color', title: '색채학', icon: '🌈', questions: ['색의 3속성을 설명하시오.', '색상환을 설명하시오.', '먼셀표색계를 설명하시오.', '보색을 설명하시오.', '유사색을 설명하시오.', '난색과 한색을 설명하시오.', '배색의 원리를 설명하시오.', '색의 대비를 설명하시오.', '색의 심리효과를 설명하시오.', '색채조화를 설명하시오.']},
    { id: 'typography', title: '타이포그래피', icon: '✏️', questions: ['타이포그래피를 설명하시오.', '서체의 분류를 설명하시오.', '세리프체를 설명하시오.', '산세리프체를 설명하시오.', '글자의 구조를 설명하시오.', '자간과 행간을 설명하시오.', '정렬방식을 설명하시오.', '가독성을 설명하시오.', '판독성을 설명하시오.', '웹폰트를 설명하시오.']},
    { id: 'layout', title: '레이아웃', icon: '📐', questions: ['레이아웃을 설명하시오.', '그리드시스템을 설명하시오.', '여백을 설명하시오.', '정렬을 설명하시오.', '계층구조를 설명하시오.', '시선의 흐름을 설명하시오.', 'F패턴을 설명하시오.', 'Z패턴을 설명하시오.', '황금비율을 설명하시오.', '반응형레이아웃을 설명하시오.']},
    { id: 'history', title: '디자인사', icon: '📜', questions: ['아르누보를 설명하시오.', '바우하우스를 설명하시오.', '아르데코를 설명하시오.', '모더니즘을 설명하시오.', '포스트모더니즘을 설명하시오.', '미니멀리즘을 설명하시오.', '플랫디자인을 설명하시오.', '스큐어모피즘을 설명하시오.', '머티리얼디자인을 설명하시오.', '뉴모피즘을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/it/web-design-technician" className="text-purple-700 hover:text-purple-900 flex items-center gap-2">← 웹디자인기능사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center text-3xl">🎨</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">디자인일반</h1><p className="text-gray-600">디자인 기초이론</p></div>
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
        <div className="mt-8 bg-purple-50 rounded-2xl p-6"><h3 className="font-bold text-purple-800 mb-3">📖 디자인일반 학습 가이드</h3><ul className="text-sm text-purple-700 space-y-2"><li>• 조형요소와 원리 이해</li><li>• 색채학 기초 학습</li><li>• 타이포그래피 원리 파악</li><li>• 레이아웃 기법 숙지</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 웹디자인기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 웹디자인기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 웹디자인기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
