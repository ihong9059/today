'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TOPIKWritingPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('topik-writing-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('topik-writing-completed', JSON.stringify(items));
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
      title: "51-52번: 빈칸 완성",
      icon: "✏️",
      items: [
        "문맥에 맞는 어휘 선택하기",
        "문법적으로 올바른 형태 쓰기",
        "조사 정확히 사용하기",
        "연결어미 적절히 사용하기",
        "시제 일관성 유지하기",
        "높임법 수준 맞추기",
        "접속부사 활용하기",
        "관형형 어미 사용하기",
        "인용 표현 정확히 쓰기",
        "맞춤법과 띄어쓰기 주의하기"
      ]
    },
    {
      title: "53번: 자료 해석 (200-300자)",
      icon: "📊",
      items: [
        "그래프/표 읽기: 숫자와 변화 파악",
        "비교 표현: ~보다, ~에 비해, ~와 달리",
        "증가 표현: 늘다, 증가하다, 상승하다",
        "감소 표현: 줄다, 감소하다, 하락하다",
        "비율 표현: ~%를 차지하다, ~배가 되다",
        "순위 표현: 가장 높다/낮다, 1위/2위",
        "추세 표현: 꾸준히, 급격히, 점차",
        "원인/결과 연결: ~때문에, 따라서",
        "요약 표현: 이러한 결과로 볼 때",
        "글자 수 맞추기: 200-300자 범위"
      ]
    },
    {
      title: "54번: 논술문 (600-700자)",
      icon: "📄",
      items: [
        "서론: 주제 소개 + 자신의 입장 제시",
        "본론1: 첫 번째 논거 + 예시/설명",
        "본론2: 두 번째 논거 + 예시/설명",
        "결론: 요약 + 마무리 의견",
        "문단 나누기: 서론-본론-결론 구분",
        "연결 표현: 첫째, 둘째, 마지막으로",
        "논리적 전개: 주장 → 근거 → 예시",
        "반박 고려: ~라는 의견도 있지만",
        "객관적 서술: ~것으로 보인다, ~경향이 있다",
        "글자 수 관리: 600-700자 범위 준수"
      ]
    },
    {
      title: "필수 표현",
      icon: "💬",
      items: [
        "서론 시작: 요즘/최근 ~에 대한 관심이 높아지고 있다",
        "의견 제시: 나는 ~라고 생각한다, ~해야 한다고 본다",
        "이유 제시: 그 이유는 ~때문이다, 왜냐하면 ~이기 때문이다",
        "예시 제시: 예를 들어, 실제로, 구체적으로",
        "반박 표현: 물론 ~라고 할 수 있지만, ~라는 주장도 있으나",
        "전환 표현: 그러나, 반면에, 한편, 그런데",
        "강조 표현: 특히, 무엇보다도, 중요한 것은",
        "결론 표현: 결론적으로, 요약하면, 따라서",
        "양보 표현: 비록 ~지만, ~에도 불구하고",
        "조건 표현: ~(으)려면, ~(으)ㄹ 경우, ~다면"
      ]
    },
    {
      title: "글쓰기 구조",
      icon: "📋",
      items: [
        "주제문 작성: 글의 핵심 문장 한 줄로",
        "개요 잡기: 서론-본론1-본론2-결론 구성",
        "문단 구성: 한 문단 = 한 가지 아이디어",
        "문장 길이: 한 문장 너무 길지 않게",
        "주어 일관성: 주어 자주 바꾸지 않기",
        "능동/피동: 상황에 맞게 사용",
        "구어체 피하기: 격식체 사용",
        "반복 피하기: 같은 표현 반복 X",
        "접속어 활용: 문장 간 연결 자연스럽게",
        "마무리 문장: 인상적으로 끝맺기"
      ]
    },
    {
      title: "채점 기준 및 주의사항",
      icon: "⚠️",
      items: [
        "내용: 주제에 맞게 작성했는가",
        "구성: 논리적으로 구성되었는가",
        "언어 사용: 어휘와 문법이 정확한가",
        "글자 수: 범위 내에서 작성했는가",
        "맞춤법 오류: 감점 요소 주의",
        "띄어쓰기: 정확히 지키기",
        "문장부호: 적절히 사용하기",
        "원고지 사용법: 규칙 숙지하기",
        "시간 배분: 53번 15분, 54번 35분",
        "검토 시간: 마지막 5분은 검토"
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
            <span className="text-4xl">✍️</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">쓰기 (Writing)</h1>
              <p className="text-gray-600">작문 영역 (TOPIK II만 해당)</p>
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

        <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <strong>참고:</strong> 쓰기는 TOPIK II(3~6급)에만 있으며, 51~54번 4문항으로 구성됩니다.
            TOPIK I에는 쓰기 영역이 없습니다.
          </p>
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
          <h3 className="font-bold text-blue-800 mb-3">💡 쓰기 학습 TIP</h3>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• 기출문제 유형별로 최소 5편 이상 직접 써보세요</li>
            <li>• 첨삭 받을 수 있으면 반드시 받아보세요</li>
            <li>• 시간 재면서 연습하세요 (53번 15분, 54번 35분)</li>
            <li>• 글자 수를 세는 연습을 많이 하세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`TOPIK 한국어 쓰기 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`TOPIK 한국어 쓰기 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`TOPIK 한국어 쓰기 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
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
