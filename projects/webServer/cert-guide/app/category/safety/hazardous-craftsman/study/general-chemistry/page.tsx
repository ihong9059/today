'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function GeneralChemistryStudyPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-craftsman-general-chemistry-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (newCompleted: Set<string>) => {
    localStorage.setItem('hazardous-craftsman-general-chemistry-completed', JSON.stringify([...newCompleted]));
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
      title: '원자와 분자의 구조',
      icon: '⚛️',
      questions: [
        { id: 'gc1', q: '원자의 구성 입자(양성자, 중성자, 전자)와 각각의 특성을 설명하시오.' },
        { id: 'gc2', q: '원자번호와 질량수의 정의 및 동위원소에 대해 설명하시오.' },
        { id: 'gc3', q: '전자배치의 원리(파울리의 배타원리, 훈트의 규칙, 쌓음 원리)를 설명하시오.' },
        { id: 'gc4', q: '이온결합과 공유결합의 차이점을 설명하고 예를 들어 설명하시오.' },
        { id: 'gc5', q: '금속결합의 특성과 금속의 성질과의 관계를 설명하시오.' },
      ]
    },
    {
      title: '화학반응과 화학식',
      icon: '🔬',
      questions: [
        { id: 'gc6', q: '화학반응식의 균형을 맞추는 방법과 그 의미를 설명하시오.' },
        { id: 'gc7', q: '몰(mol)의 정의와 아보가드로 수의 의미를 설명하시오.' },
        { id: 'gc8', q: '화학반응에서 반응물과 생성물의 양적 관계(화학양론)를 설명하시오.' },
        { id: 'gc9', q: '한계반응물의 개념과 이론적 수득률, 실제 수득률의 관계를 설명하시오.' },
        { id: 'gc10', q: '발열반응과 흡열반응의 차이 및 엔탈피 변화에 대해 설명하시오.' },
      ]
    },
    {
      title: '산과 염기',
      icon: '🧪',
      questions: [
        { id: 'gc11', q: '아레니우스의 산·염기 정의와 브뢴스테드-로우리의 산·염기 정의를 비교하시오.' },
        { id: 'gc12', q: 'pH의 정의와 pH 척도(0~14)에 따른 산·염기·중성의 구분을 설명하시오.' },
        { id: 'gc13', q: '중화반응의 원리와 중화열에 대해 설명하시오.' },
        { id: 'gc14', q: '강산과 약산, 강염기와 약염기의 차이점을 이온화도와 관련하여 설명하시오.' },
        { id: 'gc15', q: '완충용액의 원리와 그 중요성에 대해 설명하시오.' },
      ]
    },
    {
      title: '산화와 환원',
      icon: '⚡',
      questions: [
        { id: 'gc16', q: '산화와 환원의 정의를 전자 이동 관점에서 설명하시오.' },
        { id: 'gc17', q: '산화수의 결정 규칙과 산화수 변화를 이용한 산화환원 반응 판별법을 설명하시오.' },
        { id: 'gc18', q: '산화제와 환원제의 정의 및 대표적인 산화제, 환원제의 예를 들으시오.' },
        { id: 'gc19', q: '금속의 이온화 경향성과 반응성 서열에 대해 설명하시오.' },
        { id: 'gc20', q: '전기분해의 원리와 패러데이 법칙에 대해 설명하시오.' },
      ]
    },
    {
      title: '기체의 성질',
      icon: '💨',
      questions: [
        { id: 'gc21', q: '보일의 법칙, 샤를의 법칙, 아보가드로의 법칙을 설명하시오.' },
        { id: 'gc22', q: '이상기체 방정식(PV=nRT)의 의미와 활용법을 설명하시오.' },
        { id: 'gc23', q: '돌턴의 분압 법칙과 기체 혼합물에서의 분압 계산법을 설명하시오.' },
        { id: 'gc24', q: '그레이엄의 확산 법칙과 기체의 분자량과의 관계를 설명하시오.' },
        { id: 'gc25', q: '실제 기체와 이상기체의 차이점 및 반데르발스 방정식에 대해 설명하시오.' },
      ]
    },
    {
      title: '용액과 농도',
      icon: '🧫',
      questions: [
        { id: 'gc26', q: '몰농도(M), 몰랄농도(m), 퍼센트 농도의 정의와 계산법을 설명하시오.' },
        { id: 'gc27', q: '용해도의 정의와 온도, 압력에 따른 용해도 변화를 설명하시오.' },
        { id: 'gc28', q: '삼투압의 정의와 반트호프 법칙에 대해 설명하시오.' },
        { id: 'gc29', q: '끓는점 오름과 어는점 내림의 원리를 총괄성과 관련하여 설명하시오.' },
        { id: 'gc30', q: '콜로이드 용액의 특성(틴들 현상, 브라운 운동)에 대해 설명하시오.' },
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
            <span className="text-red-600 font-medium">일반화학</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/category/safety/hazardous-craftsman" className="inline-flex items-center gap-2 text-red-100 hover:text-white mb-2 text-sm">
            ← 위험물기능사
          </Link>
          <h1 className="text-2xl font-bold">일반화학</h1>
          <p className="text-red-100 mt-1">화학 기초, 원소, 화학반응, 산·염기</p>
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
          <Link href="/category/safety/hazardous-craftsman/study/fire-prevention" className="flex-1 text-center py-3 rounded-lg text-white font-medium bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition">
            다음: 화재예방과 소화방법 →
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
              <a href={`https://claude.ai/new?q=${encodeURIComponent(`위험물기능사 일반화학 문제입니다: ${currentQuestion}`)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition">
                <span className="text-3xl">🟠</span>
                <span className="font-medium text-gray-800">Claude</span>
              </a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(`위험물기능사 일반화학 문제입니다: ${currentQuestion}`)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition">
                <span className="text-3xl">🟢</span>
                <span className="font-medium text-gray-800">ChatGPT</span>
              </a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(`위험물기능사 일반화학 문제입니다: ${currentQuestion}`)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition">
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
