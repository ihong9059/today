'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InteriorEnvironmentStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('interior-environment-progress');
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
    localStorage.setItem('interior-environment-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    setCurrentPrompt(`실내건축기사 실내환경 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '열환경과 단열',
      questions: [
        '열전달의 3가지 방식(전도, 대류, 복사)을 설명하시오.',
        '열관류율(U값)의 정의와 계산법을 설명하시오.',
        '열저항(R값)의 개념을 설명하시오.',
        '단열재의 종류와 특성을 설명하시오.',
        '결로 발생 원인과 방지 대책을 설명하시오.',
        '노점온도의 정의와 계산법을 설명하시오.',
        '열교(Thermal Bridge)의 개념과 해결책을 설명하시오.',
        '실내 적정 온습도 기준을 설명하시오.',
        '냉난방 부하 계산의 기본 원리를 설명하시오.',
        '에너지 절약 설계 기법을 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '조명계획과 채광',
      questions: [
        '조명의 기본 용어(광속, 조도, 휘도)를 설명하시오.',
        '조도 기준과 용도별 권장 조도를 설명하시오.',
        '조명 방식(직접, 간접, 반간접)을 비교하시오.',
        '광원의 종류와 특성(백열등, LED, 형광등)을 설명하시오.',
        '색온도와 연색성 지수(CRI)를 설명하시오.',
        '주광 조명과 인공 조명의 조화를 설명하시오.',
        '채광 계획의 원칙과 방법을 설명하시오.',
        '주광률의 정의와 계산법을 설명하시오.',
        '눈부심(Glare) 방지 대책을 설명하시오.',
        '에너지 효율적인 조명 설계를 설명하시오.'
      ]
    },
    {
      id: 3,
      title: '음환경과 차음',
      questions: [
        '소리의 기본 특성(주파수, 파장, 진폭)을 설명하시오.',
        '데시벨(dB)과 음압 레벨을 설명하시오.',
        '흡음과 차음의 차이를 설명하시오.',
        '흡음재의 종류와 특성을 설명하시오.',
        '차음 성능(STC, TL)을 설명하시오.',
        '바닥충격음 저감 방법을 설명하시오.',
        '실내 소음 기준과 NC곡선을 설명하시오.',
        '잔향시간의 정의와 적정 기준을 설명하시오.',
        '음향 설계의 기본 원칙을 설명하시오.',
        '소음 저감을 위한 재료 선정 방법을 설명하시오.'
      ]
    },
    {
      id: 4,
      title: '환기와 공기질',
      questions: [
        '자연환기와 기계환기를 비교하시오.',
        '필요 환기량 계산법을 설명하시오.',
        '환기 횟수의 기준을 설명하시오.',
        '실내공기질 관리 기준을 설명하시오.',
        'CO2 농도와 환기의 관계를 설명하시오.',
        '포름알데히드와 VOC 저감 방법을 설명하시오.',
        '열회수 환기장치(HRV, ERV)를 설명하시오.',
        '부압과 정압의 개념을 설명하시오.',
        '공조 방식의 종류를 설명하시오.',
        '친환경 건축자재 인증제도를 설명하시오.'
      ]
    },
    {
      id: 5,
      title: '에너지 효율과 친환경',
      questions: [
        '제로에너지 건물의 개념을 설명하시오.',
        '패시브하우스 설계 원칙을 설명하시오.',
        '건물에너지효율등급 제도를 설명하시오.',
        '녹색건축인증(G-SEED) 기준을 설명하시오.',
        '신재생에너지 적용 사례를 설명하시오.',
        '일사 조절과 차양 설계를 설명하시오.',
        '고효율 창호 시스템을 설명하시오.',
        '건물 외피 성능 향상 방법을 설명하시오.',
        '스마트 빌딩 시스템을 설명하시오.',
        'BEMS(건물에너지관리시스템)를 설명하시오.'
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.size / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/category/construction/interior-architect/exam" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <span className="mr-2">←</span> 시험 정보로 돌아가기
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">🌡️ 실내환경</h1>
          <p className="text-white/90">실내건축기사 필기 2과목</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-purple-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-400 h-3 rounded-full transition-all"
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
                  <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
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
                      <div key={idx} className={`p-3 rounded-lg border ${isCompleted ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => saveProgress(qId)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex-shrink-0 ${isCompleted ? 'bg-purple-500 border-purple-500 text-white' : 'border-gray-300'}`}
                          >
                            {isCompleted && '✓'}
                          </button>
                          <div className="flex-1">
                            <p className="text-gray-700">{idx + 1}. {question}</p>
                            <button
                              onClick={() => handleAILearn(question)}
                              className="mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
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
