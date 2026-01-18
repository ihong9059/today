'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function JLPTReadingPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('jlpt-reading-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('jlpt-reading-completed', JSON.stringify(items));
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
      title: "단문 독해 (短文読解)",
      icon: "📄",
      items: [
        "주제문 찾기: 글의 중심 문장 파악하기",
        "지시어 해석: これ、それ、あれ 등의 대상 파악",
        "접속사 활용: しかし、そして、また 등으로 논리 파악",
        "요약 연습: 한 문단을 한 문장으로 정리하기",
        "키워드 찾기: 반복되는 핵심 단어 파악",
        "필자의 의도: 主張、意見 파악하기",
        "비유/은유 해석: 문맥에서 의미 추론하기",
        "문장 순서 배열: 논리적 흐름 파악하기",
        "생략된 내용 추론: 문맥에서 빠진 내용 유추",
        "어조/태도 파악: 긍정/부정/중립 판단하기"
      ]
    },
    {
      title: "중문 독해 (中文読解)",
      icon: "📃",
      items: [
        "문단 구조 파악: 도입-전개-결론 이해하기",
        "인과관계 파악: ~ので、~から、~ため 활용",
        "대조/비교 구문: ~に対して、~一方 구조 파악",
        "예시 활용: 예를 들어... 이후 본론 파악",
        "가정 구문: ~たら、~ば、~なら 조건 이해",
        "인용문 해석: ~と言った、~によると 파악",
        "그래프/표 연계: 데이터와 본문 연결하기",
        "시간 순서 파악: 사건의 전후관계 이해",
        "등장인물 구분: 화자와 청자 구분하기",
        "문맥상 의미: 단어의 문맥적 의미 파악"
      ]
    },
    {
      title: "장문 독해 (長文読解)",
      icon: "📑",
      items: [
        "스키밍: 전체 내용 빠르게 훑어보기",
        "스캐닝: 필요한 정보만 찾아 읽기",
        "문단별 요약: 각 문단 핵심 정리하기",
        "필자 주장 파악: 글의 결론 찾기",
        "근거 찾기: 주장을 뒷받침하는 내용 파악",
        "반론 예상: 다른 관점 이해하기",
        "제목 추론: 적절한 제목 선택하기",
        "빈칸 완성: 문맥에 맞는 표현 넣기",
        "내용 일치 확인: 본문과 선택지 대조",
        "추론 문제: 명시되지 않은 내용 유추"
      ]
    },
    {
      title: "정보 검색 (情報検索)",
      icon: "🔍",
      items: [
        "광고문 읽기: 할인 조건, 기간 파악",
        "안내문 해석: 이용 방법, 주의사항 이해",
        "도표 해석: 숫자 데이터 정확히 읽기",
        "일정표 파악: 시간, 장소 정보 찾기",
        "가격 비교: 조건별 가격 계산하기",
        "조건 확인: 자격 요건, 제한 사항 파악",
        "연락처 찾기: 문의 방법, 담당자 확인",
        "지도 활용: 위치, 경로 정보 파악",
        "신청 방법: 접수 절차, 제출 서류 확인",
        "복수 문서 비교: 여러 정보 종합 분석"
      ]
    },
    {
      title: "주장/의견 이해 (主張理解)",
      icon: "💭",
      items: [
        "논설문 구조: 문제 제기 → 분석 → 결론",
        "주장과 근거: 의견과 팩트 구분하기",
        "양면 논의: 찬반 양쪽 의견 정리",
        "결론 도출: 필자의 최종 입장 파악",
        "사회적 이슈: 시사 관련 어휘 이해",
        "학술적 글: 연구/조사 내용 파악",
        "에세이 해석: 개인 경험과 의견 구분",
        "인터뷰 분석: 질문-답변 구조 이해",
        "비평문 읽기: 평가 기준과 결론 파악",
        "제안문 이해: 문제점과 해결책 정리"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/jlpt" className="text-rose-600 hover:text-rose-800 flex items-center gap-2">
            <span>←</span>
            <span>JLPT으로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">📄</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">독해</h1>
              <p className="text-gray-600">읽기 이해 전략 50문항</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-rose-500 to-red-500 h-3 rounded-full transition-all"
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
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-rose-50 transition-colors"
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
                            isCompleted ? 'bg-rose-50 border-rose-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-rose-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-rose-500 hover:text-rose-700 text-xs px-2 py-1 rounded bg-rose-100 hover:bg-rose-200"
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

        <div className="mt-8 bg-rose-50 rounded-xl p-6 border border-rose-200">
          <h3 className="font-bold text-rose-800 mb-3">💡 독해 학습 TIP</h3>
          <ul className="space-y-2 text-rose-700 text-sm">
            <li>• 문제를 먼저 읽고 본문에서 답을 찾으세요</li>
            <li>• 지시어(これ、それ)가 가리키는 대상을 정확히 파악하세요</li>
            <li>• 접속사를 통해 문장 간 관계를 파악하세요</li>
            <li>• 시간 배분: 단문 3분, 중문 5분, 장문 10분 이내로</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`JLPT 일본어 독해 관련 질문입니다: "${currentQuestion}" - 구체적인 예시와 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`JLPT 일본어 독해 관련 질문입니다: "${currentQuestion}" - 구체적인 예시와 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`JLPT 일본어 독해 관련 질문입니다: "${currentQuestion}" - 구체적인 예시와 함께 설명해주세요.`)}`}
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
