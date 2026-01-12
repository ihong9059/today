'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReproductionPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('livestock-tech-reproduction-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('livestock-tech-reproduction-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'male', title: '수컷 생식기', icon: '♂️', questions: ['정소의 구조를 설명하시오.', '정자형성을 설명하시오.', '정자의 구조를 설명하시오.', '부생식선을 설명하시오.', '정액의 성분을 설명하시오.', '정자 운동성을 설명하시오.', '사정과정을 설명하시오.', '테스토스테론을 설명하시오.', '성적 성숙을 설명하시오.', '수컷 불임을 설명하시오.']},
    { id: 'female', title: '암컷 생식기', icon: '♀️', questions: ['난소의 구조를 설명하시오.', '난포 발육을 설명하시오.', '배란을 설명하시오.', '황체를 설명하시오.', '난관의 기능을 설명하시오.', '자궁의 구조를 설명하시오.', '발정주기를 설명하시오.', '에스트로겐을 설명하시오.', '프로게스테론을 설명하시오.', '암컷 불임을 설명하시오.']},
    { id: 'fertilization', title: '수정과 임신', icon: '🔬', questions: ['수정과정을 설명하시오.', '정자 수정능획득을 설명하시오.', '첨체반응을 설명하시오.', '착상을 설명하시오.', '태반의 기능을 설명하시오.', '태아 발육을 설명하시오.', '임신 유지를 설명하시오.', '임신진단을 설명하시오.', '임신기간을 설명하시오.', '쌍태임신을 설명하시오.']},
    { id: 'parturition', title: '분만과 비유', icon: '🍼', questions: ['분만 징후를 설명하시오.', '분만과정을 설명하시오.', '분만호르몬을 설명하시오.', '난산을 설명하시오.', '후산처리를 설명하시오.', '유선의 구조를 설명하시오.', '비유생리를 설명하시오.', '초유의 특성을 설명하시오.', '비유곡선을 설명하시오.', '건유를 설명하시오.']},
    { id: 'technology', title: '번식기술', icon: '💉', questions: ['인공수정의 장점을 설명하시오.', '정액 채취를 설명하시오.', '정액 희석을 설명하시오.', '정액 보존을 설명하시오.', '수정적기를 설명하시오.', '발정동기화를 설명하시오.', '수정란이식을 설명하시오.', '발정발견을 설명하시오.', '번식장애를 설명하시오.', '번식효율을 설명하시오.']},
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🐄</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">가축번식생리학</h1><p className="text-gray-600">번식과 생리 기초</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 가축번식생리학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 생식기관 구조와 기능 이해</li><li>• 발정주기와 호르몬 파악</li><li>• 수정과 임신과정 학습</li><li>• 번식기술 기초 숙지</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 축산산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 축산산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 축산산업기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
