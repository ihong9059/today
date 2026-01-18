'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function WebGraphicDesignPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('webdesign-web-graphic-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('webdesign-web-graphic-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'html', title: 'HTML', icon: '📄', questions: ['HTML의 정의를 설명하시오.', 'HTML5를 설명하시오.', '시멘틱태그를 설명하시오.', 'head태그를 설명하시오.', 'body태그를 설명하시오.', 'div와 span을 설명하시오.', '테이블태그를 설명하시오.', '폼태그를 설명하시오.', '링크태그를 설명하시오.', '이미지태그를 설명하시오.']},
    { id: 'css', title: 'CSS', icon: '🎨', questions: ['CSS의 정의를 설명하시오.', '선택자를 설명하시오.', '클래스와 아이디를 설명하시오.', '박스모델을 설명하시오.', 'margin과 padding을 설명하시오.', 'display속성을 설명하시오.', 'position속성을 설명하시오.', 'float를 설명하시오.', 'flexbox를 설명하시오.', 'grid를 설명하시오.']},
    { id: 'javascript', title: 'JavaScript 기초', icon: '⚙️', questions: ['JavaScript의 정의를 설명하시오.', '변수선언을 설명하시오.', '함수를 설명하시오.', '이벤트를 설명하시오.', 'DOM을 설명하시오.', '조건문을 설명하시오.', '반복문을 설명하시오.', '배열을 설명하시오.', '객체를 설명하시오.', 'jQuery를 설명하시오.']},
    { id: 'uiux', title: 'UI/UX', icon: '📱', questions: ['UI를 설명하시오.', 'UX를 설명하시오.', '사용성을 설명하시오.', '와이어프레임을 설명하시오.', '프로토타입을 설명하시오.', '인터랙션디자인을 설명하시오.', '정보구조를 설명하시오.', '네비게이션을 설명하시오.', 'CTA버튼을 설명하시오.', '사용자테스트를 설명하시오.']},
    { id: 'responsive', title: '반응형 웹', icon: '💻', questions: ['반응형웹을 설명하시오.', '미디어쿼리를 설명하시오.', '뷰포트를 설명하시오.', '브레이크포인트를 설명하시오.', '유동형레이아웃을 설명하시오.', '유동형이미지를 설명하시오.', '모바일퍼스트를 설명하시오.', 'em과 rem을 설명하시오.', 'vw와 vh를 설명하시오.', '적응형웹을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/design/web-design" className="text-purple-700 hover:text-purple-900 flex items-center gap-2">← 웹디자인기능사로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center text-3xl">💻</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">웹그래픽디자인</h1><p className="text-gray-600">웹 디자인 실무</p></div>
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
        <div className="mt-8 bg-purple-50 rounded-2xl p-6"><h3 className="font-bold text-purple-800 mb-3">📖 웹그래픽디자인 학습 가이드</h3><ul className="text-sm text-purple-700 space-y-2"><li>• HTML5 시멘틱 태그 이해</li><li>• CSS 레이아웃 기법 학습</li><li>• JavaScript 기초 문법 파악</li><li>• 반응형 웹 구현 연습</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 웹디자인기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 웹디자인기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 웹디자인기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
