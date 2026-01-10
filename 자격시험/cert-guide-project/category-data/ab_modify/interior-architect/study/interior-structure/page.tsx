'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InteriorStructureStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('interior-structure-progress');
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
    localStorage.setItem('interior-structure-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    setCurrentPrompt(`실내건축기사 실내건축구조 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '구조의 기본 원리',
      questions: [
        '하중의 종류(고정하중, 활하중, 적설하중)를 설명하시오.',
        '응력과 변형률의 관계를 설명하시오.',
        '구조 시스템의 종류(라멘, 벽식, 트러스)를 설명하시오.',
        '철근콘크리트 구조의 특징을 설명하시오.',
        '철골 구조의 장단점을 설명하시오.',
        '조적 구조의 특성을 설명하시오.',
        '목구조의 종류와 특징을 설명하시오.',
        '내력벽과 비내력벽의 구분 방법을 설명하시오.',
        '건축물의 스팬과 층고 결정 요소를 설명하시오.',
        '구조안전확인 대상 건축물을 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '바닥, 벽, 천장 구조',
      questions: [
        '바닥 구조의 종류(습식, 건식)를 비교하시오.',
        '온돌 바닥 구조와 시공법을 설명하시오.',
        '이중바닥(Access Floor) 시스템을 설명하시오.',
        '바닥 레벨링 작업을 설명하시오.',
        '경량칸막이벽의 종류와 시공을 설명하시오.',
        '건식벽체(드라이월) 공법을 설명하시오.',
        '시스템천장의 종류를 설명하시오.',
        'T-bar 천장 시스템을 설명하시오.',
        '천장 높이 변경 시 고려사항을 설명하시오.',
        '메자닌(중층) 설치 구조를 설명하시오.'
      ]
    },
    {
      id: 3,
      title: '개구부와 계단',
      questions: [
        '창호의 종류와 특성을 설명하시오.',
        '문틀과 문의 설치 방법을 설명하시오.',
        '커튼월 시스템의 종류를 설명하시오.',
        '유리의 종류와 성능을 설명하시오.',
        '계단의 법적 기준(폭, 단높이, 단너비)을 설명하시오.',
        '계단 구조의 종류를 설명하시오.',
        '난간의 설치 기준을 설명하시오.',
        '피난계단과 특별피난계단을 비교하시오.',
        '에스컬레이터와 엘리베이터 계획을 설명하시오.',
        '장애인 이동 시설 기준을 설명하시오.'
      ]
    },
    {
      id: 4,
      title: '마감공사',
      questions: [
        '벽 마감재의 종류와 특성을 설명하시오.',
        '도배 공사의 종류와 시공법을 설명하시오.',
        '타일 공사 시공법을 설명하시오.',
        '석재 시공법(습식, 건식)을 비교하시오.',
        '목재 몰딩의 종류와 설치법을 설명하시오.',
        '도장 공사의 종류와 순서를 설명하시오.',
        '바닥 마감재 선정 기준을 설명하시오.',
        '목재 마루 시공법을 설명하시오.',
        '카펫 시공법을 설명하시오.',
        '에폭시 바닥 시공법을 설명하시오.'
      ]
    },
    {
      id: 5,
      title: '설비시스템',
      questions: [
        '급배수 설비의 기본 구성을 설명하시오.',
        '위생기구 설치 기준을 설명하시오.',
        '전기설비의 기본 용어를 설명하시오.',
        '조명 설비 계획을 설명하시오.',
        '콘센트 배치 계획을 설명하시오.',
        '공조 설비의 종류를 설명하시오.',
        '환기 설비 계획을 설명하시오.',
        '소방 설비의 종류를 설명하시오.',
        '스프링클러 시스템을 설명하시오.',
        '홈네트워크 시스템을 설명하시오.'
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">🏗️ 실내건축구조</h1>
          <p className="text-white/90">실내건축기사 필기 3과목</p>
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
