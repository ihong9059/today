'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JPTPracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('jpt-practical-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('jpt-practical-completed', JSON.stringify(items));
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
        "시험 30분 전까지 입실 완료하기",
        "수험표와 신분증 필수 지참",
        "연필과 지우개 여유있게 준비",
        "청해 먼저 → 독해 순서 숙지",
        "OMR 마킹 시간 여유 확보"
      ]
    },
    {
      title: "청해 파트 전략",
      icon: "🎧",
      items: [
        "Part 1: 사진 먼저 보고 키워드 예상",
        "Part 2: 질문 첫 단어(의문사) 집중",
        "Part 3: 화자 구분하며 메모",
        "Part 4: 숫자, 시간 정보 기록",
        "모르면 바로 넘기고 다음 집중"
      ]
    },
    {
      title: "독해 파트 전략",
      icon: "📖",
      items: [
        "Part 5: 한자 읽기 빠르게 해결",
        "Part 6: 문장 전체 의미 파악 후 선택",
        "Part 7: 질문 먼저 읽고 본문 읽기",
        "Part 8: 각 밑줄 하나씩 검토",
        "어려운 문제는 표시 후 나중에"
      ]
    },
    {
      title: "시간 배분 전략",
      icon: "⏱️",
      items: [
        "청해: 45분 (음성에 따라 자동 진행)",
        "독해 Part 5-6: 15분 (40문항)",
        "독해 Part 7: 25분 (30문항)",
        "독해 Part 8: 10분 (20문항)",
        "마지막 5분은 검토 및 마킹 확인"
      ]
    },
    {
      title: "점수대별 목표 전략",
      icon: "🎯",
      items: [
        "600점 목표: 기본 어휘/문법 완벽히",
        "700점 목표: 독해 속도 향상 필수",
        "800점 목표: 응용 문법/장문 독해 집중",
        "900점 목표: 실수 최소화 + 속도 UP",
        "매월 응시로 실전 감각 유지"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/jpt" className="text-pink-600 hover:text-pink-800 flex items-center gap-2">
            <span>←</span>
            <span>JPT으로 돌아가기</span>
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
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all"
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
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-pink-50 transition-colors"
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
                            isCompleted ? 'bg-pink-50 border-pink-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-pink-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-pink-500 hover:text-pink-700 text-xs px-2 py-1 rounded bg-pink-100 hover:bg-pink-200"
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

        <div className="mt-8 bg-pink-50 rounded-xl p-6 border border-pink-200">
          <h3 className="font-bold text-pink-800 mb-3">💡 실전 핵심 포인트</h3>
          <ul className="space-y-2 text-pink-700 text-sm">
            <li>• TOEIC과 유사한 형식이므로 TOEIC 경험자에게 유리</li>
            <li>• 매월 시험이 있어 빠른 점수 향상 및 재도전 가능</li>
            <li>• 청해와 독해의 균형 잡힌 학습이 중요</li>
            <li>• 목표 점수대별 맞춤 전략으로 효율적 학습</li>
          </ul>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{currentQuestion}</p>
            <div className="space-y-2">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(`JPT 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`JPT 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`JPT 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
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
