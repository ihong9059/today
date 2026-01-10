'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JLPTGrammarPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('jlpt-grammar-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('jlpt-grammar-completed', JSON.stringify(items));
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
      title: "N5 필수 문법",
      icon: "🔤",
      items: [
        "~は~です - ~는/은 ~입니다",
        "~を~ます - 목적어 + 동사",
        "~に~ます - 장소/시간에 ~합니다",
        "~で~ます - 장소에서/수단으로 ~합니다",
        "~から~まで - ~부터 ~까지",
        "~も - ~도",
        "~と - ~와/과",
        "~が~ます - 주어 + 동사 (강조)",
        "~たい - ~하고 싶다",
        "~ませんか - ~하지 않겠습니까?"
      ]
    },
    {
      title: "N4 필수 문법",
      icon: "📗",
      items: [
        "~てもいい - ~해도 된다",
        "~てはいけない - ~하면 안 된다",
        "~なければならない - ~해야 한다",
        "~ことができる - ~할 수 있다",
        "~たことがある - ~한 적이 있다",
        "~ようになる - ~하게 되다",
        "~ために - ~하기 위해",
        "~ので - ~이므로, ~이기 때문에",
        "~のに - ~인데도",
        "~そうだ (様態) - ~인 것 같다"
      ]
    },
    {
      title: "N3 필수 문법",
      icon: "📘",
      items: [
        "~ようにする - ~하도록 하다",
        "~ことにする - ~하기로 하다",
        "~ことになる - ~하게 되다",
        "~によって - ~에 의해, ~에 따라",
        "~として - ~로서",
        "~に対して - ~에 대해",
        "~について - ~에 관해",
        "~ばかり - ~만, ~뿐",
        "~わけではない - ~인 것은 아니다",
        "~はずだ - ~일 것이다"
      ]
    },
    {
      title: "N2 필수 문법",
      icon: "📙",
      items: [
        "~に伴って - ~에 따라, ~와 함께",
        "~をはじめ - ~을 비롯해",
        "~に基づいて - ~에 근거하여",
        "~にかけては - ~에 있어서는",
        "~に限らず - ~에 한하지 않고",
        "~というより - ~라기보다",
        "~ものの - ~지만, ~긴 하지만",
        "~からといって - ~라고 해서",
        "~ざるを得ない - ~하지 않을 수 없다",
        "~かねない - ~할 수도 있다"
      ]
    },
    {
      title: "N1 필수 문법",
      icon: "📕",
      items: [
        "~をものともせず - ~을 아랑곳하지 않고",
        "~ならではの - ~만의, ~이기에 가능한",
        "~をおいて - ~을 제외하고",
        "~に足る - ~할 만하다",
        "~べく - ~하기 위해",
        "~めく - ~다운, ~스럽다",
        "~ともなると - ~이 되면",
        "~や否や - ~하자마자",
        "~なり - ~하자 곧",
        "~が早いか - ~하자마자"
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
            <span className="text-4xl">📖</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">문법</h1>
              <p className="text-gray-600">레벨별 필수 문법 50문항</p>
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
          <h3 className="font-bold text-rose-800 mb-3">💡 문법 학습 TIP</h3>
          <ul className="space-y-2 text-rose-700 text-sm">
            <li>• 문법은 반드시 예문과 함께 암기하세요</li>
            <li>• 비슷한 문법 표현끼리 비교하며 차이점을 파악하세요</li>
            <li>• 실제 문장 만들기 연습을 통해 활용력을 높이세요</li>
            <li>• 기출문제를 통해 자주 나오는 패턴을 익히세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`JLPT 일본어 문법 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`JLPT 일본어 문법 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`JLPT 일본어 문법 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
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
