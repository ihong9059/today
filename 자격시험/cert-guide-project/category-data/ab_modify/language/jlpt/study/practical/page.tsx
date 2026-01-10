'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JLPTPracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('jlpt-practical-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('jlpt-practical-completed', JSON.stringify(items));
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
        "수험표와 신분증 반드시 지참",
        "연필과 지우개 여유있게 준비 (샤프 불가)",
        "시계는 아날로그만 허용 (스마트워치 불가)",
        "청해 시험 전 화장실 미리 다녀오기"
      ]
    },
    {
      title: "시간 배분 전략",
      icon: "⏱️",
      items: [
        "문자·어휘: 1문제당 30초~1분 이내",
        "문법: 1문제당 1분 이내",
        "독해 단문: 1문제당 2~3분",
        "독해 중문: 1문제당 5~7분",
        "독해 장문: 1문제당 10분 이내"
      ]
    },
    {
      title: "각 영역별 최저점 관리",
      icon: "📊",
      items: [
        "언어지식/독해/청해 각 19점 이상 필수",
        "한 영역이라도 기준 미달 시 불합격",
        "약한 영역을 집중 보완하는 전략 필요",
        "기출문제로 영역별 실력 점검하기",
        "모의시험으로 실전 감각 익히기"
      ]
    },
    {
      title: "마킹 전략",
      icon: "✏️",
      items: [
        "확실한 문제 먼저 마킹하기",
        "모르는 문제는 일단 표시 후 넘어가기",
        "시간 남으면 표시한 문제 다시 검토",
        "빈칸 없이 모든 문항 마킹하기",
        "마킹 실수 방지를 위해 문제 번호 확인"
      ]
    },
    {
      title: "컨디션 관리",
      icon: "💪",
      items: [
        "시험 전날 충분한 수면 취하기",
        "당일 아침 가벼운 식사하기",
        "카페인 적당히 섭취로 집중력 유지",
        "긴장 풀기 위한 심호흡 연습",
        "자신감을 가지고 시험에 임하기"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/jlpt" className="text-rose-600 hover:text-rose-800 flex items-center gap-2">
            <span>←</span>
            <span>JLPT으로 돌아가기</span>
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
                className="bg-gradient-to-r from-rose-500 to-red-500 h-3 rounded-full transition-all"
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
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-rose-50 transition-colors"
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
                            isCompleted ? 'bg-rose-50 border-rose-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-rose-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-rose-500 hover:text-rose-700 text-xs px-2 py-1 rounded bg-rose-100 hover:bg-rose-200"
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

        <div className="mt-8 bg-rose-50 rounded-xl p-6 border border-rose-200">
          <h3 className="font-bold text-rose-800 mb-3">💡 실전 핵심 포인트</h3>
          <ul className="space-y-2 text-rose-700 text-sm">
            <li>• 각 영역 기준점(19점) 미달 시 총점과 관계없이 불합격</li>
            <li>• 청해는 한 번만 들려주므로 집중력이 매우 중요</li>
            <li>• 모르는 문제도 반드시 마킹 (25% 확률)</li>
            <li>• 시험 1주일 전부터는 실전 모의고사로 감각 유지</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`JLPT 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`JLPT 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`JLPT 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
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
