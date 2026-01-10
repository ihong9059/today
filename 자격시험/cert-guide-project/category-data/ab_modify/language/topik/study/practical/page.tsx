'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TOPIKPracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('topik-practical-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('topik-practical-completed', JSON.stringify(items));
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
        "시험 시작 30분 전까지 입실 완료하기",
        "수험표와 신분증(여권) 필수 지참",
        "컴퓨터용 사인펜 준비 (OMR 카드용)",
        "연필과 지우개 (쓰기용)",
        "시험장 위치 사전 확인하기"
      ]
    },
    {
      title: "TOPIK I 전략 (1-2급)",
      icon: "🔰",
      items: [
        "듣기: 보기를 먼저 읽고 예상하기",
        "듣기: 그림 문제는 상황 파악이 핵심",
        "읽기: 쉬운 문제부터 빠르게 풀기",
        "읽기: 모르는 어휘는 문맥에서 추론",
        "시간 배분: 듣기 40분, 읽기 60분"
      ]
    },
    {
      title: "TOPIK II 듣기/읽기 전략",
      icon: "📻",
      items: [
        "듣기: 문제 미리 읽기 필수",
        "듣기: 대화 장소/관계 파악하기",
        "듣기: 숫자, 시간 정보 메모하기",
        "읽기: 질문 먼저 읽고 지문 읽기",
        "읽기: 긴 지문은 문단별 핵심 파악"
      ]
    },
    {
      title: "TOPIK II 쓰기 전략",
      icon: "✍️",
      items: [
        "51-52번: 빠르게 풀고 시간 확보",
        "53번: 그래프 숫자 정확히 읽기",
        "53번: 비교/변화 표현 사용하기",
        "54번: 서론-본론-결론 구조 준수",
        "54번: 글자 수 600-700자 엄수"
      ]
    },
    {
      title: "등급별 목표 전략",
      icon: "🎯",
      items: [
        "1-2급 목표: TOPIK I 기초 어휘/문법 집중",
        "3-4급 목표: 듣기/읽기 기본 점수 확보",
        "5급 목표: 쓰기 점수 끌어올리기",
        "6급 목표: 모든 영역 고른 점수 필요",
        "점수 계산: 듣기+읽기+쓰기 합산"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/topik" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            <span>←</span>
            <span>TOPIK으로 돌아가기</span>
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
                className="bg-gradient-to-r from-blue-500 to-red-500 h-3 rounded-full transition-all"
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
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
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
                            isCompleted ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-blue-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-blue-500 hover:text-blue-700 text-xs px-2 py-1 rounded bg-blue-100 hover:bg-blue-200"
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

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">💡 실전 핵심 포인트</h3>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• TOPIK은 2년 유효기간이므로 필요한 시기에 맞춰 응시하세요</li>
            <li>• 기출문제로 실전 연습을 충분히 하세요</li>
            <li>• 한국 유학/취업 목표라면 3급 이상을 목표로 하세요</li>
            <li>• 쓰기는 많이 연습하고 첨삭받는 것이 중요합니다</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`TOPIK 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`TOPIK 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`TOPIK 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
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
