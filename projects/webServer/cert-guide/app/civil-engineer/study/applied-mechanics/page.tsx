'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function AppliedMechanicsStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('civil-applied-mechanics-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(questionId)) {
      newCompleted.delete(questionId);
    } else {
      newCompleted.add(questionId);
    }
    setCompletedQuestions(newCompleted);
    localStorage.setItem('civil-applied-mechanics-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setCurrentPrompt(`토목기사 응용역학 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '힘의 평형과 모멘트',
      questions: [
        '힘의 합성과 분해의 원리를 설명하시오.',
        '모멘트의 정의와 계산 방법을 설명하시오.',
        '평형조건 3가지를 쓰시오.',
        '자유물체도(FBD) 작성 방법을 설명하시오.',
        '분포하중의 합력과 작용점 계산법을 설명하시오.',
        '커플모멘트의 특성을 설명하시오.',
        '힘의 이동과 등가하중 개념을 설명하시오.',
        '3힘 부재의 평형조건을 설명하시오.',
        '마찰력과 평형의 관계를 설명하시오.',
        '정정과 부정정 구조물의 판별법을 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '트러스 해석',
      questions: [
        '트러스의 정의와 가정을 설명하시오.',
        '절점법을 이용한 트러스 해석 방법을 설명하시오.',
        '단면법을 이용한 트러스 해석 방법을 설명하시오.',
        '트러스의 영부재 판별법을 설명하시오.',
        '하우 트러스와 프랫 트러스의 차이점을 설명하시오.',
        'K 트러스의 해석 방법을 설명하시오.',
        '합성 트러스의 해석 방법을 설명하시오.',
        '트러스의 안정성 판별 조건을 설명하시오.',
        '트러스의 처짐 계산법(단위하중법)을 설명하시오.',
        '3차원 트러스의 해석 방법을 설명하시오.'
      ]
    },
    {
      id: 3,
      title: '보의 응력과 변형',
      questions: [
        '보의 전단력도(SFD)와 휨모멘트도(BMD) 작성법을 설명하시오.',
        '단순보, 캔틸레버보, 내민보의 특성을 비교하시오.',
        '휨응력 공식을 유도하시오.',
        '단면의 중립축과 단면2차모멘트를 설명하시오.',
        '전단응력 분포와 계산법을 설명하시오.',
        '보의 주응력과 주방향을 설명하시오.',
        '합성보의 응력 계산법을 설명하시오.',
        '비대칭 단면 보의 휨응력 계산을 설명하시오.',
        '보의 처짐 계산법(탄성곡선법)을 설명하시오.',
        '모멘트-면적법을 이용한 처짐 계산을 설명하시오.'
      ]
    },
    {
      id: 4,
      title: '기둥과 좌굴',
      questions: [
        '오일러 좌굴 공식을 유도하시오.',
        '유효좌굴길이의 개념과 경계조건별 값을 설명하시오.',
        '세장비의 정의와 중요성을 설명하시오.',
        '비탄성 좌굴과 탄성 좌굴의 차이를 설명하시오.',
        '편심하중을 받는 기둥의 해석법을 설명하시오.',
        '할선공식(Secant Formula)을 설명하시오.',
        '직선공식과 포물선공식을 비교 설명하시오.',
        'Rankine 공식의 유도와 적용을 설명하시오.',
        '핵점(Kern Point)의 개념을 설명하시오.',
        '합성기둥의 좌굴 해석을 설명하시오.'
      ]
    },
    {
      id: 5,
      title: '부정정 구조물 해석',
      questions: [
        '부정정 구조물의 정의와 특성을 설명하시오.',
        '처짐각법의 원리와 적용 방법을 설명하시오.',
        '모멘트분배법의 원리를 설명하시오.',
        '강비, 분배율, 전달률의 개념을 설명하시오.',
        '3연 모멘트법을 설명하시오.',
        '최소일의 원리와 가상일의 원리를 비교하시오.',
        '카스틸리아노의 정리를 설명하시오.',
        '연속보의 해석 방법을 설명하시오.',
        '라멘 구조물의 해석 방법을 설명하시오.',
        '대칭구조물과 반대칭하중의 해석을 설명하시오.'
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.size / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/civil-engineer/exam" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <span className="mr-2">←</span> 시험 정보로 돌아가기
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">📐 응용역학</h1>
          <p className="text-white/90">토목기사 필기 1과목</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-teal-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-teal-500 to-cyan-400 h-3 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedQuestions.size} / {totalQuestions} 문제 완료</p>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-bold">
                    {topic.id}
                  </span>
                  <span className="font-medium text-gray-800">{topic.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {topic.questions.filter((_, i) => completedQuestions.has(`${topic.id}-${i}`)).length}/{topic.questions.length}
                  </span>
                  <span className={`transform transition-transform ${expandedTopic === topic.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>
              {expandedTopic === topic.id && (
                <div className="border-t p-4 space-y-3">
                  {topic.questions.map((question, idx) => {
                    const qId = `${topic.id}-${idx}`;
                    const isCompleted = completedQuestions.has(qId);
                    return (
                      <div key={idx} className={`p-3 rounded-lg border ${isCompleted ? 'bg-teal-50 border-teal-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => saveProgress(qId)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex-shrink-0 ${isCompleted ? 'bg-teal-500 border-teal-500 text-white' : 'border-gray-300'}`}
                          >
                            {isCompleted && '✓'}
                          </button>
                          <div className="flex-1">
                            <p className="text-gray-700">{idx + 1}. {question}</p>
                            <button
                              onClick={() => handleAILearn(question)}
                              className="mt-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                            >
                              🤖 AI에게 배우기
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
              </div>
              <p className="text-sm text-gray-600 mb-4">학습할 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-3 bg-orange-100 hover:bg-orange-200 rounded-lg text-center font-medium text-orange-700 transition-colors"
                >
                  Claude (Anthropic)
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-3 bg-green-100 hover:bg-green-200 rounded-lg text-center font-medium text-green-700 transition-colors"
                >
                  ChatGPT (OpenAI)
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-3 bg-blue-100 hover:bg-blue-200 rounded-lg text-center font-medium text-blue-700 transition-colors"
                >
                  Gemini (Google)
                </a>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentPrompt);
                  alert('프롬프트가 복사되었습니다!');
                }}
                className="mt-4 w-full p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
