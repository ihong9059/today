'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function OPIcPracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('opic-practical-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('opic-practical-completed', JSON.stringify(items));
    setCompletedItems(items);
  };

  const toggleItem = (id: string) => {
    const newItems = completedItems.includes(id)
      ? completedItems.filter(i => i !== id)
      : [...completedItems, id];
    saveProgress(newItems);
  };

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const openAIHelper = (question: string) => {
    setCurrentQuestion(question);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: "시험 당일 전략",
      icon: "📅",
      items: [
        "시험 15분 전까지 입실하여 마음을 안정시키기",
        "Background Survey 선택 항목 미리 정해두기",
        "마이크 테스트 시간에 영어로 워밍업하기",
        "질문을 끝까지 듣고 2-3초 생각 후 답변 시작",
        "막히면 Well, Let me think... 로 시간 벌기"
      ]
    },
    {
      title: "등급별 목표 전략",
      icon: "📊",
      items: [
        "IM1 목표: 간단한 문장으로 질문에 정확히 답변하기",
        "IM2 목표: 이유와 예시를 포함한 완성된 답변 구성",
        "IM3 목표: 다양한 시제와 표현으로 유창하게 말하기",
        "IH 목표: 복잡한 상황도 자연스럽게 설명하기",
        "AL 목표: 추상적 주제에 대해 논리적으로 토론하기"
      ]
    },
    {
      title: "답변 시간 관리",
      icon: "⏱️",
      items: [
        "자기소개: 1분 내외로 자연스럽게 마무리",
        "묘사 질문: 40-60초 분량으로 구체적으로",
        "경험 질문: 60-90초 분량으로 에피소드 포함",
        "롤플레이: 45초 내외, 질문 3개 이상 필수",
        "의견 질문: 60-90초, 이유 2개 이상 포함"
      ]
    },
    {
      title: "유창성 향상 전략",
      icon: "🗣️",
      items: [
        "필러 사용: um, well, you know 자연스럽게 활용",
        "연결어 활용: and, but, so, because로 문장 연결",
        "끊김 최소화: 완벽한 문장보다 흐름 유지가 중요",
        "속도 조절: 너무 빠르거나 느리지 않게 말하기",
        "자신감: 실수해도 당황하지 않고 계속 진행"
      ]
    },
    {
      title: "고득점 핵심 포인트",
      icon: "🎯",
      items: [
        "구체적 예시: 추상적 설명보다 구체적 에피소드",
        "다양한 시제: 과거, 현재, 미래 시제 적절히 활용",
        "이유 제시: because, that's why 등으로 이유 설명",
        "감정 표현: I was happy/excited/surprised 등 감정 추가",
        "마무리 문장: 답변 끝에 결론/요약 문장 추가"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/opic" className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2">
            <span>←</span>
            <span>OPIc으로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🎯</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">실전 대비</h1>
              <p className="text-gray-600">등급별 전략 25문항</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">{completedItems.length}/{totalItems}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicItems = topic.items.map((_, i) => `${topicIndex}-${i}`);
            const completedInTopic = topicItems.filter(id => completedItems.includes(id)).length;

            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-emerald-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{completedInTopic}/{topic.items.length} 완료</p>
                    </div>
                  </div>
                  <span className={`transform transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {openTopics.includes(topicIndex) && (
                  <div className="px-6 pb-4 space-y-2">
                    {topic.items.map((item, itemIndex) => {
                      const itemId = `${topicIndex}-${itemIndex}`;
                      const isCompleted = completedItems.includes(itemId);

                      return (
                        <div
                          key={itemIndex}
                          className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                            isCompleted ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-emerald-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-emerald-500 hover:text-emerald-700 text-xs px-2 py-1 rounded bg-emerald-100 hover:bg-emerald-200"
                          >
                            AI
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-emerald-50 rounded-xl p-6 border border-emerald-200">
          <h3 className="font-bold text-emerald-800 mb-3">💡 실전 핵심 포인트</h3>
          <ul className="space-y-2 text-emerald-700 text-sm">
            <li>• Background Survey 선택이 점수의 50%를 좌우합니다</li>
            <li>• 자신 있는 주제를 선택하고 관련 답변 미리 준비하세요</li>
            <li>• 완벽한 문법보다 자연스러운 흐름이 더 중요합니다</li>
            <li>• 매일 10분씩 영어로 혼잣말 연습하세요</li>
          </ul>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{currentQuestion}</p>
            <div className="space-y-2">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(`OPIc 실전 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법과 예시를 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`OPIc 실전 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법과 예시를 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`OPIc 실전 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법과 예시를 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600"
              >
                Gemini에게 질문
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
