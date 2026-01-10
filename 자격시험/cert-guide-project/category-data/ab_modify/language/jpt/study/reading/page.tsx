'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JPTReadingPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('jpt-reading-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('jpt-reading-completed', JSON.stringify(items));
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
      title: "Part 5: 문자/어휘 (20문항)",
      icon: "📝",
      items: [
        "한자 음독: 会社(かいしゃ), 電話(でんわ), 時間(じかん)",
        "한자 훈독: 今日(きょう), 明日(あした), 昨日(きのう)",
        "동음이의: 聞く/効く, 見る/診る, 書く/掻く",
        "유의어: 大きい/大きな, 小さい/小さな",
        "반의어: 上/下, 前/後ろ, 右/左, 内/外",
        "접두어: お/ご, 不/無/非, 新/旧",
        "접미어: ~的, ~化, ~性, ~者, ~員",
        "외래어: コンピューター, インターネット, ビジネス",
        "의성어: ドキドキ, ワクワク, ニコニコ",
        "의태어: ゆっくり, はっきり, しっかり",
        "복합어: 名刺交換, 出張報告, 会議室",
        "관용표현: 気になる, 目立つ, 手に入れる",
        "수 표현: 一つ/一個/一本/一枚/一台",
        "시간 표현: 先週, 来月, 再来年, 一昨日",
        "빈출 한자: 会議, 資料, 予定, 連絡, 確認",
        "비즈니스 어휘: 取引, 契約, 納品, 請求",
        "일상 어휘: 買い物, 食事, 旅行, 趣味",
        "감정 어휘: 嬉しい, 悲しい, 困る, 驚く",
        "상태 어휘: 忙しい, 暇な, 疲れる, 眠い",
        "동작 어휘: 始める, 終わる, 続ける, 止める"
      ]
    },
    {
      title: "Part 6: 문법 (30문항)",
      icon: "📖",
      items: [
        "조사 は/が: 주제 vs 주어 구분",
        "조사 を/に: 목적어/대상/장소 구분",
        "조사 で/に: 수단/장소 vs 존재/시간",
        "조사 と/や: 나열 (전부 vs 일부)",
        "조사 から/まで: 시작점/끝점",
        "て형 접속: ~てから, ~ても, ~てしまう",
        "ない형: ~なければならない, ~なくてもいい",
        "た형: ~たことがある, ~たり~たり",
        "ば형: 가정 조건 (~ば~ほど)",
        "たら형: 조건/결과 (~たら~た)",
        "と형: 자연적 귀결 (春になると)",
        "なら형: 화제 조건 (~なら~がいい)",
        "ようにする: 노력/습관 (~ようになる)",
        "ことにする: 결정 (~ことになる)",
        "はず: 당연/예상 (~はずがない)",
        "わけ: 이유/상황 (~わけではない)",
        "경어: 尊敬語, 謙譲語, 丁寧語",
        "수동형: ~られる, ~される",
        "사역형: ~させる, ~させられる",
        "가능형: ~られる, ~ことができる",
        "추량형: ~だろう, ~でしょう",
        "전문형: ~そうだ, ~ということだ",
        "양태형: ~そうだ (보기에)",
        "비유형: ~ようだ, ~みたいだ",
        "주고받기: ~てあげる/もらう/くれる",
        "접속사: しかし, そして, だから, ところで",
        "부사: なかなか, あまり, ぜんぜん, とても",
        "형식명사: こと, もの, ところ, わけ",
        "복합조사: について, にとって, によって",
        "문말표현: ~のです, ~わけです, ~ものです"
      ]
    },
    {
      title: "Part 7: 독해 (30문항)",
      icon: "📄",
      items: [
        "주제 파악: 글의 중심 내용 찾기",
        "요지 파악: 필자의 주장/결론 찾기",
        "세부 정보: 구체적 내용 확인",
        "지시어 해석: これ/それ/あれ 대상 찾기",
        "접속사 활용: 논리적 흐름 파악",
        "이유 찾기: なぜ~か의 답 찾기",
        "목적 파악: 무엇을 위해~",
        "비교/대조: AとBの違い",
        "순서 파악: 사건의 전후관계",
        "추론: 명시되지 않은 내용 유추",
        "필자의 태도: 긍정/부정/중립",
        "대상 파악: 누구를 위한 글인가",
        "빈칸 완성: 문맥에 맞는 표현",
        "제목 추론: 적절한 제목 선택",
        "내용 일치: 본문과 선택지 대조",
        "단문 독해: 1분 이내 해결",
        "중문 독해: 2~3분 내 해결",
        "그래프/표 해석: 데이터 읽기",
        "광고문 해석: 조건, 기간 파악",
        "비즈니스 문서: 메일, 보고서 이해",
        "설명문: 절차, 방법 이해",
        "의견문: 찬반, 주장 파악",
        "기사문: 뉴스 내용 이해",
        "생략 내용: 문맥에서 추론",
        "문체 파악: 공식/비공식 구분",
        "시점 파악: 과거/현재/미래",
        "인과관계: 원인과 결과 연결",
        "예시 활용: 예시의 목적 파악",
        "문단 구조: 도입-전개-결론",
        "복수 지문: 정보 종합 분석"
      ]
    },
    {
      title: "Part 8: 오문정정 (20문항)",
      icon: "❌",
      items: [
        "조사 오류: は/が, を/に, で/に 오용",
        "활용 오류: ます형, て형, ない형 오류",
        "시제 오류: 과거/현재/미래 불일치",
        "존경어 오류: いらっしゃる, おっしゃる 오용",
        "겸양어 오류: 参る, 申す 오용",
        "접속 오류: ~て, ~たら, ~ば 부적절",
        "어순 오류: 일본어 어순 위반",
        "수식 오류: 형용사/부사 위치 오류",
        "주어/술어 불일치: 수/인칭 오류",
        "중복 표현: 불필요한 반복",
        "누락: 필요한 조사/조동사 누락",
        "한자 오류: 동음 한자 오용",
        "가타카나 오류: 외래어 표기 오류",
        "관용 오류: 관용표현 오용",
        "문맥 오류: 의미상 부적절",
        "높임 레벨: 높임 수준 불일치",
        "자동사/타동사: 開く/開ける 혼동",
        "가능 표현: ~れる, ~られる 오류",
        "수동/사역: 형태 혼동",
        "오류 없음: 정답이 없는 경우 확인"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/jpt" className="text-pink-600 hover:text-pink-800 flex items-center gap-2">
            <span>←</span>
            <span>JPT으로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">📖</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">독해</h1>
              <p className="text-gray-600">읽기/문법/어휘 100문항</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all"
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
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-pink-50 transition-colors"
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
                            isCompleted ? 'bg-pink-50 border-pink-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-pink-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-pink-500 hover:text-pink-700 text-xs px-2 py-1 rounded bg-pink-100 hover:bg-pink-200"
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

        <div className="mt-8 bg-pink-50 rounded-xl p-6 border border-pink-200">
          <h3 className="font-bold text-pink-800 mb-3">💡 독해 학습 TIP</h3>
          <ul className="space-y-2 text-pink-700 text-sm">
            <li>• Part 5는 한자를 문맥과 함께 암기하세요</li>
            <li>• Part 6는 조사와 활용형에 집중하세요</li>
            <li>• Part 7은 질문을 먼저 읽고 본문을 읽으세요</li>
            <li>• Part 8은 하나씩 검토하며 오류를 찾으세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`JPT 독해 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`JPT 독해 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`JPT 독해 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
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
