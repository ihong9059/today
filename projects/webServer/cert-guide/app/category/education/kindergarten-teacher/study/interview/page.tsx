'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

interface Topic {
  id: number;
  question: string;
  prompt: string;
}

const topics: { title: string; icon: string; items: Topic[] }[] = [
  {
    title: '교직관 및 인성',
    icon: '👩‍🏫',
    items: [
      { id: 1, question: '유치원 교사가 되고 싶은 이유는?', prompt: '유치원정교사 임용면접에서 "유치원 교사가 되고 싶은 이유"를 묻는 질문에 대해, 진정성 있고 설득력 있는 모범 답변을 제시해주세요.' },
      { id: 2, question: '좋은 유아교사의 자질은?', prompt: '유치원정교사 임용면접에서 "좋은 유아교사가 갖추어야 할 자질"을 묻는 질문에 대해, 구체적인 역량과 실천 방안을 포함한 모범 답변을 제시해주세요.' },
      { id: 3, question: '유아교육의 중요성은?', prompt: '유치원정교사 임용면접에서 "유아교육이 왜 중요한지" 묻는 질문에 대해, 발달적·사회적 관점을 포함한 모범 답변을 제시해주세요.' },
      { id: 4, question: '10년 후 어떤 교사가 되고 싶은가?', prompt: '유치원정교사 임용면접에서 "10년 후 어떤 유아교사가 되어 있을 것인가" 묻는 질문에 대해, 비전과 성장 계획을 담은 모범 답변을 제시해주세요.' },
      { id: 5, question: '교사로서 자신의 강점과 약점은?', prompt: '유치원정교사 임용면접에서 "교사로서 자신의 강점과 약점" 질문에 대해, 솔직하면서도 성장 가능성을 보여주는 모범 답변을 제시해주세요.' }
    ]
  },
  {
    title: '누리과정과 교육철학',
    icon: '📚',
    items: [
      { id: 6, question: '놀이중심 교육과정이란?', prompt: '유치원정교사 임용면접에서 "놀이중심 교육과정의 의미와 실천 방안"을 묻는 질문에 대해, 2019 개정 누리과정을 반영한 모범 답변을 제시해주세요.' },
      { id: 7, question: '놀이에서 교사의 역할은?', prompt: '유치원정교사 임용면접에서 "놀이중심 교육에서 교사의 역할"을 묻는 질문에 대해, 관찰자·지원자·기록자로서의 역할을 포함한 모범 답변을 제시해주세요.' },
      { id: 8, question: '유아의 흥미를 어떻게 존중하는가?', prompt: '유치원정교사 임용면접에서 "유아의 흥미와 관심을 교육에 어떻게 반영할 것인가" 묻는 질문에 대해, 구체적인 전략을 포함한 모범 답변을 제시해주세요.' },
      { id: 9, question: '놀이와 학습의 관계는?', prompt: '유치원정교사 임용면접에서 "놀이와 학습의 관계"를 묻는 질문에 대해, 놀이를 통한 배움의 원리를 설명하는 모범 답변을 제시해주세요.' },
      { id: 10, question: '교육과정 자율성이란?', prompt: '유치원정교사 임용면접에서 "교육과정 자율성 확대의 의미와 실천 방안"을 묻는 질문에 대해, 교사의 전문성 발휘 관점에서 모범 답변을 제시해주세요.' }
    ]
  },
  {
    title: '학부모 및 가정 연계',
    icon: '👨‍👩‍👧',
    items: [
      { id: 11, question: '학부모 민원에 어떻게 대응하는가?', prompt: '유치원정교사 임용면접에서 "학부모가 교육 방법에 대해 민원을 제기할 때 어떻게 대응할 것인가" 묻는 질문에 대해, 전문성과 공감을 보여주는 모범 답변을 제시해주세요.' },
      { id: 12, question: '부모와 효과적으로 소통하는 방법은?', prompt: '유치원정교사 임용면접에서 "학부모와 효과적으로 소통하는 방법"을 묻는 질문에 대해, 다양한 소통 방안을 포함한 모범 답변을 제시해주세요.' },
      { id: 13, question: '가정연계 교육의 중요성은?', prompt: '유치원정교사 임용면접에서 "가정연계 교육의 중요성과 실천 방안"을 묻는 질문에 대해, 구체적인 연계 활동 예시를 포함한 모범 답변을 제시해주세요.' },
      { id: 14, question: '맞벌이 가정 유아 지원 방안은?', prompt: '유치원정교사 임용면접에서 "맞벌이 가정 유아를 어떻게 지원할 것인가" 묻는 질문에 대해, 돌봄과 교육적 지원을 포함한 모범 답변을 제시해주세요.' },
      { id: 15, question: '학부모 상담 시 주의할 점은?', prompt: '유치원정교사 임용면접에서 "학부모 상담 시 주의할 점과 효과적인 상담 기법"을 묻는 질문에 대해, 실제적인 전략을 담은 모범 답변을 제시해주세요.' }
    ]
  },
  {
    title: '유아 지도 상황',
    icon: '🤝',
    items: [
      { id: 16, question: '유아 간 갈등 상황 대처법은?', prompt: '유치원정교사 임용면접에서 "유아들 사이에 갈등이 발생했을 때 어떻게 대처할 것인가" 묻는 질문에 대해, 발달에 적합한 중재 방법을 포함한 모범 답변을 제시해주세요.' },
      { id: 17, question: '소극적인 유아 참여 유도 방법은?', prompt: '유치원정교사 임용면접에서 "소극적이고 위축된 유아의 참여를 어떻게 유도할 것인가" 묻는 질문에 대해, 개별화된 지원 전략을 포함한 모범 답변을 제시해주세요.' },
      { id: 18, question: '공격적인 유아 지도 방법은?', prompt: '유치원정교사 임용면접에서 "공격적인 행동을 보이는 유아를 어떻게 지도할 것인가" 묻는 질문에 대해, PBS 원리를 적용한 모범 답변을 제시해주세요.' },
      { id: 19, question: '새학기 적응이 어려운 유아 지원은?', prompt: '유치원정교사 임용면접에서 "새학기 적응이 어려운 유아를 어떻게 지원할 것인가" 묻는 질문에 대해, 분리불안 대응을 포함한 모범 답변을 제시해주세요.' },
      { id: 20, question: '특수교육 대상 유아 통합교육은?', prompt: '유치원정교사 임용면접에서 "특수교육 대상 유아의 통합교육을 어떻게 실천할 것인가" 묻는 질문에 대해, 통합교육의 원리와 구체적 방법을 포함한 모범 답변을 제시해주세요.' }
    ]
  },
  {
    title: '교육 정책 및 시사',
    icon: '📰',
    items: [
      { id: 21, question: '유보통합에 대한 견해는?', prompt: '유치원정교사 임용면접에서 "유보통합(유치원-어린이집 통합)에 대한 견해"를 묻는 질문에 대해, 현장 교사 관점에서 균형잡힌 모범 답변을 제시해주세요.' },
      { id: 22, question: '디지털 기기 활용에 대한 견해는?', prompt: '유치원정교사 임용면접에서 "유아교육에서 디지털 기기 활용에 대한 견해"를 묻는 질문에 대해, 발달에 적합한 활용 방안을 포함한 모범 답변을 제시해주세요.' },
      { id: 23, question: '다문화 교육 실천 방안은?', prompt: '유치원정교사 임용면접에서 "다문화 가정 유아를 위한 교육을 어떻게 실천할 것인가" 묻는 질문에 대해, 포용적 교육환경 조성을 포함한 모범 답변을 제시해주세요.' },
      { id: 24, question: '유아 안전교육의 중요성은?', prompt: '유치원정교사 임용면접에서 "유아 안전교육의 중요성과 효과적인 방법"을 묻는 질문에 대해, 연령에 적합한 안전교육 방안을 포함한 모범 답변을 제시해주세요.' },
      { id: 25, question: 'AI 시대 유아교사의 역할은?', prompt: '유치원정교사 임용면접에서 "AI 시대에 유아교사의 역할은 어떻게 변화해야 하는가" 묻는 질문에 대해, 인간중심 교육의 가치를 강조한 모범 답변을 제시해주세요.' }
    ]
  }
];

