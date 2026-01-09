'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TypographyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('visual-engineer-typo-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('visual-engineer-typo-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basics', title: '타이포 기초', icon: '✏️', questions: ['타이포그래피를 설명하시오.', '문자의 역사를 설명하시오.', '한글의 구조를 설명하시오.', '로마자의 구조를 설명하시오.', '서체의 분류를 설명하시오.', '세리프체를 설명하시오.', '산세리프체를 설명하시오.', '스크립트체를 설명하시오.', '디스플레이체를 설명하시오.', '본문체를 설명하시오.']},
    { id: 'anatomy', title: '문자 해부학', icon: '🔍', questions: ['베이스라인을 설명하시오.', 'x-height를 설명하시오.', '어센더를 설명하시오.', '디센더를 설명하시오.', '캡하이트를 설명하시오.', '카운터를 설명하시오.', '스템을 설명하시오.', '볼을 설명하시오.', '터미널을 설명하시오.', '브라켓을 설명하시오.']},
    { id: 'spacing', title: '자간과 행간', icon: '📏', questions: ['자간을 설명하시오.', '커닝을 설명하시오.', '트래킹을 설명하시오.', '행간을 설명하시오.', '리딩을 설명하시오.', '어간을 설명하시오.', '단락을 설명하시오.', '정렬방식을 설명하시오.', '들여쓰기를 설명하시오.', '하이픈을 설명하시오.']},
    { id: 'layout', title: '편집디자인', icon: '📐', questions: ['편집디자인을 설명하시오.', '그리드시스템을 설명하시오.', '마진을 설명하시오.', '단을 설명하시오.', '판면을 설명하시오.', '레이아웃을 설명하시오.', '화이트스페이스를 설명하시오.', '시선의 흐름을 설명하시오.', '시각적 위계를 설명하시오.', '가독성을 설명하시오.']},
    { id: 'digital', title: '디지털 타이포', icon: '💻', questions: ['웹폰트를 설명하시오.', '가변폰트를 설명하시오.', '픽셀폰트를 설명하시오.', '안티앨리어싱을 설명하시오.', '힌팅을 설명하시오.', '폰트 포맷을 설명하시오.', 'OTF와 TTF를 설명하시오.', 'WOFF를 설명하시오.', '폰트 라이선스를 설명하시오.', '반응형 타이포를 설명하시오.']},
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
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-3xl">✏️</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">타이포그래피</h1><p className="text-gray-600">문자디자인과 편집</p></div>
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
        <div className="mt-8 bg-pink-50 rounded-2xl p-6"><h3 className="font-bold text-pink-800 mb-3">📖 타이포그래피 학습 가이드</h3><ul className="text-sm text-pink-700 space-y-2"><li>• 서체 분류와 특징 이해</li><li>• 문자 구조 용어 파악</li><li>• 자간/행간 조절 원리 학습</li><li>• 편집디자인 기법 숙지</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 시각디자인기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 시각디자인기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 시각디자인기사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
