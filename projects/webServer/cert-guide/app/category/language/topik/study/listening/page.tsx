'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TOPIKListeningPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('topik-listening-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('topik-listening-completed', JSON.stringify(items));
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
      title: "TOPIK I 듣기 (1-2급)",
      icon: "🔰",
      items: [
        "인사말 듣기: 안녕하세요, 감사합니다, 죄송합니다",
        "숫자 듣기: 하나, 둘, 셋 / 일, 이, 삼 구분",
        "시간 듣기: 몇 시예요? 세 시 반이에요",
        "날짜 듣기: 며칠이에요? 오월 오일이에요",
        "장소 듣기: 학교, 병원, 은행, 마트, 식당",
        "가격 듣기: 얼마예요? 삼천 원이에요",
        "날씨 듣기: 오늘 날씨가 어때요? 맑아요/비가 와요",
        "교통수단 듣기: 버스, 지하철, 택시, 비행기",
        "음식 주문 듣기: 뭐 드시겠어요? 비빔밥 주세요",
        "길 안내 듣기: 똑바로 가세요, 오른쪽으로 가세요"
      ]
    },
    {
      title: "TOPIK II 듣기 기초 (3-4급)",
      icon: "📻",
      items: [
        "대화 상황 파악: 대화가 이루어지는 장소/관계",
        "목적 파악: 말하는 사람의 의도 찾기",
        "중심 내용 파악: 대화의 주제 찾기",
        "세부 정보 듣기: 구체적인 정보 확인",
        "담화 유형 구분: 안내방송, 뉴스, 강연, 인터뷰",
        "이유/원인 듣기: 왜 그런지 이유 파악",
        "순서 파악: 사건의 전후 관계 이해",
        "비교/대조 듣기: 두 대상의 차이점",
        "화자 태도 파악: 긍정/부정, 찬성/반대",
        "함축 의미 파악: 직접 말하지 않은 의도"
      ]
    },
    {
      title: "TOPIK II 듣기 심화 (5-6급)",
      icon: "🎙️",
      items: [
        "강연/강의 듣기: 학술적 내용 이해",
        "뉴스/시사 듣기: 사회 이슈 파악",
        "토론 듣기: 찬반 의견 구분",
        "다큐멘터리 듣기: 배경 설명, 정보 전달",
        "추론적 듣기: 상황/맥락에서 추론",
        "비유/관용 표현 듣기: 속담, 관용어 이해",
        "복잡한 논리 구조: 인과, 조건, 양보",
        "전문 용어 듣기: 경제, 사회, 과학 분야",
        "빠른 속도 적응: 자연스러운 속도 연습",
        "장문 듣기: 긴 담화 내용 정리"
      ]
    },
    {
      title: "듣기 문제 유형",
      icon: "📋",
      items: [
        "그림 선택형: 상황에 맞는 그림 고르기",
        "이어질 말 선택: 대화 완성하기",
        "알맞은 행동 선택: 적절한 반응 고르기",
        "중심 생각 고르기: 핵심 내용 파악",
        "세부 내용 일치: 들은 내용과 일치하는 것",
        "화자 의도 파악: 말하는 목적 찾기",
        "담화 앞 내용 추론: 앞에서 무슨 말을 했을지",
        "담화 뒤 행동 추론: 다음에 할 행동 예측",
        "적절한 속담 고르기: 상황에 맞는 속담",
        "종합 이해 문제: 전체 내용 파악"
      ]
    },
    {
      title: "필수 표현",
      icon: "💬",
      items: [
        "연결 표현: 그래서, 그런데, 그러면, 그러니까",
        "시간 표현: 먼저, 다음에, 마지막으로, 나중에",
        "강조 표현: 특히, 무엇보다, 정말, 아주",
        "비교 표현: ~보다, ~만큼, ~처럼, ~같이",
        "추측 표현: ~것 같다, ~듯하다, 아마",
        "이유 표현: ~때문에, ~으로, ~어서/아서",
        "조건 표현: ~으면, ~다면, ~(으)려면",
        "양보 표현: ~지만, ~어도/아도, ~더라도",
        "목적 표현: ~으려고, ~기 위해, ~도록",
        "인용 표현: ~라고 하다, ~다고 하다"
      ]
    },
    {
      title: "듣기 전략",
      icon: "🎯",
      items: [
        "문제 미리 읽기: 음성 재생 전 보기 확인",
        "키워드 파악: 핵심 단어 메모하기",
        "맥락 이해: 전체 상황 파악하기",
        "끝까지 듣기: 정답은 끝에 나오기도 함",
        "화자 구분: 남자/여자 목소리 구분",
        "부정 표현 주의: 안, 못, ~지 않다",
        "숫자 정보 기록: 시간, 날짜, 가격",
        "장소/시간 파악: 대화 배경 이해",
        "반복되는 표현: 중요 정보는 반복됨",
        "모르면 넘기기: 다음 문제 집중"
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
            <span className="text-4xl">🎧</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">듣기 (Listening)</h1>
              <p className="text-gray-600">청취 이해 60문항</p>
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
          <h3 className="font-bold text-blue-800 mb-3">💡 듣기 학습 TIP</h3>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• 한국 드라마, 예능을 자막 없이 시청해보세요</li>
            <li>• TOPIK 기출문제 듣기 음성을 반복해서 들으세요</li>
            <li>• 받아쓰기(딕테이션)로 정확한 듣기 훈련을 하세요</li>
            <li>• 쉐도잉으로 발음과 청해력을 동시에 향상시키세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`TOPIK 한국어 듣기 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`TOPIK 한국어 듣기 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`TOPIK 한국어 듣기 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
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
