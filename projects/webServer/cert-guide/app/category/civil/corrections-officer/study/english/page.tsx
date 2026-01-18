'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function CorrectionEnglishPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('correction-english-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('correction-english-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'vocabulary', title: '어휘', icon: '📚', questions: ['동의어(synonym)와 반의어(antonym)를 설명하시오.', '다의어(polysemy)의 의미 구별 방법을 설명하시오.', '접두사(prefix)의 종류와 의미 변화를 설명하시오.', '접미사(suffix)의 종류와 품사 변화를 설명하시오.', '어근(root)을 활용한 어휘 확장 방법을 설명하시오.', '혼동하기 쉬운 어휘 구별법을 설명하시오.', '숙어(idiom)의 특성과 학습 방법을 설명하시오.', '연어(collocation)의 개념을 설명하시오.', '문맥을 통한 어휘 추론 방법을 설명하시오.', '공무원 시험 빈출 어휘의 특징을 설명하시오.']},
    { id: 'grammar', title: '문법', icon: '📖', questions: ['시제(tense)의 종류와 용법을 설명하시오.', '완료시제(perfect tense)의 용법을 설명하시오.', '조동사(modal verb)의 종류와 의미를 설명하시오.', '가정법(subjunctive)의 종류와 용법을 설명하시오.', '수동태(passive voice)의 형태와 용법을 설명하시오.', '관계대명사(relative pronoun)의 용법을 설명하시오.', '관계부사(relative adverb)의 용법을 설명하시오.', '분사구문(participial construction)을 설명하시오.', '비교 구문(comparative)의 형태를 설명하시오.', '도치 구문(inversion)의 종류를 설명하시오.']},
    { id: 'reading', title: '독해', icon: '📰', questions: ['주제문(topic sentence) 찾기 전략을 설명하시오.', '글의 요지(main idea) 파악 방법을 설명하시오.', '세부 정보(detail) 파악 전략을 설명하시오.', '추론(inference) 문제 접근법을 설명하시오.', '빈칸 완성 문제 풀이 전략을 설명하시오.', '문장 삽입 위치 찾기 전략을 설명하시오.', '문장 순서 배열 문제 접근법을 설명하시오.', '연결어(transition words)의 역할을 설명하시오.', '지시어(reference) 파악 방법을 설명하시오.', '글의 흐름과 무관한 문장 찾기를 설명하시오.']},
    { id: 'types', title: '글의 유형', icon: '📄', questions: ['설명문(expository)의 구조를 설명하시오.', '논설문(argumentative)의 구조를 설명하시오.', '서사문(narrative)의 특징을 설명하시오.', '묘사문(descriptive)의 특징을 설명하시오.', '비교/대조 글의 구조를 설명하시오.', '원인/결과 글의 구조를 설명하시오.', '문제/해결 글의 구조를 설명하시오.', '시간 순서 글의 특징을 설명하시오.', '분류/구분 글의 구조를 설명하시오.', '예시 중심 글의 특징을 설명하시오.']},
    { id: 'strategy', title: '시험 전략', icon: '🎯', questions: ['어휘 문제의 유형별 접근법을 설명하시오.', '문법 문제의 효율적 풀이법을 설명하시오.', '독해 시간 관리 전략을 설명하시오.', '선택지 분석 방법을 설명하시오.', '소거법 활용 전략을 설명하시오.', '영어 기출문제 분석 방법을 설명하시오.', '단기간 점수 향상 전략을 설명하시오.', '어휘 암기의 효과적인 방법을 설명하시오.', '문법 취약점 보완 전략을 설명하시오.', '실전 모의고사 활용법을 설명하시오.']},
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
            <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-zinc-700 rounded-2xl flex items-center justify-center text-3xl">🌐</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">영어</h1><p className="text-gray-600">어휘, 문법, 독해</p></div>
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
        <div className="mt-8 bg-slate-50 rounded-2xl p-6"><h3 className="font-bold text-slate-800 mb-3">📖 영어 학습 가이드</h3><ul className="text-sm text-slate-700 space-y-2"><li>• 어휘: 기출 빈출 어휘 2000개 이상 암기</li><li>• 문법: 핵심 문법 포인트 완벽 정리</li><li>• 독해: 다양한 유형의 지문 연습</li><li>• 기출문제 반복 풀이로 출제 경향 파악</li><li>• 시간 관리: 문항당 1분 배분</li></ul></div>
      </div>
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 교정직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 교정직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 교정직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
