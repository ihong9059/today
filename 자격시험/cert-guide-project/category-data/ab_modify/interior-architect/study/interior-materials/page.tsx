'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InteriorMaterialsStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('interior-materials-progress');
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
    localStorage.setItem('interior-materials-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    setCurrentPrompt(`실내건축기사 건축재료 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '목재와 목질재료',
      questions: [
        '목재의 장단점을 설명하시오.',
        '목재의 결점(옹이, 갈라짐, 뒤틀림)을 설명하시오.',
        '목재의 함수율과 건조 방법을 설명하시오.',
        '침엽수와 활엽수의 특성을 비교하시오.',
        '합판의 종류와 특성을 설명하시오.',
        'MDF와 파티클보드를 비교하시오.',
        '집성목과 CLT를 설명하시오.',
        '목재 방부 처리 방법을 설명하시오.',
        '목재 난연 처리 방법을 설명하시오.',
        '친환경 목질재료 인증제도를 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '석재와 타일',
      questions: [
        '석재의 분류(화성암, 수성암, 변성암)를 설명하시오.',
        '화강석의 특성과 용도를 설명하시오.',
        '대리석의 특성과 주의사항을 설명하시오.',
        '인조석의 종류와 특성을 설명하시오.',
        '석재 마감법의 종류를 설명하시오.',
        '도기질, 석기질, 자기질 타일을 비교하시오.',
        '타일의 물흡수율과 강도를 설명하시오.',
        '타일 규격과 선정 기준을 설명하시오.',
        '모자이크 타일의 특성을 설명하시오.',
        '타일 시공 시 주의사항을 설명하시오.'
      ]
    },
    {
      id: 3,
      title: '금속재료',
      questions: [
        '철강재의 종류와 특성을 설명하시오.',
        '스테인리스강의 종류와 특성을 설명하시오.',
        '알루미늄의 특성과 용도를 설명하시오.',
        '동 및 동합금의 특성을 설명하시오.',
        '금속 표면처리 방법을 설명하시오.',
        '도금의 종류와 방법을 설명하시오.',
        '양극산화(아노다이징) 처리를 설명하시오.',
        '분체 도장(파우더 코팅)을 설명하시오.',
        '금속 패널의 종류를 설명하시오.',
        '금속의 부식 원인과 방지책을 설명하시오.'
      ]
    },
    {
      id: 4,
      title: '유리와 플라스틱',
      questions: [
        '판유리의 종류와 특성을 설명하시오.',
        '강화유리와 배강도유리를 비교하시오.',
        '접합유리의 구조와 특성을 설명하시오.',
        '복층유리(페어글라스)를 설명하시오.',
        'Low-E 유리의 원리와 효과를 설명하시오.',
        '장식유리의 종류를 설명하시오.',
        '플라스틱의 종류(열가소성, 열경화성)를 설명하시오.',
        '아크릴과 폴리카보네이트를 비교하시오.',
        'PVC의 특성과 용도를 설명하시오.',
        '필름(시트지)의 종류와 용도를 설명하시오.'
      ]
    },
    {
      id: 5,
      title: '도장과 마감재',
      questions: [
        '도료의 구성 성분을 설명하시오.',
        '수성 도료와 유성 도료를 비교하시오.',
        '에나멜 도료와 래커를 비교하시오.',
        '우레탄 도료의 특성을 설명하시오.',
        '친환경 도료(저VOC)를 설명하시오.',
        '벽지의 종류와 특성을 설명하시오.',
        '비닐 벽지와 실크 벽지를 비교하시오.',
        '인테리어 필름의 종류를 설명하시오.',
        '패브릭 마감재의 특성을 설명하시오.',
        '천연 마감재(황토, 규조토)를 설명하시오.'
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">🧱 건축재료</h1>
          <p className="text-white/90">실내건축기사 필기 4과목</p>
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
