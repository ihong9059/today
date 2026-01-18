'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function Local7LocalAdminPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('local7-localadmin-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('local7-localadmin-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basic', title: '지방자치의 기초', icon: '🏛️', questions: ['지방자치의 개념과 본질에 대해 설명하시오.', '주민자치와 단체자치를 비교 설명하시오.', '지방자치의 구성요소(주민, 구역, 자치권)를 설명하시오.', '지방자치의 필요성과 가치를 논하시오.', '지방분권의 개념과 유형을 설명하시오.', '중앙집권과 지방분권의 장단점을 비교하시오.', '보충성의 원칙(subsidiarity)에 대해 설명하시오.', '지방자치와 민주주의의 관계를 논하시오.', '우리나라 지방자치의 역사와 발전과정을 설명하시오.', '지방자치법의 구조와 주요 내용을 설명하시오.']},
    { id: 'organization', title: '지방자치단체 조직', icon: '🏢', questions: ['지방자치단체의 종류(광역, 기초)를 설명하시오.', '특별지방자치단체의 유형과 특징을 설명하시오.', '지방자치단체의 기관구성 형태를 비교하시오.', '지방의회의 권한과 역할에 대해 설명하시오.', '지방의회 의원의 지위와 의무를 설명하시오.', '지방자치단체장의 권한과 역할을 설명하시오.', '지방자치단체장의 선거와 임기를 설명하시오.', '지방의회와 집행기관의 관계를 설명하시오.', '지방공무원제도의 특성을 설명하시오.', '지방자치단체의 사무 범위를 설명하시오.']},
    { id: 'resident', title: '주민참여', icon: '👥', questions: ['주민투표제도의 의의와 유형을 설명하시오.', '주민발의제도(조례 제정·개폐 청구)를 설명하시오.', '주민소환제도의 요건과 절차를 설명하시오.', '주민감사청구제도를 설명하시오.', '주민소송제도의 의의와 절차를 설명하시오.', '주민참여예산제도의 개념과 운영을 설명하시오.', '청원제도와 민원제도를 비교하시오.', '공청회와 주민설명회를 비교 설명하시오.', '주민자치회의 역할과 기능을 설명하시오.', '지역사회 거버넌스의 개념과 유형을 설명하시오.']},
    { id: 'finance', title: '지방재정', icon: '💰', questions: ['지방재정의 의의와 특성을 설명하시오.', '지방세의 종류와 체계를 설명하시오.', '지방교부세의 종류와 배분방식을 설명하시오.', '국고보조금의 유형과 특성을 설명하시오.', '지방채의 발행과 관리를 설명하시오.', '지방예산의 편성과 심의 과정을 설명하시오.', '지방결산제도의 절차를 설명하시오.', '지방재정 건전성 확보 방안을 논하시오.', '지방재정 조정제도의 필요성을 설명하시오.', '지방공기업의 유형과 운영을 설명하시오.']},
    { id: 'relation', title: '정부간 관계', icon: '🤝', questions: ['중앙정부와 지방정부의 관계 유형을 설명하시오.', '지방자치단체에 대한 국가의 관여를 설명하시오.', '지방자치단체 간 협력 방식을 설명하시오.', '광역행정의 필요성과 방식을 설명하시오.', '지방자치단체조합의 유형과 운영을 설명하시오.', '특별지방자치단체의 설립과 운영을 설명하시오.', '갈등조정제도의 유형을 설명하시오.', '사무배분의 원칙과 기준을 설명하시오.', '지방이양사업의 현황과 과제를 논하시오.', '지방자치 분쟁해결 절차를 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/civil/local-civil-7" className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2">← 지방직 7급으로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-3xl">🏘️</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">지방자치론</h1><p className="text-gray-600">지방자치제도, 주민참여, 지방재정</p></div>
            <div className="text-right"><p className="text-sm text-gray-500">진행률</p><p className="text-2xl font-bold text-emerald-600">{completedCount}/{totalQuestions}</p></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} /></div>
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
                {expandedTopics[topic.id] && (<div className="px-6 pb-6 space-y-3">{topic.questions.map((question, idx) => { const isCompleted = completedQuestions[`${topic.id}-${idx}`]; return (<div key={idx} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, idx)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-gray-300 hover:border-emerald-400'}`}>{isCompleted && '✓'}</button><div className="flex-1"><p className={`${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>{idx + 1}. {question}</p><button onClick={() => handleAIClick(question)} className="mt-2 text-sm text-emerald-600 hover:text-emerald-800 font-medium">🤖 AI에게 물어보기</button></div></div></div>); })}</div>)}
              </div>
            );
          })}
        </div>
        <div className="mt-8 bg-emerald-50 rounded-2xl p-6"><h3 className="font-bold text-emerald-800 mb-3">📖 지방자치론 학습 가이드</h3><ul className="text-sm text-emerald-700 space-y-2"><li>• 지방자치법 개정 내용 반드시 숙지</li><li>• 주민참여제도(주민투표, 주민소환, 주민소송) 핵심</li><li>• 지방재정 관련 제도 이해 필수</li><li>• 최신 지방분권 정책 동향 파악</li><li>• 지방직 특화 과목으로 점수 확보 유리</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 지방직 7급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 지방직 7급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 지방직 7급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
