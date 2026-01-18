'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function FirePreventionStudyPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-craftsman-fire-prevention-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (newCompleted: Set<string>) => {
    localStorage.setItem('hazardous-craftsman-fire-prevention-completed', JSON.stringify([...newCompleted]));
  };

  const toggleQuestion = (id: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    saveProgress(newCompleted);
  };

  const handleAIHelp = (question: string) => {
    setCurrentQuestion(question);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: '연소의 조건과 원리',
      icon: '🔥',
      questions: [
        { id: 'fp1', q: '연소의 3요소(가연물, 산소공급원, 점화원)에 대해 설명하시오.' },
        { id: 'fp2', q: '연소의 4요소와 연쇄반응(Chain Reaction)의 역할을 설명하시오.' },
        { id: 'fp3', q: '인화점, 발화점, 연소점의 정의와 차이점을 설명하시오.' },
        { id: 'fp4', q: '연소범위(폭발한계)의 정의와 상한, 하한의 의미를 설명하시오.' },
        { id: 'fp5', q: '자연발화의 원인과 자연발화 온도에 대해 설명하시오.' },
      ]
    },
    {
      title: '연소의 종류',
      icon: '💥',
      questions: [
        { id: 'fp6', q: '표면연소(직접연소)와 증발연소의 차이점을 설명하시오.' },
        { id: 'fp7', q: '분해연소와 자기연소의 특징을 설명하시오.' },
        { id: 'fp8', q: '완전연소와 불완전연소의 차이 및 불완전연소의 위험성을 설명하시오.' },
        { id: 'fp9', q: '폭발과 폭굉의 차이점을 설명하시오.' },
        { id: 'fp10', q: '분진폭발의 원인과 조건, 예방법을 설명하시오.' },
      ]
    },
    {
      title: '소화의 원리',
      icon: '🧯',
      questions: [
        { id: 'fp11', q: '소화의 4가지 방법(제거소화, 질식소화, 냉각소화, 억제소화)을 설명하시오.' },
        { id: 'fp12', q: '냉각소화의 원리와 물이 냉각소화에 효과적인 이유를 설명하시오.' },
        { id: 'fp13', q: '질식소화의 원리와 대표적인 질식소화 약제를 설명하시오.' },
        { id: 'fp14', q: '부촉매소화(억제소화)의 원리와 대표적인 소화약제를 설명하시오.' },
        { id: 'fp15', q: '유류화재에 물을 사용하면 안 되는 이유를 설명하시오.' },
      ]
    },
    {
      title: '소화약제의 종류',
      icon: '🔵',
      questions: [
        { id: 'fp16', q: '물 소화약제의 특성과 장단점을 설명하시오.' },
        { id: 'fp17', q: '포(거품) 소화약제의 종류와 적용 화재를 설명하시오.' },
        { id: 'fp18', q: 'CO2 소화약제의 특성과 적용 화재, 주의사항을 설명하시오.' },
        { id: 'fp19', q: '분말 소화약제의 종류(ABC, BC, D급)와 각각의 적용 화재를 설명하시오.' },
        { id: 'fp20', q: '할로겐화합물 소화약제와 청정소화약제(HFC, FK)에 대해 설명하시오.' },
      ]
    },
    {
      title: '화재의 분류',
      icon: '🏠',
      questions: [
        { id: 'fp21', q: 'A급 화재(일반화재)의 정의와 적합한 소화약제를 설명하시오.' },
        { id: 'fp22', q: 'B급 화재(유류화재)의 정의와 적합한 소화약제를 설명하시오.' },
        { id: 'fp23', q: 'C급 화재(전기화재)의 정의와 적합한 소화약제를 설명하시오.' },
        { id: 'fp24', q: 'D급 화재(금속화재)의 정의와 적합한 소화약제를 설명하시오.' },
        { id: 'fp25', q: 'K급 화재(주방화재)의 정의와 적합한 소화약제를 설명하시오.' },
      ]
    },
    {
      title: '소화설비',
      icon: '🚒',
      questions: [
        { id: 'fp26', q: '옥내소화전설비의 구성과 작동원리를 설명하시오.' },
        { id: 'fp27', q: '스프링클러설비의 종류(습식, 건식, 준비작동식)와 특징을 설명하시오.' },
        { id: 'fp28', q: '가스계 소화설비(CO2, 할론, 청정소화약제)의 특징을 설명하시오.' },
        { id: 'fp29', q: '자동화재탐지설비의 구성요소와 감지기 종류를 설명하시오.' },
        { id: 'fp30', q: '피난설비(유도등, 비상조명등, 피난기구)의 종류와 설치기준을 설명하시오.' },
      ]
    },
  ];

  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/safety/hazardous-craftsman" className="text-gray-600 hover:text-red-600">위험물기능사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">화재예방과 소화방법</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/category/safety/hazardous-craftsman" className="inline-flex items-center gap-2 text-red-100 hover:text-white mb-2 text-sm">
            ← 위험물기능사
          </Link>
          <h1 className="text-2xl font-bold">화재예방과 소화방법</h1>
          <p className="text-red-100 mt-1">연소이론, 소화이론, 소화설비</p>
          <div className="mt-4 bg-white/20 rounded-lg p-3">
            <div className="flex justify-between text-sm mb-1">
              <span>학습 진행률</span>
              <span>{completedQuestions.size}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {topics.map((topic, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenTopic(openTopic === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-800">{topic.title}</h3>
                    <p className="text-sm text-gray-500">{topic.questions.length}문제</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    {topic.questions.filter(q => completedQuestions.has(q.id)).length}/{topic.questions.length}
                  </span>
                  <span className={`transform transition ${openTopic === i ? 'rotate-180' : ''}`}>▼</span>
                </div>
              </button>
              {openTopic === i && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((q, j) => (
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.has(q.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${completedQuestions.has(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
                        >
                          {completedQuestions.has(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">Q{j + 1}. {q.q}</p>
                          <button
                            onClick={() => handleAIHelp(q.q)}
                            className="mt-2 text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                          >
                            🤖 AI에게 질문하기
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/category/safety/hazardous-craftsman/study/general-chemistry" className="flex-1 text-center py-3 rounded-lg text-red-600 font-medium bg-red-50 border border-red-200 hover:bg-red-100 transition">
            ← 이전: 일반화학
          </Link>
          <Link href="/category/safety/hazardous-craftsman/study/hazardous-properties" className="flex-1 text-center py-3 rounded-lg text-white font-medium bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition">
            다음: 위험물의 성질과 취급 →
          </Link>
        </div>
      </section>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">AI 학습 도우미</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-1">질문</p>
              <p className="text-gray-800">{currentQuestion}</p>
            </div>
            <p className="text-sm text-gray-600 mb-4">아래 AI 중 하나를 선택하여 답변을 받으세요:</p>
            <div className="grid grid-cols-3 gap-3">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(`위험물기능사 화재예방과 소화방법 문제입니다: ${currentQuestion}`)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition">
                <span className="text-3xl">🟠</span>
                <span className="font-medium text-gray-800">Claude</span>
              </a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(`위험물기능사 화재예방과 소화방법 문제입니다: ${currentQuestion}`)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition">
                <span className="text-3xl">🟢</span>
                <span className="font-medium text-gray-800">ChatGPT</span>
              </a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(`위험물기능사 화재예방과 소화방법 문제입니다: ${currentQuestion}`)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition">
                <span className="text-3xl">🔵</span>
                <span className="font-medium text-gray-800">Gemini</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
