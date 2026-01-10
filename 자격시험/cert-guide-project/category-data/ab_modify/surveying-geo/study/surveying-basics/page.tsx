'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SurveyingBasicsStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('surveying-basics-progress');
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
    localStorage.setItem('surveying-basics-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    setCurrentPrompt(`측량및지형공간정보기사 측량학 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '거리측량',
      questions: [
        '거리측량의 종류와 방법을 설명하시오.',
        '테이프 측량의 오차와 보정 방법을 설명하시오.',
        '경사보정 계산법을 설명하시오.',
        '온도보정과 장력보정을 설명하시오.',
        '광파측거기(EDM)의 원리를 설명하시오.',
        'EDM 기상보정 방법을 설명하시오.',
        '스타디아 측량의 원리와 공식을 설명하시오.',
        '거리측량의 정밀도 표시법을 설명하시오.',
        '전자파 거리측량의 오차 요인을 설명하시오.',
        '레이저 거리측정기의 특성을 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '각측량',
      questions: [
        '수평각 관측법의 종류를 설명하시오.',
        '배각법과 방향각법을 비교하시오.',
        '트랜싯의 구조와 축을 설명하시오.',
        '각측량 오차의 종류와 소거법을 설명하시오.',
        '연직각 측정 방법을 설명하시오.',
        '토탈스테이션의 원리와 기능을 설명하시오.',
        '시준오차와 수평축오차를 설명하시오.',
        '외심오차와 시준축 기울기오차를 설명하시오.',
        '전자각측 방식을 설명하시오.',
        '자동 시준 시스템을 설명하시오.'
      ]
    },
    {
      id: 3,
      title: '수준측량',
      questions: [
        '수준측량의 원리와 종류를 설명하시오.',
        '레벨의 구조와 조정 방법을 설명하시오.',
        '직접수준측량 야장기입법을 설명하시오.',
        '왕복수준측량의 오차 허용범위를 설명하시오.',
        '교호수준측량의 목적과 방법을 설명하시오.',
        '삼각수준측량(간접수준측량)을 설명하시오.',
        '지구곡률오차와 대기굴절오차를 설명하시오.',
        '수준점 표고 결정 방법을 설명하시오.',
        '디지털 레벨의 특징을 설명하시오.',
        '정밀수준측량의 작업규정을 설명하시오.'
      ]
    },
    {
      id: 4,
      title: '다각측량',
      questions: [
        '다각측량의 종류와 특징을 설명하시오.',
        '방위각과 방위의 계산법을 설명하시오.',
        '위거와 경거의 정의와 계산법을 설명하시오.',
        '폐합오차와 폐합비를 설명하시오.',
        '트래버스 조정법(컴파스법칙, 트랜싯법칙)을 비교하시오.',
        '좌표 계산 방법을 설명하시오.',
        '면적 계산법(좌표법, 배횡거법)을 설명하시오.',
        '결합 트래버스 계산을 설명하시오.',
        '삼각측량과 삼변측량을 비교하시오.',
        '교회법에 의한 위치 결정을 설명하시오.'
      ]
    },
    {
      id: 5,
      title: '응용측량',
      questions: [
        '노선측량의 순서와 방법을 설명하시오.',
        '단곡선 설치법을 설명하시오.',
        '완화곡선(클로소이드)의 특성을 설명하시오.',
        '종단곡선 설계를 설명하시오.',
        '토량계산(단면법, 점고법)을 설명하시오.',
        '유토곡선의 작성과 활용을 설명하시오.',
        '하천측량의 종류와 방법을 설명하시오.',
        '터널측량의 특수성을 설명하시오.',
        '지하시설물측량 방법을 설명하시오.',
        '경계측량과 지적측량을 설명하시오.'
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">측량학 개론</h1>
          <p className="text-white/90">측량및지형공간정보기사 필기 1과목</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-emerald-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-3 rounded-full transition-all"
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
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
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
                      <div key={idx} className={`p-3 rounded-lg border ${isCompleted ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => saveProgress(qId)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex-shrink-0 ${isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'}`}
                          >
                            {isCompleted && '✓'}
                          </button>
                          <div className="flex-1">
                            <p className="text-gray-700">{idx + 1}. {question}</p>
                            <button
                              onClick={() => handleAILearn(question)}
                              className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                            >
                              AI에게 배우기
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
