'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function SoilMechanicsStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('civil-soil-mechanics-progress');
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
    localStorage.setItem('civil-soil-mechanics-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setCurrentPrompt(`토목기사 토질 및 기초 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '흙의 물리적 성질',
      questions: [
        '흙의 3상과 기본적인 물리적 성질을 설명하시오.',
        '간극비, 간극률, 포화도의 정의와 관계를 설명하시오.',
        '함수비, 단위중량, 비중의 정의와 측정법을 설명하시오.',
        '상대밀도의 정의와 활용을 설명하시오.',
        '입도분석(체분석, 비중계분석)을 설명하시오.',
        '입도분포곡선과 균등계수, 곡률계수를 설명하시오.',
        '아터버그 한계(액성한계, 소성한계, 수축한계)를 설명하시오.',
        '소성지수와 흙의 분류(통일분류법)를 설명하시오.',
        '다짐시험과 최적함수비, 최대건조단위중량을 설명하시오.',
        '현장 다짐관리 방법(다짐도, 상대밀도)을 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '투수와 침투',
      questions: [
        '투수계수의 정의와 영향 요소를 설명하시오.',
        '정수위 투수시험과 변수위 투수시험을 비교하시오.',
        '투수계수의 현장시험 방법을 설명하시오.',
        '등가투수계수(수평, 수직 흐름)를 계산하시오.',
        '라플라스 방정식과 유선망 이론을 설명하시오.',
        '유선망을 이용한 침투량 계산을 설명하시오.',
        '유효응력과 중립응력의 정의를 설명하시오.',
        '분사현상(Quick Sand)의 원인과 방지책을 설명하시오.',
        '파이핑 현상을 설명하시오.',
        '히빙 현상과 안전율 계산을 설명하시오.'
      ]
    },
    {
      id: 3,
      title: '압밀과 침하',
      questions: [
        '압밀의 정의와 과정을 설명하시오.',
        '압밀시험과 e-log p 곡선을 설명하시오.',
        '선행압밀하중과 과압밀비(OCR)를 설명하시오.',
        '압축지수와 팽창지수를 설명하시오.',
        '정규압밀점토와 과압밀점토의 침하량 계산을 설명하시오.',
        '압밀도와 시간계수의 관계를 설명하시오.',
        '압밀침하 시간 계산법을 설명하시오.',
        '2차 압밀(크리프)을 설명하시오.',
        '연직배수공법(샌드드레인, PBD)을 설명하시오.',
        '선행재하공법과 압밀 촉진 원리를 설명하시오.'
      ]
    },
    {
      id: 4,
      title: '전단강도와 토압',
      questions: [
        '흙의 전단강도와 Mohr-Coulomb 파괴기준을 설명하시오.',
        '점착력과 내부마찰각의 정의를 설명하시오.',
        '직접전단시험을 설명하시오.',
        '삼축압축시험의 종류(UU, CU, CD)를 비교하시오.',
        '유효응력 강도정수와 전응력 강도정수를 설명하시오.',
        '토압의 종류(정지토압, 주동토압, 수동토압)를 설명하시오.',
        'Rankine 토압이론을 설명하시오.',
        'Coulomb 토압이론을 설명하시오.',
        '옹벽에 작용하는 토압 계산을 설명하시오.',
        '지하수위가 토압에 미치는 영향을 설명하시오.'
      ]
    },
    {
      id: 5,
      title: '사면안정과 기초',
      questions: [
        '사면파괴의 유형을 설명하시오.',
        '무한사면의 안정해석을 설명하시오.',
        '유한사면의 안정해석(절편법)을 설명하시오.',
        'Bishop 간편법을 설명하시오.',
        '얕은기초의 지지력 공식(Terzaghi)을 설명하시오.',
        '지지력 계수와 기초의 형상계수를 설명하시오.',
        '허용지지력과 안전율을 설명하시오.',
        '말뚝기초의 종류와 지지력 산정을 설명하시오.',
        '부마찰력(Negative Skin Friction)을 설명하시오.',
        '말뚝의 침하량 계산과 군말뚝 효과를 설명하시오.'
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">🏗️ 토질 및 기초</h1>
          <p className="text-white/90">토목기사 필기 4과목</p>
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
