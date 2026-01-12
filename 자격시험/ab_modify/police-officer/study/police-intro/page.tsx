'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PoliceIntroPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('police-intro-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('police-intro-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basics', title: '경찰학 총론', icon: '👮', questions: ['경찰의 개념과 역할에 대해 설명하시오.', '대륙법계 경찰과 영미법계 경찰을 비교하시오.', '형식적 의미의 경찰과 실질적 의미의 경찰을 구분하시오.', '경찰의 기본적 임무와 목적에 대해 논하시오.', '경찰권의 법적 근거와 한계를 설명하시오.', '경찰법의 법원(성문법, 불문법)을 설명하시오.', '경찰비례의 원칙(과잉금지)을 설명하시오.', '경찰공공의 원칙에 대해 설명하시오.', '경찰책임의 원칙과 예외를 설명하시오.', '경찰권 남용의 유형과 통제 방법을 논하시오.']},
    { id: 'organization', title: '경찰조직론', icon: '🏢', questions: ['경찰청의 조직 구조와 기능을 설명하시오.', '시·도경찰청의 조직과 역할을 설명하시오.', '경찰서 및 지구대·파출소의 기능을 설명하시오.', '경찰위원회의 역할과 기능을 설명하시오.', '자치경찰제도의 의의와 특징을 설명하시오.', '경찰인사제도(채용, 승진, 전보)를 설명하시오.', '경찰공무원의 권리와 의무를 설명하시오.', '경찰조직의 계급 체계를 설명하시오.', '경찰교육훈련 제도에 대해 설명하시오.', '국가경찰과 자치경찰의 관계를 논하시오.']},
    { id: 'prevention', title: '범죄예방론', icon: '🛡️', questions: ['범죄예방의 개념과 중요성을 설명하시오.', '환경설계를 통한 범죄예방(CPTED)을 설명하시오.', '지역사회 경찰활동(COP)의 개념과 특성을 논하시오.', '순찰활동의 유형과 효과를 설명하시오.', '범죄예방 진단제도에 대해 설명하시오.', '청소년 비행 예방 활동에 대해 논하시오.', '가정폭력 예방 및 대응에 대해 설명하시오.', '학교폭력 예방과 경찰의 역할을 설명하시오.', '다문화 치안정책에 대해 설명하시오.', '범죄피해자 보호제도를 설명하시오.']},
    { id: 'security', title: '경비경호론', icon: '🚔', questions: ['경비업법의 주요 내용을 설명하시오.', '경호의 개념과 원칙을 설명하시오.', '청원경찰제도에 대해 설명하시오.', '집회·시위 관리의 원칙을 설명하시오.', '다중범죄 진압의 원칙과 방법을 논하시오.', '대테러 활동의 개념과 방법을 설명하시오.', '요인경호의 원칙과 방법을 설명하시오.', '경호작용의 법적 근거를 설명하시오.', '재난관리에서 경찰의 역할을 설명하시오.', '국가중요시설 경비에 대해 설명하시오.']},
    { id: 'investigation', title: '수사론', icon: '🔍', questions: ['수사의 개념과 기본원칙을 설명하시오.', '수사의 단서(고소, 고발, 자수 등)를 설명하시오.', '임의수사와 강제수사를 비교하시오.', '체포와 구속의 요건과 절차를 설명하시오.', '압수·수색의 요건과 절차를 설명하시오.', '과학수사의 개념과 방법을 설명하시오.', '디지털 포렌식의 개념과 절차를 설명하시오.', '범죄현장 조사 방법을 설명하시오.', '피의자 신문 기법에 대해 논하시오.', '수사권 조정의 내용과 의의를 설명하시오.']},
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
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl">👮</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">경찰학개론</h1><p className="text-gray-600">경찰행정, 범죄예방, 수사</p></div>
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
        <div className="mt-8 bg-blue-50 rounded-2xl p-6"><h3 className="font-bold text-blue-800 mb-3">📖 경찰학개론 학습 가이드</h3><ul className="text-sm text-blue-700 space-y-2"><li>• 경찰조직법과 경찰관직무집행법 조문 숙지</li><li>• 최신 경찰 정책과 제도 변화 확인</li><li>• 자치경찰제 관련 내용 중점 학습</li><li>• 수사권 조정 관련 개정 내용 반영</li><li>• 기출문제로 출제 경향 파악</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 경찰공무원 순경 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 경찰공무원 순경 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 경찰공무원 순경 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
