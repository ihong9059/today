'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TEPSListeningPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('teps-listening-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('teps-listening-completed', JSON.stringify(items));
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
      title: "Part 1: 한 문장 응답 전략",
      icon: "🎯",
      items: [
        "의문사(Wh-) 질문: Who, What, When, Where, Why, How로 시작하는 질문 유형",
        "Yes/No 질문: 긍정/부정 응답 또는 간접 응답 유형 파악",
        "제안/요청 질문: Would you, Could you, Why don't we 등의 표현",
        "선택 의문문: A or B 형태의 질문에 대한 응답 패턴",
        "부가 의문문: isn't it, don't you 등 꼬리 질문 응답",
        "간접 응답 유형: 질문에 직접 답하지 않고 우회적으로 응답하는 유형",
        "시제 일치: 질문의 시제와 응답의 시제 일치 여부 확인",
        "주어 일치: 질문의 주어와 응답의 주어 일치 확인",
        "감정/태도 표현: 기쁨, 슬픔, 놀람 등 감정 표현 응답",
        "관용적 응답: I'm afraid..., I don't think so 등 관용 표현"
      ]
    },
    {
      title: "Part 2: 짧은 대화 전략",
      icon: "💬",
      items: [
        "대화 상황 파악: 장소, 시간, 상황을 빠르게 파악하기",
        "화자 관계 추론: 친구, 동료, 상사-부하 등 관계 파악",
        "마지막 발화 집중: 응답에 직접적인 단서가 되는 마지막 말",
        "문제점/해결책: 문제 상황과 해결 방안 파악",
        "의도 파악: 화자가 말하고자 하는 진정한 의도 추론",
        "암시적 표현: 직접적으로 말하지 않는 함축적 의미 파악",
        "장소 추론: 대화가 이루어지는 장소 파악 (병원, 식당 등)",
        "다음 행동 예측: 대화 후 화자가 할 행동 추론",
        "감정/태도 파악: 화자의 감정 상태나 태도 파악",
        "동의/반대 표현: 상대방 의견에 대한 동의/반대 표현"
      ]
    },
    {
      title: "Part 3: 긴 대화 전략",
      icon: "🗣️",
      items: [
        "대화 주제 파악: 전체 대화의 핵심 주제 빠르게 파악",
        "세부 정보 메모: 시간, 장소, 인물, 숫자 등 핵심 정보 메모",
        "질문 유형 예측: 주제, 세부사항, 추론 문제 유형 예측",
        "바꿔 말하기(Paraphrasing): 같은 내용을 다른 표현으로 바꾸는 것 인식",
        "화자 의도 파악: 각 화자가 대화를 통해 원하는 것",
        "문제-해결 구조: 문제 제기 → 해결책 제안 패턴",
        "시간 순서: 사건이 일어난 순서대로 정보 정리",
        "비교/대조: 두 가지 이상의 대상 비교 정보 파악",
        "추론 문제: 직접 언급되지 않은 내용 추론",
        "NOT 문제: 언급되지 않은 것을 찾는 문제 전략"
      ]
    },
    {
      title: "Part 4: 담화 전략",
      icon: "📢",
      items: [
        "담화 유형 파악: 강의, 뉴스, 안내문, 광고 등 유형별 특징",
        "주제문 포착: 담화 시작 부분의 핵심 주제문 파악",
        "강의 듣기: 학술적 내용의 강의 듣기 전략",
        "뉴스 듣기: 육하원칙(5W1H) 중심으로 정보 파악",
        "안내문 듣기: 시간, 장소, 주의사항 등 핵심 정보 파악",
        "화자 의도/태도: 화자의 입장, 감정, 태도 파악",
        "세부 정보: 숫자, 날짜, 이름 등 구체적 정보 메모",
        "전환어 주의: However, Therefore, In addition 등 전환어",
        "예시와 증거: 주장을 뒷받침하는 예시와 근거 파악",
        "결론 파악: 담화의 결론이나 요약 부분 집중"
      ]
    },
    {
      title: "청해 공통 전략",
      icon: "🎧",
      items: [
        "선택지 미리 읽기: 음원 재생 전 선택지 빠르게 훑어보기",
        "키워드 파악: 선택지에서 핵심 키워드 파악하기",
        "소거법 활용: 확실히 틀린 선택지 먼저 제외",
        "집중력 유지: 한 번만 들려주므로 고도의 집중력 필요",
        "메모 습관: 중요 정보는 간단히 메모하기",
        "발음 연습: 연음, 축약, 강세 패턴 익히기",
        "매일 듣기: 하루 30분 이상 영어 듣기 습관",
        "받아쓰기: 딕테이션으로 세부 청취력 향상",
        "쉐도잉: 들은 내용 즉시 따라 말하기 연습",
        "오답 분석: 틀린 문제 스크립트 확인하며 원인 분석"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/teps" className="text-sky-600 hover:text-sky-800 flex items-center gap-2">
            <span>←</span>
            <span>TEPS로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🎧</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">청해 (Listening)</h1>
              <p className="text-gray-600">Part 1~4 청해 연습 50문항</p>
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
          <h3 className="font-bold text-sky-800 mb-3">💡 TEPS 청해 핵심 TIP</h3>
          <ul className="space-y-2 text-sky-700 text-sm">
            <li>• TEPS 청해는 한 번만 들려주므로 집중력이 가장 중요합니다</li>
            <li>• 선택지를 미리 읽어 질문 유형을 예측하세요</li>
            <li>• 매일 30분 이상 영어 듣기 습관을 들이세요</li>
            <li>• 틀린 문제는 스크립트를 확인하며 반복 청취하세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`TEPS 청해 관련 질문입니다: "${currentQuestion}" - 자세한 설명과 예시를 들어주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`TEPS 청해 관련 질문입니다: "${currentQuestion}" - 자세한 설명과 예시를 들어주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`TEPS 청해 관련 질문입니다: "${currentQuestion}" - 자세한 설명과 예시를 들어주세요.`)}`}
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
