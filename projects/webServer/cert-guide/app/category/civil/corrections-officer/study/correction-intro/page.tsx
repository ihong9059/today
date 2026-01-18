'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function CorrectionIntroPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('correction-intro-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('correction-intro-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'theory', title: '교정학 기초이론', icon: '📚', questions: ['교정의 개념과 목적에 대해 설명하시오.', '교정학의 학문적 성격과 연구대상을 설명하시오.', '형벌의 목적(응보주의, 예방주의)을 비교하시오.', '사회복귀(재사회화) 이념에 대해 논하시오.', '교정처우의 기본원칙을 설명하시오.', '수형자 권리의 제한과 보장을 설명하시오.', '교정시설의 역사적 발전과정을 설명하시오.', '교정행정의 조직과 체계를 설명하시오.', '교정공무원의 역할과 직무를 설명하시오.', '교정이념의 변화와 현대적 과제를 논하시오.']},
    { id: 'facility', title: '수용관리', icon: '🏢', questions: ['교정시설의 종류와 기능을 설명하시오.', '수용자의 분류제도에 대해 설명하시오.', '수용자 분류심사의 절차를 설명하시오.', '신입수용자의 처우와 관리를 설명하시오.', '수용거실의 종류와 운영을 설명하시오.', '계호의 개념과 원칙을 설명하시오.', '수용자의 급식과 의료처우를 설명하시오.', '수용자의 서신과 접견 제도를 설명하시오.', '규율과 징벌제도를 설명하시오.', '수용자 이송과 호송에 대해 설명하시오.']},
    { id: 'treatment', title: '교정처우', icon: '🔑', questions: ['교도작업의 의의와 종류를 설명하시오.', '직업훈련의 종류와 운영을 설명하시오.', '교정교육의 의의와 종류를 설명하시오.', '교화프로그램의 유형을 설명하시오.', '종교활동과 종교상담을 설명하시오.', '심리치료와 상담 프로그램을 설명하시오.', '가석방 제도의 요건과 절차를 설명하시오.', '사회 내 처우(보호관찰 등)를 설명하시오.', '전자감독제도에 대해 설명하시오.', '출소자 사회복귀 지원제도를 설명하시오.']},
    { id: 'special', title: '특별처우', icon: '👥', questions: ['여성수용자의 처우 특성을 설명하시오.', '소년수용자의 처우 특성을 설명하시오.', '노인수용자의 처우 특성을 설명하시오.', '외국인수용자의 처우 특성을 설명하시오.', '장애인수용자의 처우 특성을 설명하시오.', '정신질환 수용자의 처우를 설명하시오.', '사형확정자의 처우를 설명하시오.', '미결수용자의 처우를 설명하시오.', '무기수형자의 처우를 설명하시오.', '보호관찰대상자의 처우를 설명하시오.']},
    { id: 'law', title: '관련 법규', icon: '⚖️', questions: ['형의 집행 및 수용자의 처우에 관한 법률의 구조를 설명하시오.', '수용자의 권리와 의무를 설명하시오.', '교정시설 내 인권보장 규정을 설명하시오.', '징벌의 종류와 절차를 설명하시오.', '청원과 고충처리 제도를 설명하시오.', '보호장비의 사용요건을 설명하시오.', '무기사용의 요건과 한계를 설명하시오.', '보안관리와 감시에 관한 규정을 설명하시오.', '교정관련 판례의 동향을 설명하시오.', '교정제도의 개선 과제를 논하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-zinc-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/civil/corrections-officer" className="text-slate-600 hover:text-slate-800 flex items-center gap-2">← 교정직 공무원으로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-zinc-700 rounded-2xl flex items-center justify-center text-3xl">🔒</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">교정학개론</h1><p className="text-gray-600">교정이론, 수용관리, 교정처우</p></div>
            <div className="text-right"><p className="text-sm text-gray-500">진행률</p><p className="text-2xl font-bold text-slate-600">{completedCount}/{totalQuestions}</p></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-slate-600 to-zinc-700 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} /></div>
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
                {expandedTopics[topic.id] && (<div className="px-6 pb-6 space-y-3">{topic.questions.map((question, idx) => { const isCompleted = completedQuestions[`${topic.id}-${idx}`]; return (<div key={idx} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'border-slate-300 bg-slate-50' : 'border-gray-200 hover:border-slate-300'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, idx)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'border-slate-500 bg-slate-500 text-white' : 'border-gray-300 hover:border-slate-400'}`}>{isCompleted && '✓'}</button><div className="flex-1"><p className={`${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>{idx + 1}. {question}</p><button onClick={() => handleAIClick(question)} className="mt-2 text-sm text-slate-600 hover:text-slate-800 font-medium">🤖 AI에게 물어보기</button></div></div></div>); })}</div>)}
              </div>
            );
          })}
        </div>
        <div className="mt-8 bg-slate-50 rounded-2xl p-6"><h3 className="font-bold text-slate-800 mb-3">📖 교정학개론 학습 가이드</h3><ul className="text-sm text-slate-700 space-y-2"><li>• 형집행법 조문과 연계하여 학습</li><li>• 수용자 분류, 처우 기준 철저히 암기</li><li>• 특별처우 대상자별 처우 특성 정리</li><li>• 최신 교정정책과 제도 변화 확인</li><li>• 기출문제로 출제 경향 파악</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 교정직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 교정직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 교정직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
