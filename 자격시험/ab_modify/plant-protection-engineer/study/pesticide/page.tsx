'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PesticidePage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('plant-protection-pesticide-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('plant-protection-pesticide-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basic', title: '농약 총론', icon: '🧪', questions: ['농약의 정의와 범위를 설명하시오.', '농약의 발달 역사를 설명하시오.', '농약의 분류 방법을 설명하시오.', '농약의 제형 종류와 특성을 설명하시오.', '유제, 수화제, 입제의 차이를 설명하시오.', '농약의 보조제 역할을 설명하시오.', '농약의 독성 평가 방법을 설명하시오.', 'LD50과 LC50의 개념을 설명하시오.', '농약의 잔류허용기준(MRL)을 설명하시오.', '농약안전사용기준을 설명하시오.']},
    { id: 'insecticide', title: '살충제', icon: '🐛', questions: ['유기인계 살충제의 특성을 설명하시오.', '카바메이트계 살충제의 특성을 설명하시오.', '피레스로이드계 살충제의 특성을 설명하시오.', '네오니코티노이드계 살충제의 특성을 설명하시오.', '곤충생장조절제(IGR)의 원리를 설명하시오.', '살충제의 작용점별 분류를 설명하시오.', '신경계 작용 살충제를 설명하시오.', '호흡계 작용 살충제를 설명하시오.', '살충제 저항성 발달 기작을 설명하시오.', '살충제 저항성 관리 전략을 설명하시오.']},
    { id: 'fungicide', title: '살균제', icon: '🦠', questions: ['살균제의 분류 방법을 설명하시오.', '보호살균제의 특성을 설명하시오.', '침투이행성 살균제의 특성을 설명하시오.', '살균제의 작용기작별 분류를 설명하시오.', '스트로빌루린계 살균제를 설명하시오.', '트리아졸계 살균제를 설명하시오.', '동제의 특성과 사용법을 설명하시오.', '유황제의 특성과 사용법을 설명하시오.', '살균제 저항성 발달과 관리를 설명하시오.', '종자소독제의 종류와 사용법을 설명하시오.']},
    { id: 'application', title: '농약 사용', icon: '💧', questions: ['농약 희석 방법과 계산을 설명하시오.', '살포량 결정 요인을 설명하시오.', '농약 살포기의 종류와 특성을 설명하시오.', '경엽처리와 토양처리의 차이를 설명하시오.', '농약 혼용의 원칙과 주의점을 설명하시오.', '약해의 원인과 대책을 설명하시오.', '농약 보관 및 관리 방법을 설명하시오.', '빈 농약병 처리 방법을 설명하시오.', '농약 중독 증상과 응급처치를 설명하시오.', '농작업자 안전 수칙을 설명하시오.']},
    { id: 'regulation', title: '농약 관리', icon: '📋', questions: ['농약관리법의 목적과 주요 내용을 설명하시오.', '농약 등록 절차를 설명하시오.', '농약 품목 등록 기준을 설명하시오.', '농약 사용 제한 제도를 설명하시오.', 'PLS 제도의 개념과 목적을 설명하시오.', '친환경농약의 기준을 설명하시오.', '생물농약의 종류와 특성을 설명하시오.', '천연식물보호제를 설명하시오.', '농약 잔류분석 방법을 설명하시오.', '농산물 품질관리와 농약의 관계를 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/agriculture/plant-protection-engineer" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 식물보호기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🧪</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">농약학</h1><p className="text-gray-600">농약의 특성과 사용법</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 농약학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 농약의 종류와 작용기작 체계적 정리</li><li>• 농약 희석 계산 문제 연습</li><li>• 농약관리법 주요 조항 숙지</li><li>• 안전사용기준과 PLS 제도 이해</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 식물보호기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 식물보호기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 식물보호기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
