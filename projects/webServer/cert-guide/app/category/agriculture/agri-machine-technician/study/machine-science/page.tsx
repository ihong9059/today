'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function MachineSciencePage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('agri-tech-machine-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('agri-tech-machine-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'tractor', title: '트랙터', icon: '🚜', questions: ['트랙터의 구조를 설명하시오.', '트랙터 분류를 설명하시오.', '트랙터 출력을 설명하시오.', '견인력을 설명하시오.', 'PTO를 설명하시오.', '3점 링크를 설명하시오.', '조향장치를 설명하시오.', '제동장치를 설명하시오.', '차동장치를 설명하시오.', '트랙터 안전을 설명하시오.']},
    { id: 'tillage', title: '경운정지기계', icon: '🌾', questions: ['쟁기의 종류를 설명하시오.', '쟁기 작용을 설명하시오.', '로터리의 구조를 설명하시오.', '로터리 경운을 설명하시오.', '배토기를 설명하시오.', '심토파쇄기를 설명하시오.', '써레를 설명하시오.', '정지작업을 설명하시오.', '경운깊이를 설명하시오.', '작업효율을 설명하시오.']},
    { id: 'planting', title: '파종이식기계', icon: '🌱', questions: ['파종기의 종류를 설명하시오.', '조파기를 설명하시오.', '점파기를 설명하시오.', '이앙기의 구조를 설명하시오.', '식부장치를 설명하시오.', '모공급장치를 설명하시오.', '파종량 조절을 설명하시오.', '파종깊이를 설명하시오.', '육묘시설을 설명하시오.', '이앙작업을 설명하시오.']},
    { id: 'harvest', title: '수확기계', icon: '🌿', questions: ['콤바인의 구조를 설명하시오.', '예취부를 설명하시오.', '탈곡부를 설명하시오.', '선별부를 설명하시오.', '곡물탱크를 설명하시오.', '바인더를 설명하시오.', '예초기를 설명하시오.', '수확손실을 설명하시오.', '수확적기를 설명하시오.', '수확기 정비를 설명하시오.']},
    { id: 'processing', title: '조제가공기계', icon: '⚙️', questions: ['건조기의 원리를 설명하시오.', '순환식 건조기를 설명하시오.', '정선기를 설명하시오.', '도정기를 설명하시오.', '사료분쇄기를 설명하시오.', '혼합기를 설명하시오.', '포장기를 설명하시오.', '저장시설을 설명하시오.', '건조온도를 설명하시오.', '도정율을 설명하시오.']},
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🚜</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">농업기계학</h1><p className="text-gray-600">농업기계의 구조와 원리</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 농업기계학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 트랙터 구조와 작동원리 이해</li><li>• 경운정지 기계 특성 파악</li><li>• 파종 및 수확기계 학습</li><li>• 조제가공 기계 기초 숙지</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 농업기계산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 농업기계산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 농업기계산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
