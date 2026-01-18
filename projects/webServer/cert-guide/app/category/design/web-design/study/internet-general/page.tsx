'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function InternetGeneralPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('webdesign-internet-general-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('webdesign-internet-general-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'network', title: '네트워크 기초', icon: '🌐', questions: ['인터넷의 정의를 설명하시오.', 'TCP/IP를 설명하시오.', 'IP주소를 설명하시오.', 'DNS를 설명하시오.', 'HTTP를 설명하시오.', 'HTTPS를 설명하시오.', 'FTP를 설명하시오.', 'URL을 설명하시오.', '도메인을 설명하시오.', '호스팅을 설명하시오.']},
    { id: 'web-tech', title: '웹 기술', icon: '💻', questions: ['웹브라우저를 설명하시오.', '웹서버를 설명하시오.', '클라이언트-서버를 설명하시오.', '정적웹페이지를 설명하시오.', '동적웹페이지를 설명하시오.', 'CGI를 설명하시오.', 'API를 설명하시오.', 'REST를 설명하시오.', '쿠키를 설명하시오.', '세션을 설명하시오.']},
    { id: 'web-standard', title: '웹 표준', icon: '📋', questions: ['웹표준을 설명하시오.', 'W3C를 설명하시오.', 'DOCTYPE을 설명하시오.', '웹접근성을 설명하시오.', 'WCAG를 설명하시오.', '크로스브라우징을 설명하시오.', '시멘틱웹을 설명하시오.', '반응형웹을 설명하시오.', '모바일퍼스트를 설명하시오.', 'SEO를 설명하시오.']},
    { id: 'security', title: '웹 보안', icon: '🔒', questions: ['웹보안의 중요성을 설명하시오.', 'XSS를 설명하시오.', 'SQL인젝션을 설명하시오.', 'CSRF를 설명하시오.', 'SSL인증서를 설명하시오.', '암호화를 설명하시오.', '방화벽을 설명하시오.', '개인정보보호를 설명하시오.', '인증과 인가를 설명하시오.', '보안취약점을 설명하시오.']},
    { id: 'multimedia', title: '멀티미디어', icon: '🎬', questions: ['멀티미디어를 설명하시오.', '이미지 파일형식을 설명하시오.', 'JPG와 PNG를 설명하시오.', 'GIF를 설명하시오.', 'SVG를 설명하시오.', '비디오 코덱을 설명하시오.', '오디오 파일형식을 설명하시오.', '스트리밍을 설명하시오.', '압축을 설명하시오.', '해상도를 설명하시오.']},
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
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center text-3xl">🌐</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">인터넷일반</h1><p className="text-gray-600">웹 기술과 표준</p></div>
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
        <div className="mt-8 bg-purple-50 rounded-2xl p-6"><h3 className="font-bold text-purple-800 mb-3">📖 인터넷일반 학습 가이드</h3><ul className="text-sm text-purple-700 space-y-2"><li>• 네트워크 기초 개념 이해</li><li>• 웹 기술과 프로토콜 파악</li><li>• 웹 표준과 접근성 학습</li><li>• 보안 기초 지식 숙지</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 웹디자인기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 웹디자인기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 웹디자인기능사 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
