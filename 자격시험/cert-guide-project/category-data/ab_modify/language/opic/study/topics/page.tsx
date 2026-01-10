'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OPIcTopicsPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('opic-topics-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('opic-topics-completed', JSON.stringify(items));
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
      title: "영화/드라마 관련",
      icon: "🎬",
      items: [
        "좋아하는 장르: I like [장르] movies because [이유].",
        "최근 본 영화: Recently, I watched [영화명] and it was [감상].",
        "좋아하는 배우: My favorite actor/actress is [이름] because [이유].",
        "영화관 경험: I usually go to the cinema with [누구] to watch [장르] movies.",
        "집에서 보기: At home, I enjoy watching movies on [플랫폼].",
        "추천 영화: I would recommend [영화명] because [이유].",
        "기억에 남는 장면: One memorable scene was when [장면 설명].",
        "드라마 시청: I'm currently watching [드라마명] on [플랫폼].",
        "영화 vs 드라마: I prefer [영화/드라마] because [이유].",
        "영화 보는 빈도: I watch movies about [빈도] times a [기간]."
      ]
    },
    {
      title: "음악/콘서트 관련",
      icon: "🎵",
      items: [
        "좋아하는 장르: I enjoy listening to [장르] music.",
        "좋아하는 가수: My favorite artist is [가수명] because [이유].",
        "음악 듣는 시간: I usually listen to music when I'm [상황].",
        "음악 듣는 방법: I listen to music on [앱/기기].",
        "콘서트 경험: I went to [가수명]'s concert and it was [감상].",
        "악기 연주: I play the [악기] / I don't play any instruments.",
        "노래방: I like going to karaoke with [누구] and singing [장르].",
        "음악의 영향: Music helps me [영향/효과].",
        "추천 노래: I would recommend [노래명] by [가수].",
        "음악 취향 변화: My music taste has changed from [과거] to [현재]."
      ]
    },
    {
      title: "여행/휴가 관련",
      icon: "✈️",
      items: [
        "여행 스타일: I prefer [스타일] trips such as [예시].",
        "최근 여행: My last trip was to [장소] with [누구].",
        "기억에 남는 여행: One of my best trips was to [장소] because [이유].",
        "여행 준비: Before traveling, I usually [준비 과정].",
        "교통수단: I prefer traveling by [교통수단] because [이유].",
        "숙소 선호: I like staying at [숙소 유형] when I travel.",
        "여행 중 활동: During my trip, I enjoyed [활동1] and [활동2].",
        "여행 음식: I tried [음식] and it was [감상].",
        "여행 사진: I like to take photos of [대상] during trips.",
        "가고 싶은 곳: I really want to visit [장소] someday because [이유]."
      ]
    },
    {
      title: "운동/건강 관련",
      icon: "💪",
      items: [
        "좋아하는 운동: I enjoy [운동] because [이유].",
        "운동 빈도: I work out about [횟수] times a week.",
        "운동 장소: I usually exercise at [장소] / at home.",
        "운동 시간: I prefer to exercise in the [아침/저녁].",
        "헬스장 이용: I go to the gym to [활동] and [활동].",
        "운동 효과: Exercising helps me [효과1] and [효과2].",
        "좋아하는 스포츠: My favorite sport is [스포츠] because [이유].",
        "운동 동반자: I usually exercise with [누구] / alone.",
        "건강 관리: To stay healthy, I try to [건강 습관].",
        "운동 목표: My fitness goal is to [목표]."
      ]
    },
    {
      title: "음식/요리 관련",
      icon: "🍽️",
      items: [
        "좋아하는 음식: My favorite food is [음식] because [이유].",
        "자주 가는 식당: I often go to [식당/종류] for [음식].",
        "요리 실력: I'm [수준] at cooking. I can make [요리].",
        "요리 경험: I recently made [요리] and it turned out [결과].",
        "외식 vs 집밥: I prefer [외식/집밥] because [이유].",
        "배달 음식: I sometimes order [음식] from [앱/식당].",
        "새로운 음식: I like trying new foods like [예시].",
        "한식 소개: Korean food like [음식] is [특징] and [맛].",
        "식사 습관: I usually have [아침/점심/저녁] at [시간].",
        "특별한 식사: On special occasions, I like to [특별 식사]."
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
            <span className="text-4xl">💬</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">주제별 답변</h1>
              <p className="text-gray-600">취미/여행/음식 등 50문항</p>
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
          <h3 className="font-bold text-emerald-800 mb-3">💡 주제별 답변 TIP</h3>
          <ul className="space-y-2 text-emerald-700 text-sm">
            <li>• Background Survey에서 선택한 주제와 연결하여 답변 준비</li>
            <li>• 각 주제별로 구체적인 에피소드를 2-3개 준비하세요</li>
            <li>• 이유(because)와 예시(for example)를 항상 포함하세요</li>
            <li>• 비슷한 주제는 같은 답변을 재활용할 수 있습니다</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`OPIc 주제별 답변 관련 질문입니다: "${currentQuestion}" - 예시 답변과 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`OPIc 주제별 답변 관련 질문입니다: "${currentQuestion}" - 예시 답변과 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`OPIc 주제별 답변 관련 질문입니다: "${currentQuestion}" - 예시 답변과 함께 설명해주세요.`)}`}
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
