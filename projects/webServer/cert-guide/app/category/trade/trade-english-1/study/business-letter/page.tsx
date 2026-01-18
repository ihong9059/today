'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function BusinessLetterPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  const topics = [
    { id: 0, name: '서신 구조', count: 10 },
    { id: 1, name: '거래 제의', count: 10 },
    { id: 2, name: '문의/회신', count: 10 },
    { id: 3, name: '협상/조정', count: 10 },
    { id: 4, name: '감사/사과', count: 10 },
  ];

  const questions = [
    // 서신 구조 (10문항)
    { id: 1, topic: 0, question: "비즈니스 서신의 기본 구성요소가 아닌 것은?", options: ["개인 일기", "Letterhead", "Salutation", "Complimentary close"], answer: 0 },
    { id: 2, topic: 0, question: "\"Dear Sirs,\"는 어떤 상황에 사용하는가?", options: ["회사나 조직에 보낼 때", "개인에게 보낼 때", "친구에게 보낼 때", "정부에 보낼 때"], answer: 0 },
    { id: 3, topic: 0, question: "\"Dear Mr. Kim,\"에 대응하는 적절한 Complimentary close는?", options: ["Yours sincerely,", "Yours faithfully,", "Best wishes,", "Cheers,"], answer: 0 },
    { id: 4, topic: 0, question: "\"Dear Sir or Madam,\"에 대응하는 Complimentary close는?", options: ["Yours faithfully,", "Yours sincerely,", "Love,", "Take care,"], answer: 0 },
    { id: 5, topic: 0, question: "\"Re:\"가 서신에서 의미하는 것은?", options: ["제목/건", "답장", "참조", "추신"], answer: 0 },
    { id: 6, topic: 0, question: "\"Encl.\" 또는 \"Enc.\"의 의미는?", options: ["동봉물", "참조", "추신", "서명"], answer: 0 },
    { id: 7, topic: 0, question: "비즈니스 서신에서 \"P.S.\"의 용도는?", options: ["추신 (본문 후 추가 내용)", "서명란", "제목란", "참조인"], answer: 0 },
    { id: 8, topic: 0, question: "Full block style 서신의 특징은?", options: ["모든 요소가 왼쪽 정렬", "들여쓰기 사용", "가운데 정렬", "오른쪽 정렬"], answer: 0 },
    { id: 9, topic: 0, question: "\"Attn: Mr. Johnson\"의 의미는?", options: ["수신자 지정 (Johnson씨 앞)", "참조자 표시", "송신자 표시", "결재자 표시"], answer: 0 },
    { id: 10, topic: 0, question: "비즈니스 서신의 적절한 어조는?", options: ["공손하고 전문적인 어조", "친근하고 가벼운 어조", "격식 없는 구어체", "과도하게 형식적인 어조"], answer: 0 },

    // 거래 제의 (10문항)
    { id: 11, topic: 1, question: "\"We are writing to introduce ourselves as...\"의 용도는?", options: ["신규 거래처 소개", "클레임 제기", "주문 확인", "결제 요청"], answer: 0 },
    { id: 12, topic: 1, question: "\"We would be interested in establishing business relations with your company.\"의 의미는?", options: ["거래 관계 수립을 희망합니다", "거래를 종료합니다", "결제를 요청합니다", "클레임을 제기합니다"], answer: 0 },
    { id: 13, topic: 1, question: "거래 제의서에 포함되어야 할 내용이 아닌 것은?", options: ["경쟁사 비방", "회사 소개", "취급 상품", "거래 희망 조건"], answer: 0 },
    { id: 14, topic: 1, question: "\"We learned of your company through...\"에서 적절한 후속 내용은?", options: ["the trade directory", "our competitor", "a secret source", "nobody"], answer: 0 },
    { id: 15, topic: 1, question: "\"We are one of the leading manufacturers of...\"의 목적은?", options: ["회사의 위상 소개", "가격 협상", "클레임 제기", "주문 취소"], answer: 0 },
    { id: 16, topic: 1, question: "거래 제의 시 \"Please find enclosed our catalog.\"의 의미는?", options: ["당사 카탈로그를 동봉하니 참조바랍니다", "카탈로그를 찾아주세요", "카탈로그를 분실했습니다", "카탈로그를 반송해주세요"], answer: 0 },
    { id: 17, topic: 1, question: "\"We hope this is the beginning of a mutually beneficial relationship.\"의 의미는?", options: ["상호 이익이 되는 관계의 시작이 되기를 바랍니다", "거래를 종료합니다", "문제가 있습니다", "결제를 요청합니다"], answer: 0 },
    { id: 18, topic: 1, question: "거래 제의에 대한 긍정적 회신 시작 문구는?", options: ["Thank you for your letter of...regarding...", "We regret to inform you...", "We must refuse...", "Unfortunately..."], answer: 0 },
    { id: 19, topic: 1, question: "\"Bank reference\"를 요청하는 이유는?", options: ["신용 조회", "가격 확인", "품질 확인", "배송 확인"], answer: 0 },
    { id: 20, topic: 1, question: "\"Trade reference\"의 의미는?", options: ["기존 거래처 조회처", "무역 통계", "관세 정보", "환율 정보"], answer: 0 },

    // 문의/회신 (10문항)
    { id: 21, topic: 2, question: "\"We would appreciate it if you could send us...\"는 어떤 용도인가?", options: ["정중한 요청", "강력한 명령", "클레임 제기", "거래 종료"], answer: 0 },
    { id: 22, topic: 2, question: "가격 문의 시 \"Please quote us your best prices for...\"의 의미는?", options: ["최저가 견적을 부탁드립니다", "가격을 인상해주세요", "가격을 협상합니다", "가격을 거절합니다"], answer: 0 },
    { id: 23, topic: 2, question: "\"In reply to your inquiry dated...\"는 어떤 서신의 시작인가?", options: ["문의에 대한 회신", "새로운 문의", "클레임 제기", "주문서"], answer: 0 },
    { id: 24, topic: 2, question: "견적 회신 시 \"Our prices are quoted CIF Busan.\"의 의미는?", options: ["부산까지 운임보험료 포함 가격", "부산 출발 가격", "부산 창고 가격", "부산에서 할인 가격"], answer: 0 },
    { id: 25, topic: 2, question: "\"The prices are subject to change without notice.\"의 의미는?", options: ["가격은 예고 없이 변경될 수 있음", "가격이 확정됨", "가격 변경 불가", "가격을 통보해 드림"], answer: 0 },
    { id: 26, topic: 2, question: "샘플 요청 시 \"Could you please send us samples free of charge?\"의 의미는?", options: ["무료 샘플을 보내주시겠습니까?", "유료 샘플을 요청합니다", "샘플을 반송합니다", "샘플을 거절합니다"], answer: 0 },
    { id: 27, topic: 2, question: "\"We are currently sourcing suppliers for...\"의 상황은?", options: ["공급업체 탐색 중", "공급업체 계약 완료", "공급 중단", "공급업체 변경 완료"], answer: 0 },
    { id: 28, topic: 2, question: "문의 회신 시 \"We are pleased to inform you that...\"의 용도는?", options: ["긍정적인 소식 전달", "부정적인 통보", "거절 통보", "클레임 제기"], answer: 0 },
    { id: 29, topic: 2, question: "\"For further information, please do not hesitate to contact us.\"의 의미는?", options: ["추가 정보가 필요하시면 연락주세요", "더 이상 연락하지 마세요", "정보가 없습니다", "연락을 중단합니다"], answer: 0 },
    { id: 30, topic: 2, question: "카탈로그 요청 시 적절한 표현은?", options: ["We would be grateful if you could send us your latest catalog.", "Send me your catalog immediately.", "Give me catalog now.", "I want catalog."], answer: 0 },

    // 협상/조정 (10문항)
    { id: 31, topic: 3, question: "\"We would like to negotiate the terms of...\"의 상황은?", options: ["조건 협상 요청", "계약 체결", "계약 해지", "대금 결제"], answer: 0 },
    { id: 32, topic: 3, question: "가격 인하 요청 시 \"Could you possibly offer a better price?\"의 어조는?", options: ["공손한 요청", "강압적 요구", "협박", "거절"], answer: 0 },
    { id: 33, topic: 3, question: "\"We are prepared to offer a 5% discount if you order more than 1000 units.\"의 의미는?", options: ["1000개 이상 주문 시 5% 할인 가능", "5% 가격 인상", "1000개 한정 판매", "할인 불가"], answer: 0 },
    { id: 34, topic: 3, question: "납기 연장 요청 시 적절한 표현은?", options: ["We kindly request an extension of the delivery date.", "You must extend delivery.", "Extend now or else.", "Delivery is too fast."], answer: 0 },
    { id: 35, topic: 3, question: "\"We regret that we cannot accept your proposal.\"의 상황은?", options: ["제안 거절", "제안 수락", "제안 보류", "제안 수정"], answer: 0 },
    { id: 36, topic: 3, question: "협상 타결 시 \"We are pleased to accept your terms.\"의 의미는?", options: ["귀사 조건을 수락합니다", "조건을 거절합니다", "조건을 수정합니다", "조건을 보류합니다"], answer: 0 },
    { id: 37, topic: 3, question: "\"As a gesture of goodwill, we are offering...\"에서 'gesture of goodwill'의 의미는?", options: ["선의의 표시로", "강제적으로", "의무적으로", "법적으로"], answer: 0 },
    { id: 38, topic: 3, question: "\"Let us meet halfway.\"의 의미는?", options: ["서로 양보하여 타협합시다", "중간에서 만납시다", "절반만 주문합시다", "중간 가격으로 합시다"], answer: 0 },
    { id: 39, topic: 3, question: "협상 결렬 시 \"We hope there will be opportunities to work together in the future.\"의 목적은?", options: ["향후 관계 유지 희망", "영구적 거래 종료", "법적 대응 예고", "즉시 재협상 요구"], answer: 0 },
    { id: 40, topic: 3, question: "\"Our offer is valid until...\"에서 'valid'의 의미는?", options: ["유효한", "무효한", "취소된", "변경된"], answer: 0 },

    // 감사/사과 (10문항)
    { id: 41, topic: 4, question: "주문에 대한 감사 표현으로 적절한 것은?", options: ["Thank you for your order.", "Thanks for nothing.", "No thanks needed.", "Order received, bye."], answer: 0 },
    { id: 42, topic: 4, question: "\"We deeply appreciate your continued patronage.\"에서 'patronage'의 의미는?", options: ["후원/거래", "비판", "불만", "취소"], answer: 0 },
    { id: 43, topic: 4, question: "납기 지연 사과 시 적절한 표현은?", options: ["We sincerely apologize for the delay in delivery.", "The delay is not our fault.", "You should wait more.", "Delay happens, deal with it."], answer: 0 },
    { id: 44, topic: 4, question: "\"Please accept our sincere apologies for any inconvenience caused.\"의 용도는?", options: ["불편에 대한 진심어린 사과", "책임 회피", "추가 비용 청구", "거래 종료 통보"], answer: 0 },
    { id: 45, topic: 4, question: "품질 문제 사과 시 포함해야 할 내용이 아닌 것은?", options: ["고객 비난", "사과 표현", "원인 설명", "보상 방안"], answer: 0 },
    { id: 46, topic: 4, question: "\"We will do our utmost to ensure this does not happen again.\"의 의미는?", options: ["재발 방지를 위해 최선을 다하겠습니다", "다시 발생할 것입니다", "책임이 없습니다", "관심 없습니다"], answer: 0 },
    { id: 47, topic: 4, question: "감사 서신에서 \"Your support means a lot to us.\"의 의미는?", options: ["귀사의 지원은 저희에게 큰 의미가 있습니다", "지원이 필요 없습니다", "지원을 거절합니다", "지원에 관심 없습니다"], answer: 0 },
    { id: 48, topic: 4, question: "\"We value your business greatly.\"의 의미는?", options: ["귀사와의 거래를 매우 소중히 여깁니다", "거래가 가치 없습니다", "거래를 종료합니다", "거래에 불만입니다"], answer: 0 },
    { id: 49, topic: 4, question: "오배송 사과 후 적절한 후속 조치 표현은?", options: ["We will send the correct items immediately.", "It's your problem now.", "We can't do anything.", "Check your order again."], answer: 0 },
    { id: 50, topic: 4, question: "\"We hope to continue serving you in the future.\"의 의미는?", options: ["앞으로도 계속 거래하기를 희망합니다", "거래를 종료합니다", "더 이상 서비스하지 않겠습니다", "관계를 끝냅니다"], answer: 0 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-1-letter-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setCorrectCount(data.correct || 0);
      setWrongCount(data.wrong || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-1-letter-progress', JSON.stringify({
      correct: correctCount,
      wrong: wrongCount
    }));
  }, [correctCount, wrongCount]);

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  const handleAnswer = (questionId: number, selectedOption: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      if (selectedOption === question.answer) {
        setCorrectCount(prev => prev + 1);
      } else {
        setWrongCount(prev => prev + 1);
      }
      setShowAnswer(questionId);
    }
  };

  const openAIModal = (question: string) => {
    setCurrentQuestion(question);
    setShowAIModal(true);
  };

  const resetProgress = () => {
    setCorrectCount(0);
    setWrongCount(0);
    setShowAnswer(null);
    localStorage.removeItem('trade-english-1-letter-progress');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/trade/trade-english-1" className="text-blue-600 hover:text-blue-800 font-medium">
            ← 무역영어 1급
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📧 비즈니스 서신</h1>
          <p className="text-gray-500">무역 서신 작성법</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진도</h2>
            <button onClick={resetProgress} className="text-sm text-gray-400 hover:text-red-500">초기화</button>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{correctCount}</p>
              <p className="text-sm text-gray-500">정답</p>
            </div>
            <div className="flex-1 bg-red-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{wrongCount}</p>
              <p className="text-sm text-gray-500">오답</p>
            </div>
            <div className="flex-1 bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{correctCount + wrongCount}/{questions.length}</p>
              <p className="text-sm text-gray-500">진행률</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${((correctCount + wrongCount) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                selectedTopic === null ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              전체 ({questions.length})
            </button>
            {topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  selectedTopic === topic.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {topic.name} ({topic.count})
              </button>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    {topics.find(t => t.id === q.topic)?.name}
                  </span>
                  <span className="text-gray-400 text-sm">#{q.id}</span>
                </div>
                <button
                  onClick={() => openAIModal(q.question)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  🤖 AI에게 질문
                </button>
              </div>

              <h3 className="text-lg font-medium text-gray-800 mb-4">{q.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    onClick={() => handleAnswer(q.id, optIndex)}
                    disabled={showAnswer === q.id}
                    className={`p-3 rounded-xl text-left transition ${
                      showAnswer === q.id
                        ? optIndex === q.answer
                          ? 'bg-green-100 text-green-800 border-2 border-green-500'
                          : 'bg-gray-100 text-gray-500'
                        : 'bg-gray-50 hover:bg-blue-50 text-gray-700'
                    }`}
                  >
                    <span className="font-medium mr-2">{optIndex + 1}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {showAnswer === q.id && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
                  <p className="text-indigo-800 font-medium">
                    ✅ 정답: {q.answer + 1}. {q.options[q.answer]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI에게 질문하기</h3>
            <p className="text-gray-600 mb-6 p-4 bg-gray-50 rounded-xl">{currentQuestion}</p>
            <div className="space-y-3">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-purple-600 text-white rounded-xl text-center font-medium hover:bg-purple-700 transition"
              >
                Claude에게 질문하기
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-green-600 text-white rounded-xl text-center font-medium hover:bg-green-700 transition"
              >
                ChatGPT에게 질문하기
              </a>
              <a
                href={`https://gemini.google.com/app?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-blue-600 text-white rounded-xl text-center font-medium hover:bg-blue-700 transition"
              >
                Gemini에게 질문하기
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="mt-4 w-full py-3 px-4 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
