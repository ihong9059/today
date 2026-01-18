'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function JPTListeningPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('jpt-listening-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('jpt-listening-completed', JSON.stringify(items));
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
      title: "Part 1: 사진 묘사 (20문항)",
      icon: "📷",
      items: [
        "~ています: 현재 진행/상태 표현 (立っています, 座っています)",
        "~があります/います: 존재 표현 (テーブルの上にコップがあります)",
        "위치 표현: 上/下/横/前/後ろ/中/外 (机の前に椅子があります)",
        "동작 표현: 歩いている, 走っている, 話している, 書いている",
        "인물 수: 一人/二人/三人/何人か (女性が二人います)",
        "장소 표현: オフィス, 会議室, 駅, 公園, レストラン",
        "사물 묘사: 大きい/小さい, 長い/短い, 新しい/古い",
        "날씨/계절: 晴れている, 雨が降っている, 雪が積もっている",
        "교통 수단: 電車, バス, 車, 自転車, 飛行機",
        "의복/외모: スーツを着ている, 眼鏡をかけている",
        "행동 묘사: 電話をかけている, 本を読んでいる, コーヒーを飲んでいる",
        "복수 인물: AさんはBさんに話しかけている",
        "배경 묘사: 建物が見える, 木が植えてある",
        "상태 표현: ドアが開いている/閉まっている",
        "방향 표현: 右/左を向いている, 前を見ている",
        "집단 행동: みんなで会議をしている",
        "물건 배치: 並んでいる, 重ねてある",
        "시간대 표현: 朝/昼/夜の様子",
        "계절 표현: 桜が咲いている, 紅葉している",
        "함정 주의: 비슷한 발음 구분 (いる/いく, みる/みえる)"
      ]
    },
    {
      title: "Part 2: 질의응답 (30문항)",
      icon: "💬",
      items: [
        "いつ (시간): いつ出発しますか → 明日の朝です",
        "どこ (장소): どこで会いますか → 駅の前で会いましょう",
        "だれ/どなた (인물): だれが来ますか → 田中さんが来ます",
        "何 (사물/내용): 何を食べますか → ラーメンを食べます",
        "どう/いかが (방법/상태): どう思いますか → いいと思います",
        "なぜ/どうして (이유): なぜ遅れましたか → 電車が遅れたからです",
        "いくら (가격): いくらですか → 500円です",
        "どのくらい (기간/정도): どのくらいかかりますか → 30分ぐらいです",
        "~てもいいですか (허락): ここで写真を撮ってもいいですか → はい、どうぞ",
        "~ませんか (권유): 一緒に昼ごはんを食べませんか → いいですね",
        "~ましょうか (제안): 手伝いましょうか → ありがとうございます",
        "~てください (요청): ちょっと待ってください → はい、わかりました",
        "~ことができますか (가능): 日本語を話すことができますか → 少しだけ",
        "~たほうがいい (조언): 早く行ったほうがいいですよ → そうですね",
        "~と思います (의견): 会議は何時からだと思いますか → 2時からだと思います",
        "존경어 응답: いらっしゃいますか → はい、おります",
        "겸양어 응답: お名前は何とおっしゃいますか → 山田と申します",
        "부정 응답: まだ終わっていません → では、待っています",
        "조건부 응답: 時間があれば → 行きたいと思います",
        "간접 거절: ちょっと... → 申し訳ありません",
        "확인 응답: ~ですね → はい、そうです",
        "반복 요청: もう一度言ってください",
        "불확실 응답: たぶん/おそらく/かもしれません",
        "전화 응대: 少々お待ちください",
        "인사말 응답: お疲れ様です → お疲れ様です",
        "감사 응답: ありがとうございます → いいえ、どういたしまして",
        "사과 응답: すみません → いいえ、大丈夫です",
        "칭찬 응답: お上手ですね → いいえ、まだまだです",
        "초대 응답: よかったら来てください → ぜひ伺います",
        "약속 응답: 明日10時でいいですか → はい、大丈夫です"
      ]
    },
    {
      title: "Part 3: 회화문 (30문항)",
      icon: "👥",
      items: [
        "대화 주제 파악: 무엇에 관한 대화인가",
        "화자 관계: 상사/부하, 동료, 점원/손님 파악",
        "장소 추론: 어디서 대화하는가 (会社, 店, 駅)",
        "시간 표현: 언제 일이 일어나는가/일어났는가",
        "요청/부탁 내용: 무엇을 해달라고 하는가",
        "문제/상황 파악: 어떤 문제가 발생했는가",
        "해결책 확인: 어떻게 해결하려고 하는가",
        "다음 행동: 대화 후 무엇을 할 것인가",
        "감정/태도 파악: 기쁨, 걱정, 불만 등",
        "숫자 정보: 가격, 시간, 수량 정확히 듣기",
        "변경 사항: 예약/일정/장소 변경 내용",
        "이유 파악: なぜ/どうして에 대한 답",
        "의견 차이: 두 사람의 생각 차이",
        "제안/권유: ~しましょう, ~ませんか",
        "허락/거절: ~てもいいですか 응답",
        "확인 사항: ~でよろしいですか",
        "조건 표현: ~たら, ~ば, ~と",
        "추측 표현: ~かもしれない, ~でしょう",
        "전언/메시지: 누구에게 무엇을 전하는가",
        "최종 결론: 대화의 결론/결정 사항"
      ]
    },
    {
      title: "Part 4: 설명문 (20문항)",
      icon: "📢",
      items: [
        "교통 안내: 전철 지연, 노선 변경, 승강장 안내",
        "일기 예보: 날씨, 기온, 강수 확률",
        "점포 안내: 영업시간, 휴무일, 이벤트",
        "공항/역 안내: 탑승, 도착, 지연 정보",
        "회사 공지: 회의, 행사, 인사 변동",
        "이벤트 안내: 일시, 장소, 참가 방법",
        "전화 자동응답: 영업시간, 연결 방법",
        "관광 안내: 명소, 시간, 입장료",
        "숫자 메모: 날짜, 시간, 전화번호, 금액",
        "순서 파악: 먼저/다음에/마지막으로",
        "조건 확인: ~の場合は, ~の方は",
        "주의사항: 금지, 제한, 경고 내용",
        "변경사항: 예정 변경, 추가 정보",
        "연락처: 문의 전화, 담당자",
        "마감 시간: 접수, 신청, 이용 마감",
        "장소 설명: 위치, 이동 방법",
        "가격 정보: 요금, 할인, 무료 조건",
        "대상 정보: 누구를 위한 안내인가",
        "강조 표현: 특히, 必ず, ご注意",
        "요약 파악: 전체 내용의 핵심 요지"
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
            <span className="text-4xl">🎧</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">청해</h1>
              <p className="text-gray-600">듣기 이해 100문항</p>
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
          <h3 className="font-bold text-pink-800 mb-3">💡 청해 학습 TIP</h3>
          <ul className="space-y-2 text-pink-700 text-sm">
            <li>• Part 1은 사진을 미리 보고 예상 단어를 떠올리세요</li>
            <li>• Part 2는 질문의 첫 단어(의문사)에 집중하세요</li>
            <li>• Part 3, 4는 메모하면서 듣는 습관을 들이세요</li>
            <li>• 일본 드라마, 뉴스로 자연스러운 속도에 익숙해지세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`JPT 청해 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`JPT 청해 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`JPT 청해 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
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
