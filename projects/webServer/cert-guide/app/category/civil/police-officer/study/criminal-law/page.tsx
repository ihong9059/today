'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function CriminalLawPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('police-criminallaw-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('police-criminallaw-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'general-theory', title: '형법총론', icon: '📚', questions: ['죄형법정주의의 내용과 파생원칙을 설명하시오.', '형법의 적용범위(시간적, 장소적, 인적)를 설명하시오.', '구성요건의 개념과 요소를 설명하시오.', '고의와 과실의 개념과 종류를 비교하시오.', '인과관계와 객관적 귀속을 설명하시오.', '위법성조각사유의 종류를 설명하시오.', '정당방위의 성립요건을 설명하시오.', '긴급피난과 정당방위를 비교하시오.', '책임의 의의와 책임조각사유를 설명하시오.', '미수범의 종류(장애미수, 중지미수)를 비교하시오.']},
    { id: 'crime-types', title: '형법각론', icon: '⚖️', questions: ['살인죄의 구성요건과 종류를 설명하시오.', '상해죄와 폭행죄를 비교하시오.', '강간죄와 유사강간죄를 설명하시오.', '절도죄의 구성요건을 설명하시오.', '강도죄의 종류와 구성요건을 설명하시오.', '사기죄의 구성요건과 특별법상 유형을 설명하시오.', '횡령죄와 배임죄를 비교하시오.', '문서에 관한 죄의 종류를 설명하시오.', '공무원의 직무에 관한 죄를 설명하시오.', '공무집행방해죄의 구성요건을 설명하시오.']},
    { id: 'complicity', title: '공범론', icon: '👥', questions: ['공동정범의 성립요건을 설명하시오.', '교사범의 개념과 성립요건을 설명하시오.', '방조범의 개념과 종류를 설명하시오.', '간접정범의 개념과 성립요건을 설명하시오.', '공모공동정범에 대해 논하시오.', '필요적 공범의 종류를 설명하시오.', '신분과 공범의 관계를 설명하시오.', '공범의 종속성에 대해 설명하시오.', '승계적 공동정범에 대해 논하시오.', '공범과 중지미수의 관계를 설명하시오.']},
    { id: 'procedure-basic', title: '형사소송법 기초', icon: '📋', questions: ['형사소송법의 이념과 구조를 설명하시오.', '무죄추정의 원칙에 대해 설명하시오.', '적법절차의 원칙을 설명하시오.', '수사의 개념과 구조를 설명하시오.', '피의자의 권리(진술거부권 등)를 설명하시오.', '변호인의 접견교통권을 설명하시오.', '체포의 유형과 요건을 설명하시오.', '구속의 요건과 절차를 설명하시오.', '구속적부심사제도를 설명하시오.', '보석제도에 대해 설명하시오.']},
    { id: 'procedure-trial', title: '형사소송법 심화', icon: '🏛️', questions: ['공소시효의 개념과 기간을 설명하시오.', '공소제기의 기본원칙을 설명하시오.', '공판절차의 흐름을 설명하시오.', '증거의 의의와 종류를 설명하시오.', '위법수집증거배제법칙을 설명하시오.', '자백의 증거능력과 증명력을 설명하시오.', '전문법칙과 그 예외를 설명하시오.', '상소제도의 종류와 절차를 설명하시오.', '약식절차와 즉결심판을 비교하시오.', '재심제도에 대해 설명하시오.']},
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const handleAIClick = (question: string) => { setSelectedQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6"><Link href="/category/civil/police-officer" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">← 경찰공무원(순경)으로 돌아가기</Link></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl">⚖️</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">형사법</h1><p className="text-gray-600">형법총론·각론, 형사소송법</p></div>
            <div className="text-right"><p className="text-sm text-gray-500">진행률</p><p className="text-2xl font-bold text-blue-600">{completedCount}/{totalQuestions}</p></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} /></div>
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
                {expandedTopics[topic.id] && (<div className="px-6 pb-6 space-y-3">{topic.questions.map((question, idx) => { const isCompleted = completedQuestions[`${topic.id}-${idx}`]; return (<div key={idx} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}><div className="flex items-start gap-3"><button onClick={() => toggleQuestion(topic.id, idx)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 hover:border-blue-400'}`}>{isCompleted && '✓'}</button><div className="flex-1"><p className={`${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>{idx + 1}. {question}</p><button onClick={() => handleAIClick(question)} className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">🤖 AI에게 물어보기</button></div></div></div>); })}</div>)}
              </div>
            );
          })}
        </div>
        <div className="mt-8 bg-blue-50 rounded-2xl p-6"><h3 className="font-bold text-blue-800 mb-3">📖 형사법 학습 가이드</h3><ul className="text-sm text-blue-700 space-y-2"><li>• 형법과 형사소송법 통합 출제 - 균형있게 학습</li><li>• 형법총론 이론을 먼저 확립한 후 각론 학습</li><li>• 형사소송법은 절차 흐름을 이해하며 학습</li><li>• 판례 중심 학습 필수 - 대법원 판례 숙지</li><li>• 실무와 연계된 문제 출제 증가 추세</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 경찰공무원 순경 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 경찰공무원 순경 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 경찰공무원 순경 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
