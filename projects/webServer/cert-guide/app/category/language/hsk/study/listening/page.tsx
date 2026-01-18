'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function HSKListeningPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('hsk-listening-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('hsk-listening-completed', JSON.stringify(items));
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
      title: "1-2급 기초 듣기",
      icon: "🔰",
      items: [
        "숫자 듣기: 一二三四五六七八九十 (1-10)",
        "요일 듣기: 星期一~星期日 (월~일)",
        "시간 듣기: 几点? 现在三点半 (몇 시? 지금 3시 반)",
        "날짜 듣기: 几月几号? 五月一号 (몇 월 며칠?)",
        "인사말: 你好, 谢谢, 再见, 对不起",
        "장소 듣기: 学校, 医院, 银行, 超市",
        "가격 듣기: 多少钱? 一百块 (얼마? 100위안)",
        "날씨 듣기: 今天天气怎么样? (오늘 날씨 어때?)",
        "가족 호칭: 爸爸, 妈妈, 哥哥, 姐姐",
        "기본 동작: 吃, 喝, 看, 听, 说, 写, 读"
      ]
    },
    {
      title: "3급 일상 듣기",
      icon: "📻",
      items: [
        "전화 대화: 喂? 请问谁? (여보세요? 누구세요?)",
        "약속 잡기: 明天见面吧 (내일 만나자)",
        "길 묻기: 请问怎么走? (길 좀 물을게요)",
        "쇼핑 대화: 这个多少钱? 太贵了 (이거 얼마? 너무 비싸요)",
        "식당 주문: 请给我菜单 (메뉴판 주세요)",
        "교통 수단: 坐地铁/公交车/出租车 (지하철/버스/택시)",
        "병원 대화: 我不舒服, 头疼 (불편해요, 머리 아파요)",
        "취미 대화: 你喜欢做什么? (뭘 좋아해요?)",
        "날씨 예보: 明天会下雨 (내일 비 올 거야)",
        "계획 듣기: 我打算去旅游 (여행 갈 계획이야)"
      ]
    },
    {
      title: "4급 중급 듣기",
      icon: "🎙️",
      items: [
        "뉴스 듣기: 根据报道... (보도에 따르면...)",
        "인터뷰 형식: 请问您觉得...? (어떻게 생각하세요?)",
        "비교 표현: A比B更... (A가 B보다 더...)",
        "원인/결과: 因为...所以... (왜냐하면...그래서...)",
        "조건 표현: 如果...就... (만약...하면...)",
        "의견 제시: 我认为... 我觉得... (제 생각에는...)",
        "동의/반대: 我同意/不同意 (동의해요/동의 안 해요)",
        "건의 표현: 我建议... 最好... (제안하면...가장 좋은...)",
        "목적 표현: 为了... 是为了... (...하기 위해서)",
        "정도 부사: 非常, 特别, 相当, 极其 (매우, 특히)"
      ]
    },
    {
      title: "5급 고급 듣기",
      icon: "📡",
      items: [
        "강연 듣기: 今天我想谈谈... (오늘 ...에 대해 말하고자)",
        "토론 형식: 有人认为...也有人觉得... (어떤 사람은...또 어떤 사람은...)",
        "통계 표현: 据统计, 百分之... (통계에 따르면, ...퍼센트)",
        "인용 표현: 有人说过... 正如...所言 (...가 말했듯이)",
        "가정 표현: 假如...的话 要是...那么 (만약...라면)",
        "추측 표현: 可能是... 也许... 大概... (아마...일지도)",
        "양보 표현: 虽然...但是... 尽管...还是... (비록...하지만...)",
        "강조 표현: 确实, 的确, 毕竟, 究竟 (확실히, 정말)",
        "전환 표현: 不过, 然而, 反而, 相反 (그러나, 오히려)",
        "결론 표현: 总之, 综上所述, 因此 (결론적으로, 따라서)"
      ]
    },
    {
      title: "6급 최고급 듣기",
      icon: "🎯",
      items: [
        "학술 강연: 从...角度来看... (...의 관점에서 보면)",
        "시사 뉴스: 据最新消息... (최신 소식에 따르면)",
        "다중 화자 토론: A提出... B反驳说... (A가 제시...B가 반박...)",
        "간접 화법: 他表示... 她透露... (그는 밝혔다...그녀는 언급...)",
        "복잡한 인과: 之所以...是因为... (...한 이유는...때문)",
        "추상적 개념: 从某种意义上说... (어떤 의미에서는...)",
        "은유/비유: 可以说是... 相当于... (마치...와 같다)",
        "속담/성어: 俗话说... 所谓... (속담에 이르길...)",
        "전문 용어: 经济/科技/文化 분야 어휘",
        "빠른 속도 듣기: 원어민 속도 적응 훈련"
      ]
    },
    {
      title: "듣기 유형별 전략",
      icon: "📋",
      items: [
        "사진 선택형: 키워드 먼저 예상하기",
        "대화 완성형: 질문 유형 파악하기",
        "단문 이해형: 핵심 정보 메모하기",
        "장문 이해형: 구조 파악하며 듣기",
        "의도 파악형: 화자 태도 주의하기",
        "세부 정보형: 숫자, 시간, 장소 집중",
        "주제 파악형: 반복 키워드 찾기",
        "추론 문제형: 상황 맥락 이해하기",
        "음성 2회 재생: 1회차 전체 파악, 2회차 세부 확인",
        "시간 관리: 한 문제 고민 시 바로 다음으로"
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
            <span className="text-4xl">🎧</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">듣기 (听力)</h1>
              <p className="text-gray-600">청력 이해 60문항</p>
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
          <h3 className="font-bold text-red-800 mb-3">💡 듣기 학습 TIP</h3>
          <ul className="space-y-2 text-red-700 text-sm">
            <li>• 매일 30분 이상 중국어 음성에 노출되세요</li>
            <li>• 드라마/영화는 자막 없이 먼저 들어보세요</li>
            <li>• 쉐도잉으로 발음과 청력을 동시에 향상시키세요</li>
            <li>• HSK 공식 듣기 자료로 시험 형식에 익숙해지세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`HSK 중국어 듣기 관련 질문입니다: "${currentQuestion}" - 발음과 예문을 포함해 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`HSK 중국어 듣기 관련 질문입니다: "${currentQuestion}" - 발음과 예문을 포함해 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`HSK 중국어 듣기 관련 질문입니다: "${currentQuestion}" - 발음과 예문을 포함해 자세히 설명해주세요.`)}`}
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
