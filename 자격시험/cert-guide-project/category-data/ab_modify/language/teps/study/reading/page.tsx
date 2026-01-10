'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TEPSReadingPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('teps-reading-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('teps-reading-completed', JSON.stringify(items));
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
      title: "Part 1: 빈칸 완성 전략",
      icon: "🔲",
      items: [
        "글의 흐름 파악: 전체적인 논리 구조와 흐름 이해",
        "연결어 활용: However, Therefore, Moreover 등 전환어 주목",
        "전후 문맥: 빈칸 앞뒤 문장의 관계 파악",
        "대명사 지시: 빈칸 주변 대명사의 지시 대상 확인",
        "논리적 연결: 원인-결과, 대조, 예시 등 논리 관계",
        "주제문과 연결: 빈칸이 주제문을 뒷받침하는지 확인",
        "문장 삽입: 적절한 위치에 문장이 들어가는 유형",
        "요약문 완성: 전체 내용을 요약하는 문장 완성",
        "결론 도출: 글의 결론으로 적절한 문장 선택",
        "소거법 활용: 확실히 맞지 않는 선택지 제외"
      ]
    },
    {
      title: "Part 2: 독해 문제 유형",
      icon: "📖",
      items: [
        "주제/요지 파악(Main Idea): 글의 핵심 내용 파악",
        "세부 정보(Detail): 특정 정보 확인 문제",
        "추론(Inference): 직접 언급되지 않은 내용 추론",
        "NOT/TRUE 문제: 언급된/언급되지 않은 내용 구분",
        "어휘 의미(Vocabulary): 문맥상 단어의 의미 파악",
        "글의 목적(Purpose): 글이 쓰여진 목적 파악",
        "글의 구조(Organization): 글의 전개 방식 파악",
        "글의 어조(Tone): 필자의 태도/어조 파악",
        "지시 대상(Reference): 대명사/지시어가 가리키는 것",
        "다음 내용 예측: 글 다음에 이어질 내용 추론"
      ]
    },
    {
      title: "지문 유형별 접근법",
      icon: "📄",
      items: [
        "설명문(Expository): 정의, 예시, 분류, 비교대조 파악",
        "논설문(Argumentative): 주장, 근거, 반론, 결론 구분",
        "기사문(News): 육하원칙(5W1H) 중심으로 정보 파악",
        "실용문(Practical): 목적, 대상, 세부사항 확인",
        "과학 지문: 실험, 가설, 결과, 결론의 흐름 파악",
        "인문 지문: 개념 정의, 역사적 맥락, 의의 파악",
        "사회 지문: 현상, 원인, 영향, 해결책 구조",
        "경제 지문: 수치, 추세, 원인 분석 파악",
        "환경 지문: 문제 제기, 현황, 대책 구조",
        "심리/행동 지문: 연구, 실험, 결론 흐름"
      ]
    },
    {
      title: "속독 및 정독 전략",
      icon: "⚡",
      items: [
        "스키밍(Skimming): 전체 내용 빠르게 훑어보기",
        "스캐닝(Scanning): 특정 정보 빠르게 찾기",
        "첫 문장/마지막 문장: 각 단락의 핵심 문장 집중",
        "키워드 파악: 반복되는 단어/개념 주목",
        "전환어 주목: 논리 전개 방향 파악",
        "의미 단위 읽기: 구/절 단위로 끊어 읽기",
        "시간 배분: 지문당 3~4분 배분",
        "질문 먼저 읽기: 질문 확인 후 지문 읽기",
        "표시하며 읽기: 중요 부분 밑줄/동그라미",
        "모르는 단어: 문맥으로 의미 추론, 넘어가기"
      ]
    },
    {
      title: "오답 함정 피하기",
      icon: "⚠️",
      items: [
        "지나친 일반화: 일부 내용을 전체로 확대 해석",
        "극단적 표현: all, never, always 등 극단적 선택지 주의",
        "본문 단어 함정: 본문 단어가 있다고 정답은 아님",
        "순서 바꾸기: 본문 내용 순서를 바꿔 오답 만들기",
        "주어 바꾸기: 주체를 다르게 하여 오답 만들기",
        "NOT 문제 전략: 3개 선택지가 본문에 있음을 확인",
        "추론 vs 명시: 추론 문제에서 직접 언급된 내용 피하기",
        "필자 의도 vs 사실: 필자 생각과 객관적 사실 구분",
        "유사 표현: 비슷하지만 의미가 다른 표현 구분",
        "선택지 비교: 두 개 선택지 사이에서 더 적절한 것 선택"
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
            <span className="text-4xl">📖</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">독해 (Reading)</h1>
              <p className="text-gray-600">독해 전략 연습 50문항</p>
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
          <h3 className="font-bold text-sky-800 mb-3">💡 TEPS 독해 핵심 TIP</h3>
          <ul className="space-y-2 text-sky-700 text-sm">
            <li>• TEPS 독해는 지문이 길고 학술적이므로 속독 능력이 중요합니다</li>
            <li>• 질문을 먼저 읽고 필요한 정보를 찾으며 읽으세요</li>
            <li>• 지문당 3~4분을 배분하고 시간 관리에 주의하세요</li>
            <li>• 평소 영문 기사/논문 읽기로 독해력을 향상시키세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`TEPS 독해 관련 질문입니다: "${currentQuestion}" - 자세한 설명과 예시를 들어주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`TEPS 독해 관련 질문입니다: "${currentQuestion}" - 자세한 설명과 예시를 들어주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`TEPS 독해 관련 질문입니다: "${currentQuestion}" - 자세한 설명과 예시를 들어주세요.`)}`}
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
