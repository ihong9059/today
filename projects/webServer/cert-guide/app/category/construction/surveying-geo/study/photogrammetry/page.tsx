'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PhotogrammetryStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('surveying-photogrammetry-progress');
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
    localStorage.setItem('surveying-photogrammetry-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setCurrentPrompt(`측량및지형공간정보기사 사진측량 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '사진측량 기초',
      questions: [
        '사진측량의 정의와 분류를 설명하시오.',
        '중심투영과 정사투영을 비교하시오.',
        '사진축척과 촬영고도의 관계를 설명하시오.',
        '중복도(종중복, 횡중복)를 설명하시오.',
        '기선고도비(B/H)를 설명하시오.',
        '항공사진의 편위(기복변위, 경사변위)를 설명하시오.',
        '렌즈 왜곡의 종류와 보정을 설명하시오.',
        '카메라 캘리브레이션을 설명하시오.',
        '지상기준점(GCP)의 역할을 설명하시오.',
        '항공삼각측량의 원리를 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '표정과 편위수정',
      questions: [
        '내부표정의 개념과 요소를 설명하시오.',
        '상호표정의 원리를 설명하시오.',
        '공선조건식을 설명하시오.',
        '절대표정의 과정을 설명하시오.',
        '외부표정 요소(6개)를 설명하시오.',
        '공면조건을 설명하시오.',
        '편위수정의 원리를 설명하시오.',
        '정사투영 변환을 설명하시오.',
        '수치미분정정을 설명하시오.',
        '접합선 처리 방법을 설명하시오.'
      ]
    },
    {
      id: 3,
      title: '수치사진측량',
      questions: [
        '수치사진측량의 작업 흐름을 설명하시오.',
        '영상정합(Image Matching)을 설명하시오.',
        '자동DEM 생성 방법을 설명하시오.',
        '정사영상 제작 과정을 설명하시오.',
        '수치도화의 원리를 설명하시오.',
        '스테레오 영상처리를 설명하시오.',
        'SfM(Structure from Motion)을 설명하시오.',
        '드론 사진측량을 설명하시오.',
        '라이다 데이터 처리를 설명하시오.',
        '점군데이터 활용을 설명하시오.'
      ]
    },
    {
      id: 4,
      title: '원격탐사',
      questions: [
        '원격탐사의 정의와 원리를 설명하시오.',
        '전자기파 스펙트럼을 설명하시오.',
        '분광반사특성을 설명하시오.',
        '능동탐사와 수동탐사를 비교하시오.',
        '위성영상의 종류를 설명하시오.',
        '공간해상도, 분광해상도, 시간해상도를 설명하시오.',
        '대기보정 방법을 설명하시오.',
        '기하보정을 설명하시오.',
        '영상분류(감독/무감독)를 설명하시오.',
        '식생지수(NDVI)를 설명하시오.'
      ]
    },
    {
      id: 5,
      title: '영상처리와 분석',
      questions: [
        '영상강조(Enhancement) 기법을 설명하시오.',
        '히스토그램 처리를 설명하시오.',
        '공간필터링을 설명하시오.',
        '영상융합(Pan-sharpening)을 설명하시오.',
        '변화탐지 기법을 설명하시오.',
        '객체기반 영상분석(OBIA)을 설명하시오.',
        '딥러닝 영상분석을 설명하시오.',
        'SAR 영상의 특성을 설명하시오.',
        '열적외선 영상 활용을 설명하시오.',
        '초분광 영상 분석을 설명하시오.'
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">사진측량 및 원격탐사</h1>
          <p className="text-white/90">측량및지형공간정보기사 필기 3과목</p>
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
