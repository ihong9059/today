'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JLPTListeningPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('jlpt-listening-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('jlpt-listening-completed', JSON.stringify(items));
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
      title: "과제 이해 (課題理解)",
      icon: "📋",
      items: [
        "질문을 먼저 확인: 무엇을 해야 하는지 파악",
        "선택지 미리 읽기: 4개 선택지 빠르게 파악",
        "키워드 메모: 중요 정보 간단히 기록",
        "행동 동사 주목: 何をする、どうする 파악",
        "순서 파악: まず、次に、最後に 순서 정리",
        "조건 확인: ~たら、~なら 조건 청취",
        "시간/장소 표현: 언제, 어디서 하는지 확인",
        "수량 표현: 몇 개, 몇 번 정확히 듣기",
        "부정 표현: ~ない、~なくて 주의해서 듣기",
        "마지막 결론: 최종 결정 사항 확인하기"
      ]
    },
    {
      title: "포인트 이해 (ポイント理解)",
      icon: "🎯",
      items: [
        "화자의 의도 파악: 말하려는 핵심 이해",
        "이유/원인 듣기: なぜ、どうして 파악",
        "감정 표현: 기쁨, 슬픔, 화남 파악",
        "강조 표현: 特に、一番 주목하기",
        "비교 표현: より、ほど 차이점 파악",
        "의견 표현: 思う、考える 화자 입장",
        "추측 표현: かもしれない、だろう 확실성 파악",
        "경험 표현: ~たことがある 유무 확인",
        "습관 표현: いつも、よく 빈도 파악",
        "변화 표현: ~ようになった 변화 내용"
      ]
    },
    {
      title: "개요 이해 (概要理解)",
      icon: "📊",
      items: [
        "전체 흐름 파악: 대화 상황 이해하기",
        "주제 파악: 무엇에 대한 이야기인가",
        "화자 관계: 누가 누구에게 말하는가",
        "장소 추측: 어디서 대화하는가",
        "분위기 파악: 공식/비공식 구분",
        "목적 이해: 왜 이 대화를 하는가",
        "결론 도출: 최종적으로 어떻게 되었는가",
        "문제점 파악: 무엇이 문제인가",
        "해결책 이해: 어떻게 해결하려는가",
        "앞으로의 계획: 다음에 무엇을 할 것인가"
      ]
    },
    {
      title: "즉시 응답 (即時応答)",
      icon: "⚡",
      items: [
        "인사말: おはよう、こんにちは 응답",
        "감사 표현: ありがとう 응답 패턴",
        "사과 표현: すみません 응답 패턴",
        "부탁 표현: お願いします 수락/거절",
        "제안 표현: ~ませんか 응답 방법",
        "권유 표현: ~ましょう 응답 패턴",
        "확인 표현: ~ですね 동의/부정",
        "질문 응답: 예/아니오 적절한 대답",
        "의문사 응답: いつ、どこ 등에 맞는 답",
        "상황별 응답: 전화, 쇼핑, 안내 등"
      ]
    },
    {
      title: "통합 이해 (統合理解)",
      icon: "🔗",
      items: [
        "복수 화자 구분: 누가 무엇을 말하는지",
        "의견 대립 파악: 찬성/반대 의견 구분",
        "조건별 비교: A의 경우, B의 경우 구분",
        "시간 순서: 과거-현재-미래 정리",
        "인과관계: 원인과 결과 연결",
        "부분과 전체: 세부 내용과 전체 요약",
        "예시와 일반화: 구체적 예와 일반 법칙",
        "가정과 사실: ~たら와 실제 상황 구분",
        "긴 담화 청취: 강연, 발표 내용 이해",
        "그래프/자료 연계: 청취 내용과 자료 대조"
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
            <span className="text-4xl">🎧</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">청해</h1>
              <p className="text-gray-600">듣기 이해 전략 50문항</p>
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
          <h3 className="font-bold text-rose-800 mb-3">💡 청해 학습 TIP</h3>
          <ul className="space-y-2 text-rose-700 text-sm">
            <li>• 일본 드라마, 애니메이션, 뉴스로 귀를 트이게 하세요</li>
            <li>• 쉐도잉(따라 말하기) 연습으로 청취력을 높이세요</li>
            <li>• 선택지를 먼저 읽고 키워드를 예측하세요</li>
            <li>• 하루 30분씩 일본어 듣기 습관을 들이세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`JLPT 일본어 청해 관련 질문입니다: "${currentQuestion}" - 구체적인 예시와 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`JLPT 일본어 청해 관련 질문입니다: "${currentQuestion}" - 구체적인 예시와 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`JLPT 일본어 청해 관련 질문입니다: "${currentQuestion}" - 구체적인 예시와 함께 설명해주세요.`)}`}
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
