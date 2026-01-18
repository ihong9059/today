'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function SeedProductionPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('seed-tech-production-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('seed-tech-production-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basics', title: '종자 기초', icon: '🌱', questions: ['종자의 정의를 설명하시오.', '종자의 구조를 설명하시오.', '종자의 형성을 설명하시오.', '종자의 성숙을 설명하시오.', '종자의 휴면을 설명하시오.', '휴면타파법을 설명하시오.', '종자의 발아를 설명하시오.', '발아조건을 설명하시오.', '종자 수명을 설명하시오.', '종자 활력을 설명하시오.']},
    { id: 'production', title: '종자생산', icon: '🏭', questions: ['채종재배를 설명하시오.', '채종포 설치를 설명하시오.', '격리거리를 설명하시오.', '이형주 제거를 설명하시오.', '교잡종 채종을 설명하시오.', '웅성불임을 설명하시오.', '자가불화합성을 설명하시오.', '채종시기를 설명하시오.', '수확방법을 설명하시오.', '종자 정선을 설명하시오.']},
    { id: 'quality', title: '품질관리', icon: '✅', questions: ['종자검사를 설명하시오.', '순도검사를 설명하시오.', '발아검사를 설명하시오.', '수분검사를 설명하시오.', '건전도검사를 설명하시오.', '종자활력검사를 설명하시오.', '품종순도를 설명하시오.', '종자등급을 설명하시오.', '검사기준을 설명하시오.', '종자표시를 설명하시오.']},
    { id: 'storage', title: '저장처리', icon: '📦', questions: ['종자건조를 설명하시오.', '저장조건을 설명하시오.', '저장수명을 설명하시오.', '저온저장을 설명하시오.', '밀봉저장을 설명하시오.', '종자소독을 설명하시오.', '종자코팅을 설명하시오.', '펠렛종자를 설명하시오.', '프라이밍을 설명하시오.', '저장해충 방제를 설명하시오.']},
    { id: 'law', title: '종자법규', icon: '📜', questions: ['종자산업법을 설명하시오.', '품종보호제도를 설명하시오.', '품종등록을 설명하시오.', '종자업 등록을 설명하시오.', '보증종자를 설명하시오.', '종자유통을 설명하시오.', 'UPOV를 설명하시오.', '식물신품종보호를 설명하시오.', '종자관리요강을 설명하시오.', '국가품종목록을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/agriculture/seed-technician" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 종자산업기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🌱</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">종자생산학</h1><p className="text-gray-600">종자의 생산과 관리</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 종자생산학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 종자 형성과 발아 과정 이해</li><li>• 채종재배 기술 파악</li><li>• 종자검사와 품질관리 학습</li><li>• 종자법규 숙지</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 종자산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 종자산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 종자산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
