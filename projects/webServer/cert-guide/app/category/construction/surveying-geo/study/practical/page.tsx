'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function SurveyingPracticalStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('surveying-practical-progress');
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
    localStorage.setItem('surveying-practical-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setCurrentPrompt(`측량및지형공간정보기사 실기시험 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '다각측량 계산',
      questions: [
        '방위각 계산과 폐합오차 조정을 설명하시오.',
        '위거·경거 계산과 조정을 설명하시오.',
        '좌표 계산 방법을 설명하시오.',
        '면적 계산(좌표법)을 설명하시오.',
        '결합 트래버스 계산을 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '수준측량 계산',
      questions: [
        '야장 정리와 표고 계산을 설명하시오.',
        '오차 배분과 조정을 설명하시오.',
        '왕복 측량 성과 정리를 설명하시오.',
        '수준망 조정 계산을 설명하시오.',
        '정밀수준측량 성과 정리를 설명하시오.'
      ]
    },
    {
      id: 3,
      title: 'GPS 측량 계산',
      questions: [
        '좌표변환(TM좌표-경위도) 계산을 설명하시오.',
        '기선벡터 계산을 설명하시오.',
        '망조정 계산을 설명하시오.',
        '정확도 평가 방법을 설명하시오.',
        'GNSS 측량 성과표 작성법을 설명하시오.'
      ]
    },
    {
      id: 4,
      title: '노선측량 계산',
      questions: [
        '단곡선 요소 계산을 설명하시오.',
        '중심말뚝 좌표 계산을 설명하시오.',
        '종단곡선 설계 계산을 설명하시오.',
        '토량 계산(양단면법)을 설명하시오.',
        '유토곡선 작성을 설명하시오.'
      ]
    },
    {
      id: 5,
      title: '도면 해석 및 면적',
      questions: [
        '지형도 독도와 판독을 설명하시오.',
        '등고선에서 경사 계산을 설명하시오.',
        '횡단면도 작성을 설명하시오.',
        '삼각형 분할법 면적 계산을 설명하시오.',
        '구적기 사용법을 설명하시오.'
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.size / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/category/construction/surveying-geo/exam" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <span className="mr-2">←</span> 시험 정보로 돌아가기
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">실기시험 대비</h1>
          <p className="text-white/90">측량및지형공간정보기사 실기 - 필답형</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-emerald-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-3 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedQuestions.size} / {totalQuestions} 문제 완료</p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-800 font-medium">실기시험 안내</p>
          <p className="text-yellow-700 text-sm mt-1">
            필답형 시험으로 3시간 동안 진행됩니다. 계산 과정을 반드시 기재하세요.
          </p>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)} className="w-full p-4 flex justify-between items-center hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">{topic.id}</span>
                  <span className="font-medium text-gray-800">{topic.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{topic.questions.filter((_, i) => completedQuestions.has(`${topic.id}-${i}`)).length}/{topic.questions.length}</span>
                  <span className={`transform transition-transform ${expandedTopic === topic.id ? 'rotate-180' : ''}`}>▼</span>
                </div>
              </button>
              {expandedTopic === topic.id && (
                <div className="border-t p-4 space-y-3">
                  {topic.questions.map((question, idx) => {
                    const qId = `${topic.id}-${idx}`;
                    const isCompleted = completedQuestions.has(qId);
                    return (
                      <div key={idx} className={`p-3 rounded-lg border ${isCompleted ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button onClick={() => saveProgress(qId)} className={`mt-1 w-5 h-5 rounded border-2 flex-shrink-0 ${isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'}`}>{isCompleted && '✓'}</button>
                          <div className="flex-1">
                            <p className="text-gray-700">{idx + 1}. {question}</p>
                            <button onClick={() => handleAILearn(question)} className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium">AI에게 배우기</button>
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
                <h3 className="text-lg font-bold">AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
              </div>
              <p className="text-sm text-gray-600 mb-4">학습할 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-orange-100 hover:bg-orange-200 rounded-lg text-center font-medium text-orange-700 transition-colors">Claude (Anthropic)</a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-green-100 hover:bg-green-200 rounded-lg text-center font-medium text-green-700 transition-colors">ChatGPT (OpenAI)</a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-blue-100 hover:bg-blue-200 rounded-lg text-center font-medium text-blue-700 transition-colors">Gemini (Google)</a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="mt-4 w-full p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
