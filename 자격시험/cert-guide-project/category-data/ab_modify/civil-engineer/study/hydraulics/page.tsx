'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HydraulicsStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('civil-hydraulics-progress');
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
    localStorage.setItem('civil-hydraulics-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    setCurrentPrompt(`토목기사 수리학 및 수문학 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '정수역학',
      questions: [
        '정수압의 정의와 특성을 설명하시오.',
        '압력의 단위와 변환 관계를 설명하시오.',
        '파스칼의 원리와 적용 예를 설명하시오.',
        '평면에 작용하는 정수압과 작용점 계산법을 설명하시오.',
        '곡면에 작용하는 정수압의 계산법을 설명하시오.',
        '부력과 아르키메데스 원리를 설명하시오.',
        '부체의 안정조건을 설명하시오.',
        '경심(Metacenter)과 경심고의 정의를 설명하시오.',
        '상대적 평형(가속도 운동)에서의 압력을 설명하시오.',
        '압력계의 종류와 원리를 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '동수역학과 관수로',
      questions: [
        '유선, 유적선, 유맥선의 정의와 차이를 설명하시오.',
        '연속방정식을 유도하시오.',
        '베르누이 방정식을 유도하고 가정을 설명하시오.',
        '에너지선과 수력구배선을 설명하시오.',
        '피토관과 벤투리미터의 원리를 설명하시오.',
        '관수로의 손실수두(마찰손실, 부차적손실)를 설명하시오.',
        'Darcy-Weisbach 공식과 마찰계수를 설명하시오.',
        'Hazen-Williams 공식을 설명하시오.',
        '관로 시스템(직렬, 병렬) 해석법을 설명하시오.',
        '수격현상(Water Hammer)의 원인과 대책을 설명하시오.'
      ]
    },
    {
      id: 3,
      title: '개수로 흐름',
      questions: [
        '개수로 흐름의 분류(등류, 부등류, 정상류, 비정상류)를 설명하시오.',
        'Manning 공식과 Chezy 공식을 비교 설명하시오.',
        '최적수리단면을 설명하시오.',
        '비에너지와 한계수심의 정의를 설명하시오.',
        '프루드 수(Froude Number)와 흐름 상태를 설명하시오.',
        '상류와 사류의 특성을 비교하시오.',
        '도수(Hydraulic Jump)현상과 계산법을 설명하시오.',
        '점변류(GVF) 수면곡선의 유형을 설명하시오.',
        '위어(Weir)의 종류와 유량공식을 설명하시오.',
        '수문(Sluice Gate) 흐름의 해석법을 설명하시오.'
      ]
    },
    {
      id: 4,
      title: '수문학 기초',
      questions: [
        '물의 순환과 수문학적 물수지를 설명하시오.',
        '강수량 측정과 면적평균강수량 계산법을 설명하시오.',
        '티센다각형법(Thiessen Method)을 설명하시오.',
        '강우강도-지속시간-빈도 관계(IDF)를 설명하시오.',
        '증발산량 산정 방법을 설명하시오.',
        '침투와 침투능 곡선을 설명하시오.',
        '유출과 유출계수의 정의를 설명하시오.',
        '합리식(Rational Method)을 이용한 첨두유량 계산을 설명하시오.',
        '단위유량도(Unit Hydrograph)의 원리를 설명하시오.',
        '홍수추적(Flood Routing) 방법을 설명하시오.'
      ]
    },
    {
      id: 5,
      title: '지하수와 하천수문',
      questions: [
        '지하수의 형성과 대수층의 종류를 설명하시오.',
        'Darcy 법칙을 설명하시오.',
        '투수계수 측정 방법을 설명하시오.',
        '정류 우물 공식(Thiem 공식)을 설명하시오.',
        '비정류 우물 공식(Theis 공식)을 설명하시오.',
        '다중 우물 시스템의 해석을 설명하시오.',
        '하천의 수위-유량 관계곡선을 설명하시오.',
        '유량 측정 방법(유속면적법, 희석법)을 설명하시오.',
        '빈도분석과 재현기간을 설명하시오.',
        '확률분포(정규분포, Log-정규분포, Gumbel)를 설명하시오.'
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.size / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/category/construction/civil-engineer/exam" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <span className="mr-2">←</span> 시험 정보로 돌아가기
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">💧 수리학 및 수문학</h1>
          <p className="text-white/90">토목기사 필기 3과목</p>
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
