'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ConstitutionalPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('police-constitutional-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('police-constitutional-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'general', title: '헌법총론', icon: '📜', questions: ['헌법의 의의와 특성에 대해 설명하시오.', '헌법의 해석 방법과 원칙을 설명하시오.', '헌법 개정의 한계에 대해 논하시오.', '대한민국의 국가형태와 구성요소를 설명하시오.', '국민주권주의의 의의와 내용을 설명하시오.', '법치주의의 의의와 내용을 설명하시오.', '권력분립의 원리와 현대적 변용을 설명하시오.', '정당제도의 헌법적 보장을 설명하시오.', '선거제도의 원칙과 종류를 설명하시오.', '헌법의 기본질서(민주적 기본질서)를 설명하시오.']},
    { id: 'rights-general', title: '기본권 총론', icon: '⚖️', questions: ['기본권의 의의와 법적 성격을 설명하시오.', '기본권의 주체(국민, 외국인, 법인)를 설명하시오.', '기본권의 효력(대국가적, 대사인적)을 설명하시오.', '기본권의 경합과 충돌을 설명하시오.', '기본권 제한의 일반원칙(제37조 제2항)을 설명하시오.', '과잉금지원칙의 내용을 설명하시오.', '본질적 내용 침해금지 원칙을 설명하시오.', '기본권 침해에 대한 구제방법을 설명하시오.', '국가의 기본권 보호의무를 설명하시오.', '제도적 보장과 기본권의 관계를 설명하시오.']},
    { id: 'rights-types', title: '기본권 각론', icon: '🛡️', questions: ['인간의 존엄과 가치, 행복추구권을 설명하시오.', '평등권의 의의와 심사기준을 설명하시오.', '신체의 자유와 그 보장을 설명하시오.', '표현의 자유의 내용과 한계를 설명하시오.', '집회·결사의 자유의 보장과 제한을 설명하시오.', '종교의 자유와 정교분리원칙을 설명하시오.', '재산권의 보장과 제한을 설명하시오.', '직업선택의 자유의 내용과 제한을 설명하시오.', '청구권적 기본권의 종류와 내용을 설명하시오.', '사회적 기본권의 법적 성격을 설명하시오.']},
    { id: 'government', title: '통치구조 기초', icon: '🏛️', questions: ['국회의 헌법상 지위와 기능을 설명하시오.', '국회의 구성과 조직을 설명하시오.', '국회의 입법권의 범위와 한계를 설명하시오.', '국회의 재정에 관한 권한을 설명하시오.', '국회의 국정통제권을 설명하시오.', '국회의원의 특권과 의무를 설명하시오.', '대통령의 헌법상 지위와 신분을 설명하시오.', '대통령의 권한과 책임을 설명하시오.', '국무총리와 국무위원의 지위를 설명하시오.', '감사원의 헌법상 지위와 권한을 설명하시오.']},
    { id: 'judiciary', title: '사법부·헌법재판', icon: '👨‍⚖️', questions: ['사법권 독립의 의의와 내용을 설명하시오.', '법원의 조직과 권한을 설명하시오.', '대법원의 헌법상 지위와 권한을 설명하시오.', '명령·규칙 심사권에 대해 설명하시오.', '헌법재판소의 헌법상 지위와 구성을 설명하시오.', '위헌법률심판의 요건과 효력을 설명하시오.', '헌법소원심판의 유형과 요건을 설명하시오.', '권한쟁의심판의 당사자와 대상을 설명하시오.', '탄핵심판의 절차와 효력을 설명하시오.', '정당해산심판에 대해 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/civil/police-officer" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">← 경찰공무원(순경)으로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl">📜</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">헌법</h1><p className="text-gray-600">헌법총론, 기본권, 통치구조</p></div>
            <div className="text-right"><p className="text-sm text-gray-500">진행률</p><p className="text-2xl font-bold text-blue-600">{completedCount}/{totalQuestions}</p></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} /></div>
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
                {expandedTopics[topic.id] && (<div className="px-6 pb-6 space-y-3">{topic.questions.map((question, idx) => { const isCompleted = completedQuestions[`${topic.id}-${idx}`]; return (<div key={idx} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, idx)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 hover:border-blue-400'}`}>{isCompleted && '✓'}</button><div className="flex-1"><p className={`${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>{idx + 1}. {question}</p><button onClick={() => handleAIClick(question)} className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">🤖 AI에게 물어보기</button></div></div></div>); })}</div>)}
              </div>
            );
          })}
        </div>
        <div className="mt-8 bg-blue-50 rounded-2xl p-6"><h3 className="font-bold text-blue-800 mb-3">📖 헌법 학습 가이드</h3><ul className="text-sm text-blue-700 space-y-2"><li>• 기본권 파트 비중이 가장 높음 - 집중 학습</li><li>• 헌법재판소 결정례 철저히 숙지</li><li>• 통치구조는 조문과 함께 학습</li><li>• 최신 헌법재판소 결정 동향 파악</li><li>• 경찰 관련 헌법 쟁점 정리</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 경찰공무원 순경 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 경찰공무원 순경 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 경찰공무원 순경 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
