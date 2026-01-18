'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function DesignMaterialPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('cg-design-material-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('cg-design-material-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'material', title: '재료의 특성', icon: '📐', questions: ['종이의 종류를 설명하시오.', '종이의 규격을 설명하시오.', '인쇄용지를 설명하시오.', '특수지를 설명하시오.', '합성수지를 설명하시오.', '금속재료를 설명하시오.', '목재를 설명하시오.', '유리재료를 설명하시오.', '섬유재료를 설명하시오.', '친환경 재료를 설명하시오.']},
    { id: 'printing', title: '인쇄', icon: '🖨️', questions: ['볼록판 인쇄를 설명하시오.', '오목판 인쇄를 설명하시오.', '평판 인쇄를 설명하시오.', '공판 인쇄를 설명하시오.', '옵셋 인쇄를 설명하시오.', '그라비어 인쇄를 설명하시오.', '스크린 인쇄를 설명하시오.', '디지털 인쇄를 설명하시오.', '특수 인쇄를 설명하시오.', '후가공을 설명하시오.']},
    { id: 'technique', title: '표현기법', icon: '✏️', questions: ['드로잉 기법을 설명하시오.', '스케치를 설명하시오.', '마카 렌더링을 설명하시오.', '에어브러시를 설명하시오.', '콜라주를 설명하시오.', '스텐실을 설명하시오.', '프로타주를 설명하시오.', '마블링을 설명하시오.', '스크래치를 설명하시오.', '믹스미디어를 설명하시오.']},
    { id: 'output', title: '출력', icon: '📄', questions: ['해상도를 설명하시오.', 'DPI를 설명하시오.', 'PPI를 설명하시오.', 'LPI를 설명하시오.', '망점을 설명하시오.', '분판출력을 설명하시오.', '트래핑을 설명하시오.', '오버프린트를 설명하시오.', '도련을 설명하시오.', '출력교정을 설명하시오.']},
    { id: 'finishing', title: '후가공', icon: '✂️', questions: ['코팅을 설명하시오.', '박가공을 설명하시오.', '엠보싱을 설명하시오.', '형압가공을 설명하시오.', '다이컷팅을 설명하시오.', '제본방식을 설명하시오.', '중철제본을 설명하시오.', '무선제본을 설명하시오.', 'UV코팅을 설명하시오.', '라미네이팅을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/design/computer-graphics" className="text-purple-700 hover:text-purple-900 flex items-center gap-2">← 컴퓨터그래픽스운용기능사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center text-3xl">📐</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">디자인재료</h1><p className="text-gray-600">재료와 표현기법</p></div>
            <div className="text-right"><p className="text-sm text-gray-500">진행률</p><p className="text-2xl font-bold text-purple-600">{completedCount}/{totalQuestions}</p></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-purple-600 to-indigo-700 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} /></div>
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
                {expandedTopics[topic.id] && (<div className="px-6 pb-6 space-y-3">{topic.questions.map((question, idx) => { const isCompleted = completedQuestions[`${topic.id}-${idx}`]; return (<div key={idx} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, idx)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'border-purple-500 bg-purple-500 text-white' : 'border-gray-300 hover:border-purple-400'}`}>{isCompleted && '✓'}</button><div className="flex-1"><p className={`${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>{idx + 1}. {question}</p><button onClick={() => handleAIClick(question)} className="mt-2 text-sm text-purple-600 hover:text-purple-800 font-medium">🤖 AI에게 물어보기</button></div></div></div>); })}</div>)}
              </div>
            );
          })}
        </div>
        <div className="mt-8 bg-purple-50 rounded-2xl p-6"><h3 className="font-bold text-purple-800 mb-3">📖 디자인재료 학습 가이드</h3><ul className="text-sm text-purple-700 space-y-2"><li>• 다양한 재료의 특성 이해</li><li>• 인쇄방식별 특징 파악</li><li>• 표현기법 학습</li><li>• 출력 및 후가공 숙지</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 컴퓨터그래픽스운용기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 컴퓨터그래픽스운용기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 컴퓨터그래픽스운용기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
