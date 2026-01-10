'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OPIcIntroductionPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('opic-introduction-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('opic-introduction-completed', JSON.stringify(items));
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
      title: "자기소개 기본 구조",
      icon: "👋",
      items: [
        "인사: Hi / Hello / Nice to meet you로 시작하기",
        "이름: My name is [이름]. / I'm [이름].",
        "나이: I'm [나이] years old. (선택적)",
        "직업: I work at [회사] as a [직책]. / I'm a [직업].",
        "거주지: I live in [지역/도시]. / I'm from [지역].",
        "가족: I live with my [가족구성]. / I have [가족 수].",
        "취미: In my free time, I enjoy [취미]. / My hobby is [취미].",
        "성격: I'm a [성격] person. / I consider myself [성격].",
        "목표: My goal is to [목표]. (선택적)",
        "마무리: That's a little bit about me. / That's all about myself."
      ]
    },
    {
      title: "직장인 자기소개",
      icon: "💼",
      items: [
        "회사 소개: I work at [회사명], which is a [업종] company.",
        "부서/직책: I'm in the [부서] department as a [직책].",
        "근무 기간: I've been working there for about [기간].",
        "담당 업무: My main responsibilities include [업무1] and [업무2].",
        "회사 위치: The company is located in [지역].",
        "출퇴근: It takes about [시간] to commute.",
        "회사 분위기: The work environment is [분위기].",
        "직장 동료: I have great colleagues who are [특징].",
        "회사 장점: What I like about my job is [장점].",
        "향후 목표: I hope to [직업 관련 목표] in the future."
      ]
    },
    {
      title: "학생 자기소개",
      icon: "📚",
      items: [
        "학교 소개: I'm a student at [학교명].",
        "전공: I'm majoring in [전공]. / My major is [전공].",
        "학년: I'm a [학년] year student. / I'm in my [학년] year.",
        "수업: I'm taking classes like [과목1] and [과목2].",
        "캠퍼스: The campus is located in [지역].",
        "등하교: It takes about [시간] to get to school.",
        "동아리: I'm a member of [동아리명] club.",
        "아르바이트: I also work part-time at [장소].",
        "학교생활: What I enjoy about school is [장점].",
        "졸업 계획: After graduation, I plan to [계획]."
      ]
    },
    {
      title: "일상생활 묘사",
      icon: "🏠",
      items: [
        "기상: I usually wake up at [시간] in the morning.",
        "아침: I have [아침식사] for breakfast.",
        "출근/등교: I leave home at [시간] and [이동수단].",
        "점심: For lunch, I usually [점심 활동].",
        "오후: In the afternoon, I [오후 활동].",
        "퇴근/하교: I finish work/school around [시간].",
        "저녁: After that, I [저녁 활동].",
        "취침 전: Before going to bed, I [취침 전 활동].",
        "주말: On weekends, I like to [주말 활동].",
        "특별한 날: Sometimes, I [특별 활동]."
      ]
    },
    {
      title: "집/동네 묘사",
      icon: "🏡",
      items: [
        "주거 형태: I live in an apartment/house in [지역].",
        "층수: It's on the [층] floor of a [규모]-story building.",
        "방 구조: My place has [방 수] bedrooms, a living room, and a kitchen.",
        "인테리어: The interior is [스타일] style with [특징].",
        "좋아하는 공간: My favorite spot is [공간] because [이유].",
        "동네 특징: The neighborhood is [특징] and [분위기].",
        "편의시설: There are [편의시설] nearby.",
        "교통: It's close to [교통수단], so commuting is convenient.",
        "이웃: The neighbors are [특징] and we [관계].",
        "만족도: Overall, I really like living here because [이유]."
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
            <span className="text-4xl">👋</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">자기소개/일상</h1>
              <p className="text-gray-600">자기소개 및 일상생활 50문항</p>
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
          <h3 className="font-bold text-emerald-800 mb-3">💡 자기소개 TIP</h3>
          <ul className="space-y-2 text-emerald-700 text-sm">
            <li>• 자기소개는 1분 내외로 자연스럽게 말하세요</li>
            <li>• 암기한 티가 나지 않도록 편안하게 말하기</li>
            <li>• 취미/관심사는 Background Survey와 연결되도록 선택</li>
            <li>• 개인 정보는 실제와 다르게 말해도 됩니다</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`OPIc 자기소개 관련 질문입니다: "${currentQuestion}" - 예시 답변과 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`OPIc 자기소개 관련 질문입니다: "${currentQuestion}" - 예시 답변과 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`OPIc 자기소개 관련 질문입니다: "${currentQuestion}" - 예시 답변과 함께 설명해주세요.`)}`}
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
