'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CultivationPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('organic-engineer-cultivation-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('organic-engineer-cultivation-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basic', title: '재배 기초', icon: '🌱', questions: ['작물의 정의와 분류를 설명하시오.', '종자의 구조와 발아 조건을 설명하시오.', '종자 휴면의 원인과 타파법을 설명하시오.', '파종 방법의 종류를 설명하시오.', '육묘의 목적과 방법을 설명하시오.', '정식의 시기와 방법을 설명하시오.', '재식밀도의 결정 요인을 설명하시오.', '작물의 생육단계를 설명하시오.', '수확 적기 판정 기준을 설명하시오.', '저장 관리 방법을 설명하시오.']},
    { id: 'environment', title: '생육환경', icon: '🌡️', questions: ['온도가 작물 생육에 미치는 영향을 설명하시오.', '적산온도의 개념과 활용을 설명하시오.', '광합성과 호흡의 관계를 설명하시오.', '일장 반응과 작물을 설명하시오.', '토양 수분의 종류를 설명하시오.', '관수 방법의 종류를 설명하시오.', '토양 통기의 중요성을 설명하시오.', '토양 pH가 작물에 미치는 영향을 설명하시오.', '기상재해와 대책을 설명하시오.', '환경스트레스와 작물 반응을 설명하시오.']},
    { id: 'nutrition', title: '작물 영양', icon: '🧪', questions: ['필수원소의 분류와 역할을 설명하시오.', '질소의 역할과 결핍 증상을 설명하시오.', '인산의 역할과 결핍 증상을 설명하시오.', '칼리의 역할과 결핍 증상을 설명하시오.', '칼슘과 마그네슘의 역할을 설명하시오.', '미량원소의 역할을 설명하시오.', '양분 흡수의 원리를 설명하시오.', '유기질비료의 종류와 특성을 설명하시오.', '퇴비의 제조와 활용을 설명하시오.', '녹비작물의 활용을 설명하시오.']},
    { id: 'cropping', title: '작부체계', icon: '🔄', questions: ['윤작의 효과를 설명하시오.', '연작장해의 원인과 대책을 설명하시오.', '간작과 혼작의 차이를 설명하시오.', '이모작과 이기작을 비교하시오.', '피복작물의 역할을 설명하시오.', '휴한의 효과를 설명하시오.', '작부체계 설계 원칙을 설명하시오.', '유기농 작부체계의 특징을 설명하시오.', '병해충 관리를 위한 윤작을 설명하시오.', '토양 비옥도 유지 작부체계를 설명하시오.']},
    { id: 'management', title: '재배관리', icon: '🔧', questions: ['멀칭의 효과와 종류를 설명하시오.', '정지 및 전정의 목적을 설명하시오.', '적심과 적과의 효과를 설명하시오.', '지주 설치의 목적을 설명하시오.', '제초 방법의 종류를 설명하시오.', '배수의 중요성을 설명하시오.', '시설재배의 특징을 설명하시오.', '환기와 온도관리를 설명하시오.', '유기농 온실관리의 특징을 설명하시오.', '수확 후 관리를 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/agriculture/organic-farming-engineer" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 유기농업기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🌱</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">재배원론</h1><p className="text-gray-600">작물 재배의 기초이론</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 재배원론 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 작물 생육의 기본 원리 이해</li><li>• 유기농 작부체계의 특징 파악</li><li>• 환경 요인과 작물 반응 학습</li><li>• 유기질비료 활용법 숙지</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 유기농업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 유기농업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 유기농업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
