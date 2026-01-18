'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function FireLawPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('fire-law-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('fire-law-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'basic-law', title: '소방기본법', icon: '📜', questions: ['소방기본법의 목적과 기본이념을 설명하시오.', '소방기관의 설치와 소방업무의 범위를 설명하시오.', '소방력의 기준과 소방장비의 분류를 설명하시오.', '화재의 예방조치와 소방특별조사를 설명하시오.', '소방활동에 대한 소방대상물 조사를 설명하시오.', '화재경계지구의 지정과 관리를 설명하시오.', '소방용수시설의 설치와 관리를 설명하시오.', '소방활동구역의 설정과 출입제한을 설명하시오.', '강제처분(피난명령, 소방용수 등)을 설명하시오.', '소방활동 방해행위의 금지를 설명하시오.']},
    { id: 'facility-law', title: '소방시설법', icon: '🏢', questions: ['소방시설법의 목적과 적용범위를 설명하시오.', '특정소방대상물의 분류와 범위를 설명하시오.', '소방시설의 설치·유지 기준을 설명하시오.', '소방시설 자체점검의 종류와 시기를 설명하시오.', '소방안전관리자의 선임과 업무를 설명하시오.', '소방안전관리대상물의 분류를 설명하시오.', '방염의 대상물과 방염성능기준을 설명하시오.', '소방시설관리업의 등록과 업무를 설명하시오.', '소방용품의 형식승인과 검정을 설명하시오.', '소방시설 설치신고와 완공검사를 설명하시오.']},
    { id: 'danger-law', title: '위험물안전관리법', icon: '⚠️', questions: ['위험물안전관리법의 목적을 설명하시오.', '위험물의 분류(제1류~제6류)를 설명하시오.', '지정수량의 개념과 산정방법을 설명하시오.', '제조소등의 종류와 설치허가를 설명하시오.', '위험물 저장·취급의 기준을 설명하시오.', '위험물안전관리자의 선임과 업무를 설명하시오.', '위험물 운반·운송의 기준을 설명하시오.', '위험물제조소등의 정기점검을 설명하시오.', '예방규정의 작성과 제출을 설명하시오.', '위험물 취급자의 자격과 업무를 설명하시오.']},
    { id: 'rescue-law', title: '119구조구급법', icon: '🚑', questions: ['119구조구급법의 목적과 정의를 설명하시오.', '구조대와 구급대의 편성·운영을 설명하시오.', '구조·구급활동의 범위와 한계를 설명하시오.', '응급환자 이송의 원칙을 설명하시오.', '구급지도의사의 역할을 설명하시오.', '응급처치에 대한 면책규정을 설명하시오.', '구조·구급대원의 교육훈련을 설명하시오.', '구조·구급활동 기록의 관리를 설명하시오.', '항공구조구급활동의 특성을 설명하시오.', '수난구호활동의 범위를 설명하시오.']},
    { id: 'other-law', title: '기타 소방관계법', icon: '📋', questions: ['다중이용업소 안전관리법의 주요 내용을 설명하시오.', '다중이용업소의 범위와 안전시설을 설명하시오.', '초고층 및 지하연계 복합건축물 관리법을 설명하시오.', '화재조사 및 보고규정의 내용을 설명하시오.', '화재의 원인조사와 피해조사를 설명하시오.', '소방시설공사업법의 주요 내용을 설명하시오.', '소방기술사 및 소방시설관리사 제도를 설명하시오.', '의용소방대 설치 및 운영에 관한 법률을 설명하시오.', '소방공무원법의 주요 내용을 설명하시오.', '소방산업의 진흥에 관한 법률을 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/civil/firefighter" className="text-red-600 hover:text-red-800 flex items-center gap-2">← 소방공무원으로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center text-3xl">📋</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">소방관계법규</h1><p className="text-gray-600">소방기본법, 소방시설법, 위험물법</p></div>
            <div className="text-right"><p className="text-sm text-gray-500">진행률</p><p className="text-2xl font-bold text-red-600">{completedCount}/{totalQuestions}</p></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-red-500 to-orange-600 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} /></div>
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
                {expandedTopics[topic.id] && (<div className="px-6 pb-6 space-y-3">{topic.questions.map((question, idx) => { const isCompleted = completedQuestions[`${topic.id}-${idx}`]; return (<div key={idx} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, idx)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'border-red-500 bg-red-500 text-white' : 'border-gray-300 hover:border-red-400'}`}>{isCompleted && '✓'}</button><div className="flex-1"><p className={`${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>{idx + 1}. {question}</p><button onClick={() => handleAIClick(question)} className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium">🤖 AI에게 물어보기</button></div></div></div>); })}</div>)}
              </div>
            );
          })}
        </div>
        <div className="mt-8 bg-red-50 rounded-2xl p-6"><h3 className="font-bold text-red-800 mb-3">📖 소방관계법규 학습 가이드</h3><ul className="text-sm text-red-700 space-y-2"><li>• 소방기본법, 소방시설법 조문 철저히 암기</li><li>• 위험물 분류(1~6류)와 지정수량 필수 암기</li><li>• 최신 법령 개정사항 반드시 확인</li><li>• 소방안전관리자 관련 규정 중점 학습</li><li>• 벌칙 규정과 행정처분 기준 정리</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 소방공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 소방공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 소방공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
