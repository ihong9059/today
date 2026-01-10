'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CivilPracticalStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('civil-practical-progress');
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
    localStorage.setItem('civil-practical-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    setCurrentPrompt(`토목기사 실기시험 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '측량 및 도로설계',
      questions: [
        '트래버스 측량의 폐합비 계산과 조정을 설명하시오.',
        '단곡선 설치를 위한 중심말뚝 좌표 계산을 설명하시오.',
        '종단곡선(포물선) 설계 계산을 설명하시오.',
        '토량계산(양단면 평균법, 중앙단면법)을 설명하시오.',
        '유토곡선 작성과 토량 배분을 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '구조물 설계',
      questions: [
        '철근콘크리트 보의 휨설계(등가응력블록)를 설명하시오.',
        '전단철근 배근 계산을 설명하시오.',
        '기둥의 축력과 휨 상호작용도 해석을 설명하시오.',
        '옹벽의 안정성 검토(전도, 활동, 지지력)를 설명하시오.',
        'PSC 보의 프리스트레스 손실 계산을 설명하시오.'
      ]
    },
    {
      id: 3,
      title: '토질 및 기초',
      questions: [
        '흙의 다짐시험 결과 분석과 다짐관리를 설명하시오.',
        '압밀침하량과 침하시간 계산을 설명하시오.',
        '사면안정 해석(절편법)을 설명하시오.',
        '얕은기초의 지지력 계산을 설명하시오.',
        '말뚝기초의 지지력과 침하량 계산을 설명하시오.'
      ]
    },
    {
      id: 4,
      title: '수리 및 상하수도',
      questions: [
        '관수로의 손실수두 계산을 설명하시오.',
        '개수로의 등류수심과 한계수심 계산을 설명하시오.',
        '도수현상 해석과 에너지손실 계산을 설명하시오.',
        '정수장 침전지 설계 계산을 설명하시오.',
        '활성슬러지 공정 설계 계산을 설명하시오.'
      ]
    },
    {
      id: 5,
      title: '시공 및 공정관리',
      questions: [
        '콘크리트 배합설계 계산을 설명하시오.',
        '거푸집의 측압 계산과 설계를 설명하시오.',
        '공정관리(PERT/CPM) 네트워크 분석을 설명하시오.',
        '공기단축과 비용최소화(Crashing)를 설명하시오.',
        '품질관리도(관리도, 히스토그램) 분석을 설명하시오.'
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">✍️ 실기시험 대비</h1>
          <p className="text-white/90">토목기사 실기 - 필답형</p>
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

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-800 font-medium">실기시험 안내</p>
          <p className="text-yellow-700 text-sm mt-1">
            필답형 시험으로 3시간 동안 진행됩니다. 계산 과정을 반드시 기재해야 부분 점수를 받을 수 있습니다.
          </p>
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
