'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function HSKPracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('hsk-practical-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('hsk-practical-completed', JSON.stringify(items));
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
      title: "시험 당일 준비",
      icon: "📅",
      items: [
        "시험 30분 전까지 입실 완료하기",
        "수험표와 신분증(여권/주민등록증) 필수 지참",
        "연필(2B), 지우개 여유있게 준비",
        "시계 지참 (휴대폰 사용 불가)",
        "시험장 위치 사전 확인하기"
      ]
    },
    {
      title: "듣기 파트 전략",
      icon: "🎧",
      items: [
        "음성 재생 전 보기 먼저 훑어보기",
        "숫자, 시간, 장소 정보 메모하기",
        "화자의 태도/감정 주의깊게 듣기",
        "모르는 문제는 바로 넘기고 다음 집중",
        "음성은 2번 재생 - 1회차 전체 파악, 2회차 세부 확인"
      ]
    },
    {
      title: "독해 파트 전략",
      icon: "📖",
      items: [
        "질문을 먼저 읽고 본문 읽기",
        "핵심 키워드에 밑줄 치기",
        "지시어(这, 那, 其) 대상 확인하기",
        "접속사로 논리 구조 파악하기",
        "시간 배분 철저히 (문항당 1분 이내)"
      ]
    },
    {
      title: "쓰기 파트 전략",
      icon: "✍️",
      items: [
        "어순 배열: 주어-술어-목적어 순서 확인",
        "제시된 단어 모두 사용했는지 확인",
        "획순 정확히, 글씨 깔끔하게",
        "6급 요약문: 핵심만 추출, 400자 준수",
        "마지막 5분은 검토에 사용"
      ]
    },
    {
      title: "등급별 목표 전략",
      icon: "🎯",
      items: [
        "1-2급: 기초 어휘와 문형 완벽히 암기",
        "3급: 일상 회화 패턴 집중 학습",
        "4급: 중급 문법과 독해 속도 향상",
        "5급: 고급 어휘와 작문 능력 강화",
        "6급: 요약문 작성과 속독 훈련 필수"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/hsk" className="text-red-600 hover:text-red-800 flex items-center gap-2">
            <span>←</span>
            <span>HSK로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🎯</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">실전 대비</h1>
              <p className="text-gray-600">시험 전략 25문항</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all"
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
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-red-50 transition-colors"
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
                            isCompleted ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-red-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200"
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

        <div className="mt-8 bg-red-50 rounded-xl p-6 border border-red-200">
          <h3 className="font-bold text-red-800 mb-3">💡 실전 핵심 포인트</h3>
          <ul className="space-y-2 text-red-700 text-sm">
            <li>• HSK는 2년 유효기간이므로 필요한 시기에 맞춰 응시하세요</li>
            <li>• IBT(인터넷 기반) 시험도 선택 가능합니다</li>
            <li>• 공식 모의고사로 실전 연습을 충분히 하세요</li>
            <li>• HSKK(말하기 시험)도 함께 준비하면 좋습니다</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`HSK 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`HSK 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`HSK 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
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
