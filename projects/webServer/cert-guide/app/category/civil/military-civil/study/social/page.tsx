'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function MilitarySocialPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('military-social-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('military-social-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'politics', title: '정치', icon: '🏛️', questions: ['민주정치의 기본 원리를 설명하시오.', '권력분립의 원리와 유형을 설명하시오.', '정부형태의 유형을 비교하시오.', '정당제도와 선거제도를 설명하시오.', '지방자치의 의의와 현황을 설명하시오.', '시민의 정치참여 방법을 설명하시오.', '국제정치의 행위자를 설명하시오.', '국제기구의 역할을 설명하시오.', '우리나라 헌법의 기본원리를 설명하시오.', '기본권의 종류와 제한을 설명하시오.']},
    { id: 'law', title: '법', icon: '⚖️', questions: ['법의 개념과 목적을 설명하시오.', '법의 분류 체계를 설명하시오.', '법의 효력과 적용을 설명하시오.', '권리와 의무의 개념을 설명하시오.', '민법의 기본원리를 설명하시오.', '물권과 채권을 비교하시오.', '형법의 기본원리를 설명하시오.', '죄형법정주의를 설명하시오.', '재판의 종류와 절차를 설명하시오.', '헌법소원제도를 설명하시오.']},
    { id: 'economy', title: '경제', icon: '📈', questions: ['경제체제의 유형을 비교하시오.', '시장경제의 원리를 설명하시오.', '수요와 공급의 법칙을 설명하시오.', '가격의 결정과 변동을 설명하시오.', '시장의 종류와 특징을 비교하시오.', '국민소득의 개념과 지표를 설명하시오.', '경기변동과 안정화 정책을 설명하시오.', '물가와 인플레이션을 설명하시오.', '실업의 유형과 대책을 설명하시오.', '무역과 환율의 관계를 설명하시오.']},
    { id: 'society', title: '사회·문화', icon: '🌍', questions: ['사회학의 주요 관점을 비교하시오.', '사회화의 의미와 과정을 설명하시오.', '사회집단의 유형을 분류하시오.', '사회조직의 특성을 설명하시오.', '일탈행동의 이론을 비교하시오.', '사회계층화의 이론을 설명하시오.', '사회이동의 유형을 설명하시오.', '사회변동의 요인과 양상을 설명하시오.', '문화의 속성과 기능을 설명하시오.', '다문화사회의 쟁점을 설명하시오.']},
    { id: 'current', title: '시사·일반', icon: '📰', questions: ['한반도 안보 환경의 변화를 설명하시오.', '남북관계의 역사와 현황을 설명하시오.', '한미동맹의 의의를 설명하시오.', '동북아 국제정세를 분석하시오.', '국방정책의 방향을 설명하시오.', '4차 산업혁명과 국방을 설명하시오.', '사이버 안보의 중요성을 설명하시오.', '국방개혁의 방향을 설명하시오.', '군무원의 역할과 사명을 설명하시오.', '공무원 윤리의 중요성을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/civil/military-civil" className="text-green-700 hover:text-green-900 flex items-center gap-2">← 군무원으로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🌍</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">사회</h1><p className="text-gray-600">법과 정치, 경제, 사회문화</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 사회 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 법과 정치, 경제 영역 균형 있게 학습</li><li>• 헌법 조문과 판례 핵심 암기</li><li>• 경제 그래프 해석 능력 배양</li><li>• 국방·안보 관련 시사 상식 필수</li><li>• 사회문화 통계 자료 분석 연습</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 군무원 9급 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 군무원 9급 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 군무원 9급 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
