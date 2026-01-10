'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OPIcRoleplayPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('opic-roleplay-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('opic-roleplay-completed', JSON.stringify(items));
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
      title: "호텔/숙소 관련 롤플레이",
      icon: "🏨",
      items: [
        "인사: Hello, I'm calling to inquire about your hotel.",
        "예약 문의: I'd like to book a room for [날짜] to [날짜].",
        "객실 종류: Do you have single/double/suite rooms available?",
        "가격 문의: How much is a [객실 종류] per night?",
        "조식 포함: Is breakfast included in the room rate?",
        "편의시설: Do you have a gym/pool/spa in the hotel?",
        "체크인 시간: What time is check-in and check-out?",
        "위치 문의: How far is the hotel from the airport/station?",
        "취소 정책: What is your cancellation policy?",
        "마무리: Thank you for the information. I'll make a reservation soon."
      ]
    },
    {
      title: "식당/카페 관련 롤플레이",
      icon: "🍴",
      items: [
        "인사: Hi, I'm calling to ask about your restaurant.",
        "예약 문의: I'd like to make a reservation for [인원] people.",
        "영업시간: What are your operating hours?",
        "메뉴 문의: Do you have any vegetarian/vegan options?",
        "추천 메뉴: What do you recommend for first-time customers?",
        "가격대: What's the average price per person?",
        "주차: Do you have parking available?",
        "위치 확인: Could you tell me how to get there?",
        "특별 요청: Is it possible to request a [특별 요청]?",
        "마무리: Great, I'll visit soon. Thank you for your help."
      ]
    },
    {
      title: "쇼핑/매장 관련 롤플레이",
      icon: "🛒",
      items: [
        "인사: Hello, I'm calling to ask about a product.",
        "재고 문의: Do you have [제품] in stock?",
        "가격 문의: How much is the [제품]?",
        "색상/사이즈: Does it come in different colors/sizes?",
        "할인 문의: Are there any discounts or promotions right now?",
        "배송 문의: Do you offer delivery? How long does it take?",
        "반품 정책: What's your return policy?",
        "영업시간: What are your store hours?",
        "결제 방법: Do you accept credit cards/cash only?",
        "마무리: Thank you for the information. I'll visit the store soon."
      ]
    },
    {
      title: "헬스장/체육관 롤플레이",
      icon: "🏋️",
      items: [
        "인사: Hi, I'm interested in joining your gym.",
        "회원권 종류: What types of memberships do you offer?",
        "가격 문의: How much is the monthly/yearly membership?",
        "운영시간: What are your operating hours?",
        "시설 문의: What facilities do you have?",
        "PT 문의: Do you offer personal training sessions?",
        "체험권: Is there a free trial or day pass available?",
        "등록 절차: What do I need to register as a member?",
        "주차: Is there parking available for members?",
        "마무리: Thank you. I'll visit to sign up soon."
      ]
    },
    {
      title: "문제 해결 롤플레이",
      icon: "⚠️",
      items: [
        "문제 제기: I'm calling because I have a problem with [문제].",
        "상황 설명: The issue is that [구체적 상황].",
        "발생 시점: This happened [언제].",
        "영향 설명: Because of this, I [영향/불편].",
        "해결 요청: Could you please [요청 사항]?",
        "대안 제시: If that's not possible, could you [대안]?",
        "환불 요청: I'd like to request a refund for [대상].",
        "교환 요청: Could I exchange this for [대체품]?",
        "담당자 연결: Could I speak to a manager, please?",
        "마무리: Thank you for your help. I appreciate it."
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
            <span className="text-4xl">🎭</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">롤플레이</h1>
              <p className="text-gray-600">상황별 롤플레이 50문항</p>
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
          <h3 className="font-bold text-emerald-800 mb-3">💡 롤플레이 핵심 TIP</h3>
          <ul className="space-y-2 text-emerald-700 text-sm">
            <li>• 반드시 질문을 3개 이상 포함해야 합니다</li>
            <li>• 인사(Hello)로 시작하고 감사 인사(Thank you)로 마무리</li>
            <li>• 예의 바른 표현 사용: Could you / Would you / I'd like to</li>
            <li>• 문제 상황에서는 감정적이지 않게 차분히 설명하기</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`OPIc 롤플레이 관련 질문입니다: "${currentQuestion}" - 전체 롤플레이 예시 답변을 만들어주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`OPIc 롤플레이 관련 질문입니다: "${currentQuestion}" - 전체 롤플레이 예시 답변을 만들어주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`OPIc 롤플레이 관련 질문입니다: "${currentQuestion}" - 전체 롤플레이 예시 답변을 만들어주세요.`)}`}
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
