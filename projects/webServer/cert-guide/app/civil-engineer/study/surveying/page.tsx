'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function SurveyingStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('civil-surveying-progress');
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
    localStorage.setItem('civil-surveying-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setCurrentPrompt(`토목기사 측량학 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '거리측량',
      questions: [
        '거리측량의 종류와 특징을 설명하시오.',
        '줄자(테이프) 측량의 오차 원인을 설명하시오.',
        '경사보정과 온도보정 계산법을 설명하시오.',
        '장력보정과 처짐보정 방법을 설명하시오.',
        '광파측거기(EDM)의 원리를 설명하시오.',
        '광파측거기의 오차 원인과 보정 방법을 설명하시오.',
        '스타디아 측량의 원리와 계산법을 설명하시오.',
        '거리측량의 정밀도 표시 방법을 설명하시오.',
        '정밀측량과 보통측량의 허용오차를 비교하시오.',
        '전자파 거리측량의 대기보정을 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '각측량과 다각측량',
      questions: [
        '수평각 관측법(단각법, 배각법, 방향각법)을 비교하시오.',
        '트랜싯의 구조와 조정 방법을 설명하시오.',
        '각측량 오차의 종류와 소거법을 설명하시오.',
        '다각측량의 종류와 특징을 설명하시오.',
        '방위각과 방위의 정의 및 계산법을 설명하시오.',
        '위거, 경거 및 폐합오차 계산법을 설명하시오.',
        '폐합비와 허용오차를 설명하시오.',
        '트래버스 조정법(컴파스법칙, 트랜싯법칙)을 비교하시오.',
        '면적 계산법(좌표법, 배횡거법)을 설명하시오.',
        'GPS를 이용한 다각측량 방법을 설명하시오.'
      ]
    },
    {
      id: 3,
      title: '수준측량',
      questions: [
        '수준측량의 원리와 종류를 설명하시오.',
        '레벨의 구조와 조정 방법을 설명하시오.',
        '직접수준측량 야장기입법을 설명하시오.',
        '교호수준측량의 목적과 방법을 설명하시오.',
        '왕복수준측량의 허용오차를 설명하시오.',
        '간접수준측량(삼각수준측량)을 설명하시오.',
        '수준측량 오차의 원인과 소거법을 설명하시오.',
        '지구곡률오차와 굴절오차 보정을 설명하시오.',
        '종단측량과 횡단측량 방법을 설명하시오.',
        '디지털레벨의 특징과 측량 방법을 설명하시오.'
      ]
    },
    {
      id: 4,
      title: 'GPS 측량',
      questions: [
        'GPS의 구성요소와 측위 원리를 설명하시오.',
        '위성신호의 종류(C/A코드, P코드)를 설명하시오.',
        'GPS 오차의 종류와 영향을 설명하시오.',
        'DGPS(상대측위)의 원리를 설명하시오.',
        'RTK-GPS 측량 방법을 설명하시오.',
        '정지측량과 이동측량의 차이를 설명하시오.',
        'VRS(가상기준점) 측량을 설명하시오.',
        'GNSS(GPS, GLONASS, Galileo)를 비교하시오.',
        '좌표계와 측지기준계를 설명하시오.',
        'GPS 측량성과의 정확도 평가 방법을 설명하시오.'
      ]
    },
    {
      id: 5,
      title: '지형측량과 노선측량',
      questions: [
        '지형도의 축척과 등고선 간격의 관계를 설명하시오.',
        '등고선의 성질과 종류를 설명하시오.',
        '등고선 보간법과 지형도 작성법을 설명하시오.',
        '평판측량의 방법과 정위치 조건을 설명하시오.',
        '노선측량의 순서와 방법을 설명하시오.',
        '단곡선의 설치법(편각법, 접선오프셋법)을 설명하시오.',
        '완화곡선의 특성과 클로소이드를 설명하시오.',
        '종단곡선의 설계와 계산법을 설명하시오.',
        '토량계산(단면법, 점고법)을 설명하시오.',
        '유토곡선(Mass Curve)의 작성과 활용을 설명하시오.'
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">🗺️ 측량학</h1>
          <p className="text-white/90">토목기사 필기 2과목</p>
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
