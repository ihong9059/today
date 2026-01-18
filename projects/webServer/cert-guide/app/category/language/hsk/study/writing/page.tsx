'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function HSKWritingPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('hsk-writing-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('hsk-writing-completed', JSON.stringify(items));
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
      title: "3급 쓰기 (10문항)",
      icon: "✏️",
      items: [
        "어순 배열: 주어진 단어로 문장 만들기",
        "기본 어순: 주어 + 술어 + 목적어",
        "시간/장소 위치: 주어 뒤, 술어 앞",
        "부사 위치: 술어 앞 (我很喜欢)",
        "양사 활용: 숫자 + 양사 + 명사",
        "把자구: 把 + 목적어 + 동사 + 기타",
        "정도보어: 동사 + 得 + 형용사",
        "비교문: A比B + 형용사",
        "연동문: 동사1 + 목적어1 + 동사2",
        "겸어문: 주어 + 让/叫 + 대상 + 동사"
      ]
    },
    {
      title: "4급 쓰기 (15문항)",
      icon: "📝",
      items: [
        "빈칸 완성: 문맥에 맞는 한자 쓰기",
        "그림 묘사: 그림 보고 문장 작성",
        "핵심 한자: 자주 출제되는 한자 암기",
        "동사 활용: 적절한 동사 선택하기",
        "형용사 활용: 적절한 형용사 선택하기",
        "접속사 활용: 因为, 所以, 虽然, 但是",
        "시제 표현: 了, 过, 着, 会, 要",
        "가정 표현: 如果...就..., 要是...就...",
        "목적 표현: 为了..., 是为了...",
        "결과 표현: 所以, 因此, 于是"
      ]
    },
    {
      title: "5급 쓰기 (10문항)",
      icon: "✍️",
      items: [
        "어순 배열: 복잡한 문장 구조",
        "단문 작문: 80자 내외 작문",
        "제시어 활용: 주어진 단어 모두 사용",
        "논리적 구성: 서론-본론-결론",
        "원인-결과 표현: 由于...因此...",
        "양보 표현: 尽管...还是..., 即使...也...",
        "조건 표현: 只有...才..., 除非...否则...",
        "비교 심화: 与其...不如..., 不是...而是...",
        "강조 표현: 正是, 就是, 连...都/也",
        "전환 표현: 然而, 反而, 相反, 另一方面"
      ]
    },
    {
      title: "6급 쓰기 (1문항)",
      icon: "📄",
      items: [
        "장문 요약: 1000자 글을 400자로 축약",
        "핵심 파악: 주제와 요지 추출",
        "불필요 내용 삭제: 예시, 반복, 부연 제거",
        "논점 정리: 주요 논점 순서대로 정리",
        "자기 언어로 표현: 원문 그대로 복사 금지",
        "논리 구조 유지: 원문의 논리 흐름 보존",
        "적절한 접속사: 문장 연결 자연스럽게",
        "객관적 서술: 개인 의견 삽입 금지",
        "글자 수 준수: 400자 내외 엄수",
        "가독성: 문단 나누기, 적절한 표현"
      ]
    },
    {
      title: "필수 한자 쓰기",
      icon: "🔤",
      items: [
        "인칭: 我, 你, 他, 她, 它, 们",
        "시간: 时, 间, 年, 月, 日, 今, 明, 昨",
        "장소: 家, 校, 院, 店, 场, 站, 园",
        "동작: 走, 跑, 看, 听, 说, 写, 读, 做",
        "감정: 爱, 喜, 欢, 怕, 想, 觉, 意, 思",
        "상태: 大, 小, 多, 少, 高, 低, 好, 坏",
        "방향: 上, 下, 左, 右, 前, 后, 里, 外",
        "숫자: 一, 二, 三, 四, 五, 六, 七, 八, 九, 十",
        "색상: 红, 黄, 蓝, 绿, 白, 黑, 紫",
        "자연: 天, 地, 水, 火, 山, 风, 云, 雨"
      ]
    },
    {
      title: "쓰기 고득점 전략",
      icon: "🎯",
      items: [
        "획순 정확히: 한자 획순 규칙 준수",
        "간체자 사용: 번체자가 아닌 간체자로",
        "글씨 정성껏: 읽기 어려우면 감점",
        "빈칸 없이: 모르는 문제도 무언가 쓰기",
        "시간 배분: 쓰기 파트에 충분한 시간",
        "자주 틀리는 한자 연습: 错别字 주의",
        "문장 구조 확인: 주술목 순서 확인",
        "접속사 점검: 논리적 연결 확인",
        "내용 점검: 제시 조건 충족 여부",
        "마무리 검토: 빠진 획, 오탈자 확인"
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
            <span className="text-4xl">✍️</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">쓰기 (书写)</h1>
              <p className="text-gray-600">작문 영역 (3급 이상)</p>
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

        <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <strong>참고:</strong> HSK 1-2급은 쓰기 영역이 없습니다. 3급부터 쓰기 시험이 포함됩니다.
          </p>
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
          <h3 className="font-bold text-red-800 mb-3">💡 쓰기 학습 TIP</h3>
          <ul className="space-y-2 text-red-700 text-sm">
            <li>• 매일 한자 10-20자씩 손으로 직접 쓰세요</li>
            <li>• 획순을 정확히 익혀야 빠르게 쓸 수 있습니다</li>
            <li>• 3-4급은 어순 배열, 5급은 단문 작성, 6급은 요약문에 집중하세요</li>
            <li>• 틀리기 쉬운 한자(错别字)를 별도로 정리하세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`HSK 중국어 쓰기 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`HSK 중국어 쓰기 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`HSK 중국어 쓰기 관련 질문입니다: "${currentQuestion}" - 예문과 함께 자세히 설명해주세요.`)}`}
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