export default function InterviewPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('kindergarten-interview-progress');
    if (saved) {
      setCompletedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kindergarten-interview-progress', JSON.stringify(completedItems));
  }, [completedItems]);

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleComplete = (id: number) => {
    setCompletedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAIHelp = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const totalItems = topics.reduce((acc, topic) => acc + topic.items.length, 0);
  const progressPercentage = (completedItems.length / totalItems) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/category/education/kindergarten-teacher" className="hover:text-rose-600 transition">
              유치원정교사
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">면접</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">🎤 면접 학습</h1>
          <p className="text-gray-600 mt-1">2차 시험 면접 핵심 영역 25문제</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">학습 진도</h2>
              <p className="text-gray-600">{completedItems.length} / {totalItems} 완료</p>
            </div>
            <div className="text-3xl font-bold text-rose-600">
              {Math.round(progressPercentage)}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {completedItems.length > 0 && (
            <button
              onClick={() => setCompletedItems([])}
              className="mt-4 text-sm text-red-500 hover:text-red-700 transition"
            >
              진도 초기화
            </button>
          )}
        </div>

        {/* Study Tips */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-rose-800 mb-3">💡 면접 준비 TIP</h3>
          <ul className="space-y-2 text-rose-700">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 mt-1">•</span>
              <span>2019 개정 누리과정의 핵심(놀이중심, 유아중심)을 반드시 숙지하세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 mt-1">•</span>
              <span>유아의 발달 특성을 고려한 구체적인 지도 방안을 준비하세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 mt-1">•</span>
              <span>교육 실습이나 봉사활동 경험을 바탕으로 사례를 준비하세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 mt-1">•</span>
              <span>밝은 표정과 자신감 있는 태도로 답변하세요</span>
            </li>
          </ul>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicCompleted = topic.items.filter(item =>
              completedItems.includes(item.id)
            ).length;

            return (
              <div key={topicIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{topicCompleted}/{topic.items.length} 완료</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-rose-500 h-2 rounded-full transition-all"
                        style={{ width: `${(topicCompleted / topic.items.length) * 100}%` }}
                      />
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {openTopics.includes(topicIndex) && (
                  <div className="border-t divide-y">
                    {topic.items.map((item) => (
                      <div
                        key={item.id}
                        className={`px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition ${
                          completedItems.includes(item.id) ? 'bg-green-50' : ''
                        }`}
                      >
                        <button
                          onClick={() => toggleComplete(item.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            completedItems.includes(item.id)
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-rose-500'
                          }`}
                        >
                          {completedItems.includes(item.id) && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${completedItems.includes(item.id) ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {item.id}. {item.question}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAIHelp(item.prompt)}
                          className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-rose-600 hover:to-pink-600 transition shadow-md"
                        >
                          🤖 AI 도움
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/category/education/kindergarten-teacher/study/teaching-methods"
            className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition shadow-md"
          >
            ← 교수학습방법
          </Link>
          <Link
            href="/category/education/kindergarten-teacher"
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium rounded-xl hover:from-rose-600 hover:to-pink-600 transition shadow-md"
          >
            메인으로 →
          </Link>
        </div>
      </div>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">🤖 AI 학습 도우미</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-6 text-sm bg-gray-50 p-4 rounded-xl">
                {currentPrompt.slice(0, 100)}...
              </p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-xl transition border border-orange-200"
                >
                  <span className="text-3xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-sm text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition border border-green-200"
                >
                  <span className="text-3xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-sm text-green-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition border border-blue-200"
                >
                  <span className="text-3xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-sm text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
