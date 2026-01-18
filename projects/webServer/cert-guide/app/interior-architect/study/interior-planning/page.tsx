'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function InteriorPlanningStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('interior-planning-progress');
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
    localStorage.setItem('interior-planning-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setCurrentPrompt(`실내건축기사 실내디자인론 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '디자인 원리와 요소',
      questions: [
        '디자인의 기본 요소(점, 선, 면, 형태)를 설명하시오.',
        '통일성과 변화의 원리를 설명하시오.',
        '균형(대칭, 비대칭, 방사형)의 종류와 특징을 설명하시오.',
        '리듬과 반복의 원리를 설명하시오.',
        '비례와 척도의 개념을 설명하시오.',
        '강조와 포인트의 활용법을 설명하시오.',
        '조화와 대비의 원리를 설명하시오.',
        '색채의 3속성(색상, 명도, 채도)을 설명하시오.',
        '색채 조화론(먼셀, 오스트발트)을 비교하시오.',
        '배색 기법(유사색, 보색, 삼원색)을 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '공간계획과 동선',
      questions: [
        '공간의 기능적 분류(공적, 사적, 서비스)를 설명하시오.',
        '동선계획의 원칙과 유형을 설명하시오.',
        '조닝(Zoning)의 개념과 방법을 설명하시오.',
        '주거공간의 기능별 면적 배분을 설명하시오.',
        '주방 작업 동선과 작업삼각형을 설명하시오.',
        '욕실 계획의 기본 원칙을 설명하시오.',
        '거실의 가구 배치 유형을 설명하시오.',
        '침실 계획과 수납공간 설계를 설명하시오.',
        '유니버설 디자인의 원칙을 설명하시오.',
        '배리어프리 디자인 적용 사례를 설명하시오.'
      ]
    },
    {
      id: 3,
      title: '실내디자인 역사',
      questions: [
        '고대 이집트 실내장식의 특징을 설명하시오.',
        '그리스 건축의 오더(도리아, 이오니아, 코린트)를 설명하시오.',
        '로마 실내장식의 특징을 설명하시오.',
        '고딕 양식의 특징을 설명하시오.',
        '르네상스 실내디자인의 특징을 설명하시오.',
        '바로크와 로코코 양식을 비교하시오.',
        '아르누보와 아르데코의 차이점을 설명하시오.',
        '모더니즘과 국제주의 양식을 설명하시오.',
        '포스트모더니즘의 특징과 대표 디자이너를 설명하시오.',
        '미니멀리즘 디자인의 원칙을 설명하시오.'
      ]
    },
    {
      id: 4,
      title: '스타일과 트렌드',
      questions: [
        '스칸디나비안 스타일의 특징을 설명하시오.',
        '재패니즈 모던 스타일의 특징을 설명하시오.',
        '인더스트리얼 스타일의 특징을 설명하시오.',
        '클래식 스타일의 특징과 요소를 설명하시오.',
        '컨템포러리 스타일의 특징을 설명하시오.',
        '에코 디자인과 친환경 소재를 설명하시오.',
        '스마트홈과 인테리어의 융합을 설명하시오.',
        '바이오필릭 디자인의 개념을 설명하시오.',
        '믹스앤매치 인테리어 방법을 설명하시오.',
        '홈퍼니싱 트렌드 분석 방법을 설명하시오.'
      ]
    },
    {
      id: 5,
      title: '프로젝트 진행 과정',
      questions: [
        '실내디자인 프로젝트 단계를 설명하시오.',
        '클라이언트 요구사항 분석 방법을 설명하시오.',
        '현장조사 및 실측의 중요성을 설명하시오.',
        '컨셉 개발 프로세스를 설명하시오.',
        '무드보드 제작 방법을 설명하시오.',
        '도면 작성의 종류와 순서를 설명하시오.',
        '3D 시각화의 활용법을 설명하시오.',
        '재료 및 마감재 선정 기준을 설명하시오.',
        '공사 감리와 품질관리를 설명하시오.',
        '실내디자인 관련 법규를 설명하시오.'
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.size / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/interior-architect/exam" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <span className="mr-2">←</span> 시험 정보로 돌아가기
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">🎨 실내디자인론</h1>
          <p className="text-white/90">실내건축기사 필기 1과목</p>
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
