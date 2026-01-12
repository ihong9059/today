'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PowerEngineeringPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('agri-tech-power-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('agri-tech-power-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'engine', title: '내연기관', icon: '🔥', questions: ['4행정 사이클을 설명하시오.', '2행정 사이클을 설명하시오.', '오토사이클을 설명하시오.', '디젤사이클을 설명하시오.', '압축비를 설명하시오.', '열효율을 설명하시오.', '출력과 토크를 설명하시오.', '연료소비율을 설명하시오.', '기관구조를 설명하시오.', '밸브기구를 설명하시오.']},
    { id: 'fuel', title: '연료장치', icon: '⛽', questions: ['디젤연료 특성을 설명하시오.', '가솔린연료 특성을 설명하시오.', '세탄가를 설명하시오.', '옥탄가를 설명하시오.', '분사펌프를 설명하시오.', '분사노즐을 설명하시오.', '연료필터를 설명하시오.', '공기청정기를 설명하시오.', '예열장치를 설명하시오.', '연료계통 고장을 설명하시오.']},
    { id: 'cooling', title: '냉각윤활장치', icon: '❄️', questions: ['수냉식 냉각을 설명하시오.', '공냉식 냉각을 설명하시오.', '라디에이터를 설명하시오.', '수온조절기를 설명하시오.', '물펌프를 설명하시오.', '윤활유 기능을 설명하시오.', '윤활방식을 설명하시오.', '오일펌프를 설명하시오.', '오일필터를 설명하시오.', '냉각계통 고장을 설명하시오.']},
    { id: 'transmission', title: '동력전달장치', icon: '⚙️', questions: ['클러치를 설명하시오.', '변속기를 설명하시오.', '기어비를 설명하시오.', '추진축을 설명하시오.', '차동장치를 설명하시오.', '최종감속장치를 설명하시오.', 'PTO를 설명하시오.', '4륜구동을 설명하시오.', '동력전달효율을 설명하시오.', '변속기 고장을 설명하시오.']},
    { id: 'hydraulic', title: '유압장치', icon: '💧', questions: ['파스칼의 원리를 설명하시오.', '유압펌프를 설명하시오.', '유압실린더를 설명하시오.', '유압밸브를 설명하시오.', '방향제어밸브를 설명하시오.', '압력제어밸브를 설명하시오.', '유압유를 설명하시오.', '유압회로를 설명하시오.', '유압계통 점검을 설명하시오.', '유압계통 고장을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/agriculture/agri-machine-technician" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 농업기계산업기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">⚡</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">농업동력학</h1><p className="text-gray-600">엔진과 동력전달</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 농업동력학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 내연기관 사이클 이해</li><li>• 연료장치 구조 파악</li><li>• 냉각윤활장치 원리 학습</li><li>• 동력전달과 유압장치 숙지</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 농업기계산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 농업기계산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 농업기계산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
