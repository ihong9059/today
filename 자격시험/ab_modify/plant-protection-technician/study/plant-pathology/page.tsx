'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PlantPathologyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('plant-tech-pathology-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('plant-tech-pathology-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basic', title: '병해 총론', icon: '🔬', questions: ['식물병의 정의를 설명하시오.', '식물병의 발생 요인(병삼각)을 설명하시오.', '병원균의 종류를 설명하시오.', '병원성과 독성의 차이를 설명하시오.', '감수성과 저항성을 설명하시오.', '병징과 표징의 차이를 설명하시오.', '전염 경로의 종류를 설명하시오.', '1차 전염원과 2차 전염원을 설명하시오.', '코흐의 원칙을 설명하시오.', '비전염성 병해의 원인을 설명하시오.']},
    { id: 'fungal', title: '곰팡이 병해', icon: '🍄', questions: ['곰팡이의 일반적 특성을 설명하시오.', '곰팡이의 번식 방법을 설명하시오.', '노균병의 증상과 방제를 설명하시오.', '흰가루병의 증상과 방제를 설명하시오.', '역병의 증상과 방제를 설명하시오.', '탄저병의 증상과 방제를 설명하시오.', '시들음병의 증상과 방제를 설명하시오.', '잿빛곰팡이병의 증상과 방제를 설명하시오.', '녹병의 증상과 방제를 설명하시오.', '흰비단병의 증상과 방제를 설명하시오.']},
    { id: 'bacterial', title: '세균·바이러스 병해', icon: '🦠', questions: ['세균병의 특성을 설명하시오.', '세균병의 진단법을 설명하시오.', '무름병의 증상과 방제를 설명하시오.', '풋마름병의 증상과 방제를 설명하시오.', '궤양병의 증상과 방제를 설명하시오.', '바이러스병의 특성을 설명하시오.', '바이러스의 전염 방법을 설명하시오.', '모자이크병의 증상과 방제를 설명하시오.', '파이토플라스마의 특성을 설명하시오.', '바이로이드의 특성을 설명하시오.']},
    { id: 'diagnosis', title: '병해 진단', icon: '🔍', questions: ['육안 진단법을 설명하시오.', '현미경 진단법을 설명하시오.', '배양 검정법을 설명하시오.', 'ELISA 검정법을 설명하시오.', 'PCR 진단법을 설명하시오.', '주요 병징의 종류를 설명하시오.', '영양장해와 병해의 구별법을 설명하시오.', '약해 증상을 설명하시오.', '저온 피해 증상을 설명하시오.', '고온 피해 증상을 설명하시오.']},
    { id: 'control', title: '병해 방제', icon: '🛡️', questions: ['재배적 방제법을 설명하시오.', '물리적 방제법을 설명하시오.', '생물적 방제법을 설명하시오.', '화학적 방제법을 설명하시오.', '보호살균제의 특성을 설명하시오.', '침투이행성 살균제의 특성을 설명하시오.', '종자소독의 방법을 설명하시오.', '토양소독의 방법을 설명하시오.', '저장병의 방제법을 설명하시오.', '종합적 병해관리(IDM)를 설명하시오.']},
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🦠</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">식물병리학</h1><p className="text-gray-600">식물 병해와 방제</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 식물병리학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 주요 병원균의 특성 이해</li><li>• 병징 사진을 통한 병해 식별</li><li>• 진단법과 방제법의 기초 숙지</li><li>• 곰팡이, 세균, 바이러스병 구분</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 식물보호산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 식물보호산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 식물보호산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
