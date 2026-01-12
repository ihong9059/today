'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OrganicFoodPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('organic-engineer-food-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('organic-engineer-food-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basic', title: '유기식품 총론', icon: '🥗', questions: ['유기식품의 정의와 범위를 설명하시오.', '유기식품과 일반식품의 차이를 설명하시오.', '유기가공식품의 기준을 설명하시오.', '유기식품의 영양적 특성을 설명하시오.', '유기식품의 안전성을 설명하시오.', '유기식품 소비 트렌드를 설명하시오.', '유기식품 시장 현황을 설명하시오.', '유기식품 국제기준을 설명하시오.', 'CODEX 유기기준을 설명하시오.', '유기식품 관련 법규를 설명하시오.']},
    { id: 'processing', title: '유기식품 가공', icon: '🏭', questions: ['유기가공식품의 원칙을 설명하시오.', '유기가공 허용 첨가물을 설명하시오.', '유기가공 금지물질을 설명하시오.', '유기식품 가공시설 기준을 설명하시오.', '유기농산물 원료 관리를 설명하시오.', '유기축산물 가공 기준을 설명하시오.', '유기식품 포장재 기준을 설명하시오.', '혼합비율에 따른 표시기준을 설명하시오.', '유기가공식품 제조공정 관리를 설명하시오.', '유기식품과 일반식품 분리보관을 설명하시오.']},
    { id: 'quality', title: '품질관리', icon: '✅', questions: ['유기식품 품질기준을 설명하시오.', 'HACCP과 유기식품을 설명하시오.', 'GMP와 유기식품 제조를 설명하시오.', '이력추적관리 시스템을 설명하시오.', '유기식품 잔류농약 기준을 설명하시오.', '유기식품 중금속 기준을 설명하시오.', '유기식품 미생물 기준을 설명하시오.', '품질검사 방법을 설명하시오.', '부적합품 처리를 설명하시오.', '리콜 절차를 설명하시오.']},
    { id: 'labeling', title: '표시·인증', icon: '🏷️', questions: ['유기식품 인증마크를 설명하시오.', '유기표시 기준을 설명하시오.', '무농약 표시와 유기 표시의 차이를 설명하시오.', '유기식품 원산지 표시를 설명하시오.', '유기가공식품 성분 표시를 설명하시오.', '부정표시에 대한 제재를 설명하시오.', '수입 유기식품 표시를 설명하시오.', '인증기관의 역할을 설명하시오.', '인증 갱신 절차를 설명하시오.', '인증 취소 사유를 설명하시오.']},
    { id: 'distribution', title: '유통·저장', icon: '🚚', questions: ['유기식품 유통체계를 설명하시오.', '유기식품 저장 방법을 설명하시오.', '유기식품 운송 기준을 설명하시오.', '콜드체인 관리를 설명하시오.', '유기식품 진열 기준을 설명하시오.', '유기식품과 일반식품 분리진열을 설명하시오.', '유기식품 온라인 판매를 설명하시오.', '직거래 장터 운영을 설명하시오.', '유기식품 수출입 절차를 설명하시오.', '동등성 협정을 설명하시오.']},
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🥗</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">유기식품학</h1><p className="text-gray-600">유기식품의 특성과 관리</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 유기식품학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 유기가공식품 기준과 허용물질 숙지</li><li>• 품질관리 시스템(HACCP, GMP) 이해</li><li>• 유기식품 표시·인증제도 파악</li><li>• 유통·저장 관리 기준 학습</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 유기농업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 유기농업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 유기농업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
