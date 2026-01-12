'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FireIntroPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('fire-intro-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('fire-intro-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'combustion', title: '연소이론', icon: '🔥', questions: ['연소의 정의와 3요소(연소의 삼각형)를 설명하시오.', '연소의 4요소(연소의 사면체)에 대해 설명하시오.', '인화점, 발화점, 연소점의 차이를 설명하시오.', '연소의 형태(표면연소, 분해연소, 증발연소)를 설명하시오.', '자연발화의 원인과 종류를 설명하시오.', '연소범위(폭발범위)의 개념과 영향 요인을 설명하시오.', '연소생성물(연기, 화염, 열)의 특성을 설명하시오.', '불완전연소와 완전연소를 비교하시오.', '연소속도에 영향을 미치는 요인을 설명하시오.', '가연물의 분류와 특성을 설명하시오.']},
    { id: 'fire', title: '화재이론', icon: '🏠', questions: ['화재의 정의와 분류(A, B, C, D, K급)를 설명하시오.', '화재의 진행과정(발화기, 성장기, 최성기, 감퇴기)을 설명하시오.', '플래시오버(flashover)의 개념과 발생 조건을 설명하시오.', '백드래프트(backdraft)의 개념과 징후를 설명하시오.', '롤오버(rollover)와 플레임오버를 설명하시오.', '화재 연기의 특성과 위험성을 설명하시오.', '건축물 화재의 특성을 설명하시오.', '위험물 화재의 특성과 대응방법을 설명하시오.', '전기화재의 원인과 특성을 설명하시오.', '차량 및 선박 화재의 특성을 설명하시오.']},
    { id: 'extinguish', title: '소화이론', icon: '🧯', questions: ['소화의 원리(냉각, 질식, 제거, 억제)를 설명하시오.', '소화약제의 종류와 특성을 설명하시오.', '물 소화약제의 소화원리와 적용을 설명하시오.', '포 소화약제의 종류와 소화원리를 설명하시오.', '이산화탄소 소화약제의 특성을 설명하시오.', '할로겐화합물 소화약제의 원리를 설명하시오.', '분말 소화약제의 종류와 적용을 설명하시오.', '청정소화약제의 종류와 특성을 설명하시오.', '소화약제 선택 기준을 설명하시오.', '소화기의 종류와 사용방법을 설명하시오.']},
    { id: 'facility', title: '소방시설', icon: '🚨', questions: ['소방시설의 분류체계를 설명하시오.', '소화설비의 종류와 기능을 설명하시오.', '스프링클러설비의 종류와 작동원리를 설명하시오.', '옥내소화전설비의 구성과 기능을 설명하시오.', '자동화재탐지설비의 구성요소를 설명하시오.', '감지기의 종류와 작동원리를 설명하시오.', '피난설비의 종류와 설치기준을 설명하시오.', '제연설비의 종류와 작동원리를 설명하시오.', '소화용수설비의 종류를 설명하시오.', '소화활동설비의 종류와 기능을 설명하시오.']},
    { id: 'disaster', title: '재난관리', icon: '🆘', questions: ['재난의 개념과 유형을 설명하시오.', '재난관리의 단계(예방, 대비, 대응, 복구)를 설명하시오.', '국가재난관리체계의 구조를 설명하시오.', '긴급구조통제단의 구성과 역할을 설명하시오.', '119구조대의 조직과 임무를 설명하시오.', '구급활동의 기본원칙을 설명하시오.', '응급처치의 기본절차를 설명하시오.', '심폐소생술(CPR)의 방법을 설명하시오.', '대량재해 시 트리아지(중증도 분류)를 설명하시오.', '소방안전교육의 중요성과 내용을 설명하시오.']},
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
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center text-3xl">🔥</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">소방학개론</h1><p className="text-gray-600">연소, 화재, 소화, 소방시설</p></div>
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
        <div className="mt-8 bg-red-50 rounded-2xl p-6"><h3 className="font-bold text-red-800 mb-3">📖 소방학개론 학습 가이드</h3><ul className="text-sm text-red-700 space-y-2"><li>• 연소·화재이론은 기본 개념 철저히 이해</li><li>• 소화약제별 적용 화재 종류 구분</li><li>• 소방시설의 종류와 작동원리 숙지</li><li>• 실제 화재 사례와 연결하여 학습</li><li>• 최신 소방장비와 기술 동향 파악</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 소방공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 소방공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 소방공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
