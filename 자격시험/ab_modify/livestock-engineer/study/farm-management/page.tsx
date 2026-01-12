'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FarmManagementPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('livestock-management-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('livestock-management-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basics', title: '경영 기초', icon: '📊', questions: ['축산경영의 특성을 설명하시오.', '축산경영 형태를 설명하시오.', '경영목표를 설명하시오.', '경영조직을 설명하시오.', '경영계획을 설명하시오.', '생산요소를 설명하시오.', '토지이용을 설명하시오.', '자본투자를 설명하시오.', '노동력 관리를 설명하시오.', '경영위험을 설명하시오.']},
    { id: 'economics', title: '축산경제', icon: '💰', questions: ['수요와 공급을 설명하시오.', '가격결정을 설명하시오.', '축산물 가격변동을 설명하시오.', '생산비 분석을 설명하시오.', '손익분기점을 설명하시오.', '한계비용을 설명하시오.', '규모의 경제를 설명하시오.', '수익성 분석을 설명하시오.', '투자분석을 설명하시오.', '자금조달을 설명하시오.']},
    { id: 'production', title: '생산관리', icon: '🏭', questions: ['한우 사양관리를 설명하시오.', '젖소 사양관리를 설명하시오.', '돼지 사양관리를 설명하시오.', '닭 사양관리를 설명하시오.', '출하체중 결정을 설명하시오.', '생산성 지표를 설명하시오.', '사료효율을 설명하시오.', '증체율을 설명하시오.', '산란율을 설명하시오.', '번식효율을 설명하시오.']},
    { id: 'facility', title: '축사시설', icon: '🏠', questions: ['축사 설계원리를 설명하시오.', '축사 환경관리를 설명하시오.', '환기시설을 설명하시오.', '냉난방시설을 설명하시오.', '급이시설을 설명하시오.', '급수시설을 설명하시오.', '분뇨처리를 설명하시오.', '악취저감을 설명하시오.', '자동화시설을 설명하시오.', '스마트팜을 설명하시오.']},
    { id: 'marketing', title: '유통과 마케팅', icon: '🛒', questions: ['축산물 유통을 설명하시오.', '도축과정을 설명하시오.', '등급제도를 설명하시오.', '육질등급을 설명하시오.', '브랜드 마케팅을 설명하시오.', '직거래를 설명하시오.', '수출입을 설명하시오.', '축산물 이력제를 설명하시오.', 'HACCP을 설명하시오.', '축산정책을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/agriculture/livestock-engineer" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 축산기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">📊</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">축산경영학</h1><p className="text-gray-600">경영과 관리</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 축산경영학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 축산경영 기초이론 이해</li><li>• 생산비와 수익성 분석</li><li>• 축종별 사양관리 파악</li><li>• 유통과 마케팅 학습</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 축산기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 축산기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 축산기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
