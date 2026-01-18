'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TOEICSpeakingStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('toeic-speaking-study-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('toeic-speaking-study-completed', JSON.stringify(items));
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
      title: "Q1-2 Read a text aloud (지문 읽기)",
      icon: "📖",
      items: [
        "발음: 모음과 자음을 명확하게 발음하는 것이 중요하다",
        "연음: 단어 간 자연스러운 연결 (want to → wanna)",
        "강세: 내용어(명사, 동사, 형용사)에 강세를 준다",
        "인토네이션: 문장 유형에 따른 억양 변화 (평서문↘, 의문문↗)",
        "끊어 읽기: 의미 단위로 pause하며 읽기",
        "준비시간 활용: 45초 동안 지문 2회 묵독하기",
        "어려운 단어: 발음 기호 확인하고 미리 연습",
        "숫자/날짜 읽기: fifteen vs fifty, 날짜 표현법",
        "속도 조절: 너무 빠르지 않게, 일정한 속도 유지",
        "자신감: 실수해도 당황하지 않고 계속 읽기"
      ]
    },
    {
      title: "Q3-4 Describe a picture (사진 묘사)",
      icon: "🖼️",
      items: [
        "시작 문장: In this picture, I can see...",
        "전경 묘사: In the foreground, there is/are...",
        "배경 묘사: In the background, I can notice...",
        "왼쪽/오른쪽: On the left/right side of the picture...",
        "인물 묘사: A man/woman who is wearing... is doing...",
        "동작 표현: 현재진행형 사용 (is walking, are talking)",
        "추측 표현: It looks like..., It seems that..., It appears to be...",
        "위치 전치사: next to, in front of, behind, between",
        "날씨/분위기: The weather looks sunny, The atmosphere is...",
        "마무리: Overall, this picture shows a scene of..."
      ]
    },
    {
      title: "Q5-7 Respond to questions (질문 응답)",
      icon: "💬",
      items: [
        "Q5 짧은 답변: 15초 안에 핵심만 직접적으로 답변",
        "Q6 이유 추가: 15초 안에 Why/Because 활용하여 이유 설명",
        "Q7 상세 답변: 30초 동안 예시와 경험을 포함한 답변",
        "자기소개 패턴: 직업, 취미, 일상 미리 영어로 정리",
        "선호도 표현: I prefer... because..., My favorite is...",
        "경험 공유: Last week/month, I..., I remember when...",
        "의견 제시: I think/believe that..., In my opinion...",
        "장소 설명: It's located in..., You can find... there",
        "빈도 표현: usually, often, sometimes, rarely",
        "시간 표현: in the morning, on weekends, twice a week"
      ]
    },
    {
      title: "Q8-10 Respond using information (정보 활용)",
      icon: "📊",
      items: [
        "표 읽기: 45초 준비시간에 전체 정보 파악하기",
        "시간 안내: The event starts at... and ends at...",
        "장소 안내: It will be held at/in..., located at...",
        "가격 안내: The price/fee is... per person/item",
        "옵션 설명: There are three options available...",
        "비교하기: Option A costs... while Option B costs...",
        "추천하기: I would recommend... because...",
        "조건 설명: If you choose..., you will get...",
        "날짜 안내: It's scheduled for March 15th...",
        "연락처 안내: You can contact us at... for more information"
      ]
    },
    {
      title: "Q11 Express an opinion (의견 말하기)",
      icon: "🎯",
      items: [
        "의견 제시: I strongly believe/think that...",
        "이유 연결: for two main reasons, There are several reasons",
        "첫 번째 이유: First, Firstly, To begin with, First of all",
        "두 번째 이유: Second, Secondly, In addition, Moreover",
        "예시 도입: For example, For instance, To illustrate",
        "개인 경험: In my experience, Based on my experience",
        "일반화: Generally speaking, In most cases",
        "대조 표현: However, On the other hand, Although",
        "결론: In conclusion, To sum up, For these reasons",
        "60초 시간 배분: 의견(10초)-이유1(20초)-이유2(20초)-결론(10초)"
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
            <span className="text-4xl">🎤</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">Speaking 연습</h1>
              <p className="text-gray-600">유형별 핵심 표현 50문항</p>
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
          <h3 className="font-bold text-sky-800 mb-3">💡 Speaking 연습 팁</h3>
          <ul className="space-y-2 text-sky-700 text-sm">
            <li>• 매일 10분씩 영어로 혼잣말 연습하세요</li>
            <li>• 본인 답변을 녹음해서 들어보세요</li>
            <li>• 템플릿 표현을 외워서 자연스럽게 사용하세요</li>
            <li>• 시간 내 답변 완료하는 연습이 중요합니다</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`TOEIC Speaking 관련 질문입니다: "${currentQuestion}" - 이에 대해 자세히 설명하고 예문을 들어주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`TOEIC Speaking 관련 질문입니다: "${currentQuestion}" - 이에 대해 자세히 설명하고 예문을 들어주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`TOEIC Speaking 관련 질문입니다: "${currentQuestion}" - 이에 대해 자세히 설명하고 예문을 들어주세요.`)}`}
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
