'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MilitaryAdminSciencePage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('military-adminscience-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('military-adminscience-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'general', title: '행정학 총론', icon: '📚', questions: ['행정의 개념과 특성을 설명하시오.', '행정과 경영의 유사점과 차이점을 비교하시오.', '행정학의 발달 과정을 설명하시오.', '행정국가의 개념과 특징을 설명하시오.', '시장실패와 정부개입의 근거를 설명하시오.', '정부실패의 원인과 대책을 설명하시오.', '공공재의 특성을 설명하시오.', '외부효과와 정부 역할을 설명하시오.', '행정이념의 종류를 설명하시오.', '행정가치 간 갈등과 조화를 설명하시오.']},
    { id: 'organization', title: '조직론', icon: '🏢', questions: ['관료제의 특징과 순기능/역기능을 설명하시오.', '조직구조의 유형을 비교하시오.', '조직의 원리를 설명하시오.', '공식조직과 비공식조직의 관계를 설명하시오.', '조직문화의 개념과 유형을 설명하시오.', '조직발전(OD)의 개념과 기법을 설명하시오.', '리더십 이론을 비교하시오.', '동기부여 이론을 설명하시오.', '의사결정 모형을 비교하시오.', '조직갈등의 관리 방안을 설명하시오.']},
    { id: 'personnel', title: '인사행정론', icon: '👥', questions: ['직업공무원제의 의의와 수립요건을 설명하시오.', '직위분류제와 계급제를 비교하시오.', '대표관료제의 의의와 한계를 설명하시오.', '임용의 유형과 절차를 설명하시오.', '공무원 시험제도의 유형을 설명하시오.', '근무성적평정의 방법과 한계를 설명하시오.', '승진제도의 유형을 비교하시오.', '공무원 교육훈련의 유형을 설명하시오.', '공무원의 징계와 소청제도를 설명하시오.', '공무원 노동기본권의 현황을 설명하시오.']},
    { id: 'budget', title: '재무행정론', icon: '💰', questions: ['예산의 개념과 기능을 설명하시오.', '예산의 원칙을 설명하시오.', '예산의 분류 방법을 설명하시오.', '예산제도의 발달 과정을 설명하시오.', '성과주의 예산제도를 설명하시오.', '영기준 예산제도를 설명하시오.', '프로그램 예산제도를 설명하시오.', '예산결정 이론을 비교하시오.', '예산과정의 단계를 설명하시오.', '결산과 회계검사 제도를 설명하시오.']},
    { id: 'policy', title: '정책학', icon: '📋', questions: ['정책의 유형을 분류하시오.', '정책의제설정의 유형을 비교하시오.', '합리모형과 점증모형을 비교하시오.', '정책결정 요인론을 설명하시오.', '정책집행의 접근방법을 비교하시오.', '정책평가의 유형과 기준을 설명하시오.', '정책변동의 유형을 설명하시오.', '정책네트워크의 유형을 비교하시오.', '정책분석의 기법을 설명하시오.', '정책실패의 원인을 분석하시오.']},
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">🏢</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">행정학</h1><p className="text-gray-600">행정학 일반이론, 조직, 인사, 재무</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 행정학 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 조직론과 인사행정론 비중 높음</li><li>• 예산제도의 발달과정 이해 필수</li><li>• 정책학 이론 체계적 정리</li><li>• 행정개혁 관련 최신 동향 파악</li><li>• 기출문제 분석으로 출제경향 이해</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 군무원 9급 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 군무원 9급 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 군무원 9급 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
