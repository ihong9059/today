'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TOPIKReadingPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('topik-reading-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('topik-reading-completed', JSON.stringify(items));
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
      title: "TOPIK I 어휘 (1-2급)",
      icon: "📝",
      items: [
        "기본 명사: 사람, 가족, 음식, 장소, 물건",
        "기본 동사: 가다, 오다, 먹다, 마시다, 보다",
        "기본 형용사: 크다, 작다, 좋다, 나쁘다, 예쁘다",
        "숫자 체계: 하나/일, 둘/이, 셋/삼 구분",
        "시간 표현: 오전, 오후, 시, 분, 초",
        "위치 표현: 위, 아래, 앞, 뒤, 옆, 안, 밖",
        "색깔: 빨간색, 파란색, 노란색, 검은색, 흰색",
        "날씨: 맑다, 흐리다, 비가 오다, 눈이 오다",
        "취미: 운동, 영화, 음악, 독서, 여행",
        "직업: 학생, 회사원, 의사, 선생님, 요리사"
      ]
    },
    {
      title: "TOPIK I 문법 (1-2급)",
      icon: "📖",
      items: [
        "조사: 은/는, 이/가, 을/를, 에, 에서, 으로",
        "존댓말: ~ㅂ니다/습니다, ~어요/아요",
        "과거 시제: ~았/었, ~았/었어요",
        "미래/추측: ~ㄹ 거예요, ~겠",
        "연결: ~고, ~어서/아서, ~지만",
        "의문문: ~ㅂ니까?, ~어요/아요?",
        "부정문: 안 ~, ~지 않다, 못 ~",
        "권유/제안: ~ㅂ시다, ~을까요?",
        "능력: ~을 수 있다/없다",
        "희망: ~고 싶다, ~ㄹ래요"
      ]
    },
    {
      title: "TOPIK II 어휘 (3-4급)",
      icon: "📚",
      items: [
        "추상 명사: 생각, 느낌, 경험, 관계, 문화",
        "사회 어휘: 경제, 정치, 교육, 환경, 사회",
        "감정 어휘: 기쁘다, 슬프다, 화나다, 걱정되다",
        "상태 어휘: 건강하다, 피곤하다, 배고프다",
        "동작 어휘: 출발하다, 도착하다, 시작하다, 끝나다",
        "정도 부사: 매우, 아주, 너무, 조금, 별로",
        "시간 부사: 벌써, 아직, 항상, 가끔, 자주",
        "의성어/의태어: 빙글빙글, 반짝반짝, 두근두근",
        "한자어: 가능/불가능, 성공/실패, 장점/단점",
        "관용 표현: 눈이 높다, 발이 넓다, 입이 무겁다"
      ]
    },
    {
      title: "TOPIK II 문법 (3-6급)",
      icon: "📑",
      items: [
        "연결어미: ~는데, ~더니, ~자마자, ~다가",
        "인용: ~다고 하다, ~라고 하다, ~냐고 하다",
        "피동: ~이/히/리/기, ~아/어지다",
        "사동: ~이/히/리/기/우/추, ~게 하다",
        "조건: ~으면, ~다면, ~거든, ~아/어야",
        "양보: ~아/어도, ~더라도, ~는데도",
        "목적: ~으려고, ~기 위해, ~도록",
        "추측: ~것 같다, ~ㄴ/는 모양이다, ~ㄹ지도 모르다",
        "후회: ~ㄹ걸 그랬다, ~았/었어야 했는데",
        "강조: ~기는요, ~다니요, ~잖아요"
      ]
    },
    {
      title: "읽기 문제 유형",
      icon: "📄",
      items: [
        "빈칸 완성: 문맥에 맞는 어휘/문법 선택",
        "문장 순서 배열: 논리적 순서로 배열",
        "주제/제목 찾기: 글의 중심 내용 파악",
        "세부 내용 일치: 글 내용과 일치하는 것",
        "글쓴이 의도/태도: 필자의 생각 파악",
        "지시어 해석: '이것', '그것' 의미 파악",
        "적절한 위치 찾기: 문장 삽입 위치",
        "글의 종류 파악: 광고, 안내문, 기사 등",
        "추론 문제: 암시된 내용 파악",
        "어울리는 속담: 상황에 맞는 속담 선택"
      ]
    },
    {
      title: "텍스트 유형별 전략",
      icon: "📰",
      items: [
        "광고문: 상품 정보, 할인 조건, 연락처 확인",
        "안내문: 일시, 장소, 대상, 신청 방법",
        "편지/이메일: 보낸 사람, 목적, 부탁 내용",
        "뉴스 기사: 육하원칙(누가, 언제, 어디서, 무엇을)",
        "설명문: 대상의 특징, 원리, 과정 파악",
        "논설문: 주장과 근거, 결론 구분",
        "수필/에세이: 필자의 경험과 생각",
        "인터뷰: 질문과 답변, 인터뷰이 의견",
        "그래프/표: 수치, 변화 추이, 비교",
        "복합 지문: 여러 자료 종합 이해"
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
            <span className="text-4xl">📖</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">읽기 (Reading)</h1>
              <p className="text-gray-600">독해 영역 60문항</p>
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
          <h3 className="font-bold text-blue-800 mb-3">💡 읽기 학습 TIP</h3>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• 매일 한국어 뉴스 기사나 글을 읽는 습관을 들이세요</li>
            <li>• 모르는 어휘는 문맥에서 추론하는 연습을 하세요</li>
            <li>• 질문을 먼저 읽고 지문을 읽으면 효율적입니다</li>
            <li>• TOPIK 기출문제로 문제 유형에 익숙해지세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`TOPIK 한국어 읽기 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`TOPIK 한국어 읽기 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`TOPIK 한국어 읽기 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
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
