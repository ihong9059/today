'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function OrganicFarmingPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('organic-engineer-farming-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('organic-engineer-farming-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'principle', title: '유기농업 원리', icon: '🌾', questions: ['유기농업의 정의와 목적을 설명하시오.', 'IFOAM 유기농업 원칙을 설명하시오.', '유기농업의 역사와 발전을 설명하시오.', '관행농업과 유기농업의 차이를 설명하시오.', '지속가능농업의 개념을 설명하시오.', '생태계와 유기농업의 관계를 설명하시오.', '생물다양성 보전을 설명하시오.', '탄소중립과 유기농업을 설명하시오.', '순환농업의 원리를 설명하시오.', '농업환경보전의 중요성을 설명하시오.']},
    { id: 'pest', title: '병해충 관리', icon: '🐛', questions: ['유기농업 병해충 관리 원칙을 설명하시오.', '천적을 활용한 방제를 설명하시오.', '미생물 농약의 종류와 활용을 설명하시오.', '식물추출물 농약을 설명하시오.', '페로몬 트랩 활용을 설명하시오.', '황색 끈끈이 트랩 활용을 설명하시오.', '물리적 방제법을 설명하시오.', '경종적 방제법을 설명하시오.', '윤작을 통한 병해충 관리를 설명하시오.', '저항성 품종 활용을 설명하시오.']},
    { id: 'certification', title: '인증제도', icon: '📜', questions: ['친환경농산물 인증제도를 설명하시오.', '유기농산물 인증기준을 설명하시오.', '무농약농산물 인증기준을 설명하시오.', '전환기간의 개념과 기준을 설명하시오.', '인증심사 절차를 설명하시오.', '사후관리 제도를 설명하시오.', '인증표시 방법을 설명하시오.', '부정인증 처벌규정을 설명하시오.', '국제유기인증 동등성을 설명하시오.', 'GAP 인증과의 관계를 설명하시오.']},
    { id: 'livestock', title: '유기축산', icon: '🐄', questions: ['유기축산의 원칙을 설명하시오.', '유기축산물 인증기준을 설명하시오.', '유기사료 급여기준을 설명하시오.', '유기축산 사육밀도 기준을 설명하시오.', '방목 기준을 설명하시오.', '항생제 사용제한을 설명하시오.', '동물복지와 유기축산을 설명하시오.', '유기양봉 기준을 설명하시오.', '유기축산물 가공기준을 설명하시오.', '유기축산 전환기간을 설명하시오.']},
    { id: 'management', title: '농장관리', icon: '🏡', questions: ['유기농장 계획수립을 설명하시오.', '투입자재 기록관리를 설명하시오.', '포장(필지)별 관리기록을 설명하시오.', '수확물 관리기록을 설명하시오.', '완충지대 설정을 설명하시오.', '오염방지 조치를 설명하시오.', '종자 및 종묘 관리를 설명하시오.', '유기농 자재 선택 기준을 설명하시오.', '인증심사 대비 서류관리를 설명하시오.', '경영분석과 개선을 설명하시오.']},
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🌾</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">유기농업일반</h1><p className="text-gray-600">유기농업의 원리와 실제</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 유기농업일반 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 유기농업의 원리와 철학 이해</li><li>• 친환경 인증제도 세부기준 숙지</li><li>• 생물적 병해충 관리 방법 파악</li><li>• 농장관리 기록 작성법 학습</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 유기농업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 유기농업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 유기농업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
