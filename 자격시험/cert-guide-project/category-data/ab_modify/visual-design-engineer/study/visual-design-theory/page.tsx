'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VisualDesignTheoryPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('visual-engineer-theory-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('visual-engineer-theory-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basics', title: '디자인 기초', icon: '🎨', questions: ['디자인의 정의를 설명하시오.', '시각디자인의 영역을 설명하시오.', '시각 커뮤니케이션을 설명하시오.', '조형의 요소를 설명하시오.', '조형의 원리를 설명하시오.', '게슈탈트 이론을 설명하시오.', '시지각 원리를 설명하시오.', '형과 형태를 설명하시오.', '공간과 구도를 설명하시오.', '시각적 위계를 설명하시오.']},
    { id: 'history', title: '디자인사', icon: '📜', questions: ['아르누보를 설명하시오.', '바우하우스를 설명하시오.', '아르데코를 설명하시오.', '국제주의 양식을 설명하시오.', '스위스 디자인을 설명하시오.', '팝아트를 설명하시오.', '포스트모더니즘을 설명하시오.', '미니멀리즘을 설명하시오.', '구성주의를 설명하시오.', '데스틸을 설명하시오.']},
    { id: 'visual-comm', title: '시각전달', icon: '👁️', questions: ['CI를 설명하시오.', 'BI를 설명하시오.', '브랜드 아이덴티티를 설명하시오.', '로고타입을 설명하시오.', '심볼마크를 설명하시오.', '픽토그램을 설명하시오.', '사인시스템을 설명하시오.', '인포그래픽을 설명하시오.', '아이콘을 설명하시오.', '시각 기호를 설명하시오.']},
    { id: 'media', title: '미디어 디자인', icon: '📱', questions: ['인쇄매체를 설명하시오.', '영상매체를 설명하시오.', '디지털매체를 설명하시오.', '멀티미디어를 설명하시오.', 'UI디자인을 설명하시오.', 'UX디자인을 설명하시오.', '인터랙션 디자인을 설명하시오.', '모션그래픽을 설명하시오.', '웹디자인을 설명하시오.', '앱디자인을 설명하시오.']},
    { id: 'process', title: '디자인 프로세스', icon: '⚙️', questions: ['디자인 프로세스를 설명하시오.', '디자인 리서치를 설명하시오.', '콘셉트 개발을 설명하시오.', '아이데이션을 설명하시오.', '스케치와 시안을 설명하시오.', '프로토타입을 설명하시오.', '디자인 평가를 설명하시오.', '디자인 프레젠테이션을 설명하시오.', '디자인 매니지먼트를 설명하시오.', '디자인 저작권을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/design/visual-design-engineer" className="text-pink-700 hover:text-pink-900 flex items-center gap-2">← 시각디자인기사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-3xl">👁️</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">시각디자인론</h1><p className="text-gray-600">시각디자인 이론과 원리</p></div>
            <div className="text-right"><p className="text-sm text-gray-500">진행률</p><p className="text-2xl font-bold text-pink-600">{completedCount}/{totalQuestions}</p></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-pink-500 to-rose-600 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} /></div>
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
                {expandedTopics[topic.id] && (<div className="px-6 pb-6 space-y-3">{topic.questions.map((question, idx) => { const isCompleted = completedQuestions[`${topic.id}-${idx}`]; return (<div key={idx} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'border-pink-300 bg-pink-50' : 'border-gray-200 hover:border-pink-300'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, idx)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'border-pink-500 bg-pink-500 text-white' : 'border-gray-300 hover:border-pink-400'}`}>{isCompleted && '✓'}</button><div className="flex-1"><p className={`${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>{idx + 1}. {question}</p><button onClick={() => handleAIClick(question)} className="mt-2 text-sm text-pink-600 hover:text-pink-800 font-medium">🤖 AI에게 물어보기</button></div></div></div>); })}</div>)}
              </div>
            );
          })}
        </div>
        <div className="mt-8 bg-pink-50 rounded-2xl p-6"><h3 className="font-bold text-pink-800 mb-3">📖 시각디자인론 학습 가이드</h3><ul className="text-sm text-pink-700 space-y-2"><li>• 디자인 기초 원리 이해</li><li>• 디자인사 주요 사조 파악</li><li>• 시각전달 요소 학습</li><li>• 디자인 프로세스 숙지</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 시각디자인기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 시각디자인기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 시각디자인기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
