'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ManufacturingPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('agri-manufacturing-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('agri-manufacturing-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'cutting', title: '절삭가공', icon: '🔪', questions: ['절삭가공의 원리를 설명하시오.', '선삭가공을 설명하시오.', '밀링가공을 설명하시오.', '드릴가공을 설명하시오.', '절삭속도를 설명하시오.', '이송속도를 설명하시오.', '절삭깊이를 설명하시오.', '절삭유의 기능을 설명하시오.', '절삭공구 재료를 설명하시오.', '공구수명을 설명하시오.']},
    { id: 'grinding', title: '연삭가공', icon: '⚙️', questions: ['연삭가공의 원리를 설명하시오.', '연삭숫돌을 설명하시오.', '숫돌입자를 설명하시오.', '결합제를 설명하시오.', '숫돌조직을 설명하시오.', '원통연삭을 설명하시오.', '평면연삭을 설명하시오.', '내면연삭을 설명하시오.', '센터리스 연삭을 설명하시오.', '호닝을 설명하시오.']},
    { id: 'welding', title: '용접', icon: '🔥', questions: ['아크용접의 원리를 설명하시오.', '피복아크용접을 설명하시오.', 'TIG용접을 설명하시오.', 'MIG용접을 설명하시오.', '가스용접을 설명하시오.', '저항용접을 설명하시오.', '용접결함을 설명하시오.', '용접변형을 설명하시오.', '용접봉 선정을 설명하시오.', '용접안전을 설명하시오.']},
    { id: 'forming', title: '소성가공', icon: '🔨', questions: ['소성가공의 원리를 설명하시오.', '단조가공을 설명하시오.', '압연가공을 설명하시오.', '인발가공을 설명하시오.', '압출가공을 설명하시오.', '판금가공을 설명하시오.', '전단가공을 설명하시오.', '굽힘가공을 설명하시오.', '딥드로잉을 설명하시오.', '스피닝을 설명하시오.']},
    { id: 'measurement', title: '측정', icon: '📏', questions: ['측정의 기본을 설명하시오.', '버니어캘리퍼스를 설명하시오.', '마이크로미터를 설명하시오.', '다이얼게이지를 설명하시오.', '블록게이지를 설명하시오.', '하이트게이지를 설명하시오.', '각도측정을 설명하시오.', '표면거칠기 측정을 설명하시오.', '공차와 끼워맞춤을 설명하시오.', '측정오차를 설명하시오.']},
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🔧</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">농업기계공작법</h1><p className="text-gray-600">가공과 제작</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 농업기계공작법 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 절삭가공 원리와 조건 이해</li><li>• 연삭가공과 숫돌 특성 파악</li><li>• 용접 종류와 특성 학습</li><li>• 측정기기 사용법 숙지</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 농업기계기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 농업기계기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 농업기계기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
