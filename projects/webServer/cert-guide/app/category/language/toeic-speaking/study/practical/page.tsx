'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TOEICSpeakingPracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('toeic-speaking-practical-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('toeic-speaking-practical-completed', JSON.stringify(items));
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
        "시험 30분 전 입실: 마이크/헤드셋 테스트 시간 확보",
        "목 풀기: 시험 전 영어로 혼잣말하며 발성 워밍업",
        "마이크 거리: 입에서 5-10cm 거리 유지",
        "목소리 크기: 일정하게 유지, 너무 크거나 작지 않게",
        "답변 시작/끝: 명확하게 시작하고 자연스럽게 마무리"
      ]
    },
    {
      title: "등급별 공략법",
      icon: "📊",
      items: [
        "Level 5 목표: 기본 템플릿 완벽 숙지, 시간 내 답변 완료",
        "Level 6 목표: 다양한 어휘와 문장 구조, 자연스러운 연결",
        "Level 7 목표: 복잡한 문장, 구체적 예시, 유창한 전달",
        "Level 8 목표: 원어민 수준의 발음/억양, 논리적 전개",
        "취약점 분석: 녹음 후 반복 청취하여 개선점 파악"
      ]
    },
    {
      title: "Q1-2 실전 전략",
      icon: "📖",
      items: [
        "45초 준비: 지문 전체 2회 묵독, 어려운 단어 확인",
        "발음 주의: 숫자, 고유명사, 전문용어 미리 연습",
        "끊어 읽기: 콤마, 마침표에서 자연스럽게 pause",
        "속도 유지: 너무 빠르거나 느리지 않은 일정한 속도",
        "자신감: 실수해도 멈추지 말고 계속 진행"
      ]
    },
    {
      title: "Q3-4 사진 묘사 전략",
      icon: "🖼️",
      items: [
        "30초 구조: 전체(5초)-주요(10초)-세부(10초)-마무리(5초)",
        "필수 표현: In this picture, I can see...",
        "위치 표현: foreground/background, left/right 활용",
        "동작 묘사: 현재진행형으로 동작 설명",
        "추측 표현: It looks like..., It seems that... 활용"
      ]
    },
    {
      title: "Q11 의견 말하기 전략",
      icon: "🎯",
      items: [
        "60초 구조: 의견(10초)-이유1(20초)-이유2(20초)-결론(10초)",
        "의견 명확히: I strongly believe that... 로 시작",
        "이유 연결: First... Second... 또는 Firstly... Moreover...",
        "예시 추가: For example..., In my experience...",
        "결론 강조: For these reasons, I think... 로 마무리"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/toeic-speaking" className="text-sky-600 hover:text-sky-800 flex items-center gap-2">
            <span>←</span>
            <span>TOEIC Speaking으로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">📝</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">실전 대비</h1>
              <p className="text-gray-600">시험 전략 및 템플릿 25문항</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-sky-500 to-blue-500 h-3 rounded-full transition-all"
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
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-sky-50 transition-colors"
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
                            isCompleted ? 'bg-sky-50 border-sky-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-sky-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-sky-500 hover:text-sky-700 text-xs px-2 py-1 rounded bg-sky-100 hover:bg-sky-200"
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

        <div className="mt-8 bg-sky-50 rounded-xl p-6 border border-sky-200">
          <h3 className="font-bold text-sky-800 mb-3">💡 실전 대비 핵심</h3>
          <ul className="space-y-2 text-sky-700 text-sm">
            <li>• 모의시험으로 실전 감각을 익히세요</li>
            <li>• 시간 내 답변 완료하는 연습이 가장 중요합니다</li>
            <li>• 자주 나오는 주제별 템플릿을 준비하세요</li>
            <li>• 녹음 후 피드백으로 취약점을 개선하세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`TOEIC Speaking 실전 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법과 예시를 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`TOEIC Speaking 실전 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법과 예시를 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`TOEIC Speaking 실전 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법과 예시를 설명해주세요.`)}`}
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
