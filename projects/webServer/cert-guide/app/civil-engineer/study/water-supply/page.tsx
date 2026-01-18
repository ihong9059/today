'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function WaterSupplyStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('civil-water-supply-progress');
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
    localStorage.setItem('civil-water-supply-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setCurrentPrompt(`토목기사 상하수도공학 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '상수도 계획',
      questions: [
        '상수도 시스템의 구성요소를 설명하시오.',
        '계획급수량 산정 방법을 설명하시오.',
        '1일 최대급수량과 시간최대급수량을 설명하시오.',
        '급수보급률과 유수율을 설명하시오.',
        '수원의 종류와 선정 조건을 설명하시오.',
        '수질기준과 음용수 수질기준을 설명하시오.',
        '수도시설의 용량 결정 기준을 설명하시오.',
        '배수시스템의 종류(직결, 저수조)를 비교하시오.',
        '상수도 관망해석 방법을 설명하시오.',
        '물 수요 예측 방법을 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '취수 및 도수시설',
      questions: [
        '표류수 취수시설의 종류를 설명하시오.',
        '취수보와 취수문의 기능을 설명하시오.',
        '취수탑과 취수관거를 비교하시오.',
        '지하수 취수시설(관정, 집수매거)을 설명하시오.',
        '도수시설의 정의와 종류를 설명하시오.',
        '도수관과 도수터널 설계 시 고려사항을 설명하시오.',
        '도수관로의 수리계산을 설명하시오.',
        '펌프의 종류와 선정 기준을 설명하시오.',
        '펌프의 양정과 효율 계산을 설명하시오.',
        '수충격(Water Hammer) 방지 대책을 설명하시오.'
      ]
    },
    {
      id: 3,
      title: '정수처리',
      questions: [
        '정수처리 공정의 순서를 설명하시오.',
        '침사지의 기능과 설계 기준을 설명하시오.',
        '응집(Coagulation)과 응결(Flocculation)을 설명하시오.',
        '응집제의 종류와 사용량 결정을 설명하시오.',
        '침전지의 종류와 설계 기준을 설명하시오.',
        '표면부하율과 체류시간을 설명하시오.',
        '여과지의 종류(완속, 급속)를 비교하시오.',
        '역세척의 방법과 설계 기준을 설명하시오.',
        '소독의 종류와 염소소독 방법을 설명하시오.',
        '고도정수처리(오존, 활성탄) 방법을 설명하시오.'
      ]
    },
    {
      id: 4,
      title: '하수도 계획',
      questions: [
        '하수도 시스템의 구성요소를 설명하시오.',
        '하수의 종류(오수, 우수, 합류식, 분류식)를 설명하시오.',
        '계획하수량 산정 방법을 설명하시오.',
        '우수유출량 산정(합리식)을 설명하시오.',
        '우수관거 설계 시 고려사항을 설명하시오.',
        '하수관거의 유속과 경사 기준을 설명하시오.',
        '맨홀의 종류와 설치 기준을 설명하시오.',
        '우수토실과 우수조정지를 설명하시오.',
        '펌프장 설계 시 고려사항을 설명하시오.',
        '하수도 관거 갱생 공법을 설명하시오.'
      ]
    },
    {
      id: 5,
      title: '하수처리',
      questions: [
        '하수처리 공정의 순서를 설명하시오.',
        '1차 처리(물리적 처리)를 설명하시오.',
        '활성슬러지법의 원리와 종류를 설명하시오.',
        'BOD, COD, SS의 정의와 측정 방법을 설명하시오.',
        'SRT, HRT, F/M비를 설명하시오.',
        '살수여상법을 설명하시오.',
        '회전원판법(RBC)을 설명하시오.',
        '고도처리(질소, 인 제거)를 설명하시오.',
        '슬러지 처리 방법(농축, 소화, 탈수)을 설명하시오.',
        '방류수 수질기준과 재이용을 설명하시오.'
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">🚰 상하수도공학</h1>
          <p className="text-white/90">토목기사 필기 5과목</p>
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
