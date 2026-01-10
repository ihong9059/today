'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JLPTVocabularyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('jlpt-vocabulary-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('jlpt-vocabulary-completed', JSON.stringify(items));
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
      title: "N5 필수 어휘",
      icon: "🔤",
      items: [
        "あたらしい (新しい) - 새롭다",
        "おおきい (大きい) - 크다",
        "ちいさい (小さい) - 작다",
        "たかい (高い) - 높다, 비싸다",
        "やすい (安い) - 싸다",
        "いい/よい (良い) - 좋다",
        "わるい (悪い) - 나쁘다",
        "おいしい - 맛있다",
        "たのしい (楽しい) - 즐겁다",
        "むずかしい (難しい) - 어렵다"
      ]
    },
    {
      title: "N4 필수 어휘",
      icon: "📗",
      items: [
        "けいけん (経験) - 경험",
        "せつめい (説明) - 설명",
        "じゅんび (準備) - 준비",
        "れんらく (連絡) - 연락",
        "しょうかい (紹介) - 소개",
        "きょうみ (興味) - 흥미",
        "りゆう (理由) - 이유",
        "もんだい (問題) - 문제",
        "ていねい (丁寧) - 정중하다",
        "しんぱい (心配) - 걱정"
      ]
    },
    {
      title: "N3 필수 어휘",
      icon: "📘",
      items: [
        "えいきょう (影響) - 영향",
        "かんけい (関係) - 관계",
        "きかい (機会) - 기회",
        "けっか (結果) - 결과",
        "げんいん (原因) - 원인",
        "じっさい (実際) - 실제",
        "たいせつ (大切) - 소중하다",
        "ひつよう (必要) - 필요",
        "ふくざつ (複雑) - 복잡하다",
        "もくてき (目的) - 목적"
      ]
    },
    {
      title: "N2 필수 어휘",
      icon: "📙",
      items: [
        "いぜん (以前) - 이전",
        "かくにん (確認) - 확인",
        "きじゅん (基準) - 기준",
        "きょうつう (共通) - 공통",
        "けいこう (傾向) - 경향",
        "こうか (効果) - 효과",
        "じょうたい (状態) - 상태",
        "たいさく (対策) - 대책",
        "ちしき (知識) - 지식",
        "はってん (発展) - 발전"
      ]
    },
    {
      title: "N1 필수 어휘",
      icon: "📕",
      items: [
        "あいまい (曖昧) - 애매하다",
        "いちがいに (一概に) - 일률적으로",
        "おおむね (概ね) - 대체로",
        "かろうじて (辛うじて) - 가까스로",
        "ぎゃくに (逆に) - 반대로",
        "したがって (従って) - 따라서",
        "すなわち (即ち) - 즉",
        "たちまち (忽ち) - 순식간에",
        "なおさら (尚更) - 더욱더",
        "ひたすら - 오로지, 열심히"
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
            <span className="text-4xl">📝</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">문자·어휘</h1>
              <p className="text-gray-600">레벨별 필수 어휘 50문항</p>
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
          <h3 className="font-bold text-rose-800 mb-3">💡 어휘 학습 TIP</h3>
          <ul className="space-y-2 text-rose-700 text-sm">
            <li>• 한자는 읽는 법(음독/훈독)과 함께 암기하세요</li>
            <li>• 단어를 문장 속에서 활용해보며 익히세요</li>
            <li>• 유의어/반의어를 함께 정리하면 효과적입니다</li>
            <li>• 매일 10~20개씩 꾸준히 암기하는 것이 중요합니다</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`JLPT 일본어 어휘 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`JLPT 일본어 어휘 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`JLPT 일본어 어휘 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
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
