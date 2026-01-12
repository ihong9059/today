'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EntomologyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('plant-tech-entomology-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('plant-tech-entomology-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basic', title: '곤충 형태', icon: '🔬', questions: ['곤충의 기본 구조를 설명하시오.', '곤충의 머리 구조를 설명하시오.', '곤충의 촉각 유형을 설명하시오.', '곤충의 구기 유형을 설명하시오.', '곤충의 가슴 구조를 설명하시오.', '곤충의 다리 유형을 설명하시오.', '곤충의 날개 구조를 설명하시오.', '곤충의 배 구조를 설명하시오.', '외골격의 특성을 설명하시오.', '탈피의 과정을 설명하시오.']},
    { id: 'ecology', title: '곤충 생태', icon: '🌿', questions: ['불완전변태와 완전변태를 비교하시오.', '곤충의 생활사를 설명하시오.', '곤충의 휴면을 설명하시오.', '곤충의 월동 방법을 설명하시오.', '유효적산온도를 설명하시오.', '곤충의 광주기 반응을 설명하시오.', '해충과 익충을 구분하시오.', '해충 발생 예찰을 설명하시오.', '경제적 피해수준을 설명하시오.', '경제적 방제한계를 설명하시오.']},
    { id: 'pests', title: '주요 해충', icon: '🐛', questions: ['진딧물의 특성과 방제를 설명하시오.', '응애의 특성과 방제를 설명하시오.', '나방류 해충의 특성을 설명하시오.', '굼벵이의 특성과 방제를 설명하시오.', '멸구류의 특성과 방제를 설명하시오.', '매미충류의 특성을 설명하시오.', '총채벌레의 특성과 방제를 설명하시오.', '가루이의 특성과 방제를 설명하시오.', '나무좀류의 특성을 설명하시오.', '저장해충의 종류를 설명하시오.']},
    { id: 'control', title: '해충 방제', icon: '🛡️', questions: ['경종적 방제법을 설명하시오.', '물리적 방제법을 설명하시오.', '생물적 방제법을 설명하시오.', '천적의 종류와 활용을 설명하시오.', '화학적 방제법을 설명하시오.', '살충제의 종류를 설명하시오.', '살충제 저항성을 설명하시오.', '페로몬 트랩을 설명하시오.', '유아등 방제를 설명하시오.', '황색 끈끈이 트랩을 설명하시오.']},
    { id: 'ipm', title: '종합적 방제', icon: '📋', questions: ['IPM의 개념을 설명하시오.', 'IPM의 원리를 설명하시오.', 'IPM 프로그램 수립을 설명하시오.', '해충 발생 예찰의 중요성을 설명하시오.', '저항성 품종 이용을 설명하시오.', '천적 보호를 설명하시오.', '화학적 방제의 역할을 설명하시오.', '친환경 방제를 설명하시오.', '시설원예 IPM을 설명하시오.', '노지재배 IPM을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/agriculture/plant-protection-technician" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 식물보호산업기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🐛</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">해충학</h1><p className="text-gray-600">해충의 생태와 방제</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 해충학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 곤충의 형태와 분류 기초 이해</li><li>• 주요 해충의 생태와 피해 특성</li><li>• 해충 사진을 통한 식별 능력</li><li>• 방제법의 원리와 IPM 개념</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 식물보호산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 식물보호산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 식물보호산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
