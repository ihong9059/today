'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function PracticalStudyPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-craftsman-practical-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (newCompleted: Set<string>) => {
    localStorage.setItem('hazardous-craftsman-practical-completed', JSON.stringify([...newCompleted]));
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
      title: '위험물 분류 및 판정',
      icon: '📋',
      questions: [
        { id: 'pr1', q: '위험물의 지정수량과 배수 개념을 설명하고, 지정수량 미만 저장 시 적용 규정을 설명하시오.' },
        { id: 'pr2', q: '주어진 위험물의 품명과 수량을 보고 지정수량의 배수를 계산하시오. (예: 휘발유 400L, 경유 2000L)' },
        { id: 'pr3', q: '복합 저장 시 지정수량 배수 계산 방법과 허가/신고 기준을 설명하시오.' },
        { id: 'pr4', q: '위험물의 유별 판정 방법과 각 류의 시험방법을 설명하시오.' },
        { id: 'pr5', q: '인화점 시험방법(태그밀폐식, 클리블랜드개방식)과 적용 대상을 설명하시오.' },
      ]
    },
    {
      title: '제조소등의 설치 기준',
      icon: '🏭',
      questions: [
        { id: 'pr6', q: '제조소의 위치, 구조, 설비의 기준을 설명하시오.' },
        { id: 'pr7', q: '옥내저장소의 바닥면적, 처마높이, 보유공지 기준을 설명하시오.' },
        { id: 'pr8', q: '옥외저장소의 설치 기준과 저장 가능한 위험물을 설명하시오.' },
        { id: 'pr9', q: '옥외탱크저장소의 방유제 설치 기준과 용량 산정 방법을 설명하시오.' },
        { id: 'pr10', q: '이동탱크저장소(탱크로리)의 구조 기준과 안전장치를 설명하시오.' },
      ]
    },
    {
      title: '저장·취급 기준',
      icon: '📦',
      questions: [
        { id: 'pr11', q: '위험물의 저장 및 취급에 관한 공통 기준을 설명하시오.' },
        { id: 'pr12', q: '위험물의 혼재 금지 규정과 그 이유를 설명하시오.' },
        { id: 'pr13', q: '위험물 저장소의 환기, 채광, 조명 설비 기준을 설명하시오.' },
        { id: 'pr14', q: '정전기 제거 설비의 설치 기준과 접지 방법을 설명하시오.' },
        { id: 'pr15', q: '위험물의 온도관리 기준과 보냉·보온 설비에 대해 설명하시오.' },
      ]
    },
    {
      title: '운반 및 운송 기준',
      icon: '🚛',
      questions: [
        { id: 'pr16', q: '위험물 운반용기의 종류(금속제, 유리제, 플라스틱제)와 기준을 설명하시오.' },
        { id: 'pr17', q: '위험물 운반 시 표지 및 주의사항의 부착 기준을 설명하시오.' },
        { id: 'pr18', q: '위험물의 적재 방법과 적재량 제한에 대해 설명하시오.' },
        { id: 'pr19', q: '이동탱크저장소의 운전자 준수사항을 설명하시오.' },
        { id: 'pr20', q: '위험물 운송 시 동승 안전관리자의 자격과 역할을 설명하시오.' },
      ]
    },
    {
      title: '소화설비 및 안전관리',
      icon: '🧯',
      questions: [
        { id: 'pr21', q: '제조소등에 설치해야 하는 소화설비의 종류와 설치 기준을 설명하시오.' },
        { id: 'pr22', q: '소형소화기의 능력단위와 설치 개수 산정 방법을 설명하시오.' },
        { id: 'pr23', q: '자동화재탐지설비와 자동소화설비의 설치 대상을 설명하시오.' },
        { id: 'pr24', q: '위험물안전관리자의 선임 기준과 업무를 설명하시오.' },
        { id: 'pr25', q: '정기점검과 정기검사의 실시 주기와 대상을 설명하시오.' },
      ]
    },
    {
      title: '계산 문제 연습',
      icon: '🔢',
      questions: [
        { id: 'pr26', q: '탱크의 용량 계산 문제: 내경 3m, 길이 10m인 원통형 탱크의 내용적을 계산하시오.' },
        { id: 'pr27', q: '보유공지 계산: 지정수량 배수에 따른 보유공지 너비를 계산하시오.' },
        { id: 'pr28', q: '방유제 용량 계산: 탱크 용량 1000kL일 때 방유제 최소 용량을 계산하시오.' },
        { id: 'pr29', q: '환기설비 용량 계산: 바닥면적 100m²인 저장소의 환기설비 풍량을 계산하시오.' },
        { id: 'pr30', q: '소화설비 설치 개수 계산: 바닥면적과 소화효력 범위에 따른 소화기 개수를 계산하시오.' },
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
            <span className="text-red-600 font-medium">실기시험 대비</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/category/safety/hazardous-craftsman" className="inline-flex items-center gap-2 text-red-100 hover:text-white mb-2 text-sm">
            ← 위험물기능사
          </Link>
          <h1 className="text-2xl font-bold">실기시험 대비</h1>
          <p className="text-red-100 mt-1">위험물 취급 실무, 안전관리, 필답형 문제 연습</p>
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
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-red-800 mb-2">⚠️ 실기시험 안내</h3>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• 시험 형태: 필답형 (서술형 + 계산형)</li>
            <li>• 시험 시간: 1시간 30분</li>
            <li>• 합격 기준: 60점 이상</li>
            <li>• 주요 출제: 저장·취급 기준, 설치 기준, 계산 문제</li>
          </ul>
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
          <Link href="/category/safety/hazardous-craftsman/study/hazardous-properties" className="flex-1 text-center py-3 rounded-lg text-red-600 font-medium bg-red-50 border border-red-200 hover:bg-red-100 transition">
            ← 이전: 위험물의 성질과 취급
          </Link>
          <Link href="/category/safety/hazardous-craftsman/exam" className="flex-1 text-center py-3 rounded-lg text-white font-medium bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition">
            시험정보 확인 →
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
              <a href={`https://claude.ai/new?q=${encodeURIComponent(`위험물기능사 실기시험 문제입니다: ${currentQuestion}`)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition">
                <span className="text-3xl">🟠</span>
                <span className="font-medium text-gray-800">Claude</span>
              </a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(`위험물기능사 실기시험 문제입니다: ${currentQuestion}`)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition">
                <span className="text-3xl">🟢</span>
                <span className="font-medium text-gray-800">ChatGPT</span>
              </a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(`위험물기능사 실기시험 문제입니다: ${currentQuestion}`)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition">
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
