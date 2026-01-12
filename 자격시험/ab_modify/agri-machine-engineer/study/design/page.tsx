'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DesignPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('agri-design-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('agri-design-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'mechanics', title: '재료역학', icon: '📐', questions: ['응력과 변형률을 설명하시오.', '후크의 법칙을 설명하시오.', '탄성계수를 설명하시오.', '인장응력을 설명하시오.', '전단응력을 설명하시오.', '보의 굽힘을 설명하시오.', '단면계수를 설명하시오.', '단면2차모멘트를 설명하시오.', '비틀림을 설명하시오.', '좌굴을 설명하시오.']},
    { id: 'material', title: '기계재료', icon: '🔩', questions: ['철강재료를 설명하시오.', '탄소강을 설명하시오.', '합금강을 설명하시오.', '주철을 설명하시오.', '비철금속을 설명하시오.', '알루미늄합금을 설명하시오.', '열처리를 설명하시오.', '담금질을 설명하시오.', '뜨임을 설명하시오.', '표면경화법을 설명하시오.']},
    { id: 'elements', title: '기계요소', icon: '⚙️', questions: ['나사의 종류를 설명하시오.', '볼트와 너트를 설명하시오.', '키와 핀을 설명하시오.', '축의 설계를 설명하시오.', '축이음을 설명하시오.', '베어링을 설명하시오.', '구름베어링을 설명하시오.', '기어를 설명하시오.', '벨트전동을 설명하시오.', '체인전동을 설명하시오.']},
    { id: 'spring', title: '스프링과 브레이크', icon: '🔄', questions: ['스프링의 종류를 설명하시오.', '코일스프링을 설명하시오.', '판스프링을 설명하시오.', '스프링상수를 설명하시오.', '스프링 설계를 설명하시오.', '브레이크의 종류를 설명하시오.', '블록브레이크를 설명하시오.', '밴드브레이크를 설명하시오.', '디스크브레이크를 설명하시오.', '제동력 계산을 설명하시오.']},
    { id: 'drawing', title: '기계제도', icon: '✏️', questions: ['투상법을 설명하시오.', '정투상도를 설명하시오.', '등각투상도를 설명하시오.', '단면도를 설명하시오.', '치수기입을 설명하시오.', '공차를 설명하시오.', '끼워맞춤을 설명하시오.', '표면거칠기 기호를 설명하시오.', '용접기호를 설명하시오.', 'CAD를 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/agriculture/agri-machine-engineer" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 농업기계기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">📐</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">농업기계설계</h1><p className="text-gray-600">설계와 재료역학</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 농업기계설계 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 재료역학 기초계산 연습</li><li>• 기계재료와 열처리 이해</li><li>• 기계요소 설계 학습</li><li>• 기계제도 규칙 숙지</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 농업기계기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 농업기계기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 농업기계기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
