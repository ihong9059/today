'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function HazardousPropertiesStudyPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-craftsman-hazardous-properties-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (newCompleted: Set<string>) => {
    localStorage.setItem('hazardous-craftsman-hazardous-properties-completed', JSON.stringify([...newCompleted]));
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
      title: '제1류 위험물 (산화성 고체)',
      icon: '🔶',
      questions: [
        { id: 'hp1', q: '제1류 위험물의 정의와 공통 성질을 설명하시오.' },
        { id: 'hp2', q: '과염소산염류, 과산화물의 성질과 취급 시 주의사항을 설명하시오.' },
        { id: 'hp3', q: '질산염류의 성질과 저장·취급방법을 설명하시오.' },
        { id: 'hp4', q: '제1류 위험물에 적합한 소화약제와 소화방법을 설명하시오.' },
        { id: 'hp5', q: '제1류 위험물의 지정수량과 저장 기준을 설명하시오.' },
      ]
    },
    {
      title: '제2류 위험물 (가연성 고체)',
      icon: '🔸',
      questions: [
        { id: 'hp6', q: '제2류 위험물의 정의와 공통 성질을 설명하시오.' },
        { id: 'hp7', q: '황, 적린, 황화인의 성질과 저장·취급방법을 설명하시오.' },
        { id: 'hp8', q: '철분, 금속분(마그네슘, 알루미늄)의 위험성과 취급 주의사항을 설명하시오.' },
        { id: 'hp9', q: '인화성 고체(고형알코올 등)의 성질과 취급방법을 설명하시오.' },
        { id: 'hp10', q: '제2류 위험물에 적합한 소화약제와 소화방법을 설명하시오.' },
      ]
    },
    {
      title: '제3류 위험물 (자연발화성·금수성)',
      icon: '🔷',
      questions: [
        { id: 'hp11', q: '제3류 위험물의 정의와 자연발화성, 금수성의 의미를 설명하시오.' },
        { id: 'hp12', q: '칼륨, 나트륨의 성질과 저장·취급방법을 설명하시오.' },
        { id: 'hp13', q: '알킬알루미늄, 알킬리튬의 위험성과 취급 주의사항을 설명하시오.' },
        { id: 'hp14', q: '황린의 성질과 저장방법(물 속 보관)에 대해 설명하시오.' },
        { id: 'hp15', q: '제3류 위험물에 적합한 소화약제(마른모래, 팽창질석 등)를 설명하시오.' },
      ]
    },
    {
      title: '제4류 위험물 (인화성 액체)',
      icon: '🛢️',
      questions: [
        { id: 'hp16', q: '제4류 위험물의 정의와 분류 기준(인화점)을 설명하시오.' },
        { id: 'hp17', q: '특수인화물(이황화탄소, 디에틸에테르)의 성질과 위험성을 설명하시오.' },
        { id: 'hp18', q: '제1석유류(휘발유, 아세톤)의 성질과 취급 주의사항을 설명하시오.' },
        { id: 'hp19', q: '제2석유류(등유, 경유)와 제3석유류(중유)의 차이점을 설명하시오.' },
        { id: 'hp20', q: '알코올류의 성질과 물과의 혼합성, 소화방법을 설명하시오.' },
      ]
    },
    {
      title: '제5류 위험물 (자기반응성)',
      icon: '⚠️',
      questions: [
        { id: 'hp21', q: '제5류 위험물의 정의와 자기반응성의 의미를 설명하시오.' },
        { id: 'hp22', q: '유기과산화물(과산화벤조일 등)의 성질과 위험성을 설명하시오.' },
        { id: 'hp23', q: '니트로화합물(TNT, 니트로글리세린)의 성질과 취급 주의사항을 설명하시오.' },
        { id: 'hp24', q: '제5류 위험물의 저장 조건(온도, 충격 관리)을 설명하시오.' },
        { id: 'hp25', q: '제5류 위험물의 소화방법과 주의사항을 설명하시오.' },
      ]
    },
    {
      title: '제6류 위험물 (산화성 액체)',
      icon: '🧪',
      questions: [
        { id: 'hp26', q: '제6류 위험물의 정의와 공통 성질을 설명하시오.' },
        { id: 'hp27', q: '과염소산, 과산화수소의 성질과 취급 시 주의사항을 설명하시오.' },
        { id: 'hp28', q: '질산(발연질산 포함)의 성질과 저장방법을 설명하시오.' },
        { id: 'hp29', q: '제6류 위험물과 가연물 접촉 시 위험성을 설명하시오.' },
        { id: 'hp30', q: '제6류 위험물에 적합한 소화약제와 소화방법을 설명하시오.' },
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
            <span className="text-red-600 font-medium">위험물의 성질과 취급</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/category/safety/hazardous-craftsman" className="inline-flex items-center gap-2 text-red-100 hover:text-white mb-2 text-sm">
            ← 위험물기능사
          </Link>
          <h1 className="text-2xl font-bold">위험물의 성질과 취급</h1>
          <p className="text-red-100 mt-1">위험물 1~6류 분류, 각 류별 성질 및 저장·취급방법</p>
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
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-yellow-800 mb-2">📌 위험물 분류 핵심 정리</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-yellow-700">
            <div className="bg-white rounded p-2"><strong>1류:</strong> 산화성 고체</div>
            <div className="bg-white rounded p-2"><strong>2류:</strong> 가연성 고체</div>
            <div className="bg-white rounded p-2"><strong>3류:</strong> 자연발화·금수성</div>
            <div className="bg-white rounded p-2"><strong>4류:</strong> 인화성 액체</div>
            <div className="bg-white rounded p-2"><strong>5류:</strong> 자기반응성</div>
            <div className="bg-white rounded p-2"><strong>6류:</strong> 산화성 액체</div>
          </div>
        </div>

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
          <Link href="/category/safety/hazardous-craftsman/study/fire-prevention" className="flex-1 text-center py-3 rounded-lg text-red-600 font-medium bg-red-50 border border-red-200 hover:bg-red-100 transition">
            ← 이전: 화재예방과 소화방법
          </Link>
          <Link href="/category/safety/hazardous-craftsman/study/practical" className="flex-1 text-center py-3 rounded-lg text-white font-medium bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition">
            다음: 실기시험 대비 →
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
              <a href={`https://claude.ai/new?q=${encodeURIComponent(`위험물기능사 위험물의 성질과 취급 문제입니다: ${currentQuestion}`)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition">
                <span className="text-3xl">🟠</span>
                <span className="font-medium text-gray-800">Claude</span>
              </a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(`위험물기능사 위험물의 성질과 취급 문제입니다: ${currentQuestion}`)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition">
                <span className="text-3xl">🟢</span>
                <span className="font-medium text-gray-800">ChatGPT</span>
              </a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(`위험물기능사 위험물의 성질과 취급 문제입니다: ${currentQuestion}`)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition">
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
