'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TEPSGrammarPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('teps-grammar-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('teps-grammar-completed', JSON.stringify(items));
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
      title: "시제 (Tense)",
      icon: "⏰",
      items: [
        "현재시제: 일반적 사실, 습관, 불변의 진리에 사용",
        "과거시제: 과거의 동작/상태, 역사적 사실에 사용",
        "미래시제: will, be going to, be about to 구분",
        "현재완료: have + p.p., 경험/완료/계속/결과 의미",
        "과거완료: had + p.p., 대과거 표현에 사용",
        "현재완료진행: have been ~ing, 계속 진행 중인 동작",
        "시제 일치: 주절과 종속절의 시제 일치 규칙",
        "시간 부사절: when, before, after, until 등과 시제",
        "조건절 시제: if절에서의 시제 사용 규칙",
        "미래시제 대용: 시간/조건 부사절에서 현재로 미래 대용"
      ]
    },
    {
      title: "조동사 (Modal Verbs)",
      icon: "🔧",
      items: [
        "can/could: 능력, 허가, 가능성 표현",
        "may/might: 허가, 추측(약한 가능성) 표현",
        "must: 의무, 강한 추측, 금지(must not) 표현",
        "should/ought to: 충고, 의무, 당연 표현",
        "will/would: 의지, 습관, 공손한 요청 표현",
        "had better: 충고(~하는 게 좋겠다) 표현",
        "used to: 과거 습관/상태(현재는 아님) 표현",
        "would rather: 선호(~하고 싶다) 표현",
        "need/dare: 준조동사로서의 용법",
        "조동사 + have p.p.: 과거에 대한 추측/후회"
      ]
    },
    {
      title: "관계사 (Relatives)",
      icon: "🔗",
      items: [
        "관계대명사 who: 사람 선행사, 주격/목적격",
        "관계대명사 which: 사물/동물 선행사",
        "관계대명사 that: 사람/사물 모두 가능, 특정 상황에서 선호",
        "관계대명사 what: 선행사 포함(~하는 것)",
        "소유격 관계대명사 whose: 소유 관계 표현",
        "관계부사 when/where/why/how: 시간/장소/이유/방법",
        "계속적 용법: 콤마 + which/who, 부연 설명",
        "제한적 용법: 선행사 한정, 콤마 없음",
        "복합관계사: whoever, whatever, whichever 등",
        "관계사 생략: 목적격 관계대명사 생략 가능"
      ]
    },
    {
      title: "가정법 (Subjunctive)",
      icon: "💭",
      items: [
        "가정법 과거: If + 과거, would/could/might + 동사원형",
        "가정법 과거완료: If + had p.p., would have p.p.",
        "혼합 가정법: 과거 조건 + 현재 결과 또는 그 반대",
        "I wish 가정법: 현재/과거 불가능한 소망 표현",
        "as if/as though: 마치 ~인 것처럼",
        "If only: I wish와 같은 의미의 강조 표현",
        "가정법 도치: If 생략 시 Were/Had/Should 도치",
        "제안/요구 동사: suggest, recommend 뒤 (should) 동사원형",
        "It's time 가정법: It's time + 주어 + 과거동사",
        "But for/Without: ~이 없었다면 가정법"
      ]
    },
    {
      title: "기타 핵심 문법",
      icon: "📝",
      items: [
        "수일치: 주어와 동사의 수 일치 (단수/복수)",
        "병렬구조: and, or, but으로 연결된 요소들의 형태 일치",
        "분사: 현재분사(-ing)와 과거분사(-ed)의 구분",
        "분사구문: 부사절을 분사로 줄인 표현",
        "도치: 부정어/장소부사 등이 문두에 올 때 도치",
        "강조: It is ~ that 강조구문, do/does/did 강조",
        "비교급/최상급: 비교급 강조, 최상급 표현",
        "접속사: 등위/종속/상관 접속사 구분",
        "전치사: 시간/장소/수단 등 전치사 선택",
        "to부정사 vs 동명사: 목적어로 쓰일 때 구분"
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
            <span className="text-4xl">📝</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">문법 (Grammar)</h1>
              <p className="text-gray-600">핵심 문법 연습 50문항</p>
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
          <h3 className="font-bold text-sky-800 mb-3">💡 TEPS 문법 핵심 TIP</h3>
          <ul className="space-y-2 text-sky-700 text-sm">
            <li>• 문장 구조 분석 능력이 TEPS 문법의 핵심입니다</li>
            <li>• 가정법, 시제, 관계사는 매 시험 출제되는 필수 문법입니다</li>
            <li>• 구어체(Part 1)와 문어체(Part 2)의 문법적 차이를 이해하세요</li>
            <li>• 기출 문제를 통해 자주 출제되는 패턴을 파악하세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`TEPS 문법 관련 질문입니다: "${currentQuestion}" - 자세한 설명과 예문을 들어주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`TEPS 문법 관련 질문입니다: "${currentQuestion}" - 자세한 설명과 예문을 들어주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`TEPS 문법 관련 질문입니다: "${currentQuestion}" - 자세한 설명과 예문을 들어주세요.`)}`}
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
