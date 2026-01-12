'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NutritionPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('livestock-tech-nutrition-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('livestock-tech-nutrition-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'carbohydrate', title: '탄수화물', icon: '🌾', questions: ['탄수화물의 분류를 설명하시오.', '단당류를 설명하시오.', '이당류를 설명하시오.', '다당류를 설명하시오.', '섬유소를 설명하시오.', '탄수화물 소화를 설명하시오.', '반추위 발효를 설명하시오.', 'VFA를 설명하시오.', '에너지 대사를 설명하시오.', '탄수화물 급원을 설명하시오.']},
    { id: 'protein', title: '단백질', icon: '🥩', questions: ['아미노산을 설명하시오.', '필수아미노산을 설명하시오.', '단백질 분류를 설명하시오.', '단백질 소화를 설명하시오.', '반추위 단백질 분해를 설명하시오.', '바이패스 단백질을 설명하시오.', '질소대사를 설명하시오.', '요소의 이용을 설명하시오.', '단백질 급원을 설명하시오.', '아미노산 균형을 설명하시오.']},
    { id: 'lipid', title: '지질', icon: '🫒', questions: ['지질의 분류를 설명하시오.', '지방산을 설명하시오.', '포화지방산을 설명하시오.', '불포화지방산을 설명하시오.', '필수지방산을 설명하시오.', '지질의 소화를 설명하시오.', '지질의 대사를 설명하시오.', '지방조직을 설명하시오.', '지질 급원을 설명하시오.', '지질의 기능을 설명하시오.']},
    { id: 'mineral', title: '무기물', icon: '�ite', questions: ['다량무기물을 설명하시오.', '칼슘의 기능을 설명하시오.', '인의 기능을 설명하시오.', '칼슘-인 균형을 설명하시오.', '나트륨과 염소를 설명하시오.', '마그네슘을 설명하시오.', '미량무기물을 설명하시오.', '철의 기능을 설명하시오.', '아연의 기능을 설명하시오.', '무기물 결핍증을 설명하시오.']},
    { id: 'vitamin', title: '비타민', icon: '💊', questions: ['지용성 비타민을 설명하시오.', '비타민 A를 설명하시오.', '비타민 D를 설명하시오.', '비타민 E를 설명하시오.', '수용성 비타민을 설명하시오.', '비타민 B군을 설명하시오.', '비타민 결핍증을 설명하시오.', '반추동물 비타민 합성을 설명하시오.', '비타민 급원을 설명하시오.', '비타민의 기능을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/agriculture/livestock-technician" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 축산산업기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🥗</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">가축영양학</h1><p className="text-gray-600">영양소와 대사</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 가축영양학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 영양소 종류와 기능 이해</li><li>• 소화흡수 과정 파악</li><li>• 대사작용 기초 학습</li><li>• 반추동물 특성 숙지</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 축산산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 축산산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 축산산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
