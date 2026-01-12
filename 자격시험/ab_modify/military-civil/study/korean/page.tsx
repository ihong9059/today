'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MilitaryKoreanPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => { const saved = localStorage.getItem('military-korean-progress'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleQuestion = (topicId: string, questionId: number) => { const key = `${topicId}-${questionId}`; const updated = { ...completedQuestions, [key]: !completedQuestions[key] }; setCompletedQuestions(updated); localStorage.setItem('military-korean-progress', JSON.stringify(updated)); };

  const topics = [
    { id: 'grammar', title: '문법', icon: '📖', questions: ['한글 맞춤법의 기본 원칙에 대해 설명하시오.', '표준어 규정의 주요 내용을 설명하시오.', '외래어 표기법의 기본 원칙을 설명하시오.', '로마자 표기법의 기본 원칙을 설명하시오.', '품사의 분류 기준과 종류를 설명하시오.', '문장 성분의 종류와 특성을 설명하시오.', '문장의 구조(홑문장, 겹문장)를 설명하시오.', '높임법의 종류를 설명하시오.', '시제와 상의 차이를 설명하시오.', '피동과 사동의 개념을 설명하시오.']},
    { id: 'spelling', title: '맞춤법과 표기', icon: '✏️', questions: ['사이시옷의 표기 규칙을 설명하시오.', '두음법칙의 적용 사례를 설명하시오.', '준말의 표기 원칙을 설명하시오.', '띄어쓰기의 기본 원칙을 설명하시오.', '의존명사의 띄어쓰기를 설명하시오.', '보조용언의 띄어쓰기를 설명하시오.', '문장부호의 종류와 사용법을 설명하시오.', '-던지/-든지의 구별법을 설명하시오.', '-로서/-로써의 구별법을 설명하시오.', '헷갈리기 쉬운 맞춤법 사례를 설명하시오.']},
    { id: 'vocabulary', title: '어휘', icon: '📚', questions: ['고유어, 한자어, 외래어의 특성을 비교하시오.', '유의어와 반의어의 개념을 설명하시오.', '다의어와 동음이의어의 차이를 설명하시오.', '관용어의 개념과 특성을 설명하시오.', '속담의 유형과 특성을 설명하시오.', '한자 성어의 이해와 활용을 설명하시오.', '순화어의 필요성과 사례를 설명하시오.', '전문용어의 개념과 특성을 설명하시오.', '어휘의 의미 변화 유형을 설명하시오.', '존대 어휘와 겸양 어휘를 설명하시오.']},
    { id: 'reading', title: '독해', icon: '📰', questions: ['글의 주제 찾기 방법을 설명하시오.', '문단의 구조(두괄식, 미괄식)를 비교하시오.', '글의 전개 방식을 설명하시오.', '추론적 독해의 방법을 설명하시오.', '비판적 독해의 방법을 설명하시오.', '설명문의 특성과 독해법을 설명하시오.', '논설문의 구조와 독해법을 설명하시오.', '문학작품 독해의 기본 방법을 설명하시오.', '빈칸 추론 문제의 접근법을 설명하시오.', '내용 일치/불일치 문제 접근법을 설명하시오.']},
    { id: 'writing', title: '작문과 화법', icon: '✍️', questions: ['개요 작성의 원리와 방법을 설명하시오.', '문장 고쳐쓰기의 기준을 설명하시오.', '논증 방법(귀납, 연역, 유추)을 비교하시오.', '설득 전략을 설명하시오.', '보고서 작성의 기본 원칙을 설명하시오.', '공문서 작성의 기본 요령을 설명하시오.', '담화의 원리(협력의 원리)를 설명하시오.', '발표의 기본 원칙과 방법을 설명하시오.', '토론의 유형과 진행 방법을 설명하시오.', '면접에서의 화법 전략을 설명하시오.']},
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">📝</div>
            <div className="flex-1"><h1 className="text-2xl font-bold text-gray-800">국어</h1><p className="text-gray-600">문법, 어휘, 독해, 작문</p></div>
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
        <div className="mt-8 bg-green-50 rounded-2xl p-6"><h3 className="font-bold text-green-800 mb-3">📖 국어 학습 가이드</h3><ul className="text-sm text-green-700 space-y-2"><li>• 맞춤법과 표준어 규정 암기 필수</li><li>• 문법 용어와 개념 정확히 이해</li><li>• 독해는 다양한 지문 유형 연습</li><li>• 기출문제로 출제 경향 파악</li><li>• 한자 성어와 속담 정리</li></ul></div>
      </div>
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-lg w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3><p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 군무원 9급 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a><a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 군무원 9급 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a><a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 군무원 9급 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a></div><button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button></div></div>)}
    </div>
  );
}
