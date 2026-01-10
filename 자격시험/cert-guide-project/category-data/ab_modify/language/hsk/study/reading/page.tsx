'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HSKReadingPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('hsk-reading-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('hsk-reading-completed', JSON.stringify(items));
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
      title: "1-2급 기초 어휘",
      icon: "📝",
      items: [
        "인칭대명사: 我, 你, 他, 她, 我们, 你们, 他们",
        "지시대명사: 这, 那, 这里, 那里, 这个, 那个",
        "의문대명사: 谁, 什么, 哪, 哪儿, 怎么, 为什么",
        "기본 동사: 是, 有, 在, 去, 来, 做, 吃, 喝",
        "기본 형용사: 大, 小, 多, 少, 好, 坏, 高, 低",
        "시간 명사: 今天, 明天, 昨天, 现在, 以前, 以后",
        "장소 명사: 家, 学校, 公司, 医院, 商店, 饭店",
        "기본 양사: 个, 本, 张, 件, 只, 杯, 块",
        "기본 부사: 很, 太, 都, 也, 还, 就, 才",
        "기본 전치사: 在, 从, 到, 给, 对, 跟, 比"
      ]
    },
    {
      title: "3-4급 중급 어휘",
      icon: "📚",
      items: [
        "추상 명사: 时间, 机会, 经验, 关系, 影响, 作用",
        "동작 동사: 发现, 决定, 选择, 解决, 考虑, 接受",
        "상태 동사: 相信, 了解, 担心, 希望, 感觉, 认为",
        "변화 형용사: 重要, 必要, 复杂, 简单, 困难, 容易",
        "부사 확장: 非常, 特别, 一直, 经常, 马上, 突然",
        "접속사: 因为...所以, 虽然...但是, 如果...就",
        "개사(전치사): 关于, 根据, 按照, 通过, 由于",
        "방향보어: 上来, 下去, 进来, 出去, 回来, 过去",
        "결과보어: 完, 好, 到, 见, 懂, 会, 成",
        "가능보어: 得/不 + 결과보어 (看得见/看不见)"
      ]
    },
    {
      title: "5-6급 고급 어휘",
      icon: "🎓",
      items: [
        "학술 어휘: 研究, 分析, 证明, 理论, 观点, 结论",
        "경제 어휘: 经济, 市场, 投资, 贸易, 发展, 增长",
        "사회 어휘: 社会, 文化, 教育, 环境, 政策, 问题",
        "성어(成语): 一举两得, 画蛇添足, 对牛弹琴",
        "관용어: 说到底, 毕竟, 无论如何, 想方设法",
        "서면어: 然而, 因此, 尽管, 倘若, 固然, 从而",
        "비유 표현: 像...一样, 如同...般, 仿佛...似的",
        "강조 표현: 尤其, 特别是, 更重要的是, 事实上",
        "전환 표현: 另外, 此外, 反之, 相反, 一方面...另一方面",
        "총결 표현: 总之, 综上所述, 由此可见, 换句话说"
      ]
    },
    {
      title: "문법 구조",
      icon: "📖",
      items: [
        "把字句: 把+목적어+동사+기타 (把门关上)",
        "被字句: 피동문 (被人批评了)",
        "是...的句: 강조 구문 (是昨天来的)",
        "比较句: A比B+형용사 (他比我高)",
        "兼语句: 사역문 (让他去买)",
        "连动句: 연속동사 (去商店买东西)",
        "存现句: 존재문 (桌子上有书)",
        "趋向补语: 방향보어 (走进来, 跑出去)",
        "程度补语: 정도보어 (高兴得跳起来)",
        "时量补语: 시량보어 (学了三年)"
      ]
    },
    {
      title: "독해 유형",
      icon: "📄",
      items: [
        "어휘 선택형: 문맥에 맞는 단어 고르기",
        "문장 순서형: 올바른 문장 배열",
        "빈칸 완성형: 문맥에 맞는 표현 넣기",
        "주제 파악형: 글의 중심 내용 찾기",
        "세부 정보형: 구체적 내용 확인",
        "추론 문제형: 암시된 의미 파악",
        "필자 의도형: 글쓴이 태도/관점 파악",
        "지시어 해석형: 这, 那, 其 등의 대상",
        "논리 관계형: 인과, 전환, 병렬 관계",
        "제목 추론형: 적절한 제목 선택"
      ]
    },
    {
      title: "텍스트 유형별 전략",
      icon: "📰",
      items: [
        "설명문: 대상의 특징, 원리 파악",
        "논설문: 주장과 근거 구분",
        "서사문: 시간 순서, 인과관계 파악",
        "광고문: 핵심 정보(가격, 조건) 찾기",
        "공지문: 일시, 장소, 대상 확인",
        "편지/이메일: 목적과 요청사항 파악",
        "뉴스 기사: 5W1H 정보 추출",
        "학술문: 논점과 결론 구분",
        "수필/산문: 감정과 주제 의식",
        "복합 지문: 여러 자료 종합 분석"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/hsk" className="text-red-600 hover:text-red-800 flex items-center gap-2">
            <span>←</span>
            <span>HSK로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">📖</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">독해 (阅读)</h1>
              <p className="text-gray-600">읽기 이해 60문항</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all"
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
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-red-50 transition-colors"
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
                            isCompleted ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-red-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200"
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

        <div className="mt-8 bg-red-50 rounded-xl p-6 border border-red-200">
          <h3 className="font-bold text-red-800 mb-3">💡 독해 학습 TIP</h3>
          <ul className="space-y-2 text-red-700 text-sm">
            <li>• 한자를 병음과 함께 반복 학습하세요</li>
            <li>• 문장 구조(주어+술어+목적어)를 익히세요</li>
            <li>• 매일 중국어 기사나 글을 읽는 습관을 들이세요</li>
            <li>• 모르는 단어는 문맥에서 추론하는 연습을 하세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`HSK 중국어 독해 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`HSK 중국어 독해 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`HSK 중국어 독해 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
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
